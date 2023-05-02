import { createContext, useContext, useEffect, useCallback, useState, } from "react";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import { auth, storage } from "../firebase";
import { db } from '../firebase'
import { collection, addDoc, Timestamp, getDocs, query, orderBy, } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const PostFunctionsContext = createContext();

export function PostFunctionsContextProvider({ children }) {

  const [progresspercent, setProgresspercent] = useState(0);
  const dispatch = useDispatch();

  async function postArticalApi(payload) {
    try {
      if (payload.file) {
        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, `images/${payload.file.name}`);
        // Upload the file to Firebase Storage and get a reference to the upload task
        const uploadTask = uploadBytesResumable(storageRef, payload.file);
        // Listen for state changes of the upload task
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calculate the upload progress percentage and update the progress state
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            // Handle any upload errors
            alert(error.message);
          },
          async () => {
            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Determine if the file is an image or video based on its MIME type or extension
            const isVideo = payload.file.type.includes('video') || payload.file.name.endsWith('.mp4');
            const isImage = payload.file.type.includes('image') || payload.file.name.endsWith('.jpg') || payload.file.name.endsWith('.jpeg') || payload.file.name.endsWith('.png');

            // Create a data object with the sharedImage and sharedVideo fields
            const data = {
              actor: {
                title: payload.user.displayName,
                description: payload.user.email,
                image: payload.user.photoURL,
                date: Timestamp.now(),
              },
              comment: 0,
              description: payload.description,
            };

            if (isVideo) {
              data.sharedVideo = downloadURL;
              data.sharedImage = null;
            } else if (isImage) {
              data.sharedVideo = null;
              data.sharedImage = downloadURL;
            }

            // Add a new document to Firestore with the article data, image/video URL, and appropriate fields
            const docRef = await addDoc(collection(db, 'articles'), data);
          }
        );
      } else {
        // Add a new document to Firestore without the image/video URL
        const docRef = await addDoc(collection(db, 'articles'), {
          actor: {
            title: payload.user.displayName,
            description: payload.user.email,
            image: payload.user.photoURL,
            date: Timestamp.now(),
          },
          comment: 0,
          description: payload.description,
          sharedImage: null,
          sharedVideo: null,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }


  async function Checking() {
      try {
        dispatch({type:"FETCH_POSTS_REQUEST"});
        const postsCollection = query(collection(db, "articles"), orderBy("actor.date", "desc"));
        const postsSnapshot = await getDocs(postsCollection);
        const postsData = [];
        for (const doc of postsSnapshot.docs) {
          const postData = doc.data();
          postsData.push(postData);
        }
        dispatch({type:"FETCH_POSTS_SUCCESS",payload:postsData});
      }
      catch (error) {
        console.log(error);
      }
  }

  return (
    <PostFunctionsContext.Provider
      value={{ postArticalApi, Checking }}
    >
      {children}
    </PostFunctionsContext.Provider>
  );
}

export function PostFunctions() {
  return useContext(PostFunctionsContext);
}
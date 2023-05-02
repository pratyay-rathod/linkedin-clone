import React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { RiVideoFill } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { IoIosDocument } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';
import { FaRegCommentDots } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { PostFunctions } from "../context/PostFunctions";
import { DataContext } from '../App';
import { useContext } from 'react';
import firebase from '../firebase';
import ReactPlayer from 'react-player';

const PostModel = (props) => {

    const size = 25;
    const { postArticalApi, Checking, userName} = PostFunctions();
    const [editorText, setEditorText] = useState("");
    const [shareImage, SetShareImage] = useState("");
    const [UploadFile, SetUploadFile] = useState("");
    const [SelectedVideo, SetSelectedVideo] = useState(null);
    const { user } = props;

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file === '' || file === undefined) {
            alert(`not an image, the file is a ${typeof (file)}`)
            return;
        }
        SetSelectedVideo("");
        SetShareImage(file);
        SetUploadFile(file);
    }

    const postArtical = async (e) => {
        e.preventDefault();
        props.onLoadingChange(true);
        if (e.target !== e.currentTarget) {
            return;
        }
        const payload = {
            file: UploadFile,
            user: user,
            description: editorText,
        }
        try {
            await postArticalApi(payload);
            reset(e);
            props.onClose();
        } catch (error) {
            props.onLoadingChange(false);
            console.log(error.message);
        }
        props.onLoadingChange(false);
    };

    const reset = (e) => {
        setEditorText("");
        SetShareImage("");
        SetSelectedVideo("");
    }

    const handleIconClick = () => {
        document.getElementById('file-input').click();
    };

    const handleVideoIconClick = () => {
        document.getElementById('video-input').click();
    };

    const handleVideoSelect = (e) => {
        const file = e.target.files[0];
        if (file === '' || file === undefined) {
            alert(`not an video, the file is a ${typeof (file)}`)
            return;
        }
        SetShareImage("");
        SetSelectedVideo(file);
        SetUploadFile(file);
    };

    return (
        <>
            <Container>
                <Content>
                    <Header>
                        <h2>Create a Post</h2>
                        <GrClose onClick={props.onClose} />
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {
                                user ? (
                                    <>
                                        <img src={user.photoURL} referrerPolicy="no-referrer" alt="user" />
                                        <span>{user.displayName}</span>
                                    </>
                                ) : (
                                    <>
                                        <img src="./images/user_photo.jpg" alt="User" />
                                        <span>Name</span>
                                    </>
                                )
                            }
                        </UserInfo>
                        <Editor>
                            <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder='What do you want to talk about?' autoFocus={true} />
                            <UploadImage>
                                {
                                shareImage && (
                                    <img src={URL.createObjectURL(shareImage)} alt="Selected file" />
                                )}
                                {SelectedVideo && (
                                    <video controls>
                                        <source src={URL.createObjectURL(SelectedVideo)} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </UploadImage>
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton>
                                <UploadImage>
                                    <div className="icon-container" onClick={handleIconClick}>
                                        <HiOutlinePhotograph size={size} />
                                    </div>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </UploadImage>
                            </AssetButton>
                            <AssetButton>
                                <div>
                                    <div className="icon-container" onClick={handleVideoIconClick}>
                                        <RiVideoFill size={size} />
                                    </div>
                                    <input
                                        id="video-input"
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoSelect}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </AssetButton>
                            <AssetButton>
                                <IoIosDocument size={size} />
                            </AssetButton>
                            <AssetButton>
                                <SlOptions size={size} />
                            </AssetButton>
                        </AttachAssets>
                        <ShareComment>
                            <AssetButton>
                                <FaRegCommentDots size={20} />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton disabled={!editorText ? true : false} onClick={(e) => postArtical(e)}>
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
        </>
    )
}

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    color:black;
    background-color:rgba(0,0,0,0.8);
    animation:fadeIn 0.3s;
`;

const Content = styled.div`
    padding:10px;
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:90%;
    overflow:initial;
    border-radius:5px;
    position:relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin:0 auto;
`;

const Header = styled.div`
    font-size: 22px;
    display:block;
    padding:16px 2px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    line-height:1.5;
    color:rgba(0,0,0,0.6);
    display:flex;
    justify-content: space-between;
    align-items:center;
    button{
        height:40px;
        width:40px;
        min-width:auto;
        color:rgba(0,0,0,0.15);
        svg,img{
            pointer-events:none;
        }
    }
`;

const SharedContent = styled.div`
    /* display:flex; */
    /* flex-direction:column; */
    flex-grow:1;
    overflow-y:auto;
    vertical-align:baseline;
    background:transparent;
    padding:8px 12px;
`;

const UserInfo = styled.div`
    display:flex;
    align-items:center;
    padding:12px 24px;
    svg,
    img{
        width:48px;
        height:48px;
        background-clip:content-box;
        border:2px solid transparent;
        border-radius:50%;
        object-fit:cover;
    }
    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5;
        margin-left:5px;
    }
`;

const ShareCreation = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 16px;
`;
const AssetButton = styled.div`
    min-width:auto;
    margin:0px 10px;
    color:#494848;
    /* display:flex;
    align-items:center;
    height:40px;
    min-width:auto;
    color:rgba(0,0,0,0.5); */
`;

const AttachAssets = styled.div`
    display:flex;
    border-right: 1px solid #d4d4d4;
    /* align-items:center;
    padding-right:8px;
    ${AssetButton}{
        width:40px;
    } */
`;

const ShareComment = styled.div`
    padding-right: 180px;
    /* padding-left:8px;
    margin-right:auto;
    border-left:1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        svg{
            margin-right:5px;

        }
    } */
`;

const PostButton = styled.button`
    /* min-width:60px;
    border-radius:20px;
    padding-left:16px;
    padding-right:16px;
    background:#0a66c2;
    color:white;
    &:hover{
        background:#004182;
    } */
`;
const Editor = styled.div`
    padding:12px 24px;
    textarea{
        width:100%;
        min-height:100px;
        resize:none;
        border:none;
        padding:0.2rem 1rem;
        font-size: 18px;
        &:hover{
            border:none;
        }
        &:focus{
            border:blue;
        }
    }
    input{
        width:100;
        height:35px;
        font-size:16px;
        margin-bottom:20px;
        padding:5px;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img,video{
        width:100%;
    }
`;

export default PostModel;
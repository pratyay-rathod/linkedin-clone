import React from 'react';
import styled from 'styled-components';
import { useUserAuth } from "../../context/userAuthContext";

const Right = (props) => {

  const newsObj = {
    news1: {
      title: "Startups upbeat about hiring",
      news: "21h ago • 2,402 readers",
    },
    news2: {
      title: "Flipkart has no layoff plans",
      news: "3d ago • 972 readers",
    },
    news3: {
      title: "Chief Data Officers",
      news: "3d ago • 972 readers",
    },
    news4: {
      title: "Alibaba to split ready spinoffs",
      news: "1d ago • 2,984 readers",
    },
    news5: {
      title: "Decoding India's inflation data",
      news: "2d ago • 436 readers",
    }
  };

  const {user} = useUserAuth();

  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Linkedin News</h2>
          <img src="./images/feed-icon.svg" alt="feed" />
        </Title>
        <FeedList>
          {
            Object.keys(newsObj).map((key, index) => {
              return (
                <ul key={index}>
                  <li>
                    <h2>{newsObj[key].title}</h2>
                    <p style={{ marginTop: "10px", fontSize: "14px" }}>{newsObj[key].news}</p>
                  </li>
                </ul>
              );
            })
          }
        </FeedList>
      </FollowCard>
      <SkillsCard>
        <Add>
          Ad •••
        </Add>
        <SkillCollab>
          <p>
            You've got the skills, facebook has the opportunities
          </p>
          <Images>
            {
              user.photoURL!==null ? (
                <>
                  <img src={user.photoURL} referrerPolicy="no-referrer" alt="user" />
                </>
              ) : (
                <>
                  <img src="./images/user.svg" alt="User" />
                </>
              )
            }
            <img src="./images/face_book.png" alt="face_book" />
          </Images>
          <p>
            {user ? user.displayName : "user"}, Facebook is hiring!<br></br>
            <button>Follow</button>
          </p>
        </SkillCollab>
      </SkillsCard>
    </Container>
  )
}

const Container = styled.div`
    grid-area:rightside;
`;
const FollowCard = styled.div`
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:5px;
    position:relative;
    border:none;
    box-shadow: 0 0 0 1px rgb( 0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding:12px;
`;
const Title = styled.div`
    display:inline-flex;
    align-items:center;
    justify-content:space-between;
    font-size:16px;
    width:100%;
    color:rgba(0,0,0,0.6);
`;
const FeedList = styled.div`
    ul{
      margin:10px 17px;
      display: flex;
      color:rgba(0,0,0,0.6);
      li{
        text-align: start;
      }
    }
`;
const SkillsCard = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top:70px;
    background-color: #fff;
    padding:12px;
    box-shadow: 0 0 0 1px rgb( 0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    border-radius:5px;
    align-items: center;
    button{
      text-align: center;
    }
`;

const Add = styled.div`
    border-radius:5px;
    text-align: end;
    font-size:13px;
    margin:5px 0;
`;
const SkillCollab = styled.div`
    p{
      font-size:14px;
      text-align: center;
      margin:15px;
      color:#383838;
    }
    img{
        height:100px;
        width:100px;
        border-radius: 50px;
    }
    button{
        margin-top:20px;
        outline:none;
        padding:10px;
        border-radius:50px;
        border:1px solid blue;
        background-color:#fff;
        width:5rem;
        color:blue;
    }
`;
const Images = styled.div`
    display:flex;
    justify-content: center;
    img{

      object-fit: cover;
    }
`;

export default Right;

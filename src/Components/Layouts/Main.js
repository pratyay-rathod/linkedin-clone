import styled from 'styled-components';
import React from 'react';
import { GrArticle, GrLike } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { RiVideoFill } from 'react-icons/ri';
import { BsCalendar3Event, BsFillSendFill } from 'react-icons/bs';
import { FaEllipsisH, FaRegCommentDots } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { FiShare2 } from 'react-icons/fi';
import PostModel from '../PostModel';
import { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useUserAuth } from "../../context/userAuthContext";
import { PostFunctions } from "../../context/PostFunctions";

const Main = (props) => {

    const dispatch = useDispatch();
    const { user } = useUserAuth();
    const { Checking } = PostFunctions();
    const loading = useSelector(state => state.loading);
    const articles = useSelector(state => state.articles);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({type:"FETCH_POSTS_REQUEST"});
                await Checking();
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [Checking]);

    const [showModel, SetShowModel] = useState(false);
    const size = 20;
    const iconColor = { color: "blue" };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        SetShowModel(true);
    }

    return (
        <Container>
            <ShareBox>
                <div>
                    {
                        user.photoURL !== null ? (
                            <>
                                <img src={user.photoURL} referrerPolicy="no-referrer" alt="user" />
                            </>
                        ) : (
                            <>
                                <img src="./images/user.svg" alt="User" />
                            </>
                        )
                    }
                    <button onClick={handleClick} style={{ color: "#909090", fontWeight: "200", paddingLeft: "17px" }}>Start a post</button>
                </div>
                <div>
                    <button>
                        <HiOutlinePhotograph style={{ color: 'blue' }} size={size} />
                        <span>Photo</span>
                    </button>

                    <button>
                        <RiVideoFill style={{ color: 'green' }} size={size} />
                        <span>Video</span>
                    </button>

                    <button>
                        <BsCalendar3Event style={{ color: 'brown' }} size={size} />
                        <span>Event</span>
                    </button>

                    <button>
                        <GrArticle style={{ color: 'orange' }} size={size} />
                        <span>Write Article</span>
                    </button>
                </div>
            </ShareBox>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {loading === true ? <div><img key="loading-icon" style={{ height: "50px", width: "50px" }} src="./images/Spinner-1s-200px.gif" alt="loading" /></div> : ""}
            </div>
            <div>
                {
                    articles ?
                        articles.length > 0 &&
                        articles.map((articles, key) => (
                            <Artical key={key}>
                                <SharedActor>
                                    <a href="#">
                                        {
                                            articles.actor.image !== null ? (
                                                <>
                                                    <img src={articles.actor.image} referrerPolicy="no-referrer" alt={articles.actor.title} />
                                                </>
                                            ) : (
                                                <>
                                                    <img src="./images/user.svg" alt="User" />
                                                </>
                                            )
                                        }
                                        <div>
                                            <span>{articles.actor.title}</span>
                                            <span>{articles.actor.description}</span>
                                            <span>{new Date(articles.actor.date.seconds * 1000).toLocaleDateString("en-US")}</span>
                                        </div>
                                    </a>
                                    <button>
                                        <FaEllipsisH />
                                    </button>
                                </SharedActor>
                                <Description>
                                    {articles.description}
                                </Description>
                                <SharedImage>
                                    <a href="#">
                                        {
                                            !articles.sharedImage && articles.sharedVideo ? (<ReactPlayer width={"100%"} alt={articles.sharedVideo} url={articles.sharedVideo} controls />
                                            )
                                                :
                                                (
                                                    articles.sharedImage && <img src={articles.sharedImage} alt="Shared Image" />
                                                )
                                        }
                                    </a>
                                </SharedImage>
                                <SocialCounts>
                                    <li>
                                        <button>
                                            <BiLike style={{ color: "blue" }} />
                                            <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                                            <FcLike />
                                            <span>75</span>
                                        </button>
                                    </li>
                                    <li>
                                        <a>2 comments</a>
                                    </li>
                                </SocialCounts>
                                <SocialActions>
                                    <button>
                                        <GrLike style={iconColor} />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <FaRegCommentDots style={iconColor} />
                                        <span>Comment</span>
                                    </button>
                                    <button>
                                        <FiShare2 style={iconColor} />
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <BsFillSendFill style={iconColor} />
                                        <span>Send</span>
                                    </button>
                                </SocialActions>
                            </Artical>
                        ))
                        : ""
                }
            </div>
            {showModel && <PostModel onClose={() => SetShowModel(false)} user={user} onLoadingChange={(value) => setLoading(value)} />}
        </Container>
    )
}

const Container = styled.div`
    grid-area:main;
`;

const CommonCard = styled.div`
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:5px;
    position:relative;
    border:none;
    box-shadow:0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display:flex;
    flex-direction:column;
    color: yellow;
    margin:0 0 8px;
    background:white;
    div{
        button{
            outline:none;
            font-size:14px;
            line-height:1.5;
            min-height:48px;
            background:transparent;
            border:none;
            display:flex;
            align-items:center;
            font-weight:200;
        }
            &:first-child{
                display:flex;
                align-items:center;
                padding:8px 16px 0px 16px;
                img{
                    object-fit:cover;
                    height:45px;
                    width:45px;
                    border-radius:80%;
                    margin-right:8px;
                }
                button{
                    margin:4px 0;
                    flex-grow:1;
                    border-radius:35px;
                    border:1px solid rgba(0,0,0,0.15);
                    background-color:white;
                    text-align:left;
                }
            }
            &:nth-child(2){
                display:flex;
                flex-wrap:wrap;
                justify-content:space-around;
                padding-bottom:4px;
                button{
                    img{
                        margin:0 4px 0 -2px;
                    }
                    span{
                        margin-left:1rem;
                        color:#909090;
                        font-weight:500;
                    }
                }
            }
    }    
`;
const Artical = styled(CommonCard)`
    padding:0;
    margin:0 0 8px;
    overflow:visible;
`;
const SharedActor = styled.div`
    padding-right:40px;
    flex-wrap:nowrap;
    padding:12px 16px 0;
    margin-bottom:8px;
    align-items:center;
    display:flex;
    a{
        margin-right:12px;
        flex-grow:1;
        overflow:hidden;
        display:flex;
        text-decoration:none;
        color:black;
        img{
            width:48px;
            height:48px;
            object-fit:cover;
        }
        &>div{
            display:flex;
            flex-direction:column;
            flex-grow:1;
            flex-basis:0;
            margin-left:8px;
            overflow:hidden;
            span{
                text-align:left;
                &:first-child{
                    font-size:14px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size:12px;
                    color:rgba(0,0,0,0.6);

                }
            }
        }
    }
    button{
        position:absolute;
        right:12px;
        top:0;
        background:transparent;
        border:none;
        outline:none;
        
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow:hidden;
    color:rgba(0,0,0,0.9);
    font-size:14px;
    text-align:left;

`;
const SharedImage = styled.div`
    margin-top:8px;
    width:100%;
    display:block;
    position:relative;
    background-color:#f9fafb;
    img{
        object-fit:contain;
        width:100%;
        height:100%;
    }
`;
const SocialCounts = styled.ul`
    line-height:1.3;
    display:flex;
    align-items:flex-start;
    overflow:auto;
    margin:0 16px;
    padding:8px 0;
    border-bottom:1px solid #e9e5df;
    list-style:none;
    li{
        margin-right:5px;
        font-size:12px;
        button{
            display: flex;
            background-color:white;
            outline:none;
            border:none;
        }
    } 
`;
const SocialActions = styled.div`
    align-items:center;
    display:flex;
    justify-content:space-between;
    margin:0;
    min-height:40px;
    padding:4px 8px;
    button{
        display: inline-flex;
        align-items:center;
        padding:8px;
        outline:none;
        border:none;
        color:#0a66c2;
        @media(min-width:768px){
            span{
                margin-left:8px;

            }
        }
    }
`;

export default Main;

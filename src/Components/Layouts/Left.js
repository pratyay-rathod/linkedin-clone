import React from 'react';
import styled from 'styled-components';
import { TbPremiumRights } from 'react-icons/tb';
import { useUserAuth } from "../../context/userAuthContext";

const Left = (props) => {

    const ligtText = { color: "rgba(0,0,0,0.6)", fontSize: "12px" };
    const linksStyle = { textDecoration: "none" };
    const {user} = useUserAuth();
    
    return (
        <Container>
            <Artcard>
                <UserInfo>
                    <CardBackground />
                    <a href="#" style={linksStyle}>
                        <Photo>
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
                        </Photo>
                        <Link>
                            Welcome, {user ? user.displayName : "there"}
                        </Link>
                    </a>
                    <a href="#" style={linksStyle}>
                        <AddPhotoText>ANGULAR | LARAVEL PHP | JS | FULL STACK WEB DEVELOPER</AddPhotoText>
                    </a>
                </UserInfo>
                <Widget>
                    <a href="#">
                        <div>
                            <span style={ligtText}>Who's viewed your profile</span>
                        </div>
                        <span style={{ color: "#187bcd", fontSize: "12px" }}>32</span>
                    </a>
                    <a href="#">
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <span style={{ color: "#187bcd", fontSize: "12px" }}>113</span>
                    </a>
                </Widget>
                <Tools>
                    <span style={ligtText}>Access exclusive tools & insights</span>
                    <span><TbPremiumRights size={20} style={{ color: "orange" }} /> <a href="#">Try Premium for free</a></span>
                </Tools>
                <Item>
                    <span>
                        <img src="./images/item-icon.svg" alt="widget" />
                        My Items
                    </span>
                </Item>
            </Artcard>
            <CommunityCard>
                <a href="#" style={linksStyle}>
                    <span>Groups</span>
                </a>
                <a href="#" style={linksStyle}>
                    <span>
                        Events
                        <img src='./images/plus-icon.svg' alt="plus" />
                    </span>
                </a>
                <a href="#" style={linksStyle}>
                    <span>Follow Hashtags</span>
                </a>
                <a href="#" style={linksStyle}>
                    <span style={{ textAlign: "Center" }}>Discover more</span>
                </a>
            </CommunityCard>
        </Container>
    )
}

const Container = styled.div`
    grid-area:leftside;
`;
const Artcard = styled.div`
    height:auto;
    min-width:14rem;
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:5px;
    transition:box-shadow 83ms;
    position:relative; 
    border:none;
    box-shadow:0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const UserInfo = styled.div`
    border-bottom:1px solid rgba(0,0,0,0.15);
    padding:12px 12px 16px;
    word-wrap:break-word;
    word-break:break-word;
`;
const CardBackground = styled.div`
    background: url(./images/background.jpg);
    background-position:center;
    background-repeat: no-repeat;
    background-size: cover;
    height:54px;
    margin: -12px -12px 0;
`;
const Photo = styled.div`
    object-fit: cover;
    box-shadow:none;
    width:80px;
    height:80px;
    box-sizing:border-box;
    background-clip:content-box;
    background-color:white;
    background-position:center;
    background-size:100%;
    background-repeat:no-repeat;
    border:2px solid white;
    margin:-38px auto 12px; 
    border-radius:50%;
    img{
        width:80px;
    height:80px;
    border-radius:50%;

    }
`;
const Link = styled.div`
    font-size:16px;
    line-height:1.5;
    color:rgba(0,0,0,0.9);
    font-weight:600;

`;
const AddPhotoText = styled.div`
    color:#808080;
    margin-top:4px;
    font-size:12px;
    line-height:1.33;
    font-weight:400;
`;
const Widget = styled.div`
    border-bottom:1px solid rgba(0,0,0,0.15);
    padding-top:12px;
    padding-bottom:12px;
    &>a{
        text-decoration:none;
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding:4px 12px;
        &:hover{
            background-color:rgba(0,0,0,0.08);
        }
        div{
            display:flex;
            flex-direction:column;
            text-align:left;
            span{
                font-size:12px;
                line-height:1.333;
                &:first-child{
                    color:rgba(0,0,0,0.6);
                }
                &:nth-child(2){
                    color:rgba(0,0,0,1);
                }
            }
        }
    }
    svg{
        color:  (0,0,0,1);
    }
`;
const Item = styled.a`
    border-color:rgba(0,0,0,0.8);
    text-align:left;
    padding:12px;
    font-size:12px;
    display:block;
    span{
        display:flex;
        align-items:center;
        color:rgba(0,0,0,1);
        svg{
            color:rgba(0,0,0,6);
        }
    }
    &:hover{
        background-color:rgba(0,0,0,0.08);

    }
`;
const CommunityCard = styled(Artcard)`
    padding:8px 0 0;
    text-align:left;
    display:flex;
    flex-direction:column;
    top: 70px; 
    position: -webkit-sticky;
    position: sticky;
    a{
        color: #00316e;
        padding:10px 12px 10px 12px;
        font-size:14px;
        &:hover{
            color:#0a66c2;
        }
        span{
            display:flex;
            align-items:center;
            justify-content:space-between;
        }        
            &:last-child{
                color:rgba(0,0,0,0.6);
                text-decoration:none;
                border-top:1px solid #d6cec2; 
                padding:12px;
                &:hover{
                    background-color:rgba(0,0,0,0.08);                    
                }
            }
    }
`;
const Tools = styled.div`
    border-bottom:1px solid rgba(0,0,0,0.15);
    text-align:left;
    padding:12px;
    font-size:12px;
    display:block;
    a{
        color:#000000;
    }
    span{
        display:flex;
        align-items:center;
        color:rgba(0,0,0,1);
        svg{
            color:rgba(0,0,0,6);
        }
    }
    &:hover{
        background-color:rgba(0,0,0,0.08);
    }
    a:hover{
        color: blue;
    }
`;


export default Left

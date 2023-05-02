import React from "react";
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import { useUserAuth } from "../context/userAuthContext";
import { useNavigate } from "react-router";

const Header = (props) => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="./images/home-logo.svg" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <SearchIcon>
                        <FaSearch />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList>
                            <a href="#" className="active">
                                <img src="./images/nav-home.svg" alt="Home" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a href="#">
                                <img src="./images/nav-network.svg" alt="Network" />
                                <span>My Network</span>
                            </a>
                        </NavList><NavList>
                            <a href="#">
                                <img src="./images/nav-jobs.svg" alt="Jobs" />
                                <span>Jobs</span>
                            </a>
                        </NavList><NavList>
                            <a href="#">
                                <img src="./images/nav-Messaging.svg" alt="Messaging" />
                                <span>Messaging</span>
                            </a>
                        </NavList><NavList>
                            <a href="#">
                                <img src="./images/nav-notifications.svg" alt="Home" />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a>
                                {
                                    user.photoURL!==null ? (
                                        <img src={user.photoURL} referrerPolicy="no-referrer" alt="user" />
                                    ) : (
                                        <img src="./images/user.svg" alt="User" />
                                    )
                                }
                                <Me>
                                    <span>Me</span>
                                    <img src="./images/down-icon.svg" alt="dropDown" />
                                </Me>
                            </a>

                            <SignOut onClick={handleLogout}>
                                <a>
                                    Sign Out
                                </a>
                            </SignOut>
                        </User>
                        <Work>
                            <a>
                                <img src="./images/nav-work.svg" alt="Work" />
                                <Me>
                                    <span>For Business</span>
                                    <img src="./images/down-icon.svg" alt="dropDown" />
                                </Me>
                            </a>
                        </Work>
                        <Premium>
                            <a href="#" style={{ color: "brown", fontSize: "13px" }}>
                                Try Premium <br></br>for free
                            </a>
                        </Premium>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,0.00);
    left:0;
    padding:0 24px;
    position: fixed;
    top:0;
    width:100vw;
    z-index:100; 
    height:3.2rem;
   
`;
const Me = styled.div`
    display:flex;
`;
const Content = styled.div`
    display:flex;
    align-items:center;
    margin:0 auto;
    min-height:100%;
    max-width:1120px;
`;
const Logo = styled.header`

`;
const Search = styled.div`
    opacity: 1;
    flex-grow: 2;
    position: relative;
    margin-left: 1rem;
    &>div{
        input{
            max-width: 280px;
            border:none;
            box-shadow: none;
            background-color: #eef3f8;
            border-radius:2px;
            color:rgba(0,0,0,0.4);
            width:218px;
            padding:0 8px 0 40px;
            line-height:1.75;
            font-size:15px;
            vertical-align:text-top;
            height:2rem;
        }
    }
`;
const SearchIcon = styled.div`
    width:40px;
    position:absolute;
    z-index:1;
    top:8px;
    left:2px;
    margin:0;
    pointer-events:none;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#808080;
`;
const Nav = styled.nav`
    margin-left: auto;
    display:block;
    @media (max-width:768px) {
        position:fixed;
        left:0;
        bottom:0;
        bakcground:white;
        width:100%;
    }
`;
const NavListWrap = styled.ul`
    display: flex;
    list-style-type:none;
    .active{
        span:after{
            content:"";
            transform:scaleX(1);
            border-bottom: 2px solid var(--white,#fff);
            top:3rem;
            bottom:0;
            left:0;
            position:absolute;
            transition:transform 0.2s ease-in-out;
            width:100%;
            border-color:rgba(0,0,0,0.9); 
        }
    }    
    @media (max-width:768px) {
        width:5rem;
    }
`;
const NavList = styled.li`
    display:flex;
    align-items:center;
    a{
        align-items:center;
        background: transparent;
        display:flex;
        flex-direction:column;
        font-size:12px;
        font-weight:400;
        justify-content:center;
        line-height:1.5%;
        min-height:42px;
        min-width:80px;
        position:relative;
        text-decoration:none;
        span{
            color:rgba(0,0,0,0.6);
            display:flex;
            align-items:center;
            margin-top:0.5rem;
        }
        @media (max-width:768px){
            max-width:70px;
        }
    }
    &:hover, &:active{
        a{
            span{
                color:rgba(0,0,0,0.9);
            }
        }
    }
`;
const SignOut = styled.button`
        position:absolute;
        top:45%;
        background:white;
        border-radius:0 0 5px 5px;
        width:100px;
        height:40px;
        font-size:16px;
        transition-duration:167ms;
        text-align:center;
        display:none;
        border:none;
`;
const User = styled(NavList)`
    a > svg{
        width:24px;
        border-radius:50%;
    }
    a > img {
        width:27px;
        height:27px;
        border-radius: 50%;
        object-fit: cover;
    }
    span{
        display:flex;
        align-items: center;
    }
    &:hover{
        ${SignOut}{
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`;
const Work = styled(User)`
    border-left:1px solid rgba(0,0,0,0.08);
    margin:0 15px;
    padding:0 15px;
`;
const Premium = styled.div`
`;
export default Header;
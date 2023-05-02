import React from 'react'
import styled from 'styled-components';

const IconHeader = () => {
    return (
        <Nav>
            <a href="/">
                <img src="./images/login-logo.svg" alt="Linked In" />
            </a>
        </Nav>
    )
}

const Nav = styled.nav`
    max-width:1128px;
    padding:30px 35px;
    display:flex;
    align-items:center;
    flex-wrap:nowrap;

    & > a{
        width:135px;
        height:34px;
        @media (max-width:768px){
            padding:0 5px;
        } 
    }
    img{
        height:29px;
    }
`;

export default IconHeader;
import React from "react";
import styled from "styled-components";
import Left from "./Layouts/Left";
import Main from "./Layouts/Main";
import Right from "./Layouts/Right";
import { useUserAuth } from "../context/userAuthContext";
import { useNavigate } from "react-router";

const Home = (props) => {

    return (
        <Container>
            <Layout>
                <Left />
                <Main />
                <Right />
            </Layout>
        </Container>
    )
}

const Container = styled.div`
    padding-top:52px;
    max-width:100%;

`;

const Layout = styled.div`
    display: grid;
    padding:0 8rem;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    /* grid-template-row: auto; */
    margin: 25px 0;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;

export default Home;
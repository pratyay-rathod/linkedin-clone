import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import IconHeader from './IconHeader/IconHeader';
import styled from 'styled-components';
import { useUserAuth } from '../context/userAuthContext';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

const RegisterUser = () => {

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        if (isEmail(email) === false) {
            setEmailError("Please enter a valid email address");
            return;
        }
        if (isStrongPassword(password) === false) {
            setPasswordError(
                "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers"
            );
            return;
        }
        try {
            await signUp(email, password);
            navigate("/home");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setEmailError("Email address is already in use");
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <Container>
            <IconHeader />
            <SignUpForm>
                <>
                    <h1>Make the most of your professional life</h1>
                </>
                <SignUp>
                    <>
                        <Input type="email" placeholder='Email or Phone' onChange={(e) => setEmail(e.target.value)} isError={!!emailError} required />
                        {emailError && <ErrorMessage style={{ fontSize: "20px" }}>{emailError}</ErrorMessage>}
                        <Input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} isError={!!passwordError} required />
                        {passwordError && <ErrorMessage ErrorMessage style={{ fontSize: "20px" }}>{passwordError}</ErrorMessage>}
                    </>
                    <>
                        <p>By clicking Agree & Join, you agree to the LinkedIn <span style={{ color: "blue" }}>User Agreement, Privacy Policy,</span> and <span style={{ color: "blue" }}>Cookie Policy.</span></p>
                        <Button onClick={handleSignup}>Sign in</Button>
                    </>
                    <>
                        <GoogleAccountSignin>
                            <img src="./images/google.svg" alt='google' />
                            Sign with Google
                        </GoogleAccountSignin>
                    </>
                </SignUp>
            </SignUpForm>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    padding:0px;
`;

const ErrorMessage = styled.p`
    color:red;
`;

const SignUpForm = styled.div`
    h1{
        text-align:center;
        color:#333333;
        font-weight:100px;
        font-size:30px;
    }
`;
const SignUp = styled.div`
    margin:0 auto;
    width:400px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    padding: 20px;
    border-radius: 8px;
    h1{
        font-size:2rem;
        line-height:1;
        font-weight:300;
        color:rgba(0,0,0,0.9);
    }
    p{
        font-size:12px;
        text-align: center;
    }
    @media (max-width:768px) {
            width: 19rem;
    }
`;

const Input = styled.input`
    margin:20px 0 10px 0;
    border:none;
    outline:none;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 10px;
    font-size: 16px;
    width:90%;
    border: 1px solid ${({ isError }) => (isError ? "red" : "gray")};
    &:focus{
        border:1px solid blue;
    }
`;

const Button = styled.button`
        outline:none;
        background-color: #1260CC;
        border:none;
        height: 3rem;
        width:100%;
        align-items: center;
        border-radius:40px;
        color:white;
        margin-top:1rem;
        margin-bottom:2rem;
        font-size:18px;
`;

const GoogleAccountSignin = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height:50px;
    width: 100%;
    border-radius:28px;
    border: 1px solid #1c1c1c;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    z-index:0;
    transition-duration:167ms;
    font-size:20px;
    color:rgba(0,0,0,0.6);
    &:hover{
        background-color: rgba(207,207,207,0.25);
        color:rgba(0,0,0,0.75);
    }
    a{
        text-decoration: none;
        color:black;
    }
`;

export default RegisterUser
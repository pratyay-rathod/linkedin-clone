import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SigninAuth from './Signin';
import { useUserAuth } from "../context/userAuthContext";
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { logIn, googleSignIn } = useUserAuth();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);


    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");
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
            await logIn(email, password);
            navigate("/home");
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setEmailError('Couldn’t find a LinkedIn account associated with this email. Try again or create an account .'); // Set error message for email not found
            } else if (err.code === 'auth/wrong-password') {
                setPasswordError('Incorrect password.'); // Set error message for wrong password
            }
            else {
                setError(err.message);
            }
        }
    };

    const validateEmail = (input) => {
        if (!isEmail(input)) {
            setEmailError("Please enter a valid email address");
            setEmailIsValid(false);
        } else {
            setEmailError("");
            setEmailIsValid(true);
        }
    };

    // Validation function for password
    const validatePassword = (input) => {
        if (!isStrongPassword(input)) {
            setPasswordError(
                "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers"
            );
            setPasswordIsValid(false);
        } else {
            setPasswordError("");
            setPasswordIsValid(true);
        }
    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Container>
                <Nav>
                    <a href="/">
                        <img src="./images/login-logo.svg" alt="Linked In" />
                    </a>
                    <div>
                        <Join>
                            <NavLink to="/joinnow" style={{ textDecoration: "none", color: "black" }}>
                                Join now
                            </NavLink>
                        </Join>
                        <Signin className='signin'>
                            <NavLink to="/signin" style={{ textDecoration: "none" }}>
                                <button>Sign in</button>
                            </NavLink>
                        </Signin>
                    </div>
                </Nav>
                <Section>
                    <Hero>
                        <h1>Welcom to your professional community</h1>
                        <img src="./images/login-hero.svg" alt="Linked In" />
                    </Hero>
                    <Form>
                        <LoginForm>
                            <div>
                                <label for="email">Email or phone</label>
                                <Input
                                    type="email"
                                    placeholder="Email or Phone"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        validateEmail(e.target.value);
                                    }}
                                    isError={!!emailError}
                                    isValid={emailIsValid}
                                    required
                                />
                                {emailError && <ErrorMessage style={{ fontSize: "20px" }}>{emailError}</ErrorMessage>}
                            </div>
                            <div style={{marginTop:"2rem"}}>
                                <label for="password">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        validatePassword(e.target.value);
                                    }}
                                    isError={!!passwordError}
                                    isValid={passwordIsValid}
                                    required
                                />
                                {passwordError && <ErrorMessage ErrorMessage style={{ fontSize: "20px" }}>{passwordError}</ErrorMessage>}
                            </div>
                            <div className="btnSignin">
                                <label for="SignIn" style={{ color: "blue",margin:"1rem 0" }}>Forgot Password ?</label>
                                <button className='BtnSignin' onClick={handleSignin}>Sign in</button>
                            </div>
                        </LoginForm>
                        <Google onClick={handleGoogleSignIn}>
                            <img src="./images/google.svg" alt='google' />
                            Sign with Google
                        </Google>
                    </Form>
                </Section>
            </Container>
        </div>
    )
}

const Container = styled.div`
    background-color: white;
    padding:0px;
`;

const Nav = styled.nav`
    max-width:1128px;
    margin:auto;
    padding:12px 0 16px;
    display:flex;
    align-items:center;
    position:relative;
    justify-content:space-between;
    flex-wrap:nowrap;

    & > a{
        width:135px;
        height:34px;
        @media (max-width:768px){
            padding:0 5px;
        } 
    }
`;


const Join = styled.a`
    font-size:18px;
    padding: 10px 12px;
    text-decoration:none;
    border-radius: 4px;
    color:rgba(0,0,0,0.6);
    margin-right:12px;
    /* text-align: center; */
    &:hover{
        background-color: rgba(0,0,0,0.1);
        color:rgba(0,0,0,0.9);
        text-decoration:none;
    }
`;

const Signin = styled.a`
    box-shadow: inset 0 0 0 1px #3792cb;
    border-radius:24px;
    transition-duration: 167ms;
    padding:10px 24px;
    text-align: center;
    background-color:rgba(0,0,0,0);
    text-decoration: none;
    button{
        color:#3792cb;
        font-size:16px;
        font-weight:600;
        line-height:40px;
        border:none;
        outline:none;
        background-color: transparent;
    }
    @media (max-width:360px){
        padding:5px 5px;
    } 
    &:hover{
        background-color:rgba(112,181,249,0.15);
        color:#3792cb;
    }
`;

const ErrorMessage = styled.p`
    color:red;
    @media (max-width: 768px) {
        &{
            margin:0;
        }
    }
`;

const Section = styled.section`
    display:flex;
    align-content: start;
    min-height:700px;
    padding-bottom: 138px;
    padding-top:10px;
    padding:10px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1128px;
    align-items: center;
    margin: auto;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
        margin: auto;
        min-height: 0px;
    }
`;

const Hero = styled.section`
    width:100%;
    h1{
        padding-bottom: 0;
        width: 55%;
        font-size: 50px;
        color: #875C36;
        font-weight: 90;
        line-height: 70px;
        @media (max-width: 768px) {
            font-size: 20px;
            width: 100%;
            line-height: 2;
        }
    }
    img{
        /* z-index: -1; */
        width: 700px;
        height: 678px;
        position: absolute;
        bottom: -2px;
        right: -158px;
        @media (max-width:768px) {
            top: 23px;
            width: 19rem;
            position: initial;
            height: initial;
        }
    }
`;

const Google = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height:56px;
    width: 27rem;
    border-radius:28px;
    border: 1px solid #baaaa8;
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
    @media (max-width:768px) {
        width:21rem;
    }
`;

const Form = styled.div`
    /* margin-top:50px; */
    width:408px;
    @media (max-width:768px) {
        margin-top:20px;
    }
`;

const Input = styled.input`
    border:none;
    outline:none;
    height: 2.5rem;
    width:25rem;
    padding:0.2rem 1rem;
    font-size: 18px;
    border: 1px solid ${({ isError, isValid }) => (isError ? "red" : isValid ? "blue" : "gray")};
    &:focus{
        border:1px solid blue;
    }
`;

const LoginForm = styled.div`
    label{
        display:block;
        margin-bottom: 0.8rem;
    }
    
    .BtnSignin{
        outline:none;
        background-color: #1260CC;
        border:none;
        height: 3rem;
        width:27rem;
        align-items: center;
        border-radius:40px;
        color:white;
        margin-top:0.8;
        margin-bottom:2rem;
    }
    @media (max-width:768px) {
        input{
            width:19rem;
        }
        .BtnSignin{
            width:21rem;
        }
    }
    `;

export default Login;
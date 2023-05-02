import React from 'react'
import styled from 'styled-components';
import IconHeader from './IconHeader/IconHeader';

const SigninAuth = () => {
    return (

        <Container>
            <IconHeader/>
            <SigninCard>
                <>
                    <h1>Sign in</h1>
                    <p>Stay updated on your professional world</p>
                </>
                <>
                    <Input type="email" placeholder='Email or Phone' required/>
                    <Input type="password" placeholder='Password' required/>
                </>
                <>
                    <a href='#'>Forgot password?</a>
                    <Button>Sign in</Button>
                </>
                <>
                        <GoogleAccountSignin>
                            <img src="./images/google.svg" alt='google' />
                            Sign with Google
                        </GoogleAccountSignin>
                </>
                        <AppleAccountSignin>
                            <img src="./images/apple.jpg" alt='apple_account' style={{height:"20px"}}/>
                            Sign with Google
                        </AppleAccountSignin>
            </SigninCard>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    padding:0px;
`;

const SigninCard = styled.div`
    margin:0 auto;
    width:300px;
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
    }
    a{
        text-decoration:none;
        margin:100px 0;
        color: #00239c;
        font-size:15px;
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
    border:1px solid gray;
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

const AppleAccountSignin = styled(GoogleAccountSignin)`
    margin:10px 0;
`

export default SigninAuth
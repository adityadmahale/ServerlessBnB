import { React } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../registration/userPool.js";
import { toast } from "react-toastify";


function Login() {

    const [loginForm, setValues] = useState({
        email: '',
        password: ''
    });

    let navigate = useNavigate();


    const setFormValueChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...loginForm, [name]: value });
    };

    const onLoginFormSubmit = (event) => {
        event.preventDefault();
        if (loginForm.email == '' || loginForm.password == '') {
            toast.error("Please enter credentials!!");
            return;
        }

        const userAuthDetails = new AuthenticationDetails({
            Username: loginForm.email,
            Password: loginForm.password
        });

        const loginUser = new CognitoUser({
            Username: loginForm.email,
            Pool: UserPool
        });


        loginUser.authenticateUser(userAuthDetails, {
            onSuccess: data => {
                console.log("Successfully", data);
                localStorage.setItem("username", loginForm.email);
                navigate("../question-validate");
            },

            onFailure: err => {
                console.error("onFailure:", err);
                toast.error("Invalid Username or Password. Please try again!!");
            }
        });
    }


    return (
        <>
            <div>
                <form onSubmit={onLoginFormSubmit}>
                    <div className="f-body">
                        <div>
                            <label>Username</label>
                            <input type="text" value={loginForm.email} name="email" onChange={setFormValueChange}></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" value={loginForm.password} onChange={setFormValueChange}></input>
                        </div>
                        <button type="submit">Submit</button>
                        <div>
                            <label>Don't have an account?</label>
                            <a style={{ textDecoration: 'none' }} href='/registration'>     Sign Up</a>
                        </div>
                    </div>
                </form>
            </div>

        </>

    );
}

export default Login;
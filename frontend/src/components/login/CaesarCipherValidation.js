import { React } from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../customer/header/Navbar";
import axios from 'axios';

function CaesarCipherValidation() {

    const [createdCipherString, setCreatedCipherString] = useState();

    const [encryptedStrForm, setValues] = useState({
        encryptedStr: ''
    });

    let navigate = useNavigate();

    useEffect(() => {
        setCreatedCipherString(createCipherString())
    }, []);

    const createCipherString = () => {
        var cipherString = '';
        var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 4; i++) {
            cipherString = cipherString + alphabets.charAt(Math.floor(Math.random() * alphabets.length));
        }
        return cipherString;
    }


    const handleCaesarCipherValueChange = (event) => {
        const { name, value } = event.target;
        // console.log(event+ "  ");
        setValues({ ...encryptedStrForm, [name]: value });
    };

    const oSubmitCaesarCipherForm = (event) => {
        event.preventDefault();
        if (encryptedStrForm.encryptedStr == '') {
            alert('Please enter encrypted value to proceed');
            return;
        }
        const requestBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                // 'username': localStorage.getItem('username'),
                'username': 'abc@gmail.com',
                'caesarString': createdCipherString,
                'userInput': encryptedStrForm.encryptedStr
            }
        };
        let obj = {
            // 'username': localStorage.getItem('username'),
            'username': 'abc@gmail.com',
            'caesarString': createdCipherString,
            'userInput': encryptedStrForm.encryptedStr
        };
        axios.post('https://us-central1-caesarcipher-356421.cloudfunctions.net/validateCaesar', obj)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                localStorage.setItem("group29_logged_in", true);
                console.log("Navigate to dashboard");
                // navigate("dashboard");
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }


    return (
        <>
            <Navbar></Navbar>
            <form onSubmit={oSubmitCaesarCipherForm}>
                <div className="f-body">
                    <div>
                        <div>Encrypt String</div>
                        <label><b>{createdCipherString}</b></label>
                        <input type="text" value={encryptedStrForm.encryptedStr} name="encryptedStr" onChange={handleCaesarCipherValueChange}></input>
                    </div>

                    <button type="submit">Submit</button>
                </div>
            </form>
        </>

    );
}

export default CaesarCipherValidation

// https://us-east1-group28serverless-356606.cloudfunctions.net/caeserCipher
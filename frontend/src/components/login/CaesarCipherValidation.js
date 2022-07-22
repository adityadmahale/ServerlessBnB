import { React } from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

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
        setValues({ ...encryptedStrForm, [name]: value });
    };

    const oSubmitCaesarCipherForm = (event) => {
        event.preventDefault();
        if (encryptedStrForm.encryptedStr == '') {
            toast.error('Encrypted String can not be empty!!');
            return;
        }

        let obj = {
            'username': localStorage.getItem('username'),
            'caesarString': createdCipherString,
            'userInput': encryptedStrForm.encryptedStr
        };
        axios.post('https://us-central1-csci-5410-user-management.cloudfunctions.net/validateCaesar', obj)
            .then(response => {
                if (response.status === 401) {
                    toast.error('Incorrect cipher. Please try again!!');
                }
                else if (response.status === 200) {
                    localStorage.setItem("group29_logged_in", true);
                    toast.info("Login successful")
                    navigate("../home");
                }
                else {
                    toast.error('Something went wrong!!');
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Incorrect cipher. Please try again!!');
            });
    }


    return (
        <>
            <form onSubmit={oSubmitCaesarCipherForm}>
                <div className="f-body">
                    <div>
                        <div>Encrypt the below string with your Secret Key:</div>
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
import { React } from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

function QuestionValidation() {


    const [securityQuestion, setSecurityQuestion] = useState("");
    const [sQuestionAnswerForm, setValues] = useState({
        answer: ''
    });
    let navigate = useNavigate();
    let preventCall = false;
    useEffect(() => {
        if (!preventCall) {
            preventCall = true;
            axios.get('https://4wnfxczlz7qdv472brocdmaviy0wactg.lambda-url.us-east-1.on.aws/authenticateQuestion/question?username=' + localStorage.getItem("username"))
                .then(res => {
                    console.log(res);
                    setSecurityQuestion(res.data.question);
                }).catch(err => {
                    console.log(err);
                })
        }

    }, []);


    const handleQuestionnaireForm = (event) => {
        event.preventDefault();
        if (sQuestionAnswerForm['answer'] == '') {
            toast.error('Please enter something.');
            return;
        }

        let obj = {
            [securityQuestion]: sQuestionAnswerForm.answer,
            "username": localStorage.getItem('username')
        }
        const requestBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: obj
        };

        axios.post("https://4wnfxczlz7qdv472brocdmaviy0wactg.lambda-url.us-east-1.on.aws/authenticateQuestion/validateAns", obj)
            .then(res => {
                console.log(res.data);
                navigate("../caesarcipher-validate");

            })
            .catch(error => {
                console.log(error + " questionnaire response");
                toast.error('Incorrect Answer. Please try again!!');
            });
    }


    const handleFormValueChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...sQuestionAnswerForm, [name]: value });
    };


    return (
        <>
            <form onSubmit={handleQuestionnaireForm}>
                <div className="f-body">
                    <div >
                        <label>Security Question:</label>
                    </div>
                    <div>
                        <label>{securityQuestion}</label>
                        <input type="text" value={sQuestionAnswerForm['answer']} name="answer" onChange={handleFormValueChange}></input>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>

    );
}

export default QuestionValidation
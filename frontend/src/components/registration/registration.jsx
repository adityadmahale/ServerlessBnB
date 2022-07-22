import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//AWS and GCP imports
import userPool from "./userPool";
import { db } from "./firebase.config";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var AWS = require("aws-sdk");
const config = {
	region: "us-east-1",
	accessKeyId: "ASIAQC5HHFVDGALWIB45",
	secretAccessKey: "8CkGKiBLhUHWQNVyX0OvaeAkhTjK4I8gRhUzJrlZ",
	sessionToken:
		"FwoGZXIvYXdzEB0aDOV6j7HjiQf4oYvIbSLAAavsgkX7PCOW80iLfvv9e3NWSyCrb10oqrV5SlvugEbpEt9pIvkJwQVpVy4PzYYgM4HJMGSIdz0KZ8go6euB49zDujIGYH13OSQN5t9QCh7m5LXTYGurunZxJnOk+mbAb44dZWJ7+b2Q9e3Vyyl68MpM36FxtvjdRsY3dAQO1PcEYdAxvuzYRazIYV3V7hxNlDw9DQaUwSi4U3SSKdSW91nFt9U9lXIh6RZz+oUz8fWQUqcCGTOtETYRmufsqptjlCiPt+iWBjItK4Q9XuQ1xdDgb99w3P20EqM0URoT0jHRujoB1Mp8rNWn+s5oVqNVNHJJY5On",
};
AWS.config.update({
	region: config.region,
	credentials: new AWS.Credentials(
		config.accessKeyId,
		config.secretAccessKey,
		config.sessionToken
	),
});

const dynamodb = new AWS.DynamoDB({
	apiVersion: "2012-08-10",
	region: "us-east-1",
});
const theme = createTheme();

export default function SignUp() {
	let navigate = useNavigate();
	//AWS config
	const dbclient = new AWS.DynamoDB(AWS.config);

	//Variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [givenName, setGivenName] = useState("");
	const [familyName, setfamilyName] = useState("");
	const [answer1, setAnswer1] = useState("");
	const [answer2, setAnswer2] = useState("");
	const [answer3, setAnswer3] = useState("");
	const [secretKey, setSetSecretKey] = useState("");
	const [customerid, setCustomerid] = useState("");
	const [error, setError] = useState({});
	const question1 = "What is the name of your primary school?";
	const question2 = "What is the name of your childhood friend?";
	const question3 = "What is the name of your mother?";

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		setEmail(data.get("email"));
		setPassword(data.get("password"));
		setGivenName(data.get("firstName"));
		setfamilyName(data.get("lastName"));
		setAnswer1(data.get("answer1"));
		setAnswer2(data.get("answer2"));
		setAnswer3(data.get("answer3"));
		setSetSecretKey(data.get("secretKey"));
		validate(data);
		if (true) {
			axios
				.post(
					"https://xcorq32k65.execute-api.us-east-1.amazonaws.com/dev/customerid",
					{
						name: givenName,
						room: "suite",
					}
				)
				.then(function (response) {
					setCustomerid(response.data);
					//Adding data to cognito
					var attributeList = [];
					var dataEmail = {
						Name: "email",
						Value: email,
					};
					var dataGivenName = {
						Name: "given_name",
						Value: givenName,
					};
					var dataFamilyName = {
						Name: "family_name",
						Value: familyName,
					};
					var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
						dataEmail
					);
					var attributegivenName =
						new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
					var attributefamilyName =
						new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
					attributeList.push(attributeEmail);
					attributeList.push(attributegivenName);
					attributeList.push(attributefamilyName);
					userPool.signUp(
						email,
						password,
						attributeList,
						null,
						(err, result) => {
							if (result) {
								console.log("user successfully added to cognito");
								//adding to dynamodb

								const params = {
									TableName: "UserCred",
									Item: {
										Secretquestion1: { S: question1 },
										answer1: { S: answer1 },
										Secretquestion2: { S: question2 },
										answer2: { S: answer2 },
										Secretquestion3: { S: question3 },
										answer3: { S: answer3 },
										email: { S: email },
										firstName: { S: givenName },
										lastName: { S: familyName },
										customerid: { S: customerid },
									},
								};

								dynamodb.putItem(params, function (err) {
									if (err) {
										console.error("unable to update ", err);
										return false;
									} else {
										console.log("updated");

										//adding to firebase
										db.collection("userDetails").doc(email).set({
											email: email,
											secretKey: secretKey,
										});
										navigate("/login");
									}
								});
							}
						}
					);
				})
				.catch(function (err) {
					console.log(err);
				});
		}
	};
	const validate = (data) => {
		const errors = {};
		if (data.get("firstName") === "") {
			errors.firstname = "First name Required!";
		} else if (!/^[A-Za-z]+$/.test(data.get("firstName"))) {
			errors.firstname = "First name can only have characters!";
		}
		if (data.get("lastName") === "") {
			errors.lastname = "Last name Required!";
		} else if (!/^[A-Za-z]+$/.test(data.get("lastName"))) {
			errors.lastname = "First name can only have characters!";
		}
		if (data.get("email") === "") {
			errors.email = "Email Required! ";
		}
		if (data.get("password") === "") {
			errors.password = "password is required";
		} else if (data.get("password").length < 8) {
			errors.password = "password length is less then 8";
		} else if (!/^[ A-Za-z0-9_@./#&+-]*$/.test(data.get("password"))) {
			errors.password = "Only special characters and alphanumeric is allowed!";
		}
		if (data.get("answer1") === "") {
			errors.answer1 = "Security answer is required";
		} else if (!/^[A-Za-z0-9]+$/.test(data.get("answer1"))) {
			errors.answer1 = "Only Alphanumeric is allowed";
		}
		if (data.get("answer2") === "") {
			errors.answer2 = "Security answer is required";
		} else if (!/^[A-Za-z0-9]+$/.test(data.get("answer2"))) {
			errors.answer2 = "Only Alphanumeric is allowed";
		}
		if (data.get("answer3") === "") {
			errors.answer3 = "Security answer is required";
		} else if (!/^[A-Za-z0-9]+$/.test(data.get("answer3"))) {
			errors.answer3 = "Only Alphanumeric is allowed";
		}
		if (data.get("secretKey") === "") {
			errors.secretKey = "Secret key is required";
		} else if (data.get("secretKey").length > 3) {
			errors.secretKey = "Secret key should be 3 digits";
		} else if (!/^[0-9]+$/.test(data.get("secretKey"))) {
			errors.secretKey = "Only Numeric is allowed";
		}
		setError(errors);
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					className="r-form"
				>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
								<p style={{ color: "red" }}>{error.firstname}</p>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
								<p style={{ color: "red" }}>{error.lastname}</p>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
								<p style={{ color: "red" }}>{error.email}</p>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
								<p style={{ color: "red" }}>{error.password}</p>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="secretKey"
									label="Secret Key"
									type="password"
									id="secretKey"
								/>
								<p style={{ color: "red" }}>{error.secretKey}</p>
							</Grid>
							<Grid item xs={12}>
								Security Question 1: What is the name of your primary school?
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="answer1"
									label="Answer"
									id="answer1"
								/>
								<p style={{ color: "red" }}>{error.answer1}</p>
							</Grid>
							<Grid item xs={12}>
								Security Question 2: What is the name of your childhood friend?
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="answer2"
									label="Answer"
									id="answer2"
								/>
								<p style={{ color: "red" }}>{error.answer2}</p>
							</Grid>
							<Grid item xs={12}>
								Security Question 3: What is the name of your mother?
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="answer3"
									label="Answer"
									id="answer3"
								/>
								<p style={{ color: "red" }}>{error.answer3}</p>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

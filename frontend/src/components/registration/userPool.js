var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const poolData = {
	UserPoolId: "us-east-1_g3g1L6Sjz",
	ClientId: "2ent61mribk79tnr5b7i7t81ia",
};

export default new CognitoUserPool(poolData);

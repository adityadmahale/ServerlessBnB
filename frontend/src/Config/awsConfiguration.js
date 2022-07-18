import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_PFnZ1ZKiJ',
    ClientId: '27aib7mp5e27k77j3eti349pv'
};

export default new CognitoUserPool(poolData);
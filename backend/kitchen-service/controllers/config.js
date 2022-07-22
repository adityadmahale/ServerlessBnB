/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDnN_YXuh7dPCy1f9oBYBzVvQBjMZdxAJc",
  authDomain: "serverlessregapp.firebaseapp.com",
  projectId: "serverlessregapp",
  storageBucket: "serverlessregapp.appspot.com",
  messagingSenderId: "425721810915",
  appId: "1:425721810915:web:20741ecf488a9ed1c1dad6",
  measurementId: "G-MMLS68CD2M",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;

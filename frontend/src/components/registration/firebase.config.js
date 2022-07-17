import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAvFWdZ1plBtkGkuf4aIRik0mf7pneDoIQ",
	authDomain: "csci-5410-user-management.firebaseapp.com",
	projectId: "csci-5410-user-management",
	storageBucket: "csci-5410-user-management.appspot.com",
	messagingSenderId: "314251034718",
	appId: "1:314251034718:web:99aaa2406e48c5ce1574cf",
	measurementId: "G-1RL9FCZV0Z",
};

const firebase = Firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN8pBNvHgcxFDLNWB-0OuCED3idVCFy-Q",
  authDomain: "bussapi-1205f.firebaseapp.com",
  projectId: "bussapi-1205f",
  storageBucket: "bussapi-1205f.appspot.com",
  messagingSenderId: "128078449106",
  appId: "1:128078449106:web:35a3e31e08df6ce96a600b",
  measurementId: "G-XV0D2KDGBV"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase
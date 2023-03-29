import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-test-2-274eb.firebaseapp.com",
  projectId: "auth-test-2-274eb",
  storageBucket: "auth-test-2-274eb.appspot.com",
  messagingSenderId: "287092534649",
  appId: "1:287092534649:web:52ca243316bfdc06d8d3a8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDK6dVXhbGGu-1UPcJb_-I6D8w77EO-kU",
  authDomain: "crime-lens-ai.firebaseapp.com",
  projectId: "crime-lens-ai",
  storageBucket: "crime-lens-ai.firebasestorage.app",
  messagingSenderId: "744483795197",
  appId: "1:744483795197:web:3450e9310ee75730b48e94"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
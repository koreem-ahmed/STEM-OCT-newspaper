import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4vf-Vdj8VuU9h6eU8xQgMwPrJdX2jtTs",
  authDomain: "news-paper-store.firebaseapp.com",
  projectId: "news-paper-store",
  storageBucket: "news-paper-store.firebasestorage.app",
  messagingSenderId: "96789823209",
  appId: "1:96789823209:web:b364d8fa2b589f927bba78",
  measurementId: "G-KFSKYQBDBP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

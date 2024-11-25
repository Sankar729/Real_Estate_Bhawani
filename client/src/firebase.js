// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sankar-313f4.firebaseapp.com",
  projectId: "sankar-313f4",
  storageBucket: "sankar-313f4.firebasestorage.app",
  messagingSenderId: "634671362531",
  appId: "1:634671362531:web:847958597c4b4eaa4270d6",
  measurementId: "G-2LLDFP7SJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export app and other services as needed
export { app, analytics };  // Ensure the app is exported here

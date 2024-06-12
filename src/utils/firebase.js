import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkmQouBv79EEiBiTUNXsLgPYIFx5W5qYw",
  authDomain: "netfligpt-45607.firebaseapp.com",
  projectId: "netfligpt-45607",
  storageBucket: "netfligpt-45607.appspot.com",
  messagingSenderId: "490052483971",
  appId: "1:490052483971:web:5e23fc744fe2ccc733d4b6",
  measurementId: "G-H3TBNNVMKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

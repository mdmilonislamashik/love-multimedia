// Firebase SDKs ইমপোর্ট করা হলো
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Auth এবং Google Provider যোগ করা হয়েছে

// আপনার অরিজিনাল কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyAhK4JvhMZYX4iAuQ_Qt1aCzilnczMi1f4",
  authDomain: "ulm-drive.firebaseapp.com",
  projectId: "ulm-drive",
  storageBucket: "ulm-drive.firebasestorage.app",
  messagingSenderId: "964604086177",
  appId: "1:964604086177:web:1764f35bc9e6eeab96ede0",
  measurementId: "G-JYEXDJREHC"
};

// Firebase ইনিশিয়ালাইজ করা হলো
const app = initializeApp(firebaseConfig);

// Authentication এবং Google Provider এক্সপোর্ট করা হলো যাতে Home.js-এ ব্যবহার করা যায়
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// ============================================================
// FIREBASE CONFIGURATION — src/lib/firebase.ts
// Sets up Firebase for authentication and realtime database.
// Replace the placeholder values with your own Firebase project config.
// ============================================================

import { initializeApp } from "firebase/app"; // Initialize the Firebase app
import { getAuth } from "firebase/auth"; // Firebase Authentication (login/signup)
import { getDatabase } from "firebase/database"; // Firebase Realtime Database (store user data)

// TODO: Replace these placeholder values with your Firebase project config
// You can find these in Firebase Console → Project Settings → General
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase with the config above
const app = initializeApp(firebaseConfig);

// Export auth and database instances for use throughout the app
export const auth = getAuth(app); // Used in AuthContext for login/signup/logout
export const database = getDatabase(app); // Used to store user profiles

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_ID, APP_ID } from '@env';
console.log("API_KEY:", API_KEY);
console.log("Initializing Firebase with configuration...");

const firebaseConfig = {
  apiKey:  API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully.");

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("Firebase Authentication initialized.");


export { auth };

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, firestore } from './firebase'; 
import { collection, doc, setDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user information in Firestore
    const userRef = doc(firestore, 'users', user.uid); // Create a reference to the document
    await setDoc(userRef, {
      displayName: displayName,
      email: email,
      // Add more fields as needed
    });

    return user;
  } catch (error) {
    throw error;
  }
};


export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

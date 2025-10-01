import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import { devLog } from "../utils/logger";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Check if should use emulators
const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

// Connect to emulators if the flag is set
if (useEmulators) {
    // devLog('Using Firebase Emulators');
    connectAuthEmulator(auth, "http://127.0.0.1:9099")
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
}
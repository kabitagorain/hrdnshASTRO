import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: process.env?.VITE_FIREBASE_API_KEY || firebaseConfigJson.apiKey,
  authDomain: process.env?.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain,
  projectId: process.env?.VITE_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId,
  storageBucket: process.env?.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket,
  messagingSenderId: process.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId,
  appId: process.env?.VITE_FIREBASE_APP_ID || firebaseConfigJson.appId,
  measurementId: process.env?.VITE_FIREBASE_MEASUREMENT_ID || firebaseConfigJson.measurementId || ""
};

// Lazy initialization — avoids crash in SSR/Node environment
let _app: FirebaseApp | null = null;
function getApp(): FirebaseApp {
  if (!_app) {
    _app = initializeApp(firebaseConfig);
  }
  return _app;
}

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.events');
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.setCustomParameters({ prompt: 'select_account' });

// Initialize auth only when called (lazy)
export function initAuth(callback: (user: User | null) => void) {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.warn('Firebase: API key not configured. Auth disabled.');
    callback(null);
    return () => {};
  }
  try {
    const auth = getAuth(getApp());
    return onAuthStateChanged(auth, callback);
  } catch (e) {
    console.warn('Firebase: Auth initialization failed.', e);
    callback(null);
    return () => {};
  }
}

export function googleSignIn() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    return Promise.reject(new Error('Firebase: API key not configured'));
  }
  const auth = getAuth(getApp());
  return signInWithPopup(auth, provider);
}

export function logout() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY') {
    return Promise.resolve();
  }
  const auth = getAuth(getApp());
  return signOut(auth);
}

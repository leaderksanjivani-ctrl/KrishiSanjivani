/* ==========================================================================
   KRISHISANJIVANI - FIREBASE & DATABASE CONFIGURATION (SIH 2026)
   ========================================================================== */

// Firebase Configuration (Loaded from .env / console)
const firebaseConfig = {
  apiKey: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_API_KEY) || "AIzaSyD54FeG00c4_eIH1VBK9iVu9NiAslM0fRI",
  authDomain: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_AUTH_DOMAIN) || "krishisanjivani-b06f6.firebaseapp.com",
  projectId: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_PROJECT_ID) || "krishisanjivani-b06f6",
  storageBucket: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_STORAGE_BUCKET) || "krishisanjivani-b06f6.firebasestorage.app",
  messagingSenderId: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_MESSAGING_SENDER_ID) || "566300747155",
  appId: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_APP_ID) || "1:566300747155:web:c8ea14cd81c93ff5a8b466",
  measurementId: (typeof window !== 'undefined' && window.ENV && window.ENV.FIREBASE_MEASUREMENT_ID) || "G-5QWBNR993P"
};

// Expose configuration object globally
window.firebaseConfig = firebaseConfig;
window.isFirebaseConfigured = false;

try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp && firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    window.storage = firebase.storage();
    if (firebase.analytics) {
      window.analytics = firebase.analytics();
    }
    window.isFirebaseConfigured = true;
    console.log("🔥 Firebase initialized successfully with project:", firebaseConfig.projectId);
  } else {
    console.log("ℹ️ Running in Local Storage / Mock Firestore mode (Demo Ready).");
  }
} catch (e) {
  console.warn("Firebase initialization warning (Using local state fallback):", e);
}

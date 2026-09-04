/* ==========================================================================
   KRISHISANJIVANI - FIREBASE & DATABASE CONFIGURATION (SIH 2026)
   ==========================================================================
   
   INSTRUCTIONS TO CONNECT REAL FIREBASE PROJECT:
   --------------------------------------------------------------------------
   1. Go to https://console.firebase.google.com/ and create a new project.
   2. Enable Firebase Authentication (Email/Password & Google Auth provider).
   3. Create a Cloud Firestore Database in production mode.
   4. Set up Firestore Security Rules as follows:
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId} {
            allow read, write: if request.auth != null;
          }
          match /products/{productId} {
            allow read: if true;
            allow write: if request.auth != null;
          }
          match /equipment/{equipId} {
            allow read: if true;
            allow write: if request.auth != null;
          }
          match /orders/{orderId} {
            allow read, write: if request.auth != null;
          }
          match /schemes/{schemeId} {
            allow read: if true;
            allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
          }
        }
      }
   5. Enable Firebase Storage for product photos and document uploads.
   6. Paste your Firebase credentials into `firebaseConfig` object below.
   ========================================================================== */

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "krishisanjivani-sih2026.firebaseapp.com",
  projectId: "krishisanjivani-sih2026",
  storageBucket: "krishisanjivani-sih2026.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Check if real Firebase SDK is loaded on page
window.isFirebaseConfigured = false;

try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    window.storage = firebase.storage();
    window.isFirebaseConfigured = true;
    console.log("🔥 Firebase initialized successfully!");
  } else {
    console.log("ℹ️ Running in Local Storage / Mock Firestore mode (Demo Ready).");
  }
} catch (e) {
  console.warn("Firebase initialization warning (Using local state fallback):", e);
}

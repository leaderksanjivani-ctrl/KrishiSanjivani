/* ==========================================================================
   KRISHISANJIVANI - FIREBASE & DATABASE CONFIGURATION (SIH 2026)
   ========================================================================== */

// Firebase Configuration - using project keys directly
const firebaseConfig = {
  apiKey: "AIzaSyD54FeG00c4_eIH1VBK9iVu9NiAslM0fRI",
  authDomain: "krishisanjivani-b06f6.firebaseapp.com",
  projectId: "krishisanjivani-b06f6",
  storageBucket: "krishisanjivani-b06f6.firebasestorage.app",
  messagingSenderId: "566300747155",
  appId: "1:566300747155:web:c8ea14cd81c93ff5a8b466",
  measurementId: "G-5QWBNR993P"
};

window.firebaseConfig = firebaseConfig;
window.isFirebaseConfigured = false;

// Dynamically load Firebase SDK if not already present, then initialize
(function loadFirebaseSDK() {
  // If already loaded (e.g. login.html already includes them), initialize immediately
  if (typeof firebase !== 'undefined') {
    initFirebase();
    return;
  }

  const FIREBASE_VERSION = '9.23.0';
  const BASE = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

  const scripts = [
    BASE + '/firebase-app-compat.js',
    BASE + '/firebase-auth-compat.js',
    BASE + '/firebase-firestore-compat.js',
    BASE + '/firebase-storage-compat.js',
  ];

  let loadedCount = 0;

  function onScriptLoad() {
    loadedCount++;
    if (loadedCount === scripts.length) {
      initFirebase();
    }
  }

  scripts.forEach(function(src) {
    // Skip if this script is already on the page
    if (document.querySelector(`script[src="${src}"]`)) {
      loadedCount++;
      if (loadedCount === scripts.length) initFirebase();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = onScriptLoad;
    s.onerror = function() {
      console.error('Failed to load Firebase SDK from:', src);
      loadedCount++;
      if (loadedCount === scripts.length) initFirebase();
    };
    document.head.appendChild(s);
  });
})();

function initFirebase() {
  try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // use existing app
      }
      window.db = firebase.firestore();
      window.auth = firebase.auth();
      window.storage = firebase.storage();
      window.isFirebaseConfigured = true;
      console.log('🔥 Firebase initialized with project:', firebaseConfig.projectId);

      // Notify any waiting listeners
      document.dispatchEvent(new CustomEvent('firebaseReady'));
    } else {
      console.warn('Firebase SDK not available after loading attempt.');
    }
  } catch (e) {
    console.warn('Firebase initialization error:', e);
  }
}

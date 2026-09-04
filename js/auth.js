/* ==========================================================================
   KRISHISANJIVANI - UNIFIED AUTH & ONBOARDING SYSTEM
   ========================================================================== */

class AuthManager {
  constructor() {
    this.user = window.store.getUser();
  }

  isLoggedIn() {
    return this.user && this.user.isLoggedIn;
  }

  loginWithEmail(email, password) {
    // If Firebase is live, authenticate with Firebase Auth
    if (window.isFirebaseConfigured && window.auth) {
      return window.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          this.handleLoginSuccess({
            uid: userCredential.user.uid,
            name: userCredential.user.displayName || email.split('@')[0],
            email: email,
            role: "Farmer"
          });
        });
    }

    // Fallback: Immediate mock login
    return new Promise((resolve) => {
      setTimeout(() => {
        this.handleLoginSuccess({
          uid: "usr-mock-" + Date.now(),
          name: email.split('@')[0] || "Ramesh Patil",
          email: email,
          phone: "+91 98230 11223",
          village: "Solapur",
          role: "Farmer",
          isLoggedIn: true
        });
        resolve();
      }, 500);
    });
  }

  loginWithGoogle() {
    if (window.isFirebaseConfigured && window.auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      return window.auth.signInWithPopup(provider).then(res => {
        this.handleLoginSuccess({
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          role: "Farmer"
        });
      });
    }

    // Mock Google Sign-In
    return new Promise((resolve) => {
      setTimeout(() => {
        this.handleLoginSuccess({
          uid: "usr-google-" + Date.now(),
          name: "Ramesh Patil (Google Verified)",
          email: "ramesh.patil@gmail.com",
          phone: "+91 98230 11223",
          village: "Mohol, Solapur",
          role: "Farmer",
          isLoggedIn: true
        });
        resolve();
      }, 500);
    });
  }

  adminLogin(passcode) {
    if (passcode === "admin123" || passcode === "sih2026") {
      const adminUser = {
        name: "SIH Portal Admin",
        role: "admin",
        isAdmin: true,
        isLoggedIn: true
      };
      window.store.saveUser(adminUser);
      return true;
    }
    return false;
  }

  handleLoginSuccess(userData) {
    this.user = { ...userData, isLoggedIn: true };
    window.store.saveUser(this.user);
    
    // Check if onboarding needs to be filled (village/role selection)
    if (!userData.village || !userData.role) {
      window.location.href = "/pages/profile.html?onboarding=1";
    } else {
      window.location.href = "/pages/dashboard.html";
    }
  }

  logout() {
    if (window.isFirebaseConfigured && window.auth) {
      window.auth.signOut();
    }
    window.store.saveUser({ isLoggedIn: false });
    window.location.href = "/index.html";
  }
}

window.authManager = new AuthManager();

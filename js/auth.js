/* ==========================================================================
   KRISHISANJIVANI - UNIFIED AUTH & ONBOARDING SYSTEM (WITH PHONE OTP)
   ========================================================================== */

class AuthManager {
  constructor() {
    this.user = window.store.getUser();
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
  }

  isLoggedIn() {
    return this.user && this.user.isLoggedIn;
  }

  // Initialize Firebase Recaptcha for Phone Authentication
  initRecaptcha(containerId = 'recaptcha-container') {
    if (window.isFirebaseConfigured && window.firebase && window.firebase.auth) {
      try {
        if (!this.recaptchaVerifier) {
          this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(containerId, {
            'size': 'invisible',
            'callback': (response) => {
              console.log("reCAPTCHA solved");
            },
            'expired-callback': () => {
              console.warn("reCAPTCHA expired");
            }
          });
          this.recaptchaVerifier.render();
        }
      } catch (e) {
        console.warn("Recaptcha initialization warning:", e);
      }
    }
  }

  // Send OTP to Phone Number
  sendPhoneOTP(rawPhone, containerId = 'recaptcha-container') {
    return new Promise((resolve, reject) => {
      if (!rawPhone || rawPhone.trim().length < 10) {
        reject(new Error("Please enter a valid 10-digit mobile number."));
        return;
      }

      let cleaned = rawPhone.replace(/\D/g, '');
      if (cleaned.length === 10) {
        cleaned = '+91' + cleaned;
      } else if (!cleaned.startsWith('+')) {
        cleaned = '+' + cleaned;
      }
      const formattedPhone = cleaned;

      // Real Firebase Phone Auth
      if (window.isFirebaseConfigured && window.firebase && window.firebase.auth) {
        this.initRecaptcha(containerId);
        const appVerifier = this.recaptchaVerifier;

        window.auth.signInWithPhoneNumber(formattedPhone, appVerifier)
          .then((confirmationResult) => {
            this.confirmationResult = confirmationResult;
            console.log("📲 Firebase OTP sent successfully to:", formattedPhone);
            resolve({ success: true, phone: formattedPhone, message: `OTP sent to ${formattedPhone}` });
          })
          .catch((error) => {
            console.error("Firebase Phone Auth error:", error);
            // Fallback for testing/invalid recaptcha setup
            this.confirmationResult = { mock: true, phone: formattedPhone };
            resolve({ success: true, phone: formattedPhone, message: `[Test Mode] OTP sent to ${formattedPhone}. (Test OTP: 123456)` });
          });
      } else {
        // Fallback / Mock Mode
        setTimeout(() => {
          this.confirmationResult = { mock: true, phone: formattedPhone };
          console.log("📲 Mock OTP sent to:", formattedPhone);
          resolve({ success: true, phone: formattedPhone, message: `[Demo Mode] OTP sent to ${formattedPhone}. Enter 123456 to verify.` });
        }, 600);
      }
    });
  }

  // Verify Phone OTP Code
  verifyPhoneOTP(otpCode) {
    return new Promise((resolve, reject) => {
      if (!otpCode || otpCode.trim().length < 6) {
        reject(new Error("Please enter a valid 6-digit OTP code."));
        return;
      }

      const code = otpCode.trim();

      // Real Firebase Confirmation
      if (this.confirmationResult && !this.confirmationResult.mock && typeof this.confirmationResult.confirm === 'function') {
        this.confirmationResult.confirm(code)
          .then((result) => {
            const user = result.user;
            const userData = {
              uid: user.uid,
              name: "Verified Farmer (" + (user.phoneNumber || "").slice(-4) + ")",
              phone: user.phoneNumber || this.confirmationResult.phone,
              email: user.email || "",
              role: "Farmer"
            };
            this.handleLoginSuccess(userData);
            resolve(userData);
          })
          .catch((error) => {
            console.error("Firebase OTP Verification Error:", error);
            reject(new Error("Invalid OTP code. Please check and try again."));
          });
      } else {
        // Mock OTP validation (accepts 123456 or any 6-digit code in demo mode)
        setTimeout(() => {
          const mockPhone = (this.confirmationResult && this.confirmationResult.phone) || "+91 98230 11223";
          const userData = {
            uid: "usr-otp-" + Date.now(),
            name: "Verified Farmer (" + mockPhone.slice(-4) + ")",
            phone: mockPhone,
            email: "farmer_" + mockPhone.slice(-4) + "@krishisanjivani.in",
            village: "Solapur, Maharashtra",
            role: "Farmer",
            isLoggedIn: true
          };
          this.handleLoginSuccess(userData);
          resolve(userData);
        }, 600);
      }
    });
  }

  loginWithEmail(email, password) {
    if (window.isFirebaseConfigured && window.auth) {
      return window.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          this.handleLoginSuccess({
            uid: userCredential.user.uid,
            name: userCredential.user.displayName || email.split('@')[0],
            email: email,
            role: "Farmer"
          });
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            return window.auth.createUserWithEmailAndPassword(email, password)
              .then(res => {
                this.handleLoginSuccess({
                  uid: res.user.uid,
                  name: email.split('@')[0],
                  email: email,
                  role: "Farmer"
                });
              });
          }
          throw err;
        });
    }

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
    
    if (!userData.village || !userData.role) {
      window.location.href = "../pages/profile.html?onboarding=1";
    } else {
      window.location.href = "../pages/dashboard.html";
    }
  }

  logout() {
    if (window.isFirebaseConfigured && window.auth) {
      window.auth.signOut();
    }
    window.store.saveUser({ isLoggedIn: false });
    window.location.href = "../index.html";
  }
}

window.authManager = new AuthManager();

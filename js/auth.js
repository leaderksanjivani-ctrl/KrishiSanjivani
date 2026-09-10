/* ==========================================================================
   KRISHISANJIVANI - UNIFIED FIREBASE AUTHENTICATION SYSTEM
   ========================================================================== */

class AuthManager {
  constructor() {
    this.user = window.store ? window.store.getUser() : { isLoggedIn: false };
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
    this.initFirebaseObserver();
    this._handleGoogleRedirect(); // Handle Google redirect result on page load
  }

  // ─── Firebase Error Code → Human-Readable Messages ──────────────────────
  _friendlyError(err) {
    const map = {
      'auth/operation-not-allowed':
        'This sign-in method is disabled. Please enable it in Firebase Console → Authentication → Sign-in method.',
      'auth/user-not-found':
        'No account found with these credentials. Please sign up first.',
      'auth/wrong-password':
        'Incorrect password. Please try again or reset your password.',
      'auth/invalid-credential':
        'Invalid credentials. Please check your email and password.',
      'auth/email-already-in-use':
        'An account already exists with this email. Please log in instead.',
      'auth/weak-password':
        'Password is too weak. Please use at least 6 characters.',
      'auth/invalid-email':
        'Please enter a valid email address.',
      'auth/too-many-requests':
        'Too many failed attempts. Please wait a few minutes and try again.',
      'auth/network-request-failed':
        'Network error. Please check your internet connection.',
      'auth/popup-blocked':
        'Popup was blocked by your browser. Trying redirect sign-in instead.',
      'auth/popup-closed-by-user':
        'Sign-in popup was closed. Please try again.',
      'auth/cancelled-popup-request':
        'Sign-in cancelled. Please try again.',
      'auth/internal-error':
        'Phone Authentication failed. Ensure Phone Auth is enabled in Firebase Console and your domain (localhost) is whitelisted under Authentication → Settings → Authorized domains.',
      'auth/invalid-phone-number':
        'Invalid phone number. Please enter a valid 10-digit Indian mobile number.',
      'auth/missing-phone-number':
        'Please enter a valid phone number.',
      'auth/quota-exceeded':
        'SMS quota exceeded for this project. Please try another sign-in method.',
      'auth/captcha-check-failed':
        'reCAPTCHA check failed. Please refresh the page and try again.',
      'auth/invalid-verification-code':
        'Invalid OTP code. Please double-check and try again.',
      'auth/code-expired':
        'OTP code has expired. Please request a new one.',
      'auth/provider-already-linked':
        'This account is already linked to this provider.',
    };
    if (err && err.code && map[err.code]) return map[err.code];
    return (err && err.message) ? err.message : 'An unexpected error occurred. Please try again.';
  }

  // ─── Firebase Ready State ────────────────────────────────────────────────
  initFirebaseObserver() {
    const attach = () => {
      if (typeof firebase !== 'undefined' && firebase.auth && window.isFirebaseConfigured) {
        try {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const existing = (window.store && window.store.getUser()) || {};
              const userData = {
                uid: user.uid,
                name: user.displayName || existing.name ||
                  (user.phoneNumber
                    ? 'Farmer ' + user.phoneNumber.slice(-4)
                    : (user.email ? user.email.split('@')[0] : 'Verified User')),
                email: user.email || existing.email || '',
                phone: user.phoneNumber || existing.phone || '',
                photoURL: user.photoURL || existing.photoURL || '',
                village: existing.village || '',
                role: existing.role || 'Farmer',
                isLoggedIn: true
              };
              this.user = userData;
              if (window.store) window.store.saveUser(userData);
            } else {
              const existing = (window.store && window.store.getUser()) || {};
              if (!existing.isAdmin) {
                this.user = { isLoggedIn: false };
                if (window.store) window.store.saveUser({ isLoggedIn: false });
              }
            }
            this.updateNavUI();
          });
        } catch (e) {
          console.warn('Auth state listener error:', e);
        }
      }
    };

    if (window.isFirebaseConfigured) {
      attach();
    } else {
      document.addEventListener('firebaseReady', attach, { once: true });
    }
  }

  waitForFirebase() {
    return new Promise((resolve) => {
      if (window.isFirebaseConfigured) {
        resolve();
      } else {
        document.addEventListener('firebaseReady', resolve, { once: true });
      }
    });
  }

  isLoggedIn() {
    return !!(this.user && this.user.isLoggedIn);
  }

  // ─── Phone / OTP Auth ────────────────────────────────────────────────────
  initRecaptcha(containerId = 'recaptcha-container') {
    if (window.isFirebaseConfigured && window.firebase && window.firebase.auth) {
      try {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!this.recaptchaVerifier) {
          this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(containerId, {
            'size': 'invisible',
            'callback': () => { console.log('reCAPTCHA verified'); },
            'expired-callback': () => {
              console.warn('reCAPTCHA expired.');
              if (this.recaptchaVerifier) {
                this.recaptchaVerifier.clear();
                this.recaptchaVerifier = null;
              }
            }
          });
          this.recaptchaVerifier.render();
        }
      } catch (e) {
        console.warn('Recaptcha initialization warning:', e);
      }
    }
  }

  sendPhoneOTP(rawPhone, containerId = 'recaptcha-container') {
    return new Promise((resolve, reject) => {
      if (!rawPhone || rawPhone.trim().replace(/\D/g, '').length < 10) {
        reject(new Error('Please enter a valid 10-digit mobile number.'));
        return;
      }

      let cleaned = rawPhone.replace(/\D/g, '');
      if (cleaned.length === 10) cleaned = '+91' + cleaned;
      else if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
      const formattedPhone = cleaned;

      this.waitForFirebase().then(() => {
        if (!window.isFirebaseConfigured || !window.auth) {
          reject(new Error('Firebase is not available. Check your internet connection.'));
          return;
        }
        this.initRecaptcha(containerId);
        const appVerifier = this.recaptchaVerifier;

        window.auth.signInWithPhoneNumber(formattedPhone, appVerifier)
          .then((confirmationResult) => {
            this.confirmationResult = confirmationResult;
            resolve({ success: true, phone: formattedPhone, message: `OTP sent to ${formattedPhone}` });
          })
          .catch((error) => {
            console.error('Firebase Phone Auth Error:', error);
            if (this.recaptchaVerifier && typeof this.recaptchaVerifier.clear === 'function') {
              this.recaptchaVerifier.clear();
              this.recaptchaVerifier = null;
            }
            reject(new Error(this._friendlyError(error)));
          });
      });
    });
  }

  verifyPhoneOTP(otpCode) {
    return new Promise((resolve, reject) => {
      if (!otpCode || otpCode.trim().length < 6) {
        reject(new Error('Please enter a valid 6-digit OTP code.'));
        return;
      }

      if (this.confirmationResult && typeof this.confirmationResult.confirm === 'function') {
        this.confirmationResult.confirm(otpCode.trim())
          .then((result) => {
            const user = result.user;
            const userData = {
              uid: user.uid,
              name: user.displayName || 'Farmer (' + (user.phoneNumber || '').slice(-4) + ')',
              phone: user.phoneNumber || '',
              email: user.email || '',
              role: 'Farmer',
              isLoggedIn: true
            };
            this.handleLoginSuccess(userData);
            resolve(userData);
          })
          .catch((error) => {
            console.error('Firebase OTP Verification Error:', error);
            reject(new Error(this._friendlyError(error)));
          });
      } else {
        reject(new Error('No active OTP session found. Please request a new OTP code.'));
      }
    });
  }

  // ─── Email / Password Login ──────────────────────────────────────────────
  loginWithEmail(email, password) {
    return this.waitForFirebase().then(() => {
      if (!window.isFirebaseConfigured || !window.auth) {
        return Promise.reject(new Error('Firebase Auth is not available. Check your internet connection.'));
      }
      return window.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            uid: user.uid,
            name: user.displayName || email.split('@')[0],
            email,
            phone: user.phoneNumber || '',
            role: 'Farmer',
            isLoggedIn: true
          };
          this.handleLoginSuccess(userData);
          return userData;
        })
        .catch((err) => {
          throw new Error(this._friendlyError(err));
        });
    });
  }

  // ─── Email / Password Registration ──────────────────────────────────────
  registerWithEmail(name, email, password, role = 'Farmer') {
    return this.waitForFirebase().then(() => {
      if (!window.isFirebaseConfigured || !window.auth) {
        return Promise.reject(new Error('Firebase Auth is not available. Check your internet connection.'));
      }
      return window.auth.createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Update profile with display name
          try {
            await user.updateProfile({ displayName: name });
          } catch (e) {
            console.warn('Could not update display name:', e);
          }
          const userData = {
            uid: user.uid,
            name,
            email,
            phone: user.phoneNumber || '',
            role,
            isLoggedIn: true
          };
          // Save to Firestore if available
          if (window.db) {
            window.db.collection('users').doc(user.uid).set(userData).catch(e => console.warn('Firestore write error:', e));
          }
          this.handleLoginSuccess(userData);
          return userData;
        })
        .catch((err) => {
          throw new Error(this._friendlyError(err));
        });
    });
  }

  // ─── Google Sign-In (Redirect Flow) ─────────────────────────────────────
  loginWithGoogle() {
    return this.waitForFirebase().then(() => {
      if (!window.isFirebaseConfigured || !window.auth) {
        return Promise.reject(new Error('Firebase Auth is not available. Check your internet connection.'));
      }
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      // Use redirect (works on both file:// and https://)
      return window.auth.signInWithRedirect(provider)
        .catch((err) => {
          console.error('Google Redirect Error:', err);
          throw new Error(this._friendlyError(err));
        });
    });
  }

  // Called on page load to catch redirect result from Google sign-in
  _handleGoogleRedirect() {
    const handle = () => {
      if (!window.isFirebaseConfigured || !window.auth) return;
      window.auth.getRedirectResult()
        .then((result) => {
          if (result && result.user) {
            const user = result.user;
            const userData = {
              uid: user.uid,
              name: user.displayName || user.email.split('@')[0],
              email: user.email || '',
              photoURL: user.photoURL || '',
              phone: user.phoneNumber || '',
              role: 'Farmer',
              isLoggedIn: true
            };
            this.handleLoginSuccess(userData);
          }
        })
        .catch((err) => {
          if (err.code !== 'auth/no-auth-event') {
            console.error('Google redirect result error:', err);
            // Surface the error to the page if it has a showAlert function
            if (typeof window.showAuthAlert === 'function') {
              window.showAuthAlert('❌ Google Sign-In failed: ' + this._friendlyError(err), true);
            }
          }
        });
    };

    if (window.isFirebaseConfigured) {
      handle();
    } else {
      document.addEventListener('firebaseReady', handle, { once: true });
    }
  }

  // ─── Admin Login ─────────────────────────────────────────────────────────
  adminLogin(passcode) {
    if (passcode === 'admin123' || passcode === 'sih2026') {
      const adminUser = {
        name: 'SIH Portal Admin',
        role: 'admin',
        isAdmin: true,
        isLoggedIn: true
      };
      this.user = adminUser;
      if (window.store) window.store.saveUser(adminUser);
      return true;
    }
    return false;
  }

  // ─── Post-Login Actions ──────────────────────────────────────────────────
  handleLoginSuccess(userData) {
    this.user = { ...userData, isLoggedIn: true };
    if (window.store) window.store.saveUser(this.user);
    this.updateNavUI();

    const isSubPage = window.location.pathname.includes('/pages/');
    const targetUrl = isSubPage ? 'dashboard.html' : 'pages/dashboard.html';
    window.location.href = targetUrl;
  }

  logout() {
    if (window.isFirebaseConfigured && window.auth) {
      window.auth.signOut().catch(e => console.warn('Signout warning:', e));
    }
    this.user = { isLoggedIn: false };
    if (window.store) window.store.saveUser({ isLoggedIn: false });
    this.updateNavUI();

    const isSubPage = window.location.pathname.includes('/pages/');
    window.location.href = isSubPage ? '../index.html' : 'index.html';
  }

  updateNavUI() {
    const authNavBtn = document.getElementById('auth-nav-btn');
    const isSubPage = window.location.pathname.includes('/pages/');

    if (authNavBtn) {
      if (this.isLoggedIn()) {
        const profileUrl = isSubPage ? 'profile.html' : 'pages/profile.html';
        const displayName = (this.user && (this.user.name || this.user.email || this.user.phone)) || 'Profile';
        authNavBtn.href = profileUrl;
        authNavBtn.innerHTML = `<span>👤</span> <span>${displayName}</span>`;
        authNavBtn.className = 'btn btn-outline btn-sm';
      } else {
        const loginUrl = isSubPage ? 'login.html' : 'pages/login.html';
        authNavBtn.href = loginUrl;
        authNavBtn.innerHTML = `<span>👤</span> <span data-i18n="nav_login">Login / Signup</span>`;
        authNavBtn.className = 'btn btn-primary btn-sm';
      }
    }
  }
}

window.authManager = new AuthManager();

document.addEventListener('DOMContentLoaded', () => {
  if (window.authManager) {
    window.authManager.updateNavUI();
  }
});

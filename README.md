# 🌱 KrishiSanjivani - Smart India Hackathon 2026

**KrishiSanjivani** is a complete, working, direct farmer-to-consumer digital marketplace built for Smart India Hackathon 2026 to eliminate middleman exploitation, provide AI demand forecasting, optimize delivery routes, and provide accessible multilingual tools for Indian farmers.

---

## 🎯 Problem Statement & Solution

- **Problem:** Multiple intermediaries reduce farmers' earnings (taking up to 50% commission cuts) and inflate consumer prices.
- **Solution:** 
  - Direct marketplace linking farmers & FPOs directly with consumers and bulk buyers.
  - Zero middleman fee model with transparent price comparison meters.
  - Low-literacy accessibility (large touch icons, Web Speech API voice input, 3-picture visual guides).
  - AI Demand Forecasting (Chart.js trend predictions & sowing calendar).
  - AI Route Optimization (Leaflet + OpenStreetMap logistics visualizer).
  - Razorpay payment checkout integration.
  - Multilingual support (English, Hindi, Marathi).

---

## 🚀 How to Run Locally

Because KrishiSanjivani is built using standard HTML5, CSS3, and JavaScript ES6 modules with no compile or heavy framework requirements:

1. **Option A: Direct Browser Playback**
   - Open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

2. **Option B: Using Local Development Server (Recommended for Web Speech API)**
   - Open a terminal in `d:/KrishiSanjivani`.
   - Run any standard HTTP server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Or using Node.js npx http-server
     npx http-server . -p 8000
     ```
   - Open `http://localhost:8000` in your web browser.

---

## 🔑 How to Plug in Real Firebase & Razorpay Keys

### 1. Firebase Setup (Auth, Firestore, Storage)
- Open `js/firebase-config.js`.
- Replace the default placeholder object with your actual Firebase project credentials:
  ```javascript
  const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  };
  ```
- Make sure to add Firebase SDK script tags if connecting to a live Firebase backend. Out of the box, the app includes a fallback local data engine (`js/store.js`) so it works 100% offline or without API keys during SIH demonstrations.

### 2. Razorpay Payment Setup (Test Mode)
- Open `pages/payment.html`.
- Replace `"rzp_test_KRISHISANJIVANI2026"` in `launchRazorpayCheckout()` with your Razorpay Test Key ID from [Razorpay Dashboard](https://dashboard.razorpay.com/).

---

## 📁 Project Directory Structure

```
d:/KrishiSanjivani/
├── index.html                    # Landing Page & Hero Section
├── process.md                    # Work & Execution Log
├── README.md                     # Setup & Configuration Guide
├── css/
│   └── styles.css                # Agricultural Design System Tokens & Govt Hybrid Aesthetics
├── js/
│   ├── firebase-config.js        # Firebase setup & local fallback engine
│   ├── i18n.js                   # Multilingual translation dictionary (EN, HI, MR)
│   ├── store.js                  # Seed data, Cart, Order & Product store
│   ├── speech.js                 # Web Speech API voice recognition helper
│   ├── ai-engine.js              # Demand forecasting, Route optimizer, Krishi Chatbot
│   ├── map-helper.js             # Leaflet OSM route mapping
│   └── auth.js                   # Unified Auth & Onboarding manager
└── pages/
    ├── login.html                # Unified Auth (Email + Google Sign-In)
    ├── admin-login.html          # Hidden Admin Auth Portal
    ├── dashboard.html            # Farmer & Buyer Touch Dashboard
    ├── buy.html                  # Marketplace Produce Search & Price Savings Meter
    ├── sell.html                 # Farmer Produce Listing Form
    ├── search.html               # Universal Search across Produce, Equipment & Schemes
    ├── rent.html                 # Farm Equipment & Drone Rental with Booking Calendar
    ├── chatbot.html              # AI Krishi Assistant Chatbot
    ├── weather.html              # 5-Day Weather Forecast & Farming Advisory
    ├── rights.html               # Simplified Farmer Rights & Agricultural Acts
    ├── schemes.html              # Government Schemes Portal
    ├── mahadbt.html              # MahaDBT Maharashtra Subsidy Guide & Links
    ├── ai-demand.html            # AI Demand Forecasting Chart.js Graphs
    ├── cart.html                 # Cart Summary & Middleman Savings Meter
    ├── payment.html              # Razorpay Payment Integration
    ├── delivery.html             # Leaflet AI Route Map & Live Delivery Tracking
    ├── invoice.html              # Auto-generated Printable & Downloadable Invoice
    ├── orders.html               # My Orders & Visual Status Timeline
    ├── help.html                 # 3-Step Visual Picture Guides for Low Literacy
    ├── profile.html              # User Profile & FPO Community Bulk Pooling
    └── admin.html                # Admin Panel with GMV, Middleman Savings & Alert Broadcaster
```

---

## 🏆 SIH 2026 Key Highlights

1. **Illiterate / Semi-Literate Accessible**: Large icon tiles, Web Speech API mic button for voice input, 3-picture step-by-step guides.
2. **Price Transparency Meter**: Shows exact ₹ savings compared to traditional middleman mandi price.
3. **AI Route Optimization**: Displays optimal logistics path (Farmer -> Hub -> Buyer) on Leaflet OpenStreetMap.
4. **AI Demand Forecasting**: Interactive Chart.js graphs showing price trend predictions and sowing recommendations.
5. **Emergency Pest Broadcast**: Admin alert system pushing emergency warnings to farmers.

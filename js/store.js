/* ==========================================================================
   KRISHISANJIVANI - LOCAL DATA STORE & SEED DATA ENGINE
   ========================================================================== */

const INITIAL_PRODUCTS = [
  {
    id: "prod-101",
    sellerName: "Ramesh Patil (Solapur FPO)",
    sellerPhone: "+91 98230 11223",
    sellerVillage: "Mohol, Solapur",
    cropName: "Organic Soybeans (सोयाबीन)",
    category: "Grains",
    photoURL: "https://images.unsplash.com/photo-1599579138343-4d76b1f2372d?auto=format&fit=crop&w=600&q=80",
    directPrice: 4800,           // ₹ per quintal
    mandiPrice: 6500,            // ₹ per quintal (Middleman Price)
    quantity: 50,
    unit: "Quintal",
    harvestDate: "2026-08-25",
    location: "Solapur, Maharashtra",
    trustRating: 4.9,
    isOrganic: true,
    description: "High-protein non-GMO organic soybeans harvested directly from farm."
  },
  {
    id: "prod-102",
    sellerName: "Sanjay Deshmukh",
    sellerPhone: "+91 94221 44556",
    sellerVillage: "Pimplegaon, Nashik",
    cropName: "Nashik Red Onions (कांदा)",
    category: "Vegetables",
    photoURL: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?auto=format&fit=crop&w=600&q=80",
    directPrice: 22,             // ₹ per kg
    mandiPrice: 38,              // ₹ per kg
    quantity: 1200,
    unit: "Kg",
    harvestDate: "2026-08-28",
    location: "Nashik, Maharashtra",
    trustRating: 4.8,
    isOrganic: false,
    description: "Grade-A quality red onions, dried and sorted for long shelf life."
  },
  {
    id: "prod-103",
    sellerName: "Ananda Shinde",
    sellerPhone: "+91 98902 33441",
    sellerVillage: "Narayangaon, Pune",
    cropName: "Fresh Red Tomatoes (टोमॅटो)",
    category: "Vegetables",
    photoURL: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    directPrice: 18,             // ₹ per kg
    mandiPrice: 32,              // ₹ per kg
    quantity: 800,
    unit: "Kg",
    harvestDate: "2026-09-01",
    location: "Pune, Maharashtra",
    trustRating: 4.7,
    isOrganic: true,
    description: "Vine-ripened firm tomatoes ideal for salad and sauce manufacturing."
  },
  {
    id: "prod-104",
    sellerName: "Ganesh Pawar",
    sellerPhone: "+91 97654 88771",
    sellerVillage: "Waigaon, Wardha",
    cropName: "Sharbati Premium Wheat (गेहूं)",
    category: "Grains",
    photoURL: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    directPrice: 3400,
    mandiPrice: 4600,
    quantity: 80,
    unit: "Quintal",
    harvestDate: "2026-08-20",
    location: "Wardha, Maharashtra",
    trustRating: 5.0,
    isOrganic: true,
    description: "Golden Sharbati wheat grains clean & polished."
  },
  {
    id: "prod-105",
    sellerName: "Vijay Kadam",
    sellerPhone: "+91 91580 99881",
    sellerVillage: "Kole, Sangli",
    cropName: "Lakadong High-Curcumin Turmeric (हल्दी)",
    category: "Spices",
    photoURL: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    directPrice: 140,
    mandiPrice: 220,
    quantity: 350,
    unit: "Kg",
    harvestDate: "2026-07-15",
    location: "Sangli, Maharashtra",
    trustRating: 4.9,
    isOrganic: true,
    description: "Pure turmeric fingers with 7.5% curcumin content."
  }
];

const INITIAL_EQUIPMENT = [
  {
    id: "eq-201",
    ownerName: "Solapur Custom Hiring Center",
    ownerPhone: "+91 98220 99001",
    name: "Mahindra 575 DI Tractor (45 HP)",
    category: "Tractors",
    rentPricePerDay: 1200,
    deposit: 2000,
    photoURL: "https://images.unsplash.com/photo-1589824783837-6169889fa207?auto=format&fit=crop&w=600&q=80",
    location: "Solapur District",
    availability: "Available Now",
    specs: "Power Steering, Rotavator Hookup, Low Diesel Consumption"
  },
  {
    id: "eq-202",
    ownerName: "AgriTech Drone Services",
    ownerPhone: "+91 94210 33221",
    name: "10L Spraying Agriculture Drone + Operator",
    category: "Drones",
    rentPricePerDay: 2500,
    deposit: 1000,
    photoURL: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    location: "Pandharpur / Solapur",
    availability: "Available Now",
    specs: "10 Acre coverage in 2 hours, ultra-low water usage"
  },
  {
    id: "eq-203",
    ownerName: "Kisan Sahakari Society",
    ownerPhone: "+91 98901 77665",
    name: "Heavy Duty Multi-Crop Harvester",
    category: "Harvesters",
    rentPricePerDay: 3500,
    deposit: 5000,
    photoURL: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=600&q=80",
    location: "Baramati, Pune",
    availability: "Booked till Sept 10",
    specs: "Combines threshing and cleaning for wheat & soybean"
  }
];

const INITIAL_SCHEMES = [
  {
    id: "sch-1",
    title: "PM-KISAN Samman Nidhi",
    amount: "₹6,000 / Year",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    icon: "🌾",
    summary: "Direct income support of ₹6,000 per year in 3 equal installments of ₹2,000 to all landholding farmers.",
    eligibility: ["Small & Marginal Farmers", "Valid Aadhaar Card", "Own Agricultural Land Record (7/12)"],
    applyLink: "https://pmkisan.gov.in"
  },
  {
    id: "sch-2",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    amount: "Up to 100% Crop Value Risk Cover",
    ministry: "Agriculture Insurance Company of India",
    icon: "🛡️",
    summary: "Comprehensive crop insurance against natural calamities, pests, and unseasonal rainfall.",
    eligibility: ["All farmers growing notified crops", "Sharecroppers & tenant farmers eligible"],
    applyLink: "https://pmfby.gov.in"
  },
  {
    id: "sch-3",
    title: "Soil Health Card Scheme",
    amount: "Free Soil Testing",
    ministry: "Department of Agriculture",
    icon: "🧪",
    summary: "Provides customized nutrient advisories for your farm's soil composition every 3 years.",
    eligibility: ["All agricultural landowners"],
    applyLink: "https://soilhealth.dac.gov.in"
  },
  {
    id: "sch-4",
    title: "Kisan Credit Card (KCC) 4% Subsidized Loan",
    amount: "Up to ₹3,00,000 Credit @ 4%",
    ministry: "NABARD & Reserve Bank of India",
    icon: "💳",
    summary: "Short-term credit for crop cultivation, post-harvest expenses, and animal husbandry at 4% effective interest.",
    eligibility: ["Individual/Joint Farmers", "Self Help Groups (SHGs)"],
    applyLink: "https://pmkisan.gov.in/KCC.aspx"
  }
];

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('krishi_products')) {
      localStorage.setItem('krishi_products', JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem('krishi_equipment')) {
      localStorage.setItem('krishi_equipment', JSON.stringify(INITIAL_EQUIPMENT));
    }
    if (!localStorage.getItem('krishi_schemes')) {
      localStorage.setItem('krishi_schemes', JSON.stringify(INITIAL_SCHEMES));
    }
    if (!localStorage.getItem('krishi_cart')) {
      localStorage.setItem('krishi_cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('krishi_orders')) {
      localStorage.setItem('krishi_orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('krishi_user')) {
      localStorage.setItem('krishi_user', JSON.stringify({
        name: "Ramesh Patil",
        phone: "+91 98230 11223",
        village: "Mohol, Solapur",
        role: "Farmer",
        isLoggedIn: true,
        fpoGroup: "Solapur Organic Farmers Producer Co."
      }));
    }
  }

  getProducts() {
    return JSON.parse(localStorage.getItem('krishi_products') || '[]');
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = 'prod-' + Date.now();
    product.postedAt = new Date().toISOString();
    products.unshift(product);
    localStorage.setItem('krishi_products', JSON.stringify(products));
    return product;
  }

  getEquipment() {
    return JSON.parse(localStorage.getItem('krishi_equipment') || '[]');
  }

  getSchemes() {
    return JSON.parse(localStorage.getItem('krishi_schemes') || '[]');
  }

  getCart() {
    return JSON.parse(localStorage.getItem('krishi_cart') || '[]');
  }

  addToCart(item, qty = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      cart[existingIndex].selectedQty += qty;
    } else {
      cart.push({ ...item, selectedQty: qty });
    }
    localStorage.setItem('krishi_cart', JSON.stringify(cart));
    this.dispatchCartUpdate();
  }

  removeFromCart(itemId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.id !== itemId);
    localStorage.setItem('krishi_cart', JSON.stringify(cart));
    this.dispatchCartUpdate();
  }

  clearCart() {
    localStorage.setItem('krishi_cart', JSON.stringify([]));
    this.dispatchCartUpdate();
  }

  dispatchCartUpdate() {
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: this.getCartCount() } }));
  }

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.selectedQty, 0);
  }

  getCartSavings() {
    const cart = this.getCart();
    let totalDirect = 0;
    let totalMandi = 0;
    cart.forEach(item => {
      totalDirect += item.directPrice * item.selectedQty;
      totalMandi += (item.mandiPrice || (item.directPrice * 1.35)) * item.selectedQty;
    });
    return {
      totalDirect,
      totalMandi,
      savedAmount: totalMandi - totalDirect,
      savedPercent: totalMandi > 0 ? Math.round(((totalMandi - totalDirect) / totalMandi) * 100) : 0
    };
  }

  createOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('krishi_orders') || '[]');
    const newOrder = {
      orderId: "KS-ORD-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: "Placed", // Placed -> Packed -> In Transit -> Delivered
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem('krishi_orders', JSON.stringify(orders));
    this.clearCart();
    return newOrder;
  }

  getOrders() {
    return JSON.parse(localStorage.getItem('krishi_orders') || '[]');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('krishi_user') || '{}');
  }

  saveUser(userData) {
    localStorage.setItem('krishi_user', JSON.stringify(userData));
  }
}

window.store = new DataStore();

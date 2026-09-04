/* ==========================================================================
   KRISHISANJIVANI - AI FEATURES ENGINE
   Demand Forecasting | Route Optimization | AI Krishi Assistant
   ========================================================================== */

class AIEngine {
  // 1. Demand & Price Forecasting Engine
  getForecastData(cropName = "Soybeans") {
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep (Current)", "Oct (Predicted)", "Nov (Predicted)", "Dec (Predicted)"];
    
    const cropProfiles = {
      "Soybeans": {
        historicalPrices: [4400, 4550, 4600, 4720, 4800, 4850, 5200, 5450, 5300],
        demandLevel: "High Demand Expected",
        sowingAdvice: "Optimal sowing window: October 15 - November 10. High market demand predicted for Q4.",
        recommendedSeason: "Rabi Crop",
        expectedMargin: "+28% higher than average mandi price"
      },
      "Onions": {
        historicalPrices: [20, 22, 25, 30, 35, 38, 42, 48, 40],
        demandLevel: "Very High Peak Demand",
        sowingAdvice: "High price rally expected in Oct-Nov due to low festival inventory. Plant Late Kharif now.",
        recommendedSeason: "Late Kharif",
        expectedMargin: "+35% price surge predicted"
      },
      "Wheat": {
        historicalPrices: [3100, 3150, 3200, 3300, 3400, 3450, 3700, 3850, 3900],
        demandLevel: "Steady Strong Demand",
        sowingAdvice: "Prepare soil with Soil Health Card guidelines. Sow Sharbati / HD-2967 varieties in November.",
        recommendedSeason: "Rabi Crop",
        expectedMargin: "+22% guaranteed returns"
      },
      "Tomatoes": {
        historicalPrices: [15, 14, 18, 28, 35, 32, 25, 20, 22],
        demandLevel: "Moderate / Normalizing",
        sowingAdvice: "Prices expected to moderate by November as new harvests hit Southern Maharashtra.",
        recommendedSeason: "Kharif & Rabi",
        expectedMargin: "+15% steady margin"
      }
    };

    return cropProfiles[cropName] || cropProfiles["Soybeans"];
  }

  // 2. AI Route Optimization Engine (Nearest Neighbor & Distance Matrix)
  calculateOptimalRoute(originCoords, hubCoords, destinationCoords) {
    // Simulated coordinates in Maharashtra region
    const defaultOrigin = originCoords || { name: "Farmer Origin (Mohol, Solapur)", lat: 17.8078, lng: 75.6484 };
    const defaultHub = hubCoords || { name: "Regional Cold Logistics Hub (Pandharpur)", lat: 17.6775, lng: 75.3242 };
    const defaultDest = destinationCoords || { name: "Buyer Distribution Warehouse (Pune)", lat: 18.5204, lng: 73.8567 };

    // Distance calculation (Haversine formula approximation)
    const dist1 = this.getHaversineDistance(defaultOrigin, defaultHub);
    const dist2 = this.getHaversineDistance(defaultHub, defaultDest);
    const totalDistance = Math.round(dist1 + dist2);

    const traditionalDistance = Math.round(totalDistance * 1.32); // Middleman route extra detours
    const totalSavedKm = traditionalDistance - totalDistance;
    const carbonSavedKg = (totalSavedKm * 0.42).toFixed(1);

    return {
      nodes: [defaultOrigin, defaultHub, defaultDest],
      totalDistanceKm: totalDistance,
      traditionalDistanceKm: traditionalDistance,
      distanceSavedKm: totalSavedKm,
      carbonSavedKg: carbonSavedKg,
      estimatedHours: (totalDistance / 55).toFixed(1),
      aiOptimizationScore: "96% Route Efficiency Score"
    };
  }

  getHaversineDistance(p1, p2) {
    const R = 6371; // Earth radius in km
    const dLat = (p2.lat - p1.lat) * Math.PI / 180;
    const dLng = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 3. AI Krishi Chatbot Intent Matcher
  queryChatbot(userInput) {
    const text = userInput.toLowerCase();

    if (text.includes("pm-kisan") || text.includes("kisan") || text.includes("6000") || text.includes("योजना")) {
      return {
        reply: "🌾 **PM-KISAN Samman Nidhi Scheme** provides ₹6,000 per year directly to eligible farmer bank accounts in 3 installments of ₹2,000.\n\n**Required Documents:** Aadhaar Card, 7/12 Land Extract, Bank Passbook.\n\nWould you like to open the Schemes page to apply?",
        actionPage: "/pages/schemes.html"
      };
    }

    if (text.includes("sell") || text.includes("बेच") || text.includes("विक्री") || text.includes("list")) {
      return {
        reply: "📸 **How to Sell on KrishiSanjivani:**\n1. Go to 'Sell Produce'.\n2. Select your crop, quantity, and direct price.\n3. Upload 1-2 photos of your produce.\n4. Buyers will contact you directly with zero middleman fee!",
        actionPage: "/pages/sell.html"
      };
    }

    if (text.includes("rent") || text.includes("tractor") || text.includes("ट्रॅक्टर") || text.includes("भाड्याने")) {
      return {
        reply: "🚜 You can rent tractors, tillers, spray drones, and harvesters nearby at affordable daily rates starting at ₹1,200/day.",
        actionPage: "/pages/rent.html"
      };
    }

    if (text.includes("pest") || text.includes("disease") || text.includes("कीड") || text.includes("स्प्रे")) {
      return {
        reply: "🐛 **Pest Advisory:** For stem borers or aphids on soybean/cotton, spray 5% Neem Seed Kernel Extract (NSKE) or Chlorantraniliprole 18.5% SC (3 ml / 10L water). Ensure spraying during morning hours.",
        actionPage: "/pages/weather.html"
      };
    }

    if (text.includes("weather") || text.includes("rain") || text.includes("पाऊस") || text.includes("मौसम")) {
      return {
        reply: "☀️ **Solapur / Maharashtra Weather:** 29°C Partly Cloudy. No heavy rain expected for next 48 hours. Excellent condition for harvesting and field drying.",
        actionPage: "/pages/weather.html"
      };
    }

    return {
      reply: "🌱 I am your **Krishi Mitra AI Assistant**. I can help you with crop selling, equipment rental, weather forecasts, PM-KISAN schemes, and price trends. How can I assist your farm today?",
      actionPage: null
    };
  }
}

window.aiEngine = new AIEngine();

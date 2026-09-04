/* ==========================================================================
   KRISHISANJIVANI - LEAFLET MAP & AI ROUTE VISUALIZER
   ========================================================================== */

class MapHelper {
  initDeliveryMap(elementId, routeData) {
    if (typeof L === 'undefined') {
      console.warn("Leaflet library not loaded yet.");
      return;
    }

    const container = document.getElementById(elementId);
    if (!container) return;

    // Default to Maharashtra region center
    const map = L.map(elementId).setView([18.0, 75.0], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors | KrishiSanjivani Logistics'
    }).addTo(map);

    const nodes = routeData.nodes;
    const latLngs = [];

    // Custom Icon Markers
    const farmIcon = L.divIcon({
      className: 'custom-map-icon',
      html: '<div style="background:#15803D; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid white; box-shadow:0 4px 8px rgba(0,0,0,0.3);">🌱</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const hubIcon = L.divIcon({
      className: 'custom-map-icon',
      html: '<div style="background:#F97316; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid white; box-shadow:0 4px 8px rgba(0,0,0,0.3);">🏬</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const buyerIcon = L.divIcon({
      className: 'custom-map-icon',
      html: '<div style="background:#0284C7; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid white; box-shadow:0 4px 8px rgba(0,0,0,0.3);">🚚</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const icons = [farmIcon, hubIcon, buyerIcon];

    nodes.forEach((node, index) => {
      const pos = [node.lat, node.lng];
      latLngs.push(pos);
      L.marker(pos, { icon: icons[index] || farmIcon })
        .addTo(map)
        .bindPopup(`<b>${node.name}</b><br>Step ${index + 1} of Route`);
    });

    // Draw AI Optimized Polyline Route
    const polyline = L.polyline(latLngs, {
      color: '#15803D',
      weight: 5,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    return map;
  }
}

window.mapHelper = new MapHelper();

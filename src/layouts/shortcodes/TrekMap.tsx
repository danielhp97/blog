import { useEffect, useRef } from "react";

type POIType = "refugio" | "campsite" | "viewpoint" | "glacier" | "peak";

interface POI {
  name: string;
  coords: [number, number];
  type: POIType;
  description: string;
  highlight?: boolean;
}

const POI_COLORS: Record<POIType, string> = {
  refugio: "#f97316",
  campsite: "#22c55e",
  viewpoint: "#ef4444",
  glacier: "#60a5fa",
  peak: "#a855f7",
};

const POI_LABELS: Record<POIType, string> = {
  refugio: "Refugio / Lodge",
  campsite: "Campsite",
  viewpoint: "Viewpoint",
  glacier: "Glacier",
  peak: "Pass / Peak",
};

const POIS: POI[] = [
  {
    name: "Refugio Las Torres",
    coords: [-50.967, -72.897],
    type: "refugio",
    description:
      "Start/end point of the W trek. Well-equipped lodge with dormitories, hot meals, and gear rental. Book months in advance.",
  },
  {
    name: "Refugio Los Cuernos",
    coords: [-50.998, -72.916],
    type: "refugio",
    description:
      "Mid-point lodge with front-row views of Los Cuernos. Great spot to dry gear and rest sore legs on Day 2.",
  },
  {
    name: "Refugio Paine Grande",
    coords: [-51.067, -73.153],
    type: "refugio",
    description:
      "Central hub of the W at Lago Pehoé. Catamaran connection to the park entrance. Starting point if doing the W from west to east.",
  },
  {
    name: "Refugio Grey",
    coords: [-50.998, -73.192],
    type: "refugio",
    description:
      "Westernmost lodge on the W. Kayaking and ice-trekking on Grey Glacier available from here.",
  },
  {
    name: "Campamento Torres",
    coords: [-50.954, -72.940],
    type: "campsite",
    description:
      "Last camp before the towers. Leave here at 04:30 to catch sunrise at the mirador. Exposed to Patagonian winds — stake your tent well.",
  },
  {
    name: "Campamento Italiano",
    coords: [-51.003, -73.032],
    type: "campsite",
    description:
      "Free campsite at the mouth of Valle del Francés. Leave your pack here — no bags allowed past this point into the valley.",
  },
  {
    name: "Campamento Serón",
    coords: [-50.906, -72.978],
    type: "campsite",
    description:
      "O Circuit only. First camp on the remote back loop. Often uncrowded, great condor sightings.",
  },
  {
    name: "Campamento Dickson",
    coords: [-50.872, -72.942],
    type: "campsite",
    description:
      "O Circuit only. Isolated camp beside Lago Dickson. The back side of the park at its wildest.",
  },
  {
    name: "Campamento Los Perros",
    coords: [-50.923, -73.213],
    type: "campsite",
    description:
      "O Circuit only. Last camp before the notorious Paso John Gardner crossing. Pack rain gear — this section sees 200+ days of rain per year.",
  },
  {
    name: "Mirador Las Torres",
    coords: [-50.943, -72.938],
    type: "viewpoint",
    highlight: true,
    description:
      "★ THE icon of Patagonia. Three quartzite towers (2,850 m) reflected in a jade glacial tarn. Allow 8–9 h round-trip from Refugio Las Torres. Arrive before 08:00 to beat crowds.",
  },
  {
    name: "Mirador Británico",
    coords: [-51.021, -73.055],
    type: "viewpoint",
    highlight: true,
    description:
      "★ Best all-round mountain panorama of the trek. Surrounded by the Paine Massif on three sides — Los Cuernos, Paine Grande and the French glaciers all visible at once. 3 h from Campamento Italiano.",
  },
  {
    name: "Mirador Glaciar Grey",
    coords: [-50.948, -73.250],
    type: "viewpoint",
    highlight: true,
    description:
      "★ Sweeping view over the 6 km-wide Grey Glacier as it calves into Lago Grey. Blue icebergs drift below. Best light in the late afternoon.",
  },
  {
    name: "Paso John Gardner",
    coords: [-51.036, -73.312],
    type: "peak",
    description:
      "O Circuit only — highest point of the full loop (1,241 m). On a clear day, the Southern Patagonian Ice Field stretches endlessly to the west. Infamous for brutal winds.",
  },
  {
    name: "Glaciar Grey",
    coords: [-50.920, -73.320],
    type: "glacier",
    description:
      "One of the largest glaciers in South America outside Antarctica. Fed by the Southern Patagonian Ice Field. Guided ice treks available from Refugio Grey.",
  },
];

// W Trek route: east→west including valley spurs. Each spur goes up and back (turnaround noted inline).
const W_ROUTE: [number, number][] = [
  [-50.967, -72.897],
  [-50.963, -72.914],
  [-50.957, -72.928],
  [-50.954, -72.940],
  [-50.949, -72.938],
  [-50.943, -72.938], // Mirador Las Torres ↑ turnaround
  [-50.949, -72.938],
  [-50.954, -72.940],
  [-50.959, -72.924],
  [-50.967, -72.897], // back to Las Torres
  [-50.974, -72.906],
  [-50.984, -72.911],
  [-50.998, -72.916], // Los Cuernos
  [-51.001, -72.946],
  [-51.003, -73.032], // Campamento Italiano
  [-51.009, -73.040],
  [-51.015, -73.047],
  [-51.021, -73.055], // Mirador Británico ↑ turnaround
  [-51.015, -73.047],
  [-51.009, -73.040],
  [-51.003, -73.032], // back to Italiano
  [-51.019, -73.067],
  [-51.036, -73.097],
  [-51.052, -73.128],
  [-51.067, -73.153], // Paine Grande
  [-51.053, -73.165],
  [-51.037, -73.176],
  [-51.022, -73.184],
  [-50.998, -73.192], // Refugio Grey
  [-50.981, -73.208],
  [-50.964, -73.226],
  [-50.948, -73.250], // Mirador Grey ↑ endpoint
];

// O Circuit: back loop counterclockwise from Las Torres, rejoining W at Refugio Grey
const O_ROUTE: [number, number][] = [
  [-50.967, -72.897], // Las Torres
  [-50.944, -72.921],
  [-50.921, -72.944],
  [-50.906, -72.978], // Campamento Serón
  [-50.889, -72.960],
  [-50.872, -72.942], // Campamento Dickson
  [-50.884, -73.020],
  [-50.899, -73.097],
  [-50.914, -73.168],
  [-50.923, -73.213], // Campamento Los Perros
  [-50.958, -73.258],
  [-50.998, -73.293],
  [-51.036, -73.312], // Paso John Gardner
  [-51.052, -73.298],
  [-51.064, -73.278],
  [-51.053, -73.250],
  [-50.998, -73.192], // joins W at Refugio Grey
];

export default function TrekMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof import("leaflet")["map"]> | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inject Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet")
    .then((leafletModule) => {
      const L = leafletModule.default;

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([-51.0, -73.08], 11);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 17,
      }).addTo(map);

      // O Circuit (draw first so W overlaps)
      L.polyline(O_ROUTE, {
        color: "#f59e0b",
        weight: 3,
        opacity: 0.85,
        dashArray: "8 5",
      })
        .addTo(map)
        .bindPopup("<b>O Circuit</b><br>Adds ~4 days around the back of the massif");

      // W Trek route
      L.polyline(W_ROUTE, {
        color: "#3b82f6",
        weight: 4,
        opacity: 0.9,
      })
        .addTo(map)
        .bindPopup("<b>W Trek</b><br>4–5 days, ~80 km");

      // POI markers
      POIS.forEach((poi) => {
        const color = POI_COLORS[poi.type];
        const radius = poi.highlight ? 10 : 7;

        const marker = L.circleMarker(poi.coords, {
          radius,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(map);

        const popupContent = `
          <div style="min-width:200px;max-width:260px;font-family:sans-serif">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${poi.name}</div>
            <div style="display:inline-block;padding:1px 7px;border-radius:9999px;font-size:11px;font-weight:600;margin-bottom:6px;background:${color};color:#fff">
              ${POI_LABELS[poi.type]}
            </div>
            <div style="font-size:12px;color:#444;line-height:1.4">${poi.description}</div>
          </div>`;

        marker.bindPopup(popupContent, { maxWidth: 280 });
      });
    })
    .catch((err) => console.error("[TrekMap] Failed to load Leaflet:", err));

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border shadow-sm">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-b border-border bg-light px-4 py-3 text-sm">
        <span className="font-semibold text-dark">Legend:</span>
        {(Object.keys(POI_LABELS) as POIType[]).map((type) => (
          <span key={type} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: POI_COLORS[type] }}
            />
            {POI_LABELS[type]}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-6"
            style={{ background: "#3b82f6" }}
          />
          W Trek
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-6 border-t-2 border-dashed"
            style={{ borderColor: "#f59e0b" }}
          />
          O Circuit extra
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full border-2 border-white"
            style={{ width: 20, height: 20, background: "#ef4444" }}
          />
          Top highlight
        </span>
      </div>
      {/* Map */}
      <div ref={mapRef} style={{ height: "520px", width: "100%" }} />
      <div className="border-t border-border bg-light px-4 py-2 text-xs text-text">
        Click any marker or route for details. Map data © OpenStreetMap contributors.
      </div>
    </div>
  );
}

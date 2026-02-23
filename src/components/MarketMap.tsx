import { MapContainer, TileLayer, Marker,useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import {useEffect} from 'react';
import { type Coin } from '../types/crypto';

// Fix for default marker icons in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 1. Define this OUTSIDE of your main MarketMap component
const MapController = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap(); // This hook only works inside <MapContainer>

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 6, {
        duration: 1.5,
      });
    }
  }, [lat, lng, map]);

  return null;
};

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MarketMapProps {
  data: Coin[];
}

export const MarketMap = ({ data }: MarketMapProps) => {
  // We'll give the first 3 coins "Global HQ" coordinates
  const locations = [
    { id: 'bitcoin', lat: 37.7749, lng: -122.4194, city: "San Francisco" }, // BTC
    { id: 'ethereum', lat: 47.3769, lng: 8.5417, city: "Zurich" },          // ETH
    { id: 'tether', lat: 22.3193, lng: 114.1694, city: "Hong Kong" },       // USDT
  ];

  // Find if our current filtered list has one of our "HQ" locations
  const activeLocation = locations.find(loc => 
    data.some(coin => coin.id === loc.id)
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 h-[400px] overflow-hidden">
      <h3 className="text-lg font-bold mb-4">Asset Distribution (HQ)</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* If we have an active location, the MapController will fly there! */}
        {activeLocation && (
          <MapController lat={activeLocation.lat} lng={activeLocation.lng} />
        )}

        {locations.map((loc) => {
          const coin = data.find(c => c.id === loc.id);
          if (!coin) return null;
          return (
            <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={DefaultIcon}>
              <Popup>{coin.name} HQ</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};


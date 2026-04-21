import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './SatelliteMap.css';

// Fix for default leaflet icon missing without webpack config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to dynamically update map center when coordinates change
const MapUpdater = ({ center, isExpanded }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);

  useEffect(() => {
    // Invalidate map size after CSS transition completes so tiles load correctly
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 350);
    return () => clearTimeout(timer);
  }, [isExpanded, map]);

  return null;
};

const SatelliteMap = ({ latitude, longitude }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!latitude || !longitude) return null;

  const center = [latitude, longitude];

  return (
    <>
      {isExpanded && <div className="map-backdrop" onClick={() => setIsExpanded(false)}></div>}
      <div className={`satellite-map-container glass-panel ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="map-expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Close map" : "Expand map"}
        >
          {isExpanded ? '✕' : '⛶'}
        </button>
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '100%', width: '100%', borderRadius: 'calc(var(--border-radius) - 2px)' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          />
          <Marker position={center} />
          <MapUpdater center={center} isExpanded={isExpanded} />
          <div>
            Hello
          </div>
        </MapContainer>
      </div>
    </>
  );
};

export default SatelliteMap;

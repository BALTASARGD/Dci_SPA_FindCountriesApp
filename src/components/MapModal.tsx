import * as React from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  latlng: [number, number];
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ latlng, onClose }) => {
  React.useEffect(() => {
    const map = L.map("map").setView(latlng, 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.marker(latlng).addTo(map).bindPopup("Country Location").openPopup();
  }, [latlng]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
        <div id="map" className="h-96 w-full"></div>
      </div>
    </div>
  );
};

export default MapModal;

import * as React from "react";

interface HistoryModalProps {
  description: string;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default HistoryModal;

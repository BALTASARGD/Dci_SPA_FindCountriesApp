import * as React from "react";

interface GalleryModalProps {
  images: any[];
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image.urls.regular} alt={image.alt_description} className="w-full h-auto rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;

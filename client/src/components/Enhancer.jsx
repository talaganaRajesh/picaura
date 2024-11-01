import React, { useState } from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';

const CUTOUT_PRO_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

const Enhancer = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async (imageData) => {
    try {
      const response = await fetch('https://api.cutout.pro/v1.0/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CUTOUT_PRO_API_KEY}`,
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.enhanced_image; // Adjust based on the actual response structure
    } catch (error) {
      console.error('Error processing image:', error);
      alert(`Failed to enhance image: ${error.message}`);
      return null;
    }
  };

  const processImage = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const imageFile = await fetch(image)
        .then((res) => res.blob())
        .then((blob) => new File([blob], 'image.png', { type: 'image/png' }));

      const reader = new FileReader();
      reader.onloadend = async () => {
        const enhancedImageUrl = await enhanceImage(reader.result);
        setProcessedImage(enhancedImageUrl);
        setLoading(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error('Error processing image:', error);
      setLoading(false);
      alert('Error processing image. Please make sure you have an internet connection.');
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'enhanced-image.png';
      link.href = processedImage;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-600 text-center sm:text-left">
            Image Enhancer
          </h1>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row justify-center bg-slate-100 rounded-lg py-6 sm:py-14 items-center gap-4">
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 w-full sm:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer px-4 sm:px-12 inline-block w-full text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-800">
                      {image ? 'Change Image' : 'Upload'}
                    </span>
                  </div>
                </label>
              </div>

              <button
                onClick={processImage}
                disabled={!image || loading}
                className="bg-blue-600 font-semibold text-white px-6 py-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 w-full sm:w-auto"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Enhance Image</span>
                )}
              </button>
            </div>

            {image && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="w-full sm:w-1/4">
                  <h2 className="text-sm font-semibold mb-2 mt-3">Original</h2>
                  <div className="border rounded-lg p-2">
                    <img 
                      src={image} 
                      alt="Original" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-3/4">
                  {processedImage ? (
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                        <h2 className="text-lg font-semibold">Enhanced Image</h2>
                        <button
                          onClick={downloadImage}
                          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto justify-center"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download</span>
                        </button>
                      </div>
                      <div className="border rounded-lg p-2">
                        <img 
                          src={processedImage} 
                          alt="Enhanced" 
                          className="w-full h-[300px] sm:h-[600px] object-contain rounded bg-gray-50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] sm:h-[600px] flex items-center justify-center border rounded-lg bg-gray-50">
                      <p className="text-gray-400">Enhanced image will appear here after processing</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhancer;

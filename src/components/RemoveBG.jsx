import React, { useState } from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';

const REMOVE_BG_API_KEY = 'HBaPXxX9eYWu8hmVN6zSHvyP'; // Replace with your API key

const RemoveBG = () => {
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

  const removeBgFromImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to remove background');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const processImage = async () => {
    if (!image) return;
    setLoading(true);
  
    try {
      const imageFile = await fetch(image)
        .then((res) => res.blob())
        .then((blob) => new File([blob], 'image.png', { type: 'image/png' }));
  
      const processedImageUrl = await removeBgFromImage(imageFile);
      setProcessedImage(processedImageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error processing image:', error);
      setLoading(false);
      alert('Error processing image. Please make sure you have internet connection.');
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'removed-background.png';
      link.href = processedImage;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-600 text-center sm:text-left">
            Background Remover
          </h1>

          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Upload and Process Controls */}
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
                  <span>Remove Background</span>
                )}
              </button>
            </div>

            {/* Image Preview Area */}
            {image && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Small Original Image */}
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

                {/* Large Processed Image */}
                <div className="w-full sm:w-3/4">
                  {processedImage ? (
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                        <h2 className="text-lg font-semibold">Processed Image</h2>
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
                          alt="Processed" 
                          className="w-full h-[300px] sm:h-[600px] object-contain rounded bg-gray-50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] sm:h-[600px] flex items-center justify-center border rounded-lg bg-gray-50">
                      <p className="text-gray-400">Processed image will appear here</p>
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

export default RemoveBG;
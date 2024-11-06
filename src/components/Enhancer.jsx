import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import ShineBorder from './ui/shine-border';

const styles = {
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '20px',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#E6F9E6',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  leftPanel: {
    flex: '1',
    marginRight: '30px',
  },
  rightPanel: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50',
    font: 'bold 24px Arial, sans-serif',
  },
  uploadButton: {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '30px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  canvas: {
    maxWidth: '100%',
    maxHeight: '500px',
    objectFit: 'contain',
    border: '2px solid #3498db',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  controlsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  control: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    padding: '5px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    marginBottom: '10px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  uploadLabel: {
    fontSize: '16px',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  uploadInput: {
    display: 'none',
  },
};

const Enhancer = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [cropRect, setCropRect] = useState({ start: null, end: null });
  const [isCropping, setIsCropping] = useState(false);
  const [cropInProgress, setCropInProgress] = useState(false);
  const [filter, setFilter] = useState('none');
  const [originalImage, setOriginalImage] = useState(null);
  const [isFileInputDisabled, setIsFileInputDisabled] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      drawImage();
    }
  }, [image, brightness, contrast, saturation, rotation, flipX, flipY, filter , cropRect]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setOriginalImage(img);
          setIsFileInputDisabled(true);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = () => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = Math.min(500 / image.width, 500 / image.height);
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX * scale, flipY * scale);
    ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    ctx.restore();

    applyFilter(ctx, filter);

    if (cropRect.start && cropRect.end) {
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            Math.min(cropRect.start.x, cropRect.end.x),
            Math.min(cropRect.start.y, cropRect.end.y),
            Math.abs(cropRect.end.x - cropRect.start.x),
            Math.abs(cropRect.end.y - cropRect.start.y)
        );
    }
  };

  const applyFilter = (ctx, filter) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
          data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
          data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
      default:
        break;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleMouseDown = (event) => {
    if (!isCropping) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCropRect({ start: { x, y }, end: { x, y } });
  };

  const handleMouseMove = (event) => {
    if (!isCropping || !cropRect.start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCropRect((prev) => ({ ...prev, end: { x, y } }));
  };

  const handleMouseUp = () => {
    if (!isCropping) return;
    setIsCropping(false);
  };

  const applyCrop = () => {
    if (!canvasRef.current || !cropRect.start || !cropRect.end) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const croppedWidth = Math.abs(cropRect.end.x - cropRect.start.x);
    const croppedHeight = Math.abs(cropRect.end.y - cropRect.start.y);

    const imageData = ctx.getImageData(
        Math.min(cropRect.start.x, cropRect.end.x),
        Math.min(cropRect.start.y, cropRect.end.y),
        croppedWidth,
        croppedHeight
    );

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = croppedWidth;
    tempCanvas.height = croppedHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);

    const newImage = new Image();
    newImage.onload = () => {
        setImage(newImage);
        setCropRect({ start: null, end: null });
        setIsCropping(false);
        setCropInProgress(false);
    };
    newImage.src = tempCanvas.toDataURL();
  };

  const resetImage = () => {
    setImage(originalImage);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
    setFilter('none');
    setCropRect({ start: null, end: null });
    setIsCropping(false);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'processed-image.png'; // Set the default file name
    link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
    link.click(); // Trigger the download
  };

  return (
    <ShineBorder 
        className="flex  w-3/4 p-7 mx-auto mt-10 bg-green-100 shadow-md shadow-black hover:shadow-lg drop-shadow-md hover:shadow-black transition-shadow duration-300 rounded-lg border-1"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <div style={styles.leftPanel}>
        <h1 style={styles.header}>Edit Photo <span className='text-green-600'>Manually</span></h1>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-input"
            disabled={isFileInputDisabled}
          />
          <label
            htmlFor="image-input"
            className={`flex flex-col items-center justify-center cursor-pointer ${isFileInputDisabled ? 'opacity-100' : ''}`}
            onClick={isFileInputDisabled ? (e) => e.preventDefault() : null}
          >
            {!image ? (
              <div className='flex flex-col items-center justify-center py-16'>
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">
                  Click to upload an image
                </span>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                style={styles.canvas}
                className='cursor-crosshair size-3/4'
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
            )}
          </label>
        </div>
        {processedImage && (
          <img
            src={processedImage}
            alt="Processed"
            className="w-3/4 rounded-lg bg-gray-100 mt-4"
          />
        )}
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.controlsContainer}>
          <div style={styles.control}>
            <label htmlFor="brightness" style={styles.label}>Brightness</label>
            <input
              type="range"
              id="brightness"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.control}>
            <label htmlFor="contrast" style={styles.label}>Contrast</label>
            <input
              type="range"
              id="contrast"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.control}>
            <label htmlFor="saturation" style={styles.label}>Saturation</label>
            <input
              type="range"
              id="saturation"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.control}>
            <label htmlFor="rotation" style={styles.label}>Rotation</label>
            <input
              type="range"
              id="rotation"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.control}>
            <label htmlFor="filter" style={styles.label}>Filter</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.select}
            >
              <option value="none">None</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="invert">Invert</option>
            </select>
          </div>
        </div>
        {image && (
          <>
            <div style={styles.actionButtons}>
              <div style={{display: 'flex', justifyContent: 'space-between'}} className='px-14'>
                <button onClick={() => setFlipX(flipX * -1)} style={styles.button}>
                  Flip Horizontal
                </button>
                <button onClick={() => setFlipY(flipY * -1)} style={styles.button}>
                  Flip Vertical
                </button>
                <button onClick={resetImage} style={{...styles.button, backgroundColor: '#e74c3c'}}>
                  Reset Image
                </button>
              </div>
              <div className='flex flex-row justify-center mt-4 gap-4' >
                <button className='px-4 py-3 rounded-md font-bold'
                  onClick={() => {
                    if (cropRect.start && cropRect.end) {
                      applyCrop();
                    } else {
                      setIsCropping(true);
                      setCropInProgress(true);
                    }
                  }}
                  style={{ backgroundColor: '#e67e22' }}
                >
                  {cropRect.start && cropRect.end ? 'Apply Crop' : 'Start Cropping'}
                </button>
                <button className='px-20 py-3 rounded-md font-bold' onClick={downloadImage} style={{ backgroundColor: '#3498db'}}>
                  Download Image
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </ShineBorder>
  );
};

export default Enhancer;
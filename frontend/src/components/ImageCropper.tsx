import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ image, onCrop, addImageToProject }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedImage = croppedCanvas.toDataURL();
    onCrop(croppedImage);

    croppedCanvas.toBlob(async (blob) => {
        if (!blob) {
            console.error("No se pudo generar el blob.");
            return;
        }
        const base64Image = await encodeImageToBase64(blob);
        addImageToProject(base64Image);
    }, "image/png");
};

  const encodeImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <Cropper
        src={image}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={16 / 9}
        guides={false}
        ref={cropperRef}
      />
      {/* <button onClick={handleCrop}>Recortar</button> */}
      <Button onClick={handleCrop}>Recortar</Button>
    </div>
  );
};

export default ImageCropper;
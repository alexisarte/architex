import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ image, onCrop }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    onCrop(croppedImage);
  };

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
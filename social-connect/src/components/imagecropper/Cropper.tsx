import React, { useState, useRef } from "react";
import style from "./cropper.module.scss";
import "react-image-crop/src/ReactCrop.scss";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { useDebounceEffect } from "@/helper/useDebounceEffect";

import { canvasPreview } from "@/helper/canvasPreview";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface dataType {
  imgSrc: string;
  aspect?: number | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | null | Blob>>;
}

const Cropper = ({ imgSrc, aspect: asp, setImage }: dataType) => {
  // coppied code
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(asp);
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleMakeChanges = () => {
    previewCanvasRef.current &&
      previewCanvasRef.current?.toBlob((blob) => {
        setImage(blob);
        setCompletedCrop(null);
      });
  };
  return (
    <div className={style.cropper_container}>
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspect}
      >
        <img
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          onLoad={onImageLoad}
        />
      </ReactCrop>

      {completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
                display: "none",
              }}
            />
          </div>
          <div className={style.cropper_config}>
            {/* Scale slider */}
            <label htmlFor="scale">Set Scale</label>
            <input
              id="scale"
              type="range"
              min={1}
              max={10}
              value={scale}
              onChange={(e) => setScale(+e.target.value)}
            />
            {/* Rotate Slider */}
            <label htmlFor="rotate">Rotate Image</label>
            <input
              id="rotate"
              type="range"
              min={0}
              max={360}
              value={rotate}
              onChange={(e) => setRotate(+e.target.value)}
            />
            <button onClick={handleMakeChanges}>Make Changes</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cropper;

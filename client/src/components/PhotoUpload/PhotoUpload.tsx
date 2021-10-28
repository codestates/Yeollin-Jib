import React from "react";
import { PhotoBackground, Photo } from "./PhotoUpload.style";

interface PhotoPathHandle {
  photoPath: (file: any) => void;
}

function PhotoUpload({ photoPath }: PhotoPathHandle) {
  return (
    <>
      <Photo
        type="file"
        multiple
        onChange={(e) => photoPath(e.target.files)}
      ></Photo>
      <PhotoBackground>
        <span>+</span>
      </PhotoBackground>
    </>
  );
}

export default PhotoUpload;

import React from "react";
import { PhotoBackground, Photo } from "./PhotoUpload.style";

function PhotoUpload() {
  return (
    <>
      <Photo type="file"></Photo>
      <PhotoBackground>
        <span>+</span>
      </PhotoBackground>
    </>
  );
}

export default PhotoUpload;

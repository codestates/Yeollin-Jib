import { AnyAaaaRecord, AnyMxRecord } from "dns";
import React from "react";
import { PhotoBackground, Photo } from "./PhotoUpload.style";

interface PhotoInfo {
  photoPath: (file: any) => void;
  arrPhoto: any;
}

function PhotoUpload({ photoPath, arrPhoto }: PhotoInfo) {
  return (
    <>
      {arrPhoto[0] === undefined ? (
        <>
          <Photo
            type="file"
            multiple
            accept={".jpg,.png"}
            onChange={(e) => photoPath(e.target.files)}
          ></Photo>
          <PhotoBackground>
            <span>+</span>
          </PhotoBackground>
        </>
      ) : (
        <Photo
          type="file"
          multiple
          accept={".jpg,.png"}
          onChange={(e) => photoPath(e.target.files)}
        ></Photo>
      )}
    </>
  );
}

export default PhotoUpload;

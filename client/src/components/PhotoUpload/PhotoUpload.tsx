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
            <img src="./images/plusBtn.svg" alt="plus" />
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

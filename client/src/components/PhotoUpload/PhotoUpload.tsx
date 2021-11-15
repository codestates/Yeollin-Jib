import { PhotoBackground, Photo } from "./PhotoUpload.style";

interface PhotoInfo {
  photoPath: (file: any) => void;
}

function PhotoUpload({ photoPath }: PhotoInfo) {
  return (
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
  );
}

export default PhotoUpload;

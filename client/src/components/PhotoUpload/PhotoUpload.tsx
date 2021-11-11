import { PhotoBackground, Photo } from "./PhotoUpload.style";

interface PhotoInfo {
  photoPath: (file: any) => void;
  arrPhoto: any;
  postImagePath?: string[];
}

function PhotoUpload({ photoPath, arrPhoto, postImagePath }: PhotoInfo) {
  return (
    <>
      {postImagePath ? (
        arrPhoto.length + postImagePath.length < 6 ? (
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
          <></>
        )
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

import { PhotoBackground, Photo } from "./ProfileImgUpload.style";

interface PhotoInfo {
  setProfileImgData: (file: any) => void;
  profileImg: any;
}

function ProfileImgUpload({ setProfileImgData, profileImg }: PhotoInfo) {
  return (
    <>
      {profileImg[0] === undefined ? (
        <>
          <Photo
            type="file"
            multiple
            accept={".jpg,.png"}
            onChange={(e) => setProfileImgData(e.target.files)}
          ></Photo>
          <PhotoBackground>
            <img src="./images/plusBtn.svg" alt="+" />
          </PhotoBackground>
        </>
      ) : (
        <Photo
          type="file"
          multiple
          accept={".jpg,.png"}
          onChange={(e) => setProfileImgData(e.target.files)}
        ></Photo>
      )}
    </>
  );
}

export default ProfileImgUpload;

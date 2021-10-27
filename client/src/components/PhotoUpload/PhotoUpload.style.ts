import styled from "styled-components";

export const PhotoBackground = styled.div`
  width: 217px;
  height: 217px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 7px;
  span {
    height: 20px;
    width: 20px;
    border-radius: 20px;
    color: #2d2d2d;
    border: 3px solid #2d2d2d;
    position: absolute;
    cursor: pointer;
    line-height: 22px;
    text-align: center;
    font-size: 23px;
  }
`;

export const Photo = styled.input`
  height: 217px;
  width: 217px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  z-index: 1;
  ::file-selector-button {
    display: none;
    text-decoration: none;
  }
`;

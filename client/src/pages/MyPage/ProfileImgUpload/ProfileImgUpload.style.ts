import styled from "styled-components";

export const PhotoBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 7px;
  width: 11.19rem;
  height: 11.19rem;
  position: absolute;
  background: #fdfbfe;

  @media screen and (max-width: 37.5rem) {
    transition: 0.5s all;
    width: 8rem;
    height: 8rem;

    img {
      width: 18px;
    }
  }
`;

export const Photo = styled.input`
  width: 11.19rem;
  height: 11.19rem;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  z-index: 1;

  ::file-selector-button {
    display: none;
    text-decoration: none;
  }

  @media screen and (max-width: 37.5rem) {
    transition: 0.5s all;
    width: 8rem;
    height: 8rem;
  }
`;

import styled from "styled-components";

export const BarWrapper = styled.div`
  font-family: "Gmarket Sans TTF";
  box-sizing: border-box;
  display: flex;
  justify-content: right;

  a {
    text-decoration: none;
  }
`;

export const Bar = styled.div`
  width: 90px;
  height: 94vh;
  text-align: right;
  border-left: 1px solid #e0dde1;
  padding: 20px;

  img {
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

export const MenuWrapper = styled.div`
  cursor: pointer;
  margin-top: 30px;
`;

export const Menu = styled.span`
  font-size: 1rem;
  font-weight: 100;
  color: #2d2d2d;

  :hover {
    border-bottom: 5px solid #fede8a;
  }
`;

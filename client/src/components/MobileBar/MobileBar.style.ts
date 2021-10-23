import styled from "styled-components";

export const BarWrapper = styled.div`
  font-family: "Gmarket Sans TTF";
  box-sizing: border-box;
  display: flex;
  justify-content: right;
  align-items: center;
  background-color: #fdfbfe;

  a {
    text-decoration: none;
  }
`;

export const Bar = styled.div`
  text-align: right;
  border-left: 1px solid #e0dde1;
  width: 100px;
  padding: 33px 24px 0 24px;
  height: 100vh;

  img {
    /* width: 1.5rem; */
    width: 1rem;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

export const MenuWrapper = styled.div`
  cursor: pointer;
  margin-top: 30px;
`;

export const Menu = styled.span`
  font-size: 0.9rem;
  font-weight: 100;
  color: #2d2d2d;

  :hover {
    border-bottom: 5px solid #fede8a;
  }
`;

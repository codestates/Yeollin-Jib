import styled from "styled-components";

interface IContentProps {
  isContent: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const CardContainer = styled.article<IContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${(props) => (props.isContent ? "none" : "0.063rem solid #e0dde1;")};
  border-radius: 0.313rem;
  width: 17.938rem;
  height: 28.54rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: ${(props) =>
    props.isContent ? "0 0 0.813rem 37px" : "4px 0 0.813rem 37px"};
  cursor: ${(props) => (props.isContent ? "pointer" : "Default")};

  @media screen and (max-width: 37.5rem) {
    width: 100%;
    font-size: 0.9rem;
    margin: ${(props) =>
      props.isContent ? "10px 0 40px 0;" : "-5px 0 40px 0;"};
  }
`;

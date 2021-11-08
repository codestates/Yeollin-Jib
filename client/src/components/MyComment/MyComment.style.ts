import styled from "styled-components";

interface IContentProps {
  isContent: boolean;
}

export const CardContainer = styled.div<IContentProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 6rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;
  padding: 20px;
  cursor: ${(props) => (props.isContent ? "pointer" : "Default")};

  @media screen and (max-width: 37.5rem) {
    height: 4.5rem;
    font-size: 0.9rem;
  }
`;

export const TitleContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  width: 100%;

  @media screen and (max-width: 37.5rem) {
    margin-bottom: 5px;
  }
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.7rem;
  width: 100%;
  height: 20px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 37.5rem) {
    line-height: 1.5rem;
    font-size: 0.8rem;
    width: 100%;
    font-size: 0.8rem;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Date = styled.div`
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  text-align: center;
  line-height: 1.7rem;
  font-size: 0.8rem;
  width: 100px;
  height: 1.6rem;
  background: #fede8a;
  border-radius: 0.313rem;
  padding: 0 5px 0 5px;

  @media screen and (max-width: 37.5rem) {
    line-height: 1.4rem;
    font-size: 0.6rem;
    width: 6rem;
    height: 1.4rem;
    padding: 1px 3px 0 3px;
  }
`;

export const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
`;

export const Comment = styled.div`
  width: 100%;
  height: 18px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9rem;

  @media screen and (max-width: 37.5rem) {
    width: 100%;
    font-size: 0.8rem;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

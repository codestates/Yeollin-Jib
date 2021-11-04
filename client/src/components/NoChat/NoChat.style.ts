import styled from "styled-components";

export const ChatListContainer = styled.div`
  width: 50%;
  min-width: 300px;
  height: 745px;
  margin: 35px 35px 0 0;
  padding: 0.813rem;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Gmarket Sans TTF";
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

import styled from "styled-components";

export const FooterItemContainer = styled.div`
  width: 13.75rem;
  height: 3.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Gmarket Sans TTF";
`;

export const FooterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  line-height: 22px;
  .contact {
    box-sizing: border-box;
    height: 24px;
    line-height: 22px;
    color: #2d2d2d;
    font-size: 1rem;
    cursor: pointer;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
  }
`;

export const GitHubContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
  }
  a {
    margin-left: 0.625rem;
    color: #2d2d2d;
    font-size: 1rem;
    cursor: pointer;
    height: 24px;
    text-decoration: none;
    color: #2d2d2d;
    box-sizing: border-box;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
  }
`;

export const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TeamMember = styled.span`
  a {
    font-weight: 100;
    font-size: 0.875rem;
    cursor: pointer;
    text-decoration: none;
    color: #2d2d2d;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
  }
`;

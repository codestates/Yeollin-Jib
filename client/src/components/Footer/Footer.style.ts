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
  .contact {
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
    text-decoration: none;
    color: #2d2d2d;
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
      border-bottom: 0.188rem solid #fede8a;
    }
  }
`;

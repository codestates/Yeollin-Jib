import React from "react";
import {
  FooterItemContainer,
  FooterTitle,
  GitHubContainer,
  TeamMemberContainer,
  TeamMember,
} from "./Footer.style";

function Footer() {
  return (
    <FooterItemContainer>
      <FooterTitle>
        <GitHubContainer>
          <img src="./images/githubLogo.svg" alt="GitImg" />
          <a
            href="https://github.com/codestates/Yeollin-Jib"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codemon
          </a>
        </GitHubContainer>
        <div className="contact">문의하기</div>
      </FooterTitle>
      <TeamMemberContainer>
        <TeamMember>
          <a
            href="https://github.com/suzyhwang"
            target="_blank"
            rel="noopener noreferrer"
          >
            황소영
          </a>
        </TeamMember>
        <TeamMember>
          <a
            href="https://github.com/choigicheol"
            target="_blank"
            rel="noopener noreferrer"
          >
            최기철
          </a>
        </TeamMember>
        <TeamMember>
          <a
            href="https://github.com/iysh321"
            target="_blank"
            rel="noopener noreferrer"
          >
            정인용
          </a>
        </TeamMember>
        <TeamMember>
          <a
            href="https://github.com/devSominPark"
            target="_blank"
            rel="noopener noreferrer"
          >
            박소민
          </a>
        </TeamMember>
      </TeamMemberContainer>
    </FooterItemContainer>
  );
}

export default Footer;

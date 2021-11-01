import React, { useState } from "react";
import {
  FooterItemContainer,
  FooterTitle,
  GitHubContainer,
  TeamMemberContainer,
  TeamMember,
} from "./Footer.style";
import Inquiry from "../../components/Modals/Inquiry/Inquiry";
function Footer() {
  // 문의하기 모달 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

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
        {isOpened ? (
          <Inquiry setIsOpened={(bool: boolean) => setIsOpened(bool)}></Inquiry>
        ) : null}
        <div className="contact" onClick={() => setIsOpened(true)}>
          문의하기
        </div>
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

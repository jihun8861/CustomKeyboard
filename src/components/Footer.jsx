import React from "react";
import styled from "styled-components";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiFillDiscord } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const Frame = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    font-size: 12px;
    padding: 2px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 10%;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const Footer = () => {
  return (
    <Container>
      <Frame>
        <IconWrapper>
          <Icon>
            <FaYoutube />
          </Icon>
          <Icon>
            <FaInstagram />
          </Icon>
          <Icon>
            <RiKakaoTalkFill />
          </Icon>
          <Icon>
            <AiFillDiscord />
          </Icon>
        </IconWrapper>
        <h4 style={{ paddingBottom: "10px" }}>Tabs</h4>
        <span>
          인제대학교 | 경남 김해시 인제로 197 P&N 동아리방 TEL.010-2362-8861 |
          대표: 현지훈
        </span>
        <span>본사: 부산광역시 사상구 가야대로 xxx번길 xx 4층</span>
        <span>고객센터: 055-334-7111 | E-MAIL: ji55hun@oasis.inje.ac.kr</span>
        <span style={{ paddingTop: "10px", fontWeight: "bold" }}>
          Copyright ⓒ 2024 커스텀키보드 제조기업 Tabs All rights reserved.
        </span>
      </Frame>
    </Container>
  );
};

export default Footer;
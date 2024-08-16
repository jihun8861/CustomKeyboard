import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin-bottom: 100px;
`;

const Line = styled.hr`
  width: 100%;
  border: solid 1.5px;
  margin: 20px 20px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 42px;
  p {
    color: #888888;
  }
`;

const Title = styled.h2`
  padding-bottom: 5px;
`;

const MarkerIcon = styled(FaMapMarkerAlt)`
  font-size: 24px;
`;

const CallIcon = styled(IoIosCall)`
  font-size: 24px;
`;

const MailIcon = styled(FaGithub)`
  font-size: 24px;
`;

const ContactContent = () => {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight / 2 - window.innerHeight / 5,
      behavior: "smooth",
    });
  }, []);

  return (
    <Container>
      <Frame>
        <h1>CONTACT US</h1>
        <Line />
        <InfoBox>
          <MarkerIcon />
          <Title>Visit us.</Title>
          <p>경상남도 김해시 인제로 197 장영실관 122-A</p>
        </InfoBox>

        <InfoBox>
          <CallIcon />
          <Title>Call us.</Title>
          <p>김호연 TEL 010-6284-0295</p>
          <p>현지훈 TEL 010-2362-8861</p>
          <p>이채완 TEL 010-5118-0879</p>
        </InfoBox>

        <InfoBox>
          <MailIcon />
          <Title>Github us.</Title>
          <p>mkiu703095@gmail.com | Hopar7</p>
          <p>ji55hun@oasis.inje.ac.kr | jihun8861</p>
          <p>codhks1405@oasis.inje.ac.kr | leechaewan123</p>
        </InfoBox>
      </Frame>
    </Container>
  );
};

const Contact = () => {
  return <Layout isHome={true} children={<ContactContent />} />;
};

export default Contact;
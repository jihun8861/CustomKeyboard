import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { PiShareNetwork } from "react-icons/pi";

const Container = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrameWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-between;
`;

const ImageFrame = styled.div`
  width: 45%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: 100% 100%;
  border-radius: 16px;
`;

const TextFrame = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  height: auto;
  font-size: 24px;
  margin-bottom: 14px;
  color: ${(props) => props.color};
`;

const PriceFrame = styled.div`
  height: auto;
  font-size: 24px;
  border: soild 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Price = styled.div`
  height: auto;
  color: #6d8cff;
  font-weight: bold;
`;

const ShareIcon = styled(PiShareNetwork)`
  font-size: 24px;
  cursor: pointer;
`

const Line = styled.hr`
  border: solid 1px #e5e5e5;
  margin: 50px 0 30px 0;
`;

const Title2 = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const DetailFrame = styled.div`
  height: auto;
  margin-top: 40px;
  font-size: 18px;
`;

const ServiceFrame = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ServiceItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ServiceLabel = styled.p`
  margin: 0;
  padding-right: 7px;
  font-weight: bold;
`;

const ServiceValue = styled.span`
  margin: 0;
`;

const BtnFrame = styled.div`
  height: auto;
  display: flex;
`;

const PurchaseBtn = styled.button`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  border: none;
  font-weight: bold;
  color: white;
  background-color: #6d8cff;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5377ff;
  }
`;

const PurchaseContent = () => {
  const location = useLocation();
  const { image, text, price, text2, color, details } = location.state || {};

  return (
    <Container>
      <Frame>
        <FrameWrapper>
          <ImageFrame image={image} />
          <TextFrame>
            <Title>{text}</Title>
            <PriceFrame>
            <Price>
              {new Intl.NumberFormat("ko-KR", {
                currency: "KRW",
                minimumFractionDigits: 0,
              }).format(price)}
              원
            </Price>
            <ShareIcon/>
            </PriceFrame>
            <Line />
            <Title2 color={color}>{text2}</Title2>
            <DetailFrame>
              {details &&
                details.map((detail, index) => (
                  <div key={index}>- {detail}</div>
                ))}
            </DetailFrame>
            <ServiceFrame>
              <ServiceItem>
                <ServiceLabel>배송방법</ServiceLabel>
                <ServiceValue>택배</ServiceValue>
              </ServiceItem>
              <ServiceItem>
                <ServiceLabel>배송비</ServiceLabel>
                <ServiceValue>3,000원</ServiceValue>
              </ServiceItem>
            </ServiceFrame>
            <BtnFrame>
              <PurchaseBtn>구매하기</PurchaseBtn>
            </BtnFrame>
          </TextFrame>
        </FrameWrapper>
      </Frame>
    </Container>
  );
};

const Purchase = () => {
  return <Layout isHome={false} children={<PurchaseContent />} />;
};

export default Purchase;

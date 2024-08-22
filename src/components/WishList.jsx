import React from "react";
import styled from "styled-components";
import { IoMdHeart } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const MiniTextFrame = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
    margin-top: 20px;
`;

const NumberText = styled.div`
  margin-left: 7px;
  color: #6d8cff;
  font-weight: bold;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const FrameBox = styled.div`
  width: 22%;
  height: 430px;
  position: relative;
  margin-bottom: 60px;
  margin-right: 4%;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 210px;
  display: flex;
  border-radius: 5px;
  background-image: url("/images/banner.png");
  background-size: 100% 100%;
  cursor: pointer;
`;

const HeartIcon = styled(IoMdHeart)`
  font-size: 28px;
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  color: #d84d51;
`;

const InfoFrame = styled.div`
  width: 100%;
  height: 200px;
  h2 {
    padding: 8px 0 8px 0;
    font-size: 23px;
  }
`;

const DesignCheckBtn = styled.button`
  color: white;
  font-size: 17px;
  font-weight: bold;
  background-color: #6d8cff;
  width: 100%;
  height: 70px;
  border: none;
  cursor: pointer;
  margin-top: 60px;

  &:hover {
    background-color: #5377ff;
  }
`

const WishList = () => (
  <Container>
    <MiniTextFrame>
      <p>저장목록</p>
      <NumberText>5개</NumberText>
    </MiniTextFrame>
    <ListBox>
      {[...Array(5)].map((_, idx) => (
        <FrameBox key={idx}>
          <ImageFrame>
            <HeartIcon />
          </ImageFrame>
          <InfoFrame>
            <h2>커스텀 키보드 100% 배열</h2>
            <span>2024.08.16</span>
            <DesignCheckBtn>디자인 확인하기</DesignCheckBtn>
          </InfoFrame>
        </FrameBox>
      ))}
    </ListBox>
  </Container>
);

export default WishList;

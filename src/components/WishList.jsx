import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

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
  margin-bottom: 100px;
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
  p {
    color: #222222;
    padding: 1px 0 1px 0;
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
  margin-top: 30px;

  &:hover {
    background-color: #5377ff;
  }
`

const WishList = () => {
  const [savedKeyboards, setSavedKeyboards] = useState([]);
  const { userInfo } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKeyboards = async () => {
      if (userInfo && userInfo.email) { 
        try {
          const response = await axios.post("https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/items/find", {
            email: userInfo.email,
          });

          const sortedKeyboards = response.data.sort((a, b) => new Date(b.savetime) - new Date(a.savetime));
          setSavedKeyboards(sortedKeyboards);
        } catch (error) {
          console.error("Failed to fetch saved keyboards:", error);
        }
      }
    };

    fetchKeyboards();
  }, [userInfo]);

  const handleDesignCheck = (keyboard) => {
    const pattern = keyboard.design === "없음" ? null : keyboard.design;
    console.log('Selected Pattern:', pattern); // 확인용 로그
    navigate("/custom", {
      state: {
        keyboardType: keyboard.keyboardtype,
        keycapColor: keyboard.keycapcolor,
        bareboneColor: keyboard.barebonecolor,
        switchColor: keyboard.switchcolor,
        selectedPattern: pattern || "없음",  // 기본값을 지정해서 문제를 방지
        keyboardText: `${keyboard.keyboardtype}% 배열 키보드`,
      },
    });
  };
  
  return (
    <Container>
      <MiniTextFrame>
        <p>저장목록</p>
        <NumberText>{savedKeyboards.length}개</NumberText>
      </MiniTextFrame>
      <ListBox>
        {savedKeyboards.map((keyboard, idx) => (
          <FrameBox key={idx}>
            <ImageFrame onClick={() => handleDesignCheck(keyboard)}>
              <HeartIcon />
            </ImageFrame>
            <InfoFrame>
              <h2>{keyboard.keyboardtype}% 배열 키보드</h2>
              <p>저장된 시각: {new Date(keyboard.savetime).toLocaleString()}</p>
              <p>베어본 색상: {keyboard.barebonecolor}</p>
              <p>키캡 색상: {keyboard.keycapcolor}</p>
              <p>스위치 색상: {keyboard.switchcolor}</p>
              <p>패턴: {keyboard.design}</p>
              <DesignCheckBtn onClick={() => handleDesignCheck(keyboard)}>디자인 확인하기</DesignCheckBtn>
            </InfoFrame>
          </FrameBox>
        ))}
      </ListBox>
    </Container>
  );
};

export default WishList;
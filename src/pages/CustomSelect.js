import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 50px 0;
`;

const Frame = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TitleText = styled.h1`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KeyboardFrame = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Keyboard = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
`;

const ItemFrame = styled.a`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
  background-position: center;
`;

const ImageText = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: bold;
`;

const CustomSelectContent = () => {
  const navigate = useNavigate();

  // handleClick 함수에서 배열의 텍스트와 타입을 함께 전달합니다.
  const handleClick = (keyboardType, keyboardText) => {
    navigate("/custom", { state: { keyboardType, keyboardText } });
  };

  return (
    <Container>
      <Frame>
        <TitleText>3D Custom</TitleText>
        <KeyboardFrame>
          <Keyboard>
            <ItemFrame onClick={() => handleClick("60", "60% Keyboard")}>
              <Image style={{ backgroundImage: `url(/images/60keyboard.png)` }} />
              <ImageText>60키 Keyboard</ImageText>
            </ItemFrame>
            <ItemFrame onClick={() => handleClick("80", "80% Keyboard")}>
              <Image style={{ backgroundImage: `url(/images/80keyboard.png)` }} />
              <ImageText>87키 Keyboard</ImageText>
            </ItemFrame>
            <ItemFrame onClick={() => handleClick("100", "100% Keyboard")}>
              <Image style={{ backgroundImage: `url(/images/100keyboard.png)` }} />
              <ImageText>104키 Keyboard</ImageText>
            </ItemFrame>
          </Keyboard>
        </KeyboardFrame>
      </Frame>
    </Container>
  );
};

const CustomSelect = () => {
  return <Layout isHome={false} children={<CustomSelectContent />} />;
};

export default CustomSelect;

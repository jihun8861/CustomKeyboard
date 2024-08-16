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
  border: solid 1px;
  margin: 50px 0 50px 0;
`;

const Frame = styled.div`
  width: 80%;
  height: 100%;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TitleText = styled.h1`
  width: 100%;
  height: auto;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KeyboardFrame = styled.div`
  width: 100%;
  height: 400px;
  border: solid 1px;
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
  width: 28%;
  height: 100%;
  border: solid 1px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const Image = styled.div`
  width: 100%;
  height: 80%;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageText = styled.div`
  width: 100%;
  height: 20%;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomSelectContent = () => {
  const navigate = useNavigate();

  const handleClick = (text) => {
    navigate("/custom", { state: { text } });
  };

  return (
    <Container>
      <Frame>
        <TitleText>3D Custom</TitleText>
        <KeyboardFrame>
          <Keyboard>
            <ItemFrame onClick={() => handleClick("60% Keyboard")}>
              <Image>60% 베어본 이미지</Image>
              <ImageText>60% Keyboard</ImageText>
            </ItemFrame>
            <ItemFrame onClick={() => handleClick("80% Keyboard")}>
              <Image>80% 베어본 이미지</Image>
              <ImageText>80% Keyboard</ImageText>
            </ItemFrame>
            <ItemFrame onClick={() => handleClick("100% Keyboard")}>
              <Image>100% 베어본 이미지</Image>
              <ImageText>100% Keyboard</ImageText>
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

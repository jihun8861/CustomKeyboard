import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  height: 500px;
  border: solid 1px;
  margin-bottom: 100px;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 70%;
  border: solid 1px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const TextFrame = styled.div`
  width: 100%;
  height: 30%;
  border: solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PurchaseBtn = styled.button`
  width: 35%;
  height: 35%;
  background-color: #6d8cff;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5377ff;
`;

const ItemFrame3 = ({ image, text }) => {
  return (
    <>
      <Container>
        <ImageFrame image={image} />
        <TextFrame>
          <Text>{text}</Text>
          <PurchaseBtn>Test</PurchaseBtn>
        </TextFrame>
      </Container>
    </>
  );
};

export default ItemFrame3;

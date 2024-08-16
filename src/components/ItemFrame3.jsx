import React from "react";
import styled from "styled-components";
import { HiArrowLongRight } from "react-icons/hi2";

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
`;

const Frame = styled.div`
  width: 80%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const CustomSpace = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CustomIconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
`;

const CustomIconSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`;

const CustomTextSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;

`;

const CustomBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 60px;
  border: solid 2px #eeeeee;
  border-radius: 40px;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  margin-top: 50px;
`;

const ArrowIcon = styled(HiArrowLongRight)`
  font-size: 20px;
  margin-left: 10px;
`;

const LinkStyle = {
  textDecoration: "none",
  color: "black",
};

const ItemFrame3 = () => {
  return (
    <Container>
      <Frame>
        <CustomSpace>
          <CustomIconTextWrapper>
            <CustomIconSpace>
              <img src="images/item1.png" alt="item1" style={{ width: "40%", height: "auto" }} />
            </CustomIconSpace>
            <CustomTextSpace>
              <h2>Bareborn</h2>
            </CustomTextSpace>
          </CustomIconTextWrapper>

          <CustomIconTextWrapper>
            <CustomIconSpace>
              <img src="images/item2.png" alt="item2" style={{ width: "30%", height: "auto" }} />
            </CustomIconSpace>
            <CustomTextSpace>
            <h2>Switch</h2>
            </CustomTextSpace>
          </CustomIconTextWrapper>

          <CustomIconTextWrapper>
            <CustomIconSpace>
              <img src="images/item3.png" alt="item3" style={{ width: "40%", height: "auto" }} />
            </CustomIconSpace>
            <CustomTextSpace>
            <h2>Keycap</h2>
            </CustomTextSpace>
          </CustomIconTextWrapper>
        </CustomSpace>

        <a href="CustomSelect" style={LinkStyle}>
          <CustomBtn>
            커스텀 하러 가기
            <ArrowIcon />
          </CustomBtn>
        </a>
      </Frame>
    </Container>
  );
};

export default ItemFrame3;

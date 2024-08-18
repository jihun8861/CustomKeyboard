import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled, { keyframes} from "styled-components";
import Layout from "../components/Layout";
import keyboards from '../json/keyboards.json';
import TextFrame from "../components/TextFrame";
import ItemFrame2 from "../components/ItemFrame2";
import ItemFrame3 from "../components/ItemFrame3";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

// 스타일 및 애니메이션 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
  }
`;

const Frame1 = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  opacity: 0;
  transition: opacity 0.5s ease-out;
  p {
    font-size: 18px;
    color: #888888;
  }

  &.visible {
    animation: ${slideUp} 1s forwards;
    opacity: 1;
  }
`;

const Frame2 = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Frame3 = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
`;

const ItemFrame2Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ArrowIconFront = styled(MdArrowForwardIos)`
  font-size: 30px;
  cursor: pointer;
  bottom: 30px;
  position: relative;
`;

const ArrowIconBack = styled(MdArrowBackIosNew)`
  font-size: 30px;
  cursor: pointer;
  bottom: 30px;
  position: relative;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const RadioButton = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ isActive }) => (isActive ? "#6d8cff" : "lightgrey")};
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  margin-bottom: 60px;

  &:hover {
    background-color: #6d8cff;
  }
`;

const HomeContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(keyboards.length / itemsPerPage);
  
  useEffect(() => {
    if (slideDirection) {
      const timeout = setTimeout(() => {
        setSlideDirection(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [slideDirection]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < keyboards.length) {
      setSlideDirection("left");
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setSlideDirection("right");
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleRadioClick = (index) => {
    if (index * itemsPerPage > currentIndex) {
      setSlideDirection("left");
    } else if (index * itemsPerPage < currentIndex) {
      setSlideDirection("right");
    }
    setCurrentIndex(index * itemsPerPage);
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.08,
  });

  return (
    <Container>
      <Frame1 ref={ref} className={inView ? "visible" : ""}>
        <TextFrame>Tabs</TextFrame>
        <p>3D Custom Keyboard</p>
        <ItemFrame3 />
      </Frame1>

      <TextFrame>Popular Product</TextFrame>
      <Frame3>
        <ArrowIconBack onClick={handlePrev} />
        <ItemFrame2Wrapper slideDirection={slideDirection}>
          {keyboards
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((item, index) => (
              <ItemFrame2
                key={currentIndex + index}
                image={item.image}
                hoverImage={item.hoverImage}
                text={item.text}
                price={item.price}
                text2={item.text2}
                color={item.color}
                details={item.details}
              />
            ))}
        </ItemFrame2Wrapper>
        <ArrowIconFront onClick={handleNext} />
      </Frame3>
      <RadioButtonContainer>
        {Array.from({ length: totalPages }).map((_, index) => (
          <RadioButton
            key={index}
            isActive={currentIndex / itemsPerPage === index}
            onClick={() => handleRadioClick(index)}
          />
        ))}
      </RadioButtonContainer>
    </Container>
  );
};

const Home = () => {
  return <Layout isHome={true} children={<HomeContent />} />;
};

export default Home;
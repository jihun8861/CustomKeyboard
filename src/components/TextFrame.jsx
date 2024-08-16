import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100px;
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
  font-size: 50px;
  font-weight: bold;
`;

const TextFrame = ({ children }) => {
  return (
    <Container>
      <Frame>
        {children}
      </Frame>
    </Container>
  );
};

export default TextFrame;

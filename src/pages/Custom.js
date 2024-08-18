import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useSpring, animated as a } from "@react-spring/three";
import { useSpring as useSpringCss, animated } from "@react-spring/web";

const Container = styled.div`
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
`;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: black;
`;

const HeaderFrame = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 160px;
  height: 80%;
  background-image: url("/images/logo2.png");
  background-size: 100% 100%;
  background-position: center;
  margin-right: 10px;
`;

const BarebornText = styled.div`
  width: auto;
  height: 60%;
  border-left: solid 1px #e2e2e2;
  display: flex;
  align-items: center;
  color: #666666;
  font-weight: bold;
  padding-left: 10px;
  font-size: 20px;
`;

const RightBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 100%;
`;

const RightBox = styled.div`
  width: 200px;
  height: 60%;
  border-right: solid 1px #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const ReturnIcon = styled(FaArrowRotateRight)`
  font-size: 18px;
  margin-right: 8px;
`;

const HeartIcon = styled(FaRegHeart)`
  font-size: 18px;
  margin-right: 8px;
`;

const PriceBtn = styled.button`
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  background-color: #6d8cff;
  border: none;
  cursor: pointer;
`;

const MainFrame = styled.div`
  background-color: #f1f2ed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 640px;
  position: relative;
`;

const MainSelect = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  position: absolute;
  top: 150px;
  left: 30px;
  border: solid 1px #e6e5e1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`;

const SelectText = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  z-index: 20;
`;

const ModalOverlay = styled(animated.div)`
  position: absolute;
  top: 20%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 20;
`;

const Modal = styled.div`
  width: 300px;
  height: 70px;
  background-color: white;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RotationImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const ModalText = styled.div`
  flex: 1;
`;

const ColorFrame = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const ColorBox = styled.div`
  flex: 1;
  height: 100%;
  cursor: pointer;
`;


const Model = ({
  showSwitch,
  showKeyCap,
  controlsRef,
  keycapColor,
  setKeycapColor,
}) => {
  const { scene: bareboneScene } = useGLTF("/models/barebone100.glb");
  const { scene: switchScene } = useGLTF("/models/switch100.glb");
  const { scene: keycapScene } = useGLTF("/models/key100test.glb");

  // Load the partial keycap models
  const { scene: keycap1Scene } = useGLTF("/models/100key2.glb");
  const { scene: keycap2Scene } = useGLTF("/models/100key1.glb");

  const groupRef = useRef();

  bareboneScene.scale.set(350, 350, 350);
  switchScene.scale.set(350, 350, 350);
  keycapScene.scale.set(350, 350, 350);
  keycap1Scene.scale.set(350, 350, 350);
  keycap2Scene.scale.set(350, 350, 350);

  bareboneScene.position.set(-40, 0, 0);
  switchScene.position.set(-40, 0, 0);
  keycapScene.position.set(-40, 0, 0);
  keycap1Scene.position.set(-40, 0, 0);
  keycap2Scene.position.set(-40, 0, 0);

  const switchSpring = useSpring({
    position: showSwitch ? [-40, 0, 0] : [-40, 50, 0],
    config: { mass: 0.5, tension: 40, friction: 12 },
  });

  const keycapSpring = useSpring({
    position: showKeyCap ? [-40, 0, 0] : [-40, 50, 0],
    config: { mass: 0.5, tension: 40, friction: 12 },
  });

  // Apply color to partial keycaps
  useEffect(() => {
    keycap1Scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(keycapColor);
      }
    });
  }, [keycapColor]);

  return (
    <group ref={groupRef} position={[-3, 0, 0]}>
      <primitive object={bareboneScene} />
      {showSwitch && (
        <a.primitive object={switchScene} position={switchSpring.position} />
      )}
      {showKeyCap && (
        <>
          <a.primitive object={keycap1Scene} position={keycapSpring.position} />
          <a.primitive object={keycap2Scene} position={keycapSpring.position} />
        </>
      )}
    </group>
  );
};

const CustomContent = () => {
  const location = useLocation();
  const { text } = location.state || { text: "No selection" };

  const [showSwitch, setShowSwitch] = useState(false);
  const [showKeyCap, setShowKeyCap] = useState(false);
  const controlsRef = useRef();
  const [showModal, setShowModal] = useState(true);
  const [keycapColor, setKeycapColor] = useState("white");

  const modalSpring = useSpringCss({
    opacity: showModal ? 1 : 0,
    config: { duration: 1000 },
  });

  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      setShowModal(false);
    }, 3000);

    const rotateControls = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }
    };

    rotateControls();

    return () => {
      clearTimeout(modalTimeout);
    };
  }, []);

  const handleSwitchClick = () => {
    setShowSwitch(!showSwitch);
    if (!showSwitch) {
      setShowKeyCap(false);
    }
  };

  const handleKeyCapClick = () => {
    if (showSwitch) {
      setShowKeyCap(!showKeyCap);
    } else {
      alert("먼저 스위치를 선택해주세요!");
    }
  };

  const handleColorChange = (color) => {
    setKeycapColor(color);
  };

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "black", // Black added to colors array
  ];

  return (
    <Container>
      <HeaderLine />
      <HeaderFrame>
        <Logo />
        <BarebornText>{text}</BarebornText>
        <RightBoxContainer>
          <RightBox onClick={() => window.location.reload()}>
            <ReturnIcon />
            다시 시작하기
          </RightBox>
          <PriceBtn><HeartIcon />저장하기</PriceBtn>
        </RightBoxContainer>
      </HeaderFrame>

      <Frame>
        <MainFrame>
          <MainSelect>
            <SelectText onClick={handleSwitchClick}>Switch</SelectText>
            <SelectText
              onClick={handleKeyCapClick}
              style={{ color: showSwitch ? "black" : "#ccc" }}
            >
              KeyCap
            </SelectText>
          </MainSelect>

          {showModal && (
            <ModalOverlay style={modalSpring}>
              <Modal>
                <RotationImage src="images/rotation.png" alt="Rotation Icon" />
                <ModalText>키보드를 드래그하여 360도 각도로 보기</ModalText>
              </Modal>
            </ModalOverlay>
          )}

          <Canvas
            camera={{ position: [10, 100, 100], fov: 60 }}
            style={{ width: "100%", height: "100%" }}
            shadows
          >
            <OrbitControls
              ref={controlsRef}
              target={[10, 0, 0]}
              enablePan={false}
              enableZoom={true}
              zoomSpeed={0.15}
              minDistance={110}
              maxDistance={130}
              enableRotate={true}
              rotateSpeed={0.3}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />

            <ambientLight intensity={2.0} />

            <directionalLight
              position={[30, 50, 30]}
              intensity={2.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />

            <directionalLight position={[-30, 50, -30]} intensity={2.0} />
            <directionalLight position={[0, 30, -50]} intensity={1.8} />

            <pointLight position={[0, 50, 0]} intensity={1.5} />
            <pointLight position={[-50, 50, 50]} intensity={1.5} />
            <pointLight position={[50, 50, -50]} intensity={1.5} />

            <Model
              showSwitch={showSwitch}
              showKeyCap={showKeyCap}
              controlsRef={controlsRef}
              keycapColor={keycapColor}
              setKeycapColor={setKeycapColor}
            />
          </Canvas>
        </MainFrame>
        <ColorFrame>
          {colors.map((color, index) => (
            <ColorBox
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </ColorFrame>
      </Frame>
    </Container>
  );
};

const Custom = () => {
  return (
    <Layout isHome={false} hideFooter={true} children={<CustomContent />} />
  );
};

export default Custom;
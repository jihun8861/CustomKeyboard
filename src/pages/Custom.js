import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { FaArrowRotateRight } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaRegHeart, FaCheck } from "react-icons/fa";
import { useSpring, animated as a } from "@react-spring/three";
import { useSpring as useSpringCss, animated } from "@react-spring/web";
import { useUser } from "../context/UserContext";

const Container = styled.div`
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  background-color: #f1f2ed;
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
  background-color: white;
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

const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const CheckIcon = styled(FaCheck)`
  font-size: 20px;
`;

const DotIcon = styled(GoDotFill)`
  font-size: 14px;
  color: black;
`;

const SelectText = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  z-index: 20;
  color: ${({ isSelected }) =>
    isSelected ? "#6d8cff" : "#666666"}; // 선택된 상태일 때 색상 변경
  position: relative;
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
  height: 100px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;

const ColorBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ColorModeSelect = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: absolute;
  right: 20px;
  bottom: 120px;
`;

const ModeText = styled.div`
  margin-left: 15px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "#6d8cff" : "black")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  font-size: 20px;
  font-weight: bold;
  &: hover {
    color: #6d8cff;
  }
`;

const Model = ({
  showSwitch,
  showKeyCap,
  keycapColor,
  switchColor,
  bareboneColor,
  keyboardType,
  selectedPattern,
}) => {
  const { scene: bareboneScene } = useGLTF(
    `/models/${keyboardType}keyboard/barebone${keyboardType}.glb`
  );

  const { scene: switch1Scene } = useGLTF(
    `/models/${keyboardType}keyboard/${keyboardType}switch1.glb`
  );
  const { scene: switch2Scene } = useGLTF(
    `/models/${keyboardType}keyboard/${keyboardType}switch2.glb`
  );

  // keycap1Path는 기존 로직 그대로 유지
  const keycap1Path = selectedPattern
    ? `/models/${keyboardType}keyboard/${selectedPattern}.glb`
    : `/models/${keyboardType}keyboard/${keyboardType}keycaps2.glb`;

  const { scene: keycap1Scene } = useGLTF(keycap1Path);

  // selectedPattern이 '80moonrabbit'이면 '80moonrabbit1.glb'를 로드하도록 수정
  const keycap2Path =
    selectedPattern === "80moonrabbit"
      ? `/models/${keyboardType}keyboard/80moonrabbit1.glb`
      : `/models/${keyboardType}keyboard/${keyboardType}keycaps1.glb`;

  const { scene: keycap2Scene } = useGLTF(keycap2Path);

  const groupRef = useRef();

  const positionByKeyboardType = {
    60: [-20, 0, 0],
    80: [-30, 0, 0],
    100: [-40, 0, 0],
  };

  const animationOffsetByKeyboardType = {
    60: [-20, 50, 0],
    80: [-30, 50, 0],
    100: [-40, 50, 0],
  };

  const scaleByKeyboardType = {
    60: 400,
    80: 350,
    100: 350,
  };

  // 각 모델의 스케일과 위치를 설정
  [
    bareboneScene,
    switch1Scene,
    switch2Scene,
    keycap1Scene,
    keycap2Scene,
  ].forEach((scene) => {
    const scale = scaleByKeyboardType[keyboardType] || 350;
    const position = positionByKeyboardType[keyboardType] || [-40, 0, 0];

    scene.scale.set(scale, scale, scale);
    scene.position.set(...position);
  });

  // 베어본 색상 적용
  useEffect(() => {
    bareboneScene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(bareboneColor);
      }
    });
  }, [bareboneColor]);

  // 스위치와 키캡의 애니메이션도 배열에 따라 조정
  const switchSpring = useSpring({
    position: showSwitch
      ? positionByKeyboardType[keyboardType] || [-40, 0, 0]
      : animationOffsetByKeyboardType[keyboardType] || [-40, 50, 0],
    config: { mass: 0.5, tension: 40, friction: 12 },
  });

  const keycapSpring = useSpring({
    position: showKeyCap
      ? positionByKeyboardType[keyboardType] || [-40, 0, 0]
      : animationOffsetByKeyboardType[keyboardType] || [-40, 50, 0],
    config: { mass: 0.5, tension: 40, friction: 12 },
  });

  // Apply color to partial keycaps
  useEffect(() => {
    keycap1Scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(keycapColor);
      }
    });
  }, [keycapColor, selectedPattern]);

  useEffect(() => {
    switch2Scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(switchColor);
      }
    });
  }, [switchColor]);

  return (
    <group ref={groupRef} position={[-3, 0, 0]}>
      <primitive object={bareboneScene} />
      {showSwitch && (
        <>
          <a.primitive object={switch1Scene} position={switchSpring.position} />
          <a.primitive object={switch2Scene} position={switchSpring.position} />
        </>
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
  const { userInfo } = useUser();
  const location = useLocation();

  // 전달된 키보드 데이터를 가져옵니다.
  const keyboardData = location.state || {};

  const { keyboardType, keyboardText } = location.state || {
    keyboardType: "100",
    keyboardText: "No selection",
  };

  // 전달된 데이터를 사용하여 초기 상태를 설정합니다.
  const [activeSelection, setActiveSelection] = useState("barebone");
  const [showSwitch, setShowSwitch] = useState(!!keyboardData.switchColor);
  const [showKeyCap, setShowKeyCap] = useState(!!keyboardData.keycapColor);
  const [switchColorSelected, setSwitchColorSelected] = useState(!!keyboardData.switchColor);
  const [keycapColorSelected, setKeycapColorSelected] = useState(!!keyboardData.keycapColor);
  const [bareboneColorSelected, setBareboneColorSelected] = useState(!!keyboardData.bareboneColor);
  const [colorMode, setColorMode] = useState(keyboardData.design ? "패턴" : "단색");
  const controlsRef = useRef();
  const [showModal, setShowModal] = useState(true);

  // 전달된 키보드 데이터를 사용하여 초기 색상과 패턴을 설정합니다.
  const [keycapColor, setKeycapColor] = useState(keyboardData.keycapColor || "white");
  const [switchColor, setSwitchColor] = useState(keyboardData.switchColor || "white");
  const [bareboneColor, setBareboneColor] = useState(keyboardData.bareboneColor || "white");
  const [selectedPattern, setSelectedPattern] = useState(keyboardData.design || null);

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern || "없음");
  };

  const patternImages = [
    { name: "80moonrabbit", image: "1" },
    { name: "80dosirac", image: "2" },
    { name: "80leaf", image: "3" },
  ];

  const email = userInfo?.email || "";

  const handleSave = async () => {
    const currentTime = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTime = new Date(currentTime.getTime() + kstOffset);
    const saveTime = kstTime.toISOString().replace("T", " ").split(".")[0];

    const saveData = {
      email,
      savetime: saveTime, // 소문자로 변경
      barebonecolor: bareboneColor, // 소문자로 변경
      keyboardtype: keyboardType, // 소문자로 변경
      keycapcolor: keycapColor, // 소문자로 변경
      design: selectedPattern || "없음", // 패턴이 없으면 "없음"으로 설정
      switchcolor: switchColor, // 소문자로 변경
    };

    try {
      const response = await axios.post(
        "https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/items/save",
        saveData
      );
      console.log("Save successful:", response.data);
      alert("저장이 완료되었습니다!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

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
    setShowSwitch(true);
    setShowKeyCap(false);
    setActiveSelection("switch");
  };

  const handleKeyCapClick = () => {
    if (showSwitch) {
      setShowKeyCap(true);
      setActiveSelection("keycap");
    } else {
      alert("먼저 스위치를 선택해주세요!");
    }
  };

  const handleBareboneClick = () => {
    setActiveSelection("barebone");
    setShowSwitch(false);
    setShowKeyCap(false);
  };

  const handleKeycapColorChange = (color) => {
    setKeycapColor(color);
    setKeycapColorSelected(true);
  };

  const handleSwitchColorChange = (color) => {
    setSwitchColor(color);
    setSwitchColorSelected(true);
  };

  const handleBareboneColorChange = (color) => {
    setBareboneColor(color);
    setBareboneColorSelected(true); // 베어본 색상 선택 상태 설정
  };

  const handleColorModeChange = (mode) => {
    setColorMode(mode); // 색상 모드 상태 변경
  };

  const switchColors = ["red", "blue", "green", "yellow", "purple"];

  const keycapColors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "black",
  ];

  const bareboneColors = ["gray", "silver", "black", "white", "gold"];

  return (
    <Container>
      <HeaderLine />
      <HeaderFrame>
        <Logo />
        <BarebornText>{keyboardText}</BarebornText>
        <RightBoxContainer>
          <RightBox onClick={() => window.location.reload()}>
            <ReturnIcon />
            다시 시작하기
          </RightBox>
          <PriceBtn onClick={handleSave}>
            <HeartIcon />
            저장하기
          </PriceBtn>
        </RightBoxContainer>
      </HeaderFrame>

      <Frame>
        <MainFrame>
          <MainSelect>
            <SelectText
              onClick={handleBareboneClick}
              isSelected={activeSelection === "barebone"}
              style={{
                color: activeSelection === "barebone" ? "#6d8cff" : "black",
              }}
            >
              Barebone
              <IconWrapper>
                {bareboneColorSelected ? <CheckIcon /> : <DotIcon />}
              </IconWrapper>
            </SelectText>
            <SelectText
              onClick={handleSwitchClick}
              isSelected={activeSelection === "switch"}
              style={{
                color: activeSelection === "switch" ? "#6d8cff" : "black",
              }}
            >
              Switch
              <IconWrapper>
                {switchColorSelected ? <CheckIcon /> : <DotIcon />}
              </IconWrapper>
            </SelectText>

            <SelectText
              onClick={handleKeyCapClick}
              isSelected={activeSelection === "keycap"}
              style={{
                color:
                  activeSelection === "keycap"
                    ? "#6d8cff"
                    : showSwitch
                    ? "black"
                    : "#ccc",
              }}
            >
              KeyCap
              <IconWrapper>
                {keycapColorSelected ? <CheckIcon /> : <DotIcon />}
              </IconWrapper>
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

            {/* Adjusted ambient light */}
            <ambientLight intensity={1.0} />

            {/* Adjusted directional lights */}
            <directionalLight
              position={[30, 50, 30]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />

            <directionalLight position={[-30, 50, -30]} intensity={1.2} />
            <directionalLight position={[0, 30, -50]} intensity={1.0} />

            {/* Reduced intensity of point lights */}
            <pointLight position={[0, 50, 0]} intensity={1.0} />
            <pointLight position={[-50, 50, 50]} intensity={1.0} />
            <pointLight position={[50, 50, -50]} intensity={1.0} />

            <Model
              showSwitch={showSwitch}
              showKeyCap={showKeyCap}
              controlsRef={controlsRef}
              keycapColor={keycapColor}
              switchColor={switchColor}
              bareboneColor={bareboneColor}
              keyboardType={keyboardType}
              selectedPattern={selectedPattern} // Pass selectedPattern
            />
          </Canvas>
        </MainFrame>

        {/* 80% 배열 키보드일 때만 "단색", "패턴" 옵션을 표시 */}
        {keyboardType === "80" && activeSelection === "keycap" && (
          <ColorModeSelect>
            {["단색", "패턴"].map((mode) => (
              <ModeText
                key={mode}
                isSelected={colorMode === mode}
                onClick={() => handleColorModeChange(mode)}
              >
                {mode}
              </ModeText>
            ))}
          </ColorModeSelect>
        )}

        {/* 조건부로 ColorFrame을 렌더링 */}
        {activeSelection === "barebone" && (
          <ColorFrame>
            {bareboneColors.map((color, index) => (
              <ColorBox
                key={index}
                style={{ backgroundColor: color }}
                onClick={() => handleBareboneColorChange(color)}
              />
            ))}
          </ColorFrame>
        )}

        {activeSelection === "switch" && (
          <ColorFrame>
            {switchColors.map((color, index) => (
              <ColorBox
                key={index}
                style={{ backgroundColor: color }}
                onClick={() => handleSwitchColorChange(color)}
              />
            ))}
          </ColorFrame>
        )}

        {activeSelection === "keycap" && (
          <ColorFrame>
            {colorMode === "단색" &&
              keycapColors.map((color, index) => (
                <ColorBox
                  key={index}
                  style={{ backgroundColor: color }}
                  onClick={() => handleKeycapColorChange(color)}
                />
              ))}

            {colorMode === "패턴" &&
              patternImages.map((pattern, index) => (
                <ColorBox
                  key={index}
                  style={{
                    backgroundImage: `url(/images/${pattern.image}.png)`,
                    backgroundSize: "100% 100%",
                    width: "120px",
                    margin: "0 20px",
                  }}
                  onClick={() => handlePatternClick(pattern.name)}
                />
              ))}
          </ColorFrame>
        )}
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
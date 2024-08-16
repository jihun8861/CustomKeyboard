import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IoMdClose } from "react-icons/io";
import {  ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";
import { useUser } from '../context/UserContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Frame = styled.div`
  width: 50%;
  height: 860px;
  border: solid 1px #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrameBox = styled.div`
  width: 75%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserIcon = styled.img`
  width: 180px;
  height: 180px;
`;

const Main = styled.div`
  width: 100%;
  height: 480px;
`;

const InfoFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const InfoTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const SocialIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const InfoText = styled.div`
  color: #656565;
  font-size: 18px;
`;

const Line = styled.hr`
  width: 100%;
  margin-top: 12px;
  border: solid 1px #eeeeee;
`;

const WithdrawalFrame = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const WithdrawalText = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ModalContent = styled.div`
  width: 720px;
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalHeader = styled.div`
  font-size: 26px;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: center;
  padding: 35px 0;
  font-weight: bold;
  position: relative;
  border-bottom: 1px solid #eeeeee;
`;

const CloseIcon = styled(IoMdClose)`
  font-size: 36px;
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
`;

const ModalMain = styled.div`
  width: 100%;
  height: 600px;
  padding: 25px 35px 0 35px;

  ul {
    list-style-type: none;
  }
`;

const MainTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #6d8cff;
  margin: 25px 0 25px 0;
`;

const MainExplain = styled.li`
  color: #646464;
  margin: 12px 0;
`;

const Dropdown = styled.select`
  width: 100%;
  height: 55px;
  font-size: 18px;
  padding: 12px;
  margin: 30px 0 30px 0;
  border: solid 1.5px #ededed;
  border-radius: 4px;

  &:focus {
    outline: none;
    border: solid 1.5px;
  }
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 110px;
  font-size: 18px;
  padding: 12px;
  margin-bottom: 25px;
  border: solid 1.5px #ededed;
  border-radius: 4px;
  resize: none;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;

  &:focus {
    outline: none;
    border: solid 1.5px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  margin-right: 30px;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin: 10px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: ${(props) => (props.checked ? "#6d8cff" : "transparent")};
`;

const CheckIcon = styled(FaCheck)`
  font-size: 12px;
  color: white;
`;

const LabelText = styled.div`
  margin-left: 4px;
`;

const ModalFooter = styled.button`
  width: 100%;
  height: 90px;
  background-color: #6d8cff;
  color: white;
  font-size: 26px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const MyInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { userInfo } = useUser();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const handleWithdrawal = () => {
    if (!selectedReason) {
      toast.error("탈퇴 사유를 선택해주세요.");
      return;
    }

    if (!isChecked) {
      toast.error("안내사항에 동의해주세요.");
      return;
    }

    toast.success("탈퇴가 완료되었습니다.");
    // 실제 회원 탈퇴 처리를 여기서 실행
  };

  return (
    <Container>
      <Frame>
        <FrameBox>
          <Header>
            <UserIcon src="/images/user.svg" alt="User Icon" />
          </Header>
          <Main>
            <InfoFrame>
              <InfoTitle>연결된 소셜계정</InfoTitle>
              <SocialIcon />
            </InfoFrame>

            <InfoFrame>
              <InfoTitle>이름</InfoTitle>
              <InfoBox>
                <InfoText>{userInfo ? userInfo.name : "Loading..."}</InfoText>
              </InfoBox>
            </InfoFrame>

            <InfoFrame>
              <InfoTitle>Email</InfoTitle>
              <InfoBox>
                <InfoText>{userInfo ? userInfo.email : "Loading..."}</InfoText>
              </InfoBox>
            </InfoFrame>

            <Line />

            <WithdrawalFrame>
              <WithdrawalText onClick={openModal}>회원탈퇴</WithdrawalText>
            </WithdrawalFrame>
          </Main>
        </FrameBox>
      </Frame>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent isClosing={isClosing}>
            <ModalHeader>
              회원탈퇴
              <CloseIcon onClick={closeModal} />
            </ModalHeader>

            <ModalMain>
              <MainTitle>
                회원탈퇴를 신청하기 전에 아래 안내 사항을 한번 더 확인해주세요.
              </MainTitle>
              <ul>
                <MainExplain>
                  1. 회원 탈퇴 시, 현재 로그인된 아이디는 즉시 탈퇴 처리됩니다.
                </MainExplain>
                <MainExplain>
                  2. 회원 탈퇴 시, 회원 전용 웹 서비스 이용이 불가합니다.
                </MainExplain>
                <MainExplain>
                  3. 탈퇴 시 회원 정보 및 저장 목록이 모두 삭제 됩니다.
                </MainExplain>
                <MainExplain>
                  4. 회원 정보 및 서비스 이용 기록은 모두 삭제되며, 삭제된
                  데이터는 복구되지 않습니다.
                </MainExplain>
              </ul>

              <Dropdown
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                <option value="">탈퇴 사유를 선택해주세요</option>
                <option value="noLongerUse">더 이상 이용하지 않음</option>
                <option value="noInfo">프론트가 디자인을 못해서</option>
                <option value="inconvenient">사용하기 불편해서</option>
              </Dropdown>

              <TextBox
                placeholder="다른 사유가 있다면 입력해주세요."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />

              <CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <CustomCheckbox checked={isChecked}>
                  {isChecked && <CheckIcon />}
                </CustomCheckbox>
                <LabelText>안내사항을 모두 확인하였으며, 이에 동의합니다</LabelText>
              </CheckboxLabel>
            </ModalMain>

            <ModalFooter onClick={handleWithdrawal}>탈퇴 완료</ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MyInfo;
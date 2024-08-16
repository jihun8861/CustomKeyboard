import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { FaArrowUp } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { FiSend } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/images/banner.png");
  background-size: 100% 100%;
  background-position: center;
`;

const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const TopArrow = styled.div`
  position: fixed;
  border: solid 1px;
  width: 50px;
  height: 50px;
  right: 20px;
  bottom: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  &:hover {
    background: #6d8cff;
    color: white;
    border: none;
  }
`;

const TopArrowIcon = styled(FaArrowUp)`
  font-size: 16px;
`;

const ChatAi = styled.div`
  position: fixed;
  border: solid 1px;
  width: 50px;
  height: 50px;
  right: 20px;
  bottom: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  &:hover {
    background: #6d8cff;
    color: white;
    border: none;
  }
`;

const ChatAiIcon = styled(AiOutlineMessage)`
  font-size: 28px;
`;

const CloseIcon = styled(TbArrowsDiagonalMinimize2)`
  font-size: 28px;
`;

const ChatModal = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 420px;
  height: 600px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 4px;
  z-index: 101;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 23px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Logo 스타일링
const Logo = styled.img`
  display: flex;
  width: 25%;
  height: 60%;
  margin-right: 10px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 8px 8px;
  padding: 12px;
  background-color: ${(props) => (props.isUser ? "#6d8cff" : "#f2f3f5")};
  color: ${(props) => (props.isUser ? "white" : "black")};  // 변경된 부분
  font-size: 17px;
  border-radius: 12px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 95%;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
`;

const ChatInput = styled.input`
  padding-left: 8px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  border-top: 1px solid #ccc;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled(FiSend)`
  font-size: 22px;
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  right: 10px;
`;

const Layout = ({ isHome, children, hideFooter  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const chatIconClick = () => {
    setIsModalOpen(true);
    setMessages([
      { 
        text: (
          <>
            안녕하세요.<br/>
            키보드 고민을 도와드리는 Tabs 챗봇이에요.<br/><br/>
            무엇을 도와드릴까요? <br/><br/>원하는 시는 키보드 스타일을 채팅으로 물어보세요!
          </>
        ), 
        isUser: false 
      }
    ]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessages([]); // 메시지 초기화
  };

  const handleMessageSend = async () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [...messages, { text: inputMessage, isUser: true }];
    setMessages(newMessages);

    try {
        const response = await axios.post(
            "https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/ai/generate",
            { 
                message: inputMessage 
            }
        );

        let botResponse = response.data.generation.output.content;

        // 줄바꿈 처리를 위해 <br/> 태그를 실제 줄바꿈으로 변경
        botResponse = botResponse
            .replace(/\*\*/g, "")            // ** 제거
            .replace(/###/g, "")             // ### 제거
            .replace(/<br\/>/g, "\n");       // <br/> 태그를 실제 줄바꿈으로 변경

        console.log("Server response:", botResponse);

        // 응답을 줄바꿈 기준으로 나누어 JSX 요소로 변환
        const formattedResponse = botResponse.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));

        setMessages([...newMessages, { text: formattedResponse, isUser: false }]);
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages([...newMessages, { text: "Error: Could not send message", isUser: false }]);
    }

    setInputMessage("");
};

 

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Container>
        {isHome && <BannerContainer />}
        <Header isHome={isHome} />
        <Main>
          {children}
          <TopArrow onClick={scrollToTop}>
            <TopArrowIcon />
          </TopArrow>
          <ChatAi onClick={isModalOpen ? closeModal : chatIconClick}>
            {isModalOpen ? <CloseIcon /> : <ChatAiIcon />}
          </ChatAi>
          {isModalOpen && (
            <ChatModal>
              <ModalHeader>
                <Logo src="images/logo.png" /> <p>챗봇</p>
              </ModalHeader>
              <MessagesContainer>
                {messages.map((message, index) => (
                  <Message key={index} isUser={message.isUser}>
                    {message.text}
                  </Message>
                ))}
                <div ref={messagesEndRef} />
              </MessagesContainer>
              <InputContainer>
                <ChatInput
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="편하게 물어보세요!"
                  onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
                />
                <SendButton onClick={handleMessageSend}>Send</SendButton>
              </InputContainer>
            </ChatModal>
          )}
        </Main>
        {!hideFooter && <Footer />}
      </Container>
    </>
  );
};

export default Layout;

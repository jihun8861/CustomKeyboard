import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { RiUserLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Container = styled.div`
  width: 100%;
  height: 100px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: top 0.5s ease-in-out, background-color 0.3s ease-in-out,
    border-bottom 0.3s ease-in-out;
  background-color: ${(props) => (props.atTop ? "transparent" : "white")};
  border-bottom: ${(props) => (props.isHome ? "none" : "1px solid #e8e8e8")};
`;

const Frame = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Section2 = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  margin-left: 20px;
`;

const Section1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 5px;
  color: ${(props) => (props.atTop ? "white" : "black")};
`;

const HeartIcon = styled(FaRegHeart)`
  font-size: 22px;
  cursor: pointer;
  color: ${(props) => (props.atTop ? "white" : "black")};
  margin: 10px 10px;
`;

const MenuIcon = styled(RxHamburgerMenu)`
  font-size: 28px;
  cursor: pointer;
  color: ${(props) => (props.atTop ? "white" : "black")};
  margin: 10px 10px;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
  img {
    width: 100%;
  }
`;

const UserIcon = styled(RiUserLine)`
  font-size: 25px;
  cursor: pointer;
  color: ${(props) => (props.atTop ? "white" : "black")};
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 99;
`;

const RightMenuModal = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 20px;
  animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.3s forwards;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  height: 60px;
  border: solid 1px;
`;

const CloseIcon = styled(IoCloseOutline)`
  font-size: 36px;
  cursor: pointer;
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: solid 1px;
  position: relative;
`;

const ModalLogo = styled.div`
  width: 100%;
  height: 100px;
  img {
    width: 25%;
    height: 30%;
  }
  position: absolute;
  top: 200px;
`;

const MainText = styled.div`
  position: absolute;
  top: 240px;
  font-size: 27px;
  font-weight: bold;
`;

const MainText2 = styled.div`
  position: absolute;
  top: 280px;
  font-size: 27px;
  font-weight: bold;
`;

const ModalFooter = styled.div`
  height: 100px;
  padding-right: 180px;
  border: solid 1px;
  display: flex;
  align-items: center;
`;

const FooterText = styled.div`
  height: 24px;
  font-size: 14px;
  color: #1a1a1a;
`;

const LinkStyle = (atTop) => ({
  textDecoration: "none",
  color: atTop ? "white" : "black",
});

const LinkStyle2 = {
  textDecoration: "none",
  color: "black",
};

const Header = ({ isHome }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(isHome);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setAtTop(false);
    }
  }, [isHome, lastScrollY]);

  const handleScroll = () => {
    if (!isHome) return;
    const currentScrollY = window.scrollY;
    setAtTop(currentScrollY === 0);
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHidden(true);
    } else if (currentScrollY < lastScrollY) {
      setHidden(false);
    }
    setLastScrollY(currentScrollY);
  };

  const handleUserIconClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/mypage");
    }
  };

  const handleHeartIconClick = () => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate("/mypage/wishlist");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate("/signin");
    }
  };

  const handleSignupClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/signup");
    }
  };

  const handleMyPageClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/signin");
    }
  };
  

  const handleCustomClick = () => {
    if (isLoggedIn) {
      navigate("/customselect");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Container hidden={hidden} atTop={atTop} isHome={isHome}>
      <Frame>
        <Section2>
          <Logo>
            <a href="/" style={LinkStyle(atTop)}>
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </Logo>
        </Section2>

        <Spacer />

        <Section1 atTop={atTop}>
          <h4 style={{ cursor: "pointer" }} onClick={handleCustomClick}>
            Custom
          </h4>
        </Section1>

        <Section1
          onClick={handleHeartIconClick}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <HeartIcon atTop={atTop} />
        </Section1>

        <Section1
          onClick={handleUserIconClick}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <UserIcon atTop={atTop} />
        </Section1>

        <Section1>
          <MenuIcon atTop={atTop} onClick={handleModalOpen} />
        </Section1>
      </Frame>

      {isModalOpen && (
        <>
          <Overlay onClick={handleModalClose} />
          <RightMenuModal isClosing={isClosing}>
            <ModalHeader>
              <CloseIcon onClick={handleModalClose} />
            </ModalHeader>

            <ModalMain>
              <ModalLogo>
                <a href="/">
                  <img src="/images/logo.png" alt="Logo" />
                </a>
              </ModalLogo>

              <MainText>
                <a href="/Contact" style={LinkStyle2}>
                  <p>Contact</p>
                </a>
              </MainText>

              {/* My Page Link */}
              <MainText2 onClick={handleMyPageClick}>
                <p style={{ cursor: "pointer", color: "black" }}>My Page</p>
              </MainText2>
              
            </ModalMain>

            <ModalFooter>
              <FooterText
                onClick={handleLoginClick}
                style={{ cursor: "pointer" }}
              >
                {isLoggedIn ? "로그아웃" : "로그인"}
              </FooterText>

              <span
                style={{
                  color: "#bbbbbb",
                  margin: "0 5px 5px 5px",
                }}
              >
                ·
              </span>

              <FooterText
                onClick={handleSignupClick}
                style={{ cursor: "pointer" }}
              >
                {isLoggedIn ? "" : "회원가입"}
              </FooterText>
            </ModalFooter>
          </RightMenuModal>
        </>
      )}
    </Container>
  );
};

export default Header;
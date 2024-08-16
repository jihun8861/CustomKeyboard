import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Container = styled.div`
  width: 1500px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SignInFrame = styled.div`
  width: 450px;
  height: 700px;
  margin-top: 80px;
`;

const TitleText = styled.div`
  width: 100%;
  height: 20%;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  width: auto;
  height: auto;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  height: 50px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: solid 1px #dadada;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const EyeIcon = styled(FaEye)`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 12px;
`;

const EyeIcon2 = styled(FaEyeSlash)`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 12px;
`;

const New = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 45px;
  margin-bottom: 20px;
`;

const SignInBtn = styled.button`
  width: 100%;
  height: 55px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.04em;
  background: #6d8cff;
  border: solid 1px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  margin-bottom: 40px;

  &:hover {
    background: white;
    color: #6d8cff;
    border-color: #6d8cff;
  }

  &:disabled {
    background-color: #dadada;
    color: white;
    cursor: not-allowed;
    border: none;
  }
`;

const Bottom = styled.div`
  font-size: 16px;
  border-top: 1px solid #eee;
  position: relative;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h4 {
    position: absolute;
    left: 50%;
    top: -13px;
    width: 68px;
    height: 16px;
    background: #fff;
    display: inline-block;
    transform: translateX(-50%);
  }
`;

const Kakao = styled.button`
  width: 100%;
  height: 55px;
  background-color: #fee500;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(239, 218, 77);
  }
`;

// 카카오 버튼 내부 컨텐츠를 감싸는 div 요소
const KakaoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkStyle = {
  textDecoration: "none",
  marginLeft: "7px",
  color: "#6d8cff",
};

const SignInContent = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [notAllow, setNotAllow] = useState(true);
  const [pwType, setPwType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const REST_API_KEY = `9b8440c52cc5a7dd32647c76aade83d3`;
  const REDIRECT_URI = `http://localhost:3000/KakaoRedirect`;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
    updateButtonState(e.target.value, pw);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
    updateButtonState(id, e.target.value);
  };

  const handleEyeClick = () => {
    setPwType(pwType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };

  const onClickConfirmButton = async () => {
    try {
      const response = await axios.post(
        "https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/login",
        {
          email: id,
          password: pw,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      alert("회원 정보가 일치하지 않습니다.");
    }
  };

  const updateButtonState = (newId, newPw) => {
    setNotAllow(!(newId.length >= 1 && newPw.length >= 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !notAllow) {
      onClickConfirmButton();
    }
  };

  return (
    <Container>
      <SignInFrame>
        <TitleText>로그인</TitleText>
        <Text>Email</Text>
        <InputBox>
          <Input
            type="text"
            placeholder="이메일을 입력해주세요"
            value={id}
            onChange={handleIdChange}
            onKeyDown={handleKeyDown}
          />
        </InputBox>

        <Text>Password</Text>
        <InputBox>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="암호를 입력해주세요"
            value={pw}
            onChange={handlePwChange}
            onKeyDown={handleKeyDown}
          />
          {showPassword ? (
            <EyeIcon onClick={handleEyeClick} />
          ) : (
            <EyeIcon2 onClick={handleEyeClick} />
          )}
        </InputBox>

        <New>
          <span>신규 사용자이신가요?</span>
          <a href="/SignUp" style={LinkStyle}>
            계정만들기
          </a>
        </New>

        <SignInBtn onClick={onClickConfirmButton} disabled={notAllow}>
          <span>로그인</span>
        </SignInBtn>

        <Bottom>
          <h4>또는</h4>
          <Kakao onClick={loginHandler}>
            <KakaoContent>
              <RiKakaoTalkFill
                style={{ width: "6%", height: "6%", marginRight: "10px" }}
              ></RiKakaoTalkFill>
              카카오톡으로 로그인
            </KakaoContent>
          </Kakao>
        </Bottom>
      </SignInFrame>
    </Container>
  );
};

const SignIn = () => {
  return <Layout isHome={false} children={<SignInContent />} />;
};

export default SignIn;
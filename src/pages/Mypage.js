import React, { useEffect } from "react";
import styled from "styled-components";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import MyInfo from "../components/MyInfo";
import WishList from "../components/WishList";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px 0 100px 0;
`;

const Frame = styled.div`
  width: 85%;
  height: auto;
`;

const HeaderListFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  border-bottom: solid 3px #f9f9f9;
`;

const HeaderList = styled.div`
  width: 230px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#6d8cff" : "black")};
  border-bottom: ${(props) => (props.active ? "solid 3px #6d8cff" : "none")};
  transition: border-bottom 0.3s ease, color 0.3s ease;
  margin-bottom: -3px;

  &:hover {
    color: #6d8cff;
  }
`;

const MypageContent = () => {
  const { userInfo, setUserInfo } = useUser();
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/findbodybytoken",
            {
              token: token,
            }
          );
          setUserInfo(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  return (
    <Container>
      <Frame>
        <HeaderListFrame>
          <Link to="/mypage/myinfo" style={{ textDecoration: 'none' }}>
            <HeaderList active={location.pathname === "/mypage/myinfo"}>
              <h2>내 정보</h2>
            </HeaderList>
          </Link>
          <Link to="/mypage/wishlist" style={{ textDecoration: 'none' }}>
            <HeaderList active={location.pathname === "/mypage/wishlist"}>
              <h2>저장 목록</h2>
            </HeaderList>
          </Link>
        </HeaderListFrame>
        
        <Routes>
          <Route path="/" element={<Navigate to="/mypage/myinfo" />} />
          <Route path="myinfo" element={<MyInfo />} />
          <Route path="wishlist" element={<WishList />} />
        </Routes>
      </Frame>
    </Container>
  );
};

const Mypage = () => {
  return <Layout isHome={false} children={<MypageContent />} />;
};

export default Mypage;

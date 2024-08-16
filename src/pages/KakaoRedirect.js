import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        if (!code) {
          setError("인증 코드가 없습니다. 다시 시도해주세요.");
          setLoading(false);
          return;
        }

        console.log("인증 코드:", code);
        const response = await axios.post(
          "https://port-0-edcustom-lxx5p8dd0617fae9.sel5.cloudtype.app/social/kakao/login",
          {
            "code": code
          }
        );

        console.log("백엔드 응답:", response.data);

        const { token, account } = response.data;
        localStorage.setItem("token", token);

        // 로그인 성공 확인 로그
        console.log("로그인 성공:", { token, account });

        setLoading(false);
        navigate("/");
      } catch (error) {
        console.error(
          "Kakao login failed:",
          error.response ? error.response.data : error.message
        );
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
        setLoading(false);
      }
    };

    kakaoLogin();
  }, [code, navigate]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return null;
};

export default KakaoRedirect;

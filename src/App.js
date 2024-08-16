import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import KakaoRedirect from "./pages/KakaoRedirect";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CustomSelect from "./pages/CustomSelect";
import Custom from "./pages/Custom";
import Mypage from "./pages/Mypage";
import Purchase from "./pages/Purchase";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { UserProvider } from './context/UserContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/KakaoRedirect" element={<KakaoRedirect />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CustomSelect" element={<CustomSelect />} />
          <Route path="/Custom" element={<Custom />} />
          <Route path="/Mypage/*" element={<Mypage />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>

        <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={true}  // 진행 게이지 숨기기
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
        theme="colored"
        style={{width:"550px", height:"200px", fontWeight:"bold", fontSize:"19px"}}
      />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

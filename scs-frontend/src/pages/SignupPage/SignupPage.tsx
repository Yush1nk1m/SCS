import React, { useState } from "react";
import "./SignupPage.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignupSuccess = (nickname: string) => {
    setNickname(nickname);
    setSignupSuccess(true);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      {!signupSuccess ? (
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      ) : (
        <div className="welcome-content">
          <div className="text-line line1">{nickname}님, 환영합니다!</div>
          <div className="text-line line2">
            로그인하여 더 많은 기능에 접근하고, 커뮤니티에 기여해 보세요.
          </div>
          <div className="text-line line3">가입해 주셔서 감사합니다.</div>
          <button className="login-button" onClick={handleLoginRedirect}>
            로그인 페이지로 이동
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;

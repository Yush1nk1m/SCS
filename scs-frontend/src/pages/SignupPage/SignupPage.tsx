import React from "react";
import "./SignupPage.css";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage: React.FC = () => {
  const handleSignupSuccess = () => {
    // 회원가입 성공 후 처리
    console.log("회원가입 성공");
  };

  return (
    <div className="signup-container">
      <SignupForm onSignupSuccess={handleSignupSuccess} />
    </div>
  );
};

export default SignupPage;

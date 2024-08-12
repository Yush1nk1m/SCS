import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

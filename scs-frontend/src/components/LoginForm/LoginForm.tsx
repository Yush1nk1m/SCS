import React, { useState } from "react";
import { LoginData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        required
      />
      <button type="submit" className="submit-button">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;

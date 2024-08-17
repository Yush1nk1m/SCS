import React, { useState } from "react";
import { LoginData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import "./LoginForm.css";
import toast from "react-hot-toast";

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
      toast.success("로그인 성공!");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      switch (error.status) {
        case 403:
          toast.error("이메일과 비밀번호를 확인해 주세요.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
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

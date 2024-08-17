import { sendVerificationCode, signup, verifyCode } from "../../api/authApi";
import React, { useState } from "react";
import "./SignupForm.css";

interface SignupFormProps {
  onSignupSuccess: (nickname: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    affiliation: "",
    position: "",
    verificationCode: "",
  });
  const [showVerification, setShowVerification] = useState(false);

  const handleSendVerification = async () => {
    try {
      await sendVerificationCode(info.email);
      setShowVerification(true);
      alert("인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증 코드 전송 실패");
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode(info.email, info.verificationCode);
      alert("인증 성공");
    } catch (error) {
      console.error(error);
      alert("인증 실패");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(info);
      alert("회원가입 성공");
      onSignupSuccess(response.user.nickname);
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <div className="input-container">
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            required
          />
          <button
            type="button"
            className="verify-button"
            onClick={handleSendVerification}
          >
            인증
          </button>
        </div>
        {showVerification && (
          <>
            <div className="input-group">
              <input
                type="text"
                placeholder="인증 코드"
                value={info.verificationCode}
                onChange={(e) =>
                  setInfo({ ...info, verificationCode: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="verify-button"
                onClick={handleVerifyCode}
              >
                확인
              </button>
            </div>
          </>
        )}
        <input
          className="single-input"
          type="password"
          placeholder="비밀번호"
          value={info.password}
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
          required
        />
        <input
          className="single-input"
          type="text"
          placeholder="닉네임"
          value={info.nickname}
          onChange={(e) => setInfo({ ...info, nickname: e.target.value })}
          required
        />
        <input
          className="single-input"
          type="text"
          placeholder="소속"
          value={info.affiliation}
          onChange={(e) => setInfo({ ...info, affiliation: e.target.value })}
          required
        />
        <input
          className="single-input"
          type="text"
          placeholder="포지션"
          value={info.position}
          onChange={(e) => setInfo({ ...info, position: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        가입하기
      </button>
    </form>
  );
};

export default SignupForm;

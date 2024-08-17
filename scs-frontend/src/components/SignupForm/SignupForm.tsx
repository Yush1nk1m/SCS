import { sendVerificationCode, signup, verifyCode } from "../../api/authApi";
import React, { useState } from "react";
import "./SignupForm.css";
import toast from "react-hot-toast";

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
  const [verified, setVerified] = useState(false);

  const handleSendVerification = async () => {
    const loadingToast = toast.loading("인증 코드 전송 중 ...");

    try {
      await sendVerificationCode(info.email);
      setShowVerification(true);
      toast.success("인증 코드 전송 성공!", { id: loadingToast });
    } catch (error: any) {
      console.error(error);
      switch (error.status) {
        case 409:
          toast.error("이미 존재하는 이메일입니다.", { id: loadingToast });
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.", { id: loadingToast });
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode(info.email, info.verificationCode);
      setVerified(true);
      toast.success("인증 코드 검증 성공!");
    } catch (error: any) {
      console.error(error);
      switch (error.status) {
        case 400:
          toast.error("인증 코드가 일치하지 않습니다.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(info);
      toast.success("회원가입 성공!");
      onSignupSuccess(response.user.nickname);
    } catch (error: any) {
      console.error(error);
      switch (error.status) {
        case 401:
          toast.error("이메일을 인증해 주세요.");
          break;
        default:
          toast.error("예기치 못한 에러가 발생했습니다.");
      }
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
            disabled={showVerification}
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            required
          />
          <button
            type="button"
            className="verify-button"
            disabled={showVerification}
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
                disabled={verified}
                onChange={(e) =>
                  setInfo({ ...info, verificationCode: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="verify-button"
                disabled={verified}
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
          minLength={8}
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

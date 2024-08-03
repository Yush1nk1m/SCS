import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { signup, sendVerificationCode, verifyCode } from '../api/api';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const SignupForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0px 0;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  color: white;
  background: linear-gradient(135deg, #3a8dff, #6a70ff);
  background-size: 200% 200%;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  font-size: 1rem;
  margin-left: 10px;

  &:hover {
    animation: ${gradientAnimation} 4s ease infinite;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &.verified {
    background-color: grey;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  color: #6a70ff;
  margin-top: 10px;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
  margin-top: 0px;
`;

const VerificationInput = styled(Input)`
  margin: 0;
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  animation: ${props => (props.fadeOut ? fadeOut : fadeIn)} 1s ease-in-out;
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [position, setPosition] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (signupSuccess) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/login'); // 로그인 페이지로 이동
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [signupSuccess, navigate]);

  const handleSendVerification = async () => {
    try {
      await sendVerificationCode(email);
      setVerificationSent(true);
    } catch (error) {
      console.error('Failed to send verification code', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode(email, verificationCode);
      setIsVerified(true);
    } catch (error) {
      console.error('Failed to verify code', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please verify your email before signing up.');
      return;
    }
    try {
      await signup({ email, password, nickname, affiliation, position, verificationCode });
      setSignupSuccess(true);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  if (signupSuccess) {
    return (
      <Message fadeOut={countdown === 0}>
        {nickname}님, 환영합니다!
        <br />
        이제 {countdown}초 뒤 로그인 페이지로 자동 이동합니다.
      </Message>
    );
  }

  return (
    <SignupForm onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <InputContainer>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isVerified && (
          <Button type="button" onClick={handleSendVerification}>
            {verificationSent ? 'Resend' : 'Verify'}
          </Button>
        )}
      </InputContainer>
      {verificationSent && (
        <VerificationContainer>
          <VerificationInput
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isVerified}
          />
          <Button
            type="button"
            onClick={handleVerifyCode}
            disabled={isVerified}
            className={isVerified ? 'verified' : ''}
          >
            {isVerified ? 'Verified' : 'Submit'}
          </Button>
        </VerificationContainer>
      )}
      <InputContainer>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Affiliation"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </InputContainer>
      <Button type="submit">Sign Up</Button>
      <Link href="/login">Already have an account? Login here</Link>
    </SignupForm>
  );
};

export default Signup;

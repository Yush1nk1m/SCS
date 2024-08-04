import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { sendVerificationCode, verifyCode, signup } from '../api/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Signup = ({ setCurrentForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [position, setPosition] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

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
      setCurrentForm('login'); // 회원 가입 후 로그인 폼으로 이동
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <SignupForm onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <InputContainer>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isVerified && (
          <Button type="button" onClick={handleSendVerification}>
            {verificationSent ? 'Resend' : 'Send Code'}
          </Button>
        )}
      </InputContainer>
      {verificationSent && (
        <VerificationContainer>
          <Label>Verification Code</Label>
          <VerificationInput
            type="text"
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
            {isVerified ? 'Verified' : 'Verify'}
          </Button>
        </VerificationContainer>
      )}
      <InputContainer>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Nickname</Label>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Affiliation</Label>
        <Input
          type="text"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Position</Label>
        <Input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </InputContainer>
      <Button type="submit">Sign Up</Button>
      <Link href="#" onClick={() => setCurrentForm('login')}>Already have an account? Login here</Link>
    </SignupForm>
  );
};

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
  margin: 10px 0;
`;

const Label = styled.label`
  flex: 1;
  font-size: 1rem;
  margin-right: 10px;
  text-align: left;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  color: white;
  background: radial-gradient(#ff8a00, #e52e71);
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
  animation: fadeIn 0.5s ease-in-out;
  margin-top: 0px;
`;

const VerificationInput = styled(Input)`
  margin: 0;
`;

export default Signup;

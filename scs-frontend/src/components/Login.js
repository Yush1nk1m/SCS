import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { login } from '../api/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Login = ({ setAuth, setCurrentForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setAuth(true);
      setCurrentForm('home'); // 로그인 후 홈 화면으로 이동
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <InputContainer>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <Button type="submit">Login</Button>
      <Link href="#" onClick={() => setCurrentForm('signup')}>Don't have an account? Sign up here</Link>
      <Link href="#" onClick={() => alert('ID/PW 찾기 기능 구현 필요')}>Forgot your ID/Password?</Link>
    </LoginForm>
  );
};

const LoginForm = styled.form`
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

export default Login;

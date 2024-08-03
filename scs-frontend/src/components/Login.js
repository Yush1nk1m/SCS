import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { login } from '../api/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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
  transition: all 0.3s ease, box-shadow 0.3s ease;
  font-size: 1rem;
  margin-top: 10px;
  width: 100%;

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // 로그인 후 처리
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <Input
        type="email"
        placeholder="Email or Phone"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link href="/forgot-password">Forgot Password?</Link>
      <Button type="submit">Login</Button>
      <Link href="/signup">Not a member? Sign up now</Link>
    </LoginForm>
  );
};

export default Login;

import React, { useState } from 'react';
import styled from 'styled-components';
import { signup } from '../api/api';

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 200px;
`;

const Button = styled.button`
  color: white;
  background-color: #61dafb;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password, nickname, affiliation, position });
      // 회원가입 후 처리
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <SignupForm onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Affiliation"
        value={affiliation}
        onChange={(e) => setAffiliation(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Button type="submit">Sign Up</Button>
    </SignupForm>
  );
};

export default Signup;

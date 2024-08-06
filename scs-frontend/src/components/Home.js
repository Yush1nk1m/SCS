import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const fallingStarsAnimation = keyframes`
  0% { transform: translateY(-100%); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0); /* 메인 컨텐츠 영역 배경색 수정 */
`;

const Text = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
  animation: ${fadeIn} 2s ease-in-out;
  z-index: 2;
`;

const Banners = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 2;
`;

const Banner = styled.div`
  background: radial-gradient(#ff8a00, #e52e71);
  background-size: 200% 200%;
  color: white;
  padding: 20px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  font-size: 1.5rem;
  text-align: center;
  z-index: 2;

  &:hover {
    animation: ${gradientAnimation} 4s ease infinite;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-10px);
  }
`;

const FallingStar = styled.div`
  position: absolute;
  width: 2px;
  height: 100px;
  background: white;
  opacity: 0;
  animation: ${fallingStarsAnimation} 3s linear infinite;
  z-index: 1;
`;

const generateFallingStars = () => {
  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars.push(
      <FallingStar
        key={i}
        style={{
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    );
  }
  return stars;
};

const Home = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setNickname(decodedToken.nickname);
      } catch (error) {
        console.error('Invalid token', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <Container>
      {generateFallingStars()}
      {nickname ? (
        <Text>{nickname}님, 환영합니다!</Text>
      ) : (
        <Text>안녕하세요! 로그인하여 더 많은 기능을 사용해 보세요!</Text>
      )}
      <Text>Study Computer Science를 통해 멋진 개발자로 성장하세요!</Text>
      <Banners>
        <Banner onClick={() => navigate('/sections')}>섹션 페이지</Banner>
        <Banner onClick={() => navigate('/libraries')}>문제집 페이지</Banner>
        {nickname && (
        <Banner onClick={() => navigate('/mypage')}>마이페이지</Banner>
        )}
      </Banners>
    </Container>
  );
};

export default Home;

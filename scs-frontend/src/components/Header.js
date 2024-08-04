import React from 'react';
import styled, { keyframes } from 'styled-components';

const Header = ({ auth, setAuth, setCurrentForm }) => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(false);
    window.location.reload(); // 새로고침
  };

  return (
    <Nav>
      <NavItem onClick={() => setCurrentForm('home')}>Home</NavItem>
      <NavItem onClick={() => setCurrentForm('sections')}>Sections</NavItem>
      <NavItem onClick={() => setCurrentForm('libraries')}>Libraries</NavItem>
      {auth ? (
        <>
          <NavItem onClick={() => setCurrentForm('mypage')}>My Page</NavItem>
          <NavItem onClick={handleLogout}>Logout</NavItem>
        </>
      ) : (
        <>
          <NavItem onClick={() => setCurrentForm('signup')}>Sign Up</NavItem>
          <NavItem onClick={() => setCurrentForm('login')}>Login</NavItem>
        </>
      )}
    </Nav>
  );
};

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
`;

const NavItem = styled.div`
  color: white;
  margin: 0 1rem;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background: radial-gradient(#ff8a00, #e52e71);
  background-size: 200% 200%;
  border-radius: 5px;
  transition: all 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    animation: ${gradientAnimation} 4s ease infinite;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export default Header;

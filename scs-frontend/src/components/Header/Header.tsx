import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../api/authApi";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    window.dispatchEvent(new Event("storage"));
    setIsMenuOpen(false); // 로그아웃 후 메뉴 닫기
    navigate("/"); // 홈으로 리다이렉트
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logoContainer">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navItem" onClick={() => setIsMenuOpen(false)}>
            홈
          </Link>
          <Link
            to="/section"
            className="navItem"
            onClick={() => setIsMenuOpen(false)}
          >
            섹션
          </Link>
          <Link
            to="/library"
            className="navItem"
            onClick={() => setIsMenuOpen(false)}
          >
            라이브러리
          </Link>
        </nav>
        <div className={`buttons ${isMenuOpen ? "open" : ""}`}>
          {isLoggedIn ? (
            <>
              <Link
                to="/mypage"
                className="btn"
                onClick={() => setIsMenuOpen(false)}
              >
                마이페이지
              </Link>
              <button className="btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="btn"
                onClick={() => setIsMenuOpen(false)}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

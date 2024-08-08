import React, { Dispatch, SetStateAction, useState } from "react";
import "./Header.css";
import logo from "../assets/logo.png";

interface HeaderProps {
  setPage: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [selected, setSelected] = useState<string>("");

  const handleClick = (section: string) => {
    setSelected(section);
    setPage(section);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <button
              className={`nav-button ${selected === "home" ? "active" : ""}`}
              onClick={() => handleClick("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${selected === "section" ? "active" : ""}`}
              onClick={() => handleClick("section")}
            >
              Section
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${selected === "library" ? "active" : ""}`}
              onClick={() => handleClick("library")}
            >
              Libraries
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${selected === "mypage" ? "active" : ""}`}
              onClick={() => handleClick("mypage")}
            >
              My Page
            </button>
          </li>
        </ul>
      </nav>
      <div className="auth">
        <button className="sign-in" onClick={() => handleClick("login")}>
          Sign In
        </button>
        <button className="register" onClick={() => handleClick("signup")}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;

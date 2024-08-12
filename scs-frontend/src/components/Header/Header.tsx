import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../services/auth";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const isLoggedIn = useAuth();

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <nav className="nav">
        <Link to={"/"} className="nav-item">
          Home
        </Link>
        <Link to={"/section"} className="nav-item">
          Sections
        </Link>
        <Link to={"/library"} className="nav-item">
          Libraries
        </Link>
      </nav>

      <div className="buttons">
        {isLoggedIn ? (
          <>
            <Link to={"/mypage"} className="btn">
              마이페이지
            </Link>
            <button className="btn" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="btn">
              로그인
            </Link>
            <Link to={"/signup"} className="btn">
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

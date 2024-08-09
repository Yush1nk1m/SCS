import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

// mock
const isLoggedIn = false;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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

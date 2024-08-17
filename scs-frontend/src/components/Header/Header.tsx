import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  // const navigate = useNavigate();
  const isLoggedIn = useAuth();

  const handleLogout = async () => {
    await logout();
    window.dispatchEvent(new Event("storage"));
    // navigate("/"); // 추후 리팩터링
  };

  return (
    <header className="header">
      <div className="leftGroup">
        <div className="logoContainer">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <nav className="nav">
          <Link to={"/"} className="navItem">
            Home
          </Link>
          <Link to={"/section"} className="navItem">
            Sections
          </Link>
          <Link to={"/library"} className="navItem">
            Libraries
          </Link>
        </nav>
      </div>

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

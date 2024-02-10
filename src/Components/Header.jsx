import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="d-flex flex-row align-items-center justify-content-between  justify-content-md-around px-2 navbr">
      <h1 className="heading">Weather App</h1>
      <div className="d-flex">
        <Link
          to="/"
          className={`link ${location.pathname === "/" && "link-active"}`}
        >
          Home
        </Link>
        <Link
          to="/recent"
          className={`link ${location.pathname === "/recent" && "link-active"}`}
        >
          Recent Searches
        </Link>
      </div>
    </nav>
  );
};

export default Header;

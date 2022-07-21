// import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Styling/Navbar.css";
import notebook from "./Styling/Images/notebook.png";

export const Navbar = () => {
  // let location = useLocation();
  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={notebook} alt=" logo" />
        </Link>
      </div>
      <nav>
        <div>
          <ul className="nav-link">
            <li>
              <Link aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/global">Global</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="navBtn">
        {!localStorage.getItem("token") ? (
          <div>
            <Link to="/login">
              <button className="btn">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              className="btn"
              style={{ margin: "5px 67px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

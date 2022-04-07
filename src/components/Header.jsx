import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className='nav navbar-dark bg-hard-dark'>
      <div className='container-fluid'>
        <ul className='nav justify-content-center'>
          <li className='nav-item'>
            <span
              className='nav-link text-gainsboro'
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Home
            </span>
          </li>
          <li className='nav-item'>
            <span
              className='nav-link text-gainsboro'
              onClick={() => navigate("/champions")}
              style={{ cursor: "pointer" }}
            >
              Campeões
            </span>
          </li>
          <li className='nav-item text-gainsboro'>
            <span
              className='nav-link disabled'
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Link
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StartIcon } from "../images/tower-svgrepo-com.svg";
import { ReactComponent as ChampionsIcon } from "../images/battle-svgrepo-com.svg";

const NavSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen sticky top-0 items-center border-r'>
      <ul className='list-none space-y-2 '>
        <li
          className='nav-btn hover:shadow-inner hover:shadow-black/20'
          onClick={() => navigate("/home")}
        >
          <StartIcon />
          <p className='font-semibold ml-2'>Inicio</p>
        </li>
        <li
          className='nav-btn hover:shadow-inner hover:shadow-black/20'
          onClick={() => navigate("/champions")}
        >
          <ChampionsIcon />
          <p className='font-semibold ml-2'>Campeões</p>
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;

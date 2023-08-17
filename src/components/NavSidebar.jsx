import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StartIcon } from "../images/tower-svgrepo-com.svg";
import { ReactComponent as ChampionsIcon } from "../images/battle-svgrepo-com.svg";
import { ReactComponent as TaskIcon } from "../images/trend-svgrepo-com.svg";

const NavSidebar = () => {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex md:h-screen top-0 items-center justify-center ">
      <ul className="list-none md:space-y-2 flex md:flex-col ">
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20"
          onClick={() => navigate("/home")}
        >
          <StartIcon className="" />
          {isLargeScreen && <p className="font-semibold ml-2">Inicio</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20"
          onClick={() => navigate("/champions")}
        >
          <ChampionsIcon />
          {isLargeScreen && <p className="font-semibold ml-2">Campeões</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20"
          onClick={() => navigate("/task")}
        >
          <TaskIcon className="w-10 h-10" />
          {isLargeScreen && <p className="font-semibold ml-2">Metas</p>}
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;

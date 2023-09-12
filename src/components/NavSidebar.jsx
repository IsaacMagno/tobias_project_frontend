import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StartIcon } from "../images/tower-svgrepo-com.svg";
import { ReactComponent as ChampionsIcon } from "../images/battle-svgrepo-com.svg";
import { ReactComponent as TaskIcon } from "../images/trend-svgrepo-com.svg";
import { ReactComponent as AchievIcon } from "../images/win-svgrepo-com.svg";
import { ReactComponent as OptionsIcon } from "../images/fix-svgrepo-com.svg";
import tobiasIcon from "../images/tobias_icon.jpg";

const NavSidebar = () => {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex md:h-screen  bg-orange-400/90 min-h-full md:rounded-r shadow shadow-black sticky top-0">
      <ul className="list-none md:space-y-2 flex md:flex-col min-w-full justify-center md:justify-start md:mt-12">
        {isLargeScreen && (
          <img
            src={tobiasIcon}
            className=" w-42 flex self-center rounded-full my-12 shadow shadow-black"
          />
        )}

        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20  rounded-l md:rounded-r md:rounded-l-none "
          onClick={() => navigate("/home")}
        >
          <StartIcon className="" />
          {isLargeScreen && <p className="font-semibold ml-2 ">Inicio</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20  md:rounded-r"
          onClick={() => navigate("/champions")}
        >
          <ChampionsIcon />
          {isLargeScreen && <p className="font-semibold ml-2">Campeões</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20  rounded-r"
          onClick={() => navigate("/task")}
        >
          <TaskIcon className="w-10 h-10" />
          {isLargeScreen && <p className="font-semibold ml-2">Metas</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20  rounded-r"
          onClick={() => navigate("/achievements")}
        >
          <AchievIcon className="w-10 h-10" />
          {isLargeScreen && <p className="font-semibold ml-2">Conquistas</p>}
        </li>
        <li
          className="nav-btn nav-btn-responsive hover:shadow-inner hover:shadow-black/20  rounded-r"
          onClick={() => navigate("/settings")}
        >
          <OptionsIcon className="w-10 h-10" />
          {isLargeScreen && <p className="font-semibold ml-2">Configurações</p>}
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;

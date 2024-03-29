import React, { useEffect, useState } from "react";
import NavSidebar from "./NavSidebar";

import { useNavigate } from "react-router-dom";
import { BASE_URL, getStats } from "../services/axiosRequests";

import { selectChampion } from "../Redux/reducers/championsSlice";
import { useSelector, useDispatch } from "react-redux";
import actualChampion from "../functions/actualChampion";

const ChampionSelect = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { champions } = useSelector((state) => state.champions);

  const championFiles = champions.map((champ) => champ.files);

  const selectChamp = async (id) => {
    // const champ = actualChampion(champions, id);
    const champ = await getStats(id);

    // console.log(champ);
    dispatch(selectChampion(champ));
    return navigate(`/champion/${id}`);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="bg-gray-0d0 flex flex-col md:flex-row gap-12 justify-evenly items-center md:grid md:grid-cols-5 ">
      {isLargeScreen ? <NavSidebar /> : null}
      <div className="flex flex-wrap gap-3 justify-center md:col-span-4">
        {championFiles.map((file) => (
          <img
            src={`${BASE_URL}/images/${file.image}`}
            alt={"Foto de um Campeão"}
            key={file.image}
            className="champ-img cursor-pointer "
            onClick={() => selectChamp(file.id)}
            style={{
              minHeight: "32vh",
              maxHeight: "32vh",
              minWidth: "25vh",
              maxWidth: "25vh",
            }}
          />
        ))}
      </div>
      {!isLargeScreen ? <NavSidebar /> : null}
    </div>
  );
};

export default ChampionSelect;

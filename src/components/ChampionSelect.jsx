import React from "react";
import NavSidebar from "./NavSidebar";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/axiosRequests";

import { selectChampion } from "../Redux/reducers/championsSlice";
import { useSelector, useDispatch } from "react-redux";
import actualChampion from "../functions/actualChampion";

const ChampionSelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { champions } = useSelector((state) => state.champions);

  const championFiles = champions.map((champ) => champ.files);

  const selectChamp = (id) => {
    const champ = actualChampion(champions, id);
    dispatch(selectChampion(champ));
    return navigate(`/champion/${id}`);
  };

  return (
    <div className='bg-hero flex min-h-screen flex-none bg-no-repeat bg-cover bg-center bg-fixed opacity-95'>
      <div className='grid lg:grid-cols-7 gap-3 items-center'>
        <NavSidebar />
        {championFiles.map((file) => (
          <div className='col-span-2' key={file.image}>
            <img
              src={`${BASE_URL}/images/${file.image}`}
              alt={"Foto de um Campeão"}
              key={file.image}
              className='champ-img'
              onClick={() => selectChamp(file.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionSelect;

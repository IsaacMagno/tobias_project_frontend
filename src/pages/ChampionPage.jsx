import React, { useEffect } from "react";

import { BASE_URL } from "../services/axiosRequests";

import NavSideBar from "../components/NavSidebar";
import Stats from "../components/Stats";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChampionPage = () => {
  const navigate = useNavigate();

  const champions = useSelector((state) => state.champions);
  const { selectedChampion } = champions;

  useEffect(() => {
    if (selectedChampion.length === 0) return navigate("/champions");
  }, [selectedChampion]);

  return (
    <div className='bg-hero flex min-h-screen flex-none bg-no-repeat bg-cover bg-center bg-fixed opacity-95'>
      <div className='grid grid-cols-7 gap-3'>
        <NavSideBar />
        <div className='col-span-5 grid-rows-2'>
          <h1 className='text-center mt-10 text-9xl font-extrabold opacity-30'>
            {selectedChampion.name}
          </h1>
          <div className='flex justify-between mt-8'>
            <div>
              <img
                src={`${BASE_URL}/images/${selectedChampion.files.image}`}
                key={selectedChampion.files.image}
                alt={"Foto de um campeão"}
                className='w-96 opacity-50 grayscale rounded-l'
              />
            </div>
            <div className='bg-gray-500 opacity-40 text-xl font-light text-center max-w-2xl rounded-r flex items-center'>
              <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                repellat accusantium! Necessitatibus aspernatur voluptas
                adipisci alias, odio nemo. Aperiam qui rerum consequatur maxime
                reprehenderit, eos quis eveniet libero? Sint, minima.
              </p>
            </div>
          </div>
        </div>
        <Stats />
      </div>
    </div>
  );
};

export default ChampionPage;

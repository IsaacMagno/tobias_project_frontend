import React, { useEffect, useState } from "react";

import { BASE_URL } from "../services/axiosRequests";

import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChampionPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const navigate = useNavigate();

  const champions = useSelector((state) => state.champions);
  const { selectedChampion } = champions;

  useEffect(() => {
    if (selectedChampion.length === 0) return navigate("/champions");
  }, [selectedChampion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="bg-hero flex flex-col justify-evenly md:grid md:grid-cols-5 min-h-screen bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-90 gap-3">
      {isLargeScreen ? <NavSidebar /> : null}
      <div className="min-w-full col-span-3">
        <h1 className="text-center text-7xl mt-10 md:text-9xl font-extrabold opacity-40 md:opacity-30">
          {selectedChampion.name}
        </h1>
        {isLargeScreen ? (
          <div className="flex flex-row ">
            <div>
              <img
                src={`${BASE_URL}/images/${selectedChampion.files.image}`}
                key={selectedChampion.files.image}
                alt={"Foto de um campeão"}
                className="opacity-50 grayscale rounded-l"
                style={{
                  minHeight: "40vh",
                  maxHeight: "50vh",
                  minWidth: "20vh",
                  maxWidth: "40vh",
                }}
              />
            </div>
            <div className="bg-gray-500 opacity-40 md:text-sm lg:text-xl font-light text-center rounded-r flex items-center ">
              <p className="m-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                repellat accusantium! Necessitatibus aspernatur voluptas
                adipisci alias, odio nemo. Aperiam qui rerum consequatur maxime
                reprehenderit, eos quis eveniet libero? Sint, minima.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col m-5">
            <div>
              <img
                src={`${BASE_URL}/images/${selectedChampion.files.image}`}
                key={selectedChampion.files.image}
                alt={"Foto de um campeão"}
                className="opacity-50 grayscale rounded-t"
              />
            </div>
            <div className="bg-gray-500 opacity-40 md:text-xl font-light text-center rounded-b flex items-center">
              <p className="m-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                repellat accusantium! Necessitatibus aspernatur voluptas
                adipisci alias, odio nemo. Aperiam qui rerum consequatur maxime
                reprehenderit, eos quis eveniet libero? Sint, minima.
              </p>
            </div>
            {!isLargeScreen ? <Stats /> : null}
          </div>
        )}
      </div>
      {!isLargeScreen ? (
        <div className="mb-10">
          <NavSidebar />
        </div>
      ) : null}

      {isLargeScreen ? <Stats /> : null}
    </div>
  );
};

export default ChampionPage;

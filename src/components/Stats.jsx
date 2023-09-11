import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/axiosRequests";

import cleanArray from "../functions/cleanArray";

const Stats = () => {
  const [stats, setStats] = useState();
  const [activities, setActivities] = useState();
  const [champImage, setChampImage] = useState();
  const [ChampTitle, setChampTitle] = useState();

  const navigate = useNavigate();

  const champions = useSelector((state) => state.champions);

  useEffect(() => {
    const { selectedChampion } = champions;
    if (selectedChampion.length === 0) return navigate("/champions");
    const { statistics, activities } = selectedChampion;

    const cleanStats = cleanArray(Object.entries(statistics), "stats");
    const cleanActivities = cleanArray(
      Object.entries(activities),
      "activities"
    );

    if (cleanStats) {
      const total = cleanStats.reduce((acc, stat) => acc + stat[1], 0);
      if (total < 500) {
        setChampTitle(
          <p className="font-bold text-2xl bg-gray-800 p-1 mt-4 rounded">
            Primata
          </p>
        );
      } else if (total >= 500) {
        setChampTitle(
          <p className="font-bold text-2xl bg-yellow-600 p-1 mt-4 rounded">
            Gibão
          </p>
        );
      } else if (total >= 1000) {
        setChampTitle(
          <p className="font-bold text-2xl bg-red-800 p-1 mt-4 rounded">
            Orangotango
          </p>
        );
      } else if (total >= 2000) {
        setChampTitle(
          <p className="font-bold text-2xl bg-green-700 p-1 mt-4 rounded">
            Gorila
          </p>
        );
      } else if (total >= 5000) {
        setChampTitle(
          <p className="font-bold text-2xl bg-blue-900 p-1 mt-4 rounded">
            Chimpanzé
          </p>
        );
      } else if (total >= 10000) {
        setChampTitle(
          <p className="font-bold text-2xl bg-black p-1 mt-4 rounded">Humano</p>
        );
      }
    }

    setStats(cleanStats);
    setActivities(cleanActivities);
    setChampImage(selectedChampion.files.image);
  }, [champions]);

  return (
    <div className="flex flex-col text-white min-h-scren sticky top-0 justify-evenly">
      <div className="flex flex-col text-center self-center ">
        <img
          src={`${BASE_URL}/images/${champImage}`}
          alt={"Foto de um campeão"}
          className="champ-img shadow shadow-black"
          style={{
            minHeight: "20vh",
            maxHeight: "30vh",
            minWidth: "20vh",
            maxWidth: "30vh",
          }}
        />
        {ChampTitle}
      </div>
      <div className="mx-1 mb-8">
        <h1 className="mb-5 text-white/70 text-center font-medium text-sm md:text-xl md:font-semibold">
          Características
        </h1>
        <ul className="">
          {stats ? (
            stats.map((stat) => (
              <li
                className="flex justify-between  2xl:mx-6 my-1 border-b"
                key={stat[0]}
              >
                <p className="font-light text-xs md:text-base md:font-medium">
                  {stat[0]}
                </p>
                <p className="font-light text-xs md:text-base md:font-medium ">
                  {stat[1]}
                </p>
              </li>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Loading render={true} type={"pulse"} />
            </div>
          )}
        </ul>
      </div>
      <div className="mx-1">
        <h1 className="mb-5 text-white/70 text-center font-medium text-sm md:text-xl md:font-semibold">
          Atividades
        </h1>
        <ul className="">
          {activities ? (
            activities.map((stat) => (
              <li
                className="flex justify-between items-center  2xl:mx-6 my-1 border-b"
                key={stat[0]}
              >
                <p className="font-light text-xs md:text-sm md:font-medium">
                  {stat[0]}
                </p>
                <p className="font-light text-xs md:text-base md:font-medium">
                  {stat[1]}
                </p>
              </li>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Loading render={true} type={"pulse"} />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stats;

import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import cleanArray from "../functions/cleanArray";

const Stats = () => {
  const [stats, setStats] = useState();
  const [activities, setActivities] = useState();

  const navigate = useNavigate();

  const champions = useSelector((state) => state.champions);

  useEffect(() => {
    const { selectedChampion } = champions;
    if (selectedChampion.length === 0) return navigate("/champions");
    const { statistics, activities } = selectedChampion;

    setStats(cleanArray(Object.entries(statistics), "stats"));
    setActivities(cleanArray(Object.entries(activities), "activities"));
  }, [champions]);

  return (
    <div className="flex flex-col text-white min-h-scren sticky top-0 justify-center">
      <div className="mx-1 my-8">
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

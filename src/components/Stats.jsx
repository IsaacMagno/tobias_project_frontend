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
    <div className='text-white border-l h-screen sticky top-0'>
      <div className='mt-20 ml-2'>
        <h1 className='mt-8 mb-3 rounded-sm mx-2 text-white/70 text-center font-light'>
          Características
        </h1>
        <ul className=''>
          {stats ? (
            stats.map((stat) => (
              <li
                className='py-1 pr-2 font-light flex justify-between'
                key={stat[0]}
              >
                <p className='mx-1 font-extralight'>{stat[0]}</p>
                <p className='font-light'>{stat[1]}</p>
              </li>
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <Loading render={true} type={"pulse"} />
            </div>
          )}
        </ul>
      </div>
      <div className='py-5 ml-2'>
        <h1 className='mb-3 rounded-sm mx-2 text-white/70 text-center font-light'>
          Atividades
        </h1>
        <ul className=''>
          {activities ? (
            activities.map((stat) => (
              <li
                className='py-1 pr-2 font-light flex justify-between'
                key={stat[0]}
              >
                <p className='mx-1 text-sm font-extralight'>{stat[0]}</p>
                <p className='font-light'>{stat[1]}</p>
              </li>
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <Loading render={true} type={"pulse"} />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stats;

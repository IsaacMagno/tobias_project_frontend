import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StrIncrease from "../statsIncrease/StrIncrease";
import renderStatsIncrease from "../../functions/renderStatsIncrease";
import SelectIncrease from "../statsIncrease/SelectIncrease";
import cleanArray from "../../functions/cleanArray";
import RenderCalendar from "./RenderCalendar";

const RenderAllStats = () => {
  const [renderCalendar, setRenderCalendar] = useState(false);
  const [renderStats, setRenderStats] = useState([]);
  const [renderActivities, setRenderActivities] = useState([]);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [ComponentRender, setComponent] = useState(<StrIncrease />);
  const navigate = useNavigate();

  const champions = useSelector((state) => state.champions);
  const user = useSelector((state) => state.user);

  const renderComponent = ({ value }) => {
    const componentName = renderStatsIncrease(value);
    return setComponent(componentName);
  };

  useEffect(() => {
    const { selectedChampion } = champions;
    if (selectedChampion.length === 0) return navigate("/champions");
    setRenderCalendar(true);
    const { googleId, statistics, activities, name } = selectedChampion;

    setToken(googleId);
    setRenderStats(statistics);
    setRenderActivities(activities);
    setName(name);
  }, [champions]);

  const renderStatsArray = cleanArray(Object.entries(renderStats), "stats");
  const renderActivitiesArray = cleanArray(
    Object.entries(renderActivities),
    "activities"
  );

  return (
    <div className='container'>
      <div className='container'>
        <div className='row'>
          <div className='col-4 card mt-2 me-1 p-3'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item' key={name}>{`Nome: ${name}`}</li>
              {renderStatsArray.map((stat) => (
                <li className='list-group-item' key={stat[0]}>
                  {`${stat[0]}: ${stat[1]}`}
                </li>
              ))}
            </ul>
          </div>
          <div className='card col bg-light-dark mt-2'>
            <div className='row'>
              {user.user.googleId === token ? (
                <>
                  <div className='col-3 mt-4'>
                    <SelectIncrease
                      renderComponent={renderComponent}
                      token={token}
                    />
                  </div>
                  <div className='col mt-4'>{ComponentRender}</div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className='row mt-1'>
          <div className='col-4 card bg-light-dark me-1 p-3'>
            <ul className='list-group list-group-flush'>
              {renderActivitiesArray.map((stat) => (
                <li className='list-group-item text-gainsboro' key={stat[0]}>
                  {`${stat[0]}: ${stat[1]}`}
                </li>
              ))}
            </ul>
          </div>
          <div className='col card bg-white'>
            {renderCalendar && user.user.googleId === token ? (
              <RenderCalendar />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderAllStats;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StrIncrease from "../statsIncrease/StrIncrease";
import renderStatsIncrease from "../../functions/renderStatsIncrease";
import SelectIncrease from "../statsIncrease/SelectIncrease";
import cleanArray from "../../functions/cleanArray";
import FullCalendar from "@fullcalendar/react";
import daydgridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const RenderAllStats = () => {
  const [color, selectColor] = useState("");
  const [renderStats, setRenderStats] = useState([]);
  const [renderActivities, setRenderActivities] = useState([]);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [ComponentRender, setComponent] = useState(<StrIncrease />);
  const selector = useSelector((state) => state.champions);
  const user = useSelector((state) => state.user);

  const renderComponent = ({ value }) => {
    const componentName = renderStatsIncrease(value);
    return setComponent(componentName);
  };

  const handleDateClick = (dateClickInfo) => {
    const day = dateClickInfo.dayEl;
    day.style.backgroundColor = color;
    console.log(day);
  };

  useEffect(() => {
    const { selectedChampion } = selector;
    const { googleId, statistics, activities, name } = selectedChampion;

    setToken(googleId);
    setRenderStats(statistics);
    setRenderActivities(activities);
    setName(name);
  }, [selector]);

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
              <li className='list-group-item'>{`Nome: ${name}`}</li>
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
            <div>
              <div className='btn-group me-2 m-2 p-3' role='group'>
                <button
                  type='button'
                  class='btn btn-green rounded-circle'
                  onClick={() => selectColor("green")}
                />
                <button
                  type='button'
                  class='btn btn-warning rounded-circle'
                  onClick={() => selectColor("yellow")}
                />
                <button
                  type='button'
                  class='btn btn-red rounded-circle'
                  onClick={() => selectColor("red")}
                />
              </div>
              <FullCalendar
                plugins={[daydgridPlugin, interactionPlugin, bootstrap5Plugin]}
                dateClick={handleDateClick}
                themeSystem='bootstrap5'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderAllStats;

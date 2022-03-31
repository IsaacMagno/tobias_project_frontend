import React, { useEffect, useState } from "react";
import renderStatsIncrease from "../../functions/renderStatsIncrease";
import SelectIncrease from "../statsIncrease/selectIncrease";
import cleanArray from "../../functions/cleanArray";
import "../../styles/StatsCard.css";

const RenderAllStats = () => {
  const [renderStats, setRenderStats] = useState([]);
  const [renderActivities, setRenderActivities] = useState([]);
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(false);
  const [ComponentRender, setComponent] = useState();

  const reRender = (bool) => {
    setUpdate(bool);
  };

  const renderComponent = ({ value }) => {
    const componentName = renderStatsIncrease(value, reRender);
    return setComponent(componentName);
  };

  useEffect(() => {
    const championSelected = JSON.parse(sessionStorage.getItem("champion"));
    setRenderStats(championSelected.statistics);
    setRenderActivities(championSelected.activities);
    setName(championSelected.name);

    setUpdate(false);
  }, [update]);

  const renderStatsArray = cleanArray(Object.entries(renderStats));
  const renderActivitiesArray = cleanArray(Object.entries(renderActivities));

  return (
    <div className='container'>
      <div className='container'>
        <div className='row mt-2'>
          <div className='col-4 card m-2' style={{ width: "18rem" }}>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>{`Nome: ${name}`}</li>
              {renderStatsArray.map((stat) => (
                <li className='list-group-item' key={stat[0]}>
                  {`${stat[0]}: ${stat[1]}`}
                </li>
              ))}
            </ul>
          </div>

          <div className='col-2 mt-4'>
            <SelectIncrease renderComponent={renderComponent} />
          </div>

          <div className='col mt-4'>{ComponentRender}</div>
        </div>

        <div className='row mt-1'>
          <div className='col-4 card m-2' style={{ width: "18rem" }}>
            <ul className='list-group list-group-flush'>
              {renderActivitiesArray.map((stat) => (
                <li className='list-group-item' key={stat[0]}>
                  {`${stat[0]}: ${stat[1]}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderAllStats;

import React from "react";
import StrIncrease from "../components/statsIncrease/StrIncrease";
import IntIncrease from "../components/statsIncrease/IntIncrease";
import AgiIncrease from "../components/statsIncrease/AgiIncrease";
import VitIncrease from "../components/statsIncrease/VitIncrease";

const renderStatsIncrease = (value, reRender) => {
  if (value === "strength") return <StrIncrease reRender={reRender} />;
  if (value === "agility") return <AgiIncrease reRender={reRender} />;
  if (value === "inteligence") return <IntIncrease reRender={reRender} />;
  if (value === "vitality") return <VitIncrease reRender={reRender} />;
  if (value === "DEFAULT") return null;
};

export default renderStatsIncrease;

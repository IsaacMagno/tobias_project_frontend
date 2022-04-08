import React from "react";
import StrIncrease from "../components/statsIncrease/StrIncrease";
import IntIncrease from "../components/statsIncrease/IntIncrease";
import AgiIncrease from "../components/statsIncrease/AgiIncrease";
import VitIncrease from "../components/statsIncrease/VitIncrease";

const renderStatsIncrease = (value) => {
  if (value === "strength") return <StrIncrease />;
  if (value === "agility") return <AgiIncrease />;
  if (value === "inteligence") return <IntIncrease />;
  if (value === "vitality") return <VitIncrease />;
};

export default renderStatsIncrease;

import React from "react";
import fire from "../../images/fire-symbol.png";
import water from "../../images/water.png";
import air from "../../images/air.png";
import earth from "../../images/earth.png";

const SelectIncrease = ({ renderComponent }) => {
  return (
    <div className="flex md:flex-col">
      <button
        type="button"
        className="btn-select bg-green-600 hover:bg-green-500"
        onClick={() => renderComponent("agility")}
      >
        <img src={air} className="h-9 w-9 m-auto opacity-20" />
      </button>
      <button
        type="button"
        className="btn-select bg-yellow-400 hover:bg-yellow-200"
        onClick={() => renderComponent("strength")}
      >
        <img src={earth} className="h-9 w-9 m-auto opacity-20" />
      </button>
      <button
        type="button"
        className="btn-select bg-red-600 hover:bg-red-500"
        onClick={() => renderComponent("inteligence")}
      >
        <img src={fire} className="h-9 w-9 m-auto opacity-20" />
      </button>
      <button
        type="button"
        className="btn-select bg-blue-600 hover:bg-blue-500"
        onClick={() => renderComponent("vitality")}
      >
        <img src={water} className="h-9 w-9 m-auto opacity-20" />
      </button>
    </div>
  );
};

export default SelectIncrease;

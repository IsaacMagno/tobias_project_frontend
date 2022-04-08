import React from "react";

const SelectIncrease = ({ renderComponent }) => {
  return (
    <div className='stats-select'>
      <select
        className='form-select-sm p-2 m-2 bg-hard-dark text-gainsboro'
        onChange={({ target }) => renderComponent(target)}
      >
        <option value='strength'>Força</option>
        <option value='agility'>Agilidade</option>
        <option value='inteligence'>Inteligencia</option>
        <option value='vitality'>Vitalidade</option>
      </select>
    </div>
  );
};

export default SelectIncrease;

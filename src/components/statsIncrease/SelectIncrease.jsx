import React from "react";
import { useSelector } from "react-redux";

const SelectIncrease = ({ renderComponent, token }) => {
  const selector = useSelector((state) => state.user);
  let render = selector.user.googleId === token ? true : false;

  return render ? (
    <div className='stats-select'>
      <select
        className='form-select-sm p-2 m-2 bg-hard-dark text-gainsboro'
        onChange={({ target }) => renderComponent(target)}
      >
        <option value='DEFAULT'>Select</option>
        <option value='strength'>Strength</option>
        <option value='agility'>Agility</option>
        <option value='inteligence'>Inteligence</option>
        <option value='vitality'>Vitality</option>
      </select>
    </div>
  ) : null;
};

export default SelectIncrease;

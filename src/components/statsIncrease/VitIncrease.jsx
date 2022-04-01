import React, { useState } from "react";
import { useParams } from "react-router-dom";
import statusUpdate from "./StatusUpdate";

const VitIncrease = ({ reRender }) => {
  const { id } = useParams();
  const [meals, setMeals] = useState("");
  const [drinks, setDrinks] = useState("");

  const aux = (statName, stat, setStat) => {
    statusUpdate(statName, parseInt(stat), id, reRender);

    setStat("");
  };
  return (
    <div className='container'>
      <h4 className='text-primary'>Vitalidade</h4>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='meals-increase'
            placeholder='Refeições Saudáveis'
            type='number'
            name='meals'
            value={meals}
            onChange={({ target }) => setMeals(target.value)}
          />

          <button
            className='btn btn-outline-primary btn-sm'
            type='button'
            onClick={() => aux("meals", meals, setMeals)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='drinks-increase'
            placeholder='Litros de Água'
            type='number'
            name='drinks'
            value={drinks}
            onChange={({ target }) => setDrinks(target.value)}
          />

          <button
            className='btn btn-outline-primary btn-sm'
            type='button'
            onClick={() => aux("drinks", drinks, setDrinks)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitIncrease;

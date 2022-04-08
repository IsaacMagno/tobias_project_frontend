import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import statusUpdate from "./StatusUpdate";

const AgiIncrease = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [race, setRace] = useState("");
  const [rope, setRope] = useState("");
  const [bike, setBike] = useState("");

  const aux = async (statName, stat, setStat) => {
    const champ = await statusUpdate(statName, parseInt(stat), id);
    dispatch(selectChampion(champ));
    setStat("");
  };

  return (
    <div className='container'>
      <h4 className='text-green'>Agilidade</h4>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='agility-increase-run'
            placeholder='Km Corridos'
            type='number'
            name='kmRun'
            value={race}
            onChange={({ target }) => setRace(target.value)}
          />

          <button
            className='btn btn-outline-green btn-sm'
            type='button'
            onClick={() => aux("kmRun", race, setRace)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='agility-increase-jump'
            placeholder='Saltos de Corda'
            type='number'
            name='jumpRope'
            value={rope}
            onChange={({ target }) => setRope(target.value)}
          />

          <button
            className='btn btn-outline-green btn-sm'
            type='button'
            onClick={() => aux("jumpRope", rope, setRope)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='agility-increase-bike'
            placeholder='Km Pedalados'
            type='number'
            name='kmBike'
            value={bike}
            onChange={({ target }) => setBike(target.value)}
          />

          <button
            className='btn btn-outline-green btn-sm'
            type='button'
            onClick={() => aux("kmBike", bike, setBike)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgiIncrease;

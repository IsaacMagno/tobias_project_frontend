import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import statusUpdate from "./StatusUpdate";

const AgiIncrease = () => {
  const {
    user: { id },
  } = useSelector((state) => state.user);

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
    <div className='container-stats'>
      <h4 className='h4-stats text-white/80 bg-green-600'>Agilidade</h4>

      <div className=''>
        <div className='mb-3'>
          <input
            className='input-stats'
            id='agility-increase-run'
            placeholder='Km Corridos'
            type='number'
            name='kmRun'
            value={race}
            onChange={({ target }) => setRace(target.value)}
          />

          <button
            className='btn-stats bg-green-600 hover:bg-green-500'
            type='button'
            onClick={() => aux("kmRun", race, setRace)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className=''>
        <div className='mb-3'>
          <input
            className='input-stats'
            id='agility-increase-jump'
            placeholder='Saltos de Corda'
            type='number'
            name='jumpRope'
            value={rope}
            onChange={({ target }) => setRope(target.value)}
          />

          <button
            className='btn-stats bg-green-600 hover:bg-green-500'
            type='button'
            onClick={() => aux("jumpRope", rope, setRope)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className=''>
        <div className='mb-3'>
          <input
            className='input-stats'
            id='agility-increase-bike'
            placeholder='Km Pedalados'
            type='number'
            name='kmBike'
            value={bike}
            onChange={({ target }) => setBike(target.value)}
          />

          <button
            className='btn-stats bg-green-600 hover:bg-green-500'
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

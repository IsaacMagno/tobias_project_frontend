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

  const handleChange = (value, min, max, inpState) => {
    const validateValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value))
    );

    inpState(validateValue);
  };

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
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 20, setRace)
            }
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
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 500, setRope)
            }
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
            min={0}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 20, setBike)
            }
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

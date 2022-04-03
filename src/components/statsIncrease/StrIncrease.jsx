import React, { useState } from "react";
import { useParams } from "react-router-dom";
import statusUpdate from "./StatusUpdate";

const StrIncrease = ({ reRender }) => {
  const { id } = useParams();

  const [abs, setAbs] = useState("");
  const [upperLimb, setUpperLimb] = useState("");
  const [lowerLimb, setLowerLimb] = useState("");

  const aux = (statName, stat, setStat) => {
    statusUpdate(statName, parseInt(stat), id, reRender);

    setStat("");
  };

  return (
    <div className='container'>
      <h4 className='text-warning'>Força</h4>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='upperLimb-increase'
            placeholder='Membros Superiores'
            type='number'
            name='upperLimb'
            value={upperLimb}
            onChange={({ target }) => setUpperLimb(target.value)}
          />

          <button
            className='btn btn-outline-warning btn-sm'
            type='button'
            onClick={() => aux("upperLimb", upperLimb, setUpperLimb)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='abs-increase'
            placeholder='Abdominais'
            type='number'
            name='abs'
            value={abs}
            onChange={({ target }) => setAbs(target.value)}
          />

          <button
            className='btn btn-outline-warning btn-sm'
            type='button'
            onClick={() => aux("abs", abs, setAbs)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='lowerLimb-increase'
            placeholder='Membros Inferiores'
            type='number'
            name='lowerLimb'
            value={lowerLimb}
            onChange={({ target }) => setLowerLimb(target.value)}
          />

          <button
            className='btn btn-outline-warning btn-sm'
            type='button'
            onClick={() => aux("lowerLimb", lowerLimb, setLowerLimb)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrIncrease;

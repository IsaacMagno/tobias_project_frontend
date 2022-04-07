import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import statusUpdate from "./StatusUpdate";

const IntIncrease = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [study, setStudy] = useState("");
  const [reading, setReading] = useState("");
  const [meditation, setMeditation] = useState("");

  const aux = async (statName, stat, setStat) => {
    const champ = await statusUpdate(statName, parseInt(stat), id);
    dispatch(selectChampion(champ));
    setStat("");
  };
  return (
    <div className='container'>
      <h4 className='text-red'>Inteligência</h4>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='study-increase'
            placeholder='Horas de Estudo'
            type='number'
            name='study'
            value={study}
            onChange={({ target }) => setStudy(target.value)}
          />

          <button
            className='btn btn-outline-red btn-sm'
            type='button'
            onClick={() => aux("study", study, setStudy)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='reading-increase'
            placeholder='Horas de Leitura'
            type='number'
            name='reading'
            value={reading}
            onChange={({ target }) => setReading(target.value)}
          />

          <button
            className='btn btn-outline-red btn-sm'
            type='button'
            onClick={() => aux("reading", reading, setReading)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className='col'>
        <div className='input-group input-group-sm mb-3'>
          <input
            className='form-control-sm'
            id='meditation-increase'
            placeholder='Horas de Meditação'
            type='number'
            name='meditation'
            value={meditation}
            onChange={({ target }) => setMeditation(target.value)}
          />

          <button
            className='btn btn-outline-red btn-sm'
            type='button'
            onClick={() => aux("meditation", meditation, setMeditation)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntIncrease;

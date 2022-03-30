import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import statusUpdate from './StatusUpdate';
import '../../styles/StatsCard.css';

const AgiIncrease = ({ reRender }) => {
  const { id } = useParams();
  const [race, setRace] = useState('')
  const [rope, setRope] = useState('')

  const aux = (statName, stat, setStat) => {
    statusUpdate(statName, parseInt(stat), id, reRender);

    setStat('');
  };

  return (
    <div className="container">

      <h4 className="text-success">Agilidade</h4>

        <div className="col">

          <div className="input-group input-group-sm mb-3">

            <input
              className="form-control-sm"
              id="agility-increase"
              placeholder="Km's Corridos"
              type="number"
              name="kmRun"
              value={ race }
              onChange={ ({ target }) => setRace(target.value) }
            />

            <button
              className="btn btn-outline-success btn-sm"
              type="button"
              onClick={ () =>  aux("kmRun", race, setRace)}
            >
              Enviar
            </button>

          </div>

        </div>

        <div className="col">

          <div className="input-group input-group-sm mb-3">

            <input
              className="form-control-sm"
              id="agility-increase"
              placeholder="Saltos de Corda"
              type="number"
              name="jumpRope"
              value={ rope }
              onChange={ ({ target }) => setRope(target.value) }
            />

            <button
              className="btn btn-outline-success btn-sm"
              type="button"
              onClick={ () =>  aux("jumpRope", rope, setRope)}
            >
              Enviar
            </button>

          </div>

        </div> 

    </div>
  )
};

export default AgiIncrease;

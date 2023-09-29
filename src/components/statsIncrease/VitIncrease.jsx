import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import { setUser } from "../../Redux/reducers/userSlice";
import statusUpdate from "./StatusUpdate";

const VitIncrease = () => {
  const {
    user: { id },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [meals, setMeals] = useState("");
  const [drinks, setDrinks] = useState("");
  const [sleep, setSleep] = useState("");

  const handleChange = (value, min, max, inpState) => {
    const validateValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value))
    );

    inpState(validateValue);
  };

  const aux = async (statName, stat, setStat) => {
    const champ = await statusUpdate(statName, parseFloat(stat), id);
    dispatch(selectChampion(champ));
    dispatch(setUser(champ));

    setStat("");
  };

  return (
    <div className="container-stats">
      <h4 className="h4-stats text-white/80 bg-blue-500">Vitalidade</h4>
      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="meals-increase"
            placeholder="Refeições Saudáveis"
            type="number"
            name="meals"
            value={meals}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 8, setMeals)
            }
          />

          <button
            className="btn-stats bg-blue-500 hover:bg-blue-400"
            type="button"
            onClick={() => aux("meals", meals, setMeals)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="drinks-increase"
            placeholder="Litros de Água"
            type="number"
            name="drinks"
            value={drinks}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 5, setDrinks)
            }
          />

          <button
            className="btn-stats bg-blue-500 hover:bg-blue-400"
            type="button"
            onClick={() => aux("drinks", drinks, setDrinks)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="sleep-increase"
            placeholder="Horas de Sono"
            type="number"
            name="sleep"
            value={sleep}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 12, setSleep)
            }
          />

          <button
            className="btn-stats bg-blue-500 hover:bg-blue-400"
            type="button"
            onClick={() => aux("sleep", sleep, setSleep)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitIncrease;

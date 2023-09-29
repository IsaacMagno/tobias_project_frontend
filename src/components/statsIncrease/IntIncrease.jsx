import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import { setUser } from "../../Redux/reducers/userSlice";
import Select from "react-select";
import statusUpdate from "./StatusUpdate";

const IntIncrease = () => {
  const {
    user: { id },
  } = useSelector((state) => state.user);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const dispatch = useDispatch();

  const [study, setStudy] = useState("");
  const [reading, setReading] = useState("");
  const [meditation, setMeditation] = useState("");

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
      <h4 className="h4-stats text-white/80 bg-red-600">Inteligência</h4>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="study-increase"
            placeholder="Horas de Estudo"
            type="number"
            name="study"
            value={study}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 15, setStudy)
            }
          />
          {/* <Select
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "red",
              }),
            }}
          /> */}

          <button
            className="btn-stats bg-red-600 hover:bg-red-500"
            type="button"
            onClick={() => aux("study", study, setStudy)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="reading-increase"
            placeholder="Horas de Leitura"
            type="number"
            name="reading"
            value={reading}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 5, setReading)
            }
          />

          <button
            className="btn-stats bg-red-600 hover:bg-red-500"
            type="button"
            onClick={() => aux("reading", reading, setReading)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="meditation-increase"
            placeholder="Horas de Meditação"
            type="number"
            name="meditation"
            value={meditation}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 5, setMeditation)
            }
          />

          <button
            className="btn-stats bg-red-600 hover:bg-red-500"
            type="button"
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

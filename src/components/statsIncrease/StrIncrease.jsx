import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChampion } from "../../Redux/reducers/championsSlice";
import { setUser } from "../../Redux/reducers/userSlice";
import statusUpdate from "./StatusUpdate";

const StrIncrease = () => {
  const {
    user: { id },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [abs, setAbs] = useState("");
  const [upperLimb, setUpperLimb] = useState("");
  const [lowerLimb, setLowerLimb] = useState("");

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
      <h4 className="h4-stats text-black/50 bg-yellow-400">Força</h4>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="upperLimb-increase"
            placeholder="Membros Superiores"
            type="number"
            name="upperLimb"
            value={upperLimb}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 450, setUpperLimb)
            }
          />

          <button
            className="btn-stats bg-yellow-400 hover:bg-yellow-300 text-black/50"
            type="button"
            onClick={() => aux("upperLimb", upperLimb, setUpperLimb)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="abs-increase"
            placeholder="Abdominais"
            type="number"
            name="abs"
            value={abs}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 450, setAbs)
            }
          />

          <button
            className="btn-stats bg-yellow-400 hover:bg-yellow-300 text-black/50"
            type="button"
            onClick={() => aux("abs", abs, setAbs)}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <input
            className="input-stats"
            id="lowerLimb-increase"
            placeholder="Membros Inferiores"
            type="number"
            name="lowerLimb"
            value={lowerLimb}
            onChange={({ target: { value } }) =>
              handleChange(value, 0, 450, setLowerLimb)
            }
          />

          <button
            className="btn-stats bg-yellow-400 hover:bg-yellow-300 text-black/50"
            type="button"
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

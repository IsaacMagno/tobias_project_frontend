import React from "react";
import { useNavigate } from "react-router-dom";

import monkeyCode from "../images/code_monkey.gif";

const Achievements = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-0d0 flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95">
      <h1 className="text-white text-3xl font-bold mb-6">Conquistas</h1>
      <div className="text-center">
        <img src={monkeyCode} />
        <p className="text-white text-1xl text-center mt-2">Em construção</p>
        <button
          className="text-white mt-2 bg-white/50 p-2 px-4 rounded hover:bg-white/60 font-bold"
          onClick={() => navigate("/home")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Achievements;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const handleCreateAccount = () => {
    return alert.show("Cadastro temporariamente indisponível");
  };

  return (
    <div className="bg-hero flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95">
      <div>
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
          <div className="max-w-sm  rounded-l">
            <img src={process.env.PUBLIC_URL + "/tobias_vintage_sm.webp"}></img>
          </div>

          <div className="rounded-r p-8 flex flex-col justify-evenly items-center bg-white relative">
            <form
              //   onSubmit={doLogin}
              className="bg-white flex flex-col items-center justify-evenly"
            >
              <input
                className="input-login"
                id="name"
                type="text"
                placeholder="Nome"
                //   onChange={({ target }) => setUsername(target.value)}
              />
              <input
                className="input-login"
                id="name"
                type="text"
                placeholder="Data de nascimento"
                //   onChange={({ target }) => setUsername(target.value)}
              />
              <input
                className="input-login"
                id="username"
                type="text"
                placeholder="Usuário"
                //   onChange={({ target }) => setUsername(target.value)}
              />
              <input
                className="input-login "
                id="password"
                type="password"
                placeholder="Senha"
                //   onChange={({ target }) => setPassword(target.value)}
              />
              <button
                type="button"
                className="bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 min-w-full rounded outline-none mt-6"
                onClick={() => handleCreateAccount()}
              >
                Criar conta
              </button>
              <button
                type="button"
                className="bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 min-w-full rounded outline-none mt-2"
                onClick={() => navigate("/")}
              >
                Voltar
              </button>
            </form>
            <div className="flex justify-center absolute bottom-2 inset-x-0">
              <p className="text-gray-500 text-xs">
                &copy;2024 Tobias's Corp. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

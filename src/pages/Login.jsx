import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { championLogin, getStats } from "../services/axiosRequests";
import { setUser, setLoggin } from "../Redux/reducers/userSlice.js";
import { selectChampion, setChampions } from "../Redux/reducers/championsSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { champions } = useSelector((state) => state.champions);
  const { logged } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (logged) return navigate("/home");
  // }, []);

  const doLogin = async (event) => {
    event.preventDefault();

    const user = champions.filter(
      (champ) => champ.username.toLowerCase() === username.toLowerCase()
    );

    if (!user.length) return alert.show("Usuario ou senha invalidos!");

    if (username && password) {
      const {
        validLogin: { isValid, champUpdated },
      } = await championLogin({
        username,
        password,
      });

      if (isValid) {
        dispatch(setLoggin(true));
        dispatch(selectChampion(champUpdated));
        dispatch(setUser(champUpdated));

        return navigate("/home");
      }
    }

    return alert.show("Usuario ou senha invalidos!");
  };

  return (
    <div className="bg-gray-0d0 flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95">
      <div>
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
          <div className="max-w-sm">
            <img src={process.env.PUBLIC_URL + "/tobias_vintage_sm.webp"}></img>
          </div>

          <div className="rounded-r p-8 flex flex-col justify-evenly items-center bg-white relative">
            <form
              onSubmit={doLogin}
              className="flex flex-col items-center justify-evenly "
            >
              <input
                className="input-login"
                id="username"
                type="text"
                placeholder="Usuário"
                onChange={({ target }) => setUsername(target.value)}
              />

              <input
                className="input-login"
                id="password"
                type="password"
                placeholder="Senha"
                onChange={({ target }) => setPassword(target.value)}
              />

              <button
                className="mt-6 bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2  min-w-full rounded outline-none"
                type="submit"
              >
                Entrar
              </button>
              <button
                type="button"
                className="mt-2 bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 min-w-full rounded outline-none"
                onClick={() => navigate("/register")}
              >
                Criar conta
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

export default Login;

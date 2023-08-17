import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { championLogin } from "../services/axiosRequests";
import { setUser, setLoggin } from "../Redux/reducers/userSlice.js";
import { selectChampion } from "../Redux/reducers/championsSlice";

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
      const { validLogin } = await championLogin({ username, password });

      if (validLogin) {
        dispatch(setLoggin(true));
        dispatch(selectChampion(user[0]));
        dispatch(setUser(user[0]));

        return navigate("/home");
      }
    }

    return alert.show("Usuario ou senha invalidos!");
  };

  return (
    <div className="bg-hero flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95">
      <div>
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
          <div className="bg-tobs h-48 lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-no-repeat bg-cover"></div>

          <div className="border-r border-b border-l lg:border-l-0 lg:border-t  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal">
            <form
              onSubmit={doLogin}
              className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-2 mt-10">
                <input
                  className="input-login"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  className="input-login mb-3"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 px-32 rounded outline-none"
                  type="submit"
                >
                  Entrar
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2024 Tobias's Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

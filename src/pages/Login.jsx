import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { setUser, setLoggin } from "../Redux/reducers/userSlice.js";
import { selectChampion } from "../Redux/reducers/championsSlice";

import tobiasVintage from "../images/tobias_vintage.jpg";
import backgroundTexture from "../images/background_texture.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [userLogin, setUserLogin] = useState();
  const [userPassword, setUserPassword] = useState();

  const { champions } = useSelector((state) => state.champions);
  const { logged } = useSelector((state) => state.user);

  useEffect(() => {
    if (logged) return navigate("/home");
  }, []);

  const doLogin = (event) => {
    event.preventDefault();

    if (userLogin && userPassword) {
      const user = champions.filter((champ) => champ.username === userLogin);

      if (user[0].password === userPassword) {
        dispatch(setUser(user[0]));
        dispatch(selectChampion(user[0]));
        dispatch(setLoggin(true));
        return navigate("/home");
      }
    }

    return alert.show("Usuario ou senha invalidos!");
  };

  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover'
      style={{ backgroundImage: `url(${backgroundTexture})` }}
    >
      <div>
        <div className='max-w-sm w-full lg:max-w-full lg:flex'>
          <div
            className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
            style={{ backgroundImage: `url(${tobiasVintage})` }}
          ></div>

          <div className='border-r border-b border-l lg:border-l-0 lg:border-t  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal'>
            <form
              onSubmit={doLogin}
              className='bg-white rounded px-8 pt-6 pb-8 mb-4'
            >
              <div className='mb-2 mt-10'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-800 text-white leading-tight focus:outline-none focus:shadow-outline'
                  id='username'
                  type='text'
                  placeholder='Username'
                  onChange={({ target }) => setUserLogin(target.value)}
                />
              </div>

              <div className='mb-4'>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-800 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='Password'
                  onChange={({ target }) => setUserPassword(target.value)}
                />
              </div>

              <div className='flex items-center justify-center'>
                <button
                  className='bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 px-32 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Entrar
                </button>
              </div>
            </form>
            <p className='text-center text-gray-500 text-xs'>
              &copy;2022 Tobias's Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

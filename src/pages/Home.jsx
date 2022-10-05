import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
// import Images from "../components/Images";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getPhrases } from "../services/axiosRequests";
import { setUser, setLoggin, setToken } from "../Redux/reducers/userSlice";

const Home = () => {
  const [selectedPhrase, setPhrase] = useState({ text: "", author: "" });
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);

  const { REACT_APP_CLIENT_ID } = process.env;

  const { logged, user } = selector;

  const responseGoogle = (response) => {
    const user = jwt_decode(response.credential);
    dispatch(setUser(user));
    dispatch(setToken(user.sub));
    if (user) {
      dispatch(setLoggin(true));
    }
  };

  useEffect(() => {
    setLoad(true);
    const phrase = async () =>
      await getPhrases()
        .then((o) => setPhrase(o))
        .then(() => setLoad(false));

    phrase();
  }, []);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_CLIENT_ID,
      callback: responseGoogle,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    if (!logged) {
      google.accounts.id.prompt();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='container-fluid '>
        <div className='d-flex justify-content-center'>
          {logged ? (
            <div className='container-fluid mb-2 mt-1 rounded p-4'>
              <div className='text-center text-gainsboro'>
                <h4 className='mb-4 mt-2 p-3'>Bem vindo {user.given_name}</h4>
                {load ? (
                  <Loading render={load} />
                ) : (
                  <div>
                    <p>{selectedPhrase.text}</p>
                    <p>{selectedPhrase.author}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='mt-5 p-5'>
              <div id='signInDiv'>Login</div>
            </div>
          )}
        </div>
        {/* <Images /> */}
      </div>
    </div>
  );
};

export default Home;

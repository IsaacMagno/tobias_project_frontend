import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Images from "../components/Images";
import Movies from "../components/Movies";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { getPhrases } from "../services/axiosRequests";
import { setUser, setLoggin } from "../Redux/reducers/userSlice";

const Home = () => {
  const [selectedPhrase, setPhrase] = useState({ text: "", author: "" });
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);

  const { REACT_APP_CLIENT_ID } = process.env;

  const { logged, user } = selector;

  useEffect(() => {
    setLoad(true);
    const phrase = async () =>
      await getPhrases()
        .then((o) => setPhrase(o))
        .then(() => setLoad(false));

    phrase();
  }, []);

  const responseGoogle = (response) => {
    const user = response.profileObj;
    dispatch(setUser(user));
    if (user) dispatch(setLoggin(true));
  };

  return (
    <div>
      <Header />
      <div className='container-fluid'>
        <div className='d-flex justify-content-center m-2'>
          {logged ? (
            <div className='container card bg-light-dark'>
              <div className='card-body text-center text-gainsboro'>
                <h4 className='card mb-4 p-3 .bg-light bg-gradient text-hard-dark'>
                  Bem vindo {user.givenName}
                </h4>
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
            <GoogleLogin
              clientId={REACT_APP_CLIENT_ID}
              buttonText='Login com Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          )}
        </div>
        <Images />
        <Movies />
      </div>
    </div>
  );
};

export default Home;

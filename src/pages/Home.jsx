import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Images from "../components/Images";
import { GoogleLogin, GoogleLogout } from "react-google-login";
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
      <div className='container-fluid '>
        <div className='d-flex justify-content-center'>
          {logged ? (
            <div className='container-fluid mb-2 mt-1 rounded p-4'>
              <div className='text-center text-gainsboro'>
                <h4 className='mb-4 mt-2 p-3'>Bem vindo {user.givenName}</h4>
                {load ? (
                  <Loading render={load} />
                ) : (
                  <div>
                    <p>{selectedPhrase.text}</p>
                    <p>{selectedPhrase.author}</p>
                  </div>
                )}
                <GoogleLogout
                  clientId={REACT_APP_CLIENT_ID}
                  buttonText='Logout'
                  onLogoutSuccess={() => window.location.reload(false)}
                  className='m-3'
                ></GoogleLogout>
              </div>
            </div>
          ) : (
            <GoogleLogin
              clientId={REACT_APP_CLIENT_ID}
              buttonText='Login com Google'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              isSignedIn={true}
              className='m-3'
            />
          )}
        </div>
        <Images />
      </div>
    </div>
  );
};

export default Home;

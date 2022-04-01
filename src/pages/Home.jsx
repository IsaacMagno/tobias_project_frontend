import React from "react";
import Header from "../components/Header";
import Images from "../components/Images";
import Movies from "../components/Movies";
import GoogleLogin from "react-google-login";

const Home = () => {
  const responseGoogle = (response) => {
    const { googleId } = response;
    window.sessionStorage.setItem("token", JSON.stringify(googleId));
  };

  return (
    <div className='container'>
      <Header />
      <GoogleLogin
        clientId='753655742889-v0h2a4ou12tnde6p4qrgogag49osfr2g.apps.googleusercontent.com'
        buttonText='Login com Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <Images />
      <Movies />
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Stats from "./pages/Stats";
import { useDispatch } from "react-redux";
import { getStats } from "./services/axiosRequests";
import {
  setChampions,
  // setChampionFiles,
} from "./Redux/reducers/championsSlice";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const allStats = async () =>
      await getStats().then((o) => dispatch(setChampions(o)));

    allStats();
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/champions' element={<Champions />} />
      <Route path='/champion/:id' element={<Stats />} />
    </Routes>
  );
};

export default App;

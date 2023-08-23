import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ReactGA from "react-ga";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ChampionSelect from "./pages/ChampionSelect";
import ChampionPage from "./pages/ChampionPage";
import TaskPage from "./pages/TaskPage";
import Register from "./pages/Register";

import { useDispatch } from "react-redux";
import { getStats } from "./services/axiosRequests";
import { setChampions } from "./Redux/reducers/championsSlice";

import "../src/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TRACKING_ID = "UA-263504160-1";
ReactGA.initialize(TRACKING_ID);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const allStats = async () =>
      await getStats().then((o) => dispatch(setChampions(o)));

    allStats();

    console.log("©2023 Isaac's Magno. All rights reserved.");
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/champions" element={<ChampionSelect />} />
      <Route path="/champion/:id" element={<ChampionPage />} />
      <Route path="/task" element={<TaskPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getStats } from "./services/axiosRequests";
import ChampionsContext from "./context/ChampionsContext";
import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Stats from "./pages/Stats";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const allStats = async () => await getStats().then((o) => setStats(o));

    allStats();
  }, []);

  return (
    <ChampionsContext.Provider value={stats}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champions' element={<Champions />} />
        <Route path='/champion/:id' element={<Stats />} />
      </Routes>
    </ChampionsContext.Provider>
  );
};

export default App;

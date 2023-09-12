import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";
import Calendar from "../components/renderComponents/RenderCalendar";

import AgiIncrease from "../components/statsIncrease/AgiIncrease";
import renderStatsIncrease from "../functions/renderStatsIncrease";
import SelectIncrease from "../components/statsIncrease/SelectIncrease";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPhrases } from "../services/axiosRequests";
import { selectChampion } from "../Redux/reducers/championsSlice";
import { setUser } from "../Redux/reducers/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const [selectedPhrase, setPhrase] = useState({ text: "", author: "" });
  const [load, setLoad] = useState(false);
  const [ComponentRender, setComponent] = useState(<AgiIncrease />);

  const selector = useSelector((state) => state.user);
  const champions = useSelector((state) => state.champions);
  const { logged, user } = selector;

  const renderComponent = (name) => {
    const componentName = renderStatsIncrease(name);

    return setComponent(componentName);
  };

  useEffect(() => {
    if (!logged) return navigate("/");

    if (user != champions.selectedChampion) {
      dispatch(selectChampion(user));
    }

    setLoad(true);
    const phrase = async () =>
      await getPhrases()
        .then((o) => setPhrase(o))
        .then(() => setLoad(false));

    phrase();
  }, [logged]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => setIsLargeScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    // bg-hero
    <div className="min-h-screen bg-gray-0d0 bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-90 md:grid md:grid-cols-5 gap-12">
      {isLargeScreen ? <NavSidebar /> : null}
      <div className="flex justify-center items-center md:col-span-3">
        <div className="text-white text-center flex flex-col gap-6 min-w-full">
          <div className=" ">
            <h1 className="text-xl md:text-2xl font-bold mt-1  p-6">
              Bem vindo {user.name}
            </h1>
            <div className="">
              {load ? (
                <div className="">
                  <Loading render={load} type={"folding-cube"} />
                </div>
              ) : (
                <div className="md:font-light break-words flex flex-col justify-center py-2">
                  <p className="text-sm md:text-lg">
                    {/* O tempo não cura tudo. Aliás, o tempo não cura nada, o tempo
                    apenas tira o incurável do centro das atenções. */}
                    {selectedPhrase.text}
                  </p>
                  <p className="text-xs md:text-base lg:text-base font-light md:font-extralight mt-1">
                    {selectedPhrase.author}
                    {/* Martha Medeiros */}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-col md:flex-row justify-evenly md:justify-center items-center ">
            <SelectIncrease renderComponent={renderComponent} />
            <div className="md:ml-2">{ComponentRender}</div>
          </div>
          <div className="">
            <Calendar />
          </div>
          {!isLargeScreen ? (
            <div className="mb-10">
              <NavSidebar />
            </div>
          ) : null}
        </div>
      </div>
      {isLargeScreen ? <Stats /> : null}
    </div>
  );
};

export default Home;

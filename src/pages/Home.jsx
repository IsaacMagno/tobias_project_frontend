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

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div>
      <div className='bg-hero flex min-h-screen bg-no-repeat bg-cover bg-center bg-fixed opacity-95'>
        <div className='grid grid-cols-7 gap-3 min-w-full'>
          <NavSidebar />
          <div className='text-white text-center max-w-full col-span-5'>
            <h1 className='text-3xl font-bold mt-2 border-t p-6'>
              Bem vindo {user.name}
            </h1>
            <div className='h-8'>
              {load ? (
                <div className='mt-10'>
                  <Loading render={load} type={"folding-cube"} />
                </div>
              ) : (
                <div className='mt-10 font-extralight break-words flex flex-col justify-center px-20'>
                  <p>{selectedPhrase.text}</p>
                  <p className='text-sm mt-1'>{selectedPhrase.author}</p>
                </div>
              )}
            </div>
            <div className='mt-12 py-20 flex justify-center items-center border-y h-96'>
              <SelectIncrease renderComponent={renderComponent} />
              <div className='ml-4 mt-6'>{ComponentRender}</div>
            </div>
            <div className='my-4'>
              <Calendar />
            </div>
          </div>
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default Home;

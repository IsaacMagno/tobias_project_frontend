import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import NavSidebar from "../components/NavSidebar";
import Stats from "../components/Stats";
import Calendar from "../components/renderComponents/RenderCalendar";

import AgiIncrease from "../components/statsIncrease/AgiIncrease";
import renderStatsIncrease from "../functions/renderStatsIncrease";
import SelectIncrease from "../components/statsIncrease/SelectIncrease";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPhrases } from "../services/axiosRequests";

import tobiasBg from "../images/background_texture.jpg";

const Home = () => {
  const navigate = useNavigate();

  const [selectedPhrase, setPhrase] = useState({ text: "", author: "" });
  const [load, setLoad] = useState(false);
  const [ComponentRender, setComponent] = useState(<AgiIncrease />);

  const selector = useSelector((state) => state.user);
  const { logged, user } = selector;

  const renderComponent = (name) => {
    const componentName = renderStatsIncrease(name);

    return setComponent(componentName);
  };

  useEffect(() => {
    setLoad(true);
    const phrase = async () =>
      await getPhrases()
        .then((o) => setPhrase(o))
        .then(() => setLoad(false));

    phrase();
  }, []);

  if (!logged) return navigate("/");

  return (
    <div>
      <div
        className='flex min-h-screen bg-cover'
        style={{ backgroundImage: `url(${tobiasBg})`, opacity: 0.95 }}
      >
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
                <div className='text-md mt-10 font-extralight break-words flex justify-center px-20'>
                  <p>{selectedPhrase.text}</p>
                  <p>{selectedPhrase.author}</p>
                </div>
              )}
            </div>
            <div className='mt-12 py-20 flex justify-center items-center border-y h-96'>
              <SelectIncrease renderComponent={renderComponent} />
              <div className='ml-4 mt-6'>{ComponentRender}</div>
            </div>
            <div className='border-x my-4'>
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

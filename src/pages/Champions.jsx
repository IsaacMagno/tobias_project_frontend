import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import ChampionContext from '../context/ChampionsContext';
import Header from '../components/Header';
import { getFiles } from '../services/axiosRequests';
import '../styles/StatsCard.css';

const RenderFiles = lazy(() => import('../components/renderComponents/RenderFiles'));

const Champions = () => {
  const [files, setFiles] = useState([]);
  const [champions, setChampions] = useState()

  const champsData = useContext(ChampionContext);

  useEffect(() => {
    const allFiles = async () => await getFiles()
      .then((o) => setFiles(o));
    
    allFiles();

    setChampions(champsData);
  }, [champsData]);

  return (
    <div>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <RenderFiles files={ files } champions={ champions } />
      </Suspense>
    </div>
  )
}

export default Champions;

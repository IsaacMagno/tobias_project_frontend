import React, { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const ChampSelect = lazy(() => import("../components/ChampionSelect"));

const ChampionSelect = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ChampSelect />
    </Suspense>
  );
};

export default ChampionSelect;

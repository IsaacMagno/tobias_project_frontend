import React, { lazy, Suspense } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";

const RenderAllStats = lazy(() =>
  import("../components/renderComponents/RenderAllStats")
);

const StatsCard = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <RenderAllStats />
      </Suspense>
    </div>
  );
};

export default StatsCard;

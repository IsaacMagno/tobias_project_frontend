import React, { lazy, Suspense } from "react";
import Header from "../components/Header";
import "../styles/StatsCard.css";

const RenderAllStats = lazy(() =>
  import("../components/renderComponents/RenderAllStats")
);

const StatsCard = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <RenderAllStats />
      </Suspense>
    </div>
  );
};

export default StatsCard;

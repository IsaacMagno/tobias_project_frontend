import React, { lazy, Suspense } from "react";
import Header from "../components/Header";
import "../styles/StatsCard.css";

const RenderFiles = lazy(() =>
  import("../components/renderComponents/RenderFiles")
);

const Champions = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <RenderFiles />
      </Suspense>
    </div>
  );
};

export default Champions;

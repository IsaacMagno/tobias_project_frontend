import React, { lazy, Suspense } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";

const RenderFiles = lazy(() =>
  import("../components/renderComponents/RenderFiles")
);

const Champions = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <RenderFiles />
      </Suspense>
    </div>
  );
};

export default Champions;

import React, { useState } from "react";

import MyOwnReactSpreedSheet from "./MyOwnReactSpreedSheet";
import Basic from "./Basic";
import Custom from "./Custom";

const ReactTableComponents = () => {
  const [examples, setexamples] = useState(false);
  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactDataSheet</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        <MyOwnReactSpreedSheet />
        <hr />
        <h2
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => setexamples(prev => !prev)}
        >
          exaples
        </h2>
        <hr />
        {examples && (
          <>
            Basic
            <Basic />
            Custom
            <Custom />
          </>
        )}
      </section>
    </>
  );
};

export default ReactTableComponents;

import React, { useState } from "react";

import MyOwn from "./MyOwn";
import Basic from "./Basic";
import Declare from "./Declare";

const Handsontable = () => {
  const [examples, setexamples] = useState(false);
  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>Handsontable</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        <MyOwn />
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
            <Basic />
            Declare
            <Declare />
          </>
        )}
      </section>
    </>
  );
};

export default Handsontable;

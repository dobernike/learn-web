import React, { useState } from "react";
import BasicSample from "./BasicSample";
import CDNSample from "./CDNSample";
import ConfigSample from "./ConfigSample";
import DataSample from "./DataSample";

const ReactDataSheetComponents = () => {
  const [examples, setexamples] = useState(false);

  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactDataSheet</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        DataSample
        <DataSample />
        <hr />
        <hr />
        <h2
          style={{ textAlign: "center" }}
          onClick={() => setexamples(prev => !prev)}
        >
          exaples
        </h2>
        <hr />
        {examples && (
          <>
            BasicSample
            <BasicSample />
            CDNSample
            <CDNSample />
            ConfigSample
            <ConfigSample />
            DataSample
            <DataSample />
          </>
        )}
      </section>
    </>
  );
};

export default ReactDataSheetComponents;

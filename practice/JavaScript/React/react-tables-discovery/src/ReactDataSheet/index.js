import React, { useState } from "react";

import MyOwnSheet from "./MyOwnSheet";
// import MyOwn from "./MathSheetFC";
import MyOwn from "./MyOwn/MyOwn";
import Test from "./test";
import ReactDatasheet from "./BasicTypescript";
import BasicSheet from "./BasicSheet";
import ComponentSheet from "./ComponentSheet";
import MathSheet from "./MathSheet";
import OverrideEverythingSheet from "./OverrideEverythingSheet";

const ReactDataSheetComponents = () => {
  const [examples, setexamples] = useState(false);

  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactDataSheet</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        <article style={{ padding: "0 5%", backgroundColor: "#F8F8F8" }}>
          <MyOwn />
        </article>
        {/* MyOwnSheet */}
        {/* <MyOwnSheet /> */}
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
            ReactDatasheet
            <ReactDatasheet />
            BasicSheet
            <BasicSheet />
            ComponentSheet
            <ComponentSheet />
            MathSheet
            <MathSheet />
            OverrideEverythingSheet
            <OverrideEverythingSheet />
          </>
        )}
      </section>
    </>
  );
};

export default ReactDataSheetComponents;

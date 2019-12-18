import React from "react";
import MyOwnSheet from "./ReactDataSheet/MyOwnSheet";
import ReactDatasheet from "./ReactDataSheet/BasicTypescript";
import BasicSheet from "./ReactDataSheet/BasicSheet";
import ComponentSheet from "./ReactDataSheet/ComponentSheet";
import MathSheet from "./ReactDataSheet/MathSheet";
import OverrideEverythingSheet from "./ReactDataSheet/OverrideEverythingSheet";

const App: React.FC = () => {
  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactDataSheet</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />

        <MyOwnSheet />

        <hr />
        <h2 style={{ textAlign: "center" }}>exaples</h2>
        <hr />

        <ReactDatasheet />
        <BasicSheet />
        <ComponentSheet />
        <MathSheet />
        <OverrideEverythingSheet />
      </section>
    </>
  );
};

export default App;

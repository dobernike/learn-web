import React from "react";
import MyOwnSheet from "./MyOwnSheet";
import ReactDatasheet from "./BasicTypescript";
import BasicSheet from "./BasicSheet";
import ComponentSheet from "./ComponentSheet";
import MathSheet from "./MathSheet";
import OverrideEverythingSheet from "./OverrideEverythingSheet";

const ReactDataSheetComponents = () => {
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
      </section>
    </>
  );
};

export default ReactDataSheetComponents;

import React, { useState } from "react";

import MyOwnReactDataGrid from "./MyOwnReactDataGrid";

import SimpleGrid from "./SimpleGrid";
import CellFormatting from "./CellFormatting";
import BasicCellEditing from "./BasicCellEditing";
import ColumnResizing from "./ColumnResizing";
import createRowData from "./createRowData";
import FrozenColumns from "./FrozenColumns";
import CellActions from "./CellActions";
import DraggableHeaders from "./DraggableHeaders";
import ColumnSorting from "./ColumnSorting";
import BasicFiltering from "./BasicFiltering";
import AdvancedFiltering from "./AdvancedFiltering";
import BasicColumnGrouping from "./BasicColumnGrouping";

const ReactDataSheetComponents = () => {
  const [examples, setexamples] = useState(false);
  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactDataGrid</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        <MyOwnReactDataGrid />
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
            SimpleGrid
            <SimpleGrid />
            CellFormatting
            <CellFormatting />
            BasicCellEditing
            <BasicCellEditing />
            ColumnResizing
            <ColumnResizing initialRows={createRowData(50)} />
            FrozenColumns
            <FrozenColumns />
            CellActions
            <CellActions rows={createRowData(50)} />
            DraggableHeaders
            <DraggableHeaders />
            ColumnSorting
            <ColumnSorting initialRows={createRowData(50)} />
            BasicFiltering
            <BasicFiltering rows={createRowData(50)} />
            AdvancedFiltering
            <AdvancedFiltering rows={createRowData(50)} />
            BasicColumnGrouping
            <BasicColumnGrouping rows={createRowData(50)} />
          </>
        )}
      </section>
    </>
  );
};

export default ReactDataSheetComponents;

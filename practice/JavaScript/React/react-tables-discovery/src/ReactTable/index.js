import React, { useState } from "react";

// import MyOwnReactTable from "./MyOwnReactTable";
import Basic from "./Basic";
import Footers from "./Footers";
import Sorting from "./Sorting";
import Filtering from "./Filtering";
import Grouping from "./Grouping";
import GroupingColumn from "./GroupingColumn";
import Pagination from "./Pagination";
import RowSelection from "./RowSelection";
import Expanding from "./Expanding";
import SubComponents from "./SubComponents";
import EditableData from "./EditableData";
import ColumnOrdering from "./ColumnOrdering";
import ColumnHiding from "./ColumnHiding";
import ColumnResizing from "./ColumnResizing";
import DataDrivenClassesAndStyles from "./DataDrivenClassesAndStyles";
import RowDnd from "./RowDnd";
import FullWidthTable from "./FullWidthTable";
import FullWidthResizableTable from "./FullWidthResizableTable";
import KitchenSink from "./KitchenSink";
import PaginationControlled from "./PaginationControlled";
import VirtualizedRows from "./VirtualizedRows";
import AnimatedFramerMotion from "./AnimatedFramerMotion";
import MaterialUIComponents from "./MaterialUIComponents";
import FixedColumn from "./FixedColumns";

const ReactTableComponents = () => {
  const [examples, setexamples] = useState(false);
  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>ReactTable</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>test</h2>
        <hr />
        {/* <MyOwnReactTable /> */}
        <VirtualizedRows />
        <KitchenSink />
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
            Footers
            <Footers />
            Sorting
            <Sorting />
            Filtering
            <Filtering />
            Grouping
            <Grouping />
            GroupingColumn
            <GroupingColumn />
            Pagination
            <Pagination />
            RowSelection
            <RowSelection />
            Expanding
            <Expanding />
            SubComponents
            <SubComponents />
            EditableData
            <EditableData />
            ColumnOrdering
            <ColumnOrdering />
            ColumnHiding
            <ColumnHiding />
            ColumnResizing
            <ColumnResizing />
            DataDrivenClassesAndStyles
            <DataDrivenClassesAndStyles />
            RowDnd
            <RowDnd />
            FullWidthTable
            <FullWidthTable />
            FullWidthResizableTable
            <FullWidthResizableTable />
            KitchenSink
            <KitchenSink />
            PaginationControlled
            <PaginationControlled />
            VirtualizedRows
            <VirtualizedRows />
            AnimatedFramerMotion
            <AnimatedFramerMotion />
            MaterialUIComponents
            <MaterialUIComponents />
            FixedColumn
            <FixedColumn />
          </>
        )}
      </section>
    </>
  );
};

export default ReactTableComponents;

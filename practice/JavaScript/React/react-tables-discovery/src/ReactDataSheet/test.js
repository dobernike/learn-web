import React from "react";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import DataCell from "react-datasheet/lib/DataCell";
import { MultiGrid, AutoSizer } from "react-virtualized";

const sampleData = [...Array(1000)].map((_, i) =>
  [...Array(1000)].map((_, j) => ({ value: i + "," + j }))
);

class DataSheet extends ReactDataSheet {
  _setState(state) {
    super._setState(state);
    /* MultiGrid for some reason, only re-render the top-left <Grid> when DataSheet state changes
       Might be similar: https://github.com/bvaughn/react-virtualized/issues/1108 */
    this.grid.forceUpdateGrids();
  }
  render() {
    const {
      attributesRenderer,
      cellRenderer,
      valueRenderer,
      dataRenderer,
      valueViewer,
      dataEditor,
      data
    } = this.props;
    return (
      <div
        style={{ height: "100%", width: "100%", paddingBottom: 45 }}
        ref={r => {
          this.dgDom = r;
        }}
        tabIndex="0"
        className="data-grid-container"
        onKeyDown={this.handleKey.bind(this)}
      >
        <AutoSizer>
          {({ width: sheetWidth, height: sheetHeight }) => (
            <div className="data-grid">
              <MultiGrid
                ref={ref => {
                  this.grid = ref;
                }}
                fixedColumnCount={2}
                fixedRowCount={1}
                cellRenderer={({ key, rowIndex, columnIndex, style }) => {
                  return (
                    <div key={key} style={style}>
                      <DataCell
                        row={rowIndex}
                        col={columnIndex}
                        cell={data[rowIndex][columnIndex]}
                        forceEdit={this.state.forceEdit}
                        onMouseDown={this.onMouseDown}
                        onMouseOver={this.onMouseOver}
                        onDoubleClick={this.onDoubleClick}
                        onContextMenu={this.onContextMenu}
                        onChange={this.onChange}
                        onRevert={this.onRevert}
                        onNavigate={this.handleKeyboardCellMovement}
                        onKey={this.handleKey}
                        selected={this.isSelected(rowIndex, columnIndex)}
                        editing={this.isEditing(rowIndex, columnIndex)}
                        clearing={this.isClearing(rowIndex, columnIndex)}
                        attributesRenderer={attributesRenderer}
                        cellRenderer={cellRenderer}
                        valueRenderer={valueRenderer}
                        dataRenderer={dataRenderer}
                        valueViewer={valueViewer}
                        dataEditor={dataEditor}
                      />
                    </div>
                  );
                }}
                columnWidth={60}
                columnCount={data[0].length}
                height={sheetHeight}
                rowHeight={40}
                rowCount={data.length}
                width={sheetWidth}
                hideTopRightGridScrollbar
                hideBottomLeftGridScrollbar
              />
            </div>
          )}
        </AutoSizer>
      </div>
    );
  }
}

DataSheet.propTypes = {
  ...DataSheet.propTypes,
  sheetRenderer: PropTypes.any,
  rowRenderer: PropTypes.any
};

DataSheet.defaultProps = {
  ...DataSheet.defaultProps,
  sheetRenderer: null, // Not use
  rowRenderer: null, // Not use
  cellRenderer: ({
    // Replace <td> with <div> to suppress React warning
    children,
    cell,
    row,
    col,
    attributesRenderer,
    className,
    style,
    onMouseDown,
    onMouseOver,
    onDoubleClick,
    onContextMenu
  }) => (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      style={style}
      {...(!attributesRenderer ? {} : attributesRenderer(cell, row, col))}
    >
      {children}
    </div>
  )
};

class PricingSheet extends React.PureComponent {
  state = {
    data: sampleData.map(row => [...row])
  };
  render() {
    return (
      <div>
        <h2>Daily price sheet</h2>
        <DataSheet
          data={this.state.data}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const data = this.state.data.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              data[row][col] = { ...data[row][col], value };
            });
            this.setState({ data });
          }}
        />
      </div>
    );
  }
}

export default PricingSheet;

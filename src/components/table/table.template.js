import { storage } from "../../core/utils";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function toCell(state, row) {
  console.log("state", state);

  return function (_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    return `
      <div 
        class="cell"
        contenteditable
        data-col=${col}
        data-type="cell"
        data-id="${id}"
        style="width:${width}"
      >${data || ""}</div>
`;
  };
}

function toColumn({ col, index, width }) {
  return `
        <div 
          class="column"
          data-type="resizable"
          data-col=${index}
          style="width: ${width}"
        >
          ${col}
          <div class="col-resize" data-resize="col"></div>  
        </div>
    `;
}

function createRow(index = "", content = "", state = {}) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  const dataRow = index ? `data-row = ${index}` : null;
  const height = getHeight(state, index);
  return `
    <div 
      class="row"
      data-type="resizable"
      ${dataRow}
      style="height: ${height}"
    >
        <div class="row-info">
          ${index}
          ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

function withWitdhFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = storage("excel-state");

  console.log("columns", columns);

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWitdhFrom(state))
    .map(toColumn)
    // .map((col, index) => {
    //   const width = getWidth(state.colState, index);
    //   return toColumn(col, index, width);
    // })
    .join("");

  rows.push(createRow("", cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const emptyCols = new Array(colsCount)
      .fill("")
      .map(toCell(state, row))
      .join("");
    rows.push(createRow(row + 1, emptyCols, state.rowState));
  }
  return rows.join("");
}

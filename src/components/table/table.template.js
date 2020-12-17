const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, col) {
  return `
        <div class="cell" contenteditable data-col=${col}></div>
    `;
}

function toColumn(col, index) {
  return `
        <div class="column" data-type="resizable" data-col=${index}>
          ${col}
          <div class="col-resize" data-resize="col"></div>  
        </div>
    `;
}

function createRow(info = "", content = "") {
  const resizer = info
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${info}
          ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");

  rows.push(createRow("", cols));

  for (let i = 0; i < rowsCount; i++) {
    const emptyCols = new Array(colsCount).fill("").map(toCell).join("");
    rows.push(createRow(i + 1, emptyCols));
  }
  return rows.join("");
}

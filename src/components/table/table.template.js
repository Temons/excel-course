const CODES = {
  A: 65,
  Z: 90,
};

function toCell(cell) {
  return `
        <div class="cell" contenteditable>${cell}</div>
    `;
}

function toColumn(col) {
  return `
        <div class="column">${col}</div>
    `;
}

function createRow(info = "", content = "") {
  return `
    <div class="row">
        <div class="row-info">${info}</div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

function toCharForCell(_, idx, i) {
  return String.fromCharCode(CODES.A + idx) + i;
}

function emptyCols(i) {
  const colsCount = CODES.Z - CODES.A + 1;

  return new Array(colsCount)
    .fill("")
    .map((el, idx) => toCharForCell(el, idx, i))
    .map(toCell)
    .join("");
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");

  rows.push(createRow("", cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, emptyCols(i + 1)));
  }
  return rows.join("");
}

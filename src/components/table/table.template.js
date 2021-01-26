const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(row, col) {
//   return `
//         <div class="cell" contenteditable data-col=${col}></div>
//     `;
// }

function toCell(row) {
  return function a(_, col) {
    return `
      <div 
        class="cell"
        contenteditable
        data-col=${col}
        data-type="cell"
        data-id="${row}:${col}"
      ></div>
`;
  };
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
  const dataRow = info ? `data-row = ${info}` : null;
  return `
    <div class="row" data-type="resizable" ${dataRow}>
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

  for (let row = 0; row < rowsCount; row++) {
    const emptyCols = new Array(colsCount)
      .fill("")
      // .map((_, col) => toCell(row, col))
      .map(toCell(row))
      .join("");
    rows.push(createRow(row + 1, emptyCols));
  }
  return rows.join("");
}

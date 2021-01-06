import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, shouldResize } from "./table.functions";
import { matrix, TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown", "keydown"],
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    switch (event.keyCode) {
      case 9:
        this.selection.tabClicked($(event.target));
        break;
      case 13:
        this.selection.enterClicked($(event.target), this.$root);
        break;
      case 37:
        this.selection.leftClicked($(event.target), this.$root);
        break;
      case 38:
        this.selection.topClicked($(event.target), this.$root);
        break;
      case 39:
        this.selection.rightClicked($(event.target), this.$root);
        break;
      case 40:
        this.selection.bottomClicked($(event.target), this.$root);
        break;
      default:
        console.log("default");
    }
  }
}

import { $ } from "../../core/dom";
import { range } from "../../core/utils";

export class TableSelection {
  static className = "selected";
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.className);

    console.log("this.current", this.current);
  }

  tabClicked($el) {
    if ($el.$el.nextElementSibling) {
      this.clear();
      this.current = $($el.$el.nextElementSibling);
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
    } else {
      event.preventDefault();
    }
  }

  enterClicked($el, $root) {
    event.preventDefault();
    const id = $el.id(true);
    const newCell = $root.find(`[data-id="${id.row + 1}:${id.col}"]`);

    if (newCell.$el) {
      this.clear();
      this.current = newCell;
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
      this.current.$el.focus();
    }
  }

  leftClicked($el, $root) {
    event.preventDefault();
    const id = $el.id(true);
    const newCell = $root.find(`[data-id="${id.row}:${id.col - 1}"]`);

    if (newCell.$el) {
      this.clear();
      this.current = newCell;
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
      this.current.$el.focus();
    }
  }

  topClicked($el, $root) {
    event.preventDefault();
    const id = $el.id(true);
    const newCell = $root.find(`[data-id="${id.row - 1}:${id.col}"]`);

    if (newCell.$el) {
      this.clear();
      this.current = newCell;
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
      this.current.$el.focus();
    }
  }

  rightClicked($el, $root) {
    event.preventDefault();
    const id = $el.id(true);
    const newCell = $root.find(`[data-id="${id.row}:${id.col + 1}"]`);

    if (newCell.$el) {
      this.clear();
      this.current = newCell;
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
      this.current.$el.focus();
    }
  }

  bottomClicked($el, $root) {
    event.preventDefault();
    const id = $el.id(true);
    const newCell = $root.find(`[data-id="${id.row + 1}:${id.col}"]`);

    if (newCell.$el) {
      this.clear();
      this.current = newCell;
      this.group.push(this.current);
      this.current.addClass(TableSelection.className);
      this.current.$el.focus();
    }
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

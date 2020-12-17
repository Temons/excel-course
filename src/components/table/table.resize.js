import { $ } from "../../core/dom";

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === "col" ? "bottom" : "right";
  let value;

  if (type === "col") {
    const index = $parent.data.col;
    $resizer.css({ [sideProp]: "-2000px", opacity: "1" });
    document.body.style.cursor = "col-resize";

    document.onmousemove = (e) => {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({ right: -delta + "px" });
    };

    document.onmouseup = () => {
      $root
        .findAll(`[data-col="${index}"`)
        .forEach((item) => (item.style.width = value + "px"));

      document.onmousemove = null;
      document.onmouseup = null;

      value = null;
      $resizer.css({
        right: null,
        [sideProp]: "0",
        opacity: "0",
      });

      document.body.style.cursor = "default";
    };
  } else {
    $resizer.css({ [sideProp]: "-2000px", opacity: "1" });
    document.body.style.cursor = "row-resize";

    document.onmousemove = (e) => {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;

      $resizer.css({ bottom: -delta + "px" });
    };

    document.onmouseup = () => {
      $parent.css({ height: value + "px" });

      document.onmousemove = null;
      document.onmouseup = null;
      value = null;
      $resizer.css({
        bottom: null,
        [sideProp]: "0",
        opacity: "0",
      });
      document.body.style.cursor = "default";
    };
  }
}

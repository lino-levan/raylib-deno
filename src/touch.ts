/**
 * Touch utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Vector2 } from "./_util.ts";

/** Touch functions */
export class Touch {
  /** Get touch position X for touch point 0 (relative to screen size) */
  getX() {
    return lib.symbols.GetTouchX();
  }

  /** Get touch position Y for touch point 0 (relative to screen size) */
  getY() {
    return lib.symbols.GetTouchY();
  }

  /** Get touch position XY for a touch point index (relative to screen size) */
  getPosition(index: number) {
    return Vector2.fromBuffer(lib.symbols.GetTouchPosition(index));
  }

  /** Get touch point identifier for given index */
  getId(index: number) {
    return lib.symbols.GetTouchPointId(index);
  }

  /** Get number of touch points */
  getCount() {
    return lib.symbols.GetTouchPointCount();
  }
}

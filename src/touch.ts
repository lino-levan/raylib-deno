/**
 * Touch utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Vector2 } from "./_util.ts";

/** Touch functions */
export class Touch {
  /** Get touch position X for touch point 0 (relative to screen size) */
  static getX(): number {
    return lib.symbols.GetTouchX();
  }

  /** Get touch position Y for touch point 0 (relative to screen size) */
  static getY(): number {
    return lib.symbols.GetTouchY();
  }

  /** Get touch position XY for a touch point index (relative to screen size) */
  static getPosition(index: number): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetTouchPosition(index).buffer);
  }

  /** Get touch point identifier for given index */
  static getId(index: number): number {
    return lib.symbols.GetTouchPointId(index);
  }

  /** Get number of touch points */
  static getCount(): number {
    return lib.symbols.GetTouchPointCount();
  }
}

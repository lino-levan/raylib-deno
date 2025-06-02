/**
 * Mouse functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Vector2 } from "./_util.ts";

const cursorShapes = {
  default: 0,
  arrow: 1,
  ibeam: 2,
  crosshair: 3,
  pointingHand: 4,
  resizeEW: 5,
  resizeNS: 6,
  resizeNWSE: 7,
  resizeNESW: 8,
  resizeAll: 9,
  notAllowed: 10,
};

export type CursorShape = keyof typeof cursorShapes;

/** A simple class for interacting with the mouse */
export class Mouse {
  /** Check if a mouse button has been pressed once */
  static isButtonPressed(button: number): boolean {
    return !!lib.symbols.IsMouseButtonPressed(button);
  }

  /** Check if a mouse button is being pressed */
  static isButtonDown(button: number): boolean {
    return !!lib.symbols.IsMouseButtonDown(button);
  }

  /** Check if a mouse button has been released once */
  static isButtonReleased(button: number): boolean {
    return !!lib.symbols.IsMouseButtonReleased(button);
  }

  /** Check if a mouse button is NOT being pressed */
  static isButtonUp(button: number): boolean {
    return !!lib.symbols.IsMouseButtonUp(button);
  }

  /** Get mouse position X */
  static getX(): number {
    return lib.symbols.GetMouseX();
  }

  /** Get mouse position Y */
  static getY(): number {
    return lib.symbols.GetMouseY();
  }

  /** Get mouse position XY */
  static getPosition(): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetMousePosition().buffer);
  }

  /** Get mouse delta between frames */
  static getDelta(): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetMouseDelta().buffer);
  }

  /** Set mouse position XY */
  static setPosition(x: number, y: number) {
    lib.symbols.SetMousePosition(x, y);
  }

  /** Set mouse offset */
  static setOffset(offsetX: number, offsetY: number) {
    lib.symbols.SetMouseOffset(offsetX, offsetY);
  }

  /** Set mouse scaling */
  static setScale(scaleX: number, scaleY: number) {
    lib.symbols.SetMouseScale(scaleX, scaleY);
  }

  /** Get mouse wheel movement for X or Y, whichever is larger */
  static getWheelMove(): number {
    return lib.symbols.GetMouseWheelMove();
  }

  /** Get mouse wheel movement for both X and Y */
  static getWheelMoveV(): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetMouseWheelMoveV().buffer);
  }

  /** Set mouse cursor */
  static setCursor(cursor: CursorShape) {
    lib.symbols.SetMouseCursor(cursorShapes[cursor]);
  }
}

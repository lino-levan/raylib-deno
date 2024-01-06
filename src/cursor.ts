/**
 * Cursor-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";

/** A simple class for interacting with the cursor */
export class Cursor {
  /** Shows cursor */
  static show() {
    lib.symbols.ShowCursor();
  }

  /** Hides cursor */
  static hide() {
    lib.symbols.HideCursor();
  }

  /** Check if cursor is not visible */
  static isHidden() {
    return !!lib.symbols.IsCursorHidden();
  }

  /** Enables cursor (unlock cursor) */
  static enable() {
    lib.symbols.EnableCursor();
  }

  /** Disables cursor (lock cursor) */
  static disable() {
    lib.symbols.DisableCursor();
  }

  /** Check if cursor is on the current screen. */
  static isOnScreen() {
    return !!lib.symbols.IsCursorOnScreen();
  }
}

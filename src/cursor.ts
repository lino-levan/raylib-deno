/**
 * Cursor-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";

/** Shows cursor */
export function showCursor() {
  lib.symbols.ShowCursor();
}

/** Hides cursor */
export function hideCursor() {
  lib.symbols.HideCursor();
}

/** Check if cursor is not visible */
export function isCursorHidden() {
  return !!lib.symbols.IsCursorHidden();
}

/** Enables cursor (unlock cursor) */
export function enableCursor() {
  lib.symbols.EnableCursor();
}

/** Disables cursor (lock cursor) */
export function disableCursor() {
  lib.symbols.DisableCursor();
}

/** Check if cursor is on the current screen. */
export function isCursorOnScreen() {
  return !!lib.symbols.IsCursorOnScreen();
}

/**
 * Keyboard functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

// Keyboard keys (US keyboard layout)
// NOTE: Use GetKeyPressed() to allow redefining
// required keys for alternative layouts
const keyboardKey = {
  apostrophe: 39,
  comma: 44,
  minus: 45,
  period: 46,
  slash: 47,
  zero: 48,
  one: 49,
  two: 50,
  three: 51,
  four: 52,
  five: 53,
  six: 54,
  seven: 55,
  eight: 56,
  nine: 57,
  semicolon: 59,
  equal: 61,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftBracket: 91,
  backslash: 92,
  rightBracket: 93,
  grave: 96,
  space: 32,
  escape: 256,
  enter: 257,
  tab: 258,
  backspace: 259,
  insert: 260,
  delete: 261,
  right: 262,
  left: 263,
  down: 264,
  up: 265,
  pageUp: 266,
  pageDown: 267,
  home: 268,
  end: 269,
  capsLock: 280,
  scrollLock: 281,
  numLock: 282,
  printScreen: 283,
  pause: 284,
  f1: 290,
  f2: 291,
  f3: 292,
  f4: 293,
  f5: 294,
  f6: 295,
  f7: 296,
  f8: 297,
  f9: 298,
  f10: 299,
  f11: 300,
  f12: 301,
  leftShift: 340,
  leftControl: 341,
  leftAlt: 342,
  leftSuper: 343,
  rightShift: 344,
  rightControl: 345,
  rightAlt: 346,
  rightSuper: 347,
  kbMenu: 348,
  kp0: 320,
  kp1: 321,
  kp2: 322,
  kp3: 323,
  kp4: 324,
  kp5: 325,
  kp6: 326,
  kp7: 327,
  kp8: 328,
  kp9: 329,
  kpDecimal: 330,
  kpDivide: 331,
  kpMultiply: 332,
  kpSubtract: 333,
  kpAdd: 334,
  kpEnter: 335,
  kpEqual: 336,
  back: 4,
  menu: 82,
  volumeUp: 24,
  volumeDown: 25,
};

export type KeyboardKey = keyof typeof keyboardKey;

/** A simple class for interacting with the keyboard */
export class Keyboard {
  /** Check if a key has been pressed once */
  static isKeyPressed(key: KeyboardKey) {
    return !!lib.symbols.IsKeyPressed(keyboardKey[key]);
  }

  /** Check if a key has been pressed again */
  static isKeyPressedRepeat(key: KeyboardKey) {
    return !!lib.symbols.IsKeyPressedRepeat(keyboardKey[key]);
  }

  /** Check if a key is being pressed */
  static isKeyDown(key: KeyboardKey) {
    return !!lib.symbols.IsKeyDown(keyboardKey[key]);
  }

  /** Check if a key has been released once */
  static isKeyReleased(key: KeyboardKey) {
    return !!lib.symbols.IsKeyReleased(keyboardKey[key]);
  }

  /** Check if a key is NOT being pressed */
  static isKeyUp(key: KeyboardKey) {
    return !!lib.symbols.IsKeyUp(keyboardKey[key]);
  }

  /** Get key pressed (keycode), call it multiple times for keys queued, returns null when the queue is empty */
  static getKeyPressed() {
    return lib.symbols.GetKeyPressed() ?? null;
  }

  /** Get char pressed (unicode), call it multiple times for chars queued, returns null when the queue is empty */
  static getCharPressed() {
    return lib.symbols.GetCharPressed() ?? null;
  }

  /** Set a custom key to exit program (default is ESC) */
  static setExitKey(key: KeyboardKey) {
    lib.symbols.SetExitKey(keyboardKey[key]);
  }
}

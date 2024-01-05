/**
 * Timing-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";

/** Set target FPS (maximum) */
export function setTargetFPS(fps: number) {
  lib.symbols.SetTargetFPS(fps);
}

/** Get time in seconds for last frame drawn (delta time) */
export function getFrameTime() {
  return lib.symbols.GetFrameTime();
}

/** Get elapsed time in seconds since InitWindow() */
export function getTime() {
  return lib.symbols.GetTime();
}

/** Returns current FPS */
export function getFPS() {
  return lib.symbols.GetFPS();
}

/**
 * A module for interacting with the timing system
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** A simple class for interacting with timings */
export class Timing {
  /** Set target FPS (maximum) */
  static setTargetFPS(fps: number) {
    lib.symbols.SetTargetFPS(fps);
  }

  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime() {
    return lib.symbols.GetFrameTime();
  }

  /** Get elapsed time in seconds since InitWindow() */
  static getTime() {
    return lib.symbols.GetTime();
  }

  /** Returns current FPS */
  static getFPS() {
    return lib.symbols.GetFPS();
  }
}

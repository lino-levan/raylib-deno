/**
 * A module for interacting with the timing system
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** A simple class for interacting with timings */
export class Timing {
  /** Set target FPS (maximum) */
  static setTargetFPS(fps: number): void {
    lib.symbols.SetTargetFPS(fps);
  }

  /** Get time in seconds for last frame drawn (delta time) */
  static getFrameTime(): number {
    return lib.symbols.GetFrameTime();
  }

  /** Get elapsed time in seconds since InitWindow() */
  static getTime(): number {
    return lib.symbols.GetTime();
  }

  /** Returns current FPS */
  static getFPS(): number {
    return lib.symbols.GetFPS();
  }
}

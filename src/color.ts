/**
 * Color-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";

import { Vector3, Vector4 } from "./_util.ts";

export class Color {
  #buffer: Uint8Array<ArrayBuffer>;

  constructor(r: number, g: number, b: number, a: number) {
    this.#buffer = new Uint8Array([r, g, b, a]);
  }

  /** Unstable: only used internally */
  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /** Unstable: only used internally */
  static fromBuffer(view: Uint8Array<ArrayBuffer>): Color {
    return new Color(view[0], view[1], view[2], view[3]);
  }

  /** Get Color from normalized values [0..1] */
  static fromNormalized(normalized: Vector4): Color {
    return Color.fromBuffer(
      lib.symbols.ColorFromNormalized(normalized.buffer),
    );
  }

  /** Get a Color from HSV values, hue [0..360], saturation/value [0..1] */
  static fromHSV(hue: number, saturation: number, value: number): Color {
    return Color.fromBuffer(
      lib.symbols.ColorFromHSV(hue, saturation, value),
    );
  }

  /** Get hexadecimal value for a Color */
  toInt(): number {
    return lib.symbols.ColorToInt(this.#buffer);
  }

  /** Get HSV values for a Color, hue [0..360], saturation/value [0..1] */
  toHSV(): Vector3 {
    return Vector3.fromBuffer(lib.symbols.ColorToHSV(this.#buffer));
  }

  /** Get color with alpha applied, alpha goes from 0.0f to 1.0f */
  fade(alpha: number): Color {
    return Color.fromBuffer(lib.symbols.Fade(this.#buffer, alpha));
  }

  /** Get Color normalized as float [0..1] */
  normalize(): Vector4 {
    return Vector4.fromBuffer(lib.symbols.ColorNormalize(this.#buffer).buffer);
  }

  /** Get color multiplied with another color */
  tint(tint: Color): Color {
    return Color.fromBuffer(
      lib.symbols.ColorTint(this.#buffer, tint.#buffer),
    );
  }

  /** Get color with brightness correction, brightness factor goes from -1.0f to 1.0f */
  brightness(factor: number): Color {
    return Color.fromBuffer(
      lib.symbols.ColorBrightness(this.#buffer, factor),
    );
  }

  /** Get color with contrast correction, contrast values between -1.0f and 1.0f */
  contrast(factor: number): Color {
    return Color.fromBuffer(
      lib.symbols.ColorContrast(this.#buffer, factor),
    );
  }

  /** Get color with alpha applied, alpha goes from 0.0f to 1.0f */
  alpha(alpha: number): Color {
    return Color.fromBuffer(lib.symbols.ColorAlpha(this.#buffer, alpha));
  }

  /** Get src alpha-blended into dst color with tint */
  alphaBlend(src: Color, tint: Color): Color {
    return Color.fromBuffer(
      lib.symbols.ColorAlphaBlend(this.#buffer, src.#buffer, tint.#buffer),
    );
  }
}

// TODO
// RLAPI Color GetPixelColor(void *srcPtr, int format);                        // Get Color from a source pixel pointer of certain format
// RLAPI void SetPixelColor(void *dstPtr, Color color, int format);            // Set color formatted into destination pixel pointer
// RLAPI int GetPixelDataSize(int width, int height, int format);              // Get pixel data size in bytes for certain format

export const LIGHTGRAY: Color = new Color(200, 200, 200, 255);
export const GRAY: Color = new Color(130, 130, 130, 255);
export const DARKGRAY: Color = new Color(80, 80, 80, 255);
export const YELLOW: Color = new Color(253, 249, 0, 255);
export const GOLD: Color = new Color(255, 203, 0, 255);
export const ORANGE: Color = new Color(255, 161, 0, 255);
export const PINK: Color = new Color(255, 109, 194, 255);
export const RED: Color = new Color(230, 41, 55, 255);
export const MAROON: Color = new Color(190, 33, 55, 255);
export const GREEN: Color = new Color(0, 228, 48, 255);
export const LIME: Color = new Color(0, 158, 47, 255);
export const DARKGREEN: Color = new Color(0, 117, 44, 255);
export const SKYBLUE: Color = new Color(102, 191, 255, 255);
export const BLUE: Color = new Color(0, 121, 241, 255);
export const DARKBLUE: Color = new Color(0, 82, 172, 255);
export const PURPLE: Color = new Color(200, 122, 255, 255);
export const VIOLET: Color = new Color(135, 60, 190, 255);
export const DARKPURPLE: Color = new Color(112, 31, 126, 255);
export const BEIGE: Color = new Color(211, 176, 131, 255);
export const BROWN: Color = new Color(127, 106, 79, 255);
export const DARKBROWN: Color = new Color(76, 63, 47, 255);
export const WHITE: Color = new Color(255, 255, 255, 255);
export const BLACK: Color = new Color(0, 0, 0, 255);
export const BLANK: Color = new Color(0, 0, 0, 0);
export const MAGENTA: Color = new Color(255, 0, 255, 255);
export const RAYWHITE: Color = new Color(245, 245, 245, 255);

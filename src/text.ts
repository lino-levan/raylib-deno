/**
 * Text utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Color } from "./color.ts";
import { Font } from "./font.ts";
import { Vector2 } from "./_util.ts";

/** Text-related functions */
export class Text {
  /** Draw current FPS */
  static drawFPS(x: number, y: number) {
    lib.symbols.DrawFPS(x, y);
  }

  /** Draw text (using default font) */
  static drawText(
    text: string,
    x: number,
    y: number,
    fontSize: number,
    color: Color,
  ) {
    lib.symbols.DrawText(
      new TextEncoder().encode(text + "\0"),
      x,
      y,
      fontSize,
      color.buffer,
    );
  }

  /** Draw text using font and additional parameters */
  static drawTextEx(
    font: Font,
    text: string,
    position: Vector2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ) {
    lib.symbols.DrawTextEx(
      font.buffer,
      new TextEncoder().encode(text + "\0"),
      position.buffer,
      fontSize,
      spacing,
      tint.buffer,
    );
  }

  /** Draw text using Font and pro parameters (rotation) */
  static drawTextPro(
    font: Font,
    text: string,
    position: Vector2,
    origin: Vector2,
    rotation: number,
    fontSize: number,
    spacing: number,
    tint: Color,
  ) {
    lib.symbols.DrawTextPro(
      font.buffer,
      new TextEncoder().encode(text + "\0"),
      position.buffer,
      origin.buffer,
      rotation,
      fontSize,
      spacing,
      tint.buffer,
    );
  }

  /** Set vertical line spacing when drawing with line-breaks */
  static setTextLineSpacing(spacing: number) {
    lib.symbols.SetTextLineSpacing(spacing);
  }

  /** Measure string width for default font */
  static measureText(text: string, fontSize: number): number {
    return lib.symbols.MeasureText(
      new TextEncoder().encode(text + "\0"),
      fontSize,
    );
  }

  /** Measure string size for Font */
  static measureTextEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
  ): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.MeasureTextEx(
        font.buffer,
        new TextEncoder().encode(text + "\0"),
        fontSize,
        spacing,
      ),
    );
  }
}

// TODO
// RLAPI void DrawTextCodepoint(Font font, int codepoint, Vector2 position, float fontSize, Color tint); // Draw one character (codepoint)
// RLAPI void DrawTextCodepoints(Font font, const int *codepoints, int codepointCount, Vector2 position, float fontSize, float spacing, Color tint); // Draw multiple character (codepoint)
// RLAPI int GetGlyphIndex(Font font, int codepoint);                                          // Get glyph index position in font for a codepoint (unicode character), fallback to '?' if not found
// RLAPI GlyphInfo GetGlyphInfo(Font font, int codepoint);                                     // Get glyph font info data for a codepoint (unicode character), fallback to '?' if not found
// RLAPI Rectangle GetGlyphAtlasRec(Font font, int codepoint);                                 // Get glyph rectangle in font atlas for a codepoint (unicode character), fallback to '?' if not found

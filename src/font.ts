/**
 * Font utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** Font loading/unloading functions */
export class Font {
  #buffer: Uint8Array<ArrayBuffer>;

  /** Avoid using this constructor directly. */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /** Get the default Font */
  static getDefault(): Font {
    return new Font(lib.symbols.GetFontDefault());
  }

  /** Load font from file into GPU memory (VRAM) */
  static load(fileName: string): Font {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return new Font(lib.symbols.LoadFont(encodedFileName));
  }

  /** Load font from file with extended parameters, use null for codepoints and 0 for codepointCount to load the default character set */
  static loadEx(
    fileName: string,
    fontSize: number,
    options?: { codepoints: number[] },
  ): Font {
    const codepoints = options?.codepoints
      ? Deno.UnsafePointer.of(new Uint32Array(options.codepoints))
      : null;
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return new Font(
      lib.symbols.LoadFontEx(
        encodedFileName,
        fontSize,
        codepoints,
        options?.codepoints?.length ?? 0,
      ),
    );
  }

  /** Check if a font is ready */
  isReady(): boolean {
    return !!lib.symbols.IsFontReady(this.#buffer);
  }

  /** Unload Font from GPU memory (VRAM) */
  unload(): void {
    lib.symbols.UnloadFont(this.#buffer);
  }

  /** Export font as code file, returns true on success */
  exportAsCode(fileName: string): boolean {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return !!lib.symbols.ExportFontAsCode(this.#buffer, encodedFileName);
  }
}

// TODO
// RLAPI Font LoadFontFromImage(Image image, Color key, int firstChar);                        // Load font from Image (XNA style)
// RLAPI Font LoadFontFromMemory(const char *fileType, const unsigned char *fileData, int dataSize, int fontSize, int *codepoints, int codepointCount); // Load font from memory buffer, fileType refers to extension: i.e. '.ttf'
// RLAPI GlyphInfo *LoadFontData(const unsigned char *fileData, int dataSize, int fontSize, int *codepoints, int codepointCount, int type); // Load font data for further use
// RLAPI Image GenImageFontAtlas(const GlyphInfo *glyphs, Rectangle **glyphRecs, int glyphCount, int fontSize, int padding, int packMethod); // Generate image font atlas using chars info
// RLAPI void UnloadFontData(GlyphInfo *glyphs, int glyphCount);                               // Unload font chars info data (RAM)

/**
 * Texture utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Rectangle, Vector2 } from "./_util.ts";
import { Color } from "./color.ts";
import { Image } from "./image.ts";

const nPatchLayout = {
  ninePatch: 0,
  threePatchVertical: 1,
  threePatchHorizontal: 2,
};

/** The method to use when scaling textures */
export type NPatchLayout = keyof typeof nPatchLayout;

/** A small class for use with scaling textures nicely */
export class NPatchInfo {
  constructor(
    /** Texture source rectangle */
    public source: Rectangle,
    /** Left border offset */
    public left: number,
    /** Top border offset */
    public top: number,
    /** Right border offset */
    public right: number,
    /**  Bottom border offset */
    public bottom: number,
    /** Layout of the n-patch: 3x3, 1x3 or 3x1 */
    public layout: NPatchLayout,
  ) {}

  get buffer() {
    const view = new DataView(new ArrayBuffer(36));
    view.setFloat32(0, this.source.x);
    view.setFloat32(4, this.source.y);
    view.setFloat32(8, this.source.width);
    view.setFloat32(12, this.source.height);
    view.setInt32(16, this.left);
    view.setInt32(20, this.top);
    view.setInt32(24, this.right);
    view.setInt32(28, this.bottom);
    view.setInt32(32, nPatchLayout[this.layout]);
    return view.buffer;
  }
}

const textureFilter = {
  point: 0,
  bilinear: 1,
  trilinear: 2,
  anisotropic4x: 3,
  anisotropic8x: 4,
  anisotropic16x: 5,
};

export type TextureFilter = keyof typeof textureFilter;

const textureWrap = {
  repeat: 0,
  clamp: 1,
  mirrorRepeat: 2,
  mirrorClamp: 3,
};

export type TextureWrap = keyof typeof textureWrap;

/** The class to create and mess with Texture2D instances */
export class Texture2D {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Load texture from file into GPU memory (VRAM) */
  static load(fileName: string) {
    return new Texture2D(
      lib.symbols.LoadTexture(new TextEncoder().encode(fileName + "\0")),
    );
  }

  /** Load texture from image data */
  static loadFromImage(image: Image) {
    return new Texture2D(lib.symbols.LoadTextureFromImage(image.buffer));
  }

  /** Check if a texture is ready */
  isReady() {
    return !!lib.symbols.IsTextureReady(this.#buffer);
  }

  /** Unload texture from GPU memory (VRAM) */
  unload() {
    lib.symbols.UnloadTexture(this.#buffer);
  }

  /** Update GPU texture with new data */
  update(pixels: ArrayBuffer) {
    lib.symbols.UpdateTexture(this.#buffer, pixels);
  }

  /** Update GPU texture rectangle with new data */
  updateRectangle(rect: Rectangle, pixels: ArrayBuffer) {
    lib.symbols.UpdateTextureRec(
      this.#buffer,
      rect.buffer,
      pixels,
    );
  }

  /** Generate GPU mipmaps for a texture */
  genMipmaps() {
    lib.symbols.GenTextureMipmaps(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Set texture scaling filter mode */
  setFilter(filter: TextureFilter) {
    lib.symbols.SetTextureFilter(this.#buffer, textureFilter[filter]);
  }

  /** Set texture wrapping mode */
  setWrap(wrap: TextureWrap) {
    lib.symbols.SetTextureWrap(this.#buffer, textureWrap[wrap]);
  }

  /** Draw a Texture2D */
  draw(posX: number, posY: number, tint: Color) {
    lib.symbols.DrawTexture(this.#buffer, posX, posY, tint.buffer);
  }

  /** Draw a Texture2D with position defined as Vector2 */
  drawV(position: Vector2, tint: Color) {
    lib.symbols.DrawTextureV(this.#buffer, position.buffer, tint.buffer);
  }

  /** Draw a Texture2D with extended parameters */
  drawEx(position: Vector2, rotation: number, scale: number, tint: Color) {
    lib.symbols.DrawTextureEx(
      this.#buffer,
      position.buffer,
      rotation,
      scale,
      tint.buffer,
    );
  }

  /** Draw a part of a texture defined by a rectangle */
  drawRect(source: Rectangle, position: Vector2, tint: Color) {
    lib.symbols.DrawTextureRec(
      this.#buffer,
      source.buffer,
      position.buffer,
      tint.buffer,
    );
  }

  /** Draw a part of a texture defined by a rectangle with 'pro' parameters */
  drawPro(
    source: Rectangle,
    dest: Rectangle,
    origin: Vector2,
    rotation: number,
    tint: Color,
  ) {
    lib.symbols.DrawTexturePro(
      this.#buffer,
      source.buffer,
      dest.buffer,
      origin.buffer,
      rotation,
      tint.buffer,
    );
  }

  /**  Draws a texture (or part of it) that stretches or shrinks nicely */
  drawNPatch(
    nPatchInfo: NPatchInfo,
    dest: Rectangle,
    origin: Vector2,
    rotation: number,
    tint: Color,
  ) {
    lib.symbols.DrawTextureNPatch(
      this.#buffer,
      nPatchInfo.buffer,
      dest.buffer,
      origin.buffer,
      rotation,
      tint.buffer,
    );
  }
}

const textureCubemapLayout = {
  auto: 0, // Automatically detect layout type
  lineVertical: 1, // Layout is defined by a vertical line with faces
  lineHorizontal: 2, // Layout is defined by a horizontal line with faces
  crossThreeByFour: 3, // Layout is defined by a 3x4 cross with cubemap faces
  crossFourByThree: 4, // Layout is defined by a 4x3 cross with cubemap faces
  panorama: 5, // Layout is defined by a panorama image (equirrectangular map)
};

export type TextureCubemapLayout = keyof typeof textureCubemapLayout;

/** Class to create TextureCubemap instances */
export class TextureCubemap {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Load cubemap from image, multiple image cubemap layouts supported */
  static load(image: Image, layout: TextureCubemapLayout) {
    return new TextureCubemap(
      lib.symbols.LoadTextureCubemap(
        image.buffer,
        textureCubemapLayout[layout],
      ),
    );
  }
}

/** Class to create RenderTexture2D instances */
export class RenderTexture2D {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Load texture for rendering (framebuffer) */
  static load(width: number, height: number) {
    return new RenderTexture2D(lib.symbols.LoadRenderTexture(width, height));
  }

  /** Check if a render texture is ready */
  isReady() {
    return !!lib.symbols.IsRenderTextureReady(this.#buffer);
  }

  /** Unload render texture from GPU memory (VRAM) */
  unload() {
    lib.symbols.UnloadRenderTexture(this.#buffer);
  }
}

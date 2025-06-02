/**
 * Image utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import type { Font } from "./font.ts";
import { Color } from "./color.ts";
import { Rectangle, type Vector2 } from "./_util.ts";
import type { Texture2D } from "./texture.ts";
import { littleEndian } from "./_helper.ts";

/** Image functions */
export class Image {
  #buffer: Uint8Array<ArrayBuffer>;

  /** Avoid using if possible */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  get width(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getInt32(8, littleEndian);
  }

  get height(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getInt32(12, littleEndian);
  }

  /** Load image from file into CPU memory (RAM) */
  static load(fileName: string): Image {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return new Image(lib.symbols.LoadImage(encodedFileName));
  }

  /** Load image from RAW file data */
  static loadRaw(
    fileName: string,
    width: number,
    height: number,
    format: number,
    headerSize: number,
  ): Image {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return new Image(
      lib.symbols.LoadImageRaw(
        encodedFileName,
        width,
        height,
        format,
        headerSize,
      ),
    );
  }

  /** Load image from SVG file data or string with specified size */
  static loadSvg(
    fileNameOrString: string,
    width: number,
    height: number,
  ): Image {
    const encodedFileNameOrString = new TextEncoder().encode(
      fileNameOrString + "\0",
    );
    return new Image(
      lib.symbols.LoadImageSvg(
        encodedFileNameOrString,
        width,
        height,
      ),
    );
  }

  /** Load image from memory buffer, fileType refers to extension: i.e. '.png' */
  static loadFromMemory(fileType: string, fileData: Uint8Array): Image {
    const encodedFileType = new TextEncoder().encode(fileType + "\0");
    return new Image(
      lib.symbols.LoadImageFromMemory(
        encodedFileType,
        Deno.UnsafePointer.of(fileData),
        fileData.length,
      ),
    );
  }

  /** Load image from GPU texture data */
  static loadFromTexture(texture: Texture2D): Image {
    return new Image(lib.symbols.LoadImageFromTexture(texture.buffer));
  }

  /** Load image from screen buffer and (screenshot) */
  static loadFromScreen(): Image {
    return new Image(lib.symbols.LoadImageFromScreen());
  }

  /** Check if an image is ready */
  isReady(): boolean {
    return !!lib.symbols.IsImageReady(this.#buffer);
  }

  /** Unload image from CPU memory (RAM) */
  unload(): void {
    lib.symbols.UnloadImage(this.#buffer);
  }

  /** Export image data to file, returns true on success */
  export(fileName: string): boolean {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return !!lib.symbols.ExportImage(this.#buffer, encodedFileName);
  }

  /** Export image as code file defining an array of bytes, returns true on success */
  exportAsCode(fileName: string): boolean {
    const encodedFileName = new TextEncoder().encode(fileName + "\0");
    return !!lib.symbols.ExportImageAsCode(this.#buffer, encodedFileName);
  }

  /** Generate image: plain color */
  static genColor(width: number, height: number, color: Color): Image {
    return new Image(lib.symbols.GenImageColor(width, height, color.buffer));
  }

  /** Generate image: linear gradient, direction in degrees [0..360], 0=Vertical gradient */
  static genGradientLinear(
    width: number,
    height: number,
    direction: number,
    start: Color,
    end: Color,
  ): Image {
    return new Image(
      lib.symbols.GenImageGradientLinear(
        width,
        height,
        direction,
        start.buffer,
        end.buffer,
      ),
    );
  }

  /** Generate image: radial gradient */
  static genGradientRadial(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return new Image(
      lib.symbols.GenImageGradientRadial(
        width,
        height,
        density,
        inner.buffer,
        outer.buffer,
      ),
    );
  }

  /** Generate image: square gradient */
  static genGradientSquare(
    width: number,
    height: number,
    density: number,
    inner: Color,
    outer: Color,
  ): Image {
    return new Image(
      lib.symbols.GenImageGradientSquare(
        width,
        height,
        density,
        inner.buffer,
        outer.buffer,
      ),
    );
  }

  /** Generate image: checked */
  static genChecked(
    width: number,
    height: number,
    checksX: number,
    checksY: number,
    col1: Color,
    col2: Color,
  ): Image {
    return new Image(
      lib.symbols.GenImageChecked(
        width,
        height,
        checksX,
        checksY,
        col1.buffer,
        col2.buffer,
      ),
    );
  }

  /** Generate image: white noise */
  static genWhiteNoise(width: number, height: number, factor: number): Image {
    return new Image(lib.symbols.GenImageWhiteNoise(width, height, factor));
  }

  /** Generate image: perlin noise */
  static genPerlinNoise(
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    scale: number,
  ): Image {
    return new Image(
      lib.symbols.GenImagePerlinNoise(width, height, offsetX, offsetY, scale),
    );
  }

  /** Generate image: cellular algorithm. Bigger tileSize means bigger cells */
  static genCellular(width: number, height: number, tileSize: number): Image {
    return new Image(lib.symbols.GenImageCellular(width, height, tileSize));
  }

  /** Generate image: grayscale image from text data */
  static genText(width: number, height: number, text: string): Image {
    const encodedText = new TextEncoder().encode(text + "\0");
    return new Image(lib.symbols.GenImageText(width, height, encodedText));
  }

  /** Create an image duplicate (useful for transformations) */
  copy(): Image {
    return new Image(lib.symbols.ImageCopy(this.#buffer));
  }

  /** Create an image from another image piece */
  fromImage(rect: Rectangle): Image {
    return new Image(lib.symbols.ImageFromImage(this.#buffer, rect.buffer));
  }

  /** Create an image from text (default font) */
  static text(text: string, fontSize: number, color: Color): Image {
    const encodedText = new TextEncoder().encode(text + "\0");
    return new Image(
      lib.symbols.ImageText(encodedText, fontSize, color.buffer),
    );
  }

  /** Create an image from text (custom sprite font) */
  static textEx(
    font: Font,
    text: string,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): Image {
    const encodedText = new TextEncoder().encode(text + "\0");
    return new Image(
      lib.symbols.ImageTextEx(
        font.buffer,
        encodedText,
        fontSize,
        spacing,
        tint.buffer,
      ),
    );
  }

  /** Draw a source image within a destination image */
  format(newFormat: number): void {
    lib.symbols.ImageFormat(Deno.UnsafePointer.of(this.#buffer), newFormat);
  }

  /** Convert image to POT (power-of-two) */
  toPOT(fill: Color): void {
    lib.symbols.ImageToPOT(Deno.UnsafePointer.of(this.#buffer), fill.buffer);
  }

  /** Crop an image to a defined rectangle */
  crop(rect: Rectangle): void {
    lib.symbols.ImageCrop(Deno.UnsafePointer.of(this.#buffer), rect.buffer);
  }

  /** Crop image depending on alpha value */
  alphaCrop(threshold: number): void {
    lib.symbols.ImageAlphaCrop(Deno.UnsafePointer.of(this.#buffer), threshold);
  }

  /** Clear alpha channel to desired color */
  alphaClear(color: Color, threshold: number): void {
    lib.symbols.ImageAlphaClear(
      Deno.UnsafePointer.of(this.#buffer),
      color.buffer,
      threshold,
    );
  }

  /** Apply alpha mask to image */
  alphaMask(alphaMask: Image): void {
    lib.symbols.ImageAlphaMask(
      Deno.UnsafePointer.of(this.#buffer),
      alphaMask.buffer,
    );
  }

  /** Premultiply alpha channel */
  alphaPremultiply(): void {
    lib.symbols.ImageAlphaPremultiply(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Apply Gaussian blur using a box blur approximation */
  blurGaussian(blurSize: number): void {
    lib.symbols.ImageBlurGaussian(
      Deno.UnsafePointer.of(this.#buffer),
      blurSize,
    );
  }

  /** Resize image (Bicubic scaling algorithm) */
  resize(newWidth: number, newHeight: number): void {
    lib.symbols.ImageResize(
      Deno.UnsafePointer.of(this.#buffer),
      newWidth,
      newHeight,
    );
  }

  /** Resize image (Nearest-Neighbor scaling algorithm) */
  resizeNN(newWidth: number, newHeight: number): void {
    lib.symbols.ImageResizeNN(
      Deno.UnsafePointer.of(this.#buffer),
      newWidth,
      newHeight,
    );
  }

  /** Resize canvas and fill with color */
  resizeCanvas(
    newWidth: number,
    newHeight: number,
    offsetX: number,
    offsetY: number,
    fill: Color,
  ): void {
    lib.symbols.ImageResizeCanvas(
      Deno.UnsafePointer.of(this.#buffer),
      newWidth,
      newHeight,
      offsetX,
      offsetY,
      fill.buffer,
    );
  }

  /** Generate all mipmap levels for a provided image */
  mipmaps(): void {
    lib.symbols.ImageMipmaps(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Dither image data to 16bpp or lower (Floyd-Steinberg dithering) */
  dither(rBpp: number, gBpp: number, bBpp: number, aBpp: number): void {
    lib.symbols.ImageDither(
      Deno.UnsafePointer.of(this.#buffer),
      rBpp,
      gBpp,
      bBpp,
      aBpp,
    );
  }

  /** Flip image vertically */
  flipVertical(): void {
    lib.symbols.ImageFlipVertical(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Flip image horizontally */
  flipHorizontal(): void {
    lib.symbols.ImageFlipHorizontal(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Rotate image by input angle in degrees (-359 to 359) */
  rotate(degrees: number): void {
    lib.symbols.ImageRotate(Deno.UnsafePointer.of(this.#buffer), degrees);
  }

  /** Rotate image clockwise 90deg */
  rotateCW(): void {
    lib.symbols.ImageRotateCW(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Rotate image counter-clockwise 90deg */
  rotateCCW(): void {
    lib.symbols.ImageRotateCCW(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Modify image color: tint */
  colorTint(color: Color): void {
    lib.symbols.ImageColorTint(
      Deno.UnsafePointer.of(this.#buffer),
      color.buffer,
    );
  }

  /** Modify image color: invert */
  colorInvert(): void {
    lib.symbols.ImageColorInvert(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Modify image color: grayscale */
  colorGrayscale(): void {
    lib.symbols.ImageColorGrayscale(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Modify image color: contrast (-100 to 100) */
  colorContrast(contrast: number): void {
    lib.symbols.ImageColorContrast(
      Deno.UnsafePointer.of(this.#buffer),
      contrast,
    );
  }

  /** Modify image color: brightness (-255 to 255) */
  colorBrightness(brightness: number): void {
    lib.symbols.ImageColorBrightness(
      Deno.UnsafePointer.of(this.#buffer),
      brightness,
    );
  }

  /** Modify image color: replace color */
  colorReplace(color: Color, replace: Color): void {
    lib.symbols.ImageColorReplace(
      Deno.UnsafePointer.of(this.#buffer),
      color.buffer,
      replace.buffer,
    );
  }

  /** Load color data from image as a Color array (RGBA - 32bit) */
  loadColors(): Color[] {
    const colors = lib.symbols.LoadImageColors(this.#buffer);
    const colorsView = new Deno.UnsafePointerView(colors!);
    const result: Color[] = [];
    for (let i = 0; i < this.width * this.height; i++) {
      result.push(
        new Color(
          colorsView.getUint8(i * 4),
          colorsView.getUint8(i * 4 + 1),
          colorsView.getUint8(i * 4 + 2),
          colorsView.getUint8(i * 4 + 3),
        ),
      );
    }
    lib.symbols.UnloadImageColors(colors);
    return result;
  }

  /** Load colors palette from image as a Color array (RGBA - 32bit) */
  loadPalette(maxPaletteSize: number): Color[] {
    const colorCount = new Uint32Array(1);
    const colors = lib.symbols.LoadImagePalette(
      this.#buffer,
      maxPaletteSize,
      Deno.UnsafePointer.of(colorCount),
    );
    const colorsView = new Deno.UnsafePointerView(colors!);
    const result: Color[] = [];
    for (let i = 0; i < colorCount[0]; i++) {
      result.push(
        new Color(
          colorsView.getUint8(i * 4),
          colorsView.getUint8(i * 4 + 1),
          colorsView.getUint8(i * 4 + 2),
          colorsView.getUint8(i * 4 + 3),
        ),
      );
    }
    lib.symbols.UnloadImagePalette(colors);
    return result;
  }

  /** Get image alpha border rectangle */
  getAlphaBorder(threshold: number): Rectangle {
    return Rectangle.fromBuffer(
      lib.symbols.GetImageAlphaBorder(this.#buffer, threshold).buffer,
    );
  }

  /** Get image color at pixel position */
  getColor(x: number, y: number): Color {
    return Color.fromBuffer(
      lib.symbols.GetImageColor(this.#buffer, x, y),
    );
  }

  /** Clear image background with given color */
  clearBackground(color: Color): void {
    lib.symbols.ImageClearBackground(
      Deno.UnsafePointer.of(this.#buffer),
      color.buffer,
    );
  }

  /** Draw pixel within an image */
  drawPixel(posX: number, posY: number, color: Color): void {
    lib.symbols.ImageDrawPixel(
      Deno.UnsafePointer.of(this.#buffer),
      posX,
      posY,
      color.buffer,
    );
  }

  /** Draw pixel within an image (Vector version) */
  drawPixelV(position: Vector2, color: Color): void {
    lib.symbols.ImageDrawPixelV(
      Deno.UnsafePointer.of(this.#buffer),
      position.buffer,
      color.buffer,
    );
  }

  /** Draw line within an image */
  drawLine(
    startPosX: number,
    startPosY: number,
    endPosX: number,
    endPosY: number,
    color: Color,
  ): void {
    lib.symbols.ImageDrawLine(
      Deno.UnsafePointer.of(this.#buffer),
      startPosX,
      startPosY,
      endPosX,
      endPosY,
      color.buffer,
    );
  }

  /** Draw line within an image (Vector version) */
  drawLineV(start: Vector2, end: Vector2, color: Color): void {
    lib.symbols.ImageDrawLineV(
      Deno.UnsafePointer.of(this.#buffer),
      start.buffer,
      end.buffer,
      color.buffer,
    );
  }

  /** Draw circle within an image */
  drawCircle(
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    lib.symbols.ImageDrawCircle(
      Deno.UnsafePointer.of(this.#buffer),
      centerX,
      centerY,
      radius,
      color.buffer,
    );
  }

  /** Draw circle within an image (Vector version) */
  drawCircleV(center: Vector2, radius: number, color: Color): void {
    lib.symbols.ImageDrawCircleV(
      Deno.UnsafePointer.of(this.#buffer),
      center.buffer,
      radius,
      color.buffer,
    );
  }

  /** Draw circle outline within an image */
  drawCircleLines(
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ): void {
    lib.symbols.ImageDrawCircleLines(
      Deno.UnsafePointer.of(this.#buffer),
      centerX,
      centerY,
      radius,
      color.buffer,
    );
  }

  /** Draw circle outline within an image (Vector version) */
  drawCircleLinesV(center: Vector2, radius: number, color: Color): void {
    lib.symbols.ImageDrawCircleLinesV(
      Deno.UnsafePointer.of(this.#buffer),
      center.buffer,
      radius,
      color.buffer,
    );
  }

  /** Draw rectangle within an image */
  drawRectangle(
    posX: number,
    posY: number,
    width: number,
    height: number,
    color: Color,
  ): void {
    lib.symbols.ImageDrawRectangle(
      Deno.UnsafePointer.of(this.#buffer),
      posX,
      posY,
      width,
      height,
      color.buffer,
    );
  }

  /** Draw rectangle within an image (Vector version) */
  drawRectangleV(position: Vector2, size: Vector2, color: Color): void {
    lib.symbols.ImageDrawRectangleV(
      Deno.UnsafePointer.of(this.#buffer),
      position.buffer,
      size.buffer,
      color.buffer,
    );
  }

  /** Draw rectangle within an image */
  drawRectangleRec(rec: Rectangle, color: Color): void {
    lib.symbols.ImageDrawRectangleRec(
      Deno.UnsafePointer.of(this.#buffer),
      rec.buffer,
      color.buffer,
    );
  }

  /** Draw rectangle lines within an image */
  drawRectangleLines(rec: Rectangle, thick: number, color: Color): void {
    lib.symbols.ImageDrawRectangleLines(
      Deno.UnsafePointer.of(this.#buffer),
      rec.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw a source image within a destination image (tint applied to source) */
  draw(src: Image, srcRec: Rectangle, dstRec: Rectangle, tint: Color): void {
    lib.symbols.ImageDraw(
      Deno.UnsafePointer.of(this.#buffer),
      src.buffer,
      srcRec.buffer,
      dstRec.buffer,
      tint.buffer,
    );
  }

  /** Draw text (using default font) within an image (destination) */
  drawText(
    text: string,
    posX: number,
    posY: number,
    fontSize: number,
    color: Color,
  ): void {
    const encodedText = new TextEncoder().encode(text + "\0");
    lib.symbols.ImageDrawText(
      Deno.UnsafePointer.of(this.#buffer),
      encodedText,
      posX,
      posY,
      fontSize,
      color.buffer,
    );
  }

  /** Draw text (custom sprite font) within an image (destination) */
  drawTextEx(
    font: Font,
    text: string,
    position: Vector2,
    fontSize: number,
    spacing: number,
    tint: Color,
  ): void {
    const encodedText = new TextEncoder().encode(text + "\0");
    lib.symbols.ImageDrawTextEx(
      Deno.UnsafePointer.of(this.#buffer),
      font.buffer,
      encodedText,
      position.buffer,
      fontSize,
      spacing,
      tint.buffer,
    );
  }
}

// TODO
// RLAPI Image LoadImageAnim(const char *fileName, int *frames);                                            // Load image sequence from file (frames appended to image.data)
// RLAPI unsigned char *ExportImageToMemory(Image image, const char *fileType, int *fileSize);              // Export image to memory buffer

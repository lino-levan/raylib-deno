/**
 * Functions for drawing 2d shapes
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Color } from "./color.ts";
import { Rectangle, Vector2 } from "./_util.ts";
import { concatVector2s } from "./_helper.ts";

/** Shape drawing functions */
export class Shapes {
  /** Draw a pixel */
  static drawPixel(posX: number, posY: number, color: Color) {
    lib.symbols.DrawPixel(posX, posY, color.buffer);
  }

  /** Draw a pixel (Vector version) */
  static drawPixelV(position: Vector2, color: Color) {
    lib.symbols.DrawPixelV(position.buffer, color.buffer);
  }

  /** Draw a line */
  static drawLine(
    startPosX: number,
    startPosY: number,
    endPosX: number,
    endPosY: number,
    color: Color,
  ) {
    lib.symbols.DrawLine(startPosX, startPosY, endPosX, endPosY, color.buffer);
  }

  /** Draw a line (using gl lines) */
  static drawLineV(startPos: Vector2, endPos: Vector2, color: Color) {
    lib.symbols.DrawLineV(startPos.buffer, endPos.buffer, color.buffer);
  }

  /** Draw a line (using triangles/quads) */
  static drawLineEx(
    startPos: Vector2,
    endPos: Vector2,
    thick: number,
    color: Color,
  ) {
    lib.symbols.DrawLineEx(startPos.buffer, endPos.buffer, thick, color.buffer);
  }

  /** Draw lines sequence (using gl lines) */
  static drawLineStrip(points: Vector2[], color: Color) {
    const buffer = concatVector2s(points);
    lib.symbols.DrawLineStrip(
      Deno.UnsafePointer.of(buffer),
      points.length,
      color.buffer,
    );
  }

  /** Draw line segment cubic-bezier in-out interpolation */
  static drawLineBezier(
    startPos: Vector2,
    endPos: Vector2,
    thick: number,
    color: Color,
  ) {
    lib.symbols.DrawLineBezier(
      startPos.buffer,
      endPos.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw a color-filled circle */
  static drawCircle(
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ) {
    lib.symbols.DrawCircle(centerX, centerY, radius, color.buffer);
  }

  /** Draw a piece of a circle */
  static drawCircleSector(
    center: Vector2,
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    color: Color,
  ) {
    lib.symbols.DrawCircleSector(
      center.buffer,
      radius,
      startAngle,
      endAngle,
      segments,
      color.buffer,
    );
  }

  /** Draw circle sector outline */
  static drawCircleSectorLines(
    center: Vector2,
    radius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    color: Color,
  ) {
    lib.symbols.DrawCircleSectorLines(
      center.buffer,
      radius,
      startAngle,
      endAngle,
      segments,
      color.buffer,
    );
  }

  /** Draw a gradient-filled circle */
  static drawCircleGradient(
    centerX: number,
    centerY: number,
    radius: number,
    color1: Color,
    color2: Color,
  ) {
    lib.symbols.DrawCircleGradient(
      centerX,
      centerY,
      radius,
      color1.buffer,
      color2.buffer,
    );
  }

  /** Draw a color-filled circle (Vector version) */
  static drawCircleV(center: Vector2, radius: number, color: Color) {
    lib.symbols.DrawCircleV(center.buffer, radius, color.buffer);
  }

  /** Draw circle outline */
  static drawCircleLines(
    centerX: number,
    centerY: number,
    radius: number,
    color: Color,
  ) {
    lib.symbols.DrawCircleLines(centerX, centerY, radius, color.buffer);
  }

  /** Draw circle outline (Vector version) */
  static drawCircleLinesV(center: Vector2, radius: number, color: Color) {
    lib.symbols.DrawCircleLinesV(center.buffer, radius, color.buffer);
  }

  /** Draw ellipse */
  static drawEllipse(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    color: Color,
  ) {
    lib.symbols.DrawEllipse(centerX, centerY, radiusH, radiusV, color.buffer);
  }

  /** Draw ellipse outline */
  static drawEllipseLines(
    centerX: number,
    centerY: number,
    radiusH: number,
    radiusV: number,
    color: Color,
  ) {
    lib.symbols.DrawEllipseLines(
      centerX,
      centerY,
      radiusH,
      radiusV,
      color.buffer,
    );
  }

  /** Draw ring */
  static drawRing(
    center: Vector2,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    color: Color,
  ) {
    lib.symbols.DrawRing(
      center.buffer,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      segments,
      color.buffer,
    );
  }

  /** Draw ring outline */
  static drawRingLines(
    center: Vector2,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    segments: number,
    color: Color,
  ) {
    lib.symbols.DrawRingLines(
      center.buffer,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      segments,
      color.buffer,
    );
  }

  /** Draw a color-filled rectangle */
  static drawRectangle(
    posX: number,
    posY: number,
    width: number,
    height: number,
    color: Color,
  ) {
    lib.symbols.DrawRectangle(posX, posY, width, height, color.buffer);
  }

  /** Draw a color-filled rectangle (Vector version) */
  static drawRectangleV(position: Vector2, size: Vector2, color: Color) {
    lib.symbols.DrawRectangleV(position.buffer, size.buffer, color.buffer);
  }

  /** Draw a color-filled rectangle */
  static drawRectangleRect(rect: Rectangle, color: Color) {
    lib.symbols.DrawRectangleRec(rect.buffer, color.buffer);
  }

  /** Draw a color-filled rectangle with pro parameters */
  static drawRectanglePro(
    rect: Rectangle,
    origin: Vector2,
    rotation: number,
    color: Color,
  ) {
    lib.symbols.DrawRectanglePro(
      rect.buffer,
      origin.buffer,
      rotation,
      color.buffer,
    );
  }

  /** Draw a vertical-gradient-filled rectangle */
  static drawRectangleGradientV(
    posX: number,
    posY: number,
    width: number,
    height: number,
    color1: Color,
    color2: Color,
  ) {
    lib.symbols.DrawRectangleGradientV(
      posX,
      posY,
      width,
      height,
      color1.buffer,
      color2.buffer,
    );
  }

  /** Draw a horizontal-gradient-filled rectangle */
  static drawRectangleGradientH(
    posX: number,
    posY: number,
    width: number,
    height: number,
    color1: Color,
    color2: Color,
  ) {
    lib.symbols.DrawRectangleGradientH(
      posX,
      posY,
      width,
      height,
      color1.buffer,
      color2.buffer,
    );
  }

  /** Draw a gradient-filled rectangle with custom vertex colors */
  static drawRectangleGradientEx(
    rect: Rectangle,
    col1: Color,
    col2: Color,
    col3: Color,
    col4: Color,
  ) {
    lib.symbols.DrawRectangleGradientEx(
      rect.buffer,
      col1.buffer,
      col2.buffer,
      col3.buffer,
      col4.buffer,
    );
  }

  /** Draw rectangle outline */
  static drawRectangleLines(
    posX: number,
    posY: number,
    width: number,
    height: number,
    color: Color,
  ) {
    lib.symbols.DrawRectangleLines(posX, posY, width, height, color.buffer);
  }

  /** Draw rectangle outline with extended parameters */
  static drawRectangleLinesEx(
    rect: Rectangle,
    lineThick: number,
    color: Color,
  ) {
    lib.symbols.DrawRectangleLinesEx(rect.buffer, lineThick, color.buffer);
  }

  /** Draw rectangle with rounded edges */
  static drawRectangleRounded(
    rect: Rectangle,
    roundness: number,
    segments: number,
    color: Color,
  ) {
    lib.symbols.DrawRectangleRounded(
      rect.buffer,
      roundness,
      segments,
      color.buffer,
    );
  }

  /** Draw rectangle with rounded edges */
  static drawRectangleRoundedLines(
    rect: Rectangle,
    roundness: number,
    segments: number,
    lineThick: number,
    color: Color,
  ) {
    lib.symbols.DrawRectangleRoundedLines(
      rect.buffer,
      roundness,
      segments,
      lineThick,
      color.buffer,
    );
  }

  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle(
    v1: Vector2,
    v2: Vector2,
    v3: Vector2,
    color: Color,
  ) {
    lib.symbols.DrawTriangle(v1.buffer, v2.buffer, v3.buffer, color.buffer);
  }

  /** Draw triangle outline (vertex in counter-clockwise order!) */
  static drawTriangleLines(
    v1: Vector2,
    v2: Vector2,
    v3: Vector2,
    color: Color,
  ) {
    lib.symbols.DrawTriangleLines(
      v1.buffer,
      v2.buffer,
      v3.buffer,
      color.buffer,
    );
  }

  /** Draw a triangle fan defined by points (first vertex is the center) */
  static drawTriangleFan(points: Vector2[], color: Color) {
    const buffer = concatVector2s(points);
    lib.symbols.DrawTriangleFan(
      Deno.UnsafePointer.of(buffer),
      points.length,
      color.buffer,
    );
  }

  /** Draw a triangle strip defined by points */
  static drawTriangleStrip(points: Vector2[], color: Color) {
    const buffer = concatVector2s(points);
    lib.symbols.DrawTriangleStrip(
      Deno.UnsafePointer.of(buffer),
      points.length,
      color.buffer,
    );
  }

  /** Draw a regular polygon (Vector version) */
  static drawPoly(
    center: Vector2,
    sides: number,
    radius: number,
    rotation: number,
    color: Color,
  ) {
    lib.symbols.DrawPoly(
      center.buffer,
      sides,
      radius,
      rotation,
      color.buffer,
    );
  }

  /** Draw a polygon outline of n sides */
  static drawPolyLines(
    center: Vector2,
    sides: number,
    radius: number,
    rotation: number,
    color: Color,
  ) {
    lib.symbols.DrawPolyLines(
      center.buffer,
      sides,
      radius,
      rotation,
      color.buffer,
    );
  }

  /** Draw a polygon outline of n sides with extended parameters */
  static drawPolyLinesEx(
    center: Vector2,
    sides: number,
    radius: number,
    rotation: number,
    lineThick: number,
    color: Color,
  ) {
    lib.symbols.DrawPolyLinesEx(
      center.buffer,
      sides,
      radius,
      rotation,
      lineThick,
      color.buffer,
    );
  }
}

// TODO
// RLAPI void SetShapesTexture(Texture2D texture, Rectangle source);       // Set texture and rectangle to be used on shapes drawing

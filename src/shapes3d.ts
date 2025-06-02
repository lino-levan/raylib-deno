/**
 * Functions for drawing 3d shapes
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import type { Color } from "./color.ts";
import type { Ray, Vector2, Vector3 } from "./_util.ts";

/** Shape drawing functions */
export class Shapes3D {
  /** Draw a line in 3D world space */
  static drawLine3D(startPos: Vector3, endPos: Vector3, color: Color) {
    lib.symbols.DrawLine3D(startPos.buffer, endPos.buffer, color.buffer);
  }

  /** Draw a point in 3D space, actually a small line */
  static drawPoint3D(position: Vector3, color: Color) {
    lib.symbols.DrawPoint3D(position.buffer, color.buffer);
  }

  /** Draw a circle in 3D world space */
  static drawCircle3D(
    center: Vector3,
    radius: number,
    rotationAxis: Vector3,
    rotationAngle: number,
    color: Color,
  ) {
    lib.symbols.DrawCircle3D(
      center.buffer,
      radius,
      rotationAxis.buffer,
      rotationAngle,
      color.buffer,
    );
  }

  /** Draw a color-filled triangle (vertex in counter-clockwise order!) */
  static drawTriangle3D(v1: Vector3, v2: Vector3, v3: Vector3, color: Color) {
    lib.symbols.DrawTriangle3D(v1.buffer, v2.buffer, v3.buffer, color.buffer);
  }

  // TODO
  // RLAPI void DrawTriangleStrip3D(Vector3 *points, int pointCount, Color color);                            // Draw a triangle strip defined by points

  /** Draw cube */
  static drawCube(
    position: Vector3,
    width: number,
    height: number,
    length: number,
    color: Color,
  ) {
    lib.symbols.DrawCube(position.buffer, width, height, length, color.buffer);
  }

  /** Draw cube (Vector version) */
  static drawCubeV(position: Vector3, size: Vector3, color: Color) {
    lib.symbols.DrawCubeV(position.buffer, size.buffer, color.buffer);
  }

  /** Draw cube wires */
  static drawCubeWires(
    position: Vector3,
    width: number,
    height: number,
    length: number,
    color: Color,
  ) {
    lib.symbols.DrawCubeWires(
      position.buffer,
      width,
      height,
      length,
      color.buffer,
    );
  }

  /** Draw cube wires (Vector version) */
  static drawCubeWiresV(position: Vector3, size: Vector3, color: Color) {
    lib.symbols.DrawCubeWiresV(position.buffer, size.buffer, color.buffer);
  }

  /** Draw sphere */
  static drawSphere(centerPos: Vector3, radius: number, color: Color) {
    lib.symbols.DrawSphere(centerPos.buffer, radius, color.buffer);
  }

  /** Draw sphere with extended parameters */
  static drawSphereEx(
    centerPos: Vector3,
    radius: number,
    rings: number,
    slices: number,
    color: Color,
  ) {
    lib.symbols.DrawSphereEx(
      centerPos.buffer,
      radius,
      rings,
      slices,
      color.buffer,
    );
  }

  /** Draw sphere wires */
  static drawSphereWires(
    centerPos: Vector3,
    radius: number,
    rings: number,
    slices: number,
    color: Color,
  ) {
    lib.symbols.DrawSphereWires(
      centerPos.buffer,
      radius,
      rings,
      slices,
      color.buffer,
    );
  }

  /** Draw a cylinder/cone */
  static drawCylinder(
    position: Vector3,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    slices: number,
    color: Color,
  ) {
    lib.symbols.DrawCylinder(
      position.buffer,
      radiusTop,
      radiusBottom,
      height,
      slices,
      color.buffer,
    );
  }

  /** Draw a cylinder with base at startPos and top at endPos */
  static drawCylinderEx(
    startPos: Vector3,
    endPos: Vector3,
    startRadius: number,
    endRadius: number,
    sides: number,
    color: Color,
  ) {
    lib.symbols.DrawCylinderEx(
      startPos.buffer,
      endPos.buffer,
      startRadius,
      endRadius,
      sides,
      color.buffer,
    );
  }

  /** Draw a cylinder/cone wires */
  static drawCylinderWires(
    position: Vector3,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    slices: number,
    color: Color,
  ) {
    lib.symbols.DrawCylinderWires(
      position.buffer,
      radiusTop,
      radiusBottom,
      height,
      slices,
      color.buffer,
    );
  }

  /** Draw a cylinder wires with base at startPos and top at endPos */
  static drawCylinderWiresEx(
    startPos: Vector3,
    endPos: Vector3,
    startRadius: number,
    endRadius: number,
    sides: number,
    color: Color,
  ) {
    lib.symbols.DrawCylinderWiresEx(
      startPos.buffer,
      endPos.buffer,
      startRadius,
      endRadius,
      sides,
      color.buffer,
    );
  }

  /** Draw a capsule with the center of its sphere caps at startPos and endPos */
  static drawCapsule(
    startPos: Vector3,
    endPos: Vector3,
    radius: number,
    slices: number,
    rings: number,
    color: Color,
  ) {
    lib.symbols.DrawCapsule(
      startPos.buffer,
      endPos.buffer,
      radius,
      slices,
      rings,
      color.buffer,
    );
  }

  /** Draw capsule wireframe with the center of its sphere caps at startPos and endPos */
  static drawCapsuleWires(
    startPos: Vector3,
    endPos: Vector3,
    radius: number,
    slices: number,
    rings: number,
    color: Color,
  ) {
    lib.symbols.DrawCapsuleWires(
      startPos.buffer,
      endPos.buffer,
      radius,
      slices,
      rings,
      color.buffer,
    );
  }

  /** Draw a plane XZ */
  static drawPlane(centerPos: Vector3, size: Vector2, color: Color) {
    lib.symbols.DrawPlane(centerPos.buffer, size.buffer, color.buffer);
  }

  /** Draw a ray line */
  static drawRay(ray: Ray, color: Color) {
    lib.symbols.DrawRay(ray.buffer, color.buffer);
  }

  /** Draw a grid (centered at (0, 0, 0)) */
  static drawGrid(slices: number, spacing: number) {
    lib.symbols.DrawGrid(slices, spacing);
  }
}

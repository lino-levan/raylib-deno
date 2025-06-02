/**
 * Spline drawing functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import type { Color } from "./color.ts";
import { Vector2 } from "./_util.ts";
import { concatVector2s } from "./_helper.ts";

/** Spline functions */
export class Spline {
  /** Draw spline: Linear, minimum 2 points */
  static drawLinear(points: Vector2[], thick: number, color: Color): void {
    const pointBuffer = concatVector2s(points);
    lib.symbols.DrawSplineLinear(
      Deno.UnsafePointer.of(pointBuffer),
      points.length,
      thick,
      color.buffer,
    );
  }

  /** Draw spline: B-Spline, minimum 4 points */
  static drawBasis(points: Vector2[], thick: number, color: Color): void {
    const pointBuffer = concatVector2s(points);
    lib.symbols.DrawSplineBasis(
      Deno.UnsafePointer.of(pointBuffer),
      points.length,
      thick,
      color.buffer,
    );
  }

  /** Draw spline: Catmull-Rom, minimum 4 points */
  static drawCatmullRom(points: Vector2[], thick: number, color: Color): void {
    const pointBuffer = concatVector2s(points);
    lib.symbols.DrawSplineCatmullRom(
      Deno.UnsafePointer.of(pointBuffer),
      points.length,
      thick,
      color.buffer,
    );
  }

  /** Draw spline: Quadratic Bezier, minimum 3 points (1 control point): [p1, c2, p3, c4...] */
  static drawBezierQuadratic(
    points: Vector2[],
    thick: number,
    color: Color,
  ): void {
    const pointBuffer = concatVector2s(points);
    lib.symbols.DrawSplineBezierQuadratic(
      Deno.UnsafePointer.of(pointBuffer),
      points.length,
      thick,
      color.buffer,
    );
  }

  /** Draw spline: Quadratic Bezier, minimum 3 points (1 control point): [p1, c2, p3, c4...] */
  static drawBezierCubic(points: Vector2[], thick: number, color: Color): void {
    const pointBuffer = concatVector2s(points);
    lib.symbols.DrawSplineBezierCubic(
      Deno.UnsafePointer.of(pointBuffer),
      points.length,
      thick,
      color.buffer,
    );
  }

  /** Draw spline segment: Linear, 2 points */
  drawSegmentLinear(
    p1: Vector2,
    p2: Vector2,
    thick: number,
    color: Color,
  ): void {
    lib.symbols.DrawSplineSegmentLinear(
      p1.buffer,
      p2.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw spline segment: B-Spline, 4 points */
  drawSegmentBasis(
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
    p4: Vector2,
    thick: number,
    color: Color,
  ): void {
    lib.symbols.DrawSplineSegmentBasis(
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw spline segment: Catmull-Rom, 4 points */
  drawSegmentCatmullRom(
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
    p4: Vector2,
    thick: number,
    color: Color,
  ): void {
    lib.symbols.DrawSplineSegmentCatmullRom(
      p1.buffer,
      p2.buffer,
      p3.buffer,
      p4.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw spline segment: Catmull-Rom, 4 points */
  drawSegmentBezierQuadratic(
    p1: Vector2,
    c2: Vector2,
    p3: Vector2,
    thick: number,
    color: Color,
  ): void {
    lib.symbols.DrawSplineSegmentBezierQuadratic(
      p1.buffer,
      c2.buffer,
      p3.buffer,
      thick,
      color.buffer,
    );
  }

  /** Draw spline segment: Cubic Bezier, 2 points, 2 control points */
  drawSegmentBezierCubic(
    p1: Vector2,
    c2: Vector2,
    c3: Vector2,
    p4: Vector2,
    thick: number,
    color: Color,
  ): void {
    lib.symbols.DrawSplineSegmentBezierCubic(
      p1.buffer,
      c2.buffer,
      c3.buffer,
      p4.buffer,
      thick,
      color.buffer,
    );
  }

  /** Get (evaluate) spline point: Linear */
  getPointLinear(startPos: Vector2, endPos: Vector2, t: number): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.GetSplinePointLinear(startPos.buffer, endPos.buffer, t)
        .buffer,
    );
  }

  /** Get (evaluate) spline point: B-Spline */
  getPointBasis(
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
    p4: Vector2,
    t: number,
  ): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.GetSplinePointBasis(
        p1.buffer,
        p2.buffer,
        p3.buffer,
        p4.buffer,
        t,
      ).buffer,
    );
  }

  /** Get (evaluate) spline point: Catmull-Rom */
  getPointCatmullRom(
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
    p4: Vector2,
    t: number,
  ): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.GetSplinePointCatmullRom(
        p1.buffer,
        p2.buffer,
        p3.buffer,
        p4.buffer,
        t,
      ).buffer,
    );
  }

  /** Get (evaluate) spline point: Quadratic Bezier */
  getPointBezierQuad(
    p1: Vector2,
    c2: Vector2,
    p3: Vector2,
    t: number,
  ): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.GetSplinePointBezierQuad(p1.buffer, c2.buffer, p3.buffer, t)
        .buffer,
    );
  }

  /** Get (evaluate) spline point: Cubic Bezier */
  getPointBezierCubic(
    p1: Vector2,
    c2: Vector2,
    c3: Vector2,
    p4: Vector2,
    t: number,
  ): Vector2 {
    return Vector2.fromBuffer(
      lib.symbols.GetSplinePointBezierCubic(
        p1.buffer,
        c2.buffer,
        c3.buffer,
        p4.buffer,
        t,
      ).buffer,
    );
  }
}

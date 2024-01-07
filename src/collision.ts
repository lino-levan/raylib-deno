/**
 * Collision related functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

import { Rectangle, Vector2 } from "./_util.ts";
import { concatVector2s } from "./_helper.ts";

/** A class to simplift collision calculations */
export class Collision {
  /** Check collision between two rectangles */
  static checkRectangles(rect1: Rectangle, rect2: Rectangle) {
    return !!lib.symbols.CheckCollisionRecs(rect1.buffer, rect2.buffer);
  }

  /** Check collision between two circles */
  static checkCircles(
    center1: Vector2,
    radius1: number,
    center2: Vector2,
    radius2: number,
  ) {
    return !!lib.symbols.CheckCollisionCircles(
      center1.buffer,
      radius1,
      center2.buffer,
      radius2,
    );
  }

  /** Check collision between circle and rectangle */
  static checkCircleRectangle(
    center: Vector2,
    radius: number,
    rect: Rectangle,
  ) {
    return !!lib.symbols.CheckCollisionCircleRec(
      center.buffer,
      radius,
      rect.buffer,
    );
  }

  /** Check if point is inside rectangle */
  static checkPointRectangle(point: Vector2, rect: Rectangle) {
    return !!lib.symbols.CheckCollisionPointRec(point.buffer, rect.buffer);
  }

  /** Check if point is inside circle */
  static checkPointCircle(point: Vector2, center: Vector2, radius: number) {
    return !!lib.symbols.CheckCollisionPointCircle(
      point.buffer,
      center.buffer,
      radius,
    );
  }

  /** Check if point is inside a triangle */
  static checkPointTriangle(
    point: Vector2,
    p1: Vector2,
    p2: Vector2,
    p3: Vector2,
  ) {
    return !!lib.symbols.CheckCollisionPointTriangle(
      point.buffer,
      p1.buffer,
      p2.buffer,
      p3.buffer,
    );
  }

  /** Check if point is within a polygon described by array of vertices */
  static checkPointPoly(point: Vector2, points: Vector2[]) {
    const pointsBuffer = concatVector2s(points);
    return !!lib.symbols.CheckCollisionPointPoly(
      point.buffer,
      Deno.UnsafePointer.of(pointsBuffer),
      points.length,
    );
  }

  /** Check the collision between two lines defined by two points each, returns collision point if found otherwise null */
  static checkLines(
    startPos1: Vector2,
    endPos1: Vector2,
    startPos2: Vector2,
    endPos2: Vector2,
  ) {
    const buffer = new Vector2(0, 0).buffer;

    if (
      !lib.symbols.CheckCollisionLines(
        startPos1.buffer,
        endPos1.buffer,
        startPos2.buffer,
        endPos2.buffer,
        Deno.UnsafePointer.of(buffer),
      )
    ) {
      return null;
    }

    return Vector2.fromBuffer(buffer);
  }

  /** Check if point belongs to line created between two points [p1] and [p2] with defined margin in pixels [threshold] */
  static checkPointLine(
    point: Vector2,
    p1: Vector2,
    p2: Vector2,
    threshold: number,
  ) {
    return !!lib.symbols.CheckCollisionPointLine(
      point.buffer,
      p1.buffer,
      p2.buffer,
      threshold,
    );
  }

  /** Get collision rectangle for two rectangles collision */
  static getRectangle(rect1: Rectangle, rect2: Rectangle) {
    return Rectangle.fromBuffer(
      lib.symbols.GetCollisionRec(rect1.buffer, rect2.buffer),
    );
  }
}

// TODO
// RLAPI bool CheckCollisionSpheres(Vector3 center1, float radius1, Vector3 center2, float radius2);   // Check collision between two spheres
// RLAPI bool CheckCollisionBoxes(BoundingBox box1, BoundingBox box2);                                 // Check collision between two bounding boxes
// RLAPI bool CheckCollisionBoxSphere(BoundingBox box, Vector3 center, float radius);                  // Check collision between box and sphere
// RLAPI RayCollision GetRayCollisionSphere(Ray ray, Vector3 center, float radius);                    // Get collision info between ray and sphere
// RLAPI RayCollision GetRayCollisionBox(Ray ray, BoundingBox box);                                    // Get collision info between ray and box
// RLAPI RayCollision GetRayCollisionMesh(Ray ray, Mesh mesh, Matrix transform);                       // Get collision info between ray and mesh
// RLAPI RayCollision GetRayCollisionTriangle(Ray ray, Vector3 p1, Vector3 p2, Vector3 p3);            // Get collision info between ray and triangle
// RLAPI RayCollision GetRayCollisionQuad(Ray ray, Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4);    // Get collision info between ray and quad

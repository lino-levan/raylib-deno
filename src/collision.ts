/**
 * Collision related functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

import {
  type BoundingBox,
  type Matrix,
  type Ray,
  Rectangle,
  Vector2,
  Vector3,
} from "./_util.ts";
import { concatVector2s, littleEndian } from "./_helper.ts";
import type { Mesh } from "./mesh.ts";

/** A class to simplift collision calculations */
export class Collision {
  /** Check collision between two rectangles */
  static checkRectangles(rect1: Rectangle, rect2: Rectangle): boolean {
    return !!lib.symbols.CheckCollisionRecs(rect1.buffer, rect2.buffer);
  }

  /** Check collision between two circles */
  static checkCircles(
    center1: Vector2,
    radius1: number,
    center2: Vector2,
    radius2: number,
  ): boolean {
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
  ): boolean {
    return !!lib.symbols.CheckCollisionCircleRec(
      center.buffer,
      radius,
      rect.buffer,
    );
  }

  /** Check if point is inside rectangle */
  static checkPointRectangle(point: Vector2, rect: Rectangle): boolean {
    return !!lib.symbols.CheckCollisionPointRec(point.buffer, rect.buffer);
  }

  /** Check if point is inside circle */
  static checkPointCircle(
    point: Vector2,
    center: Vector2,
    radius: number,
  ): boolean {
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
  ): boolean {
    return !!lib.symbols.CheckCollisionPointTriangle(
      point.buffer,
      p1.buffer,
      p2.buffer,
      p3.buffer,
    );
  }

  /** Check if point is within a polygon described by array of vertices */
  static checkPointPoly(point: Vector2, points: Vector2[]): boolean {
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
  ): Vector2 | null {
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
  ): boolean {
    return !!lib.symbols.CheckCollisionPointLine(
      point.buffer,
      p1.buffer,
      p2.buffer,
      threshold,
    );
  }

  /** Get collision rectangle for two rectangles collision */
  static getRectangle(rect1: Rectangle, rect2: Rectangle): Rectangle {
    return Rectangle.fromBuffer(
      lib.symbols.GetCollisionRec(rect1.buffer, rect2.buffer).buffer,
    );
  }

  /** Check collision between two spheres */
  static checkSpheres(
    center1: Vector3,
    radius1: number,
    center2: Vector3,
    radius2: number,
  ): boolean {
    return !!lib.symbols.CheckCollisionSpheres(
      center1.buffer,
      radius1,
      center2.buffer,
      radius2,
    );
  }

  /** Check collision between two bounding boxes */
  static checkBoxes(box1: BoundingBox, box2: BoundingBox): boolean {
    return !!lib.symbols.CheckCollisionBoxes(box1.buffer, box2.buffer);
  }

  /** Check collision between box and sphere */
  static checkBoxSphere(
    box: BoundingBox,
    center: Vector3,
    radius: number,
  ): boolean {
    return !!lib.symbols.CheckCollisionBoxSphere(
      box.buffer,
      center.buffer,
      radius,
    );
  }

  /** Get collision info between ray and sphere */
  static getRayCollisionSphere(
    ray: Ray,
    center: Vector3,
    radius: number,
  ): RayCollision {
    return new RayCollision(
      lib.symbols.GetRayCollisionSphere(ray.buffer, center.buffer, radius),
    );
  }

  /** Get collision info between ray and box */
  static getRayCollisionBox(ray: Ray, box: BoundingBox): RayCollision {
    return new RayCollision(
      lib.symbols.GetRayCollisionBox(ray.buffer, box.buffer),
    );
  }

  /** Get collision info between ray and mesh */
  static getRayCollisionMesh(
    ray: Ray,
    mesh: Mesh,
    transform: Matrix,
  ): RayCollision {
    return new RayCollision(
      lib.symbols.GetRayCollisionMesh(
        ray.buffer,
        mesh.buffer,
        transform.buffer,
      ),
    );
  }

  /** Get collision info between ray and triangle */
  static getRayCollisionTriangle(
    ray: Ray,
    p1: Vector3,
    p2: Vector3,
    p3: Vector3,
  ): RayCollision {
    return new RayCollision(
      lib.symbols.GetRayCollisionTriangle(
        ray.buffer,
        p1.buffer,
        p2.buffer,
        p3.buffer,
      ),
    );
  }

  /** Get collision info between ray and quad */
  static getRayCollisionQuad(
    ray: Ray,
    p1: Vector3,
    p2: Vector3,
    p3: Vector3,
    p4: Vector3,
  ): RayCollision {
    return new RayCollision(
      lib.symbols.GetRayCollisionQuad(
        ray.buffer,
        p1.buffer,
        p2.buffer,
        p3.buffer,
        p4.buffer,
      ),
    );
  }
}

/** The result of a ray collision with something */
export class RayCollision {
  #buffer: Uint8Array<ArrayBuffer>;

  /** Avoid using this constructor directly. */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  get hit(): boolean {
    return !!(new Uint8Array(this.#buffer)[0]);
  }

  get distance(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getFloat32(4, littleEndian);
  }

  get point(): Vector3 {
    return Vector3.fromBuffer(this.#buffer.slice(8, 20));
  }

  get normal(): Vector3 {
    return Vector3.fromBuffer(this.#buffer.slice(20));
  }
}

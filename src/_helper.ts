import type { Vector2 } from "./_util.ts";

/** Returns buffer of Vector2 array */
export function concatVector2s(points: Vector2[]): ArrayBuffer {
  let result = new Float32Array(points.length * 2);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    result[i * 2] = point.x;
    result[i * 2 + 1] = point.y;
  }
  return result.buffer;
}

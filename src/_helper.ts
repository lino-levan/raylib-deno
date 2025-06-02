import type { Vector2 } from "./_util.ts";

/** Returns buffer of Vector2 array */
export function concatVector2s(points: Vector2[]): ArrayBuffer {
  const result = new Float32Array(points.length * 2);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    result[i * 2] = point.x;
    result[i * 2 + 1] = point.y;
  }
  return result.buffer;
}

/** Whether or not this computer is little or big endian */
export const littleEndian = (() => {
  // Stolen from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

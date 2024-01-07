/**
 * 3D Camera related functions
 * @module
 */

/** Automation event functions */
import { Vector3 } from "./_util.ts";

/** A class to interact with a 3D camera */
export class Camera3D {
  position: Vector3;
  target: Vector3;
  up: Vector3;
  fovY: number;
  type: "PERSPECTIVE" | "ORTHOGRAPHIC";
  constructor(
    options?: {
      /** Camera position */
      position?: Vector3;
      /** Camera target (what it looks at) */
      target?: Vector3;
      /** Camera up vector (rotation over its axis) */
      up?: Vector3;
      /** Camera field-of-view aperture in Y (degrees) */
      fovY?: number;
      /** Camera type, defines projection type */
      type?: "PERSPECTIVE" | "ORTHOGRAPHIC";
    },
  ) {
    this.position = options?.position ?? new Vector3(0, 0, 0);
    this.target = options?.target ?? new Vector3(0, 1, 0);
    this.up = options?.up ?? new Vector3(0, 0, 1);
    this.fovY = options?.fovY ?? 90;
    this.type = options?.type ?? "PERSPECTIVE";
  }

  get buffer() {
    const view = new DataView(new ArrayBuffer(44));
    view.setFloat32(0, this.position.x);
    view.setFloat32(4, this.position.y);
    view.setFloat32(8, this.position.z);
    view.setFloat32(12, this.target.x);
    view.setFloat32(16, this.target.y);
    view.setFloat32(20, this.target.z);
    view.setFloat32(24, this.up.x);
    view.setFloat32(28, this.up.y);
    view.setFloat32(32, this.up.z);
    view.setFloat32(36, this.fovY);
    view.setUint8(40, this.type === "PERSPECTIVE" ? 0 : 1);

    return view.buffer;
  }
}

// TODO(lino-levan): Consider if these are useful
// RLAPI void UpdateCamera(Camera *camera, int mode);      // Update camera position for selected mode
// RLAPI void UpdateCameraPro(Camera *camera, Vector3 movement, Vector3 rotation, float zoom); // Update camera movement/rotation

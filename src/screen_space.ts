/**
 * Screen-space related functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Camera2D, Matrix, Ray, Vector2, Vector3 } from "./_util.ts";
import { Camera3D } from "./camera3d.ts";

/** Helper methods for screenspace transformations */
export class ScreenSpace {
  /** Get a ray trace from mouse position */
  static getMouseRay(mousePosition: Vector2, camera: Camera3D) {
    return Ray.fromBuffer(
      lib.symbols.GetMouseRay(mousePosition.buffer, camera.buffer).buffer,
    );
  }

  /** Get camera transform matrix (view matrix) */
  static getCameraMatrix(camera: Camera3D) {
    return Matrix.fromBuffer(lib.symbols.GetCameraMatrix(camera.buffer).buffer);
  }

  /** Get camera 2d transform matrix */
  static getCameraMatrix2D(camera: Camera2D) {
    return Matrix.fromBuffer(
      lib.symbols.GetCameraMatrix2D(camera.buffer).buffer,
    );
  }

  /** Get the screen space position for a 3d world space position */
  static getWorldToScreen(position: Vector3, camera: Camera3D) {
    return Vector2.fromBuffer(
      lib.symbols.GetWorldToScreen(position.buffer, camera.buffer).buffer,
    );
  }

  /** Get the world space position for a 2d camera screen space position */
  static getScreenToWorld2D(position: Vector2, camera: Camera2D) {
    return Vector2.fromBuffer(
      lib.symbols.GetScreenToWorld2D(position.buffer, camera.buffer).buffer,
    );
  }

  /** Get size position for a 3d world space position */
  static getWorldToScreenEx(
    position: Vector3,
    camera: Camera3D,
    width: number,
    height: number,
  ) {
    return Vector2.fromBuffer(
      lib.symbols.GetWorldToScreenEx(
        position.buffer,
        camera.buffer,
        width,
        height,
      ).buffer,
    );
  }

  /** Get the screen space position for a 2d camera world space position */
  static getWorldToScreen2D(position: Vector2, camera: Camera2D) {
    return Vector2.fromBuffer(
      lib.symbols.GetWorldToScreen2D(position.buffer, camera.buffer).buffer,
    );
  }
}

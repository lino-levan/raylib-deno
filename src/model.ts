/**
 * Model functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import {
  BoundingBox,
  type Rectangle,
  type Vector2,
  type Vector3,
} from "./_util.ts";
import type { Camera3D } from "./camera3d.ts";
import type { Color } from "./color.ts";
import type { Texture2D } from "./texture.ts";
import type { Mesh } from "./mesh.ts";

/** Class for creating, loading, and drawing models */
export class Model {
  #buffer: Uint8Array<ArrayBuffer>;
  /** Avoid using if at all possible */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /** Load model from files (meshes and materials) */
  static load(fileName: string): Model {
    const encoded = new TextEncoder().encode(fileName + "\0");
    return new Model(lib.symbols.LoadModel(encoded));
  }

  /** Load model from generated mesh (default material) */
  static loadFromMesh(mesh: Mesh): Model {
    return new Model(lib.symbols.LoadModelFromMesh(mesh.buffer));
  }

  /** Check if a model is ready */
  isReady(): boolean {
    return !!lib.symbols.IsModelReady(this.#buffer);
  }

  /** Unload model (including meshes) from memory (RAM and/or VRAM) */
  unload() {
    lib.symbols.UnloadModel(this.#buffer);
  }

  /** Compute model bounding box limits (considers all meshes) */
  getBoundingBox(): BoundingBox {
    return BoundingBox.fromBuffer(
      lib.symbols.GetModelBoundingBox(this.#buffer).buffer,
    );
  }

  /** Draw a model (with texture if set) */
  draw(position: Vector3, scale: number, tint: Color) {
    lib.symbols.DrawModel(this.#buffer, position.buffer, scale, tint.buffer);
  }

  /** Draw a model with extended parameters */
  drawEx(
    position: Vector3,
    rotationAxis: Vector3,
    rotationAngle: number,
    scale: Vector3,
    tint: Color,
  ) {
    lib.symbols.DrawModelEx(
      this.#buffer,
      position.buffer,
      rotationAxis.buffer,
      rotationAngle,
      scale.buffer,
      tint.buffer,
    );
  }

  /** Draw a model wires (with texture if set) */
  drawWires(position: Vector3, scale: number, tint: Color) {
    lib.symbols.DrawModelWires(
      this.#buffer,
      position.buffer,
      scale,
      tint.buffer,
    );
  }

  /** Draw a model wires (with texture if set) with extended parameters */
  drawWiresEx(
    position: Vector3,
    rotationAxis: Vector3,
    rotationAngle: number,
    scale: Vector3,
    tint: Color,
  ) {
    lib.symbols.DrawModelWiresEx(
      this.#buffer,
      position.buffer,
      rotationAxis.buffer,
      rotationAngle,
      scale.buffer,
      tint.buffer,
    );
  }

  /** Draw bounding box (wires) */
  static drawBoundingBox(box: BoundingBox, color: Color) {
    lib.symbols.DrawBoundingBox(box.buffer, color.buffer);
  }

  /** Draw a billboard texture */
  static drawBillboard(
    camera: Camera3D,
    texture: Texture2D,
    position: Vector3,
    size: number,
    tint: Color,
  ) {
    lib.symbols.DrawBillboard(
      camera.buffer,
      texture.buffer,
      position.buffer,
      size,
      tint.buffer,
    );
  }

  /** Draw a billboard texture defined by source */
  static drawBillboardRect(
    camera: Camera3D,
    texture: Texture2D,
    source: Rectangle,
    position: Vector3,
    size: Vector2,
    tint: Color,
  ) {
    lib.symbols.DrawBillboardRec(
      camera.buffer,
      texture.buffer,
      source.buffer,
      position.buffer,
      size.buffer,
      tint.buffer,
    );
  }

  /** Draw a billboard texture defined by source and rotation */
  static drawBillboardPro(
    camera: Camera3D,
    texture: Texture2D,
    source: Rectangle,
    position: Vector3,
    up: Vector3,
    size: Vector2,
    origin: Vector2,
    rotation: number,
    color: Color,
  ) {
    lib.symbols.DrawBillboardPro(
      camera.buffer,
      texture.buffer,
      source.buffer,
      position.buffer,
      up.buffer,
      size.buffer,
      origin.buffer,
      rotation,
      color.buffer,
    );
  }
}

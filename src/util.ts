export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export class Color {
  #buffer: Uint8Array;

  constructor(r, g, b, a) {
    this.#buffer = new Uint8Array([r, g, b, a]).buffer;
  }

  get buffer() {
    return this.#buffer;
  }
}

export class Camera2D {
  /** Camera offset (displacement from target) */
  offset: Vector2;
  /** Camera target (rotation and zoom origin) */
  target: Vector2;
  /** Camera rotation in degrees */
  rotation: number;
  /** Camera zoom (scaling), 1.0f by default */
  zoom: number;

  constructor(
    options?: {
      /** Camera offset (displacement from target) */
      offset?: Vector2;
      /** Camera target (rotation and zoom origin) */
      target?: Vector2;
      /** Camera rotation in degrees */
      rotation?: number;
      /** Camera zoom (scaling), 1.0f by default */
      zoom?: number;
    },
  ) {
    this.offset = options?.offset ?? { x: 0, y: 0 };
    this.target = options?.target ?? { x: 0, y: 0 };
    this.rotation = options?.rotation ?? 0;
    this.zoom = options?.zoom ?? 1;
  }

  get buffer() {
    return new Float32Array([
      this.offset.x,
      this.offset.y,
      this.target.x,
      this.target.y,
      this.rotation,
      this.zoom,
    ]).buffer;
  }
}

export class Camera3D {
  position: Vector3;
  target: Vector3;
  up: Vector3;
  fovY: number;
  type: number;
  constructor(
    options?: {
      /** Camera position */
      position?: Vector3;
      /** Camera target (what it looks at) */
      target?: Vector3;
      /** Camera up vector (rotation over its axis) */
      up?: Vector3;
      /** Camera field-of-view apperture in Y (degrees) */
      fovY?: number;
      /** Camera type, defines projection type */
      type?: "PERSPECTIVE" | "ORTHOGRAPHIC";
    },
  ) {
    this.position = options?.position ?? { x: 0, y: 0, z: 0 };
    this.target = options?.target ?? { x: 0, y: 1, z: 0 };
    this.up = options?.up ?? { x: 0, y: 1, z: 0 };
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

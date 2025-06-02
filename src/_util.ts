import { littleEndian } from "./_helper.ts";

export class Vector2 {
  constructor(public x: number, public y: number) {}

  static fromBuffer(buffer: ArrayBuffer): Vector2 {
    const view = new DataView(buffer);
    return new Vector2(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y]).buffer;
  }
}

export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  static fromBuffer(buffer: Uint8Array<ArrayBuffer>): Vector3 {
    const view = new DataView(buffer.buffer);
    return new Vector3(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.z]).buffer;
  }
}

export class Vector4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number,
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Vector4 {
    const view = new DataView(buffer);
    return new Vector4(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.z, this.w]).buffer;
  }
}

export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Rectangle {
    const view = new DataView(buffer);
    return new Rectangle(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([this.x, this.y, this.width, this.height]).buffer;
  }
}

export class Ray {
  constructor(public position: Vector3, public direction: Vector3) {}

  static fromBuffer(buffer: ArrayBuffer): Ray {
    const view = new DataView(buffer);
    return new Ray(
      new Vector3(
        view.getFloat32(0, littleEndian),
        view.getFloat32(4, littleEndian),
        view.getFloat32(8, littleEndian),
      ),
      new Vector3(
        view.getFloat32(12, littleEndian),
        view.getFloat32(16, littleEndian),
        view.getFloat32(24, littleEndian),
      ),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.position.x,
      this.position.y,
      this.position.z,
      this.direction.x,
      this.direction.y,
      this.direction.z,
    ]).buffer;
  }
}

export class BoundingBox {
  constructor(public min: Vector3, public max: Vector3) {}

  static fromBuffer(buffer: ArrayBuffer): BoundingBox {
    const view = new DataView(buffer);
    return new BoundingBox(
      new Vector3(
        view.getFloat32(0, littleEndian),
        view.getFloat32(4, littleEndian),
        view.getFloat32(8, littleEndian),
      ),
      new Vector3(
        view.getFloat32(12, littleEndian),
        view.getFloat32(16, littleEndian),
        view.getFloat32(24, littleEndian),
      ),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.min.x,
      this.min.y,
      this.min.z,
      this.max.x,
      this.max.y,
      this.max.z,
    ]).buffer;
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
    this.offset = options?.offset ?? new Vector2(0, 0);
    this.target = options?.target ?? new Vector2(0, 0);
    this.rotation = options?.rotation ?? 0;
    this.zoom = options?.zoom ?? 1;
  }

  get buffer(): ArrayBuffer {
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

export class Matrix {
  constructor(
    public m0: number,
    public m1: number,
    public m2: number,
    public m3: number,
    public m4: number,
    public m5: number,
    public m6: number,
    public m7: number,
    public m8: number,
    public m9: number,
    public m10: number,
    public m11: number,
    public m12: number,
    public m13: number,
    public m14: number,
    public m15: number,
  ) {}

  static fromBuffer(buffer: ArrayBuffer): Matrix {
    const view = new DataView(buffer);
    return new Matrix(
      view.getFloat32(0, littleEndian),
      view.getFloat32(4, littleEndian),
      view.getFloat32(8, littleEndian),
      view.getFloat32(12, littleEndian),
      view.getFloat32(16, littleEndian),
      view.getFloat32(20, littleEndian),
      view.getFloat32(24, littleEndian),
      view.getFloat32(28, littleEndian),
      view.getFloat32(32, littleEndian),
      view.getFloat32(36, littleEndian),
      view.getFloat32(40, littleEndian),
      view.getFloat32(44, littleEndian),
      view.getFloat32(48, littleEndian),
      view.getFloat32(52, littleEndian),
      view.getFloat32(56, littleEndian),
      view.getFloat32(60, littleEndian),
    );
  }

  get buffer(): ArrayBuffer {
    return new Float32Array([
      this.m0,
      this.m1,
      this.m2,
      this.m3,
      this.m4,
      this.m5,
      this.m6,
      this.m7,
      this.m8,
      this.m9,
      this.m10,
      this.m11,
      this.m12,
      this.m13,
      this.m14,
      this.m15,
    ]).buffer;
  }
}

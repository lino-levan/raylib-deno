export class Vector2 {
  constructor(public x: number, public y: number) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector2(view.getFloat32(0), view.getFloat32(4));
  }

  get buffer() {
    return new Float32Array([this.x, this.y]).buffer;
  }
}

export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector3(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
    );
  }

  get buffer() {
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

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Vector4(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
      view.getFloat32(12),
    );
  }

  get buffer() {
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

  static fromBuffer(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    return new Rectangle(
      view.getFloat32(0),
      view.getFloat32(4),
      view.getFloat32(8),
      view.getFloat32(12),
    );
  }

  get buffer() {
    return new Float32Array([this.x, this.y, this.width, this.height]).buffer;
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

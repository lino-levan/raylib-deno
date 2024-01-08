/**
 * Mesh functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { BoundingBox, Matrix, Vector3 } from "./_util.ts";
import { Image } from "./image.ts";
import { Material } from "./material.ts";

/** Class for creating, loading, and drawing meshes */
export class Mesh {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Upload mesh vertex data in GPU and provide VAO/VBO ids */
  upload(dynamic: boolean) {
    lib.symbols.UploadMesh(Deno.UnsafePointer.of(this.#buffer), +dynamic);
  }

  /** Update mesh vertex data in GPU for a specific buffer index */
  updateBuffer(index: number, data: ArrayBuffer, offset: number) {
    lib.symbols.UpdateMeshBuffer(
      this.#buffer,
      index,
      data,
      data.byteLength,
      offset,
    );
  }

  /** Unload mesh data from CPU and GPU */
  unload() {
    lib.symbols.UnloadMesh(this.#buffer);
  }

  /** Draw a 3d mesh with material and transform */
  draw(material: Material, transform: Matrix) {
    lib.symbols.DrawMesh(this.#buffer, material.buffer, transform.buffer);
  }

  /** Draw multiple mesh instances with material and different transforms */
  drawInstanced(material: Material, transforms: Matrix[]) {
    const buffer = new Float32Array(64 * transforms.length);
    for (let i = 0; i < transforms.length; i++) {
      buffer.set(new Float32Array(transforms[i].buffer), i * 64);
    }
    lib.symbols.DrawMeshInstanced(
      this.#buffer,
      material.buffer,
      Deno.UnsafePointer.of(buffer),
      transforms.length,
    );
  }

  /** Export mesh data to file, returns true on success */
  export(fileName: string) {
    const encoded = new TextEncoder().encode(fileName + "\0");
    return !!lib.symbols.ExportMesh(this.#buffer, encoded);
  }

  /** Compute mesh bounding box limits */
  getBoundingBox() {
    return BoundingBox.fromBuffer(lib.symbols.GetMeshBoundingBox(this.#buffer));
  }

  /** Compute mesh tangents */
  GenMeshTangents() {
    lib.symbols.GenMeshTangents(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Generate polygonal mesh */
  static genPoly(sides: number, radius: number) {
    return new Mesh(lib.symbols.GenMeshPoly(sides, radius));
  }

  /** Generate plane mesh (with subdivisions) */
  static genPlane(width: number, length: number, resX: number, resZ: number) {
    return new Mesh(lib.symbols.GenMeshPlane(width, length, resX, resZ));
  }

  /** Generate cuboid mesh */
  static genCube(width: number, height: number, length: number) {
    return new Mesh(lib.symbols.GenMeshCube(width, height, length));
  }

  /** Generate sphere mesh (standard sphere) */
  static genSphere(radius: number, rings: number, slices: number) {
    return new Mesh(lib.symbols.GenMeshSphere(radius, rings, slices));
  }

  /** Generate half-sphere mesh (no bottom cap) */
  static genHemiSphere(radius: number, rings: number, slices: number) {
    return new Mesh(lib.symbols.GenMeshHemiSphere(radius, rings, slices));
  }

  /** Generate cylinder mesh */
  static genCylinder(radius: number, height: number, slices: number) {
    return new Mesh(lib.symbols.GenMeshCylinder(radius, height, slices));
  }

  /** Generate cone/pyramid mesh */
  static genCone(radius: number, height: number, slices: number) {
    return new Mesh(lib.symbols.GenMeshCone(radius, height, slices));
  }

  /** Generate torus mesh */
  static genTorus(radius: number, size: number, radSeg: number, sides: number) {
    return new Mesh(lib.symbols.GenMeshTorus(radius, size, radSeg, sides));
  }

  /** Generate trefoil knot mesh */
  static genKnot(radius: number, size: number, radSeg: number, sides: number) {
    return new Mesh(lib.symbols.GenMeshKnot(radius, size, radSeg, sides));
  }

  /** Generate heightmap mesh from image data */
  static genHeightmap(heightmap: Image, size: Vector3) {
    return new Mesh(
      lib.symbols.GenMeshHeightmap(heightmap.buffer, size.buffer),
    );
  }

  /** Generate cubes-based map mesh from image data */
  static genCubicmap(cubicmap: Image, cubeSize: Vector3) {
    return new Mesh(
      lib.symbols.GenMeshCubicmap(cubicmap.buffer, cubeSize.buffer),
    );
  }
}

/**
 * Mesh functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Model } from "./model.ts";
import { Texture2D } from "./texture.ts";

const materialMapIndex = {
  albedo: 0,
  metalness: 1,
  normal: 2,
  roughness: 3,
  occlusion: 4,
  emission: 5,
  height: 6,
  cubemap: 7,
  irradiance: 8,
  prefilter: 9,
  brdf: 10,
};

export type MaterialMapIndex = keyof typeof materialMapIndex;

/** Class for creating, loading, and drawing materials */
export class Material {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Load materials from model file */
  static load(fileName: string) {
    const encoded = new TextEncoder().encode(fileName + "\0");
    const count = new Int32Array(1);
    const pointer = lib.symbols.LoadMaterials(
      encoded,
      Deno.UnsafePointer.of(count),
    );
    const materials: Material[] = [];

    // TODO: read data from pointer and load it into materials array

    return materials;
  }

  /** Load default material (Supports: DIFFUSE, SPECULAR, NORMAL maps) */
  static loadDefault() {
    return new Material(lib.symbols.LoadMaterialDefault());
  }

  /** Check if a material is ready */
  isReady() {
    return !!lib.symbols.IsMaterialReady(this.#buffer);
  }

  /** Unload material from GPU memory (VRAM) */
  unload() {
    lib.symbols.UnloadMaterial(this.#buffer);
  }

  /** Set texture for a material map type */
  setTexture(mapType: MaterialMapIndex, texture: Texture2D) {
    lib.symbols.SetMaterialTexture(
      Deno.UnsafePointer.of(this.#buffer),
      materialMapIndex[mapType],
      texture.buffer,
    );
  }

  /** Set material for a mesh */
  static setModelMeshMaterial(
    model: Model,
    meshId: number,
    materialId: number,
  ) {
    lib.symbols.SetModelMeshMaterial(
      Deno.UnsafePointer.of(model.buffer),
      meshId,
      materialId,
    );
  }
}

/**
 * File drop functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { littleEndian } from "./_helper.ts";

export class FileDrop {
  static isFileDropped() {
    return !!lib.symbols.IsFileDropped();
  }

  static loadDroppedFiles() {
    const result = lib.symbols.LoadDroppedFiles();
    const view = new DataView(result.buffer);
    const length = view.getUint32(4, littleEndian);
    const pointer = Deno.UnsafePointer.create(
      view.getBigInt64(8, littleEndian),
    );
    const pointerView = new Deno.UnsafePointerView(pointer!);

    let list = [];
    for (let i = 0; i < length; i++) {
      const stringPointer = pointerView.getPointer(i * 8);
      const stringView = new Deno.UnsafePointerView(stringPointer!);
      list.push(stringView.getCString());
    }

    lib.symbols.UnloadDroppedFiles(result); // Clean up memory

    return list;
  }
}

// TODO
// RLAPI bool IsFileDropped(void);                                   // Check if a file has been dropped into window
// RLAPI FilePathList LoadDroppedFiles(void);                        // Load dropped filepaths
// RLAPI void UnloadDroppedFiles(FilePathList files);                // Unload dropped filepaths
import { lib } from "../bindings/bindings.ts";

export class FileDrop {
  static isFileDropped() {
    return !!lib.symbols.IsFileDropped();
  }

  static loadDroppedFiles() {
    const result = lib.symbols.LoadDroppedFiles();
    const view = new DataView(result.buffer);
    const length = view.getUint32(4, true);
    const pointer = Deno.UnsafePointer.create(view.getBigInt64(8, true));
    const pointerView = new Deno.UnsafePointerView(pointer);

    let list = [];
    for (let i = 0; i < length; i++) {
      const stringPointer = pointerView.getPointer(i * 8);
      const stringView = new Deno.UnsafePointerView(stringPointer);
      list.push(stringView.getCString());
    }

    lib.symbols.UnloadDroppedFiles(result); // Clean up memory

    return list;
  }
}

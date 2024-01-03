export * from "./bindings/bindings.ts";
import { lib } from "./bindings/bindings.ts";

// TODO: Check if numbers are correct (integers)

export * from "./src/window.ts";

export function beginDrawing() {
  lib.symbols.BeginDrawing();
}

export function clearBackground(color: Uint8Array) {
  lib.symbols.ClearBackground(color);
}

export function drawText(
  text: string,
  x: number,
  y: number,
  size: number,
  color: Uint8Array,
) {
  lib.symbols.DrawText(
    new TextEncoder().encode(text + "\0"),
    x,
    y,
    size,
    color,
  );
}

export function endDrawing() {
  lib.symbols.EndDrawing();
}

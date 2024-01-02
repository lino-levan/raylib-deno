export * from "./bindings/bindings.ts";

import { lib } from "./bindings/bindings.ts";

export function initWindow(width: number, height: number, title: string) {
  lib.symbols.InitWindow(width, height, new TextEncoder().encode(title + "\0"));
}

export function windowShouldClose() {
  return !!lib.symbols.WindowShouldClose();
}

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

export function closeWindow() {
  lib.symbols.CloseWindow();
}

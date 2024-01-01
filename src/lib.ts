import { dlopen } from "https://deno.land/x/plug@1.0.3/mod.ts";

export const lib = await dlopen({
  name: "raylib",
  url: import.meta.resolve("../blobs")
}, {
  InitWindow: { parameters: ["i32", "i32", "buffer"], result: "void" },
  CloseWindow: { parameters: [], result: "void" },
  WindowShouldClose: { parameters: [], result: "u8"},
  BeginDrawing: { parameters: [], result: "void" },
  EndDrawing: { parameters: [], result: "void" },
  ClearBackground: { parameters: ["u32"], result: "void"},
  DrawText: { parameters: ["buffer", "i32", "i32", "i32", "u32"], result: "void"},
});

function color(red: number, green: number, blue: number, alpha: number) {
  return ((alpha << 24) | (blue << 16) | (green << 8) | red) >>> 0;
}

lib.symbols.InitWindow(800, 600, new TextEncoder().encode("Hello Raylib!\0"));

while(!lib.symbols.WindowShouldClose()) {
  lib.symbols.BeginDrawing();
  lib.symbols.ClearBackground(color(0, 0, 255, 255));
  lib.symbols.DrawText(new TextEncoder().encode("Congrats! You created your first window!\0"), 190, 200, 20, color(255, 255, 0, 255));
  lib.symbols.EndDrawing();
}

lib.symbols.CloseWindow();

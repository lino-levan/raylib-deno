import { lib, LIGHTGRAY, RAYWHITE } from "./bindings/bindings.ts";

lib.symbols.InitWindow(
  800,
  450,
  new TextEncoder().encode("raylib [core] example - basic window\0"),
);

let x = 0;

while (!lib.symbols.WindowShouldClose()) {
  lib.symbols.BeginDrawing();
  lib.symbols.ClearBackground(RAYWHITE);
  lib.symbols.DrawText(
    new TextEncoder().encode("Congrats! You created your first window!\0"),
    lib.symbols.GetMouseX(),
    lib.symbols.GetMouseY(),
    20,
    LIGHTGRAY,
  );
  lib.symbols.EndDrawing();
  if (x % 1000000 === 1000) {
    lib.symbols.TakeScreenshot(new TextEncoder().encode("test.png\0"));
  }
  x++;
}

lib.symbols.CloseWindow();

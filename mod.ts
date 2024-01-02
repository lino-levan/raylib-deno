import { lib, RAYWHITE, LIGHTGRAY } from "./bindings/bindings.ts";

lib.symbols.InitWindow(800, 450, new TextEncoder().encode("raylib [core] example - basic window\0"));

while (!lib.symbols.WindowShouldClose())
{
    lib.symbols.BeginDrawing();
    lib.symbols.ClearBackground(RAYWHITE);
    lib.symbols.DrawText(new TextEncoder().encode("Congrats! You created your first window!\0"), 190, 200, 20, LIGHTGRAY);
    lib.symbols.EndDrawing();
}

lib.symbols.CloseWindow();

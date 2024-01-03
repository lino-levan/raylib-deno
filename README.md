# Raylib Deno

Deno bindings for [raylib](https://github.com/raysan5/raylib).

## Usage

```typescript
import {
  beginDrawing,
  clearBackground,
  closeWindow,
  drawText,
  endDrawing,
  initWindow,
  LIGHTGRAY,
  RAYWHITE,
  windowShouldClose,
} from "https://deno.land/x/raylib";

initWindow(800, 450, "raylib [core] example - basic window");

while (!windowShouldClose()) {
  beginDrawing();
  clearBackground(RAYWHITE);
  drawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);
  endDrawing();
}

closeWindow();
```

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
} from "raylib";

initWindow(800, 450, "raylib [core] example - basic window");

while (!windowShouldClose()) {
  beginDrawing();
  clearBackground(RAYWHITE);
  drawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);
  endDrawing();
}

closeWindow();

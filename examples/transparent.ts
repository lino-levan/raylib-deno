import {
  BLACK,
  BLANK,
  Drawing,
  Mouse,
  Shapes,
  Timing,
  Vector2,
  Window,
} from "raylib";

Timing.setTargetFPS(60);
Window.init(100, 100, "Hey", {
  transparent: true,
  undecorated: true,
  topmost: true,
  mousePassthrough: true,
});
Window.setPosition(0, 0);

let height = 50;
let frame = 0;

while (!Window.shouldClose()) {
  frame++;
  Drawing.beginDrawing();
  Drawing.clearBackground(BLANK);
  Window.setSize(100, Math.round(height));

  Shapes.drawLineEx(new Vector2(0, 0), new Vector2(100, height), 10, BLACK);

  height = Math.round(Math.sin(frame / 10) * 25 + 50);

  Drawing.endDrawing();
}

Window.close();

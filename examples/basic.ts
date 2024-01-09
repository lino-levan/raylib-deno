import { Color, Drawing, LIGHTGRAY, RAYWHITE, Text, Window } from "raylib";

Window.init(800, 450, "Raylib - Basic Window");

while (!Window.shouldClose()) {
  Drawing.beginDrawing();
  Drawing.clearBackground(RAYWHITE);
  Text.drawText(
    "Congrats! You created your first window!",
    190,
    200,
    20,
    LIGHTGRAY,
  );
  console.log(Window.getPosition());
  Drawing.endDrawing();
}

Window.close();

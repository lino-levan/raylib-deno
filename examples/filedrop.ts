import { Drawing, FileDrop, LIGHTGRAY, RAYWHITE, Text, Window } from "raylib";

Window.init(800, 450, "Raylib - File Drop");

while (!Window.shouldClose()) {
  Drawing.beginDrawing();
  Drawing.clearBackground(RAYWHITE);
  Text.drawText(
    "Try dropping a file here, then read the console.",
    190,
    200,
    20,
    LIGHTGRAY,
  );

  if (FileDrop.isFileDropped()) {
    const files = FileDrop.loadDroppedFiles();
    console.log(files);
  }

  Drawing.endDrawing();
}

Window.close();

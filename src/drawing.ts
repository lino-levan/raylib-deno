/**
 * Drawing-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";
import { Color } from "./color.ts";
import { Camera2D, Camera3D } from "./_util.ts";

export class Drawing {
  /** Set background color (framebuffer clear color) */
  static clearBackground(color: Color) {
    lib.symbols.ClearBackground(color.buffer);
  }

  /** Setup canvas (framebuffer) to start drawing */
  static beginDrawing() {
    lib.symbols.BeginDrawing();
  }

  /** End canvas drawing and swap buffers (double buffering) */
  static endDrawing() {
    lib.symbols.EndDrawing();
  }

  /** Initialize 2D mode with custom camera (2D) */
  static beginMode2D(camera: Camera2D) {
    lib.symbols.BeginMode2D(camera.buffer);
  }

  /** Ends 2D mode with custom camera */
  static endMode2D() {
    lib.symbols.EndMode2D();
  }

  /** Initializes 3D mode with custom camera (3D) */
  static beginMode3D(camera: Camera3D) {
    lib.symbols.BeginMode3D(camera.buffer);
  }

  /** Ends 3D mode and returns to default 2D orthographic mode */
  static endMode3D() {
    lib.symbols.EndMode3D();
  }
}

// TODO(lino-levan): The rest of these
// RLAPI void BeginTextureMode(RenderTexture2D target);              // Begin drawing to render texture
// RLAPI void EndTextureMode(void);                                  // Ends drawing to render texture
// RLAPI void BeginShaderMode(Shader shader);                        // Begin custom shader drawing
// RLAPI void EndShaderMode(void);                                   // End custom shader drawing (use default shader)
// RLAPI void BeginBlendMode(int mode);                              // Begin blending mode (alpha, additive, multiplied, subtract, custom)
// RLAPI void EndBlendMode(void);                                    // End blending mode (reset to default: alpha blending)
// RLAPI void BeginScissorMode(int x, int y, int width, int height); // Begin scissor mode (define screen area for following drawing)
// RLAPI void EndScissorMode(void);                                  // End scissor mode
// RLAPI void BeginVrStereoMode(VrStereoConfig config);              // Begin stereo rendering (requires VR simulator)
// RLAPI void EndVrStereoMode(void);                                 // End stereo rendering (requires VR simulator)

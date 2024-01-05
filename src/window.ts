/**
 * Window-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";

/** Initialize window and OpenGL context */
export function initWindow(width: number, height: number, title: string) {
  lib.symbols.InitWindow(width, height, new TextEncoder().encode(title + "\0"));
}

/** Close window and unload OpenGL context */
export function closeWindow() {
  lib.symbols.CloseWindow();
}

/** Check if application should close (KEY_ESCAPE pressed or windows close icon clicked) */
export function windowShouldClose() {
  return !!lib.symbols.WindowShouldClose();
}

/** Check if window has been initialized successfully */
export function isWindowReady() {
  return !!lib.symbols.IsWindowReady();
}

/** Check if window is currently fullscreen */
export function isWindowFullscreen() {
  return !!lib.symbols.IsWindowFullscreen();
}

/** Check if window is currently hidden */
export function isWindowHidden() {
  return !!lib.symbols.IsWindowHidden();
}

/** Check if window is currently minimized */
export function isWindowMinimized() {
  return !!lib.symbols.IsWindowMinimized();
}

/** Check if window is currently maximized */
export function isWindowMaximized() {
  return !!lib.symbols.IsWindowMaximized();
}

/** Check if window is currently focused */
export function isWindowFocused() {
  return !!lib.symbols.IsWindowFocused();
}

/** Check if window has been resized last frame */
export function isWindowResized() {
  return !!lib.symbols.IsWindowResized();
}

/** System/Window config flags.  By default all flags are set to false. */
export interface WindowState {
  /** Set to try enabling V-Sync on GPU */
  vsync: boolean;
  /** Set to run program in fullscreen */
  fullscreen: boolean;
  /** Set to allow resizable window */
  resizable: boolean;
  /** Set to disable window decoration (frame and buttons) */
  undecorated: boolean;
  /** Set to hide window */
  hidden: boolean;
  /** Set to minimize window (iconify) */
  minimized: boolean;
  /** Set to maximize window (expanded to monitor) */
  maximized: boolean;
  /** Set to window non focused */
  unfocused: boolean;
  /** Set to window always on top */
  topmost: boolean;
  /** Set to allow windows running while minimized */
  alwaysRun: boolean;
  /** Set to allow transparent framebuffer */
  transparent: boolean;
  /** Set to support HighDPI */
  highDPI: boolean;
  /** Set to support mouse passthrough, only supported when the undecorated flag is set as well */
  mousePassthrough: boolean;
  /** Set to run program in borderless windowed mode */
  borderless: boolean;
  /** Set to try enabling MSAA 4X */
  msaa4x: boolean;
  /** Set to try enabling interlaced video format (for V3D) */
  interlaced: boolean;
}

const FLAG_BITMASK = {
  vsync: 0x00000040,
  fullscreen: 0x00000002,
  resizable: 0x00000004,
  undecorated: 0x00000008,
  hidden: 0x00000080,
  minimized: 0x00000200,
  maximized: 0x00000400,
  unfocused: 0x00000800,
  topmost: 0x00001000,
  alwaysRun: 0x00000100,
  transparent: 0x00000010,
  highDPI: 0x00002000,
  mousePassthrough: 0x00004000,
  borderless: 0x00008000,
  msaa4x: 0x00000020,
  interlaced: 0x00010000,
};

/** Check if one specific window flag is enabled */
export function isWindowState(flags: Partial<WindowState>) {
  const flag = Object.keys(flags).reduce((acc, key) => {
    return acc | FLAG_BITMASK[key as keyof WindowState];
  }, 0);
  return !!lib.symbols.IsWindowState(flag);
}

/** Set window configuration state using flags */
export function setWindowState(flags: Partial<WindowState>) {
  const flag = Object.keys(flags).reduce((acc, key) => {
    return acc | FLAG_BITMASK[key as keyof WindowState];
  }, 0);
  lib.symbols.SetWindowState(flag);
}

/** Clear window configuration state flags */
export function clearWindowState(flags: Partial<WindowState>) {
  const flag = Object.keys(flags).reduce((acc, key) => {
    return acc | FLAG_BITMASK[key as keyof WindowState];
  }, 0);
  lib.symbols.ClearWindowState(flag);
}

/** Toggle window state: fullscreen/windowed */
export function toggleFullscreen() {
  lib.symbols.ToggleFullscreen();
}

/** Toggle window state: borderless windowed */
export function toggleBorderlessWindowed() {
  lib.symbols.ToggleBorderlessWindowed();
}

/** Set window state: maximized, if resizable */
export function maximizeWindow() {
  lib.symbols.MaximizeWindow();
}

/** Set window state: minimized, if resizable */
export function minimizeWindow() {
  lib.symbols.MinimizeWindow();
}

/** Set window state: not minimized/maximized */
export function restoreWindow() {
  lib.symbols.RestoreWindow();
}

/** Set icon for window (single image, RGBA 32bit) */
// TODO: Implement Image
// export function setWindowIcon(image: Image) {
//   lib.symbols.SetWindowIcon(image);
// }

/** Set icon for window (multiple images, RGBA 32bit) */
// TODO: Implement Image
// export function setWindowIcons(image: Image) {
//   lib.symbols.SetWindowIcons(image);
// }

/** Set title for window */
export function setWindowTitle(title: string) {
  lib.symbols.SetWindowTitle(new TextEncoder().encode(title + "\0"));
}

/** Set window position on screen */
export function setWindowPosition(x: number, y: number) {
  lib.symbols.SetWindowPosition(x, y);
}

/** Set monitor for the current window */
export function setWindowMonitor(monitor: number) {
  lib.symbols.SetWindowMonitor(monitor);
}

/** Set window minimum dimensions (for resizable windows) */
export function setWindowMinSize(width: number, height: number) {
  lib.symbols.SetWindowMinSize(width, height);
}

/** Set window maximum dimensions (for resizable windows) */
export function setWindowMaxSize(width: number, height: number) {
  lib.symbols.SetWindowMaxSize(width, height);
}

/** Set window dimensions */
export function setWindowSize(width: number, height: number) {
  lib.symbols.SetWindowSize(width, height);
}

/** Set window opacity [0.0f..1.0f] */
export function setWindowOpacity(opacity: number) {
  lib.symbols.SetWindowOpacity(opacity);
}

/** Set window focused */
export function setWindowFocused() {
  lib.symbols.SetWindowFocused();
}

/** Get native window handle (DANGEROUS) */
export function getWindowHandle() {
  return lib.symbols.GetWindowHandle();
}

/** Get current screen width */
export function getScreenWidth() {
  return lib.symbols.GetScreenWidth();
}

/** Get current screen height */
export function getScreenHeight() {
  return lib.symbols.GetScreenHeight();
}

/** Get current render width (it considers HiDPI) */
export function getRenderWidth() {
  return lib.symbols.GetRenderWidth();
}

/** Get current render height (it considers HiDPI) */
export function getRenderHeight() {
  return lib.symbols.GetRenderHeight();
}

/** Get number of connected monitors */
export function getMonitorCount() {
  return lib.symbols.GetMonitorCount();
}

/** Get current connected monitor */
export function getCurrentMonitor() {
  return new Monitor(lib.symbols.GetCurrentMonitor());
}

/** A class to interact with a monitor object */
export class Monitor {
  #id: number;
  /** Do not construct manually if at all possible. */
  constructor(id: number) {
    this.#id = id;
  }

  /** Get monitor position */
  get position() {
    const pos = new DataView(lib.symbols.GetMonitorPosition(this.#id).buffer);
    return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
  }

  /** Get specified monitor width (current video mode used by monitor) */
  get width() {
    return lib.symbols.GetMonitorWidth(this.#id);
  }

  /** Get specified monitor height (current video mode used by monitor) */
  get height() {
    return lib.symbols.GetMonitorHeight(this.#id);
  }

  /**  Get specified monitor physical width in millimetres */
  get physicalWidth() {
    return lib.symbols.GetMonitorPhysicalWidth(this.#id);
  }

  /** Get specified monitor physical height in millimetres */
  get physicalHeight() {
    return lib.symbols.GetMonitorPhysicalHeight(this.#id);
  }

  /** Get specified monitor refresh rate */
  get refreshRate() {
    return lib.symbols.GetMonitorRefreshRate(this.#id);
  }

  /** Get the human-readable, UTF-8 encoded name of the primary monitor */
  get name() {
    return new Deno.UnsafePointerView(lib.symbols.GetMonitorName(this.#id))
      .getCString();
  }
}

/** Get window position XY on monitor */
export function getWindowPosition() {
  const pos = new DataView(lib.symbols.GetWindowPosition().buffer);
  return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
}

/** Get window scale DPI factor */
export function getWindowScaleDPI() {
  const pos = new DataView(lib.symbols.getWindowScaleDPI().buffer);
  return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
}

/** Set clipboard text content. TODO(lino-levan): Investigate why this doesn't seem to work */
export function setClipboardText(text: string) {
  lib.symbols.SetClipboardText(new TextEncoder().encode(text + "\0"));
}

/** Get clipboard text content. TODO(lino-levan): Investigate why this doesn't seem to work */
export function getClipboardText() {
  return new Deno.UnsafePointerView(lib.symbols.GetClipboardText())
    .getCString();
}

/** Enable waiting for events on EndDrawing(), no automatic event polling */
export function enableEventWaiting() {
  lib.symbols.EnableEventWaiting();
}

/** Disable waiting for events on EndDrawing(), resume automatic event polling */
export function disableEventWaiting() {
  lib.symbols.DisableEventWaiting();
}

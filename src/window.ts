/**
 * Window-related functions
 * @module
 */

import { lib } from "../bindings/bindings.ts";
import { Image } from "./image.ts";

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

/** A class representing a window */
export class Window {
  /** Initialize window and OpenGL context */
  static init(width: number, height: number, title: string) {
    lib.symbols.InitWindow(
      width,
      height,
      new TextEncoder().encode(title + "\0"),
    );
  }

  /** Close window and unload OpenGL context */
  static close() {
    lib.symbols.CloseWindow();
  }

  /** Check if application should close (KEY_ESCAPE pressed or windows close icon clicked) */
  static shouldClose() {
    return !!lib.symbols.WindowShouldClose();
  }

  /** Check if window has been initialized successfully */
  static isReady() {
    return !!lib.symbols.IsWindowReady();
  }

  /** Check if window is currently fullscreen */
  static isFullscreen() {
    return !!lib.symbols.IsWindowFullscreen();
  }

  /** Check if window is currently hidden */
  static isHidden() {
    return !!lib.symbols.IsWindowHidden();
  }

  /** Check if window is currently minimized */
  static isMinimized() {
    return !!lib.symbols.IsWindowMinimized();
  }

  /** Check if window is currently maximized */
  static isMaximized() {
    return !!lib.symbols.IsWindowMaximized();
  }

  /** Check if window is currently focused */
  static isFocused() {
    return !!lib.symbols.IsWindowFocused();
  }

  /** Check if window has been resized last frame */
  static isResized() {
    return !!lib.symbols.IsWindowResized();
  }

  /** Check if one specific window flag is enabled */
  static isState(flags: Partial<WindowState>) {
    const flag = Object.keys(flags).reduce((acc, key) => {
      return acc | FLAG_BITMASK[key as keyof WindowState];
    }, 0);
    return !!lib.symbols.IsWindowState(flag);
  }

  /** Set window configuration state using flags */
  static setState(flags: Partial<WindowState>) {
    const flag = Object.keys(flags).reduce((acc, key) => {
      return acc | FLAG_BITMASK[key as keyof WindowState];
    }, 0);
    lib.symbols.SetWindowState(flag);
  }

  /** Clear window configuration state flags */
  static clearState(flags: Partial<WindowState>) {
    const flag = Object.keys(flags).reduce((acc, key) => {
      return acc | FLAG_BITMASK[key as keyof WindowState];
    }, 0);
    lib.symbols.ClearWindowState(flag);
  }

  /** Toggle window state: fullscreen/windowed */
  static toggleFullscreen() {
    lib.symbols.ToggleFullscreen();
  }

  /** Toggle window state: borderless windowed */
  static toggleBorderlessWindowed() {
    lib.symbols.ToggleBorderlessWindowed();
  }

  /** Set window state: maximized, if resizable */
  static maximize() {
    lib.symbols.MaximizeWindow();
  }

  /** Set window state: minimized, if resizable */
  static minimize() {
    lib.symbols.MinimizeWindow();
  }

  /** Set window state: not minimized/maximized */
  static restore() {
    lib.symbols.RestoreWindow();
  }

  /** Set icon for window (single image, RGBA 32bit) */
  static setIcon(image: Image) {
    lib.symbols.SetWindowIcon(image.buffer);
  }

  /** Set icon for window (multiple images, RGBA 32bit) */
  static setIcons(images: Image[]) {
    const buffer = new Uint8Array(24 * images.length);
    for (let i = 0; i < images.length; i++) {
      buffer.set(new Uint8Array(images[i].buffer), 24 * i);
    }

    lib.symbols.SetWindowIcons(Deno.UnsafePointer.of(buffer), images.length);
  }

  /** Set title for window */
  static setTitle(title: string) {
    lib.symbols.SetWindowTitle(new TextEncoder().encode(title + "\0"));
  }

  /** Set window position on screen */
  static setPosition(x: number, y: number) {
    lib.symbols.SetWindowPosition(x, y);
  }

  // TODO: Rethink this API
  /** Set monitor for the current window */
  static setMonitor(monitor: number) {
    lib.symbols.SetWindowMonitor(monitor);
  }

  /** Set window minimum dimensions (for resizable windows) */
  static setMinSize(width: number, height: number) {
    lib.symbols.SetWindowMinSize(width, height);
  }

  /** Set window maximum dimensions (for resizable windows) */
  static setMaxSize(width: number, height: number) {
    lib.symbols.SetWindowMaxSize(width, height);
  }

  /** Set window dimensions */
  static setSize(width: number, height: number) {
    lib.symbols.SetWindowSize(width, height);
  }

  /** Set window opacity [0.0f..1.0f] */
  static setOpacity(opacity: number) {
    lib.symbols.SetWindowOpacity(opacity);
  }

  /** Set window focused */
  static setFocused() {
    lib.symbols.SetWindowFocused();
  }

  /** Get native window handle (DANGEROUS) */
  static getHandle() {
    return lib.symbols.GetWindowHandle();
  }

  /** Get window position XY on monitor */
  static getPosition() {
    const pos = new DataView(lib.symbols.GetWindowPosition().buffer);
    return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
  }

  /** Get window scale DPI factor */
  static getScaleDPI() {
    const pos = new DataView(lib.symbols.GetWindowScaleDPI().buffer);
    return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
  }

  /** Enable waiting for events on EndDrawing(), no automatic event polling */
  static enableEventWaiting() {
    lib.symbols.EnableEventWaiting();
  }

  /** Disable waiting for events on EndDrawing(), resume automatic event polling */
  static disableEventWaiting() {
    lib.symbols.DisableEventWaiting();
  }
}

/** A class to interact with the screen */
export class Screen {
  /** Get current screen width */
  static getWidth() {
    return lib.symbols.GetScreenWidth();
  }

  /** Get current screen height */
  static getHeight() {
    return lib.symbols.GetScreenHeight();
  }

  /** Get current render width (it considers HiDPI) */
  static getRenderWidth() {
    return lib.symbols.GetRenderWidth();
  }

  /** Get current render height (it considers HiDPI) */
  static getRenderHeight() {
    return lib.symbols.GetRenderHeight();
  }
}

/** A class to interact with a monitor object */
export class Monitor {
  #id: number;
  /** Do not construct manually if at all possible. */
  constructor(id: number) {
    this.#id = id;
  }

  /** Get number of connected monitors */
  static getCount() {
    return lib.symbols.GetMonitorCount();
  }

  /** Get current connected monitor */
  static getCurrent() {
    return new Monitor(lib.symbols.GetCurrentMonitor());
  }

  /** Get monitor position */
  getPosition() {
    const pos = new DataView(lib.symbols.GetMonitorPosition(this.#id).buffer);
    return { x: pos.getFloat32(0), y: pos.getFloat32(4) };
  }

  /** Get specified monitor width (current video mode used by monitor) */
  getWidth() {
    return lib.symbols.GetMonitorWidth(this.#id);
  }

  /** Get specified monitor height (current video mode used by monitor) */
  getHeight() {
    return lib.symbols.GetMonitorHeight(this.#id);
  }

  /**  Get specified monitor physical width in millimetres */
  getPhysicalWidth() {
    return lib.symbols.GetMonitorPhysicalWidth(this.#id);
  }

  /** Get specified monitor physical height in millimetres */
  getPhysicalHeight() {
    return lib.symbols.GetMonitorPhysicalHeight(this.#id);
  }

  /** Get specified monitor refresh rate */
  getRefreshRate() {
    return lib.symbols.GetMonitorRefreshRate(this.#id);
  }

  /** Get the human-readable, UTF-8 encoded name of the primary monitor */
  getName() {
    return new Deno.UnsafePointerView(lib.symbols.GetMonitorName(this.#id)!)
      .getCString();
  }
}

// TODO(lino-levan): Investigate why this doesn't seem to work
/** A class to interact with a clipboard object */
export class Clipboard {
  /** Get clipboard text content. */
  static getText() {
    return new Deno.UnsafePointerView(lib.symbols.GetClipboardText()!)
      .getCString();
  }

  /** Set clipboard text content. */
  static setText(text: string) {
    lib.symbols.SetClipboardText(new TextEncoder().encode(text + "\0"));
  }
}

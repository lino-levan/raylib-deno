/**
 * Gamepad utility functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** Gamepad functions */
export class Gamepad {
  /**  Check if a gamepad is available */
  static isAvailable(gamepad: number) {
    return !!lib.symbols.IsGamepadAvailable(gamepad);
  }

  /** Get gamepad internal name id */
  static getName(gamepad: number) {
    return new Deno.UnsafePointerView(lib.symbols.GetGamepadName(gamepad)!)
      .getCString();
  }

  /** Check if a gamepad button has been pressed once */
  static isButtonPressed(gamepad: number, button: number) {
    return !!lib.symbols.IsGamepadButtonPressed(gamepad, button);
  }

  /** Check if a gamepad button is being pressed */
  static isButtonDown(gamepad: number, button: number) {
    return !!lib.symbols.IsGamepadButtonDown(gamepad, button);
  }

  /** Check if a gamepad button has been released once */
  static isButtonReleased(gamepad: number, button: number) {
    return !!lib.symbols.IsGamepadButtonReleased(gamepad, button);
  }

  /** Check if a gamepad button is being pressed */
  static isButtonUp(gamepad: number, button: number) {
    return !!lib.symbols.IsGamepadButtonUp(gamepad, button);
  }

  /** Get the last gamepad button pressed */
  static getButtonPressed() {
    return lib.symbols.GetGamepadButtonPressed();
  }

  /** Get gamepad axis count for a gamepad */
  static getAxisCount(gamepad: number) {
    return lib.symbols.GetGamepadAxisCount(gamepad);
  }

  /** Get gamepad axis count for a gamepad */
  static getAxisMovement(gamepad: number, axis: number) {
    return lib.symbols.GetGamepadAxisMovement(gamepad, axis);
  }

  /** Set internal gamepad mappings (SDL_GameControllerDB) */
  static setMappings(mappings: string) {
    return lib.symbols.SetGamepadMappings(
      new TextEncoder().encode(mappings + "\0"),
    );
  }
}

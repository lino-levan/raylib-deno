/**
 * Gesture functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { Vector2 } from "./_util.ts";

const gestureFlags = {
  none: 0,
  tap: 1,
  doubleTap: 2,
  hold: 4,
  drag: 8,
  swipeRight: 16,
  swipeLeft: 32,
  swipeUp: 64,
  swipeDown: 128,
  pinchIn: 256,
  pinchOut: 512,
};

/** Different gestures to be enabled or disabled */
export interface GestureFlags {
  /** No gesture */
  none?: boolean;
  /** Tap gesture */
  tap?: boolean;
  /** Double tap gesture */
  doubleTap?: boolean;
  /** Hold gesture */
  hold?: boolean;
  /** Drag gesture */
  drag?: boolean;
  /** Swipe right gesture */
  swipeRight?: boolean;
  /** Swipe left gesture */
  swipeLeft?: boolean;
  /** Swipe up gesture */
  swipeUp?: boolean;
  /** Swipe down gesture */
  swipeDown?: boolean;
  /** Pinch in gesture */
  pinchIn?: boolean;
  /** Pinch out gesture */
  pinchOut?: boolean;
}

/** A simple class for interacting with gestures */
export class Gesture {
  /** Enable a set of gestures using flags */
  static setEnabled(flags: GestureFlags) {
    const flag = Object.keys(flags).reduce((acc, key) => {
      return acc | gestureFlags[key as keyof GestureFlags];
    }, 0);
    lib.symbols.SetGesturesEnabled(flag);
  }

  /** Check if a gesture have been detected */
  isDetected(gesture: keyof GestureFlags): boolean {
    return !!lib.symbols.IsGestureDetected(gestureFlags[gesture]);
  }

  /** Get latest detected gesture */
  getDetected(): keyof GestureFlags {
    const result = lib.symbols.GetGestureDetected();
    for (const [key, value] of Object.entries(gestureFlags)) {
      if (result === value) {
        return key as keyof GestureFlags;
      }
    }

    // TODO(lino-levan): verify this is the correct behavior
    throw new Error("Unreachable");
  }

  /** Get gesture hold time in milliseconds */
  getHoldDuration(): number {
    return lib.symbols.GetGestureHoldDuration();
  }

  /** Get gesture drag vector */
  getDragVector(): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetGestureDragVector().buffer);
  }

  /** Get gesture drag angle */
  getDragAngle(): number {
    return lib.symbols.GetGestureDragAngle();
  }

  /** Get gesture pinch delta */
  getPinchVector(): Vector2 {
    return Vector2.fromBuffer(lib.symbols.GetGesturePinchVector().buffer);
  }

  /** Get gesture pinch angle */
  getPinchingAngle(): number {
    return lib.symbols.GetGesturePinchAngle();
  }
}

/**
 * Automation event related functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";
import { littleEndian } from "./_helper.ts";

/** Automation event functions */
export class AutomationEvent {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  play() {
    lib.symbols.PlayAutomationEvent(this.#buffer);
  }
}

/** Automation event list functions */
export class AutomationEventList {
  #buffer: Uint8Array<ArrayBuffer>;
  /** Load automation events list from file (supply nothing for an empty list) */
  constructor(fileName?: string) {
    if (fileName) {
      this.#buffer = lib.symbols.LoadAutomationEventList(
        new TextEncoder().encode(fileName + "\0"),
      );
    } else {
      this.#buffer = lib.symbols.LoadAutomationEventList(null);
    }
  }

  // TODO(lino-levan): Validate that this works
  get events(): AutomationEvent[] {
    const view = new DataView(this.#buffer.buffer);
    const count = view.getUint32(4, littleEndian);
    const elementView = new Deno.UnsafePointerView(
      Deno.UnsafePointer.create(view.getBigUint64(8)!)!,
    );
    const events: AutomationEvent[] = [];
    for (let i = 0; i < count; i++) {
      events.push(new AutomationEvent(elementView.getArrayBuffer(24, 24 * i)));
    }
    return events;
  }

  /** Unload automation events list from file */
  unload() {
    lib.symbols.UnloadAutomationEventList(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Export automation events list as text file. Returns true on success */
  export(fileName: string): boolean {
    return !!lib.symbols.ExportAutomationEventList(
      this.#buffer,
      new TextEncoder().encode(fileName + "\0"),
    );
  }

  /** Set automation event list to record to */
  set() {
    lib.symbols.SetAutomationEventList(Deno.UnsafePointer.of(this.#buffer));
  }

  /** Set automation event internal base frame to start recording */
  static setBaseFrame(frame: number) {
    lib.symbols.SetAutomationEventBaseFrame(frame);
  }

  /** Start recording automation events (AutomationEventList must be set) */
  static startRecording() {
    lib.symbols.StartAutomationEventRecording();
  }

  /** Start recording automation events (AutomationEventList must be set) */
  static stopRecording() {
    lib.symbols.StopAutomationEventRecording();
  }
}

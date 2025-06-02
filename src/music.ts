/**
 * Music functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** A simple class for interacting with music */
export class Music {
  #buffer: Uint8Array<ArrayBuffer>;
  /** Avoid using if at all possible */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  /** Load music stream from file */
  static loadStream(filename: string): Music {
    const encoded = new TextEncoder().encode(filename + "\0");
    return new Music(lib.symbols.LoadMusicStream(encoded));
  }

  /** Load music stream from data */
  static loadStreamFromMemory(
    fileType: string,
    data: Uint8Array<ArrayBuffer>,
  ): Music {
    const encoded = new TextEncoder().encode(fileType + "\0");
    return new Music(
      lib.symbols.LoadMusicStreamFromMemory(
        encoded,
        Deno.UnsafePointer.of(data),
        data.length,
      ),
    );
  }

  /** Checks if a music stream is ready */
  isReady(): boolean {
    return !!lib.symbols.IsMusicReady(this.#buffer);
  }

  /** Unload music stream */
  unload() {
    lib.symbols.UnloadMusicStream(this.#buffer);
  }

  /** Start music playing */
  play() {
    lib.symbols.PlayMusicStream(this.#buffer);
  }

  /** Check if music is playing */
  isPlaying(): boolean {
    return !!lib.symbols.IsMusicStreamPlaying(this.#buffer);
  }

  /** Updates buffers for music streaming */
  update() {
    lib.symbols.UpdateMusicStream(this.#buffer);
  }

  /** Stop music playing */
  stop() {
    lib.symbols.StopMusicStream(this.#buffer);
  }

  /** Pause music playing */
  pause() {
    lib.symbols.PauseMusicStream(this.#buffer);
  }

  /** Resume playing paused music */
  resume() {
    lib.symbols.ResumeMusicStream(this.#buffer);
  }

  /** Seek music to a position (in seconds) */
  seek(position: number) {
    lib.symbols.SeekMusicStream(this.#buffer, position);
  }

  /** Set volume for music (1.0 is max level) */
  setVolume(volume: number) {
    lib.symbols.SetMusicVolume(this.#buffer, volume);
  }

  /** Set pitch for a music (1.0 is base level) */
  setPitch(pitch: number) {
    lib.symbols.SetMusicPitch(this.#buffer, pitch);
  }

  /** Set pan for a music (0.5 is center) */
  setPan(pan: number) {
    lib.symbols.SetMusicPan(this.#buffer, pan);
  }

  /** Get music time length (in seconds) */
  getTimeLength(): number {
    return lib.symbols.GetMusicTimeLength(this.#buffer);
  }

  /** Get current music time played (in seconds) */
  getTimePlayed(): number {
    return lib.symbols.GetMusicTimePlayed(this.#buffer);
  }
}

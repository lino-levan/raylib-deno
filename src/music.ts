/**
 * Music functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** A simple class for interacting with music */
export class Music {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  /** Load music stream from file */
  static loadStream(filename: string) {
    const encoded = new TextEncoder().encode(filename + "\0");
    return new Music(lib.symbols.LoadMusicStream(encoded));
  }

  /** Load music stream from data */
  static loadStreamFromMemory(fileType: string, data: Uint8Array) {
    const encoded = new TextEncoder().encode(fileType + "\0");
    return new Music(
      lib.symbols.LoadMusicStreamFromMemory(encoded, data, data.length),
    );
  }

  /** Checks if a music stream is ready */
  isReady() {
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
  isPlaying() {
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
  getTimeLength() {
    return lib.symbols.GetMusicTimeLength(this.#buffer);
  }

  /** Get current music time played (in seconds) */
  getTimePlayed() {
    return lib.symbols.GetMusicTimePlayed(this.#buffer);
  }
}

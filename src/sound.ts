/**
 * Functions for dealing with sound and waves
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** Wave functions */
export class Wave {
  #buffer: Uint8Array<ArrayBuffer>;
  /** Avoid using if at all possible */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /** Total number of frames (considering channels) */
  get frameCount(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getUint32(0, true);
  }

  /** Frequency (samples per second) */
  get sampleRate(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getUint32(4, true);
  }

  /** Bit depth (bits per sample): 8, 16, 32 (24 not supported) */
  get sampleSize(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getUint32(8, true);
  }

  /** Number of channels (1-mono, 2-stereo, ...) */
  get channels(): number {
    const view = new DataView(this.#buffer.buffer);
    return view.getUint32(12, true);
  }

  /** Load wave data from file */
  static load(filename: string): Wave {
    const encoded = new TextEncoder().encode(filename + "\0");
    return new Wave(lib.symbols.LoadWave(encoded));
  }

  /** Load wave from memory buffer, fileType refers to extension: i.e. '.wav' */
  static loadFromMemory(fileType: string, fileData: Uint8Array): Wave {
    const encoded = new TextEncoder().encode(fileType + "\0");
    return new Wave(
      lib.symbols.LoadWaveFromMemory(
        encoded,
        Deno.UnsafePointer.of(fileData),
        fileData.length,
      ),
    );
  }

  /** Checks if wave data is ready */
  isReady(): boolean {
    return !!lib.symbols.IsWaveReady(this.#buffer);
  }

  /** Unload wave data */
  unload() {
    lib.symbols.UnloadWave(this.#buffer);
  }

  /** Export wave data to file, returns true on success */
  export(filename: string): boolean {
    const encoded = new TextEncoder().encode(filename + "\0");
    return !!lib.symbols.ExportWave(this.#buffer, encoded);
  }

  /** Export wave sample data to code (.h), returns true on success */
  exportAsCode(filename: string): boolean {
    const encoded = new TextEncoder().encode(filename + "\0");
    return !!lib.symbols.ExportWaveAsCode(this.#buffer, encoded);
  }

  /** Copy a wave to a new wave */
  copy(): Wave {
    return new Wave(lib.symbols.WaveCopy(this.#buffer));
  }

  /** Crop this wave to defined samples range */
  crop(initSample: number, finalSample: number) {
    lib.symbols.WaveCrop(
      Deno.UnsafePointer.of(this.#buffer),
      initSample,
      finalSample,
    );
  }

  /** Convert wave data to desired format */
  format(sampleRate: number, sampleSize: number, channels: number) {
    lib.symbols.WaveFormat(
      Deno.UnsafePointer.of(this.#buffer),
      sampleRate,
      sampleSize,
      channels,
    );
  }

  /** Load samples data from wave as a 32bit float data array  */
  getSamples(): Float32Array {
    const pointer = lib.symbols.LoadWaveSamples(this.#buffer)!;
    const view = new Deno.UnsafePointerView(pointer);
    const samples = new Float32Array(this.frameCount * this.channels);

    for (let i = 0; i < samples.length; i++) {
      samples[i] = view.getFloat32(i * 4);
    }

    // unload pointer
    lib.symbols.UnloadWaveSamples(pointer);

    return samples;
  }
}

/** Sound functions */
export class Sound {
  #buffer: Uint8Array<ArrayBuffer>;
  /** Avoid using if at all possible */
  constructor(buffer: Uint8Array<ArrayBuffer>) {
    this.#buffer = buffer;
  }

  get buffer(): Uint8Array<ArrayBuffer> {
    return this.#buffer;
  }

  /** Load sound from file */
  static load(filename: string): Sound {
    const encoded = new TextEncoder().encode(filename + "\0");
    return new Sound(lib.symbols.LoadSound(encoded));
  }

  /** Load sound from wave data */
  static loadFromWave(wave: Wave): Sound {
    return new Sound(lib.symbols.LoadSoundFromWave(wave.buffer));
  }

  /** Create a new sound that shares the same sample data as the source sound, does not own the sound data */
  static loadAlias(source: Sound): Sound {
    return new Sound(lib.symbols.LoadSoundAlias(source.buffer));
  }

  /** Checks if a sound is ready */
  isReady(): boolean {
    return !!lib.symbols.IsSoundReady(this.#buffer);
  }

  /** Update sound buffer with new data */
  update(data: Float32Array) {
    lib.symbols.UpdateSound(
      this.#buffer,
      Deno.UnsafePointer.of(data),
      data.length,
    );
  }

  /** Unload sound */
  unload() {
    lib.symbols.UnloadSound(this.#buffer);
  }

  /** Unload a sound alias (does not deallocate sample data) */
  unloadAlias() {
    lib.symbols.UnloadSoundAlias(this.#buffer);
  }

  /** Play a sound */
  play() {
    lib.symbols.PlaySound(this.#buffer);
  }

  /** Stop playing a sound */
  stop() {
    lib.symbols.StopSound(this.#buffer);
  }

  /** Pause a sound */
  pause() {
    lib.symbols.PauseSound(this.#buffer);
  }

  /** Resume a paused sound */
  resume() {
    lib.symbols.ResumeSound(this.#buffer);
  }

  /** Check if a sound is currently playing */
  isPlaying(): boolean {
    return !!lib.symbols.IsSoundPlaying(this.#buffer);
  }

  /** Set volume for a sound (1.0 is max level) */
  setVolume(volume: number) {
    lib.symbols.SetSoundVolume(this.#buffer, volume);
  }

  /** Set pitch for a sound (1.0 is base level) */
  setPitch(pitch: number) {
    lib.symbols.SetSoundPitch(this.#buffer, pitch);
  }

  /** Set pan for a sound (0.5 is center) */
  setPan(pan: number) {
    lib.symbols.SetSoundPan(this.#buffer, pan);
  }
}

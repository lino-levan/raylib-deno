/**
 * Functions for dealing with sound and waves
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** Wave functions */
export class Wave {
  #buffer: ArrayBuffer;
  /** Avoid using if at all possible */
  constructor(buffer: ArrayBuffer) {
    this.#buffer = buffer;
  }

  get buffer() {
    return this.#buffer;
  }

  /** Total number of frames (considering channels) */
  get frameCount() {
    const view = new DataView(this.#buffer);
    return view.getUint32(0, true);
  }

  /** Frequency (samples per second) */
  get sampleRate() {
    const view = new DataView(this.#buffer);
    return view.getUint32(4, true);
  }

  /** Bit depth (bits per sample): 8, 16, 32 (24 not supported) */
  get sampleSize() {
    const view = new DataView(this.#buffer);
    return view.getUint32(8, true);
  }

  /** Number of channels (1-mono, 2-stereo, ...) */
  get channels() {
    const view = new DataView(this.#buffer);
    return view.getUint32(12, true);
  }

  /** Load wave data from file */
  static load(filename: string) {
    const encoded = new TextEncoder().encode(filename + "\0");
    return new Wave(lib.symbols.LoadWave(encoded));
  }

  /** Load wave from memory buffer, fileType refers to extension: i.e. '.wav' */
  static loadFromMemory(fileType: string, fileData: Uint8Array) {
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
  isReady() {
    return !!lib.symbols.IsWaveReady(this.#buffer);
  }

  /** Unload wave data */
  unload() {
    lib.symbols.UnloadWave(this.#buffer);
  }

  /** Export wave data to file, returns true on success */
  export(filename: string) {
    const encoded = new TextEncoder().encode(filename + "\0");
    return !!lib.symbols.ExportWave(this.#buffer, encoded);
  }

  /** Export wave sample data to code (.h), returns true on success */
  exportAsCode(filename: string) {
    const encoded = new TextEncoder().encode(filename + "\0");
    return !!lib.symbols.ExportWaveAsCode(this.#buffer, encoded);
  }

  /** Copy a wave to a new wave */
  copy() {
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
  getSamples() {
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

// TODO
// RLAPI Sound LoadSound(const char *fileName);                          // Load sound from file
// RLAPI Sound LoadSoundFromWave(Wave wave);                             // Load sound from wave data
// RLAPI Sound LoadSoundAlias(Sound source);                             // Create a new sound that shares the same sample data as the source sound, does not own the sound data
// RLAPI bool IsSoundReady(Sound sound);                                 // Checks if a sound is ready
// RLAPI void UpdateSound(Sound sound, const void *data, int sampleCount); // Update sound buffer with new data
// RLAPI void UnloadSound(Sound sound);                                  // Unload sound
// RLAPI void UnloadSoundAlias(Sound alias);                             // Unload a sound alias (does not deallocate sample data)

// RLAPI void PlaySound(Sound sound);                                    // Play a sound
// RLAPI void StopSound(Sound sound);                                    // Stop playing a sound
// RLAPI void PauseSound(Sound sound);                                   // Pause a sound
// RLAPI void ResumeSound(Sound sound);                                  // Resume a paused sound
// RLAPI bool IsSoundPlaying(Sound sound);                               // Check if a sound is currently playing
// RLAPI void SetSoundVolume(Sound sound, float volume);                 // Set volume for a sound (1.0 is max level)
// RLAPI void SetSoundPitch(Sound sound, float pitch);                   // Set pitch for a sound (1.0 is base level)
// RLAPI void SetSoundPan(Sound sound, float pan);                       // Set pan for a sound (0.5 is center)

/**
 * Audio stream functions
 * @module
 */
import { lib } from "../bindings/bindings.ts";

/** Class for interacting with an Audio Stream */
export class AudioStream {
  #buffer: ArrayBuffer;

  /** Load audio stream (to stream raw audio pcm data) */
  constructor(sampleRate: number, sampleSize: number, channels: number) {
    this.#buffer =
      lib.symbols.LoadAudioStream(sampleRate, sampleSize, channels).buffer;
  }

  /** Checks if an audio stream is ready */
  isReady() {
    return !!lib.symbols.IsAudioStreamReady(this.#buffer);
  }

  /** Unload audio stream and free memory */
  unload() {
    lib.symbols.UnloadAudioStream(this.#buffer);
  }

  /** Update audio stream buffers with data */
  update(data: ArrayBuffer, frameCount: number) {
    lib.symbols.UpdateAudioStream(
      this.#buffer,
      Deno.UnsafePointer.of(data),
      frameCount,
    );
  }

  /** Check if any audio stream buffers requires refill */
  isProcessed() {
    return !!lib.symbols.IsAudioStreamProcessed(this.#buffer);
  }

  /** Play audio stream */
  play() {
    lib.symbols.PlayAudioStream(this.#buffer);
  }

  /** Pause audio stream */
  pause() {
    lib.symbols.PauseAudioStream(this.#buffer);
  }

  /** Resume audio stream */
  resume() {
    lib.symbols.ResumeAudioStream(this.#buffer);
  }

  /** Check if audio stream is playing */
  isPlaying() {
    return !!lib.symbols.IsAudioStreamPlaying(this.#buffer);
  }

  /** Stop audio stream */
  stop() {
    lib.symbols.StopAudioStream(this.#buffer);
  }

  /** Set volume for audio stream (1.0 is max level) */
  setVolume(volume: number) {
    lib.symbols.SetAudioStreamVolume(this.#buffer, volume);
  }

  /** Set pitch for audio stream (1.0 is base level) */
  setPitch(pitch: number) {
    lib.symbols.SetAudioStreamPitch(this.#buffer, pitch);
  }

  /** Set pan for audio stream (0.5 is centered) */
  setPan(pan: number) {
    lib.symbols.SetAudioStreamPan(this.#buffer, pan);
  }

  /** Default size for new audio streams */
  static setBufferSizeDefault(size: number) {
    lib.symbols.SetAudioStreamBufferSizeDefault(size);
  }
}

// TODO
// RLAPI void SetAudioStreamCallback(AudioStream stream, AudioCallback callback); // Audio thread callback to request new data

// RLAPI void AttachAudioStreamProcessor(AudioStream stream, AudioCallback processor); // Attach audio stream processor to stream, receives the samples as <float>s
// RLAPI void DetachAudioStreamProcessor(AudioStream stream, AudioCallback processor); // Detach audio stream processor from stream

// RLAPI void AttachAudioMixedProcessor(AudioCallback processor); // Attach audio stream processor to the entire audio pipeline, receives the samples as <float>s
// RLAPI void DetachAudioMixedProcessor(AudioCallback processor); // Detach audio stream processor from the entire audio pipeline

/**
 * Audio device functions
 * @module
 */

export class AudioDevice {
  /** Initialize audio device and context */
  static init() {
    lib.symbols.InitAudioDevice();
  }

  /** Close the audio device and context */
  static close() {
    lib.symbols.CloseAudioDevice();
  }

  /** Check if audio device has been initialized successfully */
  static isReady() {
    return !!lib.symbols.IsAudioDeviceReady();
  }

  /** Set master volume (listener) */
  static setMasterVolume(volume: number) {
    lib.symbols.SetMasterVolume(volume);
  }

  /** Get master volume (listener) */
  static getMasterVolume() {
    return lib.symbols.GetMasterVolume();
  }
}

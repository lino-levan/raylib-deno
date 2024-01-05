// TODO
// RLAPI Wave LoadWave(const char *fileName);                            // Load wave data from file
// RLAPI Wave LoadWaveFromMemory(const char *fileType, const unsigned char *fileData, int dataSize); // Load wave from memory buffer, fileType refers to extension: i.e. '.wav'
// RLAPI bool IsWaveReady(Wave wave);                                    // Checks if wave data is ready
// RLAPI Sound LoadSound(const char *fileName);                          // Load sound from file
// RLAPI Sound LoadSoundFromWave(Wave wave);                             // Load sound from wave data
// RLAPI Sound LoadSoundAlias(Sound source);                             // Create a new sound that shares the same sample data as the source sound, does not own the sound data
// RLAPI bool IsSoundReady(Sound sound);                                 // Checks if a sound is ready
// RLAPI void UpdateSound(Sound sound, const void *data, int sampleCount); // Update sound buffer with new data
// RLAPI void UnloadWave(Wave wave);                                     // Unload wave data
// RLAPI void UnloadSound(Sound sound);                                  // Unload sound
// RLAPI void UnloadSoundAlias(Sound alias);                             // Unload a sound alias (does not deallocate sample data)
// RLAPI bool ExportWave(Wave wave, const char *fileName);               // Export wave data to file, returns true on success
// RLAPI bool ExportWaveAsCode(Wave wave, const char *fileName);         // Export wave sample data to code (.h), returns true on success

// RLAPI void PlaySound(Sound sound);                                    // Play a sound
// RLAPI void StopSound(Sound sound);                                    // Stop playing a sound
// RLAPI void PauseSound(Sound sound);                                   // Pause a sound
// RLAPI void ResumeSound(Sound sound);                                  // Resume a paused sound
// RLAPI bool IsSoundPlaying(Sound sound);                               // Check if a sound is currently playing
// RLAPI void SetSoundVolume(Sound sound, float volume);                 // Set volume for a sound (1.0 is max level)
// RLAPI void SetSoundPitch(Sound sound, float pitch);                   // Set pitch for a sound (1.0 is base level)
// RLAPI void SetSoundPan(Sound sound, float pan);                       // Set pan for a sound (0.5 is center)
// RLAPI Wave WaveCopy(Wave wave);                                       // Copy a wave to a new wave
// RLAPI void WaveCrop(Wave *wave, int initSample, int finalSample);     // Crop a wave to defined samples range
// RLAPI void WaveFormat(Wave *wave, int sampleRate, int sampleSize, int channels); // Convert wave data to desired format
// RLAPI float *LoadWaveSamples(Wave wave);                              // Load samples data from wave as a 32bit float data array
// RLAPI void UnloadWaveSamples(float *samples);                         // Unload samples data loaded with LoadWaveSamples()

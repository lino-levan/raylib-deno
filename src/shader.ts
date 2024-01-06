// TODO
// RLAPI Shader LoadShader(const char *vsFileName, const char *fsFileName);   // Load shader from files and bind default locations
// RLAPI Shader LoadShaderFromMemory(const char *vsCode, const char *fsCode); // Load shader from code strings and bind default locations
// RLAPI bool IsShaderReady(Shader shader);                                   // Check if a shader is ready
// RLAPI int GetShaderLocation(Shader shader, const char *uniformName);       // Get shader uniform location
// RLAPI int GetShaderLocationAttrib(Shader shader, const char *attribName);  // Get shader attribute location
// RLAPI void SetShaderValue(Shader shader, int locIndex, const void *value, int uniformType);               // Set shader uniform value
// RLAPI void SetShaderValueV(Shader shader, int locIndex, const void *value, int uniformType, int count);   // Set shader uniform value vector
// RLAPI void SetShaderValueMatrix(Shader shader, int locIndex, Matrix mat);         // Set shader uniform value (matrix 4x4)
// RLAPI void SetShaderValueTexture(Shader shader, int locIndex, Texture2D texture); // Set shader uniform value for texture (sampler2d)
// RLAPI void UnloadShader(Shader shader);                                    // Unload shader from GPU memory (VRAM)

// TODO
// RLAPI Font GetFontDefault(void);                                                            // Get the default Font
// RLAPI Font LoadFont(const char *fileName);                                                  // Load font from file into GPU memory (VRAM)
// RLAPI Font LoadFontEx(const char *fileName, int fontSize, int *codepoints, int codepointCount);  // Load font from file with extended parameters, use NULL for codepoints and 0 for codepointCount to load the default character set
// RLAPI Font LoadFontFromImage(Image image, Color key, int firstChar);                        // Load font from Image (XNA style)
// RLAPI Font LoadFontFromMemory(const char *fileType, const unsigned char *fileData, int dataSize, int fontSize, int *codepoints, int codepointCount); // Load font from memory buffer, fileType refers to extension: i.e. '.ttf'
// RLAPI bool IsFontReady(Font font);                                                          // Check if a font is ready
// RLAPI GlyphInfo *LoadFontData(const unsigned char *fileData, int dataSize, int fontSize, int *codepoints, int codepointCount, int type); // Load font data for further use
// RLAPI Image GenImageFontAtlas(const GlyphInfo *glyphs, Rectangle **glyphRecs, int glyphCount, int fontSize, int padding, int packMethod); // Generate image font atlas using chars info
// RLAPI void UnloadFontData(GlyphInfo *glyphs, int glyphCount);                               // Unload font chars info data (RAM)
// RLAPI void UnloadFont(Font font);                                                           // Unload font from GPU memory (VRAM)
// RLAPI bool ExportFontAsCode(Font font, const char *fileName);                               // Export font as code file, returns true on success

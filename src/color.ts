// TODO
// RLAPI Color Fade(Color color, float alpha);                                 // Get color with alpha applied, alpha goes from 0.0f to 1.0f
// RLAPI int ColorToInt(Color color);                                          // Get hexadecimal value for a Color
// RLAPI Vector4 ColorNormalize(Color color);                                  // Get Color normalized as float [0..1]
// RLAPI Color ColorFromNormalized(Vector4 normalized);                        // Get Color from normalized values [0..1]
// RLAPI Vector3 ColorToHSV(Color color);                                      // Get HSV values for a Color, hue [0..360], saturation/value [0..1]
// RLAPI Color ColorFromHSV(float hue, float saturation, float value);         // Get a Color from HSV values, hue [0..360], saturation/value [0..1]
// RLAPI Color ColorTint(Color color, Color tint);                             // Get color multiplied with another color
// RLAPI Color ColorBrightness(Color color, float factor);                     // Get color with brightness correction, brightness factor goes from -1.0f to 1.0f
// RLAPI Color ColorContrast(Color color, float contrast);                     // Get color with contrast correction, contrast values between -1.0f and 1.0f
// RLAPI Color ColorAlpha(Color color, float alpha);                           // Get color with alpha applied, alpha goes from 0.0f to 1.0f
// RLAPI Color ColorAlphaBlend(Color dst, Color src, Color tint);              // Get src alpha-blended into dst color with tint
// RLAPI Color GetColor(unsigned int hexValue);                                // Get Color structure from hexadecimal value
// RLAPI Color GetPixelColor(void *srcPtr, int format);                        // Get Color from a source pixel pointer of certain format
// RLAPI void SetPixelColor(void *dstPtr, Color color, int format);            // Set color formatted into destination pixel pointer
// RLAPI int GetPixelDataSize(int width, int height, int format);              // Get pixel data size in bytes for certain format

export const LIGHTGRAY = new Color(200, 200, 200, 255);
export const GRAY = new Color(130, 130, 130, 255);
export const DARKGRAY = new Color(80, 80, 80, 255);
export const YELLOW = new Color(253, 249, 0, 255);
export const GOLD = new Color(255, 203, 0, 255);
export const ORANGE = new Color(255, 161, 0, 255);
export const PINK = new Color(255, 109, 194, 255);
export const RED = new Color(230, 41, 55, 255);
export const MAROON = new Color(190, 33, 55, 255);
export const GREEN = new Color(0, 228, 48, 255);
export const LIME = new Color(0, 158, 47, 255);
export const DARKGREEN = new Color(0, 117, 44, 255);
export const SKYBLUE = new Color(102, 191, 255, 255);
export const BLUE = new Color(0, 121, 241, 255);
export const DARKBLUE = new Color(0, 82, 172, 255);
export const PURPLE = new Color(200, 122, 255, 255);
export const VIOLET = new Color(135, 60, 190, 255);
export const DARKPURPLE = new Color(112, 31, 126, 255);
export const BEIGE = new Color(211, 176, 131, 255);
export const BROWN = new Color(127, 106, 79, 255);
export const DARKBROWN = new Color(76, 63, 47, 255);
export const WHITE = new Color(255, 255, 255, 255);
export const BLACK = new Color(0, 0, 0, 255);
export const BLANK = new Color(0, 0, 0, 0);
export const MAGENTA = new Color(255, 0, 255, 255);
export const RAYWHITE = new Color(245, 245, 245, 255);

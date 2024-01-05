// TODO
// RLAPI Image LoadImage(const char *fileName);                                                             // Load image from file into CPU memory (RAM)
// RLAPI Image LoadImageRaw(const char *fileName, int width, int height, int format, int headerSize);       // Load image from RAW file data
// RLAPI Image LoadImageSvg(const char *fileNameOrString, int width, int height);                           // Load image from SVG file data or string with specified size
// RLAPI Image LoadImageAnim(const char *fileName, int *frames);                                            // Load image sequence from file (frames appended to image.data)
// RLAPI Image LoadImageFromMemory(const char *fileType, const unsigned char *fileData, int dataSize);      // Load image from memory buffer, fileType refers to extension: i.e. '.png'
// RLAPI Image LoadImageFromTexture(Texture2D texture);                                                     // Load image from GPU texture data
// RLAPI Image LoadImageFromScreen(void);                                                                   // Load image from screen buffer and (screenshot)
// RLAPI bool IsImageReady(Image image);                                                                    // Check if an image is ready
// RLAPI void UnloadImage(Image image);                                                                     // Unload image from CPU memory (RAM)
// RLAPI bool ExportImage(Image image, const char *fileName);                                               // Export image data to file, returns true on success
// RLAPI unsigned char *ExportImageToMemory(Image image, const char *fileType, int *fileSize);              // Export image to memory buffer
// RLAPI bool ExportImageAsCode(Image image, const char *fileName);                                         // Export image as code file defining an array of bytes, returns true on success
// RLAPI Image GenImageColor(int width, int height, Color color);                                           // Generate image: plain color
// RLAPI Image GenImageGradientLinear(int width, int height, int direction, Color start, Color end);        // Generate image: linear gradient, direction in degrees [0..360], 0=Vertical gradient
// RLAPI Image GenImageGradientRadial(int width, int height, float density, Color inner, Color outer);      // Generate image: radial gradient
// RLAPI Image GenImageGradientSquare(int width, int height, float density, Color inner, Color outer);      // Generate image: square gradient
// RLAPI Image GenImageChecked(int width, int height, int checksX, int checksY, Color col1, Color col2);    // Generate image: checked
// RLAPI Image GenImageWhiteNoise(int width, int height, float factor);                                     // Generate image: white noise
// RLAPI Image GenImagePerlinNoise(int width, int height, int offsetX, int offsetY, float scale);           // Generate image: perlin noise
// RLAPI Image GenImageCellular(int width, int height, int tileSize);                                       // Generate image: cellular algorithm, bigger tileSize means bigger cells
// RLAPI Image GenImageText(int width, int height, const char *text);                                       // Generate image: grayscale image from text data
// RLAPI Image ImageCopy(Image image);                                                                      // Create an image duplicate (useful for transformations)
// RLAPI Image ImageFromImage(Image image, Rectangle rec);                                                  // Create an image from another image piece
// RLAPI Image ImageText(const char *text, int fontSize, Color color);                                      // Create an image from text (default font)
// RLAPI Image ImageTextEx(Font font, const char *text, float fontSize, float spacing, Color tint);         // Create an image from text (custom sprite font)
// RLAPI void ImageFormat(Image *image, int newFormat);                                                     // Convert image data to desired format
// RLAPI void ImageToPOT(Image *image, Color fill);                                                         // Convert image to POT (power-of-two)
// RLAPI void ImageCrop(Image *image, Rectangle crop);                                                      // Crop an image to a defined rectangle
// RLAPI void ImageAlphaCrop(Image *image, float threshold);                                                // Crop image depending on alpha value
// RLAPI void ImageAlphaClear(Image *image, Color color, float threshold);                                  // Clear alpha channel to desired color
// RLAPI void ImageAlphaMask(Image *image, Image alphaMask);                                                // Apply alpha mask to image
// RLAPI void ImageAlphaPremultiply(Image *image);                                                          // Premultiply alpha channel
// RLAPI void ImageBlurGaussian(Image *image, int blurSize);                                                // Apply Gaussian blur using a box blur approximation
// RLAPI void ImageResize(Image *image, int newWidth, int newHeight);                                       // Resize image (Bicubic scaling algorithm)
// RLAPI void ImageResizeNN(Image *image, int newWidth,int newHeight);                                      // Resize image (Nearest-Neighbor scaling algorithm)
// RLAPI void ImageResizeCanvas(Image *image, int newWidth, int newHeight, int offsetX, int offsetY, Color fill);  // Resize canvas and fill with color
// RLAPI void ImageMipmaps(Image *image);                                                                   // Compute all mipmap levels for a provided image
// RLAPI void ImageDither(Image *image, int rBpp, int gBpp, int bBpp, int aBpp);                            // Dither image data to 16bpp or lower (Floyd-Steinberg dithering)
// RLAPI void ImageFlipVertical(Image *image);                                                              // Flip image vertically
// RLAPI void ImageFlipHorizontal(Image *image);                                                            // Flip image horizontally
// RLAPI void ImageRotate(Image *image, int degrees);                                                       // Rotate image by input angle in degrees (-359 to 359)
// RLAPI void ImageRotateCW(Image *image);                                                                  // Rotate image clockwise 90deg
// RLAPI void ImageRotateCCW(Image *image);                                                                 // Rotate image counter-clockwise 90deg
// RLAPI void ImageColorTint(Image *image, Color color);                                                    // Modify image color: tint
// RLAPI void ImageColorInvert(Image *image);                                                               // Modify image color: invert
// RLAPI void ImageColorGrayscale(Image *image);                                                            // Modify image color: grayscale
// RLAPI void ImageColorContrast(Image *image, float contrast);                                             // Modify image color: contrast (-100 to 100)
// RLAPI void ImageColorBrightness(Image *image, int brightness);                                           // Modify image color: brightness (-255 to 255)
// RLAPI void ImageColorReplace(Image *image, Color color, Color replace);                                  // Modify image color: replace color
// RLAPI Color *LoadImageColors(Image image);                                                               // Load color data from image as a Color array (RGBA - 32bit)
// RLAPI Color *LoadImagePalette(Image image, int maxPaletteSize, int *colorCount);                         // Load colors palette from image as a Color array (RGBA - 32bit)
// RLAPI void UnloadImageColors(Color *colors);                                                             // Unload color data loaded with LoadImageColors()
// RLAPI void UnloadImagePalette(Color *colors);                                                            // Unload colors palette loaded with LoadImagePalette()
// RLAPI Rectangle GetImageAlphaBorder(Image image, float threshold);                                       // Get image alpha border rectangle
// RLAPI Color GetImageColor(Image image, int x, int y);                                                    // Get image pixel color at (x, y) position

// // Image drawing functions
// // NOTE: Image software-rendering functions (CPU)
// RLAPI void ImageClearBackground(Image *dst, Color color);                                                // Clear image background with given color
// RLAPI void ImageDrawPixel(Image *dst, int posX, int posY, Color color);                                  // Draw pixel within an image
// RLAPI void ImageDrawPixelV(Image *dst, Vector2 position, Color color);                                   // Draw pixel within an image (Vector version)
// RLAPI void ImageDrawLine(Image *dst, int startPosX, int startPosY, int endPosX, int endPosY, Color color); // Draw line within an image
// RLAPI void ImageDrawLineV(Image *dst, Vector2 start, Vector2 end, Color color);                          // Draw line within an image (Vector version)
// RLAPI void ImageDrawCircle(Image *dst, int centerX, int centerY, int radius, Color color);               // Draw a filled circle within an image
// RLAPI void ImageDrawCircleV(Image *dst, Vector2 center, int radius, Color color);                        // Draw a filled circle within an image (Vector version)
// RLAPI void ImageDrawCircleLines(Image *dst, int centerX, int centerY, int radius, Color color);          // Draw circle outline within an image
// RLAPI void ImageDrawCircleLinesV(Image *dst, Vector2 center, int radius, Color color);                   // Draw circle outline within an image (Vector version)
// RLAPI void ImageDrawRectangle(Image *dst, int posX, int posY, int width, int height, Color color);       // Draw rectangle within an image
// RLAPI void ImageDrawRectangleV(Image *dst, Vector2 position, Vector2 size, Color color);                 // Draw rectangle within an image (Vector version)
// RLAPI void ImageDrawRectangleRec(Image *dst, Rectangle rec, Color color);                                // Draw rectangle within an image
// RLAPI void ImageDrawRectangleLines(Image *dst, Rectangle rec, int thick, Color color);                   // Draw rectangle lines within an image
// RLAPI void ImageDraw(Image *dst, Image src, Rectangle srcRec, Rectangle dstRec, Color tint);             // Draw a source image within a destination image (tint applied to source)
// RLAPI void ImageDrawText(Image *dst, const char *text, int posX, int posY, int fontSize, Color color);   // Draw text (using default font) within an image (destination)
// RLAPI void ImageDrawTextEx(Image *dst, Font font, const char *text, Vector2 position, float fontSize, float spacing, Color tint); // Draw text (custom sprite font) within an image (destination)

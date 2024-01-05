// TODO
// RLAPI Model LoadModel(const char *fileName);                                                // Load model from files (meshes and materials)
// RLAPI Model LoadModelFromMesh(Mesh mesh);                                                   // Load model from generated mesh (default material)
// RLAPI bool IsModelReady(Model model);                                                       // Check if a model is ready
// RLAPI void UnloadModel(Model model);                                                        // Unload model (including meshes) from memory (RAM and/or VRAM)
// RLAPI BoundingBox GetModelBoundingBox(Model model);                                         // Compute model bounding box limits (considers all meshes)
// RLAPI void DrawModel(Model model, Vector3 position, float scale, Color tint);               // Draw a model (with texture if set)
// RLAPI void DrawModelEx(Model model, Vector3 position, Vector3 rotationAxis, float rotationAngle, Vector3 scale, Color tint); // Draw a model with extended parameters
// RLAPI void DrawModelWires(Model model, Vector3 position, float scale, Color tint);          // Draw a model wires (with texture if set)
// RLAPI void DrawModelWiresEx(Model model, Vector3 position, Vector3 rotationAxis, float rotationAngle, Vector3 scale, Color tint); // Draw a model wires (with texture if set) with extended parameters
// RLAPI void DrawBoundingBox(BoundingBox box, Color color);                                   // Draw bounding box (wires)
// RLAPI void DrawBillboard(Camera camera, Texture2D texture, Vector3 position, float size, Color tint);   // Draw a billboard texture
// RLAPI void DrawBillboardRec(Camera camera, Texture2D texture, Rectangle source, Vector3 position, Vector2 size, Color tint); // Draw a billboard texture defined by source
// RLAPI void DrawBillboardPro(Camera camera, Texture2D texture, Rectangle source, Vector3 position, Vector3 up, Vector2 size, Vector2 origin, float rotation, Color tint); // Draw a billboard texture defined by source and rotation

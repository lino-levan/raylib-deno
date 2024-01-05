// TODO
// RLAPI void UploadMesh(Mesh *mesh, bool dynamic);                                            // Upload mesh vertex data in GPU and provide VAO/VBO ids
// RLAPI void UpdateMeshBuffer(Mesh mesh, int index, const void *data, int dataSize, int offset); // Update mesh vertex data in GPU for a specific buffer index
// RLAPI void UnloadMesh(Mesh mesh);                                                           // Unload mesh data from CPU and GPU
// RLAPI void DrawMesh(Mesh mesh, Material material, Matrix transform);                        // Draw a 3d mesh with material and transform
// RLAPI void DrawMeshInstanced(Mesh mesh, Material material, const Matrix *transforms, int instances); // Draw multiple mesh instances with material and different transforms
// RLAPI bool ExportMesh(Mesh mesh, const char *fileName);                                     // Export mesh data to file, returns true on success
// RLAPI BoundingBox GetMeshBoundingBox(Mesh mesh);                                            // Compute mesh bounding box limits
// RLAPI void GenMeshTangents(Mesh *mesh);                                                     // Compute mesh tangents
// RLAPI Mesh GenMeshPoly(int sides, float radius);                                            // Generate polygonal mesh
// RLAPI Mesh GenMeshPlane(float width, float length, int resX, int resZ);                     // Generate plane mesh (with subdivisions)
// RLAPI Mesh GenMeshCube(float width, float height, float length);                            // Generate cuboid mesh
// RLAPI Mesh GenMeshSphere(float radius, int rings, int slices);                              // Generate sphere mesh (standard sphere)
// RLAPI Mesh GenMeshHemiSphere(float radius, int rings, int slices);                          // Generate half-sphere mesh (no bottom cap)
// RLAPI Mesh GenMeshCylinder(float radius, float height, int slices);                         // Generate cylinder mesh
// RLAPI Mesh GenMeshCone(float radius, float height, int slices);                             // Generate cone/pyramid mesh
// RLAPI Mesh GenMeshTorus(float radius, float size, int radSeg, int sides);                   // Generate torus mesh
// RLAPI Mesh GenMeshKnot(float radius, float size, int radSeg, int sides);                    // Generate trefoil knot mesh
// RLAPI Mesh GenMeshHeightmap(Image heightmap, Vector3 size);                                 // Generate heightmap mesh from image data
// RLAPI Mesh GenMeshCubicmap(Image cubicmap, Vector3 cubeSize);                               // Generate cubes-based map mesh from image data

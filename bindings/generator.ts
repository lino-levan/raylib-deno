let result = "// This file is generated by generator.ts\n\n";
const source = Deno.readTextFileSync("./raylib.h").split("\n");

// Generate the version constants
result += `// --- Version constants ---\n`;
result += `export const RAYLIB_VERSION_MAJOR = ${
  source[83].split(" ").pop()
};\n`;
result += `export const RAYLIB_VERSION_MINOR = ${
  source[84].split(" ").pop()
};\n`;
result += `export const RAYLIB_VERSION_PATCH = ${
  source[85].split(" ").pop()
};\n`;
result += `export const RAYLIB_VERSION = ${source[86].split(" ").pop()};\n\n`;

// Generate the color constants
result += `// --- Color constants ---\n`;

for (let i = 163; i < 190; i++) {
  if (source[i].trim() === "") continue;
  const values = source[i].replaceAll(",", "").split(" ").filter((v) =>
    v !== ""
  );
  const name = values[1];
  const red = values[3];
  const green = values[4];
  const blue = values[5];
  const alpha = values[6];

  result +=
    `export const ${name} = new Uint8Array([${blue}, ${green}, ${red}, ${alpha}]);\n`;
}

result += "\n";

// TODO: Generate struct definitions
// TODO: Generate enum definitions

// Generate the function definitions
result += "// --- bindings ---\n";
result += 'import { dlopen } from "https://deno.land/x/plug@1.0.3/mod.ts";\n\n';
result +=
  'export const lib = await dlopen({\n\tname: "raylib",\n\turl: import.meta.resolve("../blobs")\n}, {\n';

function extract(core: string) {
  return {
    name: core.split(" ").pop()!.slice(core.split("*").length - 1),
    type: core.split(" ").slice(0, -1).join(" ") +
      (core.split("*").length > 1
        ? " " + new Array(core.split("*").length - 1).fill("*").join("")
        : ""),
  };
}

const raw_type_map: Record<string, unknown> = {
  "void": "void",
  "void *": "pointer",
  "bool": "u8",
  "char": "i8",
  "unsigned int": "u32",
  "int": "i32",
  "long": "i64",
  "int *": "pointer",
  "const int *": "pointer",
  "const char *": "buffer",
  "const char **": "buffer",
  "unsigned char *": "buffer",
  "const unsigned char *": "buffer",
  "const void *": "buffer",
  "char *": "buffer",
  "float *": "buffer",
  "float": "f32",
  "double": "f64",
  // Custom types
  "Color": { struct: ["u8", "u8", "u8", "u8"] },
  "Image": { struct: ["pointer", "i32", "i32", "i32", "i32"] },
  "Font": {
    struct: [
      "i32",
      "i32",
      "i32",
      "u32",
      "i32",
      "i32",
      "i32",
      "i32",
      "pointer",
      "pointer",
    ],
  },
  "Rectangle": { struct: ["f32", "f32", "f32", "f32"] },
  "BoundingBox": { struct: ["f32", "f32", "f32", "f32", "f32", "f32"] },
  "Matrix": {
    struct: [
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
    ],
  },
  "Vector2": { struct: ["f32", "f32"] },
  "Vector3": { struct: ["f32", "f32", "f32"] },
  "Vector4": { struct: ["f32", "f32", "f32", "f32"] },
  "Ray": { struct: ["f32", "f32", "f32", "f32", "f32", "f32"] },
  "RayCollision": {
    struct: ["u8", "f32", "f32", "f32", "f32", "f32", "f32", "f32"],
  },
  "Model": {
    struct: [
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "i32",
      "i32",
      "pointer",
      "pointer",
      "pointer",
      "i32",
      "pointer",
      "pointer",
    ],
  },
  "Mesh": {
    struct: [
      "i32",
      "i32",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "pointer",
      "u32",
      "pointer",
    ],
  },
  "Material": {
    struct: ["u32", "pointer", "pointer", "f32", "f32", "f32", "f32"],
  },
  "ModelAnimation": {
    struct: ["i32", "i32", "pointer", "pointer", "u64", "u64", "u64", "u64"],
  },
  "Texture2D": { struct: ["u32", "i32", "i32", "i32", "i32"] },
  "TextureCubemap": { struct: ["u32", "i32", "i32", "i32", "i32"] },
  "RenderTexture2D": {
    struct: [
      "u32",
      "u32",
      "i32",
      "i32",
      "i32",
      "i32",
      "u32",
      "i32",
      "i32",
      "i32",
      "i32",
    ],
  },
  "Camera": {
    struct: [
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "i32",
    ],
  },
  "Camera2D": { struct: ["f32", "f32", "f32", "f32", "f32", "f32"] },
  "Camera3D": {
    struct: [
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "i32",
    ],
  },
  "Shader": { struct: ["u32", "pointer"] },
  "Sound": { struct: ["pointer", "pointer", "u32", "u32", "u32", "u32"] },
  "Wave": { struct: ["u32", "u32", "u32", "u32", "pointer"] },
  "Music": {
    struct: [
      "pointer",
      "pointer",
      "u32",
      "u32",
      "u32",
      "u32",
      "u8",
      "i32",
      "pointer",
    ],
  },
  "AudioStream": { struct: ["pointer", "pointer", "u32", "u32", "u32"] },
  "FilePathList": { struct: ["u32", "u32", "pointer"] },
  "AutomationEvent": { struct: ["u32", "u32", "i32", "i32", "i32", "i32"] },
  "AutomationEventList": { struct: ["u32", "u32", "pointer"] },
  "NPatchInfo": {
    struct: ["f32", "f32", "f32", "f32", "i32", "i32", "i32", "i32", "i32"],
  },
  "GlyphInfo": {
    struct: ["i32", "i32", "i32", "i32", "pointer", "i32", "i32", "i32", "i32"],
  },
  "VrStereoConfig": {
    struct: [
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
    ],
  },
  "VrDeviceInfo": {
    struct: [
      "i32",
      "i32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
      "f32",
    ],
  },
  // Custom types pointers,
  "Color *": "pointer",
  "Image *": "pointer",
  "Vector2 *": "pointer",
  "Vector3 *": "pointer",
  "Wave *": "pointer",
  "ModelAnimation *": "pointer",
  "Mesh *": "pointer",
  "Model *": "pointer",
  "Material *": "pointer",
  "Camera *": "pointer",
  "AutomationEventList *": "pointer",
  "Texture2D *": "pointer",
  "GlyphInfo *": "pointer",
  "const GlyphInfo *": "pointer",
  "Rectangle **": "pointer",
  "const Matrix *": "pointer",
  // Function pointers
  "AudioCallback": "function",
  "TraceLogCallback": "function",
  "LoadFileDataCallback": "function",
  "SaveFileDataCallback": "function",
  "LoadFileTextCallback": "function",
  "SaveFileTextCallback": "function",
};

let functions = "// --- functions ---\n";

for (let i = 953; i < 1656; i++) {
  if (!source[i].startsWith("RLAPI")) continue;
  if (source[i].includes("...")) continue;
  const comment = source[i].split("//")[1].trim();
  const { name: functionName, type: returnType } = extract(
    source[i].split("(")[0].split(" ").slice(1).join(" "),
  );
  const parameters = source[i].split("(")[1].split(")")[0] === "void"
    ? []
    : source[i].split("(")[1].split(")")[0].split(",").map((v) =>
      extract(v.trim())
    );

  result += `\t// ${comment}\n`;
  result += `\t${functionName}: { parameters: [${
    parameters.map((param) => JSON.stringify(raw_type_map[param.type])).join(
      ", ",
    )
  }], result: ${JSON.stringify(raw_type_map[returnType])} },\n`;
}

result += "});\n\n";

// Write the result to the bindings file
Deno.writeTextFileSync("./bindings.ts", result);

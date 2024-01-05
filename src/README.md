# Raylib Wrapper API

This is the core of the raylib wrapper.

## Philosophy

The goal of this wrapper is to provide a simple, easy to use, and safe API for
raylib. It is not intended to be a 1:1 mapping of the raylib API. Instead, it is
intended to be a more idiomatic and ergonomic API for raylib.

There are several APIs which exist in Raylib that are not exposed in this
wrapper. This is intentional. They are either not idiomatic or should really
just be done in Javascript instead of through FFI. They are the following:

### Requires custom build

- `SwapScreenBuffer`
- `PollInputEvents`

## Not clear how to implement

- `TraceLog`

## Not idiomatic

- `WaitTime`
- `SetRandomSeed`
- `GetRandomValue`
- `LoadRandomSequence`
- `UnloadRandomSequence`
- `OpenURL`
- `SetLoadFileDataCallback`
- `SetSaveFileDataCallback`
- `SetLoadFileTextCallback`
- `SetSaveFileTextCallback`
- `LoadFileData`
- `UnloadFileData`
- `SaveFileData`
- `ExportDataAsCode`
- `LoadFileText`
- `UnloadFileText`
- `SaveFileText`
- `FileExists`
- `DirectoryExists`
- `IsFileExtension`
- `GetFileLength`
- `GetFileExtension`
- `GetFileName`
- `GetFileNameWithoutExt`
- `GetDirectoryPath`
- `GetPrevDirectoryPath`
- `GetWorkingDirectory`
- `GetApplicationDirectory`
- `ChangeDirectory`
- `IsPathFile`
- `LoadDirectoryFiles`
- `LoadDirectoryFilesEx`
- `UnloadDirectoryFiles`
- `CompressData`
- `DecompressData`
- `EncodeDataBase64`
- `DecodeDataBase64`
- `LoadUTF8`
- `UnloadUTF8`
- `LoadCodepoints`
- `UnloadCodepoints`
- `GetCodepointsCount`
- `GetCodepoint`
- `GetCodepointNext`
- `GetCodepointPrevious`
- `CodepointToUTF8`
- `SetTraceLogLevel` (Useless without `TraceLog`)
- `MemAlloc`
- `MemRealloc`
- `MemFree`
- `SetTraceLogCallback` (Useless without `TraceLog`)
- `TextCopy`
- `TextIsEqual`
- `TextLength`
- `TextFormat`
- `TextSubtext`
- `TextReplace`
- `TextInsert`
- `TextJoin`
- `TextSplit`
- `TextAppend`
- `TextFindIndex`
- `TextToUpper`
- `TextToLower`
- `TextToPascal`
- `TextToInteger`

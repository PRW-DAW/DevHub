## Introduction

This file explains the versioning system used in this project, based on Semantic Versioning. It outlines how version numbers are structured and when to increment major, minor, or patch versions based on the nature of changes made.

## Version Number Breakdown

- **MAJOR**: `1.x.x` Incremented when you make incompatible API changes. This means that the new version may not work with previous versions without modifications. For example, if you change the way a function works or remove a feature, you would increment the major version.
- **MINOR**: `x.1.x` Incremented when you add functionality in a backward-compatible manner. This means that new features are added, but they do not break existing functionality. For example, adding a new function or an optional parameter to an existing function would increment the minor version.
- **PATCH**: `x.x.1` Incremented when you make backward-compatible bug fixes. This means that you fix issues without adding new features or breaking existing functionality. For example, fixing a bug in a function would increment the patch version.

## Example Scenarios

- **Initial Release**: `1.0.0`
- **Bug Fix**: `1.0.1`
- **New Feature**: `1.1.0`
- **Breaking Change**: `2.0.0`

## Conclusion

By following Semantic Versioning, we can communicate the nature of changes in our software to users and developers, making it easier to manage dependencies and updates.
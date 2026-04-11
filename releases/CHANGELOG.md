# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- ...

### Changed

- ...

### Deprecated

- ...

### Removed

- ...

### Fixed

- ...

### Security

- ...

## [0.8.0] - 2026/04/11

### Added

- `GET /api/me/projects` endpoint to fetch only the authenticated user's projects.
- `myProjects` method in `ProjectController`.
- `Profile.tsx` now displays real user data (name, username, bio) from `localStorage`.
- `Profile.tsx` now fetches and displays the user's real projects from the API.
- Publishing a project from `Profile.tsx` now sends a POST request to the API.
- Search bar in Profile filters over real projects.
- Loading and empty states for the projects section in Profile.

### Changed

- `Profile.tsx` migrated from static mock data to real API data.

## [0.7.0] - 2026/04/10

### Added

- `projects` table migration with `title`, `description`, `tags`, `project_link`, `github_link`, `cover_image` and `status` fields.
- `Project` Eloquent model with `tags` cast to array and `user` relationship.
- `ProjectController` with full CRUD API (`index`, `store`, `show`, `update`, `destroy`).
- `ProjectDetail.tsx` now fetches real project data from the API by id.
- Feed now fetches and displays real projects instead of posts.
- Publishing a project from `AddProjectModal` now sends all fields to the API.
- Search bar in Feed filters by title, description, username and tags.

### Changed

- `Feed.tsx` migrated from posts to projects API.
- `routes/api.php` updated with `apiResource` route for projects.

## [0.6.0] - 2026/04/10

### Added

- `PrivateRoute` component to protect authenticated routes, redirecting to login if no token is found in `localStorage`.
- Feed now fetches real posts from the API using `useEffect`.
- Publishing a project from the Feed now sends a POST request to the API.
- Search bar filters over real API posts.
- Loading, error and empty states in the Feed.

### Changed

- `routes.tsx` updated to wrap all routes except `/` with `PrivateRoute`.
- `Feed.tsx` migrated from static mock data to real API data.

## [0.5.0] - 2026/04/08

### Added

- `PrivateRoute` component to protect authenticated routes, redirecting to login if no token is found in `localStorage`.

### Changed

- `routes.tsx` updated to wrap all routes except `/` with `PrivateRoute`.

## [0.4.0] - 2026/04/08

### Added

- API + Database migrations (Register, Login, Create & Read Post). [[Link](https://github.com/PRW-DAW/DevHub/blob/main/docs/date/20260408.md)]
- Frontend states `name`, `username`, `error`, `loading`.
- `handleSubmit` now calls the actual API and saves the token to `localStorage`.
- In register mode, the `name` and `username` fields appear.
- Shows Laravel validation errors in red.
- The button displays "Loading..." while it waits.

## [0.3.0] - 2026/04/06

### Added

- Imported Figma project designs into the frontend for initial UI implementation.

### Fixed

- Resolved TypeScript error "Cannot find type definition file for 'vite/client'" by removing the `"types": ["vite/client"]` entry from `tsconfig.app.json`.

## [0.2.0] - 2026/03/31

### Changed

- Frontend React + Vite 8.0.1 TypeScript.

## [0.1.0] - 2026/03/28

### Added

- This CHANGELOG.md to track all notable changes to this project going forward.
- A configuration file for GitHub Pages documents. [`docs/_config.yaml`](https://github.com/PRW-DAW/DevHub/blob/main/docs/_config.yaml)
- GitHub releases workflow. [`.github/workflows/releases.yaml`](https://github.com/PRW-DAW/DevHub/blob/main/.github/workflows/releases.yaml)
- `.dockerignore` file on both the [backend](https://github.com/PRW-DAW/DevHub/blob/main/backend/.dockerignore) and the [frontend](https://github.com/PRW-DAW/DevHub/blob/main/frontend/.dockerignore).

### Changed

- The files `CODE_OF_CONDUCT.md` and `SECURITY.md` have been moved from the `.github` directory to `docs`.

## [0.0.1] - 2026/03/19

### Added

- Initial files.

[unreleased]: https://github.com/PRW-DAW/DevHub/compare/0.8.0...HEAD
[0.8.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.8.0
[0.7.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.7.0
[0.6.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.6.0
[0.5.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.5.0
[0.4.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.4.0
[0.3.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.3.0
[0.2.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.2.0
[0.1.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.1.0
[0.0.1]: https://github.com/PRW-DAW/DevHub/releases/tag/0.0.1

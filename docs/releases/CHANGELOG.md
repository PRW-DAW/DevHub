# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Delete button on project cards in `Feed.tsx`, visible only to the project owner, that calls `DELETE /api/projects/{id}` and removes the card from the UI without reloading.
- Delete button on project cards in `Profile.tsx` that calls `DELETE /api/projects/{id}` and removes the card from the list without reloading.
- `comments` table migration with `user_id`, `project_id` and `body` fields.
- `Comment` Eloquent model with `user` and `project` relationships.
- `CommentController` with `index`, `store` and `destroy` methods.
- `GET /api/projects/{project}/comments` endpoint to fetch all comments for a project.
- `POST /api/projects/{project}/comments` endpoint to create a comment.
- `DELETE /api/comments/{comment}` endpoint to delete a comment (owner only).
- `ProjectDetail.tsx` now loads and displays real comments from the API.
- New comments can be submitted without reloading the page.
- Delete button on comments visible only to the comment author.
- Relative timestamps on comments using a `timeAgo` helper function.
- `comments_count` field added to all project endpoints (`index`, `show`, `myProjects`, `showProjects`).
- Comment count now displays in real time on project cards in `Feed.tsx`, `Profile.tsx` and `UserProfile.tsx`.

### Changed

- `ProjectDetail.tsx` migrated from static mock comments to real API data.
- `Feed.tsx`, `Profile.tsx` and `UserProfile.tsx` updated to show real comment counts.

### Deprecated

- ...

### Removed

- Static comments section removed from `Profile.tsx` as comments belong to projects, not user profiles.
- Unused `Comment` interface, `comments` state, `newComment` state, `handleAddComment` function and related imports removed from `Profile.tsx`.
- Static mock comments removed from `ProjectDetail.tsx`.

### Fixed

- Tech stack tags in `AddProjectModal.tsx` are now captured on form submit even if the user did not press Enter, by splitting the remaining input by commas.

### Security

- ...

## [0.14.1] - 2026/05/05

### Changed

- `AvatarDropdown.tsx` now displays the real user's name initial and username from `localStorage`.

### Fixed

- Logout button in `AvatarDropdown.tsx` now calls `POST /api/logout` to invalidate the Sanctum token on the server before clearing `localStorage` and redirecting to `/`. Local logout still proceeds if the request fails.

## [0.14.0] - 2026/05/05

### Added

- New logo added across the application.
- Animated video background on the login page.
- Password visibility toggle on the login page.
- New pages accessible from the profile dropdown (`/settings`, `/customization`, etc.).

### Changed

- Login page bullet points updated for improved visual style.
- Sidebar logo is now functional and navigates to the feed.

## [0.13.0] - 2026/04/29

### Added

- `/terms` page with Terms of Use.
- `/help` page with FAQ accordion.
- `/settings` page with account settings.
- `/customization` page with personalization options.
- Animated background video on the login page.
- Password show/hide toggle on the login page.
- SVG logo (`de-lado.svg`) on the login page and sidebar.
- Sidebar logo is now clickable and navigates to the feed.
- Navigation routes added to `AvatarDropdown`.

### Changed

- Beta badges on the login page now use `β`, `#` and `✓` instead of emojis.

### Removed

- Search bar removed from `Companies.tsx` (redundant, not connected to state).
- Search bar removed from `Profile.tsx` (redundant, not connected to state).

## [0.12.0] - 2026/04/22

### Changed

- Search bar and category filter in `Companies.tsx` now work together to filter job offers by title, company and tags.

## [0.11.0] - 2026/04/17

### Added

- `UserController` with `index`, `follow`, `me`, `show` and `showProjects` methods.
- `GET /api/users/{user}` endpoint to fetch a public user profile with follow state.
- `GET /api/users/{user}/projects` endpoint to fetch a user's projects.
- `UserProfile.tsx` public profile page at `/user/:id` showing user data, stats, projects and follow button.

### Changed

- `routes.tsx` updated with `/user/:id` route protected by `PrivateRoute`.

## [0.10.0] - 2026/04/17

### Added

- `follows` table migration with `follower_id`, `following_id` and unique constraint.
- `Follow` Eloquent model with `follower_id` and `following_id` fillable fields.
- `followers` and `following` relationships in `User` model.
- `UserController` with `index`, `follow` and `me` methods.
- `GET /api/users` endpoint to list all users except the authenticated one, with `followers_count`, `projects_count` and `is_following` fields.
- `POST /api/follow/{user}` endpoint to toggle follow/unfollow.
- `GET /api/me` endpoint to fetch the authenticated user with follower, following and project counts.
- `Connect.tsx` now fetches real users from the API with correct follow state on load.
- Follow/unfollow button in `Connect.tsx` now calls the API and updates state in real time.
- Search bar in `Connect.tsx` filters over real users.
- `Profile.tsx` now shows real followers and following counts fetched from `/api/me`.

### Changed

- `Connect.tsx` migrated from static mock data to real API data.
- `Profile.tsx` updated to fetch and display real follower and following counts.

## [0.9.0] - 2026/04/14

### Changed

- Docker flow improvement (`docker-compose.yaml` & `Dockerfile`).

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

[unreleased]: https://github.com/PRW-DAW/DevHub/compare/0.14.1...HEAD
[0.14.1]: https://github.com/PRW-DAW/DevHub/releases/tag/0.14.1
[0.14.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.14.0
[0.13.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.13.0
[0.12.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.12.0
[0.11.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.11.0
[0.10.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.10.0
[0.9.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.9.0
[0.8.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.8.0
[0.7.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.7.0
[0.6.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.6.0
[0.5.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.5.0
[0.4.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.4.0
[0.3.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.3.0
[0.2.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.2.0
[0.1.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.1.0
[0.0.1]: https://github.com/PRW-DAW/DevHub/releases/tag/0.0.1

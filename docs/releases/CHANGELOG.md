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

## [0.15.0] - 2026/05/09

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
- `project_views` table migration with `user_id`, `project_id` and unique constraint to prevent duplicate views.
- `ProjectView` Eloquent model.
- `views` relationship added to `Project` model.
- `GET /api/projects/{id}` now registers a unique view per authenticated user using `firstOrCreate`.
- `views_count` field added to all project endpoints (`index`, `show`, `myProjects`, `showProjects`).
- View count now displays in real time on project cards in `Feed.tsx`, `Profile.tsx` and `UserProfile.tsx`.
- `GET /api/users/top` endpoint returning up to 5 users ordered by follower count descending.
- `topByFollowers` method in `UserController`.
- `FeaturedDeveloper` interface in `Feed.tsx`.
- "Developers destacados" sidebar in `Feed.tsx` now fetches and displays real users from the API ordered by followers.
- "Ver" button on each developer card navigates to their public profile at `/user/{id}`.
- Empty state shown when no users are available.
- `GET /api/projects/top-technologies` endpoint returning up to 5 tags ordered by usage count descending, with `name`, `count` and `percentage` fields.
- `topTechnologies` method in `ProjectController`.
- `TopTechnology` interface in `Feed.tsx`.
- "Top tecnologías" sidebar in `Feed.tsx` now fetches and displays real technology usage from the API.
- Percentage bar reflects each technology's share of total tag usage across the platform.
- Empty state shown when no technologies are available.
- `PUT /api/me` endpoint to update the authenticated user's `bio`, `name` and `username`.
- `update` method in `UserController`.
- "Editar Perfil" button in `Profile.tsx` now opens a modal with a textarea to edit the bio.
- Bio changes are saved to the database and reflected immediately in the UI and `localStorage`.
- Character counter (max 500) shown in the edit bio textarea.
- Character counters on title (100), description (1000) and comment (500) inputs, turning red near the limit.
- Tag input disabled and counter shown when 10 tag limit is reached in `AddProjectModal.tsx`.
- `GET /api/projects?search=query` backend search across all projects by title, description, username and tags using `ilike`.
- `GET /api/users?search=query` backend search across all users by name, username and bio using `ilike`.
- "Ver más proyectos" button in `Feed.tsx` loads 10 more projects from the API without reloading the page.
- "Ver más usuarios" button in `Connect.tsx` loads 12 more users from the API without reloading the page.
- "Ver más proyectos" button in `Profile.tsx` loads 10 more of the user's own projects.
- "Ver más proyectos" button in `UserProfile.tsx` loads 10 more projects from a public profile.
- Debounced search (400ms) in `Feed.tsx` calls the backend and shows results across all projects.
- Debounced search (400ms) in `Connect.tsx` calls the backend and shows results across all users.
- Search bar in `Feed.tsx` resets to paginated feed when cleared.
- Search bar in `Connect.tsx` resets to paginated user list when cleared.

### Changed

- `ProjectDetail.tsx` migrated from static mock comments to real API data.
- `Feed.tsx`, `Profile.tsx` and `UserProfile.tsx` updated to show real comment counts.
- `ProjectController@show` updated to accept `Request` and register a unique project view on each visit.
- `Feed.tsx`, `Profile.tsx` and `UserProfile.tsx` updated to show real view counts.
- `Feed.tsx` sidebar migrated from static hardcoded developers to real API data.
- Both project and top developers fetches are now parallelized with `Promise.all` on mount.
- `Feed.tsx` sidebar migrated from static hardcoded technologies to real API data.
- `Promise.all` in `Feed.tsx` now fetches projects, top developers and top technologies in parallel.
- `authUser` in `Profile.tsx` migrated from a constant to a state so it can be updated after saving.
- Backend validation in `ProjectController` updated: title `max:100`, description `max:1000`, tags `max:10`, each tag `max:30`, links `max:255`.
- Backend validation in `CommentController` updated: body `max:500`.
- `maxLength` attributes added to all text inputs in `AddProjectModal.tsx` and `ProjectDetail.tsx`.
- Tag length capped at 30 characters on submit in `AddProjectModal.tsx`.
- `ProjectController@index` updated to support `search` query parameter with pagination.
- `UserController@index` updated to support `search` query parameter and removed exclusion of the authenticated user (all users now appear in Connect).
- `UserController@index` now paginates by 12 users per page.
- Avatar gradients unified to 6 gradients across all pages and always assigned by `user.id % 6` for consistency.
- `Feed.tsx` now loads projects in pages of 10 with a "Ver más" button instead of loading all at once.
- `Connect.tsx` now loads users in pages of 12 with a "Ver más" button instead of loading all at once.
- `Profile.tsx` and `UserProfile.tsx` now load projects in pages of 10 with a "Ver más" button.
- "Developers destacados" sidebar in `Feed.tsx` now assigns gradients by `user.id` instead of list index.
- Profile banner in `Profile.tsx` now uses the user's gradient instead of a fixed purple gradient.
- Profile avatar in `Profile.tsx` now uses the user's gradient instead of a fixed purple color.

### Removed

- Static comments section removed from `Profile.tsx` as comments belong to projects, not user profiles.
- Unused `Comment` interface, `comments` state, `newComment` state, `handleAddComment` function and related imports removed from `Profile.tsx`.
- Static mock comments removed from `ProjectDetail.tsx`.
- Static `featuredDevelopers` array removed from `Feed.tsx`.
- Static `topTechnologies` array removed from `Feed.tsx`.

### Fixed

- Tech stack tags in `AddProjectModal.tsx` are now captured on form submit even if the user did not press Enter, by splitting the remaining input by commas.
- Long unbreakable text no longer overflows its container in `Feed.tsx`, `Profile.tsx`, `ProjectDetail.tsx` and `UserProfile.tsx` — fixed with `break-words` on text elements and `min-w-0` on the flex container in `Feed.tsx`.

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

[unreleased]: https://github.com/PRW-DAW/DevHub/compare/0.15.0...HEAD
[0.15.0]: https://github.com/PRW-DAW/DevHub/releases/tag/0.15.0
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

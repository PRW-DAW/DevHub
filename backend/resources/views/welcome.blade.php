<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>DevHub | API</title>
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

            :root {
                --bg: #FDFDFC;
                --bg-card: #ffffff;
                --bg-sidebar: #f5f5f3;
                --text: #1b1b18;
                --text-muted: #706f6c;
                --border: #e3e3e0;
                --accent: #f53003;
                --tag-get: #16a34a;
                --tag-get-bg: #f0fdf4;
                --tag-post: #2563eb;
                --tag-post-bg: #eff6ff;
                --tag-put: #d97706;
                --tag-put-bg: #fffbeb;
                --tag-delete: #dc2626;
                --tag-delete-bg: #fef2f2;
                --code-bg: #f5f5f3;
                --shadow: 0px 0px 1px 0px rgba(0,0,0,0.03), 0px 1px 2px 0px rgba(0,0,0,0.06);
                --inset: inset 0px 0px 0px 1px rgba(26,26,0,0.16);
            }

            @media (prefers-color-scheme: dark) {
                :root {
                    --bg: #0a0a0a;
                    --bg-card: #161615;
                    --bg-sidebar: #111110;
                    --text: #EDEDEC;
                    --text-muted: #A1A09A;
                    --border: #3E3E3A;
                    --accent: #FF4433;
                    --tag-get: #4ade80;
                    --tag-get-bg: #052e16;
                    --tag-post: #60a5fa;
                    --tag-post-bg: #172554;
                    --tag-put: #fbbf24;
                    --tag-put-bg: #1c1400;
                    --tag-delete: #f87171;
                    --tag-delete-bg: #1c0000;
                    --code-bg: #1e1e1c;
                    --inset: inset 0px 0px 0px 1px #fffaed2d;
                }
            }

            html, body {
                font-family: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
                background: var(--bg);
                color: var(--text);
                min-height: 100vh;
                font-size: 14px;
                line-height: 1.6;
            }

            /* Layout */
            .layout { display: flex; min-height: 100vh; }

            /* Sidebar */
            .sidebar {
                width: 260px;
                flex-shrink: 0;
                background: var(--bg-sidebar);
                border-right: 1px solid var(--border);
                padding: 28px 0;
                position: sticky;
                top: 0;
                height: 100vh;
                overflow-y: auto;
            }

            .sidebar-logo {
                padding: 0 20px 20px;
                border-bottom: 1px solid var(--border);
                margin-bottom: 16px;
            }

            .sidebar-logo h1 {
                font-size: 16px;
                font-weight: 600;
                color: var(--text);
                letter-spacing: -0.01em;
            }

            .sidebar-logo p {
                font-size: 11px;
                color: var(--text-muted);
                margin-top: 2px;
            }

            .sidebar-section {
                padding: 8px 20px 4px;
                font-size: 10px;
                font-weight: 600;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: var(--text-muted);
            }

            .sidebar-link {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 6px 20px;
                font-size: 13px;
                color: var(--text-muted);
                text-decoration: none;
                transition: color 0.15s;
                cursor: pointer;
            }

            .sidebar-link:hover { color: var(--text); }
            .sidebar-link.active { color: var(--text); font-weight: 500; }

            .method-pill {
                font-size: 9px;
                font-weight: 600;
                padding: 1px 5px;
                border-radius: 3px;
                letter-spacing: 0.04em;
                flex-shrink: 0;
            }

            .get  { background: var(--tag-get-bg);    color: var(--tag-get); }
            .post { background: var(--tag-post-bg);   color: var(--tag-post); }
            .put  { background: var(--tag-put-bg);    color: var(--tag-put); }
            .del  { background: var(--tag-delete-bg); color: var(--tag-delete); }

            /* Main content */
            .main {
                flex: 1;
                min-width: 0;
                padding: 48px 56px;
                max-width: 900px;
            }

            .page-header { margin-bottom: 48px; }

            .page-header h2 {
                font-size: 28px;
                font-weight: 600;
                letter-spacing: -0.02em;
                color: var(--text);
            }

            .page-header p {
                margin-top: 8px;
                color: var(--text-muted);
                font-size: 14px;
            }

            .base-url {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                margin-top: 16px;
                background: var(--code-bg);
                border: 1px solid var(--border);
                border-radius: 6px;
                padding: 8px 14px;
                font-family: ui-monospace, 'Courier New', monospace;
                font-size: 13px;
                color: var(--text);
            }

            .base-url span { color: var(--text-muted); font-size: 11px; }

            /* Section */
            .section { margin-bottom: 56px; }

            .section-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--text);
                margin-bottom: 20px;
                padding-bottom: 12px;
                border-bottom: 1px solid var(--border);
            }

            /* Endpoint card */
            .endpoint {
                border: 1px solid var(--border);
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 16px;
                box-shadow: var(--shadow);
            }

            .endpoint-header {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 18px;
                background: var(--bg-card);
                cursor: pointer;
                user-select: none;
            }

            .endpoint-header:hover { background: var(--bg-sidebar); }

            .method-tag {
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 4px;
                letter-spacing: 0.04em;
                flex-shrink: 0;
                font-family: ui-monospace, monospace;
            }

            .endpoint-path {
                font-family: ui-monospace, 'Courier New', monospace;
                font-size: 13px;
                color: var(--text);
                flex: 1;
            }

            .endpoint-desc {
                font-size: 12px;
                color: var(--text-muted);
            }

            .endpoint-auth {
                font-size: 10px;
                background: var(--code-bg);
                border: 1px solid var(--border);
                color: var(--text-muted);
                padding: 2px 7px;
                border-radius: 4px;
                flex-shrink: 0;
            }

            .chevron {
                width: 14px;
                height: 14px;
                color: var(--text-muted);
                transition: transform 0.2s;
                flex-shrink: 0;
            }

            .endpoint.open .chevron { transform: rotate(180deg); }

            .endpoint-body {
                display: none;
                border-top: 1px solid var(--border);
            }

            .endpoint.open .endpoint-body { display: block; }

            .endpoint-section {
                padding: 16px 18px;
                border-bottom: 1px solid var(--border);
            }

            .endpoint-section:last-child { border-bottom: none; }

            .endpoint-section-title {
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                color: var(--text-muted);
                margin-bottom: 10px;
            }

            .param-row {
                display: flex;
                align-items: baseline;
                gap: 10px;
                padding: 5px 0;
                border-bottom: 1px solid var(--border);
                font-size: 13px;
            }

            .param-row:last-child { border-bottom: none; }

            .param-name {
                font-family: ui-monospace, monospace;
                font-size: 12px;
                color: var(--text);
                font-weight: 500;
                min-width: 140px;
            }

            .param-type {
                font-size: 11px;
                color: var(--accent);
                min-width: 70px;
            }

            .param-required {
                font-size: 10px;
                color: var(--tag-delete);
                min-width: 60px;
            }

            .param-optional {
                font-size: 10px;
                color: var(--text-muted);
                min-width: 60px;
            }

            .param-desc { color: var(--text-muted); font-size: 12px; }

            pre {
                background: var(--code-bg);
                border: 1px solid var(--border);
                border-radius: 6px;
                padding: 14px 16px;
                font-family: ui-monospace, 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.7;
                overflow-x: auto;
                color: var(--text);
                white-space: pre;
            }

            .tabs {
                display: flex;
                gap: 2px;
                margin-bottom: 10px;
            }

            .tab {
                font-size: 11px;
                padding: 4px 10px;
                border-radius: 4px;
                cursor: pointer;
                color: var(--text-muted);
                border: 1px solid transparent;
            }

            .tab.active {
                background: var(--bg-card);
                border-color: var(--border);
                color: var(--text);
                font-weight: 500;
            }

            .tab-content { display: none; }
            .tab-content.active { display: block; }
        </style>
    </head>
    <body>
        <div class="layout">

            <!-- Sidebar -->
            <nav class="sidebar">
                <div class="sidebar-logo">
                    <h1>DevHub API</h1>
                    <p>v1.0 · Laravel Sanctum</p>
                </div>

                <div class="sidebar-section">Auth</div>
                <a class="sidebar-link" onclick="goTo('auth')"><span class="method-pill post">POST</span> /register</a>
                <a class="sidebar-link" onclick="goTo('auth')"><span class="method-pill post">POST</span> /login</a>
                <a class="sidebar-link" onclick="goTo('auth')"><span class="method-pill post">POST</span> /logout</a>

                <div class="sidebar-section">Users</div>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill get">GET</span> /me</a>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill put">PUT</span> /me</a>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill get">GET</span> /users</a>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill get">GET</span> /users/top</a>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill get">GET</span> /users/{id}</a>
                <a class="sidebar-link" onclick="goTo('users')"><span class="method-pill post">POST</span> /follow/{id}</a>

                <div class="sidebar-section">Projects</div>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill get">GET</span> /projects</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill post">POST</span> /projects</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill get">GET</span> /projects/{id}</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill put">PUT</span> /projects/{id}</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill del">DEL</span> /projects/{id}</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill get">GET</span> /me/projects</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill get">GET</span> /users/{id}/projects</a>
                <a class="sidebar-link" onclick="goTo('projects')"><span class="method-pill get">GET</span> /projects/top-technologies</a>

                <div class="sidebar-section">Comments</div>
                <a class="sidebar-link" onclick="goTo('comments')"><span class="method-pill get">GET</span> /projects/{id}/comments</a>
                <a class="sidebar-link" onclick="goTo('comments')"><span class="method-pill post">POST</span> /projects/{id}/comments</a>
                <a class="sidebar-link" onclick="goTo('comments')"><span class="method-pill del">DEL</span> /comments/{id}</a>

                <div class="sidebar-section">Ratings</div>
                <a class="sidebar-link" onclick="goTo('ratings')"><span class="method-pill post">POST</span> /projects/{id}/rate</a>

                <div class="sidebar-section">Posts</div>
                <a class="sidebar-link" onclick="goTo('posts')"><span class="method-pill get">GET</span> /posts</a>
                <a class="sidebar-link" onclick="goTo('posts')"><span class="method-pill post">POST</span> /posts</a>
            </nav>

            <!-- Main -->
            <main class="main">

                <div class="page-header">
                    <h2>DevHub API Reference</h2>
                    <p>REST API authentication with Laravel Sanctum. All protected routes require a Bearer token.</p>
                    <div class="base-url">
                        <span>Base URL</span>
                        http://api.devhub.com/api
                    </div>
                </div>

                <!-- AUTH -->
                <div class="section" id="auth">
                    <div class="section-title">Authentication</div>

                    <!-- Register -->
                    <div class="endpoint" id="ep-register">
                        <div class="endpoint-header" onclick="toggle('ep-register')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/register</span>
                            <span class="endpoint-desc">Create a new user account</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">name</span><span class="param-type">string</span><span class="param-required">required</span></div>
                                <div class="param-row"><span class="param-name">username</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">unique</span></div>
                                <div class="param-row"><span class="param-name">email</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">unique</span></div>
                                <div class="param-row"><span class="param-name">password</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">min 8 chars</span></div>
                                <div class="param-row"><span class="param-name">password_confirmation</span><span class="param-type">string</span><span class="param-required">required</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-register')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-register')">Response 201</div>
                                </div>
                                <div class="tab-content active" id="req-register"><pre>POST /api/register
Content-Type: application/json

{
  "name": "Alba",
  "username": "alba",
  "email": "alba@test.com",
  "password": "password123",
  "password_confirmation": "password123"
}</pre></div>
                                <div class="tab-content" id="res-register"><pre>{
  "token": "1|hJAWha4FEVlL6zF5LYcUKjwvS33DP7lL...",
  "user": {
    "id": 1,
    "name": "Alba",
    "username": "alba",
    "email": "alba@test.com",
    "bio": null,
    "avatar": null
  }
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- Login -->
                    <div class="endpoint" id="ep-login">
                        <div class="endpoint-header" onclick="toggle('ep-login')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/login</span>
                            <span class="endpoint-desc">Authenticate and get a token</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">email</span><span class="param-type">string</span><span class="param-required">required</span></div>
                                <div class="param-row"><span class="param-name">password</span><span class="param-type">string</span><span class="param-required">required</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-login')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-login')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-login"><pre>POST /api/login
Content-Type: application/json

{
  "email": "alba@test.com",
  "password": "password123"
}</pre></div>
                                <div class="tab-content" id="res-login"><pre>{
  "token": "1|hJAWha4FEVlL6zF5LYcUKjwvS33DP7lL...",
  "user": {
    "id": 1,
    "name": "Alba",
    "username": "alba",
    "email": "alba@test.com",
    "bio": null,
    "avatar": null
  }
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- Logout -->
                    <div class="endpoint" id="ep-logout">
                        <div class="endpoint-header" onclick="toggle('ep-logout')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/logout</span>
                            <span class="endpoint-desc">Invalidate the current token</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-logout')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-logout')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-logout"><pre>POST /api/logout
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-logout"><pre>{
  "message": "Logged out"
}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- USERS -->
                <div class="section" id="users">
                    <div class="section-title">Users</div>

                    <!-- GET /me -->
                    <div class="endpoint" id="ep-me">
                        <div class="endpoint-header" onclick="toggle('ep-me')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/me</span>
                            <span class="endpoint-desc">Get the authenticated user</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-me')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-me')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-me"><pre>GET /api/me
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-me"><pre>{
  "id": 1,
  "name": "Alba",
  "username": "alba",
  "email": "alba@test.com",
  "bio": "Full-Stack developer",
  "avatar": null,
  "followers_count": 2,
  "following_count": 3,
  "projects_count": 5
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- PUT /me -->
                    <div class="endpoint" id="ep-me-update">
                        <div class="endpoint-header" onclick="toggle('ep-me-update')">
                            <span class="method-tag put">PUT</span>
                            <span class="endpoint-path">/me</span>
                            <span class="endpoint-desc">Update profile bio, name or username</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">name</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">max 255</span></div>
                                <div class="param-row"><span class="param-name">username</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">unique, max 255</span></div>
                                <div class="param-row"><span class="param-name">bio</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">max 500</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-me-update')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-me-update')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-me-update"><pre>PUT /api/me
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "bio": "Full-Stack developer passionate about React and Laravel."
}</pre></div>
                                <div class="tab-content" id="res-me-update"><pre>{
  "id": 1,
  "name": "Alba",
  "username": "alba",
  "email": "alba@test.com",
  "bio": "Full-Stack developer passionate about React and Laravel.",
  "avatar": null
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /users -->
                    <div class="endpoint" id="ep-users">
                        <div class="endpoint-header" onclick="toggle('ep-users')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/users</span>
                            <span class="endpoint-desc">List all users, paginated (12/page)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Query parameters</div>
                                <div class="param-row"><span class="param-name">search</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">Filter by name, username or bio</span></div>
                                <div class="param-row"><span class="param-name">page</span><span class="param-type">integer</span><span class="param-optional">optional</span><span class="param-desc">Page number (default 1)</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-users')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-users')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-users"><pre>GET /api/users?search=fran&page=1
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-users"><pre>{
  "current_page": 1,
  "data": [
    {
      "id": 2,
      "name": "Francisco José",
      "username": "fran",
      "bio": "Full-Stack developer...",
      "avatar": null,
      "followers_count": 2,
      "projects_count": 14,
      "is_following": false
    }
  ],
  "next_page_url": null,
  "total": 1
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /users/top -->
                    <div class="endpoint" id="ep-users-top">
                        <div class="endpoint-header" onclick="toggle('ep-users-top')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/users/top</span>
                            <span class="endpoint-desc">Top 5 users by follower count</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-users-top')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-users-top')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-users-top"><pre>GET /api/users/top
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-users-top"><pre>[
  { "id": 1, "name": "Alba", "username": "alba", "followers_count": 4 },
  { "id": 2, "name": "Francisco José", "username": "fran", "followers_count": 2 }
]</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /users/{user} -->
                    <div class="endpoint" id="ep-user-show">
                        <div class="endpoint-header" onclick="toggle('ep-user-show')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/users/{id}</span>
                            <span class="endpoint-desc">Get a user's public profile</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-user-show')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-user-show')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-user-show"><pre>GET /api/users/2
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-user-show"><pre>{
  "id": 2,
  "name": "Francisco José",
  "username": "fran",
  "bio": "Full-Stack developer...",
  "avatar": null,
  "followers_count": 2,
  "following_count": 1,
  "projects_count": 14,
  "is_following": false
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- POST /follow/{user} -->
                    <div class="endpoint" id="ep-follow">
                        <div class="endpoint-header" onclick="toggle('ep-follow')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/follow/{id}</span>
                            <span class="endpoint-desc">Toggle follow/unfollow a user</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-follow')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-follow')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-follow"><pre>POST /api/follow/2
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-follow"><pre>{ "following": true }

// or when unfollowing:
{ "following": false }</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PROJECTS -->
                <div class="section" id="projects">
                    <div class="section-title">Projects</div>

                    <!-- GET /projects -->
                    <div class="endpoint" id="ep-projects">
                        <div class="endpoint-header" onclick="toggle('ep-projects')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/projects</span>
                            <span class="endpoint-desc">List all projects, paginated (10/page)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Query parameters</div>
                                <div class="param-row"><span class="param-name">search</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">Filter by title, description, username or tags</span></div>
                                <div class="param-row"><span class="param-name">page</span><span class="param-type">integer</span><span class="param-optional">optional</span><span class="param-desc">Page number (default 1)</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-projects')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-projects')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-projects"><pre>GET /api/projects?search=React&page=1
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-projects"><pre>{
  "current_page": 1,
  "data": [
    {
      "id": 7,
      "user_id": 2,
      "title": "CV",
      "description": "Curriculum Vitae",
      "tags": ["TypeScript", "React"],
      "project_link": "https://fjrodafo-cv.vercel.app",
      "github_link": "https://github.com/FJrodafo/CV",
      "status": "active",
      "views_count": 6,
      "comments_count": 4,
      "ratings_avg_stars": 4.5,
      "ratings_count": 2,
      "user_rating": null,
      "user": { "id": 2, "name": "Francisco José", "username": "fran" }
    }
  ],
  "next_page_url": "http://api.devhub.com/api/projects?page=2",
  "total": 45
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- POST /projects -->
                    <div class="endpoint" id="ep-projects-store">
                        <div class="endpoint-header" onclick="toggle('ep-projects-store')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/projects</span>
                            <span class="endpoint-desc">Create a new project</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">title</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">max 100</span></div>
                                <div class="param-row"><span class="param-name">description</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">max 1000</span></div>
                                <div class="param-row"><span class="param-name">project_link</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">valid URL, max 255</span></div>
                                <div class="param-row"><span class="param-name">tags</span><span class="param-type">array</span><span class="param-optional">optional</span><span class="param-desc">max 10 items, each max 30 chars</span></div>
                                <div class="param-row"><span class="param-name">github_link</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">valid URL, max 255</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-projects-store')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-projects-store')">Response 201</div>
                                </div>
                                <div class="tab-content active" id="req-projects-store"><pre>POST /api/projects
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "title": "DevHub",
  "description": "Social network for developers.",
  "tags": ["React", "Laravel", "TypeScript"],
  "project_link": "https://devhub-demo.vercel.app",
  "github_link": "https://github.com/PRW-DAW/DevHub"
}</pre></div>
                                <div class="tab-content" id="res-projects-store"><pre>{
  "id": 22,
  "user_id": 1,
  "title": "DevHub",
  "description": "Social network for developers.",
  "tags": ["React", "Laravel", "TypeScript"],
  "project_link": "https://devhub-demo.vercel.app",
  "github_link": "https://github.com/PRW-DAW/DevHub",
  "status": "active",
  "created_at": "2026-05-10T12:00:00.000000Z",
  "user": { "id": 1, "name": "Alba", "username": "alba" }
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /projects/{id} -->
                    <div class="endpoint" id="ep-project-show">
                        <div class="endpoint-header" onclick="toggle('ep-project-show')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/projects/{id}</span>
                            <span class="endpoint-desc">Get a project and register a unique view</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-project-show')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-project-show')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-project-show"><pre>GET /api/projects/7
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-project-show"><pre>{
  "id": 7,
  "title": "CV",
  "description": "Curriculum Vitae",
  "tags": ["TypeScript", "React"],
  "project_link": "https://fjrodafo-cv.vercel.app",
  "github_link": "https://github.com/FJrodafo/CV",
  "status": "active",
  "views_count": 7,
  "comments_count": 4,
  "ratings_avg_stars": 4.5,
  "ratings_count": 2,
  "user_rating": 4,
  "user": { "id": 2, "name": "Francisco José", "username": "fran" }
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- PUT /projects/{id} -->
                    <div class="endpoint" id="ep-project-update">
                        <div class="endpoint-header" onclick="toggle('ep-project-update')">
                            <span class="method-tag put">PUT</span>
                            <span class="endpoint-path">/projects/{id}</span>
                            <span class="endpoint-desc">Update a project (owner only)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">title</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">max 255</span></div>
                                <div class="param-row"><span class="param-name">description</span><span class="param-type">string</span><span class="param-optional">optional</span></div>
                                <div class="param-row"><span class="param-name">tags</span><span class="param-type">array</span><span class="param-optional">optional</span></div>
                                <div class="param-row"><span class="param-name">project_link</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">valid URL</span></div>
                                <div class="param-row"><span class="param-name">github_link</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">valid URL or null</span></div>
                                <div class="param-row"><span class="param-name">status</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">active | completed | paused</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-project-update')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-project-update')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-project-update"><pre>PUT /api/projects/7
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "status": "completed"
}</pre></div>
                                <div class="tab-content" id="res-project-update"><pre>{
  "id": 7,
  "title": "CV",
  "status": "completed",
  ...
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- DELETE /projects/{id} -->
                    <div class="endpoint" id="ep-project-delete">
                        <div class="endpoint-header" onclick="toggle('ep-project-delete')">
                            <span class="method-tag del">DELETE</span>
                            <span class="endpoint-path">/projects/{id}</span>
                            <span class="endpoint-desc">Delete a project (owner only)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-project-delete')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-project-delete')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-project-delete"><pre>DELETE /api/projects/7
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-project-delete"><pre>{
  "message": "Proyecto eliminado"
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /me/projects -->
                    <div class="endpoint" id="ep-me-projects">
                        <div class="endpoint-header" onclick="toggle('ep-me-projects')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/me/projects</span>
                            <span class="endpoint-desc">Get own projects, paginated (10/page)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Query parameters</div>
                                <div class="param-row"><span class="param-name">page</span><span class="param-type">integer</span><span class="param-optional">optional</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-me-projects')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-me-projects')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-me-projects"><pre>GET /api/me/projects?page=1
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-me-projects"><pre>{
  "current_page": 1,
  "data": [ { ... } ],
  "next_page_url": null,
  "total": 3
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /users/{id}/projects -->
                    <div class="endpoint" id="ep-user-projects">
                        <div class="endpoint-header" onclick="toggle('ep-user-projects')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/users/{id}/projects</span>
                            <span class="endpoint-desc">Get a user's projects, paginated (10/page)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Query parameters</div>
                                <div class="param-row"><span class="param-name">page</span><span class="param-type">integer</span><span class="param-optional">optional</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-user-projects')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-user-projects')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-user-projects"><pre>GET /api/users/6/projects?page=1
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-user-projects"><pre>{
  "current_page": 1,
  "data": [ { ... } ],
  "next_page_url": "http://api.devhub.com/api/users/6/projects?page=2",
  "total": 22
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- GET /projects/top-technologies -->
                    <div class="endpoint" id="ep-top-tech">
                        <div class="endpoint-header" onclick="toggle('ep-top-tech')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/projects/top-technologies</span>
                            <span class="endpoint-desc">Top 5 most used tags across all projects</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-top-tech')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-top-tech')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-top-tech"><pre>GET /api/projects/top-technologies
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-top-tech"><pre>[
  { "name": "React",      "count": 12, "percentage": 27.3 },
  { "name": "Laravel",    "count": 8,  "percentage": 18.2 },
  { "name": "TypeScript", "count": 8,  "percentage": 18.2 },
  { "name": "Blade",      "count": 4,  "percentage": 9.1  },
  { "name": "PHP",        "count": 4,  "percentage": 9.1  }
]</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COMMENTS -->
                <div class="section" id="comments">
                    <div class="section-title">Comments</div>

                    <!-- GET comments -->
                    <div class="endpoint" id="ep-comments-index">
                        <div class="endpoint-header" onclick="toggle('ep-comments-index')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/projects/{id}/comments</span>
                            <span class="endpoint-desc">Get all comments for a project</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-comments-index')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-comments-index')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-comments-index"><pre>GET /api/projects/7/comments
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-comments-index"><pre>[
  {
    "id": 3,
    "user_id": 1,
    "body": "Great project!",
    "created_at": "2026-05-09T18:00:00.000000Z",
    "user": { "id": 1, "name": "Alba", "username": "alba" }
  }
]</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- POST comment -->
                    <div class="endpoint" id="ep-comments-store">
                        <div class="endpoint-header" onclick="toggle('ep-comments-store')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/projects/{id}/comments</span>
                            <span class="endpoint-desc">Add a comment to a project</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">body</span><span class="param-type">string</span><span class="param-required">required</span><span class="param-desc">max 500</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-comments-store')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-comments-store')">Response 201</div>
                                </div>
                                <div class="tab-content active" id="req-comments-store"><pre>POST /api/projects/7/comments
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "body": "Great project!"
}</pre></div>
                                <div class="tab-content" id="res-comments-store"><pre>{
  "id": 4,
  "user_id": 1,
  "project_id": 7,
  "body": "Great project!",
  "created_at": "2026-05-10T12:00:00.000000Z",
  "user": { "id": 1, "name": "Alba", "username": "alba" }
}</pre></div>
                            </div>
                        </div>
                    </div>

                    <!-- DELETE comment -->
                    <div class="endpoint" id="ep-comments-delete">
                        <div class="endpoint-header" onclick="toggle('ep-comments-delete')">
                            <span class="method-tag del">DELETE</span>
                            <span class="endpoint-path">/comments/{id}</span>
                            <span class="endpoint-desc">Delete a comment (owner only)</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-comments-delete')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-comments-delete')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-comments-delete"><pre>DELETE /api/comments/3
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-comments-delete"><pre>{
  "message": "Comentario eliminado"
}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RATINGS -->
                <div class="section" id="ratings">
                    <div class="section-title">Ratings</div>

                    <div class="endpoint" id="ep-rate">
                        <div class="endpoint-header" onclick="toggle('ep-rate')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/projects/{id}/rate</span>
                            <span class="endpoint-desc">Rate a project (1–5 stars), updates if already rated</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">stars</span><span class="param-type">integer</span><span class="param-required">required</span><span class="param-desc">1 to 5</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-rate')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-rate')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-rate"><pre>POST /api/projects/7/rate
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "stars": 5
}</pre></div>
                                <div class="tab-content" id="res-rate"><pre>{
  "rating_avg": 4.5,
  "rating_count": 2
}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- POSTS -->
                <div class="section" id="posts">
                    <div class="section-title">Posts <span style="font-size:12px;font-weight:400;color:var(--text-muted)">— not used in frontend</span></div>

                    <div class="endpoint" id="ep-posts-index">
                        <div class="endpoint-header" onclick="toggle('ep-posts-index')">
                            <span class="method-tag get">GET</span>
                            <span class="endpoint-path">/posts</span>
                            <span class="endpoint-desc">List all posts</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-posts-index')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-posts-index')">Response 200</div>
                                </div>
                                <div class="tab-content active" id="req-posts-index"><pre>GET /api/posts
Authorization: Bearer 1|hJAWha4FEVlL6zF5...</pre></div>
                                <div class="tab-content" id="res-posts-index"><pre>[
  {
    "id": 1,
    "user_id": 1,
    "content": "Hello DevHub!",
    "media_url": null,
    "created_at": "2026-05-09T10:00:00.000000Z"
  }
]</pre></div>
                            </div>
                        </div>
                    </div>

                    <div class="endpoint" id="ep-posts-store">
                        <div class="endpoint-header" onclick="toggle('ep-posts-store')">
                            <span class="method-tag post">POST</span>
                            <span class="endpoint-path">/posts</span>
                            <span class="endpoint-desc">Create a post</span>
                            <span class="endpoint-auth">🔒 auth</span>
                            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <div class="endpoint-body">
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Body parameters</div>
                                <div class="param-row"><span class="param-name">content</span><span class="param-type">string</span><span class="param-required">required</span></div>
                                <div class="param-row"><span class="param-name">media_url</span><span class="param-type">string</span><span class="param-optional">optional</span><span class="param-desc">valid URL</span></div>
                            </div>
                            <div class="endpoint-section">
                                <div class="endpoint-section-title">Example</div>
                                <div class="tabs">
                                    <div class="tab active" onclick="switchTab(this, 'req-posts-store')">Request</div>
                                    <div class="tab" onclick="switchTab(this, 'res-posts-store')">Response 201</div>
                                </div>
                                <div class="tab-content active" id="req-posts-store"><pre>POST /api/posts
Authorization: Bearer 1|hJAWha4FEVlL6zF5...
Content-Type: application/json

{
  "content": "Hello DevHub!"
}</pre></div>
                                <div class="tab-content" id="res-posts-store"><pre>{
  "id": 2,
  "user_id": 1,
  "content": "Hello DevHub!",
  "media_url": null,
  "created_at": "2026-05-10T12:00:00.000000Z"
}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>

        <script>
            function toggle(id) {
                const el = document.getElementById(id);
                el.classList.toggle('open');
            }

            function goTo(id) {
                document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            function switchTab(tab, contentId) {
                const endpoint = tab.closest('.endpoint-section');
                endpoint.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                endpoint.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(contentId).classList.add('active');
            }
        </script>
    </body>
</html>

# News-OS Aggregator — System Flow

## Product Summary
This app is a personal news terminal where users build custom smart streams instead of reading random headlines. Each workspace is a programmable news stream that continuously loads only the news the user wants.

## App Modules and Routes
- `/` → `src/pages/FirstVisit.tsx`
  - first-launch empty state
  - prompt to create the first workspace
- `/feed` → `src/pages/NewsFeed.tsx`
  - active workspace feed
  - infinite news stream
- `/read-later` → `src/pages/ReadLater.tsx`
  - saved articles screen
- workspace creation → `src/pages/WorkspaceForm.tsx`
  - smart filter builder
- sidebar navigation → `src/components/Sidebar.tsx`
- state storage → `src/store/app.store.ts`
- news API client → `src/api/news.api.ts`

## One-Page User Flow

### 1. Launch App
- Start route: `/`
- Sidebar is empty
- Center panel shows:
  - `Create your first Workspace to start your news stream`
  - optional call to action: `+ Add Workspace`
- If stored workspaces exist, the app should auto-load the active workspace and navigate to `/feed`.

### 2. Add Workspace
- User clicks the workspace creation action
- They are taken to the workspace form screen
- Form route is the same page as creation form, likely rendered from `WorkspaceForm.tsx`

### 3. Create Workspace Inputs
Form fields and system conversion:
- Title
  - user: stream name
  - system: sidebar label
- Primary Keywords
  - user: what news they want
  - system: becomes the API `q` query
- Excluded Keywords
  - user: what to avoid
  - system: becomes `-keyword` exclusion logic in the search query
- Language
  - user: preferred language
  - system: API `language` value
- Date Range
  - user: freshness window
  - system: API `from` and `to`

### 4. Validation Before Save
The app blocks bad workspace filters:
- if excluded keywords include any primary keyword → block creation
- if `dateFrom` > `dateTo` → block creation
- required fields must be filled

### 5. Save Workspace
On successful submit:
- Workspace is stored in Zustand and persisted locally
- `activeWorkspaceId` is set to the new workspace
- Sidebar updates immediately
- App navigates to `/feed`
- The feed fetches news immediately for the new workspace

### 6. Feed Experience
Route: `/feed`
- Page shows skeleton loaders while data loads
- Article cards appear after API response
- Each card includes:
  - image
  - title
  - source
  - save button (⭐)
- The bottom shows a `Load More` button

### 7. News Fetching Behavior
- Axios interceptor attaches the API key to every request
- The app uses workspace filters to build the request
- `TanStack Query` caches pages
- Duplicate titles are removed before rendering
- Clicking `Load More` fetches the next page

### 8. Save for Later
When the user clicks ⭐ on an article:
- app stores the article in persistent Zustand state
- no extra API request is made
- the star fills immediately

### 9. Saved Articles Screen
Route: `/read-later`
- shows all saved articles from local state
- supports instant search/filtering
- works offline because articles are stored locally

### 10. Returning User Flow
On reopen:
- existing workspaces still appear in the sidebar
- active workspace is remembered
- feed auto-loads for the active workspace
- saved articles remain available

## System Behavior Summary
- Sidebar = workspace navigation + saved list trigger
- Workspaces are the single source of truth for news streams
- News feed is workspace-driven and paginated
- Saved articles are offline-first
- Persistence is handled by `zustand/persist`

## Expected Screen Text and Flow
1. First visit: `Create your first Workspace to start your news stream`
2. Click add workspace → open smart filter form
3. Submit form → workspace appears in sidebar
4. Feed opens and loads news
5. Save articles → available in `Read Later`
6. Return later → workspaces and feed still present

## File Map for Implementation
- `src/pages/FirstVisit.tsx` — empty state prompt and initial CTA
- `src/pages/WorkspaceForm.tsx` — workspace creation logic + validation
- `src/components/Sidebar.tsx` — workspace list and read-later navigation
- `src/pages/NewsFeed.tsx` — active workspace news stream
- `src/pages/ReadLater.tsx` — saved article repository
- `src/store/app.store.ts` — persistent app state
- `src/api/news.api.ts` — news API integration
- `src/routes/AppRoutes.tsx` — route wiring

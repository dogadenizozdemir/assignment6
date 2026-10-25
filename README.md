# React Post Dashboard

**File Organization**
- `src/api/`: Contains `postsApi.js` for data fetching logic.
- `src/components/`: Contains presentational components (`Post.jsx`, `PostList.jsx`) and the controlled form (`FilterForm.jsx`).
- `src/reducer/`: Contains `postsReducer.js` for managing complex async states without mutating data.
- `src/App.jsx`: The main container managing `useReducer`, `useEffect`, and derived state for the filter.

**Challenges Faced**
The main challenge was ensuring a clean separation between UI components and data logic. I had to make sure the reducer remained a strict pure function and that filtering was handled entirely as derived state during render, rather than relying on `useEffect`. Managing the loading, error, and empty states explicitly also required careful orchestration in the main App component.
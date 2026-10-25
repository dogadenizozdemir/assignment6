import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi';
import { postsReducer, initialState } from './reducer/postsReducer';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true; 

    const getPosts = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts();
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    getPosts();

    return () => {
      isMounted = false; 
    };
  }, []);

  
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Post Dashboard</h1>
      <FilterForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {state.loading && <div>Loading posts...</div>}
      
      {!state.loading && state.error && (
        <div style={{ color: 'red' }}>Error: {state.error}</div>
      )}
      
      {!state.loading && !state.error && state.posts.length === 0 && (
        <div>No posts found.</div>
      )}

      {!state.loading && !state.error && state.posts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default App;
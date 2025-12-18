import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Mini Blog</h1>
      </header>

      <div className="mb-4">
        <PostForm onPostCreated={triggerRefresh} />
      </div>

      <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ccc' }} />

      <div>
        <PostList refreshTrigger={refresh} />
      </div>
    </div>
  );
}

export default App;

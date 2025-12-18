import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const PostList = ({ refreshTrigger }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/posts';

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}?page=${page}`);
            setPosts(res.data.posts);
            setTotalPages(res.data.pages);
            setError(null);
        } catch (err) {
            setError('Failed to fetch posts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, refreshTrigger]);

    const handleDelete = async (id) => {
        const previousPosts = [...posts];
        setPosts(posts.filter(post => post._id !== id));

        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (err) {
            setPosts(previousPosts);
            alert('Failed to delete post');
        }
    };



    return (
        <div>
            <div className="card items-center justify-between flex" style={{ padding: '1rem' }}>
                <h2 style={{ margin: 0 }}>Recent Posts</h2>

            </div>

            {error && <div className="card" style={{ color: 'red' }}>{error}</div>}

            {loading && posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : (
                <>
                    {posts.map((post) => (
                        <div key={post._id} className="card fade-in">
                            <div className="flex justify-between items-center mb-4">
                                <h3 style={{ marginBottom: 0 }}>{post.title}</h3>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="btn-outline btn-danger"
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', borderColor: 'transparent' }}
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="mb-4 text-gray text-sm">
                                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{post.username}</span>
                                {' • '}
                                <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                            </div>

                            <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                            <div>
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="badge">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {posts.length === 0 && !loading && (
                        <div className="card" style={{ textAlign: 'center' }}>No posts found.</div>
                    )}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <button
                                className="btn btn-secondary"
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                style={{ opacity: page === 1 ? 0.5 : 1 }}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                className="btn btn-secondary"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                style={{ opacity: page === totalPages ? 0.5 : 1 }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostList;

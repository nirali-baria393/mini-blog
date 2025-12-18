import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        username: '',
        tags: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.title || !formData.content || !formData.username) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const tagsArray = formData.tags.split(',').map((tag) => tag.trim()).filter(t => t);

            const newPost = {
                title: formData.title,
                content: formData.content,
                username: formData.username,
                tags: tagsArray,
            };

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/posts';
            await axios.post(API_URL, newPost);

            setFormData({ title: '', content: '', username: '', tags: '' });
            if (onPostCreated) onPostCreated();

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="mb-4">Create New Post</h2>
            {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-sm text-gray">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter post title"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray">Author (Username)</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray">Content</label>
                    <textarea
                        name="content"
                        rows="4"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write something amazing..."
                    ></textarea>
                </div>

                <div>
                    <label className="text-sm text-gray">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="tech, life, coding"
                    />
                </div>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;

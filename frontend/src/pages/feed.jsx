import React, { useEffect, useState } from 'react'
import axios from 'axios';

// React components should be PascalCase
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedPosts, setLikedPosts] = useState(new Set());

    // new state for form toggling and preview
    const [showForm, setShowForm] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/posts')
            .then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load posts');
                setLoading(false);
            });
    }, []);

    const handleLike = (postId) => {
        setLikedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    // handlers for create-post form
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios
            .post('http://localhost:3000/posts', formData)
            .then((res) => {
                // add new post to the top of the feed
                if (res.data && res.data.post) {
                    setPosts((prev) => [res.data.post, ...prev]);
                }
                setShowForm(false);
                setPreview(null);
            })
            .catch((err) => {
                console.log('Error creating post:', err);
            });
    };

    if (loading) {
        return (
            <div className='feed-container'>
                <div className='loader'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='feed-container'>
                <h2 className='error-message'>{error}</h2>
            </div>
        );
    }

    return (
        <div className='feed-container'>
            <div className='feed-header'>
                <h1 className='feed-title'>Your Feed</h1>
                <button className='create-button' onClick={() => setShowForm(true)}>
                    Create Post
                </button>
            </div>

            {showForm && (
                <section className='createpost-section'>
                    <h2>Create Post</h2>
                    <form onSubmit={handleCreateSubmit}>
                        <label className="file-input">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="preview-image"
                                />
                            ) : (
                                <span>Click or tap to select an image</span>
                            )}
                            <input
                                type="file"
                                name='image'
                                accept='image/*'
                                required
                                onChange={handleFileChange}
                            />
                        </label>
                        <input
                            type="text"
                            name='caption'
                            placeholder='Enter your caption'
                            required
                        />
                        <div className='form-buttons'>
                            <button type='submit'>Submit</button>
                            <button type='button' onClick={() => { setShowForm(false); setPreview(null); }}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {posts.length > 0 ? (
                <div className='posts-grid'>
                    {posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <div className='post-image-container'>
                                <img
                                    src={post.images}
                                    alt={post.caption}
                                    className='post-image'
                                />
                            </div>
                            <div className='post-content'>
                                <p className='post-caption'>{post.caption}</p>
                                <div className='post-footer'>
                                    <button
                                        className={`like-button ${
                                            likedPosts.has(post._id) ? 'liked' : ''
                                        }`}
                                        onClick={() => handleLike(post._id)}
                                    >
                                        ❤️ {likedPosts.has(post._id) ? 'Liked' : 'Like'}
                                    </button>
                                    <span className='likes-count'>
                                        {post.likes + (likedPosts.has(post._id) ? 1 : 0)}
                                        {' '}likes
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='no-posts'>
                    <h2> No posts available yet</h2>
                    <p>Be the first to create a post!</p>
                </div>
            )}
        </div>
    );
};

export default Feed
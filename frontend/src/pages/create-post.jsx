import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// capitalized component name for React conventions
const CreatePost = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post('http://localhost:3000/posts', formData)
            .then((res) => {
                navigate('/feed');
            })
            .catch((err) => {
                console.log('Error creating post:', err);
            });
    }

    return (
        <section className='createpost-section'>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Submit</button>
            </form>
        </section>
    );
};

export default CreatePost
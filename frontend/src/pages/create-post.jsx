import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


    

const createpost = () => {

    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post('http://localhost:3000/posts', formData)
            .then((res) => {
                // console.log(res.data);
                navigate('/feed');
            })
             .catch((err) => {
                console.log('Error creating post:', err);
            });
    } 

    return (
        <section className='createpost-section'>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit} >
                <input type="file" name='image' accept='image/*' />
                <input type="text" name='caption' placeholder='Enter your caption'required />
                <button>Submit</button>
            </form>
        </section>
    )
}

export default createpost
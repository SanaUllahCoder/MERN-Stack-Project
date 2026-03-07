import React, { use, useEffect, useState } from 'react'
import axios from 'axios';

const feed = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            image: 'https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg',
            caption: 'Beautiful sunset!',
            likes: 10,
        }
    ]) // State to hold the list of posts

    const baseUrl = 'http://localhost:3000/';
    const postsApi = {
        get: '/posts',
        post: `${baseUrl}posts`,
    }

    useEffect(() => {  
        axios.get('http://localhost:3000/posts')
           .then((res) => {
                setPosts(res.data.posts);
            })    
    }, []) 
    return (
        <>
            {
                posts.length > 0 ? (

                    posts.map((post) => (
                        <div key={post._id} className='post'>
                            <img src={post.images} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1>No posts available.</h1>
                )
            }
        </>
    )
}

export default feed
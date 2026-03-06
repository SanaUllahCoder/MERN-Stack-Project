import React, { use, useEffect, useState } from 'react'
import axios from 'axios';

const feed = () => {
    const [posts, setposts] = useState([
        {
            id: 1,
            image: 'https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg',
            caption: 'Beautiful sunset!',
            likes: 10,
        }
    ]) // State to hold the list of posts

    const baseUrl = 'http://localhost:3000/';
    const postsApi = {
        get: `${baseUrl}posts`,
        post: `${baseUrl}posts`,
    }

    useEffect(() => {
        
        axios.get(postsApi.get)
           .then((res) => {
                console.log(res.data); 
            })
          
    }, []) 
    return (
        <  >
            {
                posts.length > 0 ? (

                    posts.map((post) => (
                        <div key={post.id} className='post'>
                            <img src={post.image} alt={post.caption} />
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
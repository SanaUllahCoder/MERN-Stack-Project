import React from 'react'

const createpost = () => {
    return (
        <section className='createpost-section'>
            <h1>Create Post</h1>
            <form >
                <input type="file" name='image' accept='image/*' />
                <input type="text" name='caption' placeholder='Enter your caption'required />
                <button>Submit</button>
            </form>
        </section>
    )
}

export default createpost
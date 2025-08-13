import React, { useState } from 'react'
import axios from 'axios'

const PostForm = () => {
    const API = import.meta.env.VITE_API_URL
    const [posts, setPosts] = useState([])
    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API}/api/posts`)
            const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []
            setPosts(data)
        } catch (error) {
            console.log(error, 'failed')
        }
    }
    fetchPosts()
    return (
        <div>
            {posts.map((post) => {
                <div key={post.id}>
                    {post.title}
                    {post.content}
                    {post.auther}
                </div>
            })}
        </div>
    )
}

export default PostForm
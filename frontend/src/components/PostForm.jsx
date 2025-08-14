import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PostForm.css'

const PostForm = () => {
    const API = import.meta.env.VITE_API_URL

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API}/api/posts`)
            const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []
            console.log(data)
            setPosts(data)
        } catch (error) {
            console.log(error, 'failed')
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    const onCreate = async () => {
        if (!title.trim()) return
        try {
            await axios.post(`${API}/api/posts`, { title, content })
            setTitle('')
            setContent('')
            await fetchPosts()
        } catch (error) {
            alert('failed')
        } finally {
            setLoading(false)
        }
    }
    const onUpdate = async (post) => {
        const id = post._id ?? post.id
        const nextTitle = prompt('새 제목', post.title ?? '')
        if (nextTitle == null) return
        const nextContent = prompt('내용', post.content ?? '')
        if (nextContent == null) return
        try {
            setLoading(true)
            await axios.put(`${API}/api/posts/${id}`, {
                ...post,
                title: nextTitle.trim(),
                content: nextContent.trim()
            })
            await fetchPosts()
        } catch (error) {
            alert('failed')
        } finally {
            setLoading(false)
        }
    }
    const onDelete = async (id) => {
        if (!confirm('삭제하시겠습니까? 되돌릴 수 없습니다.')) return
        try {
            setLoading(true)
            await axios.delete(`${API}/api/posts/${id}`)
            await fetchPosts()
        } catch (error) {
            alert('failed')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='post-wrap'>
            <h2>Posts</h2>
            <div className="post-controls">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목 입력' />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용 입력' rows={3}></textarea>
                <div className="post-buttons">
                    <button className='btn' onClick={onCreate} disabled={loading}>등록</button>
                    <button className='refresh btn' disabled={loading}>새로고침</button>
                </div>
            </div>
            {loading && <p>loading...</p>}
            {err && <p>{err}</p>}
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post._id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <button className="update btn" onClick={() => onUpdate(post)}>✏️</button>
                        <button className="delete btn" onClick={() => onDelete(post._id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostForm
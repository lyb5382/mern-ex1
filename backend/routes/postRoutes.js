const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const saved = await newPost.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(400).json({ message: 'failed', error })
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(201).json(posts)
    } catch (error) {
        res.status(400).json({ message: 'failed', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ message: 'not found' })
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({ message: 'failed', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updated) return res.status(404).json({ message: 'not found' })
        res.status(201).json(updated)
    } catch (error) {
        res.status(400).json({ message: 'failed', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: 'not found' })
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(201).json(posts)
    } catch (error) {
        res.status(400).json({ message: 'failed', error })
    }
})

module.exports = router
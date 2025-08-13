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

module.exports = router
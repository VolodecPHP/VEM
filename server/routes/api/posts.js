const express = require('express')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const router = express.Router()

const dbConnect = async () => {
	const dbURI = 'mongodb+srv://volodec:vova1908@cluster0.xuvds.mongodb.net/node-tuts?retryWrites=true&w=majority'

	await mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology : true })
}

// Get post
router.get('/', async (req, res) => {
	await dbConnect()
	res.send(await Blog.find())
	await mongoose.disconnect()
})

// Add post
router.post('/', async (req, res) => {	
	await dbConnect()
	const blog = new Blog({
		title : req.body.title
	})

	await blog.save()
	res.status(201).send()
	await mongoose.disconnect()
})

// Delete post
router.delete('/:id', async (req, res) => {	
	await dbConnect()

	await Blog.remove({ _id : req.params.id})
	res.status(200).send()
	await mongoose.disconnect()
})

module.exports = router
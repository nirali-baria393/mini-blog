const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

const getPosts = asyncHandler(async (req, res) => {
    const { page } = req.query;

    const pageSize = 5;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    let postsQuery = Post.find({}).sort({ createdAt: -1 });

    if (page) {
        postsQuery = postsQuery.limit(pageSize).skip(skip);
    }

    const posts = await postsQuery;
    const total = await Post.countDocuments({});

    res.status(200).json({
        posts,
        page: page ? currentPage : 1,
        pages: page ? Math.ceil(total / pageSize) : 1,
        total
    });
});

const createPost = asyncHandler(async (req, res) => {
    const { title, content, username, tags } = req.body;

    if (!title || !content || !username) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const post = await Post.create({
        title,
        content,
        username,
        tags: tags || [],
    });

    res.status(201).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    await post.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getPosts,
    createPost,
    deletePost,
};

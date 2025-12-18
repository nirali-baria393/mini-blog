const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    deletePost,
} = require('../controllers/postController');

router.route('/').get(getPosts).post(createPost);
router.route('/:id').delete(deletePost);

module.exports = router;

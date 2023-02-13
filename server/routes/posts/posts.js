const express = require('express')
const { createPost, getAllPosts, likePost, unlikePost, savePost, unSavePost } = require('../../controllers/postController')
const requireLogin = require('../../middleware/requireLogin')
const postRouter = express.Router()


postRouter.post("/createpost",requireLogin,createPost)
postRouter.get("/allpost",requireLogin,getAllPosts)

postRouter.put('/like',requireLogin,likePost)
postRouter.put('/unlike',requireLogin,unlikePost)

postRouter.put('/saved',requireLogin, savePost)
postRouter.put('/unsaved',requireLogin, unSavePost)

module.exports = postRouter
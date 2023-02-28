const express = require('express')
const { logout, getMyPosts, getMySavedPosts, updateProfile, followUser, unfollowUser, getUserDetails, suggestionUser } = require('../../controllers/userController')
const userRouter = express.Router()
const requireLogin = require('../../middleware/requireLogin')

userRouter.get('/logout',requireLogin,logout)
userRouter.get('/mypost',requireLogin,getMyPosts)
userRouter.get('/mySavedPosts',requireLogin,getMySavedPosts)
userRouter.put('/updateProfile',requireLogin,updateProfile)
userRouter.put('/follow',requireLogin,followUser)
userRouter.put('/unfollow',requireLogin,unfollowUser)

userRouter.get('/user/:id',requireLogin,getUserDetails)

userRouter.get('/suggestionUser',requireLogin,suggestionUser)


module.exports = userRouter
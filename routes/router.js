const express = require("express")
const { newUser, newPost, userPosts, allPosts, editPost, deleteUser, signinLogic, deletePost, newUserWithDp, editUSerInfo } = require("../controllers/logic")
const upload = require("../multerConfig/storageConfig")

const router = new express.Router()

router.post("/signin",signinLogic)

// router.post("/register",newUser)

router.post("/register",upload.single('profilePic'),newUserWithDp)

router.post("/newpost",newPost)

router.get("/userposts/:username",userPosts)

router.get("/getallposts",allPosts)

router.put("/editpost/:postId",editPost)

router.delete("/deleteuser/:userId",deleteUser)

router.delete("/deletepost/:postId",deletePost)

router.put("/edituser/:userId",upload.single('profilePic'),editUSerInfo)

module.exports = router
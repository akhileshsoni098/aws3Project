const express = require("express")
const { createBlog, getAllBlog, updateBlog, deleteBlog, getBucketList } = require("../controllers/blogController")
const { registration } = require("../controllers/auth")

const router = express.Router()



// registration
router.route("/registration").post(registration)

router.route("/createBlog").post(createBlog)

router.route("/allBlogs").get(getAllBlog)

router.route("/updateBlog/:blogId").put(updateBlog)
router.route("/deleteBlog/:blogId").delete(deleteBlog)


///////////
router.route("/listBucketObject").get(getBucketList)



module.exports = router 
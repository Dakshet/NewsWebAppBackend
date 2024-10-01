const express = require("express");
const { body } = require("express-validator");
const { fetchUser } = require("../middlewares/fetchUser");
const { addNews, updateNews, deleteNews, fetchSpecificNews, fetchAllNewsForHomePage, fetchAllNewsForSpecificRoute, fetchSearchNews, addMagazine, deleteMagazine } = require("../controllers/news");
const multer = require('multer')
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./uploads"))
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = `${Date.now()}-${file.originalname}`
        const uniqueSuffix = `${Date.now()} -$- ${file.originalname}`
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.get("/fetchallnews", fetchAllNewsForHomePage)

router.get("/fetchspecificpagenews", fetchAllNewsForSpecificRoute)

router.get("/fetchspecificnews/:newsId", fetchSpecificNews)

router.get("/fetchsearchuser", fetchSearchNews)

router.post("/addnews", [
    body("title", "Title must be 3 characters").isLength({ min: 5 }),
    body("body", "Content must be 4 characters").isLength({ min: 10 })
], fetchUser, addNews)

router.post("/addmagazine", upload.single("body"), fetchUser, addMagazine);

router.put("/updatenews/:newsId", fetchUser, updateNews)

router.delete("/deletenews", fetchUser, deleteNews)

router.delete("/deletemagazine", fetchUser, deleteMagazine)

module.exports = router;
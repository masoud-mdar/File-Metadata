const express = require("express")
const cors = require("cors")
const multer = require("multer")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

const upload = multer({dest: "uploaded/"})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello !")
})

app.post("/api/fileanalyse", upload.single("file"), (req, res, next) => {
    console.log(req.file)

    if (req.file) {
        console.log(req.file)
        res.json({"name": req.file.originalname, "type": req.file.mimetype, "size": req.file.size})
        next()
    } else {
        res.json({"error": "Please upload a file..."})
    }

})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
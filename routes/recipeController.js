const express = require('express')
const router = express.Router()

router.get("/", (request, response) => {
    response.send("I'm alive")
})

module.exports = router
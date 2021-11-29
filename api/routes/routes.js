const express = require('express');

const router = express.Router();

router.post("/users", (req, res) => {
    res.send("hello users!");
})

module.exports = router;
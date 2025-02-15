const express = require('express');
const router = express.Router();

router.post('/coffeedata', async(req, res) => {
    try {
        console.log(global.coffeeItems, global.coffeeCategory);
        res.send([global.coffeeItems, global.coffeeCategory]);
    }
    catch (err) {
        console.error(err.message);
        res.send("Server Error");
    }
})

module.exports = router;
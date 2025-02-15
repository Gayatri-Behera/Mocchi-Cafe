const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post("/myOrderData", async (req, res) => {
   try{
   let eId = await Order.findOne({'email': req.body.email})
   res.json({orderData:eId})
   }catch(err){
   res.send("Error", err.message)
   }
})

module.exports = router;
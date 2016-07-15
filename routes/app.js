var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/messages', function(req, res, next){
    Message.find(function(error, messsages){
        if(error){
            return res.status(500).json({
                message: "Error while saving data!"
            });
        }

        res.status(200).json({
            data: messages
        });
    });
});

router.post('/message', function(req, res, next){
    var message = new Message({
        content: req.body.content
    });

    message.save(function(error, result){
        if(error) {
            return res.status(500).json({
                message:"Error while saving data!"
            });
        }

        res.status(201).json({
            message: 'Saved!'
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const wechat = require('wechat');

let config = {
    token: 'wxexpress',
    appid: "",
    appsecret: '',
    encodingAESKey: ''
};

router.use(express.query());

router.use('/', wechat(config, function(req, res, next) {
    console.log(req.weixin);
    var message = req.weixin;

    if (message.Content === '1') {
        res.reply('hahaha!');
    }
}));

module.exports = router;
const express = require('express');
const router = express.Router();
const wechat = require('wechat');

let config = {
    token: 'wxexpress',
    appid: "wxbb6586c7e62e38c1",
    appsecret: '',
    encodingAESKey: '18dbzs7NE2AljsonZ2HTElo0q2tIUBdwMexId3fFBwd'
};

router.use(express.query());

router.use('/', wechat(config, function(req, res, next) {
    console.log('--- yyd log wechat');

    console.log(req.weixin);
    var message = req.weixin;
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            res.reply('欢迎来到 YYD 新世界! ');

        } else if (message.Event === 'unsubscribe') {
            res.reply('');
            console.log(message.FromUserName + ' 悄悄地走了...');
        } else if (message.Event === 'LOCATION') {
            res.reply('您上报的地理位置是：' + message.Latitude + ',' + message.Longitude);
        } else if (messag.Event === 'CLICK') {
            res.reply('您点击了菜单：' + message.EventKey);
        } else if (message.Event === 'SCAN') {
            res.reply('关注后扫描二维码：' + message.Ticket);
        }
    } else if (message.MsgType === 'text') {
        // res.reply('欢迎来到文本新世界! ');
        var txt = {};
        if (message.Content === '1') {
            txt = {
                CreateTime: (Math.floor(Date.now() / 1000)).toString(),
                title: '金刚.骷髅岛',
                description: '南太平洋上的神秘岛屿——骷髅岛。史上最大金刚与邪恶骷髅蜥蜴的较量。',
                picUrl: 'http://tu.23juqing.com/d/file/html/gndy/dyzz/2017-04-09/da9c7a64ab7df196d08b4b327ef248f2.jpg',
                url: 'http://www.piaohua.com/html/dongzuo/2017/0409/31921.html'
            }
        } else {
            txt = {
                "ToUserName": message.FromUserName,
                "FromUserName": message.ToUserName,
                "MsgType": message.MsgType,
                "CreateTime": (Math.floor(Date.now() / 1000)).toString(),
                // "PicUrl": message.PicUrl,
                "MediaId": message.MediaId
            };
        }

        console.log('reply :', txt);
        // "CreateTime":
        // res.reply('欢迎来到图片新世界! ');
        res.reply(txt);
    } else if (message.MsgType === 'voice') {
        res.reply('欢迎来到语音新世界! ');
    } else if (message.MsgType === 'video') {
        res.reply('欢迎来到视频新世界! ');
    } else if (message.MsgType === 'image') {
        var txt = {
            "ToUserName": message.FromUserName,
            "FromUserName": message.ToUserName,
            "MsgType": message.MsgType,
            "CreateTime": (Math.floor(Date.now() / 1000)).toString(),
            // "PicUrl": message.PicUrl,
            "MediaId": message.MediaId
        };
        console.log('reply :', txt);
        // "CreateTime":
        // res.reply('欢迎来到图片新世界! ');
        res.reply(txt);
    } else if (message.MsgType === 'location') {
        res.reply('欢迎来到位置新世界! ');
    } else if (message.MsgType === 'link') {
        res.reply('欢迎来到链接新世界! ');
    } else if (message.MsgType === 'file') {
        res.reply('欢迎来到文件新世界! ');
    } else {
        res.reply('欢迎来到未知世界! ');
    }

    // if (message.Content === '1') {
    //     res.reply('hahaha!');
    // }
}));

module.exports = router;
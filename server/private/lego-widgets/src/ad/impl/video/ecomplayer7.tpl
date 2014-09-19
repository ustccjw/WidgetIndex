<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <script charset="utf-8" src="http://s1.bdstatic.com/r/www/cache/ecom/esl/1-6-2/esl.js"></script>
</head>
<body>
<!--嵌入代码开始-->
<script>
var APP_JS_PATH = '%(app.js.path)s'.replace(/\.js$/g, '');
require([APP_JS_PATH], function(wrapper){
    wrapper.set('AD_CONFIG', {
        "video": {
            'rcv_url': 'http://www.baidu.com',
            'img_url': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'big_img_url': 'http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg',
            'video_url': 'http://ecma.bdimg.com/adtest/c406bef13ed708eaca29f6dc0ce0f673.flv',
            'ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'big_ipad_img': 'http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg',
            'width': 259,
            'height': 146,
            'is_play': false,
            'playermode': 'small'
        }
    });

    // 获取广告的实例，true是必须的，意思是在异步的情况下展示广告
    var ad = wrapper.start(true);

    // 准备好容器
    var canvas = document.body.insertBefore(document.createElement('div'),
        document.body.firstChild);
    canvas.id = ad.getId();

    // 展示
    ad.show();
});
</script>
<!--嵌入代码结束-->
</body>
</html>

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
        "id": "hello-" + new Date().getTime(),
        "auto_slide_duration": 500,
        "options": [
            {"img_src": "http://dummyimage.com/259x146/f0f0f0/0f0f0f"},
            {"img_src": "http://dummyimage.com/259x146/e101f1/1f1f1f"},
            {"img_src": "http://dummyimage.com/259x146/a2b2f2/2f2f2f"},
            {"img_src": "http://dummyimage.com/259x146/c3d3f3/3f3f3f"},
            {"img_src": "http://dummyimage.com/259x146/d4e4f4/4f4f4f"}
        ]
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

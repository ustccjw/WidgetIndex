<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <script type="text/javascript" src="http://ecma.bdimg.com/public01/js/asp_loader.js"></script>
</head>
<body>
<button id="btn">更新物料</button>
<div id="ads"></div>

<script type="text/javascript">
var MATERIAL = null;
document.getElementById("btn").onclick = function(){
    var NOW = new Date().getTime();
    var NEW_AD_CONFIG = {
        'id' : 'ec-ma-lv120627',
        'main_url' : 'http://www.louisvuitton.cn',
        'buttons': {
            'options': [{
                'text' : '[1]' + NOW,
                'url' : 'http://www.baidu.com'
            },{
                'text' : '[2]' + NOW,
                'url' : 'http://www.baidu.com'
            },{
                'text' : '[3]' + NOW,
                'url' : 'http://www.baidu.com'
            },{
                'text' : '[4]' + NOW,
                'url' : 'http://www.baidu.com'
            }]
        }
    };
    ECMA_require(URL, function(m){
        m.set('AD_CONFIG', NEW_AD_CONFIG);
        MATERIAL.dispose();
        MATERIAL = m.start();
    });
};
</script>
<!--嵌入代码开始-->
<script>
var URL = 'http://leeight.baidu.com:8964/target/output/test/%(app.js.path)s';
ECMA_require(URL, function(m){
    // XXX(user) 如果右必要的话，先准备好画布（如果投放的页面已经准备好了）
    // 那其实可以跳过这一步
    var adConfig = m.get('AD_CONFIG');
    var canvasId = adConfig['id'];
    if (!document.getElementById(canvasId)) {
        var canvas = document.createElement('DIV');
        canvas.id = canvasId;
        document.getElementById('ads').appendChild(canvas);
    }

    var async = true;
    MATERIAL = m.start(async);
    MATERIAL.show();
});
</script>
<!--嵌入代码结束-->
</body>
</html>

<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="http://ecma.bdimg.com/public01/js/asp_loader.js"></script>
</head>
<body>

<!--嵌入代码开始-->
<div id="ads"></div>
<script>
var URL = location.href.replace('index.html', '%(app.js.path)s');
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

    m.start();
});
</script>
<!--嵌入代码结束-->

<button id="btn">更新物料</button>
<script type="text/javascript">
document.getElementById("btn").onclick = function(){
    ECMA_require(URL, function(m){
        var AD_CONFIG = m.get('AD_CONFIG');
        AD_CONFIG['head']['titletext'] = new Date();
        m.set('AD_CONFIG', AD_CONFIG);
        m.start();
    });
};
</script>

</body>
</html>

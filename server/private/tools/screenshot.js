// phantomjs，自动对widget存在的实例截屏

var webPage = require('webpage');
var fs = require('fs');
var page = webPage.create();

// 提取widget
var content = fs.read('../../db/widgets.json');
var widgets = JSON.parse(content);
var job = [];

// 记录所有的job
widgets.forEach(function (widget, index) {
    var name = widget.name;
    var className = widget.className;

    // 提取路径前缀
    var dirpath = widget.dirpath;
    var tmp = dirpath.replace(/\\/g, '/');
    tmp = tmp.slice(tmp.indexOf('/src/'));
    tmp += '/';

    // app为运行的服务器页面的url
    // img为存储截图的路径
    var app = 'http://localhost:8964' + tmp + name + '.app.html';
    var img = '../../../public/images/widgets/' + className + '.png';
    var configFile = '../lego-widgets' + tmp + name + '.config.js';

    // 记录job
    var config = '';
    config = fs.read(configFile);
    job.push({
        app: app,
        img: img,
        className: className,
        config: config
    });
});

function render (index) {
    if (index == job.length) {

        // 写widgets-example.json
        // 当widget的example不存在时才写
        var path = '../../db/widgets-example.json';
        var widgetsExample = {};
        var content = '';
        if (fs.exists(path)) {
            content = fs.read(path);
        }
        if (content) {
            widgetsExample = JSON.parse(content);
        }
        var keys = Object.keys(render.widgetsExample);
        keys.forEach(function (key, index) {
            widgetsExample[key] = widgetsExample[key] || [];
            if (!widgetsExample[key].length) {
                widgetsExample[key].push(render.widgetsExample[key]);
            }
        });
        content = JSON.stringify(widgetsExample);
        fs.write(path, content, 'w');

        // job完成，退出
        phantom.exit();
        return;
    }

    // 模拟浏览器渲染，截图
    var className = job[index].className;
    var img = job[index].img;
    var config = job[index].config;
    var app = job[index].app;
    page.open(app, function () {
        window.setTimeout(function () {
            page.render(img);
            render.widgetsExample[className] = [];
            render.widgetsExample[className] = {
                img: '/' + className + '.png',
                config: config
            };
            render(index + 1);
            console.log(img);
        }, 1000);
    });
}

render.widgetsExample = {};
render(0);
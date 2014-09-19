// native module
var resolve = require('path').resolve;

// third module
var router = require('koa-router');
var parse = require('co-body');
var fs = require('co-fs');

// local module
var render = require('../lib/render');
var app = require('../app');

// resolve the root directly
var root = resolve(__dirname, '../..');

// define some path 
var pwidgets = resolve(root, 'server/db/widgets.json');
var pwidgetsExample = resolve(root, 'server/db/widgets-example.json');
var pwidgetsSpec = resolve(root, '../AutoSpec/root/widget/spec');
var ponlineImpls = resolve(root, '../LegoSpider/base');

// route middleware
app.use(router(app));
app.get('/', index);
app.redirect('/widgets', '/');
app.get('/widgets/:widget', index);
app.all('/imageService', imageService);
app.all('/examplesService', examplesService);
app.all('/specService', specService);
app.all('/implsService', implsService);
app.all('/onlineImplsService', onlineImplsService);

// show index
function* index() {
    this.body = yield render('index');
}

// 提供widget图片服务
function* imageService() {
    var data = {};
    data.success = true;

    try {
        if (this.method == 'GET') {

            // 获取所有组件的图片
            var content = yield fs.readFile(pwidgetsExample, 'utf-8');
            var examples = {};
            if (content) {
                examples = JSON.parse(content);
            }
            var images = [];
            var keys = Object.keys(examples);
            keys.forEach(function (widget, index) {
                examples[widget].forEach(function (example, index) {
                    images.push({
                        'src': example.img,
                        'rcv_url': '/widgets/' + widget,
                        'widget': widget
                    });
                });
            });
            data.content = images || '';
        }
    } catch(err) {
        if (err.code === 'ENOENT') {

            // 处理文件操作异常
            data.success = false;
            data.content = '服务器操作失败';
            return;
        };
        throw err;
    } finally {

        // response
        this.body = data;
    }
}

// 提供widget examples服务
function* examplesService() {
    var data = {};
    data.success = true;

    try {
        if (this.method == 'GET') {

            // 获取widget的样例
            var widgetName = this.query.widgetName;
            var content = yield fs.readFile(pwidgetsExample, 'utf-8');
            var examples = {};
            if (content) {
                examples = JSON.parse(content);
            }
            var examples = examples[widgetName];
            data.content = examples || '';
        }
        else if (this.method == 'POST') {

            // 添加新的样例
            var post = yield parse(this);
            var content = yield fs.readFile(pwidgetsExample, 'utf-8');
            var examples = {};
            if (content) {
                examples = JSON.parse(content);
            }
            var widgetName = post.widgetName;
            var example = {
                img: post.img,
                config: post.config
            }
            examples[widgetName] = examples[widgetName] || [];
            examples[widgetName].push(example);
            content = JSON.stringify(examples);
            yield fs.writeFile(pwidgetsExample, content, 'utf-8');
        }
        else if (this.method == 'DELETE') {

            // 删除样例
            var query = this.query;
            var content = yield fs.readFile(pwidgetsExample, 'utf-8');
            var examples = {};
            if (content) {
                examples = JSON.parse(content);
            }
            var widgetName = query.widgetName;
            examples[widgetName] = examples[widgetName] || [];
            examples[widgetName].splice(query.index, 1);
            content = JSON.stringify(examples);
            yield fs.writeFile(pwidgetsExample, content, 'utf-8');
        }
    } catch(err) {
        if (err.code === 'ENOENT') {

            // 处理文件操作异常
            data.success = false;
            data.content = '服务器操作失败';
            return;
        };
        throw err;
    } finally {

        // response
        this.body = data;
    }
}

// 提供widget spec服务
function* specService() {
    var data = {};
    data.success = true;

    try {
        if (this.method == 'GET') {

            // 获取spec数据
            var widgetName = this.query.widgetName;
            var fileName = resolve(pwidgetsSpec, widgetName + '.spec.json');
            var exists = yield fs.exists(fileName);
            var spec = '';
            if (exists) {
                spec = yield fs.readFile(fileName, 'utf-8');
            }
            data.content = spec || '';
        }
        else if (this.method == 'POST') {

            // 增加/更新spec文件
            var post = yield parse(this);
            var fileName = resolve(pwidgetsSpec, post.widgetName + '.spec.json');
            yield fs.writeFile(fileName, post.spec, 'utf-8');
        }
    } catch(err) {
        if (err.code === 'ENOENT') {

            // 处理文件操作异常
            data.success = false;
            data.content = '服务器操作失败';
            return;
        };
        throw err;
    } finally {

        // response
        this.body = data;
    }
}

// 提供widget impls服务
function* implsService() {
    var data = {};
    data.success = true;

    try {
        if (this.method == 'GET') {

            // 获取impls数据
            var widgetName = this.query.widgetName;
            var content = yield fs.readFile(pwidgets, 'utf-8');
            var impls;
            if (content) {
                widgets = JSON.parse(content);
                widgets.forEach(function (widget, index) {
                    if (widget.className == widgetName) {
                        impls = widget.impls;
                        return false;
                    }
                });
                var funs = impls.map(function (implName, index) {
                    var file = resolve(ponlineImpls, implName + '.json');
                    return function* () {
                        var res =  yield fs.exists(file);
                        return res;
                    };
                });
                var flagArr = yield funs;
                var tmp = [];
                impls.forEach(function (implName, index) {
                    tmp.push({
                        'implName': implName,
                        'flag': flagArr[index]
                    });
                });
                impls = tmp;
            }
            data.content = impls || [];
        }
    } catch(err) {
        if (err.code === 'ENOENT') {

            // 处理文件操作异常
            data.success = false;
            data.content = '服务器操作失败';
            return;
        };
        throw err;
    } finally {

        // response
        this.body = data;
    }
}

// 提供impl对应的在线物料服务
function* onlineImplsService() {
    var data = {};
    data.success = true;

    try {
        if (this.method == 'GET') {

            // 获取impl对应的在线物料
            // 获取spec数据
            var implName = this.query.implName;
            var fileName = resolve(ponlineImpls, implName + '.json');
            var exists = yield fs.exists(fileName);
            if (exists) {
                var content = yield fs.readFile(fileName, 'utf-8');
                var onlineImpls = [];
                var obj = JSON.parse(content);
                var keys = Object.keys(obj);
                keys.forEach(function (key, index) {
                    var impl = {
                        'id': key,
                        'img': obj[key].screenshot,
                        'url': 'http://lego-off.baidu.com/#/lego/template/list~status=&keyword=&creator=&templateId=' + key + '&appId=&tags=[]'
                    }
                    onlineImpls.push(impl);
                });
            }
            data.content = onlineImpls || '';
        }
    } catch(err) {
        if (err.code === 'ENOENT') {

            // 处理文件操作异常
            data.success = false;
            data.content = '服务器操作失败';
            return;
        };
        throw err;
    } finally {

        // response
        this.body = data;
    }   
}








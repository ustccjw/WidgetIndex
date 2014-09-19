// native mudule
var path = require('path');
var resolve = path.resolve;
var cp = require('child_process');

// third module
var fs = require('co-fs');
var co = require('co');

// define some path
var root = resolve(__dirname, '../../../');
var dirPath = resolve(root, 'server/private/lego-widgets/src/ad/widget');
var dirPath2 = resolve(root, 'server/private/lego-widgets/src/ad/impl');
var db = resolve(root, 'server/db/widgets.json');
var legoPath = resolve(root, 'server/private/lego-widgets');

// 遍历得到所有的widget
function* transverse (dirpath) {
    var files = yield fs.readdir(dirpath);

    // 返回所有文件夹下的所有文件的处理函数
    var funs = files.map(function (file, index) {
        return function* () {
            var stats = yield fs.stat(resolve(dirpath, file));
            if(!stats.isDirectory()) {

                // 文件
                if (file.indexOf('.') == file.lastIndexOf('.') && path.extname(file) == '.js') {

                    // XXX.js
                    var file1 = resolve(dirpath, file.replace('.js', '.less'));
                    var file2 = resolve(dirpath, file.replace('.js', '.config.js'));
                    var file3 = resolve(dirpath, file.replace('.js', '.html'));
                    var flags = yield [fs.exists(file1), fs.exists(file2), fs.exists(file3)];

                    // 同时存在xxx.less,xxx.config.js,xxx.html
                    if (!(flags[0] && flags[1] && flags[2])) {
                        return;
                    }

                    // 获取widget的相关信息
                    var data = yield fs.readFile(resolve(dirpath, file), 'utf-8');
                    var className = data.match(/goog\.provide\(\'(.+)\'\);/)[1];
                    var widget = {
                        'className': className,
                        'dirpath': dirpath,
                        'name': file.slice(0, -3),
                        'impls': []
                    };
                    transverse.widgets.push(widget);
                }
            } else {

                // 文件夹
                if(file.indexOf('.') != 0 && file != 'imageplus' && file != 'baike') {

                    // 并且不是隐藏文件夹，需要递归遍历处理
                    yield transverse(resolve(dirpath, file));
                }
            }
        }
    });
    yield funs;
}

// 遍历所有的impls，反向记录widget引用的impls
function* transverse2 (dirpath) {
     var files = yield fs.readdir(dirpath);

     // 返回所有文件夹下的所有文件的处理函数
     var funs = files.map(function (file, index) {
        return function* () {
            var stats = yield fs.stat(resolve(dirpath, file));
            if(!stats.isDirectory()) {

                // 文件
                if (file.indexOf('.') == file.lastIndexOf('.') && path.extname(file) == '.js') {

                    // XXX.js
                    var data = yield fs.readFile(resolve(dirpath, file), 'utf-8');
                    var res = data.match(/goog\.provide\(\'(.+)\'\);/)
                    if (res) {

                        // 提取impl
                        var implName = res[1];
                        var widgets = data.match(/goog\.require\(\'(.+)\'\);/g);
                        if (widgets) {

                            // 提取引用的widget
                            widgets = widgets.map(function (widget, index) {

                                // 全局match得到的是所有匹配的数组，所以还要提取widget
                                var first = widget.indexOf('\'');
                                var last = widget.lastIndexOf('\'');
                                if(first != -1 && last != -1) {
                                    return widget.slice(first + 1, last);
                                }
                            });

                            // 将impl记录到所有引用的widget中
                            widgets.forEach(function (widget, index) {
                                if (widget in transverse.hash) {
                                    transverse.widgets[transverse.hash[widget]].impls.push(implName);
                                }
                            });
                        }
                    }
                }
            }
            else {

                // 文件夹
                if(file.indexOf('.') != 0) {

                    // 并且不是隐藏文件夹，需要递归遍历处理
                    yield transverse2(resolve(dirpath, file));
                }
            }
        }
    });
    yield funs;
}

// 先更新lego-widgets，再遍历组件
cp.exec('cd ' + legoPath + ' & svn update', function(err, stdout, stderr) {
    if (err) {
        console.log(err);
    }

    co(function* (dirpath) {

        // 遍历widgets
        transverse.widgets = [];
        yield transverse(dirpath);
        transverse.hash = {}
        transverse.widgets.forEach(function (widget, index) {
            transverse.hash[widget.className] = index;
        });

        // 遍历impls
        yield transverse2(dirPath2);

        // 按照被引用的次数来对widget排序
        transverse.widgets = transverse.widgets.sort(function (obj1, obj2) {
            return obj2.impls.length - obj1.impls.length;
        });

        // 写入widgets.json中
        yield fs.writeFile(db, JSON.stringify(transverse.widgets), 'utf-8');
        
    })(dirPath, function (err, result) {
        console.log(transverse.widgets.length);
        // transverse.widgets.forEach(function (widget, index) {
        //     if (widget.impls.length > 20) {
        //         console.log(widget.impls.length);
        //     }
        // });
    });
});


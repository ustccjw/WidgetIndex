/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * build/base.js ~ 2013/08/11 22:00:15
 * @author liyubei(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
var Deferred = require('./Deferred');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var colors = require('colors');
var PNG = require('pngjs').PNG;

/**
 * 我们可以通过这个函数计算出*.app.html依赖的js列表。
 * 后续如果有js的变动，就可以很快的知道影响到了哪些*.app.html，然后
 * 只针对影响到*.app.html进行回归测试即可.
 * @param {Array.<string>} inputs 需要计算的namespace.
 * @return {Array.<string>}
 */
function calcdeps(inputs) {
    var deps = JSON.parse(fs.readFileSync('src/deps.json'));
    var depsHash = {};
    for(var key in deps) {
        var provides = deps[key]['provide'];
        provides.forEach(function (provide) {
            if (depsHash[provide]) {
                throw new Error('Duplicate provide (' + provide + ') in (' +
                    key + ', ' + depsHash[provide] + ')');
            }
            depsHash[provide] = key;
        });
    }

    function indexOf(array, item) {
        for(var i = 0; i < array.length; i ++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    }

    var resultList = [];
    var seenList = [];
    function resolveDeps(require) {
        if (!depsHash[require]) {
            throw new Error('Missing provide for (' + require + ')');
        }
        var key = depsHash[require];
        var dep = deps[key];
        if (indexOf(seenList, key) == -1) {
            seenList.push(key);
            dep.require.forEach(function (ns){
                resolveDeps(ns);
            });
            resultList.push(key);
            var content = fs.readFileSync('src/' + key).toString('utf-8');
            resultList = resultList.concat(_find_required_html(content));
            resultList = resultList.concat(_find_required_less(content));
        }
    }

    inputs.forEach(function (ns){
        resolveDeps(ns);
    });

    return resultList;
}

/**
 * 计算一个js文件依赖的html文件
 *
 * @param {string} content 文件内容
 * @return {Array.<string>} html文件列表
 */
function _find_required_html(content) {
    var pattern = /goog\.include\(\s*[\'"](.+\.html)[\'"]\s*\)/gi;
    var inputs = [];
    var match;
    while ((match = pattern.exec(content))) {
        inputs.push(match[1]);
    }
    return inputs;
}

/**
 * 计算一个js文件依赖的less文件
 *
 * @param {string} content 文件内容
 * @return {Array.<string>} less文件列表
 */
function _find_required_less(content) {
    var pattern = /goog\.include\(\s*[\'"](.+\.less)[\'"]\s*\)/gi;
    var inputs = [];
    var match;
    while ((match = pattern.exec(content))) {
        inputs.push(match[1]);
    }
    return inputs;
}

function _get_cfg(file) {
    var rv = {};
    var cfgs = fs.readFileSync(file).toString('utf-8').trim().split(/\r?\n/g);
    for(var i = 0; i < cfgs.length; i ++) {
        var line = cfgs[i];
        if (line.trim().length <= 0) {
            continue;
        }
        if (line.indexOf('#') === 0) {
            continue;
        }
        rv[cfgs[i].replace(/\//g, path.sep)] = true;
    }
    return rv;
}

/**
 * 依据配置文件生成忽略规则，支持忽略文件夹和通配符"*"
 *
 * @param {string} file 配置文件地址
 * @return {function():boolean} 是否忽略的判断函数
 */
function get_ignore_func(file) {
    var rv = {};
    var cfgs = fs.readFileSync(file).toString('utf-8').trim().split(/\r?\n/g);
    var regStr = [];
    for(var i = 0; i < cfgs.length; i ++) {
        var line = cfgs[i];
        if (line.trim().length <= 0) {
            continue;
        }
        if (line.indexOf('#') === 0) {
            continue;
        }
        // 拼接正则，类似
        // /(src/test.app.html|src/ad/widget/imageplus)/
        regStr.push(
            cfgs[i].replace(/\//g, path.sep)
                .replace(/\\/g, '\\\\')
                .replace(/\//g, '\\\/')
                .replace(/\*/g, '.*')
        );
    }

    var regExp = new RegExp('(' + regStr.join('|') + ')');
    return function (input) {
        return input.match(regExp);
    };
}

/**
 * @param {Array.<string>} pool 文件列表
 * @param {string} ignoreFile 要过滤的文件列表
 * @return {Array.<string>}
 */
function ignore(pool, ignoreFile) {
    var ignoreFileRule = get_ignore_func(ignoreFile);
    return pool.filter(function(item) {
        if (ignoreFileRule(item.file)) {
            console.log(('[SKIP]:' + item.file).yellow);
            return false;
        }
        else {
            return true;
        }
    });
}

function get_chk_anchor_black_list() {
    return _get_cfg('test/benchmark/chk_anchor.blacklist.cfg');
}

function walk(parent, callback) {
    fs.readdirSync(parent).forEach(function(file){
        file = path.join(parent, file);
        var stat = fs.statSync(file);
        if (stat.isDirectory()) {
            walk(file, callback);
        } else if (stat.isFile()) {
            callback(file);
        }
    });
}

function gen_app_deps() {
    var pattern = /goog\.require\(\s*[\'"](.+)[\'"]\s*\)/gi;
    var lessPattern = /goog\.include\(\s*[\'"](.+\.less)[\'"]\s*\)/gi;

    var ignoreFile = get_ignore_func('build/ignore/app_test.cfg');
    var appDeps = {};
    walk(path.join('src', 'ad'), function(file) {
        if (file.match(/\.app\.html$/)) {
            if (ignoreFile(file)) {
                return;
            }
            pattern.lastIndex = 0;
            var content = fs.readFileSync(file).toString('utf-8');
            var inputs = [];
            var match;
            while ((match = pattern.exec(content))) {
                inputs.push(match[1]);
            }
            // console.log(file + ' requires (' + inputs.join(', ') + ')');
            file = file.replace(/\\/g, '/');
            var config = file.replace('.app.html', '.config.js').replace(/^src\//, '');
            appDeps[file] = [config].concat(calcdeps(inputs));
        }
    });

    fs.writeFileSync('src/app.deps.json', JSON.stringify(appDeps, null, 4));
}

/**
 * 页面截图.
 */
function take_screenshot(url, output) {
    var cmd = ['phantomjs',
        // (argv.enable_network ? '--proxy http://0.0.0.0:1111' : ''),
        '--proxy', 'http://0.0.0.0:1111',
        'build/phantomjs/app_render.js', url, output].join(' ');
    return run_command(cmd, 100);
}

function run_command(cmd, opt_delay) {
    var def = new Deferred();
    var child = exec(cmd, function(error, stdout, stderr){
        if (error) {
            def.reject(new Error(error.toString()));
        } else {
            if (opt_delay) {
                setTimeout(function(){
                    def.resolve(stdout);
                }, opt_delay);
            } else {
                def.resolve(stdout);
            }
        }
    });

    return def;
}

function parse_png_file(pngFile) {
    var def = new Deferred();
    var fs = require('fs');
    if (!fs.existsSync(pngFile)) {
        process.nextTick(function(){
            def.reject(('[FAIL]:No such file or directory (' + pngFile + ')').red);
        });
        return def;
    }

    fs.createReadStream(pngFile)
        .pipe(new PNG({filterType: 4}))
        .on('error', function(){
            def.reject('[FAIL]:Parse ' + pngFile);
        })
        .on('parsed', function(){
            def.resolve(this);
        });
    return def;
}

/**
 * 逐像素的比较
 * @param {string} actualPng 新的文件，比如server side生成的png文件.
 * @param {string} basePng 基准文件，比如*.app.html生成的png文件.
 * @param {number} tolerance 可以忍受的误差范围.
 * @see {ImageDiff.cpp}
 */
function png_diff(actualPng, basePng, tolerance) {
    var def = new Deferred();
    Deferred.all(parse_png_file(actualPng), parse_png_file(basePng))
    .then(function(actual, base){
        if (actual.width != base.width ||
            actual.height != base.height) {
            // 宽高不一样，直接FAIL.
            def.reject(('[FAIL]:' + actualPng + ';(' +
                (actual.width + 'x' + actual.height) + '!=' +
                (base.width + 'x' + base.height) + ')').red);
            return;
        }

        var errorCount = 0;
        var width = actual.width;
        var height = actual.height;
        for (var y = 0; y < height; y ++) {
            for (var x = 0; x < width; x ++) {
                var idx = (width * y + x) << 2;

                var actualPixel = [
                    actual.data[idx],       // R
                    actual.data[idx + 1],   // G
                    actual.data[idx + 2],   // B
                    actual.data[idx + 3]    // A
                ];

                var basePixel = [
                    base.data[idx],         // R
                    base.data[idx + 1],     // G
                    base.data[idx + 2],     // B
                    base.data[idx + 3]      // A
                ];

                var red = (actualPixel[0] - basePixel[0]) * 1.0 / Math.max(255 - basePixel[0], basePixel[0]);
                var green = (actualPixel[1] - basePixel[1]) * 1.0 / Math.max(255 - basePixel[1], basePixel[1]);
                var blue = (actualPixel[2] - basePixel[2]) * 1.0 / Math.max(255 - basePixel[2], basePixel[2]);
                var alpha = (actualPixel[3] - basePixel[3]) * 1.0 / Math.max(255 - basePixel[3], basePixel[3]);
                var distance = Math.sqrt(red * red + green * green + blue * blue + alpha * alpha) / 2.0;

                if (distance >= (1 / 255)) {
                    errorCount ++;
                    actual.data[idx] = 255;
                    actual.data[idx + 1] = 0;
                    actual.data[idx + 2] = 0;
                } else {
                    actual.data[idx] = basePixel[0];
                    actual.data[idx + 1] = basePixel[1];
                    actual.data[idx + 2] = basePixel[2];
                    actual.data[idx + 3] = basePixel[3] * 0.5;
                }
            }
        }

        if (errorCount > 0) {
            var difference = (100 * errorCount) / (width * height);
            if (difference <= tolerance) {
                def.resolve(("[PASS]:" + actualPng + ";difference = (" + difference.toFixed(2) + "%)").green);
            } else {
                var diffImage = actualPng.replace(/\.png$/, '.diff.png');
                var stream = fs.createWriteStream(diffImage);
                actual.on('end', function(){
                    def.reject(("[FAIL]:" + actualPng + ";difference = (" + difference.toFixed(2) + "%), diff image = (" + diffImage + ")").red);
                });
                actual.pack().pipe(stream);
            }
        } else {
            def.resolve(("[PASS]:" + actualPng).green);
        }
    }, function(){
        def.reject('Parse png failed');
    });
    return def;
}

function run_page_diff(url, file) {
    var def = new Deferred();

    // ant ad.deploy -Ddir=src/ad/widget/zhidao -Dname=micro_brand
    var dir = path.dirname(file);
    var name = path.basename(file).replace('.app.html', '');

    function errorHandler() {
        def.reject.apply(def, arguments);
    }

    // 生成target/output/${name}的内容
    console.log('[LOCK]:' + file);
    var cmd = ['ant', 'ad.deploy', '-Ddir=' + dir, '-Dname=' + name].join(' ');
    run_command(cmd).then(function(){
        console.log('      [PASS]:ant ad.deploy');
        // 生成server side html
        var jsFileName = null;
        fs.readdirSync('target/output/' + name).forEach(function(file){
            if (/\.js$/.test(file) &&
                file.indexOf(name + '.app-') === 0) {
                jsFileName = file;
            }
        });
        var cmd = ['node', 'build/rhino/env.js', 'target/output/' + name + '/' + jsFileName].join(' ');
        run_command(cmd).then(function(stdout){
            console.log('      [PASS]:node build/rhino/env.js');
            fs.writeFileSync('target/output/' + name + '/s.html', stdout);

            // 生成base.png
            // 生成actual.png
            var baseUrl = 'target/output/' + name + '/index.html';
            var basePng = 'target/output/' + name + '/base.png';
            var actualUrl = 'target/output/' + name + '/s.html';
            var actualPng = 'target/output/' + name + '/actual.png';
            Deferred.all(
                take_screenshot(baseUrl, basePng),
                take_screenshot(actualUrl, actualPng)
            ).then(function(){
                console.log('      [PASS]:take base & actual screenshot');
                // 生成diff.png
                png_diff(actualPng, basePng, 0).then(function(){
                    def.resolve.apply(def, arguments);
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);

    return def;
}

function run_chk_class(item) {
    var url = item.url;
    var file = item.file;
    var def = new Deferred();

    var cmd = ['phantomjs',
        '--disk-cache', 'no',
        '--proxy', 'http://0.0.0.0:1111',
        'build/phantomjs/chk_class.js', url
    ].join(' ');
    var child = exec(cmd, function(error, stdout, stderr) {
        if (error) {
            def.reject(new Error(file.red + '\n' + error.toString() + '\n' + stdout.yellow));
        } else {
            var output = JSON.parse(stdout);
            output.file = file;
            def.resolve(output);
        }
    });

    return def;
}

var chkAnchorBlackList = get_chk_anchor_black_list();
function run_chk_anchor(url, file) {
    var def = new Deferred();
    if (appBlackList[file] || chkAnchorBlackList[file] || /\/landmark|siva\//.test(file)) {
        process.nextTick(function(){
            console.log(('[SKIP]:' + file).yellow);
            def.resolve();
        });
        return def;
    }

    var cmd = ['phantomjs',
        '--disk-cache', 'no',
        '--proxy', 'http://0.0.0.0:1111',
        'build/phantomjs/chk_anchor.js', url
    ].join(' ');
    var child = exec(cmd, function(error, stdout, stderr) {
        if (error) {
            def.reject(new Error(file.red + '\n' + error.toString() + '\n' + stdout.yellow));
        } else {
            var output = JSON.parse(stdout);
            output.file = file;
            def.resolve(output);
        }
    });

    return def;
}

function run_chk_dispose(item) {
    var url = item.url;
    var file = item.file;

    var def = new Deferred();
    var cmd = ['phantomjs',
        '--disk-cache', 'no',
        '--proxy', 'http://0.0.0.0:1111',
        'build/phantomjs/chk_dispose.js', url
    ].join(' ');
    var child = exec(cmd, function(error, stdout, stderr) {
        if (error) {
            def.reject(new Error(file.red + '\n' + error.toString() + '\n' + stdout.yellow));
        } else {
            var output = {};
            try {
                output = JSON.parse(stdout);
            }
            catch(e) {
                output = {
                    'error': e.toString()
                }
            }
            output.file = file;
            def.resolve(output);
        }
    });

    return def;
}

function run_test_case(item, set_benchmark) {
    var url = item.url;
    var file = item.file;

    var def = new Deferred();
    var cmd = ['phantomjs', '--proxy', 'http://0.0.0.0:1111', 'build/phantomjs/app_test.js', url].join(' ');
    var child = exec(cmd, function(error, stdout, stderr) {
        if (error) {
            def.reject(new Error(file.red + '\n' + error.toString() + '\n' + stdout.yellow));
        } else {
            var output = JSON.parse(stdout);
            stdout = output.body.replace(/\r\n/g, '\n').trim();
            var globals = output.globals;

            var chunks = file.split(/[\/\\]/g);
            chunks.shift();
            chunks = ['test', 'benchmark'].concat(chunks);
            var expectedFile = path.join.apply(null, chunks);
            if (set_benchmark) {
                if (!fs.existsSync(path.dirname(expectedFile))) {
                    require('mkdirp').sync(path.dirname(expectedFile));
                }
                fs.writeFileSync(expectedFile, stdout);
                def.resolve(expectedFile);
            } else {
                if (!fs.existsSync(expectedFile)) {
                    def.reject(new Error("No such file or directory [" + expectedFile + "]"));
                    return;
                }
                var expected = fs.readFileSync(expectedFile).toString('utf-8').replace(/\r\n/g, '\n').trim();
                if (expected != stdout) {
                    var diff = [];
                    require('diff').diffLines(expected, stdout).forEach(function(changeset){
                        if (changeset.removed) {
                            diff.push('- ' + changeset.value.trim());
                        } else if (changeset.added) {
                            diff.push('+ ' + changeset.value.trim());
                        }
                    });
                    def.reject(new Error(file.red + '\n' + diff.join('\n')));
                } else {
                    def.resolve(expectedFile);
                }
            }
        }
    });

    return def;
}

var argv = require('optimist').argv;
var wsPrefix = process.env.WEBSERVER_PREFIX || 'http://localhost:8964/';
function get_task_pool() {
    var pool = [];
    if (argv.url && argv.url != "${url}") {
        var url = argv.url;
        pool.push({file: String(url).replace(/https?:\/\/[^\/]+\//g, ''), url: url});
    } else {
        if (argv._ && argv._.length) {
            argv._.forEach(function(file){
                var stat = fs.statSync(file);
                if (stat.isDirectory()) {
                    walk(file, function(item){
                        if (item.match(/\.app\.html$/)) {
                            var url = wsPrefix + item.replace(/\\/g, '/');
                            pool.push({file: item, url: url});
                        }
                    });
                } else if (stat.isFile()) {
                    if (file.match(/\.app\.html$/)) {
                        var url = wsPrefix + file.replace(/\\/g, '/');
                        pool.push({file: file, url: url});
                    }
                }
            });
        } else {
            var path = require('path');
            walk(path.join("src", "ad"), function(file){
                if (file.match(/\.app\.html$/)) {
                    var url = wsPrefix + file.replace(/\\/g, '/');
                    pool.push({file: file, url: url});
                }
            });
        }
    }

    return pool;
}

/**
 * 获取所有的模板
 */
function get_template_pool() {
    var pool = get_file_pool(function(item){
        return !!item.match(/\.html$/);
    }).filter(function(item){
        return item.file.indexOf('.app.html') === -1;
    });

    return pool;
}

/**
 * 扫描src下面的文件，按照filter过滤出需要的文件
 * @param {function} filter 过滤器
 * @return {Array.<string>}
 */
function get_file_pool(filter){
    var path = require('path');
    var pool = [];

    if (argv._ && argv._.length) {
        argv._.forEach(function(file){
            var stat = fs.statSync(file);
            if (stat.isDirectory()) {
                walk(file, function(item){
                    if (filter(item)) {
                        pool.push({file: item});
                    }
                });
            } else if (stat.isFile()) {
                if (filter(file)) {
                    pool.push({file: file});
                }
            }
        });
    } else {
        var path = require('path');
        walk(path.join("src", "ad"), function(file){
            if (filter(file)) {
                pool.push({file: file});
            }
        });
    }

    return pool;
};

/**
 * 检查文件中是否存在单引号
 * @param {Object} item 需要检查的文件.
 */
function run_chk_single_quote(item) {
    var file = item.file;
    var def = new Deferred();
    process.nextTick(function(){
        var fs = require('fs');
        var content = fs.readFileSync(file, 'utf-8');
        if (content.indexOf('\'') != -1) {
            def.reject(file);
        }
        else {
            def.resolve();
        }
    });

    return def;
};

/**
 * @param {Object} item 检查模板的内容是否符合规范.
 */
function run_chk_template(item) {
    var file = item.file;
    var def = new Deferred();
    process.nextTick(function(){
        var fs = require('fs');
        var html = fs.readFileSync(file, 'utf-8');
        // 暂时忽略之
        // href="{{#more_rcv_url}}{{{more_rcv_url}}}{{/more_rcv_url}}{{^more_rcv_url}}{{{rcv_url}}}{{/more_rcv_url}}"
        // href="{{rcv_url}}{{rcv_params}}"
        // href="{{rcv_url}}#hash"
        var pattern = /href=(['"])({{[^{}]+}})\1/g;
        var invalidPattern = [];
        var match = null;
        while (match = pattern.exec(html)) {
            invalidPattern.push(match[0]);
        }
        if (invalidPattern.length) {
            def.reject(invalidPattern);
        }
        else {
            def.resolve();
        }
    });

    return def;
}

/**
 * 检查文件的编码是否是utf-8
 * @param {Object} item 检查模板的内容是否有BOM.
 */
function run_chk_bom(item) {
    var file = item.file;
    var def = new Deferred();
    process.nextTick(function(){
        var fs = require('fs');
        var isUtf8 = require('is-utf8');
        var rawContent = fs.readFileSync(file);
        if (!isUtf8(rawContent)) {
            def.reject(new Error('Invalid encoding for [' + file + ']'));
            return;
        }
        var content = rawContent.toString('utf-8');
        if (content.charCodeAt(0) == 0xFEFF) {
            def.reject(file);
        }
        else {
            def.resolve();
        }
    });

    return def;
}

/**
 * @param {string} file 修复含有BOM的文件.
 */
function run_fix_bom(file) {
    var def = new Deferred();
    process.nextTick(function(){
        var fs = require('fs');
        var content = fs.readFileSync(file, 'utf-8');
        if (content.charCodeAt(0) != 0xFEFF) {
            def.reject(file);
        }
        else {
            fs.writeFileSync(file, content.substring(1));
            def.resolve();
        }
    });

    return def;
}

/**
 * 猜测当前目录使用了哪个版本控制系统
 *
 * @return {string} svn/git/hg/cvs, 如果检测不到返回空字符串
 */
function guess_vcs_name() {
    var svnDef = new Deferred();
    exec('svn info', function (err, stdout, stderr) {
        if (err) {
            if (err.code === 5) {
                console.log('Your working copy is not compatible with your current Subversion,please run `svn upgrade`!\n');
            }
            svnDef.resolve('');
            return;
        }

        svnDef.resolve('svn');
    });

    return svnDef
        .then(function (cvsName) {
            if (cvsName) {
                return cvsName;
            }

            var gitDef = new Deferred();
            exec(
                'git rev-parse --is-inside-work-tree',
                function (err, stdout, stderr) {
                    if (err) {
                        gitDef.resolve('');
                        return;
                    }

                    gitDef.resolve('git');
                }
            );

            return gitDef;
        })
        .then(function (cvsName) {
            if (cvsName) {
                return cvsName;
            }

            var hgDef = new Deferred();
            exec(
                'hg root',
                function (err, stdout) {
                    if (err) {
                        hgDef.resolve('');
                        return;
                    }

                    hgDef.resolve('hg');
                }
            );

            return hgDef;
        })
        .then(function (cvsName) {
            if (cvsName) {
                return cvsName;
            }

            var cvsDef = new Deferred();
            exec(
                'cvs status',
                function (err, stdout) {
                    if (err) {
                        cvsDef.resolve('');
                        return;
                    }

                    cvsDef.resolve('cvs');
                }
            );

            return cvsDef;
        });
};

/**
 * 将文件添加进版本控制系统
 *
 * @param {string} vcsName 版本控制系统的名字
 * @param {string} file 文件路径
 */
function add_into_vcs(vcsName, file) {
    var addDef = new Deferred();
    if (!file) {
        addDef.reject(new Error('No file to be add.'));
        return addDef;
    }

    exec(
        vcsName + ' add ' + file,
        function (err, stdout) {
            if (err) {
                addDef.reject(err);
                return;
            }

            addDef.resolve(file);
        }
    );

    return addDef;
}

/**
 * 将多个文件添加进版本控制系统
 *
 * @param {string} vcsName 版本控制系统的名字
 * @param {Array.<string>} files 文件路径
 */
function add_files_into_vcs(vcsName, files) {
    var file = files.shift();
    var promise = add_into_vcs(vcsName, file)
        .fail(function (err) {
            console.log(('[ADD FAILED]:' + file).red);
        })
        .done(function () {
            console.log(('[ADD SUCCESS]:' + file).green);
            if (files.length) {
                return add_files_into_vcs(vcsName, files);
            }
        });

    return promise;
}

/**
 * 运行所有的任务
 * @param {Array.<*>} pool 任务的集合.
 * @param {Function} handler 处理函数.
 * @param {Function=} opt_outputHandler 处理stdout的数据，如果没有问题，返回true.
 */
function task_runner(pool, handler, opt_outputHandler) {
    var status = new Deferred();
    var failure = [];
    var activeCount = 0;
    var outputHandler = opt_outputHandler || function(){ return true; }

    function startTask() {
        if (!pool.length) {
            if (activeCount <= 0) {
                if (failure.length) {
                    status.reject(failure);
                }
                else {
                    status.resolve();
                }
            }
            return;
        }

        var item = pool.pop();
        var def = handler(item);
        activeCount ++;
        def.ensure(function(){
            activeCount --;
        });
        def.done(function(output){
            var rv = outputHandler(output);
            if (rv === true) {
                console.log(('[PASS]:' + item.file).green);
            }
            else {
                console.log(('[FAIL]:' + output.file).red);
                var message = {file: output.file};
                if (typeof rv === 'object') {
                      message = require('underscore').extend(message, rv);
                }
                failure.push(message);
            }
            startTask();
        });
        def.fail(function(error){
            console.log(('[FAIL]:' + item.file).red);
            failure.push({file: item.file, error: error.toString()})
            startTask();
        });
    }

    process.nextTick(function(){
        var os = require('os');
        var cpus = Math.min(os.cpus().length * 2, pool.length);
        if (os.type() === 'Windows_NT' || os.type() === 'Darwin') {
            cpus = 2;
        }
        for(var i = 0; i < cpus; i ++) {
            startTask();
        }
    });

    return status;
}



exports.walk = walk;
exports.gen_app_deps = gen_app_deps;
exports.run_test_case = run_test_case;
exports.run_chk_class = run_chk_class;
exports.run_chk_anchor = run_chk_anchor;
exports.run_chk_dispose = run_chk_dispose;
exports.run_chk_template = run_chk_template;
exports.run_chk_bom = run_chk_bom;
exports.run_fix_bom = run_fix_bom;
exports.run_chk_single_quote = run_chk_single_quote;
exports.run_page_diff = run_page_diff;
exports.get_task_pool = get_task_pool;
exports.get_template_pool = get_template_pool;
exports.get_file_pool = get_file_pool;
exports.ignore = ignore;
exports.png_diff = png_diff;
exports.guess_vcs_name = guess_vcs_name;
exports.task_runner = task_runner;
exports.add_files_into_vcs = add_files_into_vcs;
exports.get_ignore_func = get_ignore_func;






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

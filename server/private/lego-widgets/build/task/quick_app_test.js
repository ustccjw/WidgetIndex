/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * build/quick_app_test.js ~ 2013/08/12 13:45:22
 * @author liyubei(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 根据git diff或是svn st的结果计算影响到的文件，加快回归的效率
 **/

var http = require('http');
var util = require('util');
var exec = require('child_process').exec;
var colors = require('colors');
var argv = require('optimist').argv;
var base = require('../base');
var Deferred = require('../Deferred');
var chkTangramApi = require('./chk_tangram_api');

if (argv.help) {
    util.error('---------------');
    util.error('node build/task/app_test.js');
    util.error('---------------');
    util.error('');
    util.error('Example:');
    util.error('    1. `node build/task/app_test.js`');
    util.error('    2. use git and specify commit range');
    util.error('       `node build/task/app_test.js --commit=4bb37556eca167575a70a85dabdd2391db03d197..5b7ce06e6f1c39006e249db5f6a4ea27d17a974b`');
    util.error('    3. specifiy how many phantom thread to be used.');
    util.error('       `node build/task/app_test.js --cpu=1`');

    process.exit(1);
}

base.guess_vcs_name()
    .done(function (vcsName) {
        var promise = vcsName === 'git'
            ? getGitEffectedPath()
            : getSvnEffectedPath();

        promise
            .done(function (affectedPath){
                testApps(affectedPath, vcsName);
            })
            .fail(function (error) {
                util.error(error);
            });
    });

/**
 * 获取git repo里面受影响的文件
 *
 * @return {Object} promise
 */
function getGitEffectedPath() {
    var def = new Deferred();
    var commitRange = argv.commit || argv.commits;
    var gitCommand = commitRange
        ? ('git diff --stat ' + commitRange)
        : 'git status -s';
    exec(gitCommand, function (error, stdout, stderr) {
        if (error) {
            def.reject(error);
            return;
        }

        if (stderr) {
            def.reject(stderr);
            return;
        }

        stdout = stdout.toString()
            .replace(/\\/g, '/')
            .split(/\r?\n/);

        def.resolve(parseGITPath(stdout, commitRange));
    });

    return def.promise;
}

/**
 * 解析改动的git路径
 *
 * @param {Array.<string>} data console的输出.
 * @param {string} commitRange 指定的commit范围
 * @return {Array.<string>} 受影响的路径
 */
function parseGITPath(data, commitRange) {
    if (!data || !data.length) {
        return;
    }

    var fileReg = commitRange
        ? /^([^\|]+)\|/
        : /(?:M|A) +([^ ]+)/;
    var affectedPaths = [];
    data.forEach(function (value) {
        var r;
        if (r = value.match(fileReg)) {
            affectedPaths.push(r[1].trim());
        }
    });

    return affectedPaths;
}

/**
 * 获取svn repo里面受影响的文件
 *
 * @return {Object} promise
 */
function getSvnEffectedPath() {
    var def = new Deferred();
    exec('svn st', function (error, stdout, stderr) {
        if (error) {
            def.reject(error);
            return;
        }

        if (stderr) {
            def.reject(stderr);
            return;
        }

        stdout = stdout.toString()
            .replace(/\\/g, '/')
            .split(/\r?\n/);

        def.resolve(parseSVNPath(stdout));
    });

    return def.promise;
}

/**
 * 解析改动的svn路径
 *
 * @param {Array.<string>} data console的输出.
 * @return {Array.<string>} 受影响的路径
 */
function parseSVNPath(data) {
    if (!data || !data.length) {
        return;
    }

    var fileReg = /^(?:M|A) +([^ ]+)/;
    var affectedPaths = [];
    data.forEach(function (value) {
        var r;
        if (r = value.match(fileReg)) {
            affectedPaths.push(r[1]);
        }
    });

    return affectedPaths;
}

/**
 * 测试app
 *
 * @param {Array.<string>} affectedPaths 改动的路径
 * @param {string} vcsName 版本控制系统的名字
 */
function testApps(affectedPaths, vcsName) {
    if (!affectedPaths || !affectedPaths.length) {
        util.puts('\n--------------------');
        util.puts('No file was affected. No need to test app.');
        return;
    }

    // 计算受影响的文件
    var fs = require('fs');
    var appDepJson = JSON.parse(fs.readFileSync('src/app.deps.json'));
    var affectedApps = {};  // 收到影响的app(使用map去重)
    var hasAffectedApp = false;
    var affectedFiles = []; // 改动的js、html或less文件
    var fileReg = /\.(?:js|json|html|less)$/;
    affectedPaths.forEach(function (file) {
        if (file.indexOf('src') !== 0) {
            return;
        }

        // 改动的文件是*.app.html
        if (appDepJson[file]) {
            hasAffectedApp = true;
            affectedApps[file] = true;
            return;
        }

        // 改动的文件是js或html
        if (file.match(fileReg)) {
            file = file.replace(/^src\//, '');
            affectedFiles.push(file);
        }
    });

    var ignoreFile = base.get_ignore_func('build/ignore/app_test.cfg');
    var app;
    if (affectedFiles.length) {
        // 计算依赖于改动的文件的app
        // 一个文件可能被多个app依赖
        for (app in appDepJson) {
            var requires = appDepJson[app];

            for (var i = 0, l = affectedFiles.length; i < l; i++) {
                if (requires.indexOf(affectedFiles[i]) != -1 && !ignoreFile(app)) {
                    hasAffectedApp = true;
                    affectedApps[app] = true;
                    break;
                }
            }
        }
    }

    if (!hasAffectedApp) {
        util.puts('\n--------------------');
        util.puts('No file was affected. No need to test app.');
        return;
    }

    // map转数组
    var affectedUrlList = [];
    for (app in affectedApps) {
        affectedUrlList.push(app);
    }

    var outputFiles = [];
    var activeCount = 0;
    var serverUrl = process.env.WEBSERVER_PREFIX || 'http://localhost:8964/';
    function startTask(file) {
        // path => url
        var url = serverUrl + file.replace(/\\/g, '/');

        return base.run_test_case({
                'url': url,
                'file': file
            }, argv.set_benchmark)
            .fail(function (error) {
                util.puts(('[FAILED]:' + file).red);
                util.error(error);
                activeCount++;
            })
            .done(function (outputFile) {
                if (argv.set_benchmark) {
                    outputFiles.push(outputFile);
                }
                util.puts(('[PASS]:' + file).green);
                var nextFile = affectedUrlList[activeCount];
                activeCount++;
                if (!nextFile) {
                    return;
                }
                return startTask(nextFile);
            });
    }

    // 根据cpu数和需要更新的app数来决定启动多少个phantomjs
    var os = require('os');
    var cpus = argv.cpu || argv.cpus;   // cpus或者cpu做参数名都可以，防止typo
    if (!cpus) {
        if (os.type() === 'Windows_NT' || os.type() === 'Darwin') {
            cpus = 2;
        } else {
            cpus = Math.min(os.cpus().length * 2, affectedUrlList.length);
        }
    }

    // 启动phantomjs
    var promises = [];
    for (; activeCount < cpus; activeCount++) {
        var file = affectedUrlList[activeCount];
        if (!file) {
            continue;
        }
        promises.push(startTask(file));
    }

    Deferred.all(promises)
        .ensure(function () {
            if (argv.set_benchmark) {
                util.puts('\n>> Add file into ' + vcsName);
                return base.add_files_into_vcs(vcsName, outputFiles);
            }
        })
        .then(function () {
            util.puts('\n>> Done.');
        });
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

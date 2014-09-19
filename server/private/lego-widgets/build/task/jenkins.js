/**
 * @file build/task/jenkins.js ~ 2014/07/22 13:20:12
 * @author leeight(liyubei@baidu.com)
 * 对jenkinsapi的一些简单封装
 **/
var http = require('http');

exports.key = {
    BUILD_INFO: 'build_info',
    CHANGE_SET: 'affected_paths',
    AUTHOR: 'author',
    STDOUT: 'stdout',
    GITLAB_MEMBERS: 'gitlab_members',
    GITLAB_ISSUE_URL: 'gitlab_issue_url'
};

/**
 * 获取build相关的信息
 * @param {Object} context 保存上下文的信息.
 * @param {string} buildUrl 相关的url地址.
 * @return {function}
 */
exports.getBuildInfo = function(context, buildUrl) {
    return function(callback) {
        // BUILD_URL=http://jx-vs-fe00.jx.baidu.com:8080/job/mr_jn2/1/
        var apiUrl = buildUrl + 'api/json';

        var options = require('url').parse(apiUrl);
        options.headers = {
            Authorization: 'Basic bGl5dWJlaTozZmIwYjIzMGM1YTMwNzViN2QxYTcwNGNjMTkxNDFmNA=='
        };
        options.method = 'GET';

        var req = http.request(options, function(res){
            var buffer = [];
            res.on('data', function(d){
                buffer.push(d);
            });
            res.on('end', function(){
                var body = Buffer.concat(buffer).toString('utf-8');
                var buildInfo = JSON.parse(body);
                context.set(exports.key.BUILD_INFO, buildInfo);
                callback(null, buildInfo);
            });
        });
        req.on('error', callback);
        req.on('socket', function(socket){
            socket.setTimeout(5000);
            socket.on('timeout', function(){
                req.abort();
            });
        });
        req.end();
    };
};

exports.getChangeset = function(context) {
    return function(callback) {
        var buildInfo = context.get(exports.key.BUILD_INFO);
        var items = buildInfo.changeSet.items;
        if (items && items.length) {
            // items有多个，对应着多个svn commit
            // 但是对于lego-widgets来说，因为设置的是 * * * * *
            // 所以出现多给items的情况不常见，因此我们暂时不处理那种情况
            var affectedPaths = items[0].affectedPaths;
            if (affectedPaths && affectedPaths.length) {
                context.set(exports.key.CHANGE_SET, affectedPaths);
                context.set(exports.key.AUTHOR, items[0].author.fullName);
                callback(null, affectedPaths);
                return;
            }
        }
        callback(null, []);
    };
};

exports.getJavaScriptChangeset = function(context) {
    return function(callback) {
        var changeSets = context.get(exports.key.CHANGE_SET) || [];
        changeSets = changeSets.filter(function(item){
            if (!/\.js$/.test(item) || item.indexOf('node_modules') !== -1) {
                return false;
            }

            // src/ad/**/*.js
            // build/**/*.js

            // 处理一下windows下面的路径符号
            item = item.replace(/\\/g, '/');

            return /^(build\/|src\/ad\/)/.test(item);
        });
        context.set(exports.key.CHANGE_SET, changeSets);
        callback(null, changeSets);
    };
};

/**
 * @return {Object}
 */
exports.createContext = function() {
    var cache = {};
    return {
        get: function(key) {
            return cache[key];
        },
        set: function(key, value) {
            return (cache[key] = value);
        },
        clear: function() {
            cache = {};
        }
    };
};

if (require.main === module) {
    var context = exports.createContext();
    var buildUrl = 'http://classified.jenkins.baidu.com/job/lego_trunk_widgets_svn_quick/2622/';
    exports.getBuildInfo(context, buildUrl)(function(error, buildInfo) {
        console.log(error);
        console.log(buildInfo);
    });
}










/* vim: set ts=4 sw=4 sts=4 tw=120: */

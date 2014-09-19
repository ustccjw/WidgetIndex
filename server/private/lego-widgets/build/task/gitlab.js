/**
 * @file build/task/gitlab.js ~ 2014/07/22 14:41:44
 * @author leeight(liyubei@baidu.com)
 **/
var jenkins = require('./jenkins');
var http = require('http');

/**
 * lego-widgets的项目地址，查看所有项目列表的方式是：
 * http://git.baidu.com/api/v3/projects?private_token=idYr9aKArA2RpExMFMV8
 *
 * @type {string}
 */
var kProjectUrl = 'http://git.baidu.com/api/v3/projects/57';

var kMaxDescriptionSize = 50 * 1024;

function buildUrl(api) {
    return kProjectUrl + api + '?private_token=idYr9aKArA2RpExMFMV8';
}

function httpGet(url, callback) {
    var http = require('http');
    var req = http.get(url, function(res){
        var buffer = [];
        res.on('data', function(d){
            buffer.push(d);
        });
        res.on('end', function(){
            var body = Buffer.concat(buffer).toString('utf-8');
            var response = JSON.parse(body);
            callback(null, response);
        });
    });
    req.on('error', callback);
    req.on('socket', function(socket){
        socket.setTimeout(5000);
        socket.on('timeout', function(){
            req.abort();
        });
    });
}

/**
 * http://git.baidu.com/api/v3/projects/57/members?private_token=idYr9aKArA2RpExMFMV8
 * 获取gitlab上 username 和 id 的对应关系
 * 创建issue的时候需要指定id
 */
exports.allMembers = function(context) {
    return function(callback) {
        var members = context.get(jenkins.key.GITLAB_MEMBERS);
        if (members) {
            callback(null, members);
            return;
        }

        var apiUrl = buildUrl('/members');
        httpGet(apiUrl, function(err, response){
            if (err) {
                context.set(jenkins.key.GITLAB_MEMBERS, {});
                callback(err, null);
                return;
            }

            var members = {};
            response.forEach(function(item){
                members[item.username] = item.id;
            });
            context.set(jenkins.key.GITLAB_MEMBERS, members);
            callback(null, members);
        });
    };
};

/**
 * curl -s -X POST \
 *  -d "title=Break%20The%20Job" \
 *  -d "description=${value}" \
 *  -d "assignee_id=${X_AUTHOR_ID}" \
 *  -d "labels=auto" \
 *  "http://git.baidu.com/api/v3/projects/${X_PROJECT_ID}/issues?private_token=idYr9aKArA2RpExMFMV8"
 * @param {Object} context 保存上下文的信息.
 * @return {function}
 */
exports.createIssue = function(context) {
    var querystring = require('querystring');

    return function(callback) {
        var stdout = context.get(jenkins.key.STDOUT);
        if (!stdout) {
            callback(null);
            return;
        }

        var gitlabMembers = context.get(jenkins.key.GITLAB_MEMBERS);
        var svnAuthor = context.get(jenkins.key.AUTHOR);
        if (stdout.length > kMaxDescriptionSize) {
            stdout = stdout.substring(0, kMaxDescriptionSize);
        }

        var data = querystring.encode({
            'title': '[oops] Break the job',
            'description': '```\n' + stdout + '\n```',
            // 29是 liyubei 的id
            'assignee_id': gitlabMembers[svnAuthor] || 29,
            'labels': 'x-code-style, oops'
        });

        var apiUrl = buildUrl('/issues');
        var options = require('url').parse(apiUrl);
        options.method = 'POST';
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        };

        var req = http.request(options, function(res){
            var buffer = [];
            res.on('data', function(d){ buffer.push(d); });
            res.on('end', function(){
                var response = JSON.parse(Buffer.concat(buffer).toString('utf-8'));
                var issueUrl = 'http://git.baidu.com/fe/lego-widgets/issues/' + response.iid;
                context.set(jenkins.key.GITLAB_ISSUE_URL, issueUrl);

                if (201 === res.statusCode) {
                    callback(null, issueUrl);
                }
                else {
                    callback(JSON.stringify(response));
                }
            });
        });
        req.on('error', callback);
        req.on('socket', function(socket){
            socket.setTimeout(10000);
            socket.on('timeout', function(){
                req.abort();
            });
        });
        req.write(data);
        req.end();
    };
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */

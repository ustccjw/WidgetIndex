/**
 * @file build/task/chk_code_style.js ~ 2014/07/22 13:17:24
 * @author leeight(liyubei@baidu.com)
 * 检查是否符合编码的规范
 **/
var async = require('async');
var jenkins = require('./jenkins');
var gitlab = require('./gitlab');

// 用async.waterfall代替async.series就可以
// 避免使用context了，但是我写完之后才发现可以用waterfall代替
// 此时已经没有兴趣去重构了，如果其它同学有兴趣的话，请自便
var context = jenkins.createContext();

function remoteBuild() {
    var kDefaultBuildUrl = 'http://classified.jenkins.baidu.com/job/lego_trunk_widgets_svn_quick/2469/';
    var buildUrl = process.env['BUILD_URL'] || kDefaultBuildUrl;

    return [
        jenkins.getBuildInfo(context, buildUrl),
        jenkins.getChangeset(context),
        jenkins.getJavaScriptChangeset(context),
        checkCodeStyle(context),
        gitlab.allMembers(context),
        gitlab.createIssue(context)
    ];
}

function localBuild() {
    var local = require('./local');
    return [
        local.getChangeset(context),
        local.getJavaScriptChangeset(context),
        local.checkCodeStyle(context)
    ];
}

/**
 * 调用edp jshint，检查代码的规范
 * 如果失败了，自动去创建issue去
 */
function checkCodeStyle(context) {
    var spawn = require('child_process').spawn;
    var path = require('path');
    var options = {
        cwd: path.join(__dirname, '..', '..')
    };

    return function(callback) {
        var changeSets = context.get(jenkins.key.CHANGE_SET);
        if (!changeSets.length) {
            callback(null);
            return;
        }

        var edp = spawn('edp', ['jshint'].concat(changeSets), options);
        var stdout = [];
        edp.stdout.on('data', function(data){
            stdout.push(data);
        });
        edp.on('close', function(code){
            if (code === 0) {
                callback(null, []);
            }
            else {
                var stderr = Buffer.concat(stdout).toString('utf-8');
                context.set(jenkins.key.STDOUT, stderr);
                callback(null, stderr);
            }
        });
    };
}

var tasks = process.env['BUILD_URL'] ? remoteBuild(): localBuild();
async.series(tasks, function(err){
    var issueUrl = context.get(jenkins.key.GITLAB_ISSUE_URL);
    if (issueUrl) {
        console.log(issueUrl);
        context.clear();
        process.exit(1);
    }
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */

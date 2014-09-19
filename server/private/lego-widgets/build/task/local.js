/**
 * @file build/task/local.js ~ 2014/07/22 16:03:07
 * @author leeight(liyubei@baidu.com)
 **/
var jenkins = require('./jenkins');

var async = require('async');

exports.getChangeset = function(context) {
    function runCommand(item, callback) {
        var cmd = item[0];
        var args = [];
        var options = {};

        // 参考自：lib/child_process.js
        if (process.platform === 'win32') {
            args = ['/s', '/c', '"' + cmd + '"'];
            cmd = process.env.comspec || 'cmd.exe';
            options.windowsVerbatimArguments = true;
        }
        else {
            args = ['-c', cmd];
            cmd = '/bin/sh';
        }

        var spawn = require('child_process').spawn;
        var instance = spawn(cmd, args, options);
        var stdout = [];
        var stderr = [];
        instance.stdout.on('data', function(d){ stdout.push(d); });
        instance.stderr.on('data', function(d){ stderr.push(d); });
        instance.on('close', function(code){
            if (code !== 0) {
                callback(false);
                return;
            }

            stdout = Buffer.concat(stdout).toString('utf-8').trim();
            if (!stdout.length) {
                callback(false);
                return;
            }

            var fn = item[1];
            var changeSets = fn(stdout);
            context.set(jenkins.key.CHANGE_SET, changeSets);
            callback(true);
        });
    }

    return function(callback) {
        // svn st
        // git diff git-svn --name-only
        async.some([
            ['svn status', parseSVN],
            ['git diff git-svn --name-only', parseGIT]
        ], runCommand, function(result){
            if (result) {
                callback(null);
            }
            else {
                callback('Guess vcs failed');
            }
        });
    };
};

function parseSVN(stdout) {
    return stdout.split(/[\r?\n]+/).filter(function(item){
        // 忽略?开头的那些行，因为它们还未被svn add
        return !/^\?/.test(item);
    }).map(function(item){
        var x = item.split(/\s+/)[1];
        return x;
    });
}

function parseGIT(stdout) {
    return stdout.split(/(\r?\n)/g);
}

exports.getJavaScriptChangeset = function(context) {
    return jenkins.getJavaScriptChangeset(context);
};

exports.checkCodeStyle = function(context) {
    return function(callback) {
        var changeSets = context.get(jenkins.key.CHANGE_SET);
        if (!changeSets.length) {
            callback(null);
            return;
        }
        var options = { stdio: 'inherit' };
        console.log('Running edp jshint %s', changeSets.join(' '));
        var spawn = require('cross-spawn').spawn;
        var edp = spawn('edp', ['jshint'].concat(changeSets), options);
        edp.on('close', function(code){
            // 本地运行不管成功还是失败，反正输出结果就好了
            callback(null);
        });
    };
};









/* vim: set ts=4 sw=4 sts=4 tw=120: */

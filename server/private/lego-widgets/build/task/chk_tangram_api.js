/**
 * @file build/task/chk_tangram_api.js ~ 2014/07/23 10:54:34
 * @author leeight(liyubei@baidu.com)
 * 检查一下现在系统中依旧存在的tangram api，然后开始逐步的替换掉.
 **/
var fs = require('fs');
var esprima = require('esprima');
var estraverse = require('estraverse');
var blackList = require('./tangram_black_list');

var isVerbose = false;
var exists = {};
function main(file) {
    var code = fs.readFileSync(file, 'utf-8');
    var tree = esprima.parse(code);
    var buffer = [];
    estraverse.traverse(tree, {
        enter: function(node, parent) {
            if (node.type === 'Identifier' &&
                (node.name === 'baidu' || buffer.length)) {
                buffer.push(node.name);
            }
        },
        leave: function(node, parent) {
            if (node.type === 'MemberExpression'
                && parent.type !== 'MemberExpression'
                && buffer.length) {
                var fnName = buffer.join('.');
                exists[fnName] = true;
                if (isVerbose) {
                    console.log(fnName);
                }
                buffer.length = 0;
            }
        }
    });
}

function check(verbose) {
    isVerbose = verbose;
    // main('src/ad/base.js');
    require('glob').sync('src/{ad,app,base,er,jn,ui}/**/*.js').forEach(main);
    var errList = [];
    blackList.forEach(function(fnName) {
        if (exists[fnName]) {
            errList.push(fnName);
        }
    });
    if (errList.length) {
        throw 'These tangram functions are deprecated: ' + errList.join(', ');
    }
}

if (require.main === module) {
    check(true);
}
else {
    console.log('Checking tangram apis...');
    check(false);
}












/* vim: set ts=4 sw=4 sts=4 tw=120: */

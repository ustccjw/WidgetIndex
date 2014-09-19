/**
 * @file build/task/util.js ~ 2014/07/24 09:02:24
 * @author leeight(liyubei@baidu.com)
 **/
var fs = require('fs');
var util = require('util');


/**
 * 将系统中常见的模块转化为amd的模块定义
 * 例如：
 * goog.require('ad.base');
 * goog.require('er.template');
 *
 * goog.provide('ad.widget.Widget');
 * 会转化为如下的代码格式：
 *
 * define(['ad/base', 'er/template', ...], function(require){
 *     require('ad/base');
 *
 *     goog.provide('ad.widget.Widget');
 *     // 原始代码
 * });
 *
 * goog.require相关的代码被删除，修改为require(path)的形式
 * 例如：require('ad/base');
 *
 * 另外，以为对于src/ad/base.js来说，provide了多个namespace，所以
 * 无法直接修改module.exports的内容返回所需要的东东，所以还是通过
 * esl保证加载的顺序，然后访问全局变量来达到跟现在一致的效果
 *
 * @param {string} file 输入文件.
 * @return {string} 处理之后的符合amd规范的代码内容.
 */
exports.convertToAMDModule = function(file) {
    var pattern = /^goog\.require\s*\(\s*(['"])([^'"]+)\1\s*\)\s*;?/mg;
    var code = fs.readFileSync(file, 'utf-8');
    var match = null;

    var dependencies = ['\'require\''];

    pattern.lastIndex = 0;
    while((match = pattern.exec(code))) {
        var dep = '\'' + getDefined(match[2]).replace(/\.js$/, '') + '\'';
        if (dependencies.indexOf(dep) === -1) {
            dependencies.push(dep);
        }
    }

    // 因为延迟执行的原因，如果不调用require，那么factory是不会执行的
    // 导致goog.provide是不会被调用的.
    var finalCode = code.replace(pattern, function(_, $1, $2){
        var dep = getDefined($2).replace(/\.js$/, '');
        return 'require(\'' + dep + '\');';
    });

    return util.format('define([%s], function(require){\n%s\n});',
        dependencies.join(', '),
        finalCode);
};

/* jshint ignore:start */
var goog = {
    initialized: false,
    init: function() {
        var path = require('path');
        var kDepsFile = path.join(__dirname, '..', '..', 'src', 'deps.js');
        eval(fs.readFileSync(kDepsFile, 'utf-8'));
        goog.initialized = true;
    },
    nsMap: {},
    addDependency: function(path, provides, requires) {
        provides.forEach(function(provide){
            goog.nsMap[provide] = path;
        });
    }
};
/* jshint ignore:end */

/**
 * 获取ns所在的文件
 * @param {string} ns 命名空间.
 */
function getDefined(ns) {
    if (!goog.initialized) {
        goog.init();
    }
    return goog.nsMap[ns];
}

if (require.main === module) {
    console.log(exports.convertToAMDModule('src/ad/widget/widget.js'));

}










/* vim: set ts=4 sw=4 sts=4 tw=120: */

/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/plugin.js ~ 2013/07/04 11:10:55
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.base');
goog.require('ad.flags');
goog.require('ad.Wrapper');
goog.require('ad.material.AbstractStyleMaterial');

goog.provide('ad.plugin.Plugin');

/**
 * @interface
 */
ad.plugin.Plugin = function() {
    // TODO
};

/**
 * @expose
 * @param {ad.material.AbstractStyleMaterial} material 物料的实例.
 */
ad.plugin.Plugin.prototype.attachTo = function(material) {
};

/**
 * 因为最终代码发布的时候，plugin的代码和render的代码可能是分开的
 * 但是为了统一，我们希望能够将所有的plugin的代码都放到一起，为了让
 * material初始化完毕之后可以找到所有注册过的plugin，我们把plugin的
 * 的实例放到RT_CONFIG里面，RT_CONFIG是跟material相关的。
 * 
 * 如果plugin的代码跟render一起编译，也没有问题。因为material在使用
 * plugin的时候，都是从RT_CONFIG来获取的。
 * 
 * @param {ad.plugin.Plugin} instance Plugin的实例.
 */
ad.plugin.Plugin.register = function(instance) {
    if (FLAGS_enable_amd_build) {
        if (typeof define === 'function') {
            define(function() {
                return new ad.Wrapper(function(async) {
                    return instance;
                });
            });
        }
        return;
    }
    if (!RT_CONFIG['__plugins']) {
        RT_CONFIG['__plugins'] = [];
    }
    RT_CONFIG['__plugins'].push(instance);
};

if (!COMPILED) {
    ad.base.exportPath('RT_CONFIG.__plugins', []);
    ad.base.exportPath('LINKS', []);
    ad.base.exportPath('RT_CONFIG.HOSTMAP', {});
    ad.base.exportPath('RT_CONFIG.HOST', function(host) {
        return RT_CONFIG.HOSTMAP[host] || 'http://' + host;
    });
}



















/* vim: set ts=4 sw=4 sts=4 tw=100: */

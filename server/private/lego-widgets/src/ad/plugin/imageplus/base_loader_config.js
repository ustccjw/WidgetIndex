/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/base_loader_config.js ~ 2013/12/03 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/
goog.require('ad.string');
goog.require('ad.object');
goog.require('ad.plugin.imageplus.LoaderConfig');

goog.provide('ad.plugin.imageplus.BaseLoaderConfig');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.LoaderConfig
 * @constructor
 * @param {Object} config .
 */
ad.plugin.imageplus.BaseLoaderConfig = function (config) {
    // 默认配置，供子类重写默认值
    this._defaultConfig = ad.object.extend({
        // 是否立即加载广告
        'autoStart': true,
        // 需要展示的图片所在元素的位置，如果没有则选择全部图片
        'imgContainerId': '',
        // 遮住图片的元素id，只针对单图模式
        // 有些网站用透明层遮住了图片，导致mouseover之类的事件触发不了
        // 最好设置此参数后，设置autoDetectCover为false
        // 例如：http://www.doyo.cn/picture/5193/1
        'imgCoverId': '',
        // 与imgCoverId作用一样，但支持多个id或class（用逗号分隔）
        // 例如："#next,#prev,.pm_player"
        'imgCovers': '',
        // 传给后端的src参数值
        'apiSrc': 1000,
        /**
         * 传给后端的wd参数值
         * 可以是函数（参数为图片元素）来动态获取wd值
         * 也可以是字符串
         *
         * @param {Element} img .
         */
        'apiWd': function (img) {
            return img.alt || document.title;
        },
        // 后端api地址
        'api': 'http://imageplus.baidu.com/ui',
        // 图片最小宽度，小于此宽度不展示广告
        'minImgWidth': 300,
        // 图片最小高度，小于此高度不展示广告
        'minImgHeight': 200,
        // 一个页面上最多可以展现广告的数量
        'maxAdCount': 4,
        // 是否自动查找遮住图片的层
        'autoDetectCover': true,
        // 查找遮住图片的浮层元素时，查找的dom广度
        'findCoverLevel': 4
        // render地址的替换规则
        // render = render.replace(new RegExp(key), value);
        /*
        'renderReplaceRules': {
            // 'sticker/pa[^.]*.app.js': 'pa.app.js'
        }
        */
    }, this._defaultConfig || {});
    this._config = ad.object.extend(this._defaultConfig, config);
    this._wrongPicReg = /.(?:gif|html|htm)(?:$|#|\?)/;
    this.minWidth = parseInt(this.get('minImgWidth'), 10);
    this.minHeight = parseInt(this.get('minImgHeight'), 10);

    // 适配下unionId的错误输入，例如："u123123", " u123123 "
    var unionId = ad.string.trim(/** @type {string} */(this.get('unionId')));
    if (unionId && unionId.indexOf('u') === 0) {
        unionId = unionId.slice(1);
    }
    this._config['unionId'] = unionId;
};

baidu.inherits(ad.plugin.imageplus.BaseLoaderConfig, ad.plugin.imageplus.LoaderConfig);

/**
 * 判断图片是否符合规则
 *
 * @param {Element} img .
 * @return {boolean} img .
 */
ad.plugin.imageplus.BaseLoaderConfig.prototype.isImgFollowRules = function (img) {
    var attrNode = img.getAttributeNode('data-baiduimageplus-ignore');
    return !(attrNode && attrNode.specified)
        && (img.offsetWidth >= this.minWidth)
        && (img.offsetHeight >= this.minHeight)
        && !this._wrongPicReg.test(img.src);
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/style_head.js ~ 2013/12/23 11:09:49
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * style_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/style_head.less');
goog.include('ad/widget/smart/style_head.html');

goog.provide('ad.widget.smart.StyleHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.StyleHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_style_head';
};
baidu.inherits(ad.widget.smart.StyleHead, ad.widget.Widget);

/** @override */
ad.widget.smart.StyleHead.prototype.enterDocument = function() {
    ad.widget.smart.StyleHead.superClass.enterDocument.call(this);

};

/** @override */
ad.widget.smart.StyleHead.prototype.bindEvent = function() {
    ad.widget.smart.StyleHead.superClass.bindEvent.call(this);
    var modelElms = [];
    var modelCtn = baidu.g(this.getId('models'));
    if (modelCtn.getElementsByClassName) {
        modelElms = modelCtn.getElementsByClassName('ec-model-hotspot');
    }
    else if (modelCtn.querySelectorAll) {
        modelElms = modelCtn.querySelectorAll('.ec-model-hotspot');
    }
    else {
        var elms = modelCtn.getElementsByTagName('div');
        for (var i = 0, len = elms.length; i < len; i++) {
            if (baidu.dom.hasClass(elms[i], "ec-model-hotspot")) {
                modelElms.push(elms[i]);
            }
        }
    }
    if (modelElms.length) {
        baidu.array.each(modelElms, function(modelElm, i) {
            baidu.on(modelElm, "mouseover", function(e) {
                baidu.dom.addClass(modelElm.parentNode, 'ec-hover');
            });
            baidu.on(modelElm.parentNode, "mouseleave", function(e) {
                baidu.dom.removeClass(modelElm.parentNode, 'ec-hover');
            });
        })
    }
};

/** @override */
ad.widget.smart.StyleHead.prototype.patchData = function() {
    if (this._data) {
        var models = this._data['models'] || [];
        if (models[5]) {
            models[5]["_newline"] = true;
        }
        for (var i = 0, len = models.length; i < len; i++) {
            models[i]["model_search_url"] = "http://www.baidu.com/s?ie=UTF-8&wd=" + encodeURIComponent(models[i]["model_desc"]);
        }
    }
}









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

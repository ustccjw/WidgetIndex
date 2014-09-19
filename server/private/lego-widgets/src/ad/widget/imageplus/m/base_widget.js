/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/m/base_widget.js ~ 2014/09/04 12:39:35
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * baike相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.widget.imageplus.m.util');

goog.provide('ad.widget.imageplus.m.BaseWidget');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.imageplus.m.BaseWidget = function (data) {
    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.imageplus.m.BaseWidget, ad.widget.Widget);

/** @override */
ad.widget.imageplus.m.BaseWidget.prototype.patchData = function () {
    if (this._data) {
        ad.widget.imageplus.m.util.updateRealUrl(this._data);
    }
};

/**
 * 从文档中获取指定的DOM元素
 * XXX: 如果要用IsolatedWidgetContainer，需要这么整
 *
 * @param {string|HTMLElement} id 元素的id或DOM元素
 * @return {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
 */
ad.widget.imageplus.m.BaseWidget.prototype.g = function(id) {
    if ('string' === typeof id || id instanceof String) {
        return this.getDocument().getElementById(id);
    }
    else if (id && id.nodeName && (id.nodeType === 1 || id.nodeType === 9)) {
        return id;
    }
    return null;
};

/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/business_app/app_displayer.js ~ 2013/03/27 16:24:50
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 150523 $
 * @description
 * app_displayer相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/business_app/app_displayer.less');
goog.include('ad/widget/business_app/app_displayer.html');

goog.provide('ad.widget.business_app.AppDisplayer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.business_app.AppDisplayer = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_business_app_app_displayer';
};
baidu.inherits(ad.widget.business_app.AppDisplayer, ad.widget.Widget);

ad.widget.business_app.AppDisplayer.prototype.bindEvent = function() {
    ad.widget.business_app.AppDisplayer.superClass.bindEvent.call(this);
    var root = this.getRoot();
    if (root) {
        root = baidu.dom.first(root);
        var me = this;
        // bind click
        baidu.event.on(root, 'click', function(e) {
            var t = baidu.event.getTarget(e),
                isH3 = t.nodeName.toLowerCase() === 'h3',
                isA = t.nodeName.toLowerCase() === 'a',
                index;
            if (!isA) {
                baidu.event.preventDefault(e);
                if (isH3) {
                    index = parseInt(baidu.dom.getAttr(t, 'data-index'), 10);
                    me.trigger(ui.events.CLICK, me._data['options'][index]);
                }
            }
        });
    }
};

/** @override */
ad.widget.business_app.AppDisplayer.prototype.patchData = function() {
    baidu.each(this.getData("options"), function(item, index) {
        item['_big'] = "03".indexOf(String(index)) === -1 ? false : true;
        item['_float_right'] = "3".indexOf(String(index)) === -1 ?false : true;
    });
};
























/* vim: set ts=4 sw=4 sts=4 tw=100: */

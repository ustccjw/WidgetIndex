/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/lv/list.js ~ 2013/03/14 16:54:13
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/lv/list.less');
goog.include('ad/widget/lv/list.html');

goog.provide('ad.widget.lv.List');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.lv.List = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_lv_list';
};
baidu.inherits(ad.widget.lv.List, ad.widget.Widget);

/** @override */
ad.widget.lv.List.prototype.bindEvent = function() {
    ad.widget.lv.List.superClass.bindEvent.call(this);
    var me = this;
    if(this._data['enable_bmap']){
        baidu.on(baidu.g(me.getId('bmap')), 'click', function(){
            me.trigger(ui.events.CLICK);
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

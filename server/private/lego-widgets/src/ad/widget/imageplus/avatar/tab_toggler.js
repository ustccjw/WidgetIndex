/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/avatar/tab_toggler.js ~ 2014/05/21 17:36:10
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * tab_toggler(tab菜单显示控制)相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/avatar/tab_toggler.less');
goog.include('ad/widget/imageplus/avatar/tab_toggler.html');

goog.provide('ad.widget.imageplus.avatar.TabToggler');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.avatar.TabToggler = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_avatar_tab_toggler';
};
baidu.inherits(ad.widget.imageplus.avatar.TabToggler, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.avatar.TabToggler.prototype.bindEvent = function() {
    ad.widget.imageplus.avatar.TabToggler.superClass.bindEvent.call(this);

    var me = this;
    var nowCollapsed = this.getData('is_collapsed');
    var mainId = this.getId();
    var expandedCtn = baidu.q('ec-expanded-ctn', mainId)[0];
    var collapsedCtn = baidu.q('ec-collapsed-ctn', mainId)[0];
    baidu.on(mainId, 'click', function (evt) {
        if (nowCollapsed) {
            collapsedCtn.style.display = 'none';
            expandedCtn.style.display = 'block';
        }
        else {
            expandedCtn.style.display = 'none';
            collapsedCtn.style.display = 'block';
        }
        nowCollapsed = !nowCollapsed;
        me.trigger(ui.events.CLICK, nowCollapsed);
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: hot_line.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/hot_line.js ~ 2012/09/06 11:09:06
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * tab_cont相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/hot_line.less');
goog.include('ad/widget/hot_line.html');

goog.provide('ad.widget.HotLine');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.HotLine = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_hot_line';
};
baidu.inherits(ad.widget.HotLine, ad.widget.Widget);



/** @override */
ad.widget.HotLine.prototype.enterDocument = function() {
    ad.widget.HotLine.superClass.enterDocument.call(this);
    var me = this;
    if(baidu.g(me.getId('phone-number'))){
        baidu.on(me.getId('phone-number'), 'mouseover', function(){
            me.sendLog('hot-line-hover', 'hot-line-hover');
        });
    }
    
};

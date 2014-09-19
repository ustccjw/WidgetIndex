/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/coca_cola/coca_cola.js ~ 2014/03/03 17:16:13
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 10927 $
 * @description
 * coca_cola相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.include('ad/widget/coca_cola/coca_cola.less');
goog.include('ad/widget/coca_cola/coca_cola.html');
goog.provide('ad.widget.coca_cola.CocaCola');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.coca_cola.CocaCola = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_coca_cola_coca_cola';
};
baidu.inherits(ad.widget.coca_cola.CocaCola, ad.widget.Widget);

/** @override */
ad.widget.coca_cola.CocaCola.prototype.enterDocument = function() {
    ad.widget.coca_cola.CocaCola.superClass.enterDocument.call(this);

    // 均为北京时间
    var endDate = this._data['end_date'];
    var openDate = baidu.date.parse(endDate);
    var today = new Date();
    var daysLeft = parseInt((openDate - today)/1000/60/60/24, 10);
    if (daysLeft < 0) {
        daysLeft = 0
    }
    else if (daysLeft > 999) {
        daysLeft = 999;
    }
    if (daysLeft > 99) {
        baidu.dom.setStyle(
            baidu.g(this.getId('ec-time-container')), 
            'height', 
            '25px'
        );
        baidu.dom.setStyle(
            baidu.g(this.getId('days-left')), 
            'font-size', 
            '25px'
        );
    }

    baidu.g(this.getId('days-left')).innerHTML = daysLeft;
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */

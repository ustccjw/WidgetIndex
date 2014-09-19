/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/aladdin/cosmetic.js ~ 2013/10/31 10:54:09
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * cosmetic相关的实现逻辑
 * 化妆品阿拉丁？化妆品知心
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/aladdin/cosmetic.less');
goog.include('ad/widget/aladdin/cosmetic.html');

goog.provide('ad.widget.aladdin.Cosmetic');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.aladdin.Cosmetic = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @private
     * @type {number}
     * 当前展开的元素
     */
    this._currentIndex = 0;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_aladdin_cosmetic';
};
baidu.inherits(ad.widget.aladdin.Cosmetic, ad.widget.Widget);

/** @override */
ad.widget.aladdin.Cosmetic.prototype.enterDocument = function() {
    ad.widget.aladdin.Cosmetic.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.aladdin.Cosmetic.prototype.bindEvent = function() {
    ad.widget.aladdin.Cosmetic.superClass.bindEvent.call(this);

    function findParent(target) {
        for(var i = 0; i < 3; i ++) {
            if (target.className === 'ec-simple') {
                return target;
            }
            target = target.parentNode;
        }
        return null;
    }

    var me = this;
    ad.dom.on(this.getRoot(), 'click', function(opt_evt){
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeType === 1 && (target = findParent(target))) {
            var index = parseInt(target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                baidu.removeClass(me.getId('item-' + me._currentIndex), 'ec-expand');
                baidu.addClass(me.getId('item-' + index), 'ec-expand');
                me._currentIndex = index;
            }
        }
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

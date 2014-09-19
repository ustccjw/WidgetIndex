/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: intermediate_page.js 13639 2012-10-31 09:33:49Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/xlab/intermediate_page.js ~ 2012/09/20 10:48:27
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 13639 $
 * @description
 * intermediate_page相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/xlab/intermediate_page.less');
goog.include('ad/widget/xlab/intermediate_page.html');

goog.provide('ad.widget.xlab.IntermediatePage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.xlab.IntermediatePage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_xlab_intermediate_page';
};
baidu.inherits(ad.widget.xlab.IntermediatePage, ad.widget.Widget);

/** @override */
ad.widget.xlab.IntermediatePage.prototype.enterDocument = function() {
    ad.widget.xlab.IntermediatePage.superClass.enterDocument.call(this);
    var thumbnails = baidu.g(this.getId('thumbnails'));
    var lists = thumbnails.getElementsByTagName('li');
    this._selectImage(lists[0]);
};

/** @override */
ad.widget.xlab.IntermediatePage.prototype.bindEvent = function() {
    ad.widget.xlab.IntermediatePage.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(this.getId('thumbnails'), 'click', function(evt){
        var target = baidu.event.getTarget(evt || window.event);
        if (target.nodeType == 1 && target.nodeName == 'IMG') {
            var li = target.parentNode;
            if (!baidu.dom.hasClass(li, 'active')) {
                me._selectImage(li);
            }
        }
    });
};

/**
 * @private
 */
ad.widget.xlab.IntermediatePage.prototype._resetStatus = function() {
    var thumbnails = baidu.g(this.getId('thumbnails'));
    var lists = thumbnails.getElementsByTagName('li');
    baidu.each(lists, function(list){
        baidu.removeClass(list, 'active');
    });
};

/**
 * @param {Node} li the list element.
 */
ad.widget.xlab.IntermediatePage.prototype._selectImage = function(li) {
    this._resetStatus();

    var anchor = li.firstChild;
    var src = anchor.getAttribute("data-large-image-src");
    var largeImage = baidu.g(this.getId('large-image'));
    if (largeImage) {
        largeImage.src = src;
        baidu.addClass(li, 'active');
        this.sendLog('product-image-switch');
    }
}

/** @override */
ad.widget.xlab.IntermediatePage.prototype.patchData = function() {
    // TODO
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/nobox/brand_logo.js ~ 2014/07/30 13:54:01
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * brand_logo相关的实现逻辑
 **/

goog.require('ad.util');
goog.require('ad.widget.imageplus.util');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ad.widget.imageplus.tuhua.effect');

goog.include('ad/widget/imageplus/nobox/brand_logo.less');
goog.include('ad/widget/imageplus/nobox/brand_logo.html');

goog.provide('ad.widget.imageplus.nobox.BrandLogo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.nobox.BrandLogo = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_nobox_brand_logo';
};
baidu.inherits(ad.widget.imageplus.nobox.BrandLogo, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.nobox.BrandLogo.prototype.enterDocument = function() {
    ad.widget.imageplus.nobox.BrandLogo.superClass.enterDocument.call(this);

    var me = this;
    var link = this.g(this.getId('link'));
    // 图搜的由于存在srcPic的overflow:hidden，因此将“赞助”挪进来
    if (document.location.host === 'image.baidu.com') {
        link.style.right = '20px';
    }
    var b = link.getElementsByTagName('b')[0];
    function swing() {
        if (me._swingRunning) {
            me._swingFx.end();
        }
        me._swingFx = ad.widget.imageplus.tuhua.effect.swingColors(
            [ b ],
            [ '#fff', '#fff', '#ffa500', '#ffa500' ], // #ffa500
            [ 0.9, 0.9, 0.9, 1 ],
            function() {
                me._swingRunning = false;
                swing();
            },
            5000
        );
        me._swingRunning = true;
    }
    swing();

    var img = this.g(this.getId('img'));
    var url = this.getData('idea_url');
    var maxWidth = this.getData('box.nobox.maxWidth', 200);
    var maxHeight = this.getData('box.nobox.maxHeight', 200);
    ad.util.loadImage(
        url,
        function(size) {
            var ratio = Math.min(
                maxWidth / size['width'],
                maxHeight / size['height'],
                1
            );
            var realWidth = parseInt(size['width'] * ratio, 10);
            var realHeight = parseInt(size['height'] * ratio, 10);
            baidu.dom.setStyles(link, {
                'width': realWidth + 'px',
                'height': realHeight + 'px'
            });
            img.src = url;
            baidu.show(link);
        }
    );
};

/** @override */
ad.widget.imageplus.nobox.BrandLogo.prototype.bindEvent = function () {
    ad.widget.imageplus.nobox.BrandLogo.superClass.bindEvent.call(this);
    ad.widget.imageplus.util.setupLog(this, function () {
        return '';
    });
};

/** @override */
ad.widget.imageplus.nobox.BrandLogo.prototype.patchData = function() {
    ad.widget.imageplus.nobox.BrandLogo.superClass.patchData.apply(this, arguments);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: simple_post.js 13639 2012-10-31 09:33:49Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/simple_post.js ~ 2012/09/28 10:50:01
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 13639 $
 * @description
 * simple_post相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/simple_post.less');
goog.include('ad/widget/tieba/simple_post.html');

goog.provide('ad.widget.tieba.SimplePost');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.SimplePost = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_simple_post';
};
baidu.inherits(ad.widget.tieba.SimplePost, ad.widget.Widget);

/** @override */
ad.widget.tieba.SimplePost.prototype.patchData = function () {
    if (this._data && this._data['video_preview_url']) {
        var videoPreviewUrl = this._data['video_preview_url'];

        this._data['body_html'] = this._data['body_html']
            .replace(/<embed[^>]+src="([^"]+)"[^>]+\/>/gi, function (match, $1) {
                return ''
                    + '<div><img src="' + videoPreviewUrl + '"'
                    + ' width="360" height="240" data-swf-url="' + $1
                    + '" class="ec-video-preview" title="点击查看视频" /></div>';
            });
    }
};


/** @override */
ad.widget.tieba.SimplePost.prototype.bindEvent = function () {
    ad.widget.tieba.SimplePost.superClass.bindEvent.call(this);

    var me = this;
    var root = baidu.g(this.getId('body'));
    if (root) {
        root.onclick = function (e) {
            var element = baidu.event.getTarget(e || window.event);
            if (element.nodeType == 1 &&
                element.nodeName == 'IMG' &&
                element.className == 'ec-video-preview') {

                var swf = element.getAttribute('data-swf-url');
                if (!swf) {
                    return;
                }

                element.parentNode.innerHTML = baidu.swf.createHTML({
                    "url" : swf,
                    "width" : 500,
                    "height" : 450,
                    "allowfullscreen" : "true",
                    "allowscriptaccess" : "never",
                    "wmode" : "transparent",
                    "play" : "true",
                    "loop" : "false",
                    "menu" : "false",
                    "scale" : "noborder"
                });
                me.trigger(ui.events.VIDEO_START);
            }
        };
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

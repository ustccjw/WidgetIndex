/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/tuhua/image_talk.js ~ 2014/05/29 17:43:46
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * image_talk相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ui.events');
goog.require('ad.material.ImageplusMaterial');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.widget.imageplus.tuhua.Thumbnail');
goog.require('ad.widget.imageplus.tuhua.Board');
goog.require('ad.plugin.imageplus.Log');

goog.include('ad/impl/imageplus/tuhua/image_talk.less');

goog.provide('ad.impl.imageplus.tuhua.ImageTalk');

ad.Debug(function(async){
    var material = new ad.material.ImageplusMaterial();
    material['adConfig'] = AD_CONFIG;

    var thumbnail = new ad.widget.imageplus.tuhua.Thumbnail(AD_CONFIG);
    var board = new ad.widget.imageplus.tuhua.Board(AD_CONFIG);

    material.setWidgets(thumbnail, board);
    material.show();

    // 先隐藏board
    board.hide();

    // 更新缩略版消息界面的内容
    board.addListener(ui.events.COMMENT_UPDATED, function(data) {
        thumbnail.updateCommentData(data);
    });
    board.addListener(ui.events.UNREAD_MAIL_COUNT_UPDATED, function(count) {
        thumbnail.showUnreadMailCount(count);
    });

    // thumbnail 点击事件
    thumbnail.addListener(ui.events.CLICK, function(type) {
        if (type == 'comment') {
            board.show();
            board.switchToComment();
        }
        else if (type == 'comment-with-input') {
            board.show();
            board.switchToComment();
            board.changeInputType('comment');
        }
        else if (type == 'redirect-mail') {
            board.show();
            board.switchToMail();
        }
        thumbnail.hide();
    });

    // 返回
    board.addListener(ui.events.RETURN, function() {
        board.hide();
        if (baidu.ie && baidu.ie < 9) {
            thumbnail.show();
        }
        else {
            ad.base.setTimeout(function() {
                thumbnail.show();
            }, 500);
        }
    });

    return material;
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

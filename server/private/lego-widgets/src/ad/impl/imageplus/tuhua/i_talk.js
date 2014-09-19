/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/tuhua/i_talk.js ~ 2014/06/15 12:49:54
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * i_talk相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ui.events');
goog.require('ad.material.ImageplusMaterial');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.widget.imageplus.tuhua.Barrage');
goog.require('ad.widget.imageplus.tuhua.Board');
goog.require('ad.plugin.imageplus.Log');

goog.include('ad/impl/imageplus/tuhua/image_talk.less');

goog.provide('ad.impl.imageplus.tuhua.ITalk');

ad.Debug(function(async) {
    var material = new ad.material.ImageplusMaterial();
    material['adConfig'] = AD_CONFIG;

    var barrage = new ad.widget.imageplus.tuhua.Barrage(AD_CONFIG);
    var board = new ad.widget.imageplus.tuhua.Board(AD_CONFIG);

    material.setWidgets(barrage, board);
    material.show();

    // 先隐藏board
    board.hide();

    // 展示弹幕
    // barrage.showMain();

    // 更新缩略版消息界面的内容
    board.addListener(ui.events.COMMENT_UPDATED, function(data) {
        barrage.updateCommentData(data);
    });
    board.addListener(ui.events.UNREAD_MAIL_COUNT_UPDATED, function(count) {
        barrage.showUnreadMailCount(count);
    });

    // barrage 点击事件
    barrage.addListener(ui.events.CLICK, function(type, descId) {
        if (type === 'comment') {
            board.show();
            board.switchToComment();
            if (descId) {
                // 切换到指定评论
                board.scrollToComment(descId);
            }
        }
        else if (type === 'reply-comment') {
            board.show();
            board.switchToComment();
            if (descId) {
                // 切换到指定评论
                board.scrollToComment(descId);
                var message = board.getComment(descId);
                // 切换到回复状态
                board.changeInputType('reply-comment', message);
            }
        }
        else if (type === 'redirect-mail') {
            board.show();
            board.switchToMail();
        }
        barrage.hide();
    });

    // 返回
    board.addListener(ui.events.RETURN, function() {
        // 返回弹幕时重新请求
        board.loadComment();
        board.hide();
        if (baidu.ie && baidu.ie < 9) {
            barrage.show();
        }
        else {
            ad.base.setTimeout(function() {
                barrage.show();
            }, 500);
        }
    });

    return material;
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/widget/imageplus/tuhua/requester.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/05/30 16:12:12$
 */

goog.provide('ad.widget.imageplus.tuhua.requester');

/**
 * 图话数据请求类
 *
 * @constructor
 */
ad.widget.imageplus.tuhua.Requester = function() {
    // 图话检索端地址：弹幕
    this.host = 'http://imageplus.baidu.com/italk';
    // 图话检索端地址：非弹幕
    // this.host = 'http://yf-nm-fc00.yf01.baidu.com:8090/ui';
    // 当前用户
    this.currentUser = null;

    // 会话范围
    this.scopeType = 'image'; // image/site
};

/**
 * 设置后端地址
 *
 * @param {string} img
 */
ad.widget.imageplus.tuhua.Requester.prototype.getContextUrl = function(img) {
    if (this.scopeType === 'site') {
        return window.location.protocol + '//' + window.location.host;
    }
    return img;
};

/**
 * 设置后端地址
 *
 * @param {string} host
 */
ad.widget.imageplus.tuhua.Requester.prototype.setHost = function(host) {
    this.host = host;
};

/**
 * 请求函数
 *
 * @param {string} url 请求地址
 * @param {Function} callback 回调
 * @param {boolean=} opt_recordUser 是否记录当前用户信息
 */
ad.widget.imageplus.tuhua.Requester.prototype.request = function(url, callback, opt_recordUser) {
    var me = this;
    baidu.sio.callByServer(
        url,
        function(data) {
            if (opt_recordUser === true) {
                me.currentUser = data;
            }
            callback(data);
        },
        {
            charset: 'gbk'
        }
    );
};

/**
 * 获取评论
 */
ad.widget.imageplus.tuhua.Requester.prototype.getComments = function(img, callback) {
    var url = this.host + '?req_type=' + 1 + '&image_url=' + encodeURIComponent(this.getContextUrl(img));

    this.request(url, callback, true);
};

/**
 * 发表评论
 */
ad.widget.imageplus.tuhua.Requester.prototype.makeComment = function(img, comment, callback) {
    var url = this.host + '?req_type=' + 3
        + '&user_id=' + this.currentUser['user_id']
        + '&image_url=' + encodeURIComponent(this.getContextUrl(this.getContextUrl(img)))
        + '&reply_message=' + encodeURIComponent(comment);

    this.request(url, callback);
};

/**
 * 回复评论
 */
ad.widget.imageplus.tuhua.Requester.prototype.replyComment = function(img, lzId, commentId, reply, callback) {
    var url = this.host + '?req_type=' + 2
        + '&user_id=' + this.currentUser['user_id']
        + '&image_url=' + encodeURIComponent(this.getContextUrl(img))
        + '&lz_id=' + lzId
        + '&comment_id=' + commentId
        + '&reply_message=' + encodeURIComponent(reply);

    this.request(url, callback);
};

/**
 * 获取邮件
 */
ad.widget.imageplus.tuhua.Requester.prototype.getMails = function(img, callback) {
    var url = this.host + '?req_type=' + 4 + '&user_id=' + this.currentUser['user_id'];

    this.request(url, callback);
};

/**
 * 读取邮件详情
 */
ad.widget.imageplus.tuhua.Requester.prototype.getMailDetail = function(img, lzId, descId, callback) {
    var url = this.host + '?req_type=' + 5
        + '&user_id=' + this.currentUser['user_id']
        + '&lz_id=' + lzId
        + '&comment_id=' + descId;

    this.request(url, callback);
};

/**
 * 回复邮件
 */
ad.widget.imageplus.tuhua.Requester.prototype.replyMail = function(img, lzId, descId, reply, callback) {
    var url = this.host + '?req_type=' + 6
        + '&user_id=' + this.currentUser['user_id']
        + '&lz_id=' + lzId
        + '&reply_message=' + encodeURIComponent(reply);

    this.request(url, callback);
};

/**
 * 顶
 */
ad.widget.imageplus.tuhua.Requester.prototype.thumbUp = function(img, callback) {
    var url = this.host + '?req_type=' + 7
        + '&user_id=' + this.currentUser['user_id']
        + '&image_url=' + encodeURIComponent(this.getContextUrl(img));

    this.request(url, callback);
};

/**
 * 踩
 */
ad.widget.imageplus.tuhua.Requester.prototype.thumbDown = function(img, callback) {
    var url = this.host + '?req_type=' + 8
        + '&user_id=' + this.currentUser['user_id']
        + '&image_url=' + encodeURIComponent(this.getContextUrl(img));

    this.request(url, callback);
};

/**
 * 投诉
 */
ad.widget.imageplus.tuhua.Requester.prototype.makeComplain
    = function(img, lzId, commentId, complainType, complainOther, callback) {
        var url = this.host + '?req_type=' + 9
            + '&user_id=' + this.currentUser['user_id']
            + '&image_url=' + encodeURIComponent(this.getContextUrl(img))
            + '&lz_id=' + lzId
            + '&comment_id=' + commentId
            + '&complain_type=' + complainType
            + '&complain_other=' + encodeURIComponent(complainOther);

        this.request(url, callback);
    };

// 实例化
ad.widget.imageplus.tuhua.requester = new ad.widget.imageplus.tuhua.Requester();

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

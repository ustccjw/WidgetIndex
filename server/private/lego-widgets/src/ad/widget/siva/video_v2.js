/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/video_v2.js ~ 2013/11/18 17:45:44
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * video_v2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.require('ad.crypt.AntiCk');
goog.require('ad.widget.standard.Video');
goog.require('ui.events');
goog.include('ad/widget/siva/video_v2.less');
goog.include('ad/widget/siva/video_v2.html');

goog.provide('ad.widget.siva.VideoV2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.VideoV2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 用户已播放时间
     * @private
     * @type {number}
     */
    this._playTime = 0;

    /**
     * 是否是按点击收费，如果是，只统计视频开始
     * @private
     * @type {Boolean}
     */
    this._isCPC = true;

    /**
     * 是否已经在浮层视频外添加A标签
     * @private
     * @type {number}
     */
    this._isAddATag = 0;

    /**
     * 添加的A标签
     * @type {Object}
     */
    this._aTag = {};

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_video_v2';

    /**
     * @type {ad.widget.standard.Video}
     * @private
     */
    this._videoInstance;
};
baidu.inherits(ad.widget.siva.VideoV2, ad.widget.Widget);

/** @override */
ad.widget.siva.VideoV2.prototype.enterDocument = function() {
    ad.widget.siva.VideoV2.superClass.enterDocument.call(this);
    var me = this;
    if(COMPILED){
        if (document.readyState === 'complete') {
            me.initVideo();
        }
        else {
            baidu.on(window, 'load', function(){
                me.initVideo();
            });
        }
    }
    else{
        me.initVideo();
    }
};

ad.widget.siva.VideoV2.prototype.initVideo = function(){
    var me = this;
    var videoContainer = this.getDomById('video-container');

    if (this._videoInstance) {
        this._videoInstance.dispose();
        this._videoInstance = null;
    }

    var video = new ad.widget.standard.Video({
        'width': 259,
        'height': 146,
        'video_url': me._data['video_url'],
        'img_url': me._data['pic_url'],
        'big_img_url': me._data['big_pic_url'],
        'rcv_url': me._data['click_rcv_url'],
        'is_play': false,
        'playermode': 'small',
        'click_proxy': this.getId('click_proxy').replace(/[^a-zA-Z]/g, '')
    })
    videoContainer.innerHTML= video.getMainHtml();

    var events = {
        'VIDEO_START': ui.events.VIDEO_START,
        'VIDEO_FINISH': ui.events.VIDEO_FINISH,
        'VIDEO_CLICK': ui.events.VIDEO_CLICK,
        'VIDEO_PAUSE': ui.events.VIDEO_PAUSE,
        'VIDEO_CONTINUE': ui.events.VIDEO_CONTINUE,
        'VIDEO_AUTO': ui.events.VIDEO_AUTO
    }
    var bigVideo;
    var key;
    var trigged = false;

    for (key in events) {
        video.addListener(events[key], function(k) {
            return function() {
                me.trigger('SMALL_' + k, video.getSwf());
            }
        }(key));
    }

    video.addListener('VIDEO_OPEN_POPUP', function() {
        me.trigger('VIDEO_OPEN_POPUP', video.getSwf());
        if (!trigged) {
            bigVideo = video.getBigVideo();
            for (key in events) {
                bigVideo.addListener(events[key], function(k) {
                    return function() {
                        me.trigger('BIG_' + k, bigVideo.getSwf());
                    }
                }(key));
            }
            bigVideo.addListener('VIDEO_CLOSE_POPUP', function() {
                me.trigger('VIDEO_CLOSE_POPUP', bigVideo.getSwf());
            });
            trigged = true;
        }
    });

    video.enterDocument();
    //为了在Lego 模板预览时，禁用浮层
    if (top == self){
        video.bindEvent();
    }

    window[this.getId('click_proxy').replace(/[^a-zA-Z]/g, '')] = function(rcv_url){
        if (me._isAddATag == 0) {
            window.open(baidu.getAttr(videoContainer, 'href'));
        }
        else{
            window.open(me._aTag['href']);
        }
    }

    this._videoInstance = video;
}


/** @override */
ad.widget.siva.VideoV2.prototype.bindEvent = function(){
    var me = this
    
    this.addListener('SMALL_VIDEO_START', function(swf, e){
        me.startLog('small');
    });
    this.addListener('VIDEO_OPEN_POPUP', function(swf){
        me.startLog('big');
        me.isAddATag = 0;
        me._isAddATag = 0;
    });
    this.addListener('BIG_VIDEO_AUTO', function(swf){
        me.addATagToBigVideoContainer(swf);
    });
    this.addListener(['SMALL_VIDEO_PAUSE'], function(swf){
        me.pause('small');
    });
    this.addListener('SMALL_VIDEO_FINISH', function(swf){
        me.finishLog('small');
    });
    this.addListener('SMALL_VIDEO_CONTINUE', function(swf){
        me.startLog('small');
    });
    this.addListener('BIG_VIDEO_AUTO', function(swf){
        me.startLog('big');
    });
    this.addListener('BIG_VIDEO_START', function(swf){
        me.startLog('big');
    });
    this.addListener(['BIG_VIDEO_PAUSE'], function(swf){
        me.pause('big');
    });
    this.addListener('BIG_VIDEO_FINISH', function(swf){
        me.finishLog('big');
    });
    this.addListener('BIG_VIDEO_CONTINUE', function(swf){
        me.startLog('big');
    });
    this.addListener('VIDEO_CLOSE_POPUP', function(swf){
        me.isAddATag = 0;
        me._isAddATag = 0;
        me.closeLog();
    });


    // 只是在大小视频开始播放的时候各发一次计费请求
    if (me._isCPC) {
        this.addListener('SMALL_VIDEO_START', function(swf, e){
            me.sendBillingLog();
        });
        this.addListener('VIDEO_OPEN_POPUP', function(swf){
            me.sendBillingLog();
        });
    }
    
    var canvas = me.getDomById('video-container');
    baidu.event.on(canvas, 'click', function(e) {
        e = new baidu.event.EventArg(e);
        e.preventDefault();
    });
}


/**
 * 根据 id 得到 dom
 * @param {string} id dom节点的id.
 */
ad.widget.siva.VideoV2.prototype.getDomById = function(id ) {
    id = this.getId(id);
    return baidu.g(id);
};
ad.widget.siva.VideoV2.prototype.sendBillingLog = function() {
    var me = this;
    var imTimesign = ad.base.getObjectByName('E.pl.sivaTimesign');
    // var rcvUrl = me._data['click_rcv_url'];
    var videoContainer = me.getDomById('video-container');
    var rcvUrl = baidu.getAttr(videoContainer, 'href');
    baidu.sio.log(rcvUrl);
};

ad.widget.siva.VideoV2.prototype.log = function(data) {
    var logData = baidu.object.extend({
        'qid': (ad.base.getObjectByName('bds.comm.qid') || 'noqid'),
        'tag': 'siva-video-v2',
        't': (new Date).getTime()
    }, data);
    this.sendLog(logData);
}


/**
 * Send start log.
 */
ad.widget.siva.VideoV2.prototype.startLog = function(playermode) {
    var me = this;
    me.log({
        'type': 'start',
        'playermode' : playermode
    });
};



/**
 * Send pause log.
 */
ad.widget.siva.VideoV2.prototype.pause = function(playermode) {
    ad.base.clearInterval(this.logTimer);
    this.log({
        'type': 'pause',
        'playermode' : playermode,
        'time': this._playTime
    });
};


/**
 * Send finish log.
 */
ad.widget.siva.VideoV2.prototype.finishLog = function(playermode) {
    ad.base.clearInterval(this.logTimer);
    this.log({
        'type': 'finish',
        'playermode' : playermode,
        'time': this._playTime
    });
};


/**
 * Send close log.
 */
ad.widget.siva.VideoV2.prototype.closeLog = function() {
    ad.base.clearInterval(this.logTimer);
    this.log({
        'type': 'close',
        'time': this._playTime
    });
};

/**
 * 给弹窗视频添加a标签 ，获取ck
 */

ad.widget.siva.VideoV2.prototype.addATagToBigVideoContainer = function(swf){
    var videoContainer = swf.parentNode.parentNode;
    var imTimesign = ad.base.getObjectByName('E.pl.sivaTimesign');
    if (this._isAddATag == 0 && imTimesign) {
        var aTag = document.createElement('A');
        aTag.href = this._data['click_rcv_url'];
        aTag.insertBefore(swf.parentNode,null);
        aTag.id = 'ck-a' + new Date().getTime();
        baidu.event.on(aTag, 'click', function(e) {
            e = new baidu.event.EventArg(e);
            e.preventDefault();
        });
        videoContainer.insertBefore(aTag,null);
        this._isAddATag = 1;   
        this._aTag = aTag;
        var ck = new ad.crypt.AntiCk(aTag, imTimesign);
    }
};

/**
 * @override
 */
ad.widget.siva.VideoV2.prototype.dispose = function() {
    if (this.logTimer) {
        ad.base.clearInterval(this.logTimer);
        this.logTimer = null;
    }
    if (this._videoInstance) {
        this._videoInstance.dispose();
        this._videoInstance = null;
    }
    ad.widget.siva.VideoV2.superClass.dispose.call(this);
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

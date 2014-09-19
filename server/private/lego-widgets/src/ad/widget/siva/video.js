/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/video.js ~ 2013/09/21 10:17:37
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 150523 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/video.less');
goog.include('ad/widget/siva/video.html');

goog.provide('ad.widget.siva.Video');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Video = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_video';

    /**
     * 用简单的方法判断一下是否是lego服务端预览的环境.
     * @type {boolean}
     * @private
     */
    this._srvEnv = (location && location.protocol && location.protocol === "file:");
};
baidu.inherits(ad.widget.siva.Video, ad.widget.Widget);

/** @override */
ad.widget.siva.Video.prototype.enterDocument = function() {
    ad.widget.siva.Video.superClass.enterDocument.call(this);
    this.enterDocumentInternal();
};

/** @override */
ad.widget.siva.Video.prototype.bindEvent = function() {
    ad.widget.siva.Video.superClass.bindEvent.call(this);
    var me = this;
    baidu.event.on(this.videoContainer, 'click', function(e) {
        e = new baidu.event.EventArg(e);
        e.preventDefault();
        if (baidu.dom.hasClass(e.target, 'ad-widget-siva-video-close')) {
            me.stop();
        }
    });
};

/** @override */
ad.widget.siva.Video.prototype.patchData = function() {
    if (this._data) {
        this._data['toolHeight'] = 20;
        this._data['width'] = 270;
        this._data['height'] = 160;
        this._data['flashOptions'] = {
            'url': RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/f2741314927ea6149bdab282f4f44a44.swf',
            'width': this._data['width'],
            'height': this._data['height'],
            'menu': false,
            'quality': 'high',
            'wmode': 'transparent',
            'allowScriptAccess': 'always',
            'id': 'siva-video-' + this.getId(),
            'allowFullScreen': true
        };
        this._data['flashVars'] = {
            'isplay': false,
            'flashHeight': this._data['height'],
            'flashWidth': this._data['width'],
            'toolHeight': 20
        };
    }
};

/**
 * Init the video, params, flashvars, callbacks.
 */
ad.widget.siva.Video.prototype.enterDocumentInternal = function() {
    var me = this;
    this.videoContainer = baidu.g(this.getId('video-container'));
    this.picurl = baidu.getAttr(this.videoContainer, 'data-picurl');
    this.clickurl = baidu.getAttr(this.videoContainer, 'href');
    this.videourl = baidu.getAttr(this.videoContainer, 'data-videourl');

    this._data['flashVars']['flvurl'] = this.videourl;
    this._data['flashVars']['imgurl'] = this.picurl;
    this._data['flashVars']['Track'] = this.getId('Track').replace(/[^a-zA-Z]/g, '');
    this._data['flashVars']['OpenCstUrl'] = this.getId('OpenCstUrlCallBack').replace(/[^a-zA-Z]/g, '');
    //this._data.flashVars.clickUrl = this.clickurl;
    this.playTime = 0;

    window[this._data['flashVars']['Track']] = function(state){
        if ('play' == state) {
            me.play();
        } else if ('finish' == state) {
            me.stop();
        } else if ('pause' == state) {
            me.pause();
        }
    }

    window[this._data['flashVars']['OpenCstUrl']] = function(){
        ad.base.setTimeout(function() {
            window.open(baidu.getAttr(me.videoContainer, 'href'));
        }, 50);
    }
    
    var html = this.createFlash(null, null);
    // 在lego投放是会提示错误，经排查是htmlunit的问题，先通过如下办法绕过
    if ( !this._srvEnv ) {
        this.videoContainer.innerHTML = html;
    }
};

/**
 * Zoom in the Video.
 */
ad.widget.siva.Video.prototype.zoomIn = function() {
    var html = this.createFlash({'width': 440, 'height': 280}, {'flashWidth': 440, 'flashHeight': 280, 'isplay': true, 'toolHeight': 20});
    // 在lego投放是会提示错误，经排查是htmlunit的问题，先通过如下办法绕过
    if ( !this._srvEnv ) {
        this.videoContainer.innerHTML = html + '<i class="ad-widget-siva-video-close"></i>';
    }
    this.hasZoomIn = true;
};

/**
 * Zoom out the Video.
 */
ad.widget.siva.Video.prototype.zoomOut = function() {
    var html = this.createFlash({'width': this._data.width, 'height': this._data.height}, {'flashWidth': this._data.width, 'flashHeight': this._data.height, 'isplay': false});
    // 在lego投放是会提示错误，经排查是htmlunit的问题，先通过如下办法绕过
    if ( !this._srvEnv ) {
        this.videoContainer.innerHTML = html;
    }
    this.hasZoomIn = false;
};

/**
 * Do zoom-in, send start log and charge in play.
 */
ad.widget.siva.Video.prototype.play = function() {
    this.charge('hide');
    var $container = baidu.g('container'), zoomIn = false;
    if (!this.hasZoomIn && zoomIn) {
        this.zoomIn();
    }
    this.startLog();
};

/**
 * Do zoom-out, send stop log and charge when stop.
 */
ad.widget.siva.Video.prototype.stop = function() {
    if (this.hasZoomIn) {
        this.zoomOut();
    }
    this.stopLog();
};

/**
 * Send pause log when pause.
 */
ad.widget.siva.Video.prototype.pause = function() {
    ad.base.clearInterval(this.logTimer);
    this.log({
        'type': 'pause',
        'time': this.playTime
    });
};

/**
 * Send start, pause, stop log.
 * @param {Object} data Data for send log.
 */
ad.widget.siva.Video.prototype.log = function(data) {
    var logData = baidu.object.extend({
        'qid': (window['bds'] && window['bds']['comm'] && window['bds']['comm']['qid']) || 'noqid',
        'tag': 'siva-video',
        't': (new Date).getTime()
    }, data), params = [], key, url = RT_CONFIG.HOST('fclick.baidu.com') + '/w.gif?';
    for (key in logData) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(logData[key]));
    }
    var img = document.createElement('img');
    img.src = url + params.join('&');
};

/**
 * Send start log.
 */
ad.widget.siva.Video.prototype.startLog = function() {
    var me = this;
    me.log({
        'type': 'start',
        'time': me.playTime
    });
    this.logTimer = ad.base.setInterval(function() {
        ++me.playTime;
        me.log({
            'type': 'playing',
            'time': me.playTime
        });
    }, 1000);
};

/**
 * Send stop log.
 */
ad.widget.siva.Video.prototype.stopLog = function() {
    ad.base.clearInterval(this.logTimer);
    this.log({
        'type': 'stop',
        'time': this.playTime
    });
    this.playTime = 0;
};

/**
 * Create flash object by baidu.swf.createHTML().
 * @return {string} Created HTML for flash.
 * @param {Object} options Flash options, see http://1.5.13-tangram.baidu.com.r.bae.baidu.com:8081/api.html#baidu.swf.createHTML  .
 * @param {Object} vars Flashvars, see http://1.5.13-tangram.baidu.com.r.bae.baidu.com:8081/api.html#baidu.swf.createHTML  .
 */
ad.widget.siva.Video.prototype.createFlash = function(options, vars) {
    vars = baidu.object.extend(this._data['flashVars'], vars || {});
    this._data['flashOptions'] = baidu.object.extend(this._data['flashOptions'], options || {});
    this._data['flashOptions']['vars'] = vars;
    var html = baidu.swf.createHTML(this._data['flashOptions']);
    if( '' == html ){
        var $errorContainer = document.createElement('div');
        $errorContainer.innerHTML = '<a target="_blank" href="http://get.adobe.com/cn/flashplayer">您的浏览器不支持或禁用了Flash，请点击安装。</a>';
        baidu.dom.addClass($errorContainer, 'ad-widget-siva-video-noflash');
        this.videoContainer.parentNode.replaceChild( $errorContainer, this.videoContainer );
    }
    return html;
};

/**
 * Charge by opening a new window or sending img log.
 * @param {string} type Charege type, 'newWindow' for opening a new window or 'hide' for send an image log.
 */
ad.widget.siva.Video.prototype.charge = function(type) {
    var me = this;
    ad.base.setTimeout(function() {
        var url = baidu.getAttr(me.videoContainer, 'href');
        if ('newWindow' == type) {
            window.open(url);
        } else if ('hide' == type) {
            var img = document.createElement('img');
            img.src = url;
            ad.widget.siva.Video['img' + me.getId()] = img.src;
        }
    }, 50);
};

/**
 * @override
 */
ad.widget.siva.Video.prototype.dispose = function() {
    if (this.logTimer) {
        ad.base.clearInterval(this.logTimer);
        this.logTimer = null;
    }
    ad.widget.siva.Video.superClass.dispose.call(this);
};


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

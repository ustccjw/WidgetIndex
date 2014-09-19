/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h4.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/video.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.require('ad.base');
goog.include('ad/widget/video.html');
goog.include('ad/widget/video.less');

goog.provide('ad.widget.Video');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Video = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_video';
};
baidu.inherits(ad.widget.Video, ad.widget.Widget);

/** @override */
ad.widget.Video.prototype.patchData = function() {
    var bcsHost = RT_CONFIG.HOST('ecma.bdimg.com') + '/public01/player/';
    var playerCandidates = [
        'ecomVideo.swf',
        'ecomVideo2.swf',
        'ecomVideo3.swf',
        'ecomVideo4.swf', // 进度条自动隐藏
        'ecomVideo5c.swf', // '//eiv.baidu.com/mapm2/flashplayer/ecomVideo5.swf',
        'ecomVideo6.swf', // 无进度条（俊杰修改版）
        'ecomVideo7.swf' // 2013新版: 支持点击弹出浮层视频
    ];

    if (this._data) {
        var disableAutoPlay = !this._data['is_play'] || (this._data['is_play'] === 'false');
        this._data['jsapi'] = this.getId('jsapi').replace(/[^a-zA-Z]/g, '');
        this._data['OpenCstUrlCallBack'] = this.getId('OpenCstUrlCallBack').replace(/[^a-zA-Z]/g, '');
        this._data['TrackCallBack'] = this.getId('TrackCallBack').replace(/[^a-zA-Z]/g, '');
        this._data['is_play'] = !disableAutoPlay;
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['width'] = this._data['width'] || 220;
        this._data['height'] = this._data['height'] || 190;

        var playerVerion = this._data['player_ver'] || 5;
        this._data['player_url'] = bcsHost + playerCandidates[playerVerion - 1];
        if (parseInt(playerVerion, 10) === 7) {
            this._data['ipad_img'] = this._data['img_url'];
        }

    }
};

/** @override */
ad.widget.Video.prototype.enterDocument = function() {
    var me = this;
    window[me._data['jsapi']] = function(id, eventType, var_args) {
        me.trigger('VIDEO_' + eventType, var_args);
    };
    ad.widget.Video.superClass.enterDocument.call(this);
};

/** @override */
ad.widget.Video.prototype.bindEvent = function() {
    var me = this,
        container = baidu.g(me.getId('video-container')),
        url = me._data['rcv_url'],
        clickProxy = me._data['click_proxy'];
    if (!me._data['is_ipad']) {
        window[me._data['OpenCstUrlCallBack']] = function() {
            if (me.trigger(ui.events.VIDEO_CLICK) !== false) {
                me.sendLog('视频链接跳转', 'videojump');
            }
            if (url) {
                // 使用其他函数取代默认跳转功能
                if (clickProxy && (typeof window[clickProxy]) === 'function') {
                    window[clickProxy](url);
                } else {
                    window.open(url);
                }
            }
        };

        window[me._data['TrackCallBack']] = function(num) {
            // 精算统计播放时间
            var mktIndex = (window['_mkt'] && me._data['mkt_index']) ? me._data['mkt_index'] : 0;
            if (num === 0) {
                if (me.trigger(ui.events.VIDEO_START) !== false) {
                    me.sendLog('手动播放', 'videostart');
                    if (mktIndex) {
                        window['_mkt'].push('_startTimer', mktIndex);
                    }
                }
            } else if (num === 2) {
                if (me.trigger(ui.events.VIDEO_FINISH) !== false) {
                    me.sendLog('播放完成', 'videocomplete');
                    if (mktIndex) {
                        window['_mkt'].push('_stopTimer', mktIndex);
                    }
                }
            } else if (num === 3) {
                if (me.trigger(ui.events.VIDEO_PAUSE) !== false) {
                    me.sendLog('暂停播放', 'videopause');
                    if (mktIndex) {
                        window['_mkt'].push('_pauseTimer', mktIndex);
                    }
                }
            } else if (num === 4) {
                if (me.trigger(ui.events.VIDEO_CONTINUE) !== false) {
                    me.sendLog('继续播放', 'videocontinue');
                    if (mktIndex) {
                        window['_mkt'].push('_continueTimer', mktIndex);
                    }
                }
            } else if (num === 5) {
                if (me.trigger(ui.events.VIDEO_AUTO) !== false) {
                    me.sendLog('自动播放', 'videoauto');
                }
            }
        };
    } else {
        if (container) {
            baidu.on(container, 'click', function(e) {
                // if (me.trigger(ui.events.VIDEO_CLICK) !== false) {
                    // 是链接跳转，这里没必要手动发送
                    // me.sendLog('视频链接跳转(ipad)', 'videojump');
                // } else {
                if (me.trigger(ui.events.VIDEO_CLICK) === false) {
                    baidu.event.stop(e);
                }
            });
        }
    }
};

/**
 * 暂停
 */
ad.widget.Video.prototype.pause = function() {
    var movie = this.getSwf();
    if (movie) {
        movie['swfVideoPause']();
    }
};

/**
 * 切换视频文件
 * @param {string=} videoUrl 视频地址（.flv/.mp4）
 * @return {boolean} true/false.
 */
ad.widget.Video.prototype.setVideo = function(videoUrl) {
    // 暂时只有v7支持此功能
    if (this._data['player_ver'] !== 7) {
        return false;
    }
    var movie = this.getSwf();
    if (movie) {
        movie['swfSetVideoUrl'](videoUrl);
        return true;
    } else {
        return false;
    }
};

/**
 * 获得播放器的swf实例，用于Js-As通信
 * @return {Element} 判断浏览器返回其swf实例
 */
ad.widget.Video.prototype.getSwf = function() {
    var videoObjId = this.getId('objad');
    return ad.base.getMovie(videoObjId);
};

/**
 * 跳转
 * 当该模块处理一些自定义行为而阻止了默认的跳转时，手动调用该方法
 * @param {string=} url 跳转地址.
 */
ad.widget.Video.prototype.redirect = function(url) {
    if (url) {
        window.open(url);
    } else if (this._data['rcv_url']) {
        window.open(this._data['rcv_url']);
    }
};

/**
 * @override
 * 保留video的root, 以便refresh
 * 因为video比较特殊，在浮层视频关闭时需要dispose，打开时refresh
 * 没有root无法完成refresh
 */
ad.widget.Video.prototype.dispose = function() {
    if (baidu.ie && baidu.ie < 10) {
        this.clearFlashLeakInIE(this.getId('objad'));
    }
    var root = this.getRoot();
    if (root) {
        root.innerHTML = '';
        root = null;
    }
    ad.widget.Video.superClass.dispose.call(this);
};

ad.widget.Video.prototype.clearFlashLeakInIE = function(objid) {
    var obj = document.getElementById(objid);
    if (obj) {
        for (var i in obj) {
            if (typeof obj[i] === 'function') {
                obj[i] = null;
            }
        }
        obj.parentNode.removeChild(obj);
    }
};

/* vim: set ts=4 sw=4 sts=4 tw=100 : */

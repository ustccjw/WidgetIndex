/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/widget/imageplus/tuhua/effect/simple_timeline.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/16 18:15:49$
 */

goog.require('base.EventDispatcher');
goog.require('ad.widget.imageplus.tuhua.effect.status');

goog.provide('ad.widget.imageplus.tuhua.effect.SimpleTimeline');

/**
 * @constructor
 * @param {Object} options 选项
 * @extends {base.EventDispatcher}
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline = function(options) {
    base.EventDispatcher.call(this);

    /**
     * @type {number}
     */
    this.duration = 500;

    /**
     * @type {boolean}
     */
    this.dynamic  = true;

    /**
     * @type {string}
     */
    this.__type;

    /**
     * @type {number}
     */
    this._btime;

    /**
     * @type {number}
     */
    this._etime;

    /**
     * @type {Object}
     */
    this.statusMap = ad.widget.imageplus.tuhua.effect.status;

    /**
     * @type {ad.widget.imageplus.tuhua.effect.status}
     */
    this.status = this.statusMap.CREATED;

    baidu.object.extend(this, options);
}
baidu.inherits(ad.widget.imageplus.tuhua.effect.SimpleTimeline, base.EventDispatcher);

/**
 * 启动
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.launch = function() {
    this.status = this.statusMap.RUNING;
    this._btime = new Date().getTime();
    this._etime = this._btime + (this.dynamic ? this.duration : 0);
    this.pulsed();

    return this;
};

/**
 * 一帧动画
 * @param {boolean=} opt_ignoreStatus 是否忽略状态
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.pulsed = function(opt_ignoreStatus) {
    if (opt_ignoreStatus !== true && this.status != this.statusMap.RUNING) {
        return;
    }
    var me = this;
    var now = new Date().getTime();
    // 当前时间线的进度百分比
    me.percent = (now - me._btime) / me.duration;

    // 时间线已经走到终点
    if (now >= me._etime){
        me.render(me.percent = 1);
        me.trigger("onafterfinish");
        me.dispose();
        return;
    }

    me.render(me.percent);
};

/**
 * 暂停
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.pause = function() {
    if (this.status == this.statusMap.RUNING) {
        this.status = this.statusMap.PAUSED;

        this.pausedTime = new Date().getTime();
    }
};

/**
 * 继续
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.resume = function() {
    if (this.status == this.statusMap.PAUSED) {
        this.status = this.statusMap.RUNING;

        var now = new Date().getTime();
        this._btime += now - this.pausedTime;
        this._etime += now - this.pausedTime;
    }
}

/**
 * 结束
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.end = function() {
    var status = this.statusMap.ENDED;
    this._etime = this._btime;
    this.pulsed(true);

    this.status = status;
}

/**
 * 销毁
 */
ad.widget.imageplus.tuhua.effect.SimpleTimeline.prototype.dispose = function() {
    this.disposed = true;
    this.trigger(ui.events.DISPOSE);

    for(var property in this){
        if (!baidu.lang.isFunction(this[property])) {
            delete this[property];
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

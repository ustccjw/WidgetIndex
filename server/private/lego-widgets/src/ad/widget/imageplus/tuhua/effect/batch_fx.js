/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/widget/imageplus/tuhua/effect/fx.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/16 19:18:40$
 */

goog.require('ad.fx');
goog.require('ad.widget.imageplus.tuhua.effect.status');
goog.require('ad.widget.imageplus.tuhua.effect.SimpleTimeline');

goog.provide('ad.widget.imageplus.tuhua.effect.BatchFx');

/**
 * @constructor
 * 批量特效
 */
ad.widget.imageplus.tuhua.effect.BatchFx = function(options) {
    /**
     * @type {Array.<ad.widget.imageplus.tuhua.effect.SimpleTimeline>}
     */
    this.list = [];

    /**
     * @type {Object}
     */
    this.statusMap = ad.widget.imageplus.tuhua.effect.status;

    /**
     * @type {ad.widget.imageplus.tuhua.effect.status}
     */
    this.status = this.statusMap.CREATED;

    /**
     * 是否处于暂停状态
     * 这个跟status里的pause不一样：可能在start之前就暂停了，但是status仍然应该是CREATED
     *
     * @type {boolean}
     */
    this.isPausing = false;

    /**
     * @type {number}
     * @deprecated
     */
    this.interval = options.interval != null ? options.interval : 16;

    /**
     * @type {number}
     */
    this.timer;
};

/**
 * 从特效队列里删除特效
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.remove = function(fx) {
    for (var i = 0; i < this.list.length; i++) {
        if (fx === this.list[i]) {
            this.list.splice(i, 1);
            break;
        }
    }
};

/**
 * @param {Element} element The element attached to the ad.fx.Timeline
 * @param {Object} options The ad.fx.Timeline configuration.
 * @param {string=} fxName the ad.fx.Timeline name.
 * @return {ad.widget.imageplus.tuhua.effect.SimpleTimeline}
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.create = function(element, options, fxName) {
    var me = this;
    var fx = new ad.widget.imageplus.tuhua.effect.SimpleTimeline(options);
    fx.addListener(ui.events.DISPOSE, function() {
        me.remove(fx);
    });

    this.list.push(fx);
    return fx;
};

/**
 * 启动批量特效
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.start = function() {
    if (this.status === this.statusMap.CREATED
        || this.status === this.statusMap.ENDED
    ) {
        this.setStatus(this.statusMap.RUNING);

        this.pulsed();
    }
};

/**
 * 设置状态
 * @param {ad.widget.imageplus.tuhua.effect.status} status
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.setStatus = function(status) {
    if (this.isPausing
        && status === this.statusMap.RUNING
    ) {
        this.status = this.statusMap.PAUSED;
        this.pauseFx();
    }
    else {
        this.status = status;
    }
};

/**
 * 节拍
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.pulsed = function() {
    var fxList = this.list.slice(0);
    baidu.each(fxList, function(fx) {
        fx.pulsed();
    });
    var me = this;
    this.timer = ad.fx.requestAnimationFrame(
        function(){
            me.pulsed();
        }
    );
};

/**
 * 暂停
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.pause = function() {
    this.isPausing = true;
    if (this.status === this.statusMap.RUNING) {
        this.setStatus(this.statusMap.PAUSED);

        this.pauseFx();
    }
};

/**
 * 暂停所有fx
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.pauseFx = function() {
    var fxList = this.list.slice(0);
    baidu.each(fxList, function(fx) {
        fx.pause();
    });
};

/**
 * 继续
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.resume = function() {
    this.isPausing = false;
    if (this.status === this.statusMap.PAUSED) {
        this.setStatus(this.statusMap.RUNING);

        var fxList = this.list.slice(0);
        baidu.each(fxList, function(fx) {
            fx.resume();
        });
    }
};

/**
 * 结束
 */
ad.widget.imageplus.tuhua.effect.BatchFx.prototype.end = function() {
    var fxList = this.list.slice(0);
    baidu.each(fxList, function(fx) {
        fx.end();
    });
    this.list = [];
    this.setStatus(this.statusMap.ENDED);
    if (this.timer) {
        ad.fx.cancelAnimationFrame(this.timer);
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

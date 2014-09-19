/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/milestone_bk.js ~ 2014/02/20 10:27:00
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 10927 $
 * @description
 * milestone_bk相关的实现逻辑
 **/

goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/milestone_bk.less');
goog.include('ad/widget/zhixin/milestone_bk.html');

goog.provide('ad.widget.zhixin.MilestoneBk');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.MilestoneBk = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_milestone_bk';
};
baidu.inherits(ad.widget.zhixin.MilestoneBk, ad.widget.Widget);

/**
 * @private
 */
ad.widget.zhixin.MilestoneBk.prototype._initPool = function() {
    var me = this;
    var originalPool = this.getData('options');
    var originalPoolSize = originalPool.length;

    var viewableCount = this._INIT_VIEWABLE_COUNT;
    var viewablePool = [];

    function init() {
        for (var i = 0; i < originalPoolSize; i ++) {
            viewablePool.push(originalPool[i]);
        }
    }

    while (viewablePool.length < viewableCount) {
        init();
    }

    this._data['_viewable_pool'] = viewablePool;
};

/**
 * @override
 */
ad.widget.zhixin.MilestoneBk.prototype.patchData = function() {
    // 这里很多暂时写死吧，本来就是个定制样式
    // 95px大概是7个字，pm定的
    var itemCount = this.getData('options').length;

    this._stepWidth = '95';
    this._INIT_VIEWABLE_COUNT = 5;
    this._initPool();
    this._data['_item_body_width'] = (this._stepWidth * itemCount) + 'px';
    this._length = itemCount;
    this._hasRun = 0;
    this._left = 0;
};

/**
 * @param {string=} opt_direction 滚动的方向.
 * @private
 */
ad.widget.zhixin.MilestoneBk.prototype._scroll = function(opt_direction) {
    if (this._running) {
        return;
    }

    // 如果duration胡乱被设置了，有可能是NaN
    var duration = parseInt(this.getData('duration', 800), 10) || 800;

    var me = this;
    var element = baidu.g(this.getId('milestones'));
    var steps = this._stepWidth;
    var unit = (opt_direction === 'right') ? 1 : -1;

    if (unit === -1) {
        if (me._hasRun + 1 < me._length - this._INIT_VIEWABLE_COUNT + 1) {
            me._hasRun++;
        }
        else {
            return;
        }
    }
    else {
        if (me._hasRun - 1 >= 0) {
            me._hasRun--;
        }
        else {
            return;
        }
    }

    var fx = ad.fx.create(element, {
        __type: 'hello',
        duration: duration,
        render: function(schedule) {
            element.style.left = (me._left + (unit * steps * schedule)) + 'px';
        }
    }, "ad.fx.move");
    fx.addEventListener('onbeforestart', function() {
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
        me._left = -me._hasRun * me._stepWidth;
    });
    fx.launch();
    this._running = true;
};

/**
 * 展示前一个图片
 * @private
 */
ad.widget.zhixin.MilestoneBk.prototype._prev = function() {
    this._scroll('right');
};

/**
 * 展示下一个图片
 * @private
 */
ad.widget.zhixin.MilestoneBk.prototype._next = function() {
    this._scroll();
};

/**
 * 处理跟滚动相关的事件.
 * @private
 */
ad.widget.zhixin.MilestoneBk.prototype._bindScrollEvent = function() {
    var me = this;

    ad.dom.on(this.getId('left-arrow'), 'click', function(){
        me._prev();
        if (false !== me.trigger(ui.events.ARROW_LEFT)) {
            me.sendLog('arrowleft', 'arrowleft');
        }
    });

    ad.dom.on(this.getId('right-arrow'), 'click', function(){
        me._next();
        if (false !== me.trigger(ui.events.ARROW_RIGHT)) {
            me.sendLog('arrowright', 'arrowright');
        }
    });
};

/**
 * @override
 */
ad.widget.zhixin.MilestoneBk.prototype.bindEvent = function() {
    this._bindScrollEvent();
};

/* vim: set ts=4 sw=4 sts=4 tw=100: */

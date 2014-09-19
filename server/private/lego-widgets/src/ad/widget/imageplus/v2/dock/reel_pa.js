/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/reel_pa.js ~ 2014/09/05 11:51:01
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * reel_pa相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.dom');
goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/dock/reel_pa.less');
goog.include('ad/widget/imageplus/v2/dock/reel_pa.html');

goog.provide('ad.widget.imageplus.v2.dock.ReelPa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.dock.ReelPa = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_reel_pa';

    /**
     * 第一次展现时保持最大高度的时间
     * @type {number}
     */
    this._firstShowTime = 0;

    ad.widget.imageplus.v2.BaseWidget.call(this, data);
};
baidu.inherits(ad.widget.imageplus.v2.dock.ReelPa, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.dock.ReelPa.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.ReelPa.superClass.enterDocument.call(this);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var me = this;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        this.g(this.getId('content')).style.width = rect['width'] + 'px';

        loaderApi.addListener(ui.events.RESIZE, function(event, rect) {
            me.g(me.getId('content')).style.width = rect['width'] + 'px';
        });
    }
    if (loaderApi && me._firstShowTime) {
        me._firstShow(loaderApi);
    }
    else {
        me.withdrawPaper();
    }

    // 鼠标悬浮展现
    loaderApi.addListener(ui.events.MOUSE_OVER, function() {
        me.expandPaper();
    });
    loaderApi.addListener(ui.events.MOUSE_OUT, function() {
        me.withdrawPaper();
    });

    // 关闭
    baidu.on(this.g(this.getId('close')), 'click', function(e) {
        me.trigger(ui.events.BOX_CLOSE);

        baidu.event.preventDefault(e);
    });
    var paper = me.g(me.getId('paper'));
    baidu.on(paper, 'mouseenter', function(e) {
        if (!me.isShowing) {
            me.expandPaper();
        }
    });
    var reel = me.g(me.getId('reel'));
    baidu.on(reel, 'mouseenter', function(e) {
        if (!me.isShowing) {
            me.expandPaper();
        }
    });
};

/** @override */
ad.widget.imageplus.v2.dock.ReelPa.prototype.bindEvent = function() {
    ad.widget.imageplus.v2.dock.ReelPa.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.imageplus.v2.dock.ReelPa.prototype.patchData = function() {
    this._firstShowTime = this.getData('box.first_show_time', 5000);

    ad.widget.imageplus.v2.dock.ReelPa.superClass.patchData.apply(this, arguments);
};

/**
 * 变化特效
 * @param {number} from 开始数值
 * @param {number} to 结束数值
 * @param {Function=} opt_finish 结束回调函数
 * @param {Function=} opt_start 开始回调函数
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.widthEffect = function(from, to, opt_finish, opt_start) {
    var me = this;
    var duration = 600;
    var element = me.g(me.getId('paper'));
    if (this.isEffectRunning) {
        this._fx.end();
    }
    var fx = ad.fx.create(element, {
        __type: 'width-change',
        duration: duration,
        render: function(schedule) {
            element.style.width = (from + (to - from) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me.isEffectRunning = false;
        opt_finish && opt_finish();
    });
    fx.addEventListener('onbeforestart', function() {
        opt_start && opt_start();
    });
    fx.launch();
    this._fx = fx;
    this.isEffectRunning = true;
};

/**
 * 显示
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.expandPaper = function(opt_logSilent) {
    var me = this;

    if (this._firstTimer) {
        ad.base.clearTimeout(this._firstTimer);
        this._firstTimer = null;
    }
    if (this.showTimer) {
        // 如果之前因为scroll展现过，则删除定时隐藏的定时器
        // 并展现广告
        ad.base.clearTimeout(this.showTimer);
        this.showTimer = null;
        this.isShowing = false;
    }

    var paper = me.g(me.getId('paper'));
    me.widthEffect(
        paper.offsetWidth,
        paper.parentNode.offsetWidth,
        function() {
            ad.dom.hide(me.g(me.getId('reel')));
            paper.style.width = '100%';
        },
        function() {
            me.stopBounce();
        }
    );

    if (!me.isShowing) {
        me.isShowing = true;
        baidu.show(me.g(me.getId('close')));
        if (opt_logSilent !== true) {
            me.trigger(ui.events.BOX_SHOW);
        }
    }
};

/**
 * 隐藏
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.withdrawPaper = function(opt_logSilent) {
    var me = this;

    var paper = me.g(me.getId('paper'));
    var img = me.g(me.getId('img'));
    var targetWidth = img.offsetWidth
        + parseInt(ad.dom.getStyle(img, 'margin-left') || 0, 10)
        + parseInt(ad.dom.getStyle(img, 'margin-right') || 0, 10)
        + 20;
    me.widthEffect(
        paper.offsetWidth,
        targetWidth,
        function() {
            baidu.hide(me.g(me.getId('close')));
            me.startBounce();
        },
        function() {
            // 放到这，是因为widthEffect调用的时候会调用fx.end，结果执行了expandPaper中widthEffect的
            // finish函数，导致reel又被隐藏掉
            baidu.show(me.g(me.getId('reel')));
        }
    );

    if (me.isShowing) {
        me.isShowing = false;
        if (opt_logSilent !== true) {
            me.trigger(ui.events.BOX_HIDE);
        }
    }
};

/**
 * 第一次展现的逻辑
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype._firstShow = function (loaderApi) {
    var me = this;
    ad.base.setTimeout(function () {
        me.expandPaper();
        me._firstTimer = ad.base.setTimeout(function () {
            me.withdrawPaper();
        }, me._firstShowTime);
    }, 0);
};

/**
 * 开始跳动
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.startBounce = function() {
    var me = this;
    me.stopBounce();

    var img = me.g(me.getId('img'));
    var targetWidth = img.offsetWidth
        + parseInt(ad.dom.getStyle(img, 'margin-left') || 0, 10)
        + parseInt(ad.dom.getStyle(img, 'margin-right') || 0, 10)
        + 20;

    var direction = true;
    function run() {
        me._bounceTimer = ad.base.setTimeout(function() {
            me.bounceEffect(
                direction ? targetWidth : targetWidth + 50,
                direction ? targetWidth + 50 : targetWidth,
                direction ? 600 : 600
            );
            direction = !direction;
            run();
        }, direction ? 10000 : 1000);
    }
    run();
};

/**
 * 停止跳动
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.stopBounce = function() {
    if (this._bounceFx) {
        try {
            this._bounceFx.end();
        }
        catch (e) {}
    }
    if (this._bounceTimer) {
        ad.base.clearTimeout(this._bounceTimer);
    }
};

/**
 * bounce变化特效
 * @param {number} from 开始数值
 * @param {number} to 结束数值
 * @param {number} duration 持续时间
 */
ad.widget.imageplus.v2.dock.ReelPa.prototype.bounceEffect = function(from, to, duration) {
    var me = this;
    var element = me.g(me.getId('paper'));
    var fx = ad.fx.create(element, {
        __type: 'bounce-change',
        duration: duration,
        render: function(schedule) {
            element.style.width = (from + (to - from) * schedule) + 'px';
        }
    });
    fx.launch();
    this._bounceFx = fx;
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */

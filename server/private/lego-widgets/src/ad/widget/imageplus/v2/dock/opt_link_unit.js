/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/opt_link_unit.js ~ 2014/07/07 07:17:58
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * opt_link_unit相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');
goog.require('ad.widget.imageplus.LinkUnit');

goog.include('ad/widget/imageplus/v2/dock/opt_link_unit.less');
goog.include('ad/widget/imageplus/v2/dock/opt_link_unit.html');

goog.provide('ad.widget.imageplus.v2.dock.OptLinkUnit');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.dock.OptLinkUnit = function(data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_opt_link_unit';

    /**
     * 是否特效正在运行当中
     * @type {boolean}
     */
    this.isEffectRunning = false;

    /**
     * 是否在显示状态
     * @type {boolean}
     */
    this.isShowing = false;

    /**
     * @type {?number}
     */
    this.showTimer = null;
};
baidu.inherits(ad.widget.imageplus.v2.dock.OptLinkUnit, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.OptLinkUnit.superClass.enterDocument.call(this);

    var main = this.g(this.getId('main'));
    var luBox = this.getData('box.lu', {});
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    if (loaderApi) {
        // 宽度应该根据底图调整，后端返回的被覆盖掉
        var rect = loaderApi.getImgRect();
        luBox['width'] = rect['width'];
    }
    else {
        if (!COMPILED) {
            luBox['width'] = luBox['width'] || 980;
            luBox['height'] = luBox['height'] || 90;
        }
    }
    this.lu = new ad.widget.imageplus.LinkUnit(
        this.getData('adlist', []),
        luBox,
        {
            'doc': this.getDocument()
        }
    );
    this.lu.render(main);

    // 可视部分的高度
    var cutEle = this.g(this.getId('cut'));
    cutEle.style.height = this.cutHeight + 'px';

    var mainEle = this.g(this.getId('main'));
    mainEle.style.position = 'absolute';
    mainEle.style.top = this.barHeight + 'px';
    mainEle.style.left = '0';

    var me = this;
    var close = me.g(this.getId('close'));
    baidu.on(close, 'click', function (e) {
        baidu.event.preventDefault(e);
        me.trigger(ui.events.BOX_CLOSE);
    });

    me.addListener(ui.events.BOX_MOUSE_MOVE, function() {
        // XXX: 不需要？
        // me.trigger(ui.events.BOX_SHOW);
    });

    me.addListener(ui.events.BOX_MOUSE_OVER, function() {
        me.show();
        me.trigger(ui.events.BOX_SHOW);
    });

    me.addListener(ui.events.BOX_MOUSE_OUT, function() {
        me.hide();
        me.trigger(ui.events.BOX_HIDE);
    });

    me.addListener(ui.events.SHOW_THEN_HIDE, function(delay) {
        if (me.showTimer) {
            return;
        }
        me.show();
        me.trigger(ui.events.BOX_SHOW);
        me.showTimer = ad.base.setTimeout(
            function () {
                me.hide();
                me.trigger(ui.events.BOX_HIDE);
                me.showTimer = null;
            },
            delay
        );
    });

    // 底图尺寸调整，对LinkUnit进行resize
    me.addListener(ui.events.BOX_RESIZE, function (rect) {
        me.lu.resize(rect['width']);
    });

    // 由于物料高度由后端控制，需要更新BOX的高度
    me.trigger(ui.events.BOX_FIXED_HEIGHT_UPDATED, this.fixedHeight);
};

/** @override */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.bindEvent = function() {
    ad.widget.imageplus.v2.dock.OptLinkUnit.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.patchData = function() {
    ad.widget.imageplus.v2.dock.OptLinkUnit.superClass.patchData.apply(this, arguments);

    var luBox = this.getData('box.lu', {});
    var showBar = luBox['showBar'] == null ? true : luBox['showBar'];
    this.blockSpace = luBox['blockSpace'] || 1;
    this.barHeight = showBar ? (luBox['barHeight'] || 25) : 0;
    this.cutHeight = luBox['height'] - this.barHeight;
    this.fixedHeight = this.cutHeight + 25;
};



/**
 * 显示TAB面板容器
 */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.show = function() {
    var me = this;

    if (this.showTimer) {
        // 如果之前因为scroll展现过，则删除定时隐藏的定时器
        // 并展现广告
        ad.base.clearTimeout(this.showTimer);
        this.showTimer = null;
        this.isShowing = false;
    }

    var mainEle = this.g(this.getId('main'));
    // 重新计算高度
    me.topEffect(parseInt(mainEle.style.top, 10), -this.barHeight, function() {
        baidu.show(me.g(me.getId('close')));
    });


    if (!me.isShowing) {
        me.isShowing = true;
        me.trigger(ui.events.BOX_SHOW);
    }
};

/**
 * 隐藏TAB面板容器
 */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.hide = function() {
    var me = this;

    var mainEle = this.g(this.getId('main'));
    me.topEffect(parseInt(mainEle.style.top, 10), this.cutHeight - this.barHeight + this.blockSpace);

    if (me.isShowing) {
        me.isShowing = false;
        me.trigger(ui.events.BOX_HIDE);
        baidu.hide(me.g(me.getId('close')));
    }
};

/**
 * 高度变化特效
 * @param {number} from 开始高度
 * @param {number} to 结束高度
 * @param {Function=} opt_finish 结束回调函数
 */
ad.widget.imageplus.v2.dock.OptLinkUnit.prototype.topEffect = function(from, to, opt_finish) {
    var me = this;
    var duration = 500;
    var element = this.g(this.getId('main'));
    if (this.isEffectRunning) {
        this._fx.end();
    }
    var fx = ad.fx.create(element, {
        __type: 'top-change',
        duration: duration,
        render: function(schedule) {
            element.style.top = (from + (to - from) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me.isEffectRunning = false;
        opt_finish && opt_finish();
    });
    fx.launch();
    this._fx = fx;
    this.isEffectRunning = true;
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/tab.js ~ 2014/07/02 02:17:42
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * tab相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');
goog.require('ui.events');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.imageplus.v2.util');

goog.include('ad/widget/imageplus/v2/dock/tab.less');
goog.include('ad/widget/imageplus/v2/dock/tab.html');

goog.provide('ad.widget.imageplus.v2.dock.Tab');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.dock.Tab = function(data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_tab';

    /**
     * @type {number}
     */
    this.currentTab;

    /**
     * 是否处于最小化状态
     * @type {boolean}
     */
    this.isMinimized = false;

    /**
     * 展开高度
     * @type {number}
     */
    this.expandHeight = 160;

    /**
     * 最小化高度
     * @type {number}
     */
    this.minimizeHeight = 54;

    /**
     * TAB面板是否在显示状态
     * @type {boolean}
     */
    this.isShowing = false;

    /**
     * 是否特效正在运行当中
     * @type {boolean}
     */
    this.isEffectRunning = false;

    /**
     * @type {?number}
     */
    this.showTimer = null;

    /**
     * 最终展现TAB数目
     * @type {number}
     */
    this.tabCount;
};
baidu.inherits(ad.widget.imageplus.v2.dock.Tab, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.dock.Tab.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.Tab.superClass.enterDocument.call(this);

    if (this.tabCount) {
        this.switchTab(this.tabCount - 1, true, true);
    }

    var me = this;
    ad.base.setTimeout(function() {
        if (me.tabCount) {
            me.sendLog({
                'actionid': 9,
                'attach': 'tab_count_' + me.tabCount
            });
        }
    }, 0);

    var tabsContainer = this.g(this.getId('tabs'));
    var handler = this.changeTabHandler();
    baidu.on(tabsContainer, 'click', handler);
    var tabs = baidu.q('ad-ip-tab', tabsContainer);
    baidu.each(tabs, function(tab) {
        baidu.on(tab, 'mouseenter', handler);
    });

    me.addListener(ui.events.BOX_MOUSE_OVER, function() {
        if (me.isMinimized) {
            return;
        }
        me.showTabPanel();
    });

    me.addListener(ui.events.BOX_MOUSE_OUT, function() {
        if (me.isMinimized) {
            return;
        }
        me.hideTabPanel();
    });

    me.addListener(ui.events.SHOW_THEN_HIDE, function(delay) {
        if (this.showTimer) {
            return;
        }
        if (me.currentTab == null) {
            me.currentTab = 0;
        }
        me.switchTab(me.currentTab, true);
        this.showTimer = ad.base.setTimeout(
            function () {
                me.hideTabPanel(true);
                me.showTimer = null;
            },
            delay
        );
    });

    // 最小化
    baidu.on(this.g(this.getId('panels')), 'click', function(e) {
        var target = baidu.event.getTarget(e);
        if (target && target.nodeType == 1) {
            while(target
                && (
                    target.nodeName == 'I'
                    || target.nodeName == 'SPAN'
                )
            ) {
                target = target.parentNode;
            }
            if (target && target.nodeName == 'A'
                && baidu.dom.hasClass(target, 'ad-ip-minimize')
            ) {
                // 最小化按钮点击量
                me.sendLog({
                    'actionid': 9,
                    'attach': 'minimize'
                });
                me.hideTabPanel();
                me.isMinimized = true;
                // 将当前TAB选中状态去除
                var tabsContainer = me.g(me.getId('tabs'));
                var tabs = baidu.q('ad-ip-tab', tabsContainer);
                baidu.each(tabs, function(tab) {
                    baidu.dom.removeClass(tab, 'ad-ip-tab-active');
                    baidu.dom.removeClass(tab, 'ad-ip-tab-active-prevsibling');
                });
                baidu.event.preventDefault(e);
            }
        }
    });

    // 关闭
    baidu.on(this.g(this.getId('close')), 'click', function(e) {
        me.trigger(ui.events.BOX_CLOSE);

        baidu.event.preventDefault(e);
    });

    // 记录分TAB点击
    var panelsContainer = me.g(me.getId('panels'));
    var panels = baidu.q('ad-ip-panel', panelsContainer);
    baidu.each(panels, function(panel, index) {
        baidu.on(panel, 'click', function(e) {
            var target = baidu.event.getTarget(e);
            while (target
                && !baidu.getAttr(target, 'data-log')
                && target != panel
            ) {
                target = target.parentNode;
            }

            if (!baidu.dom.contains(panel, target)) {
                // 没有找到含有data-log属性的元素
                return;
            }
            var log = baidu.getAttr(target, 'data-log');
            if (log) {
                me.sendLog({
                    'actionid': 9,
                    'attach': 'click_in_tab' + (index + 1)
                });
            }
        });
    });
};

/** @override */
ad.widget.imageplus.v2.dock.Tab.prototype.bindEvent = function() {
    ad.widget.imageplus.v2.dock.Tab.superClass.bindEvent.call(this);
};


/**
 * 显示TAB面板容器
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.Tab.prototype.showTabPanel = function(opt_logSilent) {
    var me = this;

    if (this.showTimer) {
        // 如果之前因为scroll展现过，则删除定时隐藏的定时器
        // 并展现广告
        ad.base.clearTimeout(this.showTimer);
        this.showTimer = null;
        this.isShowing = false;
    }

    // 重新计算高度
    var panelsContainer = me.g(me.getId('panels'));
    var panels = baidu.q('ad-ip-panel', panelsContainer);
    var tabBodyHeight = panels[me.currentTab].offsetHeight;
    me.heightEffect(panelsContainer.offsetHeight, tabBodyHeight);

    // 更新BOX的高度
    me.trigger(ui.events.BOX_FIXED_HEIGHT_UPDATED, me.expandHeight);

    if (!me.isShowing) {
        me.isShowing = true;
        baidu.hide(me.g(me.getId('close')));
        if (opt_logSilent !== true) {
            me.trigger(ui.events.BOX_SHOW);
        }
    }
};

/**
 * 隐藏TAB面板容器
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.Tab.prototype.hideTabPanel = function(opt_logSilent) {
    var me = this;

    var panelsContainer = me.g(me.getId('panels'));
    me.heightEffect(panelsContainer.offsetHeight, 0, function() {
        baidu.show(me.g(me.getId('close')));
        // 更新BOX的高度
        me.trigger(ui.events.BOX_FIXED_HEIGHT_UPDATED, me.minimizeHeight);
    });

    if (me.isShowing) {
        me.isShowing = false;
        if (opt_logSilent !== true) {
            me.trigger(ui.events.BOX_HIDE);
        }
    }
};

/**
 * 高度变化特效
 * @param {number} from 开始高度
 * @param {number} to 结束高度
 * @param {Function=} opt_finish 结束回调函数
 */
ad.widget.imageplus.v2.dock.Tab.prototype.heightEffect = function(from, to, opt_finish) {
    var me = this;
    var duration = 500;
    var element = me.g(me.getId('panels'));
    if (this.isEffectRunning) {
        this._fx.end();
    }
    var fx = ad.fx.create(element, {
        __type: 'height-change',
        duration: duration,
        render: function(schedule) {
            element.style.height = (from + (to - from) * schedule) + 'px';
            me.trigger(ui.events.RESIZE, true);
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me.isEffectRunning = false;
        opt_finish && opt_finish();
        me.trigger(ui.events.RESIZE, true);
    });
    fx.launch();
    this._fx = fx;
    this.isEffectRunning = true;
};

/**
 * Tab切换事件
 *
 * @return {Function} 事件处理函数
 */
ad.widget.imageplus.v2.dock.Tab.prototype.changeTabHandler = function() {
    var me = this;

    return function(e) {
        var target = baidu.event.getTarget(e);
        if (target
            && target.nodeType == 1) {
            while(target
                && (
                    target.nodeName == 'I'
                    || target.nodeName == 'SPAN'
                )
            ) {
                target = target.parentNode;
            }
            if (!target) {
                return;
            }
            var index = baidu.dom.getAttr(target, 'data-index');
            // 只要悬浮或者点击到TAB上，就认为不是最小化状态了
            if (index != null) {
                index = parseInt(index, 10);
                me.isMinimized = false;
            }
            if (index != null && !baidu.dom.hasClass(target, 'ad-ip-tab-active')) {
                me.switchTab(index);
            }
            if (index != null) {
                baidu.event.preventDefault(e);
            }
        }
    };
};

/**
 * 切换TAB
 *
 * @param {number} index 第几个TAB
 * @param {boolean=} opt_logSilent 是否不发送日志
 * @param {boolean=} opt_switchOnly 仅仅切换
 */
ad.widget.imageplus.v2.dock.Tab.prototype.switchTab = function(index, opt_logSilent, opt_switchOnly) {
    var me = this;

    me.currentTab = index;
    var tabsContainer = me.g(me.getId('tabs'));
    var tabs = baidu.q('ad-ip-tab', tabsContainer);
    var panelsContainer = me.g(me.getId('panels'));
    var panels = baidu.q('ad-ip-panel', panelsContainer);
    baidu.each(tabs, function(tab) {
        baidu.dom.removeClass(tab, 'ad-ip-tab-active');
        baidu.dom.removeClass(tab, 'ad-ip-tab-active-prevsibling');
    });
    baidu.dom.addClass(tabs[index], 'ad-ip-tab-active');
    if (index > 0) {
        baidu.dom.addClass(tabs[index - 1], 'ad-ip-tab-active-prevsibling');
    }
    baidu.each(panels, function(panel) {
        baidu.hide(panel);
    });
    baidu.show(panels[index]);

    if (opt_switchOnly === true) {
        return;
    }

    // 如果面板处于可见状态：已经完全显示或者正在展开当中
    if (me.isShowing) {
        // 正在展开当中，重新调用showTabPanel(会停止当前特效，重新开始)
        if (me.isEffectRunning) {
            me.showTabPanel();
        }
        else { // 如果不在特效中，那么直接调整高度，不再有特效
            // 重新计算高度
            var tabBodyHeight = panels[index].offsetHeight;
            baidu.dom.setStyle(panelsContainer, 'height', tabBodyHeight + 'px');
        }
    }
    else { // 如果面板不可见，需要显示出来(最小化的时候有这种情况)
        me.showTabPanel(opt_logSilent);
    }

    if (opt_logSilent !== true) {
        // TAB 点击量
        me.sendLog({
            'actionid': 9,
            'attach': 'switch_tab'
        });
    }

    me.trigger(ui.events.RESIZE, true);

    me.trigger(ui.events.TAB_CHANGE);
};

/** @override */
ad.widget.imageplus.v2.dock.Tab.prototype.patchData = function() {
    ad.widget.imageplus.v2.dock.Tab.superClass.patchData.apply(this, arguments);

    // 去重
    var adlist = this.getData('adlist', []);
    var existMap = {};
    for (var i = adlist.length - 1; i >= 0; i--) {
        // 对于无bid_word的不去重
        if (!adlist[i]['bid_word']) {
            continue;
        }
        if (!existMap[adlist[i]['bid_word']]) {
            existMap[adlist[i]['bid_word']] = true;
        }
        else {
            adlist.splice(i, 1);
        }
    }
    this._data['adlist'] = adlist;

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var width = 270;
    var possibleCount = 3;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        width = rect['width'];
        possibleCount = Math.max(parseInt(width / 90, 10), 1);
    }
    // 计算TAB数量
    var count = Math.min(adlist.length, possibleCount);
    var itemWidth = parseInt(width / count, 10);
    var lastItemWidth = width - itemWidth * (count - 1);

    adlist = adlist.slice(0, count);
    // 排序，空白词放最后
    adlist.sort(function(a, b) {
        if (a['bid_word'] == '' && b['bid_word'] == '') {
            return 0;
        }
        if (a['bid_word'] == '') {
            return 1;
        }
        if (b['bid_word'] == '') {
            return -1;
        }
        return 0;
    });
    adlist = adlist.reverse();
    this._data['adlist'] = adlist;

    this.tabCount = adlist.length;

    var emptyCount = 0;
    for (var i = 0; i < adlist.length; i++) {
        var item = adlist[i];
        if (!item['bid_word']) {
            emptyCount++;
            item['bid_word'] = '推荐' + emptyCount;
        }
        // TAB名称最多6个汉字
        item['bid_word'] = ad.base.subByte(item['bid_word'], 12, '');
        if (i < adlist.length - 1) {
            item['item_width'] = itemWidth;
        }
        else {
            item['item_width'] = lastItemWidth;
        }
    }
};
























/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: pageable_tab_container.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/pageable_tab_container.js ~ 2012/06/09 00:30:31
 * @author fanxueliang
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.TabContainer');
goog.require('ui.events');

goog.include('ad/widget/pageable_tab_container.html');
goog.include('ad/widget/pageable_tab_container.less');

goog.provide('ad.widget.PageableTabContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控前缀.
 * @extends {ad.widget.TabContainer}
 */
ad.widget.PageableTabContainer = function(data, opt_titlePrefix) {
    /**
     * @private
     * @type {number}
     */
    this._current = 0;

    /**
     * @private
     * @type {number}
     */
    this._tabCount = data['options'].length;

    /**
     * 可见的tab个数.
     * @private
     * @type {number}
     */
    this._viewableTabCount = 5;

    /**
     * @private
     * @type {number}
     */
    this._scrollableCount = 0;

    // call the super class
    ad.widget.TabContainer.call(this, data, opt_titlePrefix);

    /**
     * @private
     * @type {string}
     */
    this._view = 'AD_ad_widget_pageable_tab_container';
};
baidu.inherits(ad.widget.PageableTabContainer, ad.widget.TabContainer);

/** @override */
ad.widget.PageableTabContainer.prototype.patchData = function() {
    this._data['li_margin'] = 0;
    ad.widget.PageableTabContainer.superClass.patchData.call(this);
};

/** @override */
ad.widget.PageableTabContainer.prototype.calcTabHeadWidth = function(tabCount) {
    var tabWidths = ad.widget.PageableTabContainer.superClass.calcTabHeadWidth.call(this,
        this._viewableTabCount);

    if (tabWidths.length < this._tabCount) {
        this._scrollableCount = this._tabCount - tabWidths.length;

        for (var i = tabWidths.length; i < this._tabCount; i++) {
            tabWidths.push(tabWidths[i % tabWidths.length]);
        }
    }
    this._data['_total_width'] = 0;
    for (i = 0; i < tabWidths.length; i++) {
        this._data['_total_width'] += parseInt(tabWidths[i], 10) + 2;
    }
    return tabWidths;
};

/** @private */
ad.widget.TabContainer.prototype._bindClickEvent = function() {
    var me = this;
    baidu.on(this.getId('tab-head'), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeName === 'SPAN') {
            // LI
            target = target.parentNode.parentNode;
        }
        else if (target.nodeName === 'A') {
            // LI
            target = target.parentNode;
        }

        if (target.nodeName !== 'LI') {
            // IGNORE
            return false;
        }

        var index = parseInt(target.getAttribute('data-index'), 10);
        me.switchTab(index);

        if (me.trigger(ui.events.TAB_CLICK, index) !== false) {
            me.sendLog({'action': '点击',
                'xp': 'TAB' + (index + 1) + '_CLICK'});
        }

        baidu.event.stop(evt);
    });
};
/** @override */
ad.widget.PageableTabContainer.prototype.bindEvent = function() {
    ad.widget.PageableTabContainer.superClass.bindEvent.call(this);

    var me = this;
    baidu.on(this.getId('left-arrow'), 'click', function() {
        me.sendLog({'action': 'left-arrow', 'xp': 'left-arrow'});
        me._scrollTabHead(me._current - 1, "left");
    });
    baidu.on(this.getId('left-arrow'), 'mouseenter', function() {
        me.cancelSlideShow();
    });
    baidu.on(this.getId('left-arrow'), 'mouseleave', function() {
        me.startSlideShow();
    });
    baidu.on(this.getId('right-arrow'), 'click', function() {
        me.sendLog({'action': 'right-arrow', 'xp': 'right-arrow'});
        me._scrollTabHead(me._current + 1, "right");
    });
    baidu.on(this.getId('right-arrow'), 'mouseenter', function() {
        me.cancelSlideShow();
    });
    baidu.on(this.getId('right-arrow'), 'mouseleave', function() {
        me.startSlideShow();
    });
    this.addListener(ui.events.TAB_CHANGE, function(index) {
        if(index > me._current) {
            me._scrollTabHead(index, "right");
        }
        else if (index < me._current) {
            me._scrollTabHead(index, "left");
        }
    });
};

ad.widget.PageableTabContainer.prototype._afterFinishHandler = function(index) {
    this._running = false;
    this._current = index;
    this.switchTab(index);
}
ad.widget.PageableTabContainer.prototype._scrollTabHead = function(index, direction) {
    var me = this;
    if (me._running || index < 0 || index >= me._tabCount) {
        return;
    }
    if (index === 0) {
        baidu.addClass(me.getId('left-arrow'), 'ec-disabled');
    } 
    else {
        baidu.removeClass(me.getId('left-arrow'), 'ec-disabled');
    }
    
    if (index === me._tabCount - 1) {
        baidu.addClass(me.getId('right-arrow'), 'ec-disabled');
    } 
    else {
        baidu.removeClass(me.getId('right-arrow'), 'ec-disabled');
    }
    if(direction === "right") {
        if(index <= 2 || me._current >= me._tabCount - 3){
            me._afterFinishHandler(index);
            return;
        }
    }
    else {
        if (index >= me._tabCount - 3 || me._current <= 2) {
            me._afterFinishHandler(index);
            return;
        }
    }
    var element = baidu.g(me.getId('tab-head'));
    var start = Math.abs(parseInt(ad.dom.getStyle(element, 'left'), 10) || 0);
    var steps = parseInt(me._data['options'][index]['_width'], 10);
    var fx = ad.fx.create(element, {
        __type: 'hello',
        render: function(schedule) {
            var endIndex;
            if(index >= me._tabCount - 3) {
                endIndex = me._tabCount - 3;
            }
            else if (index <= 2) {
                endIndex = 2;
            }
            else {
                endIndex = index;
            }
            var endPoint = (endIndex - 2) * steps;
            element.style.left = (-1 * (start + (endPoint - start) * schedule)) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._afterFinishHandler(index);
    });
    fx.launch();
    me._running = true;
};













/* vim: set ts=4 sw=4 sts=4 tw=100 : */

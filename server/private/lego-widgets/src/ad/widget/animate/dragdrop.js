/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/widget/animate/dragdrop.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * dragdrop相关的实现逻辑
 * 样式参考：http://animate.baidu.com/view/9636759.htm
 **/
goog.require('ad.widget.Widget');
goog.require('ad.fx.dragdrop');
goog.include('ad/widget/animate/dragdrop.less');
goog.include('ad/widget/animate/dragdrop.html');
goog.provide('ad.widget.animate.Dragdrop');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.animate.Dragdrop = function (data) {
    ad.widget.Widget.call(this, data);
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_animate_dragdrop';
};
baidu.inherits(ad.widget.animate.Dragdrop, ad.widget.Widget);
/**
 * @override
 */
ui.events.DROP = 'drop';
ui.events.DRAG = 'drag';
ui.events.REFRESH = 'refresh';
ad.widget.animate.Dragdrop.prototype.bindEvent = function () {
    ad.widget.animate.Dragdrop.superClass.bindEvent.call(this);
    var me = this;
    var root = this.getRoot();
    var $ = ad.fx.dragdrop(ad.base.getObjectByName('$'));
    var animating = false;
    var dragDrop = $('.ec-drag li').Drag({
        el: $('.ad-widget-animate-dragdrop', root), drop: '.ec-drop div',
        unbind: function (This) {
            This.removeClass('ec-mask');
        },
        start: function (e, src, temp) {
            src.addClass('ec-hide');
            temp.addClass('ec-highlight');
            me.trigger(ui.events.DRAG, src);
            //src.addClass('ec-highlight');
        },
        stop: function (e, target, temp, src) {
            //target.removeClass('ec-highlight');
            dragDrop.unbindDrag(src);
            src.removeClass('ec-hide');
            src.addClass('ec-mask');
            temp.removeClass('ec-highlight');
            if (!animating) {
                animating = true;
                var width = target.width();
                var height = target.height();
                var targetW = 200;
                var targetH = 150;
                var offsetY = targetH - height;
                var offsetX = targetW - width;
                var top = target.position().top;
                var left = target.position().left;
                target.animate({width: targetW, height: targetH, top: top - offsetY / 2, left: left - offsetX / 2})
                    .animate({width: width, height: height, top: top, left: left}, function () {
                        animating = false;
                        target.removeClass('ec-highlight');
                    });
            } else {
                target.removeClass('ec-highlight');
            }
            if (!me.trigger(ui.events.DROP, temp, target)) {
                target.find('span').html(temp.find('span').html());
            }
        },
        /* move: function (e, iLeft, iTop, temp, options) {
         temp.css({'left':iLeft, 'top':iTop});
         },*/
        reject: function (e, src, temp) {
            src.removeClass('ec-hide');
            temp.removeClass('ec-highlight');
        },
        dropEnter: function (e, target, temp, src) {
            target.addClass('ec-highlight');
        },
        dropOut: function (e, target, temp, src) {
            target.removeClass('ec-highlight');
        }, limit: $('.ad-widget-animate-dragdrop', root),
        dragClass: 'ec-wrapper'});
    baidu.on(baidu.q('ec-refresh', root)[0], "click", function () {
        $(me.getRoot()).fadeOut(function() {
            dragDrop.unbindDrag();
            dragDrop.bindDrag();
            dragDrop.dropObj.find('img').attr('src', me.getData('drop_img'));
            dragDrop.dropObj.find('span').html('Drop here!');
            me.trigger(ui.events.REFRESH, dragDrop);
        }).fadeIn();
    });
};
/* @override
 */
ad.widget.animate.Dragdrop.prototype.patchData = function () {
    var unit = this._data['unit'];
    this._data['unit'] = unit || "";
};


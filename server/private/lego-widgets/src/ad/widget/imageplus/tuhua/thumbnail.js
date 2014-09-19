/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/tuhua/thumbnail.js ~ 2014/05/29 17:42:11
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * thumbnail相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.fx.Timeline');
goog.require('ui.events');
goog.require('ad.widget.imageplus.tuhua.effect');

goog.include('ad/widget/imageplus/tuhua/base.less');
goog.include('ad/widget/imageplus/tuhua/thumbnail.less');
goog.include('ad/widget/imageplus/tuhua/thumbnail.html');

goog.provide('ad.widget.imageplus.tuhua.Thumbnail');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.imageplus.tuhua.Thumbnail = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_tuhua_thumbnail';

    this.current = 0;
};
baidu.inherits(ad.widget.imageplus.tuhua.Thumbnail, ad.widget.Widget);

/** @override */
ad.widget.imageplus.tuhua.Thumbnail.prototype.enterDocument = function() {
    ad.widget.imageplus.tuhua.Thumbnail.superClass.enterDocument.call(this);

    if (!COMPILED) {
        var comments = this.getData('comment', []);
        this.updateCommentData({'comment': comments});
    }

    // 设置切换窗口容器的宽度
    var carouselBody = baidu.g(this.getId('tip'));
    baidu.dom.setStyle(carouselBody, 'width', (2 * this.getData('item_width') + 20) + 'px');

    var shakeIcon = baidu.g(this.getId('shake-icon'));
    var plusIcon = baidu.g(this.getId('plus-icon'));
    var me = this;
    function swing() {
        if (me._swingRunning) {
            me._swingFx.end();
        }
        me._swingFx = ad.widget.imageplus.tuhua.effect.swingColors(
            [shakeIcon, plusIcon],
            ['#fff', '#fff', '#fff', '#000'], // #ffa500
            [1, 1, 1, 0.6],
            function() {
                me._swingRunning = false;
                swing();
            }
        );
        me._swingRunning = true;
    }
    swing();
};

/** @override */
ad.widget.imageplus.tuhua.Thumbnail.prototype.bindEvent = function() {
    var me = this;
    ad.widget.imageplus.tuhua.Thumbnail.superClass.bindEvent.call(this);

    // 鼠标悬浮于消息上时停止切换，离开时启动切换
    var carouselBody = baidu.g(this.getId('tip'));
    var wrapper = carouselBody.parentNode;
    baidu.on(wrapper, 'mouseenter', function(e) {
        me.stopScroll();
    });
    baidu.on(wrapper, 'mouseleave', function(e) {
        me.scrollMessage();
    });

    // 鼠标点击消息
    baidu.on(wrapper, 'click', function(e) {
        me.trigger(ui.events.CLICK, 'comment');
        baidu.event.preventDefault(e);
    });
    // LOGO图标
    var shakeIcon = baidu.g(this.getId('shake-icon'));
    baidu.on(shakeIcon, 'click', function(e) {
        if (me.unreadMailCount) {
            me.trigger(ui.events.CLICK, 'redirect-mail');
        }
        else {
            me.trigger(ui.events.CLICK, 'comment');
        }
        baidu.event.preventDefault(e);
    });
    // 加号图标
    var plusIcon = baidu.g(this.getId('plus-icon'));
    baidu.on(plusIcon, 'click', function(e) {
        me.trigger(ui.events.CLICK, 'comment-with-input');
        baidu.event.preventDefault(e);
    });
};

/** @override */
ad.widget.imageplus.tuhua.Thumbnail.prototype.patchData = function() {
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var width = 380;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        width = Math.min(Math.max(rect['width'], 350), 500);
    }
    this._data['width'] = width - 80;
    this._data['item_width'] = width - 174;
};

/**
 * 有新消息
 * @param {number} opt_number 消息数目
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.shake = function(opt_number) {
    var messageNumber = baidu.g(this.getId('message-count'));
    var shakeEle = messageNumber.parentNode;
    if (opt_number && opt_number > 0) {
        messageNumber.innerHTML = opt_number;
        baidu.dom.addClass(shakeEle, 'ad-icon-logo-shake');
    }
    else {
        messageNumber.innerHTML = '';
        baidu.dom.removeClass(shakeEle, 'ad-icon-logo-shake');
    }
    // TODO: for browser not support animation
};

/**
 * 轮播显示消息
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.scrollMessage = function() {
    this.stopScroll();
    if (!this.comments || this.comments.length <= 1) {
        return false;
    }
    var me = this;
    this.timer = ad.base.setTimeout(
        function() {
            me.appendMessage();
            me.move();
            me.scrollMessage();
        },
        this.getData('interval', 6000)
    );
};

/**
 * 停止消息切换
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.stopScroll = function() {
    if (this.timer) {
        ad.base.clearTimeout(this.timer);
    }
};

/**
 * 更新数据
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.updateCommentData = function(data) {
    this.stopScroll();
    var carouselBody = baidu.g(this.getId('tip'));
    carouselBody.innerHTML = '';
    this.comments = data['comment'];

    var itemWidth = this.getData('item_width');
    if (!this.comments || !this.comments.length) {
        this.comments = [
            {
                'desc': (itemWidth > 200 ? '有啥看法？来发表评论吧~' : '亲，来发表评论吧~')
            }
        ];
    }

    if (this.comments.length) {
        this.appendMessage();
        if (this.comments.length > 1) {
            this.scrollMessage();
        }
    }
};

/**
 * 移动消息
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.move = function() {
    var carouselBody = baidu.g(this.getId('tip'));
    var me = this;
    var duration = 300;
    var start = 0;
    var end = - carouselBody.children[0].offsetWidth;
    if (this._running) {
        this._fx.end();
    }
    var fx = ad.fx.create(carouselBody, {
        __type: 'message-scroll',
        duration: duration,
        render: function(schedule) {
            carouselBody.style.left = (start + (end - start) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
        baidu.dom.remove(carouselBody.children[0]);
        baidu.dom.setStyle(carouselBody, 'left', '0');
    });
    fx.launch();
    this._fx = fx;
    this._running = true;
};

/**
 * 往容器里增加消息
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.appendMessage = function() {
    var len = this.comments.length;
    var message = this.comments[this.current];
    this.current = (this.current + 1) % len;
    var itemWidth = this.getData('item_width');
    var div = baidu.dom.create('div', {
        'class': 'ad-message-tip-item'
    });
    baidu.dom.setStyle(div, 'width', (itemWidth - 20) + 'px');
    var userName = (
        message['user_name']
            ? baidu.string.encodeHTML(ad.base.subByte(message['user_name'], 24, '..')) + ':'
            : ''
    );
    div.innerHTML = baidu.format(
        '<a href="#"><b>${user_name}</b> ${desc}</a>',
        {
            'user_name': userName,
            'desc': baidu.string.encodeHTML(
                ad.base.subByte(
                    message['desc'],
                    parseInt((itemWidth - baidu.string.getByteLength(userName) * 6) * 10 / 65, 10),
                    '...'
                )
            )
        }
    );
    var carouselBody = baidu.g(this.getId('tip'));
    carouselBody.appendChild(div);
};

/**
 * 更新新邮件提示
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.showUnreadMailCount = function(count) {
    this.unreadMailCount = count;
    this.shake(count);
};

/**
 * 设置背景颜色
 * @param {HTMLElement} ele 元素
 * @param {Array.<number>} rgb 颜色分量数组
 * @param {number} opacity 透明度
 */
ad.widget.imageplus.tuhua.Thumbnail.prototype.setTransparentBackground = function(ele, rgb, opacity) {
    if (baidu.ie && baidu.ie < 9) {
        var colorUtil = ad.widget.imageplus.tuhua.effect.colorUtil;
        var hexColor = colorUtil.toHexColor(rgb).substr(1);
        var value = baidu.format(
            'progid:DXImageTransform.Microsoft.gradient(startColorstr=#{0}{1},endColorstr=#{0}{1})',
            colorUtil.toHex(parseInt(opacity * 255, 10)),
            hexColor
        );
        baidu.dom.setStyles(ele, {
            'filter': value,
            'msFilter': value
        });
    }
    else {
        baidu.dom.setStyle(ele, 'background', 'rgba(' + rgb.join(', ') + ', ' + opacity + ')');
    }
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

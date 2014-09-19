/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/barrage.js ~ 2014/07/24 23:00:48
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * barrage相关的实现逻辑
 **/

goog.require('ad.DomHelper');
goog.require('ad.util');
goog.require('ad.widget.imageplus.v2.BaseWidget');
goog.require('ad.widget.imageplus.tuhua.effect.BatchFx');

goog.include('ad/widget/imageplus/v2/dock/barrage.less');
goog.include('ad/widget/imageplus/v2/dock/barrage.html');

goog.provide('ad.widget.imageplus.v2.dock.Barrage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.dock.Barrage = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_barrage';

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

    /**
     * 最大同时展现个数
     * @type {number}
     */
    this.maxRunQueueLength = 12;

    /**
     * 并列的队列数目
     * @type {number}
     */
    this.queueCount = 3;

    /**
     * 行高
     * @type {number}
     */
    this.lineHeight = 20;

    /**
     * 收起状态时的高度(含padding)
     * @type {number}
     */
    this.miniHeight = 26;

    /**
     * 在移入移出贴片时是否暂停弹幕
     * @type {boolean}
     */
    this.pauseWhenToggle = false;

    /**
     * 候选颜色列表
     * @type {Array.<string>}
     */
    this.colors = [
        '#ffffff', '#3498DB', '#2ECC71', '#1ABC9C', '#E98B39', '#F4A62A', '#EC5E00', '#D14233',
        '#EF607C', '#FCB131', '#AAE5E7', '#009FA7', '#017EC1', '#0184C6', '#FF2936', '#CE1CFF',
        '#2D0DFF', '#4AB900', '#FFA300', '#86FFB7', '#7DE3E8', '#7EABFF', '#8867E8', '#ED71FF'
    ];

    /**
     * 悬浮字体颜色
     * @type {?string}
     */
    this.hoverColor = null;

    /**
     * 文字悬浮边框颜色
     * @type {?string}
     */
    this.hoverBorderColor = null;

    /**
     * 是否显示下划线
     * @type {boolean}
     */
    this.underline = false;

    /**
     * 字体
     * @type {?string}
     */
    this.fontFamily = null;

    /**
     * 最小字号
     * @type {number}
     */
    this.minFontSize = 12;

    /**
     * 最大字号
     * @type {number}
     */
    this.maxFontSize = 18;

    /**
     * 候选队列
     * @type {Array}
     */
    this.waitingQueue = [];

    /**
     * 批量特效对象
     */
    this.bfx = new ad.widget.imageplus.tuhua.effect.BatchFx({
        interval: (baidu.ie ? 32 : 16)
    });

    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 运行队列数组
     * @type {Array.<Array>}
     */
    this.runQueues = [];
    for (var i = 0; i < this.queueCount; i++) {
        this.runQueues.push([]);
    }
};
baidu.inherits(ad.widget.imageplus.v2.dock.Barrage, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.dock.Barrage.prototype.enterDocument = function() {
    ad.widget.imageplus.v2.dock.Barrage.superClass.enterDocument.call(this);

    var barrageEle = this.g(this.getId('barrage'));
    barrageEle.style.lineHeight = this.lineHeight + 'px';
    if (this.fontFamily) {
        barrageEle.style.fontFamily = this.fontFamily;
    }

    if (this.hoverColor || this.hoverBorderColor || this.underline) {
        var styles = '#' + this.getId() + ' .ad-barrage-item a:hover {'
            + (this.hoverColor ? ('color: ' + this.hoverColor + ';') : '')
            + (this.hoverBorderColor ? ('border-color: ' + this.hoverBorderColor + ';') : '')
            + '}'
            + '#' + this.getId() + ' .ad-barrage-item a {'
            + (this.underline ? 'text-decoration: underline;' : '')
            + '}';
        var domUtil = new ad.DomHelper(this.getDocument());
        domUtil.createStyles(styles, this.getId('extra-style'), barrageEle);
    }

    var mainEle = this.g(this.getId('main'));
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        baidu.dom.addClass(mainEle, 'ad-ie');
    }

    // 可视部分的高度
    var cutEle = this.g(this.getId('cut'));
    cutEle.style.height = this.cutHeight + 'px';

    mainEle.style.position = 'absolute';
    mainEle.style.top = '0';
    mainEle.style.left = '0';

    var barrageMainEle = this.g(this.getId('barrage-main'));
    barrageMainEle.style.height = (this.cutHeight - 6) + 'px';

    // 启动弹幕
    this.runBarrage();

    this.loadImage();

    var me = this;
    var close = me.g(this.getId('close'));
    baidu.on(close, 'click', function (e) {
        me.close();
        baidu.event.preventDefault(e);
        me.trigger(ui.events.BOX_CLOSE);
    });

    me.addListener(ui.events.BOX_MOUSE_OVER, function() {
        me.show();
    });

    me.addListener(ui.events.BOX_MOUSE_OUT, function() {
        me.hide();
    });

    me.addListener(ui.events.SHOW_THEN_HIDE, function(delay) {
        if (me.showTimer) {
            return;
        }
        me.show();
        me.showTimer = ad.base.setTimeout(
            function () {
                me.hide(true);
                me.showTimer = null;
            },
            delay
        );
    });

    // 底图尺寸调整，对LinkUnit进行resize
    me.addListener(ui.events.BOX_RESIZE, function (rect) {
        me.resize(rect);
    });

    // 由于物料高度由后端控制，需要更新BOX的高度
    me.trigger(ui.events.BOX_FIXED_HEIGHT_UPDATED, this.fixedHeight);

    // 鼠标悬浮于消息上时停止切换，离开时启动切换
    var wrapper = this.g(this.getId('wrapper'));
    baidu.on(wrapper, 'mouseenter', function(e) {
        me.pauseBarrage();
    });
    baidu.on(wrapper, 'mouseleave', function(e) {
        me.resumeBarrage();
    });
};

/** @override */
ad.widget.imageplus.v2.dock.Barrage.prototype.patchData = function() {
    ad.widget.imageplus.v2.dock.Barrage.superClass.patchData.apply(this, arguments);

    var luBox = this.getData('box.lu', {});
    if (luBox['maxRunQueueLength']) {
        this.maxRunQueueLength = luBox['maxRunQueueLength'];
    }
    if (luBox['queueCount']) {
        this.queueCount = luBox['queueCount'];
    }
    if (luBox['lineHeight']) {
        this.lineHeight = luBox['lineHeight'];
    }
    if (luBox['miniHeight']) {
        this.miniHeight = luBox['miniHeight']/* 需要包含上下各3px的padding */;
    }
    if (luBox['pauseWhenToggle'] != null) {
        this.pauseWhenToggle = luBox['pauseWhenToggle'];
    }
    if (luBox['colors']) {
        this.colors = luBox['colors'];
    }
    if (luBox['minFontSize']) {
        this.minFontSize = luBox['minFontSize'];
    }
    if (luBox['maxFontSize']) {
        this.maxFontSize = luBox['maxFontSize'];
    }
    if (luBox['fontFamily']) {
        this.fontFamily = luBox['fontFamily'];
    }
    if (luBox['hoverColor']) {
        this.hoverColor = luBox['hoverColor'];
    }
    if (luBox['hoverBorderColor']) {
        this.hoverBorderColor = luBox['hoverBorderColor'];
    }
    if (luBox['underline']) {
        this.underline = luBox['underline'];
    }
    this.mainHeight = (this.lineHeight + 1) * this.queueCount;
    this.cutHeight = this.mainHeight + 6/* 上下各3px的padding */;
    this.fixedHeight = this.cutHeight + 25/* 如果用老的面板右上方的关闭按钮，这里的25是为了给它空间 */;

    if (!this.getData('idea_url')) {
        delete this._data['idea_url'];
    }

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var width = 500;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        width = rect['width'];
    }
    this._data['width'] = width;
};

/**
 * 加载图片得到图片尺寸
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.loadImage = function() {
    var ctner = this.g(this.getId('img-ctner'));
    if (!ctner) {
        return;
    }
    var url = this.getData('idea_url');
    var me = this;
    ad.util.loadImage(
        url,
        function(size) {
            me.imageSize = size;

            if (me.isShowing) {
                me.resizeImage(true);
            }
            else {
                me.resizeImage(false);
            }
            baidu.show(ctner);
        }
    );
};

/**
 * 缩放图片尺寸
 * @param {boolean=} opt_toLarge 往大尺寸缩放还是往小尺寸缩放
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.resizeImage = function(opt_toLarge) {
    var maxWidth;
    var maxHeight;
    var top;
    if (opt_toLarge) {
        maxWidth = 150;
        maxHeight = this.cutHeight;
        top = 0;
    }
    else {
        maxWidth = 120;
        maxHeight = this.miniHeight + 20;
        top = -20;
    }
    var ctner = this.g(this.getId('img-ctner'));
    var size = this.imageSize;
    if (!ctner || !size) {
        return;
    }
    var ratio = Math.min(
        maxWidth / size['width'],
        maxHeight / size['height'],
        1
    );
    var realWidth = parseInt(size['width'] * ratio, 10);
    var realHeight = parseInt(size['height'] * ratio, 10);
    var img = this.g(this.getId('img'));
    baidu.dom.setStyles(ctner, {
        'width': realWidth + 'px',
        'top': top + 'px'
    });
    baidu.dom.setStyles(img, {
        'width': realWidth + 'px',
        'height': realHeight + 'px',
        'top': parseInt((maxHeight - realHeight) / 2, 10) + 'px'
    });
};

/**
 * 调整尺寸
 * @param {Object} rect 底图尺寸
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.resize = function(rect) {
    var barrageEle = this.g(this.getId('barrage'));
    barrageEle.style.width = rect['width'] + 'px';

    this._data['width'] = rect['width'];
    this.resetQueue();
};

/**
 * 显示面板容器
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.show = function(opt_logSilent) {
    var me = this;

    if (this.showTimer) {
        // 如果之前因为scroll展现过，则删除定时隐藏的定时器
        // 并展现广告
        ad.base.clearTimeout(this.showTimer);
        this.showTimer = null;
        this.isShowing = false;
    }

    var mainEle = this.g(this.getId('main'));
    if (this.pauseWhenToggle) {
        this.pauseBarrage();
    }
    // 重新计算高度
    me.resizeImage(true);
    me.topEffect(parseInt(mainEle.style.top, 10), 0, function() {
        // 保险一点，再调一次
        me.resizeImage(true);
        baidu.show(me.g(me.getId('close')));
        if (me.pauseWhenToggle) {
            me.resumeBarrage();
        }
    });


    if (!me.isShowing) {
        me.isShowing = true;
        me.trigger(ui.events.BOX_SHOW, opt_logSilent);
    }
};

/**
 * 隐藏面板容器
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.hide = function(opt_logSilent) {
    var me = this;

    var mainEle = this.g(this.getId('main'));
    if (this.pauseWhenToggle) {
        this.pauseBarrage();
    }
    me.resizeImage(false);
    me.topEffect(parseInt(mainEle.style.top, 10), this.cutHeight - this.miniHeight, function() {
        if (me.pauseWhenToggle) {
            me.resumeBarrage();
        }
        me.resizeImage(false);
    });

    if (me.isShowing) {
        me.isShowing = false;
        me.trigger(ui.events.BOX_HIDE, opt_logSilent);
        baidu.hide(me.g(me.getId('close')));
    }
};

/**
 * 高度变化特效
 * @param {number} from 开始高度
 * @param {number} to 结束高度
 * @param {Function=} opt_finish 结束回调函数
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.topEffect = function(from, to, opt_finish) {
    var me = this;
    // var duration = 500;
    var duration = Math.abs(to - from) * 10;
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

/**
 * 暂停弹幕
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.pauseBarrage = function() {
    this.bfx.pause();
};

/**
 * 重启弹幕
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.resumeBarrage = function() {
    if (this.hidden) {
        return;
    }
    this.bfx.resume();
};

/**
 * 清空弹幕
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.clearBarrage = function() {
    this.bfx.end();
    var wrapper = this.g(this.getId('wrapper'));
    wrapper.innerHTML = '';
    baidu.each(this.runQueues, function(queue) {
        queue.length = 0;
    });
    this.waitingQueue.length = 0;
};

/**
 * 开始播放弹幕
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.runBarrage = function() {
    this.clearBarrage();
    var adlist = this.getData('adlist');
    if (!adlist || !adlist.length) {
        return false;
    }
    var me = this;
    var emptyCount = 1;
    baidu.each(adlist, function(item) {
        var message = item['title'] ? item['title'] : ('推荐' + emptyCount++);
        me.waitingQueue.push({
            'message': baidu.string.encodeHTML(message),
            'real_url': baidu.string.encodeHTML(item['real_url']),
            'size': me.getRandomSize() + 'px',
            'color': me.getRandomColor()
        });
    });
    this.fillQueue();

    this.bfx.start();
};

/**
 * 获取随机文字大小
 * @return {number}
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.getRandomSize = function() {
    return this.minFontSize
        + 2 * parseInt(Math.random() * parseInt((this.maxFontSize - this.minFontSize) / 2, 10), 10);
};

/**
 * 获取随机颜色
 * @return {string}
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.getRandomColor = function() {
    var color = this.colors[parseInt(Math.random() * this.colors.length, 10)];
    return color;
};

/**
 * 填充运行队列
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.fillQueue = function() {
    if (this.hidden) {
        return;
    }
    var me = this;
    var total = 0;
    baidu.each(this.runQueues, function(queue) {
        total += queue.length;
    });
    if (total < this.maxRunQueueLength && this.waitingQueue.length) {
        for (var i = total; i < this.maxRunQueueLength; i++) {
            if (this.waitingQueue.length) {
                var item = this.waitingQueue.shift();
                var index = getShortQueueIndex();
                var queue = this.runQueues[index];
                queue.push(this.getEffectContext(item, index));
            }
        }
    }

    /**
     * 获取最短队列的下标
     */
    function getShortQueueIndex() {
        var min = Number.MAX_VALUE;
        var index = 0;
        // 从中间朝外遍历，保证消息少的时候显示在中间
        me.insideOutTraverse(me.runQueues, function(queue, i) {
            var etimes = [];
            baidu.each(queue, function(item) {
                var fx = item['fx'];
                etimes.push(fx._etime);
            });
            var maxEndTime = Math.max.apply(Math, etimes);
            if (maxEndTime < min) {
                min = maxEndTime;
                index = i;
            }
        });
        return index;
    }
};

/**
 * 从中间朝外遍历
 * @param {Array.<*>} arr 要遍历的数组
 * @param {Function} callback 回调
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.insideOutTraverse = function(arr, callback) {
    var len = arr.length;
    var isOdd = len % 2;
    if (isOdd) {
        var index = (len + 1) / 2 - 1;
        callback(arr[index], index);
    }
    if (len > 1) {
        for (var i = parseInt(len / 2, 10) - 1; i >= 0; i--) {
            var smallEnd = i;
            var bigEnd = len - 1 - i;
            callback(arr[smallEnd], smallEnd);
            callback(arr[bigEnd], bigEnd);
        }
    }
};

/**
 * 获取一条消息的特效上下文
 * @param {Object} item 消息
 * @param {number} index 第几个运行队列
 * @return {Object}
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.getEffectContext = function(item, index) {
    var queue = this.runQueues[index];
    var top = index * this.lineHeight;
    item['size'] = this.getRandomSize() + 'px';
    item['color'] = this.getRandomColor();
    // 由于可能是append到iframe里面，需要用iframe的document来创建...
    // ad.DomHelper 还不完整，否则可以使用它来完成
    var doc = this.getDocument();
    var div = doc.createElement('div');
    div.className = 'ad-barrage-item';
    baidu.dom.setStyles(div, {
        'top': top + 'px'
    });
    div.innerHTML = baidu.format(
        [
            '<a href="${real_url}" '
                    + 'target="_blank" '
                    + 'style="color:${color};font-size:${size};">',
            '${message}',
            '</a>'
        ].join(''),
        item
    );
    var wrapper = this.g(this.getId('wrapper'));
    wrapper.appendChild(div);

    var itemWidth = div.offsetWidth;
    var wrapperWidth = this.getData('width');
    // 跑完wrapperWidth所需时间：2s ~ 10s
    var speed = 0.045 + Math.random() * 0.04 + (baidu.ie ? 0.02 : 0); // 每ms移动的像素数
    var now = new Date().getTime();

    // 两个规则保证两条消息不回重叠：
    // 1. 前面任何一个消息开始时，在当前消息前面
    // 2. 前面任何一个消息结束时，仍然在当前消息的前面

    // 计算当前消息在前面所有消息结束(消息体完整通过窗口结束位置)时，仍在后面的情形下，
    // 它距离这个时间点还剩余的时间：这个时间点刚好是left为0的时间点，
    // 所以当前的最小left就很好计算：leftEndTime * speed
    var prevEndTime = now; // 全部结束时间最小值不能早于当前时间
    if (queue && queue.length) {
        for (var i = 0; i < queue.length; i++) {
            var context = queue[i];
            var prevFx = context['fx'];
            prevEndTime = Math.max(prevFx._etime, prevEndTime);
        }
    }
    var leftEndTime = prevEndTime - now;

    // 计算当前消息在所有消息完整体都已全部通过过窗口开始位置时，仍在后面的情形下
    // 它距离这个时间点还剩余的时间：这个时间点left刚好是wrapperWidth的时间点
    // 所以当前的最小left计算方式：leftBeginTime * speed + wrapperWidth
    var prevBeginTime = now; // 全部开始时间最小值不能早于当前时间
    if (queue && queue.length) {
        for (var i = 0; i < queue.length; i++) {
            var context = queue[i];
            var prevFx = context['fx'];
            var prevSpeed = context['speed'];
            prevBeginTime = Math.max(prevFx._etime - wrapperWidth / prevSpeed, prevBeginTime);
        }
    }
    var leftBeginTime = prevBeginTime - now;

    var left = Math.max(
        leftEndTime * speed,
        leftBeginTime * speed + wrapperWidth,
        wrapperWidth
    );
    var deltaWidth = queue && queue.length
            ? (5 + Math.random() * wrapperWidth * 0.1)
            : 0;
    var actualLeft = parseInt(left + deltaWidth, 10);
    var actualDuration = parseInt((actualLeft + itemWidth) / speed, 10);
    var start = actualLeft;
    var end = -itemWidth;

    var fx = this.bfx.create(div, {
        __type: 'barrage',
        duration: actualDuration,
        render: function(schedule) {
            div.style.left = (start + (end - start) * schedule) + 'px';
        }
    });
    var me = this;
    fx.addListener('onafterfinish', function() {
        baidu.dom.remove(div);
        for (var i = queue.length - 1; i >= 0; i--) {
            if (queue[i]['fx'] === fx) {
                queue.splice(i, 1);
                break;
            }
        }
        me.waitingQueue.push(item);
        me.fillQueue();
    });
    fx.launch();

    return {
        'item': item,
        'fx': fx,
        'dom': div,
        'speed': speed
    };
};

/**
 * 重置队列，重新展现：列入窗口大小变动，需要调整弹幕宽度
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.resetQueue = function() {
    this.runBarrage();
};

/**
 * 隐藏widget
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.close = function() {
    var root = this.getRoot();
    if (root) {
        baidu.hide(root);
    }
    this.hidden = true;
    this.pauseBarrage();
};

/**
 * 显示widget
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.reopen = function() {
    var root = this.getRoot();
    if (root) {
        baidu.show(root);
    }
    this.hidden = false;
    this.resumeBarrage();
    this.fillQueue();
};

/**
 * 销毁
 */
ad.widget.imageplus.v2.dock.Barrage.prototype.dispose = function() {
    this.bfx.end();
    ad.widget.imageplus.v2.dock.Barrage.superClass.dispose.call(this);
};
























/* vim: set ts=4 sw=4 sts=4 tw=100: */

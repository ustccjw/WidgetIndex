/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/tuhua/barrage.js ~ 2014/06/14 17:22:52
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * barrage相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.widget.imageplus.tuhua.effect');
goog.require('ad.widget.imageplus.tuhua.effect.BatchFx');
goog.require('ad.widget.imageplus.tuhua.requester');
goog.require('ad.fx.Timeline');

goog.include('ad/widget/imageplus/tuhua/base.less');
goog.include('ad/widget/imageplus/tuhua/barrage.less');
goog.include('ad/widget/imageplus/tuhua/barrage.html');

goog.provide('ad.widget.imageplus.tuhua.Barrage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.imageplus.tuhua.Barrage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_tuhua_barrage';

    this.maxRunQueueLength = 6;

    this.queueCount = 3;

    this.waitingQueue = [];

    this.runQueues = [];
    for (var i = 0; i < this.queueCount; i++) {
        this.runQueues.push([]);
    }

    this.bfx = new ad.widget.imageplus.tuhua.effect.BatchFx({
        interval: (baidu.ie ? 32 : 16)
    });

    this.isThumbUped = false;

    this.isThumbDowned = false;

    /**
     * 是否刚关掉面板
     *
     * @type {boolean}
     */
    this._closeCurrently = false;
};
baidu.inherits(ad.widget.imageplus.tuhua.Barrage, ad.widget.Widget);

/** @override */
ad.widget.imageplus.tuhua.Barrage.prototype.enterDocument = function() {
    ad.widget.imageplus.tuhua.Barrage.superClass.enterDocument.call(this);

    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        baidu.dom.addClass(this.getRoot(), 'ad-ie');
    }

    var me = this;
    if (!COMPILED) {
        var comments = this.getData('comment', []);
        // 为了正确计算宽度，需延迟展现(root已经显示的情况下可以正常计算item宽度)
        ad.base.setTimeout(function() {
            me.updateCommentData({
                'comment': comments
            });
        }, 0);
    }

    // 先不展现弹幕主面板
    // this.hideMain();
    this.showMain();

    // var shakeIcon = baidu.g(this.getId('shake-icon'));
    // var plusIcon = baidu.g(this.getId('plus-icon'));
    // function swing() {
    //     if (me._swingRunning) {
    //         me._swingFx.end();
    //     }
    //     me._swingFx = ad.widget.imageplus.tuhua.effect.swingColors(
    //         [shakeIcon, plusIcon],
    //         ['#fff', '#fff', '#fff', '#000'], // #ffa500
    //         [1, 1, 1, 0.6],
    //         function() {
    //             me._swingRunning = false;
    //             swing();
    //         }
    //     );
    //     me._swingRunning = true;
    // }
    // swing();
};

/** @override */
ad.widget.imageplus.tuhua.Barrage.prototype.bindEvent = function() {
    ad.widget.imageplus.tuhua.Barrage.superClass.bindEvent.call(this);

    var me = this;
    // 鼠标悬浮于消息上时停止切换，离开时启动切换
    var wrapper = baidu.g(this.getId('wrapper'));
    baidu.on(wrapper, 'mouseenter', function(e) {
        me.pauseBarrage();
    });
    baidu.on(wrapper, 'mouseleave', function(e) {
        me.resumeBarrage();
    });

    // 鼠标点击消息
    baidu.on(wrapper, 'click', function(e) {
        var target = baidu.event.getTarget(e);
        if (!baidu.dom.hasClass(target, 'ad-act-comment')) {
            target = target.parentNode;
        }
        if (baidu.dom.hasClass(target, 'ad-act-comment')) {
            var descId = baidu.dom.getAttr(target, 'data-desc-id');
            // var actType = baidu.dom.getAttr(target, 'data-act-type');
            me.trigger(ui.events.CLICK, 'reply-comment'/*这里本来直接用actType的，国庆建议不要小尾巴*/, descId);
            baidu.event.preventDefault(e);
        }
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
    // baidu.on(shakeIcon.parentNode, 'mouseenter', function() {
    //     if (me._closeCurrently) {
    //         return;
    //     }
    //     me.showMain();
    // });
    // 加号图标
    var plusIcon = baidu.g(this.getId('plus-icon'));
    baidu.on(plusIcon, 'click', function(e) {
        me.trigger(ui.events.CLICK, 'comment');
        baidu.event.preventDefault(e);
    });
    // 发表弹幕
    var replyBtn = baidu.g(this.getId('reply'));
    baidu.on(replyBtn, 'click', function(e) {
        me.trigger(ui.events.CLICK, 'comment');
        baidu.event.preventDefault(e);
    });
    // 关闭图标
    var closeIcon = baidu.g(this.getId('close'));
    baidu.on(closeIcon, 'click', function(e) {
        me._closeCurrently = true;
        // me.hideMain();
        me.closeMain();
        // baidu.show(baidu.g(me.getId('reopen-icon')).parentNode);
        baidu.event.preventDefault(e);
    });
    baidu.on(this.getRoot(), 'mouseleave', function() {
        me._closeCurrently = false;
    });
    // 顶
    baidu.on(this.getId('thumb-up-icon'), 'click', function(e) {
        if (!me.isThumbUped) {
            me.voteUp();
        }
        baidu.event.preventDefault(e);
    });
    // 踩
    baidu.on(this.getId('thumb-down-icon'), 'click', function(e) {
        if (!me.isThumbDowned) {
            me.voteDown();
        }
        baidu.event.preventDefault(e);
    });

    // 弹幕拉开收起
    var pullbar = baidu.g(this.getId('pullbar'));
    this.minimized = true;
    this.minimizeMain();
    baidu.on(pullbar, 'click', function(e) {
        if (me.mainHidden) {
            me.openMain();
        }
        else {
            me.minimized ? me.maximizeMain() : me.minimizeMain();
        }
    });
    baidu.on(pullbar, 'mouseenter', function(e) {
        baidu.addClass(pullbar, 'ad-barrage-pullbar-hover');
        if (me.minimized) {
            me.maximizeMain();
        }
    });
    baidu.on(pullbar, 'mouseleave', function(e) {
        baidu.removeClass(pullbar, 'ad-barrage-pullbar-hover');
    });

    // 展开主面板
    // baidu.on(this.getId('reopen-icon'), 'click', function(e) {
    //     me.showMain();
    //     baidu.event.preventDefault(e);
    // });

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    if (loaderApi) {
        loaderApi.addListener(ui.events.RESIZE, function(evt, rect) {
            var mainWrapper = baidu.g(me.getId('main-wrapper'));
            mainWrapper.parentNode.style.width = rect['width'] + 'px';
            var thumbsEle = baidu.g(me.getId('thumbs'));
            thumbsEle.style.left = rect['width'] + 'px';

            me._data['width'] = rect['width'];
            // TODO: 重置队列貌似有点难看，先不重置了
            // me.resetQueue();
        });
    }
};

/**
 * 顶
 */
ad.widget.imageplus.tuhua.Barrage.prototype.voteUp = function() {
    var me = this;
    this.isThumbUped = true;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.thumbUp(
            img.src,
            function(data) {
                if (data['if_succ'] === 1) {
                    // 顶成功
                    me.increaseThumbUp();
                    // TODO 动画？
                }
                else {
                    me.isThumbUped = false;
                }
            }
        );
    }
};

/**
 * 踩
 */
ad.widget.imageplus.tuhua.Barrage.prototype.voteDown = function() {
    var me = this;
    this.isThumbDowned = true;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.thumbDown(
            img.src,
            function(data) {
                if (data['if_succ'] === 1) {
                    // 踩成功
                    me.increaseThumbDown();
                    // TODO 动画？
                }
                else {
                    me.isThumbDowned = false;
                }
            }
        );
    }
};

/**
 * 隐藏弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.hideMain = function() {
    var main = baidu.g(this.getId('main'));

    main.style.visibility = 'hidden';
    main.parentNode.style.width = '0%';
    this.mainHidden = true;
    this.pauseBarrage();
};

/**
 * 显示弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.showMain = function() {
    if (!this.mainHidden) {
        return;
    }
    baidu.hide(baidu.g(this.getId('reopen-icon')).parentNode);
    var main = baidu.g(this.getId('main'));

    main.style.visibility = 'visible';
    this.mainEffect();
    this.mainHidden = false;
    this.resumeBarrage();
    this.fillQueue();
};

/**
 * 最小化弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.minimizeMain = function() {
    var main = baidu.g(this.getId('main'));

    var curHeight = main.offsetHeight;
    this.heightEffect(curHeight, 20);

    this.minimized = true;
};

/**
 * 最大化弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.maximizeMain = function() {
    var main = baidu.g(this.getId('main'));

    var curHeight = main.offsetHeight;
    this.heightEffect(curHeight, 63);

    this.minimized = false;
};

/**
 * 关闭弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.closeMain = function() {
    this.mainHidden = true;
    this.pauseBarrage();

    var main = baidu.g(this.getId('main'));
    baidu.hide(main);
};

/**
 * 打开弹幕主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.openMain = function() {
    if (!this.mainHidden) {
        return;
    }
    var main = baidu.g(this.getId('main'));
    baidu.show(main);
    this.mainHidden = false;
    this.resumeBarrage();
    this.fillQueue();
};

/**
 * 逐渐展现主面板
 */
ad.widget.imageplus.tuhua.Barrage.prototype.mainEffect = function() {
    var me = this;
    var duration = 300;
    var main = baidu.g(this.getId('main'));
    var root = main.parentNode.parentNode;
    var element = main.parentNode;
    if (this._running) {
        this._fx.end();
    }
    var start = 0;
    var end = root.offsetWidth; // XXX: 为啥取像素宽度，而不是直接用100%，是因为解决IE下半像素造成抖动的问题
    var fx = ad.fx.create(element, {
        __type: 'main-effect',
        duration: duration,
        render: function(schedule) {
            element.style.width = parseInt(start + (end - start) * schedule, 10) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
        element.style.width = '100%';
    });
    fx.launch();
    this._fx = fx;
    this._running = true;
};

/**
 * 变化特效
 * @param {number} from 开始数值
 * @param {number} to 结束数值
 * @param {Function=} opt_finish 结束回调函数
 * @param {Function=} opt_start 开始回调函数
 */
ad.widget.imageplus.tuhua.Barrage.prototype.heightEffect = function(from, to, opt_finish, opt_start) {
    var me = this;
    var duration = 300;
    var element = baidu.g(this.getId('main'));
    if (this.isEffectRunning) {
        this._fx.end();
    }
    var fx = ad.fx.create(element, {
        __type: 'height-change',
        duration: duration,
        render: function(schedule) {
            element.style.height = (from + (to - from) * schedule) + 'px';
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
 * 获取关联的图片
 */
ad.widget.imageplus.tuhua.Barrage.prototype.getRelatedImage = function() {
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var img;
    if (loaderApi) {
        img = loaderApi.getImg();
    }
    if (!COMPILED) {
        img = document.getElementsByTagName('img')[0];
    }

    return img;
};

/** @override */
ad.widget.imageplus.tuhua.Barrage.prototype.patchData = function() {
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
 * 暂停弹幕
 */
ad.widget.imageplus.tuhua.Barrage.prototype.pauseBarrage = function() {
    this.bfx.pause();
};

/**
 * 重启弹幕
 */
ad.widget.imageplus.tuhua.Barrage.prototype.resumeBarrage = function() {
    if (this.hidden || this.mainHidden) {
        return;
    }
    this.bfx.resume();
};

/**
 * 清空弹幕
 */
ad.widget.imageplus.tuhua.Barrage.prototype.clearBarrage = function() {
    this.bfx.end();
    var wrapper = baidu.g(this.getId('wrapper'));
    wrapper.innerHTML = '';
    baidu.each(this.runQueues, function(queue) {
        queue.length = 0;
    });
    this.waitingQueue.length = 0;
};

/**
 * 开始播放弹幕
 */
ad.widget.imageplus.tuhua.Barrage.prototype.runBarrage = function() {
    this.clearBarrage();
    if (!this.comments || !this.comments.length) {
        return false;
    }
    var me = this;
    baidu.each(this.comments, function(item) {
        var byteLength = baidu.string.getByteLength(item['desc']);
        me.waitingQueue.push({
            'message': baidu.string.encodeHTML(
                ad.base.subByte(item['desc'], 60, '...')
            ),
            'title': (byteLength > 60 ? baidu.string.encodeHTML(item['desc']) : ''),
            'userName': baidu.string.encodeHTML(item['user_name'] || ''),
            'descId': (item['desc_id'] ? baidu.string.encodeHTML(item['desc_id']) : ''),
            'hideCommentIcon': item['is_self'] === true || !item['desc_id'],
            'size': me.getRandomSize() + 'px',
            'color': me.getRandomColor(),
            'isSelf': item['is_self'] === true
        });
    });
    this.fillQueue();

    this.bfx.start();
};

/**
 * 获取随机文字大小
 * @return {number}
 */
ad.widget.imageplus.tuhua.Barrage.prototype.getRandomSize = function() {
    // 字号范围：12~18
    var minSize = 12;
    var maxSize = 18;

    return minSize + 2 * parseInt(Math.random() * parseInt((maxSize - minSize) / 2, 10), 10);
};

/**
 * 获取随机颜色
 * @return {string}
 */
ad.widget.imageplus.tuhua.Barrage.prototype.getRandomColor = function() {
    var colors = [
        '#ffffff', '#3498DB', '#2ECC71', '#1ABC9C', '#E98B39', '#F4A62A', '#EC5E00', '#D14233',
        '#EF607C', '#FCB131', '#AAE5E7', '#009FA7', '#017EC1', '#0184C6', '#FF2936', '#CE1CFF',
        '#2D0DFF', '#4AB900', '#FFA300', '#86FFB7', '#7DE3E8', '#7EABFF', '#8867E8', '#ED71FF'
    ];

    var color = colors[parseInt(Math.random() * colors.length, 10)];
    return color;
};

/**
 * 填充运行队列
 */
ad.widget.imageplus.tuhua.Barrage.prototype.fillQueue = function() {
    if (this.hidden || this.mainHidden) {
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
ad.widget.imageplus.tuhua.Barrage.prototype.insideOutTraverse = function(arr, callback) {
    var len = arr.length;
    var isOdd = len % 2;
    if (isOdd) {
        var index = (len + 1) / 2 - 1;
        callback(arr[index], index);
    }
    if (len > 2) {
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
ad.widget.imageplus.tuhua.Barrage.prototype.getEffectContext = function(item, index) {
    var queue = this.runQueues[index];
    var top = index * 20;
    // var size = item['size'];
    // var color = item['color'];
    item['size'] = this.getRandomSize() + 'px';
    item['color'] = this.getRandomColor();
    var div = baidu.dom.create('div', {
        'class': 'ad-barrage-item'
    });
    baidu.dom.setStyles(div, {
        'top': top + 'px'
    });
    div.innerHTML = baidu.format(
        [
            '<a href="#" class="ad-act-comment' + (item['isSelf'] ? ' ad-is-self' : '') + '" '
                + 'data-desc-id="${descId}" '
                + 'data-act-type="comment" '
                + 'title="${title}" '
                + 'style="color:${color};font-size:${size};">',
            item['isSelf']
                ? '<b>我 (${userName})：</b>'
                : (
                    item['userName'] ? '<b>${userName}：</b>' : ''
                ),
            '${message}',
            '</a>',
            item['hideCommentIcon']
                ? ''
                : '<span class="ad-iconfont ad-act-comment" '
                    + 'data-act-type="reply-comment" '
                    + 'data-desc-id="${descId}" '
                    + 'style="font-size:${size};">&#xe613;</span>'
        ].join(''),
        item
    );
    var wrapper = baidu.g(this.getId('wrapper'));
    wrapper.appendChild(div);

    var itemWidth = div.offsetWidth;
    var wrapperWidth = this.getData('width');
    // 跑完wrapperWidth所需时间：2s ~ 10s
    var speed = 0.045 + Math.random() * 0.04 + (baidu.ie ? 0.02 : 0); // 每ms移动的像素数
    // var duration = parseInt(wrapperWidth / speed, 10);
    // var duration = (baidu.ie ? 7000 : 5000) + Math.random() * 7000;
    // var speed = wrapperWidth / duration;
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
 * 更新数据
 * @param {Object} data 数据
 */
ad.widget.imageplus.tuhua.Barrage.prototype.updateCommentData = function(data) {
    this.comments = data['comment'];

    var self = ad.widget.imageplus.tuhua.requester.currentUser;
    baidu.each(this.comments, function(item) {
        if (self['user_id'] === item['user_id']) {
            item['is_self'] = true;
        }
    });

    var thumbUp = data['thumb_up'] || '0';
    var thumbDown = data['thumb_down'] || '0';
    this.showThumbCount(thumbUp, thumbDown);

    if (!this.comments || !this.comments.length) {
        this.comments = [
            {
                'desc': '亲，来发表评论吧~'
            }
        ];
    }

    this.runBarrage();
};

/**
 * 重置队列，重新展现：列入窗口大小变动，需要调整弹幕宽度
 */
ad.widget.imageplus.tuhua.Barrage.prototype.resetQueue = function() {
    this.updateCommentData({
        'comment': this.comments
    });
};

/**
 * 显示顶踩数目
 * @param {?number} thumbUp 顶数
 * @param {?number} thumbDown 踩数
 */
ad.widget.imageplus.tuhua.Barrage.prototype.showThumbCount = function(thumbUp, thumbDown) {
    if (thumbUp != null) {
        var upEle = baidu.g(this.getId('thumb-up-count'));
        upEle.innerHTML = thumbUp;
        upEle.setAttribute('data-count', thumbUp);
    }
    if (thumbDown != null) {
        var downEle = baidu.g(this.getId('thumb-down-count'));
        downEle.innerHTML = thumbDown;
        downEle.setAttribute('data-count', thumbDown);
    }
};

/**
 * 顶 +1
 */
ad.widget.imageplus.tuhua.Barrage.prototype.increaseThumbUp = function() {
    var upEle = baidu.g(this.getId('thumb-up-count'));
    var prev = baidu.dom.getAttr(upEle, 'data-count');
    if (prev) {
        prev = parseInt(prev, 10);
    }
    else {
        prev = 0;
    }
    var thumbUp = prev + 1;
    upEle.innerHTML = thumbUp;
    upEle.setAttribute('data-count', thumbUp);
};

/**
 * 踩 +1
 */
ad.widget.imageplus.tuhua.Barrage.prototype.increaseThumbDown = function() {
    var downEle = baidu.g(this.getId('thumb-down-count'));
    var prev = baidu.dom.getAttr(downEle, 'data-count');
    if (prev) {
        prev = parseInt(prev, 10);
    }
    else {
        prev = 0;
    }
    var thumbDown = prev + 1;
    downEle.innerHTML = thumbDown;
    downEle.setAttribute('data-count', thumbDown);
};

/**
 * 有新消息
 * @param {number} opt_number 消息数目
 */
ad.widget.imageplus.tuhua.Barrage.prototype.shake = function(opt_number) {
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
 * 更新新邮件提示
 */
ad.widget.imageplus.tuhua.Barrage.prototype.showUnreadMailCount = function(count) {
    this.unreadMailCount = count;
    this.shake(count);
};

/**
 * 隐藏widget
 */
ad.widget.imageplus.tuhua.Barrage.prototype.hide = function() {
    var root = this.getRoot();
    if (root) {
        baidu.dom.addClass(root, 'ad-barrage-hide');
    }
    this.hidden = true;
    this.pauseBarrage();
};

/**
 * 显示widget
 */
ad.widget.imageplus.tuhua.Barrage.prototype.show = function() {
    var root = this.getRoot();
    if (root) {
        baidu.dom.removeClass(root, 'ad-barrage-hide');
    }
    this.hidden = false;
    this.resumeBarrage();
    this.fillQueue();
};

/**
 * 销毁
 */
ad.widget.imageplus.tuhua.Barrage.prototype.dispose = function() {
    this.bfx.end();
    ad.widget.imageplus.tuhua.Barrage.superClass.dispose.call(this);
};
























/* vim: set ts=4 sw=4 sts=4 tw=100: */

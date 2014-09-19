/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/

/*global er:false */

/**
 * src/ad/widget/imageplus/tuhua/board.js ~ 2014/05/29 16:07:09
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * board相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('er.template');
goog.require('ad.widget.Widget');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.imageplus.tuhua.requester');
goog.require('ui.events');
goog.require('ad.widget.imageplus.tuhua.complainType');

goog.include('ad/widget/imageplus/tuhua/base.less');
goog.include('ad/widget/imageplus/tuhua/board.less');
goog.include('ad/widget/imageplus/tuhua/board.html');

goog.provide('ad.widget.imageplus.tuhua.Board');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.imageplus.tuhua.Board = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_tuhua_board';

    /**
     * @type {number}
     */
    this.current;

    this.leaveMessageContext = {};

    this.prevBoard = 'comment';

    this.currentBoard = 'comment';

    this.mode = 'righttop'; // fullcover, righttop, center, center-with-background

    this.isVisible = false;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.imageplus.tuhua.Board, ad.widget.Widget);

/** @override */
ad.widget.imageplus.tuhua.Board.prototype.enterDocument = function() {
    ad.widget.imageplus.tuhua.Board.superClass.enterDocument.call(this);

    // 如果后端指定了服务器地址，设置进去
    var host = this.getData('box.tuhua.host');
    if (host) {
        ad.widget.imageplus.tuhua.requester.setHost(host);
    }

    // 发起请求获取图片评论
    this.loadComment();

    // 设置切换窗口容器的宽度
    var carouselBody = baidu.g(this.getId('comment'));
    baidu.dom.setStyle(carouselBody, 'width', (2 * this.getData('carousel_width')) + 'px');

    var root = this.getRoot();
    baidu.dom.addClass(root, 'ad-tuhua-mode-' + this.mode);

    var right = parseInt((this.getData('image_width') - this.getData('width')) / 2, 10);
    var top = parseInt((this.getData('image_height') - this.getData('height')) / 2, 10);
    if (this.mode === 'center') {
        baidu.dom.setStyles(root, {
            'right': right + 'px',
            'top': top + 'px'
        });
    }
    else if (this.mode === 'center-with-background') {
        var panel = baidu.g(this.getId('panel'));
        baidu.dom.setStyles(panel, {
            'right': right + 'px',
            'top': top + 'px'
        });
    }

    if (COMPILED) {
        baidu.dom.setStyles(root, {
            'width': 0,
            'height': 0
        });
    }
};

/** @override */
ad.widget.imageplus.tuhua.Board.prototype.bindEvent = function() {
    ad.widget.imageplus.tuhua.Board.superClass.bindEvent.call(this);

    var me = this;
    // 向左切换消息
    baidu.on(baidu.g(this.getId('arrow-prev')), 'click', function(e) {
        baidu.event.preventDefault(e);
        if (!me.comments || me.comments.length <= 1) {
            return false;
        }
        me.putMessage('right');
        me.move('right');
        me.randomBackground();
        me.scrollMessage();
    });
    // 向右切换消息
    baidu.on(baidu.g(this.getId('arrow-next')), 'click', function(e) {
        baidu.event.preventDefault(e);
        if (!me.comments || me.comments.length <= 1) {
            return false;
        }
        me.putMessage();
        me.move();
        me.randomBackground();
        me.scrollMessage();
    });

    // 鼠标悬浮于消息上时停止切换，离开时启动切换
    var carouselBody = baidu.g(this.getId('comment'));
    var wrapper = carouselBody.parentNode;
    baidu.on(wrapper, 'mouseenter', function(e) {
        me.stopScroll();
    });
    baidu.on(wrapper, 'mouseleave', function(e) {
        me.scrollMessage();
    });

    // 评论输入框展开
    var commentEntry = baidu.g(this.getId('comment-entry'));
    baidu.on(commentEntry, 'click', function(e) {
        me.changeInputType('comment');
        baidu.event.preventDefault(e);
    });

    // 点击展现回复评论
    baidu.on(wrapper, 'click', function(e) {
        var target = baidu.event.getTarget(e);
        if (target
            && target.nodeType === 1
        ) {
            if (baidu.dom.hasClass(target, 'ad-act-reply-comment')) {
                var message = baidu.json.parse(target.getAttribute('data-context'));
                me.changeInputType('reply-comment', message);
                baidu.event.preventDefault(e);
            }
            else if (baidu.dom.hasClass(target, 'ad-act-complain')) {
                var message = baidu.json.parse(target.getAttribute('data-context'));
                me.switchToComplain(message);
                baidu.event.preventDefault(e);
            }
        }
    });

    // 评论或回复
    var replyButton = baidu.g(this.getId('reply-button'));
    baidu.on(replyButton, 'click', function(e) {
        me.leaveMessage();
        baidu.event.preventDefault(e);
    });

    // 绑定事件
    var replyInput = baidu.g(this.getId('reply-input'));
    var inputHandler = baidu.fn.bind(me.inputHandler, me);
    if (baidu.ie) {
        // XXX: 会被编译优化掉，所以用中括号...
        replyInput['onpropertychange'] = inputHandler;
    }
    else {
        baidu.on(replyInput, 'input', inputHandler);
    }
    replyInput.onkeypress = baidu.fn.bind(me.keypressHandler, me);

    var mailTab = baidu.g(this.getId('mail-tab'));
    var commentTab = baidu.g(this.getId('comment-tab'));
    // 切换到邮件面板
    baidu.on(mailTab, 'click', function(e) {
        me.switchToMail();
        baidu.event.preventDefault(e);
    });
    // 切换到消息面板
    baidu.on(commentTab, 'click', function(e) {
        me.switchToComment();
        baidu.event.preventDefault(e);
    });
    // 切换到用户须知面板
    baidu.on(this.getId('notice'), 'click', function(e) {
        me.switchToNotice();
        baidu.event.preventDefault(e);
    });
    // 发表评论icon
    var plusIcon = baidu.g(this.getId('plus-icon'));
    baidu.on(plusIcon, 'click', function(e) {
        if (me.currentBoard !== 'comment') {
            me.switchToComment();
        }
        me.changeInputType('comment');
        baidu.event.preventDefault(e);
    });

    // 邮件列表中，点击进入邮件详情
    var mailBoard = baidu.g(this.getId('mail-board'));
    baidu.on(mailBoard, 'click', function(e) {
        var target = baidu.event.getTarget(e);
        if (target
            && target.nodeType === 1
            && baidu.dom.hasClass(target, 'ad-act-mail-entry')
        ) {
            me.switchToMailDetail(target);
            baidu.event.preventDefault(e);
        }
    });

    // 点击返回ICON
    var returnIcon = baidu.g(this.getId('return'));
    baidu.on(returnIcon, 'click', function(e) {
        if (me.currentBoard === 'comment') {
            me.trigger(ui.events.RETURN);
        }
        else if (me.currentBoard === 'mail') {
            me.switchToComment();
        }
        else if (me.currentBoard === 'notice'
            || me.currentBoard === 'complain'
        ) {
            me.switchToComment();
        }
        else if (me.currentBoard === 'mail-detail') {
            me.switchToMail();
        }
        baidu.event.preventDefault(e);
    });

    // 点击举报类型
    baidu.on(this.getId('complain-board'), 'click', function(e) {
        var target = baidu.event.getTarget(e);
        if (target
            && target.nodeType === 1
            && (target.nodeName === 'INPUT'
                || target.nodeName === 'LABEL'
            )
        ) {
            me.checkComplainRadio();
        }
    });

    // 发送投诉
    baidu.on(this.getId('complain-submit'), 'click', function(e) {
        var type = me.getComplainType();
        if (type == null) {
            me.showErrorTip('请选择投诉类型！');
        }
        else {
            var input = baidu.g(me.getId('complain-reason'));
            var other = ad.string.trim(input.value);
            me.makeComplain(type, other);
        }
        baidu.event.preventDefault(e);
    });

    var userPanel = baidu.g(this.getId('user-panel'));
    var userPanelWrapper = userPanel.parentNode;
    function showUserPanel(e) {
        ad.base.clearTimeout(me.panelTimer);
        baidu.addClass(userPanelWrapper, 'ad-tuhua-user-panel-hover');
    }
    function hideUserPanel(e) {
        ad.base.clearTimeout(me.panelTimer);
        me.panelTimer = ad.base.setTimeout(
            function() {
                baidu.removeClass(userPanelWrapper, 'ad-tuhua-user-panel-hover');
                me.panelTimer = null;
            },
            400
        );
    }
    baidu.on(userPanelWrapper, 'mouseenter', showUserPanel);
    baidu.on(userPanelWrapper, 'mouseleave', hideUserPanel);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    if (loaderApi) {
        var lastRect = null;
        loaderApi.addListener(ui.events.RESIZE, function(evt, rect) {
            if (lastRect
                && lastRect['width'] === rect['width']
                && lastRect['height'] === rect['height']
            ) {
                return;
            }
            lastRect = rect;
            me.refresh();
            if (me.isVisible) {
                me.show();
                me.switchToComment();
            }
        });
    }
};

ad.widget.imageplus.tuhua.Board.prototype.makeComplain = function(type, other) {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        var message = this.complainContext['data'];
        ad.widget.imageplus.tuhua.requester.makeComplain(
            img.src,
            message['user_id'],
            message['desc_id'],
            type,
            other,
            function(data) {
                if (data['if_succ'] === 1) {
                    me.showSuccessTip('发送投诉成功!');
                    var input = baidu.g(me.getId('complain-reason'));
                    input.value = '';
                    me.switchToComment();
                }
                // else {
                    // XXX: 这个不显示？
                    // me.showErrorTip('发送投诉失败!');
                // }
            }
        );
    }
};

/**
 * 获取投诉类型选择
 */
ad.widget.imageplus.tuhua.Board.prototype.getComplainType = function() {
    var radios = document.getElementsByName(this.getId('complain-type'));
    var type = null;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            type = radios[i].value;
        }
    }
    return type;
};

/**
 * 检查投诉类型RadioBox的选择
 */
ad.widget.imageplus.tuhua.Board.prototype.checkComplainRadio = function() {
    var type = this.getComplainType();
    var input = baidu.g(this.getId('complain-reason'));
    if (type === '999') {
        baidu.show(input);
        input.focus();
    }
    else {
        baidu.hide(input);
    }
};

/**
 * 随机背景
 */
ad.widget.imageplus.tuhua.Board.prototype.randomBackground = function() {
    if (this.currentBoard !== 'comment') {
        return;
    }
    function randomColor() {
        return parseInt(Math.random()*128, 10);
    }
    function toHex(number) {
        var hex = number.toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    }
    var colorVector = [randomColor(), randomColor(), randomColor()];
    var hexVector = [];
    for (var i = 0; i < colorVector.length; i++) {
        hexVector.push(toHex(colorVector[i]));
    }
    var root = this.getRoot();
    if (baidu.ie && baidu.ie < 9) {
        var hexColor = hexVector.join('');
        var value = baidu.format(
            'progid:DXImageTransform.Microsoft.gradient(startColorstr=#cc{0},endColorstr=#cc{0})',
            hexColor
        );
        baidu.dom.setStyles(root, {
            'filter': value,
            'msFilter': value
        });
    }
    else {
        baidu.dom.setStyle(root, 'background', 'rgba(' + colorVector.join(', ') + ', 0.8)');
    }
};

/**
 * 输入改变处理函数
 */
ad.widget.imageplus.tuhua.Board.prototype.inputHandler = function() {
    var replyInput = baidu.g(this.getId('reply-input'));
    var replyTo = baidu.g(this.getId('reply-to'));
    var label = replyTo.parentNode;
    var content = ad.string.trim(replyInput.value);
    if (!content && this.leaveMessageContext['showLabel']) {
        baidu.show(label);
    }
    else {
        baidu.hide(label);
    }
};

/**
 * 回车处理函数
 */
ad.widget.imageplus.tuhua.Board.prototype.keypressHandler = function(e) {
    e = e || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        this.leaveMessage();
    }
};

/**
 * 切换到mail面板
 */
ad.widget.imageplus.tuhua.Board.prototype.hideAllBoard = function() {
    var replyContainer = baidu.g(this.getId('reply-container'));
    var foot = replyContainer.parentNode;
    baidu.hide(foot);

    var boards = baidu.q('ad-tuhua-body', baidu.g(this.getId()));
    baidu.each(boards, function(board) {
        baidu.hide(board);
    });
};

/**
 * 切换到mail面板
 */
ad.widget.imageplus.tuhua.Board.prototype.switchToMail = function() {
    this.prevBoard = this.currentBoard;

    this.currentBoard = 'mail';
    this.hideAllBoard();

    var mailBoard = baidu.g(this.getId('mail-board'));
    baidu.show(mailBoard);

    // 切换到邮件面板，重新加载数据
    this.loadMail();
};

/**
 * 切换到comment面板
 * @param {boolean=} opt_toReload 是否重新加载
 */
ad.widget.imageplus.tuhua.Board.prototype.switchToComment = function(opt_toReload) {
    var toReload = opt_toReload === true;
    this.prevBoard = this.currentBoard;
    this.currentBoard = 'comment';
    this.hideAllBoard();

    var commentBoard = baidu.g(this.getId('comment-board'));
    baidu.show(commentBoard);
    // this.changeInputType('comment-entry');
    this.changeInputType('comment');

    if (toReload) {
        // 切换到评论面板，重新加载数据
        this.loadComment();
    }

    if (this.emptyFlag) {
        this.changeInputType('comment');
    }
};

/**
 * 切换到用户须知面板
 */
ad.widget.imageplus.tuhua.Board.prototype.switchToNotice = function() {
    this.prevBoard = this.currentBoard;

    this.currentBoard = 'notice';
    this.hideAllBoard();

    var noticeBoard = baidu.g(this.getId('notice-board'));
    baidu.show(noticeBoard);
};

/**
 * 切换到举报面板
 */
ad.widget.imageplus.tuhua.Board.prototype.switchToComplain = function(message) {
    this.complainContext = {
        'data': message
    };
    this.prevBoard = this.currentBoard;

    this.currentBoard = 'complain';
    this.hideAllBoard();

    var complainBoard = baidu.g(this.getId('complain-board'));
    baidu.show(complainBoard);

    var complainObjectEle = baidu.g(this.getId('complain-object'));
    complainObjectEle.innerHTML = baidu.format(
        er.template.get('AD_ad_widget_imageplus_tuhua_board_complain_object'),
        {
            'user_pic': message['user_pic'],
            'user_name': baidu.string.encodeHTML(message['user_name']),
            'desc': baidu.string.encodeHTML(message['desc'])
        }
    );
};

/**
 * 切换到mail detail面板
 */
ad.widget.imageplus.tuhua.Board.prototype.switchToMailDetail = function(target) {
    this.prevBoard = this.currentBoard;

    this.currentBoard = 'mail-detail';
    this.hideAllBoard();

    var mailDetailBoard = baidu.g(this.getId('mail-detail-board'));
    baidu.show(mailDetailBoard);

    var message = baidu.json.parse(target.getAttribute('data-context'));
    this.changeInputType('reply-mail', message);

    this.loadMailDetail(message);
};

/**
 * 切换输入状态
 *
 * @param {string} type 输入类型
 * @param {Object=} opt_data 关联的消息数据
 */
ad.widget.imageplus.tuhua.Board.prototype.changeInputType = function(type, opt_data) {
    var data = opt_data;
    this.leaveMessageContext = {
        'type': type,
        'data': data,
        'showLabel': false
    };

    var commentEntry = baidu.g(this.getId('comment-entry'));
    var replyContainer = baidu.g(this.getId('reply-container'));
    var replyTo = baidu.g(this.getId('reply-to'));
    var replyButton = baidu.g(this.getId('reply-button'));
    var label = replyTo.parentNode;
    var show = false;
    if (type === 'comment-entry') {
        baidu.show(commentEntry);
        baidu.dom.removeClass(replyContainer, 'ad-reply-container-open');
        baidu.hide(label);
        show = true;
    }
    else if (type === 'comment') {
        baidu.hide(commentEntry);
        baidu.dom.addClass(replyContainer, 'ad-reply-container-open');
        baidu.hide(label);
        replyButton.innerHTML = '发表';
        show = true;
    }
    else if (type === 'reply-comment') {
        var selfId = ad.widget.imageplus.tuhua.requester.currentUser['user_id'];
        if (data['user_id'] === selfId) {
            this.showInfoTip('不能回复自己！');
            return;
        }
        baidu.hide(commentEntry);
        baidu.dom.addClass(replyContainer, 'ad-reply-container-open');
        baidu.show(label);
        replyTo.innerHTML = data['user_name'];
        replyButton.innerHTML = '回复';
        show = true;

        this.leaveMessageContext['showLabel'] = true;
    }
    else if (type === 'reply-mail') {
        baidu.hide(commentEntry);
        baidu.dom.addClass(replyContainer, 'ad-reply-container-open');
        baidu.show(label);
        replyTo.innerHTML = data['user_name'];
        replyButton.innerHTML = '回复';
        show = true;

        this.leaveMessageContext['showLabel'] = true;
    }
    else if (type === 'hidden') {
        show = false;
    }
    var foot = replyContainer.parentNode;
    var replyInput = baidu.g(this.getId('reply-input'));
    if (show) {
        baidu.show(foot);
        replyInput.focus();
    }
    else {
        baidu.hide(foot);
    }

    if (this.currentBoard !== this.prevBoard) {
        this.clearInput();
    }
    else {
        this.inputHandler();
    }
};

/** @override */
ad.widget.imageplus.tuhua.Board.prototype.patchData = function() {
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var imageWidth = 500;
    var imageHeight = 400;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        imageWidth = Math.max(rect['width'], 300);
        imageHeight = Math.max(rect['height'], 200);
    }
    this._data['image_width'] = imageWidth;
    this._data['image_height'] = imageHeight;

    var maxWidth = 360;
    var maxHeight = 270;

    var width;
    var height;
    // 全屏
    if (this.mode === 'fullcover') {
        width = imageWidth;
        height = imageHeight;
        this._data['bg_width'] = imageWidth;
        this._data['bg_height'] = imageHeight;
        this._data['width'] = width;
        this._data['height'] = height;
    }
    // 右上
    else if (this.mode === 'righttop') {
        width = Math.min(imageWidth - 20, maxWidth);
        height = Math.min(imageHeight - 20, maxHeight);
        this._data['bg_width'] = width;
        this._data['bg_height'] = height;
        this._data['width'] = width;
        this._data['height'] = height;
    }
    // 居中
    else if (this.mode === 'center') {
        width = Math.min(imageWidth, maxWidth);
        height = Math.min(imageHeight, maxHeight);
        this._data['bg_width'] = width;
        this._data['bg_height'] = height;
        this._data['width'] = width;
        this._data['height'] = height;
    }
    // 居中带全屏背景
    else if (this.mode === 'center-with-background') {
        width = Math.min(imageWidth, maxWidth);
        height = Math.min(imageHeight, maxHeight);
        this._data['bg_width'] = imageWidth;
        this._data['bg_height'] = imageHeight;
        this._data['width'] = width;
        this._data['height'] = height;
    }

    this._data['body_width'] = width - 20;
    this._data['carousel_width'] = width - 80;
    this._data['body_height'] = height - 60;
    this._data['carousel_height'] = height - 106;
    this._data['input_width'] = width - 130;
    this._data['input_width_iefix'] = width - 130 - 8;

    var lineCount = parseInt((this.getData('carousel_height') - 80) / 21, 10);
    var bytePerLine = parseInt(this.getData('carousel_width') / 17, 10) * 2;
    this.commentByteLength = Math.max(lineCount * bytePerLine - 3, 10); // 3为预留空间

    this._data['complain_types'] = ad.widget.imageplus.tuhua.complainType;
};

/**
 * 有新消息
 * @param {number} opt_number 消息数目
 */
ad.widget.imageplus.tuhua.Board.prototype.shake = function(opt_number) {
    var messageNumber = baidu.g(this.getId('message-count'));
    var shakeEle = messageNumber.parentNode;
    if (opt_number && opt_number > 0) {
        messageNumber.innerHTML = opt_number;
        baidu.dom.addClass(shakeEle, 'ad-icon-mail-shake');
    }
    else {
        messageNumber.innerHTML = '';
        baidu.dom.removeClass(shakeEle, 'ad-icon-mail-shake');
    }
    // TODO: for browser not support animation
};

/**
 * 轮播显示消息
 */
ad.widget.imageplus.tuhua.Board.prototype.scrollMessage = function() {
    this.stopScroll();
    if (!this.comments || this.comments.length <= 1) {
        return false;
    }
    var me = this;
    this.timer = ad.base.setTimeout(
        function() {
            me.putMessage();
            me.move();
            me.randomBackground();
            me.scrollMessage();
        },
        this.getData('interval', 6000)
    );
};

/**
 * 移动消息
 * @param {string=} opt_direction 移动方向
 * @param {boolean=} opt_noeffect 略过特效
 */
ad.widget.imageplus.tuhua.Board.prototype.move = function(opt_direction, opt_noeffect) {
    var direction = opt_direction || 'left';
    var carouselBody = baidu.g(this.getId('comment'));
    var me = this;
    var duration = 300;
    var start;
    var end;
    if (direction === 'left') {
        start = 0;
        end = - carouselBody.children[0].offsetWidth;
    }
    else {
        start = - carouselBody.children[0].offsetWidth;
        end = 0;
    }
    if (this._running) {
        this._fx.end();
    }
    if (opt_noeffect === true) {
        carouselBody.style.left = end + 'px';
        clearScene();
    }
    var fx = ad.fx.create(carouselBody, {
        __type: 'comment-scroll',
        duration: duration,
        render: function(schedule) {
            carouselBody.style.left = (start + (end - start) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;

        clearScene();
    });
    fx.launch();
    this._fx = fx;
    this._running = true;

    /**
     * 清理
     */
    function clearScene() {
        if (direction === 'left' && carouselBody.children.length > 1) {
            baidu.dom.remove(carouselBody.children[0]);
        }
        else if (carouselBody.children.length > 1) {
            carouselBody.children[1] && baidu.dom.remove(carouselBody.children[1]);
        }
        baidu.dom.setStyle(carouselBody, 'left', '0');
    }
};

/**
 * 往容器里增加消息
 * @param {string=} opt_direction 消息滚动方向
 */
ad.widget.imageplus.tuhua.Board.prototype.putMessage = function(opt_direction) {
    var direction = opt_direction || 'left';
    var len = this.comments.length;
    if (this.current == null) {
        this.current = 0;
    }
    else {
        if (direction === 'left') {
            this.current = (this.current + 1) % len;
        }
        else {
            this.current = (this.current + len - 1) % len;
        }
    }
    var message = this.comments[this.current];
    var div = baidu.dom.create('div', {
        'class': 'ad-slide-item'
    });
    var self = ad.widget.imageplus.tuhua.requester.currentUser;
    var isSelf = self['user_id'] === message['user_id'];
    var userName = message['user_name']
        ? (isSelf
            ? '我 (' + message['user_name'] + ')'
            : message['user_name']
        )
        : '';
    baidu.dom.setStyle(div, 'width', this.getData('carousel_width') + 'px');
    var desc = baidu.string.encodeHTML(ad.base.subByte(message['desc'], this.commentByteLength, '...'));
    div.innerHTML = baidu.format(
        er.template.get('AD_ad_widget_imageplus_tuhua_board_carousel_item'),
        {
            'user_name': baidu.string.encodeHTML(ad.base.subByte(userName, 24, '..')),
            'user_pic': baidu.string.encodeHTML(message['user_pic']),
            'desc': desc,
            'title': (
                /\.\.\.$/.test(desc)
                    ? baidu.string.encodeHTML(message['desc'])
                    : ''
            ),
            'context': baidu.string.encodeHTML(baidu.json.stringify(message)),
            'extra_class': (
                (
                    userName
                        ? ''
                        : ' ad-user-nocomment'
                )
                + (
                     isSelf
                        ? ' ad-user-self'
                        : ''
                )
            )
        }
    );
    var carouselBody = baidu.g(this.getId('comment'));
    if (direction === 'left') {
        carouselBody.appendChild(div);
    }
    else {
        var first = baidu.dom.first(carouselBody);
        if (first) {
            baidu.dom.insertBefore(div, first);
        }
        else {
            carouselBody.appendChild(div);
        }
    }
};

/**
 * 停止消息切换
 */
ad.widget.imageplus.tuhua.Board.prototype.stopScroll = function() {
    if (this.timer) {
        ad.base.clearTimeout(this.timer);
    }
};

/**
 * 切换到指定评论
 *
 * @param {string} descId 评论ID
 */
ad.widget.imageplus.tuhua.Board.prototype.scrollToComment = function(descId) {
    var index = -1;
    for (var i = 0; i < this.comments.length; i++) {
        var message = this.comments[i];
        if (message['desc_id'] === descId) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        this.current = index - 1;
        if (!this.comments || this.comments.length <= 1) {
            return;
        }
        this.putMessage();
        this.move('left', true);
        this.randomBackground();
        this.scrollMessage();
    }
};

/**
 * 获取指定评论详细信息
 */
ad.widget.imageplus.tuhua.Board.prototype.getComment = function(descId) {
    for (var i = 0; i < this.comments.length; i++) {
        var message = this.comments[i];
        if (message['desc_id'] === descId) {
            return message;
        }
    }
    return null;
};

/**
 * 更新数据
 */
ad.widget.imageplus.tuhua.Board.prototype.updateCommentData = function(data) {
    this.stopScroll();
    var carouselBody = baidu.g(this.getId('comment'));
    carouselBody.innerHTML = '';
    this.comments = data['comment'];

    if (!this.comments || !this.comments.length) {
        this.comments = [
            {
                'desc': '还没有人评论哦，来发表评论吧~'
            }
        ];
        this.emptyFlag = true;
    }
    else {
        this.emptyFlag = false;
    }
    if (this.emptyFlag && this.currentBoard === 'comment') {
        this.changeInputType('comment');
    }

    if (this.comments.length) {
        this.putMessage();
        if (this.comments.length > 1) {
            this.scrollMessage();
        }
    }
};

/**
 * 显示邮件列表
 */
ad.widget.imageplus.tuhua.Board.prototype.showMail = function(data) {
    var mails = data['message'];
    var html = [];
    baidu.each(mails, function(message) {
        html.push(
            baidu.format(
                er.template.get('AD_ad_widget_imageplus_tuhua_board_mail_item'),
                {
                    'user_name': baidu.string.encodeHTML(ad.base.subByte(message['user_name'], 24, '..')),
                    'user_pic': baidu.string.encodeHTML(message['user_pic']),
                    'desc': baidu.string.encodeHTML(message['desc']),
                    'context': baidu.string.encodeHTML(baidu.json.stringify(message))
                }
            )
        );
    });
    var mailList = baidu.g(this.getId('mail-list'));
    mailList.innerHTML = html.join('');
};

/**
 * 显示邮件详情
 */
ad.widget.imageplus.tuhua.Board.prototype.showMailDetail = function(data, relatedMessage) {
    var replys = data['message'];
    var html = [];
    for (var i = replys.length - 1; i >= 0; i--) {
        var message = replys[i];
        var userName;
        var userPic;
        if (message['is_me']) {
            userName = ad.widget.imageplus.tuhua.requester.currentUser['user_name'];
            userPic = ad.widget.imageplus.tuhua.requester.currentUser['user_pic'];
        }
        else {
            userName = relatedMessage['user_name'];
            userPic = relatedMessage['user_pic'];
        }
        html.push(
            baidu.format(
                er.template.get('AD_ad_widget_imageplus_tuhua_board_mail_detail_item'),
                {
                    'user_name': baidu.string.encodeHTML(userName),
                    'user_pic': baidu.string.encodeHTML(userPic),
                    'desc': baidu.string.encodeHTML(message['desc']),
                    'extra_class': (message['is_me'] ? ' ad-mail-detail-item-self' : '')
                }
            )
        );
    }
    var mailDetailList = baidu.g(this.getId('mail-detail-list'));
    mailDetailList.innerHTML = html.join('');
    mailDetailList.scrollTop = mailDetailList.scrollHeight + 100;
};

/**
 * 更新新邮件提示
 */
ad.widget.imageplus.tuhua.Board.prototype.showUnreadMailCount = function(count) {
    this.shake(count);
};

/**
 * 转换成合法的邮件个数
 */
ad.widget.imageplus.tuhua.Board.prototype.normalizeUnreadMailCount = function(count) {
    count = parseInt(count, 10);
    if (isNaN(count)) {
        count = 0;
    }

    return count;
};

/**
 * 获取关联的图片
 */
ad.widget.imageplus.tuhua.Board.prototype.getRelatedImage = function() {
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

/**
 * 加载评论消息
 */
ad.widget.imageplus.tuhua.Board.prototype.loadComment = function() {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.getComments(
            img.src,
            function(data) {
                var unread = me.normalizeUnreadMailCount(data['sms_num']);
                me.updateCommentData(data);
                me.showUnreadMailCount(unread);
                me.showUserInfo(data);

                me.trigger(ui.events.COMMENT_UPDATED, data);
                me.trigger(ui.events.UNREAD_MAIL_COUNT_UPDATED, unread);
            }
        );
    }
};

/**
 * 显示当前用户信息
 */
ad.widget.imageplus.tuhua.Board.prototype.showUserInfo = function(data) {
    baidu.g(this.getId('user-pic')).src = data['user_pic'];
    baidu.g(this.getId('user-pic')).title = data['user_name'];
    baidu.g(this.getId('user-info')).innerHTML = baidu.format(
        er.template.get('AD_ad_widget_imageplus_tuhua_board_user_panel_content'),
        {
            'user_name': baidu.string.encodeHTML(data['user_name'])
        }
    );
};

/**
 * 加载邮件列表
 */
ad.widget.imageplus.tuhua.Board.prototype.loadMail = function() {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.getMails(
            img.src,
            function(data) {
                var unread = me.normalizeUnreadMailCount(data['sms_num']);
                me.showMail(data);
                me.showUnreadMailCount(unread);

                me.trigger(ui.events.UNREAD_MAIL_COUNT_UPDATED, unread);
            }
        );
    }
};

/**
 * 加载邮件详情
 */
ad.widget.imageplus.tuhua.Board.prototype.loadMailDetail = function(message) {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.getMailDetail(
            img.src,
            message['user_id'],
            message['desc_id'],
            function(data) {
                var unread = me.normalizeUnreadMailCount(data['sms_num']);
                me.showMailDetail(data, message);
                me.showUnreadMailCount(unread);

                me.trigger(ui.events.UNREAD_MAIL_COUNT_UPDATED, unread);
            }
        );
    }
};

/**
 * 显示正常信息
 */
ad.widget.imageplus.tuhua.Board.prototype.showInfoTip = function(msg) {
    this.showTip(msg, 'info');
};

/**
 * 显示成功信息
 */
ad.widget.imageplus.tuhua.Board.prototype.showSuccessTip = function(msg) {
    this.showTip(msg, 'success');
};

/**
 * 显示失败信息
 */
ad.widget.imageplus.tuhua.Board.prototype.showErrorTip = function(msg) {
    this.showTip(msg, 'error');
};

/**
 * 显示提示信息
 */
ad.widget.imageplus.tuhua.Board.prototype.showTip = function(msg, cssPostfix) {
    var tip = baidu.g(this.getId('tip'));
    tip.innerHTML = '<span class="ad-tip-' + cssPostfix + '">' + baidu.string.encodeHTML(msg) + '</span>';
    baidu.show(tip);

    this.tipTimer && ad.base.clearTimeout(this.tipTimer);
    this.tipTimer = ad.base.setTimeout(
        function() {
            baidu.hide(tip);
            this.tipTimer = null;
        },
        3000
    );
};

/**
 * 发表评论
 */
ad.widget.imageplus.tuhua.Board.prototype.makeComment = function(comment) {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.makeComment(
            img.src,
            comment,
            function(data) {
                if (data['if_succ'] === 1) {
                    me.showSuccessTip('发表成功!');
                    me.insertComment(comment);
                    me.clearInput();
                }
                else if (data['if_succ'] === 2) {
                    me.showErrorTip('抱歉，您发表的内容里有敏感内容，请修改后发表!');
                }
                else {
                    me.showErrorTip('发表失败!');
                }
            }
        );
    }
};

/**
 * 回复某条评论
 */
ad.widget.imageplus.tuhua.Board.prototype.replyComment = function(message, reply, callback) {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.replyComment(
            img.src,
            message['user_id'],
            message['desc_id'],
            reply,
            function(data) {
                if (data['if_succ'] === 1) {
                    me.showSuccessTip('回复成功！');
                    me.loadComment();
                    me.clearInput();

                    callback && callback();
                }
                else {
                    me.showErrorTip('回复失败!');
                }
            }
        );
    }
};

/**
 * 将用户自己发表的评论插入到面板中
 * @param {string} comment 评论内容
 */
ad.widget.imageplus.tuhua.Board.prototype.insertComment = function(comment) {
    var descId = '__selfcomment' + ad.base.uuid();
    var self = ad.widget.imageplus.tuhua.requester.currentUser;
    var item = {
        'desc': comment,
        'desc_id': descId,
        'user_id': self['user_id'],
        'user_name': self['user_name'],
        'user_pic': self['user_pic']
    };
    this.comments.push(item);
    this.scrollToComment(descId);
};

/**
 * 回复某条邮件
 */
ad.widget.imageplus.tuhua.Board.prototype.replyMail = function(relatedMessage, reply) {
    var me = this;
    var img = this.getRelatedImage();
    if (img) {
        ad.widget.imageplus.tuhua.requester.replyMail(
            img.src,
            relatedMessage['user_id'],
            relatedMessage['desc_id'],
            reply,
            function(data) {
                if (data['if_succ']) {
                    me.showSuccessTip('回复成功！');
                    me.loadMailDetail(relatedMessage);
                    me.clearInput();
                }
                else {
                    me.showErrorTip('回复失败!');
                }
            }
        );
    }
};

/**
 * 清空输入框
 */
ad.widget.imageplus.tuhua.Board.prototype.clearInput = function() {
    var replyInput = baidu.g(this.getId('reply-input'));

    replyInput.value = '';
    this.inputHandler();
};

/**
 * 留言评论或回复
 */
ad.widget.imageplus.tuhua.Board.prototype.leaveMessage = function() {
    var replyInput = baidu.g(this.getId('reply-input'));
    var content = ad.string.trim(replyInput.value);
    if (!content) {
        this.showErrorTip('消息内容不能为空！');
        return;
    }
    var context = this.leaveMessageContext;
    var type = context['type'];
    var message = context['data'];
    if (type === 'comment') {
        this.makeComment(content);
    }
    else if (type === 'reply-comment') {
        var me = this;
        this.replyComment(message, content, function() {
            me.changeInputType('comment');
        });
    }
    else if (type === 'reply-mail') {
        this.replyMail(message, content);
    }
};

/** @override */
ad.widget.imageplus.tuhua.Board.prototype.show = function() {
    ad.widget.imageplus.tuhua.Board.superClass.show.call(this);

    this.isVisible = true;

    var root = this.getRoot();
    baidu.show(root);
    baidu.dom.setStyles(root, {
        'width': this.getData('bg_width') + 'px',
        'height': this.getData('bg_height') + 'px'
    });
};

/** @override */
ad.widget.imageplus.tuhua.Board.prototype.hide = function() {
    this.isVisible = false;

    var root = this.getRoot();
    baidu.dom.setStyles(root, {
        // 'width': 0,
        'height': 0
    });
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */

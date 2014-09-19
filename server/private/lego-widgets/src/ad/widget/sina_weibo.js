/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sina_weibo.js 9823 2012-06-19 02:51:16Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/sina_weibo.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9823 $
 * @description
 * 头部小微博效果
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/sina_weibo.html');
goog.include('ad/widget/sina_weibo.less');

goog.provide('ad.widget.SinaWeibo');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.SinaWeibo = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_sina_weibo';

    window['sinaWB'] = this;

    /**
     * 是否正在进行检查登陆轮询
     * 确保一次只有一个轮询
     * @type {Boolean}
     */
    this.isCheckingLogin = false;

    /**
     * @type {Object}
     */
    this.weiboResult;

    /** 自定义微博内容title2前缀
     * @type {string}
     */
    this.customContextTitle2Prx = 'sina-weibo-link';
};
baidu.inherits(ad.widget.SinaWeibo, ad.widget.Widget);

/**
 * 微博接口
 * @type {Object}
 */
ad.widget.SinaWeibo.prototype._remoteApi = {
    'baseUrl': RT_CONFIG.HOST('wbapi.baidu.com') + '/service/oauth/',
    // baseUrl: 'http://1.0.66-wbapi.baidu.com.r.bae.baidu.com:8081/service/oauth/',
    'apis': {
        'userTimeline': 'user_timeline?source=sina&id=#{id}&_uri=/statuses/user_timeline.json',
        'follow': 'attention?source=sina&id=#{id}&_uri=/friendships/create.json',
        'favorite': 'store?source=sina&id=#{id}&_uri=/favorites/create.json',
        'loginStatus': 'login_status?source=sina&version=simple&xd=#{xdpath}'
    }
};
/**
 * 生成微博接口调用URL
 * @param  {String} name API名称
 * @param  {Object} data 用于提交的数据
 * @return {String}      调用URL
 */
ad.widget.SinaWeibo.prototype._getRemoteApiUrl = function(name, data) {
    var url = '';
    if (name in this._remoteApi['apis']) {
        url = this._remoteApi['apis'][name];
        for (var i in data) {
            url = url.replace('#{' + i + '}', data[i]);
        }
        url = this._remoteApi['baseUrl'] + url;
    }
    return url;
};

/**
 * @override
 */
ad.widget.SinaWeibo.prototype.enterDocument = function() {
    ad.widget.SinaWeibo.superClass.enterDocument.call(this);
    var me = this;

    var url = this._getRemoteApiUrl('userTimeline', { 'id': me._data['id'] });
    me._data['id'] && baidu.sio.callByServer(url, function(sResult) { // 有id时才
        if (sResult && sResult[0]) {
            // oauth
            me.weiboResult = sResult[0];
        }
        else if (sResult && sResult['statuses'] && sResult['statuses'][0]) {

            // oauth2
            // 这个分支应该不容易达到,因为我们在服务器端做过了适配,将oauth2的user_timeline结果
            // 修改为oauth的user_timeline结果.如果不做适配的话,就需要将线上所有的物料都更新一边,影响
            // 比较大
            me.weiboResult = sResult['statuses'][0];
        }

        if (me.weiboResult) {
            if (me.weiboResult['mid']) {
                baidu.g(me.getId('crit')).setAttribute(
                    'href',
                    'http://weibo.com/' + me._data['id'] + '/' + me.weiboResult['mid']
                );
            }
            if (me._data['is_display_fans']) {
                baidu.g(me.getId('fans')).innerHTML = me.weiboResult['user']['followers_count'];
            }
            if (me._data['is_display_weibo']) {
                baidu.g(me.getId('weibo')).innerHTML = me.weiboResult['user']['statuses_count'];
            }
            // 如果设定了name 则使用name作为微博名称 否则取真实数据
            baidu.g(me.getId('name')).innerHTML = me._data['name'] || me.weiboResult['user']['name'];
            baidu.g(me.getId('context')).innerHTML = me._data['context']
                ? me._data['context']
                : me._weiboContentFormat();
            var weiboCreateTime = me._parseStrToDate(me.weiboResult['created_at']);
            if (me._data['is_display_foot']) {
                baidu.g(me.getId('datetime')).innerHTML = weiboCreateTime.date + '&nbsp;' + weiboCreateTime.time;
            }
            me.trigger(ui.events.TIME_LINE_LOADED, sResult[0]);
            // 微博内容文字链加title2
            var panelContext = baidu.g(me.getId('context'));
            var links = panelContext.getElementsByTagName('A');
            if (links.length) {
                for (var i = 0, l = links.length; i < l; i++) {
                    var key = links[i];
                    key.setAttribute('title2', me.customContextTitle2Prx + (i + 1));
                }
            }
        }
    });
    url = this._getRemoteApiUrl('loginStatus', { 'xdpath': me._data['xdpath'] });
    baidu.sio.callByServer(url, function(sResult) {
        if (sResult['success'] === 1) {
            me['loginStatus'] = true;
        }
        else {
            me['loginStatus'] = false;
            me.loginUrl = sResult['login_url'];
        }
    });
};
/**
 * @private
 */
ad.widget.SinaWeibo.prototype.patchData = function() {
    if (this._data) {
        if (this._data['id']) {
            this._data['id'] += '';
            if (!/^\d+$/.test(this._data['id'])) {
                var idMatch = this._data['id'].match(/\/(\d+)/);
                this._data['id'] = (idMatch && idMatch.length >= 2) ? idMatch[1] : '';
            }
        }
        this._data['account_url'] = 'http://weibo.com/' + this._data['id'];
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['is_display_icon'] = typeof this._data['is_display_icon'] === 'undefined'
            ? true
            : this._data['is_display_icon'];
        this._data['is_display_fans'] = typeof this._data['is_display_fans'] === 'undefined'
            ? true
            : this._data['is_display_fans'];
        this._data['is_display_weibo'] = typeof this._data['is_display_weibo'] === 'undefined'
            ? true
            : this._data['is_display_weibo'];
        this._data['is_display_foot'] = typeof this._data['is_display_foot'] === 'undefined'
            ? true
            : this._data['is_display_foot'];
        this._data['weibo_context_length'] = this._data['weibo_context_length']
            ? this._data['weibo_context_length']
            : 160;
        this._data['xdpath'] = this._data['xdpath']
            ? this._data['xdpath']
            : document.location.protocol + '//' + document.location.host + '/stat/xd_all.html';
    }
};

/**
 * @private
 * @param {string} str 原始日期时间字符串.
 * @return {{date:string,time:string}}
 */
ad.widget.SinaWeibo.prototype._parseStrToDate = function(str) {
    var month = {
        'Jan': '1月',
        'Feb': '2月',
        'Mar': '3月',
        'Apr': '4月',
        'May': '5月',
        'Jun': '6月',
        'Jul': '7月',
        'Aug': '8月',
        'Sep': '9月',
        'Oct': '10月',
        'Nov': '11月',
        'Dec': '12月'
    };
    var date = month[str.substr(4, 3)] + parseInt(str.substr(8, 2), 10) + '日';
    var time = str.match(/(\d+):(\d+)/);
    var obj = { 'date': date, 'time': time[0] };
    return obj;
};
/**
 * @private
 * @param {string} str 原始微博内容字符串.
 * @param {number} len 截取长度.
 * @return {string} 截取后的微博内容.
 */
ad.widget.SinaWeibo.prototype._stringLengthFormat = function(str, len) {
    var regexp = /((http|ftp|https|file):([^'"\s\u4E00-\u9FA5])+)/ig;
    var text;
    if (str.replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci').length <= (len - 1)) {
        text = str.replace(regexp, '<a class="weibo_link" target="_blank" href="$1">$1</a>');
        return text;
    }
    // var testString = str.replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci');
    var linkArr = [];
    var linkArrLen = 0;

    var i = parseInt((len - 1) / 2, 10);
    var cutString;
    while (str.substring(0, i).replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci').length <= (len - 1)) {
        cutString = str.substring(0, i);
        i = i + 1;
    }
    if (str.match(regexp) != null) {
        var result;
        var newReg = new RegExp(regexp);/*songao: the lastIndex of match is remembered in IE*/
        while ((result = newReg.exec(str)) != null) {
            var length = result[0].length;
            var start = result.index;
            var end = start + length;
            if (start >= (cutString.length - 1)) {
                break;
            }
            else if (end >= (cutString.length - 1)) {
                linkArr.unshift({ 'lastIndex' : start, 'lastlink' : result[0] });
                linkArrLen = linkArr.length;/*songao: return of unshift is not right in IE*/
            }
            else {
                linkArr[0] = {
                    'lastIndex' : start,
                    'lastlink' : result[0]
                };
            }
        }
    }
    if (linkArrLen === 1) {
        var linkLen = cutString.length - linkArr[0]['lastIndex'];
        var cutLen = linkArr[0]['lastlink'].length - linkLen;
        var cutLinkText = '';
        cutLinkText = str.substring(0, cutString.length - linkLen - cutLen - 4);
        text = cutLinkText + '... '
            + linkArr[0]['lastlink']
            + /*add a whitespace here, to avoid link ends with '...' -> */' ...';
        text = text.replace(regexp, '<a class="weibo_link" target="_blank" href="$1">$1</a>');
        return text;
    }
    else if (linkArrLen === 2) {
        var diff = linkArr[0]['lastIndex'] - linkArr[1]['lastIndex'] - linkArr[1]['lastlink'].length;
        if (diff <= linkArr[0]['lastlink'].length) {
            text = str.substring(0, linkArr[0]['lastIndex'])
                + /*add a whitespace here, to avoid link ends with '...' -> */' ...';
            text = text.replace(regexp, '<a class="weibo_link" target="_blank" href="$1">$1</a>');
            return text;
        }
        else {
            var linkLen = cutString.length - linkArr[0]['lastIndex'];
            var cutLen = linkArr[0]['lastlink'].length - linkLen;
            // var j = parseInt(linkArr[1]['lastIndex'] / 2, 10);
            var cutLinkText = '';
            cutLinkText = str.substring(0, cutString.length - linkLen - cutLen - 2);
            text = cutLinkText + '... ' + linkArr[0]['lastlink']
                + /*add a whitespace here, to avoid link ends with '...' -> */' ...';
            text = text.replace(regexp, '<a class="weibo_link" target="_blank" href="$1">$1</a>');
            return text;
        }
    }
    else {
        text = cutString.substring(0, cutString.length - 4) + '...';
        return text;
    }
};
/**
 * @private
 * @param {string} str 原始转发微博内容字符串.
 * @param {number} len 截取长度.
 * @return {string} 截取后的转发微博内容.
 */
ad.widget.SinaWeibo.prototype._stringTransmitionFormat = function(str, len) {
    str = str.replace(/>/g, '&gt;').replace(/</g, '&lt;');
    var regexp = /((http|ftp|https|file):([^'"\s\u4E00-\u9FA5])+)/ig;
    var text;
    if (str.replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci').length <= (len)) {
        return str;
    }
    // var testString = str.replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci');
    // var lastIndex = 0;
    // var lastlink = "";
    var linkArr = [];
    var linkArrLen = 0;

    var i = parseInt((len - 1) / 2, 10);
    var cutString;
    while (str.substring(0, i).replace(/[^\x00-\xff]|[@，。；：“”？【】！、]/g, 'ci').length <= (len)) {
        cutString = str.substring(0, i);
        i = i + 1;
    }
    if (str.match(regexp) != null) {
        var result;
        var newReg = new RegExp(regexp);/*songao: the lastIndex of match is remembered in IE*/
        while ((result = newReg.exec(str)) != null) {
            var length = result[0].length;
            var start = result.index;
            var end = start + length;
            if (start >= (cutString.length - 1)) {
                break;
            }
            else if (end >= (cutString.length - 1)) {
                linkArr.unshift({ 'lastIndex' : start, 'lastlink' : result[0] });
                linkArrLen = linkArr.length;/*songao: return of unshift is not right in IE*/
            }
            else {
                linkArr[0] = {
                    'lastIndex' : start,
                    'lastlink' : result[0]
                };
            }
        }
    }
    if (linkArrLen === 1) {
        var linkLen = cutString.length - linkArr[0]['lastIndex'];
        var cutLen = linkArr[0]['lastlink'].length - linkLen;
        var cutLinkText = '';
        cutLinkText = str.substring(0, cutString.length - linkLen - cutLen - 4);
        text = cutLinkText + '... ' + linkArr[0]['lastlink'];
        return text;
    }
    else if (linkArrLen === 2) {
        var diff = linkArr[0]['lastIndex'] - linkArr[1]['lastIndex'] - linkArr[1]['lastlink'].length;
        if (diff <= linkArr[0]['lastlink'].length) {
            text = str.substring(0, linkArr[0]['lastIndex']) + '...';
            return text;
        }
        else {
            var linkLen = cutString.length - linkArr[0]['lastIndex'];
            var cutLen = linkArr[0]['lastlink'].length - linkLen;
            // var j = parseInt(linkArr[1]['lastIndex'] / 2, 10);
            var cutLinkText = '';
            cutLinkText = str.substring(0, cutString.length - linkLen - cutLen - 2);
            text = cutLinkText + '... ' + linkArr[0]['lastlink'];
            return text;
        }
    }
    else {
        text = cutString.substring(0, cutString.length - 4) + '...';
        return text;
    }
};
/**
 * @private
 * @return {string} 截取后的微博内容.
 */
ad.widget.SinaWeibo.prototype._weiboContentFormat = function() {
    var text;
    if (this.weiboResult['retweeted_status']) {
        text = this._stringLengthFormat(
            this.weiboResult['text'],
            Math.round(this._data['weibo_context_length'] / 2)
        );
        text += '<br/>';
        text += this._stringLengthFormat(
            this.weiboResult['retweeted_status']['text'],
            Math.round(this._data['weibo_context_length'] / 2)
        );
    }
    else {
        text = this._stringLengthFormat(this.weiboResult['text'], this._data['weibo_context_length']);
    }
    return text;
};
/**
 * @private
 *
 */
ad.widget.SinaWeibo.prototype._weiboAddAttention = function() {
    var me = this;
    var url = this._getRemoteApiUrl('follow', { 'id': me._data['id'] });
    baidu.sio.callByServer(url, function(sResult) {
        if (sResult['error_code']) {
            alert('关注失败，原因：[' + sResult['error'] + ']');
        }
        else {
            alert('关注成功');
        }
    });
};
/**
 * @private
 *
 */
ad.widget.SinaWeibo.prototype._weiboStore = function() {
    var me = this;
    var url = this._getRemoteApiUrl('favorite', { 'id': me.weiboResult['id'] });
    baidu.sio.callByServer(url, function(sResult) {
        if (sResult['error_code']) {
            alert('收藏失败，原因：[' + sResult['error'] + ']');
        }
        else {
            alert('收藏成功');
        }
    });
};

/**
 * 登陆状态
 */
ad.widget.SinaWeibo.prototype['loginStatus'] = false;
/**
 * 微博服务队列
 */
ad.widget.SinaWeibo.prototype.waitFunList = [];
/**
 * 检查登陆状态
 * @return {boolean} 登陆状态
 */
ad.widget.SinaWeibo.prototype.checkLogin = function() {
    var me = this;
    return me['loginStatus'] === true;
};
/**
 * 登陆
 * @param {Function=} opt_callback 登陆成功后处理函数
 */
ad.widget.SinaWeibo.prototype.login = function(opt_callback) {
    var me = this;
    me['waitReady'](opt_callback, true);
    if (!me.checkLogin()) {
        var oauthLoginWindow = window.open(
            me.loginUrl,
            'oauth_login_window',
            'width=800,height=600,toolbar=no,menubar=no,status=no'
        );
        oauthLoginWindow.focus();

        if (!me.isCheckingLogin) {
            var checkLoginUrl = me._getRemoteApiUrl('loginStatus', { 'xdpath': me._data['xdpath'] });
            var loopCount = 0;
            me.isCheckingLogin = true;

            /*
            // hekai02 @ 2014-8-12
            // 考虑到用户可能未登陆就已经关闭了弹出的登陆窗口，那么不停轮询就会无谓消耗服务器资源
            // 随着轮询次数的增加，间隔时间也随之增加
            // 有这样的高斯分布的倒数 (sqrt(2*PI*9)/(7.5*exp(-(x/100-.1)^2/(2*9))))
            // 前400次轮询花费546秒，后400次轮询则要花费3987秒

            var getIntervalTime = function(x) {
                return 2000 * Math.exp(Math.pow((x / 100 - .1), 2) / 18);
            };
            var timer;
            var haveATry = function() {
                timer = ad.base.setTimeout(checkLoginStatus, getIntervalTime(++loopCount));
            };
            var checkLoginStatus = function() {
                baidu.sio.callByServer(checkLoginUrl, function(sResult) {
                    if (sResult['success'] === 1) {
                        ad.base.clearTimeout(timer);
                        me.isCheckingLogin = false;
                        me['loginStatus'] = true;
                        if (typeof opt_callback === 'function') {
                            opt_callback.call(me);
                        }
                    } else {
                        haveATry();
                    }
                });
            };
            haveATry();*/

            var timer = ad.base.setInterval(function() {
                baidu.sio.callByServer(checkLoginUrl, function(sResult) {
                    if (sResult['success'] === 1) {
                        ad.base.clearInterval(timer);
                        me.isCheckingLogin = false;
                        me['loginStatus'] = true;
                        if (typeof opt_callback === 'function') {
                            opt_callback.call(me);
                        }
                    }
                });
                if (++loopCount > 88) {
                    me.isCheckingLogin = false;
                    ad.base.clearInterval(timer);
                }
            }, 2222);
        }

        return ;
    }
};
/**
 * 登陆前后的准备工作
 * @param {Function=} opt_callback 登陆成功后处理函数
 * @param {boolean=} opt_status 添加到队列的方式
 */
ad.widget.SinaWeibo.prototype['waitReady'] = function(opt_callback, opt_status) {
    var me = this;
    if (opt_callback != null) {
        if (opt_status === true) {
            me.waitFunList.unshift(opt_callback);
        }
        else {
            me.waitFunList.push(opt_callback);
        }
    }
    if (me.checkLogin()) {
        for (var i = 0, len = me.waitFunList.length; i < len; i++) {
            me.waitFunList[i].call();
        }
        me.waitFunList = [];
    }
};

/**
 * @private
 *
 */
ad.widget.SinaWeibo.prototype.bindEvent = function() {
    var me = this;
    baidu.on(baidu.g(me.getId('name')), 'click', function() {
        me.trigger(ui.events.WEIBO_NAME);
    });
    baidu.on(baidu.g(me.getId('follow')), 'click', function(e) {
        var ev = e || window.event;
        me.sendLog('微博加关注', 'weibofollow');
        me.trigger(ui.events.WEIBO_FOLLOW);
        if (ad.env.isIpad) {
            return;
        }
        if (me.checkLogin()) {
            me._weiboAddAttention();
        }
        else {
            me.login(function() {
                // alert("登录成功");
                me._weiboAddAttention();
            });
        }
        baidu.event.stop(ev);
    });
    function getParamsOfShareWindow(width, height) {
        return [
            'toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=',
            (screen.width - width) / 2, ',top=', (screen.height - height) / 2
        ].join('');
    }
    if (me._data['is_display_foot']) {
        baidu.on(baidu.g(me.getId('transformation')), 'click', function(e) {
            var ev = e || window.event;
            me.sendLog('微博转发', 'transformation');
            me.trigger(ui.events.WEIBO_TRANSFORMATION);
            if (ad.env.isIpad) {
                return;
            }
            var context = '//@' + me.weiboResult['user']['name'] + ':'
                + (me._data['context'] ? me._data['context'] : me.weiboResult['text'])
                + (me.weiboResult['retweeted_status']
                    ? ('&' + me.weiboResult['retweeted_status']['text'])
                    : ''
                );
            var pic = '';
            if (me.weiboResult['original_pic']) {
                pic = me.weiboResult['original_pic'];
            }
            context = me._stringTransmitionFormat(context, 278);
            var title = encodeURIComponent(context);
            var url = 'http://v.t.sina.com.cn/share/share.php?url=&title=' + title + '&pic=' + pic;
            var params = getParamsOfShareWindow(607, 523);
            baidu.event.stop(ev);
            window.open(url, 'share', params);
        });
        baidu.on(baidu.g(me.getId('store')), 'click', function(e) {
            var ev = e || window.event;
            me.sendLog('微博收藏', 'store');
            me.trigger(ui.events.WEIBO_STORE);
            if (ad.env.isIpad) {
                return;
            }
            if (me.checkLogin()) {
                me._weiboStore();
            }
            else {
                me.login(function() {
                    // alert("登录成功");
                    me._weiboStore();
                });
            }
            baidu.event.stop(ev);
        });
        baidu.on(baidu.g(me.getId('crit')), 'click', function() {
            me.trigger(ui.events.WEIBO_CRIT);
        });
    }
};

/**
 * @override
 */
ad.widget.SinaWeibo.prototype.dispose = function() {
    window['sinaWB'] = null;
    ad.widget.SinaWeibo.superClass.dispose.call(this);
};













/* vim: set ts=4 sw=4 sts=4 tw=100: */

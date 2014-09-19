/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qq_weibo.js 9823 2012-06-19 02:51:16Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/qq_weibo.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9823 $
 * @description
 * 头部小微博效果
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/qq_weibo.html');
goog.include('ad/widget/qq_weibo.less');

goog.provide('ad.widget.QQWeibo');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.QQWeibo = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_qq_weibo';
    this._serverUrl = RT_CONFIG.HOST('wbapi.baidu.com') + '/service/oauth/proxy?';
    this._serverLoginUrl = RT_CONFIG.HOST('wbapi.baidu.com') + '/service/oauth/query?';
    this.loginUrl = '';
    this.userTimeline = '/statuses/user_timeline.json';
    this.friendshipsCreate = '/qqweibo/friends/add';
    this.favoritesCreate = '/qqweibo/fav/addt';
    window['qqwbWB'] = this;
    /**
     * @type {Object}
     */
    this.weiboResult;

    /**
     * 自定义微博内容title2前缀
     * @type {string}
     */
    this.customContextTitle2Prx = 'qq-weibo-link';
};
baidu.inherits(ad.widget.QQWeibo, ad.widget.Widget);


/**
 * @override
 */
ad.widget.QQWeibo.prototype.enterDocument = function() {
    ad.widget.QQWeibo.superClass.enterDocument.call(this);
    var me = this;
    var url = me._serverUrl + 'source=qqwb&id=' + me._data['id'] + '&_uri=' + me.userTimeline;
    baidu.sio.callByServer(url, function(sResult, bStatus) {
        if (sResult['ret'] === 0 && sResult['errcode'] === 0) {
            me.weiboResult = sResult['data'];
            if (me._data['is_display_fans']) {
                baidu.g(me.getId('fans')).innerHTML = me.weiboResult['fansnum'];
            }
            if (me._data['is_display_weibo']) {
                baidu.g(me.getId('weibo')).innerHTML = me.weiboResult['tweetnum'];
            }
            baidu.g(me.getId('name')).innerHTML = me._data['name'] || me.weiboResult['nick'];
            baidu.g(me.getId('context')).innerHTML = me._data['context']
                ? me._data['context']
                : me._weiboContentFormat();
            var weiboCreateTime = me._parseStrToDate(1000 * me.weiboResult['tweetinfo'][0]['timestamp']);
            if (me._data['is_display_foot']) {
                baidu.g(me.getId('datetime')).innerHTML = weiboCreateTime.date
                    + '&nbsp;' + weiboCreateTime.time;
            }
            if (me.weiboResult['tweetinfo']
                && me.weiboResult['tweetinfo'][0] && me.weiboResult['tweetinfo'][0]['id']
            ) {
                baidu.dom.setAttr(
                    baidu.g(me.getId('crit')),
                    'href',
                    'http://t.qq.com/p/t/' + me.weiboResult['tweetinfo'][0]['id']
                );
            }
            me.trigger(ui.events.TIME_LINE_LOADED, sResult['data']);
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
    var loginServerUrl = me._serverLoginUrl + 'source=qqwb&version=simple&xd=' + me._data['xdpath'];
    baidu.sio.callByServer(loginServerUrl, function(sResult) {
        if (sResult['success'] === '1') {
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
ad.widget.QQWeibo.prototype.patchData = function() {
    if (this._data) {
        if (this._data['id']) {
            if (/(qq\.com)\//g.test(this._data['id'])) {
                var idMatch = this._data['id'].match(/qq\.com\/([^/?#]+)/);
                this._data['id'] = (idMatch && idMatch.length >= 2) ? idMatch[1] : this._data['id'];
            }
        }
        this._data['account_url'] = 'http://t.qq.com/' + this._data['id'];
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['is_display_icon'] = false;
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
            : document.location.protocol + document.location.host + '/stat/xd_all.html';
        this._data['follow_imgsrc'] = this._data['follow_imgsrc'] || RT_CONFIG.HOST('eiv.baidu.com')
            + '/mapm2/img/qq_follow.png';
        this._data['verify_img'] = this._data['verify_img'] || RT_CONFIG.HOST('ecma.bdimg.com')
            + '/adtest/qq_verify-ccf9065b.png';
    }
};

/**
 * @private
 * @param {string|number} str 原始日期时间字符串.
 * @return {{date:string,time:string}}
 */
ad.widget.QQWeibo.prototype._parseStrToDate = function(str) {
    var month = [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ];
    var fullDate = new Date(str);
    var date = month[fullDate.getMonth()] + fullDate.getDate() + '日';
    var time = fullDate.getHours() + ':' + fullDate.getMinutes();
    var obj = { 'date': date, 'time': time };
    return obj;
};
/**
 * @private
 * @param {string} str 原始微博内容字符串.
 * @param {number} len 截取长度.
 * @return {string} 截取后的微博内容.
 */
ad.widget.QQWeibo.prototype._stringLengthFormat = function(str, len) {
    str = str.replace(/>/g, '&gt;').replace(/</g, '&lt;');
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
        text = cutLinkText + '... ' + linkArr[0]['lastlink']
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
ad.widget.QQWeibo.prototype._stringTransmitionFormat = function(str, len) {
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
ad.widget.QQWeibo.prototype._weiboContentFormat = function() {
    var text = '';
    if (this.weiboResult['tweetinfo'][0] && this.weiboResult['tweetinfo'][0]['text']) {
        text = this._stringLengthFormat(
            this.weiboResult['tweetinfo'][0]['origtext'],
            this._data['weibo_context_length']
        );
    }
    return text;
};
/**
 * @private
 *
 */
ad.widget.QQWeibo.prototype._weiboAddAttention = function() {
    var me = this;
    var url = me._serverUrl + 'user_id=' + me._data['id']
        + '&version=simple&source=qqwb' + '&_uri=' + me.friendshipsCreate;
    baidu.sio.callByServer(url, function(sResult) {
        if (sResult['ret'] === 0) {
            alert('关注成功');
        }
        else {
            alert('关注失败，原因：[' + sResult['msg'] + ']');
        }
    });
};
/**
 * @private
 *
 */
ad.widget.QQWeibo.prototype._weiboStore = function() {
    var me = this;
    var url = me._serverUrl + 'id=' + me.weiboResult['tweetinfo'][0]['id']
        + '&version=simple&source=qqwb' + '&_uri=' + me.favoritesCreate;
    baidu.sio.callByServer(url, function(sResult) {
        if (sResult['ret'] === 0) {
            alert('收藏成功');
        }
        else {
            alert('收藏失败，原因：[' + sResult['msg'] + ']');
        }
    });
};

/**
 * 登陆状态
 */
ad.widget.QQWeibo.prototype['loginStatus'] = false;
/**
 * 微博服务队列
 */
ad.widget.QQWeibo.prototype.waitFunList = [];
/**
 * 检查登陆状态
 * @return {boolean} 登陆状态
 */
ad.widget.QQWeibo.prototype.checkLogin = function() {
    var me = this;
    return me['loginStatus'] === true;
};
/**
 * 登陆
 * @param {Function=} opt_callback 登陆成功后处理函数
 */
ad.widget.QQWeibo.prototype.login = function(opt_callback) {
    var me = this;
    me['waitReady'](opt_callback, true);
    if (!me.checkLogin()) {
        var url = me.loginUrl + '&callback=' + me._data['xdpath'] + '&source=sina';
        var oauthLoginWindow = window.open(
            url,
            'oauth_login_window',
            'width=800,height=600,toolbar=no,menubar=no,status=no'
        );
        oauthLoginWindow.focus();
        return;
    }
};
/**
 * 登陆前后的准备工作
 * @param {Function=} opt_callback 登陆成功后处理函数
 * @param {boolean=} opt_status 添加到队列的方式
 */
ad.widget.QQWeibo.prototype['waitReady'] = function(opt_callback, opt_status) {
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
ad.widget.QQWeibo.prototype.bindEvent = function() {
    var me = this;
    baidu.on(baidu.g(me.getId('follow')), 'click', function(e) {
        var ev = e || window.event;
        me.sendLog('qq微博收听', 'weibofollow');
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
            me.sendLog('qq微博转播', 'transformation');
            me.trigger(ui.events.WEIBO_TRANSFORMATION);
            if (ad.env.isIpad) {
                return;
            }
            var context = '//@' + me.weiboResult['name'] + ':'
                + (me._data['context'] ? me._data['context'] : me.weiboResult['tweetinfo'][0]['text']);
            var pic = '';
            if (me.weiboResult['tweetinfo'][0]['image'] && me.weiboResult['tweetinfo'][0]['image'][0]) {
                pic = encodeURIComponent(me.weiboResult['tweetinfo'][0]['image'][0]);
            }
            context = me._stringTransmitionFormat(context, 260);
            var title = encodeURIComponent(context);
            var url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' +
                encodeURIComponent(document.location.href) + '&title=' + title + '&pic=' + pic;
            var params = getParamsOfShareWindow(607, 523);
            baidu.event.stop(ev);
            window.open(url, 'share', params);
        });
        baidu.on(baidu.g(me.getId('store')), 'click', function(e) {
            var ev = e || window.event;
            me.sendLog('qq微博收藏', 'store');
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
        baidu.on(baidu.g(me.getId('name')), 'click', function() {
            me.trigger(ui.events.WEIBO_NAME);
        });
    }
};

/**
 * @override
 */
ad.widget.QQWeibo.prototype.dispose = function() {
    window['qqwbWB'] = null;
    ad.widget.QQWeibo.superClass.dispose.call(this);
};












/* vim: set ts=4 sw=4 sts=4 tw=100: */

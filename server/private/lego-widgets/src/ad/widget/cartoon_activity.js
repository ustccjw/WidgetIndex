/**
 * src/ad/widget/cartoon_activity.js ~ 2013-08-20 16:44:48
 * @author xiongjie
 * @description
 * 继承自image_cartoon组件，点击图片进入活动
 **/
goog.require('ad.widget.ImageCartoon');
goog.require('ui.events');

goog.include('ad/widget/cartoon_activity.html');
goog.include('ad/widget/cartoon_activity.less');


goog.provide('ad.widget.CartoonActivity');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.ImageCartoon}
 */
ad.widget.CartoonActivity = function(data) {
    ad.widget.ImageCartoon.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = "AD_ad_widget_cartoon_activity";
};
baidu.inherits(ad.widget.CartoonActivity, ad.widget.ImageCartoon);

/**
 * @override
 */
ad.widget.CartoonActivity.prototype.bindEvent = function() {
    ad.widget.CartoonActivity.superClass.bindEvent.call(this);
    var me = this;
    this.addListener(ui.events.CLICK, function(idx) {
        me._showActivity(idx);
        me.sendLog('点击胶带图' + idx);
        return false;
    });
};

/**
 * @param {number} idx 索引值
 */
ad.widget.CartoonActivity.prototype._showActivity = function (idx) {
    var me = this;
    var actCtnId = this.getId('activity-info');
    var actCtn = baidu.g(actCtnId);
    var rcvLinks = actCtn.getElementsByTagName('A');
    var linkElm;
    for (var i = 0, len = rcvLinks.length;i < len;i++) {
        linkElm = rcvLinks[i];
        if (linkElm.getAttribute('t2base')) {
            linkElm.setAttribute('title2', linkElm.getAttribute('t2base') + idx);
        }
    }
    var activityData = me._data["options"][idx];
    var imgLinkElm = baidu.g(me.getId('share-pic'));
    imgLinkElm.setAttribute('href', activityData["shareimg_rcv_url"]);
    imgLinkElm.innerHTML = '<img src="' + activityData['shareimgsrc'] + '" alt = "活动宣传图" />';
    var descLinkElm = baidu.g(me.getId('share-desc'));
    descLinkElm.setAttribute('href', activityData["sharedesc_rcv_url"]);
    descLinkElm.innerHTML = activityData["sharedesc"] || '';
    baidu.dom.setStyle(this.getId('images'), 'visibility', "hidden");
    baidu.show(actCtnId);

    actCtn.onclick = function (evt) {
        evt = evt || window.event;
        var targetLink = evt.target || evt.srcElement;
        if (targetLink.id == me.getId('share-back')) {
            me._hideActivity();
        }
        else if (targetLink.getAttribute('stype')) {
            me._shareActivity(targetLink.getAttribute('stype'), activityData);
        }
    };
};

/**
 * @param {string} stype 分享对象
 * @param {Object} data  分享数据
 * 分享到指定sns
 */
ad.widget.CartoonActivity.prototype._shareActivity = function (stype, data) {
    var url = "";
    if (stype == "sina") {
        url = 'http://service.weibo.com/share/share.php?url=' +
            encodeURIComponent(data['share_link']) +
            '&title=' + encodeURIComponent(data['share_text']) +
            '&pic=' + encodeURIComponent(data['share_pic']);
    }
    else if (stype == "tencent") {
        url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' +
            encodeURIComponent(data['share_link']) +
            '&title=' + encodeURIComponent(data['share_text']) +
            '&pic=' + encodeURIComponent(data['share_pic']);
    }
    else if (stype == "renren") {
        url = 'http://widget.renren.com/dialog/share?resourceUrl=' +
            encodeURIComponent(data['share_link']) +
            '&title=' + encodeURIComponent(data['share_text']) +
            '&pic=' + encodeURIComponent(data['share_pic']);
    }
    if (url) {
        var wndWidth = 624;
        var wndHeight = 530;
        var windowParam = 'toolbar=0,status=0,resizable=1,width=' + wndWidth + ',height=' + wndHeight;
        window.open(url, 'share', windowParam);
    }
}

/**
 * 隐藏活动页
 */
ad.widget.CartoonActivity.prototype._hideActivity = function () {
    var actCtnId = this.getId('activity-info');
    baidu.g(actCtnId).onclick = null;
    baidu.hide(actCtnId);
    baidu.dom.setStyle(this.getId('images'), 'visibility', "visible");
};







/* vim: set ts=4 sw=4 sts=4 tw=100: */


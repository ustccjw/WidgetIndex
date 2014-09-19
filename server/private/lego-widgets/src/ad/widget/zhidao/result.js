/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/result.js ~ 2013/01/23 18:38:28
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * result相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/result.less');
goog.include('ad/widget/zhidao/result.html');

goog.provide('ad.widget.zhidao.Result');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.Result = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_result';
};
baidu.inherits(ad.widget.zhidao.Result, ad.widget.Widget);

/** @override */
ad.widget.zhidao.Result.prototype.bindEvent = function() {
    ad.widget.zhidao.Result.superClass.bindEvent.call(this);

    baidu.on(this.getRoot(),'click',function(e){
        var srcElement = baidu.event.getTarget(e || window.event);
        if (srcElement.nodeType == 1 &&
            srcElement.nodeName == 'A') {
            var turl = baidu.getAttr(srcElement,'turl');
            if (turl) {
                baidu.sio.log(turl);
            }
        }
    });
};

/** @override */
ad.widget.zhidao.Result.prototype.patchData = function() {
    if (this._data) {
        //根据广告数目修订_data
        var count = parseInt(this._data['ad_num']);
        this._data['ads'].splice(count,this._data['ads'].length-count);
        if(this._data['ads'] && this._data['ads'].length){
            for(var i = 0; i < this._data['ads'].length; i ++){
                this._data['ads'][i]['turl_1'] = this._getUrl(this._data['ads'][i]['encode_url'],1);
                this._data['ads'][i]['turl_2'] = this._getUrl(this._data['ads'][i]['encode_url'],2);
                this._data['ads'][i]['turl_3'] = this._getUrl(this._data['ads'][i]['encode_url'],3);
                this._data['ads'][i]['turl_4'] = this._getUrl(this._data['ads'][i]['encode_url'],4);
                this._data['ads'][i]['url'] = 'http://eiv.baidu.com/mapm2/wdw/zhidao/intermediate.html' + '?url=' + this._data['ads'][i]['encode_url'] + '&idea_id=' + this._data['ads'][i]['idea_id'];
                //截断回答
                this._data['ads'][i]['title'] = this._cutStr(this._data['ads'][i]['title'], 40);
                //this._data['ads'][i]['desc'] = this._cutStr(this._data['ads'][i]['desc'], 150);
            }
        }

        var isbackend = this._data['ads'][0]['if_backend'];
        if (isbackend) {
            this._data['_background_color'] = '#f5f5f5';
        }
    }
}

/**
 * 拼接加密url
 */
ad.widget.zhidao.Result.prototype._getUrl = function(url,actionid) {
    return url + '&actionid=' + actionid + '&isredirect=0';
};

/**
 * 截断字符串
 */
ad.widget.zhidao.Result.prototype._cutStr = function(str, maxLength) {
    var htmlLength = baidu.string.getByteLength(baidu.string.stripTags(str));
    var maxLength_true = maxLength + baidu.string.getByteLength(str) - htmlLength;

    if(baidu.string.getByteLength(str) > maxLength_true){
        return baidu.string.subByte(str, maxLength_true, '...');
    }
    else {
        return baidu.string.subByte(str, maxLength_true);
    }
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

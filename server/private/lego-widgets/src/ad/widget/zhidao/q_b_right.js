/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/q_b_right.js ~ 2013/10/18 12:40:37
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * q_b_right相关的实现逻辑
 **/

goog.require('ad.widget.zhidao.FAQ');

goog.provide('ad.widget.zhidao.QBRight');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.QBRight = function(data) {
    ad.widget.zhidao.FAQ.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_faq';
};
baidu.inherits(ad.widget.zhidao.QBRight, ad.widget.zhidao.FAQ);

/** @override */
ad.widget.zhidao.QBRight.prototype.patchData = function() {
    //数据适配
    this._data['title'] = '推广链接';
    var ads = this.getData('ads');
    if(ads && ads.length){
        this._data['options'] = [];
        for(var i = 0; i < ads.length; i ++){
            var item = {};
            item['question'] = ads[i]['title'];
            item['question_rcv_url'] = this._getUrl(ads[i]['encode_url'], 1);
            item['answer'] = ads[i]['desc'];
            item['answer_rcv_url'] = this._getUrl(ads[i]['encode_url'], 3);
            item['reason'] = '- ' + ads[i]['recommend_reason'];
            item['source'] = ads[i]['answer'];
            this._data['options'].push(item);
        }
    }
}

/**
 * 拼接rcv
 * @param {string} url 检索端返回的原始rcv
 * @param {number} actionid 交互行为标记 1：点击标题 3：点击回答
 * @return {string} 最终的rcv
 */
ad.widget.zhidao.QBRight.prototype._getUrl = function(url,actionid) {
    return url + '&actionid=' + actionid + '&isredirect=1';
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

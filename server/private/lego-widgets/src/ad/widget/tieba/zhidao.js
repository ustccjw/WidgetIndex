/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/zhidao.js ~ 2013/04/01 12:25:35
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 10927 $
 * @description
 * zhidao相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/zhidao.less');
goog.include('ad/widget/tieba/zhidao.html');

goog.provide('ad.widget.tieba.Zhidao');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Zhidao = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_zhidao';
};
baidu.inherits(ad.widget.tieba.Zhidao, ad.widget.Widget);

/** @override */
ad.widget.tieba.Zhidao.prototype.getMainHtml = function() {
    var questions = this._data['questions'];

    //如果questions不为空才进行渲染
    if (this._isPreRender || questions && questions.length) {
        return ad.widget.tieba.Zhidao.superClass.getMainHtml.call(this);
    }
    return '';
};

/** @override */
ad.widget.tieba.Zhidao.prototype.patchData = function() {

    function isPlaceholder(value) {
        return typeof value === 'string' && value.match(/^%%[\w\d_]+%%$/);
    }

    this._isPreRender = false;

    if (this._data) {
        var questionsJson = this._data['questions_json_mockup'];

        //有mockup则为预览物料，否则可能是预渲染物料或线上物料
        if (!questionsJson) {
            questionsJson = this._data['questions_json'];
            if (isPlaceholder(questionsJson)) {
                //如果没有mockup且内容是占位符（即预渲染最终上线HTML代码时）
                this._isPreRender = true;
                questionsJson = '[]';
            }
        }

        var questions = baidu.json.parse(questionsJson);

        for (var i = 0, j = questions.length; i < j; i++) {
            questions[i]['index'] = i + 1;
        }

        this._data['questions'] = questions;
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

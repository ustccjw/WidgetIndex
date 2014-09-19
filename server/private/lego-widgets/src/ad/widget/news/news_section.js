/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: news_section.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/news/news_section.js ~ 2012/06/07 22:07:55
 * @author fanxueliang
 * @version $Revision: $
 * @description
 * 栏目模块
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/news/news_section.html');
goog.include('ad/widget/news/news_section.less');

goog.provide('ad.widget.news.Section');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.news.Section = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_news_section';
};
baidu.inherits(ad.widget.news.Section, ad.widget.Widget);

/**
 * 给数据源中的数据添加"_index"属性.
 * @override
 */
ad.widget.news.Section.prototype.patchData = function() {
    if(this._data) {
        if(this._data['title']) {
            if(this._data['title']['sub_title'] == "") {
                delete this._data['title']['sub_title'];
            }
            if(this._data['title']['main_title'] == "") {
                delete this._data['title']['main_title'];
            }
            if(typeof this._data['title']['main_title'] == "undefined"
                && typeof this._data['title']['sub_title'] == "undefined" ) {
                delete this._data['title'];
            }
        }else {
            if(typeof this._data['title'] != "undefined") {
                delete this._data['title'];
            }
        }
    }
    if(this._data && this._data['options'] && this._data['options'].length) {
        for(var i = 0, options = this._data['options']; i < options.length; i++) {
            var alter = options[i]['alternative_desc'];
            if(alter) {
                delete options[i]['alternative_desc'];
                if(alter['iframe']) {
                    options[i]['iframe'] = alter['iframe'];
                }
                else if(alter['link']) {
                    options[i]['detail'] = alter['link']['detail'];
                }
            }
            var detail = options[i]['detail'];
            if(detail && detail.length) {
                for(var j = 0; j < detail.length; j++) {
                    if(detail[j]) {
                        detail[j]['_index2'] = j + 1;
                    }
                }
            }
        }
    }
};
/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: Section.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/Section.js ~ 2012/06/07 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 栏目模块
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/section.html');
goog.include('ad/widget/section.less');

goog.provide('ad.widget.Section');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Section = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_section';
};
baidu.inherits(ad.widget.Section, ad.widget.Widget);

/**
 * 给数据源中的数据添加"_index"属性.
 * @override
 */
ad.widget.Section.prototype.patchData = function() {
    if(this._data && this._data['options'] && this._data['options'].length){
        for (var i = 0, options = this._data['options']; i < options.length; i++) {
            options[i]['_index1'] = i + 1;

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
            if(detail && detail.length){
                for(var j = 0; j < detail.length; j++){
                    if(detail[j]){
                        detail[j]['_index2'] = j + 1;
                    }
                }
            }
        }
    }
};

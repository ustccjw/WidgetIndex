/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/map.js ~ 2012/09/14 15:19:20
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * map相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/map.less');
goog.include('ad/widget/map.html');

goog.provide('ad.widget.Map');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Map = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_map';
};
baidu.inherits(ad.widget.Map, ad.widget.Widget);

/** @override */
ad.widget.Map.prototype.patchData = function() {
    if(this._data['options'] && this._data['options'].length) {
        var options = this._data['options'];
        for(var i = 0; i < options.length; i++) {
            if (options[i]['coords']) {
                continue;
            }

            var area = [];
            area.push(options[i]['left']);
            area.push(options[i]['top']);
            area.push(options[i]['left'] + options[i]['width']);
            area.push(options[i]['top'] + options[i]['height']);
            options[i]['coords'] = area.join(',');
        }
    }
};

/** @override */
ad.widget.Map.prototype.bindEvent = function() {
    ad.widget.Map.superClass.bindEvent.call(this);

    var me = this, 
        map = baidu.g(me.getId('map')), 
        area_all_id = me.getId('all'),
        areas = map.getElementsByTagName('area');
    if(areas && areas.length){
        baidu.array.each(areas, function(item, i){
            baidu.on(item,'click',function(e){
                if(area_all_id != baidu.getAttr(item,'id')){
                    if(me.trigger(ui.events.MAP_CLICK,i) !== false){
                        me.sendLog('btn' + (i + 1), 'btn' + (i + 1));
                    }
                }
                else{
                    if(me.trigger(ui.events.MAP_ALL_CLICK,i) !== false){
                        me.sendLog('float1jump', 'float1jump');
                    }
                }
            });
            //fix 点击map里的area会出现边框的问题
            baidu.on(item, 'focus', function(){
                item.blur();
            });
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

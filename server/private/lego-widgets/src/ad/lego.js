/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/lego.js ~ 2013/07/03 14:56:49
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.base');

goog.provide('ad.lego');

/**
 * Get material context
 * @deprecated
 * @param {string} canvasId container element
 * @return {?Object}
 */
ad.lego.getContext = function(canvasId) {
    return /** @type {?Object} */(ad.base.getObjectByName('ECOM_MA_LEGO.materials.' + canvasId));
}

/**
 * Get material instance
 * @deprecated
 * @param {string=} opt_canvasId container element
 * @return {ad.material.AbstractStyleMaterial}
 */
ad.lego.getMaterial = function(opt_canvasId) {
    var canvasId = opt_canvasId || ad.lego.getId();
    var context = ad.lego.getContext(canvasId);
    if (context) {
        return context['material'] || null;
    }
    return null;
}

/**
 * 获取物料的Id.
 * @return {string}
 */
ad.lego.getId = function() {
    var id = 'canvas';
    if (typeof RT_CONFIG != 'undefined' && RT_CONFIG['id']) {
        id = RT_CONFIG['id'];
    }
    else if (typeof AD_CONFIG != 'undefined' && AD_CONFIG['id']) { // 兼容通过AD_CONFIG配置的情况
        id = AD_CONFIG['id'];
    }
    return id;
}

/**
 * @deprecated
 * @param {Object} context 要放入ECOM_MA_LEGO.materials.${material_id}里的信息
 */
ad.lego.exportContext = function(context) {
    var material = context['material'];
    ad.base.exportPath('ECOM_MA_LEGO.materials.' + material.getId(), context);
}

/**
 * @deprecated
 * @param {ad.widget.Widget} widget 开始遍历的widget
 * @return {?string}
 */
ad.lego.getMaterialIdByWidget = function(widget) {
    var root = widget.getRoot();

    // get material id
    var d = document, element = root;
    while(element && element != d){
        if(baidu.dom.hasAttr(element, 'data-rendered')){
            return element.id;
        }
        element = element.parentNode;
    }

    return null;
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

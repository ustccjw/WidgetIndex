/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/wen_yi_sheng_right_b.js ~ 2014/01/17 12:23:17
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * wen_yi_sheng_right_b相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Wenda');

goog.include('ad/impl/zhidao/wen_yi_sheng_right_b.less');
goog.include('ad/impl/zhidao/wen_yi_sheng_icon.less');

goog.provide('ad.impl.zhidao.WenYiShengRightB');

ad.Debug(function(async) {
    AD_CONFIG['wenda']['title'] = '问答推广';
    AD_CONFIG['wenda']['show_colon'] = false;
    AD_CONFIG['wenda']['title_length'] = 28;
    AD_CONFIG['wenda']['ans_length'] = 66;
    var items = AD_CONFIG['wenda']['items'];
    for (var i = 0; i < items.length; i++) {
        items[i]['show_url'] = ad.base.subByte(items[i]['show_url'], 22, '..');
        items[i]['replier'] = ad.base.subByte(items[i]['replier'], 10, '..');
    }

    var wenda = new ad.widget.Wenda(AD_CONFIG['wenda']);
    var material = new ad.material.BaseMaterial();
    material.setWidgets(wenda);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

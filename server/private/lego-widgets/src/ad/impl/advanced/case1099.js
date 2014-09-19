/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1099.js ~ 2013/11/09 18:49:38
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1092相关的实现逻辑
 * 品牌专区-左侧视频样式（浮层图片）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageShowHorizontal');

goog.include('ad/impl/advanced/case1099.less');

goog.provide('ad.impl.advanced.Case1099');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var imgs = AD_CONFIG['imgs']['options'];
    if(imgs && imgs.length && imgs.length > 1) {
        for(var i = 0; i < imgs.length; i++) {
            imgs[i]['title'] = i + 1;
        }
    }
    var section = AD_CONFIG['section']['options'];
    if(section && section.length) {
        for(i = 0; i < section.length; i++) {
            section[i]['icon_url'] = RT_CONFIG.HOST("bs.baidu.com") + "/adtest/771feaac8215e1a012af0cc879a337f3.png";
        }
    }
    material.setWidgets(
        [
            new ad.widget.ImageShowHorizontal(AD_CONFIG['imgs']),
            new ad.widget.SmallHead(AD_CONFIG['small_head'])
        ],
        new ad.widget.Section(AD_CONFIG['section']),
        new ad.widget.ButtonGroup(AD_CONFIG['button_group'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

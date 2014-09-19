/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1046.js ~ 2013/12/02 15:08:56
 * @author chenli11@baidu.com (chenli11)
 * @version $Revision: 11222 $
 * @description
 * case1046相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1046.less');

goog.provide('ad.impl.advanced.Case1046');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var section2 = new ad.widget.Section(AD_CONFIG['section2']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Section(AD_CONFIG['section1'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['img_card'])],
        [section2],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }
    material.show();

    baidu.each( section2.getRoot().getElementsByTagName('li'), function (item, index) {
        section2.rewriteTitle2(item, '栏目' + (index + 2), true);
        var p = item.getElementsByTagName('p');
        if (p.length > 0) {
            section2.rewriteTitle2(p[0], '栏目' + (index + 2) + '描述1', true);
        }
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

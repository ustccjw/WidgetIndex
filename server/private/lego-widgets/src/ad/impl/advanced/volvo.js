/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/volvo.js ~ 2013/12/02 15:08:56
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * volvo相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/advanced/volvo.less');

goog.provide('ad.impl.advanced.Volvo');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var section2 = new ad.widget.Section(AD_CONFIG['section2']);
    var cartoon = new ad.widget.ImageCartoon(AD_CONFIG['img_card']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Section(AD_CONFIG['section1'])],
        [cartoon],
        [section2],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    var adCartoon = baidu.q('ad-widget-image-cartoon', cartoon.getRoot())[0];
    baidu.addClass(adCartoon, 'ec-hide');
    ad.dom.hover(adCartoon, function() {
        baidu.removeClass(adCartoon, 'ec-hide');
    }, function() {
        baidu.addClass(adCartoon, 'ec-hide');
    });
    baidu.each( section2.getRoot().getElementsByTagName('li'), function (item, index) {
        section2.rewriteTitle2(item, '栏目' + (index + 2), true);
        var p = item.getElementsByTagName('p');
        if (p.length > 0) {
            section2.rewriteTitle2(p[0], '栏目' + (index + 2) + '描述1', true);
        }
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

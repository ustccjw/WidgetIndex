/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: duomeizi.js  2012-08-02 10:25:19Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/duomeizi.js ~ 2012/08/02 11:47:13
 * @author fanxueliang
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Header');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.include('ad/impl/duomeizi.less');

goog.provide('ad.impl.Duomeizi');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    AD_CONFIG['tab']['width'] = 504;
    AD_CONFIG['tab']['li_margin'] = 10;

    var items = AD_CONFIG['tab_con']['items'];
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    for (var i = 0; i < items.length; i++) {
        arrTabCont.push(new ad.widget.ImageNormal(items[i]));
    }
    tabContainer.setWidgets(arrTabCont);
    material.setWidgets(
        [new ad.widget.Header(AD_CONFIG['head'])],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [tabContainer],
        [new ad.widget.Iframe(AD_CONFIG['iframe'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
});

/* vim: set ts=4 sw=4 sts=4 tw=100 */

/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/ncl.js ~ 2013/01/17 13:02:17
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * ncl相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Slider');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.NormalContainer');

goog.include('ad/impl/ncl.less');

goog.provide('ad.impl.Ncl');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var sections = ad.base.getObjectByName('section.options', AD_CONFIG);
    var section_icons = [
        RT_CONFIG.HOST('ecmc.bdimg.com') + '/adtest/18e30a392163d408df628a9b0401a930.jpg',
        RT_CONFIG.HOST('ecmc.bdimg.com') + '/adtest/0d59d299fc8320fecbb83d274dd352e2.jpg',
        RT_CONFIG.HOST('ecmc.bdimg.com') + '/adtest/085ce314f62147396d11bf5ddc9439c5.jpg'
    ];
    for(var i = 0, len = sections.length; i < len; i++){
        sections[i]['icon_url'] = section_icons[i % 3];
    }

    var arrTabWidgets = [];
    var normalContainer;
    if (AD_CONFIG['tab0']) {
        AD_CONFIG['tab0']['section']['options'] = AD_CONFIG['tab0']['section']['options'].concat(AD_CONFIG['tab0']['kws']['options']);
        delete AD_CONFIG['tab0']['kws'];
        AD_CONFIG['tabs'].unshift(AD_CONFIG['tab0']);
        delete AD_CONFIG['tab0'];
    }
    var tabs = AD_CONFIG['tabs'];
    for(i = 0, len = tabs.length; i < len; i++){
        normalContainer = new ad.widget.NormalContainer({});
        normalContainer.setWidgets(
            new ad.widget.ImageLink(tabs[i]['img']),
            new ad.widget.Section(tabs[i]['section'])
        );
        arrTabWidgets.push(normalContainer);
    }

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_head']);
    tabContainer.setWidgets(arrTabWidgets);

    material.setWidgets(
        [
            new ad.widget.Slider(AD_CONFIG['slider']),
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                new ad.widget.Section(AD_CONFIG['section'])
            ]
        ],
        tabContainer,
        new ad.widget.ButtonList(AD_CONFIG['buttons'])
    );
    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle2.js ~ 2014/04/21 18:04:51
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * nestle2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.TabContainer');

goog.include('ad/impl/nestle2.less');

goog.provide('ad.impl.Nestle2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var headConf = AD_CONFIG['head'];
    if(!headConf['logoimg']['logoimg'] || !headConf['logoimg']['logourl_rcv_url']) {
        headConf['logoimg'] = null;
    }

    var head = new ad.widget.SmallHead(headConf);

    var arrTabWidget = [];
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    for(var i = 0; i < options.length; i++){
        arrTabWidget.push(
            new ad.widget.ImageCartoon(options[i]['tab_con'])
        );
    }

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabWidget);

    material.setWidgets(
        [
            new ad.widget.ImageLink(AD_CONFIG['image']),
            head
        ],
        tabContainer
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

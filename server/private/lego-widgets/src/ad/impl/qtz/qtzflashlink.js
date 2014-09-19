/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzflashlink.js 11222 2012-08-20 02:53:59Z DestinyXie $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzflashlink.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (DestinyXie)
 * @version $Revision: 11222 $
 * @description
 * qtzflashlink相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Share');

goog.include('ad/impl/qtz/qtzflashlink.less');

goog.provide('ad.impl.qtz.Qtzflashlink');

ad.Debug(function(){
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var link = new ad.widget.LinkList(AD_CONFIG['link_list']);
    var share = AD_CONFIG['share'] ? new ad.widget.Share(AD_CONFIG['share']) : false;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    if(share) {
        material.setWidgets(
            [flash],
            [link],
            [share]
        );
    }
    else {
        material.setWidgets(
            [flash],
            [link]
        );
    }
    
    material.show();
    material.getCMS().init(material.getId());
    
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

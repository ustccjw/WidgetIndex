/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: award_content.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/award_content.js ~ 2013/08/29 11:17:05
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * award_content 相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.AwardContent');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/award_content.less');

goog.provide('ad.impl.tieba.AwardContent');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var awardContent = new ad.widget.tieba.AwardContent(AD_CONFIG['data']);
    material.setWidgets(
        [awardContent]
    );
    if (async === true) {
        return material;
    }
    material.show();
    new ad.service.RCV2Service(AD_CONFIG['id']);
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */

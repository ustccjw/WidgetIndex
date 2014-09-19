/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: plusbox.js 12397 2012-09-28 02:48:02Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/plusbox/plusbox.js ~ 2012/09/27 19:58:52
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 12397 $
 * @description
 * plusbox相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.plusbox.Plusbox');

goog.include('ad/impl/plusbox/plusbox.less');

goog.provide('ad.impl.plusbox.Plusbox');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.plusbox.Plusbox(AD_CONFIG['plusbox'])]
    );
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

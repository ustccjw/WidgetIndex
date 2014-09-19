/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/gao_xiao.js ~ 2014/03/05 15:31:45
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * gao_xiao相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.RankTitle');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/zhixin/gao_xiao.less');

goog.provide('ad.impl.zhixin.GaoXiao');

ad.Debug(function(async){
    AD_CONFIG['logos']['ubs_config'] = '{"rsv_dl":"0_right_ppqj_999999"}';

    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.zhixin.RankTitle(AD_CONFIG['title']);
    var logos = new ad.widget.ImageNormal(AD_CONFIG['logos']);

    material.setWidgets(
        [title],
        [logos]
    );

    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

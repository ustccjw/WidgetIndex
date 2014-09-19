/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: simple_header.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/meizhiyuan/simple_header.js ~ 2013/04/19 16:19:24
 * @author liyubei@baidu.com (leeight)
 * @version $Revision: 150523 $
 * @description
 * simple_header相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.SiteSimpleHeader');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/meizhiyuan/simple_header.less');

goog.provide('ad.impl.tieba.meizhiyuan.SimpleHeader');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.SiteSimpleHeader(AD_CONFIG['header'])]
    );
    material.show();

    // 生成的格式为ec_ma_m1234，需要替换掉前缀拿到mcid
    var materialId = AD_CONFIG['id'].replace(/ec_ma_m/, '');
    var extraParams = {};
    extraParams['materialId'] = materialId;
    /* jshint ignore:start */
    var rcv2 = new ad.service.RCV2Service(AD_CONFIG['id'], null, null, {
        'extraParams': extraParams
    });
    /* jshint ignore:end */

    if (!ad.env.isServer) {
        var root = material.getRoot();
        root.style.position = 'relative';
        var anchor = root.appendChild(document.createElement('A'));
        anchor.style.display = 'block';
        anchor.style.position = 'absolute';
        anchor.style.right = '-200px';
        anchor.style.top = '130px';
        anchor.style.width = '200px';
        anchor.style.height = '170px';
        anchor.target = '_blank';
        anchor.href = AD_CONFIG['header']['banner']['rcv_url'];
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

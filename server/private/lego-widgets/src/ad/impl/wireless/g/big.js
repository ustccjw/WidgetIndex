/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/g/big.js ~ 2013/12/25 13:53:56
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.Table');

goog.include('ad/impl/wireless/big/head.less');
goog.include('ad/impl/wireless/big/colorlist.less');
goog.include('ad/impl/wireless/smart/table.less');
goog.include('ad/impl/wireless/g/big.less');

goog.provide('ad.impl.wireless.g.Big');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_middle'];

    var head = new ad.widget.wireless.Head(AD_CONFIG['head']);
    var list = new ad.widget.Colorlist(AD_CONFIG['list']);
    var table = new ad.widget.Table(AD_CONFIG['table']);

    material.setWidgets(head, list, table);

    if (async === true) {
        return material;
    }
    material.show();

    /*fix 极速版(utouch)无左右边距问题*/
    var canvasDom = material.getRoot();
    var canvasWrap = baidu.dom.getAncestorByClass(canvasDom, 'ec_wise_utouch');

    if(canvasWrap) {
        baidu.dom.setStyle(canvasDom, 'margin', '0 10px');
    }

    head.rewriteTitle2(null, '[主标题]', false);
    list.rewriteTitle2(null, '[栏目]', false);
    table.rewriteTitle2(null, '[子链接]', false);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

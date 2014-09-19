/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/ping_an_frs.js ~ 2012/11/16 12:21:32
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 11222 $
 * @description
 * ping_an_frs相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.Text');
goog.require('ad.widget.tieba.PingAnFrs');
goog.require('ad.service.RCV2Service');
goog.require('ui.events');


goog.include('ad/impl/tieba/ping_an_frs.less');

goog.provide('ad.impl.tieba.PingAnFrs');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    //
    var widget = new ad.widget.tieba.PingAnFrs(AD_CONFIG['ping_an_frs_widget']);
    material.setWidgets(
        [new ad.widget.tieba.Text(AD_CONFIG['text'])],
        [widget]
    );
    material.show();

    var root = material.getRoot();
    if(root){
        root.style.height = 'auto';
    }

    var rcv2Service = new ad.service.RCV2Service(AD_CONFIG['id']);

    // 如果提交成功了，则发送计费统计
    widget.addListener(ui.events.SUBMIT_SUCCESS, function(){
        rcv2Service.sendLog({
            'item' : 'form-submit',
            'source' : 'frs'
        }, null, true);
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

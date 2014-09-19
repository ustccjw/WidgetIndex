/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/normal.js ~ 2012/10/12 04:36:23
 * @author  ()
 * @version $Revision: 11222 $
 * @description
 * normal相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.Text');
goog.require('ad.widget.tieba.Gallery');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/normal.less');

goog.provide('ad.impl.tieba.Normal');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.Text(AD_CONFIG['description'])],
        [new ad.widget.tieba.Gallery(AD_CONFIG['gallery'])]
    );

    material.show();

    var root = material.getRoot();
    if(root){
        root.style.height = 'auto';
    }

    var rcv2Service = new ad.service.RCV2Service(AD_CONFIG['id']);
    
    var lis = root.getElementsByTagName('li');
    baidu.each(lis, function(li){
        var b = li.getElementsByTagName('b')[0];
        if(baidu.dom.hasClass(b.parentNode.parentNode, 'gallery-video')){
            baidu.on(b, 'mousedown', function(){
                rcv2Service.sendLog({
                    'item' : 'video-expand'
                }, b, true);
            });
        } else {
            baidu.on(b, 'mousedown', function(){
                rcv2Service.sendLog({
                    'item' : 'image-expand',
                    'xp' : ad.dom.getXPath(b)
                }, b);
            });
        }
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

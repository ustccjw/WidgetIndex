/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/image_vote.js ~ 2012/10/12 04:09:14
 * @author  ()
 * @version $Revision: 11222 $
 * @description
 * image_vote相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.ImageVote');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/image_vote.less');

goog.provide('ad.impl.tieba.ImageVote');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.ImageVote(AD_CONFIG['image_vote'])]
    );
    material.show();

    var root = material.getRoot();
    if(root){
        root.style.height = 'auto';
    }

    var rcv2Service = new ad.service.RCV2Service(AD_CONFIG['id']);

    var lis = root.getElementsByTagName('li');
    baidu.each(lis, function(li){
        var img = li.getElementsByTagName('img')[0];
        baidu.on(img, 'click', function(){
            rcv2Service.sendLog({
                'item' : 'image-expand'
            }, img);
        });
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

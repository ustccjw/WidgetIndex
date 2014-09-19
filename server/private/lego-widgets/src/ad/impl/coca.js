/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: coca.js 150523 2013-06-05 14:06:00Z  DestinyXie$
 *
 **************************************************************************/



/**
 * src/ad/impl/coca.js ~ 2013/06/05 14:06:00
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * coca相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Title');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/coca.less');

goog.provide('ad.impl.Coca');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var imgCartoon = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon']);
    var imgDesc;

    material.setRender(new ad.render.RecursiveRender());

    material.setWidgets(
        [
            [video],
            [
                head,
                weibo
            ]
        ],
        [title],
        [imgCartoon]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    material.initMonitor(AD_CONFIG['main_url']);

    imgCartoon.addListener(ui.events.CLICK, function(index, e){
        showDesc(index);
        imgCartoon.sendLog('胶带图' + (index + 1) + 'click');
        return false;
    });

    //显示第二帧
    function showDesc(index) {
        if(!imgDesc) {
            createDesc();
        }
        setDesc(index);
        baidu.show(imgDesc);
    }

    //创建第二帧内容
    function createDesc() {
        imgDesc = baidu.dom.create('div', {'class': 'img-desc'});
        imgDesc.innerHTML = ['<div class="share-back" id="' + imgCartoon.getId("share-back") + '"></div>',
            '<div class="share-pic">',
                '<a id="' + imgCartoon.getId("share-pic-wrap") + '" target="_blank" title2="说明图片" href="">',
                '</a>',
            '</div>',
            '<div class="share-desc">',
                '<a id="' + imgCartoon.getId("share-desc-wrap") + '" target="_blank" title2="说明描述" href="">',
                '</a>',
            '</div>',
            '<div class="share-link">',
                '<a rel="nofollow" id="' + imgCartoon.getId("sina-share") + '" class="sina-share" title="新浪微博" title2="新浪微博">新浪微博</a>',
                '<a rel="nofollow" id="' + imgCartoon.getId("qqweibo-share") + '" class="qqweibo-share" title="腾讯微博" title2="腾讯微博">腾讯微博</a>',
                '<a rel="nofollow" id="' + imgCartoon.getId("renren-share") + '" class="renren-share" title="人人网" title2="人人网">人人网</a>',
            '</div>'].join('');
        baidu.dom.first(imgCartoon.getRoot()).appendChild(imgDesc);
        baidu.on(imgCartoon.getId("share-back"), 'click', function() {
            baidu.hide(imgDesc);
        })
        baidu.on(imgCartoon.getId("sina-share"), 'click', function() {
            var data = imgCartoon.selectedImgData;
            var url = 'http://v.t.sina.com.cn/share/share.php?url=' + 
                      decodeURIComponent(data['share_link']) + 
                      '&title=' + decodeURIComponent(data['share_text']) + 
                      '&pic=' + decodeURIComponent(data['share_pic']);
            var params = getParamsOfShareWindow(607, 523);
            window.open(url, 'share', params);
        });
        baidu.on(imgCartoon.getId("qqweibo-share"), 'click', function() {
            var data = imgCartoon.selectedImgData;
            var url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url=' + 
                      decodeURIComponent(data['share_link']) + 
                      '&title=' + decodeURIComponent(data['share_text']) + 
                      '&pic=' + decodeURIComponent(data['share_pic']) +
                      '&site=' + decodeURIComponent(data['share_site']);
            var params = getParamsOfShareWindow(607, 523);
            window.open(url, 'share', params);
        });
        baidu.on(imgCartoon.getId('renren-share'), 'click', function(){
            var data = imgCartoon.selectedImgData;
            var url = 'http://widget.renren.com/dialog/share?resourceUrl=' + 
                      decodeURIComponent(data['share_link']) + 
                      '&title=' + decodeURIComponent(data['share_text']) + 
                      '&pic=' + decodeURIComponent(data['share_pic']) +
                      '&srcUrl=' + decodeURIComponent(data['share_site']) + 
                      '&description=';
            var params = getParamsOfShareWindow(607, 523);
            window.open(url, 'share', params);
        });
    }

    //设置分享弹出页面位置尺寸
    function getParamsOfShareWindow(width, height) {
        return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=', (screen.width - width) / 2, ',top=', (screen.height - height) / 2].join('');
    }

    //设置第二帧内容
    function setDesc(index) {
        var data = AD_CONFIG['img_cartoon']['options'][index];
        var logPre = '胶带图' + (index + 1);
        imgCartoon.selectedImgData = data;
        baidu.dom.setAttr(imgCartoon.getId("share-pic-wrap"), 'href', data['shareimglink']);
        baidu.dom.setAttr(imgCartoon.getId("share-pic-wrap"), 'title2', logPre + '说明图片');
        baidu.g(imgCartoon.getId("share-pic-wrap")).innerHTML = '<img src="' + data['shareimgsrc'] + '" alt = "" />';
        baidu.dom.setAttr(imgCartoon.getId("share-desc-wrap"), 'href', data['sharedesclink']);
        baidu.dom.setAttr(imgCartoon.getId("share-desc-wrap"), 'title2', logPre + '说明描述');
        baidu.g(imgCartoon.getId("share-desc-wrap")).innerHTML = data['sharedesc'];

        baidu.dom.setAttr(imgCartoon.getId("sina-share"), 'title2', logPre + '新浪微博');
        baidu.dom.setAttr(imgCartoon.getId("qqweibo-share"), 'title2', logPre + '腾讯微博');
        baidu.dom.setAttr(imgCartoon.getId("renren-share"), 'title2', logPre + '人人网');

    }
});
/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1087.js ~ 2013/11/07 15:26:49
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1087相关的实现逻辑
 * 品牌专区-浮层视频样式
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Video');
goog.require('ad.widget.floatvideo.Film');
goog.require('ad.widget.floatvideo.Like');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/advanced/case1087.less');

goog.provide('ad.impl.advanced.Case1087');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    var image = new ad.widget.Image(AD_CONFIG['image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i ++) {
        tabBodies.push(new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]));
    }
    tab.setWidgets(tabBodies);

    material.setWidgets(
        [image, smallHead],
        tab,
        buttonGroup
    );
    if (async === true) {
        return material;
    }
    material.show();

    // 图片的交互效果，有点儿复杂耶~~~
    var imageElement = baidu.g(image.getId('img'));
    var iconElement = imageElement.parentNode.appendChild(document.createElement('div'));
    iconElement.className = 'ec-icon';
    ad.dom.enter(image.getRoot(), function(){
        iconElement.className = 'ec-icon ec-icon-hover';
        showImageMask();
    });
    ad.dom.leave(image.getRoot(), function(){
        iconElement.className = 'ec-icon';
        hideImageMask();
    });
    ad.dom.on(image.getRoot(), 'click', function(){
        showPopup();
        image.sendLog({
             'action': '打开浮层',
            '__node': image.getRoot()
        });
    });

    // 显示视频浮层
    var fwc = null;
    function showPopup() {
        if (!fwc) {
            fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            var video = new ad.widget.Video(getVideoConfig(0));
            var film = new ad.widget.floatvideo.Film(AD_CONFIG['film']);
            var like = new ad.widget.floatvideo.Like(AD_CONFIG['like']);
            var share = new ad.widget.BaiduShareV2(AD_CONFIG['share']);
            fwc.setWidgets([video, film], [like, share]);

            film.addListener(ui.events.CLICK, function(index){
                video.setData(getVideoConfig(index));
                video.sendLog("点击播放" + (index + 1), "浮层视频" + (index + 1));
                video.refresh();
            });

            fwc.addListener(ui.events.SEND_LOG, function(params) {
                image.sendLog(params);
            });

            material.trigger(ui.events.NEW_AD_CANVAS, fwc.getId('fwc'));
        }
        fwc.show();
        var pos = baidu.dom.getPosition(material.getRoot());
        var dom = baidu.g(fwc.getId('fwc'));
        baidu.setStyle(dom, 'left', pos.left + 'px');
        baidu.setStyle(dom, 'top', pos.top + 'px');
    }

    /**
     * 从AD_CONFIG['film']中获取视频的配置信息
     */
    function getVideoConfig(index) {
        var item = AD_CONFIG['film']['options'][index];
        return {
            'rcv_url' : item['rcv_url'],
            'video_url' : item['video_url'],
            //'player_ver': 5,
            'width': 480,
            'is_play': true,
            'height': 295
        }
    };

    function showImageMask() {
        imageMask.style.display = '';
    };

    function hideImageMask() {
        imageMask.style.display = 'none';
    };

    var imageMask = material.getRoot().appendChild(document.createElement('div'));
    imageMask.className = 'ec-image-mask';
    imageMask.innerHTML = '<div class="ec-detail">' + AD_CONFIG['image']['detail']  + '</div>';
    hideImageMask();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

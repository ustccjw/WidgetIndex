/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: benz_china.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/benz_china.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/benz_china.less');

goog.provide('ad.impl.BenzChina');

ad.Debug(function(async) {
    window['_mkt'] = window['_mkt'] || [];

    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_form']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);

    var lastFWCVideoIndex;
    var cover;
    var fwcRenderd = false;
    var mapFwcRenderd = false;

    //{{{
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 50, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i ++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text']
        });
    }
    var imageNormal = new ad.widget.ImageNormal(datasource);
    AD_CONFIG['fwc']['material_name'] = 'ec-benz';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, imageNormal]);
    //}}}

    //{{{
    AD_CONFIG['fwc_map']['material_name'] = 'ec-benz-map';
    AD_CONFIG['fwc_map']['id'] = 2;
    AD_CONFIG['select_type'] = {
        "datasource_url": RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/2d8418ff0b78dace25949e84985e16f8.js',
        "dependency": [{
            "name": "type"
        }]
    };
    var bMap = new ad.widget.Bmap(AD_CONFIG['tab_form']['map']);
    var selectType = new ad.widget.DependencySelect(AD_CONFIG['select_type']);
    var selectPlace = new ad.widget.DependencySelect(AD_CONFIG['tab_form']['province_city']);
    var fwcMap = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc_map']);
    fwcMap.setWidgets(
        [
            selectType,
            selectPlace,
            bMap
        ]
    );
    //}}}

    // 准备Tab的内容.
    var arrTabCont = [];
    arrTabCont.push(iframe);
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    if (options && options.length) {
        for (var i = 0; i < options.length; i ++) {
            arrTabCont.push(new ad.widget.TabCont(options[i]));
        }
    }

    // FIXME(user)
    AD_CONFIG['tab']['options'].unshift({'tab_title': '预约试驾'});
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabCont);

    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [fwc],
        [fwcMap]
    );

    if (async === true) {
        return material;
    }

    material.show();

    //material.initMonitor(AD_CONFIG['main_url']);
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        smallHead.sendLog('float1video'+(index + 2) + 'start');
        return false;
     });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        window['_mkt'].push(['_pauseTimer', 1]);
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video1start');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('video1pause');
        //左侧视频暂停播放精算计时$
        window['_mkt'].push(['_pauseTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('video1continue');
        //左侧视频继续播放精算计时$
        window['_mkt'].push(['_continueTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        window['_mkt'].push(['_stopTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('video1auto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });
    iframe.addListener(ui.events.CLICK, function(){
        iframe.sendLog('floatmapopen', 'floatmapopen');
        showMapFWC();
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function(index) {
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        hideFWC();
     });
    fwcMap.addListener(ui.events.CLOSE, function(index) {
        hideMapFWC();
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
        window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'pause');
        //左侧视频暂停播放精算计时$
        window['_mkt'].push(['_pauseTimer', lastFWCVideoIndex + 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'continue');
        //左侧视频继续播放精算计时$
        window['_mkt'].push(['_continueTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'auto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    imageNormal.addListener(ui.events.CLICK, function(index,e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType == '1') {
            if(oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    /**
     * 处理select type 切换
     * @param {Array} values type select数据
     */
    function changeTypeHandler(values){
        baidu.array.each(values, function(item, index){
            bMap.hideMarkersByMgr([0]);
            if(item.selectedIndex === 1){
                bMap.showMarkersByMgr([0]);
            }
            bMap.moveToChina();
        });
    }
    selectType.addListener(ui.events.CHANGE, function(values){
        changeTypeHandler(values);
    });
    //selectType.initByVal(selectType['_data'][1]['value']);
    /**
     * 处理select place 切换
     * @param {Array} values place select数据
     */
    function placeTypeHandler(values){
        var data = [];
        baidu.array.each(values, function(item, index){
            if(item.value != "null"){
                data.push(item.value);
            }
        });
        if(data && data.length){
            bMap.moveToCity(data[data.length - 1]);
        }
    }
    selectPlace.addListener(ui.events.CHANGE, function(values){
        placeTypeHandler(values);
    });
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        hideMapFWC();
        if(!fwc)
            return;
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
            },10);
            fwc.show();
            if (!fwcRenderd) {
                var canvas = baidu.dom.first(fwc.getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    //material.getCMS().init(canvas.id);
                    fwcRenderd = true;
                }
            }
        }
        arrLinks = imageNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }
    /**
     * 显示地图浮层
     */
    function showMapFWC() {
        hideFWC();
        fwcMap.show();
        if (!mapFwcRenderd) {
            var canvas = baidu.dom.first(fwcMap.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                mapFwcRenderd = true;
            }
        }
    }
    /**
     * 隐藏地图浮层
     */
    function hideMapFWC() {
        fwcMap.hide();
    }
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
        lastFWCVideoIndex = -1;
    }

    var arrLinks;
    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div',{'class':'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arrLinks[index];
        if(link) {
            link.appendChild(cover);
        }
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

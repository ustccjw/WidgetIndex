/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: malidaijia.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/malidaijia.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Map');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageShowArrow');

goog.include('ad/impl/malidaijia.less');

goog.provide('ad.impl.Malidaijia');

ad.Debug(function(async) {
    var lastFWCIndex = -1; //最后显示的浮窗索引
    AD_CONFIG['fwc']['material_name'] = 'ec-malidaijia'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwcFloat = []; //smalltitle3个产品图点击弹开浮层2~4
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var map;
    var widgetFloatImages = [];
    AD_CONFIG['fwc']['id'] = 0;
    var fwc0Float = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwc0FloatVideo = new ad.widget.Video(AD_CONFIG['video_fwc_con']['video']);
    var fwc0FloatMap = new ad.widget.Map(AD_CONFIG['video_fwc_con']['float']);
    
    fwc0Float.setWidgets([
        fwc0FloatVideo,
        fwc0FloatMap
    ]);
    
    if(AD_CONFIG['float_cons'] && AD_CONFIG['float_cons'].length) {
        var flashCount = AD_CONFIG['float_cons'].length;
        for(var i = 0;i < flashCount; i++) {
            AD_CONFIG['fwc']['id'] = (i + 1);
            var fwcItem = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            if(i === 0) {
                map = new ad.widget.Map(AD_CONFIG['float_cons'][i]);
                fwcItem.setWidgets([
                    fwcVideo,
                    map
                ]);
            }else {
                AD_CONFIG['float_cons'][i]['switch_time'] = 500000000;
                widgetFloatImages.push(
                        new ad.widget.ImageShowArrow(AD_CONFIG['float_cons'][i])
                    );
                fwcItem.setWidgets([
                    widgetFloatImages[i - 1]
                ]);
            }
            fwcFloat.push(fwcItem);
        }
    }
    // material.setRender(new ad.render.RecursiveRender());
    tab_container.setWidgets([
        new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])
    ]);
    material.setWidgets(
        [leftVideo,smallHead],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])],
        [fwc0Float],
        fwcFloat
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化浮层监测
    /*
    if(fwcFloat && fwcFloat.length) {
        baidu.array.each(
            fwcFloat, function(item, i) {
                material.getCMS().init(
                    baidu.getAttr(baidu.dom.first(item.getRoot()), 
                    'id')
                );
            }
        );
    }*/
    if(widgetFloatImages && widgetFloatImages.length) {
        baidu.array.each(
            widgetFloatImages, function(item, i) {
                // FIXME(user) item.rewriteTitle2
                /*
                item.rewriteTitle2(
                    item.getRoot(),
                    "float" + (i + 2) + "-",
                    false
                );*/
                item.addListener(ui.events.ARROW_RIGHT, function() {
                    item.sendLog("float" + (i + 2) + "-arrow-right");
                });
                item.addListener(ui.events.ARROW_LEFT, function() {
                    item.sendLog("float" + (i + 2) + "-arrow-left");
                });
            }
        );
    }
    if(fwc0Float) {
        // FIXME(user) material.getCMS().init
        /*
        material.getCMS().init(
            baidu.getAttr(baidu.dom.first(fwc0Float.getRoot()), 
            'id')
        );*/
    }
    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('float0open');
        return false;
    });
    
    smallHead.addListener(
        ui.events.CLICK, 
        function(index, me) {
            if(index == 0){
                leftVideo.pause();
            }
            showFWC(index + 1);
            smallHead.sendLog("float" + (index + 1) + "open");
            return false;
         }
     );

    fwc0FloatVideo.addListener(
        ui.events.VIDEO_START, 
        function() {
            fwc0FloatVideo.sendLog('float0videostart');
            return false;
        }
    );
    fwc0FloatVideo.addListener(
        ui.events.VIDEO_CLICK, 
        function() {
            fwc0FloatVideo.sendLog('float0videojump');
            //在ipad下手动跳转
            if(fwc0FloatVideo._data['is_ipad']) {
                fwc0FloatVideo.redirect();
            }
            return false;
        }
    );
    fwc0FloatVideo.addListener(
        ui.events.VIDEO_FINISH, 
        function() {
            fwc0FloatVideo.sendLog('float0videocomplete');
            return false;
        }
    );
    
    fwcVideo.addListener(
        ui.events.VIDEO_START, 
        function() {
            fwcVideo.sendLog('float1videostart');
            return false;
        }
    );
    fwcVideo.addListener(
        ui.events.VIDEO_CLICK, 
        function() {
            fwcVideo.sendLog('float1videojump');
            //在ipad下手动跳转
            if(fwcVideo._data['is_ipad']) {
                fwcVideo.redirect();
            }
            return false;
        }
    );
    fwcVideo.addListener(
        ui.events.VIDEO_FINISH, 
        function() {
            fwcVideo.sendLog('float1videocomplete');
            return false;
        }
    );
    
    if(fwcFloat && fwcFloat.length) {
        baidu.array.each(
            fwcFloat,
            function(item, i) {
                item.addListener(
                    ui.events.CLOSE, 
                    function() {
                        hideFWC(i + 1);
                    }
                );
            }
        );
    }
	fwc0Float.addListener(
		ui.events.CLOSE, 
		function() {
			hideFWC(0);
		}
	);
    fwc0FloatMap.addListener(
        ui.events.MAP_CLICK, 
        function(j) {
            fwc0FloatMap.sendLog('float0-link' + (j + 1));
            return false;
        }
    );
    fwc0FloatMap.addListener(
        ui.events.MAP_ALL_CLICK, 
        function(j) {
            fwc0FloatMap.sendLog('float0-jump');
            return false;
        }
    );
    map.addListener(
        ui.events.MAP_CLICK, 
        function(j) {
            map.sendLog('float1-link' + (j + 1));
            return false;
        }
    );
    map.addListener(
        ui.events.MAP_ALL_CLICK, 
        function(j) {
            map.sendLog('float1-jump');
            return false;
        }
    );
    
    /**
     * 获取对应索引的浮层实例
     * @param {number} index 索引.
     * @return {Object} 对应的浮层实例.
     */
    function getFWCByIndex(index) {
        if(index < 0) {
            return null;
        }else if(index == 0){
                return fwc0Float;
        }else {
            return fwcFloat[index - 1];
        }
    }

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCIndex == index) {
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = getFWCByIndex(index);
        if(!targetFWC)
            return;
        targetFWC.show();
        if(index == 0) {
            ad.base.setTimeout(
                function() {
                    fwc0FloatVideo.refresh();
                },
                10
            );
        } else if(index == 1) {
            //重绘浮层视频
            if(fwcVideo) {
                ad.base.setTimeout(
                    function() {
                        fwcVideo.refresh();
                    },
                    10
                );
            }
        }
        lastFWCIndex = index;
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(index) {
        var targetFWC = getFWCByIndex(index);
        if(!targetFWC)
            return;
        if(index == 0) {
            fwc0FloatVideo.getRoot().innerHTML = "";
        } else if(index == 1) {
            if(fwcVideo) {
                fwcVideo.getRoot().innerHTML = "";
            }
        }
        targetFWC.hide();
        lastFWCIndex = -1;
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2013-10-14 14:34:23 Baidu.com, Inc. All Rights Reserved
 * $Id: omega3.js 11222 2013-10-14 14:34:23 fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/omega3.js ~ 2013/10/14 14:34:23
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * omega2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ui.events');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Table');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/omega3.less');

goog.provide('ad.impl.Omega3');

ad.Debug(function(async) {
    
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    AD_CONFIG['fwc']['material_name'] = 'ec-omega'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = "video";
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['video']);
    fwc.setWidgets([fwcVideo]);
    var videoTitle = new ad.widget.VideoTitle(AD_CONFIG['video_title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['head']);
    
    /** 按钮列表 */
    var rightWidgets = [ smallHead ];
    var btnGroup1 = null;
    var btnGroup2 = null;
    var btnOptions = AD_CONFIG['buttons']['options'];
    if (btnOptions.length >= 4) {
        // 有两行
        btnGroup1 = new ad.widget.ButtonGroup({
            'options': btnOptions.splice(0, 3)
        });
        btnGroup2 = new ad.widget.ButtonGroup({
            'options': btnOptions
        });

        rightWidgets.push(btnGroup1);
        rightWidgets.push(btnGroup2);
    }
    else {
        // 只有一行
        btnGroup1 = new ad.widget.ButtonGroup({
            'options': btnOptions
        });
        rightWidgets.push(btnGroup1);
    }
    
    var listIndex = -1;
    var weiboIndex = -1;
    var selectDefault = "";
    var list;
    var select;
    var formConfig;
    var fwcRendered = false;
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('image_cartoon' in widgetConfig) {
            return new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
        }
        else if ('form' in widgetConfig) {
            if (!widgetConfig['form']['dependency']) {
                widgetConfig['form']['dependency'] = [
                    {
                        'name': "city",
                        'title': "城&nbsp;&nbsp;&nbsp;&nbsp;市",
                        'default': "上海"
                    },
                    {
                        'name': "store",
                        'title': "专卖店"
                    }
                ];
            }
            selectDefault = widgetConfig['form']['dependency'][0]['default'];
            select = new ad.widget.DependencySelect(widgetConfig['form']);
            list = new ad.widget.lv.List(widgetConfig['form']);
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([list, select]);
            formConfig = widgetConfig['form'];
            listIndex = index;

            return nc;
        }
        else if ('weibo' in widgetConfig) {
            weiboIndex = index;
            return new ad.widget.SmallWeibo(widgetConfig['weibo']);
        }
    }
    
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(createWidget(tabOptions[i], i))
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    
    /**
     * @param {number} index
     * @return {string}
     */
    tab.getTabClassName = function(index) {
        var className = "ec-tab-content-" + index;
        if (index === listIndex) {
            className += " ec-tab-content-list";
        } else if (index === weiboIndex) {
            className += " ec-tab-content-weibo";
        }
        return className;
    }
    tab.setWidgets(tabBodies);
    
    material.setWidgets(
        [
            [
                leftVideo, 
                videoTitle
            ],
            [rightWidgets]
        ], 
        [tab],
        [fwc]
    );
    
    if (async === true) {
        return material;
    }
    
    material.show();
    
    if(btnGroup1){
        btnGroup1.rewriteTitle2(btnGroup1.getRoot(), "Group1");
    }
    if(btnGroup2){
        btnGroup2.rewriteTitle2(btnGroup2.getRoot(), "Group2");
    }
    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC();
        leftVideo.pause();
        leftVideo.sendLog('floatopen');
        leftVideo.sendLog('floatvideostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('videocomplete');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('videopause');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('videocontinue');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('videoauto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('videostart');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC();
        fwcVideo.pause();
        fwcVideo.sendLog('floatopen');
        fwcVideo.sendLog('floatvideostart');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('videocomplete');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        fwcVideo.sendLog('videopause');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        fwcVideo.sendLog('videocontinue');
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('videoauto');
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
    });
    if(select) {
        select.addListener(ui.events.CHANGE, function(city, shop, depth) {
            var detail;
            if (depth == 0) {
                detail = shop[0];
            } else {
                var sIndex = city[1]['selectedIndex'];
                if (!('children' in shop[sIndex])) {
                    return;
                }
                detail = shop[sIndex]['children'][0];
            }
            detail['title_left_rcv_url'] = formConfig['title_left_rcv_url'];
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        });

        // select初始化完毕了.
        select.addListener(ui.events.LOAD, function() {
            var defaultCity = '上海';
            select.initByVal(defaultCity);
        });
    }
    /**
     * 显示浮层
     */

    function showFWC() {
        hideFWC();
        if (fwc) {
            //重绘浮层视频
            if (fwcVideo) {
                ad.base.setTimeout(function() {
                    fwcVideo.refresh();
                }, 10);
                fwc.show();
            }
        }
        //trigger NEW_AD_CANVAS
        if (!fwcRendered) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered = true;
            }
        }
    }

    /**
     * 隐藏浮层
     */

    function hideFWC() {
        if (fwc) {
            if (fwcVideo) {
                fwcVideo.clearRoot();
            }
            fwc.hide();
        }
    }
});
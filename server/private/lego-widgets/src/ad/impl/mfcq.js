/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: mfcq.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/mfcq.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ui.events');

goog.include('ad/impl/mfcq.less');

goog.provide('ad.impl.Mfcq');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var tabcontIndex;
    var weiboIndex;
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('image_cartoon' in widgetConfig) {
            return new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
        }
        else if ('tabcont' in widgetConfig) {
            tabcontIndex = index;
            return new ad.widget.TabCont(widgetConfig['tabcont']);
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
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);

    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    /**
     * @param {number} index
     * @return {string}
     */
    tab.getTabClassName = function(index) {
        var className = "ec-tab-content-" + index;
        if (index === tabcontIndex) {
            className += " ec-tab-content-tabcont";
        } else if (index === weiboIndex) {
            className += " ec-tab-content-weibo";
        }
        return className;
    }
    tab.setWidgets(tabBodies);
    
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var leftWidgets = [
        new ad.widget.Video(AD_CONFIG['video'])
    ];
    if (AD_CONFIG['video_title']['text']) {
        leftWidgets.push(new ad.widget.VideoTitle(AD_CONFIG['video_title']));
    }

    /** 按钮列表 */
    var rightWidgets = [ head ];
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

    /** 设置物料中的元素 */
    material.setWidgets(
        [title],
        [
            leftWidgets,
            rightWidgets
        ],
        [tab]
    );

    if (async === true) {
        return material;
    }

    material.show();

    btnGroup1.rewriteTitle2(null, '第一行', false);
    if (btnGroup2) {
        btnGroup2.rewriteTitle2(null, '第二行', false)
    }

    /*
    if (listIndex != -1) {
        baidu.addClass(tab.getId('tab-content-' + listIndex), "ec-tab-content-list")
    }*/
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */

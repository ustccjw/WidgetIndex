/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lv2.js ~ 2013/03/18 13:45:50
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * lv2相关的实现逻辑
 **/

goog.require('ad.Debug');
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
goog.require('ui.events');

goog.include('ad/impl/lv2.less');

goog.provide('ad.impl.Lv2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());

    var listIndex = -1;
    var weiboIndex = -1;
    var selectDefault = "";
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
            list = new ad.widget.lv.List({
                'title_left': widgetConfig['form']['head_text'],
                'title_left_rcv_url': widgetConfig['form']['head_text_rcv_url']
            });
            var nc = new ad.widget.NormalContainer({});
            nc.setWidgets([list, select]);

            listIndex = index;

            return nc;
        }
        else if ('table' in widgetConfig) {
            var tb1 = createTableWidget(
                widgetConfig['table']['left_head'],
                widgetConfig['table']['left_head_rcv_url'],
                widgetConfig['table']['left_body']);
            var tb2 = createTableWidget(
                widgetConfig['table']['right_head'],
                widgetConfig['table']['right_head_rcv_url'],
                widgetConfig['table']['right_body']);
            var nc2 = new ad.widget.NormalContainer({});
            nc2.setWidgets([tb1, tb2]);
            return nc2;
        }
        else if ('weibo' in widgetConfig) {
            weiboIndex = index;
            return new ad.widget.SmallWeibo(widgetConfig['weibo']);
        }
    }

    function createTableWidget(headText, headTextUrl, bodyList) {
        var cfg = {
            "head": [
                {
                    "text": headText,
                    "column_count": 3
                }
            ],
            "body": [
            ]
        }
        if (headTextUrl) {
            cfg['head'][0]['rcv_url'] = headTextUrl;
        }

        for (var i = 0; i < bodyList.length; i ++) {
            cfg['body'].push({
                "tr": bodyList[i]
            });
        }

        return new ad.widget.Table(cfg);
    }

    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(createWidget(tabOptions[i], i))
    }

    var list;
    var select;
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);

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
        [
            leftWidgets,
            rightWidgets
        ],
        [tab]
    );

    if (async === true) {
        return material;
    }

    if (select) {
        select.addListener(ui.events.CHANGE, function(city, shop, depth){
            var detail;
            var sel = select.getEleByName('city');
            if (depth == 0) {
                detail = shop[0];
            }
            else {
                var sIndex = city[1]['selectedIndex'];
                detail = shop[sIndex]['children'][0];
            }
            detail['enable_bmap'] = false;
            detail['img_src'] = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/e95d4b929e1cb6938751645176a62178.jpg';
            detail['title_left'] = list.getData('title_left', detail['title_left']);
            detail['title_left_rcv_url'] = list.getData('title_left_rcv_url', detail['title_left_rcv_url'])
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        });

        // select初始化完毕了.
        select.addListener(ui.events.LOAD, function(){
            var defaultCity = selectDefault || '上海';
            select.initByVal(defaultCity);
        });
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

/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/braun.js ~ 2014/06/30 15:39:57
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * braun相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Table');

goog.include('ad/impl/new_custom/braun.less');

goog.provide('ad.impl.new_custom.Braun');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    
    var listIndex = -1;
    var weiboIndex = -1;
    var activityIndex = -1;
    var table1;
    var table2;
    var storeForm;

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
            storeForm = widgetConfig['form'];
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
            table1 = tb1;
            table2 = tb2;
            var nc2 = new ad.widget.NormalContainer({});
            nc2.setWidgets([tb1, tb2]);
            activityIndex = index;
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
                    "column_count": 1
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
    
    var list;
    var select;
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(createWidget(tabOptions[i], i))
    }
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    
    var headButtons = [];
    var headButtonOptions = AD_CONFIG['head_button']['options'];
    headButtons.push(new ad.widget.ButtonList(
        {'options': headButtonOptions.slice(0, 2)}));
    headButtons.push(new ad.widget.ButtonList(
        {'options': headButtonOptions.slice(2)}));
    
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
        } else if (index === activityIndex) {
            className += " ec-tab-content-activity";
        }
        return className;
    }

    tab.setWidgets(tabBodies);
    var footButton = new ad.widget.ButtonGroup(AD_CONFIG['foot_button']);

    material.setWidgets(
        [
            new ad.widget.Title(AD_CONFIG['title'])
        ],
        [
            video,
            [smallHead, headButtons]
        ],
        [tab],
        [footButton]
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
            detail['title_left'] = "查找我们位于中国的专卖店";
            detail['rcv_url'] = storeForm['head_text_rcv_url'];
            detail['title_right'] = detail['title'];
            detail['extra'] = storeForm['extra'];
            list.refresh(null, detail);
            list.rewriteTitle2(null, detail['title_right'] + ' ', false);
        });

        // select初始化完毕了.
        select.addListener(ui.events.LOAD, function(){
            var defaultCity = '上海';
            select.initByVal(defaultCity);
        });
    }
    tab.addListener(ui.events.TAB_CHANGE, function(index) {
        if(!tableInitedMonitor && table1 && table2 
            && table1.getRoot() && table2.getRoot()){
            table1.rewriteTitle2(table1.getRoot(), 'left-', false);
            table2.rewriteTitle2(table2.getRoot(), 'right-', false);
            tableInitedMonitor = true;
        }
    });
    material.show();
    
    var tableInitedMonitor = false;
    baidu.each(headButtons, function (headButton, index) {
        headButton.rewriteTitle2(
            headButton.getRoot(), '头部' + (index + 1), false);
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/business_app/auto_show_video.js ~ 2013/03/18 15:02:47
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * auto_show_video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Description');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Video');

goog.include('ad/impl/business_app/auto_show_video.less');

goog.provide('ad.impl.business_app.AutoShowVideo');

ad.Debug(function() {
    /**
     * 所有与物料数据交互的api在此。
     * AD_CONFIG只包含了一些内部配置。
     * window['infoData']是开放给用户配置的，
     * 故build之后必须手动添加infoData的值
     */
    var data = (function() {
        var infoData = window['infoData'];
        var cars = infoData['cars'];

        return {
            /**
             * 判断是否是从applist打开的app
             *
             * @return {boolean} true/false.
             */
            fromAppList: function() {
                var search = window['location']['search'];
                if (search) {
                    return search.match(/(?:\?|\&|^)spfrom=applist(?:$|\&)/);
                } else {
                    return false;
                }
            },
            /**
             * 获取banner的信息
             *
             * @return {Object} info
             */
            getBannerInfo: function() {
                return {
                    'name': infoData['name'],   /* 厂商名字 */
                    'url': infoData['url'],    /* 厂商主页url */
                    'logoUrl': infoData['logoUrl'], /* 厂商logo的url地址 */
                    'place': infoData['place']  /* 展馆位置 */
                };
            },
            /**
             * 获取tab相关配置
             */
            getTabConfig: function() {
                var secondOption = AD_CONFIG['tab']['options'][1];
                secondOption['tab_title'] = '' +
                    infoData['name'] +
                    secondOption['tab_title'];

                return AD_CONFIG['tab'];
            },
            /**
             * 获取select相关配置
             */
            getSelectConfig: function() {
                var options = [];
                var car;
                for (var i=0,l=cars.length; i<l; i++) {
                    car = cars[i];
                    options.push({
                        'value': i,
                        'text': car['name'] + car['model']
                    });
                }

                return {
                    'data': options,
                    'dependency': [{name: 'car'}]
                };
            },
            /**
             * 获取视频相关配置
             */
            getVideoConfig: function(index) {
                var car = cars[index || 0];
                var conf = AD_CONFIG['video'];
                conf['img_url'] = conf['ipad_img'] = car['pic'];
                conf['video_url'] = car['video'];
                return conf;
            },
            /**
             * 获取车子描述的相关信息
             */
            getDesciptionConfig: function(index) {
                var car = cars[index || 0];
                return {
                    'title': car['name'] + '<br/>' + car['model'],
                    'infos': [
                        {'name': '价格：', 'desc': car['price']},
                        {'name': '类型：', 'desc': car['type']},
                        {'name': '级别：', 'desc': car['class']}
                    ],
                    'link': {
                        'title': '查看配置参数',
                        'text': '查看配置参数',
                        'url': 'javascript:void(0);'
                    },
                    'desc': '简介：' + car['intro']
                };
            },
            /**
             * 获取品牌介绍的相关配置
             */
            getIntroConfig: function() {
                return infoData['intro'];
            },
            /**
             * 获取车型的其他详细配置
             */
            getDetailConfig: function(index) {
                var car = cars[index || 0];
                return car['other'];
            },
            /**
             * 获取plid
             */
            getID: function() {
                return AD_CONFIG['id'] + infoData['id'];
            }
        };
    })();

    // init
    var material = new ad.Material(data.getID());
    var tabContainer = new ad.widget.TabContainer(data.getTabConfig());
    var firstTab = new ad.widget.NormalContainer({});
    var video = new ad.widget.Video(data.getVideoConfig());
    var select = new ad.widget.DependencySelect(data.getSelectConfig());
    var description = new ad.widget.Description(data.getDesciptionConfig());
    firstTab.setWidgets([
        select,
        video,
        description
    ]);

    var secondTab = new ad.widget.Iframe({});
    tabContainer.setWidgets([
        firstTab,
        secondTab
    ]);

    // bind select change event
    select.addListener(ui.events.CHANGE, function(value) {
        var index = value[0]['value'];
        select.sendLog('选择车型');
        description.setData(data.getDesciptionConfig(index));
        description.refresh();
        video.setData(data.getVideoConfig(index));
        video.refresh();
        bindDetailLink(index);
    });

    // bind detail link
    var detailBoard = new ad.widget.Iframe({});
    function bindDetailLink(index) {
        // bind detail link
        var detailLink = baidu.dom.query('a', description.getRoot());
        if (detailLink.length > 0) {
            detailLink = detailLink[0];
            baidu.event.on(detailLink, 'click', function(e) {
                baidu.event.preventDefault(e);
                showDetail(index);
            });
        }
    }
    function showDetail(index) {
        var details = data.getDetailConfig(index);
        var html = '<ul class="ad-widget-detail">';
        var detail1;
        var detail2;
        var tmp;

        for (var i=0,l=details.length; i<l; i=i+2) {
            detail1 = details[i];
            detail2 = details[i+1];
            tmp = i % 4;
            html += '<li class="' +
                    ((tmp === 2) ? 'detail-highlight ' : ' ') +
                    ((i === 0) ? 'detail-first' : '') +
                '"><b>' +
                detail1['key'] +
                '：</b><span>' +
                detail1['value'] +
                '</span>' +
                (detail2 ?
                    ('<b>' + detail2['key'] + '：</b><span>' +
                     detail2['value'] + '</span>')
                    : '') +
                '</li>';
        }
        html += '</ul>';

        // hide select for IE6
        select.hide();

        // show iframe
        var dom = baidu.dom.first(detailBoard.getRoot());
        dom.innerHTML = html;
        baidu.dom.addClass(dom, 'showIframe');

        // 删掉tab的current class
        var tabHead = baidu.g(tabContainer.getId('tab-head'));
        var curLi = baidu.dom.query('.current-tab', tabHead)[0];
        var curA = baidu.dom.query('.current', tabHead)[0];
        baidu.dom.removeClass(curLi, 'current-tab');
        baidu.dom.removeClass(curA, 'current');
        description.sendLog('查看配置参数');
    }

    // set widget
    var showBanner = !data.fromAppList();
    var banner;
    if (showBanner) {
        // 如果是直接打开则显示顶部信息
        banner = new ad.widget.Iframe({});
        material.setWidgets(
            [banner],
            [tabContainer],
            [detailBoard]
        );
    } else {
        material.setWidgets(
            [tabContainer],
            [detailBoard]
        );
    }


    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    // bind detail link
    bindDetailLink(0);

    // add banner
    if (showBanner) {
        var bannerDom = baidu.dom.first(banner.getRoot());
        var bannerInfo = data.getBannerInfo();
        var bannerHtml = '<div class="ad-widget-banner">' +
                '<img src="' + bannerInfo['logoUrl'] + '" />' +
                '<span class="banner-name">2013上海车展-<b>' + bannerInfo['name'] + '网上展厅</b></span>' +
                '<span class="banner-place">所在展馆：' + bannerInfo['place'] + '馆</span> ' +
                '<a href="' + bannerInfo['url'] + '" target="_blank" id="homeUrl">官方网站</a>' +
            '</div>';
        bannerDom.innerHTML = bannerHtml;
        // bind event to send log
        baidu.event.on(baidu.g('homeUrl'), 'click', function(e) {
            // 注意添加到tabContainer
            tabContainer.sendLog('CLICK_HOME');
        });
        // add class to root
        var materialRoot = material.getRoot();
        baidu.dom.addClass(materialRoot, 'ad-widget-show-banner');
    }

    // add select label
    var selectLabel = baidu.dom.create('label');
    selectLabel.innerHTML = AD_CONFIG['select_label'];
    baidu.dom.addClass(selectLabel, 'ad-widget-select-label');
    baidu.dom.insertBefore(selectLabel, baidu.dom.first(select.getRoot()));

    // intro
    var intro = data.getIntroConfig();
    var introHtml = '' +
        '<div class="ad-widget ad-widget-intro">' +
            '<img src="' + intro['pic_url'] + '" />' +
        '</div>';

    // detail
    tabContainer.addListener(ui.events.TAB_CHANGE, function(index) {
        var dom = baidu.dom.first(detailBoard.getRoot());
        baidu.dom.removeClass(dom, 'showIframe');
        select.show();  // for IE6
        if (index === 1) {
            secondTab.getRoot().innerHTML = introHtml;
        }
    });

    // 注册监听器
    var autoShowLogListener = window['autoShowLogListener'];
    if (autoShowLogListener != null) {
        tabContainer.addListener(ui.events.SEND_LOG, function(params) {
            var title = params['action'];
            autoShowLogListener(title);
        });
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

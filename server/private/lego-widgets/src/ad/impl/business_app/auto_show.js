/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/business_app/auto_show.js ~ 2013/03/13 14:14:29
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * auto_show相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.Description');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Video');

goog.include('ad/impl/business_app/auto_show.less');

goog.provide('ad.impl.business_app.AutoShow');

ad.Debug(function() {
    baidu.dom.setStyles(document.getElementsByTagName('body')[0], {
        'margin': 0,
        'padding': 0
    });
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
            getProxyUrl: function() {
                return AD_CONFIG['proxyUrl'] +
                    '?logo=' + encodeURIComponent(infoData['logoUrl']) +
                    '&url=' + encodeURIComponent(infoData['url']) +
                    '&name=' + encodeURIComponent(infoData['name']) +
                    '&place=' + encodeURIComponent(infoData['place']);
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
             * 获取选中的车型名字
             */
            getSelectedCarName: function() {
                return select.getValues()[0].text;
            },
            /**
             * 获取图片轮播相关配置
             */
            getImageOrVideoConfig: function(index) {
                index = index || 0;
                var conf;
                var options = [];
                var car = cars[index];

                // 如果是视频
                if (car['video']) {
                    conf = AD_CONFIG['video'];
                    conf['img_url'] = conf['ipad_img'] = car['pic'];
                    conf['video_url'] = car['video'];
                    conf['isVideo'] = true;
                // 如果是一堆图片
                } else {
                    conf = {};
                    var pics = car['pics'];
                    var pic;
                    for (var i=0,l=pics.length; i<l; i++) {
                        pic = pics[i];
                        options.push({
                            'image_url': pic,
                            'url': pic,
                            'description': '点击图片查看大图'
                        });
                    }

                    conf['options'] = options;
                }

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

    var material = new ad.Material(data.getID());
    var tabContainer = new ad.widget.TabContainer(data.getTabConfig());
    var firstTab = new ad.widget.NormalContainer({});
    var imageOrVideoIframe = new ad.widget.Iframe({});
    var image;  // 图片轮播
    var video;  // 视频播放器
    var imageOrVideo;
    var select = new ad.widget.DependencySelect(data.getSelectConfig());
    var description = new ad.widget.Description(data.getDesciptionConfig());
    var invisableFrame = new ad.widget.Iframe({
        'width': 0,
        'height': 0,
        "src" : data.getProxyUrl()
    });
    firstTab.setWidgets([
        select,
        imageOrVideoIframe,
        description
    ]);

    var secondTab = new ad.widget.Iframe({});
    tabContainer.setWidgets([
        firstTab,
        secondTab
    ]);

    /**
     * 设置图片或者视频的显示更新
     *
     * @param {number|string} index
     */
    function setImageOrVideo(index) {
        var conf = data.getImageOrVideoConfig(index);
        var content;
        var root = baidu.dom.first(imageOrVideoIframe.getRoot());

        var createListener = function(title) {
            return function(index) {
                imageOrVideo.sendLog(
                    title + '_' +
                    data.getSelectedCarName() +
                    (typeof index !== 'undefined' ? ('_' + index) : '')
                );
            };
        };

        // root.innerHTML = '';
        if (conf['isVideo']) {
            delete conf['isVideo'];
            if (!video) {
                video = new ad.widget.Video(conf);
                video.addListener(ui.events.VIDEO_START, createListener('videostart'));
                video.addListener(ui.events.VIDEO_FINISH, createListener('videocomplete'));
                video.addListener(ui.events.VIDEO_CLICK, function() {
                    return false;
                });
                tabContainer.handleWidgetEvent(video);
            }
            imageOrVideo = video;
        } else {
            if (!image) {
                image = new ad.widget.ImageShowArrow(conf);
                image.addListener(ui.events.ARROW_RIGHT, createListener('下一张'));
                image.addListener(ui.events.ARROW_LEFT, createListener('上一张'));
                tabContainer.handleWidgetEvent(image);
            }
            imageOrVideo = image;
        }
        imageOrVideo.refresh(root, conf);
    }

    // bind select change event
    select.addListener(ui.events.CHANGE, function(value) {
        var index = parseInt(value[0]['value'], 10);
        select.sendLog('选择车型');
        select.sendLog('选择车型_' + data.getSelectedCarName());
        setImageOrVideo(index);
        description.setData(data.getDesciptionConfig(index));
        description.refresh();
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
        description.sendLog('查看配置参数_' + data.getSelectedCarName());
    }


    var showBanner = !data.fromAppList();
    var banner;
    if (showBanner) {
        // 如果是直接打开则显示顶部信息
        banner = new ad.widget.Iframe({});
        material.setWidgets(
            [banner],
            [tabContainer],
            [detailBoard],
            [invisableFrame]
        );
    } else {
        material.setWidgets(
            [tabContainer],
            [detailBoard],
            [invisableFrame]
        );
    }


    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    invisableFrame.hide();

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

    // show image or video
    baidu.dom.addClass(baidu.dom.first(imageOrVideoIframe.getRoot()), 'ad-widget-iframe-image-or-video');
    setImageOrVideo(0);

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
        // 添加到tabContainer上
        tabContainer.addListener(ui.events.SEND_LOG, function(params) {
            var title = params['action'];
            autoShowLogListener(title);
        });
    }
    baidu.event.on(imageOrVideoIframe.getRoot(), 'click', function(e) {
        var t = baidu.event.getTarget(e);
        var nodeName = t.nodeName.toLowerCase();
        if (nodeName === 'img' || nodeName === 'a') {
            imageOrVideo.sendLog('点击查看大图');
            imageOrVideo.sendLog('点击查看大图_' + data.getSelectedCarName());
        }
    });

    // 绑定hash改变事件，如果函数改变且有sendlog参数，则通知第三方监控发送日志
    function bindHashChange(callback) {
        var getLogAndCall = function() {
            var hash = window['location']['hash'];
            if (!hash || hash === '#') {
                return;
            }
            var m = hash.match(/#sendlog=([^&$]+)/);
            // 如果有sendlog的hash则发送通知
            if (m) {
                callback(m[1]);
            }
        };
        if (typeof window['onhashchange'] !== 'undefined' && window['addEventListener']) {
            window['addEventListener']('hashchange', getLogAndCall, false);
            ad.base.registerUnloadHandler(function() {
                window['removeEventListener']('hashchange', getLogAndCall, false);
            });
        } else {
            var oldHash = window['location']['hash'];
            ad.base.setInterval(function() {
                var newHash = window['location']['hash'];
                if (newHash !== oldHash) {
                    getLogAndCall();
                    oldHash = newHash;
                }
            }, 250);
        }
        getLogAndCall();    // first call
    }
    if (autoShowLogListener != null) {
        bindHashChange(function(log) {
            // autoShowLogListener(log);
            tabContainer.sendLog(log);
        });
    }
    tabContainer.sendLog('_PL_SHOWED');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

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
goog.require('ad.widget.business_app.AppDisplayer');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.Description');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Video');

goog.include('ad/impl/business_app/auto_show2.less');

goog.provide('ad.impl.business_app.AutoShow2');

ad.Debug(function() {
    baidu.dom.setStyles(document.getElementsByTagName('body')[0], {
        'margin': 0,
        'padding': 0
    });

    var imageOrVideo;

    /**
     * 所有与物料数据交互的api在此。
     * AD_CONFIG只包含了一些内部配置。
     * window['infoData']是开放给用户配置的，
     * 故build之后必须手动添加infoData的值
     */
    var data = (function() {
        var infoData = window['infoData'],
            cars = infoData['cars'],
            image,  // 图片轮播
            video,  // 视频播放器
            lastIndex = 0;;
        function createListener(title) {
            return function(index) {
                var as = baidu.dom.q('ad-widget-image-normal', imageNormal.getRoot())[0].children;
                if (lastIndex > -1) {
                    baidu.dom.removeClass(as[lastIndex].children[0], "ec-img-current");
                }
                baidu.dom.addClass(as[index].children[0], "ec-img-current");
                lastIndex = index;
                imageOrVideo.sendLog(
                    title + '_' +
                        data.getCarNameSecond() +
                        (typeof index !== 'undefined' ? ('_' + index) : '')
                );
            };
        };
        return {
            /*
            * 获取websiteLabel
            *
            * @return {Element}
            * */
            getWebsiteLabel: function() {
                var websiteLabel = baidu.dom.create('a');
                websiteLabel.innerHTML = '访问' + infoData['name'] +'官网';
                websiteLabel.target = '_blank';
                websiteLabel.href = infoData['url'];
                baidu.dom.addClass(websiteLabel, 'ad-widget-website-label');
                return websiteLabel;
            },
            /*
             * 获取websiteLabel
             *
             * @return {Element}
             * */
            getPlaceLabel: function() {
                var placeLabel = baidu.dom.create('label');
                placeLabel.innerHTML = infoData['place'];
                baidu.dom.addClass(placeLabel, 'ad-widget-place-label');
                return placeLabel;
            },
            /*
             * 获取websiteLabel
             *
             * @return {Element}
             * */
            getSelectLabel: function() {
                var selectLabel = baidu.dom.create('label');
                selectLabel.innerHTML = AD_CONFIG['select_label'];
                baidu.dom.addClass(selectLabel, 'ad-widget-select-label');
                return selectLabel;
            },
            /*
             * @param {DependencySelect} select
             * */
            patchSelectWidget: function(select) {
                var root =  baidu.dom.first(select.getRoot());
                // add website label
                baidu.dom.insertBefore(this.getWebsiteLabel(), root);
                //add place label
                baidu.dom.insertAfter(this.getPlaceLabel(), root);
                // add select label
                baidu.dom.insertBefore(this.getSelectLabel(), root);
                /**
                 * 设置选中的index
                 * @param {Number} index 索引.
                 */
                select.selectIndex = function(index) {
                    var me = this,
                        select_eles = baidu.g(me.getId('select-con')).getElementsByTagName('select');
                    select_eles[0].selectedIndex = index;
                    me.trigger(ui.events.CHANGE, me.getValues());
                };
                /**
                 * 获取选中的index
                 * @return {Number} index 索引.
                 */
                select.getSelectedIndex = function() {
                    var me = this,
                        select_eles = baidu.g(me.getId('select-con')).getElementsByTagName('select');
                    return select_eles[0].selectedIndex;
                }
            },
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
             * 获取displayer相关配置
             */
            getDisplayerConfig: function() {
                var displayer = infoData['displayer'];
                displayer['logo'] = infoData['logo'];
                displayer['intro'] = infoData['intro'];
                var bar = [];
                bar.push({'info': infoData['number']});
                bar.push({'info': infoData['place']});
                bar.push({'info': '访问' + infoData['name'] + '官网', 'rcv_url': infoData['url']});
                displayer['bar'] = bar;
                baidu.each(displayer.options, function(item) {
                    var infos = [],
                        car = cars[parseInt(item['target_index'], 10)];
                    infos.push({'name':'', 'desc_rcv_html':'<B>' + car['name'] + '</B>'});
                    infos.push({'name':'价格：', 'desc_rcv_html':'<font color="#ff8a00" style="font-weight:bold;" >' + car['price'] + '</font>'});
                    infos.push({'name':'类型：', 'desc_rcv_html':car['type']});
                    infos.push({'name':'级别：', 'desc_rcv_html':car['class']});
                    item['infos'] = infos;
                });
                return displayer;
            },

            /**
             * 获取image相关配置
             */
            getImageConfig: function(index) {
                index = index || 0;
                var img = {'options': []},
                    options = [],
                    pics = cars[index]['small_pics'];

                baidu.each(pics, function(pic) {
                    options.push({'img_url': pic});
                });
                img['options'] = options;
                return img;
            },
            /**
             * 获取select相关配置
             */
            getSelectConfig: function() {
                if (!("select" in infoData))
                {
                    var options = [],
                        car;
                    for (var i=0,l=cars.length; i<l; i++) {
                        car = cars[i];
                        options.push({
                            'value': i,
                            'text': car['name'] + " " + car['model']
                        });
                    }
                    infoData['select'] =  {
                        'data': options,
                        'dependency': [{name: 'car'}]
                    };
                }
                return infoData['select'];
            },
            /**
             * 获取第二个Tab选中的车型名字
             */
            getCarNameSecond: function() {
                return selectSecond.getValues()[0].text;
            },
            /**
             * 获取第三个Tab选中的车型名字
             */
            getCarNameThird: function() {
                return selectThird.getValues()[0].text;
            },
            /**
             * 获取图片轮播相关配置
             */
            getImageOrVideoConfig: function(index) {
                index = index || 0;
                var conf,
                    options = [],
                    car = cars[index];

                // 如果是视频
                if (car['video']) {
                    conf = AD_CONFIG['video'];
                    conf['img_url'] = conf['ipad_img'] = car['pic'];
                    conf['video_url'] = car['video'];
                    conf['isVideo'] = true;
                // 如果是一堆图片
                } else {
                    conf = {};
                    var pics = car['pics'],
                        pic;
                    for (var i=0,l=pics.length; i<l; i++) {
                        pic = pics[i];
                        options.push({
                            'image_url': pic,
                            'url': pic
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
                var price = ('fixed_price' in car) ? car['fixed_price'] : car['price'];
                return {
                    'title': car['name'] + '<br/>' + car['model'],
                    'infos': [
                        {'name': '价格：', 'desc_rcv_html': '<font color="#ff8a00" style="font-weight:bold;">' + price + '</font>'},
                        {'name': '类型：', 'desc_rcv_html': car['type']},
                        {'name': '级别：', 'desc_rcv_html': car['class']},
                        {'name': '亮点：', 'desc_rcv_html': car['intro']}
                    ],
                    'link': {
                        'title': '查看配置参数',
                        'text': '查看配置参数',
                        'rcv_url': 'javascript:void(0);'
                    }
                };
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
            },
            /**
             * 展示配置参数
             */
            showDetail: function (index) {
                var details = data.getDetailConfig(index),
                    html = '<ul class="ad-widget-detail">',
                    detail1,
                    detail2,
                    tmp;

                for (var i=0,l=details.length; i<l; i=i+2) {
                    detail1 = details[i];
                    detail2 = details[i+1];
                    tmp = i % 4;
                    html += '<li ' +
                        ((i === 0) ? 'class="ec-detail-first"' : '') +
                        '><b class="ec-detail-key">' +
                        detail1['key'] +
                        '：</b><span>' +
                        detail1['value'] +
                        '</span>' +
                        (detail2 ?
                            ('<b class="ec-detail-key">' + detail2['key'] + '：</b><span>' +
                                detail2['value'] + '</span>')
                            : '') +
                        '</li>';
                }
                html += '</ul>';
                var dom = baidu.dom.first(configureFrame.getRoot());
                dom.innerHTML = html;

                description.sendLog('查看配置参数');
                description.sendLog('查看配置参数_' + data.getCarNameThird());
        },
            /**
             * 设置图片或者视频的显示更新
             *
             * @param {number|string} index
             */
            setImageOrVideo: function (index) {
                var conf = data.getImageOrVideoConfig(index),
                    root = baidu.dom.first(imageOrVideoIframe.getRoot());
                lastIndex = 0;
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
                        /**
                         * 刷新
                         * @param {HTMLElement=} root 根节点.
                         * @param {Object=} data 配置数据.
                         */
                        image.refresh = function(root, data) {
                            ad.widget.ImageShowArrow.superClass.refresh.call(this, root, data);
                            this._index = 0;
                            this._slideCount = this._data['options'].length;
                            var parent = baidu.dom.first(this.getRoot());
                            this.spanRight = baidu.dom.create("span");
                            this.spanLeft = baidu.dom.create("span");

                            baidu.dom.addClass(this.spanRight, "ec-mask-right");
                            baidu.dom.addClass(this.spanLeft, "ec-mask-left");
                            parent.appendChild(this.spanRight);
                            parent.appendChild(this.spanLeft);
                        };
                        image.bindEvent = function() {
                            ad.widget.ImageShowArrow.prototype.bindEvent.call(this);
                            var me = this,
                                right = this.getId('link-right'),
                                left = this.getId('link-left');
                            baidu.on(baidu.dom.first(this.getRoot()), 'click', function(opt) {
                                var evt = window.event || opt,
                                    element = evt.target || evt.srcElement;
                                if (element.nodeType === 1 && element.nodeName.toUpperCase() === 'IMG') {
                                    baidu.event.preventDefault(evt);
                                }
                            });
                            baidu.on(right, "mouseover", function() {
                                baidu.dom.addClass(me.spanRight, "ec-mask-hover");
                            });
                            baidu.on(right, "mouseout", function() {
                                baidu.dom.removeClass(me.spanRight, "ec-mask-hover");
                            });
                            baidu.on(left, "mouseover", function() {
                                baidu.dom.addClass(me.spanLeft, "ec-mask-hover");
                            });
                            baidu.on(left, "mouseout", function() {
                                baidu.dom.removeClass(me.spanLeft, "ec-mask-hover");
                            });
                        };
                        /**
                         * @overwrite
                         */
                        image._nextSlide = function() {
                            this._gotoSlide((this._index + 1) % (this._slideCount));
                        };

                        /**
                         * @overwrite
                         */
                        image._prevSlide = function() {
                            this._gotoSlide((this._index - 1 + this._slideCount) % (this._slideCount));
                        };
                        /**
                         * @overwrite
                         */
                        image._gotoSlide = function(index) {
                            baidu.hide(this.getId('img-' + this._index));
                            baidu.show(this.getId('img-' + index));
                            this._index = index;
                            this.trigger(ui.events.SHOWED_IMAGE_CHANGE, index);
                        };
                        tabContainer.handleWidgetEvent(image);
                    }
                    imageOrVideo = image;
                    var as = baidu.dom.q('ad-widget-image-normal', imageNormal.getRoot())[0].children;
                    baidu.dom.addClass(as[0].children[0], "ec-img-current");
                }
                imageOrVideo.refresh(root, conf);
            }
        };
    })();
    // 设置页面高度
    function setIframeHeight(height) {
        var app = ad.base.getObjectByName('baidu.app');
        if (app && app['setHeight']) {
            app['setHeight'](height);
        }
    }

    if (!data.fromAppList()) {
        // 设置默认列表页的iframe高度
        setIframeHeight(405);   // 456
    }
    var firstTab = new ad.widget.business_app.AppDisplayer(data.getDisplayerConfig());

    var selectSecond = new ad.widget.DependencySelect(data.getSelectConfig()),
        imageOrVideoIframe = new ad.widget.Iframe({}),
        imageNormal = new ad.widget.ImageNormal(data.getImageConfig()),
        description = new ad.widget.Description(data.getDesciptionConfig()),
        secondTab = new ad.widget.NormalContainer({});
    imageNormal.addListener(ui.events.CLICK, function(index, e) {
        imageOrVideo._gotoSlide(index);
        imageOrVideo.trigger(ui.events.ARROW_LEFT, imageOrVideo._index);
        e = window.event || e;
        baidu.event.preventDefault(e);
    });
    secondTab.setWidgets([
        selectSecond,
        [imageOrVideoIframe, imageNormal],
        description
    ]);


    var selectThird = new ad.widget.DependencySelect(data.getSelectConfig()),
        configureFrame = new ad.widget.Iframe({}),
        thirdTab = new ad.widget.NormalContainer({});
    thirdTab.setWidgets([
        selectThird,
        configureFrame
    ]);

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']),
        material = new ad.Material(data.getID());
    tabContainer.setWidgets([
        firstTab,
        secondTab,
        thirdTab
    ]);

    material.setWidgets(
        [tabContainer]
    );
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    // bind displayer click event
    firstTab.addListener(ui.events.CLICK, function(opt) {
        tabContainer.switchTab(1);
        selectSecond.selectIndex(opt['target_index']);
    });
    // bind select change event
    selectSecond.addListener(ui.events.CHANGE, function(value) {
        var index = parseInt(value[0]['value'], 10);
        selectSecond.sendLog('选择车型');
        selectSecond.sendLog('选择车型_' + data.getCarNameSecond());
        imageNormal.setData(data.getImageConfig(index));
        imageNormal.refresh();
        data.setImageOrVideo(index);
        description.setData(data.getDesciptionConfig(index));
        description.refresh();

    });
    selectThird.addListener(ui.events.CHANGE, function(value) {
        var index = parseInt(value[0]['value'], 10);
        selectThird.sendLog('选择车型');
        selectThird.sendLog('选择车型_' + data.getCarNameThird());
        data.showDetail(index);
    });

    tabContainer.addListener(ui.events.TAB_CHANGE, function(index) {
        if (index === 0) {
            setIframeHeight(405);
        }
        else if (index === 1 ) {
            setIframeHeight(385);
            if (secondTab.inited === true)  return;
            selectSecond.show();  // for IE6
            // show image or video
            baidu.dom.addClass(baidu.dom.first(imageOrVideoIframe.getRoot()), 'ad-widget-iframe-image-or-video');
            data.setImageOrVideo(0);
            baidu.event.on(imageOrVideoIframe.getRoot(), 'click', function(e) {
                var t = baidu.event.getTarget(e);
                var nodeName = t.nodeName.toLowerCase();
                if (nodeName === 'img' || nodeName === 'a') {
                    imageOrVideo.sendLog('点击查看大图');
                    imageOrVideo.sendLog('点击查看大图_' + data.getCarNameSecond());
                }
            });
            baidu.event.on(description.getRoot(), "click", function(e) {
                var t = baidu.event.getTarget(e);
                var nodeName = t.nodeName.toLowerCase();
                if (nodeName === 'a') {
                    tabContainer.switchTab(2);
                    selectThird.selectIndex(selectSecond.getSelectedIndex());
                }
            });
            data.patchSelectWidget(selectSecond);
            secondTab.inited = true;
        }
        else if(index === 2 ) {
            setIframeHeight(385);
            if (thirdTab.inited === true) return;
            selectThird.show();  // for IE6
            data.patchSelectWidget(selectThird);
            data.showDetail();
            thirdTab.inited = true;
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

    tabContainer.sendLog('_PL_SHOWED');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

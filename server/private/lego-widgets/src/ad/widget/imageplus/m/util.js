/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/m/util.js ~ 2014/09/04 14:26:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/
goog.require('ui.events');
goog.require('ad.crypt.AntiCk');
goog.require('ad.widget.FixedIsolatedWidgetContainer');

goog.provide('ad.widget.imageplus.m.util');

ad.widget.imageplus.m.util = {
    /**
     * 将data中的encry_url和target_url生成real_url，优先使用target_url
     *
     * @param {Object} data ad_config数据.
     */
    updateRealUrl: function (data) {
        data['real_url'] = data['target_url'] || (data['encry_url'] + '&actionid=2&attach=0');

        var adlist;
        if ((adlist = data['adlist']) && (adlist.length > 0)) {
            baidu.array.each(adlist, function (adConfig, index) {
                adConfig['real_url'] = adConfig['target_url'] || data['real_url'];
            });
        }
    },
    /**
     * 设置日志发送相关的事件
     * 如果数据有target_url，则使用发送log；如果没有则使用encry_url为链接地址。
     * 对于这两种情况都需要在后面附加点击事件的相关信息，使用的是attach字段。
     * 格式如下：
     *      &attach=type|stayTime|hoverTimes
     *          type为链接位置，icon的点击为1，其他点击为0
     *          stayTime为在点击动作前在广告上停留的时间
     *          hoverTimes为鼠标hover的次数（不包含点击的那次）
     *              如果是直接点击则它为0
     * 设置icon为mouseover 0.2s之后才可以点击，时间可以通过delay_time来配置
     *
     * @param {ad.widget.FixedIsolatedWidgetContainer} box .
     * @param {function():string} calcTimeQuery 计算时间query，例如："|1.4|1".
     * @param {boolean=} opt_notAllLinkIsolated 是否有可能链接在iframe外面
     *                                          例如：icon样式在iframe外面也有点击地方
     */
    setupLog: function (box, calcTimeQuery, opt_notAllLinkIsolated) {
        var me = box;
        var root = me.getRoot();
        if (!root) {
            return;
        }

        if (opt_notAllLinkIsolated) {
            ad.widget.imageplus.m.util._bindLogEvent(root, box, calcTimeQuery);
        }

        box.afterLoaded(function (isolatedRoot) {
            ad.widget.imageplus.m.util._bindLogEvent(isolatedRoot, box, calcTimeQuery);
        });

        // 绑定heatmap相关事件
        ad.widget.imageplus.m.util._bindHeatMap(root, box);
    },
    /**
     * 设置日志发送相关事件的帮助方法，被setupLog调用
     *
     * @param {Element} root 根元素也有可能是iframe的body.
     * @param {ad.widget.WidgetContainer} box .
     * @param {function():string} calcTimeQuery 计算时间query，例如："|1.4|1".
     */
    _bindLogEvent: function (root, box, calcTimeQuery) {
        var adlist = box.getData('adlist');
        if (adlist && adlist.length && adlist[0]['target_url']
            || box.getData('target_url')
        ) {
            // 设置ck域
            if (!box.getData('box.no_ck')) {
                baidu.array.each(
                    root.getElementsByTagName('a'),
                    function (link) {
                        link = /** @type {Element} */(link);
                        var mid;
                        if (link.href.indexOf('http') === 0
                            && !baidu.dom.hasAttr(link, 'data-ignore')
                            && (mid = parseInt(baidu.dom.getAttr(link, 'data-mid'), 10))) {
                            return new ad.crypt.AntiCk(link, mid);
                        }
                    });
            }
            // 如果有target_url则绑定icon的click事件
            // 来发送日志到encry_url上，并在日志上加鼠标停留时间
            baidu.on(root, 'click', function (e) {
                var target = baidu.event.getTarget(e);
                while (target && target.nodeName !== 'A' && baidu.dom.contains(root, target)) {
                    target = target.parentNode;
                }

                if (root === target
                    || !baidu.dom.contains(root, target)
                    || baidu.dom.hasAttr(target, 'data-ignore')) {
                    // 没有找到含有data-log属性的元素
                    return;
                }

                var log = baidu.getAttr(target, 'data-log') || 2;
                var attach = baidu.getAttr(target, 'data-attach') || 0;

                // 尽管EventDispatcher支持传多个参数
                // 但是widget_container只能处理一个参数...
                box.trigger(ui.events.SEND_LOG, {
                    'actionid': parseInt(log, 10),
                    'attach': attach + calcTimeQuery()
                });
            });
        }
        else {
            // 如果没有target_url，则在链接元素的地址上加鼠标停留时间

            /**
             * 在点击之前为链接附加上鼠标停留时间
             *
             * @param {Event} e event;
             */
            var changeHrefAttach = function (e) {
                var element = baidu.event.getTarget(e);
                // 找到链接地址
                while (element && element.nodeName !== 'A') {
                    element = element.parentNode;
                }
                if (!element || !baidu.getAttr(element, 'data-log')) {
                    // 确保有data-log
                    return;
                }

                var url = element.href;
                if (url) {
                    // 替换attach
                    element.href = url.replace(
                        /&attach=([^|]+)(?:\|[^$&]*)?$/,
                        function (all, $1) {
                            return '&attach=' + $1 + calcTimeQuery();
                        }
                    );
                }
            };
            baidu.on(root, 'mousedown', changeHrefAttach);
            baidu.on(root, 'mouseup', changeHrefAttach);
        }
    },
    /**
     * 绑定heatMap的处理事件
     *
     * @param {Element} root 广告根元素
     * @param {ad.widget.FixedIsolatedWidgetContainer} box box实例
     */
    _bindHeatMap: function (root, box) {
        if (!COMPILED) {
            return;
        }

        if (!box.getAdRect) {
            return;
        }

        /**
         * @type {ad.plugin.imageplus.ILoaderApi}
         */
        var loaderApi = box.getData('api');

        /**
         * 创建click监听函数
         * @param {Element=} opt_iframe iframe元素
         */
        var makeClickListener = function (opt_iframe) {
            return function (event) {
                var query = ad.widget.imageplus.m.util._getClickPosQuery(
                    event, box.getAdRect(), loaderApi.getImgRect(), opt_iframe
                );

                box.trigger(ui.events.SEND_LOG, {
                    'actionid': 10,
                    'attach': 'click_' + (loaderApi.getRenderId() || '') + '_' + query
                });
            };
        };

        // 外部元素绑定click事件
        ad.event.on(root, 'click', makeClickListener());
        // iframe内部元素绑定click事件
        box.afterLoaded(function (isolatedRoot) {
            if (!box._isolatedIframe) {
                return;
            }

            // 是iframe的情况要监听iframe内部的点击
            ad.event.on(isolatedRoot, 'click', makeClickListener(box._isolatedIframe));
        });
    },
    /**
     * 获取点击的位置query
     *
     * @param {Object} event .
     * @param {Object} adRect .
     * @param {Object} imgRect .
     * @param {Element=} opt_iframe .
     * @return {string} 返回格式:
     *  'clickTop_clickLeft_adTop_adLeft_adWidth_adHeight_imgWidth_imgHeight'
     */
    _getClickPosQuery: function (event, adRect, imgRect, opt_iframe) {
        var x = event.clientX;
        var y = event.clientY;
        var realX;
        var realY;
        if (opt_iframe) {
            // 在iframe中时x,y即是相对广告的位置
            var iframeRect = ad.dom.getRect(opt_iframe);
            realX = iframeRect['left'] + x;
            realY = iframeRect['top'] + y;
        }
        else {
            var top = baidu.page.getScrollTop();
            var left = baidu.page.getScrollLeft();
            realX = left + x;
            realY = top + y;
        }

        var relativeX = realX - imgRect['left'];
        var relativeY = realY - imgRect['top'];

        return [
            relativeX, relativeY,
            adRect['left'] - imgRect['left'],
            adRect['top'] - imgRect['top'],
            adRect['width'], adRect['height'],
            imgRect['width'], imgRect['height']
        ].join('_');
    },
    /**
     * 设置背景透明度，默认为黑色
     *
     * @param {Element} element .
     * @param {number} opacity .
     */
    bgOpacity: function (element, opacity) {
        var hexOpacity = parseInt(opacity * 255, 10).toString(16);
        if (hexOpacity.length < 2) {
            hexOpacity = '0' + hexOpacity;
        }

        if (baidu.ie && baidu.ie < 9) {
            var value = baidu.format(
                'progid:DXImageTransform.Microsoft.gradient(startColorstr=#{0}000000,endColorstr=#{0}000000)',
                hexOpacity
            );
            baidu.dom.setStyles(element, {
                'filter': value,
                'msFilter': value
            });
        }
        else {
            baidu.dom.setStyle(element, 'background', 'rgba(0, 0, 0, ' + opacity + ')');
        }
    }
};

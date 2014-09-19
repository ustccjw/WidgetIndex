/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: util.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/util.js ~ 2014/03/06 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * 这段发日志的逻辑估计快要没人能看懂了，业务太奇葩了
 **/
goog.require('ui.events');
goog.require('ad.widget.WidgetContainer');

goog.provide('ad.widget.imageplus.util');

ad.widget.imageplus.util = {
    /**
     * 更新icon的配置
     * 根据行业id，变成对应的行业字符串
     *
     * @param {Object} data ad_config数据.
     */
    updateIconConfig: function (data) {
        var tradeMap = {
            // 0: 'default',   // trade_id为0或不存在表示默认样式
            1: 'medical',      // 医疗
            2: 'tourism',      // 旅游
            3: 'machine',      // 机械设备
            4: 'photo',        // 婚纱摄影
            5: 'decoration',   // 家装
            6: 'game'          // 游戏
        };

        // 根据行业id，生成对应的icon class
        var tradeId = data['trade_id'];
        data['trade_id'] = tradeMap[tradeId] || 'default';
    },
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
     * @param {ad.widget.WidgetContainer} box .
     * @param {function():string} calcTimeQuery 计算时间query，例如："|1.4|1".
     */
    setupLog: function (box, calcTimeQuery) {
        var me = box;
        var root = me.getRoot();
        if (!root) {
            return;
        }
        ad.widget.imageplus.util._bindLogEvent(root, box, calcTimeQuery);

        baidu.array.each(
            root.getElementsByTagName('iframe'),
            function (iframe) {
                if (me.getData('box.third_party_content', false)) {
                    // 展现内容由第三方提供
                    // 故没有data-log之类的标记
                    // 只要是a标签点击就会发送日志
                    // 因为第三方内容会重新触发iframe load，并且body会替换
                    box.addListener(ui.events.LOAD, function (doc) {
                        doc = doc || iframe.contentDocument || iframe.contentWindow.document;
                        baidu.on(doc.body, 'click', function (e) {
                            var target = baidu.event.getTarget(e);
                            while (target && target.nodeName !== 'A') {
                                target = target.parentNode;
                            }
                            if (target) {
                                box.trigger(ui.events.SEND_LOG, {
                                    'actionid': 2,
                                    'attach': 0 + calcTimeQuery()
                                });
                            }
                        });
                    });
                }
                else {
                    var doc = iframe.contentDocument || iframe.contentWindow.document;
                    // 这是widget生成的html放在了iframe里面
                    ad.widget.imageplus.util._bindLogEvent(doc.body, box, calcTimeQuery);
                }
            }
        );
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
            // 如果有target_url则绑定icon的click事件
            // 来发送日志到encry_url上，并在日志上加鼠标停留时间
            baidu.on(root, 'click', function (e) {
                var target = baidu.event.getTarget(e);
                while (baidu.dom.contains(root, target) && !baidu.getAttr(target, 'data-log')) {
                    target = target.parentNode;
                }

                if (!baidu.dom.contains(root, target)) {
                    // 没有找到含有data-log属性的元素
                    return;
                }

                var log = baidu.getAttr(target, 'data-log');
                if (log) {
                    var attach = baidu.getAttr(target, 'data-attach');
                    if (attach + '' === '1' && !box._canClick) {
                        // 如果是icon且延迟点击，那么不发送日志
                        return;
                    }

                    // 尽管EventDispatcher支持传多个参数
                    // 但是widget_container只能处理一个参数...
                    box.trigger(ui.events.SEND_LOG, {
                        'actionid': parseInt(log, 10),
                        'attach': (attach || 0) + calcTimeQuery()
                    });
                }
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
    }
};

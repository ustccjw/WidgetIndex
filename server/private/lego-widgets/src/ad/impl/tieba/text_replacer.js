/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/text_replacer.js ~ 2013/06/05 14:41:51
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * text_replacer相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.Debug');
goog.require('ad.widget.tieba.Hovercard');
goog.require('app.log.send');

goog.include('ad/impl/tieba/text_replacer.less');

goog.provide('ad.impl.tieba.TextReplacer');

// baidu.event._eventFilter.mouseenter;
// baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 */
ad.impl.tieba.TextReplacer = function() {

    /**
     * 不进行处理的元素类型
     * @type {Array.<string>}
     * @private
     */
    this._skipTags = ['A'];

    /**
     * 存放迭代中间过程的临时文本
     * @type {string}
     * @private
     */
    this._post = '';

    /**
     * 存放本页内容中的贴子/楼中楼文本
     * @type {?Array.<Object>}
     * @private
     */
    this._texts = null;

    /**
     * 处理文本内容的服务端URL
     * @type {string}
     * @private
     */
    this._requestUrl = 'http://tieba.baidu.com/com/brand';

    /**
     * 浮层模块
     * @type {ad.widget.Widget}
     * @private
     */
    this._card;

    /**
     * 当前触发浮层的链接
     * @type {HTMLElement?}
     * @private
     */
    this._cardLink;

    /**
     * 浮层模块容器
     * @type {Element?}
     * @private
     */
    this._cardContainer;

    /**
     * 浮层是否处于打开状态
     * @type {boolean}
     * @private
     */
    this._isCardShown = false;

    /**
     * 实验分组
     * @type {number}
     * @private
     */
    this._group;

    /**
     * 浮层显示计时
     * @type {number}
     * @private
     */
    this._timer;

    /**
     * 浮层消失计时器
     * @type {number}
     * @private
     */
    this._closeTimer;

    /**
     * 样式ID
     * @type {string}
     * @private
     */
    this._styleId;

    /**
     * 日志请求地址配置
     * @type {Object}
     * @private
     */
    this._logConfig = {
        'mkt': {
            'tpl': {
                'click': 'http://click.hm.baidu.com/clk?${linkId}',
                'impression': 'http://click.hm.baidu.com/mkt.gif?ai=${adId}&et=0&rnd=${rnd}',
                'timer': 'http://click.hm.baidu.com/mkt.gif?ai=${adId}&et=3&ep=1*${data}&rnd=${rnd}'
            },
            'click': {
                '1': {
                    'keyword': '66b2f252fd42eba4a5100f32b96a1878',
                    'banner': '5c960d2597d49fc7c0661c271c71274c'
                },
                '2': {
                    'keyword': 'a127b035107831d994fdfa0d6adea7e7',
                    'logo': '5edf03e7127ba16b31f7b5ecf9941fe8',
                    'name': '8ca791dffa8cfc0670df15c3cd489e04',
                    'post': 'f9a94d0e14d70976eb5a0df4aa073c00',
                    'label': '0199e3fa6b0146fb5c0d26643c4de2ef'
                },
                '3': {
                    'keyword': '788bbb6ae0d4a80ee3d8c998b7674af8',
                    'logo': '765a9e0904533d7bc9fd714d0da92ed3',
                    'name': 'e8c4b59dc61e84f0e404ce9bc16a3d41',
                    'post': '839d5d607d7bbe7062666dff6028e7fd',
                    'label': '2c9a27a9d6b7aa1bd5ade4af1c726158',
                    'banner': '47c9ff3e462efc1fdcacc99b02b2d89b'
                },
                '4': {
                    'keyword': 'a86a5236a752942db0b42e318b5d35dd'
                }
            },
            'impression': {
                '1': {
                    'keyword': '66b2f252fd42eba4a5100f32b96a1878',
                    'banner': '01fee6effdf64642c668ca9c1cb18c20'
                },
                '2': {
                    'keyword': '6853608a0b5f37da77dc5ee178a23b62',
                    'card': '5edf03e7127ba16b31f7b5ecf9941fe8'
                },
                '3': {
                    'keyword': '1146c3169ea1147d2eeb43b664415a17',
                    'card': '765a9e0904533d7bc9fd714d0da92ed3',
                    'banner': 'a8e67c713b31539c1275c4a722ca3391'
                },
                '4': {
                    'keyword': 'a86a5236a752942db0b42e318b5d35dd'
                }
            },
            'timer': {
                '2': '5edf03e7127ba16b31f7b5ecf9941fe8',
                '3': '765a9e0904533d7bc9fd714d0da92ed3'
            }
        },
        'rcv': {
            'url': 'http://bzclk.baidu.com/microbrand.php'
        }
    };

};
baidu.addSingletonGetter(ad.impl.tieba.TextReplacer);

/**
 * 将array-like的对象转换为数组（这里主要用来将NodeList转为Array）
 * @param {Object} arrayish 类数组的对象
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._toArray = function(arrayish) {
    var array = [];
    for (var i = 0, j = arrayish.length; i < j; i++) {
        array.push(arrayish[i]);
    }
    return array;
};

/**
 * 读取某个节点去除头尾空白后的值
 * @param {Node} node 需要处理的节点
 * @return {string} 去除空白后的值
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._getTextValue = function(node) {
    return ad.string.trim(node.nodeValue);
};

/**
 * 递归访问某节点，并运行处理函数（会跳过A元素）
 * @param {Node} node 要访问的DOM节点
 * @param {function(Node)} callback 遇到文本节点时需要调用的处理函数
 * @param {...} opt_args 回调函数的参数
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._visitNode = function(node, callback, opt_args) {
    var me = this;
    var xArgs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    var children = me._toArray(node.childNodes);

    for (var i = 0, j = children.length; i < j; i++) {
        var child = children[i];
        var nodeType = child.nodeType;

        if (nodeType === 1) { // Element
            if (baidu.array.contains(me._skipTags, child.nodeName)) {
                continue;
            }
            me._visitNode.apply(me, [child, callback].concat(xArgs || []));
        }
        else if (nodeType === 3 && me._getTextValue(child) !== '') { // Non-empty text
            if (typeof callback === 'function') {
                callback.apply(me, [child].concat(xArgs || []));
            }
        }
    }
};

/**
 * 处理节点时将节点文本追加到临时文本上
 * @param {Node} node 要处理的DOM节点
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._appendText = function(node) {
    this._post += this._getTextValue(node);
};

/**
 * 处理节点时将部分文本根据给定的链接数据替换为链接
 * @param {Node} node 要处理的DOM节点
 * @param {Array.<Object>} links 需要替换为链接的数据
 * @param {Object} ads 广告数据
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._replaceTextNode = function(node, links, ads) {
    var me = this;
    var group = ads['group'];
    var post = me._post;
    var text = me._getTextValue(node);
    var textEnd = post.length + text.length;
    var html = '';
    var cursor = 0;
    var matched = false;
    var material;

    for (var i = 0, j = links.length; i < j; i++) {
        var link = links[i];
        var linkStart = link['start'] - post.length;
        var linkEnd = link['end'] - post.length;

        if (linkStart >= cursor && linkEnd <= textEnd) {
            // only replace when both offsets lie in current node
            var linkText = text.substring(linkStart, linkEnd);

            html += text.substring(cursor, linkStart);

            if (group !== 1 && group !== 4) {
                material = ads['materials'][link['mid']];
            }
            html += '<a class="ad-text-replacer-link" href="' + link['url'];
            if (material) {
                html += '" data-mid="' + link['mid'];
            }
            html += '" data-link-name="keyword" target="_blank">' + linkText + '</a>';

            cursor = linkEnd;
            matched = true;
        }
    }

    // if the node matched link offsets, replace it with new nodes
    if (matched) {
        html += text.substring(cursor);

        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        var children = me._toArray(wrapper.childNodes);
        
        for (var m = 0, n = children.length; m < n; m++) {
            var child = children[m];
            node.parentNode.insertBefore(child, node);
        }

        node.parentNode.removeChild(node);
        wrapper = null;
    }

    me._post += text;
};

/**
 * 递归访问某节点，并运行处理函数，并返回递归完成后文本的处理结果
 * @param {Node} root 要访问的DOM节点
 * @param {function(Node, ...)} callback 遇到文本节点时需要调用的处理函数
 * @param {...} opt_args 回调函数的参数
 * @return {string} 递归结束后得到的文本结果
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._iterateText = function(root, callback, opt_args) {
    var me = this;
    var post = '';
    var xArgs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;

    if (baidu.lang.isFunction(callback)) {
        me._post = '';
        me._visitNode.apply(me, [root, baidu.fn.bind(callback, me)].concat(xArgs || []));
        post = me._post;
        me._post = '';
    }

    return post;
};

/**
 * 读取某个节点下的全部文本
 * @param {Node} root 需要处理的节点
 * @return {string} 节点下的文本
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._getText = function(root) {
    var me = this;

    return me._iterateText(root, me._appendText);
};

/**
 * 读取当前页贴吧信息（贴吧名称、贴子标题）
 * @return {Object} 
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._getTiebaInfo = function() {
    var info = {};
    var pageData = window['PageData'];
    if (pageData) {
        info.name = pageData['forum_name'] || '';
        info.threadTitle = pageData['thread']['title'] || '';
    }
    return info;
};

/**
 * 读取当前页所有贴子和楼中楼的文本数据
 * @return {Object} 
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._getTextItems = function() {
    var me = this;

    if (me._textItems) {
        return me._textItems;
    }

    var postClass = 'j_d_post_content';
    var commentClass = 'lzl_content_main';

    me._textItems = [];
    //get posts and comments
    var elems = baidu.q(postClass).concat(baidu.q(commentClass));
    for (var i = 0, j = elems.length; i < j; i++) {
        var elem = elems[i];
        var text = me._getText(elem);

        var type;
        var id;
        if (baidu.dom.hasClass(elem, postClass)) { //is post
            type = 'post';
            id = elem.id.split('post_content_')[1] || '';
        }
        else { //is comment
            type = 'comment';
            var a = baidu.q('l_post_anchor', elem.parentNode.parentNode)[0];
            id = a.name;
        }
        me._textItems.push({
            id: id,
            text: text,
            type: type
        });
    }

    return me._textItems;
};

/**
 * 从服务端获取当前页面所有文本中需要替换链接的广告数据
 * @param {function(Object)} callback 获取数据后执行的回调函数
 */
ad.impl.tieba.TextReplacer.prototype.getAdData = function(callback) {
    var me = this;

    var tiebaInfo = me._getTiebaInfo();

    baidu.ajax.request(me._requestUrl, {
        'method': 'POST',
        'data': 'tiebaName=' + encodeURIComponent(tiebaInfo.name)
              + '&threadTitle=' + encodeURIComponent(tiebaInfo.threadTitle)
              + '&textJson=' + encodeURIComponent(baidu.json.stringify(me._getTextItems())),
        'onsuccess': function(xhr, responseText) {
            if (baidu.lang.isFunction(callback)) {
                var ads = baidu.json.parse(responseText);
                callback(ads);
            }
        }
        // FIXME: test only
        // ,"onfailure": function() {
        //     var ads = {
        //         "group": 3,
        //         "banner": {
        //             "url": "http://10.65.7.31:8080/brand.php?t=image",
        //             "src": "http://bs.baidu.com/adtest/77a8e859c0221c270ae67963c14229c3.jpg"
        //         },
        //         "links": {
        //             "33452339967": [
        //                 {
        //                     "start": "1",
        //                     "end": "4",
        //                     "url": "http://10.65.7.31:8080/brand.php?t=link1",
        //                     "mid": "123"
        //                 },
        //                 {
        //                     "start": "9",
        //                     "end": "13",
        //                     "url": "http://10.65.7.31:8080/brand.php?t=link2",
        //                     "mid": "234"
        //                 }
        //             ],
        //             "33460579448": [
        //                 {
        //                     "start": "80",
        //                     "end": "82",
        //                     "url": "http://10.65.7.31:8080/brand.php?t=link3",
        //                     "mid": "234"
        //                 }
        //             ]
        //         },
        //         "materials": {
        //             "123": {
        //                 "url": "http://10.65.7.31:8080/brand.php?t=oppo",
        //                 "title": "到OPPO官方贴吧讨论智能手机",
        //                 "name": "OPPO吧",
        //                 "logo": "http://bs.baidu.com/adtest/f5dc01fccf423671bfc85583a3b36ad7.jpg",
        //                 "desc": "OPPO Find 5为5吋不只是配置威武！",
        //                 "member": "小欧",
        //                 "member_url": "http://tieba.baidu.com/f/like/manage/list?kw=oppo",
        //                 "member_num": 12345,
        //                 "posts": [
        //                     {
        //                         "title": "OPPO Find 5旗舰四核 1080P超级屏",
        //                         "url": "http://10.65.7.31:8080/brand.php?t=oppo1"
        //                     },
        //                     {
        //                         "title": "致美贴心，OPPO全国售后服务网点",
        //                         "url": "http://10.65.7.31:8080/brand.php?t=oppo2"
        //                     }
        //                 ]
        //             },
        //             "234": {
        //                 "url": "http://10.65.7.31:8080/brand.php?t=pingan",
        //                 "title": "到平安集团官方吧进行讨论",
        //                 "name": "平安集团官方吧",
        //                 "logo": "http://bs.baidu.com/adtest/b772cc1e7e17339b99108ee2576df0a6.jpg",
        //                 "desc": "平安平安平安平安平安平安",
        //                 "member": "会员",
        //                 "member_url": "http://tieba.baidu.com/f/like/manage/list?kw=%C6%BD%B0%B2%BC%AF%CD%C5",
        //                 "member_num": 2012,
        //                 "posts": [
        //                     {
        //                         "title": "这个吧里有喜欢平安的吧友吗？",
        //                         "url": "http://10.65.7.31:8080/brand.php?t=pingan1"
        //                     },
        //                     {
        //                         "title": "声动中国 微笑传平安",
        //                         "url": "http://10.65.7.31:8080/brand.php?t=pingan2"
        //                     }
        //                 ]
        //             }
        //         }
        //     };
        //     callback(ads);
        // }
    });
};

/**
 * 获取离指定元素最近的指定的标签名的元素
 * @param {Node} sourceElement 寻找标签的起始元素
 * @param {string} tagName 要寻找的标签名
 * @return {?Node} 找到的元素
 */
ad.impl.tieba.TextReplacer.prototype._findNearestTag = function(sourceElement, tagName) {
    var ele = sourceElement;
    tagName = tagName.toLowerCase();
    while(ele
        && ele.nodeName.toLowerCase() !== tagName
        && ele !== document.body
    ) {
        ele = ele.parentNode;
    }
    if (ele && ele.nodeName.toLowerCase() === tagName) {
        return ele;
    }
    else {
        return null;
    }
};

/**
 * 在当前页面下的文本节点中注入广告
 */
ad.impl.tieba.TextReplacer.prototype.injectAd = function() {
    var me = this;

    me._createStyles();

    me.getAdData(function(ads) {
        var group = me._group = ads['group'];
        var links = ads['links'];
        var materials = ads['materials'];
        // patch material object with additional id
        baidu.object.each(materials, function(value, key) {
            value['id'] = key;
        });

        var textItems = me._textItems;
        for (var i = 0, j = textItems.length; i < j; i++) {
            var item = textItems[i];
            if (!links[item.id]) {
                continue;
            }
            var elem;
            if (item.type === 'post') {
                elem = baidu.g('post_content_' + item.id);
            }
            else {
                var a = document.getElementsByName(item.id)[0];
                if (a) {
                    elem = baidu.q('lzl_content_main', a.parentNode)[0];
                }
            }
            elem && me._iterateText(elem, me._replaceTextNode, links[item.id], ads);
        }

        var linkCount = 0;
        baidu.object.each(links, function(value, key) {
            linkCount += (value.length || 0);
        });

        if (linkCount) { //链接数大于0时才记录划词展现
            me.log({
                'type': 'impression',
                'group': group,
                'name': 'keyword',
                'keywords': linkCount,
                'posts': textItems.length
            });
        }

        var main = baidu.g('j_p_postlist');

        var handleMousedown = function(e) {
            e = e || window['event'];
            var target = e.target || e.srcElement;
            target = me._findNearestTag(target, 'A');
            if (!target) {
                return;
            }
            var name = target.getAttribute('data-link-name');
            if (name) {
                var url = target.getAttribute('data-url');
                if (!url) {
                    target.setAttribute('data-url', target.href);
                    var attach = encodeURIComponent('name=' + encodeURIComponent(name));
                    target.href += '&actionid=2&attach=' + attach;
                }
            }
        };
        var handleClick = function(e) {
            e = e || window['event'];
            var target = e.target || e.srcElement;
            target = me._findNearestTag(target, 'A');
            if (!target) {
                return;
            }

            var name = target.getAttribute('data-link-name');
            if (name) {
                me.log({
                    'url': me._getRcvUrl(target),
                    'group': group,
                    'type': 'click',
                    'name': name
                });
                me.hideHovercard();
            }
        };
        baidu.on(main, 'mousedown', handleMousedown);
        baidu.on(main, 'click', handleClick);
        if (group !== 1 && group !== 4) { //实验分组1/4没有浮层
            baidu.on(main, 'mouseover', function(e) {
                e = e || window['event'];
                var target = e.target || e.srcElement;
                var mid = target.getAttribute('data-mid');

                if (target.nodeName === 'A' && mid) {
                    if (me._cardLink !== target) {
                        me._cardLink = target;

                        me.showHovercard(target, materials[mid]);
                    }
                }
            });

            me._initCardContainer();
            baidu.on(me._cardContainer, 'mousedown', handleMousedown);
            baidu.on(me._cardContainer, 'click', handleClick);
        }
        if (group !== 2 && group !== 4) { //实验分组2/4不替换banner
            var bannerElem = baidu.q('l_banner')[0];
            bannerElem.style.width = '980px';
            var banner = ads['banner'];
            if (bannerElem && banner && banner['url'] && banner['src']) {
                bannerElem.innerHTML = '<a href="' + banner['url']
                    + '&actionid=2&attach=" class="ad-text-replacer-banner"'
                    + ' data-link-name="banner" target="_blank">'
                    + '<img src="' + banner['src'] + '"></a>';
                me.log({
                    'url': banner['url'],
                    'group': group,
                    'type': 'impression',
                    'name': 'banner'
                });
                baidu.on(
                    baidu.q('ad-text-replacer-banner', bannerElem)[0],
                    'click', function() {
                        me.log({
                            'group': group,
                            'type': 'click',
                            'name': 'banner'
                        });
                    }
                );
            }
        }
    });

};

/**
 * 初始化浮层容器
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._initCardContainer = function() {
    var me = this;

    me._cardContainer = document.createElement('div');
    baidu.dom.setStyles(
        me._cardContainer,
        {
            position: 'absolute',
            top: '-999px',
            left: '-999px',
            zIndex: '9999'
        }
    );
    baidu.on(me._cardContainer, 'mouseenter', function() {
        me._closeTimer && ad.base.clearTimeout(me._closeTimer);
    });
    baidu.on(me._cardContainer, 'mouseleave', baidu.fn.bind(me._delayHideCard, me));
    document.body.appendChild(me._cardContainer);
};

/**
 * 延迟隐藏浮层
 */
ad.impl.tieba.TextReplacer.prototype._delayHideCard = function() {
    var me = this;

    me._closeTimer = ad.base.setTimeout(function() {
        me.hideHovercard();
    }, 500);
};

/**
 * 显示浮层物料
 * @param {HTMLElement} link 触发展示的链接
 * @param {Object} material 物料数据
 */
ad.impl.tieba.TextReplacer.prototype.showHovercard = function(link, material) {
    var me = this;
    me._isCardShown = true;

    // create a container if not exist
    if (!me._cardContainer) {
        me._initCardContainer();
    }

    // create a widget if not exist
    if (!me._card) {
        me._card = new ad.widget.tieba.Hovercard(material);
        me._card.setRoot(me._cardContainer);
    }
    me._card.refresh(me._cardContainer, material);

    var position = baidu.dom.getPosition(link);
    position.top += link.offsetHeight + 10;
    position.left += (link.offsetWidth - me._cardContainer.offsetWidth) / 2;
    me._cardContainer.style.top = position.top +'px';
    me._cardContainer.style.left = position.left + 'px';

    me._closeTimer && ad.base.clearTimeout(me._closeTimer);
    
    baidu.event.once(link, 'mouseleave', baidu.fn.bind(me._delayHideCard, me));

    me.log({
        'url': me._getRcvUrl(link), //触发浮层的划词链接
        'group': me._group,
        'type': 'impression',
        'name': 'card'
    });
    me._timer = new Date().getTime();
};

/**
 * 隐藏浮层物料
 */
ad.impl.tieba.TextReplacer.prototype.hideHovercard = function() {
    var me = this;

    if (!me._isCardShown) {
        return;
    }

    me._isCardShown = false;

    ad.base.clearTimeout(me._closeTimer);
    baidu.dom.setStyles(
        me._cardContainer,
        {
            top: '-999px',
            left: '-999px'
        }
    );

    var time = new Date().getTime() - me._timer;
    me.log({
        'url': me._getRcvUrl(me._cardLink),
        'group': me._group,
        'type': 'timer',
        'time': time
    });
    me._cardLink = null;
};

/**
 * 从链接上读取RCV日志的URL
 * @param {Node} link 需要分析的链接元素
 */
ad.impl.tieba.TextReplacer.prototype._getRcvUrl = function(link) {
    // 如果有data-url，则href已被替换为带actionid和attach的最终路径，
    // 此时返回data-url再拼接其他参数；为替换过则直接用href。
    return link.getAttribute('data-url') || link.href;
};

/**
 * 发送日志
 * @param {Object} params 需要发送的参数
 */
ad.impl.tieba.TextReplacer.prototype.log = function(params) {
    var me = this;
    me.logHm(params['type'], params['group'], params['name'] || params['time']);
    me.logRcv(params);
};

/**
 * 向精算发送统计日志
 * @param {string} type 统计类型：click/impression/timer
 * @param {number} group 实验分组：1/2/3
 * @param {string|number} nameOrTime 统计参数，如果type为timer时为时长，否则为对应链接名称或广告位名称
 */
ad.impl.tieba.TextReplacer.prototype.logHm = function(type, group, nameOrTime) {
    var me = this;
    var config = me._logConfig['mkt'];
    var name = nameOrTime;
    var time = nameOrTime;
    var tpl = config['tpl'][type];
    var data;
    var rnd = Math.floor(Math.random() * 1e10);

    switch(type) {
        case 'click':
            data = {
                'linkId': config[type][group][name]
            };
            break;
        case 'impression':
            data = {
                'adId': config[type][group][name],
                'rnd': rnd
            };
            break;
        case 'timer':
            data = {
                'adId': config[type][group],
                'data': time,
                'rnd': rnd
            };
            break;
    }
    app.log.send(baidu.string.format(tpl, data));
};

/**
 * 向RCV服务器发送日志
 * @param {Object} params 需要发送的参数
 */
ad.impl.tieba.TextReplacer.prototype.logRcv = function(params) {
    var me = this;

    var actionMap = {
        'impression': '1',
        'click': '2',
        'timer': '3'
    };
    var actionId = actionMap[params['type']];

    // 点击直接通过302记录，不在此发送
    if (actionId === '2') {
        return;
    }

    var logUrl = params['url'] || me._logConfig['rcv']['url'];

    var attach = '';

    // 计时统计需要加入attach
    if (actionId === '3') {
        attach = params['time'];
    }
    else { // actionId === '1'
        var paramArray = [];
        for (var p in params) {
            if (p !== 'group' && p !== 'type' && p !== 'url') {
                paramArray.push(p + '=' + encodeURIComponent(params[p]));
            }
        }
        attach = encodeURIComponent(paramArray.join('&'));
    }

    logUrl = logUrl + (logUrl.indexOf('?') === -1 ? '?' : '&')
            + 'actionid=' + actionId
            + '&attach=' + attach;

    app.log.send(logUrl);
};

/**
 * 创建物料的样式，这个函数应该只需要被调用一次.
 * @private
 */
ad.impl.tieba.TextReplacer.prototype._createStyles = function() {
    if (COMPILED) {
        if (typeof AD_STYLE_CONTENT !== 'undefined') {
            if(!baidu.g(this._styleId)){
                var styles = AD_STYLE_CONTENT;
                //dynamically create style element and append to root node 
                var style = document.createElement('style');
                style.type = 'text/css';
                style.media = 'screen';
                style.id =  this._styleId;
                if(style.styleSheet){
                    style.styleSheet.cssText = styles;
                } else {
                    style.appendChild(document.createTextNode(styles));
                }
                
                var head = document.head || document.getElementsByTagName('head')[0];
                head && head.appendChild(style);
            }
        }
    }
};

ad.Debug(function() {
    var replacer = ad.impl.tieba.TextReplacer.getInstance();
    replacer.injectAd();
});














/* vim: set ts=4 sw=4 sts=4 tw=100: */

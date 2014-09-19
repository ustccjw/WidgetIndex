/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/weigou/detail_view.js ~ 2013/03/04 14:04:52
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * detail_view相关的实现逻辑
 **/

goog.require('ad.fx.moveTo');
goog.require('ad.impl.weigou.dom');
goog.require('ad.widget.Widget');

goog.include('ad/widget/weigou/detail_view.less');
goog.include('ad/widget/weigou/detail_view.html');

goog.provide('ad.widget.weigou.DetailView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {Object=} opt_recommendData 推荐数据
 * @extends {ad.widget.Widget}
 */
ad.widget.weigou.DetailView = function(data, opt_recommendData) {
    ad.widget.Widget.call(this, data);

    /**
     * 推荐数据
     * @type {Object}
     */
    this._recommendData = opt_recommendData || {};

    this._hasRcmd = !!opt_recommendData;

    /**
     * 保存着用户将要购买的商品数据和数量
     * @type {Object}
     */
    this.products = {};

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_weigou_detail_view';

    /**
     * 推荐逻辑的模版
     */
    this._rcmdView = 'ecl_detail_rcmd';

    this.name = 'detail';
};
baidu.inherits(ad.widget.weigou.DetailView, ad.widget.Widget);

/** @override */
ad.widget.weigou.DetailView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.weigou.DetailView.superClass.enterDocument.call(me);

    var root = me.getRoot();

    /*
    // 如果icons数量大于1个，显示gallery
    if(me._data['icons'] && me._data['icons'].length > 1) {
        var container = baidu.dom.q('ecl-weigou-detail-gallery-container', root)[0];
        if(container) {
            baidu.dom.show(container);
        }
    }
    */

    if(me._hasRcmd) {
        var data = {
            'main': {
                'name': me._data['name'],
                'price': me._data['price'],
                'logo': me._data['logo']
            },
            'list': me._recommendData
        };
        var rcmd = baidu.q('ecl-weigou-detail-bottom', root)[0];
        var html = ad.impl.weigou.util.tmpl(me.tpl(me._rcmdView), data);
        rcmd.innerHTML = html;

        rcmd.style.display = 'block';

        var items = baidu.q('ecl-weigou-rcmd-item-name', root);
        baidu.each(items, function(item) {
            var title = item.getAttribute('title');
            title = ad.impl.weigou.util.subByte(title, 28);
            item.innerHTML = baidu.string.encodeHTML(title);
        });
    }

    // 将主商品加到代购买的列表中
    me.products[me._data['id']] = {
        'count': 1,
        'name': me._data['name'],
        'logo': me._data['logo'],
        'price': me._data['price'],
        'original_price': me._data['original_price'],
        'fare': me._data['fare'],
        'vendor': me._data['vendor']
    };

    // 截断商品名称
    var nameWrapper = baidu.q('ecl-weigou-detail-name', root)[0];
    if(nameWrapper) {
        var name = nameWrapper.getElementsByTagName('a')[0];
        var title = name.getAttribute('title');
        title = ad.impl.weigou.util.subByte(title, 84);
        name.innerHTML = baidu.string.encodeHTML(title);
    }

    var arr = {};
    baidu.each(me._recommendData, function(data) {
        arr[data['id']] = {
            'id': data['id'],
            'name': data['name'],
            'logo': data['logo'],
            'attributes': data['attributes'] ? data['attributes'] : [],
            'picture': data['picture'],
            'price': data['price'],
            'original_price': data['original_price'],
            'vendor': data['vendor']
        };
    });
    // 重写recommendData
    me._recommendData = arr;


    // 截断属性
    //
    var attrs = baidu.q('ecl-weigou-pur-attr-item');
    baidu.each(attrs, function(attr) {
        var title = attr.getAttribute('title');
        title = baidu.string.decodeHTML(title);
        title = ad.impl.weigou.util.subByte(title, 26);

        var key, value, index = title.indexOf('：');
        if(index !== -1) {
            key = title.substr(0, index);
            value = title.substr(index + 1);
        } else {
            key = title;
            value = '';
        }
        attr.innerHTML = [
            '<span class="ecl-attr-key">',
                baidu.string.encodeHTML(key),
            '：</span>',
            '<span class="ecl-attr-value">',
                baidu.string.encodeHTML(value),
            '</span>'
        ].join('');
    });
};

/** @override */
ad.widget.weigou.DetailView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.weigou.DetailView.superClass.bindEvent.call(me);

    var root = me.getRoot();

    /*
    // 绑定左侧gallery的事件
    if(me._data['icons'] && me._data['icons'].length > 1) {
        (function(){
            var container = baidu.dom.q('ecl-weigou-detail-gallery-container', root)[0];
            if(container) {
                var leftBtn = baidu.dom.q('ecl-weigou-detail-gallery-left', root)[0];
                var rightBtn = baidu.dom.q('ecl-weigou-detail-gallery-right', root)[0];
                var ul = container.getElementsByTagName('ul')[0];
                var gallery = baidu.q('ecl-weigou-detail-gallery-wrapper', root)[0];
                var width = 206;
                var image = baidu.q('ecl-weigou-detail-image', root)[0];
                ad.impl.weigou.dom.on(leftBtn, 'click', function() {
                    var left = gallery.style.left;
                    left = left ? parseInt(left.substr(0, left.length - 2)) : 0;
                    if(left < 0) {
                        var offset = left + width;
                        if(offset > 0) {
                            offset = 0;
                        }
                        gallery.style.left = offset + 'px';
                    }
                });
                ad.impl.weigou.dom.on(rightBtn, 'click', function() {
                    var left = gallery.style.left;
                    left = left ? parseInt(left.substr(0, left.length - 2)) : 0;
                    var length = ul.offsetWidth;
                    if(-left + width < length) {
                        var offset = left - width;
                        if(-offset + width > length) {
                            offset = width - length;
                        }
                        gallery.style.left = offset + 'px';
                    }
                });

                ad.impl.weigou.dom.on(ul, 'click', function(event){
                    event = event || window.event;
                    var target = event.srcElement || event.target;
                    if(target.nodeName === 'LI') {
                        var selected = baidu.q('selected', ul)[0];
                        if(selected) {
                            baidu.dom.removeClass(selected, 'selected');
                        }
                        baidu.dom.addClass(target, 'selected');
                        image.src = target.getAttribute('data-src');
                    }
                });
            }
        })();
    }
    */


    // 绑定加减商品数量的输入框事件
    var countInput = baidu.g('ecl-weigou-detail-input');
    var minus = baidu.q('ecl-weigou-detail-minus', root)[0];
    var plus = baidu.q('ecl-weigou-detail-plus', root)[0];

    ad.impl.weigou.dom.on(plus, 'click', function(){
        var target = this,
            num = parseInt(countInput.value, 10);
        countInput.value = num + 1;
        if((num + 1) > 999){
            countInput.value = 999;
        }
    });
    ad.impl.weigou.dom.on(minus, 'click', function(){
        var target = this,
            num = parseInt(countInput.value, 10);
        countInput.value = (num - 1 < 1) ? 1 : (num - 1);
    });
    ad.impl.weigou.dom.on(countInput, 'blur', function(){
        var num = parseInt(countInput.value, 10);
        if(!num || num < 1){
            countInput.value = 1;
        } else if(num > 999) {
            countInput.value = 999;
        } else {
            countInput.value = num;
        }
    });

    if (ad.impl.weigou.dist.IPAD) {
        ad.impl.weigou.dom.on(window, 'orientationchange', function(){
            me.hideDetailDialog();
            // 横屏：-90/90
            // 竖屏：0/180
            // alert(window.orientation);
        });
    }

    // 绑定购买按钮的事件 
    var submitBtn = baidu.q('ecl-weigou-detail-submit', root)[0];
    if(submitBtn) {
        ad.impl.weigou.dom.on(submitBtn, 'click', function() {
            me.buy();
        });
    }


    if(me._hasRcmd) {
        var submitBtn1 = baidu.q('ecl-weigou-rcmd-buy', root)[0];
        ad.impl.weigou.dom.on(submitBtn1, 'click', function() {
            me.buy();
        });
    }

    // 绑定推荐gallery的事件
    if(me._hasRcmd) {
        (function(){
            var container = baidu.q('ecl-weigou-rcmd-gallery-container', root)[0];
            if(container) {
                var leftBtn = baidu.q('ecl-weigou-rcmd-gallery-left', root)[0];
                var rightBtn = baidu.q('ecl-weigou-rcmd-gallery-right', root)[0];
                var ul = container.getElementsByTagName('ul')[0];
                var gallery = baidu.q('ecl-weigou-rcmd-gallery-wrapper', root)[0];
                var width = 345;
                var moving = false;
                ad.impl.weigou.dom.on(leftBtn, 'click', function() {
                    if(moving) {
                        return;
                    }
                    var left = gallery.style.left;
                    left = left ? parseInt(left.substr(0, left.length - 2), 10) : 0;
                    if(left < 0) {
                        var length = ul.offsetWidth;
                        var offset = left + width;
                        if(offset > 0) {
                            offset = 0;
                        }
                        var leftDiv = leftBtn.getElementsByTagName('div')[0];
                        var rightDiv = rightBtn.getElementsByTagName('div')[0];
                        if(offset >= 0) {
                            baidu.dom.addClass(leftDiv, 'disabled');
                        } else {
                            baidu.dom.removeClass(leftDiv, 'disabled');
                        }
                        if(length + offset > width) {
                            baidu.dom.removeClass(rightDiv, 'disabled');
                        } else {
                            baidu.dom.addClass(rightDiv, 'disabled');
                        }
                        moving = true;
                        ad.fx.moveTo(gallery, {
                            'x': offset, 'y': 0
                        }, {
                            'duration': 500,
                            'onafterfinish': function() {
                                moving = false;
                            }
                        });
                    }
                });
                ad.impl.weigou.dom.on(rightBtn, 'click', function() {
                    if(moving) {
                        return;
                    }
                    var left = gallery.style.left;
                    left = left ? parseInt(left.substr(0, left.length - 2), 10) : 0;
                    var length = ul.offsetWidth;
                    if(-left + width < length) {
                        var offset = left - width;
                        if(-offset + width > length) {
                            offset = width - length;
                        }
                        var leftDiv = leftBtn.getElementsByTagName('div')[0];
                        var rightDiv = rightBtn.getElementsByTagName('div')[0];
                        if(offset >= 0) {
                            baidu.dom.addClass(leftDiv, 'disabled');
                        } else {
                            baidu.dom.removeClass(leftDiv, 'disabled');
                        }
                        if(length + offset > width) {
                            baidu.dom.removeClass(rightDiv, 'disabled');
                        } else {
                            baidu.dom.addClass(rightDiv, 'disabled');
                        }
                        moving = true;
                        ad.fx.moveTo(gallery, {
                            'x': offset, 'y': 0
                        }, {
                            'duration': 500,
                            'onafterfinish': function() {
                                moving = false;
                            }
                        });
                    }
                });

                var inputs = baidu.q('ecl-weigou-rcmd-item-input', container);
                baidu.each(inputs, function(input) {
                    input.onclick = function() {
                        var target = this;
                        var id = target['value'];
                        if(target.checked) {
                            var data = me._recommendData[id];
                            data['count'] = 1;
                            if(data) {
                                me.products[id] = data;
                            }
                        } else {
                            delete me.products[id];
                        }
                        me.refreshCount();
                    };
                });

                ad.impl.weigou.dom.on(ul, 'click', function(event) {
                    event = event || window.event;
                    var target = event.srcElement || event.target;
                    if(target.nodeName === 'IMG'
                       || baidu.dom.hasClass(target, 'ecl-weigou-rcmd-item-top')) {
                        me.showRcmdTip(target.getAttribute('data-id'));
                    } else if(target.nodeName === 'A') {
                        me.showRcmdTip(target.getAttribute('data-id'));
                    }
                });
            }
        })();
    }


    // 绑定查看详情的事件
    var detailBtn = baidu.g('ecl-weigou-detail-attr-link');
    if(detailBtn) {
        /*
        var isDetailShow = false;
        var detailFirstShow = false;
        var detailDialog = baidu.g('ecl-weigou-detail-attr');
        var hideDetailDialog = function() {
            baidu.dom.removeClass(detailBtn, 'selected');
            baidu.dom.hide(detailDialog);
            isDetailShow = false;
        };
        var closeBtn = detailDialog.getElementsByTagName('b')[0];
        ad.impl.weigou.dom.on(closeBtn, 'click', function() {
            hideDetailDialog();
        });
        ad.impl.weigou.dom.on(detailBtn, 'click', function(event) {
            if(isDetailShow) {
                hideDetailDialog();
            } else {
                baidu.dom.show(detailDialog);

                var height = detailDialog.offsetHeight;
                var width = detailDialog.offsetWidth;
                var iframe = detailDialog.getElementsByTagName('iframe')[0];
                baidu.dom.setStyles(iframe, {
                    'height': height + 'px',
                    'width': width - 10 + 'px'
                });

                isDetailShow = true;
                detailFirstShow = true;
            }
            baidu.event.preventDefault(event);
        });
        ad.impl.weigou.dom.on(document.body, 'click', function(event) {
            if(!isDetailShow || detailFirstShow) {
                detailFirstShow = false;
                return;
            }
            event = event || window.event;
            var target = event.srcElement || event.target;
            var on = false;
            while(target !== document.body) {
                if(target === detailDialog) {
                    on = true;
                    break;
                }
                target = target.parentNode;
            }
            if(!on) {
                hideDetailDialog();
            }
        });
        */

        ad.impl.weigou.dom.on(detailBtn, 'click', function() {
            me.showDetailDialog();
        });
    }


    var backBtn = baidu.g('ecl-weigou-detail-return-btn');
    if(backBtn) {
        ad.impl.weigou.dom.on(backBtn, 'click', function() {
            me.trigger(ad.impl.weigou.events.BACK);
        });
    }
};

/**
 * 展示详细属性
 */
ad.widget.weigou.DetailView.prototype.showDetailDialog = function() {
    var me = this;
    var root = me.getRoot();

    me.hideDetailDialog();

    var detailDialog = baidu.g('ecl-weigou-detail-attr');
    detailDialog.setAttribute('id', 'ecl-weigou-detail-attr-temp');

    var div = document.createElement('div');
    div.className = 'ecl-weigou-detail-dialog';
    div.setAttribute('id', 'ecl-weigou-detail-attr');
    div.innerHTML = detailDialog.innerHTML;

    var detailBtn = baidu.g('ecl-weigou-detail-attr-link');
    var pos = ad.impl.weigou.dom.getPosition(detailBtn);

    // 把这些都放到css里。。现在是临时逻辑，因为OP已经在上线了，不能改模板

    var fontSize = ad.impl.weigou.dist.IPAD ? '14px' : '12px';
    var topPosition = pos['top'] - 5 + 'px';
    var leftPosition = pos['left'] + 90 + 'px';

    if (ad.impl.weigou.dist.IPAD) {
        if (window.orientation === 0 || window.orientation === 180) {
            // iPad下面竖屏的情况
            leftPosition = (pos['left'] - 70) + 'px';
            topPosition = (pos['top'] + 20) + 'px';
        }
    }

    baidu.dom.setStyles(div, {
        'position': 'absolute',
        'z-index': 100,
        'font-size': fontSize,
        'color': '#666',
        'top': topPosition,
        'left': leftPosition
    });

    var wrapper = baidu.q('ecl-weigou-detail-attr-wrapper', div)[0];
    var inner = baidu.q('ecl-weigou-detail-attr-inner', div)[0];
    if(inner.style.width) {
        if (ad.impl.weigou.dist.IPAD) {
            inner.style.width = '200px';
        }
        wrapper.style.width = parseInt(inner.style.width.substring(0, 3), 10) + 20 + 'px';
    } else {
        wrapper.style.width = ad.impl.weigou.dist.IPAD ? '420px' : '400px';
    }

    var closeBtn = div.getElementsByTagName('b')[0];
    ad.impl.weigou.dom.on(closeBtn, 'click', function() {
        me.hideDetailDialog();
    });

    document.body.appendChild(div);

    me._isDetailShow = true;
    me._detailFirstShow = true;
    if(me._firstDetailDialog !== false) {
        me._firstDetailDialog = false;

        ad.impl.weigou.dom.on(document.body, 'click', function(event) {
            if(!me._isDetailShow || me._detailFirstShow) {
                me._detailFirstShow = false;
                return;
            }
            event = event || window.event;
            var target = event.srcElement || event.target;
            var on = false;
            while(target !== document.body) {
                if(baidu.dom.hasClass(target, 'ecl-weigou-detail-dialog')) {
                    on = true;
                    break;
                }
                target = target.parentNode;
            }
            if(!on) {
                me.hideDetailDialog();
            }
        });
    }
};

ad.widget.weigou.DetailView.prototype.hideDetailDialog = function() {
    var me = this;
    var tips = baidu.q('ecl-weigou-detail-dialog');
    baidu.each(tips, function(tip) {
        baidu.dom.remove(tip);
    });
    me._isDetailShow = false;
    me._detailFirstShow = false;
    var detailDialog = baidu.g('ecl-weigou-detail-attr-temp');
    if(detailDialog) {
        detailDialog.setAttribute('id', 'ecl-weigou-detail-attr');
    }
};

ad.widget.weigou.DetailView.prototype.dispose = function() {
    var me = this;
    ad.widget.weigou.DetailView.superClass.dispose.call(me);

    try {
        me.hideDetailDialog();
    } catch(e) {
    }
};

ad.widget.weigou.DetailView.prototype.buy = function() {
    var me = this;

    // 实时主商品的数量
    var countInput = baidu.g('ecl-weigou-detail-input');
    me.products[me._data['id']]['count'] = parseInt(countInput.value, 10)

    me.removeRcmdTips();

    var count = 0;
    for(var key in me.products) {
        count++;
    }
    me.trigger(ad.impl.weigou.events.PURCHASE_VIEW, {
        'vendorId': me._data['vendor_id'],
        'vendor': me._data['vendor'],
        'count': count,
        'list': me.products
    });
};

/**
 * 显示推荐的tip
 * @param {string} id
 */
ad.widget.weigou.DetailView.prototype.showRcmdTip = function(id) {
    var me = this;
    var root = me.getRoot();

    me.removeRcmdTips();

    var tpl = me.tpl('ecl_rcmd_template');
    var data = me._recommendData[id];
    
    var html = ad.impl.weigou.util.tmpl(tpl, data);
    var div = document.createElement('div');
    div.className = 'ecl-weigou-rcmd-tip';
    div.style.display = 'none';
    //div.style.visibility = 'hidden';
    div.innerHTML = html;

    document.body.appendChild(div);
    var closeBtn = div.getElementsByTagName('b')[0];
    ad.impl.weigou.dom.on(closeBtn, 'click', function() {
        me.removeRcmdTips();
    });

    var nameWrapper = baidu.q('ecl-weigou-rcmd-tip-name-wrapper')[0];
    if(nameWrapper) {
        var name = nameWrapper.getElementsByTagName('span')[0];
        var title = name.getAttribute('title');
        title = ad.impl.weigou.util.subByte(title, 80);
        name.innerHTML = baidu.string.encodeHTML(title);
    }

    var attrs = baidu.q('ecl-weigou-rcmd-tip-attr', div);
    baidu.each(attrs, function(attr) {
        var title = attr.getAttribute('title');
        var oTitle = title;
        title = baidu.string.decodeHTML(title);
        title = ad.impl.weigou.util.subByte(title, 20);

        var key, value, index = title.indexOf('：');
        if(index !== -1) {
            key = title.substr(0, index);
            value = title.substr(index + 1);
        } else {
            key = title;
            value = '';
        }
        attr.innerHTML = [
            '<span class="ecl-attr-key" title="' + oTitle + '">',
                baidu.string.encodeHTML(key),
            '：</span>',
            '<span class="ecl-attr-value" title="' + oTitle + '">',
                baidu.string.encodeHTML(value),
            '</span>'
        ].join('');
    });

    var target = baidu.q('ecl-weigou-rcmd-right', root)[0];
    var pos = ad.impl.weigou.dom.getPosition(target);
    div.style.top = pos.top - 108 + 'px';
    div.style.left = 20 + 'px';

    div.style.display = 'block';

    ad.base.setTimeout(function() {
        baidu.dom.setStyles(closeBtn, {
            'zoom': '1'
        });
    }, 50);

    var topDom = baidu.q('ecl-weigou-rcmd-tip-top', div)[0];
    if(div.offsetHeight > 360) {
        var height = 336 - topDom.offsetHeight;
        var attrsDom = baidu.q('ecl-weigou-rcmd-tip-attrs', div)[0];
        attrsDom.style.height = height + 'px';
        baidu.dom.setStyles(attrsDom, {
            'height': height + 'px',
            'overflow': 'auto'
        });
    }
    var top = pos.top + 111 - div.offsetHeight;
    div.style.top = top + 'px';


    me._tipShow = true;
    me._tipShowJustNow = true;
    if(me._firstRcmdTipShow !== false) {
        me._firstRcmdTipShow = false;
        ad.impl.weigou.dom.on(document, 'click', function(event) {
            if(me._tipShowJustNow || !me._tipShow) {
                me._tipShowJustNow = false;
                return;
            }
            event = event || window.event;
            var target = event.srcElement || event.target;
            var on = false;
            while(target !== document.body) {
                if(baidu.dom.hasClass(target, 'ecl-weigou-rcmd-tip')) {
                    on = true;
                    break;
                }
                target = target.parentNode;
            }
            if(!on) {
                me.removeRcmdTips();
            }
        });
    }
};

/**
 * 清除推荐的tips
 */
ad.widget.weigou.DetailView.prototype.removeRcmdTips = function() {
    var me = this;
    var tips = baidu.q('ecl-weigou-rcmd-tip');
    baidu.each(tips, function(tip) {
        baidu.dom.remove(tip);
    });
    me._tipShow = false;
    me._tipShowJustNow = false;
};


ad.widget.weigou.DetailView.prototype.refreshCount = function() {
    var me = this;
    var count = 0;
    for(var key in me.products) {
        count++;
    }
    var countDom = baidu.g('ecl-weigou-rcmd-count');
    countDom.innerHTML = count;
};















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

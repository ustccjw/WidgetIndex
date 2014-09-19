/**
 * @author chenjiawei01@baidu.com
 **/

goog.require('ad.base');
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Button');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Iermu');
goog.require('ad.array');
goog.require('ad.lang');
goog.require('ad.dom');


goog.include('ad/impl/new_custom/mengniu.less');

goog.provide('ad.impl.new_custom.Mengniu');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var logo = new ad.widget.Image(AD_CONFIG['logo']);
    var nav = new ad.widget.LinkList(AD_CONFIG['nav']);
    var back = new ad.widget.Button(AD_CONFIG['back']);
    var map = new ad.widget.Image(AD_CONFIG['map']);
    var icons = [];
    ad.array.forEach(AD_CONFIG['icons']['options'], function(icon, index) {
        var tmp = icon['enum']['field'] || icon['enum']['factory'];
        icon['image_url'] = tmp['image_url'];
        icons.push(new ad.widget.Image(icon));
    });

    var linkListConfig = AD_CONFIG['icons']['options'][0]['link_list'];
    var iermu = new ad.widget.Iermu(linkListConfig['options'][0]['iermu']);
    var smallHead = new ad.widget.SmallHead(linkListConfig['options'][0]['small_head']);
    var linkList = new ad.widget.LinkList(linkListConfig);
    var footer = new ad.widget.Image(AD_CONFIG['footer']);

    var mapIcon = [map, icons];
    var zhibo = [iermu, [smallHead, linkList]];
    material.setWidgets(
        [logo, nav, back],
        mapIcon,
        zhibo,
        [footer]
    );

    if (async === true) {
        return material;
    }

    material.show();

    // 当前点击的icon
    var iconNum = -1; 

    // 当前点击的机位
    var position = -1;

    // 点击机位的按钮元素
    var elements = linkList.getRoot().getElementsByTagName('li');

    // 点击icon显示对应的牧场/工厂zhibo
    ad.array.forEach(icons, function(icon, index) {
        icon.addListener(ui.events.CLICK, function(event) {

            // 预览时隐藏，后续show，用组件的hide来进行隐藏
            baidu.dom.addClass(iermu.getRoot().parentNode, 'ec-show');
            baidu.dom.addClass(back.getRoot(), 'ec-show');
            hide(mapIcon);
            show([zhibo, back]);

            // 更新当前icon
            iconNum = index;

            // 修改机位按钮的名称
            var linkListConfig = AD_CONFIG['icons']['options'][index]['link_list'];
            for (var i = 0; i < elements.length; i++) {
                baidu.dom.children(elements[i])[0].innerHTML = linkListConfig['options'][i]['title'];
            }

            // 选中机位1
            elements[0].click();
            
            // 阻止跳转
            baidu.event.preventDefault(event);
        });
    });

    for (var i = 0; i < elements.length; i++) {
        baidu.dom.setAttr(elements[i], 'data-index', i);

        // 监听点击机位x事件
        ad.dom.on(elements[i], 'click', makeFunction);
    }

    function makeFunction(event) {
        update(baidu.dom.getAttr(this, 'data-index'));

        // 阻止点击机位x跳转
        baidu.event.preventDefault(event);
    } 

    // 点击机位显示对应的直播信息
    function update(index) {

        // 增加/删除select类
        if (elements[position]) {
            baidu.dom.removeClass(elements[position], 'ec-select');
        }
        baidu.dom.addClass(elements[index], 'ec-select');

        // 显示对应直播耳目，mallHead
        var linkListConfig = AD_CONFIG['icons']['options'][iconNum]['link_list'];
        iermu.refresh(null, linkListConfig['options'][index]['iermu']);
        smallHead.refresh(null, linkListConfig['options'][index]['small_head']);

        // 修改当前机位
        position = index;
    }

    // 点击返回
    back.addListener(ui.events.CLICK, function(event) {
        hide([zhibo, back]);
        show(mapIcon);
        baidu.event.preventDefault(event);
    });

    // 返回按钮hover事件
    ad.dom.hover(back.getRoot(), function(event) {
        var element = logo.getRoot().parentNode;
        baidu.dom.addClass(element, 'ec-hover');
    }, function(event) {
        var element = logo.getRoot().parentNode;
        baidu.dom.removeClass(element, 'ec-hover');
    });

    // 隐藏组件组
    function hide(widgets) {
        ad.array.forEach(widgets, function(widget) {
            if (ad.lang.isArray(widget)) {
                hide(widget);
            }
            else {
                widget.hide();
            }
        });
    }

    // 显示组件组
    function show(widgets) {
        ad.array.forEach(widgets, function(widget) {
            if (ad.lang.isArray(widget)) {
                show(widget);
            }
            else {
                widget.show();
            }
        });
    }

    // rewrite title2
    logo.rewriteTitle2(null, 'logo', true);
    nav.rewriteTitle2(null, '文字链', false);
    ad.array.forEach(icons, function(icon, index) {
        icon.rewriteTitle2(null, '牧场/工厂' + index, true);
    });
    footer.rewriteTitle2(null, '商品图片', true);
    back.rewriteTitle2(null, '返回按钮', true);
    linkList.rewriteTitle2(null, '机位', false);
    iermu.addListener(ui.events.PLAY, function() {
        iermu.sendLog('工厂/牧场' + iconNum + '机位' + position + '播放');
    });

    ad.dom.on(smallHead.getRoot(), 'click', function(event) {
        baidu.event.preventDefault(event);
    });

    // icon加title
    ad.array.forEach(icons, function(icon, index) {
        var iconConfig = AD_CONFIG['icons']['options'][index];
        baidu.dom.setAttr(baidu.dom.children(icon.getRoot())[0],
            'title', iconConfig['link_list']['options'][0]['small_head']['titletext']);
    });
});

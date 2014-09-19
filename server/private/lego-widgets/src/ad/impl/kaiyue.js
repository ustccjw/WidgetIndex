/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/kaiyue.js ~ 2013/02/02 23:53:33
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * kaiyue相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Button');
goog.require('ad.widget.ImageShowArrow');

goog.include('ad/impl/kaiyue.less');

goog.provide('ad.impl.Kaiyue');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-kaiyue'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.DefaultRender());
    var main_image = new ad.widget.Image(AD_CONFIG['main_image']);
    var head = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var floatCount = 1 + AD_CONFIG['small_head']['image_group_head']['options'].length;
    var fwcs = [];
    var fwcRendered = [];
    var arr_image_show_arrow = [];
    var arr_button = [];
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arr_tab_cont = [];
    var button_group = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    var lastFWCIndex = -1;

    var l, m;
    for (var i = 0; i < floatCount; i++) {
        AD_CONFIG['imageshowarrows']['lists'][i]['switch_time'] = 5000000000000;
        var imageShowArrow = new ad.widget.ImageShowArrow(AD_CONFIG['imageshowarrows']['lists'][i]);
        var buttons = [];

        l = AD_CONFIG['buttons']['lists'][i]['floats_buttons'];
        for (m in l) {
            var arr_button_sub = [];
            for (var k = 0; k < 2; k++) {
                l[m]['couple'][k]['class_name'] = 'ec-button-' + (k + 1);
                var button = new ad.widget.Button(l[m]['couple'][k]);
                arr_button_sub.push(button);
            }
            buttons.push(arr_button_sub);
        }

        arr_button.push(buttons);

        AD_CONFIG['fwc']['id'] = (i + 1);
        var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);

        var arr_fwc_widgets = [imageShowArrow];
        for (var j = 0; j < buttons.length; j++) {
            for (var k = 0; k < buttons[j].length; k++) {
                arr_fwc_widgets.push(buttons[j][k]);
            }
        }

        fwc.setWidgets(arr_fwc_widgets);
        arr_image_show_arrow.push(imageShowArrow);
        fwcs.push(fwc);
    }

    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i++) {
        arr_tab_cont.push(new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]['item']));
    }
    tab_container.setWidgets(arr_tab_cont);

    material.setWidgets(
        [main_image, head], [tab_container], [button_group],
        fwcs
    );
    if (async === true) {
        return material;
    }
    material.show();

    //百度精算监测
    // var hmjs = baidu.dom.create('div', {
    //     'id': '_bdhm_mkt_f34c6407212cbfb03d286bb85081e33f'
    // });
    // baidu.dom.insertAfter(hmjs, material.getRoot());

    // var mkt = document.createElement("script");
    // mkt.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//click.hm.baidu.com/mkt.js?f34c6407212cbfb03d286bb85081e33f";
    // baidu.dom.insertAfter(mkt, hmjs);

    window['_mkt'] = window['_mkt'] || [];

    // FIXME(user) 按钮监测
    /*
    for (var i = 0; i < arr_button.length; i++) {
        for (var j = 0; j < arr_button[i].length; j++) {
            for (var k = 0; k < arr_button[i][j].length; k++) {
                arr_button[i][j][k].rewriteTitle2(null, '浮层' + (i + 1) + '图片' + (j + 1) + '按钮' + (k + 1), true);
            }
        }
    }*/

    //事件
    main_image.addListener(ui.events.CLICK, function() {
        showFWC(0);
        this.sendLog('float1open');
        return false;
    });

    head.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index + 1);
        this.sendLog('float' + (index + 2) + 'open');
        return false;
    });

    if (arr_image_show_arrow && arr_image_show_arrow.length) {
        baidu.array.each(
            arr_image_show_arrow, function(item, i) {
                // FIXME(user) item.rewriteTitle2
                /*
                item.rewriteTitle2(
                    item.getRoot(),
                    "float" + (i + 1) + "-",
                    false
                );*/
                item.addListener(ui.events.ARROW_RIGHT, function(index) {
                    showButtons(i, index);
                    // item.sendLog("float" + (i + 1) + "-arrow-right");
                    return false;
                });
                item.addListener(ui.events.ARROW_LEFT, function(index) {
                    showButtons(i, index);
                    // item.sendLog("float" + (i + 1) + "-arrow-left");
                    return false;
                });
            }
        );
    }



    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */

    function showFWC(index) {
        if (!fwcs[index])
            return;
        if (fwcs[lastFWCIndex]) {
            fwcs[lastFWCIndex].hide();
        }
        fwcs[index].show();
        showButtons(index, 0);
        lastFWCIndex = index;

        if (!fwcRendered[index]) {
            var canvas = baidu.dom.first(fwcs[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered[index] = true;
            }
        }
    }

    /**
     * 显示对应浮层对应图片的按钮
     * @param {number} floatIndex 浮层索引.
     * @param {number} imgIndex 图片索引。
     */

    function showButtons(floatIndex, imgIndex) {
        var buttons = arr_button[floatIndex];
        if (buttons && buttons.length) {
            for (var i = 0; i < buttons.length; i++) {
                for (var j = 0; j < buttons[i].length; j++) {
                    if (i == imgIndex) {
                        buttons[i][j].show();
                    } else {
                        buttons[i][j].hide();
                    }
                }
            }
        }
    }


});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
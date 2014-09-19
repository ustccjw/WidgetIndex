/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/tiffany.js ~ 2014/07/30 14:08:40
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * tiffany相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Slider');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ContactInfo');

goog.include('ad/impl/new_custom/tiffany.less');

goog.provide('ad.impl.new_custom.Tiffany');

ad.Debug(function(async) {

    var material = new ad.material.BaseMaterial();

    // Tab Container
    var tabConts = [];
    var tabContClassNames = [];
    var iframeIndexs  = [];
    var tabContOptions = AD_CONFIG['tab_container']['options'];
    var tabContOption;
    var option;
    var temp;
    var normalCont;
    var collectColorName = function(option) {
        temp['color_names'].push(option['type']);
    };
    for (var i = 0; i < tabContOptions.length; ++i) {
        tabContOption = tabContOptions[i];
        if ('form' in tabContOption['tab_type']) {
            // 捷径表单
            option = tabContOption['tab_type']['form'];
            temp = new ad.widget.Iframe(option);
            iframeIndexs.push(i);
            tabConts.push(temp);
            tabContClassNames.push('jiejing');
        } 
        else if ('tape_images' in tabContOption['tab_type']) {
            // 胶带图
            option = tabContOption['tab_type']['tape_images'];
            tabConts.push(new ad.widget.ImageCartoon(option));
            tabContClassNames.push('tape-images');
        } 
        else if ('contact' in tabContOption['tab_type']) {
            // 客服
            option = tabContOption['tab_type']['contact'];
            option['contact'] = patchContactData(option['contact']);
            normalCont = new ad.widget.NormalContainer({});
            normalCont.setWidgets(
                new ad.widget.Image(option['image']),
                new ad.widget.HtmlText(option['description']),
                new ad.widget.ContactInfo(option['contact'])
            );
            tabConts.push(normalCont);
            tabContClassNames.push('contact');
        } 
        else if ('sns' in tabContOption['tab_type']) {
            // SNS
            option = tabContOption['tab_type']['sns'];
            temp = option['share'];
            temp['color_names'] = [];
            baidu.each(temp['options'], collectColorName);
            option['qrcode']['material_name'] = 'ec-qrcode';
            normalCont = new ad.widget.NormalContainer({});
            normalCont.setWidgets(
                new ad.widget.Image(option['image']),
                new ad.widget.Colorlist(option['share']),
                new ad.widget.Image(option['qrcode'])
            );
            tabConts.push(normalCont);
            tabContClassNames.push('sns');
        }
        
    }

    // Tab ClassName
    AD_CONFIG['tab_container']['classNames'] = tabContClassNames;

    /**
     * @override 
     * NormalContainer 无法设置自定义class，退而使用Tab的class
     * 把 Tab 的 class 先放到 _data 中，再通过 getTabClassName 方法拿到
     */
    ad.widget.TabContainer.prototype.getTabClassName = function(index) {
        return 'ec-tab-content-' + index 
             + ' ec-tab-' + this._data['classNames'][index];
    };

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabConts);


    material.setWidgets(
        [ new ad.widget.Title(AD_CONFIG['title']) ],
        [
            new ad.widget.Slider(AD_CONFIG['slider']),
            new ad.widget.SmallHead(AD_CONFIG['small_head'])
        ],
        [ tabContainer ],
        [ new ad.widget.ButtonGroup(AD_CONFIG['bottom_buttons']) ]
    );

    if (async === true) {
        return material;
    }

    material.show();


    // Iframe Widget 左侧图片点击统计
    // TAB内容是懒惰加载的，不能一开始就读取
    tabContainer.addListener(ui.events.TAB_CHANGE, function(i) {
        if (baidu.array.contains(iframeIndexs, i)) {
            tabConts[i].rewriteTitle2(null, 'TAB' + (i + 1) + ' 捷径左侧图片', true);
            baidu.array.remove(iframeIndexs, i);
        }
    });
    // 第一个加载不会触发TAB_CHANGE，手动触发
    tabContainer.trigger(ui.events.TAB_CHANGE, 0);


    function patchContactData(data) {
        var options = data['options'];
        for (var i = options.length - 1; i >= 0; i--) {
            if ('none' in options[i]['link_type']) {
                options[i]['link_type'] = false;
            }
            else if ('url' in options[i]['link_type']) {
                options[i]['rcv_url'] = options[i]['link_type']['url']['rcv_url'];
                options[i]['link_type'] = 'url';
            }
            else if ('mail' in options[i]['link_type']) {
                options[i]['mail_address'] = options[i]['link_type']['mail']['mail_address'];
                options[i]['link_type'] = 'mail';
            }
        }
        return data;
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

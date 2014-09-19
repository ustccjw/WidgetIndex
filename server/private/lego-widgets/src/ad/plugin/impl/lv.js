/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/impl/lv.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/15 09:41:32$
 */

goog.require('ad.plugin.Plugin');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Table');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');

goog.provide('ad.plugin.impl.Lv');

/**
 * LV样式的功能扩展
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.impl.Lv = function() {
    ad.plugin.Plugin.call(this);
}
baidu.inherits(ad.plugin.impl.Lv, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.impl.Lv());

/** @expose */
ad.plugin.impl.Lv.prototype.attachTo = function(material) {
    var me = this;
    material.addListener(ui.events.BEFORE_MATERIAL_SHOW, function() {
        var tab3 = new ad.widget.NormalContainer({});
        // AD_CONFIG['8']['data'] = me.selectData;
        tab3.setWidgets([
            new ad.widget.lv.List({}),
            new ad.widget.DependencySelect({
                'dependency': me.selectData['dependency'],
                'data': me.selectData['data']
            })
        ]);

        AD_CONFIG['10']['head']['0']['column_count'] = getMaxColNum(AD_CONFIG['10']);
        AD_CONFIG['11']['head']['0']['column_count'] = getMaxColNum(AD_CONFIG['11']);
        var tab4 = new ad.widget.NormalContainer({});
        tab4.setWidgets([
            new ad.widget.Table(AD_CONFIG['10']),
            new ad.widget.Table(AD_CONFIG['11'])
        ]);

        var tabContainer = /** @type {ad.widget.TabContainer} */ (material.getWidget(1));
        var widgets = [
            new ad.widget.ImageCartoon(AD_CONFIG['6']),
            new ad.widget.ImageCartoon(AD_CONFIG['7']),
            tab3,
            tab4,
            new ad.widget.SmallWeibo(AD_CONFIG['12'])
        ];
        tabContainer.setWidgets(widgets);
    });

    function getMaxColNum(data) {
        var body = data['body'];
        var max = 0;
        for (var i = 0; i < body.length; i++) {
            if (body[i]['tr'].length > max) {
                max = body[i]['tr'].length;
            }
        }
        return max;
    }

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        var tabContainer = /** @type {ad.widget.TabContainer} */ (material.getWidget(1));
        // add class
        var tabcons = baidu.dom.query('> .tabcon > .tabcon', baidu.g(tabContainer.getId('tab-body')));
        if (tabcons && tabcons.length) {
            tabcons[0] && baidu.addClass(tabcons[0], 'ad-inst-6');
            tabcons[1] && baidu.addClass(tabcons[1], 'ad-inst-7');
            if (tabcons[3]) {
                var tables = baidu.dom.query('.normal-con > .normal-con', tabcons[3]);
                tables[0] && baidu.addClass(tables[0], 'ad-inst-10');
                tables[1] && baidu.addClass(tables[1], 'ad-inst-11');
            }
            tabcons[4] && baidu.addClass(tabcons[4], 'ad-inst-12');
            baidu.setStyle(tabcons[4], 'padding', '5px');
        }
        var lvSelTab = material.getWidget(1).getWidget(0, 2).getRoot();
        baidu.setStyle(lvSelTab, 'position', 'relative');
        var con0 = baidu.q('normal-con-0-0', lvSelTab)[0];
        var con1 = baidu.q('normal-con-0-1', lvSelTab)[0];
        baidu.addClass(con0, 'ad-inst-9');
        baidu.addClass(con1, 'ad-inst-8');
        baidu.setStyles(con0, {
            'position': 'absolute',
            'height': '140px',
            'overflow': 'hidden'
        });
        baidu.setStyles(con1, {
            'position': 'absolute',
            'top': '40px',
            'left': '25px'
        });

        // rewrite title2
        var buttonGroup1 = material.getWidget(0, 1, 1);
        var buttonGroup2 = material.getWidget(0, 1, 2);
        buttonGroup1.rewriteTitle2(null, '第一行 ');
        buttonGroup2.rewriteTitle2(null, '第二行 ');
        var table1 = material.getWidget(1).getWidget(0, 3).getWidget(0, 0);
        var table2 = material.getWidget(1).getWidget(0, 3).getWidget(0, 1);
        var tbTitle1 = ad.base.getObjectByName('10.head.0.text', AD_CONFIG);
        var tbTitle2 = ad.base.getObjectByName('11.head.0.text', AD_CONFIG);
        tbTitle1 && table1.rewriteTitle2(null, tbTitle1 + ' ');
        tbTitle2 && table2.rewriteTitle2(null, tbTitle2 + ' ');
        var imageCartoon1 = material.getWidget(1).getWidget(0, 0);
        var imageCartoon2 = material.getWidget(1).getWidget(0, 1);
        imageCartoon1.rewriteTitle2(null, 'tab1 ');
        imageCartoon2.rewriteTitle2(null, 'tab2 ');

        var city;
        var store;
        var _detail;
        var list = material.getWidget(1).getWidget(0, 2).getWidget(0, 0);
        var select = material.getWidget(1).getWidget(0, 2).getWidget(0, 1);
        select.addListener(
            ui.events.CHANGE,
            function(sels, data, depth, datasource) {
                var detail;
                var next = datasource;
                for (var i = 0; i < sels.length; i++) {
                    var item = sels[i];
                    var si = item['selectedIndex'];
                    if (i == sels.length - 1) {
                        detail = next[si]['data'];
                    }
                    else {
                        next = next[si]['children'];
                    }
                }
                /*
                var sel = select.getEleByName('city');
                if (depth == 0) {
                    detail = data[0];
                    setSelVal(sel.options[sel.selectedIndex].value, detail['title_right']);
                }
                else {
                    var sIndex = seles[1]['selectedIndex'];
                    detail = data[sIndex]['children'][0];
                    setSelVal(sel.options[sel.selectedIndex].value, detail['title_right']);
                }
                */
                // detail['enable_bmap'] = true;
                // detail['img_src'] = 'http://bs.baidu.com/adtest/e95d4b929e1cb6938751645176a62178.jpg';
                detail['title_left'] = AD_CONFIG['9']['title_left'];
                detail['title_left_url'] = AD_CONFIG['9']['title_left_url']; // 'http://www.louisvuitton.cn/front/zhs_CN/%E4%B8%93%E5%8D%96%E5%BA%97?campaign=sem_BaiduBrandzone_0722_StrH1'
                list.refresh(null, detail);
                list.rewriteTitle2(null, detail['title_right'] + ' ', false);
                _detail = detail;
            }
        );

        ad.base.setTimeout(
            function(){
                var defaultValue = ad.base.getObjectByName('dependency.0.default', me.selectData);
                select.initByVal(defaultValue);
                /*
                var sel = select.getEleByName('store');
                setSelVal(defaultCity, sel.options[sel.selectedIndex].value);
                */
            },
            1000
        );

        /*
        function setSelVal(c, s){
            city = c;
            store = s;
        }
        */
    });
};

/**
 * 下拉框数据源
 * @type {Array.<Object>}
 */
ad.plugin.impl.Lv.prototype.selectData = {
    "dependency": [
        {
            "name": "city",
            "title": "城&nbsp;&nbsp;&nbsp;&nbsp;市",
            "default": "上海"
        },
        {
            "name": "store",
            "title": "专卖店"
        }
    ],
    "data": [
        {
            "text": "请选择*",
            "value": "null",
            "children": [
                {
                    "text": "请选择*",
                    "value": "null"
                }
            ]
        },
        {
            "text": "北京",
            "value": "北京",
            "children": [
                {
                    "text": "路易威登北京建外钟表珠宝店",
                    "value": "路易威登北京建外钟表珠宝店",
                    "data": {
                        "title_right": "路易威登北京建外钟表珠宝店",
                        "enable_bmap": false,
                        "addr": "北京市朝阳区建国门外大街2号院1号楼地上一层127号店铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京建外钟表珠宝店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登北京王府井店",
                    "value": "路易威登北京王府井店",
                    "data": {
                        "title_right": "路易威登北京王府井店",
                        "enable_bmap": false,
                        "addr": "中国北京市王府井金鱼胡同8号王府半岛酒店一层G2商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京王府半岛酒店专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登北京金融街专卖店",
                    "value": "路易威登北京金融街专卖店",
                    "data": {
                        "title_right": "路易威登北京金融街专卖店",
                        "enable_bmap": false,
                        "addr": "中国北京市西城区金城坊街2号金融街购物中心L131-132商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京金融街专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登北京新光天地精品店",
                    "value": "路易威登北京新光天地精品店",
                    "data": {
                        "title_right": "路易威登北京金融街专卖店",
                        "enable_bmap": false,
                        "addr": "北京市朝阳区建国路87号新光天地一层M1026号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京新光天地精品店?campaign=sem_BaiduBrandzone_0805_StrFi"
                    }
                },
                {
                    "text": "路易威登北京国贸商城旗舰店",
                    "value": "路易威登北京国贸商城旗舰店",
                    "data": {
                        "title_right": "路易威登北京国贸商城旗舰店",
                        "enable_bmap": false,
                        "addr": "中国北京市建国门外大街1号国贸商城L116商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京国贸商城旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "成都市",
            "value": "成都市",
            "children": [
                {
                    "text": "路易威登成都仁恒旗舰店",
                    "value": "路易威登成都仁恒旗舰店",
                    "data": {
                        "title_right": "路易威登成都仁恒旗舰店",
                        "enable_bmap": false,
                        "addr": "中国成都市人民南路二段1号仁恒置地广场L105商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-成都仁恒旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "重庆市",
            "value": "重庆市",
            "children": [
                {
                    "text": "路易威登重庆旗舰店",
                    "value": "路易威登重庆旗舰店",
                    "data": {
                        "title_right": "路易威登重庆旗舰店",
                        "enable_bmap": false,
                        "addr": "中国重庆市渝中区邹容路100号时代广场L101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-重庆旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "大连市",
            "value": "大连市",
            "children": [
                {
                    "text": "路易威登大连时代广场旗舰店",
                    "value": "路易威登大连时代广场旗舰店",
                    "data": {
                        "title_right": "路易威登大连时代广场旗舰店",
                        "enable_bmap": false,
                        "addr": "中国大连市中山区人民路50号时代广场L101,L201商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-大连时代广场旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "福州市",
            "value": "福州市",
            "children": [
                {
                    "text": "路易威登福州店",
                    "value": "路易威登福州店",
                    "data": {
                        "title_right": "路易威登福州店",
                        "enable_bmap": false,
                        "addr": "中国福州市八一七北路268号大洋晶典118商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-福州店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "广州市",
            "value": "广州市",
            "children": [
                {
                    "text": "路易威登广州丽柏广场专卖店",
                    "value": "路易威登广州丽柏广场专卖店",
                    "data": {
                        "title_right": "路易威登广州丽柏广场专卖店",
                        "enable_bmap": false,
                        "addr": "中国广州市环市东路367号丽柏广场101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-广州丽柏广场专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登广州天河旗舰店",
                    "value": "路易威登广州天河旗舰店",
                    "data": {
                        "title_right": "路易威登广州天河旗舰店",
                        "enable_bmap": false,
                        "addr": "中国广州市天河路383号太古汇L101,L201商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-广州天河旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "哈尔滨市",
            "value": "哈尔滨市",
            "children": [
                {
                    "text": "路易威登哈尔滨麦凯乐专卖店",
                    "value": "路易威登哈尔滨麦凯乐专卖店",
                    "data": {
                        "title_right": "路易威登哈尔滨麦凯乐专卖店",
                        "enable_bmap": false,
                        "addr": "中国哈尔滨市道里区尚志大街73号麦凯乐哈尔滨总店105商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-哈尔滨麦凯乐专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登哈尔滨卓展旗舰店",
                    "value": "路易威登哈尔滨卓展旗舰店",
                    "data": {
                        "title_right": "路易威登哈尔滨卓展旗舰店",
                        "enable_bmap": false,
                        "addr": "中国哈尔滨市道里区安隆街106号卓展购物中心1101及1123",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-哈尔滨卓展旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "杭州市",
            "value": "杭州市",
            "children": [
                {
                    "text": "路易威登杭州大厦专卖店",
                    "value": "路易威登杭州大厦专卖店",
                    "data": {
                        "title_right": "路易威登杭州大厦专卖店",
                        "enable_bmap": false,
                        "addr": "中国杭州市武林广场1号杭州大厦购物中心B座1号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-杭州大厦专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登杭州江干旗舰店",
                    "value": "路易威登杭州江干旗舰店",
                    "data": {
                        "title_right": "路易威登杭州江干旗舰店",
                        "enable_bmap": false,
                        "addr": "中国杭州市江干区富春路701号万象城138号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-杭州江干旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "合肥市",
            "value": "合肥市",
            "children": [
                {
                    "text": "路易威登合肥银泰中心店",
                    "value": "路易威登合肥银泰中心店",
                    "data": {
                        "title_right": "路易威登合肥银泰中心店",
                        "enable_bmap": false,
                        "addr": "中国合肥市庐阳区长江中路98号合肥银泰中心L101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-合肥银泰中心店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "呼和浩特市",
            "value": "呼和浩特市",
            "children": [
                {
                    "text": "路易威登呼和浩特香格里拉酒店专卖店",
                    "value": "路易威登呼和浩特香格里拉酒店专卖店",
                    "data": {
                        "title_right": "路易威登呼和浩特香格里拉酒店专卖店",
                        "enable_bmap": false,
                        "addr": "呼和浩特市锡林郭勒南路5号香格里拉酒店一层D-E号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-呼和浩特香格里拉酒店专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "昆明市",
            "value": "昆明市",
            "children": [
                {
                    "text": "路易威登昆明金格中心专卖店",
                    "value": "路易威登昆明金格中心专卖店",
                    "data": {
                        "title_right": "路易威登昆明金格中心专卖店",
                        "enable_bmap": false,
                        "addr": "中国昆明市东风东路9号金格中心一层L101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-昆明金格中心专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登昆明盘龙旗舰店",
                    "value": "路易威登昆明盘龙旗舰店",
                    "data": {
                        "title_right": "路易威登昆明盘龙旗舰店",
                        "enable_bmap": false,
                        "addr": "昆明市盘龙区北京路985号金格百货时光店F1026商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-昆明盘龙旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "南京市",
            "value": "南京市",
            "children": [
                {
                    "text": "路易威登南京德基广场旗舰店",
                    "value": "路易威登南京德基广场旗舰店",
                    "data": {
                        "title_right": "路易威登南京德基广场旗舰店",
                        "enable_bmap": false,
                        "addr": "中国南京市中山路18号德基广场L101,L102,L201,L202商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-南京德基广场旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "南宁市",
            "value": "南宁市",
            "children": [
                {
                    "text": "路易威登南宁店",
                    "value": "路易威登南宁店",
                    "data": {
                        "title_right": "路易威登南宁店",
                        "enable_bmap": false,
                        "addr": "中国南宁市青秀区七星路137号梦之岛购物中心L101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-南宁店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "宁波市",
            "value": "宁波市",
            "children": [
                {
                    "text": "路易威登宁波和义大道旗舰店",
                    "value": "路易威登宁波和义大道旗舰店",
                    "data": {
                        "title_right": "路易威登宁波和义大道旗舰店",
                        "enable_bmap": false,
                        "addr": "中国宁波市和义路50号和义大道购物中心A区1003,2005商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-宁波和义大道旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "青岛市",
            "value": "青岛市",
            "children": [
                {
                    "text": "路易威登青岛海信广场专卖店",
                    "value": "路易威登青岛海信广场专卖店",
                    "data": {
                        "title_right": "路易威登青岛海信广场专卖店",
                        "enable_bmap": false,
                        "addr": "中国青岛市澳门路117号海信广场一层125/127商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-青岛海信广场专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "三亚市",
            "value": "三亚市",
            "children": [
                {
                    "text": "路易威登三亚亚龙湾专卖店",
                    "value": "路易威登三亚亚龙湾专卖店",
                    "data": {
                        "title_right": "路易威登三亚亚龙湾专卖店",
                        "enable_bmap": false,
                        "addr": "中国三亚市亚龙湾国家旅游度假区金茂三亚丽思卡尔顿酒店R1-1号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-三亚亚龙湾专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "厦门市",
            "value": "厦门市",
            "children": [
                {
                    "text": "路易威登厦门马可波罗专卖店",
                    "value": "路易威登厦门马可波罗专卖店",
                    "data": {
                        "title_right": "路易威登厦门马可波罗专卖店",
                        "enable_bmap": false,
                        "addr": "中国厦门市湖滨北建业路8号马哥孛罗东方大酒店1号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-厦门马可波罗专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "上海",
            "value": "上海",
            "children": [
                {
                    "text": "上海恒隆广场路易威登之家",
                    "value": "上海恒隆广场路易威登之家",
                    "data": {
                        "title_right": "上海恒隆广场路易威登之家",
                        "enable_bmap": false,
                        "addr": "中国上海市南京西路1266号恒隆广场136-138商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/上海恒隆广场路易威登之家?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登上海浦东旗舰店",
                    "value": "路易威登上海浦东旗舰店",
                    "data": {
                        "title_right": "路易威登上海浦东旗舰店",
                        "enable_bmap": false,
                        "addr": "上海市浦东新区世纪大道8号上海国金中心D座L1-1商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-上海浦东旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登上海淮海旗舰店",
                    "value": "路易威登上海淮海旗舰店",
                    "data": {
                        "title_right": "路易威登上海淮海旗舰店",
                        "enable_bmap": false,
                        "addr": "中国上海市卢湾区淮海中路222号力宝广场105商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-上海淮海旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登上海虹桥店",
                    "value": "路易威登上海虹桥店",
                    "data": {
                        "title_right": "路易威登上海虹桥店",
                        "enable_bmap": false,
                        "addr": "中国上海市长宁区仙霞路99号尚嘉中心L101/LG101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-上海虹桥店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "深圳市",
            "value": "深圳市",
            "children": [
                {
                    "text": "路易威登深圳罗湖旗舰店",
                    "value": "路易威登深圳罗湖旗舰店",
                    "data": {
                        "title_right": "路易威登深圳罗湖旗舰店",
                        "enable_bmap": false,
                        "addr": "中国深圳市罗湖区宝安南路1881号华润中心万象城S101商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-深圳罗湖旗舰店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "沈阳市",
            "value": "沈阳市",
            "children": [
                {
                    "text": "路易威登沈阳卓展女士专卖店",
                    "value": "路易威登沈阳卓展女士专卖店",
                    "data": {
                        "title_right": "路易威登沈阳卓展女士专卖店",
                        "enable_bmap": false,
                        "addr": "中国沈阳市沈河区北京街7-1号卓展购物中心1101-01及02商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳卓展女士专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登沈阳卓越男士专卖店",
                    "value": "路易威登沈阳卓越男士专卖店",
                    "data": {
                        "title_right": "路易威登沈阳卓越男士专卖店",
                        "enable_bmap": false,
                        "addr": "中国沈阳市沈河区惠工街12号卓展购物中心卓越精品馆101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳卓越男士专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登沈阳沈河专卖店",
                    "value": "路易威登沈阳沈河专卖店",
                    "data": {
                        "title_right": "路易威登沈阳沈河专卖店",
                        "enable_bmap": false,
                        "addr": "中国沈阳市沈河区青年大街211号久丽百货1001商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳沈河专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登沈阳万象城店",
                    "value": "路易威登沈阳万象城店",
                    "data": {
                        "title_right": "路易威登沈阳万象城店",
                        "enable_bmap": false,
                        "addr": "中国沈阳市和平区青年大街288号万象城N101,N201号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳万象城店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "石家庄市",
            "value": "石家庄市",
            "children": [
                {
                    "text": "路易威登石家庄专卖店",
                    "value": "路易威登石家庄专卖店",
                    "data": {
                        "title_right": "路易威登石家庄专卖店",
                        "enable_bmap": false,
                        "addr": "中国石家庄市长安区育才街58号开元花园先天下购物中心一层",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-石家庄专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "苏州市",
            "value": "苏州市",
            "children": [
                {
                    "text": "路易威登苏州泰华商城专卖店",
                    "value": "路易威登苏州泰华商城专卖店",
                    "data": {
                        "title_right": "路易威登苏州泰华商城专卖店",
                        "enable_bmap": false,
                        "addr": "中国苏州市人民路383号泰华商城西楼101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-苏州泰华商城专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "太原市",
            "value": "太原市",
            "children": [
                {
                    "text": "路易威登太原华宇国际精品商厦专卖店",
                    "value": "路易威登太原华宇国际精品商厦专卖店",
                    "data": {
                        "title_right": "路易威登太原华宇国际精品商厦专卖店",
                        "enable_bmap": false,
                        "addr": "中国太原市府西街45号华宇国际精品商厦101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-太原华宇国际精品商厦专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "天津市",
            "value": "天津市",
            "children": [
                {
                    "text": "路易威登天津友谊商厦专卖店",
                    "value": "路易威登天津友谊商厦专卖店",
                    "data": {
                        "title_right": "路易威登天津友谊商厦专卖店",
                        "enable_bmap": false,
                        "addr": "中国天津市河西区友谊路21号友谊商厦一层L1商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-天津友谊商厦专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "温州市",
            "value": "温州市",
            "children": [
                {
                    "text": "路易威登温州华侨饭店专卖店",
                    "value": "路易威登温州华侨饭店专卖店",
                    "data": {
                        "title_right": "路易威登温州华侨饭店专卖店",
                        "enable_bmap": false,
                        "addr": "中国温州市信河街17号华侨饭店国际名品广场103, 203商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-温州华侨饭店国际名品广场专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "乌鲁木齐市",
            "value": "乌鲁木齐市",
            "children": [
                {
                    "text": "路易威登乌鲁木齐美美百货专卖店",
                    "value": "路易威登乌鲁木齐美美百货专卖店",
                    "data": {
                        "title_right": "路易威登乌鲁木齐美美百货专卖店",
                        "enable_bmap": false,
                        "addr": "中国乌鲁木齐市友好北路589号友好步行街美美百货N100商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-乌鲁木齐美美百货专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "无锡市",
            "value": "无锡市",
            "children": [
                {
                    "text": "路易威登无锡八佰伴商厦专卖店",
                    "value": "路易威登无锡八佰伴商厦专卖店",
                    "data": {
                        "title_right": "路易威登无锡八佰伴商厦专卖店",
                        "enable_bmap": false,
                        "addr": "中国无锡市中山路168号八佰伴商厦A101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-无锡八佰伴商厦专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "武汉市",
            "value": "武汉市",
            "children": [
                {
                    "text": "路易威登武汉时代广场专卖店",
                    "value": "路易威登武汉时代广场专卖店",
                    "data": {
                        "title_right": "路易威登武汉时代广场专卖店",
                        "enable_bmap": false,
                        "addr": "中国武汉市江岸区沿江大道160号时代广场时代一号一层1-3号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-武汉时代广场专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                },
                {
                    "text": "路易威登武汉国际广场专卖店",
                    "value": "路易威登武汉国际广场专卖店",
                    "data": {
                        "title_right": "路易威登武汉国际广场专卖店",
                        "enable_bmap": false,
                        "addr": "中国江汉区解放大道690号武汉国际广场一层B区1-2号商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "9:30 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-武汉国际广场专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "西安市",
            "value": "西安市",
            "children": [
                {
                    "text": "路易威登西安中大国际专卖店",
                    "value": "路易威登西安中大国际专卖店",
                    "data": {
                        "title_right": "路易威登西安中大国际专卖店",
                        "enable_bmap": false,
                        "addr": "中国西安市南大街30号中大国际AG01/A101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-西安中大国际专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "长春市",
            "value": "长春市",
            "children": [
                {
                    "text": "路易威登长春卓展购物中心专卖店",
                    "value": "路易威登长春卓展购物中心专卖店",
                    "data": {
                        "title_right": "路易威登长春卓展购物中心专卖店",
                        "enable_bmap": false,
                        "addr": "中国长春市重庆路1255号卓展购物中心A104-A107商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-长春卓展购物中心专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "长沙市",
            "value": "长沙市",
            "children": [
                {
                    "text": "路易威登长沙美美百货专卖店",
                    "value": "路易威登长沙美美百货专卖店",
                    "data": {
                        "title_right": "路易威登长沙美美百货专卖店",
                        "enable_bmap": false,
                        "addr": "中国长沙市芙蓉中路一段478号美美百货101商铺",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-长沙美美百货专卖店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        },
        {
            "text": "郑州市",
            "value": "郑州市",
            "children": [
                {
                    "text": "路易威登郑州店",
                    "value": "路易威登郑州店",
                    "data": {
                        "title_right": "路易威登郑州店",
                        "enable_bmap": false,
                        "addr": "中国郑州市中原中路220号裕达福福精品商厦L101商铺 ",
                        "tel": "+86 400 6588 555",
                        "opening": "10:00 - 22:00",
                        "url": "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-郑州店?campaign=sem_BaiduBrandzone_0722_StrFi"
                    }
                }
            ]
        }
    ]
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

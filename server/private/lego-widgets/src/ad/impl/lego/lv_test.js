/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: lv_test.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/lv_test.js ~ 2012/06/06 11:47:13
 * @author songao(songao@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.lego');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.lv.List');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Table');
goog.require('ui.events');
goog.include('ad/impl/lego/lv_test.less');

goog.provide('ad.impl.lego.LvTest');

ad.Debug(function() {
    var id = ad.lego.getId();
    var material = new ad.material.BaseMaterial(id);

    var arrTabWidget = [];
    var ic1 = new ad.widget.ImageCartoon(AD_CONFIG['img_group'][0]);
    var ic2 = new ad.widget.ImageCartoon(AD_CONFIG['img_group'][1]);

    arrTabWidget.push(ic1);
    arrTabWidget.push(ic2);

    var select = new ad.widget.DependencySelect(AD_CONFIG['select']);
    var list = new ad.widget.lv.List({});
    var nc = new ad.widget.NormalContainer({});
    nc.setWidgets([list, select]);
    arrTabWidget.push(nc);
    var nc2 = new ad.widget.NormalContainer({});
    var table1 = new ad.widget.Table(AD_CONFIG['table'][0]);
    var table2 = new ad.widget.Table(AD_CONFIG['table'][1]);
    nc2.setWidgets([table1, table2]);
    arrTabWidget.push(nc2);
    //arrTabWidget.push(new ad.widget.Table(AD_CONFIG['table'][0]));
    arrTabWidget.push(new ad.widget.SmallWeibo(AD_CONFIG['weibo']));
    if(AD_CONFIG['img_group'][2]){
        arrTabWidget.push(new ad.widget.ImageCartoon(AD_CONFIG['img_group'][2]));
    }
    var tc = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tc.setWidgets(arrTabWidget);

    var bg1 = new ad.widget.ButtonGroup(AD_CONFIG['bottons'][0]);
    var bg2 = new ad.widget.ButtonGroup(AD_CONFIG['bottons'][1]);

    var fwc_select = new ad.widget.DependencySelect(AD_CONFIG['select']);
    var bMap = new ad.widget.Bmap(AD_CONFIG['map']);
    AD_CONFIG['fwc']['material_name'] = 'lv'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);

    fwc.setWidgets([fwc_select, bMap]);
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
            [new ad.widget.SmallHead(AD_CONFIG['head']), bg1, bg2],
            [fwc]
        ],
        [tc]
    );

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(material) {
        bg1.rewriteTitle2(null,'第一行 ');
        bg2.rewriteTitle2(null,'第二行 ');
        table1.rewriteTitle2(null,'女士 ');
        table2.rewriteTitle2(null,'男士 ');
        ic1.rewriteTitle2(null,'tab1 ');
        ic2.rewriteTitle2(null,'tab2 ');

        var city,store,_detail;

        select.addListener(ui.events.CHANGE, function(city, shop, depth){
            var detail;
            var sel = select.getEleByName('city');
            if(depth == 0){
                detail = shop[0];
                setSelVal(sel.options[sel.selectedIndex].value, detail['title_right']);
            }
            else{
                var sIndex = city[1]['selectedIndex'];
                detail = shop[sIndex]['children'][0];
                setSelVal(sel.options[sel.selectedIndex].value, detail['title_right']);
            }
            detail['enable_bmap'] = true;
            detail['img_src'] = 'http://bs.baidu.com/adtest/e95d4b929e1cb6938751645176a62178.jpg';
            detail['title_left_url'] = 'http://www.louisvuitton.cn/front/zhs_CN/专卖店?campaign=sem_BaiduBrandzone_0401_StrH1';
            list.refresh(null,detail);
            list.rewriteTitle2(null,detail['title_right'] + ' ',false);

            _detail = detail;
        });

        ad.base.setTimeout(function(){
            var defaultCity = '上海';
            select.initByVal(defaultCity);
            var sel = select.getEleByName('store');
            //sel.value = '路易威登上海淮海旗舰店';
            setSelVal(defaultCity, sel.options[sel.selectedIndex].value);
        },1000);

        function setSelVal(c, s){
            city = c;
            store = s;
        }

        list.addListener(ui.events.CLICK, function(){
            this.sendLog('openfloat');
            fwc.show();
            fwc_select.initByVal(city);
            fwc_select.getEleByName('store').value = store;
            showMap(_detail);
        });

        function showMap(detail){
            var point = {
                'lng': detail['lng'],
                'lat': detail['lat'],
                'title': detail['title_right'],
                'logo': '',
                'address': detail['addr'],
                'tel': detail['tel'],
                'info': ''
            };
            bMap.hideAllMarkers();
            bMap.moveToCity(city);
            bMap.addMarkerByAddress(city, point['address'], true, point);
        }
    });

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

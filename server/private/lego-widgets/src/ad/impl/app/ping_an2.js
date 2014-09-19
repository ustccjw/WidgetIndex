/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/app/ping_an2.js ~ 2013/12/11 14:16:52
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * 车险计算器
 * ping_an2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.include('ad/impl/app/ping_an2.less');

goog.provide('ad.impl.app.PingAn2');

ad.Debug(function(async){
    var htmlCode = '<div id="chexian_canvas"><div id="chexian" class="app_container simple"><div class="app_body"><form id="car_form" action="#" method="GET" target="_blank"><div class="field company" id="company"><div class="label">选择保险公司</div><div class="content"><div class="fortip"><a href="javascript:;" id="pingan" class="button" index="0"><img src="//bs.baidu.com/adtest/0d79814a017cda83feb9e2744170546e.jpg"><i class="clicked"></i></a><div class="tip">平安官网车险不仅多省15%,买车险加油低至9折!<i></i></div></div><div class="fortip"><a href="javascript:;" id="taibao" class="button" index="1"><img src="//bs.baidu.com/adtest/16191e2faa248bfbe1aae644c7b02e5a.jpg"><i class="clicked"></i></a><div class="tip">太平洋保险官网投保立省15%,更享免费酒后代驾服务<i></i></div></div><div class="fortip"><a href="javascript:;" id="yangguang" class="button" index="2"><img src="//bs.baidu.com/adtest/c38cec4fe3a39bb1f7288b88c8c8fc20.jpg"><i class="clicked"></i></a><div class="tip">[惠]车险满立减，高至600！全网底价,马上来计算！<i></i></div></div></div></div><div class="field"><div class="label">车辆行驶城市</div><div class="content"><div class="select-box soSelect" id="car_province_box"><input id="car_province" name="province_code" origin-name="province_code"></div><div class="select-box soSelect" id="car_city_box"><input id="car_city" name="city_code" origin-name="city_code"></div></div></div><div id="submit"><input type="submit" id="submitBtn" value=""></div></form></div></div><div id="error" style="background: url(//bs.baidu.com/adtest/932c4b53822ea2355fe3aa3517d6c844.gif) no-repeat scroll 3px 4px rgb(255, 242, 242); border: 1px solid rgb(255, 191, 191); font-size: 12px; line-height: 16px; margin: 0px; padding: 2px 0px 2px 20px; position: absolute; left: 100px; visibility: hidden; z-index: 200; width:86px;"></div><iframe id="bg_of_error" src="javascript:false;" scrolling="no" frameborder="0"style="position:absolute; top:0px; left:0px; visibility: hidden;"></iframe></div>';
    var material = new ad.material.BaseMaterial();
    material.setWidgets();
    material.getMainHtml = function() {
        return htmlCode;
    };

    if (async === true) {
        return material;
    }

    material.show();
    baidu.sio.callByBrowser('//bs.baidu.com/adtest/9533ecfe2dffec7ce0c07a00758e12c3.js');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

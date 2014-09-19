/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/ylzx/left.js ~ 2013/10/31 12:47:31
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * left相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.gx_sck.ylzx.HospitalInfo');
goog.require('ad.widget.gx_sck.ylzx.DoctorInfo');

goog.include('ad/impl/galaxy/ylzx/left.less');

goog.provide('ad.impl.galaxy.ylzx.Left');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    //2个widget共享一些数据
    var site = AD_CONFIG['hospital_info']['site'];
    var sign = AD_CONFIG['hospital_info']['sign'];
    var consultRCVUrl = AD_CONFIG['hospital_info']['consult_rcv_url'];
    AD_CONFIG['doctor_info']['site'] = site;
    //v标
    AD_CONFIG['doctor_info']['sign'] = sign;
    AD_CONFIG['doctor_info']['consult_rcv_url'] = consultRCVUrl;

    var hospitalInfo = new ad.widget.gx_sck.ylzx.HospitalInfo(AD_CONFIG['hospital_info']);
    var doctorInfo = new ad.widget.gx_sck.ylzx.DoctorInfo(AD_CONFIG['doctor_info']);
    material.setWidgets(
        [hospitalInfo],
        [doctorInfo]
    );
    if (async === true) {
        return material;
    }
    material.show();

    //官网
    window['ecom_gx_ylzx_info'] = function(data){
        if(data){
            if(data['is_show_site']){
                hospitalInfo.showSite();
            }
        }
    }

    baidu.sio.callByServer(AD_CONFIG['ader_info'], function(){});
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */

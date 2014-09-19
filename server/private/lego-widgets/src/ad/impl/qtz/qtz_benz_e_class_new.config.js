/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/impl/qtz/qtz_benz_e_class_new.config.js ~ 2013/08/12 16:35:41
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * qtz_benz_e_class_new的配置数据
 **/

var AD_CONFIG = {
    "id": "pl_r_67579",
    'adid': "20130929_benz_qtz",
    "qtz": {
        'width': 175,
        'height': 300,
        'wmode': 'opaque',
        //'src': "http://eiv.baidu.com/mapm2/benchiE/130829_pl_01/176.swf",
        'src': "//bs.baidu.com/adtest/80e79e06ef5d4b552ead2ca06912cada.swf",     //2013-09-28 buick
        //'src': "//bs.baidu.com/adtest/3a2bad619abc2bf5078015f249584226.swf",     //2013-09-28 benz
        'link_rcv_url': 'http://ad.doubleclick.net/clk;276331054;103511136;n?http://newregal.buick.com.cn/?utm_source=baidu-crazyBZ-banner&utm_medium=SGMMRK2013261&utm_campaign=newregal-baidu-crazybz', //2013-09-28 buick
        // 'link_rcv_url': '#',
        'ipad_img': '//bs.baidu.com/adtest/2c4746796ce9fc95ca9606e7b0c8e089.jpg',
        'ipad_link_rcv_url':'http://special.mercedes-benz.com.cn/E-Class/china/'
    },
    "fwc": {
        has_close_btn: false,
        click_to_close: true,
        "background-color": "#000",
        opacity: "0.8"
    },
    "flash": {
        is_flashvars: true,
        width: "100%",
        height: "100%",
        wmode: "transparent",
        ipad_img: '//bs.baidu.com/adtest/2c4746796ce9fc95ca9606e7b0c8e089.jpg',
        src: "//bs.baidu.com/adtest/99fcda73b7fe3919f288b39ed819df2f.swf" //2013-09-27 buick
        //src: "//bs.baidu.com/adtest/22dc63a3f58cd8ba588225c598620bb3.swf" //2013-09-28 benz
        //src: "//bs.baidu.com/adtest/99cff07a28a7b657c15edb6566cc44fe.swf"
        //for Benz: //bs.baidu.com/adtest/b7e0d86a9e11c90ce474ebf3c7938ca5.swf
        //for EClass: //bs.baidu.com/adtest/99cff07a28a7b657c15edb6566cc44fe.swf
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
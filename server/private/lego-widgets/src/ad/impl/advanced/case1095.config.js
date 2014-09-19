/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1095.config.js ~ 2013/11/06 17:22:49
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1095的配置数据
 **/

var AD_CONFIG = {
    "id": "ec-ma-8964", 
    "main_url": "http://www.baidu.com",
    "video": {
        "rcv_url": "http://sagitar.faw-vw.com/sagitargli.php",
        "img_url": "//bs.baidu.com/adcoup-mat/1da12f63-87bc-455d-9efe-8497b8216b63.jpg",
        "video_url": "//bs.baidu.com/adcoup-mat/c717a99c-c500-41a8-bbd2-d297ee82cc89.flv",
        "ipad_img": "http://eiv.baidu.com/mapm2/bmw/120523_pl_01/sp.jpg",
        "width":220,
        "is_play": false,
        "height":190
    },
    "small_head": {
        "titletext" : "一汽-大众<em>速腾GLI &nbsp; </em>",
        "titleurl_rcv_url" : "http://sagitar.faw-vw.com/sagitargli.php",
        "description_rcv_html": "前所未有的生命力，瞬间唤醒，激越无限可能！灵感、动感、质感，超越想象的感观震撼！速腾GLI，激情天成！",
        "site" : "sagitar.faw-vw.com"
    },
    "weibo": {
        "type": {
            "sina": {
                "id": "1879279655",
                "follow_imgsrc": "//bs.baidu.com/adtest/f8baf6bfbab6fb8c07f8f7cc1345a8dc.jpg"
            },
            "qq": {
                "id": "paff_1983",
                "follow_imgsrc": "//bs.baidu.com/adtest/f8baf6bfbab6fb8c07f8f7cc1345a8dc.jpg"
            }
        }
    },
    "button_group": {
        "options" : [
            {
                "text" : "360度观车",
                "rcv_url" : "www.baidu1.com"
            },{
                "text" : "产品介绍",
                "rcv_url" : "www.baidu2.com"
            },{
                "text" : "参数配置",
                "rcv_url" : "www.baidu3.com"
            },{
                "text" : "预约试驾",
                "rcv_url" : "www.baidu4.com"
            },{
                "text" : "订车与报价",
                "rcv_url" : "www.baidu4.com"
            }
        ]
    },
    "image_cartoon": {
        "disable": false, //有时候需求不需要启用动画
        "image_width": 92,
        "options" : [{
            "imgsrc": "//bs.baidu.com/adcoup-mat/157bbadc-751c-43ee-a804-e801c79a899b.jpg",
            "imgurl_rcv_url" : "http://www.baidu.com"
        },{
            "imgsrc": "//bs.baidu.com/adcoup-mat/264f6d2a-e28f-4256-be0e-0ec7aaa9803f.jpg",
            "imgurl_rcv_url" : "http://www.baidu.com"
        },{
            "imgsrc": "//bs.baidu.com/adcoup-mat/3ea583c5-cbfc-4630-a3af-2d718388bd39.jpg",
            "imgurl_rcv_url" : "http://www.baidu.com"
        },{
            "imgsrc": "//bs.baidu.com/adcoup-mat/0c7a0755-d739-4e0e-8f48-6a5ee562e3c4.jpg",
            "imgurl_rcv_url" : "http://www.baidu.com"
        },{
            "imgsrc": "//bs.baidu.com/adcoup-mat/21ba0813-d7b7-4f6d-ba68-799135fa154f.jpg",
            "imgurl_rcv_url" : "http://www.baidu.com"
        }/*,{
            "imgsrc" : "http://dummyimage.com/92x96/bbb/ccc&text=6",
            "imgurl_rcv_url" : "http://www.baidu.com",
            "linktext" : "最新资讯"
        },{
            "imgsrc" : "http://dummyimage.com/92x96/ccc/ddd&text=7",
            "imgurl_rcv_url" : "http://www.baidu.com",
            "linktext" : "最新动画"
        },{
            "imgsrc" : "http://dummyimage.com/92x96/ddd/eee&text=8",
            "imgurl_rcv_url" : "http://www.baidu.com",
            "linktext" : "新品上市"
        },{
            "imgsrc" : "http://dummyimage.com/92x96/eee/fff&text=9",
            "imgurl_rcv_url" : "http://www.baidu.com",
            "linktext" : "专卖店"
        },{
            "imgsrc" : "http://dummyimage.com/92x96/fff/aaa&text=10",
            "imgurl_rcv_url" : "http://www.baidu.com",
            "linktext" : "直击秀场"
        }*/],
        "left_arrow": "//bs.baidu.com/adtest/edac424f5c1b02a723a2343410912e3a.png",
        "right_arrow": "//bs.baidu.com/adtest/fe80eb774d47f0eee91d805575f59ce8.png"
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

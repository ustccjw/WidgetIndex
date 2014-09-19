/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_roller2.config.js ~ 2013/06/18 15:56:24
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_roller2的配置数据
 **/
var AD_CONFIG = {
    "slider": {
        'width':646, //图片宽度
        'height':210, //图片高度
        'delay':200, //切换选择时的延时响应时间
        'interval_time':4000, //自动切换时间间隔 =0表示不自动切换
        'mode':'horizontal', //'mode':'vertical'|'horizontal'|'normal' 图片展示模式：垂直滚动、水平滚动、无动画效果
        'first_show_index':0, //首次载入的图片索引
        'options':[
            {
                'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Maina1.jpg',
                'rcv_url':'http://c.admaster.com.cn/c/a13067,b200165660,c2005,i0,m101,h'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Maina2.jpg',
                'rcv_url':'http://c.admaster.com.cn/c/a13067,b200165660,c2005,i0,m101,h'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Maina3.jpg',
                'rcv_url':'http://c.admaster.com.cn/c/a13067,b200165660,c2005,i0,m101,h'
            },
            {
                'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Maina4.jpg',
                'rcv_url':'http://c.admaster.com.cn/c/a13067,b200165660,c2005,i0,m101,h'
            }
        ]
    },
    // 右侧4张小图片
    "image_grid": {
        "column": 2,        // [必填]每行grid数
        "grid_width": 140,  // [必填]单个图片宽度(px)
        "grid_height": 103,  // [必填]单个图片高度(px)
        "row_gap": 4,       // [必填]每行之间的间隔
        "column_gap": 4,    // [必填]每列之间的间隔
        "grids": [
            {
                "rcv_url": "http://c.admaster.com.cn/c/a13067,b200165665,c2005,i0,m101,h",  // 左上小图地址
                "img_url" : "http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt1.jpg"
                /*"info": "Baidu.com",                                                // [可选]没有信息则不填
                "space": "1x3"*/                                                      // [可选]当前图片所占格数
            },
            {
                "rcv_url": "http://c.admaster.com.cn/c/a13067,b200165666,c2005,i0,m101,h",  // 右上小图地址
                "img_url" : "http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt2.jpg"
            },
            {
                "rcv_url": "http://c.admaster.com.cn/c/a13067,b200165667,c2005,i0,m101,h",  // 左下小图地址
                "img_url" : "http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt3.jpg"
            },
            {
                "rcv_url": "http://c.admaster.com.cn/c/a13067,b200165668,c2005,i0,m101,h",  // 右下小图地址
                "img_url" : "http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt4.jpg"
            }
        ]
    },
    "image": {
        "image_rcv_url" : "javascript:void(0);",
        "image_url" : "http://eiv.baidu.com/mapm2/0108baoma1/lg.gif"
    },
    // 背景图片
    "background": {
        "primary": {
            "url": "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj1.jpg",
            "repeat": "no-repeat",
            "position": "top center",
            "height": 350
        }/*,
        // 重复的辅助背景图片（主要用于过度）（如果不需要则不用设置）
        secondary: {
            url: "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj2.jpg",
            repeat: "repeat-x",
            position: "center 600px",
            height: 1020
        }*/
    },
    "copy" : "COACH的推广文案"
};





/* vim: set ts=4 sw=4 sts=4 tw=100: */

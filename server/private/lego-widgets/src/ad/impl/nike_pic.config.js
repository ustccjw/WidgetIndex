/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nike_pic.config.js ~ 2013/02/26 14:02:12
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * nike_pic的配置数据
 **/

var AD_CONFIG = {
    "id": "pl-nike-pic",
    "main_url": "http://c.admaster.com.cn/c/a13067,b200165660,c2005,i0,m101,h",
    "jingsuan": "b0961f87ac4a5a5010e0006168a8dc9c",
    "top_background": {
        "primary": {
            "url": "http://eiv.baidu.com/mapm2/zhouminming01/nike/backgd2.jpg",
            "repeat": "no-repeat",
            "position": "top center",
            "color": "#FFF",
            "height": 410
        },
        "secondary": {
            "url": "http://eiv.baidu.com/mapm2/zhouminming01/nike/backgd1.jpg",
            "repeat": "no-repeat",
            "position": "top center",
            "color": "transparent",
            "height": 100
        }
    },
    // 轮播
    "slider": {
        'width':660, //图片宽度
        'height':200, //图片高度
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
        'column': 2,        // [必填]每行grid数
        'grid_width': 140,  // [必填]单个图片宽度(px)
        'grid_height': 98,  // [必填]单个图片高度(px)
        'row_gap': 4,       // [必填]每行之间的间隔
        'column_gap': 4,    // [必填]每列之间的间隔
        'grids': [
            {
                'rcv_url': 'http://c.admaster.com.cn/c/a13067,b200165665,c2005,i0,m101,h',  // 左上小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt1.jpg'
            },
            {
                'rcv_url': 'http://c.admaster.com.cn/c/a13067,b200165666,c2005,i0,m101,h',  // 右上小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt2.jpg'
            },
            {
                'rcv_url': 'http://c.admaster.com.cn/c/a13067,b200165667,c2005,i0,m101,h',  // 左下小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt3.jpg'
            },
            {
                'rcv_url': 'http://c.admaster.com.cn/c/a13067,b200165668,c2005,i0,m101,h',  // 右下小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/nike/pic/Rignt4.jpg'
            }
        ]
    },
    "image": {
        'url' : 'javascript:void(0);',
        'image_url' : 'http://eiv.baidu.com/mapm2/0108baoma1/lg.gif'
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

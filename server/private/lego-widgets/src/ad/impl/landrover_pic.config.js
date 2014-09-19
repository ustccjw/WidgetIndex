/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landrover_pic.config.js ~ 2013/04/18 12:47:45
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * landrover_pic的配置数据
 **/

var AD_CONFIG = {
    "id": "pl-landrover-pic",
    "main_url": "http://ad-apac.doubleclick.net/clk;271253879;97158229;a?http://www.landrover.com/cn/zh/lr/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner",
    "top_background": {
        "primary": {
            "url": "http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/background.jpg",
            "repeat": "no-repeat",
            "position": "top center",
            "color": "#FFF",
            "height": 1037
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
                'img_url':'http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/main1.jpg',
                'url':'http://ad-apac.doubleclick.net/clk;271253879;97158229;a?http://www.landrover.com/cn/zh/lr/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner'
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
                'url': 'http://ad-apac.doubleclick.net/clk;271253894;97158235;u?http://www.landrover.com/cn/zh/lr/all-new-range-rover/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner',  // 左上小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/pic1.jpg',
                'info': '全新一代揽胜'
            },
            {
                'url': 'http://ad-apac.doubleclick.net/clk;271253875;97158226;t?http://www.landrover.com/cn/zh/lr/range-rover-evoque/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner',  // 右上小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/pic2.jpg',
                'info': '揽胜极光'
            },
            {
                'url': 'http://ad-apac.doubleclick.net/clk;271253882;97158229;u?http://www.landrover.com/cn/zh/lr/discovery4/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner',  // 左下小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/pic3.jpg',
                'info': '第四代发现'
            },
            {
                'url': 'http://ad-apac.doubleclick.net/clk;271253890;97158234;p?http://www.landrover.com/cn/zh/lr/freelander-2/?utm_campaign=13_SHAS&utm_source=Baidu_Picture_Zone&utm_medium=banner',  // 右下小图地址
                'img_url' : 'http://eiv.baidu.com/mapm2/zhouminming01/landrover/pic/pic4.jpg',
                'info': '神行者2代'
            }
        ]
    },
    "image": {
        'url' : 'javascript:void(0);',
        'image_url' : 'http://eiv.baidu.com/mapm2/0108baoma1/lg.gif'
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

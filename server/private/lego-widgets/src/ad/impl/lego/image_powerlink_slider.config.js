/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lego/image_powerlink_slider.config.js ~ 2013/06/19 20:11:51
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * image_powerlink_slider的配置数据
 **/
var AD_CONFIG = {
    "0": {
        'width':950,            // 大图片宽度
        'height':200,           // 大图片高度
        'icon_width': 50,       // 小图标宽度
        'icon_height': 30,      // 小图标高度
        'tab_width': 300,       // tab的宽度
        'tab_height': 49,
        'tab_shrink_height': 30,
        'tab_gap': 10,          // tab的间隙，NOTE: width = (tab_width * n) + (tab_gap * 2) + (tab_gap * (n - 1));
        'delay':200,            //切换选择时的延时响应时间
        'interval_time': 10000, //自动切换时间间隔 =0表示不自动切换
        'first_show_index':0,   //首次载入的图片索引
        'options':[
            {
                'img_url':'http://drmcmm.baidu.com/media/id=nHcvPj6dPHR1&gp=402&time=nHnvPj63nWT3n0.jpg',
                'img_link_rcv_url':'http://www.baidu.com',
                'icon_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'icon_link_rcv_url': 'http://drmcmm.baidu.com/media/id=nHcdPHn1nWbL&gp=402&time=nHnvPj63nWT3n0.jpg',
                'title': 'BMW Experience Day',
                'title_link_rcv_url': 'http://www.baidu.com/title',
                'desc': '邀您尽赏创新科技，体验强劲动感',
                'desc_link_rcv_url': 'http://www.baidu.com/desc'    // 可选，不填则描述没有链接
            },
            {
                'img_url':'http://drmcmm.baidu.com/media/id=nHcvPj6dPHRv&gp=402&time=nHnvPj63nWT3n0.jpg',
                'img_link_rcv_url':'http://www.baidu.com',
                'icon_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'icon_link_rcv_url': 'http://drmcmm.baidu.com/media/id=nHcvnjndnW0Y&gp=402&time=nHnvPj63nWT3n0.jpg',
                'title': 'BMW 3行动招募',
                'title_link_rcv_url': 'http://www.baidu.com/title',
                'desc': 'BMW 3行动启动,欢悦之旅全新升级',
                'desc_link_rcv_url': 'http://www.baidu.com/desc'
            },
            {
                'img_url':'http://drmcmm.baidu.com/media/id=nHcdPHn1n10s&gp=402&time=nHnvPj63nWT3n0.jpg',
                'img_link_rcv_url':'http://www.baidu.com',
                'icon_url': 'http://eiv.baidu.com/mapm2/zhouminming01/56x56.gif',
                'icon_link_rcv_url': 'http://drmcmm.baidu.com/media/id=nHcvnjndnW0L&gp=402&time=nHnvPj63nWT3n0.jpg',
                'title': 'BMW春季关怀,呵护清新春意',
                'title_link_rcv_url': 'http://www.baidu.com/title',
                'desc': 'BMW春季焕新,惬意春日,全程安心!',
                'desc_link_rcv_url': 'http://www.baidu.com/desc'
            }
        ]
    },
    "1": {
        // 主图片
        primary: {
            url: "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj1.jpg",
            repeat: "no-repeat",
            position: "top center",
            color: "#8b965c",
            height: 600
        },
        // 重复的辅助背景图片（主要用于过度）（如果不需要则不用设置）
        secondary: {
            url: "http://eiv.baidu.com/mapm2/liutong/dfrc_130513/bj2.jpg",
            repeat: "repeat-x",
            position: "center 600px",
            height: 1020
        }
    },
    "2": {
        'url' : 'javascript:void(0);',
        'image_url' : 'http://eiv.baidu.com/mapm2/0108baoma1/lg.gif'
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

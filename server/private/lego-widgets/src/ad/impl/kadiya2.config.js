/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: kadiya2.config.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/kadiya2.config.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * lv2的配置数据
 **/

var AD_CONFIG = {
    id: "pl_l_64614",
    main_url: "http://www.cartier.cn",
    hmjs_id: "affbe21cc4c91812b649cfa12c84ad2e",
    "img": {
        'image_url': "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/main.jpg"
    },
    "head": {
        titletext: "<em>卡地亚</em>Cartier - 中国官网",
        titleurl_rcv_url: "http://www.cartier.cn/#/home",
        display_official_site_icon: true,
        description_rcv_html: "卡地亚(Cartier)于1847年在法国创立，为世界珠宝<b></b>，腕表及配饰界的翘楚。以不断创新的理念和巧夺天工的设计，被英国国王爱德华七世誉为“皇帝的珠宝商，珠宝商的皇帝”。",
        query: [{
            key_word: "珠宝<b></b>",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E7%8F%A0%E5%AE%9D%E7%B3%BB%E5%88%97-1561"
        }, {
            key_word: "腕表",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E8%85%95%E8%A1%A8%E7%B3%BB%E5%88%97"
        }, {
            key_word: "配饰",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E9%85%8D%E4%BB%B6%E7%B3%BB%E5%88%97"
        }],
        site: "www.cartier.cn"
    },
    "buttons_1": {
        options: [{
            text: "卡地亚珠宝",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E7%8F%A0%E5%AE%9D%E7%B3%BB%E5%88%97-1561"
        }, {
            text: "卡地亚腕表",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E8%85%95%E8%A1%A8%E7%B3%BB%E5%88%97"
        }]
    },
    "buttons_2": {
        options: [{
            text: "品牌微电影",
            rcv_url: "http://cartier.youku.com/"
        }, {
            text: "卡地亚配饰",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E9%85%8D%E4%BB%B6%E7%B3%BB%E5%88%97"
        }]
    },
    "tabs": {
        interval_time: 500000000,
        hover_time: 200,
        default_index: 0,
        width: 518,
        li_margin: 0,
        "contents": [{
            "tab_title": "腕表",
            "tab_con": {
                "image_cartoon": {
                    image_width: 129,
                    image_margin: 0,
                    options: [{
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab1-1.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_him",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab1-2.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_him",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab1-3.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab1-4.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }],
                    left_arrow: "//bs.baidu.com/adtest/3d9568dc8283f780240ac9b5a8b87265.jpg",
                    right_arrow: "//bs.baidu.com/adtest/2479f126d533698ce6640f063e1347c9.jpg"
                }
            }
        }, {
            "tab_title": "珠宝",
            "tab_con": {
                "image_cartoon": {
                    image_width: 129,
                    image_margin: 0,
                    options: [{
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-1.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-2.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-3.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-4.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-5.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab2-6.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }],
                    left_arrow: "//bs.baidu.com/adtest/3d9568dc8283f780240ac9b5a8b87265.jpg",
                    right_arrow: "//bs.baidu.com/adtest/2479f126d533698ce6640f063e1347c9.jpg"
                }
            }
        }, {
            "tab_title": "配饰",
            "tab_con": {
                "image_cartoon": {
                    image_width: 129,
                    image_margin: 0,
                    options: [{
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab3-1.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab3-2.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_her",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab3-3.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_him",
                        linktext: ""
                    }, {
                        imgsrc: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/tab3-4.jpg",
                        imgurl_rcv_url: "http://www.cartier.cn/navigation/gifts_selections_holiday_gifts_for_him",
                        linktext: ""
                    }],
                    left_arrow: "//bs.baidu.com/adtest/3d9568dc8283f780240ac9b5a8b87265.jpg",
                    right_arrow: "//bs.baidu.com/adtest/2479f126d533698ce6640f063e1347c9.jpg"
                }
            }
        }, {
            "tab_title": "官方微博",
            "tab_con": {
                "weibo": {
                    id: "2142012291",
                    name: "卡地亚",
                    verify_img: "http://drmcmm.baidu.com/media/id=P10vPjf4rHn&gp=402&time=nHnYnj6LnHbkr0.png",
                    follow_imgsrc: "http://drmcmm.baidu.com/media/id=PWbvPWc1PHm&gp=402&time=nHnYnj6LnHbkPf.png",
                    weibo_logo: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/weibo_logo.jpg",
                    weibo_logo_rcv_url: "http://weibo.com/p/1006062142012291/info?from=page_100606&mod=TAB#place",
                    weibo_context_length: 110,
                    is_display_icon: true,
                    is_display_fans: true,
                    is_display_weibo: true,
                    is_display_foot: true
                }
            }
        }]
    },
    "button_group": {
        options: [{
            text: "卓越传承",
            rcv_url: "http://www.cartier.cn/%E5%93%81%E7%89%8C/%E4%B8%93%E4%B8%9A%E6%8A%80%E8%89%BA"
        }, {
            text: "搜寻精品店",
            rcv_url: "http://www.cartier.cn/%E6%9F%A5%E6%89%BE%E7%B2%BE%E5%93%81%E5%BA%97"
        }, {
            text: "礼物搜索",
            rcv_url: "http://www.cartier.cn/%E7%B3%BB%E5%88%97/%E7%A4%BC%E7%9B%92%E7%B3%BB%E5%88%97-1561"
        }, {
            text: "品牌信息",
            rcv_url: "http://www.cartier.cn/%E5%93%81%E7%89%8C"
        }, {
            text: "客户服务",
            rcv_url: "http://www.cartier.cn/%E6%9C%8D%E5%8A%A1/%E5%AE%A2%E6%88%B7%E6%9C%8D%E5%8A%A1"
        }]
    },
    'fwc': {
        'width': 720,
        'height': 420,
        'float_bg': {
            src: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/bg.jpg",
            rcv_url: "http://www.cartier.cn/navigation/wintertale"
        },
        "links": {
            options: [{
                rcv_url: "http://www.cartier.cn/navigation/wintertale"
            }]
        },
        "video": {
            rcv_url: "http://cartier.youku.com/",
            img_url: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/sp1.jpg",
            video_url: "//bs.baidu.com/adtest/22211557d7082865fb0c9427d17476ac.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/kadiya/131128_pl_01/sp1.jpg",
            width: 400,
            height: 250,
            is_play: true
        }
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
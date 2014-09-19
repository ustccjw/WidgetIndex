/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: skoda2.config.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/skoda2.config.js ~ 2012/09/27 15:15:12
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore的配置数据
 **/


var AD_CONFIG = {
    id: "ec-ma-skoda130923",
    hmjs_id: "",
    main_url: "http://www.volvogroup.com",
    video_left: {
        img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.jpg",
        video_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.flv",
        ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.jpg",
        width: 220,
        height: 190
    },
    small_head: {
        titletext: "<em>沃尔沃集团</em>官方网站",
        titleurl_rcv_url: "http://www.baidu.com",
        description_rcv_html: "沃尔沃集团是全球领先的商业运输及建筑设备制造商。专注于卡车、客车、建筑设备<b></b>、船舶和工业应用驱动系统的制作与服务。",
        query: [
            {
                "key_word": "卡车",
                "rcv_url": "http://www.baidu.com"
            },{
                "key_word": "客车",
                "rcv_url": "http://www.baidu.com"
            },{
                "key_word": "建筑设备<b></b>",
                "rcv_url": "http://www.baidu.com"
            }
        ],
        image_group_head: {
            options: [
                {
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/1.jpg"
                }, {
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/2.jpg"
                }, {
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/3.jpg"
                }
            ]
        },
        site: "www.volvogroup.com"
    },
    tab: {
        interval_time: 500000000,
        hover_time: 200,
        width: 515,
        default_index: 0,
        'li_border_width': 0,
        options: [
            {
                tab_title: "奔驰A级"
            },{
                tab_title: "C级轿车"
            },{
                tab_title: "奔驰SLK"
            },{
                tab_title: "E级轿跑"
            },{
                tab_title: "CLS猎装"
            },{
                tab_title: "预约试驾"
            }
        ]
    },
    tab_drive: {
        width: 300,
        height: 100,
        src: "http://eiv.baidu.com/mapm2/fanxueliang/pl/skoda/index.html",
        image: "http://eiv.baidu.com/mapm2/benchi/130510_pl_01/tab_map.jpg",
        image_rcv_url: "http://www.baidu.com"
    },
    tab_cont: {
        content: [
        {
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab2.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
            des_title: "新血来袭",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
            des_text: "四缸涡轮增压发动机搭载7速双离合变速箱，一举刷新你的百公里心跳记录！",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
            type_title: "可选型号",
            type_links: [
                {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
                    text: "A180"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
                    text: "A200"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAR0&ro=sm2&ae=1000440&rt=2&o=http://A-Class.mercedes-benz.com.cn",
                    text: "A260"
                }
            ]
        }, {
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab3.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            des_title: "新姿澎湃，超越完美",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            des_text: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            type_title: "可选型号",
            type_links: [
                {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                    text: "C 180经典型"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                    text: "C 260优雅型"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                    text: "C 260时尚型"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
                    text: "C 300时尚型"
                }
            ]
        }, {
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab4.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            des_title: "见者钟情，知者倾心",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            des_text: "奔驰SLK级敞篷跑车，新一代直喷引擎搭配AMG运动套件，激情于心，动感于行。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            type_title: "可选型号",
            type_links: [
                {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                    text: "SLK200时尚型"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                    text: "SLK200豪华运动型"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                    text: "SLK350"
                }
            ]
        }, {
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab5.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            des_title: "心E座驾，梦想无忧",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            des_text: "购E级轿跑车，享缤纷新春增值礼包。多重礼遇随心组合，助您轻松购车。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            type_title: "可选型号",
            type_links: [
                {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                    text: "E200轿跑车"
                }, {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                    text: "E260轿跑车"
                },{
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                    text: "E300轿跑车"
                }
            ]
        },{
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab6.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            des_title: "赏新，悦目",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            des_text: "独特的掀背设计，塑造美轮美奂的车身流体线条。CLS级猎装车创世来袭！",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            type_title: "可选型号",
            type_links: [
                {
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
                    text: "CLS 350 style "
                },{
                    rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
                    text: "CLS 350 luxury"
                }
            ]
        }]
    },
    button_group: {
        options: [
            {
                text: "奔驰展示厅",
                rcv_url: "http://www.baidu.com"
            }, {
                text: "奔驰社区",
                rcv_url: "http://www.baidu.com"
            }, {
                text: "经销商查询",
                rcv_url: "http://www.baidu.com"
            }, {
                text: "驾驶学院",
                rcv_url: "http://www.baidu.com"
            }, {
                text: "官方微博",
                rcv_url: "http://www.baidu.com"
            }
        ]
    },
    fwc: {
        width: 720,
        height: 420,
        float_bg: {
            src: "http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg",
            rcv_url: "http://www.baidu.com"
        }
    },
    fwc_cont:{
        content: [
            {
                big_image: {
                    src: "http://eiv.baidu.com/mapm2/benchi/130828_pl_01/sp1.jpg",
                    "rcv_url": "http://www.baidu.com?a=1"
                },
                small_image: {
                    width: 100,
                    height: 55,
                    options: [
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                            text: "全新A级车",
                            "rcv_url": "http://www.baidu.com?a=1"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                            text: "C级轿车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                            text: "E级轿车广告",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                            text: "全新奔驰B级",
                            "rcv_url": "http://www.baidu.com"
                        },
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                            text: "M级越野车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                            text: "AMG",
                            "rcv_url": "http://www.baidu.com"
                        }
                    ]
                }
            },{
                big_image: {
                    src: "http://eiv.baidu.com/mapm2/benchi/130828_pl_01/sp1.jpg",
                    "rcv_url": "http://www.baidu.com?a=2"
                },
                small_image: {
                    width: 100,
                    height: 55,
                    options: [
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                            text: "全新A级车",
                            "rcv_url": "http://www.baidu.com?a=2"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                            text: "C级轿车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                            text: "E级轿车广告",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                            text: "全新奔驰B级",
                            "rcv_url": "http://www.baidu.com"
                        },
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                            text: "M级越野车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                            text: "AMG",
                            "rcv_url": "http://www.baidu.com"
                        }
                    ]
                }
            },{
                big_image: {
                    src: "http://eiv.baidu.com/mapm2/benchi/130828_pl_01/sp1.jpg",
                    "rcv_url": "http://www.baidu.com?a=3"
                },
                small_image: {
                    width: 100,
                    height: 55,
                    options: [
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                            text: "全新A级车",
                            "rcv_url": "http://www.baidu.com?a=3"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                            text: "C级轿车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                            text: "E级轿车广告",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                            text: "全新奔驰B级",
                            "rcv_url": "http://www.baidu.com"
                        },
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                            text: "M级越野车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                            text: "AMG",
                            "rcv_url": "http://www.baidu.com"
                        }
                    ]
                }
            },{
                big_image: {
                    src: "http://eiv.baidu.com/mapm2/benchi/130828_pl_01/sp1.jpg",
                    "rcv_url": "http://www.baidu.com?a=4"
                },
                small_image: {
                    width: 100,
                    height: 55,
                    options: [
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
                            text: "全新A级车",
                            "rcv_url": "http://www.baidu.com?a=4"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
                            text: "C级轿车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
                            text: "E级轿车广告",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
                            text: "全新奔驰B级",
                            "rcv_url": "http://www.baidu.com"
                        },
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
                            text: "M级越野车",
                            "rcv_url": "http://www.baidu.com"
                        }, 
                        {
                            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
                            text: "AMG",
                            "rcv_url": "http://www.baidu.com"
                        }
                    ]
                }
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

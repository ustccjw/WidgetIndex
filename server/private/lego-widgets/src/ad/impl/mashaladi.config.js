/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: mashaladi.config.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/mashaladi.config.js ~ 2012/09/27 15:15:12
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * 配置数据
 **/


var AD_CONFIG = {
    id: "ec-ma-mashaladi131009",
    hmjs_id: "123",
    main_url: "http://www.mercedes-benz.com.cn",
    video_left: {
        img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.jpg",
        video_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.flv",
        ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp.jpg",
        width: 220,
        height: 190
    },
    small_head: {
        titletext: "梅赛德斯-<em>奔驰</em>官方网站",
        titleurl_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAP0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
        description_rcv_html: "作为汽车发明者,梅赛德斯-奔驰始终秉承“The best or nothing(惟有最好)”的品牌精神,书写汽车工业的经典传奇。 ",
        image_group_head: {
            options: [{
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/1.jpg"
                }, {
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/2.jpg"
                }, {
                    imgsrc: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/3.jpg"
                }]
        },
        site: "www.mercedes-benz.com.cn"
    },
    tab_form: {
        width: 300,
        height: 100,
        transparent: true,
        src: "http://eiv.baidu.com/mapm2/jiejing/mashaladi/index.html",
        image: "http://eiv.baidu.com/mapm2/benchi/130510_pl_01/tab_map.jpg",
        image_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAQ0&ro=sm2&ae=1000440&rt=2&o=https://contact.mercedes-benz.com.cn/testdrive/?lan=zh",
        province_city: {
            "datasource_url": '//bs.baidu.com/adtest/a853b05de5ef6a7e9170237a4beeaf69.js',
            dependency: [{
                name: "province"
            }, {
                name: "city"
            }]
        },
        map: {
            icon: {
                url: "//bs.baidu.com/adtest/d0373a495a6bcb005a314fc5868e649f.png",
                width: 46,
                height: 45
            },
            'datasource_url': '//bs.baidu.com/adtest/6f40bda44767f537058802345d07328f.js'
        }
    },
    tab: {
        interval_time: 500000000,
        hover_time: 200,
        width: 524,
        li_margin: 0,
        default_index: 0,
        options: [{
            tab_title: "奔驰A级水电费地方水电费",
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab3.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            des_title: "新姿澎湃，超越完美",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            des_text: "2013款C级轿车，更耀眼的外观，更澎湃的动力，令你尽情挥洒驾驭激情。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAS0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/C-Class/china/",
            type_title: "可选型号",
            type_links: [{
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
            }]
        }, {
            tab_title: "C级轿车WWWWWWWWW",
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab4.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            des_title: "见者钟情，知者倾心",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            des_text: "奔驰SLK级敞篷跑车，新一代直喷引擎搭配AMG运动套件，激情于心，动感于行。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
            type_title: "可选型号",
            type_links: [{
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                text: "SLK200时尚型"
            }, {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                text: "SLK200豪华运动型"
            }, {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAT0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/slk-class/_r172.flash.html",
                text: "SLK350"
            }]
        }, {
            tab_title: "奔驰SLK水电费收到方式地方",
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130515_pl_01/tab5.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            des_title: "心E座驾，梦想无忧",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            des_text: "购E级轿跑车，享缤纷新春增值礼包。多重礼遇随心组合，助您轻松购车。",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
            type_title: "可选型号",
            type_links: [{
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                text: "E200轿跑车"
            }, {
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                text: "E260轿跑车"
            },{
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAU0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models/e-class/_c207.flash.html",
                text: "E300轿跑车"
            }]
        }, {
            tab_title: "E级轿跑",
            pro_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/tab6.jpg",
            pro_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            des_title: "赏新，悦目",
            des_title_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            des_text: "独特的掀背设计，塑造美轮美奂的车身流体线条。CLS级猎装车创世来袭！",
            des_text_rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
            type_title: "可选型号",
            type_links: [{
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
                text: "CLS 350 style "
            },{
                rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAV0&ro=sm2&ae=1000440&rt=2&o=http://special.mercedes-benz.com.cn/CLSShootingBrake",
                text: "CLS 350 luxury"
            }]
        }]
    },
    button_group: {
        options: [{

            text: "奔驰展示厅",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAW0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars/home/new_cars/models.flash.html"
        }, {
            text: "奔驰社区",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAX0&ro=sm2&ae=1000440&rt=2&o=http://mymercedes.com.cn"
        }, {
            text: "经销商查询",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAY0&ro=sm2&ae=1000440&rt=2&o=http://dealer.mercedes-benz.com.cn/"
        }, {
            text: "驾驶学院",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAZ0&ro=sm2&ae=1000440&rt=2&o=http://www.mb-drivingacademy.cn"
        }, {
            text: "官方微博",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAa0&ro=sm2&ae=1000440&rt=2&o=http://weibo.com/1666454854"
        }]
    },
    fwc: {
        width: 720,
        height: 420,
        display_bg_iframe: true,
        float_bg: {
            src: "http://eiv.baidu.com/mapm2/benchi/130520_pl_01/bg.jpg",
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAN0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html"
        },
        options: [{
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            video_url: "//bs.baidu.com/adtest/dfa4e34237dac53296931da8d610347f.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp1.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_1.jpg",
            thumbnail_text: "全新A级车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            video_url: "//bs.baidu.com/adtest/13991dda3b6f6e29a0a74cd5b48733cc.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp2.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_2.jpg",
            thumbnail_text: "C级轿车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
            video_url: "//bs.baidu.com/adtest/bccbf3ecd905b1995a556edc4cf62970.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp3.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_3.jpg",
            thumbnail_text: "E级轿车广告"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
            video_url: "//bs.baidu.com/adtest/4abddb2f20b255ffad6351cb84854aae.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp4.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_4.jpg",
            thumbnail_text: "全新奔驰B级"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
            video_url: "//bs.baidu.com/adtest/46a9856a8a3b085856528a4fcbcf690a.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp5.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_5.jpg",
            thumbnail_text: "M级越野车"
        }, {
            rcv_url: "http://e.cn.miaozhen.com/r.gif?k=1004767&p=3yIAO0&ro=sm2&ae=1000440&rt=2&o=http://www.mercedes-benz.com.cn/content/china/mpc/mpc_china_website/zhng/home_mpc/passengercars.flash.html",
            img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            video_url: "//bs.baidu.com/adtest/c1fcaf94ed8ac5dab5cce93d639bed4f.flv",
            ipad_img: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/sp6.jpg",
            width: 400,
            height: 250,
            is_play: true,
            thumbnail_img_url: "http://eiv.baidu.com/mapm2/benchi/130507_pl_01/float_6.jpg",
            thumbnail_text: "AMG"
        }]
    },
    fwc_map: {
        is_display: true,
        display_bg_iframe: true,
        width: 539,
        height: 424
    }
    
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: lv_test.config.js 9567 2012-06-06 06:33:00Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/lv_test.config.js ~ 2012/06/05 12:14:49
 * @author songao(songao@baidu.com)
 * @version $Revision: 9567 $
 * @description
 * 演示用的配置项.
 **/

var AD_CONFIG = {
    // id: "pl_l_59228",
    // main_url: "http://www.louisvuitton.cn",
    video: {
        rcv_url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/手提包?campaign=sem_BaiduBrandzone_0401_V1",
        img_url: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/sp.jpg",
        video_url: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/sp.flv",
        ipad_img: "http://eiv.baidu.com/mapm2/lv/130319_pl_01/ipad.png"
    },
    video_title: {
        text: "路易威登Metis手袋",
        url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/手提包?campaign=sem_BaiduBrandzone_0401_V2"
    },
    head: {
        titletext: "<em>路易威登</em>中国官网",
        titleurl_rcv_url: "http://www.louisvuitton.cn/front/zhs_CN/首页?campaign=sem_BaiduBrandzone_0401_H1",
        logoimg: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/logo.jpg",
        logourl_rcv_url: "http://www.louisvuitton.cn/front/zhs_CN/首页?campaign=sem_BaiduBrandzone_0401_H2",
        description: "自1854年以来，代代相传至今的路易威登，以卓越品质、杰出创意和精湛工艺成为时尚旅行艺术的象征。产品包括手提包，旅行用品，小型皮具，配饰，鞋履，成衣，腕表，高级珠宝及个性化订制服务等。",
        query: [{
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/手提包?campaign=sem_BaiduBrandzone_0401_D01",
            key_word: "手提包"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/旅行用品?campaign=sem_BaiduBrandzone_0401_D02",
            key_word: "旅行用品"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/小型皮具?campaign=sem_BaiduBrandzone_0401_D03",
            key_word: "小型皮具"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/配饰?campaign=sem_BaiduBrandzone_0401_D04",
            key_word: "配饰"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/鞋履?campaign=sem_BaiduBrandzone_0401_D05",
            key_word: "鞋履"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/成衣?campaign=sem_BaiduBrandzone_0401_D06",
            key_word: "成衣"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/腕表?campaign=sem_BaiduBrandzone_0401_D07",
            key_word: "腕表"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/高级珠宝?campaign=sem_BaiduBrandzone_0401_D08",
            key_word: "高级珠宝"
        }, {
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/Mon-Monogram-个性化订制服务?campaign=sem_BaiduBrandzone_0401_D09",
            key_word: "个性化订制服务"
        }],
        site: "www.louisvuitton.cn"
    },
    weibo: {
        id: "1836003984",
        icon: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/weibo_logo.png",
        icon_url: "http://weibo.com/louisvuitton",
        follow_imgsrc: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/follow.png"
    },
    bottons: [{
        options: [{
            text: "最新资讯",
            url: "http://www.louisvuitton.cn/front/zhs_CN/New-Now?campaign=sem_BaiduBrandzone_0401_BTN01"
        }, {
            text: "品牌之旅",
            url: "http://www.louisvuitton.cn/front/#/zhs_CN/Journeys-section"
        }, {
            text: "专卖查询",
            url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店?campaign=sem_BaiduBrandzone_0401_BTN03"
        }]
    }, {
        options: [{
            text: "微博主页",
            url: "http://weibo.com/louisvuitton"
        }, {
            text: "优酷主页",
            url: "http://tvs.youku.com/louisvuitton"
        }, {
            text: "订阅邮件",
            url: "http://www.louisvuitton.cn/front/zhs_CN/订阅电子报?campaign=sem_BaiduBrandzone_0401_BTN06"
        }]
    }],
    img_group: [{
        disable: true,
        options: [{
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/1-1.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/腕表?campaign=sem_BaiduBrandzone_0401_IMG01",
            linktext: "女士腕表"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/1-2.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/配饰?campaign=sem_BaiduBrandzone_0401_IMG02",
            linktext: "潮流披肩"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/1-3.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/小型皮具?campaign=sem_BaiduBrandzone_0401_IMG03",
            linktext: "时尚钱包"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/1-4.jpg",
            imgurl: "http://www.louisvuitton.cn/front/#/zhs_CN/New-Now/articles/Billie-Achilleos-奇幻动物园的中国之旅",
            linktext: "奇幻动物园"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/1-5.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/首页?campaign=sem_BaiduBrandzone_0401_IMG05",
            linktext: "官方微信"
        }],
        left_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/left.png",
        right_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/right.png"
    }, {
        disable: true,
        options: [{
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/2-1.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/鞋履?campaign=sem_BaiduBrandzone_0401_IMG06",
            linktext: "春夏女鞋"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/2-2.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/手提包?campaign=sem_BaiduBrandzone_0401_IMG07",
            linktext: "学院风手袋"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/2-3.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/配饰?campaign=sem_BaiduBrandzone_0401_IMG08",
            linktext: "盛夏系列"
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/2-4.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/配饰?campaign=sem_BaiduBrandzone_0401_IMG09",
            linktext: "时尚首饰 "
        }, {
            imgsrc: "http://eiv.baidu.com/mapm2/lv/130403_pl_01/2-5.jpg",
            imgurl: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/高级珠宝?campaign=sem_BaiduBrandzone_0401_IMG10",
            linktext: "高级珠宝"
        }],
        left_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/left.png",
        right_arrow: "http://eiv.baidu.com/mapm2/lv/120630_pl_01/right.png"
    }],
    tab: {
        interval_time: 500000000,
        hover_time: 200,
        default_index: 0,
        width: 524,
        li_margin: 0,
        options: [{
            tab_title: "最新产品"
        }, {
            tab_title: "品牌故事"
        }, {
            tab_title: "专卖店查询"
        }, {
            tab_title: "产品系列"
        }, {
            tab_title: "官方微博"
        }]
    },
    table: [{
        head: [{
            text: "女士",
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士?campaign=sem_BaiduBrandzone_0401_CoFe",
            column_count: 3
        }],
        body: [{
            tr: [{
                text: "传奇MONOGRAM",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/传奇Monogram系列?campaign=sem_BaiduBrandzone_0401_CoFe01"
            }, {
                text: "手提包",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/手提包?campaign=sem_BaiduBrandzone_0401_CoFe06"
            }, {
                text: "鞋履",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/鞋履?campaign=sem_BaiduBrandzone_0401_CoFe11"
            }]
        }, {
            tr: [{
                text: "2013春夏系列",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/2013-春夏时装秀系列?campaign=sem_BaiduBrandzone_0401_CoFe02"
            }, {
                text: "经典系列",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/出版物和文具?campaign=sem_BaiduBrandzone_0401_CoFe07"
            }, {
                text: "成衣",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/成衣?campaign=sem_BaiduBrandzone_0401_CoFe12"
            }]
        }, {
            tr: [{
                text: "个性化订制服务",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/Mon-Monogram-个性化订制服务?campaign=sem_BaiduBrandzone_0401_CoFe03"
            }, {
                text: "旅行用品",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/旅行用品?campaign=sem_BaiduBrandzone_0401_CoFe08"
            }, {
                text: "腕表",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/腕表?campaign=sem_BaiduBrandzone_0401_CoFe13"
            }]
        }, {
            tr: [{
                text: "缤纷色彩系列",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/缤纷色彩系列?campaign=sem_BaiduBrandzone_0401_CoFe04"
            }, {
                text: "小型皮具",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/小型皮具?campaign=sem_BaiduBrandzone_0401_CoFe09"
            }, {
                text: "高级珠宝",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/高级珠宝?campaign=sem_BaiduBrandzone_0401_CoFe14"
            }]
        }, {
            tr: [{
                text: "出版物和文具",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/出版物和文具?campaign=sem_BaiduBrandzone_0401_CoFe05"
            }, {
                text: "配饰",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/配饰?campaign=sem_BaiduBrandzone_0401_CoFe10"
            }, {
                text: "收拾行装",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/女士/收拾行装的艺术?campaign=sem_BaiduBrandzone_0401_CoFe15"
            }]
        }]
    }, {
        head: [{
            text: "男士",
            url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士?campaign=sem_BaiduBrandzone_0401_CoMa",
            column_count: 3
        }],
        body: [{
            tr: [{
                text: "2013春夏系列",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/2013-春夏时装秀系列?campaign=sem_BaiduBrandzone_0401_CoMa01"
            }, {
                text: "男士箱包",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/男士箱包?campaign=sem_BaiduBrandzone_0401_CoMa06"
            }, {
                text: "腕表",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/腕表?campaign=sem_BaiduBrandzone_0401_CoMa11"
            }]
        }, {
            tr: [{
                text: "个性化订制服务",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/Mon-Monogram-个性化订制服务?campaign=sem_BaiduBrandzone_0401_CoMa02"
            }, {
                text: "旅行用品",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/旅行用品?campaign=sem_BaiduBrandzone_0401_CoMa07"
            }, {
                text: "高级珠宝",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/高级珠宝?campaign=sem_BaiduBrandzone_0401_CoMa12"
            }]
        }, {
            tr: [{
                text: "收拾行装的艺术",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/收拾行装的艺术?campaign=sem_BaiduBrandzone_0401_CoMa03"
            }, {
                text: "小型皮具",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/小型皮具?campaign=sem_BaiduBrandzone_0401_CoMa08"
            }]
        }, {
            tr: [{
                text: "出版物和文具",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/出版物和文具?campaign=sem_BaiduBrandzone_0401_CoMa04"
            }, {
                text: "配饰",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/配饰?campaign=sem_BaiduBrandzone_0401_CoMa09"
            }]
        }, {
            tr: [{
                text: "成衣",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/成衣?campaign=sem_BaiduBrandzone_0401_CoMa05"
            }, {
                text: "鞋履",
                url: "http://www.louisvuitton.cn/front/zhs_CN/产品系列/男士/鞋履?campaign=sem_BaiduBrandzone_0401_CoMa10"
            }]
        }]
    }],
    select: {
        data: [{
            text: "请选择*",
            value: "null",
            children: [{
                text: "请选择*",
                value: "null"
            }]
        }, {
            text: "北京",
            value: "北京",
            children: [{
                text: "路易威登北京建外钟表珠宝店",
                value: "路易威登北京建外钟表珠宝店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登北京建外钟表珠宝店",
                    enable_bmap: false,
                    addr: "北京市朝阳区建国门外大街2号院1号楼地上一层127号店铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京建外钟表珠宝店",
                    lng: 116.459423,
                    lat: 39.912598
                }]
            }, {
                text: "路易威登北京王府井店",
                value: "路易威登北京王府井店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登北京王府井店",
                    enable_bmap: false,
                    addr: "中国北京市王府井金鱼胡同8号王府半岛酒店一层G2商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京王府半岛酒店专卖店",
                    lng: 116.422817,
                    lat: 39.921199
                }]
            }, {
                text: "路易威登北京金融街专卖店",
                value: "路易威登北京金融街专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登北京金融街专卖店",
                    enable_bmap: false,
                    addr: "中国北京市西城区金城坊街2号金融街购物中心L131-132商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京金融街专卖店",
                    lng: 116.368455,
                    lat: 39.921009
                }]
            }, {
                text: "路易威登北京国贸商城旗舰店",
                value: "路易威登北京国贸商城旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登北京国贸商城旗舰店",
                    enable_bmap: false,
                    addr: "中国北京市建国门外大街1号国贸商城L116商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-北京国贸商城旗舰店",
                    lng: 116.464782,
                    lat: 39.915159
                }]
            }]
        }, {
            text: "成都市",
            value: "成都市",
            children: [{
                text: "路易威登成都仁恒旗舰店",
                value: "路易威登成都仁恒旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登成都仁恒旗舰店",
                    enable_bmap: false,
                    addr: "中国成都市人民南路二段1号仁恒置地广场L105商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-成都仁恒旗舰店"
                }]
            }]
        }, {
            text: "重庆市",
            value: "重庆市",
            children: [{
                text: "路易威登重庆旗舰店",
                value: "路易威登重庆旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登重庆旗舰店",
                    enable_bmap: false,
                    addr: "中国重庆市渝中区邹容路100号时代广场L101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-重庆旗舰店"
                }]
            }]
        }, {
            text: "大连市",
            value: "大连市",
            children: [{
                text: "路易威登大连时代广场旗舰店",
                value: "路易威登大连时代广场旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登大连时代广场旗舰店",
                    enable_bmap: false,
                    addr: "中国大连市中山区人民路50号时代广场L101,L201商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-大连时代广场旗舰店"
                }]
            }]
        }, {
            text: "福州市",
            value: "福州市",
            children: [{
                text: "路易威登福州店",
                value: "路易威登福州店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登福州店",
                    enable_bmap: false,
                    addr: "中国福州市八一七北路268号大洋晶典118商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-福州店"
                }]
            }]
        }, {
            text: "广州市",
            value: "广州市",
            children: [{
                text: "路易威登广州丽柏广场专卖店",
                value: "路易威登广州丽柏广场专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登广州丽柏广场专卖店",
                    enable_bmap: false,
                    addr: "中国广州市环市东路367号丽柏广场101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-广州丽柏广场专卖店"
                }]
            }, {
                text: "路易威登广州天河旗舰店",
                value: "路易威登广州天河旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登广州天河旗舰店",
                    enable_bmap: false,
                    addr: "中国广州市天河路383号太古汇L101,L201商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-广州天河旗舰店"
                }]
            }]
        }, {
            text: "哈尔滨市",
            value: "哈尔滨市",
            children: [{
                text: "路易威登哈尔滨麦凯乐专卖店",
                value: "路易威登哈尔滨麦凯乐专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登哈尔滨麦凯乐专卖店",
                    enable_bmap: false,
                    addr: "中国哈尔滨市道里区尚志大街73号麦凯乐哈尔滨总店105商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-哈尔滨麦凯乐专卖店"
                }]
            }, {
                text: "路易威登哈尔滨卓展旗舰店",
                value: "路易威登哈尔滨卓展旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登哈尔滨卓展旗舰店",
                    enable_bmap: false,
                    addr: "中国哈尔滨市道里区安隆街106号卓展购物中心1101及1123",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-哈尔滨卓展旗舰店"
                }]
            }]
        }, {
            text: "杭州市",
            value: "杭州市",
            children: [{
                text: "路易威登杭州大厦专卖店",
                value: "路易威登杭州大厦专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登杭州大厦专卖店",
                    enable_bmap: false,
                    addr: "中国杭州市武林广场1号杭州大厦购物中心B座1号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-杭州大厦专卖店"
                }]
            }, {
                text: "路易威登杭州江干旗舰店",
                value: "路易威登杭州江干旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登杭州江干旗舰店",
                    enable_bmap: false,
                    addr: "中国杭州市江干区富春路701号万象城138号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-杭州江干旗舰店"
                }]
            }]
        }, {
            text: "合肥市",
            value: "合肥市",
            children: [{
                text: "路易威登合肥银泰中心店",
                value: "路易威登合肥银泰中心店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登合肥银泰中心店",
                    enable_bmap: false,
                    addr: "中国合肥市庐阳区长江中路98号合肥银泰中心L101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-合肥银泰中心店"
                }]
            }]
        }, {
            text: "呼和浩特市",
            value: "呼和浩特市",
            children: [{
                text: "路易威登呼和浩特香格里拉酒店专卖店",
                value: "路易威登呼和浩特香格里拉酒店专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登呼和浩特香格里拉酒店专卖店",
                    enable_bmap: false,
                    addr: "呼和浩特市锡林郭勒南路5号香格里拉酒店一层D-E号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-呼和浩特香格里拉酒店专卖店"
                }]
            }]
        }, {
            text: "昆明市",
            value: "昆明市",
            children: [{
                text: "路易威登昆明金格中心专卖店",
                value: "路易威登昆明金格中心专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登昆明金格中心专卖店",
                    enable_bmap: false,
                    addr: "中国昆明市东风东路9号金格中心一层L101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-昆明金格中心专卖店"
                }]
            }, {
                text: "路易威登昆明盘龙旗舰店",
                value: "路易威登昆明盘龙旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登昆明盘龙旗舰店",
                    enable_bmap: false,
                    addr: "昆明市盘龙区北京路985号金格百货时光店F1026商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-昆明盘龙旗舰店"
                }]
            }]
        }, {
            text: "南京市",
            value: "南京市",
            children: [{
                text: "路易威登南京德基广场旗舰店",
                value: "路易威登南京德基广场旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登南京德基广场旗舰店",
                    enable_bmap: false,
                    addr: "中国南京市中山路18号德基广场L101,L102,L201,L202商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-南京德基广场旗舰店"
                }]
            }]
        }, {
            text: "南宁市",
            value: "南宁市",
            children: [{
                text: "路易威登南宁店",
                value: "路易威登南宁店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登南宁店",
                    enable_bmap: false,
                    addr: "中国南宁市青秀区七星路137号梦之岛购物中心L101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-南宁店"
                }]
            }]
        }, {
            text: "宁波市",
            value: "宁波市",
            children: [{
                text: "路易威登宁波和义大道旗舰店",
                value: "路易威登宁波和义大道旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登宁波和义大道旗舰店",
                    enable_bmap: false,
                    addr: "中国宁波市和义路50号和义大道购物中心A区1003,2005商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-宁波和义大道旗舰店"
                }]
            }]
        }, {
            text: "青岛市",
            value: "青岛市",
            children: [{
                text: "路易威登青岛海信广场专卖店",
                value: "路易威登青岛海信广场专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登青岛海信广场专卖店",
                    enable_bmap: false,
                    addr: "中国青岛市澳门路117号海信广场一层125/127商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-青岛海信广场专卖店"
                }]
            }]
        }, {
            text: "三亚市",
            value: "三亚市",
            children: [{
                text: "路易威登三亚亚龙湾专卖店",
                value: "路易威登三亚亚龙湾专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登三亚亚龙湾专卖店",
                    enable_bmap: false,
                    addr: "中国三亚市亚龙湾国家旅游度假区金茂三亚丽思卡尔顿酒店R1-1号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-三亚亚龙湾专卖店"
                }]
            }]
        }, {
            text: "厦门市",
            value: "厦门市",
            children: [{
                text: "路易威登厦门马可波罗专卖店",
                value: "路易威登厦门马可波罗专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登厦门马可波罗专卖店",
                    enable_bmap: false,
                    addr: "中国厦门市湖滨北建业路8号马哥孛罗东方大酒店1号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-厦门马可波罗专卖店"
                }]
            }]
        }, {
            text: "上海",
            value: "上海",
            children: [{
                text: "上海恒隆广场路易威登之家",
                value: "上海恒隆广场路易威登之家",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "上海恒隆广场路易威登之家",
                    enable_bmap: false,
                    addr: "中国上海市南京西路1266号恒隆广场136-138商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/上海恒隆广场路易威登之家"
                }]
            }, {
                text: "路易威登上海浦东旗舰店",
                value: "路易威登上海浦东旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登上海浦东旗舰店",
                    enable_bmap: false,
                    addr: "上海市浦东新区世纪大道8号上海国金中心D座L1-1商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-上海浦东旗舰店"
                }]
            }, {
                text: "路易威登上海淮海旗舰店",
                value: "路易威登上海淮海旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登上海淮海旗舰店",
                    enable_bmap: false,
                    addr: "中国上海市卢湾区淮海中路222号力宝广场105商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-上海淮海旗舰店"
                }]
            }]
        }, {
            text: "深圳市",
            value: "深圳市",
            children: [{
                text: "路易威登深圳罗湖旗舰店",
                value: "路易威登深圳罗湖旗舰店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登深圳罗湖旗舰店",
                    enable_bmap: false,
                    addr: "中国深圳市罗湖区宝安南路1881号华润中心万象城S101商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-深圳罗湖旗舰店"
                }]
            }]
        }, {
            text: "沈阳市",
            value: "沈阳市",
            children: [{
                text: "路易威登沈阳卓展女士专卖店",
                value: "路易威登沈阳卓展女士专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登沈阳卓展女士专卖店",
                    enable_bmap: false,
                    addr: "中国沈阳市沈河区北京街7-1号卓展购物中心1101-01及02商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳卓展女士专卖店"
                }]
            }, {
                text: "路易威登沈阳卓越男士专卖店",
                value: "路易威登沈阳卓越男士专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登沈阳卓越男士专卖店",
                    enable_bmap: false,
                    addr: "中国沈阳市沈河区惠工街12号卓展购物中心卓越精品馆101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳卓越男士专卖店"
                }]
            }, {
                text: "路易威登沈阳沈河专卖店",
                value: "路易威登沈阳沈河专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登沈阳沈河专卖店",
                    enable_bmap: false,
                    addr: "中国沈阳市沈河区青年大街211号久丽百货1001商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-沈阳沈河专卖店"
                }]
            }]
        }, {
            text: "石家庄市",
            value: "石家庄市",
            children: [{
                text: "路易威登石家庄专卖店",
                value: "路易威登石家庄专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登石家庄专卖店",
                    enable_bmap: false,
                    addr: "中国石家庄市长安区育才街58号开元花园先天下购物中心一层",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-石家庄专卖店"
                }]
            }]
        }, {
            text: "苏州市",
            value: "苏州市",
            children: [{
                text: "路易威登苏州泰华商城专卖店",
                value: "路易威登苏州泰华商城专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登苏州泰华商城专卖店",
                    enable_bmap: false,
                    addr: "中国苏州市人民路383号泰华商城西楼101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-苏州泰华商城专卖店"
                }]
            }]
        }, {
            text: "太原市",
            value: "太原市",
            children: [{
                text: "路易威登太原华宇国际精品商厦专卖店",
                value: "路易威登太原华宇国际精品商厦专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登太原华宇国际精品商厦专卖店",
                    enable_bmap: false,
                    addr: "中国太原市府西街45号华宇国际精品商厦101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-太原华宇国际精品商厦专卖店"
                }]
            }]
        }, {
            text: "天津市",
            value: "天津市",
            children: [{
                text: "路易威登天津友谊商厦专卖店",
                value: "路易威登天津友谊商厦专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登天津友谊商厦专卖店",
                    enable_bmap: false,
                    addr: "中国天津市河西区友谊路21号友谊商厦一层L1商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-天津友谊商厦专卖店"
                }]
            }]
        }, {
            text: "温州市",
            value: "温州市",
            children: [{
                text: "路易威登温州华侨饭店专卖店",
                value: "路易威登温州华侨饭店专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登温州华侨饭店专卖店",
                    enable_bmap: false,
                    addr: "中国温州市信河街17号华侨饭店国际名品广场103, 203商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-温州华侨饭店国际名品广场专卖店"
                }]
            }]
        }, {
            text: "乌鲁木齐市",
            value: "乌鲁木齐市",
            children: [{
                text: "路易威登乌鲁木齐美美百货专卖店",
                value: "路易威登乌鲁木齐美美百货专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登乌鲁木齐美美百货专卖店",
                    enable_bmap: false,
                    addr: "中国乌鲁木齐市友好北路589号友好步行街美美百货N100商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-乌鲁木齐美美百货专卖店"
                }]
            }]
        }, {
            text: "无锡市",
            value: "无锡市",
            children: [{
                text: "路易威登无锡八佰伴商厦专卖店",
                value: "路易威登无锡八佰伴商厦专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登无锡八佰伴商厦专卖店",
                    enable_bmap: false,
                    addr: "中国无锡市中山路168号八佰伴商厦A101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-无锡八佰伴商厦专卖店"
                }]
            }]
        }, {
            text: "武汉市",
            value: "武汉市",
            children: [{
                text: "路易威登武汉时代广场专卖店",
                value: "路易威登武汉时代广场专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登武汉时代广场专卖店",
                    enable_bmap: false,
                    addr: "中国武汉市江岸区沿江大道160号时代广场时代一号一层1-3号商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-武汉时代广场专卖店"
                }]
            }]
        }, {
            text: "西安市",
            value: "西安市",
            children: [{
                text: "路易威登西安中大国际专卖店",
                value: "路易威登西安中大国际专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登西安中大国际专卖店",
                    enable_bmap: false,
                    addr: "中国西安市南大街30号中大国际AG01/A101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-西安中大国际专卖店"
                }]
            }]
        }, {
            text: "长春市",
            value: "长春市",
            children: [{
                text: "路易威登长春卓展购物中心专卖店",
                value: "路易威登长春卓展购物中心专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登长春卓展购物中心专卖店",
                    enable_bmap: false,
                    addr: "中国长春市重庆路1255号卓展购物中心A104-A107商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-长春卓展购物中心专卖店"
                }]
            }]
        }, {
            text: "长沙市",
            value: "长沙市",
            children: [{
                text: "路易威登长沙美美百货专卖店",
                value: "路易威登长沙美美百货专卖店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登长沙美美百货专卖店",
                    enable_bmap: false,
                    addr: "中国长沙市芙蓉中路一段478号美美百货101商铺",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-长沙美美百货专卖店"
                }]
            }]
        }, {
            text: "郑州市",
            value: "郑州市",
            children: [{
                text: "路易威登郑州店",
                value: "路易威登郑州店",
                children: [{
                    title_left: "查找我们位于中国的专卖店",
                    title_right: "路易威登郑州店",
                    enable_bmap: false,
                    addr: "中国郑州市中原中路220号裕达福福精品商厦L101商铺 ",
                    tel: "(86) 400 6588 555",
                    opening: "10:00-22:00",
                    url: "http://www.louisvuitton.cn/front/zhs_CN/专卖店/寻找专卖店/销售点/路易威登-郑州店"
                }]
            }]
        }],
        dependency: [{
            name: "city",
            title: "城&nbsp;&nbsp;&nbsp;&nbsp;市",
            "default": "上海"
        }, {
            name: "store",
            title: "专卖店"
        }]
    },
    'fwc': {
        'is_display' : true,
        'width':540,
        'height':425,
        'float_bg':{
            'src': '//bs.baidu.com/adtest/20e3d40a20797ff6fb04fb2a33f086bc.jpg'
        }
    },
    'map': {
        'icon': {
            'url': '//bs.baidu.com/adtest/9da409dd8c467c7f80b4039c8446b876.png',
            'width': 46,
            'height': 45
        }
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */

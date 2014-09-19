/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: xdsd2.config.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/xdsd2.config.js ~ 2012/09/27 15:15:12
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore的配置数据
 **/

var AD_CONFIG = {
    'id' : 'ec-ma-xiandai-shengda-130321',
    'hmjs_id' : '60377d7305aeaaf0509f59b3141e0975',//精算id
    'main_url' : 'http://www.baidu.com',
    'small_head' : {
        'titletext' : '<em>北京现代</em>汽车',
        'titleurl_rcv_url' : 'http://www.baidu.com',
        'description_rcv_html' : '北京现代成立于2002年，是累计产销400余万辆的主流车企之一。产品有全新胜达,朗动,索纳塔八,ix35,瑞纳,新悦动,途胜等车型。客服：400-800-1100',
        'query' : [{
            'key_word' : '北京现代',
            'url' : 'http://www.buick.com.cn'
        }],
        'site' : 'www.beijing-hyundai.com.cn'
    },
    'section': {
        'options' : [
            {
                'icon_url' : 'http://eiv.baidu.com/mapm2/samsung/120511_pl_01/dot.png',
                'text' : 'T动力全尺寸豪华SUV，21.98万起',
                'text_url' : 'http://www.baidu.com'
            },{
                'icon_url' : 'http://eiv.baidu.com/mapm2/samsung/120511_pl_01/dot.png',
                'text' : '分阶营养强化',
                'text_url' : 'http://www.baidu.com'
            },{
                'icon_url' : 'http://eiv.baidu.com/mapm2/samsung/120511_pl_01/dot.png',
                'text' : '分阶营养强化',
                'text_url' : 'http://www.baidu.com'
            }
        ]
    },
    //左侧视频
    'video_left' : {
        'rcv_url': 'http://www.baidu.com',
        'img_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg',
        'video_url' : 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.flv',
        'csttit' : 'zhidao.baidu.com',
        'ipad_img': 'http://eiv.baidu.com/mapm2/burberry/120820_pl_01/sp.jpg', //在ipad下点击视频替代图片
        'player_ver': 1,
        'width':220,
        'height':190
    },
    'tab' : {
        'interval_time' : 500000000, //自动切换tab时间间隔
        'hover_time' : 200,
        'default_index' : 0, //默认载入的tab，从0开始
        'width': 535,
        'li_margin': 8,
        'li_border_width': 0,
        'options': [{
            'tab_title': '预约试驾'
        },{
            'tab_title': '品牌故事'
        },{
            'tab_title': '现代官网'
        },{
            'tab_title': '品牌故事'
        },{
            'tab_title': '豪华SUV'
        }]
    },
    //第一个tab
    'tab1' : {
        "width" : 300,
        "height" : 105,
        "src" : "http://eiv.baidu.com/mapm2/xinbin/xdsd2-index.html",//嵌入的捷径表单地址
        "image" : "http://drmcmm.baidu.com/media/id=P1D4nj0dPWD&gp=402&time=nHnYnH64rjRkrf.jpg",
        "image_url" : "http://www.baidu.com"
    },
    'tab2': {
        'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '纵横天地,势不可挡',
        'des_title_rcv_url' : 'http://www.dell.com.cn',
        'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
        'des_text_rcv_url' : 'http://www.dell.com.cn',
        'type_title' : '可选型号：',
        'type_links' : [
            {
                'rcv_url' : 'http://www.baidu.com',
                'text' : 'ML350 动感型'
            },{
                'rcv_url' : 'http://www.baidu.com',
                'text' : 'ML350 豪华型'
            }
        ]
    },
    'tab3': {
        'image_width': 110,
        'image_margin': 13,
        'options': [{
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-1.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1B115476&u=http%3a%2f%2fteana.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4385%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-2.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-5A115476&u=http%3a%2f%2fwww.dongfeng-nissan.com.cn%2ffinance%2f1301sylphy%2f%3futm_source%3dbaidu%26utm_term%3d4386%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-3.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-5B115476&u=http%3a%2f%2fwww.dongfeng-nissan.com.cn%2ffinance%2f1301tiida%2f%3futm_source%3dbaidu%26utm_term%3d4387%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-4.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1E115476&u=http%3a%2f%2fsunny.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4388%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-5.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1F115476&u=http%3a%2f%2flivina.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4389%26utm_channel%3dZBTF%26utm_medium%3d134"
        }],
        'left_arrow': "//bs.baidu.com/adtest/a9d905c052d398d68d6e90b36acbeb14.gif",
        'right_arrow': "//bs.baidu.com/adtest/b6c20c9ed1d9d30c51a924366e2c8067.gif"
    },
    'tab4': {
        'image_width': 110,
        'image_margin': 13,
        'options': [{
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-1.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1B115476&u=http%3a%2f%2fteana.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4385%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-2.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-5A115476&u=http%3a%2f%2fwww.dongfeng-nissan.com.cn%2ffinance%2f1301sylphy%2f%3futm_source%3dbaidu%26utm_term%3d4386%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-3.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-5B115476&u=http%3a%2f%2fwww.dongfeng-nissan.com.cn%2ffinance%2f1301tiida%2f%3futm_source%3dbaidu%26utm_term%3d4387%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-4.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1E115476&u=http%3a%2f%2fsunny.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4388%26utm_channel%3dZBTF%26utm_medium%3d134"
        }, {
            'imgsrc': "http://eiv.baidu.com/mapm2/dongfenbentian/130301_pl_01/5-5.jpg",
            'imgurl': "http://redir.webdissector.com/redir/track.aspx?adid=7B563412-1F115476&u=http%3a%2f%2flivina.dongfeng-nissan.com.cn%2f%3futm_source%3dbaidu%26utm_term%3d4389%26utm_channel%3dZBTF%26utm_medium%3d134"
        }],
        'left_arrow': "//bs.baidu.com/adtest/a9d905c052d398d68d6e90b36acbeb14.gif",
        'right_arrow': "//bs.baidu.com/adtest/b6c20c9ed1d9d30c51a924366e2c8067.gif"
    },
    'tab5': {
        'pro_img_url' : 'http://eiv.baidu.com/mapm2/encore/tab2_img.jpg',
        'pro_rcv_url' : 'http://www.dell.com.cn',
        'des_title' : '纵横天地,势不可挡',
        'des_title_rcv_url' : 'http://www.dell.com.cn',
        'des_text' : '着眼未来的前瞻科技，打造全领域实力座驾。拓未拓之疆域，见未见之壮丽',
        'des_text_rcv_url' : 'http://www.dell.com.cn',
        'type_title' : '可选型号：',
        'type_links' : [
            {
                'rcv_url' : 'http://www.baidu.com',
                'text' : 'ML350 动感型'
            },{
                'rcv_url' : 'http://www.baidu.com',
                'text' : 'ML350 豪华型'
            }
        ]
    },
    //底部3个按钮
    'button_group' : {
        'options' : [
            {'text' : '奔驰展示厅',
              'url' : 'http://www.baidu1.com'
            },{
                'text' : '车型对比',
                'url' : 'http://www.baidu2.com'
            },{
                'text' : '奔驰社区',
                'url' : 'http://www.baidu3.com'
            },{
                'text' : '星睿二手车',
                'url' : 'http://www.baidu2.com'
            },{
                'text' : '预约试驾',
                'url' : 'http://www.baidu3.com'
            }
        ]
    },
    //浮层右侧6个按钮
    'image_normal':{
        'width':100,
        'height':55,
        'options' : [
             {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'别克全城大'
            },
            {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'2012全新君越'
            },
            {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'君越车型亮点'
            },
            {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'SIDI发动机'
            },
            {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'别克全城大'
            },
            {'img_url' : 'http://eiv.baidu.com/mapm2/encore/float_right_img1.jpg',
                'text':'别克全城大'
            }
        ]
    }
};




/* vim: set ts=4 sw=4 sts=4 tw=100: */

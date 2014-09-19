/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/jyhy/left.config.js ~ 2014/04/08 14:18:43
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * left的配置数据
 **/

var AD_CONFIG = {
    'card': {
        'title': '<em>达内</em>北京欢迎你!达内中国IT培训品牌&lt;NO.1&gt;!',
        'title_rcv_url': 'http://dadadadadadadadadada.com',
        'display_official_site_icon': true,

        "logo_img": "http://dummyimage.com/121x91/00f/fff.jpg",
        "logo_rcv_url": "http://baike.baidu.com",

        "description": "达内全国近100家机构，首创先就业后付款机构",
        "intro": "JAVA ANDROID IOS UI设计",
        "address": "北京市海海淀区花园路西二旗北京市海海淀区花园路西二旗",

        "links": [
            {
                "text": "达内10w学子就业薪酬",
                "rcv_url": "http://bai222du.com"
            },
            {
                "text": "达内21天真课免费试听",
                "rcv_url": "http://baid333u.com"
            },
            {
                "text": "免费重修，学会为止",
                "rcv_url": "http://bai444du.com"
            },
            {
                "text": "随到随学，免费试学5天",
                "rcv_url": "http://baid555u.com"
            }
        ]
    },
    'table': {
        'title': '2014<em>达内</em>招生简章',
        'title_rcv_url': 'http://www.sg91.net/',
        'tables': {
            /*'teacher': {
                "consult_rcv_url": "http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234",
                'class': 'teacher',
                'title': '优秀教师列表',
                'head': [
                    {
                        'class': 'teacher',
                        'name': '优秀教师'
                    },
                    {
                        'class': 'course',
                        'name': '教授课程'
                    },
                    {
                        'class': 'intro',
                        'name': '教师简介'
                    },
                    {
                        'class': 'campus',
                        'name': '所属校区'
                    },
                    {
                        'class': 'consult',
                        'name': '联系方式'
                    }
                ],
                'body': [
                    {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX教育科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                },
                {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周##红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春fd园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                },
                {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX教育科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                },
                {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周@$红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春fd园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                },
                {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周V红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX教育ds科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春fd园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                },
                {
                    'cell-1' : {
                        'class': 'teacher',
                        'name': '周#$红',
                        'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                    },
                    'cell-2' : {
                        'class': 'course',
                        'name': 'IELTS写作'
                    },
                    'cell-3' : {
                        'class': 'intro',
                        'name': 'XXXX科技集团培训师'
                    },
                    'cell-4' : {
                        'class': 'campus',
                        'name': '展春fd园校区'
                    },
                    'cell-5' : {
                        'class': 'consult',
                        'name': '可咨询',
                        'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                    }
                }
                ]
            },*/
            'campus': {
                'class': 'campus',
                'title': '校区分布列表',
                'head': [
                    {
                        'class': 'teacher',
                        'name': '校区分布'
                    },
                    {
                        'class': 'course',
                        'name': '校区课程介绍'
                    },
                    {
                        'class': 'intro',
                        'name': '校区地址'
                    },
                    {
                        'class': 'consult',
                        'name': '联系方式'
                    }
                ],
                'body': [
                    {
                        'cell-1' : {
                            'class': 'teacher',
                            'name': '展春园校区',
                            'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                        },
                        'cell-2' : {
                            'class': 'course',
                            'name': 'GRE、托sd福强化班'
                        },
                        'cell-3' : {
                            'class': 'intro',
                            'name': 'XXXX教育科sf技集团培训师'
                        },
                        'cell-5' : {
                            'class': 'consult',
                            'name': '可咨询',
                            'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                        }
                    },
                    {
                        'cell-1' : {
                            'class': 'teacher',
                            'name': '展春fd园校区',
                            'name_rcv_url': 'http://www.sg91.net/Expert.aspx?fldExpertID=1234'
                        },
                        'cell-2' : {
                            'class': 'course',
                            'name': 'GRE、托sd福强化班'
                        },
                        'cell-3' : {
                            'class': 'intro',
                            'name': 'XXXX教育科sf技集团培训师'
                        },
                        'cell-5' : {
                            'class': 'consult',
                            'name': '可咨询',
                            'name_rcv_url': 'http://www.dsfasdfsafcvadsa.net/Expert.aspx?fldExpertID=1234'
                        }
                    }
                ]
            }
        },
        'site': 'www.3gtarena.net'
    },
    'ader_info': 'http://10.48.29.139:8080/hospital/1746'
};




/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

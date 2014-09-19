/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/jyhy/table.config.js ~ 2014/04/02 17:00:34
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * table相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'title': '2014<em>达内</em>招生简章',
    'title_rcv_url': 'http://www.sg91.net/',
    'tables': {
        'teacher': {
            'class': 'teacher',
            'title': '优秀教师列表',
            'consult_rcv_url': 'http://www.asdfasdf.net/Expert.aspx?fldExpertID=1234',
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
                }
            ]
        },
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
                }
            ]
        }
    },
    'site': 'www.3gtarena.net'
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */

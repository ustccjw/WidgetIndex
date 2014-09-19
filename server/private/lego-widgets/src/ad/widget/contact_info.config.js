/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.config.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/contact_info.config.js ~ 2014/07/30 15:52:21
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * contact_info相关的实现逻辑
 **/

var WIDGET_CONFIG = {
    'separator': '：',
    'options': [
        {
            'name': '电话',
            'text': '4008-123-123',
            'link_type': false
        },
        {
            'name': '手机',
            'text': '138-0013-8000',
            'link_type': 'url',
            'rcv_url': 'http://gogogogo.go'
        },
        {
            'name': '邮箱',
            'text': '132@baidu.com',
            'link_type': 'mail',
            'mail_address': 'hekai02@baidu.com'
        }
    ]
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
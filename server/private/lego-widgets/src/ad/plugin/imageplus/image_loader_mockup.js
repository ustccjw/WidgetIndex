/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/plugin/imageplus/image_loader_mockup.js ~ 2013/08/22 11:02:40
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sample相关的实现逻辑
 **/

/*global document:false, setTimeout:false, HASH:false */

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.string');
goog.require('ad.plugin.imageplus.imageLoader');

goog.provide('ad.plugin.imageplus.imageLoaderMockup');


ad.plugin.imageplus.imageLoaderMockup = function () {
    var eventData = {};
    var eventCallbacks = {
        'SHOW_IMAGE_PROMOTION': [],
        'SHOW_IMAGE_DETAIL': []
    };

    ad.base.exportPath('ns.image.event.addListener', function (event, callback) {
        eventCallbacks[event].push(callback);
    });

    ad.plugin.imageplus.imageLoader.getData = function (imgIds, callback) {
        var luJsonData = {
            'title': '三亚旅游',
            'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
            'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
            // 'idea_url': 'http://static.sdg-china.com/ff14/pic/web6/images/logo.png',
            'adlist': [
                {"bid":"","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k0=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k1=%C1%A2%B0%D7%D5%D0%C6%B8&k2=%D5%EB%D6%AF%B2%BC%C1%CF&k3=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k4=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k5=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"弹力牛仔面料","height":90,"isHb":false,"lpId":1,"surl":"","title":"弹力牛仔面料","type":"text","width":980},
                {"bid":"","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C1%A2%B0%D7%D5%D0%C6%B8&k0=%C1%A2%B0%D7%D5%D0%C6%B8&k1=%D5%EB%D6%AF%B2%BC%C1%CF&k2=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k3=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k4=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k5=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"立白招聘","height":90,"isHb":false,"lpId":1,"surl":"","title":"立白招聘","type":"text","width":980},
                {"bid":"","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%EB%D6%AF%B2%BC%C1%CF&k0=%D5%EB%D6%AF%B2%BC%C1%CF&k1=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k2=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k3=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k4=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k5=%B7%FE%D7%B0%C3%E6%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"针织布料","height":90,"isHb":false,"lpId":1,"surl":"","title":"针织布料","type":"text","width":980},
                {"bid":"","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k0=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k1=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k2=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k3=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k4=%B7%FE%D7%B0%C3%E6%C1%CF&k5=%C5%A3%D7%D0%B2%BC&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"针织牛仔面料","height":90,"isHb":false,"lpId":1,"surl":"","title":"针织牛仔面料","type":"text","width":980},
                {"target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k0=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&k1=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k2=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k3=%B7%FE%D7%B0%C3%E6%C1%CF&k4=%C5%A3%D7%D0%B2%BC&k5=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"我要注册域名","height":90,"isHb":false,"lpId":1,"surl":"","title":"我要注册域名","type":"text","width":980},
                {"target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k0=%D5%EB%D6%AF%B5%C4%C5%A3%D7%D0&k1=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k2=%B7%FE%D7%B0%C3%E6%C1%CF&k3=%C5%A3%D7%D0%B2%BC&k4=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k5=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"针织的牛仔","height":90,"isHb":false,"lpId":1,"surl":"","title":"针织的牛仔","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k0=%D5%FD%B9%E6%D3%F2%C3%FB%D7%A2%B2%E1&k1=%B7%FE%D7%B0%C3%E6%C1%CF&k2=%C5%A3%D7%D0%B2%BC&k3=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k4=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k5=%C6%BB%B9%FBid%D7%A2%B2%E1&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"正规域名注册","height":90,"isHb":false,"lpId":1,"surl":"","title":"正规域名注册","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B7%FE%D7%B0%C3%E6%C1%CF&k0=%B7%FE%D7%B0%C3%E6%C1%CF&k1=%C5%A3%D7%D0%B2%BC&k2=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k3=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k4=%C6%BB%B9%FBid%D7%A2%B2%E1&k5=%C9%C6%B4%E6%D2%F8%C6%AC&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"服装面料","height":90,"isHb":false,"lpId":1,"surl":"","title":"服装面料","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C5%A3%D7%D0%B2%BC&k0=%C5%A3%D7%D0%B2%BC&k1=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k2=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k3=%C6%BB%B9%FBid%D7%A2%B2%E1&k4=%C9%C6%B4%E6%D2%F8%C6%AC&k5=%BD%BB%D3%D1%CD%F8%D5%BE&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"牛仔布","height":90,"isHb":false,"lpId":1,"surl":"","title":"牛仔布","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k0=%CD%AC%B3%C7%BD%BB%D3%D1%CD%F8%D5%BE&k1=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k2=%C6%BB%B9%FBid%D7%A2%B2%E1&k3=%C9%C6%B4%E6%D2%F8%C6%AC&k4=%BD%BB%D3%D1%CD%F8%D5%BE&k5=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"同城交友网站","height":90,"isHb":false,"lpId":1,"surl":"","title":"同城交友网站","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k0=%D5%EB%D6%AF%B2%BC%C3%E6%C1%CF&k1=%C6%BB%B9%FBid%D7%A2%B2%E1&k2=%C9%C6%B4%E6%D2%F8%C6%AC&k3=%BD%BB%D3%D1%CD%F8%D5%BE&k4=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k5=%B1%A6%C2%ED&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"针织布面料","height":90,"isHb":false,"lpId":1,"surl":"","title":"针织布面料","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C6%BB%B9%FBid%D7%A2%B2%E1&k0=%C6%BB%B9%FBid%D7%A2%B2%E1&k1=%C9%C6%B4%E6%D2%F8%C6%AC&k2=%BD%BB%D3%D1%CD%F8%D5%BE&k3=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k4=%B1%A6%C2%ED&k5=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"苹果id注册","height":90,"isHb":false,"lpId":1,"surl":"","title":"苹果id注册","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C9%C6%B4%E6%D2%F8%C6%AC&k0=%C9%C6%B4%E6%D2%F8%C6%AC&k1=%BD%BB%D3%D1%CD%F8%D5%BE&k2=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k3=%B1%A6%C2%ED&k4=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k5=%B5%AF%C1%A6%B2%BC&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"善存银片","height":90,"isHb":false,"lpId":1,"surl":"","title":"善存银片","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%BD%BB%D3%D1%CD%F8%D5%BE&k0=%BD%BB%D3%D1%CD%F8%D5%BE&k1=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k2=%B1%A6%C2%ED&k3=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k4=%B5%AF%C1%A6%B2%BC&k5=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"交友网站","height":90,"isHb":false,"lpId":1,"surl":"","title":"交友网站","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k0=%D5%EB%D6%AF%C3%E6%C1%CF%B3%A7&k1=%B1%A6%C2%ED&k2=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k3=%B5%AF%C1%A6%B2%BC&k4=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k5=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"针织面料厂","height":90,"isHb":false,"lpId":1,"surl":"","title":"针织面料厂","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B1%A6%C2%ED&k0=%B1%A6%C2%ED&k1=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k2=%B5%AF%C1%A6%B2%BC&k3=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k4=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k5=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"宝马","height":90,"isHb":false,"lpId":1,"surl":"","title":"宝马","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k0=%CF%E3%B8%DB%C2%C3%D3%CE%B9%A5%C2%D4&k1=%B5%AF%C1%A6%B2%BC&k2=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k3=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k4=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k5=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"香港旅游攻略","height":90,"isHb":false,"lpId":1,"surl":"","title":"香港旅游攻略","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B5%AF%C1%A6%B2%BC&k0=%B5%AF%C1%A6%B2%BC&k1=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k2=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k3=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k4=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k5=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"弹力布","height":90,"isHb":false,"lpId":1,"surl":"","title":"弹力布","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k0=%BC%D3%D3%CD%D3%A2%D3%EF%D4%F5%C3%B4%CB%B5&k1=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k2=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k3=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k4=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k5=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"加油英语怎么说","height":90,"isHb":false,"lpId":1,"surl":"","title":"加油英语怎么说","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k0=%B5%AF%C1%A6%C5%A3%D7%D0%BF%E3&k1=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k2=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k3=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k4=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k5=%C1%A2%B0%D7%D5%D0%C6%B8&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"弹力牛仔裤","height":90,"isHb":false,"lpId":1,"surl":"","title":"弹力牛仔裤","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k0=%C6%BB%B9%FB%CF%B5%CD%B3%CF%C2%D4%D8&k1=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k2=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k3=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k4=%C1%A2%B0%D7%D5%D0%C6%B8&k5=%D5%EB%D6%AF%B2%BC%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"苹果系统下载","height":90,"isHb":false,"lpId":1,"surl":"","title":"苹果系统下载","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k0=%B7%C2%C5%A3%D7%D0%C3%E6%C1%CF&k1=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k2=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k3=%C1%A2%B0%D7%D5%D0%C6%B8&k4=%D5%EB%D6%AF%B2%BC%C1%CF&k5=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"仿牛仔面料","height":90,"isHb":false,"lpId":1,"surl":"","title":"仿牛仔面料","type":"text","width":980},
                {"bid":"推荐","target_url":"http://cpro.baidu.com/cpro/ui/uijs.php?c=news&cf=1&ch=0&di=1&fv=14&jk=9b2f1cf738f2991c&k=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k0=%C8%AB%C3%DE%D5%EB%D6%AF%B2%BC&k1=%B5%AF%C1%A6%C5%A3%D7%D0%C3%E6%C1%CF&k2=%C1%A2%B0%D7%D5%D0%C6%B8&k3=%D5%EB%D6%AF%B2%BC%C1%CF&k4=%D5%EB%D6%AF%C5%A3%D7%D0%C3%E6%C1%CF&k5=%CE%D2%D2%AA%D7%A2%B2%E1%D3%F2%C3%FB&n=10&p=baidu&q=subtitler_cpr&rs=1&sid=1c99f238f71c2f9b&stid=5&t=tpclicked3_hc&tu=u1574519&u=http%3A%2F%2Fwww%2Eyyets%2Ecom%2F&urlid=0","desc":"全棉针织布","height":90,"isHb":false,"lpId":1,"surl":"","title":"全棉针织布","type":"text","width":980}
            ]
        };
        var luJsonData1 = baidu.object.clone(luJsonData);
        luJsonData1['image'] = imgArray[27];
        var luJsonData2 = baidu.object.clone(luJsonData);
        luJsonData2['image'] = imgArray[28];
        var luJsonData3 = baidu.object.clone(luJsonData);
        luJsonData3['image'] = imgArray[30];

        var dat = [
            {
                'name':'baike', //for debug
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/baike-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[0],
                        'title': 'MOCKUP-路虎RANDROVER',
                        'desc':'韩国代购正品奢华狐狸毛皮草连帽2韩国代购正品奢华狐狸毛皮草连帽韩国代购正品奢华狐狸毛皮草连帽',
                        'price':'13980.01',
                        'seller_name':'淘宝网',
                        'idea_url':'http://bs.baidu.com/adtest/344744931936a2bfda51819b6fe3302b.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=0',
                        'trade_id': 6       // baike的render应该不支持行业icon
                    },
                    {
                        'image': imgArray[0],
                        'title': 'MOCKUP-路虎RANDROVER',
                        'desc':'1韩国代购正品奢华狐狸毛皮草连帽2韩国代购正品奢华狐狸毛皮草连帽韩国代购正品奢华狐狸毛皮草连帽',
                        'price':'13980.01',
                        'seller_name':'淘宝网',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=1'
                    }
                ]
            },
            {
                'name': 'product',
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/product-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[0],
                        'desc':'MOCKUP-三星 Galaxy S4 I9500 3G手机',
                        'price':'448000.00',
                        'seller_name':'中复商城',
                        'idea_url':'http://img0.pconline.com.cn/pconline/1303/15/3215896_dsc_0661.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=2',
                        // 特殊监控
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    },
                    {
                        'image': imgArray[0],
                        'desc':'MOCKUP-三星 <font color="red">Galaxy</font> S4 I9500 3G手机中华人民共和国',
                        'idea_url':'http://www.people.com.cn/mediafile/pic/20130325/36/4568600226082840712.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=3'
                    }
                ]
            },
            {
                'name': 'video',
                'position_type':'0',
                'render': 'http://bs.baidu.com/public03/imageplus/video-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[1],
                        'desc':'Zero_c制作：DotA每周顶级操作秀第三十五期',
                        'seller_name':'www.17173.com',
                        'idea_url':'http://ecma.bdimg.com/adtest/7f6f1cd3deeda485a50620db503efe5b.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=4',
                        'icon_top_left_x':'333',
                        'icon_top_left_y':'50',
                        'target_url': 'http://baidu.com/'
                    },
                    {
                        'image': imgArray[1],
                        'desc':'赵薇大荧幕导演处女作',
                        'seller_name':'优酷',
                        'idea_url':'http://bcscdn.baidu.com/adtest/5afad8d43c8d44ae85807da79db2cae6.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=5',
                        'title':'致我们终将逝去的青春',
                        'icon_top_left_x':'133',
                        'icon_top_left_y':'50'
                    }
                ]
            },
            {
                'name': 'sticker/pa_4',
                'position_type': '0',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_4.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_4_link-dev.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_with_title-dev.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_4_16px-dev.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_4_white_button-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[2],
                        "desc":"买手机来京东,给力折扣,品类齐全.<font color=#C60A00>三星i9508</font>... 100%正品保证！",
                        "idea_url":"http://ms.bdimg.com/pacific/13742637.jpg",
                        "encry_url":"http://bzclk.baidu.com/eye.php?t=sticker_pa_4",
                        "title":"&lt;京东手机&gt;型号全,货到付款!",
                        "target_url":"http://www.baidu.com/baidu.php?url=0sDK00KbuLQT3cdM5qytVUIX-fPlCAUsgF3YsonF7GRQm5Kh9z0Y0I34-mQITsKbEzlfJu3fyX7VuQ27zcGKABo1WnfYggYU_KdS3Z_D-uHbp-n9BkLgs0p73toyBkdwA3pHj70.DR_ifYgsqE-6BXlQzzLc6OvoE9CE9emrSaFeCEETkvUqvHIdWxfHBmWJuBCrsurgG_LqhS1Wk_lXVK1DWlaI5--8wK_lTheW_4oDsOi1JHzOfq50_nYQAHFu8v20.U1Yk0ZDqz5Lfkvb4PH030Zfqz5Lfkvb4PH030A-V5HcvPsKL5fKM5g9hn0KdpHY0TA-b5HcY0APGujYkP1R0Ugfqn10sn6KVm1Y1nHb4PWfLPWR0pvbqn0K-pyfqn0KVpyfqn0KGTgfqn0K9mWYsg100mhsqn0KWThnqPjcYPWc"
                    }
                ]
            },
            {
                "name": "game",
                "position_type": "2",
                "render": "http://bs.baidu.com/public03/imageplus/game-dev.app.js",
                "ads": [
                    {
                        "image": imgArray[2],
                        "title": "\u51e1\u4eba\u4fee\u771f2",
                        "desc": "\u6ce8\u518c\u5373\u9001\u793c\u5305\uff01\u9080\u4f60\u4e07\u4eba\u56fd\u6218\uff01 \u975eRMB\u7f51\u7edc\u6e38\u620f\u9996\u9009\uff01  ",
                        "seller_name": "\u591a\u73a9\u6e38\u620f",
                        "idea_url": "http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg",

                        "encry_url": "http://bzclk.baidu.com/eye.php?t=game",
                        "target_url": "http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164",
                        "timesign": 1111
                    }
                ]
            },
            {
                'name': 'qiang',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/qiang-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=qiang8',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'single_image',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'single_image_m',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_m-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_m',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'single_flash',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/single_flash-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ubmcmm.baidustatic.com//media//v1//0f000AD6VwVH6YeKMic2cf.swf?url_type=1&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_flash',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '70%',
                        'icon_top_left_y': '30%'
                    }
                ]
            },
            {
                'name': 'single_flash_m',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_flash_m-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ubmcmm.baidustatic.com//media//v1//0f000AD6VwVH6YeKMic2cf.swf?url_type=1&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_flash_m',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'qiang1212',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/qiang1212-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[3],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=qiang12128',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/icon/pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 0,       // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=9',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'50',
                        'icon_top_left_y':'100',
                        'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url9'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 1,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=10',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'100',
                        'icon_top_left_y':'100',
                        'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url10'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？怎么治？怎么治？怎么治？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 0,           // url 加v与否
                        'trade_id': 2,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=11',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'150',
                        'icon_top_left_y':'100'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.chaojixihuanchangdewangzhanmingzi.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 3,         // 行业id
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=12',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'200',
                        'icon_top_left_y':'100'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 4,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=13',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'250',
                        'icon_top_left_y':'100'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 5,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=14',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'300',
                        'icon_top_left_y':'100'
                    },
                    {
                        'image': imgArray[4],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 6,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=14+1',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'350',
                        'icon_top_left_y':'100'
                    }
                ]
            },
            {
                'name': 'ask',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/ask-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[5],
                        'seller_name': '携程网',
                        'is_v': true,
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url': 'http://bzclk.baidu.com/eye.php?t=15',
                        'target_url': 'http://baidu.com',
                        'title': '马尔代夫选岛的原则是什么？',
                        'desc': '选岛的原则是“五不去”：1人太多的不去；2太贵的不去；3太差的不去；4没有水上屋的不去；5现代化气息太浓的不去。'
                    }
                ]
            },
            {
                'name': 'product2',
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/product2-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[5],
                        'desc':'MOCKUP-三星 Galaxy S4 I9500 3G手机',
                        'price':'448000.00',
                        'seller_name':'中复商城',
                        'idea_url':'http://img0.pconline.com.cn/pconline/1303/15/3215896_dsc_0661.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=16',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'medical-disease',
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/medical_disease-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[6],
                        'title': '肠胃炎',
                        'desc': '<font color="red">胃肠炎</font>是胃黏膜和肠黏膜发炎，由食物中毒引起。症状包括：严重呕吐和腹...',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=medical-disease',
                        'target_url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164',
                        'adlist': [
                            {'desc': '<font color="red">肠胃炎</font>的症状及治疗？', 'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164'},
                            {'desc': '急性<font color="red">肠胃炎</font>治疗方法有哪些？', 'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164'},
                            {'desc': '<font color="red">肠胃炎</font>自我诊断方法', 'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164'}
                        ],
                        'search_ad': {
                            'query': '肠胃炎',
                            'disurl': 'http://bzclk.baidu.com/eye.php?t=disease&query=',
                            'hosurl': 'http://bzclk.baidu.com/eye.php?t=hospital&query='
                        },
                        'timesign': 111
                    }
                ]
            },
            {
                'name': 'medical-hospital',
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/medical_hospital-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[6],
                        'title': '肠胃炎',
                        'desc': '<font color="red">胃肠炎</font>是胃黏膜和肠黏膜发炎，由食物中毒引起。症状包括：严重呕吐和腹...',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=medical-hospital',
                        'target_url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164&ck=4339.2.9999.233.201.237.192.5815',
                        'adlist': [
                            {
                                'title': '北京同济医院',
                                'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164',
                                'desc': '胃肠炎是胃黏膜和肠黏膜发炎，由食物中毒引起。症状包括：严重呕吐和腹...',
                                'vip': true,
                                'star': 4
                            },
                            {
                                'title': '复旦大学附属华山医院',
                                'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164',
                                'desc': '',
                                'vip': true,
                                'star': 0
                            },
                            {
                                'title': '海淀医院',
                                'url': 'http://www.baidu.com/zhixin.php?url=Wx_K000vAftHUK9gcu-5kMA83rMLSMbeJyVa1mnv3xHl6sKGWtnuf8ehvQ-vSc2PYW-UL-hOqqGL44lYSZG_iBcnW7-kDSAGJ3iE_84NrkDHfCAigI5JpNAreLg98tLcOitch2t.DR_az1ktV5wKGlry56xf9J4mJ5ELExJmEukmr8M7IwikNsTAWwYQDkl_3_as1f_IMW83qc0.THLH1_SL0Zwzmyw-pyfqrjn0mvq1I7qzmy4o5H00TLNBTy-b5HD1rjRsnWD4rHm4P1n4Pjm0ugw4TARqnfK-pyfqnHn4nsK-uAN1mv-b5HDdn1RLnWf3rjf0mvkGmvVxIZ-suHYz0ZK85HD0IANzUy-8mysqn0KlIjdGUy7MufK-XZfqpyd9uvNxIMPsrM_Bmv4YUBclch-VmyIsUZN1g1m3n-tknj0snHRkcMYervuzUvYlpyd9uvNxIMPsr1_0mLFW5HmzP164',
                                'desc': '',
                                'vip': false,
                                'star': 5
                            }
                        ],
                        'timesign': 111
                    }
                ]
            },
            {
                'name': 'pa补量',
                'position_type':'1',
                'render': 'http://bs.baidu.com/public03/imageplus/links-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[6],
                        "title":"悦容庄瓦宾法鲁岛度假村预定，Agoda特价酒瑞荣瑞荣瑞荣瑞荣",
                        "multi_link_desc": [
                            {"name": "慢且斯特旅游"},
                            {"name": "巴厘岛旅游"},
                            {"name": "阿尔吧你呀尼亚旅游"},
                            {"name": "法国旅游"},
                            {"name": "新加坡旅游"},
                            {"name": "西班牙旅游"},
                            {"name": "菲律宾旅游"},
                            {"name": "日本旅游"},
                            {"name": "俄罗斯旅游"}
                        ],
                        "show_url": "agoda.com/zh-cn",
                        "idea_url": "http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg",
                        "encry_url":"http://bzclk.baidu.com/eye.php?t=links",
                        "target_url": "http://bzclk.baidu.com/eye.php?t=target_url"
                    }
                ]
            },
            {
                'name': 'pa2',
                'position_type':'0',
                'render': 'http://bs.baidu.com/public03/imageplus/pa2-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[7],
                        'title':'风湿性关节炎怎么办？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 1,           // url 加v与否
                        'trade_id': 0,       // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=pa2_1',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'50',
                        'icon_top_left_y':'350'
                    },
                    {
                        'image': imgArray[7],
                        'title':'风湿性关节炎怎么办？怎么治？怎么治？怎么治？怎么治？怎么治？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生',
                        'show_url': 'www.aaaaxxxxxxxx.com',
                        'is_v': 0,           // url 加v与否
                        'trade_id': 2,         // 行业id
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=pa2_2',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x':'150',
                        'icon_top_left_y':'100'
                    }
                ]
            },
            {
                'name': 'single_image_1',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_1-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_1',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'trade_id': 0
                    }
                ]
            },
            {
                'name': 'single_image_2',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_2-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_2',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'trade_id': 1
                    }
                ]
            },
            {
                'name': 'single_image_3',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_3-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_3',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'trade_id': 2
                    }
                ]
            },
            {
                'name': 'single_image_4',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_4-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_4',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '30%',
                        'icon_top_left_y': '30%',
                        'trade_id': 3
                    }
                ]
            },
            {
                'name': 'single_flash_4',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/single_flash_4-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ubmcmm.baidustatic.com/media/v1/0f0000gKbiG-SI4bUffics.swf?url_type=1&snapshot=&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_flash_4',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '60%',
                        'icon_top_left_y': '60%',
                        'trade_id': 4
                    }
                ]
            },
            {
                'name': 'single_flash_1',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_flash_1-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ubmcmm.baidustatic.com//media//v1//0f000AD6VwVH6YeKMic2cf.swf?url_type=1&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_flash_1',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'trade_id': 5
                    }
                ]
            },
            {
                'name': 'single_flash_2',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/single_flash_2-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[8],
                        'idea_url':'http://ubmcmm.baidustatic.com/media/v1/0f000QNXZK9r6p0h4Qu4ks.swf?url_type=1&snapshot=&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_flash_2',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'trade_id': 6
                    }
                ]
            },
            {
                'name': 'single_image_5',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image_5-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[9],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_5',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '30%',
                        'icon_top_left_y': '30%'
                    }
                ]
            },
            {
                'name':'single_image_align_left', //for debug
                'position_type':'4',
                'render': 'http://bs.baidu.com/public03/imageplus/single_image-dev.app.js',
                'ads':[
                    {
                        'image': imgArray[10],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_align_left_1',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    },
                    {
                        'image': imgArray[10],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=single_image_align_left_2',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'lu',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/lu-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[11],
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_0',
                        'encry_url': 'http://bzclk.baidu.com/eye.php?t=encry_url_0',
                        'adlist': [
                            {
                                'title': '要学历找自力',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_0',
                                'idea_url': 'http://ecma.bdimg.com/adtest/fbb2726cc0bcfc0b5c2f374d01e7c10e.gif',
                                'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url_0'
                            },
                            {
                                'title': '上海职业技术学院-上海民办大首',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_1',
                                'idea_url': 'http://ecma.bdimg.com/adtest/fbb2726cc0bcfc0b5c2f374d01e7c10e.gif',
                                'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url_1'
                            },
                            {
                                'title': '上海职业技术学院-上海民办大首',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_2',
                                'idea_url': 'http://ecma.bdimg.com/adtest/fbb2726cc0bcfc0b5c2f374d01e7c10e.gif',
                                'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url_2'
                            },
                            {
                                'title': '上海职业技术学院-上海民办大首',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_3',
                                'idea_url': 'http://ecma.bdimg.com/adtest/fbb2726cc0bcfc0b5c2f374d01e7c10e.gif',
                                'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url_3'
                            }
                        ]
                    }
                ]
            },
            {
                'name': 'sticker/html',
                'position_type': '3',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/html-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[12],
                        "desc":"<!DOCTYPE html>\n<html>\n    \n    <head>\n        <!-- 0| -->\n        <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\" \/>\n        <title>百度网盟推广<\/title>\n        <style type=\"text\/css\">\n            \nhtml{color:#000;background-color:transparent;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}q:before,q:after{content:\'\'}abbr,acronym{border:0;font-variant:normal}sup{vertical-align:text-top}sub{vertical-align:text-bottom}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}input,textarea,select{*font-size:100%}legend{color:#000}body{margin:0;padding:0;}          \n.bd-logo,.bd-logo2,.bd-logo3,.bd-logo4{text-decoration:none;cursor:pointer;display:block;overflow:hidden;position:absolute;bottom:0;right:0;z-index:2147483647}.bd-logo{height:18px;width:18px;background:url(http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/bg.png) no-repeat left top;background-position:0 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/logo-border-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo:hover{background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/logo-border-dark.png\",sizingMethod=\"crop\")}.bd-logo2{margin:0 2px 2px 0;height:14px;width:13px;background:url(http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/bg.png) no-repeat left top;background-position:0 -20px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/logo-noborder-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo2:hover{background-position:0 -35px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/logo-noborder-dark.png\",sizingMethod=\"crop\")}.bd-logo3{height:18px;width:18px;background:url(http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/bg.png) no-repeat left top;background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/logo-border-dark.png\",sizingMethod=\"crop\");_background:0}.bd-logo3:hover{width:68px}.bd-logo4{height:18px;width:18px;bottom:0;left:0;background:url(http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/bd-logo4.png) no-repeat left top;background-position:center;background-size:100%,100%;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/img\/2.0.1\/bd-logo4.png\",sizingMethod=\"crop\");_background:0}\n.loader{ text-align:center; width:90%; font-size:12px; padding:8px; border:solid 1px #aaaaaa; margin-top:30px; display:none; }.cf:before,.cf:after{content:\"\\20\";display:table;}.cf:after{clear:both;}.cf{*zoom:1;}\n.textOverflow{white-space:nowrap;overflow:hidden;display:inline-block;width:100%;}.textOverflowEllipsis{-o-text-overflow:ellipsis;text-overflow:ellipsis;}.textOverflowClip{-o-text-overflow:clip;text-overflow:clip;}\n\n        <\/style>\n        <script type=\"text\/javascript\">\n            \nvar Base={config:{},cache:{},getKeysByType:function(b){b=(b||\"class\").toLowerCase();var a=b+\"LoadFinished\",c=b+\"LoadFnArray\",d=b+\"LoadMap\";this[a]=\"boolean\"===typeof this[a]?this[a]:!0;this[c]=this[c]||[];this[d]=this[d]||{};return{status:a,array:c,map:d,type:b}},updateLoadStatus:function(b,a,c){c=this.getKeysByType(c);if(b&&(this[c.map][b]=a,\"loaded\"!==a))return this[c.status]=!1;b=!0;for(var d in this[c.map])if(d&&this[c.map].hasOwnProperty(d)&&\"loaded\"!==this[c.map][d]){b=!1;break}return this[c.status]=\nb},loadImage:function(b){var a=new Image;a.onload=a.onerror=a.onabort=function(){a.onload=a.onerror=a.onabort=null;this.updateLoadStatus(b,\"loaded\",\"image\");if(this.imageLoadFinished)for(var c,d=0,h=this.imageLoadFnArray.length;d<h;d++)c=this.imageLoadFnArray.shift(),c()}.proxy(this);a.src=b},fastClone:function(b){var a=function(){};a.prototype=b;return new a},declare:function(b){b=b();var a=b.name;if(!a)throw\"can\'t find the obj name\";for(var c=b.namespace+\".\"+a,d=c.split(\".\"),h=d.length,f=window,\nj=\"\",e=0;e<h-1;e++){var g=d[e];f==window?(f[g]=window[g]=window[g]||{},j+=g):(f[g]=f[g]||{},j+=\".\"+g);f=f[g];this.cache[j]=f}f[a]=f[a]||b;this.cache=this.cache||{};this.cache[c]=f[a];return!0},using:function(b,a,c){if(this.cache&&this.cache[b])return this.cache[b];a=a||\"class\";c=c||this.config.version[a]||\"1.0.0\";var d;switch(a){case \"image\":0>b.indexOf(\"http\")&&(b=this.config.baseUrl+\"img\/\"+(c&&\"0\"!==c?c.toString():\"\")+\"\/\"+b);this.updateLoadStatus(b,\"loading\",\"image\");this.loadImage(b);d=b;break;\ncase \"class\":var h=this.getKeysByType(a);a=b.split(\".\");d=window[a[0]];for(var f=1,j=a.length;f<j;f++)d=d&&d[a[f]]?d[a[f]]:null;if(!d&&!this[h.map][b]){this.updateLoadStatus(b,\"loading\",\"class\");var e=document.createElement(\"script\");e.type=\"text\/javascript\";e.async=!0;a=this.config.baseUrl+\"js\/\";c&&\"0\"!==c&&(a+=c.toString()+\"\/\");a+=b.replace(\/\\.\/gi,\"\/\")+\".js\";e.src=a.toLowerCase();e.onload=e.onerror=e.onreadystatechange=function(){if(\/loaded|complete|undefined\/.test(e.readyState)){e.onload=e.onerror=\ne.onreadystatechange=null;if(this.updateLoadStatus(b,\"loaded\",\"class\"))for(var a,c=0,d=this[h.array].length;c<d;c++)a=this[h.array].shift(),a();e=void 0}}.proxy(this);c=document.getElementsByTagName(\"script\")[0];c.parentNode.insertBefore(e,c)}this.cache=this.cache||{};this.cache[b]=d}return d},config:function(b){b&&(this.config=b)},run:function(b){if(b){var a=this.getKeysByType();this[a.status]?b():this[a.array].push(b)}}};\nFunction.prototype.proxy=function(b){var a=this,c=Array.prototype.slice.apply(arguments).shift();return function(b){return a.apply(c,arguments)}};window.declare=Base.declare.proxy(Base);window.using=Base.using.proxy(Base);window.run=Base.run.proxy(Base);window.config=Base.config.proxy(Base);document.execCommand(\"BackgroundImageCache\",!1,!0);\n\n        <\/script>\n        <script type=\"text\/javascript\">\n            config({\n                baseUrl: \"http:\/\/cpro.baidustatic.com\/cpro\/ui\/noexpire\/\",\n                version: {\n                    \"class\": \"3.1.6\",\n                    \"image\": \"2.0.1\"\n                }\n            });\n            using(\'Cpro\');\n        <\/script>\n    <\/head>\n    \n    <body>\n        <script type=\"text\/javascript\">\n            var ads = [{\"title\":\"打飞机小游戏\",\"icon\":\"750\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k0=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k1=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k2=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k3=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k4=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k5=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=1\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"移动硬盘启动pe\",\"icon\":\"476\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k0=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k1=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k2=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k3=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k4=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k5=%C1%AC%C1%AC%BF%B4&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=2\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"酒店设计公司\",\"icon\":\"650\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k0=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k1=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k2=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k3=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k4=%C1%AC%C1%AC%BF%B4&k5=%B9%C8%B8%E8cpa%C1%AA%C3%CB&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=3\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"英雄联盟礼包\",\"icon\":\"750\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k0=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k1=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k2=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k3=%C1%AC%C1%AC%BF%B4&k4=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k5=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=4\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"小游戏连连看\",\"icon\":\"750\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k0=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&k1=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k2=%C1%AC%C1%AC%BF%B4&k3=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k4=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k5=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=5\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"从移动硬盘启��\",\"icon\":\"476\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k0=%B4%D3%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k1=%C1%AC%C1%AC%BF%B4&k2=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k3=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k4=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k5=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=6\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"连连��\",\"icon\":\"750\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%C1%AC%C1%AC%BF%B4&k0=%C1%AC%C1%AC%BF%B4&k1=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k2=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k3=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k4=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k5=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=7\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"谷歌cpa联盟\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k0=%B9%C8%B8%E8cpa%C1%AA%C3%CB&k1=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k2=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k3=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k4=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k5=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=8\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"},{\"title\":\"移动硬盘启动\",\"icon\":\"476\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http:\/\/cpro.baidu.com\/cpro\/ui\/uijs.php?rs=1&u=http%3A%2F%2Ftu%2Etgbus%2Ecom%2Ftupian%2F74549%2F25%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=tgbus_cpr&k=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k0=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AF&k1=%B4%F2%B7%C9%BB%FA%D0%A1%D3%CE%CF%B7&k2=%D2%C6%B6%AF%D3%B2%C5%CC%C6%F4%B6%AFpe&k3=%BE%C6%B5%EA%C9%E8%BC%C6%B9%AB%CB%BE&k4=%D3%A2%D0%DB%C1%AA%C3%CB%C0%F1%B0%FC&k5=%D0%A1%D3%CE%CF%B7%C1%AC%C1%AC%BF%B4&sid=6ecaeb67e2ccb06f&ch=0&tu=u1450745&jk=6fb0cce267ebca6e&cf=1&fv=9&stid=0&urlid=0&luki=9\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"500\",\"height\":\"76\",\"type\":\"text\"}];\n            var config = {\"at\":\"97\",\"cad\":1,\"conOP\":0,\"hn\":3,\"lunum\":6,\"rsi0\":500,\"rsi1\":76,\"rsi5\":4,\"titFS\":14,\"wn\":3};\n            var ra = antiCheatArray = [0,0,0,0,0,0,0,0,0];\n            \n            config.displayType = \"inlay\";\n            config.stuffType = \"iconlinkunit\";\n            \n            config.iconLinkUnitConfig = {\n                enableClick : 0\n            };\n            if(config.iconLinkUnitConfig){\n              if(config.titFS != null && config.titFS == 14){\n                    using(\"http:\/\/cpro.baidustatic.com\/cpro\/exp\/lupage\/img\/icon_14px.png\",\"image\",\"0\");\n                }else{\n                    using(\"http:\/\/cpro.baidustatic.com\/cpro\/exp\/lupage\/img\/icon_12px.png\",\"image\", \"0\");\n                }\n            }\n            config.isGongyi = (ads && ads[0] && ads[0].isHB) ? true : false;\n        <\/script>\n        <style type=\"text\/css\">\n    #container{background-color:#000000;opacity:.75;filter:alpha(opacity=75);}\n        .title{text-decoration:none}\n       .title a{text-decoration:none}\n     .wrapper_top_12,.wrapper_top_14{float:left;line-height:12px;width:12px;font-size:12px;border:0px;color:#ffffff;text-align:center;margin-right:3px;margin-top:2px;padding-top:1px;}\n     .wrapper_normal_12,.wrapper_normal_14{float:left;line-height:12px;width:12px;font-size:12px;border:0px;color:#ffffff;text-align:center;margin-right:3px;margin-top:2px;padding-top:1px;}\n        #container .title a{position:relative;display:block;}\n        #container .wrapper_top_12, #container .wrapper_top_14, #container .wrapper_normal_12, #container .wrapper_normal_14{margin-top:0;padding-top:2px;padding-bottom:2px;}\n        #container .item{cursor:pointer;}\n        #container .title{position:relative;}\n        #container .hilite a{color:#fff;}\n        <\/style>\n        <script type=\"text\/javascript\">\n        \n            if (config.rss2 && (config.rss2.toLowerCase() == \"#0000ff\" || config.rss2.toLowerCase() == \"#00f\")) {\n                config.rss2 = \"#000000\";\n            }\n            if(!config.iconbh){\n              config.iconbh = \"#F2405B\";\n            }\n            if(!config.iconbl){\n              config.iconbl = \"#858585\";\n            }\n            config.rss2=\"#ffffff\";\n            config.rss1=\"#000000\";\n        <\/script>\n        <!-- main -->\n        <div id=\"loader\" class=\"loader\">loading......<\/div>\n        <div id=\"lu_loader\" class=\"loader\">loading......<\/div>\n        <!-- \/\/main -->\n        <script type=\"text\/javascript\">\n       var ThisPage = {\n            layout: function(h) {\n                var k = h.userConfig;\n                var c = h.fullConfig;\n                var i = true;\n                var o = {};\n                var q = using(\"Cpro.Template.LayoutEngine.Base\");\n                c.containerPaddingLeft = 0;\n                c.containerPaddingRight = 0;\n                c.containerPaddingTop = 0;\n                c.containerPaddingBottom = 0;\n                var f = c.templateWidth;\n                var j = c.templateHeight;\n                var g = q.layoutContainer(f, j, c);\n                c.titlePaddingLeft = 0;\n                c.titlePaddingRight = 0;\n                c.titlePaddingTop = 0;\n                c.titlePaddingBottom = 0;\n                c.titleFrontIconPaddingRight = 0;\n                var l = 7 * c.titleFontSize;\n                var d = c.titleFontSize + 4;\n                c.titleLineHeight = c.titleFontSize + 4;\n                c.titleFontFamily = decodeURIComponent(c.titleFontFamily);\n                if (c.titleFontFamily !== decodeURIComponent(\"%E5%AE%8B%E4%BD%93\")) {\n                    c.titleFontFamily += \",\" + decodeURIComponent(\"%E5%AE%8B%E4%BD%93\")\n                }\n                var r = q.layoutTitle(l, d, c, \"left\");\n                o[r.dataKey] = r;\n    c.itemPaddingLeft = 0;\n    c.itemPaddingRight = 0;\n                c.itemPaddingTop = 1;\n                c.itemPaddingBottom = 1;\n                var b = 7 * c.titleFontSize + c.itemPaddingLeft + c.itemPaddingRight;\n                var m = c.titleFontSize + 4 + c.itemPaddingTop + c.itemPaddingBottom;\n                if (c.iconLinkUnitConfig) {\n                    \/\/var a = c.titleFontSize == 12 ? 15 : 16;\n                    \/\/var e = c.titleFontSize == 12 ? 12 : 15;\n                    var a = 12;\n        var e = 12;\n        var n = q.layoutIcon(a, e, c);\n                    o[n.dataKey] = n;\n                    \/\/b = b + a + c.titleFrontIconPaddingRight;\n        \/\/number margin-right \n                var rankspace = c.titleFontSize == 12 ? 3 : 4;\n                    b = b + a + rankspace;\n                }\n                var p = q.layoutItem(b, m, c);\n                if (c.iconLinkUnitConfig) {\n                    p.content.push(n)\n                }\n                p.content.push(r);\n                if (c.adColumnCount > 1) {\n                    c.itemColumnSpace = Math.floor((c.templateWidth - 2 * c.containerBorderWidth - b * c.adColumnCount) \/ (c.adColumnCount - 1))\n                } else {\n                    c.itemColumnSpace = c.templateWidth - 2 * c.containerBorderWidth - b * c.adColumnCount\n                }\n                if (c.adRowCount > 1) {\n                    c.itemRowSpace = Math.floor((c.templateHeight - 2 * c.containerBorderWidth - m * c.adRowCount) \/ (c.adRowCount - 1))\n                } else {\n                    c.itemRowSpace = c.templateHeight - 2 * c.containerBorderWidth - m * c.adRowCount\n                }\n                g = q.layoutSpace(g, p, c);\n                g.layoutIndex = o;\n                return g\n            },\n            initialize : function () {\n                this.template = using(\"Cpro.Template\");\n                this.varManager = using(\"Cpro.Template.TemplateVariableManager\");\n                this.userConfig = this.varManager.getFullNameConfig(window.config);\n                this.styleCss = using(\"Cpro.Utility.CssBuilder\");\n                this.fullConfig = this.varManager.getVariables(this.userConfig);\n                this.AddStyleCss();\n                resort_ads = this.resortAdbyColumn(ads, this.userConfig);\n                this.layoutObj = this.layout({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig\n                });\n                    \n                this.template.PaintEngine.paint({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig,\n                    layoutObj : this.layoutObj,\n                    data : resort_ads\n                });\n                \n                this.template.DataEngine.paint({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig,\n                    layoutObj : this.layoutObj,\n                    data : resort_ads\n                });\n                \n                this.initIcon(resort_ads,this.userConfig);\n                \/\/Added\n                this.initEvents();\n                \/\/-Added\n            },\n            \/\/Added\n            currentHLElement: null,\n            fadeInTimer: 0,\n            fadeOutTimer: 0,\n            fadeInTimeout: 20,\n            fadeOutTimeout: 20,\n            fadeInTime: 300,\n            fadeOutTime: 300,\n            AddStyleCss :function(){\n\n                var CommonCss = \'#container .wrapper_top_12, #container .wrapper_top_14{background-color:\'+config.iconbh+\';}#container .wrapper_normal_12, #container .wrapper_normal_14{background-color:\'+config.iconbl+\'}#container .hilite .title{background-color:\'+config.iconbh+\';}\';\n                this.styleCss.addCss(CommonCss);\n            },\n            setOpacity: function(el,value){\n                el.style.filter = \'alpha(opacity=\'+Math.round(value*100)+\')\';\n                el.style.mozOpacity = value;\n                el.style.opacity = value;\n            },\n            fadeIn: function(el){\n                var that = this;\n                this.setOpacity(el,0);\n                var opacity = 0;\n                var interval = 10;\n                var counter = 0;\n                var times = Math.ceil(that.fadeInTime\/interval);\n                clearInterval(el.fadeInTimer);\n                var timer = el.fadeInTimer = setInterval(function(){\n                    counter++;\n                    opacity = counter\/times;\n                    that.setOpacity(el,opacity);\n                    if(counter >= times){\n                        that.setOpacity(el,1);\n                        clearInterval(timer);\n                    }\n                },interval);\n            },\n            fadeOut: function(el){\n                var that = this;\n                this.setOpacity(el,1);\n                var opacity = 0;\n                var interval = 10;\n                var counter = 0;\n                var times = Math.ceil(that.fadeInTime\/interval);\n                clearInterval(el.fadeOutTimer);\n                var timer = el.fadeOutTimer = setInterval(function(){\n                    counter++;\n                    opacity = 1 - counter\/times;\n                    that.setOpacity(el,opacity);\n                    if(counter >= times){\n                        that.setOpacity(el,0);\n                        clearInterval(timer);\n                    }\n                },interval);\n            },\n            initEvents: function(){\n                \/\/use event delegation\n                var container = document.getElementById(\"container\");\n                var that = this;\n                container.onmouseover = function(e){\n                    e = e || window.event;\n                    var g = e.target || e.srcElement;\n                    if(g.id.substr(0,g.id.lastIndexOf(\"title\")+5).toLowerCase() == \"title\"){\n                      var node = g.parentNode.parentNode.childNodes[0];\n                      \/\/ style.backgroundColor;\n                      var CurrentDomBg = window.getComputedStyle ? window.getComputedStyle(node,null).backgroundColor : node.currentStyle.backgroundColor;\n                      g.parentNode.style.backgroundColor = CurrentDomBg;\n                      g.style.color = \"#ffffff\";\n                  }\n                };\n                container.onmouseout = function(e){\n                   e = e || window.event;\n                    var g = e.target || e.srcElement;\n                    if(g.id.substr(0,g.id.lastIndexOf(\"title\")+5).toLowerCase() == \"title\"){\n                      var node = g.parentNode.parentNode.childNodes[0];\n                      \/\/ style.backgroundColor;\n                      var CurrentDomBg = window.getComputedStyle ? window.getComputedStyle(node,null).backgroundColor : node.currentStyle.backgroundColor;\n                      g.parentNode.style.backgroundColor =\"\";\n                      g.style.color = \"#\"+that.fullConfig.titleFontColor;\n                  }\n                };\n                container.onclick = function(e){\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    if(target.tagName && target.tagName.toUpperCase() === \'A\'){\n                        return;    \n                    }\n                    var node;\n                    node = target;\n                    var isFromDescendant = false;\n                    var crt;\n                    if(!node.className){return;}\n                    while(node && node.className && node.className.indexOf(\'title_\') === -1){\n                        node = node.parentNode;\n                    }\n                    if(node && node.className.indexOf(\'title_\') !== -1){\n                        isFromDescendant = true;\n                    }\n                    crt = node;\n                    if(!isFromDescendant){return;}\n                    var link = crt.getElementsByTagName(\'A\')[0];\n                    if(link){\n                        var url = link.href;\n                        if(url){\n                            window.open(url);    \n                        }\n                    }\n                };\n            },\n            \/\/-Added\n            initIcon : function(ads,param){\n                var container = document.getElementById(\"container\");\n                var ad_index = 0;\n                var top_times = 0;\n                for(var i=0;i<container.children.length && ad_index < ads.length;i++){\n                    var item = container.children[i];\n                    if(item.className == \"item\"){\n                        \/*Added*\/\n                        var type1 = \"nm\", type2 = \"nm\";\n                        var anchor = item.getElementsByTagName(\'A\')[0];\n                        if(anchor){\n                            var text = \'innerText\' in anchor? anchor.innerText:anchor.textContent;\n                            var byteLength = text.replace(\/[^\\u0000-\\u00ff]\/g,\'aa\').length;\n                            if(byteLength <= 12){\n                                type2 = \"nr\";    \n                            }  \n                        }\n                        \/*-Added*\/\n                        if (param.adRowCount == 1) {\n                  if (ad_index < 3) {\n                      \/*Added*\/\n                      type1 = \"tp\";\n                      \/*-Added*\/\n                            item.className = \"item title_top\"\/*Added*\/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize\/*-Added*\/;\n                    item.children[0].className = \"wrapper_top_\" + param.titleFontSize;\n                  } else {\n                            item.className = \"item title_normal\"\/*Added*\/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize\/*-Added*\/;\n                    item.children[0].className = \"wrapper_normal_\" + param.titleFontSize;\n                  }\n                        } else {\n                  if (ad_index % param.adColumnCount == 0 && top_times < 3) {\n                      \/*Added*\/\n                      type1 = \"tp\";\n                      \/*-Added*\/\n                            item.className = \"item title_top\"\/*Added*\/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize\/*-Added*\/;\n                    item.children[0].className = \"wrapper_top_\" + param.titleFontSize;\n                            top_times++;\n                  } else {\n                            item.className = \"item title_normal\"\/*Added*\/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize\/*-Added*\/;\n                    item.children[0].className = \"wrapper_normal_\" + param.titleFontSize;\n                  }\n                        }\n                  item.children[0].innerHTML = ad_index % param.adColumnCount * param.adRowCount + parseInt(ad_index \/ param.adColumnCount) + 1;\n                        ad_index++;\n                    }\n                }\n            },\n            resortAdbyColumn : function(ads, param) {\n                var resort_ads = new Array(param.adRowCount * param.adColumnCount);\n                for (var i = 0; i < resort_ads.length; i++) {\n                    if (i >= ads.length) {\n                        resort_ads[i % param.adRowCount * param.adColumnCount + parseInt(i \/ param.adRowCount)] = ads[i - ads.length];\n                    } else {\n                        resort_ads[i % param.adRowCount * param.adColumnCount + parseInt(i \/ param.adRowCount)] = ads[i];\n                    }\n                }\n                return resort_ads;\n            }\n        };\n        run(ThisPage.initialize.proxy(ThisPage));\n        \n        \n        (function(){try{var d={getCookie:function(p,t){var o;var t=t||window;var s=t.document;var q=new RegExp(\"(^| )\"+p+\"=([^;]*)(;|\\x24)\");var r=q.exec(s.cookie);if(r){o=r[2]}return o},setCookie:function(q,r,p){p=p||{};var o=p.expires;if(\"number\"==typeof p.expires){o=new Date();o.setTime(o.getTime()+p.expires)}document.cookie=q+\"=\"+r+(p.path?\"; path=\"+p.path:\"\")+(o?\"; expires=\"+o.toGMTString():\"\")+(p.domain?\"; domain=\"+p.domain:\"\")+(p.secure?\"; secure\":\"\")}};var g={sendByIframe:function(o){var p=document.createElement(\"iframe\");p.id=\"ifr\"+parseInt(Math.random()*100000);p.style.display=\"none\";p.setAttribute(\"src\",o);document.body.insertBefore(p,document.body.firstChild)},sendByImage:function(p,r){var o=new Image();var q=\"cpro_log_\"+Math.floor(Math.random()*2147483648).toString(36);r=r||window;r[q]=o;o.onload=o.onerror=o.onabort=function(){o.onload=o.onerror=o.onabort=null;r[q]=null;o=null};o.src=p}};var f=d.getCookie(\"BAIDUID\");var e=d.getCookie(\"CPROID\");var k=d.getCookie(\"ISUS\");var h=d.getCookie(\"ISBID\");var l=false;var m=false;var n=(new Date()).getTime();if(!e&&f){var j=\"http:\/\/cpro.baidustatic.com\/sync.htm?cproid=\"+encodeURIComponent(f);g.sendByIframe(j)}if(e&&!k){l=true}else{if(e&&k&&e!==k){l=true}}if(f&&!h){m=true}else{if(f&&h&&f!==h){m=true}}if(l||m){var a=new Date();a.setTime(a.getTime()+86400000);d.setCookie(\"ISBID\",f||\"1\",{path:\"\/\",expires:a});d.setCookie(\"ISUS\",e||\"1\",{path:\"\/\",expires:a});if(e&&f){var c=e;var b=e.indexOf(\":\");if(b&&b>0){c=e.substring(0,b)}g.sendByIframe(\"http:\/\/s.cpro.baidu.com\/s.htm?cproid=\"+c+\"&t=\"+n)}if(e){g.sendByIframe(\"http:\/\/weibo.com\/aj\/static\/sync.html?t=\"+n);g.sendByIframe(\"http:\/\/pos.baidu.com\/sync_pos.htm?cproid=\"+encodeURIComponent(e)+\"&t=\"+n);var c=e;var b=e.indexOf(\":\");if(b&&b>0){c=e.substring(0,b)}}}}catch(i){}})();\n(function(){try{var noticeUrl=\"http:\/\/wn.pos.baidu.com\/adx.php?c=cz02ZWNhZWI2N2UyY2NiMDZmAHQ9MTM5NjMzNDAzNQBzZT01AGJ1PTEAcHJpY2U9VXpwZDB3QUhJOTk3akVwZ1c1SUE4dWdnUXplYkRNTEUxODlQV0EAdj0xAGk9ZDYwNTUyYzU\";if(noticeUrl&&noticeUrl!==\"\\x24bdNo\"+\"tice\\x24\"){var img=new Image;var key=\"cpro_log_\"+Math.floor(Math.random()*2147483648).toString(36);var win=window;win[key]=img;img.onload=img.onerror=img.onabort=function(){img.onload=img.onerror=img.onabort=null;win[key]=null;img=null};img.src=noticeUrl}}catch(ex){}})();\n        <\/script>\n    <\/body>\n\n<\/html>\n","price":"","seller_name":"","idea_url":"","encry_url":"http:\/\/bzclk.baidu.com\/eye.php?t=00000000000000000000000000000000w6000K3000a_DXRSa6000ASs1rFMltG8YdYlRs00000.mLFW5HbvrjD0pydM5HD1nj6dnH0zrHfdnWcYrHTkrHnk0Anqfbf1fRFjwHb3PY7KrRndwWnsfbcYnbfLPjKDwRujnbc0IgF_5fKsTWY0UyNz5fK9IZw9mv6qnH0snaRzPWDYPH0LPjR-nWmk00"
                    }
                ]
            },
            {
                'name': 'sticker/html',
                'position_type': '3',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/html-dev.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/flag/lu-dev.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/icon/lu-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[13],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                        "desc": "<!DOCTYPE html>\n<html>\n    \n    <head>\n        <!-- 0| -->\n        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n        <title>百度网盟推广</title>\n        <style type=\"text/css\">\n            \nhtml{color:#000;background-color:transparent;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}q:before,q:after{content:''}abbr,acronym{border:0;font-variant:normal}sup{vertical-align:text-top}sub{vertical-align:text-bottom}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}input,textarea,select{*font-size:100%}legend{color:#000}body{margin:0;padding:0;}          \n.bd-logo,.bd-logo2,.bd-logo3,.bd-logo4{text-decoration:none;cursor:pointer;display:block;overflow:hidden;position:absolute;bottom:0;right:0;z-index:2147483647}.bd-logo{height:18px;width:18px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:0 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo:hover{background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-dark.png\",sizingMethod=\"crop\")}.bd-logo2{margin:0 2px 2px 0;height:14px;width:13px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:0 -20px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-noborder-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo2:hover{background-position:0 -35px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-noborder-dark.png\",sizingMethod=\"crop\")}.bd-logo3{height:18px;width:18px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-dark.png\",sizingMethod=\"crop\");_background:0}.bd-logo3:hover{width:68px}.bd-logo4{height:18px;width:18px;bottom:0;left:0;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bd-logo4.png) no-repeat left top;background-position:center;background-size:100%,100%;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bd-logo4.png\",sizingMethod=\"crop\");_background:0}\n.loader{ text-align:center; width:90%; font-size:12px; padding:8px; border:solid 1px #aaaaaa; margin-top:30px; display:none; }.cf:before,.cf:after{content:\"\\20\";display:table;}.cf:after{clear:both;}.cf{*zoom:1;}\n.textOverflow{white-space:nowrap;overflow:hidden;display:inline-block;width:100%;}.textOverflowEllipsis{-o-text-overflow:ellipsis;text-overflow:ellipsis;}.textOverflowClip{-o-text-overflow:clip;text-overflow:clip;}\n\n        </style>\n        <script type=\"text/javascript\">\n            \nvar Base={config:{},cache:{},getKeysByType:function(b){b=(b||\"class\").toLowerCase();var a=b+\"LoadFinished\",c=b+\"LoadFnArray\",d=b+\"LoadMap\";this[a]=\"boolean\"===typeof this[a]?this[a]:!0;this[c]=this[c]||[];this[d]=this[d]||{};return{status:a,array:c,map:d,type:b}},updateLoadStatus:function(b,a,c){c=this.getKeysByType(c);if(b&&(this[c.map][b]=a,\"loaded\"!==a))return this[c.status]=!1;b=!0;for(var d in this[c.map])if(d&&this[c.map].hasOwnProperty(d)&&\"loaded\"!==this[c.map][d]){b=!1;break}return this[c.status]=\nb},loadImage:function(b){var a=new Image;a.onload=a.onerror=a.onabort=function(){a.onload=a.onerror=a.onabort=null;this.updateLoadStatus(b,\"loaded\",\"image\");if(this.imageLoadFinished)for(var c,d=0,h=this.imageLoadFnArray.length;d<h;d++)c=this.imageLoadFnArray.shift(),c()}.proxy(this);a.src=b},fastClone:function(b){var a=function(){};a.prototype=b;return new a},declare:function(b){b=b();var a=b.name;if(!a)throw\"can't find the obj name\";for(var c=b.namespace+\".\"+a,d=c.split(\".\"),h=d.length,f=window,\nj=\"\",e=0;e<h-1;e++){var g=d[e];f==window?(f[g]=window[g]=window[g]||{},j+=g):(f[g]=f[g]||{},j+=\".\"+g);f=f[g];this.cache[j]=f}f[a]=f[a]||b;this.cache=this.cache||{};this.cache[c]=f[a];return!0},using:function(b,a,c){if(this.cache&&this.cache[b])return this.cache[b];a=a||\"class\";c=c||this.config.version[a]||\"1.0.0\";var d;switch(a){case \"image\":0>b.indexOf(\"http\")&&(b=this.config.baseUrl+\"img/\"+(c&&\"0\"!==c?c.toString():\"\")+\"/\"+b);this.updateLoadStatus(b,\"loading\",\"image\");this.loadImage(b);d=b;break;\ncase \"class\":var h=this.getKeysByType(a);a=b.split(\".\");d=window[a[0]];for(var f=1,j=a.length;f<j;f++)d=d&&d[a[f]]?d[a[f]]:null;if(!d&&!this[h.map][b]){this.updateLoadStatus(b,\"loading\",\"class\");var e=document.createElement(\"script\");e.type=\"text/javascript\";e.async=!0;a=this.config.baseUrl+\"js/\";c&&\"0\"!==c&&(a+=c.toString()+\"/\");a+=b.replace(/\\./gi,\"/\")+\".js\";e.src=a.toLowerCase();e.onload=e.onerror=e.onreadystatechange=function(){if(/loaded|complete|undefined/.test(e.readyState)){e.onload=e.onerror=\ne.onreadystatechange=null;if(this.updateLoadStatus(b,\"loaded\",\"class\"))for(var a,c=0,d=this[h.array].length;c<d;c++)a=this[h.array].shift(),a();e=void 0}}.proxy(this);c=document.getElementsByTagName(\"script\")[0];c.parentNode.insertBefore(e,c)}this.cache=this.cache||{};this.cache[b]=d}return d},config:function(b){b&&(this.config=b)},run:function(b){if(b){var a=this.getKeysByType();this[a.status]?b():this[a.array].push(b)}}};\nFunction.prototype.proxy=function(b){var a=this,c=Array.prototype.slice.apply(arguments).shift();return function(b){return a.apply(c,arguments)}};window.declare=Base.declare.proxy(Base);window.using=Base.using.proxy(Base);window.run=Base.run.proxy(Base);window.config=Base.config.proxy(Base);document.execCommand(\"BackgroundImageCache\",!1,!0);\n\n        </script>\n        <script type=\"text/javascript\">\n            config({\n                baseUrl: \"http://cpro.baidustatic.com/cpro/ui/noexpire/\",\n                version: {\n                    \"class\": \"3.1.1\",\n                    \"image\": \"2.0.1\"\n                }\n            });\n            using('Cpro');\n        </script>\n    </head>\n    \n    <body>\n        <script type=\"text/javascript\">\n            var ads = [{\"title\":\"教师招聘\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%BD%CC%CA%A6%D5%D0%C6%B8&k0=%BD%CC%CA%A6%D5%D0%C6%B8&k1=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k2=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k3=%BF%BC%BC%DD%D5%D5&k4=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k5=%BC%E6%D6%B0%D5%D0%C6%B8&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=1\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"公务员考试\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k0=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k1=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k2=%BF%BC%BC%DD%D5%D5&k3=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k4=%BC%E6%D6%B0%D5%D0%C6%B8&k5=%D5%D2%B9%A4%D7%F7&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=2\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"公务员报考\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k0=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k1=%BF%BC%BC%DD%D5%D5&k2=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k3=%BC%E6%D6%B0%D5%D0%C6%B8&k4=%D5%D2%B9%A4%D7%F7&k5=%D7%A8%C9%FD%B1%BE&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=3\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"考驾照\",\"icon\":\"424\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%BF%BC%BC%DD%D5%D5&k0=%BF%BC%BC%DD%D5%D5&k1=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k2=%BC%E6%D6%B0%D5%D0%C6%B8&k3=%D5%D2%B9%A4%D7%F7&k4=%D7%A8%C9%FD%B1%BE&k5=%CD%F8%C9%CF%B6%A9%C6%B1&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=4\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"驾校一点通\",\"icon\":\"424\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k0=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&k1=%BC%E6%D6%B0%D5%D0%C6%B8&k2=%D5%D2%B9%A4%D7%F7&k3=%D7%A8%C9%FD%B1%BE&k4=%CD%F8%C9%CF%B6%A9%C6%B1&k5=%B5%E7%B9%A4%D6%A4&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=5\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"兼职招聘\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%BC%E6%D6%B0%D5%D0%C6%B8&k0=%BC%E6%D6%B0%D5%D0%C6%B8&k1=%D5%D2%B9%A4%D7%F7&k2=%D7%A8%C9%FD%B1%BE&k3=%CD%F8%C9%CF%B6%A9%C6%B1&k4=%B5%E7%B9%A4%D6%A4&k5=%D1%A7%D3%A2%D3%EF&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=6\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"找工作\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%D5%D2%B9%A4%D7%F7&k0=%D5%D2%B9%A4%D7%F7&k1=%D7%A8%C9%FD%B1%BE&k2=%CD%F8%C9%CF%B6%A9%C6%B1&k3=%B5%E7%B9%A4%D6%A4&k4=%D1%A7%D3%A2%D3%EF&k5=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=7\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"专升本\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%D7%A8%C9%FD%B1%BE&k0=%D7%A8%C9%FD%B1%BE&k1=%CD%F8%C9%CF%B6%A9%C6%B1&k2=%B5%E7%B9%A4%D6%A4&k3=%D1%A7%D3%A2%D3%EF&k4=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k5=%D3%A2%D3%EF%BF%DA%D3%EF&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=8\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"网上订票\",\"icon\":\"586\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%CD%F8%C9%CF%B6%A9%C6%B1&k0=%CD%F8%C9%CF%B6%A9%C6%B1&k1=%B5%E7%B9%A4%D6%A4&k2=%D1%A7%D3%A2%D3%EF&k3=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k4=%D3%A2%D3%EF%BF%DA%D3%EF&k5=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=9\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"电工证\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B5%E7%B9%A4%D6%A4&k0=%B5%E7%B9%A4%D6%A4&k1=%D1%A7%D3%A2%D3%EF&k2=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k3=%D3%A2%D3%EF%BF%DA%D3%EF&k4=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k5=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=10\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"学英语\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%D1%A7%D3%A2%D3%EF&k0=%D1%A7%D3%A2%D3%EF&k1=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k2=%D3%A2%D3%EF%BF%DA%D3%EF&k3=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k4=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k5=%B9%AB%CB%BE%D5%D0%C6%B8&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=11\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"公务员职位\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k0=%B9%AB%CE%F1%D4%B1%D6%B0%CE%BB&k1=%D3%A2%D3%EF%BF%DA%D3%EF&k2=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k3=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k4=%B9%AB%CB%BE%D5%D0%C6%B8&k5=%BD%CC%CA%A6%D5%D0%C6%B8&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=12\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"英语口语\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%D3%A2%D3%EF%BF%DA%D3%EF&k0=%D3%A2%D3%EF%BF%DA%D3%EF&k1=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k2=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k3=%B9%AB%CB%BE%D5%D0%C6%B8&k4=%BD%CC%CA%A6%D5%D0%C6%B8&k5=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=13\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"驾照理论考试\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k0=%BC%DD%D5%D5%C0%ED%C2%DB%BF%BC%CA%D4&k1=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k2=%B9%AB%CB%BE%D5%D0%C6%B8&k3=%BD%CC%CA%A6%D5%D0%C6%B8&k4=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k5=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=14\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"广场舞教学\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k0=%B9%E3%B3%A1%CE%E8%BD%CC%D1%A7&k1=%B9%AB%CB%BE%D5%D0%C6%B8&k2=%BD%CC%CA%A6%D5%D0%C6%B8&k3=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k4=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k5=%BF%BC%BC%DD%D5%D5&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=15\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"},{\"title\":\"公司招聘\",\"icon\":\"406\",\"desc\":\"\",\"surl\":\"\",\"curl\":\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&u=http%3A%2F%2Fwww%2Ebaidu%2Ecom%2F&p=baidu&c=news&n=10&t=tpclicked3_hc&q=gamersky_cpr&k=%B9%AB%CB%BE%D5%D0%C6%B8&k0=%B9%AB%CB%BE%D5%D0%C6%B8&k1=%BD%CC%CA%A6%D5%D0%C6%B8&k2=%B9%AB%CE%F1%D4%B1%BF%BC%CA%D4&k3=%B9%AB%CE%F1%D4%B1%B1%A8%BF%BC&k4=%BF%BC%BC%DD%D5%D5&k5=%BC%DD%D0%A3%D2%BB%B5%E3%CD%A8&sid=eb1a74a8534f6b5e&ch=0&tu=u1440450&jk=5e6b4f53a8741aeb&cf=14&fv=9&stid=0&urlid=0&luki=16\",\"isHB\":false,\"bid\":\"\",\"adpre\":\"0\",\"width\":\"300\",\"height\":\"250\",\"type\":\"text\"}];\n            var config = {\"at\":\"97\",\"cad\":1,\"conBW\":0,\"conOP\":0,\"hn\":8,\"itepl\":0,\"itepr\":0,\"lu1stAB\":0,\"lunum\":16,\"rsi0\":125,\"rsi1\":125,\"rsi5\":4,\"titFS\":12,\"titTA\":\"left\",\"titfip\":0,\"wn\":2};\n            var ra = antiCheatArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];\n            \n            config.displayType = \"inlay\";\n            config.stuffType = \"iconlinkunit\";\n            \n            config.iconLinkUnitConfig = {\n                enableClick : 0\n            };\n            if(config.iconLinkUnitConfig){\n                if(config.titFS != null && config.titFS == 14){\n                    using(\"http://cpro.baidustatic.com/cpro/exp/lupage/img/icon_14px.png\",\"image\", \"0\");\n                }\n                else{\n                    using(\"http://cpro.baidustatic.com/cpro/exp/lupage/img/icon_12px.png\",\"image\", \"0\");\n                }\n            }\n            \n            \n            config.isGongyi = (ads && ads[0] && ads[0].isHB) ? true : false;\n        </script>\n        <style type=\"text/css\">\n       .title{text-decoration:none}\n       .title a{text-decoration:none}\n\n\t   .wrapper_top_12{float:left;line-height:12px;width:12px;font-size:12px;background:#f58220 no-repeat left bottom;border-width:0px;color:#ffffff;text-align:center;margin-right:3px;margin-top:2px;padding-top:1px;}\n\t   .wrapper_top_14{float:left;line-height:12px;width:12px;font-size:12px;background:#f58220 no-repeat left bottom;border-width:0px;color:#ffffff;text-align:center;margin-right:4px;margin-top:3px;padding-top:1px;}\n\t   .wrapper_normal_12{float:left;line-height:12px;width:12px;font-size:12px;background:#d3d3d3 no-repeat left bottom;border-width:0px;color:#ffffff;text-align:center;margin-right:3px;margin-top:2px;padding-top:1px;}\n\t   .wrapper_normal_14{float:left;line-height:12px;width:12px;font-size:12px;background:#d3d3d3 no-repeat left bottom;border-width:0px;color:#ffffff;text-align:center;margin-right:4px;margin-top:3px;padding-top:1px;}\n        /*Added*/\n        #container .hilite .title{background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg-shine.png) no-repeat 0 0;}\n        #container .title a{position:relative;display:block;}\n        #container .wrapper_top_12, #container .wrapper_top_14, #container .wrapper_normal_12, #container .wrapper_normal_14{margin-top:0;padding-top:2px;padding-bottom:2px;}\n        #container .item{cursor:pointer;}\n        #container .wrapper_top_12, #container .wrapper_top_14{background-color:#f2405b;}\n        #container .wrapper_normal_12, #container .wrapper_normal_14{background-color:#858585;}\n\n        #container .title_normal .title{background-position:0px 0 !important;}\n        #container .title_top .title{background-position:-98px 0  !important;}\n        #container .nm_nm_12 .title{background-position:-14px -16px !important;}\n        #container .nm_nr_12 .title{background-position:-14px 0px !important;}\n        #container .tp_nm_12 .title{background-position:-112px -16px !important;}\n        #container .tp_nr_12 .title{background-position:-112px 0px !important;}\n        #container .nm_nm_14 .title{background-position:0px -16px !important;}\n        #container .nm_nr_14 .title{background-position:0px 0px !important;}\n        #container .tp_nm_14 .title{background-position:-98px -16px !important;}\n        #container .tp_nr_14 .title{background-position:-98px 0px !important;}\n        \n        #container .title{position:relative;}\n        #container .hilite a{color:#fff;}\n        </style>\n        <!-- main -->\n        <div id=\"loader\" class=\"loader\">loading......</div>\n        <div id=\"lu_loader\" class=\"loader\">loading......</div>\n        <!-- //main -->\n        <script type=\"text/javascript\">\n        var ThisPage = {\n            layout: function(h) {\n                var k = h.userConfig;\n                var c = h.fullConfig;\n                var i = true;\n                var o = {};\n                var q = using(\"Cpro.Template.LayoutEngine.Base\");\n                c.containerPaddingLeft = 0;\n                c.containerPaddingRight = 0;\n                c.containerPaddingTop = 0;\n                c.containerPaddingBottom = 0;\n                var f = c.templateWidth;\n                var j = c.templateHeight;\n                var g = q.layoutContainer(f, j, c);\n                c.titlePaddingLeft = 0;\n                c.titlePaddingRight = 0;\n                c.titlePaddingTop = 0;\n                c.titlePaddingBottom = 0;\n                c.titleFrontIconPaddingRight = 0;\n                var l = 7 * c.titleFontSize;\n                var d = c.titleFontSize + 4;\n                c.titleLineHeight = c.titleFontSize + 4;\n                c.titleFontFamily = decodeURIComponent(c.titleFontFamily);\n                if (c.titleFontFamily !== decodeURIComponent(\"%E5%AE%8B%E4%BD%93\")) {\n                    c.titleFontFamily += \",\" + decodeURIComponent(\"%E5%AE%8B%E4%BD%93\")\n                }\n                var r = q.layoutTitle(l, d, c, \"left\");\n                o[r.dataKey] = r;\n\t\tc.itemPaddingLeft = 0;\n\t\tc.itemPaddingRight = 0;\n                c.itemPaddingTop = 1;\n                c.itemPaddingBottom = 1;\n                var b = 7 * c.titleFontSize + c.itemPaddingLeft + c.itemPaddingRight;\n                var m = c.titleFontSize + 4 + c.itemPaddingTop + c.itemPaddingBottom;\n                if (c.iconLinkUnitConfig) {\n                    //var a = c.titleFontSize == 12 ? 15 : 16;\n                    //var e = c.titleFontSize == 12 ? 12 : 15;\n                    var a = 12;\n\t\t    var e = 12;\n\t\t    var n = q.layoutIcon(a, e, c);\n                    o[n.dataKey] = n;\n                    //b = b + a + c.titleFrontIconPaddingRight;\n\t\t    //number margin-right \n\t\t            var rankspace = c.titleFontSize == 12 ? 3 : 4;\n                    b = b + a + rankspace;\n                }\n                var p = q.layoutItem(b, m, c);\n                if (c.iconLinkUnitConfig) {\n                    p.content.push(n)\n                }\n                p.content.push(r);\n                if (c.adColumnCount > 1) {\n                    c.itemColumnSpace = Math.floor((c.templateWidth - 2 * c.containerBorderWidth - b * c.adColumnCount) / (c.adColumnCount - 1))\n                } else {\n                    c.itemColumnSpace = c.templateWidth - 2 * c.containerBorderWidth - b * c.adColumnCount\n                }\n                if (c.adRowCount > 1) {\n                    c.itemRowSpace = Math.floor((c.templateHeight - 2 * c.containerBorderWidth - m * c.adRowCount) / (c.adRowCount - 1))\n                } else {\n                    c.itemRowSpace = c.templateHeight - 2 * c.containerBorderWidth - m * c.adRowCount\n                }\n                g = q.layoutSpace(g, p, c);\n                g.layoutIndex = o;\n                return g\n            },\n            initialize : function () {\n                this.template = using(\"Cpro.Template\");\n                this.varManager = using(\"Cpro.Template.TemplateVariableManager\");\n                                \n                this.userConfig = this.varManager.getFullNameConfig(window.config);\n                this.fullConfig = this.varManager.getVariables(this.userConfig);\n                \n                resort_ads = this.resortAdbyColumn(ads, this.userConfig);\n                this.layoutObj = this.layout({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig\n                });\n                    \n                this.template.PaintEngine.paint({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig,\n                    layoutObj : this.layoutObj,\n                    data : resort_ads\n                });\n                \n                this.template.DataEngine.paint({\n                    userConfig : this.userConfig,\n                    fullConfig : this.fullConfig,\n                    layoutObj : this.layoutObj,\n                    data : resort_ads\n                });\n                \n                this.initIcon(resort_ads,this.userConfig);\n                //Added\n                this.initEvents();\n                //-Added\n            },\n            //Added\n            currentHLElement: null,\n            fadeInTimer: 0,\n            fadeOutTimer: 0,\n            fadeInTimeout: 20,\n            fadeOutTimeout: 20,\n            fadeInTime: 300,\n            fadeOutTime: 300,\n            setOpacity: function(el,value){\n                el.style.filter = 'alpha(opacity='+Math.round(value*100)+')';\n                el.style.mozOpacity = value;\n                el.style.opacity = value;\n            },\n            fadeIn: function(el){\n                var that = this;\n                this.setOpacity(el,0);\n                var opacity = 0;\n                var interval = 10;\n                var counter = 0;\n                var times = Math.ceil(that.fadeInTime/interval);\n                clearInterval(el.fadeInTimer);\n                var timer = el.fadeInTimer = setInterval(function(){\n                    counter++;\n                    opacity = counter/times;\n                    that.setOpacity(el,opacity);\n                    if(counter >= times){\n                        that.setOpacity(el,1);\n                        clearInterval(timer);\n                    }\n                },interval);\n            },\n            fadeOut: function(el){\n                var that = this;\n                this.setOpacity(el,1);\n                var opacity = 0;\n                var interval = 10;\n                var counter = 0;\n                var times = Math.ceil(that.fadeInTime/interval);\n                clearInterval(el.fadeOutTimer);\n                var timer = el.fadeOutTimer = setInterval(function(){\n                    counter++;\n                    opacity = 1 - counter/times;\n                    that.setOpacity(el,opacity);\n                    if(counter >= times){\n                        that.setOpacity(el,0);\n                        clearInterval(timer);\n                    }\n                },interval);\n            },\n            initEvents: function(){\n                //use event delegation\n                var container = document.getElementById(\"container\");\n                var that = this;\n                container.onmouseover = function(e){\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    var node;\n                    node = target;\n                    var isFromDescendant = false;\n                    var crt;\n                    //if(!node.className){return;}\n                    while(node){\n                        var className = node.className || '';\n                        if(className.indexOf('title_') !== -1){\n                            break;\n                        }\n                        node = node.parentNode;\n                    }\n                    if(node && node.className.indexOf('title_') !== -1){\n                        isFromDescendant = true;\n                    }\n                    crt = node;\n                    if(!isFromDescendant){return;}\n                    //remove\n                    var currentHLElement = that.currentHLElement;\n                    if(currentHLElement === crt){\n                        return;    \n                    }\n                    if(currentHLElement){\n                        currentHLElement.className = currentHLElement.className.replace(/\\s+hilite/g,'');  \n                    }\n                    crt.className += ' hilite';\n                    that.currentHLElement = crt;\n                    var lastChild = crt.lastChild;\n                    while(lastChild && !lastChild.tagName){\n                        lastChild = lastChild.previousSibling;    \n                    }\n                    that.fadeIn(lastChild);\n                };\n                container.onmouseout = function(e){\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    var other = e.relatedTarget || e.toElement;\n                    var node;\n                    var crt = target;\n                    while(crt && crt.parentNode){\n                        var className = crt.className || '';\n                        if(className.indexOf('title_') !== -1){\n                            break;\n                        }\n                        crt = crt.parentNode;\n                    }\n                    if(!crt || !crt.className || crt.className.indexOf('title_') === -1){\n                        return;    \n                    }\n                    var isToSelf = false;\n                    node = other;\n                    while(node && node !== crt){\n                        node = node.parentNode;\n                    }\n                    if(node === crt){\n                        isToSelf = true;\n                    }\n                    if(isToSelf){return;}\n\n                    //remove\n                    var currentHLElement = crt;\n                    if(currentHLElement){\n                        currentHLElement.className = currentHLElement.className.replace(/\\s+hilite/g,'');  \n                    }\n                    that.currentHLElement = null;\n                    /*\n                    var lastChild = crt.lastChild;\n                    while(!lastChild){\n                        lastChild = lastChild.previousSibling;    \n                    }\n                    that.fadeOut(lastChild);\n                    */\n                };\n                container.onclick = function(e){\n                    e = e || window.event;\n                    var target = e.target || e.srcElement;\n                    if(target.tagName && target.tagName.toUpperCase() === 'A'){\n                        //native anchor click event\n                        return;    \n                    }\n                    var node;\n                    node = target;\n                    var isFromDescendant = false;\n                    var crt;\n                    if(!node.className){return;}\n                    while(node && node.className && node.className.indexOf('title_') === -1){\n                        node = node.parentNode;\n                    }\n                    if(node && node.className.indexOf('title_') !== -1){\n                        isFromDescendant = true;\n                    }\n                    crt = node;\n                    if(!isFromDescendant){return;}\n                    var link = crt.getElementsByTagName('A')[0];\n                    if(link){\n                        var url = link.href;\n                        if(url){\n                            window.open(url);    \n                        }\n                    }\n                };\n            },\n            //-Added\n            initIcon : function(ads,param){\n                var container = document.getElementById(\"container\");\n                var ad_index = 0;\n                var top_times = 0;\n                for(var i=0;i<container.children.length && ad_index < ads.length;i++){\n                    var item = container.children[i];\n                    if(item.className == \"item\"){\n                        /*Added*/\n                        var type1 = \"nm\", type2 = \"nm\";\n                        var anchor = item.getElementsByTagName('A')[0];\n                        if(anchor){\n                            var text = 'innerText' in anchor? anchor.innerText:anchor.textContent;\n                            var byteLength = text.replace(/[^\\u0000-\\u00ff]/g,'aa').length;\n                            if(byteLength <= 12){\n                                type2 = \"nr\";    \n                            }  \n                        }\n                        /*-Added*/\n                        if (param.adRowCount == 1) {\n\t\t\t            if (ad_index < 3) {\n\t\t\t                /*Added*/\n\t\t\t                type1 = \"tp\";\n\t\t\t                /*-Added*/\n                            item.className = \"item title_top\"/*Added*/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize/*-Added*/;\n\t\t\t\t            item.children[0].className = \"wrapper_top_\" + param.titleFontSize;\n\t\t\t            } else {\n                            item.className = \"item title_normal\"/*Added*/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize/*-Added*/;\n\t\t\t\t            item.children[0].className = \"wrapper_normal_\" + param.titleFontSize;\n\t\t\t            }\n                        } else {\n\t\t\t            if (ad_index % param.adColumnCount == 0 && top_times < 3) {\n\t\t\t                /*Added*/\n\t\t\t                type1 = \"tp\";\n\t\t\t                /*-Added*/\n                            item.className = \"item title_top\"/*Added*/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize/*-Added*/;\n\t\t\t\t            item.children[0].className = \"wrapper_top_\" + param.titleFontSize;\n                            top_times++;\n\t\t\t            } else {\n                            item.className = \"item title_normal\"/*Added*/ + \" \"+type1+\"_\"+type2+\"_\" + param.titleFontSize/*-Added*/;\n\t\t\t\t            item.children[0].className = \"wrapper_normal_\" + param.titleFontSize;\n\t\t\t            }\n                        }\n\t\t\t            item.children[0].innerHTML = ad_index % param.adColumnCount * param.adRowCount + parseInt(ad_index / param.adColumnCount) + 1;\n                        ad_index++;\n                    }\n                }\n            },\n            resortAdbyColumn : function(ads, param) {\n                var resort_ads = new Array(param.adRowCount * param.adColumnCount);\n                for (var i = 0; i < resort_ads.length; i++) {\n                    if (i >= ads.length) {\n                        resort_ads[i % param.adRowCount * param.adColumnCount + parseInt(i / param.adRowCount)] = ads[i - ads.length];\n                    } else {\n                        resort_ads[i % param.adRowCount * param.adColumnCount + parseInt(i / param.adRowCount)] = ads[i];\n                    }\n                }\n                return resort_ads;\n            }\n        };\n        run(ThisPage.initialize.proxy(ThisPage));\n        \n        \n        (function(){try{var d={getCookie:function(p,t){var o;var t=t||window;var s=t.document;var q=new RegExp(\"(^| )\"+p+\"=([^;]*)(;|\\x24)\");var r=q.exec(s.cookie);if(r){o=r[2]}return o},setCookie:function(q,r,p){p=p||{};var o=p.expires;if(\"number\"==typeof p.expires){o=new Date();o.setTime(o.getTime()+p.expires)}document.cookie=q+\"=\"+r+(p.path?\"; path=\"+p.path:\"\")+(o?\"; expires=\"+o.toGMTString():\"\")+(p.domain?\"; domain=\"+p.domain:\"\")+(p.secure?\"; secure\":\"\")}};var g={sendByIframe:function(o){var p=document.createElement(\"iframe\");p.id=\"ifr\"+parseInt(Math.random()*100000);p.style.display=\"none\";p.setAttribute(\"src\",o);document.body.insertBefore(p,document.body.firstChild)},sendByImage:function(p,r){var o=new Image();var q=\"cpro_log_\"+Math.floor(Math.random()*2147483648).toString(36);r=r||window;r[q]=o;o.onload=o.onerror=o.onabort=function(){o.onload=o.onerror=o.onabort=null;r[q]=null;o=null};o.src=p}};var f=d.getCookie(\"BAIDUID\");var e=d.getCookie(\"CPROID\");var k=d.getCookie(\"ISUS\");var h=d.getCookie(\"ISBID\");var l=false;var m=false;var n=(new Date()).getTime();if(!e&&f){var j=\"http://cpro.baidustatic.com/sync.htm?cproid=\"+encodeURIComponent(f);g.sendByIframe(j)}if(e&&!k){l=true}else{if(e&&k&&e!==k){l=true}}if(f&&!h){m=true}else{if(f&&h&&f!==h){m=true}}if(l||m){var a=new Date();a.setTime(a.getTime()+86400000);d.setCookie(\"ISBID\",f||\"1\",{path:\"/\",expires:a});d.setCookie(\"ISUS\",e||\"1\",{path:\"/\",expires:a});if(e&&f){var c=e;var b=e.indexOf(\":\");if(b&&b>0){c=e.substring(0,b)}g.sendByIframe(\"http://s.cpro.baidu.com/s.htm?cproid=\"+c+\"&t=\"+n)}if(e){g.sendByIframe(\"http://weibo.com/aj/static/sync.html?t=\"+n);g.sendByIframe(\"http://pos.baidu.com/sync_pos.htm?cproid=\"+encodeURIComponent(e)+\"&t=\"+n);var c=e;var b=e.indexOf(\":\");if(b&&b>0){c=e.substring(0,b)}}}}catch(i){}})();\n(function(){try{var noticeUrl=\"http://wn.pos.baidu.com/adx.php?c=cz1lYjFhNzRhODUzNGY2YjVlAHQ9MTM5NDYzOTQ0MQBzZT01AGJ1PTEAcHJpY2U9VXlDQ1VRQUhaUFI3akVwZ1c1SUE4c2NULU5yeDdiV0lDdFk2ZlEAdj0xAGk9MjY2NWI3OTk\";if(noticeUrl&&noticeUrl!==\"\\x24bdNo\"+\"tice\\x24\"){var img=new Image;var key=\"cpro_log_\"+Math.floor(Math.random()*2147483648).toString(36);var win=window;win[key]=img;img.onload=img.onerror=img.onabort=function(){img.onload=img.onerror=img.onabort=null;win[key]=null;img=null};img.src=noticeUrl}}catch(ex){}})();\n        </script>\n    </body>\n\n</html>\n"
                    }
                ]
            },
            {
                'name': 'sticker/single_image',
                'position_type': '3',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/single_image-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[14],
                        'idea_url':'http://ecma.bdimg.com/adtest/d58998e1dd325e2c2841a2111a32012e.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0'
                    }
                ]
            },
            {
                "name": "pa3",
                "position_type": "2",
                "render": "http://bs.baidu.com/public03/imageplus/pa3-dev.app.js",
                "ads": [
                    {
                        "image": imgArray[15],
                        "desc": "买<font color=#C60A00>实木家具</font>去美乐乐,体验馆3周年庆,50抵200!<font color=#C60A00>家具</font>5包到家,<font color=#C60A00>家具</font>限时达,超期赔付,",
                        "price": "",
                        "seller_name": "",
                        "idea_url": "http://ms.bdimg.com/pacific/24789644.jpg",
                        "encry_url": "http://bzclk.baidu.com/eye.php?t=0000000000000000XH807f0000000000w6000K3000…Hc4PRmLrDfYrH9DnbRsf1cYfH9Dnbm0IgF_5fKsTWY0UyNz5fK9IZw9mv6qnHD-nWmsFHcvn00",
                        "image_height": "0",
                        "image_width": "0",
                        "icon_top_left_x": "70%",
                        "icon_top_left_y": "30%",
                        "title": "上海买<font color=#C60A00>实木家具</font>上美乐乐,包送包安装,<font color=#C60A00>实木家具</font>1元起拍",
                        "target_url": "http://www.baidu.com/baidu.php?url=-f6K00a9SusmAuhpKbwhaFcU3uMw5O_005EfFN-CKHRJbg…ujY0Uy-b5H00pg7Y5H00mycqn7ts0ZF-TgfqnHn4PWbzrH0YrHfLn0KBUjYs0APzm1Y1PH6kns",
                        "show_url": "www.meilele.com",
                        "is_v": 1,
                        "timesign": 0,
                        "trade_id": "0",
                        "notice_url": "http://wn.pos.baidu.com/adx.php?c=cz0yMWZhZjBjYzFmOTg2MmQ2AHQ9MTM5NjkyOTA0N…2U9VTBOeUZ3QUtHUVI3akVwZ1c1SUE4bnktd0xUdTZPNWhzTjJabVEAdj0xAGk9N2VhYzUyYzQ",
                        "multi_link_desc": "${multi_link_desc}$"
                    }
                ]
            },
            {
                'name': 'flag/pa',
                'position_type': '0',
                // 'render': 'http://bs.baidu.com/public03/imageplus/flag/pa-dev.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/brand_pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[16],
                        'title':'总之不会超过7个汉字的！但是如果有数字呢？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=15',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'show_url': '立即点击，预约试驾！',
                        'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url15'
                    }
                ]
            },
            {
                'name': 'flag/pa_4',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/flag/pa_4-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[17],
                        'title':'不会超过7个汉字的！但是如果有数字呢？',
                        'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                        'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=15',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'notice_url': 'http://bzclk.baidu.com/eye.php?t=notice_url15'
                    }
                ]
            },
            {
                'name': 'sticker/html_3',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/html_3.app.js',
                'ads': [
                    {
                        'image': imgArray[18],
                        "desc":'<!DOCTYPE html><html>                                                                                                                                                          <head> <script type="text/javascript">     var cpro_id = "u1560639";     (window["cproStyleApi"]=window["cproStyleApi"]||{})[cpro_id]={         tn:"baiduCustSTagLinkUnitImagePlusPreAd",         rsi0:"500",         rsi1:"101",         n:"41073058_cpr",         stid:"24",         at:"all"     }; </script> <script src="http://cpro.baidustatic.com/cpro/ui/c.js" type="text/javascript"></script> </head> <body style="margin:0px;padding:0px;border:0px;background-color:transparent;"> </body> </html>',//  '<html xmlns=\"http://www.w3.org/1999/xhtml\"><head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n    <title>百度网盟推广</title>\n    <style type=\"text/css\">\n        html {\n            color: #000;\n            background-color: transparent;\n        }\n        body,\n        div,\n        dl,\n        dt,\n        dd,\n        ul,\n        ol,\n        li,\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6,\n        pre,\n        code,\n        form,\n        fieldset,\n        legend,\n        input,\n        textarea,\n        p,\n        blockquote,\n        th,\n        td {\n            margin: 0;\n            padding: 0\n        }\n        table {\n            border-collapse: collapse;\n            border-spacing: 0\n        }\n        fieldset,\n        img {\n            border: 0\n        }\n        address,\n        caption,\n        cite,\n        code,\n        dfn,\n        em,\n        strong,\n        th,\n        var {\n            font-style: normal;\n            font-weight: normal\n        }\n        ol,\n        ul {\n            list-style: none\n        }\n        caption,\n        th {\n            text-align: left\n        }\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6 {\n            font-size: 100%;\n            font-weight: normal\n        }\n        q:before,\n        q:after {\n            content: ""\n        }\n        abbr,\n        acronym {\n            border: 0;\n            font-variant: normal\n        }\n        sup {\n            vertical-align: text-top\n        }\n        sub {\n            vertical-align: text-bottom\n        }\n        input,\n        textarea,\n        select {\n            font-family: inherit;\n            font-size: inherit;\n            font-weight: inherit\n        }\n        input,\n        textarea,\n        select {\n            *font-size: 100%\n        }\n        legend {\n            color: #000\n        }\n        body {\n            margin: 0;\n            padding: 0;\n        }\n        .bd-logo,\n        .bd-logo2,\n        .bd-logo3,\n        .bd-logo4 {\n            text-decoration: none;cursor:pointer;display:block;overflow:hidden;position:absolute;bottom:0;right:0;z-index:2147483647}.bd-logo{height:18px;width:18px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:0 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo:hover{background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-dark.png\",sizingMethod=\"crop\")}.bd-logo2{margin:0 2px 2px 0;height:14px;width:13px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:0 -20px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-noborder-light.png\",sizingMethod=\"crop\");_background:0}.bd-logo2:hover{background-position:0 -35px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-noborder-dark.png\",sizingMethod=\"crop\")}.bd-logo3{height:18px;width:18px;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bg.png) no-repeat left top;background-position:-70px 0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/logo-border-dark.png\",sizingMethod=\"crop\");_background:0}.bd-logo3:hover{width:68px}.bd-logo4{height:18px;width:18px;bottom:0;left:0;background:url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bd-logo4.png) no-repeat left top;background-position:center;background-size:100%,100%;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=\"http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/bd-logo4.png\",sizingMethod=\"crop\");_background:0}\n            .loader {\n                text-align: center;\n                width: 90%;\n                font-size: 12px;\n                padding: 8px;\n                border: solid 1px #aaaaaa;\n                margin-top: 30px;\n                display: none;\n            }\n            .cf:before,\n            .cf:after {\n                content: \"\\20\";\n                display: table;\n            }\n            .cf:after {\n                clear: both;\n            }\n            .cf {\n                *zoom: 1;\n            }\n            .textOverflow {\n                white-space: nowrap;\n                overflow: hidden;\n                display: inline-block;\n                width: 100%;\n            }\n            .textOverflowEllipsis {\n                -o-text-overflow: ellipsis;\n                text-overflow: ellipsis;\n            }\n            .textOverflowClip {\n                -o-text-overflow: clip;\n                text-overflow: clip;\n            }\n            body {\n                margin: 0;\n                padding: 0;\n            }\n            .container {\n                position: relative;\n            }\n            a {\n                display: inline-block;\n                position: absolute;\n                background: #fff;\n                text-align: center;\n                overflow: hidden;\n                color: #fff;\n                font-family: \"宋体\";\n                text-decoration: none;\n            }\n            .block1 {\n                font-size: 24px;\n            }\n            .block2 {\n                font-size: 20px;\n            }\n            .block2_5 {\n                font-size: 18px;\n            }\n            .block2_6 {\n                font-size: 16px;\n            }\n            .block2_7 {\n                font-size: 14px;\n            }\n            .block3 {\n                font-size: 12px\n            }\n            .triangle {\n                position: absolute;\n                border-left: 25px solid #fde35b;\n                border-bottom: 25px solid transparent;\n                margin: 0px;\n                padding: 0;\n                height: 0px;\n                width: 0px;\n                text-align: center;\n                top: 0px;\n                left: 0px;\n            }\n            .ranktext {\n                position: absolute;\n            }\n            .ranktext a {\n                display: inline;\n                background: transparent;\n                color: #886235;\n                font-size: 11px;\n                font-weight: bold;\n                font-family: \"arial\";\n            }\n    </style>\n</head>\n\n<body>\n    <div id=\"container\" class=\"container\">\n        <div id=\"barcontainer\" class=\"container\" style=\"width: 550px; height: 25px;\">\n            <a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=php%B3%CC%D0%F2%D4%B1&amp;k0=php%B3%CC%D0%F2%D4%B1&amp;k1=javascript%B9%A4%BE%DF&amp;k2=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k3=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k4=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k5=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=1&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 0px; width: 109px; height: 24px; line-height: 24px; font-size: 14.399999999999999px; background-color: rgb(0, 72, 190);\">php程序员</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k0=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k1=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k2=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;k3=%BD%BB%D3%D1%CF%E0%C7%D7&amp;k4=%B5%D8%CF%C2%B3%C7%D3%C2%CA%BF%CD%BC%C6%AC&amp;k5=python%BF%AA%B7%A2&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=8&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 110px; width: 109px; height: 24px; line-height: 24px; font-size: 14px; background-color: rgb(0, 131, 154);\">python编程实践</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=javascript%B9%A4%BE%DF&amp;k0=javascript%B9%A4%BE%DF&amp;k1=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k2=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k3=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k4=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k5=python%B1%E0%B3%CC&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=2&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 220px; width: 109px; height: 24px; line-height: 24px; font-size: 14px; background-color: rgb(0, 72, 190);\">javascript工具</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k0=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k1=python%B1%E0%B3%CC&amp;k2=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k3=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k4=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;k5=%BD%BB%D3%D1%CF%E0%C7%D7&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=6&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 330px; width: 109px; height: 24px; line-height: 24px; font-size: 14.399999999999999px; background-color: rgb(0, 131, 154);\">网球场上海</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k0=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k1=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k2=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k3=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k4=python%B1%E0%B3%CC&amp;k5=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=3&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 440px; width: 109px; height: 24px; line-height: 24px; font-size: 14.399999999999999px; background-color: rgb(145, 0, 158);\">室内网球场</a>\n        </div>\n        <div id=\"contentcontainer\" class=\"container\" style=\"width: 550px; height: 76px;\">\n            <a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=php%B3%CC%D0%F2%D4%B1&amp;k0=php%B3%CC%D0%F2%D4%B1&amp;k1=javascript%B9%A4%BE%DF&amp;k2=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k3=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k4=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k5=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=1&amp;seller_id=1\" target=\"_blank\" class=\"block1\" style=\"top: 25px; left: 0px; line-height: 51px; height: 51px; width: 219px; background-color: rgb(0, 72, 190);\">php程序员</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=javascript%B9%A4%BE%DF&amp;k0=javascript%B9%A4%BE%DF&amp;k1=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k2=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k3=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k4=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k5=python%B1%E0%B3%CC&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=2&amp;seller_id=1\" target=\"_blank\" class=\"block1\" style=\"top: 0px; left: 220px; line-height: 49px; height: 49px; width: 219px; background-color: rgb(0, 72, 190);\">javascript工具</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k0=%CA%D2%C4%DA%CD%F8%C7%F2%B3%A1&amp;k1=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k2=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k3=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k4=python%B1%E0%B3%CC&amp;k5=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=3&amp;seller_id=1\" target=\"_blank\" class=\"block2 block2_5\" style=\"top: 25px; left: 440px; line-height: 51px; height: 51px; width: 110px; font-size: 19px; background-color: rgb(145, 0, 158);\">室内网球场</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k0=%C9%CF%BA%A3%C6%D6%B6%AB%B7%BF%BC%DB&amp;k1=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k2=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k3=python%B1%E0%B3%CC&amp;k4=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k5=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=4&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 0px; line-height: 24px; height: 24px; width: 109px; font-size: 14.399999999999999px; background-color: rgb(0, 131, 154);\">上海浦东房价</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k0=%C9%CF%BA%A3%CD%F8%C7%F2%B3%A1&amp;k1=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k2=python%B1%E0%B3%CC&amp;k3=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k4=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k5=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=5&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 440px; line-height: 24px; height: 24px; width: 110px; font-size: 14.399999999999999px; background-color: rgb(0, 131, 154);\">上海网球场</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k0=%CD%F8%C7%F2%B3%A1%C9%CF%BA%A3&amp;k1=python%B1%E0%B3%CC&amp;k2=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k3=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k4=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;k5=%BD%BB%D3%D1%CF%E0%C7%D7&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=6&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 50px; left: 330px; line-height: 26px; height: 26px; width: 109px; font-size: 14.399999999999999px; background-color: rgb(0, 131, 154);\">网球场上海</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=python%B1%E0%B3%CC&amp;k0=python%B1%E0%B3%CC&amp;k1=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k2=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k3=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;k4=%BD%BB%D3%D1%CF%E0%C7%D7&amp;k5=%B5%D8%CF%C2%B3%C7%D3%C2%CA%BF%CD%BC%C6%AC&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=7&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 50px; left: 220px; line-height: 26px; height: 26px; width: 109px; font-size: 14.399999999999999px; background-color: rgb(0, 131, 154);\">python编程</a><a href=\"http://cpro.baidu.com/cpro/ui/uijs.php?rs=1&amp;u=http%3A%2F%2Fwww%2Emiercn%2Ecom%2Fbdnews%2F201405%2F306951%5F6%2Ehtml&amp;p=baidu&amp;c=news&amp;n=10&amp;t=tpclicked3_hc&amp;q=qinchen007_cpr&amp;k=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k0=python%B1%E0%B3%CC%CA%B5%BC%F9&amp;k1=%E8%A4%D9%A4%BD%CC%D1%A7%CA%D3%C6%B5&amp;k2=%CC%AB%D4%AD%C2%C3%D3%CE%B9%A5%C2%D4&amp;k3=%BD%BB%D3%D1%CF%E0%C7%D7&amp;k4=%B5%D8%CF%C2%B3%C7%D3%C2%CA%BF%CD%BC%C6%AC&amp;k5=python%BF%AA%B7%A2&amp;sid=42105bcc856a7e83&amp;ch=0&amp;tu=u1525802&amp;jk=08911beb1ee5fa35&amp;cf=1&amp;fv=13&amp;stid=21&amp;urlid=0&amp;luki=8&amp;seller_id=1\" target=\"_blank\" class=\"block3\" style=\"top: 0px; left: 110px; line-height: 24px; height: 24px; width: 109px; font-size: 14px; background-color: rgb(0, 131, 154);\">python编程实践</a>\n        </div>\n        <a class=\"bd-logo\" href=\"http://wangmeng.baidu.com/\" title=\"百度网盟推广\" target=\"_blank\" onfocus=\"this.blur()\"></a>\n    </div>\n\n\n\n\n\n\n</body></html>',
                        "price":"",
                        "seller_name":"",
                        "idea_url":"",
                        "encry_url":"http:\/\/bzclk.baidu.com\/eye.php?t=sticker\/html_2"

                    }
                ]
            },
            {
                'name': 'sticker/combo_pa',
                'position_type': '0',
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/combo_pa-dev.app.js',
                // 'render': 'http://ecma.bdimg.com/public03/imageplus/v2/dock/tab_display_window.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/tab_display_window-dev.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/tab_pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[19],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'adlist': [
                            {
                                'title':'o.o风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'bid_word': '汽车',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_1'
                            },
                            {
                                'title':'-.-风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'bid_word': '旅游',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_2'
                            },
                            {
                                'title':'-.-风湿性关节炎怎么办？怎么治？风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师',
                                'bid_word': '新闻',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url_3'
                            }
                        ]
                    }
                ]
            },
            {
                'name': 'sticker/image_carousel',
                'position_type': '0',
                // TODO
                // 'render': 'http://bs.baidu.com/public03/imageplus/sticker/image_carousel-dev.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/tab_pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[20],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'adlist': [
                            {
                                'title':'风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'bid_word': '教育',
                                'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                                'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                            },
                            {
                                'title':'风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://bcscdn.baidu.com/adtest/9e46fca91c637d8e5b112c9a2a66dc85.jpg',
                                'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                            },
                            {
                                'title':'风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://ubmcmm.baidustatic.com/media/v1/0f0005cFD2J3FcRQoaa4jf.jpg',
                                'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                            },
                            {
                                'title':'风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://ubmcmm.baidustatic.com/media/v1/0f0005cFD2J3FcRQoaa4jf.jpg',
                                'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                            },
                            {
                                'title':'风湿性关节炎怎么办？怎么治？',
                                'desc':'风湿性关节炎建议到北京301医院骨科就诊推荐医生：施桂英主任医师教授、路桂军主治医师、陈继营风湿性关节炎怎么办？怎么治？',
                                'show_url': 'www.aaaaxxxxxxxx.com',
                                'is_v': 1,           // url 加v与否
                                'trade_id': 1,         // 行业id
                                'idea_url': 'http://ubmcmm.baidustatic.com/media/v1/0f0005cFD2J3FcRQoaa4jf.jpg',
                                'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                                'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                            }
                        ]
                    }
                ]
            },
            {
                'name': 'avatar',
                'position_type': '0',
                'render': 'http://ecma.bdimg.com/public03/imageplus/avatar-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[21],
                        'desc': '{"hmid":"0952314f","share":{"display_more":false,"display":true,"type":{"tsina":true,"weixin":true},"common":{"bdUrl":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4018&x=86c753795dacfa99bd5126a65011f4a6912527886c7df07df9a4ee057e36e3b29490bbd9e6531a1b","bdDesc":"","bdText":"林肯携百年底蕴来到中国，带来融汇卓越设计，前瞻科技与至高品质的座驾，更重要的是我们带来了前所未见的人性化体验。林肯，一切从懂你开始。","bdPic":""}},"video_info":{"options":[{"rcv_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4010&x=19115e2f1d183ba6ee625e4b7463b6a7547c52b048d7ad2f77d1cc71ff944be615c5eaf0f3248a0517f9ae5d3b21fca6","img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab1.jpg","video_url":"http://ecma.bdimg.com/adtest/b4b1d1e9967ed2a0d475ee45604c00ce.flv","thumbnail_img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab1_s.jpg","thumbnail_text":"林肯之道"},{"rcv_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4011&x=b18980d48380f4f4ee625e4b7463b6a7547c52b048d7ad2f20da1d24b331ec0932122fa48b88755deacfdbdc54bdcefccaa724eabcdb1419","img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab2.jpg","video_url":"http://ecma.bdimg.com/adtest/1708773c483876d399846fb0e676e45a.flv","thumbnail_img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab2_s.jpg","thumbnail_text":"林肯MKC"},{"rcv_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4012&x=09f8ea1f65caafc9ee625e4b7463b6a7547c52b048d7ad2f3e152272460df79c00d29030480e119deacfdbdc54bdcefccaa724eabcdb1419","img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab3.jpg","video_url":"http://ecma.bdimg.com/adtest/f5d810dee779fba9421e86b9c79290df.flv","thumbnail_img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab3_s.jpg","thumbnail_text":"林肯MKZ"},{"rcv_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4013&x=f63dd5a3a067fbfaee625e4b7463b6a7547c52b048d7ad2f5c8eb1c1ed86dee867b55619ebf276688f8ff469c11578fc9da01cb79d6739b2fed5e5a1a3aaf52e","img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab4.jpg","video_url":"http://ecma.bdimg.com/adtest/7a3ea291856b848a9441d29369de672b.flv","thumbnail_img_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/video_tab4_s.jpg","thumbnail_text":"百年传承"}]},"video_entry":{"name":"观看视频","icon_image_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/1.jpg"},"tab":{"options":[{"tab_title":"林肯之道"},{"tab_title":"MKC"},{"tab_title":"MKZ"},{"tab_title":"百年传承"}]},"tab_cnt":[{"image_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/tab1.jpg","title":"林肯之道","desc":"林肯携百年底蕴来到中国，带来前所未见的人性化体验。","button":"体验更多","target_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4014&x=d45ad9707f1ac8daee625e4b7463b6a7547c52b048d7ad2f77d1cc71ff944be615c5eaf0f3248a0517f9ae5d3b21fca6"},{"image_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/tab2.jpg","title":"林肯MKC","desc":"林肯MKC，是伴你挥洒豪情、纵横无羁的豪华SUV。","button":"体验更多","target_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4015&x=aceebf78dc536ec2ee625e4b7463b6a7547c52b048d7ad2f20da1d24b331ec0932122fa48b88755deacfdbdc54bdcefccaa724eabcdb1419"},{"image_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/tab3.jpg","title":"林肯MKZ","desc":"林肯MKZ豪华轿车，将优雅型格淋漓尽现。","button":"体验更多","target_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4016&x=52acaa0cbc1617a7ee625e4b7463b6a7547c52b048d7ad2f3e152272460df79c00d29030480e119deacfdbdc54bdcefccaa724eabcdb1419"},{"image_url":"http://eiv.baidu.com/mapm2/afanda/linkenbrand/mainpage/tab4.jpg","title":"百年传承","desc":"自1917年诞生以来，无数闪耀的时刻，串联起近百年风华。","button":"体验更多","target_url":"http://clkmk.baidu.com/clkmk-rcv/lnk?id=4017&x=7f32e0e44e279f4aee625e4b7463b6a7547c52b048d7ad2f5c8eb1c1ed86dee867b55619ebf276688f8ff469c11578fc9da01cb79d6739b2fed5e5a1a3aaf52e"}],"toggler":{"expand_hint":"官方详情"}}',
                        'encry_url':'http://10.65.6.159:8900/eye.php?t=af000jc000070000K0000jc0000C0000060000c000a_DXoR000005-86aD1RyYAQd3_Rf00000.mLFW5HfsnW00pydM5HDznzsYPHm0m1Y0IgF_5y9YIZ0lQzqLILT8mh7GuZR8mvqV0ZKz5HDsn0KVugcqIA7Emh7E00',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            {
                'name': 'tuhua/i_talk',
                'position_type': '0',
                // 'render': 'http://bs.baidu.com//public03/imageplus/tuhua/image_talk-dev.app.js',
                'render': 'http://bs.baidu.com//public03/imageplus/tuhua/v2/i_talk-dev.app.js?v=0.01',
                'ads': [
                    {
                        'image': imgArray[22],
                        'desc': '',
                        'encry_url':'http://encry.url',
                        'target_url': 'http://target.url'
                    }
                ]
            },
            {
                'name': 'sticker/pa_shrink',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_with_title-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[23],
                        "desc":"买手机来京东,给力折扣,品类齐全.<font color=#C60A00>三星i9508</font>... 100%正品保证！",
                        "idea_url":"http://ms.bdimg.com/pacific/13742637.jpg",
                        "encry_url":"http://bzclk.baidu.com/eye.php?t=sticker_pa_shrink",
                        "title":"&lt;京东手机&gt;型号全,货到付款!",
                        "target_url":"http://www.baidu.com/baidu.php?url=0sDK00KbuLQT3cdM5qytVUIX-fPlCAUsgF3YsonF7GRQm5Kh9z0Y0I34-mQITsKbEzlfJu3fyX7VuQ27zcGKABo1WnfYggYU_KdS3Z_D-uHbp-n9BkLgs0p73toyBkdwA3pHj70.DR_ifYgsqE-6BXlQzzLc6OvoE9CE9emrSaFeCEETkvUqvHIdWxfHBmWJuBCrsurgG_LqhS1Wk_lXVK1DWlaI5--8wK_lTheW_4oDsOi1JHzOfq50_nYQAHFu8v20.U1Yk0ZDqz5Lfkvb4PH030Zfqz5Lfkvb4PH030A-V5HcvPsKL5fKM5g9hn0KdpHY0TA-b5HcY0APGujYkP1R0Ugfqn10sn6KVm1Y1nHb4PWfLPWR0pvbqn0K-pyfqn0KVpyfqn0KGTgfqn0K9mWYsg100mhsqn0KWThnqPjcYPWc"
                    }
                ]
            },
            {
                'name': 'v2/icon/fengchao_sma',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/icon/fengchao_sma-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[24],
                        'title': '三亚旅游',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=6mfX0cADZ6aK9K300f0005fK00jY0f00HfD005C000a_DX_jn0000F9GBb3aWWAWRfezRf00000.mLFW5HD1nWn30A-Vu1YknWf1n1csPj61QjbYnHn1PHT0m1Y3f16dP1wDwH6sfW0dnHPan17KrHuAnbDYPDuKwbn4w6KdThsqpZwYTjCEQLm8TgD8mvqVQvPEIhNzQLREIyG8mydLTZ7Mng9MrZ7VQh9YUys0TZcq0Ad-TWLnvVAvzV5AVf0',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'adlist': [
                            {
                                'title': '三亚旅游',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_1'
                            },
                            {
                                'title': '三亚旅游攻略2014',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_2'
                            },
                            {
                                'title': '三亚酒店',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_3'
                            },
                            {
                                'title': '三亚酒店报价',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_4'
                            },
                            {
                                'title': '三亚旅游攻略',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_5'
                            },
                            {
                                'title': '三亚出行攻略',
                                'url': 'http://bzclk.baidu.com/eye.php?t=target_url_6'
                            }
                        ]
                    }
                ]
            },
            {
                'name': 'v2/dock/pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[25],
                        "desc":"买手机来京东,给力折扣,品类齐全.<font color=#C60A00>三星i9508</font>... 100%正品保证100%正品保证！100%正品保证！100%正品保证！100%正品保证100%正品保证100%正品保证100%正品保证100%正品保证！！！！！！",
                        "idea_url":"http://ms.bdimg.com/pacific/13742637.jpg",
                        "encry_url":"http://bzclk.baidu.com/eye.php?t=v2_dock_pa",
                        "title":"&lt;京东手机&gt;型号全,货到付款!",
                        "target_url":"http://www.baidu.com/baidu.php?url=0sDK00KbuLQT3cdM5qytVUIX-fPlCAUsgF3YsonF7GRQm5Kh9z0Y0I34-mQITsKbEzlfJu3fyX7VuQ27zcGKABo1WnfYggYU_KdS3Z_D-uHbp-n9BkLgs0p73toyBkdwA3pHj70.DR_ifYgsqE-6BXlQzzLc6OvoE9CE9emrSaFeCEETkvUqvHIdWxfHBmWJuBCrsurgG_LqhS1Wk_lXVK1DWlaI5--8wK_lTheW_4oDsOi1JHzOfq50_nYQAHFu8v20.U1Yk0ZDqz5Lfkvb4PH030Zfqz5Lfkvb4PH030A-V5HcvPsKL5fKM5g9hn0KdpHY0TA-b5HcY0APGujYkP1R0Ugfqn10sn6KVm1Y1nHb4PWfLPWR0pvbqn0K-pyfqn0KVpyfqn0KGTgfqn0K9mWYsg100mhsqn0KWThnqPjcYPWc"
                    }
                ]
            },
            {
                'name': 'v2/flip/pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/flip/pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[26],
                        "desc":"买手机来京东,给力折扣,品类齐全.<font color=#C60A00>三星i9508</font>... 100%正品保证100%正品保证！100%正品保证！100%正品保证！100%正品保证100%正品保证100%正品保证100%正品保证100%正品保证！！！！！！",
                        "idea_url":"http://ms.bdimg.com/pacific/13742637.jpg",
                        "encry_url":"http://bzclk.baidu.com/eye.php?t=v2_dock_pa",
                        "title":"&lt;京东手机&gt;型号全,货到付款!",
                        "target_url":"http://www.baidu.com/baidu.php?url=0sDK00KbuLQT3cdM5qytVUIX-fPlCAUsgF3YsonF7GRQm5Kh9z0Y0I34-mQITsKbEzlfJu3fyX7VuQ27zcGKABo1WnfYggYU_KdS3Z_D-uHbp-n9BkLgs0p73toyBkdwA3pHj70.DR_ifYgsqE-6BXlQzzLc6OvoE9CE9emrSaFeCEETkvUqvHIdWxfHBmWJuBCrsurgG_LqhS1Wk_lXVK1DWlaI5--8wK_lTheW_4oDsOi1JHzOfq50_nYQAHFu8v20.U1Yk0ZDqz5Lfkvb4PH030Zfqz5Lfkvb4PH030A-V5HcvPsKL5fKM5g9hn0KdpHY0TA-b5HcY0APGujYkP1R0Ugfqn10sn6KVm1Y1nHb4PWfLPWR0pvbqn0K-pyfqn0KVpyfqn0KGTgfqn0K9mWYsg100mhsqn0KWThnqPjcYPWc"
                    }
                ]
            },
            {
                'name': 'v2/dock/opt_link_unit',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/opt_link_unit-dev.app.js',
                'ads': [
                    luJsonData1
                ]
            },
            {
                'name': 'v2/dock/marked_link_unit',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/marked_link_unit-dev.app.js',
                'ads': [
                    luJsonData2
                ]
            },
            /*
            {
                'name': 'v2/icon/single_image',
                'position_type': '1',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/icon/single_image-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[29],
                        'idea_url':'http://ecma.bdimg.com/adtest/82d7d73336de92f9257d280d14bd61a5.png',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=v2_icon_single_image',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url'
                    }
                ]
            },
            */
            {
                'name': 'v2/icon/single_flash',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/icon/single_flash-dev.app.js',
                'ads': [
                    {
                        'box': {
                            'extra_trigger': false
                        },
                        'image': imgArray[29],
                        'idea_url':'http://ubmcmm.baidustatic.com//media//v1//0f000AD6VwVH6YeKMic2cf.swf?url_type=1&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=v2_icon_single_flash',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '30%',
                        'icon_top_left_y': '30%'
                    }
                ]
            },
            {
                'name': 'v2/icon/single_flash',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/icon/single_flash-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[29],
                        'idea_url':'http://ubmcmm.baidustatic.com//media//v1//0f000AD6VwVH6YeKMic2cf.swf?url_type=1&',
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=v2_icon_single_flash',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'icon_top_left_x': '70%',
                        'icon_top_left_y': '30%'
                    }
                ]
            },
            {
                'name': 'v2/dock/barrage',
                'position_type': '0',
                // 'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/barrage-dev.app.js',
                // 'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/barrage_with_logo-dev.app.js',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/barrage.app.js',
                'ads': [
                    luJsonData3
                ]
            },
            {
                'name': 'nobox/brand_logo',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/nobox/brand_logo-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[31],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=brand_logo',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        'idea_url': 'http://static.sdg-china.com/ff14/pic/web6/images/logo.png?t=1'
                    }
                ]
            },
            {
                'name': 'v2/sticker/pa_with_links',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/sticker/pa_with_links-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[32],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=v2_sticker_pa_with_links',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "desc":"男人够大够粗，才能彻底征服女人！ 一夜7次，持久绝招，让女人夜夜尖叫！",
                        "idea_url":"http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "title":"让女人最舒服的阴莖！让女人最舒服的阴莖！",
                        "sturl": [
                            "2014暑期班",
                            "牛逼的百度百科全书",
                            "雅思培训",
                            "留学VIP",
                            "夏令营",
                            "雅思培训"
                        ]
                    }
                ]
            },
            {
                'name': 'v2/rolling/pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/rolling/pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[33],
                        "desc": "男人够大够粗，才能彻底征服女人！ 一夜7次，持久绝招，让女人夜夜尖叫！",
                        "idea_url": "http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "encry_url": "http://bzclk.baidu.com/eye.php?t=00000000000000000000000000000000w6000K3000jHbnqRa6000KA7Wg55ASKEO6sgRs00000.mLFW5HRvn1f40A-Vu1YkPH0drjRsPWnYPHTkP1RdnjmvrfKW5H7afH64PRmkPRnvnbfLPH6LwDPKf1-jwWuAPHc3PbDs0ZNzUjY0TZcq0Ad-TWY0mgwYmyPC5HDsnj0-nWmkPjfsPjRsFHcvnf0",
                        "title": "让女人最舒服的阴莖！让女人最舒服的阴莖！",
                        "target_url": "http://www.baidu.com/cpro.php?TfRK00aMBKU2TNzo8sOjtQqZ9PguqCjYkEAd3_jtgXaT5CZK5cVPvPnpjxihRpWS-Uyp1xyD8acEZlcvTTSpECTcK3-4YdH1zz0FTuNlncp8X7YaqCCRZ4yIX3y6.DY_iwF3cO2GMCx6wKb_o3vUJShEIELtxZMLkYyPHr-nYxUCwdeTH7IXH_zXrOud9CnNvNdePv1GlNBmdnlR1wq8W-9k1QjPakk_LuPz6.IgF_5y9YIZ0lQzqLILT8uv7VugF1pLb8mvqVQv4-ILnEnW0kPj01Q1nYnjTLri41pZwVU0KYUHY3PW0vPsKYIHddnHfYnjfdn0KLUjYv0AP8IA3quv7VugF1pL-xmLKz0ZwL5HD0mywWUA71T1Ys0ZF15H00mLwV5yF9pywdfLN1IDG1Uv30Uh7YIHY40A-Ypyfqn0KGIA-8uhqGujYs0AIspyfqn0Kzuyuspyfqn0KWTZFEpyfq0AFduAI-I7q-XZKGujYk0A7GTjdlyg64UDFjHNIrTsKdpg0qu7GiphdiHy4ZTv30mv6qn0KYmgcqPWf0uZws5HD0TvN_UANzgv-b5HR0pgPxmgKs5H00mgKsgv-b5H00mLN1IjY0UhNYgLw4TARqn0K8UL0q0A7bmhkEmvVxpvN45HIhuhuhuhuhnj0kPyu9m1c0pgPxIv-zuyk-TLnqn0KLmgKxIZ-suHYs0AdEmh-_uNqsUA7YuhqzUHYs0AdETdqvugcqna3sQW00TAsqn0K_XAcqn0KVm1YkuywBmHT3n6KVIWYk0A4vTjYsQW0snj0snj0s0AT45HD0uh-zTLwxThNMpyq85Hc0TvNWUv4bgLF-uv-EUWY3n100TLPs5HR0TLPsnWYs0ZwYTjYk0AwGTLws5H00mycqnfKWThnqPHTznj60",
                        "show_url": "news.haxiu.com/20130516159937.html",
                        "notice_url": "http://wn.pos.baidu.com/adx.php?c=cz02ZmUwMWJjZjczOGQ4NTExAHQ9MTM5NDAxOTU4MgBzZT01AGJ1PTEAcHJpY2U9VXhjTV9nQURRUDU3akVwZ1c1SUE4dWtWc0thanpfMXNZMmd3WGcAdj0xAGk9MWQ1OTc3ZTU"
                    }
                ]
            },
            {
                'name': 'v2/rolling/pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/rolling/pa-dev.app.js',
                'ads': [
                    {
                        'box': {
                            'position_type': 1
                        },
                        'image': imgArray[34],
                        "desc": "男人够大够粗，才能彻底征服女人！ 一夜7次，持久绝招，让女人夜夜尖叫！",
                        "idea_url": "http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "encry_url": "http://bzclk.baidu.com/eye.php?t=00000000000000000000000000000000w6000K3000jHbnqRa6000KA7Wg55ASKEO6sgRs00000.mLFW5HRvn1f40A-Vu1YkPH0drjRsPWnYPHTkP1RdnjmvrfKW5H7afH64PRmkPRnvnbfLPH6LwDPKf1-jwWuAPHc3PbDs0ZNzUjY0TZcq0Ad-TWY0mgwYmyPC5HDsnj0-nWmkPjfsPjRsFHcvnf0",
                        "title": "让女人最舒服的阴莖！让女人最舒服的阴莖！",
                        "target_url": "http://www.baidu.com/cpro.php?TfRK00aMBKU2TNzo8sOjtQqZ9PguqCjYkEAd3_jtgXaT5CZK5cVPvPnpjxihRpWS-Uyp1xyD8acEZlcvTTSpECTcK3-4YdH1zz0FTuNlncp8X7YaqCCRZ4yIX3y6.DY_iwF3cO2GMCx6wKb_o3vUJShEIELtxZMLkYyPHr-nYxUCwdeTH7IXH_zXrOud9CnNvNdePv1GlNBmdnlR1wq8W-9k1QjPakk_LuPz6.IgF_5y9YIZ0lQzqLILT8uv7VugF1pLb8mvqVQv4-ILnEnW0kPj01Q1nYnjTLri41pZwVU0KYUHY3PW0vPsKYIHddnHfYnjfdn0KLUjYv0AP8IA3quv7VugF1pL-xmLKz0ZwL5HD0mywWUA71T1Ys0ZF15H00mLwV5yF9pywdfLN1IDG1Uv30Uh7YIHY40A-Ypyfqn0KGIA-8uhqGujYs0AIspyfqn0Kzuyuspyfqn0KWTZFEpyfq0AFduAI-I7q-XZKGujYk0A7GTjdlyg64UDFjHNIrTsKdpg0qu7GiphdiHy4ZTv30mv6qn0KYmgcqPWf0uZws5HD0TvN_UANzgv-b5HR0pgPxmgKs5H00mgKsgv-b5H00mLN1IjY0UhNYgLw4TARqn0K8UL0q0A7bmhkEmvVxpvN45HIhuhuhuhuhnj0kPyu9m1c0pgPxIv-zuyk-TLnqn0KLmgKxIZ-suHYs0AdEmh-_uNqsUA7YuhqzUHYs0AdETdqvugcqna3sQW00TAsqn0K_XAcqn0KVm1YkuywBmHT3n6KVIWYk0A4vTjYsQW0snj0snj0s0AT45HD0uh-zTLwxThNMpyq85Hc0TvNWUv4bgLF-uv-EUWY3n100TLPs5HR0TLPsnWYs0ZwYTjYk0AwGTLws5H00mycqnfKWThnqPHTznj60",
                        "show_url": "news.haxiu.com/20130516159937.html",
                        "notice_url": "http://wn.pos.baidu.com/adx.php?c=cz02ZmUwMWJjZjczOGQ4NTExAHQ9MTM5NDAxOTU4MgBzZT01AGJ1PTEAcHJpY2U9VXhjTV9nQURRUDU3akVwZ1c1SUE4dWtWc0thanpfMXNZMmd3WGcAdj0xAGk9MWQ1OTc3ZTU"
                    }
                ]
            },
            {
                'name': 'v2/sticker/pa_2',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/sticker/pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[35],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=v2_sticker_pa_with_links',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "desc":"男人够大够粗，才能彻底征服女人！ 一夜7次，持久绝招，让女人夜夜尖叫！",
                        "idea_url":"http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "title":"让女人最舒服的阴莖！让女人最舒服的阴莖！"
                    }
                ]
            },
            {
                'name': 'sticker/pa2a',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa2a-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[36],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=sticker_pa2',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "desc":"男人区分render v2/sticker/pa2",
                        "idea_url":"http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "title":"Hello world，区分render v2/sticker/pa2"
                    }
                ]
            },
            {
                'name': 'sticker/pa_links',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/sticker/pa_links-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[37],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=sticker_pa_links',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "desc":"男人够大够粗，才能彻底征服女人！ 一夜7次，持久绝招，让女人夜夜尖叫！",
                        "idea_url":"http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "title":"让女人最舒服的阴莖！让女人最舒服的阴莖！",
                        "sturl": [
                            "2014暑期班",
                            "牛逼的百度百科全书",
                            "雅思培训",
                            "留学VIP",
                            "夏令营",
                            "雅思培训"
                        ]
                    }
                ]
            },
            {
                'name': 'v2/dock/reel_pa',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/dock/reel_pa-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[38],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=dock_reel_pa',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "desc":"男人区分render v2/dock/reel_pa",
                        "idea_url":"http://ubmcmm.baidustatic.com/media/v1/0f000nTm6mjvfLINpq-Cns.jpg",
                        "title":"Hello world，区分render v2/dock/reel_pa"
                    }
                ]
            },
            {
                'name': 'v2/sticker/multimedia',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/sticker/multimedia-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[39],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=dock_reel_pa',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "title":"标题文本",
                        "idea_url":"http://dummyimage.com/600x60/ccc/999.png",
                        "idea_width": 600,
                        "idea_height": 60
                    }
                ]
            },
            {
                'name': 'v2/sticker/multimedia-flash',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/sticker/multimedia-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[40],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=dock_reel_pa',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "title":"标题文本",
                        "idea_url":"http://ecma.bdimg.com/adtest/edfaa5fed83924e38f63768f348d1ef5.swf",
                        "idea_width": 400,
                        "idea_height": 60
                    }
                ]
            },
            {
                'name': 'v2/sticker/multimedia-overheight',
                'position_type': '0',
                'render': 'http://bs.baidu.com/public03/imageplus/v2/sticker/multimedia-dev.app.js',
                'ads': [
                    {
                        'image': imgArray[41],
                        'encry_url':'http://bzclk.baidu.com/eye.php?t=dock_reel_pa',
                        'target_url': 'http://bzclk.baidu.com/eye.php?t=target_url',
                        "title":"标题文本",
                        "idea_url":"http://file21.mafengwo.net/M00/BA/DB/wKgB3FIUeLqASTI8AAS77bpZtMc76.groupinfo.w600.jpeg",
                        "idea_width": 600,
                        "idea_height": 90
                    }
                ]
            }
        ];
        callback(dat);

        var map = {};
        for (var i = 0; i < imgArray.length; i++) {
            map[imgArray[i]] = {};
        }
        for (var i = 0; i < dat.length; i++) {
            var ads = dat[i].ads;
            for (var j = 0; j < ads.length; j++) {
                var item = map[ads[j]['image']];
                item[dat[i].name] = dat[i].render;
            }
        }
        var listHtml = ['<ul>'];
        for (var i = 0; i < imgArray.length; i++) {
            var item = map[imgArray[i]];
            var keys = baidu.object.keys(item);
            listHtml.push('<li data-detail="' + baidu.string.encodeHTML(baidu.json.stringify(item)) + '"><a href="#' + i + '">' + keys.join(', ') + '</a></li>');
        }
        listHtml.push('</ul>');
        ad.dom.g('list').innerHTML = listHtml.join('');
        if (window.slider) {
            window.slider.active(window.slider.i);
        }
    };

    // start loader
    ad.plugin.imageplus.imageLoader.main();

    var imgArray = [
        'http://ecma.bdimg.com/adtest/ca009baa372f0582b4ff4582e14bb192.jpg',
        'http://eiv.baidu.com/mapm2/zhouminming01/imageplus/mockup/10056164_253903.jpg',
        'http://ecma.bdimg.com/adtest/a23b6f760dbdca293e453561298abea8.jpg',
        'http://ecma.bdimg.com/adtest/403b0e89a2014a7e0e2581115fc722d3.jpg',
        'http://ecma.bdimg.com/adtest/4cced07a2829b8f8e2b3d2c23e8bc6e0.jpg',
        'http://ecma.bdimg.com/adtest/1090ea6f2c2004cfdd04e1f3b96e47dc.jpg',
        'http://pic2.52pk.com/files/120228/309295_164040_1828.jpg',
        'http://ecma.bdimg.com/adtest/ce7a6a5c36e063b0af50f5c861573fbb.jpg',
        'http://ecma.bdimg.com/adtest/9bbe347fdd5241f12b5f3c27af8841d5.jpg',
        'http://ecma.bdimg.com/adtest/3beb5e367b39cbde445116335accb2e4.jpg',
        'http://ecma.bdimg.com/adtest/3668806015994a3852b1bbb5ef5b0f3e.jpg',
        'http://ecma.bdimg.com/adtest/0eb6e355aee3f38032fce22a490ac95a.jpg',
        'http://ecma.bdimg.com/adtest/0638c8540c7629883f6fed282d0fea4f.jpg',
        'http://ecma.bdimg.com/adtest/4b3881a187291627fa722ac55e051f56.jpg',
        'http://ecma.bdimg.com/adtest/3dc4f8092a3a479ac4ac64e2e61405b9.jpg',
        'http://ecma.bdimg.com/adtest/0cf0501a5779fe831e188346d8bde0d2.jpg',
        'http://ecma.bdimg.com/adtest/001583e5b381e3429d83fd5dac3e51cb.jpg',
        'http://ecma.bdimg.com/adtest/8ef6c495c8aee96c431cb961172ad117.jpg',
        'http://ecma.bdimg.com/adtest/225edbe78bd615ee3f0a9d6864f10431.jpg',
        'http://ecma.bdimg.com/adtest/61d1a34067252a1d0e24148a61838251.jpg',
        'http://ecma.bdimg.com/adtest/17caaed48589965d517b622ad4a67b10.jpg',
        'http://ecmc.bdimg.com/lego-mat/ai_42a42de8-6be7-4fa0-bd39-f43188707f92.jpg',
        'http://ecma.bdimg.com/adtest/c1aff2ec8af7be78782947368cd62b63.jpg',
        'http://ecma.bdimg.com/adtest/187dfe66a656f3d44416318dd201f796.jpg',
        'http://ecma.bdimg.com/adtest/0535f66ed1a0b3a1df202d7b6d41ac9e.jpg',
        'http://ecma.bdimg.com/adtest/4adaf6c1a4f046460aeb79ab51263941.jpg',
        'http://ecma.bdimg.com/adtest/e7088cc356ee71061a0299530bf43879.jpg',
        'http://ecma.bdimg.com/adtest/5f2b513570575528decc66e66e5976de.jpg',
        'http://ecma.bdimg.com/adtest/de70a92be91f161c950d7f96e88df7d8.jpg',
        'http://ecma.bdimg.com/adtest/f3400f269e442d717d33a55141be36dc.jpg',
        'http://ecma.bdimg.com/adtest/397ed7db52708aae7fcdd7c8d9cad700.jpg',
        'http://ecma.bdimg.com/adtest/14e31182464e5270bc87938d152a8a6d.jpg',
        'http://ecma.bdimg.com/adtest/325f275128a1f6dff492e20e69fc008d.jpg',
        'http://ecma.bdimg.com/adtest/b29546a81d428e3578fcf3964065d613.jpg',
        'http://ecma.bdimg.com/adtest/991ccc4a1b3b60ee9c19061457005c0e.jpg',
        'http://ecma.bdimg.com/adtest/3a69226115e47bddfaf76bcb570102ce.jpg',
        'http://ecma.bdimg.com/adtest/5dffff5c9ad81273099cbbe41ee69f21.jpg',
        'http://ecma.bdimg.com/adtest/6969cd90b097696b31f9e44b35e6b18c.jpg',
        'http://ecmb.bdimg.com/adtest/e76571f0b7c30163a0459d4915fe3bb9.jpg',
        'http://ecma.bdimg.com/adtest/e76571f0b7c30163a0459d4915fe3bb9.jpg',
        'http://ecmb.bdimg.com/adtest/6969cd90b097696b31f9e44b35e6b18c.jpg',
        'http://ecmc.bdimg.com/adtest/6969cd90b097696b31f9e44b35e6b18c.jpg'
    ];

    /**
     * Slider
     * @constructor
     */
    var Slider = function () {
        this.i = 0;
    };
    Slider.prototype.show = function () {
        var i = (location.hash && parseInt(location.hash.slice(1), 10)) || 0;
        this.i = i;
        var url = imgArray[i];
        var img = document.createElement('img');
        var container = document.getElementById('srcPic');
        img.onload = function () {
            fireEvent('SHOW_IMAGE_DETAIL', {
                'imaURL': url,
                'zoom': 1,
                'etype': 'change',
                'objURL': url,
                'pn': i
            });
        };
        container.innerHTML = '';
        container.appendChild(img);
        this.active(this.i);
        img.src = url;
        img.className = 'imageplus-img';
    };
    Slider.prototype.active = function(index) {
        var listEle = ad.dom.g('list');
        var eles = baidu.dom.q('active', listEle);
        for (var i = 0; i < eles.length; i++) {
            baidu.removeClass(eles[i], 'active');
        }
        var lis = listEle.getElementsByTagName('li');
        if (lis[index]) {
            baidu.addClass(lis[index], 'active');
            if (baidu.dom.getPosition(lis[index]).top > baidu.page.getScrollTop() + baidu.page.getViewHeight()) {
                lis[index].scrollIntoView(false);
            }
            var detail = baidu.json.parse(baidu.dom.getAttr(lis[index], 'data-detail'));
            var html = [];
            for (var key in detail) {
                html.push('<b>' + key + ':</b> ' + detail[key]);
            }
            ad.dom.g('detail').innerHTML = html.join('<br />');
        }
    };
    Slider.prototype.next = function () {
        var i = (this.i + 1) % imgArray.length;
        location.hash = i + '';
        this.show();
    };
    Slider.prototype.prev = function () {
        if (this.i === 0) {
            this.i = imgArray.length;
        }
        var i = (this.i - 1) % imgArray.length;
        location.hash = i + '';
        this.show();
    };

    // fireEvent
    function fireEvent(event, data) {
        var callbacks = eventCallbacks[event];
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i].call(null, null, data || eventData[event]);
        }
    }

    ad.base.setTimeout(function () {
        fireEvent('SHOW_IMAGE_PROMOTION', {
            'imaURLs': imgArray,
            'startPn': 0
        });
        var slider = new Slider();
        window.slider = slider;
        slider.show();
        var buttons = document.getElementsByTagName('button');
        buttons[0].onclick = function () {
            slider.prev();
        };
        buttons[1].onclick = function () {
            slider.next();
        };
        baidu.on('list', 'click', function(e) {
            var target = baidu.event.getTarget(e);
            if (target && target.nodeName === 'A') {
                ad.base.setTimeout(
                    function() {
                        slider.show();
                    },
                    0
                );
            }
        });
        baidu.on('list-thumbnail', 'click', function(e) {
            var pos = baidu.page.getMousePosition();
            var domPos = baidu.dom.getPosition(ad.dom.g('list-thumbnail'));
            var diff = Math.min(Math.max(pos.y - domPos.top - 10, 0), 200);
            var listEle = ad.dom.g('list');
            document.body.scrollTop = document.documentElement.scrollTop = parseInt(listEle.offsetHeight * diff / 200, 10);
            var btn = ad.dom.g('list-thumbnail-button');
            btn.style.top = diff + 'px';
        });
    }, 1000);
};

ad.plugin.imageplus.imageLoaderMockup();















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

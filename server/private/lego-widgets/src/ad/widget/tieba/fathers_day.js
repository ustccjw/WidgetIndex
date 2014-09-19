/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/fathers_day.js ~ 2013/06/07 16:29:45
 * @author yandongbin@baidu.com (yandongbin)
 * @version $Revision: 150523 $
 * @description
 * fathers_day相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/fathers_day.less');
goog.include('ad/widget/tieba/fathers_day.html');

goog.provide('ad.widget.tieba.FathersDay');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.FathersDay = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_fathers_day';
};
baidu.inherits(ad.widget.tieba.FathersDay, ad.widget.Widget);

/** @override */
ad.widget.tieba.FathersDay.prototype.enterDocument = function () {
    ad.widget.tieba.FathersDay.superClass.enterDocument.call(this);
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?dfd7104ce0a6593a50b331f9f2c0c7b0';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(hm, s);
};

/** @override */
ad.widget.tieba.FathersDay.prototype.bindEvent = function () {
    ad.widget.tieba.FathersDay.superClass.bindEvent.call(this);
    var me = this,
        requestURL = 'http://pingan.baidu.com/PinganCamp/message/';
        // requestURL = 'http://220.181.32.78/PinganCamp/message/';

    baidu.on(baidu.g('compute'),'click',function () {
        if (baidu.browser.ie == '6') {
            baidu.g('layer').style.height = baidu.page.getHeight() + 'px';
            baidu.g('layer').style.width = baidu.page.getWidth() + 'px';
        }

        var fatherAge = parseInt(baidu.g('fatherAge').value, 10),
            homeDay = parseInt(baidu.g('homeDay').value, 10);
        if (me.checkNum(fatherAge) && me.checkNum(homeDay)) {
            me.homeDayCount = (85-fatherAge)*homeDay;
            me.popupShow();
            baidu.g('fatherAge').value = '';
            baidu.g('homeDay').value = '';
            baidu.g('myAge').value = '';
        }
        else {
            alert('请输入有效数字！');
        }
    });

    var tab0 = baidu.g('tab-input-info'),
        tab1 = baidu.g('tab-product-detail'),
        content0 = baidu.g('tab-input-info-content'),
        content1 = baidu.g('tab-product-detail-content');

        baidu.on(tab0,'click',function () {
            content0.style.display='block';
            content1.style.display='none';
            tab0.className = 'selected tab-input-info';
            tab1.className = 'tab-product-detail';
        });

        baidu.on(tab1,'click',function () {
            content1.style.display='block';
            content0.style.display='none';
            tab0.className = 'tab-input-info';
            tab1.className = 'selected tab-product-detail';
        });


    baidu.on(baidu.g('send'),'click',function () {
        var phoneNum = baidu.g('phoneNum').value,
            vcode = baidu.g('validate').value,
            message = encodeURIComponent(baidu.g('message').value);
            if (vcode == '') {
                alert('请输入验证码！');
                return false;
            }
        baidu.sio.callByServer(
            requestURL
            + 'send.jsp?message=' + message
            + '&cellNumber=' + phoneNum
            + '&vcode=' + vcode
            + '&callback=messageFeedback'
        );
        return false;
    });

    baidu.on(baidu.g('close'),'click',function () {
        me.popupHide();
    });

    window['setImg'] = function (data) {
        data = data.replace('220.181.32.78', 'pingan.baidu.com');
        baidu.g('img').setAttribute(
            'src',
            decodeURIComponent(data) + '?' + Math.round(Math.random()*10000)
        );
    };

    window['updateItem'] = function (data) {
            var tpl = [];
            for(var i = 0, len = data.length; i < len; i++) {
                tpl.push('<div class="pic"><p>{' + i + '}</p></div>');
                data[i] = decodeURIComponent(data[i]);
            }

            baidu.g('List1').innerHTML = baidu.g('List2').innerHTML =
                baidu.string.format(
                    tpl.join('\n'),
                    data[0],
                    data[1],
                    data[2],
                    data[3],
                    data[4],
                    data[5],
                    data[6],
                    data[7],
                    data[8],
                    data[9]
                );
        };

    window['messageFeedback'] = function (data) {
        baidu.sio.callByServer(requestURL + 'getimg.jsp?callback=setImg');
        baidu.g('validate').value = '';
        switch(data) {
            case 0:
                alert('发送成功！');
                baidu.g('message').value = '';
                baidu.g('phoneNum').value = '';
                break;
            case 1:
                alert('您好，请为爸爸送上节日祝福。！');
                break;
            case 2:
                alert('服务器出错，请从新发送！');
                break;
            case 3:
                alert('验证码错误！');
                break;
        }
    };

    baidu.on(baidu.g('validate'), 'focus', function () {
        if (!baidu.g('img').getAttribute('src')) {
            baidu.g('img').style.display = 'block';
            baidu.sio.callByServer(requestURL + 'getimg.jsp?callback=setImg');
        }
    });

    function func() {
        baidu.sio.callByServer(requestURL + 'list.jsp?callback=updateItem');
    }

    func();
    ad.base.setInterval(func, 1000*60*15);

    me.initXXX();
};

ad.widget.tieba.FathersDay.prototype.checkNum = function (num) {
    if (!isNaN(num) && num>=0 && num<=366) {
        return true;
    }
    return false;
};

ad.widget.tieba.FathersDay.prototype.popupShow = function () {
    baidu.g('layer').style.display='block';

    var popup = baidu.g('popup');
    var left = Math.max(0, (baidu.page.getWidth()-730)/2);
    var top = (window.scrollY || window.screenTop) + 150;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';

    // baidu.g('popup').style.cssText =
    //      baidu.string.format('top:150px;left:{0}px;', left<0?0:left);
    if (this.homeDayCount < 100) {
        baidu.g('times').innerHTML =
            '<span class="text">您回家时间太少，要常回家看看啊！</span>';
    }
    else {
        baidu.g('times').innerHTML =
            baidu.string.format(
                '<span class="num">{0}</span><span class="text">天</span>',
                this.homeDayCount
            );
    }
};

ad.widget.tieba.FathersDay.prototype.popupHide = function () {
    baidu.g('layer').style.display='none';
    baidu.g('popup').style.cssText = 'top:-9999px;left:-9999px;';
};


ad.widget.tieba.FathersDay.prototype.initXXX = function () {
    var Speed = 1, //速度(毫秒)
        Space = 5, //每次移动(px)
        PageWidth = 360, //翻页宽度
        fill = 0, //整体移位
        MoveLock = false,
        MoveTimeObj,
        Comp = 0,
        ISL_Cont = baidu.g('ISL_Cont'),
        List1 = baidu.g('List1'),
        BtnLeft = baidu.g('btn-left'),
        BtnRight = baidu.g('btn-right'),
        AutoPlayObj = null;

    ISL_Cont.scrollLeft = fill;

    function ISL_ScrDown() { //下翻动作
        if (ISL_Cont.scrollLeft >= List1.scrollWidth) {
            ISL_Cont.scrollLeft = ISL_Cont.scrollLeft - List1.scrollWidth;
        }
        ISL_Cont.scrollLeft += Space ;
    }

    function ISL_ScrUp() { //上翻动作
        if (ISL_Cont.scrollLeft <= 0) {
            ISL_Cont.scrollLeft = ISL_Cont.scrollLeft + List1.offsetWidth;
        }
        ISL_Cont.scrollLeft -= Space ;
    }

    function CompScr() {
        var num;
        if (Comp == 0) {
            MoveLock = false;return;
        }
        if (Comp < 0) { //上翻
            if (Comp < -Space) {
                Comp += Space;
                num = Space;
            }
            else {
                num = -Comp;
                Comp = 0;
            }

            ISL_Cont.scrollLeft -= num;
            ad.base.setTimeout(function () {
                CompScr();
            },Speed);
        }
        else { //下翻
            if (Comp > Space) {
                Comp -= Space;
                num = Space;
            }
            else {
                num = Comp;
                Comp = 0;
            }

            ISL_Cont.scrollLeft += num;
            ad.base.setTimeout(function () {
                CompScr();
            },Speed);
        }
    }


    function ISL_GoUp() { //上翻开始
        if (MoveLock) return;

        ad.base.clearInterval(AutoPlayObj);
        MoveLock = true;
        MoveTimeObj = ad.base.setInterval(function () {
            ISL_ScrUp();
        },Speed);
    }

    function ISL_GoDown() { //下翻
        ad.base.clearInterval(MoveTimeObj);
        if (MoveLock) return;

        ad.base.clearInterval(AutoPlayObj);
        MoveLock = true;
        ISL_ScrDown();
        MoveTimeObj = ad.base.setInterval(function () {
            ISL_ScrDown();
        },Speed);
    }

    function AutoPlay() { //自动滚动
        ad.base.clearInterval(AutoPlayObj);
        AutoPlayObj = ad.base.setInterval(function () {
            ISL_GoDown();
            ISL_StopDown();
        },3400); //间隔时间
    }

    function ISL_StopUp() { //上翻停止
        ad.base.clearInterval(MoveTimeObj);

        if (ISL_Cont.scrollLeft % PageWidth - fill != 0) {
            Comp = fill - (ISL_Cont.scrollLeft % PageWidth);
            CompScr();
        }
        else {
            MoveLock = false;
        }

        AutoPlay();
    }

    function ISL_StopDown() { //下翻停止
        ad.base.clearInterval(MoveTimeObj);

        if (ISL_Cont.scrollLeft % PageWidth - fill != 0 ) {
            Comp = PageWidth - ISL_Cont.scrollLeft % PageWidth + fill;
            CompScr();
        }
        else {
            MoveLock = false;
        }

        AutoPlay();
    }

    AutoPlay();
    ISL_Cont.onmouseover = function () {
        ad.base.clearInterval(AutoPlayObj);
    };
    ISL_Cont.onmouseout = function () {
        AutoPlay();
    };

    BtnLeft.onmousedown = function () {
        ISL_GoUp();
    };
    BtnLeft.onmouseup = function () {
        ISL_StopUp();
    };
    BtnLeft.onmouseout = function () {
        ISL_StopUp();
    };
    BtnRight.onmousedown = function () {
        ISL_GoDown();
    };
    BtnRight.onmouseup = function () {
        ISL_StopDown();
    };
    BtnRight.onmouseout = function () {
        ISL_StopDown();
    };

};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */

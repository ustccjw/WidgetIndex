/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/**
 * src/ad/fx/dragdrop.js ~ 2013/04/29 13:51:25
 * @author dingguoliang01(dingguoliang01@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.provide('ad.fx.dragdrop');
/**
 * 加入拖拽插件
 * @param {function} jquery函数
 */
ad.fx.dragdrop = function ($) {
    /**
     * 拖拽
     * @param {Object} 	[options] 拖拽的选项参数
     *
     * @config {Object}   [limit] 			拖拽的限定范围，jquery实例
     * @config {Object}   [handle] 			拖拽手柄，jquery实例
     * @config {Object}   [el] 				添加拖动节点的父节点，jquery实例
     * @config {String}   [dragClass] 	    添加给拖动节点的样式名称
     * @config {Function} [bind]            绑定拖动时的回调函数
     * @config {Function} [unbind]          解除拖动时的回调函数
     * @config {Function} [start]           拖动开始时的响应函数
     * @config {Function} [move] 			拖动过程中的响应函数
     * @config {Function} [reject] 			拖动拒绝时的响应函数
     * @config {Function} [stop] 		    拖动结束时的响应函数
     * @config {Function} [dropEnter] 	    进入释放区域时的响应函数
     * @config {Function} [dropOut]	        离开释放区域时的响应函数
     * @config {number}   [sensitivity] 	检测进入或离开释放区域的频率
     * @config {number}   [dLeft] 			基于限定区域的left修正
     * @config {number}   [dRight] 			基于限定区域的right修正
     * @config {number}   [dTop] 			基于限定区域的top修正
     * @config {number}   [dBottom] 	    基于限定区域的bottom修正
     */
    $.fn.Drag = function (options) {
        var defaults = {
            limit: false,//是否限制拖放范围
            drop: false,//是否drop
            handle: false,//拖动手柄
            el: $('body'),
            dragClass: false,
            bind: false,
            unbind: false,
            start: false,
            move: false,
            reject: false,
            stop: false,
            dropEnter: false,
            dropOut: false,
            dLeft: 0,
            dRight: 0,
            dTop: 0,
            dBottom: 0,
            sensitivity: 10
        };
        //被拖动元素不可以被选中，否则text，img默认行为很难看，text会选中文本，img会禁止拖拽
        var css = {'cursor': 'move', '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            'user-select': 'none'
        };
        var options = $.extend(defaults, options);
        this.dropEnter = false;
        this.dropOut = true;
        this.reaction = 0;
        this.zIndex = 1;
        this.X = 0;//初始位置
        this.Y = 0;
        this.dx = 0;//位置差值
        this.dy = 0;
        var This = this;  //拖动目标，jquery实例
        var ThisO = this; //当前被拖目标，jquery实例
        This.dragObj = ThisO;
        if (options.drop) {
            var ThatO = $(options.drop);//释放区域，jquery实例
            This.dropObj = ThatO;
            ThisO.css(css);
            var tempBox = $('<div style="position: absolute;z-index: 1000;margin:0;"></div>'); //拖拽替代dom元素，jquery实例
            tempBox.css(css);
            if (options.dragClass) {
                tempBox.addClass(options.dragClass);
            }
        } else {
            options.handle ? ThisO.find(options.handle).css(css) : ThisO.css(css);
        }
        this.unbindDrag = function(dom) {
            if(dom) {
                dom = $(dom);
                dom.unbind('mousedown', This.dragStart);
                if (options.unbind) {
                    options.unbind(dom);
                }
            } else {
                options.handle ? This.find(options.handle).unbind('mousedown', This.dragStart) : This.unbind('mousedown', This.dragStart);
                if(options.unbind) {
                    options.unbind(This);
                }
            }
        }
        //绑定拖动
        this.bindDrag = function() {
            options.handle ? This.find(options.handle).mousedown(This.dragStart) : This.mousedown(This.dragStart);
            if (options.bind) {
                options.bind(This);
            }
        }
        //拖动开始
        this.dragStart = function (e) {
            var cX = e.pageX;
            var cY = e.pageY;
            ThisO = $(this);
            if (ThisO.length != 1) {
                return
            }//如果没有拖动对象就返回
            ThisO.css('z-index', This.zIndex++);
            var ThisOOffset = ThisO.offset();
            This.X = ThisOOffset.left;
            This.Y = ThisOOffset.top;
            var parentOffset = ThisO.offsetParent().offset();
            This.parentX = parentOffset.left;
            This.parentY = parentOffset.top;
            if (options.drop) {
                tempBox.html(ThisO.html());
                if (options.start) {
                    options.start(e, ThisO, tempBox);
                } else {
                    ThisO.html('');
                }
                options.el.append(tempBox);
                tempBox.css({left: This.X - This.parentX, top: This.Y - This.parentY});
            } else {
                if (options.start) {
                    options.start(e, ThisO);
                }
                ThisO.css({margin:0, position: 'absolute', left: This.X - This.parentX, top: This.Y - This.parentY});
            }
            This.dx = cX - This.X;
            This.dy = cY - This.Y;
            $(document).mousemove(This.dragMove).mouseup(This.dragStop);
            //防止拖拽过程中选中其他元素
            $('body').bind('selectstart', selectstart);
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                ThisO[0].setCapture();
            }//IE,鼠标移到窗口外面也能释放
        }
        //拖动中
        this.dragMove = function (e) {
            var cX = e.pageX;
            var cY = e.pageY;
            if (options.limit) {//限制拖动范围
                //容器的尺寸
                var $Limit = options.limit,
                    $LimitOffset = $Limit.offset();
                var L = $LimitOffset.left + options.dLeft;
                var T = $LimitOffset.top + options.dTop;
                var R = L - options.dLeft + $Limit.width() + options.dRight;
                var B = T - options.dTop + $Limit.height() + options.dBottom;
                //获取拖动范围
                var iLeft = cX - This.dx, iTop = cY - This.dy;
                //获取超出长度
                var iRight = iLeft + parseInt(ThisO.innerWidth()) - R, iBottom = iTop + parseInt(ThisO.innerHeight()) - B;
                //先设置右下，再设置左上
                if (iRight > 0) iLeft -= iRight;
                if (iBottom > 0) iTop -= iBottom;
                if (L > iLeft) iLeft = L;
                if (T > iTop) iTop = T;
                iLeft = iLeft - This.parentX;
                iTop = iTop - This.parentY;
                if (options.move) {
                    if (options.drop) {
                        options.move(e, iLeft, iTop, tempBox, options);
                    } else {
                        options.move(e, iLeft, iTop, ThisO, options);
                    }
                } else {
                    if (options.drop) {
                        tempBox.css({left: iLeft, top: iTop})
                    } else {
                        ThisO.css({left: iLeft, top: iTop})
                    }
                }

            } else {
                //不限制范围
                var iLeft = cX - This.dx - This.parentX;
                var iTop = cY - This.dy - This.parentY;
                if (options.move) {
                    if (options.drop) {
                        options.move(e, iLeft, iTop, tempBox, options);
                    } else {
                        options.move(e, iLeft, iTop, ThisO, options);
                    }
                } else{
                    if (options.drop) {
                        tempBox.css({left: iLeft, top: iTop})
                    } else {
                        ThisO.css({left: iLeft, top: iTop});
                    }
                }
            }
            if (options.drop && (options.dropEnter || options.dropOut)) {
                This.reaction++;
                if(This.reaction >= options.sensitivity) {
                    This.reaction = 0;
                    This.dropOut = true;
                    for (var i = 0; i < ThatO.length; i++) {
                        var $ThatO = $(ThatO[i]);
                        var XL = $ThatO.offset().left;
                        var XR = XL + $ThatO.width();
                        var YL = $ThatO.offset().top;
                        var YR = YL + $ThatO.height();
                        if (XL < cX && cX < XR && YL < cY && cY < YR) {//找到拖放目标，交换位置
                            This.dropEnter = true;
                            This.dropOut = false;
                            if (options.dropEnter) {
                                options.dropEnter(e, $ThatO, tempBox, ThisO);
                            }
                            break;//一旦找到，就终止循环
                        }
                    }
                    if (options.dropOut && This.dropOut && This.dropEnter) {
                        This.dropEnter = false;
                        options.dropOut(e, ThatO, tempBox, ThisO);
                    }
                }
            }
        }
        //拖动结束
        this.dragStop = function (e) {
            if (options.drop) {
                var flag = false;
                var cX = e.pageX;
                var cY = e.pageY;
                var oLf = ThisO.offset().left;
                var oRt = oLf + ThisO.width();
                var oTp = ThisO.offset().top;
                var oBt = oTp + ThisO.height();
                if (!(cX > oLf && cX < oRt && cY > oTp && cY < oBt)) {//如果不是在原位
                    for (var i = 0; i < ThatO.length; i++) {
                        var $ThatO = $(ThatO[i]);
                        var XL = $ThatO.offset().left;
                        var XR = XL + $ThatO.width();
                        var YL = $ThatO.offset().top;
                        var YR = YL + $ThatO.height();
                        if (XL < cX && cX < XR && YL < cY && cY < YR) {//找到拖放目标，交换位置
                            if (options.stop) {
                                options.stop(e, $ThatO, tempBox, ThisO);
                            } else {
                                var newElm = $ThatO.html();
                                $ThatO.html(tempBox.html());
                                ThisO.html(newElm);
                            }
                            tempBox.remove();
                            flag = true;
                            break;//一旦找到，就终止循环
                        }
                    }
                }
                if (!flag) {//如果找不到拖放位置，归回原位
                    tempBox.css({left: This.X - This.parentX, top: This.Y - This.parentY});
                    if (options.reject) {
                        options.reject(e, ThisO, tempBox);
                    } else {
                        ThisO.html(tempBox.html());
                    }
                    tempBox.remove();
                }
            } else if (options.stop) {
                options.stop(e, ThisO);
            }
            $(document).unbind('mousemove').unbind('mouseup');
            $('body').unbind('selectstart', selectstart);
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                ThisO[0].releaseCapture();
            }
        }
        this.bindDrag();
        //IE禁止选中文本
        function selectstart() {
            return false;
        }
        //IE
        /*document.body.onselectstart=function(){return false;}*/
        return this;
    }
    return $;
}
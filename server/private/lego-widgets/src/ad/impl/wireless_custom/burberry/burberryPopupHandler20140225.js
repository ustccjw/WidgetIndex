//处理领取小样弹层
var burberryPopupHandler20140225 = {
    serviceUrl: 'http://wbapi.baidu.com/service/burberry/',
    prepare: function(site, fwc, fwcPanel, baidu) {
        this.officialSite = site;
        this.fwc = fwc;
        this.fwcPanel = fwcPanel;
        this.baidu = baidu;
    },
    show: function() {
        var me = this;
        me.moveToTop();
        me.fwc.show();
        if(!me.inited) {
            me.setFwcSizePos();
            me.fwcPanel.refresh(null ,{
                'content': me.getCont('clause')
            });
            me.initClauseEvent();
            me.checkViewport();
        }
        me.inited = true;
    },
    initClauseEvent: function() {
        var me = this;
        var readBtn = me.fwcPanel.getRoot().querySelector('.ec-button-clause');
        me.baidu.on(readBtn, 'click', function() {
            me.fwc.sendLog('阅读条款');
            me.readClause();
        });
    },
    checkViewport: function() {
        var me = this;
        me.baidu.on(window, 'resize', function() {
            me.setFwcSizePos();
        });
    },
    setFwcSizePos: function() {
        var me = this;
        var fwcDom = me.fwc.getRoot().firstElementChild;
        me.baidu.dom.setStyles(fwcDom, {
            "left": "0",
            "top": "0",
            "width": me.baidu.page.getViewWidth() + "px",
            "height": me.baidu.page.getViewHeight() + "px"
        });
    },
    readClause: function() {
        var me = this;
        me.moveToTop();
        me.fwcPanel.refresh(null ,{
            'content': me.getCont('identify')
        });
        me.initIdentifyEvent();
    },
    moveToTop: function() {
        document.body.scrollTop = 0;
    },
    initIdentifyEvent: function() {
        var me = this;
        var panelRoot = me.fwcPanel.getRoot();
        var cellNum;
        var disableCls = 'ec-button-disable';
        var mobileIpt = panelRoot.querySelector('.ec-mobile');
        var mobileErrTip = panelRoot.querySelector('.ec-error-mobile');
        var getCodeBtn = panelRoot.querySelector('.ec-get-identify');
        var identifyCodeIpt = panelRoot.querySelector('.ec-identify');
        var identifyErrTip = panelRoot.querySelector('.ec-error-identify');
        var sendCodeBtn = panelRoot.querySelector('.ec-button-send-code');
        this.initIptBehavior(mobileIpt, '手机号码', mobileErrTip);
        this.initIptBehavior(identifyCodeIpt, '输入手机验证码', identifyErrTip);
        me.baidu.on(getCodeBtn, 'click', function() {
            cellNum = me.baidu.string.trim(mobileIpt.value);
            if(me.baidu.dom.hasClass(getCodeBtn, disableCls)) {
                return;
            }
            if(!me.isMobileNum(cellNum) || me.isDefaultVal(mobileIpt)) {
                me.showErrTip(mobileErrTip, '请输入正确的手机号');
                return;
            }
            me.fwc.sendLog('获取验证码');
            me.baidu.dom.addClass(getCodeBtn, disableCls);
            getCodeBtn.innerHTML = "60秒后重新发送";
            var startTime = new Date().getTime();
            function checkTime() {
                if(!document.documentElement.contains(getCodeBtn)) {
                    return;
                }
                var now = new Date().getTime();
                var sec = Math.floor((now - startTime)/1000);
                if(sec > 60) {
                    getCodeBtn.innerHTML = "获取验证码";
                    me.baidu.dom.removeClass(getCodeBtn, disableCls);
                } else {
                    getCodeBtn.innerHTML = (60 - sec) + "秒后重新发送";
                    setTimeout(checkTime, 1000);
                }
            }
            checkTime();
            me.getMobileCode(cellNum, function(errMsg) {
                me.showErrTip(mobileErrTip, errMsg);
            }, function() {
                me.cellNum = cellNum;
            });
        });
        me.baidu.on(sendCodeBtn, 'click', function() {
            var vcode = me.baidu.string.trim(identifyCodeIpt.value);
            if(me.baidu.dom.hasClass(sendCodeBtn, disableCls)) {
                return;
            }
            if('' == vcode || me.isDefaultVal(identifyCodeIpt)) {
                me.showErrTip(identifyErrTip, '请输入手机验证码');
                return;
            }
            me.fwc.sendLog('检验验证码');
            me.baidu.dom.addClass(sendCodeBtn, disableCls);
            me.sendMobileCode(cellNum, vcode, function(errMsg) {
                me.showErrTip(identifyErrTip, errMsg);
                me.baidu.dom.removeClass(sendCodeBtn, disableCls);
            }, function() {
                me.vcode = vcode;
                me.showSubmitForm();
            });
        });
    },
    isDefaultVal: function(ipt) {
        if(this.baidu.dom.hasClass(ipt, 'ec-input-default')) {
            return true;
        } else {
            return false;
        }
    },
    initIptBehavior: function(ipt, defaultValue, errorTip) {
        var me = this;
        var defaultClass = 'ec-input-default';
        me.baidu.on(ipt, 'focus', function() {
            if(me.baidu.dom.hasClass(ipt, defaultClass)) {
                me.baidu.dom.removeClass(ipt, defaultClass);
                ipt.value = '';
            }
            me.baidu.dom.setStyle(errorTip, 'display', '');
        });
        me.baidu.on(ipt, 'blur', function() {
            if('' == ipt.value) {
                me.baidu.dom.addClass(ipt, defaultClass);
                ipt.value = defaultValue;
            }
        });
    },
    showErrTip: function(tipDom, errMsg) {
        if(errMsg) {
            tipDom.innerHTML = errMsg;
        }
        this.baidu.dom.setStyle(tipDom, 'display', 'block');
    },
    isMobileNum: function(value) {
        if (value == '' ) {
            return false;
        }

        if (value.charAt(0) == '1') {
            var telreg1 = new RegExp('^13\\d{9}$'),
                telreg2 = new RegExp('^14[57]\\d{8}$'),
                telreg3 = new RegExp('^15[0-35-9]\\d{8}$'),
                telreg4 = new RegExp('^18[0-9]\\d{8}$');
            if (!telreg1.test(value)
                && !telreg2.test(value)
                && !telreg3.test(value)
                && !telreg4.test(value)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    },
    getMobileCode: function(cellNum, errCb, cb) {
        var getCodeUrl = this.serviceUrl + 'vcode?mobile=' + cellNum;
        this.baidu.sio.callByServer(getCodeUrl, function(sResult) {
            if ('false' == sResult['success']) {
                errCb(sResult['message']['mobile']);
            } else {
                cb();
            }
        });
    },
    sendMobileCode: function(cellNum, vcode, errCb, cb) {
        var sendCodeUrl = this.serviceUrl + 'check_vcode?mobile=' + cellNum + '&vcode=' + vcode;
        this.baidu.sio.callByServer(sendCodeUrl, function(sResult) {
            if ('false' == sResult['success']) {
                errCb(sResult['message']['vcode']);
            } else {
                cb();
            }
        });
    },
    showSubmitForm: function() {
        var me =  this;
        me.moveToTop();
        me.fwcPanel.refresh(null, {
            'content': me.getCont('form')
        });
        me.initFormEvent();
    },
    initFormEvent: function() {
        var me = this;
        var panelRoot = me.fwcPanel.getRoot();
        var disableCls = 'ec-button-disable';
        var nameIpt = panelRoot.querySelector('.ec-name');
        var nameErrTip = panelRoot.querySelector('.ec-error-name');
        var genderSel = panelRoot.querySelector('.ec-select-gender');
        var genderValSpan = panelRoot.querySelector('.ec-select-gender-value');
        var emailIpt = panelRoot.querySelector('.ec-email');
        var emailErrTip = panelRoot.querySelector('.ec-error-email');
        var provinceSel = panelRoot.querySelector('.ec-select-province');
        var provinceValSpan = panelRoot.querySelector('.ec-select-province-value');
        var provinceErrTip = panelRoot.querySelector('.ec-error-province');
        var citySel = panelRoot.querySelector('.ec-select-city');
        var cityValSpan = panelRoot.querySelector('.ec-select-city-value');
        var addressIpt = panelRoot.querySelector('.ec-address');
        var addressErrTip = panelRoot.querySelector('.ec-error-address');
        var postalCodeIpt = panelRoot.querySelector('.ec-postal-code');
        var postalCodeErrTip = panelRoot.querySelector('.ec-error-postal-code');
        var submitBtn = panelRoot.querySelector('.ec-button-submit');
        var submitErrTip = panelRoot.querySelector('.ec-error-submit');

        me.initIptBehavior(nameIpt, '您的姓名', nameErrTip);
        me.initIptBehavior(emailIpt, '您的邮箱', emailErrTip);
        me.initIptBehavior(addressIpt, '详细地址', addressErrTip);
        me.initIptBehavior(postalCodeIpt, '邮政编码', postalCodeErrTip);
        me.initSelectBehavior(genderSel, genderValSpan);
        me.initSelectBehavior(provinceSel, provinceValSpan, true, citySel, cityValSpan);
        me.initSelectBehavior(citySel, cityValSpan);

        me.initCityDependency(provinceSel, citySel);
        me.provinceChange(provinceSel, citySel, cityValSpan);

        me.baidu.on(submitBtn, 'click', function() {
            var name = me.baidu.string.trim(nameIpt.value);
            var gender = me.baidu.string.trim(genderSel.value);
            var email = me.baidu.string.trim(emailIpt.value);
            var province = me.baidu.string.trim(provinceSel.value);
            var city = me.baidu.string.trim(citySel.value);
            var address = me.baidu.string.trim(addressIpt.value);
            var postalCode = me.baidu.string.trim(postalCodeIpt.value);

            if(me.baidu.dom.hasClass(submitBtn, disableCls)) {
                return;
            }

            try {
                me.checkName(name, nameErrTip);
                me.checkEmail(email, emailErrTip);
                me.checkProvince(province, provinceErrTip);
                me.checkAddress(address, addressErrTip);
                me.checkPostalCode(postalCode, postalCodeErrTip);
            } catch(e) {
                return;
            }
            
            me.baidu.dom.addClass(submitBtn, disableCls);
            me.fwc.sendLog('提交表单');

            var params = [];
            function addParam(name, value) {
                params.push(name + '=' + encodeURIComponent(value));
            }
            addParam('name', name);
            addParam('email', email);
            addParam('sex', gender);
            addParam('province', province);
            addParam('city', city);
            addParam('address', address);
            addParam('post', postalCode);
            addParam('mobile', me.cellNum || '');
            addParam('vcode', me.vcode || '');
            addParam('from', 'wise');

            me.sendSubmit(params.join('&'), function(errField) {
                var errMsg = [];
                for (var key in errField) {
                    errMsg.push(errField[key]);
                }
                me.showErrTip(submitErrTip, errMsg.join('&nbsp&nbsp'));
                me.baidu.dom.removeClass(submitBtn, disableCls);
            }, function() {
                me.submitSuccess();
            });
        });
    },
    submitSuccess: function() {
        var me = this;
        me.moveToTop();
        me.fwcPanel.refresh(null, {
            'content': me.getCont('submitSuccess')
        });
        var successBtn = me.fwcPanel.getRoot().querySelector('.ec-button-submit-success');
        me.baidu.on(successBtn, 'click', function() {
            me.fwc.sendLog('进入官网');
            me.fwc.hide();
        });

    },
    /*计算字符数（1个汉字=2个字符）*/
    truncation: function(str) {
        var hotwordsCnt;
        for(var j = 0,c = 0;j<str.length;j++){
            c++;
            if(str.charCodeAt(j)>127){
                c++;
            }           
        }
        hotwordsCnt = c;
        return hotwordsCnt; 
    },
    checkName: function(name, nameErrTip) {
        /**
         * 姓氏列表
         */
        var familyName = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "何", "郭", "马", "罗", "梁", "宋", "郑", "谢", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏", "卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "钟", "汪", "田", "任", "姜", "范", "方", "石", "姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯", "邵", "孟", "龙", "万", "段", "章", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文", "庞", "樊", "兰", "殷", "施", "陶", "洪", "翟", "安", "颜", "倪", "严", "牛", "温", "芦", "季", "俞", "章", "鲁", "葛", "伍", "韦", "申", "尤", "毕", "聂", "丛", "焦", "向", "柳", "邢", "路", "岳", "齐", "沿", "梅", "莫", "庄", "辛", "管", "祝", "左", "涂", "谷", "祁", "时", "舒", "耿", "牟", "卜", "路", "詹", "关", "苗", "凌", "费", "纪", "靳", "盛", "童", "欧", "甄", "项", "曲", "成", "游", "阳", "裴", "席", "卫", "查", "屈", "鲍", "位", "覃", "霍", "翁", "隋", "甘", "景", "薄", "单", "包", "司", "柏", "宁", "柯", "阮", "桂", "闵", "解", "柴", "华", "车", "冉", "房", "边", "辜", "吉", "饶", "刁", "瞿", "戚", "丘", "古", "米", "池", "滕", "晋", "苑", "邬", "臧", "畅", "宫", "来", "嵺", "苟", "全", "褚", "廉", "简", "娄", "盖", "符", "奚", "木", "穆", "党", "燕", "郎", "邸", "冀", "谈", "姬", "屠", "连", "郜", "晏", "栾", "郁", "商", "蒙", "喻", "揭", "窦", "宇", "敖", "糜", "鄢", "冷", "卓", "花", "仇", "艾", "蓝", "都", "巩", "稽", "井", "练", "仲", "乐", "虞", "卞", "封", "竺", "冼", "原", "衣", "楚", "佟", "栗", "匡", "宗", "应", "台", "巫", "鞠", "僧", "桑", "荆", "谌", "扬", "明", "沙", "薄", "伏", "岑", "习", "胥", "保", "蔺", "濮", "狄", "闫", "芮", "皮", "司徒", "上官", "闾丘", "司马", "诸葛", "黑", "惠"];
        var pass = true;
        if('您的姓名' == name || this.truncation(name) < 4 || this.truncation(name) > 8) {
            pass = false;
        }
        if(pass) {
            for (var i = 0, l = name.length; i < l; i++) {
                if (!/[\u4E00-\u9FA5]/.test(name.charAt(i))) {
                    pass = false;
                }
            }
        }
        if(pass) {
            var isMatch = false;
            for (var i = 0, l = familyName.length; i < l; i++) {
                if(name.substr(0, familyName[i].length) == familyName[i]){
                    isMatch = true;
                    break;
                }
            }
            if(!isMatch) {
                pass = false;
            }
        }
        if(!pass) {
            this.showErrTip(nameErrTip);
            throw new Error('');
        }
    },
    checkEmail: function(email, emailErrTip) {
        var pass = true;
        if (email == '' || email == '您的邮箱') {
            pass = false;
        }
        if(pass) {
            var mailReg = /^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
            if (!mailReg.test(email)) {
                pass = false;
            }
        }
        if(!pass) {
            this.showErrTip(emailErrTip);
            throw new Error('');
        }
    },
    checkProvince: function(province, provinceErrTip) {
        if('null' == province) {
            this.showErrTip(provinceErrTip);
            throw new Error('');
        }
    },
    checkAddress: function(address, addressErrTip) {
        var pass = true;
        if (address == '' || address == '详细地址') {
            pass = false;
        }
        if(pass) {
            var addressReg = /^(\S)+$/i;
            if (!addressReg.test(address)) {
                pass = false;
            }
        }
        if(!pass) {
            this.showErrTip(addressErrTip);
            throw new Error('');
        }
    },
    checkPostalCode: function(postalCode, postalCodeErrTip) {
        var pass = true;
        if (postalCode == '' || postalCode == '邮政编码') {
            pass = false;
        }
        if(pass) {
            var postalCodereg = /^[0-9]{6,6}$/i;
            if (!postalCodereg.test(postalCode)) {
                pass = false;
            }
        }
        if(!pass) {
            this.showErrTip(postalCodeErrTip);
            throw new Error('');
        }
    },
    initSelect: function(selEle, data) {
        selEle.innerHTML = "";
        for (var i = 0;i<data.length;i++) {
            var option = this.baidu.dom.create("option", {
                "value": data[i].value,
                "title" : data[i].text
            });
            option.innerHTML = data[i].text;
            selEle.appendChild(option);
        }
    },
    initSelectBehavior: function(selDom, valDom, isProvince, citySel, cityValSpan) {
        var me = this;
        me.baidu.event.on(selDom, 'change', function() {
            me.showSelectValue(selDom, valDom);
            if(isProvince) {
                me.provinceChange(selDom, citySel, cityValSpan);
            }
        });
    },
    showSelectValue: function(selDom, valDom) {
        valDom.innerHTML = selDom.options[selDom.selectedIndex]['title'];
        if('null' == selDom.value) {
            this.baidu.dom.addClass(selDom.parentNode, 'ec-select-default');
        } else {
            this.baidu.dom.removeClass(selDom.parentNode, 'ec-select-default');
        }
    },
    initCityDependency: function(provinceSel, citySel) {
        var me = this;
        me.proandcityMap = {};
        //生成Map
        function genMap(ds, prefix, map) {
            var children = ds.children;
            if(!map){
                map = {};
                ds = me.baidu.object.clone(ds);
            }
            var curKey = '';
            if(typeof prefix == 'undefined') {
                curKey = ds.value;
            } else {
                curKey = prefix + '\uDEAD' + ds.value;
            }
            map[curKey] = ds;
            if(children && children.length > 0) {
                for(var i = 0; i < children.length; i++) {
                    arguments.callee(children[i], curKey, map);
                }
            }
            return map;
        }
        me.proandcityMap = genMap(me.cityDependency);
        me.initSelect(provinceSel, me.cityDependency.children);
    },
    provinceChange: function(provinceSel, citySel, cityValSpan) {
        var me = this;
        var mapKey = ['proandcity', provinceSel.value].join('\uDEAD');

        var provinceErrTip = me.fwcPanel.getRoot().querySelector('.ec-error-province');
        me.baidu.dom.setStyle(provinceErrTip, 'display', '');

        me.initSelect(citySel, me.proandcityMap[mapKey].children || []);

        me.showSelectValue(citySel, cityValSpan);
    },
    sendSubmit: function(params, errCb, cb) {
        var me = this;
        var sendCodeUrl = me.serviceUrl + 'submit?' + params;
        me.baidu.sio.callByServer(sendCodeUrl, function(sResult) {
            if ('false' == sResult['success']) {
                errCb(sResult['message']['field']);
            } else {
                cb();
            }
        });
    },
    getCont: function(name) {
        var cont;
        switch(name) {
            case 'clause':
                cont = [
                    '<div class="ec-item-title">条款与条件 – 百度BRM</div>',
                    '<div class="ec-item-wrap">',
                        '<div class="ec-item">Burberry Brit Rhythm免费香氛小样持续派发中</div>',
                        '<div class="ec-item">恭喜   北京朝阳区    杨O女士 (手机尾号0831)  赢得Burberry全程赞助亲临上海Brit Rhythm 音乐会</div>',
                        '<div class="ec-item">Burberry将在48小时内与获奖者联系，核对个人信息，并通知领奖方式。</div>',
                        '<div class="ec-item">1.  本次抽奖活动报名将于北京时间2014年3月1日0时01分（“起始日”）开始至北京时间2014年3月14日23时59分（“截止日”）结束。截止日之后提交的报名无效。</div>',
                        '<div class="ec-item">2.  参与者需年满18周岁并居住在中国。下列人士不得参与抽奖：Burberry的员工、承包人、代理人或代表（合称“除外人士”）、除外人士的直系家庭成员（父母、子女、兄弟姐妹和配偶）、以及与除外人士共同居住的任何人。</div>',
                        '<div class="ec-item">3.  通过参与抽奖活动，参与者同意接受本条款与条件（下称“条款与条件”）及Burberry的决定并受其约束。本条款与条件以及Burberry的决定对有关推广活动的全部事项均具有最终效力。除潜在获奖者外恕不接受任何书面异议。</div>',
                        '<div class="ec-item">4.  本次抽奖活动为免费参与，在参与者满足本条款与条件中所规定的要求并且在完成在线样品申请时提供其全名、出生日期、地址（包括城市、省份和邮编）、联系电话和有效电子邮箱的前提下，任何在截止日之前通过百度www.baidu.com上搜索Burberry，并在其品牌专区填写资料索取免费Burberry Brit Rhythm香水贴样品（包含1包3片临时香水贴）（“样品”）的中国人士均可参加。</div>',
                        '<div class="ec-item">5.  获奖者须向Burberry出示Burberry可接受的身份证明（例如驾照、政府部门签发的身份证、或有效护照和地址验证文件）以证明其为符合资格的获奖者。如果获奖者无法证明其符合资格或如果Burberry根据合理的判断认为获奖者不符合资格，则Burberry保留取消该获奖者资格并将奖品颁发给其他参与者的权利。</div>',
                        '<div class="ec-item">6.  每人仅允许报名参与一次抽奖。提交报名申请超过一次的参与者将被取消资格。</div>',
                        '<div class="ec-item">7.  本次抽奖总计设1份奖品。奖品将颁发给其报名号码被Burberry于北京时间3月15日9时随机选中的适格参与者。</div>',
                        '<div class="ec-item">奖品包含两（2）张参加2014年3月21日在中国上海嘉里中心举行的Burberry活动（下称“活动”）的门票。如果获奖者无法在该日期参加活动，获奖者将无权获得退款或其它替代奖品。</div>',
                        '<div class="ec-item">8.  奖品将同时包含：</div>',
                        '<div class="ec-item">•   两（2）张从最靠近获奖者居住城市的拥有航线的主要商业机场至上海的往返经济舱机票（获奖者和受邀人），可以直飞或由相同航空公司转机（由Burberry决定）。往返均在同一机场。</div>',
                        '<div class="ec-item">•   Burberry选定的5星级酒店住宿一（1）晚，获奖者和受邀人共用一间。</div>',
                        '<div class="ec-item">•   上海机场和酒店间往返地面交通。</div>',
                        '<div class="ec-item">•   酒店和活动地点间往返地面交通。</div>',
                        '<div class="ec-item">9.  奖品不包括除上述第8条规定以外的国内交通、旅行保险、零用花销或偶然支出（例如行李费用、餐费、电话费、迷你酒吧物品消费、洗衣费等）。</div>',
                        '<div class="ec-item">10. 每份奖品的大致总零售价值不超过人民币15,000元。奖品不得兑换现金或其他点券。获奖者不得代替、转让或转移奖品，或用奖品兑换现金。但是，如发生超出Burberry合理控制的情形而导致上述奖品无法获得，Burberry保留提供等价或更高价值的替代奖品的权利。奖品“按现状”给予，Burberry对此不作任何明示或默示的保证或担保。</div>',
                        '<div class="ec-item">11. 获奖者将通过电子邮件、短信或电话的方式收到获奖通知。Burberry将在随后联系获奖者为获奖者申领奖品做出必要的安排，包括预定航班和酒店并安排提供相关的旅行文件。</div>',
                        '<div class="ec-item">12. 获奖者必须作为航班乘客之一。获奖者和受邀人必须在同一航班往返。参加活动的获奖者和受邀人须年满18周岁，获奖者和受邀人在活动入场时需各自出示包含照片的有效身份证明文件。如果获奖者选择不带受邀人，则第二张机票将作废。</div>',
                        '<div class="ec-item">13. 奖品不可转让、不可转售、不可退款且不可更换。奖品入场券不可用于任何之前的预定购买或支付其它费用。航班的详细信息、日期和时间一经预订即不可更改。</div>',
                        '<div class="ec-item">14. 获奖者及其受邀人应提供有效护照和签证，且必要时应取得适当的疫苗接种和办理旅行保险。如获奖者无法满足上述要求，获奖者将无权获得退款或其它替代奖品，并且Burberry不负任何形式的责任及义务。</div>',
                        '<div class="ec-item">15. 如果Burberry在经过合理努力后仍未能在北京时间2014年3月17日8时59分前联系上获奖者，则Burberry将针对该等未申领的、重新分配的或剩余的奖品进行“第二次抽奖”并在随后于北京时间2014年3月17日9时前通过电子邮件、短信或电话的方式与随机选中的替代获奖者联系。第二次抽奖将面向在截止日前未中奖的全体符合资格的参与者。获奖者将有2天时间对通知予以回复以证明其资格并接受奖品。</div>',
                        '<div class="ec-item">如果第二次抽奖中的任何奖品未被申领或者Burberry经过合理努力后仍未能联系上获奖者，则Burberry可按照其认为适当的方式自行处置奖品（包括但不限于视作奖品归零且无效并将该等奖品从推广活动中移除）而无需向获奖者或其他参与者承担任何责任。</div>',
                        '<div class="ec-item">16. 通过参与本次抽奖活动，每位参与者同意由Burberry、Burberry的关联公司以及Burberry选定的服务供应商为实施和管理本次抽奖活动的目的（包括下述第17条的规定）以及按照Burberry隐私权政策（可以通过http://cn.burberry.com/legal-cookies/privacy-policy/访问获取）中的其他规定收集、使用并披露他/她的个人信息。参与者可以在任何时间通过下述第26条中列出的邮件地址联系顾客服务团队获知由Burberry保存的其个人信息或要求对由Burberry保存的其个人信息进行修改或删除。</div>',
                        '<div class="ec-item">17. 为宣布获奖者的目的，Burberry可以使用获奖者的姓名、居住地和肖像而无需支付任何额外的费用或得到许可。此外，获奖者同意，并确认任何第三方受邀人同意，由Burberry或任何Burberry的关联公司或经Burberry授权的被许可人在活动中对其进行照相、摄影和/或录音以便利用媒介（网络、社交媒体、平面媒体）在全世界范围内就2014年3月21日开始的为期3年的Burberry Brit Rhythm香水推广活动和项目进行推广、公关、商业和广告之目的而（包括但不限于活动后期宣传）进行使用、广播和/或出版。</div>',
                        '<div class="ec-item">18. 通过参与本次抽奖活动，获奖者同意：（1）遵守本条款与条件的规定和Burberry的决定，该等规定和决定是最终的，且在所有方面均具有约束力；和（2）免除Burberry、Burberry的子公司和关联公司、前述主体的加盟商和隶属机构、所有奖品供应商、前述公司的所有代理人和代表（包括但不限于其广告和推广代理人）、以及前述任一主体的管理人员、董事和员工（合称“被免责方”）就与本次抽奖活动或颁发、接受、占有和/或使用或不当使用任何奖品相关而产生的任一及所有的主张、责任、损失和损害并使其免受损害，且进一步确认任何上述被免责方均未做出过或负有义务或有责任担保、陈述或保证某一特定用途。</div>',
                        '<div class="ec-item">19. 如果Burberry发现参与者在抽奖活动期间或结束后存在诋毁Burberry的情形，则Burberry可取消参与者资格。参与者应了解Burberry保留对在抽奖活动期间或结束后诋毁和诽谤Burberry的参与者采取法律措施的权利。</div>',
                        '<div class="ec-item">20. Burberry不对抽奖活动材料以及本条款与条件中的打印错误负责。如果由于制作或打印错误或其他不可预见的错误导致获奖者的数量超过奖品的数量，Burberry保留在所有符合资格的获奖者中进行随机抽取并颁发剩余奖品的权利。Burberry颁发的奖品数量不会超出本条款与条件中所列的数量。</div>',
                        '<div class="ec-item">21. 获奖者的姓名、居住地和居住国信息可以通过下述第26条中列出的电子邮件地址联系顾客服务团队获得。</div>',
                        '<div class="ec-item">22. Burberry不对超出其合理控制的事项承担责任且无需就该等事项所导致的任何迟延或取消而给予退款或更换奖品。Burberry不就其收到的任何不完整或不准确的报名登记或系统错误或其他问题而可能导致的中断、丢失、迟延或未收到报名登记或未收到获奖通知承担责任。</div>',
                        '<div class="ec-item">23. 获奖者对本次抽奖活动所引起的任何税收义务负责。</div>',
                        '<div class="ec-item">24. Burberry不对作为奖品的第三方产品和服务承担责任（包括但不限于航班和住宿）且该等奖品可能适用第三方供应商的标准条款和条件。</div>',
                        '<div class="ec-item">25. 应法律要求，Burberry可在任何时间暂停或修改本次抽奖活动的条件而无需进行通知。如果本次抽奖活动无法按计划进行，包括受到任何超出Burberry合理控制以外的任何电脑病毒或漏洞、干涉、无权干预、不可抗力或技术故障的影响，并且该等影响将损坏或损害本次抽奖活动的实施、安全、公平或适当进行，则Burberry保留依其自行判断取消、暂停、终止或修改本次抽奖活动的权利。</div>',
                        '<div class="ec-item">26. 如您就本次抽奖活动有任何本条款与条件未能解答的问题且/或您想要投诉，请通过customerservice@burberry.com 与我们联系。</div>',
                        '<div class="ec-item">27. 本次抽奖活动将由位于香港铜锣湾希慎道33号利园大厦44层的Burberry Asia Limited举办，并应受中国法律管辖并据其解释。</div>',
                    '</div>',
                    '<div class="ec-button-wrap"><a href="javascript:void(0)" class="ec-button ec-button-clause">我已阅读并认可，下一步</a></div>'
                ].join('');
                break;
            case 'identify':
                cont = [
                    '<div class="ec-row">',
                        '<input type="text" class="ec-input ec-input-default ec-mobile" value="手机号码"/>',
                        '<div class="ec-get-identify-wrap"><a href="javascript:void(0)" class="ec-light-button ec-get-identify">获取验证码</a></div>',
                        '<div class="ec-input-error ec-error-mobile">该手机号码已成功领取过</div>',
                    '</div>',
                    '<div class="ec-row">',
                        '<input  type="text" class="ec-input ec-input-default ec-identify" value="输入手机验证码"/>',
                        '<div class="ec-input-error ec-error-identify">验证码错误</div>',
                    '</div>',
                    '<div class="ec-button-wrap"><a href="javascript:void(0)" class="ec-button ec-button-send-code">立即领取</a></div>'
                ].join('');
                break;
            case 'form':
                cont = [
                    '<div class="ec-row-title">',
                        '收货人信息',
                    '</div>',
                    '<div class="ec-row">',
                        '<input type="text" class="ec-input ec-input-default ec-name" value="您的姓名"/>',
                        '<a class="ec-select-wrap ec-input ec-select-gender-wrap" href="javascript:void(0)">',
                            '<select class="ec-select-gender">',
                                '<option value="男" title="男">男</option>',
                                '<option value="女" title="女">女</option>',
                            '</select>',
                            '<span class="ec-select-show-value ec-select-gender-value">男</span>',
                        '</a>',
                        '<div class="ec-input-error ec-error-name">请填写正确的姓名</div>',
                    '</div>',
                    '<div class="ec-row">',
                        '<input  type="text" class="ec-input ec-input-default ec-email" value="您的邮箱"/>',
                        '<div class="ec-input-error ec-error-email">请填写有效的邮箱</div>',
                    '</div>',
                    '<div class="ec-row-title ec-row-title2">',
                        '收货地址',
                    '</div>',
                    '<div class="ec-row">',
                        '<a class="ec-select-wrap ec-select-default ec-input ec-select-province-wrap" href="javascript:void(0)">',
                            '<select class="ec-select-province">',
                                '<option>省份</option>',
                            '</select>',
                            '<span class="ec-select-show-value ec-select-province-value">省份</span>',
                        '</a>',
                        '<a class="ec-select-wrap ec-select-default ec-input ec-select-city-wrap" href="javascript:void(0)">',
                            '<select class="ec-select-city">',
                                '<option>城市</option>',
                            '</select>',
                            '<span class="ec-select-show-value ec-select-city-value">城市</span>',
                        '</a>',
                        '<div class="ec-input-error ec-error-province">请选择省份</div>',
                    '</div>',
                    '<div class="ec-row">',
                        '<input  type="text" class="ec-input ec-input-default ec-address" value="详细地址"/>',
                        '<div class="ec-input-error ec-error-address">请填写正确地址</div>',
                    '</div>',
                    '<div class="ec-row">',
                        '<input  type="text" class="ec-input ec-input-default ec-postal-code" value="邮政编码"/>',
                        '<div class="ec-input-error ec-error-postal-code">请填写有效邮编</div>',
                    '</div>',
                    '<div class="ec-button-wrap"><a href="javascript:void(0)" class="ec-button ec-button-submit">立即领取</a><div class="ec-input-error ec-error-submit"></div></div>'
                ].join('');
                break;
            case 'submitSuccess':
                cont = [
                    '<div class="ec-button-submit-wrap">',
                    '<div class="ec-submit-success-title">感谢注册！我们竭力在十日内将Burberry Brit Rhythm小样寄送于您。</div>',
                    '<a target="_blank" href="' + this.officialSite + '" class="ec-button ec-button-submit-success">进入官网</a>',
                    '</div>'
                ].join('');
                break;
        }
        return cont;
    },
    //下拉框依赖关系对象
    cityDependency: {"text":"proandcity","value":"proandcity","children":[{"text":"省份","value":"null","children":[{"text":"城市","value":"null"}]},{"text":"北京市","value":"北京市","children":[{"text":"北京市","value":"北京市"}]},{"text":"上海市","value":"上海市","children":[{"text":"上海市","value":"上海市"}]},{"text":"广东省","value":"广东省","children":[{"text":"广州市","value":"广州市"},{"text":"深圳市","value":"深圳市"},{"text":"东莞市","value":"东莞市"},{"text":"珠海市","value":"珠海市"},{"text":"佛山市","value":"佛山市"},{"text":"中山市","value":"中山市"},{"text":"梅州市","value":"梅州市"},{"text":"韶关市","value":"韶关市"},{"text":"江门市","value":"江门市"},{"text":"汕头市","value":"汕头市"},{"text":"惠州市","value":"惠州市"},{"text":"肇庆市","value":"肇庆市"},{"text":"揭阳市","value":"揭阳市"},{"text":"潮州市","value":"潮州市"},{"text":"清远市","value":"清远市"},{"text":"茂名市","value":"茂名市"},{"text":"湛江市","value":"湛江市"},{"text":"阳江市","value":"阳江市"},{"text":"云浮市","value":"云浮市"},{"text":"河源市","value":"河源市"},{"text":"汕尾市","value":"汕尾市"}]},{"text":"江苏省","value":"江苏省","children":[{"text":"南京市","value":"南京市"},{"text":"苏州市","value":"苏州市"},{"text":"无锡市","value":"无锡市"},{"text":"常州市","value":"常州市"},{"text":"南通市","value":"南通市"},{"text":"泰州市","value":"泰州市"},{"text":"扬州市","value":"扬州市"},{"text":"镇江市","value":"镇江市"},{"text":"徐州市","value":"徐州市"},{"text":"淮安市","value":"淮安市"},{"text":"盐城市","value":"盐城市"},{"text":"张家港市","value":"张家港市"},{"text":"昆山市","value":"昆山市"},{"text":"常熟市","value":"常熟市"},{"text":"太仓市","value":"太仓市"},{"text":"吴江市","value":"吴江市"},{"text":"江阴市","value":"江阴市"},{"text":"宜兴市","value":"宜兴市"},{"text":"宿迁市","value":"宿迁市"},{"text":"连云港市","value":"连云港市"}]},{"text":"浙江省","value":"浙江省","children":[{"text":"杭州市","value":"杭州市"},{"text":"宁波市","value":"宁波市"},{"text":"温州市","value":"温州市"},{"text":"金华市","value":"金华市"},{"text":"奉化市","value":"奉化市"},{"text":"余姚市","value":"余姚市"},{"text":"慈溪市","value":"慈溪市"},{"text":"绍兴市","value":"绍兴市"},{"text":"宁海县","value":"宁海县"},{"text":"象山县","value":"象山县"},{"text":"嘉兴市","value":"嘉兴市"},{"text":"台州市","value":"台州市"},{"text":"丽水市","value":"丽水市"},{"text":"衢州市","value":"衢州市"},{"text":"舟山市","value":"舟山市"},{"text":"湖州市","value":"湖州市"}]},{"text":"山东省","value":"山东省","children":[{"text":"济南市","value":"济南市"},{"text":"青岛市","value":"青岛市"},{"text":"烟台市","value":"烟台市"},{"text":"威海市","value":"威海市"},{"text":"潍坊市","value":"潍坊市"},{"text":"淄博市","value":"淄博市"},{"text":"日照市","value":"日照市"},{"text":"东营市","value":"东营市"},{"text":"泰安市","value":"泰安市"},{"text":"莱芜市","value":"莱芜市"},{"text":"荷泽市","value":"荷泽市"},{"text":"枣庄市","value":"枣庄市"},{"text":"滨州市","value":"滨州市"},{"text":"德州市","value":"德州市"},{"text":"济宁市","value":"济宁市"},{"text":"章丘市","value":"章丘市"},{"text":"聊城市","value":"聊城市"},{"text":"临沂市","value":"临沂市"}]},{"text":"湖北省","value":"湖北省","children":[{"text":"武汉市","value":"武汉市"},{"text":"十堰市","value":"十堰市"},{"text":"黄石市","value":"黄石市"},{"text":"宜昌市","value":"宜昌市"},{"text":"黄冈市","value":"黄冈市"},{"text":"襄樊市","value":"襄樊市"},{"text":"荆州市","value":"荆州市"},{"text":"孝感市","value":"孝感市"},{"text":"随州市","value":"随州市"},{"text":"荆门市","value":"荆门市"},{"text":"咸宁市","value":"咸宁市"},{"text":"仙桃市","value":"仙桃市"},{"text":"鄂州市","value":"鄂州市"},{"text":"潜江市","value":"潜江市"},{"text":"恩施市","value":"恩施市"}]},{"text":"辽宁省","value":"辽宁省","children":[{"text":"沈阳市","value":"沈阳市"},{"text":"大连市","value":"大连市"},{"text":"鞍山市","value":"鞍山市"},{"text":"营口市","value":"营口市"},{"text":"盘锦市","value":"盘锦市"},{"text":"锦州市","value":"锦州市"},{"text":"铁岭市","value":"铁岭市"},{"text":"丹东市","value":"丹东市"},{"text":"辽阳市","value":"辽阳市"},{"text":"葫芦岛市","value":"葫芦岛市"},{"text":"抚顺市","value":"抚顺市"},{"text":"本溪市","value":"本溪市"},{"text":"朝阳市","value":"朝阳市"},{"text":"阜新市","value":"阜新市"}]},{"text":"四川省","value":"四川省","children":[{"text":"成都市","value":"成都市"},{"text":"攀枝花市","value":"攀枝花市"},{"text":"绵阳市","value":"绵阳市"},{"text":"乐山市","value":"乐山市"},{"text":"宜宾市","value":"宜宾市"},{"text":"德阳市","value":"德阳市"},{"text":"广安市","value":"广安市"},{"text":"自贡市","value":"自贡市"},{"text":"雅安市","value":"雅安市"},{"text":"达州市","value":"达州市"},{"text":"遂宁市","value":"遂宁市"},{"text":"西昌市","value":"西昌市"},{"text":"眉山市","value":"眉山市"},{"text":"南充市","value":"南充市"},{"text":"资阳市","value":"资阳市"},{"text":"内江市","value":"内江市"},{"text":"天津市","value":"天津市"},{"text":"天津市","value":"天津市"}]},{"text":"重庆市","value":"重庆市","children":[{"text":"重庆市","value":"重庆市"}]},{"text":"陕西省","value":"陕西省","children":[{"text":"西安市","value":"西安市"},{"text":"咸阳市","value":"咸阳市"},{"text":"宝鸡市","value":"宝鸡市"},{"text":"渭南市","value":"渭南市"},{"text":"汉中市","value":"汉中市"},{"text":"榆林市","value":"榆林市"},{"text":"延安市","value":"延安市"},{"text":"安康市","value":"安康市"},{"text":"铜川市","value":"铜川市"},{"text":"商洛市","value":"商洛市"}]},{"text":"河南省","value":"河南省","children":[{"text":"郑州市","value":"郑州市"},{"text":"洛阳市","value":"洛阳市"},{"text":"新乡市","value":"新乡市"},{"text":"商丘市","value":"商丘市"},{"text":"开封市","value":"开封市"},{"text":"安阳市","value":"安阳市"},{"text":"许昌市","value":"许昌市"},{"text":"焦作市","value":"焦作市"},{"text":"南阳市","value":"南阳市"},{"text":"平顶山市","value":"平顶山市"},{"text":"濮阳市","value":"濮阳市"},{"text":"周口市","value":"周口市"},{"text":"信阳市","value":"信阳市"},{"text":"漯河市","value":"漯河市"},{"text":"三门峡市","value":"三门峡市"},{"text":"驻马店市","value":"驻马店市"},{"text":"济源市","value":"济源市"},{"text":"鹤壁市","value":"鹤壁市"}]},{"text":"河北省","value":"河北省","children":[{"text":"石家庄市","value":"石家庄市"},{"text":"唐山市","value":"唐山市"},{"text":"保定市","value":"保定市"},{"text":"秦皇岛市","value":"秦皇岛市"},{"text":"廊坊市","value":"廊坊市"},{"text":"邯郸市","value":"邯郸市"},{"text":"沧州市","value":"沧州市"},{"text":"邢台市","value":"邢台市"},{"text":"衡水市","value":"衡水市"},{"text":"张家口市","value":"张家口市"},{"text":"承德市","value":"承德市"}]},{"text":"湖南省","value":"湖南省","children":[{"text":"长沙市","value":"长沙市"},{"text":"湘潭市","value":"湘潭市"},{"text":"岳阳市","value":"岳阳市"},{"text":"株洲市","value":"株洲市"},{"text":"郴州市","value":"郴州市"},{"text":"衡阳市","value":"衡阳市"},{"text":"邵阳市","value":"邵阳市"},{"text":"常德市","value":"常德市"},{"text":"娄底市","value":"娄底市"},{"text":"益阳市","value":"益阳市"},{"text":"怀化市","value":"怀化市"},{"text":"永州市","value":"永州市"},{"text":"吉首市","value":"吉首市"},{"text":"张家界市","value":"张家界市"}]},{"text":"云南省","value":"云南省","children":[{"text":"昆明市","value":"昆明市"},{"text":"大理市","value":"大理市"},{"text":"红河县","value":"红河县"},{"text":"玉溪市","value":"玉溪市"},{"text":"曲靖市","value":"曲靖市"},{"text":"普洱市","value":"普洱市"},{"text":"德宏傣族景颇族自治州","value":"德宏傣族景颇族自治州"},{"text":"保山市","value":"保山市"},{"text":"临沧市","value":"临沧市"},{"text":"丽江市","value":"丽江市"},{"text":"楚雄市","value":"楚雄市"},{"text":"文山壮族苗族自治州","value":"文山壮族苗族自治州"},{"text":"昭通市","value":"昭通市"},{"text":"西双版纳傣族自治州","value":"西双版纳傣族自治州"}]},{"text":"吉林省","value":"吉林省","children":[{"text":"长春市","value":"长春市"},{"text":"通化市","value":"通化市"},{"text":"白城市","value":"白城市"},{"text":"白山市","value":"白山市"},{"text":"吉林市","value":"吉林市"},{"text":"松原市","value":"松原市"},{"text":"四平市","value":"四平市"},{"text":"延吉市 ","value":"延吉市"},{"text":"敦化市","value":"敦化市"},{"text":"桦甸市","value":"桦甸市"},{"text":"辽源市","value":"辽源市"}]},{"text":"山西省","value":"山西省","children":[{"text":"太原市","value":"太原市"},{"text":"长治市","value":"长治市"},{"text":"大同市","value":"大同市"},{"text":"晋城市","value":"晋城市"},{"text":"晋中市","value":"晋中市"},{"text":"临汾市","value":"临汾市"},{"text":"阳泉市","value":"阳泉市"},{"text":"朔州市","value":"朔州市"},{"text":"吕梁市","value":"吕梁市"},{"text":"运城市","value":"运城市"},{"text":"忻州市","value":"忻州市"}]},{"text":"安徽省","value":"安徽省","children":[{"text":"合肥市","value":"合肥市"},{"text":"亳州市","value":"亳州市"},{"text":"芜湖市","value":"芜湖市"},{"text":"宣城市","value":"宣城市"},{"text":"蚌埠市","value":"蚌埠市"},{"text":"宿州市","value":"宿州市"},{"text":"巢湖市","value":"巢湖市"},{"text":"马鞍山市","value":"马鞍山市"},{"text":"阜阳市","value":"阜阳市"},{"text":"安庆市","value":"安庆市"},{"text":"滁州市","value":"滁州市"},{"text":"六安市","value":"六安市"},{"text":"淮北市","value":"淮北市"},{"text":"黄山市","value":"黄山市"},{"text":"池州市","value":"池州市"},{"text":"淮南市","value":"淮南市"},{"text":"铜陵市","value":"铜陵市"}]},{"text":"贵州省","value":"贵州省","children":[{"text":"贵阳市","value":"贵阳市"},{"text":"安顺市","value":"安顺市"},{"text":"六盘水市","value":"六盘水市"},{"text":"遵义市","value":"遵义市"},{"text":"毕节市","value":"毕节市"},{"text":"都匀市","value":"都匀市"},{"text":"铜仁市","value":"铜仁市"}]},{"text":"江西省","value":"江西省","children":[{"text":"南昌市","value":"南昌市"},{"text":"上饶市","value":"上饶市"},{"text":"吉安市","value":"吉安市"},{"text":"赣州市","value":"赣州市"},{"text":"宜春市","value":"宜春市"},{"text":"九江市","value":"九江市"},{"text":"抚州市","value":"抚州市"},{"text":"萍乡市","value":"萍乡市"},{"text":"新余市","value":"新余市"},{"text":"景德镇市","value":"景德镇市"},{"text":"鹰潭市","value":"鹰潭市"}]},{"text":"青海省","value":"青海省","children":[{"text":"西宁市","value":"西宁市"},{"text":"海东地区","value":"海东地区"},{"text":"海西蒙古族藏族自治州","value":"海西蒙古族藏族自治州"}]},{"text":"黑龙江省","value":"黑龙江省","children":[{"text":"哈尔滨市","value":"哈尔滨市"},{"text":"大庆市","value":"大庆市"},{"text":"齐齐哈尔市","value":"齐齐哈尔市"},{"text":"鸡西市","value":"鸡西市"},{"text":"佳木斯市","value":"佳木斯市"},{"text":"鹤岗市","value":"鹤岗市"},{"text":"双鸭山市","value":"双鸭山市"},{"text":"绥化市","value":"绥化市"},{"text":"伊春市","value":"伊春市"},{"text":"黑河市","value":"黑河市"}]},{"text":"广西","value":"广西","children":[{"text":"南宁市","value":"南宁市"},{"text":"柳州市","value":"柳州市"},{"text":"玉林市","value":"玉林市"},{"text":"桂林市","value":"桂林市"},{"text":"百色市","value":"百色市"},{"text":"北海市","value":"北海市"},{"text":"贵港市","value":"贵港市"},{"text":"河池市","value":"河池市"},{"text":"梧州市","value":"梧州市"},{"text":"贺州市","value":"贺州市"},{"text":"防城港市","value":"防城港市"},{"text":"钦州市","value":"钦州市"}]},{"text":"内蒙古","value":"内蒙古","children":[{"text":"呼和浩特市","value":"呼和浩特市"},{"text":"包头市","value":"包头市"},{"text":"鄂尔多斯市","value":"鄂尔多斯市"},{"text":"赤峰市","value":"赤峰市"},{"text":"乌海市","value":"乌海市"},{"text":"巴彦淖尔市","value":"巴彦淖尔市"},{"text":"乌兰察布市","value":"乌兰察布市"},{"text":"呼伦贝尔市","value":"呼伦贝尔市"},{"text":"锡林郭勒盟","value":"锡林郭勒盟"},{"text":"兴安盟","value":"兴安盟"}]},{"text":"新疆","value":"新疆","children":[{"text":"乌鲁木齐市","value":"乌鲁木齐市"},{"text":"巴音郭楞蒙古自治州","value":"巴音郭楞蒙古自治州"},{"text":"昌吉市","value":"昌吉市"},{"text":"克拉玛依市","value":"克拉玛依市"},{"text":"阿克苏市","value":"阿克苏市"},{"text":"喀什市","value":"喀什市"},{"text":"奎屯市","value":"奎屯市"},{"text":"石河子市","value":"石河子市"},{"text":"伊犁哈萨克自治州","value":"伊犁哈萨克自治州"},{"text":"哈密市","value":"哈密市"},{"text":"塔城市","value":"塔城市"},{"text":"阿勒泰市","value":"阿勒泰市"},{"text":"吐鲁番市","value":"吐鲁番市"},{"text":"博尔塔拉蒙古自治州","value":"博尔塔拉蒙古自治州"}]},{"text":"宁夏","value":"宁夏","children":[{"text":"银川市","value":"银川市"},{"text":"吴忠市","value":"吴忠市"},{"text":"石嘴山市","value":"石嘴山市"},{"text":"固原市","value":"固原市"},{"text":"中卫市","value":"中卫市"}]},{"text":"福建省","value":"福建省","children":[{"text":"福州市","value":"福州市"},{"text":"泉州市","value":"泉州市"},{"text":"厦门市","value":"厦门市"},{"text":"龙岩市","value":"龙岩市"},{"text":"莆田市","value":"莆田市"},{"text":"宁德市","value":"宁德市"},{"text":"三明市","value":"三明市"},{"text":"漳州市","value":"漳州市"},{"text":"福清市","value":"福清市"},{"text":"南平市","value":"南平市"},{"text":"晋江市","value":"晋江市"}]},{"text":"海南省","value":"海南省","children":[{"text":"海口市","value":"海口市"},{"text":"三亚市","value":"三亚市"}]},{"text":"甘肃省","value":"甘肃省","children":[{"text":"兰州市  ","value":"兰州市"},{"text":"酒泉市  ","value":"酒泉市"},{"text":"白银市  ","value":"白银市"},{"text":"平凉市  ","value":"平凉市"},{"text":"天水市  ","value":"天水市"},{"text":"庆阳市  ","value":"庆阳市"},{"text":"武威市  ","value":"武威市"},{"text":"张掖市  ","value":"张掖市"},{"text":"嘉峪关市  ","value":"嘉峪关市"},{"text":"金昌市  ","value":"金昌市"},{"text":"陇南市","value":"陇南市"},{"text":"定西市","value":"定西市"}]}]}
};
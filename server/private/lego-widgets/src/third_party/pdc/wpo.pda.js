var WPO_Storage = (function() {
    var C = 'wpo_pms';

    function G(H) {
        return H.replace(/[_\s]/g, function(I) {
            return I == '_' ? '__' : '_s';
        });
    }
    function D() {
        return document.getElementById(C + '-storage');
    }
    function F(H) {
        return {}.toString.call(H) === '[object Date]' && H.toString() !== 'Invalid Date' && !isNaN(H);
    }
    function B() {
        var H;
        if (window.localStorage) {
            H = E();
        } else {
            if (window.ActiveXObject) {
                H = A();
            }
        }
        return H;
    }
    function A() {
        var H = document.createElement('div');
        H.style.display = 'none';
        H.id = C + '-storage';
        document.body.appendChild(H);
        D().addBehavior('#default#userData');
        return {
            set: function(J, L, I) {
                var K = D(),
                    O = G(J),
                    N = I && I.expires ? I.expires : new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
                F(N) && (N = N.getTime());
                K.expires = new Date(N).toUTCString();
                try {
                    K.setAttribute(O, L);
                    K.save(O);
                } catch (M) {
                    throw 'baidu.data.storage.set error! Maybe space overflow.';
                }
                K = null;
            },
            get: function(I) {
                var J = D(),
                    M = G(I),
                    L = null;
                try {
                    J.load(M);
                    L = J.getAttribute(M);
                    return L;
                } catch (K) {
                    return null;
                }
            },
            del: function(I) {
                var J = D(),
                    M = G(I),
                    L;
                try {
                    J.load(M);
                    L = J.getAttribute(M);
                    if (L) {
                        J.removeAttribute(M);
                        J.expires = new Date(315532799000).toUTCString();
                        J.save(M);
                        return true;
                    } else {
                        return false;
                    }
                } catch (K) {
                    return false;
                }
            }
        };
    }
    function E() {
        return {
            set: function(I, J, H) {
                var N = window.localStorage,
                    M = G(I),
                    L = H && H.expires ? H.expires : 0;
                F(L) && (L = L.getTime());
                try {
                    N.setItem(M, L + '|' + J);
                } catch (K) {
                    throw 'baidu.data.storage.set error! Maybe space overflow.';
                }
            },
            get: function(I) {
                var N = window.localStorage,
                    M = G(I),
                    L = null,
                    H, K;
                try {
                    L = N.getItem(M);
                } catch (J) {
                    return null;
                }
                if (L) {
                    H = L.indexOf('|');
                    K = parseInt(L.substring(0, H), 10);
                    if (new Date(K).getTime() > new Date().getTime() || K == 0) {
                        L = L.substring(H + 1, L.length);
                        return L;
                    } else {
                        L = null;
                        this.del(I);
                        return null;
                    }
                } else {
                    return null;
                }
            },
            del: function(H) {
                var L = window.localStorage,
                    K = G(H),
                    J = null;
                try {
                    J = L.getItem(K);
                } catch (I) {
                    return false;
                }
                if (J) {
                    J = J.substring(J.indexOf('|') + 1, J.length);
                    J && L.removeItem(K);
                    return true;
                } else {
                    return false;
                }
            }
        };
    }
    return {
        set: function(I, K, L, H) {
            var J = this;
            !J._storage && (J._storage = B());
            J._storage.set.apply(J._storage, arguments);
        },
        get: function(H) {
            var I = this;
            !I._storage && (I._storage = B());
            return I._storage.get.apply(I._storage, arguments);
        },
        remove: function(H, J) {
            var I = this;
            !I._storage && (I._storage = B());
            return I._storage.del.apply(I._storage, arguments);
        }
    };
})();
(function() {
    var A = function(F, C) {
            this._render_start = F.render_start;
            this._data = F;
            this._render_timing = {
                ht: 0,
                vt: 0,
                drt: 0,
                tti: 0,
                lt: 0,
                fvt: 0,
                crt: 0
            };
            this._conf = C || {
                log_path: 'http://static.tieba.baidu.com/tb/pms/img/st.gif',
                display: false
            };
            this._performance_timing = {};
            this._metrics = [];
            this._is_send = false;
            var E = F.timing;
            for (var D in E) {
                this._render_timing[D] = E[D];
            }
            var B = this;
            if (document.attachEvent) {
                window.attachEvent('onbeforeunload', function() {
                    B.send();
                });
            } else {
                window.addEventListener('beforeunload', function() {
                    B.send();
                }, false);
            }
            this._browser();
            this._resources();
            this._cache();
            this._measureNetworkTime();
            this._measureRenderTime();
            this.displayPerformanceInfo();
        };
    A.prototype._measureNetworkTime = function() {
        var C = {
            dns: 0,
            ct: 0,
            st: 0,
            tt: 0
        };
        var D = 0;
        if (window.performance && window.performance.timing) {
            var B = window.performance.timing;
            D = B.domainLookupStart;
            C.dns = B.domainLookupEnd;
            C.ct = B.connectEnd;
            C.st = B.responseStart;
            C.tt = B.responseEnd;
        }
        this._measureTime(D, C);
    };
    A.prototype._measureTime = function(E, C) {
        var D = 0;
        for (var B in C) {
            D = C[B] > 0 ? C[B] - E : 0;
            this._metrics.push(B + '=' + D);
        }
    };
    A.prototype._measureRenderTime = function() {
        if (window.performance && window.performance.timing) {
            var B = window.performance.timing;
            this._performance_timing = B;
            this._render_timing.lt = B.loadEventStart;
            if (B.loadEventEnd > 0) {
                this._render_timing.let = B.loadEventEnd;
            }
        }
        if (this._render_timing.fvt == 0) {
            this._render_timing.fvt = this._render_timing.crt = this._render_timing.let;
        }
        this._measureTime(this._render_start, this._render_timing);
    };
    A.prototype._resources = function() {
        var E = [],
            G = {},
            D = null;
        var F = 0;
        E = document.getElementsByTagName('img');
        for (var C = 0, B = E.length; C < B; C++) {
            D = E[C];
            if (D.src && !(D.src in G)) {
                F++;
                G[D.src] = true;
            }
        }
        this._metrics.push('in=' + F);
    };
    A.prototype._browser = function() {
        var B = this._uaMatch(navigator.userAgent);
        var C = B.browser;
        if (C == 'msie') {
            C += B.version;
        }
        var D = {
            'msie6.0': 16,
            'msie7.0': 17,
            'msie8.0': 18,
            'msie9.0': 19,
            chrome: 20,
            mozilla: 30,
            safari: 40,
            opera: 50
        };
        this._metrics.push('browser=' + (D[C] || 0));
    };
    A.prototype._uaMatch = function(E) {
        var D = /(chrome)\/(\d+\.\d)/,
            I = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/,
            H = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            F = /(msie) ([\w.]+)/,
            G = /(mozilla)(?:.*? rv:([\w.]+))?/,
            E = E.toLowerCase(),
            B = {};
        var C = D.exec(E) || H.exec(E) || F.exec(E) || E.indexOf('compatible') < 0 && G.exec(E) || [];
        if (I.test(E) && !/chrome/.test(E)) {
            C[1] = 'safari';
            C[2] = RegExp['$1'] || RegExp['$2'];
        }
        return {
            browser: C[1] || 'unknown',
            version: C[2] || '0'
        };
    };
    A.prototype._cache = function() {
        var C = {
            common: 0,
            special: 0
        };
        var H = 0;
        var E = this._data.common_resources,
            B = this._data.special_resources;
        if (E.length == 0 && B.length == 0) {
            H = 0;
        } else {
            var I = G();
            C.common = D(E, F(E, I));
            C.special = D(B, F(B, I));
            H = parseInt(C.common + '' + C.special, 2);
        }
        this._metrics.push('cache=' + H);

        function G() {
            var J = document.getElementsByTagName('script'),
                L = document.getElementsByTagName('link'),
                N = [],
                O = '',
                M = 0,
                K = 0;
            for (M = 0, K = L.length; M < K; M++) {
                if (L[M].getAttribute('rel') == 'stylesheet') {
                    O = L[M].getAttribute('href');
                    if (O != null && O != '') {
                        N.push(O);
                    }
                }
            }
            for (M = 0, K = J.length; M < K; M++) {
                O = J[M].getAttribute('src');
                if (O != null && O != '') {
                    N.push(O);
                }
            }
            return N;
        }
        function F(K, J) {
            var O = '',
                Q = '';
            var R = {};
            for (var N = 0, P = K.length; N < P; N++) {
                O = K[N];
                for (var L = 0, M = J.length; L < M; L++) {
                    Q = J[L];
                    if (Q.indexOf(O) > -1) {
                        R[O] = Q;
                    }
                }
            }
            return R;
        }
        function D(P, J) {
            var Q = P.length,
                O = 0,
                L = '',
                S = '',
                T = '',
                R = '';
            for (var N = 0, M = P.length; N < M; N++) {
                L = P[N];
                T = J[L];
                S = L.replace(/\//g, '_');
                if (typeof T == 'undefined') {
                    Q--;
                    WPO_Storage.remove('wpo_pms_' + S);
                } else {
                    R = WPO_Storage.get('wpo_pms_' + S);
                    if (R == null || T != R) {
                        WPO_Storage.set('wpo_pms_' + S, T);
                        O++;
                    }
                }
            }
            var K = 0;
            if (Q > 0 && O / Q < 0.49) {
                K = 1;
            }
            return K;
        }
    };
    A.prototype.send = function() {
        if (this._is_send == true) {
            return;
        }
        this._is_send == true;
        var D = this._data.env,
            E = this._metrics;
        for (var C in D) {
            E.push(C + '=' + D[C]);
        }
        E.push('_t=' + new Date() * 1);
        var B = document.createElement('img');
        B.src = this._conf.log_path + '?' + E.join('&');
        window['___pms_img_' + new Date() * 1] = B;
    };
    A.prototype.displayPerformanceInfo = function() {
        var D = this._conf.display || false;
        var C = [''];
        C.push('rst=' + this._data.render_start);
        for (var B in this._performance_timing) {
            C.push(B + '=' + this._performance_timing[B]);
        }
        if (D == true) {
            var E = document.createElement('div');
            E.innerHTML = '<p style="color:red;font:24px/28px Arial;padding-left:64px;">' + this._metrics.join('<br />') + C.join('<br />') + '</p>';
            document.body.insertBefore(E, document.body.childNodes[0]);
        }
    };
    window.WPO_PDA = new A(PDC.metadata());
})();

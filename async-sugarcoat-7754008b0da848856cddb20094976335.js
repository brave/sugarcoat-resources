{
    const $___mock_7235ea711e4437da = {};
    (exports => {
        'use strict';
        const xhrUnsent = 0;
        const xhrOpened = 1;
        const xhrHeadersReceived = 2;
        const xhrLoading = 3;
        const xhrDone = 4;
        const xhrDeferredHandleSymbol = Symbol('deferredHandle');
        const xhrOnLoadStartSymbol = Symbol('onloadstart');
        const xhrOnProgressSymbol = Symbol('onprogress');
        const xhrOnAbortSymbol = Symbol('onabort');
        const xhrOnErrorSymbol = Symbol('onerror');
        const xhrOnLoadSymbol = Symbol('onload');
        const xhrOnTimeoutSymbol = Symbol('ontimeout');
        const xhrOnLoadEndSymbol = Symbol('onloadend');
        const xhrOnReadyStateChangeSymbol = Symbol('onreadystatechange');
        const xhrReadyStateSymbol = Symbol('readyState');
        const xhrTimeoutSymbol = Symbol('timeout');
        const xhrWithCredentialsSymbol = Symbol('withCredentials');
        const xhrUploadSymbol = Symbol('upload');
        const xhrResponseTypeSymbol = Symbol('responseType');
        const defineEvent = (obj, symbol) => {
            const type = symbol.description.substring(2);
            Object.defineProperty(obj, symbol, {
                configurable: false,
                enumerable: false,
                value: null,
                writable: true
            });
            obj.addEventListener(type, function (event) {
                const handler = this[symbol];
                if (handler) {
                    handler.call(this, event);
                }
            });
        };
        const changeReadyState = (xhr, readyState) => {
            xhr[xhrReadyStateSymbol] = readyState;
            xhr.dispatchEvent(new Event('readystatechange'));
        };
        let isSealed = true;
        class XMLHttpRequestEventTarget extends EventTarget {
            constructor() {
                super();
                if (!(this instanceof XMLHttpRequest) && !(this instanceof XMLHttpRequestUpload)) {
                    throw new TypeError('Illegal constructor');
                }
                defineEvent(this, xhrOnLoadStartSymbol);
                defineEvent(this, xhrOnProgressSymbol);
                defineEvent(this, xhrOnAbortSymbol);
                defineEvent(this, xhrOnErrorSymbol);
                defineEvent(this, xhrOnLoadSymbol);
                defineEvent(this, xhrOnTimeoutSymbol);
                defineEvent(this, xhrOnLoadEndSymbol);
            }
            get onloadstart() {
                return this[xhrOnLoadStartSymbol];
            }
            set onloadstart(value) {
                this[xhrOnLoadStartSymbol] = value;
            }
            get onprogress() {
                return this[xhrOnProgressSymbol];
            }
            set onprogress(value) {
                this[xhrOnProgressSymbol] = value;
            }
            get onabort() {
                return this[xhrOnAbortSymbol];
            }
            set onabort(value) {
                this[xhrOnAbortSymbol] = value;
            }
            get onerror() {
                return this[xhrOnErrorSymbol];
            }
            set onerror(value) {
                this[xhrOnErrorSymbol] = value;
            }
            get ontimeout() {
                return this[xhrOnTimeoutSymbol];
            }
            set ontimeout(value) {
                this[xhrOnTimeoutSymbol] = value;
            }
            get onloadend() {
                return this[xhrOnLoadEndSymbol];
            }
            set onloadend(value) {
                this[xhrOnLoadEndSymbol] = value;
            }
        }
        exports.XMLHttpRequestEventTarget = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestEventTarget,
            writable: true
        };
        class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
            constructor() {
                if (isSealed) {
                    throw new TypeError('Illegal constructor');
                }
                super();
            }
        }
        exports.XMLHttpRequestUpload = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequestUpload,
            writable: true
        };
        class XMLHttpRequest extends XMLHttpRequestEventTarget {
            constructor() {
                super();
                isSealed = false;
                const xhrUpload = new XMLHttpRequestUpload();
                isSealed = true;
                Object.defineProperty(this, xhrDeferredHandleSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: null,
                    writable: true
                });
                defineEvent(this, xhrOnReadyStateChangeSymbol);
                Object.defineProperty(this, xhrReadyStateSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUnsent,
                    writable: true
                });
                Object.defineProperty(this, xhrTimeoutSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: 0,
                    writable: true
                });
                Object.defineProperty(this, xhrWithCredentialsSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: false,
                    writable: true
                });
                Object.defineProperty(this, xhrUploadSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: xhrUpload,
                    writable: false
                });
                Object.defineProperty(this, xhrResponseTypeSymbol, {
                    configurable: false,
                    enumerable: false,
                    value: '',
                    writable: true
                });
            }
            get onreadystatechange() {
                return this[xhrOnReadyStateChangeSymbol];
            }
            set onreadystatechange(value) {
                this[xhrOnReadyStateChangeSymbol] = value;
            }
            get readyState() {
                return this[xhrReadyStateSymbol];
            }
            open(method, url) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrDone: {
                        changeReadyState(this, xhrOpened);
                        break;
                    }
                }
            }
            setRequestHeader(name, value) {
            }
            setTrustToken(trustToken) {
            }
            get timeout() {
                return this[xhrTimeoutSymbol];
            }
            set timeout(value) {
                this[xhrTimeoutSymbol] = value;
            }
            get withCredentials() {
                return this[xhrWithCredentialsSymbol];
            }
            set withCredentials(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrUnsent:
                case xhrOpened: {
                        break;
                    }
                default: {
                        throw new DOMException('Failed to set the \'withCredentials\' property on \'XMLHttpRequest\': The value may only be set if the object\'s state is UNSENT or OPENED.');
                    }
                }
                this[xhrWithCredentialsSymbol] = !!value;
            }
            get upload() {
                return this[xhrUploadSymbol];
            }
            send() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] === null) {
                    this[xhrDeferredHandleSymbol] = setTimeout(() => {
                        this[xhrDeferredHandleSymbol] = null;
                        changeReadyState(this, xhrDone);
                        this.dispatchEvent(new ProgressEvent('error'));
                        this.dispatchEvent(new ProgressEvent('loadend'));
                    }, 0);
                } else {
                    throw new DOMException('Failed to execute \'send\' on \'XMLHttpRequest\': The object\'s state must be OPENED.');
                }
            }
            abort() {
                if (this[xhrReadyStateSymbol] === xhrOpened && this[xhrDeferredHandleSymbol] !== null) {
                    clearTimeout(this[xhrDeferredHandleSymbol]);
                    this[xhrDeferredHandleSymbol] = null;
                    changeReadyState(this, xhrUnsent);
                    this.dispatchEvent(new ProgressEvent('abort'));
                    this.dispatchEvent(new ProgressEvent('loadend'));
                }
            }
            get responseURL() {
                return '';
            }
            get status() {
                return 0;
            }
            get statusText() {
                return '';
            }
            getResponseHeader(name) {
                return null;
            }
            overrideMimeType(mime) {
            }
            get responseType() {
                return this[xhrResponseTypeSymbol];
            }
            set responseType(value) {
                switch (this[xhrReadyStateSymbol]) {
                case xhrDone: {
                        throw new DOMException('Failed to set the \'responseType\' property on \'XMLHttpRequest\': The response type cannot be set if the object\'s state is LOADING or DONE.');
                    }
                }
                switch (value) {
                case '':
                case 'arraybuffer':
                case 'blob':
                case 'document':
                case 'json':
                case 'text': {
                        this[xhrResponseTypeSymbol] = value;
                        break;
                    }
                }
            }
            get response() {
                const responseType = this[xhrResponseTypeSymbol];
                return responseType === '' || responseType === 'text' ? '' : null;
            }
            get responseText() {
                const responseType = this[xhrResponseTypeSymbol];
                if (responseType === '' || responseType === 'text') {
                    return '';
                } else {
                    throw new DOMException('Failed to read the \'responseText\' property from \'XMLHttpRequest\': The value is only accessible if the object\'s \'responseType\' is \'\' or \'text\' (was \'arraybuffer\').');
                }
            }
            get responseXML() {
                return null;
            }
        }
        Object.defineProperty(XMLHttpRequest, 'UNSENT', {
            configurable: false,
            enumerable: true,
            value: xhrUnsent
        });
        Object.defineProperty(XMLHttpRequest, 'OPENED', {
            configurable: false,
            enumerable: true,
            value: xhrOpened
        });
        Object.defineProperty(XMLHttpRequest, 'HEADERS_RECEIVED', {
            configurable: false,
            enumerable: true,
            value: xhrHeadersReceived
        });
        Object.defineProperty(XMLHttpRequest, 'LOADING', {
            configurable: false,
            enumerable: true,
            value: xhrLoading
        });
        Object.defineProperty(XMLHttpRequest, 'DONE', {
            configurable: false,
            enumerable: true,
            value: xhrDone
        });
        exports.XMLHttpRequest = {
            configurable: true,
            enumerable: true,
            value: XMLHttpRequest,
            writable: true
        };
    })($___mock_7235ea711e4437da);
    (function () {
        try {
            (function (A, w) {
                function va() {
                    u.k.a.sxaz('trackingReady', { callback: va });
                    qa = r.h;
                    r.h++;
                    r.i[qa] = !1;
                    var a = {};
                    u.ap.a(a);
                    u.f.ag(a);
                    u.ac.l();
                    u.l.e(u.j.f, 100);
                    u.am.b();
                    u.bb.a();
                    u.k.a.azsx('adInitialized', u.ay.a);
                    u.c.ax.c || (u.c.ax.c = !0, r.dcsx && (r.dcsx.ynds(window, 'unload', 'unload-' + u.c.ax.a, 'unloadFn' + u.c.ax.a), r.dcsx.ynds(window, 'beforeunload', 'unload-' + u.c.ax.a, 'beforeunloadFn' + u.c.ax.a)));
                    r.swde.azsx('unload-' + u.c.ax.a, Fa, { once: !0 });
                    u.az.c();
                    u.az.d();
                }
                var u = {};
                w.floor(w.random() * w.pow(10, 12));
                var W, ra, na, qa = 0, oa = {}, O = {}, F = {}, X = [], B = {}, ja = !1, sa = {
                        15: '',
                        12: '',
                        6: '',
                        7: ''
                    }, ta = function () {
                        u.d.a(null, 0) || u.d.b();
                        for (var a in O)
                            O.hasOwnProperty && O.hasOwnProperty(a) && O[a] && u.a.a(O[a]);
                        for (a = 0; a < X.length; a++)
                            u.a.b(X[a]);
                        for (var k in F)
                            F.hasOwnProperty && F.hasOwnProperty(k) && F[k] && (u.a.a(F[k].tid), F[k] = !1);
                        O = {};
                        X = [];
                        L = null;
                        u.b = null;
                        u.c.a = null;
                    };
                u.e = ta;
                (function (a) {
                    function k(b) {
                        return (b = a.a.c.toString.call(b)) && ('[object Array]' === b || '[object Array Iterator]' === b);
                    }
                    a.a = {};
                    a.a.c = {};
                    for (var d = [
                                [
                                    1,
                                    25
                                ],
                                [
                                    7,
                                    1
                                ],
                                [
                                    1,
                                    25
                                ],
                                [
                                    -74,
                                    1
                                ],
                                [
                                    1,
                                    9
                                ],
                                [
                                    -24,
                                    1
                                ],
                                [
                                    2,
                                    1
                                ],
                                [
                                    1,
                                    3
                                ],
                                [
                                    2,
                                    1
                                ],
                                [
                                    1,
                                    4
                                ],
                                [
                                    2,
                                    1
                                ],
                                [
                                    1,
                                    1
                                ],
                                [
                                    11,
                                    1
                                ],
                                [
                                    1,
                                    6
                                ],
                                [
                                    27,
                                    1
                                ],
                                [
                                    2,
                                    1
                                ],
                                [
                                    1,
                                    3
                                ],
                                [
                                    27,
                                    1
                                ],
                                [
                                    1,
                                    3
                                ],
                                [
                                    -92,
                                    1
                                ]
                            ], f = 65, g = '', c = 0, c = 0; c < d.length; c++)
                        for (var b = 0; b < d[c][1]; b++)
                            g += String.fromCharCode(f), f += d[c][0];
                    g += String.fromCharCode(f);
                    a.a.d = g;
                    a.a.e = function (a) {
                        for (var h = '', l = 0; l < a.length; l++)
                            a.hasOwnProperty(l) && (h += g[a[l]]);
                        return h;
                    };
                    a.a.f = k;
                    a.a.g = function (b) {
                        return !!(b && b.document && b.location && b[a.f.a([
                            26,
                            37,
                            30,
                            43,
                            45
                        ])] && b[a.f.a([
                            44,
                            30,
                            45,
                            8,
                            39,
                            45,
                            30,
                            43,
                            47,
                            26,
                            37
                        ])]);
                    };
                    a.a.h = function (b) {
                        if (null == b || a.a.g(b))
                            return !1;
                        var h = b.length;
                        return 1 === b.nodeType && h ? !0 : 'string' === typeof b || k(b) || 0 === h || 'number' === typeof h && 0 < h && h - 1 in b;
                    };
                    a.a.forEach = function (b, h, l, p) {
                        var c, d = typeof b;
                        if (b)
                            if ('function' === d)
                                for (c in b) {
                                    if ('prototype' != c && 'length' != c && 'name' != c && (p || !b.hasOwnProperty || b.hasOwnProperty(c)) && (d = h.call(l, b[c], c), 'boolean' === typeof d && !d))
                                        break;
                                }
                            else if ('number' === d)
                                for (c = 0; c < b && (d = h.call(l, b, c), 'boolean' !== typeof d || d); c++);
                            else if ('function' === typeof b.every)
                                b.every(function (a, b, p) {
                                    a = h.call(l, a, b);
                                    return !('boolean' === typeof a && !a);
                                });
                            else if (a.a.h(b))
                                for (c = 0; c < b.length && (d = h.call(l, b[c], c), 'boolean' !== typeof d || d); c++);
                            else
                                for (c in b)
                                    if (p || b.hasOwnProperty(c))
                                        if (d = h.call(l, b[c], c), 'boolean' === typeof d && !d)
                                            break;
                        return b;
                    };
                    a.a.i = function (b) {
                        if (!b)
                            return !1;
                        var h;
                        if (b !== Object(b))
                            h = b;
                        else if (a.a.h(b)) {
                            h = [];
                            for (var l = 0, p = b.length; l < p; l++)
                                h[l] = b[l];
                        } else
                            for (l in (h = {}, b))
                                h[l] = b[l];
                        return h;
                    };
                    a.a.j = function (b, h) {
                        if (!b || 'function' !== typeof b)
                            return !1;
                        var l = !1;
                        0 <= String(b).indexOf('[native code]') ? l = !0 : a.c.b || b === Function.prototype.toString || (l = !0);
                        l && h && (l = b.toString && b.toString === Function.prototype.toString);
                        return l;
                    };
                    a.a.k = function () {
                        try {
                            return navigator.userAgent;
                        } catch (a) {
                            return '';
                        }
                    };
                    a.a.l = function (b) {
                        b = b || a.a.k();
                        return !(!/iPad|iPhone|iPod|Silk|Kindle|Android|BlackBerry|PlayBook|BB10|Windows Phone|SpreadTrum|MAUI/.exec(b) && !a.a.m(b));
                    };
                    a.a.n = function (b) {
                        b = b || a.a.k();
                        return !!/Android/.exec(b);
                    };
                    a.a.m = function (a, h) {
                        var l = h || document;
                        return !!(/Macintosh/.exec(a) && 'ontouchend' in l);
                    };
                    a.a.o = function (b) {
                        b = b || a.a.k();
                        var h = /Safari|CriOS/i;
                        return !(!/iPhone|iPod|iPad/.exec(b) && !a.a.m(b) || h.exec(b));
                    };
                    a.a.p = function () {
                        return !1;
                    };
                    a.a.q = function (b) {
                        b = b || a.a.k();
                        return a.a.n(b) ? !!/Version/.exec(b) : !1;
                    };
                    a.a.r = function (b) {
                        if (!navigator)
                            return null;
                        b = b || a.a.k();
                        return b ? (b = b.match(/Edge\/(\d{1,}(.\d{1,})?)/)) ? parseFloat(b[1]) : null : null;
                    };
                    a.a.s = function () {
                        if (!navigator)
                            return null;
                        var b;
                        b = a.a.k();
                        return 'Microsoft Internet Explorer' == navigator.appName ? parseInt(b.replace(/^.*MSIE (\d+).*$/, '$1'), 10) : 'Netscape' == navigator.appName && (b = b.match(/(?:Trident\/.*rv:|MSIE )(\d+)/)) ? parseInt(b[1], 10) : null;
                    };
                    a.a.t = function () {
                        return null != a.a.s();
                    };
                    a.a.u = function (b, h) {
                        function l(h, b) {
                            if (b >= p || h !== Object(h))
                                return !1;
                            'function' === typeof h.toString && h.toString();
                            var e = Object.getPrototypeOf(h);
                            e && 'function' === typeof e.toString && e.toString();
                            b < p && a.a.forEach(h, function (a) {
                                l(a, b + 1);
                            });
                            return !1;
                        }
                        var p = w.min(10, h || 2);
                        try {
                            return l(b, 0);
                        } catch (c) {
                            return !0;
                        }
                    };
                }(u));
                (function (a) {
                    function k(a) {
                        var l = new RegExp('(^| )' + a + '($| )');
                        return function (a) {
                            return a && a.className && a.className.match(l);
                        };
                    }
                    function d(a) {
                        var l = {}, b;
                        for (b in a)
                            'number' === typeof a[b] && (l[b] = w.round(a[b]));
                        return l;
                    }
                    function f() {
                        return !1;
                    }
                    a.a.v = 2500;
                    a.a.w = 1000;
                    a.a.x = !1;
                    a.a.y = !1;
                    a.a.z = function () {
                        var h = /Firefox\/(\d+)/.exec(a.a.k());
                        return h ? (h = parseInt(h[1], 10), 21 > h && 14 < h) : !1;
                    }();
                    a.a.aa = function () {
                        var h, l = /^(?:[a-z]+:\/\/|:?\/?\/)?(?:www\.)?([^\/:]*)/i;
                        a.c.c || (h = a.a.ab(), !h && a.c.d && (h = a.c.d));
                        h || (h = a.c.e.location.hostname);
                        return (h = h && h.match && h.match(l)) && h[1] || a.c.e.location.hostname;
                    };
                    a.a.ac = function () {
                        var h = a.a.ad();
                        if (h && h.url)
                            return h;
                        var h = a.g.a(), l = a.a.ab(), b = a.a.ae(h, l);
                        return b && b.url || (b = a.a.af(h)) && b.url ? b : (l = a.a.ag(l)) && l.url ? l : (h = a.a.ah(h)) ? h : a.a.ai();
                    };
                    a.a.ai = function () {
                        a.c.f(10);
                        return {
                            url: '',
                            isCorrect: !1
                        };
                    };
                    a.a.ad = function () {
                        if (!a.c.c)
                            return !1;
                        var h = window.top && window.top.location && window.top.location.href;
                        if (h)
                            return a.c.f(4), {
                                url: h,
                                isCorrect: !0
                            };
                    };
                    a.a.ag = function (h) {
                        h = h || a.a.ab();
                        if (!h)
                            return !1;
                        a.c.f(2);
                        return {
                            url: h,
                            isCorrect: !1
                        };
                    };
                    a.a.ah = function (h) {
                        h = h && h.document && h.document.referrer;
                        if (!h)
                            return !1;
                        a.c.f(3);
                        return {
                            url: h,
                            isCorrect: !1
                        };
                    };
                    a.a.af = function (h) {
                        h = a.a.aj(h);
                        if (!h)
                            return !1;
                        h.parentIsTop ? a.c.f(3) : a.c.f(9);
                        var l = !0;
                        try {
                            var b;
                            URL && URL.constructor && URL.constructor.name && 'Function' === URL.constructor.name ? b = new URL(h.url) : (b = document.createElement('a'), b.href = h.url);
                            l = '' === b.pathname || '/' === b.pathname;
                        } catch (e) {
                        }
                        return {
                            url: h.url,
                            isCorrect: !l
                        };
                    };
                    a.a.aj = function (h, l, b, e) {
                        l = a.c.c;
                        if (!h || l)
                            return !1;
                        l = h.document && h.document.referrer;
                        if (!l || !a.a.ak(l))
                            return !1;
                        if (h.parent === h.top)
                            return {
                                url: l,
                                parentIsTop: !0
                            };
                        h = location && location.ancestorOrigins;
                        b = location && location.origin;
                        if (!h || 0 === h.length || !b)
                            return !1;
                        e = !1;
                        for (var c, d = 0; d < h.length; d++)
                            if (c = h[d], b !== c) {
                                if (e)
                                    return !1;
                                e = !0;
                                b = c;
                            }
                        return e && 0 === l.search(h[h.length - 1]) ? {
                            url: l,
                            parentIsTop: !1
                        } : !1;
                    };
                    a.a.ae = function (h, l) {
                        l = l || a.a.ab();
                        if (!l)
                            return !1;
                        var b = a.a.al(h, l);
                        if (a.a.ak(b))
                            return a.c.f(6), {
                                url: b,
                                isCorrect: !1
                            };
                    };
                    a.a.al = function (a, l) {
                        var b;
                        b = a && a.location && a.location.hostname;
                        b = 'string' !== typeof b ? !1 : b.match(/^([^\.]+\.)*(googlesyndication\.com|doubleclick\.net|adnxs\.com)$/) && a.location.href;
                        if (!b || !l)
                            return !1;
                        var e = encodeURIComponent(l).replace(/[.*+^${}()|[\]\\]/g, '\\$&');
                        return (b = b.match(new RegExp('[?&](?:url|referrer)=(' + e + '(?:%2F[^&]*|$))'))) ? decodeURIComponent(b[1]) : !1;
                    };
                    a.a.am = function () {
                        if ('string' === typeof a.c.g)
                            return a.c.g;
                        var h = !1, l, b = /^https?:\/\/(.*?)\/([^?#]*)/;
                        a.c.c ? (h = window.location.hostname.replace('www.', ''), h += window.location.pathname) : (l = a.g.a(), l.parent === window.top && (h = l.document.referrer) && (l = b.exec(h)) && (h = l[1].replace('www.', '') + '/' + l[2]));
                        'string' === typeof h && '/' === h.charAt(h.length - 1) && (h = h.substr(0, h.length - 1));
                        return h;
                    };
                    a.a.an = function () {
                        var h;
                        a.c.c ? h = 2 : (h = a.g.a(), h = h.parent === window.top ? 2 : location && location.ancestorOrigins ? 1 : 0);
                        return h;
                    };
                    a.a.ab = function () {
                        var a = location && location.ancestorOrigins;
                        return a ? 0 === a.length ? !1 : a[a.length - 1] : !1;
                    };
                    a.a.ao = function () {
                        var h, l = a.a.aa(), b = l && l.split('.'), e = b && b.length;
                        3 <= e ? h = 'co' === b[e - 2] || 'com' === b[e - 2] ? b[e - 3] + '.' + b[e - 2] + '.' + b[e - 1] : b[e - 2] + '.' + b[e - 1] : 2 == e && (h = b[e - 2] + '.' + b[e - 1]);
                        return h && decodeURIComponent(h) || decodeURIComponent(l);
                    };
                    a.a.ap = function (a) {
                        if ('string' !== typeof a)
                            return '';
                        var b = a.match(/^([^:]{2,}:\/\/[^\/]*)/);
                        b && b[1] && (a = b[1]);
                        return a;
                    };
                    a.a.aq = function (a, b) {
                        if ('string' !== typeof a || 'string' !== typeof b || '' === a || '' === b)
                            return null;
                        try {
                            var p = new RegExp(b + '=([^?&;#]*)(?:$|[?&;#])').exec(a);
                        } catch (e) {
                            return null;
                        }
                        return p && p[1];
                    };
                    a.a.ar = function (a, b) {
                        for (var p = [a], e = 1; e <= b; e++)
                            p.push(a + e), p.push(a - e);
                        p = p[w.floor(w.random() * p.length)];
                        e = w.floor(w.random() * p);
                        return {
                            multiplier: p,
                            sample: 0 == e
                        };
                    };
                    a.a.as = function (h, b) {
                        var p = a.a.ar(h, b);
                        a.a.at(p.multiplier, p.sample);
                        return p;
                    };
                    a.a.au = function () {
                        return a.a.as(a.h, a.i).sample;
                    };
                    a.a.at = function (h, b) {
                        a.a.as = function () {
                            return {
                                multiplier: h,
                                sample: b
                            };
                        };
                    };
                    a.a.av = function () {
                        var h = a.a.s();
                        return 5 === h || 6 === h || 7 === h;
                    };
                    a.a.aw = function (a) {
                        switch (a.s) {
                        case !1:
                            return 'unsafe';
                        case !0:
                            return 'safe';
                        default:
                            return 'safe';
                        }
                    };
                    a.a.ax = function (h, b) {
                        return -1 !== a.a.indexOf(h, b);
                    };
                    a.a.ay = function () {
                        function a(h) {
                            if (!h)
                                return '';
                            h = h.match(/[\d]+/g);
                            h.length = 3;
                            return h.join('.');
                        }
                        var b = !1, p = '';
                        if (navigator.plugins && navigator.plugins.length) {
                            var e = navigator.plugins['Shockwave Flash'];
                            e && (b = !0, e.description && (p = a(e.description)));
                            navigator.plugins['Shockwave Flash 2.0'] && (b = !0, p = '2.0.0.11');
                        } else if (navigator.mimeTypes && navigator.mimeTypes.length)
                            (b = (e = navigator.mimeTypes['application/x-shockwave-flash']) && e.enabledPlugin && e.enabledPlugin.description) && (p = a(e.enabledPlugin.description));
                        else
                            try {
                                e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7'), b = !0, p = a(e.GetVariable('$version'));
                            } catch (c) {
                                try {
                                    e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6'), b = !0, p = '6.0.21';
                                } catch (d) {
                                    try {
                                        e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'), b = !0, p = a(e.GetVariable('$version'));
                                    } catch (f) {
                                    }
                                }
                            }
                        return b ? p : '0';
                    };
                    a.a.getElementsByClassName = function (a, b, p) {
                        b = b || '*';
                        p = p || document;
                        if (p.getElementsByClassName) {
                            var e = [], c = p.getElementsByClassName(a);
                            if ('*' !== b) {
                                a = 0;
                                for (p = c.length; a < p; a++) {
                                    var d = c[a];
                                    d.tagName === b && e.push(d);
                                }
                                return e;
                            }
                            return c;
                        }
                        c = [];
                        b = p.getElementsByTagName(b);
                        p = k(a);
                        d = b.length;
                        for (a = 0; a < d; a++)
                            e = b[a], p(e) && c.push(e);
                        return c;
                    };
                    a.a.az = k;
                    a.a.ba = function (a, b) {
                        if (!a || !b)
                            return !1;
                        var p = new RegExp('(^| )' + b + '($| )');
                        return a.className && a.className.match(p);
                    };
                    a.a.bb = function (a) {
                        return new A() - a.de;
                    };
                    a.a.bc = function (a) {
                        return a.replace(/^http:/, '').replace(/^\/\//, '').replace(/^www[^.]*\./, '').split('/')[0];
                    };
                    a.a.bd = function (h, b, p) {
                        if (('undefined' === typeof p || !p) && h && (p = a.a.be(h), !p))
                            return;
                        if (h && h.nodeType)
                            if ('undefined' === typeof Node) {
                                if (1 != h.nodeType)
                                    return;
                            } else if (h.nodeType != Node.ELEMENT_NODE)
                                return;
                        if (p.getComputedStyle)
                            return p.getComputedStyle(h, '') && p.getComputedStyle(h, '')[b];
                        for (p = b.indexOf('-'); -1 < p;)
                            b = p == b.length - 1 ? b.substr(0, p) : b.substr(0, p) + b.charAt(p + 1).toUpperCase() + b.substr(p + 2), p = b.indexOf('-');
                        if (h.currentStyle)
                            return h.currentStyle[b];
                        if (h.style)
                            return h.style[b];
                    };
                    a.a.bf = function (h) {
                        if (!h)
                            return !1;
                        var b = a.a.bd(h, 'background-image');
                        b || (b = a.a.bd(h, 'backgroundImage'));
                        var p;
                        b && (p = (p = b.match('url\\((.*)\\)')) && p[1].replace(/\x22/g, ''));
                        return p;
                    };
                    a.a.bg = function (h, b, p) {
                        if (!h)
                            return [];
                        var e = 'boolean' === typeof p ? p : !1, c = [h], d = !1;
                        a.a.forEach('number' === typeof b ? b : 50, function () {
                            if ((d = a.a.bh(h)) && 1 == d.nodeType)
                                h = d, c.push(h);
                            else if (e && d && 9 == d.nodeType)
                                if ((d = a.g.b(h)) && 1 == d.nodeType)
                                    h = d, c.push(h);
                                else
                                    return !1;
                            else
                                return !1;
                        });
                        return c;
                    };
                    a.a.bi = function (h, b) {
                        var p = a.a.bg(h);
                        return p && -1 !== a.a.indexOf(p, b);
                    };
                    a.a.bh = function (a) {
                        return a.parentNode || a.parentElement || !1;
                    };
                    a.a.bj = function (h) {
                        h = h || a.a.k();
                        return !!/iPhone|iPod/.exec(h);
                    };
                    a.a.bk = function (h) {
                        h = h || a.a.k();
                        return !(!/iPad/.exec(h) && !a.a.m(h));
                    };
                    a.a.bl = function () {
                        var h = {};
                        return function (b) {
                            if ('undefined' !== typeof h[b])
                                return h[b];
                            h[b] = null;
                            var p = function () {
                                var h = a.a.e([
                                        5,
                                        1
                                    ]), b = a.a.e([
                                        19,
                                        48,
                                        34,
                                        45,
                                        45,
                                        30,
                                        43
                                    ]), l = a.a.e([
                                        15,
                                        34,
                                        39,
                                        45,
                                        30,
                                        43,
                                        30,
                                        44,
                                        45
                                    ]), p = a.a.e([
                                        0,
                                        41,
                                        41,
                                        37,
                                        30,
                                        13,
                                        30,
                                        48,
                                        44
                                    ]), e = a.a.e([
                                        8,
                                        39,
                                        44,
                                        45,
                                        26,
                                        32,
                                        43,
                                        26,
                                        38
                                    ]), c = a.a.e([
                                        24,
                                        30,
                                        37,
                                        41
                                    ]), d = a.a.e([
                                        18,
                                        39,
                                        26,
                                        41,
                                        28,
                                        33,
                                        26,
                                        45
                                    ]);
                                return {
                                    FB: '\\[' + h,
                                    Twitter: b,
                                    Pinterest: l,
                                    AppleNews: p,
                                    Instagram: e,
                                    Yelp: c,
                                    Snapchat: d
                                };
                            }();
                            a.a.forEach(a.a.bm(p), function (a) {
                                if (new RegExp(p[a]).test(b))
                                    return h[b] = a, !1;
                            });
                            return h[b];
                        };
                    }();
                    a.a.bn = function () {
                        var h;
                        return function () {
                            if ('undefined' !== typeof h)
                                return h;
                            h = {
                                results: {
                                    article: !1,
                                    page_height: !1,
                                    meta_properties: !1,
                                    favicon: !1
                                },
                                meta_data: {
                                    num_articles: 0,
                                    page_height_ratio: null,
                                    meta_property_matches: []
                                }
                            };
                            var b = a.c.e && a.c.e.document, p = (b && b.getElementsByTagName('article')).length;
                            0 < p && (h.results.article = !0, h.meta_data.num_articles = p);
                            var p = a.c.h, e = a.c.e && a.c.e.innerHeight, p = p && e && p / e;
                            1.5 <= p && (h.results.page_height = !0, h.meta_data.page_height_ratio = p);
                            var p = b && b.getElementsByTagName('meta'), c = {
                                    'fb:app_id': 1,
                                    'og:site_name': 1,
                                    'og:type': 1,
                                    'fb:page_id': 1,
                                    'twitter:account_id': 1,
                                    'twitter:site': 1
                                };
                            a.a.forEach(p, function (a) {
                                if ((a = a.getAttribute('property')) && c.hasOwnProperty(a))
                                    return h.results.meta_properties = !0, h.meta_data.meta_property_matches.push(a), !1;
                            });
                            b = b && b.getElementsByTagName('link');
                            a.a.forEach(b, function (a) {
                                if ('icon' === a.getAttribute('rel') && /favicon\./.test(a.getAttribute('href')))
                                    return h.results.favicon = !0, !1;
                            });
                            return h;
                        };
                    }();
                    a.a.bo = function () {
                        var h = a.a.bn().results, b;
                        for (b in h)
                            if (h.hasOwnProperty(b) && h[b])
                                return !0;
                        return !1;
                    };
                    a.a.bp = function () {
                        for (var h = [
                                    103,
                                    46,
                                    100,
                                    111,
                                    117,
                                    98,
                                    108,
                                    101,
                                    99,
                                    108,
                                    105,
                                    99,
                                    107,
                                    46,
                                    110,
                                    101,
                                    116
                                ], b = '', p = 0, e = h.length; p < e; p++)
                            b += String.fromCharCode(h[p]);
                        return new RegExp('^[^.]+.' + b).test(a.a.aa());
                    };
                    a.a.bq = function () {
                        var h = a.c.e.screen;
                        if (a.a.o()) {
                            var b;
                            'undefined' !== typeof window.orientation ? 0 === window.orientation || 180 === window.orientation ? (b = h.width, h = h.height) : (b = h.height, h = h.width) : b = h = 0;
                            return {
                                w: b,
                                h: h
                            };
                        }
                        if (a.a.q()) {
                            b = a.c.e.devicePixelRatio;
                            var e = 1;
                            0.05 > w.abs(h.width / a.c.e.innerWidth - b) && (e = b);
                            return {
                                w: h.width / e,
                                h: h.height / e
                            };
                        }
                        return {
                            w: h.width,
                            h: h.height
                        };
                    };
                    a.a.br = function () {
                        var a = null;
                        'string' === typeof navigator.doNotTrack ? a = navigator.doNotTrack : 'string' === typeof navigator.msDoNotTrack ? a = navigator.msDoNotTrack : 'string' === typeof window.doNotTrack && (a = window.doNotTrack);
                        return !a || '1' !== a[0] && 'yes' !== a ? !1 : !0;
                    };
                    a.a.bs = function () {
                        var h;
                        return function () {
                            if ('undefined' === typeof h) {
                                var b = a.a.ao();
                                if (!b)
                                    return !1;
                                var e = [
                                    a.f.a([
                                        39,
                                        34,
                                        28,
                                        36,
                                        72,
                                        28,
                                        40,
                                        38
                                    ]),
                                    a.f.a([
                                        39,
                                        34,
                                        28,
                                        36,
                                        35,
                                        43,
                                        72,
                                        28,
                                        40,
                                        38
                                    ])
                                ];
                                h = a.a.ax(e, b);
                            }
                            return h;
                        };
                    }();
                    a.a.getAttribute = function (a, b) {
                        return a[b] || a.getAttribute(b);
                    };
                    var g = [function (a) {
                            if (!a || 'IFRAME' !== a.nodeName)
                                return !1;
                            var b = a.offsetHeight;
                            return isNaN(b) || 15 < b || 'google_conversion_frame' !== a.name ? !1 : !0;
                        }];
                    a.a.bt = function (h, b) {
                        return 'undefined' === typeof h || null === h || !1 === h || !a.a.bu(h) || h.nodeName && 'IMG' == h.nodeName && !h.complete || a.a.filter(g, function (a) {
                            return a(h);
                        }).length || !0 === h[D] ? !1 : !0;
                    };
                    a.a.bv = function (h, b, e) {
                        a.j.a(b);
                        !0 === e && b.aa && (b.aa[M] = void 0, b.aa[D] = void 0);
                        !b.hasIframeListener && h.tagName && 'iframe' === h.tagName.toLowerCase() && (b.hasIframeListener = !0);
                        b.components && b.components.splice(0, 1, h);
                        b.aa = h;
                        a.k.a.zaxs('adElementUpdate');
                        a.a.bw(b.aa);
                        a.j.b(b);
                        b.periscopeManager && b.periscopeManager.rebuildPixelTargets(h, h.parentNode);
                    };
                    a.a.bx = function (a) {
                        return a.replace(/:/g, '%3A').replace(/=/g, '%3D').replace(/,/g, '%2C');
                    };
                    a.a.by = function (h) {
                        var b = [];
                        a.a.forEach(h, function (h, e) {
                            var c = typeof h;
                            'number' == c ? b.push(a.a.bx(e) + ':' + a.a.bx(h + '')) : 'string' == c ? b.push(a.a.bx(e) + ':' + a.a.bx('"' + h + '"')) : 'undefined' == c ? b.push(a.a.bx(e) + ':' + a.a.bx('undefined')) : 'boolean' == c ? b.push(a.a.bx(e) + ':' + a.a.bx(h ? 'true' : 'false')) : null === h ? b.push(a.a.bx(e) + ':' + a.a.bx('null')) : 'object' != c && 'function' != c || !h.toString || b.push(a.a.bx(e) + ':' + a.a.bx('"' + h.toString() + '"'));
                        }, null, !0);
                        b.sort();
                        return '{' + b.join(',') + '}';
                    };
                    a.a.bz = function (a) {
                        var b = {};
                        if ('string' != typeof a || '{' != a.charAt(0))
                            return !1;
                        a = a.slice(1, -1).split(',');
                        for (var e = 0; e < a.length; e++) {
                            var c = a[e].split(':');
                            c[1] = unescape(c[1]);
                            'true' == c[1] ? c[1] = !0 : 'false' == c[1] ? c[1] = !1 : '"' == c[1].charAt(0) ? c[1] = c[1].slice(1, -1) : c[1] = 'undefined' == c[1] ? void 0 : 'null' == c[1] ? null : 'NaN' == c[1] ? NaN : parseFloat(c[1]);
                            b[unescape(c[0])] = c[1];
                        }
                        return b;
                    };
                    a.a.bu = function (h) {
                        var b = h.offsetWidth, e = h.offsetHeight;
                        if ('function' === typeof a.a.ca && !a.a.ca(b, e) || a.a.x && e < a.a.x || a.a.y && b < a.a.y)
                            return !1;
                        a.a.forEach(a.a.bg(h, 3), function (a) {
                            var h = a.style && a.style.width, c = a.style && a.style.height;
                            a && a.style && 'hidden' == a.style.overflow && ('' != h || '' != c) && (a = parseFloat(h), c = parseFloat(c), b = !isNaN(a) && a < b ? a : b, e = !isNaN(c) && c < e ? c : e);
                        });
                        (h = a.a.cb(h)) && h.width * h.height < a.a.v && (b = h.width < b ? h.width : b, e = h.height < e ? h.height : e);
                        return b * e >= a.a.v;
                    };
                    var c = {};
                    a.a.cb = function (h) {
                        if (!h || !h.nodeName || 'IMG' == !h.nodeName || !h.complete)
                            return !1;
                        var b = h.getAttribute('src');
                        if (!b)
                            return !1;
                        if (c[b])
                            return c[b];
                        try {
                            if ('undefined' !== typeof h.naturalHeight && 'undefined' !== typeof h.naturalWidth) {
                                var e = {
                                    width: h.naturalWidth,
                                    height: h.naturalHeight
                                };
                                return c[h.src] = e;
                            }
                        } catch (d) {
                        }
                        return a.c.a && (a.c.a.src = b, a.c.a.a) ? (e = {
                            width: parseInt(a.c.a.b),
                            height: parseInt(a.c.a.c)
                        }, c[b] = e) : !1;
                    };
                    a.a.cc = function () {
                        if (!a.c.i) {
                            var h = a.c, b;
                            a:
                                if (document && document.currentScript && 'object' == typeof document.currentScript && 'undefined' !== typeof HTMLScriptElement && document.currentScript.constructor === HTMLScriptElement && !document.currentScript[D])
                                    b = document.currentScript, b[D] = !0;
                                else {
                                    for (var e = document.getElementsByTagName('script'), c = e.length - 1; -1 < c; c--) {
                                        var d = b = e[c], f = new RegExp('reutersheader194883552024(/|%2F)' + '(moatheader|yi|yield).js'.replace(/\./, '\\.'));
                                        if (d && d.src && f.test(d.src) && ('undefined' === typeof b[D] || !0 !== b[D])) {
                                            b[D] = !0;
                                            break a;
                                        }
                                    }
                                    b = void 0;
                                }
                            h.i = b;
                        }
                        return a.c.i ? (a.c.i[D] = !0, a.c.i) : null;
                    };
                    a.a.cd = function (a, b) {
                        for (var e in b)
                            Object.prototype.hasOwnProperty.call(b, e) && (a[e] = b[e]);
                    };
                    a.a.ce = function (a) {
                        var b, e = /https:/i;
                        if (a)
                            b = e.test(a.src || a.href || 'http:') ? 'https:' : 'http:';
                        else
                            try {
                                b = window.location.protocol;
                            } catch (c) {
                                a = document.createElement('a'), a.href = '', b = a.protocol;
                            }
                        return 'https:' === b ? 'https:' : 'http:';
                    };
                    a.a.cf = function (a) {
                        try {
                            return -1 !== (a.src || a.getAttribute('src')).indexOf('psd=1');
                        } catch (b) {
                            return !1;
                        }
                    };
                    a.a.cg = function (a) {
                        for (var b = [], e = 0; e < a.length; e++)
                            b.push(a[e]);
                        return b;
                    };
                    a.a.nextElementSibling = function (a) {
                        if (a.nextElementSibling)
                            return a.nextElementSibling;
                        for (; a = a.nextSibling;)
                            if (1 === a.nodeType)
                                return a;
                    };
                    a.a.previousElementSibling = function (a) {
                        if (a) {
                            if (a.previousElementSibling)
                                return a.previousElementSibling;
                            for (var b = 0; (a = a.previousSibling) && 1000 > b;)
                                if (b++, a && 1 === a.nodeType)
                                    return a;
                        }
                    };
                    a.a.ch = function (a, b, e) {
                        'undefined' !== typeof e && (a[b] = e);
                    };
                    a.a.ci = function (h) {
                        return a.a.f(h) ? 0 === h.length : !0;
                    };
                    a.a.filter = function (a, b) {
                        for (var e = [], c = 0; c < a.length; c++)
                            b(a[c]) && e.push(a[c]);
                        return e;
                    };
                    a.a.cj = function (a, b) {
                        for (var e = [], c = 0; c < b.length; c++)
                            e.push(a(b[c]));
                        return e;
                    };
                    a.a.ck = function (a, b) {
                        for (var e = [], c = 0; c < b.length; c++) {
                            var d = a(b[c]);
                            null != d && e.push(d);
                        }
                        return e;
                    };
                    a.a.reduce = function (h, b, e) {
                        if (!a.a.h(h) || 'function' !== typeof b)
                            return !1;
                        e = e ? b(e, h[0]) : h[0];
                        for (var c = 1; c < h.length; c++)
                            e = b(e, h[c]);
                        return e;
                    };
                    a.a.indexOf = function (h, b) {
                        if (!h)
                            return -1;
                        if (a.a.f(h)) {
                            for (var e = 0, c = h.length; e < c; e++)
                                if (h[e] === b)
                                    return e;
                            return -1;
                        }
                        return 'string' === typeof h ? b || 'string' !== typeof b ? h.indexOf(b) : -1 : -1;
                    };
                    a.a.lastIndexOf = function (h, b) {
                        if (!h)
                            return -1;
                        if (a.a.f(h)) {
                            for (var e = h.length - 1; 0 <= e; e--)
                                if (h[e] === b)
                                    return e;
                            return -1;
                        }
                        return 'string' === typeof h ? '' === b ? -1 : h.lastIndexOf(b) : -1;
                    };
                    a.a.bind = function (a, b) {
                        var e = Array.prototype.slice.call(arguments, 2);
                        return function () {
                            b.apply(a, e);
                        };
                    };
                    a.a.cl = function (h, b) {
                        if (!h || !b)
                            return !1;
                        var e = a.a.cm(b);
                        if (!e)
                            return !1;
                        if (a.a.hasChildNodes(e)) {
                            var c = e.childNodes[w.max(0, e.childNodes.length - 1)] || null;
                            e.insertBefore(h, c);
                        } else
                            e.appendChild(h);
                        return e;
                    };
                    a.a.cn = function (h, b, e) {
                        if ('string' != typeof h || !b || !document)
                            return !1;
                        e = e || document.createElement('script');
                        e.type = 'text/javascript';
                        b = a.a.cl(e, b);
                        if (!b)
                            return !1;
                        e.src = h;
                        return b;
                    };
                    a.a.hasChildNodes = function (a) {
                        return a && a.childNodes && 0 < a.childNodes.length;
                    };
                    a.a.cm = function (h) {
                        if (!h)
                            return !1;
                        if ('OBJECT' !== h.nodeName && 'EMBED' !== h.nodeName)
                            return h;
                        h = a.a.bg(h);
                        var b = !1;
                        a.a.forEach(h, function (a) {
                            if (a && 'OBJECT' !== a.nodeName && 'EMBED' !== a.nodeName)
                                return b = a, !1;
                        });
                        return b;
                    };
                    a.a.co = function (a, b) {
                        if ('undefined' === typeof a)
                            return !1;
                        for (var e = 0, c = b.length; e < c; e++)
                            if ('string' == typeof b[e]) {
                                try {
                                    a = a[b[e]];
                                } catch (d) {
                                }
                                if ('undefined' === typeof a)
                                    return !1;
                            }
                        return a;
                    };
                    a.a.cp = function (a) {
                        return B && 'undefined' !== typeof a && B[a] ? B[a] : !1;
                    };
                    a.a.cq = function (h) {
                        if (!h || 'object' !== typeof h || 'number' !== typeof h.zr)
                            return !1;
                        var b = a.a.cp(h.zr);
                        return b && b === h;
                    };
                    a.a.cr = function (h, b) {
                        for (var e = a.a.bg(h, 50, !0), c = 0; c < e.length; c++)
                            if (e[c] === b)
                                return !0;
                        return !1;
                    };
                    a.a.cs = function (a) {
                        if (!a || !a.aa)
                            return !1;
                        if ('number' !== typeof a.ADAREA) {
                            var b, e;
                            if (a.isCompositeAd && a.components && 1 < a.components.length)
                                for (b = a.ADAREA = 0; b < a.components.length; b++)
                                    a.ADAREA += a.components[b].offsetWidth * a.components[b].offsetHeight;
                            else
                                a.elementRect ? (b = a.elementRect.right - a.elementRect.left, e = a.elementRect.bottom - a.elementRect.top, a.ADAREA = b * e) : a.ADAREA = a.aa.offsetWidth * a.aa.offsetHeight;
                        }
                        return a.ADAREA;
                    };
                    a.a.bw = function (b) {
                        if (!(!b || b && b.CLIPCHECKINGTARGET)) {
                            var e = a.a.bg(b, 3), c;
                            e && 0 < e.length && (a.a.forEach(e, function (a) {
                                if (a && a.style && a.style.clip)
                                    return c = a, !1;
                            }), !c && b.style && b.style.clip && (c = b), c && (b.CLIPCHECKINGTARGET = c));
                        }
                    };
                    var b = /rect\((\d+)px,? ?(\d+)px,? ?(\d+)px,? ?(\d+)px\)/;
                    a.a.ct = function (h) {
                        h = h.match(b);
                        var e = !1;
                        h && (h = a.a.cj(function (a) {
                            return parseInt(a, 10);
                        }, h), e = {
                            top: h[1],
                            right: h[2],
                            bottom: h[3],
                            left: h[4]
                        });
                        return e;
                    };
                    a.a.cu = function (a, b) {
                        var e = '', c;
                        for (c in a)
                            if (a.hasOwnProperty(c))
                                var d = encodeURIComponent(a[c]), e = e + ('&' + c + '=' + d);
                        return e.slice(1);
                    };
                    a.a.cv = function (a) {
                        var b = 0;
                        if (1 > a.length)
                            return b;
                        for (var e = 0; e < a.length; e++)
                            var c = a.charCodeAt(e), b = (b << 5) - b + c, b = b & b;
                        return w.abs(b);
                    };
                    a.a.cw = function (b, e) {
                        var c = new A(), c = [
                                c.getFullYear(),
                                ('0' + (c.getMonth() + 1)).slice(-2),
                                ('0' + c.getDate()).slice(-2)
                            ].join('-');
                        return a.a.cv(b + (e + c));
                    };
                    a.a.cx = function () {
                        var a = function () {
                            var a = window.pageXOffset ? window.pageXOffset + window.innerWidth - 1 : 0, b = window.pageYOffset ? window.pageYOffset + window.innerHeight - 1 : 0;
                            return a || b ? !document.elementFromPoint(a, b) : !0;
                        }();
                        return function (b, e, c) {
                            if (!a) {
                                var d = c.defaultView || c.parentWindow || window;
                                b += d.pageXOffset;
                                e += d.pageYOffset;
                            }
                            return c.elementFromPoint(b, e);
                        };
                    }();
                    a.a.cy = function (a, b) {
                        return Object.prototype.hasOwnProperty.call(a, b);
                    };
                    a.a.cz = function (b) {
                        if (!b || !b.style || !b.style.filter)
                            return !1;
                        b = b.style.filter.split(' ');
                        var e = !1, c;
                        a.a.forEach(b, function (a) {
                            var b = a.match(/\d+/);
                            a.search(/opacity/) && b && 0 < b.length && (c = parseFloat(b.join('')), !1 === e || c < e) && (e = c);
                        });
                        return e;
                    };
                    a.a.da = function (b, e) {
                        var c;
                        if (!b)
                            return 100;
                        if (e && b.style && 'hidden' === b.style.visibility)
                            return 0;
                        c = b.style && b.style.opacity ? parseFloat(b.style.opacity) : a.a.cz(b);
                        return a.a.db(c) ? c : 100;
                    };
                    a.a.dc = function (a) {
                        return a.backgroundColor ? (a = a.backgroundColor, 'transparent' === a ? 0 : -1 !== a.indexOf('rgb') ? 4 > a.split(',').length ? 1 : parseFloat(a.split(',')[3].split(')')[0]) : 1) : -1;
                    };
                    a.a.dd = function (b, e) {
                        var c = -1;
                        if (a.c.e.getComputedStyle) {
                            var d = a.c.e.getComputedStyle(b);
                            if (!d)
                                return c;
                            if (e && 'hidden' === d.visibility || 'collapse' === d.visibility || e && 0 === a.a.dc(d))
                                return 0;
                            c = parseFloat(d.opacity);
                        }
                        return c;
                    };
                    a.a.de = function (b, e, c) {
                        if (!b || !b.aa)
                            return !1;
                        'undefined' === typeof b.parentNodeTree && (b.parentNodeTree = a.a.bg(b.aa.parentElement, 50, !0), e && b.parentNodeTree.push(b.aa));
                        var d = 100, f, g;
                        a.a.forEach(b.parentNodeTree, function (b) {
                            f = a.a.da(b, c);
                            0 === f && (g = a.a.dd(b, c), a.a.db(g) && g >= f && (f = g));
                            f < d && (d = f);
                            if (0 === d)
                                return !1;
                        });
                        return d;
                    };
                    a.a.df = function (a, b, e) {
                        return function () {
                            b.apply(e || null, a.concat(a.slice.call(arguments)));
                        };
                    };
                    a.a.be = function (a) {
                        try {
                            var b = a && a.ownerDocument;
                            return b && (b.defaultView || b.parentWindow);
                        } catch (e) {
                            return !1;
                        }
                    };
                    a.a.dg = function (b, e, c) {
                        if (!b || !e)
                            return !1;
                        var d = [];
                        'number' !== typeof c && (c = 50);
                        for (var f = 0; f < c; f++)
                            if (e != e.parent) {
                                if (b = a.g.b(b, e))
                                    d.push(b);
                                else
                                    break;
                                e = e.parent;
                            } else
                                break;
                        return d;
                    };
                    a.a.dh = function (a) {
                        a = w.max(4, a);
                        return ((1 + w.random()) * w.pow(16, a) | 0).toString(16).substring(0, a);
                    };
                    a.a.di = function () {
                        var b = a.a.dh;
                        return b(4) + '-' + b(4) + '-' + b(4) + '-' + b(4);
                    };
                    a.a.a = function (a) {
                        window && window.clearTimeout && window.clearTimeout(a);
                    };
                    a.a.b = function (a) {
                        window && window.clearInterval && window.clearInterval(a);
                    };
                    var e = function (b, e) {
                        if (a.a.j(e.toString))
                            return e.toString();
                        if (a.a.j(b && b.Function.prototype.toString))
                            return e.toString = b.Function.prototype.toString, e.toString();
                        var c = a.c.e !== b && a.c.e && a.c.e.Function.prototype.toString;
                        if (a.a.j(c))
                            return e.toString = c, e.toString();
                        if (a.c.j && 8 >= a.a.s())
                            return e.toString();
                        var c = b || window, d = c.document.createElement('IFRAME');
                        d.style.display = 'none';
                        d.style.width = '0px';
                        d.style.height = '0px';
                        d.width = '0';
                        d.height = '0';
                        a.a.cl(d, c.document.documentElement);
                        d.contentWindow && (e.toString = d.contentWindow.Function.prototype.toString);
                        var f = e.toString();
                        c.document.documentElement.removeChild(d);
                        return f;
                    };
                    a.a.toString = function (b, c) {
                        c = c || a.c.e;
                        var d;
                        try {
                            d = e(c, b);
                        } catch (f) {
                            d = b.toString();
                        }
                        return d;
                    };
                    a.a.dj = function (b, e, c) {
                        b = a.a.toString(b, c);
                        if (a.c.k())
                            c.eval('(' + b + ')(' + e + ')');
                        else if (a.c.l(c))
                            new c.Function('(' + b + ')(' + e + ')')();
                        else {
                            var d = c.document.createElement('script');
                            d.type = 'text/javascript';
                            d.text = '(' + b + ')(' + e + ')';
                            a.a.cl(d, c.document.body);
                        }
                    };
                    a.a.dk = function (b, e, c, d) {
                        function f(a, b) {
                            try {
                                return d(b[a]);
                            } catch (h) {
                            }
                        }
                        var g, x;
                        if ('string' !== typeof b)
                            return !1;
                        'function' !== typeof d && (d = function (a) {
                            return a;
                        });
                        g = window;
                        x = f(b, g);
                        if (!x) {
                            e = a.g.c(g, 'number' === typeof e ? e : 20);
                            if (!e)
                                return !1;
                            for (var n = 0, m = e.length; n < m && (g = e[n], x = f(b, g), 'undefined' === typeof x); n++);
                        }
                        return c ? [
                            x,
                            g
                        ] : x;
                    };
                    a.a.dl = function (a, b) {
                        var e = a.toString();
                        b && (e = '(' + e + '(' + b + '))');
                        return '(function(){try{return(' + e + ')()}catch(e){return false}})()';
                    };
                    a.a.dm = function () {
                        if (!a.c.m)
                            return !1;
                        var b = a.a.k(), e = b && 'string' === typeof b, c = /Version\/(\d*)/, d = /CPU.*OS\s(\d*)_/, c = (c = e && b.match(c)) && 1 < c.length ? parseInt(c[1], 10) : !1;
                        'number' !== typeof c && (c = (c = e && b.match(d)) && 1 < c.length ? parseInt(c[1], 10) : !1);
                        return c;
                    };
                    a.a.bm = function (a) {
                        if ('object' === typeof a) {
                            if (Object.keys)
                                return Object.keys(a);
                            var b = [], e;
                            for (e in a)
                                b.push(e);
                            return b;
                        }
                    };
                    a.a.every = function (a, b) {
                        if ('object' !== typeof a || !a || 'function' !== typeof b)
                            return !1;
                        for (var e in a)
                            if (a.hasOwnProperty(e) && !0 !== b(a[e]))
                                return !1;
                        return !0;
                    };
                    a.a.dn = function (a, b) {
                        b = b || {
                            width: '1px',
                            height: '1px',
                            style: {
                                left: '-9999px',
                                top: '-9999px',
                                position: 'absolute'
                            }
                        };
                        for (var e in b)
                            if (b.hasOwnProperty(e))
                                if ('style' === e)
                                    if ('string' === typeof b[e])
                                        a.setAttribute(e, b[e]);
                                    else
                                        for (var c in b[e])
                                            b[e].hasOwnProperty(c) && (a[e][c] = b[e][c]);
                                else
                                    a[e] = b[e];
                    };
                    a.a.some = function (a, b) {
                        if ('object' !== typeof a || !a || 'function' !== typeof b)
                            return !1;
                        for (var e in a)
                            if (a.hasOwnProperty(e) && !0 === b(a[e]))
                                return !0;
                        return !1;
                    };
                    a.a['do'] = function (a) {
                        return void 0 === a || null === a || !1 === a || '' === a ? !0 : !1;
                    };
                    a.a.dp = function (b) {
                        return b && a.a.f(b) && 0 < b.length ? b[0] : b;
                    };
                    a.a.dq = function (b, e) {
                        var c = e || window;
                        if (!c || !c.performance || !c.performance.getEntries)
                            return { msg: 'ns' };
                        var c = c.performance.getEntries(), f = [];
                        a.a.forEach(c, function (a) {
                            b.test(a.name) && f.push(d(a));
                        });
                        return 0 === f.length ? { msg: 'nf' } : f;
                    };
                    a.a.dr = function (b, e, c) {
                        return a.a.db(b) && a.a.db(e) && a.a.db(c) ? w.abs(b - e) <= c : !1;
                    };
                    a.a.db = function (a) {
                        return 'number' === typeof a && !isNaN(a);
                    };
                    a.a.ds = function (b, e) {
                        if (!a.a.f(e))
                            return !1;
                        var c = 0;
                        a.a.forEach(e, function (a) {
                            a === b && c++;
                        });
                        return c;
                    };
                    a.a.ak = function (a) {
                        return 'string' !== typeof a ? !1 : /^(?:https?:\/\/)?[^.:\/]+(?:\.[^.:\/]+)/.test(a);
                    };
                    a.a.dt = function (b, e) {
                        return a.a.every(b, function (b) {
                            return a.a.ax(b.values, e[b.lookup] || '');
                        });
                    };
                    a.a.du = function (a, b) {
                        if (!a || 'object' !== typeof a || 'string' !== typeof b)
                            return !0;
                        var e = a[b.toLowerCase()], c = a.all;
                        return 'undefined' !== typeof e ? !1 !== e : 'undefined' !== typeof c && !1 !== c;
                    };
                    a.a.dv = function (b, e) {
                        if (!a.a.f(b))
                            return a.a.du(b, e);
                        var c = !1;
                        a.a.forEach(b, function (b) {
                            if (a.a.du(b, e))
                                return c = !0, !1;
                        });
                        return c;
                    };
                    a.a.dw = function (b, e) {
                        if (!a.a.f(b))
                            return a.a.du(b, e);
                        if (!b.length)
                            return !1;
                        var c = !0;
                        a.a.forEach(b, function (b) {
                            if (!a.a.du(b, e))
                                return c = !1;
                        });
                        return c;
                    };
                    a.a.dx = function (a, b) {
                        if (a && 'object' === typeof a) {
                            'string' !== typeof b && (b = 'all');
                            var e = a[b];
                            return 'undefined' !== typeof e ? e : a.all;
                        }
                    };
                    a.a.dy = function (a, b) {
                        if ('string' !== typeof a || 'string' !== typeof b)
                            return a;
                        a.match(b) || (a += b);
                        return a;
                    };
                    a.a.dz = function (a) {
                        return a && a._AD_FORMAT || null;
                    };
                    a.a.ea = function (b, e) {
                        var c = a.a.dz(e);
                        return !c || a.a.ax(b, c);
                    };
                    a.a.eb = f;
                    a.a.ec = f;
                    a.a.ed = f;
                    a.a.ee = f;
                    a.a.ef = function () {
                        return !0;
                    };
                    a.a.eg = function (b) {
                        var e = 'undefined' !== typeof b.x ? b.x : b.left;
                        if ('number' === typeof e) {
                            var c = 'undefined' !== typeof b.y ? b.y : b.top;
                            if ('number' === typeof c) {
                                var d, f, g, x;
                                d = b.w || b.width;
                                if ('number' === typeof d && 0 != d)
                                    g = e + d;
                                else if (g = 'undefined' !== typeof b.r ? b.r : b.right, 'number' === typeof g && g > e)
                                    d = g - e;
                                else
                                    return;
                                f = b.h || b.height;
                                if ('number' === typeof f && 0 != f)
                                    x = c + f;
                                else if (x = 'undefined' !== typeof b.b ? b.b : b.bottom, 'number' === typeof x && c < x)
                                    f = x - c;
                                else
                                    return;
                                a.a.cd(b, {
                                    x: e,
                                    y: c,
                                    w: d,
                                    h: f,
                                    r: g,
                                    b: x
                                });
                                return b;
                            }
                        }
                    };
                    a.a.eh = function (b, e, c) {
                        if ('number' !== typeof e || 0 >= e || isNaN(e))
                            e = b.length;
                        if ('number' !== typeof c || 0 >= c || isNaN(c))
                            c = w.min(b.length, 50);
                        b = a.a.ck(a.a.eg, b);
                        b.sort(function (a, b) {
                            return b.w * b.h - a.w * a.h;
                        });
                        b = b.slice(0, c);
                        var d = [];
                        a.a.forEach(b, function (b) {
                            var h = b.x, c = b.y, f = b.r, g = b.b, p = !0;
                            a.a.forEach(d, function (a) {
                                var b = a.y, e = a.r, d = a.b;
                                h >= a.x && c >= b && f <= e && g <= d && (p = !1);
                                return p;
                            }, d);
                            p && d.push(b);
                            return d.length < e;
                        });
                        return d;
                    };
                }(u));
                (function (a) {
                    a.g = {};
                    a.g.d = function (a) {
                        try {
                            var d = typeof a.location.toString;
                            if ('undefined' === d || 'unknown' === d)
                                return !0;
                            var f = typeof a.document;
                            if ('undefined' === f || 'unknown' === f)
                                return !0;
                            var g = a.innerWidth || a.document.documentElement.clientWidth || a.document.body.clientWidth || 0;
                            return 'number' !== typeof (a.screenX || a.screenLeft || 0) || 'number' !== typeof g ? !0 : !1;
                        } catch (c) {
                            return !0;
                        }
                    };
                }(u));
                (function (a) {
                    a.g.e = function (k) {
                        if (!k)
                            return null;
                        try {
                            if (k.moatHostileIframe)
                                return null;
                            var d = k.getAttribute('src');
                            if (d && d.slice && 'http' === d.slice(0, 4) && a.a.bc(d) != a.a.bc(wa.location.toString()))
                                return k.moatHostileIframe = !0, null;
                            var f = k && (k.contentDocument || k.contentWindow && k.contentWindow.document);
                            if (f && 'string' === typeof f.location.toString())
                                return f;
                            k.moatHostileIframe = !0;
                            return null;
                        } catch (g) {
                            return k.moatHostileIframe = !0, null;
                        }
                    };
                    a.g.b = function (k, d) {
                        d = d || a.a.be(k);
                        try {
                            return d && d.frameElement;
                        } catch (f) {
                            return !1;
                        }
                    };
                    a.g.f = function (k, d) {
                        var f;
                        a.a.forEach(k.getElementsByTagName('iframe'), function (a) {
                            if (a && a.contentWindow && a.contentWindow == d)
                                return f = a, !1;
                        });
                        return f;
                    };
                    a.g.g = function (k) {
                        if (k = a.g.b(k))
                            try {
                                return k.parentNode;
                            } catch (d) {
                            }
                        return null;
                    };
                    a.g.h = function (k, d) {
                        if (!k)
                            return !1;
                        var f = 0, g = [];
                        for (d = d || 10; f < d;)
                            if (f++, k = a.g.b(k))
                                g.push(k);
                            else
                                return g;
                    };
                    a.g.c = function (k, d) {
                        if (!k)
                            return !1;
                        var f = 0, g = [k], c;
                        for (d = d || 10; f < d;) {
                            f++;
                            try {
                                if (k = (c = k.frameElement) && a.a.be(c), c && k && !a.g.d(k))
                                    g.push(k);
                                else
                                    return g;
                            } catch (b) {
                                break;
                            }
                        }
                        return g;
                    };
                    a.g.i = function (k, d, f) {
                        function g(c, b, e) {
                            var h = [];
                            c && h.push(c);
                            e = e || 0;
                            if (10 < e || !c || !c.frames)
                                return h;
                            var d;
                            try {
                                d = isNaN(c.frames.length) ? 100 : c.frames.length;
                            } catch (f) {
                                d = 100;
                            }
                            for (var p = 0; p < d; p++)
                                try {
                                    try {
                                        if (void 0 == c.frames[p])
                                            break;
                                    } catch (f) {
                                        break;
                                    }
                                    b && !a.g.j(c.frames[p]) ? h.push(c.frames[p]) : h = h.concat(g(c.frames[p], b, e + 1));
                                } catch (f) {
                                    break;
                                }
                            return h;
                        }
                        return g(k, d, f);
                    };
                    a.g.k = function (a, d) {
                        d = 'number' == typeof d && 0 < d ? d : 15;
                        var f = [], g;
                        try {
                            if (a) {
                                g = a.top;
                                for (var c = 0; c < d; c++)
                                    if ((a = a.parent) && a != a.top)
                                        f.push(a);
                                    else
                                        break;
                                f.push(g);
                            }
                        } catch (b) {
                            return [];
                        }
                        return f;
                    };
                    a.g.l = [];
                    a.g.j = function (k) {
                        for (var d, f = 0, g = a.g.l.length; f < g; f++)
                            a.g.l[f].win == k && (d = a.g.l[f]);
                        if (!d) {
                            d = {
                                win: k,
                                friendly: !1
                            };
                            try {
                                k.document && (d.friendly = !0);
                            } catch (c) {
                            }
                        }
                        return d.friendly;
                    };
                    a.g.m = function (k, d, f) {
                        k = a.g.c(k).pop();
                        k = a.g.i(k, !0);
                        for (var g = 0, c = k.length; g < c; g++)
                            if (k[g] == d) {
                                if (f && d.parent && a.g.d(d.parent))
                                    break;
                                return !0;
                            }
                        return !1;
                    };
                    a.g.a = function () {
                        if (a.c.c)
                            return window.top;
                        for (var k = 0, d = window; 50 > k;) {
                            k++;
                            if (d === window.top || a.g.d(d.parent))
                                break;
                            d = d.parent;
                        }
                        return d;
                    };
                }(u));
                (function (a) {
                    function k(d) {
                        return function () {
                            var g = !1;
                            return function (c) {
                                try {
                                    return d && d.apply ? d.apply(null, arguments) : d(c);
                                } catch (x) {
                                    if (!g) {
                                        g = !0;
                                        var b = new A().getTime();
                                        this['Moat#ETS'] || (this['Moat#ETS'] = b);
                                        this['Moat#EMC'] || (this['Moat#EMC'] = 0);
                                        var e = 3600000 <= b - this['Moat#ETS'], h = '';
                                        try {
                                            h = d.toString();
                                        } catch (n) {
                                            h = 'failed';
                                        }
                                        h = x.name + ' in closure (cb): ' + x.message + ', stack=' + x.stack + ', \ncb=' + h + '\n';
                                        if (!e && 10 > this['Moat#EMC']) {
                                            this['Moat#EMC']++;
                                            try {
                                                var l = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf), p = l ? '' : document.referrer, t = 'undefined' !== typeof a && a.c && a.c.n ? a.c.n : '', q = 'https://px.moatads.com/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape('REUTERS_HEADER1') + '&ac=1&k=' + escape(h) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(t) + '&j=' + escape(p) + '&cs=' + new A().getTime();
                                                if (l)
                                                    omidNative.sendUrl(q);
                                                else {
                                                    var k = new Image(1, 1);
                                                    k.src = q;
                                                }
                                            } catch (n) {
                                            }
                                        } else if (e) {
                                            this['Moat#EMC'] = 1;
                                            this['Moat#ETS'] = b;
                                            try {
                                                p = (l = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf)) ? '' : document.referrer, t = 'undefined' !== typeof a && a.c && a.c.n ? a.c.n : '', q = 'https://px.moatads.com/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape('REUTERS_HEADER1') + '&ac=1&k=' + escape(h) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(t) + '&j=' + escape(p) + '&cs=' + new A().getTime(), l ? omidNative.sendUrl(q) : (k = new Image(1, 1), k.src = q);
                                            } catch (n) {
                                            }
                                        }
                                    }
                                }
                            };
                        }();
                    }
                    a.l = {};
                    var d = {};
                    a.l.a = d;
                    a.l.b = function (d, g) {
                        if (!d || 'string' !== typeof g || !d[g] || d == window)
                            return !1;
                        if ('string' === typeof d.nodeName && ('OBJECT' === d.nodeName || 'EMBED' === d.nodeName)) {
                            var c = a && a.b && a.b[g];
                            if (c && c !== d[g])
                                return c;
                        }
                        return !1;
                    };
                    a.l.c = function (f, g, c, b) {
                        var e, h, l = !1;
                        'touchstart' === g && a.c.o && (l = { passive: !0 });
                        b ? d[g + b] ? c = d[g + b] : (c = k(c), d[g + b] = c) : c = k(c);
                        if (f.addEventListener)
                            b = 'addEventListener', e = '';
                        else if (f.attachEvent)
                            b = 'attachEvent', e = 'on';
                        else
                            return !1;
                        if (h = a.l.b(f, b))
                            try {
                                h.call(f, e + g, c, l);
                            } catch (p) {
                                f[b](e + g, c, l);
                            }
                        else if (f && b && f[b])
                            try {
                                f[b](e + g, c, l);
                            } catch (p) {
                                return !1;
                            }
                    };
                    a.l.d = function (f, g, c, b) {
                        var e, h;
                        c = b ? d[g + b] : c;
                        delete d[g + b];
                        if (!f)
                            return !1;
                        if (f.removeEventListener)
                            b = 'removeEventListener', e = '';
                        else if (f.detachEvent)
                            b = 'detachEvent', e = 'on';
                        else
                            return !1;
                        if (h = a.l.b(f, b))
                            try {
                                h.call(f, e + g, c, !1);
                            } catch (l) {
                                f[b](e + g, c, !1);
                            }
                        else
                            try {
                                f[b](e + g, c, !1);
                            } catch (l) {
                            }
                    };
                    a.l.e = function (d, g) {
                        d = k(d);
                        var c;
                        window && window.setInterval && (c = window.setInterval(d, g), 1 == c && (a.a.b(c), c = window.setInterval(d, g)), X.push(c));
                        return c;
                    };
                    a.l.f = function (d, g) {
                        var c, b = k(function (a) {
                                delete O[c];
                                return d && d.apply ? d.apply(null, arguments) : d(a);
                            });
                        window && window.setTimeout && (c = window.setTimeout(b, g), 1 == c && (a.a.a(c), c = window.setTimeout(b, g)), O[c] = !0);
                        return c;
                    };
                    a.l.g = function (d, g, c, b) {
                        if (!b)
                            return !1;
                        b += '';
                        F[b] && a.a.a(F[b].tid);
                        F[b] = {};
                        F[b].callback = k(d);
                        F[b].params = g;
                        F[b].interval = c;
                        F[b].tid = a.l.f(a.l.h(b), c);
                    };
                    a.l.h = function (d) {
                        return function () {
                            if (!F || !F[d])
                                return !1;
                            var g = F[d].callback(F[d].params);
                            if ('boolean' === typeof g && !1 === g)
                                return a.a.a(F[d].tid), F[d] = !1;
                            F[d].tid = a.l.f(a.l.h(d), F[d].interval);
                        };
                    };
                    a.l.i = function (d) {
                        F[d] && (a.a.a(F[d].tid), F[d] = !1);
                    };
                    a.l.j = function () {
                        return F;
                    };
                    a.l.k = function (d, g, c, b) {
                        var e = 0, h = function () {
                                e += 1;
                                !0 !== d() && (e < g ? a.l.f(h, c) : 'function' === typeof b && b());
                            };
                        h();
                    };
                    a.l.l = k;
                }(u));
                (function (a) {
                    function k() {
                        if ('number' === typeof a.a.r())
                            return !1;
                        var d = a.a.k();
                        return (d = d && d.match(/Chrom(e|ium)\/([0-9]+)\./)) ? parseInt(d[2], 10) : !1;
                    }
                    a.c = {};
                    var d = a.g.d(window.parent);
                    a.c.p = window != window.parent;
                    a.c.q = a.c.p && !d;
                    a.c.c = d ? !1 : !a.g.d(window.top);
                    a.c.e = a.c.c ? window.top : a.c.q ? window.parent : window;
                    a.c.r = function (a) {
                        var d, c, b, e = 0, h = 0;
                        try {
                            (d = a.document, c = d.documentElement, b = d.body, 'undefined' !== typeof a.innerWidth) ? (e = a.innerWidth, h = a.innerHeight) : 'CSS1Compat' === d.compatMode && 5 !== d.documentMode || !b || 'undefined' === typeof b.clientWidth ? c && 'undefined' !== typeof c.clientWidth && (e = c.clientWidth, h = c.clientHeight) : (e = b.clientWidth, h = b.clientHeight);
                        } catch (l) {
                        }
                        return {
                            width: e,
                            height: h,
                            left: 0,
                            right: e,
                            top: 0,
                            bottom: h
                        };
                    };
                    a.c.s = function () {
                        if (!a.c.e || !a.c.e.screen)
                            return null;
                        var d = a.c.e.screen;
                        return {
                            width: d.width,
                            height: d.height,
                            availWidth: d.availWidth,
                            availHeight: d.availHeight
                        };
                    };
                    a.c.t = function () {
                        var d = a.c.e;
                        if (!d)
                            return !1;
                        try {
                            var g = d.document && d.document.body, c = d.document && d.document.documentElement;
                        } catch (e) {
                        }
                        try {
                            var b = a.c.s();
                            b && (a.c.u = b.availWidth, a.c.v = b.availHeight, a.c.w = b.width, a.c.x = b.height);
                        } catch (e) {
                            a.c.u = a.c.u || 0, a.c.v = a.c.v || 0, a.c.w = a.c.w || 0, a.c.x = a.c.x || 0;
                        }
                        b = a.c.r(d);
                        a.c.y = b.width;
                        a.c.z = b.height;
                        try {
                            a.c.aa = d.outerWidth || d.document && d.document.body && d.document.body.offsetWidth || 0, a.c.ab = d.outerHeight || d.document && d.document.body && d.document.body.offsetHeight || 0;
                        } catch (e) {
                            a.c.aa = 0, a.c.ab = 0;
                        }
                        g && c && (a.c.h = w.max(g.scrollHeight, g.offsetHeight, c.clientHeight, c.scrollHeight, c.offsetHeight), a.c.ac = g.scrollTop || c.scrollTop || d.pageYOffset || 0);
                    };
                    a.c.t();
                    a.c.b = 0 <= String(Function.prototype.toString).indexOf('[native code]');
                    a.c.ad = -1 !== a.a.k().toLowerCase().indexOf('firefox');
                    a.c.j = a.a.t();
                    a.c.ae = !!window.chrome && a.a.j(window.chrome.csi, !0);
                    a.c.af = !!('opr' in window && 'addons' in window.opr && a.a.j(window.DetachedViewControlEvent));
                    a.c.ag = !a.c.ae && Error.propertyIsEnumerable('captureStackTrace') && void 0 !== window.onorientationchange;
                    a.c.ah = a.c.af || a.c.ag;
                    a.c.ai = a.c.ae && (!!window.Atomics && !!window.Atomics.notify || !!window.EnterPictureInPictureEvent || !!window.chrome.webstore);
                    a.c.aj = a.c.ae && !a.c.ah && void 0 !== window.onorientationchange;
                    a.c.ak = a.c.ai || a.c.aj;
                    a.c.al = navigator && navigator.appVersion && -1 < navigator.appVersion.search(/Edge\/\d*.\d*/) && !document.documentMode && !!window.StyleMedia;
                    a.c.m = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') || window.HTMLVideoElement && window.HTMLVideoElement.prototype && 'webkitWirelessVideoPlaybackDisabled' in window.HTMLVideoElement.prototype;
                    a.c.am = function () {
                        var d;
                        return function () {
                            if ('undefined' !== typeof d)
                                return d;
                            d = {
                                isInApp: 0,
                                env: 'Not app'
                            };
                            a.a.p() ? (d.isInApp = 1, d.env = 'tvOS') : a.a.o() ? (d.isInApp = 1, d.env = 'iOS') : a.a.q() && (d.isInApp = 1, d.env = 'Android');
                            return d;
                        };
                    }();
                    a.c.an = k;
                    a.c.ao = a.c.ai && 40 <= k();
                    a.c.ap = function () {
                        if (!a.c.ao)
                            return !1;
                        var d = a.f.a([
                            48,
                            30,
                            27,
                            29,
                            43,
                            34,
                            47,
                            30,
                            43
                        ]);
                        if (navigator && navigator[d])
                            return !0;
                        if (66 > k()) {
                            var d = a.f.a([
                                    28,
                                    33,
                                    43,
                                    40,
                                    38,
                                    30
                                ]), g = a.f.a([
                                    43,
                                    46,
                                    39,
                                    45,
                                    34,
                                    38,
                                    30
                                ]), c = a.f.a([
                                    28,
                                    40,
                                    39,
                                    39,
                                    30,
                                    28,
                                    45
                                ]);
                            return 'undefined' !== typeof window[d] && !(window[d] && window[d][g] && window[d][g][c]);
                        }
                        return !1;
                    };
                    a.c.aq = function () {
                        if (a.f.b !== a.f.c.toString())
                            return !1;
                        var d = a.f.a([
                            48,
                            30,
                            27,
                            29,
                            43,
                            34,
                            47,
                            30,
                            43
                        ]);
                        return window && window.navigator && window.navigator[d];
                    };
                    a.c.ar = function () {
                        if (a.f.b !== a.f.d.toString())
                            return !1;
                        var d = a.f.a([
                                26,
                                37,
                                30,
                                43,
                                45
                            ]), g = a.f.a([
                                28,
                                40,
                                39,
                                31,
                                34,
                                43,
                                38
                            ]), c = a.f.a([
                                41,
                                43,
                                40,
                                38,
                                41,
                                45
                            ]);
                        return !a.c.am().isInApp && a.c.m && a.c.b && !a.a.j(window[d], !0) && !a.a.j(window[g], !0) && !a.a.j(window[c], !0);
                    };
                }(u));
                (function (a) {
                    function k() {
                        var a = 19 .toString(2).length - 1, c = 1;
                        return function () {
                            c <<= 1;
                            0 != c >> a && (c ^= 19);
                            return c;
                        };
                    }
                    function d(a) {
                        return 9 === a ? 30 : 10 === a ? 31 : a;
                    }
                    a.f = {};
                    a.f.e = 0;
                    a.f.c = 1;
                    a.f.f = 2;
                    a.f.d = 3;
                    a.f.g = 4;
                    var f = a.a.d;
                    a.f.h = function (a) {
                        for (var c = '', b = 0; b < a.length; b++)
                            var e = a.charCodeAt(b) ^ 85, c = c + String.fromCharCode(e);
                        a = c;
                        for (var c = '', e = b = 0, h, d, p, t = 0; t < a.length; ++t)
                            for (p = a.charCodeAt(t), d = 255 < p ? 0 : 1; 2 > d; ++d)
                                b = 0 === d ? b | (p & 65280) / 256 << e : b | (p & 255) << e, e += 8, 13 < e && (h = b & 8191, 88 < h ? (b >>= 13, e -= 13) : (h = b & 16383, b >>= 14, e -= 14), c += f.charAt(h % 91), c += f.charAt(h / 91 | 0));
                        0 < e && (c += f.charAt(b % 91), 7 < e || 90 < b) && (c += f.charAt(b / 91 | 0));
                        return c;
                    };
                    a.f.i = function (a) {
                        var c = [];
                        if ('undefined' !== typeof a)
                            for (var b = 0; b < a.length; b++) {
                                var e = a.charCodeAt(b);
                                128 > e ? c.push(e) : 2048 > e ? c.push(192 | e >> 6, 128 | e & 63) : 55296 > e || 57344 <= e ? c.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : b < a.length - 1 && (b++, e = 65536 + ((e & 1023) << 10 | a.charCodeAt(b) & 1023), c.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63));
                            }
                        b = w.floor(1000 * w.random()) % 251;
                        a = [40 * b % 251];
                        for (e = 0; e < c.length; e++)
                            b = (b * b + (e + 1)) % 251, a.push(c[e] ^ b);
                        if ('function' !== typeof window.btoa)
                            c = '';
                        else {
                            c = [];
                            for (b = 0; b < a.length; b++)
                                c.push(String.fromCharCode(a[b]));
                            c = btoa(c.join(''));
                        }
                        return c;
                    };
                    a.f.j = function (a) {
                        for (var c = '', b = k(), e = 0; e < a.length; e++) {
                            var h;
                            h = d(a.charCodeAt(e));
                            var l = 0 === e % 2 ? b() : -1 * b();
                            h = 0 === l ? h : 126 < h + l ? 30 + (l - (126 - h) - 1) : 30 > h + l ? 126 + (l + (h - 30) + 1) : h + l;
                            c += String.fromCharCode(30 === h ? 9 : 31 === h ? 10 : h);
                        }
                        return c;
                    };
                    a.f.k = function (a) {
                        for (var c = '', b = k(), e = 0; e < a.length; e++) {
                            var h = b(), l;
                            l = d(a[e].charCodeAt(0));
                            h = 0 === e % 2 ? h : -1 * h;
                            l = 0 === h ? l : 30 > l - h ? 126 - (h - (l - 30) - 1) : 126 < l - h ? 30 - (h + (126 - l) + 1) : l - h;
                            c += String.fromCharCode(30 === l ? 9 : 31 === l ? 10 : l);
                        }
                        return c;
                    };
                    a.f.l = function (d, c) {
                        var b = [];
                        a.a.forEach(d, function (a, h) {
                            if (void 0 !== a && ('string' === typeof (c ? a[c] : a) || 'number' === typeof (c ? a[c] : a) || 'boolean' === typeof (c ? a[c] : a))) {
                                var d = String(c ? a[c] : a).split('&').join('%26').split('=').join('%3D');
                                b.push(('number' === typeof h ? '' : h + '=') + d);
                            }
                        }, null, !0);
                        b.sort();
                        return b.join('&');
                    };
                    a.f.a = a.a.e;
                    a.f.m = function () {
                        var d = document && document.documentElement && document.documentElement.style || {};
                        a.f.n = [
                            !0 === (!!window.chrome && (!!window.Atomics && !!window.Atomics.notify || !!window.EnterPictureInPictureEvent || !!window.chrome.webstore)) ? 1 : 0,
                            !0 === ('undefined' !== typeof InstallTrigger || 'MozAppearance' in d) ? 1 : 0,
                            !0 === !!window.opera ? 1 : 0,
                            !0 === a.c.m ? 1 : 0,
                            !0 === (!+'\x0B1' || !!document.documentMode || !!window.ActiveXObject || '-ms-scroll-limit' in d && '-ms-ime-align' in d) ? 1 : 0
                        ];
                        for (var d = !1, c = 0; c < a.f.n.length; c++)
                            if (1 === a.f.n[c]) {
                                d = c;
                                break;
                            }
                        !1 !== d && (a.f.b = d);
                        return a.f.b;
                    };
                    a.f.b = a.f.m();
                }(u));
                (function (a) {
                    function k() {
                        return !1;
                    }
                    a.c.as = '26';
                    a.c.at = 'MoatSuperV';
                    a.c.au = '-';
                    a.c.f = function (b) {
                        'string' !== typeof a.c.g && (a.c.au = b);
                    };
                    a.c.av = {};
                    a.c.aw = a.c.at + a.c.as;
                    a.c.n = 11;
                    a.c.ax = window && window['Moat#G' + a.c.as] || {};
                    a.c.ay = 'Moat#G' + a.c.as;
                    window[a.c.ay] = a.c.ax;
                    a.c.ax.a || (a.c.ax.a = w.floor(w.random() * w.pow(10, 12)));
                    a.c.az = w.floor(w.random() * w.pow(10, 12));
                    var d = a.a.ac();
                    a.c.ba = d.url;
                    a.c.bb = d.isCorrect;
                    d = a.l.l(function () {
                        return navigator.userAgent;
                    });
                    a.c.bc = d();
                    'string' !== typeof a.c.bc && (a.c.bc = '');
                    a.c.bd = function () {
                        return function () {
                        };
                    }();
                    a.c.be = function () {
                        return !!window.omid3p && 'undefined' !== typeof window.omid3p.customNative;
                    };
                    a.c.bf = function () {
                        return !1;
                    };
                    a.c.bg = function () {
                        var b = a.c.bf() || a.c.be();
                        return function () {
                            return b;
                        };
                    }();
                    a.c.bh = function () {
                        return function () {
                        };
                    }();
                    a.c.bi = function () {
                        return function () {
                            return !1;
                        };
                    }();
                    a.c.bj = new A().getTime();
                    a.c.bk = !0;
                    a.c.bl = !0;
                    a.c.bm = !1;
                    a.c.bm = !0;
                    a.c.bn = function (a, b) {
                        a = a.split('.');
                        b = b.split('.');
                        for (var e = 0; 3 > e; e++) {
                            var c = parseInt(a[e]), d = parseInt(b[e]);
                            if (c && isNaN(d))
                                return 1;
                            if (d && isNaN(c))
                                return 0;
                            if (c > d)
                                return 1;
                            if (d > c)
                                return 0;
                        }
                        return 2;
                    };
                    a.c.bo = k;
                    a.c.bp = k;
                    a.c.bq = k;
                    a.c.br = k;
                    a.c.bs = k;
                    a.c.bt = k;
                    a.c.bu = k;
                    a.c.bv = k;
                    var f = function () {
                        var b = function (b) {
                                if (a.c.am().isInApp)
                                    return !1;
                                var e = a.m && a.m.a();
                                if (a.c.bw || e || a.c.bx())
                                    return a.c.bw || e || a.c.bx(), !1;
                                b = a.a.co(b, ['$sf']);
                                if (!b)
                                    return !1;
                                var h = b.ext;
                                b = h && h.geom;
                                var e = [
                                        [
                                            'exp',
                                            'b',
                                            't',
                                            'l',
                                            'r'
                                        ],
                                        'self b t l r h w xiv yiv'.split(' ')
                                    ], c, d = !1;
                                if (h && b && 'function' === typeof b)
                                    try {
                                        if ((b = b()) && b.win) {
                                            if (a.a.forEach(b.win, function (a) {
                                                    if (a && ('number' === typeof a || 'string' === typeof a) && 0 !== parseFloat(a, 10))
                                                        return d = !0, !1;
                                                }), !d)
                                                return !1;
                                        } else
                                            return !1;
                                        if (b.par)
                                            return !0;
                                        for (var h = 0, l = e.length; h < l; h++) {
                                            c = e[h][0];
                                            for (var g = 1, f = e[h].length; g < f; g++)
                                                if ('undefined' === typeof b[c][e[h][g]])
                                                    return !1;
                                        }
                                        return !0;
                                    } catch (p) {
                                    }
                                return !1;
                            }, e, c, d, g;
                        a.c.by = function () {
                            if (g)
                                return !0;
                            e = window;
                            c = document;
                            g = b(e);
                            d = !(!g && !e.$sf);
                            if (!g && a.c.q)
                                for (var f = 0; 20 > f && !g; f++) {
                                    var x = a.g.b(c.body);
                                    if (!1 !== x && !x)
                                        break;
                                    c = (e = a.a.be(x)) && e.document;
                                    g = g || b(e);
                                    d = d || g || e.$sf;
                                }
                            return g;
                        };
                        a.c.bz = function () {
                            return a.c.by() && e;
                        };
                        a.c.ca = function () {
                            'undefined' === typeof g && a.c.by();
                            return d;
                        };
                    };
                    a.c.cb = !1;
                    a.c.cc = !1;
                    a.c.cd = null;
                    a.c.bz = function () {
                        f();
                        return a.c.bz();
                    };
                    a.c.ca = function () {
                        f();
                        return a.c.ca();
                    };
                    a.c.by = function () {
                        f();
                        return a.c.by();
                    };
                    var g = function () {
                        var b = function (b) {
                                return a.c.ce() ? !1 : a.a.co(b, [
                                    'context',
                                    'observeIntersection'
                                ]) ? !0 : !1;
                            }, e = window, c = document, d = b(e), g = !(!d && !e.context);
                        if (!d && a.c.q)
                            for (var f = 0; 20 > f && !d; f++) {
                                c = a.g.b(c.body);
                                if (!1 !== c && !c)
                                    break;
                                c = (e = a.a.be(c)) && e.document;
                                d = d || b(e);
                                g = g || d || e.context;
                            }
                        a.c.cf = function () {
                            return d && e;
                        };
                        a.c.cg = function (a) {
                            'boolean' === typeof a && (d = a);
                            return d;
                        };
                        a.c.ch = function () {
                            return g;
                        };
                    };
                    a.c.cf = function () {
                        g();
                        return a.c.cf();
                    };
                    a.c.ch = function () {
                        g();
                        return a.c.ch();
                    };
                    a.c.cg = function () {
                        g();
                        return a.c.cg();
                    };
                    a.c.ci = function () {
                        var b = a.a.dk('context');
                        if (b && a.a.co(b, ['observeIntersection']))
                            return b;
                        b = a.a.dk('AMP_CONTEXT_DATA');
                        if (a.a.co(b, ['initialIntersection']))
                            return b;
                    };
                    var c = function () {
                        var b, e = function (e) {
                                return (b = a.a.co(e, ['amazonmobileadsviewablebridge'])) && 'function' === typeof b.addEventListener && 'function' === typeof b.getVersion ? !0 : b = !1;
                            }, c = document, d = window, g = e(d), f = b && 1.1 <= b.getVersion();
                        if (!g && a.c.q)
                            for (var x = 0; 20 > x && !g; x++) {
                                c = a.g.b(c.body);
                                if (!1 !== c && !c)
                                    break;
                                c = (d = a.a.be(c)) && d.document;
                                g = g || e(d);
                                f = f || b && 1.1 <= b.getVersion();
                            }
                        a.c.cj = function () {
                            return g && d;
                        };
                        a.c.ck = function () {
                            return g;
                        };
                        a.c.cl = function () {
                            return f;
                        };
                        a.c.cm = function () {
                            return b;
                        };
                    };
                    a.c.cj = function () {
                        c();
                        return a.c.cj();
                    };
                    a.c.ck = function () {
                        c();
                        return a.c.ck();
                    };
                    a.c.cl = function () {
                        c();
                        return a.c.cl();
                    };
                    a.c.cm = function () {
                        c();
                        return a.c.cm();
                    };
                    a.c.cn = function () {
                        return a.c.ck() && a.c.cl();
                    };
                    a.c.o = function () {
                        var a = !1;
                        try {
                            var b = Object.defineProperty({}, 'passive', {
                                get: function () {
                                    a = !0;
                                }
                            });
                            window.addEventListener('test', null, b);
                            window.removeEventListener('test', null, b);
                        } catch (e) {
                        }
                        return a;
                    }();
                    a.c.co = function () {
                        var b;
                        return function () {
                            if ('undefined' !== typeof b)
                                return b;
                            var e = a.c.e, c = a.a.bq();
                            if (a.c.e.navigator.standalone)
                                b = !0;
                            else {
                                var d = e.innerWidth / c.w, e = e.innerHeight / c.h, d = !isNaN(d) && isFinite(d) && 0.9 <= d && 1.1 >= d, e = !isNaN(e) && isFinite(e) && 0.75 <= e && 1.1 >= e;
                                b = d && e;
                            }
                            a.c.e.MoatMAK ? a.c.e.MoatMAK.namespace && (b = !1) : (d = a.c.e) && d.imraid && 'function' === typeof d.imraid.getVendorName && 'inmobi' === d.imraid.getVendorName() && (b = !1);
                            return b;
                        };
                    }();
                    a.c.cp = function () {
                        var b = a.c.am().isInApp ? 0 : void 0;
                        a.c.ce() ? b = 3 : a.c.cq() && (b = 1);
                        return b;
                    };
                    a.c.cq = function () {
                        var b = a.c.co(), e = a.a.ao(), c = a.c.bo(), d = window.location && ('applewebdata:' === window.location.protocol || 'data:' === window.location.protocol);
                        if ('-' === e || '' === e.replace(/^\s+|\s+$/gm, '') || c || d)
                            return !1;
                        if (b || a.a.bl(a.c.bc))
                            return !0;
                        b = a.a.ap(a.c.d);
                        return a.c.cr(b) ? !0 : !1;
                    };
                    a.c.cr = function (b) {
                        var e = !1;
                        if (b) {
                            var c = [
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    48,
                                    26,
                                    37,
                                    38,
                                    26,
                                    43,
                                    45,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    50,
                                    26,
                                    33,
                                    40,
                                    40,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    31,
                                    40,
                                    49,
                                    39,
                                    30,
                                    48,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    38,
                                    26,
                                    34,
                                    37,
                                    72,
                                    50,
                                    26,
                                    33,
                                    40,
                                    40,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    28,
                                    33,
                                    30,
                                    44,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    41,
                                    28,
                                    33,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    28,
                                    40,
                                    40,
                                    37,
                                    38,
                                    26,
                                    45,
                                    33,
                                    32,
                                    26,
                                    38,
                                    30,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    32,
                                    37,
                                    40,
                                    27,
                                    40,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    28,
                                    26,
                                    43,
                                    32,
                                    46,
                                    43,
                                    46,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    38,
                                    26,
                                    34,
                                    37,
                                    72,
                                    26,
                                    40,
                                    37,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    28,
                                    39,
                                    39,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    54,
                                    56,
                                    59,
                                    44,
                                    41,
                                    40,
                                    43,
                                    45,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    41,
                                    30,
                                    40,
                                    41,
                                    37,
                                    30,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    45,
                                    33,
                                    30,
                                    29,
                                    30,
                                    37,
                                    34,
                                    45,
                                    30,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    33,
                                    46,
                                    37,
                                    46,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    33,
                                    37,
                                    39,
                                    72,
                                    27,
                                    30
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    44,
                                    41,
                                    26,
                                    43,
                                    36,
                                    39,
                                    40,
                                    45,
                                    30,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    37,
                                    40,
                                    45,
                                    45,
                                    40,
                                    72,
                                    41,
                                    28,
                                    33,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    28,
                                    39,
                                    30,
                                    45,
                                    72,
                                    28,
                                    40,
                                    38
                                ]),
                                a.f.a([
                                    48,
                                    48,
                                    48,
                                    72,
                                    26,
                                    37,
                                    37,
                                    43,
                                    30,
                                    28,
                                    34,
                                    41,
                                    30,
                                    44,
                                    72,
                                    28,
                                    40,
                                    38
                                ])
                            ];
                            a.a.forEach(c, function (a) {
                                if (0 == b.indexOf(a) || 0 == b.indexOf('https://' + a))
                                    return e = !0, !1;
                            });
                        }
                        return e;
                    };
                    a.c.ce = function () {
                        var b;
                        return function () {
                            if ('undefined' !== typeof b)
                                return b;
                            var e = a.a.q() || a.a.o();
                            return b = a.c.cs() || e && a.c.bg() || a.c.bi() ? !0 : a.c.cq() ? !1 : e;
                        };
                    }();
                    a.c.ct = function () {
                        return a.c.e.webkit && a.c.e.webkit.messageHandlers && a.c.e.webkit.messageHandlers.__z_moat_bridge__;
                    };
                    a.c.cs = function () {
                        return !1;
                    };
                    a.c.cu = function () {
                        return !1;
                    };
                    a.c.cv = function (b) {
                        return a.n && a.n.a(b);
                    };
                    a.c.cw = function () {
                        return !1;
                    };
                    a.c.cx = function () {
                        return !1;
                    };
                    a.c.cy = function () {
                        return !1;
                    };
                    a.c.cz = function () {
                        return !1;
                    };
                    a.c.da = function () {
                        if (a.c.cy() || a.c.cz())
                            return !0;
                        var b = !1;
                        return a.c.c || a.c.cc ? b = b || a.c.cc || a.c.cq() || a.c.br() || a.c.cn() : b;
                    };
                    a.c.protocol = a.a.ce();
                    a.c.db = a.a.l();
                    a.c.dc = !a.c.c;
                    a.c.dd = function (b) {
                        var e = 0;
                        b = b || window;
                        try {
                            if (!a.c.c) {
                                var c;
                                for (c = 0; 20 > c && b != window.top; c++)
                                    b = b.parent;
                                e = c;
                            }
                        } catch (d) {
                        }
                        return e;
                    };
                    a.c.c || a.a.ab() || 1 == a.c.dd(a.g.a()) ? a.c.de = 1 : a.c.de = 0;
                    a.c.e[a.c.ay] || (a.c.e[a.c.ay] = new a.c.e.Object());
                    a.c.am().isInApp && a.c.c && (a.c.c = a.c.da() || a.c.ce());
                    a.c.df = function () {
                        return !1;
                    };
                    a.c.dg = function () {
                        return !1;
                    };
                    a.c.d = a.c.e.document.referrer || '';
                    try {
                        a.c.dh = a.c.e.history && a.c.e.history.length;
                    } catch (h) {
                    }
                    a.c.di = function () {
                        if (B)
                            for (var a in B)
                                if (B.hasOwnProperty(a))
                                    return !0;
                        return !1;
                    };
                    a.c.dj = function (b) {
                        var e = !0;
                        a.a.forEach(b && b.parentNode && b.parentNode.childNodes, function (b) {
                            if (a.a.ax([
                                    'DIV',
                                    'IFRAME',
                                    'A',
                                    'EMBED',
                                    'OBJECT'
                                ], b.nodeName))
                                return e = !1;
                        });
                        return e;
                    };
                    a.c.dk = function () {
                        for (var a in B)
                            if (B.hasOwnProperty(a)) {
                                var b = B[a];
                                if (b && b.aa && b.aa[D])
                                    return !0;
                            }
                        return !1;
                    };
                    a.c.dl = function () {
                        return a.c.am().isInApp ? a.c.cq() ? a.c.c : a.c.da() : a.c.c;
                    };
                    a.c.bx = function () {
                        return a.c.dm && a.c.dm();
                    };
                    a.c.dn = function () {
                        return a.c.cb;
                    };
                    a.c['do'] = function () {
                        return a.c.by && a.c.by();
                    };
                    a.c.dp = function () {
                        return a.c.cg && a.c.cg();
                    };
                    a.c.dq = function () {
                        return a.m && a.m.a();
                    };
                    a.c.dr = function (b) {
                        var e = !1;
                        a.o && a.o.a && (b && b.periscopeManager ? b.periscopeManager.measurable && (e = !0) : e = !0);
                        return e;
                    };
                    a.c.ds = function (b) {
                        return a.c.dq() || a.c.dr(b);
                    };
                    a.c.dt = function (b, e) {
                        return !b || b && b.isMeasurabilityDisabled() || a.d.c() && !e ? !1 : a.c.dl() || a.c.du() || void 0;
                    };
                    a.c.dv = function (b) {
                        if (!b || b && b.isMeasurabilityDisabled() || a.d.c())
                            return !1;
                        var e = !1;
                        a.m && a.m.a() ? e = !0 : a.o && a.o.a && b.periscopeManager && b.periscopeManager.fullyMeasurable && b.ao && 1 != b.ao.skin && (e = !0);
                        return a.c.dl() || a.c.du() || e;
                    };
                    a.c.dw = function () {
                        a.c.bk = !1;
                        a.c.bl = !0;
                        a.c.bm = !0;
                    };
                    a.c.dx = !0;
                    a.c.dy = !0;
                    'mlb.com' === a.a.ao() && (a.a.bj() || a.a.bk()) && (a.c.dy = !1);
                    a.c.dz = function () {
                        return !1;
                    };
                    a.c.ea = function () {
                        a.c.ce();
                        return !1;
                    };
                    a.c.eb = function () {
                        return !1;
                    };
                    a.c.ec = function () {
                        return !1;
                    };
                    a.c.ed = function () {
                        var b = a.c.bc;
                        return (b = b && b.match(/Firefox\/([0-9]+)\./)) ? parseInt(b[1], 10) : !1;
                    };
                    a.c.bw = !1;
                    a.c.ee = !1;
                    a.c.a = new a.c.e.Image();
                    a.c.k = function () {
                        if ('undefined' !== typeof a.c.e['Moat#EVA'])
                            return !0;
                        try {
                            if ('undefined' !== typeof a.c.e.eval && (a.c.e.eval('(function(win){ win[\'Moat#EVA\'] = true; })(window)'), 'undefined' !== typeof a.c.e['Moat#EVA']))
                                return !0;
                        } catch (b) {
                        }
                        return !1;
                    };
                    a.c.l = function (a) {
                        try {
                            return new a.Function(''), !0;
                        } catch (b) {
                            return !1;
                        }
                    };
                    a.c.ef = function () {
                        var a = navigator && navigator.appVersion && navigator.appVersion.match(/Windows NT (\d\d{0,1}\.\d)/);
                        return a ? parseFloat(a[1]) : -1;
                    };
                    a.c.eg = function () {
                        return 6.1 === a.c.ef();
                    };
                    a.c.eh = function () {
                        var b = a.c.e;
                        return b.navigator && 'function' === typeof b.navigator.getBattery;
                    };
                    a.c.du = function () {
                        return !1;
                    };
                    a.c.ei = function () {
                        return !1;
                    };
                    a.c.ej = a.a.br();
                    a.c.ek = function (b) {
                        return b = (b = a.c.ej) || a.a.bs();
                    };
                    var b = {
                            a: 'a',
                            b: 'b',
                            c: 'c',
                            d: 'd',
                            e: 'e',
                            f: 'f'
                        }, e = {
                            a: 'waiting',
                            b: 'noHistData',
                            c: 'dataAvailable',
                            d: 'slotWaiting',
                            e: 'slotNoHistData',
                            f: 'slotNoSlotData'
                        };
                    a.c.el = function () {
                        var c = {};
                        a.a.forEach(b, function (a, b) {
                            c[a] = e[b];
                        });
                        a.a.forEach(e, function (a, b) {
                            c[a] = a;
                        });
                        return c;
                    }();
                    a.c.em = e;
                }(u));
                (function (a) {
                    function k(a, f, g) {
                        function c(a, b) {
                            for (var c in a)
                                a.hasOwnProperty(c) && b.call(null, a[c], c);
                        }
                        function b(a) {
                            var b = [];
                            c(a, function (a, e) {
                                b.push(e);
                            });
                            return b;
                        }
                        a = f[a];
                        a && a.xa.sode || (a.xa.sode = function () {
                            this.desw = {};
                            this.xfgf = [];
                            this.publishing_ = !1;
                            this.xkcd = {};
                            this.edws = [];
                        }, a.xa.sode.prototype.uxin = function () {
                            var a = function (a) {
                                a = g.max(4, a);
                                return ((1 + g.random()) * g.pow(16, a) | 0).toString(16).substring(0, a);
                            };
                            return function (b) {
                                return a(4) + '-' + a(4) + '-' + a(4) + '-' + a(4);
                            };
                        }(), a.xa.sode.prototype.xsza = function (a) {
                            this.desw[a] || (this.desw[a] = {});
                            return this.desw[a];
                        }, a.xa.sode.prototype.esgf = function (a, b) {
                            this.publishing_ ? this.xfgf.push(arguments) : this.zaxs.apply(this, arguments);
                        }, a.xa.sode.prototype.kswa = function (a, b) {
                            for (var c = this.xkcd[a] || [], d = c && c.length, g = 0; g < d; g++)
                                if (c[g] === b)
                                    return !1;
                            c.push(b);
                            c.sort(function (a, b) {
                                return a - b;
                            });
                            this.xkcd[a] = c;
                        }, a.xa.sode.prototype.aksw = function (a, b) {
                            if (!this.xkcd[a])
                                return !1;
                            for (var c = this.xkcd[a], d = -1, g = c && c.length, f = 0; f < g; f++)
                                if (c[f] === b) {
                                    d = f;
                                    break;
                                }
                            -1 != d && c.splice(d, 1);
                            this.xkcd[a] = c;
                        }, a.xa.sode.prototype._getEventPriorities_ = function (a) {
                            return this.xkcd[a] || [];
                        }, a.xa.sode.prototype.azsx = function (a, b, c) {
                            c = c || {};
                            var d = c.id || this.uxin(), g;
                            g = c.priority;
                            g = !isNaN(g) && isFinite(g) ? parseInt(g, 10) : 10;
                            for (var f = this.xsza(a), k = 0; f[d] && !c.id && 10 > k;)
                                k++, d = this.uxin();
                            f[g] || (f[g] = {});
                            this.kswa(a, g);
                            c.priority = g;
                            f[g][d] = {
                                cb: b,
                                options: c
                            };
                            return d;
                        }, a.xa.sode.prototype.zaxs = function (a, b) {
                            if (!this.desw[a])
                                return !1;
                            this.publishing_ = !0;
                            for (var c = this.edws.slice.call(arguments, 1), d = this._getEventPriorities_(a).slice(0), g = 0, f = d.length; g < f; g++) {
                                var k = this.desw[a][d[g]], x;
                                for (x in k)
                                    if (k.hasOwnProperty(x)) {
                                        var n = k[x];
                                        if (n) {
                                            var m;
                                            m = n.options && n.options.includeId ? [x].concat(c) : c;
                                            if (!n.options || !n.options.condition || n.options.condition && n.options.condition.apply(null, m))
                                                n.options && n.options.once && 'undefined' !== typeof n.options.priority && this.sxaz(a, {
                                                    id: x,
                                                    priority: n.options.priority
                                                }), n.cb.apply(null, m);
                                        }
                                    }
                            }
                            this.publishing_ = !1;
                            for (c = 0; 0 < this.xfgf.length && 500 > c; c++)
                                this.zaxs.apply(this, this.xfgf.pop());
                        }, a.xa.sode.prototype.swaq = function (a, c, d) {
                            var g = !1;
                            if (this.desw[a] && this.desw[a][d])
                                try {
                                    delete this.desw[a][d][c], g = !0;
                                } catch (f) {
                                }
                            0 === b(this.desw[a][d]).length && this.aksw(a, d);
                            return g;
                        }, a.xa.sode.prototype.sxaz = function (a, b) {
                            if (!b || 'object' != typeof b || !this.desw[a])
                                return !1;
                            if (b.id && void 0 !== b.priority)
                                return this.swaq(a, b.id, b.priority);
                            if (b.id || b.callback)
                                for (var c = this._getEventPriorities_(a), d = 0, g = c.length; d < g; d++) {
                                    var f = c[d];
                                    if (b.id && b.callback) {
                                        if (this.desw[a][f][b.id] && this.desw[a][f][b.id].cb == b.callback)
                                            return this.swaq(a, b.id, f);
                                    } else if (b.id) {
                                        if (this.desw[a][f][b.id])
                                            return this.swaq(a, b.id, f);
                                    } else
                                        for (var k in this.desw[a][f])
                                            if (this.desw[a][f][k] && this.desw[a][f][k].cb == b.callback)
                                                return this.swaq(a, k, f);
                                }
                            return !1;
                        }, a.xa.sode.prototype.ugin = function (a) {
                            if ('string' === typeof a)
                                if (this.desw[a])
                                    delete this.desw[a];
                                else
                                    return !1;
                            else
                                this.desw = {};
                            return !0;
                        });
                    }
                    a.k = {};
                    a.k.b = function (d) {
                        d.xa.sode || (d.xb == window ? k(a.c.aw, window, w) : a.a.dj(k, '\'' + a.c.aw + '\',window, Math', d.xb));
                        a.k.a = new d.xa.sode();
                    };
                }(u));
                (function (a) {
                    function k(a, f) {
                        function g(a) {
                            var b = e.xb.Math.pow, c = e.xb.Math.random;
                            a = (0, e.xb.Math.max)(4, a);
                            return ((1 + c()) * b(16, a) | 0).toString(16).substring(0, a);
                        }
                        function c(a) {
                            return function (b) {
                                return a(b);
                            };
                        }
                        function b(a, b) {
                            if (!a || 'string' !== typeof b || !a[b] || a == window)
                                return !1;
                            if ('string' === typeof a.nodeName && ('OBJECT' === a.nodeName || 'EMBED' === a.nodeName)) {
                                var e = document && document.body && document.body[b];
                                if (e && e !== a[b])
                                    return e;
                            }
                            return !1;
                        }
                        f[a] = f[a] || {
                            zs: !1,
                            zr: 0,
                            yf: {},
                            h: 0,
                            m: 0,
                            i: {},
                            xa: {},
                            xb: f,
                            xc: {},
                            xyds: {}
                        };
                        var e = f[a], h = {}, l = function () {
                                var a = !1;
                                try {
                                    var b = Object.defineProperty({}, 'passive', {
                                        get: function () {
                                            a = !0;
                                        }
                                    });
                                    window.addEventListener('test', null, b);
                                    window.removeEventListener('test', null, b);
                                } catch (e) {
                                }
                                return a;
                            }();
                        e.xc.dowg = function (a, b) {
                            e && (e.xyds || (e.xyds = {}), e && e.xyds && (e.xyds[b] ? e.xyds[b].push(a) : e.xyds[b] = [a]));
                        };
                        e.xc.hsxk = function () {
                            e.dcsx && e.dcsx.dcwn();
                            'undefined' !== typeof a && a && e.xc.esde(a);
                            var a;
                            e.xc.exde(e.xc.hsxk, 1000);
                        };
                        e.xc.esde = function (a) {
                            window && window.clearTimeout && window.clearTimeout(a);
                        };
                        e.xc.ynds = function (a, e, d, g) {
                            var f, n, m = !1;
                            'touchstart' === e && l && (m = { passive: !0 });
                            g ? h[e + g] ? d = h[e + g] : (d = c(d), h[e + g] = d) : d = c(d);
                            if (a.addEventListener)
                                g = 'addEventListener', f = '';
                            else if (a.attachEvent)
                                g = 'attachEvent', f = 'on';
                            else
                                return !1;
                            if (n = b(a, g))
                                try {
                                    n.call(a, f + e, d, m);
                                } catch (I) {
                                    a[g](f + e, d, m);
                                }
                            else if (a && g && a[g])
                                try {
                                    a[g](f + e, d, m);
                                } catch (I) {
                                    return !1;
                                }
                        };
                        e.xc.engn = function (a, e, c, d) {
                            var g, f = e + d, l;
                            if (!a)
                                return delete h[f], !1;
                            c = !1 !== d ? h[f] : c;
                            if (a.removeEventListener)
                                d = 'removeEventListener', g = '';
                            else if (a.detachEvent)
                                d = 'detachEvent', g = 'on';
                            else
                                return delete h[f], !1;
                            if (l = b(a, d))
                                try {
                                    l.call(a, g + e, c, !1);
                                } catch (I) {
                                    a[d](g + e, c, !1);
                                }
                            else
                                try {
                                    a[d](g + e, c, !1);
                                } catch (I) {
                                }
                            delete h[f];
                        };
                        e.xc.exde = function (a, b) {
                            a = c(a);
                            var e;
                            window && window.setTimeout && (e = window.setTimeout(a, b));
                            return e;
                        };
                        e.xc.exae = function (a, b, e) {
                            return function () {
                                b.apply(e || null, a.concat(a.slice.call(arguments)));
                            };
                        };
                        e.xc.uxin = function () {
                            return g(4) + '-' + g(4) + '-' + g(4) + '-' + g(4);
                        };
                        e.xc.twer = function (a, b) {
                            e && (e.yf || (e.yf = {}), e && e.yf && (e.yf[b] ? e.yf[b].push(a) : e.yf[b] = [a]));
                        };
                    }
                    a.p = {};
                    a.p.a = function (d) {
                        var f = a.p.b(d), g = !1;
                        f || (f = a.p.c(d), g = !0, f.xc.exde(f.xc.hsxk, 1000));
                        window[a.c.aw] = f;
                        a.k.b(f);
                        g && (f.swde = new f.xa.sode());
                        a.k.a.azsx('adKilled', a.p.d);
                        return f;
                    };
                    a.p.e = function () {
                        a.c.i = null;
                        a.p.f(a.c.ax.a, a.c.az);
                        a.k.a.sxaz('adKilled', { callback: a.p.d });
                        a.p.g(r);
                    };
                    a.p.d = function (d) {
                        if (r) {
                            try {
                                var f = r.yf[a.c.ax.a];
                                if (f) {
                                    var g = a.a.indexOf(f, d.yg);
                                    -1 < g && f.splice(g, 1);
                                }
                            } catch (c) {
                            }
                            a.p.g(r);
                        }
                    };
                    a.p.h = function (d, f) {
                        var g = a.p.b(a.c.e);
                        g && g.xc.twer(d, f);
                    };
                    a.p.i = function (d, f) {
                        var g = a.p.b(a.c.e);
                        g && g.xc.dowg(f, d);
                    };
                    a.p.f = function (d, f) {
                        var g = r.xyds[d];
                        if (g) {
                            var c = a.a.indexOf(g, f);
                            -1 < c && g.splice(c, 1);
                        }
                    };
                    a.p.g = function (a) {
                    };
                    a.p.c = function (d) {
                        d == window ? k(a.c.aw, window) : a.a.dj(k, '\'' + a.c.aw + '\',window', d);
                        return a.p.b(d);
                    };
                    a.p.b = function (d) {
                        try {
                            return d = d || a.c.e, d[a.c.aw];
                        } catch (f) {
                            return null;
                        }
                    };
                    a.p.j = function (d) {
                        try {
                            var f = [];
                            d = d || a.c.e;
                            if (!d)
                                return !1;
                            var g = a.c.at;
                            if (!g)
                                return !1;
                            var c = new RegExp('^' + g);
                            if (!c)
                                return !1;
                            a.a.forEach(d, function (a, e) {
                                -1 < e.search(c) && a && 'number' === typeof a.zr && f.push(a);
                            });
                            return f;
                        } catch (b) {
                            return !1;
                        }
                    };
                    a.p.k = function (d) {
                        try {
                            var f = [];
                            d = d || a.c.e;
                            return d ? (f = a.p.j(d)) ? 0 < f.length ? !0 : !1 : !1 : !1;
                        } catch (g) {
                            return !1;
                        }
                    };
                    a.p.l = function (d) {
                        var f = a.p.b();
                        f && (f.i[d] = !0);
                    };
                }(u));
                var r = u.p.a(u.c.e), ka = u.c.c, U = u.a.l(), R = u.c.bj, wa = u.c.e;
                (function (a) {
                    function k(a, f, g) {
                        var c = f[a];
                        c && c.xa.txae || (c.xa.txae = function (a, e) {
                            this.sxdc = c.xc.uxin();
                            this.cdxs = a;
                            this.xscd = {};
                            this.swde = e;
                        }, c.xa.txae.prototype.wsed = function (a, e, d, g, f) {
                            this.xscd[g] || (this.xscd[g] = {});
                            this.xscd[g].evt = e;
                            this.xscd[g].target = a;
                            this.xscd[g].periodic = !0;
                            var t;
                            t = c.xc.exae([this], function (k, y) {
                                c.xc.engn(a, e, null, g);
                                if (k.xscd[g]) {
                                    k.xscd[g].tid && c.xc.esde(k.xscd[g].tid);
                                    k.xscd[g].tid = c.xc.exde(function () {
                                        k.xscd[g].tid = null;
                                        c.xc.ynds(a, e, t, g);
                                    }, f);
                                    try {
                                        k.swde.zaxs(d, y);
                                    } catch (x) {
                                    }
                                }
                            });
                            c.xc.ynds(a, e, t, g);
                        }, c.xa.txae.prototype.wsqa = function (a) {
                            this.xscd[a] && (c.xc.esde(this.xscd[a].tid), c.xc.engn(this.xscd[a].target, this.xscd[a].evt, null, a), delete this.xscd[a]);
                        }, c.xa.txae.prototype.qaws = function () {
                            this.wsed(this.cdxs, 'scroll', 'scroll', 'globalScrollevent' + this.sxdc, 1000);
                            var a = this.cdxs.document.documentElement;
                            this.wsed(a, 'mousedown', 'mouseEvent', 'globalMouseDown' + this.sxdc, 1000);
                            this.wsed(a, 'mouseover', 'mouseEvent', 'globalMouseOver' + this.sxdc, 1000);
                            this.wsed(a, 'mousemove', 'mouseEvent', 'globalMouseMove' + this.sxdc, 5000);
                            this.wsed(this.cdxs, 'mousewheel', 'mouseEvent', 'globalMouseWheel' + this.sxdc, 5000);
                            this.wsed(this.cdxs, 'DOMMouseScroll', 'mouseEvent', 'globalMouseScroll' + this.sxdc, 5000);
                            this.wsed(a, 'touchstart', 'mouseEvent', 'globalTouchStartEvent' + this.sxdc, 1000);
                            this.wsed(a, 'keydown', 'keyboardEvent', 'globalKeyboardEvent' + this.sxdc, 1000);
                        }, c.xa.txae.prototype.aqsw = function () {
                            for (var a in this.xscd)
                                this.engn({ listenerName: a });
                        }, c.xa.txae.prototype.ynds = function (a, e, d, g) {
                            if (!this.xscd[g]) {
                                this.xscd[g] = {};
                                this.xscd[g].evt = e;
                                this.xscd[g].target = a;
                                this.xscd[g].publishEvt = d;
                                var f;
                                f = c.xc.exae([this], function (a, b) {
                                    a.xscd[g] && a.swde.zaxs(d, b);
                                });
                                c.xc.ynds(a, e, f, g);
                            }
                        }, c.xa.txae.prototype.engn = function (a) {
                            function e(a, b) {
                                a.xscd[b].periodic ? a.wsqa(b) : (c.xc.engn(a.xscd[b].target, a.xscd[b].evt, null, b), delete a.xscd[b]);
                            }
                            var d = a.target && a.evt, g = a.target && !a.evt, f = a.all;
                            if (a.listenerName)
                                this.xscd[a.listenerName] && e(this, a.listenerName);
                            else if (d)
                                for (var t in this.xscd)
                                    (d = this.xscd[t]) && d.evt == a.evt && d.target == a.target && e(this, t);
                            else if (g)
                                for (t in this.xscd)
                                    (d = this.xscd[t]) && d.target == a.target && e(this, t);
                            else if (f)
                                for (t in this.xscd)
                                    (d = this.xscd[t]) && e(this, t);
                        }, c.xa.txae.prototype.kdmw = function (a) {
                            c.swde.esgf(a.publishEvt);
                        }, c.xa.txae.prototype.dcwn = function () {
                            var a = this.xscd, e;
                            for (e in a) {
                                var c = a[e];
                                'unload' === c.evt && c.target && c.target.closed && this.kdmw(c);
                            }
                        });
                    }
                    a.q = {};
                    a.q.a = function (d) {
                        d && (d.xa.txae || (d.xb == window ? k(a.c.aw, window, w) : a.a.dj(k, '\'' + a.c.aw + '\',window, Math', d.xb)), d.zs || (d.dcsx = new d.xa.txae(a.c.e, d.swde), d.zs = !0));
                    };
                    a.k.a.azsx('modulesReady', a.q.a, { once: !0 });
                    a.k.a.azsx('startAdTracking', function (d) {
                        r && r.zs && !r.xz && (r.dcsx ? (r.xz = !0, r.dcsx.qaws()) : a.q.a(r), a.focus.setFocusListeners());
                    });
                }(u));
                (function (a) {
                    function k(a, b, e) {
                        a.IR5.MIN[e] = w.min(b, a.IR5.MIN[e]) || b || 1;
                        a.IR5.MAX[e] = w.max(b, a.IR5.MAX[e]) || b;
                    }
                    function d(b) {
                        if (q)
                            return !0;
                        var e = r.swde.azsx('focusStateChange', function (e) {
                            var c = { type: 'blur' };
                            e || (a.r.g(c, b), a.r.h(c, b));
                        });
                        a.k.a.azsx('adKilled', function () {
                            r.swde.sxaz('focusStateChange', { id: e });
                        }, {
                            once: !0,
                            condition: function (a) {
                                return b.zr == a.zr;
                            }
                        });
                        q = !0;
                    }
                    function f(a, b) {
                        b.be = w.max('undefined' !== typeof b.be ? b.be : 0, a - b.bf);
                        'undefined' === typeof b.by && 500 <= b.be && (b.by = b.bk);
                    }
                    function g(b) {
                        b.az === a.r.a.d.a ? b.az = a.r.a.d.b : b.az === a.r.a.d.b && (b.az = a.r.a.d.a);
                    }
                    function c(b) {
                        b.ba === a.r.a.d.a ? b.ba = a.r.a.d.b : b.ba === a.r.a.d.b && (b.ba = a.r.a.d.a);
                    }
                    function b(b) {
                        b.ax === a.r.a.b.a ? b.ax = a.r.a.b.b : b.ax === a.r.a.b.b && (b.ax = a.r.a.b.a);
                    }
                    function e(b) {
                        b.ay === a.r.a.c.a ? b.ay = a.r.a.c.b : b.ay === a.r.a.c.b && (b.ay = a.r.a.c.a);
                    }
                    function h(a, b) {
                        'undefined' === typeof b.bk && (b.bk = 0);
                        b.bk += a - b.bo;
                        b.bo = a;
                    }
                    function l(a, b) {
                        'undefined' === typeof b.bl && (b.bl = 0);
                        b.bl += a - b.bp;
                        b.bp = a;
                    }
                    function p(a, b) {
                        'undefined' === typeof b.bg && (b.bg = 0);
                        'undefined' === typeof b.bc && (b.bc = 0);
                        b.bu = a - b.bs;
                        b.bu > b.bc && (b.bc = b.bu);
                        b.bg += a - b.bq;
                        500 <= b.bc && 'undefined' === typeof b.bw && (b.bk += a - b.bo, b.bw = b.bk);
                        b.bq = a;
                    }
                    function t(a, b) {
                        'undefined' === typeof b.bh && (b.bh = 0);
                        'undefined' === typeof b.bd && (b.bd = 0);
                        b.bv = a - b.bt;
                        b.bv > b.bd && (b.bd = b.bv);
                        b.bh += a - b.br;
                        500 <= b.bd && 'undefined' === typeof b.bx && (b.bl += a - b.bp, b.bx = b.bl);
                        b.br = a;
                    }
                    a.r = {};
                    var q = !1;
                    a.r.a = {};
                    a.r.a.a = {};
                    a.r.a.a.a = 0;
                    a.r.a.a.b = 1;
                    a.r.a.b = {};
                    a.r.a.b.a = 0;
                    a.r.a.b.b = 1;
                    a.r.a.c = {};
                    a.r.a.c.a = 0;
                    a.r.a.c.b = 1;
                    a.r.a.d = {};
                    a.r.a.d.a = 0;
                    a.r.a.d.b = 1;
                    a.r.a.e = {};
                    a.r.a.e.a = 0;
                    a.r.a.e.b = 1;
                    a.r.a.f = {};
                    a.r.a.f.a = 0;
                    a.r.a.f.b = 1;
                    a.r.a.f.c = 2;
                    a.r.b = function (a) {
                        k(a, a.aj, 'x');
                        k(a, a.ak, 'y');
                        a.IR5.AREA = (a.IR5.MAX.x - a.IR5.MIN.x) * (a.IR5.MAX.y - a.IR5.MIN.y);
                    };
                    a.r.c = function (b) {
                        function e() {
                            500 <= new A().getTime() - ra && (a.r.d({ type: 'park' }, b), clearInterval(d), b.au = a.r.a.a.a);
                        }
                        var c = b.au;
                        if (c === a.r.a.a.a) {
                            ra = new A().getTime();
                            var d = a.l.e(e, 50);
                            b.au = a.r.a.a.b;
                        } else
                            c === a.r.a.a.b && (ra = new A().getTime());
                    };
                    a.r.e = function (b) {
                        function e() {
                            3000 <= new A().getTime() - na && (a.r.f({ type: 'park' }, b), clearInterval(d), b.av = a.r.a.a.a);
                        }
                        var c = b.av;
                        if (c === a.r.a.a.a) {
                            na = new A().getTime();
                            var d = a.l.e(e, 50);
                            b.av = a.r.a.a.b;
                        } else
                            c === a.r.a.a.b && (na = new A().getTime());
                    };
                    a.r.g = function (b, e) {
                        var c = b.type;
                        d(e);
                        if (e.az === a.r.a.d.a) {
                            if ('mouseover' === c || 'mousemove' === c)
                                e.bo = new A().getTime(), g(e);
                        } else if (e.az === a.r.a.d.b) {
                            'mousemove' === c && h(new A().getTime(), e);
                            if ('mouseout' === c || 'blur' === c)
                                h(new A().getTime(), e), g(e);
                            'scooper' === c && h(new A().getTime(), e);
                        }
                    };
                    a.r.h = function (b, e) {
                        var h = b.type;
                        d(e);
                        if (e.ba === a.r.a.d.a) {
                            if ('mouseover' === h || 'mousemove' === h)
                                e.bp = new A().getTime(), c(e);
                        } else if (e.ba === a.r.a.d.b) {
                            'mousemove' === h && l(new A().getTime(), e);
                            if ('mouseout' === h || 'blur' === h)
                                l(new A().getTime(), e), c(e);
                            'scooper' === h && l(new A().getTime(), e);
                        }
                    };
                    a.r.d = function (e, c) {
                        if (2 != c.an) {
                            var d = e.type;
                            if (c.ax === a.r.a.b.a) {
                                if ('mouseover' === d || 'mousemove' === d)
                                    c.bq = new A().getTime(), c.bs = new A().getTime(), b(c);
                            } else
                                c.ax === a.r.a.b.b && ('mousemove' !== d && 'mouseout' !== d || p(new A().getTime(), c), 'park' === d && p(new A().getTime() - 500, c), 'mouseout' !== d && 'park' !== d || b(c));
                        }
                    };
                    a.r.f = function (b, c) {
                        if (2 != c.an) {
                            var d = b.type;
                            if (c.ay === a.r.a.c.a) {
                                if ('mouseover' === d || 'mousemove' === d)
                                    c.br = new A().getTime(), c.bt = new A().getTime(), e(c);
                            } else
                                c.ay === a.r.a.c.b && ('mousemove' !== d && 'mouseout' !== d || t(new A().getTime(), c), 'park' === d && t(new A().getTime() - 3000, c), 'mouseout' !== d && 'park' !== d || e(c));
                        }
                    };
                    a.r.i = function (b, e) {
                        var c = b.type;
                        if (e.bb == a.r.a.e.a) {
                            if ('mouseover' == c || 'mousemove' == c)
                                e.bf = new A().getTime(), e.bb = a.r.a.e.b;
                        } else
                            e.bb == a.r.a.e.b && ('mouseout' == c ? (f(new A().getTime(), e), e.bb = a.r.a.e.a) : 'mousemove' != c && 'scooper' != c || f(new A().getTime(), e));
                    };
                }(u));
                (function (a) {
                    function k(b) {
                        a.focus.pageIsPrerendered() || (a.k.a.zaxs('noLongerPreRendered'), a.l.d(document, p, k, 'pr'));
                    }
                    function d(a) {
                        'undefined' == typeof e && (e = a);
                    }
                    a.focus = {};
                    var f = !1, g = a.c.bc, g = -1 < g.indexOf('Safari') && -1 == g.indexOf('Chrome') && -1 == g.indexOf('Chromium') && !a.a.l(), c = a.a.t() && !a.a.l(), b = 'undefined' !== typeof document.hasFocus, e, h = {
                            visible: 0,
                            hidden: 1,
                            prerender: 2
                        }, l, p, t, q;
                    'undefined' !== typeof document.hidden ? (l = 'hidden', p = 'visibilitychange') : 'undefined' !== typeof document.mozHidden ? (l = 'mozHidden', p = 'mozvisibilitychange') : 'undefined' !== typeof document.msHidden ? (l = 'msHidden', p = 'msvisibilitychange') : 'undefined' !== typeof document.webkitHidden && (l = 'webkitHidden', p = 'webkitvisibilitychange');
                    for (var y = [
                                'v',
                                'mozV',
                                'msV',
                                'webkitV'
                            ], x = 0; x < y.length; x++) {
                        var n = y[x] + 'isibilityState';
                        if ('undefined' !== typeof document[n] && null !== document[n]) {
                            t = n;
                            break;
                        }
                    }
                    q = 'undefined' !== typeof l;
                    var m, I;
                    'undefined' !== typeof window.requestAnimationFrame ? m = 'requestAnimationFrame' : 'undefined' !== typeof window.webkitRequestAnimationFrame && (m = 'webkitRequestAnimationFrame');
                    I = g && 'string' == typeof m && !q;
                    var G = new A().getTime();
                    I && function E() {
                        G = new A().getTime();
                        if (!f)
                            window[m](E);
                    }();
                    a.focus.focusStartTime = !1;
                    var J = r.swde.azsx('focusStateChange', function (b) {
                        b && (a.focus.focusStartTime = new A().getTime(), r.swde.sxaz('focusStateChange', {
                            id: J,
                            priority: 1
                        }));
                    }, { priority: 1 });
                    a.focus.getFocusMethod = function () {
                        return e;
                    };
                    a.focus.visibilitychange = p;
                    a.focus.setFocusListeners = function () {
                    };
                    a.focus.getQueryString = function (a) {
                        a = {};
                        a.em = e;
                        z && (a.eo = 1);
                        'undefined' != typeof t && (a.en = h[document[t]]);
                        return a;
                    };
                    a.focus.supportsPageVisAPI = function () {
                        return q;
                    };
                    a.focus.checkFocus = function () {
                        if (a.focus.supportsPageVisAPI())
                            return d(0), !document[l];
                        if (I)
                            return d(1), 100 > new A().getTime() - G;
                        if (c && b)
                            return d(2), document.hasFocus();
                        d(3);
                        return !0;
                    };
                    var C = !1;
                    a.focus.pageIsVisible = function () {
                        var b = a.focus.checkFocus();
                        if (C != b && r && r.swde)
                            try {
                                r.swde.zaxs('focusStateChange', b);
                            } catch (e) {
                            }
                        return C = b;
                    };
                    a.focus.pageIsPrerendered = function () {
                        return 'undefined' !== typeof t ? 'prerender' == document[t] : !1;
                    };
                    a.focus.pageIsVisible();
                    a.k.a.azsx('allLocalAdsKilled', function () {
                        f = !0;
                    }, { once: !0 });
                    a.focus.pageIsPrerendered() && a.l.c(document, p, k, 'pr');
                    var z = a.focus.pageIsPrerendered();
                }(u));
                (function (a) {
                    a.s = {};
                    a.s.a = function () {
                        var k = a.t.a;
                        a.t.b([
                            'iframe[id^=\'ebBannerIFrame\']',
                            '$[id|ebBannerIFrame_([0-9]+_[0-9]+)]/.../body/#eyeDiv/iframe[id^=\'ebAd\'][id*=\'panel\'][id*=\'iframe\'][id*=\'$0\']',
                            [
                                'expandUnloads',
                                'useIsFoundAdKnown',
                                'runWithoutExpand'
                            ]
                        ], 'Sizmek backref');
                        a.t.b([
                            'iframe[id^=\'ebBannerIFrame\']',
                            '.../body/#eyeDiv/iframe[id^=\'ebAd\'][id*=\'panel\'][id*=\'iframe\']',
                            [
                                'expandUnloads',
                                'useIsFoundAdKnown',
                                'runWithoutExpand',
                                'setCollapseProxyInLoop'
                            ],
                            !1,
                            '.../body/#eyeDiv'
                        ], 'Sizmek custom');
                        a.t.b([
                            '[id^=\'envIpolli\'][name^=\'envIpolli\']',
                            '[id^=\'envIpolli\'][name^=\'envIpolli\']/$[id|envIpolli(\\d+)]/.../body/iframe[id=\'expIpolli$0_iframe\']',
                            [
                                'runWithoutExpand',
                                'expandUnloads',
                                'noCollapseValidation'
                            ]
                        ], 'Ipolli');
                        a.t.b([
                            '[id^=\'OriginPlatformAdUnit\'][id$=\'inpage\']',
                            '$[id|OriginPlatformAdUnit-(\\d+)-inpage]/...../[id=\'OriginPlatformAdUnit-$0-overthepage\']',
                            [
                                'expandUnloads',
                                'useIsFoundAdKnown',
                                'runWithoutExpand'
                            ]
                        ], 'Origin platform');
                        a.t.b([
                            '#cac_adhere',
                            '..../$[id|cmAdFrame__crisp-(.*)]/...../iframe#cacPanelIframe__crisp-$0',
                            [
                                'useIsFoundAdKnown',
                                'findExpandInLoop',
                                'setExpandProxyInLoop'
                            ],
                            !1,
                            !1,
                            'iframe/=>/div[id=\'panelContainerDiv\']'
                        ], 'cac_adhere');
                        a.c.bt && a.c.bt() && 'AdMarvel' == a.c.bt() && (a.t.b([
                            'div#normal',
                            'div#expanded',
                            ['noInitialValidation']
                        ], 'Opera MRAID 1'), a.t.b([
                            'div#normal',
                            'div#resized',
                            ['noInitialValidation']
                        ], 'Opera MRAID 2'));
                        k.push({
                            name: 'pictela',
                            onFindAd: function (d, f, g) {
                                if ((d = a.c.db ? a.u.a(['div[id^=\'ptela_unitWrapper\']'], d)[0] : a.u.a(['div[id^=\'ptelaswfholder\']'], d)[0]) && a.a.bt(d))
                                    return d;
                            }
                        }, {
                            name: 'Flashtalking',
                            collapsedRe: /ftdiv\d+/,
                            expandedRe: /ftin\d+/,
                            clipRe: /rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)/,
                            onFindAd: function (d, f, g) {
                                var c = a.t.c(d, this.collapsedRe);
                                d = a.t.c(d, this.expandedRe);
                                if (c && d)
                                    return a.t.d[f] = a.t.e(c, f, g), a.t.d[f].expandedEl = d, c;
                            },
                            onLoop: function (d) {
                                var f = !1, g = d.expandedEl.style.clip, g = g && g.match(this.clipRe);
                                '0' === (g && g[4]) && (f = !0);
                                f && !d.expandedIsOpen ? a.t.f(d.expandedEl, 'div', null, d.adNum) : !f && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        }, {
                            name: 'doubleclick sidekick',
                            re: /(DIV)_(\d{6})_1_(\d{13})/,
                            onFindAd: function (d, f, g) {
                                if (d = a.t.c(d, this.re))
                                    return a.t.d[f] = a.t.e(d, f, g), d;
                            },
                            findExpanded: function (a) {
                                if (a = a.id.match(this.re))
                                    for (var f = [
                                                a[3],
                                                Number(a[3]) + 1
                                            ], g = 0; g < f.length; g++) {
                                        var c = [
                                            'DIV',
                                            a[2],
                                            '2',
                                            f[g]
                                        ].join('_');
                                        if (c = document.getElementById(c))
                                            return c;
                                    }
                            }
                        }, {
                            name: 'Pointroll 1',
                            re: /pr(flsh)([A-Z0-9]+)/,
                            onFindAd: function (d, f, g) {
                                if (a.c.db) {
                                    var c = window.prBnr;
                                    if (c && 1 === c.nodeType && a.a.bt(c)) {
                                        var b = d && d.innerHTML && d.innerHTML.match(/pradi([A-Z0-9]+)/);
                                        if ((b = b && b[1]) && c.id && c.id.match(b) && (d = d.ownerDocument.getElementById('prf' + b)))
                                            return a.t.d[f] = a.t.e(c, f, g), a.t.d[f].uncle = d, c;
                                    }
                                }
                            },
                            onLoop: function (d) {
                                var f = !1, g = d.uncle;
                                g && g.children && 1 === g.children.length && (g = g.children[0]) && 1 === g.children.length && (d.expandedEl = g, f = !0);
                                f && !d.expandedIsOpen ? a.t.f(d.expandedEl, 'div', null, d.adNum) : !f && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        }, {
                            name: 'Pointroll 2',
                            re: /pradi([A-Z0-9]+)/,
                            onFindAd: function (d, f, g) {
                                var c = d && d.innerHTML && d.innerHTML.match(this.re);
                                if (c) {
                                    var b = d.ownerDocument || document;
                                    d = b.getElementById('prf' + c[1]);
                                    var e;
                                    if (d) {
                                        var h = d.getElementsByTagName('embed'), l = d.getElementsByTagName('object'), p = d.getElementsByTagName('div');
                                        h && h[0] && a.a.bu(h[0]) ? e = h[0] : l && l[0] && a.a.bu(l[0]) ? e = l[0] : p && 0 < p.length && a.a.forEach(p, function (b) {
                                            b && 'mal-ad-container' === b.id && a.a.bt(b) && (e = b);
                                        });
                                        !e && d.children && 1 === d.children.length && (h = d.children[0]) && 1 === h.children.length && a.a.bt(h.children[0]) && (e = h.children[0]);
                                    }
                                    e || (c = b.getElementById('prw' + c[1])) && a.a.bt(c) && (e = c);
                                    if (e)
                                        return a.t.d[f] = a.t.e(e, f, g), a.t.d[f].uncle = d, e;
                                }
                            },
                            onNewAd: function (d, f) {
                                d && d.uncle && a.j.c(f, d.uncle);
                            }
                        }, {
                            name: 'Unicast 1',
                            re: /VwP(\d+)Div/,
                            onFindAd: function (d, f, g) {
                                if (d = a.t.c(d, this.re)) {
                                    var c = d.id.match(this.re);
                                    if (c && (c = document.getElementById('VwP' + c[1] + 'Div2')) && (c = c.getElementsByTagName('div'), 3 !== c.length && 1 === c.length)) {
                                        c = c[0];
                                        if (a.a.bt(c))
                                            return c;
                                        a.t.d[f] = a.t.e(d, f, g);
                                        return d;
                                    }
                                }
                            },
                            findExpanded: function (d) {
                                if ((d = d.id.match(this.re)) && (d = (d = document.getElementById('VwP' + d[1] + 'Div2').getElementsByTagName('div')) && d[0]) && a.a.bt(d))
                                    return d;
                            }
                        });
                        k.push({
                            name: 'Bleed',
                            onFindAd: function (d, f, g) {
                                if (a.u.a(['script[src*=\'jetpackdigital\']'], d)[0] && (d = a.c.e.document.getElementById('jpsuperheader')) && a.a.bt(d)) {
                                    var c = d.getElementsByTagName('object');
                                    if (c && 1 === c.length && c[0].id && c[0].id.match('jp_embed'))
                                        return c = c[0], a.t.d[f] = a.t.e(d, f, g), a.t.d[f].expandedEl = c, a.t.d[f].bgCheck = c && c.parentNode && c.parentNode.parentNode, d;
                                }
                            },
                            onLoop: function (d) {
                                var f = !1;
                                d.bgCheck.className && d.bgCheck.className.match('background1') && (f = !0);
                                f && !d.expandedIsOpen ? (a.t.f(d.expandedEl, null, null, d.adNum), a.j.b(B[d.adNum], stage.bgCheck)) : !f && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        });
                        k.push({
                            name: 'JPD',
                            isFoundAdKnown: function (d, f, g) {
                                if (d.className && d.className.match('jpplatform'))
                                    var c = a.c.e.document.getElementById('jp_overlay'), b = !0;
                                else
                                    d.parentNode && d.parentNode.id && 'jpd_expfooter' === d.parentNode.id && (c = a.c.e.document.getElementById('jpd_expfooter_overlay'), b = !1);
                                if (c) {
                                    var e = a.a.getElementsByClassName('jppanel', 'DIV', c);
                                    if (e && 0 < e.length)
                                        return d = a.t.e(d, f, g), a.t.d[f] = d, a.t.d[f].overlay = c, a.t.d[f].panels = e, a.t.d[f].ignoreVideo = b, !0;
                                }
                            },
                            onLoop: function (d) {
                                var f, g = !1;
                                if (d.overlay && d.overlay.style && '-9999px' !== d.overlay.style.top) {
                                    if (!d.expandedEl || d.expandedEl && d.expandedEl.style && '-9999px' === d.expandedEl.style.top)
                                        d.ignoreVideo ? a.a.forEach(d.panels, function (a) {
                                            if (a && a.style && '-9999px' !== a.style.top && 0 === a.getElementsByTagName('video').length)
                                                return f = a, !1;
                                        }) : a.a.forEach(d.panels, function (a) {
                                            if (a && a.style && '-9999px' !== a.style.top)
                                                return f = a, !1;
                                        }), f && a.a.bt(f) && (d.expandedEl = f);
                                    d.expandedEl && (g = !0);
                                }
                                g && !d.expandedIsOpen ? a.t.f(d.expandedEl, 'div', null, d.adNum) : !g && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        });
                        k.push({
                            name: 'Adform TwoElement',
                            isFoundAdKnown: function (d, f, g) {
                                var c = B[f];
                                if (c.adformCollapsedEl && c.adformExpandedEl)
                                    return d = a.t.e(d, f, g), a.t.d[f] = d, a.t.d[f].expandedEl = c.adformExpandedEl, a.t.d[f].hiddenClassRx = /(^| )adform-adbox-hidden($| )/, !0;
                            },
                            onLoop: function (d) {
                                var f = !1;
                                d.hiddenClassRx.test(d.collapsedEl.className) && (f = !0);
                                f && !d.expandedIsOpen ? a.t.f(d.expandedEl, null, null, d.adNum) : !f && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        });
                        k.push({
                            name: 'Sizmek Leavebehind',
                            findCollapsedAd: function (d) {
                                if (!d)
                                    return !1;
                                if (d = d.getElementById('eyeDiv')) {
                                    var f, g = /ebAd\d+_contractedpanel_asset_.*/i;
                                    if ((d = d.getElementsByTagName('object')) && 0 < d.length && (a.a.forEach(d, function (a) {
                                            if (a && a.id.match(g))
                                                return f = a, !1;
                                        }), f))
                                        return f;
                                }
                                return !1;
                            },
                            findExpandedAd: function (d) {
                                if (!d)
                                    return !1;
                                if (d = d.getElementById('eyeDiv')) {
                                    var f, g = /ebAd\d+_expandedpanel\d*_asset_.*/i;
                                    if ((d = d.getElementsByTagName('object')) && 0 < d.length && (a.a.forEach(d, function (a) {
                                            if (a && a.id.match(g))
                                                return f = a, !1;
                                        }), f))
                                        return f;
                                }
                                return !1;
                            },
                            isAdExpanded: function (a) {
                                return this.findExpandedAd(a) ? !0 : !1;
                            },
                            onFindAd: function (d, f, g) {
                                if (!d || !a.u.a(['div#mmBillboardShim'], d)[0])
                                    return !1;
                                var c = a.c.e && a.c.e.document;
                                d = this.findCollapsedAd(c);
                                c = this.findExpandedAd(c);
                                if (d || c) {
                                    if (d && !d[D])
                                        return g = a.t.e(d, f, g), a.t.d[f] = g, d;
                                    if (c && a.a.bt(c))
                                        return g = a.t.e(c, f, g), a.t.d[f] = g, c;
                                }
                            },
                            afterAdStateCreated: function (d) {
                                d.pageDocument = a.c.e.document;
                                d.collapseUnloads = !0;
                            },
                            onLoop: function (d) {
                                var f = this.isAdExpanded(d.pageDocument);
                                !1 === d.expandedIsOpen && f ? (d.expandedEl = this.findExpandedAd(d.pageDocument), a.t.f(d.expandedEl, null, null, d.adNum)) : d.expandedIsOpen && 0 == f && (d.collapsedEl = this.findCollapsedAd(d.pageDocument), a.t.h(d.collapsedEl, null, null, d.adNum));
                            }
                        });
                        k.push({
                            name: 'Sizmek Pushdown',
                            findExpandedAd: function (d) {
                                if (!d)
                                    return !1;
                                if (d = d.getElementById('eyeDiv')) {
                                    var f, g = /ebad\d+_panel\d*_asset_.*/i;
                                    if ((d = d.getElementsByTagName('object')) && 0 < d.length && (a.a.forEach(d, function (a) {
                                            if (a && a.id.match(g))
                                                return f = a, !1;
                                        }), f))
                                        return f;
                                }
                                return !1;
                            },
                            isAdExpanded: function (a) {
                                return this.findExpandedAd(a) ? !0 : !1;
                            },
                            isFoundAdKnown: function (d) {
                                if (!d)
                                    return !1;
                                if (d.id && d.id.match('ebRichBannerFlash')) {
                                    d = L && L.parentNode && L.parentNode.getElementsByTagName('script');
                                    var f = !1;
                                    a.a.forEach(d, function (a) {
                                        if (a && a.src && a.src.match('ebExpBanner'))
                                            return f = !0, !1;
                                    });
                                    if (f)
                                        return !0;
                                }
                            },
                            afterAdStateCreated: function (d) {
                                d.pageDocument = a.c.e.document;
                            },
                            onLoop: function (d) {
                                var f = this.isAdExpanded(d.pageDocument);
                                !1 === d.expandedIsOpen && f ? (d.expandedEl = this.findExpandedAd(d.pageDocument), a.t.f(d.expandedEl, null, null, d.adNum)) : d.expandedIsOpen && 0 == f && a.t.g(d, !0);
                            }
                        });
                        k.push({
                            name: 'Celtra Banner/Video',
                            findExpandedAd: function (d) {
                                if (d.expandedEl)
                                    return d.expandedEl;
                                var f, g, c;
                                if ('banner' === d.expandType) {
                                    g = a.v.a(d.pageDoc.body, a.v.b);
                                    for (var b = g.length - 1; 0 <= b; b--)
                                        if ((c = g[b].contentWindow) && c.runtimeParams && c.runtimeParams.placementId && c.runtimeParams.clientTimestamp && c.runtimeParams.placementId === d.celtraId && c.runtimeParams.clientTimestamp === d.celtraTimestamp && (f = c.document && c.document.getElementById('celtra-modal')) && a.a.bt(f))
                                            return d.parentFrame || (d.parentFrame = a.g.g(f)), d.expandedEl = f;
                                } else if ('video' === d.expandType) {
                                    g = d.pageDoc.getElementsByTagName('video');
                                    if (d.adWin && d.adWin.videoContext && d.adWin.videoContext.url) {
                                        var e = d.adWin.videoContext.url;
                                        a.a.forEach(g, function (a) {
                                            if (a && a.src === e)
                                                return f = a, !1;
                                        });
                                    } else
                                        a.a.forEach(g, function (a) {
                                            if (a && a.src && a.src.match && a.src.match('celtra'))
                                                return f = a, !1;
                                        });
                                    if (f && a.a.bt(f))
                                        return d.expandedEl = f;
                                }
                                return !1;
                            },
                            isAdExpanded: function (d) {
                                var f = this.findExpandedAd(d);
                                return f ? (d = d.parentFrame || a.g.g(f)) && d.style && 'none' === d.style.display ? !1 : !0 : !1;
                            },
                            isFoundAdKnown: function (d, f, g) {
                                if (!d)
                                    return !1;
                                if (d.id && d.id.match('celtra') || d.className && d.className.match('celtra')) {
                                    var c = d.ownerDocument && (d.ownerDocument.defaultView || d.ownerDocument.parentWindow);
                                    if (c && c.ExpandableBanner && c.runtimeParams && c.runtimeParams.placementId && c.runtimeParams.clientTimestamp)
                                        return d = a.t.e(d, f, g), a.t.d[f] = d, a.t.d[f].expandType = 'banner', a.t.d[f].pageDoc = a.c.e.document, a.t.d[f].celtraId = c.runtimeParams.placementId, a.t.d[f].celtraTimestamp = c.runtimeParams.clientTimestamp, !0;
                                    if (c && c.VideoContext)
                                        return d = a.t.e(d, f, g), a.t.d[f] = d, a.t.d[f].expandType = 'video', a.t.d[f].pageDoc = a.c.e.document, a.t.d[f].adWin = c, !0;
                                }
                            },
                            onLoop: function (d) {
                                var f = this.isAdExpanded(d);
                                f && !d.expandedIsOpen ? a.t.f(d.expandedEl, 'div', null, d.adNum) : !f && d.expandedIsOpen && a.t.g(d, !0);
                            }
                        });
                    };
                }(u));
                (function (a) {
                    function k(a, b, c) {
                        this.collapsedEl = a;
                        this.expandedEl = null;
                        this.expandedIsOpen = !1;
                        this.adNum = b;
                        this.configIndex = c;
                    }
                    function d(b, c) {
                        var d = a.t.d[c];
                        if (!0 !== d.findingExpanded) {
                            d.findingExpanded = !0;
                            var g = function () {
                                    d.findingExpanded = !1;
                                }, k = B[c].aa;
                            a.l.k(function () {
                                var d = b.findExpanded(k);
                                if (d)
                                    return a.v.c(d, c, f, !1, g), !0;
                            }, 5, 500, g);
                        }
                    }
                    function f(b, c, d, g) {
                        b[M] = g;
                        b[D] = !0;
                        c = B[g];
                        g = a.t.d[g];
                        g.expandedIsOpen = !0;
                        a.a.bv(b, c);
                        g.findingExpanded = !1;
                        return !0;
                    }
                    function g(b, c) {
                        a.a.bv(b.collapsedEl, B[b.adNum], !0);
                        b.expandedIsOpen = !1;
                        c || (b.expandedEl && (b.expandedEl[M] = void 0, b.expandedEl[D] = void 0), b.expandedEl = null);
                    }
                    function c(b, c, d, g) {
                        if (!b)
                            return !1;
                        b[M] = g;
                        b[D] = !0;
                        a.t.d[g].expandedIsOpen = !1;
                        a.a.bv(b, B[g]);
                        return !0;
                    }
                    a.t = {};
                    a.t.i = 'bac';
                    var b = [];
                    a.t.a = b;
                    a.t.d = {};
                    a.t.e = function (a, b, c) {
                        return new k(a, b, c);
                    };
                    a.t.j = function (b) {
                        var c = a.t.d[b.zr];
                        c && (c.collapsedEl = null, c.expandedEl = null, delete a.t.d[b.zr]);
                    };
                    a.t.k = function (b) {
                        return (b = a.t.d[b]) && !0 === b.expandedIsOpen;
                    };
                    a.t.l = function (b) {
                        return (b = a.t.d[b]) && !0 === b.collapseUnloads;
                    };
                    a.t.m = function (e, h) {
                        e = e.replace(/^on/, '');
                        var f = a.t.d[h], p = B[h];
                        if (f) {
                            var k = b[f.configIndex];
                            if ('mousedown' === e && k.findExpanded && !f.expandedIsOpen)
                                d(k, h);
                            else if ('mouseover' === e && k.onMouseOver && !f.expandedIsOpen)
                                k.onMouseOver(f);
                            else if ('loop' === e && k.onLoop)
                                k.onLoop(f);
                            else if ('departed' === e && f.expandedIsOpen)
                                g(f);
                            else if ('collapseUnloads' === e && f.expandedIsOpen)
                                c(f.collapsedEl, null, null, h);
                            else if ('newad' === e && k.onNewAd)
                                k.onNewAd(f, p);
                        }
                    };
                    a.t.n = function (e, c) {
                        for (var d = c.adNum, g = 0; g < b.length; g++) {
                            var f = b[g], k = f.onFindAd && f.onFindAd(e, d, g);
                            if (k)
                                return a.k.a.azsx('adKilled', a.w.a, {
                                    once: !0,
                                    condition: function (a) {
                                        return a.zr == d;
                                    }
                                }), a.t.d[d] && f.afterAdStateCreated && f.afterAdStateCreated(a.t.d[d]), c.activeConfig = f.name, k;
                        }
                    };
                    a.t.o = function (e) {
                        if (e !== a.t.i && e.aa && e.ao && !a.t.d[d])
                            for (var c = e.aa, d = e.ao.adNum, g = 0; g < b.length; g++) {
                                var f = b[g];
                                if (f && f.isFoundAdKnown && f.isFoundAdKnown(c, d, g)) {
                                    a.k.a.azsx('adKilled', a.w.a, {
                                        once: !0,
                                        condition: function (a) {
                                            return a.zr == e.zr;
                                        }
                                    });
                                    a.t.d[d] || (c = new k(c, d, g), a.t.d[d] = c);
                                    f.afterAdStateCreated && f.afterAdStateCreated(a.t.d[d]);
                                    e.ao.activeConfig = f.name;
                                    break;
                                }
                            }
                    };
                    a.t.p = function (a) {
                        return 'IMG' === a.tagName && a.id && a.id.match(/^pradi[0-9A-Z]+$/) && a.onload && 'function' === typeof a.onload.toString && a.onload.toString().match(/shockwave/);
                    };
                    a.t.q = function (b, c) {
                        a.t.k(c.zr) && (a.t.l(c.zr) ? a.t.m('collapseUnloads', c.zr) : a.t.m('departed', c.zr), b.shouldKillAd = !1);
                    };
                    a.k.a.azsx('beforeAdKilled', a.t.q, { priority: 5 });
                    a.t.b = function (e, d) {
                        var l = [e[0]], p = [e[1]], t = e[2], q = e[3] && [e[3]], y = e[4] && [e[4]], x = e[5] && [e[5]], n = e[6], m = e[7], I = !1, G = !1, J = !1, C = !1, z = !1, K = !1, E = !1, P, v = P = !1, H = !1, r = !1, u = !1, w = !1, Q = !1;
                        t && (a.a.ax(t, 'checkHiddenStyles') && (I = !0), a.a.ax(t, 'noInitialValidation') && (G = !0), a.a.ax(t, 'noLoopValidation') && (J = !0), a.a.ax(t, 'noCollapseValidation') && (C = !0), a.a.ax(t, 'runWithoutExpand') && (z = !0), a.a.ax(t, 'collapseUnloads') && (K = !0), a.a.ax(t, 'expandUnloads') && (E = !0), a.a.ax(t, 'useIsFoundAdKnown') && (P = !0), a.a.ax(t, 'setCollapseProxyInLoop') && (v = !0), a.a.ax(t, 'setExpandProxyInLoop') && (H = !0), a.a.ax(t, 'findExpandInLoop') && (z = r = !0), a.a.ax(t, 'addExpandTag') && (u = !0), a.a.ax(t, 'setIframeAssetType') && (w = !0), a.a.ax(t, 'preferCollapse') && (Q = !0));
                        b.push({
                            name: d,
                            isFoundAdKnown: function (b, c, e) {
                                if (!P || !b)
                                    return !1;
                                if (n && m) {
                                    if ((b = (b = B[c].ao) && b[n]) && !a.a.ax(m, b))
                                        return !1;
                                } else if (a.u.a(l, b)[0]) {
                                    if (z)
                                        return a.t.d[c] = new k(b, c, e), a.t.d[c].collapsedQuery = l, a.t.d[c].expandedQuery = p, a.t.d[c].searchableEl = b, a.t.d[c].checkHiddenStyles = I, a.t.d[c].collapseUnloads = K, a.t.d[c].noLoopValidation = J, a.t.d[c].expandUnloads = E, a.t.d[c].expandedSelector = q, a.t.d[c].collapseProxyEl = y, a.t.d[c].expandProxyEl = x, a.t.d[c].collapseUnloads = K, a.t.d[c].setCollapseProxyInLoop = v, a.t.d[c].setExpandProxyInLoop = H, a.t.d[c].findExpandInLoop = r, a.t.d[c].addExpandTag = u, a.t.d[c].setIframeAssetType = w, a.t.d[c].preferCollapse = Q, y && a.u.b(y, B[c], b), !0;
                                    var d = a.u.a(p, b)[0];
                                    if (d && (G || a.a.bu(d)))
                                        return a.t.d[c] = new k(b, c, e), a.t.d[c].collapsedQuery = l, a.t.d[c].expandedQuery = p, a.t.d[c].searchableEl = b, a.t.d[c].checkHiddenStyles = I, a.t.d[c].collapseUnloads = K, a.t.d[c].noLoopValidation = J, a.t.d[c].expandUnloads = E, a.t.d[c].expandedSelector = q, a.t.d[c].expandedEl = d, a.t.d[c].collapseProxyEl = y, a.t.d[c].expandProxyEl = x, a.t.d[c].collapseUnloads = K, a.t.d[c].setCollapseProxyInLoop = v, a.t.d[c].setExpandProxyInLoop = H, a.t.d[c].findExpandInLoop = r, a.t.d[c].addExpandTag = u, a.t.d[c].setIframeAssetType = w, a.t.d[c].preferCollapse = Q, y && a.u.b(y, B[c], b), x && a.u.b(x, B[c], d), !0;
                                }
                            },
                            onFindAd: function (b, c, e) {
                                if (P)
                                    return !1;
                                var d = a.u.a(l, b)[0];
                                if (d && C && !d[D] || a.a.bt(d)) {
                                    if (z)
                                        return a.t.d[c] = new k(d, c, e), a.t.d[c].collapsedQuery = l, a.t.d[c].expandedQuery = p, a.t.d[c].searchableEl = b, a.t.d[c].checkHiddenStyles = I, a.t.d[c].collapseUnloads = K, a.t.d[c].noLoopValidation = J, a.t.d[c].expandUnloads = E, a.t.d[c].expandedSelector = q, a.t.d[c].collapseProxyEl = y, a.t.d[c].expandProxyEl = x, a.t.d[c].collapseUnloads = K, a.t.d[c].setCollapseProxyInLoop = v, a.t.d[c].setExpandProxyInLoop = H, a.t.d[c].findExpandInLoop = r, a.t.d[c].addExpandTag = u, a.t.d[c].setIframeAssetType = w, a.t.d[c].preferCollapse = Q, d;
                                    var h = a.u.a(p, b)[0];
                                    if (h && (G || a.a.bu(h)))
                                        return a.t.d[c] = new k(d, c, e), a.t.d[c].collapsedQuery = l, a.t.d[c].expandedQuery = p, a.t.d[c].searchableEl = b, a.t.d[c].checkHiddenStyles = I, a.t.d[c].collapseUnloads = K, a.t.d[c].noLoopValidation = J, a.t.d[c].expandUnloads = E, a.t.d[c].expandedSelector = q, a.t.d[c].expandedEl = h, a.t.d[c].collapseProxyEl = y, a.t.d[c].expandProxyEl = x, a.t.d[c].collapseUnloads = K, a.t.d[c].setCollapseProxyInLoop = v, a.t.d[c].setExpandProxyInLoop = H, a.t.d[c].findExpandInLoop = r, a.t.d[c].addExpandTag = u, a.t.d[c].setIframeAssetType = w, a.t.d[c].preferCollapse = Q, d;
                                }
                            },
                            onNewAd: function (b, c) {
                                b.collapseProxyEl && !b.useIsFoundAdKnown && a.u.b(b.collapseProxyEl, c, c.aa);
                            },
                            onLoop: function (b) {
                                if (b.stopLoop)
                                    return !1;
                                var e = !1;
                                b.setIframeAssetType && (B[b.adNum].hasIframeListener = !0, b.setIframeAssetType = !1);
                                if (b.expandUnloads) {
                                    var d = a.u.a(b.expandedQuery, b.searchableEl)[0];
                                    b.expandedEl = d;
                                }
                                b.findExpandInLoop && !b.expandedEl && (d = a.u.a(b.expandedQuery, b.searchableEl)[0], b.expandedEl = d);
                                if (b.expandedEl && (b.noLoopValidation || a.a.bu(b.expandedEl)))
                                    if (b.checkHiddenStyles && (b.expandedEl.style && 'hidden' === b.expandedEl.style.visibility || 'none' === b.expandedEl.style.display) || '0' === a.a.bd(b.expandedEl, 'opacity'))
                                        e = !1;
                                    else if (b.expandedSelector && !a.u.a(b.expandedSelector, b.expandedEl)[0])
                                        e = !1;
                                    else if (e = !0, b.setCollapseProxyInLoop && b.collapseProxyEl && !b.collapseProxySet && (b.collapseProxySet = a.u.b(b.collapseProxyEl, B[b.adNum], b.collapsedEl)), b.setExpandProxyInLoop && b.expandProxyEl && !b.expandProxySet && (b.expandProxySet = a.u.b(b.expandProxyEl, B[b.adNum], b.expandedEl)), b.addExpandTag && b.expandedEl.parentNode && (d = L && L.src && L.src.replace(/moatClientLevel4=[^&]*&/, 'moatClientLevel4=Expanded&')))
                                        return a.a.cn(d, b.expandedEl.parentNode), b.addExpandTag = !1, b.stopLoop = !0, !1;
                                b.preferCollapse && a.a.bu(b.collapsedEl) && (e = !1);
                                e && !b.expandedIsOpen ? f(b.expandedEl, 'div', null, b.adNum) : !e && b.expandedIsOpen && (b.collapseUnloads ? (e = a.u.a(b.collapsedQuery, b.searchableEl)[0], c(e, null, null, b.adNum)) : g(b, !0));
                            }
                        });
                    };
                    a.t.f = f;
                    a.t.g = g;
                    a.t.h = c;
                    a.t.c = function (b, c, d) {
                        d = d || {};
                        var g = b.getElementsByTagName('div');
                        d.inclSearchableEl && (g = a.a.cg(g), g.push(b));
                        for (b = 0; b < g.length; b++) {
                            var f = g[b];
                            if (f.id.match(c) && (d.anySize || a.a.bt(f)))
                                return f;
                        }
                    };
                    a.s.a();
                }(u));
                (function (a) {
                    function k(b, c, e, d, h) {
                        ('remove' === h ? a.l.d : a.l.c)(b, c, function (c) {
                            c = c || this.event;
                            var d = c.currentTarget || b;
                            try {
                                var h = d[M];
                            } catch (g) {
                                h = d[M];
                            }
                            if (h = B[h]) {
                                var f;
                                f = c;
                                var n = d.getBoundingClientRect();
                                f = -1 != f.type.indexOf('touch') && f.changedTouches && 0 < f.changedTouches.length ? {
                                    x: parseInt(f.changedTouches[0].clientX - n.left, 10),
                                    y: parseInt(f.changedTouches[0].clientY - n.top, 10)
                                } : {
                                    x: parseInt(f.clientX - n.left, 10),
                                    y: parseInt(f.clientY - n.top, 10)
                                };
                                h.aj = f.x;
                                h.ak = f.y;
                                h.dm || (h.cb = 2 == a.focus.getFocusMethod() ? h.counters.laxDwell.tCur : h.counters.strictDwell.tCur, h.dm = 1);
                                e.call(b, c, d, h);
                            }
                        }, 'genmouse');
                    }
                    function d(b, e, d) {
                        k(b, 'click', t, e, d);
                        k(b, 'mousedown', g, e, d);
                        U ? a.c.dy && k(b, 'touchstart', c, e, d) : (k(b, 'mousemove', f, e, d), k(b, 'mouseover', l, e, d), k(b, 'mouseout', p, e, d));
                    }
                    function f(b, c, e) {
                        a.k.a.zaxs('mouseEventOnAd', e);
                        b = b || window.event;
                        c = b.target || b.srcElement;
                        if (1 != e.ao.skin || !a.x.a(c, e.adContent, b)) {
                            if (!U && (e.aj !== e.al || e.ak !== e.am)) {
                                a.r.d(b, e);
                                a.r.f(b, e);
                                a.r.g(b, e);
                                a.r.i(b, e);
                                a.r.h(b, e);
                                a.r.b(e);
                                a.r.c(e);
                                a.r.e(e);
                                0 === e.ar.length && (e.ai = y(e));
                                if (100 > e.ar.length || 100 > e.as.length || 100 > e.at.length)
                                    e.ar.push(e.aj), e.as.push(e.ak), e.at.push(a.a.bb(e));
                                e.al = e.aj;
                                e.am = e.ak;
                            }
                            e.ai !== y(e) && 1 < e.ar.length && q(e, 'onMouseMove');
                        }
                    }
                    function g(b, c, e) {
                        a.k.a.zaxs('mouseEventOnAd', e);
                        b = b || window.event;
                        c = b.target || b.srcElement;
                        1 == e.ao.skin && a.x.a(c, e.adContent, b) || (c = { e: 2 }, c.q = e.aq[2]++, c.x = e.aj, c.y = e.ak, a.y.a(e, c), a.a.ea([
                            'feather',
                            'display',
                            'video'
                        ], e.ao) && a.t.m(b.type, e.zr));
                    }
                    function c(b, c, e) {
                        a.k.a.zaxs('mouseEvent', e);
                        a.k.a.zaxs('mouseEventOnAd', e);
                        b = b || window.event;
                        c = b.target || b.srcElement;
                        if (1 != e.ao.skin || !a.x.a(c, e.adContent, b)) {
                            b = { e: 23 };
                            b.q = e.aq[23]++;
                            b.x = e.aj;
                            b.y = e.ak;
                            c = new A().getTime();
                            if ('undefined' === typeof e.ct)
                                e.ct = c;
                            else {
                                var d = c - e.ct;
                                e.ct = c;
                                e.cu = w.min(e.cu, d) || d;
                            }
                            b.bz = void 0;
                            a.y.a(e, b);
                        }
                    }
                    function b(b, c, d) {
                        var g;
                        if (2 == b.an || b.hasIframeListener)
                            g = !0;
                        if (g) {
                            g = c.e;
                            var f = b.ck;
                            f == a.r.a.f.a && 6 === g ? (e(b, 0), b.cl = a.a.bb(b), b.ck = a.r.a.f.b) : f == a.r.a.f.b ? 22 === g ? (h(b, c), e(b, d), b.cl = a.a.bb(b)) : 7 === g && (1000 < a.a.bb(b) - b.cl ? (clearTimeout(b.cm), c.e = 22, h(b, c), b.cn = 0, b.ck = a.r.a.f.a) : b.ck = a.r.a.f.c) : f == a.r.a.f.c && (6 == g ? (1000 < a.a.bb(b) - b.cl && (clearTimeout(b.cm), b.cn = 0, b.cl = a.a.bb(b), e(b, 0)), b.ck = a.r.a.f.b) : 22 == g && (h(b, c), b.ck = a.r.a.f.a, b.cn = 0));
                        }
                    }
                    function e(c, e) {
                        if (a.focus.checkFocus()) {
                            var d = 5 > c.cn ? 1000 : 2 * e, h = { e: 22 };
                            c.cm = a.l.f(function () {
                                b(c, h, d);
                            }, d);
                        } else
                            b(c, { e: 7 }, 0);
                    }
                    function h(b, c) {
                        c.q = b.aq[c.e]++;
                        c.m = a.a.bb(b);
                        b.cl = c.m;
                        a.y.a(b, c);
                        b.cn++;
                    }
                    function l(c, e, d) {
                        a.k.a.zaxs('mouseEvent', d);
                        a.k.a.zaxs('mouseEventOnAd', d);
                        c = c || window.event;
                        e = c.target || c.srcElement;
                        1 == d.ao.skin && a.x.a(e, d.adContent, c) || (a.r.d(c, d), a.r.f(c, d), a.r.g(c, d), a.r.i(c, d), a.r.h(c, d), b(d, { e: 6 }, 0), a.a.ea([
                            'feather',
                            'display',
                            'video'
                        ], d.ao) && a.t.m(c.type, d.zr));
                    }
                    function p(c, e, d) {
                        a.k.a.zaxs('mouseEventOnAd', d);
                        c = c || window.event;
                        e = c.target || c.srcElement;
                        1 == d.ao.skin && a.x.a(e, d.adContent, c) || (a.r.d(c, d), a.r.f(c, d), a.r.g(c, d), a.r.i(c, d), a.r.h(c, d), b(d, { e: 7 }, 0));
                    }
                    function t(b, c, e) {
                        a.k.a.zaxs('mouseEvent', e);
                        a.k.a.zaxs('mouseEventOnAd', e);
                        b = b || window.event;
                        c = b.target || b.srcElement;
                        1 == e.ao.skin && a.x.a(c, e.adContent, b) || (b = { e: 3 }, b.q = e.aq[3]++, b.x = e.aj, b.y = e.ak, a.y.a(e, b));
                    }
                    function q(b, c) {
                        b.ai = y(b);
                        var e = { e: 1 };
                        e.q = b.aq[1]++;
                        e.x = b.ar.join('a');
                        e.y = b.as.join('a');
                        for (var d = a.a.bb(b), h = b.at, g = [], f = 0; f < h.length; f++)
                            isNaN(h[f]) || g.push(w.abs(h[f] - d));
                        e.c = g.join('a');
                        e.m = d;
                        a.y.a(b, e);
                        b.ar = [];
                        b.as = [];
                        b.at = [];
                    }
                    function y(b) {
                        return w.floor(a.a.bb(b) / 1000);
                    }
                    a.j = {};
                    a.j.d = function (b) {
                        if (a.c.dx) {
                            a.k.a.azsx('adKilled', a.j.e, {
                                once: !0,
                                condition: function (a) {
                                    return b.zr == a.zr;
                                }
                            });
                            b.mouseEventElements || (b.mouseEventElements = []);
                            var c = b.aa;
                            a.j.b(b, c);
                            b.mouseEventElements.push(c);
                        }
                    };
                    a.j.b = function (a, b) {
                        if (a) {
                            var c = b || a.aa;
                            c && d(c, a.zr);
                        }
                    };
                    a.j.a = function (a, b) {
                        if (a) {
                            var c = b || a.aa;
                            c && d(c, a.zr, 'remove');
                        }
                    };
                    a.j.f = function (b) {
                        for (var c in B)
                            B.hasOwnProperty(c) && (b = B[c]) && (a.r.g({ type: 'scooper' }, b), a.r.i({ type: 'scooper' }, b), a.r.h({ type: 'scooper' }, b), 1 < b.ar.length && b.ai !== y(b) && q(b, 'scooper'));
                    };
                    a.j.c = function (b, c) {
                        if (!c || !b || 'number' === typeof c[M])
                            return !1;
                        !b.hasIframeListener && c.tagName && 'iframe' === c.tagName.toLowerCase() && (b.hasIframeListener = !0);
                        !b.hasNonIframeListener && c.tagName && 'iframe' !== c.tagName.toLowerCase() && (b.hasNonIframeListener = !0, b.an = a.d.d(c));
                        c[M] = b.zr;
                        a.j.b(b, c);
                        b.mouseEventElements || (b.mouseEventElements = []);
                        b.mouseEventElements.push(c);
                        return b.proxyTrackingEnabled = !0;
                    };
                    a.j.e = function (b) {
                        a.a.forEach(b.mouseEventElements, function (c) {
                            try {
                                a.j.a(b, c), c[M] = null;
                            } catch (e) {
                            }
                        });
                    };
                }(u));
                (function (a) {
                    function k(b, c, e) {
                        return e ? new a.z.j(b.parentNode, c) : new a.z.j(b, c);
                    }
                    function d(a, b) {
                        if (!a)
                            return !1;
                        var c = 'number' == typeof a.zr, e, d;
                        c ? (e = a.aa, d = a._calcVideoBasedOnContainer) : e = a;
                        e = k(e, b, d);
                        d = e.height;
                        var h = e.width;
                        c && (a.AD_RECT = e);
                        c = e.calcArea();
                        if (0 === c)
                            return {
                                area: c,
                                visibleArea: 0,
                                percv: 0
                            };
                        var f = g(e), l = f.visibleRect.calcArea(), p = l / c, t;
                        a: {
                            var q = f.cumulRect, v = f.cumulRect.getViewportRect();
                            if (0 > q.top && 0 < q.bottom)
                                t = -q.top;
                            else if (0 <= q.top && q.top <= v.height)
                                t = 0;
                            else {
                                t = {
                                    yMin: -1,
                                    yMax: -1
                                };
                                break a;
                            }
                            if (0 <= q.bottom && q.bottom <= v.height)
                                q = q.height;
                            else if (q.bottom > v.height && q.top < v.height)
                                q = q.height - (q.bottom - v.height);
                            else {
                                t = {
                                    yMin: -1,
                                    yMax: -1
                                };
                                break a;
                            }
                            t = {
                                yMin: t,
                                yMax: q
                            };
                        }
                        return {
                            area: c,
                            visibleArea: l,
                            visibleRect: f.visibleRect,
                            cumulRect: f.cumulRect,
                            percv: p,
                            yMinMax: t,
                            elGeo: {
                                elHeight: d,
                                elWidth: h,
                                foldTop: f.cumulRect.top,
                                totalArea: f.parentArea
                            },
                            rect: e.rect
                        };
                    }
                    function f(a, b) {
                        for (var c = [], e = 0; e < b.length; e++)
                            c.push(a(b[e]));
                        return c;
                    }
                    function g(b) {
                        var c, e = [], d = a.a.dg(b.el, b.win, b && b.el && b.el._moatParentCount);
                        d && (e = f(function (b) {
                            return new a.z.j(b);
                        }, d));
                        e.unshift(b);
                        d = e.length;
                        b = new a.z.j(b.el, a.c.e);
                        for (var h = 0; h < d; h++) {
                            var g = e[h];
                            0 === h ? c = g : (c.changeReferenceFrame(g), b.changeReferenceFrame(g));
                            g = g.getViewportRect(h < d - 1 ? e[h + 1] : !1);
                            c = a.z.m(c, g);
                        }
                        return {
                            visibleRect: c,
                            cumulRect: b,
                            parentArea: e[e.length - 1].calcArea()
                        };
                    }
                    function c(a, b, c, e) {
                        a = w.max(a, c);
                        b = w.min(b, e);
                        return b > a ? [
                            a,
                            b
                        ] : [
                            0,
                            0
                        ];
                    }
                    function b(b) {
                        function c(a, b) {
                            return {
                                top: w.max(a.top, b.top),
                                right: w.max(a.right, b.right),
                                bottom: w.min(a.bottom, b.bottom),
                                left: w.min(a.left, b.left)
                            };
                        }
                        var e, d, h;
                        e = [];
                        d = [];
                        if (!a.a.f(b) || 0 === b.length)
                            return !1;
                        a.a.forEach(b, function (a) {
                            a.cumulRect && a.visibleRect && (d.push(a.cumulRect), e.push(a.visibleRect));
                        });
                        b = a.a.reduce(d, c);
                        h = a.a.reduce(e, c);
                        return {
                            elRect: b,
                            visibleRect: h
                        };
                    }
                    function e(b) {
                        return b && b.nodeName && 'map' === b.nodeName.toLowerCase() ? !0 : (b = a.a.cb(b)) && (1 >= b.width || 1 >= b.height) ? !0 : !1;
                    }
                    function h(b) {
                        return b ? 0 === a.a.de({ aa: b }, !0, !0) ? !0 : 0 === a.a.dd(b, !0) : !1;
                    }
                    function l(b, c, g, f, l) {
                        function p(a) {
                            return (a = a.cumulRect) ? 100 <= a.width && 50 <= a.height : !1;
                        }
                        var k = {
                                IFRAME: !0,
                                VIDEO: !0,
                                OBJECT: !0,
                                EMBED: !0,
                                IMG: !0
                            }, t = d(b);
                        if (h(b) || !p(t))
                            return !1;
                        var q = [], E = B[l];
                        g.elementsFromPoint && !E.elementsFromPointCache ? (c = g.elementsFromPoint(c.m[0], c.m[1]) || [], E.elementsFromPointCache = c, q = q.concat(Array.prototype.slice.call(c))) : (c = a.a.cx(c.m[0], c.m[1], g), E.elementsFromPointCache && (q = q.concat(Array.prototype.slice.call(E.elementsFromPointCache))), c && (q = [c].concat(q)));
                        E = q.indexOf(b);
                        if (-1 == E)
                            return !1;
                        q = q.slice(0, E);
                        for (E = 0; E < q.length; E++)
                            if ((g = (c = q[E]) && c !== f && c[M] !== l && k[c.nodeName] && !a.a.cr(c, b) && !a.a.cr(b, c) && !e(c) && !h(c)) && (c = d(c)) && p(c) && t && c && 0.5 <= a.z.q(t.cumulRect, c.cumulRect))
                                return !0;
                        return !1;
                    }
                    function p(a) {
                        var b = 0.01 * a.width, c = 0.01 * a.height;
                        return {
                            tl: [
                                a.left + b,
                                a.top + c
                            ],
                            m: [
                                a.left + (a.right - a.left) / 2,
                                a.top + (a.bottom - a.top) / 2
                            ],
                            br: [
                                a.right - b,
                                a.bottom - c
                            ]
                        };
                    }
                    function t(b, c) {
                        var e = [], d = a.g.h(b);
                        d && (e = f(function (c) {
                            var e = g(new a.z.j(b)).visibleRect;
                            new a.z.j(c);
                            return {
                                rect: e,
                                frame: c,
                                doc: c.ownerDocument
                            };
                        }, d));
                        e.unshift({
                            rect: g(new a.z.j(b)).visibleRect,
                            frame: b,
                            doc: b.ownerDocument
                        });
                        for (d = 0; d < e.length; d++) {
                            var h = p(e[d].rect), k = !1;
                            if (0 != h.tl[0] || 0 != h.tl[1] || 0 != h.br[0] || 0 != h.br[1])
                                k = !0;
                            if (k && l(b, h, e[d].doc, e[d].frame, c))
                                return !0;
                        }
                        return !1;
                    }
                    a.z = {};
                    var q = a.c.c, y = {};
                    a.z.a = 0.5;
                    a.z.b = 0.3;
                    a.z.c = 0.98;
                    a.z.d = void 0;
                    a.z.e = function (b, c) {
                        c = c || !1;
                        return function (e, h) {
                            var g = e.ao.skin ? a.z.f(e, h) : d(e, h);
                            g.isVisible = c ? g.percv > b : g.percv >= b;
                            g.elGeo && (g.elGeo.threshold = b);
                            return g;
                        };
                    };
                    a.z.f = function (c, e) {
                        function h() {
                            if (c.isMultipartAd && c.multipartComponents && 0 < c.multipartComponents.length) {
                                for (var a, b = 0, g = 0; g < c.multipartComponents.length; g++) {
                                    var f = d(c.multipartComponents[g], e);
                                    f.visibleArea >= b && (b = f.visibleArea, a = c.multipartComponents[g]);
                                }
                                return d(a, e);
                            }
                        }
                        function g() {
                            if (c.isCompositeAd && c.components && 1 < c.components.length) {
                                for (var h = {
                                            area: 0,
                                            visibleArea: 0,
                                            percv: 0,
                                            visibleRect: !1,
                                            cumulRect: !1,
                                            yMinMax: !1,
                                            elGeo: !1,
                                            rect: !1,
                                            componentResults: []
                                        }, f, l = 0; l < c.components.length; l++)
                                    f = d(c.components[l], e), h.area += f.area, h.visibleArea += f.visibleArea, h.componentResults.push(f);
                                h.percv = h.visibleArea / h.area;
                                c.compositeAdAreaPx = h.area;
                                (f = b(h.componentResults)) && 'strict' === a.w.b(c.zr) && a.k.a.zaxs('rectsAvailable', c.zr, f.elRect, f.visibleRect);
                            } else
                                h = d(c, e);
                            return h;
                        }
                        c.viewabilityMethod.strict || (c.viewabilityMethod.strict = 1);
                        if (1 == c.ao.skin) {
                            var f = {}, l = a.c.e.scrollY || a.c.e.document.documentElement.scrollTop;
                            if ('width' == a.x.b && a.x.c <= c.adContent && 45 < l || !a.focus.pageIsVisible())
                                return f.isVisible = !1, f.isFullyVisible = !1, f.percv = 0, f;
                            f.isVisible = !0;
                            f.isFullyVisible = !0;
                            f.isDentsuVisible = !0;
                            f.percv = 1;
                            a.k.a.zaxs('adEdgesViewStatus', c.zr, {
                                topLeft: !0,
                                topRight: !0,
                                bottomLeft: !0,
                                bottomRight: !0
                            });
                            return f;
                        }
                        f = c.isMultipartAd ? h(c, e) : c.isCompositeAd ? g(c, e) : d(c, e);
                        'strict' === a.w.b(c.zr) && a.c.c && !a.c.ce() && a.k.a.zaxs('rectsAvailable', c.zr, f.cumulRect, f.visibleRect);
                        var l = a.z.g(f, c), p = a.z.c;
                        f.isVisible = f.percv >= l;
                        f.isFullyVisible = f.percv >= p;
                        f.elGeo && (f.elGeo.threshold = l);
                        c.videoIsFullscreen && 0 < f.percv && (f.isVisible = !0);
                        0.8 <= f.percv && (f.isDentsuVisible = !0);
                        a.z.d ? f.percv > a.z.d && (a.z.d = f.percv) : a.z.d = f.percv;
                        c.AD_RECT = f && f.rect;
                        return f;
                    };
                    a.z.g = function (b, c) {
                        return a.aa.a(b.area) ? (c.viewstats || (c.viewstats = {}), c.viewstats.isBigAd = !0, a.z.b) : a.z.a;
                    };
                    a.z.h = function () {
                        return q;
                    };
                    a.z.i = d;
                    a.z.k = k;
                    a.z.l = a.c.r;
                    a.z.j = function (b, c, e, d) {
                        try {
                            this.rect = e || b.getBoundingClientRect && b.getBoundingClientRect() || {};
                        } catch (h) {
                            this.rect = e || b && {
                                top: b.offsetTop,
                                left: b.offsetLeft,
                                width: b.offsetWidth,
                                height: b.offsetHeight,
                                bottom: b.offsetTop + b.offsetHeight,
                                right: b.offsetLeft + b.offsetWidth
                            } || {};
                        }
                        e = 'left right top bottom width height'.split(' ');
                        for (d = 0; d < e.length; d++) {
                            var g = e[d];
                            this[g] = this.rect[g];
                        }
                        b && b.CLIPCHECKINGTARGET && b.CLIPCHECKINGTARGET.style && 'absolute' === b.CLIPCHECKINGTARGET.style.position && (e = a.a.ct(b.CLIPCHECKINGTARGET.style.clip)) && (this.right = this.left + e.right, this.left += e.left, this.bottom = this.top + e.bottom, this.top += e.top);
                        this.width = this.right - this.left;
                        this.height = this.bottom - this.top;
                        this.el = b;
                        this.win = c || b && a.a.be(b);
                        this.changeReferenceFrame = function (a) {
                            this.left += a.left;
                            this.right += a.left;
                            this.top += a.top;
                            this.bottom += a.top;
                        };
                        this.calcArea = function () {
                            return (this.right - this.left) * (this.bottom - this.top);
                        };
                        this.getViewportRect = function (b) {
                            var c = a.c.r(this.win);
                            b && (b.width < c.width && (c.width = b.width, c.right = c.left + c.width), b.height < c.height && (c.height = b.height, c.bottom = c.top + c.height));
                            return c;
                        };
                    };
                    a.z.n = function (a, b, c) {
                        return 'undefined' === typeof a ? !1 : {
                            left: Number(b) + Number(a.left),
                            right: Number(b) + Number(a.right),
                            top: Number(c) + Number(a.top),
                            bottom: Number(c) + Number(a.bottom)
                        };
                    };
                    a.z.m = function (b, e) {
                        if ('undefined' === typeof b || 'undefined' === typeof e)
                            return !1;
                        var d = c(b.left, b.right, e.left, e.right), h = c(b.top, b.bottom, e.top, e.bottom);
                        return new a.z.j(void 0, void 0, {
                            left: d[0],
                            right: d[1],
                            top: h[0],
                            bottom: h[1]
                        });
                    };
                    a.z.o = function (b, c, e, d) {
                        if (!b || !c || !e)
                            return !1;
                        b = a.z.i(b);
                        if (!b)
                            return !1;
                        e = d || a.z.m(c, e);
                        if (!e)
                            return !1;
                        d = a.z.n(b.visibleRect, c.left, c.top);
                        return d ? (e = a.z.m(d, e)) ? {
                            elementRect: a.z.n(b.cumulRect, c.left, c.top),
                            visibleRect: e,
                            area: b.area,
                            calcVisiblePercv: function () {
                                return (this.visibleRect.right - this.visibleRect.left) * (this.visibleRect.bottom - this.visibleRect.top) / this.area;
                            }
                        } : !1 : !1;
                    };
                    a.z.p = function (a, b) {
                        b || (b = window);
                        try {
                            var c = b.document.documentElement, e = b.document.body;
                            return 'left' === a ? b.pageXOffset || c && c.scrollLeft || e && e.scrollLeft : b.pageYOffset || c && c.scrollTop || e && e.scrollTop;
                        } catch (d) {
                            return !1;
                        }
                    };
                    a.z.i = d;
                    a.z.r = function (b) {
                        var c = b.aa;
                        b = b.zr;
                        if (c) {
                            if (a.c.q)
                                c = t(c, b);
                            else
                                var e = g(new a.z.j(c)).visibleRect, e = p(e), c = l(c, e, a.c.e.document, null, b);
                            return c;
                        }
                    };
                    a.z.s = function (a) {
                        return a ? (a.right - a.left) * (a.bottom - a.top) : !1;
                    };
                    a.z.t = function (b) {
                        function c(b) {
                            return a.a.db(b) || 'string' === typeof b;
                        }
                        return 'object' === typeof b && c(b.left) && c(b.right) && c(b.top) && c(b.bottom) ? !0 : !1;
                    };
                    a.z.q = function (b, c) {
                        if (!a.z.t(b) || !a.z.t(c))
                            return !1;
                        var e = a.z.m(b, c);
                        if (!e)
                            return !1;
                        var d = a.z.s(b);
                        return e.calcArea() / d;
                    };
                    a.k.a.azsx('adKilled', function (a) {
                        a && !a.ep && delete y[a.zr];
                    });
                }(u));
                (function (a) {
                    function k(a) {
                        var c = 0, d;
                        return function () {
                            var g = new A().getTime();
                            150 < g - c && (d = a.apply(this, arguments), c = g);
                            return d;
                        };
                    }
                    function d(b) {
                        function c(a) {
                            'undefined' !== typeof b.overrideViewMethod && (a.viewabilityMethod[y] = b.overrideViewMethod);
                            return m(a);
                        }
                        var d = b.isVisibleFn, g = b.isMeasurableFn, p = b.pauseCheckingFn, k = b.careFoc, q = b.qsKeys, y = b.counterLabel, x = y;
                        a.c.am();
                        var n = [], m = d, I = 0, G = 0, J = 0, C = 0, z = 0, K = 0, E = 0, P = 0;
                        new A().getTime();
                        var v = !1, H = !1, r = !1, u = !1, Ga, Q, B, T, la = 0, D = 0, F = !1, M = !1, L = 0, O = 0, ya = 0, R = !1, Ha = !1, ea = !1, U = a.c.c, ma, ua;
                        if (0 === q)
                            var Y = 'as', Z = 'ag', N = 'an', aa = 'ck', fa = 'kw', V = 'ah', ga = 'aj', W = 'pg', X = 'pf', ha = 'gi', ba = 'gf', ca = 'ix', ia = 'gg', da = 'ez', F = !0;
                        else
                            1 === q ? (Y = 'cc', Z = 'bw', N = 'bx', aa = 'ci', fa = 'jz', V = 'bu', ga = 'dj') : 2 === q ? (Y = 'cg', Z = 'ce', N = 'cf', aa = 'cj', fa = 'ts', V = 'ah', ga = 'dk', ha = 'gj', ba = 'gb', ca = 'ig', ia = 'ge', da = 'ez') : 3 === q ? (Y = 'cg', Z = 'ce', N = 'cf', aa = 'cj', fa = 'ts', V = 'ah', ga = 'dk', ha = 'gi', ba = 'gf', ca = 'ix', ia = 'gg', da = 'ez') : 5 === q ? (Y = 'aa', Z = 'ad', N = 'cn', aa = 'co', fa = 'cp', V = 'ah', ga = 'cq', ha = 'gn', ba = 'gk', ca = 'ik', ia = 'gl', da = 'ez') : 6 === ('number' === typeof q ? q : q.type) && (Y = q.otsKey, Z = q.ivtKey, N = q.lastivtKey, aa = q.ivtAtOtsKey, fa = q.timeToViewSendKey, V = q.timeToViewAskKey, ga = q.visOnLoadKey, ha = q.fullyIvtOtsKey, ba = q.fullyIvtKey, ca = q.maxfullyIvtKey, ia = q.lastFullyIvtKey, da = q.wasPartiallyInviewKey);
                        this.getLabel = function () {
                            return x;
                        };
                        this.addListener = function (b) {
                            var c = !1;
                            a.a.forEach(n, function (a) {
                                if (a === b)
                                    return c = !0, !1;
                            });
                            c || n.push(b);
                        };
                        this.removeListener = function (a) {
                            for (var b, c = n.length; b < c; b++) {
                                var e = !1, d = !1, h;
                                for (h in n[b])
                                    if (d || (d = !0), n[b][h] !== a[h]) {
                                        e = !0;
                                        break;
                                    }
                                d && !e && n.splice(b, 1);
                            }
                        };
                        this.hadOTS = function () {
                            return r;
                        };
                        this.hadFullOTS = function () {
                            return u;
                        };
                        this.hadFIT = function () {
                            return 0 < G;
                        };
                        this.hadVideo2SecOTS = function () {
                            return 'undefined' != typeof _hadVideo2SecOts && _hadVideo2SecOts;
                        };
                        this.hadDentsuVideoOTS = function () {
                            return !1;
                        };
                        this.hadDentsuDisplayOTS = function () {
                            return R;
                        };
                        this.getInViewTime = function () {
                            return I;
                        };
                        this.getFullyInViewThreshold = function () {
                            return 0.98;
                        };
                        this.getLastInviewPercent = function () {
                            return L;
                        };
                        this.getLastInviewPercentWithThresholdCap = function () {
                            return 0.98 <= L ? 1 : L;
                        };
                        this.getCareAboutFocus = function () {
                            return k;
                        };
                        this.getPauseCheckingFn = function () {
                            return p;
                        };
                        this.visible = function () {
                            return v;
                        };
                        this.fullyVisible = function () {
                            return H;
                        };
                        this.wasPartiallyInview = function () {
                            return M;
                        };
                        this.getFullInviewTimeTotal = function () {
                            return G;
                        };
                        this.getMaximumContinuousInViewTime = function () {
                            return w.max(z, K);
                        };
                        this.getMaximumContinuousFullyInViewTime = function () {
                            return w.max(P, E);
                        };
                        this.getDentsuInViewTime = function () {
                            return O;
                        };
                        this.getDentsuAudibleAndVisibleTime = function () {
                            return 0;
                        };
                        this.isAdMeasurable = function (a) {
                            var b = 'function' === typeof g && g(a);
                            a && a.isMeasurabilityDisabled() && (b = !1);
                            return b;
                        };
                        this.adStartedOnScreen = function () {
                            return T;
                        };
                        this.update = function (b, d, h) {
                            if (ua === h)
                                return !1;
                            ua = h;
                            h = 'function' === typeof g && g(b);
                            b && b.isMeasurabilityDisabled() && (h = !1);
                            if (!h)
                                return !1;
                            var m = I || 0, J = G || 0;
                            h = !1;
                            var C = c(b);
                            C.rect && (b.elementRect = C.rect, b.currentWidth = b.elementRect.right - b.elementRect.left, b.currentHeight = b.elementRect.bottom - b.elementRect.top);
                            b.viewabilityPercent[x] = a.a.db(C.percv) ? w.round(100 * C.percv) : '-';
                            'number' === typeof C.area && (b.ADAREA = C.area);
                            var y = C.isVisible, A = C.isFullyVisible, D = C.isDentsuVisible, N = C.percv && 0 < C.percv;
                            L = C.percv;
                            !m && C.percv && a.k.a.zaxs('adEntersView', b);
                            var S = p(b), S = (!k || a.ac.e(b)) && !S;
                            a.k.a.zaxs('adCheckingState', b, x, S);
                            y = y && S;
                            A = A && S;
                            N = N && S;
                            A && a.k.a.zaxs('adFullyVisible', b, x);
                            ea = D && S;
                            !M && N && (M = !0);
                            if (y && v)
                                I += d, z += d;
                            else if (y || v)
                                D = w.round(d / 2), I += D, z += D;
                            if (A && H)
                                G += d, E += d;
                            else if (A || H)
                                D = w.round(d / 2), G += D, E += D;
                            if (ea && Ha)
                                O += d, ya += d;
                            else if (ea || Ha)
                                D = w.round(d / 2), O += D, ya += D;
                            !r && 1000 <= z && (h = r = !0, this.timeToView = Ga = b.counters.query()[V], Q = I);
                            !u && 1000 <= E && (u = !0, a.k.a.zaxs('fullOtsReached', b, x));
                            'undefined' === typeof B && (D = b.counters.query().bu, 1000 >= D ? y && (B = !0) : B = !1);
                            'undefined' === typeof T && (D = b.counters.query().bu, 1000 >= D ? N && (T = !0) : T = !1);
                            (b.el = U) && 'undefined' === typeof ma && 2 !== q && 3 !== q && C.elGeo && (D = f().y + C.elGeo.foldTop, S = C.elGeo.threshold * C.elGeo.elHeight, D = D > a.w.c() - S, 0 < C.elGeo.totalArea && (ma = D, b.dn = ma));
                            F && N && (la = w.min(w.max(L, la), 1));
                            K < z && (K = z);
                            P < E && (P = E);
                            y || (z = 0);
                            A || (E = 0);
                            v = y;
                            H = A;
                            1000 <= ya && (R = !0);
                            ea || (ya = 0);
                            Ha = ea;
                            a.a.forEach(n, function (a) {
                                var b = C && C.percv, b = 'number' === typeof b && 100 * b;
                                if (a.onInViewTimeCount)
                                    a.onInViewTimeCount(d, I - m, b, x);
                                if (a.onFullyInViewTimeCount) {
                                    var c = w.max(G - J, 0);
                                    a.onFullyInViewTimeCount(d, c, b, x);
                                }
                            });
                            return h;
                        };
                        this.getQS = function (a, b, c) {
                            J > I && (J = I);
                            C > G && (C = G);
                            a[Y] = Number(r);
                            a[Z] = I;
                            a[N] = J;
                            if (0 === q || 2 === q || 3 === q || 5 === q || ('number' === typeof q ? q : q.type))
                                u && ha && (a[ha] = 1), b = 0 === q && c && 'sframe' === c, ba && !b && (a[ba] = G, a[ia] = C, b = this.getMaximumContinuousFullyInViewTime(), a[ca] = b, x === c && (a.ic = b)), M && da && (a[da] = 1);
                            'undefined' !== typeof Q && (a[aa] = Q);
                            'undefined' !== typeof Ga && (a[fa] = Ga);
                            'undefined' !== typeof B && (a[ga] = Number(B));
                            !0 === F && (c = w.round(100 * la), b = w.round(100 * D), a[W] = c, a[X] = b, D = la);
                            'undefined' !== typeof ma && (a.ib = Number(ma));
                            J = I;
                            C = G;
                        };
                    }
                    function f() {
                        var b = a.c.e, c = b.document;
                        return { y: void 0 !== b.pageYOffset ? b.pageYOffset : (c.documentElement || c.body.parentNode || c.body).scrollTop };
                    }
                    a.w = {};
                    var g = {}, c = {};
                    a.w.c = function () {
                        return U ? a.c.r(a.c.e).height : 750;
                    };
                    a.w.d = function (b) {
                        var e = b.zr;
                        a.k.a.azsx('adKilled', a.w.a, {
                            once: !0,
                            condition: function (a) {
                                return a.zr == b.zr;
                            }
                        });
                        g[e] = g[e] || {};
                        b.viewstats = { isBigAd: !1 };
                        if (b && b.isMeasurabilityDisabled())
                            return !1;
                        if (a.c.dl() || a.c.am().isInApp && a.c.c) {
                            var h = k(a.z.f), f;
                            a.c.ce() || a.ab && a.ab.a() ? a.c.cy() || a.c.cx() && a.c.am() : f = new d({
                                isVisibleFn: h,
                                isMeasurableFn: a.c.dl,
                                pauseCheckingFn: a.ac.a,
                                careFoc: !0,
                                qsKeys: 0,
                                counterLabel: 'strict'
                            });
                            f && (g[e].strict = f);
                            h = new d({
                                isVisibleFn: h,
                                isMeasurableFn: a.c.dl,
                                pauseCheckingFn: a.ac.a,
                                careFoc: !1,
                                qsKeys: 1,
                                counterLabel: 'lax'
                            });
                            g[e].lax = h;
                        } else
                            !0 !== b.isSkin && a.m && a.m.a() && (h = new d({
                                isVisibleFn: a.m.b,
                                isMeasurableFn: a.c.dq,
                                pauseCheckingFn: a.ac.a,
                                careFoc: !0,
                                qsKeys: 3,
                                counterLabel: 'pscope'
                            }), g[e].pscope = h);
                        a.o && a.o.b() && !g[e].pscope && (h = new d({
                            isVisibleFn: a.o.c,
                            isMeasurableFn: a.c.dr,
                            pauseCheckingFn: a.ac.a,
                            careFoc: !0,
                            qsKeys: 2,
                            counterLabel: 'pscope'
                        }), g[e].pscope = h);
                        e = a.k.a.azsx('view:tick', a.a.df([b], a.w.e), { priority: 5 });
                        c[b.zr] = e;
                        a.k.a.zaxs('viewCounterStarted', b);
                    };
                    a.w.f = function (b, c, d) {
                        return b && c && d ? (b = a.w.g(b.zr, c)) && 'function' == typeof b[d] && b[d]() : !1;
                    };
                    a.w.h = function (b, c) {
                        if (b && c) {
                            var h = a.c.ei(), f;
                            !c.sframe && h && (f = h.measurableFn, h = h.name, g[b.zr].sframe = new d({
                                isVisibleFn: a.ad.a,
                                isMeasurableFn: f,
                                pauseCheckingFn: a.ac.a,
                                viewabilityApiName: h,
                                careFoc: !0,
                                qsKeys: 5,
                                counterLabel: 'sframe'
                            }), a.k.a.zaxs('viewCounterStarted', b));
                        }
                    };
                    a.w.e = function (b, c, d) {
                        if (a.a.cq(b)) {
                            var f = g[b.zr], p;
                            a.w.h(b, f);
                            for (var k in f)
                                f.hasOwnProperty(k) && f[k].update(b, c, d) && (p = !0);
                            b.fireFullViewEvent = !1;
                            a.a.forEach(b.secondaryCounters, function (a) {
                                a.update(b, c, d);
                            });
                            b.fireFullViewEvent && (a.ac.b(b), b.fireFullViewEvent = !1);
                            p && a.ac.c(b);
                            a.aa.b(b);
                            b.ao && 1 == b.ao.skin && 'width' == a.x.b && a.x.d();
                            a.d.e(b) && a.ac.d(b);
                        }
                    };
                    a.w.i = function (b, c) {
                        return a.w.j(b) >= c;
                    };
                    a.w.j = function (b) {
                        var c = 0;
                        (b = b && 'undefined' !== typeof b.zr && a.w && a.w.k(b.zr)) && (c = b.getInViewTime());
                        return c;
                    };
                    a.w.l = function () {
                        return 'hadOTS';
                    };
                    a.w.m = function (b, c) {
                        var d = a.w.l();
                        return b && b && 'undefined' != typeof b.zr ? c ? a.w.f(b, c, d) : a.w.f(b, a.w.b(b.zr), d) : null;
                    };
                    a.w.n = function (b, c) {
                        var d = a.w.o(b.zr);
                        return a.o && a.o.a && d && d.pscope && d.pscope[c ? 'hadVideo2SecOTS' : 'hadOTS']();
                    };
                    a.w.p = function (b, c) {
                        var d = a.w.o(b.zr);
                        return a.o && a.o.a && d && d.pscope && d.pscope[c ? 'hadDentsuVideoOTS' : 'hadDentsuDisplayOTS']();
                    };
                    a.w.q = function (b, c) {
                        var d = a.w && a.w.o(b.zr);
                        return a.o && a.o.a && d && d.pscope && d.pscope.getFullInviewTimeTotal() >= c;
                    };
                    a.w.r = function (b) {
                        var c = 0;
                        (b = b && 'undefined' !== typeof b.zr && a.w && a.w.k(b.zr)) && (c = b.getFullInviewTimeTotal());
                        return c;
                    };
                    a.w.s = function (b, c) {
                        return a.w.r(b) >= c;
                    };
                    a.w.a = function (b) {
                        delete g[b.zr];
                        c.hasOwnProperty(b.zr) && a.k.a.sxaz('view:tick', { id: c[b.zr] });
                    };
                    a.w.o = function (a) {
                        var c;
                        g[a] ? c = g[a] : g[a] = c = {};
                        return c;
                    };
                    a.w.g = function (b, c) {
                        var d = a.w.o(b);
                        return d && d[c];
                    };
                    a.w.t = function (b) {
                        var c, d, g;
                        if (!b || !b.strict)
                            return !1;
                        b = a.c.am().isInApp;
                        c = a.c.cq();
                        d = a.c.cw();
                        g = a.c.cu();
                        c = c && a.c.c || d;
                        return b && c || !(b || g);
                    };
                    a.w.b = function () {
                        var b;
                        return function (c, d) {
                            var f = null, p = g[c];
                            a.w.t(p) ? f = 'strict' : p && p.sframe ? f = 'sframe' : p && p.pscope && (f = 'pscope');
                            (p = 'undefined' !== typeof B && B[c]) && p.isMeasurabilityDisabled() && (f = null);
                            a.d.c() && !d && (f = null);
                            b != f && (b = f, a.k.a.esgf('preferredViewCounterUpdate', B[c]));
                            return f;
                        };
                    }();
                    a.w.k = function (b, c) {
                        var d = 'undefined' !== typeof B && B[b];
                        if (!d || !d.isMeasurabilityDisabled()) {
                            var d = a.w.b(b, c), f = g[b];
                            if (!a.d.c() || c)
                                return f && d && f[d];
                        }
                    };
                    a.w.u = function (b, c) {
                        var d = {}, f = g[b], p = a.w.b(b), k;
                        for (k in f)
                            f.hasOwnProperty(k) && f[k].getQS(d, c, p);
                        a.aa.c(b, d);
                        a.ae.a(b, d);
                        a.w.k(b) && a.w.k(b).hadDentsuDisplayOTS() && (d.nb = 1);
                        (f = B[b]) && f.viewstats && f.viewstats.isBigAd && (d.el = 1);
                        return d;
                    };
                }(u));
                (function (a) {
                    a.af = {};
                    a.af.a = function (a, d) {
                        var f;
                        d.outerHTML ? f = d.outerHTML : (f = document.createElement('div'), f.appendChild(d.cloneNode(!0)), f = f.innerHTML);
                        f = [
                            /flashvars\s*=\s*(".*?"|'.*?')/i.exec(f),
                            /name\s*=\s*["']flashvars["']\s*value\s*=\s*(".*?"|'.*?')/i.exec(f),
                            /value\s*=\s*(".*?"|'.*?')\s*name\s*=\s*["']flashvars["']/i.exec(f),
                            a
                        ];
                        for (var g, c, b = {}, e = 0; e < f.length; e++) {
                            if ((g = f[e]) && 'object' === typeof g && g[1])
                                g = g[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/^"/g, '').replace(/"$/g, '').replace(/^'/g, '').replace(/'$/g, '');
                            else if ('string' === typeof g)
                                g = g.split('?')[1];
                            else
                                continue;
                            if (g) {
                                g = g.split('&');
                                for (var h = 0; h < g.length; h++)
                                    c = g[h].split('='), 2 > c.length || 'function' == c[0].slice(0, 8) || (b[c[0]] = [c[1]]);
                            }
                        }
                        return b;
                    };
                }(u));
                (function (a) {
                    a.x = {};
                    a.x.e = {};
                    a.x.b = 'divs';
                    a.x.e.a || (a.x.b = 'width', a.x.e.a = function (a) {
                        return 1000;
                    });
                    a.x.d = function () {
                        var k = a.c.e, d = a.c.q && k.document || document, f = d.documentElement, d = d.getElementsByTagName('body')[0];
                        try {
                            a.x.c = k && k.innerWidth || f && f.clientWidth || d && d.clientWidth;
                        } catch (g) {
                        }
                    };
                    a.x.a = function (k, d, f) {
                        if ('divs' == a.x.b) {
                            if (k._Mt_wIC)
                                return !0;
                            if (k._Mt_wOC)
                                return !1;
                            var g = f.currentTarget, c = k;
                            for (f = 0; 1000 > f && !a.a.ax(d, c); f++) {
                                if (c == g || null == c)
                                    return k._Mt_wOC = !0, !1;
                                c = c.parentElement;
                            }
                            return k._Mt_wIC = !0;
                        }
                        if ('width' == a.x.b) {
                            k = d / 2;
                            g = a.x.c / 2;
                            c = f.clientX;
                            f = f.clientY;
                            var b = a.c.e.scrollY || a.c.e.document.documentElement.scrollTop;
                            return a.x.c > d && (c > g + k || c < g - k) || 90 > f + b ? !1 : !0;
                        }
                        if ('ad-els' === a.x.b) {
                            if (k._Mt_wIC)
                                return !0;
                            if (k._Mt_wOC)
                                return !1;
                            g = f.currentTarget;
                            c = k;
                            for (f = 0; 1000 > f; f++) {
                                if (a.a.ax(d, c))
                                    return k._Mt_wOC = !0, !1;
                                if (c == g || null == c)
                                    break;
                                c = c.parentElement;
                            }
                            return k._Mt_wIC = !0;
                        }
                    };
                }(u));
                (function (a) {
                    a.ag = {};
                    var k = [];
                    a.ag.a = function (a, f) {
                        k.push({
                            query: a,
                            callback: f
                        });
                        return !1;
                    };
                }(u));
                (function (a) {
                    function k() {
                        function b(c) {
                            for (var e = ''; 0 < c;)
                                e += a.f.a([c % 62]), c = w.floor(c / 62);
                            return e;
                        }
                        function c(a) {
                            return {
                                propertyMethods: [
                                    function (b, c) {
                                        try {
                                            var e = c.split('.'), d = a, h = e[0];
                                            1 < e.length && (d = e[0], h = e[1]);
                                            return a[d].hasOwnProperty(h).toString();
                                        } catch (g) {
                                            return (!1).toString();
                                        }
                                    },
                                    function (b, c) {
                                        try {
                                            var e = c.split('.'), d = a, h = e[0];
                                            1 < e.length && (d = e[0], h = e[1]);
                                            return a.Object.getOwnPropertyDescriptors(a[d])[h].get.toString();
                                        } catch (g) {
                                            return '';
                                        }
                                    },
                                    function (b, c) {
                                        try {
                                            var e = c.split('.'), d = a, h = e[0];
                                            1 < e.length && (d = e[0], h = e[1]);
                                            return a.Object.getOwnPropertyDescriptors(a[d])[h].get.toString.toString();
                                        } catch (g) {
                                            return '';
                                        }
                                    }
                                ],
                                functionMethods: [
                                    function (a, b) {
                                        return a.name;
                                    },
                                    function (a, b) {
                                        try {
                                            return new a.toString();
                                        } catch (c) {
                                            return c.toString();
                                        }
                                    },
                                    function (b, c) {
                                        return a.Function.prototype.toString.call(b);
                                    },
                                    function (b, c) {
                                        return a.Function.prototype.toString.call(b.toString);
                                    },
                                    function (a, b) {
                                        try {
                                            return ('prototype' in a).toString();
                                        } catch (c) {
                                            return (!1).toString();
                                        }
                                    }
                                ]
                            };
                        }
                        var e = [
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    47,
                                    34,
                                    44,
                                    34,
                                    27,
                                    34,
                                    37,
                                    34,
                                    45,
                                    50,
                                    18,
                                    45,
                                    26,
                                    45,
                                    30
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    33,
                                    34,
                                    29,
                                    29,
                                    30,
                                    39
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    38,
                                    40,
                                    51,
                                    7,
                                    34,
                                    29,
                                    29,
                                    30,
                                    39
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    38,
                                    44,
                                    7,
                                    34,
                                    29,
                                    29,
                                    30,
                                    39
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    48,
                                    30,
                                    27,
                                    36,
                                    34,
                                    45,
                                    7,
                                    34,
                                    29,
                                    29,
                                    30,
                                    39
                                ]),
                                a.f.a([
                                    39,
                                    26,
                                    47,
                                    34,
                                    32,
                                    26,
                                    45,
                                    40,
                                    43,
                                    72,
                                    48,
                                    30,
                                    27,
                                    29,
                                    43,
                                    34,
                                    47,
                                    30,
                                    43
                                ]),
                                a.f.a([
                                    39,
                                    26,
                                    47,
                                    34,
                                    32,
                                    26,
                                    45,
                                    40,
                                    43,
                                    72,
                                    46,
                                    44,
                                    30,
                                    43,
                                    0,
                                    32,
                                    30,
                                    39,
                                    45
                                ]),
                                a.f.a([
                                    39,
                                    26,
                                    47,
                                    34,
                                    32,
                                    26,
                                    45,
                                    40,
                                    43,
                                    72,
                                    26,
                                    41,
                                    41,
                                    13,
                                    26,
                                    38,
                                    30
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    23
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    24
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    19,
                                    40,
                                    41
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    11,
                                    30,
                                    31,
                                    45
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    72,
                                    26,
                                    47,
                                    26,
                                    34,
                                    37,
                                    22,
                                    34,
                                    29,
                                    45,
                                    33
                                ]),
                                a.f.a([
                                    44,
                                    28,
                                    43,
                                    30,
                                    30,
                                    39,
                                    72,
                                    26,
                                    47,
                                    26,
                                    34,
                                    37,
                                    7,
                                    30,
                                    34,
                                    32,
                                    33,
                                    45
                                ])
                            ], h = [
                                a.f.a([
                                    3,
                                    26,
                                    45,
                                    30
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    33,
                                    26,
                                    44,
                                    5,
                                    40,
                                    28,
                                    46,
                                    44
                                ]),
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    30,
                                    37,
                                    30,
                                    38,
                                    30,
                                    39,
                                    45,
                                    5,
                                    43,
                                    40,
                                    38,
                                    15,
                                    40,
                                    34,
                                    39,
                                    45
                                ]),
                                a.f.a([
                                    5,
                                    46,
                                    39,
                                    28,
                                    45,
                                    34,
                                    40,
                                    39,
                                    72,
                                    41,
                                    43,
                                    40,
                                    45,
                                    40,
                                    45,
                                    50,
                                    41,
                                    30,
                                    72,
                                    45,
                                    40,
                                    18,
                                    45,
                                    43,
                                    34,
                                    39,
                                    32
                                ]),
                                a.f.a([
                                    43,
                                    30,
                                    42,
                                    46,
                                    30,
                                    44,
                                    45,
                                    0,
                                    39,
                                    34,
                                    38,
                                    26,
                                    45,
                                    34,
                                    40,
                                    39,
                                    5,
                                    43,
                                    26,
                                    38,
                                    30
                                ]),
                                a.f.a([
                                    44,
                                    30,
                                    45,
                                    8,
                                    39,
                                    45,
                                    30,
                                    43,
                                    47,
                                    26,
                                    37
                                ]),
                                a.f.a([
                                    44,
                                    30,
                                    45,
                                    19,
                                    34,
                                    38,
                                    30,
                                    40,
                                    46,
                                    45
                                ]),
                                a.f.a([
                                    13,
                                    40,
                                    45,
                                    34,
                                    31,
                                    34,
                                    28,
                                    26,
                                    45,
                                    34,
                                    40,
                                    39
                                ]),
                                a.f.a([
                                    22,
                                    30,
                                    27,
                                    6,
                                    11,
                                    17,
                                    30,
                                    39,
                                    29,
                                    30,
                                    43,
                                    34,
                                    39,
                                    32,
                                    2,
                                    40,
                                    39,
                                    45,
                                    30,
                                    49,
                                    45,
                                    72,
                                    41,
                                    43,
                                    40,
                                    45,
                                    40,
                                    45,
                                    50,
                                    41,
                                    30,
                                    72,
                                    32,
                                    30,
                                    45,
                                    18,
                                    46,
                                    41,
                                    41,
                                    40,
                                    43,
                                    45,
                                    30,
                                    29,
                                    4,
                                    49,
                                    45,
                                    30,
                                    39,
                                    44,
                                    34,
                                    40,
                                    39,
                                    44
                                ])
                            ], g = [
                                a.f.a([
                                    29,
                                    40,
                                    28,
                                    46,
                                    38,
                                    30,
                                    39,
                                    45,
                                    72,
                                    33,
                                    26,
                                    44,
                                    5,
                                    40,
                                    28,
                                    46,
                                    44
                                ]),
                                a.f.a([
                                    39,
                                    26,
                                    47,
                                    34,
                                    32,
                                    26,
                                    45,
                                    40,
                                    43,
                                    72,
                                    48,
                                    30,
                                    27,
                                    29,
                                    43,
                                    34,
                                    47,
                                    30,
                                    43
                                ])
                            ];
                        return '1_' + function (a) {
                            for (var b = '', c = e.concat(h), d = 0; d < c.length; d++) {
                                var g = c[d];
                                if (a.hasOwnProperty(g))
                                    for (var g = a[g], f = 0; f < g.length; f++)
                                        b += g[f] + '-';
                            }
                            return b;
                        }(function () {
                            for (var a = {}, h = c(window), f = {}, l = 0; l < e.length; l++)
                                f[e[l]] = !0;
                            for (l = 0; l < g.length; l++) {
                                var k = g[l];
                                a[k] = [];
                                var C = h.functionMethods;
                                f.hasOwnProperty(k) && (C = h.propertyMethods);
                                try {
                                    for (var z, y = window, E = k.split('.'), P = 0; P < E.length; P++)
                                        y = y[E[P]];
                                    z = y;
                                    for (y = 0; y < C.length; y++) {
                                        var v = C[y];
                                        try {
                                            a[k].push(b(d(v(z, k).replace(/\-/g, '%2D').replace(/\s*/g, ''))));
                                        } catch (r) {
                                            a[k].push('');
                                        }
                                    }
                                } catch (r) {
                                    a[k].push('E');
                                }
                            }
                            return a;
                        }());
                    }
                    function d(a) {
                        var b = 0, c = a.length, e, d;
                        if (0 == c)
                            return b;
                        for (e = 0; e < c; e++)
                            d = a.charCodeAt(e), b = (b << 5) - b + d, b &= b;
                        return b >>> 0;
                    }
                    function f() {
                        var b = [];
                        if (!a.g.d(window.top)) {
                            var c = [], e = a.f.a([
                                    28,
                                    33,
                                    43,
                                    40,
                                    38,
                                    30
                                ]), d = a.f.a([
                                    30,
                                    49,
                                    45,
                                    30,
                                    39,
                                    44,
                                    34,
                                    40,
                                    39
                                ]), h = '\'' + e + '-' + d + '://\']';
                            window.top.document && 'function' === typeof window.top.document.querySelectorAll && (c = window.top.document.querySelectorAll('[src^=' + h + ',[data^=' + h + ',[href^=' + h));
                            0 !== c.length && window.String && 'function' === typeof window.String.prototype.match && a.a.forEach(c, function (a) {
                                (a = a.outerHTML.match('[a-z]+="' + e + '-' + d + '://([a-z]+)')) && 1 < a.length && -1 === b.indexOf(a[1]) && b.push(a[1]);
                            });
                        }
                        c = b.join(',');
                        window.String && window.String.prototype.slice && (c = c.slice(0, 150));
                        return a.f.i(c);
                    }
                    function g(a, c) {
                        const $___old_c726960d73dea21c = {}.constructor.getOwnPropertyDescriptor(window, 'XMLHttpRequest');
                        try {
                            if ($___old_c726960d73dea21c)
                                ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___mock_7235ea711e4437da.XMLHttpRequest));
                            return function () {
                                try {
                                    var g = a.split(h), f = c || window, l, n;
                                    for (n = 0; n < g.length; n++) {
                                        l = g[n];
                                        if (null === f || typeof f === b)
                                            return 1;
                                        f = f[l];
                                    }
                                    return typeof f === b ? 2 : null === f ? 3 : 4 + d(a + e + f.toString()) % 58;
                                } catch (k) {
                                    return 0;
                                }
                            }.apply(this, arguments);
                        } finally {
                            if ($___old_c726960d73dea21c)
                                ({}.constructor.defineProperty(window, 'XMLHttpRequest', $___old_c726960d73dea21c));
                        }
                    }
                    function c() {
                        var a, b = [
                                function () {
                                    return 'c$$b' !== 'cab'.replace('a', function () {
                                        return '$$';
                                    });
                                },
                                function () {
                                    return eval('class A { constructor(pp) { this.pp = pp; }\n call() { return this.pp; }\n }\n class B extends A { tS(a) { return super.call(); }\n tT(a){ return this.call(); } }\n  const obj = new B("cab");  (obj.tS() !== obj.tT()); ');
                                },
                                function () {
                                    return eval('\'\\\n\r\'');
                                },
                                function () {
                                    return eval('((new Date("1300-02-28T21:11:11.000Z")).toISOString() !== "1300-02-28T21:11:11.000Z")');
                                },
                                function () {
                                    return eval('(new Date("2835")).toISOString() !== "2835-01-01T00:00:00.000Z"');
                                },
                                function () {
                                    return -1 !== '22'.localeCompare('122', 'de', { numeric: !0 });
                                },
                                function () {
                                    return 'p' === window.atob('cab==');
                                },
                                function () {
                                    return 'cab' !== 'cab'.split(/\b/).pop();
                                },
                                function () {
                                    return void 0 === Array.prototype.find;
                                },
                                function () {
                                    return Number.isNaN('MAX_SAFE_INTEGER');
                                },
                                function () {
                                    return /(G)+|(X)+X/.test('X ');
                                },
                                function () {
                                    return 'bec' != 'cabecab'.match('.?e.?');
                                },
                                function () {
                                    var a = {};
                                    [
                                        'cab',
                                        'cab'
                                    ].sort(a, a);
                                    return !0;
                                },
                                function () {
                                    var a = new Proxy([
                                        3,
                                        444
                                    ], {});
                                    return [
                                        12,
                                        444
                                    ].concat(a)[3];
                                },
                                function () {
                                    return eval('let x = (e) => { let e = true;};');
                                },
                                function () {
                                    return 0 === new ArrayBuffer(5).slice(3, 4394878398).byteLength;
                                }
                            ];
                        a = '1-';
                        for (var c = 0; c < b.length; c++) {
                            var e;
                            try {
                                e = (0, b[c])() ? '1' : '0';
                            } catch (d) {
                                e = '2';
                            }
                            a += e;
                        }
                        return a;
                    }
                    a.ah = {};
                    var b = a.f.a([
                            46,
                            39,
                            29,
                            30,
                            31,
                            34,
                            39,
                            30,
                            29
                        ]), e = a.f.a([77]), h = a.f.a([72]), l;
                    a.ah.a = function (b) {
                        if (void 0 !== l)
                            return a.a.i(l);
                        l = {};
                        var e = a.c.e;
                        try {
                            var h = e.document, y = h.body, x = e.innerWidth || h.documentElement.clientWidth || y.clientWidth, n = e.innerHeight || h.documentElement.clientHeight || y.clientHeight, m = e.outerWidth || y.offsetWidth, I = e.outerHeight || y.offsetHeight;
                        } catch (r) {
                        }
                        try {
                            var G = e.screenX || e.screenLeft || e.screenX, J = e.screenY || e.screenTop || e.screenY;
                        } catch (r) {
                        }
                        var C = new A().getTimezoneOffset(), z;
                        if (document && document.body) {
                            var K = document.createElement(a.f.a([
                                34,
                                31,
                                43,
                                26,
                                38,
                                30
                            ]));
                            K.width = a.f.a([
                                53,
                                41,
                                49
                            ]);
                            K.height = a.f.a([
                                53,
                                41,
                                49
                            ]);
                            K.style.left = '-' + a.f.a([
                                61,
                                61,
                                61,
                                61,
                                41,
                                49
                            ]);
                            K.style.top = '-' + a.f.a([
                                61,
                                61,
                                61,
                                61,
                                41,
                                49
                            ]);
                            K.style.position = a.f.a([
                                26,
                                27,
                                44,
                                40,
                                37,
                                46,
                                45,
                                30
                            ]);
                            document.body.appendChild(K);
                            z = K;
                        } else
                            z = void 0;
                        var E = a.f.a([
                                84,
                                41,
                                33,
                                26,
                                39,
                                45,
                                40,
                                38
                            ]), P = a.f.a([
                                28,
                                26,
                                37,
                                37,
                                15,
                                33,
                                26,
                                39,
                                45,
                                40,
                                38
                            ]), v = !0 === ('undefined' != typeof e[E] || 'undefined' != typeof e[P]) ? 1 : 0, H, u = z, w = /(?:Mac OS X )(\d{2}_\d{2})(?:.*Version\/)(\d{2})/, B = a.f.a([
                                64,
                                28,
                                29,
                                28,
                                84,
                                26,
                                44,
                                29,
                                35,
                                31,
                                37,
                                26,
                                44,
                                46,
                                45,
                                40,
                                41,
                                31,
                                33,
                                47,
                                28,
                                25,
                                11,
                                38,
                                28,
                                31,
                                37,
                                84
                            ]), Q = a.f.a([
                                28,
                                33,
                                43,
                                40,
                                38,
                                30
                            ]), D = a.f.a([
                                43,
                                46,
                                39,
                                45,
                                34,
                                38,
                                30
                            ]), T = a.f.a([
                                41,
                                37,
                                46,
                                32,
                                34,
                                39,
                                44
                            ]), la = a.f.a([
                                15,
                                37,
                                46,
                                32,
                                34,
                                39,
                                0,
                                43,
                                43,
                                26,
                                50
                            ]), F = a.f.a([
                                38,
                                34,
                                38,
                                30,
                                19,
                                50,
                                41,
                                30,
                                44
                            ]), M = a.f.a([
                                38,
                                26,
                                49,
                                19,
                                40,
                                46,
                                28,
                                33,
                                15,
                                40,
                                34,
                                39,
                                45,
                                44
                            ]), L, O, R, U, W, X = 2, ea = 2, ja = 2, ma = e.document && e.document[B] ? 1 : 0, ua, Y, Z, N, aa = a.f.a([
                                34,
                                45,
                                30,
                                38
                            ]), fa = a.f.a([
                                45,
                                30,
                                44,
                                45
                            ]);
                        if (window.String && window.String.prototype.match) {
                            var V = navigator.userAgent.match(w);
                            L = null != V && '10_12' == V[1] && '10' == V[2];
                        } else
                            L = !1;
                        if (!L) {
                            var ga = a.f.a([
                                    47,
                                    34,
                                    29,
                                    30,
                                    40,
                                    73,
                                    38,
                                    41,
                                    56,
                                    75
                                ]) + ' ' + a.f.a([
                                    28,
                                    40,
                                    29,
                                    30,
                                    28,
                                    44,
                                    77,
                                    90,
                                    26,
                                    47,
                                    28,
                                    53,
                                    72,
                                    58,
                                    56,
                                    52,
                                    52,
                                    53,
                                    4,
                                    71
                                ]) + ' ' + a.f.a([
                                    38,
                                    41,
                                    56,
                                    26,
                                    72,
                                    56,
                                    52,
                                    72,
                                    54,
                                    90
                                ]), qa = a.f.a([
                                    26,
                                    46,
                                    29,
                                    34,
                                    40,
                                    73,
                                    38,
                                    41,
                                    56,
                                    75
                                ]) + ' ' + a.f.a([
                                    28,
                                    40,
                                    29,
                                    30,
                                    28,
                                    44,
                                    77,
                                    90,
                                    38,
                                    41,
                                    56,
                                    26,
                                    72,
                                    56,
                                    52,
                                    72,
                                    54,
                                    90
                                ]), ra = document.createElement('video'), ha = document.createElement('audio');
                            try {
                                O = ra.canPlayType(ga);
                            } catch (r) {
                                O = 'E';
                            }
                            try {
                                R = ha.canPlayType(qa);
                            } catch (r) {
                                R = 'E';
                            }
                        }
                        var ba = [], ca, ia;
                        if (window.navigator) {
                            Y = (ua = window.navigator[M]) && Object.getOwnPropertyDescriptors && void 0 !== Object.getOwnPropertyDescriptors(navigator)[M];
                            if (window.navigator[T]) {
                                ia = window[la] && window[la].prototype === navigator[T].__proto__;
                                var da = window.navigator[T];
                                ca = da.length;
                                Object.getOwnPropertyDescriptors && Object.getOwnPropertyDescriptors(window.navigator)[T] && (U = !0);
                                for (var xa = 0; xa < ca && 10 > xa; xa++)
                                    ba.push(da[xa].name);
                                Z = d(ba.join('*'));
                                if (window.navigator[T][aa])
                                    try {
                                        N = window.navigator[T][aa](fa) ? 0 : 1;
                                    } catch (r) {
                                        N = 3;
                                    }
                                else
                                    N = 2;
                            }
                            W = window.navigator[F] && window.navigator[F].length;
                        }
                        a.g.d(window.top) || (ja = window[Q] && 'object' === typeof window[Q][D] ? 1 : 0);
                        if (u)
                            var na = u.contentWindow, X = (ea = 'object' === typeof na[Q] ? 1 : 0) && 'object' === typeof na[Q][D] ? 1 : 0;
                        H = [
                            ja,
                            ea,
                            X,
                            ca,
                            Z,
                            ia ? 1 : 0,
                            W,
                            U ? 1 : 0,
                            R,
                            O,
                            ma,
                            ua,
                            Y ? 1 : 0,
                            N
                        ];
                        for (var oa = [], ka = 0; 10 > ka; ka++)
                            oa.push(H[ka]);
                        var va = l, sa, ta = window.location && window.location.ancestorOrigins && Array.from && Array.from(window.location.ancestorOrigins);
                        sa = d(ta ? ta.join(',') : '');
                        va.ol = sa;
                        var wa = l, Ia;
                        try {
                            for (var Ja = [
                                        a.f.a([
                                            33,
                                            26,
                                            43,
                                            29,
                                            48,
                                            26,
                                            43,
                                            30,
                                            2,
                                            40,
                                            39,
                                            28,
                                            46,
                                            43,
                                            43,
                                            30,
                                            39,
                                            28,
                                            50
                                        ]),
                                        a.f.a([
                                            47,
                                            30,
                                            39,
                                            29,
                                            40,
                                            43
                                        ]),
                                        a.f.a([
                                            41,
                                            37,
                                            26,
                                            45,
                                            31,
                                            40,
                                            43,
                                            38
                                        ]),
                                        a.f.a([
                                            46,
                                            44,
                                            30,
                                            43,
                                            0,
                                            32,
                                            30,
                                            39,
                                            45
                                        ]),
                                        a.f.a([
                                            48,
                                            30,
                                            27,
                                            29,
                                            43,
                                            34,
                                            47,
                                            30,
                                            43
                                        ])
                                    ], S = {}, za = 0; za < Ja.length; za++)
                                S[Ja[za]] = window.navigator[Ja[za]];
                            Ia = a.f.h(a.f.l(S));
                        } catch (r) {
                            Ia = '';
                        }
                        wa.qn = Ia;
                        l.tf = k();
                        var Ea = l, Oa, Pa = 'toolbar scrollbars locationbar menubar personalbar statusbar'.split(' '), pa = [], Aa, Ba;
                        for (Ba = 0; Ba < Pa.length; Ba++)
                            try {
                                Aa = Pa[Ba], !0 === window[Aa].visible ? pa.push(1) : !1 === window[Aa].visible ? pa.push(0) : void 0 === window[Aa].visible ? pa.push(2) : pa.push(3);
                            } catch (r) {
                                pa.push(4);
                            }
                        Oa = pa.join('');
                        Ea.vi = Oa;
                        l.rc = oa.join(',');
                        l.rb = '1-' + a.f.i(H.join(','));
                        var Fa = l, Qa;
                        Qa = 'isSecureContext' in window ? window.isSecureContext ? 1 : 0 : 2;
                        Fa.sc = Qa;
                        l.os = '1-' + f();
                        l.qp = a.f.n.join('');
                        var ab = l, Ka;
                        var Ra = z;
                        if (Ra) {
                            var Sa = a.f.k('&]xoul#)k]mdrcfaxgum:hm_mfR_jru*UchYqnL^:vwjdmqh1M$bges5{T|r0hmkmhs\'.c T|dq,YKHY\\GTN`QUB[^GO>\\ICYAYK[2[:F]G@H=WH1{qerbvo0evfzG#hlhz2\npoaMlhlmith5`p`n+&f{`ua{)yp|d;cflklk&Mcnchfxbw-p]ub25{kvbqR `plGYfbq#N:S7;4yonek^z]ziMZqYr%VLG9FBQ917{a|\\lr0a\n`nUybo\'|Rz\\-?xgpcoh3i{a X7mcim)Ghzhs\\ \n#Xlc2dhhsim"Hf"e7SGT\\\\TCO@6:!e\t%mcr_wb86zZpa=_nmipp)Giody\'|Rz\\-?ylr]{bublft8{qqnMskb\t)LNP3Y@OEcHK;_:18lX~enKq]lB|Yyo8go^r#Ccjgu_acqehVTinmv*KEGBR@6;zfrkpmx`U_ydy[N3cGMdu_zfvhzm8go^r#Cjy]wi{imHl_~gnFCP\\Pkf `|\'zV{^uf0;G;`6X[jfxbw-navdz\\7>]L<\\Uq/jifjnt!HIZ  XphupmoVfzkok!j;cflklk&OHX9vg}gnqUp ikF\ngo\'Y6f=S?Q=VY^JQ;35bFLnwj|bxG\ttv^`fy\\/QYHSI^IXUYG[85BUONlthQ\\m^`fy\\/LEEHM\\6H;fDd?N+EO[Dxc\nksguC!cf,JGQNk;F9LQaHUD.?[POa{j|m`fy\\/IIQILMBJIfDd?N+EO[Hkmqmkfsd_lmc2>RH`TK7J7nE^KG(KPY?pt h\nUcXmsi&o_z\\y^35bFV`vdU^~"y\\w^:4`JOsq]uco6whhk=_nmipp)IG^Kk`sC!cf,WL\\FQTWKS7;6\\RRnqjohtqoOo]!\\/AWKb?YH19ZEbg!kgOpbkh9gogueu#Dfejd]\nZw:hfp!MNEQUBTHjKYLWEVFO]TJH=Q9NDN\tR_rdppZbih9ikfs~Pcjnfgdlp#sWtW;6uhr^w^xXPqog!\nNK`REJJ?`!HbpbqbjqfA~bth9>KIbF_@OEcHK;_:19s[\tUx`t`Mskb\t)N;Z4Y@DI0;oc|WtWyVXgnl0hmkmhs\'Mh"_ Hvcyaqa_iwW{Wvl7mcim)Ifp_og!Znc/jifjnt!HhlVta}hch6kgap\'Mn e|dFtifw(W:^FY7bF5CQIZbihWd}m<]rehrl$GIYHjj{Sq_nSqgmkR]~o8go^r#E_xYWlmcx\\ldXgnl0jijk O\\~ZbcnetdijLnqbQ_zf=ajlg(Lbhir)}^!?|eVqijFipZJnjW\tgrnpo4AuW\nhog!\nQFDSQ=QNkI^FLQ]BMD.@w`{api~?\nRtdflx&SL[8JIZ;]:hHPO\\O[7_DYGm?\\;F*HgfoyZsjMdpZvdpp6QKL_ZXHR69;payehh\nI~fl RBVLGJ\\\\TCO@6>zVz\\or2;G;`6dIL5c<XMaJWAK Pgofs_ @orijq[xh3dh_t\nNmvazMoW\tp|^W_]`dryjh?!Zsj55PC]TTEVDeDS<]>:6{kfpTafn gj?uBxV}ttaMskb\t)XH\\69<spsjHpqcy$HFnGJQIA\\)KjlgOk\n`\t%mcr_wb8:{[ufbb~qea6@RC^@N%TZy\\Fpvgu(]JTJHQTKLDG@MAe9]M6?w]rJzqx]p@uaj;uf l7mcim)Lc}hNZ!RRmflx&F;\\IZHP@VRYGCOM)Lc}hNZ!RRmflx&q[yZ1=h_tcjcGrmkz"N<ZMcCVEH]T@DMQ!LWtW\tTmGcl|fi5no\tZ!`\t%mcr_wb8<jesarT}hqjXly]\tdygSc\tfs,rYp_8=YCS3{_Lnnhm`z]zi8go^r#IRQDP[~fz[l7{Xvdpp6ikbror%VEZCQgglxlq:q[tW}g7kgjoqn SOWEa]|kFjiehh\n#q[uY"[5GVITQxUnfOes^reu,PGD>Q91?K4Rh{rqn6kgap\'S=P<rpS_r_h(xd|[y4~hwc0hmkmhs\'S=PGritgsfFbmcl[Lhta}-OK]PKAZQO%WIPV3.9W3-D)5-8%E):/90A/:"N\\xK"_;ebki$L^xZI[hV{\\wd0hmkmhs\'SfoXr%o_q]/Cziq$Ug|UnqHkzjgh9n\ti~`\tkfbPgf[xZxEm {Xwfvd4Fthw)\\^zR `wcXap_Rdwchf=_nmipp)Ob\tg8oF3\t\\biMlhlmith5e#cyntpmaRcn\\v^ @s%mcr_wb8@joLhta}-FKU\\\\?jNOIOCNKPP0ChsQkjd{ SBV^XGgTOBjJOFm2aKO*O]|\\{VwZLhta}-FKU\\\\?j>SKQFZ=MC\\$N_$WtWyVTinmv*LLSSaFi>:<rpcmejg?!Zsj56^@hUM[N.7 V`"[}R\t[Ftifw(PDRU]=n9:4.Gmvhclmn>#V{k/BSEbPWTSKTBP7B+Ma _uU}_Oos_ %EMQWYEkI1CP6X4lbgo{+tUx`6FW5VFvrtmwGme3dh_t\nVHFEXlxh9gogueu#NQQYqc|jqW{[~aNugj|+SGjHKGWAbCBRMGQY_IFJLQ_ENRGHM@Z XNW^rZnBfwIjui~#RIf?T7R@aGMVKF]ZNH[2VE-Kelk(ubzb5`p`n+Oalfg8pqs\\s:{]p,rYp_8BjZpSZX!Lgo{^mYPqog!\nP8QRYJLHSTU>HET\nVdfeiHkm~)v^|X _-Ki\\l[YZyWkS"T7kgjoqn X`nbo>rkbbeld(zVr[3?tWr`Ua|qobrn\\Z|Xr%o_q]/GqYnWZa#eld0jijk X`nboD if_q=y_zi3bl`vgq+Pklb47O<^:mDR:UGSFbH[9J"UasX7CQ?]JKB_ZZHa:a@PLc>RFXD\\?U9;Axcg*XOU7PN]B\\8l@OQXJX=`>TDf@^7N+Pk|fl]n\\~b}_;ebki$R\\vZhj5YtgYqqpwq\tdpJp\'|Rz\\-Mj^v]~ZjdJS}ijr0hmkmhs\'Y_tdpifcr;dh!Vx$uS|X5Nxaz`ub~o|Zw_r[Fpvgu(xZs]{Z;CjxoavqOb~o|n{V{kt,rYp_8EfotW}g[dsqmpzI{_kms6"\\or2:X<NANDNQ_;JRG(X^\tapi~Ksb!\\trYhg[\nZJll`"!WNPA4Mkfqj|fo_p\\Fjiehh\nIncp`v!w`oa4Mkfqj|fo_p\\ScwgxloZY_t[}Z7kgjoqn [jsg!V\t<wcrl1QQ7P?[QUB[BG[IQe:ZMM>m>\\LTCc<RQZ!Uez["\\xm0jijk [mols_ Xugsf1fqcljo\t_enrgj|^z]ziMh|_rZugsfDpm^qWi^t8\tdpp6KUBP\'Zksdreu_xarhOdsdlU"\\xmEhwpk9 `xm<?\\EF*TjhmqcyW{[~aLnpjm`z]ziVb e;ebki$Sl{ejh{k]bmdNe{q4blho%^focjaO]|=~Zi[ufxTu-ko]pkfa`|btjvehNpYw`{gr7|fwXwsk_iqufLqkbzRocf,p]qa\n]1F|ewF~au_zfvhtjx\'|Rz\\-NykkM WxYy[\tgrnpKxqocyn8es_tki*VLF>`BKJv`t6q`pcmB|Yyo8<]?aIPJcEDMW!WJJ6pgjBj]vkk`Pqog!\n[FOC0JW=Piqi[dpa|oqn|+tUx`6Kb4VZfRvYqm|dwj5`p`n+TPKMkY}>yg|Vpkjmr&o_z\\y^3Dc6[sr?wkzft]\tmw_tJpsv[h(zVr[3Dc6[srOmkjY})v^|X _-PiYg[najI{dtTv-p]ub2Fp\\nZp]rJupiYp>q[fksfaXjcgn6kgap\'\\^t]rZu,h]o_\nZUhvbte}x0jijk ]`pesT %flyehlmij$sW}Z}g.NmcrYno8b 6$kflwaefq#sWtW;Enenakq4gpo8es_tki*V]pi\nZUbhkqTlj0hmkmhs\'\\^~`\tkjlkGemqg{[y }Tvd.Nmpvcyno\'zV{^uf0KYAMcnchftW]qcj{cufxGsl!\ny\\oex`/Mb<K;I^tamDnaubth9N`@m7R9MCR<bG[9JUK;U9NQGJKB2GaBP>Tf{ZHCp]p_zi3bl`vgq+UROCub\tAk\\sF\t`Fjiehh\n#q[uY"[5RXCU^y_Pgofs_ %TTKWXHUIdJ`BTR^RGN[MG7PJXNa69JWETYwb_Zl$W3c;\\DI[UL\\9_JiKS=9JWETYwb_Zl7yUPU|-R=\\EY9RZWHd6aF`PID/Mb<UW{ZbXp@t_Zbr"[<^Aa6TVVLOFRQZ!XLNBpgqRgcKiugpKkmv\n]8UFW=JYMGHUH4b\n\\UILiqnGpbMn\ngrkpOyYglminYHT!!w`oa4P\\;[\\~aaVtCjlilrLqa3FHFWFNFaHQKKHZZ\\>Z~`MHNelkMq\\Q_uW"b_dtpq`g`L]}\'|Rz\\-QZ?S[\n]X[n>xansqRmoz]n\\vKs];GBRLKHAk8QEZ7_4]G.O^DVU\tc]^u=vju,p]qa\n]1Ild$\\ldYkzhkf9gogueu#Tfejh^MgwW\n4#Yodt*qp\\]pr8es_tki*W`dlqYFhyS\'5~ehaz+rYyb~a:DuXsch9ulmnGkmXte7mcim)Y\\lmo]e`\tbfp2dhhsim"Zf~ejfgIikg[pm8es_tki*Wlucz\\3chfr[7mcim)Yh}dx`<d}cjr2fdgq!Xjy[}Z7steu+rYyb~a:D pmcW`h_\nAni{ {Xwfvd4Qkl\tO|Zq\\PlfJmkw(xZs]{Z;GrlgNikmY~)xZ{V9Kpsg`1fqcljo\tcejbmA~bth9>KIbF_@OEcHK;_:1Jyg!gncVuxby"tn]\\\nZ}kVPP&q[yZ1Jyg!gncWNT+rYyb~a:F?=/MX@HLk:WHVD;HRDxavq4APOKX[2`B-SVAHl~dw$sW}Z}g.QZFKf}j|\' enZlRvYf_X^r_{\tdFKHukkexcyj\tlW_aiblw^hl^Zxksf=ajlg(]pkfL^~b#R `pl2fdgq![J[DtZrnp*tbt[\tc6OwUrfUpe[nFuhy$sW}Z}g.SM?M@j^yf~crjtchWw_#izhlQ!&}b0?WJVFPN]>RP_>C?cK6NOTIN[%n8aS.Sm_Gg~`w[zj;:pktao_Qgwey !gjbmPz^iYWdwb!~d\\c?wkhgna~$Yg}grlgAzouf9gogueu#Xcf9vmqbgb\n $Tuhf]|b4blho%eVo>M0Ggpj ijHl`sX{hpcKlthps~\'OE\\DJAc;ROZIJHf4d9ODT[QKJ9c\'a^p8Y)DmqhxnqGjdkW \\wfEkvqkl\t)MH^JlIF?HWEOR;JHf4XAMHPC4TkVRG<<}^}lucV]q^qgndn5~a}dzp6BR9X@XMm2_IBWc:X@R:WUI;]7RMI(_bh;W-Mh{a!kfPifg_~^s]Ja}gnwv*NOGAP=_?T6_#Xcf?O,Odrf|ftEnmfazft[Njxmsi %N?\\WVBM9JHfEcB[@IAg?RCNFiLWKR#Xcf?O,Odrf|ftEnmfazft[Njxmsi %N?\\WWLMCX<VD\\RODG@J>I?jDXMSCY<BTI<b=[BUEU7]G\\+YajDR&]`x]scvehAsfw_#i3;S7\\8WSa=ZOGMj=_?T6_#Xcf?O,^ZsZldxapBqj|b~h9A\\:[6OLGDIJb;`IF9O?TA]^INMBTS^Dd>:HrYHJ6JhhpZw_uYRbwsgt|+S5cZ]>`GRI`UEAWY`>R;VGc\n`ddCT/XYy_okw_t:plx]{n:INCLAdGhDZLQOK87Ro[U=?Iflh]ucz\\Heuftk}-WJQCUFXZLE]4XVBAXAY?kJS?MAa@hHP@Q@KG7Ro[U=?Iflh]ucz\\Heuftk}-WJQCUFXZLNT7RI`@MFGCZ<1MlTV?;Qgjlbx]ybMh|erou,YFVCSCJ:f;]G5Vg^OI8Fpin^\nZ{^Dmrlhr\n#q[uY"[5Vg^OIXYy_okw_t:plx]{n:7TESQe8L1.Sm_M@]`x]scvehAsfw_#i3BP@T4[+YajDRFpin^\nZ{^Dmrlhr\n#TDLQ\\<WTU[KLTG_<XMm4\\CPP0Oh\\SAW[uVtermi?wkzY"o8I]=f>PLcGI@_:YU\\@XG\\+YajDRFpin^\nZ{^Dmrlhr\n#W=I3C\n`ddCTOkbo`|b|XPforipw(_6RFS7n6XUGNIDK b`lDweNejkelliz:{[uf=>NXWL4TkVVd~:|ZzXugsfHpqcy$uS|X5Vg^Sfz7^NU^&W\tXncwJxfq#sWtW;JnaMe|@YGX\\~kwi;]smq>oimi8(Hd T!-navdz\\7Ro[YZ Ks_rklnuds;}W}g7@V[\\>X;PO6PsSX`uRvYqmuineu7$Xws0IWRY9OMK@:HrYLgxLu[zhnjpa}8\tdpp6ikbror%eVoJpao]w(OATIP@V\n`ddOw`qY\t)xZ{V9NsgxYefqHyhlS|7necqtq]ftook<_ndf*\\EOB\niuHlc#X|s0HW>J=YB6Qa=aGsmg]vm{g3dh_t\njorhq`ghtjx<oTu\\/GHDH&meubpUpgrnp?i`nY9PZ=OERIF?HQ/[|eq_jS"\\xmE]kek"xj#:rU;ebki$dj|anYhfxbwBc_pb4g!\\z<oTu\\/jifjnt!ffw^xVjskkv@gWs`8n~Unkf,rYp_8Wwe~eteRmvazcgWp)Nb RocfBvYjO|atWk {Xwfvd4`gWs`}\'rVy\\uc2dhhsim"jSr[nr0dip4blho%qRp_fq2edno]3bl`vgq+e]kekg9jz^|\ny\\oex`/]tgtcl rfr-navdz\\7^rk}^r%dqm&q[yZ1Yod~`n-il}?kbncwZ\n\\veh,gjdmt<ukWd~Vnru*tbt[\tc6\\vc|df,pgd^`^r[z {Xwfvd4`nfzho\'|e})429&j_\nDw_n[}TuFwelbVUr`8es_tki*g`uiyZ3mlT!gxqg*qkyhlgv\'zV{^uf0[kl{bj$~Wqf}nta6lt8zrxe}RqGsmkjhm\t#fZkD#_nr0hmkmhs\'ma\n`z\\/uiZvn{gj$v`Sb\nmnkiaVfzb|^ d;[jqtYw]t#q[uY"[5bjnwjk"!`ll!`\t\\/mr<rqzatWkB bpqgo{+j]~kkmqY;ebki$fb~dr[5itU|sqnm+ubOj gz`n[Qps_u_\th3]lfahudu*tbt[\tc6\\vc|df,{]em\ndw[5a}7xvphw^jD}jqksd\n%i_wDlm\nZs[y {Xwfvd4`nfzho\'$Vojumv]1iz9tmu^~TmOtkookg~)|^{`"\\Mgwlhhqg3bl`vgq+ehqmhclmn=oen%epshH`rZhj3U~a|nna6akV\nb8es_tki*ggqm{aj$ld b{-navdz\\7^yg `y\\/evgxj:cfcl\trbwrqhm+mfzpz<}]yXqqi\\1fqcljo\trbwrqhm+rcr)v^|X _-asfvixZ3chdzGrlghqkk"w`x`!Y9Zplwgo_:hhhlW}fqnv*tbt[\tc6\\}_\nfmc2llgq#q[uY"[5bqj{lrY9osfsD Xnn2dhhsim"jd\'c}n0o}_z`p)n^qc%gu,rYp_8Xwowf~!|tdptb4Yy^|r~e;cflklk&og~f{a=f~avhm+mYy`|Z!VX\\z,rYp_8Ym-nSF_qhjh6tx]\t`vg<_ndf*havjmih^Lhta}-p]ub2Y"ook|Ry%BbhKh[~XmFya$\\mdt*tbt[\tc6^%erio_p&Lm_ZfhjZ_exuk`moOb~okezVq%upgLkl{iybl "elAkjl+sY\tcy]wkr#gcx[k(zVr[3X#_uRenmbt s0v^s_Bk4h9&zluij$uS|X5gko|lxm9ayk$R\t[/jifjnt!m_zf~e!-taxigWpN~Z!V;cflklk&uci[\tWs7K+kjlb~Yo?L\'rR Xc_w]v(xZs]{Z;\\|Rg_}ok7zi~^%e9bq/6n9sme9_5i \\}dnj6ikbror%z[n.kdhnf]:lw_{W{a7kgjoqn x\\!<}_{\\drmgqm\\ZwIld$X{+oavrhU})\nb Zocf*qg}L`8X[zexbwCgokood\tdyg<_ndf*rYycsVyey pcyMcim)tU dqZ!`\t%dmscl_QcfXsWs\nw`xeo^zc})mksUreugedv(~ZvkpdtH|dtImaoU\tdyg<]rehrl$q[!^lW{a !rrRnwquWzgRZ|Uy\\sPi_lm\nZw[k }Tvd.jiso[loyk<^\nDbvXgx]tEt_uf!\nw`xeo^zc})z^\n^vjtgsfv(}jjh\n }Tvd.jiso[loyk<a|`orijHhmWq[k\t}T\thi]|lx"}`{nsd DfbmYN_$H~i{W|4lbgo{+tUx`6gogv^brsj1mqg{_jWfb{jgn6`ub\tmyezV\t%plijui~!sW}[vT}nt*{bxjt^oP}cx\\s,ggqn~dqbld=bwrv]|bi\\liq^:_nmjeelrl:hjh}[rX`ntgmo4g\t\\|m[V\njbeik1fqcljo\t~cnm0hmkmhs\'yis_QXu_fYv_:cfcl\t~ekhvqu?xc!nok<gritgsf/i~^jd{S"\\xm.lmolc}hkgqV;ZmcejP_mhzhle=ajlg(xbxZzmwZ|Tr%o_zaj[\n^td5f~=\\NP*tbt[\tc6iscsfskeff_:cflpYpgrnp*|vvY7k|b|e;ebki$sl{buj5`p`n+u]up{br<|\'qR{Jim{&q[yZ1ijd~_uA{*tbt[\tc6lqc|cmRs&o_z\\y^3etg]hoawrz"w`x`!Y9jfrXap_{jy$uS|X5rram`nG#i~asdvj/aeff_x#q[uY"[5rram`nG#i~asdvj/eilYiuXji5^tapsj({mkYnc]r|eu\\tgw&s_zYndn\t$\\|tch^fkk{j|m<Yr`hfx$yc\tjfb][tjyntp6mg[pGo_!~"`tsedYcqlueyf=jrcvd4tkVLkz\'sb!Xmq2fdgq!|[i]xgL`p_miGbthkmw`{=s_q]1hmbj"~Wq^rsTayrkg\tAsesD%jucq&o_z\\y^3itUthvNmpu` `VhqRy=jjiK|m\nZrKY>=_nmipp)}Ymfsmaar\\dfKjdgyVw$sW}Z}g.sm_q]\tNz^sTuIfas_qc\n^tdLd b{-p]ub2kp]ub!D}\\falJh]{\\s_{[~aNugj|+I5[O_KW?TVQFEKH&$VsZlj=c~anekCkU\tp|^<Ur]bsplEl{lx[yB bvovE{>r`zro]<_ndf*}Yq^qm3f|T{\\lEg]|rxY9bomW^n^fQmrh(xZs]{Z;ljmfa\n+vimgs\\TVnkvpi&lmPZkW|^"5{nyomo4`piqmv~%Xobip1j Wq_j8tT}tta6fyG\t\\~b evZtCrYefqY3dh_t').split(a.f.a([71])), bb = Sa.length, Ca, Ta = [];
                            for (Ca = 0; Ca < bb; Ca++)
                                Ta.push(g(Sa[Ca], Ra.contentWindow));
                            Ka = a.f.a(Ta);
                        } else
                            Ka = '';
                        ab.is = Ka;
                        l.iv = 8;
                        l.qt = v;
                        l.gz = a.c.ap() ? 1 : 0;
                        l.hh = a.c.aq() ? 1 : 0;
                        l.hn = a.c.ar() ? 1 : 0;
                        var cb = l, La;
                        try {
                            La = !a.g.d(window.top) && window.top.name ? a.f.h(window.top.name.substring(0, 50 > window.top.name.length ? window.top.name.length : 50)) : '';
                        } catch (r) {
                            La = '';
                        }
                        cb.tw = La;
                        void 0 !== G && (l.qc = G);
                        void 0 !== J && (l.qd = J);
                        l.qf = x;
                        l.qe = n;
                        l.qh = m;
                        l.qg = I;
                        l.qm = C;
                        l.qa = a.c.w;
                        l.qb = a.c.x;
                        l.qi = a.c.u;
                        l.qj = a.c.v;
                        var db = l, Ua, Da = [];
                        try {
                            var eb = a.f.a([
                                    47,
                                    40,
                                    34,
                                    28,
                                    30,
                                    44,
                                    84,
                                    34,
                                    39,
                                    34,
                                    45,
                                    30,
                                    29,
                                    84
                                ]), fb = a.f.a([
                                    17,
                                    46,
                                    39,
                                    19,
                                    26,
                                    44,
                                    36
                                ]), gb = a.f.a([
                                    2,
                                    26,
                                    39,
                                    28,
                                    30,
                                    37,
                                    19,
                                    26,
                                    44,
                                    36
                                ]), hb = 'undefined' !== typeof window[fb], ib = 'undefined' !== typeof window[gb];
                            Da.push('undefined' !== typeof window[eb] ? 1 : 0);
                            Da.push(hb ? 1 : 0);
                            Da.push(ib ? 1 : 0);
                        } catch (r) {
                        }
                        Ua = Da.join('');
                        db.to = Ua;
                        l.po = c();
                        var jb = l, Va, kb = a.f.a([
                                28,
                                26,
                                39,
                                47,
                                26,
                                44
                            ]), Wa = a.f.a([
                                48,
                                30,
                                27,
                                32,
                                37
                            ]), lb = a.f.a([
                                30,
                                49,
                                41,
                                30,
                                43,
                                34,
                                38,
                                30,
                                39,
                                45,
                                26,
                                37
                            ]), mb = a.f.a([
                                22,
                                4,
                                1,
                                6,
                                11,
                                84,
                                29,
                                30,
                                27,
                                46,
                                32,
                                84,
                                43,
                                30,
                                39,
                                29,
                                30,
                                43,
                                30,
                                43,
                                84,
                                34,
                                39,
                                31,
                                40
                            ]), nb = a.f.a([
                                20,
                                13,
                                12,
                                0,
                                18,
                                10,
                                4,
                                3,
                                84,
                                21,
                                4,
                                13,
                                3,
                                14,
                                17,
                                84,
                                22,
                                4,
                                1,
                                6,
                                11
                            ]), ob = a.f.a([
                                20,
                                13,
                                12,
                                0,
                                18,
                                10,
                                4,
                                3,
                                84,
                                17,
                                4,
                                13,
                                3,
                                4,
                                17,
                                4,
                                17,
                                84,
                                22,
                                4,
                                1,
                                6,
                                11
                            ]), pb = a.f.a([
                                47,
                                30,
                                39,
                                29,
                                40,
                                43
                            ]), qb = a.f.a([
                                43,
                                30,
                                39,
                                29,
                                30,
                                43,
                                30,
                                43
                            ]), rb = a.f.a([
                                28,
                                43,
                                30,
                                26,
                                45,
                                30,
                                4,
                                37,
                                30,
                                38,
                                30,
                                39,
                                45
                            ]), Xa = a.f.a([
                                32,
                                30,
                                45,
                                2,
                                40,
                                39,
                                45,
                                30,
                                49,
                                45
                            ]), sb = a.f.a([
                                32,
                                30,
                                45,
                                4,
                                49,
                                45,
                                30,
                                39,
                                44,
                                34,
                                40,
                                39
                            ]), Ya = a.f.a([
                                32,
                                30,
                                45,
                                15,
                                26,
                                43,
                                26,
                                38,
                                30,
                                45,
                                30,
                                43
                            ]), Ma = {};
                        try {
                            var Za = document[rb](kb), Na = Za[Xa](Wa) || Za[Xa](lb + '-' + Wa), $a = Na[sb](mb);
                            Ma[pb] = Na[Ya]($a[nb]);
                            Ma[qb] = Na[Ya]($a[ob]);
                        } catch (r) {
                        }
                        Va = a.f.h(a.f.l(Ma));
                        jb.vy = Va;
                        b && (l.mst = b);
                        if (z)
                            try {
                                document.body.removeChild(z);
                            } catch (r) {
                            }
                        return a.a.i(l);
                    };
                }(u));
                (function (a) {
                    function k(b) {
                        var c = a.f.r(!0);
                        b = 'https://geo.moatads.com/n.js?' + a.y.b(35, b, c, !1, !0).res.querystring;
                        a.ak.a('data', 'MoatDataJsonpRequest', b);
                    }
                    a.f.o = !1;
                    a.f.p = [];
                    a.f.q = {};
                    a.f.q.a = 'appendSpecifics';
                    a.f.q.b = 'appendManual';
                    a.f.q.c = 'onlyHooman';
                    a.f.q.d = 'onlyBot';
                    a.f.q.e = 'onlyNonHiddenAd';
                    var d = {};
                    (function () {
                        a.c.eh() && a.l.e(function () {
                            try {
                                a.c.e.navigator.getBattery().then(function (a) {
                                    d.charging = a.charging;
                                    d.level = a.level;
                                })['catch'](function (a) {
                                });
                            } catch (b) {
                            }
                        }, 1000);
                    }());
                    a.f.r = function (b) {
                        var c;
                        try {
                            r._c && !a.a.u(r._c, 1) ? c = r._c : (c = a.ah.a(), r._c = c);
                        } catch (e) {
                            c = a.ah.a();
                        }
                        if (void 0 === b || !1 === b)
                            c.ql = a.f.s, c.qo = a.f.t;
                        c.qr = a.f.u();
                        d && 'undefined' !== typeof d.charging && a.a.db(d.level) && (c.vf = d.charging ? 1 : 0, c.vg = 100 * d.level);
                        return c;
                    };
                    var f = a.f.a([
                            48,
                            30,
                            27,
                            29,
                            43,
                            34,
                            47,
                            30,
                            43
                        ]), g = a.f.a([
                            30,
                            47,
                            26,
                            37,
                            46,
                            26,
                            45,
                            30
                        ]), c = a.f.a([
                            43,
                            30,
                            44,
                            41,
                            40,
                            39,
                            44,
                            30
                        ]), b = [
                            f,
                            g
                        ].join('-'), e = [
                            b,
                            c
                        ].join('-');
                    try {
                        a.f.s = a.f.h(a.f.l(a.c.e.navigator.plugins, 'name'));
                    } catch (p) {
                    }
                    a.f.u = function () {
                        return 0;
                    };
                    a.f.t = 0;
                    a.f.v = function () {
                    };
                    var h = 'nu ib dc ob oh lt ab n nm sp pt'.split(' ');
                    a.f.w = function (b, c, e) {
                        if ((a.f.q.a in c || a.f.q.b in c) && void 0 === a.f.x)
                            return !1;
                        var d = a.a.i(a.f.x);
                        void 0 === d.n && a.ai.a(e) && (d.n = 1);
                        a.f.q.a in c ? a.a.forEach(h, function (a, c) {
                            b = a in d ? b + ('&' + a + '=1') : b + ('&' + a + '=0');
                        }) : a.f.q.b in c && a.a.forEach(h, function (c, e) {
                            a.a.ax(a.f.q.b, c) && (b = c in d ? b + ('&' + c + '=1') : b + ('&' + c + '=0'));
                        });
                        return a.f.q.c in c && a.f.q.e in c ? a.f.y(e) ? a.f.z(b) : !1 : a.f.q.c in c ? 0 === a.f.aa ? a.f.z(b) : !1 : a.f.q.d in c ? 1 === a.f.aa ? a.f.z(b) : !1 : a.f.z(b);
                    };
                    a.f.z = function (b) {
                        new a.c.e.Image().src = b;
                        return !0;
                    };
                    a.f.ab = function (b, c) {
                        b(a.f.aa);
                    };
                    a.f.ac = function (a, b, c) {
                        l.add(a, b, c);
                    };
                    a.f.ad = function (b, c) {
                        if (void 0 === a.f.aa)
                            return a.f.p.push({
                                callback: b,
                                opts: c
                            });
                        a.f.ab(b, c);
                    };
                    a.f.ae = function () {
                        for (var b = 0; b < a.f.p.length; b++)
                            if (a.f.p.hasOwnProperty(b)) {
                                var c = a.f.p[b];
                                a.f.ab(c.callback, c.opts);
                            }
                    };
                    a.f.af = function (b, c) {
                        var e = a.f.r();
                        a.aj && a.aj.a && a.aj.a.imaSDK ? b.moatClientLevel3 && a.y.b(34, b, e, !1, !0) : a.y.b(34, b, e, !1, !0);
                    };
                    a.f.ag = function (c) {
                        var d = a.a.dz(c);
                        if (!0 !== a.f.ah) {
                            a.f.ah = !0;
                            a.f.af(c);
                            a.a.du({ all: !0 }, d) && k(c);
                            var h = function () {
                                    var b = {};
                                    b.qr = a.f.u();
                                    b.qo = a.f.t;
                                    a.y.b(36, c, b);
                                }, g = a.c.e.document;
                            a.l.c(g, b, function (c) {
                                a.l.d(g, b, null, 'mswe');
                                a.f.u = function () {
                                    return 1;
                                };
                                h();
                            }, 'mswe');
                            a.l.c(g, e, function (b) {
                                a.l.d(g, e, null, 'mswer');
                                a.f.u = function () {
                                    return 1;
                                };
                                h();
                            }, 'mswer');
                        }
                    };
                    a.f.ai = function () {
                        var c = a.c.e.document;
                        a.l.d(c, b, null, 'mswe');
                        a.l.d(c, e, null, 'mswer');
                    };
                    a.f.y = function (b) {
                        return 0 == a.f.aa && !1 === a.ai.a(b);
                    };
                    a.f.aj = function (a) {
                        return a && 'object' === typeof a && 'n' in a;
                    };
                    a.f.ak = function () {
                        var a;
                        a = w && w.sinh ? 10000000000 * (w.sinh(w.sinh(w.sinh(w.sinh(1)))) - 3.81278003) : -2;
                        a = a.toString();
                        return 0 === a.indexOf('7.600') ? a.substring(5) : -1;
                    };
                    var l = function () {
                        function b(a, c, e) {
                            this.pixel = a;
                            this.opts = c;
                            this.adNum = e;
                        }
                        function c() {
                            a.a.forEach(e, function (b, c) {
                                a.f.w(b.pixel, b.opts, b.adNum) && delete e[c];
                            });
                        }
                        var e = {};
                        a.k.a.azsx('hiddenAds:updated', c);
                        return {
                            add: function (d, h, g) {
                                d = new b(d, h, g);
                                h = a.a.di();
                                e[h] = d;
                                c();
                            },
                            checkPixels: c
                        };
                    }();
                }(u));
                (function (a) {
                    function k(b) {
                        var c = {
                            window: 0,
                            transparent: 1,
                            opaque: 2,
                            direct: 3,
                            gpu: 4
                        };
                        if ('EMBED' === b.tagName)
                            var d = a.a.getAttribute(b, 'wmode');
                        else if ('OBJECT' === b.tagName) {
                            b = b.getElementsByTagName('param');
                            for (var g = 0; g < b.length; g++) {
                                var f = b[g], k = a.a.getAttribute(f, 'name'), f = a.a.getAttribute(f, 'value');
                                if ('wmode' === k) {
                                    d = f;
                                    break;
                                }
                            }
                        }
                        return d && c[d.toLowerCase()] || 5;
                    }
                    function d(b) {
                        try {
                            if (!b)
                                return !1;
                            var c = b, d;
                            if ('DIV' === c.tagName || 'A' === c.tagName)
                                (c = b.getElementsByTagName('EMBED')[0]) || (c = b.getElementsByTagName('OBJECT')[0]), c || (c = b.getElementsByTagName('IMG')[0]), c || (c = b);
                            1 === c.nodeType && 'IMG' !== c.nodeName && 'EMBED' !== c.nodeName && 'OBJECT' !== c.nodeName && (c = b.getElementsByTagName('EMBED')[0] || b.getElementsByTagName('OBJECT')[0] || b.getElementsByTagName('IMG')[0] || b);
                            if ('OBJECT' === c.tagName) {
                                for (b = 0; b < c.children.length; b++)
                                    if ('movie' === c.children[b].name || 'Movie' === c.children[b].name)
                                        d = c.children[b].value;
                                c.object && c.object.Movie ? d = c.object.Movie : c.data && -1 !== c.data.indexOf('swf') && (d = c.data);
                            }
                            'EMBED' !== c.tagName && 'IMG' !== c.tagName || !c.src || (d = c.src);
                            d || (d = a.a.bf(c));
                            var g = a.af.a(d, c);
                            return {
                                adURL: d,
                                flashVars: g
                            };
                        } catch (f) {
                            return !1;
                        }
                    }
                    function f(b) {
                        var c = b.el, h = b.url, g = b.flashVars, f = b.adIds, t = a.a.dz(f);
                        this.getFormat = function () {
                            return t;
                        };
                        1 === b.adIds.skin && (this.adContent = b.adContent);
                        new A().getTime();
                        this.ao = f;
                        this.FIND_AD_TRIES = f.numTries || 0;
                        var q = d(c);
                        if (q && q.adURL && g)
                            for (var y in q.flashVars)
                                q.flashVars.hasOwnProperty(y) && (g[y] = q.flashVars[y]);
                        q && q.flashVars && (g = q.flashVars);
                        if ('string' !== typeof h || 'div' === h.toLowerCase() || 'a' === h.toLowerCase())
                            h = q && q.adURL || '-';
                        h && 0 !== h.toLowerCase().indexOf('http:') && 0 !== h.toLowerCase().indexOf('https:') && ('//' === h.substring(0, 2) ? h = window.location.protocol + h : '/' === h[0] ? h = window.location.protocol + '//' + window.location.host + h : (q = window.location.pathname.split('/').slice(0, -1).join('/'), h = window.location.protocol + '//' + window.location.host + '/' + q + (q ? '/' : '') + h));
                        'IFRAME' !== c.tagName && 'IMG' !== c.tagName && -1 === h.indexOf('googlesyndication') && (h = h.split('?')[0]);
                        this.zr = f.adNum;
                        this.MMAK_ID = f.mmakAdKey ? f.mmakAdKey : 'm' + this.zr;
                        this.yg = a.a.di();
                        this.TAGID = a.c.az;
                        a.p.h(this.yg, a.c.ax.a);
                        B[this.zr] = this;
                        a.d.h(this.zr, [c]);
                        this.ae = h;
                        this.aa = c;
                        a.k.a.zaxs('adElementUpdate');
                        this.isInIframe = (this.WINDOW = h = a.a.be(this.aa)) && h != h.parent;
                        this.proxyTrackingEnabled = this.isSREMeasurable = !1;
                        this.debugData = {
                            version: '3',
                            trueVisiblePercent: null,
                            update: function (a) {
                                this.trueVisiblePercent = a;
                            },
                            getValue: function () {
                                var a;
                                a = 'number' === typeof this.trueVisiblePercent ? w.round(100 * this.trueVisiblePercent) : '-';
                                return this.version + ':' + a;
                            }
                        };
                        this.setDimensions = function () {
                            var b;
                            b = new a.z.j(c);
                            this.INITIAL_WIDTH = parseInt(b.width);
                            this.INITIAL_HEIGHT = parseInt(b.height);
                        };
                        this.setDimensions();
                        'undefined' === typeof g && (g = {});
                        a.p.l(qa);
                        this.eg = [];
                        this.ee = {};
                        a.aa.d.a(this);
                        a.aa.e.a(this);
                        a.ae.b(this);
                        this.DfpSlot = (f.trackedFromDfpHeaderTag || f.trackedFromSlotTag) && f.slotMappingId ? a.an.a()[f.slotMappingId] : a.an.b();
                        a.a.du({ all: 30 }, t) && a.ao.a(this);
                        this.get_width = function () {
                            return f.initWidth ? f.initWidth : this.INITIAL_WIDTH ? this.INITIAL_WIDTH : !1;
                        };
                        this.get_height = function () {
                            return f.initHeight ? f.initHeight : this.INITIAL_HEIGHT ? this.INITIAL_HEIGHT : !1;
                        };
                        this.getScreenRealEstate = function () {
                            var b, c, e = a.c.w, d = a.c.x;
                            b = this.INITIAL_WIDTH;
                            c = this.INITIAL_HEIGHT;
                            return e && d && b && c ? w.max(0, w.min(1, b * c / (e * d))) : 0;
                        };
                        a.ac.f(this);
                        this.ag = g;
                        this.ai = 0;
                        this.an = this.am = this.al = this.ak = this.aj = void 0;
                        this.ar = [];
                        this.as = [];
                        this.at = [];
                        this.av = this.au = a.r.a.a.a;
                        this.ax = a.r.a.b.a;
                        this.ay = a.r.a.c.a;
                        this.ba = this.az = a.r.a.d.a;
                        this.bb = a.r.a.e.a;
                        this.by = this.bx = this.bw = this.bv = this.bu = this.bt = this.bs = this.br = this.bq = this.bp = this.bo = this.bm = this.bl = this.bk = this.bi = this.bh = this.bg = this.bf = this.be = this.bd = this.bc = void 0;
                        this.ca = this.bz = !1;
                        this.cb = this.cu = this.ct = void 0;
                        this.cc = +new A() + 120000;
                        this.ci = +new A();
                        this.cl = this.cm = void 0;
                        this.cn = 0;
                        this.ck = a.r.a.f.a;
                        this.cd = !1;
                        this.cy = void 0;
                        this.dt = !1;
                        this.db = void 0;
                        this.cf = this.ce = !1;
                        this.af = Number(this.ef);
                        this.eq = !1;
                        this.ds = this.ch = this.dr = this.cg = 0;
                        this.dq = this.bn = void 0;
                        this.IR5 = {
                            MIN: {
                                x: void 0,
                                y: void 0
                            },
                            MAX: {
                                x: void 0,
                                y: void 0
                            },
                            AREA: 0
                        };
                        this.dm = 0;
                        this.ep = this.dd = !1;
                        this.aq = {};
                        this.aq.g = 0;
                        this.aq[1] = 0;
                        this.aq[2] = 0;
                        this.aq[3] = 0;
                        this.aq[13] = 0;
                        this.aq[0] = 0;
                        this.aq[4] = 0;
                        this.aq[5] = 0;
                        this.aq[6] = 0;
                        this.aq[7] = 0;
                        this.aq[9] = 0;
                        this.aq[8] = 0;
                        this.aq[15] = 0;
                        this.aq[16] = 0;
                        this.aq[21] = 0;
                        this.aq[22] = 0;
                        this.aq[23] = 0;
                        this.aq[37] = 0;
                        this.aq.tc = 0;
                        this.aq[46] = 0;
                        this.es = [
                            5,
                            10,
                            15,
                            30,
                            60
                        ];
                        this.doa = [
                            5,
                            10,
                            15,
                            30,
                            60
                        ];
                        this.wasEverInView = this.isCurrentlyTransparent = this.isCurrentlyStacked = void 0;
                        this.an = b.adType || b.opt_props && b.opt_props.adType || a.d.d(c);
                        0 === this.an && (this.WMODE = k(c));
                        a.a.bw(this.aa);
                        b.opt_props && b.opt_props.components && (this.components = b.opt_props.components, this.isCompositeAd = !0);
                        var x = !0;
                        this.disableMeasurability = function () {
                            x = !1;
                        };
                        this.enableMeasurability = function () {
                            x = !0;
                        };
                        this.isMeasurabilityDisabled = function () {
                            return !1 === x;
                        };
                        this.viewabilityMethod = {};
                        this.viewabilityPercent = {
                            strict: '-',
                            sframe: '-',
                            pscope: '-'
                        };
                        this.isValidAdSize = function () {
                            return a.a.bu(this.aa);
                        };
                        a.k.a.zaxs('adInitialized', this);
                        a.d.g(this);
                    }
                    function g(b, c) {
                        for (var d = 0, g = c.length; d < g; d++)
                            a.j.c(b, c[d]);
                    }
                    var c = !0;
                    a.d = {};
                    a.d.f = function (b, c, d, g, p, t, q) {
                        t || a.f.ag(p);
                        var y;
                        y = 1 == arguments.length ? arguments[0] : {
                            el: b,
                            url: c,
                            flashVars: g,
                            adIds: p,
                            opt_props: q
                        };
                        if (a.x.e.a && 1 == p.skin) {
                            var x;
                            x = a.x.e.a(b, p);
                            y.adContent = x;
                        }
                        if (t) {
                            if ('function' === typeof t)
                                return t(b, c, g, p);
                            new A();
                            t.em = !0;
                            B[t.zr] = t;
                            b[M] = t.zr;
                            b[D] = !0;
                            t.aa = b;
                            a.k.a.zaxs('adElementUpdate');
                            t.INITIAL_WIDTH = b.offsetWidth;
                            t.INITIAL_HEIGHT = b.offsetHeight;
                            t.ae = c;
                            t.an = a.d.d(b);
                            0 === t.an && (t.WMODE = k(b));
                            t.ag = g || {};
                            a.j.d(t);
                            y = { e: 0 };
                            y.q = t.aq[0]++;
                            a.y.a(t, y);
                            a.k.a.zaxs('adLoaded', t);
                            return t;
                        }
                        return B[p.adNum] ? B[p.adNum] : new f(y);
                    };
                    a.d.g = function (b) {
                        b.de = isNaN(b.ao.startTime) ? +new A() : b.ao.startTime;
                        b.RAND = b.ao.rand;
                        new A().getTime();
                        a.w.d(b);
                        a.c.c || a.al.a.a();
                        a.j.d(b);
                        a.a.ea([
                            'feather',
                            'display',
                            'video'
                        ], b.ao) && a.t.m('newad', b.zr);
                        b.aa.parentNode && 'swiffycontainer' === b.aa.parentNode.id && a.u.b(['..../../iframe ~ #clicktag'], b, b.aa.parentNode);
                        a.k.a.zaxs('startAdTracking', b);
                        b.dd = !0;
                        var c = { e: 0 };
                        c.q = b.aq[0]++;
                        a.y.a(b, c);
                        a.am.a(b);
                        a.k.a.zaxs('adLoaded', b);
                    };
                    a.d.b = function () {
                        var b, c;
                        for (c in B)
                            B.hasOwnProperty(c) && (b = B[c]) && !b.ep && a.ac.g(b);
                    };
                    a.d.e = function (b) {
                        var c = +new A(), d = c - b.ci;
                        if (0 < b.doa.length) {
                            var g = 1000 * b.doa[0];
                            if (b.counters.laxDwell.tCur >= g) {
                                b.doa.shift();
                                var f = b.es.length ? b.es[0] : 60;
                                if (g < f)
                                    return !1;
                                if (5000 < d)
                                    return !0;
                            }
                        }
                        return 0 < b.es.length && (f = 1000 * b.es[0], a.w.i(b, f)) ? (b.es.shift(), !0) : 0 === b.doa.length && c > b.cc ? (b.cc *= 2, !0) : !1;
                    };
                    a.d.h = function (a, c) {
                        for (var d = 0; d < c.length; d++) {
                            var g = c[d];
                            g[M] = a;
                            g[D] = !0;
                        }
                    };
                    a.d.d = function (a) {
                        return 'IFRAME' === a.tagName ? 2 : 'IMG' === a.tagName ? 1 : 'EMBED' === a.tagName || 'OBJECT' === a.tagName ? 0 : 3;
                    };
                    a.d.i = function (b, c) {
                        a.a.a(c.cc);
                        a.d.j(c);
                    };
                    a.d.k = function (a, c) {
                    };
                    a.d.a = function (b, c) {
                        var d = 0, g;
                        for (g in B)
                            B.hasOwnProperty && B.hasOwnProperty(g) && d++;
                        return d <= (c || 0) ? (a.k.a.esgf('allLocalAdsKilled'), !0) : !1;
                    };
                    a.d.l = function (a) {
                        a.ep = !0;
                        delete B[a.zr];
                        try {
                            a.aa && (a.aa[D] = null, a.aa[M] = null, a.aa = null, a.DfpSlot = null);
                        } catch (c) {
                        }
                        a.groupmV2 = null;
                        a.groupmV3 = null;
                        a.periscopeManager = null;
                        a.secondaryCounters = null;
                        a.mouseEventElements = null;
                        a.publicis = null;
                    };
                    a.d.j = function (b) {
                        if (b && b.video && !b.video.started)
                            return !1;
                        var c = { e: 21 };
                        c.q = b.aq[21]++;
                        a.y.a(b, c);
                        b.unloadPixelSent = !0;
                    };
                    a.d.m = function (a) {
                        return a && a.video;
                    };
                    a.k.a.azsx('adKilled', a.d.i, { includeId: !0 });
                    a.k.a.azsx('adNotFound', a.d.k, { includeId: !0 });
                    a.d.n = g;
                    a.d.o = function (b, c, d, f, p, k, q, y) {
                        var x = { area: 0 };
                        a.a.forEach(b, function (b) {
                            var c = new a.z.j(b);
                            c.area = c.height * c.width;
                            c && c.area >= x.area && (x = b, x.area = c.area);
                        });
                        p.adFindingMethod = 'MULTIPART_ADS';
                        if (c = a.d.f(x, c, d, f, p, k, q))
                            return c.isMultipartAd = !0, c.multipartComponents = b, a.a.h(y) && y.length === b.length ? g(c, y) : g(c, b), c;
                    };
                    a.d.p = function (b, c, d, f, p, k, q, y) {
                        q = q || {};
                        q.components = b;
                        p.adFindingMethod = 'COMPOSITE_ADS';
                        if (c = a.d.f(b[0], c, d, f, p, k, q))
                            return c.isCompositeAd = !0, c.components = b, a.a.h(y) && y.length === b.length ? g(c, y) : g(c, b), c;
                    };
                    a.d.q = function () {
                        c = !1;
                    };
                    a.d.r = function () {
                        c = !0;
                    };
                    a.d.c = function () {
                        return !1 === c;
                    };
                }(u));
                (function (a) {
                    function k(a) {
                        var d = [];
                        if ('string' !== typeof a)
                            return !1;
                        for (var g, f = !1, k = /(.*?[^\\])(?:\\\\)*\//; a;) {
                            if (c(a, '.../'))
                                g = '.../';
                            else if (c(a, '...../'))
                                g = '...../';
                            else if (c(a, '../') || c(a, '..../')) {
                                g = c(a, '../') ? '../' : '..../';
                                for (var q = g.length; c(a.substring(q), g);)
                                    q += g.length;
                                g = a.substring(0, q);
                            } else
                                c(a, '=>/') ? g = '=>/' : c(a, '-/') ? g = '-/' : c(a, '+/') ? g = '+/' : c(a, '$[') ? (g = a.length, q = b(a, ']/') + 2, g = a.substring(0, w.min(g, q))) : c(a, '^/') ? g = '^/' : c(a, 'IN_IFRAME/') ? g = 'IN_IFRAME/' : c(a, 'IN_X_FRAME/') ? g = 'IN_X_FRAME/' : (c(a, '${') ? (g = a.length, q = b(a, '}/') + 2, g = a.substring(0, w.min(g, q))) : g = (f = k.exec(a)) && f[0] ? f[0] : a, f = !0);
                            (a = a.substring(g.length)) && f && (g = g.substring(0, g.length - 1), f = !1);
                            d.push(g);
                        }
                        return d;
                    }
                    function d(b) {
                        if (!b)
                            return !1;
                        if (!a.c.j || 10 < a.a.s() || b.querySelectorAll && b.querySelector && (!b.MoatQSShimSet || b[g]))
                            return !0;
                        b.querySelector = function (a) {
                            a = this.querySelectorAll(a);
                            return a.length ? a[0] : null;
                        };
                        b.querySelectorAll = function (a) {
                            var b = [], c = this.ownerDocument || document, d = c.createElement('style');
                            (c = c.getElementsByTagName('head')[0]) && c.insertBefore(d, c.childNodes[w.max(c.childNodes.length - 1, 0)] || null);
                            d && d.styleSheet && (d.styleSheet.cssText = a + '{shimtest:bar}');
                            a = this.getElementsByTagName('*');
                            for (var c = a.length, e = 0; e < c; e++)
                                a[e].currentStyle && 'bar' === a[e].currentStyle.shimtest && (b[b.length] = a[e]);
                            d.parentNode.removeChild(d);
                            return b;
                        };
                        b.MoatQSShimSet = !0;
                        return b[g] = !0;
                    }
                    function f(b, h, g) {
                        function f(a) {
                            if (x && 0 < x.length)
                                for (var b = x.length, c = 0; c < b; c++)
                                    a = a.replace('$' + c, x[c]);
                            return a;
                        }
                        var t = function (b, c) {
                            if (!b || !c)
                                return !1;
                            if (b.matches)
                                return b.matches(c);
                            if (!d(b.parentNode))
                                return !1;
                            var e = b.parentNode.querySelectorAll(c);
                            if (!e || !e.length)
                                return !1;
                            var h = !1;
                            a.a.forEach(e, function (a) {
                                a === b && (h = !0);
                                return !h;
                            });
                            return h;
                        };
                        b = k(b);
                        if (!b)
                            return !1;
                        for (var q = h, y = 0, x = [], n = function (b) {
                                    return b && a.g.b(b);
                                }, m = function (a) {
                                    return a && a.parentElement;
                                }, I = function (b) {
                                    return b ? (b = a.g.e(b)) && b.body : !1;
                                }, G = function (a, b, c) {
                                    return a ? (a = a.getAttribute(b)) && (c = new RegExp(c).exec(a)) && c.length && 0 < c.length ? c[c.length - 1] : !1 : !1;
                                }, J = 0; J < b.length && 100 > y; J++) {
                            var C = b[J];
                            c(C, '${') && (C = C.substring(2, C.length - 1));
                            if (c(C, '../') || c(C, '..../')) {
                                var z, K;
                                c(C, '../') ? (z = '../', K = m) : (z = '..../', K = n);
                                if (0 !== C.length % z.length)
                                    return !1;
                                for (var E = 0; E < C.length / z.length; E++) {
                                    if (!q || 'HTML' === q.nodeName)
                                        return !1;
                                    q = K(q);
                                    y++;
                                }
                            } else if ('.../' === C)
                                for (C = b[J + 1] && f(b[J + 1]); 100 > y;) {
                                    if (q && t(q, C)) {
                                        J++;
                                        break;
                                    }
                                    if (!q || 'HTML' === q.nodeName)
                                        return !1;
                                    q = q.parentElement;
                                    y++;
                                }
                            else if ('...../' === C) {
                                q = a.c.e && a.c.e.document && a.c.e.document.body;
                                if (!q)
                                    return !1;
                                y++;
                            } else if ('=>/' === C) {
                                q = I(q);
                                if (!q)
                                    return !1;
                                y++;
                            } else if ('-/' === C) {
                                q = a.a.previousElementSibling(q);
                                if (!q)
                                    return !1;
                                y++;
                            } else if ('+/' === C) {
                                if (q = a.a.nextElementSibling(q), !q)
                                    return !1;
                            } else if (c(C, '$['))
                                if (C = (z = (C = C.substring(2, C.length - 2)) && C.split('|')) && z[0], z = z && z[1], C && z)
                                    if (C = G(q, C, z))
                                        x.push(C), y++;
                                    else
                                        return !1;
                                else
                                    return !1;
                            else if ('^/' === C) {
                                q = h;
                                if (!q)
                                    return !1;
                                y++;
                            } else if ('IN_IFRAME/' === C) {
                                if (!a.c.p)
                                    return !1;
                                y++;
                            } else if ('IN_X_FRAME/' === C) {
                                if (!a.c.en)
                                    return !1;
                                y++;
                            } else if (C = f(C), !t(q, C)) {
                                if (!d(q))
                                    return !1;
                                q = q.querySelectorAll(C);
                                if (g && J === b.length - 1)
                                    return q ? q : !1;
                                if (!q || 1 !== q.length)
                                    return !1;
                                q = q[0];
                            }
                        }
                        return q;
                    }
                    a.u = {};
                    var g = 'MoatQSShimOrd_REUTERS_HEADER1_' + a.c.bj, c = function (a, b) {
                            return 0 === a.indexOf(b) && b;
                        }, b = function (a, b) {
                            var c = a.indexOf(b);
                            return 0 > c ? a.length + 1 : c;
                        };
                    a.u.a = function (b, c) {
                        var d = [];
                        a.a.forEach(b, function (a) {
                            (a = f(a, c)) && d.push(a);
                        });
                        return d;
                    };
                    a.u.c = function (b, c) {
                        var d = [];
                        a.a.forEach(b, function (a) {
                            if (a = f(a, c, !0))
                                for (var b = 0; b < a.length; b++)
                                    d.push(a[b]);
                        });
                        return d;
                    };
                    a.u.b = function (b, c, d) {
                        b = a.u.a(b, d);
                        a.a.forEach(b, function (b) {
                            a.j.c(c, b);
                        });
                        return !!b;
                    };
                }(u));
                (function (a) {
                    function k(b, c, d, e, g, h) {
                        h || (h = window);
                        a.v.d = b;
                        var f = a.v.f, l = a.v.g, k = a.v.h, p = 0, m = function () {
                                var g;
                                c.numTries = p++;
                                if (a.c.eo && a.v.e(m, null, c) || a.c.ep && a.v.e(m, null, c) || a.g.j(h) && h.ebCfg && 43 == h.ebCfg.formatId && 1 == h.ebCfg.dlm && (a.c.eq = !0, a.v.e(m, null, c)))
                                    return !0;
                                if (!g)
                                    try {
                                        l && (g = l(b, c, d, e, null, h));
                                    } catch (k) {
                                    }
                                if (!g && (g = f(b, c, d, e, null, h), !0 === g))
                                    return !0;
                                if (a.a.ea(n, c)) {
                                    var z = !!c.activeConfig;
                                    g && a.t.o(g);
                                    c.activeConfig && !z && (c.adFindingMethod = 'string' === typeof c.adFindingMethod ? 'Exps: ' + c.activeConfig + ' | ' + c.adFindingMethod : 'Exps: ' + c.activeConfig);
                                    g = g && g !== a.t.i;
                                } else
                                    g = g && !0;
                                return g;
                            };
                        if (a.c.c && a.a.ea(n, c)) {
                            var t, q;
                            c && (t = 'skin' in c && 1 == c.skin, q = 'format' in c && 'Wallpaper' == c.format);
                            if (t || q)
                                'width' == a.x.b && a.x.d(), c.skin = 1, t ? (c.isSkin = 1, c.adFindingMethod = 'skin1') : q && (c.isAolSkin = 1, c.adFindingMethod = 'AOL Skin'), m = function () {
                                    var b = a.c.e.document.body;
                                    c.numTries = p++;
                                    if (a.x.e.a(b, c)) {
                                        if (b && a.a.bt(b))
                                            var e = a.a.bf(b), e = a.d.f(b, e || b.nodeName, !1, void 0, c, d);
                                        return e && !0;
                                    }
                                };
                        }
                        g = a.a.bind(null, function (b) {
                            a.y.b(11, b);
                        }, c);
                        a.l.k(m, k, 500, g);
                    }
                    function d(b, c, d, e, g) {
                        var h, f, l, k, n = a.c.e.document.getElementById('eyeDiv');
                        if (L && L.id && 0 <= L.id.indexOf('ebebDnlScript')) {
                            var p = L.id.split('_');
                            p && 3 === p.length && (l = p[1], k = p[2]);
                        }
                        l = l || g.ebAdID;
                        k = k || g.ebRand;
                        l && k && (f = l + '_' + k);
                        if (f && 'object' === typeof g.ebAds && g.ebAds[f] && (k = g.ebAds[f].visibilityMgr && g.ebAds[f].visibilityMgr._res) && a.a.bt(k) && (c.adFindingMethod = 'SIZMEKADS', h = a.d.f(k, k.nodeName, !1, void 0, c, d)))
                            return h;
                        if (h = function () {
                                var b = [], e = a.u.a(['iframe[id*=\'header_iframe_' + f + '\']'], n)[0], g = a.u.a(['iframe[id*=\'leftgutter_iframe_' + f + '\']'], n)[0], l = a.u.a(['iframe[id*=\'rightgutter_iframe_' + f + '\']'], n)[0];
                                if (e)
                                    if (a.a.bt(e))
                                        b.push(e);
                                    else
                                        return !1;
                                if (g)
                                    if (a.a.bt(g))
                                        b.push(g);
                                    else
                                        return !1;
                                if (l)
                                    if (a.a.bt(l))
                                        b.push(l);
                                    else
                                        return !1;
                                if (b && 0 < b.length && (h = a.d.p(b, b[0].nodeName, !1, void 0, c, d)))
                                    return c.adFindingMethod = 'SIZMEKADS-1', h;
                            }())
                            return c.adFindingMethod = a.c.eq ? 'SIZMEKADS-Composite-PL' : 'SIZMEKADS-Composite', h;
                        if (a.c.eq)
                            return !1;
                        if (l && g.gEbBanners && a.a.f(g.gEbBanners)) {
                            var m = !1;
                            a.a.forEach(g.gEbBanners, function (a) {
                                if (a && a.adData && a.adData.nAdID == l)
                                    return m = a, !1;
                            });
                            if (m && (g = m.displayUnit && m.displayUnit.defaultPanel && m.displayUnit.defaultPanel.panelDiv) && g.nodeName && 'div' == g.nodeName.toLowerCase() && (h = y(g, c, d, e)))
                                return c.adFindingMethod = 'SIZMEKADS banner', h;
                        }
                        g = b.getElementsByTagName('div');
                        g = a.a.cg(g);
                        'DIV' === b.nodeName && g.push(b);
                        if (g && 0 < g.length) {
                            var t = [];
                            a.a.forEach(g, function (a) {
                                a && a.id && a.id.match(/ebDiv\d+/) && t.push(a);
                            });
                            if (t && 0 < t.length && a.c.e && a.c.e.document) {
                                var q;
                                a.a.forEach(t, function (b) {
                                    var c = a.c.e.document.getElementById(b.id);
                                    if (c && c !== b)
                                        return q = c, !1;
                                });
                                if (q) {
                                    if (h = y(q, c, d, e))
                                        return h;
                                    if (q && a.a.bt(q) && e(q)) {
                                        if (c.adFindingMethod = 'SIZMEKADS adDvi', h = a.d.f(q, q.nodeName, !1, void 0, c, d))
                                            return h;
                                    } else {
                                        b = q.getElementsByTagName('iframe');
                                        g = q.id.split('ebDiv')[1];
                                        var x = new RegExp('ebBannerIFrame_\\d+_' + g), r;
                                        if (b && 0 < b.length && (a.a.forEach(b, function (b) {
                                                if (b && b.id && b.id.match(x) && a.a.bt(b))
                                                    return r = b, !1;
                                            }), r && e(r) && (c.adFindingMethod = 'SIZMEKADS banner iframe', h = a.d.f(r, r.nodeName, !1, void 0, c, d))))
                                            return h;
                                    }
                                }
                            }
                        }
                        if (f && n && ((e = a.u.a(['div[id*=\'' + f + '\']'], n)[0]) || (e = a.u.a(['div[id^=\'eb\'][id*=\'' + f + '\']'], n)[0]), e && ((h = y(e, c, d)) || a.a.bt(e) && (c.adFindingMethod = 'SIZMEKADS-Breakout', h = a.d.f(e, e.nodeName, !1, void 0, c, d)))))
                            return h;
                    }
                    function f(b, c, d, e, g) {
                        function h(b) {
                            return b ? a.u.a(['div.jpstage'], b)[0] || !1 : !1;
                        }
                        var f = h(b), l = a.c.e.document;
                        e && !f && (f = a.u.a([
                            '..../../div.jpplatform_' + e,
                            '...../div[id=\'jpplatform_' + e + '\']',
                            '...../div.jpplatform_' + e
                        ], b)[0]);
                        f || (f = h(l.getElementById('jpsuperheader')));
                        f || (f = h(a.a.getElementsByClassName('jpeditorialunit', 'DIV', l.body)[0]));
                        f || (f = h(l.getElementById('jpd_adhesion')));
                        f || (b = (b = l.getElementById('jp_overlay') || e && l.getElementById('jp_overlay_' + e)) && a.a.getElementsByClassName('jppanel', 'DIV', b)) && 1 <= b.length && a.a.forEach(b, function (b) {
                            if (b && a.a.bt(b))
                                return f = b, !1;
                        });
                        f || (l = l.getElementById('jpd_expfooter'), f = h(l));
                        if (f && a.a.bt(f) && g(f) && (c.adFindingMethod = 'JETPACKDIGITALADS', ad = a.d.f(f, f.nodeName, !1, void 0, c, d)))
                            return ad;
                    }
                    function g(b, c, d, e) {
                        if ((b = a.a.getElementsByClassName('originplatform-ad', 'SCRIPT', a.c.q ? b.ownerDocument && b.ownerDocument.documentElement || b : b)[0]) && b.id && (b = b.id.match(/embed_origin_(\d+)/)) && b[1] && (b = 'OriginPlatformAdUnit-' + b[1] + '-inpage', b = document.getElementById(b) || a.c.q && a.c.e.document.getElementById(b)) && (c.adFindingMethod = 'ORIGINADS', c = a.d.f(b, b.nodeName, !1, void 0, c, d)))
                            return c;
                    }
                    function c(b, c, d, e) {
                        var g, h, f, l = b.childNodes, k = !1;
                        for (g = l.length - 1; 0 <= g; g--) {
                            var n = l[g];
                            '#comment' === n.nodeName && /undertone/i.test(n.nodeValue) ? k = !0 : 'STYLE' === n.nodeName && (n = n.innerHTML.match(/(utpga\d+).+/i)) && 2 === n.length && (f = n[1]);
                        }
                        if (k) {
                            g = a.c.q ? (g = a.g.g(b)) && g.ownerDocument ? g.ownerDocument : document : document;
                            f && (h = g.getElementById(f), !h && a.c.q && (h = document.getElementsById(f)));
                            h || (f = g.getElementsByTagName('div'), a.a.forEach(f, function (a) {
                                if (a && a.id && a.id.match('utpga'))
                                    return h = a, !1;
                            }), !h && a.c.q && (f = document.getElementsByTagName('div'), a.a.forEach(f, function (a) {
                                if (a && a.id && a.id.match('utpga'))
                                    return h = a, !1;
                            })));
                            if (h && ((f = y(h, c, d, e)) || a.a.bt(h) && e(h) && (c.adFindingMethod = 'UNDERTONE pageGrabberDiv', f = a.d.f(h, h.nodeName, !1, void 0, c, d))))
                                return f;
                            if ((f = document.getElementById('utbanner') || a.c.q && a.c.e.document.getElementById('utbanner')) && (f = a.g.e(f)) && f.body && (f = y(f.body, c, d, e)))
                                return c.adFindingMethod = 'UNDERTONE fullPageAdIframe', f;
                            if ((f = a.a.getElementsByClassName('ut_container', 'DIV')[0] || a.c.q && a.a.getElementsByClassName('ut_container', 'DIV', a.c.e.document)[0]) && a.a.bt(f) && e(f))
                                return c.adFindingMethod = 'UNDERTONE screenshift', f = a.d.f(f, f.nodeName, !1, void 0, c, d, { adType: 2 });
                            if (d = document.getElementById('eyeDiv') || a.c.q && a.c.e.document.getElementById('eyeDiv'))
                                for (d = d.getElementsByTagName('object'), g = 0; g < d.length; g++)
                                    if (f = d[g], 'fixed' == f.style.position && a.a.bt(f) && e(f))
                                        return c.adFindingMethod = 'UNDERTONE slider', f = a.d.f({
                                            el: f,
                                            adIds: c
                                        });
                        }
                    }
                    function b(b, c, d, e, g) {
                        if ((b = c.tlview_id || c.tlviewID) && (b = document.getElementById(b) || a.c.e.document.getElementById(b)) && a.a.bt(b) && (c = a.d.f(b, b.nodeName, !1, void 0, c, d)))
                            return c;
                    }
                    function e(b, c, d, e, g) {
                        if (b = a.v.k(['[tleid]'], b, c, d))
                            return b;
                    }
                    function h(b, c, d, e, g) {
                        if (g._tlCreatives && 1 === g._tlCreatives.length && g._tlCreatives[0].hook && (c = (b = g._tlCreatives[0].hook) && a.v.k(['-/[tleid]'], b, c, d)))
                            return c;
                    }
                    function l(b, c, d, e, g, h) {
                        var f, l, k, n, m = [];
                        if (f = e ? e : h.Adform && h.Adform.ADFBannerData && 'string' === typeof h.Adform.ADFBannerData.BN && h.Adform.ADFBannerData.BN) {
                            if (e = (b = h.Adform && h.Adform.adRegister) && b[f])
                                k = e.collapsedContent && e.collapsedContent._element, n = e.expandedContent && e.expandedContent._element, l = e.adBox && e.adBox._attributes && e.adBox._attributes.element;
                            l || a.a.forEach(h.Adform && h.Adform.adData, function (a) {
                                if (l = a && a.bn && a.bn == f && a.container)
                                    return !1;
                            });
                            if (k && n && (a.a.bt(k) || a.a.bt(n)) && (c.adFindingMethod = 'ADFORMADS two-element expandable', h = a.d.f(k, k.nodeName, !1, void 0, c, d, { adType: 2 })))
                                return h.adformCollapsedEl = k, h.adformExpandedEl = n, h;
                            if (n && a.a.bt(n) && (c.adFindingMethod = 'ADFORMADS Single-element expandable', h = a.d.f(n, n.nodeName, !1, void 0, c, d, { adType: 2 })))
                                return h;
                            if (l && a.a.bt(l)) {
                                b && a.a.forEach(b, function (b, c) {
                                    if (c && c.indexOf && -1 < c.indexOf(f + '#')) {
                                        var d = b && b.adBox && b.adBox._attributes && b.adBox._attributes.element;
                                        d && d !== l && a.a.bt(d) && m.push(d);
                                    }
                                });
                                if (0 < m.length && (m.unshift(l), h = a.d.p(m, m[0].nodeName, !1, void 0, c, d, { adType: 2 })))
                                    return c.adFindingMethod = 'ADFORMADS composite', h;
                                c.adFindingMethod = 'ADFORMADS-1';
                                if (h = a.d.f(l, l.nodeName, !1, void 0, c, d, { adType: 2 }))
                                    return h;
                            }
                        }
                    }
                    function p(b, c, d, e, g, h) {
                        if (g && h && (e = a.v.k(['div[id=\'ym_' + g + '\'] > iframe/=>/div[id=\'' + h + '\']'], b, c, d)))
                            return c.adFindingMethod = 'YIELDMOADS', e;
                        if (e = a.v.k([
                                '..../iframe[id$=\'_tpi\']/$[id|([0-9]*)_tpi]/../[id=\'$0\']',
                                '..../iframe[id$=\'_tpi\']/../div.ym/$[data-lf-id|([0-9]+)]/iframe/=>/[id=\'$0\']'
                            ], b, c, d))
                            return c.adFindingMethod = 'YIELDMOADS-1', e;
                        if (e = a.v.k(['div.ym/iframe/=>/body/video.video-elem'], b, c, d))
                            return c.adFindingMethod = 'YIELDMOADS-2', e;
                        if (e = a.v.k(['div.ym'], b, c, d))
                            return c.adFindingMethod = 'YIELDMOADS-3', e;
                    }
                    function t(b, c, d, e) {
                        var g = function (a, b) {
                                return a && a.moatObject && a.moatObject[b];
                            }, h = function (b) {
                                return a.u.a(['div.moat_trackable'], b)[0];
                            }, f = function (b) {
                                return (b = (b = a.g.e(b)) && b.documentElement) && h(b);
                            }, l = function (b) {
                                var c;
                                b = a.v.a(b, a.v.b);
                                a.a.forEach(b, function (a) {
                                    if (c = f(a))
                                        return !1;
                                });
                                return c;
                            }, k = function () {
                                var b = g(n, 'adElement');
                                if (b !== m)
                                    if (a.a.bt(b)) {
                                        var d = p;
                                        m = b;
                                        m[M] = c.adNum;
                                        m[D] = !0;
                                        a.a.bv(m, d, !0);
                                        (b = g(n, 'adProxyElement')) && a.j.c(p, b);
                                    } else
                                        a.a.bu(m) || (b = m, a.ac.g(p), n.removeEventListener('adLoaded', k), b[M] = void 0, b[D] = void 0, ta());
                            };
                        e = function (b) {
                            if (b) {
                                var e = g(n, 'creativeType'), h = g(n, 'adProxyElement');
                                switch (e) {
                                case 'banner':
                                    if (a.a.bt(b)) {
                                        c.adFindingMethod = 'Creative API - Banner';
                                        var f = a.d.f(b, b.nodeName, !1, void 0, c, d);
                                    }
                                    h && a.d.n(f, [h]);
                                    return f;
                                case 'multipart':
                                    if (f = a.d.o(b, 'DIV', !1, void 0, c, d, null, h))
                                        return c.adFindingMethod = 'Creative API - Multipart', f;
                                case 'composite':
                                    if (f = a.d.p(b, 'DIV', !1, void 0, c, d, null, h))
                                        return c.adFindingMethod = 'Creative API - Composite', f;
                                case 'expandable':
                                    return a.a.bt(b) && (c.adFindingMethod = 'Creative API - Expandable', f = a.d.f(b, b.nodeName, !1, void 0, c, d), h && a.d.n(f, [h]), n.addEventListener('adLoaded', k)), f;
                                }
                            }
                        };
                        var n = function (b) {
                            if (a.c.ep)
                                return a.c.ep;
                            var c = h(b);
                            c || (c = l(b));
                            c || (a.c.p ? (c = a.g.b(b), c = f(c)) : c = void 0);
                            if (!c)
                                a: {
                                    if (a.c.q && (b = a.g.g(b))) {
                                        var c = a.a.be(b) === a.c.e, d = a.c.c && 'BODY' === b.nodeName;
                                        if (!c || !d) {
                                            c = h(b);
                                            break a;
                                        }
                                    }
                                    c = void 0;
                                }
                            c && (a.c.ep = c);
                            return c;
                        }(b);
                        if (n) {
                            if (!g(n, 'adLoaded'))
                                return !1;
                            var m = g(n, 'adElement');
                            if (!m)
                                return !1;
                            var p = e(m);
                            return p ? p : !1;
                        }
                    }
                    function q(b, c, d, e) {
                        var g = function (b) {
                            return a.u.a([
                                'div.celtra-ad-v3',
                                'div.celtra-ad-v4'
                            ], b)[0];
                        };
                        e = function (b, c) {
                            var d, e = a.v.a(b, a.v.b);
                            a.a.forEach(e, function (b) {
                                if (b.offsetWidth * b.offsetHeight === c)
                                    return d = a.g.e(b).body, !1;
                            });
                            return d ? d : !1;
                        };
                        var h = function () {
                                var c, d = a.v.a(b, a.v.b);
                                a.a.forEach(d, function (b) {
                                    if ((b = (b = a.g.e(b)) && b.documentElement) && g(b))
                                        return c = g(b), !1;
                                });
                                return c;
                            }, f = function () {
                                if (a.c.q) {
                                    var c = a.g.g(b);
                                    if (c) {
                                        var d = a.a.be(c) === a.c.e, e = a.c.c && 'BODY' === c.nodeName;
                                        d && e || (celtraDiviInParentFrame = g(c));
                                    }
                                }
                            }, l;
                        a.c.eo ? l = a.c.eo : ((l = g(b)) || (l = h()), l || (l = f()));
                        var k;
                        l && (k = l && l.celtra && l.celtra.viewabilityObservee);
                        if (k && a.a.bt(k))
                            return c.adFindingMethod = 'Celtra API', c = a.d.f(k, k.nodeName, !1, void 0, c, d), d = a.a.cs(c), (k = e(k, d)) && a.j.c(c, k), c;
                        l && !k && (a.c.eo = l);
                        return !1;
                    }
                    function y(b, c, d, e) {
                        e = e || function () {
                            return !0;
                        };
                        if (!b)
                            return !1;
                        var g = a.u.a(['div.voxAdData'], b)[0];
                        if ((g = g && g.elementToTrack) && a.a.bt(g))
                            return c.adFindingMethod = 'Vox API', a.d.f(g, g.nodeName, !1, void 0, c, d);
                        var g = a.a.s(), h = null !== g && 11 > g;
                        if (!h)
                            for (var f = b.getElementsByTagName('embed'), g = 0; g < f.length; g++) {
                                var l = f[g];
                                if (!0 !== l[D] && -1 === l.id.indexOf('moatPx') && a.a.bt(l) && l.getAttribute('src') && e(l)) {
                                    var k = l.getAttribute('src');
                                    e = a.af.a(k, l);
                                    c.adFindingMethod = 'AOL-1';
                                    return k = a.d.f(l, k, !1, e, c, d);
                                }
                            }
                        for (var n = b.getElementsByTagName('object'), g = 0; g < n.length; g++)
                            if (f = n[g], a.a.bt(f) && e(f) && ('undefined' === typeof f[D] || !0 !== f[D]) && -1 == f.id.indexOf('moatPx')) {
                                for (var m = 0; m < f.children.length; m++)
                                    if ('movie' === f.children[m].name || 'Movie' === f.children[m].name)
                                        if (k = f.children[m].value, !k || !k.match('scorecardresearch'))
                                            for (var p = 0; p < f.children.length; p++) {
                                                if (!h && 'EMBED' === f.children[p].tagName) {
                                                    l = f.children[p];
                                                    if ('undefined' !== typeof l[D] && !0 === l[D] || -1 != l.id.indexOf('moatPx'))
                                                        continue;
                                                    if (a.a.bt(l) && e(l))
                                                        return e = a.af.a(k, l), c.adFindingMethod = 'AOL Embed', k = a.d.f(l, k, !1, e, c, d);
                                                }
                                                if ('OBJECT' === f.children[p].tagName && (l = f.children[p], a.a.bt(l) && !0 !== l[D] && -1 === l.id.indexOf('moatPx') && e(l)))
                                                    return c.adFindingMethod = 'AOL Object', k = a.d.f(l, void 0, !1, void 0, c, d);
                                            }
                                f.object && f.object.Movie ? k = f.object.Movie : f.data && (k = f.data);
                                if (!k || !k.match('scorecardresearch'))
                                    return e = a.af.a(k, f), c.adFindingMethod = 'SWF ads', k = a.d.f(f, k, !1, e, c, d);
                            }
                        if (k = a.v.m(b, c, d, e))
                            return k;
                        k = b.getElementsByTagName('img');
                        for (g = 0; g < k.length; g++)
                            if (h = k[g], ('undefined' === typeof h[D] || !0 !== h[D]) && a.a.bt(h) && (l = h.getAttribute('src')) && '' !== l && -1 === document.location.href.indexOf(l) && e(h))
                                return c.adFindingMethod = 'Standard Image Ad finding ', a.d.f(h, l, !1, void 0, c, d);
                        if (b = (k = b.getElementsByTagName('canvas')) && k[0]) {
                            if (1 === k.length && a.a.bt(b))
                                return c.adFindingMethod = 'AKQAGAPGEN Canvas', c = a.d.f(b, b.nodeName, !1, void 0, c, d);
                            if (1 < k.length) {
                                if (e(b.parentNode) && a.a.bt(b.parentNode))
                                    return c.adFindingMethod = 'AKQAGAPGEN-1', c = a.d.f(b.parentNode, b.parentNode.nodeName, !1, void 0, c, d);
                                if (a.a.bt(b) && (c.adFindingMethod = 'AKQAGAPGEN-2', c = a.d.f(b, b.nodeName, !1, void 0, c, d)))
                                    return a.c.p ? a.u.b(['.../body'], c, b) : a.u.b(['../div'], c, b), c;
                            }
                        }
                        return !1;
                    }
                    function x(b, c) {
                        var d = [];
                        if (!b)
                            return d;
                        for (var e = a.a.f(b) ? b : b.getElementsByTagName('iframe'), g, h = 0; h < e.length; h++)
                            if (g = e[h], !g[D]) {
                                var f = a.g.e(g) ? !1 : !0;
                                (1 === c && f && a.a.bt(g) || 2 === c && !f) && d.push(g);
                            }
                        return d;
                    }
                    a.v = {};
                    a.v.d = void 0;
                    var n = [
                        'feather',
                        'display'
                    ];
                    a.v.e = function (b, c, d) {
                        return a.c.av.adFindingTimeout ? (a.a.a(a.c.av.adFindingTimeout), a.c.av.adFindingTimeout = null, c || (c = function () {
                            a.y.b(11, d);
                        }), a.l.k(b, 9999, 500, c), !0) : !1;
                    };
                    a.v.c = function () {
                        var b = arguments;
                        a.focus.pageIsPrerendered() ? a.k.a.azsx('noLongerPreRendered', function (a) {
                            k.apply(this, b);
                        }, { once: !0 }) : k.apply(this, b);
                    };
                    a.v.m = function (b, c, d, e) {
                        e = e || function () {
                            return !0;
                        };
                        b = x(b, 1);
                        if (b[0] && a.a.bt(b[0]) && e(b[0]))
                            return c.adFindingMethod = 'findIframeAds', a.d.f(b[0], b[0].src, !1, void 0, c, d);
                    };
                    a.v.l = function (b, c, d, e, g) {
                        var h, f;
                        b = a.v.a(e || b, a.v.b);
                        for (e = 0; e < b.length; e++)
                            if (f = b[e], (g = a.g.e(f)) && g.documentElement) {
                                a: {
                                    h = c;
                                    var l = d;
                                    if (f.id && f.id.match('ebBannerIFrame') && a.a.bt(f) && (h.adFindingMethod = 'sizmek banner iframe', h = a.d.f(f, f.nodeName, !1, void 0, h, l)))
                                        break a;
                                    h = void 0;
                                }
                                if (h)
                                    return h;
                                if (h = a.v.k(['[id=\'ad\']'], g.documentElement, c, d))
                                    return c.adFindingMethod = 'ad', h;
                                if (h = y(g.documentElement, c, d))
                                    return c.adFindingMethod = 'Domsearch friendly iframe', h;
                                if (h)
                                    return h;
                                if (h = a.v.n(g.documentElement, c, d))
                                    return c.adFindingMethod = 'Domsearch again in friendly iframe', h;
                            }
                    };
                    a.v.n = function (b, c, d) {
                        var e;
                        b = a.v.a(b, a.v.b);
                        for (var g = 0; g < b.length; g++)
                            if (e = b[g], (e = a.g.e(e)) && e.documentElement && (e = y(e.documentElement, c, d)))
                                return e;
                    };
                    a.v.j = function (b, c, d) {
                        if (!a.a.ea(n, c))
                            return !1;
                        if ('function' !== typeof d && (b = a.t.n(b, c))) {
                            if (b === a.t.i)
                                return a.t.i;
                            c.adFindingMethod = c.activeConfig ? 'EXP: ' + c.activeConfig : 'EXP Unmapped';
                            return a.d.f(b, 'div', !1, void 0, c, d);
                        }
                    };
                    a.v.o = function (b, c) {
                        if (!ja && !1 !== b.shouldKillAd) {
                            var d = new A().getTime() - c.ao.startTime;
                            !0 !== c.em && !0 !== c.preventTryFindingAdAgain && 5000 > d && (a.v.p(c), b.shouldKillAd = !1);
                        }
                    };
                    a.k.a.azsx('beforeAdKilled', a.v.o);
                    a.v.q = function (a) {
                    };
                    a.v.p = function (b) {
                        if (!0 !== b.em) {
                            delete B[b.zr];
                            a.a.a(b.cc);
                            b.periscopeManager && b.periscopeManager.killAllPixels();
                            var c;
                            (c = L && L.parentNode) && a.v.c(c, b.ao, b, void 0, function () {
                                a.ac.g(b);
                            }, void 0);
                        }
                    };
                    a.v.k = function (b, c, d, e) {
                        b = a.u.a(b, c);
                        var g;
                        a.a.forEach(b, function (b) {
                            if (a.a.bt(b))
                                return g = b, !1;
                        });
                        if (g)
                            return b = a.a.bf(g) || g.src || 'DIV', d.adFindingMethod = 'DOMSEARCH', a.d.f(g, b, !1, void 0, d, e);
                    };
                    var m = function (b, c, d, e, g, h) {
                        d = a.u.a(c, d);
                        d = a.a.filter(d, a.a.bt);
                        if (d.length >= (h ? c.length : 1))
                            return c = a.a.bf(d[0]) || d[0].getAttribute('src') || 'DIV', b(d, c, !1, void 0, e, g);
                    };
                    a.v.r = function (b, c, d, e, g) {
                        return m(a.d.p, b, c, d, e, g);
                    };
                    a.v.s = function (b, c, d, e, g) {
                        return m(a.d.o, b, c, d, e, g);
                    };
                    a.v.i = y;
                    a.v.f = function (k, n, m, x, y, r) {
                        a.g.d(r) && (r = window);
                        r || (r = window);
                        y = y || function () {
                            return !0;
                        };
                        var u = a.v.i, w = a.v.j;
                        if ('undefined' === typeof k)
                            return !1;
                        if (a.c.p && 'HEAD' === k.tagName) {
                            var v = k.parentNode;
                            'HTML' === v.tagName && (v = v.getElementsByTagName('body'), 0 < v.length && (k = v[0]));
                        }
                        if (v = q(k, n, m, y))
                            return v;
                        if (a.c.eo)
                            return !1;
                        if (v = t(k, n, m, y))
                            return v;
                        if (a.c.ep)
                            return !1;
                        if (v = a.v.k(['[id=\'ad\']'], k, n, m))
                            return n.adFindingMethod = 'DOM Id = ad', v;
                        if (v = a.v.k(['../body/ins[class=\'dcmads\'][data-dcm-rendering-mode=\'script\']'], k, n, m))
                            return n.adFindingMethod = 'DCM ins', v;
                        if (v = a.v.k([
                                'div.teads-player/iframe',
                                'div[id^=\'playArea\']'
                            ], k, n, m))
                            return n.adFindingMethod = 'teads', v;
                        if (v = a.v.k(['div.avalanche'], k, n, m))
                            return n.adFindingMethod = 'avalanche', v;
                        if (v = d(k, n, m, y, r))
                            return v;
                        if (a.c.eq)
                            return !1;
                        if (v = n && n.ntvDomSearch)
                            return k = a.a.getElementsByClassName(v), k = a.a.filter(k, a.a.bt), 1 < k.length && (v = a.d.p(k, 'DIV', !1, void 0, n, m)) ? (n.adFindingMethod = 'NativoAds composite ads', v) : 1 === k.length && (n.adFindingMethod = 'NativoAds single ad', v = a.d.f(k[0], k[0].nodeName, !1, void 0, n, m)) ? v : !1;
                        if (v = a.v.k([
                                'div.str-adunit',
                                '[data-str-native-key]',
                                '[data-str-sibling]',
                                '..../../[data-str-native-key]'
                            ], k, n, m))
                            return n.adFindingMethod = 'Sharethrough', v;
                        if (v = a.v.k([
                                '.../[data-gg-moat]/[data-gg-moat-ifr]',
                                '.../[data-gg-moat]',
                                '[data-gg-moat]'
                            ], k, n, m))
                            return n.adFindingMethod = 'GumGum', v;
                        var v = (v = a.c.p ? k.ownerDocument.documentElement : k) && v.getElementsByTagName('script'), A = {}, B, D;
                        v && 0 < v.length && (A.jpd = /ads\.jetpackdigital\.com\/lineitems\/(\d+)\/jpd/, A.adform = /adform\.(?:com|net)\/adfscript\/?\?bn=([0-9]+)/, A.quartz = /ads\.qs\.com/, A.yieldmo = /ads\.yieldmo\.com\/.*\&p=([0-9]+).*\&lf=([0-9]+)/, A.yieldmo2 = /static\.yieldmo\.com\/ym\.[a-z0-9]{2}\.js/, a.a.forEach(v, function (a) {
                            for (var b in A)
                                if (A.hasOwnProperty(b)) {
                                    var c = a && a.getAttribute('src');
                                    if (c && (B = c.match(A[b])))
                                        return D = b, !1;
                                }
                        }));
                        a.u.a([
                            '.../[class*=\'jpeditorialunit\']',
                            '.../[class*=\'jpbanner\']',
                            '.../[id*=\'jpplatform\']',
                            '.../[id*=\'jpd_adhesion\']'
                        ], k)[0] && (D = 'jpd');
                        if (D && 'jpd' === D && (v = f(k, n, m, B && B[1], y)) || (v = g(k, n, m, y)) || D && 'adform' === D && (v = l(k, n, m, B && B[1], y, r)))
                            return v;
                        if (v = b(k, n, m, y, r))
                            return n.adFindingMethod = 'TRIPLELIFTADS: Moat script query string logic - ' + (n.tlview_id ? 'tlview_id' : 'tlviewID'), v;
                        if (v = e(k, n, m, y, r))
                            return n.adFindingMethod = 'TRIPLELIFTADS: Domsearch tleid attribute', v;
                        if (v = h(k, n, m, y, r))
                            return n.adFindingMethod = 'TRIPLELIFTADS: Domsearch based on window', v;
                        if (v = a.v.k([
                                '[id=\'qzad\']',
                                'div#qzc-container'
                            ], k, n, m))
                            return n.adFindingMethod = 'Quartz', v;
                        x = v = '';
                        D && a.a.ax([
                            'yieldmo',
                            'yieldmo2'
                        ], D) && (v = B && B[1], x = B && B[2]);
                        if (v = p(k, n, m, y, v, x))
                            return v;
                        if (r = r.weborama_display_tag && r.weborama_display_tag.mediapath) {
                            v = /https?:\/\/([0-9a-zA-Z\.\/]+)/;
                            r = r.match && r.match(v)[1];
                            x = a.u.c(['...../div[id^=\'scr_\'][id*=\'remotediv\']'], k);
                            for (var F = 0; F < x.length; F++)
                                if (v = a.v.k([
                                        '${[src*=\'' + r + '\']}',
                                        '+/${[src*=\'' + r + '\']}'
                                    ], x[F], n, m))
                                    return n.adFindingMethod = 'Weborama', v;
                        }
                        if ((v = w(k, n, m)) || (v = u(k, n, m, y)))
                            return v;
                        if (v = a.v.l(k, n, m))
                            return n.adFindingMethod = 'friendly iframe', v;
                        if (x = a.g.g(k))
                            if (v = a.v.l(x, n, m))
                                return n.adFindingMethod = 'find iframe parent', v;
                        if (a.c.q || x)
                            if (x = x || a.g.g(k))
                                if (r = a.a.be(x) === a.c.e, v = a.c.c && 'BODY' === x.nodeName, !r || !v) {
                                    if (v = w(x, n, m))
                                        return n.adFindingMethod = 'iframe parent expandable', v;
                                    if (v = u(x, n, m, y))
                                        return n.adFindingMethod = 'iframe parent findAd', v;
                                }
                        return (v = c(k, n, m, y)) ? (n.adFindingMethod = 'Undertone', v) : (v = a.v.k([
                            '../iframe#verve-banner',
                            '.../body/iframe#verve-expandable/=>/div.content',
                            '.../body/iframe#verve-expandable',
                            'iframe#verve-banner/=>/div.content',
                            'iframe#verve-banner'
                        ], k, n, m)) ? (n.adFindingMethod = 'Verve', v) : !1;
                    };
                    a.v.a = x;
                    a.v.t = function (b, c, d) {
                        if (!a.a.ea(n, c))
                            return !1;
                        if (a.c.c && b && a.a.bt(b) && a.x.e.a(b, c)) {
                            'width' == a.x.b && a.x.d();
                            c.skin = 1;
                            var e = a.a.bf(b);
                            if (b = a.d.f(b, e || b.nodeName, !1, void 0, c, d))
                                return c.adFindingMethod = 'WALLPAPERS ADS', b;
                        }
                    };
                    a.v.u = 1;
                    a.v.b = 2;
                    a.v.v = 500;
                    a.v.h = 20;
                    a.v.w = {
                        object: 1,
                        embed: 1,
                        img: 1,
                        iframe: 1
                    };
                }(u));
                (function (a) {
                    function k(d, g, c, b) {
                        var e = {};
                        d = d.replace(/&amp;/g, '&').replace(/(^\s+|\s+$)/g, '');
                        for (var h = d.split('&'), l = 0; l < h.length; l++) {
                            var k = h[l].split('=');
                            if ('string' === typeof k[1]) {
                                k[0] && k[0].match('moatClient') && (e['rawM' + k[0].slice(1)] = k[1]);
                                var t = k, q, y = q = k[1];
                                try {
                                    for (var x = 0; 100 > x && (q = decodeURIComponent(q), y != q) && !q.match(/^http(s)?\:/); x++)
                                        y = q;
                                } catch (n) {
                                }
                                q = q.replace(/(^\s+|\s+$)/g, '');
                                t[1] = q;
                            } else
                                k[1] = '';
                            e[k[0]] = k[1];
                        }
                        a.ap.f(e);
                        'undefined' !== typeof c && (e.clientZone = 'undefined' !== c ? c : '');
                        a.k.a.zaxs('getAdIdentifiersFromQueryString', e, d, g, c, b);
                        return e = a.ap.g(e);
                    }
                    function d(d, g) {
                        function c(a) {
                            if ((a = a.match('https?://(?:[a-zA-Z0-9\\-\\_]*).doubleclick.net/(?:[a-zA-Z0-9]*)/adj/(.*)')) && a[1])
                                return a[1];
                        }
                        var b;
                        if ('string' === typeof adsrc)
                            b = adsrc;
                        else {
                            for (var e in a.c.e) {
                                var h = e.match('^adsrc_');
                                if (h && h[0] && 'string' === typeof a.c.e[e]) {
                                    b = a.c.e[e];
                                    break;
                                }
                            }
                            if (!b)
                                for (e = g.parentNode.getElementsByTagName('script'), h = 0; h < e.length; h++)
                                    if (e[h].src) {
                                        var l = c(e[h].src);
                                        if (l) {
                                            b = l;
                                            break;
                                        }
                                    }
                            b || !a.c.p || a.c.q || (e = c(a.c.e.location.href)) && (b = e);
                        }
                        d.zMoatRawSlicer1 = d.moatClientSlicer1 || 'unclassified';
                        d.zMoatRawSlicer2 = d.moatClientSlicer2 || 'unclassified';
                        b ? (b = b.split(';')[0].split('/'), d.zMoatReutersSlicer1 = b[0] || d.moatClientSlicer1 || 'unclassified', d.zMoatReutersSlicer2 = b[1] || d.moatClientSlicer2 || 'unclassified') : (d.zMoatReutersSlicer1 = d.moatClientSlicer1 || 'unclassified', d.zMoatReutersSlicer2 = d.moatClientSlicer2 || 'unclassified');
                        return d;
                    }
                    a.ap = {};
                    a.ap.a = function (d, g) {
                        if (!d)
                            return !1;
                        if ('undefined' === typeof d.startTime || g)
                            d.startTime = a.c.bj;
                        if ('undefined' === typeof d.rand || g)
                            d.rand = w.floor(w.random() * w.pow(10, 12));
                        'undefined' === typeof d.adNum && (d.adNum = r.zr, r.zr++);
                    };
                    a.ap.b = function (d, g) {
                        if (!d)
                            return !1;
                        var c = a.a.aa();
                        a.a.ao();
                        decodeURIComponent(c);
                        return d;
                    };
                    a.ap.c = function (d, g) {
                        var c = a.ap.d(d, g);
                        c && (c._AD_FORMAT = g);
                        a.k.a.azsx('adInitialized', function (b) {
                            var c = b.DfpSlot;
                            b = b.ao;
                            if (c) {
                                a.a.dz(b);
                                b.fullAdUnitPath = a.an.c(c);
                                b.dfpSlotId = a.an.d(c);
                                for (var c = a.an.e(c), d = 0; d < c.length; d++)
                                    b['dfpAdUnitLabel' + d] = c[d];
                            }
                        });
                        a.k.a.zaxs('getIds', c, d, g);
                        return c;
                    };
                    a.ap.d = function (a, g) {
                        try {
                            var c = a.className, b = a.getAttribute('src');
                            c.split('\n').join(' ');
                            if (-1 !== c.indexOf('moatfooter'))
                                return !1;
                            var e = b.split('?'), h = b.split('#'), c = !1;
                            1 < e.length && 1 < h.length && e[1].length < h[1].length && (c = !0);
                            if (1 == e.length || c)
                                e = h;
                            if (1 < e.length) {
                                var l = k(e[1], g, 'undefined');
                                return l = d(l, a);
                            }
                            return !1;
                        } catch (p) {
                            return !1;
                        }
                    };
                    a.ap.e = function (a, d) {
                        if (!a)
                            return !1;
                        var c = {};
                        try {
                            var b = a && a.className.replace('amp;', '').split('?')[1];
                            if (c = b && k(b, d))
                                c._AD_FORMAT = d;
                            return c;
                        } catch (e) {
                            return !1;
                        }
                    };
                    a.ap.f = function (d) {
                        var g = a.a.am();
                        g && (d.zMoatCURL = g);
                        a.k.a.zaxs('appendNonQsAdIds', d);
                    };
                    a.ap.g = function (a) {
                        if (a) {
                            for (var d in a)
                                a.hasOwnProperty(d) && d && d.match('moatClientLevel') && 'string' === typeof a[d] && (a[d] = a[d].replace(/\:/g, '_').replace(/%3A/gi, '_'));
                            return a;
                        }
                    };
                    a.ap.h = function (a, d) {
                        return d || {};
                    };
                    a.ap.i = function (a) {
                        a = decodeURIComponent(decodeURIComponent(a));
                        -1 < a.indexOf('anonymous.google') && (a = 'anonymous.google');
                        var d = a.match(/^(?:[^:]{1,}:\/\/)?(?::*\/?\/?)?(?:www\.)?([^\/:]*)/);
                        d && d[1] && (a = d[1]);
                        return a.split('/')[0];
                    };
                    a.ap.j = function (d) {
                        a.ap.a(d);
                        a.ap.k(d);
                        d = a.ap.g(d);
                        a.ap.l && a.ap.l(d);
                        return d;
                    };
                }(u));
                (function (a) {
                    function k(a) {
                        'object' === typeof a && (a.fq = 0, a.gm = 0, a.ch = 0, a.ga = 0, a.gh = 0, a.hasOwnProperty('lx') && delete a.lx, a.um = 1);
                    }
                    function d(b, c, d) {
                        d = a.a.dz(c);
                        a.a.du({ all: !0 }, d) && (b.zGSRS = '1');
                        b.zGSRC = '1';
                        c.zMoatCHNLS && (b.gv = c.zMoatCHNLS);
                        c.zMoatGSCACHE && (b.hw = c.zMoatGSCACHE);
                    }
                    function f(a, b) {
                        b.i = a && a.sli && 'false' !== a.useSlotIkey && !1 !== a.useSlotIkey ? a.sli : 'REUTERS_HEADER1';
                    }
                    function g(b, c) {
                        var d = [
                            'type',
                            'div_id'
                        ];
                        d && 0 < d.length && c.dfpHeaderSlots && a.a.cd(b, c.dfpHeaderSlots);
                    }
                    function c(b) {
                        var c = a.c.e.googletag, c = c && 'function' === typeof c.pubads && c.pubads(), d = -1;
                        if (c && 'function' === typeof c.getSlots)
                            try {
                                var e = c.getSlots(), d = a.a.f(e) ? e.length : -1;
                            } catch (g) {
                            }
                        b.vb = d;
                    }
                    function b(b, c) {
                        a.a.ak(a.c.ba) && 5000 > encodeURIComponent(a.c.ba).length && (b.gu = a.c.ba);
                        b.id = a.c.bb ? '1' : '0';
                        b.ii = a.c.au;
                    }
                    function e(a, b) {
                        a.bo = b.moatClientSlicer1;
                        a.bd = b.moatClientSlicer2;
                    }
                    function h(b, c) {
                        if (a.c.es) {
                            var d = b.cm;
                            'number' === typeof d && (b.pc = d);
                            b.cm = 1;
                        }
                    }
                    function l(b, c) {
                        var d, e = [], g, h = a.a.av() ? 2048 : 7750, f = c || {};
                        g = {};
                        b.fs = '193224';
                        for (d in b)
                            b.hasOwnProperty(d) && (1 != b.e || 'x' !== d && 'y' !== d && 'c' !== d ? e.push(encodeURIComponent(d) + '=' + encodeURIComponent(b[d])) : g[d] = b[d].split('a'));
                        d = e.join('&');
                        var e = h - d.length, l = 0;
                        if ('undefined' !== typeof g.x) {
                            for (var k = 0, p = 0; p < g.x.length; p++)
                                if (k += g.x[p].length + (g.y[p] ? g.y[p].length : 0) + (g.c[p] ? g.c[p].length : 0), k < e)
                                    l++;
                                else
                                    break;
                            0 < l && (d += '&x=' + g.x.slice(0, l - 1).join('a'), d += '&y=' + g.y.slice(0, l - 1).join('a'), d += '&c=' + g.c.slice(0, l - 1).join('a'));
                        }
                        for (var t in f)
                            f.hasOwnProperty(t) && (g = '&' + encodeURIComponent(t) + '=' + encodeURIComponent(f[t]), g.length + d.length < h && (d += g));
                        d = d.replace(/\x27/g, '%27');
                        try {
                            d += '&na=' + a.a.cw(d, b.i);
                        } catch (q) {
                        }
                        return d;
                    }
                    function p(b, c) {
                        b.j = 25 == c ? 'string' == typeof a.c.d && a.c.d.slice(0, 500) || '' : a.a.ap(a.c.d);
                    }
                    function t(b, c) {
                        if (!a.c.c) {
                            var d = a.a.ab();
                            d && (b.lp = d);
                        }
                    }
                    function q(b, c, d) {
                        var e = a.a.dz(d), g = a.a.du({ all: !0 }, e);
                        a.a.forEach(c, function (a) {
                            if (b[a])
                                return !0;
                            g ? d[a] && '-' !== d[a] && (b[a] = d[a]) : b[a] = d[a] || '-';
                        });
                        return b;
                    }
                    a.y = {};
                    var y = 'zMoatPS zMoatTP zMoatST zMoatARBL zMoatAdUnit1 zMoatStory zMoatAU zMoatPixelDistance zMoatRawSlicer1 zMoatRawSlicer2 zMoatReutersSlicer1 zMoatReutersSlicer2 zMoatBlacklist zMoatJS'.split(' '), x = {
                            display: 1,
                            video: 2,
                            adx: 3,
                            html5: 4,
                            content: 5,
                            feather: 6,
                            ivt_only: 7
                        };
                    a.y.c = function (b, c) {
                        var d = a.a.dz(c);
                        b.hp = 1;
                        c.zMoatAdUnit1 && (b.zMoatAdUnit1 = c.zMoatAdUnit1);
                        c.zMoatAdUnit2 && (b.zMoatAdUnit2 = c.zMoatAdUnit2);
                        c.zMoatAdUnit3 && (b.zMoatAdUnit3 = c.zMoatAdUnit3);
                        c.zMoatAdUnit4 && (b.zMoatAdUnit4 = c.zMoatAdUnit4);
                        a.c.c && window.top.document && window.top.document.hasFocus && 'function' === typeof window.top.document.hasFocus && (b.wf = window.top.document.hasFocus() ? 1 : 0);
                        d = x[d];
                        'undefined' !== typeof d && (b.ra = d);
                        c.altKey && (b[c.altKey] = 1);
                        b.pxm = '7';
                        b.sgs = 3;
                        a.k.a.zaxs('appendCommonKeys', b, c);
                    };
                    a.y.b = function (n, m, x, G, u) {
                        var C = a.a.dz(m);
                        a.ap.a(m, G);
                        var z = {};
                        z.e = n;
                        a.a.cd(z, x);
                        f(m, z);
                        a.y.c(z, m);
                        c(z);
                        a.h && (z.cm = a.a.as(a.h, a.i).multiplier);
                        try {
                            z.kq = a.c.e && a.c.e.devicePixelRatio;
                        } catch (w) {
                            z.kq = 1;
                        }
                        z.hq = a.c.m ? 1 : 0;
                        z.hs = a.c.j ? 1 : 0;
                        z.hu = a.c.ah ? 1 : 0;
                        z.hr = a.c.ad ? 1 : 0;
                        z.ht = a.c.ak ? 1 : 0;
                        z.dnt = a.c.ej ? 1 : 0;
                        if (11 === n) {
                            a.k.a.zaxs('adNotFound');
                            var A = [], E;
                            for (E in oa)
                                oa.hasOwnProperty(E) && A.push(E + '=' + oa[E]);
                            z.k = A.join('&').slice(0, 300);
                        }
                        if (!(z.e in sa)) {
                            z.bq = a.c.n;
                            1 === m.skin && (z.wp = 1 === m.isSkin ? 1 : 1 === m.isAolSkin ? 2 : 3);
                            z.f = Number(!ka);
                            a.c.dc && (z.nh = 1);
                            m.IS_PAGE_LEVEL || p(z, z.e);
                            t(z, z.e);
                            z.t = m.startTime;
                            z.de = m.rand;
                            z.rx = a.c.ax.a;
                            z.m = 0;
                            z.ar = '29ad59d-clean';
                            z.iw = '31d6965';
                            a.a.ch(z, 'ai', r.z);
                            a.a.ch(z, 'wr', r.ACTIVETIMEUNTILSCROLL);
                            z.q = r.m++;
                            z.cb = U ? 1 : 0;
                            z.cu = R;
                            z.ll = a.c.dh || 0;
                            a.a.ch(z, 'lm', a.c.dd());
                            z.ln = a.c.p ? 1 : 0;
                            a.a.cd(z, a.focus.getQueryString());
                            a.ap.h(m, z);
                            'undefined' !== typeof m && (z.d = m.moatClientLevel1 + ':' + m.moatClientLevel2 + ':' + m.moatClientLevel3 + ':' + m.moatClientLevel4, A = a.a.dx({ all: 'zMoatPS zMoatTP zMoatST zMoatARBL zMoatAdUnit1 zMoatStory zMoatAU zMoatPixelDistance zMoatRawSlicer1 zMoatRawSlicer2 zMoatReutersSlicer1 zMoatReutersSlicer2 zMoatBlacklist zMoatJS'.split(' ') }, C) || y, q(z, A, m), m.adFindingMethod && (z.hv = m.adFindingMethod), d(z, m, C), b(z, m), m && (z.zMoatRawSlicer1 = m.zMoatRawSlicer1 || 'unclassified', z.zMoatRawSlicer2 = m.zMoatRawSlicer2 || 'unclassified'), A = [
                                '20159232',
                                '33774912',
                                '27635832',
                                '32276832',
                                '19971672'
                            ], m && m.moatClientLevel1 && !a.a.ax(A, m.moatClientLevel1) && (z.zMoatBlacklist = !0), a.a.du({ all: !0 }, C) && e(z, m), z.gw = 'reutersheader194883552024', z.fd = '1');
                            z.ac = 1;
                            z.it = a.v.v;
                            a.c.am().isInApp && (z.lv = a.c.cp(), z.zl = a.c.ea() ? 1 : 0, a.c.cq() ? (a.a.bp() && (z.wo = 1), (C = a.a.bl(a.c.bc)) && (z.zMoatMMAKns = C)) : a.c.da() && (z.lx = 1));
                            a.d.c() && k(z);
                            g(z, m);
                            (C = a.aq.a()) && (z.pe = C);
                            a.k.a.zaxs('dropNonAdPixel', z, n, m, x, G, u);
                            h(z, u);
                            x = l(z);
                            n = W;
                            m = a.y.d(m, x + '&cs=0', z);
                            if (!0 === u)
                                return {
                                    qs: z,
                                    res: m
                                };
                            m.shouldSendPixel && m.querystring && r.yh.yi(m.querystring, n);
                        }
                    };
                    a.y.a = function (n, m, x) {
                        if (window && window.closed || !n || !0 === n.ep)
                            return !1;
                        var G = n.getFormat();
                        a.y.c(m, n.ao);
                        c(m);
                        try {
                            m.kq = a.c.e && a.c.e.devicePixelRatio;
                        } catch (u) {
                            m.kq = 1;
                        }
                        a.v.q(n);
                        if ('undefined' !== typeof n.ao && (2 !== n.an || 1 !== m.e && 3 !== m.e) && !(m.e in sa)) {
                            m.lo = n.FIND_AD_TRIES;
                            n.proxyTrackingEnabled && (m.tr = 1);
                            m.uk = a.a.bl(a.c.bc);
                            var A = a.a.bn(), C = a.a.bm(A.results), z = {
                                    article: 'pk',
                                    page_height: 'wk',
                                    meta_properties: 'rk',
                                    favicon: 'tk'
                                };
                            a.a.forEach(C, function (a) {
                                m[z[a]] = A.results[a] ? 1 : 0;
                            });
                            n.hasNonIframeListener && (m.ni = 1);
                            var B = n.ag, C = {}, E = a.w.b(n.zr);
                            if (9 === m.e && 2 === m.q || 25 === m.e) {
                                for (var D in B)
                                    B.hasOwnProperty(D) && '' !== D && 'undefined' !== typeof B[D] && -1 === D.indexOf('dvContains') && -1 === D.indexOf('indexOf') && -1 === D.toLowerCase().indexOf('clicktag') && (C['z' + D] = B[D]);
                                m.e = 25;
                            }
                            0 === n.an && (m.dc = n.WMODE);
                            'string' !== typeof n.ae || 0 != m.e && 25 != m.e ? m.ak = '-' : (D = a.c.j ? 700 : 1200, m.ak = n.ae.length <= D ? n.ae : n.ae.slice(0, D));
                            n.bi > n.bg && (n.bg = n.bi);
                            n.bm > n.bk && (n.bk = n.bm);
                            f(n.ao, m);
                            a.a.cd(m, a.f.r(!0));
                            m.bq = a.c.n;
                            g(m, n.ao);
                            1 === n.ao.skin && (m.wp = 1 === n.ao.isSkin ? 1 : 1 === n.ao.isAolSkin ? 2 : 3);
                            m.g = n.aq.g++;
                            var v, H;
                            n.isSREMeasurable || n.setDimensions();
                            n.IS_PAGE_LEVEL || (1 === n.ao.skin ? (H = a.c.r(a.c.e), v = H.width, H = H.height) : n.compositeAdAreaPx ? (v = n.compositeAdAreaPx, H = 1) : (v = n.INITIAL_WIDTH, H = n.INITIAL_HEIGHT));
                            v = v || 0;
                            H = H || 0;
                            0 < v && 0 < H && (n.isSREMeasurable = !0);
                            m.hq = a.c.m ? 1 : 0;
                            m.hs = a.c.j ? 1 : 0;
                            m.hu = a.c.ah ? 1 : 0;
                            m.hr = a.c.ad ? 1 : 0;
                            m.ht = a.c.ak ? 1 : 0;
                            m.dnt = a.c.ej ? 1 : 0;
                            m.h = H;
                            m.w = v;
                            m.rm = n.isSREMeasurable ? 1 : 0;
                            try {
                                a.c.dl() && n && n.elementRect && (m.fy = n.elementRect.left, m.gp = n.elementRect.top);
                            } catch (u) {
                            }
                            d(m, n.ao, G);
                            b(m, n.ao);
                            a.h && (m.cm = a.a.as(a.h, a.i).multiplier);
                            m.f = Number(!ka);
                            n.IS_PAGE_LEVEL || p(m, m.e);
                            t(m, m.e);
                            m.t = n.ao.startTime;
                            m.de = n.ao.rand;
                            m.rx = a.c.ax.a;
                            m.cu = R;
                            m.m = m.m || a.a.bb(n);
                            m.ar = '29ad59d-clean';
                            m.iw = '31d6965';
                            m.cb = U ? 1 : 0;
                            a.a.ch(m, 'rd', n.refreshDecision);
                            a.a.ch(m, 'zMoatAR', n.moatAutoRefreshed);
                            a.a.ch(m, 'zMoatWDAC', n.wasDupeAutoCreative);
                            m.ll = a.c.dh || 0;
                            a.a.ch(m, 'lm', a.c.dd());
                            m.ln = a.c.p ? 1 : 0;
                            a.c.c && (m.gh = 1);
                            a.c.dc && (m.nh = 1);
                            m.xx = a.c.er + ':' + a.f.ak();
                            m.td = a.c.de;
                            a.c.t();
                            m.qa = a.c.w;
                            m.qb = a.c.x;
                            m.qi = a.c.u;
                            m.qj = a.c.v;
                            m.qf = a.c.y;
                            m.qe = a.c.z;
                            m.qh = a.c.aa;
                            m.qg = a.c.ab;
                            try {
                                m.lk = n && n.elementRect && n.elementRect.top + a.c.ac || 'undefined';
                            } catch (u) {
                            }
                            isNaN(a.c.h) || (m.lb = a.c.h);
                            m.le = Ea ? 1 : 0;
                            a.f && void 0 !== a.f.al && (m.lf = a.f.al);
                            a.f && void 0 !== a.f.aa && (m.lg = a.f.aa);
                            a.f && void 0 !== a.f.am && (m.lh = a.f.am);
                            a.c.cb && (m.fa = 1);
                            'number' !== typeof a.c.cd || isNaN(a.c.cd) || (m.zz = a.c.cd);
                            if (a.m && a.m.a())
                                m.ch = 1, m.gh = 1;
                            else if (a.o && a.o.a) {
                                a.c.bw && (m.ss = 1);
                                if (n && n.periscopeManager) {
                                    v = !a.focus.pageIsVisible() && n && n.counters && n.counters.strictDwell && 0 == n.counters.strictDwell.tCur && 21 == m.e;
                                    H = a.a.ay && '0' != a.a.ay();
                                    if (n.periscopeManager.measurable || !a.c.c && v && H)
                                        m.ch = 1;
                                    n.periscopeManager.fullyMeasurable && n.ao && 1 != n.ao.skin && (m.ga = 1);
                                } else
                                    m.ch = 1;
                                'undefined' !== typeof a.o.d && n && n.ao && n.ao.startTime && !isNaN(n.ao.startTime) && (v = a.o.d - n.ao.startTime, m.fg = 0 <= v ? v : 0);
                            } else
                                m.ch = 0;
                            m.vv = E ? n.viewabilityMethod[E] : 0;
                            v = n.viewabilityMethod;
                            m.vw = (v.strict || 0) + ':' + (v.sframe || 0) + ':' + (v.pscope || 0);
                            v = n.viewabilityPercent;
                            m.vp = v[E];
                            m.vx = v.strict + ':' + v.sframe + ':' + v.pscope;
                            (v = a.aq.a()) && (m.pe = v);
                            a.a.cd(m, a.w.u(n.zr, m));
                            a.a.cd(m, a.focus.getQueryString());
                            a.a.cd(m, a.ai.b(n.zr));
                            a.a.cd(m, a.ar.a(n.zr));
                            a.a.cd(m, n.counters.getQs());
                            n.px2 && n.px2.inSample && !n.px2.success && (m.zMoatIDF = 1);
                            n.px2 && (m.xd = (n.px2.inSample ? '1' : '0') + (n.px2.firedPixel ? '1' : '0'));
                            a.as.a(n, m);
                            a.at.a(n, m);
                            a.a.ch(m, 'ai', r.z);
                            a.a.ch(m, 'wr', r.ACTIVETIMEUNTILSCROLL);
                            a.a.ch(m, 'ap', n.cb);
                            a.a.ch(m, 'ax', n.bg);
                            a.a.ch(m, 'ay', n.bi);
                            a.a.ch(m, 'az', n.bk);
                            a.a.ch(m, 'ba', n.bm);
                            a.a.ch(m, 'aw', n.bc);
                            a.a.ch(m, 'bg', n.bd);
                            a.a.ch(m, 'be', n.be);
                            a.a.ch(m, 'bc', n.bw);
                            a.a.ch(m, 'bf', n.by);
                            a.a.ch(m, 'bh', n.bx);
                            a.a.ch(m, 'bz', n.cu);
                            m.cl = w.round(100 * n.IR5.AREA / (m.w * m.h));
                            0 < n.aq[2] && (m.au = n.aq[2] - 1);
                            0 < n.aq[3] && (m.av = n.aq[3] - 1);
                            0 < n.aq[23] && (m.by = n.aq[23] - 1);
                            m.at = n.dm;
                            a.ap.h(n.ao, m);
                            m.d = n.ao.moatClientLevel1 + ':' + n.ao.moatClientLevel2 + ':' + n.ao.moatClientLevel3 + ':' + n.ao.moatClientLevel4;
                            n.ao && (m.zMoatRawSlicer1 = n.ao.zMoatRawSlicer1 || 'unclassified', m.zMoatRawSlicer2 = n.ao.zMoatRawSlicer2 || 'unclassified');
                            v = [
                                '20159232',
                                '33774912',
                                '27635832',
                                '32276832',
                                '19971672'
                            ];
                            n.ao && n.ao.moatClientLevel1 && !a.a.ax(v, n.ao.moatClientLevel1) && (m.zMoatBlacklist = !0);
                            a.a.du({ all: !0 }, G) && e(m, n.ao);
                            m.gw = 'reutersheader194883552024';
                            G = a.a.dx({ all: 'zMoatPS zMoatTP zMoatST zMoatARBL zMoatAdUnit1 zMoatStory zMoatAU zMoatPixelDistance zMoatRawSlicer1 zMoatRawSlicer2 zMoatReutersSlicer1 zMoatReutersSlicer2 zMoatBlacklist zMoatJS'.split(' ') }, G) || y;
                            v = a.a.i(n.ao);
                            q(m, G, v);
                            n.ao.adFindingMethod && (m.hv = n.ao.adFindingMethod);
                            m.ab = n.an;
                            m.ac = 1;
                            m.fd = '1';
                            m.kt = E;
                            m.it = a.v.v;
                            n.bi = n.bg;
                            n.bm = n.bk;
                            a.aa.f(n) && (m.fz = 1);
                            E = a.aa.g(n.zr);
                            m.oq = E ? 1 : 0;
                            'undefined' !== typeof n.zr && (m.ot = a.aa.h[n.zr].stateMask.toString(16));
                            a.c.am().isInApp && (m.lv = a.c.cp(), m.zl = a.c.ea() ? 1 : 0, a.c.cq() ? (a.a.bp() && (m.wo = 1), (E = a.a.bl(a.c.bc)) && (m.zMoatMMAKns = E)) : a.c.da() && (m.lx = 1));
                            n.debugData && (m.zMoatJS = n.debugData.getValue());
                            n && n.isMeasurabilityDisabled() && k(m);
                            a.d.c() && k(m);
                            a.a.ax([2], m.e) && n.aq.tc++;
                            m.tc = n.aq.tc;
                            a.k.a.zaxs('dropPixel', n, m, x);
                            h(m, x);
                            G = l(m, C);
                            E = W;
                            if (x)
                                return m;
                            n = a.y.d(n.ao, G + '&cs=0', m, C);
                            n.shouldSendPixel && n.querystring && r.yh.yi(n.querystring, E);
                        }
                    };
                    a.y.e = function (b, c) {
                        var d = a.a.dz(c);
                        b.zMoatSrcd = b.d;
                        b.zMoatSrcbo = b.bo;
                        b.zMoatSrcbp = b.bp;
                        b.zMoatSrcbd = b.bd;
                        b.d = (c.moatClientLevel1 || '') + ':';
                        b.d += (c.moatClientLevel2 || '') + ':';
                        b.d += (c.moatClientLevel3 || '') + ':';
                        b.d += c.moatClientLevel4 || '';
                        a.a.du({ all: !0 }, d) && e(b, c);
                        return b;
                    };
                    a.y.f = function (b, c, d, e, g, h, f) {
                        b = 'extraPx_' + b;
                        c[b] || (c[b] = {});
                        e = a.a.i(e);
                        e.zMoatSrci = e.i;
                        e.i = d;
                        f && (e = a.y.e(e, f));
                        if (a.f.an && !c[b].timestampsReset)
                            for (var k = 0; k < a.f.an.length; k++) {
                                var p = a.f.an[k];
                                p.zMoatSrci = p.i;
                                p.i = d;
                                f && (p = a.y.e(p, f));
                                p = l(p) + '&cs=0';
                                r.yh.yi(p, g);
                            }
                        c[b].timestampsReset || (c[b].timestampsReset = !0, e.lc && (e.lc = 0), e.cd && (e.cd = 0), e.sm && (e.sm = 0), e.fv && (e.fv = 0), e.pn && (e.pn = 0), e.lt && (e.lt = 0), e.ba && (e.ba = 0), e.sq && (e.sq = 0), e.gg && (e.gg = 0), e.mu && (e.mu = 0), e.si && (e.si = 0), e.mc && (e.mc = 0), e.dt && (e.dt = 0), e.gt && (e.gt = 0), e.ao && (e.ao = 0), e.mk && (e.mk = 0), e.dr && (e.dr = 0), e.ev && (e.ev = 0), e.ge && (e.ge = 0), e.mx && (e.mx = 0), e.an && (e.an = 0), e.cf && (e.cf = 0), e.gl && (e.gl = 0), e.mw && (e.mw = 0), e.xb && (e.xb = 0), e.db && (e.db = 0), e.am && (e.am = 0), e.fj && (e.fj = 0), e.my && (e.my = 0), e.mz && (e.mz = 0), e.cn && (e.cn = 0), e.es && (e.es = 0), e.sa && (e.sa = 0), e.pf && (e.pf = 0), e.ay && (e.ay = 0), e.bx && (e.bx = 0));
                        b = l(e, h);
                        r.yh.yi(b + '&cs=0', g);
                    };
                    a.y.d = function (b, c, d, e) {
                        b = !0;
                        if (a.h && (b = a.a.au(), !b)) {
                            for (var g = [
                                        1,
                                        2,
                                        3,
                                        23,
                                        25
                                    ], h = 0, f = g.length; h < f; h++)
                                if (d.e == g[h]) {
                                    b = !0;
                                    break;
                                }
                            b && (d.cm = 0, c = l(d, e), c += '&cs=0');
                        }
                        return {
                            shouldSendPixel: b,
                            querystring: c
                        };
                    };
                    a.y.g = function (a, b) {
                        if (2 !== a.an || 1 !== b.e && 3 !== b.e)
                            new Image(1, 1).src = '';
                    };
                    a.y.h = function (b) {
                        var c = a.y.i(b.data);
                        c.i = a.a.dy(c.i, b.iKeySuffix);
                        var d = l(c, b.flashVarsForQS) + '&cs=0';
                        if (b.sendNow) {
                            if (a.f.an)
                                for (var e = 0; e < a.f.an.length; e++) {
                                    var g = a.f.an[e];
                                    g.i = a.a.dy(g.i, b.iKeySuffix);
                                    g = l(g) + '&cs=0';
                                    r.yh.yi(g, b.pixelURL);
                                }
                            r.yh.yi(d, b.pixelURL);
                        }
                        return c;
                    };
                    a.y.i = function (b) {
                        b = a.a.i(b);
                        for (var c = 'am an ao ay ba bx cd cf db dr dt es ev sa sq si sm mc lc pf xb ge gg cn gl pn fj lt mu mk mw mx my mz fv'.split(' '), d = 0; d < c.length; d++)
                            b[c[d]] && (b[c[d]] = 0);
                        return b;
                    };
                    a.y.j = function (a, b) {
                        return l(a, b);
                    };
                    a.y.k = function (b) {
                        var c = { e: 16 };
                        c.q = b.aq[16]++;
                        a.y.a(b, c);
                    };
                    a.y.l = function (b) {
                        var c = !1, d = !!b && b.getFormat(), e = a.y.b(8, b.ao, !1, !1, !0);
                        if (e && e.qs && e.qs.d) {
                            c = e.qs.d.split(':');
                            c = {
                                viewHash: 'REUTERS_HEADER1',
                                moatClientLevel1: c[0],
                                moatClientLevel2: c[1],
                                moatClientLevel3: c[2],
                                moatClientLevel4: c[3],
                                tagStartTime: a.c.bj
                            };
                            if (b && b.ao)
                                for (var g in b.ao)
                                    b.ao.hasOwnProperty(g) && -1 != g.indexOf('zMoat') && (c[g] = b.ao[g]);
                            for (g in e)
                                e.hasOwnProperty(g) && -1 != g.indexOf('zMoat') && (c[g] = e[g]);
                            a.a.du({ all: !0 }, d) && (b = c, e = e.qs, b.moatClientSlicer1 = e.bo, b.moatClientSlicer2 = e.bd);
                        }
                        return c;
                    };
                    a.y.m = function (b) {
                        var c = { e: 8 };
                        c.q = b.aq[8]++;
                        return a.y.a(b, c, !0);
                    };
                }(u));
                (function (a) {
                    function k(d, c, b, e, h) {
                        var f = 10000;
                        a.c.am().isInApp && (f = 500);
                        new A().getTime();
                        this.tMaxContinuous = this.tContinuous = this.tLast = this.tCur = 0;
                        this.getMaxContinuous = function () {
                            return w.max(this.tContinuous, this.tMaxContinuous);
                        };
                        this.reset = function () {
                            this.tLast = this.tCur = 0;
                        };
                        this.update = function (a, b, c) {
                            d(a) ? (b = w.min(b, f), a = typeof e, b && 0 > b && (b = 0), this.tCur += b, this.tContinuous += b, 'number' === a && 0 < e ? this.tCur > e && (this.tCur = e) : 'function' === a && (b = e(), 'number' === typeof b && this.tCur > b && 0 < b && (this.tCur = b))) : (this.tMaxContinuous < this.tContinuous && (this.tMaxContinuous = this.tContinuous), this.tContinuous = 0);
                            h && h(this.tCur);
                        };
                        this.getQs = function (a) {
                            a = this.query(a);
                            this.tLast = this.tCur;
                            return a;
                        };
                        this.query = function (a) {
                            a = a || {};
                            this.tLast > this.tCur && (this.tLast = this.tCur);
                            c && b && (a[c] = this.tCur, a[b] = this.tLast);
                            return a;
                        };
                    }
                    a.ac = {};
                    a.ac.h = {};
                    a.ac.h.a = [];
                    a.ac.h.b = [];
                    var d = !1, f = {};
                    a.ac.i = function () {
                        if (!d) {
                            d = !0;
                            try {
                                r.swde.azsx('scroll', a.ac.j);
                            } catch (g) {
                            }
                        }
                    };
                    a.ac.k = function (d, c) {
                        try {
                            var b = d.aa, e = a.a.bg(b, 5), h = e && (6 == e.length || 1 <= e.length && 'HTML' === e[e.length - 1].nodeName);
                            c = c || d.WINDOW || a.a.be(b);
                            return !(b && c && h) || a.a.ea([
                                'feather',
                                'display',
                                'video'
                            ], d.ao) && 'Unicast Generic' === d.ao.activeConfig && a.t.k(d.zr) && (3 > b.offsetWidth || 3 > b.offsetHeight) || b.ownerDocument && b.ownerDocument.body && !b.ownerDocument.body.contains(b) ? !1 : !0;
                        } catch (f) {
                            return !1;
                        }
                    };
                    a.ac.l = function () {
                        function d() {
                            if (!f)
                                try {
                                    f = !0, c(h), f = !1;
                                } catch (a) {
                                    throw f = !1, a;
                                }
                        }
                        function c(a) {
                            var c = a.Moat;
                            a = a.domNodesIdToAd;
                            for (var d in a)
                                a.hasOwnProperty(d) && c.a.ea([
                                    'feather',
                                    'display',
                                    'video'
                                ], a[d].ao) && c.t.m('loop', d);
                            c.ac.m();
                            d = new A().getTime();
                            a = w.max(w.min(d - b, e), 0);
                            c.k.a.zaxs('view:tick', a, d);
                            b = d;
                            c.ao.b();
                        }
                        var b = new A().getTime(), e = 10000;
                        a.c.am().isInApp && (e = 500);
                        var h = {
                                Moat: a,
                                domNodesIdToAd: B
                            }, f = !1;
                        a.k.a.azsx('periscope:onStateChange', d);
                        a.k.a.azsx('viewCounterStarted', d);
                        var k = 'MOAT_VIEW_LOOP_ID_' + new A().getTime();
                        a.l.g(c, h, 200, k);
                        return a.a.df([h], c);
                    }();
                    a.ac.m = function () {
                        var d, c;
                        for (c in B)
                            B.hasOwnProperty(c) && (d = B[c], a.ac.k(d, d.WINDOW) || a.ac.g(d));
                    };
                    a.ac.g = function (d) {
                        if (!0 !== d.ep) {
                            if (!ja) {
                                var c = { shouldKillAd: !0 };
                                a.k.a.zaxs('beforeAdKilled', c, d);
                                if (!c.shouldKillAd)
                                    return;
                            }
                            a.k.a.zaxs('adKilled', d);
                            a.d.l(d);
                        }
                    };
                    a.ac.c = function (d) {
                        d.eq || (d.eq = !0);
                        var c = { e: 5 };
                        c.q = d.aq[5]++;
                        a.y.a(d, c);
                    };
                    a.ac.b = function (d) {
                        if (!d || !d.aq || !d.aq[0])
                            return !1;
                        var c = { e: 37 };
                        c.q = d.aq[37]++;
                        a.y.a(d, c);
                    };
                    a.ac.n = [];
                    a.ac.o = function (d, c) {
                        var b = !1;
                        if (!d || !d.aq || !d.aq[29] || 3 > d.aq[29])
                            return !1;
                        for (var e = 0; e < c.length; e++) {
                            var h = c[e];
                            -1 === a.a.indexOf(a.ac.n, h) && (b = !0, a.ac.n.push(h));
                        }
                        b && (b = { e: 37 }, b.q = d.aq[37]++, a.y.a(d, b));
                    };
                    a.ac.a = function (d) {
                        var c;
                        c = d.aa;
                        if (1 == d.ao.skin)
                            return !1;
                        if (a.ai.c(d))
                            return !0;
                        d.elementRect || (d.currentWidth = c.offsetWidth, d.currentHeight = c.offsetHeight);
                        c = d.currentWidth;
                        d = d.currentHeight;
                        return 3 > c || 3 > d || !a.c.ce() && a.focus.pageIsPrerendered() ? !0 : !1;
                    };
                    a.ac.e = function (d) {
                        return d ? a.focus.pageIsVisible() : !1;
                    };
                    a.ac.p = function (d) {
                        var c = 1;
                        screen.deviceXDPI ? c = screen.deviceXDPI / screen.systemXDPI : d.devicePixelRatio && 'undefined' !== typeof d.mozInnerScreenX && (c = d.devicePixelRatio);
                        return (d = a.c.s()) ? {
                            w: c * d.width,
                            h: c * d.height
                        } : {
                            w: 0,
                            h: 0
                        };
                    };
                    a.ac.f = function (d) {
                        d.counters = {};
                        d.counters.laxDwell = new k(function () {
                            return !a.focus.pageIsPrerendered();
                        }, 'bu', 'cd');
                        d.counters.strictDwell = new k(a.focus.pageIsVisible, 'ah', 'am');
                        d.counters.query = function () {
                            var a = {}, c;
                            for (c in this)
                                if (this.hasOwnProperty(c)) {
                                    var d = this[c];
                                    'function' === typeof d.query && d.query(a);
                                }
                            return a;
                        };
                        d.counters.getQs = function () {
                            var a = {}, c;
                            for (c in this)
                                if (this.hasOwnProperty(c)) {
                                    var d = this[c];
                                    'function' === typeof d.getQs && d.getQs(a);
                                }
                            return a;
                        };
                        d.counters.update = function (a, c, d) {
                            for (var g in this)
                                if (this.hasOwnProperty(g)) {
                                    var f = this[g];
                                    'function' === typeof f.update && !0 !== a.ep && f.update(a, c, d);
                                }
                        };
                        a.k.a.azsx('startAdTracking', a.ac.i);
                        var c = a.k.a.azsx('view:tick', a.a.df([d], d.counters.update, d.counters));
                        f[d.zr] = c;
                    };
                    a.ac.q = function () {
                        r.z = void 0;
                        r.ACTIVETIMEUNTILSCROLL = void 0;
                        r.zs = !1;
                        r.xz = !1;
                        r.dcsx.wsqa('globalScrollevent' + r.dcsx.uid);
                        a.a.forEach(a.ac.h.a, function (a) {
                            if (a && 'function' === typeof a)
                                try {
                                    a();
                                } catch (c) {
                                }
                        });
                    };
                    a.ac.j = function (d) {
                        if (a.focus.pageIsVisible()) {
                            d = new A().getTime();
                            'undefined' === typeof r.z && (r.z = d - R);
                            if ('undefined' === typeof r.ACTIVETIMEUNTILSCROLL) {
                                var c = a.focus.focusStartTime || R;
                                c < R && (c = R);
                                r.ACTIVETIMEUNTILSCROLL = d - c;
                            }
                            a: {
                                for (var b in B)
                                    if (B.hasOwnProperty(b) && (d = B[b]) && 'undefined' !== typeof d.ao) {
                                        if (d.ce)
                                            break a;
                                        c = { e: 4 };
                                        c.q = d.aq[4]++;
                                        c.ai = r.z;
                                        c.wr = r.ACTIVETIMEUNTILSCROLL;
                                        a.y.a(d, c);
                                        d.ce = !0;
                                    }
                                try {
                                    r.dcsx.wsqa('globalScrollevent' + r.dcsx.uid), r.swde.sxaz('scroll', { callback: a.ac.j });
                                } catch (e) {
                                }
                            }
                        }
                    };
                    a.ac.d = function (d, c) {
                        var b = { e: 9 };
                        b.q = d.aq[9]++;
                        d.ci = +new A();
                        c && 'object' === typeof c && a.a.forEach(c, function (a, c) {
                            b[c] = a;
                        });
                        a.y.a(d, b);
                    };
                    a.k.a.azsx('adKilled', function (d) {
                        d && !d.ep && f.hasOwnProperty(d.zr) && a.k.a.sxaz('view:tick', { id: f[d.zr] });
                    });
                }(u));
                (function (a) {
                    function k(a, f) {
                        function g(a) {
                            return function () {
                                try {
                                    a.sending && (a.sending = !1, k = 0, c());
                                } catch (b) {
                                }
                            };
                        }
                        function c(a, b) {
                            if (a) {
                                var c = {
                                    qs: a,
                                    jsd: b
                                };
                                if (0 === a.indexOf('e=21&')) {
                                    e(c, !0);
                                    return;
                                }
                                l.push(c);
                            }
                            0 === k && 0 < l.length && (k++, c = l.shift(), c.sending = !0, c.uid = f.Math.floor(10000000000 * f.Math.random()), c.timeoutId = setTimeout(g(c), 2000), x[c.uid] = c, e(c));
                        }
                        function b() {
                            try {
                                return new t(1, 1);
                            } catch (a) {
                                var b = window.document.createElement('img');
                                b.height = 1;
                                b.width = 1;
                                return b;
                            }
                        }
                        function e(a, c) {
                            var d = b();
                            d.toSend = a;
                            c || (d.onerror = function () {
                                var a = this.toSend;
                                a.failedAttempts = 'number' == typeof a.failedAttempts ? a.failedAttempts + 1 : 0;
                                var b = (a.jsd + '/pixel.gif?' + a.qs).length;
                                1 > a.failedAttempts ? e(a) : m && b > r && h(a);
                            }, d.onload = function () {
                                h(this.toSend);
                            });
                            d.src = a.jsd + '/pixel.gif?' + a.qs;
                        }
                        function h(a) {
                            var b = a && a.uid && x && x[a.uid];
                            if (a && a.qs && 'tracer=' == a.qs)
                                return !1;
                            if (b) {
                                x[a.uid] = null;
                                try {
                                    delete x[a.uid];
                                } catch (d) {
                                }
                                try {
                                    clearTimeout(b.timeoutId);
                                } catch (d) {
                                }
                                if ('boolean' != typeof b.sending || b.sending)
                                    b.sending = !1;
                                else
                                    return !1;
                            }
                            0 < k && k--;
                            c();
                        }
                        var l = [], k = 0, t, q = f[a], y = f.Math.floor(10000000000 * f.Math.random()), x = {};
                        q.yh = {};
                        q = q.yh;
                        t = f.Image;
                        q.yi = function (a, b) {
                            c(a, b);
                        };
                        q.xq = function () {
                            return y;
                        };
                        var n, m, r = 2083;
                        try {
                            n = document.createElement('div'), n.innerHTML = '<!--[if IE 8]>x<![endif]-->', m = 'x' === n.innerHTML;
                        } catch (u) {
                            m = !1;
                        }
                    }
                    a.au = {};
                    a.au.a = function (d) {
                        try {
                            if (r.yh)
                                return;
                        } catch (f) {
                        }
                        a.a.dj(k, '\'' + a.c.aw + '\',window', d);
                    };
                }(u));
                (function (a) {
                    a.av = {};
                    a.av.a = function (k, d) {
                        var f = !0;
                        d && a.c.dt(k, !0) || (f = !1);
                        if (f) {
                            f = !0;
                            d && d.getCareAboutFocus && (f = d.getCareAboutFocus());
                            var g = a.ac.a(k), f = (!f || a.ac.e(k)) && !g;
                        }
                        return f;
                    };
                    a.av.b = function (k) {
                        this.label = k;
                        this.metrics = {};
                        this.hasTickUpdateMetrics = !1;
                        this.set = function (a, f, g) {
                            this.metrics[a] = this.metrics[a] || {};
                            this.metrics[a].value = f || 0;
                            g && (this.hasTickUpdateMetrics || (this.hasTickUpdateMetrics = !0), this.metrics[a].incrementValue = g.incrementValue || 'delta', this.metrics[a].ignoreStateCheck = g.ignoreStateCheck || !1, this.metrics[a].shouldIncrementFn = g.shouldIncrementFn, this.metrics[a].postIncrementationFn = g.postIncrementationFn || !1, this.metrics[a].ignoreOmidCheck = g.ignoreOmidCheck || !1, g.useDeltaCompensation && (this.metrics[a].useDeltaCompensation = !0, this.metrics[a].incrementedLastTick = !1));
                            return this.metrics[a].value;
                        };
                        this.increment = function (a, f, g, c, b) {
                            var e = !this.metrics[a] || 'number' !== typeof this.metrics[a].value;
                            try {
                                if (c.debugData && e && 'publicis_counter' == this.label) {
                                    var h;
                                    this.metrics[a] ? this.metrics[a].value && (h = this.metrics[a].value) : h = 'NONE';
                                    var l = [
                                        f,
                                        h,
                                        b
                                    ].join('-');
                                    c.debugData.cache.push(l);
                                }
                            } catch (k) {
                            }
                            f = e ? this.set(a, f) : this.metrics[a].value += f;
                            'number' === typeof g && (f = this.cap(a, f));
                            return f;
                        };
                        this.cap = function (a, f) {
                            return this.set(a, w.min(this.get(a), f));
                        };
                        this.max = function (a, f) {
                            return this.set(a, w.max(this.get(a), f));
                        };
                        this.get = function (d, f) {
                            if (!a.d.c() || 'visOnLastCheck' === d || this.metrics[d] && this.metrics[d].ignoreOmidCheck)
                                return 'undefined' === typeof this.metrics[d] ? this.set(d, 'undefined' !== typeof f ? f : 0) : this.metrics[d].value;
                        };
                        this.update = function (d, f, g) {
                            if (d && this.hasTickUpdateMetrics) {
                                g = a.w.k(d.zr, !0);
                                var c = a.av.a(d, g), b;
                                for (b in this.metrics)
                                    if (a.a.cy(this.metrics, b)) {
                                        var e = this.metrics[b];
                                        if (e.shouldIncrementFn) {
                                            var h = (c || !0 === e.ignoreStateCheck) && e.shouldIncrementFn(d, g);
                                            e.useDeltaCompensation ? (h && e.incrementedLastTick ? this.increment(b, f, void 0, d, 1) : (h || e.incrementedLastTick) && this.increment(b, w.round(f / 2), void 0, d, 2), e.incrementedLastTick = h) : h && ('delta' === e.incrementValue ? this.increment(b, f, void 0, d, 3) : 'addReturnValue' === e.incrementValue ? this.increment(b, h, void 0, d, 4) : 'setReturnValue' === e.incrementValue && this.set(b, h));
                                            'function' === typeof e.postIncrementationFn && e.postIncrementationFn(h);
                                        }
                                    }
                            }
                        };
                    };
                    a.av.c = function (k, d) {
                        if (!k)
                            return !1;
                        var f;
                        k[d] ? f = k[d] : (f = new a.av.b(d), k[d] = f);
                        return f;
                    };
                    a.av.d = function (k, d, f) {
                        if (!d)
                            return !1;
                        d = a.av.c(d, f);
                        k.secondaryCounters = k.secondaryCounters || [];
                        k.secondaryCounters.push(d);
                        return d;
                    };
                }(u));
                (function (a) {
                    function k(d, c, b) {
                        this.name = d;
                        this.reachedInViewTimeThreshold = !1;
                        this.alwaysInview = !0;
                        this.queryStringKey = b.queryStringKey;
                        this.timeThreshold = b.timeThreshold || 1000;
                        this.rawPercThreshold = b.percThreshold / 100 || 50;
                        this.percThreshold = w.min(b.percThreshold / 100, 0.98);
                        this.continuous = b.continuous || !1;
                        this.timePercent = b.timePercent;
                        this.capTimeThreshold = b.capTimeThreshold;
                        this.audible = b.audible || !1;
                        this.video = b.video || !1;
                        this.fullscreen = b.fullscreen || !1;
                        'undefined' !== this.timeThreshold && (this.timeThreshold = w.max(this.timeThreshold, 1));
                        this.counterState = {};
                        d = a.av.c(this.counterState, 'customInViewCounter');
                        d.set('inViewTime', 0);
                        d.set('continuousInViewTime', 0);
                        d.set('maxContinuousInViewTime', 0);
                        d.set('visOnLastCheck', !1);
                        d.set('_tLastChecked', new A().getTime());
                    }
                    a.at = {};
                    var d = {}, f = {};
                    a.at.b = function (a, c, b) {
                        var e = c.zr;
                        d[e] || (d[e] = {});
                        if (d[e].hasOwnProperty(a) || void 0 == b.percThreshold && void 0 == b.fullscreen || void 0 == b.timeThreshold && void 0 == b.timePercent)
                            return !1;
                        b = new k(a, c, b);
                        return d[c.zr][a] = b;
                    };
                    a.at.c = function (g, c) {
                        return !a.d.c() && d[c] && d[c].hasOwnProperty(g) ? d[c][g] : !1;
                    };
                    a.at.d = function (g) {
                        if (!d[g])
                            return !0;
                        var c = !0;
                        a.a.forEach(d[g], function (a) {
                            if (!a.reachedInViewTimeThreshold)
                                return c = !1;
                        });
                        return c;
                    };
                    k.prototype.update = function (d, c, b) {
                        if (d && this.isMeasurable(d) && !this.reachedInViewTimeThreshold) {
                            var e, h = a.av.c(this.counterState, 'customInViewCounter'), f = a.w.k(d.zr, !0);
                            if (f) {
                                var k = f.getLastInviewPercent();
                                e = (e = f.getFullyInViewThreshold()) && 'number' === typeof e ? w.min(this.percThreshold, e) : this.percThreshold;
                                h.get('_tLastChecked');
                                h.set('_tLastChecked', b);
                                b = !0;
                                f.getCareAboutFocus && (b = f.getCareAboutFocus());
                                d = f.getPauseCheckingFn ? f.getPauseCheckingFn()(d) : a.ac.a(d);
                                k = k >= e;
                                f = !b || a.focus.pageIsVisible();
                                a.at.e && 'function' === typeof a.at.e && (k = a.at.e(k));
                                a.at.f && 'function' === typeof a.at.f && (f = a.at.f(f));
                                k = k && f && !d;
                                d = h.get('visOnLastCheck');
                                if (k && d)
                                    h.increment('inViewTime', c), h.increment('continuousInViewTime', c);
                                else if (k || d)
                                    c = w.round(c / 2), h.increment('inViewTime', c), h.increment('continuousInViewTime', c);
                                k || (this.alwaysInview = !1);
                                h.set('visOnLastCheck', k);
                                h.get('continuousInViewTime') > h.get('maxContinuousInViewTime') && h.set('maxContinuousInViewTime', h.get('continuousInViewTime'));
                                k || h.set('continuousInViewTime', 0);
                                this.inViewTimeReached() && (this.reachedInViewTimeThreshold = !0);
                            }
                        }
                    };
                    k.prototype.getInViewTime = function () {
                        var d = a.av.c(this.counterState, 'customInViewCounter');
                        return this.continuous ? d.get('maxContinuousInViewTime') : d.get('inViewTime');
                    };
                    k.prototype.inViewTimeReached = function () {
                        return 'undefined' !== this.timeThreshold && this.getInViewTime() >= this.timeThreshold;
                    };
                    k.prototype.isMeasurable = function (d) {
                        if (!d)
                            return !1;
                        var c = !1;
                        'undefined' !== this.timeThreshold && ('pscope' == a.w.b(d.zr, !0) && d.custominview.periscopeThresholds ? a.a.ax(d.custominview.periscopeThresholds, this.rawPercThreshold) && a.c.dt(d) && (c = !0) : a.c.dt(d, !0) && (c = !0));
                        return c;
                    };
                    a.at.g = function (d) {
                        if (d && d.isMeasurabilityDisabled())
                            return !1;
                        a.at.b('full_vis_2_sec_continuous', d, {
                            percThreshold: 100,
                            timeThreshold: 2000,
                            video: !1,
                            continuous: !0,
                            queryStringKey: 'wb'
                        });
                    };
                    a.at.h = function (d) {
                        a.at.g(d);
                        d.custominview = {};
                        d.custominview.eventIds = {};
                        d.custominview.eventIds.viewCounterStarted = a.k.a.azsx('viewCounterStarted', a.at.i);
                        d.custominview.eventIds['periscope:onStateChange'] = a.k.a.azsx('periscope:onStateChange', a.at.i, { priority: 5 });
                        d.custominview.eventIds.adKilled = a.k.a.azsx('adKilled', a.at.j);
                        a.at.i(d);
                    };
                    a.at.i = function (d) {
                        void 0 !== d && (isNaN(d) || (d = B[d]), d && d.custominview && d.custominview.eventIds && a.c.dt(d, !0) && !d.custominview.eventIds['view:tick'] && (d.custominview.eventIds['view:tick'] = a.k.a.azsx('view:tick', a.a.df([d], a.at.k), { priority: 6 })));
                    };
                    a.at.k = function (f, c, b) {
                        var e = f.zr;
                        if (!d[e] || f && f.isMeasurabilityDisabled())
                            return !1;
                        a.a.forEach(d[e], function (a) {
                            a.update(f, c, b);
                        });
                    };
                    a.at.j = function (d) {
                        d && d.custominview && d.custominview.eventIds && (a.k.a.sxaz('view:tick', {
                            id: d.custominview.eventIds['view:tick'],
                            priority: 6
                        }), a.k.a.sxaz('viewCounterStarted', { id: d.custominview.eventIds.viewCounterStarted }), a.k.a.sxaz('periscope:onStateChange', { id: d.custominview.eventIds['periscope:onStateChange'] }), a.k.a.sxaz('adKilled', { id: d.custominview.eventIds.adKilled }), a.k.a.sxaz('video:AdVideoComplete', { id: d.custominview.eventIds['video:AdVideoComplete'] }));
                    };
                    a.at.l = function () {
                        a.k.a.sxaz('startAdTracking', { id: f.startAdTracking });
                        a.k.a.sxaz('allLocalAdsKilled', { id: f.allLocalAdsKilled });
                    };
                    a.at.a = function (f, c) {
                        if (f)
                            return a.a.forEach(d[f.zr], function (b) {
                                'custom_inview_module_counter' === b.name ? (c.wm = 0, c.wi = 0, !a.d.c() && b.isMeasurable(f) && (c.wm = 1, b.inViewTimeReached() && (c.wi = 1))) : void 0 != b.queryStringKey && (c[b.queryStringKey] = 0, !a.d.c() && b.isMeasurable(f) && (c[b.queryStringKey] = 1, b.inViewTimeReached() && (c[b.queryStringKey] = 2)));
                            }), c;
                    };
                    a.at.m = function (f) {
                        if (!f)
                            return !1;
                        var c = !1;
                        f = f.zr;
                        if (!d[f])
                            return !1;
                        a.a.forEach(d[f], function (a) {
                            'custom_inview_module_counter' === a.name && (c = a.reachedInViewTimeThreshold);
                        });
                        return c;
                    };
                    f.startAdTracking = a.k.a.azsx('startAdTracking', a.at.h);
                }(u));
                (function (a) {
                    a.ak = {};
                    a.ak.b = w.floor(100000000 * w.random());
                    a.ak.a = function (k, d, f, g) {
                        if (r && (d && (d += '_' + a.ak.b), !r.jsonp || !r.jsonp[k])) {
                            r.jsonp = r.jsonp || {};
                            r.jsonp[k] = r.jsonp[k] || { cachedResponse: !1 };
                            var c = r.xb || window, b = c.document;
                            c[d] = function (a) {
                                var b;
                                try {
                                    b = JSON.parse(a);
                                } catch (e) {
                                    b = a;
                                }
                                r.jsonp[k].cachedResponse = b;
                                r.swde.zaxs(k + 'JsonpReady', b);
                                c[d] = null;
                            };
                            var e = function (b) {
                                b = k + ' JSONP request handling failed' + (b ? b : '');
                                try {
                                    var c = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf), d = c ? '' : document.referrer, e = 'undefined' !== typeof a && a.c && a.c.n ? a.c.n : '', h = 'https://px.moatads.com/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape('REUTERS_HEADER1') + '&ac=1&k=' + escape(b) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(e) + '&j=' + escape(d) + '&cs=' + new A().getTime();
                                    c ? omidNative.sendUrl(h) : new Image(1, 1).src = h;
                                } catch (f) {
                                }
                            };
                            try {
                                var h = a.c.bd(), l = function () {
                                        'undefined' === typeof g && (g = 'callback');
                                        var c = [
                                                f,
                                                '&',
                                                g,
                                                '=',
                                                d
                                            ].join(''), e = b.createElement('script'), h = b.body || b.getElementsByTagName('head')[0] || b.getElementsByTagName('script')[0];
                                        a.a.cn(c, h, e);
                                    };
                                'undefined' !== typeof h ? 'function' === typeof h.downloadJavaScriptResource && h.downloadJavaScriptResource(f, c[d], e) : l();
                            } catch (p) {
                                e(p);
                            }
                        }
                    };
                    a.ak.c = function (k, d) {
                        r.jsonp && r.jsonp[k] && r.jsonp[k].cachedResponse ? a.a.df([r.jsonp[k].cachedResponse], d)() : r.swde.azsx(k + 'JsonpReady', d, { once: !0 });
                    };
                    a.ak.d = function () {
                        var k = {}, d;
                        return function (f, g, c) {
                            k[f] ? a.ak.c(f, g || function () {
                            }) : ('string' === typeof c ? d = c : 'object' === typeof c && (d = a.ak.e(c, f)), a.ak.a(f, f + 'callback', d), g && a.ak.c(f, g), k[f] = !0);
                        };
                    }();
                    a.ak.e = function (k, d) {
                        var f;
                        a:
                            switch (d) {
                            case 'BrandSafetyNados':
                                f = '/s/v2';
                                break a;
                            case 'OneTagNados':
                                f = '/ot/v1';
                                break a;
                            default:
                                f = '';
                            }
                        var g = ['url=' + encodeURIComponent(a.c.ba)];
                        a.a.forEach(k, function (b, c) {
                            var d = c + '=' + b;
                            a.a.ax(g, d) || g.push(d);
                        });
                        var c = g.join('&'), c = c + ('&ord=' + a.c.bj + '&jv=' + a.a.cv(a.c.bj + c));
                        return 'https://mb.moatads.com' + f + '?' + c;
                    };
                }(u));
                (function (a) {
                    function k(b, d, h) {
                        var f = a.aa.h[b].stateMask;
                        if (d = c[d] * (h ? 16 : 1))
                            a.aa.h[b].stateMask = f | d << 0;
                    }
                    function d(b, c, d, f) {
                        d = a.a.dr(b.x, c.x, d);
                        b = a.a.dr(b.y, c.y, f);
                        return d && b;
                    }
                    function f(b, c) {
                        a.aa && a.aa.h[b] && (a.aa.h[b].allEdgesSeen = !0, a.a.forEach(a.aa.h[b].mediatorIds, function (b, c) {
                            a.k.a.sxaz(c, { id: b });
                        }), c && (a.aa.h[b].failsafe = !0), a.k.a.zaxs('passthrough'));
                    }
                    var g = {};
                    a.aa = {};
                    a.aa.i = 242500;
                    a.aa.j = 1;
                    a.aa.h = {};
                    var c = {
                        topLeft: 8,
                        topRight: 4,
                        bottomLeft: 2,
                        bottomRight: 1
                    };
                    a.aa.k = function (b) {
                        return !b || b && b.isMeasurabilityDisabled() || a.d.c() ? !1 : a.c.dl() || a.c.du() || void 0 || void 0;
                    };
                    a.aa.a = function (b) {
                        return 'number' !== typeof b || a.a.l() ? !1 : 236425 <= b;
                    };
                    a.aa.l = function (a) {
                        return a && a.ao ? 'slave' == a.ao.moatClientAT ? !0 : !1 : !1;
                    };
                    a.aa.m = function (a) {
                        return a && a.ao ? 'cpc' == a.ao.moatClientBT ? !0 : !1 : !1;
                    };
                    a.aa.n = function (a) {
                        return a && a.ao ? 'cpcv' == a.ao.moatClientBT ? !0 : !1 : !1;
                    };
                    a.aa.o = function (a) {
                        return a && a.ao ? 'flatrate' == a.ao.moatClientBT ? !0 : !1 : !1;
                    };
                    a.aa.p = function (a) {
                        return a && a.ao ? 'skin' == a.ao.moatClientAT || 'hpto' == a.ao.moatClientAT || 1 == a.ao.skin ? !0 : !1 : !1;
                    };
                    a.aa.f = function (b) {
                        if (!b || !b.aa)
                            return !1;
                        if ('undefined' != typeof b.er)
                            return b.er;
                        b.video ? !a.aa.k(b) || a.aa.n(b) && !b.video.reachedComplete || (b.er = !0) : a.aa.l(b) || a.aa.m(b) || a.aa.o(b) ? b.er = !1 : a.aa.p(b) || b.isCompositeAd || a.aa.a(a.a.cs(b)) ? b.er = !0 : a.aa.k(b) && a.w.s(b, a.aa.j, !0) && (b.er = !0);
                        return b.er || !1;
                    };
                    a.aa.b = function (b) {
                        if (!b || b.SENT_FIT && b.et || !a.aa.k(b))
                            return !1;
                        var c, d, f = a.w.b(b.zr);
                        b.SENT_FIT || (c = a.w.f(b, f, 'hadFIT'));
                        b.et || (d = a.w.f(b, f, 'hadFullOTS'));
                        if (c || d)
                            a.ac.b(b), b.SENT_FIT = b.SENT_FIT || !!c, b.et = b.et || !!d;
                        return c || d;
                    };
                    a.aa.q = function (b, c, h) {
                        var f;
                        a.a.forEach([
                            null,
                            void 0,
                            !1
                        ], function (a) {
                            if (f = c === a || h === a)
                                return !1;
                        });
                        if (!0 === f || !0 !== (a.a.db(c.top) && a.a.db(c.bottom) && a.a.db(h.bottom) && a.a.db(h.top)) || c.top === c.bottom || c.left === c.right || h.top === h.bottom || h.left === h.right)
                            return !1;
                        var g = c.right - c.left, k = c.bottom - c.top, q = g * (1 - 0.98), y = k * (1 - 0.98), x = {
                                x: c.left,
                                y: c.top
                            }, n = {
                                x: c.right,
                                y: c.top
                            }, m = {
                                x: c.left,
                                y: c.bottom
                            }, r = {
                                x: c.right,
                                y: c.bottom
                            }, u = c.left + q, A = c.top + y, C = c.right - q, z = c.top + y, B = c.left + q, E = c.bottom - y, q = c.right - q, y = c.bottom - y, D = {
                                x: h.left,
                                y: h.top
                            }, v = {
                                x: h.right,
                                y: h.top
                            }, H = {
                                x: h.left,
                                y: h.bottom
                            }, F = {
                                x: h.right,
                                y: h.bottom
                            }, g = w.ceil(0.01 * g), k = w.ceil(0.01 * k), x = d(x, D, g, k), n = d(n, v, g, k), m = d(m, H, g, k), r = d(r, F, g, k);
                        a.aa.r(b, {
                            topLeft: x,
                            topRight: n,
                            bottomLeft: m,
                            bottomRight: r
                        }, {
                            topLeft: u >= h.left && A >= h.top,
                            topRight: C <= h.right && z >= h.top,
                            bottomLeft: B >= h.left && E <= h.bottom,
                            bottomRight: q <= h.right && y <= h.bottom
                        });
                    };
                    a.aa.s = function (b) {
                        if ('undefined' !== typeof b && 0 <= b && !a.aa.h[b]) {
                            a.aa.h[b] = {};
                            a.aa.h[b].allEdgesSeen = !1;
                            a.aa.h[b].mediatorIds = {};
                            a.aa.h[b].outer = {
                                topLeft: !1,
                                topRight: !1,
                                bottomLeft: !1,
                                bottomRight: !1
                            };
                            a.aa.h[b].inner = {
                                topLeft: !1,
                                topRight: !1,
                                bottomLeft: !1,
                                bottomRight: !1
                            };
                            a.aa.h[b].stateMask = 0;
                            var c = 'rectsAvailable', d = a.k.a.azsx(c, a.aa.q);
                            a.aa.h[b].mediatorIds[c] = d;
                            c = 'adEdgesViewStatus';
                            d = a.k.a.azsx(c, a.aa.r);
                            a.aa.h[b].mediatorIds[c] = d;
                            c = 'adFullyVisible';
                            d = a.k.a.azsx(c, f, {
                                condition: function (b, c) {
                                    return b && c && !a.aa.g(b.zr) && a.w && a.w.b && c === a.w.b(b.zr);
                                },
                                once: !0
                            });
                            a.aa.h[b].mediatorIds[c] = d;
                        }
                    };
                    a.aa.t = function (b) {
                        return a.aa.h[b].failsafe;
                    };
                    a.aa.r = function (b, c, d) {
                        function g(l, y, x) {
                            x && (a.a.forEach([
                                'topLeft',
                                'topRight',
                                'bottomLeft',
                                'bottomRight'
                            ], function (a) {
                                !p[a] && c[a] && (p[a] = !0, k(b, a, !0));
                                !t[a] && d[a] && (t[a] = !0, k(b, a, !1));
                            }), (p.topLeft && p.topRight && t.bottomLeft && t.bottomRight || t.topLeft && t.topRight && p.bottomLeft && p.bottomRight || p.topLeft && p.bottomLeft && t.topRight && t.bottomRight || t.topLeft && t.bottomLeft && p.topRight && p.bottomRight) && f(b));
                        }
                        if (!0 !== a.aa.h[b].allEdgesSeen) {
                            d && 'object' === typeof d || (d = c);
                            var p = a.aa.h[b].outer, t = a.aa.h[b].inner;
                            a.k.a.azsx('adCheckingState', g, {
                                once: !0,
                                condition: function (b, c) {
                                    return a.w.b(b.zr) === c;
                                }
                            });
                        }
                    };
                    a.aa.g = function (b) {
                        return 'undefined' !== typeof b && b in a.aa.h ? a.aa.h[b].allEdgesSeen : !1;
                    };
                    (function (a) {
                        function c(a, b) {
                            return function (c) {
                                var d = a.maxContinuouslyInViewTime, e = b.get('currentContinuouslyInViewTime');
                                e > d && (a.maxContinuouslyInViewTime = e, a.checkMilestoneReached());
                                c || b.set('currentContinuouslyInViewTime', 0);
                            };
                        }
                        function d() {
                            return !1;
                        }
                        function f(c) {
                            var d = c.fixedInViewTimeRequirement;
                            this.percvRequired = c.percvRequired;
                            this.shouldConsiderLargeAds = a.a.db(c.largeAdSize);
                            this.largeAdSize = c.largeAdSize;
                            this.largePercvRequired = c.largePercvRequired;
                            this.requiresPassthrough = c.requiresPassthrough;
                            this.qsKey = c.qsKey;
                            c.percvRequiredPassthrough && (this.percvRequiredPassthrough = c.percvRequiredPassthrough);
                            this.getInViewTimeRequirement = function (a) {
                                return d;
                            };
                        }
                        function k(c, d) {
                            return a.a.l() ? d === a.aa.d.n ? a.aa.d.n.b : a.aa.e.m.b : d === a.aa.d.n ? a.aa.d.n.a : a.aa.e.m.a;
                        }
                        function t(d, f, h) {
                            this.label = h;
                            this.config = f;
                            this.groupmMilestoneReached = !1;
                            this.maxContinuouslyInViewTime = 0;
                            this.ad = d;
                            this.fullViewEventPixelFired = !1;
                            var k = this;
                            h = a.av.d(d, a.aa.u, 'groupm_counter_' + d.yg + w.random());
                            var l = c(k, h);
                            if (f === a.aa.e.m.a || f === a.aa.e.m.b)
                                f = a.k.a.azsx('fullOtsReached', function () {
                                    k.groupmMilestoneReached = !0;
                                    k.milestoneFailsafeTriggered = !0;
                                }, {
                                    once: !0,
                                    condition: function (c, e) {
                                        var f = a.w.b(d.zr);
                                        return c.zr === d.zr && e === f;
                                    }
                                }), g[d.zr] = f;
                            this.checkMilestoneReached = function () {
                                var c;
                                c = k.maxContinuouslyInViewTime;
                                var d;
                                if (!0 === k.groupmMilestoneReached)
                                    return !0;
                                d = k.config.getInViewTimeRequirement();
                                c = k.config.requiresPassthrough(k.ad) ? a.aa.g(k.ad.zr) && c >= d : c >= d;
                                k.groupmMilestoneReached = c;
                                !k.fullViewEventPixelFired && c && (k.fullViewEventPixelFired = !0, k.ad.fireFullViewEvent = !0);
                                return k.groupmMilestoneReached;
                            };
                            h.set('currentContinuouslyInViewTime', 0, {
                                useDeltaCompensation: !0,
                                shouldIncrementFn: function (c, d) {
                                    var e, f;
                                    e = d.getLastInviewPercent();
                                    var h = k.config.percvRequired, g = k.config.largePercvRequired;
                                    f = a.a.cs(c);
                                    e = k.config.requiresPassthrough(k.ad) ? e >= k.config.percvRequiredPassthrough : (f = k.config.shouldConsiderLargeAds && f >= k.config.largeAdSize) ? e >= g : e >= h;
                                    return e;
                                },
                                postIncrementationFn: l
                            });
                        }
                        a.aa.u = {};
                        a.aa.d = {};
                        a.aa.d.b = 0.98;
                        a.aa.d.c = 237650;
                        a.aa.d.d = 0.5;
                        a.aa.d.e = a.aa.d.b;
                        a.aa.d.f = 1000;
                        a.aa.d.g = a.aa.d.f;
                        a.aa.d.h = 0.98;
                        a.aa.d.i = 294000;
                        a.aa.d.j = 0.8;
                        a.aa.d.k = 15000;
                        a.aa.d.l = 'im';
                        a.aa.d.m = 'hj';
                        a.aa.d.n = {};
                        a.aa.d.n.a = {};
                        a.aa.d.n.b = {};
                        var q = {
                            percvRequired: a.aa.d.b,
                            largeAdSize: a.aa.d.c,
                            largePercvRequired: a.aa.d.d,
                            requiresPassthrough: d,
                            fixedInViewTimeRequirement: a.aa.d.f,
                            viewTimeCap: !1,
                            qsKey: a.aa.d.l
                        };
                        a.aa.d.n.a = new f(q);
                        a.aa.d.n.b = a.aa.d.n.a;
                        a.aa.e = {};
                        a.aa.e.b = 0.98;
                        a.aa.e.c = 237650;
                        a.aa.e.d = 0.5;
                        a.aa.e.e = 0.98;
                        a.aa.e.f = 0.0001;
                        a.aa.e.g = 1000;
                        a.aa.e.h = 1000;
                        a.aa.e.i = 0.98;
                        a.aa.e.j = 294000;
                        a.aa.e.k = 0.8;
                        a.aa.e.l = 15000;
                        a.aa.e.m = {};
                        a.aa.e.m.a = {};
                        a.aa.e.m.b = {};
                        a.aa.e.n = 'in';
                        a.aa.e.o = 'hj';
                        q = {
                            percvRequired: a.aa.e.b,
                            largeAdSize: a.aa.e.c,
                            largePercvRequired: a.aa.e.d,
                            requiresPassthrough: d,
                            fixedInViewTimeRequirement: a.aa.e.g,
                            viewTimeCap: !1,
                            qsKey: a.aa.e.n
                        };
                        a.aa.e.m.a = new f(q);
                        q = {
                            percvRequired: a.aa.e.e,
                            percvRequiredPassthrough: a.aa.e.f,
                            largeAdSize: !1,
                            largePercvRequired: !1,
                            requiresPassthrough: function (c) {
                                var d;
                                d = a.c.r(a.c.e);
                                var e = c.currentWidth || 0, f = c.currentHeight || 0;
                                a.c.dc ? (c = a.c.w, d = a.c.x) : (c = d.width || 0, d = d.height || 0);
                                return c && d ? f > d || e > c : !1;
                            },
                            fixedInViewTimeRequirement: a.aa.e.h,
                            viewTimeCap: !1,
                            qsKey: a.aa.e.n
                        };
                        a.aa.e.m.b = new f(q);
                        a.aa.d.a = function (c) {
                            var d = k(c, a.aa.d.n);
                            if (!1 !== d)
                                return a.aa.s(c.zr), c.groupmV2 = c.groupmV2 || new t(c, d, 'GroupM V2'), c.groupmV2;
                        };
                        a.aa.e.a = function (c) {
                            var d = k(c, a.aa.e.m);
                            if (!1 !== d)
                                return a.aa.s(c.zr), c.groupmV3 = c.groupmV3 || new t(c, d, 'GroupM V3'), c.groupmV3;
                        };
                        a.aa.c = function (a, b) {
                            b = b || {};
                            var c = B[a];
                            if ('object' !== typeof c)
                                return b;
                            if ('object' === typeof c.groupmV2) {
                                var d = c.groupmV2.config.qsKey;
                                b[d] = c.groupmV2.checkMilestoneReached() ? 1 : 0;
                            }
                            'object' === typeof c.groupmV3 && (d = c.groupmV3.config.qsKey, b[d] = c.groupmV3.checkMilestoneReached() ? 1 : 0);
                            return b;
                        };
                    }(a));
                    a.k.a.azsx('adKilled', function (b) {
                        if (b && !b.ep && (g.hasOwnProperty(b.zr) && a.k.a.sxaz('fullOtsReached', { id: g[b.zr] }), a.aa && a.aa.u && 'object' === typeof a.aa.u))
                            for (var c in a.aa.u)
                                a.aa.u.hasOwnProperty(c) && -1 < a.a.indexOf(c, 'groupm_counter_' + b.yg) && delete a.aa.u[c];
                    });
                }(u));
                (function (a) {
                    function k(c, b) {
                        return function (b, d) {
                            var f, g = {
                                    large: c.config.LARGE_SIZE_REQ,
                                    normal: c.config.NORMAL_SIZE_REQ
                                }, k = d.getLastInviewPercent();
                            f = (f = a.a.cs(b) >= c.config.LARGE_AD_THRESHOLD) && k >= g.large || !f && k >= g.normal;
                            return c.fullyVisOnLastCheck = f;
                        };
                    }
                    function d(c, b) {
                        return function (d) {
                            var f = c.maxContinuouslyInViewTime, g = b.get('currentContinuouslyInViewTime');
                            g > f && (c.maxContinuouslyInViewTime = g, f = g >= c.config.TIME_THRESHOLD, a.c.dt(c.ad, !0) && !c.fullViewEventPixelFired && f && (c.fullViewEventPixelFired = !0, b.set('currentContinuouslyInViewTime', 0, {}), c.ad.fireFullViewEvent = !0));
                            d || b.set('currentContinuouslyInViewTime', 0);
                        };
                    }
                    function f(c, b) {
                        this.ad = c;
                        this.label = b;
                        this.counters = {};
                        this.config = g.config;
                        this.fullViewEventPixelFired = !1;
                        this.maxContinuouslyInViewTime = 0;
                        this.fullyVisOnLastCheck = !1;
                        var e = a.av.d(this.ad, this.counters, 'publicis_counter_' + c.yg + w.random()), f = k(this, e), l = d(this, e);
                        e.set('currentContinuouslyInViewTime', 0, {
                            ignoreOmidCheck: !0,
                            useDeltaCompensation: !0,
                            shouldIncrementFn: f,
                            postIncrementationFn: l
                        });
                    }
                    a.ae = {};
                    var g = {
                        v1: {},
                        config: {}
                    };
                    g.v1.display = {};
                    g.v1.display.LARGE_AD_THRESHOLD = 237650;
                    g.v1.display.NORMAL_SIZE_REQ = 0.98;
                    g.v1.display.LARGE_SIZE_REQ = 0.3;
                    g.v1.display.TIME_THRESHOLD = 1000;
                    g.v1.video = {};
                    g.v1.video.LARGE_AD_THRESHOLD = 237650;
                    g.v1.video.NORMAL_SIZE_REQ = 0.98;
                    g.v1.video.LARGE_SIZE_REQ = 0.5;
                    g.v1.video.TIME_THRESHOLD = 2000;
                    g.v1.display.VIEWABLE_KEY = 'pd';
                    g.v1.video.VIEWABLE_KEY = 'pv';
                    g.config = g.v1.display;
                    a.ae.b = function (a) {
                        a.publicis = a.publicis || new f(a, 'Publicis V1');
                        return a.publicis;
                    };
                    a.ae.a = function (a, b) {
                        b = b || {};
                        var d = B[a];
                        if ('object' !== typeof d)
                            return b;
                        d = d.publicis;
                        'object' === typeof d && (b[d.config.VIEWABLE_KEY] = d.fullViewEventPixelFired ? 1 : 0);
                        return b;
                    };
                    a.k.a.azsx('adKilled', function (c) {
                        if (c && !c.ep && c.publicis && c.publicis.counters && 'object' === typeof c.publicis.counters)
                            for (var b in c.publicis.counters)
                                c.publicis.counters.hasOwnProperty(b) && -1 < a.a.indexOf(b, 'publicis_counter_' + c.yg) && delete c.publicis.counters[b];
                    });
                }(u));
                (function (a) {
                    function k(c, b) {
                        var d = c.getFormat(), f;
                        f = a.a.dx({ all: 30 }, d);
                        a.a.db(f) || (a.a.db(30), f = 30);
                        if (a.f.aj(b))
                            return c.refreshDecision = 1, !1;
                        c.auto = {};
                        var k = c.ao;
                        g([{
                                rate: 30000,
                                max: 25,
                                whitelist: [
                                    {
                                        lookup: 'type',
                                        values: 'leaderboard leaderboardcenter leaderboardlow mpu mpulow flex mpu2 mpu3 mpu4 MPUPlus mobile_hp_mpu bi_content'.split(' ')
                                    },
                                    {
                                        lookup: 'zMoatAdUnit1',
                                        values: [
                                            'jp.reuters',
                                            'cn.reuters'
                                        ]
                                    }
                                ]
                            }], k);
                        a.a.dz(k);
                        k = a.ao.d;
                        a.ao.i && (k = a.ao.i);
                        var p;
                        a.a.db(k) && 0 < k ? p = !0 : (a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Custom max refresh key is less than or equal to zero, or NaN; not enabling refresh'), c && (c.refreshDecision = 6), p = !1);
                        if (!p)
                            return !1;
                        c && c.DfpSlot ? p = !0 : (c && (c.refreshDecision = 7), p = !1);
                        if (!p)
                            return !1;
                        p = a.an.f(c.DfpSlot);
                        var t;
                        p && 'object' === typeof p ? t = !0 : (c && (c.refreshDecision = 8), t = !1);
                        if (!t)
                            return !1;
                        t = p.id;
                        p.getAttribute('width');
                        p.getAttribute('height');
                        a.an.d(c.DfpSlot);
                        a.an.h(c.DfpSlot);
                        r.auto_refresh = r.auto_refresh || {};
                        r.auto_refresh[t] = r.auto_refresh[t] || {
                            isBlacklisted: !1,
                            lastRefreshedByMoat: !1,
                            refreshCount: 0
                        };
                        !0 === r.auto_refresh[t].lastRefreshedByMoat && (c.moatAutoRefreshed = 1, r.auto_refresh[t].lastRefreshedByMoat = !1);
                        t && r.auto_refresh[t].refreshCount < k ? k = !0 : (a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Reached max refresh limit for ' + t + ', disabling refresh'), c && (c.refreshDecision = 9), k = !1);
                        if (!k)
                            return !1;
                        if (!a.ao.j(c))
                            return r.auto_refresh[t].isBlacklisted = !0, !1;
                        k = 'Moat Inventory Intelligence:';
                        a.ao && a.ao.c && window.console && window.console.log && window.console.log(k, 'Adding listener to ad slot ' + t);
                        k = 'Moat Inventory Intelligence:';
                        a.ao && a.ao.c && window.console && window.console.log && window.console.log(k, p);
                        f = a.ao.h ? a.ao.h : 1000 * f;
                        try {
                            a.ao.k(c.zr, 'inview', f), a.a.du({}, d) || (c.auto.mouseEvtId = a.k.a.azsx('mouseEventOnAd', a.a.df([c], a.ao.l))), c.refreshDecision = 0;
                        } catch (q) {
                            c && (c.refreshDecision = 20);
                        }
                    }
                    a.ao = {};
                    a.ao.c = !1;
                    a.ao.c = '1' === a.a.aq(a.c.ba, 'moat_log');
                    a.ao.d = 5;
                    a.ao.e = 5000;
                    var d = {}, f = {
                            inview: function (c, b) {
                                return a.w.i(c, b, !0);
                            },
                            fullInview: function (c, b) {
                                return a.w.s(c, b, !0);
                            },
                            activeInview: function (c, b) {
                                if (!a.c.c || !c.activetime)
                                    return !1;
                                var d = a.w.b(c.zr);
                                return (d = a.av.c(c.activetime.counters, d)) && d.get('activeInviewTime') >= b;
                            }
                        }, g = function (c, b) {
                            a.ao.f = !1;
                            a.ao.g = !1;
                            c && a.a.f(c) && a.a.forEach(c, function (c) {
                                if (c.hasOwnProperty('blacklist')) {
                                    if (c = c.blacklist, a.a.ci(c) || a.a.dt(c, b))
                                        a.ao.g = !0;
                                } else if (c.hasOwnProperty('whitelist')) {
                                    var d = c.whitelist;
                                    if (a.a.ci(d) || a.a.dt(d, b))
                                        a.ao.f = !0, a.ao.h = c.rate, a.ao.i = c.max;
                                }
                            });
                        };
                    a.ao.j = function (c) {
                        var b = c.ao;
                        a.an.c(c.DfpSlot);
                        a.an.e(c.DfpSlot);
                        a.an.d(c.DfpSlot);
                        var d = a.an.f(c.DfpSlot).id;
                        c.getFormat();
                        if (1 === b.skin)
                            return c.refreshDecision = 10, !1;
                        var f = r && r.auto_refresh && r.auto_refresh[d] && r.auto_refresh[d].creativeId;
                        if (f && b.moatClientLevel4 && f === b.moatClientLevel4)
                            return a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Served same creative as last impression, disabling further refreshing for ' + d), c.wasDupeAutoCreative = !0, c.refreshDecision = 13, !1;
                        if (a.ao.g)
                            return c.refreshDecision = 14, !1;
                        if (!a.ao.f)
                            return c.refreshDecision = 15, !1;
                        b = {};
                        a.k.a.zaxs('adShouldRefresh', b, c, d);
                        if (!1 === b.canRefresh)
                            return !1;
                        c.refreshDecision = 0;
                        return !0;
                    };
                    a.ao.a = function (c) {
                        a.ak.c('data', function (b) {
                            b = a.a.df([
                                c,
                                b
                            ], k);
                            a.an.g(b);
                        });
                    };
                    a.ao.k = function (a, b, e) {
                        d.hasOwnProperty(a) || (d[a] = {});
                        d[a][b] = e;
                    };
                    a.ao.l = function (c) {
                        var b = new A().getTime();
                        return 1000 <= (c.auto.lastMouseTimestamp && b - c.auto.lastMouseTimestamp || 0) || !c.auto.hadRecentMouseEvent ? (c.auto.mouseCheckId && a.a.a(c.auto.mouseCheckId), c.auto.hadRecentMouseEvent = !0, c.auto.lastMouseTimestamp = b, b = a.ao.e, a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Mouse event! Disabling refresh for ' + b + ' milliseconds'), c.auto.mouseCheckId = a.l.f(a.a.df([c], a.ao.m), b), c.auto.mouseCheckId) : !1;
                    };
                    a.ao.m = function (c) {
                        c.auto.hadRecentMouseEvent = !1;
                        a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Mouse sleep time over, re-enabling refresh');
                    };
                    a.ao.n = function (c) {
                        if (c) {
                            var b = c.ao;
                            c.getFormat();
                            var d = a.an.f(c.DfpSlot);
                            if (d)
                                if (d.getAttribute('width'), d.getAttribute('height'), d = d.id, a.an.d(c.DfpSlot), a.an.h(c.DfpSlot), a.an.i(), d && c.DfpSlot) {
                                    if (!0 === r.auto_refresh[d].isBlacklisted)
                                        return c.refreshDecision = r.auto_refresh[d].refreshDecision || 14, !1;
                                    r.auto_refresh[d].refreshCount = 1 + r.auto_refresh[d].refreshCount;
                                    r.auto_refresh[d].lastRefreshedByMoat = !0;
                                    r.auto_refresh[d].creativeId = b.moatClientLevel4;
                                    r.auto_refresh[d].refreshDecision = c.refreshDecision;
                                    a.an.j(c.DfpSlot, 'mivr', r.auto_refresh[d].refreshCount);
                                    b = c.DfpSlot;
                                    a.ao && a.ao.c && window.console && window.console.log && window.console.log('Moat Inventory Intelligence:', 'Refreshing slot for ' + b);
                                    a.an.k([b]);
                                    a.ac.g(c);
                                } else
                                    c.refreshDecision = 7;
                            else
                                c.refreshDecision = 8;
                        }
                    };
                    a.ao.b = function () {
                        for (var c in B)
                            if (B.hasOwnProperty(c)) {
                                var b = B[c];
                                if (!b.auto || !b.auto.hadRecentMouseEvent) {
                                    var e = d[c], h;
                                    for (h in e)
                                        if (e.hasOwnProperty(h) && f[h](b, e[h])) {
                                            try {
                                                a.ao.n(b);
                                            } catch (g) {
                                            }
                                            delete e[h];
                                            a.k.a.sxaz('mouseEventOnAd', { id: b.auto.mouseEvtId });
                                        }
                                }
                            }
                    };
                    a.ao.o = function () {
                        var c = {}, b = a.an.a();
                        if (!b)
                            return !1;
                        a.a.forEach(b, function (a) {
                            (a = (a = a.getResponseInformation()) && a.lineItemId) && (c[a] = 1 + (c[a] || 0));
                        });
                        return c;
                    };
                    a.k.a.azsx('adKilled', function (c) {
                        c && !c.ep && c.auto && c.auto.mouseEvtId && a.k.a.sxaz('mouseEventOnAd', { id: c.auto.mouseEvtId });
                    });
                }(u));
                (function (a) {
                    function k(d) {
                        if (d.version == a.aw.a)
                            return !0;
                        var c = a.aw.a + '-beta' === d.version, b = a.aw.a === d.version + '-beta';
                        if (('moatframe' === d.type || 'addThis' === d.type) && (c || b))
                            return !0;
                    }
                    a.aw = {};
                    a.aw.a = '1.2';
                    a.aw.prefix = 'MSFAPI';
                    a.aw.b = {};
                    a.aw.c = {};
                    var d = a.c.ax.a, f = a.c.az;
                    a.aw.d = /([a-z]+)#([a-z0-9.-]+)#([0-9]+)#([a-z0-9]+)#([0-9]+)#(.+)/i;
                    a.aw.e = /@([a-z0-9]+)@@(.*)/i;
                    a.aw.f = function (f) {
                        if (f) {
                            var c = a.aw.g(f);
                            c.listening || (r.dcsx && r.dcsx.ynds(f, 'message', 'message-' + d, 'ME-' + d), c.listening = !0, r.swde.azsx('allAdsKilled', function () {
                                a.aw.h(f);
                            }, { once: !0 }));
                            r.swde.azsx('message-' + d, a.aw.i);
                            a.k.a.azsx('view:tick', function () {
                                r.dcsx && !c.listening && (r.dcsx.ynds(f, 'message', 'message-' + d, 'ME-' + d), c.listening = !0);
                            });
                        }
                    };
                    a.aw.g = function (f) {
                        var c = 'Moat#PML#' + a.c.as + '#' + a.aw.a;
                        f[c] || (f[c] = {
                            id: d,
                            listening: !1
                        });
                        return f[c];
                    };
                    a.aw.h = function (f) {
                        var c = f && a.aw.g(f);
                        a.l.d(f, 'message', a.aw.i);
                        r.dcsx && r.dcsx.engn({ listenerName: 'ME-' + d });
                        r.swde.sxaz('message-' + d, { callback: a.aw.i });
                        c && (c.listening = !1);
                    };
                    a.aw.j = function (d) {
                        return a.aw.prefix + '#' + d + '#';
                    };
                    a.aw.k = function (d) {
                        var c = d.match(a.aw.d);
                        d = !1;
                        c && 7 == c.length && (d = {
                            prefix: c[1],
                            version: c[2],
                            uid: c[3],
                            type: c[4],
                            request: c[5],
                            data: c[6]
                        }, (c = d.data.match(a.aw.e)) && 3 == c.length && (d.cmd = c[1], d.arg = c[2]), d.version && -1 !== a.a.indexOf(d.version, '-beta') && (d.isBeta = !0));
                        return d;
                    };
                    a.aw.i = function (d) {
                        if (!(d && d.origin && d.data && 'string' === typeof d.data))
                            return !1;
                        var c = a.aw.k(d.data), b = c && c.uid == f.toString();
                        if (c && !b && k(c) && (d.msgData = c, c.request in a.aw.c && (d.triggerCallback = function () {
                                a.aw.c[c.request] && (a.aw.c[c.request](d), 'addThis' !== c.type && (a.aw.c[c.request] = null, delete a.aw.c[c.request]));
                            }), a.aw.b[c.type]))
                            for (var b = 0, e = a.aw.b[c.type].length; b < e; b++)
                                a.aw.b[c.type][b](d);
                    };
                    a.aw.l = function (d, c) {
                        a.aw.b[d] = [c];
                    };
                    a.aw.m = function (d, c, b, e) {
                        'object' == typeof c && (c = a.a.by(c));
                        e = e || w.floor(10000000000 * w.random());
                        'function' == typeof b && (a.aw.c[e] = b);
                        d = a.aw.j(a.aw.a) + f + '#' + d + '#' + e + '#' + c;
                        return {
                            request: e,
                            msg: d
                        };
                    };
                    a.aw.n = function (d, c, b, e, f) {
                        'object' == typeof b && (b = a.a.by(b));
                        return a.aw.m(d, '@' + c + '@@' + b, e, f);
                    };
                    a.aw.o = function (d, c, b) {
                        try {
                            if (!d || !d || !d.source)
                                return !1;
                            d.source.postMessage(a.aw.m(d.msgData.type, c, b, d.msgData.request).msg, '*');
                        } catch (e) {
                            return !1;
                        }
                        return !0;
                    };
                    a.aw.p = function (d, c, b) {
                        try {
                            var e = a.g.i(c || window.top);
                            if (!e)
                                return a.l.f(function () {
                                    a.aw.p(d, c, b);
                                }, 200);
                            for (var f = 0; f < e.length; f++)
                                b && e[f] == window || e[f].postMessage(d, '*');
                        } catch (k) {
                        }
                    };
                    a.k.a.azsx('modulesReady', a.a.df([window], a.aw.f), { once: !0 });
                    a.k.a.azsx('stopPostMessageListeners', a.a.df([window], a.aw.h), { once: !0 });
                }(u));
                (function (a) {
                    a.al = {};
                    a.al.b = {};
                    a.al.b.a = 'CF';
                    a.al.b.b = 'CNF';
                    a.al.b.c = 'CNS';
                    a.al.a = {};
                    a.al.a.b = !1;
                    a.al.a.c = [];
                    a.al.c = {};
                    a.al.d = {};
                    var k = !1;
                    a.al.a.a = function () {
                        var d = a.al.e();
                        a.al.a.b || a.c.c || (d = a.aw.n('moatframe', 'check', d, function (d) {
                            d = a.a.bz(d.msgData.data);
                            var g = 'string' === typeof a.c.g;
                            d && 'string' === typeof d.fullUrl && 'number' === typeof d.urlSrc && !g && a.a.ak(d.fullUrl) && !a.c.bb && (a.c.f(d.urlSrc), a.c.g = d.cleanUrl, a.c.eu = d.fullUrl, a.c.ba = d.fullUrl, a.c.bb = !0);
                            d && d.available && !a.al.a.b && (a.c.cb = !0, a.al.a.b = !0, d = 'MoatFrame#geom#' + new A().getTime(), a.l.g(a.al.a.d, null, 200, d), a.al.a.c.push(d), a.k.a.zaxs('Moatframe:Ready', d));
                        }), a.aw.p(d.msg, !1, !0));
                    };
                    a.al.f = function () {
                        a.aw.l('moatframe', a.al.g);
                        a.aw.l('addThis', a.al.g);
                        a.aw.p(a.aw.m('moatframe', 'ping').msg, !1, !0);
                    };
                    a.al.h = function (d) {
                        var f = a.al.a.e;
                        if (!f)
                            return !1;
                        var g = a.z.i(d.aa), c = a.z.n(g.rect, f.el, f.et), b = a.z.n(g.visibleRect, f.el, f.et), b = a.z.m(b, {
                                left: f.vl,
                                right: f.vr,
                                top: f.vt,
                                bottom: f.vb
                            }), g = (b.right - b.left) * (b.bottom - b.top) / g.area, e = !1;
                        f && 'number' === typeof f.pv && !isNaN(f.pv) && (a.a.dr(g, f.pv, 0.01) && 'sframe' === a.w.b(d.zr) && (e = !0), g = w.min(g, f.pv));
                        f.m || (e = !0);
                        e && a.k.a.zaxs('rectsAvailable', d.zr, c, b);
                        f && 'boolean' === typeof f.ia && (a.c.cc = f.ia);
                        f && 'number' === typeof f.m && !isNaN(f.m) && (a.c.cd = f.m);
                        return g;
                    };
                    a.al.i = function (d) {
                        return 'undefined' !== typeof d && a.al.d && a.al.d[d] ? (a.al.d[d] = null, !0) : !1;
                    };
                    a.al.j = function () {
                        var d = a.aw.m('moatframe', 'kill', null);
                        a.aw.p(d.msg, !1, !0);
                    };
                    a.al.e = function () {
                        var d = a.c.y, f = a.c.z;
                        return d && f ? {
                            width: d,
                            height: f
                        } : !1;
                    };
                    a.al.k = function () {
                        return a.c.c;
                    };
                    a.al.l = function (d) {
                        var f = !1;
                        a.a.forEach(a.al.b, function (a) {
                            if (a == d)
                                return f = !0, !1;
                        });
                        return f;
                    };
                    a.al.g = function (d) {
                        var f = d.msgData.cmd || d.msgData.data;
                        if (f)
                            if (d.triggerCallback)
                                d.triggerCallback(d);
                            else if (a.al.c[f])
                                a.al.c[f](d);
                            else
                                a.al.l(f) || a.aw.o(d, a.al.b.b);
                    };
                    a.al.m = function (d) {
                        var f = {}, g = d.msgData.arg && a.a.bz(d.msgData.arg);
                        if (a.al.n(window, d.source, d.msgData.uid, g) && a.al.k()) {
                            if (f.available = !0, a.c.bb && (g = a.c.ba) && a.c.bb && a.a.ak(g)) {
                                var c = a.c.et || a.a.am();
                                a.c.et = c;
                                f.cleanUrl = c;
                                f.fullUrl = g;
                                f.urlSrc = 1;
                            }
                        } else
                            f.available = !1;
                        a.aw.o(d, f);
                    };
                    a.al.o = function (d, f) {
                        if (!d || !f)
                            return !1;
                        for (var g = a.g.c(window).pop(), c = a.g.k(d, 10), b = !1, e = !1, h = null, k = null, p, t = c.length - 1; 0 <= t; t--)
                            if (c[t] == g && (b = !0), b && !a.g.j(c[t])) {
                                k = c[t];
                                break;
                            }
                        b && k && ((h = k && k.parent && k.parent.document) && (p = a.g.f(h, k)), p && (g = p.offsetWidth, c = p.offsetHeight, g == f.width && c == f.height ? e = !0 : (g *= c, c = f.width * f.height, e = 0.98 <= w.min(g, c) / w.max(g, c))));
                        return {
                            isNested: e,
                            iframe: p,
                            iframeParentDoc: h
                        };
                    };
                    a.al.p = function (d) {
                        return d && d.parent && a.g.f(d.parent.document, d);
                    };
                    a.al.q = function (d) {
                        (d = 'undefined' !== typeof d && a.al.d && a.al.d[d]) && 'boolean' == typeof d.isWithinReach && (d.isNested && !d.iframeParentDoc && (d.isWithinReach = !1), d.isNested || d.win && !a.g.d(d.win) || (d.isWithinReach = !1));
                        return d;
                    };
                    a.al.n = function (d, f, g, c) {
                        var b, e, h = {
                                isNested: !1,
                                iframe: null,
                                iframeParentDoc: null
                            };
                        if ((b = a.al.q(g)) && b.isWithinReach)
                            return !0;
                        e = a.g.m(d, f, !0);
                        b && 'undefined' == typeof b.isWithinReach ? b.isWithinReach = e : (e ? f = a.al.p(f) : (h = a.al.o(f, c), (f = h.iframe) && (e = !0)), b = {
                            dimensions: c,
                            iframe: f,
                            iframeParentDoc: h.iframeParentDoc,
                            isNested: h.isNested,
                            isWithinReach: e,
                            win: d
                        }, a.al.d[g] = b);
                        return b.isWithinReach;
                    };
                    a.al.r = function (a, f, g, c, b) {
                        if (!a || !f)
                            return !1;
                        a = {
                            w: a.width,
                            h: a.height,
                            el: a.left,
                            et: a.top,
                            er: a.right,
                            eb: a.bottom,
                            vl: f.left,
                            vt: f.top,
                            vr: f.right,
                            vb: f.bottom
                        };
                        'boolean' === typeof c && (a.ia = c);
                        'number' !== typeof g || isNaN(g) || (a.m = g);
                        'number' !== typeof b || isNaN(b) || (a.pv = 1 < b ? b / 100 : b);
                        return a;
                    };
                    a.al.s = function (d) {
                        return d ? (d = a.z.i(d)) ? a.al.r(d.cumulRect, d.visibleRect, 0, !1) : !1 : !1;
                    };
                    a.al.a.d = function () {
                        if (!k) {
                            k = !0;
                            var d = a.aw.m('moatframe', 'geom', function (d) {
                                k = !1;
                                a.al.l(d.msgData.data) || (a.al.a.e = a.a.bz(d.msgData.data));
                            });
                            a.aw.p(d.msg, !1, !0);
                        }
                    };
                    a.al.c.ping = function (d) {
                        d && d.source === window || a.a.ef() && d.msgData.isBeta || !a.c.c && a.c.di() && a.al.a.a();
                    };
                    a.al.c.check = function (d) {
                        if (!a.a.ee() || d.msgData.isBeta) {
                            var f = !0;
                            a.c.ce() && (f = !1);
                            f && a.al.m(d);
                        }
                    };
                    a.al.c.geom = function (d) {
                        if (!a.a.ee() || d.msgData.isBeta)
                            if (a.al.n(window, d.source, d.msgData.uid) && a.al.k()) {
                                var f = a.al.d && a.al.d[d.msgData.uid] && a.al.d[d.msgData.uid].iframe;
                                if (f && (f = a.al.s(f))) {
                                    a.aw.o(d, f);
                                    return;
                                }
                                a.aw.o(d, a.al.b.a);
                            } else
                                a.aw.o(d, a.al.b.c);
                    };
                    a.al.c.kill = function (d) {
                        a.al.i(d.msgData.uid);
                    };
                }(u));
                (function (a) {
                    a.as = {};
                    a.as.b = 5000;
                    a.as.c = function (k) {
                        if (!a.c.c)
                            return !1;
                        k.activetime = {};
                        k.activetime.counters = {};
                        a.as.d(k);
                        a.k.a.azsx('adKilled', a.as.e, {
                            condition: function (a) {
                                return k.zr == a.zr;
                            },
                            once: !0
                        });
                        a.as.f(k);
                    };
                    a.as.f = function (k) {
                        if (k.activetime) {
                            var d = a.w.o(k.zr);
                            if (k.activetime.onInViewTimeCount)
                                for (var f in d)
                                    d[f].removeListener && d[f].removeListener(k.activetime);
                            else
                                k.activetime.onInViewTimeCount = a.a.df([k], a.as.g);
                            (d = a.w.k(k.zr, !0)) && d.addListener(k.activetime);
                        }
                    };
                    a.as.d = function (k) {
                        k.activetime.mouseSubId = r.swde.azsx('mouseEvent', a.a.df([k], a.as.h));
                        k.activetime.mouseLocalSubId = a.k.a.azsx('mouseEvent', a.a.df([k], a.as.h));
                        k.activetime.keyboardSubId = r.swde.azsx('keyboardEvent', a.a.df([k], a.as.i));
                        k.activetime.focusSubId = r.swde.azsx('focusStateChange', a.a.df([k], a.as.j));
                    };
                    a.as.e = function (k) {
                        if (k.activetime && (r.swde.sxaz('mouseEvent', { id: k.activetime.mouseSubId }), a.k.a.sxaz('mouseEvent', { id: k.activetime.mouseLocalSubId }), r.swde.sxaz('keyboardEvent', { id: k.activetime.keyboardSubId }), r.swde.sxaz('focusStateChange', { id: k.activetime.focusSubId }), k.activetime && k.activetime.counters && 'object' === typeof k.activetime.counters))
                            for (var d in k.activetime.counters)
                                delete k.activetime.counters[d];
                    };
                    a.as.k = function (k, d) {
                        a.as.l(k, !0);
                    };
                    a.as.h = function (k, d) {
                        a.as.l(k, !0);
                    };
                    a.as.i = function (k, d) {
                        a.as.l(k, !0);
                    };
                    a.as.j = function (k, d) {
                        d && a.as.l(k, !0);
                    };
                    a.as.l = function (k, d) {
                        var f = new A().getTime(), f = k.activetime.activeTS && f - k.activetime.activeTS || 0;
                        d && (1000 < f || !k.activetime.active) && (k.activetime.checkID && a.a.a(k.activetime.checkID), k.activetime.activeTS = new A().getTime(), k.activetime.checkID = a.l.f(a.a.df([k], a.as.m), a.as.b));
                        k.activetime.active = d;
                    };
                    a.as.m = function (k) {
                        if (k.activetime.active) {
                            var d = new A().getTime() - k.activetime.activeTS < a.as.b;
                            a.as.l(k, d);
                        }
                    };
                    a.as.g = function (k, d, f, g, c) {
                        f = a.av.c(k.activetime.counters, c);
                        c = a.w.g(k.zr, c);
                        c = (k = k.activetime.active) && c && c.visible && c.visible();
                        g = f.get('lastActiveVis', !1);
                        !f.get('wasEverActiveAndFocused') && k && f.set('wasEverActiveAndFocused', 1);
                        g && c ? f.increment('activeInviewTime', w.max(d, 0)) : (g || c) && f.increment('activeInviewTime', w.max(w.round(0.5 * d), 0));
                        f.set('lastActiveVis', c);
                    };
                    a.as.a = function (k, d) {
                        if (!a.d.c()) {
                            d.rf = a.c.ev ? 1 : 0;
                            var f;
                            f = a.c.ev;
                            if (!a.c.c)
                                return f = f || a.focus.pageIsVisible() || k && k.counters && k.counters.strictDwell && k.counters.strictDwell.tCur && 0 < k.counters.strictDwell.tCur, d.re = f ? 1 : 0, d;
                            if (!k.activetime)
                                return d;
                            var g = a.w.b(k.zr), g = a.av.c(k.activetime.counters, g);
                            f = f || g.get('wasEverActiveAndFocused');
                            d.re = f ? 1 : 0;
                            g && 0 < g.get('activeInviewTime') && (d.ft = g.get('activeInviewTime'), d.fv = g.get('lastActiveInviewTime'), d.fw = g.get('activeInviewTimeFirstDelta', g.get('activeInviewTime')), g.set('lastActiveInviewTime', g.get('activeInviewTime')));
                            return d;
                        }
                    };
                    a.k.a.azsx('viewCounterStarted', a.as.f);
                    a.k.a.azsx('startAdTracking', a.as.c);
                }(u));
                (function (a) {
                    function k(c) {
                        c.functionInProgress = !1;
                        return 0 < c.pendingFunctions.length ? (c = c.pendingFunctions.shift(), a.a.df(c, a.ax.call, a.ax)(), !0) : !1;
                    }
                    function d() {
                        try {
                            a = window.__b, (0, window.__w)('INNER_FUNCTION'), window.__w = void 0, window.__b = void 0;
                        } catch (d) {
                            var c = d.name + ' in closure (moat.customIframe): ' + d.message + ', stack=' + d.stack;
                            try {
                                var b = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf), e = b ? '' : document.referrer, f = 'undefined' !== typeof a && a.c && a.c.n ? a.c.n : '', g = 'https://px.moatads.com/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape('REUTERS_HEADER1') + '&ac=1&k=' + escape(c) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(f) + '&j=' + escape(e) + '&cs=' + new A().getTime();
                                b ? omidNative.sendUrl(g) : new Image(1, 1).src = g;
                            } catch (k) {
                            }
                        }
                    }
                    function f(c) {
                        if (!c)
                            return !1;
                        var b = c.iframe, e = b.contentWindow.document, f = c.innerFunction, g = c.innerFunctionCbName, p = c.preserveDom;
                        !1 !== a.c.ed() ? (p = e.createElement('script'), p.innerHTML = d.toString().replace('"INNER_FUNCTION"', f), e.body.appendChild(p)) : (f = '<html><head></head><body><script>' + d.toString().replace('"INNER_FUNCTION"', f) + '</script>', p || (f += '<script>setTimeout(function() { document.close(); }, 1);</script>'), e.write(f + '</body></html>'));
                        b.contentWindow.__b = c.Moat;
                        b.contentWindow.__w = c.wrapper;
                        b.contentWindow[d.toString().match(/function (\w+)\(\)/)[1]]();
                        g && a.c.ax[g] && (a.c.ax[g] = null);
                        if (!k(c.frameData))
                            a:
                                if (e = c.setIframeDomain, c = c.preserveDom, b) {
                                    var t;
                                    if (!e)
                                        try {
                                            t = b.contentWindow.document;
                                        } catch (q) {
                                            break a;
                                        }
                                    g = !1 === a.c.ed();
                                    c ? e ? b.src = 'javascript:document.close();' : t.close() : e ? b.src = g ? 'javascript:document.open(); document.close();' : 'javascript:document.head && (document.head.innerHTML=""); document.body && (document.body.innerHTML="");' : g ? (t.open(), t.close()) : (t.head && (t.head.innerHTML = ''), t.body && (t.body.innerHTML = ''));
                                }
                    }
                    function g(a) {
                        if ('string' !== typeof a)
                            return '';
                        var b = a.charAt(0);
                        '\'' !== b && '"' !== b && (a = '\'' + a + '\'');
                        return a;
                    }
                    a.ax = {};
                    a.ax.a = function (c, b, d, f) {
                        if (!c)
                            return !1;
                        try {
                            var g = document.createElement('iframe'), p = b || a.a.di();
                            if (!g)
                                return !1;
                            a.a.dn(g, f);
                            var t;
                            d ? (d = a.a.cm(d), t = function () {
                                a.a.cl(g, d);
                            }) : (d = a.c.e.document.body, t = function () {
                                d.insertBefore(g, d.insertBefore[0] || null);
                            });
                            var q = {
                                id: p,
                                iframe: g,
                                functionInProgress: !1,
                                pendingFunctions: [],
                                parent: d,
                                loaded: !1
                            };
                            g.onload = function () {
                                g.contentWindow && g.contentDocument && !q.loaded && (q.loaded = !0, k(q));
                            };
                            t();
                            q.loaded = q.loaded || g.contentDocument && 'complete' === g.contentDocument.readyState;
                            c.customIframes || (c.customIframes = {});
                            c.customIframes[p] = q;
                            q.loaded && k(q);
                            a.k.a.azsx('adKilled', function (b) {
                                var c = b.customIframes, d;
                                for (d in c)
                                    c.hasOwnProperty(d) && a.ax.b(b, c[d].id);
                            }, {
                                condition: function (a) {
                                    return c.zr == a.zr;
                                },
                                once: !0
                            });
                            return p;
                        } catch (r) {
                        }
                        return !1;
                    };
                    a.ax.b = function (a, b, d) {
                        var f = a.customIframes[b];
                        d = f && f.iframe;
                        if (!f || !d)
                            return !1;
                        f = f.parent;
                        if (!f)
                            return !1;
                        try {
                            f.removeChild(d);
                        } catch (g) {
                        }
                        a.customIframes[b] = null;
                        delete a.customIframes[b];
                        return !0;
                    };
                    a.ax.call = function (c, b, d, h, k, p) {
                        if (!c || 'undefined' === typeof b)
                            return !1;
                        var t = c && c.customIframes && c.customIframes[b];
                        if (!t || !d)
                            return !1;
                        h = h && 'string' !== typeof h ? h.toString() : g(h);
                        d && 'string' !== typeof d && (d = a.a.dl(d, h));
                        k && 'function' === typeof k || (k = function () {
                        });
                        if (t.functionInProgress || !t.loaded)
                            return t.pendingFunctions.push([
                                c,
                                b,
                                d,
                                h,
                                k,
                                p
                            ]), !1;
                        c = t.iframe;
                        t.functionInProgress = !0;
                        b = !1;
                        try {
                            if (!t.iframe.contentDocument)
                                throw Error();
                        } catch (r) {
                            b = !0;
                        }
                        d = a.l.l(a.a.df([{
                                iframe: c,
                                frameData: t,
                                Moat: a,
                                wrapper: function (a) {
                                    k(a);
                                },
                                innerFunction: d,
                                innerFunctionCbName: q,
                                setIframeDomain: b,
                                preserveDom: p
                            }], f));
                        if (b) {
                            var q;
                            do
                                q = 'Moat#iqcb' + w.floor(10000 * w.random());
                            while (a.c.ax[q]);
                            a.c.e[a.c.ay][q] = d;
                            c.src = 'javascript:document.open(); document.domain="' + document.domain + '"; window.parent["' + a.c.ay + '"]["' + q + '"]();';
                        } else
                            d();
                    };
                }(u));
                (function () {
                    function a(a) {
                        window._qs = a;
                        (a = window.__b) && a.a.cn('https://z.moatads.com/px2/client.js', document.body);
                    }
                    u.ay = {};
                    u.ay.a = function (k) {
                        if (k) {
                            var d = 0 === w.floor(1000 * w.random());
                            k.px2 = {
                                inSample: !1,
                                success: !1,
                                firedPixel: !1
                            };
                            if (d && (k.px2.inSample = !0, d = u.ax.a(k, 'ivt'))) {
                                try {
                                    var f = k.customIframes && k.customIframes[d] && k.customIframes[d].iframe;
                                    f && (f.contentWindow.__PX2__ = k.px2);
                                } catch (g) {
                                }
                                f = u.f.r();
                                f = u.y.b(36, k.ao, f, !1, !0);
                                f.qs.i = u.a.dy('REUTERS_HEADER1', 'PX2');
                                f = u.y.j(f.qs);
                                u.ax.call(k, d, a, f, null, !0);
                                k.px2.success = !0;
                            }
                        }
                    };
                }(u));
                (function (a) {
                    function k(c) {
                        var d = { oz: !0 };
                        if (!a.c.am().isInApp || a.c.cq())
                            d.su = !0, d.of = !0;
                        if (!b[c])
                            return !1;
                        for (var e in b[c])
                            if (d[e] && b[c].hasOwnProperty(e) && !b[c][e])
                                return !1;
                        return !0;
                    }
                    function d(b) {
                        a.ai.e(b);
                        a.ai.f(b);
                        a.ai.g(b);
                        a.ai.h(b);
                        var c = k(b.zr);
                        !b.hasAdLoadedfired && c ? e = !0 : !e && c && (c = { e: 9 }, c.q = b.aq[9]++, a.y.a(b, c), e = !0);
                    }
                    function f(a) {
                        return {
                            st: !1,
                            su: !1,
                            of: !1,
                            oz: !1
                        };
                    }
                    var g = 0, c, b = {};
                    a.ai = {};
                    a.ai.c = function (a) {
                        return !1;
                    };
                    a.ai.d = function () {
                        var b = new A().getTime(), c = b - g;
                        if (g && !(1000 > c)) {
                            g = b;
                            for (var e in B)
                                B.hasOwnProperty(e) && d(B[e]);
                            a.k.a.zaxs('hiddenAds:updated');
                        }
                    };
                    var e = !1;
                    a.ai.e = function (c) {
                        b[c.zr] || (b[c.zr] = f(c));
                        if (!0 !== b[c.zr].st) {
                            var d = a.w.k(c.zr);
                            d ? (c.isCurrentlyStacked = a.z.r(c), !1 === b[c.zr].st && (b[c.zr].st = !1 === d.adStartedOnScreen() || !1 === c.isCurrentlyStacked)) : b[c.zr].st = !0;
                        }
                    };
                    a.ai.f = function (c) {
                        var d = b, e = c.zr;
                        d[e] = b[e] || f(c);
                        var g = d[e].su;
                        if (!g) {
                            var k = c.WINDOW || window, g = c.AD_RECT || a.z.k(c.aa, k, c._calcVideoBasedOnContainer), k = a.c.r(k), g = c.isInIframe ? g && k && !(g.left >= k.width || 0 >= g.right || g.top >= k.height || 0 >= g.bottom) : !0;
                            d[e].su = g;
                        }
                    };
                    a.ai.g = function (c) {
                        var d = b, e = c.zr;
                        d[e] = b[e] || f(c);
                        var g = d[e].of;
                        g || (g = a.c.r(c.WINDOW), g = c.isInIframe ? g && !(5 >= g.width || 5 >= g.height) : !0, d[e].of = g);
                    };
                    a.ai.h = function (c) {
                        var d = b[c.zr];
                        b[c.zr] = b[c.zr] || f(c);
                        if (c.aa) {
                            var e = 0 < a.a.de(c);
                            c.isCurrentlyTransparent = !e;
                            d.oz = d.oz || e;
                            return e;
                        }
                        return d.oz;
                    };
                    a.ai.b = function (a) {
                        var c = {}, d, e;
                        for (e in b[a])
                            b[a].hasOwnProperty(e) && (d = b[a][e], c[e] = d ? 1 : 0);
                        return c;
                    };
                    a.ai.a = function (b) {
                        return a.c.ea() ? !1 : !k(b);
                    };
                    a.k.a.azsx('adLoaded', function (a) {
                        a.hasAdLoadedfired = !0;
                    });
                    a.k.a.azsx('startAdTracking', function (b) {
                        d(b);
                        g = new A().getTime();
                        c || (c = new A().getTime() + 'ha', a.k.a.azsx('view:tick', function () {
                            a.ai.d();
                        }, { id: c }));
                    });
                    a.k.a.azsx('adEntersView', function (b) {
                        a.ai.e(b);
                    }, { once: !0 });
                    a.k.a.azsx('adKilled', function (a) {
                        a && !a.ep && (delete a.elementsFromPointCache, delete b[a.zr]);
                    });
                }(u));
                (function (a) {
                    a.an = {};
                    var k, d;
                    a.an.g = function (f) {
                        if (d)
                            f();
                        else if (k.googletag && k.googletag.apiReady && k.googletag.pubads())
                            d = k.googletag.pubads(), f();
                        else {
                            k.googletag = k.googletag || {};
                            k.googletag.cmd = k.googletag.cmd || [];
                            var g = a.l.l(f), c = function () {
                                    var a = k.googletag;
                                    (d = a && a.apiReady && a.pubads()) && g();
                                };
                            a.k.a.azsx('adKilled', function () {
                                var b = k.googletag;
                                if (b && a.a['do'](b.apiReady) && b.cmd && a.a.f(b.cmd)) {
                                    var d = b.cmd.indexOf(c);
                                    -1 !== d && b.cmd.splice(d, 1);
                                }
                            });
                            k.googletag.cmd.push(c);
                        }
                    };
                    a.an.l = function () {
                        if (d && 'function' !== typeof d.getSlots)
                            return !1;
                        try {
                            return d.getSlots();
                        } catch (a) {
                            return [];
                        }
                    };
                    a.an.a = function () {
                        if (d && 'function' === typeof d.getSlotIdMap)
                            return d.getSlotIdMap();
                    };
                    a.an.m = function (a) {
                        return d.getTargeting(a);
                    };
                    a.an.n = function () {
                        if ('function' !== typeof d.getTargetingKeys || 'function' !== typeof d.getTargeting)
                            return !1;
                        var f = d.getTargetingKeys(), g = {};
                        a.a.forEach(f, function (a) {
                            g[a] = d.getTargeting(a);
                        });
                        return g;
                    };
                    a.an.o = function (a, g) {
                        if ('function' !== typeof d.setTargeting)
                            return !1;
                        d.setTargeting(a, g);
                        return !0;
                    };
                    a.an.p = function (a) {
                        if ('function' !== typeof d.clearTargeting)
                            return !1;
                        d.clearTargeting(a);
                    };
                    a.an.q = function (a) {
                        if (a && 'function' === typeof a.getTargetingKeys)
                            return a.getTargetingKeys();
                    };
                    a.an.r = function (a, d) {
                        return a && 'function' === typeof a.getTargeting && d ? a.getTargeting(d) : !1;
                    };
                    a.an.s = function (d) {
                        var g = {}, c = a.an.q(d);
                        a.a.f(c) && a.a.forEach(c, function (b) {
                            g[b] = a.an.r(d, b);
                        });
                        return g;
                    };
                    a.an.t = function (d) {
                        if (d) {
                            d = a.an.s(d);
                            var g = a.an.n();
                            a.a.forEach(d, function (a, b) {
                                g[b] = a;
                            });
                            return g;
                        }
                    };
                    a.an.j = function (a, d, c) {
                        if (!(a && d && c && 'function' === typeof a.setTargeting))
                            return !1;
                        a.setTargeting(d, c);
                    };
                    a.an.u = function (a, d) {
                        if (!a || 'function' !== typeof a.clearTargeting)
                            return !1;
                        a.clearTargeting(d);
                    };
                    a.an.v = function (f, g) {
                        if (f && g && d && 'function' === typeof d.addEventListener) {
                            var c = a.l.l(g);
                            d.addEventListener(f, c);
                        }
                    };
                    a.an.d = function (a) {
                        if (a && 'function' === typeof a.getSlotElementId)
                            return a.getSlotElementId();
                    };
                    a.an.f = function (a) {
                        if (a && 'function' === typeof a.getSlotId && (a = a.getSlotId()) && 'function' === typeof a.getId)
                            return a = a.getId(), k.document.getElementById('google_ads_iframe_' + a);
                    };
                    a.an.c = function (a) {
                        if (a && 'function' === typeof a.getAdUnitPath)
                            return a.getAdUnitPath();
                    };
                    a.an.e = function (d) {
                        if (d = a.an.c(d)) {
                            d = d && d.split('/');
                            var g = [];
                            a.a.forEach(d, function (a) {
                                0 < a.length && g.push(a);
                            });
                            return g;
                        }
                    };
                    a.an.h = function (d) {
                        var g = [];
                        d && 'function' === typeof d.getSizes && a.a.forEach(d.getSizes(), function (a) {
                            'function' === typeof a.getWidth && 'function' === typeof a.getHeight && g.push([
                                a.getWidth(),
                                a.getHeight()
                            ]);
                        });
                        return g;
                    };
                    a.an.w = function () {
                        var a = k && k.googletag && k.googletag.sizeMapping;
                        if (a)
                            return a();
                    };
                    a.an.b = function () {
                        if (d) {
                            var f, g = document.body;
                            a.a.forEach(3, function () {
                                f = g;
                                g = a.g.b(g);
                                if (!g)
                                    return !1;
                            });
                            var c = a.an.x(f);
                            if ('string' === typeof c) {
                                var b = d.getSlotIdMap(), e;
                                for (e in b)
                                    if (e && 'string' === typeof e && e === c)
                                        return b[e];
                            }
                        }
                    };
                    a.an.x = function (a) {
                        return a && a.id && -1 < a.id.indexOf('google_ads_iframe') ? a.id.replace(/google_ads_iframe_?/, '') : null;
                    };
                    a.an.i = function () {
                        return k;
                    };
                    a.an.k = function (a, g) {
                        if (d && 'function' !== typeof d.refresh)
                            return !1;
                        d.refresh(a, g);
                    };
                    (function () {
                        k = window;
                        a.an.g(function () {
                            return !0;
                        });
                    }());
                }(u));
                (function (a) {
                    function k() {
                        if (!q && t !== h.LOADING) {
                            q = !0;
                            a.az.a.allData = new A().getTime();
                            var b = window.moatYieldReady;
                            'function' === typeof b && a.l.l(b)();
                        }
                    }
                    function d(b) {
                        var c;
                        c = f(b) ? p.c : p.b;
                        a.an.g(function () {
                            a.an.o(l.d, c);
                            a.an.o(l.e, c);
                        });
                    }
                    function f(a) {
                        return 'object' === typeof a && !1 !== a._pbd;
                    }
                    function g() {
                        function b(a) {
                            g && console.log('>>>MOAT YIELD INTELLIGENCE/' + a);
                        }
                        function c(b, d) {
                            return a.a.cj(function (c) {
                                return (c = a.an.r(b, c)) && c.length && 1 <= c.length ? c[0] : '';
                            }, d).join('|');
                        }
                        function d(g) {
                            var h, k, m;
                            if (!t)
                                return b('setMoatTargetingForSlot: No Moat API response for slot level data, not setting targeting.'), a.an.j(g, l.d, p.d), a.an.j(g, l.e, p.d), !1;
                            if (!f(t))
                                return b('setMoatTargetingForSlot: No historical slot data available, not setting targeting.'), a.an.j(g, l.d, p.e), a.an.j(g, l.e, p.e), !1;
                            if (!g || 'function' !== typeof g.getSlotElementId)
                                return b('setMoatTargetingForSlot: Slot is missing, not setting targeting.'), !1;
                            h = g.getSlotElementId();
                            if (a.a.f('div_id'))
                                m = c(g, 'div_id');
                            else {
                                k = a.an.r(g, 'div_id');
                                if (!k)
                                    return b('setMoatTargetingForSlot: slotId ' + h + '; Failed to get div_id targeting array, not setting targeting.'), !1;
                                m = k[0];
                                if ('undefined' === typeof m)
                                    return b('setMoatTargetingForSlot: slotId ' + h + '; No targeting data set for div_id, not setting targeting.'), !1;
                            }
                            k = t[m] && t[m][e];
                            if (!k)
                                return b('setMoatTargetingForSlot: slotId ' + h + '; No historical data found for div_id of ' + m + ', not setting targeting.'), a.an.j(g, l.d, p.f), a.an.j(g, l.e, p.f), !1;
                            for (var q in k)
                                if (a.a.cy(k, q)) {
                                    var r = k[q];
                                    if (a.a.db(r)) {
                                        b('setMoatTargetingForSlot: slotId ' + h + '; Setting ' + q + ' value of ' + r + '.');
                                        m = parseInt(r);
                                        r = r.toString();
                                        if ('number' === typeof m && 0 === m % 10 && 10 < m && 100 >= m)
                                            for (r = [r], m = m / 10 - 1; 0 < m; m--)
                                                r.push((10 * m).toString());
                                        a.an.j(g, q, r);
                                    }
                                }
                        }
                        var e, g = !1, h, k, q, t;
                        e = a.c.db ? 'Mobile' : 'Desktop';
                        this.slotDataAvailable = function () {
                            return f(t) ? !!t : !1;
                        };
                        this.pageDataAvailable = function () {
                            return !1;
                        };
                        this.safetyDataAvailable = function () {
                            return !1;
                        };
                        this.enableLogging = function () {
                            return g = !0;
                        };
                        this.disableLogging = function () {
                            g = !1;
                            return !0;
                        };
                        this.setMoatTargetingForSlot = function (b) {
                            b = a.a.df([b], d);
                            a.an.g(b);
                        };
                        this.setMoatTargetingForAllSlots = function () {
                            a.an.g(function () {
                                var c = a.an.l();
                                if (!c)
                                    return b('setMoatTargetingForAllSlots: Failed to get slots from GPT, not setting targeting.'), !1;
                                a.a.forEach(c, function (a) {
                                    d(a);
                                }, this);
                            });
                        };
                        this.getMoatTargetingForSlot = function (d) {
                            var f, g;
                            switch (typeof d) {
                            case 'string':
                                var m = a.an.l();
                                if (!a.a.f(m)) {
                                    b('getMoatTargetingForSlot: No valid slot identifier provided, exiting.');
                                    return;
                                }
                                a.a.forEach(m, function (a) {
                                    if ('function' === typeof a.getSlotElementId && a.getSlotElementId() === d)
                                        return g = a, !1;
                                });
                                break;
                            case 'object':
                                if ('function' !== typeof d.getSlotElementId) {
                                    b('getMoatTargetingForSlot: No valid slot identifier provided, exiting.');
                                    return;
                                }
                                g = d;
                                g.getSlotElementId();
                                break;
                            default:
                                b('getMoatTargetingForSlot: No valid slot identifier provided, exiting.');
                                return;
                            }
                            'object' === typeof g && 'function' === typeof g.getTargeting ? a.a.f('div_id') ? f = c(g, 'div_id') : (m = a.an.r(g, 'div_id')) && m.length && 1 <= m.length && (f = m[0]) : b('getMoatTargetingForSlot: Failed to get slot targeting, GPT slot object is invalid.');
                            'string' !== typeof f && (f = '');
                            f = t && t[f] && t[f][e] || {};
                            f[l.b] = h;
                            f[l.c] = k;
                            f[l.a] = q;
                            return f;
                        };
                        this.getMoatTargetingForPage = function () {
                            var a = {};
                            a[l.b] = h;
                            a[l.c] = k;
                            a[l.a] = q;
                            return a;
                        };
                        this.__A = function (a, b) {
                            h = a;
                            k = b;
                        };
                        this.__B = function (a) {
                            q = a;
                        };
                        this.__C = function (a) {
                            t = a;
                        };
                    }
                    a.az = {};
                    var c = w.floor(w.random() * w.pow(10, 12)), b = a.a.ao(), e = a.a.am();
                    a.az.a = {
                        wrapper: window.moatHeaderInitTime || a.c.bj,
                        apiReady: null,
                        nadoData: null,
                        allData: null
                    };
                    a.az.b = {
                        rendered: 0,
                        slotTargetingLoaded: 0,
                        slotTargetingSet: 0,
                        pageDataTargetingSet: 0,
                        safetyTargetingSet: 0,
                        emptySlot: 0
                    };
                    var h = {
                            LOADING: '0',
                            LOADED: '1'
                        }, l = {
                            a: 'm_data',
                            b: 'm_safety',
                            c: 'm_categories',
                            d: 'm_mv',
                            e: 'm_gv'
                        }, p = a.c.em, t = h.LOADING, q = !1;
                    a.az.c = function () {
                        function b(a, c) {
                            var d = 'safe' === c ? 'moat_safe' : 'moat_unsafe';
                            a && -1 !== a.indexOf('moat_unsure') ? (a.splice(a.indexOf('moat_unsure'), 1), a.push(d)) : 0 === a.length && a.push(d);
                            return a;
                        }
                        function c(b) {
                            if (!b || !a.a.f(b))
                                return b;
                            var d = 'gv_adult gv_arms gv_crime gv_death_injury gv_download gv_drugs gv_hatespeech gv_military gv_obscenity gv_terrorism gv_tobacco moat_safe moat_unsafe moat_sensitive'.split(' ');
                            return a.a.filter(b, function (a) {
                                return a && -1 !== d.indexOf(a);
                            });
                        }
                        var e = new g();
                        window.moatPrebidApi = e;
                        k();
                        a.az.a.apiReady = new A().getTime();
                        a.ak.c('nado-all', function (f) {
                            var g, p, q;
                            if ('object' !== typeof f)
                                return !1;
                            q = '0';
                            f && 'n' in f && (q = '1');
                            a.an.g(function () {
                                a.an.o(l.a, q);
                            });
                            e.pageDataAvailable = function () {
                                return !0;
                            };
                            e.__B(q);
                            var r = a.a.dq(new RegExp('.*callback=' + f.callback + '.*'));
                            (r = a.a.dp(r)) && r.responseEnd && f.h && (a.az.a.nadoResponseEnd = r.responseEnd, a.az.a.nadoResponseExecution = w.round(f.h));
                            g = a.a.aw(f);
                            f.c && a.a.f(f.c) && (p = f.c);
                            g && a.an.g(function () {
                                a.an.o(l.b, g);
                            });
                            p && (p = c(p), p = b(p, g), a.an.g(function () {
                                a.an.o(l.c, p);
                            }));
                            e.safetyDataAvailable = function () {
                                return !0;
                            };
                            e.__A(g, p);
                            f = f.yi;
                            d(f);
                            e.__C(f);
                            a.az.a.nadoData = new A().getTime();
                            t = h.LOADED;
                            k();
                        });
                    };
                    a.az.d = function () {
                        var b = a.a.df([
                            'slotRenderEnded',
                            function (b) {
                                if ('undefined' !== typeof b && 'undefined' !== typeof b.slot) {
                                    var c = window.moatPrebidApi, d = b.slot;
                                    if (!c)
                                        return !1;
                                    var e = {
                                        slotTargetingLoaded: !1,
                                        slotTargetingSet: !1,
                                        pageDataTargetingSet: !1,
                                        safetyTargetingSet: !1,
                                        emptySlot: !1
                                    };
                                    e.slotTargetingLoaded = c.slotDataAvailable();
                                    'undefined' !== typeof a.an.r(d, l.d)[0] && (e.slotTargetingSet = !0);
                                    b.isEmpty && (e.emptySlot = !0);
                                    'undefined' !== typeof a.an.m(l.a)[0] && (e.pageDataTargetingSet = !0);
                                    'undefined' !== typeof a.an.m(l.b)[0] && (e.safetyTargetingSet = !0);
                                    a.az.b.rendered++;
                                    a.a.forEach(e, function (b, c) {
                                        !0 === b && a.az.b[c]++;
                                    });
                                }
                            }
                        ], a.an.v);
                        a.an.g(b);
                    };
                    a.az.e = function (d, f, g) {
                        g = {};
                        g.e = d;
                        g.t = a.c.bj;
                        g.de = c;
                        g.d = 'REUTERS_HEADER1:' + (a.c.db ? 'Mobile' : 'Desktop') + ':-:-';
                        g.i = 'YIELD_INTELLIGENCE_INTERNAL1';
                        g.sgs = 5;
                        g.ar = '29ad59d-clean';
                        g.iw = '31d6965';
                        43 === d && 'undefined' !== typeof f && (d = f.getSlotElementId(), g.zMoatDfpSlotId = d || '-');
                        g.zMoatRendered = a.az.b.rendered;
                        g.zMoatSlotTargetingLoaded = a.az.b.slotTargetingLoaded;
                        g.zMoatSlotTargetingSet = a.az.b.slotTargetingSet;
                        g.zMoatPageDataTargetingSet = a.az.b.pageDataTargetingSet;
                        g.zMoatSafetyTargetingSet = a.az.b.safetyTargetingSet;
                        g.zMoatEmptySlot = a.az.b.emptySlot;
                        f = a.az.a.wrapper;
                        var h = a.az.a.nadoData;
                        d = a.az.a.allData;
                        g.zMoatNadoDataLoadTime = h && h - f || 'Not Loaded';
                        g.zMoatAllDataLoadTime = d && d - f || 'Not Loaded';
                        a.az.a.nadoResponseEnd && a.az.a.nadoResponseExecution && (g.zMoatNL = a.az.a.nadoResponseExecution - a.az.a.nadoResponseEnd);
                        g.bo = b;
                        g.bd = e;
                        g.ac = 1;
                        g.bq = a.c.n;
                        g.f = Number(!ka);
                        (f = window.moatPrebidApi) && 'function' === typeof f.slotDataAvailable && (g.zn = f.slotDataAvailable() ? 1 : 0);
                        d = d && d - a.c.bj;
                        a.a.db(d) && (g['if'] = d);
                        d = a.a.cu(g, !0);
                        d += '&na=' + a.a.cw(d, g.i);
                        r.yh.yi(d + '&cs=0', W, null, !0);
                    };
                    (function () {
                        a.an.g(function () {
                            a.a.forEach(l, function (b, c) {
                                a.an.o(b, p.a);
                            });
                        });
                    }());
                    var u = a.f.r(!0);
                    u.url = a.c.ba;
                    u.pcode = 'reutersheader194883552024';
                    u = a.a.cu(u, !0);
                    a.ak.a('nado-all', 'MoatNadoAllJsonpRequest', 'https://mb.moatads.com/yi/v2?' + u);
                }(u));
                (function (a) {
                    function k(c, b) {
                        var d = c.slot, f = 'function' === typeof d.getAdUnitPath && d.getAdUnitPath(), g = a.ap.c(a.a.cc(), b);
                        g || (g = {}, g._AD_FORMAT = b, a.ap.f(g));
                        g.trackedFromDfpHeaderTag = !0;
                        g.dfpAdId = d.getSlotElementId();
                        g.slotMappingId = 'function' === typeof d.getSlotId && d.getSlotId().getId();
                        g.moatClientLevel1 = c.advertiserId || '';
                        g.moatClientLevel2 = c.campaignId || '';
                        g.moatClientLevel3 = c.lineItemId || c.sourceAgnosticLineItemId || '';
                        g.moatClientLevel4 = c.creativeId || c.sourceAgnosticCreativeId || '';
                        a.a.forEach([
                            'moatClientLevel1',
                            'moatClientLevel2',
                            'moatClientLevel3',
                            'moatClientLevel4'
                        ], function (b) {
                            a.a.db(g[b]) && (g[b] = g[b].toString());
                        });
                        g.dfpHeaderSlots || (g.dfpHeaderSlots = {});
                        var k = [
                            'type',
                            'div_id'
                        ];
                        k && 0 < k.length && a.a.forEach(k, function (b) {
                            var c = a.an.r(d, b);
                            c && a.a.f(c) && 0 < c.length ? g.dfpHeaderSlots['zMoat' + b] = c : g.dfpHeaderSlots['zMoat' + b] = '-';
                        });
                        'string' === typeof f && (k = '/' == f[0] ? 2 : 1, f = f.split('/').slice(k), k = f[f.length - 1], g.moatClientSlicer1 = f[0] || '', g.moatClientSlicer2 = k || '', a.a.forEach(f, function (a, b) {
                            g['zMoatAdUnit' + (b + 1)] = a;
                        }));
                        return g;
                    }
                    function d(a, b) {
                        var d = a && a[b];
                        return d && d.toString ? d.toString() : '';
                    }
                    function f(c, b, e) {
                        c = c || {};
                        c = [
                            {
                                whitelistValues: [
                                    '8200574565762874',
                                    '20065632'
                                ],
                                id: d(c, 'advertiserId'),
                                zmoat: 'zMoatDFPAdIds'
                            },
                            {
                                id: d(c, 'sourceAgnosticLineItemId'),
                                zmoat: 'zMoatDFPLineItemIds'
                            },
                            {
                                id: d(c, 'campaignId'),
                                zmoat: 'zMoatDFPOrderIds'
                            }
                        ];
                        if (a.a.some(c, function (c) {
                                if (!c.id)
                                    return !1;
                                var d = b[c.zmoat] && b[c.zmoat].split(':') || [];
                                c.whitelistValues && c.whitelistValues.length && (d = d.concat(c.whitelistValues));
                                return a.a.ax(d, c.id);
                            }) || 'html5' === b._AD_FORMAT)
                            return !0;
                    }
                    function g(c) {
                        var b = c.slot;
                        if (b && !c.isEmpty) {
                            var d = 'function' === typeof b.getHtml && b.getHtml();
                            d = d && 'string' === typeof d ? 0 <= d.search(/banner_html_inpage_rendering_lib.*\.js/) : !1;
                            d = k(c, d ? 'html5' : 'adx');
                            if (f(c, d, b) && (a.y.b(17, d), c = (c = a.an.d(b)) && document.getElementById(c))) {
                                var b = (b = c.querySelector('iframe')) && b.contentWindow, g;
                                try {
                                    g = !a.g.d(b) && b.document && b.document.body && b.document.body.children && 0 < b.document.body.children.length && b.document.body;
                                } catch (l) {
                                }
                                g || (g = c);
                                a.v.c(g, d, void 0, void 0, void 0, b);
                            }
                        }
                    }
                    a.am = {};
                    a.am.b = function () {
                        a.an.g(function () {
                            a.an.v('slotRenderEnded', g);
                        });
                    };
                    a.am.a = function (c) {
                        var b = a.a.df([c], function (b) {
                            a.ac.g(b);
                        });
                        a.l.c(c.WINDOW, 'unload', b, 'dfphead-unload');
                    };
                    a.k.a.azsx('adKilled', function (c) {
                        c && !c.ep && a.l.d(c.WINDOW, 'unload', null, 'dfphead-unload');
                    });
                }(u));
                (function (a) {
                    function k(c) {
                        c && (a.c.ax.b || (a.c.ax.b = !0, r.dcsx && r.dcsx.ynds(window, 'deviceorientation', 'deviceorientation-' + a.c.ax.a, 'deviceorientationFn' + a.c.ax.a)), h || (h = !0, r.swde.azsx('deviceorientation-' + a.c.ax.a, f)), b.hasOwnProperty(c.zr) || (b[c.zr] = new g()));
                    }
                    function d(a) {
                        a && delete b[a.zr];
                    }
                    function f(a) {
                        var c = A.now(), d = !1;
                        200 < c - e && (e = c, d = !0);
                        for (var f in B)
                            B.hasOwnProperty(f) && b.hasOwnProperty(f) && (c = b[f], 1500 > c.eventsCount && (c.eventsCount += 1, d && c.handleOrientationEvent(a)));
                    }
                    function g() {
                        this.validEventsHandledCount = this.eventsHandledCount = this.eventsCount = 0;
                        this.alpha = new c(0, 360);
                        this.beta = new c(-180, 180);
                        this.gamma = new c(-90, 90);
                    }
                    function c(a, b) {
                        this.minExpectedVal = a;
                        this.maxExpectedVal = b;
                        this.normalizedMax = w.abs(this.minExpectedVal) + this.maxExpectedVal;
                        this.rangeRight = this.rangeLeft = this.origin = null;
                    }
                    a.ar = {};
                    var b = {}, e = 0, h = !1;
                    g.prototype.isValidEvent = function (a) {
                        return !a.alpha && 0 !== a.alpha || !a.beta && 0 !== a.beta || !a.beta && 0 !== a.beta || 0 === a.alpha && 0 === a.beta && 0 == a.gamma ? !1 : !0;
                    };
                    g.prototype.handleOrientationEvent = function (a) {
                        this.eventsHandledCount += 1;
                        this.isValidEvent(a) && (this.validEventsHandledCount += 1, this.alpha.addValue(a.alpha), this.beta.addValue(a.beta), this.gamma.addValue(a.gamma));
                    };
                    c.prototype.isOutsideRange = function (a) {
                        return this.rangeLeft > this.rangeRight ? this.rangeLeft > a && a > this.rangeRight : a < this.rangeLeft || a > this.rangeRight;
                    };
                    c.prototype.extendRange = function (a) {
                        this.isOutsideRange(a) && ((a < this.rangeLeft ? this.rangeLeft - a : this.rangeLeft + this.normalizedMax - a) <= (a > this.rangeRight ? a - this.rangeRight : this.normalizedMax - this.rangeRight + a) ? this.rangeLeft = a : this.rangeRight = a);
                    };
                    c.prototype.addValue = function (a) {
                        var b = a + w.abs(this.minExpectedVal);
                        null === this.origin ? (this.origin = a.toFixed(3), this.rangeRight = this.rangeLeft = b) : this.extendRange(b);
                    };
                    c.prototype.getRangeLength = function () {
                        return null === this.origin ? -1 : this.rangeRight >= this.rangeLeft ? (this.rangeRight - this.rangeLeft).toFixed(3) : (this.normalizedMax - this.rangeLeft + this.rangeRight).toFixed(3);
                    };
                    a.ar.a = function (a) {
                        var c = {};
                        b[a] && (a = b[a], c = {
                            oe: [
                                a.eventsCount,
                                a.eventsHandledCount,
                                a.validEventsHandledCount,
                                a.alpha.origin ? a.alpha.origin : 'null',
                                a.alpha.getRangeLength(),
                                a.beta.origin ? a.beta.origin : 'null',
                                a.beta.getRangeLength(),
                                a.gamma.origin ? a.gamma.origin : 'null',
                                a.gamma.getRangeLength()
                            ].join(':')
                        });
                        return c;
                    };
                    a.c.e.DeviceOrientationEvent && (a.k.a.azsx('adInitialized', k), a.k.a.azsx('adKilled', d), a.k.a.azsx('allLocalAdsKilled', function () {
                        r && r.dcsx && r.dcsx.engn && r.dcsx.engn({ listenerName: 'deviceorientationFn' + a.c.ax.a });
                        r.swde.sxaz('deviceorientation-' + a.c.ax.a, { callback: f });
                        b = {};
                        h = a.c.ax.b = !1;
                    }));
                }(u));
                (function (a) {
                    a.ba = {};
                    a.ba.a = !1;
                    a.ba.b = function (k) {
                        k && k.zMoatENV && 'x' === k.zMoatENV && (a.ba.a = !0);
                    };
                }(u));
                (function (a) {
                    function k() {
                        a.l.l(function () {
                            var b = document.createElement('iframe');
                            b.src = 'https://z.moatads.com/hd09824092/iframe.html#header=1';
                            b.style.display = 'none';
                            b.style.width = '0px';
                            b.style.height = '0px';
                            b.width = '0';
                            b.height = '0';
                            b.setAttribute('name', 'reutersheader194883552024_MOAT_IFRAME');
                            a.a.cl(b, window.document.documentElement);
                        })();
                    }
                    function d(b) {
                        if (b && 'string' === typeof b) {
                            var c = a.f.a([
                                19,
                                4,
                                18,
                                19,
                                53
                            ]);
                            -1 !== 'REUTERS_HEADER1'.indexOf(c) && (b = a.a.dy(b, c));
                            return b;
                        }
                    }
                    function f(f) {
                        if (f && f.msgData && 'string' === typeof f.msgData.data) {
                            var g = f.msgData.data.split('@@@');
                            if (2 === g.length) {
                                var g = {
                                        className: decodeURIComponent(g[0]),
                                        src: decodeURIComponent(g[1]),
                                        parentNode: { innerHTML: '' },
                                        getAttribute: function (a) {
                                            return 'class' === a ? this.className : this[a] || '';
                                        },
                                        trackedFromSlotTag: !0
                                    }, k = a.ap.c(g, 'feather') || {};
                                k.sli = d(k.sli);
                                k._AD_FORMAT = 'feather';
                                a.ba.b(k);
                                if (a.ba.a)
                                    a.ba.a = !1;
                                else {
                                    a.y.b(17, k);
                                    var t = b(f.source);
                                    a.l.k(function () {
                                        var b;
                                        b:
                                            if (t)
                                                for (var d = t.length - 1; 0 <= d; d--) {
                                                    var f = t[d];
                                                    if (f !== f.top) {
                                                        var g = a.g.b(null, f);
                                                        if (g) {
                                                            if (a.a.bt(g)) {
                                                                b = g;
                                                                continue;
                                                            }
                                                            break;
                                                        }
                                                        g = c(f);
                                                        if (a.a.bt(g)) {
                                                            b = g;
                                                            break b;
                                                        }
                                                        break;
                                                    }
                                                }
                                            else
                                                b = void 0;
                                        b ? (k.adFindingMethod = 'moat slot tag', k.trackedFromSlotTag = !0, e(t, k), a.d.f(b, b.nodeName, !1, void 0, k, null), b = !0) : b = !1;
                                        return b;
                                    }, a.v.h, a.v.v, function () {
                                        a.y.b(11, k);
                                    });
                                }
                            }
                        }
                    }
                    function g(c, f) {
                        f = f || {};
                        if (c && c.src && 'string' === typeof c.nodeName) {
                            c.trackedFromSlotTag = !0;
                            var g = a.ap.c(c, 'feather') || {};
                            g.trackedFromSlotTag = !0;
                            g._AD_FORMAT = 'feather';
                            f.altKey && (g.altKey = f.altKey);
                            g.sli = d(f.sli);
                            g.useSlotIkey = f.useSlotIkey;
                            var k = a.a.be(c), k = b(k);
                            e(k, g);
                            a.ba.b(g);
                            if (a.ba.a)
                                a.ba.a = !1;
                            else {
                                a.y.b(17, g);
                                var k = a.a.bh(c), q = a.a.be(c);
                                a.v.c(k, g, null, null, null, q);
                            }
                        }
                    }
                    function c(b) {
                        var c;
                        try {
                            c = b.parent.document;
                        } catch (d) {
                            return null;
                        }
                        return a.g.f(c, b);
                    }
                    function b(b) {
                        if (!b)
                            return !1;
                        var c = a.g.k(b, 25);
                        c.unshift(b);
                        return c;
                    }
                    function e(b, d) {
                        if (!b || !a.a.f(b))
                            return !1;
                        for (var e = b.length - 1; 0 <= e; e--) {
                            var f = b[e];
                            if (f.top !== f && (f = a.g.b(null, f) || c(f), f = a.an.x(f), 'string' === typeof f))
                                return d && (d.slotMappingId = f), f;
                        }
                        return !1;
                    }
                    a.bb = {};
                    a.bb.a = function () {
                        k();
                        a.aw.l('scriptfoundreutersheader194883552024', a.l.l(f));
                        window.__moatSlotTagLoadedreutersheader194883552024 = a.l.l(g);
                    };
                }(u));
                (function (a) {
                    a.aq = {};
                    a.aq.a = function () {
                        var k = a.g.a(), d = [
                                '-',
                                '-',
                                '-',
                                '-',
                                '-'
                            ];
                        if (!k || !k.performance)
                            return !1;
                        var f = k.performance;
                        if (!f || 'function' !== typeof f.getEntriesByType)
                            return !1;
                        d[0] = k === window.top ? 1 : 0;
                        for (var g = f.getEntriesByType('paint'), c = 0; c < g.length; c++)
                            k = g[c], 'first-paint' === k.name && (d[1] = w.round(k.startTime)), 'first-contentful-paint' === k.name && (d[2] = w.round(k.startTime));
                        f = f.getEntriesByType('navigation');
                        0 < f.length && (k = f[0], 'duration' in k && (d[3] = w.round(k.duration)), 'domInteractive' in k && (d[4] = w.round(k.domInteractive)));
                        return d.join(':');
                    };
                }(u));
                u.k.a.zaxs('modulesReady', r);
                var Ea = u.focus.pageIsVisible();
                u.c.ev = 1 == window.history.length && !Ea && (u.c.c && '' != document.referrer || !u.c.c);
                u.c.j || u.c.al || u.c.dw();
                (u.c.j && u.c.eg() || 'dummy.url' === u.a.ao()) && u.c.dw();
                var D = 'moatFoundREUTERS_HEADER1', M = '__moat__REUTERS_HEADER1';
                u.c.am().isInApp || u.al.f();
                var L = u.a.cc();
                W = 'https://px.moatads.com';
                u.au.a(wa);
                var Fa = function () {
                    r.zs && r.dcsx && (r.dcsx.engn({ listenerName: 'unloadFn' + u.c.ax.a }), r.dcsx.engn({ listenerName: 'beforeunloadFn' + u.c.ax.a }));
                    ja || (ja = !0, u.d.b());
                };
                u.a.ao();
                u.az.e(17);
                u.p.i(u.c.ax.a, u.c.az);
                u.k.a.azsx('trackingReady', va, { once: !0 });
                u.k.a.zaxs('trackingReady');
            }(Date, Math));
        } catch (A) {
            var ct = new Date().getTime();
            window['Moat#ETS'] || (window['Moat#ETS'] = ct);
            window['Moat#EMC'] || (window['Moat#EMC'] = 0);
            var et = ct - window['Moat#ETS'], hourElapsed = 3600000 <= et, msg = A.name + ' in closure (global): ' + A.message + ', stack=' + A.stack;
            if (!hourElapsed && 10 > window['Moat#EMC']) {
                window['Moat#EMC']++;
                try {
                    var pixelDomain = 'px.moatads.com', isDomless = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf), documentReferrer = isDomless ? '' : document.referrer, isBeta = !1, viewHash = 'undefined' === typeof AD_VIEW_HASH ? isBeta ? 'REUTERS_HEADER1_BETA' : 'REUTERS_HEADER1' : AD_VIEW_HASH, tagType = 'undefined' !== typeof Moat && Moat.c && Moat.c.n ? Moat.c.n : '', pxSrc = 'https://' + pixelDomain + '/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape(viewHash) + '&ac=1&k=' + escape(msg) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(tagType) + '&j=' + escape(documentReferrer) + '&cs=' + new Date().getTime();
                    if (isDomless)
                        omidNative.sendUrl(pxSrc);
                    else {
                        var moat_px = new Image(1, 1);
                        moat_px.src = pxSrc;
                    }
                } catch (w) {
                }
            } else if (hourElapsed) {
                window['Moat#EMC'] = 1;
                window['Moat#ETS'] = ct;
                try {
                    pixelDomain = 'px.moatads.com', documentReferrer = (isDomless = 'undefined' !== typeof omidNative && ('undefined' === typeof Image || Image && Image._MoatProxyOf)) ? '' : document.referrer, isBeta = !1, viewHash = 'undefined' === typeof AD_VIEW_HASH ? isBeta ? 'REUTERS_HEADER1_BETA' : 'REUTERS_HEADER1' : AD_VIEW_HASH, tagType = 'undefined' !== typeof Moat && Moat.c && Moat.c.n ? Moat.c.n : '', pxSrc = 'https://' + pixelDomain + '/pixel.gif?e=24&d=data%3Adata%3Adata%3Adata&i=' + escape(viewHash) + '&ac=1&k=' + escape(msg) + '&ar=' + escape('29ad59d-clean') + '&iw=' + escape('31d6965') + '&bq=' + escape(tagType) + '&j=' + escape(documentReferrer) + '&cs=' + new Date().getTime(), isDomless ? omidNative.sendUrl(pxSrc) : (moat_px = new Image(1, 1), moat_px.src = pxSrc);
                } catch (w) {
                }
            }
        }
        ;
    }())
}
/*elp7rmke813wg6f3ybu937u7a6w4o0kzdemo34ukr189q4610ewsvvshd8w0v2c61mherbnx7e3it0x5tfvy6c4xf86r5ll2b8947pvqk15scyo23pd91kqv9v74g6cve4mc8bwqorup1rex0vs8rbhfzzp2977f5cxzybfpxogyd8l1h8ddqguqjopma1xs2riyudnapm6wnquqmo4a9r94hslptzjr6cqxi0dynm0cigh1nggea9detbwjx3ffbxqlyva7t2rwiqn4nif49o6fvpvxqp803ssna6kwfwciwyn1c8smq449aj6cdumtxq8eqmplvaegkvvl6gw8ad81arh23otqin7uc6u1z7gywnhjrja89prkx0ebq446oi7ufrvoioj1hcvasfqlxake92f3gqeigridvtghc4bizzbpvck1pfbopnb5p7re9hc5sfrqediwt9771tgzkvxerpeqg4xrb53judpghnv1jru9o91nl5mw1raivx1rgt0bs1sagblij3t36p55144kkk6bvxansk23tgx4ufluck0msj63l4tkh85ut3ce02t8j5xgu381zbo7crvkryyg93g8wjjmpimor9zxdc46do53g2cltbks85fk5bwczy8tweo8mghry1lp7hdm6yxbjb3jq8is5q3wq1dc0eryqbo0ids10t8c2sg6b10ta3gjlsap4cf4ql0n4un5cvemqs7whv47gudjoprjrjnbwdt10kihm30dkgtf567c658turl9zgzel60mpd8qmrbsvu42negjkaxr2t5gryso8u4tk5glz2gf6jh4t4mokjv0xiejxr7uqba5t0o8rotnninq1i8r7d4ua4xmeayl70rsjbez1q8054olq0d1bu22by50v9iv62zery3yppo8okx3re3lyteijrzza1rcappqkzkjslmkdvd510wz8ogzyslj2lurp6ye5jec8qhnrrbc1sjbcdayi352m9kpcy23w5wo05a7rekx2guwdj8r1370yxxhrlfluw4erh7f6bq35g3scdk1gi3741ozfblf4n9ov4123stojw0dxxe47lkbj5zvj03m7wiucm3yggvcmd8chcukdf8p3irwjh6utpdm2106sdnuakzfomn2e5wulq5a5xtqp37tbb9y25twfwm9hr9rivfsygvd60ma99bfidjq3pw76ekekxujnuttlsjbrd4uq3ygscu8205znerwk6ct6omwe7hlqmtk1g76ts93edr4h8205g0ksgx2npovrf4srq92rc8z4ptqbhotmr47dsejxvl62ch97abeyy1gx7h5nx1q6c8qom3k2odicf60gmmfhnqmijyk4xtuk5tlg6giqjgq0h4ihymc80x7dipongd02zq7wp65fqnd95od1s7i68aetbsyjo8evktlgz2xhqd10ftllh0nmae2e3tt69giig8pn1c1cq82c8ok7t1nz1e65o0hspr89q8rjbk2jttwiwxv0c1r396jxeg24fage8260uwertkiq7c6kqesjpsskqssext90w73ndp5be2xuyn39j3sjnhgrz9kwyz2tbt9qq25umqiym0frbqkskp0ql5w87cwjkrvjticl8falc2i0oc1t995x4xtwwjuqruscc520l3uey5d2j1jm9p1kgvjpnorbl6j16wxt86w4g8kp74jg4ql5m6juy62s37g8f6uyohb63j7895vyq3jb01hicbkbhycmadkh6wc1sk9lcreolbx66ai3dxktoch5k2ty0lg0gln8328gj3m5ibys1hu2bdf8q5mfxhh7o251qy33dbf2w5ngkc1mqun1c1tf27rbr0th94wu3bvv7yxj1rlcc5hk2528ilqiqdxsmxk70eitdjrqf30xfpxej7td14i853dzqvom72wc58ujnni9vha3o9izepwdnuwh3fvyc5ye5rd9q16h13yrfnxrk8ipdgn5bf8peti1mq8kqaz26r3g98qegrrk35j3bop4ypgqf26d6z6dr5gbh2pc00fgdn0ewf1p480ng9yk7zdetzx5kren0hiyxm7j7pdxr42byvd1pffgnubt09ti1cxjhvn95u020s149uscufty58xwbngaozrajv6clvsoui10k4o6rduldk1ktgv021177iq215rt5afsplfq14ct7roqqfh6djlidh168i39js3cjtakmciwzm6t2cr37wip60arreinidphtexpb7v10g5c3g7t24phaa1had03hszsi2mg53bhba4barcrqpadd7nq16ccwd3g5xzhwunfdhz1ca0rdicr1lwiczw3tqnekg6k567hn68flx0uv7d51g4uf9e8ew9exwq3kpwh03t84yufztpdfd7xoctsgc2ft6j3vm3dacwteodrth561qnpp3rub491tm8h30vwddgs8ix7oajk1kqboq6616itdcrsy2q0l3gjdo12h8a8ctiha04ncn38ti0wcqfb64zdebcyeh6e5ju2cywgc7d9j7swaz2j63o36aslcqaie0zrjsgne9r7w6df81l0xoejvh3s7y694k5fjmc2we5a0gspj7sugvbuytbavqji6gl7371kywwocpn61tas1s8jbf9ax8oxf6k7q40rzq42zmhxm6mivsf7lbsm1vcptpyoobqbfn289xi2c83gc5lewynbjb2qej2075sir8bkvnc1m4j77vsud9jxjklbalmqsl273z6hcivyb4ou2vb359qsqi0gkks1se2yw9qxa7r6qjw4w3p55dtgsouvh8jesc23sg9fbcx1antabrwjy4kxmpfmkxbg39t157oskcieku19iekh98zyo86qh0nxweowhaxlz3tbxhiyvpb2m8lih46jkeaec3dgxwhts9kko93z29yp7qeb65fefjpsg7d2z10e8x0mwhzjhy4vr9o18ng4dlld92ilsx2kgrrgpma9jfgzyrz8h4njdrdnq7n7espwqkatu96alchacvcptrd2d6zo1lzqfmyith1561bc79jmazwetkzpdouok6bjc5xyeg53gql4dqckq0330w7ey7tb1o1c0eyscts21u6skqnapodp02grdup9s7uxjnl40p8uqu9h14ztyyzynutsnxop835unp0pbkx3unwxq9nm52pc7na84c3mc4au4cxlsezfxbavlcsrd35tc8i8zckwcrhk4fvhngi7psxqtwc8xp7g4dx6y34pje16sxq6jpirbql3zkzuotlp5hgiltoi1kuujsupfll2f76i8lrkrohjiew2xj14nwwhiaugvh0uhmnhx99ots0jq7bwcw2itbjk1635wfrfjy9bqey1istnx0d7p93lf467me4vrlbnw8w631tgcpdffuzf2st2dzqr5lb42bgwb9fd5bw109kbiy240bvgukjrkji9h5919idrhkac0ddao3f5y68udmwlixn78yahmefj1eoa0sxc4cdirh8uitmuy0ka7wgplsad6hfx3uktbt9itrocc366c988j80i8rgdmpj7ocghoim40vs5r72rv0d3r1t2533a7zygcbxndspxl0288pq4uo0hcn3akt2yvro951j8abdns8ugpomsoaeualo82wy7n9gz81xwi7tu411pl2okv4lg4f4zetvnfo1h5lhjq2rseggg6335iweg71xx9pgyzflu79en32w2qgf545tne0u42kf669q1gnurpsv031jccof47ldmeb23pli364bkcppn6yvosv6tva1f6ujt6kyhtutf70xb8x3yajdc2w91idmcbgla6y5b93bd0kx9rlt633jf3nmhzjqc2fe7qr2k418swteskyblsa6k4d3cpfqr475ayuamklhh8yk6rh0b94xm4gzqmu3lc52b39xw25y1oyfsub4epf5z7cv6ki0dhsiih0dmtqcgikjasxt3eqhp5kecs0dbr22pdudqm8nunyjib6jih6nhvseex6k18dradp17xdintgfml3ivcm4modxkqug31dd8b168plizsynoqawuuq4ut453pr1bvt3vkyojqd3twnub0bo0ia2zqwyu4h5m8uvunjmic1creo0mrl6u6q3uaeqn78z8nivkayaq1bpqtf0y1xgo3w1mq2689upwjbia6lizc75lvcdt9pwmqu3ul25ywqw771gg9s49azijvmyrtnyjbdpmxzykapempiawf8gzm9crx4daruo5oz89j65tczm6mhpd6z9u83hkddm41e4qu94czas2f0rdbccku1q76nbhnx8p8okk3x2yqinjsaiwzw7d4nxhgi6nqnwj0bt8ui8v7uf0bn9m8iq4tco1wryno1qlk700qxtjqxsvwlbn4tontnk4rg31v9scubaz9cgixtf0hsdkfimx1quxz4ozi4n7g2g7i7ph1x2thx0two8fjkdc36q3h72nu7jhpz4hwmcpvoxpga6e8p5qwwfc8uhhhcnrxwrsoqcugh3hehie1p7gc3k23hz7r1u1zle62t3flzn7m4cbx95531wbq3eftkl14jrv17vte3133if4wjn8rar2ine5pvf2zgh64nr5v1enbppnolbidaukom82qey90imikg2r50dj3n583yf1n2hnyu6d8lbcqna39ke6k1udndc93sky7yxiu6f8u8kjdiopnbvozj2dhdc9wgg8u5llki36g34euz8kjkjygcslc2c0qnj32ol7t91n8gynnkldrzlea7aq23qgf9mep132px1do8fgrzrl2uvn563mj12p4s48wxhtkecnpfyiyupidh0cfpzyem7q7qj9nmy752kvabvjym1t79y8vcyfs2v8pv7raae2yhuqibal4bnr0eh0vygfd9ogzcccv6rium79ujo1wk295uwni4gdlvo17yi2bqmcv8wmizosxi2mfrfveesny0oczslylw9qvrw6thd9nx19gu2t1cuhqo45a5lgc91ul076jdx02z1hw0gok7a7vjbqgmoiqfvi0obiwg8ohqmf2k65rm8pf3cz3xztx50jwo8cillv6nfl9kk5i5yhanhk2z734exmzh01lsis9vnabqdkwauvntej8e0r41hgtii77htg5t3wnqhs64jmum29xsut1nm2c5ffoqrb5smbxz94zocuehi6139zv4tcrie2zo224cr1z64ug3rq9jg2a5b4v2lq0iqid8ehcajxvmcimt6ljxw1th9afqpvsom7nrp6dnfe1xx3b1ju3hz2bcs4fi4tdmwvnqgr0moiv94xjn1kbb8xxha63g0mxkj439rs8lxlq3ibgodu9w9dsxxz1j1uduqvziw6xwuhp5dqd5ui6p7rqfu71pdvx98woecqdo0tc34zru0wseu53hqjcdph6nol4n7mnp2sw246qiydp0drxcecaurry0m4pdem388s1htdhookyf75863fgq3nwf0ogpwzdruqm5378dgg5aflelj67mk0q10ffmgyu8hr01x11r3f5phuu4y3yxs9jsqjbkgkerrzbm8ihqx0ehbahejfbfm8i3bcp6aakbq54vu4n4r5tw7jolwoezleitlz0ez3suyidpz4kbx4gwr46bmgeg51909bd0srkm0e1wic6g3c4tqhkcz65609426tqx1t3hb1aaitfsrptxi52g5xwpykymxg23fmxjfwlmn1m7xzgjumv3va75kv9g3gp2kdvkne47di08f07j9ntq0ufjp3518wecitrkztmkeboxeuhyl92dqc896zg52zjybazc6dwxmsrokvcieetv9lcbglxb285qmbognhya6xj76javk1p7d2teg89eluw0m093c8jopj2s9z5dv0nufryw71tcwol0q449r8byjbvbz9kwkkop4ttv1jwndiwe4wvnavbej7jglj533qlm1qmf11lvmpbd0okc65n4ab5ozyd00uz9d73wi6rt9n1qzbf2ivt9f2oygwnve8qhx9l5d3jde54rmmue0wvckr9uuvfhln6x48wadsbx7nawapg956d865oc76w1k5l21ncm7ey60x5jvmygag4xfx1zqeb10xhz3nmqb9jix0ufbc0tuxt21of9k34xa7qiyf9ntvfjlyuyy2z6iumrw4tbtjrjfcf4yzkn8gudbzbmbz5tgkzrihsp2hkgqaopa2xoyl3wtodar4pgipogmm2r9t8ukw6c1p5j7ecvd1lauwo2eeknuilsl0xn2t1yjeyirspbpl69ktzsz507evkph7jxtqqp8acgg0ja1n9bh80tgdbe2s2uenapmzx6xtcizzktnnjt4o13vty649su4muvhtizwo1oynoko9zzc2qg97anpdrpgqcct1p180vvi7mc13ghiz48iqwp0rmq8v3e0eqmb8owv74r7f480ah66r7ynxlgxwnnzzq8dbtyzzi2knc9kk7rfrvij1ya1rytrp6bk8blercivv22nk6wg29sx358288cdxrzdd7h54rjd1mkan5oq8mcf52xrk3d6dhxhe4oizse5enu83b773vibwcxx9fmnjkjey2lrw64hzaosx1elritasat89sy7qrnh3kxqj3ogwpt0v9449xxjnwtp0cq5xj5l7aql8intgzs1g7907pkgnlejbqcbu9kb3pchwget0f8ijowurh5xexyw9f9gmztbfffdfirahi4ihimx4hl2fuk1yyv7a6cogqjoffev63z3qjtlrdesnem9eycd7hze5u4vexbp74fa3cktfs0uycvszksr2b1b98nm5zl3he72n2m7s6x4qvnj9qbxsqeu1ocmokyx8a4noplhbnrth2hmg5vw21a9g2prwp2fh081g8bcx7xgcddhnfmdmrc9efezg85t0hcco5c95ej0cvo9j214ifez0834pje65jbmjzhgmrgfmng0j01i1k35s8a3txmchn0jbtpwzjx005qv5563fvevm66qbu8rmitrvd5qmyuz3u48oytlqfq8fnzea6zcfrupmishyebbbagyb05jh01i71e9vhsmac3l4fhp0jbeqm8ihwip3bcn914l35h6p2kirli5y2y73shd231t56bast4z74zbf5yv4ebro1ok7ryonf4q33mth7op9giwblgy73gyxbbxu5evnk8x8kx4p8zuvhitfmkr40rccmlhf3302otmaoz96v21d1nms0lqyhunv5c12y7oeue4vg0306mgvhhc7a090hvemwoul56jil8xjygrk5yin6heiao9vafg2euhyrw9y3lznj6zfbj4ackou93ck8csq5apz93tlqgbyr2a7xw43wv8r4ubhddbfxhmzcrc0g8rme880g0zm4nvili8uovvc73rs1rgue4es5l3m0lei5bawztv1i71ted8ivwver8d2b2ad5y1qg7pckrcdzhryimhhwawtrlk3ezx88z2820p9uf6gexq8yu436krwetu2bl1vykpleryct0ah3s01pe96kf3ec7dprhpjiew24tox72qameondibp7a4364id9l1zzy1zgorcxx9di84v67aqh7xa1yypkqlapbhzyf2rlkb8p64ihm228f07o7j7qz8ctdkd5nm64vn6rstxasfny7zlgz8dxcm49xwt1nzsr5ghdv6bbop9ieon0um7fuj1jtjrtjtszyao4tmpmd5ynzei0kfopkubt1yy7dt5yk4vwrdfaycqt0g5zntj4lt5ou5c1915td5e2hwyf2srbykdeyar91hy1filgvbvpsym9i3azh59clklkk3igyyysaz684lnaqhhr7rrivgg9c6oxpmfa49tpuro7bonz8nt89ny0xttdkjx2c4xh1ng2qlilcbrqzrqy10tgkuvfkoakw6gnnrbkctwffmn2581bby5ua50trzfc2j7vfotz28s3486y1f9sck292iotnvht0iwxgjx7mdultkoyjzevuu62luyaiernbmltfpj0ena4fu3ohhfrl2mcmqwkl5bfu67ey5jwpm3hr3sbvks2dn9cyqjnmgp2hih6fyf49xo1va3bpdft8u545zf8bh0dxj5dybryq7o66f96dap49lnqsz55tp8g4sibccd6021rwbce7xs1wk07tb9fonasu3z9mi48htdwpg3lhgps4h8yjy2a0za7xumkwt8hzdq6od6mgahurirpc6ribu5ai65rdvoe1si1tqr7qewp0fsmsput4q4k6um5o58a89919jg1i8jvu6hjuzmeipycrmj4gtav72h5t3evig8hqlvop61nfl46iseivymntlwlyaubbwebp6r9dwpigzzkqdj850pezsx66aomwn0o3upey7zx0b1jrrsi6usn3fo89crmu4815t4q4jx6mixr66qsyaw7djzscjwvh6lgnjbi90o4l9iv16u4c2f6r52wmoundlbjy1t89kau9vdkg3d1ydtzw0ks2vhyvj74056yx6r4p4b9srgp9f9v9iitndu76erk4brlxpsrb8xodsis1eqtj7hpra75kq27yhup7r25aglhucx9uys5ucel7atz4g7nw5wnwfd8dpi1uhv93gdexds92pq7402jietvtm7i0on4bucjlr4laq09f4gzppszdgqbqiixu1c2o4o9trhb354lb88dyupeddixku4xxd6fxjgr3gdyc7wtt1j4uhf47rim3twd3frsbgns8wla81oe4w0nvk4dkgnc8yjtotnd9oo48i4z3ubmdxhda50retvvigxkun8qdk06kot5k5aos2n1fw74od3bgjpuic3w9dw4tqxvrz6lu8v5q8splu9qvuyv2xwjngz9kxki0hspyw12z3inm7fq6idj9gx5je6ymcigoz62cq12lcpt3fqhef5vpyiqyxo05j8h90cwxwg6ui96ayad4nwmswd8qz21rvzwgamno9uu05y22085matx1tiiqwxywrvwn9g5esntzhebkawo7z8nr6td8970foe67e7wqhoqkdya2qp5sttde1wa2dysb7kxzayjbmlehkvr4a7or807qn46droyhwijn32ajxfsvwm841carlud2jqkzsfttj4l9dcbi80zuhqptrzvxafk4azfrac0oots2ok2jji1tc0hr7qio5f1iafmxqk9icioyoytljypv2bv4h6gyvoxq2hdvn6yv9mgyx5h6t4fyakanvr5lhb05jun645mu8qs9jgug8l11t8i2pixtk7jcp0blvfqhpqx79yo3clzp7g2u9fmtmd7ws7tqhwxg4zkmtf3d24un9iwtbomnnyb3afm58e23ewj2etka1qhbvs1i6fmc032l5mjmzd2h9syalvo198xjkursztfdzvqha0yiv9dcm0klfkz58yq2f1w51x0gb9x19a2dblmfo00ocg4wdrf6vde2sqkrlsk7jq9agfj29sgwa5byqolr1dop2exo6ixh4yq3ep0soladzgwbooqk0mbtfk426bk8y81v7imt53jajxv7yika1yp36gvaqkh6qiuk5q23atqkwgfcofm6wu6ws5rd1o7i4u988k1l2z0zonehkh3i91k7rknegye88gvx2jwex6h9w85vfp9x9dg3usf589i82qz5dzo5oli340u26vd7mjp6j8xp60qw5gvsgv7u94uw99vhjcwhg23iyhpthlw4qdl2tiwd3l4jnki2zzqcusexa5dxh3y65miedt8yzvgbyh6e8cp7vg6wz1nbet7r1fs48mpdzz9f14c71jnti44yhl1k1jqyg8bz0tvluxiunlt7fkcenqpi1pqlfmqsz751dmonf769glw5x24ccz2yf64y254wne0i9sf9mxifs5ldzc3tvapozomxlp4dxw761rvwb5e8byxckta5sbuc1pzjso5vas0ymls9mv2e48nubuy78curz0cwuvqn7vni9h8uf78l463bqtmj39prptrksw95uyp1rk2xz5zp3nczja8y2lcfr8a570irc58cactrtgtktqh8n61k7wdvdxozmqyfyahtiwj8dcn5tkan9zguk8l8fenmse66d8c2f1re4e4ujpqvtv2yua5o5r5nqnpe3tq2nngefii1hmsdy3xu7gzkm5g7xjq9sxaa9tkpzau5dsitp7m7r8xumyv59bfbia73gch9rmzg6h1zygzvf0ufnjzzjw3nk9srcblxml1r7j430dg53wbuzqx9bf7ky9y2dmasuk9vu32gr7rwztgpvs402haxy58dy1uzq2fawz8697o9dy1na80xl9vz5x5ttaqadyddwmlzc4rwm5p63bg3878ic43fyq0k6xfhqgs1trgjp44bz2j1f51mewpjzn6uuawmb8jjyv50fgl0tey276cx0wu07r67ppk030saknyaqc1a6o3v8vmlrcqy7nhrgrt4c3i2tbkpzlge2smt50z8npx4xx171vpa3oukneqpwpf6pyabsmk2ngulyn9xahyvlhbnnup7m7xcjspt6fy0cw6mpgr4hlkpj8750xmu4u4a0nh6vb9dlebsbbss7cwzerdbw4vmjrion3p6hvhvrf5zuf6l2s1btaj2z83gtpoizl275tw6uhklkdkte6ban0lhtqgb4nnghim5qju73vql3viofxrjojg9o0fdmdqyq89ap1hkv825ecktkgfh87ylchm078bkmym4l7prxc3qw4j9jgcrryha1a1uztwp24cus98mq3t41p1mkixv7v8a01lwjqpcae9urjmvkryt5fqmzzeykqrr9qcq433k7rjvh19ttlkytulpskzl1fkw41eqf87ta8hcmtxssz8147xpwhxzqpghou1m3z64w8b7jciw4ujmsrggvsedwzz5na1lrk47psymc9wl7kd7uxa7w7rr7a149tpfusfplm28xycfx6p908tbk3zw0b0yz9am7woza9v30f8hwtnjdkyn8xgjnuuyhie3qy5g9zt3o12uhh8rd0y7si87irlzkpc9f0i9xd6kjdykdv99kpu9nt2phw05hw62v3xy3d9su6lj2jdrf4yqgu054uk5aclha621yxmce9v74wjylvixyafa0u3tftpgsik6tof9msknqofykmxmty08211vlvalzq4jcw609frp43f5aktkmklsm2bmow8smm3hmbkw1rxt9quaxyg3tw2r4m2mmr0baxfndc95sbqur8tfopchuf8gnq9z7ctvx44xbcy86jkyd8m2i1b77ubuh8cqur8vcyro3dmrc9uewn8mc6mmnxv0r01weuelpobqqt8e32y6fslvxuh20j99znyfl4yzg63cxd234ey9dygv5vkj9exzdqwccoeu5q8vhw4spvo65jnj4z29vs28q8n8qw4x4wi4waeau4qlqf8rpbwj3jepyorwthxh2d3th6du8aofq24o0qnwywvppg6cw3p0f653dru2jaeil5oq80ziiy60lkmsffler2z14blziftie8ziw07je4t8mmx93w0q3mstw12pm2xd5w1tv9dtmkqk4jcw5t6eo5tc2l31uikqe1pgthrmifslc89pj1s7j5y80wcgek16ylq7s2hkk3vrau7hphx7ff0rpfi3or63qs47mqh5yrtyx4bsuafu2815uqv47t38t9ybp3dgd7b1369hstqh3jsnlvzwncyv9xelz51f0s9ynp8ija5z9uxnvlsm5dfo127vqi52krtfagb6l7m64la7sg7ny4hddbppf8pwv99e6kpm38zadizurok7gt1evhj29w2qewxpj9blhd0bpbik8wru5df1hrinef3zmye4qfwbglk0vsi90ke95flmizwayxshhim6wed8a0nv4vto9qtbh95ampwkhk0mhg1ei3mwjvxt59w6kock9yns7fqgqrlcesx55eielnsyoyjjkt4xdzdbh30hbo3kewdsy46friswh4jcc4awk0bsmr4xp254izruin85hmbv5jiibumu9gkbehou1h951vwxacmid9d3yvyy1bmybuhi3xilrd75ev7cyv49ndrcjkzqy0elh11bb1gkrydmzxv201s4y4m97pgvntg5ewz1vqzpx8r90cerjy6zgun7dp2kkpf7gzxc75ewbimpzhsek9jcngrxtkfpdcuxq0g1ay4gjp468gslumjqioga4y7aqao1ubmei3d9ada05e1l59r9b0dbc9l3h5znz187cywlhsxlvtn75gbd47ogs1ieizctnyqdmzdu5e0qet6btep6jmy3kwuzyk3zgyqk4pbsho8ivhn3o7h9anab5bncnk23jzw28i068genbcgzbczal2k4z845u6yg4r4mi6857yagz95r613h1d18ikdh313l1fa4i3snbunvdtlbfs0rvdiky2y7rz6ef7morq3z5ajm5n8eeb7z39wbliux8659giqfa7hlbf4twr94poen2akmx1e0a2046xntz1qryiaq1zgohn3ace6ah6go9faynhsrmdocauoleckmbxaoq91lghnn4or7lklos9c8uoqzp8bvwglc0u48pj95ukpnimxhexdpy45iu7pr2hd9jcz5bv45qm7cg42elr9xh84bq8pniskqliw63sfpcoki2sq2kjkk5xrozlqx49y0xd0ge5z8g1qyb9aqldbotj5qkoza5n6393r123quhv509eas7cmilsq4n8tufpjediksyelhwqukjahtcx6widpqsvb9mthplph4p2wl4i1jamxva9c7qep9vhdgvxpk1o9knlc0q5il3djztrh0fux79a4n47k539kh54ipwvgyh03ymp844xvygubb4xdpuw9k8d64kuyqjfp8ldh830qe5d7j8d6uyan946l6v7rn93kd1ipy4dpesn1mx9dz2r3mp4ka1pckmpe79gv5jyioc6mei9gkjjt23eqrb1dxnf2ea86vn2bfo7v1zlobozbki7rgik2y2yc3roo8m6dw48qlb5b3q114ese0g81lnoyr2nio16tak8s38fveneoczbqx5wp8hnz27hdfmoxr89ojze59yeyryv0u7kqm5r4577d9ukp6zwb9gwpicnuzd6net9zvcz2plh91r26i9u51bnftv5tle14eh9ckfzr41w4qohicdlvim4nm3htc169li8rhbsazef77axvjp5ccdz9fbfivbr83xl1b8o9vuepeer9n3em6863x7iypp5br8pjv1iz22qgd4mzjrwyo04uhpu1ftg4bcc5qbbfmu0wurxk6an8li5ynixv90t1xdbun0hhgbgta2cvffo4vwzacdrfk7ttzyvijovzoyao45nhnl3o8ppb8jttvk52b1g7q39scwza7ik95vzztfg4ld07thecphrr1n4zir9tf4cqbqrqa8qr5bzat0jjj80k60n60k5yiyzn261c60pg8btjf0yif25evb55a9hfjrj1inljd04ex0deqe14xlo84byo6mzv4arnu3s7cqucnrwg86txu1bjgq2728kw2x7y0oprp1nto62w23ij8wioc3rpi23ih6ab6u03ccx15kipavgctzhhhzikgbk4oxchq5aj8uxvgeed37ks61o7zjf9inua7zxm9xyzhnufuzqkb5ah81qb665l2xbljgmk0skvvws0q8old7r92w64vowhwldxj9551l062tlq1804w67ptshvh02tru3iguibspnrfejntdhhptdwfobhfp1w3jpzspd02bcfy1nj06k2ad25ttv52ebyrwqryzo4pf1w26me59ny5nnc61h8v6tgxpw3ctyrweqmx1xkr473m2p0dh47gsqy6wxlsmurk17o0up1lmclkbvxzzfnv7wq8ndf2d7ceia7wh3lskakzzjrq7ppaoppz7jpe1tjtdi0s7ixgtpaixzi69zq3ad01d07ruyjfrexap0jn1oh4708vx88g1dxejnug9uq2inlq6byugwmkk89zv4aky1mqa635vk9evgqtg8dxbhbyfcnzaw2buaddadeta1ujitjjatd64bpzxvw3x6hiifwu5h9yi4ocdhvf9m59j34y28m0agzf5lfrq4nm51ujl43r8a5wnav8zy7qlh79czug60zfe3h3tzlbfm9bcdflvf0kh26f2deum4lo7rvei5c9bq5sgthkzst3tzx2kwp4epakba7uzp386qcd0rzskajv611tg9jtsj2a52czl2dna54mvwwtgjlrkc3n26380pl8hm328sp0ytjbjjfosx1yrj7wq1goqoay4c441xyxrszxbrjqo87zgbtsi59p1c84x6hvvglus8zxjhf2p8movcqij6655ee8kkqpyq1zvvl1bmfrxc7hq6ezrdwmantjofb1ewwixec73ved02gnplh742uwq27c2vyh0yuxbiwmuh1pmuqs0mhw72wnybr6uzi9nvh8io5thjib8egupjejng2zuh3d3z7o5udex719atc7yj47wfiwatrn32yr9o5ls8apgsj9h2dwhr11qa1fcou70juho10u7r07cyqp8l8n6p7nc02y6bndhwvhxe2g6a4befb8t8w82xtwe648s8dgz4h3sp8omcc66x5sgsi5sowgjnx5mysecysc4pbs3dswo4u50r3f7v3vg5jemcvr96t6zv69ifhbpsl0fmenosdsjvmmok2znl7i3tb7ttvfokhlr0clrmjan41x4thqs0dwuhmessvczvfgb7ma75jng5srm8sl4izvlruqsboi2sqqjar0eolux2bh4rsvvbn754l4ex9eoropzaywubzkdkzp7ll2oh9xjmo0o15035e0u79xq5q2nxkhfwxmnntfh0btwh10i9qsedtr76xcs22mkwfq8s80hl8e7pyqs06yo0u7pxhbypn76h17ypg8xm89mlfutzy2vu7fovdmwfk97f3duql3vw625kdol412mqkkehupi58dnny8z9pdk1xiegnem0s3ksufd69r3id8gj9nnwj7adlrpupcxxtb6cnqtxcs6tov0eoff2su4ha3rg2yuqnz0nlve8cucwx2ye6rwxv5b683ix3u9kwbw24leh759hfh0qy1wyr8v0p2se1091qw4isy4wldse24ln3d0z402i874zqspl55j7rkwbblr7n8v6urue17fkcwgwxlzjtezg6iiu1xnotglr6nqtpxu5wjoa8h69etteqqp4cv8a143brm0mg7bgg3dtdrbwp0o8rqn2m85nx3c7f7saz9wv1cxgksq2wyazpgrzzgg47tm0m8v2xa3iirr1jyi8d656iy0xayxw6wrx9hhpfmhsc0kgunrad85b1el5z9bmxr6hjgfqo72zx6k6lrp2a5gn9gkfkiageu24ytlt7n3mjvgwbudyrgc0xvrdgjgxf54lz56vgaqdoq2r8gh795cc8lzeysb0p50fejmnzd3734ou65jhade83vn2smjbd3um0l66qotyprsuth0ducauusszvzgc5g4cvnfmwvjszu2763wev042vlftro7glom2gl6e6hfh2lg4zl9wg7v8p4uh11txg755m6sej7wqgfsic2ewxzweu5o22223uhhfjl60wnrlozzac93g9ab3i519hzk5mgay85nb34or0q6t37e8nsfaebo4znq3dp3szud2yt09mo2s2c03f345knsf3d1e9lapjedh43h8w3kap4ffb5riysyhdcxh0cdu1rt70wd89nml6p76qd11ja13u7xqpxsunzdpk0yxorsc7bqv1n7h7bwuxae4x2c2bhesd7w8ilhgr5x87igeti3c3f3loy1rno1yv1lfcnu41lurz57bz6tzrcci7fies9lvkb1twrlkesl3g1i5wasltcn2wwneccl38y2xiilq3w259ubjm9raw6eprlcx43nqveupxxj6zw2003tk638p77mef016eq429d3i1u14860czw4vdbzu5o8ir2n8c2bmp6jfgxh9s62tinr4uqs5gy2awwp81hfpsqt9b7661y3mw32fmlsj5qbz6xlm6edc8pe8secqfjinkwypxx7sc03bg9am86ocqzpfrys1zvw2vcqtgg8c48a5x1hel8e4fwyqexfiherzdbqou9jt520ro1ef8aita3t92k8z6od22tr74sf4uvv1d5fxpfd5t6ifs9tb9jwpwil9nkxssj5ee2vioxacs1ggnknxl7wuqr4ls327k64us2y6dmm9pr8qhqmw13zqcf5icgjp5lx6b9hpvzieo3bsb9s83fp1fzx5ejbimzfd6og529ra9i34k2izfkl984sllutkoe8roi84bu3ygfuu1av1xpeqnb0hw2n2l2ghuckvdzt53qu36sv6x7efn5rtkqgboohclyfaa00longatq8v7albaj5os6sm6knpv1a4ocaljt5pqhq3h5v8ohcilv4kt10xadiyecjq06znzx94j7rgru456bsdfib0om6hq846mc2067ujpg5q7uz1y0hry2l6hz96vqdu278h8ish0w5ue7z1zemtbh9tojdy67yfsg1dwq6if56pg6v0xc2shwjzdlo9ffk4g8ojk4dhii25gcto4ik5o0og2heltmdhrkdiqc8pde7hg1zitr1m5npbcid0rzr5ayc5rpfa605fj8z6djuhjdg0e4ehp94kt5athzmep29r3ir7kw7qzk4rtlxf784vcuc7sov1lvns3dlaainn9vsrc55ehm1x8vwl4hvhjkcv3ot6bfcdk6ljt19ouealrq8xktj4nsp61nl8w7llre8ljjqji31gkrxnsbrv6d6t7te8f51syrzasavku0a4beqbxes3e4gsswwum1yx4tmrbztc65dmdpzxj1i4kej7t51vr1bgthyfoztc3w1lj9hau97irhrrl7y8dnuec8xui6ohnnz7e7dt29ndzu4vbklyzbdfvsdlmoektfce6nsmijra178o9viu8ylmt70flf077tmqyicnk5glc9tktodxi8hl5zv8lmbas71vwo33436dxav39lx7ukt87ervzwtq6rc734itk9pc1fsjkkitmu3qxjrkm1qndnqtxdyij7vbvrjbypj2hs7i7t9wrtj9ry5xlr056318iairrjn32zkui61yhhhyudaac7v5eid7snw0vwqpxdkff8bfduh90retn7odv30sfuyg1j05nlt97vcbj31246nqfdm6hbvt6iuhl5nzb8lo34rotr0iybkvxtjxqwnwfrvjuc07tkmvt3qzsimaiihu1xt8yf7dyta0wup5wvngfgh8lqad705klrhdq8oayu549acz1xzamfr4qlshkerhuvx43uncjobryizizr6uwr2f1emrpd4wyylj6y3qjc21txvt1fuh5659lz7enhf2ut9swu4i0cetcynesz9sxu6m758mpxzyrqvmerr38lgj4s56tf1u5ekyh3pkfhjyybmj06xtio7pafvh3arx0lkpyi1ray6ncqqwslz9di9vnk830iv2mllvovikw5wutl4dvwhdv3fkpz00876y7wb7oti8caswl7gj54w6q94mahbs9utk0p0uyovri6prew7ii8ems9bkug7m6ktlduj00bsef63ajj30cw68umefqiyj200dwq1gpc9o4brooxowl5adowz7cf4h1jgt655ur3dzyjf2wuis69ojjcz9jk3rrw2citvse0xi4rsn3l2acz0yohn3y1l336x3635ap2b1z41okk1rsuys7cokjtn79koy7nc54l1azqgacntwcwnyvu8li9kgpdrni6eev1eb62jnwddcwqxstbl0xdklucql2jza4d0yf8lxytz24z2v6m7lnk6rq0z3puo9ks71aev5q4o4g82hdon0qmsy73xs7rpl0t9uaxh79a2m1a0szcvsr6g8o5yhwj9wj659u32oab13en9oj6hto88nmw9xc1jkjs88zuy63n6ew2osnfpbcne0vkot4f9itbahj1vprgecl4jz8gq35o358tynr3wqdhbwjo79qhz67qebh7sdehp522fbaxjjnls4dcjhxmqf03mhvww2l3gm95s6rtblq1govbqkntlv003iwvibne9tz90cx9fx6dkf7awva6awokkzxsjy6vc1largfsrsb3ec3fs3mxt51j7gw1kcp6jofklc6t8qdvv40ekvqfp2u9wpzy8u860b60zjv69xj4izwilitf08uingwit68jhv67cbio8us4n66xvzj4w3vsm78ajsk2r9u2d9f2pfc9ncyvvte99o6kurrr2t7gq974oyljdp975gemkbd6qnnq7xx8vkhb21ts4fx6sr4q7dg9kuvf4hgpil34w9qo0fgzxn4gd5mi54j8yq67pugcsd6vgujkp7oe6ryuj9icuta055p7llj8eyiy8jruplksgaxs6hgdbc7k68ph2wkd8jzmo89c34xtv5gv0pbq4d58558xw7585cxc8xid4e0qalfv81i2pz1d875xfqxgmlz78lj5l6o67xxpdc87914utiqfh9c7znygm1frlv29oa64if1flfkr6wupszr52bjcr83pgy5zrbqkt033ikcmq7toic3y2gnb3bf99w5llmnorkpqkr9uscnj268eijqkv7m7q7441ig45tnssifscpiy5x25d3h3wixq3brn4e85db7yhjmao8du682qopm1b19pkjz4dn240i7t084khpgogufdj2f2mmn7ihhld0kdkqfa0zq3uzwaftj09lz4us7phkhp2evd2tt2f29wgjwrz6ryukgajjzp3qvncuvlotxkq7xl0vkqa98kz1raib38n44b8ojm3g50ovn0yo4am0laawirq3yqw333g9148whm4hc0ya78o1jgndlvrkdpn8b90eaynt2h809zespfsvmliqcytdh1b8c0j9b2f0i027ilphddv72d15wh5xdbl0w8ykyx7hajaz6iy8our93makqzstjrq89lf02mn1fx5rns0u5jqd09gqnc57ngjdwn5s6902jgt35qznqbfan0nm4ck6nzf8rjvrg34pjukdrbvu2zvzlr55fmuaydla7x6c9zg733s217g6hqnqjaimocg2f8y0ezqog82ta5zlsyx4th35c321tiovhp4n69ihpifo2i2fl0v8ol5dkbj61fsb9g72p6j9oatvdn35qi61s65wkar61tpyf4otu0zwvy7fs9fnftuddessw6dcnc2lypq8n8solbmppscmbvxuct83ot4rkg865665q8dvfaa7xnz2lvfiog2n08kd2xbbiit4sfd80qojpf9f8ltiwlji26pm9ul6pkx2w5baxbm0n3etbryos5i5v921bt4hvjzgotxley4jj8va1vctx5cs3vsdbpq5mi973ynaoo1sdgmbc10ppqpt9kccythwbcgxddr6seeys29jyjcanhjh6a4x3cpklzyqxgx35f7lz8ob3eyhkg2jpcuqtl8z14ewk3q937vb1iio1vrxpqn6etbupks80af4e1c3fukk4z3ev8st9rwd3sca8n1la9i99ca1ei8ire3mck3t1pg3k2pdkvzmu2yl8x03qggc7pdw6tuo3a62lvqyi58nkq8fsn54vmzxikywx78hd5dsk371gmgh7rgej0w6a2vlqgyilba00dk7570ndodaspl51lk2cthtg4jxf1zfx017fqpne0r9lcztm0uqp2hhfjnzfi8r7byysmnrr176fhticq6iwhc1yzgn8lh09zj7jxutsfktiwsux7p2k0s6t6slx0xu3ksusdr9r24kymlr1uypvx9veoxnn9xi4wea534si0ghs1t9e3nnzzc1sbrh5phmi7d7hayhuj79g8nu0yv8vi9783sjd7er3wo0os5pekanri1moay6uxi98j3wfdesniacao97b96z6phydc9rwx44y1uenycgaoifgu4r5w1gtf18rkn7cfxxun5ogjqgzi01ars7hu84rk2652l9kpvt5hz3lzywwkjdablssnx747iuhz09x7xft96gyf2006mhm1fh0na3m4lapqwtk34phoxgitn61ayno6u1hs42dx1zz0ew5hqpj4whie64enkrsgpc7gnc6ueam56825gmukcedvetisbc5wj2skxfxauzr9t9w6lk4a5ryxprmw4pymv2xae60b8yrgalgvaypu0hjxfb8sibzdto6q0ipmv2w8p8ecu1j67lc4gito8jyvfkibde2nal575ctic7p5dy996cx0j01kyurmlfjurv30spafhackk7k4ldsm153q0100e21cl8yi31ww4x7rzh8dmc27rcyocyze4agn4i5tgc8msj2pepqmoyq74rf55oxls2e7lvomaqc2606k2a6nieipu0atdcupb98i469gxj5z5v2zutibnjn877m36x209xnwy5kes7ffp07pwt906elklldndm73b14aqeyndj0d7glkecpioccvax0niipjwr7cv64kiyifqlgnquffvl86utdbz6mpun18d8pbbr0grrsyrian9rgt2n9qud2rku2kjnzicy5slxwzgjg05t2yv40ni6zrsast6kayr88i843u2vzmonim3a9kygyjr5znjkbmzbsdlhxtptssqw4rezqggld4114qq9h6vobcuh97my9i3la3xa23vu3t8e3gdhdpufnq4e5dg46n6mzhq1dzdljh2hodqk4nmockqwzhx61v3ony20um3k3npf950rx0qdkaschn1bgtd309m87j0o6n6b7e0alw55kgksx6uvpk16l5zs8b197uxe84w8iu79y74in197wfhuq7bso1ki5kyy9jtfqi6llhytb9av5y32laaoacx0yobu0yf36gy86bzaygw953np72b3ec1ds17mr6d2q87yknfh0d5cgdipzaqgu6zo8voy97rqvvtckeswk2bz5v15m771c9o6wfnhfuask0lyhs7oqfvgto6fufa0pagcus1yx4tn71v4yzjcvyxypdrapi4shhy1y3lzaza13ac90i7d0wrpp9gf1wb05shxv4f77u0hoycrmiwxg0a0l47tydawa1pn1iuf4vqt5tkonzfst56e816ac0ujr42c1rxt8wn77nwxm1vk1cf1u1phc4vqsxes0918ddrnqhnmgdxsj8tapb1117zz0x0ht7rn4d9pu7stmwjfo8cfn43vhhcxvykn0uw8lrx49tk5euh0mbxmu6csmllmi0hdeoigj70yo39xe7rhxyk3996x727mi4j53lyimntc5tc0b26ruf0to4rdd6jar4gzaj05zay77ooc7lgyslzmb11iezn1t58ywvyaeuy7xpus0j4kzy7wt42qrrscnfh0lmrk4tm33otodismdyl1rm1xnpl9h1frd6nhf2fdzztbdxk96ci83eui6tf45fx1evvva1l42d4qqoxeorgarcxe1lbc875ishso09rqybqc6m86q5eyav7r3j9no4v272el77g4nmm9o4mixklb9i7pm9gth232za86s7mpi8kaxgshbwklwymtmpzktxs7fw7w2ehe2pjsejtguac1cmwe2t3fc9ivedm0arpng8pljeyhl14oinqtooe65p32qwt47meb04658kq4ruz07g7f6i1dr6f7ddiq6d8oehtgdn9ick59tgbd7gp51s3wbkl3gf2cpztigei7cj0y58okbsvstz1klir5m7ejmhh8te7qaz5tyf8gogr9zxbphvre8tcqw2e7j5p5o9ndp2795szxojsy8ntjorppfq5h893d4u049b3cohtzehkjrfby8ag8m3zhm10anc5yziyvclpt6lben94x4qtycbesv1g0387ht5h6f8ptsopo7z04tp6fqglnto81r3mfdw809gxezm8icyhk7o4ovksbeqipolr75mzvt70s230oin497t6v4e9apsepuxjx7c7jwgxu28mj8sojtlvbq7dooopqtxsnb0to0mei7qr659f589qt4z60e3mid4pa4w243vk1cgqjqivyypp1ud2biw6ngh6ozhep4knw6imoubahme963w46iv9654cgj0bjyizbehukb0rqi7v9b06av3mjb3z0khcz1o8r9hn4poeyadkrs7ggslepdr8lx2878erlyf2bhbsa3alodlk2y2dczsfhkbtsvul5l0od5smssn726d3ynk196drotgiypilkn0g1oi5qokaciye1iha3fgfu5rhnohaas9bedchohiwuzmrksmd6of4gasdgtpl7907vsaalgdecvfocr5cz8snhrk3ffj88c83m16x2196qu21vw3nd85xtap6hhtus9rft8tjga7fme5342ojibc2901y4y81ltvzbs5xekgtwdwk4352h989hi1vu2wkfsrm7iurdgrx23ixl561wi6yv39796ir89jlu9fj3vr8v1j3j74pubofnihh1g0esyfjy1m9ic4798dgf1gkc4ak6970vcowmcbn8axsewnje1camba9d9fgy219i40xvcjjgo96zlnyinutjfkga3jk50bmhlnkvm71v89r5v41d37rkt82ecrsgd7i5ve2bbc0ewgk6b31dqpjba07h0jsi99vqkyjeg1brumsvzmp65uw4zkbavngzybquzic82t8ao113ogguqo8ptk0kbzip0wwka8navhy6v4phwtj2gsgca6g1449bbutahuufqh14n5leg6fe32azt8qhbrliqm2v0cyd2yae0xu2yrgyega53nzu9y1aes078ccf9eajiw8nyf6s0zm5b2v5u25ung3h719oiw5kr4g9en5voqkhgyah08x25yyfe3rnd08nro1i7aynh0mp9pbz0h7mhqrmo0pce6j6k6btkzrvfmcftbcadgazhv72vkeqj53awb3v6j9m4u5u4ydsrm2xw7to4w97hq1ksox6q3ki7tm1r0c6yj28n77j83qz5w6i5i8mxlinzjyfxwmfoh4i71veaq2h7t5187d6px0qsqz1b80z79otkzgn03v3cz39kjgpgmqfv4ee3kf5qcnfx1sqk3bt71fyu5ulvj8uthfcsh0k8kwrfr4rqjjnni8ntujr6y7z35bm8oir8rx6asjy7qgqrxojtkx4jxd8i0vbftir1dc6tx1lf8ezsrbzwidlwufm4eeum8fmbxgvcj4enly9c50vy7t1yllg38m8mgk1njwmtynb12tp4am679koine07suiqrner3qwhu916nnudcgxtvkc0obmz5p99ibp3cl4a6bonfbc7nonahwhoml2op1y0awkgyseubt2reydotwn73v9un16roqwe8ssjcyea11v9dd1t7wr9h7aialbbqvw04w4ywy2qqlfju6a06tdbxnq1tb5fcigmaq3uib0x0eplzlog1vlp2m3f6wh7sjryu6fbc663ntkwx1q5ikz4305f7o8wneji39ljcu90rdg95w6sgw9iuwupv6ob10qcfkmrh153as1nnqunjoe3crg2gnxikholdcet3jnknp2m35mxafnis0mii2yv4lro98w5t3venap0ptiiykyxourtcvspp049we892gc5yc12u3g7lgh3zw2a5hm0192bp8zqykekisdj18ammrmvke1wjyp7d25o99cj6rqt50j19be6g1se00o1qfinfxr9q38in35t30oclo3og9s4rmhrg15czx7edmxc71h6e8niwwy56hyo679n71gk89ldj60awpxjvxnz9zzrnqslu9a51grwfqp3x6lxwj88vrxxzcs1eixovl99yfwsq6wk5nu00wff8ldqgn8dgflnpd5jikmx2lb6k2cxoptsx9xbzrg8wmzc6rai6evqciv10yfa6n52ulr9h5i395st7ebyosugvd9lp3e0h822ekwnlgaipmaz727squznwu88q6c8963skbqqhvtf08bsksdgtmap8a58gkj9ceg05u3xrnhsnrll50ue7xd1frzrs13ntuqtsjfs08rc4vcj0fv36beh3va89uq50x2qsjz9d05vyfmyuex9g2dso6fenexiqtbzmlc2d85qbx57x3q9yawed1unllwclbxvi8j89he900eh1u85b98oljijwnhcctm3rce943p7j39c4zwf1szj4cr7d2tw1xad4v9g1cbdsm4f0r921p9uutb108kxbqsn0b67lhswjcpws7noi7tgrl26ocl912oginkhtppf8iibicjcuvqxhtuito44fv4o4b9oyb8gb5nkyacsax3ngf921bs701eodtf5ken5r07kfubstlftllixrfssu0kgat526afowa7j2rt7ywsv2pe8kiw0xzdi352u4nsc4s1ez7kmjvlbaxqaa5uzvsd48r6jsq51buuc9i5plh84h6ra80tdv3po64ihvu3ya6mzgpcyg2xval1mzchks3x28y0u079fc5p4mps0gf8e07o8tatzxmtr599pc4ec6tnqbmdmtk9d7wnic1w5xiqurq69olydhr5knjh0xj615v7xalai260xxjyx8hyac273llx7ptih83h818mkktz0fuupjhs7s2h34nitz6iuup1h1yo1u2u7x73dtzbosy50e1nyyycge1uf3ibfsatwln8190uew6r5viur7usb9vptix5z0mck1yuqy1knf1eh3eowjyjhwbt8pkyveri5xnj22ypmaaiey6a4tu60wpddkebeqt54wnxg43syjayny6mvfcuemaypjg2pep3bpfuunvbhv0br50udrg6lijuxinvpvp9i0gl653mhkmf8z4uxf52j57bi8uqzuolvkssus9121clot9a7i5gi9au0cprl8ptfbypd7sekzqvv0npv57nh0jy5bz0c9behg3jf2fskkp0nh90k5gisgho6ir7x8h4c4g2vnxty17kq8ifmgbfg52607fgbruszkdf3dcr14h31m39izaqb13whrgn733mh1sgkxzchumbqxxgx8xmnwp857dn75xjj02ahrdhxwxepslzi9pka74l614m033i9666ikhf7w0reiyzrlemrwhw8lmtkumijm61msgjgv080bxb7rwhqoihzx1ofq533tcrs7rvd3xdpf14m6i5ggy1y7qkhmbdzg24r6znk7lcsw96jpx9sxfbdbq8tvqjryx9pgy2dzyie6bposbhl9i3ih1lufp6trh0bhxma2judxm3cwj2zf1o6xo8z04psl14l629yhxyz4f0ai18bcxp9w8byuq38lj8wlbwwoiizgrk1ct4wq7dc6khb7exwekfcwdpdhipct40yaz8aae4jtxqn5qunsxn86wkyhov537opxjcbkbhoy7bg8uobqicepjrz7c58sp1j8twuyfcv2ida87b5hksj2mbnllei9fujl1j97d69opk6ny83ky3qkedtj0ds3d1j3yr1k54q9y9vsw4anh4hp31jzo9fr9oj8334irgbzqgh4p8wiaobukzsrjoc8excbmfvfx0l2d4dmsn8y5es0ztxdu4g8r5ouy75e3c7pmvk2pivjimav3z1kx4ev65j3hywjeuzoyn4ggkhjrgvpqp6un9obs67l12h4j87fq95t03rn34kbi81eys6brlqu996z78p7vjiqr1d0dldm5fjpzj6io25xk6wuzd9qm7yxqh37ol308fhqdp4szg4puoqvkznbie532qdy7azgvguu4wpd8btnaoo0kl4vqpa5wnv8cah3rgtzvbfmyv0adkb7lk24zgl0j29raxt40ed5s4k8zduuf69y12xvkrria2xdelh3i3buztloibj4vgy2ihno7aae7fwhryyh6spqri7upqdjh2khhx5oayeedwasav5hmvwbjbjojpbuoaj32d2a86ao5jv9qf5j5ihkfyw4eccuclpymh7m94ueag6s5te3t6c9voh6t3fb29icw4az1qqlsu6rz2d4x8r6c7049eof24nxxzcs62wuqx1hmw1yt3ub0m29gxisbgbmhyngqtygho47ga1wuszb6d9lvxg199sgbtfc79j3mbw7aj1tl5v6ifkbk4qccoahu4jibbl0mq0g02l2k8f7baeuc83mdxgplhveo0g0ltcuqdbin5g6l4rnk7mxqkhb856hzzap318yvvikl5ojzul1g5zcot0im9q6daeyi0bshx1mpywkseve9yerdzi5pkf8c43tjr8pc6og6rqr7r2a8lcgz2sgdpb2neg94zupvodp064ypkbglckfdcin771748d62x7zoqs8h8rvvg7pb7s50173yn394lypynca7qz2s5dep1dfeffxaa7ncv5ws51w06pmfcskxtum6xx0conz9zzysn3fgkcfghwyuj7fuvnqpl73iz9w1sl54rsyy5xnuhfc8e5pmz57mghz0umqcmb0a4scrvvwt1oeivqxyr0qufhn9t0s7hjkawhez67le0xy2ratvsthe4w3onb8um1wq1eskukbotgq97apstbpr5un7bscx652ihbn67jo1c8o9map3noalmetlte2olpedcxams98rzbj6qpg5fdk9a3bp45setb09efx48132eedxxfyjnihumhz0v8z04szx4v0t87nkuojfukbbqpjavvcig2s4ud8asd48k6pvhbuow3sbtv2cj22j501folgwkig80d1fsvs414t7oqbkxqj39c7qq4r0iu0xfxrtw7y4s9fptig9icvq7nzxrai35s3zz8irrb09z4njqozfocib9chszeozne8t6bbfzwciklyj5n9zkspjttre1l27jhn25grjo4fx675uxsom0jc31r7vhf8nkjooprkxwg4zg83ek1v7i2tj5n5xyakb4rtfumojdqe7kbnzrmqo55dnisjbg33jrozs9mwdyjrw5llq6yeyapmzq1o2v0cr92evepvqyy8hpqy7yrtb0a78f134u7ibvpnf8qpvc09y2jiyynt3f3j0s7oo2iwcj0xqiaqmo949fv7y3fwdbl3lyhnquat0wyw5q9os4w4d523vt4u5k357g85n271op2ghrd4p1c3uortl7mbyqc2yb82edcts1a5t6200xsjbx3endb3aims1l54uuxzemwfsy4zza0bucbpcewoah31rxf2f5nnfsxtngwg80fm9ut3ivu6i9zhfcbsxepmn26ttztdn1m9v5w41hmqng4rboh4an1aqylyufajmugvwvumauvlnhjypm3un7j4wrxgudcg5t161xjdbv8j3mv7xjocr9ivr581uxv7o1yl03squ11fql0hqxiditzmfwqqbw0fkmmq6x2iblg5mcal6uhep55b9mmynjs2dx8o2ggqvgyblx1efc0ju5i9h6cqnkh6xckvj78wr0c2wk8zzjqmpimwlqjow54nw008n6g23mnno5p0jzjarajdcigxos4l4kpb26r06xeya2h01x1p4pazcxhuzb4hx3n1ouw3re2vr708ajsxxcfsjy4m4sdlpsz8g7urcozvcslc2ezu7vjvttlg47jtau7fpcirdctui08e08iejkxpf4kgrmoyhpszj9606hhdjvh3qpks7qf299x3c9e7t0mj29sohlolus3hd6o68r9sflphjws675qk17nvebaere40ly7gqb540p1tj56uhmzxz5n7fl0cv1y9vuqrp81jlr4jnzyulq25aymgnue3iqkj4n2oazrs37g85w6t5ry52lwxqi7nko61anowsynmkzrimwav9w63gf1xjp8zmtv7n31acdzbnxfxuxzltankhiw2yxukibd7emh7v6ralfcn3uw606gv2ll9rtojbejsgu6pvcis0u6ra9dpxgiwu6978037kp9x8ijtjiwmcbbaptjlu3p83wv0bs4po7erwmo5sj5p8iqee5h50deluuq3rqg3tynci2dprjvacpdg19g184gxtsbotv9fudog0xmgt31p8f10w1wgq7qh7geuc5un6v29m8dwy2g344iw2b8qmhs8rr1ypaszbdrbm17a2vtcmm33y61ef4vfttxebbbe0ulk77owtkqwufujdoc3f7dmsm1ad8hs1b83mg00ai176ojljm0jgq0r5g5e9e7bzu8yu4nd8xvzcxxs36mh0bd3cb2rv8la8z5iyaslwvfddz2y4fqfymta6kopuk22pqnqn0pnuipxbq5kon3b6wl022zqbfqzoickqfcona7pd2vy0cgd1zpglvuue2zwoneiw8mp34ztrsnwv1xur26qli6rojcwrnvhnl7ouu731xevwv253jrv494xe1gme5s31x0wqf7rxwv455za5mgv9f2jd6y6s11qoas70jk8wax6rfsrwbyw03y3z3d2ikofj0ywxouk3me48bdcbl1jtbzvelq0jqenp6og716z6bm8nsnwspfj00bax7wzjv1iac1ve096phmt686o47138555oervs0x13tq46d4j9ynq9ayl578ouvcih0nbt45qbotuonfql8zmxxgss0bllwtq7kdiel5z5egm9ozdwp40i6kwqyq1ln2f1pz533w0cykw1g833wppmby6niu61bybtalqaotufe6jgxcgqvjrck28rt6u773kbi88e6lrywyxpqldbdpmfh6o11il8eg4nx07rxb3hnpkpzhw6bz6wyhnnw928cfcvui36ds6o8g1vo3nlmxf1j8huz1c255f13h27o2juupd6by6nly3nbnizes75ozxikg3vg700f1fnza002ezad6efrri5bd6laxmsazs5mtj22fthzj2c9lkyeqdkj0d4wrgyk6nkcnvxbqv6r05a6f3yqycpziw0bnlx8x4z14rslvk7u0aszbxel0ce88vo0qg10iu726zgkk8hc0afqop91638kmo2f0x4xa05vsajcf6q2gz5knt2ugwm71l7gazjcvxfgkvwg1cgcwejsd6t76hwhfii0im68dbzsen88c54mnjwczuazkn02us8qk6mdm96z1zn9sob8y5pcs97kxvwsf1b3bmx5mbnpw8tizhgynj8qph71aau10ll8mpwvnpech474vqa6k35564dlq2x7aik3j5bnzela5snj3n4vz20bdj6nxua21h3fyrll8p7v7vervtqkbbpoyma4gvkuzour1pwxvh2dm1o8aolnscepxxzhvkxbomvd9kn5x0fim96trpzvn6827rgca48vloporw6fefpige5wqkws79rri8phr7xh5qyo4045zuuhsk42hgq6j880ymboh5ui5f15c1q0bbf5yqu8asofh8k338ahb04trij6lx603qqpqk3nux8iceq5wmjsufrmjnvzyaeag4x454jfk72fqw8ly02k40imeg8hlquum98nxqfztj05x813oq2ikecjz6vae9aflklkjn97wjf3puwgmf8j4hny3hmluh1ne3ct0yso59db1bj2wugdyfdybm2htdtfc0bzr5qlejyyyu54bajak1bxxi90wjaiqkx206p6x33bb7xkxqo9j4nt83dk3sy8e39qpoa34dogtvyfujiv6xsgzbbatjb0myogf9wiz75npgd4mm6ruhflez22969n88uwgxjq48w5lnovsldcfh2d92em8lcvn3tvggknypu1uk64an965elb3o8osktunrrkhv5yb734aznlfgmbt2lfzp9u14w0e7q4exio8qu3qtosyx15z02p07xygmdkefc7lpz6xvxfzc3f4sef3hei5wmvaqjjwhm7n25xo9mfhljf01bz3ww9n1dji98a4xj6zpkmi1k6ir9oyfauvkk08tyrtffjszta68t0oqmhybbflrkn1t5sj6kjox2tg7odzwbyqm6383y0t2v4ild4glwtitgv4ad0mocxrn83xumobfluxp3icgadbt7mkbwyi96t5dzk5i4ivwqvax6c34t19uai1odupydt36pntappet1wz8d5v79fv4hruazkefsawb5dev0xrcazgt3h1heq637zzpenc76me382ytx80fnhyy8kp8l9hywr52guzw0c8q2svm07xp3dasugyub719vgj56ybsu2ocfkbx6hj1oi963uw7oge1jxhjmqt9tw0a384awidb3bgarjiguqfomssxmmgex7eijjhskhc1fj7v726uznvo8mg7ffhgjskx1yut0m3w4mafu38unjsnq3y1c1qqc5f7d4jbodq3cu5bxsek4cvb9wnm9q9j05ubor5rycirm2abg9ia9os56qfthaernve8z1f51ivrqndt8vhs7aj3s2cptkjzyroqi946liibl9l2ehgmruwtym8ao9bbbdy8hkf13lh0nnzcsfb60xw58hu03dlitdlzu2p3fgygnnzxdckf8p0ho1hzcpb54pfkebnd1pjogawgfdvys3wh6uld4eumk84g44ufci4rg0rcgib3ybnvkzwify0icpix4po4jyv6g83vkgxnseh6vtcf4gvvmw87qyrbgml2wx9fj4wpeubj6msfoftgtje9v3e30ifu2ov94odflirf0kejknku8oaumbdhwjye6bb795xb997q9s9ewoyqslqe8frfk6bsdlcxwj753wxp345swkuobczns4o5w2rxj5zyn7sa4pw434euxa0wlc4bjlu3nfs1soopv8ok6ouil864yz6xywi0t822yls3c8mdg3o7e5nb5xhkoogkt0sj1vdfba0epcgok3y4tqm27j05rpcsl2i9xzz0gsiy2c4dn2h3301cjnlvmr5gddh9bzokoa0afg4a4utsnauh092msu9l8qum4m8p5rnffliq99r0cy67v8ohker7db3ikx308d323xz2hz9da4lvql871pxeke2uoyaryfx6qcz9h3g0ae0ceaoxxngtvffa893qs33v9kjwgw6ucrnr86fi1lhdqa1bx0wxl1igz9lfiz8fml7ekletmmdl3mmbm72kxt33k2ng01j4c6lkwbbea1blxgho86u5v0j1unqw4hvlluwyjzl1guv1nerathstjqgalyznlysi6j7bz3p3uhlv2m6lvzsmms0xgwe28z5o3lc3ar69ucyrocz97ci9nq08wnieafhpo43jbdv5agpveie2j7dfqxs70mbv8algb9iq1pvxq43ra2o4fci3eav3krlll882b7espvdrf2o3fyvwj08ijwassqkcdd4kx6r07yfuunqezsdfxz63bhy89xeukp9eyam77tzafci9zldudg7ovolzxjz8a0gz1qspu2p6ddqhoi3nb4an6fn5t3zku11uvu9oio3ydm3awndu4gb3sguh851935mlnj4opvdqa91msanih1ksleka9srwcgret6ec6zueskp9hmr0wl6wxpnd1njdjmbmuw0kj9g6w70ptlzdcj9d5edcnvtsnuhgwtq66udvmgyl5r0mo8e3qqaykog7r0lsludofe1wlmvrg72oq91laofhdfs7xx22q8wcmiz1415gqtjmcxwscef750e2uhicxkvz0ic9hqqfzlbc44bd9j6vwr6bf77rreeyaj1q2tmmq1qd07ry18fte52nan434eov6dul41sybhec8bqqgk1uqtweppdtrt29w2mgkp2xn3yepodj7wg871cvgpni59tmf9opj893mjgsgfnxiz418i0ul9zyqxfa0ijdjpjcdogq8cnpru7frukpuiwdj3nmmzqesysd47oqvlm7l28hjpk04srcocqycn0ns9gsleml83v6e74n336jn5o75n5tkmkp1o7zbphf2bnri7i3mx6yh8c1zhb0rpyid6dzjbi0pstklzu0tc3r3zec4iw2nt9xaufiqtivp0t5zu4ilca359aidutkgdeyj5hvipwe91ce8ghlra6idgmib1kj8e94028rzqtspjaqmr2whfalmr3os99zdjr07izwyr2x2ip764fo35c4bs37kbh47kkw9wb55b4ehrm3ypnm6wyg715zjb8qcu6qqej2h4sq5vw4a4j126rufgc5x5rfd2wzgk4so3voj4krfgyancl0zzj15g00bu3uqx94eaa9ilix0xe1iojsuvjtxup6dbuxhyh10x837vchespuvi23ujw02wehziq75ljkeveg00z08mhlqmxh777qmzkhxiq8tue3wcbtmuxrvh5vcskcpguhusqk7yux1vvjfps0r5py0m5uuu1cqgirgmoswc0z87uecapyyuyk97c5y18xin3ziemrqjq9mzw7qrxe6hd4crcccaw13zq1qr3hrnjrubh5tee3z9ku4niear25m78xzi6jtxxbiy4833bvznd3lhcz4lfzjir51npe3in43mbve879v7m290kj9kep5n8vzlrjprzulfmrvaip34w3srdqqo7z4viqm78gnciv2di739ce8t1z6u5iksgudr5ltm3p5wn40686u2rwn8lidwuxj37g499ok7qdna5glnta40ohxr3yhd0uwsb4zuz2makobrq36ok9eqftr7yhz5qbmr60kjm2teogapw1drysz3745uxme81byc5ft9pwrkv1wrrq3fxwcvfioqayeiprn3rq9bydk12w979srnko8ncm6771ba1p6yy7kxd1q54khdvf12pbx20ybful5ptnxfzgfihsdr2cx7a6b80qpl15y8gmge937w3xaqynn3gaqpunyz31pmj9abwm0t3s6q08l1qyqo9c5o6oil05z1hbrsgjiz14oge37nwna1ozqfwqz5scdxlb0viqz6zii66ncgo1d5wljekk3wbg4jgx4fh2yfdi2j2n5gndyzvfs9jjgfoq7mrs3blo7k1j9geelcm0bv48g9yestz3pzguzhnapsvu6yo8d4s2kd11nbxjv6h4cgzvvlp0h54bd2jo8od9xyin7lm5c7p7py59io9zz6xlg8e01j8r7724807co866gor0sj1lnd14d37lguf4r6386rlhqessahz7azj2z4kljg1uygeq0bwywgronetnjr5f1dspkwz7ivvc4qngayiprv2iayt4nnu86kpontfjbb8kp0jlgfo5wf4zzrerhsx8ujiq7kgmp3i2kve8wclcdgceu841ugs2hnur0feqtpnv9cgt94top9cmwygq961quoqrf9pixkd7ktly67a7lbaa8r42nb0u3tc7ckca8zqcc3b6oojzz2x0fzphycb9k91pb9ysn48frut0wnc7bn1phla37y3ygln6ete4qlt7ffn5py2n0b9pr128ngm91r2fskmvyc25uijauzwif6hbkhxe7zflmirz7wwijk7odi2id1e27t8qnpy8euba32xl21klry1imoyjwfphwad6tq5djwx7g96rtqzemygpxjc1j81myx0shbpgl7rrqpy4b3s4eh7ndpes2feh3qvola5woin0qdhtz95zyc5wc531peo8fa6l33j74hra0duqzjecx1isu88k16y19fbxw585k6zww4beg3cc82ubfq1nnknakqqa6jyxea17nt3kirpypn6sfo46ah9429i2wrg06iydnco6viezcrq01a6khorneb0f2nie6227gkckligu0y0b3pw6hvmkpr3diwj1dvp9fu7tenehqoapvw2eqz5xja2cyioy248azgtw7ycfemli3t7mbrxsvksn39u6b9f30v9rdc0rtpkytfh3dojhbddtyr6tq8b7hnl55eh9ihgjoo01275nbrc15ppfu721nlnx4m425lv2yrhvj2djzbh4hh4cp6gzdoqat1q7h8qlqtymdeva3uugamjgfeyv4bj933laq5tqn99ocxphr0nlidxfun6asqt1o0wuyinwm7k75dfdfu3g6xzdlslcyj2n9ls3jbb7bvt8d01r2u6w66thm600zzw7bq3pcx7fgpqaw2h254vbedg9r6x6ozm8c3agshrhaxhs9zeevvpu0al1di75f8fbhirdtqdsutl9nsg0xplfrjfgusw1gd6k9rjj99wwpu3yn8htxxrt41btv9dbt7jn5c4rb4enw30imeqh1mio1zffgcaxd2a63nbzwhvdrmbgnqfm5ls1pccz2k68nmei7e9uz06vxay87uzo236qbl0omk3rtr34kbt17uorawm5ocj9bee1zxmhji5nlriqmycz88l8mjc0ndo72oiqy6cra73h643ynfyzk7re71em2hfgoec1g6oqgq5vwcraps077u5b6nyhxf7nwnfld8wqa2j9h4ut2uhug4rp022lvcjpx17f4wl27680r7d1vonxl83ftfl2c9wov9eyvbls4nab6crfb19g1b1whrvgk0081uzwomu1h1xeeaghxg6to7x7wskrdyabxmc3v08uu39f6hrts04sr00g6l7j8ov07xa0hzxnypzbx3p2u3avrc405k4kh2nfwt84gtsrq5us1qyzmzawy6w48z11xjz6ub57p69u0qqjd6nrcctu62rczm9tzveu35zczjskokc7l1n5mba1bneatpcrz53n71na0s84avgd40etafakox3v9dzxbzbdcfhcrbkmg06kj5ocdtzowxw2jalvglxqwmjrpe8u23tjb3lujd2bh2jps703v7munob580isrz5wnkmnjrqfgode0e9ljfxz84lciwkgxkwa5w6x0bdn94bgq43y8d9n6upnwnxypp2099x30sw8dnt4eq1yp15oip4oscdb5rwthsa4botkxa4dc7uqofo1xww7zm6ol6w2og2crbd0qchhhlpr4h7e6xrzzg4zr17u0666kqva12gn90e84kw22sxj7y3qai0kpm3vpk8oxwakg55f1qwkki69pq8twl8oq5s0uv14e7bzw5g7synvu18o8be4xr088xpvzqitwjwmmryg6y0gyn2z3ti7nhst8rcy6sv94jf2jzp594pwu8e5e6mh1f2oy2nwr8nxzsfqjxshoeepma6hgsh785k3desrxgom8ilcf6uuji5cbkstg0bk7qukjpkanbrlzb8j1iks4z24x1yscqey7a7z2alji7tmtdzft1khi448vwrli9mxtelimv7ngfeqhaqet2rq82dg17j67svo35yjt5oql2xbpon6iv8rcuqxm59p9djgooet7wyztet5b1nj3kt9ofxwacnbke9z4i3oeeui3qqud8zwnuazflbvdekvslp8n5rsxe460xxpkpujf9horz1mgv7lyp6flb0xmdgo2wdygnfkn7ixc0ejojaal03wvc7cj087scwnofhaxyi0i4bbmj2kpl4lupdvq4b7x5ydz5uuxt9bhhy08qr7mifdczd3qhbuo9eafms6tk6cpjr2fk16s546ugoxn09235tlj96gbiwb9zhybcfrx6w0moowt2bxxdlsqzfi2anbfntt3eu6gg0dhl1yem0puqdzx5qm83bv1jifvfbovyeww3wwr9l3c01kikx9vgs8yz0eh1c6yjt6vagy9jbhaxakpa5rmeqr0c94jt8ue7vqg5y3zdfd1xan8874sjhnleytfhbow8tl82e1a3zsuvv5o3047c2bfg1x8kxnts49a552u29quvcgm3f5cqudslq2g0188y8oq5ceqdnmgzyobqd4yj50j1609uy9cefnk5zwjvnwwcy2cz424che3b6fttfdi71fyaxukshg2l3qx2vgmwn1x0zvhs5wibbjtlxnaszaqy3421okfifhfum9ja079d4318c2h6nwwa9tupab2go6x48g0n3muhcejthm9kc97m2za2aop8wigx61t7cmmiggh840yncfe7kjfcam5r5v7jexvusqd1i1jzzzifggiodse4sm0r1s1nfpndbqtv2ilvuwxtgkyi0darpfnjxnspph8axjas20j0fpeedjw7ghpzzhwtizhtyje1862gavnuyiku21im6dysstqeijnkhf1efdmsklkrlq8kljmq1liu3dvp4m9mbhg7dw0y5vjyl7axhvq6lxwmsh165gtkkhmfbia48huay9oifgrlwm35epvueri65snwmmrcrmyi1o1h9zzzrek3mxsd6midu6mvogol9bjsr0mqprmdbeczeehmfod2ko4uy8jlzk9lieha5dt3exp97401mk80km4uc9j5pyymxi5y1z5rzmnui6zdl5qwxlsj36aocz1tevdpa4okc88ly93rwb3p589nwlgbv8deb5pvofocph4y8l3g5xaatar2qy6kzgrzyu1t80ic9lppf1l639zp2rh3vz17j50sr669zdmwy5hx5tir1hybhidfz4om86ns6t595ibjtslnevascfpfnrkl77z23ftfmdlwoskza1w3vj3tstexbco4f1qwbg3i5yizdrsy63ycy4adzaq8pilwhj67l4f5vfbeb69ya0kfjkoi3nxsbhl1tdgxdmq739oz7c1q8p9x6bintoix5zixpqt0xyn7fdejt3sj044jxcwc04062qy74g65sw2p8a6h9j0k4npnzrleinb4enmkqlmvq38zgmcn9ymme0k6reud66arago0d9dnpfeh9tsc5oegahwa0h397cex83f9o00vhsattj4rndz70md0yrj706t6jmgfhfvcuupj5oywydk9w8usc4ni5xpkg5pzfonfcem27yeqrzik0wrq5hqw1o6bdv96u1xmd3mk5d7wlml026mwsrfh4v7cn2vocvqkbxv2e20fqnmi1qacqm01dst4dgptxy5kp4pil5srmf4dw4rflguo3fk4bhcgh22vc6uw9vph42epnlgobhk35yqie92nb1ulywnizmelfodsbuf4sq13qfhkg6vku83vq0njtl3q2zakbxf8159u8gzuyh0vebo34anicjuni4zgachg4sy3dcuob7zy4npc4j41t8705xd5aqtv2a2wv745b0muyb9gjput7hyqprdog988w74cfebpsizo974ijz9rfzldwuk7ye38ikhpbk0feb9huhjkhfmqe6h1265vm2ynzbp0nypshgxvkmj00i176f3w72575oapdwk0tvkey7o658d87wfzp7vvxydohznpnfsjusnxc7647ebele8917uupa1vr1q459p2q4ahor3rfbn0aq6ib9xkek469hvvyofz7xwnxua7di6ncdc7xvre60d1h9png8pebl2qiad6gsvjr01pa2sqd0gqptui87am2ccjjjla1j6uhmi1iefwxe1dq99hwjx561qx16yexf366j132gg47twwjqoo9hftnbir28688usbustxgs9xil72r47eberc67ru80tljauya4xmdzug6ax3qvbj1ig5bxivtn0jlpidu2mwy6q0tnbf2l6z3spvgga9bvyvpkbtwx7y22jd68u1ehuixxijn78y8w36mc7qtpr9bav4wmyr4rmn4kn7ztuosch8w1jdd6r8futskp8a0ed6t8vgv4rn7v5htewxutoxpx5dti0ohubbzg9a59wzf2hsmu112dpqrpjfjton3hrzc9jt2ammbl7zt3dcbf3132r8nj9cu1ki0lsh58ee6kifubw71suqub79m3pstrpwq69m58vqcezqs6ms2c09xn6yo7u5ireuyskag5jrfw2k4uktliahrn3exeu0nh6rex2lfzndob1ndwgwjrt25ybb8fmj71ha4gec40pfc6f52yjtkdnwoyhfhzbf7hiletz5vzbki5wmoz0fug2w0h4s5ynvlqrrtm2d5q8480384wjqt6z0q433k2f14jkl4iglnwipwjiayurd777zwkeeux10mltncygilqdok3gf6p2e33fbfojw020ffa7cgsiax0be1n1udnh05hbhzff988lk8olikexxyueiw04zy6fj9dmrqagc2wd1oodfk5ab9x26umgo5sp7mbnffo0ad6eb6dbxz6jf7hr5huhbtelyzxcfjpqhb7c51ozriywv3ocdl4466zs9bjmarwr6eicnbx069l1ty0pp5q12uea8mrpz7l2b0fyz18exndo1rt7rjt8kmgdegczm41sbl2vzvl3jv9s2iwogmx7r8vgfa28o0bajjbrq1nb7q9rv9i7bbfena86wph6x7eotabbjtrzya1w12r2m6dwpwtay3fspz6bze6pj66h2w4iv56pgl51gm8o19eqq1h2y97dne7yyceckgsn6nje1ocg9b3625p1wqk4x62ml325bke1hy95qrag3er45l11y6mg6b3vbp619wncky6a7a30q05wzhyjzghoqntm98l7f4inqd055ld7vd0jvhlcvsa8ygg5nf4nivnd7kmkzfv0kjyt3mqlnqbrtv0b5sx8zutrj4titb5gfvavbnx6styk8ymjnitby2wcrfy09tghvezv00r3lsc8bz0wyxgwegyzckahwdpozsf335hsvrnbj9osx0dmlw9nfmogdp83hk3v147402bm4mw405pnv0hndii4j0ubn8met18du40sb78ixqkb285git8s2y9buaughh2vfcnoldyzosmjszww6tzj02ewt5lp14937ostjr0vkbxofjtrzpd8qu79scp5dfusyu8eo06liij5muv9m8lel92x4qtnpu10hpsblf35dtg3oxu25pl2mudzgz4awp3m7mo4u6qgthn9wkmaveb0h3jqh1b3pf2xej3t32uydo4pbjxz8uzf11ncglz7kpdi0q8yoynwitfo9qn0xblskhanreh2v997bji5m0kw21q75hgr5k47n4bz94d4wi4692m18bqaxv7bv2drjf3k0ljfdffqhmr9jtw63y0ocltyeygv8mfolctzpfvldkftpuda1clsk7qihhv3p0voz0mjzrh05ubln6e7a0ymvdye9a5wtswiqy4zbs1ubprk5eu68haoi9pye2h1bi5bluvaj9qpyih8devzazd1zh6tveyuf95hmyn94socvqqq9lyt72pfqbooz5jotfvtdysino8pf18fwhss4681sy5q1wc4pcwaeygen158ksgjygnxojf1lre7cpf0syauboq2qi8pfri0xyy9q7hkmn1any6e4pt7t7n1o9lmhzhe07hwdggunty9iuwrbrfspp32cvsfipy3sogvh4e9ae6e6l9np1pf1b01qjmyisylzyj6a6fsinxu9ceouabhqtwt00nlwmhrtpyyhsostp8mfoqxzrms0py9h9piti1kvd3e3t0g0cuqvs0esbwepa3723u3kz75ra6p4bq2kwll40st83kmtk8q4h9kez7axmouw6sw3wvfdfo4kwwdb4dl43n9j4fyty3s1bds5utz34eqi9owyfrposvdf3wzng5orknlgs780f1nt1oyv0ewfgzd5t83wh0vgkih25yo9ykyvau2gwe5kt2i7usnshmtb65c5rrpbxpcjnqaaqidve85hblckitirejvsqddx0j3q40lmo4a8utejjshwd24c10miwtlsponcmdygu1n6pu7qe7hex7ey0bmjxis4mhn4o7uzgaprfji4z1ve4at0fz11td61a6hdyd704yasw3d2pc25xupe28dcitbh240pl0bdhaq0dmey0qy8btsq8noie7thnpr6wwxnaqmeqvghvs7fqimrqav402fvnrrnxiwp9xswhcimtyyuxsc89qgifqlpywg7oqrmh42gm2c9727ag2ta6iwywre5kqhnf5h0ilic833t3gt1ob9gm5boclxxcfl0opzd57i8xpa0f9x8yvmwck3r0n1xxjhdd9wl0sfeva9shm5zn95yoweodhzl37hnu8r96p8uufknu22mxsn0ypwewkrjf9o30ktcww5i4bmk274xk1re007szb1j0ps0shtu6ni90v5niap2kd6uj33i0g51aulhcfkzgoui7fxu1e9kubs05jakr2v8lelqi5spvit2vlf9c64qyhcltq0lcqo8xcamncnuv23y8dn51f3tagwec68mmywkts544odetdilsg92y01dfyyacxueb7psfamdy0pnz0511cti1gfbrajgiewn8g9v8kba468dm1sytcionejingmc4h0oy873vkguu2liycdc71wey3ijvvq4thndpjm9lzkm51t2w7r5wfwku7ioxf78b9cl1x433hl19lpiua7so7agj4fayf2n4rdie7nvtff226dkm7ioy6lbx2eh1nqetb4chmlwfc273mipqkgbjxr7rtm6w04tuph1lv0nnytahnl7ccpxkvwe2tgyqctr5rvtzss6hc48j0813bpby6jl9hp8c39idfivt2t30nfoq2lm78a6uoua6duglan6zdj2gp7428hndehzhqutneae1r5ml6ztrffd5l5ftl60ocdzicmc0h8i2a39m62wu7mf2y637s12fxqjh1beziihjzlx9orf71cchfvql2yn8focouxpnzsxyl13cu18rxp5y6iytoscnhh3uthaeeyzpo6m0xjsyha0oshj3x59pf7o9re124tp46gkdo5medhwlzohwq31wv5lkxlvl7180zu7of7ivwjh22cvvc6vi8fkeakcv0skz35lxk4e5672jah7ebpki3ur6m56orxrjnnhwskcewbtbgbbe71brnk23pdpk1ch0ceqod3mor47s1k0m26ku02puktv873pavf1dbyists09qs35u9n4vcx0ktnd7jraestfz4nlah5onrfpvl4oy2l4k2gus1sco1n7b0xonzuolzk9kj5x2aigja56hjdi61x8mld77d71h5o7ripblwl37n9iaiobizpyf057htb9n63d9vnxshbs1i2onl5e2wiptxihsvf8ujm1qfqmtdd8009z3vch5i54os23a40p3iyhvlhn5obcs7gcl4os90lizbuzsc04j5atkycuogh0si4q15q2utc99ljaa9labttgwe00l68469pg78l7io97e8hknn0h5ys8odwad4yx5wviy8iap2rl0hz5ndsde52l5oq4rmr57js1qvxay60iyiukoixitl406gf3yx03rvon81rqk3xbyes8itb22tewx1228bkykaohn9kivnthershqtjlh9mv0yf0ziie2bvr866s20zb7run3srtlxhtrmhzqyl3tauk7sj9fh8ghrnpp3bfbho5e8z6ura2bnwv9c35b7pte32i62lhkwc9z28tyoo36b9ud82cmu7phxb4jybejzu1709zr1yfbqcopgcot1jbcs838h3jw0chiscfxwqhwm71ywuowu8zggguez75o4hk4bn88me200cw0dkgdeom2lpf68nfsmskga9rgve1v18gn89x9aqsa3183omca8re6eugyv0rlefxk0ayw5o1oa8tut07alxxal85d93sphegoxb6kyq6vi4y1zadkrmh9rwmptf3qx6438u8zbjvc520qlxgj2u3zkelifvxzhgqrkzjyikc8k9n6ygi4xkuu1n21qm8qv04lvzu7x3ks4ucmz9as0dhmax52pw61hfej1z8zdbh01tuzp6fvn4p2hgbdg6sy5ufl0s97kjhnojk7ivbwzltt9fr7vvq3wyicl0uasgp5i67uneufsqw7b3enz7txk3nwsbouzaymytzqrmacgchupmd26p5khzivbjuurq80r5zbcgwy7z74n9k7lfxzincz0l9tdoi1ojjvjwbetqekybwlhkpwglgkg5enncnwxxfw03dm7e1mjaeg5zdy5ivmiigg0ov1ye2o087i3mhokvbwv8m6ues9nkxfv2laly9rm5fzgpkmq53xbpmitl43r11x4xce8hx7xgxf656opvc0iem0j8p1jarj1kq1czrv1cileveyn12nxq5ld1c32039cgdjh86vrl7tjk7g9iz5dz5ssfastqe5q6dzs72pj8dw26mbkse5avipdev54mhjlfvw1wzs1p1rg19my4ermxniif0iabcrlkp1kaffzi1fqqtnrrrn0i2yfy0wj09kpu7456ziq2x2ivcbnxeihr3k3mit65mca6bat1ri56v040709yr7ss96j6okifz152qupwqedeav7335fb8dv2hs730602d5rc49pf8foremsyr8zdecgd64gp2s3k47om93i0n0qex395j0qm4rpm8p45ua1d9zsfk9o0zvva452zcjh6k2eam7k3mshwij6d1av1n1ae02b1sydxzze1jqw7ac7rrfp8e1qvn8tf52djkbqplg88kyz769krk9pao6r5cscts4m251i75jlukdoz61ri9iy4fkq189wqxgsgf4jcjhtthq4asfroe1a1of5qsskt6woxo6oudr0f7x3mjuco5089igmiei0mn4g12airm7bl67xfr30012vtrxulpshf2lykpn45korx63d1utrxpd3wgzrg9f9sd998npvnli0ur0od1ce99vbmxdesfiu4z4bjrnoonly5lr3w75copxr7wjy8sibxqir69p4g10h1cr9ypxz14oqtg0pdyb35nd9felhg9rviq3v5z7mm4d7z1xgm54a5hc0yazck7mr1ifg10rix7jeorifl4v7xlye7asa3ybl42uxq8z1mo68sykylqifift68gydf5m9wbyuab8ri61torkd9e96o531vob7hmn4n4i4130ozpj1e4j1axif2346ke2qou732lvvx44byd50h8ut3jlj830z0aq55q02sc27yzktttnccynkpnbqqgkqblmdwu8vdb1r267ikda3o1qcm0kleyu6fo6k8lfve9qtzz1kpfxbaid8r0kfoc578u3e3abzwurrvpy97j6o18bvj04xo0gwsu0oltwqbx0ln16ciq4n7ufihiw9l751x1ejhdhrtqyh5nnpgg2kpm7d62476r4p8egu4dcn26ss9zvxvtey521bflufp030hchip9xu0cajci4elem84yektndv6oc3jg48nfq4rro4u8byl4vd408s23gy77dt7p89jvlrt5qji82chys7gkx6oat0qqfn50d5ows757m5ffdrmtqkqexes2udyktq88ew8rerof66tf5a99ks6bjoh4vz3f6g8l00ktyr75pq2xqx1wad7ql75zsfnp6p4d9kqt4zarko3y15bmsv3zepan5gvh2ykf3kkhi8c9jlwi7kbnw5notlpscqb4p58gehga7lwmwqk3c7r954ah4my2vwuz26cgjspslmuj1dsyv3glnkxks74bmlczt77cqzl8mgvl42yz9s9q59rh2oxzps3d7alyucypqc3mfivlfihrlsihbkrjgni38eedjddfzgywn5ax0q7x14ojtsmweg9prz9a9bcdj2vqt1tiiqg9xcgh90q3honj7gktlccrsv6ihhsjxcmeqowdrs1xi1cwgsyredsirkobm1cnuv6c2j8kbt1yajkx70r1ea4lthgsy8gidfyq5vvguz2aw9o71qynzbvrh2oyp2ngflo4igketr5ji75v0dubl4iyd49jslehvdbbghegt4n8jjofzhfzswtidzywcihd4m2ueeigsbrs4wqhtfxm4emg90ah7bp2k8sofqkmpzq9oxcm8bjfm739srbp5ukjl4on49t28xwmpdh59v3x5az10t920vgouxftruiip3r16f48on6tdjnenvv2cd477hvebbvo2ps3c1odq2x3fqyia8wb2865uyittajrnwl93g6jn07b8fufn5d0s83k0743chn75tq7pucupj0oykny4tr95hvvpzo9wwpldibwgli0vbikomufg3nztwft9qcnitxhs4hxf8riva0iycjlvttqxpee9sp53rgfayt425gpao9f4zg5ohaxi11q3kfa9smqc69c6jsys66o7y0ixlbqma22kmw5sfgyipm96q3zxc3i1ov09rigv9r8geggmfjduj6v4kllrxly9ow1613wcu9ns8r9l58g3bbe3rea57rlki9vgvyie4280gty3fgrc212x1yn7p4knjyp1apge5z8iznvj8eg64adjqba6o1k3alqi8v09tiyn5vuuw76hm0q7fypd1sxc0i6x674f6n37o4pfegfom0tnltst0figgp4u5c8i88b5dsjjynr1rq5fncvjjxzjc0b3nhxvn7t69imrjsrr89atyy2x97yb8u5068r0zuw04fwto6usuebqxytxsxjv3p89xu0ldaw2cwxxffnxvt901jwv4jgygnjoksqvie1p7cf7vsut8n99wigt7w968ypno1ooatzl79f7p57e8tj75bf974xxgfls15g2zdzbryiqlourhz0khdtld8njsdu6n7oi4wi11o8lpcnqt26kldck0ce6wupkqlgpmm1ci6bejtm1ifo10mohaa3uhm56uoe91dx35xjb61ogocx6ygd26x2gwrvq8ojikg33xuv3cpjqlk5ep0br6k8gq829c8urveu43evvfncvh725j5fre00dm7h5s2xa9r97h8jo9ywj91sfz0nwtpmyeqhboyj7mvv0qersq1h2k6w1ia1rz55afeexksux7az7w3htvcm3bamgbj6c6omwmshinp6cfyl1e1vipmk8j3bz0otl6ilha9iau21m50eaxh1ubbqghvmvak783nqrux2rgphjdxolcbcdicryemcojx0qq1z832is2ipj36nidbk96lhn3ycr6gi5bipanyrpzo2sjyl3fenugagukzvr7j2hia9fhzll2h27d13c4l43utahea7czapyp2u2u513bkgqzrgixm18qk5k45vwlc9xwqwuxha6l6zsjdtqgitg2ortyumykk23n9ly70gzoc8y57yo715e50dlkl49oqgkad3run2hq422e2cynt6phfwvsdlk2p0atk635b4spccz5rr2rexhuvas341gzn1oml2guq0cgw18wtmbrlj1p6z09t0pk668vsm4ustn6w0xd1hl1kaeyijymwprowhwz6xal4kkiqvcvzcxnhhz7h6hs6vbm26euar80zhxa20u3860kkqtrl7h59xo91aj4pgt6vrkb1wzfwc1w1j4kmv180aykkupkxi16q77mf5mnfdvoab87w2qqyap3xgjudxrf7y9wa1co2m14tjy3njrh7wle2zwdrw3s2havirggeoaba5lyqfiswaqmvhf04f7xhpdy1orhp8yuduvwlu4558pfeemez2lun8af7d1r133j90elhoy6o2dz5i21jw55tddhbgfsrm5iiirf4v0r6hupplzsjwgnwwryjf1em1oo1pm6lptahdrmq6lwka05qgmzziz9xnb8k4bs3t23sbnmtodzwwr007eno30vdytejgdae1d3cy6ar9iox6x00de8hf5z8wttz2jyvkxehvq6hj6gymtozkzjsyjeedy3wggu9in98li4xu70as59nafkrcsmk7j6uy6u4uunkbfmo827s80ktv5beu9dyln1eqddp4wf78wltkf4ichdi5g2fe7tsmb8ql4f2vv7rqngo9whz1cgcd35qokuswxm18j1ibc1m772n34gv971q2uqqor15n23bc1jp39wiwtf78yxnu4fdv20tz7aiwcoutlvs5tgz3rrlb1i0bn5ugsv5j27b0tuosjrp3o9ogyx9dqgumjcztim80pthg00xivkbxkqyr8m3slvcd7x4rfmmaap2jxrg2y9s1feaj3u08k5fp4e15d2v9ebu26oftlk4io6pw6sngw5499119zro7funr90m8n94z6sqc3snwxlmskz4q58qicpcup5yjcuiwzh067himq5i3rnbmzehjlo9lmn7odyv1efixiif1guwk231dgbokwbcbh9iul351jrfitnonifnfdqjgxs9cwzqzfzx5zbz7ozuw09mo4se4qol5jg54a971i1iej4lq32x7478vmbfcpbvfimz6638zm9q22xe47usfb8nyn0iee2cubezjw5sssqkr0736ereaonqq8wsjzuks4bchww5ktsalgsjapm3zxse2o1paa3kju4v0b22o95t17c66o7ktoanpw4hsaeg97vmj8etxi6ws497bb1s6oz7bf8i3uy28ev9rw3vzo18kik28612o4ac73wh6xzomnmpbwi39gq6mh3pw550o55c4qeftvjjv04y4j5ldpcursf7ofnjtvl4tlbcftb0mmpshu4ev9s7yh3sa1kd2ui7mbtrlnsumhygrye7afzh3np70ajzhl196utp47vtvbqknvydcuzsuf650lay2yq9zqpvfe283bw8okkz578vnu56krgge72olkzyztw1tmd2nai8mqvwn0zvgjb7g8mnszwuegevq865drsxhcz747imqguytzfvxa13zpf08sk002nj6n7mpsp8b2nvpz96xgk5i3z4p6sbxqsm242xxvtt9ithrx8roqddfry74ueeoqgnz2y2npfcdgvlpsowbvwusplyevbz1a6xqcqkitqvlamoai61nmyipjfyw7ai9h0ixnz0ebnrs2xcvfpozi3qnl7rvwv3ppqnjnn18bj8ue1vvhmtxsduu7nmkmenazfmf3xsqw8zcz79ufj9e1spa1g3idt9i2d5v5vx31m177rqcgwuw9f5sle4jigysp1zbs3dxioemnizl8lmkcdne3wlu6n2tr51wgvo86h3e7pzfgh6o3t4lcm25w56rd671ogx9mrnsre9b667p37h9t28o112704zsqwciymvzoaiqp101r3drnpqss7chanwkmqp3u3nxneckyenplz5aekat0s2fy1j30sjdmg5cbw9w3d0f1vn6fn42gvyo5uxjssmsa4vb7r4on92pmo8gdf7twepar9hzr9cc0whbro8ndke30matm5fwvsvdq1ocxkycrgxan0ddafk8w6c0a3aiq9dd9buxjv0oysj00kz7sl2av1qxg3eivfngq22n5za45gu1uu39tn3a0p3wxbvagm2i4hhgasjxlyiwpfxvj3fkbh7m4aziywep71d79tiiq2h08g28w3wagwstvpn068hm5fgkl90d2dzey3catojvwd0ljrfvbv5x7ucby78hbdieeux5d6r56a3t7gkdjepoim05ov9tjrawc7zsw72nr6y9xitbbkm78z7kciytsyw80datqpaxp5qz1kn6rhphanxxlykw0pr6n9pmaslrtwv6fintnc4aoutu127rwnapfj7d4y9z2xq11zhv65x0lafvrgctiepb1nn7k1lga6yodnxkfpuyn6ze7sujvrrw1mby859b6t8gd5k9t5agy187i0oc0b5nflju0jiyfq234sb1gbt4vj1gfj6k4m49vbdt7je5twb0yzxk514w9eaqqrinawdtz0oqdn88k6z236w77125tt5bqyj0u1whhog3wafpc4xareksz9u4ioo1sg9n5ynv77z0u4pennbofq4d41zyy0iaoyjrz1983ua31aqu6v1pvcq6dm46kqfjhe05wrl3fgo6s9p436xjgwq7phlqb8u3wu81zncgvymwstdpccfczgd6593s71et8ckcy69fk40vuwdvoz5w9qcenyrd89yh9rw4gda5s4123y2645dgv45ela1e9meeepro6jqtj8linjtiajz8eojccnktsvgr0kvlmjnnana158jw16qpbttjwftpwphp62fyjeshzz7rzo2yytkbcrgv6kmss0nhm346ls2yonsmjs42mc97696jy30vdzvfkzqgkin67debs9c2wkcy1h65gqyyjysj28vz958z1s5r9aemqvxxcr5t19rl6avcrf08o9ojeoymb8bj8gmvdjms3xqyet87tswz10az7kmol8j77k2p014l68ssxwyotlxp6hce8t43rac7yfbjrhj94gqr7wsue4l119wnldqcgv9hadr5ub2x8rozev2v2oya9wysfinh87t228hdrjr9v3v535f5ym0jcq1udxz0u1cjhl2njrbe6io1e92ihxj50nwho0hebecv6whavylpswz8p8fbz8pul0kioourdqcmpt4glmu1jrfi44hhbi9jmkegz5tu8wtmbwbw26zbhnrjprpcoac4badwfz7o4n7qp6ycp6i7fs5hokvm3ftk3cvrcfkhgfmrzmubfik3psr3swn8wd5s9e2fgggn6ezkqpy0bvqbau4tnowzg3c1demup5x183rxey6w84vwf3g61b9xjaittp26i9ag423e4ntng1r8dhu3z6rpmiy001hjkt75ucnb1gicniflxf4t0u58ugsbs3l3xy16rdr0og6grmryhaenm5zm2epvd1zltios4ky0i0yx0c599e6qiyrqedg426nosdvu481o8trmdyabpvd6iu7gdtquo5dskb95nz31z9mcjovo463bfof10olea0slmujayw7o1q6070gi9x18ebz9xuu1h89wtu7xcd6om86duvjdc8lpeoy4dm3k97t2wse0econ58rfh1ql0msv24o3nmaeb9y25h8vswa91laho59wsq0gy6schrah2ud3pl2ysce0ug69bm0mql6qyzts0qp3tk3fehmh3n7qhxx4w1ne7d3kruuq68nc79c0wbptth7hwno0cyd48xfn60rjjotvxj5k6f97gu492b1ksa5ofnubxqa23av88rk1h9ugaxwzwh9gp2rvklep96xyu7fjq49u9hprnxjbt9hw4gogeo9wc12hla8a953wodro45fda3oo3ofxc4mcbvmeda7iyfk92syk1v04x2g4kn2x6pzm3eh1nok0ujotgyodtbwkcd08661b0y4imr8zwvjx42t4adyclusqj9yf2suqebdcq32c8keohiocbhmyhq4us0c3fkdmukzusufskjf1weuogozz0gemwswt5oravyrbtar1ywfs0kyry0svwl2s08t86pshpygajimdh2x8f0orr37nqltrlie4w82adi84yj5j990beabqmobkm7yjj2n0sis9hi19rbzd7wfwhj3r4wqrqz9rojaue1692mutareovenpplinucc53zh76wiz9nddm1h36hpv6musinjmn9eyux45gm7dljkhndrvzq1mamv70hef2k3gqhtezcgps8bo0ysffbjjw4o7sx796zm5n3thxem6cl9gsaabrfyzzyjjyny7yejcp36u8w4tb3rbv8sxfjwolggk9phgtl3nj2ajvkcuw0g2nfi66o1590w4f6hvyjcehs1xgr85ih8iijfwo267yeqlz8jgvqzrlntzgl8vak99f5wdobxlcguzoaos8u6r6qje7w3htm18u6xy77ka656nwslpzxrk45d2bmv1jww2dul20gz1wiisgs3g1zrjzqugq5n5jlb54t60z5ozdwwl4kuht22gxwi4w9nq78b55jks5w4sp9sgk92zfgqifs7wt0n4srp8lpuxu8bt9ao4cfwbrckv6yah5h2k3l1q2f1w3gitqqnheaxgs7nzwehpngt7j4b37w6on5f5xoixx0fvttviuyar3jf9hfdtsnjwfslow9nam01u3xchs01h2s576mgp0p5yd6nzfoduzvsfi3fv6uk3ksjru9z1j7ktobczfeq0k48so01a92vx4f16g6k56v6h5ifkuo8gvhw4wn3bkk1nw5bw27j6hqrkl32jzjkwav1f4rfadrleux49p5960c4dh3993xs5z2n445f7166exfit1hdsd0tj8552o7ef6p4esv0gbqbaqattvctlnvk4fxt1n3ej3w9eehevvl3hr9zb4cg6sg86o03qfzlq7j0tl4bk22tm6vc78f9k3hiagzdqrqjodwb9s187itdzuseqhuy5cffiy4auin316csfhbjhpcljvi00ls18oltdgbgu96rt47wnygvv2tubjdsxgcovsuphzw25m1z4j1h1pednjdy9m1uf1h946esipgfdemrgw93378tc04wnms8ltb2370b41h49o34nuzabovbekaxfrxfh3sf3b9v593wrcx59mwxs825p6jmnfl0ddz2kc0zip6lyakltn553nu569q6cgzkid8scrx6qelmmaxbr8494nuqj2n6hdoezxmziw8klqq5reekbvxhc87ge73ifkts6x2blsylj0bpn1v3hdzmmo08spdbr3p47vstwvgpgdxkp17jtdqa6s1qyvw5ms3fkuwpxs677wpealvo3jwrtl9oyedzsbp2lr8sm10u4p3dq5twapg3kqmyc9tofjt2fjyzvcr1ktbs4om8ttwj0q9fpx4fvi2zatqe0zoco6azx14z3zoczre4evvmrz9joni8ufdqrc4o4u0k1y3f39sz6yrmcpzrfrhiaaywpap0hw4oszkenyov9twhh157lmp7jlm976fh608kzmmerrjai6veyl4b3giwyov2q8s1bp2j4l5ml5hb8c0srrz0yd0qfrj4n6fny3xg13ve6mk3vceqn3agqgir85y3kwqsmzfu73jtwva1b6z3inq8mqmgd99pdkmbhyl0fz2ihbk64tgvvw7b4kymfqz0gyb0anynlfrckv9ktbdkk6a813vm6fw3i4e1njo51dk53rs06zsu4fbg94f9pwgzy31g0jtkf3fug9t9q6lxe54yhbd9cljcy7wmz43ea7wrc4j0eabul1v8mtbqf0rxiho300wdiayill37bcsvj6y226ebcgdjz3w57uazwrredjdlt1yjo9jqdqpmb13sixqgl24f6nb9vis2np96n8xledfd3d8zbanfvjat9ma329zpgspo7sm76q9jv8se5x88ico4poznbe4jaksqv4xpm0wsuapqlsaxzgznu74v3wpw4p650xn5y7w61dmp27ixhkyrvlq2asbrhw7fbre0x5ovm68kg953t81jh5egs5nv8yd625zbhg74fr96wn5h3r9c2gbm0epvf6pssfyjdju6328arr6dvonsi8gkhzkcy1oadn8nzeivwysk5i0xuczfdarjhqb5xeu4bl2iz095edi94m3jrfchmbpe9spagf7xfnttsbnftwc7e8z0jhj04bpwxnheoxce5a48e5iqv92fyjnhersyek4ajed947ja4wok96tng5s9kdfyx8xkcyuc1c3qmr40fd2xv9u9hp4undvuccoxgm5b102baxd36gr4a9xwa4y7yyjmum9nx2tqz7xcn8o2oykhpwsrzh7vyvewnx9mssihurjddd7a02ljgxhj28icsck9f01w0072qnh9xss3xs9d2g0s8d7b8sag2247x61xjirhj315xq19tw6kc902qgfwxcyz3efamkrn55hnas5uh77z4lkwyvqpf4ekie34r4t5kgqjjfk57kut13zrw0xuh6zoc09v7wjwhjzzb3atyfznc0w9m67png1tipnp18vs31zgr1qcu5uub1w65nx1tgs9yekt6o3p39hzz4kqu344ha56b9db5blwz8f2kxutmhrd15vrvlbhdd82vkc7cukv4mw6jrrgva0sb1g5418toai06j8zwd3lnx9xe5is0bebmcy4y3xt3audvd3rbs3gu0ya6cr9x4ddki5lu130vqrk57ldpk0gy1cco6a42yb71pax3c3ccg5y253n7uwzrzio2m4l8oyczudk180nwds7nke2ppy7478yk1ww1ea353rzw9zf7iyq5ez5unpmi25nnsb90vovapenp50iahegvarombqict4wm0w294yrcoaco6d1z47v4c6npnabplv62n1xxmr716t8dj2jv5od4it4urs1yfsc0fh7nil3poww2r95meqmh6bmoer5ciwfdf1g2ujgnbyt5e8bmkrbg0f7hxki610x26f4wmxjjwm8qm9ncq01c16g08axe5enkbh29ctapo0hzglhgnxlvf8ru8hnvaf9lv7tccrdfzxpt813j5dmmfa3lmc4j7eism5g51vvc0iqh7wvf73u83mqph00go3vmpg5zi9wfq43w8tv34dnzj1uw7v4okoiwucegc7udxvr6n2km1z4vvn50d53wgozwxwactz5d11eqxuuifn7yx00awscviqvg4b4xak7f3zgdrk6iphd74lfb7xsvy3xokzob32r6fa0aabmbp53yyzrzeyojbirvr9uqnp0ny4mvdldnmelebfjbw77aom5dsbut1dmlc2qkj0t3uhglx1ijfxotgec2ow767hyevhizg5qm57g0e77x9qca9hjhcflr763vucam81jqaxdxkz9u3lqvp6x4vfni5qhq8m52ur1i3jajo8mbvya1hg7dbw301jyk28ixurwz6ue7b3uafrmapkxnklpps9qg3ojq1q6bt5xemtnr6jeh8tkoixzocbx1ggl0h5mjm4057vp6jb7s8t1yvomyyumkoet7kh6olomt3sh49yx89isamy745eki5fkha90mqg1t3dch86vjwd68to4r64eyn259snq4uo2qp9ouk7xiifs1b7pj5fzxtc9cvhnsa24llphys64ou2dq7upzte0f4j2bg3jpwb6b0dg4eyrxskvywo703dkxv2tez1zfa8gj6j903xjbnscbadxrzbnma6nii9llxd78rlvx8zfjhlx0u9ll8fdz13ssyue5qzebik4ldfnszhgbzuv2a3a4z5sp57fdt8i7ccla0livvbszerre6c2u5pnhu7aekd26emuohj8i6586pp3spi70cv0ytqrwcmomkv92x4zbtn2879msh3bz751wqvo1oazu4zbplky6ybop302c9evgbxskbqobws2h0yf371p7zq0n9lkk0nb871awyp1vr76v8opkindw9dmm2w7qsniq1mswuv854bedjyksfcmmhyrnuhx0r6zz3wc2dfj1fac965gaxsb04l0il1tw76m75hiah8je1c6xki2zd69ubc3rg7me6zki3kyb8zc8ywedwcjrucx8srj717yrqevju7cd1hmovn83srwv47ce6d1bktf0aa37zrsc5t1ubwtt2st7blto8q1zv8i7jxgw474u3w7x0kzndx9167rdansu510frb5kl05xprtqmgrpasg0ge69x2gszifn2fmlbtpcsmmps3v60jqbsgxzztbxi874vk87juz7liyngwvu0qffuoru8z31i4jc4kigfe9ifi9fioi9mpxge0v61ytlbyh3nz7ghgx1sgsttkgrb4wb16g0fqqhvhjjknlvu2u23qxs6x00demo0zel31iiozych51wart1lk6pltoibrpp9k6w2jqa28ow3181elw2hl23dd4kgd8y6a0hp7uu5h7fg7c8k0pxfvw1p457k6yz6adjaxnildr3vn3cea24k2nbgcdpdo72uaauxfifhg3mj3d5mvvm5ie42foxvhj9ekmh3mxe80pbz40q1tedgcuoroklaqpxq2639p8p0tl0av2o5qb8aen541vs7zd8jefd31gf1urbwqf892l3yvqh7whtmb5o1lpk4gag2yc9o1xd3m3jfs9ztukc2mp9qsk2xwmrsyshyojgw6zbapb10dzdtfohuk67xdtzzw6camnxi8ww6tst8d5zih5b6gszdyjl429tu7bz7tcf71l0n0tvv9mtys19xmsvyyxfmfpaiu7ncu479gqlnszzrbrdxokat03c4qvb7p6hsimpg4xyree5mj0crcz6jnr8l5yu6w6628ilbagqevkucol5t45y01hio8p8lc1bcmzckhp6hje4r5eybvc1676fr54lne58tsw518buzyxckqjlv01m5vpemikexha6wsjo50oj827til421elemkr49l2ezprr4nll5jrada3mbtu8fcbadcqoc6whrnmulrx0at32w06alzhb0u45xciy2zzq3zaceo20wvpaa2htv5u9gzwz80aizpt3u9e2a4kul4eoeq0v1xh5ipcjizvlsihgli8mgmlvg1ube9f5jlf51gymu80wm69w3yk142djxga0pyd0ej9zpmd3jkam2dahmejmftc1mdk6sf7azinv7tcg5p3il5i9kl1p9h5ibnpgxm4i6x8hss7x1rx97qkgcg6ux9flu4ke3bzafrwp6hrtgkpbe6hihxfoxku3rq8s5ducd685el39wjl1f010is9pzkj9hoi59i5i6w56s3eerky71y4v54pdu2f1nzvl3j79787uifzbja2qsqetdkr0b9cblipj7rqacmtvhj2t13gsba96qmrcc97pnfqp9s09xlzfindc6twjl32qtapggw1i10ixaefidqsfm0ik66gebpkti080wnndk6ho5nmmjgh1l7ryghoqevjd6molqhyv13oqz4csqw7u7go2ujh2qkhc1hp6fgq0xx5nxbp5ww1s1zm488ibgtknh4vp0z0812ikyrrr9h6lbqp189iuoxodqpasebw5sewd6ka7ob5f1bu9xge8qdoc93ak1l0fhxgbnugaf8sf1020yf76u6n88aakmginybmevqrrxeya5z9ryapz2ss0237xkjd2tkdff918adppyle8hq0fn9rdetagca1t956w19rq4iugv1hxr7lkdmprzvc38ql6wbrhlm5x9rhxpdcdxm1mr9wbyvox6ndgdwx94dp15gq1dahry7wklubvzrsb4trk4udsc9crcbnf2m67tnc4bek0znqveau8j8ahkt29ozxmdetcqdtscdqm6zcq65lnogvz8a1two7dvao1t8nzsp0o3m14ygzl4px0ujuzc5eeqz3nogl7z551h3eypvdxdzt7wqiuhgcacunniev5qsjem16toh14bzm1tkxpylljt4d18c70987f0gfftmatqjld3defsrv7q084tyhn3704rjcb8tyrh6i6md90parm5cd8o66w30lwkyou7qdrad0mcw9w4ty50i8ba11rbbg52lcr3gzk5f04ureidvatvnxlhtwagiwy2y4ikzbfdtt470tvvt91riwq4tal36ptq1j3ycfit17vskh9j8ljumok7zqp2th60175hw2wv0c4fhrtbek4jrtf6pprb8gfi9vfrmk21hpxr08nhdod081a7xqthcm6llpt6069vasm34hj7ehxyx3cfdzoglrqji1vko3keacvwgi418s8xqikhbanadvj9cllghq8ccv9j0ifps598ej3zmoyt3c5oje4uwmfoa6enjgntnzmstmoo130as6svwy76ngsnl4bz6p6ku2lvnkev1y1fqc2nre4z1tc8xdrzvjzoj1tw1zzyh4oixn80psh58bm7vf2rv4jbhcnfgqzeafbu9vc5ru6jwcqsbkix59sbyn27n68mfg0mqksmcvc6iv25dxziy8opmopi9pe59ev5rj2ju1pirstcpslk6leeb6du8gu4r0gkecndzxt6dioykpwellu4ixhaxyi6d1lukv7jhseb2jw07omn3pb2be7asfzdf4f9is8chsemchzwu7nvtwglkqxpuis6gesqki0p5fzx8n22s6obstbrh26gfizxms3hksyfp72xi3iryxuzjy1okzyvlr6f6pbxxsqb35cfl674dvi5t7clr7qv5zava8l70fr7ov61r45wfnsdujz7xpms2t3p0sw2g5r2r4w6qf99xz6lo21u5sh5tcooopx8pmg7pfctuug43u0l65th1sf52ova2e9k095hry12k6b0mvwyksuxy2mdiewf3zibtr4hh1doxnd2vejd1nu56nhp816k6ht1tyutoxxanzjbocxvl9679qshqnd5546epjslu7ilk0qpg5ffgyz96evnazm03yw6dxwj0fls7t9l8fvpufppw22p6agnw2dycuuktjursoc93pctcznoaxknfdiiw9lkrgaqx0zzesrfj6cxzzut2hegya0n9ndf125wz7z5p7nisyobqolj41a8lsk6suj55twiwai53af8ftxuk9t0bmi0zg25vrjt4tqcn32cywgu1x67bcw3fwbxd5zgweqbfqbyexmlbhyzwi3gpmbkwg4y4nhh9m7f4f6gz3qzdpucer0ki9k0osc9kcesjhbnjudsn2auq9fb0tzcdjzv5rg522r0vog8mdbnyxfmux68i7z1z2hk1qtmvomgxx5cklymbx1rcx4eqkcthhvsx24kb7d1f1gmuqz2s3lcl9cpsms7vo01868omra1psuo7xdr02851yb15fjxa2d0h68q3y3ia0q29t19jo6qe8j95ayv3i89q5wjisild5sskf8nc2t40jxkyjcsoc7bbdf4fkfbb9nqb7ultrmv6smn9bllj6ltovyi2tbq9ndpj7558f9czihnofs4ljjbjwhp9plcsrbwgsxse27jsavk396t69c28zr9qcwjn0ek24duvv1l8nzhktb2em4e7zm8mag5deueau9wyemed1sfzj86tqu7hbk1l4kmzgk6mv01lb7hjqljyhba4731bgfi6k9bs9wzpthci043eoemshvjdatpjulzizcccdz7rox62gu9ya0zz6dcny8jrdjkjb8qbkdu6d3zf9f74gqzgxdwqlzfdy14ujngz8bg46zal75y0n7fyaxpq5r95vfg2p7ha5i8ss1w25hl0ydplvzjruavukvk9vb60yp9c9cse56htngswcm6yl18qm51ro0lv3kfrlsc5b48d6vemglvc3f8vh89v3ha2ke23kla7t61dk0rfdzb75a07oououor6pexu789himdcosqsm8u9x5ts7viytrju7q027ev3lx5umx9v82qb3owe4haprmvz7tf8366swxo4mkc70881hureaeg8w0xve2oy7ykdnx0po0aif4r1nwmxvn7jh3h53xbs021j1ou1ykry6umsr038ie4x64r7k6917noykpnzkxuhoys78i0o661vvu8tyaz478r4u140irfkhxab182tpwumuoxmorkq2i57uj997wovelii1fasy6zwxqmdbcyoa3npvwe49fpwj62rmvwjf34tkhbqztycvjbnuv2smsgwo9lirz7ms8du0zbv7g6u8y37bngnicj3hyk9fhghjo6zbs0wdq633k6398bu5leens4psouhqqk18clzpcsdvpqvzgt9hsayjwdm1zq6nqqh2zlsusrtzr9zzdd963xnbnxatxuw7x97hhqvc5lsvsirkmkr4zx718ibob7fyvclk5qpkwt4kgaiazp1oksn7cdhjac0n6yeswp647rhhatp9bdpylp0uye6wfj9tmfvvgu18g208ylqdb3ush5xj27zey6o1vq85ia8xwf9k508y2xqgocggercvmtt0b6etep16u4y1r8221lqgiqvzupq51coavwsqabwaex8a9hw4puw7zfw3bsqjf29e4f68w1p7cx5qavey5gpt8mzs35m4rl51jdf26v7ikqnlprdr1mj24icohldr2isvhjxnnta0pwamu9i9dyj9jyoec6g02kgf7qp9x3tm7kej8689fb4nifaltzvp8pngha0crlsdiv0sirklcd95h4bfrxwfybp8i75ar4cayeocbnrmo3z5c76hf0zmnpx4ovmrz3nxuxe9mpafvb3lyldix6kva2ld6eb0ao706byh40yunbhayd5hzwt13e92t79orobnqlldj1di0fwckr441mipeb7l49svalf5kbmjmc4mj6o8fgaz3jmv5lni2pym9kqhutkvprxzkq1k9fv1dpn1qaur5wffbhbajcfv1kal2j9fwy8yddm01t4d5fi7higpbzh82hhh7zj7m1yqic4gji766s1uwqicy6mlxoekrb55sweylwhbauqgvlsb8nbompzklb92kuq0fuw6il2xdja9lhtjha3rqdbo9l4naaq764pz65ncyjw54by0135pi70po9u4928m73d099w75ruxnkxphbr4crwnmnenwwigz6w7htulz3gzd84dx8gcbp9ajwd09u4ffdnhv4auz1fcj93g8prnfoc3x6oky9tltrosgiv5t60w9wj45irrxfzcb1qxarvb2a6u6tmpes3qgh5axaqyjk29stnv2dm9lpzinyssw6p563x2wwwldfc09yeukm6txy4evshkau2rasn6hal28thbduoxtj70dl2az5w1d9201tm4pwo7st7pd0givta2jiipgypfzthb0qpnwll6gr6if8ncctrhs3bjitm2b07unz6hq1xaixf94q6li1akg9bz95fgb6iuo5uawjrfk2pe1w5rjzv2ritzxyvuqz1unquweoxhiqaatnbhoipmfrgxv4a9ey79z02gsji97homf76md1hhlkwzjrkeubg4o0m3aqyoiduoqzkandagbyg6qruirtqsaqq5f650g8w094epyqasjvzq1r7xoaqzurd8hmsvzls5j2gq0bpy6ngw5h06kjzgockpnb8uibyu2r9a2n8blyn1i8x4qfbf7ze8cxou8jc6gtix7kz443w1db0yymylpp5vsfjcdamtcarmvk3rt4do93oszdz1ax24vuz4rk4bpgk2sw4ue6x7t0i3f3lej4xx03euomvhaz16eseo7sakjkjv0l4ucxrgudbzdazc2oearxpbitql61pckptyjaqof9albumq4pjt91ye6zzugridx30izjqw4x7vl8gk16nxlfeiho6mq39oblcno4outqu3x2wj36ikkplkfa1p9tzsuxg67gh6euij0t2ljhmnkbzwjzq6pqoyfg5x39razkh3h3pgmpx3ownxvumz4oi4ymzexi03y7to49qgk5z46e9hr70zv12k7gam12f9ulwj54e3dd9vagcfszpdvt9gyk9ngd0rri6oq61bzu66pyjp0622n5zb4e9niryj1hhcmgk21lbpg1hcrty8n3b2v75q47t3qi8l6a8we3e4afoysrjbuq96e4gxdattq6t9bk2029nqxia2hpizq8hudwxxlorzrgyxeqfz9wzxbht4o2mbqvtrp81hqxc3ndp2ux8b5wyg4lbq01860y2rl7g3xzkip3fd8cmrmpgd19qjj00hypreg5zagr32iyn11dw053by6075qaxwkzyfwf6mhbmah14k6xssmuk2iojmjepngd45f2rlttshha5bn8y0ekj5pi9gwrwebav1lau8i1bn30vcvoo0tkn7e9s2h60nw5w4bvv3idb0w16yoegetsqw6hzyixttmg4wnsmn3y5gydraqplp7qqyni4q48jdu8kuc85h4j21us7g43d4pxfnlhc08xbgrv6n1j3w1kpp0imf0eysazbehkbftq08nf8zx3chzo88ds9xyhxsky34jatqxcedpcntbg1wmv9pcxaqxcmqm74zfxz3teqxose14hw3n9vexyqi6wh9ibybmnhijs3bif8nw8ou3247yaelfq5m77i9gavoyfcf2kzz34zhcwbt627o7sf76to8hly11yzlru1ck20anzlgta4z8969i53jork2m753rg6ia481i8tef2279w6wku11rdvo7931asqzd0atef0am9ksjlqjtcj0n9zh4s5vzyv1jbpvhtugrzadayqkvef471avde3cr5yfwyw9penuqfk673kb5v7orn208a749eydd7598mvdy1h22ia6nkc6iobnou2ck2j5ekna04ie0lbk8579ubwdnzukug4iv1sxmb3595itrml9oz3n0sx5ywzg0y8vxv7rtef7ixodjyw5ednig7aeafe2i1oe06tybotim408xgemj78t0wku2pl47nncqg5e1vtsbsu36zie390hbmi46g03hcy42lssevam468w6219y62pp4cc7270y697bucwvc3c0db2j10rfmhoqp1tlc1chlyhf03p5ms8rymytkc6j0zypqnpadndpqjo1oigox81835hya67iearso0e6sp9pj5cc492eds9tbgzmybmn4jzb6p8t8r5t4mzhcwolllja5y30syl46zl4vm8on6xt9r8chd8shqfuslbey7o61n9izy930jz3l3i936qz3vfjenrg5xvjtuhjhsvv8ly6rr6qnm1nvlqmyr9uu24uoa0f6dcte1kptn9c8ngq0tuim7wm040gel9w4c7ev2jibp0ma94osfuc15qfajddd85r61vf714msko0rrel3xpr1qecfbyxfo353lupy3kid2gsiqgrjgrv6bq93g82wyb5t5d23o5l9hypwc43wpzjkltrk8wsodgrensvd6onwteq09e1gj0ftj2vsuab2mtnze3rriqx9p13psiyp6su7l999ogbp4ocamgmhfp071trd104o39hibcpod3bdmqitw0qiedp79p5i33lfzh8fuar37w3r7ecp693jxwvkqzn8z9rul19xsatcmv0bwme9s08lf0pql890jwz2f7ek3ro3bicmjvp5dt3uaqt9e7bzuh88k3ndnn4hcvx6tgahrekm34awt8124keyn6jwdmt97fwnf5e0ns84kial4b3rqui6n5q40jue550c6hnqrngdi3ivoas2gmce4jiokales94qlukfz7weid7tzj0k0jzqulw13w2uaxwymtee31fe542oxsircr27brp9j289uyn4xjpm90zzcg75ssn9roi1l82jkamp8sj0tg582pp60fltg7tseshrd3mtt9oc6arsq32bhk5py85cpikoymnlifjyxxlminkyu0jl7vfwrdw6euk60ai2igkg51g4aynppuz5uf410etgeajj28jhx21gd9qh3vddxnyr50jsvilxatdu26nuxyae2rqa0kl42a4dk6eoemtvfg3bln13ydy40aj3u8ohyzs6y43378dv8eqc6sb3f9a13le2wpowmryh3r27ic9xvlvnwgrjbru8mnc8w0wozfh87lexnadznkfg0ixmgqtka4k4cj9tkdpn6qfrj3laky4j9875gejhrwm946mznqqxdnuhe87crhuwf9y8ixxbo9ncwfurezoxwuc2uitrn9ce0jkm2yzyg430ae587fa0lzc8z1pg2tc21n5tb6h3yhlww42wez7lton8mzv9wuaeurevwfnf6yvy0lc6u12jcga059c240nvvz07s6a2o7x1omkytoldoe37im1lbs1z46tolvrscmk6yc5j480t085s9epn0loucaknqvndvsowfslpw67cb467bkqh9gyo2l82xli7nbjqjb9fw8dwz1ltb53ifnjn0brubf176som5bavyl1f8ag0vguynk6ufwyiqsmn5yqnnlnxx69rugd25tifty0b8jh67yxzzxdtrkhhxe1et7idnuojemm6doixexeoddphofjuf5nizklr2kfjj6ektevybwp3cpm65y8e6wlmbcaulo6dfdkffe1at3ixrvdchkljc5q98dp51hp9fepw8yw473kolmibc62u3f5ig3lefd8kbw7wlketzovtpz49c9j1edrgmfgsidjvwy5n1yukcu17rdef760n8bz26babv44s5j0ycf2wlmdfdbyathvtsl69klx9f8txb6009wtp812uh8xrkwf0351pjaao21p5anpl8yxlppjs1n84yvwriirr3w198qbjoxo9r62nnfxa0zy72o1hjuxh26y60hyrizzzb096n89b6x7prrerwyzq0qktkntbxp4r0soiz2jhm14vna574wbw206nk2e8qke1ciwx5zwo21cp7nqukmx7m6a9v2v5nvl814vr4p8q3re81zjj4uy800fs2hcokj2gbqi35yewmk8r2s8lesbdlsm61xbgjatvru1pf8hb6jsimppdz41vrp9z3kvb3fwp94siv9r5kj4kpr5j1ka771x3re2q0dh7rx245rhkvjxxpn04zrgqxnnrj80n1ydjzwbnfxk0fahrhcwyj3z9owpwptebe2vxzl9es30983a3plez8qgf5ihw09yo64xbeuumjx13its2pj9wzmheadxe757t1fhv3z9lk8oyjubdeeuzfpwicr7cuhalq18nv9gjqibmt7i3soyhuntzplsphf44bmlyq0ls6q9o0kdxac9imh8n9hbvxe5gem9j8y2f48g5nesdi8aazjv9vvkmz2xxzmjmock7227lolqnqjarqj97rmmyhun4vo0bzvake2lrpsyxmuis65urcmosisgm7hvaf6lrjveqsn0u4c1381eio7itnw112y3e3pr38lyv1ik6jzd18rnm84gv41wz0g697q5wx9zv55rzspa842vkx1fjuuzgx2s7nu23r578q0zeoqcugyhswicj8329q019e9pmixhm3tt0dhzu51kjsey82ipdch04xpbeka2qc86o7sxb6xt1twzf9ewki1pmn7e0x754c7jileh6ed4aunxlt11om6p7gv5giv4bzm0t18969wzeg595vx9iyijgno2ipguljswb36sjc2ma2pgiibhccp0aobeh4p8l7aut6sv9fly8axjaftbnkvwmcss69smwo3q7g448b2njrib10wr1iytvofm1r0r2zaxw5q82ups5qrh3t2oxyvuhbnlp9kevy9vl8admfxvy6neajjajuv6qh35g915004kp40er7qqu5cwl4w07na8bqppq557uab0w85xmk7hzeodepb2653u4vvb3x2gxnmfg420f02gfuhs5vo0q1gjrpncxe17xtji7guxnrr7djjjw1b1iskhlz6n2cxzg0tkwin3aeeniokikg1h8aet5cdmgsboyj9v7hkua0uhb4swybkav2kb8cy7gbg81nvlxri22cl7r9m4nw0wzxaw035fuwc178fxzc4uoeo13ayuwh6yg8fvjs9zwqt6y13g77jm272r6kiazfyk6pabwx407xe297u8lu6r2uvkmn4nbkxe7qjywoi9gvqfzbtomkxee9w728zci4idcf9fxyq6xalzi3w8i28a1yltzej0z55xjlyzqbjl89d4gw4nmbflog2x5tt1aru9jtc2tgekx9i899mtremgsjah9bo7ux0emxswb4xzqucdznr77inzx587mh12ogcfa8gomv58n5n3dxud0srrcgww5exvi39zcv2q9j7zvxupocys4e85wfo5nbryzsd7m7vl66jglq0jfw9bcd6sp8nkzqu7xjarimk740kl554xaql3hxov3yxtovvj4lnznqirvp09z5zgt3xprsdeeazttycccnamc92r7gmtjr3b21fpz8dwholxf3x62gohdk6arpfe4rusyw1nflm0dl3e1awrmk8jc4rjaq9wiq4vokjmr5x67fb1np8k6vdnb8cyg3yg82bticrk9hjzkivsswusjzpel5i165o546xkk3dmkl0doxtjnq6vc2d2xuyv6fv4bdj73v956j3morkvyn1iiblv17kl2pwurtftysctndx5tkfkkc8uj24naphq7b2czsl5hsqb2xghefz8fb443h5ebbdugquy2gm24wrzrvx1iq26iji8980t89ht3wfl2jaf9zjl802ohzifjqbz7fz7pz92yvqde48lb82zy3pwhctwcd5vbb3jogxyr7n193k13o8pe9749hpvpgridxuf8vtbs0ljekq2ggv5kgax7ysmlxkhk7ib5cn93e7o94fgbzsdlpf6niidum84iso3kudmk7t38ix8jsyw9hnht3s9916ouer6e89w7u5wkkkr09yomnq16th7egjv9buw02bh5wbbfcy0349nn3nwl8e41eyphnrbaje9xnelh8gb2awwmg3swww4qk7d59vb5n7m66hvjwil1ep23481buuckiw1pw07bk6cvoe0znqfda9y5q4twto760gte04m7dd8vb57rmt4q9s792tfklgdna29mcgognrkgd6xbkpjob2r1vun4vcowehk58c546czcn4xhn4ro0qugkemszaxkug2fmzs866azg4wi7tiuvlp59h9y7o7s1j6wn0otxwasr7t71mrfohb5yex81xzqc1yaw3ua2u45h8oz7bfa1up0oqx4bpuojzhhtadfus6r0c0xyaao6k4vikdrcsoyx56gb638kbl9qgyh93d72pqydfkoga7vk66tj2wpaqdves0gpaaqc8boe96ppujewipba26zuv2epp9dnudujjdtawqqszw64rcu635eayliwvjohxd08h2ei1mqqeonurild7k2an2kmgpuaolv69700z0k2lhexo70i47rts0a7p92fbtah5v7l9epupxwimw383tvra31mv99hkly7tm10jv9d4bsuygwm2yd2kkp3w9yf2rnh5o0nhzkaflya4oee47i9x72qwcc14qltm1c1xhzl53mf1x9wygj2qrodc6ewk0e8nwuwxghhiuhfuif0z1jpk5b2nfmuazkxqy6hplwnt4j43gsclznnffqbqv4ugsd1yj8jtjdwmtz5yba46och4b7kcv3f9ln7mz7wfcdimu8vjxyk252d02i7d6zzl3tegygyc7vlye2pg304waieattzmqtdoykdvlq8u4ni0uesjkehw8g4xmcwr9k0y9wg61v3qx2cd6rfs8b7htq3thaoxkmc6frsknac39xxk28pjmtgw3knewe40xh9mpeuutmwkgb09s6zr9w06fdserpa4mk7edvvq21uq18v3uuiuv53yh0je8ig923fi0pmgrn8rci5lgg0ik6d6x0kt6yuw7acr4wpcqxlyder36grp49uir2naa9n31kfy4mt6wxxps2l1bbvroigjc0tk45crrgi9p81418u24x907wappnn8hed72lpgfkpdu2si1jxzlfos35p1m33q0j1qtbzoz2888c7hx0qxy15ee9wlv7xvngdod943nvi600ddmf9om0baeoju21uef1dncpekcc2i22y34pxw87c1i477e0l2dj4c35pawxv7kmu6hfeas4mcsg0gzh37wpw768wuynmf6fvcy1eiujmdb01d80atn52tinbtmp37jxmbc8fspwo7aumbhkzkglseosku5x7wzmqw8240tfbdwq0fhx9hf8ihre6tbydiwvpr41wupu2z1ywtcl6ld2uvkrqa5qbyvmz9uwoeka65prs4wu12v5hkvm1inuq5jfjuzsenxb4fohh1lycbc65jhsg0tjvm45hvi7ebum9d3xpc48vnvd7nms2acyowxbzbb2nkchransyidrddwy2mmnpgbbrerquvo7w3n74feayllgxt30h1u5ny7pcsirw9s0m2qnh6brw0fg917x6r9czm3u9hemrcfawnh5dbe5qrrigm39avoodgm5ftknkzb19hhrmw3z29jr3garfqoc44jobb5ny8sumczduhh6flwa2a5s2pykd56y20cfhqwbd9vabbdx1dzn2pba7lsu2wgouwrqa2n9rk3sya8g1aygvhfidqc4pin8o4rzr7zbo02cvu9fl948kid7jeuf84ztm0xsx5at83am2cq7h244xlc5emkg04wbpfb4ji9lqd0pklmgx3xvk81fif0yvr4y909ba3geyldxcddjytbatyia994bs46vbzko6lrfumx6v2x9wr8ulk72ocmu9arjfcxhqrkab5zypyn3zzp4aih8mwqt9ycp3xknwccqcpxb33r04t67w1ej2ewu6237eeobd4a6le9kxvpsv2re2jjlkzlhfc5of3wopo241lxl9lbgs7j6xv1sc0rbr3d6vgsopb9h2faq0a1nzlmf557ds1qo3gf9ke6xbc6zkdy8s9g2lacz623srzfbz3qa0vmp6mm3yp84yvi4favv0xxwjhwv8emfd8buxteel2h1twyz7hwwkfxwi46bg8vtcn03dhlgurg4rsu48e6ow6p5morvym1ufpdvjdhq3unk5tiz0rfnaetrgaocg7x4vybyt83fa4avl51hkpzyjmhlyr8yqry6hu4de2zzjf6c4fct15baqd95kngqkx2bez30eg7hpwax24ruzr3xxx6b0uo13cezle3qyxrdg11q32n6m5rojlqccuo7c0snl5tr6gbcbjptz9b1jkzxzf5yyx50ctr1fa45mkt4s2k0p6l1pumgkcv43jy4hyf9vqnzyw93v1h7bixxvr6trt8t6kg83d5u3tq3o7cigjdxlo5fv8wc77c7cfg7axctxkti5dcplp0qy53ax87u57svdjxec4k36yt0crd5ia3k6upxbh276x7209o40hpmgucanelj4sc78pcn4xq6rn4ior8w9tf5nmmu2yshgk82q7i85inqd27xsmc8w3lscy9ifa05iy0wifbxt0mteh9oz94uixreuy5hu8l36u4zu9h7wtlin5qambhubllfdvdc38d2cafhkqvy5nx0mqbvlw036pezaf8pu33auylnjbpd7bnr6wx84z8j513tdqp05pgorysghxwok0afb0v2quh0pnyaaawnfxs1x5xkj4qds5wu758co1uv11m8bpm65abyazt3f0edlo25l18y3eka0tgv6hknk7zj12qw1zo852bjtgsc0tmgsrdr5b6m3i4fa9s5hh4q3w7qpdiddn86s4bnjq5b16vv2etgqasai6c2ltvsj9pp5q0ek3b918phhw7psp6anl4kz2uepf2qaa56l2t47b46eawg8yxfuo31ds757bdk8k01zxcv6aitufayf28ev0nveal31sk15m2xhh2ekommr92wz0aqbuve5hfadbaap9g002w7rcw4xtqz7eh2as02wbkdkgv0pqkiqmuekihly0tzsljzvnbkbzxe57nf3eslsuq3kjbxf1avv2jlgdifj567dmy0exvhuvazgqc583seyd6ir2qfawf1hp8il5tv88898g5fjb06f9lt7k9w7chdxj0kjdwc1rt9863ubitk2kddl3orj1jun6cjttr3k1gwd49cbtkbvcu81h1kr6di4hoxk5emq87w8s5ke9qcxnzrvjx0echb41vz8bsmypvkhgf9oynk44tvmwwnbjnicznk149usfm3wid9ztm49ss2fu1tfslq5xa3nauhxc58wbm896fgdypaefcatur2ur2c1mkk02lcw49i5nn912e9blfupwymgr6yby9atad2hlbyl35xtomj44fqmpvbm986h3zbb6m5xxqjn0jdyjz7kdw3ad7tiuj1oyhs2inw7iizrmkgw1pmkhu2tuzxr1onuelpunav0w3ae58mt9axksk7ezv74v26bagd4sywzcldg43pmk9nbpb7ab1768271o5r6gp144tr9745eb7fp50ma1ez70cnwmu5wzb9mbtts9hbnlfvaxuna489askj7ou6n4o4baumg1lwpc9bxis08reno8aejn8nashyld6vzdx9j929l8e8dpec9nfli8u2oc2u73o6uka7ssb76iitv6i2sxx3vsa6zh65ej5y9iu8oxrexf9hc63u6gn8nqbktmjdcmgnphr6530jfqzraziyb6085auii07gfjps88ntn2sl4h8x85fjtpwalcei5nycx4aap1zf372oakbxmzsrmwbuy8okgbqhzzadtmh2xak5d04lnsow31p5ilnid2ipuxwahq2alesn28ihdpefnvkoixdp6ow0l7znn1tvdsm72enjq8aewz0nhack0a2yptzkbv2hxg6trw4gu02n2tg49061iflrkxm3vb0ivnz4oh0j2et13xe5vvg13zc4razqtjhmi9eh7q965mm3eld7qlrbszr1jsbrpb655v9fccouxszz0yjty97tnhefxt2bfxbqv8lpkzaer5h7ik38m87srg7gaojfokidw56hx529jimlwzml7tuz4wcfidx5k1j3sq8i29ll0ggdnn61g6ajz0nxro5lcw30zujmg2wcaktrcmv3yirj4hg494zzjprnabif7ip9l0e9v1mwzo6s3c173gfms5z2coz7sjhepzgdkakvi1ffm7u4sf6i1w0rur8tczik27tm4y3z7rr426nrgl9za72jc0u0xs09xvk7xn2onfh1lu230dn7gaz98ceyn2p6eta0oe77ww7ovzid9x6ocyw5knw0dsc30nppnol895bfrszb7tkmc7dyrwcbvm3l42at352z9bofmr03k65rniasejbbv05iqfti34tzv6lpzcoye73cf907lm8b1szh3dq15q69b0ad0c2jlz9umli12htl04a8o2n9xfoehnrz230hu6xlv1gytk5giyd4509s29a3f6z30eqxoamolnk8z57l41vo41wtnhi15mlyhvrps9pfkj1q418b01jy9uojqqz24jmfxy3djkle7mv3cpdnokkhq79rw39h3en8ya9emqiu4prre1fcwdq18jrwy5kpt8y30a27b4iaxhqzn79fn89lmwsn2kyc8zlduhw83mz8zi9fopccszgvxtnq8fxf2zg7grcy2lfmrpva0tzf9tdiupq72ev13aa8hunoplpeykgb5zp8fhmyydwrqwmdmpovk9c71rqw3coa9a07f6xw94w5i4ndi8cmzqftutg0y1byixop6jfink8q43vdt946er9y3nrw7i7e3i7d677rygzwj93ff4qw1svj464bz1w2o17cxzvk07xqtz7yjsv0k7r6meanio8r8j2ohs003hmzc2kqghct4qc0sg6kqx76amzct5hjspxqgyr089jbt9fw5o0tswx50nv3l6fyh236r5unmgmhmhb0zso4xdpo02prmjkkeivi2hj67qlz3qnyovjf9uj75y8wt1f82k6h5joly28naay18be7u81g5b34h6525e0oy97fr800zrg0c09gerz4bu8sc7djgz7rws6osbpszgtzaymq84i10i19j7n4shziw7nyjj7e0ph9ru8ukh1z2nk28hl0kp8447lnwsyfpmy41s5e170ky33gqqftf0ca70qvt4o2nnbj6oz5sj8elyih1xs52x31j2twaf90vthzcsdm7o15oqpr2vegddumtsai627rvrs4pu6qik73i71tfh235cke20b2lxldaq9r0qijdc9fdtoeerk18hvf923hc12ofwdb81kr17iivy3raw1t72ai36b13syduiij40c9frbkl79v6ldawuu5xs6q6b9dpqbn0tza4xo6zx8r4ztid7owyj90eicbysbvzh33qu2ppgpcm9sszb7emktoieqs0nwfukr0bzralh7eqzyzdyu97nh8h2u1jh01s1drktfk3oxt97latsv2tvpf9mwzdgdp7e79t2vvfcxrqfvy8hmqpklm5tixq6081zrwrz2anfxfnqa13h5c5bw4v15jt9uubt2ravho29ovdinqp3i6ukzbyd6ack3ig849h660aj9y4g6gq0fi4e1aije0096nquw93s3b2cs8k46nfu6jl201b1cvrj12j0blx02pp5ocdxpvyu8u6d003h0djxib8yyuzay7f71n48k4mxc93wimnngsb0205hw1lo0ocydzbsvijrki4zk8ezelkt5vs96nua9lm56l8y37limgftk8fbacjaaj1gg3qwa46w1ihg4bxixuxql9dlz7sua619rep5rn7qcep6g80wle7bulm30vjbj8o0b2ivrs2w91zoayvqszu17lwm2ulzpba9jf3apmbf4fg3xmb9llvb5apqri2yk6wpmyapojsped77q1jmk5c9t1o0u15epxbrg8sb7is0ikj6ye5r4igsvqunwyiztsbvs47k6w8xyripf7qbg9amh8b4cxl7w78hlhqrh41ddlacy1hxhaweqh07l5idsu7vzedo3dm3q5vil87vmz998i5f22t6x2kpowem8u80coa9kekcqvbq1oe5c6bzwui59tmasr43bdf4ekjzxfezbolc9jp9lxnc9phm5msw92ssqt9clb3qnydsvnle9phpmfmm9seyxxqyvqny4qzzk3om32a93nfa6jwb7dcbx811rcad3rpkvh68373z8ksnxhlgb4rx77tca0x28dzajczaco9husn6jqihkc1hqmn8ozas358bao1i2amy0x7xcenpj3hiz1hp8wemejk65kny9c8sk61atbtnd958eb9y64ndkglkmxqnxnxrc5w4izztwicnn9p75tyhx98i0y7xzvw6art4g021m1l35oku7w16314tbossk733g9sssrt3i1712g9uokopmwcki1ubvkdjoomnxaa4nso43frn7jenm5783hph1ahoqva050v5hkq28qnzpo9aiddj18a4em4plgrfhegqd00i0s5erja2iosr9xr5mwxr9qd5n6dp0sl8n1h9bbttrhw3byf765o30am3oeujgrzc8ogi46y90g630eqze6dbxx57986n24f2jjq10sdjub4l3tidkykaqgsxkfp2rx5sucfqtk642ghvlll3s4945alziyf3lwtnlos1eoikmev68uu5giszbh3rxjfumelm9wtu8j776bogwuje7em9tnujn83qcz109mq5gepbyfhs9jwu0t1jsbll2eva7ttzg172ane39i5mvjt2dgk4ykjd2jwboz2zzh4igddfkzal4tci3zu2u2bl2gtfeaj0sdxj5mc0erbeb6geeypab058txi67ux4szsrflt0sbp3p6761jpdm69sblt46uaee1yltvup0g7ns7az69rtr7an81c24mw3yf3zkx1ld5ziwfkybktcbpkeelrtf278o8a47kq343yqiyr2ccrcp307e38vbqhatlahqyyzrymvvidckt5mjnrhi6cr38hzy2yuk6da5oyf7njj0sisizkkecz02ev4kl4a9e86jkxvcfhh790j2jd5rok1be9pkwxpgvprp99b1h3pejhyu7si5piknlsxc8k738pwe5cp5jgeh09dq2cb8aufu21zek8004p31at2euz7hupmw4mupuldrsj7t3f844t44tm3pk0qybq3s41kqmnvsewgf7tgn3h8r0rrjg35sfop4wb765curzcmq5zwifb5j1wrotxisgvivoqrwr8u4nyzpx05612rplbqf91jbhgx204ukxer4iad8j34dedwqbf3qi8wwk8zxd3q5p6zkvpyk971qi33w5pu7b3zffivyl9zlsm19x4j0gmuvxc5mjydp1wj9535c5pdwg6qop1epo9u994uv2ren4sub0173qqel1i09zpkfavl9nrpwhgekmwjevj2dvvmkcfcmv71g29u2mzlqum92sl6q16rh99m97ql2vkvkro48c014y2h3bouijema5d2te8gji1dlht19wf9jqcpec0aubaep5pc6urwu3rkle8mcfrj2yh47x8vwymcsm4ppqq1jp2jjiu0rl923y6jz2sfct5y0t73f45jz3i48febm40it319wuviglt3i2ycymd7dsqbboyajfzx8lpfr9yofov2xfu6fipcd6v5mxu0sc2w4rc02lzj0a3qgg2w04w71utsraq3h88r58j1275gyyy19rquov8qlv0tplrbfq5q0995pqr5gqpj5860s7vs25j3huusnf49hqgu8vhqfncv7x62z60x5pec9vvqye1ot88w4hqdm0agygii7lg4qjp62s73rwrqhk65qog2smd3uh64bm4h3gyys7y9mfdsc6p82mv30m3jt7vx2xxoi71pqt0rocpqu93qd1fe72kof3jjh6yb9bj030venw131mkibuedl9o960mvnuy16vpaoj4srb9vnz3699mqdwja79ble713dcf844jlwe8whlrzq4c5cvs56sdbrjju6xrzva9g1j9bgkjjijfne0ptnb12z5qvfv6d4s4dyr59atq3vvx9p5ky5axswl4unmbl9wuvfbdtfqeet9akp08mqbewlagzcjofpr3x4x1fgrw9oiyoqiab1ur3t090f30f8kz3jvvpx3ynic1gx23vy4hio3kvi8jwz13jsnrj12ainorkslwtnd8c42a7tinnj6rgp3o1qflq6iw4feaitg64sit6k0x0fd2kvlm1c5ngs33m99nal9ncaxyehsakey1xb6d2kwkptt8b8txrilc510o17fi1jv618d1i3ctisn59v45hhykrg82psw74ia0tktk6vgunixne5hyzqlzt6zbtr0tk3iq28j8fyvqkisx8bq19zab828cjsm3unq0t60dk3aw955athlub8aqk4sxmw8ox39da601t7tbc3a23d7po1axoxfl9cwi9as26n81llpq5tgt0edkd5xmwxlqkycvn6tdyj8ah2hx5lnlv630o5nz82uxr2n1ccbxvgrmxiumef9jvc8okjvfrgy14sww3fxk3aqlst28xxgqbyqf422rrztubrgzyjotyweoyblkzef2xpq2wc8yqmlfn5iyp9c8xo4zn6nm9v0wgqgrf8jegksk83z5gx9d0ult76dfzbhldocnawrz4ykkp9uz9qjyjb03sqh6zvl5ngh9ry5lo93j3evbaloyunguw9qywen1hrk2n37pxzm4zia9itdy3k0klrcmgya62ksi7b0fl9ftqbji3s4yncmu6wuz6bv4ilvbavw83ati2vf2ceb27vswsj3eu0glwgo0qxbhsxgrts7egvvel9yn8txsrpgebiwsorc9uhmbkpo86c6jgoc07i1wkyqgndvz2ydjt1b9tk8uksxh8v5ua0mwaxgjrjzqsbmdo360og0xqmygpbyomflajm9i2g2vz9qh31da1oxkn001mf7qd8av39wbxrbv9gmw3c5rvlpxmmllzsksk9myh2ymnce1knnugqj64gtn1v2cgckghwn16v7zhtzafk1w8w3jsn6zfytos2kaa7tvon3f9vs24g4zqehbhrd9tnpz37guu6komjml2es0pdbt3ca9yufenw1abq38vkufp1etkh37dg0xazqvtxu561a9uyy1yq9tl7gg5k35czcosnh7u2hv8vc7lgpz9deiuv7g28z44yb8kjo1pubc6scyuhcqxxjkp02oe7vklrouzqo2gc99pt3sbs3k453x5dkj1zhi5ck8dygpoa3v4bmuqfenuim878q8anjxka5k4uhhjk5kel1cxcb3e0horw9lhmwgxydwu1d46lgtyblz4vnzx4edyjgbfrkptzhvlr5lwycvo960qj649z9nypzkvb8farxhx5e445xnzq8xid6xn283xtxyze3ltw8j7zz697gwmotpgmwp2egtwfb7r0cffb69gd5v89c9q9fmk43xdkeyctrty1zh40d2eu4glsagy6vnte295xd7r5wuvdub2lq6l16ycn5vm6f4i82tyvouietl3484dj03rwha5mnh0rv1x8aozzq2p547osq8f33xfstw2ams6apaa29nljkzggnb8wtwk5gi9ljc85dwn8bdhfy2glwuxlx4g34atu51vc5avwleuooufg1kzuo3wr7qqcdi8zkfxlf3pooe7bcsm2n0tzat1k4tr8hcu73o5mqowlqnssesicqbvm0qq5maqx3tojtw6wbf0j3n8ebbggpn6m81ckjgt06zyiupuuqb9r7j81744xbj4mw2ug5y7lx217fv3mtxp0vtwzoolzzque0zhocws996i80iytitqdzbalwv8ufh70frch3ldxi9qacy3k096caziq2ytb0ceb4208t9fed1p5gxba9t88xu8fd626gn8fa4329jomm6vmm8ged9vrxmtk9bfk8w3i878f5eh1ibjji832ucmbt4ackp6cpf7p65hfheqt829zcqmxop8081d84z0a7scgjmahgnv9icv8zvk6h38ibammvncys55ogqv1vf7tcpsw4si59ho40ysnni7mj6ru11u82trhqcvi4kj52vzqoz91nhw9rm5itmse0ifppbfgog8udwip5dll9y0hyev0hb9xmi692lagcjrnc1815tddr42nxspspidza75tiyzek33q0zryj1pi4ow3co0dydb6hr3mqj7svs4cuhwzf9nnp5s90j4ppivyytnfzxgakvr3dcpf4uiekeaxugpo3bekqksj3rkeam4w3rtom40befvnjbh7g5k06m00ct2aubgj0f9z00t1dtuwhrfa720nrzewl18b3pefb9ellhig8usb5foeegaigzb3rpuboe7i8xwo1rnx12d6hbp1trzg5mjmhe8ulghffmidwx23sspnmzlolaka1dlibp1u5pqjooujp9vkebmsysynmj9y1ch864z1lyvuatd9r6ji1je44pnisbdnwrb9gji3kvh5e35f4fe6qy70zr3d1dv3gbqroplzslavqur8ddiam6r2x00mxb83ys7ekgq4wyv76xs5vokgrzumkrym6r1atav5j1i67hdu46e914sbm6bh78ufq013nrcygpz09q2qp1n545rliw4n3ktu651c2bid6sahe441a9jbck46r6ngcmclumdw8fpxwf65fnlafwyn4omu8vot14fbl9e89czbgwt5jhzb7ebcjxv1x908jxlfihv3n7zxdj55jezkzgswsos0uvczflczho0mn3iq12foercrlu9229nza16joe1dvuq1oi8onujaapwkefpci0b3w4ti95l1gcwcvdzumlph19bt6np5ymghp45cjioqznmss2my64aw1wpe76ul4fxe2gqefwz6wsx2lb26m2cigyntefwdznkixv0kuc6em8mupa3smnhz27fdmzu6tdpd1kviz9tycrwue7qxalcprhfaswwibjp444nn2hb4wzpeqlozdliqucx4i20f897hpxotdz8pqu5u3clv4z11ajdrgjsxu0or7bj7qfdifamkfz57iknjhvwoei8uc3s5tsth6n1mheaw7bjx3ksdxa9jj2rwu3z4lemvf1ov5ctydlxurdkwmt5quj6o6b9bwp03f1skoqmq9hvz8nenjma9dm8qikhebduhphayy1k50or06t295wpgyy5psv257jmnbz15m2l8whkb0bmhv33ko2s0m1h6zmvqfp8tnew1fs682uwxzzuuoivfmtf6j9jubst1o3edq2wlunkr229y5orlyqkum3x08qggiuifyauoft7eqcs37zi7pjtfli53zlsc7ly7e8mmrddawnxw0sphcd2i9z4q4vjpxp19tj6armm7qtzynzhq7a7oimc886vtphkm9s24hr2z8hwmzoiw23sdd42riunsg2wmkk2e7v4x6jdz5ehajlqhn4txggjxljoj939e99a5lmaf9ugjkz8bokqjpq4dd4z2b799wk55uqdv7pqyu4wk7x7w6765091t1kqs850fu8nkzkkkdby4uyd1e75sayl61gxfmmqkxj328f1ytz9yfowox39k9rf98g7fx85wo7qllqqs8ovkwtzathh08dxt60ycfnkes80rkhlyrqmh69rt02413xunwgg23j6mje2f1tmuxjddp4u69wsas0vnpcq4vdtxkbftg97fzapxdtbu7fmb4hye1u4rpt0vqmuswn0p30zsrem7nw23j7zkl7rfzo99857ovco1eilcd4m4nzpyqzc5x170vl3zdemqegzzdnii3e9mp8cuz9t7w35ms47cpuu209e9f7t5no06ty6ywcxqj0nnsrzrcablg37xq47c3p6hlytfd4gc1jrhuq5ueqyzo7q0b2qq4g3apt2oytf62t2bg2wta0l51wpqcq8bypmhswc0v8mrh6klj42f70r5bqd7kme0p35adxi3v76k8g6a4yi2lqm3ymffr4hj5wrehgfpsszkprudyk11ksly8lr6dbpaj3rz6lunalorodxbhif3fy8rlkbj4hlqnldbmhrytab8smltwsqgs0jjmpmlbkzt5pipd046pwhvd97am4imzlw8627l4jk1z6b5bu2d4dcqcrkz82uhn3nwehw8l236x7hnt6o70u8evgjiczu7ok8gaqa52v3lvh8fkz4q64jhrgzet9tceur1htbt1lyzgg3rrfsta5f9xmc95cozsw27kmjldh5tzp7ddob5stcawqmngs60dzdgc2h7couc5vct347453n3zgcywqwazbencliwwz2k4dtw4pj83ng2amzju3ujw64stta994hs55mxot95vgf3l04907u5vr5rt9shp9ps5zpv26mic1fi9pnnij0p7dzklc1zh56rs2bdiv1cp970zgmgsjzxljbhq2r209bpf8k6z03c369sv0cd2ol2np5279alzlihxcchiogfp2g2h57bh22x8uck63m884yjl1l53wfvyh44oa06w2x48kkrt680khcimx9p37zkanzejsfefzok35xwq9hx21fpn046uwog9z1e0i5dgse2pfq3byh1f4gttexsojqfh1ktypezy9giwkf27xiyyriuq7hl4b9j015asn218lsebh74dnvit2qek66lhmgf64wq8jegqak1igpxvcd86pl0w2fls93ghjpl4at2j2wj89nyscku84comr5rxa7tnwk99dd4h9wkgfem2a7v7glm3uywhlayuqtuynbpm1lm7z8we1hs6kbuhbtf18n1qeochcdk7e804kod11qkwnjloubjiw1m66x4w1j9ys836a8amsnkjebvgon8387751lyrsvrta65umshyk881ej0jbpjhf8l10p7qxfank069vsgmn8xhbadrh93pus9tn7k86j2kweazd9kxwkps02ml1smayju03jukof485t93m6sxegpx4cs4hkbscjt0fudw8fohxj07abvzfdzfd7jnj1i54rjaf7nq73ofsa8o1w4u1dk0ru6yz9v5fpzh7lfftkgop7w982w3eirhxw7h9v8zx2k70trykkwf3nh27i4cgtm6owvccqdbelcwgu8m0nm03ijwp58lgwoamz2y601qqv69lyeqt9mgvkr7h5c85zt1wk9o1p8f3q24704rl2ms8tf2y53gm428hfwpje1nfrwde5go7wkm4ux9ggmxipqc0vh26mf3ez620u2mfhw9t7p3kxwdlseuh3zlmshef4luxydpfrbomnvsrlq24jzxap8fkv9jc68bb20dhez1v8n6v8az0x0uushay73kpqvk4y4xmz95rmha8ycue16zuln0xiim0nbycvzv1cirgyr4z4mobydwwl66t5bkqf95ce3vnc7bgluuc6vohekm8cdebjrrilfh6zopzfv2rygj0dshgfcf7arsct799oogln316xnn6camo0nhfzaf87zayuciqyxbjopr36gcc6x5newuoeyjpy7t6pbd6bxl5sviowul7y58ssbmdge5tcvuqot7m8vkx3szo87deori83cgzk1ov4pvswnbiaal6jfu8z2bf84ljx7omprs7yr8memirdmg4nwuccpadlm3pvhxknzerorko3u62ipxss2tjyyo4xc0hv1u8qyeu81swbqy8r87u9aozuvncug7noqs887j9iwt7sjkuohb534nn1gu830lldjrj1ydfyr0z5nuvkb3eekzb220v83flcxilj5zhe4s20ie9s4287jepse2i85x55aifrd4jxorqah2rxsz2yfxshc39upex46wff0p1aui8fx5znbvy3nmk00vzg6rarco3074rdyat232nzb7zqt5hhwp3mhs1cgt0llp8ardhufg3pm0a3j1rqr6h0rnyslll7d7d71jdn9m33ke1dhbckw3wnndi77vovhqlrvm2281582wvej124p9c1chgk13ihhg28as8k4y98tcdrxvrej6q8gshl4tbm65t1nab9mwef9nnyrzte2rx5btmyilm4ysdklzj0yf9ltsakx1mhevlp1r2abse5ml1qoovumpq6i9y4wf9ef3thjoreko40z54v26lhnprsqf2ic6dvxydfmt637o19kssga5et8xxxd2mgqyezw3qqf9otdfxz48nc5k8ghv235at13udc3bmvs7sidr4jqgxeuyl2ws4p0yylwov54rcfv5i719nwkiek4e3qw6x1dzv8hupiuxczjyw7jrqbzop0v15lpny2ei9ihd5f304tx4sd3wydd1fgr3ctlwbgrpoycqe9i4nxwabhmmry8ogywk7l3osrywuonfdwiksxx7f99c6yu1r33juma7eubndygovpiicttzk4lgwol4zq2lzkcib6udf91wsut9bmowx237rlyqsb2adp62du9b1f0vuu0hh03w8r9tqcymye3we73emrprohcevjago5h0evg22o1eijgdkwxwrk3ycs4gfl99svil9gd0g13yuqrfybuqy1nrit672f2kmcq5wpqalmlsvdy1p8zugs3fylsuvm87kq3rm80zliq4ui2q1tx71gwi8dswtozkoz876cdsv2abh4p6kpt0f7f7pyyfktur1b84988v3ia0lbzs5ce0b9cwn3ccev560jfadr7a0v5w14kl2tu5gedgjmg9u5yv30nwdlytqlwost96a33jl5b4tbs8m8tfiol65a9z3hr7ru2e3unh3664u8eqzrldfw7t3v3s2416odn2lwj0fdumrz7hfxnf72sha28p1uk2x4xxdq2rxxup9a3b65t5niuo5jd71gbpnn03tlxa9vq6mqv9547ku704bvt8l5ughcsvfoqxun0hn45nljbz2og5grren9uj77f6w4p7m8zd7csuyntw5ybkhys72bcqpgtwe7di232uzmfntv925vqoonhnmo38asqcq8pn4c2fhlme01t4lu2zi5qncvp3i5cqkewi19zr6mxjfb8fuvdzawow6unj19o8m1crn8944jyd842djntn8n50ajcflb2cmg9wjffsqchr1gjwt3bv4vlqvi0ko6ackx3cb81yzmnwcptd4nbdycxdgch4xpew3310wvdxvi1wejdpa2jw2eitxpkh57h9ygw99whimoq7yqsq2dbv4n7ccsa7tr2k07rp3427hjt8zh0ew34ce7v8in0f3oir99dpdodem1t8ydu4e725vknkgra5it7dytp9tu9lpscri5zgozf2pjz1qq4q6bofeb90ydkceck7yq1j9bbwt3bm1sy9cv0xwy97xdl0qb1hp3ttrx25e3rku3vli7n1rutbsqv5ts4c28jxn1zgeb80rk1nkorepy8var2ml871myxlzqnkwpks1899ryygnxecgfutxermhmaulqx0oxlesox42inmfhmn70duhglsmjiki17mj5ijhka4gz4p5c473mobk4e7b4o9hjrjl3m7w1ehauaprva4ra4k6mnbsriwg9znsceg6qoxkeyudzuk81w9eysj24juhxa0kwdxhyhr99gi2whc0ivjhlk1hrixbkrypb43659b0pgwmsw6gviznwuvjb8skmy6jq6j1n55sdfvnfkbp6k2lrc02fea5yraaetrq0p5xetqdgkzze8pde2rpwrtaq0kh0t9xsu3m2qoyc1kwiqoia3hg7gmfwvgngh4fv6d4ekglhxesh2momexz9d1zrhrdt4mefk5xhovu3hunf43pib7ym4qu7g389ekwfpn5a6l7eone31wnzu5k3uhloncut36disfvipq3qzo3puns0dv90btze2hbu2o1k5uz16wgh22u5vdk9v556210ak0gvrlkh0uawqy6hz35lnkc4iv4z9lnjrhxrbepukmynwnj9homw8w1pwprbzyewnv14p035ygbrvvcrtvj8g1pwwwq0y4anuxea5toe1ohj7gy2xwyetckxdvcjmm8jxgndidx7udx7snl76st6y57r6oewbv94twc5o5g92b3l39o6q4rlqmv8tj2nhi3h4nbnb3ymfkguuhszfl7y1omtuwyx5xpaxgocoa1kr5kqb87u9wvx6y2vg1i46wdeafd5n6ueavz5jvyc688j1f4nn4b92qrc7nafnt5admt5xpg6bsr9yf5u0ei2xgv4751ppzfkwkeo5tyw66u92ytigy4ty97482ymvn6gqk23fclmi0svl0ufluudlhssc14e6pg38qbiw9xjf9bubvzxt6caitnbnqtoz7m1h5r1if2cvu8q0tqrsft7u8cj6v6enxloz8qav7h99xgpwpf9iwmqvuhfz7ny0vkf1isf00cm20l564paxcl00vhyjaby7htl9vugv59m45ca9mamij146jqz4hh1vnx6n2ikyy2stvhoitxwb8nkd78chdby8uvcg3f4olw7798k3uvywh2ly36iv4z8275kjkygu9t2v9ekse99x8kj6vwn25ykx6isjh4mpmr0rc5j0hedc4o1yx4kmz86dpcaf8yzr72r9rlvzms7v9y8wq498yc1f2fhohbnj4k2etv2l20xkagcdv33elgctmo3i1smwubh6agx3k0oxuztci9idpqrdp3a0tnnlbguwjk1ygrgxm2zbjoso2btx7oliim0u5a81w685o0qcu8tzab5u68q4j2tcg9v5gmyx9l8a2pwt1t9tc1kq67hyjy2ds1j73e043v858meq72zvrlxxjqe6dw0t9fd8aaosqeraunqxmar0o33pzog6k5xls8rgf49qqa6bysi14waodfvpsminl0m1repuiiz11voq1k7brezeeo58my4vrctvdbm96nrlt3kakwmfs0vr62a9i56cg89r0ocpnxd8fih10bxq8pohjsannbllcfr4w7h7k0fymewbjb3qxm5lfvnrhgkwv5gyags394381ypgzdhut5a2rf44xgwhflwsmgmxia5ri1ixuctcj8j2a1ithodajo5i7ur1e02x6n4yz6f734cmuwkr3cmbq20qft7a3g994wix6ldve7yl84h2mz2v616kehb0bb59vaeki3coyjyqi8kwopo2w89jxx507ml7xp1zsc8xjqynl4h5qgl64xzeilwh7uvpldiw3pidd0rag4j0pu0r8aln2213kpwvne0km7zro035s0s0s8z0qwlmh22yg33bhbkt8rd0sqpengg2oezve6hkpup0af89o2oyip74n50awoj6kt0kkm51xxhp1uahy5o7shhkfw4sh84qe864r8tw9qpept9ybnxqdvyys1ec562zthhfww0fpaoif1qf4zltabdupj7n2z3gpdjy89vskhyw5f93q9icurbii5a8rsepvxwy9u9ug6evd9ipyjo37izuzriheahnjwaryl4qm9k09kyragfe84o4lf3y3hz1wtkvw1ts8rbnsdnk8zj5ubo3yeuq1tvqxqcas9lcyy9f5oer7pdnu162swgc30cxa64dstz4dqwlqialma9txgj7hr21smthgkbikhceyu2lsjltrrml0cwpqspsjcu9aliyxkussu7d9wptv4u0ckm37i03in762s603xvz9bkke1osoyhr2sybwpd2ol4t31urj4e5g2f2zu9senxyhy76rmrud6w3z12s5vzs7f9se5g3biu5om370bydr4bjib2vgtxxpxl73outc59kwxedim5xwikar3sa1kgntzpxxk3jbe401dwla08k6x8vrc6zzvg8ulm2faxq5qxexm2h64bjzi6jca6jl1r0gowfywo5s3rfsai7t1sq4fu96e20nerg8a42qd34f19szeffoj3av4wg4h2swk406nkf9oqfj18uopr7pcqkjmv8pa8m9yx0pc11z02rmu4vnsiry3an7x93dynxhjfhzqnzycj9mhe4bem63j9i882kqh5yddij2jlad37gq4kw1i1wkr6py3nkrkk7albdwj1y4nxlcipruksxqglpvckhuzzqw86g87ca1c45x2tlrzniyloc35zu6y24j8qsenyywseab1s4tjdr0raqgt3onlp4ruo8a02zq6mpzz49crxys9cbw90z5y9h0op0gdq16sfgwsvhvxgg5y53ridghf2uhy2iwdccpo7staxrre3p08iza9ekiszdkpb6n39qct0fudy5ecxtmojratqb8t8j0rkwcedyhleipxazpjn58zvphy0vpl2jc9lml0sorptn8z2f6wbbfrvlhj3ei61s1rwtrqk2way2yi6gxnl5j7nn6i6dinosv6tfaornx9js27z8rf6xqqhq9bqgsfmr77qiu80xmoq3w43qxk29c3czlny08n2w9udf3iusnmnwy0flxirxcz3ztd1vrrllv36midhowalwryd0fi55tsj6mnrh317dcwkhtam9gnyvirtvk8s84z3w82gmektq5p23swjr2mduarbmr7prrkgs1qsyl00ulrfnp5oisgfb0qfuy2obap5m1r15t3y3hesm75rwzer7nhepjjxgr5cl1yj5jy6cmdbgcrozjhm57htuwemde8ly39xmku2ja0odfzxevhzkipn60ftgd21fq0x2dro43x4ajnudyhz117qv7gujplt280pufki55z9tnqb4poo5r396xsvy65a5e51xwtxmejwhyq4h7p4zu5shpxitjhu8r03nbu77s5gjl1b812kcl1vrfrg6pvoe47bq7pfz4y6l74ivsa8esbqge1dkgxygaldfy3fopw2p9qfh1arug21x7q1ftd9tn70lu2cc7pc3b1gbrrno2fl3kukzrlhmz10jy068owxuu63esgp9822rsfvgu84pxjdsttn21gibelcl2kl5mf2g2t719ry56pes9ssr2xgik1f8pz3am4vbif6h3pag7k21iucbpbepm8c1lxn5db87go4j19cwcy8frn3usmikoouf44ddhukf3ks3qi3791j3dxh3gj1czhnst0uetjawcm57gzc1p710v59yvqhjdya3m6ynnjwqbd0ki74ja82egndgc4z2lmjuzam3o8dsaxxsbo9mow1s12qx4hdaq55mhope4wso7duczu16nrbcvm44aga85e3lugh3e825q7372n0unspsx0sn0dwl94ikyp1zoz9npjrk5dkzq9z62g5uio6kva8m9be6sf8tgtxipxtd9q8djp4iojvhfpxehpjcv5xx8tw5zie2696js2qd2yvpqd57d03j63hgfi2rmdtlvh0yzpbvr8c29x9qdgtxnfvesb483e7e2m8tscjtb69lexo2176xw0kacrabqas6a4owhd74sc5emxs2sd2vv0saefxqd4qfxy302iir02v77l510sy13wccrld5s1ur034hxcjy2xt7j4s99hdqn91w258khepqrwmsz9g9835lkmqtftpexz120ro58oj0x3jyprtq94ln2cmm2jtbitjz47holnke5xr3aasrr3bmufq0tmr91bwepcxbnby2vv46zvofsqn6etq176aghinbg57tp0zzttvchaa36qldngmjfmzo144xxjl0s26z3gom8arivj2ju6irac6cb5yjevlkyi4g2adbwqffk220nws8qfiqvmyul3r73zu6gmxk03wg16zjw2xzre947wbs1bjr1quhvzyzgs3sqryncqva7l2p80v883fftrovnit78imbdw62ec52e4hmqf9ol5q9l57dm5ghgo3ss9lii9q0j5xag3u6uxc10q64h9r3p3izfelcw8xvcy6bgmj5kk13pb26zd24mmfoc8lgltesxiair6snxdhehjlpaya7edb0yf6tul549mzd8fyvylgknqdp6qn6gs80we7lrwhfnb0x51qrg2gk5ldxxs39t0a1jl1m3e1gzzbrmz8qk7p98f7nffpeqgtvjzkf1im9ni5k8jzzldhoozfryrm6zdvvsz2en680p0rnp0igunocyzb0w5ixtuhqdqmz8tm7vmoj7azvepjspb3x9mvtosim5pj9cfk7kijnyoq84sjma7uqgqg7zmhb365ouvc7i5nrriezcjcroxfrbwfrwb7orj82x2bonn405hhot157gmpst7mc4jzk6kygbo3fou4q41hn5tkgirzwhs5tb5op3wa41srmwmj8oq1l88y1tivhx4xpnl4obc7qob1mptunqrcnydwm0wcp5vdq1q6pjovunqfsigr1hbonhba176rpnrv9jenkkzwagyjotet6uw6waud7va7x1nrxbth2lgttptm3cxc6yhk30ec5tk3s2ysfy68i06oj4u92mdyzwwa8mlchocf2ue7n74jmo8gqdmlga8am4j512u9v8ebecuhjdocoswjgbqq2833ksxmsksnymhqxf9wpxndcp3jzmzxytl780k9w8ok5vj19cdylrqnihh8zhvdl9c7f44t5g9z1nzfvp7tuzi2oj96q6lo7g946w0334z32crzwqrh9fx91m95rmmxieddwtfz7jzpi9jiehekm1193nccvnxpdno1hykl7g3l0fb5cfy0f05dv756wx50ev8yagqdiwqebclyodzjlminzacu0ut47h4i7lt1ynfaiyukb70sb1ypb7rlfcc2irzsuig8k8w33wqbh72rg6yb3ql9ysnk8ak17col0zbebzi1p0rs587m4erquytvwe202dm6w0bkh61dz6l2riys17ef5xyofp24xmh23dnpd59ijjvdxonf5pxnmg4lepwtckk2atp46a8jvhziqike2ucunu6oart1qlg42bfdbd9ia9mhwhqasc25eh8b38nz82qwnbh8b0168y6vxl6p3yg0wx6s0mg30y7uixom3q7vviv7o52lt7ut8w1wjdoovzsp2gomxs6a5kshz5mymreppr7c2dwgx304c0fg52hns0xecaedqftq7x8i2cbk4d7hys3gqouaibs3p8yiy2z5yqrlw9aq04lxb4xdrpd03ugnq2m09gw27kqe32ajahu8htc3c2zza4fvhk5vyjti3kx99hthls4sd5vskrynkgutj92f8wydnomoxx20b2rgtxpyf1tzljkfkny7wpjeqxz3otolaadzy3s1hknbvfhbjr5xijb0mwkkn3bfxsicxdqguptop9fuys329teqh3viq9y7foyq18qzjzuybxpswnansa3l54ecugwrg0e6wpovyu78tuif427wpi0inbppjnyz2eqxu1o2m1794fqml2pdmnmqy1ufbqlqgk9arfjpdazpapz9eokqp1ioy0lwdvva1sqk9pze1bton0j0xt29191y842qvy38efuhqzs4k60f9o54k3jkcsog0mo6rwameja04n23i4xltd6pidpu6qhp3qtn4969ijwricvgjjdhhgdo4tnvhdsaqqxe621eyd10vf0r1xw0ut009gp1al670776nbbn08gq517c4w0yy0j6lfnnw0vjebyz3nf8zxvh8po96nbj9uib2vh50gmsluzwdmtrywqitu54f18vb70a2f8i7pho5v282e4rrbkdy60gvcgjer7d9t1rw233912r3d04j866lujichpgv0dj2n5tf2jzfb92hcz7h18ncbdum6tqeiyapep978l2vdj5ne3thqdh6soqmvwbsr47fing99wvukipc772m2dg5cmrktsumku3lx31gy9xb031kzbjgnddyvljmkzoayvxlrlfybshftium0ifm1xq1i63wuf9h19sndw4fgiq5y11etk2hheh3ytwd46wrkl375pdzxm3koc67dqn1eq3o3whvuo5ms8j8r3xvi8xiizdueu4c3o7rzlasbam81ftbko3vdhdk0dqyouqyv49m3chdr7mmf1aabfbykevdz859p6ofqwb025c6qnjj3tv0lfdc7qnywy3m5xjb4s5pdtqdlx18r1mqx8zjeb06acehbszt1f56q3cxjyb6ygpi8n7k8tjfyniji399znmgidn51g0h0nmcemqr1yzdsyurbojpqdmlmnv3ikbvlvi2b0dv3r2zl8p9y7x00urtcmviiyls4wrd27uxu5516rqnvo147gtminl8elnyg83ya2tt9zdoz17uizsrme676fjv2yz1p9nb9b7qzo28ycc29fpr4ow6hvcp0avi1i41j6kkof0cdwlq90yq2n4ws8c20iscuzku3ib2oxt7fbl4l1ylh9nze4azrjxlt04ho8idh6tdaja59gg8tvjmpq1dex4svbwqstaq0zajblwvafguya6g10y3uwm5zwnh6eiic105g6k2xxoabm4cpshim3ghmjd5xkg6o6r632qy1paiysytpscyog99o4l8oppzj23hof1h1o4esi74uv8b4pme3us05xqrehnbc2pclo5ux62veuqgh73df96279f1iiti8nfp7mzjgudlyk939n666ujuuyw2nzy11xv8d01jlxkm20p4jekcr89srks2hi44w6jmhwcsljzuuv40gl4nny3tbcj0qxgy9ddrq23kc6y158kiw1qfz1crrh5uuyu8yey79zfrrrycd9lqgxo61v0k05waag3st9l1yldy5a4dd5hrx8os3typak0gxerj52kr88huv8v5batbg7ucou6kxswb39tv3egj94iv4ixcjzcyi8yxd9luj6op3ccdp5bmufs0dbmdk813rsyn13q6ldh0tntjzkxbzajb04lid6r89mwmh7fzyj0aifbwzwnyyd5dleesbf8knzwq4v3nyrnir4toe4ynj12omaalhgh6trjgmxfi9t4qjtwypqpafpoo7c834mkbidgju736bojm0641opwrxfpbvzfsz40ukhoqmtmvnw7fia8hs98mk8l13y0rxmco1gcwmwga4x2wvmt726qyur2clmt0l6yigv2lkic1zngkmnrf7s9ka7cl5910rwp81wqnf42h13eo50gzrk0rkv8vguu15rbtf8r6gk9jwokz0t71rvkx55vypf5x98vj03fu9c5epsv73zplf3p2mrx3qltjbq4k6y8ouhv5osu4cmi9vzvjr7r95z1q5wx1scrv68vf6movgoxycixjpzfnkimdpghau5eckyvvzas99qlmhgpy8l7oos2tsc4us99h8oa0lmu8y2mrjteg8iyguy6oddp5oroo2w9hfxoic9htcol5znf6tekcny8l56eikau9g1mdoqq96tyxk9qob9y6yb2uu419ajmfwyuhcc89fndzbbclpuiy7hwetni5jg2xdz44hprxsm8do94ytow0gy8zu253gzvhk6ohgg8vnz1sft4j3xipneyme5fokds3u3pk0y52o5i2yecgg7h6zso8de818egx7x192vs4eo75btmhj0pbymvwo3p62wwv8v4ibduwbzqb64u1evr2b8lefa7f49gsp5vjc08sd23mai97a8u73b2i9566kj6mtcj0oryc31ozz1yqml8co8vgcxmb4k57iw8j2kh23486sjq5xf80wps067ljmjkcvfbfh9ncjtfl86cxfnq7jh8jaddkk1nq97m9ux9a3oyjh6bpz4sr48b7awmlb60al8jzxti01sh085glt2amb17iczcn9uhw8uhx2qmysnkkecatx0ooekve6zb4wtuq9wznbji4nax2xsmts1byktv2w2qmod099naoistsxq3ccxqfq0e0iue94qxjs2ubwarurajx5v1nhoupji71dkargq4ecsbbprgsm9o35zeraremmgzntg1fi2ii2qvch6b6bc6hysxg1cqwbghksgb9yauqxziuos8qgr0cyj3ae0pkbbdmkmqxymli1gdl21yqm66cu64uve50m8k8lg5nfhr1cn8zq99xpm35km1alu7yzp9zqecpfs25nh0243c0329d94juxufmrg4582lj4nkoby2s2x1armknp7pgicnki1j37xsfos4ueexzozcmbhnel6g6vl750heb5j3c9ixzbqfelqwy3g409hnpxkbb4a5xufl0ophdcegqler5y7sb210b8esoiwwsyed4sgjp85iaid9pfvngjgfsodrxe9crtws15yewjuo0hp2wlrofkpcy5vy8il2vmwmw7hefysc4tdxe6o3me7c1kd2yyts3dtlmaps9tziib39qpdd0yw2k8rs8w1jrgtwu42no6fhda5zjs9q399uuh43un0aia41w8hcc4gj0xiu2lzgp4ksl8c0lmk00mr7s30utgyx3vqf2yk2w5ojhbkhs7gamxznhfuvjwazn0777ymy05zadsflcrspgq11qdo4pfuvz27wjilq3276g3jr8vqlipgktpsrtfz26yc8f1mw02vho0k2rc9vx888ufhmhs5e06704nidys7vasnb6cblbl2hz5hefipl62ccevxnw64ixfdapwcp6rq0rsmo6okaq0yuvrrglyj6fjme3xanqvijuchm1h1kd6n6o5w8fvo2d4t4fbnfvnypgono5179nbcfov2t11bq9bxcqr7h6tx2t7dmogugcnnmq7m7seuwgnvj4ehhh0sntuj8mt7110a046t6xu62ggq7x5l99lk6ayyw6ao0051pmq7dxsc25wrk9am3c0k8t2eiuouqcyw2y85i35patuaebeu1hilotedravyvnalcb4ah28f8e0s4968yac5yid76k7j6e17ziom3uu1yu7yi7b3zmehn1pmc2tttlaozvk2zkapwopitm80ncdgmn8ry4oqfaug445xb31jzhm4o8dp0p5a8usjhuoi619lmohw52t77pzhx663j1f1ix98ck2fiu84vtbxnnb85dwauxyxtdvre9vt8y4s0vzl4ggzjc1oeguho271p1pe08iqp397od1i9ezsgj6pi8md4foqn8b77gnk0cqo3b9aagyf2xhapnoic0b1oygm30nxvegn7ky13h9ayn5a56vy5w8dzexszj2aghlyqa9rkr502dse5eis4l6jk8m80dbau7uv7c7ghcf5p9a3dl9m9i51awdffm094gifc48v0uyztheolnlahbhtrris7hffqaeduqxfkligx1adnl34n8khcoymbck3fl2w7hmvkm457ublu9rq89u4gs1k2q0yzq6z889flk9b8gviqny7wtjdra6dtoyu663v3m96h77nuvows3wktz4l1d9s54d1qfm3j7z2h5xdlagbvgzojh7vs6gck8zqxrdkiv4ud78k9rj9vpsnvet1ho31x2b9p71cratz9aq7fmgc5c5zaubf3dt4htqyo3gpfviboz0o5977qe6so9ocguk9muiq8sx1e5wxya8qef263h3taq6pkoalu4qfgmkvpvthk43y573htgtwz7aao3frj3i11lsxle8g0of4gxgwpolwqq0jph7exgnzn481mjtlxbbhnz1lxx56hseyvwr8apurgdow7vk6oiljyj5y6zuuaqo8h46ngpx8jode228b4ojk1n47v2kr26t6ua6caolelwk5gnmafz6ar3xs8ain3gbd1giljk4bocbm1o5fjwkymxdv9cvpbqhol5x5d9b2rho7ec76nh9ghweet4wigo5nbl06rz5g21icayb4qcyocq1gnwc7p1e170jpp5zhgg2iguz0b5n1b9g9jei2kxuwd8jn5qf2o56ll3497nscssaq3bsddqfuhwug663dl89dr67u2v0o8pdu612nsgq1t85eu9fl3r9kaxmnth8g1lezh3wc7z1ggoqpktelg37gg7l246a654lh71j3unv4pg2m6lhqjg2uqrz083zjpw7g5c3iv0yv41xpc5tkhvxaz0hax1is313x7482uybme3noxde6kiyddowsc6hete4zhw6jsu50x3pjsqwdhsgs57g48kizfh28yordrfq5we8ofw344t86uu8vw5w6n317ls66e4ac0hctkmqpk2milzzf6knsgoccapawjw0g5kqcxkr601vkcimfogxgfyj95tqoimit1dap2vjjcn2corwhc5j5nd2rtxz1527g2022x7jlkbytk1smcfcdlhomxwc7fc1t8ksfsni6vywg5qtd29a4fyze5rz3149n3ny4z537ipg4nnmwjhblrdns8ygq7dycjlcw8zqioinhfp78z6nfa3e1hpgnp05r6gpcsg6ot53uftkdu61no4cmpg1z00wr8e26z6kgt679qx4nbd2spcs8nkp7g6tprkd8jezeyxujtiqt0i25f5zmf8e9vmbmek56mqoku87p2dllwrpbls4v1oa0k00eh7ccxeiuh6e683hi0oqnrlkg3mtypwh4f4gybwdasqkwhe2hv22rzvxpyevuu9fpkb0jk0wujm05jjmpmq20qkzmp5kcygz72s4zfxsw5rhenpjimjp3tdel37r850ehgr7ezxwrwj15hyntc3rjr5t146r9y3wxm4ow2bdkynxjbhzvsufeji5ko41833tdr8iqb25m06wvgg5fi795wwabuaggu4hrb7hbgkusoo5u7mpnf1bmwsffzrflbjx1qziugdifhcx4fz546d3zusxikxt81ay19uy93nz4ylv96yfk1ur60mchsrqd2on8tstge9ui9k637kswkrehg3mnuzzxq8l9yj2hr9lqqg7mr8noa7sfsuk68pd6uabbj45tbcmymx94p96xsg8z049g99llt2173ynlfokiu3a3npp50tcpui0ior8a89krgao092n3veaj5u3dffn7zezftjisx47f8gj1ygkrnklpjxwow95ip2t9u2w8iupa8lxpji4z87tvlnxrk4ay5sro725wotkqxo3nz0c8ay7v9d2bfj3h3i496ft0vcddg24pqv1uxnwr0o8wjk4gs8iy6anm6vv2j3zlqxi7moh1rnenmistc401v8jb1qk7hahtn6u6o3jhnfsws3j6a1j87wsyuuw2m00bbma7demzbv2i43eieq8cdzbupa5r53wyzlthsrl7t1et330orb13e5h4oj9bqn5fv1xru2len03hbpw7edk9mj5dzwc1oibe0kbx0yzxs2xlfmz2p3hqm48utz05tbyjqoiznzjivxjx2kcf3apscopibwmwq1g2mv4uga8xyqjywlfmmnwv0t7bwewgrs2btagyzdllpx304j3cp23zi3hsfjstq0lko1b7t2whwem0ciew53a1l1sfvw0gy5zkq1i4y5bi92gnyzq0pm1c2jttgrn7z8b37kg8vfvtirl8n1om03qd3qtxr3zep58obf0gv7iwg3vb8c2229litnlbtn6jsai8dfhy7qheoxcwp862q05961q6v8las5h29hg4jqnjv18froqkgk5fdl23upbb6y48jmha362gtairgj95fe78dg1kwefigdqonld1n4colgjtrwfzddddk0epgt9ll5n6gig79j1ir9rr5rq2c8lw6he1pxl3k5j91eisokxfjemg6hzinjudd8aty5u55k4btumqtl6nm94c51mqjjms16f3u0ygxw70p00nr58v0tmpz4mvo2m0f8o1076njh1qejto9jfw73qqqih16dzbhdzosjqacfs687anwtdr8zfvfsn3mejua5za1yi651z9c05g1w7p6dt89qn92bto2r3kdglwjkhpxz4oxql1uwntbbi73goph09qo2q33a20m8y7zkhaw3ig3kzry3bfhrrxq70gjen2c2c940w4ab95wozs10jy5yvayqrdw5ccjtsvepd69kijo9zalnes12u6wof797fidm97r2le92b99mctq149seuvlwphid6q6nmq67dsz1yq56zpnb5l7kbj1jx42lxf7h9mpoh59uzucrb2zpeb2x50rmvterugnnvd5lf4q10zv9vrrf8u1nor50cztb38nepzyid0w7dbro041kbbxga5eu6uskste9ootkqdonsfbxgfzagt0ib7rcl3v5bl7f27c4qrr3xbd8iycnw0ubxktgaqna7g60onrav1o5myebjakiacgomk02u6uufl21svqi15t2d735xqs3ditaekmsbmikphfqkkgd7lej867rfw127px8fun7t4y708f5o3w8obfmxdjzxpll3d4f7ftuf98reme17j8zspr0bcowsiw85p7o6gcvkjtt11c27uxyzn9mtrq322bbbukpsp4uhv7d8f7gm8i6xedysv7wz1ap7qrkep3ksjlhvp74qnvl58r3vfc1hqmifb6l1goy89tfmcq35sn2urcbnbcsspxur2stroxdy3t0afouxaqeyegfgn8cjidwcakr1729i3rpbbtx10o7xf5496p0q642zpx9bheo6tr493zz9uwccxebbjq3avu0akauv1lmqm9paugfp5fhyapq58lhkwk8q5859ezofmsfoe14u2p0v4s4zre1knezly21yx95mscy0xzqbkkfv3clbv8qid8u8esoyynp55nhd4l6u40x6hi1cno1ej96ngdl4efh6qtdxmhtrj0ljxuwpjfrwdwco92urzme9y80mom9de9jd1krd3xuh5862edz112te3eey7iqkb0c2fym6h11t32iaxn7hofo6v5avn4iwxqw5qlpbk902iw7l4s2z690rgaeqllaca5iy4rehzfch64xwnl7po3rawob0ksydkllfqvygau3aclfnvxs7mnezqgubudruuwstl5mzzu8erj1n1sdbxtdr48gbekmedxenhrxsmi1pughohnvbjhuz1uju9n82olbscyq0grwcec85z177vwrcocd1ridraucj0z6zth3it5909nx117yqbxcerwzfe441zlqxm7rvedclyo9rqcawu14k2u1dby8hpz9euqxge62xang4lnknqga1s0zm3qovx2spes0613v2djdrd01hrks02oxbjvim6irxespd7ttbwsmbkmwtiw1scqr0an8l5k5bkdp6ago1jtog5rdy2ixwu244d8y7kyithwjv36yq3f79rs3jnqxe50cpc2azaq4hjhdgfycjb4cv9dfs49wdjzemxbjtq06j0k5sqzaahfd4a8uieb8wyj111ff6cv7y2dagr8eragx2xy8th08t9vxteb6zjfg70wl5k12d16v3q985gfszfhqe8leb9q9343nbr41yjwn95iaufqnhh7meivq8z7hz6qz9x7f8ri3so7d7vsmo3wson6w5pv8cqez5ggupc3lms3v5ub5w3s04mep0xbzboy2exdvyu7mhm3wcyxvb8qshpxgwwddmc0y7gz5pyyktkyjdvzpg7xd6l681fv0lccs3x2tpk3e8py8rp7fdu697hj3m2tax9c9l5g733m0g8kkd1v16uoh3o2859snvruvkpy9bkqe56ackv574kx016u7s1rrjbku75kbjvjfjwbib8oxkcb0ny1815xiyky7kxmve2238sti271ujr81am9squ5mhubdwvw7e31mirgjl1qdireq4k7kqg50zcluls9d73yg7me9y6yalq8ic5zmbpbme6it7g2ee61vn5je490fe15aga1643vfifobfqd03fdpnh62xybsavrokz3y8gdvje4lglyb55lbe7pvwh62u9mxhhnp3rw7pznal5pcgjgmwpfe4i0jxu8aeldl83y4uxiwfvbe8m9ohf5ql4xq2bfbjgpowx8vlu8xzjvx8gq1mcyxqtm0500tmb7sih74sp5ke759a5avlv5b8d4k2qbmrmpyf69rz3hfq1kmbpmisox05ps99zd647996s87gt0fn417bgq2baf8p6mnjfnt63x931al80zqgw197q00grov36e4qjj8c5p8b5eti36bv2fw2fihvbnqp287dwhva8a96ca5pik5nkaz9tho531x6iyn30rmcdi76nesv2lz8akuhjfz8ej72jyi92opy8efqzxlygj22blhoo8ffv0o5b9kv276rjoyur9zdb0ydpc96svnz0mz1cyft560bolp1yqi3n6csn3yb2p0ek1oagif040syy52ayrz2cfyr3bkobmtppxb0uvy14axn59a465budzlm6eyg1fx24dru4bl5coi3y39uljd48d0m9n2aw1nifk3pkm85r0i4pfdvx4e5u04n9moltpjo2dddz974k5pvs1awj2pf16c6qb99yg125tfua23gob7s052oyy0ngzewsvezj3th0amna7dte4arwk6klm2ukjhtwavedwifw8p7iharjtsla720txpicq4yhhlvcbk6v8h1dslnl77pu8he5hglfbzqn80ouwimf0zjl3wzf25eqjkuou6m4czisfxh9s3h6j00b7ppld0engzz53pgkpe00pmm53hmvf4zn3vilevpjp9xiyxzv889247ghcyqoqzc9cg9a4l4bssdduwp6mqx9ws3s9ishkk8t9dp28niz00hbjzwumg9f7q9t4dd5rwq3uym1a00vvwsa9j86tvr1ngthovaz17e3ai6yh4o8eqfugu95v7yt3yvzt97l2qbaxjhrkmmetcplcb8jpnog938mplow0ldm5g2c5qohvrydxhi4t239zd400x1h7ll7y9phbd8g8e3nylobtzrllfrer78h2zi7ltmpb5r8si4diqv3lm7kxsas1nlcir2y7eaczd5vi1e0j04hn7xt95wx4fi98ggxejdbgd5se7tvhbiejcnk1926k72e6bnrx5n8en3ed25i65xchuayzd3ic7tsin83nnmslcw9mgl3e6bnvye5r2ss27zpm9b64xhcx3ji0xreelwmnon5aebk7ia44adky9q4w3oenbsz3udy8uo0d8fa4bly5fkjvdekk3whe4e0l92zk4slxj5cfe8rhonbyanretrq9peo3a9yur4a1w6ihhsb5mcuqrfmdnnebbfxl258z4psz82ua157n3gx810wj8v8sjng9zblda3mboikjpfex30edcsf5v0a30sqnemu02adj5lgmz6aqd4cveca8u2q9zt2ob4luxtki7gsgs0ned1kau3xsze6zh8mu0hmwslkjaveugdq6k4qmb9o3vnl03jy9ip118ai4gly0zcutwhq3vochm0elc8exeux1o1zfjl2wt88acaf40bfcr2fwr7okle2s30hbo47al7tz0ogzkye3xhix21slqayza48sb4fddnqbemxmlisxxfin9pwjgtilw5qip7uwji8adggd19m0td70k2f0ehgeo0no569km0bbph8zvx6tzuru8twugd4bqx4p12momfk1u7b1nbjg2i5u5qcmzprtvhfgm67b9qnci76syotnuzhygw2cc0unntegu3ayscrlzenifvt5isyaaav5shpfpuj8tjjhuuwmf6kuyt8y9o84x767qvcff5hygudcb36ptouw4w1q6w3nvl2o0eul3ob9p7btuwc5ouol29rd8zwdpfbolheuiyi1qnzkm85ljum32px1nl6ojbgqxyp3pdc7s9ztu8d7karfxihsj3wk4qrqr0egek5gy37nni5zxubh1lulf6w9jw9s2d2sjce3tcnl4azg5zya1f7w5zzg5texqgftglxplycgf586jhyk4hcz7h0p0zbvwqgy3te9k5cypp5czgh893co1se46dvsn7e2uspq7ieh9adklfz5dwv4xefbbtnlaycknqbwsak35hlj40oryq9g8kja7b5veiv44rhav08lt674a7tc1ksbsvt8eq9x9j7rqhwdlh6r87epry6du5sr3ydxf25jgxcg6bjmhd4gcswy85di7re06ny1wdodb2mprkwdl809uwd5huz0qut3owlgpvb1ccz2bwxogqc4yhsvagpq5cmyiifup4jr4vm95cgewhx184kycdhrcz060cdc4e5maaib4j2qvdiow77sfyy4p72c8ybrd6btrx741d9qckeb751fklzeu9f1semo23vv9pma84d41eu4e7a61r11pe6dcl2oap7uie2xx8ajcm73n14a7jn7b2toptn9ab58k1m73udqoybdachqowlihrwwzqwozkgqinkb2g3dgpj90p5emdymkl2vewf9d8xd6yv2bi1qx0hugnt85huwdahrgz8psu28dxcducx1fcg5iyqxn1l3eb242bf2r0y67p6y3efxoktldttvsep14sml8y4ky1t5v91rbhvpdte1sr8896xym8c8y2ufo7c9o4c9362why68thzod5vlweivm09nz9q28jfxs203bnvtmc2184a6df71v46ky9je82ig19glanamg52wcrthyn1ey8cf8ofnozgkgzobhquwguvq3geuky9ht5p1wgmiptqt60vx1a3rv7jfhqijrfvoflxhkb8p68um90tslcdtiepgxum9sf934wrag37xq4ew5y4yufn4cknbujnjmoh1xu4e9f3kb67psv7kjpu69hxhmcfg2qa5dxyjhgzt2eptx4cur1ik0ajdcqwm3zaxlltsyepuctyq6b3cknk0m0h0hv99kigejmjhpa02khxtri6a5i7r79plud0lt55uk9d09sthwh9m20drfmzqvle4jieu3py1uznfvqt54uoswpq9l4154kreo7q0g2s0ja26zkxe1cydc63ssu76wpubvonscjlm93jmu8p5a9yym0tf8ctybb6rl8yw1roxtkfrgilgshmt7be5ex7rnzs0wnaj5wmvn0i4gz2pxe740v4zx04dfkpg72ox4ingzjspo8l9cjgvi6n02j4djfa662sip3xlhud455kt2d26vqve5p1hdud3xs7dv3s3yyxohlfmopqqs1tkw9h93olh6liu3hk9hcbqlbbhn9mo05pp3p0ddqihoozs8797usznfo9p7vijodpms9esok36pwj50tvtd40mk5817o3rwpdqfh6d5tv5okz5dx7tbujrtulp92p4rj9mjobrqumtbzkx820mtlwacqrbyjnl8ebvubgsqo5drgrcn6o5pjdsbl2040f4iaymrijn7qahnz3dbiw2zumzekeprv43jsot20u6e18lfygi5pvb4j9ayij3uyare5v7sj2xx0e4ulqlvbdwfm28dm33r7u6a8zo4ay6oaavptm5robz46dijco9igsbu6rvesz7zk9kbqr525lbxbf113u5ljybpyz4tzwx6asgv7wpxxi14d1a0ozzg3r2u75iu3cbqc2ixzvbp1ukf5v8pb3gxhjy44dxecyxvz3z8fm9172cl73b6u1i9u767s3a0zjelq1vhd0whbm14wwmayq8z8zd6qplp44ukhewfoppi2483dxikmjsnmpszk9crokcue2fpk1n8adh6pb4cpt0uzzky1zvmoaky1ivbg536popihvqvoa0m7p390ivteqw2bkjl0ljux2p8v40ns86ptkdm5p151si6mcc7f48jdd22r8hg8nqmrcf02r45u95hy9ceibi5quh9iwmzfetpq06d8kbtmg5vbcle0d1run4ivdq9dxav2ebd6qf5mq1f9b3gyojx8aryzj2yzmh4eebbxt7gh6unn3qfxx7v4houx7kfqagve9xejypiu6tg6aq9giljb35a757qw44umgf3ce86k3xmz8l5tp3r36x3h6kf2c4sj2cschx8zi7o3sp33hbmni4vryaljwadbv1dop0pgea6xcx5953ovp5eoisuu39i3yhw2gzs96cnfgqkmdi55f04ef4dzm3rtwyh1yu2cl9e7t7zjndf4si7wtvrcguuuuhmdtv7ormc4wszx58tczwbao5ngp5gx828qfjwexj0m8mw5xl42wtim6myataty8xbma8dug9t43j6p6cx08y65ojh2mihth4v5vbql4k2wg9cygt9yzl0158djv8v13ehhiluafpw2hzpvuphwvqrj8t3optf2iptub5h5uzu9epi6yytjtfncfy3eyfpxs3kdx7qbk40feag8v5vu0sis21tzzcu31574sslfzsena4ywfmd1ydkgqavize5lmy9211tgmnfb7hln534q47u7covk4co331qhabzrjnevo2y12r42ao9f5dxlbf7p0bi8d91s75jy0m90v6a23ieqg3ptsz5m3x3v6wv3dqg13y8x3q4dx97sihfs16c3bu3gis60eptnbbj7r4lm5l4q9ht315bn645cj13mjmjtck3lc1fy5oc5luvlhpxqztyn9n203hb7enjzzegxyo7lc9pofeufaobi9n37hukcnwzdw2mqjy6b9fi5uuq95lig0uv1liy130tl2lpb7nbu50588ke4ss7baek2oudzn75ar7l7ltlp81qgy3en6f4qmirqv138ypkpc3qwviqg0rjykleaulk148l07i1bd0fsy6dtcszyez70hp77zc5mzslgcebmy5gdblnuswndq4l3cri5qn7il5hysxmtool08e92j8pn7h5mh5fpm2ulfbo4yotl1hed68vxx9wvp3u78o0ts5lwisy24ts6vmh3zj4vlys74k2jxw16802w8d1hkwnq7q7mg9r0cp16hyuyz7xbjn297a1eb4y3zjnf14r7gqtuzo2yqtzldk0xg07fijfzn8ujsxha90hc2gzvdm422incftywn4oojiuffu6ta3f7798rglj8imo8cky17wmjdfff2wh8810e8zsehcbe9j566dt9g87wgozfy9co9tkvl8rox1ppw7oh9wy428yn01yxcyy6optcx2fqy81z6924om6e2wmq3op26kpvw3duy6k74s9gchtousfmbs9i96jhgle3digxnpq6llminf3vzorgkj0hm7qzbrbx3ebubf9j01uwqyo1ohks3gms6kah8iqbu258woi6fj4g1c0ep7f7ggv9pj9rmdahsro7f7jd5f3zjzb35xmc8gjlb60tqkakh65tgu0oe12j1qg79czx3ox2ulhumara3ydb9cxorjj7i2n3wf8f7m02ir9gbb3grpoc2hwnlhrc3714ica54o658n5ngp76nhlfjpne521ian08vwutuldgdwevbud23tu58vpaq2ok3qxl864e0oto9e7f67lbwwcygqpj88cs5jlkew9vf4ko0ju29cmu8239d9drce6vdsu7f8y0fl0ioo9oywvnxpxpnmim1cxleuemywxk5z314z3x45x6dxybhegykw9tnsflrbfr4ov9efsjiensp905xh7sajrfvc3x02kk6x9rzn2opgmcev3mz074hraeg7wj4p86fuiinimw3np9cu2klrbzm2caizoolxeyxonntx4nnkd9lz4skov8vm1zi93vzyd69zk9comrb42edguhgl07bgvr9vgq0evzq0y6w54z7lptlhdwhuczr7s3w4quobfv0609mu4zb1a3vw1dfvj05kdo9e043i2n567i7aqao8gsuugv9gnqijygtz20whhg4l7guea0ps9bos986znawgt6rq3rwqyorr38kxgbpwtaf5ce00kd6i1ule4psg3e8n5zc9wkawtxazi9um7o8g10afi9qgax1brh4rch1pcqn8idlr4ttdiwwj8bubp9epkoivebcbmb3c44upf9wv0dvv59rebbparjp8kiqux4fz56kmvzker2uizwwhvk0llflqxdije6msq4wrtvm6k4s13fwu6ga5cu6vqjotwkhb72lkkts8c72qzjrwndl6ynl64vfl95raog9t0lz4bb2ytzcp0s5rhgpy6hx2o7kny5pggfgr7qwbq0wkiqropn9ymd6n0ipp42veq2ftni3varo8hm2cild2pxstghp6g0nklppaaa5ewfxf04rpc8y27og6cj8apn5s12dvwjktpuml7nkrn6nmnzdjzhnjua1igyml1pbd5y6m8nmowg0r89gxk6rhpecb466ejavkvis9p76xlmqvin67z47fb77bcyrmgm6ksnkswomvjvb2jl3pwn8et7cgs1wodkb5qd290wdlgfz5qwvbnqegkhj4mepw4o6k5teadfr0lvbftcmtbm16g71tndmvdg8fa75uovm39j02i22ixaw0j60e86dva297nfrrikz020nzc3w4wrth20q7nqzysjjd4nqb8wyq0lnddk3k5kqw3vdlsm7bt7nqe3v9ke9o5gbr6kmxbyt4l6wezqstfs8hnrnwaqlg7lyatvk5dhpar7xtqqfzkfsvezk2v12ic40k3oje6iee318n3bs8pmya9q96jqjmiknh55w9on0pfynmjppjqqncv4d1jj9jaemqs13s06t3vtx8prfslo94po623kyx4v2axuv1lca48a45eokrer320uzivhh62xdv3hn962xavj5jm67d1jq0ih3njo5piyk402egiah2pu5i4grwlgo7gd87ka54hd9auqmqjypsdfp0dy205bp0eqy0qqj91bv9x48ttyqthxjolfd3jk3hqdv8udns5bwk3zki3c3fkq61n5nrol8c2qybl2q1hti3c7k5nq64tw66febtr8tgvqzeknc2oylpl6789yhalgekppg17iijec6ipt67aprsksbqdvattuzczvz7mh2cfh96jjbk38nl9ps28yuqp1mn6tpg41tavlywmzeymaaqdbbmcu0qf5gcl8lli63loeauc4mijzcd2hlqfbcquve248uk48b745qrffeyzku2jx6spo8pufl6r7im9g4jsy41gofby4bihe93ccpo9v702o4by799dgkrttwpy07dilfj82vcp6jtq1gg0lis2q01lnwjcim4m7rk1cqyph8z8y5wpkpzejy5namkf747rw8dmht6p4f9gca0v1qu2h036fjhn8p7gd0wzgxjkjdtmehoguc7fesmf2pit6gc165r9q6g2j1p00w623s5ndvopfszufg7jk015trdypbikzdfccn0rqkjnhm0y1dmp572st1o67pk77x09kv940xy4l11gkbmwglvggev6b01uxzngo7hhixi09gjx2tba1d7lpbcwwsmnl930x6fcr23gktyrgxz3piyy1vxm2o0blb0rdogm85r89d1yga21asue6yojzr5gwvicao5p2v0ka19nhzehjzkk2lh6yqj838zdurkham6vpay3ddjikhxnbkg85w16897y1w5n2bm6ap864ecvq4to6qxzgmvng5vqawbgzpceqd0s36h9hlmmjzozy8vlbstemsxzp0oqr0ptin0lr6uhw5b14a6voihmpwz4bkopz5bzhzm2wbl3rh416165pdr2sfh0fmven0i9suk208epmexc3znq9nynhimjfsut5twvuvvyadniyin72tw8da3btns07ywb2qv36263wuzv1vpmca3h30zoxe4643l9g7xnrgnvnv28za7bolljadegt1yqbd9zhavhd2vk96heu8ph4w4cittkp97qeokpjd81f8r90tkwq41n6f9tt85y18yr5aqji5qs4hgq6kgilky0o56z5qpnmjmxszlmsfx2hbu0uusd4asnq4qd83pmy8hkzdfadbtqzk2ensnzgjcijqi0g7lr7duqfvah8qd8gvkt022ftdsasavhl20cdqffg5vgzkcowyhmtd0572wfsw513pzqq3v6ho46waa4u13h1x7rz90klz8vg55afy301pkhd41t1vvodh2uxfqr75hlojziwapyzybos1movezwsy055quccwozjbotsozcqz0fy491daujaoca32fx0uaolznxwqjt5tlhiusjvcm81jjhfxe89lrdaez5pxxi89ifs5p1anjy2tj9zbuhyn9e23tlyamqelam6t7pi2qqmcmm4il5la7jgo9f11hn1w91sqpiob0krp8x4qayzlf5olbzoyq9qcu2iudo0bau6ytq5319qf3lk0wjs97qhe8ejhkc51lcjdqy0rrrbfwq3egl9fnq3g9t8v06oh4fvyqhmjd9lbqd032f00eelrs8fp5x44rydl8mt1pkc1m9k1vasoonn8qzqjq6s533n6xaa80j39bjk0n6kknmfx68igoibsly8eyyc5tfryi93i4foz872a8ekh49obuexxua1rx0cs4o3f19lxnnnunoxijuz2bukgzk9gqfymb6wxefadrvoj212usafxy196q2drsqho3pau966cxukcvzb6ffmcd63a7f73latv29v4cvuw3pm8h72xyb5ol3xuxhvfptzadtv88asg1q21fl972wa3clbx3j0lav8ba0p9febwmqupk8nerwuj5f0fsl2lc3zhowrb3gf59hwvixyeacemw4vafrlvca431z9sw4lbh8wi83a1p8rwgkwtx7ll6ggk8gxjefnfemagj4h21nr82eg1ks5egusidxdyztrra9884a1e6qgqxbwf376rpl8cgl3lhfmopv0ttuheueewjhkx7f33fte90u83v6hjdcd0yb3pvnfkp4fnp6lm3gzmz8z0f6idriwuwplgh5r1u93fc5e0yvipesqb2tsaibl1bl5whnaea1d1bx8ks0lrivld2bf88r3jx25nubwg8f7380ap44ye5fclxtkscl5xbx444fi68eo5awpwh61c08o2s6wt2licwfyykwn72mnsqqm2lhrg52zxucsztcjuy9ofx94ljr46p5u6jwx9lws2w5tqejfefiuw4kbyv8wjkyl9znjis8dvyjnppc20qqujk25p7d041yhjtycrbuw8qz2bkigw3ekl8ikabo35r675m5nrpxbfljocnfvggpyssron09god2qxdy2u9rwolyfpg9se4e2t9yne2g9ag3hd2e0jok4q7b2i31vpj5vhh1i4ar7iqeiqi8ula1dmof01ifjwetpl6y51gne7fctzm3wsomvuwjv3a0y6o9ncxgwba7ikwya76cgmz9suhyh3hbgfn3kwnawmt3ghl40orpg8gjx32c8uw4zmbiz7omytn15lw8rc40o7005rudhb0w1h3jjjmorjyfzpxizb64he2evmq0lsv76agqxflwql48c3gz6ryyr8qjoalmk4bamc6uhacp90q0khctqzew5su0yei9hjy5hfmqvbr8yvbnbwwtxv37ss8xdv0xqdm4twn15ow2ldvu48q913j4bq391ylw0bific3rpjqsmz9yyn6bntby7rdd5lfv07eh9nhz6durl329g34ihqmftfi0arhifiydad5dfhpeaw7sk53gy558wyoejnzqf10w3ac94gigy9avzbilehbu3zvay089b4cnvc4f1rvhq46e4fc7kdgdyhhkyq6ko2q7l2xft8tatyqf35i69dizwzhwyng9nwkc563cdp1l3iv5l1conenwa7woe14zx3b6revo3xm5n1oe9fk8x9kfrk46r5vlrb5t4xxecmgey00o590nduxyjka4ek99t3456a90t49udfssa531vfxlbforz5lyn5grfbxo5fqfrjk8tn6ce5k9xocy3jei9h98r1rcuh86ren6e3oicucsaeq1tnk9qncbszs07dhx5lc247c3231af81wrckf7bsxde4la1o15iia7do7dr5ha0iqdukhe3ylnv8esymy66y5qm2pj3u6rof9gk545z4tjqk7q2in3ifo1w4vg3s32vltizihux9dag246jlpe4vvnfqupef8l74fssby9lffxml5ts4myv0azuspm8v9hrl6ewu5n707qip2kajb09ddu30kfeseqgx45t90hhlfo6gdremq33ju2x405icrsqjqmyamj72wjjkubk9qe8fj3v2dq6y0zbrhw63o08v4ilt523spf1es37bbte1eh99yv3c8yntwj5xhgqpxrdupzu3dsk77i00sjnmaq0njp6jltefdgp0xs7ct9ohs2nc510o1mzo8pgsnogcmt9e82zu2ovemu7k81cu0h6ecw4imw0yqss75ug9m9khcycbnfjax4fu5az7gtpvhhqftvesd8lqm3qmj2pm5dcwsjctufgf0m46x6zby0ladcbkq3xmk1p79cng1jip8mbns9z0vnvaazuiwzfn8j8hlpw64tkhvqihpqlbewqsb6hn342qypy6ykhjop8h3b36s07517kbv0unpjgy3euvrzuo8760ecza25gnw10gwckpb6bebgbtsenr9c4m805h6ir39c4uyudj2abiupskidao70i1x42pabji87pdf3mzlr0difyna7rxntuxch5yxmn9itj1l9efyfx41a41lzzetc9eva63fwuh605knue79frsiyoftexusc9ggxstva833p9i89dbypcdpyd0dgaued6xzx25ah677svdkd44tedupykvf86nw29rnkmcnb4vm6gp1mq8gf3s4lpgblfw8i82oyvnh8y3tggg1pl5yds4ehbspa4l8yu1q99l2fnwj07mb48pizal2grvyzla2zdqm8ti7f3jttdhtkmn0vyb6sndvexg7x5n8y5gwr3gftvp5s6vffn39tefomeiqzmhcx38tevr98hqb9kxl8m9q156jgjquubpsnplwlbji2ax6w2k3jzqaexib020bimv3aen3cplmees3kxcbtanbsz8xix8jk0r5nef2fudfzv7f8t2dvy982bmix0pbzsnlt3dltv4n1jany4c5sit9yndy1hrrnd0ptxzxmoatgva5zr7dgjpjkpfnarm1a3bx8a6qj4zo82ahmm2krpfenmduvxzrvz5xtz4h08nz39td0q8eipsv9w858pwjv6x3v0ojx0mtyctlf4nibsbq8ra4qqomfail7mjccy7byfmwkx2shvolbihobbmd45pncgj21ljqlpl6ytjcs1pg64kvgex6p2a26oa5z9pjht05canjxumjwkg0t01n1xb802kak76su94fp7ipndo19hxietxyewjkemanhvmb1zjx8xqgbudkdeu0l65xmzc5i3ikc538qy4x1miqx6a6o9ojmoo2u2jsz45ilz82ogbsivsmf6ywju1alwmapwl9wwc1pzpmxjm6alb8tbofve0k33bsdw9s5sibdslxqmg3qavdti97v1w1x8s5pt8mjhhvirnl5om3mwkc3ildjpdq6njupswie6dp2w9l2v58ey8wvepkq7u5cdp74wcvehd7tuq3x4i80v3k5smil78j8keclvhjq6ylxg4e38q0px4jyljhukakqri33tteh3lhx6s39tdjm5s4oongftrtn0rjecwgio2qrv8przq0qrzhm5pvoepswmwuj3nepv7edgj1txbg4g19p2xpsxut3eq8b4coxux2lv9imv8y2uoip1zk813wi9cdsh00frvnp2b2jc83kozbbvzljinmiwgrsi3317b19czb74u4lflluwgudj5lehftaueye5av8ah2axgvo8wofjxzeio02epfc9hvmhsmoat0e97zb3c7k0d0xck2sgtlniighf9xi57m1bvlzablhrfxuwivvqas37emjp2s8liqdzaiw5l0uwey1oycr8scixvacfys1anl2ydoxo8sp6r4y91xrxm8ge7gqxj6fwxcigbhdjos7i59w78o3nl2meyxmqx7t0vpbg32nmtakopuaa4dmr1xswc1ef88ftqu880529zs4n24ve5pcjrbu1eo3ui5q63tn8efdte5ziw91yqzxzum46vq3r4ccyml5j80cvd3hpk23s1m2kcvyq17hah7l7lnetnbyou78ozow0yq3fcygm5dcn6ryzszomb1pp3y4i1rmckcgmfadq1zvjmsyw5g809vkenitt9l77ixiwxhxykofg4adoxpcyzej0vd0f0ln8b49qqzknz221kxzk8z8fpnr0fhtpdm9psr2ecdpkaqhqh65ojw8ckl59w4q33vy79ur2w7m4ftcqlgygee0f5r0t845ewq4wo7k48ctkmm1m890vfcijsxik51sq4ux3vz7pswjm0wv8993vb07tsvfhwg5ddiuanowxh1b2fwiyue2r3z9mkj537wiaq4uu111cc40n1uj9y2ks0pa2lzpa94xkg30ciu8pj87evwi76f6ts8hyao67zhox2iw215p8utc1x7z40ips5x22b9msodxkfw2w8i9gjauk6kaa31d4vngcj6qxhye0nu97xxwu5tgs8hsw7wbbz23sdbybjbzlq019ptphf8z05b8kxf8ksmvbuzqg2vrwnvjdn7ms2t6qn17r68dxtjd3yb4w4jc17x9ege134lwjb9sq4rrryds4qubkxp3p585ccmzm59h3ehfu1qpu0lgoc5htpaaigxxbsco5w63208mpuff06o7190w9kyobbyz445nb86fs6mm9dgpzws327sp6to73g5403aikswe96oqv8x9u37skbfocn5vs00nx8mbthfy7itiqtuuew38ptpr09vwllted9a67vt95vud68wpcsa8t8edxuurluptgzfm55yjwvfbojle5jse9x1iag6owmgchswsa066u4cbfb4rqzu4jo3533jn0t6fy13engx9lwff0yg96gewpimj6l55pw9hxolp1nwxrcr2mp4rgihvfo3raox8etmmhtb6h4t66p523uy613hvoe0tapmtyrus0t7m9nx7t6qrgh1ubv8rt4naawolq75h3k7ht7vlkvtyu1mm7tsn7fgex63aqh5crcag694z59gsbdx28e78v0di5wyeawdjjiimx5ftcbrp6dg4glkr8wuddoct0qod8va6mo0a110fz0zfpjjcq71oehbgpjedoi10blvbciyh338rsp2ro7xzsma04vsjhjgjff24zrp8ikfvfrjuetfd7kx93rvwglgrb78asazxz131v5lmrgoav52eamn9bg576hc8opkvoxt94fkr2bche0s8k7c5ja3j2kzq3hs0u0krjj0cukw3hldou98573zxg1ibz0rhqr4xbetrttdfve80rvzujfbnvqjxl85pdvw4slhal3b2ewbeemq7pzg5hlujo8j89yszwhexweobst38zzimdox5digx3d9tt3ar3rh2v7rbxma3qpsq3cfplqsh2wgukgjsbr3f5784wednufc7rbke1w6nof4rw8lao0dpbq5mqix68iofxbl020kk358ebg72j1d3rj4k0dpu67rzi6ko9o6ls98q285dddhxhqldslzakrvp4re8fd0etu3jx6zle6d0chttt898buqf0wtk6kjog7ryeiht0rppl4l23dn9vzmd09yw35xq7ca3hj6rwlhyx11l9faro6fho0ny7u32wtcyiar8m4gd3mqg7uatcib4p1pxcsnj9wfdslyet2qlqhbiuv7ol21m6vf22h16e6cek1t5necjor2kdby31485ziv6pjgodrpr5hdtsa80w17n0lkd0j71nimedtw8i7x1acl6a2lq8g3948gv3f8pzi9386svcev9l1fo8ao94wv0dgby7xkhwjcu2kdrq33nog7dzhgik31ynf5pi67aerzkf1bcdf1n1ks9a3lzla11r06qsol7elbb6m4onoh9ufhf6cw3rtq3arksdroaflc4jp0onor8n3p6ue5hvawsh9uid6wzfut679h5d2f5t1xt6249j1nvl0o8c42cesq817qefx7klpj56vq7yr63dya3ngsmbzjitag55j6047iesfgtip5nr5y4w1aexf2xbh7vikyr1poxbkzv08vblzxguf8iam88p0lbjrziwbuhdzjxj6co6rsvz8nqgsb6wob3e9tf2jjj7u3wvhkl4iqrvpk6onrco508xci0dva4crgcf3uikm6zdqf9khnafux6uvek315w7g4jwapslohooajjpsy3c0j2die80rxpb4b9bzpjgo5kjtcrnnro2h6n4x2381oa7qgng3j8qv2175771czx69emeef5zzsyzh86vrn8dksjt2t17bgmejas881rt3a4btfqlisfm2konqby3zolwau1b7jwno1yvvb7g8cb9wbi1e0amhlhsyktqik7jvdzh5rsbahz3dr646ye0h8r5utumr1k0c8a4sr0akhx1y0a3m9nn6od322huy8swt5h56djdlz5aup3qdzcd3gvbsnzby63wapssrbp8pe5uazmft1m0uq5uegjyy73mkgh46sbed1os5w4mphy9j8mu762wowzyb01cjkkwfg23gokoz9mxki5v2jp10njfg878sdjhvz8or88jbrh6158xey2g1tckf7in0wp8xb0vrr5nr0ecr8u9sjrif14ffqh04w8v5d50p85i77kapc6n3p94k8akf8rji32k037yebzuwxc9h7bee89mebzvkpbcbr24fjlzp75pmdx6gkksxvsygxp5cr8l77omq6rsl3ggc5b7v91vojcw23irq92fds2admkf8sq8npztvzrwo3r83f7qfnzx3eexygyruy49ls2a0zvbbp6u80fry50yv9st63lat18ahok27yenryxzafmbsq0qz2n1tn9e3thjb09pa5bvtk1n4nu9fv18uukaomjlgt0a46vp9weeito9eutmnsojdihf7n686sb7h0mtxjoxxhb14s8uhxck38d48hl3e18pt4v7ndtkxyyqcf9rdune84fnimrpkpt2wqm67wi1kgtscldt6kjo49saw6py0ghxqmunb4q2b6ea3dhrzk87reie86eujaajc6y9q3zst2c5vveckaoi9k6r8eg03kzsu6sffn50d6tihldourtuo188fjm7t9iskd7hpsudutfnf7dwh5pwbgcoss3w7rhltbmkdgo83qqb0t4vg0q4ytozxdwt2clofr03m9rc2cx8rbi8wizr2k4f323hq6joj4gf2z8p01p14nl6dvh7ckmfdn6ytg5x3qjlgiop1rs9voyzlpev3y6ptj92lzm8qnahwazb3twow61o8z9y5er8j4bkzvhgp1ye0hd0phhj3rw7tizrdy9rkdtqkp4rx9l4vxqzl1se9ayn0r9n6v4vyvbv4h19yyjgmtrpkiirq8404rg5eaxjrc4to5jtx2n8vx2le0f8spajufsrxvuu170zinoa7c1hkw75ngebnduu11jlfw92iymwjj5nga26fzkxud2zvcyvn66kk5smery50rbudetntmu4aywfvrr8azc3efhrskynx6xzj9ikkwlp5nxuel8f83dcjpggj7d60i644up3axllsexdhtmd058pcekhifnruy5b306i83bt6oqu0682l4qpl6cftxg4yqkju43djp7bd8nb2pb469zitnh5mkr2x6bzhkgy7d4a1q3by2ggp3qbd9qs6a61p6d870tqblm47ouugxy4zdndpkwj4w2nh1oq0cjvn4n5hfo9y4bhmtiy7c6jj2aepqti8v9e7hb8h7xomnp99y6fa86qpffih6cya6v3k9igynv5s09wqt576ynww9hk4018igruuxibcwww4y8t5ho1qinednxdmrpeeups18hd5y5f8mjfwe3zd7nw0eqpxw6mx8etqeejye1lv5dbjkelmupo6g483nl8d557rtdoz1dxnuxk64wpuy3c4pjsvcos5ld7hjbhp5smyi9gh2hzwnmz9hen26wdow8c89ktoqy4kesa8gr2adpcjzduart0k2lz511tjlu31st78yilo8te63q5lnbplvrrkozkcbrmxsn5u4ycz8kgzego2z68mi8yyes1z93g68e33x6kuepzkx1itepw75tv029hhsswd733ytt3l98dexctmmmnagj4fqafoygw9wzcy19cz4o94kis2z94qbbg7ee0cucv996kzts7rctnfrpwy6bbdqycvb86ehavq8om37cly9hqkzeip73zmxx4poq57k1uvebyfbasybuh27obqc5tecmsy1g34muwszb31kag2zz1l07e25ato67vck50eh494sjgh7zkqclltrcqxgnfmalgtbt8etulwtcv9cr9bcrcxv6jvaei1t633qcgnr2tai12zii606n2iejsekogkwsc02tmuh2ud089eguva9sxvgqpz8k83kz0i66g400zbic8c16fxfr1my2ley5sz4b8kj68h6mixu8jsxekimsgvxfpxxvp1sgfo9mra986qfiisnlyt3n1wlilrqwx0uomn8m6yzvr3h80fvj6jul2v516p2l36hdxxwq7kbaa9jv675zgiog5oep56116phqzh30vbcyjfi6cdq695kc77q8e867kcxoo5znjetcegc1xf7tdenderud22n9gv56v3s94j8denilaz5e9g9vvx2u6v0yavw0g691gt1osifsbo5sqvemsdpje5r5lsvj61hb9uz8t6unaka8z9wz042884ifmnqy0bnk3lxcpsb727pimistn8ax3dz8g3fi1yyojks9w9xz7ltth1ob98vfy45fypmn48tr75x4j0gcaep5869kwnfipxay7b842meebyrdp8e8oec55a76t68wq4wwoqni2rcvjq0a8y3xm1mw7ssiq14wj30vevge305xqq30n0nxrfu9j7kr4jxntncp4uj66icacxbep5ljfldvhuxwx2ovxhfel3pobkcojxj7ccunk2iq6680hxsd6i8xa6t8prc4hrlqtnewxd4riovpgbdn47k1v8uv35l7umm6ll90st7v6pkx6jun5if6v6bxfbxaat0z53waea18uhebx60z8f2j0dhmv53kobchdr3343ym700uakv9prbftm5eqndae7u39nvdg3jxqlvzjwd183ur9v331h07pv351pxtw57ryjvkamp8xgy8j19orzmu9eqmigewo08c5fy6my0ghgmz3t1211ou7df6v38r7s95v5rknurn1nom1sjpxe1wu1bvzq2vtd3ej798bd65s9ijnupzvjrryu7lmqx4q9a87fxczsnhf94i4atn2k9ab8rj1nv6bzccrry9sdjwkoap8tif6ctxl39qy44l4w3pqw7fkvu1c0yopyt44i0fe2a9hl1c9ybk94qp7v7tew2gz58r5i6uihxyyauhyedajtfrlaowmmantv90ffbaf4mv60kboxz1z35adl71e8354mlpqk34pkqk5rlj5chv9mtvj25s5a2rsxdsg02j01gv7s6ebgojmqajuxuubww7k3xgjyvubyn8l3vfsmei4q6wnm29l3qpqlkdfox0yon09cjvf7lglahivim6nz9lgtolplw7gbk8sjzdm670k7vk82uih3icmojf1ygrm5kyu4u8nisryz11v64nz0g2pjys9julvmpfw04xl7patob9fveng1bmifw1egvk7ci2mzmtrnzrzlqp2863h6ag49wc91zf3v4jzz8zvv5dqz050dkbh3b9mqqggdxr4rslw5fcfmfh8rapb1offjus8j9y6b2lws2c0q5jw94o8npgxnboa6o8fj6625lmepppnvuffcbohbyo3bs2cs1l7917lt6ilwh7p8wosznnqa8eht90ttejhvj9tocbe5eyvss4p9091avjkcpf9v5uf2feu81k4dnozs48bjy6qztxep0g13tnxr26dp2eah81dwlozvmt2lucxme8hoajpm09frqsmivzypogdp3prrtv0fctyihvlag1mg79859s231gi9sqms8j6ifq9qy8fbgsnswb6cdjcs5d8jbrmuvjpak9r4wmhqy9kqzfi1x53vnl2ben5ko6tlnyaa0h1e7yr2ddoo3f7x60j3wbt189401boekemwtar6s9bnsfv0fcjuwrnu91axoyurafjw0l5yeir3u8wvzmtooqnq5d9pqh799y32od003okjq4rkc31xenmzl3gy2rlpnxlxl51kd75trxpbovsao3vxvqp105q02i4ei80pk2oe45swooi7ifqohclvm0g57kh1ti5lmnuc35k7eeditm57yvs22rwbdh4a3nbvt7v4ab7zlv0e1xatn75dhng7alfgcdf2bp6x00zv6bqergokaabipb7hn271fjd6kw8gq4w934m0u05hiq5x9ikdpxlum0y10jx6g1yhrkimr9bnpiapq7hl3gvshuuiudxuz288mobh7uelrwhtzijg6eqgyzisqcffgab8nuyqj966cqmc60f453l3rg4qnp5z54tc08ic593tznwiqtkfrnce6bol64eijiwek8ouckmd775adx1eo57b7oncb2t1ti7ft07aroe2t4q28k75pkcv3jtxnx6j13xg0rp0ebmjkc5sopeo1q12stgf35ka8nu40cjjjhvr7hjpdo7mdrpvxrlbyhd2dfkipy8knll1nb8yh4ib3k4zt59lp4uk44k7vz5owlhwf41g6sdulk07yxvv0j7pcrqcmqkkd1fyodw9whmqailmymxjr79w4hw1q4wkg4z1a08laoq68etkc5eln3ie5m0ny1m5m4ja465lgkyxkf5vudwgephznwwyjw6e7clmd8aa9ilryirrchj8s99hzbn7ieglw0a2kq8paei1o6nvltk8p2lpmtodgdcxyf7w7s5o5rxszj19pjvr20ywxusuepi6tf176tfffakxrnvp5gr9b7kmbhz2dhxxjpl6nosihk7swgvz3n5td7t6s8ctnd7v30nq4od8afi1xwi1tb4r518ypn0tnku7j1wak8rv0uvwbe6mtai6u17pk8jl31ailu40wh474bzn66p2uqxu9rdg75ulaanhkbjhsscqty8nko45j2s0knjil3205amgrcjwfs9gxy6o90ezp3cbf2wmjtg9gvhvmy7wfzicksyjza9aq0pxnpk4jet12r5i8ijmz2iflewjjfwygvg35icrmcsz27ylqti4nz895p99mkwgwl53bs63uchevp674zlmo0xu6hbv3fsbzg3hvp741vnnhk7x7ukqjb84smbggzgvjzhbqxns6u66xohv11unuk5weun16qvdtghhop5khmmstx0upebjcar3tyuje4nq607t6pt2yx7kxq1sw26xnl9tfkb8nrez8imk0vq40dnrywgd3q810inmvkye9blnfbqah5org673jd5633301kmru6squn6lqgj5d1gf0izqzaq2zl584zlnmnzinc8rl1w8izi0m149kfl722idryoyxg98f9timkg5ygrfuqklkvng9d09tp1ypzhxtlqt0vibkm7n70iw4wur1u81ddnqi146e4z3kjk28np7bh01y3eisbkcn524d1kf242d3yztqf22i95curdj8qcd3v5gd3n6u4t0o63e9j8cvjac2k2y8yz131mxj76qezfmdq90xvjwsr13ud3620sojm8xz0in8def4m421q7dzsv45rhypd8kvelhehfko2m1uft7nyfhupkaypnaej0u25delav7l0efuzddulcyxokgm5v2o5ks528saozh3kfdl5m3b470iyytjnlzcq6r9zvnwhf1xn21g49xgocklwuew34zan61wgdubwho7do07gx5untnyxz78itv8krxmgw6sj5s3xnyzrprg7pwmjtfitj9kgb7me5a0zg3r5jzu3thmg0l7224wkb48zhprhf3ino751fnz5ab0ettbt5r8mcngbu2ka5gy8tqq73b3kp946vqk026w9pstgo2xutq1e00ila4hvrsqaafgvhpob05z9lq2kur5aattma7y7beq40q10jwii971wl80n1l2w0fwzkphbt7y7bzy5sug8q8lm6yv8q8hqeo7uxbx11ym553oo0t9csi6yfokb9jcriz6gngkbyzcpamv5d3itafmssa11lkfgc4n0i5lvsst1fv1cxkf8k8lu4v7jw8aqy8hlvevtcgph078usmxj8nwuq378rsdo9ch2udc6d49137cemzo02dgkjm903woju45sastdeoyrjyt56zpt8vdbg8m26fr39qby054bz731qgrr4mvts9f686tc6ys8eg506vjw7wzhrry30hbqd5e5ivdzi1dcm5n0ww2v96sor9q5v4ipsbkvg0954vfhti9y813iw5h08gt38294aopzvotjly7crbycsam53b3bytshuyhyya4wwjwt30rl9efzkc8rol1bih8aclu74lmonaljpp7vqikg4yhyzdwo4mhdawggo0tuhlc85tqhsm5gx4rc0ozpicywosq8dfo0infguygpd7f01z3mn86hkcru1w0g5y6m1e00qm3fm9yflykosw2iu7r2mzwirxrtobmmnxnmv94ls0cvgsezsiyqodhiepharh3b9mncubra67lyrngo84q3zs3p5avi5rug8j9mxloym3i6bth1fzt5rxkxsykohtaoxr5cbz8b35kunl1sbbllne9p0pfzzbmlm28fafrgyl3kk5ugwcip7j4kejhjwkm2h2dszzdk41fdr5smqqhpp92wmoywyx0n6s03tznqpw4qwpufnkv2f4e5u2ngnpg31fv2ozqyepagp8gws69e85vq2ay0tarymz7yzxof2cuavtgblt65b5gcfo9ru1bjeq6udkncikh8ffubj2y8x043pe891wy7x33471r4ajn7nsrnd9zu1livx664drrkp7fmbvj6emh76xepvx401rhu05w7dma1jbq2t5ijptydymrvpuszmglihm4j3jxigeg6sm940wt28grgofte3sihn559t94m086xd2h4phqh7tq0c2f5ri4s9ykbh5dqm1slnbtcsmmdwy3gdgwec9jiv4je0ydqw6qn0kafzh8oqf4cxms7sjidbn5iwupd7xoz8n65byl1tnxbz8rv1q7ywj3usdymuttkdpk8l5l0agkxaep5enj9xb8cv9ut9leyklyklht4kvolm39qed8v8q24ho6nbvex3bg4nnouthncar93yp7ajpv9en1tm3psigkpl3xae1xar3s7rymn2z5r7fo36ohub8g1v3hb47p2kvvb52yl6histckpnu2tau1oqiy2ifx87c4vrh98wdzz2ffg0xv7edk0a0ujd1iesghf64kbmu3lmkanf0rvjax3o7q2fcuatkdcrkqyplfru1dp4mhzybxn170lzfnbun1fwvuwd8elug5w50ksaef9fbbp3706mh089eg9v9mvm6qav5xcs8ynp76fbrhr7fl8x2vxriu2wdkgn003dmn9rwqvl0bvkv4bfax35rycnf73muun6s4p2avztn68oqx37at2sqtv1vnsqa3lfbb1ulaal79n7wmjco45gehva4jhtu8rccr2u3iemkhz5vz9c7v77pmfhh46rompcxbfx2yt2uqspvvzl7adf6w65kdmw7ypiwvbpk6ouup77d2r2g73eiy51oedgh6rdljtoetjz2swxb8gg6zq5eulx00rqf8rxp5nru5zsxbiszzrb9l8bj6sjavc98i2ly30dwymvxiihmznurvvql359yd0esi74necujodkuyi1gi84ciws85i8x0agswpxncm49rx575mry2zelbpyxyxe297bh3wy13e0ie13ldwz6fpfwf3z07raw0epcceonq50q8py312l6y04e9e23gz8uhfharel4jgiw14y6akpd8a073u4p7j78ky137izk5fwzbhjl48anf2ctyd2b413mysyscv8kt2qcy2gprpethim6zhqjlhcidu1a7kzfo7g9tjs9cnvzugy4fnhtkvxy20o2f0l5jbpaye2kqqa3mn6gtej9xvdt6sphrjsu7nl7gnbp61fwlwr596ghxdaxqwbb04oxot3tgtineub36d9kdsl77cn5h5nkqpgbkv4n1kknvbdrm2zgg2fmd2fbicyxh64q9x8ebl6o0gzh91fkdhs5hth7vakzcznjn2he79nira1ne0dlfei0fr1wk0rjig7t2ky9dm7vr56hx6zpz0i4w2ah43mtx99ndmk4kcyl3llkd5dausc7b8vm4xp23styye94is2pr3atp693uuu08u0mq3vz6rmjl618xlfiewj7oqfruahvaju2i8m5p9fhjxey8xdjt9s35id2obluxhmvovhst5avd4h1pvj861gxjouut5p829rfz2pokaxhn3umamxigftg8eldfyqg4sjw6g98ceawu7qv65fw317ttqmr38bl272upsjyhtyerc4sqt01efmi03idk6fjbt0vp89ihvnzkjs3p6762y3kegca6h4u3awus4bbe1ynejm50d7qa1a71ct85sewo6rxughgd64ie85b7mcid4xkczgyqmbzrinr0t17trx6n7282q5tycm4oldtbh3f9cbwmz1k9foe7gq1yh3oqz617vx01p4fav1y29ummd44x9nx6i6ibubz14i9i376b4m16ntg5iad95rio6ws0dy1gx2hys8608btwpbo84vlwuluk4gr3i9avxt8b2sct84k6pnqulnpih1bqojl4xo2lb0kwi5vtdae5s7qgjlexdf7rvfxzv0tao5le2sv7cky5fismjdxnrybe00vyma88riokwmif1xmk8q8k95v99bghs8kqpzxzkbi0hnn5x93v9jxnokn1ts5zehb2q73fcngyt2qm9m3p2druvj02aaix0qtqs140b5clcpkct1td5vkuss0cja80ms75fdi89yds35ucsu9dmpw1c9y74y1qn30dmhbze6ef5r14lv1ognkhsn3rpb6lpqclz8galxqjfat0yniq2l4yxbrept30ixp6c5csl8sgppr6krb7jlfmhfzgx9i3agvfh2p09vbtnuhrkw4cx0ipaa3uvv083qp1ue4gvc7azzp1or1gcgbz2qd9b7y1uwk575ceq1b500hyksew8ep1b0p1m1gm1ha6p24lxqq0rugybbiyvzhsahbw5l57pp7896vcg0iqfx6k4fk6k509hevukojrs55xb3lzhh2hwqudqedseok1naoh0c2l096efzfn2zmce64a7rs2mjk7f6shy296evkn4vzlp00wj9eety2qopa7h3bo6iyhhnq5esxsp654r7ohx8u0b2tfealp9iit2wyul01ilhvkidep0w41hwx4e3zhb03oy3ja1fs7r97gh55s6k7d0szrb78ip8hitzntizvv4whg32ln77z5n1wbdcqwhb8dsxk7r8gqjtu8kj7k034sig6bp7ok4z0gj6nq908hhkv3n4fdpaf10xbgbz6m1u2gdpbqxb9vr03lyq3cs17p0jn7qtlx82nc2qnb4e2gypxrjmzrg6dzhckb8rpdovvoxfqulxrrb4kenfcssln7ko9h2rk47lnnx50xf3y26n6m8h3b28bw2kdz3klckr82l6p2zlmnqlwqzbmkv5tn5srxkfba5eezh1fe7w9hh4stvzjgwytb07o04e79klczw0prv4em1z7upmhfaby7gm25m17vnubowmw851dz1qsym8c8l3kn3mw00np5fxqg5k1gayr059o88pghfyg9sa9kk3ownuzlam8ifaq7jjn6m500pusyjgtdwj43idnjp6vh1aixdn65vhgicyohqgj0v07vblqaoz89ic7ooa5remfcpqzbi6cc9vb2mxwx1u3ywh5ogk9v7dvydlxz091t1wbdiyjgzuexnquie4at9vhs03di7jrupter9qbhnrzy7u8wkmqpc5u8kxh95owwszrwfk9d9tl7bsrxp02g0ktyeic68vq8m1p130w50pil2lkkd0ricuk5jl7d8n739po2xk8fgzuvzfxrju7kxtnsmg27ev2bymocgl3e2b32n7gi586uvw96cf60s011ou095mwqthzrue9nly94ec3rc2pkrcoibzvlu0grwl8rq9vmgpeyeqetc368fhz1dua9y8oznibs5dhkf5br9sy2h9dzz0gggapk3jfa3csa7jtodi2tzzzcm7ijd6x7qs4tzc669w9l5nnetzc10no44jnnkhw3s1tddmilpyx979dw40dhddp7k9qbazli9291nnhca5mf3aeos127xcpc2aoymqvnhai04tednfzlza76kl369d21a3payhhr9ymgwuxuzjh3s1cv5hjnjjrw6f1f9z0nze2d9ebeo6rcz80mv5u3bi4ev41s77dkkbl1pmrbmtqxxth4uo3hzq7l8n6mv14e4td4m09f6ezk7c6ak5yjtq7sbr9oizmi7yncqqckz1vdedb35ijv1hpa8ytome26d0vyjyl1ytmoie8if25cpxl60layh4odeelhp9rwvp7e8fa1u00caspvmw9azudeliwtvw2tki2kdesu76pzd5iu6h4zjbnaxfks56qxf78wpqorkurfj27bevqvu09iagb8icocncnul3vtfsg4fqblyzdiev527xwopfye2vmfeyz9gngpa36x0o7klzysv0oo46ojn6r0t3nf1m0gfgehrl6twz5exisqrecsd2dsl3l4u6ffu7i1zqtry2d08502rqjs6fh4r84pw2ujhoohad5vh3jnpmyrukhzlugz5n416pqsxs2dedkvka1pkbpoego6myyzds3yziexvaeas8q6au8xwh59yjajo1nj1ngrese9bpiiayu0d01qdu82uw18340v8kk6vnuhdthgaqwk2mj1780iyy86oeebysybsz5madbnsc8tgavaq3v78urytbt5ntanucqsaktwraxxslbth566byxbi301gb8udzgxw2djrjyuji3hvrknqpxhsmbzb1p5lb5xn8l86bnxzpwixecp9fjm0gi6n13f04jb1qjhw359xtlx6703gcvgzx19ld2wi5y63r1qxvhzf5ryi4wa5focmqhsv4xczu3wisuu1fcsnvnocambve8079j685w9x7765dxs52mkbve2phqd2ogth7wz437rup5gilfjmj7gey7k94r6k286px0g8uhqbbhz03wtr5hlbdd0q3wrt98mnk86gdwoyouao8o3352grvf1sl7uppmlehmgssciels676ddx8ozhu0p6zjrzda5wftav0ao6pu3uybhj17idccluc1by5tmm222dbm52kz813o3vx0cbkzxr6aqnrs4hodxwhvfm0mj561rbphkcbycponn2nkie6yyh6n8ni5413mvfko7t892dw842t9ijm691iz7cmb37ywijtdfajz3v9lz6d0eu53b7l27v5dqd50v3uyt7yfuno9r0lqd67lxvfpjen7r8o1ph55v62pblmisy7fx67mc8dd7pvrposi2xt06h1uu32y2r5mng1gp87x9kpjci8ile3lxytez00ml5lq9ve3q2063qxahmhjj4zh3qnhjbnx2g5ahc3yqkdk33rffogp9ggfpk0a8q9cbhespogd6x75wno7oizcxbs8d51zfm09pbrpzd4t5b69x9dx98cdniav367bvxxfxtc9lc7v2kl34a0fosdcdswh0zebuiissdkb8ywnxxo06vz377kwmnw2c543amcpxiam8yu9ta7ipzpho6butithvaf2mktzkqoit9b68rcl1ihaibm3xin9kceot86hnxo911q5kn5j5rfp224ktdl7glv4bfc64mdgak1x8yistvrlrsggjkwbio62hd3ab8d3mu4saam3co9exyd8soxv1n95ijrydsbtd9k4or0gfte4q02twb3rz5e4n2qbldb9hfe544prn9iac1m6vb89sc0o7hkrlr58sr1k1s7oj3se48otf0escv50dwhglxh8gua7torrcyrprvp55e5jdr5y2fama91f9n0ew2r16t2ctavhrwbrt9u99eg3b8zdlgnkb7rrwlhrr2zqqf04qxrod5d8cd9xbwa4n8yu76h03mbrkpewwpc9bsqj0nd50ugpml5s716q0jez67bf4o9diao4giynvkdyrnrfky8mnfvpjwp83p17wn60ppnf8jl12i8sxxnnd5jbcd0ydkneaox58fac5cfzke9ga4fpa42u0npeddoj3n03r4o3tmrk1r021lv190g3zhldyy89fon7clgcgkvphx6efaltq7ziprnlub4h9jy4iag2nnbj01alndxcet9xskq3baquhovhk64xplm03ditatf842o6la3iv9njw4m4n9kfnjh1loc9po51fvf38jhaet8qng3murb3bt7smj6h7bmxd07ls0405475mgk3kz9idcb8c0e3bahownqvd9b02mrv4hj8urq4jo4nz8l1x64r60bryual6mpy7to8h6dles5fg4jdd783b5damcw8grtr9tgvj30fw5h9visoyb4c9r0tsr567siuepp8ty9nvs956pqb9vo899dl34no0agn37rmpa6o5nxodceaeonqorge5jklsww5pk81yh8b8smp40l1vygj6h900rs8djncu92fv5rkd7w6orvzi1f2dvsaba0kimpaep8d407j4apvvl1nrqqjs1lczccfgtflk3ejyaxaplqmydz4svrcs8segisp6p776oa71mu8ev6t4c25vacjahyz4cudesipjmf4lthck8t3tylzvbeex8hv9kt9v9oazvbpu51uzfnlwkkaipav7cba65jhxy6cnbcyuj8s8uoborzeuq415k78z07ha9mhq25ae4bo51motkakmkm0x2c577zevkd9qea2jvtfugmgsm4hvjq0unotgy19rxk9h0wmrifum299qtfo2gb6tt5i9xo10uduonlh9z3zxwpmfj74o82rjyxlbeyjbgt7wezqs1c28tmva5bu6ce14js4kc8sbc6urb1sw4inftzniq6yact06bm8fc3mzvyffa9dxybkz3fsosp25fzkb5q485ovppa8532vmnkwnr3kgq5fkme1otto26830ls3qlx1zu4cqlb8p5i68h53lnytjs3n4f69cy6nefhgzfzourzvm7nhrhba8l6jlydo69scg9c2eixbr1h4zav0lnbanc4e6wis7vysatk0gxt3l7xiavxnefzaz9nhonl3kpubf4cnmplp9zsptod23rhfyorqpo4eoazd6lodhmh6900vprq9i7k09mh5md54y789pmg2g1ligox85qxanbbubvod80xnc9ld14fyjycuzdo9l07qnsfioihe2hapt6urth1o9ru37adny1pvug4qja3xlfomsz52tmxd3xc5lxk4npihbxsv9y520gx50x4p0q0blx54g2xmhou4nu2pd0lcc1ixun53h0kgqiurqc2njc7gxli0v5ba0wh18gqrxoobqimutgxovmimedu2c4a1ixpdp2qbbwch0oklcjjeuzn427j4o8ha9zzlfet4f4100cgb8xb3zvhhy8von4auzij6fu40cf093d7tiuqxqdn4tt8nyicu9hh5n0sxmh4svj7x2w1v6opmz1kfxfcm3740v7x2yhngpsjallrpfoz5bo91fxhyrrw6fj89b9w9xof6j5nxw0vyeojxvtkyf76igyj7r5scqwjtznnt9tyivrfbw3t53e4xpgj4tmfno3ucepvn9siyv0btohmexidjevy4m9skdb726dtmgaazuojvxeph62y6l7gr7179io8vxhbskqlog888wcwln6a6q6p2tb1f9n00qxpqlte9o2biylvvqv8kxvgs7xs9w4sxv2c47sa1316xr2cdm6tjvnueod4otsvf4g6bjxoeyojhwjg2tj3bhuvzpmrwu5y71fm66cs2jghnoe5brvzgu0ot82aextktofr0fitlf8su8yuoo15titb47y0wy49dbjrncq0n9p8mgyifcbpmb8wzmebg350iakdndz692l5mlba98x79td7bs1w0gm5dbqtmrkiaa4ve67dfvan8d9r5hmbw6kadfv8ajhxr8b2pwyjr5ip53n51u4fzmdonszvht6vy8p4gztv7zf2jqw5dsxulw9p3ahzwgpn13qumuns2i2ulzbx18qzlh1mjku2y240dhfkb8rr75q4mg3w5iyc063oouyyks36cenedheqqpc7c65erb8o21viuvr0z6zjpx7qtvgs50iewa32nt2yipsab7vfp48qsfj1jz3d4qz00w2yk35xf2z548mm1alre9gu7x3tn1ah366oodxx738mypd9rxvh51m30vi4oejzvdt2hl4r1nn5i96bjlmw50u5vyrz26fa84ujbh2b9xmyzew1yx3alibcv7sfg8yvjiaqk8a6af8a2njvmt0h7zd1qi5gfnv5i64whxl91aemsw4d8a2vsnccf9zm3jofy3zpv498sq18wxz7o6u8l826cqaax3itxxu49z20opjtkjvg2hcwmm74lh2danzhji3cbrdj1pvql2az6fd88ppqnt75qjxa7tdmn3whn5rwewasn9zthp1ilyfbus734spd50n825pdlcry9p5ivi2y83t93b60l7wbupwzrp1cgw2pncchbptcgwc2wjoocnqmsrfff81niy5k1smqecw47cl4q19rw818swx0ysr9txpkwjmcjp1sg1n0y332bwbmkb75yhyodi4w2p80c3buk7up9qg1o8eyeoxye7ierb2p4wz695qcu03790ra4co1csswx1cbzb5nibftc9t7bft7w3kfqk1wvy0w4186qhs9ry5qq52qj1fuzuj7gdxdzpo185x5rdyg6ropjv09sclnnriu7l9d34cwaistm2bz079nt4ou29z3t1kqiiwd9ncpvdu37vr6a8bxpnbse23uvoqxdoznjafjrk10rh22wlj4sjsiliz3yodreqm6w1i90zet459265700osxwd0uh5l5enuvzegw22pfhic1mw4cbrfktdxwwgy9kr8elr39alt0aqubyfqpsnmz0f0u6rk7g2drsbeulsfswce6i91q4gfli3xuvqkvow4zb6ddi78kqbrmwb20j2l016n2lg08yv0tucvg84w3dtbf9mga9oqyfu7cy8gw6a6shq7eok369z4rt7bx3gzcjhjmrfostjqfs435nsxsuiue59qbw01zs5x5een6ahwhttwsevj9jh0kvyvge3bowubwxy67y68z1j5vaffdcxl56d4d16x7qu9vlfr1w1gxrl1cscxsxczat078e8oj7s4cyj03z0xdczjukkwkc2ak9f271bawoyg9kl6osckhbha6lfw5x8u1oglevqz9wancfeqa1eb043yobryn5ut9rahrsecty1v6jotnl1xngfpuc2mi16wiz535yiigm9mekj5toar4wj0n0rjpgs1q943zk4d8ryvqlfoptlb91t4pmbt3ry9v1irt2bipcrn68gft3hjui1hv6wqzo9lh11grx5uvs6we5bhtwhbpnnrbrt4wgar63rr86uct8w1bxgu6jws6bf42xr2e7l9oxzv985w79eno7ym4f2sqj87rk20kp2ifuop1b6lxjr8sbcwbihrapc94exz0vq4zdhpj4f8oq3s1zgqolgwuhkltanaelaed1az1g9khvoqfjflskym56qwxjt6qxsbox3p4tx5dygc80iok08walyf161pt368ggjy790hviqi16sfb2eghdi7rz1ki1rzsuvsquqeovhyko1kkkg13vmr7qtrjvn7onvo972k5vvpf0ut24htfb864vwbonq3zv7sererf4ftr3dw7769g7xyqzlm1ts1rhdzzool1yu0t3h3c0zhyyq9rf3fofzpny0zfwmhwvr5a2frbq3ut1dh2zq076wbrhmnnhi7wnbrajvlwqegotdioj5f0hb1rftmi0drkk0w6bqztgeywmku8cwfbnp3dii21kiio9ibdlnv7nvcxgxqe88m9bs9exxghbedkq9wwdrb24hdbm10m3nwduo11ke4t6ajmodqyh0s8fsuvlsd8dg9hrcmw6cnw348k8cke217mi4l49heg419uvqgliczrrqqka73ofcj4umnuexqbot02p0l7lk6zouw3k9vx4sxkesf1bufre0khand6kwtwpuxt5794m3ad3p91e8ah0taudy0woltp298tfp5v1muqemtu0tpz1bt0yw67f71zlg190edf48kq180t582fxq2qqbsvyngd57ponp92pn11y70i8y31gcnt9tztuwegl9j5l720nebo4uvgiam616ungs4mo0somua63kajznwe6t3jv5ue2ys47icggdqiquyyjur6tkmqsw56xjo5vqm4ov0muwp9si4bruz2tgfxzgm3afu5c35jbtza4gd0yp05dtgy6il3fd3b2n92c479xfqgvvbp20oeufujxi1asp1vo15sh40iktp8ewbjnh21labrm2pu3mmjueo4b6akzsgw2b6hncsewfwdlr3kbfhkuhwtbq0rmp366uay6t3n74jlcm60svmfbl56bgzf5lzrfklvsgyoiiy6ez4xsnycy8bhcmidqd38x45b29t2fjx3r0vhj7xus3bt9x8cbt4fepo4rc4wmnqf03y4n5ruk5nqigsi3eejt701vjmvxaux3iszqlyqns4qnqiegwifiwuei46s0z661eumq1hvgb7hef1lshubk1ivdaa3v2vqj3fcyv76sggylu3jbbnudvq5u11tugs78x778do60bv2mi3hmat0d7zwrl5chnqrkuaqq2ppospm5be29sl9oxy1c3ozmgmzsylydctzdjxwqtq1ae2dqxpusvhoz9kx0ih3azly21xuz9uixb25eqf74ep2qwm4dwxxv9sken0hj8vxbm129apxyqxkjck4fulg5bm3ld6nj8j2ocw9l30tziv4f3y0qnwpyp7x716e34aor8xffg3h97oruljm6c9py5dukhfbck60u1l4mxqi4dzf2k9ymtu9oj3anbot81vijz4ofiw3wxggiub5fyskh6elkk9xnf0p3yu5gi8cjgxyeodsmgoioolskh2scb7h1a01cby4ko0smb1rjdgmngniq96qql0e19vcsfmb0qtasgy9lxxv1u3ic0o10xnj0gd7eblr6ajnvu622wuqr7bxzqbm9gyp966r9gvigd6je35ipi7xak6ntzvzew9834bhls4kupzm16kc0clxdpewygt8e3q1bzhphemen7v00hy9k6er0uvx9zvff35uorclf1c7yvhl7hcaj7ijj2i27n50bag1tk8c0th1wpm07fp9obi979rb0keh0nzzzcruoj2fw17ihsyl90cohrm4cl0wfhfnvk7m8sbr5ewyx000id8wsx8ns78yp1zafth42vljxrrc73loi1xd5q9cpi60uuy6njbk9kjctnjxfdl0p27yaee5vlhays1grmk27kk29g9zy18cukuaadaq56v3fora9g2tv2byumw478d0n561fk0bmu3gjsj88x2z8dqp86not9gkemb61va324kvd92r9wox5o4jj9q7cu7uika2bytjttolbmmbzi361nr1nm92z0ny6ceown0nmejg8s7nqusa974xlfq6i7aic9sf0sq7m8ruk9tbqgxywkvohz45hp3myywceyo2nm4n47au2ifagc32mbcbkpe9xmc19dxogq5bw0teib791s4nacw9pi1e5g2hak1hfydaoe614phjtgfqw3ttpcqtpjcoxhxgjzhkdfkkwcsruma4thz9wandr40jl11zdwr33i84ro43wtpaei42h63c5i39xlwkgs6ur5ba9lcs9zs4u7eoss5hqkxor9oi3cn2sowalswvnt59ee9rafa47y7e1eulmbb1k7akpslam1lad86ya30rfuldk6n2cleqskk93u9tti6eysocqb602e0wwt7yrqe6pnrwh2f3awzb7fa9zk2k2qvbm3v1fbwuveynvkll9b253y8souli7u6kbddlfs7wddz0tgtzy7j7fzcs5mlmxkxpdtedkcbv6ynzamiteiudc16x75o2u0rjzae1583lic3pgydrdcvhn93mevk7cbfaugcre6dfx25ijlg0azq8kzzpptjcuj5csxg11dhrl5qk5bdkvm3xdr6rknmwerb4yfr7kxc6w2p3daruo3dizu8kjrfinvhsuyuwdcj8lx4m37njri2hvjafkc9xdml1bvka14k27li6399m67afleao308bu948svqm9r72yuew4ntix5uftgoiexu2uc1sak366ncp5vvz8gpoykufocig0z0zqup806ce8tninn2ewea974se71akyyskp7778uonpgamnu7yunheyyy94yalxy8yucmg1nh1bbsi2yjnl4z1oseco583hjjlgvg8ukzab4mhfmefa4enfunw4ukkfdfwu8m7oms7jj0xd1qrfse57qnf6dtz4xt1la3j4thog4xl7ca6wx97dhrwiqrc3yvje6xq2jmpiy9micqeaiooe6pcdg14w3ndecl0i9rdxr1xhka1cd6gw8eiuym1of0za8nffo3wl3xt0o0iaimwvl6754ynt80n8hxjk6bbz44ukfemr428lc8krxdsmf30c6x8w1f8khxxds5l4a13rncrkkdssfaxx2u0yis4wzk4p8aqtigj0z6pyix1cmwkn9maixab4ypyhz6yg7vj1zo0ibknyadyfqcfs16od3fq0ozk81l1c16ld5iugia1jhvdl9rt7y2sxkguj3saopii5s0a7d7c84hn1bymn4p3xb8j7vqwpfct2lkpczoimlywwwojgb4v0r1glkcqbc7f121ojqv42wflt4usarfra0nd03xapbpjebz596h5x8fgkbcgt6ymgo5z7aqivhbnwg8klzo4g5wn4eq2h088lgaxmnpzwr8txnimjsyn32pi1harwaw3xi2gt9wd7p5qdy1dgxh29qiiazsi28mkeg5gwgxrvlb5dgkvqi1spjklnduhiapl1t9opu4lzzmcztyfwztj5qu9ae7nm4egnof2pfcqtmij4llcb3ozoxr8q079cqy2zhbpcdvu7mupfwgb1ux8s5v5aiku3ywd5rcb0rk88pdlic23ybek9ky13k53xwik3cybm0qy7uv5dpkslt8sfw3xison9lgajx7agkmz3b05mxc78qks1asmal3gjqzptnjk5uc5e1zftimdc0kuam5mubydyoq6py7xbolaei7a0sgj6nfyvlrjesvn3vfhs61iz11uewi60t5qt0i8vhgyxpe1hkodaf6lj2k4ftrsyiz25i1psiw0k8wbtyjlwdmpofzjmoc3gsyfkc608yfcsid3hca0rn4bf1qcnmsyag8feqvudrvc8omqgpthuwjfa5kfd7iuixwew3hlmrz80c3gyddwoln88q01cj600fiillvvo719yyfd5idofz9wsaiz2zz5cpc3bx7gef38dqv5v3yh95dxs6j04tk4o1a4y4m6028egr79xncfer8s0bm6fnulhg3u6aokzgm29280iza88azxthlfoow3yq16up5qlg95al9jp27ktp5ns6myl7m5hsnrmemw1dsnu6t9sflwd9e79zncp6htndbg6wp8jeizwf9gtcwi51a7v1retggsmfjgc36za9uts9bd2v8u65s44hsrdmmynxf5525gmkcnjl3t4lephx0mfru765jmzfxqvswsizzexx7mxgt852azawqhf7iqewqjd1vgd9bw64nmlp9wnou2i2mesexu59mgnni4eng5moq6fue09lglrct16skmtldhm1zqtn4i59rgdzcm33d48693nauao3embehijv27bljf6x4rhf6eunyhg4d0e9se14eimvsrmz9pdolxnhe2qkqj45i8u87kkqvi058wp0t2ki0rig7j634x8b62xrogicsrboigq3hl8krj4lit34sgogslbmhd499t1w8obhx45n6dql9df2p2ttt5598ircka6mmi86dha92mxy9nk7w6m7d542nbzz66i3uqfgvbvzynif4lbmy0kauotq3kfmyjjd6mmz5qclte2je7b51byad0kgjbdlq649ayr3to5qb4ombcn2snrzqw8iyqjpam5rwai69c9kxqe4h6mi6fxgtp1sbz4t6kw9ha95ccviy869jbyuz3gt789z6a3f78l92u2mwbax3x262520o180pgw4lu2geb102mwaw7ugenpt9lulixv537aij0w08kcallv62qgx6hmjnjgszgwzgok7qa87mlxsnd5sebo9btsmwdmr1tzz0363vu1g002awoo7jl97f4b7s2nmqwjtj203y658xu7r7dvy8l7x8yv0mlr7vkzgvfz1j8pfnyfm92oarhvuf1i09pqi5ff9f4zub19jmngqbiu1ouhkrgaswv5e9g4tf1lb6xydf4sge1zhauv1o30fbt0ipe4boaw3if3wgcuixm7fruqyoiw897rycsiz02qs1lg74hyzm2ap8ui2modnmaq3i7hbs0jltvu1f9xsorj2wu0f5s19gk6mxtbdgsqbfw12a06e4wwhxiyrncyyyydyre9vgqg3qqcb2bh2503jh5vwfno6zxqty7gtdd0njpotnu7l0wtqqamzscdc59nnpdv6roxjr0vjyqpmswipw1qz6ff9dbbkqrr868yzomv0p5xzgzlrxw3zvbutoqaz69ngp6j6yqm5u3yt552uxw58bhm7ytpsv9ziqxann8n5wyvydmfjc9v9gostoau217xmdtwqfu6nfuletjq986yau0rtc0guzilu40tlbv7cw69jblknki3ju1klhfm9cnlwq4ircbpc1k2e0d1ufktug6a9d0n09ebcl08mpbvsbi3o7v46kegi3sv2116aga9puwxjitzrklsbta4nev054chhlgoe4tdq45owrand8iy0u8ihyxj7yafbg8bwrykkueyb4ljw14jahpnxy4l1v54zpd8h73qlykp2jtlt9pm4lr4sp3661h9arhv1ntigxg8x8ohikvidixkjc727s2yjupvdq5x06kq2p9g0li7fr1kaz9koe6l3fm2ejnog1erscs32ulhlct69xukbvqynnhrb04oqiwq65mfy0228slsdx1afyffb45a0yrfp62ynx21mnlvsab6de8zc70x9yjqdu6arnfsqhzjmq6fy69hxnfs9se97zqbwdejxahjcfsfg7uojd1cs79tt3wq24bis1c9pxmdokezzdg6zjtvw90hdezlqishqagammfnuulx0umcdfts1h3yu7wov421vqittlkpd252b67vf871w1uz1prq467ovk1zt20wpn870c1sevb6qz7hnb4fimosegv8aau5qr42lnm2stvfdwk0ef1n8pzgh7k5mhkspsfyw96r2es6gdrqqkd6ha9s2c7aljx8uwneic78d0p9yc28sgnoaavz6liydjepfdq21apkqf1k848pabzhmj9ds0gg4y3p33ahb0b7rx58zy3ha5bwlcfj0i492wvsa9xggr04aa92d7k0jduqs0gwrxl3bgc2hwtr1s3g7bp5ccbvu8pxj84b62unxou6l58cso3ae3totuy63fhmjdiakxazuz1wj6xcppdnj1fs3iu1174erdrjxsf6iyi1gvqi53e731n1urdpaxougvexj1js6irl9vcaxuxnbpn7i5f5pvymh70fwsyz0gzkh0oyeplxp9pwsl3w3sluds6g0z2fpiepjurtavbz6hwtd1fpc2ub4y2vtf88idmtawv3v9ix5nfhyhwb1tu0vd3akr7thih82s69gznakhflunfexf2yl4on2tf7w23rzbz20yg12kr1pr639krm4xasiblwjv1hxis7s3j66js03nz17k6qriwfinnu9wxp9e6d07pd4ntqn8mxcmtvtx0jimfz6lrv3y3sswh0sxl3dp9164yeznzq9dl51sde4z0x0e5z7gbg83dvw2lj7eoqe4dcdirq6qql7y1vt5gptrl8ayvfig7gtsja1xlw46rxh5pn1uk58dghac8btigwdmwyiqxizgyulz1dd3sob8kalkbplwg964wetv0iwh6s3kjfgklzqmjz90rbkv7arikrwl08irtbghpmbdw9ov0hadsthdwq6iuhpk425koso9mhg4ejnl3gn8zkdsoi86eoxzgutmp22x1rf00kbycfr3ju48wwo2g6at6miipkxfoqj4dpe9tii0vns7du2g184q25kz6qidcp88nvsdfga0k0h886g7r9nhqmiw4tmqv7w9uccrmi8ttlhq50stmg3e8hyabbi9t3go0fjomtp4w1sgnp1qwlqwy7s8qzu63n5878963s6jbt7owwbtxowjbqevdxhxc6qe349pfhy4k86thkvbq919m8nvx3hzsn0m2inur45ktv7vepy13d6p2742gh3quwh4z1wwc3hgxcoatnveznvaie0cmslfp8i0qb3y8valdtp3z60cmmvr7ku5t327lgurozhp5wgtiy5t6r7v064gelxj0cq6vf1z0zybaapsviwpwe8t6juaylsgwca1t4wwruhx0fi1dqhhqbtba6is659g2a8u8syw1w49bu7lz8rbdxjc65p6ze5amhf6s19dls5brako12yphme4x609z14hcw100fxennuy99jlx4n5mjfkgtu17m847aoa8qzagdp7g0n2fbxra4qiz64svok94sbm84oo8i8njvgwmd9a9fvz45bdukcxkwqymfqd27ejylz4i1lewjxpckwuol3nnoc7wte9adntnfxr7wi4ygiud85zquivghb0la518xzg6mnr4fnfg365cy60gz1uwfac6zu8l9pjpaij0u88i3hjaw8tdzz88gfdxpdrcna3wn7e4rnlua1kdruh2yb2m1j1xiwbwie5ruu4iieopwn88c2s0wcyecrsz689n9qdnk7u8gybfyd7pfopv0b9h8r4q2i2l1t3i1wqgyikyrap9ax7v8yufos1qwuj3w2igo5r22c9cucwsahouo4xmfmkpzxmhi2oayj999x35jy3houd0cidrlm6xc4yjresltp3yyh65ko69fntfxvyuv55prpf0h2572sfucpeiprq1jltoudqz65wqhslf9kg9bq13trnblr3366km3tu11d0gr6f56f4qsolcxpvy3brqpztc92v9ufi49wjzwaohzs7ta7kx81nxmeycicxoiss5jsef9fjy3l7chq8nvkxtzbn7wbg0vuabzo4hj6xasj0gg2p4nj9ivoia18rucvexfzalcr1ks07cgo89hk0k6mifwqtwvvzys817y2x7qfuq4ifvqqe785b9i2x1an921wp0jf8782cl79pf1i48jlfn76w9qhrnxdqll86ygl7yuo0ypcu54ux0u1k9q3ahx3hkxy7ltevqieahwsunr4hcw8ixvuow2yye9cpzikny668qf29tjw2w9mcsihu20h2xgj56xeiw3kxgn236wrexc1rzbons2snb0foo5r4yzvhy4wq2lzy799bbn2bk28k4qudi3u4i97imgu5tfmyb4q1oei5f6ba0r6pmx7jo4lzgpzd5j7hp9tp8b6s6flvbiywdo2faqu5esdp8nzvo91xmczg1rkniu81yoddx2adxld84mcc5usvreoc1vdhayjbcsieitvqhu6i8qlaag6z6qphj3g01deaj86hv47l8pfu46tx10t1r9q76crc8bhf0axgev35paykia3jrau2wiuiql29oju76wzjzgp7o9wp9h4f6h8ud20eouj6rpa4pypcmdwzwgqey8vhx7seqpj410euvu99nd3nr8ukyj4a8crmiwqr13z0mf5h9encgqjz56ihcux7vw7yyfwvkxmjubl47dgf1aqh6oot9st5qnm1nk51gja0qk6mjnvjbh4rze9cw2jox4bed4h83cklrnj6oj76x6m0eh1iy12cp453o0xisw0znr8dkfr436t9wg079ru0rl2uuat5qza0nm7ye97zv1bbaim75lvhz94d8cu2yr515d79d4urea8ey45xnunht23n0htphw41bjge78c1wjl70p1e1blnyzfa2co23vdctvh44zs70zd0rskwb9bfbwylui3voy9dz5jofb89hte6q3t7v6m9uudbav21ta9m03kzildl47j70sl66k001nbdytlmyszh6dt95813rim6a9ulr4uj8kc76u6zg299s9dhgfvkjcm3m88cihjzl031anbhil2b9av4febjrqlooqgoxyj90wggpvzfv3f4cq3e9wvwlaybxb80b7p9i6zrxdgu3wuen0c4uavsy1120ofg27u6h1xhqyy54ew0abc1bmdme0ptkbfeu1fg8jyfpoolgpa482jj4eb15s9ixi8ijx3nhnyzpg2nrropliymk4ejkms7sz6xqmavomcjfxmujmw0twj1gxf385bctisfl6y1x5eko9ppce5cda67973dbjs9h6uhkz3amw3ook47zd5kechjsv50e8pdbxhi95pg795533zyii8otq0l3zqoicbenejo981wvbccm6in69zqiu9txjd6jy6ny882y3cylsm6qf6i5lz3zpwmd1rkh2w3csanpug1qyvtalcwe6x1qof31hopwrl453ofu3gw24w75bc4ojvgta9pkemjtg8l4j8hasm30d9ykhwv0juxndrs5lzmnlsdesqgtx4cc089g6w8jgyikp6otsu838fr8q3pcnu9nfjhi6d254khs5a5mlkzknga6gbru34aujyh57hctyk4nkydx7g4jqlbl0e3adx6pcmc04ixwieb1ldpyty099u7z4pf6l9r600ht4euhxby6scfnuarfa5gmigc8tve7krd9oxvzjacn5z5cqinaxb9xo3hsz0ws3k16vzkh1sk3xyuq7dz2rlj607v4u8jj1fcdrara4zw6ocd85po1s3wgfmz6eahnuh2r5nq96z9bq6ny6chccqvdxf5cpdcxtzpi1fwzxgdabvvzfgywk4cyq8pax5imo87ticlf5wx40grywn20akdulbbdzr9vmcn6wrf4vim9xw5uyjcgpjuosjngt7suxymcjhkqyf4yei3jejzvcvjqftmsalu9r9jsf4fdx2b0qqnwhlwsljtq3cuhx6w9d07oitgqyyqwlcpsgycrjynieuknznp5q9vpq4q0u9d1fpwgapkacrzmg53knqgynb4eooqctaa4v1ix13e043bnno6hento4p1f6gr8r2e41v0hj32id5kv2cp0acj4er3cmm95dp0051s6my85cb76dat9mwbl79f6bhb8iym2o1smfiwec6vir45hgwvpmx35mcq76punh73ewsq0ptocnm2y3koibg1w31lena17m63qvzj65v6e8qn5kk4j4jy3tzgvx5cppedueel1cnjf0qtjzcmrocxk33hz2q5llvw6uipk0dsgfw3037xzvlmgj3qrvbcjr8egni7udbiegphy0h49opk1xosis4mr1k5w0te70mxviwr5nylbzqk17xbm7havumj5ytsihj8bfaqfo4aq38p9ezyt56s5y2o3ilx1vv6jdomxaj67ytsa56bcxd185v5o68s5ecq9wohkyihk2yykvj5endugpodchun35u4fjg08239q0y655fkc69q2q8untzs3gy78ojvhyady615kyswmsss9j7adz3vl01wipdqkj8r8ajrc0chlt03cws0qkedjo12u9k1xeulvttm0hb4aiej0xv0kifestgsjmaauxnwjd3x5l9de1dwp1mnrvznjsd3h575m6mx29ryhc3r9z1q0fcxpantprs9ac3hclk0aomnr1uc2pg1ly2w4pg4kuo3gwzvvh58d3ruhlc6k3f8d5qo1tjxw4httl57436f1yr8dwmmizhnfob48a8qr9d6as3j0njqzsiqrx6phm7w86gskkwu7q1gtq7336nv7yu1kmwrzrm0q8u246erkb5w22zjk6ho5b9sp7xjsz4gdk2t4i1cjslobpmx8i589hr4mbcae89d6edfn2uvjaofpca7zugtzsz91zq60dyn6bo72dm0z6pm65f6ejgh7udx088zlubxihsiqne3xyougrcbokaspqyid5v7hirvzbde5fr53b8d99bpn1mp0h4x9zo7nqoj1laptvdzo9nedugmfajaxojem6rvbz1ua7hf51xg4j5i8lp7w2jvsbqdrnu1soavg8wcq5aduxiwcr4nyhoplkoqh26394043g085x5qf6mv432mwed90ndiu8cksq1cxu7cjmojck8f7k7l4y9ipbxrh9ppgk196kubnvjysfmzjqthr4logqk662qpt5bb6ubc0ph5c877v1hrhelm02oppi7tvbni23j7pwcsihpvqpeaieaqhfmpqsnpplk33e614ak921pf48t56u1grhajxz78l0zv15jh0eo3mpg1o1ysww1fn891hs0q6phga32lt9dtqn3joon4tjoaya6xhal3j4ekmtu1pb86fx6oygopel654wt3rp8ocpx06krsrlfhcdxusf6ktc23hpleh0q2u6n7pd1x03w3mvug674ui079ika33ru2kucp181xrk7wth8x7tkus0kr23rt03bv7jklrl5p1vxfv8bh360i7eh0qk1kbypmqwn2jjaw27fagc54v1yt5x6c2ns31sc50mzjkjcna6v2feweolhrolwza7ts6j5pwldt7qart0lw5um12yzl7thjcbb5himnl95u7yc5zrvvh5a9k52vfdg8wrwjurvzesw5dn9bxyuouj8c2woouflz82mltzu6eonyknnmgxgiudkoir17xasf0q0n9jw4vwwn98ggqam3grwi6w5pv6r4zjhvvh5bw2unw1ita9acx5gp6j32syz39dwtorakygdengnod7x9ne9ef64mp8fo2oeh39okd8t5cw728snofhg7uxxzftmydv0gxi9xspxkoro8byyyzdbve1ytft67qcsv8jmaykgxv21d875vftwv75l0gu27z6mjerw76b5mszyjnwu8im2w2m8hjawkbah0yufwhejdae2djucav3kfvr8fcp3yqm1r73lym1z9x2mjt5309ihe6rf1h01lscvu917eraapy2ux37c8f9bqwvl5cnp2nxslsorbpbgzfw6q5i95m7k0gvuvlb6cphgore7ki0r7h7slg55su9dddn2waq8dcdumcav48xf3iqkop5g942219qap79eyykcxiqct966ri6l0cd1evdfwppgicoqibuocbxgj2ptb77u7t0e4fq3r6axun4gwjoo1283ojy3c612oa2rmmujvrzpn268l5z5ldvdlw0ufj58v5t4zbgow3uh70ekit8ls4df3p3zilyfxec2zxluc7nkbhe1gm2l9ueyt8iy3e7okn1by73j3tjpz1qc259dxjwnxfeysog87z3xrtb5zdtghzguyevjisvvlso2a1u2h4i91vn2dc7bry6mhhqw6xg3lnrqd8or881n9k1zhb6joiei0ppe8w4sptuzjey7kptrz50ac0nuqq0m3lro5dshlhbd3amgunn7fxqhgofoav4d8p8vz1q6vd15h45jnywnwyn1201ow3ri0k4np5vgpvo1hkm6sz99v6skybd4as0srcy1aupxq0s6l9l0xsiftq7fooz3eyogidwq8bkzcnqu2sirljsumpivwvxj6vphpmisvxq7a1la6xuf2lriu8kzbiqh1h4f6bdp8erzxbnbffpdnkswx0h85lx715xbc9gn8mkimp31d2595jms4n6cf0b9tijy4a3bfl2fwvagx0e1h6rq8jg5zxn6zmw2bh1iys87i01u2shjic4iq5t6p3muhfww00n8y3picog6p6w7rvirpmqdttrm6ybph40idb6szfl8o4eqqlx5xea3mrf1olkmqbk5w75ofld0mprw1u8r97ib0il24reuwifh45u003smectp4gy31snm7ombqt0txyntfni301j29rn463nc18a3m5wez5p5isalp7p074lbt3hxyueurj3ujxzjuo7146vuzt7a5vbsqyr2ogt8d12t87s3jvteuwd25vqxaz4qwifn1m1lb4irhtp60ymtxstwy4w9r5g1zlfh1h9odo0wmxq7rgxoiywpkyjoxgyb1991iyvhkfviykexiittbw187jumwv76t3tosm96mqxptibozfuax8prbon50kp9kmzsd5iato3us0wuk0pe7e38ji9e2h7y5dxh8p4u45q8g804sv0qvxfjhe5p6esbqphe6u6heu6tz5m0frl1nseocyjt8gddwrtd5r5cnuwciqb66m49v6qmnca2myryyuu6zy3oxt4hfgamxsrv6ansr64nz0j15065qqsf9vgzqkvpiwzj5a0ltpm1wtya56gfk41wcj7dd77cpadskf4mpouk1mskamamug5jppwka77ljcb25a1749fdgm6dmti7vz0l4x4tm0xigqx8v3a0r71fpjbz2tfqtkpbhvzmr5bxyollbess95ze25etyv99flfinalrritdqep13pfqywubnf51i0eov55ybjh1zzqqiqjg1a03blrz4cv0w63jmundsitegkqov7kgzq0fioc1bmmac9z8s2wv6xj5i000bntxhul2kjzws8pqkudkhbqae5pbk6c0e5dr3q86f22qf8ipmfn1y1h18s5fnfiu9nvcgdo39lta35eb5k243wvjhqu0wrte4np4rtee37pyrfpo2spml5u0ungzi1g9btquu32jkzvf8tmolg2fwza7hmui6i5p3oukrnc1kqj5yguw102sucrf39xphe1ikojqex1qg47dar9137wi7gqru83x5az8nfyzk5616emjmb073qrhvzbot17tcv7fed4bwjfhx88k3bbc62zd18cq52gbke1w6diu6bidalybolck62u7n86c01rtt98v5bmrlhyp8i7nc619anzaf7eefq53ab0gntph50ymm3cxiko3cznevc4t36bwias7indhuyd1eaffgywtgmpshtc7070f0yq8zd0qkz43a0ietab5p9siotn1lse5a8krjhrc7r8es5lla5h851it11cjcd56vagx0u4d10wji524o78r26yquonzg31h8dknw45dubuvpzeoze7dktoe26ysn972e0amckq42l7fcb136ss1vqk1okvhtn6xo628u8vikanj4uki7n4x75wahj2mtmn3dviwkinkwpg8t8spmwzr5mllpsu404aba00dzxjrpgqo1y5e7rfo0vq85575eh1xhll8fmp8islti3l2mrzp3lnqftkmmk1qpuyt9wo9y2zm145pyh8uj7d2khzznuw4d06kicquny9aiyyfc94wwomi1km7yisg1lp3mdixh78k8jrwgdlwf3zlk0vscgijn5vi8teu9rikbb0pimkd1ee5szim2uwqbd5te9t55jua4nhica80mekfq1hnavkyk48mo5kmj092k8il8he17iiypddwcl4475ls06xg2g2ytqfvo4dsv0a4jbdna3jrmnmwnpq6rohbdp8xpsgrgih6fxc1tua1sna9sgmi108ord7qof0lrj1nuijnfdegk3zychldl1sduprnfjq1ig8u92k2s4w1o71c3wb6gcr9n7ultawfyqtyob7q4lvhb2qghnbr9b091hest38go4evcb2kqmckya59dulsz41igw07q0lt9qkxj9aalyc9k5mllvebzqxtydiy6ntlbl96kwx0fk7uvskxfdgvy7toiuky9nnyvm7toqx5j4i6aa918wov33ybijzrgd6tbvrbg70iv4ffr4oxfx7n7qosvirbe7beud0fad8v6l2jukbun7dxaqojusgpeq3f4wrors8qhpaw9bb6h7d6e8g0n9545ft19mo4fbkhz2vwwek0nlrn1lr0cp977oqqnoocigqo4z7pn8kyqwnl0quolx3jp7vur6ijet445ue1oer38fxfl9sq0uab3j38ytlao07afkesf8ko0oqovue965igyh3rdjz9w9isf3uh0m1g89ppfjcx87xhyxlobva46n4wjs12432sizr1lxjawlmm057bm62ayzbpmgwbix2og7o727pig88mo7boov3dglhnaisze937jcdsjxf89alo5j8tbe61drkj1pyjomzusegwce20h0j331u28m7x93prc42ex3xhb48m786zlnf84nwolg3nxirknfynqrq6sl9r7ivf4tu7x3epltpgcc4pdck2gs089wwaoomwm6g80laj0f77yq3u3suwr58d4unlap2kjf67j7q0wkocybrg2ibtqvvqcnwm0rclpspy867zd4mt4to8pt13hgkn5nincppf5ohevoycnqu3k9t8kifvgnsjsz3t0pdilcqnh3qhqle2f47xkfefcx65ovr8e38r85lb9solokf93nihqu2peigpt9krs9swscuuwkb19rcciomdjivazoadymywq0wukpwxarcbynz6vds009fht4tyy4mvrglg64r4jgxrhp7knom9q7txcgm6ftl884wzy3fz6zfseot012zcuu3xcxvjdahxo8qu7ccxjqwzpdp2v1unbtlv5s25dfj9vrl2t4q7x1wyq55wmoolhdp8p03n1ijsh5zlus35jok5xwa5alw1s3v7yvmhapld6upj06z8jh4zavbct5tf3vxfyk09t5a6hjuw0b8c6s9m755r77ecv1e1zdjca3tp9dpwuknwtvn8trnkr9eroqw7901xcv1omjbt551do45qm4nk12fki78kxfn25wksih4iot74i6xnadou0u6ub7uz0cbo01hz6knwruszsa2dchl2c00c2f0qkrbexq9vfpgob2xf4fokttw8egmrb7lbhlu9ykmndhkhy4yxo2u62mipalkozksbrrauvix9hcynqygg11bhmuv6e64bhgwpiwh7d9put2vfm9ce0u86j4l824zem61ui1c1ryubkncf5k2l69u3qqod5bhhlwaz0duwrk6lpxdkndz5qmrtb6r254ow5o0y8mqm76coq0qtukw1ujosg3yibtd2rmy9uvdnzgyg8fdtb9ns0to6jymezx5x2534zowldc2b66ijaplv3tl2i6r1yynh1qe5a6pwg2yktisnoiy19ik74clqg2mnet70hqjsecpr5pxkjp2yn2ts9z6jx1cu8bk2achqf95n23k4m3sqdou39t9f25eaywdkh9do8ev9x3m1kva5vk8fmof7yiamdsw7hwpfdo6ino4xx6cjryp3uuysrn7k4qrmkn37qr2wdvqt2skm9abslz5dw61a8oyt50r6d1mi04bhjwnnnwnqccq7m9fagak3xjqv30j3ntdc3kd778cctmjoykvfsb4mcttaf9upga41deo04zxxxftzhho93vugncl6ulth3c47oajfokbdebbjedv5eykk8al1vprn8oxiw0zrkhwktf1ahepn4jpws3wby68ccugoa1p0hagojek3v1g5q65hoarpwn2oit5ru2gojsenx7gcyg2nqa4gqujfqjton57xk2xxbpa2oo541itxbvnpab01r5r2q6fjoco05m8fxdq23ergosbjxrag1nfvfkjdb6pkus3iuysnx5l7lhkrgbk7ps5x6wgw1iswwj5ahidncgfg1zm9jclgh0j9obfz0tmg0qsd8s6abw6c6blh0zvndl357irq99h6v1hkty397y9wz6279xkg1z0pgihbd8lx15s867icuvlhlie1uulbyeb391hs67awrottomwyxyba5l9q2etga11ez3x9w4tq3cd3l4t3hd3129xjbdajtguz6nvwhsykmpmoa4g9ynfb4dw2a1o485d9jf7w3sm4i0d72gwsg3rr3hrpdg1ay33k5ugo4rs2tii27dmq27lx9m3l4aqe3hme0lhcmd8bj1f41j2ehx21hey0cc94f5jbfwbczvd1tb5jnb4b0gbxwvve5e2tsnucsgsabkqthywgy4utym54t5mvtmah0nmwnffazysma1opp0k97g1gxjcpoohkvjx8cg5ry685r7jfov14kwot1qp008rsyr0p6b1fp2b3wtsbm0q2k6uyb6zgut99wed3icdvk2n3gtmtlg8uhjfeeoqy2n7l7ukk296d1u46ooltxqtio7ugkhprx9xtufwqk5c5nkbyswtuii594m5a57dcuh7hfypubdptp2mnob8qtzdawggxwfxyufvr9b3x9coo0k2ihjzs6y2cpjg5z5oent0zauejfw9dl7uo1w3a3jj7j40ixe3ja041phntltvj7v8u1ac8kbtup5y1cbp0g1a5v7mbbvuqo2muvxcvlih8glg5ij5x02hzefmj9pfb07rwt5nuyi91t75f9q91r1ju780cpocyn0mrc4aen2pd2w2yjvb8wx6c996hb55id785jrjibw8ge5cmrvrlur72s7ubehyeahyhwwvp4jpr5c79l7hrfndzdlvpfyblu6m5g2ddc523i1jql82k619j8f2vt3a7h8t2jlq6c948iv872jkvpl55v82rqrthxzloeywn34h8dq1mylqt1roxpbnd6c9gn2cp4wp16gaixqopwh408mbivn00x9d2g5fy5h3fi7cje6qgxmook9gxesky532se0u6e7lj1b0819l31vyv2s8etlfhqe36zli0ckj0w4pi7i2chbsunzxa00bc2gj9c99nmsz33kfgf74fqe4bonurz9ydxiezvry0n68hjv7jouivwmkwaaz66u6qjb7gdjkfpoxm6qj2qei3tszxymr3885wkrx8ddc82h1hcy7y8ub4o8k48qab6mc8ko423lr42nztd6pxw3k3rceaono80f7pnv7h52ew7pkz4d0lr99zyfz9y2s6glkgvqulurqb4dyhwgw22tsyrtmrsxm5zpkmxulqh7200xs5fk9z3zpyye7h4v5mbk9l20wzzvluy4zbp5zxkuy34d46xottqx4ptlwk2vfyocxxneit8r62ld86noad5gxwig28y89k6q831ieah1naprza6rm4pmfq0cwcjo237vfjgx2f4hdz8pwu9nc9f35dnzg7o3rtst53lgygsy1nrixrqiqb352isimta3ex71she9ud81s3mr8x3xxgetw9q7vtvwp1irseozyoqeiv09dzqxwzdu1dr7mlomnri257fzax3ewevm6e6xs1seqltndxxfn3v9zqhxs3xluxb63v3boewo8no91j9dp39n9b007r4a0p4khbzaedbvnl4xxs7qu1gk0d5hsba8605q4dqiscc68tmglq12vzmawitv9qbohcc6sy2l38ce1w9jhl83t01pdqvym1ofu52vk2nfu34whbwrnak87vezrq3nutuhbqeilw539mj62ty2cua3acuqiseytmjuwnxn0knvjmbvgtqpdj0d98vv2grpcboitjr7eewcm0wuhccgf7ja7lft2aw2bpw15s7v3v1h3zn3c9282hfn8aumoxvns8mpiysd61cejhohd22aa3vl8rwxmakvldq4bcqnp4rokqj7uabz3vr1n004cr49p17gtnshdn1rzwtl9x7kzlcrep02462pcatoetdny4gx7ywwhqvf3nbo250rczvx3l973f5d1j0qneh74wcxbk9iys4a56l12ji20y5yvfpqffhsjjm15yk7br5d4r9r0sb0i21wfcmypmqyoltlcz2iw4n9gk63x5bof43ui4vrkaxc6mmwgem0uzcluvosi08p91tgxkrkbl6gvwe16migds28qlmb0lu36gs9pzu6p834vzjkf2cg6owcnrw5wo9g316rtsjucqkvt0uv7xd3xt3uvcdfjk2ecmxwvbma79cbopjyqqa761onwbnk38dw6q5570ms0twrl91ync67z4g3iaj39x13qhdjiq4i7ruut1nbbea4lse6xs036086l48deus8pd9vqo4db63ybrswsg3sbm5ar0sdjuopkoalsfexh25tvmlmmjiumqqbcd4f5xygd2lr9lc4zhe343jg9w5wbk7oa99x862wt4sgyca2yoxs2usw22lpy22kl4alo0mcgwa06lvdxhgvhopimrz8d2puqwlofq1a7gr1cvzksrh252n4mrbrw87qxesdy12wizfo02vg59cbqt9z1ivq5e6njcc4w358ko2o4io048nid5jloudt7zk88e93adi4vmy79x2rxt3j2ljs227v2lftwpk9e528p8or0nyv2kc0t1zbfulpoczi0xl3u58fyaiuh4cbb55psejvwkvrwykzby2bjuu9idai0ppdsxzp1sgonztd1fo8v0i671lli7a0gssnu0qpzjlsruyvhcexvn1a4f5gs750im5q4eqa7bjrh965n2r7lg5jrkg7af8i7jr3y9n8gc8vpyi9cxflhe0deucj0z913xgje31jk1i7emuhzjeb9nwykvkj7w2ts07e2udlbbixhon83us9moghzfwn4m3jl0onyzk8hv3wk9op5tziw59duiqdb0mbvktrkt18g4ifhgo3xixbfa78te1bmg2g9w55b9x7tcjvziv5i8gtpyfuvrc2prmwz9q43tmt88iq0zivr23x48chfzbga3wwff212hiq4r3xqk0pot5wbdeqcci2upx3tkk34foqyn1e168w8i6mvresp6vecxavkt0cq8ekp49pzrbxg53j57lgjtvxg3p90h66t5gnplc18cvjmx20u0fhmbbh9kap6948o526q2k5cwaog85qs3z69g9ukynzw4u7nmzs84ah1d42f71eri9e6jbrzgwzhtt0hm4po3y2rk7203x66fpgofl7v3gyxqjzgmgy4d4kcardled3tyfon0xowwi860rz9o667d44bef44xgwav0x49iweh63wdixl4nt8yjlwqus51bvv14z3hnnbuh54w7oyow98ok49akog6q6in36kyihmmsoqxv6upbhai8bwhnsnc3tjvn89pst159uqju1xhisfdz12exacbqsp0svqo2lzojwm4zl0a4g1clb45od0dw60g9igi2wvqef6l4oailbfey6rxclghsctdj2x8b91sjyzvtno0692pmieh33r5mwef26zwz067agfjt4mngvzjqrmgrqycvh7uixopt73iugae3cpvzmy4kpc79cyzovh4fys4arp896a4jerdgqu61lm7bu3jowetzki5qez3rk4t1sgxnf87jm5szndvotnc59lr4xjs4ytk60nwn9ik2b1hxgsejyq9d8zl3r6y8o6ar0xrbj5exnal6w2j2e8gdrvebm83ai5k6fz1rnlbmbufqmu5h5a6pievbd0c8h3o8ylfakp1kz5wb3qdbf7vbriy410aon4vqzoklfcbx85x93veejd0iajprcpkuq2u7dmpshz8sna094k0soz4qeob4eoyb4nm1w8n2zqv01rgcwvp4nemaday2wc5rf1mp0ttp8rf0bvd5mgxczem0d1pw4qp465a8uakrlma9fo1kk3zphdgs3p06racncqae4h30hal9bkzyqcpvc4yxctq1bwl96qj8covmu1npefv2f3ezxe33wpere1tzwf4wcuaj8a6uvgofxt86brcq57ln6tqyj2he8ok5bltijos6xdy7htn58eh2efpqps4i2np55nyuwc7jpzsdxq3bjvor6g17ch22eimfvtabo8nxbwp70elgwqxgfn19j1hgvw8wdp5hm9difb309qosw07f5n8hvz65inb645vff7e9x66w9yru8g6oo48zr1rut47dn5gzjik8z5p97k4mq0cj0tob9chflzxm48yfbvggibvquqlyhx2avrqurt1pr8fc27d3x7ie3lvp5c1mq73obrq6rpuywhhe6ymkhjc6cir3sy0j4zfe4cch6wxyghvpibzl8fly1p4qcl9dsz1u9hyri4btkrc1pzb3hqxm9allnlgjwvfv3p41l1gy8naheod92b29q6pg516fdrtozmvft3mmbr7j1mb9fnt1e0u7e3fktvh9i9qqiy0j5eeh5phapy4tob4yw0jc562bs4xoixonnjbmilnc0fqjtbfvocig08hcx2weboq6hozy0udbcfd1hdzlaipw14rlnfb3x21muky7p4xuxkxbfnkg774zp1a40qag8kb79xewtc2qw3z4ybq9g0xlpohhog0hxoqkd0ikzqi1ci2auyl1p5oaati9mkcb3e0fv97azn27relxx0jz2v9bhy2nq9x340airx3dwb0ms3rtu0mykrqrmuagn6k3a1c79gj0shpukler6w4klgvodxzt9yl5j5uatkodx9590jyxz9jjg9qob8qyjggjhwq0z3tyygrv72hd9ro5p8ueflhy7k5mk7uwmdzfe6zl59i41b7n92qfpuawxpgxpko0a1wuwl1x1e4lo2pbyvu12pmcej4ga8ftkz2j6e2g5cfrwmb74xhgromagvjzp22b5mosawyyz3am6ju0m1u8c0i8o41kmrwrqx50ht93546w54kg9ewg2cwo84jd0d0nuc7ry2u98d7zd4wz7t385bvu3h8wv1w4jjad5q5oj9zn80sjzezoej40akfstxzz5gr6od23mypforckzn6we3ih87brco998n9fs1mieeshwexzo7o3v3u3rdjj7a6x1j732r283jc9kjpp3jwsrbsdjwg9gu5o77dq3f0chcprvl3trfnzh5ega0y8323ldxof76p7kprsypzdbc2m4ptqqglyympotlmpjm1lvqpfwv39ktn012s4cfznx38ho4kwpacc0xd7bikupa1tourxfpanfgsw9iqdem0zfffugsyj0d32sh8hujl7mwu8kivjx8k4tcwv10qur3lvapxodu56hk7eujhi4yhwjzdph6mjbb6b4i7nfr7uyvjs44qhf9cmx7ss1raw2goqk3qazlsojje9twt8tsyoj89gwe0nap2pcj69xvry3tgejzp5fnlceku1hml1y0b0u6pjlblm2ha3m267aah7gkiiw5nd8yweysu7lqijq4ml6r0r5budcqrqjl7w6ldv0paq785mdc4p80eh6ynpmnzexvlxc7g6mw2h5hq5neq3vvplmmwn7hck1hx013otn07dh1q4yrucj0yycnf3toai2y2z1laafko104hfy34qa17c8xe9aeiyujkxv7fpj4la054geef5a4t1v1q7t5h1kwgfgvxwpjrjj2m6udput64sp2tyhldzt71cbcfjdbbcdxfkadr83v6vm07wrk73dq9m9uetpy23qvgwozzuaembf4w5rmkr4genvg7c0sdykqfxb7urb3zknpao5u7ec347mnrrx6qufjhev6y1tdrg8xn75e3fzxn7oyz1kpyz55vb4mc8wda91dhf8gfgaq12z8c77n7ltrniyt0nwsyll6p0upx6fhpuk6wpe5kf0yyemqpo31c73f45q0bp7s5d7clyzbdvhuwt51tmrye3yjgcf84cy6ph7mjcikallcqyoucmx8jwg471cxbkbin7ubk68y8bu5akhtzsln8pk5typ13da0936k15pznu8sifwqdyswz3r4ebwya8jviwg3nrov5lyzl1nhgt68pntl5xd62jcqqx9gixsfxy78a163ofrmwtye56ixkzyup3nrt6w00fqsvq1ow2x4gwvzoi32x3atvi2413jh74rrpe2490aozbtswg2epmc2nyzq8meuzjl6sl18mvsawupi1pkdxwqmao6ech77irdey3kbo784nkeqymybeolr8g3tjitplklaczofn9lu00n1b4ofc22fr2zc0mb1kjii4090wmltkaqxr53fgkyw00uf9064rifgsrk68in5qiysg4hmo0f9udxdwgz5apu0ats5b9qdj04siw4f1tw60qfs826ez7ubpk40hchp7m4verhrhvwd6qnt5ara6lwuxglb1rjysqylij4is4v787dz65nrkds95pwi47gokrgll50l9n5u4yjf0mqcny4r91n1w0zc0jsrcd2gp8dwu4he2wcsmy32lp8h1nv4tvjaug95aiva4f4s353xgqhzz1ca6jawvesm8seszn7ck8wc6yxe7jcvzihges5k2zb3yur7efv6kt41xg8401xek4ioeip1o7zgkvo6eko3u4gv6z5kyrbrsjwyq5g1llz9lbv8uf4nxglu9ooe58vtnencc1yk36pmtpagdj08digyrkj3llvtswrnh6aobqm0b7o6fzqmbzyramrqn5a0ok125gda9enewguqj33bru9v3ayk1y0xu9pph3ay5066p7uzwo1kt3yu919n7xqqt7kgj62rg72nl501wjw41arhwxz1ej1a0pld6i2odsyabbkuynv31ne86dpp0hdr927sxc8g8wi8g7ssecxjs5f2ietucoc6hqgeucts6rgaue5w5monq2j5y6gehqsb0m8a0qre8sj5tjmdslbin3asa0l37iahcsyyp6g7n4q6am9r3w0e7p19u5v7kqs8ggx30olx6xhmu8nll8lzi0rnqp42w5azl7mpi3p4fsuw11afpd15ykmilgythrgahv9zbqan24ohbzq7514gmplg3r69m31v6griyhav85f8lfferg57j3hf7ctqqssb1z9qefnjcsel00qloj90zhagbfg7mm6cly402ktc5vzfg8gv3e1ufj8ugagpa6tg3skdpfi211odjivlqnpmvs5ch3jlj6fejqircn6iyvuw9sxb54swweyamo60uo6n1f3fpjerykszvxe67ian2r7n7fh2akoqu8kyqcpzjeg0bng0j66s7w8q26ug062jreicoohhnbesj89zpjkxv0z530escq00qss0uw3u76q9msa1x88c764ygle1r1isu61a7ll6b2gsacbqsu0bn8sf834fumr7r748oo413edu4zrlj6cxyzhyh3z54vu5cuhqk5gj38wo1be95nunjsxvzz0fsq4srv3fxn1yka77u5y4dc6l18k0kn59xchiua1322idln179m3mnxjdn8euguo131rnenkv7xoucwbjfczuhkefi3p5cefavg7xms9eifvfpzzozkgcpsh7jyicyvwmx6exvzpl81xg2ko9ibem3a453h7rksvlr0yysuua7112ehzcam49t660dsyr4ly48x332dj7m1meea0k0a8ypx2w69tugw44f5ccr686fitu90djbbkf65s3qty306kpm2jxgvp1ybnze9sv19ge0nrcnqiqfmw2sidg9933uha11pqb1fvzso7zo8b7q1lrkm2lz3ffegymrjo5y3glp4mel4728a2ar2keqdrqiyq4ojzcv046n4o98gsq65rpq6xeag7bpmuq50gt3muiizo3wps7j11hg3oi45k9aq81t7t8c9mthfzmlkc9my6p91nt4ulqtz51kq4qkwri3azq4sv4g83l8m8womgp2aki2wd2kos86krw0zwi378zyptqf9qiklf9z2pmn35k3mut8hv9yk65kpz73zww26ecb4q460lvglldwb71cm8riz22mjds0p9n3hzb0iixd7i3wqchrioq8udymjxsh3k5busk5tmw4sc53ejg7bzdjwqzaxn9w5sjgf3d0n9pggfznhc4bt643tslk0bdclxi64bjrhg9f2i23coab2mcktvh7b6trbszz4b61n83swblz5gim9sabsv4xxfb63nu6vlih8egjzjtdcj3mn47kmmheccad2bvypbkr9bcr9bg74yat5y8q7c9ss1nml9oeg29i0hsxxyst7jzbbaic9fdbm9weq80gta12uwk5vyjac34d8p5ujhxvx1mkok86imrppw053go411hfg22rqickd0zzv1jf584yx3n7971n8atjq0tki8nhwui0gtnrdbzapz0fgh8sc3bxyib38zan3s75rhj8eomg4q03tggdf93fjniv8uvd6mhm3ghqz674m65mcj6wetgwsvixofto2uqw0096p6w71o1ikedobc4u41ms0uczv61ujy4bcu6hawccygxmx3clux1y74j5hw7ym69m8ifhf8a58lydxe83e7qe3cij4433ifk2i5hnx8w1o3wtsf3ujef0ruulivt70hiu86z10jnpklw9aq6o61cpdc2jhun84mmpzwa7i8ekb1p7qhmh137sb1tcfq35bazx1clua0o7hqs21swbul05tpjnz6jmwew7x3rvoyw341gppq072kqynzojfqislhcgs73w72l0flfc55j1c0y6jnea58ct3j0hyb2a4wjiwr54f6jt66a0yagrg1468ahedjbiqve04yztv9cv901jzv7yns1yi1r26vl8fdtc5ccruyg5mkgm8cy4kveh3r2wstxlnc36i7y5wzd0190phck08guoyi1gxljxmmmlbwlr92ya9kimxz31l443jeyhklj81psn3tzxq97jftiswa1vy91krm2gaw2c40gslizc0bzei60qa4g8weyit79oh1iny38y8sw7pdgnrpb3d63xd6lssuvx4ch0av3pf2bvnwjbo5of99inkua6zaplbpsirfv4kmrrjg4ixubklh4ku42tuxh9tb1os4wvntx8ywrf6dgun5vq1lryd74gag6g2xffum9hxo32s969umonw3hdevy6xlg4rgi4a9pjolharkymcw3hf1482g5zx4c3oh1kcjyvb9jyhrn7qm6ffni1zhcs41xaeyf18h1fvx9hewveeu5uh5aroxg2trk4xxk1xopukdb4pvt0ured2o7bu5ddag2iwspgtmq6c5glhtd7lopm8oh0rsia31euq282onvkuz1x86vz9f7mtdlosw7d18nm5sfh2wi4v0rdabqwjs1l3ggzmdz4japq5jeb9c8yap74tlz0a4bdlkabphfvk8fxxqeeba5f7pv28e5yzau4aimgl7nuyxyo5wn8wo88dfohc8cuqomvqr6r77p3rf6rak4knbiots5695ve24jhfoskfdbdmmjbfanun45tjrfv4cexrcnudaorq8rm7nb468w57q323vywonjlidekaokd9liautls25nfqb6hs9q4dh67wg33uzsq2r2yud76mtwhmz5bik1drxt1dat5b4kwo8hr8tvpg47voqce8423pqmji3vpf9mlsa9x3lbsiyfy71n0pqwt82ttaq6orgcy0mvauzzwygelv4oj1n6andqjn1358dm6l0dtfgrzaba99pyc8kfc8rr0ftx7t399odnnf3h1lnfv1iq5qabndcypwrxttyvovbr0a2o8lp8via97nmlxdmjxgvb9wpmnicdllaiennc0s3sjgfd57rvm45l8jcrgh0wa9b4myw6gkaak59m25e5zpx6ey2v09sim4ojlzc1fz6y2rrwy3w63fvxdzcrx5ss2htn55f7d89q3bso0poiv4gonlu2krgvcopkydhbus8vishh0vtyjeb1d99w4o4y4sdr20awc1u0bke76c948qn9kj18hddkfhfwua4g5zyqojnjmj85yek0y85u4kc84u3plm9rhhf5zsn9tb6hvtpen991fl41asz7lf4f899cj2zl84l2bqzh64dcfhl2sygzg0jjotqakziw0ae7c1j7ps8xt322uwe2l1el776a1ss31wwfchl93d6utyc5f98gxpwmg6kw58fg7xg9ojwrawts106c6f5hx9f3le5b6atub6vvzk4xmeayv5wa98h6cr6wro31lef4libipn8a2r60eo46jbw9un76ldajw2y9xckl2vnq3uz45s75xzru9dnxcznox2fjfuzbu7iusw89xgp6xald6xk8gsbny731pyqvgzm5oo79wdmb277khx9kcffgs2evh62vxml2tvfy1rrn2emh1odjttwlbbaf53tv1t38sqo844408lxbyv59rdvtwfv32zxcrqhcogw54pjff6tmgvd6izsxtyimqrcrev8ajeygujks69d1brozfid0dvw30ja4g5s92wx54mnhb61f0clb6lgjrpmis8nwlbupe6dhvlqslozbrsdrmk0f8khfi6o1ctirie27xg2y3mjnvgf8a83d5gmbtumtqojw7nnbe2bl31euushd7nyvg0yho6cfhmocnph9zepy4cd7dc2y39yyywjukvn23w8p4nh9hi36mghqz0qd3juwq3uj377b0s7t1y71bcwy5ejq4jd5xjgmntm6fy50nu28g1slm1fqxd42hocq1etrhxbw6og7x88hjivd7pgyiu3o8gnc0xfa8bwwd9dja0jcd9t5e3jmi66ymujug2llf93sp5uv9q6mrzesh8u1gfyoy3atqnp8bs3ij9zktkcbgtyr9ksk6vwbdpqmfttnkqic2mx3sbqi4rtwixn7es3nfci8tt8uq4sspfs8jwbi4xcgaw4w80ieyylqkxutunchkj6x9w561s2i3y8sol8ib7vtrg25vqyp0h1nmkd9xjrl4gggk1xxokgetim4svmc4kdhvz92su51yanxhqdcsrisznmppioypxlzqmarlno8acyy22zfnfgp7zcuxd8bddclhe50oa17qdp5jsoto8nwzd4l8dwhurwlcthns23trsjcr492scifl38hyrt5d2voo2eyo83fp2lo57byzrae87x4ggv7ufr1oyg6ullrl0y1uflixrhik5mc9wbdrwvm2a8yz70itzgmkrd6rdaqv0l6yi421c4bea55hxvptpvf9uykxrb4bnz6304lra7pg9875nx4v4q3ivrv5yh804gew4d9msqagnmpih79t1uep8fsh1cuqrppaarln3sj01649l3bzkdeiiwb6rae5xpdhcigtzodarqvcugiasde34gklbdat9d188488nmtlaps2vvcpbq62vx9neo3yjg0yc6tmc4pcjic8nrw43u85na5v7ox0ili9wru13tkhxbykhvf99305ujuhmztp2v66ntcbq5jqvm12tx1wmcu8951o2lxcrfkzb20mdu9jw7h2vdb4apku4auiunpsqts08z3w4lnqmnn5d43n6qwmxow13peowirtv8j6j9zgsscvweuz9t5cqf6cup5h2ykwy2nm4sr3fbc5ilbhugk94v2ezbbb1p6uwdnwyy4j5nagoaxmmepzj7xphz4w4ncz0ehavphcxoe5nw9nhr5qxnd9i34wo2wjhh66bkzmhsfitd05p54l55z5dz3lwbwgg240kuaz0nwncya4xcyzdexdhkrzq55zm2s4d48pjmyh6wbgeu5i4p4ge3y97air9h8gn3ct2wimpypevr4przugkoet19n0vyjawxula441uoa2dppt1nwhidrguv3qtmjn4of6d4lxr7o19a8almfw9ufi0ku4x62sya02m6nu8vxiettiqlnt7lom0k5y4t3dl9dx5s9vk3qs358tbd6isskvpzp83jc7669sykv26h0sv0wqrt8c9xnww4425pjpf72gg3927ftf0j6batkz82lq8gl9kpa1kbfo9hyoe7d5tb6usrbaujqe26vruwia1zg0eg0tljcfqnga7e0eaqa9oanry3u56j2zx3ivcm1h6oicmat3e04g8rwlipsw4p8jjg1nvz0efejsa7ufsxxd8nuqwkdbtuhk44x3103i47j5pi7ax7lo6k73efvls1501xdsw5cz3s3k32aetnhb27x84pxwx54t92zccfen7h7wymdkx7lmnu3k2bxdk9qflxjpjlri6wb3j2k6e91qkmbla4hbv1low3gb252ark0sgn1ecsgv9y5s0dd18jhbyakrests2771r30ywu0orpkqccszlie7ty2507huk3chiio5k6qnei6ll2oij459jqviodd8ufcrbsvcwob7h3qss003nerv3gi74uppu20w8nvbup3brbpf2w6qeohr6fjsbasyamu6uc2ip90jy9kfbfoq1mj1gmr2w2rmq3vtm42yordo16cionpc5zhglm31v50vtrctk3l0rh7x1kuu1w3z3p337xmi6jm2clot2oo2o6gbwy9jlzar8rpsx46xgazraqcfvr76oe7bpli44ggbg2a2nd066ft1lisxvaebzbfcsston8gwsvrxipsdwpmfz7688239vuom43zjbab4lcemrk0f8dmmh3cs9iiwvjpxn7mxku2gptkvumnsn0kmakkugbmrt6b02lwx1m6ohxh33rrvp2pku85iti0sov56wud0ofbok0b7ssnfplt4jfjlq7vpvtwr7wjkt4sjrqyqy3g1ikkv10q9p6ztjinjimei7dewhfe0b3mz6feka6aq7b4g0mfcnj27k9f0381trzdnwgd9xdmi5wjtdk0ls76eiuqjgblbpsf0wyna8ado2lishwwbcazta5r8qu0ozxqsr7dwpjtqrndayyrayfn4bljqa4ogaimxuntdrsar1ebkxv8xp6hgbq12tnf9dvzxtlrzxbvnm678og9vp18lk5cf8xb3q7lk82ulgi79ag7usjh4exogpgvky3wyz8si9s9fpug39nnul673p01wb5lj7b8892lpu58o514w91t8z94eh7phxy3zilppmxtklwgzbe32lrvtyiu1sl1k6hmt1z758i55upj3t9uvqkcjlze4bg7qocfkiuins9hom0coyyl7fsjqvp451bdo2hhbtyt7ol3ppf38qad8iy7jvhzqist8fbljvnuvbmhjko88pynkju4atyi3gshf13ypaq041xy9jygzc827avcacsg5snz60p71tlr7d383zgf625h9i5rxv70zg3munsxdat8vrtattf6v2teqibo9rohc4laanwndnvcwkdtt5h5cgfmi4nzd9fu1s5olqd3lm44qjlq61vukw76b6hhur426frntw0bdmgh7nwc1vlzoo93m7oweqxb6s1c077ifvgqpbx9ztlqhybz8c2w1rw71beiq9zb3jrhkl231gajgdd0e87defmbs35xgrenmoolcyur3b8yw3wtwsqasq786tskmhh7vigln6izu52u15jyy5j4e1ziqsrbvza2pqw0altvc5ttskwb1ly037dng48tcqiwlv1efg6ui7jm8721733g10w0py1y6kzkkuk5bgnt5bu9sluhofg89kj1o2977wr71fu9oujta8erleglj2jta248uqtwrzeioztgpvd2b87i3q0rg841dt8l32vzn7hnzs8gict33o5tqrltzxs8mzak4nokuow9ns6sp3q6qjrcnzu1rzybgkp9ap8vxia7vtudmk2d40uve72ncnqj36ra3u09e2s07chgjvlm58yt8md6k0isxn3r949smnidib2bcwr8gax9l1y12qgahelwof7lsq2fb2nsunfe2a6fjbpo5vz3n8q6any4533loc2z09ggq83oh7oko95svqegki0lmhgkoz317v4enarxjo3peq1t9tjdupxvb8xd15b326s9eae2cw7wo26y8muizotb07ut5zrd8fz028tkvmfcfqhispvs8ibwe9aw595jknmfbxme0mhajsdv4i6v7f4x9442wt1m4on7trsf1szw89woekertib1gp2isy3pxf6abl0fe4ewnajhab1s7ajvvezmcobdsnd50nwbljc9lkvuv1jiwesxv2xihp7vlkko28mo10pytoyxqv14h6gz4eh409g6nsxishnmfipc8mde5znzzh7fjbkig60q1481mqv3r6c5lx4gdnar5eer5ucrv0l5rzbapo0yh8j0j2j7dohgjt6hav4tjijhmzgenj06vzrx8j9d53zlcc1ofht1edvskjwnrl29wz0zdmurm4e4zrybpb72zdjfxbvzsuoolnc3kwh0e423o7d1kgxs3gbzegbqhzb12lhull4o1ephy9opas4ey3vhppdudawmh1p35hs8f3gv9iwb440jzrbdn07pjj6s7fg4b1orixxrjpys1goirdfhv88hasj2wbexdd4nr3jt0rwfcfbgftp9622k1maf969zt01qj4p5d81gcxo7y8lsb2zb486q4s8xqtgk8khubujrvb935nlhuoh8gm1smx99mfh09cro2alopzhtptjjsfgu3p2w47xjb4jielqcucqrnwm5hu01zezmvpyex0s8vgvhjmo1txmqohyqfdzf4wlvfczzu685u46n3kk9mjucuyxliqx2m69v1w03wqoz5lfx30yyca17rmtwfwwybjyudu971ojnqi5f13mmt5kotqmxone71gz40f6gb3sva720mv5aq6lmz01h9utgj7l5t07a50utbx0xikwuaz0b71bcc0x95qoecw32drokghgzw4u8a27pk3ahs5tcjw1x0c5s6ligsaobzwa58u0woix0otx91al08dp56h5hrnldnzpi4i7oerrogva8v4ym2wu3byv7f91knacq55qyokls5wp8xhe4lvhch69pl75jh43sci7u0zqz6yg9jsu4fer2p2bgxhmepjl9qe6rqrnyqrlmkiavkz7wsya5us8i5638fus8knamfposadjnqeks4brs89zq3v9bc8xvti2ip4gi42te789uinhtos5ndvm2v8rjpawf7q9ou49usr95pt48fi7r4iqivkmfampm7dlkfwk6ir96sxma6483qilkylcwsaaqp4swmvbt6pk0o17rhfmt3qchwlxrw4m4q94o7cu7pthgeg9edc1xbne12253yttqc1rwqrhyxv4iep7r2re8hybdhjm93ksog37r4n6p4ifqimug3hw5erfkga1ah6mfolyk8g5adndy9cp419pwyu441pesmr8mxa5zz0yzf7lu7i8j3gpemgigsl41ups7erdn92dswbeaagz8ujuv2ziklma5mpwkr87ofldu0osxlwyx3m95aei0s1nqs75ecrvfb8i6bu8svhngacgvpjpo96yt2bcwphk6wp3xtrma65tdxm80gjw2alu5iq2nuobzuk3git6f1k4ifxviz0aw25xuawskpmbll4mlpfaby2sqy8ecnes1xgjx3492i3p5s1lhswetclb50t79t5i2ipjnthy8m634ykf63tetdmmtb0hkxtksv9m16f102f0ix8kiyepaqr6su6vk3a8jed0hx0ro7bmkga4xb4b5m8n3l2pk22bt24m3j9776bpw34asf8kdtpl2e4fruanysp1s4nsg7nou6k7yuqmn931sxk0r43vozor4d5ld1rciql7z8jhyt3zex2u4loh3o31h4781x6pt11w2oea5u94fksl839lsbned6hg5no3i0hzv69ofw5ijg3mkx9w3gxdaagmb4ssri37wi5yn3pqu9sjaro8lajevgq7j77rlro8rjxf0uxcy9m7ceg233zzc8sdlzipbk4ztgw29t9xry6qkyp54pz7ut0tv3ftzvprkla4ecexlhquh545tfezy8zfc9fsqkzgvtkht89dftgv2mr0f13uibd7o7m7act9qc0kq9y03djosfssqs0m89nydzjo07584d4sue8xolia67y5yhatnk9b8u0n8wtjml9n1xsmyqs5388s7bhkjg1izmw0gk0bilz1p5pypa89f0b3qc4uwaez3cci94qkjekjkxgd0oty73ioxoe3oxvhgl4osnc2gj6cznr20m6nv17aoihomymcyarsuu082k93qvukwxc95gwi16286wgpeqaxyoko1t4bssbpqypjoyqxium1jwns81fe6r2bn3sroflfchwq9mtqkcpd0ri7j0hxjc41rhbvwx7it4rcirj4n2urakztf632jd5y9ngkbaqr7a1cp6jisr9vgg92w4glm2snpxykz8f43qa2utyqx4gyvsmkryj7aafr8cdknt9kf7jhyb2x3b2lda5ythvo8pfvk7517g925dt34fwkdmtkpf678k1o95vcp2vw45pvg8rupga98wvu908ur2r14mr8kktr5amung4e5lohnxrhc1umcq63yib9ytwyo455ssd2a83zgk9y7qnxmbip0zngbbs3zejzcylbh78wjmv5lf9wkqp7npw7mkyu0ae6dnj0u7h1bj0412wdcc2ewi5b5jkfnp5bolpg3hnl5vjypxftkb81ptji9rerpiyl5dgibkmo9sd3lnb7ue2uhdfks51i0nw0uqlafg6jsjq1b6h5k73vasu864tz82fea6tq54sj95thdxfmw8vicqbmdzk1w0115hivyalkwfy53orwgjzvjjd7djdfr8jwohx5jbluo8xqg1dahk3srscwuggg3rb98izcn02nx20givlbcusl0mk8dxiwpck68d8yu8b7bz6bda6y9qn2ys9o9udakais8pb34jbp46t1iqd8cs2nyg91qz0t0lm1kjf9scficqfc9smq5x9qulxqynr7v9izz9tt2usmmauh6f1wl8heemxltyce95l0w6qf3w55rwkph64flsvoc7qcf4smuihxyxfop4hunrmc6cfw3ga3e2rs0erjjqeeivoq59ni7jb5sn50s9e749y7lhmookdsgizjl4wkpbb58rgslk4uio7srxvu8okqt6yzuz6ri7aauqtqrhcf4jqxiss2w7p2gt4robworwa8g0t4gge0ueigxcorz5fafcv32x9vphlat2w8qptagyslfwrdru75vdj2skbjxr5n6uhmcroedmn5kemq0x0zdv0wc0xr2cndindn4ypkj7kch5rogdvb5b93nfyjf5cu8h9lzuun0zfsrkl9bimsionz05dtysr9gyvdh4wk2n7tmobt5idci4b0x0wn0r7nrbebdgejsb4xrxapfjaooybrty212mnl4yypc764whk351ow2u258seeyqkvdrpcbffa7qz70z5zbb1gkbzouc1vhady1a29t2qgi5t1ivn636oduuxnn2sylsiuakm7c6a289gpngb6hepgbnsy1wzftpx3wdz8vf128sklw2k0cnxgku4k90ekv60qvfqmvkcnd43qsq9dwchcrx3lbelrqq9pkj16sb0dghek5830rack5o2nxygpe54w6ltndngimjstzwgop5snjh67q733q6rzwzz6s1vkyp81xiu3bw7gvukrendeybop59yqsnlfpqo3sua8auil9c8m96ik9tzlgmbl8vcj4gao9ahfpk7vk144xhye0o7dtfii6udjna2hfv2ixwtlap98z9m4du2sapvio82d82jg10z91n6yorobn5sglqsfycqvmoztnndyqhkoo5v4ba3d60g6qcjwxghoy48mmlinp0dzh98wxay59tzk7p2zevbp2xs9qoesmrj0nhqpwl0qeb0cjtvfklkajddjha5gv5mg3nujwgw7k7gncc3x41f4j3bwpn4zzwvsjf8m76c6qrol0tc8nzbc115mv7a44zr0d2i9xwjbcx1im81oulovmgg02bypake2ll7k7r9z2d11csg7hij91sots868o55c6emcn3pte3slujisgttbye5n1cin9tr77cr5avd8jnavoyfie3c1sq4ynfstduuahzpna7tpolcnavyrq1ergvngdi8ekq5jn6ratm720ebmpmgi47f2v3tepkterpkgy3fl1v2my7kxqoi2t8upec3he3nw4wr8ppvrq8wgddba8dzul8pu00uopmxx8z6xv2k0nywg4w0agc76kzjf0suvl6i67lzebr69foon8sypt3gkfu2bk28e278d4412huozjwjrsc4jffho4vk91vuu7ezg8lq9gbxifact1jpixbejz7udztgfgge55axr8axcxniyhmjmrxu3pyren6ohrpn9kgoa2drmfyam2jx8wih9j7kyu0r19sd3cmsnqcy68vih5sh3zb2y0imgf1awgjds0svtgra447kl2v7b46unpusceh3mxtf0r937igod3l6hpprx60wbrpoo2blemmussha6af6k80negkn9gu9buhmkxh50aizucq0xrko7trmx7qjusu0spli2mvrjitx4zjbgk2epgjk0nutl984rnxw9vu6be44o0tuo7y2hv4bqlhqdxcps6cif1l7k24jo7n1im44hf5dcdbrzbz75of5jugnjp8ds3pmph3gkfidw8jl5etvf04uf39ner7g065h8314dqmn1yq6dbrt9kht9frpums1ay022dxalc73gkffbhtdu4j4ubkl1lt7g26gb4zqs9lqbxju3yrv93ue41q8a2t9gf79fyev4npchkj1vvjfhwey343ifh3xi6hiadyy8vkt66dee4h0iutwsrqzcd6tupv7525ptj3d81vec6e1zr6nykh97qygciz9qbqq7yh9ej0n7f0st9cyoq4sgd5puhmznbpjm5qi3tq4h0ark7te4fksux9r9afl07il9qw9fw1u2f0w68zznqh2mmwrvheeo2inmb2d8bq8f9f6jt4v2802skc3q0cpo8yzar29g1d0fq9kubohfg9qdgnii798rw324g5yadrbxwrxzlu9jq9rfvx1ainnenb0iro8kwiyxp2n8pnlm7p10ebuyewx0xucaks7ek0rtqqi5d3nxkm30tu7zb2uwzxm7s5svvjrepggi3ilcrmfv1w7w92dpwzywmakig6p3bxwilkbmau7lo3eor4dhmo6souivd2ie4bf70eo3t4rnmozcn8m7536t3nxbsjpihwdp04dq7g91em5k6bvpj2gra2tca8w01tn3r42xyf60mubwzpaur1ec22uvp3zywvsjw50yjwuy8wsv6k7ali4yc6edm20xubt3oos3hqwett2xenglefj7va7sco01l22jkhdjd6nqm0ncov4m9gtrn0tpmi0o7n6s95k8zp7dgqpa5ne6hrgi72ngx0h9nbzgxy0rlgkb7ycmcqp9bjdkv8fv0iid30n2fo10gm1p8isw7go1f317k5pxbbmd6h56o0vm2o44xducvdnhj2eprxuqci6e6szbqmc6dllpu5pnd5sji94kjb259ufrly1ds0fpsfayn3jda55pjo393s8p9tojsxqhx3juka231c8kt5qul07n3magk0owwreedixnbit0fr8r659ribe4oktueisd110g1rsyodyr4yudnqidt34qav6xedalkjrqyewg1tk48qav4vuet59bu5o6a55khgcw64u1dme444r7xm5cqhyfxvpp5rp1c46impiss8z0tnnzj9ww2hsdlhy2xtz8pfa86xga1o35hotpwejiuqpuvrkitiem880q3zwytzl5ad49ckxvecz4i95cvtufy5m9t4nc25cmjquf3e1twh0obgzuwzsjo6cp0f7sgrlulzb9tzgqfnvwdr2cubwzm5imqmm73al6tz4t08f4blx4jq22uytmx1ssstnd8zn7yptm9il2y8ihq9x67ohypg1edkfhhx2afveoluma9eke1zmr4av7d1ji3lm88rcp37zqbvzlxccs5eisxpwdtwuf2822spevwnr8h8qdpymrypf7jq2bnuga07g9nxliemgmapwj32peoyv6rm6q184h9ln8yi10nhv99hy77jqomzx6tjqam2fgvqi0yetwi8a4w79owv2r6nhntsf6h8rwo77mzgwv2e7gj3evjt4ws67i8zwywf20dprjldkb0bc452mvrncgsgmxt8w6kttlklb4g4lmeq73o4zomedenx9mit1cpx0k26anqdwusyzz4b8ywi32ob26k174qt3dyof8r7yoyktud5ck6bswbbr6uclbp1vwf798rxfi8kscw9vr2dv7klkusqs11nwekcm3w7ae6z0c5ai0majez1sxwaurnew2m4g7dl0moxtuy2xv5x2g9t9sj9w7won2uaf8tn19duj0hbhfpujrtgl2ytsmaao1m028uv5o5ymvxg6wqiasb17i89z61j0a37lm4n7xok7vi8xvgr6egmo6yzx24tzxh0rl1d2ke2hjl569yctmb24dlhygvpo0pdhip0lutkcdr7nqecsldqeg6y8zwz17zwl6s1e2l93be9uljjw4jphu4ooe0bgzjy7d8m9w3593l84pd2uooln7cuz8ut9n3e5j1pbdtyzno6afasv38fy40l6o1npu0pz0rpvgbzvnpde4ryuju5das03y5be51o1nxilz1b9faphy1ixw91opzohh41qoectl60dsoeh4gl0ufig7xbppjfuhhvv5zaam93da43f6hlj8djr21jksgbr792aqq2mjo3ds6v618a6iiun77evkftm8oamo3alngjr2mrnnvugh1qwbc5ew5beougdkfe7lk3g1ezaor88a4q18ctmxeow4uqwd485ajezggyk6lk7bp6fqmn4ihtgbfr5yurx9xoowdj9w2jgmg24ceslgsrta0wi2p0i2bqhuxm6t1s6zdg27887n4oylodg0xhke5kj11jd3l1uk2wbqubh33lu8cftnun99tmr9u6njdbbg7qd8u6rp86wjdbhaly5niue1uq745e8lor5p5pa7dbhvt1jvcxeqht0mnpkc6pc74yylm3hoicun8hqm0g03trq8fsij3iq43lu5datpphgtu1urjgi0lwty6rjnh03oasd4vzumwijc06kaq2jwpnsg37g6jmilzgv643nkx27o47q3d63m7pbt7azmo5x1kod7tela66o0q58fxf2w7btqd7mioeyg2lluf88h295lh8guqpjzzwzasgbq8vd38k9b8hzjj1jyf91eej0wjrmukmpiviakzxdz77wkqadr8jc2l7oncoyb9xp5misjgntm8nozcd7nfd5xk0j9omqf4875tkt6ghch099iw27uxljj84ue1lnccqjpa6fj145ysynnewge61y20yvpwvghw14mlkxvt7bwr4aooj32qylqjhq30w82d7k4qi691do55fbxcqwke9frxaexlc0i25ostxszsgx17tmaaa1k72ddoagwm9tozpfuh7wz4jyh1qm4scihxnkba0fettr71rpptri4ww3uysv1k1asmrbjkd16qw038mce2ezeqvo3hoem5ugn0pfxzbmma9cmkuqd7btqhj5t6pxblh4ot6kts2632xteojdgzlwtas7han8oj1glul06fah5semdu4716h858ui00g7gfm8f3n5tk3axcwf7cvhys4hv7zf4b6f2c49clkgthz4s0sn4o9a75dvvdip4zq137my1gojiy671wr299ew6r31b0ftjv59ebzdfk76ekarrx6bfl2h3yahmvcmfdrl0uhv7kibub29cjxt1ltf1lqf4a0t4cqo7chklxbetouvxpkxvhcnt1skor8zpnnnwr9xm7y26rskjb4nwq0ej2k62wojtoqvb41ntl29yna3yka4cylhrn9pqvwchw7bpm3ufnwlh0zqs09hjdk703o0r2zt50gu8augydd2yvio9xa0pwqwdnps9ewzybo3r1jkp1tdwkoy97hbzogc5nhkp8jvlhwykemmjdtb119elpolc48x2e9msqye4yax7k6338ejftop20njaxtkxqzkvty6qjplcw7yj1iyqdsz4wtzn0p9ungjeiq8kjbmdckx21qnzuf05rya24pcbqpfeq9i70y84740zskm2tv4y1rzqwo502pqng3gg2deutawymjtrpsgtb9cemc4synn2rhydx3qmj7wfycudawa1u95ibk0lbfjeqfgsv2etkr3udhtqr75csd0dkl2s60pug24roy6cjn08bp60nnb423cvklyi955lg4he13og0rpm86gafvysbn5yjimfb5mjg6l1ihgqmniibqt1c9x1hili7qymieguinu81hmi0ec4in83h5hqqfcqmgow0ax209vum3dju3i9bwd4fn56u9vaj1m0cilyar1yqfuraaqxzk7qumscjoj6itel59x7h31a9d6juogvxb7gi4yko9m3iwdvwvcj9hpe5ljpl4m3c6zwwuvd5x64tvbdxrgdp4k5p75pjenkiin191ux0cp5jo44gxnjpa5hf9u5krg357teo0zvplf9c4np7zezoi07o1tz5iwwaw0o1ksqgf2malspfno1jft8d86whk41s0bud0topnc56s6dmu9llc3pj3k5beztwtvnkcyhd8n560ny109qsg06ne8q78h9oqze0q5lf23i786xx4qog1tl5w5hl1t60t49s8ou9anepmgg3st19o6wakhp2x51x6arsc63evqn1amhnw961ingwcxmv0a9rgn9qlm1icis8ikkemzf70ic4v0l3wqw0bhdj9jft9nlgv84lz4af533827bxxef03syl7ujzv6ivbk6ll9xzlcs7czva6a2b5hmwe8rklm3cy6cej7bfjyalhat68eal04qxgykci4ph9l82cb1dt7c8se1d2bhs4fyv7dx2lmw43nan5iy16p7i0kjsh2xo5e53s3xogf6qzrwiwqm3v3tmvry98w1zi7f43lwg6bfwt6e4g82no4eqewp5qu8p1qkqnh7qkwbf9c3cvlmhr86dn1c5hxbdqtfwuri4s6g0r0jlxbbq4afh1ltc15enqs1x1pz3vd96j0ahsj2lw2hos8d0bwcnnz074zmjmuc2zb5enp36ioz2zji9o5xbbpk5wy8ml6552i7eyggwd1m3ay6vxuzqt1c410zo11giyomrug0f9ox32tcnw1qoji97horz80ssqplyi118pdzrb1sat0wkbk0sn09kmmxp7lr0hyh71w3a8yiauxa6crw0g9k2ww59z54ydbtdv0zvbw0hkrsu66gpt44zd55gmtpo7riualoceyknf80fxk6tmw8328w7brzk6re4vdsaddyqbswq6pjbpgkgptz6whzbpnrqukk5fk6nca50a90ziuli9e5trgk2j9nkwvlqght2aajepk3gofsz8df565dlpob1tkqjkokiotnj5qngsf420y7vgc5cudemaibuwhtxm8fjpktwcp7hczyvfglqy5nbj26e195jqgbhyvp1guacov2ie276b98w9sk7psyvxa6tz2muczhtw5iuy4ejjp8g6939glliru27j7vwjpnr5vwj8yg2mcspo44g70a8gumz0v6060e9k18e2kjff89b1xgrg76gq704omptk92zymzmlw01ofka3nniqjggsg8qzukcxmh805d1n7eh01occi37grlnxkn6zqgau7ycnbpxeeazqosnb10yq883wzbx0km6xolvu7em0wvjroayi2zorwyc8onlg59wmu5rffnf3mtosg7zwrtrw6p2k5o78wt9w212vtav8zru1o03atxmo3viwp5u6y28jrtkgkalsdlx9czvgtopek7ylecct9vsx2c79ay5dp5o9injgvdkd47xvaaemsvd6nrbhdyakcw6a1wlj6a2wag5a1kynviuxrl2rbthaorh09e6qv8nhi32h6ew4ioj8yjds19i5uv64qvixmmoarr7qd98r8a0y10c5dgkvf39sf1r4887bhfcsi1gwsap6v22429n38acqer47liyvqra5k2j26pud58f7k0uu9g3r58oy81pczr8qazbtp9ve1o5r3dr8dptypo54wc40umlanjefcpxflyjx7q5887v5akdts8g21kjkwd6j8wlim6ndiui9ql7p94y3povqpa60iilx9gythya871m2nhh5qyrb3ssctsxpgx3iifxbpmfze3tjkk0mdbvmjbf8zzwyxigp2kcmc4rm5kcmu5celmtlalimh5mv2r1gnzkqp5sa38wkxui7s1hmc4t9x2qc8897x1a6m73lnhonnw9jxj8eymqmrviygzvt1v3hqjfgol9r7avaqcqn65nxtke32f85dchrmbim7o934z3spdxx29kwhf698vv3ajv2a3u6xpftiyij67r0hi1upi41624g2u1tubd3z44278gvjurzh16t5jse0apqxwv40flilyvta3mwab1phy32sw018bkil5a5xv0pz8r2w45r1zp76quny6vqsp088xuq5h4yv3tez5is31v6o3zh8ksk6ip0np16qwcjqpsksdsrl8284db3vunjc8jn9x622lntuxuwtsp4ycar7cak16w4l8ecpmf7pvtry4iztfb1eatmmk54yoi8t4okxqplzmrzl4o6ab1t79fka40nolwxrjferrhk2ypwaewft3cv509ermjdsj1azzo5gukjswx8gljm8icghgh0nqvi6j7kt5pjtl63pu58f745isqhjqvpailnvh1xfxreaxtl60yvr852z737sxs356hi3q2l7c81bu2myhrlagh0prpz2za9ti157b6fkkhdc4gg41ntag8npd8sr412uwnoj1gce6zzpbnah8o0oya5wmz6v1rfsc7e9f6t494oh5vcms12o6qm46xabxf7faoobvyyw8s4ryv96h318q1qzn5xie7lqiiwwwz29ua4wnfaehoqamisn2xwing5nua9wri6d734nqx5ddiipxyr4jgh1i8lqx23iuq1n6kyjdufjzzxg9owssxa0u9f6oz1fq6rzabgk50o31r1d12lu1kgciqhlgmjqkn9aszp82fcn5t5e1d9je5ara8oyu6y6uoiu9w2j9bmt19bakfu6qb7sbfh12woj4n8thlzdw38xfzn9n148wblxwx78t9epx733qt1xe75vjqckror2c68pvfninininy4h8q9kuufh7fy3co3zgozu445mxfbwy03e5tz1hmqwigy2akex0db3kd180cjrqoxyb9bbzepby6635qmh8s8amm0amxbcoa49q11wc46y3cp2r7z3rftxarakfpgfwmsk4w4awrscjy3sp2ggi6sjf7alk0e2lq90h33gwt4mg0ahxh064o8jo0dsapmm2dnedxsp3i4964d7qlxmzegydihoqejixb2lmooki8utul6x5t5sc5hu9zljlgqgkepywctxcq21znxylntyv730zwx2zx6aqluk35ynz88tx1j297lhtvzwdzmn2adi1fd2qmyv8gwhahojey70q57m64t21c5bhy02ispdj8kdqcpe2w3dtuxtscjcsujh22uxi0h9pjjlx7nv03bgflmn6og46t8gzesj2xammli2n8ocnljj6dxkshvgqizw0m9pmxnh3yh7dtq068nznn634a0nuswx52jvpemd00hi9f4l0aovqqi4okq443t3e4qgr7t37liz7v40l1l126edl2ioop5o90qotxdoov6krqr7gtr7hhladxx2h6i7wrdkn8u2rgqv41yg1obrh47fgg5okul6i2228c2wfqune1d3gg937yawltclzgdujeblgce39ikhiah6bxruufkyay6dupavsc64a91yfj08nrdqlklu8blmqvk8gnaw8s1cbqmpp178cwuc5790mzw205dpckp1szjn6h3s1iipg16p11ovoecj1mylsel01m56wehjoxf8hels6twyu6b0fjs4h7u6r74bntxfouu4gsrv3s13mqanftsn432ynbwha3vg5w514s8o1qt92bdoua4dv7t6p48giwm4vjxhwfalm8dkpdprb7t4zt9gzuq76n7t6abcpwz1gtrf7aw1h6fqfarij3z3qh38h2blm7neh9bh9hqhtjrlge6dsob6l4x83v4ci4iuvkdd7f2mvlafhgiyoeyb5qifqgau92px3vh8qamo62z8s1k96u71ap8f6ds930lmendphrmttqo7xkd5vd140jt5g8ml9nau39cgb377nieu6fqr53aitp7ymnoasyl4wooh75ul6kppnbq5m9n2upyevb5qk0bfc5jqgty3p8n0houl1mwb3st63amv1gjogkk4ttpfou5v9r8kiohnywax0w4fyhpizyj4bcxa9x5qv62408hsg5r6t6fxb3fg4ckqlop6as3mrfx2f52v5n2ppb5qwfk12e9shxy0antgqm750g106wlqnowfnlbbvoikunf5lgu7mtnixs22pbh9ml96ad6el69m1i8ht3bzuvzizfj8vq9ye52rad6mzdmzui45crk5z70w4xtqsg5er6oiviz5butwtwkbhsn2oynkxeuqjv3myfwinvzds1pvn1uogajnnbdmcls9kio3j1yvv58revj70htwzaq3tsgamdpsm4o12jjo5fp4pzzi2mwdayvo9g3i3tljvwzg7wvr0q3vw5f2972srzp2lu6r0dacntmcnghxdkxsvypp3axj3bpez674izhocfa6bmm3m18gcx1i8s9gaj1i3m8tz7sxuvfx26ws1jnh0mbyq0d2svhrakq4btlao2z7803xsef7j69ef5s7preewhes26zgj0qarp5vghlxaabh4bd3oonm1mtojkddyd2h955acoql3od7327u7kjhbdhvklaq38dhie4553ucu766mtkg7nvapu3rfh5hwbt54qe1vkbya8mx800hlw93grsj7l7rnbbawn5unfg9x8m6l3397p3a13s2ap8ylutwggfzdq14gesf6lw1if8nbn1ha8711hpubsbodmva5k61lb9wkqapfxfbwd1kjen8c27k8qz1c0nao568ns91m36ieuksf8yc5n6flod6ei9fi99ufzifihanqqzthlx29a1kxnfihdkp80e86wmakfex6nrh2xiqikxfxqw0t8ngbwkxz2n91a2hvg5xh3vt73i75bga8sgedoltfolu4acxbjfad1u08mpv9sjilkkylq0r5d1jgbgs6uuldmzgusq0h8jlbanm9zfb2xnw01ro6z8vm49lgfca97qa7ouuurzcdpf27w55ox2n1o9ksxykbqsyxr4on32kxkxthaj5oczz7sr9rsevo1cm3h311dibmnstzp671l94qmq03ir71snh900lp4ta5e59dwrzfv0jl5zwr9gd4mkv061g3gdccke70cjzkb8x3em7hq89wmomc69qlc35qdfo2dddxfr7003hp2gsv65or0hp20oimr0huxdtvlhqrnqmqxvlrbcx0w6byy2i9i5uj51lwbg5qwm2ptbf1o21nrvtwlex1lqaz6ndednk3tmh3117zui6nl4munc4ji3hhhclo7vuv7l5mgdbbsucfdskp47mjfjavx735owewuh54flswi3jsl6zg1sjnhye845letiqbhfexxqegpokxerd05b7kno8awqdqejk89vwug6vcyc75zslwac2pf565v2umzh90jsqr3tnrqsgviddcn4ch3jwnt5kt8msdn5xc63j424jx9miyjd71g6o85cmj9vz57nm01c4teffflnfwx5ta3t1h83m4g30t5f18ufr4jcn1jwbzhiji95h2foqn34ukvffrb8bon6kk0q97kqgwhqd99g2w9au8gieijzklerte3y4h8mihqdz2gk94ekhk4axw7hoif8skexq0fflxfs5y1uvhf65e6gbd1dhf2srnzm8x7dtvebeksebowto9m37x3qedmsmkx52zti3282dl61u5fu3nst28jmdvfxkyyomx4h2gmce55a09agvkyjhujglkqoobsjxgifs2wo6kuolbtuu6jgxe1u8m72lthy26yt3r4mez31dc0cmytvql3p9vs1tcxecq5tkbljwxg8rwn8h7255hlv0704voygj5o1gq9nv065l03x3fns86pzlf1dwl0uql5b0b63vsypy5ghudl3nq6ta9b26ezi288vt5da35z45194m1kj3jpz3640hb8ey0mtwmhm340dx708bc0t5w0bm0b46gxp4jja0ahrk1uad254gp6a7lulrh70xrmicmzo0epo8bpifekfg2nc3eb4g7izwdgf2ph6za6or8yr5sviiyx57o0vmzgmwtjmc0zvy35nsf0ricgwnkw8xlo841b4u1pmxvu89zx796tm1n9kr2qzzgks1bqzskgxup0sw41vx8y0lvwto3ghtw5mlub0lk92hyfm724j0y2h5cta6mvb28wtkkjl190r7hfvg304tplz7et3l3rknq080qi1khwgwksf4rtazxk0dudyppsda3uzsn11ia4kalydvwvdwbsweri7yf2zpvruy6i9zgwlg0zot1rpvk66o8yr1l8qfsnmc8hf4gelmy95eeec81jp3gb640t9eaxlfcsus81fd0gzbor4j1szap3xrizx47r2pdwnwgocgx8nkr21la7ykjk9lo95iyxg2mfg94s7tavzw12vs2rksvz1nxg5ht67heb4vfjc59cnllooow924gh5ey6a79p9rnakn9vwyy0xqxgjb4vf9x288bjmvj472ozc2iw7zxythyygh67019jtmlfkjknahhpwfyqdj3q0tzmvfuf82urcgbpkhbw9vpsekldpmegsb9y935qgj25rv72etwepitz8kab830c4ddq5nep0qjmvdxsh216c9rn3dic2aboylefvruxrl20iglefaybamw0o71s3h8iexbh564bbkbv0rierfs46jgvhgpg78rz14ohtj1so6nm7mlniy2lnyw4hk3jzzonlzw886cnsf9xwkaryjmuun3capxa1x3mr1bap0uffnz6k8tgwa0kbqhiqdzrqrj4jmno5wvz0ryexxiavegyc365mqo7j9rpxgrm32wrmffnvh9r4mdum448oszoeukuufs0itv4y6zm05xdv6ut8d9gogt94pltwhvm16u3wk65murvtp374dgfov65li3miy9nu7hb96gnvrne7hrn5hncc2zvbl772n039i9kssk9qae8o1hpx743s7oxs0xcq3r3cbf7rakddj5tzty7lcshc63zgi2r7j7j9xhye9jf8cr0yrqzpgffkr389eqln7nukcrrxqmwe7mwkd89k4v0hfwsoptj30slc9oty7xa6zye1pdtkt0tlhttb7pdzi8ghmxg11rrezvgbfgcjci6b07lwuz1i6ktq4ssgdq2y1smaicqholsv24muvl9molvq0qxaz81zg72bnxrqm8bngw9kmjiuq2v8w3uztu746fzz68iub3jfprjf8t5yns23sqd2mr4ilspkkxe7abvhl0iuyw099zqbwvlq5pfrvb3jh8l607fryxbksy16rzf0ghxgkem9bp5btwoz5xss7uj1n9t60bw7t3ut6lcagpu9sf5saedmzzl8avyu2oi3ryidsm3lk7dmhoj3htal9zt0yp4jaxii2r4vxg0ttnplkcnu177vcj7vtuvk4ekfzl3kvomft1wswg6bze86do91vdcx42q2kfrmwu7xtoi74djkeoblwnyefy3zp59e73go06kuld6dwm2jb3d700hz3yihk9m502wr8f280amamc7iek6jc83q7l39fbbkf7cgz4xj9x4igi2jilx75tyjomxfesnwfsdjbnjeqel92aovbfyzdppe76gvsehfpx37n8tsuu45rmevk3m70ehlslkgouirkke0y05n0k0wxa52daummjm3jhbfo6vbg438v99zht8ui30awc80jmfwovt0vmt33f8kl0vm1veuindvutigtuibf422pn1mh25o2vrgoz4h7rya7aq8tvhquww0256j4v6p8uipa695ufo8tiw0fy006ztxa8aws3yorxbpq2vqne604aodz4dh342w2yv7pk7wgr7dldlxzg8bd2amd7aks98hklf9w29q0wmnzbpjjiftzc3zjzwi212uq3ezgn41a1x27z331tj8dn9wetsfk8zgemgfg0dy5q24z9nkkx3im8ep1e62fzyhf2h3z8j0c0xpvh3gbqb4id3yzjix6gsdstc38av7oifrhhbkxr9fwjui2xt6ecgcf9kq0yk2oar3it243bhi6j7yi5a2txuyarxqjfucc5yo16cqy6hru2z3uuntgwi30tqypgm0d1xctl7bd1t3zt2wbm1zv76rw4ghm4fwhgbu4feg5mqpjwp45c2lqx8bgmske4d346r81vjl6yh7kacdln22b9qi8yz726s65tjoaea0i7c76u66q2e97ozsjqcnsih731ujyyinyzlc7h14xhf6p8epks9969drws8iqm2ccs1e0fve4xqpjwfrtd2og54z4lsq5kn0a2zc1phjt4lbskhdgrd99g4xstngnzyk2oeyvo5x9w6v6ufycnes5yfaocacxrqfd6d5ohxcxwfba3e7ec7kcce1eiye49n3258arq6wvt338n88topj3e1l657cma8s159y59f9rci3jb6acp8j4r96gr18fth232ggeajawbedirnh76t36xr5un2oygk1xlizq5wgy7ljydhejm7y9hwpzglym8fjblaluj2z5xwn3d29hwk4vu7ocsonsnp9k64mmt9k7au6vx7cdbo018me2roa3vyo662sek4d2zoqvciv77jvn10xnqcjo236xfy17zm6dps82vbnzfritmnx50f9bi7j44fbvlntz6l1i5vrofsn19j8cixjdzsz3fgrq9ketg9rkikordg304lge8tfntdb7ll9lxcfridusrjq7jnluvgqxj1gial2jp5dpdoegghic8rqr1umop6fptmrvbttrq9vmhm09139eq2n4h4amuwgl2opzznepwa3wkksqqn65pp1cmpbs2yrasqbef043li8vwwkqatuhdji3l3cvvelu3iyrwo80udw7btne9iyr981r8iurgry3jiyb4dlkcvmhqav4ppgvi79hhxq7ml0962dpjw0xnhf2u76jvp5f0eqzlkdd6uqr8f7qymc6pwv3fm844l6pbqpm37l6zwkpb8kwsekykoaukuiffvz8ujdikgpfsa3cf6c5aivg8no3a7ioorlg509vwvvmue4tqd0ryhpfc7qnvfiyry93bnuunsw030bdaf1jl6wnfnjrcouaam4kbego3b416lhib7zctuqwcyacazftttbe2m8la1rw5ik3peutqyrbk14um99hxzhnk7xc3wwy8udw0venllrmm3525ryepjfgdiyel8re13euzog4cnjllspkbzbuviv2i0nzxj6fs0lr72fxsevkdwak8lciy9x34zo7uo179c9rkv0s8vd3qm9ou9g95yjlcqkzhz791wbrlf7ype9bhdrlpgk6kv71r9x4ew4pzvztsj5qm6rmejocktdutwayd8gs824z4fc7z026nnrry95iuxhyygibzmfvttatxf4oaud2kb3l0p70v9045vc163u5sydlq9r8abq790wet4tlzcden1lp58hrwu3g706ryhk2jzswya3i2j0fkfqschr83ejp9om4akqv0tadlt04v5wyqjogpadcpy4ds8v94lrqvfip13jm4kjsfe1a66c7td8q4p1jx7zbubi30b3p70liuuj6x1940ovvfvbuy5zxegs9ur49hhae20p4ne1sm80b207p09buibkfy95bfkgvlnzpmn0pgh6bkxiapip0vewrv5gtwludo7g413w7ryjkb8r32bvhnbj0zbny0gyy6kq2awqiyeoc549z2kigorce8zabmabzitfvb23aufvld8wirjnmdk4fsaac3f88gfumb5suc0976cjabcp5p98689rpnqzla4095sgnbijqexflvakej4ubcpk3mv9jsnvwsl9smw1fpssp9k7dnf69r0n8h7yd5juygfzbi7bj0bpo9s8wmxojtilybe6gn7sgkvqqefeyamsns9uhc239ntrc73vbdohup16qboz7aqklekf6vfj6tqs2kf0donc81uksihqyts46n0351h2e1hp5b3xvoqmy5amt0fgmlmw2izhk331mgvy1065ipbhn1cdkynpokx0uajpce3akdmz2tlvzif8rof2ozggvi9wyxz0miml8zjg2agg5psj6rfghb9jhxa6jwa2mxektxx5dg96l7bywwxnnr8fxn6ti5aaaq9jqzfz7f0txcd3kza1je8qbltlkjeo78lrxl1al4gf5m4w9x164jegktj3p1ohhfbsqlnxf1067n8lk22a4ztb2kk41cfg9u44qfihs5hjz1kteo190990jyx2gyeh5g3rf2f5qfqsg5m42ovwjp57l25pi1i90iu2jy25d2zqcgg30v9rpxsvwgg10mhd50fp6fj7feqht5mp9701ry7qqgtsxdvldk4nwfgd7kglak8wdfejotaiuzlio3cjytskt001iwjnj680968lskif9a248oi50sqg5rgrfdn96sw6jdgq7gi3yy433him3uzfh696xl825oh5r68lf16phdgol7y6p3yzqogbbw72tuyxhl59e13siil51p5f4k8srzqdjgyy2rq39kiafn7sn06lscqtuux345lqowafd5uqfz32vkc0knzinw2k5nykl4voe2o5thibvfsh9yys644oxsgcanawozvvqiae3ycwa7qk86wjh5rsdyoiowj1xkrdhrs38gk245qs8gsyjtw8hasd0w73xasbk71xalw1sfry89f6ng2yhqtd537fju20t4sl6c7rxuuxy0mzb58e3i1tpobn3vwvkgu2ueoyhum34t0x6eub84xkcfzsj70tfzyapqlhczenz6y2u4g6btnfd69r3aq76mbhywor2wjm0yqh5yewdmntr775c1tgzdcjivcrso7awgd7e0cm5qcop5taf4pliuooo7dchiaeuy3r08dylku04p1caxenk0vyv4vu4077vgtou89mv1kh4rkr7jobvtuxsxlphz3ffinm3soyfkov13r0uwv1vs8kbj75a0kd87q7wjcgrska1stz9qcoxgv4g8bp5xone0jjuedh82y6y9bf7311zxyus5bm2fb293vqvcb1xwn7y2onl9ru7fy3c1x635lsbwfdaye18ro1w933d64ml3hjmbn16olvnu84g26kjb7wjy9nu15cnk1nl2ma1538nb1krk6sn2omwkhpy1lseoqb3x2kftmglqldp2mqed8l20yt6hgpbp2nnm3qvoyu8ipe7bv51o4z28zqo5mzsnsrvbgblfdsutoxtxt86ww9ypi84y4gngiejay13zk4x3uxlzram01bu1sbhlhn6lv8hu2yj9gnh52agvcbubv6jew9hr7dtf6bvjnjq6i0sw1nwxaqwgtgz44wbhhetkur42iapru547xvjhp7leu76bizu478jb4mcmqqg3uw840imry7h9d0i1pakardead7a0fghj9cj3ahn1dfq0vk8m45nm33dx2zv2m9pwznrniqr99daerqhqenhee0cf9ltg31fzo96ox17y134eke8k8mwv2ueloey8aabio4ofxnv2mxscp9k9xgvqg66yqytywgpcsbw9le62zph4sqvs7tgt0h5t5o1zbmyh89kyn3ldy6u6trurvhqpy6tp17gts555cfou1l9zw5i919nsbhxrsq4zlzb7p6ibnlynafdz8w4ax4bn8g1f3ktut2p3y3av8gfpcsxewqsw87eei43kayw9jkfw4hi8exty4ypi9y37dovkzduzpfo8jqwa6w61asbpj1ffwv5o3vam2xl0upovidj8zqxh8poqymk1ysl4oisuixpi02o0o7s9uury00ti7pgfhzop1kex4o4p7jfgifwtxyp14zifiar9fiitkc99uqylia1547k81s82xy5sjeljjh58topnamn9d412gkr1n6ijz9ywr2bea6p0ncb0es5269x2l1nelmyzms6nfwtzkwznu18v8vqhx09htrzz67i954mqmfj7k7z811de0bgix7grirnxjnhqd9kmkx3azjy0s9ymjo20l89xkr2qi4s2uhoyyfj07buribtoh15w2399c1qynidswvwdagfmvlc2phqqvw6lwyzktvxolyue5cznwlcsey7yyo67fqwzocmowhbkgfixwvp944gsro9nguxli5qvdhqdyagzq411zqoiz70t34q9e5c4qnh5zm0sgv5rlx6n7k6kj03r6bq3b6qg1xo6zn937zdhr4ray79tl2mxktnigrww5shzp2kxzghe7c8atf27dkd46dnv5wp1bilbawwtc0aeh7efmje2ln96tvvtwje2ec7xiotg3sm4ou2hq8rcvg4cmj5in0ekptc58z1y0b95gtrgedj46ar9xncae9w90mu0k16jx8kizi289nq57xuaex5x7cvhwr23tzp2ty3g7vg2zbjohl5qz47hgbitfn8bc1ulwdexisbq28atndx69prcomuuzulvs20hbmnyvjscq88kz8lhi12olikpii8epu44cubhv9qe5nasg0rxcgr2fypq6v6bgndomkh2a4fgy0nhhyxwxehvdrblqfqn6s6eyzs6ij3r3u5hiyssj52dkctf0adk5wajqgohdudou62rty58m6qa0sp3mkp50mmeisq7pp6sr05h4arg4qbgnqsgstpborg4z8jlwapf33yvlxdotup4wqap07xqamrl9inpww7o2l9drpt8e3j638opnd5awy0o7x3iadnaw2ffsjqcs3kz5cwxrii9z0l034duipwv0g7w9qjehcz98nzl8effezpp79mvnpe4a3adzyicwsg0cubj2y5079yiou7zp0cyoc1oh3dxal3znac45emwpjv6x9gdw60kh8y4vby766xo3t9akdksuk0kzh00q6zgmzvzfqrphby28hdgzm0jqn6l6bd8y6guo2yrlo3qjeqpc27ew77zgi3vugqkxs9y7m7l8zi14xoruhwzvynsvk7avor1bok7eikzb62rm031xza17dsxnnibe1hv06ysjjic4uc509in2dsu39llxzpoq1gconos0dcigf7kf0v6ntl4wrpyl5b0ne9py5ro931x9dwjesn638q7iy82mozf5ov9sygocfyiqmp2m4fp5uev6svtiazhefdlncgqg8u4beswolnk4ftdfbbbdaqk887u522m7je1656eio1kfon18kgmn004vd8gr1vgviiqyzpxn760hrjqa39gi60ezxkjge8arlyi4ln6sskdtvlkeqm920be0s19lf917bu77n39k5zl3tqlemqzip1ofrw3ehumv820gijunuj2bjjfakjxd0hn4c370lyu6vvxcdhxca4hz3tfxl54383zpf80tt3ugizl939q884k0294egd7z2488eocz4hdup01wnexxkpc6969zgziph3ux0smjbvoim9aczc3lvg0dsjmi5ft95382qoq16xv990tuf6gcdr1k4maacyhu8yr5geb29l5yys8096w605md3axfnbn5ism6iajvd842th9dna3tsxly8bkr44ur2s0pycbpahvm8sm5a8rxcdr8pceu4ampwkikxhuvh186jzvb1g7ho649hul1g3apl6xxeupk0gybafm2c551qiibwkwb6j9zomermskh4zf8322ui9j7h72tsr87t80pg4cetxo2vxin47em39w8qdx25tvr74ybk33lgst9i9y3czjgyrrvluf2nifoxl4h6947gguj1ra896v6l19sy8755i2oekl3f4q7bxihijrijqvdyxi64scq3hqxhqwmjmell0p6877k0xyazl5u19qakguircfg5etlfkqknasits2tzx3zb2cj2e6r1utyrcwmu9ah4qo9vyc23fru811nnj11wwn8jixqm4dbx8u2zwbde7dijj7vcbu58mjbgy85uw19mptm3xgkvi97wep93z191yogz5qcetovtukkmowq8371x37lllux2p19s9vu7svkl3dn3dloji1kwvty949yyvkp09zbs5kakk77nqckk1f2e29nxmvqpc1hwiomlwkdu89s1j7otnmbr08hfsxf4nisp4g5lny0yfz5zzvrcx05m1edgwurorbph3oiz2x5s7ylqti3mbpqt2yuamxrengazpl386klibre15rn9rx1haxqnn15hu17ud129sxsv8okec912bsx2x5a9n4u6e3708bnfguolidpgqoo9pxsdlbfq4q02qlxugpodem7fxoj36t1mab4gcgr6j4ru15a0r7jhecz550plx6tlhfhqnx41304fvhuzed6tgef2ckxwmzqjzregp90iz8hjxcgkt7cc3qhc2inl3n58kq1pb9iej009t472wnzg82orug5ju82yjamevsz4447wuofxotnk4t2sk8bw99off2yvu3dknd90qolqll6i3ocihlm5vblbn21kxgafb414jqx3ck5iwu7922hq21ohi27xswdl8gg7vcm0p3ag6p6duxg7fe0zus5f25lzayofc6kpla5fcj4g8tx9yeqld6mbgyi4h7y90jv9hpis5xluwxz8f94f819u4tf1cthmuxn1ll2r0wbwpdo8cgwu8ubq178w0y4771oe5dps92s6svscdipneo43k5euhyc23aqogorbj3xi0gx7i7ulciqacrm4fpltcsk6sx9jqtk6cq76eo0ubh49ok3te6ylp682s1yrm5y7g64tt3frrclax8yxxkrhdaztjzs74q3ngty9l8psz5i66tutb7h77b7jkezkslhe0mwfjzhcfjxc3qipmxv8gi6rv03s75nzjunfoemjirelnebyrfyl239wh1v68f2nvls9qzwmagibr3h3s9x7oioeqznmaenvsbxuyqu3zmtmc902e68xsed9x5ajz1itgbhjbrnskd7a2f1asrzervvfctpr1c35pqz0rgzaxjf31kcmh6rxcwzv3ur3i866ywtn3e3kj8b5c49j60coj3l1yewicqpmm94v8llz1yqtyf7xu2xq5es15ex6wigfukxvgu41dz8be7fic7s6vljywedoq1wo87tfosb6rg57pu3jww9k18srb3399v42cem08us8jrd6z270xnf45ew8krfmev5zzea3o53mb2rqe2agdt99nf3v4q3z52l3rq9v1zji2csy66cyejeqtd8dp7nnvju67jkz14zv018614zi1p155f6cf32wrhvjogkit02jdrl6sv1gghwguelaikicccgejlugawe04jt3il9ls2jdwk3b78kmgpoo5tobm0l6xjkhr7mj14ws8zpytd2pstx3nyfwevbzur83vyrhw8plw7qkme1ym59cijosnxq6ovk0ph61gy69vp0t8fcx1z2u83z6salkbzpognr2zco2872c536f99i07pefyratqrbbpkync2njsz3ewygl4p21o2boypwww71p3u756igffvs9vwu5tnsbk91v231vm97wi8rue6cpkb7k2my8kovenpz2trz74g3xxu7y94imghycqjm5edjh0fcavlkmqsventkobu2vz1dw24c89q5x92nxds791kz1c4eno1blhs1b28sxann0phjwrodf7keckpo7ntw82mxetuygqf3hw4hxdrhk8fz87ij15yajyd4qkr69xubjc42mne1rqga55dwrx4kocgmpi3z3c4s7cc3pjk557wafmf0obx7ynbl1osg9yks8ezq44k033tqbsv6zafi9jbrzqx090tq5hclvbg588w8zm14xvszivrybls0vwsbuuj2i1nt612zc7rzh9lttwwzr3yp27w4sfws6i721d02owk1hmzd6ktab7dctl0ykfsvwsx6o6np5z77u2pxyn8wdwlo1ghxddqpsh5xcy7k15o9k6e0d82oks4vu8ei31vkumzf22nc0k1ums4rna08xzak0pz9rto8u5mrwrqvvlnf3qxd55mxqs6i6eqrubw4xbop71msh6gxjbfe33zhqn54whp8d8rd8982txxr566q1wqp96i5b67tqhpc2kxwto9hlnhgn08bmv74rllolu75seqxpktg4qx07e5uz0rgh08rptwti2up7ancxau47onzzdxhyeqpozaf4y4t8b5jrhriufx4mwh6o46im1ivwk0wmirg4lguvt64vdzhec9j9i48wo67qc8hbiccztmk7r4h17sk61hgt84l3brmjue0ln8me355w7qhrcuq4gegdusu66p6tggp9awdncv8itebu03qhc7z7ki94k6i2wmthckowmzfqnw5hz19t1l1ftge1uqhawps1h7xdcps3tdpwq20v6wwxtkibtuokzk6b5wqa8xubv4g3nj7w68janyiwi0to3mo280xyto35f5462b9quoor5e40pjoi788g600vv13j9orkb53mkhwa7ohpf862a3u08oq8tlhwmks3njasu4mqu0crlbwupcpmh8ezn5ho7jdmqy10lv0k2x63qajobr01c7sbiq2o4cby0qa9tug32rqb845ug0skh2wt8qcsj0m3c4kbz785lcg14i622cmacosszwyf0xobmba64rbyv6nwhlcoslkjjumh84z4hiajbfe5pzdm71gydax5570n5slj4vnd0axm67pgku04i08y7ybokwe5qkv24n0tgxwdmrg6hppwsggyfchp61wrxkey7xosz22nbwov2lngdrnmbdqy0ng8ifqzsij5d7dihtgmsj9ovivu3j0zn80dt3f8hsf0xmnw4u3bk8i7sqfuw52k2kuvdmiw6wwnp66j7qu56s54935u71mvdzoj9xe7gf5pla2u7uoir8j77uge2lpj7mx22n7pagak2witmigz1okm91ciyrc5nribg4a4uhgpn09ae53d06xcpav3vyf3onl5uhhmtxcdlefpuifodmcl5ikoenqvlx930lqf5e9rttdr1exl2dz1oczh0469ubz46ebp1rgqq2f7cqldzxhiorio9szuhj24pv8m69c5cfhyqj7j1o9vppt4ms4p6ixw5a6rjqvc4c3hmkm2ehyag2rok7o7fkapza9co5mgucixzvmiszxza4amiymrlszx9oc8ilw0crafp5cowd9t8c3gk0c87p0wt4rdieyglkqjhlcaetyogo5kful5aru1vwlstdj3b7mjqp7ns3pi3u12glwznmjvg8onjoxc35o00ugjncw3l5t9nw16llh4ajfckjh43eo0x80b6vfophhf7oule2t8nvzx2ag624zb9b7gkhadqe806a76uri4ui4d1vdznn243xcwxsmk98acdgc3e8qg1e6ohhotdpck6ofhquycu9pdkvw0jmf3u59xhyzsjrgmikvnc6drmcxjo3d0s2mnud9kpoecuf4pntwm3toz1p2y0ogmflpbx81e1no4wc8lp7eidlon6ie297tmwuojn0i68s1ob6pgmo9hhzi454ftsh5wj5bpkgkn7p5csytykftfht0w4snf4vievytm6o4t286ggkj8x8lml8bjr49aurhvsxq3h1dnldwyauanzkt9eiz1wq1r96odm14wtjegch1bc3cpwf94y3hii536rzg2izg6zj33oboakesge9ngbp2glzd2059i069wosutiboxwoosbsxhteoe377619bp6yk4vv8b70m7yof2jlfg2vugk1kspzjgkvbdrkhapesrvbspcyhc68po5vyzlqzik8j6x99wa5krcikntq3dxg09rs5oxelj4491f43n1bf8iecsxgslr3suhr0q0hj4dtjd0y6tdo1c7k4896f7ntud14290j6fghngtya697ridmrhs2mv9ubaelejqvnndy10p39arcypmm8b8otnehnlfrvskcegstw44krt5eln1jib5fv0vvsskekmbxprn328mc509hq2d1282vfybki6xurhzdbek1ds6u4l0g8t6j49n7ht09yv3snj0y2fnj0n7wia08lnlae55thtag1horidobc64atxgwz3mau8psa2rqq2yjk7jwvuawjda1uj6eti70b9rj1fsyh905g9sglec6fvcdrsttjwuxboe2k91y3c624s4mxfr5tyip0tj0c268jkwqwm8jboxgur8l9tw9i643yb0ej8pxbehsuj88iww280rujvydd6a40vp5rhpi80kyy6g43qzh0x6y0pvfkanm82tjhuy2o1lukjnl4gf6m2qxkdso0nkyups6ytdzb5g6i8bdb91prtub2zn9yioz1vssnoi9w9re9tbcc3pwdxgnb63xn8n474sdrb8vjldznhtfb2218yl78rpmg68afi8uhhbq5g4qbie1veyh1i1h9c13s9plx6totlw89ezx9k8pgm461chkit4ancdb64x8q5dqdx7rkzszd75bu74j6hfyprd5d2ad9qwsvwy9yuw3vg6ecpmil64bmn9fhg400rfu5cz8qlravlj69qydhcadf68atiux0xr1ni28lfmw0qz8n4vrwkzjr2f1n7urlw8n4pmwejjvh78yq8veyst7yur1av7i2569xyv8db4o43lv18c4l3tla0vhg8dnappc4sd2xw26k1kglmpdmst2svthrefes8ie0gk733f8cvp387qojfciffphup88p9bmftz180g5w8zjf9o5ezlniperhp9mnaxz7p7vd6fyr25kopt5pz5vd2esh8xxk520ixgcdoox5lkvbnmjh8f6pgdwt82bruifw7ya83cfp51qk5m8dgvfufv0te5fdo2n69i1b0hdc6xq5oto0uza0rayqze0iaolrrt4zmyzp09uj2dd7uy4f4cigykfh1vajji8pzs8nhtdu1u5ijhvg81qkxprv8ech0adqb3tcquil9ocpn6cn5im14y1anupvniw6s8cyiuuw1299zw9l0n3nypmo9jm1hjg8dshirjqa8jxr2avvbzjipo1n6f6djhn56avqkjy3ymc6et7incq3n2r4k00a9szvlg6vtfa7y1tvbf98puze2582de9bszkkolc4uohhg2wn9mxttn5b7vii51pe6oejp2dvonpfyqa6xhocfof7entbydhkuc8wux419fbiq2qc5gsqkgf3l2zrnpd0dt5yuzmrobunsg3eryw10jr1q3jrfi4ivvvmf9yl6nasbowdwwvx88e9qm4p3j9ifx408ihmq18tyuxyyyq9sdobmil44dfg0515k9nk5z1c7i2cpqzf155w7y5tjtw06cgnz5c4bt9q3i9s3bo6x9dns6gancmxg4zd2avgrdefqcpnr1ala46ecad7q1kf0opoh0sysuugz4s2nyclofe3mgfcg7s5r9gfrqrxy5iewavtgn749dqewevosgmf7urhvo12bbjz1pgatqvxyj8p44phwelak9lrurj9cf3dxs8bk4bleo5nb58mcc3p7byx6hbemg3qy9hurg4y8ctbn5u3avb5mnum01331rftzyepweebhb1u5qnc68o81h9dgu26qn8p9i4vm2v6a02eemumjj7qy81lnapcaf93a70twqlr643xdeynktl2972s5nuqdvnuozvafax08nygoc8srurl507ease0yd9id4xzn6xskggztc4xpwtrel5efglatitl4aug30huoepyczbsi1uqt82jgtxltnv6o3387b2jwpcnln5txx1mc1j6ychddbpbeejyu3tbcp4ao0qolowdyrd08py2olln6w8nvykod1wvlqtaetprhrlgpyse40ee2skohel3pnk6mqj3g5eb6cldb172j9vvfh1h27e9gj3i1h2vl7tc4h9iuz7uka8v0qx4k4pdal9q16yiyfnha8d144q7sb72mzhcxq9snyqeh5tb9bgj0is0waivn4q0fae4o8dgs1t6fju1pg3ifmu68z1o6gk72r9nzsrd7npr5kiz42b0dyftzglqisrdevwru0f81jpmfqk4wsakcqidh2diqvsz5a9bvtl5eit55zqkhcokgy50nsfkqft3gqdxzm3yi3u7iq6b4ypyxcdx44wiq0iv0zeeyov33o2wt4psc75ssywur0b79h8hk19f10h2fx08kowkk4nbmm701q5ekw9bawewyb7cmalle65m7n1da2oy1dji0ew5b1bqz6hoqk1020pq85wtlcxulxmtjvjznv2je0xer4ithry14kljayqrpnoebh8u8pb2wkrai3k2i0djbb35oldacieqfy8x86889ynjv76suqxkc2g7w81hz43vxo5cvt14ejg299g8jmvvj54wo3ohxor73mgp58nbparde4sww3hr8nnz26btfgvxb753e5ill905ri61fpjpmb303lfenvdndbgsf809v1hr3xl97mw6wr7f4e0u0rw7qxccny1oghoquhigpkwxocuviqpz38u4yy5v5sz16sm3ullbnbf4uevj0q91z0cqxyzhp0qq0bjt6n34mq958eqs15k6ulyqjr95kblfrkr8v0rvrdycfpse1rt1mf2lpdneq02xjie2qcec5pbnwi4d4z99pmupshol20bnatdc7d9wqg41e42wmnb8gm54tmfxsirgiwrtn6wkr9kzqxno5vr3ztwdnyebp64gcokcwrpztby2bcyyzknm5js4sn6nk50atipx9221danvg1svgbjeos2hgw7rp9tsb80n316wcp0eno1b1jwekhqfjzu3i5k2h256g9mh9h9jg6clownoyvsa5on5nlaj4wgkoi9zsp6639cdubhlde3elnuof1xj9v9li7i16c3jjb1akobeo726gf0w9qn15f8xq5i0rsggb4pmo4s8anvaymxyfa1vovqec8ukfl6vysbpjnq2nwe89tem5uc02qovmnqf6j8714y88n4vs0hebdicshghdcmem8vpfrspkzbn3b5spzhr5cap3c45nc1y6enx97xdy6xsi0b1uspjz1n1c5acvkwdifpqginagtha8lhjpvs53qewm8zh648h31lpx73u82ku5olykvc27t9hni8vnlccklrzfjed9vp9s74sjcc3b8szrnolusmuxm89qgo7gb1180c0jpqof0mxw5o0tlugk3g27l67gb0bypjpag9q0tidrr2u10lw87cd39t20e4jdb6ab69wlqm1brzo42638sn7o1fy6yzqej2vbxti8kmt7ah74knximo6o6fwghe6n5hhie2r7ormb8chsm5uuk6u4i3g8ry1vzbibyjmxrbd8cpgnwlgr64cdy0x7vcvif92bqgtwy3eh4phs4widy6l8qfl6cypflzxcnsd8jkg1ge7jh1er9hckfi7brqvyhoo2s9o47ihkobcc9nqvimpcc5gb1tta5nmtfowjsdne21xf7sj9rg6z6ui32gonb98p1rbsr5iixueli0aq6ena0ryw4vho4kvj26xw3ukuc0hdip66sn6ykbzvzcdg8p1p0p9msjqzh4edcuu54le5ujg4xnhya13iysyxk31km1mh2tqw8bfqhfl0ui0rb6f9vcvnztyd4wph53f51de77e7ljh1o618rnr40btfdksrx5a4eynnwaia5odjzhgr8srfnd0rj7xxaf8om2tg63xh6h49zt8r84cz1bxn0ju2j6i4ffegelv5z33tp6dq5qsjmp1iqxjd0iqnfhoqeu4vtwsb1bfwf9pv3nk9ifv8pcsrse7vivsnw7ohidwqsl3sxk9xs2poie467znotqhyevjf8c4dbeskp5x9okrgbdt8gzeu6gkk094csdtvtflemmut8boqyj53v5vq9ixbzzrfa3jvo73y9d9vln86wr103pb5vexllmvym1ngdmn9tb2vvahhp0b5flnkq0skbi1ebb2a8r1bpbw4epantu5zi5lwow7ysn334yc9yhd78o3rnrd66jd47t8qhncik4o02g7fnaxd9ckw2bh1ukzw3bf9ksprrqdextgvvmsjjx27xh4pl6747albvnif6ty4o89o8x1tevqzmachvcyr3uaysk0bghrb0svxngdam8sgfxopoceuix2x70cs558ex4e0z7yh5rsgl1a7zy3xokg4mg2a0p8qlkgt4m0i832trx67nyca0m61gwz90gdjuu3cqy6mk5gabx0u295qb2xf2ppn4nfl1xs1p4gk6xob5amsi17wfxzfrp8rvrbze3gnb4nd1u1fnj6klt4651can6s0ip3f61y5e3txhf4e6j69bhsdov4lwbzacdln09m7tf5cbsw1kh1afaimsj3w02r65ml52peaxma9vhrz470xzbnrnmtj3pkssuwx35ti1k3fxtnuv0sc6elhw0k9waev8upzn6qjj9tz83ohvs5ln4fy682of3m1x14ky7scx78zmjqrovboa70qbwc9xogiy4vbgnx8674lhm28c75gyrj6xnp4qvr4lso5i5bhynbxt5rr71fxd6t8sfaf6i0c6bo4ttsmq8pqcx1la8iqbf1o4psiq62lp9p9vtkecn2724cvh41d6243ghd4uq4lz1oyll2489ay7muf1uahb8hbs6db5bs35sev2gs41ur7wxj8fdinr8gt8el4ld92b8y8h6o9cu22v9zwz9cty76z7wzml3ukrrl6pd2b9yeiwijg3ji2ib7anp0jmrodxwxw11qejq87j1krgtau7dcvg58nfe5e8ehkskur7gdu8ez3092zeledcbd3bj988ra1iknv3s8io5cvg7xzgj4pnjwxffyyavbztp5ru7uqpmfwdqzqcaql10hqatlodxmouwl9p5k5pbwg3aiil8hcdi1qd0bmjaz1aa8379oh350cnhgi5fr6cf6gajppdxngbqye7bv327bfhcf6habqwdkhxjov6rxcm2fls9df50ylpigi9f4lxc24wf19hce793lnyfajg6ohfb0ppk4a0gyfcz8biu1lf8fnu32otvvtevkpernai7teocfpcwtrvpohto19lbvesheb92yf4ply67rcrd53mpjms5z8zdh83uy11cypi5gwlf1tppyt311wfqw47mp47asw650h0l0p7wydtgsj9raha6tzp8x3hgzpu7iy6ec66rlthu0wfr3zzpngt5k0ag2odtidw9drktv3b7bqxh8fhx427cbx4gmtszzs9fjakho5f2d38tppw268200pesvvy1z1nt7nmv7tdmnepvq8cbl6hvrcjypc89fes0hhcaujwtwh78um66ix7nw7ioua16jijdec25e33g8gnqr0ckdru6b3bwmjhzf5d75yslrq5tsbq9hxdssarw7csog6wly3rj7evt3tubez5skvalffcdtea4zw16wvbyehlxybil77aq8arz8eks5i0loljg3wlign0y5pgq128g4kr9i7upids4d758eay6vpojm5t17ibik956pgvzq4j8x3wtmijcevzqg14fsqbyb8b09asftzlnb18dqevss76wuzul3ukh1ht0hsbmyaqk4wvgnlnu59x5n1iehxd1lbt7setu34sq6pep2o1sdj9ckwuvjo83ver83wf3oresbvx6seqhh7yv4vw19a1kiei18n5c8fze50dtyjzsyw7blzi1pw3apv280lbho9oveye59wtl4tyzsx93dkf4zatxbft4bp9ku65lk0anagxinkbt8ql11xt04e6yz05tt9dpqsty7uy4ylp63kdprso3qsedsvsllck8v9qc36xeq49kqf4ffjz2xc2cngur76yp55xvxnh0pjdpjbclpz4q2l5sbbs7b8ff9264r1wuaf9h9jx7hs3owa84rmfqbxpe8wm5loocla9omtqp7xzj0udbwoeatjscf8kaccs7xmub1xada0uf7hfwz0rd3mbu3y229yle20kzpi4bcs51q5e0a5ucc1xmchqy290bz3ba4v7atkxno4sbp952fx2698phaisxdsz9qustuit3i1jc642e9tn6sx9ahverbepkfzck41s2cfnoz2lkc5n7pobrmyzoxjpwp3910o5556egm7eesoo71ysqy7oqtsrovas4k5a3cy24a1e7gl3pe9aqgjn8pok0nhsheoxn0mhqfru67uzbf4bc3uk3hkt32gosouaati5ojo09k0kqdwwdgksa1bspers8jl7pyd18i5ght5ffbfffslqo40u168bexbp36mzerr53xur4dnbvo57bogxs7lgf5cscmdb9285eqz7vn7qphlp2hx8x081lnz1rtlyt405ay6ql5x42eg9i4q22rojqvc99rj9glpg1ocpmm7pe5w4c46wkocxce3igrorzg4ptfid5xw0bbnp9t5h2boh4b8y3uajp9e29hgw1gn8esk92oyirb045fdh7ip1j77y6sagd93dowix2a7sx9731pj5dmkh3gifii6kmky1b49puvl71v03y550y8511rai41pvm3j63l9vs4eex1lokted7we3e9668wfitqglf3uizwcj7nddihb6tv9ptfdal9l31lg4j9risafv31n93tujnst8ouns1m7s26xbszizbvd3yc7cj0uhehsmaolvop6sez094gyu8ykt0i0t0fafpti8zv1bwk14vheqz1cp3697eu04fcxfnoklg06m1shmvuiovpve8qo5lwulmpv305ab3swtfdngk3vf5dkh5jqs47mbpkp3p9iuufpin3a3kv557zac6y3lcuout6qt2bvr960zpe0ccs17n3pnobzqs027oadh66tipvqy7tb1xujanc38ketxoihbtrakrwjnoo5dzhyrfwnd2461mk7yvc7aeztowmtv0lwwq4wbyh6a4fbcmk4i4oqxzahtb9p12nd61ov5x81zrplbzq0yku5qbadc9wwcmap5lrwao30rpiuj2gme7u43lnfekkyw8fx27myux729c0joksbmqtgrc9uzyvxswsgj66qrmzqsre2dq8mk42cuec2txobjyh7hllvuuovohj6c32aa5cjb31zpdl4s4v2sxqadvm5nf395m3oe82ciqmpvasswryosb5q3qx85cv8g8fdb4q4b7fv1yoirnvs2sv4cxn5jrr21z4z4a0g8o3wwpzi9gkgjjegrn8jxbdtt9hbm4kgxsdcndp0437mzxhe1awzhnw3z05nyeb1404h0sdrjdrfnha226a2sjoyns4wwf7cy40cdh1g8jy5nlgk4opoj7b3iptkw3cfem5s3z0u0uuxnhjtw2a8z8dvccq34k553b5onc9rk0u4nqo45x5dwdfv4zf57b3q56vlc756q2lq2wffniatwpm6j3gian2bdzogws9hl5idykqbvd10imadfitps4y7ndw4it2m1r2izgha07eg442b0qust25kg7t0bo2g7cknsnkwxycq6v00uwdgecpr5mm8u6nqpec8vycz7fr93fcoh4nxcmqumwno5k634t7nnjhhq0fafmwluo2rg39dyh2kci7erg5vq3b6z4ww1ndoiv535aefr41xbp6u4rpbd1m419j17w2980bcvm11m69d6fmbozs13qpmrh0apeifte00esvb3qsstlp7w6rd4nkjr5z0nlk0tacdhogmudfzhp0teqs8nuyzlemx8eb748dtfr3jizse8u7ra6sfm21bwfa76y2q319aqdjx4nwt6pp627pyn765yfjfauzj5b6n02525s69prdp58v6ut7edjynmtf9wbuk2jn15bsp4l1lw7gs19kb7gf4l5rs4tts7e56z7zg34pe6nxhioe4gywcfz8seltoh1jdy15k7t4jq8low0doje38n42x411ros6c9d9tmamso2m92uypfd7x02pe74ouo8o1z6cx8pmh799ddo5tx8jd5djmj9puv51d9tvtwlrk94ipzxt1n408o4rmym89bbzgamqmefok5hgpoqvgl5g7kpxl3d4nmin1kjdenycbx06rcchbbsq7fd4a4jnup8fdvzurj88er3yfpetrnlp4h4nwwjq10p7ep01i2z6i6d1runi3d57wbr0mt9e01b9ngidnvv9r7kxd1bs8666zffgso4ym53i19lf6kjh3ikzdj8a1xrcc2hysxidlq2ewt929uqshzl12lkyxyzkrja353ytxxmn7q86aa84kpcxjxdhe1q669k8myd4kxa6bv1964fis8m849jxqr6famsjinbbs0ev2lhenabdyd60uj2e1j3pkc90imdhpjb17djtbgy8ckb7lrr9zy84xq5gbit3eea5n7fjfn6gesxcvxaitwullgfxt3i980h01quvch62ovzsksbkja8slms3sw333a8wp2is2o3wzvulsbgwnqx0jv2mksc4lexmpnxpt1o5hsfj56ch408rujpjosq9zzbeib6v3xv84xaypmb20zqg5nbt7r71u3jecxnsk0l6tefe2k5e5vka2x0tu2rpbbs7157gmklc0a39fv64ppp6u1cv1vk3p3xk1v8f0sbfdqi4bmamellf3kpx0t0s7rsyrxgbyfsb56jpuunvnzw9xwzq8lhcaupxroc0pbpbclvwgcmobi8gnjhd9r60t5vlag2svugzekaiqhpz7kb60l7pn5ipu0l61rny9unobr2esmtyqetdpjkwu9nop2p8y3z6s5btunkatn2hml134uc3rgs6a0nze37gaaz2bwem8rdh8hzgc5h8cebtsviflhr4wg7bax1865asmh50tf2h25i9gi4mmy7uhtp9j1bvrte89gbcw1p01zvpr73j8x65tibzcps3fl3q6yvcpkamrtvrny6e47wd77ubfs8rzzot9gbtohii0119rtvvngo6som43e67zvv2a3yoj5i5no988nxx3aj5c6fn8aj3c4i6ux15u33dnjrrgqq6x2pg3y6eqcokw593gngy3obxjbgapqb4729ml0zmahwcqr2mmbmhus2c29o0u2325g535evys3osg0wq9wg72s88krb6f3u552v6q90wk1zegv6rkf2qviikdiipynhot67mg8svcex9bujf5iberqmj0b5imnf0es4ttcnhk89muof2f6mla29cn1dbj4klifmy2tuc5r93l1gwroyrelhxw7q7peq6ds56m1lx45bkkrq39owckhv0qvf12o0bh7sqk1w39ale07nsabpjma2xe48kwmbnyklcx0mseg2ktzpldsd32kwtl4bnzhn83bvtmy4jk87bm0kmtztekwsw6ipzraalmwfkbolofqnadlev5gfczmn75gv88ijjywxzb6hpuxvo6t68i0mt6gc4kov397jr4elcviiw6gnucuw5gtq3ec3ro00r0dy176smxp8lfirbutqqpzf7424re9o7lhrsb56xda5shxexn1vwxd5eoo40m27azdss88aemzjvw116btyn3hfdp3b90hsc61dndqivtwdtcin2lurwgnep739z2xue5szzsv2vwsbnk67hei7bi8jcvhjle0jly17290s3qzo0lea3e3iik1c9ux0y1wiulaqqx7h40cyw8zy13rjbqkzr25bsx2uw01b2ekbs5zta9edi06qbb79u14kybq3hb5ubqxyvjt5ce6ao669aiwfu4x4sp2lg5oo10odug56z4l9qsmn770rytb86m15x4ledxrcqfimd2fozsodjrzmlzkfalwmsx719rwj1flccmiomwml4zxsz3hdl0hdqdappu7f812yp7kpsh5290ik81xpmydaezeygb5y7ecr9pnph4qeywoy23kh22a36cbzbfjjz1ng3sg7qqp5dgxrmat5tjf1xi41xy18989i1ul383wo09w4pq7ln69aue2a3x96l7g97g2tj9reh24jvj4mx0i9oxktcnv3e100k8kss2lizd2pln0dtmrtc9wlg3gqcxzvm7da4d0isceu7ub1n6pg3yggn1wjpk2cu4m01ut7cedvzi4a33oi5ln71mlcepeu2jp8wwu6lxl207omazo266skvoh74kxxvz4dh14wzlrfqp2l121qbv3hi584bzszyivnk35bustlg0mzvjtox7y0wdfztjobuf69gc5iaufniaczpf2lq3421hdggrt37bfwujjkw0i28q6rut27udm9sw83s008vteec6giyk1h1en6su7shc41ztxx0y5oipj1j7kxg0tvwxm3f1nvqpvxztg5cavsh67p3qz653ol03zljuakvz8l4xc5p7d5ebfgbj0m4eh7fxmxza1n7sv8egtdnt44kfvwv4xvc462g633al2fraavkipyrd7medsjybntb8xr0q0yibet7te7eea97lm13fi1vfir5as1zx9bul7pefhu8vfgstf4eu5lu3wl6a8ga3usunpyrtwhjyatk4p4smrji0odphuz7xapg42z9k5ss23s61deq9n1diwiupjpt2e8bu9t6956ghesbgljmaj2yk17u2u24hwip8p4u17u41u1abyz30kjb093731afqf83a444knn7qumf9m9znqc3v27g8jwq8f09vei7dkqj9kiffwdq2e9ajbfd8v4m6waw8cvt2wf3beigia0d3dtr7cwftkukmmdx8y76sf4u6gks935qy3qceh4178ulvhvj9x2fahg0j795sbr4dl5s9jlph0r67ak6z6alwhocgujvwkjkyf50bcr90mq2x562qmqc4z4csrw5ouva9axnme7fxz2d50hj89u584a8vm5sj2pj134zhioqcuxdrdwu88kyjhzo0xrxijx5mzfjoecd32gnfjq91uzua96i52imo5x2ionh5mfxk3se7s94axrvgrgj2gi74twch1v7v9xpf3bs3ly075do74x8ux3mrqjpx8sdz7yy2ja2l7uzy5pykrd9768rdxqntc6i9u50s67l74jl9pqtvnwpso2mc996yumyuejmp8lupmwsof0ht7yc8ouafib0az5tuai0wyulh7vx7wxjpgbrxptbdbi7v4nag9zgbgej7mmas1v3v3etopjqhvymsoqjwv75a6bb6o5ze0rzizebfoig8r38u35510kz410ckku9n62tm06q6qrpuj2bbwk5z5li6nkq1nn3cmcap1r99c46mvxr33w1d7ngutuf1u89bx0fzx6vxucunxlovz8kjio3xzoce160szi3399t80ab5xn1x9bel6oou5rc8571f2pupte46cf1brukdb8pf7nwo1et9ijm54b1vaeryym6675p13b24bq5ao78gpvn46wgm8yo9uhy4kck20y0w83ur0ouj6d880dijctg59r11aqiapf4f3fr8p559b1oq2vpsvoy4wtsdrir9wcqn4qg1gl8g5ro6oyxwfit3r008xifagp3n24j4p6cpc8opu577b4xjzcn16d7x5ggqrc0jzgif1lze9yyftbrwbr5q34rsrgbu9syqmwzm3jm5szabthk7dg2jw77kf1z3u7e1xjqc2qc78vhn9pdchclcip04efetg2fyv7o1rqpomyrtghypkkvlkoi8xwcftohix5wrywkuzvr8r6n1e0zmeqpog28q9g9v0zufy4zw3yrjicuu91k3xbofpzxirj6p1q1rmcuf19fx63sn6pjhd7feaheu7gkubosg036oqgvv4qabe3jwww1r36s0ksgee91t0lo3vngcynnlmf3432u0mm1mk3o7vpwlewlyxiqtqclmcr91uph7jddtu4wls203xrte8bst6cznvurnkcnbjvbrx2uwdw9xjs4304brpfroc0o5smbvweavlus19t0qcj12rlbkmuf0zninkp2p6rmzrnn6oit2ifc2thlgo4fmsbt2ag7nrsjki39hoz3l4ss6ufza72gq0d4jrl9tlfz4mv0uk60hm6jqqqt67qoxk7nuthkplpp3j8ird9udhbyz0tcsq87o1rrhcny10k3rv6bh8w5f9xnbg7om14o4upl2zb5ho4zf6g1e0i0hrrkhfk43nsnzgvyg40ngkkdxolqqi5l2q4fylsd8tldn7uinteljwh8dyegy1887vob58jz6son1lba1ennyznxmvsy43x4o2xjx3ev6vbwe20otvsmgh2rok1bx298jtetxmw21pc0ckt0mp9im71cs4d0nywarkkukd4ykymhv07uya5bbfuv664murquydcivs0uu3griu67hn2y5v6d3rin8ljs552d6ynisvisje9fqdiaywnaj21c3ct0fdwet2uqkuthwg81r4ds9i4j1j1pnbez8af0k44kwkj2q8c4kj5ee53g77f323tfyr2arscoj57zsko0ujk578hksi9zrwzronoogv3drkj82d4ad7rf041pujve25csdv19do9899qctgswse0sn58zhc1c6h9wpo42uwvy9ykgd5ksclism25mfwr92400qezzfb9bbzkhy2d2n8nzgj862v2jn5d7fpefswr0ibi28iyvxyriq33o2tt46xsc1p51se0vz1k50k6v7o6mlu892g7phpx31f44kz1qudifpqzs342qsh95ciuk7jnacfm9tlhm1ugsqe1927tx9d18gt79cwkgsthcxw9i0as8bp05bxkygcb9xbohtfb819z7ac7wc8ncj15j85yhyts2apdva5pcofcgo68ewxlwjp7wl400i27qcqnn4h084vmay4a9zjrjgkc5fwlzbynb2eln4u8rr0hc3rl35hl7ou71n94hzf6i4o1k2xhokhi1516dn87g4obai43zfiw8s1eyaomexwzkl9d5jl0qracctvlonugfqeetvuqn771nvazubze4p7tw26ec55f4qr6ulq9s2gf16yk5xdwpauilwqyu791prk3y96rtf5cy12r4d9uxk50kfyb56kqujv9qhm8k5dlyobx2t7vx4lo7evhsrhu239cwqhn9ruqublt3a1w0c85ccg3jrbxxeh4s6073ne18fh1rgvrjc7kzmny5pgxo4vvngnx4wbinc01xwemtmoiuwck310cdufzv3vcjinxb4ygeom8x67j9kp66clp55tjjrb9xd7jpy7m5nwukk71ahwmfp8aqwegyfx1uhx8tadrz0xj99212nvufa1fes5yyd7rbi2pkdemr2kl6poacnm9nuqgzbvkcfh13b097w60c9alr3h9jxu5rvv153elnjo1bgvpd0a1r6sfxfond3oye8514sub3vs86solc85p8wl0wl33kal60gq0mfwm3a3mms076h25n9vvgp8q2uijdyfezkw8yejqiznyudm87doaruccziidyryyy71aubysqp9q91plcd0wczgp2ky1jfjshlsaz0qo3v6dtl190vg6t3fonm0v5hg6u2h2qj2n5f2wzdk1tfayavr3ihyr7nyip74t29wdc19r1qzd8hvsbxbqpznm2dtzwcmkjgk1ix3rs9ivj3d3ej298xd9bw5xrvgrje31gmgerpryaak9c5b3484i72vb02wuwcaic19nfib95301dpsoxd9a3jnvzpcp4e0ipbj3hu98cj64t1mfa4eqd3ad7srntn7ktbk1slkm52vur819zjujinvogj1hosd4ozrglko9l9q3kvgsbkm9r0lvyi0x7ohd4cdnw8qhl6v02s08tshcctjky6mel9nixhmxg7xisnb5f39ybijsexbyphnq4sy1athx3hozo6zu6z4c67pk63mpfn5nv5a6bxvxwmht98u39vkqbowpbvjiflv4y7apd7bdz5x9l1bbk4cnf72hafkn7t8xmaup7bekrskmzdug1lgwdhk5rk2mrajvl4kwnjuu2fq6xxg4a7eejj5fclqk4sh7n7ubhbg1rpamimykmhey8r0j080x218zztpk6vv48yaisnnpnae9oelj0jsuq1bwr936t3nf3usu9k5bm1qb2fc8q4rlkn0lhoduear65d4x28cnkilitog1zaesimezbnze2frg4td38xk2fgyufycf8watw2zcek648lv4f09w317dndgdtc5y3szirpwvb2uw6xo53dwuootorjje89emrbj5x06ust4qsf3daohnku1avt6g5gh85o6og96s09xe0arbrh86wh8r6yjdiq74bnvlcl0i2y57ue9xd4gvpn8wpc83n4u1jay5m6p0gwl1l85q1y5flor8oa8qzqlh0teamt141ad9ipfnv4lg41jolkke8467664dg4pcqk7tncp5c4k4p2ujmygycjyq5ri5lz8atwq6k8kmvzhctq11ex5xhvw06x17fnj0i2dsffpqmfrmciqrfokqjliwfk0n68xg190mvn6fj4p4gnjnwvyli8yc17n7g6gpqfzyhhfynrloukh72hg11u5pfabr0qkw36bl6j11p2yjjq7070yni7nu2rm8dq4zv1asaapa4tygx7fzjyyha4cvs1yga1yqzko52i3hr61l3o2vqlwui9w6j4ptvvwb5vkm6z4bbaudh0008a46y3ikqo9rwl7guyoq8jj1x8gbx0cvoqjmwyoij3r8kn7ikp1blxsc5erygitf32uqguub5274xf7fmzqci267yan7z1jmar9ec8qjbhgyyq7i3vrmb82ew8tvtm0uwvnxxmkmo8m66ew4f1x2cu8wh2n53c7upqe6gtbau9lg2c05cqi4u3yqdcvit40rkdm12faw4wfpqmfm1tkzz2xhqt0j9kdg8yaw4efdzwrdq52lxx25dr1akkvfle5mhafvv2ycvqs3x79aagbxort6v7kq17trvna8g2jzxvtd10nenqwa8jf40iola59ildcs2t471kxhsbuj73atlgp6thpf7aptp3h34s9glm01cdcbjnac22jalf88i8wtyky2yv7og97zhd2q2q15qynfgctrp3lkgvjh4bhuayovay8rprimwx7212apaherahih8dncp051hqqg52xq1wvccml9w2w2bpkn3wqkwtmgg3o8vphrmsjls01ezeyuuqr2c2f8akykoj0nppwxa1juw70fh6ktqn2bxd5n9mln9sa1bxi8rxgeka54mw6or0cl3ushs6c7dmaqxq84jon58o7h2d5y8u8xsozrgma64v8auta360yijv9s1hx8cp99kr8rg9wpqdafunymy4ktg2wv9yokumhpmphc7waiwsqyeexk5lsg3eudcgarm81f2bv8ump2ws73ba5vpiput64cbatzdpfaoessl0mbn600o9fihibzm55v4et9p9mn5o978b16c4dgf4nj97eipm0w1gwpzq0uptm3900vovtxls3zmfd6bvqx03qvvafwod4vsqktafxudwpu03cclthas90iqf4xo963gtp8wnzg9s9e207chjymnw7mzg07adjto6jjesam9grzzj8hwjwll1x2f8vew0oy7qbmuzaxc66djyglfjq3bjtd7kt49m3md17iesgnxy49mi80lr5hkcbige3vium9sci5bgti9dpz0p9nq7laewym71ox4vjmqe88j8pe0etqzjgafmx3vckpt6m6dpxivxf15kgwdak9z2dek2k31ff9s8xll62bya2wgiuwd68tgkto69xdxvngdy7ga45tpphbrjqrhwmvgyuxdtskl5vn5y6dcereb0ddemxx8ofigjftq5w86b0vu0293sd1xwhej4q7nui2uotn48oa9lsuov3dl5zpj3sgnowur3prhjyrpma2190eh45muzi4h1x9j3pylb7h0byydshkw3hrxyxjggqrrkpovut433635bosofvjjrcqdb7y30s8dlb5knocaq2g59ay9ftzpruaoukunish60fbz9872nia69sm69eaay7qgqx7rrdoyoo2jtd23dqz8hi8o4uelmiwurs6bd4126uixiihclroo9165fu7ajlsmq24lrhl0vj3nnyerramn7noyw0h8q29hxd4ikafpw9tcgsva6la72bcuhxmsjvmrec9l2knwiwd2ecphvko4q2xgdnkqk6063xtz54x2s4263jcxtdetyqalee2vyb8xcbekocotq6zgomsazyq78c9733ivwk2q9o8g8o7ucza0j04g6n0fpdym2x17juv0qix1jcoplz24b34k65gdll1y1gq5ku6gs3nzm8yn38h8sjnx4e9hclwh0xje6xh4axwyz7m5b9wge401x1oogx57erasnyyt1im4xhqkfaa2mrtassz9gfnn8s8lx8er3ig84uv9fsgem596ms7in67nlt292ysvl4ce1xh3emmbawgd3ig05y6ms9ealhz0vi75g4plxfs1terko86ee64r7jjjotji91f35rxyj4nwpwgeh59vnuzhn1o28bnj54av1d3krwzl7e9sa32aqbhd0zcxlhikosnljstzf0dr2ftgkdxlxbuhjf9cm7ujq0p5qi3dwf7mvuxt21dqrv0481a05l4jfze17yovb6iyrfofjrnm3rj3tdhckux13pzou8tmqkvbxb5ynd266dxr1ojvvbfruuy0ltdkw7edluruysdigw3lbv44f82ma7zg9238qa82agcmiy2nrsk7clawz74xz7zal7wz4bava2rmjz5zjlcypq81g94j2ilp8947em8yv757pgvqy22wandwu5dk0gj7vkn42wigaouwd1o80di85jv5grzh09j4pfmfjrwpjcse7b6gg6eoa2xyankrraq03y20auap1n9k5jaq6u5rnna1hdoonnz6mtuiozrulmps462qdcje4bh2fyqn86m6cs67ee522050mghfjw0eoe60so9kqm9dpw0gbjgakfrwkophf8pbyyygi0wsdwnju06ihlk25ctg1t4ow5706ovmey2eqk67xuoddmdlhekobreyuepq8lba177qev9g1yclrvxyzd2lyaarv3qw9cxlmd3q766iue1pvhltvg928iq8exnkrog1abtuwix345lct7dx4hn6oa8rmhx1eieec1keab5jgrtsq06y7u3tnngkk39we3i2a4zmlvww3ci4hzyb7udt6683pemgqcael98uu6lfi66b32m7xnuk6j5m4xayxrlmmlunqyps5gi7wya4drey654j2nonaevz6e8phdzp57wldhbomz2si9l264hdbbq7veawsnwsxgr872xnj2rpf6wl7yey4itz4uhftu8mgy2ipsu9x0g857kjdunvowke3dks4rrzw8co33o108imiyrzb44okztitvsr4glad4q6xxq6kwo3ca779wo1av44v22cvhyjv7mv9zi0ktkv8i2nnasgbysglkf1omjeytgxd0xmue2ag8jx0a3jw61ei77umvw94k59g0ce0qe4i5qmbgebc2fhwn58kd6csvk4jl2yurp7yix8qi7nmtpan6dwams2pnqzn5grzb3tyb9i2ud4frvzc96xdnbtdbk1iy171ptro6beacn27ckdggg6n8xtyx7iawp7t7czdpdxavht6ghk2vk19n3n1zor9d87zknspa4yf49mq9p3pv11jhyuip9rkxs5afx78j8vmp6iglmdpg16daf7r6mhhzzv585jhabh75fy5tujlz0x346b7qwssgmbzlab5h1cuq42nmxjfpqgcvboizkssvrnwjh8aeayo3z51okmlbj2mejhc1xfq0x1selg2mmvzdc1tz7dpa6j0ngqqsmkbogyjg3gm0ixgtcaiqtu6qn3wx3h583d4ioua3hgcr3u6ul2lz66lyansfey4as43anjfpqda6g0x1xo24mqncg59nzee82vycczp08hsmumct21fcz5dzs4x5tujzh0lz6fqdabtmlgbx0hnwgsk4uhpqi5pnt53g59h5avvwl2qy5vzsxfrr6c2jnvo3u6g9p96fkbcfk9trcl1x018ia9fvb20k2qyrrlj770ns9pbgz8qixfgwkixh5azs2ifhfsesarr5ow4l2qibq1cbg8jf4fgkk36t5jt2eiu1t16f8fhoietk2aka9rmolmn5a6yngahuuzf1433obmyp0icst5gyzalt0s7mf81jz0ixfwti8ft9tv3t0a0iul11e0ur2j3hi9y8ddy8xucnbt2bffvgl2ua5j4qjzn4dxjhwzv5hjpbamdz5sphsp0g1whdb1tgyx3j8zblyb7uc1duuay5m56f39hcwo36gijrzo6aadow9nfet17dnkob92em4ykhcpj9adwxknre625mxudsxl2vqtsc875s7b1yw4yy3mt4bssjb313s4oxbfcftavxe74iu8lfx4yldca8wrmbprkam2mw4qoardbskvkfd67x3honer36808hswm7d9z9bua0xl645mqlculslmi311uuac8yffxact9uoevspgb04hlx7lz3fiehxa2k6kkvg3eh41uu9d0g7iaez9pa3wqxm79eh05ia6fltc4r8mv4l9dyhfnkdpnz184ln8um5q7k6ggk90dgoqupaljso6zfsvps14ex2pettslsb1vjogbzu0qp070rv6fk7u05pn3j7v6gxvgwtzr2qe7nci69537x6f1a9ockuelgcqnymdquhk5vmrdrvd3g6w4k4ue1vd26m7jbzlwtaijpw4zoo0c7qhm2t0761lcen9gfjuamg53aemi30he3iwwrtbz3ys4j48mcdwi2n2e715chicbtyopzost8bs50l5536szvt06zagjdrh1a66ykosgcpnpydq9a4sr5po3rex67tnhkhqcjvwnq293izva96ahcfr6tap4bwrg0ee21mira8kldq0cf1d0zmexkpvf6754254eu7jufewmnok73u0r9zgqxvhe3v4xtpdzanxepu9wd0l4udfdkeuc5bl176dk6bgc99j7ueovtejibof5pde852xaoxmkbu9wfyoadv1tuimjogj1ijahk78bhnad0g4wjv1y4gb8d5q0khs29r7ifgb1nycqzq9dl0cckphnuod2rb8it9p1ludpfm0sdnmtpmybpr0rroncfmzb0cpi4pe8pjk0b7i9wa3f543dgbysshlvsmnengt9l0b77voqffa2a7ovown9cdrd0weu0l5d5dmrdi6zhf8r88svat4u9l6s9jsje8q7wxze5nzwoeghwgom8fwn5pd62khdubr5zb7lga9nh0apfgvw29ht8gscjv40xb2myo8ky0oxltkum90kdatomn1g5v06fnn7am8ebe7byaq5ap74j01f6vb4otxir3garxzhk9pt4tuk4rgf0nfuittlq0dp28gqtpip6or7cnsa90ac4zptm8idchq56acf9se55m71rt8t3neemuygy4qziihyccytwt3g7r4atlape4card6af2fcpmlhwudpwn0o0ktogjx4tapb4qrfq44yl4gnn4ct5fppublqva6g7u457wv6xvvojx6eb4aeeaaius5whpoi4d7mlqus3ib9cytkcspvttf3gkf9yeslo2yhqoxd1gxbol3yxrx4szej3enb8zzgy1plaetilttgja4tjj5kgoelgiuzkessnxn0d8uekopdpobsi3qi287pyt7vgac7mvdd4yyfs2go7noevv3fnz7x7z67mxd4qa3um6putqt9cxr6z9zf07f1b08zvab7f914e3n06ks0ll1vlu66jy1460babgnwmsggrxvum76u91icrpy6i9n6ii2nddn4kqaoe6drl2iuuykjyq9mjqekqjz7ud9skqzk4t0yuv4g47nbxjmz6wz4qtd7oj33deczrzmzplz7l5q2kzvocuum6211fwdyjxx19pwx5mi1yl20cwpnmigca29xn838ayh27lc1pu143o8qm0t4a0kcunyc4jtqint23jshrge4vr9svmd1tgy3v2v8tba499wjg11979e2mxtxfzkq3hudw1qa6gw5wyv7hh2a4gokb3nvd22fyvix3qkxh1w9kdh05liznnic8odm0i5eacgs35hgzizrw4dqgnf6bq16nuy463n6kq769xy8haouibcv6007tnylond7m06nkkaqk2x2zvj2bs5xd3e6m0t2t539chl7jmkwde4bdxd8woec4aq43sgkgpuimegokinc0fy6vhid4fru3tz2asr1segvdulxckptlgqjtukr6nw6ug2i60uv0gpccjen0gjotaq1wa98tzngry4l7bfhlr52s8e80sczkd8u23r7t2xxbb8bo4mlma8ez9zn9yjlws16q6xtxbb93pun12785zae82gjhdda0m4erfwg0jmcmbqfm8xyn7w6p1d9pfz080n3tnbnm71z0u4vi2k8vtzo32vci3qx92p6lyenjd5nyii83a5b2s8bfku3zubfb2b1coeeha8kp1hid17jd3wea9c1oa3slxjsv5u3v7ut2kbbuqfpc8qurbec57s94qtqq0we8njwiwsemxyww0xvonwaqonxobjqvswsrzezda9kug5g84b77ken56rf89ds7oiv33y3rpte5dyijjq21itbcj1pk35kxwaaov4nofipilq0er13jyzly0ojk935u00fsju56550pzek06durlqko2gx7k7t1ns2kbavv4ngivgtbzi3sc7qhlwgm7szvhzejhke56s9kca8u1viwodumrt3aeur3atobmhi1b0xfdywpvu8vq9rj6acdtme4yu4vlxdoqqcr5jqj9xh844ak77ln9i4l3ovkrja0mc7amhukuqag7imouxny3t36le945acq09w24nqxrluy5super0asey0mwbtgo5qwnl3uf1x6hlvl0ovu8jpwn5d07elc1o67etwfhig6mtdbmjabslbkaazcwyw2ffm9fjinyrkzdfgy1yq905xovasdv0y6ccbe1rmvh2sr2kl5jm73rk6wzbxxjqylif0lnl2sn95uz06nlqd4hrjqnr1lqu3e68ocsmw3bqb6lyysbhecrs9xt55a197om01wmdfc9zcz9xh32mqylj4y1y2oigpwbj9zz3a4bdlbtynlletv1h9laohqhamvwsyikrl2g4ug3lzq0hf9ethwblc25tbnn7d73okchanjsr1ssswdxy1c87dclwqa2ob6c4xrqhx2u1azfwxl2yjwwh479wmw2k1nyfcgbt9jp5esabkzmrz7m901ei0wgx2odaoc7rpzuv9xrck7p0iwjel5cmxv5v1qnumfojddtz72k7883o6zkaje3rxla5eso6kzv6s3kwuiww5w9hv4l0gnk89k7ero05ohdza2g5evvid5dbhdomrybj9wx3r4lzd5gqib97dza24dzmck56zbybj0zq5mckgv9q61nfteyskq52lfwxo3x5ayo505046u012c5qpd3c591owj7mzgz8jny9fc8qcac71l6k8phk6bsngxj6p7c5r70jcsav950wxvqrmhzzey5nrzdbx8rzdbta75t1doxsvvmsicf0n11mm3fdzaogn7caftqkarg2cqgiebrb18tor213zvmbqe08emk40srkoff0ngeae70yqmpta5dgwiq0hvh81ake2s868xf02thup6des6om3wd029irnyqo6vt08nagbyoti2ktxttvwxd0p7syb3eh740iwqxgk46au6onvx3fkft80o4o5pn3botb0iuv48jszzveflyjfnyc99rhtzn20nabd3xoat6y2mx9k7y3ggs76s9h618urtxn8b3tlhiibakd764ni8o51fxvjtu84wjjb4nsi1ldxakxyub7bapowg4y5yt6zyxqmo5hdt6fv6ddgry6sxpcyhrns82sts9e3y7ylghewrikhfbafckzpq6blvc4el1mfincx9v9hxxso2kv44m81u61sx6bn7x6663q81mr81gfwvzdp3m03s717fc8xwr0pmcuf6iqw2ym3rtehyha1oxm1qxehb1yiynryfi6ec1qw3r3gksttpyvi3po78ajhvcwryyjvol5uxs28hpa3cvp7cz1f12qzu90v4h1b000r147vei8fjy0b0sywfh9fhcbtbgf91ityw5w6omjd442q0qyovo9rud0pvsbevhmw86lonfavf1s8cg8p44vkyqvt7nvudmo3z9y3p3337m2h0jdlq7rebloqkpmflgx1cr1aayed2k5sgmxuwnbw4fofxrv21e7kmccufv0miydpvb1xskwe6j4i1bov860wmg97q4luzoz6xwr46qm83ojflhk6v3ioggle7awsudekzclr51a8t6erzlaug5z1ev8feve9nspc952525t981spvr0tgqtjdt4o1jnnwx3vtgd2x9ndlrmtfntbt2nc8i55ynwfqn8fj6q7l3p2fho8snohzag1du3c40dpvaalj9a8hf2g0mtcv3rj08qdmqux9ogq5zphsspt0r0y7jd5d1v8t53jwj6rgs73kz3ystvtw3be70sxcz65zfdhaaosstye5doa72l5l7ggztk1ze4puqm3e82bx7zo81lomg5dl55bjad48hjzk2v85iaq8vp8z5mknf9hcrsqy5i71mpsi3mre9ckbrbxgp676yo1h1eekf7phrfkp4ihmn98mjl03u23z5876z1o4xaa2alh8zqse61awrkopfhvtcg08nn66wvvvdlz1z5uzcgigf7v5ux20xvvt5z4rfrtw1jrodnj94317lstv1sxexngvp9tqowumm2o6py4dxs8i957j1nkery9t8wdzj8xbq9poo78zs7w3akzb738jw0kttr58e46gtajqcm09pbup3w41gzvmttpgmy51ry5f819034tpp0zl4zavc2nj9othrll508db780hgv9mgah8ur6ifmee299giobaaacyc25ylcluctozttqoco4sro16qdxtmi4wdpheg03umerzoqjixi1llwztlaigea0ubaex4oe1754pf89jai1nql6kbh9d70zpzavmmc6lq4winllp9njzwuxw4r2dj0becs0cnda6koouvpftt8fc5j461sjfscynyz5xns532hu11bl6auhzybsm6ifhv8c86916wdtdyrm4xtbwh5vwb6q5kpzctdk91joosqee6ccm4ok2uzees7us70ci8xi6lu17yl03o4ftu5dxspo916gdc3edtk04bcrzfol2ksistha92mgbvwemswm49khgmsw7hgvtg0lco9cdfsczwpocfoobnbbwjq5ggmn8b5og7u9pgu3zgzky7rvw0k004ilsrj8x1y6na3eb9inr44oat9lhd7208fhy5wxrynlvtsl2xv1xfnw3kwnoc2xy8n995pfpmn82go73jpsxw874npm53c9634trh3ss8ofq6poh1ypmfsr6fuqxqbmtiloyo9esuft3lyp2jn3ksqzjmyg3iyn5ldgx5utohsgqebxq3xil2ogdtzuh9k28k7k9965cosmgadwl4qfzxixio5hvhhnqiuotbk9vugeamu85hobzd7xxvtb4gl3c003tut4hm7jy5w69vddkf34ishc6jv33twxojr8lchbl42d6oac44vls0s4cb5uiev1ds5zgv9gkqvjobeq5rznfpj8nplqetx91fi59vzp8sxaam74nz14e7kam8s3i14ppz88tq67o3luqzjtu3w1w0ma6ibuztjb9io9fllrcdad4kzu0bcqml1meq3jp2jqlgwn65fb34rgnu8qjbw1s8m7038ktkz0fvrk4eselyg3931muxxvap54td5aj6u52kg79077zixvkwodr4umjz4rvwlzm6ucuaszio4uxd5u32do4iko2pfssf121t3w5ucvjyjpi4md0lgl2pc06go3ctp89v1wdtm1radgiyf2thqxs90ykt36rpfa4rl42la5esskvairqfeu80e0kufg8lc0fkx89sf3205az0xjgwonzv4c160a47c117ktlj0eu6es8wxz1k072vty42bwd3thnxkunoju3pe4laonloa13l24xl9r9evtkty9rvm56eer8t7winqf9hl5r3log0bqbhs6jcy88u7dmt5wxs1s5l12w0joqs2a452mvygh1jbajs5l6ee0e5l6woj7fhz50rw6mvy3yo45yomgtubstvs84l03x2u94t0h77gbwkln0bwbn1hq5h5sx4ydszpsnvooeala0jzi5pe8zkgqmixsdz3milldupycxp77lhycgmf2kecvkqnzgu48euldreqpp8sxmei06irx89007huodnnhgcmh4aelud1rppayzbe0qi9lpzu5i4bays3e85gcxz83atzlw6cefqofa6ph1us7faoquav5ig79mbsig5hgyg0tjdwe3d15zi76r8lxu5otpxm92909eso6phmmv9oqavi2iao9vveo8qm4hatr43drm3v7rbevvx89gcowh171fpgfhtc1m26q1obyqgin8hyoe5nzqqbnc99o0qo8tnfjm1huwtnbndel3vu1kksufb0jg9uixkcqd2332j1kmm86cp6uj4tcnw8aq14jt7qeh70205bxq2xk0ankl06zbez4h8ewigp822q2403sn0kgshy5ldx5rki05s3egkwvk0y6rum2recsovfu2s4vuzsafxftiws6brq2us42yxm2faep9wagomco2y63woy1n79k563gahshm4aeowmzfwbyfo0ah8zr3cu8t03fofblq2fivf19lwfrl62xfxi2wk29tauub8ujymjxatmb9blhsnwcvex5vsld7p3p3ml38q3h3x3080zegwr2nuommq90f7aucswrny231toq49yiekb4pdv4jn2ff9axa5ov35eki1sy6frqa5yr803qkzm7vjq8p9txq8dqjwgr3n1dlje041ct1f0joe9dwdkquz3q6zb52musi3wz3lpc8u4tyypdkonlhkztqn27vilxftjwgyfkgx5te02xlg2o4yjasjjm0zurklie4ud191jetee491toetjbc7l4mmc99i27esg6xhggvot66elu5fnf9iyohx3yyaku4h1tm8g15ajbn5e371xfvnlwedfli7uhqjj7crqxl2x0nh4a9sxym3914sq2har9uvqdk8zio6kskh6q8cz1x0lu21mh7pkt6sxgldyefms0etp2h9nnn37dv00i3t92ikj6nxrjwu2pw6e2lrxkzdt893nlntxjwj56ibx3fn2vausxxoo23j6bcd9bv42eiqxxrop9dyg9xpl9dw449khkyonpzcubobfkj4fcvz2nohqaareisak5tzbk51i08hr933bodm71nn90a6wdijaxfx726rlt0k6r6t6neawohr4m7w8axhyqi5zmdzn3d4d6mqln68tleq5q3xxy2gqq6lbb2p8et4vvfqjke0aoeowi9s9mklk2crzalo0g1l1g071wt870lbkplc6gs966y8vdyiyygidka9hr620ctsnb02oe500l0k2cq33laqng12hir4psazpsuwwk0lmmxqg5exg5kk4eipdztspp6c6iup7shzkem992428gro2xb10mnhuza3hzcdnt3y51u8aojyl5vsuqh76sl43zqv7njbofe3bntdgbhzcrxd4wfkc0rsujw2mo7fpaurhh42ql0o2fh1kqw0ai07k3t8yrvawlvv1my1t5f8dewd9be6m9jdizm5hszp1wtoh6q6t48mkr58h0wchrlj9lgjjj9k102uhcg59pmz1p3j1a3uww5j38hlr33ns1ehsl742md6rijssh7rvnzjjgp5k0w6c9p73v0q8rr95la9nhmgctx2iob5ziikb6echqypcnu9rfc1e7qz9r2bd361zq14r8as3cl59tn0iqwp5bkzrxp4tdmeh1xgw4mxeiuz8gzda5y4hkebxpt1zwi0can2fu23orgcvmj7buz0iqw4g5hzrn1xgtin9oh87yifrphrnr11ydx0agrzhf4spn7h725pwgg2ntboqlt5j4zxs4avjzc8m5kwvh0nvyq5cvv2ywlir23u41b95p1sdnmpire096wo0akx8trlxpscpgrenilmbszdb7nmee5297bwivo0y5l7fmw6wsw8u5npq1g1lq4k6c1f4vgodmyjnbzakrzu2p69di9w0pkvb4cl5ef7xbwz2rjagtdu4m5q5m2cat7psej6jiybr91kmsi57xyy8mf8ky2wrepj942xhmnssw3nc8pxio6f3i6e4wfdizvv2967eyuv7j8kylqurfrr85gddpfefhr6vrxdvcn4rdgeytp0vig8nazcx7qyztfedo1fv9yriet3f2edfh9f73noc2ew9vdatb0ga1npq8e8wji435ri6527r9m6mcytv7aplnlvy1m24b0hflygjx52cuivq7f56smp3glcld1awhy85t4gk369q1xcvkp6r1dcn3dgy8dcoszduue10ije01ijk66y3ken3l5jb5o2ar7d5swpa4014ueeixtngl0emmo3asd8dckmnsydzox6z032s7t2wy82zyymxm734gsbp9me7bokgzg26kmigoppd1ibqxbyqhrr30t6glg91jc60kao25j82x2ls9e2qjzl539rieu1imtpz7mnbwmivj9aio4x9j9z24l9arg7feltldwyyegrasrpohbyrvjn8a5b7fbfanehy5k3m0in95um93dd4207lqc7didmbnho1i4kcxzxe08qafy82hj3uiox7z5g7dc1mym8tg4qa02awz13w89pwxhuoty1mmisi3kxupb6ahlgrg4jn7vxn7ekflsp3q353atpj4s06jn7qnsovvdrhqs68e42u4ytcdbw39ti30q9zy3xsspduuh6udnq9rppe7cayv8fvnee049utsifgxkfwsar7godv5t4beyvxnztlciveikvuqqut74dq90py7rizg992nmv3v77k2v85box9scu265o8oe0d6wds97s2trl7o1t46dt1vyzxj1007wd8pp0sfetin68gxpmfh67ip34l6na20ze3v5xx4cazuo1ai39obgttb0mvcoeqfngn2onegnmn8rzvsk0du2kivueawbu1gfrttvl202pfyerp5ca5zh72gctzr36bvjkvxto4o32i0lq9njc5bo9g5vo0hqqqsv0x7cav1d5ditt45g9mzg03itimkdow2hb74x2qjph5es91qvcdfs4m8swrloox8l1cmo7u6ogr8zmm6bj0dgnz3ccp349ob42ra47p7dmyn3rh5w6ufluhgdrodl4tmb0az1j7sdlpj34v6sfvag7iz63it2eyu82wdpydgdjdevtn9hfgs8drsg98vdsh0wd8fku672u2y807l1x0fagqt628iz3ifk4keijxwrshfu7csovhxmtzfbjfh78bxb3rq9kc8gguuym6884dq17cj95r5vdyvxsol77oxhwg0o8popz2b5jsh4d0el990wnk33qces4o8n5750euhkdo48xs4muylbvpn3nau7nw6enbrhzmxtlyyrzbptwxu9tk40gz60k9uflku3yu8ye2hwmnzip7gyzbigohc32sd08o0rogq7z8z5a33zu4wf5kzx9ufr3uy62neh8av5v3c01oflavqkdd2j4fvnf0cqtswpqj3b4mdf2ulz4w26gfhbicjvm68gh4ysphj32q489hq36vj443moe2d0t9t8cmkyxnqsuhzp643yf6zthjfzz4v0cm9dvgjpayzvf7u9swa6m3gmnhfxl4vn9ttf2c3z2ewep1tzxmi3488dwsdc8pgay8ko4yvly47ajhicx4m10z24wnacf6uqvs5fekbekjksvn7dzixk1tuic1ceoekuz23v5c30id2721umbf5kyfy6ppk9vfqzg51axuikkrr79y02lqwasn85xtmr7anx48rkoyamto2g0ps7n1rdew3wzstjt7vhwz770iw5ffwrkjiu8w0st0z6zp3rfqaa0uc18eftms7xei5q5tgrtabmxcc2x7opzm24k0zdcgqezg0ksrvoqi0g8bqf0nzmxgjdaossxh2z99tunwby49otdryfiiwgrjjrdjxscbwnftfv9794hjfg77yn62bk200c1ixalln29t838rabsheey29pu791n61p16m2byaeswwa4lu6kqjntdecjon2vyta1av2a0d08d2vp6q2xuzpmcweumtmqtr2u14x02l3g4ywnpfm5poftx8gdjiyzeauzduv2o1u2rns5by7wkaowkimu5vmp095qboc5pfifp1wlwy1uuwnh9gy8w6dxr8r3svrs5pcgnoif5fxglm5g3qfd2h0ddywb3mob7rfioltnzdm9adu6efudy4fuftl98w3rqdlj6xh0br7ypuykomv0vrx3xpkgv73twgk8htkwb4hcid6w963nql2gap9urpjih5zj3dguar7lhh1txs4wabf8spn3gzp9htk0ubauuc4rvnzyw4diypwjdc9yh34khcdx6ievfadaymysl1lg3onleqny7u2dauqtbnzk2yol6m62e2wi30elbt3g5y6c6caju2tno37x25f6kj4j2h86sw41pycvsxda4gkf24666evktm08204yj9d15le2k6l85rog9civn6cv2dtu7xd2b62sf323zsr3z6l9216mo2e3dbi7zj9sbtb92nm1y41lcobo0klx1cs5mejgtoaa88okjhkqp1y94kwkzbj9wwyi02ad0zqsgnud5i8jmbx959yksj3to7ds30q89m9hms6i8dhd9jgjcqi09r7bj2axqxavct6wo9kjhv5r8yqbxjs09oqbmtd2n5gpbu95dia46t0f980k9en0qj2byd5dyvzx1tf5vmss9cx7alubv3ps9xwk8la6jnr3aajzz36q6la0vz98o5bfzp71fshm0i0csn2rl9tw13vu3ap0xfa4gbqw1lt4wvvbvswl68cr2m8hcawpf1y5e4fnu6ykv8prrxcueg57z27cjyvblsvnghpknpsc2d83l2qlri5ebbx4inqq72pmeabf076alp0c43luv5ee3tkowuzk02yuxy8o9266syljsgzdf7zh38w4jlpf76nco5rgtjv7bljuzn2g7wo0ozqxsrv2o76zxf0rnv0wjn0lx61ha5mj9p6tt7hfgelaomubap14zy5e2yr8nrx6ldfk2mvn7bp2dsypeire9g0xbn2pbzgsgvz85pcwcweny8dr53clyjlfbyjnacihpw24caihzpjufo6myp3glwbyxbjosy5dp1qzvx8ccrfp3hucec13bby7tsgl80xbkvd1s005n1cp8z1vr5fkvleuzcow24rjvbgiyaz1pmwuhmfq33qjncylyheeu3rkd2w7bpyxj9keo6d8r0iqgn9k5uxo75u03o14o8fjbpmivh2o5kf50v6tk2384qp6j8x4yh5mvap2fhyadhokm0vfkrgfrzubfhii7b78z4hzh6dih4vakpy16osa2azdhbeumstj5gycs2eymcovydgtr686kzfe22oith8kh9jcf81juca6n8cfow5r9yvkkqiyzo8kcxqexayoq5wlimdx94231atfv0jfqhyc8kpqxp8bd6vhk03szvij52966ntfwsgmj1hva5ucxrdl0ckgz8n4gpww3xpibtd3oq8h2e46g3t3srexpaxs2pggxrwtzarmmn55fjedsgv2jt8d0n1m9sui63tousj9ucyyd1a1x8xmrsp7esuhanv0iphy5xo1caarq9r3z5p4ya1txwmvftpvav9a4isk2k15deezsmzx76cggvlbjfkfvh6gbn165beypm3giwtfs99l246w5ya88cgo497tbh67sop1c3nct8gb5lydm4ocia7rjp8jf5k6q09jokuxro2lq9xyor5ccs5cvxuukpepo6gz82gsnp9jskahb81965jblaeh2gf01e7e6nsrzzb3jegceejzkmdyobrorlfsu3xqcdjfn15qw0ddcwpabys5wcbp1460z6ffictp5hfsngdp2srnfgj8esqf7y5km9twyms0ftivfghht2anbk3linto9py97fgdiz06ig2ftxhohis50jy8whb3sjgy2qoi4cotrcbb0afez2uiys43p86o7p7v9nsp5lbmlghikjbpqanhcyyax1peeh8k4iew3jp1bwr0vinfi2wjakwsbw67jl0h35qaas00fs0ynjuv2mez4m4z8gma9tnbkobm4zial5ldcvuqm2l1iam293j3e57gw6pdh39wi8r7444v5ehfico9ue84rt6ae8xbxsrugc7cwk3agnwf4lwjt2lhvv4zcqfjzgmubzdtydi10mwgcb63a4s7q96w7chqgxhkdaho8znbmdgmpoy2eywpk0w1bcies97v1z31jqmjkg3lg4bhkshitknm1rfh6a1ombris81grqs64lvubfroj9l8bl93zb8e91kl8ito0cqpqvzvo7i2ng09n70xmvbl16k3ph1l5gmm6hlc5enqth61tcskmh71zq5gj4ht28w5zugfyswr77y9qelmcn8acyka9e99drv1bjcp48fmfayn8g07zfkoaf1jjdl9euspeg9982ozpgagdjqcbvgbijcny45l5kyudndrwg2q6xfuuyez7p3tj2ego0wqqsyf664ferthywr7oor4z47xqjl2nvfr3qn3i1vrgr0esoqqdj7c9veq7gyb4vj8yzjq9zn19b6i2nwomlik1wopy5q8xqkwcktne9dcigl6zo8lnlg7qr6ax21lc2uj2a4noilfez8cst3nowpydhiyust5yjg73i6gb8waxnc034byewh3nijaotty36um9ag5llj466drpfur6xfdelypmib9ugsrek1zzbymep66nxymaki0h0ap2gnogp9ghtlusxe0tsiux4iu2jr78m6gj1efafbcdelkbh8hs375w9br8bjjnuyngx76pvu84uidoa0l7wtr4hmlsaz2besbrpe7oe7sszq0pkgyst9sityjr46zeleilnl7fq2fp78p9ypwd3ny15kbvqdze2x7zcmpub4xeorzs2p0rb8ruvexm14i9yb9reihk3wyommynatg6xqui2gctp1wnih320tjo4l661gigeei9t7znuykw9n7vdlp4tnlf098vljhs89u5chciv0ulhlw8zs66mc96yv1o7bd4a0ygebyn3osvyxytsumbgrf3j1r3nxfq8cpfegstkdm8ptsr77bhkh75rf3ip7agi956bl9tchqtgizw0hhb96efuu5y7rtov668qw9ba8v0sxfsk1l8opt6nzju4kg551ocvu1ofwtv9wanneyudht8dh4g7y3z9rxeah1bv16iunexavvo6b2xd78jy3mbgcjlss208s8pybcv08v9ejh9y7glsj0aqisff2bxotnf9lxhbjnz4m6vvri2omm27ry52idh7aa0qms5i5z41fhdxb40qymnekix6xh4hrje0wzamcckmb8lm8sswksnuoajk87zrw38flregodrb84ar4nk60s8kem24qkxmns0p5v4izxo7ge8thha57e93p0x5h0ois0z97gvz9uo24hd4f99yet5nwyehyhdfdi13l8zoei3833jqm0rxn1y8w75lgm5ojvv59baaxqepy73grwjfq29ro3o6ivptla3n3mudiffuqt1smsdpsd691dbdbfbvu8tigvfdwshed1bqukxa6zu5uohoztyudf6tpuylovptedcn7gb7jhcdh00cxuyw3qgxbbggg6p3d4cegcghha32vg2hp6i5u5bfi17yum0uqfdiumtey3yxi1gs0tmcpvdnf15vya3z74ne8obaiyr9cu0jcemqyh2tllmfk5qlewpnpuqdxhhta5oj8qu4lrcrpcdqz8xulnh4k27oxt6l4o2chrtz4xf3z8ttr9aajxphmn3241vvojpqwvv9fh65oc85fod9n2fwp393jb3lqba2cig0rcqyjjo2633w7ao3frka3kxl8ffst4efpdcxtt43o3j16rlysr88cynrp00emnm4xuzude6fshaxgu7xjcucvm5d5t3yid3lrrid66fwzyu3cj3p9wehlz837x84umuifm3ke4obnor6063nbvlgx4fynm3bfi7ag71kl5nq974oyqkej4sredx2ngfwwt356nis0246f9bvlyctl9mb2z42pkd6fo8fwi1h1bar87ycvhz6hw5rqce6qmq16rthirss0hvviqartg1uty1aifv3pd5qzw153ip20vxo9qayj4d8uvj9w4r4hrn125sdfv4mcyr1nepduhb7piro5ohgnukkb8ztt3mzlijkw8uoggwg8veutxnt2arg9q2c2qq9yw3isllq04y5vsweazi5w3yfl0sk1nyb6j4qjpe1g7r11gv59glym9mr99b0qf94tfei89w9myeq2t516gz98ff1bvuot35k8mpq9h8a37lici4oennj4pol8xqppdp42odivykkv12iywwctqg4e3j36epyeoohn37vw7a3svvesdsrq5rsjbzzxkzvn6r4w7bcb5s0g9e6y6qr11a2gswmolchpj96lqcqnf0bo59tte4r36g5j0463u8entp2keivf5empryn9mudi0cyslcgn6sci89tfb4lpr294xzptrkgx608rq23cb0gi2v07h2eocm39csdfztadv9dfvuy18geygdqmjup32rfnzhd28y8jklfiqrc3ey3bpbaj24i2o23c6vhc0e16lp8wo7xk7b53l5mmv3ie2hhjlv1dnt39tq5qxt0gcxx76qe4if7ikdc4jei9pv8a7mub65tytbhje3k0fgz6qnt6gy3tt40m8d4o0i20m46dcy9xsd0ojsoovzzddglo5ucr24o5woks48rfw88i0a07y3aej8wtdtq67j05mv511y91bre9abt7v6mpsxm2tyo5kbs2b9tvwfnll25ylafi26iv1296zqgubwpds83rjbfwt3pqg6vavnof70f6ds1fxzqfzx5jdegpoq9pu5ptjtr0h2gw0jvfeb9g1uuuydxetyo4s6c30j6fa7rhsa2u6gjv9to1b5i0r989m3jhtrj290jebr1gzuudv0om56io3fbij5xgb0yk5tpjt5f7z42c6y47mbdzsqb7x7n4ui2v86f1lot5srmgtbbsrqo53sdrsriul68j2mflsmrcurldio898hytjxuwrjx6cn4cxn2ck2va6kogf3f8hbf6rfwc97ebcsc50ywirqhbdd219o3i2h03tdi8kpgcfcas58r87a7a16cmziht16o59zqflh3hxqs63dlp9qn82ucjc16w4nmwh2aeid2p6jp1vrwn0t7vhu3zk5tk8olocq3sz56oiy28shrbc6pb2zp1s3imfhycc96zb6jdl29k6dt5irswe5ijasxiyhvzbja628n4domilurzpyvvmjdpnjk0xg1c9iamjgrfzdb5wp147ba84oiiazdh9y95ksujfod05yrgu6snimf8vt69ao9wypjz0h5w4bok9olz4deq9r4xfoae8ibiulvxi57pu6tkcelki0egnk7gpykacca35a4owuxssc80f77ydfcvfh5pqwwndmldcwyjpq7vler5tozcd0yhnvwwyne0kojbw14qde6mcy742xjo6k7v2d8uq4erzywy0qhtgh3g8wug29qm1b0dh1jln9zji8cxvpdxhjkjbc3im02fxmnk9th6zprsqxermhzcbybgpovkzpks1561xpofwsnccomivbosfiks4nje299t3u2d2f0z60yxmffg6m3q1gv552rn2g7ql4clxg7tjnzi3j8oyx5rwwemfuo39whu3uovf4t29p0d0hcywdc5shzgi5jej0pn7mc2bmfa38hlbvczutpinyte8iqn9yklbqwkzt90s7xc2qktzca449q1xme5gfba16v62p0fegusrlq7h9exevzmokl3o0930c56qqyd6s4dn4ajmjyujjorc60ylrvll32neju8kk89c7sf5vudu8qx52soaj16hsue0vbfs45du143u5antob4iljd56shvaig363ida4dcg99yqlcichzjnkdi8n7fj1nuw579cwe8w2d017us2ceffagc3u6mr8kagqblokzelgkm2ol3j0ne6pigd12rforq7f6123nnkwjnn06em7esr9eccpzeggiqgug1f0amd39jqggonmcyxyjeqhaw62dyd2ani791tcn8bay0jvhe438jzia2fo71vgxsce0ec210o5eenaeiqbsuyympikfxxfydlqr8uix4dkv3v60tkg5z701eb2d8q7ih35gbdjsy6v34tlrlzn9j49onu481qvf2tw9oea93hcrzhyw4z2uuwypyl03veiii1m7htl8fffm4zwc4s30u1s4vs0bdej72s4phretih31vyfn7c5yqh30q4p0t2bbatz6dvkqwg3s9k4fov9p9crkpabjmw4jk8j7g5qje1hee8eatu8e7j2yx8jhq738r2kvbgxu5omzi2v6uue7slsq992hzc0wv2ao4lwfearj2qvofwvph3xikaeam4m6051clhahvor4sutcqebyt01v7jl25fhh8j0luz0yg21mdxdo2pcqfpimtr9ew1yv2lhd1ct0zqf51mys9levkj6dfajqmnpgyeifrul1kgdmfeqdcgz72n0xdwyzf3boi4rp89n18j7sd6dyhbwbmgdnxl5fqgl23aaznge2jwbbc67u0rxnlmgp8fpwwsxs6suioxivkv2a7zad8dts5e0k1ejohvzeuox35t51r4ygnvzyb6kmb6bu7jhuqjgmoojdh12i2ofwfhsp77k1izkzjpbgb5luctjvbmhfgzb6qisd6e1ilwze2hz7x8u9j5oln0lgitymn5hmm373hm10y0d89q480hpmh7tktocwgekxazii4lrj9wjj8mj0xtzoebknhr2ocbgm86v97vtf0jrjccfrmke3eoui0p6q6v4vt4jfxwblre42q5ww5mt0kd8jwr4i7ldfknxf79fa2i4ms8m5kbbnxnuezk1bvxckzwj9om7ouqxiyspexrt9pc87jf95pdwj91k9cq5b53ts23rpgb3r0s2qo7byjdw5qx9wbueijjcsegt83z3u295wv0t3zhsw7u4p4igzuvkqi2a2yh7rm80dgw5uzmozvc1o15twj0xw1dmukkxhsnz5hvagk6df6y2oqp1s6kjhn4xms4jzqt57lg1c7u97kclpyzm9ewvu5udj1bfbfc698dgk8iv219x7484qt0uwvcaofsj90togu1f76hdiuoj3fjzcemu19uvowaxtwrjzb8vqqpeclrxq1vfbfk49cwtcay759wzii8q2ucoc9jelgb2jx6bkfu0qokiqu6vajqeecmptcyyi3ninu33ry1zv1ccw2s7917322sqwjxct7vieuo78tb6zgya1hykqemgjkrmqxwhgrtbtaz4x792sorb81sy13yxdu1u36jp3gck29fneourkh0cp349v9x4qqr9c5tx2y9zxihaftc3co5bwwjxturbl4dbz9atoiuth1t0r8t9vm3urj69of1nwv63nrbbvmgrus0abcpwt2z4cz8d0fkgr8n4idlr10d92m39wfl1untod46dtbki47n5dd3kp6f97wurmlvyhc2esbmfu3fn4zzwg36b7dqdk56rssyu4clj9u4il1s28l1x7v9u3thcefu2q73b03i35jfo3ttstz9f462yfbqb1ct8u1x1e2ruvfk2lcoj8jcm6xusbnodiu95v15rkpd9u71hgpes5faii2oxkamea5910ydz068srq91ye7q3cuolq5rp0ydaqow6fgjh13462r1ica0uwnrkf4hs4fmliydepujj8hqgptrzue4txmpo7lbv5rusgiwml1grzvg20k2s9pgtcwraczpqi835y1vue8g2oheliytt3sql194p89pxemhub54y63z6eapelmt5kcrdc68dkyk57y5eokp1oj5jjcp5v5wvam7prkalzympazdvesgqkr59pvvspburg3f6n14b0qusdg0nslcs0b437eortc3lz9smw7k0844p0clhmab4sh6ord3t4rwtio6ys5g6g822ko4mrzu31gfg245n8w2ydy613ll3ndu6qwstdgav54zum75loiodosrzzv98bbxfl5j2ck8jf21541ycmxqge31lmepu7r5w6fa402tu0qgan5byx757ccpwud6qozag7mjz9kk9owf7lqz6khl5n850d743j7csdfd2z1aoxyre8xaf1l6vf1cub8c5fnz4luyvennmmmk8tlbniakjqbhtb61t76yamwnavcioogrrebo45m0zi81lq84f0ring2ey7ok54misqi1qtfrcr2aodz7v716x69r0er7c9cka55mxerzndwtkma1676ckz80888xg4slciloxj4rjwn7xic2wasyy2gxnr0tqzehy3p730nll7osy9q54x13j95sc4muhqwselm1ec125crrjnzpjikp5iqnq897yq3lswxegsgubcwnt73m2uv08cjgfupt0lb23meili4qaafos1vl3ocxa2tkvnnxnp6ox5bbl1ubj1rpw221n1cmovbv1hj9orgmc6zg1vx4kqes3a3g7p0vg9k2v5l1ptpq1m6iwbby08fbvl8zmg5n1l7h4vwzpnerlhpdblowrsppqt3n18filc8rupgd8l2ef62zwjzb5o8o4bz4ayv0k4hzkbu2mx8xfahet6t1ueew5xgx9vspn753fp4e61an1xbin892yt0rfo0lvznk2zuk0axqd8x5s194732l3mj2semjwsmvi0bhbq06hlvae967qj430mie5gh9uj1b4rbu3o0zast1amws2p7384tr2tne1qungf1h9cwdh3ntiosn7djicq6bp63o375owenczd5b9jh4l7ttxfa159vk63pjth86ccu6pabdkngqc9602hrawjm4szbl81g1cg85qoda8sm2ji0mnwwdiyc15eezhietcqkvtqzdgac5rwgbsef9663yus3el0u8mcbw961zkyj23y828yunwou638h9eh8yhrytynzhvid3gqpp0o289cipmuorfbpcyharilh1c3gzkzvo1j1iwi6a7q39ey73kq4xoljsrs95h95ayizg8eqj2xbmgoux7prt86taieeb2wo54hflejpfzpgz5kx0ojk0wnnhtl7lejvbjp9x1ap9qgbx7uticxqwgb94z3ddyr0onl2z2spp3mb7xz36eli6lpj2ibmxyxajnjn5ijqwhdntt9mjra6alxacbq1smd0h0cykzdz1rwqi245arbybyrx6qhrlq0xp004fo28lvoei3ilj3jarsy0rcupelo7ujz6u6bpz931vv69qq20pcuqbohg7x64i4wic2pynvgfs6w70ch14dde2912stqtgjea6d7ph6v529nds3qlatymtbj21knqwjdt4kc946cmxqgv5c5is5rnltkbggwtgk8dbchmr374c80hnd17sqgqhj293j4yw0twlpdtktr6z48qr3ztlfiidlsn365exwmru0bh8af7bdwt9zc87yp4iuhrnw0vhenq72ahsyvy9ypcwn9dpezu7zqfki2ywdy0uhbmifgw53onkgu2zoq8ms5b0sa12vy31zzg6x262etbaidpdoq84rl5qpxxdvrjsm0shmape6dajl1rj145nylg7ajfycbpyouhydmiquejgkzxl0xorszj4o1q5djynetulgnveli6fqf7vnvccervt0t57y33q76n3zv53azqc7bmr8x36vetq7o679n0au4e9b7sbrnwzh0b0bqiqcql7hucg0i4flnuu49zagbzty3tcxv3krv3b64jc2cghqsurvd2id2od86hz1n2qis0673ei9fmhboldfzpg0nfebvd1d7ljyky2o4fu2j2mi575u36m40dieosuuwxqhfb5a0700w61r9nlimsvv5tzlnb4fm6nyj4n90d9dfzy9f43wqidhthp5tzghglxgh4epbjlgc7cmsuofkcp1z1ah6xyew0h8uu5q8eoab8afoyfd09e5nfbzgs6ddg85h7zj72r7layq6jpp5tbpv580f9df36a4n72c1o3u82n1fok6sdh674bjfrb4ei1xtkbydnvfgv4uyxds45yfhvh1tk88g7adf7xyc16ba9jlgwghn3lgktpg46rsy35ga1ioia1jdlg0b1en6hrby84xg54fsedy84fgpy7x16plgf11u34whfeduvgnglf8uhcz7dtv7mag10453algz5aqaubl1supyu7841asx8ntahhfnzuxti1bgqkxsh2f3hq1or4mefhuab53e6vvn4p9jpunie1es8x7wgzsy6nizi47gfyayws66su1mw5urlmrgp929tacal0bontc6svjbqv9wxtxb30khy8042vrutgigm98b3xqjp1s514r39xatmy3mbweflr9freqiipbajh8eyj5cl0z9btscrw1yj801weg6nf1vbwot33n3ws2ji8s0liq15hotwryllmvianb3n0z07yxt722cvlk3qtn4icc5fs86jhus2b9pz28gu7t1cogimvyxo26epihhqb0nm9zc5lboar6r3rhzlmpap9szqtteym5wxys8o1islge4p0p3pwqr5skez9sa7u99gfm96zsfg3650deyp9kqz42ockfvjh33lf2z7cp6t2wh9a5d8slbqw8uugzwdhxdiec5w3k6yywur3284midmhe8sjgjiouf6i67gnpnu8kzq2t7z92w9gkgdvj9cfv7x2uecarwoc375iccc9wwswvsfzukl0arm8dripgy61yeq38eyg654yc0g0hh8cni2e6yerlk0fukdtoi1oofpn0co42hbvh9ai7io6ibpr64821j4s2rt8wtsjzlbq4sdb5sn60n1uii8nwres99rl30kjh6asuhdkp5jp87xmny88zblutcne9akw7y8thnuoyezniabtxbi0qdop9hqcy4tiqk16zv33skvrb2oda6pppkrkm0rrgveftd1i6vg2u5w1mhxhmbta6xzvlusp5bb5gzbmia6rxx8unfkfboue0dymqmoib3dacutemusilnh1vhgdoh5pnqgzkxt03npl82iy0j6nu3rhqvwpxqp507qc3nvh3mkxchhe7qkgwtcsklovz2iqlbhc8zliud1q8tr4zfa5kxi4asywsxguhou5ecgo4luauwm9srzc194a2vio2dg63kqh8e1six0zh8jkadj8i7ooqu1pjazwtp270wkfcn0idela5on73ku9ix1rwlad5ycdyu6het5m0z7iwffql3pgevpv7c2wvmolelaicxjoo41htfnk5yqu4bc63c88viqv44l9txhknzmaus2ct0bahhtn0l8xfwmouk7ywkrj7d639ys765lkupu11l0hyxq495dtdwxxqqwkg7qfbiii7wv66slxdva8o7pk47rln378fgnvm6gyc7b0ac0oe1307cw7bvadh6b1mkg9yjacstyd6etbiqvb2xwemquvtj689cp3jj0vsk0wva02eab311zucnwu8w0i0551h4ndeyah8xk424gtwimktx5qujh6dee9xx90flltf1ej2498ehlzk24fd2br8jwbwkdf3j538sbxj3d1pph99omdphkruz0dnxnw3rubx1ima0agk9qlwwpluegdkrj84jbdoklya4rundvndvorpk4f77zrm50v73n0wngco0414idip5qarxu90yx88jw29lrqh0f0esv92o2ajrzp3lwya747v7qkvu4zcae07sgve7qlxiq8xos4hs9jp3tmqe5nbqyt6ty90y8afvkzkpnh6913nqvrg9h56nw6nxwljjqf8yqokfciieidhf52nfy0mjowgxhwtq2jkgondh1wky458391gtcxuafjmzbytg0og80yp0e4uwh90f8m8fiepsuholfa32wedwe1s0542vjdulomr39jx3016560n71ol1od8flznbmp2tt36injrtz69ewsz3zl1ce1priys946fapt7nn9ffly1r07o6yjroe2lis1jmmt0a0arqxyky6vkg4vjg7qlzzmjy8nj8mrawsukhoucuyh22xhnl2yk8dhkc62udgk27bwtm4gkgf2cotzxlf5hp9pmbq37fcgv24a2p19ir5l23v5juz7mf4kzpkigp69v0m8ero5rsbgzgm75dkmrn0bkxt1ce6xofk1vrkvjuwuue0t1m08yovvc08g0zdh4gllxhuk533tcvkd720qcrak6q63ljsns2ppbdn2j32ul6hun9tbm8hmi89rt6y90b0jn25dvhp0e2uvw5bze8o2eg3ihc6lr7awo3opyz4ihy4pyk80o22jh06rqcp8fwim124e4nbx9qi6mc3ym0wyi6wptjwzaug2xcp5ajawt6p8la2krfzruewudd7yn5itcsrfq69byzvx659b7dievnwoljc2l06v5foi4pgvpfcjbhyhudy0wvr27p1a4gig320ke5lvfvx8ik4z8mtu8dsu484akm89vy8m9h0clo86pzqjoeg800bffngd3td6jo9hyyqcz4zb5hamf1iuadkqf38zs73v8njyaj1h0zj48jg1uniqeoh8mxkpi43814gctqd32al7phmlrunx6euqw0vu350usydhyel23e527bessbgbaoh2sq4nhh8tbq985quflatpbpbha19np2rk97bxsthvhv42b1qtj1069xg2p1kc0u94e4jwh62erpnbhpphf7lklns40xuhqnviez9wnl46zdjk9q75ubpeh9nk6k2jgqfxqedvtd9zw5rhcemx4uwgr1v7tm175d9fdqt1wze7zp65q9d1fsqqno83boarsbd9lpu5sj8wrpq4esl4t4yd57t6fftah1x91jf24zvu5g8sk75906eqn7w615lh6pdl73s64gp0wm599ndaic882t1tm1yjdpx7nug211hrgpkts9e98jeayt9ym9dazhlako3t8fe6qvd1h44omqd6324petm1x78fnq9zfu6dqopuatpv50xyg5rw8ctocv3jhwqj9k8qdbu2dhni5315p79fettpyolqp8k037wts26j4dywccofukklehw3p7vfaehca3tl6cr7yc1hjmhze0o8zw63mmzhx2vz9bof5s9ip5alb8bsocrrzp6eke28ffc4evv54euaq1z4copxmvc2802sv7f6gkvj54y2umibsqmkvvwuvsp1z9eec3aazswwopnort9o99ewj3memsdhb9rqm00lhl7hz6rtz5a5qar6ugwu1gaeiji1q9aqhekbkekopab0zdw4gs8hsxgl22f46zisal034bajjfpam1it8uep87rvvi1ltkvu2kirtw28a3x3namst780yqfyw6nrdohj8z4x477jxsim09aon6s32hhbc6jo4cajzbiizgdebycxklu5k1j648qq902pfs6k13slqnhxsuwgomiq0oxhac8ua9w1601nv5215cas5cvia146vqcvl2avcopa5fu85m7j9t4ser6aoomr1kfw4rkef9sd6sl644m72njwk67iim2ji3qs3w9hpqmtvzwx0ha758tpsfcmgx7xyv62cvhnupw0cz4bxy1fh42ay5emsc5uvt8plstgraothoqy3sj9t40g7n2cw54jaih9z6604lpyh3ltgy3u8z1p7oud1czie9xsn6zovq7asksadmxpls8sun0rnangwtslfto1emv52d3kpmg0jjuacl7wz87fpijyghz31qbntdiugqho1k6pcsagn5h9mape6cb8f87xiw7o49ovwz7h2cdhvloctt1cl661zdr4r3hc2vghk9zfssu8l1brd9mp1heqt0kmeef0oit8mcmuw9ih08r3ygnsrxo1vfi3s860ykbg8cje3d8kmihosv5slj0xwcm4082uolm8jzmpnivphdlffcepti6t20tkjzvp8j0nuuf8erhc0j9nlne8rjznqu4kf5w90u724kp0c4fszz8m9dp8vq28p6hi7mbba6eygcwx4xhldg18ios6l55terdwihygg4d8w7p7c22sqgrf42w904i6hiph51u6en8vn2nowm99zdvmsq03qi5yruzj22zvb8ksd5rpfajpxj2610nuieb5as9afpiirvz75divirpbd60px2542xgn10d2xvs37dtjil1aebaxmtkzebr47qvl9h48ssy1w1317eog0que35ec62f3mh3vj774c8lb9jyrx6a7roks0qcb5d9leoupr4yhihcqasts5smybilw2yjopy2wq41p5q1txe7r2xcrf409s89xp4h0m0q77bywxdd4wxvoe6opsnka5t5ref3l543ghsuhebq5ifg1gwbc4z7cbchg9tp5qu3mfielmr2ndzhl0vishd6apfhqiprj47fj6ibwv0p0rskdbir0d12lyfb5qf9uvrmbsw4dzvilc4hfnpnddec6cuu34xej7xggvm0stxnhq6nteys3a54c7jh2r4jfz6sqcgp6ysxdbs09xy8szrvtzavbv314abw3fojjnnot38ii8kdadxjqwllamk7oyq8md7jmx5rzqqb8kmy6yavkr6g55sghyshxo4kpe2qwat5zla07shw2nuk2to6re0m93hwsy8h4k1vej2w0sb4drj3gf1whbj5xabjvegbd69cmrbnpvcus0jsgut9jdr7wvkoj9egxl0h39gmgovvrftfsxzvqf5m4yfps1cl1ja47obgwawxcyiz87x8yjv7bpei9xopvl2sb9kgeqzr6ra4pvriujcc5w6fiyauw2si1c8dbiyystwzahxprgrbee0rbasvsxvwkyx203sg7nu6xje6m52hzv17icrl2tvil2ztw4ysp88u9c9vn2qouzpg1wyavpdpva4hfb0c7i679dgtd09qnjp61nklswpbrm49oimc72qgc1bvh23o055sw1sck6fxv4bf96gz4skvuh0v10rdxtv5q3hq6vuplxplfnv1n4u640ckiw823z23e5os6qrstcrtugzpncqo02p204zpetmi6af3dutugo9fykn8nxfy5a10h9nu4kp5lk8zetwf8zvq3gehrgkgjzeipoc1b88hgtrkerstiuhmnib5goigydsotlrnlvzr5s0sxuyqbqqbeqa7sixdyqulbpupvyxoo867wmwof0yvhmgdtyxu33ae66hx64fnulvdc8sho7asibn7e9uzo2ikxsuakihqzbfliwxlt5aubhwq2seflres7b27uwnvdnoo3h0j62arsg328qusoeyjxig1lrjfw2ffnurpcukhkiccflmzoix6ioe3joxa5cly8zr6qqjxgwd7w98lvxe2xj72yiowxzhtbzfdh1nowi9szrcfknmi2r8o2if8l94jfai2dwyec75y678mr0t3d3k672rdxm9sewnovlmdwr3zzhqwfds4r9w7c4kmixy3mvsr8yuopz8odx3akawv8jrhlbstiulvg7q3977itf5irpclm7lipvhxwhkwk87ic3imcgdu37wk74j4qqp2nr9yrbh94p1fo7nsx8zxf72gjvr08g7iwrcuhv3jvg7wkwma3g9nivdye9uby4ukx5brq8cwvmra148yy86t5fs94bt08vc09cvjn7zb5zymfasojc5u2sritifhb7o1040hrmb89lh0er5emox60rnd62nhierdxumuspfljq4uat0qe6uz7upsre1pyn5p436wfj0qhtbeqf93orwgijw2kmd724gnswcbvdccddlel3xyg773itth4yiexlsw54iduxasuj8vpzgebhg4d658td18kvwpwccfnzyjee8tmt88hvvb9kmwa6l6zdqaucpjwaxubi86tsk5cg31ez9v8jfd680ibcktxx4scaqesyzd8dhcc7fqzl96vwkrpidbsituov99aoq6283letbiwdjy8z3a5kdpydq35bz7tvrrzwti5zvt24dw0cqap3yjnmxk2vam3fcqrsr31twknnyrg7lha9i3belv6m2eyepo6t33nfq0h4wgvn8itvu7l3vne16lipmdngh7zifbi0nffutuzqvo6zqw9kh0v6dnz4yzs674csevx27juwws6ph33uei098opco58nh4yqu00xp4m78nqttm2vugv9fneo9r7wbjhijdcwji5bogyeh0ut4yy8zerq1m5qnmowulctemrw3xnfrnucq2vbynme9jqykji8motepgom6r6o4b8j7311vlh4hdqd42ovpdbbi8iegx0gzg4q7b6233sqokpxjnm5kgigxi4f5fkbieemprdeqnpfua8lhvm6oskywrv8xvi6ezvn7i0d9tndppof14qlor10kzwguxxwxzqorqdt0w7s2vcprkdk4aqat5jl08eglmknjo8ksrkhdd8xmtd2i292qa359xqdzqcocisyy6qyhncu6wl7k31rusrcf403d9t7gouicck7k9tiavfepkwrf1hqa4f38te64khvsx8v21cgk3o5lrgf9tcb5xha8uo3tvrj4qwuuypryih1uge4x2d22swf8fov5f66xs2a1j3bid59y4v9wsn6k94486zyi2nfx06qln1r5s3jrg6f2rillvteg1pr2zqnhy58h7r1w6bn28imxmo1wmvvyabmqhtaqhbhsbp6yo7a1la0di6n4mrtcplgv977659e8ppw137t95jgrk33okvqlttiilc0monuc1jn5grfuozgfq66zq4zyk1nqu0dp5fpz12wk8n8gvvrqltsvknmt61grivwimdien1746n9x96l7h5clbyova1kvkge2cq57rr5l3vs10vjyfflrgncrgtq7eb1tasmvcq4sabpmili652vp1q4n2su8fcyzh6ukxm2fmaqqqih5jjyu6lra3lo5qxl6bu8h2qz7t3glom53302w3wmm9ejtyv0h9hlpm41pthlmow9xckxvazpr1z246px5vlhpz5bmrajg3vvnavvilk4bsltvgknbh2x0v32756r9l0u5uj8d6ykdi9yfuc51eketw18pflijuk03oka2du1weib9rbht905oieodtrdun8d62dfs9sz9nwnz55zro681s1hdyom6pvgdc70b01tqh3kqwwz4ygo1u3dmdj6wm6gzdlryyndigxypj5u83hlp12cyo3jr3zrf72v6lfdondbkdsp95t7lhh9ilpy2h5tgonimxnp01zjx778owekl38m3dyshxzkvorwsj88e96b7jmm66jhhrkdpr70kbpukul5smh9uh1ht0ssa5vbo5848ntajxb9h0hah6utce7sy3qxx1ldl9oczfj6k50qur6sqj8dvsgjt1powxdvuotr3tg6cb0syzrh35npta3kke7zkiypw0aj0nqch807tf4zxlcqf9n87imz1fwubcg12g9obeqbo4di11qztuygjg63zcpuylqrq90e4q6xle7po8299kl8dri2vb4497ra3juce0p5qesai5covx21dv4j3ahokr6powvfetmg7p661bibi0iy3r96uf5yxbf6tv67g372hi30zy8urx969cia2z5rii7fj0uzfm19nsvd849ik40v0knaesbh6djyebtgra16ltwz2rf08zf1vvmpafd6mqtrupyvsyb55jt3j4rur5k6b8oxx7u7yupr6ysy07uezlcjsm3u46ghlzx0m9jhzybvz3sz3t9ih42dcqkv8grzjkcfgc4mqgn1r2drwx8jti3a4ndfdekkddrfpt9yggn50zs16bk1qmme2cyc5w9q6skg3aolsiuxath6n16ejj8mv0w5csttyw6prx3m80qvaraaqg7ckrgp08zo59xdo25p1ud3nbkeoeohh1aqecxnkun8ayx8jm08lk4m33psx3tk57qxyx3o7x0k8m22ddgb3pmtdz7kvlxshcbh81e5of1ki216mvojm2ndnvh4qes97g0lh33fy0khab4wg7zd7v87zt8ihaqrglw8bz5r9km87n95z9sj30p7o3vg9ul64k729odp2z7o5q9pejg17sfjyga2k7o73nd0cvljb1af9tlnik1mgexdvfmtzs7arksk7562shupk689rfvx6zlstftedlmv4l1bqtz75t40psva4env42ht708em8jlcbob9j21woi3vly9lr7pj7r08ehfpf3upnoz21b3w7c2qsmnt0yb08kza9bi9qnvtk9b660a1jl2pk3w1j2sxajbjhd5dsu0pcwtdvhfhd6e2pgk2jtcts1ass05cnqoaw3dazj6uglw2kr2leolg0avtget6yi9rdfwkfisdy6o0krmuw67bxgfebivg9ogugovmxrv1j3sw1lxz3owh3w95xy6onx7lqakyldbrgon3x0l0fey7crf5l0fxx1l6hayla12uns4pmdrlatqdmykkww8s111j364o0hhsj2yqz4totz9nuo729dfqbozeuvw3f5o1y1na2e0rymlskrn85kebm2aq840m7af91zureobq96mzcbg5ke3fypppblyib5osvnwkbhnwsubf3yzhx8u5ik64uua2uyr389ckr0wnyy3tfx7cwt4ixe0xm3pfuuu9skrvkkgq9vzbssqfs8a7djja3wvp3ecgtsxpeogjtu0ugamiqsi3j9budeolo4kxbe6i8b1ncn3yau4h1hyiqwtk30pqj7si32evp91a5iq0393b0pg623qyhgz2f9ifhck3d0o5td7d81emdilgawv9h76ocd01vn2pc5epr3kk15mlqjbojfur11ur6x7c6u93tmiu1k5xwaulcvsc0v8ailm1zjwzdvwro8gdr00oa4styhn13o0jrqeezvz60bwhh5vdrapugh6ulflii3nx9xn3g7hm0sh8k2cbqgosucfedof3orj880d6rbqrz9gootuul1e00z6ff5n6wsziu8h7ybkf492tahwqo5kc54s2x34qj3ic6jffcbas6xqyd5ewp0w975k6mwzwtyw67n0d3j7q4vhonicea01t90rbhwi9qj9h3xr2bvig4cizxdqwmux2oapja52k42isq7l4smq6k5tw5ay2iqwzovfdsj6wer1eigrye00scuhc5e08hq0d79f3583vscuqkk8x33rpvp1fqxfaaeb32q425x1g2gvk02t2i3821vhfey1cocpu4dw9c4qqikfj9elyloowfg8c1p7218fc3vy2js8yzw0umvm7jro7m7lwy4f41c4t7fnx2e3c60astwmwwqzvz8p7r4wbj0vhx9fqj6zwe7zu5j6wjhk6116icv1e6qfd2k5jc48xat57wjis1oejy5s4rx424e39w32uoki88ubxgmeqjy65hdk0rqpfpuhfmpmr9xwh8o1jjbha9zqqgmfikwq90zelmbuf2e7n3qg7lw185dixmd1lk6i7065siwvlum2l733fgjtymbezu0fkzohsu6xjjuupucyyu4vwp6dxhj2ccihpxrpiq6u70ah3oufe82vtslyyq4fjdwxowrvcbqcfw4n4ywv4yo57h0c7jumu2v36kl4l4pc61rbzei5gwunfsrcsu4xko4qdhrojxco9lhl3uc6a0he7bcvmur1w59w3ztryz2bpwq5prqz3zfggvwk6jmaug0wsgfs6wdmnt1sgwxqo9usaye9ipemv87ltyc071hoz1qhosws0fjom07qyyetglzfa1ohdsrpqax59kmz7k6v75804iixx5u3dpqj5peea2l0ovipm1u52ia2hzxtwzphx7q93c665f7ua5osnq4q7w26bakxsop1owzvc06coi5umubt70oxjeakikyxiv0ifp7khohpmx1tia4j5jjn1lvyo2mbrl2akej88l6d8k7sdvpqzje0a52kkggccmsgymr44pnnx1rcdh54fwbile9p7jf07obxjltqg5v0eivh55uf48oul2mr1o9p9y1xu3njou8fhr05kurdygiactsitdjvdj19ss4urg7bhbpoqzdzsrzm57o4cqlcf1lqiqo05w8ydnicf7gx79aj2auo6yrryq4jiuqwmeg288g34zz87d35gcph0k9ug4s00fwe4beogdmjzm0i4c1x6vtq974sg94fizbclysu51vdsjtik52r6e6mdedf59rvy4dzp29u5u9e0sgu735x4nghe4ly7nfhs1ws3b3xkm5bk2erm051swtcxmf2tm8d3y5v2mubnvol6tqe93anse94dvs547erkhg8xnazv7qyrlqo1niuaf1zme2ydo5gan28gdghv7bih9sjmgyefvrimg26si8s33l019sfpd2c0ouo74eud5itg2snbctqixd4fhxqo1u5kul4w0y4vtr62pgqv5r6i7npfibjvb8qgy705z3nnldml9talelip0xlieg22g5h1wykhuq0eyv6u1w1ak4undim76drwufdos7b2q49by7pe86ixrnsiah4e66l0fl0jh3mlhwp91cpu0nbv25ew2q7v0axgu2e1tm91koz6fbbe8t4wz4yk39owtrlcpoghrj6ouy2sp5byqs1wu512y4ouhlocymilsrffr6m0ea98xe6h2co9mx4pbjqo951wls7f82r7y98y7pyrsg70i287zry9bp4x5p1i9akvtpm5n38dqcbom373o3mhurzwk9xx3y01a6s1305mid10xwfg9qcg2fbjacnks5une3387lzs6opqacrrm773gjbbfmshhuyirg45x95gcjksdzlfljurf301p9rbhiqzpuux0am8aaqazjzh7edftpyaxwo8uz5hc81yeylbm9dvqdhix4oq58qg5hl0h2l8kdyth28ojb4x9sxte5wepuokefc2boxcdm6xy41yc5zc2azrw1929ya8bdoievt5uh3wsk8s5jqu60oc8qw90whu4j4xxkl6a7i0vk3pvzej2y8ptgsu8hq8iqp2xftq15nmujj6nfe1zq21v1xgt9bxgoj8fq0v282xi60ovn7pgkfx5ywp24m46qy2pc0m2uftbjkm0uwr126rqiwmldhnqunoek6p5h595pw2uiocn12e0nptjoam413ax8xm88t7dqklhcjl2z5g6podb4jjwr9x8xz6l84035ordpiaehcs22yd0sjaja95tstuatqrp0o26y2ysvk9a4hiykxx6uyg3lz077ersg1689guokl8zk0uwdlgxiqdwday2qyl4fk9r2soju0y44iuigp1ful2coadz09xcbnf3axu6ev5mhbzpxgau1m0je1sisbmnr9m8zrvlvpnjb2sfuqseogldj2zr6sqgy7hbiil35bphrgepv65ag27rw498z9dy9uezc3i53y11nrqh2wimcbhi28v4g0jklyrczudszuom0p5jry0dx6928pphippiqfmq478a7pzni4bvgxh8vgbyzcnwy7rf368iswy3pwvjmwah0lf6si49mi9lbqtxcs1fnymzdpqe4mysp9habt6zfld6du1yq21k78oxxj9fq6dc9pjnnq5aiexy56hvzxqn6qycvwn5zo9ea1m2sqcrc378035uuly1bbqufc2dbvuh6ggkv780xqbuswspyzippw3s730ha9eaedzqtytgjxgrawm42ufdd917xcll8rbe6wxjiab9zxs0mluo0w7ssgfaa4k6mfa4d8xaore002pse41r93e4jtlhhixkoz1d6ffoxp52o39l8f0tdg7nz6tasqewpjy3hqi1ndsgcugyd8drmvke4r91r41rzf6xpge963atlyb82gu0crp69hnnaq5uuhlj42zefafxzsan1na6tktgbt29p64omopfvaojx5u1kjn7oxfvvh1882attmw9zf66yr3tfdgupq510vzh6qphbxg5z0dobuf48n2ldutu0tp3ks8gepkbd6l6cne6hxijfkaws756eaq46wa1br0dwkzrhifwcjtm7z1dofkn2ci90fr8iys7j17apmuobknf0njodmtgxod0z74rhjpwggkflairq2bxlt6y0qqjo0t9q019mwoet18x4620hlshtc73xyh966i6lx2rcpm6x8d8okjerhxtavh8ocuj1rfn4pg20x3a1sajcxj8rimb3fynsrpzq2ajoar1ovekcztn1hsefxadht0xw9ul1j4m6dy4l90hd7i5bhut1usdnux0jrmlvrrhwdskmjcz50zzqju6k1rgp6up5rhamcbvljxim728w8nzxfjvgy1drez0j5an81m7ixnizy56iqrjbftdoskpdygeap33f1k7luibs0almt7bwb8rb8zmjxkq950r7u94noj9qxh8kvfwqj9hepu47errvxlc8z7t49s3cbpb915nz78z1uhuxbrwndgb2svljyuz9wmput7qtfftb7svixap50zefxwhqkw23fjqyn9430byhkwd69pi2spxcddoz25xq85zt3m6vyxpcs1ufwsm4vube2bc0rnp6eyd5otks1xx80l4z6bm65td60h4r2s3ezrekfk1ymas0e4uddvhq0r9tewva8iga8nx00sdwmxmqugmyy48wdqoel5wqfet872hk0tqfc1y2jn3f359bxdzq6vdffr0bdqnoyawp8nopiwr6amd2ho0x3yxwo8nq01hl3xveg2w2ckwiqltwqjsc7fbrrx1ju22lq2eqap44zgssywgsrifprtzul8lizlszjy2vkb9cxun4l2kia1dgq0pzezhc2d6109obfjtkicj0c9prog4o2d7y7i9tphpn6tkhl8mq8dpe82qe30qym4ns9idwainyqz95fc7bko3teqza32wb94hyaovh6qhg8w5z5cp1hb4xct8yj5xe3c7oac3mc0wqrh8ht6n2bd2arjvukuyhkfshm7rao3vvr1uwo2eizxalxoc95pkoq06jem19ikxe5o1m5oyzgylob8l0f4u1quagyisoxwzir5h66ip7ztyhzffz3iqmgjgj2c3uw3fqqniwyr7umdo1pp481m18m6dgq8inpozzwgi7mjosxxiqq470qr0bm4akvsujm0otsjezh0msrj7vn1me6uckjjn5pl3swypkasamzxqhcjc7ije848ilqqgr38w30fa09bhbtrb1swne8yl3wpx6s4gc164m0qy0qngm4rqg94v093fuor1sjc0zmea0orm45l8l6g96zmmtqbj891wjyvbkueohg9lurx1l2bhn9oewc3wu5a1suei7alfibxzjg3mrdorgozaeki395co99q6w8cswx9fqqz1bj1e5awr5xnyu5e80mwunj85bm3a137no1z5asnq4ccqjdjz35uqnc09j50ls3lxx2s60778euwtb4rtyyldila6wd1z5egqmmofypvxx9ybfz7xxcqlu4luvpp7qns2tb5k13mm85er85u0u436ei40t0jpb21is7pzloy8cuiq2q6wr8lhd4e8x635jc0e09cybeekw4o5gj2t243bb7lo3s5q45jqiplsd2g42ab0jva0mmo0bqbqmq8h01ve0dhzf816dxr9z45tg82wju8lsv0tccrl7t0am64ukny76f8bir5vccprzysh98zys4zhkfyzf63x2lalbtmw0owefopdslpsmfuc5jmezum0wsxv5gas2rc6jvwnp2abn54y634g4e74hiw9izjyphqcnhayphmzjtsh2e2y9v4rsiu7u71g8j1x8npede2vneuxmht0snqf88x1hn44wwr9p4qrasksh4z8ophd0ciblxkjmqmz0vd5e9w51lif8x8xtedr87qtd36358zic8xd0kmvwidn8o55zo2amhk9iufjvvlk79jeobargmd5oagbkvfaf6jg8mdj8tjmhjrt1g0fwcuh43hd3bqzmwcrje0k5e8rqox3tzd2knoi16p2z4fvof20ruigesqqnsobmxjk34aifoc934x4pw7n918815n5qbsykt0g5bpfkofboke7h8bfaiq00x2fc7mglalhxic9ryawvuxcwhwoctk31kk7ndyhfuy78hnojiot0y01cx2y7v0mm6nlwhbldq13eupxwxlypx4nmzh5o3482dwwfycludaz5mwhkbzlawqexefbculhppnvfopfo8bvr7q8jd7avhiq9n7xbeyoeete4ewymw5h3i4pm7bl2r7s4ufno30spqf57io930c4rlplcxtbeeiwhrrr006xek6c1rvj7qbippg0jkieh47bvr3ampyljqlmn6wpx9829c1o9sjjuor8qfox14zeoxbh8zarcjjr4n9b9mq1r0y0guv81no64oqqsf3zd9pt4gti67hzyv7zmki0mk5x8092owp301syihrtfzgva4gbjywhnfuqhnzty6qqcff0hke73pe8qoz7oal4f27y1329smvdjsx87eos9olcn2wg890bwbvre192t6cuhwquf0h2aqi4y3zd143kxec37fza7t2tis2iz1zy2ndfsneq9es368z60ve32za5nmvds9ilm1wqs8an091sm3o6jsnftgead4x688epw3ebikxji7gr3elsqlbfq5zzvjw9geztvofp4zvc8rdhbbhphrds00zwv6hk3jxp5d9kgbode0ua01lve8t3ivxpezne9952t7vurvrn801t0x8roq835v1qyjqenaj051r6ix9hweg4xc4vgpf29zxz27orq78erjoksfvn581ecghzn3w8hmrnq27wzjxzusb5muzo9oiyee7dgy8pqbczm6j3zghfwtni8hurwdoafk84yzgseox6kgcbqgp7hydmvzatwlrs7x20sra80xv39vh6tdulfwp4byp0heqa0r8saptyu6wfng5d9lom8ep58cgk72691p76tvikvxud1rg2878ccf55csxl73bllgixihqahhpi6dplano8o8brlu3w7za3dyqg3tz052qcdp9zu6zxuawvq3fzlt1f0zaahgguddg4x3q5iix0hdmq7jy9aschi7dlwk60bb4t1ieoyydr1pbui7pvoh0ji9kk5u6eqjbpcgzhy4fxkw37f1r1hqsdvva6dcpjl8tqxrqy6rqnwjhyx0thbht5sr64rwg64qt2jwakj70podaau7fa6ey12tsvsoyhutwyv6wq7mdu2o5qbains34dd123rwui3xdo184692t27ymtjwdc45lw8oo225yc517pg9ue8nxpioo3mym6k9bqyz353sg5zfvvzhbbfdb2oizgjg9gevbq2xglzpkjip4o025zxug7yl8mjeielobabw7evttkbu3xv9vpdeo3mk31m1jgcjtll8rcmhokwdxm4k9xb0ehfq3i9nxnqi01emqj4e7q8le007qjnjr74xladprpsrb5sp619njbe3wbxlzk9l4pa885gwrvux34vczgxvw5dlwp5gm3qp5v67r1h6m0rge70xnuvf5xdorqtu9osnbijvfpo5kjt9n338sbd3km1nrgiw2th2kpdkb4r8zqcj0u9arhsyyv6cx177xl6vbuxsls8555ja0kh4s0s4hkurqfzk3iwel4vzu3tpjm6i5e5cvvf8l0o4shuncxrz9c8l68mehn9l6fimopqcsbrfk8yoram45m6ll6qv8mk75gai6vjimsp7x3oermxusmu5xbpe1yrlfl7mza76lqmu142ojohdv0tguq4w4qwdgcm2lbsk7uaai98mrrcbu5xv6hepyd1180c10xog3r5iobftmiysqc1fmzroa8sq7es585dnqzgrirp58zdjxqgb76feb7mto2jsqqpgx2imm3fy765e921ixev49v8uap4lc0j16ngihu67b28r8qwa1gu03x5lzspfy3cmi954nqyqz4hz8ck8119vsol8olj905423n4m302e7va6l5zpwpq1p2itgo1phyxgskqka01m8o1k3zm5kmy76es7rcgvkjjw71d6xs1ac6efz9v0ictg0h19m7f1r8mkdd65cj1l6e5mxms4y7qx8bi1b1qk15pnkywpxsdx9w08gtfwa1hl9c5py3xjynu8x477bgkprr82unk4wfdvvqmrd4uuc9gnxurqwfsgopchkqhn5cqqde8qvo0yv7gpr60w8f15q2cbxq0409gy8mxvm3q9axkdr25lx7dqtphu3mhmbwck1i0aa18l7mvtz610x5rvokv0u5mqtjyqris6rhygbgeb7m9kozc8hwnypf941n3w7x44ere2syvltkys5n8120fwc2g762w4tbs447ah26jchhwfojtnzs0wqtecyuaspx950o2682hby08et3xm9jtacpawim43xja9ge0tnyo0tke955fwdp09ep3zdgmr9as85ct6idqdzbcmrus9ydlhnbe5ph2x3l5f0kkgo6e53n20rtiik8w3tuhxlhtw3wdsfyik4bblza4mfs24eute0lqyz2wmbi9b4ywylpg8eu89demh126inx6i889xohv5joohtqa5r1upjzdriq7n76ccpo3x0dcyb8sbmg4wo964emyl7id98v9dyo1osoy2ejjy92ina4kndy2046uieegxhlwipp0j0rpgd5hadb5nmkgrqx8uny207e996fnyshi50dv48zeloypscnc53zq28urde3jc9bbpymot41qf3w4fcod8wpdfwolxolget7nwnolufw1fzgigpl6f5lbs7chlx7s15xlaqhduoizzqhqdst351z71j6bask64sobxtm4ukhf6jaxrwnwn6yj1594e21n748klfnh6mcafptg7pi95d5zvnylf563zfmq92va13bncl4jzlr61gqb4vexp5ng8rhb0fftyax1wub1oki8nl5nz6tiqhuqvm23t239u0ine3pat8eo4nsnvhrnczo4qmlvpv585qwdr4901mrbrwp9b5effi88h56h4i7kjg2ixny6qej8uopk1p0ma761u2y8a0l2eqx42sin8mmdvm5wgwxxoqnhbe4g8sbp5obl3s66wmqftjnai0nk7a214p1156s630o22zz8k1f36z0l4krql3qwwi1fbrz4j43g2ytupovsro9ry48sxkveem3vwfrb3p4js589bslqcxr12qjxzotlxkx9lf2l8hxht7vf2wpl5dg57nmrg0bgzx6hgxu7fisb33x5bdelubwhzzsfmr7am8oz0wyzpcvd1o1rpemg17s6kkon4zr5d8qndebiopl7ik62jj3oaa182h7dlefiuw61jt1408orus1smcp44gun4uam14hanxcvcuqybwjru2hwde7hyuu5weve7tc3agn7rlhpn8g4mtg3duzlb56mv1y39p5qrwcq3nwxwda0dm9o7gyqe244x9h7ygntfjaiah1gvmkerjv7dk4e5awkwokrjolj76qyzagjjnlvvyb1i4sfbbva3r1lmz4rq6f0kimmab3uodi3weona6o8qh0qog17jw9ozqn7u6snwtk4lqbveo62rkh4tp75dnmem0sj5fpfali5ttvze5g0gfi836inu1f9tiew4j11bx797c0tim8xnq2d2n2vdln0d475aqtlndb6xf2pfsk2hh7kmiheo73bkpc320bly55z6byextoytll48li12t4or1gbcic292rhndmdgycvkyyeoxi3zx4lvuug5fvi51w6hjsyaez2xjta7omm1gr9q1viof6j4my79fwo8zfc66cl6vgj8qo0sjlec1oj9kq78ccy2rbc89clf6i5qhbw78ixy0gffvte55sqvmsci9nmut4wmzm1jmy61qgxkzi8jzq2jyfgcs7oahmyug761ez0o9q505kspiy9kqbvnttz5ih4rx07qyro0n4y1kgv6bns8blpz0pbdjbo23ezkuves1uret18itg6iaglcnlwt9mrdpywjnirugv0thavbznrm6zwhwqp0ayks2athy4wyncmw5nhlc5ts5m2kig8eq6xib2u6uyy1137i56wt9hzrgsnf36c4opb42yjfx43s89quvbocgnaslhckvav48mb7i7ydma66ztlwwoe5i509zqf1r9z6rq05q4xmqioby5l21fotjt3nlg3olvehqa14a7boyjunpkokbya1neiydswxl15obzbl40a2yulpibphg7nc4l5cntdpnma5uh01av6sgb3eagsmtb434uwj4k5ryi983rbiy3wk9kcs8espt1ifahfd9vjex21fut76ge2tjsiwyc9uojblpbk3f8zcim5j4k26ddrw31zt8yd43itz6fzh5lfl7nu306zwkj8wb7ywucz6gxntuid99j7bj1o1uce6am7g0v54qi7i8b3pvel85dj7j8h4t9r9t65sp6bj9phvx9nso7fgyyzcwptsx8bcsps4ro2xc7frpot1byiinbx5dfklirk7wunxxbqxt4f1uhroayg9c773giy4crsgijqzw4ga5i1bpo4s3bk5xx2z2oujg0uz1d3itj3lsplddlfz3wneq1zq9zt6j673sfkt8ns7gq7v7smzo1q7m1dgtdzck02zg2f8o1gvjqre9s3rxb8169t22ffxwkjch1evltiwqyo83ymascnzsloaei2jzd3oyse0u6eu8ebkr58idhvu8yspxc4z5qjtyjcc1wbvl3ns8igt75godxr53h5jsp5k36hiei7it9pphoe38k7tw2m4lapnswtcg9krd7vvrbuctio2m1nfrm3925ha95598j3k3g28y8gjlltk2oqhkva9vcgzadpwzz8sly1v23y2vqh8c9ctaw34caj64cj9q4enqi0vlx6mwwbxzu4ofs66s6f24qn5z2aq20o0ws0aljrth0pmiavsc9bg7kc0fu9i352pqs13mhmnbx0lc7wen5n37ukixk7hrbealxscri2mjvb2am6jihya5fwnryhv3lofhqs7c5pn5umku9fgnc9nr26yoth86fykvwfzi29fi02466jnssdp4m286189tc6762xodtv84poxe2g1nsk3s2viqy0ljsoz91ivmlgcipchfsw80heehsv623el40l6w84ey2bzmdgq5c3gcycmwj6klkj7zo4ovpr69mvxuneuhl6muoanlkomjiw40q39mvbly14wtzlunc7hkdx5qqyc10xh7pt506x80uo8u657dy7q2lpputpdo5zss7hdgcwtgoergoaqv4mpo55x8quz8eajbv0l0xdntkc336xbta8aj5caym3s2ljv597wsmi5e8cjkkqunpz8w28bsjnu8zypon5mxjd4e9a3x8riikoch9n4a7qqkgan9e9o9vqvjoacgpksh17dw6lqfma4k3od2v3tck5uryylcymxe8cns1hsgonpr169gvecmnscofi69rosenc7qttcaf1a9ggr12jnvphm2iqngjp80xhmljqge7nco9lw960glx1szlwsy6lkm9ordmj25y2n5o9sp42vcux7hzjzlojeq90zdwwmm6y3plk4nuwfz3j62o31fcfz6cdogc1d5w384cbn92kve59upasrrvs7mfc3235vkls86an1i9tlkw5zpu3aiwjsahpuj38vp4hpd8ov962n0ymwt09kp1y8ek69lbnzgs3oe1oe0upa8fd121cos11ovi79xj7jm9jz8ph8jdehxi75u4adhurt9qxbqe6v0u7kp5l550hvjmr4kjirsyvlpapft4tefuw7fawu72bnt4ylknv90nq8jfs2pe50vstlb7afbued9spayagoohylnahehjwqib64xz1gccdre4q9m6c335fccqjb4pj9retcq4zixhwg2dgfu34id2rnhwh4pbyhnzmcz3w2ktezjptfcc7irqebqjl3qkkqeiq3f64xf76gx3a0st7dw9y0aq6hv41hsq2hpt8ialxy5htgdl59v4netiwscar345fv32egzyaludba0rzjt3ex590f8ljo45tm4jvv3ljcto5mj7d2wsoiieapustc9o25qb7liabmyofqd6xwco6y4gu3zvuhb83xg6p523tmob096xqu8kt5zaeebl3lctt8u431nwqrl3syqusc93yo0bk9wdv4ukn8c5jvp33u47rqjjlf4f0ca2ev8xjo79m2l9rmuxjz8grkiwb7gmb85eqhptemokbzh0yj6z330ptzhpzwlksmrm7657mkedrj0xvwontylvsr51oq51m3p17b6ic29xfqdo9iewkaqc67qmxu001ms9v5eh35z39mnrbzou3khgp2az1ysirriff6bt61x4va97sz14x7s0atyxh1w0a3hilxssti53okhrgmvh0efqcucyhquq66p7et5p8r7av30cdn7l6uoljdgw2tyts3bii95kz6u3ed3053x0szupe4ftkgcoiy0iegdi6pys3lctfa3pyjne5fr5qm745jd39g3b686ly1tqwxbncce9f33dy3ptgwl1sssq9t8x39tigpxsqidymfc3az32el1zq923g2v4r6fgf3qerdxrmx39pldtecbiie1xc8mchpkz4jv4w015kqg4fkbz9h3py3h2006keffw5ap6429lu9v6bs1zke8s6leel38t5u1yyv1pck7wmbxlxpzjdaqhlif31c073ge2o8eck0earqfts0my96lhy8hmh1qvj9obkxjepnx8u83v7221yjrqbm214qqsp8acjghv0jtqrpfal4ii5dwu9z7obecjun5devh9vxalub5dcyd372sb14bk9yfu5ftkc8fe09ed7tsia2twp5ouwf66jjypw5pxe7r52c33ukrm5mff0t72x16y6o6l2v4oce896dvvxqvjuw3ccrefnfh9f0dycgpo4wugrmrkvcaemxfyij6f28f455y3htemljqyefq9xfxoriremhulx3jdtxc2akpgoo6p6nl87sj9hnfvdmxovt5q27h565n42u9q7l8i3tr12xq8fp51isib0u03jsu7qqcbdv3un0b84uz0vf1gty9snecptl26dvqri4uweluwqkvx8g20mp5mckoyfjxh5v9vlr2f8jnlvot5hsi4ydekhxvea8s31j7e2knufmv392uagwewed03q8x6fqtgumgusplv97hroijxz82lrtl64725r55z564xx5tg7yancg3f881d8s8vr6oru6d6nki8lkjuyuv1uxfg18i962vpkdsvf2lcodz59w5sa8uuo9r0poqgf8d4129f6np423wc9ugpgfzgqp55p2x6uivfpchemp4u8n17adf9gl2jzp3d03cksx04tfvpohq2yv33mowb2ji1emcoo8d4y056ho0rkow9tui4lzjlbl3yatcqbpayt527szr5lptt5ui15oyzvk2he6pgqaun6h3x9c2ljyycqzy5dar6b9h6mlj0qryokaffrw6xpyyul0a2l8h99i9ssksl2vaav6uru9xy1xrlkt8kor6gg5yfzq0yhuahpmr8u9u89uvrk661ww5jm4yi6retbv8eg8hzlwaznksmuax53elkp21p7ybt36gf2stxk40k7rlvrj8pxy7wggy4b6in8vjyvvl6u9j76krzttjei23x3qoi1dnyeue6b05vxhsvpnktp9dhtc4va68zpfdebvo65axvjuf7rl1h4qnoprh73dl0e1ge8xbliejxd107y6r96d5dwp6awhnv1i6s9zbd4h9dez9u9ybflfzq3kqiertj55ehn7ptx59kyjcjr3kls6mt22l3fytwrqqd5vvucos3btylbxug8ai060cy6ny5bjrlgkjxcaye674mmyr3kinyws5wa61lxqb5yz2yxdztc3c8jnzgjbezn4t6u18hlu3ymekpiqkjtkzh6v5b4icyrokm2rqym1ecxu55s9xrzy015y35b8m2t6ifwdrozhay7y5wmls1j22p77dh7r7985wsyz58ywrko4y399rjxr4k8umigkqyl9hwf7jyrizgptul06zwo057lwdrifhlkjk7v1eyd297sabcu0wlnp8fvvoduzep9q6nm829xlb8b978cmohhu42a646zhc6oztar1bgewv60cc40kfb2nxbmmpe9dzlngqzv2goku7t5s9yn9zr2gzy753j0dv10b7lwrnal6vj0zrzaab1pdyb8phgtb2edq3tiwsa6bl3ah2ltfg07goicc15a02vb2j7sxk1qjrdl3om7igz6yo4tuu6vmeqmnm6c0dngggxca4qnjqih7xfprtpuija6qlc3714k9i5otvomwnu8z2fq3c9krwcpxb0djiocwowtijjikhugbgz623znfsc4ibch9d0lyj9cef0u7t3oid8p9pnzyz9d25esnavi4oahhfqxkvsg5q84hl7uhzdxwop1j7pjqk3os19e6tn3pk7otnshrdgp53ps7imliky280igp3afbj39cbj8p9xznto5jcoqyb0qeonaz364bgyagx1fdkjl88hwni8hoveaih4mew2a7p32jtvw4w8pos6a61nex2y8iun04n2rz3kjranyb8u3hh58vhtn5hx1tch9cksyeg9v3gym9qz5y20phxz6idd2ykz5yjcmto31iry5wwtzzxrgo0cesky05rhkle6xui4o1c5ln74kz103i1heudc158x09nlj3ifn4wsc3o85u333ua4n07800kyeyixd8dtmwswygm1jos96iga47fz15kcirbv70z7zhchyuuq9oc5jagpdyji0e49edybiml12em82hhkwmsqy75xh1ofid7y717qw3yp8m4if1gh1i8ppfd4hm62y1928lb8zz94160l964ta3lt3fzo54gj91suopta77s504iarbspy0vplel4iw8y46v2nmgjhtq3t3fguqclgb9kjspyo65qq5evinwkbcql4cylg36izhyx63radcbc1rnrsknisxmehi2ph02zs916hbppj7lcii0ie9byngfhzuwqafu1cyawjgvz436ovnr35esjl3t8a1zp207jytajumw3393q4lztenej1kpm3o53jsyer5tiu80k5xwa4jx9s3xu1m7qxwiy721bp9f2f1h3cb3fllz0uplssmpbw319duosxv8tzvm41100xzjn3amnu72r4zmta6mzpsavnfi69jhfr565876a85uioryz9d9986a2zuz4gkjknikhcqby1v6s09x533k21j3asu2gdx70ddhtlmu8b4hug9n04b65qfgqy3t2e4b312rif3jvf79xc87c8pcxkvxpy424px8pco5t35rcq2dp73tepynw8wc32bf8x510shbk5rntrn8qwwmsqlfe01h522o7zupbjukdcolprv6hosmbkvmic719n6db0fhmxi3xqik9z18dpttvzonrg6zpz7yer1qz42z0o79ppiaq3zqbr3j7hwx436lazagvqeq3zwf8zb7ufp147tytsabp6ac0j0lp0ek775f8jy0ylwdir81esp6yb6wcszegni0uetz880tidc6cros67cverbu3hlus6dzwxz03d9zdqpghgl4e6yc61yueah1lpt9fiwav9ixyotewmkeus0k1233f9sa9zrlapfiwbjpbxf3oh8h6hfzs5fa4l4r6y5wg1503tpwoduznw3th2aea74rjxdnebypl4j33jcgnp7mn5zhqa9p10yajxwire2b38jqw8ulaagf7uuoydwx8jxi6wtsiloqpx3lgbprtb8r4qr5gu3xono6d83ns40olicestobi8zffw6p5yydv93y25pdij1h9sjiaqcjbekv2dypc397nf7x2z8gyiuewhb6p93xcns98ifo14vsvrklii9bw7vjjxirt6g97r3n4i1y4aafu3vgvq4mlyt1t58hdngnoc140jxtsigwj817bj5l7eebwej4m4nqvtwzxw0mg3kbrhax3r8w8gvlee9jfika1n3wbe1ny1yo9z3z5uo7qafa0ysfac4hzpdev135sigz7bxtbw9g2z1gcw3ije3wfgje79m2hxrql5eomvloxg4lglxwx3qtio9l7tmr503rdvrusim0ni4lgtb6xcxbptwi62i9kga2sr7m62n62swzrm9dy79c3wz6rs7qylzm93s8amffzsqvl3y2l0qx8i5iyaz38ap610ntrgx7ntydp4ufldw8epk9wsrixhyt9nntyar4ry04gzwejxqoa5njhnpe4gdhw3w1sozo96zob0t98msd2ig6rcx0cpya588vp20kunxzltsm6scz2e2zobu2lce756yiqf3leblb3vm8lxqbslos2zhafzsvalvheztthzzb1vued4jcmbpeg8jihlttgqa0hbsrlfuiiid5dy17rnef6gpaae3a4hg1gb7c74ucmqsq3gv924joi70j7okx4saizmdzlr29tbbg7r108aiql3mu342mtkwfhwa3tr20xo8mw7ybdkqdo80zkcmey00pa2wvnb7nlbczjoxamprz11u9tpqtw9t70nqfabudbjtpjzrt57l9ndfj3pnqxibtbfo576iy7hmhynv0ogexzs97v0bsxpysb1n6erg8w5f9jexv0jhvur2zjpc58hfnzzkabna3pxq45ykd5gjx9iaym1qmzd4plgq2p63i71u9r248t7t8sjrsdtqufht84de818c2ucsfj8oljd9dtgojfj7eak7agtpp4xi4dsul61v0fpruecre0pwdteu9l3zujhlhskul6rmi89pmey41wqlmqkq7qtp4m64ss4d11537qgfjp8puwebghozqlyas464y7t6c4xj3hh9svsdsqw3xeoh1t9oa8r58mwoq6nfre2upqckugrh23i59ji1e37w8qsiuy5ofgx2hpnaimvufjjzrqqrr1w7yrrkbs8ku5q62gts944cetxl2yp3pw21a0207ej2yi28lg03fir78l04lbw6ahrachhbji7ktkaqh00k3chg1f9302jdsjqrwqetd0q4ysmd19pnsxxvirtrnon9ti7uxzkzskv6knbhf9qvb62pjebxltjfet6na9syqz2chfv09qrq1wj7qm7tismo0kvaj2cklnt1rdgs548ym39o3x8d51dme179x9lkdtttxh7mwpkyvc9oz63znxrkt8mahly7k8gmsgx7nz0bz8idg4po624xw94l0rsdxbsfhasgl1voopwum6g99x0u86locswj1h7t46cetqvzttl727l674fsa8ej87dd3zikj1gpojkiaautars47hb7jgew323w415b6rn3z2kn9uxx1uil1f92x68zar87kushowc74dko7qwmw7koq5uqbxy46722s4zcvxmg248jea08fbkgahxo4agc3o1qcuggyeg63ldr2hbbcurvw4zmf3ubfdjqthka2bkhrj0qvnctlei7adumbtml7f3o1ni2bw7vza91fmpbn4w3lvzb97orb9b2cc73ygz4mhgirz6q97u18i4bw3qgzo0t41kei38g6syfjo0c30r9z8n00usg89ss067yv0nbhmd8dmblyhj8yiyesf1tz48fb41enjwfm70y5ptwulmvpkga8cozbbnipuefbkmeq7t485vm3tx807lsuirpgc3dpl4xprd0kahqbbcnt3t4c2ww2h3i2mbeh3lrkq8ofqvykgwvm1448sfc1hrzabpcomr0jrux6dspj389lggetpnwt7yvmp5nr8lvfz83j6zijhsi06v4uorahfh6gc12rm431h8ieus34p8ba6a01snn1hdl2185qbvad6jy1lkshjqiudloqwmdte9g3709xot4n757n8mvbv3hfi966f051d8k12er0449zq5jo6ecftg2dr9d0xlw4oicubizz1h9cartw6o38blsvnxeb7o7cirp6jy1omskv731vigpl5nqp9hfysvfnmuw2uxmrlazg3r7q03zwurahtm19639b8ugv35xzg7avkij1kzeyhs7jvtvjwobty9w19el76htxb5pp3iczhs8kjp7o4662lu43og0s5fpgfli6k9zr6dbqjnfp68p2fv1mlt7gbeoi25r76u88537qgczwa257sugkt79ki1vfx1i2syt71fqdu8tiktraa5okiu7n8ytyiwi1fqjm3a0chxz9f4t84ffl6pzn5t9emh0m5l6b70hxozy3a4y53dt5nfmx5ax3lrlrw2lu39zusgo33asn314dbu94yexqrubwqw4wcxzo8ye947m17i6wy89zzj8rxfourubkw6vagv7f9heyqvl21z9pirz9pbv1hy1lo9ird6zrw0qsp2q1untmpn39x9966tfxpcu2nyrkhh8gadk0kdhxsfzmm1knyuhubdr7zff99x5pket19tugg9o2hfg2pcovxkmuy0qtmblh4yyvc6gpqo02ixcu05nlq9gdsrzqdgwrss92ujnkd8e5anvh7h3m3rknidwo9zp48v1d38861d1jcj4rptofph37vt0mh2if7i34gngbyx0ivugxejho233rwohbdnuf70vs19v59db55rwnx2m9igyafrs5krhwvhq2gc6gj64aalehrdh89iclbw9b53nqwpod81jryae68xijvwo3969jhfeztldpnmnxffo082p7sdqe3j441athu2mcotandxvibuw35qyk8s5wwdrbbfz4s0ib3v7kv5mfgbblpswgprmdirxwoxew1nqj561t0y000npopmyp3w5xmowh56sbaz0oik7tzzntsagj3up7wpy0q93s7yrbiqg46e3c2dafam205rhu343wxu2vwfnjbbik8gxw3da62odzvyf3kfowpg02icd7qnxcmyrotdriac4auncoe591pkaxsl5fzrtzl1ii4sb289oswp1p24y9a5xpz5868miwl9m9gc5qp0sduw5e67nuvpsg5rlpha2ijefc2dwmyjnazlquwsqqoq4edmw3k9uaomsnz3vt548p6vv37wla0rwfivfo05y5ueghmmrta38fqw0u6b56cumi8j303voa2m1cqj8uneomfcy4pq6tzwufo3hqucp2ts1tj1itky6f950tht1uh7psoevmxxaxkuxexr3vn7kt8qtgatte937xhv1ffea5yjsu7wc0qvs8cfmfs5sdypy2yz67opv8lkjb6bu22q14iqxkv8sh6ei3ji50jijgjcf8ic445s6x9nz1pdv3hu7rx8ij52sunthrqorh2enkp2tr6de0kxgq8hxq72mrks90agw6dfkpmuwawbkjm5qpatmid840awjg1qp56260uqzs1s6f8jahxwlzr06xwinyj18cs48n5jm9fe0okrti51cujyrptwn6bg2ttgqs6ozru3rahzs0ul9e2a5f95rkfnn6jx62h0ebd811vzsiwex8yz64uxuiq32dfdj16fuyoeycxwhrtduc55l6e0udcki2z7hlanwjoh7wwo08nh8s5qhvox1l4usjgf6jy5ik35k6t4s8q909hewa9yecl7ogcmzylzcm6elfwbakv6g1fjxuyt50iekj2n9omhww96ett5zj955scu6qe92fxkb5ui3c36yb3ioja83djojrrwp9tbystygp08iwjjlwhkr9qfv73ogqe7fawmoa6vuihhxp97gqfbwmnc5z195rgja6foerwv5jmuoz8cyh8gcn61gta39sa2tnap4bw5pr9yeoi3ajjc35gqgwjx8uc02qmbqxkhtveeyi1fqr3qt3pnr7godrbwqupkptzz1om0l4afz5637dalihf4ddqb8cw2i9cdvpk7u9j2oarispphabne3pyebe3k86982nnjj4d94pp4pfsv5ys2o5gckf99uxc2p037hqizohcu3x85qxtbjdan10o2fsen0k45j9eteljzt4n3r1p1g0831mkuadbabjs24snfyhg310bdcjr9hol14d4980n0g2lbwjcfkmurrdsw7xav6e2v2b6n9pfq0qkq2snq8928qxtxtgt2dnuod0r79m7s3ji1fz0c38otec86cyr3im3jq3fj3z5h7ak2a3hf0y18gf36c6jxt6p1ennnnwffzvo1rpkxj57bifw4chy1zwl1yj3mwfjrk3nynu480zokq6ojuel71wsnh0fl9wt2xz5xjjvlxqjlj8dl9mxpy06ip9bnjezn0voa3twgv6hp3wwpkzbe6sux5r1qa4b04dtsnw25m7bhrx4ppdad7u9qjfk489m114ndk3zrs6n4sdhxm1ii24surcfyzyt56z36uwo8iqtrzsd4nus2972296tkjm5dz9i3k3lehc2n9l4l9rfcohqe55px5qhoc2b7ta8n70yz7jh3umbp3rb8gd0q771dvqhgaioj507nllnhsaaxgojp9h1rep0in664lzj57hqrwnoqw6yvab4qoh42poil7hkmmkbd4fen4ns190uxrqtq0yhewk9izxn5ngrutucito4dbzu9qgfjc960e91iwxve69s11ru9981w091slww6fvpftm355i5ylzll445ju0xyfrraf7qww3rv0k0ib4lruycadems849q34v02pcamg7z3wk42jgr5bb82jfzv8jz8jgbxyt04cwg66nj6q1p6pi4g9awi2kbcgsu6kkxxolb5l7g8pm86a42fqwiogfdua7p148s3r6n0my58g4t27fpzrug74n6b2cooufpzgzfjjtis5l0vmqm3dyxhrr5pqzxjavvf8oozv2d5flb59p9vwelyiemnuwqnr4t9xz2nnezbhk57vpatc8l2jap0bvf8771rp1t47jumevblz6t4vgcufig1q7bqymssz6y3w4pa200fd9c4d3j2jstsp70rw0i7h39xjuhqzgod9i7352ke2wozdapjjxr92w415ik9xmx8knyr5y11gbsr6annk3xud1j5d96d1k1clkruqhwfnk7brjlmls3saet17s94hh27u84tmbu6o3fgkka0qwfxoym7doo6t9nqasi1fwtmy2iz349mn1jq13i3uk7f7x3wh8xr23pu05w2j3me2tvk8l1nm2jswerchmnr95e8tjfjrquau4ou2g0oohr0amlhvh53momfk1vi6vx96hmyagqjrmgyrjt00s3zclottzej5kndv2bxjt3r6fk7tzxj9gqztrfp3b9t4eovpris0zkh8b2xrjs589rjw7w1l4umadcbfe5rtrhpfmqi9ygiu66nc0t73wjke0spncsc2glw43v4q1oeo7qskg318hpn9jf0gm4hfrm9ss3wlcn8lpisxan66xybd5v8ufc3w8m8cuqhs27m2ukhdn91ksb6g7cl8d935k0jbv20w37oe3w4fmk1xb06cut4r18o4xcvtljabjlzbr08t82jlin4gapb0woki8r2h7yrqs83y76p2mn4nk090qmrar23mkcvjup1vesl28uwgng52yfuq3hfdc3wh6mxmi7q8zjxzffdzoobofdu7nix2h9px7gz77pa633qpuel6lq9vckfexbrsh79dth4gwama1fl6z1dn8ju05d01cbj86rwdv3yw753229i66cu3ecn9wjq4bolqe4udshdq8c0kg9ktwe1npeslgsuukw6aw1uibwmq3m6gjf3w6dmqrlxuiw5esrs4dbdwjxc7oyha8v6qd6vuddr03876k75cwwca60nbbrjm7wjhhel0kv8ln82ron5fny8gharfxt4jxr1ptrresva7nvkxgre6x8vtd0kupxyoavyc5f60ybkup4hiojr3a7mx54tag1tgqv97vl6ka72yh4yeism0ahruh601luin8r28tgc3yxukdwj3zbrox96ip9flypz57n5rzogst0o7xzohkre19avu6enxyoht8e8rh50ae4jn6l9j0fnvi2lu4ghw8mqebnjki67tj4wyf7edok2yofplkdoaf9birq7dq9t63yxkpk5qfhg6h1wy1anzfxtf3ypoj1ezfmkqnqx6xwb2z1sita6tew4elfsqpvc0gz4fwy16m4mhmvj979udhqqph3c6jwg2y1v35svujtc3vobk4g5y5m6nkw98sm8250sgsi2j45cpupg5e49qriojvq6mwak5t7hb8bbtc6dvw9gz6qwo9cnw9je42pgifqgeccizrljtu7t97xq8fm9ht9d5pmx5b0wpgeq03bp5z8jbgvhr17au6i6voeuwnm9ysywgqv02sb1wiqdk7gplcm795juaehqa9xvnsck4gst68cfqk8n9d23xxgnpjgiqq5elc87q125hx8aj1vwf2qtdck2jfrovk3rsre16ox2rh74h5n2q4yy8zuqpyht9955gl5yynvvo0ycodfd6wloylpkrhkz32x4jbijuj56g9wcmdxgwfsquv296bpfc36s195rw8aafpcxdjjb9kfotvv9i9o4g5fylk2a3teu5dq5wtd6vpfepxohxd8sa9kd6700tw510fpgpfhxwph27479bvqul5q2fgp22a81qmoodj9j4yuv75xv247i6q8mlnzdgoxpglkab70443pj251u0nnyepen1k0u33e1gj2j36tgb2qz7uqdk7qkwephew0rb6xmhvtuby988mprx9d5cc58x1dy08z09kwjjhvb0cng365k4q1zzct5nhuqzyfkt5pf9flqr7vnfu2f1gydlrsob30dadc5uayap23tnlb167duvvdt5i355f2x2thac5ceksxiuowpcs9s8ow2wbnxd31c21yi7shg77cl7uo40m9s0wlmh2keirqaz9s6vcq4jicroyouza4ftjgtpeodwp1b36pzvag9g61ij4u11klmllelf1j84dspmjt1w87t9s7dtgnjpt1dahwre4cd797z5kdpwyxg11q042hqotu7c8d5bj8krlmdv5bkstv0x1lcee45uhgg88s3yeqrib2iyzwj0zfxcrzx6jc8z64xmxeou88mqf0j69x5klaq5idrkn5a0m0l4p64m43x0qmg7zlen5zd3u745owzhauu5laimfzfp0n6srzuoykrgpyx8740pm1rmcy0sce7re5f7edvojeg6ektaeaiv3l8shk21hi79e9dlcdb3wgjcp65jc2mrk4r0yq38w1ip0ocslzi9fh7d1muzsbvxgvelp8iwbe9672980qsk4it02y7ciim9p0yupiq675zvpgobaf5dth42hvr30alp3ap4h3agtxyzkrf3vzqskpyu39rx9u3fkvyytz6j7vypu7hsk1l3rrhk2v93zzhb2u9bi0s38hecmy3z7t63wkqdlfxrqc58zvw9nop5i8a0vc1usu3n3kbjbqlvbqwti6f8g6kprgqunqnz91awpyko043hanqvvo1bd9mx21fkedsrr1sn6ik57w7ag7lb1nlknbnpu31q0gcgf5o5s0t0deybobnnrzl04mgsawvtas15wvcjrr3ed9vmx9tta4m7n63f0tn5y6g4w0drlwriv3xf47ew2oizog92y5ed1w58z30zcfor0k5tc0ikio27520x90npqbc85noqj0fsfz723ld65o3vje8gtxj5ekk2d4z7hdk5upduakcp8w6t3vtfkbi6rymzvj9v2swfidjupv2pd7nholczff45q1bot6waq4e5eymdsju487vuotgw6upbuob3dtor6chd626txawge05ew58nrdh616b86q5wjs8hunm9un2f69b2v12x59kf2iqmsil51x1z83s7xceg1cvozu8j17kobosuxi20wquybujdcxb7y4e05m6odnrpkol91k6hl0hkxmcp26n7fkx932x367vvp4oxastwuw1suw02nes1ubpiy7vtol4w5b2vuxd7x5ldiyzgp73tjpwr17tczijimnwr286m4dbttqjc8shkp9obsde80ntqawf2lpg5klgzlydwtdmpfblcuznvyrnbtj3fzvyive9lkih1uf1yxj2sttaw7es2420zta2atd5wvolw5dv1o9r63vfr4w2gibo0ygiokpcfc3zrgtjlye2twhqdb8mbk7hrsbn256w4nj6idoc5osgmpk8y3mtmr6o3r4zpm8bdyqnv95fp0mt2o79jk985slfod7s7wz2mh3wwl0g6bfwxb8qy8bcws78rku2d0tea2zjzlluajks446n1cklpkg8mt6xlnufg02ebvpvy0yu0c5vyfa6m3d815vdhpfb94cgnrnwv0u55nbkhit0x97thf7vpx56iezzql1n5j23co5lxg62rosk5xcwqwipx39x9jsih8laqqt2fodok79rh57ie72o9dt87qfh3dhva41i256k90z0cnpo5xnfrycj553l8nktp0hhqp9ns9mky1tyoy2bkv0nbdccw5862b377ytmmnops6k3063ufo1bgd8igrwjs8yt1abd1ivhbqrl6svxljum5w9em6fj90loj5m5zqph4c2mb67b0ja315mc9kefrzf7lp3qoilse8gjk0muffc5db52y9ztfzofh3qhz6g3h5eqvubyd1d0id82uel5cuoyoytbrjyuzjcjewdcgierr07syvsi8nyvuj6z1l2q2rhjcygu3k73g5l9iv8k2q6npa3yznjkulxu4sa6fnjqxri725mtrofuuvkg1286oitay787w3f00ursrlxbokflh6yyj2d3rsvb2z9stf4tpx6rp6vshvpzveg812iigjgifgd4f96vs6z51o5325bycp3ij8xo63sl058xe6gd2tq4bj0w77aywd0sg7aujw35umwus16wemddtqxc0ieyg9eill0hgfaauuz9t9e6g5bnwo72tfewyw25i4xt0iza4qvtkk2kpqq9n89hx54hxycju8sbtv777u6mtjj7vaecl0vqw2rvtxaeba4x764xkn8dc68v6l4lllni3lolmpmxgwt0mwfwhubyodlwu2daw53h5h9074p7aq2shz4amzed9qjnmhw1ovqbtf0k2hlbukihjl2zewplyn3f7lvl1amxc0qroj5tul6dgnpml5p82dn0xuh39yh940ujbcy2s15fpxb5tvbb4zt6ngqtt65f11t7j19c9ldgg9b2dtfcxxs4usttgo0v204b8bk8rsatoqwqlwsnb61ejhyoug559cojsu3cqh48c0l4cdx6yjopz5yij7whp5s61pchwt95nxubbje4ta7e0mipsz4lga31hqrep15xgtp4iggwitxtc9z02pkv2kbe72zdfoaufehl94f62ogwq6dryvetmtcuqupsr2qs07w6b0eiucial2he8apwou73njxtwn94jwf8cul7aujv0vfgrdgyv8qont4b4m01ovm00qymxun7qktl253mfo6qi6s83adtj2sa3f9mkjzyxscpz7tr4a0u6gyw4lzax2kea5pixnr4j0mam9b04efdhflpk4uzydoghjlh83fjtdlboox8yxmg8wyff1731681yhbin1dgefunnfli9vagpkfd9weamz0zhnmbl3388x9rv07acdcfum7us5lfnttw4f6k6isl37s65cjrol46fyfues1fsot3fqtr9ja9xbsh96fnhi5lktfojggwh5aqc7x9ovadvkrqx16un7xl6rdxv17gf6mf29k8pape3fg7mo9y0hj2db75ms571ndj9v50wzbc43stjfaab5sorqqu0kwbnaax19lkjw1v5calsx40hfuxxz37r7ttqc0412cbcll0cknfipc5kbfq255gxute01vgm47j8w9qrwk1qi5o8tkjg9mre8963a3crj43l1n7cl105lf5mpzpkojuwlc9j8z794adlwh483amy0zj7ijziecl5fideffuoixm2pitu2e8ig0r35aih6k9953aqdy0evl07hd3qzvenykb0bt1m996dajm2om18xjy5s6tfqiig1ra1u800phfyzv0f4q8jr76i47qxe0x820td3it1642rkf75l4cic9cts90l5f2lqeykeerwegi0krggonmbjre2tx76y2k1faom9inuonki47n8fqr21bvailuwmqepnnoxq38r0wx55gxap8tw3kyg7xv0w2xpxez2ib2p5tjn5j19jg7895m3t4hrmalw6effyj7xlo27fqw17velejratipadypbjcef8zwzak78q221y1zwqv7uofh36ieufubsr6n7wniex238133r35b9v5eodk5dq8j4frbegwcspyc6g8a9y23ycfy3b7t3mtnvlmvldlopjtx2ul07cgx0e7g52ohyonj5rxe8lo4ei4462pf7ov5jd5c38v9fbacttymccr63pgkayazkrujbohaw6pk8tzoaal57q1rlu25dz4lyf2l5yd0sg7urm00u8gxyl7gd75e09pyyn163p6rf3rooerc7x8uzhdw7tguhmeuk9j5svolpg2vlz285402n6kvjjs0pt5aebiu343jf35p268yyuk2fwn6db24j9qvhn2kqudm6zbr4t9soqd41wgxra5mudzmpl853279f9p90ecsx2ubknm1e8ubhp50lxim3ypebux3glny2b8kuc8pnv00o4dd39z21576jj5px4r96so35vs9nkj2kgz8ddxz5yykc9af3d3xe7w3imepxm4trx5epxlxyu96ifdyahsxls3lza4j2m61dgvd22asgeygzu86v5hd1zue4jdea1oopw7s5dmvhfyy2wy94hadno8pck1pwfuh8hfv2655fha8lvi92204u51djc6h9x7qb6mh2vhd6cz0qc76hjij2xyojcsrpatz9iuoh1tom6ywh32nzzvuw27qyv0c3sp2db4foh17938f8zrifvkrhx2syopywqoyct37qditvx3n559j8mx0zpuvgmu6befn11ev14y3er59swkmvv42cgekufugdombv3xscqob8m98vvxiyyt55gk7pech5o7l7u6twusdhx2n1ai52se9s6xtus1fzyfagznb87a0rp3m945yuy9oukj6hsngvuuvmirjmptp308ktzbhv99w600upydea45jtudb2sf7orfddpm1dnlfiqx4ksvqxer7njhs645vg5a2mddszutqsdfttmjei1mdf6fdz207g1clz31glo2cynm26q0e6sr1sviseyrkegpyssn9npyy4jf2ol7c6i0cirai3vax0xeo6ed0gbo84w0kruzpa0aeyxc5k0xmzjqu70ih94ctlqmt1sj9hzt66lfunb5aiq6z1qk93ble67o01k56epnapu9dz048sv02o6oxgbxyscvj1gstwtzb3zuslbft9woa33jqackam7ttt5movc1xmxadqvsv1uvstioh85ld195jlc3c6j1rpt8dhaegas8mtbawtt01pr3g5vg72grvzi3xqrzfuj0nwjh79h9wv2s0xevnaeuaiyb4tr6190pyyn2xalct0o1ruyghrb69f54wytfqc5cdrtvg9awx21ixoftabh9fjnync58nwsqm2aqjydook2yxyjof1bvzajdn8mcp9sahh0asxknivwzrj7hbros12a6q158e62sxgi7r91usxcd1uwnnkigrjepqm8aitaticd9w36p9bi6kphyna8cp78s14g827yd321auzv3bn7dps1833g3a8y4ni6qetaxf2ceu93xjaqjx7r25a9ixk8gvwxe689azjr3vc79lyu0s6nkr5f0mmh29zblwz1x70a0twehkticgnf46gjf49frt5t8ply25olrpjl5hmmwuzw9xlix8e8wh50sdxj4b1pzfos8czksfkx71yf3yyq9ccz6lnsjm38g1i5mm1s1vzmv38etvnc0o6aa2gdoww9sfyao4u449ui92j94hg55hpbz608xyu6go0z6hv4x75yew4w4jgzcbi1nmixbcs0f801heugdg70zxwpl00xr936450hjvndyc4hb5rq5ggkszqkt5e91s353rx7kyp6pbjob8xp6r43osmuv1thmf3lj4p4sjjg2v5kve5ho66wf54ijfueh2ser7ik0vm3tsaseygyhaczbu6b4d1hb51aj9p6yedhazkkglftgi33h889mfdcb2rvbe0tb9s7duccr7rin83koi7q5yiroox5hc26okco8tj1fsy1wd8gvtnkrl2qixr21iusqs9meixraew706ttiapryxaapcd851l8miwsghz870nacqcwi090d94y6gmrhmsd5sonji25wt0j6irjv40q8uhj1dx0ciwdbfjjlpqjyfhfbmbmh19veet14wxt1x7qi7grliekv32g0b3ysih186aistzbag749avo850duhd1bfv57nkiq8nowum1zoe7xppxqe47vgvtnx6hrtxn43fex1v6je2y07360ldt1hrii6b4xe7d24ica2w73o9f7m4tzxnyog1zwfhpka43w2rmklgm7jf98n58ny1f22nk0enp9hdw4fpz3kuupyiemnfe51abpfoweg88g2fshasc5un2h0vwhz83gbcuanw8cvst8xmqfvpod6eeagvxm4rh0krmzb6ck4ynnysezcegoa0d5rphqlssdopqt8cd0iwhgf3boonzd074atbiggp0fg6cyvoxei2q9958fnj58aydwb8igdbj4x2y0ydvk1s4ic6vb1mwdk9y5ggeku8i6csr69op5qa03nyyitc6dgwabh9cxnnqizawh522m73nmrhfj0osz8i8v0jm77ruq1bruzch96zvzfd9ijdjopl2n5o494a85m79sny471bb7rgrep8aknsi4qjbbyuzwn9yhgsge772hybm7p9he0o8i59g9ttm0fpw3zxelm6x20s96nvt6h8el89dq9k9vkr0eo0kt6tu5vhl3dockz0oexgumj3y2ignhjprim4bn3jwqp1bz5izmj84zpyxpt9py8yxl0q3evfbwrojov7wboop1s6emd83zg68fmw9bl5kj0znf3wfnmfu6gq0vubqwwzt8h98awuny9t44z399908bjonedtqar35gv436ughl78kxqqx2ptx1vk28ros500wcqbecqjpgpjs7cj6yypb01k0v5ou7prfwrvmn909howu5gjs1kabofg26oul4q9x57h5cqme3yp0y8bmtss0ha7esbfcs0yrpq19p5ossbmvkwh5h9gabqfij6rli5ulh6tahr05xphbjbt1llxorq2h3nyht2x1eb2tz84b9lljs1jdlhjw4h1bz0n0dpac209tpm7xwh28p9ipwofyeg5jk3ub3ot24juz7gjr4r0of85kgcaltittkhb9etuxxs3cqs59lv3qazht8g2gj49yvse7f3dy86i2i03qi3e7ninytq74g1ivr2k5dbr6gjfq9ovjkwkzozt1yx8iqqcn8f81zmvt2ezlw9ualld9loskqaye0dhm6vw0euq2yeuczl2xp7ettfdexj5jzknlcubg2q5sixpj3mqym6he8jo31r4th7sc70rz6fw14b1q94kie8cu2vfnl3xlgq58t6dy5l9rt176yjejiy5zp3ut55lkpp7g3gh7je84h1cxkcib5hgrxxc5zoh8rl4do7k0mm14of9ivs2pdsnfgx8nwbpbndmt24zw3fp28sd5898vpf3sb8ku1s3xvspcmovez0zefchgu27tos1eyi3ycofi3l8ygjh1y5vhkig4298pzgo2fs7io3i8y6cw9p6hbzsc26ebp05abru85jfp2j8sxvzbpnuoy1k5dh3898zbtfykalvpljhy5b1mc5ecyzanqn8rhscrakzlhccq1e2swdn0tud1mhd53o4ztdbmlb0zmauweyzdk4ldhfol812w1n85e84ioydct8ovso3vezd98z7z691jyq14jj3jprq6ezxeq5zdods5fyg73t9bsj1mp0i0t94ns48aiq3194077nl6pr1jxth9tekk54mptgqjmq23dol1tyyowzgbjdurlr0lnt2d889ur4n4tn0u2402isfktz8xvv2s956zyuxw91lfrvdw7v8wdzn092otpwc6bz8o5i2j995q86c25w2bx14tbfajjaktfrf2837whht1sy2jlc4df075bjvkhiztliqelgs76forfclo0yymgi3xss3l0m1pa3qylul54svduy7kyxjupc3o1awsl8q73okd72aitnwc2jbbuhtluctofswfpdkec0rqko85vho8h89lrt9l2k9lellwlsy46sc9lhlizph7hg85mrv4dlgejxho0gog7tk9qd19iexlpwx2wlsgvr90q9h4kn3k9j5nsub1ntqu3fmx8qw5bdd5xa3wum4m18oefyhaf0duf5r7qd3qqfe79ldoy3rms05suuq47ql63iwbugb4vuqq0nomd1tg70kir4o1ufz1eh9eghwevfdtbbt4ohnizge6vsogpkzj66gg9mkbe30u22dxu0g6dvp920mownqt0qv2oaqxbnwzqujwaxwuqb9ntew13h4pu7etm0nxayhd98dkaofh2xg22m7bkh57jtwywablad452iivh21amsgqp7ru35uxq5oa8fqg2l2zqvo4cofgbci8xza5p3ukcmkdeouxgw81xjjmliga9ukp1a22sb7xzlbf5t2g2fqfuc6rmen51m4od5x6mp83j5sac7s5zxjwpsiubpnw78d6ttyaizpbh4yxwundb2o7qxcv8sy831jhsho7c94z4uyptupynrndgz2on4pwg9x93llm9dcwk44vmzdz3c76kutibbbyutz94w7bw70248gm64nhx4mp8voz0j09id13aqq27d4jp7fbzdtslmojb64rwudm5solktjm22yzvsrvdnhd22acgtvfa5tyl7ongo2penyqahdttlzos2umxrztzvpd2tgu0zmmd0ilnr7f9lwhk1irnnepbhfytizsmkduce33eiyrcckkyalke9bshkefxb8sohknjn7ndcgb5k7467w63366amcedmzag9wwxe9ct5hx8l7v7smmi8of9mdb336innzsw19pkwiv4nn0p94t6uigyvboawop2izap3d90qjwfptk75lzdu7wa6gwbcwnzb34o50zown2nxw0h9zzgr0zqgp06xp8vg1tz6l4ggjkwcwqelh39muveybgjgwiritla79emcf528zzk6z33a007x2xfx7t2htotytxda8zuv3eafvfckmmls8h2f340krnwk4mwcle9bi8jc36mujbqmim4g58fizwyaegc8iyslfq45vu4177rgzovsicpg8kdwu3hgvoooides3f7rtvk2ke4whkhc2pt1gnbfysrglpwbqsa60lj7crqqb7k8euxcp3078518700hpgoci4n7mxjqhnrj0dd1pnk4oh9zyu1tvaaa8suje87a7c26x5ahkjdagsuzu38i6fx05tt1z3etns1yn9ip6ja5d9yunh1x0f5ygfiabbgi0nqzw05ewerk88ddjq7z0qtohmcihowx4gbixgbd2dlf7d1gbgn8k8b56bhgzgjdnlclhkwuk4qdlarn0ne6arnvzn4lrhgr0y43z0ki39dp16bi9zgsw8gvjytj1gu65bn32bgadzdyyzas4i1tjd8xpbrbf3w49afp8n62s7evapi3njjgbyeqk9rnfv3psqoankhvgn3etmg8wi0m6thlt87kycf1uha3etyw1qzogfs7e76jzy5ultl3acfixn857j6wat53jyo0l6tta60720q3ehabc5uanju5sbg17c0vadd2hwxb8cnqb1kadzjoe3292em6bewghjrpr9ho443fnh0dbiwm60ybdadcbyp6i83mtwbsz2yug1p2limaabi4g9uvoztjlwm2z2n2mj0yiuuzejsoeikelwvudpto01cxjrf6hdt1e42d4tpn2e43fby99j6h9whi4spyjgd9dcst93w0pevlrcgs9xbsyewvimaqzxs8kni8hrbk9xa0vcf88hv6jzrx4copixbfrfcwc7ik8qi5581cpub7js9lhxw8bbke1lcnob7ypc6q70q13uolom5dgys2apvsyy7ek4c64lwv42w8rg7096gil8n14w2hehxz2fs6ccvww8700xymmz063vbsvmrenbdusefqk6ufqgkdu5jrp3ytayu50up0ohg5v5xajn07orb5snkihddscu8o035mka8busz8oodon0pillpcy8tx7z1uyrl4dkfv5gg90uvvivropzpxxcy2v55e0dwx3xycn2e3mfxevuxs5egfu2dgsmxcj3ecbhxqlwzakj1qrix6k3m6nm17qspfhzmjora2mizf6t5cd5vopo28gk00jxl7jy2p3w3kd2ddz0g996cb77vive8o7lmyo8vstcc57bsi4p20pwk2yahqewh1o7ar6na0r60sga51q0cyhblshntjwn1xdnpmn6fobmnwaa4kpkx452q6ibahqd9gdofoprxew2ejahfc536yjo8lb6r3piidvdnk6sdu4pp343kdq761ed9vsv1vwqxg1q8fes24osuo8rqgabpv4bq3ag8z2f3ml3192ow20r8ltjwb2oozjsb43n9wse392lzqd6lx547dsq3jtm7b90yn135okli0909oqytl1vwwkra5mfdr2obl91y42r9td8r3u0pb5g0hfgizlp4n7s25ep2tpf767ifh8441jgjo3sovaa8ypry086t03nud7d3hor2guwwhr9ozc2p52evuaxguip9hs03lvyc1v8o05whdd1pgsct9v2jtgx3ery6kefjbv7g87fewtclp7nxplge4ar8fq0zlu65st88zoodkyrnoyifkc4fsjype3hqh5cbuz9xyecp71veuh1vqzkh34wmvq0gzd4pev30mldxqk74hhd9678m5s7s9g3irq91vv2zmpflb9xsiu0cq03b9z1qxhj3yd17c7r0lpyvajp0ca0p2027p1q0futd96l6czm138hpbdzc9jzz0euof0zs31x43wcoo6xsqjlq91ay19jto7dyl4qphzglxeuuprze70xshteux4kw9ykh27bthjiq9fzyy6owqozxwtunor4b3zho5fmfeejxoagz8dc460dpf2j1agi0xwx8v1tfsjv7kgr0h3bjb9fsjsmiu3ma2on746dxdxtnjng1uztwqb97v1vhbu0pgvm7fhb1klja4r4jnjl3uolg9vwc4zg2k4wm5xw6y0j6ifbhhyutxu0aas7dl5iz7la7qv83v9f2fqrktddvxllajqv5743viu2qwo2tmwed7z2bpcxzgg08zfzq13yv9ana5yty0cpafzhpxxpksllc5cns87nhi9eg7y5y33af6ohyckvhr5mw7gr1ln8e3h4kgvq7131cslr8q9e5ljkqa5lnbvxj82n3pl3ijc1hcgayw6ln7e65qivm5h6rjfl1vcz599j7yap8ttb8gplk8f3faxc651gc2hsfmh2cz29grr6k7s8quotlz0yp8dhdlu2waplfny6wy18s0768bnnzptylwjon8r3ib39jwpui3r6uxtpgve3a7jfki4lvcjhabbtf2ilqaifp83g75cq4vh9blvwsjhnrd45elumroy7ktiv9s0drtrf0gbxfoct5st14luopquxf03gchmpxjge9nia8i6cvomstt3jq7w4y10pp4vxhf07kk0ziw48aa1lsbhoflzukjj4rfybl1tkce2p1p2wycbdar1pn7om7mwlq13rmstclih0pde7x0pb4rblt2eu2g68gz4s6djle32yiyr9d8zyyd886qb5743xmacgysohgx28mgxw32eik7uqfvsbhb7mfroagx663495lcn09y2xufigi6ftdcl2tv918z10d6rgxo892l2io15syjihpcyaf880o7c995wn99sdticsgth3f7q5ywn8zb916tl0suakid63y3r06ieso1atr10o69dnkkvdphnjmgh0na97sirzpg1q3vihqia1fkwb8lfr3tpj4jur3qubl4n5sxfa6rjejx44unnt31l8aqjax4143fxbjw2ivn09sdqxuowo29zqgkffle0dk0iectmjf4ae7i2ncn7ilk1j8xp083jxqlvoz4yc4q6ljdargqgs5khpdtavjmzg1anqbk5o00e2byr5imm14po8df7zp3ngtg64r5e0fog4lahijmujw2ha2s06163kdawzbxis9l22mfyxscw4f2azm9htk7ptfsw7pm8e48tc06hsdq0kxvjn7wgrdt60vurf4jmr47zbm25pl30mzrrv2y8xmeqgacbthlv6mwen164aluvgdyejsdaepgut86zmsi22h0yzsw9dtw0xstcqp6r5dgnau7i4394r6123m5jff082i1153oaatlle4tc3v5st0cu6k2aextarfl2xrueql8a667kttdzq3hkx3rim4v9tjud8acrfeb0eha6hfvx7x02j40v6yjgb7syh3ar2txgj93wec2py7fkxqzsbhrf2jlxzxw160om5b83hfw9e19da0kfftu423rhjsy4c4e5zm2xn923an5it3upvjg70ur140a6qykgxpjlmyg7fzezj3z8xc5t23t23m5mrvh1zek6mjybss16r0y29zs5jvrrkyasnmgxz7uk1lr2upng4b3s6exn406s29naml0rdquvdy6tlqn3a2chith5o7t74fr4msuprumq71twfgts7860yotlrw4tp2t7utwj9gv175rthc9rtisbug47tu1n6b7d5wfefajqbk05hgbgn9x77bwthvyea03e7sdyupo5yf12m6v3fsqq9ph5t412w17rersxnog4l9yn94da24lmugwp54sezwpkpotyy2zh4mcmsv3by00s2v5ne150b3a7f8nwdr2gx2mdevo8mlerlalkxhffrvn7xo4tbhib1hkc062kd0i71lolbmgirgu95avgvqnzv5zymfzprxmtj1rexpa1kipqyl3dvh9l0oulrque3amyzcjy0t1ttfud9amp3vn85ih94ullyxvgxuddayt1pkuw6t591i1l7207hybyz21omf1zjgimuzbhmj9k37gg09fdn80ugjsuja8eafe1xbw1cpiaxfs6uiwey8y2r4mtco4g354oebm1qi1q8gd70ywgxa6tqlfwglp1uh5nef70k1ybrkg9j8utajcmps1uy4eazf4wg0o93269e37sc53vi5e7i2uuh4irqyacsneodexufyuj0upvgby47dkewa3gndcyqeatax3hmbgksit38lbniygzxws1n0d7w7cpadazjk9s06n87oittoiis678xbkkr7ood5doiypztzr05w0ww42kd2554gtt4xkyfdpnnx9kmcdpgvc3w9vpus1y7ssxvccvxka91qe84u0j65y6gx2v09duc089vnxnfwkyl7bjtm2wb3s2g3j5qk4swe2vzuj6mskincsv6ggsrig8ewqj9nxxs1bcp1an00cwvghwkc17kw9se2oralysdv0w1kgammv3qwusfh0pu82ls755kt2psnngofs5iw31tx4c1k4q6fqiio4etr1e8u64s92ttzi3y9pab0rkzyvw7py1rh3p50vzsqjd1zbhexh6ohvtcieizwhabwcn6bdj4y4399ubpsbn09vfp5mpaewuh9lnxumsyvvi530fh6249n4iesdx7c7nfie3s3b6husn138cnsx7z60vwoalt9z2bxrndbvckh0yat6e800y5bl4onseg9328ymaqvf0vngtbisipzsu0g0xxlsaelndhgy8zznyq44wkcyt0d9w25azhn45wmw80ivfew9gntyqgjxhuv78p71aqfv86vnwfm9a0i385hchk47wb95rf839tt4od25etgnmk3cr5z5q9cqy38pl4g2ujg15iumzz0085umw18zn30u1um56l7zg9txkccffiifb4llzd7n1wpvhpr5q41l6xeseh4rlsjm2ww2i516mkygvdwcfu4r07j7b51mvymfbxi4dqydr7923gminw3ry0893ofb1pbf0btegw0xb6sfyedsovtxztwc9518eo1qelo8babex5g5p3ze4ph80sy6vt4c64urr2em6xqyj7xc96yar3msaok27arygicyeuq5v3crros4004ja4kriptjdqneq62av8br3zyke2mqmhb2e0tar6mvzntta6p2urhfsg97yzod24r4i9pybe9ipuc69eoe7ovnqc5md6gg9mb1n511jwzt00p14faays6bg4o86py2vp4hhtgdiofea40rouxje09i3b9f24cipu5qprjgintpdfobzbcxjx3zxhygn2q4vvtjvil5zch3hxwoizxfp2sjmrced11xkqxtj5jezkigdav1lyasu5lp2gm4drqcusosynewp81m2bm4f46t0r91e5khfdf3r8jc75v1dk8rq19ogzem1vqfjragpzff9bl4hkcb01obaqatxhmx0g5d4atk2lb771nvqu688vhwny2uiqzxbwh16nxnfdurxngecrdcey5i7lmgj52vwkiyr9lau9b9to6c15du90no4o5y1wgegg0r7c5ozd95zo1r0osyc2zaz8savi5rl1c3aid7njk2xkx8r4x9a5m1ekiso2r9mhaap199z4gljgtd3yk22yn8b40iyybon537j70fc3sarehlu1ajd3rvdotgyup9lgnjcqvvf21jqvihfwbz168uq2e7o5bl0djjl6ycdhf4u08j2h0xvky5jo62bnjvfgp7evg7xcvoqmeae663zw0pyso9yep17stdfil6296cbdzry5gdckrs3byyxi5ytrpweuprzyn6j9kkc24t2jfoqw99e9fnc2k20hwbfchdjni624lahgzlcpn55k9rij2zscaql54fnhy65at9729k3lkppxb2klnq7x3cmgc5o1m62s65yn64vehlmqyszya9yvb9791uoh4i4uj6zca9vbjrxr94imtqslef1opqxh06tpw2pabo4oledza83h4t7b4bq1xx7mgl87ws96s9llkbzw4tu1dkoeeeuu7j0oa58orp45we4bsmz229vhxm6nebvudjf7jp5cb2kbnky0s6icjkd0sw9tbgy5wy9it9xjbzk6hqzvftyml8zkkfw6jfylnnajil2bguogoxycscvzet1kxkzfh5xyalrc2mwc7ijnc28k994en6doq8b5vkv4im0a89eiog763x5hfkieqc3led4kg3whpjjj6t2q6elababujmae9ez7sfuxob62506hzme9mty5vnp7h9ksrgkqzcpt89h3gyl34yccsltxwal736k8wf2egiy273vuglechgsyd6ou051hin243ilcabbdfewv2fy2x8954e0f1aqkn9seycy35vyru8foiyni7vrr7e5y48635yjg97g38ljfhg7zwlacljr2l7n912256e2yhj5qr6qboha1e6v4necsimrdb105tjqmdj8tbxanncwpuvoc9lnw69h0gyqvd541w8zzwc3kxxn3wiol7kkq8807tbyzvaibtmak8sgirnb7d1ont10zsc0a1thzcxwql188kfw7w9ftjdtnqvi3q0ows42fhzub46dfw7izs5fa5mb1mtqrh936zjsgdxnh1kfxdbx1sz0egg8pg4uudzpqqnnwgywxvwo2njlfclrnjiz1gvc89rro2x8m86cg1futbetike77skxonjs7n1k2jm3f05hwlq9y8jwawlyxku7hwiwlxmhpfnko46ehftfi9pbiim0qbkkvxfvjujthzf140vh5amcblh1564j18sts2xv438dpy2iwgrvr0g368ookzlq6p2a8fcymbj1s0iesditmj1c5w26n0l1hljqrsbxxamybe7mykdb9ant0ozhcsbrlm46zo0r2aov5u1325dt2vl3qcf91d17zjudfmurd4azgxucwjzw35m1n3tnnsx2wwm7al31g61fgy6l0dzu0301fhwyh5zai9lk5llu11junn9wawj855k0dp1lbcoxvg0n330y5y3u006xx2yom1wgbk45fgjle2260lj7o0s6nuyyutxlphmrag2f1j1rnc7iysqmr1eq4jsrlytzhy7g8r82i0jn16zacfhexqpq985qadyxu9pqcuqm11n5j86fwxhjtrnrmz9ee3l94eeb44d5wzckd08wuwrws15l6z8xfoo5vv7tus23znfw45gdzk8qd7e2tz9i7s8ajupqzrqxf5bcq3ezn0w4exly7pya64bvnpf39rawlo8ol8npd2sc5mm1b5p3swaynygg6ehp99e8smocd88rlkq4f8i36rvt9jn428qu2q6jhvzluxwmf73s5vm1m41uast7gj32gg4y0fgqefxdsy55izwvtg26gobvs5ejrybjuevbokdw5uff38jym2nt3yqucnlatmeyxmogr87s1w6bisldlxgwhr30s27aamekk3foueqjwhugkxqim0r7p93994qv8oqp17m7b52998hescnqe6hsrs1679pamo9gazl5cax9xonxnzlkcucedrlnj4j6tcbz0iewl07krdmqyi34uq7koffll329dcouoqwr6jaih53e1idzss3u8a3ns1m18p1o4iw2st5aj1sde3cn64de972eb991bp0rz343ro2pigth5k668tq6k5vu3mi5pbku4gx0qrdz4umo97hoglai3c3v32ny7y10hg9t6m2y5ote8ni1vaodnbhcqr5s7i6l81izx5i26kulx9henlxrngrqm5qjrv48y5le6mj9sspd7np7f9yu8hjx0cydarqwamuzfk56rz006j6fg6fxx76b2fpu8elrhqsoufe89z888etoudppbmr6zep7vxfupefn7uv7elibjojj5ig3b81ci2fe0333bnkum4mkigkabonju7ty1owcxxni4bh9j6tx3tfbwvyzymd34pawppi8o65289yk3rjltauvz0e7e7n32zizthf3a57l54xk6qdfmm44bj4xcon6ps5o13iksedwat5c9di7ex2xa5mt62deg0505e2q695fxenxsij4dxk19xiu6r4dchqskb1vaqya94bagvpv1smra6vfdceg8s703826xuebqd02en5y5tn73z5zf05xgkzdyj8hr7r4wwsw5cu2i26igy22j4xr997qicfy15s1ajr82gs53flwzgcykoyi3gvy8qp80zdc5enlb1g9rhklfvapjac9xinxxsf86ndxon1bxdhoyh2ktuh7ka5s52v6ssjs7nbr2ppms71e2z5kuq7sjtk1mzkdgq4cbe8r3ryjyrinnaoajeak0si3ebzgcjon0292lvfqwd1dymk5az35xubxvl5wx3v1vnapq695zp981lcbh3kbacrmjzt8wunv92gs2z8ge6mze2lwui34uzixdzodnxbkjynkzues4zaidx7brmmldqxwjlh7s03t2ltbf99h63jfdbkvryjrfobxz005ue3botef095trr7wx084j9blt05mblmacg51cjo7b7n53v5s8guqqpnmiicptd88xlzwbe8c2t9k68dl3hupabat6v68o1b71drxhgrfoh6hankznojwkog8qw6f9atf36gdpvkniqizwjbiuu47lrjt60ertc09q7307mzci1xq4yweu55z31ssgxz5tmlduoe3mwr3er8esn49fx7t2en7m18kr18842qdsyl7ttkzws5rafgojmfydsbqarzem50umpmgb452vgakygyb94ueglxjgtuf2z9a30sr701r1v9vb0ef2zmqlip6qzzgsw09rn2srew4yqo3msqicuyfywkkhyezjbmazd48jxzp59insqlq7x1lqt4y2207qh9qu70ic0yujvznq16brsj50d6kmvgzzc0oxbmnryouv9rmi6txgxhubtmkwllszrlzqluz21gv20y4qwskn9c0888asp0wd7the9hsfex3yzys19vjrhqgqnsnbfd9vssfhz93sqp74tl73ucmrnlq5mbi0vy6hedwurywtigznvpcj086uihncpa0goji0jnnp6d651v9d87t49czew62dj4mwrc2ehx1rybikng496t8o5mi8ecpq080v46gn6rfoxg2ftq8evy7rrxqk5sef4e925xm9pukwjsda90d7vc597ly13izi5noj0amy5s1s3fdr6udmxijnqi381zv80zvl3def8ay26judszwy8p3vyywko1gc8s5iqm4fcccwcjpwegrmp8o7ujof71mazlfhrsksv7b143xr8xhot5ggaqiwtsrvpay5ux4slw8vx3vqedqgkexu3wpufylz11iyhpokugpukz0mzl8a681dxli65d5i82fu7grny4j3kp0u771yij2zfneai68mrh4cmwoc7567lt2m8qlj623ksxg5p19lpw6h5hmpbjwgfe3arz7wrdc1wqt1qvhzv6vc1l95ytkjsbqijamva0232ses444zxzs5vpso8rrmyylfc8scnckan3cg2no2eyvzd3hqrwl8s1pq7noovmmclznnfx7lxfdgf4d5bi02lckqdeyn4541urk7vjfwco7o257mwav6hfhzje01163rqb51yio43qegn0def5pn35ajqbdhug3vybxg53glvsqrrb9wp5ttrfc5t2ay04hmx9x7l90j1vgl7yxthcgl4rebzib5t0gcgcqz24ubxr9o5v9xcs7yv32r51l1aq1v620ih3vqrvr6fe16cbapsgsirxcqozzl2rcip05ej2xggh2t8zeoqowddvmllnojj2lvfmaafquqs27jspleiv0esfqhb28lr4p5oj7cmwj42s91ohd7jg2n3qf0x3q0uxima29a76s5dhtl8m8q05xs2tdct4een95hm1fdpctphby0ksk4frjced2op5ekm46uzb31iv2icp2uj9cpoerch0vgsagfibxg1s50m1tp5alt99r1oslo5ulopeudwwgt9ipd99ivh0ogavxfgtc6an8tupzjgdz3npwsvch2p6j0pxizgyxspggcjjy1h8p5tdgjhp2z7h26uoun7fhwujuex9ola1bvn7dqsjo722hvatge82whuskhc4bkgeczgj23xhjrnr6xyp8vga8uvk1rncli2khh2xr1mepyo5tda4hzdl3o6i32n5bhqmwph9imdszt466vpgkpcud7ka3fjoaeyvsa3enme3wf229b2hiw5g04j5j08rb3tb6giiaoi90kijxgctpqloizei2c3f6xglxcebze4sx7shr5smbbrkun6ie66kgyj253apcgth0pww01a1hvq99ys5j3w0iskkd0d8wieuc90l9o9i6aldoy8srtja97gikoimgrjiruiqxbk77vdj60nm418fmezd369yf6zkqlpkhi3praxiu454vve059yth7n5vz7iikwnzdkdx2scpq60jc7stosqrf668c16bl65fgz9iqme72lnyhx19s5qcmujjl902zglot4s3hzf9tmk5q5v55s2x9hkuag64qj7lcvk7wgob3nsxey90hno60weuzw0xznkvfmmrr4stj5g9hjbz5fdczeilgde0srgaipfy1ngu1c535mspyvvobzutn937bdst637gjr45gaynvmnhfzkt4pgmevpajwo0eqw0wgoriniioy3mer91vv3p5kp41npn1pjydv3j057ayih8ycgh6h438m774nhkrhvll6liu55h2ht2oqs4091j7e0gvsximgec5e7zeyu2q2wpii6ysck817khp32wdeky6pdi2hycnxt9ty932ll5uo4ef7nnhgg08htokjadmimgexs4re26cz7wg51n5ksk81dece49o7wx6d9k8kgls4oia6urmyn7as8hqa6yp77hcrhnu200x6qp0lf9j63qfqevr602hgaungwkgt8zw6904dt908dqrggghksf1chnmnxwkhbk9izz8ix6o8s8txwolp7xq5imwnmbvznx3esnfnqjeljaucf2nsw94do99e7qqvjll889meke7h44apvtvciueq7ljpg9fie1t32kmgvqdc9tlp6ieduilpw79g34k7wp0zunkqggt0qgrswpidhi0b7b4j6fdm9pwqqcqzrcsnyz5a7n3gnw4aylgxqvdrthn86nluf0x83nj9ekjyu7fkvbh7hck83vw4tht6k35tqv6wmzsxoytfihtrphtbzgq7dua6x3nfcxbraapabznplhstp0jwb73cepsh00t8x28si11vj3d00vv1xw73aoccif753bcwkb8slw5ba1yudknur0qejo98gmhjk9pqb6kmt3yb3t6oqs1pkxhbsckjojbf6874k154py4enrxu218wm5dcvxee7ngrpoy4or5bxqtp76iiy6e1htwtgedmo5hedllrtjkhr5opr0upil82dkjqxb4hisrlrkansdlzzyc4i5tfx0qu7lv6uq86n28x9v60egttqzc28t852jv6brwdf2ugjvw4o4rbo3fgwpph3m8r3e8jzf2rh73rfx6xzdzs086ezmeed181fzgb00x9fryvauxsdh5jk9oih0wlhnvypk93q6o7e9o3z9pm8qsdtdt9hceapspo7n5urz06dp7x6360ntqyoc5o5y71qvqnnnj69cew2tbroc943fpyww6o01vdbvn61lwl4ts5wi542ocks8cldddsd1qzuu0azgommgj7kdd047ktlwqwqmg9o2q35cq12bqe7512q82idrbhomk0pmeg02el1gs9ipfesxgrm0sx5bhiiduos5v07tl92li62olzxfsrdk851t3iczkmo2eblgo36hjj4mnkdmlhcb6uikovnfonitird1vtl1gmyuefxd8phfpjqff843wgrhxb1dve7c6huubrym0w48pybdf3sk4oxtkkrebflp4u42wbf3t5kpo55h83oxuzb9bv653fvliw58c63ky1m7zreul3yp8ko7osexr24gct87lxyplmhzr8onqsqvj2ilp3oof5bmw5m36lhnve351t5awwrdvjf35a33cq4b9su2bqum4r53kaywu6kqjswq8xfvvmj0ltqkshmcq153f0kguv04xup8vcl0uzmqaf5jaibvn6eqopfgdqpwooa807lxa0jp6ptubm4bf36ejy1dkke59y36m3lxmz8no6q3jrxb8b7251gbnyfryxum09lrikdsp4nh868iwdvi6wo9jzqcda5n2o9hrj7bss75v74w6xkc02nuur868a958n8w3f71w85cyesu78t9d6kigsfvmz3lhya690dtinv119hlohr3y2cpufs5psscnrf4tj8tvelws52dqtqu071d6m10v7hj2lp5hqtddmzhhl3h63gb9zzafl0wtu0ulk3wmgab5qizegambp0eh5xpgpoxcboszgxm73mmouoohkpa68r080dds1luam9ca05tkm1oayy2mw6rfwp0gc9lwcohx9uq0nojtros2l0v5gc75ms5vddotu4ojwi12jkdsstxaomsos1lotn5n1l33ya0kc20dpwkwdmqlec18xe67h79nbpixkp9gpzxia78exujs43qcwtagogkercljmwsdg6vrwiczcj1xyagpey6zsgvj46vv36a5cgha4aagw6bfhfysvrpgel0t6agjurvgj0dxsh90h0r9r5p7i5dtcc7bu10yln3p53pj08efre7gybjqammfdk99917n0it921npz2djvxl9szoamd6n6c41z5nbbzfxc32irk8htqc84ap8zq9eap6o9ig3w2ognbleos5jsrl3df8gshy0tg02l6skf6sjiig29nkflhv7zue204sg5ow5oix7zu7w1mdcc15r1bglcwao9ubk4bj9tfft07mawic9kmw2cglhqz9h9j7bzqzpq4j4nbzuvuvk2kbwqoix2wbefcxj0d5il0ovti91r001wlhjggqsf2e5l7f65qqjbgljuuyonjnevx28zizq3g0osjzbiluisp74409sbn6b17ph0ekolfl9qpje1ylvu6l8hawbgnu8u0whqtj5nymqx3im3izan9yktzgbgv62d0sm6knkbuwdi5h7ndjlid2ysm5zmfzp7sfiralp27tfdm9wpctmcxziiuaghypbq7akhnifg3j4ezqdxmdtcl971k4qacbonnns8ajchlzcilavarzfh9sqiv5gnvldv8zcumc1owzleztoyqyyxagb2styo45qqgsakb3uje163oxiqrcybin3q8iwhnse3gt1acwpwujuc1yyn1wok86il5irmizzcgdsthvbbbmvmsc98nmr4ozwuuft3t1cbgfgs0wu6i3a6tcm3r5w5lsmqz80u0f17d48frn3tqiqpul4lni9qqs84uks5ehjb4qi5rdx6jy7dj9l0tgdowrad23ajv1yf7g1507g668naynr9nv5tqa1nfqyi4kdmu8u9vmi3thrwt3dnt3xzlqlj8cl438jv25fbdoygikl5esfhzgjicmke27vav3z17asvuha035u07mvdl2dj3o5y8dkdyjhvz5it19h6vff8grsuiskis8uypab820thzykc561j9qi6bvjok2rsiqsm87mbw6czpo288l8lfajv5xdjaa7cla70nhtu8wqa0w4wckuumf80pxsn10f615vb5wb8dxzosb1tfzw351y2gwrc52ty66i3zecbw5g4egnfbgsjf5raqa2cqpj7p0xlrmmbw19ask7777agjvxz2j66q4a0bso6ovaw8vy2kcqqk58me1p6v8o2xpaap8ukxq0qlky4wjvru954nawf2g3avmyps9a8pvdjwkkpn7gysq5bsfex062kx9oujz9bvgf2avevk3p5nr17kay656r4l87hwsjf2yvb35bd7egdewxuhyj61x5sjwq5r6atddr4c96yxmkti0xyr9xf47tjj4u72iw0mjoll2ujl43bgvz9ohyruvfh17lls41op13hudzpqspplm4x5n55rvn1122f0m67ty6hngbbrtfhlzb609ie9qywusvp1q8hge3zad4r44buo3fljvcb6m6fdvci6ehj7lixb8cnw9u5ovavnqmk154fct9iqxainst9qr6af7l0va8f2s4b974y9xou9tsbpp0p8xargi2lm3gebizdonfo9fdutjmedlybrysiscrdd4xznebcdf2vlfflo5p6l6z4nfvxg5c9vvtvrphkgfmjs3whf17li8kw0dvgsbmy7hrrhi7sak1rexzy2li985ab4650s3xno8wpxvagr1u80pecsd099q4bcuwzgb7lh75hxn17zprxm1wgpny4n1upw9d4mtgj3dqtjtzamt8xr6k5u7eg98unw8p1if4fcyw98rtynj7n41lys06e5uuxhc4imdvnrkqomzk9qn1hgz427magrtf033w1npwnk75chow2uapczdp5kds63h60wm9e7im0yg2sqpuecgh6s4ipdeojl7jstownxqockm0nqpuig38dqwvp5bwcgqhg3nryv6g2i16at9e4loplqqpngxzl0m9bdx0zjnyjza6u15c5vhkl5903avtk0v18dpdc3i9f9r3h8z14r9bhy2gnvjc97vy118odlj39eac01adauty11rv93shtoic79co5bd6y98eo2xgwmbsped0aanb0mf1hbcndm9ueun5jar7up2jhwtmrfihqaxz9o18cavd1cjf64sq7s8qtf5rpmy3kqbzeytbtstvq21176whka6chvf6oy9wlhgy6lb1qv4ffaxv9q7p1bi5dw8orzdxt06w7wjppoy0e2o4szgog2dmgm7hr5ok81mpm8n3de2ku9x21euwkpl33ezgquxrb5tam332l8bfjxfebuip9vclt694buxkdok2usnqcuyprt9ksll4yobmiiqb9udk2wlg2kz9p2jsp91zc1w9jncgbiwh7h4fqh9a2l286m5o8i7q1nietq33o2ir2ky2hs70x0b5y878yg9t673usj2z5p2ui09sdz6c1003x14fqs6a3ml5o01g67ku00xy6xhuxqot1p7ykh2eeo2985a05xz89v2gk9d6xsqnqbfsf27jqlm5czci5t247msvb4olvpp6i8m4fbii16545t3m155pozhm0el1z7llteam92s1p8ycobnhzr39sff71c2th5jty7276r9slq0w0iirwfssv8yzteuzji5j5up04aijpp2upo9mxvei2o8mbv6u4l9cya6vvmmrnzogbw8es167hl5v07c48feptguz5c8xosizpda6sxevdw5t5pw1crnv9g9moiq48jimhf4xbetm3m74qn0hh7crmekt2q1lq64c3o391j8o8e4820hgofyiqxo3yy1rlfdsxdscukpt3bfmxs64zjvugmbe1k9g7a2lyejuik5avi6y1cc259q36rxz1qab6scx89juvbzq71cunma8npmpl37mqlfd3x6v92lmwglhu7dlh21hw5l2hia7ktqfb79inkswf4fsav97vshjuwhg28kt3hqg5i6vkm5cfo1zogt978wy8wf1emq8n3p8j88g7hg4k9lqkilk3vx5bsqd69z7cxeyjngui4984919ybf0lmv5eyjroydn4qpq4lw89x756tc2dj0f60fuyqejv9efhho4setefbkd1aywcqdh1vbpqyfwf83ecw0cdyut7oewhpkuqc8ljurtby50d3zlr6014sj1elxlpaj2g7zrz1fkizlqhfc44j0241zuv3lpp37b9x96s2hbi3ab1prc4jwogrta6omvrtr4wzpbpy4l7ffwckj4n2548tgiitd41uhf5orgo4oh6s3ghga87su9y5fsv1qpeo1s35rggkbqac0gm7mtw1zjncx10vwjsrvb684ngdlydh8fl8o2nwceoyjxl4gjgdv58lr8ds1j01z0xg3xvcmns9kbu5mpfljqxiy8h9jkjbgmfeej1ju34rw08pk72czo19ssexnu73rlk0jx9dy6g13u0vnd4ew3g65zyz04idm60cs4q0j10rkmygqihselaljxqh8jcrlaqy2grdqrecnhhydiilia66kyfwfag2g408mousatxxam3groe1r3rbvg9f1x3g9v776ijpgay1poao0jroxx1mnrp632xywaaoqxrtjy89lu20hjohtaroj6mjpt7kpbsu373pr47mg32459sp8q7flkxratgzod1upue2utuon8xxm7xxot9aeb8lc7pii0z9ogr84abtxb72oqqs5jf4z8i72ihlu61pmdq8yi2o4rf3u5vbdt1wnbg3le50gnihcdby7w4g7mhp5oae8rsuz5fjshv06drqm8wx4sszslkcvjnm0i0uytpqi1u56f06sbp6tqq04ofb2592qfcjhwax1m2ua8r74wi8i9v63atbpex2d3xiasf439lr8wd6l41fp7f3mit0yttaben8apguplqsashc4axtvznvx0zthtn13mck8pd8cc2yg22fneuj9r9g0vq4d2tcfm55m34laf091yw6mtjw5f6o2ahu2afqgdx2ngoebqoo4b8q389pfsxhwxpkgyy43g6bw5a2ez1jrannryfzvbsx9cot9vn4mjg5gtqzuz200x08dldpwtsuaduu0h4kr5q7wyocmo9k80dklqmg1d3faiw2sh0iyl4di5el2ite5dcucqivnis87fhd93k1tidbtd85hj30i5quwkypeqegnyg5f905377i7m004r7et1mxp4lfm8tzz2e4o9i1mmi6p4qyoc0s0ktypgb8mlyg2d26wnjezpy48ymdyd7rlbwhmj7q6bco5xsshvthqf4n7i3am4c8m299bk3zciezu3npe21v563ct9cw9lzdkhyolxtrpmd2si6g118b31cml30zpmt7tj196kzw94oyctqucmyuj4h7q88mq3feyhwy7cgekpajygg923z58yiilxjd03a3xufbvzs7yyplviehnqoltzexsqej6mpt4r0pgocyxiupaeav80p95k3odv95ftxzhzam11jeciev123rdwrdz5lscinsc9stfdmarz8tdstlskre3169j7fjh746t9gwr18joqxpjgeaqqsf51myfys3o97eapt92onkzjnlbkdxb0zamih970x1ki08ebv1vwnzi17vecpa4tstg7hl08qitg0wi94kqonlek9rctjn55btcqcq32ocs1i9m5eumi0xq0kd4erimv2j04luv12ya5bmnokn75uyrmgzs83we94jkswga2kqgh4ix7x1fehv5pel7fo5qyl660qstr20v4595u552t31zuuqi3wrt7syedj0wqynuxdhkqmgmar40zo45hvxcf7onfmsgbhiilqbtpqlby0yi4u3q7kao9f91bsj2mfpkmx845qdmndrgvr09lj0fts91rcsezivrz2e36kojur1jltf9b9ucsyh0zl9vaa5y20q2afr2wpt4bz4l4bqnkbonaw5px3njlzmpbnvfhwsu9x9rnls2d1c3mcmbyryh9vyvh9wtmzvezg3qr0nngbzlt8xsi7egsc5p0wp3rrv70uk96cmd5n5n8e9vsj7rno18wdwbbcsvg9705py181j8cwdjg8wiz5r8pdy7sra6he6jpwi0lcsofkjfa7r1jkomi828rmg0lii4b4uua0qpwnndvjqfegtojxdwlhqk6m3cw94g0aaxm4pes68ya22df5xa3d7ozz4gt6gt6ohxz9723o5kijm186vgpopupvnjfms8aaq993i046ohxcd42fiqsffrjmepzqg6o8fq3fuies47eujbxjzhmaiiftgfkt448a7icuxhv26y5yrhob6gkjkwopy032mvq9tff0uz0z1w45r0gpkr0dwtke79plgxvjufh178qr6s8o1r6l1rneq1z6t9xxplqjwot3hg8y47aow2i26rp99or8g3ht0gfnivm31yl6j5c4kqp8vglrbgcrdj6nh7n0qgxvyqiqo7r2fpeyavu2zjq6q2nrq11ui5mu7c71zuitv6v0avxqup6uuz0xyl6hz5w5cakk2ehvxpq66sopjhvkv23faazgrjgmayxsmdtrh6uome9y193bv6gqqi3q03bugf76u7topfmy0nz1d6a2j6ilqugwgnivf6tptjvtf9c8p0ni0x472k294bw0isfbs8c43jbdvgbgmc1m4nx69l3r5ym8sfy09sms7cwq9o5ww068ee58u1qzv86otp6jnjxxzgt7cmjhkucouzlx50i2oqda4rganky438jil4ypudio4q68a52p199bb71p1isp9n6l2fj40f14k1h1o52o3pdp3z0kgzwvbn5t0f6yk6i4vs6dtxcvlctn6kdb9fg4ij87ofpk9ef2uaik0ti5p11qaelewhpnl4qimu7o8gq4rxhajd90u2gbetuzmfk6koa59xqr2o66gcdkfrpu17n5x8rve1hdcy8i8sv32ys3nk6brpv75zr4ph141zl3n045qi51mps950i63on8w20odt5pp1f9wggoe6ofanqmelikj99w6gmwdjz8yehbqf7r5d5ep757qpatyp4jaohd5zg4fudr82rjnd1evuzfvqmot0c2xl4n9huy5hypxo0oxm51j225gvfjj4wyx6d9jsgnfnrmm2rv5r5v5uh1gh7sa0h0h5efu41xc1uzkly00zb6491p9is1on90h0ea6v61x6970b2wa4w08tioxpeh4p0hr90pvhpih56ag4biwvr26nqc7op665jhr7nnbn92983x42wkvtdbsvsclp4611phgin8dw5n6semu6bz5hs5m47i2ojygtapfwkmut17sjv8gbt7839twq3i92c88loss96ark04guiodt1l46h5gq56lzlndf60j5true3f416s8fi793h5enwjej1w2iow91cxrndey4qc71l780bdmw3kp6tuzhkmik90pk4o4zl5nix1ld0jhmd18kvn1wda2q2vl8nv2ysuyv8kjqtns8wcx5lut4jaf1fcj0two7skuqhwiteg2f48jntmvk9e3tfjbk3uwk15kk83y28i8eh2vqa179m6it82sbcektoimpr53ybwdybg7232qrr0b5w2z002f6zap1row70ywfjfkm6usz2lnda9ddhmh2f7p1m6k1m1a1nao2t4ca7prkrre1ati33xzsmb7vd00l3ecssg0wi5wzkko18dd0f4zu1cyzdlomuw5kqryz92aqcqqh850dirvbo0nlylu3b4fi22mm4qgun8tkdt2lpnfnws20ocb3m4sw6np9akxnyansjt7yjqgvs7gmsb0pors1qyuno81r1qel5gxj04lst4klnbcw5o6tlkwkhvr9x5zkoy5faorlsyuepzo2g0hp3z5x7c40f6nm8lj909yc80i11dq8xueq11enhba89hp1mo3oynoxuvw43boan5azsqp4kwvag7lxf538u6f108aptb64qxim4f2vfak2rxrpwlsthbzf2b2ycb0goumzuwqtzn0ar7shv4u1gqr4irs0aatziumt21syw92ei428305z7gmjiwoo3jqod6abzwnyqpncbul3rn4r80zpht5ay71bhzfrq7g2b6xsahezvejj9q0du6ag1u5wjnx5qmp4tatp6vsfbq0otxf3li8eihyb5klbz1alargdstju595b3c6pitttk4zehgqwl1cessf9r3a4z3qp9vuvor4qvqwo1126qobk2s01ad3hytv1g7omx81926qf8i702h147ub2uaasnkh9voyfrk5o09izvy7667q15ftgor3ocjxh0lawrj339vyclvnkq51tkga95e7s3vukgldn4q5scrsrnar4prn1ewdarr5vzl0kr61zoupx87fkbgquuf9ek1rde5i865kcvt4t2tdq2fzylv29tgdq11leml9ziv4zzrova3eh5nr9zpre2nm46ofxx7q9zsvxbfy6ezf3bw065tblxg4q0lmqd4g6tqo6ti99yozgmb8es572cj74ejtmex67trbtku4kxaw5e8d4y9unsvbhva4t9fd9ytw3t92gsc49ttpn05i0jyq100yqb74j7yqnsza6vhv45kd2j07217w2wqn06u1gygdaraso7m2a6615bjhiwufrxiia2hkwaphxlpqdafco6kgml6fwdhwzk2hugp8gfahwzvz1024qbl38nait3ioby88lxj9nh42bv04nw6zghewi9nyuu26ei6ygl3qapi60qykbbq5r04kmphl3x6e62mkv3czzhl00mxsrkhl81vluk9gb71k2um9iub3ejig9pj4s531gbm0xoo94ap2xt25z3fvuepi007uxp1tph93avtgtux5hse9peiacbqlrwcbrqzax48vj47lipwz5vwhn7q2eltuvn9vbl5p41u0juql2gfhz8q6qe5zu992u4o709jra5ugfd9uwf178bfrjd2heopc29433ru5hoht55soim30ac9mqanewd0yjum3dfj57foh9c5lgvwkdt3iqo0p3ygm16ksiodo2kgdxi56fo49vtv8wrfcmifkxarbb97hfi7kl0bvtf7u1x6h0upqz7e9197df3bemd4r4xoab7dpvs4eq2o9hixmr5upnhvihcfuom3hhxc8hp3getgugksyn7xgvguoh7e1oeul1nces4u31ugypjxxndxdogcw5jyfkfupofjkuh8r0d5sp8fm3gm8e24leq8gjxm7491p3aus3sflyt0lafk3sb0oyb6jnah2eawnp6pzeetd8x6s6z50yfqtlqhdh138f1rwfiut1n0yhzg8mbsaio03w8493ez6ruxkuezzctb4t19dn8l9tx87w918sgr7gdujkgleeepiee833927f1kt3hd1tw1ibdqcci2a1rezokpz9irmevhmrtbbobt1vsgtgaryrfntsyseyag4p2itxcybcw2iveavexpetdl2pxw453hqyjixa5uyv7j7meaan1cy04j7rxs365ge1gb2bci9m868smn4lx0h6i0f99ynoqswohexo7ydb0tf1yo8jy40b4ctaxkrvosx2jr5c1twdq2a2571xbjn0tifq94ufekkv94c9znd3erlgdclxo915vncnb822c8xenvojxlyls9wwtl3tepf4rnsmjf731yspzlepwnjfg9a9e4t2v885cmzg3xatb6kz50ekbq93u8tn617pacsu8hiyxchhamb1if1majsehz7wcp2rxskt3i16xz1nxu8ltao7sal7ol1a5ep7s75z9oaaq8us2r5z3wr55qcic5xsclsobp16lmsdrkutt334h36v6n77trylqbs5saikc1l5hh3bevpo0oyoeghphg0luyppxvgmbnev5nehpk69rsvzh7qcoo43b63j551j5103we72vfpde4efbjnzdhrb4fm7a1hoivipwjkbatr7qertrizlmijpadbgmqwb03o95p60uknhzrbjsvi57fsta5xan2jkbcwltc4dyxthu9iumt8asii793sqp20z4w347e5tgolmde3ohyfx0zlbbgn5onf7xzoa7qqhnv2r5aqb4wigxsw7i2mza8ft93wmifru7x81ntnx2jpx3686sca2hqscy0gw8zn6op70hcgb02bjxrkuybcjnacd1baf41lqk1t8g0moksigoqgfjnnl7o2d96w58ipdi4k7kipaps0jiwty3pwwamlcyo0di3eoa645shsbc8mzaibrzio0cbgt64mq059fxcrlpg1m6tpwyqlnl0yncuh9n2ign38yf6m58skrqoiyfnwja4r0hte4pmnn10yeyre0yyoryeqzje8o5mxnfsxyi81r7hz4q5efs27wsdr8ctnhrqeojmnm26b1i2wj4r3093u662rzwlax4548z10x5eujiybpg4nu66c5j882v8cpm1m6qyse9jeuls7uanwm0jfj3derznq3975p7gx82fd8z7nkym5mjuiek8wxmwh1hn1epxclubanla36iw5ymdr3vi7fuj0od6g5sh35qg3zxoddf8e74e81gi3jatylt1rhqzyccp10t5wf1j9c1tjx5bqv8p9lioxq93m9eeiq5xojex6dzym32ab5m9gjdzmqeeih3js0zcv37xvu07iga1jmamqxl0soat8s9hl1gzwlp04tnd2uvkk2r7ks6y5y9ggisldm2603l74ufvaz2tvy633q9zkr7iof271p93mbueqmw4kxfxmj1ekgj12p201r5kjjd0o3tsl7l12g0pdltklbrom6t7j4qnxoa1g4hlmsxiqeoea88r67mxp4k9loarghwfdsaxihm46z5twrqrh7hi2kwc8rl8t57xuru2e69ituyp6ik6g2kgg8f79gcm7y30oujpo0vzskc39dlb60qw1inn58vv1qgah6bqcveix2q2dr1nxicxvqxk4vw5686oybue362eu093t0jovuk64qjmwul40gqf84cdloate0zz779e1bgzk52vlja3xa3vbzdk1if86u1nlirl73gpu6tcaa4szxg03axhivpko1ult1svhbtu8etxf7aj563bbcm2zf2ixuodhyxbq9bl7867457vwygl6h3blr2e5mdv5xjcbzc1pnxqlcfg5zb3ns1aamanadpcy7aqo286picjcl7ednbcct3dusb94jlsouzl6sp041mshcbkftjd3hp41eqj0k963e79sbb0yq1e7m5rvxm2wrernxrp6jbemmhfwjkv0dcafuuatr7b6ssbfb5tj97tn1nddp8cug7ccb2k3mz3pbm93qk1gyqpk6t515qwkvhlvvnqiywomd8jr9ibvlm36ha39e52g8ec8tn9w20dr2etiqb9cnps0l4hte3c9uujlkgq1nmhznlswu0s5ab14326gjx1bcnwlz5bnra8itlrazo9gmbrsnhkdfjo86z10ylravnedtm7nwz6f4udki881uvldhxl5t48frtbytvyp6ebl9hk6b9ceolldkktt3qp4y23498d9ggxlp91ibj6xybg1ov18yw8w40lic1e51a29ultpe8rlfpu1l0tnb1ti77976dy19hl25cpnbxwda6etgt3r9pbmtj36aiytavk8085i20o3fl4jmvr1n0dnaqmsjnskce2ycviavbgqzr0sliekkize7t7er2yjfc7ig7iq3foptbhfwp8y1b8em2yftbzxrssa50esko74i8cmnjv55c43yji9ryut2exnw2uhq1ixtmlgxq7l0yz5c0ss51l73tvvlnyog91ztfw5qe8nurne2esc3ep6e9z25r53dzqu5fx6ept44tab46u7rf5fndbqhmf73rtm0zupokr3v0j2r3v881vj61jydlclgpk039pvv2h3boezsy1cpsfa3gex026a58dt51ohczd8lzzcdrj81ox83toaag52mf2bf6qd3mx9f9bqfnu09tlh36rw4c6kqlevtzmkzgvmj19z4cehzyh6u4ls8iufw4vkwgbg3kx7o44cg2378gmlk0uxidugsc5fnlk27ocike3v6g2howm3gsp5fb1vlzha8dtqadpyzwdqpnjew6wxg9c4n84xt8e9g70gh1n9uzimx4u51y9mfssr24nbxktb9lub01wc0vihvvmwihizruys4av8w6uox4j6g05s08m2vhmy7d970zohsw6wfeqtv9w77mimp8mtasi2ah6kozfpwgodjsi4h8b4obcnkfkqbec3w4au9uw40ioyci01ibt4q7grfr3idjfclltz44cjil94fwsijsbrljzkblp00972skxyru9xo78xjor5ale9ttr6uv6zb3rjbfwei5p2z1n66e1xalpku685mxkob51asoyi009789iq4lheqsu1sl8pctd6zmmhx1jeou9lcw3w19sgrh2fd7raif79n8bkyz9z0j6epmzpahq15p7cjykm13lao9lnqpabcl951mig6voyvkh6uag2i27ebr65q8ftkmcjo9vazfkqz3kjpqucx7eab05m21sybtnu0j70a8s1mm86z7if3k6hspnjzpqq4u2zy522ayvdfth5pfifselflzb4mgo6twlj67g2mk37hqi9vuyfz2jsfxu4zqtoleg252q72ylpw9crw6vtrduwamgxwcklog9s2zl9owiplr67mv7hhy6klukopmy9u9wdi37gyjdfe97kzx2a1dgivwpy0o71ax3rg7nvelr7zin9p44ic38j9400z9j8mw1lpmek3fjeb7my0058jm2j90n4ufzjb5aym3xgz510i2f66jmq0jq5gofu7btyutxnubd6nffnxey863z81e0zutk3exug2nmpycylzs3rr1a1c41ce508cjoqrttrj8x93rd88gkme458dgpymsiqtsdb5t8odpy8mln6e36kymvv9fi62p4sg728ne00i8f970rtsjvvcow66dissf6l60bnsg93jfdsdrrb3g4t8xo1ip9x02784qwy7mtj29nlx19mnv5rrfqrz9q5g0i21dqzwtxdb7jqgofhmljqjcugzbshmgkcgcgwek0tzsscq7ev9map9rz98h5fy8bmc2ia9rk6dahytuke8xr1ry5b7ixn6c14qpf4adak1pgll681h8vd43f856sj5j9tpetylmncvufx5u1buwgjbwm7tnc3joz47e8cdafmq6vzpefo4f6n2yjq5qbot9igrewu3isc7hu9t7unn1wbga7s63cqxualnf4vpyu48po2zyc7uwyd41ejxoif0w6dorj0uoenc3sb99k89986vr9mp7hk5alj1rpy19qmac1ptq0xvz2rm9wqzgddmgcjyvr8enfvkmguy2g7pqu2nng8j7neieutlp0cey6vcz8dqrbmtxk84klpkxmepr0vrhi7gbp90bxy675e6xy2pboem0a9a5zuz0arcas0vaxiwkf5g2vfaqpibtgwn65e16cs7pjhp0k6f4n0rdxxnqk1mt4babc0iqyqw3r8g21nc4vjkzgxef37gbcfrlzesbar8nis9hvg79ap7ubbx08ghj79rn60w0top24zbhqul9iycipm3c7w3n2665v1t80agclwa4by2ael7zk81kxp8i84bxwp3gfjd9llu20kkyk0wj8dd4xnzhc8pb6g6ia1iiqhnkheznwzmw13aqt2krbm51puovq5cubeuvdmplxdbg4npus2xaxn5h60q81a9bguqoots3ulcjufyipuaepjs6yssh9knxwzg5cojttkpwdtkz3nuzjlfkr76cwk7j05sw6wa1szzd0kk7lpdfyecot2ml9520mahk6gwv789q9v8jy1t3ztfwr88fkvi5eoefw2fsdjuwaumtoivv943n4gb5mwlkkmi9l7245mgfb83eiv9s2dxnrrhgaq01d8tydo1tpjgm23lta98ifowvh3buo31ng1onqewqggwlpolbgrl4p1o53tmo71iqughguor4kce0uzshmwljk89dxf5bbl2hfg5bo1t1m6raor3hbwcvs376yuhhhmzjtmsj6razjz5yjvb9me6sjpc0vlkc2oa18znakroz8u9m18gsv6ud99hb9za8cayygwl60ryzuzhos57xm6588iorzz1lydm7mk2dp9slmnzki9xtuz089sdzrhx8nbdp0xq8ee66fabsn9190afcbomfxgh88skv4le2o6o4xbqy17ucjlq9yakcidakrun3uzezex7ynhgb8wogqm3wznlt4vlbgc3xjnt23csks2seck1obkgf4uecg3elr0z3wntr6e1nwvsvwtmgm3yq6itxkia57drib27sl0i8lutiqnfybk724pzhmvw44qedhfbq97njg0pifb2luqfx5ik0t0hheyz4o04wvzwkdtve68k0r1unwh3w5snehqs1nvxjx588fa883dxeqyvx4c389kwystmo7ozsrkz5lkuhxtev77tv00vui4v860fntmcd0ioa0wp6gt431z8h89hh8v3j6h801qm0jqynz580d8ro33s0unf3se0k5x4ipywjw9koy8cpfqt1cdv9lknvtb0cd42qnms5n68z2g9gm2blpln2hr39c4ao9x6n5y1rvs82g8yt24kx1ghg3sh26wawcwmcdd92h9nbe4weynxk7ebmwdpud7um4b7wfb7lwrgot2zxhz3m0pc61yi47rwjf7jlcjrwe7d0z99s8mgosoxmemk6n4496c6lx6128a5ujzm47q9ztncuc6u07kb1e0kd19wyxgm93ay01gkd5gs1zq9pj138ia9sxx717an5iojiw56v42nbu3nfuilsova4x1kzgu34g2ojol4l409s7q0p06zri30al1r3xembtgg55pwnr4c77qrk84l7s42flgxhvkbc5luycjnozq1d3ou6rqc1sdm1zaarjc90c67811vipf7shpt85w564nanzt56qhw9e1icgj0pbrq5nh8ytih2db3ttfmg7ar1ksvtsn8t4a529l51i8raqk7eqhz0kkrg2xv18cb8eztnqbvj4mblew2oj7k4rxooymdpi8gbmbapwyzhtnnqvlw0e7mn0rn6flgvkya6hw39kcof7snf7yc2j6193mesmew8qeaqep5l49s7m9osffcf0rh4x6ala7dblwzzioks6g3b10n2ynd72tp1p45sk8itgem9jonskl0i8n6ntjd7ez3r3idd5mpff120xlscf61zx0fehd2jijaun10nomz3zxm0tsmsgvama5paz5lunmfxbyzdi9rud9rsupa1httyscnzvzfcy46c0c4e7i6dj9xwneo60h5ty5mcw4p1r59hot9ny5r3t4vgrmry7almo3qeto6no5t1lx845elga1rqdrs8grjsn878qhjdkh8oau3805syzayb8bhevnk49f10zvn0zrfzz7ro56fz9qj18a8t0v9efkkwz0pm64jxpjw1ujo4gn7ii6fqepsl1r103pgl8p0gkbqlr9xqxf61alyluqcjfvrtuape9bice5imhn5fqzjxmlgk7m3x1zofjvdr5joqso0ievz5spp8178pabychaa1i9gq4138vlyitqpfabgr3nltxdm9zky9yktu0oo2qlar7hfnrvnyi0gajrewu640f83gz4w2fj90hi5cwyz4x2ua1hn7jzoz76gpex8au7br5bs3wad1gjobc28w9flmd533ndwonwhmhd3vgb0l8l80o25493ofadem3328po4j37s973hsznd9r11kwy53ui6cdjnjln33m6qkegcp5osj2nn6q78001u8rx09qw9yq28eavz55a30ok0dih261rs3y4uoh4a9ol78xfpo812jtqw5x8shfabhxazb6eb4gb5ewtk8ihlickr9upisav5nthj9nn6w470lmz3nmfzwjurf610qrnmfws0uwdo7mm1fmuhp8zo0x2qls9hczzglt0cedrtn4uyboayivz5bp7knp8hdil35nclaungythz7giwl37kmwya3yq4z4g72qick8z98ubh042hgphnmm22tsgsaol7hdhau9gs9y39stixv24va7njb5qrzvd2qut4fvz8zd456kqjn236346h7lilq1y4bbhl0dyvixdtrpecrodoxcjuez9kl9ke1kobbla4j06jrg6ypx5kc737n8h70cl91ahhi98hghf0fwjyuzokvhveiz1xhlmaxc992clubqm9uhralh3feeay45b17q7qffelttldzx1vnu2wte46kpxi8rvxrek6ooqusxtx06hocpchuxx9cevki2c17joc6h82n7a7d8xg0m65ag0z7ks2v3v5la7y0gdimf1nexe18ogxu7gbvwlulflryriyvb7vq6qk7vy6wnuuo6q8wb18f66uuhnb2x0m1k0m4f2cse14divfwmw5pt9mdqfzl511khen55h7jhy0z7c8hw5xdqq4w97osf21clamvymlaa6eh62qdecz72to5o6chhsh312zbaoq21sfmakmom9tplw40w56ljoyfm2w2i1gxo547xp4mb4k291feuelyy6ucs385k9nz2tenpurtgpau0crct2g32hn0v1t0yp3k4uc8p2npp9ligcmo5wz85qpzag7cbkwrg67jpk0advsguwzeplri3e1tpmqgj06z1nb8bhhadg7o72xgxzee0xyw3l8afyxpmywhwzqhu74fp8tkl2mlasys3abe6nwgu0ixwqo638se1iyjp2h6xm3ww2oq8w6dydszhdq73xjo2uukc2gn2wzmb0gzvvqpupa5bqr0mrmw8l0q3dg0xk1dh1i1ro1fk9knsoz7p3j7peb4arqdpd4u76e75x4r64jod15z53d3gjcr7wjb8y1349qcxsjlxsac9lqozu960da951p2hw358af1ldwuan3r0g6kbcs3ztda2ssxf57msku8svtv9a1p935ar2a5gwx93pk9buoujvnmd82j0imzt1thp666p0phjvyfkwqu5grlhvye934ffg3h16gjcrldq46ik3s1u9n6lpa8prrrc5pq53azxv1jnof3q9t0r4531k5ks4vy49p45npvh1ro9tzdh5c2fztdb92294lc1lhxv44nhtwlgwq2vc03asyo58l9rkzsspxonxdr5hcvbpc5htepavp15598quc96dsgir5d8lutnkw7rcrr23xv3mlke3vymv21dkvsd6f7t93pmin13ny2xbhrwzj0dafpr7ubcgfa31ax8phzdtqvasoplqm49i08pfbjmln5q3bmrwkleyeo9oabkb9xv9801ejlu28f4xri400iczmeegs1iqzokou5lpzhqtie5b4wn1abcfz3f2ecbt6ekrnrqyc6ewsl3syg05uvpx735bszgzdc3v31ff4jc7alipav4j8ol3mypxczd34eh9v9yftdfx5w8w500hrvq223h40c78ohmis57fcqu7wpn0wvmw6iyy5kn7su784q096jrr9w2jxc9qg3maspan8ib7lk0igmbvwhnz48ddetukv6388g1aic9s5e4jpgde253dxa5vz1hhl7nh57hushzpy3zydfotrjch90tkmgx95lbe3hc0mcxrzht3ro9e4447xw3t5cxiydgb3tons6bk334hzxwgj9w5aout3b7g0lv9k06x7ei9nmneyivdmz9zviyc8pqhe283ivkys30huy12vi4unfax34jknqli6pcvt90ys99g3ay5230jyrg4u8fn5hdag0bghilko808trrp9srhk6dm550rrxu1kl31g1v2ifnznctuw09jvp2ik0uugj72lnll2zra9yrz72g9juop5ed4pqzky7ln9oibw08e00ou072emhjvns6mdft76zjcqmd9jzhocn1pretxk4rfwg1fvjdjt02huxghe731dvcgo39mhn5krbyrbm6fn6oz2ldlpxft3wpgziujgots94h6qid3rcfp0wljhk9vkbq2j1i5if65cam20p0fqqoyyeze4nsgk1x92zqo7hg9x47jjgdt6burmh74cl27rga8ea1kvezontn2geo04k20p26l3ln26wot0dtbgbo07duqnsexxadb4ew857vx50p4jla8dpefh02jmk4pcagl0xjxwahdxqkqq390gv1yrkm0d6jr6eil7kzhiggg7bc61cu327z9icuk1welecf9df16pmf1es2jirukl0y0xse3abpp41zjd3eho2feqcpz191s7q9nfu2zl3jf08livdy0nx1sc8duuunoi8r7bdfchv244dbxrwu3ztxdb29wonzaoxnl8wf2fr8l9omy6htrqnuvx1j3u7ityhz4zp7nt2zv9cnrx8l45s708w6zbrofk96ywyzfouy1cu83del9gll6po9nnllawmjtwp6pumywo9kdts9w1wkn0tp0yw3j7ih246qb6uwww8omjw35to1u5icu41srg125xqhqib8sci4pqvlan9tk3g1ca8gob7iubcg3fw3l1fbcxgxyhl2lqd0oga5dpjlt02eaeycec9n8zra6r9k06zgjwu8sr2b2sd7v8z8qjg3x8motpjbc87achj7ky3y64lfatakuhzyyndges53mlzs6ew300wdqijr3xb36meutzzvrj495y6egdie6ezeh3zg9e5pe53qhc93grhwf9tz5mqffctvblmavl1x11a67kppzje4t8j6nzm69eypwyk9iu15o48xutu4xkyx2skkksnk8a5z4hh1msoi1euinxzt22mv08m445acso3zm4r6janhb1u83p15pt9sr3u1i33whmgimahlc2h6nrqleazcfrpf38359xxhv9luortrij9u5qpnboa99flnbx5dxakpinhs1wmers9froo6n8u3s5qpeza6aax3wwowg8irbpek3piws8v7bbpogfgx8bmreuabqr6lfcmi7pnslumnjwcocqwyel79y2uuzk911sj9cued7i4rl3719i63zpde8uxq8egk33u03yaeix9cj986y7zojcmzw8l5a98gs3yacuurja6cad7gqrrtpx8y01g3cdapmyuy15vqgtpibnwwia3fi888clc2ves0l184n5mba9bx5lpgm4nnctvbbzpivfk4qrsrd33xa2b0l2ed37l33hopo8hpmfjx9di6sco059lz7zdg60hq1aejdc4evlghbiroqxy1jtqt6c78c1owmzww4zeoccznih8q2kwjaj8o2nito72l1nnekjddcdg619plxn6k214dvnkgie8uhmwupwvwejjfl1iqbxwfnitgsqg0u8yb7lxul4g0leu7sezl1ek1lgsqibrpmgvotnaelbmo6r3l22uarz2j5m9d9w265be5fhqy9jf28wqdnmi46lhr0osgta119nbld9il2us8o1z16s2nzlmk3tfsrwg0sw619q2lqukjk5hzzgplj27p2ru2ccl5m82rv2qw0paid6nek1772tnib1c5q3wp37lmiczj3l16as1gnrcsrmhdrn9afda580mkoupqaiqvegp5fmwkbg3zjtzaxwt5khbwfjgvrdugx3o2jyi085kk0ir51nhc0oq9v1rz4q05ii649duwksmft81s0rj2eg3fj8xzf9kcjx4jcvsnwjk5qmv5imfqv3o4gbpnfvs8u1yf5fqsqs3k05yquis55aro49ka1ceznnw66p0qr2wt716wzsnvcfbiulu106djqinlk7qtptl1ae4y65985rkbzjba2wkir45ot2lzdqli7b2n3q5la3ia99etkmvepziog4hoaar9535g3jgtadjsln96fky09dr7pjc0drm062vn5xr4q52eqjzhhc5q0kx5ibuwuybtwa8rvnhcejjlpsg8v25lzxn5m61h5ox431obqcu9v3p1c55j0bfdnwf3pwxgnb9pfwsmslx16apixqpfyosgu2hx4g2o11l1ppnblyvh6k6h6bur32y7f1qe0ih5razxvsk8xa4mjsgbx67k672tg1j45t5365eu0axxbuj9t3bsqfe8egmcnu2l5aaiywb92dyed2w47ey00o5l09g22uxjna5rdrtlfg0lvzp019me4uwmk4am9kacmff6dldulyzxungvqeuizpi93ooni0cy9bxr7m7u3fbmnt7hpfymzbowrc30qjzuupj4mg1u1xqkbnp9k8r1u6y8bg7d9wxmpupy6vl3b99fcgo0v62qch44rumdp12hajn0qb8ayf4kxf1q1rdc145iij4h0r6m0o5l7ztklfeurzf48svcejjtx0aa1ooybbmkd4ppofnpnhdkma2gcjobomr1xcraobf54wn65p6tjkjguqpzkg0ckn8pk099ewp1h35rhzzni7wzucjk4iujx615iscp74pu30zy8c5qs9d5eq27d995z7d6pqq1l2i1u12hh1serfrbke918rgcbur4r1z33iddt6ee78hlomcs6zx1vnxyufot21yk2wx8sgjf2zylqda9qqjgp2jeo3rztjg1y810ftzu71cmo14mcofkokwkmizplv6vyve0zne734r5f94jlye9uclmrsvbfk1o6yr9cfdm0wccsfm9p8g4lg0ricb89cezs81enxp7alzcqac8rlq766oajqf7u27luqe9gov8gx072rydb0kpkwdajel531mqu1m7x9f6xaarbatu5lii6919nylze1j2edgimebor52ufyu34je4bxingdi97fhozs7schd53ngklvq4xud9xve47zxufptq8q81xgcrcdpaemb7ujg86umqwcpiy9rspm7yfuqe68ol235jdnsvdfncppi2pmseo03y03hok99yfv39b6dstgjmn67afeg9c3v513gq2309pt8c5xuc4ql8guhq6o838e10jnrock04lcy95xnc1g6kidyz8fmuhb4mdn7h4ho1xm26rtltuz0nf3n93gdj7ibqw12ya5rtmx7z88jgxpvthu2z01mr7j4bri4992bbtmppc9ndms3i5i9z02apm4ep5pw5hbhqxcic1fzxs5q31k3q8as8cbb7as69nsg46mdany3020495qlt4tv8y667r8bm5zqxew6o1xmxczzsb9w8oe6jvagpl8c2cjvwietb6t8nj0w92sah9wccebeuux8nsho444hh7jdc7l51fvcrfpp6vahgd6m6f9une6hui64j3cu8kcswek7tc7xox4uj2rr8ot1oe5d90eaciexor3oyux84famexqlh5c445entraqys4sinmhuub6ts5vna6u15l0th2d0oyfye4jkk9pqshx2z8kgz87v33d1bpuwkjupsdvibd52dxlf8l3912m1wb33zy7h1vcvyaelxtzyub473qfpr706wkzsr5isn7khn7x8v632zeh6fi05trwkak8dmesmctxi6gsyrpbzeoa5vl07zw92krviphxi3uwssd68snjt73kabeybssyhg8436ppdiyx05i1u671jptqeod387vadxamo8brue9qvvukk7daparfg7njkohrg6m40vixspwyyb1jr9b1c8f5oyamrq8gqde6k4cjjdaj0bul1dvn1r69s5bspyp42ov71pneoaurepvfa4c29fpmtlwufeokv38gwwgxmmgrqz5vibsaou8hj81w877qz9b200bsch4gjee7lr2o5rehxva76hfemdahh2aovdr3jps3l7xrykv5b12j08xiaxux3iooumnmqxx790f53ml9c2lj97dd9yafujyekksp96bvf1f3uroalco8idjlgz4jm27ocdkwzyhuieummxm5rqsbe9whgad2ope0zpewtfg8aafq8edn7gsf27zjf1fmtbunruycmlsr834f4f6jy30adu40d0r3d09bzkwzo0qmoeacrpl90ektbvg18i72mnddnpjuokxi966vlsqc9dcfiiwwhccsiqm44w3qlwbk6ldw14zc9vhdvz668svqfdru0jguwho325m9qp1aeb2w820tyi3jbmjf46ul6sncw3x5jmq2ew6hhki8e3nxzjsq4ho3705vp1jbuzwl9j9hk99hs16gketobi5hptcnaela8m1aus89o1gxaaglyxe0m9959rsn1p1vdugkmpq4opv6pjpjvczcdffaijmb439m82xab2ut42pln6qdrrb2rm1xyqx6xw127zuo715nf9uhbnnv459qs6pdlue0k7jvvjlgg314av59k9rj65izlev1ulhp0tgh7ffu9aoiw0c6e8ijs53dxa0gwbt8wcgn4awpwworuwnya3wvim163df5u3p9a17g35voh8xpvqx5j3m8vzhq5jqwhfxmjfjuqz5u24l5lpkojocf3nctltcbrf8kz15l7dikbfn1e4nofazbfywdvxmstyiezqircdmecwmw7au55xkdiq0rh16mvtggvyhoenehlah3yiynxjxposd8jis8adhii8qh17q7b46u3rmcddxw09h36o2kpb7fzstv1bzp9n5dnulk7rkmanoxgnmvoedg8ugb3lwilhocgbgvfdb4woygp5u4kmagicdlxtxhi259cqf16ac138ltbfhxnhsl5eaix98gb5oche04ccm4saf2rma2qhh958550d2vr3grflwoabs2zs924scf5olrbb18d8c7j03sqkx1izlpx7vve015wtty9y8z63j4rg51kiw82xqvy8s80depu4khpsnev6i9nrr0k6zwuuoty5bx8g9w9yobuhvojmj0skwbywpouh2dujrflmtn7vulllxcx1k5yez0sa4rbm5fxjmp4eubshxha0uz1buqrcwcdjniph01qsbcxlpbqck2j8hm9v4r8yw0uy9mai6ahs7w90f1zvj6lt7yor3nk3r9gv76d3eku3d890cc80nkbnlzekpvie55rwtgngjn36i2dkk1k9m7xpv028kisjxq565m9kuppaqg6ti7brg0y0l1fzp595wi61es3w4e8t6hk6cyxwu29vjs3041iq22cbs2p1knu0imqk34v5v7bbcywa2chm9h86mrwwgik78yroq5b66pg6zhgpt0tsym64tuo5x2690mfyprh1w2c8dqrudj695e1bh7908p74c01biykody5d27wjbjtgvgzzbztr6rhvrvvzt6vhha1zggkclq4423svqsdhngmomhljkn3ccmz92gz0flwsvwuzgjusfsr80d4g70myps4gskat2487g242igx6n6og9s6f2t49ziy0ksl73vgt4ay5mik8r045yguz4w7rv6zy8ral1zk0z2ajez3qvx4e56vio1eazn1ct18ollfo3krtp8kx92jte9iog6m2p5r3bzq8ff15ra5iegobh2xwukkmotpcqn86l6ft9ccp67c52dtpsg13ac57povak03d5uzydvc1ylyveuk81nm9ji49udy0xe96sffng6kqaezl08wairoe0lj6dgb41zrv0xyllm67jp1j5nr9jyvedlgz2bv63loqfj3b83nuiyczbml1latmcl6iqp5de0csnkb33mdkdh71s2rqj69pzj1cdfkkz692bg14qchvul3vk4fv1gpxdtp3z7fna44vb1qbcynxvhl8szbmtsg4tz0hbxu4i5owsf4xq8wzbp8a9trfuq4eepw1v6fuhllbpa9m1z1z42mjrduf5nkq8u0e8acon2n4u34j8j85bigvg4i0bwkjbjsmfdfgw0rc71xtdhntk1j1am5q9gjl27nv74j4i4fu1utpq8fh9lnile4mdhdlwyz0th743pc3qdcua8yof7vpgoctl9tb9ojngwr2kkkrmxp0b9k9m85qv2ej6pau9jp7vfb1qq40ypn2d3nek58v6fhtmezk6htg78gjqwacm74cujnltm4942qy2onflh5yh0fcghrtm2lre6003cac7pbwk1xp4ukdvem178y9o3gjq0b7hqov20c93dr10njnnk1agkdnvv5p2adx2u0mmy6qp3963qdputp2zpko1fdle5k*/
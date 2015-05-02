(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        function corslite(n, t, o) {
            function e(n) {
                return n >= 200 && 300 > n || 304 === n
            }

            function i() {
                void 0 === r.status || e(r.status) ? t.call(r, null, r) : t.call(r, r, null)
            }
            var l = !1;
            if ("undefined" == typeof window.XMLHttpRequest) return t(Error("Browser not supported"));
            if ("undefined" == typeof o) {
                var u = n.match(/^\s*https?:\/\/[^\/]*/);
                o = u && u[0] !== location.protocol + "//" + location.domain + (location.port ? ":" + location.port : "")
            }
            var r = new window.XMLHttpRequest;
            if (o && !("withCredentials" in r)) {
                r = new window.XDomainRequest;
                var a = t;
                t = function() {
                    if (l) a.apply(this, arguments);
                    else {
                        var n = this,
                            t = arguments;
                        setTimeout(function() {
                            a.apply(n, t)
                        }, 0)
                    }
                }
            }
            return "onload" in r ? r.onload = i : r.onreadystatechange = function() {
                4 === r.readyState && i()
            }, r.onerror = function(n) {
                t.call(this, n || !0, null), t = function() {}
            }, r.onprogress = function() {}, r.ontimeout = function(n) {
                t.call(this, n, null), t = function() {}
            }, r.onabort = function(n) {
                t.call(this, n, null), t = function() {}
            }, r.open("GET", n, !0), r.send(null), l = !0, r
        }
        "undefined" != typeof module && (module.exports = corslite);
    }, {}],
    2: [function(require, module, exports) {
        ! function(t, e) {
            if ("object" == typeof exports && exports) e(exports);
            else {
                var n = {};
                e(n), "function" == typeof define && define.amd ? define(n) : t.Mustache = n
            }
        }(this, function(t) {
            function e(t, e) {
                return y.call(t, e)
            }

            function n(t) {
                return !e(w, t)
            }

            function r(t) {
                return "function" == typeof t
            }

            function i(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }

            function a(t) {
                return String(t).replace(/[&<>"'\/]/g, function(t) {
                    return _[t]
                })
            }

            function o(t) {
                this.string = t, this.tail = t, this.pos = 0
            }

            function s(t, e) {
                this.view = null == t ? {} : t, this.parent = e, this._cache = {
                    ".": this.view
                }
            }

            function c() {
                this.clearCache()
            }

            function l(e, n, i, a) {
                function o(t) {
                    return n.render(t, i)
                }
                for (var s, c, u, p = "", h = 0, f = e.length; f > h; ++h) switch (s = e[h], c = s[1], s[0]) {
                    case "#":
                        if (u = i.lookup(c), "object" == typeof u || "string" == typeof u)
                            if (x(u))
                                for (var g = 0, v = u.length; v > g; ++g) p += l(s[4], n, i.push(u[g]), a);
                            else u && (p += l(s[4], n, i.push(u), a));
                        else if (r(u)) {
                            var w = null == a ? null : a.slice(s[3], s[5]);
                            u = u.call(i.view, w, o), null != u && (p += u)
                        } else u && (p += l(s[4], n, i, a));
                        break;
                    case "^":
                        u = i.lookup(c), (!u || x(u) && 0 === u.length) && (p += l(s[4], n, i, a));
                        break;
                    case ">":
                        u = n.getPartial(c), r(u) && (p += u(i));
                        break;
                    case "&":
                        u = i.lookup(c), null != u && (p += u);
                        break;
                    case "name":
                        u = i.lookup(c), null != u && (p += t.escape(u));
                        break;
                    case "text":
                        p += c
                }
                return p
            }

            function u(t) {
                for (var e, n = [], r = n, i = [], a = 0, o = t.length; o > a; ++a) switch (e = t[a], e[0]) {
                    case "#":
                    case "^":
                        i.push(e), r.push(e), r = e[4] = [];
                        break;
                    case "/":
                        var s = i.pop();
                        s[5] = e[2], r = i.length > 0 ? i[i.length - 1][4] : n;
                        break;
                    default:
                        r.push(e)
                }
                return n
            }

            function p(t) {
                for (var e, n, r = [], i = 0, a = t.length; a > i; ++i) e = t[i], e && ("text" === e[0] && n && "text" === n[0] ? (n[1] += e[1], n[3] = e[3]) : (n = e, r.push(e)));
                return r
            }

            function h(t) {
                return [new RegExp(i(t[0]) + "\\s*"), new RegExp("\\s*" + i(t[1]))]
            }

            function f(e, r) {
                function a() {
                    if (P && !C)
                        for (; E.length;) delete U[E.pop()];
                    else E = [];
                    P = !1, C = !1
                }
                if (e = e || "", r = r || t.tags, "string" == typeof r && (r = r.split(v)), 2 !== r.length) throw new Error("Invalid tags: " + r.join(", "));
                for (var s, c, l, f, w, y, b = h(r), x = new o(e), _ = [], U = [], E = [], P = !1, C = !1; !x.eos();) {
                    if (s = x.pos, l = x.scanUntil(b[0]))
                        for (var j = 0, A = l.length; A > j; ++j) f = l.charAt(j), n(f) ? E.push(U.length) : C = !0, U.push(["text", f, s, s + 1]), s += 1, "\n" == f && a();
                    if (!x.scan(b[0])) break;
                    if (P = !0, c = x.scan(k) || "name", x.scan(g), "=" === c ? (l = x.scanUntil(m), x.scan(m), x.scanUntil(b[1])) : "{" === c ? (l = x.scanUntil(new RegExp("\\s*" + i("}" + r[1]))), x.scan(d), x.scanUntil(b[1]), c = "&") : l = x.scanUntil(b[1]), !x.scan(b[1])) throw new Error("Unclosed tag at " + x.pos);
                    if (w = [c, l, s, x.pos], U.push(w), "#" === c || "^" === c) _.push(w);
                    else if ("/" === c) {
                        if (y = _.pop(), !y) throw new Error('Unopened section "' + l + '" at ' + s);
                        if (y[1] !== l) throw new Error('Unclosed section "' + y[1] + '" at ' + s)
                    } else if ("name" === c || "{" === c || "&" === c) C = !0;
                    else if ("=" === c) {
                        if (r = l.split(v), 2 !== r.length) throw new Error("Invalid tags at " + s + ": " + r.join(", "));
                        b = h(r)
                    }
                }
                if (y = _.pop()) throw new Error('Unclosed section "' + y[1] + '" at ' + x.pos);
                return u(p(U))
            }
            var g = /\s*/,
                v = /\s+/,
                w = /\S/,
                m = /\s*=/,
                d = /\s*\}/,
                k = /#|\^|\/|>|\{|&|=|!/,
                y = RegExp.prototype.test,
                b = Object.prototype.toString,
                x = Array.isArray || function(t) {
                    return "[object Array]" === b.call(t)
                },
                _ = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                };
            o.prototype.eos = function() {
                return "" === this.tail
            }, o.prototype.scan = function(t) {
                var e = this.tail.match(t);
                if (e && 0 === e.index) {
                    var n = e[0];
                    return this.tail = this.tail.substring(n.length), this.pos += n.length, n
                }
                return ""
            }, o.prototype.scanUntil = function(t) {
                var e, n = this.tail.search(t);
                switch (n) {
                    case -1:
                        e = this.tail, this.tail = "";
                        break;
                    case 0:
                        e = "";
                        break;
                    default:
                        e = this.tail.substring(0, n), this.tail = this.tail.substring(n)
                }
                return this.pos += e.length, e
            }, s.make = function(t) {
                return t instanceof s ? t : new s(t)
            }, s.prototype.push = function(t) {
                return new s(t, this)
            }, s.prototype.lookup = function(t) {
                var e;
                if (t in this._cache) e = this._cache[t];
                else {
                    for (var n = this; n;) {
                        if (t.indexOf(".") > 0) {
                            e = n.view;
                            for (var i = t.split("."), a = 0; null != e && a < i.length;) e = e[i[a++]]
                        } else e = n.view[t];
                        if (null != e) break;
                        n = n.parent
                    }
                    this._cache[t] = e
                }
                return r(e) && (e = e.call(this.view)), e
            }, c.prototype.clearCache = function() {
                this._cache = {}, this._partialCache = {}
            }, c.prototype.compile = function(e, n) {
                var r = this._cache[e];
                if (!r) {
                    var i = t.parse(e, n);
                    r = this._cache[e] = this.compileTokens(i, e)
                }
                return r
            }, c.prototype.compilePartial = function(t, e, n) {
                var r = this.compile(e, n);
                return this._partialCache[t] = r, r
            }, c.prototype.getPartial = function(t) {
                return t in this._partialCache || !this._loadPartial || this.compilePartial(t, this._loadPartial(t)), this._partialCache[t]
            }, c.prototype.compileTokens = function(t, e) {
                var n = this;
                return function(i, a) {
                    if (a)
                        if (r(a)) n._loadPartial = a;
                        else
                            for (var o in a) n.compilePartial(o, a[o]);
                    return l(t, n, s.make(i), e)
                }
            }, c.prototype.render = function(t, e, n) {
                return this.compile(t)(e, n)
            }, t.name = "mustache.js", t.version = "0.7.3", t.tags = ["{{", "}}"], t.Scanner = o, t.Context = s, t.Writer = c, t.parse = f, t.escape = a;
            var U = new c;
            t.clearCache = function() {
                return U.clearCache()
            }, t.compile = function(t, e) {
                return U.compile(t, e)
            }, t.compilePartial = function(t, e, n) {
                return U.compilePartial(t, e, n)
            }, t.compileTokens = function(t, e) {
                return U.compileTokens(t, e)
            }, t.render = function(t, e, n) {
                return U.render(t, e, n)
            }, t.to_html = function(e, n, i, a) {
                var o = t.render(e, n, i);
                return r(a) ? void a(o) : o
            }
        });
    }, {}],
    3: [function(require, module, exports) {
        function cleanUrl(t) {
            "use strict";
            return /^https?/.test(t.getScheme()) ? t.toString() : /^mailto?/.test(t.getScheme()) ? t.toString() : "data" == t.getScheme() && /^image/.test(t.getPath()) ? t.toString() : void 0
        }

        function cleanId(t) {
            return t
        }
        var html_sanitize = require("./sanitizer-bundle.js");
        module.exports = function(t) {
            return t ? html_sanitize(t, cleanUrl, cleanId) : ""
        };
    }, {
        "./sanitizer-bundle.js": 4
    }],
    4: [function(require, module, exports) {
        var URI = function() {
                function e(e) {
                    var t = ("" + e).match(p);
                    return t ? new s(c(t[1]), c(t[2]), c(t[3]), c(t[4]), c(t[5]), c(t[6]), c(t[7])) : null
                }

                function t(e, t, o, i, l, c, m) {
                    var u = new s(n(e, d), n(t, d), a(o), i > 0 ? i.toString() : null, n(l, f), null, a(m));
                    return c && ("string" == typeof c ? u.setRawQuery(c.replace(/[^?&=0-9A-Za-z_\-~.%]/g, r)) : u.setAllParameters(c)), u
                }

                function a(e) {
                    return "string" == typeof e ? encodeURIComponent(e) : null
                }

                function n(e, t) {
                    return "string" == typeof e ? encodeURI(e).replace(t, r) : null
                }

                function r(e) {
                    var t = e.charCodeAt(0);
                    return "%" + "0123456789ABCDEF".charAt(t >> 4 & 15) + "0123456789ABCDEF".charAt(15 & t)
                }

                function o(e) {
                    return e.replace(/(^|\/)\.(?:\/|$)/g, "$1").replace(/\/{2,}/g, "/")
                }

                function i(e) {
                    if (null === e) return null;
                    for (var t, a = o(e), n = u;
                        (t = a.replace(n, "$1")) != a; a = t);
                    return a
                }

                function l(e, t) {
                    var a = e.clone(),
                        n = t.hasScheme();
                    n ? a.setRawScheme(t.getRawScheme()) : n = t.hasCredentials(), n ? a.setRawCredentials(t.getRawCredentials()) : n = t.hasDomain(), n ? a.setRawDomain(t.getRawDomain()) : n = t.hasPort();
                    var r = t.getRawPath(),
                        o = i(r);
                    if (n) a.setPort(t.getPort()), o = o && o.replace(h, "");
                    else if (n = !!r) {
                        if (47 !== o.charCodeAt(0)) {
                            var l = i(a.getRawPath() || "").replace(h, ""),
                                s = l.lastIndexOf("/") + 1;
                            o = i((s ? l.substring(0, s) : "") + i(r)).replace(h, "")
                        }
                    } else o = o && o.replace(h, ""), o !== r && a.setRawPath(o);
                    return n ? a.setRawPath(o) : n = t.hasQuery(), n ? a.setRawQuery(t.getRawQuery()) : n = t.hasFragment(), n && a.setRawFragment(t.getRawFragment()), a
                }

                function s(e, t, a, n, r, o, i) {
                    this.scheme_ = e, this.credentials_ = t, this.domain_ = a, this.port_ = n, this.path_ = r, this.query_ = o, this.fragment_ = i, this.paramCache_ = null
                }

                function c(e) {
                    return "string" == typeof e && e.length > 0 ? e : null
                }
                var m = new RegExp("(/|^)(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)/\\.\\.(?:/|$)"),
                    u = new RegExp(m),
                    h = /^(?:\.\.\/)*(?:\.\.$)?/;
                s.prototype.toString = function() {
                    var e = [];
                    return null !== this.scheme_ && e.push(this.scheme_, ":"), null !== this.domain_ && (e.push("//"), null !== this.credentials_ && e.push(this.credentials_, "@"), e.push(this.domain_), null !== this.port_ && e.push(":", this.port_.toString())), null !== this.path_ && e.push(this.path_), null !== this.query_ && e.push("?", this.query_), null !== this.fragment_ && e.push("#", this.fragment_), e.join("")
                }, s.prototype.clone = function() {
                    return new s(this.scheme_, this.credentials_, this.domain_, this.port_, this.path_, this.query_, this.fragment_)
                }, s.prototype.getScheme = function() {
                    return this.scheme_ && decodeURIComponent(this.scheme_).toLowerCase()
                }, s.prototype.getRawScheme = function() {
                    return this.scheme_
                }, s.prototype.setScheme = function(e) {
                    return this.scheme_ = n(e, d), this
                }, s.prototype.setRawScheme = function(e) {
                    return this.scheme_ = e ? e : null, this
                }, s.prototype.hasScheme = function() {
                    return null !== this.scheme_
                }, s.prototype.getCredentials = function() {
                    return this.credentials_ && decodeURIComponent(this.credentials_)
                }, s.prototype.getRawCredentials = function() {
                    return this.credentials_
                }, s.prototype.setCredentials = function(e) {
                    return this.credentials_ = n(e, d), this
                }, s.prototype.setRawCredentials = function(e) {
                    return this.credentials_ = e ? e : null, this
                }, s.prototype.hasCredentials = function() {
                    return null !== this.credentials_
                }, s.prototype.getDomain = function() {
                    return this.domain_ && decodeURIComponent(this.domain_)
                }, s.prototype.getRawDomain = function() {
                    return this.domain_
                }, s.prototype.setDomain = function(e) {
                    return this.setRawDomain(e && encodeURIComponent(e))
                }, s.prototype.setRawDomain = function(e) {
                    return this.domain_ = e ? e : null, this.setRawPath(this.path_)
                }, s.prototype.hasDomain = function() {
                    return null !== this.domain_
                }, s.prototype.getPort = function() {
                    return this.port_ && decodeURIComponent(this.port_)
                }, s.prototype.setPort = function(e) {
                    if (e) {
                        if (e = Number(e), e !== (65535 & e)) throw new Error("Bad port number " + e);
                        this.port_ = "" + e
                    } else this.port_ = null;
                    return this
                }, s.prototype.hasPort = function() {
                    return null !== this.port_
                }, s.prototype.getPath = function() {
                    return this.path_ && decodeURIComponent(this.path_)
                }, s.prototype.getRawPath = function() {
                    return this.path_
                }, s.prototype.setPath = function(e) {
                    return this.setRawPath(n(e, f))
                }, s.prototype.setRawPath = function(e) {
                    return e ? (e = String(e), this.path_ = !this.domain_ || /^\//.test(e) ? e : "/" + e) : this.path_ = null, this
                }, s.prototype.hasPath = function() {
                    return null !== this.path_
                }, s.prototype.getQuery = function() {
                    return this.query_ && decodeURIComponent(this.query_).replace(/\+/g, " ")
                }, s.prototype.getRawQuery = function() {
                    return this.query_
                }, s.prototype.setQuery = function(e) {
                    return this.paramCache_ = null, this.query_ = a(e), this
                }, s.prototype.setRawQuery = function(e) {
                    return this.paramCache_ = null, this.query_ = e ? e : null, this
                }, s.prototype.hasQuery = function() {
                    return null !== this.query_
                }, s.prototype.setAllParameters = function(e) {
                    if ("object" == typeof e && !(e instanceof Array) && (e instanceof Object || "[object Array]" !== Object.prototype.toString.call(e))) {
                        var t = [],
                            a = -1;
                        for (var n in e) {
                            var r = e[n];
                            "string" == typeof r && (t[++a] = n, t[++a] = r)
                        }
                        e = t
                    }
                    this.paramCache_ = null;
                    for (var o = [], i = "", l = 0; l < e.length;) {
                        var n = e[l++],
                            r = e[l++];
                        o.push(i, encodeURIComponent(n.toString())), i = "&", r && o.push("=", encodeURIComponent(r.toString()))
                    }
                    return this.query_ = o.join(""), this
                }, s.prototype.checkParameterCache_ = function() {
                    if (!this.paramCache_) {
                        var e = this.query_;
                        if (e) {
                            for (var t = e.split(/[&\?]/), a = [], n = -1, r = 0; r < t.length; ++r) {
                                var o = t[r].match(/^([^=]*)(?:=(.*))?$/);
                                a[++n] = decodeURIComponent(o[1]).replace(/\+/g, " "), a[++n] = decodeURIComponent(o[2] || "").replace(/\+/g, " ")
                            }
                            this.paramCache_ = a
                        } else this.paramCache_ = []
                    }
                }, s.prototype.setParameterValues = function(e, t) {
                    "string" == typeof t && (t = [t]), this.checkParameterCache_();
                    for (var a = 0, n = this.paramCache_, r = [], o = 0; o < n.length; o += 2) e === n[o] ? a < t.length && r.push(e, t[a++]) : r.push(n[o], n[o + 1]);
                    for (; a < t.length;) r.push(e, t[a++]);
                    return this.setAllParameters(r), this
                }, s.prototype.removeParameter = function(e) {
                    return this.setParameterValues(e, [])
                }, s.prototype.getAllParameters = function() {
                    return this.checkParameterCache_(), this.paramCache_.slice(0, this.paramCache_.length)
                }, s.prototype.getParameterValues = function(e) {
                    this.checkParameterCache_();
                    for (var t = [], a = 0; a < this.paramCache_.length; a += 2) e === this.paramCache_[a] && t.push(this.paramCache_[a + 1]);
                    return t
                }, s.prototype.getParameterMap = function() {
                    this.checkParameterCache_();
                    for (var e = {}, t = 0; t < this.paramCache_.length; t += 2) {
                        var a = this.paramCache_[t++],
                            n = this.paramCache_[t++];
                        a in e ? e[a].push(n) : e[a] = [n]
                    }
                    return e
                }, s.prototype.getParameterValue = function(e) {
                    this.checkParameterCache_();
                    for (var t = 0; t < this.paramCache_.length; t += 2)
                        if (e === this.paramCache_[t]) return this.paramCache_[t + 1];
                    return null
                }, s.prototype.getFragment = function() {
                    return this.fragment_ && decodeURIComponent(this.fragment_)
                }, s.prototype.getRawFragment = function() {
                    return this.fragment_
                }, s.prototype.setFragment = function(e) {
                    return this.fragment_ = e ? encodeURIComponent(e) : null, this
                }, s.prototype.setRawFragment = function(e) {
                    return this.fragment_ = e ? e : null, this
                }, s.prototype.hasFragment = function() {
                    return null !== this.fragment_
                };
                var p = new RegExp("^(?:([^:/?#]+):)?(?://(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
                    d = /[#\/\?@]/g,
                    f = /[\#\?]/g;
                return s.parse = e, s.create = t, s.resolve = l, s.collapse_dots = i, s.utils = {
                    mimeTypeOf: function(t) {
                        var a = e(t);
                        return /\.html$/.test(a.getPath()) ? "text/html" : "application/javascript"
                    },
                    resolve: function(t, a) {
                        return t ? l(e(t), e(a)).toString() : "" + a
                    }
                }, s
            }(),
            html4 = {};
        if (html4.atype = {
                NONE: 0,
                URI: 1,
                URI_FRAGMENT: 11,
                SCRIPT: 2,
                STYLE: 3,
                HTML: 12,
                ID: 4,
                IDREF: 5,
                IDREFS: 6,
                GLOBAL_NAME: 7,
                LOCAL_NAME: 8,
                CLASSES: 9,
                FRAME_TARGET: 10,
                MEDIA_QUERY: 13
            }, html4.atype = html4.atype, html4.ATTRIBS = {
                "*::class": 9,
                "*::dir": 0,
                "*::draggable": 0,
                "*::hidden": 0,
                "*::id": 4,
                "*::inert": 0,
                "*::itemprop": 0,
                "*::itemref": 6,
                "*::itemscope": 0,
                "*::lang": 0,
                "*::onblur": 2,
                "*::onchange": 2,
                "*::onclick": 2,
                "*::ondblclick": 2,
                "*::onfocus": 2,
                "*::onkeydown": 2,
                "*::onkeypress": 2,
                "*::onkeyup": 2,
                "*::onload": 2,
                "*::onmousedown": 2,
                "*::onmousemove": 2,
                "*::onmouseout": 2,
                "*::onmouseover": 2,
                "*::onmouseup": 2,
                "*::onreset": 2,
                "*::onscroll": 2,
                "*::onselect": 2,
                "*::onsubmit": 2,
                "*::onunload": 2,
                "*::spellcheck": 0,
                "*::style": 3,
                "*::title": 0,
                "*::translate": 0,
                "a::accesskey": 0,
                "a::coords": 0,
                "a::href": 1,
                "a::hreflang": 0,
                "a::name": 7,
                "a::onblur": 2,
                "a::onfocus": 2,
                "a::shape": 0,
                "a::tabindex": 0,
                "a::target": 10,
                "a::type": 0,
                "area::accesskey": 0,
                "area::alt": 0,
                "area::coords": 0,
                "area::href": 1,
                "area::nohref": 0,
                "area::onblur": 2,
                "area::onfocus": 2,
                "area::shape": 0,
                "area::tabindex": 0,
                "area::target": 10,
                "audio::controls": 0,
                "audio::loop": 0,
                "audio::mediagroup": 5,
                "audio::muted": 0,
                "audio::preload": 0,
                "bdo::dir": 0,
                "blockquote::cite": 1,
                "br::clear": 0,
                "button::accesskey": 0,
                "button::disabled": 0,
                "button::name": 8,
                "button::onblur": 2,
                "button::onfocus": 2,
                "button::tabindex": 0,
                "button::type": 0,
                "button::value": 0,
                "canvas::height": 0,
                "canvas::width": 0,
                "caption::align": 0,
                "col::align": 0,
                "col::char": 0,
                "col::charoff": 0,
                "col::span": 0,
                "col::valign": 0,
                "col::width": 0,
                "colgroup::align": 0,
                "colgroup::char": 0,
                "colgroup::charoff": 0,
                "colgroup::span": 0,
                "colgroup::valign": 0,
                "colgroup::width": 0,
                "command::checked": 0,
                "command::command": 5,
                "command::disabled": 0,
                "command::icon": 1,
                "command::label": 0,
                "command::radiogroup": 0,
                "command::type": 0,
                "data::value": 0,
                "del::cite": 1,
                "del::datetime": 0,
                "details::open": 0,
                "dir::compact": 0,
                "div::align": 0,
                "dl::compact": 0,
                "fieldset::disabled": 0,
                "font::color": 0,
                "font::face": 0,
                "font::size": 0,
                "form::accept": 0,
                "form::action": 1,
                "form::autocomplete": 0,
                "form::enctype": 0,
                "form::method": 0,
                "form::name": 7,
                "form::novalidate": 0,
                "form::onreset": 2,
                "form::onsubmit": 2,
                "form::target": 10,
                "h1::align": 0,
                "h2::align": 0,
                "h3::align": 0,
                "h4::align": 0,
                "h5::align": 0,
                "h6::align": 0,
                "hr::align": 0,
                "hr::noshade": 0,
                "hr::size": 0,
                "hr::width": 0,
                "iframe::align": 0,
                "iframe::frameborder": 0,
                "iframe::height": 0,
                "iframe::marginheight": 0,
                "iframe::marginwidth": 0,
                "iframe::width": 0,
                "img::align": 0,
                "img::alt": 0,
                "img::border": 0,
                "img::height": 0,
                "img::hspace": 0,
                "img::ismap": 0,
                "img::name": 7,
                "img::src": 1,
                "img::usemap": 11,
                "img::vspace": 0,
                "img::width": 0,
                "input::accept": 0,
                "input::accesskey": 0,
                "input::align": 0,
                "input::alt": 0,
                "input::autocomplete": 0,
                "input::checked": 0,
                "input::disabled": 0,
                "input::inputmode": 0,
                "input::ismap": 0,
                "input::list": 5,
                "input::max": 0,
                "input::maxlength": 0,
                "input::min": 0,
                "input::multiple": 0,
                "input::name": 8,
                "input::onblur": 2,
                "input::onchange": 2,
                "input::onfocus": 2,
                "input::onselect": 2,
                "input::placeholder": 0,
                "input::readonly": 0,
                "input::required": 0,
                "input::size": 0,
                "input::src": 1,
                "input::step": 0,
                "input::tabindex": 0,
                "input::type": 0,
                "input::usemap": 11,
                "input::value": 0,
                "ins::cite": 1,
                "ins::datetime": 0,
                "label::accesskey": 0,
                "label::for": 5,
                "label::onblur": 2,
                "label::onfocus": 2,
                "legend::accesskey": 0,
                "legend::align": 0,
                "li::type": 0,
                "li::value": 0,
                "map::name": 7,
                "menu::compact": 0,
                "menu::label": 0,
                "menu::type": 0,
                "meter::high": 0,
                "meter::low": 0,
                "meter::max": 0,
                "meter::min": 0,
                "meter::value": 0,
                "ol::compact": 0,
                "ol::reversed": 0,
                "ol::start": 0,
                "ol::type": 0,
                "optgroup::disabled": 0,
                "optgroup::label": 0,
                "option::disabled": 0,
                "option::label": 0,
                "option::selected": 0,
                "option::value": 0,
                "output::for": 6,
                "output::name": 8,
                "p::align": 0,
                "pre::width": 0,
                "progress::max": 0,
                "progress::min": 0,
                "progress::value": 0,
                "q::cite": 1,
                "select::autocomplete": 0,
                "select::disabled": 0,
                "select::multiple": 0,
                "select::name": 8,
                "select::onblur": 2,
                "select::onchange": 2,
                "select::onfocus": 2,
                "select::required": 0,
                "select::size": 0,
                "select::tabindex": 0,
                "source::type": 0,
                "table::align": 0,
                "table::bgcolor": 0,
                "table::border": 0,
                "table::cellpadding": 0,
                "table::cellspacing": 0,
                "table::frame": 0,
                "table::rules": 0,
                "table::summary": 0,
                "table::width": 0,
                "tbody::align": 0,
                "tbody::char": 0,
                "tbody::charoff": 0,
                "tbody::valign": 0,
                "td::abbr": 0,
                "td::align": 0,
                "td::axis": 0,
                "td::bgcolor": 0,
                "td::char": 0,
                "td::charoff": 0,
                "td::colspan": 0,
                "td::headers": 6,
                "td::height": 0,
                "td::nowrap": 0,
                "td::rowspan": 0,
                "td::scope": 0,
                "td::valign": 0,
                "td::width": 0,
                "textarea::accesskey": 0,
                "textarea::autocomplete": 0,
                "textarea::cols": 0,
                "textarea::disabled": 0,
                "textarea::inputmode": 0,
                "textarea::name": 8,
                "textarea::onblur": 2,
                "textarea::onchange": 2,
                "textarea::onfocus": 2,
                "textarea::onselect": 2,
                "textarea::placeholder": 0,
                "textarea::readonly": 0,
                "textarea::required": 0,
                "textarea::rows": 0,
                "textarea::tabindex": 0,
                "textarea::wrap": 0,
                "tfoot::align": 0,
                "tfoot::char": 0,
                "tfoot::charoff": 0,
                "tfoot::valign": 0,
                "th::abbr": 0,
                "th::align": 0,
                "th::axis": 0,
                "th::bgcolor": 0,
                "th::char": 0,
                "th::charoff": 0,
                "th::colspan": 0,
                "th::headers": 6,
                "th::height": 0,
                "th::nowrap": 0,
                "th::rowspan": 0,
                "th::scope": 0,
                "th::valign": 0,
                "th::width": 0,
                "thead::align": 0,
                "thead::char": 0,
                "thead::charoff": 0,
                "thead::valign": 0,
                "tr::align": 0,
                "tr::bgcolor": 0,
                "tr::char": 0,
                "tr::charoff": 0,
                "tr::valign": 0,
                "track::default": 0,
                "track::kind": 0,
                "track::label": 0,
                "track::srclang": 0,
                "ul::compact": 0,
                "ul::type": 0,
                "video::controls": 0,
                "video::height": 0,
                "video::loop": 0,
                "video::mediagroup": 5,
                "video::muted": 0,
                "video::poster": 1,
                "video::preload": 0,
                "video::width": 0
            }, html4.ATTRIBS = html4.ATTRIBS, html4.eflags = {
                OPTIONAL_ENDTAG: 1,
                EMPTY: 2,
                CDATA: 4,
                RCDATA: 8,
                UNSAFE: 16,
                FOLDABLE: 32,
                SCRIPT: 64,
                STYLE: 128,
                VIRTUALIZED: 256
            }, html4.eflags = html4.eflags, html4.ELEMENTS = {
                a: 0,
                abbr: 0,
                acronym: 0,
                address: 0,
                applet: 272,
                area: 2,
                article: 0,
                aside: 0,
                audio: 0,
                b: 0,
                base: 274,
                basefont: 274,
                bdi: 0,
                bdo: 0,
                big: 0,
                blockquote: 0,
                body: 305,
                br: 2,
                button: 0,
                canvas: 0,
                caption: 0,
                center: 0,
                cite: 0,
                code: 0,
                col: 2,
                colgroup: 1,
                command: 2,
                data: 0,
                datalist: 0,
                dd: 1,
                del: 0,
                details: 0,
                dfn: 0,
                dialog: 272,
                dir: 0,
                div: 0,
                dl: 0,
                dt: 1,
                em: 0,
                fieldset: 0,
                figcaption: 0,
                figure: 0,
                font: 0,
                footer: 0,
                form: 0,
                frame: 274,
                frameset: 272,
                h1: 0,
                h2: 0,
                h3: 0,
                h4: 0,
                h5: 0,
                h6: 0,
                head: 305,
                header: 0,
                hgroup: 0,
                hr: 2,
                html: 305,
                i: 0,
                iframe: 4,
                img: 2,
                input: 2,
                ins: 0,
                isindex: 274,
                kbd: 0,
                keygen: 274,
                label: 0,
                legend: 0,
                li: 1,
                link: 274,
                map: 0,
                mark: 0,
                menu: 0,
                meta: 274,
                meter: 0,
                nav: 0,
                nobr: 0,
                noembed: 276,
                noframes: 276,
                noscript: 276,
                object: 272,
                ol: 0,
                optgroup: 0,
                option: 1,
                output: 0,
                p: 1,
                param: 274,
                pre: 0,
                progress: 0,
                q: 0,
                s: 0,
                samp: 0,
                script: 84,
                section: 0,
                select: 0,
                small: 0,
                source: 2,
                span: 0,
                strike: 0,
                strong: 0,
                style: 148,
                sub: 0,
                summary: 0,
                sup: 0,
                table: 0,
                tbody: 1,
                td: 1,
                textarea: 8,
                tfoot: 1,
                th: 1,
                thead: 1,
                time: 0,
                title: 280,
                tr: 1,
                track: 2,
                tt: 0,
                u: 0,
                ul: 0,
                "var": 0,
                video: 0,
                wbr: 2
            }, html4.ELEMENTS = html4.ELEMENTS, html4.ELEMENT_DOM_INTERFACES = {
                a: "HTMLAnchorElement",
                abbr: "HTMLElement",
                acronym: "HTMLElement",
                address: "HTMLElement",
                applet: "HTMLAppletElement",
                area: "HTMLAreaElement",
                article: "HTMLElement",
                aside: "HTMLElement",
                audio: "HTMLAudioElement",
                b: "HTMLElement",
                base: "HTMLBaseElement",
                basefont: "HTMLBaseFontElement",
                bdi: "HTMLElement",
                bdo: "HTMLElement",
                big: "HTMLElement",
                blockquote: "HTMLQuoteElement",
                body: "HTMLBodyElement",
                br: "HTMLBRElement",
                button: "HTMLButtonElement",
                canvas: "HTMLCanvasElement",
                caption: "HTMLTableCaptionElement",
                center: "HTMLElement",
                cite: "HTMLElement",
                code: "HTMLElement",
                col: "HTMLTableColElement",
                colgroup: "HTMLTableColElement",
                command: "HTMLCommandElement",
                data: "HTMLElement",
                datalist: "HTMLDataListElement",
                dd: "HTMLElement",
                del: "HTMLModElement",
                details: "HTMLDetailsElement",
                dfn: "HTMLElement",
                dialog: "HTMLDialogElement",
                dir: "HTMLDirectoryElement",
                div: "HTMLDivElement",
                dl: "HTMLDListElement",
                dt: "HTMLElement",
                em: "HTMLElement",
                fieldset: "HTMLFieldSetElement",
                figcaption: "HTMLElement",
                figure: "HTMLElement",
                font: "HTMLFontElement",
                footer: "HTMLElement",
                form: "HTMLFormElement",
                frame: "HTMLFrameElement",
                frameset: "HTMLFrameSetElement",
                h1: "HTMLHeadingElement",
                h2: "HTMLHeadingElement",
                h3: "HTMLHeadingElement",
                h4: "HTMLHeadingElement",
                h5: "HTMLHeadingElement",
                h6: "HTMLHeadingElement",
                head: "HTMLHeadElement",
                header: "HTMLElement",
                hgroup: "HTMLElement",
                hr: "HTMLHRElement",
                html: "HTMLHtmlElement",
                i: "HTMLElement",
                iframe: "HTMLIFrameElement",
                img: "HTMLImageElement",
                input: "HTMLInputElement",
                ins: "HTMLModElement",
                isindex: "HTMLUnknownElement",
                kbd: "HTMLElement",
                keygen: "HTMLKeygenElement",
                label: "HTMLLabelElement",
                legend: "HTMLLegendElement",
                li: "HTMLLIElement",
                link: "HTMLLinkElement",
                map: "HTMLMapElement",
                mark: "HTMLElement",
                menu: "HTMLMenuElement",
                meta: "HTMLMetaElement",
                meter: "HTMLMeterElement",
                nav: "HTMLElement",
                nobr: "HTMLElement",
                noembed: "HTMLElement",
                noframes: "HTMLElement",
                noscript: "HTMLElement",
                object: "HTMLObjectElement",
                ol: "HTMLOListElement",
                optgroup: "HTMLOptGroupElement",
                option: "HTMLOptionElement",
                output: "HTMLOutputElement",
                p: "HTMLParagraphElement",
                param: "HTMLParamElement",
                pre: "HTMLPreElement",
                progress: "HTMLProgressElement",
                q: "HTMLQuoteElement",
                s: "HTMLElement",
                samp: "HTMLElement",
                script: "HTMLScriptElement",
                section: "HTMLElement",
                select: "HTMLSelectElement",
                small: "HTMLElement",
                source: "HTMLSourceElement",
                span: "HTMLSpanElement",
                strike: "HTMLElement",
                strong: "HTMLElement",
                style: "HTMLStyleElement",
                sub: "HTMLElement",
                summary: "HTMLElement",
                sup: "HTMLElement",
                table: "HTMLTableElement",
                tbody: "HTMLTableSectionElement",
                td: "HTMLTableDataCellElement",
                textarea: "HTMLTextAreaElement",
                tfoot: "HTMLTableSectionElement",
                th: "HTMLTableHeaderCellElement",
                thead: "HTMLTableSectionElement",
                time: "HTMLTimeElement",
                title: "HTMLTitleElement",
                tr: "HTMLTableRowElement",
                track: "HTMLTrackElement",
                tt: "HTMLElement",
                u: "HTMLElement",
                ul: "HTMLUListElement",
                "var": "HTMLElement",
                video: "HTMLVideoElement",
                wbr: "HTMLElement"
            }, html4.ELEMENT_DOM_INTERFACES = html4.ELEMENT_DOM_INTERFACES, html4.ueffects = {
                NOT_LOADED: 0,
                SAME_DOCUMENT: 1,
                NEW_DOCUMENT: 2
            }, html4.ueffects = html4.ueffects, html4.URIEFFECTS = {
                "a::href": 2,
                "area::href": 2,
                "blockquote::cite": 0,
                "command::icon": 1,
                "del::cite": 0,
                "form::action": 2,
                "img::src": 1,
                "input::src": 1,
                "ins::cite": 0,
                "q::cite": 0,
                "video::poster": 1
            }, html4.URIEFFECTS = html4.URIEFFECTS, html4.ltypes = {
                UNSANDBOXED: 2,
                SANDBOXED: 1,
                DATA: 0
            }, html4.ltypes = html4.ltypes, html4.LOADERTYPES = {
                "a::href": 2,
                "area::href": 2,
                "blockquote::cite": 2,
                "command::icon": 1,
                "del::cite": 2,
                "form::action": 2,
                "img::src": 1,
                "input::src": 1,
                "ins::cite": 2,
                "q::cite": 2,
                "video::poster": 1
            }, html4.LOADERTYPES = html4.LOADERTYPES, "i" !== "I".toLowerCase()) throw "I/i problem";
        var html = function(e) {
                function t(e) {
                    if (S.hasOwnProperty(e)) return S[e];
                    var t = e.match(P);
                    if (t) return String.fromCharCode(parseInt(t[1], 10));
                    if (t = e.match(D)) return String.fromCharCode(parseInt(t[1], 16));
                    if (I && k.test(e)) {
                        I.innerHTML = "&" + e + ";";
                        var a = I.textContent;
                        return S[e] = a, a
                    }
                    return "&" + e + ";"
                }

                function a(e, a) {
                    return t(a)
                }

                function n(e) {
                    return e.replace(x, "")
                }

                function r(e) {
                    return e.replace(N, a)
                }

                function o(e) {
                    return ("" + e).replace(F, "&amp;").replace(B, "&lt;").replace(q, "&gt;").replace(z, "&#34;")
                }

                function i(e) {
                    return e.replace(U, "&amp;$1").replace(B, "&lt;").replace(q, "&gt;")
                }

                function l(e) {
                    var t = {
                        cdata: e.cdata || e.cdata,
                        comment: e.comment || e.comment,
                        endDoc: e.endDoc || e.endDoc,
                        endTag: e.endTag || e.endTag,
                        pcdata: e.pcdata || e.pcdata,
                        rcdata: e.rcdata || e.rcdata,
                        startDoc: e.startDoc || e.startDoc,
                        startTag: e.startTag || e.startTag
                    };
                    return function(e, a) {
                        return s(e, t, a)
                    }
                }

                function s(e, t, a) {
                    var n = u(e),
                        r = {
                            noMoreGT: !1,
                            noMoreEndComments: !1
                        };
                    m(t, n, 0, r, a)
                }

                function c(e, t, a, n, r) {
                    return function() {
                        m(e, t, a, n, r)
                    }
                }

                function m(t, a, n, r, o) {
                    try {
                        t.startDoc && 0 == n && t.startDoc(o);
                        for (var i, l, s, m = n, u = a.length; u > m;) {
                            var f = a[m++],
                                g = a[m];
                            switch (f) {
                                case "&":
                                    O.test(g) ? (t.pcdata && t.pcdata("&" + g, o, Y, c(t, a, m, r, o)), m++) : t.pcdata && t.pcdata("&amp;", o, Y, c(t, a, m, r, o));
                                    break;
                                case "</":
                                    (i = /^([-\w:]+)[^\'\"]*/.exec(g)) ? i[0].length === g.length && ">" === a[m + 1] ? (m += 2, s = i[1].toLowerCase(), t.endTag && t.endTag(s, o, Y, c(t, a, m, r, o))) : m = h(a, m, t, o, Y, r): t.pcdata && t.pcdata("&lt;/", o, Y, c(t, a, m, r, o));
                                    break;
                                case "<":
                                    if (i = /^([-\w:]+)\s*\/?/.exec(g))
                                        if (i[0].length === g.length && ">" === a[m + 1]) {
                                            m += 2, s = i[1].toLowerCase(), t.startTag && t.startTag(s, [], o, Y, c(t, a, m, r, o));
                                            var E = e.ELEMENTS[s];
                                            if (E & j) {
                                                var T = {
                                                    name: s,
                                                    next: m,
                                                    eflags: E
                                                };
                                                m = d(a, T, t, o, Y, r)
                                            }
                                        } else m = p(a, m, t, o, Y, r);
                                    else t.pcdata && t.pcdata("&lt;", o, Y, c(t, a, m, r, o));
                                    break;
                                case "<!--":
                                    if (!r.noMoreEndComments) {
                                        for (l = m + 1; u > l && (">" !== a[l] || !/--$/.test(a[l - 1])); l++);
                                        if (u > l) {
                                            if (t.comment) {
                                                var L = a.slice(m, l).join("");
                                                t.comment(L.substr(0, L.length - 2), o, Y, c(t, a, l + 1, r, o))
                                            }
                                            m = l + 1
                                        } else r.noMoreEndComments = !0
                                    }
                                    r.noMoreEndComments && t.pcdata && t.pcdata("&lt;!--", o, Y, c(t, a, m, r, o));
                                    break;
                                case "<!":
                                    if (/^\w/.test(g)) {
                                        if (!r.noMoreGT) {
                                            for (l = m + 1; u > l && ">" !== a[l]; l++);
                                            u > l ? m = l + 1 : r.noMoreGT = !0
                                        }
                                        r.noMoreGT && t.pcdata && t.pcdata("&lt;!", o, Y, c(t, a, m, r, o))
                                    } else t.pcdata && t.pcdata("&lt;!", o, Y, c(t, a, m, r, o));
                                    break;
                                case "<?":
                                    if (!r.noMoreGT) {
                                        for (l = m + 1; u > l && ">" !== a[l]; l++);
                                        u > l ? m = l + 1 : r.noMoreGT = !0
                                    }
                                    r.noMoreGT && t.pcdata && t.pcdata("&lt;?", o, Y, c(t, a, m, r, o));
                                    break;
                                case ">":
                                    t.pcdata && t.pcdata("&gt;", o, Y, c(t, a, m, r, o));
                                    break;
                                case "":
                                    break;
                                default:
                                    t.pcdata && t.pcdata(f, o, Y, c(t, a, m, r, o))
                            }
                        }
                        t.endDoc && t.endDoc(o)
                    } catch (M) {
                        if (M !== Y) throw M
                    }
                }

                function u(e) {
                    var t = /(<\/|<\!--|<[!?]|[&<>])/g;
                    if (e += "", $) return e.split(t);
                    for (var a, n = [], r = 0; null !== (a = t.exec(e));) n.push(e.substring(r, a.index)), n.push(a[0]), r = a.index + a[0].length;
                    return n.push(e.substring(r)), n
                }

                function h(e, t, a, n, r, o) {
                    var i = f(e, t);
                    return i ? (a.endTag && a.endTag(i.name, n, r, c(a, e, t, o, n)), i.next) : e.length
                }

                function p(e, t, a, n, r, o) {
                    var i = f(e, t);
                    return i ? (a.startTag && a.startTag(i.name, i.attrs, n, r, c(a, e, i.next, o, n)), i.eflags & j ? d(e, i, a, n, r, o) : i.next) : e.length
                }

                function d(t, a, n, r, o, l) {
                    var s = t.length;
                    Q.hasOwnProperty(a.name) || (Q[a.name] = new RegExp("^" + a.name + "(?:[\\s\\/]|$)", "i"));
                    for (var m = Q[a.name], u = a.next, h = a.next + 1; s > h && ("</" !== t[h - 1] || !m.test(t[h])); h++);
                    s > h && (h -= 1);
                    var p = t.slice(u, h).join("");
                    if (a.eflags & e.eflags.CDATA) n.cdata && n.cdata(p, r, o, c(n, t, h, l, r));
                    else {
                        if (!(a.eflags & e.eflags.RCDATA)) throw new Error("bug");
                        n.rcdata && n.rcdata(i(p), r, o, c(n, t, h, l, r))
                    }
                    return h
                }

                function f(t, a) {
                    var n = /^([-\w:]+)/.exec(t[a]),
                        r = {};
                    r.name = n[1].toLowerCase(), r.eflags = e.ELEMENTS[r.name];
                    for (var o = t[a].substr(n[0].length), i = a + 1, l = t.length; l > i && ">" !== t[i]; i++) o += t[i];
                    if (i >= l) return void 0;
                    for (var s = [];
                        "" !== o;)
                        if (n = G.exec(o)) {
                            if (n[4] && !n[5] || n[6] && !n[7]) {
                                for (var c = n[4] || n[6], m = !1, u = [o, t[i++]]; l > i; i++) {
                                    if (m) {
                                        if (">" === t[i]) break
                                    } else 0 <= t[i].indexOf(c) && (m = !0);
                                    u.push(t[i])
                                }
                                if (i >= l) break;
                                o = u.join("");
                                continue
                            }
                            var h = n[1].toLowerCase(),
                                p = n[2] ? g(n[3]) : "";
                            s.push(h, p), o = o.substr(n[0].length)
                        } else o = o.replace(/^[\s\S][^a-z\s]*/, "");
                    return r.attrs = s, r.next = i + 1, r
                }

                function g(e) {
                    var t = e.charCodeAt(0);
                    return (34 === t || 39 === t) && (e = e.substr(1, e.length - 2)), r(n(e))
                }

                function E(t) {
                    var a, n, r = function(e, t) {
                        n || t.push(e)
                    };
                    return l({
                        startDoc: function() {
                            a = [], n = !1
                        },
                        startTag: function(r, i, l) {
                            if (!n && e.ELEMENTS.hasOwnProperty(r)) {
                                var s = e.ELEMENTS[r];
                                if (!(s & e.eflags.FOLDABLE)) {
                                    var c = t(r, i);
                                    if (!c) return void(n = !(s & e.eflags.EMPTY));
                                    if ("object" != typeof c) throw new Error("tagPolicy did not return object (old API?)");
                                    if (!("attribs" in c)) throw new Error("tagPolicy gave no attribs");
                                    i = c.attribs;
                                    var m, u;
                                    if ("tagName" in c ? (u = c.tagName, m = e.ELEMENTS[u]) : (u = r, m = s), s & e.eflags.OPTIONAL_ENDTAG) {
                                        var h = a[a.length - 1];
                                        !h || h.orig !== r || h.rep === u && r === u || l.push("</", h.rep, ">")
                                    }
                                    s & e.eflags.EMPTY || a.push({
                                        orig: r,
                                        rep: u
                                    }), l.push("<", u);
                                    for (var p = 0, d = i.length; d > p; p += 2) {
                                        var f = i[p],
                                            g = i[p + 1];
                                        null !== g && void 0 !== g && l.push(" ", f, '="', o(g), '"')
                                    }
                                    l.push(">"), s & e.eflags.EMPTY && !(m & e.eflags.EMPTY) && l.push("</", u, ">")
                                }
                            }
                        },
                        endTag: function(t, r) {
                            if (n) return void(n = !1);
                            if (e.ELEMENTS.hasOwnProperty(t)) {
                                var o = e.ELEMENTS[t];
                                if (!(o & (e.eflags.EMPTY | e.eflags.FOLDABLE))) {
                                    var i;
                                    if (o & e.eflags.OPTIONAL_ENDTAG)
                                        for (i = a.length; --i >= 0;) {
                                            var l = a[i].orig;
                                            if (l === t) break;
                                            if (!(e.ELEMENTS[l] & e.eflags.OPTIONAL_ENDTAG)) return
                                        } else
                                            for (i = a.length; --i >= 0 && a[i].orig !== t;);
                                    if (0 > i) return;
                                    for (var s = a.length; --s > i;) {
                                        var c = a[s].rep;
                                        e.ELEMENTS[c] & e.eflags.OPTIONAL_ENDTAG || r.push("</", c, ">")
                                    }
                                    i < a.length && (t = a[i].rep), a.length = i, r.push("</", t, ">")
                                }
                            }
                        },
                        pcdata: r,
                        rcdata: r,
                        cdata: r,
                        endDoc: function(e) {
                            for (; a.length; a.length--) e.push("</", a[a.length - 1].rep, ">")
                        }
                    })
                }

                function T(e, t, a, n, r) {
                    if (!r) return null;
                    try {
                        var o = URI.parse("" + e);
                        if (o && (!o.hasScheme() || V.test(o.getScheme()))) {
                            var i = r(o, t, a, n);
                            return i ? i.toString() : null
                        }
                    } catch (l) {
                        return null
                    }
                    return null
                }

                function L(e, t, a, n, r) {
                    if (a || e(t + " removed", {
                            change: "removed",
                            tagName: t
                        }), n !== r) {
                        var o = "changed";
                        n && !r ? o = "removed" : !n && r && (o = "added"), e(t + "." + a + " " + o, {
                            change: o,
                            tagName: t,
                            attribName: a,
                            oldValue: n,
                            newValue: r
                        })
                    }
                }

                function M(e, t, a) {
                    var n;
                    return n = t + "::" + a, e.hasOwnProperty(n) ? e[n] : (n = "*::" + a, e.hasOwnProperty(n) ? e[n] : void 0)
                }

                function b(t, a) {
                    return M(e.LOADERTYPES, t, a)
                }

                function y(t, a) {
                    return M(e.URIEFFECTS, t, a)
                }

                function v(t, a, n, r, o) {
                    for (var i = 0; i < a.length; i += 2) {
                        var l, s = a[i],
                            c = a[i + 1],
                            m = c,
                            u = null;
                        if (l = t + "::" + s, (e.ATTRIBS.hasOwnProperty(l) || (l = "*::" + s, e.ATTRIBS.hasOwnProperty(l))) && (u = e.ATTRIBS[l]), null !== u) switch (u) {
                            case e.atype.NONE:
                                break;
                            case e.atype.SCRIPT:
                                c = null, o && L(o, t, s, m, c);
                                break;
                            case e.atype.STYLE:
                                if ("undefined" == typeof A) {
                                    c = null, o && L(o, t, s, m, c);
                                    break
                                }
                                var h = [];
                                A(c, {
                                    declaration: function(t, a) {
                                        var r = t.toLowerCase(),
                                            o = C[r];
                                        o && (R(r, o, a, n ? function(t) {
                                            return T(t, e.ueffects.SAME_DOCUMENT, e.ltypes.SANDBOXED, {
                                                TYPE: "CSS",
                                                CSS_PROP: r
                                            }, n)
                                        } : null), h.push(t + ": " + a.join(" ")))
                                    }
                                }), c = h.length > 0 ? h.join(" ; ") : null, o && L(o, t, s, m, c);
                                break;
                            case e.atype.ID:
                            case e.atype.IDREF:
                            case e.atype.IDREFS:
                            case e.atype.GLOBAL_NAME:
                            case e.atype.LOCAL_NAME:
                            case e.atype.CLASSES:
                                c = r ? r(c) : c, o && L(o, t, s, m, c);
                                break;
                            case e.atype.URI:
                                c = T(c, y(t, s), b(t, s), {
                                    TYPE: "MARKUP",
                                    XML_ATTR: s,
                                    XML_TAG: t
                                }, n), o && L(o, t, s, m, c);
                                break;
                            case e.atype.URI_FRAGMENT:
                                c && "#" === c.charAt(0) ? (c = c.substring(1), c = r ? r(c) : c, null !== c && void 0 !== c && (c = "#" + c)) : c = null, o && L(o, t, s, m, c);
                                break;
                            default:
                                c = null, o && L(o, t, s, m, c)
                        } else c = null, o && L(o, t, s, m, c);
                        a[i + 1] = c
                    }
                    return a
                }

                function H(t, a, n) {
                    return function(r, o) {
                        return e.ELEMENTS[r] & e.eflags.UNSAFE ? void(n && L(n, r, void 0, void 0, void 0)) : {
                            attribs: v(r, o, t, a, n)
                        }
                    }
                }

                function _(e, t) {
                    var a = [];
                    return E(t)(e, a), a.join("")
                }

                function w(e, t, a, n) {
                    var r = H(t, a, n);
                    return _(e, r)
                }
                var A, R, C;
                "undefined" != typeof window && (A = window.parseCssDeclarations, R = window.sanitizeCssProperty, C = window.cssSchema);
                var S = {
                        lt: "<",
                        LT: "<",
                        gt: ">",
                        GT: ">",
                        amp: "&",
                        AMP: "&",
                        quot: '"',
                        apos: "'",
                        nbsp: " "
                    },
                    P = /^#(\d+)$/,
                    D = /^#x([0-9A-Fa-f]+)$/,
                    k = /^[A-Za-z][A-za-z0-9]+$/,
                    I = "undefined" != typeof window && window.document ? window.document.createElement("textarea") : null,
                    x = /\0/g,
                    N = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g,
                    O = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/,
                    F = /&/g,
                    U = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,
                    B = /[<]/g,
                    q = />/g,
                    z = /\"/g,
                    G = new RegExp("^\\s*([-.:\\w]+)(?:\\s*(=)\\s*((\")[^\"]*(\"|$)|(')[^']*('|$)|(?=[a-z][-\\w]*\\s*=)|[^\"'\\s]*))?", "i"),
                    $ = 3 === "a,b".split(/(,)/).length,
                    j = e.eflags.CDATA | e.eflags.RCDATA,
                    Y = {},
                    Q = {},
                    V = /^(?:https?|mailto|data)$/i,
                    X = {};
                return X.escapeAttrib = X.escapeAttrib = o, X.makeHtmlSanitizer = X.makeHtmlSanitizer = E, X.makeSaxParser = X.makeSaxParser = l, X.makeTagPolicy = X.makeTagPolicy = H, X.normalizeRCData = X.normalizeRCData = i, X.sanitize = X.sanitize = w, X.sanitizeAttribs = X.sanitizeAttribs = v, X.sanitizeWithPolicy = X.sanitizeWithPolicy = _, X.unescapeEntities = X.unescapeEntities = r, X
            }(html4),
            html_sanitize = html.sanitize;
        html4.ATTRIBS["*::style"] = 0, html4.ELEMENTS.style = 0, html4.ATTRIBS["a::target"] = 0, html4.ELEMENTS.video = 0, html4.ATTRIBS["video::src"] = 0, html4.ATTRIBS["video::poster"] = 0, html4.ATTRIBS["video::controls"] = 0, html4.ELEMENTS.audio = 0, html4.ATTRIBS["audio::src"] = 0, html4.ATTRIBS["video::autoplay"] = 0, html4.ATTRIBS["video::controls"] = 0, "undefined" != typeof module && (module.exports = html_sanitize);
    }, {}],
    5: [function(require, module, exports) {
        module.exports = {
            "author": "Mapbox",
            "name": "mapbox.js",
            "description": "mapbox javascript api",
            "version": "2.1.6",
            "homepage": "http://mapbox.com/",
            "repository": {
                "type": "git",
                "url": "git://github.com/mapbox/mapbox.js.git"
            },
            "main": "src/index.js",
            "dependencies": {
                "leaflet": "0.7.3",
                "mustache": "0.7.3",
                "corslite": "0.0.6",
                "sanitize-caja": "0.1.2"
            },
            "scripts": {
                "test": "jshint src/*.js && mocha-phantomjs test/index.html"
            },
            "devDependencies": {
                "browserify": "^6.3.2",
                "clean-css": "~2.0.7",
                "expect.js": "0.3.1",
                "happen": "0.1.3",
                "jshint": "2.4.4",
                "leaflet-fullscreen": "0.0.4",
                "leaflet-hash": "0.2.1",
                "marked": "~0.3.0",
                "minifyify": "^6.1.0",
                "minimist": "0.0.5",
                "mocha": "1.17.1",
                "mocha-phantomjs": "3.1.6",
                "sinon": "1.10.2"
            },
            "optionalDependencies": {},
            "engines": {
                "node": "*"
            }
        }
    }, {}],
    6: [function(require, module, exports) {
        "use strict";
        module.exports = {
            HTTP_URL: "http://a.tiles.mapbox.com/v4",
            HTTPS_URL: "https://a.tiles.mapbox.com/v4",
            FORCE_HTTPS: !1,
            REQUIRE_ACCESS_TOKEN: !0
        };
    }, {}],
    7: [function(require, module, exports) {
        "use strict";
        var util = require("./util"),
            urlhelper = require("./url"),
            request = require("./request"),
            marker = require("./marker"),
            simplestyle = require("./simplestyle"),
            FeatureLayer = L.FeatureGroup.extend({
                options: {
                    filter: function() {
                        return !0
                    },
                    sanitizer: require("sanitize-caja"),
                    style: simplestyle.style,
                    popupOptions: {
                        closeButton: !1
                    }
                },
                initialize: function(e, t) {
                    L.setOptions(this, t), this._layers = {}, "string" == typeof e ? util.idUrl(e, this) : e && "object" == typeof e && this.setGeoJSON(e)
                },
                setGeoJSON: function(e) {
                    return this._geojson = e, this.clearLayers(), this._initialize(e), this
                },
                getGeoJSON: function() {
                    return this._geojson
                },
                loadURL: function(e) {
                    return this._request && "abort" in this._request && this._request.abort(), this._request = request(e, L.bind(function(t, i) {
                        this._request = null, t && "abort" !== t.type ? (util.log("could not load features at " + e), this.fire("error", {
                            error: t
                        })) : i && (this.setGeoJSON(i), this.fire("ready"))
                    }, this)), this
                },
                loadID: function(e) {
                    return this.loadURL(urlhelper("/" + e + "/features.json", this.options.accessToken))
                },
                setFilter: function(e) {
                    return this.options.filter = e, this._geojson && (this.clearLayers(), this._initialize(this._geojson)), this
                },
                getFilter: function() {
                    return this.options.filter
                },
                _initialize: function(e) {
                    var t, i, r = L.Util.isArray(e) ? e : e.features;
                    if (r)
                        for (t = 0, i = r.length; i > t; t++)(r[t].geometries || r[t].geometry || r[t].features) && this._initialize(r[t]);
                    else if (this.options.filter(e)) {
                        var s = {
                                accessToken: this.options.accessToken
                            },
                            o = this.options.pointToLayer || function(e, t) {
                                return marker.style(e, t, s)
                            },
                            n = L.GeoJSON.geometryToLayer(e, o),
                            u = marker.createPopup(e, this.options.sanitizer),
                            a = this.options.style;
                        a && "setStyle" in n && ("function" == typeof a && (a = a(e)), n.setStyle(a)), n.feature = e, u && n.bindPopup(u, this.options.popupOptions), this.addLayer(n)
                    }
                }
            });
        module.exports.FeatureLayer = FeatureLayer, module.exports.featureLayer = function(e, t) {
            return new FeatureLayer(e, t)
        };
    }, {
        "./marker": 20,
        "./request": 21,
        "./simplestyle": 23,
        "./url": 25,
        "./util": 26,
        "sanitize-caja": 3
    }],
    8: [function(require, module, exports) {
        "use strict";
        var Feedback = L.Class.extend({
            includes: L.Mixin.Events,
            data: {},
            record: function(e) {
                L.extend(this.data, e), this.fire("change")
            }
        });
        module.exports = new Feedback;
    }, {}],
    9: [function(require, module, exports) {
        "use strict";
        var util = require("./util"),
            urlhelper = require("./url"),
            feedback = require("./feedback"),
            request = require("./request");
        module.exports = function(e, r) {
            var t = {};
            return util.strict(e, "string"), -1 === e.indexOf("/") && (e = urlhelper("/geocode/" + e + "/{query}.json", r && r.accessToken)), t.getURL = function() {
                return e
            }, t.queryURL = function(e) {
                var r;
                if ("string" != typeof e) {
                    for (var n = [], u = 0; u < e.length; u++) n[u] = encodeURIComponent(e[u]);
                    r = n.join(";")
                } else r = encodeURIComponent(e);
                return feedback.record({
                    geocoding: r
                }), L.Util.template(t.getURL(), {
                    query: r
                })
            }, t.query = function(e, r) {
                return util.strict(r, "function"), request(t.queryURL(e), function(e, t) {
                    if (t && (t.length || t.features)) {
                        var n = {
                            results: t
                        };
                        t.features && t.features.length && (n.latlng = [t.features[0].center[1], t.features[0].center[0]], t.features[0].bbox && (n.bounds = t.features[0].bbox, n.lbounds = util.lbounds(n.bounds))), r(null, n)
                    } else r(e || !0)
                }), t
            }, t.reverseQuery = function(e, r) {
                function n(e) {
                    return void 0 !== e.lat && void 0 !== e.lng ? e.lng + "," + e.lat : void 0 !== e.lat && void 0 !== e.lon ? e.lon + "," + e.lat : e[0] + "," + e[1]
                }
                var u = "";
                if (e.length && e[0].length) {
                    for (var o = 0, l = []; o < e.length; o++) l.push(n(e[o]));
                    u = l.join(";")
                } else u = n(e);
                return request(t.queryURL(u), function(e, t) {
                    r(e, t)
                }), t
            }, t
        };
    }, {
        "./feedback": 8,
        "./request": 21,
        "./url": 25,
        "./util": 26
    }],
    10: [function(require, module, exports) {
        "use strict";
        var geocoder = require("./geocoder"),
            util = require("./util"),
            GeocoderControl = L.Control.extend({
                includes: L.Mixin.Events,
                options: {
                    position: "topleft",
                    pointZoom: 16,
                    keepOpen: !1,
                    autocomplete: !1
                },
                initialize: function(t, e) {
                    L.Util.setOptions(this, e), this.setURL(t), this._updateSubmit = L.bind(this._updateSubmit, this), this._updateAutocomplete = L.bind(this._updateAutocomplete, this), this._chooseResult = L.bind(this._chooseResult, this)
                },
                setURL: function(t) {
                    return this.geocoder = geocoder(t, {
                        accessToken: this.options.accessToken
                    }), this
                },
                getURL: function() {
                    return this.geocoder.getURL()
                },
                setID: function(t) {
                    return this.setURL(t)
                },
                setTileJSON: function(t) {
                    return this.setURL(t.geocoder)
                },
                _toggle: function(t) {
                    t && L.DomEvent.stop(t), L.DomUtil.hasClass(this._container, "active") ? (L.DomUtil.removeClass(this._container, "active"), this._results.innerHTML = "", this._input.blur()) : (L.DomUtil.addClass(this._container, "active"), this._input.focus(), this._input.select())
                },
                _closeIfOpen: function() {
                    L.DomUtil.hasClass(this._container, "active") && !this.options.keepOpen && (L.DomUtil.removeClass(this._container, "active"), this._results.innerHTML = "", this._input.blur())
                },
                onAdd: function(t) {
                    var e = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder leaflet-bar leaflet-control"),
                        o = L.DomUtil.create("a", "leaflet-control-mapbox-geocoder-toggle mapbox-icon mapbox-icon-geocoder", e),
                        i = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder-results", e),
                        s = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder-wrap", e),
                        n = L.DomUtil.create("form", "leaflet-control-mapbox-geocoder-form", s),
                        r = L.DomUtil.create("input", "", n);
                    return o.href = "#", o.innerHTML = "&nbsp;", r.type = "text", r.setAttribute("placeholder", "Search"), L.DomEvent.addListener(n, "submit", this._geocode, this), L.DomEvent.addListener(r, "keyup", this._autocomplete, this), L.DomEvent.disableClickPropagation(e), this._map = t, this._results = i, this._input = r, this._form = n, this.options.keepOpen ? L.DomUtil.addClass(e, "active") : (this._map.on("click", this._closeIfOpen, this), L.DomEvent.addListener(o, "click", this._toggle, this)), e
                },
                _updateSubmit: function(t, e) {
                    if (L.DomUtil.removeClass(this._container, "searching"), this._results.innerHTML = "", t || !e) this.fire("error", {
                        error: t
                    });
                    else {
                        var o = [];
                        e.results && e.results.features && (o = e.results.features), 1 === o.length ? (this.fire("autoselect", {
                            feature: o[0]
                        }), this.fire("found", {
                            results: e.results
                        }), this._chooseResult(o[0]), this._closeIfOpen()) : o.length > 1 ? (this.fire("found", {
                            results: e.results
                        }), this._displayResults(o)) : this._displayResults(o)
                    }
                },
                _updateAutocomplete: function(t, e) {
                    if (this._results.innerHTML = "", t || !e) this.fire("error", {
                        error: t
                    });
                    else {
                        var o = [];
                        e.results && e.results.features && (o = e.results.features), o.length && this.fire("found", {
                            results: e.results
                        }), this._displayResults(o)
                    }
                },
                _displayResults: function(t) {
                    for (var e = 0, o = Math.min(t.length, 5); o > e; e++) {
                        var i = t[e],
                            s = i.place_name;
                        if (s.length) {
                            var n = L.DomUtil.create("a", "", this._results),
                                r = "innerText" in n ? "innerText" : "textContent";
                            n[r] = s, n.href = "#", L.bind(function(t) {
                                L.DomEvent.addListener(n, "click", function(e) {
                                    this._chooseResult(t), L.DomEvent.stop(e), this.fire("select", {
                                        feature: t
                                    })
                                }, this)
                            }, this)(i)
                        }
                    }
                    if (t.length > 5) {
                        var l = L.DomUtil.create("span", "", this._results);
                        l.innerHTML = "Top 5 of " + t.length + "  results"
                    }
                },
                _chooseResult: function(t) {
                    t.bbox ? this._map.fitBounds(util.lbounds(t.bbox)) : t.center && this._map.setView([t.center[1], t.center[0]], void 0 === this._map.getZoom() ? this.options.pointZoom : Math.max(this._map.getZoom(), this.options.pointZoom))
                },
                _geocode: function(t) {
                    return L.DomEvent.preventDefault(t), "" === this._input.value ? this._updateSubmit() : (L.DomUtil.addClass(this._container, "searching"), void this.geocoder.query(this._input.value, this._updateSubmit))
                },
                _autocomplete: function() {
                    return this.options.autocomplete ? "" === this._input.value ? this._updateAutocomplete() : void this.geocoder.query(this._input.value, this._updateAutocomplete) : void 0
                }
            });
        module.exports.GeocoderControl = GeocoderControl, module.exports.geocoderControl = function(t, e) {
            return new GeocoderControl(t, e)
        };
    }, {
        "./geocoder": 9,
        "./util": 26
    }],
    11: [function(require, module, exports) {
        "use strict";

        function utfDecode(t) {
            return t >= 93 && t--, t >= 35 && t--, t - 32
        }
        module.exports = function(t) {
            return function(e, r) {
                if (t) {
                    var u = utfDecode(t.grid[r].charCodeAt(e)),
                        n = t.keys[u];
                    return t.data[n]
                }
            }
        };
    }, {}],
    12: [function(require, module, exports) {
        "use strict";
        var util = require("./util"),
            Mustache = require("mustache"),
            GridControl = L.Control.extend({
                options: {
                    pinnable: !0,
                    follow: !1,
                    sanitizer: require("sanitize-caja"),
                    touchTeaser: !0,
                    location: !0
                },
                _currentContent: "",
                _pinned: !1,
                initialize: function(t, o) {
                    L.Util.setOptions(this, o), util.strict_instance(t, L.Class, "L.mapbox.gridLayer"), this._layer = t
                },
                setTemplate: function(t) {
                    return util.strict(t, "string"), this.options.template = t, this
                },
                _template: function(t, o) {
                    if (o) {
                        var i = this.options.template || this._layer.getTileJSON().template;
                        if (i) {
                            var e = {};
                            return e["__" + t + "__"] = !0, this.options.sanitizer(Mustache.to_html(i, L.extend(e, o)))
                        }
                    }
                },
                _show: function(t, o) {
                    t !== this._currentContent && (this._currentContent = t, this.options.follow ? (this._popup.setContent(t).setLatLng(o.latLng), this._map._popup !== this._popup && this._popup.openOn(this._map)) : (this._container.style.display = "block", this._contentWrapper.innerHTML = t))
                },
                hide: function() {
                    return this._pinned = !1, this._currentContent = "", this._map.closePopup(), this._container.style.display = "none", this._contentWrapper.innerHTML = "", L.DomUtil.removeClass(this._container, "closable"), this
                },
                _mouseover: function(t) {
                    if (t.data ? L.DomUtil.addClass(this._map._container, "map-clickable") : L.DomUtil.removeClass(this._map._container, "map-clickable"), !this._pinned) {
                        var o = this._template("teaser", t.data);
                        o ? this._show(o, t) : this.hide()
                    }
                },
                _mousemove: function(t) {
                    this._pinned || this.options.follow && this._popup.setLatLng(t.latLng)
                },
                _navigateTo: function(t) {
                    window.top.location.href = t
                },
                _click: function(t) {
                    var o = this._template("location", t.data);
                    if (this.options.location && o && 0 === o.search(/^https?:/)) return this._navigateTo(this._template("location", t.data));
                    if (this.options.pinnable) {
                        var i = this._template("full", t.data);
                        !i && this.options.touchTeaser && L.Browser.touch && (i = this._template("teaser", t.data)), i ? (L.DomUtil.addClass(this._container, "closable"), this._pinned = !0, this._show(i, t)) : this._pinned && (L.DomUtil.removeClass(this._container, "closable"), this._pinned = !1, this.hide())
                    }
                },
                _onPopupClose: function() {
                    this._currentContent = null, this._pinned = !1
                },
                _createClosebutton: function(t, o) {
                    var i = L.DomUtil.create("a", "close", t);
                    return i.innerHTML = "close", i.href = "#", i.title = "close", L.DomEvent.on(i, "click", L.DomEvent.stopPropagation).on(i, "mousedown", L.DomEvent.stopPropagation).on(i, "dblclick", L.DomEvent.stopPropagation).on(i, "click", L.DomEvent.preventDefault).on(i, "click", o, this), i
                },
                onAdd: function(t) {
                    this._map = t;
                    var o = "leaflet-control-grid map-tooltip",
                        i = L.DomUtil.create("div", o),
                        e = L.DomUtil.create("div", "map-tooltip-content");
                    return i.style.display = "none", this._createClosebutton(i, this.hide), i.appendChild(e), this._contentWrapper = e, this._popup = new L.Popup({
                        autoPan: !1,
                        closeOnClick: !1
                    }), t.on("popupclose", this._onPopupClose, this), L.DomEvent.disableClickPropagation(i).addListener(i, "mousewheel", L.DomEvent.stopPropagation), this._layer.on("mouseover", this._mouseover, this).on("mousemove", this._mousemove, this).on("click", this._click, this), i
                },
                onRemove: function(t) {
                    t.off("popupclose", this._onPopupClose, this), this._layer.off("mouseover", this._mouseover, this).off("mousemove", this._mousemove, this).off("click", this._click, this)
                }
            });
        module.exports.GridControl = GridControl, module.exports.gridControl = function(t, o) {
            return new GridControl(t, o)
        };
    }, {
        "./util": 26,
        "mustache": 2,
        "sanitize-caja": 3
    }],
    13: [function(require, module, exports) {
        "use strict";
        var util = require("./util"),
            request = require("./request"),
            grid = require("./grid"),
            GridLayer = L.Class.extend({
                includes: [L.Mixin.Events, require("./load_tilejson")],
                options: {
                    template: function() {
                        return ""
                    }
                },
                _mouseOn: null,
                _tilejson: {},
                _cache: {},
                initialize: function(t, i) {
                    L.Util.setOptions(this, i), this._loadTileJSON(t)
                },
                _setTileJSON: function(t) {
                    return util.strict(t, "object"), L.extend(this.options, {
                        grids: t.grids,
                        minZoom: t.minzoom,
                        maxZoom: t.maxzoom,
                        bounds: t.bounds && util.lbounds(t.bounds)
                    }), this._tilejson = t, this._cache = {}, this._update(), this
                },
                getTileJSON: function() {
                    return this._tilejson
                },
                active: function() {
                    return !!(this._map && this.options.grids && this.options.grids.length)
                },
                addTo: function(t) {
                    return t.addLayer(this), this
                },
                onAdd: function(t) {
                    this._map = t, this._update(), this._map.on("click", this._click, this).on("mousemove", this._move, this).on("moveend", this._update, this)
                },
                onRemove: function() {
                    this._map.off("click", this._click, this).off("mousemove", this._move, this).off("moveend", this._update, this)
                },
                getData: function(t, i) {
                    if (this.active()) {
                        var e = this._map,
                            o = e.project(t.wrap()),
                            s = 256,
                            n = 4,
                            a = Math.floor(o.x / s),
                            h = Math.floor(o.y / s),
                            r = e.options.crs.scale(e.getZoom()) / s;
                        return a = (a + r) % r, h = (h + r) % r, this._getTile(e.getZoom(), a, h, function(t) {
                            var e = Math.floor((o.x - a * s) / n),
                                r = Math.floor((o.y - h * s) / n);
                            i(t(e, r))
                        }), this
                    }
                },
                _click: function(t) {
                    this.getData(t.latlng, L.bind(function(i) {
                        this.fire("click", {
                            latLng: t.latlng,
                            data: i
                        })
                    }, this))
                },
                _move: function(t) {
                    this.getData(t.latlng, L.bind(function(i) {
                        i !== this._mouseOn ? (this._mouseOn && this.fire("mouseout", {
                            latLng: t.latlng,
                            data: this._mouseOn
                        }), this.fire("mouseover", {
                            latLng: t.latlng,
                            data: i
                        }), this._mouseOn = i) : this.fire("mousemove", {
                            latLng: t.latlng,
                            data: i
                        })
                    }, this))
                },
                _getTileURL: function(t) {
                    var i = this.options.grids,
                        e = (t.x + t.y) % i.length,
                        o = i[e];
                    return L.Util.template(o, t)
                },
                _update: function() {
                    if (this.active()) {
                        var t = this._map.getPixelBounds(),
                            i = this._map.getZoom(),
                            e = 256;
                        if (!(i > this.options.maxZoom || i < this.options.minZoom))
                            for (var o = L.bounds(t.min.divideBy(e)._floor(), t.max.divideBy(e)._floor()), s = this._map.options.crs.scale(i) / e, n = o.min.x; n <= o.max.x; n++)
                                for (var a = o.min.y; a <= o.max.y; a++) this._getTile(i, (n % s + s) % s, (a % s + s) % s)
                    }
                },
                _getTile: function(t, i, e, o) {
                    var s = t + "_" + i + "_" + e,
                        n = L.point(i, e);
                    if (n.z = t, this._tileShouldBeLoaded(n)) {
                        if (s in this._cache) {
                            if (!o) return;
                            return void("function" == typeof this._cache[s] ? o(this._cache[s]) : this._cache[s].push(o))
                        }
                        this._cache[s] = [], o && this._cache[s].push(o), request(this._getTileURL(n), L.bind(function(t, i) {
                            var e = this._cache[s];
                            this._cache[s] = grid(i);
                            for (var o = 0; o < e.length; ++o) e[o](this._cache[s])
                        }, this))
                    }
                },
                _tileShouldBeLoaded: function(t) {
                    if (t.z > this.options.maxZoom || t.z < this.options.minZoom) return !1;
                    if (this.options.bounds) {
                        var i = 256,
                            e = t.multiplyBy(i),
                            o = e.add(new L.Point(i, i)),
                            s = this._map.unproject(e),
                            n = this._map.unproject(o),
                            a = new L.LatLngBounds([s, n]);
                        if (!this.options.bounds.intersects(a)) return !1
                    }
                    return !0
                }
            });
        module.exports.GridLayer = GridLayer, module.exports.gridLayer = function(t, i) {
            return new GridLayer(t, i)
        };
    }, {
        "./grid": 11,
        "./load_tilejson": 16,
        "./request": 21,
        "./util": 26
    }],
    14: [function(require, module, exports) {
        "use strict";
        var InfoControl = L.Control.extend({
            options: {
                position: "bottomright",
                sanitizer: require("sanitize-caja")
            },
            initialize: function(t) {
                L.setOptions(this, t), this._info = {}, console.warn("infoControl has been deprecated and will be removed in mapbox.js v3.0.0. Use the default attribution control instead, which is now responsive.")
            },
            onAdd: function(t) {
                this._container = L.DomUtil.create("div", "mapbox-control-info mapbox-small"), this._content = L.DomUtil.create("div", "map-info-container", this._container);
                var i = L.DomUtil.create("a", "mapbox-info-toggle mapbox-icon mapbox-icon-info", this._container);
                i.href = "#", L.DomEvent.addListener(i, "click", this._showInfo, this), L.DomEvent.disableClickPropagation(this._container);
                for (var n in t._layers) t._layers[n].getAttribution && this.addInfo(t._layers[n].getAttribution());
                return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
            },
            onRemove: function(t) {
                t.off("layeradd", this._onLayerAdd, this).off("layerremove", this._onLayerRemove, this)
            },
            addInfo: function(t) {
                return t ? (this._info[t] || (this._info[t] = 0), this._info[t] = !0, this._update()) : this
            },
            removeInfo: function(t) {
                return t ? (this._info[t] && (this._info[t] = !1), this._update()) : this
            },
            _showInfo: function(t) {
                return L.DomEvent.preventDefault(t), this._active === !0 ? this._hidecontent() : (L.DomUtil.addClass(this._container, "active"), this._active = !0, void this._update())
            },
            _hidecontent: function() {
                this._content.innerHTML = "", this._active = !1, L.DomUtil.removeClass(this._container, "active")
            },
            _update: function() {
                if (!this._map) return this;
                this._content.innerHTML = "";
                var t = "none",
                    i = [];
                for (var n in this._info) this._info.hasOwnProperty(n) && this._info[n] && (i.push(this.options.sanitizer(n)), t = "block");
                return this._content.innerHTML += i.join(" | "), this._container.style.display = t, this
            },
            _onLayerAdd: function(t) {
                t.layer.getAttribution && t.layer.getAttribution() ? this.addInfo(t.layer.getAttribution()) : "on" in t.layer && t.layer.getAttribution && t.layer.on("ready", L.bind(function() {
                    this.addInfo(t.layer.getAttribution())
                }, this))
            },
            _onLayerRemove: function(t) {
                t.layer.getAttribution && this.removeInfo(t.layer.getAttribution())
            }
        });
        module.exports.InfoControl = InfoControl, module.exports.infoControl = function(t) {
            return new InfoControl(t)
        };
    }, {
        "sanitize-caja": 3
    }],
    15: [function(require, module, exports) {
        "use strict";
        var LegendControl = L.Control.extend({
            options: {
                position: "bottomright",
                sanitizer: require("sanitize-caja")
            },
            initialize: function(e) {
                L.setOptions(this, e), this._legends = {}
            },
            onAdd: function() {
                return this._container = L.DomUtil.create("div", "map-legends wax-legends"), L.DomEvent.disableClickPropagation(this._container), this._update(), this._container
            },
            addLegend: function(e) {
                return e ? (this._legends[e] || (this._legends[e] = 0), this._legends[e]++, this._update()) : this
            },
            removeLegend: function(e) {
                return e ? (this._legends[e] && this._legends[e]--, this._update()) : this
            },
            _update: function() {
                if (!this._map) return this;
                this._container.innerHTML = "";
                var e = "none";
                for (var t in this._legends)
                    if (this._legends.hasOwnProperty(t) && this._legends[t]) {
                        var n = L.DomUtil.create("div", "map-legend wax-legend", this._container);
                        n.innerHTML = this.options.sanitizer(t), e = "block"
                    }
                return this._container.style.display = e, this
            }
        });
        module.exports.LegendControl = LegendControl, module.exports.legendControl = function(e) {
            return new LegendControl(e)
        };
    }, {
        "sanitize-caja": 3
    }],
    16: [function(require, module, exports) {
        "use strict";
        var request = require("./request"),
            url = require("./url"),
            util = require("./util");
        module.exports = {
            _loadTileJSON: function(e) {
                "string" == typeof e ? (e = url.tileJSON(e, this.options && this.options.accessToken), request(e, L.bind(function(t, i) {
                    t ? (util.log("could not load TileJSON at " + e), this.fire("error", {
                        error: t
                    })) : i && (this._setTileJSON(i), this.fire("ready"))
                }, this))) : e && "object" == typeof e && this._setTileJSON(e)
            }
        };
    }, {
        "./request": 21,
        "./url": 25,
        "./util": 26
    }],
    17: [function(require, module, exports) {
        "use strict";

        function withAccessToken(t, o) {
            return !o || t.accessToken ? t : L.extend({
                accessToken: o
            }, t)
        }
        var util = require("./util"),
            tileLayer = require("./tile_layer").tileLayer,
            featureLayer = require("./feature_layer").featureLayer,
            gridLayer = require("./grid_layer").gridLayer,
            gridControl = require("./grid_control").gridControl,
            infoControl = require("./info_control").infoControl,
            shareControl = require("./share_control").shareControl,
            legendControl = require("./legend_control").legendControl,
            mapboxLogoControl = require("./mapbox_logo").mapboxLogoControl,
            feedback = require("./feedback"),
            LMap = L.Map.extend({
                includes: [require("./load_tilejson")],
                options: {
                    tileLayer: {},
                    featureLayer: {},
                    gridLayer: {},
                    legendControl: {},
                    gridControl: {},
                    infoControl: !1,
                    shareControl: !1
                },
                _tilejson: {},
                initialize: function(t, o, e) {
                    if (L.Map.prototype.initialize.call(this, t, L.extend({}, L.Map.prototype.options, e)), this.attributionControl) {
                        this.attributionControl.setPrefix("");
                        var i = this.options.attributionControl.compact;
                        (i || i !== !1 && this._container.offsetWidth <= 640) && L.DomUtil.addClass(this.attributionControl._container, "leaflet-compact-attribution"), void 0 === i && this.on("resize", function() {
                            this._container.offsetWidth > 640 ? L.DomUtil.removeClass(this.attributionControl._container, "leaflet-compact-attribution") : L.DomUtil.addClass(this.attributionControl._container, "leaflet-compact-attribution")
                        })
                    }
                    this.options.tileLayer && (this.tileLayer = tileLayer(void 0, withAccessToken(this.options.tileLayer, this.options.accessToken)), this.addLayer(this.tileLayer)), this.options.featureLayer && (this.featureLayer = featureLayer(void 0, withAccessToken(this.options.featureLayer, this.options.accessToken)), this.addLayer(this.featureLayer)), this.options.gridLayer && (this.gridLayer = gridLayer(void 0, withAccessToken(this.options.gridLayer, this.options.accessToken)), this.addLayer(this.gridLayer)), this.options.gridLayer && this.options.gridControl && (this.gridControl = gridControl(this.gridLayer, this.options.gridControl), this.addControl(this.gridControl)), this.options.infoControl && (this.infoControl = infoControl(this.options.infoControl), this.addControl(this.infoControl)), this.options.legendControl && (this.legendControl = legendControl(this.options.legendControl), this.addControl(this.legendControl)), this.options.shareControl && (this.shareControl = shareControl(void 0, withAccessToken(this.options.shareControl, this.options.accessToken)), this.addControl(this.shareControl)), this._mapboxLogoControl = mapboxLogoControl(this.options.mapboxLogoControl), this.addControl(this._mapboxLogoControl), this._loadTileJSON(o), this.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this).on("moveend", this._updateMapFeedbackLink, this), this.whenReady(function() {
                        feedback.on("change", this._updateMapFeedbackLink, this)
                    }), this.on("unload", function() {
                        feedback.off("change", this._updateMapFeedbackLink, this)
                    })
                },
                _setTileJSON: function(t) {
                    return this._tilejson = t, this._initialize(t), this
                },
                getTileJSON: function() {
                    return this._tilejson
                },
                _initialize: function(t) {
                    if (this.tileLayer && (this.tileLayer._setTileJSON(t), this._updateLayer(this.tileLayer)), this.featureLayer && !this.featureLayer.getGeoJSON() && t.data && t.data[0] && this.featureLayer.loadURL(t.data[0]), this.gridLayer && (this.gridLayer._setTileJSON(t), this._updateLayer(this.gridLayer)), this.infoControl && t.attribution && (this.infoControl.addInfo(t.attribution), this._updateMapFeedbackLink()), this.legendControl && t.legend && this.legendControl.addLegend(t.legend), this.shareControl && this.shareControl._setTileJSON(t), this._mapboxLogoControl._setTileJSON(t), !this._loaded && t.center) {
                        var o = void 0 !== this.getZoom() ? this.getZoom() : t.center[2],
                            e = L.latLng(t.center[1], t.center[0]);
                        this.setView(e, o)
                    }
                },
                _updateMapFeedbackLink: function() {
                    if (this._controlContainer.getElementsByClassName) {
                        var t = this._controlContainer.getElementsByClassName("mapbox-improve-map");
                        if (t.length && this._loaded) {
                            var o = this.getCenter().wrap(),
                                e = this._tilejson || {},
                                i = e.id || "",
                                n = "#" + i + "/" + o.lng.toFixed(3) + "/" + o.lat.toFixed(3) + "/" + this.getZoom();
                            for (var r in feedback.data) n += "/" + r + "=" + feedback.data[r];
                            for (var a = 0; a < t.length; a++) t[a].hash = n
                        }
                    }
                },
                _onLayerAdd: function(t) {
                    "on" in t.layer && t.layer.on("ready", this._onLayerReady, this), window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0)
                },
                _onLayerRemove: function(t) {
                    "on" in t.layer && t.layer.off("ready", this._onLayerReady, this), window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0)
                },
                _onLayerReady: function(t) {
                    this._updateLayer(t.target)
                },
                _updateLayer: function(t) {
                    t.options && (this.infoControl && this._loaded && this.infoControl.addInfo(t.options.infoControl), this.attributionControl && this._loaded && t.getAttribution && this.attributionControl.addAttribution(t.getAttribution()), L.stamp(t) in this._zoomBoundLayers || !t.options.maxZoom && !t.options.minZoom || (this._zoomBoundLayers[L.stamp(t)] = t), this._updateMapFeedbackLink(), this._updateZoomLevels())
                }
            });
        module.exports.Map = LMap, module.exports.map = function(t, o, e) {
            return new LMap(t, o, e)
        };
    }, {
        "./feature_layer": 7,
        "./feedback": 8,
        "./grid_control": 12,
        "./grid_layer": 13,
        "./info_control": 14,
        "./legend_control": 15,
        "./load_tilejson": 16,
        "./mapbox_logo": 19,
        "./share_control": 22,
        "./tile_layer": 24,
        "./util": 26
    }],
    18: [function(require, module, exports) {
        "use strict";
        var geocoderControl = require("./geocoder_control"),
            gridControl = require("./grid_control"),
            featureLayer = require("./feature_layer"),
            legendControl = require("./legend_control"),
            shareControl = require("./share_control"),
            tileLayer = require("./tile_layer"),
            infoControl = require("./info_control"),
            map = require("./map"),
            gridLayer = require("./grid_layer");
        L.mapbox = module.exports = {
            VERSION: require("../package.json").version,
            geocoder: require("./geocoder"),
            marker: require("./marker"),
            simplestyle: require("./simplestyle"),
            tileLayer: tileLayer.tileLayer,
            TileLayer: tileLayer.TileLayer,
            infoControl: infoControl.infoControl,
            InfoControl: infoControl.InfoControl,
            shareControl: shareControl.shareControl,
            ShareControl: shareControl.ShareControl,
            legendControl: legendControl.legendControl,
            LegendControl: legendControl.LegendControl,
            geocoderControl: geocoderControl.geocoderControl,
            GeocoderControl: geocoderControl.GeocoderControl,
            gridControl: gridControl.gridControl,
            GridControl: gridControl.GridControl,
            gridLayer: gridLayer.gridLayer,
            GridLayer: gridLayer.GridLayer,
            featureLayer: featureLayer.featureLayer,
            FeatureLayer: featureLayer.FeatureLayer,
            map: map.map,
            Map: map.Map,
            config: require("./config"),
            sanitize: require("sanitize-caja"),
            template: require("mustache").to_html,
            feedback: require("./feedback")
        }, window.L.Icon.Default.imagePath = ("https:" == document.location.protocol || "http:" == document.location.protocol ? "" : "https:") + "//api.tiles.mapbox.com/mapbox.js/v" + require("../package.json").version + "/images";
    }, {
        "../package.json": 5,
        "./config": 6,
        "./feature_layer": 7,
        "./feedback": 8,
        "./geocoder": 9,
        "./geocoder_control": 10,
        "./grid_control": 12,
        "./grid_layer": 13,
        "./info_control": 14,
        "./legend_control": 15,
        "./map": 17,
        "./marker": 20,
        "./share_control": 22,
        "./simplestyle": 23,
        "./tile_layer": 24,
        "mustache": 2,
        "sanitize-caja": 3
    }],
    19: [function(require, module, exports) {
        "use strict";
        var MapboxLogoControl = L.Control.extend({
            options: {
                position: "bottomleft"
            },
            initialize: function(o) {
                L.setOptions(this, o)
            },
            onAdd: function() {
                return this._container = L.DomUtil.create("div", "mapbox-logo"), this._container
            },
            _setTileJSON: function(o) {
                o.mapbox_logo && L.DomUtil.addClass(this._container, "mapbox-logo-true")
            }
        });
        module.exports.MapboxLogoControl = MapboxLogoControl, module.exports.mapboxLogoControl = function(o) {
            return new MapboxLogoControl(o)
        };
    }, {}],
    20: [function(require, module, exports) {
        "use strict";

        function icon(e, r) {
            e = e || {};
            var i = {
                    small: [20, 50],
                    medium: [30, 70],
                    large: [35, 90]
                },
                t = e["marker-size"] || "medium",
                o = "marker-symbol" in e && "" !== e["marker-symbol"] ? "-" + e["marker-symbol"] : "",
                s = (e["marker-color"] || "7e7e7e").replace("#", "");
            return L.icon({
                iconUrl: url("/marker/pin-" + t.charAt(0) + o + "+" + s + (L.Browser.retina ? "@2x" : "") + ".png", r && r.accessToken),
                iconSize: i[t],
                iconAnchor: [i[t][0] / 2, i[t][1] / 2],
                popupAnchor: [0, -i[t][1] / 2]
            })
        }

        function style(e, r, i) {
            return L.marker(r, {
                icon: icon(e.properties, i),
                title: util.strip_tags(sanitize(e.properties && e.properties.title || ""))
            })
        }

        function createPopup(e, r) {
            if (!e || !e.properties) return "";
            var i = "";
            return e.properties.title && (i += '<div class="marker-title">' + e.properties.title + "</div>"), e.properties.description && (i += '<div class="marker-description">' + e.properties.description + "</div>"), (r || sanitize)(i)
        }
        var url = require("./url"),
            util = require("./util"),
            sanitize = require("sanitize-caja");
        module.exports = {
            icon: icon,
            style: style,
            createPopup: createPopup
        };
    }, {
        "./url": 25,
        "./util": 26,
        "sanitize-caja": 3
    }],
    21: [function(require, module, exports) {
        "use strict";
        var corslite = require("corslite"),
            strict = require("./util").strict,
            config = require("./config"),
            protocol = /^(https?:)?(?=\/\/(.|api)\.tiles\.mapbox\.com\/)/;
        module.exports = function(t, o) {
            function r(t, r) {
                !t && r && (r = JSON.parse(r.responseText)), o(t, r)
            }
            return strict(t, "string"), strict(o, "function"), t = t.replace(protocol, function(t, o) {
                return "withCredentials" in new window.XMLHttpRequest ? "https:" === o || "https:" === document.location.protocol || config.FORCE_HTTPS ? "https:" : "http:" : document.location.protocol
            }), corslite(t, r)
        };
    }, {
        "./config": 6,
        "./util": 26,
        "corslite": 1
    }],
    22: [function(require, module, exports) {
        "use strict";
        var urlhelper = require("./url"),
            ShareControl = L.Control.extend({
                includes: [require("./load_tilejson")],
                options: {
                    position: "topleft",
                    url: ""
                },
                initialize: function(t, e) {
                    L.setOptions(this, e), this._loadTileJSON(t)
                },
                _setTileJSON: function(t) {
                    this._tilejson = t
                },
                onAdd: function(t) {
                    this._map = t;
                    var e = L.DomUtil.create("div", "leaflet-control-mapbox-share leaflet-bar"),
                        o = L.DomUtil.create("a", "mapbox-share mapbox-icon mapbox-icon-share", e);
                    return o.href = "#", this._modal = L.DomUtil.create("div", "mapbox-modal", this._map._container), this._mask = L.DomUtil.create("div", "mapbox-modal-mask", this._modal), this._content = L.DomUtil.create("div", "mapbox-modal-content", this._modal), L.DomEvent.addListener(o, "click", this._shareClick, this), L.DomEvent.disableClickPropagation(e), this._map.on("mousedown", this._clickOut, this), e
                },
                _clickOut: function(t) {
                    return this._sharing ? (L.DomEvent.preventDefault(t), L.DomUtil.removeClass(this._modal, "active"), this._content.innerHTML = "", void(this._sharing = null)) : void 0
                },
                _shareClick: function(t) {
                    if (L.DomEvent.stop(t), this._sharing) return this._clickOut(t);
                    var e = this._tilejson || this._map._tilejson || {},
                        o = encodeURIComponent(this.options.url || e.webpage || window.location),
                        i = encodeURIComponent(e.name),
                        a = urlhelper("/" + e.id + "/" + this._map.getCenter().lng + "," + this._map.getCenter().lat + "," + this._map.getZoom() + "/600x600.png", this.options.accessToken),
                        n = urlhelper("/" + e.id + ".html", this.options.accessToken),
                        s = "//twitter.com/intent/tweet?status=" + i + " " + o,
                        r = "//www.facebook.com/sharer.php?u=" + o + "&t=" + encodeURIComponent(e.name),
                        l = "//www.pinterest.com/pin/create/button/?url=" + o + "&media=" + a + "&description=" + e.name,
                        c = "<h3>Share this map</h3><div class='mapbox-share-buttons'><a class='mapbox-button mapbox-button-icon mapbox-icon-facebook' target='_blank' href='{{facebook}}'>Facebook</a><a class='mapbox-button mapbox-button-icon mapbox-icon-twitter' target='_blank' href='{{twitter}}'>Twitter</a><a class='mapbox-button mapbox-button-icon mapbox-icon-pinterest' target='_blank' href='{{pinterest}}'>Pinterest</a></div>".replace("{{twitter}}", s).replace("{{facebook}}", r).replace("{{pinterest}}", l),
                        m = '<iframe width="100%" height="500px" frameBorder="0" src="{{embed}}"></iframe>'.replace("{{embed}}", n),
                        h = "Copy and paste this <strong>HTML code</strong> into documents to embed this map on web pages.";
                    L.DomUtil.addClass(this._modal, "active"), this._sharing = L.DomUtil.create("div", "mapbox-modal-body", this._content), this._sharing.innerHTML = c;
                    var p = L.DomUtil.create("input", "mapbox-embed", this._sharing);
                    p.type = "text", p.value = m;
                    var d = L.DomUtil.create("label", "mapbox-embed-description", this._sharing);
                    d.innerHTML = h;
                    var b = L.DomUtil.create("a", "leaflet-popup-close-button", this._sharing);
                    b.href = "#", L.DomEvent.disableClickPropagation(this._sharing), L.DomEvent.addListener(b, "click", this._clickOut, this), L.DomEvent.addListener(p, "click", function(t) {
                        t.target.focus(), t.target.select()
                    })
                }
            });
        module.exports.ShareControl = ShareControl, module.exports.shareControl = function(t, e) {
            return new ShareControl(t, e)
        };
    }, {
        "./load_tilejson": 16,
        "./url": 25
    }],
    23: [function(require, module, exports) {
        "use strict";

        function fallback(t, l) {
            var i = {};
            for (var r in l) i[r] = void 0 === t[r] ? l[r] : t[r];
            return i
        }

        function remap(t) {
            for (var l = {}, i = 0; i < mapping.length; i++) l[mapping[i][1]] = t[mapping[i][0]];
            return l
        }

        function style(t) {
            return remap(fallback(t.properties || {}, defaults))
        }
        var defaults = {
                stroke: "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                fill: "#555555",
                "fill-opacity": .5
            },
            mapping = [
                ["stroke", "color"],
                ["stroke-width", "weight"],
                ["stroke-opacity", "opacity"],
                ["fill", "fillColor"],
                ["fill-opacity", "fillOpacity"]
            ];
        module.exports = {
            style: style,
            defaults: defaults
        };
    }, {}],
    24: [function(require, module, exports) {
        "use strict";
        var util = require("./util"),
            formatPattern = /\.((?:png|jpg)\d*)(?=$|\?)/,
            TileLayer = L.TileLayer.extend({
                includes: [require("./load_tilejson")],
                formats: ["png", "jpg", "png32", "png64", "png128", "png256", "jpg70", "jpg80", "jpg90"],
                scalePrefix: "@2x.",
                initialize: function(t, i) {
                    L.TileLayer.prototype.initialize.call(this, void 0, i), this._tilejson = {}, i && i.format && util.strict_oneof(i.format, this.formats), this._loadTileJSON(t)
                },
                setFormat: function(t) {
                    return util.strict(t, "string"), this.options.format = t, this.redraw(), this
                },
                setUrl: null,
                _setTileJSON: function(t) {
                    return util.strict(t, "object"), this.options.format = this.options.format || t.tiles[0].match(formatPattern)[1], L.extend(this.options, {
                        tiles: t.tiles,
                        attribution: t.attribution,
                        minZoom: t.minzoom || 0,
                        maxZoom: t.maxzoom || 18,
                        tms: "tms" === t.scheme,
                        bounds: t.bounds && util.lbounds(t.bounds)
                    }), this._tilejson = t, this.redraw(), this
                },
                getTileJSON: function() {
                    return this._tilejson
                },
                getTileUrl: function(t) {
                    var i = this.options.tiles,
                        e = Math.floor(Math.abs(t.x + t.y) % i.length),
                        o = i[e],
                        r = L.Util.template(o, t);
                    return r ? r.replace(formatPattern, (L.Browser.retina ? this.scalePrefix : ".") + this.options.format) : r
                },
                _update: function() {
                    this.options.tiles && L.TileLayer.prototype._update.call(this)
                }
            });
        module.exports.TileLayer = TileLayer, module.exports.tileLayer = function(t, i) {
            return new TileLayer(t, i)
        };
    }, {
        "./load_tilejson": 16,
        "./util": 26
    }],
    25: [function(require, module, exports) {
        "use strict";
        var config = require("./config"),
            version = require("../package.json").version;
        module.exports = function(e, o) {
            if (o = o || L.mapbox.accessToken, !o && config.REQUIRE_ACCESS_TOKEN) throw new Error("An API access token is required to use Mapbox.js. See https://www.mapbox.com/mapbox.js/api/v" + version + "/api-access-tokens/");
            var s = "https:" === document.location.protocol || config.FORCE_HTTPS ? config.HTTPS_URL : config.HTTP_URL;
            if (s += e, s += -1 !== s.indexOf("?") ? "&access_token=" : "?access_token=", config.REQUIRE_ACCESS_TOKEN) {
                if ("s" === o[0]) throw new Error("Use a public access token (pk.*) with Mapbox.js, not a secret access token (sk.*). See https://www.mapbox.com/mapbox.js/api/v" + version + "/api-access-tokens/");
                s += o
            }
            return s
        }, module.exports.tileJSON = function(e, o) {
            if (-1 !== e.indexOf("/")) return e;
            var s = module.exports("/" + e + ".json", o);
            return 0 === s.indexOf("https") && (s += "&secure"), s
        };
    }, {
        "../package.json": 5,
        "./config": 6
    }],
    26: [function(require, module, exports) {
        "use strict";

        function contains(n, t) {
            if (!t || !t.length) return !1;
            for (var r = 0; r < t.length; r++)
                if (t[r] == n) return !0;
            return !1
        }
        module.exports = {
            idUrl: function(n, t) {
                -1 == n.indexOf("/") ? t.loadID(n) : t.loadURL(n)
            },
            log: function(n) {
                "object" == typeof console && "function" == typeof console.error && console.error(n)
            },
            strict: function(n, t) {
                if (typeof n !== t) throw new Error("Invalid argument: " + t + " expected")
            },
            strict_instance: function(n, t, r) {
                if (!(n instanceof t)) throw new Error("Invalid argument: " + r + " expected")
            },
            strict_oneof: function(n, t) {
                if (!contains(n, t)) throw new Error("Invalid argument: " + n + " given, valid values are " + t.join(", "))
            },
            strip_tags: function(n) {
                return n.replace(/<[^<]+>/g, "")
            },
            lbounds: function(n) {
                return new L.LatLngBounds([
                    [n[1], n[0]],
                    [n[3], n[2]]
                ])
            }
        };
    }, {}]
}, {}, [18])


//# sourceMappingURL=mapbox.standalone.js.map
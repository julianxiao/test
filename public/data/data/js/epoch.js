(function (k) {
    var m, f = /[-+,> ]/;
    k([], m = function (d, e) {
        function c(s) {
            function e() {
                p && (q && p != q) && (q == s && (l || (l = f.test(x) && d.createDocumentFragment())) || q).insertBefore(p, n || null)
            }
            for (var l, y, n, q, p, m = arguments, k = m[0], z = 0; z < m.length; z++) {
                var x = m[z];
                if ("object" == typeof x) {
                    y = !1;
                    if (x instanceof Array) {
                        p = d.createDocumentFragment();
                        for (var w = 0; w < x.length; w++) p.appendChild(c(x[w]));
                        x = p
                    }
                    if (x.nodeType) p = x, e(), q = x, n = 0;
                    else for (w in x) p[w] = x[w]
                } else if (y) y = !1, p.appendChild(d.createTextNode(x));
                else {
                    1 > z && (s = null);
                    y = !0;
                    if (k = x.replace(a, function (a, l, f, y, k, w) {
                        l && (e(), "-" == l || "+" == l ? (q = (n = p || q).parentNode, p = null, "+" == l && (n = n.nextSibling)) : ("<" == l ? q = p = (p || q).parentNode : ("," == l ? q = s : p && (q = p), p = null), n = 0), p && (q = p));
                        if ((a = !f && y) || !p && (f || k)) "$" == a ? (a = m[++z], q.appendChild(d.createTextNode(a))) : (a = a || c.defaultTag, (l = u && m[z + 1] && m[z + 1].name) && (a = "<" + a + ' name="' + l + '">'), p = v && ~ (h = a.indexOf("|")) ? d.createElementNS(v[a.slice(0, h)], a.slice(h + 1)) : d.createElement(a));
                        if (f) if ("$" == y && (y = m[++z]), "#" == f) p.id = y;
                        else if (l = (a = p.className) && (" " + a + " ").replace(" " + y + " ", " "), "." == f) p.className = a ? (l + y).substring(1) : y;
                        else if ("!" == x) {
                            var A;
                            u ? c("div", p, "<").innerHTML = "" : (A = p.parentNode) && A.removeChild(p)
                        } else l = l.substring(1, l.length - 1), l != a && (p.className = l);
                        k && ("$" == w && (w = m[++z]), "style" == k ? p.style.cssText = w : (f = "!" == k.charAt(0) ? (k = k.substring(1)) && "removeAttribute" : "setAttribute", w = "" === w ? k : w, v && ~ (h = k.indexOf("|")) ? p[f + "NS"](v[k.slice(0, h)], k.slice(h + 1), w) : p[f](k, w)));
                        return ""
                    })) throw new SyntaxError("Unexpected char " + k + " in " + x);
                    e();
                    q = k = p || q
                }
            }
            s && l && s.appendChild(l);
            return k
        }
        f = e || f;
        var a = /(?:\s*([-+ ,<>]))?\s*(\.|!\.?|#)?([-\w%$|]+)?(?:\[([^\]=]+)=?['"]?([^\]'"]*)['"]?\])?/g,
            h, v = !1;
        d = d || document;
        var u = "object" == typeof d.createElement;
        c.addNamespace = function (a, h) {
            d.createElementNS ? (v || (v = {}))[a] = h : d.namespaces.add(a, h)
        };
        c.defaultTag = "div";
        c.forDocument = m;
        return c
    })
})(function (k, m, f) {
    f = f || m;
    "function" === typeof define ? define([], function () {
        return f()
    }) : "undefined" == typeof window ? require("./node-html")(module, f) : put = f()
});
(function () {
    var k, m, f, d = {}.hasOwnProperty,
        e = function (c, a) {
            function h() {
                this.constructor = c
            }
            for (var v in a) d.call(a, v) && (c[v] = a[v]);
            h.prototype = a.prototype;
            c.prototype = new h;
            c.__super__ = a.prototype;
            return c
        };
    null == window.Epoch && (window.Epoch = {});
    null == (f = window.Epoch).Chart && (f.Chart = {});
    null == (f = window.Epoch).Time && (f.Time = {});
    null == (f = window.Epoch).Util && (f.Util = {});
    null == (f = window.Epoch).Formats && (f.Formats = {});
    Epoch.isArray = function (c) {
        return "array" === jQuery.type(c)
    };
    Epoch.isObject = function (c) {
        return "object" === jQuery.type(c)
    };
    Epoch.isString = function (c) {
        return "string" === jQuery.type(c)
    };
    Epoch.isFunction = function (c) {
        return "function" === jQuery.type(c)
    };
    Epoch.warn = function (c) {
        return (console.warn || console.log)("Epoch Warning: " + c)
    };
    Epoch.exception = function (c) {
        throw "Epoch Error: " + c;
    };
    Epoch.Util.copy = function (c) {
        var a, h, v;
        if (null == c) return null;
        a = {};
        for (h in c) v = c[h], a[h] = v;
        return a
    };
    Epoch.Util.defaults = function (c, a) {
        var h, v;
        v = Epoch.Util.copy(c);
        for (h in a) null != c[h] && null != a[h] ? !Epoch.isArray(c[h]) && Epoch.isObject(c[h]) && Epoch.isObject(a[h]) ? v[h] = Epoch.Util.defaults(c[h], a[h]) : v[h] = c[h] : v[h] = null != c[h] ? c[h] : a[h];
        return v
    };
    Epoch.Util.formatSI = function (c, a, h) {
        var v, u, s, d;
        null == a && (a = 1);
        null == h && (h = !1);
        if (1E3 > c) {
            if ((c | 0) !== c || h) c = c.toFixed(a);
            return c
        }
        d = "KMGTPEZY".split("");
        for (u in d) if (s = d[u], v = Math.pow(10, 3 * ((u | 0) + 1)), c >= v && c < Math.pow(10, 3 * ((u | 0) + 2))) {
            c /= v;
            if ((c | 0) !== c || h) c = c.toFixed(a);
            return "" + c + " " + s
        }
    };
    Epoch.Util.formatBytes = function (c, a, h) {
        var v, u, d, e;
        null == a && (a = 1);
        null == h && (h = !1);
        if (1024 > c) return "" + c + " B";
        e =
            "KB MB GB TB PB EB ZB YB".split(" ");
        for (u in e) if (d = e[u], v = Math.pow(1024, (u | 0) + 1), c >= v && c < Math.pow(1024, (u | 0) + 2)) {
            c /= v;
            if ((c | 0) !== c || h) c = c.toFixed(a);
            return "" + c + " " + d
        }
    };
    Epoch.Util.dasherize = function (c) {
        return c.replace("\n", "").replace(/\s+/, "-").toLowerCase()
    };
    Epoch.Util.domain = function (c, a) {
        var h, v, u, d, e, l, f, n;
        null == a && (a = "x");
        u = {};
        h = [];
        d = 0;
        for (l = c.length; d < l; d++) for (v = c[d], n = v.values, e = 0, f = n.length; e < f; e++) v = n[e], null == u[v[a]] && (h.push(v[a]), u[v[a]] = !0);
        return h
    };
    Epoch.toRGBA = function (c, a) {
        var h,
        v;
        if (c.match(/^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)/)) h = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        else if (v = d3.rgb(c)) h = "rgba(" + v.r + "," + v.g + "," + v.b + "," + a + ")";
        return h
    };
    Epoch.Formats.regular = function (c) {
        return c
    };
    Epoch.Formats.si = function (c) {
        return Epoch.Util.formatSI(c)
    };
    Epoch.Formats.percent = function (c) {
        return (100 * c).toFixed(1) + "%"
    };
    Epoch.Formats.seconds = function (c) {
        return m(new Date(1E3 * c))
    };
    m = d3.time.format("%I:%M:%S %p");
    Epoch.Formats.bytes = function (c) {
        return Epoch.Util.formatBytes(c)
    };
    Epoch.Events = function () {
        function c() {
            this._events = {}
        }
        c.prototype.on = function (a, h) {
            var c;
            if (null != h) return null == (c = this._events)[a] && (c[a] = []), this._events[a].push(h)
        };
        c.prototype.off = function (a, h) {
            var c, u;
            if (Epoch.isObject(this._events[a])) {
                if (null == h) return delete this._events[a];
                for (u = []; 0 <= (c = this._events[a].indexOf(h));) u.push(this._events[a].splice(c, 1));
                return u
            }
        };
        c.prototype.trigger = function (a) {
            var h, c, u, d, e, l, f, n;
            if (null != this._events[a]) {
                h = function () {
                    var a, c, h;
                    h = [];
                    d = a = 1;
                    for (c = arguments.length; 1 <= c ? a < c : a > c; d = 1 <= c ? ++a : --a) h.push(arguments[d]);
                    return h
                }.apply(this, arguments);
                f = this._events[a];
                n = [];
                e = 0;
                for (l = f.length; e < l; e++) c = f[e], u = null, Epoch.isString(c) ? u = this[c] : Epoch.isFunction(c) && (u = c), null == u && Epoch.exception("Callback for event '" + a + "' is not a function or reference to a method."), n.push(u.apply(this, h));
                return n
            }
        };
        return c
    }();
    Epoch.Chart.Base = function (c) {
        function a(c) {
            this.options = c;
            a.__super__.constructor.call(this);
            this.setData(this.options.data || []);
            null != this.options.el && (this.el = jQuery(this.options.el));
            this.width = this.options.width;
            this.height = this.options.height;
            null != this.el ? (null == this.width && (this.width = jQuery(this.el).width()), null == this.height && (this.height = jQuery(this.el).height())) : (null == this.width && (this.width = h.dimensions.width), null == this.height && (this.height = h.dimensions.height))
        }
        var h;
        e(a, c);
        h = {
            width: 320,
            height: 240
        };
        a.prototype.isVisible = function () {
            return null == this.el ? !1 : this.el.is(":visible")
        };
        a.prototype.setData = function (a) {
            var c, h, d, e, f;
            c = 1;
            e = 0;
            for (f = a.length; e < f; e++) d = a[e], h = ["layer"], h.push("category" + c), d.category = c, null != d.label && h.push(Epoch.Util.dasherize(d.label)), d.className = h.join(" "), c++;
            return this.data = a
        };
        a.prototype.update = function (a, c) {
            null == c && (c = !0);
            this.setData(a);
            if (c) return this.draw()
        };
        a.prototype.draw = function () {};
        a.prototype.extent = function (a) {
            return [d3.min(this.data, function (c) {
                return d3.min(c.values, a)
            }), d3.max(this.data, function (c) {
                return d3.max(c.values, a)
            })]
        };
        return a
    }(Epoch.Events);
    Epoch.Chart.SVG = function (c) {
        function a(c) {
            this.options = null != c ? c : {};
            a.__super__.constructor.call(this, this.options);
            this.svg = null != this.el ? d3.select(this.el.get(0)).append("svg") : d3.select(document.createElement("svg"));
            this.svg.attr({
                xmlns: "http://www.w3.org/2000/svg",
                width: this.width,
                height: this.height
            })
        }
        e(a, c);
        return a
    }(Epoch.Chart.Base);
    Epoch.Chart.Canvas = function (c) {
        function a(c) {
            this.options = null != c ? c : {};
            a.__super__.constructor.call(this, this.options);
            this.canvas = jQuery("<canvas></canvas>");
            this.pixelRatio = null != this.options.pixelRatio ? this.options.pixelRatio : null != window.devicePixelRatio ? window.devicePixelRatio : 1;
            this.canvas.css({
                width: "" + this.width + "px",
                height: "" + this.height + "px"
            });
            this.canvas.attr("width", this.width * this.pixelRatio).attr("height", this.height * this.pixelRatio);
            null != this.el && this.el.append(this.canvas);
            this.ctx = this.canvas.get(0).getContext("2d")
        }
        e(a, c);
        a.prototype.getWidth = function () {
            return this.width * this.pixelRatio
        };
        a.prototype.getHeight = function () {
            return this.height * this.pixelRatio
        };
        a.prototype.clear = function () {
            return this.ctx.clearRect(0,
            0, this.getWidth(), this.getHeight())
        };
        a.prototype.getStyles = function (a) {
            return k.getStyles(a, this.el)
        };
        return a
    }(Epoch.Chart.Base);
    k = function () {
        function c() {}
        var a, h;
        a = 0;
        h = function () {
            return "epoch-container-" + a++
        };
        c.cache = {};
        c.styleList = ["fill", "stroke", "stroke-width"];
        c.container = null;
        c.purge = function () {
            return c.cache = {}
        };
        c.getContainer = function () {
            if (null != c.container) return c.container;
            jQuery("body").append('<div id="_canvas_css_reference"></div>');
            return c.container = jQuery("#_canvas_css_reference",
                "body")
        };
        c.hash = function (a, c) {
            var d;
            d = jQuery(c).data("epoch-container-id");
            null == d && (d = h(), jQuery(c).data("epoch-container-id", d));
            return "" + d + "__" + a
        };
        c.getStyles = function (a, h) {
            var d, e, l, f, n, q, p;
            e = c.hash(a, h);
            d = c.cache[e];
            if (null != d) return d;
            f = [];
            q = jQuery(h).parents();
            d = 0;
            for (n = q.length; d < n; d++) {
                l = q[d];
                if ("body" === l.tagName.toLowerCase()) break;
                f.unshift(l)
            }
            f.push(jQuery(h).get(0));
            d = [];
            q = 0;
            for (p = f.length; q < p; q++) l = f[q], n = l.tagName.toLowerCase(), null != l.id && 0 < l.id.length && (n += "#" + l.id), null != l.className && 0 < l.className.length && (n += "." + jQuery.trim(l.className).replace(/\s+/g, ".")), d.push(n);
            d.push("svg");
            q = jQuery.trim(a).split(/\s+/);
            f = 0;
            for (n = q.length; f < n; f++) l = q[f], d.push(l);
            for (f = n = put(d.shift()); d.length;) l = put(d.shift()), f.appendChild(l), f = l;
            c.getContainer().append(n);
            l = jQuery(a, n);
            f = {};
            p = c.styleList;
            n = 0;
            for (q = p.length; n < q; n++) d = p[n], f[d] = l.css(d);
            c.cache[e] = f;
            c.getContainer().html("");
            return f
        };
        return c
    }();
    Epoch.QueryCSS = k
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Chart.Plot = function (f) {
        function d(c) {
            var a, h, v, u;
            this.options = null != c ? c : {};
            c = Epoch.Util.copy(this.options.margins) || {};
            d.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, e));
            this.margins = {};
            u = ["top", "right", "bottom", "left"];
            h = 0;
            for (v = u.length; h < v; h++) a = u[h], this.margins[a] = this.options.margins[a], null != c[a] || this.hasAxis(a) || (this.margins[a] = 6);
            this.svg = this.svg.append("g").attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")")
        }
        var e;
        m(d, f);
        e = {
            margins: {
                top: 25,
                right: 50,
                bottom: 25,
                left: 50
            },
            axes: ["left", "bottom"],
            ticks: {
                top: 14,
                bottom: 14,
                left: 5,
                right: 5
            },
            tickFormats: {
                top: Epoch.Formats.regular,
                bottom: Epoch.Formats.regular,
                left: Epoch.Formats.si,
                right: Epoch.Formats.si
            }
        };
        d.prototype.setTickFormat = function (c, a) {
            return this.options.tickFormats[c] = a
        };
        d.prototype.hasAxis = function (c) {
            return -1 < this.options.axes.indexOf(c)
        };
        d.prototype.innerWidth = function () {
            return this.width - (this.margins.left + this.margins.right)
        };
        d.prototype.innerHeight = function () {
            return this.height - (this.margins.top + this.margins.bottom)
        };
        d.prototype.x = function () {
            return d3.scale.linear().domain(this.extent(function (c) {
                return c.x
            })).range([0, this.innerWidth()])
        };
        d.prototype.y = function () {
            return d3.scale.linear().domain(this.extent(function (c) {
                return c.y
            })).range([this.innerHeight(), 0])
        };
        d.prototype.bottomAxis = function () {
            return d3.svg.axis().scale(this.x()).orient("bottom").ticks(this.options.ticks.bottom).tickFormat(this.options.tickFormats.bottom)
        };
        d.prototype.topAxis = function () {
            return d3.svg.axis().scale(this.x()).orient("top").ticks(this.options.ticks.top).tickFormat(this.options.tickFormats.top)
        };
        d.prototype.leftAxis = function () {
            return d3.svg.axis().scale(this.y()).orient("left").ticks(this.options.ticks.left).tickFormat(this.options.tickFormats.left)
        };
        d.prototype.rightAxis = function () {
            return d3.svg.axis().scale(this.y()).orient("right").ticks(this.options.ticks.right).tickFormat(this.options.tickFormats.right)
        };
        d.prototype.draw = function () {
            d.__super__.draw.call(this);
            return this._axesDrawn ? this._redrawAxes() : this._drawAxes()
        };
        d.prototype._redrawAxes = function () {
            this.hasAxis("bottom") && this.svg.selectAll(".x.axis.bottom").transition().duration(500).ease("linear").call(this.bottomAxis());
            this.hasAxis("top") && this.svg.selectAll(".x.axis.top").transition().duration(500).ease("linear").call(this.topAxis());
            this.hasAxis("left") && this.svg.selectAll(".y.axis.left").transition().duration(500).ease("linear").call(this.leftAxis());
            if (this.hasAxis("right")) return this.svg.selectAll(".y.axis.right").transition().duration(500).ease("linear").call(this.rightAxis())
        };
        d.prototype._drawAxes = function () {
            this.hasAxis("bottom") && this.svg.append("g").attr("class", "x axis bottom").attr("transform", "translate(0, " + this.innerHeight() + ")").call(this.bottomAxis());
            this.hasAxis("top") && this.svg.append("g").attr("class", "x axis top").call(this.topAxis());
            this.hasAxis("left") && this.svg.append("g").attr("class", "y axis left").call(this.leftAxis());
            this.hasAxis("right") && this.svg.append("g").attr("class", "y axis right").attr("transform", "translate(" + this.innerWidth() + ", 0)").call(this.rightAxis());
            return this._axesDrawn = !0
        };
        return d
    }(Epoch.Chart.SVG)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Chart.Area = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype.y = function () {
            var c, a, h, d, u, e, f;
            c = [];
            e = this.data;
            d = 0;
            for (u = e.length; d < u; d++) for (a in h = e[d], f = h.values, f) h = f[a], null != c[a] && (c[a] += h.y), null == c[a] && (c[a] = h.y);
            return d3.scale.linear().domain([0,
            d3.max(c)]).range([this.height - this.margins.top - this.margins.bottom, 0])
        };
        e.prototype.draw = function () {
            var c, a, h, d;
            a = [this.x(), this.y()];
            h = a[0];
            d = a[1];
            c = d3.svg.area().x(function (a) {
                return h(a.x)
            }).y0(function (a) {
                return d(a.y0)
            }).y1(function (a) {
                return d(a.y0 + a.y)
            });
            d3.layout.stack().values(function (a) {
                return a.values
            })(this.data);
            this.svg.selectAll(".layer").remove();
            a = this.svg.selectAll(".layer").data(this.data, function (a) {
                return a.category
            });
            a.select(".area").attr("d", function (a) {
                return c(a.values)
            });
            a.enter().append("g").attr("class", function (a) {
                return a.className
            });
            a.append("path").attr("class", "area").attr("d", function (a) {
                return c(a.values)
            });
            return e.__super__.draw.call(this)
        };
        return e
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Chart.Bar = function (f) {
        function d(a) {
            this.options = null != a ? a : {};
            this.options = "vertical" === this.options.orientation ? Epoch.Util.defaults(this.options, c) : Epoch.Util.defaults(this.options, e);
            d.__super__.constructor.call(this, this.options)
        }
        var e, c;
        m(d, f);
        e = {
            style: "grouped",
            orientation: "horizontal"
        };
        c = {
            style: "grouped",
            orientation: "horizontal",
            tickFormats: {
                top: Epoch.Formats.si,
                bottom: Epoch.Formats.si,
                left: Epoch.Formats.regular,
                right: Epoch.Formats.regular
            }
        };
        d.prototype.x = function () {
            var a;
            if ("horizontal" === this.options.orientation) return d3.scale.ordinal().domain(Epoch.Util.domain(this.data)).rangeRoundBands([0, this.innerWidth()], 0.1);
            a = this.extent(function (a) {
                return a.y
            });
            a[0] = Math.min(0, a[0]);
            return d3.scale.linear().domain(a).range([0, this.width - this.margins.left - this.margins.right])
        };
        d.prototype.x1 = function (a) {
            var c;
            return d3.scale.ordinal().domain(function () {
                var a, d, e, f;
                e = this.data;
                f = [];
                a = 0;
                for (d = e.length; a < d; a++) c = e[a], f.push(c.category);
                return f
            }.call(this)).rangeRoundBands([0, a.rangeBand()], 0.08)
        };
        d.prototype.y = function () {
            var a;
            return "horizontal" === this.options.orientation ? (a = this.extent(function (a) {
                return a.y
            }), a[0] = Math.min(0, a[0]), d3.scale.linear().domain(a).range([this.height - this.margins.top - this.margins.bottom, 0])) : d3.scale.ordinal().domain(Epoch.Util.domain(this.data)).rangeRoundBands([0,
            this.innerHeight()], 0.1)
        };
        d.prototype.y1 = function (a) {
            var c;
            return d3.scale.ordinal().domain(function () {
                var a, d, e, f;
                e = this.data;
                f = [];
                a = 0;
                for (d = e.length; a < d; a++) c = e[a], f.push(c.category);
                return f
            }.call(this)).rangeRoundBands([0, a.rangeBand()], 0.08)
        };
        d.prototype._remapData = function () {
            var a, c, d, e, f, t, l, y, n, q, p, k;
            f = {};
            p = this.data;
            t = 0;
            for (y = p.length; t < y; t++) for (e = p[t], a = "bar " + e.className.replace(/\s*layer\s*/, ""), k = e.values, l = 0, n = k.length; l < n; l++) c = k[l], null == f[q = c.x] && (f[q] = []), f[c.x].push({
                label: e.category,
                y: c.y,
                className: a
            });
            c = [];
            for (d in f) a = f[d], c.push({
                group: d,
                values: a
            });
            return c
        };
        d.prototype.draw = function () {
            "horizontal" === this.options.orientation ? this._drawHorizontal() : this._drawVertical();
            return d.__super__.draw.call(this)
        };
        d.prototype._drawHorizontal = function () {
            var a, c, d, e, f, t;
            a = [this.x(), this.y()];
            e = a[0];
            t = a[1];
            f = this.x1(e);
            c = this.height - this.margins.top - this.margins.bottom;
            a = this._remapData();
            a = this.svg.selectAll(".layer").data(a, function (a) {
                return a.group
            });
            a.transition().duration(750).attr("transform",

            function (a) {
                return "translate(" + e(a.group) + ", 0)"
            });
            a.enter().append("g").attr("class", "layer").attr("transform", function (a) {
                return "translate(" + e(a.group) + ", 0)"
            });
            d = a.selectAll("rect").data(function (a) {
                return a.values
            });
            d.transition().duration(600).attr("x", function (a) {
                return f(a.label)
            }).attr("y", function (a) {
                return t(a.y)
            }).attr("width", f.rangeBand()).attr("height", function (a) {
                return c - t(a.y)
            });
            d.enter().append("rect").attr("class", function (a) {
                return a.className
            }).attr("x", function (a) {
                return f(a.label)
            }).attr("y",

            function (a) {
                return t(a.y)
            }).attr("width", f.rangeBand()).attr("height", function (a) {
                return c - t(a.y)
            });
            d.exit().transition().duration(150).style("opacity", "0").remove();
            return a.exit().transition().duration(750).style("opacity", "0").remove()
        };
        d.prototype._drawVertical = function () {
            var a, c, d, e, f;
            a = [this.x(), this.y()];
            d = a[0];
            e = a[1];
            f = this.y1(e);
            a = this._remapData();
            a = this.svg.selectAll(".layer").data(a, function (a) {
                return a.group
            });
            a.transition().duration(750).attr("transform", function (a) {
                return "translate(0, " + e(a.group) + ")"
            });
            a.enter().append("g").attr("class", "layer").attr("transform", function (a) {
                return "translate(0, " + e(a.group) + ")"
            });
            c = a.selectAll("rect").data(function (a) {
                return a.values
            });
            c.transition().duration(600).attr("x", function (a) {
                return 0
            }).attr("y", function (a) {
                return f(a.label)
            }).attr("height", f.rangeBand()).attr("width", function (a) {
                return d(a.y)
            });
            c.enter().append("rect").attr("class", function (a) {
                return a.className
            }).attr("x", function (a) {
                return 0
            }).attr("y", function (a) {
                return f(a.label)
            }).attr("height",
            f.rangeBand()).attr("width", function (a) {
                return d(a.y)
            });
            c.exit().transition().duration(150).style("opacity", "0").remove();
            return a.exit().transition().duration(750).style("opacity", "0").remove()
        };
        return d
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Chart.Line = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype.line = function () {
            var c, a, h;
            h = [this.x(), this.y()];
            c = h[0];
            a = h[1];
            return d3.svg.line().x(function (a) {
                return c(a.x)
            }).y(function (c) {
                return a(c.y)
            })
        };
        e.prototype.draw = function () {
            var c, a;
            a = [this.x(),
            this.y(), this.line()][2];
            c = this.svg.selectAll(".layer").data(this.data, function (a) {
                return a.category
            });
            c.select(".line").transition().duration(500).attr("d", function (c) {
                return a(c.values)
            });
            c.enter().append("g").attr("class", function (a) {
                return a.className
            }).append("path").attr("class", "line").attr("d", function (c) {
                return a(c.values)
            });
            c.exit().transition().duration(750).style("opacity", "0").remove();
            return e.__super__.draw.call(this)
        };
        return e
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Chart.Pie = function (f) {
        function d(c) {
            this.options = null != c ? c : {};
            d.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, e));
            c = Math.max(this.width, this.height) / 2;
            this.pie = d3.layout.pie().sort(null).value(function (a) {
                return a.value
            });
            this.arc = d3.svg.arc().outerRadius(c - this.options.margin).innerRadius(this.options.inner);
            this.svg = this.svg.append("g").attr("transform", "translate(" + this.width / 2 + ", " + this.height / 2 + ")")
        }
        var e;
        m(d, f);
        e = {
            margin: 10,
            inner: 0
        };
        d.prototype.draw = function () {
            var c, a = this;
            this.svg.selectAll(".arc").remove();
            c = this.svg.selectAll(".arc").data(this.pie(this.data), function (a) {
                return a.data.category
            });
            c.enter().append("g").attr("class", function (a) {
                return "arc pie " + a.data.className
            });
            c.select("path").attr("d", this.arc);
            c.select("text").attr("transform", function (c) {
                return "translate(" + a.arc.centroid(c) +
                    ")"
            }).text(function (a) {
                return a.data.label || a.data.category
            });
            c.append("path").attr("d", this.arc).each(function (a) {
                return this._current = a
            });
            return c.append("text").attr("transform", function (c) {
                return "translate(" + a.arc.centroid(c) + ")"
            }).attr("dy", ".35em").style("text-anchor", "middle").text(function (a) {
                return a.data.label || a.data.category
            })
        };
        return d
    }(Epoch.Chart.SVG)
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Chart.Scatter = function (f) {
        function d(c) {
            this.options = null != c ? c : {};
            d.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, e))
        }
        var e;
        m(d, f);
        e = {
            radius: 3.5,
            axes: ["top", "bottom", "left", "right"]
        };
        d.prototype.draw = function () {
            var c, a, h, e;
            d.__super__.draw.call(this);
            c = [this.x(),
            this.y()];
            h = c[0];
            e = c[1];
            a = this.svg.selectAll(".layer").data(this.data, function (a) {
                return a.category
            });
            a.enter().append("g").attr("class", function (a) {
                return a.className
            });
            c = a.selectAll(".dot").data(function (a) {
                return a.values
            });
            c.transition().duration(500).attr("cx", function (a) {
                return h(a.x)
            }).attr("cy", function (a) {
                return e(a.y)
            });
            c.enter().append("circle").attr("class", "dot").attr("r", this.options.radius).attr("cx", function (a) {
                return h(a.x)
            }).attr("cy", function (a) {
                return e(a.y)
            });
            c.exit().transition().duration(750).style("opacity",
            0).remove();
            return a.exit().transition().duration(750).style("opacity", 0).remove()
        };
        return d
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Time.Plot = function (d) {
        function e(a) {
            var h, d, f, s, t = this;
            this.options = a;
            a = Epoch.Util.copy(this.options.margins) || {};
            e.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, c));
            this._queueSize = this.options.queueSize;
            this._queue = [];
            this.margins = {};
            s = ["top", "right", "bottom",
                "left"];
            d = 0;
            for (f = s.length; d < f; d++) h = s[d], this.margins[h] = this.options.margins[h], null != a[h] || this.hasAxis(h) || (this.margins[h] = 6);
            this.svg = d3.select(this.el.get(0)).insert("svg", ":first-child").attr("width", this.width).attr("height", this.height).style("z-index", "1000");
            "absolute" !== this.el.css("position") && "relative" !== this.el.css("position") && this.el.css("position", "relative");
            this.canvas.attr("width", this.innerWidth());
            this.canvas.attr("height", this.innerHeight());
            this.canvas.css({
                position: "absolute",
                width: "" + this.innerWidth() / this.pixelRatio + "px",
                height: "" + this.innerHeight() / this.pixelRatio + "px",
                top: "" + this.margins.top + "px",
                left: "" + this.margins.left + "px",
                "z-index": "999"
            });
            this.animation = {
                interval: null,
                active: !1,
                delta: -(this.w() / this.options.fps),
                tickDelta: -(this.w() / this.pixelRatio / this.options.fps),
                frame: 0,
                duration: this.options.fps
            };
            this._prepareTimeAxes();
            this._prepareRangeAxes();
            this.animationCallback = function () {
                return t._animate()
            }
        }
        var c;
        f(e, d);
        c = {
            fps: 24,
            historySize: 120,
            windowSize: 40,
            queueSize: 10,
            margins: {
                top: 25,
                right: 50,
                bottom: 25,
                left: 50
            },
            axes: ["bottom"],
            ticks: {
                time: 15,
                left: 5,
                right: 5
            },
            tickFormats: {
                top: Epoch.Formats.seconds,
                bottom: Epoch.Formats.seconds,
                left: Epoch.Formats.si,
                right: Epoch.Formats.si
            }
        };
        e.prototype.setData = function (a) {
            var c, d, e, f, t;
            this.data = [];
            t = [];
            for (e in a) f = a[e], d = Epoch.Util.copy(f), c = Math.max(0, f.values.length - this.options.historySize), d.values = f.values.slice(c), c = ["layer"], c.push("category" + ((e | 0) + 1)), null != f.label && c.push(Epoch.Util.dasherize(f.label)), d.className = c.join(" "),
            t.push(this.data.push(d));
            return t
        };
        e.prototype._offsetX = function () {
            return 0
        };
        e.prototype._prepareTimeAxes = function () {
            var a, c, d, e, f;
            this.hasAxis("bottom") && (a = this.bottomAxis = this.svg.append("g").attr("class", "x axis bottom canvas").attr("transform", "translate(" + (this.margins.left - 1) + ", " + (this.innerHeight() / this.pixelRatio + this.margins.top) + ")"), a.append("path").attr("class", "domain").attr("d", "M0,0H" + (this.innerWidth() / this.pixelRatio + 1)));
            this.hasAxis("top") && (a = this.topAxis = this.svg.append("g").attr("class",
                "x axis top canvas").attr("transform", "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")"), a.append("path").attr("class", "domain").attr("d", "M0,0H" + (this.innerWidth() / this.pixelRatio + 1)));
            e = this.options.ticks.time;
            this._ticks = [];
            this._tickTimer = e;
            f = this.data;
            c = 0;
            for (d = f.length; c < d; c++) if (a = f[c], null != a.values && 0 < a.values.length) {
                d = [this.options.windowSize - 1, a.values.length - 1];
                c = d[0];
                for (d = d[1]; 0 <= c && 0 <= d;) this._pushTick(c, a.values[d].time, !1, !0), c -= e, d -= e;
                break
            }
            return []
        };
        e.prototype._prepareRangeAxes = function () {
            this.hasAxis("left") && this.svg.append("g").attr("class", "y axis left").attr("transform", "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")").call(this.leftAxis());
            if (this.hasAxis("right")) return this.svg.append("g").attr("class", "y axis right").attr("transform", "translate(" + (this.width - this.margins.right) + ", " + this.margins.top + ")").call(this.rightAxis())
        };
        e.prototype.leftAxis = function () {
            var a, c;
            c = this.options.ticks.left;
            a = d3.svg.axis().scale(this.ySvg()).orient("left").tickFormat(this.options.tickFormats.left);
            return 2 === c ? a.tickValues(this.extent(function (a) {
                return a.y
            })) : a.ticks(c)
        };
        e.prototype.rightAxis = function () {
            var a, c;
            this.extent(function (a) {
                return a.y
            });
            c = this.options.ticks.right;
            a = d3.svg.axis().scale(this.ySvg()).orient("right").tickFormat(this.options.tickFormats.left);
            return 2 === c ? a.tickValues(this.extent(function (a) {
                return a.y
            })) : a.ticks(c)
        };
        e.prototype.hasAxis = function (a) {
            return -1 < this.options.axes.indexOf(a)
        };
        e.prototype.innerWidth = function () {
            return (this.width - (this.margins.left + this.margins.right)) * this.pixelRatio
        };
        e.prototype.innerHeight = function () {
            return (this.height - (this.margins.top + this.margins.bottom)) * this.pixelRatio
        };
        e.prototype._prepareEntry = function (a) {
            return a
        };
        e.prototype._prepareLayers = function (a) {
            return a
        };
        e.prototype._startTransition = function () {
            if (!0 !== this.animation.active && 0 !== this._queue.length) return this.trigger("transition:start"), this._shift(), this.animation.active = !0, this.animation.interval = setInterval(this.animationCallback, 1E3 / this.options.fps)
        };
        e.prototype._stopTransition = function () {
            var a, c, d, e;
            if (this.inTransition()) {
                e = this.data;
                c = 0;
                for (d = e.length; c < d; c++) a = e[c], a.values.length > this.options.windowSize + 1 && a.values.shift();
                c = [this._ticks[0], this._ticks[this._ticks.length - 1]];
                a = c[0];
                c = c[1];
                null != c && c.enter && (c.enter = !1, c.opacity = 1);
                null != a && a.exit && this._shiftTick();
                this.animation.frame = 0;
                this.trigger("transition:end");
                if (0 < this._queue.length) return this._shift();
                this.animation.active = !1;
                return clearInterval(this.animation.interval)
            }
        };
        e.prototype.inTransition = function () {
            return this.animation.active
        };
        e.prototype.push = function (a) {
            var c = this;
            a = this._prepareLayers(a);
            this._queue.length > this._queueSize && this._queue.splice(this._queueSize, this._queue.length - this._queueSize);
            if (this._queue.length === this._queueSize) return !1;
            this._queue.push(a.map(function (a) {
                return c._prepareEntry(a)
            }));
            this.trigger("push");
            if (!this.inTransition()) return this._startTransition()
        };
        e.prototype._shift = function () {
            var a, c, d, e;
            this.trigger("before:shift");
            a = this._queue.shift();
            e = this.data;
            for (c in e) d = e[c], d.values.push(a[c]);
            this._updateTicks(a[0].time);
            this.hasAxis("left") && this.svg.selectAll(".y.axis.left").transition().duration(500).ease("linear").call(this.leftAxis());
            this.hasAxis("right") && this.svg.selectAll(".y.axis.right").transition().duration(500).ease("linear").call(this.rightAxis());
            return this.trigger("after:shift")
        };
        e.prototype._animate = function () {
            if (this.inTransition()) return ++this.animation.frame === this.animation.duration && this._stopTransition(), this.draw(this.animation.frame * this.animation.delta), this._updateTimeAxes()
        };
        e.prototype.y = function () {
            return d3.scale.linear().domain(this.extent(function (a) {
                return a.y
            })).range([this.innerHeight(), 0])
        };
        e.prototype.ySvg = function () {
            return d3.scale.linear().domain(this.extent(function (a) {
                return a.y
            })).range([this.innerHeight() / this.pixelRatio, 0])
        };
        e.prototype.w = function () {
            return this.innerWidth() / this.options.windowSize
        };
        e.prototype._updateTicks = function (a) {
            if (this.hasAxis("top") || this.hasAxis("bottom")) if (++this._tickTimer % this.options.ticks.time || this._pushTick(this.options.windowSize,
            a, !0), !(0 <= this._ticks[0].x - this.w() / this.pixelRatio)) return this._ticks[0].exit = !0
        };
        e.prototype._pushTick = function (a, c, d, e) {
            null == d && (d = !1);
            null == e && (e = !1);
            if (this.hasAxis("top") || this.hasAxis("bottom")) return c = {
                time: c,
                x: a * (this.w() / this.pixelRatio) + this._offsetX(),
                opacity: d ? 0 : 1,
                enter: d ? !0 : !1,
                exit: !1
            }, this.hasAxis("bottom") && (a = this.bottomAxis.append("g").attr("class", "tick major").attr("transform", "translate(" + (c.x + 1) + ",0)").style("opacity", c.opacity), a.append("line").attr("y2", 6), a.append("text").attr("text-anchor",
                "middle").attr("dy", 19).text(this.options.tickFormats.bottom(c.time)), c.bottomEl = jQuery(a[0])), this.hasAxis("top") && (a = this.topAxis.append("g").attr("class", "tick major").attr("transform", "translate(" + (c.x + 1) + ",0)").style("opacity", c.opacity), a.append("line").attr("y2", -6), a.append("text").attr("text-anchor", "middle").attr("dy", -10).text(this.options.tickFormats.top(c.time)), c.topEl = jQuery(a[0])), e ? this._ticks.unshift(c) : this._ticks.push(c), c
        };
        e.prototype._shiftTick = function () {
            var a;
            if (0 < this._ticks.length && (a = this._ticks.shift(), null != a.topEl && a.topEl.remove(), null != a.bottomEl)) return a.bottomEl.remove()
        };
        e.prototype._updateTimeAxes = function () {
            var a, c, d, e, f, t, l;
            if (this.hasAxis("top") || this.hasAxis("bottom")) {
                a = [this.animation.tickDelta, 1 / this.options.fps];
                c = a[0];
                a = a[1];
                t = this._ticks;
                l = [];
                e = 0;
                for (f = t.length; e < f; e++) d = t[e], d.x += c, this.hasAxis("bottom") && d.bottomEl.attr("transform", "translate(" + (d.x + 1) + ",0)"), this.hasAxis("top") && d.topEl.attr("transform", "translate(" + (d.x + 1) + ",0)"), d.enter ? d.opacity += a : d.exit && (d.opacity -= a), d.enter || d.exit ? (this.hasAxis("bottom") && d.bottomEl.css("opacity", d.opacity), this.hasAxis("top") ? l.push(d.topEl.css("opacity", d.opacity)) : l.push(void 0)) : l.push(void 0);
                return l
            }
        };
        e.prototype.draw = function (a) {};
        return e
    }(Epoch.Chart.Canvas);
    Epoch.Time.Stack = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype._prepareLayers = function (c) {
            var a, d, e, f;
            e = d = 0;
            for (f = c.length; e < f; e++) a = c[e], a.y0 = d, d += a.y;
            return c
        };
        e.prototype.setData = function (c) {
            var a, d, f, u, s;
            e.__super__.setData.call(this, c);
            s = [];
            a = c = 0;
            for (u = this.data[0].values.length; 0 <= u ? c < u : c > u; a = 0 <= u ? ++c : --c) f = 0, s.push(function () {
                var c, e, u, s;
                u = this.data;
                s = [];
                c = 0;
                for (e = u.length; c < e; c++) d = u[c], d.values[a].y0 = f, s.push(f += d.values[a].y);
                return s
            }.call(this));
            return s
        };
        e.prototype.extent = function () {
            var c, a, d, e, f, s, t, l;
            c = f = d = 0;
            for (t = this.data[0].values.length; 0 <= t ? f < t : f > t; c = 0 <= t ? ++f : --f) {
                a = s = e = 0;
                for (l = this.data.length; 0 <= l ? s < l : s > l; a = 0 <= l ? ++s : --s) e += this.data[a].values[c].y;
                e > d && (d = e)
            }
            return [0, d]
        };
        return e
    }(Epoch.Time.Plot)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Time.Area = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype.setStyles = function (c) {
            c = null != c.className ? this.getStyles("g." + c.className.replace(/\s/g, ".") + " path.area") : this.getStyles("g path.area");
            this.ctx.fillStyle = c.fill;
            null != c.stroke && (this.ctx.strokeStyle = c.stroke);
            if (null != c["stroke-width"]) return this.ctx.lineWidth = c["stroke-width"].replace("px", "")
        };
        e.prototype._drawAreas = function (c) {
            var a, d, e, f, s, t, l, k, n, q;
            null == c && (c = 0);
            t = [this.y(), this.w()];
            l = t[0];
            t = t[1];
            q = [];
            for (d = k = n = this.data.length - 1; 0 >= n ? 0 >= k : 0 <= k; d = 0 >= n ? ++k : --k) {
                f = this.data[d];
                this.setStyles(f);
                this.ctx.beginPath();
                s = [this.options.windowSize, f.values.length, this.inTransition()];
                d = s[0];
                e = s[1];
                for (s = s[2]; - 2 <= --d && 0 <= --e;) a = f.values[e], a = [(d + 1) * t + c, l(a.y + a.y0)], s && (a[0] += t), d === this.options.windowSize - 1 ? this.ctx.moveTo.apply(this.ctx, a) : this.ctx.lineTo.apply(this.ctx, a);
                d = s ? (d + 3) * t + c : (d + 2) * t + c;
                this.ctx.lineTo(d, this.innerHeight());
                this.ctx.lineTo(this.width * this.pixelRatio + t + c, this.innerHeight());
                this.ctx.closePath();
                q.push(this.ctx.fill())
            }
            return q
        };
        e.prototype._drawStrokes = function (c) {
            var a, d, e, f, s, t, l, k, n, q;
            null == c && (c = 0);
            d = [this.y(), this.w()];
            l = d[0];
            t = d[1];
            q = [];
            for (d = k = n = this.data.length - 1; 0 >= n ? 0 >= k : 0 <= k; d = 0 >= n ? ++k : --k) {
                f = this.data[d];
                this.setStyles(f);
                this.ctx.beginPath();
                s = [this.options.windowSize,
                f.values.length, this.inTransition()];
                d = s[0];
                e = s[1];
                for (s = s[2]; - 2 <= --d && 0 <= --e;) a = f.values[e], a = [(d + 1) * t + c, l(a.y + a.y0)], s && (a[0] += t), d === this.options.windowSize - 1 ? this.ctx.moveTo.apply(this.ctx, a) : this.ctx.lineTo.apply(this.ctx, a);
                q.push(this.ctx.stroke())
            }
            return q
        };
        e.prototype.draw = function (c) {
            null == c && (c = 0);
            if (this.isVisible()) return this.clear(), this._drawAreas(c), this._drawStrokes(c)
        };
        return e
    }(Epoch.Time.Stack)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Time.Bar = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype._offsetX = function () {
            return 0.5 * this.w() / this.pixelRatio
        };
        e.prototype.setStyles = function (c) {
            c = this.getStyles("rect.bar." + c.replace(/\s/g, "."));
            this.ctx.fillStyle = c.fill;
            this.ctx.strokeStyle = null == c.stroke || "none" === c.stroke ? "transparent" : c.stroke;
            if (null != c["stroke-width"]) return this.ctx.lineWidth = c["stroke-width"].replace("px", "")
        };
        e.prototype.draw = function (c) {
            var a, d, e, f, s, t, l, k, n, q, p, m, A, z, x, w, B;
            null == c && (c = 0);
            if (this.isVisible()) {
                this.clear();
                A = [this.y(), this.w()];
                m = A[0];
                p = A[1];
                x = this.data;
                B = [];
                A = 0;
                for (z = x.length; A < z; A++) n = x[A], 0 < n.values.length && (this.setStyles(n.className), w = [this.options.windowSize, n.values.length, this.inTransition()], t = w[0], k = w[1], l = (q = w[2]) ? -1 : 0, B.push(function () {
                    var w,
                    x;
                    for (x = []; --t >= l && 0 <= --k;) d = n.values[k], w = [t * p + c, d.y, d.y0], e = w[0], f = w[1], s = w[2], q && (e += p), a = [e + 1, m(f + s), p - 2, this.innerHeight() - m(f) + 0.5 * this.pixelRatio], this.ctx.fillRect.apply(this.ctx, a), x.push(this.ctx.strokeRect.apply(this.ctx, a));
                    return x
                }.call(this)));
                return B
            }
        };
        return e
    }(Epoch.Time.Stack)
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Time.Gauge = function (f) {
        function d(c) {
            var a = this;
            this.options = null != c ? c : {};
            d.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, e));
            this.value = this.options.value || 0;
            "absolute" !== this.el.css("position") && "relative" !== this.el.css("position") && this.el.css("position", "relative");
            this.svg = d3.select(this.el.get(0)).insert("svg", ":first-child").attr("width", this.width).attr("height", this.height).attr("class", "gauge-labels");
            jQuery(this.svg[0]).css({
                position: "absolute",
                "z-index": "1"
            });
            this.svg.append("g").attr("transform", "translate(" + this.textX() + ", " + this.textY() + ")").append("text").attr("class", "value").text(this.options.format(this.value));
            this.animation = {
                interval: null,
                active: !1,
                delta: 0,
                target: 0
            };
            this._animate = function () {
                Math.abs(a.animation.target - a.value) < Math.abs(a.animation.delta) ? (a.value = a.animation.target, clearInterval(a.animation.interval), a.animation.active = !1) : a.value += a.animation.delta;
                a.svg.select("text.value").text(a.options.format(a.value));
                return a.draw()
            }
        }
        var e;
        m(d, f);
        e = {
            domain: [0, 1],
            ticks: 10,
            tickSize: 5,
            tickOffset: 5,
            fps: 34,
            format: Epoch.Formats.percent
        };
        d.prototype.update = function (c) {
            this.animation.target = c;
            this.animation.delta = (c - this.value) / this.options.fps;
            if (!this.animation.active) return this.animation.interval = setInterval(this._animate, 1E3 / this.options.fps),
            this.animation.active = !0
        };
        d.prototype.push = function (c) {
            return this.update(c)
        };
        d.prototype.radius = function () {
            return this.getHeight() / 1.58
        };
        d.prototype.centerX = function () {
            return this.getWidth() / 2
        };
        d.prototype.centerY = function () {
            return 0.68 * this.getHeight()
        };
        d.prototype.textX = function () {
            return this.width / 2
        };
        d.prototype.textY = function () {
            return 0.48 * this.height
        };
        d.prototype.getAngle = function (c) {
            var a, d;
            d = this.options.domain;
            a = d[0];
            return (c - a) / (d[1] - a) * (Math.PI + 2 * Math.PI / 8) - Math.PI / 2 - Math.PI / 8
        };
        d.prototype.setStyles = function (c) {
            c = this.getStyles(c);
            this.ctx.fillStyle = c.fill;
            this.ctx.strokeStyle = c.stroke;
            if (null != c["stroke-width"]) return this.ctx.lineWidth = c["stroke-width"].replace("px", "")
        };
        d.prototype.draw = function () {
            var c, a, d, e, f, s, t, l, k, n, q, p;
            if (this.isVisible()) {
                f = [this.centerX(), this.centerY(), this.radius()];
                d = f[0];
                e = f[1];
                f = f[2];
                t = [this.options.tickOffset, this.options.tickSize];
                l = t[0];
                k = t[1];
                this.clear();
                t = d3.scale.linear().domain([0, this.options.ticks]).range([-1.125 * Math.PI, Math.PI / 8]);
                this.setStyles(".epoch .gauge .tick");
                this.ctx.beginPath();
                c = q = 0;
                for (p = this.options.ticks; 0 <= p ? q <= p : q >= p; c = 0 <= p ? ++q : --q) c = t(c), c = [Math.cos(c), Math.sin(c)], a = c[0], s = c[1], c = a * (f - l) + d, n = s * (f - l) + e, a = a * (f - l - k) + d, s = s * (f - l - k) + e, this.ctx.moveTo(c, n), this.ctx.lineTo(a, s);
                this.ctx.stroke();
                this.setStyles(".epoch .gauge .arc.outer");
                this.ctx.beginPath();
                this.ctx.arc(d, e, f, -1.125 * Math.PI, 0.125 * Math.PI, !1);
                this.ctx.stroke();
                this.setStyles(".epoch .gauge .arc.inner");
                this.ctx.beginPath();
                this.ctx.arc(d, e, f - 10, -1.125 * Math.PI, 0.125 * Math.PI, !1);
                this.ctx.stroke();
                return this.drawNeedle()
            }
        };
        d.prototype.drawNeedle = function () {
            var c, a, d;
            d = [this.centerX(), this.centerY(), this.radius()];
            c = d[0];
            a = d[1];
            d = d[2];
            this.setStyles(".epoch .gauge .needle");
            this.ctx.beginPath();
            this.ctx.save();
            this.ctx.translate(c, a);
            this.ctx.rotate(this.getAngle(this.value));
            this.ctx.moveTo(4 * this.pixelRatio, 0);
            this.ctx.lineTo(-4 * this.pixelRatio, 0);
            this.ctx.lineTo(-1 * this.pixelRatio, 19 - d);
            this.ctx.lineTo(1, 19 - d);
            this.ctx.fill();
            this.setStyles(".epoch .gauge .needle-base");
            this.ctx.beginPath();
            this.ctx.arc(0, 0, this.getWidth() / 25, 0, 2 * Math.PI);
            this.ctx.fill();
            return this.ctx.restore()
        };
        return d
    }(Epoch.Chart.Canvas)
}).call(this);
(function () {
    var k = {}.hasOwnProperty,
        m = function (f, d) {
            function e() {
                this.constructor = f
            }
            for (var c in d) k.call(d, c) && (f[c] = d[c]);
            e.prototype = d.prototype;
            f.prototype = new e;
            f.__super__ = d.prototype;
            return f
        };
    Epoch.Time.Heatmap = function (f) {
        function d(a) {
            this.options = a;
            d.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, c));
            Epoch.isString(this.options.opacity) ? (this._colorFn = e[this.options.opacity], null == this._colorFn && Epoch.exception("Unknown coloring function provided '" + this.options.opacity +
                "'")) : Epoch.isFunction(this.options.opacity) ? this._colorFn = this.options.opacity : Epoch.exception("Unknown type for provided coloring function.");
            this._setupPaintCanvas()
        }
        var e, c;
        m(d, f);
        c = {
            buckets: 10,
            bucketRange: [0, 100],
            opacity: "linear",
            bucketPadding: 2,
            paintZeroValues: !1
        };
        e = {
            root: function (a, c) {
                return Math.pow(a / c, 0.5)
            },
            linear: function (a, c) {
                return a / c
            },
            quadratic: function (a, c) {
                return Math.pow(a / c, 2)
            },
            cubic: function (a, c) {
                return Math.pow(a / c, 3)
            },
            quartic: function (a, c) {
                return Math.pow(a / c, 4)
            },
            quintic: function (a,
            c) {
                return Math.pow(a / c, 5)
            }
        };
        d.prototype.setData = function (a) {
            var c, e, f, s, k = this;
            d.__super__.setData.call(this, a);
            f = this.data;
            s = [];
            c = 0;
            for (e = f.length; c < e; c++) a = f[c], s.push(a.values = a.values.map(function (a) {
                return k._prepareEntry(a)
            }));
            return s
        };
        d.prototype._prepareEntry = function (a) {
            var c, d, e, f, k;
            f = a.time;
            k = [];
            c = 0;
            for (e = this.options.buckets; 0 <= e ? c < e : c > e; 0 <= e ? ++c : --c) k.push(0);
            f = {
                time: f,
                max: 0,
                buckets: k
            };
            c = (this.options.bucketRange[1] - this.options.bucketRange[0]) / this.options.buckets;
            k = a.histogram;
            for (d in k) a = k[d], e = parseInt(d / c), 0 > e ? e = 0 : e >= this.options.buckets && (e = this.options.buckets - 1), f.buckets[e] += a;
            d = a = 0;
            for (c = f.buckets.length; 0 <= c ? a < c : a > c; d = 0 <= c ? ++a : --a) f.max = Math.max(f.max, f.buckets[d]);
            return f
        };
        d.prototype.y = function () {
            return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight(), 0])
        };
        d.prototype.ySvg = function () {
            return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight() / this.pixelRatio, 0])
        };
        d.prototype.h = function () {
            return this.innerHeight() / this.options.buckets
        };
        d.prototype._offsetX = function () {
            return 0.5 * this.w() / this.pixelRatio
        };
        d.prototype._setupPaintCanvas = function () {
            this.paintWidth = (this.options.windowSize + 1) * this.w();
            this.paintHeight = this.height * this.pixelRatio;
            this.paint = jQuery("<canvas width='" + this.paintWidth + "' height='" + this.paintHeight + "'>").get(0);
            this.p = this.paint.getContext("2d");
            this.redraw();
            this.on("after:shift", "_paintEntry");
            return this.on("transition:end", "_shiftPaintCanvas")
        };
        d.prototype.redraw = function () {
            var a, c, d;
            c = this.data[0].values.length;
            a = this.options.windowSize;
            for (d = []; 0 <= --c && 0 <= --a;) d.push(this._paintEntry(c, a));
            return d
        };
        d.prototype._computeColor = function (a, c, d) {
            return Epoch.toRGBA(d, this._colorFn(a, c))
        };
        d.prototype._paintEntry = function (a, c) {
            var d, e, f, k, l, m, n, q, p, C, A, z, x, w;
            null == a && (a = null);
            null == c && (c = null);
            k = [this.w(), this.h()];
            A = k[0];
            m = k[1];
            null == a && (a = this.data[0].values.length - 1);
            null == c && (c = this.options.windowSize);
            k = [];
            var B;
            B = [];
            l = 0;
            for (C = this.options.buckets; 0 <= C ? l < C : l > C; 0 <= C ? ++l : --l) B.push(0);
            C = 0;
            p = this.data;
            e = 0;
            for (n = p.length; e < n; e++) {
                q = p[e];
                l = q.values[a];
                z = l.buckets;
                for (d in z) f = z[d], B[d] += f;
                C += l.max;
                f = this.getStyles("." + q.className.split(" ").join(".") + " rect.bucket");
                l.color = f.fill;
                k.push(l)
            }
            q = c * A;
            this.p.clearRect(q, 0, A, this.paintHeight);
            n = this.options.buckets;
            w = [];
            for (d in B) {
                f = B[d];
                e = this._avgLab(k, d);
                z = p = 0;
                for (x = k.length; z < x; z++) l = k[z], p += l.buckets[d] / f * C;
                if (0 < f || this.options.paintZeroValues) this.p.fillStyle = this._computeColor(f, p, e), this.p.fillRect(q, (n - 1) * m, A - this.options.bucketPadding, m - this.options.bucketPadding);
                w.push(n--)
            }
            return w
        };
        d.prototype._shiftPaintCanvas = function () {
            var a;
            a = this.p.getImageData(this.w(), 0, this.paintWidth - this.w(), this.paintHeight);
            return this.p.putImageData(a, 0, 0)
        };
        d.prototype._avgLab = function (a, c) {
            var d, e, f, k, l, m, n, q;
            n = [0, 0, 0, 0];
            l = n[0];
            d = n[1];
            e = n[2];
            n = n[3];
            m = 0;
            for (q = a.length; m < q; m++) f = a[m], null != f.buckets[c] && (n += f.buckets[c]);
            for (k in a) f = a[k], m = null != f.buckets[c] ? f.buckets[c] | 0 : 0, m /= n, f = d3.lab(f.color), l += m * f.l, d += m * f.a, e += m * f.b;
            return d3.lab(l, d, e).toString()
        };
        d.prototype.draw = function (a) {
            null == a && (a = 0);
            if (this.isVisible()) return this.clear(), this.ctx.drawImage(this.paint, a, 0)
        };
        return d
    }(Epoch.Time.Plot)
}).call(this);
(function () {
    var k, m = {}.hasOwnProperty,
        f = function (d, e) {
            function c() {
                this.constructor = d
            }
            for (var a in e) m.call(e, a) && (d[a] = e[a]);
            c.prototype = e.prototype;
            d.prototype = new c;
            d.__super__ = e.prototype;
            return d
        };
    Epoch.Time.Line = function (d) {
        function e() {
            return k = e.__super__.constructor.apply(this, arguments)
        }
        f(e, d);
        e.prototype.setStyles = function (c) {
            c = this.getStyles("g." + c.replace(/\s/g, ".") + " path.line");
            this.ctx.fillStyle = c.fill;
            this.ctx.strokeStyle = c.stroke;
            return this.ctx.lineWidth = this.pixelRatio * c["stroke-width"].replace("px",
                "")
        };
        e.prototype.y = function () {
            return d3.scale.linear().domain(this.extent(function (c) {
                return c.y
            })).range([this.innerHeight() - this.pixelRatio / 2, this.pixelRatio])
        };
        e.prototype.draw = function (c) {
            var a, d, e, f, k, m, l, y, n, q, p;
            null == c && (c = 0);
            this.clear();
            d = [this.y(), this.w()];
            l = d[0];
            m = d[1];
            q = this.data;
            p = [];
            y = 0;
            for (n = q.length; y < n; y++) if (f = q[y], 0 < f.values.length) {
                this.setStyles(f.className);
                this.ctx.beginPath();
                k = [this.options.windowSize, f.values.length, this.inTransition()];
                d = k[0];
                e = k[1];
                for (k = k[2]; - 2 <= --d && 0 <= --e;) a = f.values[e], a = [(d + 1) * m + c, l(a.y)], k && (a[0] += m), d === this.options.windowSize - 1 ? this.ctx.moveTo.apply(this.ctx, a) : this.ctx.lineTo.apply(this.ctx, a);
                p.push(this.ctx.stroke())
            }
            return p
        };
        return e
    }(Epoch.Time.Plot)
}).call(this);
(function () {
    Epoch._typeMap = {
        area: Epoch.Chart.Area,
        bar: Epoch.Chart.Bar,
        line: Epoch.Chart.Line,
        pie: Epoch.Chart.Pie,
        scatter: Epoch.Chart.Scatter,
        "time.area": Epoch.Time.Area,
        "time.bar": Epoch.Time.Bar,
        "time.line": Epoch.Time.Line,
        "time.gauge": Epoch.Time.Gauge,
        "time.heatmap": Epoch.Time.Heatmap
    }
}).call(this);
(function () {
    jQuery.fn.epoch = function (k) {
        var m;
        k.el = this;
        null == (m = this.data("epoch-chart")) && (m = Epoch._typeMap[k.type], null == m && Epoch.exception("Unknown chart type '" + k.type + "'"), this.data("epoch-chart", m = new m(k)), m.draw());
        return m
    }
}).call(this);
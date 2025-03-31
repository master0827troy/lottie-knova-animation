function CallCommand(t, n, i, s) {
    this.com = t,
    this.o = n,
    this.fn = i,
    this.p = s,
    this.p.push(this),
    this.construct()
}
function SleepCommand(t, n) {
    this.com = t,
    this.i = n,
    this.construct()
}
function PlayCommand(t, n, i, s, o) {
    this.com = t,
    this.o = n,
    this.fn = i,
    this.p = s,
    this.i = o,
    this.construct()
}
function AsyncCommand(t, n, i, s, o) {
    this.com = t,
    this.o = n,
    this.fn = i,
    this.p = s,
    this.p.push(this),
    this.e = o
}
function CallbackCommand(t, n, i, s) {
    this.com = t,
    this.o = n,
    this.fn = i,
    this.p = s,
    this.construct()
}
function Command() {
    this.index = 0,
    this.commands = [],
    this.cb = null,
    this.construct()
}
function getAsyncCommand(t) {
    return Array.prototype.slice.call(t, 0).pop()
}
function preventDefault(t) {
    t.preventDefault()
}
CallCommand.prototype = {
    construct: function() {},
    execute: function() {
        try {
            this.fn.apply(this.o, this.p),
            this.com.next.apply(this.com, [])
        } catch (t) {
            throw t
        }
    }
},
SleepCommand.prototype = {
    construct: function() {},
    execute: function() {
        var t = this.com
          , n = this.i;
        setTimeout(function() {
            t.next.apply(t, [])
        }, n)
    }
},
PlayCommand.prototype = {
    construct: function() {},
    execute: function() {
        var t = this.com
          , n = this.i;
        this.fn.apply(this.o, this.p),
        setTimeout(function() {
            t.next.apply(t, [])
        }, n)
    }
},
AsyncCommand.prototype = {
    execute: function() {
        this.fn.apply(this.o, this.p)
    },
    publish: function() {
        this.com.next.apply(this.com, [])
    },
    subscribe: function(t, n) {}
},
CallbackCommand.prototype = {
    construct: function() {},
    execute: function() {
        this.fn && this.fn.apply(this.o, this.p)
    }
},
Command.prototype = {
    construct: function() {},
    call: function(t, n, i) {
        this.commands.push(new CallCommand(this,t,n,i))
    },
    sleep: function(t, n) {
        this.commands.push(new SleepCommand(this,t,n))
    },
    play: function(t, n, i, s) {
        this.commands.push(new PlayCommand(this,t,n,i,s))
    },
    async: function(t, n, i, s) {
        this.commands.push(new AsyncCommand(this,t,n,i,s))
    },
    callback: function(t, n, i) {
        this.cb = new CallbackCommand(this,t,n,i)
    },
    execute: function() {
        try {
            var t = this.commands[this.index];
            t ? t.execute() : this.next()
        } catch (t) {
            throw t
        }
    },
    next: function() {
        this.index++,
        ~~this.index >= ~~this.commands.length ? null !== this.cb && this.cb.execute() : this.commands[this.index].execute()
    },
    cancel: function() {
        this.index = this.commands.length
    },
    destroy: function() {
        this.index = this.commands.length,
        this.cb = null,
        this.next()
    }
};
/*!
 * GSAP 3.11.3
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
( (t, e) => {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}
)(this, function(t) {
    function r(t, e) {
        t.prototype = Object.create(e.prototype),
        (t.prototype.constructor = t).__proto__ = e
    }
    function z(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function U(t) {
        return "string" == typeof t
    }
    function f(t) {
        return "function" == typeof t
    }
    function $(t) {
        return "number" == typeof t
    }
    function s(t) {
        return void 0 === t
    }
    function C(t) {
        return "object" == typeof t
    }
    function F(t) {
        return !1 !== t
    }
    function i() {
        return "undefined" != typeof window
    }
    function J(t) {
        return f(t) || U(t)
    }
    function d(t) {
        return (Zt = Nt(t, a)) && l
    }
    function K(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    }
    function tt(t, e) {
        return !e && console.warn(t)
    }
    function m(t, e) {
        return t && (a[t] = e) && Zt && (Zt[t] = e) || a
    }
    function g() {
        return 0
    }
    function et(t) {
        var e, r, i = t[0];
        if (C(i) || f(i) || (t = [t]),
        !(e = (i._gsap || {}).harness)) {
            for (r = Ie.length; r-- && !Ie[r].targetTest(i); )
                ;
            e = Ie[r]
        }
        for (r = t.length; r--; )
            t[r] && (t[r]._gsap || (t[r]._gsap = new Je(t[r],e))) || t.splice(r, 1);
        return t
    }
    function rt(t) {
        return t._gsap || et(S(t))[0]._gsap
    }
    function v(t, e, r) {
        return (r = t[e]) && f(r) ? t[e]() : s(r) && t.getAttribute && t.getAttribute(e) || r
    }
    function p(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }
    function B(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }
    function A(t) {
        return Math.round(1e7 * t) / 1e7 || 0
    }
    function it(t, e) {
        var r = e.charAt(0)
          , e = parseFloat(e.substr(2));
        return t = parseFloat(t),
        "+" === r ? t + e : "-" === r ? t - e : "*" === r ? t * e : t / e
    }
    function nt() {
        var t, e, r = ze.length, i = ze.slice(0);
        for (Fe = {},
        t = ze.length = 0; t < r; t++)
            (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }
    function y(t, e, r, i) {
        ze.length && nt(),
        t.render(e, r, i || I && e < 0 && (t._initted || t._startAt)),
        ze.length && nt()
    }
    function x(t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(Ae).length < 2 ? e : U(t) ? t.trim() : t
    }
    function w(t) {
        return t
    }
    function L(t, e) {
        for (var r in e)
            r in t || (t[r] = e[r]);
        return t
    }
    function b(t, e) {
        for (var r in e)
            "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = C(e[r]) ? b(t[r] || (t[r] = {}), e[r]) : e[r]);
        return t
    }
    function st(t, e) {
        var r, i = {};
        for (r in t)
            r in e || (i[r] = t[r]);
        return i
    }
    function at(t) {
        var i, e = t.parent || Y, r = t.keyframes ? (i = P(t.keyframes),
        function(t, e) {
            for (var r in e)
                r in t || "duration" === r && i || "ease" === r || (t[r] = e[r])
        }
        ) : L;
        if (F(t.inherit))
            for (; e; )
                r(t, e.vars.defaults),
                e = e.parent || e._dp;
        return t
    }
    function M(t, e, r, i, n) {
        void 0 === r && (r = "_first");
        var s, a = t[i = void 0 === i ? "_last" : i];
        if (n)
            for (s = e[n]; a && a[n] > s; )
                a = a._prev;
        a ? (e._next = a._next,
        a._next = e) : (e._next = t[r],
        t[r] = e),
        e._next ? e._next._prev = e : t[i] = e,
        e._prev = a,
        e.parent = e._dp = t
    }
    function O(t, e, r, i) {
        void 0 === r && (r = "_first"),
        void 0 === i && (i = "_last");
        var n = e._prev
          , s = e._next;
        n ? n._next = s : t[r] === e && (t[r] = s),
        s ? s._prev = n : t[i] === e && (t[i] = n),
        e._next = e._prev = e.parent = null
    }
    function ot(t, e) {
        !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t),
        t._act = 0
    }
    function k(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r; )
                r._dirty = 1,
                r = r.parent;
        return t
    }
    function ut(t, e, r, i) {
        t._startAt && (I ? t._startAt.revert(Se) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i))
    }
    function ht(t) {
        return t._repeat ? qt(t._tTime, t = t.duration() + t._rDelay) * t : 0
    }
    function lt(t, e) {
        return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    }
    function ft(t) {
        t._end = A(t._start + (t._tDur / Math.abs(t._ts || t._rts || V) || 0))
    }
    function ct(t, e) {
        var r = t._dp;
        r && r.smoothChildTiming && t._ts && (t._start = A(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)),
        ft(t),
        r._dirty || k(r, t))
    }
    function pt(t, e) {
        var r;
        if ((e._time || e._initted && !e._dur) && (r = lt(t.rawTime(), e),
        !e._dur || jt(0, e.totalDuration(), r) - e._tTime > V) && e.render(r, !0),
        k(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (r = t; r._dp; )
                    0 <= r.rawTime() && r.totalTime(r._tTime),
                    r = r._dp;
            t._zTime = -V
        }
    }
    function D(t, e, r, i) {
        return e.parent && ot(e),
        e._start = A(($(r) ? r : r || t !== Y ? h(t, r, e) : t._time) + e._delay),
        e._end = A(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)),
        M(t, e, "_first", "_last", t._sort ? "_start" : 0),
        Vt(e) || (t._recent = e),
        i || pt(t, e),
        t._ts < 0 && ct(t, t._tTime),
        t
    }
    function _t(t, e) {
        (a.ScrollTrigger || K("scrollTrigger", e)) && a.ScrollTrigger.create(e, t)
    }
    function dt(t, e, r, i, n) {
        return nr(t, e, n),
        !t._initted || !r && t._pt && !I && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && Jt !== _.frame && (ze.push(t),
        t._lazy = [n, i])
    }
    function mt(t, e, r, i) {
        var n = t._repeat
          , e = A(e) || 0
          , s = t._tTime / t._tDur;
        return s && !i && (t._time *= e / t._dur),
        t._dur = e,
        t._tDur = n ? n < 0 ? 1e10 : A(e * (n + 1) + t._rDelay * n) : e,
        0 < s && !i && ct(t, t._tTime = t._tDur * s),
        t.parent && ft(t),
        r || k(t.parent, t),
        t
    }
    function gt(t) {
        return t instanceof R ? k(t) : mt(t, t._dur)
    }
    function vt(t, e, r) {
        var i, n, s = $(e[1]), a = (s ? 2 : 1) + (t < 2 ? 0 : 1), o = e[a];
        if (s && (o.duration = e[1]),
        o.parent = r,
        t) {
            for (i = o,
            n = r; n && !("immediateRender"in i); )
                i = n.vars.defaults || {},
                n = F(n.vars.inherit) && n.parent;
            o.immediateRender = F(i.immediateRender),
            t < 2 ? o.runBackwards = 1 : o.startAt = e[a - 1]
        }
        return new Q(e[0],o,e[1 + a])
    }
    function yt(t, e) {
        return t || 0 === t ? e(t) : e
    }
    function X(t, e) {
        return U(t) && (e = De.exec(t)) ? e[1] : ""
    }
    function xt(t, e) {
        return t && C(t) && "length"in t && (!e && !t.length || t.length - 1 in t && C(t[0])) && !t.nodeType && t !== u
    }
    function Tt(r) {
        return r = S(r)[0] || tt("Invalid scope") || {},
        function(t) {
            var e = r.current || r.nativeElement || r;
            return S(t, e.querySelectorAll ? e : e === r ? tt("Invalid scope") || Ht.createElement("div") : r)
        }
    }
    function wt(t) {
        return t.sort(function() {
            return .5 - Math.random()
        })
    }
    function bt(t) {
        var p, _, d, m, g, v, y, x, T;
        return f(t) ? t : (_ = He((p = C(t) ? t : {
            each: t
        }).ease),
        d = p.from || 0,
        m = parseFloat(p.base) || 0,
        g = {},
        t = 0 < d && d < 1,
        v = isNaN(d) || t,
        y = p.axis,
        U(T = x = d) ? x = T = {
            center: .5,
            edges: .5,
            end: 1
        }[d] || 0 : !t && v && (x = d[0],
        T = d[1]),
        function(t, e, r) {
            var i, n, s, a, o, u, h, l, f = (r || p).length, c = g[f];
            if (!c) {
                if (!(l = "auto" === p.grid ? 0 : (p.grid || [1, q])[1])) {
                    for (u = -q; u < (u = r[l++].getBoundingClientRect().left) && l < f; )
                        ;
                    l--
                }
                for (c = g[f] = [],
                i = v ? Math.min(l, f) * x - .5 : d % l,
                n = l === q ? 0 : v ? f * T / l - .5 : d / l | 0,
                h = q,
                o = u = 0; o < f; o++)
                    a = o % l - i,
                    s = n - (o / l | 0),
                    c[o] = a = y ? Math.abs("y" === y ? s : a) : ye(a * a + s * s),
                    u < a && (u = a),
                    a < h && (h = a);
                "random" === d && wt(c),
                c.max = u - h,
                c.min = h,
                c.v = f = (parseFloat(p.amount) || parseFloat(p.each) * (f < l ? f - 1 : y ? "y" === y ? f / l : l : Math.max(l, f / l)) || 0) * ("edges" === d ? -1 : 1),
                c.b = f < 0 ? m - f : m,
                c.u = X(p.amount || p.each) || 0,
                _ = _ && f < 0 ? We(_) : _
            }
            return f = (c[t] - c.min) / c.max || 0,
            A(c.b + (_ ? _(f) : f) * c.v) + c.u
        }
        )
    }
    function Mt(r) {
        var i = Math.pow(10, ((r + "").split(".")[1] || "").length);
        return function(t) {
            var e = A(Math.round(parseFloat(t) / r) * r * i);
            return (e - e % 1) / i + ($(t) ? 0 : X(t))
        }
    }
    function Ot(u, t) {
        var h, l, e = P(u);
        return !e && C(u) && (h = e = u.radius || q,
        u.values ? (u = S(u.values),
        (l = !$(u[0])) && (h *= h)) : u = Mt(u.increment)),
        yt(t, e ? f(u) ? function(t) {
            return l = u(t),
            Math.abs(l - t) <= h ? l : t
        }
        : function(t) {
            for (var e, r, i = parseFloat(l ? t.x : t), n = parseFloat(l ? t.y : 0), s = q, a = 0, o = u.length; o--; )
                (e = l ? (e = u[o].x - i) * e + (r = u[o].y - n) * r : Math.abs(u[o] - i)) < s && (s = e,
                a = o);
            return a = !h || s <= h ? u[a] : t,
            l || a === t || $(t) ? a : a + X(t)
        }
        : Mt(u))
    }
    function kt(t, e, r, i) {
        return yt(P(t) ? !e : !0 === r ? !!(r = 0) : !i, function() {
            return P(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i
        })
    }
    function Ct(e, r, t) {
        return yt(t, function(t) {
            return e[~~r(t)]
        })
    }
    function At(t) {
        for (var e, r, i, n, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
            i = t.indexOf(")", e),
            n = "[" === t.charAt(e + 7),
            r = t.substr(e + 7, i - e - 7).match(n ? Ae : be),
            a += t.substr(s, e - s) + kt(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5),
            s = i + 1;
        return a + t.substr(s, t.length - s)
    }
    function Dt(t, e, r) {
        var i, n, s, a = t.labels, o = q;
        for (i in a)
            (n = a[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (s = i,
            o = n);
        return s
    }
    function Pt(t) {
        return ot(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!I),
        t.progress() < 1 && T(t, "onInterrupt"),
        t
    }
    function St(t, e, r) {
        return (6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * c + .5 | 0
    }
    function Et(t, e, r) {
        var i, n, s, a, o, u, h, l = t ? $(t) ? [t >> 16, t >> 8 & c, t & c] : 0 : Ne.black;
        if (!l) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)),
            Ne[t])
                l = Ne[t];
            else if ("#" === t.charAt(0)) {
                if (9 === (t = t.length < 6 ? "#" + (i = t.charAt(1)) + i + (n = t.charAt(2)) + n + (s = t.charAt(3)) + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "") : t).length)
                    return [(l = parseInt(t.substr(1, 6), 16)) >> 16, l >> 8 & c, l & c, parseInt(t.substr(7), 16) / 255];
                l = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & c, t & c]
            } else if ("hsl" === t.substr(0, 3))
                if (l = h = t.match(be),
                e) {
                    if (~t.indexOf("="))
                        return l = t.match(Me),
                        r && l.length < 4 && (l[3] = 1),
                        l
                } else
                    a = +l[0] % 360 / 360,
                    o = l[1] / 100,
                    i = 2 * (u = l[2] / 100) - (n = u <= .5 ? u * (o + 1) : u + o - u * o),
                    3 < l.length && (l[3] *= 1),
                    l[0] = St(a + 1 / 3, i, n),
                    l[1] = St(a, i, n),
                    l[2] = St(a - 1 / 3, i, n);
            else
                l = t.match(be) || Ne.transparent;
            l = l.map(Number)
        }
        return e && !h && (i = l[0] / c,
        n = l[1] / c,
        s = l[2] / c,
        u = ((t = Math.max(i, n, s)) + (e = Math.min(i, n, s))) / 2,
        t === e ? a = o = 0 : (h = t - e,
        o = .5 < u ? h / (2 - t - e) : h / (t + e),
        a = t === i ? (n - s) / h + (n < s ? 6 : 0) : t === n ? (s - i) / h + 2 : (i - n) / h + 4,
        a *= 60),
        l[0] = ~~(a + .5),
        l[1] = ~~(100 * o + .5),
        l[2] = ~~(100 * u + .5)),
        r && l.length < 4 && (l[3] = 1),
        l
    }
    function Rt(t) {
        var e = []
          , r = []
          , i = -1;
        return t.split(qe).forEach(function(t) {
            t = t.match(Oe) || [];
            e.push.apply(e, t),
            r.push(i += t.length + 1)
        }),
        e.c = r,
        e
    }
    function zt(t, e, r) {
        var i, n, s, a, o = "", u = (t + o).match(qe), h = e ? "hsla(" : "rgba(", l = 0;
        if (!u)
            return t;
        if (u = u.map(function(t) {
            return (t = Et(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
        }),
        r && (s = Rt(t),
        (i = r.c).join(o) !== s.c.join(o)))
            for (a = (n = t.replace(qe, "1").split(Oe)).length - 1; l < a; l++)
                o += n[l] + (~i.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (s.length ? s : u.length ? u : r).shift());
        if (!n)
            for (a = (n = t.split(qe)).length - 1; l < a; l++)
                o += n[l] + u[l];
        return o + n[a]
    }
    function Ft(t) {
        var e = t.join(" ");
        if (qe.lastIndex = 0,
        qe.test(e))
            return e = Ve.test(e),
            t[1] = zt(t[1], e),
            t[0] = zt(t[0], e, Rt(t[1])),
            !0
    }
    function Bt(t) {
        var e, r, i, n = (t + "").split("("), s = E[n[0]];
        return s && 1 < n.length && s.config ? s.config.apply(null, ~t.indexOf("{") ? [(t => {
            for (var e, r, i, n = {}, s = t.substr(1, t.length - 3).split(":"), a = s[0], o = 1, u = s.length; o < u; o++)
                r = s[o],
                e = o !== u - 1 ? r.lastIndexOf(",") : r.length,
                i = r.substr(0, e),
                n[a] = isNaN(i) ? i.replace(Ge, "").trim() : +i,
                a = r.substr(e + 1).trim();
            return n
        }
        )(n[1])] : (e = (n = t).indexOf("(") + 1,
        r = n.indexOf(")"),
        i = n.indexOf("(", e),
        n.substring(e, ~i && i < r ? n.indexOf(")", r + 1) : r).split(",").map(x))) : E._CE && Qe.test(t) ? E._CE("", t) : s
    }
    function Lt(t, e) {
        for (var r, i = t._first; i; )
            i instanceof R ? Lt(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? Lt(i.timeline, e) : (r = i._ease,
            i._ease = i._yEase,
            i._yEase = r,
            i._yoyo = e)),
            i = i._next
    }
    function It(t, e, r, i) {
        var n, s = {
            easeIn: e,
            easeOut: r = void 0 === r ? function(t) {
                return 1 - e(1 - t)
            }
            : r,
            easeInOut: i = void 0 === i ? function(t) {
                return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
            }
            : i
        };
        p(t, function(t) {
            for (var e in E[t] = a[t] = s,
            E[n = t.toLowerCase()] = r,
            s)
                E[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = E[t + "." + e] = s[e]
        })
    }
    function Yt(e) {
        return function(t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
        }
    }
    function Ut(r, t, e) {
        function i(t) {
            return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Te((t - s) * a) + 1
        }
        var n = 1 <= t ? t : 1
          , s = (a = (e || (r ? .3 : .45)) / (t < 1 ? t : 1)) / me * (Math.asin(1 / n) || 0)
          , e = "out" === r ? i : "in" === r ? function(t) {
            return 1 - i(1 - t)
        }
        : Yt(i)
          , a = me / a;
        return e.config = function(t, e) {
            return Ut(r, t, e)
        }
        ,
        e
    }
    function Xt(e, r) {
        function i(t) {
            return t ? --t * t * ((r + 1) * t + r) + 1 : 0
        }
        void 0 === r && (r = 1.70158);
        var t = "out" === e ? i : "in" === e ? function(t) {
            return 1 - i(1 - t)
        }
        : Yt(i);
        return t.config = function(t) {
            return Xt(e, t)
        }
        ,
        t
    }
    function Nt(t, e) {
        for (var r in e)
            t[r] = e[r];
        return t
    }
    function qt(t, e) {
        return e = Math.floor(t /= e),
        t && e === t ? e - 1 : e
    }
    function Vt(t) {
        return "isFromStart" === (t = t.data) || "isStart" === t
    }
    function h(t, e, r) {
        var i, n, s, a = t.labels, o = t._recent || Ue, u = t.duration() >= q ? o.endTime(!1) : t._dur;
        return U(e) && (isNaN(e) || e in a) ? (n = e.charAt(0),
        s = "%" === e.substr(-1),
        i = e.indexOf("="),
        "<" === n || ">" === n ? (0 <= i && (e = e.replace(/=/, "")),
        ("<" === n ? o._start : o.endTime(0 <= o._repeat)) + (parseFloat(e.substr(1)) || 0) * (s ? (i < 0 ? o : r).totalDuration() / 100 : 1)) : i < 0 ? (e in a || (a[e] = u),
        a[e]) : (n = parseFloat(e.charAt(i - 1) + e.substr(i + 1)),
        s && r && (n = n / 100 * (P(r) ? r[0] : r).totalDuration()),
        1 < i ? h(t, e.substr(0, i - 1), r) + n : u + n)) : null == e ? u : +e
    }
    function jt(t, e, r) {
        return r < t ? t : e < r ? e : r
    }
    function Qt(e, t, r, i, n) {
        var s = t - e
          , a = i - r;
        return yt(n, function(t) {
            return r + ((t - e) / s * a || 0)
        })
    }
    function T(t, e, r) {
        var i = t.vars
          , n = i[e]
          , s = o
          , a = t._ctx;
        if (n)
            e = i[e + "Params"],
            i = i.callbackScope || t,
            r && ze.length && nt(),
            a && (o = a),
            t = e ? n.apply(i, e) : n.call(i),
            o = s
    }
    var Gt, I, o, Y, u, Wt, Ht, Zt, $t, Jt, Kt, te, ee, re, ie, ne, se, ae, oe, ue, he, le, fe, ce, pe, _e, N = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    }, de = {
        duration: .5,
        overwrite: !1,
        delay: 0
    }, q = 1e8, V = 1 / q, me = 2 * Math.PI, ge = me / 4, ve = 0, ye = Math.sqrt, xe = Math.cos, Te = Math.sin, we = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}
    , P = Array.isArray, be = /(?:-?\.?\d|\.)+/gi, Me = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Oe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ke = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ce = /[+-]=-?[.\d]+/, Ae = /[^,'"\[\]\s]+/gi, De = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, a = {}, Pe = {
        suppressEvents: !0,
        isStart: !0,
        kill: !1
    }, Se = {
        suppressEvents: !0,
        kill: !1
    }, Ee = {
        suppressEvents: !0
    }, Re = {}, ze = [], Fe = {}, j = {}, Be = {}, Le = 30, Ie = [], Ye = "", Ue = {
        _start: 0,
        endTime: g,
        totalDuration: g
    }, Xe = [].slice, S = function(t, e, r) {
        return o && !e && o.selector ? o.selector(t) : !U(t) || r || !Wt && je() ? P(t) ? (i = r,
        void 0 === n && (n = []),
        t.forEach(function(t) {
            return U(t) && !i || xt(t, 1) ? n.push.apply(n, S(t)) : n.push(t)
        }) || n) : xt(t) ? Xe.call(t, 0) : t ? [t] : [] : Xe.call((e || Ht).querySelectorAll(t), 0);
        var i, n
    }, c = 255, Ne = {
        aqua: [0, c, c],
        lime: [0, c, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, c],
        navy: [0, 0, 128],
        white: [c, c, c],
        olive: [128, 128, 0],
        yellow: [c, c, 0],
        orange: [c, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [c, 0, 0],
        pink: [c, 192, 203],
        cyan: [0, c, c],
        transparent: [c, c, c, 0]
    }, qe = ( () => {
        var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (t in Ne)
            e += "|" + t + "\\b";
        return new RegExp(e + ")","gi")
    }
    )(), Ve = /hsl[a]?\(/, _ = (ae = Date.now,
    oe = 500,
    ue = 33,
    he = ae(),
    le = he,
    ce = fe = 1e3 / 240,
    ie = {
        time: 0,
        frame: 0,
        tick: function() {
            Ze(!0)
        },
        deltaRatio: function(t) {
            return ne / (1e3 / (t || 60))
        },
        wake: function() {
            $t && (!Wt && i() && (u = Wt = window,
            Ht = u.document || {},
            a.gsap = l,
            (u.gsapVersions || (u.gsapVersions = [])).push(l.version),
            d(Zt || u.GreenSockGlobals || !u.gsap && u || {}),
            re = u.requestAnimationFrame),
            te && ie.sleep(),
            ee = re || function(t) {
                return setTimeout(t, ce - 1e3 * ie.time + 1 | 0)
            }
            ,
            Kt = 1,
            Ze(2))
        },
        sleep: function() {
            (re ? u.cancelAnimationFrame : clearTimeout)(te),
            Kt = 0,
            ee = g
        },
        lagSmoothing: function(t, e) {
            oe = t || 1e8,
            ue = Math.min(e, oe, 0)
        },
        fps: function(t) {
            fe = 1e3 / (t || 240),
            ce = 1e3 * ie.time + fe
        },
        add: function(n, t, e) {
            var s = t ? function(t, e, r, i) {
                n(t, e, r, i),
                ie.remove(s)
            }
            : n;
            return ie.remove(n),
            pe[e ? "unshift" : "push"](s),
            je(),
            s
        },
        remove: function(t, e) {
            ~(e = pe.indexOf(t)) && pe.splice(e, 1) && e <= se && se--
        },
        _listeners: pe = []
    }), je = function() {
        return !Kt && _.wake()
    }, E = {}, Qe = /^[\d.\-M][\d.\-,\s]/, Ge = /["']/g, We = function(e) {
        return function(t) {
            return 1 - e(1 - t)
        }
    }, He = function(t, e) {
        return t && (f(t) ? t : E[t] || Bt(t)) || e
    };
    function Ze(t) {
        var e, r, i, n = ae() - le, s = !0 === t;
        if (oe < n && (he += n - ue),
        (0 < (n = (r = (le += n) - he) - ce) || s) && (i = ++ie.frame,
        ne = r - 1e3 * ie.time,
        ie.time = r /= 1e3,
        ce += n + (fe <= n ? 4 : fe - n),
        e = 1),
        s || (te = ee(Ze)),
        e)
            for (se = 0; se < pe.length; se++)
                pe[se](r, ne, i, t)
    }
    function $e(t) {
        return t < 1 / 2.75 ? _e * t * t : t < .7272727272727273 ? _e * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? _e * (t -= 2.25 / 2.75) * t + .9375 : _e * Math.pow(t - 2.625 / 2.75, 2) + .984375
    }
    p("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
        var r = e < 5 ? e + 1 : e;
        It(t + ",Power" + (r - 1), e ? function(t) {
            return Math.pow(t, r)
        }
        : function(t) {
            return t
        }
        , function(t) {
            return 1 - Math.pow(1 - t, r)
        }, function(t) {
            return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
        })
    }),
    E.Linear.easeNone = E.none = E.Linear.easeIn,
    It("Elastic", Ut("in"), Ut("out"), Ut()),
    _e = 7.5625,
    It("Bounce", function(t) {
        return 1 - $e(1 - t)
    }, $e),
    It("Expo", function(t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    }),
    It("Circ", function(t) {
        return -(ye(1 - t * t) - 1)
    }),
    It("Sine", function(t) {
        return 1 === t ? 1 : 1 - xe(t * ge)
    }),
    It("Back", Xt("in"), Xt("out"), Xt()),
    E.SteppedEase = E.steps = a.SteppedEase = {
        config: function(t, e) {
            var r = 1 / (t = void 0 === t ? 1 : t)
              , i = t + (e ? 0 : 1)
              , n = e ? 1 : 0;
            return function(t) {
                return ((i * jt(0, .99999999, t) | 0) + n) * r
            }
        }
    },
    de.ease = E["quad.out"],
    p("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
        return Ye += t + "," + t + "Params,"
    });
    var Je = function(t, e) {
        this.id = ve++,
        (t._gsap = this).target = t,
        this.harness = e,
        this.get = e ? e.get : v,
        this.set = e ? e.getSetter : br
    }
      , Ke = ((e = tr.prototype).delay = function(t) {
        return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay),
        this._delay = t,
        this) : this._delay
    }
    ,
    e.duration = function(t) {
        return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
    }
    ,
    e.totalDuration = function(t) {
        return arguments.length ? (this._dirty = 0,
        mt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }
    ,
    e.totalTime = function(t, e) {
        if (je(),
        !arguments.length)
            return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
            for (ct(this, t),
            r._dp && !r.parent && pt(r, this); r && r.parent; )
                r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0),
                r = r.parent;
            !this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && D(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === V || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t),
        y(this, t, e)),
        this
    }
    ,
    e.time = function(t, e) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + ht(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
    }
    ,
    e.totalProgress = function(t, e) {
        return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
    }
    ,
    e.progress = function(t, e) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + ht(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
    }
    ,
    e.iteration = function(t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? qt(this._tTime, r) + 1 : 1
    }
    ,
    e.timeScale = function(t) {
        if (!arguments.length)
            return this._rts === -V ? 0 : this._rts;
        if (this._rts === t)
            return this;
        for (var e = this.parent && this._ts ? lt(this.parent._time, this) : this._tTime, t = (this._rts = +t || 0,
        this._ts = this._ps || t === -V ? 0 : this._rts,
        this.totalTime(jt(-this._delay, this._tDur, e), !0),
        ft(this),
        this), r = t.parent; r && r.parent; )
            r._dirty = 1,
            r.totalDuration(),
            r = r.parent;
        return t
    }
    ,
    e.paused = function(t) {
        return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
        this._ts = this._act = 0) : (je(),
        this._ts = this._rts,
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== V && (this._tTime -= V)))),
        this) : this._ps
    }
    ,
    e.startTime = function(t) {
        var e;
        return arguments.length ? (this._start = t,
        !(e = this.parent || this._dp) || !e._sort && this.parent || D(e, this, t - this._delay),
        this) : this._start
    }
    ,
    e.endTime = function(t) {
        return this._start + (F(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }
    ,
    e.rawTime = function(t) {
        var e = this.parent || this._dp;
        return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? lt(e.rawTime(t), this) : this._tTime : this._tTime
    }
    ,
    e.revert = function(t) {
        var e = I;
        return I = t = void 0 === t ? Ee : t,
        (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t),
        this.totalTime(-.01, t.suppressEvents)),
        "nested" !== this.data && !1 !== t.kill && this.kill(),
        I = e,
        this
    }
    ,
    e.globalTime = function(t) {
        for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
            r = e._start + r / (e._ts || 1),
            e = e._dp;
        return !this.parent && this.vars.immediateRender ? -1 : r
    }
    ,
    e.repeat = function(t) {
        return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t,
        gt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
    }
    ,
    e.repeatDelay = function(t) {
        var e;
        return arguments.length ? (e = this._time,
        this._rDelay = t,
        gt(this),
        e ? this.time(e) : this) : this._rDelay
    }
    ,
    e.yoyo = function(t) {
        return arguments.length ? (this._yoyo = t,
        this) : this._yoyo
    }
    ,
    e.seek = function(t, e) {
        return this.totalTime(h(this, t), F(e))
    }
    ,
    e.restart = function(t, e) {
        return this.play().totalTime(t ? -this._delay : 0, F(e))
    }
    ,
    e.play = function(t, e) {
        return null != t && this.seek(t, e),
        this.reversed(!1).paused(!1)
    }
    ,
    e.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e),
        this.reversed(!0).paused(!1)
    }
    ,
    e.pause = function(t, e) {
        return null != t && this.seek(t, e),
        this.paused(!0)
    }
    ,
    e.resume = function() {
        return this.paused(!1)
    }
    ,
    e.reversed = function(t) {
        return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -V : 0)),
        this) : this._rts < 0
    }
    ,
    e.invalidate = function() {
        return this._initted = this._act = 0,
        this._zTime = -V,
        this
    }
    ,
    e.isActive = function() {
        var t = this.parent || this._dp
          , e = this._start;
        return !(t && !(this._ts && this._initted && t.isActive() && (t = t.rawTime(!0)) >= e && t < this.endTime(!0) - V))
    }
    ,
    e.eventCallback = function(t, e, r) {
        var i = this.vars;
        return 1 < arguments.length ? (e ? (i[t] = e,
        r && (i[t + "Params"] = r),
        "onUpdate" === t && (this._onUpdate = e)) : delete i[t],
        this) : i[t]
    }
    ,
    e.then = function(i) {
        var n = this;
        return new Promise(function(e) {
            function t() {
                var t = n.then;
                n.then = null,
                f(r) && (r = r(n)) && (r.then || r === n) && (n.then = t),
                e(r),
                n.then = t
            }
            var r = f(i) ? i : w;
            n._initted && 1 === n.totalProgress() && 0 <= n._ts || !n._tTime && n._ts < 0 ? t() : n._prom = t
        }
        )
    }
    ,
    tr);
    function tr(t) {
        this.vars = t,
        this._delay = +t.delay || 0,
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
        this._yoyo = !!t.yoyo || !!t.yoyoEase),
        this._ts = 1,
        mt(this, +t.duration, 1, 1),
        this.data = t.data,
        o && (this._ctx = o).data.push(this),
        Kt || _.wake()
    }
    L(Ke.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !(e.kill = function() {
            Pt(this)
        }
        ),
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -V,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    r(rr, er = Ke),
    (e = rr.prototype).to = function(t, e, r) {
        return vt(0, arguments, this),
        this
    }
    ,
    e.from = function(t, e, r) {
        return vt(1, arguments, this),
        this
    }
    ,
    e.fromTo = function(t, e, r, i) {
        return vt(2, arguments, this),
        this
    }
    ,
    e.set = function(t, e, r) {
        return e.duration = 0,
        e.parent = this,
        at(e).repeatDelay || (e.repeat = 0),
        e.immediateRender = !!e.immediateRender,
        new Q(t,e,h(this, r),1),
        this
    }
    ,
    e.call = function(t, e, r) {
        return D(this, Q.delayedCall(0, t, e), r)
    }
    ,
    e.staggerTo = function(t, e, r, i, n, s, a) {
        return r.duration = e,
        r.stagger = r.stagger || i,
        r.onComplete = s,
        r.onCompleteParams = a,
        r.parent = this,
        new Q(t,r,h(this, n)),
        this
    }
    ,
    e.staggerFrom = function(t, e, r, i, n, s, a) {
        return r.runBackwards = 1,
        at(r).immediateRender = F(r.immediateRender),
        this.staggerTo(t, e, r, i, n, s, a)
    }
    ,
    e.staggerFromTo = function(t, e, r, i, n, s, a, o) {
        return i.startAt = r,
        at(i).immediateRender = F(i.immediateRender),
        this.staggerTo(t, e, i, n, s, a, o)
    }
    ,
    e.render = function(t, e, r) {
        var i, n, s, a, o, u, h, l, f, c, p = this._time, _ = this._dirty ? this.totalDuration() : this._tDur, d = this._dur, m = t <= 0 ? 0 : A(t), g = this._zTime < 0 != t < 0 && (this._initted || !d);
        if ((m = this !== Y && _ < m && 0 <= t ? _ : m) !== this._tTime || r || g) {
            if (p !== this._time && d && (m += this._time - p,
            t += this._time - p),
            i = m,
            l = this._start,
            o = !(h = this._ts),
            g && (d || (p = this._zTime),
            !t && e || (this._zTime = t)),
            this._repeat) {
                if (g = this._yoyo,
                a = d + this._rDelay,
                this._repeat < -1 && t < 0)
                    return this.totalTime(100 * a + t, e, r);
                if (i = A(m % a),
                m === _ ? (s = this._repeat,
                i = d) : ((s = ~~(m / a)) && s === m / a && (i = d,
                s--),
                d < i && (i = d)),
                f = qt(this._tTime, a),
                g && 1 & s && (i = d - i,
                c = 1),
                s !== (f = !p && this._tTime && f !== s ? s : f) && !this._lock) {
                    var v = g && 1 & f
                      , g = v === (g && 1 & s)
                      , p = (v = s < f ? !v : v) ? 0 : d;
                    if (this._lock = 1,
                    this.render(p || (c ? 0 : A(s * a)), e, !d)._lock = 0,
                    this._tTime = m,
                    !e && this.parent && T(this, "onRepeat"),
                    this.vars.repeatRefresh && !c && (this.invalidate()._lock = 1),
                    p && p !== this._time || o != !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                        return this;
                    if (d = this._dur,
                    _ = this._tDur,
                    g && (this._lock = 2,
                    this.render(p = v ? d : -1e-4, !0),
                    this.vars.repeatRefresh) && !c && this.invalidate(),
                    this._lock = 0,
                    !this._ts && !o)
                        return this;
                    Lt(this, c)
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (u = ( (t, e, r) => {
                var i;
                if (e < r)
                    for (i = t._first; i && i._start <= r; ) {
                        if ("isPause" === i.data && i._start > e)
                            return i;
                        i = i._next
                    }
                else
                    for (i = t._last; i && i._start >= r; ) {
                        if ("isPause" === i.data && i._start < e)
                            return i;
                        i = i._prev
                    }
            }
            )(this, A(p), A(i))) && (m -= i - (i = u._start)),
            this._tTime = m,
            this._time = i,
            this._act = !h,
            this._initted || (this._onUpdate = this.vars.onUpdate,
            this._initted = 1,
            this._zTime = t,
            p = 0),
            !p && i && !e && (T(this, "onStart"),
            this._tTime !== m))
                return this;
            if (p <= i && 0 <= t)
                for (y = this._first; y; ) {
                    if (n = y._next,
                    (y._act || i >= y._start) && y._ts && u !== y) {
                        if (y.parent !== this)
                            return this.render(t, e, r);
                        if (y.render(0 < y._ts ? (i - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (i - y._start) * y._ts, e, r),
                        i !== this._time || !this._ts && !o) {
                            u = 0,
                            n && (m += this._zTime = -V);
                            break
                        }
                    }
                    y = n
                }
            else
                for (var y = this._last, x = t < 0 ? t : i; y; ) {
                    if (n = y._prev,
                    (y._act || x <= y._end) && y._ts && u !== y) {
                        if (y.parent !== this)
                            return this.render(t, e, r);
                        if (y.render(0 < y._ts ? (x - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (x - y._start) * y._ts, e, r || I && (y._initted || y._startAt)),
                        i !== this._time || !this._ts && !o) {
                            u = 0,
                            n && (m += this._zTime = x ? -V : V);
                            break
                        }
                    }
                    y = n
                }
            if (u && !e && (this.pause(),
            u.render(p <= i ? 0 : -V)._zTime = p <= i ? 1 : -1,
            this._ts))
                return this._start = l,
                ft(this),
                this.render(t, e, r);
            this._onUpdate && !e && T(this, "onUpdate", !0),
            !(m === _ && this._tTime >= this.totalDuration() || !m && p) || l !== this._start && Math.abs(h) === Math.abs(this._ts) || this._lock || (!t && d || !(m === _ && 0 < this._ts || !m && this._ts < 0) || ot(this, 1),
            e) || t < 0 && !p || !m && !p && _ || (T(this, m === _ && 0 <= t ? "onComplete" : "onReverseComplete", !0),
            !this._prom) || m < _ && 0 < this.timeScale() || this._prom()
        }
        return this
    }
    ,
    e.add = function(t, e) {
        var r = this;
        if ($(e) || (e = h(this, e, t)),
        !(t instanceof Ke)) {
            if (P(t))
                return t.forEach(function(t) {
                    return r.add(t, e)
                }),
                this;
            if (U(t))
                return this.addLabel(t, e);
            if (!f(t))
                return this;
            t = Q.delayedCall(0, t)
        }
        return this !== t ? D(this, t, e) : this
    }
    ,
    e.getChildren = function(t, e, r, i) {
        void 0 === t && (t = !0),
        void 0 === e && (e = !0),
        void 0 === r && (r = !0),
        void 0 === i && (i = -q);
        for (var n = [], s = this._first; s; )
            s._start >= i && (s instanceof Q ? e && n.push(s) : (r && n.push(s),
            t && n.push.apply(n, s.getChildren(!0, e, r)))),
            s = s._next;
        return n
    }
    ,
    e.getById = function(t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
            if (e[r].vars.id === t)
                return e[r]
    }
    ,
    e.remove = function(t) {
        return U(t) ? this.removeLabel(t) : f(t) ? this.killTweensOf(t) : (O(this, t),
        t === this._recent && (this._recent = this._last),
        k(this))
    }
    ,
    e.totalTime = function(t, e) {
        return arguments.length ? (this._forcing = 1,
        !this._dp && this._ts && (this._start = A(_.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))),
        er.prototype.totalTime.call(this, t, e),
        this._forcing = 0,
        this) : this._tTime
    }
    ,
    e.addLabel = function(t, e) {
        return this.labels[t] = h(this, e),
        this
    }
    ,
    e.removeLabel = function(t) {
        return delete this.labels[t],
        this
    }
    ,
    e.addPause = function(t, e, r) {
        e = Q.delayedCall(0, e || g, r);
        return e.data = "isPause",
        this._hasPause = 1,
        D(this, e, h(this, t))
    }
    ,
    e.removePause = function(t) {
        var e = this._first;
        for (t = h(this, t); e; )
            e._start === t && "isPause" === e.data && ot(e),
            e = e._next
    }
    ,
    e.killTweensOf = function(t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
            ar !== i[n] && i[n].kill(t, e);
        return this
    }
    ,
    e.getTweensOf = function(t, e) {
        for (var r, i = [], n = S(t), s = this._first, a = $(e); s; )
            s instanceof Q ? ( (t, e) => {
                for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
                    ;
                return i < r
            }
            )(s._targets, n) && (a ? (!ar || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && i.push(s) : (r = s.getTweensOf(n, e)).length && i.push.apply(i, r),
            s = s._next;
        return i
    }
    ,
    e.tweenTo = function(t, e) {
        e = e || {};
        var r, i = this, n = h(i, t), s = e.startAt, a = e.onStart, o = e.onStartParams, t = e.immediateRender, u = Q.to(i, L({
            ease: e.ease || "none",
            lazy: !1,
            immediateRender: !1,
            time: n,
            overwrite: "auto",
            duration: e.duration || Math.abs((n - (s && "time"in s ? s.time : i._time)) / i.timeScale()) || V,
            onStart: function() {
                var t;
                i.pause(),
                r || (t = e.duration || Math.abs((n - (s && "time"in s ? s.time : i._time)) / i.timeScale()),
                u._dur !== t && mt(u, t, 0, 1).render(u._time, !0, !0),
                r = 1),
                a && a.apply(u, o || [])
            }
        }, e));
        return t ? u.render(0) : u
    }
    ,
    e.tweenFromTo = function(t, e, r) {
        return this.tweenTo(e, L({
            startAt: {
                time: h(this, t)
            }
        }, r))
    }
    ,
    e.recent = function() {
        return this._recent
    }
    ,
    e.nextLabel = function(t) {
        return void 0 === t && (t = this._time),
        Dt(this, h(this, t))
    }
    ,
    e.previousLabel = function(t) {
        return void 0 === t && (t = this._time),
        Dt(this, h(this, t), 1)
    }
    ,
    e.currentLabel = function(t) {
        return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + V)
    }
    ,
    e.shiftChildren = function(t, e, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, s = this.labels; n; )
            n._start >= r && (n._start += t,
            n._end += t),
            n = n._next;
        if (e)
            for (i in s)
                s[i] >= r && (s[i] += t);
        return k(this)
    }
    ,
    e.invalidate = function(t) {
        var e = this._first;
        for (this._lock = 0; e; )
            e.invalidate(t),
            e = e._next;
        return er.prototype.invalidate.call(this, t)
    }
    ,
    e.clear = function(t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
            e = r._next,
            this.remove(r),
            r = e;
        return this._dp && (this._time = this._tTime = this._pTime = 0),
        t && (this.labels = {}),
        k(this)
    }
    ,
    e.totalDuration = function(t) {
        var e, r, i, n = 0, s = this, a = s._last, o = q;
        if (arguments.length)
            return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
        if (s._dirty) {
            for (i = s.parent; a; )
                e = a._prev,
                a._dirty && a.totalDuration(),
                o < (r = a._start) && s._sort && a._ts && !s._lock ? (s._lock = 1,
                D(s, a, r - a._delay, 1)._lock = 0) : o = r,
                r < 0 && a._ts && (n -= r,
                (!i && !s._dp || i && i.smoothChildTiming) && (s._start += r / s._ts,
                s._time -= r,
                s._tTime -= r),
                s.shiftChildren(-r, !1, -1 / 0),
                o = 0),
                a._end > n && a._ts && (n = a._end),
                a = e;
            mt(s, s === Y && s._time > n ? s._time : n, 1, 1),
            s._dirty = 0
        }
        return s._tDur
    }
    ,
    rr.updateRoot = function(t) {
        if (Y._ts && (y(Y, lt(t, Y)),
        Jt = _.frame),
        _.frame >= Le) {
            Le += N.autoSleep || 120;
            var e = Y._first;
            if ((!e || !e._ts) && N.autoSleep && _._listeners.length < 2) {
                for (; e && !e._ts; )
                    e = e._next;
                e || _.sleep()
            }
        }
    }
    ;
    var er, R = rr;
    function rr(t, e) {
        var r;
        return (r = er.call(this, t = void 0 === t ? {} : t) || this).labels = {},
        r.smoothChildTiming = !!t.smoothChildTiming,
        r.autoRemoveChildren = !!t.autoRemoveChildren,
        r._sort = F(t.sortChildren),
        Y && D(t.parent || Y, z(r), e),
        t.reversed && r.reverse(),
        t.paused && r.paused(!0),
        t.scrollTrigger && _t(z(r), t.scrollTrigger),
        r
    }
    function ir(t, e, r, i, n, s) {
        var a, o, u, h;
        if (j[t] && !1 !== (a = new j[t]).init(n, a.rawVars ? e[t] : ( (t, e, r, i, n) => {
            if (!C(t = f(t) ? sr(t, n, e, r, i) : t) || t.style && t.nodeType || P(t) || we(t))
                return U(t) ? sr(t, n, e, r, i) : t;
            var s, a = {};
            for (s in t)
                a[s] = sr(t[s], n, e, r, i);
            return a
        }
        )(e[t], i, n, s, r), r, i, s) && (r._pt = o = new G(r._pt,n,t,0,1,a.render,a,0,a.priority),
        r !== Ir))
            for (u = r._ptLookup[r._targets.indexOf(n)],
            h = a._props.length; h--; )
                u[a._props[h]] = o;
        return a
    }
    L(R.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    function nr(t, e, r) {
        var i, n, s, a, o, u, h, l, f, c, p, _, d, m = t.vars, g = m.ease, v = m.startAt, y = m.immediateRender, x = m.lazy, T = m.onUpdate, w = m.onUpdateParams, b = m.callbackScope, M = m.runBackwards, O = m.yoyoEase, k = m.keyframes, C = m.autoRevert, A = t._dur, D = t._startAt, P = t._targets, S = t.parent, E = S && "nested" === S.data ? S.vars.targets : P, R = "auto" === t._overwrite && !Gt, z = t.timeline;
        if (t._ease = He(g = !z || k && g ? g : "none", de.ease),
        t._yEase = O ? We(He(!0 === O ? g : O, de.ease)) : 0,
        O && t._yoyo && !t._repeat && (O = t._yEase,
        t._yEase = t._ease,
        t._ease = O),
        t._from = !z && !!m.runBackwards,
        !z || k && !m.stagger) {
            if (_ = (l = P[0] ? rt(P[0]).harness : 0) && m[l.prop],
            i = st(m, Re),
            D && (D._zTime < 0 && D.progress(1),
            e < 0 && M && y && !C ? D.render(-1, !0) : D.revert(M && A ? Se : Pe),
            D._lazy = 0),
            v) {
                if (ot(t._startAt = Q.set(P, L({
                    data: "isStart",
                    overwrite: !1,
                    parent: S,
                    immediateRender: !0,
                    lazy: F(x),
                    startAt: null,
                    delay: 0,
                    onUpdate: T,
                    onUpdateParams: w,
                    callbackScope: b,
                    stagger: 0
                }, v))),
                e < (t._startAt._dp = 0) && (I || !y && !C) && t._startAt.revert(Se),
                y && A && e <= 0 && r <= 0)
                    return void (e && (t._zTime = e))
            } else if (M && A && !D)
                if (s = L({
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: (y = e ? !1 : y) && F(x),
                    immediateRender: y,
                    stagger: 0,
                    parent: S
                }, i),
                _ && (s[l.prop] = _),
                ot(t._startAt = Q.set(P, s)),
                e < (t._startAt._dp = 0) && (I ? t._startAt.revert(Se) : t._startAt.render(-1, !0)),
                t._zTime = e,
                y) {
                    if (!e)
                        return
                } else
                    nr(t._startAt, V, V);
            for (t._pt = t._ptCache = 0,
            x = A && F(x) || x && !A,
            n = 0; n < P.length; n++) {
                if (h = (o = P[n])._gsap || et(P)[n]._gsap,
                t._ptLookup[n] = c = {},
                Fe[h.id] && ze.length && nt(),
                p = E === P ? n : E.indexOf(o),
                l && !1 !== (f = new l).init(o, _ || i, t, p, E) && (t._pt = a = new G(t._pt,o,f.name,0,1,f.render,f,0,f.priority),
                f._props.forEach(function(t) {
                    c[t] = a
                }),
                f.priority) && (u = 1),
                !l || _)
                    for (s in i)
                        j[s] && (f = ir(s, i, t, p, o, E)) ? f.priority && (u = 1) : c[s] = a = hr.call(t, o, s, "get", i[s], p, E, 0, m.stringFilter);
                t._op && t._op[n] && t.kill(o, t._op[n]),
                R && t._pt && (ar = t,
                Y.killTweensOf(o, c, t.globalTime(e)),
                d = !t.parent,
                ar = 0),
                t._pt && x && (Fe[h.id] = 1)
            }
            u && Mr(t),
            t._onInit && t._onInit(t)
        }
        t._onUpdate = T,
        t._initted = (!t._op || t._pt) && !d,
        k && e <= 0 && z.render(q, !0, !0)
    }
    function sr(t, e, r, i, n) {
        return f(t) ? t.call(e, r, i, n) : U(t) && ~t.indexOf("random(") ? At(t) : t
    }
    var ar, or, ur, hr = function(t, e, r, i, n, s, a, o, u, h) {
        f(i) && (i = i(n || 0, t, s));
        var l, n = t[e], s = "get" !== r ? r : f(n) ? u ? t[e.indexOf("set") || !f(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : n, r = f(n) ? u ? mr : dr : _r;
        if (!U(i) || "=" !== (i = ~i.indexOf("random(") ? At(i) : i).charAt(1) || !(l = it(s, i) + (X(s) || 0)) && 0 !== l || (i = l),
        !h || s !== i || or)
            return isNaN(s * i) || "" === i ? (n || e in t || K(e, i),
            function(t, e, r, i, n, s, a) {
                var o, u, h, l, f, c = new G(this._pt,t,e,0,1,yr,null,n), p = 0, _ = 0;
                for (c.b = r,
                c.e = i,
                r += "",
                (n = ~(i += "").indexOf("random(")) && (i = At(i)),
                s && (s(s = [r, i], t, e),
                r = s[0],
                i = s[1]),
                o = r.match(ke) || []; l = ke.exec(i); )
                    h = l[0],
                    l = i.substring(p, l.index),
                    u ? u = (u + 1) % 5 : "rgba(" === l.substr(-5) && (u = 1),
                    h !== o[_++] && (f = parseFloat(o[_ - 1]) || 0,
                    c._pt = {
                        _next: c._pt,
                        p: l || 1 === _ ? l : ",",
                        s: f,
                        c: "=" === h.charAt(1) ? it(f, h) - f : parseFloat(h) - f,
                        m: u && u < 4 ? Math.round : 0
                    },
                    p = ke.lastIndex);
                return c.c = p < i.length ? i.substring(p, i.length) : "",
                c.fp = a,
                (Ce.test(i) || n) && (c.e = 0),
                this._pt = c
            }
            .call(this, t, e, s, i, r, o || N.stringFilter, u)) : (l = new G(this._pt,t,e,+s || 0,i - (s || 0),"boolean" == typeof n ? vr : gr,0,r),
            u && (l.fp = u),
            a && l.modifier(a, this, t),
            this._pt = l)
    }, lr = Ye + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", fr = {}, Q = (p(lr + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
        return fr[t] = 1
    }),
    r(n, ur = Ke),
    (e = n.prototype).render = function(t, e, r) {
        var i, n, s, a = this._time, o = this._tDur, u = this._dur, h = t < 0, l = o - V < t && !h ? o : t < V ? 0 : t;
        if (u) {
            if (l !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != h) {
                if (_ = l,
                p = this.timeline,
                this._repeat) {
                    if (f = u + this._rDelay,
                    this._repeat < -1 && h)
                        return this.totalTime(100 * f + t, e, r);
                    if (_ = A(l % f),
                    l === o ? (g = this._repeat,
                    _ = u) : ((g = ~~(l / f)) && g === l / f && (_ = u,
                    g--),
                    u < _ && (_ = u)),
                    (n = this._yoyo && 1 & g) && (c = this._yEase,
                    _ = u - _),
                    y = qt(this._tTime, f),
                    _ === a && !r && this._initted)
                        return this._tTime = l,
                        this;
                    g !== y && (p && this._yEase && Lt(p, n),
                    !this.vars.repeatRefresh || n || this._lock || (this._lock = r = 1,
                    this.render(A(f * g), !0).invalidate()._lock = 0))
                }
                if (!this._initted) {
                    if (dt(this, h ? t : _, r, e, l))
                        return this._tTime = 0,
                        this;
                    if (a !== this._time)
                        return this;
                    if (u !== this._dur)
                        return this.render(t, e, r)
                }
                if (this._tTime = l,
                this._time = _,
                !this._act && this._ts && (this._act = 1,
                this._lazy = 0),
                this.ratio = s = (c || this._ease)(_ / u),
                this._from && (this.ratio = s = 1 - s),
                _ && !a && !e && (T(this, "onStart"),
                this._tTime !== l))
                    return this;
                for (i = this._pt; i; )
                    i.r(s, i.d),
                    i = i._next;
                p && p.render(t < 0 ? t : !_ && n ? -V : p._dur * p._ease(_ / this._dur), e, r) || this._startAt && (this._zTime = t),
                this._onUpdate && !e && (h && ut(this, t, 0, r),
                T(this, "onUpdate")),
                this._repeat && g !== y && this.vars.onRepeat && !e && this.parent && T(this, "onRepeat"),
                l !== this._tDur && l || this._tTime !== l || (h && !this._onUpdate && ut(this, t, 0, !0),
                !t && u || !(l === this._tDur && 0 < this._ts || !l && this._ts < 0) || ot(this, 1),
                e) || h && !a || !(l || a || n) || (T(this, l === o ? "onComplete" : "onReverseComplete", !0),
                !this._prom) || l < o && 0 < this.timeScale() || this._prom()
            }
        } else {
            var f = this;
            var c = t;
            var p = e;
            var _ = r;
            var d, m, g = f.ratio, v = c < 0 || !c && (!f._start && function t(e) {
                e = e.parent;
                return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || t(e))
            }(f) && (f._initted || !Vt(f)) || (f._ts < 0 || f._dp._ts < 0) && !Vt(f)) ? 0 : 1, y = f._rDelay, u = 0;
            if (y && f._repeat && (u = jt(0, f._tDur, c),
            m = qt(u, y),
            f._yoyo && 1 & m && (v = 1 - v),
            m !== qt(f._tTime, y)) && (g = 1 - v,
            f.vars.repeatRefresh) && f._initted && f.invalidate(),
            v !== g || I || _ || f._zTime === V || !c && f._zTime) {
                if (f._initted || !dt(f, c, _, p, u)) {
                    for (m = f._zTime,
                    f._zTime = c || (p ? V : 0),
                    p = p || c && !m,
                    f.ratio = v,
                    f._from && (v = 1 - v),
                    f._time = 0,
                    f._tTime = u,
                    d = f._pt; d; )
                        d.r(v, d.d),
                        d = d._next;
                    c < 0 && ut(f, c, 0, !0),
                    f._onUpdate && !p && T(f, "onUpdate"),
                    u && f._repeat && !p && f.parent && T(f, "onRepeat"),
                    (f._tDur <= c || c < 0) && f.ratio === v && (v && ot(f, 1),
                    p || I || (T(f, v ? "onComplete" : "onReverseComplete", !0),
                    f._prom && f._prom()))
                }
            } else
                f._zTime || (f._zTime = c)
        }
        return this
    }
    ,
    e.targets = function() {
        return this._targets
    }
    ,
    e.invalidate = function(t) {
        return t && this.vars.runBackwards || (this._startAt = 0),
        this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
        this._ptLookup = [],
        this.timeline && this.timeline.invalidate(t),
        ur.prototype.invalidate.call(this, t)
    }
    ,
    e.resetTo = function(t, e, r, i) {
        Kt || _.wake(),
        this._ts || this.play();
        var n, s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || nr(this, s),
        n = this._ease(s / this._dur),
        ( (t, e, r, i, n, s, a) => {
            var o, u, h, l, f = (t._pt && t._ptCache || (t._ptCache = {}))[e];
            if (!f)
                for (f = t._ptCache[e] = [],
                h = t._ptLookup,
                l = t._targets.length; l--; ) {
                    if ((o = h[l][e]) && o.d && o.d._pt)
                        for (o = o.d._pt; o && o.p !== e && o.fp !== e; )
                            o = o._next;
                    if (!o)
                        return or = 1,
                        t.vars[e] = "+=0",
                        nr(t, a),
                        or = 0,
                        1;
                    f.push(o)
                }
            for (l = f.length; l--; )
                (o = (u = f[l])._pt || u).s = !i && 0 !== i || n ? o.s + (i || 0) + s * o.c : i,
                o.c = r - o.s,
                u.e && (u.e = B(r) + X(u.e)),
                u.b && (u.b = o.s + X(u.b))
        }
        )(this, t, e, r, i, n, s) ? this.resetTo(t, e, r, i) : (ct(this, 0),
        this.parent || M(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
        this.render(0))
    }
    ,
    e.kill = function(t, e) {
        if (void 0 === e && (e = "all"),
        !(t || e && "all" !== e))
            return this._lazy = this._pt = 0,
            this.parent ? Pt(this) : this;
        if (this.timeline)
            c = this.timeline.totalDuration(),
            this.timeline.killTweensOf(t, e, ar && !0 !== ar.vars.overwrite)._first || Pt(this),
            this.parent && c !== this.timeline.totalDuration() && mt(this, this._dur * this.timeline._tDur / c, 0, 1);
        else {
            var r, i, n, s, a, o, u, h = this._targets, l = t ? S(t) : h, f = this._ptLookup, c = this._pt;
            if ((!e || "all" === e) && ( (t, e) => {
                for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
                    ;
                return r < 0
            }
            )(h, l))
                return "all" === e && (this._pt = 0),
                Pt(this);
            for (r = this._op = this._op || [],
            "all" !== e && (U(e) && (a = {},
            p(e, function(t) {
                return a[t] = 1
            }),
            e = a),
            e = ( (t, e) => {
                var r, i, n, s, a = (t = t[0] ? rt(t[0]).harness : 0) && t.aliases;
                if (!a)
                    return e;
                for (i in r = Nt({}, e),
                a)
                    if (i in r)
                        for (n = (s = a[i].split(",")).length; n--; )
                            r[s[n]] = r[i];
                return r
            }
            )(h, e)),
            u = h.length; u--; )
                if (~l.indexOf(h[u]))
                    for (a in i = f[u],
                    "all" === e ? (r[u] = e,
                    s = i,
                    n = {}) : (n = r[u] = r[u] || {},
                    s = e),
                    s)
                        (o = i && i[a]) && ("kill"in o.d && !0 !== o.d.kill(a) || O(this, o, "_pt"),
                        delete i[a]),
                        "all" !== n && (n[a] = 1);
            this._initted && !this._pt && c && Pt(this)
        }
        return this
    }
    ,
    n.to = function(t, e, r) {
        return new n(t,e,r)
    }
    ,
    n.from = function(t, e) {
        return vt(1, arguments)
    }
    ,
    n.delayedCall = function(t, e, r, i) {
        return new n(e,0,{
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: e,
            onReverseComplete: e,
            onCompleteParams: r,
            onReverseCompleteParams: r,
            callbackScope: i
        })
    }
    ,
    n.fromTo = function(t, e, r) {
        return vt(2, arguments)
    }
    ,
    n.set = function(t, e) {
        return e.duration = 0,
        e.repeatDelay || (e.repeat = 0),
        new n(t,e)
    }
    ,
    n.killTweensOf = function(t, e, r) {
        return Y.killTweensOf(t, e, r)
    }
    ,
    n);
    function n(t, e, r, i) {
        var n;
        "number" == typeof e && (r.duration = e,
        e = r,
        r = null);
        var s, a, o, u, h, l, f, c, i = (n = ur.call(this, i ? e : at(e)) || this).vars, p = i.duration, _ = i.delay, d = i.immediateRender, m = i.stagger, g = i.overwrite, v = i.keyframes, y = i.defaults, x = i.scrollTrigger, T = i.yoyoEase, i = e.parent || Y, w = (P(t) || we(t) ? $(t[0]) : "length"in e) ? [t] : S(t);
        if (n._targets = w.length ? et(w) : tt("GSAP target " + t + " not found. https://greensock.com", !N.nullTargetWarn) || [],
        n._ptLookup = [],
        n._overwrite = g,
        v || m || J(p) || J(_)) {
            if (e = n.vars,
            (s = n.timeline = new R({
                data: "nested",
                defaults: y || {},
                targets: i && "nested" === i.data ? i.vars.targets : w
            })).kill(),
            s.parent = s._dp = z(n),
            s._start = 0,
            m || J(p) || J(_)) {
                if (u = w.length,
                f = m && bt(m),
                C(m))
                    for (h in m)
                        ~lr.indexOf(h) && ((c = c || {})[h] = m[h]);
                for (a = 0; a < u; a++)
                    (o = st(e, fr)).stagger = 0,
                    T && (o.yoyoEase = T),
                    c && Nt(o, c),
                    l = w[a],
                    o.duration = +sr(p, z(n), a, l, w),
                    o.delay = (+sr(_, z(n), a, l, w) || 0) - n._delay,
                    !m && 1 === u && o.delay && (n._delay = _ = o.delay,
                    n._start += _,
                    o.delay = 0),
                    s.to(l, o, f ? f(a, l, w) : 0),
                    s._ease = E.none;
                s.duration() ? p = _ = 0 : n.timeline = 0
            } else if (v) {
                at(L(s.vars.defaults, {
                    ease: "none"
                })),
                s._ease = He(v.ease || e.ease || "none");
                var b, M, O, k = 0;
                if (P(v))
                    v.forEach(function(t) {
                        return s.to(w, t, ">")
                    }),
                    s.duration();
                else {
                    for (h in o = {},
                    v)
                        "ease" !== h && "easeEach" !== h && ( (t, r, e, i) => {
                            var n, s, a = r.ease || i || "power1.inOut";
                            if (P(r))
                                s = e[t] || (e[t] = []),
                                r.forEach(function(t, e) {
                                    return s.push({
                                        t: e / (r.length - 1) * 100,
                                        v: t,
                                        e: a
                                    })
                                });
                            else
                                for (n in r)
                                    s = e[n] || (e[n] = []),
                                    "ease" !== n && s.push({
                                        t: parseFloat(t),
                                        v: r[n],
                                        e: a
                                    })
                        }
                        )(h, v[h], o, v.easeEach);
                    for (h in o)
                        for (b = o[h].sort(function(t, e) {
                            return t.t - e.t
                        }),
                        a = k = 0; a < b.length; a++)
                            (O = {
                                ease: (M = b[a]).e,
                                duration: (M.t - (a ? b[a - 1].t : 0)) / 100 * p
                            })[h] = M.v,
                            s.to(w, O, k),
                            k += O.duration;
                    s.duration() < p && s.to({}, {
                        duration: p - s.duration()
                    })
                }
            }
            p || n.duration(p = s.duration())
        } else
            n.timeline = 0;
        return !0 !== g || Gt || (ar = z(n),
        Y.killTweensOf(w),
        ar = 0),
        D(i, z(n), r),
        e.reversed && n.reverse(),
        e.paused && n.paused(!0),
        (d || !p && !v && n._start === A(i._time) && F(d) && function t(e) {
            return !e || e._ts && t(e.parent)
        }(z(n)) && "nested" !== i.data) && (n._tTime = -V,
        n.render(Math.max(0, -_) || 0)),
        x && _t(z(n), x),
        n
    }
    function cr(t, e, r) {
        return t.setAttribute(e, r)
    }
    function pr(t, e, r, i) {
        i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
    }
    L(Q.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }),
    p("staggerTo,staggerFrom,staggerFromTo", function(r) {
        Q[r] = function() {
            var t = new R
              , e = Xe.call(arguments, 0);
            return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0),
            t[r].apply(t, e)
        }
    });
    function _r(t, e, r) {
        return t[e] = r
    }
    function dr(t, e, r) {
        return t[e](r)
    }
    function mr(t, e, r, i) {
        return t[e](i.fp, r)
    }
    function gr(t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
    }
    function vr(t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
    }
    function yr(t, e) {
        var r = e._pt
          , i = "";
        if (!t && e.b)
            i = e.b;
        else if (1 === t && e.e)
            i = e.e;
        else {
            for (; r; )
                i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i,
                r = r._next;
            i += e.c
        }
        e.set(e.t, e.p, i, e)
    }
    function xr(t, e) {
        for (var r = e._pt; r; )
            r.r(t, r.d),
            r = r._next
    }
    function Tr(t, e, r, i) {
        for (var n, s = this._pt; s; )
            n = s._next,
            s.p === i && s.modifier(t, e, r),
            s = n
    }
    function wr(t) {
        for (var e, r, i = this._pt; i; )
            r = i._next,
            i.p === t && !i.op || i.op === t ? O(this, i, "_pt") : i.dep || (e = 1),
            i = r;
        return !e
    }
    var br = function(t, e) {
        return f(t[e]) ? dr : s(t[e]) && t.setAttribute ? cr : _r
    }
      , Mr = function(t) {
        for (var e, r, i, n, s = t._pt; s; ) {
            for (e = s._next,
            r = i; r && r.pr > s.pr; )
                r = r._next;
            (s._prev = r ? r._prev : n) ? s._prev._next = s : i = s,
            (s._next = r) ? r._prev = s : n = s,
            s = e
        }
        t._pt = i
    }
      , G = (Or.prototype.modifier = function(t, e, r) {
        this.mSet = this.mSet || this.set,
        this.set = pr,
        this.m = t,
        this.mt = r,
        this.tween = e
    }
    ,
    Or);
    function Or(t, e, r, i, n, s, a, o, u) {
        this.t = e,
        this.s = i,
        this.c = n,
        this.p = r,
        this.r = s || gr,
        this.d = a || this,
        this.set = o || _r,
        this.pr = u || 0,
        (this._next = t) && (t._prev = this)
    }
    function kr(t) {
        (Dr[t] || Pr).map(function(t) {
            return t()
        })
    }
    function Cr() {
        var t = Date.now()
          , o = [];
        2 < t - Sr && (kr("matchMediaInit"),
        Ar.forEach(function(t) {
            var e, r, i, n, s = t.queries, a = t.conditions;
            for (r in s)
                (e = u.matchMedia(s[r]).matches) && (i = 1),
                e !== a[r] && (a[r] = e,
                n = 1);
            n && (t.revert(),
            i) && o.push(t)
        }),
        kr("matchMediaRevert"),
        o.forEach(function(t) {
            return t.onMatch(t)
        }),
        Sr = t,
        kr("matchMedia"))
    }
    p(Ye + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
        return Re[t] = 1
    }),
    a.TweenMax = a.TweenLite = Q,
    a.TimelineLite = a.TimelineMax = R,
    Y = new R({
        sortChildren: !1,
        defaults: de,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }),
    N.stringFilter = Ft;
    var Ar = []
      , Dr = {}
      , Pr = []
      , Sr = 0
      , Er = ((e = Rr.prototype).add = function(t, i, n) {
        function e() {
            var t, e = o, r = s.selector;
            return e && e !== s && e.data.push(s),
            n && (s.selector = Tt(n)),
            o = s,
            f(t = i.apply(s, arguments)) && s._r.push(t),
            o = e,
            s.selector = r,
            s.isReverted = !1,
            t
        }
        f(t) && (n = i,
        i = t,
        t = f);
        var s = this;
        return s.last = e,
        t === f ? e(s) : t ? s[t] = e : e
    }
    ,
    e.ignore = function(t) {
        var e = o;
        o = null,
        t(this),
        o = e
    }
    ,
    e.getTweens = function() {
        var e = [];
        return this.data.forEach(function(t) {
            return t instanceof Rr ? e.push.apply(e, t.getTweens()) : t instanceof Q && !(t.parent && "nested" === t.parent.data) && e.push(t)
        }),
        e
    }
    ,
    e.clear = function() {
        this._r.length = this.data.length = 0
    }
    ,
    e.kill = function(e, t) {
        var r, i = this;
        e ? (r = this.getTweens(),
        this.data.forEach(function(t) {
            "isFlip" === t.data && (t.revert(),
            t.getChildren(!0, !0, !1).forEach(function(t) {
                return r.splice(r.indexOf(t), 1)
            }))
        }),
        r.map(function(t) {
            return {
                g: t.globalTime(0),
                t: t
            }
        }).sort(function(t, e) {
            return e.g - t.g || -1
        }).forEach(function(t) {
            return t.t.revert(e)
        }),
        this.data.forEach(function(t) {
            return !(t instanceof Ke) && t.revert && t.revert(e)
        }),
        this._r.forEach(function(t) {
            return t(e, i)
        }),
        this.isReverted = !0) : this.data.forEach(function(t) {
            return t.kill && t.kill()
        }),
        this.clear(),
        t && ~(t = Ar.indexOf(this)) && Ar.splice(t, 1)
    }
    ,
    e.revert = function(t) {
        this.kill(t || {})
    }
    ,
    Rr);
    function Rr(t, e) {
        this.selector = e && Tt(e),
        this.data = [],
        this._r = [],
        this.isReverted = !1,
        t && this.add(t)
    }
    (e = Fr.prototype).add = function(t, e, r) {
        C(t) || (t = {
            matches: t
        });
        var i, n, s, a = new Er(0,r || this.scope), o = a.conditions = {};
        for (n in this.contexts.push(a),
        e = a.add("onMatch", e),
        a.queries = t)
            "all" === n ? s = 1 : (i = u.matchMedia(t[n])) && (Ar.indexOf(a) < 0 && Ar.push(a),
            (o[n] = i.matches) && (s = 1),
            i.addListener ? i.addListener(Cr) : i.addEventListener("change", Cr));
        return s && e(a),
        this
    }
    ,
    e.revert = function(t) {
        this.kill(t || {})
    }
    ,
    e.kill = function(e) {
        this.contexts.forEach(function(t) {
            return t.kill(e, !0)
        })
    }
    ;
    var zr = Fr;
    function Fr(t) {
        this.contexts = [],
        this.scope = t
    }
    var Br = {
        registerPlugin: function() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
                e[r] = arguments[r];
            e.forEach(function(t) {
                var e = (t = !t.name && t.default || t).name
                  , r = e && !f(t) && t.init ? function() {
                    this._props = []
                }
                : t
                  , i = {
                    init: g,
                    render: xr,
                    add: hr,
                    kill: wr,
                    modifier: Tr,
                    rawVars: 0
                }
                  , n = {
                    targetTest: 0,
                    get: 0,
                    getSetter: br,
                    aliases: {},
                    register: 0
                };
                if (je(),
                t !== r) {
                    if (j[e])
                        return;
                    L(r, L(st(t, i), n)),
                    Nt(r.prototype, Nt(i, st(t, n))),
                    j[r.prop = e] = r,
                    t.targetTest && (Ie.push(r),
                    Re[e] = 1),
                    e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                }
                m(e, r),
                t.register && t.register(l, r, G)
            })
        },
        timeline: function(t) {
            return new R(t)
        },
        getTweensOf: function(t, e) {
            return Y.getTweensOf(t, e)
        },
        getProperty: function(i, t, e, r) {
            var n = rt((i = U(i) ? S(i)[0] : i) || {}).get
              , s = e ? w : x;
            return "native" === e && (e = ""),
            i && (t ? s((j[t] && j[t].get || n)(i, t, e, r)) : function(t, e, r) {
                return s((j[t] && j[t].get || n)(i, t, e, r))
            }
            )
        },
        quickSetter: function(r, e, i) {
            var n, s;
            if (1 < (r = S(r)).length)
                return n = r.map(function(t) {
                    return l.quickSetter(t, e, i)
                }),
                s = n.length,
                function(t) {
                    for (var e = s; e--; )
                        n[e](t)
                }
                ;
            r = r[0] || {};
            var a = j[e]
              , o = rt(r)
              , u = o.harness && (o.harness.aliases || {})[e] || e
              , h = a ? function(t) {
                var e = new a;
                Ir._pt = 0,
                e.init(r, i ? t + i : t, Ir, 0, [r]),
                e.render(1, e),
                Ir._pt && xr(1, Ir)
            }
            : o.set(r, u);
            return a ? h : function(t) {
                return h(r, u, i ? t + i : t, o, 1)
            }
        },
        quickTo: function(t, i, e) {
            function r(t, e, r) {
                return n.resetTo(i, t, e, r)
            }
            var n = l.to(t, Nt(((t = {})[i] = "+=0.1",
            t.paused = !0,
            t), e || {}));
            return r.tween = n,
            r
        },
        isTweening: function(t) {
            return 0 < Y.getTweensOf(t, !0).length
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = He(t.ease, de.ease)),
            b(de, t || {})
        },
        config: function(t) {
            return b(N, t || {})
        },
        registerEffect: function(t) {
            var i = t.name
              , n = t.effect
              , e = t.plugins
              , s = t.defaults
              , t = t.extendTimeline;
            (e || "").split(",").forEach(function(t) {
                return t && !j[t] && !a[t] && tt(i + " effect requires " + t + " plugin.")
            }),
            Be[i] = function(t, e, r) {
                return n(S(t), L(e || {}, s), r)
            }
            ,
            t && (R.prototype[i] = function(t, e, r) {
                return this.add(Be[i](t, C(e) ? e : (r = e) && {}, this), r)
            }
            )
        },
        registerEase: function(t, e) {
            E[t] = He(e)
        },
        parseEase: function(t, e) {
            return arguments.length ? He(t, e) : E
        },
        getById: function(t) {
            return Y.getById(t)
        },
        exportRoot: function(t, e) {
            var r, i, n = new R(t = void 0 === t ? {} : t);
            for (n.smoothChildTiming = F(t.smoothChildTiming),
            Y.remove(n),
            n._dp = 0,
            n._time = n._tTime = Y._time,
            r = Y._first; r; )
                i = r._next,
                !e && !r._dur && r instanceof Q && r.vars.onComplete === r._targets[0] || D(n, r, r._start - r._delay),
                r = i;
            return D(Y, n, 0),
            n
        },
        context: function(t, e) {
            return t ? new Er(t,e) : o
        },
        matchMedia: function(t) {
            return new zr(t)
        },
        matchMediaRefresh: function() {
            return Ar.forEach(function(t) {
                var e, r, i = t.conditions;
                for (r in i)
                    i[r] && (i[r] = !1,
                    e = 1);
                e && t.revert()
            }) || Cr()
        },
        addEventListener: function(t, e) {
            t = Dr[t] || (Dr[t] = []);
            ~t.indexOf(e) || t.push(e)
        },
        removeEventListener: function(t, e) {
            t = Dr[t],
            e = t && t.indexOf(e);
            0 <= e && t.splice(e, 1)
        },
        utils: {
            wrap: function t(e, r, i) {
                var n = r - e;
                return P(e) ? Ct(e, t(0, e.length), r) : yt(i, function(t) {
                    return (n + (t - e) % n) % n + e
                })
            },
            wrapYoyo: function t(e, r, i) {
                var n = r - e
                  , s = 2 * n;
                return P(e) ? Ct(e, t(0, e.length - 1), r) : yt(i, function(t) {
                    return e + (n < (t = (s + (t - e) % s) % s || 0) ? s - t : t)
                })
            },
            distribute: bt,
            random: kt,
            snap: Ot,
            normalize: function(t, e, r) {
                return Qt(t, e, 0, 1, r)
            },
            getUnit: X,
            clamp: function(e, r, t) {
                return yt(t, function(t) {
                    return jt(e, r, t)
                })
            },
            splitColor: Et,
            toArray: S,
            selector: Tt,
            mapRange: Qt,
            pipe: function() {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
                    e[r] = arguments[r];
                return function(t) {
                    return e.reduce(function(t, e) {
                        return e(t)
                    }, t)
                }
            },
            unitize: function(e, r) {
                return function(t) {
                    return e(parseFloat(t)) + (r || X(t))
                }
            },
            interpolate: function t(e, r, i, n) {
                var s = isNaN(e + r) ? 0 : function(t) {
                    return (1 - t) * e + t * r
                }
                ;
                if (!s) {
                    var a, o, u, h, l, f = U(e), c = {};
                    if (!0 === i && (n = 1,
                    i = null),
                    f)
                        e = {
                            p: e
                        },
                        r = {
                            p: r
                        };
                    else if (P(e) && !P(r)) {
                        for (u = [],
                        h = e.length,
                        l = h - 2,
                        o = 1; o < h; o++)
                            u.push(t(e[o - 1], e[o]));
                        h--,
                        s = function(t) {
                            t *= h;
                            var e = Math.min(l, ~~t);
                            return u[e](t - e)
                        }
                        ,
                        i = r
                    } else
                        n || (e = Nt(P(e) ? [] : {}, e));
                    if (!u) {
                        for (a in r)
                            hr.call(c, e, a, "get", r[a]);
                        s = function(t) {
                            return xr(t, c),
                            f ? e.p : e
                        }
                    }
                }
                return yt(i, s)
            },
            shuffle: wt
        },
        install: d,
        effects: Be,
        ticker: _,
        updateRoot: R.updateRoot,
        plugins: j,
        globalTimeline: Y,
        core: {
            PropTween: G,
            globals: m,
            Tween: Q,
            Timeline: R,
            Animation: Ke,
            getCache: rt,
            _removeLinkedListItem: O,
            reverting: function() {
                return I
            },
            context: function(t) {
                return t && o && (o.data.push(t),
                t._ctx = o),
                o
            },
            suppressOverwrites: function(t) {
                return Gt = t
            }
        }
    };
    function Lr(t, l) {
        return {
            name: t,
            rawVars: 1,
            init: function(t, h, e) {
                e._onInit = function(t) {
                    var e, r;
                    if (U(h) && (e = {},
                    p(h, function(t) {
                        return e[t] = 1
                    }),
                    h = e),
                    l) {
                        for (r in e = {},
                        h)
                            e[r] = l(h[r]);
                        h = e
                    }
                    var i, n, s, a = t, o = h, u = a._targets;
                    for (i in o)
                        for (n = u.length; n--; )
                            (s = (s = a._ptLookup[n][i]) && s.d) && (s._pt && (s = ( (t, e) => {
                                for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
                                    r = r._next;
                                return r
                            }
                            )(s, i)),
                            s) && s.modifier && s.modifier(o[i], a, u[n], i)
                }
            }
        }
    }
    p("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
        return Br[t] = Q[t]
    }),
    _.add(R.updateRoot);
    var Ir = Br.to({}, {
        duration: 0
    })
      , l = Br.registerPlugin({
        name: "attr",
        init: function(t, e, r, i, n) {
            var s, a, o;
            for (s in this.tween = r,
            e)
                o = t.getAttribute(s) || "",
                (a = this.add(t, "setAttribute", (o || 0) + "", e[s], i, n, 0, 0, s)).op = s,
                a.b = o,
                this._props.push(s)
        },
        render: function(t, e) {
            for (var r = e._pt; r; )
                I ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d),
                r = r._next
        }
    }, {
        name: "endArray",
        init: function(t, e) {
            for (var r = e.length; r--; )
                this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
        }
    }, Lr("roundProps", Mt), Lr("modifiers"), Lr("snap", Ot)) || Br;
    function Yr(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }
    function Ur(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }
    function Xr(t, e) {
        return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    }
    function Nr(t, e) {
        t = e.s + e.c * t;
        e.set(e.t, e.p, ~~(t + (t < 0 ? -.5 : .5)) + e.u, e)
    }
    function qr(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }
    function Vr(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }
    function jr(t, e, r) {
        return t.style[e] = r
    }
    function Qr(t, e, r) {
        return t.style.setProperty(e, r)
    }
    function Gr(t, e, r) {
        return t._gsap[e] = r
    }
    function Wr(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    }
    function Hr(t, e, r, i, n) {
        t = t._gsap;
        t.scaleX = t.scaleY = r,
        t.renderTransform(n, t)
    }
    function Zr(t, e, r, i, n) {
        t = t._gsap;
        t[e] = r,
        t.renderTransform(n, t)
    }
    function $r(t, e) {
        var r = this
          , i = this.target
          , n = i.style;
        if (t in Ni) {
            if (this.tfm = this.tfm || {},
            "transform" !== t && (~(t = Hi[t] || t).indexOf(",") ? t.split(",").forEach(function(t) {
                return r.tfm[t] = tn(i, t)
            }) : this.tfm[t] = i._gsap.x ? i._gsap[t] : tn(i, t)),
            0 <= this.props.indexOf(H))
                return;
            i._gsap.svg && (this.svgo = i.getAttribute("data-svg-origin"),
            this.props.push(Z, e, "")),
            t = H
        }
        (n || e) && this.props.push(t, e, n[t])
    }
    function Jr(t) {
        t.translate && (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"))
    }
    function Kr() {
        for (var t, e = this.props, r = this.target, i = r.style, n = r._gsap, s = 0; s < e.length; s += 3)
            e[s + 1] ? r[e[s]] = e[s + 2] : e[s + 2] ? i[e[s]] = e[s + 2] : i.removeProperty(e[s].replace(Qi, "-$1").toLowerCase());
        if (this.tfm) {
            for (t in this.tfm)
                n[t] = this.tfm[t];
            n.svg && (n.renderTransform(),
            r.setAttribute("data-svg-origin", this.svgo || "")),
            !(s = bi()) || s.isStart || i[H] || (Jr(i),
            n.uncache = 1)
        }
    }
    function ti(t, e) {
        var r = {
            target: t,
            props: [],
            revert: Kr,
            save: $r
        };
        return e && e.split(",").forEach(function(t) {
            return r.save(t)
        }),
        r
    }
    function ei(t, e) {
        e = vi.createElementNS ? vi.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : vi.createElement(t);
        return e.style ? e : vi.createElement(t)
    }
    function W(t, e, r) {
        var i = getComputedStyle(t);
        return i[e] || i.getPropertyValue(e.replace(Qi, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && W(t, $i(e) || e, 1) || ""
    }
    function ri() {
        "undefined" != typeof window && window.document && (yi = (vi = window.document).documentElement,
        Ti = ei("div") || {
            style: {}
        },
        ei("div"),
        H = $i(H),
        Z = H + "Origin",
        Ti.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
        Mi = !!$i("perspective"),
        bi = l.core.reverting,
        xi = 1)
    }
    function ii(t) {
        var e, r = ei("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, n = this.nextSibling, s = this.style.cssText;
        if (yi.appendChild(r),
        r.appendChild(this),
        this.style.display = "block",
        t)
            try {
                e = this.getBBox(),
                this._gsapBBox = this.getBBox,
                this.getBBox = ii
            } catch (t) {}
        else
            this._gsapBBox && (e = this._gsapBBox());
        return i && (n ? i.insertBefore(this, n) : i.appendChild(this)),
        yi.removeChild(r),
        this.style.cssText = s,
        e
    }
    function ni(t, e) {
        for (var r = e.length; r--; )
            if (t.hasAttribute(e[r]))
                return t.getAttribute(e[r])
    }
    function si(e) {
        var r;
        try {
            r = e.getBBox()
        } catch (t) {
            r = ii.call(e, !0)
        }
        return !(r = r && (r.width || r.height) || e.getBBox === ii ? r : ii.call(e, !0)) || r.width || r.x || r.y ? r : {
            x: +ni(e, ["x", "cx", "x1"]) || 0,
            y: +ni(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }
    function ai(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !si(t))
    }
    function oi(t, e) {
        e && (t = t.style,
        e in Ni && e !== Z && (e = H),
        t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
        t.removeProperty(e.replace(Qi, "-$1").toLowerCase())) : t.removeAttribute(e))
    }
    function ui(t, e, r, i, n, s) {
        e = new G(t._pt,e,r,0,1,s ? Vr : qr);
        (t._pt = e).b = i,
        e.e = n,
        t._props.push(r)
    }
    function hi(t, e, r, i) {
        var n, s = parseFloat(r) || 0, a = (r + "").trim().substr((s + "").length) || "px", o = Ti.style, u = Gi.test(e), h = "svg" === t.tagName.toLowerCase(), l = (h ? "client" : "offset") + (u ? "Width" : "Height"), f = "px" === i, c = "%" === i;
        return i === a || !s || Ji[i] || Ji[a] ? s : ("px" === a || f || (s = hi(t, e, r, "px")),
        r = t.getCTM && ai(t),
        !c && "%" !== a || !Ni[e] && !~e.indexOf("adius") ? (o[u ? "width" : "height"] = 100 + (f ? a : i),
        e = ~e.indexOf("adius") || "em" === i && t.appendChild && !h ? t : t.parentNode,
        (i = (e = (e = r ? (t.ownerSVGElement || {}).parentNode : e) && e !== vi && e.appendChild ? e : vi.body)._gsap) && c && i.width && u && i.time === _.time && !i.uncache ? B(s / i.width * 100) : (!c && "%" !== a || Ki[W(e, "display")] || (o.position = W(t, "position")),
        e === t && (o.position = "static"),
        e.appendChild(Ti),
        n = Ti[l],
        e.removeChild(Ti),
        o.position = "absolute",
        u && c && ((i = rt(e)).time = _.time,
        i.width = e[l]),
        B(f ? n * s / 100 : n && s ? 100 / n * s : 0))) : (n = r ? t.getBBox()[u ? "width" : "height"] : t[l],
        B(c ? s / n * 100 : s / 100 * n)))
    }
    function li(t, e, r, i) {
        var n;
        r && "none" !== r || ((n = (s = $i(e, t, 1)) && W(t, s, 1)) && n !== r ? (e = s,
        r = n) : "borderColor" === e && (r = W(t, "borderTopColor")));
        var s, a, o, u, h, l, f, c, p, _ = new G(this._pt,t.style,e,0,1,yr), d = 0, m = 0;
        if (_.b = r,
        _.e = i,
        r += "",
        "auto" == (i += "") && (t.style[e] = i,
        i = W(t, e) || i,
        t.style[e] = r),
        Ft(s = [r, i]),
        i = s[1],
        a = (r = s[0]).match(Oe) || [],
        (i.match(Oe) || []).length) {
            for (; f = Oe.exec(i); )
                c = f[0],
                f = i.substring(d, f.index),
                u ? u = (u + 1) % 5 : "rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5) || (u = 1),
                c !== (h = a[m++] || "") && (o = parseFloat(h) || 0,
                p = h.substr((o + "").length),
                "=" === c.charAt(1) && (c = it(o, c) + p),
                l = parseFloat(c),
                c = c.substr((l + "").length),
                d = Oe.lastIndex - c.length,
                c || (c = c || N.units[e] || p,
                d === i.length && (i += c,
                _.e += c)),
                p !== c && (o = hi(t, e, h, c) || 0),
                _._pt = {
                    _next: _._pt,
                    p: f || 1 === m ? f : ",",
                    s: o,
                    c: l - o,
                    m: u && u < 4 || "zIndex" === e ? Math.round : 0
                });
            _.c = d < i.length ? i.substring(d, i.length) : ""
        } else
            _.r = "display" === e && "none" === i ? Vr : qr;
        return Ce.test(i) && (_.e = 0),
        this._pt = _
    }
    function fi(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r, i, n, s = e.t, a = s.style, o = e.u, e = s._gsap;
            if ("all" === o || !0 === o)
                a.cssText = "",
                i = 1;
            else
                for (n = (o = o.split(",")).length; -1 < --n; )
                    r = o[n],
                    Ni[r] && (i = 1,
                    r = "transformOrigin" === r ? Z : H),
                    oi(s, r);
            i && (oi(s, H),
            e) && (e.svg && s.removeAttribute("transform"),
            an(s, 1),
            e.uncache = 1,
            Jr(a))
        }
    }
    function ci(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }
    function pi(t) {
        t = W(t, H);
        return ci(t) ? nn : t.substr(7).match(Me).map(B)
    }
    function _i(t, e) {
        var r, i, n, s = t._gsap || rt(t), a = t.style, o = pi(t);
        return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (o = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? nn : o : (o !== nn || t.offsetParent || t === yi || s.svg || (i = a.display,
        a.display = "block",
        (s = t.parentNode) && t.offsetParent || (n = 1,
        r = t.nextElementSibling,
        yi.appendChild(t)),
        o = pi(t),
        i ? a.display = i : oi(t, "display"),
        n && (r ? s.insertBefore(t, r) : s ? s.appendChild(t) : yi.removeChild(t))),
        e && 6 < o.length ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o)
    }
    function di(t, e, r, i, n, s) {
        var a, o = t._gsap, n = n || _i(t, !0), u = o.xOrigin || 0, h = o.yOrigin || 0, l = o.xOffset || 0, f = o.yOffset || 0, c = n[0], p = n[1], _ = n[2], d = n[3], m = n[4], g = n[5], v = e.split(" "), y = parseFloat(v[0]) || 0, x = parseFloat(v[1]) || 0;
        r ? n !== nn && (n = c * d - p * _) && (a = y * (-p / n) + x * (c / n) - (c * g - p * m) / n,
        y = y * (d / n) + x * (-_ / n) + (_ * g - d * m) / n,
        x = a) : (y = (n = si(t)).x + (~v[0].indexOf("%") ? y / 100 * n.width : y),
        x = n.y + (~(v[1] || v[0]).indexOf("%") ? x / 100 * n.height : x)),
        i || !1 !== i && o.smooth ? (o.xOffset = l + ((m = y - u) * c + (g = x - h) * _) - m,
        o.yOffset = f + (m * p + g * d) - g) : o.xOffset = o.yOffset = 0,
        o.xOrigin = y,
        o.yOrigin = x,
        o.smooth = !!i,
        o.origin = e,
        o.originIsAbsolute = !!r,
        t.style[Z] = "0px 0px",
        s && (ui(s, o, "xOrigin", u, y),
        ui(s, o, "yOrigin", h, x),
        ui(s, o, "xOffset", l, o.xOffset),
        ui(s, o, "yOffset", f, o.yOffset)),
        t.setAttribute("data-svg-origin", y + " " + x)
    }
    function mi(t, e, r) {
        var i = X(e);
        return B(parseFloat(e) + parseFloat(hi(t, "x", r + "px", i))) + i
    }
    function gi(t, e) {
        for (var r in e)
            t[r] = e[r];
        return t
    }
    Q.version = R.version = l.version = "3.11.3",
    $t = 1,
    i() && je();
    var vi, yi, xi, Ti, wi, bi, Mi, e = E.Power0, Oi = E.Power1, ki = E.Power2, Ci = E.Power3, Ai = E.Power4, Di = E.Linear, Pi = E.Quad, Si = E.Cubic, Ei = E.Quart, Ri = E.Quint, zi = E.Strong, Fi = E.Elastic, Bi = E.Back, Li = E.SteppedEase, Ii = E.Bounce, Yi = E.Sine, Ui = E.Expo, Xi = E.Circ, Ni = {}, qi = 180 / Math.PI, Vi = Math.PI / 180, ji = Math.atan2, Qi = /([A-Z])/g, Gi = /(left|right|width|margin|padding|x)/i, Wi = /[\s,\(]\S/, Hi = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    }, H = "transform", Z = H + "Origin", Zi = "O,Moz,ms,Ms,Webkit".split(","), $i = function(t, e, r) {
        var i = (e || Ti).style
          , n = 5;
        if (t in i && !r)
            return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(Zi[n] + t in i); )
            ;
        return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? Zi[n] : "") + t
    }, Ji = {
        deg: 1,
        rad: 1,
        turn: 1
    }, Ki = {
        grid: 1,
        flex: 1
    }, tn = function(t, e, r, i) {
        var n;
        return xi || ri(),
        e in Hi && "transform" !== e && ~(e = Hi[e]).indexOf(",") && (e = e.split(",")[0]),
        Ni[e] && "transform" !== e ? (n = an(t, i),
        n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : on(W(t, Z)) + " " + n.zOrigin + "px") : (n = t.style[e]) && "auto" !== n && !i && !~(n + "").indexOf("calc(") || (n = rn[e] && rn[e](t, e, r) || W(t, e) || v(t, e) || ("opacity" === e ? 1 : 0)),
        r && !~(n + "").trim().indexOf(" ") ? hi(t, e, n, r) + r : n
    }, en = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, rn = {
        clearProps: function(t, e, r, i, n) {
            if ("isFromStart" !== n.data)
                return (e = t._pt = new G(t._pt,e,r,0,0,fi)).u = i,
                e.pr = -10,
                e.tween = n,
                t._props.push(r),
                1
        }
    }, nn = [1, 0, 0, 1, 0, 0], sn = {}, an = function(t, e) {
        var r, i, n, s, a, o, u, h, l, f, c, p, _, d, m, g, v, y, x, T, w, b, M, O, k, C, A, D, P, S, E, R, z = t._gsap || new Je(t);
        return "x"in z && !e && !z.uncache || (C = t.style,
        A = z.scaleX < 0,
        D = "deg",
        P = getComputedStyle(t),
        S = W(t, Z) || "0",
        E = r = i = s = a = o = u = h = 0,
        R = n = 1,
        z.svg = !(!t.getCTM || !ai(t)),
        P.translate && ("none" === P.translate && "none" === P.scale && "none" === P.rotate || (C[H] = ("none" !== P.translate ? "translate3d(" + (P.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== P.rotate ? "rotate(" + P.rotate + ") " : "") + ("none" !== P.scale ? "scale(" + P.scale.split(" ").join(",") + ") " : "") + ("none" !== P[H] ? P[H] : "")),
        C.scale = C.rotate = C.translate = "none"),
        P = _i(t, z.svg),
        z.svg && (v = z.uncache ? (y = t.getBBox(),
        S = z.xOrigin - y.x + "px " + (z.yOrigin - y.y) + "px",
        "") : !e && t.getAttribute("data-svg-origin"),
        di(t, v || S, !!v || z.originIsAbsolute, !1 !== z.smooth, P)),
        k = z.xOrigin || 0,
        M = z.yOrigin || 0,
        P !== nn && (c = P[0],
        p = P[1],
        _ = P[2],
        d = P[3],
        E = m = P[4],
        r = g = P[5],
        6 === P.length ? (R = Math.sqrt(c * c + p * p),
        n = Math.sqrt(d * d + _ * _),
        s = c || p ? ji(p, c) * qi : 0,
        (u = _ || d ? ji(_, d) * qi + s : 0) && (n *= Math.abs(Math.cos(u * Vi))),
        z.svg && (E -= k - (k * c + M * _),
        r -= M - (k * p + M * d))) : (k = P[6],
        M = P[7],
        T = P[8],
        w = P[9],
        b = P[10],
        O = P[11],
        E = P[12],
        r = P[13],
        i = P[14],
        a = (P = ji(k, b)) * qi,
        P && (v = m * (l = Math.cos(-P)) + T * (f = Math.sin(-P)),
        y = g * l + w * f,
        x = k * l + b * f,
        T = m * -f + T * l,
        w = g * -f + w * l,
        b = k * -f + b * l,
        O = M * -f + O * l,
        m = v,
        g = y,
        k = x),
        o = (P = ji(-_, b)) * qi,
        P && (l = Math.cos(-P),
        O = d * (f = Math.sin(-P)) + O * l,
        c = v = c * l - T * f,
        p = y = p * l - w * f,
        _ = x = _ * l - b * f),
        s = (P = ji(p, c)) * qi,
        P && (v = c * (l = Math.cos(P)) + p * (f = Math.sin(P)),
        y = m * l + g * f,
        p = p * l - c * f,
        g = g * l - m * f,
        c = v,
        m = y),
        a && 359.9 < Math.abs(a) + Math.abs(s) && (a = s = 0,
        o = 180 - o),
        R = B(Math.sqrt(c * c + p * p + _ * _)),
        n = B(Math.sqrt(g * g + k * k)),
        P = ji(m, g),
        u = 2e-4 < Math.abs(P) ? P * qi : 0,
        h = O ? 1 / (O < 0 ? -O : O) : 0),
        z.svg) && (v = t.getAttribute("transform"),
        z.forceCSS = t.setAttribute("transform", "") || !ci(W(t, H)),
        v) && t.setAttribute("transform", v),
        90 < Math.abs(u) && Math.abs(u) < 270 && (A ? (R *= -1,
        u += s <= 0 ? 180 : -180,
        s += s <= 0 ? 180 : -180) : (n *= -1,
        u += u <= 0 ? 180 : -180)),
        e = e || z.uncache,
        z.x = E - ((z.xPercent = E && (!e && z.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-E) ? -50 : 0))) ? t.offsetWidth * z.xPercent / 100 : 0) + "px",
        z.y = r - ((z.yPercent = r && (!e && z.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0))) ? t.offsetHeight * z.yPercent / 100 : 0) + "px",
        z.z = i + "px",
        z.scaleX = B(R),
        z.scaleY = B(n),
        z.rotation = B(s) + D,
        z.rotationX = B(a) + D,
        z.rotationY = B(o) + D,
        z.skewX = u + D,
        z.skewY = 0 + D,
        z.transformPerspective = h + "px",
        (z.zOrigin = parseFloat(S.split(" ")[2]) || 0) && (C[Z] = on(S)),
        z.xOffset = z.yOffset = 0,
        z.force3D = N.force3D,
        z.renderTransform = z.svg ? pn : Mi ? cn : un,
        z.uncache = 0),
        z
    }, on = function(t) {
        return (t = t.split(" "))[0] + " " + t[1]
    }, un = function(t, e) {
        e.z = "0px",
        e.rotationY = e.rotationX = "0deg",
        e.force3D = 0,
        cn(t, e)
    }, hn = "0deg", ln = "0px", fn = ") ", cn = function(t, e) {
        var r, i, e = e || this, n = e.xPercent, s = e.yPercent, a = e.x, o = e.y, u = e.z, h = e.rotation, l = e.rotationY, f = e.rotationX, c = e.skewX, p = e.skewY, _ = e.scaleX, d = e.scaleY, m = e.transformPerspective, g = e.force3D, v = e.target, e = e.zOrigin, y = "", t = "auto" === g && t && 1 !== t || !0 === g;
        !e || f === hn && l === hn || (g = parseFloat(l) * Vi,
        i = Math.sin(g),
        r = Math.cos(g),
        g = parseFloat(f) * Vi,
        a = mi(v, a, i * (i = Math.cos(g)) * -e),
        o = mi(v, o, -Math.sin(g) * -e),
        u = mi(v, u, r * i * -e + e)),
        m !== ln && (y += "perspective(" + m + fn),
        (n || s) && (y += "translate(" + n + "%, " + s + "%) "),
        !t && a === ln && o === ln && u === ln || (y += u !== ln || t ? "translate3d(" + a + ", " + o + ", " + u + ") " : "translate(" + a + ", " + o + fn),
        h !== hn && (y += "rotate(" + h + fn),
        l !== hn && (y += "rotateY(" + l + fn),
        f !== hn && (y += "rotateX(" + f + fn),
        c === hn && p === hn || (y += "skew(" + c + ", " + p + fn),
        1 === _ && 1 === d || (y += "scale(" + _ + ", " + d + fn),
        v.style[H] = y || "translate(0, 0)"
    }, pn = function(t, e) {
        var r, i, n, s, a, e = e || this, o = e.xPercent, u = e.yPercent, h = e.x, l = e.y, f = e.rotation, c = e.skewX, p = e.skewY, _ = e.scaleX, d = e.scaleY, m = e.target, g = e.xOrigin, v = e.yOrigin, y = e.xOffset, x = e.yOffset, e = e.forceCSS, T = parseFloat(h), w = parseFloat(l), f = parseFloat(f), c = parseFloat(c);
        (p = parseFloat(p)) && (c += p = parseFloat(p),
        f += p),
        f || c ? (f *= Vi,
        c *= Vi,
        r = Math.cos(f) * _,
        i = Math.sin(f) * _,
        n = Math.sin(f - c) * -d,
        s = Math.cos(f - c) * d,
        c && (p *= Vi,
        a = Math.tan(c - p),
        n *= a = Math.sqrt(1 + a * a),
        s *= a,
        p) && (a = Math.tan(p),
        r *= a = Math.sqrt(1 + a * a),
        i *= a),
        r = B(r),
        i = B(i),
        n = B(n),
        s = B(s)) : (r = _,
        s = d,
        i = n = 0),
        (T && !~(h + "").indexOf("px") || w && !~(l + "").indexOf("px")) && (T = hi(m, "x", h, "px"),
        w = hi(m, "y", l, "px")),
        (g || v || y || x) && (T = B(T + g - (g * r + v * n) + y),
        w = B(w + v - (g * i + v * s) + x)),
        (o || u) && (T = B(T + o / 100 * (a = m.getBBox()).width),
        w = B(w + u / 100 * a.height)),
        m.setAttribute("transform", a = "matrix(" + r + "," + i + "," + n + "," + s + "," + T + "," + w + ")"),
        e && (m.style[H] = a)
    };
    p("padding,margin,Width,Radius", function(e, r) {
        var t = "Right"
          , i = "Bottom"
          , n = "Left"
          , o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(function(t) {
            return r < 2 ? e + t : "border" + t + e
        });
        rn[1 < r ? "border" + e : e] = function(e, t, r, i, n) {
            var s, a;
            if (arguments.length < 4)
                return s = o.map(function(t) {
                    return tn(e, t, r)
                }),
                5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a;
            s = (i + "").split(" "),
            a = {},
            o.forEach(function(t, e) {
                return a[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
            }),
            e.init(t, a, n)
        }
    });
    var _n, dn = {
        name: "css",
        register: ri,
        targetTest: function(t) {
            return t.style && t.nodeType
        },
        init: function(t, e, r, i, n) {
            var s, a, o, u, h, l, f, c, p, B, _, d, L, m, g, v, I, y, x, T, w, Y = this._props, b = t.style, M = r.vars.startAt;
            for (h in xi || ri(),
            this.styles = this.styles || ti(t),
            m = this.styles.props,
            this.tween = r,
            e)
                if ("autoRound" !== h && (a = e[h],
                !j[h] || !ir(h, e, r, i, t, n)))
                    if (c = typeof a,
                    u = rn[h],
                    "function" === c && (c = typeof (a = a.call(r, i, t, n))),
                    "string" === c && ~a.indexOf("random(") && (a = At(a)),
                    u)
                        u(this, t, h, a, r) && (L = 1);
                    else if ("--" === h.substr(0, 2))
                        s = (getComputedStyle(t).getPropertyValue(h) + "").trim(),
                        a += "",
                        qe.lastIndex = 0,
                        qe.test(s) || (l = X(s),
                        f = X(a)),
                        f ? l !== f && (s = hi(t, h, s, f) + f) : l && (a += l),
                        this.add(b, "setProperty", s, a, i, n, 0, 0, h),
                        Y.push(h),
                        m.push(h, 0, b[h]);
                    else if ("undefined" !== c) {
                        if (M && h in M && (X((s = U(s = "function" == typeof M[h] ? M[h].call(r, i, t, n) : M[h]) && ~s.indexOf("random(") ? At(s) : s) + "") || (s += N.units[h] || X(tn(t, h)) || ""),
                        "=" !== (s + "").charAt(1)) || (s = tn(t, h)),
                        u = parseFloat(s),
                        (c = "string" === c && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)),
                        o = parseFloat(a),
                        p = (h = h in Hi && ("autoAlpha" === h && (1 === u && "hidden" === tn(t, "visibility") && o && (u = 0),
                        m.push("visibility", 0, b.visibility),
                        ui(this, b, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)),
                        "scale" !== h) && "transform" !== h && ~(h = Hi[h]).indexOf(",") ? h.split(",")[0] : h)in Ni)
                            if (this.styles.save(h),
                            B || ((_ = t._gsap).renderTransform && !e.parseTransform || an(t, e.parseTransform),
                            d = !1 !== e.smoothOrigin && _.smooth,
                            (B = this._pt = new G(this._pt,b,H,0,1,_.renderTransform,_,0,-1)).dep = 1),
                            "scale" === h)
                                this._pt = new G(this._pt,_,"scaleY",u,(c ? it(u, c + o) : o) - u || 0,Yr),
                                this._pt.u = 0,
                                Y.push("scaleY", h),
                                h += "X";
                            else {
                                if ("transformOrigin" === h) {
                                    m.push(Z, 0, b[Z]),
                                    w = T = x = void 0,
                                    x = (y = a).split(" "),
                                    T = x[0],
                                    w = x[1] || "50%",
                                    "top" !== T && "bottom" !== T && "left" !== w && "right" !== w || (y = T,
                                    T = w,
                                    w = y),
                                    x[0] = en[T] || T,
                                    x[1] = en[w] || w,
                                    a = x.join(" "),
                                    _.svg ? di(t, a, 0, d, 0, this) : ((f = parseFloat(a.split(" ")[2]) || 0) !== _.zOrigin && ui(this, _, "zOrigin", _.zOrigin, f),
                                    ui(this, b, h, on(s), on(a)));
                                    continue
                                }
                                if ("svgOrigin" === h) {
                                    di(t, a, 1, d, 0, this);
                                    continue
                                }
                                if (h in sn) {
                                    y = this,
                                    T = _,
                                    w = h,
                                    x = u,
                                    g = c ? it(u, c + a) : a,
                                    I = v = E = F = void 0,
                                    F = 360,
                                    E = U(g),
                                    v = parseFloat(g) * (E && ~g.indexOf("rad") ? qi : 1) - x,
                                    I = x + v + "deg",
                                    E && ("short" === (E = g.split("_")[1]) && (v %= F) != v % 180 && (v += v < 0 ? F : -F),
                                    "cw" === E && v < 0 ? v = (v + 36e9) % F - ~~(v / F) * F : "ccw" === E && 0 < v && (v = (v - 36e9) % F - ~~(v / F) * F)),
                                    y._pt = g = new G(y._pt,T,w,x,v,Ur),
                                    g.e = I,
                                    g.u = "deg",
                                    y._props.push(w);
                                    continue
                                }
                                if ("smoothOrigin" === h) {
                                    ui(this, _, "smooth", _.smooth, a);
                                    continue
                                }
                                if ("force3D" === h) {
                                    _[h] = a;
                                    continue
                                }
                                if ("transform" === h) {
                                    F = z = P = A = D = C = k = O = R = E = S = void 0;
                                    var O, k, C, A, D, P, S = this, E = a, R = t, z = gi({}, R._gsap), F = R.style;
                                    for (k in z.svg ? (C = R.getAttribute("transform"),
                                    R.setAttribute("transform", ""),
                                    F[H] = E,
                                    O = an(R, 1),
                                    oi(R, H),
                                    R.setAttribute("transform", C)) : (C = getComputedStyle(R)[H],
                                    F[H] = E,
                                    O = an(R, 1),
                                    F[H] = C),
                                    Ni)
                                        (C = z[k]) !== (D = O[k]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(k) < 0 && (A = X(C) !== (P = X(D)) ? hi(R, k, C, P) : parseFloat(C),
                                        D = parseFloat(D),
                                        S._pt = new G(S._pt,O,k,A,D - A,Yr),
                                        S._pt.u = P || 0,
                                        S._props.push(k));
                                    gi(O, z);
                                    continue
                                }
                            }
                        else
                            h in b || (h = $i(h) || h);
                        if (p || (o || 0 === o) && (u || 0 === u) && !Wi.test(a) && h in b)
                            o = o || 0,
                            (l = (s + "").substr((u + "").length)) !== (f = X(a) || (h in N.units ? N.units[h] : l)) && (u = hi(t, h, s, f)),
                            this._pt = new G(this._pt,p ? _ : b,h,u,(c ? it(u, c + o) : o) - u,p || "px" !== f && "zIndex" !== h || !1 === e.autoRound ? Yr : Nr),
                            this._pt.u = f || 0,
                            l !== f && "%" !== f && (this._pt.b = s,
                            this._pt.r = Xr);
                        else if (h in b)
                            li.call(this, t, h, s, c ? c + a : a);
                        else {
                            if (!(h in t)) {
                                K(h, a);
                                continue
                            }
                            this.add(t, h, s || t[h], c ? c + a : a, i, n)
                        }
                        p || (h in b ? m.push(h, 0, b[h]) : m.push(h, 1, s || t[h])),
                        Y.push(h)
                    }
            L && Mr(this)
        },
        render: function(t, e) {
            if (e.tween._time || !bi())
                for (var r = e._pt; r; )
                    r.r(t, r.d),
                    r = r._next;
            else
                e.styles.revert()
        },
        get: tn,
        aliases: Hi,
        getSetter: function(t, e, r) {
            var i = Hi[e];
            return (e = i && i.indexOf(",") < 0 ? i : e)in Ni && e !== Z && (t._gsap.x || tn(t, "x")) ? r && wi === r ? "scale" === e ? Wr : Gr : (wi = r || {}) && ("scale" === e ? Hr : Zr) : t.style && !s(t.style[e]) ? jr : ~e.indexOf("-") ? Qr : br(t, e)
        },
        core: {
            _removeProperty: oi,
            _getMatrix: _i
        }
    }, mn = (l.utils.checkPrefix = $i,
    l.core.getStyleSaver = ti,
    _n = p("x,y,z,scale,scaleX,scaleY,xPercent,yPercent" + "," + (mn = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(t) {
        Ni[t] = 1
    }),
    p(mn, function(t) {
        N.units[t] = "deg",
        sn[t] = 1
    }),
    Hi[_n[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + mn,
    p("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(t) {
        t = t.split(":");
        Hi[t[1]] = _n[t[0]]
    }),
    p("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
        N.units[t] = "px"
    }),
    l.registerPlugin(dn),
    l.registerPlugin(dn) || l), gn = mn.core.Tween;
    t.Back = Bi,
    t.Bounce = Ii,
    t.CSSPlugin = dn,
    t.Circ = Xi,
    t.Cubic = Si,
    t.Elastic = Fi,
    t.Expo = Ui,
    t.Linear = Di,
    t.Power0 = e,
    t.Power1 = Oi,
    t.Power2 = ki,
    t.Power3 = Ci,
    t.Power4 = Ai,
    t.Quad = Pi,
    t.Quart = Ei,
    t.Quint = Ri,
    t.Sine = Yi,
    t.SteppedEase = Li,
    t.Strong = zi,
    t.TimelineLite = R,
    t.TimelineMax = R,
    t.TweenLite = Q,
    t.TweenMax = gn,
    t.default = mn,
    t.gsap = mn,
    "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
});
/*!
 * ScrollTrigger 3.11.3
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
( (e, t) => {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}
)(this, function(e) {
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    function o() {
        return Pe || "undefined" != typeof window && (Pe = window.gsap) && Pe.registerPlugin && Pe
    }
    function rt(e, t) {
        return ~Re.indexOf(e) && Re[Re.indexOf(e) + 1][t]
    }
    function ot(e) {
        return !!~i.indexOf(e)
    }
    function Ee(e, t, n, r, o) {
        e.addEventListener(t, n, {
            passive: !r,
            capture: !!o
        })
    }
    function Te(e, t, n, r) {
        e.removeEventListener(t, n, !!r)
    }
    function it() {
        return Ce && Ce.isPressed || De.cache++
    }
    function a(n, r) {
        function o(e) {
            var t;
            return e || 0 === e ? (u && (Me.history.scrollRestoration = "manual"),
            t = Ce && Ce.isPressed,
            e = o.v = Math.round(e) || (Ce && Ce.iOS ? 1 : 0),
            n(e),
            o.cacheID = De.cache,
            t && f("ss", e)) : (r || De.cache !== o.cacheID || f("ref")) && (o.cacheID = De.cache,
            o.v = n()),
            o.v + o.offset
        }
        return o.offset = 0,
        n && o
    }
    function Oe(e) {
        return Pe.utils.toArray(e)[0] || ("string" == typeof e && !1 !== Pe.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
    }
    function at(t, e) {
        var n = e.s
          , e = e.sc
          , r = (ot(t) && (t = pt.scrollingElement || ht),
        De.indexOf(t))
          , o = e === Ye.sc ? 1 : 2
          , i = (~r || (r = De.push(t) - 1),
        De[r + o] || t.addEventListener("scroll", it),
        De[r + o])
          , r = i || (De[r + o] = a(rt(t, n), !0) || (ot(t) ? e : a(function(e) {
            return arguments.length ? t[n] = e : t[n]
        })));
        return r.target = t,
        i || (r.smooth = "smooth" === Pe.getProperty(t, "scrollBehavior")),
        r
    }
    function st(e, t, o) {
        function i(e, t) {
            var n = xt();
            t || r < n - l ? (s = a,
            a = e,
            c = l,
            l = n) : o ? a += e : a = s + (e - s) / (n - c) * (l - c)
        }
        var a = e
          , s = e
          , l = xt()
          , c = l
          , r = t || 50
          , u = Math.max(500, 3 * r);
        return {
            update: i,
            reset: function() {
                s = a = o ? 0 : a,
                c = l = 0
            },
            getVelocity: function(e) {
                var t = c
                  , n = s
                  , r = xt();
                return !e && 0 !== e || e === a || i(e),
                l === c || u < r - c ? 0 : (a + (o ? n : -n)) / ((o ? r : l) - t) * 1e3
            }
        }
    }
    function lt(e, t) {
        return t && !e._gsapAllow && e.preventDefault(),
        e.changedTouches ? e.changedTouches[0] : e
    }
    function ct(e) {
        var t = Math.max.apply(Math, e)
          , e = Math.min.apply(Math, e);
        return Math.abs(t) >= Math.abs(e) ? t : e
    }
    function ut() {
        var e, n, t;
        (yt = Pe.core.globals().ScrollTrigger) && yt.core && (e = yt.core,
        n = e.bridge || {},
        t = e._scrollers,
        e = e._proxies,
        t.push.apply(t, De),
        e.push.apply(e, Re),
        De = t,
        Re = e,
        f = function(e, t) {
            return n[e](t)
        }
        )
    }
    function ft(e) {
        return (Pe = e || o()) && "undefined" != typeof document && document.body && (Me = window,
        ht = (pt = document).documentElement,
        i = [Me, pt, ht, gt = pt.body],
        Pe.utils.clamp,
        mt = "onpointerenter"in gt ? "pointer" : "mouse",
        vt = M.isTouch = Me.matchMedia && Me.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in Me || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 2 : 0,
        Ae = M.eventTypes = ("ontouchstart"in ht ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in ht ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
        setTimeout(function() {
            return u = 0
        }, 500),
        ut(),
        dt = 1),
        dt
    }
    var Pe, dt, Me, pt, ht, gt, vt, mt, yt, i, Ce, Ae, s, l, c, u = 1, bt = [], De = [], Re = [], xt = Date.now, f = function(e, t) {
        return t
    }, d = "scrollLeft", p = "scrollTop", Ie = {
        s: d,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: a(function(e) {
            return arguments.length ? Me.scrollTo(e, Ye.sc()) : Me.pageXOffset || pt[d] || ht[d] || gt[d] || 0
        })
    }, Ye = {
        s: p,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: Ie,
        sc: a(function(e) {
            return arguments.length ? Me.scrollTo(Ie.sc(), e) : Me.pageYOffset || pt[p] || ht[p] || gt[p] || 0
        })
    }, M = (Ie.op = Ye,
    De.cache = 0,
    h.prototype.init = function(e) {
        dt || ft(Pe) || console.warn("Please gsap.registerPlugin(Observer)"),
        yt || ut();
        var o = e.tolerance
          , i = e.dragMinimum
          , t = e.type
          , r = e.target
          , n = e.lineHeight
          , a = e.debounce
          , s = e.preventDefault
          , l = e.onStop
          , X = e.onStopDelay
          , c = e.ignore
          , u = e.wheelSpeed
          , z = e.event
          , B = e.onDragStart
          , F = e.onDragEnd
          , L = e.onDrag
          , H = e.onPress
          , N = e.onRelease
          , W = e.onRight
          , q = e.onLeft
          , V = e.onUp
          , j = e.onDown
          , G = e.onChangeX
          , U = e.onChangeY
          , K = e.onChange
          , Z = e.onToggleX
          , $ = e.onToggleY
          , J = e.onHover
          , Q = e.onHoverEnd
          , f = e.onMove
          , ee = e.ignoreCheck
          , d = e.isNormalizer
          , te = e.onGestureStart
          , ne = e.onGestureEnd
          , re = e.onWheel
          , oe = e.onEnable
          , ie = e.onDisable
          , ae = e.onClick
          , p = e.scrollSpeed
          , h = e.capture
          , se = e.allowClicks
          , le = e.lockAxis
          , ce = e.onLockAxis;
        function ue() {
            return ke = xt()
        }
        function g(e, t) {
            return (E.event = e) && c && ~c.indexOf(e.target) || t && Se && "touch" !== e.pointerType || ee && ee(e, t)
        }
        function v() {
            var e = E.deltaX = ct(D)
              , t = E.deltaY = ct(R)
              , n = Math.abs(e) >= o
              , r = Math.abs(t) >= o;
            K && (n || r) && K(E, e, t, D, R),
            n && (W && 0 < E.deltaX && W(E),
            q && E.deltaX < 0 && q(E),
            G && G(E),
            Z && E.deltaX < 0 != T < 0 && Z(E),
            T = E.deltaX,
            D[0] = D[1] = D[2] = 0),
            r && (j && 0 < E.deltaY && j(E),
            V && E.deltaY < 0 && V(E),
            U && U(E),
            $ && E.deltaY < 0 != P < 0 && $(E),
            P = E.deltaY,
            R[0] = R[1] = R[2] = 0),
            (w || x) && (f && f(E),
            x && (L(E),
            x = !1),
            w = !1),
            S && (S = !1,
            ce) && ce(E),
            _ && (re(E),
            _ = !1),
            b = 0
        }
        function fe(e, t, n) {
            D[n] += e,
            R[n] += t,
            E._vx.update(e),
            E._vy.update(t),
            a ? b = b || requestAnimationFrame(v) : v()
        }
        function de(e, t) {
            le && !k && (E.axis = k = Math.abs(e) > Math.abs(t) ? "x" : "y",
            S = !0),
            "y" !== k && (D[2] += e,
            E._vx.update(e, !0)),
            "x" !== k && (R[2] += t,
            E._vy.update(t, !0)),
            a ? b = b || requestAnimationFrame(v) : v()
        }
        function m(e) {
            var t, n, r, o;
            !g(e, 1) && (n = (t = (e = lt(e, s)).clientX) - E.x,
            r = (e = e.clientY) - E.y,
            o = E.isDragging,
            E.x = t,
            E.y = e,
            o || Math.abs(E.startX - t) >= i || Math.abs(E.startY - e) >= i) && (L && (x = !0),
            o || (E.isDragging = !0),
            de(n, r),
            o || B && B(E))
        }
        function y(t) {
            var e, n;
            g(t, 1) || (Te(d ? r : A, Ae[1], m, !0),
            e = E.isDragging && (3 < Math.abs(E.x - E.startX) || 3 < Math.abs(E.y - E.startY)),
            n = lt(t),
            e || (E._vx.reset(),
            E._vy.reset(),
            s && se && Pe.delayedCall(.08, function() {
                var e;
                300 < xt() - ke && !t.defaultPrevented && (t.target.click ? t.target.click() : A.createEvent && ((e = A.createEvent("MouseEvents")).initMouseEvent("click", !0, !0, Me, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null),
                t.target.dispatchEvent(e)))
            })),
            E.isDragging = E.isGesturing = E.isPressed = !1,
            l && !d && Y.restart(!0),
            F && e && F(E),
            N && N(E, e))
        }
        function pe(e) {
            return e.touches && 1 < e.touches.length && (E.isGesturing = !0,
            te(e, E.isDragging))
        }
        function he() {
            return E.isGesturing = !1,
            ne(E)
        }
        function ge(e) {
            var t;
            g(e) || (e = M(),
            t = C(),
            fe((e - we) * p, (t - _e) * p, 1),
            we = e,
            _e = t,
            l && Y.restart(!0))
        }
        function ve(e) {
            var t;
            g(e) || (e = lt(e, s),
            re && (_ = !0),
            t = (1 === e.deltaMode ? n : 2 === e.deltaMode ? Me.innerHeight : 1) * u,
            fe(e.deltaX * t, e.deltaY * t, 0),
            l && !d && Y.restart(!0))
        }
        function me(e) {
            var t, n, r;
            !g(e) && (n = (t = e.clientX) - E.x,
            r = (e = e.clientY) - E.y,
            E.x = t,
            E.y = e,
            w = !0,
            n || r) && de(n, r)
        }
        function ye(e) {
            E.event = e,
            J(E)
        }
        function be(e) {
            E.event = e,
            Q(E)
        }
        function xe(e) {
            return g(e) || lt(e, s) && ae(E)
        }
        this.target = r = Oe(r) || ht,
        this.vars = e;
        var b, x, w, _, S, k, c = c && Pe.utils.toArray(c), o = o || 1e-9, i = i || 0, u = u || 1, p = p || 1, t = t || "wheel,touch,pointer", a = !1 !== a, n = n || parseFloat(Me.getComputedStyle(gt).lineHeight) || 22, E = this, T = 0, P = 0, M = at(r, Ie), C = at(r, Ye), we = M(), _e = C(), Se = ~t.indexOf("touch") && !~t.indexOf("pointer") && "pointerdown" === Ae[0], O = ot(r), A = r.ownerDocument || pt, D = [0, 0, 0], R = [0, 0, 0], ke = 0, I = E.onPress = function(e) {
            g(e, 1) || (E.axis = k = null,
            Y.pause(),
            E.isPressed = !0,
            e = lt(e),
            T = P = 0,
            E.startX = E.x = e.clientX,
            E.startY = E.y = e.clientY,
            E._vx.reset(),
            E._vy.reset(),
            Ee(d ? r : A, Ae[1], m, s, !0),
            E.deltaX = E.deltaY = 0,
            H && H(E))
        }
        , Y = E._dc = Pe.delayedCall(X || .25, function() {
            E._vx.reset(),
            E._vy.reset(),
            Y.pause(),
            l && l(E)
        }).pause();
        E.deltaX = E.deltaY = 0,
        E._vx = st(0, 50, !0),
        E._vy = st(0, 50, !0),
        E.scrollX = M,
        E.scrollY = C,
        E.isDragging = E.isGesturing = E.isPressed = !1,
        E.enable = function(e) {
            return E.isEnabled || (Ee(O ? A : r, "scroll", it),
            0 <= t.indexOf("scroll") && Ee(O ? A : r, "scroll", ge, s, h),
            0 <= t.indexOf("wheel") && Ee(r, "wheel", ve, s, h),
            (0 <= t.indexOf("touch") && vt || 0 <= t.indexOf("pointer")) && (Ee(r, Ae[0], I, s, h),
            Ee(A, Ae[2], y),
            Ee(A, Ae[3], y),
            se && Ee(r, "click", ue, !1, !0),
            ae && Ee(r, "click", xe),
            te && Ee(A, "gesturestart", pe),
            ne && Ee(A, "gestureend", he),
            J && Ee(r, mt + "enter", ye),
            Q && Ee(r, mt + "leave", be),
            f) && Ee(r, mt + "move", me),
            E.isEnabled = !0,
            e && e.type && I(e),
            oe && oe(E)),
            E
        }
        ,
        E.disable = function() {
            E.isEnabled && (bt.filter(function(e) {
                return e !== E && ot(e.target)
            }).length || Te(O ? A : r, "scroll", it),
            E.isPressed && (E._vx.reset(),
            E._vy.reset(),
            Te(d ? r : A, Ae[1], m, !0)),
            Te(O ? A : r, "scroll", ge, h),
            Te(r, "wheel", ve, h),
            Te(r, Ae[0], I, h),
            Te(A, Ae[2], y),
            Te(A, Ae[3], y),
            Te(r, "click", ue, !0),
            Te(r, "click", xe),
            Te(A, "gesturestart", pe),
            Te(A, "gestureend", he),
            Te(r, mt + "enter", ye),
            Te(r, mt + "leave", be),
            Te(r, mt + "move", me),
            E.isEnabled = E.isPressed = E.isDragging = !1,
            ie) && ie(E)
        }
        ,
        E.kill = function() {
            E.disable();
            var e = bt.indexOf(E);
            0 <= e && bt.splice(e, 1),
            Ce === E && (Ce = 0)
        }
        ,
        bt.push(E),
        d && ot(r) && (Ce = E),
        E.enable(z)
    }
    ,
    s = h,
    (l = [{
        key: "velocityX",
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function() {
            return this._vy.getVelocity()
        }
    }]) && r(s.prototype, l),
    c && r(s, c),
    h);
    function h(e) {
        this.init(e)
    }
    function g() {
        return Kt = 1
    }
    function v() {
        return Kt = 0
    }
    function Xe(e) {
        return e
    }
    function wt(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    }
    function m() {
        return "undefined" != typeof window
    }
    function y() {
        return Ne || m() && (Ne = window.gsap) && Ne.registerPlugin && Ne
    }
    function _t(e) {
        return !!~A.indexOf(e)
    }
    function St(e) {
        return rt(e, "getBoundingClientRect") || (_t(e) ? function() {
            return yn.width = We.innerWidth,
            yn.height = We.innerHeight,
            yn
        }
        : function() {
            return Wt(e)
        }
        )
    }
    function kt(e, t) {
        t.s;
        var n, r = t.d2, o = t.d, t = t.a;
        return (n = "scroll" + r) && (t = rt(e, n)) ? t() - St(e)()[o] : _t(e) ? (Ve[n] || je[n]) - (We["inner" + r] || Ve["client" + r] || je["client" + r]) : e[n] - e["offset" + r]
    }
    function b(e, t) {
        for (var n = 0; n < z.length; n += 3)
            t && !~t.indexOf(z[n + 1]) || e(z[n], z[n + 1], z[n + 2])
    }
    function ze(e) {
        return "string" == typeof e
    }
    function Be(e) {
        return "function" == typeof e
    }
    function Et(e) {
        return "number" == typeof e
    }
    function Tt(e) {
        return "object" == typeof e
    }
    function Pt(e, t, n) {
        e && e.progress(t ? 0 : 1) && n && e.pause()
    }
    function Mt(e, t) {
        e.enabled && (t = t(e)) && t.totalTime && (e.callbackAnimation = t)
    }
    function Fe(e) {
        return We.getComputedStyle(e)
    }
    function Ct(e, t) {
        for (var n in t)
            n in e || (e[n] = t[n]);
        return e
    }
    function Ot(e, t) {
        t = t.d2;
        return e["offset" + t] || e["client" + t] || 0
    }
    function At(e) {
        var t, n = [], r = e.labels, o = e.duration();
        for (t in r)
            n.push(r[t] / o);
        return n
    }
    function Dt(o) {
        var i = Ne.utils.snap(o)
          , a = Array.isArray(o) && o.slice(0).sort(function(e, t) {
            return e - t
        });
        return a ? function(e, t, n) {
            var r;
            if (void 0 === n && (n = .001),
            !t)
                return i(e);
            if (0 < t) {
                for (e -= n,
                r = 0; r < a.length; r++)
                    if (a[r] >= e)
                        return a[r];
                return a[r - 1]
            }
            for (r = a.length,
            e += n; r--; )
                if (a[r] <= e)
                    return a[r];
            return a[0]
        }
        : function(e, t, n) {
            void 0 === n && (n = .001);
            var r = i(e);
            return !t || Math.abs(r - e) < n || r - e < 0 == t < 0 ? r : i(t < 0 ? e - o : e + o)
        }
    }
    function x(t, n, e, r) {
        e.split(",").forEach(function(e) {
            return t(n, e, r)
        })
    }
    function Le(e, t, n, r, o) {
        return e.addEventListener(t, n, {
            passive: !r,
            capture: !!o
        })
    }
    function He(e, t, n, r) {
        return e.removeEventListener(t, n, !!r)
    }
    function w(e, t, n) {
        n && n.wheelHandler && e(t, "wheel", n)
    }
    function Rt(e, t) {
        var n, r;
        return ze(e) && (r = ~(n = e.indexOf("=")) ? (e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0,
        ~n && (e.indexOf("%") > n && (r *= t / 100),
        e = e.substr(0, n - 1)),
        e = r + (e in U ? U[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)),
        e
    }
    function It(e, t, n, r, o, i, a, s) {
        var l = o.startColor
          , c = o.endColor
          , u = o.fontSize
          , f = o.indent
          , o = o.fontWeight
          , d = qe.createElement("div")
          , p = _t(n) || "fixed" === rt(n, "pinType")
          , h = -1 !== e.indexOf("scroller")
          , n = p ? je : n
          , g = -1 !== e.indexOf("start")
          , l = g ? l : c
          , c = "border-color:" + l + ";font-size:" + u + ";color:" + l + ";font-weight:" + o + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return c += "position:" + ((h || s) && p ? "fixed;" : "absolute;"),
        !h && !s && p || (c += (r === Ye ? j : G) + ":" + (i + parseFloat(f)) + "px;"),
        a && (c += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
        d._isStart = g,
        d.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
        d.style.cssText = c,
        d.innerText = t || 0 === t ? e + "-" + t : e,
        n.children[0] ? n.insertBefore(d, n.children[0]) : n.appendChild(d),
        d._offset = d["offset" + r.op.d2],
        P(d, 0, r, g),
        d
    }
    function _() {
        return 34 < Ze() - $e && (q = q || requestAnimationFrame(Q))
    }
    function Yt() {
        t && t.isPressed && !(t.startX > je.clientWidth) || (De.cache++,
        t ? q = q || requestAnimationFrame(Q) : Q(),
        $e || $("scrollStart"),
        $e = Ze())
    }
    function S() {
        H = We.innerWidth,
        L = We.innerHeight
    }
    function Xt() {
        De.cache++,
        Ge || B || qe.fullscreenElement || qe.webkitFullscreenElement || F && H === We.innerWidth && !(Math.abs(We.innerHeight - L) > .25 * We.innerHeight) || D.restart(!0)
    }
    function zt() {
        return He(C, "scrollEnd", zt) || qt(!0)
    }
    function k(e) {
        for (var t = 0; t < n.length; t += 5)
            (!e || n[t + 4] && n[t + 4].query === e) && (n[t].style.cssText = n[t + 1],
            n[t].getBBox && n[t].setAttribute("transform", n[t + 2] || ""),
            n[t + 3].uncache = 1)
    }
    function E(e, t) {
        var n;
        for (Ue = 0; Ue < tt.length; Ue++)
            !(n = tt[Ue]) || t && n._ctx !== t || (e ? n.kill(1) : n.revert(!0, !0));
        t && k(t),
        t || $("revert")
    }
    function T(e, t) {
        De.cache++,
        !t && Ke || De.forEach(function(e) {
            return Be(e) && e.cacheID++ && (e.rec = 0)
        }),
        ze(e) && (We.history.scrollRestoration = W = e)
    }
    function Bt(e, t, n, r) {
        if (!e._gsap.swappedIn) {
            for (var o, i = ee.length, a = t.style, s = e.style; i--; )
                a[o = ee[i]] = n[o];
            a.position = "absolute" === n.position ? "absolute" : "relative",
            "inline" === n.display && (a.display = "inline-block"),
            s[G] = s[j] = "auto",
            a.flexBasis = n.flexBasis || "auto",
            a.overflow = "visible",
            a.boxSizing = "border-box",
            a[an] = Ot(e, Ie) + et,
            a[sn] = Ot(e, Ye) + et,
            a[Je] = s[Qe] = s.top = s.left = "0",
            Vt(r),
            s[an] = s.maxWidth = n[an],
            s[sn] = s.maxHeight = n[sn],
            s[Je] = n[Je],
            e.parentNode !== t && (e.parentNode.insertBefore(t, e),
            t.appendChild(e)),
            e._gsap.swappedIn = !0
        }
    }
    function Ft(e) {
        for (var t = te.length, n = e.style, r = [], o = 0; o < t; o++)
            r.push(te[o], n[te[o]]);
        return r.t = e,
        r
    }
    function Lt(e, t, n, r, o, i, a, s, l, c, u, f, d) {
        ze(e = Be(e) ? e(s) : e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? Rt("0" + e.substr(3), n) : 0));
        var p, h, g, v = d ? d.time() : 0;
        return d && d.seek(0),
        Et(e) ? a && P(a, n, r, !0) : (Be(t) && (t = t(s)),
        s = (e || "0").split(" "),
        h = Oe(t) || je,
        (t = Wt(h) || {}) && (t.left || t.top) || "none" !== Fe(h).display || (p = h.style.display,
        h.style.display = "block",
        t = Wt(h),
        p ? h.style.display = p : h.style.removeProperty("display")),
        p = Rt(s[0], t[r.d]),
        s = Rt(s[1] || "0", n),
        e = t[r.p] - l[r.p] - c + p + o - s,
        a && P(a, s, r, n - s < 20 || a._isStart && 20 < s),
        n -= n - s),
        i && (t = i._isStart,
        g = "scroll" + r.d2,
        P(i, c = e + n, r, t && 20 < c || !t && (u ? Math.max(je[g], Ve[g]) : i.parentNode[g]) <= c + 1),
        u) && (l = Wt(a),
        u) && (i.style[r.op.p] = l[r.op.p] - r.op.m - i._offset + et),
        d && h && (g = Wt(h),
        d.seek(f),
        p = Wt(h),
        d._caScrollDist = g[r.p] - p[r.p],
        e = e / d._caScrollDist * f),
        d && d.seek(v),
        d ? e : Math.round(e)
    }
    function Ht(e, t, n, r) {
        if (e.parentNode !== t) {
            var o, i, a = e.style;
            if (t === je) {
                for (o in e._stOrig = a.cssText,
                i = Fe(e))
                    +o || re.test(o) || !i[o] || "string" != typeof a[o] || "0" === o || (a[o] = i[o]);
                a.top = n,
                a.left = r
            } else
                a.cssText = e._stOrig;
            Ne.core.getCache(e).uncache = 1,
            t.appendChild(e)
        }
    }
    function Nt(s, e) {
        function l(e, t, n, r, o) {
            var i = l.tween
              , a = t.onComplete;
            return n = n || f(),
            o = r && o || 0,
            r = r || e - n,
            i && i.kill(),
            c = Math.round(n),
            t[d] = e,
            (t.modifiers = {})[d] = function(e) {
                return (e = Math.round(f())) !== c && e !== u && 3 < Math.abs(e - c) && 3 < Math.abs(e - u) ? (i.kill(),
                l.tween = 0) : e = n + r * i.ratio + o * i.ratio * i.ratio,
                u = c,
                c = Math.round(e)
            }
            ,
            t.onComplete = function() {
                l.tween = 0,
                a && a.call(i)
            }
            ,
            i = l.tween = Ne.to(s, t)
        }
        var c, u, f = at(s, e), d = "_scroll" + e.p2;
        return (s[d] = f).wheelHandler = function() {
            return l.tween && l.tween.kill() && (l.tween = 0)
        }
        ,
        Le(s, "wheel", f.wheelHandler),
        l
    }
    M.version = "3.11.3",
    M.create = function(e) {
        return new M(e)
    }
    ,
    M.register = ft,
    M.getAll = function() {
        return bt.slice()
    }
    ,
    M.getById = function(t) {
        return bt.filter(function(e) {
            return e.vars.id === t
        })[0]
    }
    ,
    o() && Pe.registerPlugin(M);
    function Wt(e, t) {
        return t = t && "matrix(1, 0, 0, 1, 0, 0)" !== Fe(e)[I] && Ne.to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0
        }).progress(1),
        e = e.getBoundingClientRect(),
        t && t.progress(0).kill(),
        e
    }
    function P(e, t, n, r) {
        var o = {
            display: "block"
        }
          , i = n[r ? "os2" : "p2"]
          , a = n[r ? "p2" : "os2"];
        e._isFlipped = r,
        o[n.a + "Percent"] = r ? -100 : 0,
        o[n.a] = r ? "1px" : 0,
        o["border" + i + dn] = 1,
        o["border" + a + dn] = 0,
        o[n.p] = t + "px",
        Ne.set(e, o)
    }
    function qt(e, t) {
        !$e || e ? (Ke = C.isRefreshing = !0,
        De.forEach(function(e) {
            return Be(e) && e.cacheID++ && (e.rec = e())
        }),
        e = $("refreshInit"),
        Zt && C.sort(),
        t || E(),
        De.forEach(function(e) {
            Be(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"),
            e(0))
        }),
        tt.slice(0).forEach(function(e) {
            return e.refresh()
        }),
        tt.forEach(function(e, t) {
            var n, r;
            e._subPinOffset && e.pin && (n = e.vars.horizontal ? "offsetWidth" : "offsetHeight",
            r = e.pin[n],
            e.revert(!0, 1),
            e.adjustPinSpacing(e.pin[n] - r),
            e.revert(!1, 1))
        }),
        tt.forEach(function(e) {
            return "max" === e.vars.end && e.setPositions(e.start, Math.max(e.start + 1, kt(e.scroller, e._dir)))
        }),
        e.forEach(function(e) {
            return e && e.render && e.render(-1)
        }),
        De.forEach(function(e) {
            Be(e) && (e.smooth && requestAnimationFrame(function() {
                return e.target.style.scrollBehavior = "smooth"
            }),
            e.rec) && e(e.rec)
        }),
        T(W, 1),
        D.pause(),
        vn++,
        Q(2),
        tt.forEach(function(e) {
            return Be(e.vars.onRefresh) && e.vars.onRefresh(e)
        }),
        Ke = C.isRefreshing = !1,
        $("refresh")) : Le(C, "scrollEnd", zt)
    }
    function Vt(e) {
        if (e) {
            var t, n, r = e.t.style, o = e.length, i = 0;
            for ((e.t._gsap || Ne.core.getCache(e.t)).uncache = 1; i < o; i += 2)
                n = e[i + 1],
                t = e[i],
                n ? r[t] = n : r[t] && r.removeProperty(t.replace(ne, "-$1").toLowerCase())
        }
    }
    var Ne, O, We, qe, Ve, je, A, D, jt, Gt, Ut, R, Ge, Kt, I, Ue, Y, X, z, Zt, $t, B, t, F, L, H, N, Jt, W, Qt, q, Ke, en, tn, nn = 1, Ze = Date.now, V = Ze(), $e = 0, rn = 0, on = Math.abs, j = "right", G = "bottom", an = "width", sn = "height", ln = "Right", cn = "Left", un = "Top", fn = "Bottom", Je = "padding", Qe = "margin", dn = "Width", et = "px", pn = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal"
    }, hn = {
        toggleActions: "play",
        anticipatePin: 0
    }, U = {
        top: 0,
        left: 0,
        center: .5,
        bottom: 1,
        right: 1
    }, tt = [], gn = {}, K = {}, Z = [], $ = function(e) {
        return K[e] && K[e].map(function(e) {
            return e()
        }) || Z
    }, n = [], vn = 0, J = 0, mn = 1, Q = function(e) {
        if (!Ke || 2 === e) {
            C.isUpdating = !0,
            tn && tn.update(0);
            var t = tt.length
              , e = Ze()
              , n = 50 <= e - V
              , r = t && tt[0].scroll();
            if (mn = r < J ? -1 : 1,
            J = r,
            n && ($e && !Kt && 200 < e - $e && ($e = 0,
            $("scrollEnd")),
            Ut = V,
            V = e),
            mn < 0) {
                for (Ue = t; 0 < Ue--; )
                    tt[Ue] && tt[Ue].update(0, n);
                mn = 1
            } else
                for (Ue = 0; Ue < t; Ue++)
                    tt[Ue] && tt[Ue].update(0, n);
            C.isUpdating = !1
        }
        q = 0
    }, ee = ["left", "top", G, j, Qe + fn, Qe + ln, Qe + un, Qe + cn, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], te = ee.concat([an, sn, "boxSizing", "max" + dn, "maxHeight", "position", Qe, Je, Je + un, Je + ln, Je + fn, Je + cn]), ne = /([A-Z])/g, yn = {
        left: 0,
        top: 0
    }, re = /(webkit|moz|length|cssText|inset)/i, C = (nt.prototype.init = function(v, m) {
        var y, r, g, b, W, x, w, _, q, V, j, S, G, U, K, k, Z, E, $, J, Q, ee, T, a, d, P, M, C, te, ne, p, re, o, oe, ie, ae, O, A, D, se, le, s, ce, ue, h, fe, R, de, pe, I, Y, X, z, B, he, ge, ve, F, me, ye, be, xe, we, L, H, _e, e, N, Se, l, c, u, t, n, f, ke, i, Ee, Te, Pe, Me, Ce;
        this.progress = this.start = 0,
        this.vars && this.kill(!0, !0),
        rn ? (p = (v = Ct(ze(v) || Et(v) || v.nodeType ? {
            trigger: v
        } : v, hn)).onUpdate,
        re = v.toggleClass,
        o = v.id,
        oe = v.onToggle,
        ie = v.onRefresh,
        ae = v.scrub,
        O = v.trigger,
        A = v.pin,
        D = v.pinSpacing,
        se = v.invalidateOnRefresh,
        le = v.anticipatePin,
        s = v.onScrubComplete,
        ce = v.onSnapComplete,
        ue = v.once,
        h = v.snap,
        fe = v.pinReparent,
        n = v.pinSpacer,
        R = v.containerAnimation,
        de = v.fastScrollEnd,
        pe = v.preventOverlaps,
        I = v.horizontal || v.containerAnimation && !1 !== v.horizontal ? Ie : Ye,
        Y = !ae && 0 !== ae,
        X = Oe(v.scroller || We),
        e = Ne.core.getCache(X),
        z = _t(X),
        B = "fixed" === ("pinType"in v ? v.pinType : rt(X, "pinType") || z && "fixed"),
        he = [v.onEnter, v.onLeave, v.onEnterBack, v.onLeaveBack],
        ge = Y && v.toggleActions.split(" "),
        t = ("markers"in v ? v : hn).markers,
        ve = !z && parseFloat(Fe(X)["border" + I.p2 + dn]) || 0,
        F = this,
        me = v.onRefreshInit && function() {
            return v.onRefreshInit(F)
        }
        ,
        Ee = X,
        Te = z,
        Pe = I.d,
        Me = I.d2,
        Ce = I.a,
        ye = (Ce = rt(Ee, "getBoundingClientRect")) ? function() {
            return Ce()[Pe]
        }
        : function() {
            return (Te ? We["inner" + Me] : Ee["client" + Me]) || 0
        }
        ,
        i = X,
        be = !z || ~Re.indexOf(i) ? St(i) : function() {
            return yn
        }
        ,
        we = xe = 0,
        L = at(X, I),
        Jt(F),
        F._dir = I,
        le *= 45,
        F.scroller = X,
        F.scroll = R ? R.time.bind(R) : L,
        b = L(),
        F.vars = v,
        m = m || v.animation,
        "refreshPriority"in v && (Zt = 1,
        -9999 === v.refreshPriority) && (tn = F),
        e.tweenScroll = e.tweenScroll || {
            top: Nt(X, Ye),
            left: Nt(X, Ie)
        },
        F.tweenTo = y = e.tweenScroll[I.p],
        F.scrubDuration = function(e) {
            (a = Et(e) && e) ? T ? T.duration(e) : T = Ne.to(m, {
                ease: "expo",
                totalProgress: "+=0.001",
                duration: a,
                paused: !0,
                onComplete: function() {
                    return s && s(F)
                }
            }) : (T && T.progress(1).kill(),
            T = 0)
        }
        ,
        m && (m.vars.lazy = !1,
        m._initted || !1 !== m.vars.immediateRender && !1 !== v.immediateRender && m.duration() && m.render(0, !0, !0),
        F.animation = m.pause(),
        (m.scrollTrigger = F).scrubDuration(ae),
        Q = 0,
        o = o || m.vars.id),
        tt.push(F),
        h && (Tt(h) && !h.push || (h = {
            snapTo: h
        }),
        "scrollBehavior"in je.style && Ne.set(z ? [je, Ve] : X, {
            scrollBehavior: "auto"
        }),
        De.forEach(function(e) {
            return Be(e) && e.target === (z ? qe.scrollingElement || Ve : X) && (e.smooth = !1)
        }),
        g = Be(h.snapTo) ? h.snapTo : "labels" === h.snapTo ? (ke = m,
        function(e) {
            return Ne.utils.snap(At(ke), e)
        }
        ) : "labelsDirectional" === h.snapTo ? (f = m,
        function(e, t) {
            return Dt(At(f))(e, t.direction)
        }
        ) : !1 !== h.directional ? function(e, t) {
            return Dt(h.snapTo)(e, Ze() - we < 500 ? 0 : t.direction)
        }
        : Ne.utils.snap(h.snapTo),
        d = Tt(d = h.duration || {
            min: .1,
            max: 2
        }) ? Gt(d.min, d.max) : Gt(d, d),
        P = Ne.delayedCall(h.delay || a / 2 || .1, function() {
            var e, t, n, r, o, i, a, s, l, c = L(), u = Ze() - we < 500, f = y.tween;
            !(u || Math.abs(F.getVelocity()) < 10) || f || Kt || xe === c ? F.isActive && xe !== c && P.restart(!0) : (e = (c - x) / _,
            t = m && !Y ? m.totalProgress() : e,
            u = !u && (t - ee) / (Ze() - Ut) * 1e3 || 0,
            n = Ne.utils.clamp(-e, 1 - e, on(u / 2) * u / .185),
            r = e + (!1 === h.inertia ? 0 : n),
            o = Gt(0, 1, g(r, F)),
            i = Math.round(x + o * _),
            a = h.onStart,
            s = h.onInterrupt,
            l = h.onComplete,
            c <= w && x <= c && i !== c && (f && !f._initted && f.data <= on(i - c) || (!1 === h.inertia && (n = o - e),
            y(i, {
                duration: d(on(.185 * Math.max(on(r - t), on(o - t)) / u / .05 || 0)),
                ease: h.ease || "power3",
                data: on(i - c),
                onInterrupt: function() {
                    return P.restart(!0) && s && s(F)
                },
                onComplete: function() {
                    F.update(),
                    xe = L(),
                    Q = ee = m && !Y ? m.totalProgress() : F.progress,
                    ce && ce(F),
                    l && l(F)
                }
            }, c, n * _, i - c - n * _),
            a && a(F, y.tween))))
        }).pause()),
        o && (gn[o] = F),
        i = (i = (O = F.trigger = Oe(O || A)) && O._gsap && O._gsap.stRevert) && i(F),
        A = !0 === A ? O : Oe(A),
        ze(re) && (re = {
            targets: O,
            className: re
        }),
        A && (!1 !== D && D !== Qe && (D = !(!D && A.parentNode && A.parentNode.style && "flex" === Fe(A.parentNode).display) && Je),
        F.pin = A,
        (r = Ne.core.getCache(A)).spacer ? q = r.pinState : (n && ((n = Oe(n)) && !n.nodeType && (n = n.current || n.nativeElement),
        r.spacerIsNative = !!n,
        n) && (r.spacerState = Ft(n)),
        r.spacer = S = n || qe.createElement("div"),
        S.classList.add("pin-spacer"),
        o && S.classList.add("pin-spacer-" + o),
        r.pinState = q = Ft(A)),
        !1 !== v.force3D && Ne.set(A, {
            force3D: !0
        }),
        F.spacer = S = r.spacer,
        e = Fe(A),
        Z = e[D + I.os2],
        G = Ne.getProperty(A),
        U = Ne.quickSetter(A, I.a, et),
        Bt(A, S, e),
        j = Ft(A)),
        t && (n = Tt(t) ? Ct(t, pn) : pn,
        H = It("scroller-start", o, X, I, n, 0),
        _e = It("scroller-end", o, X, I, n, 0, H),
        e = H["offset" + I.op.d2],
        t = Oe(rt(X, "content") || X),
        N = this.markerStart = It("start", o, t, I, n, e, 0, R),
        Se = this.markerEnd = It("end", o, t, I, n, e, 0, R),
        R && (ne = Ne.quickSetter([N, Se], I.a, et)),
        B || Re.length && !0 === rt(X, "fixedMarkers") || (n = Fe(t = z ? je : X).position,
        t.style.position = "absolute" === n || "fixed" === n ? n : "relative",
        Ne.set([H, _e], {
            force3D: !0
        }),
        $ = Ne.quickSetter(H, I.a, et),
        J = Ne.quickSetter(_e, I.a, et))),
        R && (l = R.vars.onUpdate,
        c = R.vars.onUpdateParams,
        R.eventCallback("onUpdate", function() {
            F.update(0, 0, 1),
            l && l.apply(c || [])
        })),
        F.previous = function() {
            return tt[tt.indexOf(F) - 1]
        }
        ,
        F.next = function() {
            return tt[tt.indexOf(F) + 1]
        }
        ,
        F.revert = function(e, t) {
            if (!t)
                return F.kill(!0);
            var n, r, o = !1 !== e || !F.enabled, t = Ge;
            o !== F.isReverted && (o && (C = Math.max(L(), F.scroll.rec || 0),
            M = F.progress,
            te = m && m.progress()),
            N && [N, Se, H, _e].forEach(function(e) {
                return e.style.display = o ? "none" : "block"
            }),
            o && (Ge = 1,
            F.update(o)),
            A && (o ? (e = A,
            n = S,
            Vt(r = q),
            (r = e._gsap).spacerIsNative ? Vt(r.spacerState) : e._gsap.swappedIn && (r = n.parentNode) && (r.insertBefore(e, n),
            r.removeChild(n)),
            e._gsap.swappedIn = !1) : fe && F.isActive || Bt(A, S, Fe(A), E)),
            o || F.update(o),
            Ge = t,
            F.isReverted = o)
        }
        ,
        F.refresh = function(e, t) {
            if (!Ge && F.enabled || t)
                if (A && e && $e)
                    Le(nt, "scrollEnd", zt);
                else {
                    !Ke && me && me(F),
                    Ge = 1,
                    we = Ze(),
                    y.tween && (y.tween.kill(),
                    y.tween = 0),
                    T && T.pause(),
                    se && m && m.revert({
                        kill: !1
                    }).invalidate(),
                    F.isReverted || F.revert(!0, !0),
                    F._subPinOffset = !1;
                    for (var n, r, o, i, a, t = ye(), e = be(), s = R ? R.duration() : kt(X, I), l = 0, c = 0, u = v.end, f = v.endTrigger || O, d = v.start || (0 !== v.start && O ? A ? "0 0" : "0 100%" : 0), p = F.pinnedContainer = v.pinnedContainer && Oe(v.pinnedContainer), h = O && Math.max(0, tt.indexOf(F)) || 0, g = h; g--; )
                        (o = tt[g]).end || o.refresh(0, 1) || (Ge = 1),
                        !(i = o.pin) || i !== O && i !== A || o.isReverted || ((a = a || []).unshift(o),
                        o.revert(!0, !0)),
                        o !== tt[g] && (h--,
                        g--);
                    for (Be(d) && (d = d(F)),
                    x = Lt(d, O, t, I, L(), N, H, F, e, ve, B, s, R) || (A ? -.001 : 0),
                    ze(u = Be(u) ? u(F) : u) && !u.indexOf("+=") && (~u.indexOf(" ") ? u = (ze(d) ? d.split(" ")[0] : "") + u : (l = Rt(u.substr(2), t),
                    u = ze(d) ? d : x + l,
                    f = O)),
                    w = Math.max(x, Lt(u || (f ? "100% 0" : s), f, t, I, L() + l, Se, _e, F, e, ve, B, s, R)) || -.001,
                    _ = w - x || (x -= .01) && .001,
                    l = 0,
                    g = h; g--; )
                        (i = (o = tt[g]).pin) && o.start - o._pinPush <= x && !R && 0 < o.end && (n = o.end - o.start,
                        (i === O && o.start - o._pinPush < x || i === p) && !Et(d) && (l += n * (1 - o.progress)),
                        i === A) && (c += n);
                    if (x += l,
                    w += l,
                    F._pinPush = c,
                    N && l && ((n = {})[I.a] = "+=" + l,
                    p && (n[I.p] = "-=" + L()),
                    Ne.set([N, Se], n)),
                    A)
                        n = Fe(A),
                        u = I === Ye,
                        f = L(),
                        K = parseFloat(G(I.a)) + c,
                        !s && 1 < w && ((z ? je : X).style["overflow-" + I.a] = "scroll"),
                        Bt(A, S, n),
                        j = Ft(A),
                        r = Wt(A, !0),
                        t = B && at(X, u ? Ie : Ye)(),
                        D && ((E = [D + I.os2, _ + c + et]).t = S,
                        (g = D === Je ? Ot(A, I) + _ + c : 0) && E.push(I.d, g + et),
                        Vt(E),
                        p && tt.forEach(function(e) {
                            e.pin === p && !1 !== e.vars.pinSpacing && (e._subPinOffset = !0)
                        }),
                        B) && L(C),
                        B && ((e = {
                            top: r.top + (u ? f - x : t) + et,
                            left: r.left + (u ? t : f - x) + et,
                            boxSizing: "border-box",
                            position: "fixed"
                        })[an] = e.maxWidth = Math.ceil(r.width) + et,
                        e[sn] = e.maxHeight = Math.ceil(r.height) + et,
                        e[Qe] = e[Qe + un] = e[Qe + ln] = e[Qe + fn] = e[Qe + cn] = "0",
                        e[Je] = n[Je],
                        e[Je + un] = n[Je + un],
                        e[Je + ln] = n[Je + ln],
                        e[Je + fn] = n[Je + fn],
                        e[Je + cn] = n[Je + cn],
                        V = ( (e, t, n) => {
                            for (var r, o = [], i = e.length, a = n ? 8 : 0; a < i; a += 2)
                                r = e[a],
                                o.push(r, r in t ? t[r] : e[a + 1]);
                            return o.t = e.t,
                            o
                        }
                        )(q, e, fe),
                        Ke) && L(0),
                        m ? (s = m._initted,
                        $t(1),
                        m.render(m.duration(), !0, !0),
                        k = G(I.a) - K + _ + c,
                        _ !== k && B && V.splice(V.length - 2, 2),
                        m.render(0, !0, !0),
                        s || m.invalidate(!0),
                        m.parent || m.totalTime(m.totalTime()),
                        $t(0)) : k = _;
                    else if (O && L() && !R)
                        for (r = O.parentNode; r && r !== je; )
                            r._pinOffset && (x -= r._pinOffset,
                            w -= r._pinOffset),
                            r = r.parentNode;
                    a && a.forEach(function(e) {
                        return e.revert(!1, !0)
                    }),
                    F.start = x,
                    F.end = w,
                    b = W = Ke ? C : L(),
                    R || Ke || (b < C && L(C),
                    F.scroll.rec = 0),
                    F.revert(!1, !0),
                    P && (xe = -1,
                    F.isActive && L(x + _ * M),
                    P.restart(!0)),
                    Ge = 0,
                    m && Y && (m._initted || te) && m.progress() !== te && m.progress(te, !0).render(m.time(), !0, !0),
                    M === F.progress && !R || (m && !Y && m.totalProgress(M, !0),
                    F.progress = (b - x) / _ === M ? 0 : M),
                    A && D && (S._pinOffset = Math.round(F.progress * k)),
                    ie && !Ke && ie(F)
                }
        }
        ,
        F.getVelocity = function() {
            return (L() - W) / (Ze() - Ut) * 1e3 || 0
        }
        ,
        F.endAnimation = function() {
            Pt(F.callbackAnimation),
            m && (T ? T.progress(1) : m.paused() ? Y || Pt(m, F.direction < 0, 1) : Pt(m, m.reversed()))
        }
        ,
        F.labelToScroll = function(e) {
            return m && m.labels && (x || F.refresh() || x) + m.labels[e] / m.duration() * _ || 0
        }
        ,
        F.getTrailing = function(t) {
            var e = tt.indexOf(F)
              , e = 0 < F.direction ? tt.slice(0, e).reverse() : tt.slice(e + 1);
            return (ze(t) ? e.filter(function(e) {
                return e.vars.preventOverlaps === t
            }) : e).filter(function(e) {
                return 0 < F.direction ? e.end <= x : e.start >= w
            })
        }
        ,
        F.update = function(e, t, n) {
            var r, o, i, a, s, l, c, u, f;
            (!R || n || e) && (n = Ke ? C : F.scroll(),
            s = (s = e ? 0 : (n - x) / _) < 0 ? 0 : 1 < s ? 1 : s || 0,
            c = F.progress,
            t && (W = b,
            b = R ? L() : n,
            h) && (ee = Q,
            Q = m && !Y ? m.totalProgress() : s),
            (s = le && !s && A && !Ge && !nn && $e && x < n + (n - W) / (Ze() - Ut) * le ? 1e-4 : s) !== c && F.enabled && (u = (t = (r = F.isActive = !!s && s < 1) != (!!c && c < 1)) || !!s != !!c,
            F.direction = c < s ? 1 : -1,
            F.progress = s,
            u && !Ge && (o = s && !c ? 0 : 1 === s ? 1 : 1 === c ? 2 : 3,
            Y) && (i = !t && "none" !== ge[o + 1] && ge[o + 1] || ge[o],
            a = m && ("complete" === i || "reset" === i || i in m)),
            pe && (t || a) && (a || ae || !m) && (Be(pe) ? pe(F) : F.getTrailing(pe).forEach(function(e) {
                return e.endAnimation()
            })),
            Y || (!T || Ge || nn ? m && m.totalProgress(s, !!Ge) : ((R || tn && tn !== F) && T.render(T._dp._time - T._start),
            T.resetTo ? T.resetTo("totalProgress", s, m._tTime / m._tDur) : (T.vars.totalProgress = s,
            T.invalidate().restart()))),
            A && (e && D && (S.style[D + I.os2] = Z),
            B ? u && (c = !e && c < s && n < w + 1 && n + 1 >= kt(X, I),
            fe && (e || !r && !c ? Ht(A, S) : (f = Wt(A, !0),
            l = n - x,
            Ht(A, je, f.top + (I === Ye ? l : 0) + et, f.left + (I === Ye ? 0 : l) + et))),
            Vt(r || c ? V : j),
            k !== _ && s < 1 && r || U(K + (1 !== s || c ? 0 : k))) : U(wt(K + k * s))),
            !h || y.tween || Ge || nn || P.restart(!0),
            re && (t || ue && s && (s < 1 || !Qt)) && jt(re.targets).forEach(function(e) {
                return e.classList[r || ue ? "add" : "remove"](re.className)
            }),
            !p || Y || e || p(F),
            u && !Ge ? (Y && (a && ("complete" === i ? m.pause().totalProgress(1) : "reset" === i ? m.restart(!0).pause() : "restart" === i ? m.restart(!0) : m[i]()),
            p) && p(F),
            !t && Qt || (oe && t && Mt(F, oe),
            he[o] && Mt(F, he[o]),
            ue && (1 === s ? F.kill(!1, 1) : he[o] = 0),
            t) || he[o = 1 === s ? 1 : 3] && Mt(F, he[o]),
            de && !r && Math.abs(F.getVelocity()) > (Et(de) ? de : 2500) && (Pt(F.callbackAnimation),
            T ? T.progress(1) : Pt(m, "reverse" === i ? 1 : !s, 1))) : Y && p && !Ge && p(F)),
            J && (f = R ? n / R.duration() * (R._caScrollDist || 0) : n,
            $(f + (H._isFlipped ? 1 : 0)),
            J(f)),
            ne) && ne(-n / R.duration() * (R._caScrollDist || 0))
        }
        ,
        F.enable = function(e, t) {
            F.enabled || (F.enabled = !0,
            Le(X, "resize", Xt),
            Le(z ? qe : X, "scroll", Yt),
            me && Le(nt, "refreshInit", me),
            !1 !== e && (F.progress = M = 0,
            b = W = xe = L()),
            !1 !== t && F.refresh())
        }
        ,
        F.getTween = function(e) {
            return e && y ? y.tween : T
        }
        ,
        F.setPositions = function(e, t) {
            A && (K += e - x,
            k += t - e - _,
            D === Je) && F.adjustPinSpacing(t - e - _),
            F.start = x = e,
            F.end = w = t,
            _ = t - e,
            F.update()
        }
        ,
        F.adjustPinSpacing = function(e) {
            var t;
            E && (t = E.indexOf(I.d) + 1,
            E[t] = parseFloat(E[t]) + e + et,
            E[1] = parseFloat(E[1]) + e + et,
            Vt(E))
        }
        ,
        F.disable = function(e, t) {
            if (F.enabled && (!1 !== e && F.revert(!0, !0),
            F.enabled = F.isActive = !1,
            t || T && T.pause(),
            C = 0,
            r && (r.uncache = 1),
            me && He(nt, "refreshInit", me),
            P && (P.pause(),
            y.tween) && y.tween.kill() && (y.tween = 0),
            !z)) {
                for (var n = tt.length; n--; )
                    if (tt[n].scroller === X && tt[n] !== F)
                        return;
                He(X, "resize", Xt),
                He(X, "scroll", Yt)
            }
        }
        ,
        F.kill = function(e, t) {
            F.disable(e, t),
            T && !t && T.kill(),
            o && delete gn[o];
            var n = tt.indexOf(F);
            0 <= n && tt.splice(n, 1),
            n === Ue && 0 < mn && Ue--,
            n = 0,
            tt.forEach(function(e) {
                return e.scroller === F.scroller && (n = 1)
            }),
            n || Ke || (F.scroll.rec = 0),
            m && (m.scrollTrigger = null,
            e && m.revert({
                kill: !1
            }),
            t || m.kill()),
            N && [N, Se, H, _e].forEach(function(e) {
                return e.parentNode && e.parentNode.removeChild(e)
            }),
            tn === F && (tn = 0),
            A && (r && (r.uncache = 1),
            n = 0,
            tt.forEach(function(e) {
                return e.pin === A && n++
            }),
            n || (r.spacer = 0)),
            v.onKill && v.onKill(F)
        }
        ,
        F.enable(!1, !1),
        i && i(F),
        m && m.add && !_ ? Ne.delayedCall(.01, function() {
            return x || w || F.refresh()
        }) && (_ = .01,
        x = w = 0) : F.refresh(),
        A && en !== vn && (u = en = vn,
        requestAnimationFrame(function() {
            return u === vn && qt(!0)
        }))) : this.update = this.refresh = this.kill = Xe
    }
    ,
    nt.register = function(e) {
        return O || (Ne = e || y(),
        m() && window.document && nt.enable(),
        O = rn),
        O
    }
    ,
    nt.defaults = function(e) {
        if (e)
            for (var t in e)
                hn[t] = e[t];
        return hn
    }
    ,
    nt.disable = function(t, n) {
        rn = 0,
        tt.forEach(function(e) {
            return e[n ? "kill" : "disable"](t)
        }),
        He(We, "wheel", Yt),
        He(qe, "scroll", Yt),
        clearInterval(R),
        He(qe, "touchcancel", Xe),
        He(je, "touchstart", Xe),
        x(He, qe, "pointerdown,touchstart,mousedown", g),
        x(He, qe, "pointerup,touchend,mouseup", v),
        D.kill(),
        b(He);
        for (var e = 0; e < De.length; e += 3)
            w(He, De[e], De[e + 1]),
            w(He, De[e], De[e + 2])
    }
    ,
    nt.enable = function() {
        if (We = window,
        qe = document,
        Ve = qe.documentElement,
        je = qe.body,
        Ne && (jt = Ne.utils.toArray,
        Gt = Ne.utils.clamp,
        Jt = Ne.core.context || Xe,
        $t = Ne.core.suppressOverwrites || Xe,
        W = We.history.scrollRestoration || "auto",
        Ne.core.globals("ScrollTrigger", nt),
        je)) {
            rn = 1,
            M.register(Ne),
            nt.isTouch = M.isTouch,
            N = M.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
            Le(We, "wheel", Yt),
            A = [We, qe, Ve, je],
            Ne.matchMedia ? (nt.matchMedia = function(e) {
                var t, n = Ne.matchMedia();
                for (t in e)
                    n.add(t, e[t]);
                return n
            }
            ,
            Ne.addEventListener("matchMediaInit", function() {
                return E()
            }),
            Ne.addEventListener("matchMediaRevert", function() {
                return k()
            }),
            Ne.addEventListener("matchMedia", function() {
                qt(0, 1),
                $("matchMedia")
            }),
            Ne.matchMedia("(orientation: portrait)", function() {
                return S(),
                S
            })) : console.warn("Requires GSAP 3.11.0 or later"),
            S(),
            Le(qe, "scroll", Yt);
            var e, t = je.style, n = t.borderTopStyle, r = Ne.core.Animation.prototype;
            for (r.revert || Object.defineProperty(r, "revert", {
                value: function() {
                    return this.time(-.01, !0)
                }
            }),
            t.borderTopStyle = "solid",
            r = Wt(je),
            Ye.m = Math.round(r.top + Ye.sc()) || 0,
            Ie.m = Math.round(r.left + Ie.sc()) || 0,
            n ? t.borderTopStyle = n : t.removeProperty("border-top-style"),
            R = setInterval(_, 250),
            Ne.delayedCall(.5, function() {
                return nn = 0
            }),
            Le(qe, "touchcancel", Xe),
            Le(je, "touchstart", Xe),
            x(Le, qe, "pointerdown,touchstart,mousedown", g),
            x(Le, qe, "pointerup,touchend,mouseup", v),
            I = Ne.utils.checkPrefix("transform"),
            te.push(I),
            O = Ze(),
            D = Ne.delayedCall(.2, qt).pause(),
            z = [qe, "visibilitychange", function() {
                var e = We.innerWidth
                  , t = We.innerHeight;
                qe.hidden ? (Y = e,
                X = t) : Y === e && X === t || Xt()
            }
            , qe, "DOMContentLoaded", qt, We, "load", qt, We, "resize", Xt],
            b(Le),
            tt.forEach(function(e) {
                return e.enable(0, 1)
            }),
            e = 0; e < De.length; e += 3)
                w(He, De[e], De[e + 1]),
                w(He, De[e], De[e + 2])
        }
    }
    ,
    nt.config = function(e) {
        "limitCallbacks"in e && (Qt = !!e.limitCallbacks);
        var t = e.syncInterval;
        t && clearInterval(R) || (R = t) && setInterval(_, t),
        "ignoreMobileResize"in e && (F = 1 === nt.isTouch && e.ignoreMobileResize),
        "autoRefreshEvents"in e && (b(He),
        b(Le, e.autoRefreshEvents || "none"),
        B = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
    }
    ,
    nt.scrollerProxy = function(e, t) {
        var e = Oe(e)
          , n = De.indexOf(e)
          , r = _t(e);
        ~n && De.splice(n, r ? 6 : 2),
        t && (r ? Re.unshift(We, t, je, t, Ve, t) : Re.unshift(e, t))
    }
    ,
    nt.clearMatchMedia = function(t) {
        tt.forEach(function(e) {
            return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0)
        })
    }
    ,
    nt.isInViewport = function(e, t, n) {
        e = (ze(e) ? Oe(e) : e).getBoundingClientRect(),
        t = e[n ? an : sn] * t || 0;
        return n ? 0 < e.right - t && e.left + t < We.innerWidth : 0 < e.bottom - t && e.top + t < We.innerHeight
    }
    ,
    nt.positionInViewport = function(e, t, n) {
        var e = (e = ze(e) ? Oe(e) : e).getBoundingClientRect()
          , r = e[n ? an : sn]
          , r = null == t ? r / 2 : t in U ? U[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0;
        return n ? (e.left + r) / We.innerWidth : (e.top + r) / We.innerHeight
    }
    ,
    nt.killAll = function(e) {
        tt.forEach(function(e) {
            return "ScrollSmoother" !== e.vars.id && e.kill()
        }),
        !0 !== e && (e = K.killAll || [],
        K = {},
        e.forEach(function(e) {
            return e()
        }))
    }
    ,
    nt);
    function nt(e, t) {
        O || nt.register(Ne) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        this.init(e, t)
    }
    function oe(e, t, n, r) {
        return r < t ? e(r) : t < 0 && e(0),
        r < n ? (r - t) / (n - t) : n < 0 ? t / (t - n) : 1
    }
    function ie(e, t) {
        !0 === t ? e.style.removeProperty("touch-action") : e.style.touchAction = !0 === t ? "auto" : t ? "pan-" + t + (M.isTouch ? " pinch-zoom" : "") : "none",
        e === Ve && ie(je, t)
    }
    function ae(e) {
        var t = e.event
          , n = e.target
          , e = e.axis
          , r = (t.changedTouches ? t.changedTouches[0] : t).target
          , o = r._gsap || Ne.core.getCache(r)
          , i = Ze();
        if (!o._isScrollT || 2e3 < i - o._isScrollT) {
            for (; r && r.scrollHeight <= r.clientHeight; )
                r = r.parentNode;
            o._isScroll = r && !_t(r) && r !== n && (ue[(n = Fe(r)).overflowY] || ue[n.overflowX]),
            o._isScrollT = i
        }
        !o._isScroll && "x" !== e || (t.stopPropagation(),
        t._gsapAllow = !0)
    }
    function se(e, t, n, r) {
        return M.create({
            target: e,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: t,
            onWheel: r = r && ae,
            onPress: r,
            onDrag: r,
            onScroll: r,
            onEnable: function() {
                return n && Le(qe, M.eventTypes[0], de, !1, !0)
            },
            onDisable: function() {
                return He(qe, M.eventTypes[0], de, !0)
            }
        })
    }
    function le(e) {
        function n() {
            return c = !1
        }
        function i() {
            s = kt(v, Ye),
            P = Gt(N ? 1 : 0, s),
            h && (T = Gt(0, kt(v, Ie))),
            l = vn
        }
        function a() {
            y._gsap.y = wt(parseFloat(y._gsap.y) + b.offset) + "px",
            y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(y._gsap.y) + ", 0, 1)",
            b.offset = b.cacheID = 0
        }
        function o() {
            i(),
            u.isActive() && u.vars.scrollY > s && (b() > s ? u.progress(1) && b(s) : u.resetTo("scrollY", s))
        }
        (e = Tt(e) ? e : {}).preventDefault = e.isNormalizer = e.allowClicks = !0,
        e.type || (e.type = "wheel,touch"),
        e.debounce = !!e.debounce,
        e.id = e.id || "normalizer";
        var r, s, l, c, u, f, d, p, h = e.normalizeScrollX, t = e.momentum, g = e.allowNestedScroll, v = Oe(e.target) || Ve, m = Ne.core.globals().ScrollSmoother, m = m && m.get(), y = N && (e.content && Oe(e.content) || m && !1 !== e.content && !m.smooth() && m.content()), b = at(v, Ye), x = at(v, Ie), w = 1, _ = (M.isTouch && We.visualViewport ? We.visualViewport.scale * We.visualViewport.width : We.outerWidth) / We.innerWidth, S = 0, k = Be(t) ? function() {
            return t(r)
        }
        : function() {
            return t || 2.8
        }
        , E = se(v, e.type, !0, g), T = Xe, P = Xe;
        return y && Ne.set(y, {
            y: "+=0"
        }),
        e.ignoreCheck = function(e) {
            return N && "touchmove" === e.type && (c ? (requestAnimationFrame(n),
            t = wt(r.deltaY / 2),
            t = P(b.v - t),
            y && t !== b.v + b.offset && (b.offset = t - b.v,
            t = wt((parseFloat(y && y._gsap.y) || 0) - b.offset),
            y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + t + ", 0, 1)",
            y._gsap.y = t + "px",
            b.cacheID = De.cache,
            Q()),
            !0) : (b.offset && a(),
            void (c = !0))) || 1.05 < w && "touchstart" !== e.type || r.isGesturing || e.touches && 1 < e.touches.length;
            var t
        }
        ,
        e.onPress = function() {
            var e = w;
            w = wt((We.visualViewport && We.visualViewport.scale || 1) / _),
            u.pause(),
            e !== w && ie(v, 1.01 < w || !h && "x"),
            f = x(),
            d = b(),
            i(),
            l = vn
        }
        ,
        e.onRelease = e.onGestureStart = function(e, t) {
            var n, r;
            b.offset && a(),
            t ? (De.cache++,
            t = k(),
            h && (r = (n = x()) + .05 * t * -e.velocityX / .227,
            t *= oe(x, n, r, kt(v, Ie)),
            u.vars.scrollX = T(r)),
            r = (n = b()) + .05 * t * -e.velocityY / .227,
            t *= oe(b, n, r, kt(v, Ye)),
            u.vars.scrollY = P(r),
            u.invalidate().duration(t).play(.01),
            (N && u.vars.scrollY >= s || s - 1 <= n) && Ne.to({}, {
                onUpdate: o,
                duration: t
            })) : p.restart(!0)
        }
        ,
        e.onWheel = function() {
            u._ts && u.pause(),
            1e3 < Ze() - S && (l = 0,
            S = Ze())
        }
        ,
        e.onChange = function(e, t, n, r, o) {
            vn !== l && i(),
            t && h && x(T(r[2] === t ? f + (e.startX - e.x) : x() + t - r[1])),
            n && (b.offset && a(),
            e = (r = o[2] === n) ? d + e.startY - e.y : b() + n - o[1],
            o = P(e),
            r && e !== o && (d += o - e),
            b(o)),
            (n || t) && Q()
        }
        ,
        e.onEnable = function() {
            ie(v, !h && "x"),
            C.addEventListener("refresh", o),
            Le(We, "resize", o),
            b.smooth && (b.target.style.scrollBehavior = "auto",
            b.smooth = x.smooth = !1),
            E.enable()
        }
        ,
        e.onDisable = function() {
            ie(v, !0),
            He(We, "resize", o),
            C.removeEventListener("refresh", o),
            E.kill()
        }
        ,
        e.lockAxis = !1 !== e.lockAxis,
        ((r = new M(e)).iOS = N) && !b() && b(1),
        N && Ne.ticker.add(Xe),
        p = r._dc,
        u = Ne.to(r, {
            ease: "power4",
            paused: !0,
            scrollX: h ? "+=0.1" : "+=0",
            scrollY: "+=0.1",
            onComplete: p.vars.onComplete
        }),
        r
    }
    C.version = "3.11.3",
    C.saveStyles = function(e) {
        return e ? jt(e).forEach(function(e) {
            var t;
            e && e.style && (0 <= (t = n.indexOf(e)) && n.splice(t, 5),
            n.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), Ne.core.getCache(e), Jt()))
        }) : n
    }
    ,
    C.revert = function(e, t) {
        return E(!e, t)
    }
    ,
    C.create = function(e, t) {
        return new C(e,t)
    }
    ,
    C.refresh = function(e) {
        return e ? Xt() : (O || C.register()) && qt(!0)
    }
    ,
    C.update = Q,
    C.clearScrollMemory = T,
    C.maxScroll = function(e, t) {
        return kt(e, t ? Ie : Ye)
    }
    ,
    C.getScrollFunc = function(e, t) {
        return at(Oe(e), t ? Ie : Ye)
    }
    ,
    C.getById = function(e) {
        return gn[e]
    }
    ,
    C.getAll = function() {
        return tt.filter(function(e) {
            return "ScrollSmoother" !== e.vars.id
        })
    }
    ,
    C.isScrolling = function() {
        return !!$e
    }
    ,
    C.snapDirectional = Dt,
    C.addEventListener = function(e, t) {
        e = K[e] || (K[e] = []);
        ~e.indexOf(t) || e.push(t)
    }
    ,
    C.removeEventListener = function(e, t) {
        e = K[e],
        t = e && e.indexOf(t);
        0 <= t && e.splice(t, 1)
    }
    ,
    C.batch = function(e, t) {
        var n, r = [], o = {}, i = t.interval || .016, a = t.batchMax || 1e9;
        for (n in t)
            o[n] = "on" === n.substr(0, 2) && Be(t[n]) && "onRefreshInit" !== n ? (e => {
                var t = []
                  , n = []
                  , r = Ne.delayedCall(i, function() {
                    e(t, n),
                    t = [],
                    n = []
                }).pause();
                return function(e) {
                    t.length || r.restart(!0),
                    t.push(e.trigger),
                    n.push(e),
                    a <= t.length && r.progress(1)
                }
            }
            )(t[n]) : t[n];
        return Be(a) && (a = a(),
        Le(C, "refresh", function() {
            return a = t.batchMax()
        })),
        jt(e).forEach(function(e) {
            var t = {};
            for (n in o)
                t[n] = o[n];
            t.trigger = e,
            r.push(C.create(t))
        }),
        r
    }
    ;
    var ce, ue = {
        auto: 1,
        scroll: 1
    }, fe = /(input|label|select|textarea)/i, de = function(e) {
        var t = fe.test(e.target.tagName);
        (t || ce) && (e._gsapAllow = !0,
        ce = t)
    };
    C.sort = function(e) {
        return tt.sort(e || function(e, t) {
            return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0))
        }
        )
    }
    ,
    C.observe = function(e) {
        return new M(e)
    }
    ,
    C.normalizeScroll = function(e) {
        return void 0 === e ? t : !0 === e && t ? t.enable() : !1 === e ? t && t.kill() : (e = e instanceof M ? e : le(e),
        t && t.target === e.target && t.kill(),
        _t(e.target) && (t = e),
        e)
    }
    ,
    C.core = {
        _getVelocityProp: st,
        _inputObserver: se,
        _scrollers: De,
        _proxies: Re,
        bridge: {
            ss: function() {
                $e || $("scrollStart"),
                $e = Ze()
            },
            ref: function() {
                return Ge
            }
        }
    },
    y() && Ne.registerPlugin(C),
    e.ScrollTrigger = C,
    e.default = C,
    "undefined" == typeof window || window !== e ? Object.defineProperty(e, "__esModule", {
        value: !0
    }) : delete e.default
});
/*!
 * ScrollToPlugin 3.11.3
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
( (e, t) => {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}
)(this, function(e) {
    function t() {
        return "undefined" != typeof window
    }
    function o() {
        return u || t() && (u = window.gsap) && u.registerPlugin && u
    }
    function i(e) {
        return "string" == typeof e
    }
    function p(e) {
        return "function" == typeof e
    }
    function d(e, t) {
        var t = "x" === t ? "Width" : "Height"
          , o = "scroll" + t
          , n = "client" + t;
        return e === x || e === l || e === s ? Math.max(l[o], s[o]) - (x["inner" + t] || l[n] || s[n]) : e[o] - e["offset" + t]
    }
    function f(e, t) {
        var o = "scroll" + ("x" === t ? "Left" : "Top");
        return e === x && (null != e.pageXOffset ? o = "page" + t.toUpperCase() + "Offset" : e = null != l[o] ? l : s),
        function() {
            return e[o]
        }
    }
    function r(e, t) {
        var o, n;
        return (e = g(e)[0]) && e.getBoundingClientRect ? (e = e.getBoundingClientRect(),
        n = (o = !t || t === x || t === s) ? {
            top: l.clientTop - (x.pageYOffset || l.scrollTop || s.scrollTop || 0),
            left: l.clientLeft - (x.pageXOffset || l.scrollLeft || s.scrollLeft || 0)
        } : t.getBoundingClientRect(),
        e = {
            x: e.left - n.left,
            y: e.top - n.top
        },
        !o && t && (e.x += f(t, "x")(),
        e.y += f(t, "y")()),
        e) : console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
        }
    }
    function c(e, t, o, n, l) {
        return isNaN(e) || "object" == typeof e ? i(e) && "=" === e.charAt(1) ? parseFloat(e.substr(2)) * ("-" === e.charAt(0) ? -1 : 1) + n - l : "max" === e ? d(t, o) - l : Math.min(d(t, o), r(e, t)[o] - l) : parseFloat(e) - l
    }
    function a() {
        u = o(),
        t() && u && document.body && (x = window,
        s = document.body,
        l = document.documentElement,
        g = u.utils.toArray,
        u.config({
            autoKillThreshold: 7
        }),
        T = u.config(),
        y = 1)
    }
    var u, y, x, l, s, g, T, n = {
        version: "3.11.3",
        name: "scrollTo",
        rawVars: 1,
        register: function(e) {
            u = e,
            a()
        },
        init: function(e, t, o, n, l) {
            y || a();
            var r = this
              , s = u.getProperty(e, "scrollSnapType");
            r.isWin = e === x,
            r.target = e,
            r.tween = o,
            t = ( (e, t, o, n) => {
                if ("object" != typeof (e = p(e) ? e(t, o, n) : e))
                    return i(e) && "max" !== e && "=" !== e.charAt(1) ? {
                        x: e,
                        y: e
                    } : {
                        y: e
                    };
                if (e.nodeType)
                    return {
                        y: e,
                        x: e
                    };
                var l, r = {};
                for (l in e)
                    r[l] = "onAutoKill" !== l && p(e[l]) ? e[l](t, o, n) : e[l];
                return r
            }
            )(t, n, e, l),
            r.vars = t,
            r.autoKill = !!t.autoKill,
            r.getX = f(e, "x"),
            r.getY = f(e, "y"),
            r.x = r.xPrev = r.getX(),
            r.y = r.yPrev = r.getY(),
            "smooth" === u.getProperty(e, "scrollBehavior") && u.set(e, {
                scrollBehavior: "auto"
            }),
            s && "none" !== s && (r.snap = 1,
            r.snapInline = e.style.scrollSnapType,
            e.style.scrollSnapType = "none"),
            null != t.x ? (r.add(r, "x", r.x, c(t.x, e, "x", r.x, t.offsetX || 0), n, l),
            r._props.push("scrollTo_x")) : r.skipX = 1,
            null != t.y ? (r.add(r, "y", r.y, c(t.y, e, "y", r.y, t.offsetY || 0), n, l),
            r._props.push("scrollTo_y")) : r.skipY = 1
        },
        render: function(e, t) {
            for (var o, n, l, r = t._pt, s = t.target, i = t.tween, p = t.autoKill, f = t.xPrev, c = t.yPrev, a = t.isWin, u = t.snap, y = t.snapInline; r; )
                r.r(e, r.d),
                r = r._next;
            o = a || !t.skipX ? t.getX() : f,
            c = (n = a || !t.skipY ? t.getY() : c) - c,
            f = o - f,
            l = T.autoKillThreshold,
            t.x < 0 && (t.x = 0),
            t.y < 0 && (t.y = 0),
            p && (!t.skipX && (l < f || f < -l) && o < d(s, "x") && (t.skipX = 1),
            !t.skipY && (l < c || c < -l) && n < d(s, "y") && (t.skipY = 1),
            t.skipX) && t.skipY && (i.kill(),
            t.vars.onAutoKill) && t.vars.onAutoKill.apply(i, t.vars.onAutoKillParams || []),
            a ? x.scrollTo(t.skipX ? o : t.x, t.skipY ? n : t.y) : (t.skipY || (s.scrollTop = t.y),
            t.skipX || (s.scrollLeft = t.x)),
            !u || 1 !== e && 0 !== e || (n = s.scrollTop,
            o = s.scrollLeft,
            y ? s.style.scrollSnapType = y : s.style.removeProperty("scroll-snap-type"),
            s.scrollTop = n + 1,
            s.scrollLeft = o + 1,
            s.scrollTop = n,
            s.scrollLeft = o),
            t.xPrev = t.x,
            t.yPrev = t.y
        },
        kill: function(e) {
            var t = "scrollTo" === e;
            !t && "scrollTo_x" !== e || (this.skipX = 1),
            !t && "scrollTo_y" !== e || (this.skipY = 1)
        }
    };
    n.max = d,
    n.getOffset = r,
    n.buildGetter = f,
    o() && u.registerPlugin(n),
    e.ScrollToPlugin = n,
    e.default = n,
    "undefined" == typeof window || window !== e ? Object.defineProperty(e, "__esModule", {
        value: !0
    }) : delete e.default
});
( (t, e) => {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Konva = e()
}
)(this, function() {
    let I = Math.PI / 180
      , O = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {}
      , A = {
        _global: O,
        version: "9.3.16",
        isBrowser: "undefined" != typeof window && ("[object Window]" === {}.toString.call(window) || "[object global]" === {}.toString.call(window)),
        isUnminified: /param/.test(function(t) {}
        .toString()),
        dblClickWindow: 400,
        getAngle: t => A.angleDeg ? t * I : t,
        enableTrace: !1,
        pointerEventsEnabled: !0,
        autoDrawEnabled: !0,
        hitOnDragEnabled: !1,
        capturePointerEventsEnabled: !1,
        _mouseListenClick: !1,
        _touchListenClick: !1,
        _pointerListenClick: !1,
        _mouseInDblClickWindow: !1,
        _touchInDblClickWindow: !1,
        _pointerInDblClickWindow: !1,
        _mouseDblClickPointerId: null,
        _touchDblClickPointerId: null,
        _pointerDblClickPointerId: null,
        _fixTextRendering: !1,
        pixelRatio: "undefined" != typeof window && window.devicePixelRatio || 1,
        dragDistance: 3,
        angleDeg: !0,
        showWarnings: !0,
        dragButtons: [0, 1],
        isDragging: () => A.DD.isDragging,
        isTransforming() {
            var t;
            return null == (t = A.Transformer) ? void 0 : t.isTransforming()
        },
        isDragReady: () => !!A.DD.node,
        releaseCanvasOnDestroy: !0,
        document: O.document,
        _injectGlobal(t) {
            O.Konva = t
        }
    }
      , t = t => {
        A[t.prototype.getClassName()] = t
    }
    ;
    A._injectGlobal(A);
    class d {
        constructor(t=[1, 0, 0, 1, 0, 0]) {
            this.dirty = !1,
            this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
        }
        reset() {
            this.m[0] = 1,
            this.m[1] = 0,
            this.m[2] = 0,
            this.m[3] = 1,
            this.m[4] = 0,
            this.m[5] = 0
        }
        copy() {
            return new d(this.m)
        }
        copyInto(t) {
            t.m[0] = this.m[0],
            t.m[1] = this.m[1],
            t.m[2] = this.m[2],
            t.m[3] = this.m[3],
            t.m[4] = this.m[4],
            t.m[5] = this.m[5]
        }
        point(t) {
            var e = this.m;
            return {
                x: e[0] * t.x + e[2] * t.y + e[4],
                y: e[1] * t.x + e[3] * t.y + e[5]
            }
        }
        translate(t, e) {
            return this.m[4] += this.m[0] * t + this.m[2] * e,
            this.m[5] += this.m[1] * t + this.m[3] * e,
            this
        }
        scale(t, e) {
            return this.m[0] *= t,
            this.m[1] *= t,
            this.m[2] *= e,
            this.m[3] *= e,
            this
        }
        rotate(t) {
            var e = Math.cos(t)
              , t = Math.sin(t)
              , i = this.m[0] * e + this.m[2] * t
              , r = this.m[1] * e + this.m[3] * t
              , a = this.m[0] * -t + this.m[2] * e
              , t = this.m[1] * -t + this.m[3] * e;
            return this.m[0] = i,
            this.m[1] = r,
            this.m[2] = a,
            this.m[3] = t,
            this
        }
        getTranslation() {
            return {
                x: this.m[4],
                y: this.m[5]
            }
        }
        skew(t, e) {
            var i = this.m[0] + this.m[2] * e
              , e = this.m[1] + this.m[3] * e
              , r = this.m[2] + this.m[0] * t
              , t = this.m[3] + this.m[1] * t;
            return this.m[0] = i,
            this.m[1] = e,
            this.m[2] = r,
            this.m[3] = t,
            this
        }
        multiply(t) {
            var e = this.m[0] * t.m[0] + this.m[2] * t.m[1]
              , i = this.m[1] * t.m[0] + this.m[3] * t.m[1]
              , r = this.m[0] * t.m[2] + this.m[2] * t.m[3]
              , a = this.m[1] * t.m[2] + this.m[3] * t.m[3]
              , n = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4]
              , t = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
            return this.m[0] = e,
            this.m[1] = i,
            this.m[2] = r,
            this.m[3] = a,
            this.m[4] = n,
            this.m[5] = t,
            this
        }
        invert() {
            var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2])
              , e = this.m[3] * t
              , i = -this.m[1] * t
              , r = -this.m[2] * t
              , a = this.m[0] * t
              , n = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4])
              , t = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            return this.m[0] = e,
            this.m[1] = i,
            this.m[2] = r,
            this.m[3] = a,
            this.m[4] = n,
            this.m[5] = t,
            this
        }
        getMatrix() {
            return this.m
        }
        decompose() {
            var t, e = this.m[0], i = this.m[1], r = this.m[2], a = this.m[3], n = e * a - i * r, s = {
                x: this.m[4],
                y: this.m[5],
                rotation: 0,
                scaleX: 0,
                scaleY: 0,
                skewX: 0,
                skewY: 0
            };
            return 0 != e || 0 != i ? (t = Math.sqrt(e * e + i * i),
            s.rotation = 0 < i ? Math.acos(e / t) : -Math.acos(e / t),
            s.scaleX = t,
            s.scaleY = n / t,
            s.skewX = (e * r + i * a) / n,
            s.skewY = 0) : 0 == r && 0 == a || (t = Math.sqrt(r * r + a * a),
            s.rotation = Math.PI / 2 - (0 < a ? Math.acos(-r / t) : -Math.acos(r / t)),
            s.scaleX = n / t,
            s.scaleY = t,
            s.skewX = 0,
            s.skewY = (e * r + i * a) / n),
            s.rotation = N._getRotation(s.rotation),
            s
        }
    }
    let F = Math.PI / 180
      , B = 180 / Math.PI
      , H = "Konva error: "
      , W = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 132, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 255, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 203],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [119, 128, 144],
        slategrey: [119, 128, 144],
        snow: [255, 255, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        transparent: [255, 255, 255, 0],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 5]
    }
      , z = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/
      , Y = []
      , X = "undefined" != typeof requestAnimationFrame && requestAnimationFrame || function(t) {
        setTimeout(t, 60)
    }
      , N = {
        _isElement: t => !(!t || 1 != t.nodeType),
        _isFunction: t => !!(t && t.constructor && t.call && t.apply),
        _isPlainObject: t => !!t && t.constructor === Object,
        _isArray: t => "[object Array]" === Object.prototype.toString.call(t),
        _isNumber: t => "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t),
        _isString: t => "[object String]" === Object.prototype.toString.call(t),
        _isBoolean: t => "[object Boolean]" === Object.prototype.toString.call(t),
        isObject: t => t instanceof Object,
        isValidSelector(t) {
            return "string" == typeof t && ("#" === (t = t[0]) || "." === t || t === t.toUpperCase())
        },
        _sign: t => 0 === t || 0 < t ? 1 : -1,
        requestAnimFrame(t) {
            Y.push(t),
            1 === Y.length && X(function() {
                var t = Y;
                Y = [],
                t.forEach(function(t) {
                    t()
                })
            })
        },
        createCanvasElement() {
            var t = document.createElement("canvas");
            try {
                t.style = t.style || {}
            } catch (t) {}
            return t
        },
        createImageElement: () => document.createElement("img"),
        _isInDocument(t) {
            for (; t = t.parentNode; )
                if (t == document)
                    return !0;
            return !1
        },
        _urlToImage(t, e) {
            let i = N.createImageElement();
            i.onload = function() {
                e(i)
            }
            ,
            i.src = t
        },
        _rgbToHex: (t, e, i) => ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1),
        _hexToRgb(t) {
            t = t.replace("#", "");
            t = parseInt(t, 16);
            return {
                r: t >> 16 & 255,
                g: t >> 8 & 255,
                b: 255 & t
            }
        },
        getRandomColor() {
            let t = (16777215 * Math.random() | 0).toString(16);
            for (; t.length < 6; )
                t = "0" + t;
            return "#" + t
        },
        getRGB(t) {
            let e;
            return t in W ? {
                r: (e = W[t])[0],
                g: e[1],
                b: e[2]
            } : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = z.exec(t.replace(/ /g, "")),
            {
                r: parseInt(e[1], 10),
                g: parseInt(e[2], 10),
                b: parseInt(e[3], 10)
            }) : {
                r: 0,
                g: 0,
                b: 0
            }
        },
        colorToRGBA: t => (t = t || "black",
        N._namedColorToRBA(t) || N._hex3ColorToRGBA(t) || N._hex4ColorToRGBA(t) || N._hex6ColorToRGBA(t) || N._hex8ColorToRGBA(t) || N._rgbColorToRGBA(t) || N._rgbaColorToRGBA(t) || N._hslColorToRGBA(t)),
        _namedColorToRBA(t) {
            t = W[t.toLowerCase()];
            return t ? {
                r: t[0],
                g: t[1],
                b: t[2],
                a: 1
            } : null
        },
        _rgbColorToRGBA(t) {
            if (0 === t.indexOf("rgb("))
                return {
                    r: (t = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number))[0],
                    g: t[1],
                    b: t[2],
                    a: 1
                }
        },
        _rgbaColorToRGBA(t) {
            if (0 === t.indexOf("rgba("))
                return {
                    r: (t = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map( (t, e) => "%" === t.slice(-1) ? 3 === e ? parseInt(t) / 100 : parseInt(t) / 100 * 255 : Number(t)))[0],
                    g: t[1],
                    b: t[2],
                    a: t[3]
                }
        },
        _hex8ColorToRGBA(t) {
            if ("#" === t[0] && 9 === t.length)
                return {
                    r: parseInt(t.slice(1, 3), 16),
                    g: parseInt(t.slice(3, 5), 16),
                    b: parseInt(t.slice(5, 7), 16),
                    a: parseInt(t.slice(7, 9), 16) / 255
                }
        },
        _hex6ColorToRGBA(t) {
            if ("#" === t[0] && 7 === t.length)
                return {
                    r: parseInt(t.slice(1, 3), 16),
                    g: parseInt(t.slice(3, 5), 16),
                    b: parseInt(t.slice(5, 7), 16),
                    a: 1
                }
        },
        _hex4ColorToRGBA(t) {
            if ("#" === t[0] && 5 === t.length)
                return {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16),
                    a: parseInt(t[4] + t[4], 16) / 255
                }
        },
        _hex3ColorToRGBA(t) {
            if ("#" === t[0] && 4 === t.length)
                return {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16),
                    a: 1
                }
        },
        _hslColorToRGBA(t) {
            if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)) {
                var [,...t] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t)
                  , a = Number(t[0]) / 360
                  , n = Number(t[1]) / 100
                  , t = Number(t[2]) / 100;
                let e, i, r;
                if (0 == n)
                    return r = 255 * t,
                    {
                        r: Math.round(r),
                        g: Math.round(r),
                        b: Math.round(r),
                        a: 1
                    };
                var s = 2 * t - (e = t < .5 ? t * (1 + n) : t + n - t * n)
                  , o = [0, 0, 0];
                for (let t = 0; t < 3; t++)
                    (i = a + 1 / 3 * -(t - 1)) < 0 && i++,
                    1 < i && i--,
                    r = 6 * i < 1 ? s + 6 * (e - s) * i : 2 * i < 1 ? e : 3 * i < 2 ? s + (e - s) * (2 / 3 - i) * 6 : s,
                    o[t] = 255 * r;
                return {
                    r: Math.round(o[0]),
                    g: Math.round(o[1]),
                    b: Math.round(o[2]),
                    a: 1
                }
            }
        },
        haveIntersection: (t, e) => !(e.x > t.x + t.width || e.x + e.width < t.x || e.y > t.y + t.height || e.y + e.height < t.y),
        cloneObject(t) {
            var e, i = {};
            for (e in t)
                this._isPlainObject(t[e]) ? i[e] = this.cloneObject(t[e]) : this._isArray(t[e]) ? i[e] = this.cloneArray(t[e]) : i[e] = t[e];
            return i
        },
        cloneArray: t => t.slice(0),
        degToRad: t => t * F,
        radToDeg: t => t * B,
        _degToRad: t => (N.warn("Util._degToRad is removed. Please use public Util.degToRad instead."),
        N.degToRad(t)),
        _radToDeg: t => (N.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."),
        N.radToDeg(t)),
        _getRotation: t => A.angleDeg ? N.radToDeg(t) : t,
        _capitalize: t => t.charAt(0).toUpperCase() + t.slice(1),
        throw(t) {
            throw new Error(H + t)
        },
        error(t) {
            console.error(H + t)
        },
        warn(t) {
            A.showWarnings && console.warn("Konva warning: " + t)
        },
        each(t, e) {
            for (var i in t)
                e(i, t[i])
        },
        _inRange: (t, e, i) => e <= t && t < i,
        _getProjectionToSegment(t, e, i, r, a, n) {
            let s, o, h;
            var l = (t - i) * (t - i) + (e - r) * (e - r);
            return h = 0 == l ? (s = t,
            o = e,
            (a - i) * (a - i) + (n - r) * (n - r)) : (l = ((a - t) * (i - t) + (n - e) * (r - e)) / l) < 0 ? ((s = t) - a) * (t - a) + ((o = e) - n) * (e - n) : 1 < l ? ((s = i) - a) * (i - a) + ((o = r) - n) * (r - n) : (s = t + l * (i - t),
            o = e + l * (r - e),
            (s - a) * (s - a) + (o - n) * (o - n)),
            [s, o, h]
        },
        _getProjectionToLine(r, a, n) {
            let s = N.cloneObject(r)
              , o = Number.MAX_VALUE;
            return a.forEach(function(t, e) {
                var i;
                (n || e !== a.length - 1) && (e = a[(e + 1) % a.length],
                e = (t = N._getProjectionToSegment(t.x, t.y, e.x, e.y, r.x, r.y))[0],
                i = t[1],
                (t = t[2]) < o) && (s.x = e,
                s.y = i,
                o = t)
            }),
            s
        },
        _prepareArrayForTween(e, i, r) {
            let t, a = [], n = [];
            if (e.length > i.length) {
                let t = i;
                i = e,
                e = t
            }
            for (t = 0; t < e.length; t += 2)
                a.push({
                    x: e[t],
                    y: e[t + 1]
                });
            for (t = 0; t < i.length; t += 2)
                n.push({
                    x: i[t],
                    y: i[t + 1]
                });
            let s = [];
            return n.forEach(function(t) {
                t = N._getProjectionToLine(t, a, r);
                s.push(t.x),
                s.push(t.y)
            }),
            s
        },
        _prepareToStringify(t) {
            var e, i;
            for (i in t.visitedByCircularReferenceRemoval = !0,
            t)
                if (t.hasOwnProperty(i) && t[i] && "object" == typeof t[i])
                    if (e = Object.getOwnPropertyDescriptor(t, i),
                    t[i].visitedByCircularReferenceRemoval || N._isElement(t[i])) {
                        if (!e.configurable)
                            return null;
                        delete t[i]
                    } else if (null === N._prepareToStringify(t[i])) {
                        if (!e.configurable)
                            return null;
                        delete t[i]
                    }
            return delete t.visitedByCircularReferenceRemoval,
            t
        },
        _assign(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        },
        _getFirstPointerId: t => t.touches ? t.changedTouches[0].identifier : t.pointerId || 999,
        releaseCanvas(...t) {
            A.releaseCanvasOnDestroy && t.forEach(t => {
                t.width = 0,
                t.height = 0
            }
            )
        },
        drawRoundedRectPath(t, e, i, r) {
            let a = 0
              , n = 0
              , s = 0
              , o = 0;
            "number" == typeof r ? a = n = s = o = Math.min(r, e / 2, i / 2) : (a = Math.min(r[0] || 0, e / 2, i / 2),
            n = Math.min(r[1] || 0, e / 2, i / 2),
            o = Math.min(r[2] || 0, e / 2, i / 2),
            s = Math.min(r[3] || 0, e / 2, i / 2)),
            t.moveTo(a, 0),
            t.lineTo(e - n, 0),
            t.arc(e - n, n, n, 3 * Math.PI / 2, 0, !1),
            t.lineTo(e, i - o),
            t.arc(e - o, i - o, o, 0, Math.PI / 2, !1),
            t.lineTo(s, i),
            t.arc(s, i - s, s, Math.PI / 2, Math.PI, !1),
            t.lineTo(0, a),
            t.arc(a, a, a, Math.PI, 3 * Math.PI / 2, !1)
        }
    };
    function g(t) {
        return N._isString(t) ? '"' + t + '"' : "[object Number]" === Object.prototype.toString.call(t) || N._isBoolean(t) ? t : Object.prototype.toString.call(t)
    }
    function j(t) {
        return 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }
    function e() {
        if (A.isUnminified)
            return function(t, e) {
                return N._isNumber(t) || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'),
                t
            }
    }
    function q(a) {
        if (A.isUnminified)
            return function(t, e) {
                var i = N._isNumber(t)
                  , r = N._isArray(t) && t.length == a;
                return i || r || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or Array<number>(' + a + ")"),
                t
            }
    }
    function U() {
        if (A.isUnminified)
            return function(t, e) {
                return N._isNumber(t) || "auto" === t || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'),
                t
            }
    }
    function i() {
        if (A.isUnminified)
            return function(t, e) {
                return N._isString(t) || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'),
                t
            }
    }
    function V() {
        if (A.isUnminified)
            return function(t, e) {
                var i = N._isString(t)
                  , r = "[object CanvasGradient]" === Object.prototype.toString.call(t) || t && t.addColorStop;
                return i || r || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string or a native gradient.'),
                t
            }
    }
    function r() {
        if (A.isUnminified)
            return function(t, e) {
                return !0 !== t && !1 !== t && N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'),
                t
            }
    }
    let K = "get"
      , Q = "set"
      , u = {
        addGetterSetter(t, e, i, r, a) {
            u.addGetter(t, e, i),
            u.addSetter(t, e, r, a),
            u.addOverloadedGetterSetter(t, e)
        },
        addGetter(t, e, i) {
            var r = K + N._capitalize(e);
            t.prototype[r] = t.prototype[r] || function() {
                var t = this.attrs[e];
                return void 0 === t ? i : t
            }
        },
        addSetter(t, e, i, r) {
            var a = Q + N._capitalize(e);
            t.prototype[a] || u.overWriteSetter(t, e, i, r)
        },
        overWriteSetter(t, e, i, r) {
            var a = Q + N._capitalize(e);
            t.prototype[a] = function(t) {
                return i && null != t && (t = i.call(this, t, e)),
                this._setAttr(e, t),
                r && r.call(this),
                this
            }
        },
        addComponentsGetterSetter(t, r, a, n, s) {
            let e, i, o = a.length, h = N._capitalize, l = K + h(r), d = Q + h(r), c = (t.prototype[l] = function() {
                var t = {};
                for (e = 0; e < o; e++)
                    t[i = a[e]] = this.getAttr(r + h(i));
                return t
            }
            ,
            (i => {
                if (A.isUnminified)
                    return function(t, e) {
                        return null == t || N.isObject(t) || N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be an object with properties ' + i),
                        t
                    }
            }
            )(a));
            t.prototype[d] = function(t) {
                let e, i = this.attrs[r];
                for (e in n && (t = n.call(this, t)),
                c && c.call(this, t, r),
                t)
                    t.hasOwnProperty(e) && this._setAttr(r + h(e), t[e]);
                return t || a.forEach(t => {
                    this._setAttr(r + h(t), void 0)
                }
                ),
                this._fireChangeEvent(r, i, t),
                s && s.call(this),
                this
            }
            ,
            u.addOverloadedGetterSetter(t, r)
        },
        addOverloadedGetterSetter(t, e) {
            let i = N._capitalize(e)
              , r = Q + i
              , a = K + i;
            t.prototype[e] = function() {
                return arguments.length ? (this[r](arguments[0]),
                this) : this[a]()
            }
        },
        addDeprecatedGetterSetter(t, e, i, r) {
            N.error("Adding deprecated " + e);
            let a = K + N._capitalize(e)
              , n = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
            t.prototype[a] = function() {
                N.error(n);
                var t = this.attrs[e];
                return void 0 === t ? i : t
            }
            ,
            u.addSetter(t, e, r, function() {
                N.error(n)
            }),
            u.addOverloadedGetterSetter(t, e)
        },
        backCompat(s, t) {
            N.each(t, function(t, e) {
                let i = s.prototype[e]
                  , r = K + N._capitalize(t)
                  , a = Q + N._capitalize(t);
                function n() {
                    i.apply(this, arguments),
                    N.error('"' + t + '" method is deprecated and will be removed soon. Use ""' + e + '" instead.')
                }
                s.prototype[t] = n,
                s.prototype[r] = n,
                s.prototype[a] = n
            })
        },
        afterSetFilter() {
            this._filterUpToDate = !1
        }
    }
      , J = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "roundRect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"];
    class Z {
        constructor(t) {
            this.canvas = t,
            A.enableTrace && (this.traceArr = [],
            this._enableTrace())
        }
        fillShape(t) {
            t.fillEnabled() && this._fill(t)
        }
        _fill(t) {}
        strokeShape(t) {
            t.hasStroke() && this._stroke(t)
        }
        _stroke(t) {}
        fillStrokeShape(t) {
            t.attrs.fillAfterStrokeEnabled ? (this.strokeShape(t),
            this.fillShape(t)) : (this.fillShape(t),
            this.strokeShape(t))
        }
        getTrace(t, e) {
            let i, r, a, n, s = this.traceArr, o = s.length, h = "";
            for (i = 0; i < o; i++)
                (a = (r = s[i]).method) ? (n = r.args,
                h += a,
                t ? h += "()" : N._isArray(n[0]) ? h += "([" + n.join(",") + "])" : (e && (n = n.map(t => "number" == typeof t ? Math.floor(t) : t)),
                h += "(" + n.join(",") + ")")) : (h += r.property,
                t || (h += "=" + r.val)),
                h += ";";
            return h
        }
        clearTrace() {
            this.traceArr = []
        }
        _trace(t) {
            var e = this.traceArr;
            e.push(t),
            100 <= e.length && e.shift()
        }
        reset() {
            var t = this.getCanvas().getPixelRatio();
            this.setTransform(+t, 0, 0, +t, 0, 0)
        }
        getCanvas() {
            return this.canvas
        }
        clear(t) {
            var e = this.getCanvas();
            t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
        }
        _applyLineCap(t) {
            t = t.attrs.lineCap;
            t && this.setAttr("lineCap", t)
        }
        _applyOpacity(t) {
            t = t.getAbsoluteOpacity();
            1 !== t && this.setAttr("globalAlpha", t)
        }
        _applyLineJoin(t) {
            t = t.attrs.lineJoin;
            t && this.setAttr("lineJoin", t)
        }
        setAttr(t, e) {
            this._context[t] = e
        }
        arc(t, e, i, r, a, n) {
            this._context.arc(t, e, i, r, a, n)
        }
        arcTo(t, e, i, r, a) {
            this._context.arcTo(t, e, i, r, a)
        }
        beginPath() {
            this._context.beginPath()
        }
        bezierCurveTo(t, e, i, r, a, n) {
            this._context.bezierCurveTo(t, e, i, r, a, n)
        }
        clearRect(t, e, i, r) {
            this._context.clearRect(t, e, i, r)
        }
        clip(...t) {
            this._context.clip.apply(this._context, t)
        }
        closePath() {
            this._context.closePath()
        }
        createImageData(t, e) {
            var i = arguments;
            return 2 === i.length ? this._context.createImageData(t, e) : 1 === i.length ? this._context.createImageData(t) : void 0
        }
        createLinearGradient(t, e, i, r) {
            return this._context.createLinearGradient(t, e, i, r)
        }
        createPattern(t, e) {
            return this._context.createPattern(t, e)
        }
        createRadialGradient(t, e, i, r, a, n) {
            return this._context.createRadialGradient(t, e, i, r, a, n)
        }
        drawImage(t, e, i, r, a, n, s, o, h) {
            var l = arguments
              , d = this._context;
            3 === l.length ? d.drawImage(t, e, i) : 5 === l.length ? d.drawImage(t, e, i, r, a) : 9 === l.length && d.drawImage(t, e, i, r, a, n, s, o, h)
        }
        ellipse(t, e, i, r, a, n, s, o) {
            this._context.ellipse(t, e, i, r, a, n, s, o)
        }
        isPointInPath(t, e, i, r) {
            return i ? this._context.isPointInPath(i, t, e, r) : this._context.isPointInPath(t, e, r)
        }
        fill(...t) {
            this._context.fill.apply(this._context, t)
        }
        fillRect(t, e, i, r) {
            this._context.fillRect(t, e, i, r)
        }
        strokeRect(t, e, i, r) {
            this._context.strokeRect(t, e, i, r)
        }
        fillText(t, e, i, r) {
            r ? this._context.fillText(t, e, i, r) : this._context.fillText(t, e, i)
        }
        measureText(t) {
            return this._context.measureText(t)
        }
        getImageData(t, e, i, r) {
            return this._context.getImageData(t, e, i, r)
        }
        lineTo(t, e) {
            this._context.lineTo(t, e)
        }
        moveTo(t, e) {
            this._context.moveTo(t, e)
        }
        rect(t, e, i, r) {
            this._context.rect(t, e, i, r)
        }
        roundRect(t, e, i, r, a) {
            this._context.roundRect(t, e, i, r, a)
        }
        putImageData(t, e, i) {
            this._context.putImageData(t, e, i)
        }
        quadraticCurveTo(t, e, i, r) {
            this._context.quadraticCurveTo(t, e, i, r)
        }
        restore() {
            this._context.restore()
        }
        rotate(t) {
            this._context.rotate(t)
        }
        save() {
            this._context.save()
        }
        scale(t, e) {
            this._context.scale(t, e)
        }
        setLineDash(t) {
            this._context.setLineDash ? this._context.setLineDash(t) : "mozDash"in this._context ? this._context.mozDash = t : "webkitLineDash"in this._context && (this._context.webkitLineDash = t)
        }
        getLineDash() {
            return this._context.getLineDash()
        }
        setTransform(t, e, i, r, a, n) {
            this._context.setTransform(t, e, i, r, a, n)
        }
        stroke(t) {
            t ? this._context.stroke(t) : this._context.stroke()
        }
        strokeText(t, e, i, r) {
            this._context.strokeText(t, e, i, r)
        }
        transform(t, e, i, r, a, n) {
            this._context.transform(t, e, i, r, a, n)
        }
        translate(t, e) {
            this._context.translate(t, e)
        }
        _enableTrace() {
            let t, r, a = this, e = J.length, i = this.setAttr;
            function n(t) {
                let e, i = a[t];
                a[t] = function() {
                    return r = (t => {
                        let e, i, r = [], a = t.length, n = N;
                        for (e = 0; e < a; e++)
                            i = t[e],
                            n._isNumber(i) ? i = Math.round(1e3 * i) / 1e3 : n._isString(i) || (i += ""),
                            r.push(i);
                        return r
                    }
                    )(Array.prototype.slice.call(arguments, 0)),
                    e = i.apply(a, arguments),
                    a._trace({
                        method: t,
                        args: r
                    }),
                    e
                }
            }
            for (t = 0; t < e; t++)
                n(J[t]);
            a.setAttr = function() {
                i.apply(a, arguments);
                var t = arguments[0];
                let e = arguments[1];
                "shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()),
                a._trace({
                    property: t,
                    val: e
                })
            }
        }
        _applyGlobalCompositeOperation(t) {
            t = t.attrs.globalCompositeOperation;
            t && "source-over" !== t && this.setAttr("globalCompositeOperation", t)
        }
    }
    ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "letterSpacing", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "direction", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"].forEach(function(e) {
        Object.defineProperty(Z.prototype, e, {
            get() {
                return this._context[e]
            },
            set(t) {
                this._context[e] = t
            }
        })
    });
    class $ extends Z {
        constructor(t, {willReadFrequently: e=!1}={}) {
            super(t),
            this._context = t._canvas.getContext("2d", {
                willReadFrequently: e
            })
        }
        _fillColor(t) {
            var e = t.fill();
            this.setAttr("fillStyle", e),
            t._fillFunc(this)
        }
        _fillPattern(t) {
            this.setAttr("fillStyle", t._getFillPattern()),
            t._fillFunc(this)
        }
        _fillLinearGradient(t) {
            var e = t._getLinearGradient();
            e && (this.setAttr("fillStyle", e),
            t._fillFunc(this))
        }
        _fillRadialGradient(t) {
            var e = t._getRadialGradient();
            e && (this.setAttr("fillStyle", e),
            t._fillFunc(this))
        }
        _fill(t) {
            var e, i, r, a = t.fill(), n = t.getFillPriority();
            a && "color" === n ? this._fillColor(t) : (e = t.getFillPatternImage()) && "pattern" === n ? this._fillPattern(t) : (i = t.getFillLinearGradientColorStops()) && "linear-gradient" === n ? this._fillLinearGradient(t) : (r = t.getFillRadialGradientColorStops()) && "radial-gradient" === n ? this._fillRadialGradient(t) : a ? this._fillColor(t) : e ? this._fillPattern(t) : i ? this._fillLinearGradient(t) : r && this._fillRadialGradient(t)
        }
        _strokeLinearGradient(t) {
            var e = t.getStrokeLinearGradientStartPoint()
              , i = t.getStrokeLinearGradientEndPoint()
              , r = t.getStrokeLinearGradientColorStops()
              , a = this.createLinearGradient(e.x, e.y, i.x, i.y);
            if (r) {
                for (let t = 0; t < r.length; t += 2)
                    a.addColorStop(r[t], r[t + 1]);
                this.setAttr("strokeStyle", a)
            }
        }
        _stroke(t) {
            var e = t.dash()
              , i = t.getStrokeScaleEnabled();
            if (t.hasStroke()) {
                if (!i) {
                    this.save();
                    let t = this.getCanvas().getPixelRatio();
                    this.setTransform(t, 0, 0, t, 0, 0)
                }
                this._applyLineCap(t),
                e && t.dashEnabled() && (this.setLineDash(e),
                this.setAttr("lineDashOffset", t.dashOffset())),
                this.setAttr("lineWidth", t.strokeWidth()),
                t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"),
                t.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t) : this.setAttr("strokeStyle", t.stroke()),
                t._strokeFunc(this),
                i || this.restore()
            }
        }
        _applyShadow(t) {
            var e = null != (e = t.getShadowRGBA()) ? e : "black"
              , i = null != (i = t.getShadowBlur()) ? i : 5
              , r = null != (r = t.getShadowOffset()) ? r : {
                x: 0,
                y: 0
            }
              , t = t.getAbsoluteScale()
              , a = this.canvas.getPixelRatio()
              , n = t.x * a
              , t = t.y * a;
            this.setAttr("shadowColor", e),
            this.setAttr("shadowBlur", i * Math.min(Math.abs(n), Math.abs(t))),
            this.setAttr("shadowOffsetX", r.x * n),
            this.setAttr("shadowOffsetY", r.y * t)
        }
    }
    class tt extends Z {
        constructor(t) {
            super(t),
            this._context = t._canvas.getContext("2d", {
                willReadFrequently: !0
            })
        }
        _fill(t) {
            this.save(),
            this.setAttr("fillStyle", t.colorKey),
            t._fillFuncHit(this),
            this.restore()
        }
        strokeShape(t) {
            t.hasHitStroke() && this._stroke(t)
        }
        _stroke(t) {
            if (t.hasHitStroke()) {
                var e = t.getStrokeScaleEnabled();
                if (!e) {
                    this.save();
                    let t = this.getCanvas().getPixelRatio();
                    this.setTransform(t, 0, 0, t, 0, 0)
                }
                this._applyLineCap(t);
                var i = t.hitStrokeWidth()
                  , i = "auto" === i ? t.strokeWidth() : i;
                this.setAttr("lineWidth", i),
                this.setAttr("strokeStyle", t.colorKey),
                t._strokeFuncHit(this),
                e || this.restore()
            }
        }
    }
    let et;
    class it {
        constructor(t) {
            this.pixelRatio = 1,
            this.width = 0,
            this.height = 0,
            this.isCache = !1;
            var e = (t || {}).pixelRatio || A.pixelRatio || (et || (e = (t = N.createCanvasElement()).getContext("2d"),
            et = (A._global.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1),
            N.releaseCanvas(t)),
            et);
            this.pixelRatio = e,
            this._canvas = N.createCanvasElement(),
            this._canvas.style.padding = "0",
            this._canvas.style.margin = "0",
            this._canvas.style.border = "0",
            this._canvas.style.background = "transparent",
            this._canvas.style.position = "absolute",
            this._canvas.style.top = "0",
            this._canvas.style.left = "0"
        }
        getContext() {
            return this.context
        }
        getPixelRatio() {
            return this.pixelRatio
        }
        setPixelRatio(t) {
            var e = this.pixelRatio;
            this.pixelRatio = t,
            this.setSize(this.getWidth() / e, this.getHeight() / e)
        }
        setWidth(t) {
            this.width = this._canvas.width = t * this.pixelRatio,
            this._canvas.style.width = t + "px";
            t = this.pixelRatio;
            this.getContext()._context.scale(t, t)
        }
        setHeight(t) {
            this.height = this._canvas.height = t * this.pixelRatio,
            this._canvas.style.height = t + "px";
            t = this.pixelRatio;
            this.getContext()._context.scale(t, t)
        }
        getWidth() {
            return this.width
        }
        getHeight() {
            return this.height
        }
        setSize(t, e) {
            this.setWidth(t || 0),
            this.setHeight(e || 0)
        }
        toDataURL(t, e) {
            try {
                return this._canvas.toDataURL(t, e)
            } catch (t) {
                try {
                    return this._canvas.toDataURL()
                } catch (t) {
                    return N.error("Unable to get data URL. " + t.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."),
                    ""
                }
            }
        }
    }
    u.addGetterSetter(it, "pixelRatio", void 0, e());
    class f extends it {
        constructor(t={
            width: 0,
            height: 0,
            willReadFrequently: !1
        }) {
            super(t),
            this.context = new $(this,{
                willReadFrequently: t.willReadFrequently
            }),
            this.setSize(t.width, t.height)
        }
    }
    class rt extends it {
        constructor(t={
            width: 0,
            height: 0
        }) {
            super(t),
            this.hitCanvas = !0,
            this.context = new tt(this),
            this.setSize(t.width, t.height)
        }
    }
    let c = {
        get isDragging() {
            let e = !1;
            return c._dragElements.forEach(t => {
                "dragging" === t.dragStatus && (e = !0)
            }
            ),
            e
        },
        justDragged: !1,
        get node() {
            let e;
            return c._dragElements.forEach(t => {
                e = t.node
            }
            ),
            e
        },
        _dragElements: new Map,
        _drag(a) {
            let n = [];
            c._dragElements.forEach( (e, t) => {
                var i = e.node
                  , r = i.getStage()
                  , r = (r.setPointersPositions(a),
                void 0 === e.pointerId && (e.pointerId = N._getFirstPointerId(a)),
                r._changedPointerPositions.find(t => t.id === e.pointerId));
                if (r) {
                    if ("dragging" !== e.dragStatus) {
                        let t = i.dragDistance();
                        if (Math.max(Math.abs(r.x - e.startPointerPos.x), Math.abs(r.y - e.startPointerPos.y)) < t)
                            return;
                        if (i.startDrag({
                            evt: a
                        }),
                        !i.isDragging())
                            return
                    }
                    i._setDragPosition(a, e),
                    n.push(i)
                }
            }
            ),
            n.forEach(t => {
                t.fire("dragmove", {
                    type: "dragmove",
                    target: t,
                    evt: a
                }, !0)
            }
            )
        },
        _endDragBefore(i) {
            let r = [];
            c._dragElements.forEach(e => {
                var t = e.node
                  , t = t.getStage();
                i && t.setPointersPositions(i),
                t._changedPointerPositions.find(t => t.id === e.pointerId) && ("dragging" !== e.dragStatus && "stopped" !== e.dragStatus || (c.justDragged = !0,
                A._mouseListenClick = !1,
                A._touchListenClick = !1,
                A._pointerListenClick = !1,
                e.dragStatus = "stopped"),
                t = e.node.getLayer() || e.node instanceof A.Stage && e.node) && -1 === r.indexOf(t) && r.push(t)
            }
            ),
            r.forEach(t => {
                t.draw()
            }
            )
        },
        _endDragAfter(i) {
            c._dragElements.forEach( (t, e) => {
                "stopped" === t.dragStatus && t.node.fire("dragend", {
                    type: "dragend",
                    target: t.node,
                    evt: i
                }, !0),
                "dragging" !== t.dragStatus && c._dragElements.delete(e)
            }
            )
        }
    }
      , at = (A.isBrowser && (window.addEventListener("mouseup", c._endDragBefore, !0),
    window.addEventListener("touchend", c._endDragBefore, !0),
    window.addEventListener("touchcancel", c._endDragBefore, !0),
    window.addEventListener("mousemove", c._drag),
    window.addEventListener("touchmove", c._drag),
    window.addEventListener("mouseup", c._endDragAfter, !1),
    window.addEventListener("touchend", c._endDragAfter, !1),
    window.addEventListener("touchcancel", c._endDragAfter, !1)),
    "absoluteOpacity")
      , nt = "allEventListeners"
      , n = "absoluteTransform"
      , st = "absoluteScale"
      , p = "canvas"
      , ot = "listening"
      , ht = "mouseenter"
      , lt = "mouseleave"
      , dt = "Shape"
      , ct = " "
      , gt = "stage"
      , m = "transform"
      , ut = "visible"
      , ft = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(ct)
      , pt = 1;
    class o {
        constructor(t) {
            this._id = pt++,
            this.eventListeners = {},
            this.attrs = {},
            this.index = 0,
            this._allEventListeners = null,
            this.parent = null,
            this._cache = new Map,
            this._attachedDepsListeners = new Map,
            this._lastPos = null,
            this._batchingTransformChange = !1,
            this._needClearTransformCache = !1,
            this._filterUpToDate = !1,
            this._isUnderCache = !1,
            this._dragEventId = null,
            this._shouldFireChangeEvents = !1,
            this.setAttrs(t),
            this._shouldFireChangeEvents = !0
        }
        hasChildren() {
            return !1
        }
        _clearCache(t) {
            t !== m && t !== n || !this._cache.get(t) ? t ? this._cache.delete(t) : this._cache.clear() : this._cache.get(t).dirty = !0
        }
        _getCache(t, e) {
            let i = this._cache.get(t);
            return void 0 !== i && (t !== m && t !== n || !0 !== i.dirty) || (i = e.call(this),
            this._cache.set(t, i)),
            i
        }
        _calculate(e, i, t) {
            if (!this._attachedDepsListeners.get(e)) {
                let t = i.map(t => t + "Change.konva").join(ct);
                this.on(t, () => {
                    this._clearCache(e)
                }
                ),
                this._attachedDepsListeners.set(e, !0)
            }
            return this._getCache(e, t)
        }
        _getCanvasCache() {
            return this._cache.get(p)
        }
        _clearSelfAndDescendantCache(t) {
            this._clearCache(t),
            t === n && this.fire("absoluteTransformChange")
        }
        clearCache() {
            var t, e, i;
            return this._cache.has(p) && ({scene: t, filter: e, hit: i} = this._cache.get(p),
            N.releaseCanvas(t, e, i),
            this._cache.delete(p)),
            this._clearSelfAndDescendantCache(),
            this._requestDraw(),
            this
        }
        cache(t) {
            t = t || {};
            let e = {};
            void 0 !== t.x && void 0 !== t.y && void 0 !== t.width && void 0 !== t.height || (e = this.getClientRect({
                skipTransform: !0,
                relativeTo: this.getParent() || void 0
            }));
            var i, r, a = Math.ceil(t.width || e.width), n = Math.ceil(t.height || e.height), s = t.pixelRatio, o = void 0 === t.x ? Math.floor(e.x) : t.x, h = void 0 === t.y ? Math.floor(e.y) : t.y, l = t.offset || 0, d = t.drawBorder || !1, c = t.hitCanvasPixelRatio || 1;
            if (a && n)
                return a += 2 * l + (.5 < Math.abs(Math.round(e.x) - o) ? 1 : 0),
                n += 2 * l + (.5 < Math.abs(Math.round(e.y) - h) ? 1 : 0),
                o -= l,
                h -= l,
                l = new f({
                    pixelRatio: s,
                    width: a,
                    height: n
                }),
                s = new f({
                    pixelRatio: s,
                    width: 0,
                    height: 0,
                    willReadFrequently: !0
                }),
                c = new rt({
                    pixelRatio: c,
                    width: a,
                    height: n
                }),
                i = l.getContext(),
                r = c.getContext(),
                c.isCache = !0,
                l.isCache = !0,
                this._cache.delete(p),
                (this._filterUpToDate = !1) === t.imageSmoothingEnabled && (l.getContext()._context.imageSmoothingEnabled = !1,
                s.getContext()._context.imageSmoothingEnabled = !1),
                i.save(),
                r.save(),
                i.translate(-o, -h),
                r.translate(-o, -h),
                this._isUnderCache = !0,
                this._clearSelfAndDescendantCache(at),
                this._clearSelfAndDescendantCache(st),
                this.drawScene(l, this),
                this.drawHit(c, this),
                this._isUnderCache = !1,
                i.restore(),
                r.restore(),
                d && (i.save(),
                i.beginPath(),
                i.rect(0, 0, a, n),
                i.closePath(),
                i.setAttr("strokeStyle", "red"),
                i.setAttr("lineWidth", 5),
                i.stroke(),
                i.restore()),
                this._cache.set(p, {
                    scene: l,
                    filter: s,
                    hit: c,
                    x: o,
                    y: h
                }),
                this._requestDraw(),
                this;
            N.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.")
        }
        isCached() {
            return this._cache.has(p)
        }
        getClientRect(t) {
            throw new Error('abstract "getClientRect" method call')
        }
        _transformedRect(t, e) {
            t = [{
                x: t.x,
                y: t.y
            }, {
                x: t.x + t.width,
                y: t.y
            }, {
                x: t.x + t.width,
                y: t.y + t.height
            }, {
                x: t.x,
                y: t.y + t.height
            }];
            let i = 1 / 0
              , r = 1 / 0
              , a = -1 / 0
              , n = -1 / 0
              , s = this.getAbsoluteTransform(e);
            return t.forEach(function(t) {
                t = s.point(t);
                void 0 === i && (i = a = t.x,
                r = n = t.y),
                i = Math.min(i, t.x),
                r = Math.min(r, t.y),
                a = Math.max(a, t.x),
                n = Math.max(n, t.y)
            }),
            {
                x: i,
                y: r,
                width: a - i,
                height: n - r
            }
        }
        _drawCachedSceneCanvas(t) {
            t.save(),
            t._applyOpacity(this),
            t._applyGlobalCompositeOperation(this);
            var e = this._getCanvasCache()
              , e = (t.translate(e.x, e.y),
            this._getCachedSceneCanvas())
              , i = e.pixelRatio;
            t.drawImage(e._canvas, 0, 0, e.width / i, e.height / i),
            t.restore()
        }
        _drawCachedHitCanvas(t) {
            var e = this._getCanvasCache()
              , i = e.hit;
            t.save(),
            t.translate(e.x, e.y),
            t.drawImage(i._canvas, 0, 0, i.width / i.pixelRatio, i.height / i.pixelRatio),
            t.restore()
        }
        _getCachedSceneCanvas() {
            let e, i, r, a, n = this.filters(), t = this._getCanvasCache(), s = t.scene, o = t.filter, h = o.getContext();
            if (n) {
                if (!this._filterUpToDate) {
                    let t = s.pixelRatio;
                    o.setSize(s.width / s.pixelRatio, s.height / s.pixelRatio);
                    try {
                        for (e = n.length,
                        h.clear(),
                        h.drawImage(s._canvas, 0, 0, s.getWidth() / t, s.getHeight() / t),
                        i = h.getImageData(0, 0, o.getWidth(), o.getHeight()),
                        r = 0; r < e; r++)
                            "function" == typeof (a = n[r]) ? (a.call(this, i),
                            h.putImageData(i, 0, 0)) : N.error("Filter should be type of function, but got " + typeof a + " instead. Please check correct filters")
                    } catch (e) {
                        N.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")
                    }
                    this._filterUpToDate = !0
                }
                return o
            }
            return s
        }
        on(t, e) {
            if (this._cache && this._cache.delete(nt),
            3 === arguments.length)
                return this._delegate.apply(this, arguments);
            let i, r, a, n, s = t.split(ct), o = s.length;
            for (i = 0; i < o; i++)
                a = (r = s[i].split("."))[0],
                n = r[1] || "",
                this.eventListeners[a] || (this.eventListeners[a] = []),
                this.eventListeners[a].push({
                    name: n,
                    handler: e
                });
            return this
        }
        off(t, e) {
            let i, r, a, n, s, o = (t || "").split(ct), h = o.length;
            if (this._cache && this._cache.delete(nt),
            !t)
                for (r in this.eventListeners)
                    this._off(r);
            for (i = 0; i < h; i++)
                if (n = (a = o[i].split("."))[0],
                s = a[1],
                n)
                    this.eventListeners[n] && this._off(n, s, e);
                else
                    for (r in this.eventListeners)
                        this._off(r, s, e);
            return this
        }
        dispatchEvent(t) {
            var e = {
                target: this,
                type: t.type,
                evt: t
            };
            return this.fire(t.type, e),
            this
        }
        addEventListener(t, e) {
            return this.on(t, function(t) {
                e.call(this, t.evt)
            }),
            this
        }
        removeEventListener(t) {
            return this.off(t),
            this
        }
        _delegate(t, r, a) {
            let n = this;
            this.on(t, function(e) {
                var i = e.target.findAncestors(r, !0, n);
                for (let t = 0; t < i.length; t++)
                    (e = N.cloneObject(e)).currentTarget = i[t],
                    a.call(i[t], e)
            })
        }
        remove() {
            return this.isDragging() && this.stopDrag(),
            c._dragElements.delete(this._id),
            this._remove(),
            this
        }
        _clearCaches() {
            this._clearSelfAndDescendantCache(n),
            this._clearSelfAndDescendantCache(at),
            this._clearSelfAndDescendantCache(st),
            this._clearSelfAndDescendantCache(gt),
            this._clearSelfAndDescendantCache(ut),
            this._clearSelfAndDescendantCache(ot)
        }
        _remove() {
            this._clearCaches();
            var t = this.getParent();
            t && t.children && (t.children.splice(this.index, 1),
            t._setChildrenIndices(),
            this.parent = null)
        }
        destroy() {
            return this.remove(),
            this.clearCache(),
            this
        }
        getAttr(t) {
            var e = "get" + N._capitalize(t);
            return N._isFunction(this[e]) ? this[e]() : this.attrs[t]
        }
        getAncestors() {
            let t = this.getParent()
              , e = [];
            for (; t; )
                e.push(t),
                t = t.getParent();
            return e
        }
        getAttrs() {
            return this.attrs || {}
        }
        setAttrs(i) {
            return this._batchTransformChanges( () => {
                let t, e;
                if (!i)
                    return this;
                for (t in i)
                    "children" !== t && (e = "set" + N._capitalize(t),
                    N._isFunction(this[e]) ? this[e](i[t]) : this._setAttr(t, i[t]))
            }
            ),
            this
        }
        isListening() {
            return this._getCache(ot, this._isListening)
        }
        _isListening(t) {
            var e;
            return !!this.listening() && (!(e = this.getParent()) || e === t || this === t || e._isListening(t))
        }
        isVisible() {
            return this._getCache(ut, this._isVisible)
        }
        _isVisible(t) {
            var e;
            return !!this.visible() && (!(e = this.getParent()) || e === t || this === t || e._isVisible(t))
        }
        shouldDrawHit(t, e=!1) {
            if (t)
                return this._isVisible(t) && this._isListening(t);
            let i = this.getLayer()
              , r = !1;
            c._dragElements.forEach(t => {
                "dragging" !== t.dragStatus || "Stage" !== t.node.nodeType && t.node.getLayer() !== i || (r = !0)
            }
            );
            t = !e && !A.hitOnDragEnabled && (r || A.isTransforming());
            return this.isListening() && this.isVisible() && !t
        }
        show() {
            return this.visible(!0),
            this
        }
        hide() {
            return this.visible(!1),
            this
        }
        getZIndex() {
            return this.index || 0
        }
        getAbsoluteZIndex() {
            let i, r, a, n, s = this.getDepth(), o = this, h = 0;
            var t = this.getStage();
            return "Stage" !== o.nodeType && t && function t(e) {
                for (i = [],
                r = e.length,
                a = 0; a < r; a++)
                    n = e[a],
                    h++,
                    n.nodeType !== dt && (i = i.concat(n.getChildren().slice())),
                    n._id === o._id && (a = r);
                0 < i.length && i[0].getDepth() <= s && t(i)
            }(t.getChildren()),
            h
        }
        getDepth() {
            let t = 0
              , e = this.parent;
            for (; e; )
                t++,
                e = e.parent;
            return t
        }
        _batchTransformChanges(t) {
            this._batchingTransformChange = !0,
            t(),
            this._batchingTransformChange = !1,
            this._needClearTransformCache && (this._clearCache(m),
            this._clearSelfAndDescendantCache(n)),
            this._needClearTransformCache = !1
        }
        setPosition(t) {
            return this._batchTransformChanges( () => {
                this.x(t.x),
                this.y(t.y)
            }
            ),
            this
        }
        getPosition() {
            return {
                x: this.x(),
                y: this.y()
            }
        }
        getRelativePointerPosition() {
            var t, e = this.getStage();
            return (e = e && e.getPointerPosition()) ? ((t = this.getAbsoluteTransform().copy()).invert(),
            t.point(e)) : null
        }
        getAbsolutePosition(t) {
            let e = !1
              , i = this.parent;
            for (; i; ) {
                if (i.isCached()) {
                    e = !0;
                    break
                }
                i = i.parent
            }
            e && !t && (t = !0);
            var t = this.getAbsoluteTransform(t).getMatrix()
              , r = new d
              , a = this.offset();
            return r.m = t.slice(),
            r.translate(a.x, a.y),
            r.getTranslation()
        }
        setAbsolutePosition(t) {
            let {x: e, y: i, ...r} = this._clearTransform();
            this.attrs.x = e,
            this.attrs.y = i,
            this._clearCache(m);
            var a = this._getAbsoluteTransform().copy();
            return a.invert(),
            a.translate(t.x, t.y),
            t = {
                x: this.attrs.x + a.getTranslation().x,
                y: this.attrs.y + a.getTranslation().y
            },
            this._setTransform(r),
            this.setPosition({
                x: t.x,
                y: t.y
            }),
            this._clearCache(m),
            this._clearSelfAndDescendantCache(n),
            this
        }
        _setTransform(t) {
            let e;
            for (e in t)
                this.attrs[e] = t[e]
        }
        _clearTransform() {
            var t = {
                x: this.x(),
                y: this.y(),
                rotation: this.rotation(),
                scaleX: this.scaleX(),
                scaleY: this.scaleY(),
                offsetX: this.offsetX(),
                offsetY: this.offsetY(),
                skewX: this.skewX(),
                skewY: this.skewY()
            };
            return this.attrs.x = 0,
            this.attrs.y = 0,
            this.attrs.rotation = 0,
            this.attrs.scaleX = 1,
            this.attrs.scaleY = 1,
            this.attrs.offsetX = 0,
            this.attrs.offsetY = 0,
            this.attrs.skewX = 0,
            this.attrs.skewY = 0,
            t
        }
        move(t) {
            let e = t.x
              , i = t.y
              , r = this.x()
              , a = this.y();
            return void 0 !== e && (r += e),
            void 0 !== i && (a += i),
            this.setPosition({
                x: r,
                y: a
            }),
            this
        }
        _eachAncestorReverse(t, e) {
            let i, r, a = [], n = this.getParent();
            if (!e || e._id !== this._id) {
                for (a.unshift(this); n && (!e || n._id !== e._id); )
                    a.unshift(n),
                    n = n.parent;
                for (i = a.length,
                r = 0; r < i; r++)
                    t(a[r])
            }
        }
        rotate(t) {
            return this.rotation(this.rotation() + t),
            this
        }
        moveToTop() {
            var t;
            return this.parent ? (t = this.index) < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1),
            this.parent.children.push(this),
            this.parent._setChildrenIndices(),
            !0) : (N.warn("Node has no parent. moveToTop function is ignored."),
            !1)
        }
        moveUp() {
            var t;
            return this.parent ? (t = this.index) < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1),
            this.parent.children.splice(t + 1, 0, this),
            this.parent._setChildrenIndices(),
            !0) : (N.warn("Node has no parent. moveUp function is ignored."),
            !1)
        }
        moveDown() {
            var t;
            return this.parent ? 0 < (t = this.index) && (this.parent.children.splice(t, 1),
            this.parent.children.splice(t - 1, 0, this),
            this.parent._setChildrenIndices(),
            !0) : (N.warn("Node has no parent. moveDown function is ignored."),
            !1)
        }
        moveToBottom() {
            var t;
            return this.parent ? 0 < (t = this.index) && (this.parent.children.splice(t, 1),
            this.parent.children.unshift(this),
            this.parent._setChildrenIndices(),
            !0) : (N.warn("Node has no parent. moveToBottom function is ignored."),
            !1)
        }
        setZIndex(t) {
            var e;
            return this.parent ? ((t < 0 || t >= this.parent.children.length) && N.warn("Unexpected value " + t + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + "."),
            e = this.index,
            this.parent.children.splice(e, 1),
            this.parent.children.splice(t, 0, this),
            this.parent._setChildrenIndices()) : N.warn("Node has no parent. zIndex parameter is ignored."),
            this
        }
        getAbsoluteOpacity() {
            return this._getCache(at, this._getAbsoluteOpacity)
        }
        _getAbsoluteOpacity() {
            let t = this.opacity();
            var e = this.getParent();
            return e && !e._isUnderCache && (t *= e.getAbsoluteOpacity()),
            t
        }
        moveTo(t) {
            return this.getParent() !== t && (this._remove(),
            t.add(this)),
            this
        }
        toObject() {
            let t, e, i, r, a, n = this.getAttrs();
            var s = {
                attrs: {},
                className: this.getClassName()
            };
            for (t in n)
                e = n[t],
                a = N.isObject(e) && !N._isPlainObject(e) && !N._isArray(e),
                a || (i = "function" == typeof this[t] && this[t],
                delete n[t],
                r = i ? i.call(this) : null,
                n[t] = e,
                r !== e && (s.attrs[t] = e));
            return N._prepareToStringify(s)
        }
        toJSON() {
            return JSON.stringify(this.toObject())
        }
        getParent() {
            return this.parent
        }
        findAncestors(t, e, i) {
            var r = [];
            e && this._isMatch(t) && r.push(this);
            let a = this.parent;
            for (; a; ) {
                if (a === i)
                    return r;
                a._isMatch(t) && r.push(a),
                a = a.parent
            }
            return r
        }
        isAncestorOf(t) {
            return !1
        }
        findAncestor(t, e, i) {
            return this.findAncestors(t, e, i)[0]
        }
        _isMatch(a) {
            if (a) {
                if ("function" == typeof a)
                    return a(this);
                let t, e, i = a.replace(/ /g, "").split(","), r = i.length;
                for (t = 0; t < r; t++)
                    if (e = i[t],
                    N.isValidSelector(e) || (N.warn('Selector "' + e + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'),
                    N.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'),
                    N.warn("Konva is awesome, right?")),
                    "#" === e.charAt(0)) {
                        if (this.id() === e.slice(1))
                            return !0
                    } else if ("." === e.charAt(0)) {
                        if (this.hasName(e.slice(1)))
                            return !0
                    } else if (this.className === e || this.nodeType === e)
                        return !0
            }
            return !1
        }
        getLayer() {
            var t = this.getParent();
            return t ? t.getLayer() : null
        }
        getStage() {
            return this._getCache(gt, this._getStage)
        }
        _getStage() {
            var t = this.getParent();
            return t ? t.getStage() : null
        }
        fire(t, e={}, i) {
            return e.target = e.target || this,
            i ? this._fireAndBubble(t, e) : this._fire(t, e),
            this
        }
        getAbsoluteTransform(t) {
            return t ? this._getAbsoluteTransform(t) : this._getCache(n, this._getAbsoluteTransform)
        }
        _getAbsoluteTransform(t) {
            let a;
            if (t)
                return a = new d,
                this._eachAncestorReverse(function(t) {
                    var e = t.transformsEnabled();
                    "all" === e ? a.multiply(t.getTransform()) : "position" === e && a.translate(t.x() - t.offsetX(), t.y() - t.offsetY())
                }, t),
                a;
            {
                a = this._cache.get(n) || new d,
                this.parent ? this.parent.getAbsoluteTransform().copyInto(a) : a.reset();
                let t = this.transformsEnabled();
                if ("all" === t)
                    a.multiply(this.getTransform());
                else if ("position" === t) {
                    let t = this.attrs.x || 0
                      , e = this.attrs.y || 0
                      , i = this.attrs.offsetX || 0
                      , r = this.attrs.offsetY || 0;
                    a.translate(t - i, e - r)
                }
                return a.dirty = !1,
                a
            }
        }
        getAbsoluteScale(t) {
            let e = this;
            for (; e; )
                e._isUnderCache && (t = e),
                e = e.getParent();
            var i = this.getAbsoluteTransform(t).decompose();
            return {
                x: i.scaleX,
                y: i.scaleY
            }
        }
        getAbsoluteRotation() {
            return this.getAbsoluteTransform().decompose().rotation
        }
        getTransform() {
            return this._getCache(m, this._getTransform)
        }
        _getTransform() {
            var t = this._cache.get(m) || new d
              , e = (t.reset(),
            this.x())
              , i = this.y()
              , r = A.getAngle(this.rotation())
              , a = null != (a = this.attrs.scaleX) ? a : 1
              , n = null != (n = this.attrs.scaleY) ? n : 1
              , s = this.attrs.skewX || 0
              , o = this.attrs.skewY || 0
              , h = this.attrs.offsetX || 0
              , l = this.attrs.offsetY || 0;
            return 0 === e && 0 === i || t.translate(e, i),
            0 !== r && t.rotate(r),
            0 === s && 0 === o || t.skew(s, o),
            1 === a && 1 === n || t.scale(a, n),
            0 === h && 0 === l || t.translate(-1 * h, -1 * l),
            t.dirty = !1,
            t
        }
        clone(t) {
            let e, i, r, a, n, s = N.cloneObject(this.attrs);
            for (e in t)
                s[e] = t[e];
            var o = new this.constructor(s);
            for (e in this.eventListeners)
                for (i = this.eventListeners[e],
                r = i.length,
                a = 0; a < r; a++)
                    n = i[a],
                    n.name.indexOf("konva") < 0 && (o.eventListeners[e] || (o.eventListeners[e] = []),
                    o.eventListeners[e].push(n));
            return o
        }
        _toKonvaCanvas(t) {
            t = t || {};
            var e = this.getClientRect()
              , i = this.getStage()
              , r = void 0 !== t.x ? t.x : Math.floor(e.x)
              , a = void 0 !== t.y ? t.y : Math.floor(e.y)
              , n = t.pixelRatio || 1
              , e = new f({
                width: t.width || Math.ceil(e.width) || (i ? i.width() : 0),
                height: t.height || Math.ceil(e.height) || (i ? i.height() : 0),
                pixelRatio: n
            })
              , i = e.getContext()
              , n = new f({
                width: e.width / e.pixelRatio + Math.abs(r),
                height: e.height / e.pixelRatio + Math.abs(a),
                pixelRatio: e.pixelRatio
            });
            return !1 === t.imageSmoothingEnabled && (i._context.imageSmoothingEnabled = !1),
            i.save(),
            (r || a) && i.translate(-1 * r, -1 * a),
            this.drawScene(e, void 0, n),
            i.restore(),
            e
        }
        toCanvas(t) {
            return this._toKonvaCanvas(t)._canvas
        }
        toDataURL(t) {
            var e = (t = t || {}).mimeType || null
              , i = t.quality || null
              , e = this._toKonvaCanvas(t).toDataURL(e, i);
            return t.callback && t.callback(e),
            e
        }
        toImage(t) {
            return new Promise( (i, e) => {
                try {
                    let e = null == t ? void 0 : t.callback;
                    e && delete t.callback,
                    N._urlToImage(this.toDataURL(t), function(t) {
                        i(t),
                        null != e && e(t)
                    })
                } catch (t) {
                    e(t)
                }
            }
            )
        }
        toBlob(t) {
            return new Promise( (i, e) => {
                try {
                    let e = null == t ? void 0 : t.callback;
                    e && delete t.callback,
                    this.toCanvas(t).toBlob(t => {
                        i(t),
                        null != e && e(t)
                    }
                    , null == t ? void 0 : t.mimeType, null == t ? void 0 : t.quality)
                } catch (t) {
                    e(t)
                }
            }
            )
        }
        setSize(t) {
            return this.width(t.width),
            this.height(t.height),
            this
        }
        getSize() {
            return {
                width: this.width(),
                height: this.height()
            }
        }
        getClassName() {
            return this.className || this.nodeType
        }
        getType() {
            return this.nodeType
        }
        getDragDistance() {
            return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : A.dragDistance
        }
        _off(t, e, i) {
            let r, a, n, s = this.eventListeners[t];
            for (r = 0; r < s.length; r++)
                if (a = s[r].name,
                n = s[r].handler,
                !("konva" === a && "konva" !== e || e && a !== e || i && i !== n)) {
                    if (s.splice(r, 1),
                    0 === s.length) {
                        delete this.eventListeners[t];
                        break
                    }
                    r--
                }
        }
        _fireChangeEvent(t, e, i) {
            this._fire(t + "Change", {
                oldVal: e,
                newVal: i
            })
        }
        addName(t) {
            var e;
            return this.hasName(t) || (e = this.name(),
            this.name(e ? e + " " + t : t)),
            this
        }
        hasName(t) {
            var e;
            return !!t && !!(e = this.name()) && -1 !== (e || "").split(/\s/g).indexOf(t)
        }
        removeName(t) {
            var e = (this.name() || "").split(/\s/g)
              , t = e.indexOf(t);
            return -1 !== t && (e.splice(t, 1),
            this.name(e.join(" "))),
            this
        }
        setAttr(t, e) {
            var i = this["set" + N._capitalize(t)];
            return N._isFunction(i) ? i.call(this, e) : this._setAttr(t, e),
            this
        }
        _requestDraw() {
            var t;
            A.autoDrawEnabled && null != (t = this.getLayer() || this.getStage()) && t.batchDraw()
        }
        _setAttr(t, e) {
            var i = this.attrs[t];
            i === e && !N.isObject(e) || (null == e ? delete this.attrs[t] : this.attrs[t] = e,
            this._shouldFireChangeEvents && this._fireChangeEvent(t, i, e),
            this._requestDraw())
        }
        _setComponentAttr(t, e, i) {
            var r;
            void 0 !== i && ((r = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)),
            this.attrs[t][e] = i,
            this._fireChangeEvent(t, r, i))
        }
        _fireAndBubble(t, e, i) {
            var r;
            e && this.nodeType === dt && (e.target = this),
            (t !== ht && t !== lt || !(i && (this === i || this.isAncestorOf && this.isAncestorOf(i)) || "Stage" === this.nodeType && !i)) && (this._fire(t, e),
            r = (t === ht || t === lt) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent),
            e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !r && (i && i.parent ? this._fireAndBubble.call(this.parent, t, e, i) : this._fireAndBubble.call(this.parent, t, e))
        }
        _getProtoListeners(i) {
            let t, r, a, n = null != (t = this._cache.get(nt)) ? t : {}, s = null == n ? void 0 : n[i];
            if (void 0 === s) {
                s = [];
                let e = Object.getPrototypeOf(this);
                for (; e; ) {
                    let t = null != (a = null == (r = e.eventListeners) ? void 0 : r[i]) ? a : [];
                    s.push(...t),
                    e = Object.getPrototypeOf(e)
                }
                n[i] = s,
                this._cache.set(nt, n)
            }
            return s
        }
        _fire(t, e) {
            var i = ((e = e || {}).currentTarget = this)._getProtoListeners(e.type = t);
            if (i)
                for (var r = 0; r < i.length; r++)
                    i[r].handler.call(this, e);
            var a = this.eventListeners[t];
            if (a)
                for (r = 0; r < a.length; r++)
                    a[r].handler.call(this, e)
        }
        draw() {
            return this.drawScene(),
            this.drawHit(),
            this
        }
        _createDragElement(t) {
            var t = t ? t.pointerId : void 0
              , e = this.getStage()
              , i = this.getAbsolutePosition();
            e && (e = e._getPointerById(t) || e._changedPointerPositions[0] || i,
            c._dragElements.set(this._id, {
                node: this,
                startPointerPos: e,
                offset: {
                    x: e.x - i.x,
                    y: e.y - i.y
                },
                dragStatus: "ready",
                pointerId: t
            }))
        }
        startDrag(t, e=!0) {
            c._dragElements.has(this._id) || this._createDragElement(t),
            c._dragElements.get(this._id).dragStatus = "dragging",
            this.fire("dragstart", {
                type: "dragstart",
                target: this,
                evt: t && t.evt
            }, e)
        }
        _setDragPosition(i, t) {
            var r = this.getStage()._getPointerById(t.pointerId);
            if (r) {
                let e = {
                    x: r.x - t.offset.x,
                    y: r.y - t.offset.y
                };
                r = this.dragBoundFunc();
                if (void 0 !== r) {
                    let t = r.call(this, e, i);
                    t ? e = t : N.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")
                }
                this._lastPos && this._lastPos.x === e.x && this._lastPos.y === e.y || (this.setAbsolutePosition(e),
                this._requestDraw()),
                this._lastPos = e
            }
        }
        stopDrag(t) {
            var e = c._dragElements.get(this._id);
            e && (e.dragStatus = "stopped"),
            c._endDragBefore(t),
            c._endDragAfter(t)
        }
        setDraggable(t) {
            this._setAttr("draggable", t),
            this._dragChange()
        }
        isDragging() {
            var t = c._dragElements.get(this._id);
            return !!t && "dragging" === t.dragStatus
        }
        _listenDrag() {
            this._dragCleanup(),
            this.on("mousedown.konva touchstart.konva", function(t) {
                if ((void 0 === t.evt.button || 0 <= A.dragButtons.indexOf(t.evt.button)) && !this.isDragging()) {
                    let e = !1;
                    c._dragElements.forEach(t => {
                        this.isAncestorOf(t.node) && (e = !0)
                    }
                    ),
                    e || this._createDragElement(t)
                }
            })
        }
        _dragChange() {
            var t, e;
            this.attrs.draggable ? this._listenDrag() : (this._dragCleanup(),
            this.getStage() && (t = (e = c._dragElements.get(this._id)) && "dragging" === e.dragStatus,
            e = e && "ready" === e.dragStatus,
            t ? this.stopDrag() : e && c._dragElements.delete(this._id)))
        }
        _dragCleanup() {
            this.off("mousedown.konva"),
            this.off("touchstart.konva")
        }
        isClientRectOnScreen(t={
            x: 0,
            y: 0
        }) {
            var e = this.getStage();
            return !!e && (e = {
                x: -t.x,
                y: -t.y,
                width: e.width() + 2 * t.x,
                height: e.height() + 2 * t.y
            },
            N.haveIntersection(e, this.getClientRect()))
        }
        static create(t, e) {
            return N._isString(t) && (t = JSON.parse(t)),
            this._createNode(t, e)
        }
        static _createNode(t, e) {
            let i, r, a, n = o.prototype.getClassName.call(t), s = t.children;
            if (e && (t.attrs.container = e),
            A[n] || (N.warn('Can not find a node with class name "' + n + '". Fallback to "Shape".'),
            n = "Shape"),
            i = new A[n](t.attrs),
            s)
                for (r = s.length,
                a = 0; a < r; a++)
                    i.add(o._createNode(s[a]));
            return i
        }
    }
    o.prototype.nodeType = "Node",
    o.prototype._attrsAffectingSize = [],
    o.prototype.eventListeners = {},
    o.prototype.on.call(o.prototype, ft, function() {
        this._batchingTransformChange ? this._needClearTransformCache = !0 : (this._clearCache(m),
        this._clearSelfAndDescendantCache(n))
    }),
    o.prototype.on.call(o.prototype, "visibleChange.konva", function() {
        this._clearSelfAndDescendantCache(ut)
    }),
    o.prototype.on.call(o.prototype, "listeningChange.konva", function() {
        this._clearSelfAndDescendantCache(ot)
    }),
    o.prototype.on.call(o.prototype, "opacityChange.konva", function() {
        this._clearSelfAndDescendantCache(at)
    });
    var a = u.addGetterSetter;
    a(o, "zIndex"),
    a(o, "absolutePosition"),
    a(o, "position"),
    a(o, "x", 0, e()),
    a(o, "y", 0, e()),
    a(o, "globalCompositeOperation", "source-over", i()),
    a(o, "opacity", 1, e()),
    a(o, "name", "", i()),
    a(o, "id", "", i()),
    a(o, "rotation", 0, e()),
    u.addComponentsGetterSetter(o, "scale", ["x", "y"]),
    a(o, "scaleX", 1, e()),
    a(o, "scaleY", 1, e()),
    u.addComponentsGetterSetter(o, "skew", ["x", "y"]),
    a(o, "skewX", 0, e()),
    a(o, "skewY", 0, e()),
    u.addComponentsGetterSetter(o, "offset", ["x", "y"]),
    a(o, "offsetX", 0, e()),
    a(o, "offsetY", 0, e()),
    a(o, "dragDistance", null, e()),
    a(o, "width", 0, e()),
    a(o, "height", 0, e()),
    a(o, "listening", !0, r()),
    a(o, "preventDefault", !0, r()),
    a(o, "filters", null, function(t) {
        return this._filterUpToDate = !1,
        t
    }),
    a(o, "visible", !0, r()),
    a(o, "transformsEnabled", "all", i()),
    a(o, "size"),
    a(o, "dragBoundFunc"),
    a(o, "draggable", !1, r()),
    u.backCompat(o, {
        rotateDeg: "rotate",
        setRotationDeg: "setRotation",
        getRotationDeg: "getRotation"
    });
    class s extends o {
        constructor() {
            super(...arguments),
            this.children = []
        }
        getChildren(e) {
            if (!e)
                return this.children || [];
            let t = this.children || []
              , i = [];
            return t.forEach(function(t) {
                e(t) && i.push(t)
            }),
            i
        }
        hasChildren() {
            return 0 < this.getChildren().length
        }
        removeChildren() {
            return this.getChildren().forEach(t => {
                t.parent = null,
                t.index = 0,
                t.remove()
            }
            ),
            this.children = [],
            this._requestDraw(),
            this
        }
        destroyChildren() {
            return this.getChildren().forEach(t => {
                t.parent = null,
                t.index = 0,
                t.destroy()
            }
            ),
            this.children = [],
            this._requestDraw(),
            this
        }
        add(...e) {
            if (0 !== e.length)
                if (1 < e.length)
                    for (let t = 0; t < e.length; t++)
                        this.add(e[t]);
                else {
                    var t = e[0];
                    t.getParent() ? t.moveTo(this) : (this._validateAdd(t),
                    t.index = this.getChildren().length,
                    t.parent = this,
                    t._clearCaches(),
                    this.getChildren().push(t),
                    this._fire("add", {
                        child: t
                    }),
                    this._requestDraw())
                }
            return this
        }
        destroy() {
            return this.hasChildren() && this.destroyChildren(),
            super.destroy(),
            this
        }
        find(t) {
            return this._generalFind(t, !1)
        }
        findOne(t) {
            t = this._generalFind(t, !0);
            return 0 < t.length ? t[0] : void 0
        }
        _generalFind(i, r) {
            let a = [];
            return this._descendants(t => {
                var e = t._isMatch(i);
                return e && a.push(t),
                !(!e || !r)
            }
            ),
            a
        }
        _descendants(t) {
            var e;
            for (e of this.getChildren()) {
                if (t(e))
                    return !0;
                if (e.hasChildren() && e._descendants(t))
                    return !0
            }
            return !1
        }
        toObject() {
            let e = o.prototype.toObject.call(this);
            return e.children = [],
            this.getChildren().forEach(t => {
                e.children.push(t.toObject())
            }
            ),
            e
        }
        isAncestorOf(t) {
            let e = t.getParent();
            for (; e; ) {
                if (e._id === this._id)
                    return !0;
                e = e.getParent()
            }
            return !1
        }
        clone(t) {
            let e = o.prototype.clone.call(this, t);
            return this.getChildren().forEach(function(t) {
                e.add(t.clone())
            }),
            e
        }
        getAllIntersections(e) {
            let i = [];
            return this.find("Shape").forEach(t => {
                t.isVisible() && t.intersects(e) && i.push(t)
            }
            ),
            i
        }
        _clearSelfAndDescendantCache(e) {
            var t;
            super._clearSelfAndDescendantCache(e),
            this.isCached() || null == (t = this.children) || t.forEach(function(t) {
                t._clearSelfAndDescendantCache(e)
            })
        }
        _setChildrenIndices() {
            var t;
            null != (t = this.children) && t.forEach(function(t, e) {
                t.index = e
            }),
            this._requestDraw()
        }
        drawScene(t, e, i) {
            var r = this.getLayer()
              , t = t || r && r.getCanvas()
              , r = t && t.getContext()
              , a = this._getCanvasCache()
              , a = a && a.scene
              , n = t && t.isCache;
            if (this.isVisible() || n)
                if (a) {
                    r.save();
                    let t = this.getAbsoluteTransform(e).getMatrix();
                    r.transform(t[0], t[1], t[2], t[3], t[4], t[5]),
                    this._drawCachedSceneCanvas(r),
                    r.restore()
                } else
                    this._drawChildren("drawScene", t, e, i);
            return this
        }
        drawHit(t, e) {
            if (this.shouldDrawHit(e)) {
                var i = this.getLayer()
                  , t = t || i && i.hitCanvas
                  , i = t && t.getContext()
                  , r = this._getCanvasCache();
                if (r && r.hit) {
                    i.save();
                    let t = this.getAbsoluteTransform(e).getMatrix();
                    i.transform(t[0], t[1], t[2], t[3], t[4], t[5]),
                    this._drawCachedHitCanvas(i),
                    i.restore()
                } else
                    this._drawChildren("drawHit", t, e)
            }
            return this
        }
        _drawChildren(e, i, r, a) {
            var n = i && i.getContext()
              , s = this.clipWidth()
              , o = this.clipHeight()
              , h = this.clipFunc()
              , t = "number" == typeof s && "number" == typeof o || h
              , l = r === this;
            if (t) {
                n.save();
                let t = this.getAbsoluteTransform(r), e, i = t.getMatrix();
                if (n.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                n.beginPath(),
                h)
                    e = h.call(this, n, this);
                else {
                    let t = this.clipX()
                      , e = this.clipY();
                    n.rect(t || 0, e || 0, s, o)
                }
                n.clip.apply(n, e),
                i = t.copy().invert().getMatrix(),
                n.transform(i[0], i[1], i[2], i[3], i[4], i[5])
            }
            h = !l && "source-over" !== this.globalCompositeOperation() && "drawScene" === e;
            h && (n.save(),
            n._applyGlobalCompositeOperation(this)),
            null != (s = this.children) && s.forEach(function(t) {
                t[e](i, r, a)
            }),
            h && n.restore(),
            t && n.restore()
        }
        getClientRect(e={}) {
            var t, i = e.skipTransform, r = e.relativeTo;
            let a, n, s, o, h, l = this;
            null != (t = this.children) && t.forEach(function(t) {
                !t.visible() || 0 === (t = t.getClientRect({
                    relativeTo: l,
                    skipShadow: e.skipShadow,
                    skipStroke: e.skipStroke
                })).width && 0 === t.height || (o = void 0 === a ? (a = t.x,
                n = t.y,
                s = t.x + t.width,
                t.y + t.height) : (a = Math.min(a, t.x),
                n = Math.min(n, t.y),
                s = Math.max(s, t.x + t.width),
                Math.max(o, t.y + t.height)))
            });
            var d = this.find("Shape");
            let c = !1;
            for (let t = 0; t < d.length; t++)
                if (d[t]._isVisible(this)) {
                    c = !0;
                    break
                }
            return h = c && void 0 !== a ? {
                x: a,
                y: n,
                width: s - a,
                height: o - n
            } : {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            i ? h : this._transformedRect(h, r)
        }
    }
    u.addComponentsGetterSetter(s, "clip", ["x", "y", "width", "height"]),
    u.addGetterSetter(s, "clipX", void 0, e()),
    u.addGetterSetter(s, "clipY", void 0, e()),
    u.addGetterSetter(s, "clipWidth", void 0, e()),
    u.addGetterSetter(s, "clipHeight", void 0, e()),
    u.addGetterSetter(s, "clipFunc");
    let mt = new Map
      , _t = void 0 !== A._global.PointerEvent;
    function vt(t) {
        return mt.get(t)
    }
    function yt(t) {
        return {
            evt: t,
            pointerId: t.pointerId
        }
    }
    function xt(t, e) {
        return mt.get(t) === e
    }
    function bt(t, e) {
        St(t),
        e.getStage() && (mt.set(t, e),
        _t) && e._fire("gotpointercapture", yt(new PointerEvent("gotpointercapture")))
    }
    function St(t) {
        var e, i = mt.get(t);
        i && ((e = i.getStage()) && e.content,
        mt.delete(t),
        _t) && i._fire("lostpointercapture", yt(new PointerEvent("lostpointercapture")))
    }
    let wt = "mouseleave"
      , Ct = "mouseover"
      , Pt = "mouseenter"
      , kt = "mousemove"
      , At = "mousedown"
      , Tt = "mouseup"
      , Mt = "pointermove"
      , Gt = "pointerdown"
      , Rt = "pointerup"
      , Et = "pointercancel"
      , Dt = "pointerout"
      , Lt = "pointerleave"
      , It = "pointerover"
      , Ot = "pointerenter"
      , Ft = "contextmenu"
      , Bt = "touchstart"
      , Nt = "touchend"
      , Ht = "touchmove"
      , Wt = "touchcancel"
      , zt = "wheel"
      , Yt = [[Pt, "_pointerenter"], [At, "_pointerdown"], [kt, "_pointermove"], [Tt, "_pointerup"], [wt, "_pointerleave"], [Bt, "_pointerdown"], [Ht, "_pointermove"], [Nt, "_pointerup"], [Wt, "_pointercancel"], [Ct, "_pointerover"], [zt, "_wheel"], [Ft, "_contextmenu"], [Gt, "_pointerdown"], [Mt, "_pointermove"], [Rt, "_pointerup"], [Et, "_pointercancel"], ["lostpointercapture", "_lostpointercapture"]]
      , Xt = {
        mouse: {
            pointerout: "mouseout",
            pointerleave: wt,
            pointerover: Ct,
            pointerenter: Pt,
            pointermove: kt,
            pointerdown: At,
            pointerup: Tt,
            pointercancel: "mousecancel",
            pointerclick: "click",
            pointerdblclick: "dblclick"
        },
        touch: {
            pointerout: "touchout",
            pointerleave: "touchleave",
            pointerover: "touchover",
            pointerenter: "touchenter",
            pointermove: Ht,
            pointerdown: Bt,
            pointerup: Nt,
            pointercancel: Wt,
            pointerclick: "tap",
            pointerdblclick: "dbltap"
        },
        pointer: {
            pointerout: Dt,
            pointerleave: Lt,
            pointerover: It,
            pointerenter: Ot,
            pointermove: Mt,
            pointerdown: Gt,
            pointerup: Rt,
            pointercancel: Et,
            pointerclick: "pointerclick",
            pointerdblclick: "pointerdblclick"
        }
    }
      , jt = t => 0 <= t.indexOf("pointer") ? "pointer" : 0 <= t.indexOf("touch") ? "touch" : "mouse"
      , qt = t => {
        t = jt(t);
        return "pointer" === t ? A.pointerEventsEnabled && Xt.pointer : "touch" === t ? Xt.touch : "mouse" === t ? Xt.mouse : void 0
    }
    ;
    function Ut(t={}) {
        return (t.clipFunc || t.clipWidth || t.clipHeight) && N.warn("Stage does not support clipping. Please use clip for Layers or Groups."),
        t
    }
    let Vt = [];
    class Kt extends s {
        constructor(t) {
            super(Ut(t)),
            this._pointerPositions = [],
            this._changedPointerPositions = [],
            this._buildDOM(),
            this._bindContentEvents(),
            Vt.push(this),
            this.on("widthChange.konva heightChange.konva", this._resizeDOM),
            this.on("visibleChange.konva", this._checkVisibility),
            this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
                Ut(this.attrs)
            }
            ),
            this._checkVisibility()
        }
        _validateAdd(t) {
            var e = "Layer" === t.getType()
              , t = "FastLayer" === t.getType();
            e || t || N.throw("You may only add layers to the stage.")
        }
        _checkVisibility() {
            var t;
            this.content && (t = this.visible() ? "" : "none",
            this.content.style.display = t)
        }
        setContainer(e) {
            if ("string" == typeof e) {
                if ("." === e.charAt(0)) {
                    let t = e.slice(1);
                    e = document.getElementsByClassName(t)[0]
                } else {
                    var t = "#" !== e.charAt(0) ? e : e.slice(1);
                    e = document.getElementById(t)
                }
                if (!e)
                    throw "Can not find container in document with id " + t
            }
            return this._setAttr("container", e),
            this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content),
            e.appendChild(this.content)),
            this
        }
        shouldDrawHit() {
            return !0
        }
        clear() {
            let t, e = this.children, i = e.length;
            for (t = 0; t < i; t++)
                e[t].clear();
            return this
        }
        clone(t) {
            return (t = t || {}).container = "undefined" != typeof document && document.createElement("div"),
            s.prototype.clone.call(this, t)
        }
        destroy() {
            super.destroy();
            var t = this.content
              , t = (t && N._isInDocument(t) && this.container().removeChild(t),
            Vt.indexOf(this));
            return -1 < t && Vt.splice(t, 1),
            N.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas),
            this
        }
        getPointerPosition() {
            var t = this._pointerPositions[0] || this._changedPointerPositions[0];
            return t ? {
                x: t.x,
                y: t.y
            } : (N.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"),
            null)
        }
        _getPointerById(e) {
            return this._pointerPositions.find(t => t.id === e)
        }
        getPointersPositions() {
            return this._pointerPositions
        }
        getStage() {
            return this
        }
        getContent() {
            return this.content
        }
        _toKonvaCanvas(e) {
            (e = e || {}).x = e.x || 0,
            e.y = e.y || 0,
            e.width = e.width || this.width(),
            e.height = e.height || this.height();
            let t = new f({
                width: e.width,
                height: e.height,
                pixelRatio: e.pixelRatio || 1
            })
              , i = t.getContext()._context
              , r = this.children;
            return (e.x || e.y) && i.translate(-1 * e.x, -1 * e.y),
            r.forEach(function(t) {
                t.isVisible() && (t = t._toKonvaCanvas(e),
                i.drawImage(t._canvas, e.x, e.y, t.getWidth() / t.getPixelRatio(), t.getHeight() / t.getPixelRatio()))
            }),
            t
        }
        getIntersection(i) {
            if (i) {
                let t, e = this.children;
                for (t = e.length - 1; 0 <= t; t--) {
                    var r = e[t].getIntersection(i);
                    if (r)
                        return r
                }
            }
            return null
        }
        _resizeDOM() {
            let e = this.width()
              , i = this.height();
            this.content && (this.content.style.width = e + "px",
            this.content.style.height = i + "px"),
            this.bufferCanvas.setSize(e, i),
            this.bufferHitCanvas.setSize(e, i),
            this.children.forEach(t => {
                t.setSize({
                    width: e,
                    height: i
                }),
                t.draw()
            }
            )
        }
        add(t) {
            if (1 < arguments.length)
                for (let t = 0; t < arguments.length; t++)
                    this.add(arguments[t]);
            else {
                super.add(t);
                var e = this.children.length;
                5 < e && N.warn("The stage has " + e + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."),
                t.setSize({
                    width: this.width(),
                    height: this.height()
                }),
                t.draw(),
                A.isBrowser && this.content.appendChild(t.canvas._canvas)
            }
            return this
        }
        getParent() {
            return null
        }
        getLayer() {
            return null
        }
        hasPointerCapture(t) {
            return xt(t, this)
        }
        setPointerCapture(t) {
            bt(t, this)
        }
        releaseCapture(t) {
            St(t)
        }
        getLayers() {
            return this.children
        }
        _bindContentEvents() {
            A.isBrowser && Yt.forEach( ([t,e]) => {
                this.content.addEventListener(t, t => {
                    this[e](t)
                }
                , {
                    passive: !1
                })
            }
            )
        }
        _pointerenter(t) {
            this.setPointersPositions(t);
            var e = qt(t.type);
            e && this._fire(e.pointerenter, {
                evt: t,
                target: this,
                currentTarget: this
            })
        }
        _pointerover(t) {
            this.setPointersPositions(t);
            var e = qt(t.type);
            e && this._fire(e.pointerover, {
                evt: t,
                target: this,
                currentTarget: this
            })
        }
        _getTargetShape(t) {
            let e = this[t + "targetShape"];
            return e = e && !e.getStage() ? null : e
        }
        _pointerleave(t) {
            var e, i, r = qt(t.type), a = jt(t.type);
            r && (this.setPointersPositions(t),
            e = this._getTargetShape(a),
            i = !(A.isDragging() || A.isTransforming()) || A.hitOnDragEnabled,
            e && i ? (e._fireAndBubble(r.pointerout, {
                evt: t
            }),
            e._fireAndBubble(r.pointerleave, {
                evt: t
            }),
            this._fire(r.pointerleave, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this[a + "targetShape"] = null) : i && (this._fire(r.pointerleave, {
                evt: t,
                target: this,
                currentTarget: this
            }),
            this._fire(r.pointerout, {
                evt: t,
                target: this,
                currentTarget: this
            })),
            this.pointerPos = null,
            this._pointerPositions = [])
        }
        _pointerdown(r) {
            let a = qt(r.type)
              , n = jt(r.type);
            if (a) {
                this.setPointersPositions(r);
                let i = !1;
                this._changedPointerPositions.forEach(t => {
                    var e = this.getIntersection(t);
                    c.justDragged = !1,
                    A["_" + n + "ListenClick"] = !0,
                    e && e.isListening() ? (A.capturePointerEventsEnabled && e.setPointerCapture(t.id),
                    (this[n + "ClickStartShape"] = e)._fireAndBubble(a.pointerdown, {
                        evt: r,
                        pointerId: t.id
                    }),
                    i = !0,
                    t = 0 <= r.type.indexOf("touch"),
                    e.preventDefault() && r.cancelable && t && r.preventDefault()) : this[n + "ClickStartShape"] = void 0
                }
                ),
                i || this._fire(a.pointerdown, {
                    evt: r,
                    target: this,
                    currentTarget: this,
                    pointerId: this._pointerPositions[0].id
                })
            }
        }
        _pointermove(o) {
            let h = qt(o.type)
              , l = jt(o.type);
            if (h && (A.isDragging() && c.node.preventDefault() && o.cancelable && o.preventDefault(),
            this.setPointersPositions(o),
            !A.isDragging() && !A.isTransforming() || A.hitOnDragEnabled)) {
                let a = {}
                  , n = !1
                  , s = this._getTargetShape(l);
                this._changedPointerPositions.forEach(t => {
                    var e = vt(t.id) || this.getIntersection(t)
                      , t = t.id
                      , i = {
                        evt: o,
                        pointerId: t
                    }
                      , r = s !== e;
                    if (r && s && (s._fireAndBubble(h.pointerout, {
                        ...i
                    }, e),
                    s._fireAndBubble(h.pointerleave, {
                        ...i
                    }, e)),
                    e) {
                        if (a[e._id])
                            return;
                        a[e._id] = !0
                    }
                    e && e.isListening() ? (n = !0,
                    r && (e._fireAndBubble(h.pointerover, {
                        ...i
                    }, s),
                    e._fireAndBubble(h.pointerenter, {
                        ...i
                    }, s),
                    this[l + "targetShape"] = e),
                    e._fireAndBubble(h.pointermove, {
                        ...i
                    })) : s && (this._fire(h.pointerover, {
                        evt: o,
                        target: this,
                        currentTarget: this,
                        pointerId: t
                    }),
                    this[l + "targetShape"] = null)
                }
                ),
                n || this._fire(h.pointermove, {
                    evt: o,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                })
            }
        }
        _pointerup(h) {
            let l = qt(h.type)
              , d = jt(h.type);
            if (l) {
                this.setPointersPositions(h);
                let a = this[d + "ClickStartShape"]
                  , n = this[d + "ClickEndShape"]
                  , s = {}
                  , o = !1;
                this._changedPointerPositions.forEach(t => {
                    var e = vt(t.id) || this.getIntersection(t);
                    if (e) {
                        if (e.releaseCapture(t.id),
                        s[e._id])
                            return;
                        s[e._id] = !0
                    }
                    var t = t.id
                      , i = {
                        evt: h,
                        pointerId: t
                    };
                    let r = !1;
                    A["_" + d + "InDblClickWindow"] ? (r = !0,
                    clearTimeout(this[d + "DblTimeout"])) : c.justDragged || (A["_" + d + "InDblClickWindow"] = !0,
                    clearTimeout(this[d + "DblTimeout"])),
                    this[d + "DblTimeout"] = setTimeout(function() {
                        A["_" + d + "InDblClickWindow"] = !1
                    }, A.dblClickWindow),
                    e && e.isListening() ? (o = !0,
                    (this[d + "ClickEndShape"] = e)._fireAndBubble(l.pointerup, {
                        ...i
                    }),
                    A["_" + d + "ListenClick"] && a && a === e && (e._fireAndBubble(l.pointerclick, {
                        ...i
                    }),
                    r) && n && n === e && e._fireAndBubble(l.pointerdblclick, {
                        ...i
                    })) : (this[d + "ClickEndShape"] = null,
                    A["_" + d + "ListenClick"] && this._fire(l.pointerclick, {
                        evt: h,
                        target: this,
                        currentTarget: this,
                        pointerId: t
                    }),
                    r && this._fire(l.pointerdblclick, {
                        evt: h,
                        target: this,
                        currentTarget: this,
                        pointerId: t
                    }))
                }
                ),
                o || this._fire(l.pointerup, {
                    evt: h,
                    target: this,
                    currentTarget: this,
                    pointerId: this._changedPointerPositions[0].id
                }),
                A["_" + d + "ListenClick"] = !1,
                h.cancelable && "touch" !== d && h.preventDefault()
            }
        }
        _contextmenu(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble(Ft, {
                evt: t
            }) : this._fire(Ft, {
                evt: t,
                target: this,
                currentTarget: this
            })
        }
        _wheel(t) {
            this.setPointersPositions(t);
            var e = this.getIntersection(this.getPointerPosition());
            e && e.isListening() ? e._fireAndBubble(zt, {
                evt: t
            }) : this._fire(zt, {
                evt: t,
                target: this,
                currentTarget: this
            })
        }
        _pointercancel(t) {
            this.setPointersPositions(t);
            var e = vt(t.pointerId) || this.getIntersection(this.getPointerPosition());
            e && e._fireAndBubble(Rt, yt(t)),
            St(t.pointerId)
        }
        _lostpointercapture(t) {
            St(t.pointerId)
        }
        setPointersPositions(t) {
            let e = this._getContentPosition(), i, r;
            void 0 !== (t = t || window.event).touches ? (this._pointerPositions = [],
            this._changedPointerPositions = [],
            Array.prototype.forEach.call(t.touches, t => {
                this._pointerPositions.push({
                    id: t.identifier,
                    x: (t.clientX - e.left) / e.scaleX,
                    y: (t.clientY - e.top) / e.scaleY
                })
            }
            ),
            Array.prototype.forEach.call(t.changedTouches || t.touches, t => {
                this._changedPointerPositions.push({
                    id: t.identifier,
                    x: (t.clientX - e.left) / e.scaleX,
                    y: (t.clientY - e.top) / e.scaleY
                })
            }
            )) : (i = (t.clientX - e.left) / e.scaleX,
            r = (t.clientY - e.top) / e.scaleY,
            this.pointerPos = {
                x: i,
                y: r
            },
            this._pointerPositions = [{
                x: i,
                y: r,
                id: N._getFirstPointerId(t)
            }],
            this._changedPointerPositions = [{
                x: i,
                y: r,
                id: N._getFirstPointerId(t)
            }])
        }
        _setPointerPosition(t) {
            N.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'),
            this.setPointersPositions(t)
        }
        _getContentPosition() {
            var t;
            return this.content && this.content.getBoundingClientRect ? {
                top: (t = this.content.getBoundingClientRect()).top,
                left: t.left,
                scaleX: t.width / this.content.clientWidth || 1,
                scaleY: t.height / this.content.clientHeight || 1
            } : {
                top: 0,
                left: 0,
                scaleX: 1,
                scaleY: 1
            }
        }
        _buildDOM() {
            if (this.bufferCanvas = new f({
                width: this.width(),
                height: this.height()
            }),
            this.bufferHitCanvas = new rt({
                pixelRatio: 1,
                width: this.width(),
                height: this.height()
            }),
            A.isBrowser) {
                var t = this.container();
                if (!t)
                    throw "Stage has no container. A container is required.";
                t.innerHTML = "",
                this.content = document.createElement("div"),
                this.content.style.position = "relative",
                this.content.style.userSelect = "none",
                this.content.className = "konvajs-content",
                this.content.setAttribute("role", "presentation"),
                t.appendChild(this.content),
                this._resizeDOM()
            }
        }
        cache() {
            return N.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."),
            this
        }
        clearCache() {
            return this
        }
        batchDraw() {
            return this.getChildren().forEach(function(t) {
                t.batchDraw()
            }),
            this
        }
    }
    Kt.prototype.nodeType = "Stage",
    t(Kt),
    u.addGetterSetter(Kt, "container"),
    A.isBrowser && document.addEventListener("visibilitychange", () => {
        Vt.forEach(t => {
            t.batchDraw()
        }
        )
    }
    );
    let Qt = "hasShadow", Jt = "shadowRGBA", Zt = "patternImage", $t = "linearGradient", te = "radialGradient", ee;
    function ie() {
        return ee || (ee = N.createCanvasElement().getContext("2d"))
    }
    let re = {};
    class h extends o {
        constructor(t) {
            let e;
            for (super(t); !(e = N.getRandomColor()) || e in re; )
                ;
            this.colorKey = e,
            re[e] = this
        }
        getContext() {
            return N.warn("shape.getContext() method is deprecated. Please do not use it."),
            this.getLayer().getContext()
        }
        getCanvas() {
            return N.warn("shape.getCanvas() method is deprecated. Please do not use it."),
            this.getLayer().getCanvas()
        }
        getSceneFunc() {
            return this.attrs.sceneFunc || this._sceneFunc
        }
        getHitFunc() {
            return this.attrs.hitFunc || this._hitFunc
        }
        hasShadow() {
            return this._getCache(Qt, this._hasShadow)
        }
        _hasShadow() {
            return this.shadowEnabled() && 0 !== this.shadowOpacity() && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY())
        }
        _getFillPattern() {
            return this._getCache(Zt, this.__getFillPattern)
        }
        __getFillPattern() {
            var t, e;
            if (this.fillPatternImage())
                return (t = ie().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat")) && t.setTransform && ((e = new d).translate(this.fillPatternX(), this.fillPatternY()),
                e.rotate(A.getAngle(this.fillPatternRotation())),
                e.scale(this.fillPatternScaleX(), this.fillPatternScaleY()),
                e.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY()),
                e = e.getMatrix(),
                e = "undefined" == typeof DOMMatrix ? {
                    a: e[0],
                    b: e[1],
                    c: e[2],
                    d: e[3],
                    e: e[4],
                    f: e[5]
                } : new DOMMatrix(e),
                t.setTransform(e)),
                t
        }
        _getLinearGradient() {
            return this._getCache($t, this.__getLinearGradient)
        }
        __getLinearGradient() {
            var e = this.fillLinearGradientColorStops();
            if (e) {
                var t = ie()
                  , i = this.fillLinearGradientStartPoint()
                  , r = this.fillLinearGradientEndPoint()
                  , a = t.createLinearGradient(i.x, i.y, r.x, r.y);
                for (let t = 0; t < e.length; t += 2)
                    a.addColorStop(e[t], e[t + 1]);
                return a
            }
        }
        _getRadialGradient() {
            return this._getCache(te, this.__getRadialGradient)
        }
        __getRadialGradient() {
            var e = this.fillRadialGradientColorStops();
            if (e) {
                var t = ie()
                  , i = this.fillRadialGradientStartPoint()
                  , r = this.fillRadialGradientEndPoint()
                  , a = t.createRadialGradient(i.x, i.y, this.fillRadialGradientStartRadius(), r.x, r.y, this.fillRadialGradientEndRadius());
                for (let t = 0; t < e.length; t += 2)
                    a.addColorStop(e[t], e[t + 1]);
                return a
            }
        }
        getShadowRGBA() {
            return this._getCache(Jt, this._getShadowRGBA)
        }
        _getShadowRGBA() {
            var t;
            return this.hasShadow() && (t = N.colorToRGBA(this.shadowColor())) ? "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a * (this.shadowOpacity() || 1) + ")" : void 0
        }
        hasFill() {
            return this._calculate("hasFill", ["fillEnabled", "fill", "fillPatternImage", "fillLinearGradientColorStops", "fillRadialGradientColorStops"], () => this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops()))
        }
        hasStroke() {
            return this._calculate("hasStroke", ["strokeEnabled", "strokeWidth", "stroke", "strokeLinearGradientColorStops"], () => this.strokeEnabled() && this.strokeWidth() && !(!this.stroke() && !this.strokeLinearGradientColorStops()))
        }
        hasHitStroke() {
            var t = this.hitStrokeWidth();
            return "auto" === t ? this.hasStroke() : this.strokeEnabled() && !!t
        }
        intersects(t) {
            var e = this.getStage();
            return !!e && ((e = e.bufferHitCanvas).getContext().clear(),
            this.drawHit(e, void 0, !0),
            0 < e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3])
        }
        destroy() {
            return o.prototype.destroy.call(this),
            delete re[this.colorKey],
            delete this.colorKey,
            this
        }
        _useBufferCanvas(t) {
            var e, i, r;
            return !(null != (e = this.attrs.perfectDrawEnabled) && !e || (e = t || this.hasFill(),
            t = this.hasStroke(),
            i = 1 !== this.getAbsoluteOpacity(),
            !(e && t && i || (i = this.hasShadow(),
            r = this.shadowForStrokeEnabled(),
            e && t && i && r))))
        }
        setStrokeHitEnabled(t) {
            N.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."),
            t ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0)
        }
        getStrokeHitEnabled() {
            return 0 !== this.hitStrokeWidth()
        }
        getSelfRect() {
            var t = this.size();
            return {
                x: this._centroid ? -t.width / 2 : 0,
                y: this._centroid ? -t.height / 2 : 0,
                width: t.width,
                height: t.height
            }
        }
        getClientRect(t={}) {
            let e = !1
              , i = this.getParent();
            for (; i; ) {
                if (i.isCached()) {
                    e = !0;
                    break
                }
                i = i.getParent()
            }
            var r = t.skipTransform
              , a = t.relativeTo || e && this.getStage() || void 0
              , n = this.getSelfRect()
              , s = !t.skipStroke && this.hasStroke() && this.strokeWidth() || 0
              , o = n.width + s
              , h = n.height + s
              , t = !t.skipShadow && this.hasShadow()
              , l = t ? this.shadowOffsetX() : 0
              , d = t ? this.shadowOffsetY() : 0
              , o = o + Math.abs(l)
              , h = h + Math.abs(d)
              , t = t && this.shadowBlur() || 0
              , o = {
                width: o + 2 * t,
                height: h + 2 * t,
                x: -(s / 2 + t) + Math.min(l, 0) + n.x,
                y: -(s / 2 + t) + Math.min(d, 0) + n.y
            };
            return r ? o : this._transformedRect(o, a)
        }
        drawScene(t, i, r) {
            let e = this.getLayer();
            var t = t || e.getCanvas()
              , a = t.getContext()
              , n = this._getCanvasCache()
              , s = this.getSceneFunc()
              , o = this.hasShadow()
              , t = t.isCache
              , h = i === this;
            if (this.isVisible() || h)
                if (n) {
                    a.save();
                    let t = this.getAbsoluteTransform(i).getMatrix();
                    a.transform(t[0], t[1], t[2], t[3], t[4], t[5]),
                    this._drawCachedSceneCanvas(a),
                    a.restore()
                } else if (s) {
                    if (a.save(),
                    this._useBufferCanvas() && !t) {
                        n = this.getStage();
                        let t = r || n.bufferCanvas;
                        (r = t.getContext()).clear(),
                        r.save(),
                        r._applyLineJoin(this);
                        var l = this.getAbsoluteTransform(i).getMatrix();
                        r.transform(l[0], l[1], l[2], l[3], l[4], l[5]),
                        s.call(this, r, this),
                        r.restore();
                        let e = t.pixelRatio;
                        o && a._applyShadow(this),
                        a._applyOpacity(this),
                        a._applyGlobalCompositeOperation(this),
                        a.drawImage(t._canvas, 0, 0, t.width / e, t.height / e)
                    } else
                        a._applyLineJoin(this),
                        h || (l = this.getAbsoluteTransform(i).getMatrix(),
                        a.transform(l[0], l[1], l[2], l[3], l[4], l[5]),
                        a._applyOpacity(this),
                        a._applyGlobalCompositeOperation(this)),
                        o && a._applyShadow(this),
                        s.call(this, a, this);
                    a.restore()
                }
            return this
        }
        drawHit(t, e, i=!1) {
            if (this.shouldDrawHit(e, i)) {
                var i = this.getLayer()
                  , t = t || i.hitCanvas
                  , i = t && t.getContext()
                  , t = this.hitFunc() || this.sceneFunc()
                  , r = this._getCanvasCache()
                  , r = r && r.hit;
                if (this.colorKey || N.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"),
                r) {
                    i.save();
                    let t = this.getAbsoluteTransform(e).getMatrix();
                    i.transform(t[0], t[1], t[2], t[3], t[4], t[5]),
                    this._drawCachedHitCanvas(i),
                    i.restore()
                } else if (t) {
                    if (i.save(),
                    i._applyLineJoin(this),
                    this !== e) {
                        let t = this.getAbsoluteTransform(e).getMatrix();
                        i.transform(t[0], t[1], t[2], t[3], t[4], t[5])
                    }
                    t.call(this, i, this),
                    i.restore()
                }
            }
            return this
        }
        drawHitFromCache(t=0) {
            let e, i, r, a, n, s = this._getCanvasCache(), o = this._getCachedSceneCanvas(), h = s.hit, l = h.getContext(), d = h.getWidth(), c = h.getHeight();
            l.clear(),
            l.drawImage(o._canvas, 0, 0, d, c);
            try {
                for (e = l.getImageData(0, 0, d, c),
                i = e.data,
                r = i.length,
                a = N._hexToRgb(this.colorKey),
                n = 0; n < r; n += 4)
                    t < i[n + 3] ? (i[n] = a.r,
                    i[n + 1] = a.g,
                    i[n + 2] = a.b,
                    i[n + 3] = 255) : i[n + 3] = 0;
                l.putImageData(e, 0, 0)
            } catch (t) {
                N.error("Unable to draw hit graph from cached scene canvas. " + t.message)
            }
            return this
        }
        hasPointerCapture(t) {
            return xt(t, this)
        }
        setPointerCapture(t) {
            bt(t, this)
        }
        releaseCapture(t) {
            St(t)
        }
    }
    h.prototype._fillFunc = function(t) {
        var e = this.attrs.fillRule;
        e ? t.fill(e) : t.fill()
    }
    ,
    h.prototype._strokeFunc = function(t) {
        t.stroke()
    }
    ,
    h.prototype._fillFuncHit = function(t) {
        var e = this.attrs.fillRule;
        e ? t.fill(e) : t.fill()
    }
    ,
    h.prototype._strokeFuncHit = function(t) {
        t.stroke()
    }
    ,
    h.prototype._centroid = !1,
    h.prototype.nodeType = "Shape",
    t(h),
    h.prototype.eventListeners = {},
    h.prototype.on.call(h.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", function() {
        this._clearCache(Qt)
    }),
    h.prototype.on.call(h.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", function() {
        this._clearCache(Jt)
    }),
    h.prototype.on.call(h.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", function() {
        this._clearCache(Zt)
    }),
    h.prototype.on.call(h.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", function() {
        this._clearCache($t)
    }),
    h.prototype.on.call(h.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", function() {
        this._clearCache(te)
    }),
    u.addGetterSetter(h, "stroke", void 0, V()),
    u.addGetterSetter(h, "strokeWidth", 2, e()),
    u.addGetterSetter(h, "fillAfterStrokeEnabled", !1),
    u.addGetterSetter(h, "hitStrokeWidth", "auto", U()),
    u.addGetterSetter(h, "strokeHitEnabled", !0, r()),
    u.addGetterSetter(h, "perfectDrawEnabled", !0, r()),
    u.addGetterSetter(h, "shadowForStrokeEnabled", !0, r()),
    u.addGetterSetter(h, "lineJoin"),
    u.addGetterSetter(h, "lineCap"),
    u.addGetterSetter(h, "sceneFunc"),
    u.addGetterSetter(h, "hitFunc"),
    u.addGetterSetter(h, "dash"),
    u.addGetterSetter(h, "dashOffset", 0, e()),
    u.addGetterSetter(h, "shadowColor", void 0, i()),
    u.addGetterSetter(h, "shadowBlur", 0, e()),
    u.addGetterSetter(h, "shadowOpacity", 1, e()),
    u.addComponentsGetterSetter(h, "shadowOffset", ["x", "y"]),
    u.addGetterSetter(h, "shadowOffsetX", 0, e()),
    u.addGetterSetter(h, "shadowOffsetY", 0, e()),
    u.addGetterSetter(h, "fillPatternImage"),
    u.addGetterSetter(h, "fill", void 0, V()),
    u.addGetterSetter(h, "fillPatternX", 0, e()),
    u.addGetterSetter(h, "fillPatternY", 0, e()),
    u.addGetterSetter(h, "fillLinearGradientColorStops"),
    u.addGetterSetter(h, "strokeLinearGradientColorStops"),
    u.addGetterSetter(h, "fillRadialGradientStartRadius", 0),
    u.addGetterSetter(h, "fillRadialGradientEndRadius", 0),
    u.addGetterSetter(h, "fillRadialGradientColorStops"),
    u.addGetterSetter(h, "fillPatternRepeat", "repeat"),
    u.addGetterSetter(h, "fillEnabled", !0),
    u.addGetterSetter(h, "strokeEnabled", !0),
    u.addGetterSetter(h, "shadowEnabled", !0),
    u.addGetterSetter(h, "dashEnabled", !0),
    u.addGetterSetter(h, "strokeScaleEnabled", !0),
    u.addGetterSetter(h, "fillPriority", "color"),
    u.addComponentsGetterSetter(h, "fillPatternOffset", ["x", "y"]),
    u.addGetterSetter(h, "fillPatternOffsetX", 0, e()),
    u.addGetterSetter(h, "fillPatternOffsetY", 0, e()),
    u.addComponentsGetterSetter(h, "fillPatternScale", ["x", "y"]),
    u.addGetterSetter(h, "fillPatternScaleX", 1, e()),
    u.addGetterSetter(h, "fillPatternScaleY", 1, e()),
    u.addComponentsGetterSetter(h, "fillLinearGradientStartPoint", ["x", "y"]),
    u.addComponentsGetterSetter(h, "strokeLinearGradientStartPoint", ["x", "y"]),
    u.addGetterSetter(h, "fillLinearGradientStartPointX", 0),
    u.addGetterSetter(h, "strokeLinearGradientStartPointX", 0),
    u.addGetterSetter(h, "fillLinearGradientStartPointY", 0),
    u.addGetterSetter(h, "strokeLinearGradientStartPointY", 0),
    u.addComponentsGetterSetter(h, "fillLinearGradientEndPoint", ["x", "y"]),
    u.addComponentsGetterSetter(h, "strokeLinearGradientEndPoint", ["x", "y"]),
    u.addGetterSetter(h, "fillLinearGradientEndPointX", 0),
    u.addGetterSetter(h, "strokeLinearGradientEndPointX", 0),
    u.addGetterSetter(h, "fillLinearGradientEndPointY", 0),
    u.addGetterSetter(h, "strokeLinearGradientEndPointY", 0),
    u.addComponentsGetterSetter(h, "fillRadialGradientStartPoint", ["x", "y"]),
    u.addGetterSetter(h, "fillRadialGradientStartPointX", 0),
    u.addGetterSetter(h, "fillRadialGradientStartPointY", 0),
    u.addComponentsGetterSetter(h, "fillRadialGradientEndPoint", ["x", "y"]),
    u.addGetterSetter(h, "fillRadialGradientEndPointX", 0),
    u.addGetterSetter(h, "fillRadialGradientEndPointY", 0),
    u.addGetterSetter(h, "fillPatternRotation", 0),
    u.addGetterSetter(h, "fillRule", void 0, i()),
    u.backCompat(h, {
        dashArray: "dash",
        getDashArray: "getDash",
        setDashArray: "getDash",
        drawFunc: "sceneFunc",
        getDrawFunc: "getSceneFunc",
        setDrawFunc: "setSceneFunc",
        drawHitFunc: "hitFunc",
        getDrawHitFunc: "getHitFunc",
        setDrawHitFunc: "setHitFunc"
    });
    let ae = [{
        x: 0,
        y: 0
    }, {
        x: -1,
        y: -1
    }, {
        x: 1,
        y: -1
    }, {
        x: 1,
        y: 1
    }, {
        x: -1,
        y: 1
    }]
      , ne = ae.length;
    class l extends s {
        constructor(t) {
            super(t),
            this.canvas = new f,
            this.hitCanvas = new rt({
                pixelRatio: 1
            }),
            this._waitingForDraw = !1,
            this.on("visibleChange.konva", this._checkVisibility),
            this._checkVisibility(),
            this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled),
            this._setSmoothEnabled()
        }
        createPNGStream() {
            return this.canvas._canvas.createPNGStream()
        }
        getCanvas() {
            return this.canvas
        }
        getNativeCanvasElement() {
            return this.canvas._canvas
        }
        getHitCanvas() {
            return this.hitCanvas
        }
        getContext() {
            return this.getCanvas().getContext()
        }
        clear(t) {
            return this.getContext().clear(t),
            this.getHitCanvas().getContext().clear(t),
            this
        }
        setZIndex(t) {
            super.setZIndex(t);
            var e = this.getStage();
            return e && e.content && (e.content.removeChild(this.getNativeCanvasElement()),
            t < e.children.length - 1 ? e.content.insertBefore(this.getNativeCanvasElement(), e.children[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getNativeCanvasElement())),
            this
        }
        moveToTop() {
            o.prototype.moveToTop.call(this);
            var t = this.getStage();
            return t && t.content && (t.content.removeChild(this.getNativeCanvasElement()),
            t.content.appendChild(this.getNativeCanvasElement())),
            !0
        }
        moveUp() {
            var t;
            return !!o.prototype.moveUp.call(this) && !(!(t = this.getStage()) || !t.content || (t.content.removeChild(this.getNativeCanvasElement()),
            this.index < t.children.length - 1 ? t.content.insertBefore(this.getNativeCanvasElement(), t.children[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getNativeCanvasElement()),
            0))
        }
        moveDown() {
            var t, e;
            return !!o.prototype.moveDown.call(this) && ((t = this.getStage()) && (e = t.children,
            t.content) && (t.content.removeChild(this.getNativeCanvasElement()),
            t.content.insertBefore(this.getNativeCanvasElement(), e[this.index + 1].getCanvas()._canvas)),
            !0)
        }
        moveToBottom() {
            var t, e;
            return !!o.prototype.moveToBottom.call(this) && ((t = this.getStage()) && (e = t.children,
            t.content) && (t.content.removeChild(this.getNativeCanvasElement()),
            t.content.insertBefore(this.getNativeCanvasElement(), e[1].getCanvas()._canvas)),
            !0)
        }
        getLayer() {
            return this
        }
        remove() {
            var t = this.getNativeCanvasElement();
            return o.prototype.remove.call(this),
            t && t.parentNode && N._isInDocument(t) && t.parentNode.removeChild(t),
            this
        }
        getStage() {
            return this.parent
        }
        setSize({width: t, height: e}) {
            return this.canvas.setSize(t, e),
            this.hitCanvas.setSize(t, e),
            this._setSmoothEnabled(),
            this
        }
        _validateAdd(t) {
            t = t.getType();
            "Group" !== t && "Shape" !== t && N.throw("You may only add groups and shapes to a layer.")
        }
        _toKonvaCanvas(t) {
            return (t = t || {}).width = t.width || this.getWidth(),
            t.height = t.height || this.getHeight(),
            t.x = void 0 !== t.x ? t.x : this.x(),
            t.y = void 0 !== t.y ? t.y : this.y(),
            o.prototype._toKonvaCanvas.call(this, t)
        }
        _checkVisibility() {
            var t = this.visible();
            this.canvas._canvas.style.display = t ? "block" : "none"
        }
        _setSmoothEnabled() {
            this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled()
        }
        getWidth() {
            if (this.parent)
                return this.parent.width()
        }
        setWidth() {
            N.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
        }
        getHeight() {
            if (this.parent)
                return this.parent.height()
        }
        setHeight() {
            N.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
        }
        batchDraw() {
            return this._waitingForDraw || (this._waitingForDraw = !0,
            N.requestAnimFrame( () => {
                this.draw(),
                this._waitingForDraw = !1
            }
            )),
            this
        }
        getIntersection(e) {
            if (!this.isListening() || !this.isVisible())
                return null;
            let i = 1
              , r = !1;
            for (; ; ) {
                for (let t = 0; t < ne; t++) {
                    var a = ae[t]
                      , a = this._getIntersection({
                        x: e.x + a.x * i,
                        y: e.y + a.y * i
                    })
                      , n = a.shape;
                    if (n)
                        return n;
                    if (r = !!a.antialiased,
                    !a.antialiased)
                        break
                }
                if (!r)
                    return null;
                i += 1
            }
        }
        _getIntersection(t) {
            let e = this.hitCanvas.pixelRatio
              , i = this.hitCanvas.context.getImageData(Math.round(t.x * e), Math.round(t.y * e), 1, 1).data
              , r = i[3];
            if (255 !== r)
                return 0 < r ? {
                    antialiased: !0
                } : {};
            {
                let t = N._rgbToHex(i[0], i[1], i[2])
                  , e = re["#" + t];
                return e ? {
                    shape: e
                } : {
                    antialiased: !0
                }
            }
        }
        drawScene(t, e) {
            var i = this.getLayer()
              , t = t || i && i.getCanvas();
            return this._fire("beforeDraw", {
                node: this
            }),
            this.clearBeforeDraw() && t.getContext().clear(),
            s.prototype.drawScene.call(this, t, e),
            this._fire("draw", {
                node: this
            }),
            this
        }
        drawHit(t, e) {
            var i = this.getLayer()
              , t = t || i && i.hitCanvas;
            return i && i.clearBeforeDraw() && i.getHitCanvas().getContext().clear(),
            s.prototype.drawHit.call(this, t, e),
            this
        }
        enableHitGraph() {
            return this.hitGraphEnabled(!0),
            this
        }
        disableHitGraph() {
            return this.hitGraphEnabled(!1),
            this
        }
        setHitGraphEnabled(t) {
            N.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),
            this.listening(t)
        }
        getHitGraphEnabled(t) {
            return N.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."),
            this.listening()
        }
        toggleHitCanvas() {
            var t;
            this.parent && this.parent.content && (t = this.parent,
            this.hitCanvas._canvas.parentNode ? t.content.removeChild(this.hitCanvas._canvas) : t.content.appendChild(this.hitCanvas._canvas))
        }
        destroy() {
            return N.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas),
            super.destroy()
        }
    }
    l.prototype.nodeType = "Layer",
    t(l),
    u.addGetterSetter(l, "imageSmoothingEnabled", !0),
    u.addGetterSetter(l, "clearBeforeDraw", !0),
    u.addGetterSetter(l, "hitGraphEnabled", !0, r());
    class se extends l {
        constructor(t) {
            super(t),
            this.listening(!1),
            N.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.')
        }
    }
    se.prototype.nodeType = "FastLayer",
    t(se);
    class oe extends s {
        _validateAdd(t) {
            t = t.getType();
            "Group" !== t && "Shape" !== t && N.throw("You may only add groups and shapes to groups.")
        }
    }
    oe.prototype.nodeType = "Group",
    t(oe);
    let he = O.performance && O.performance.now ? function() {
        return O.performance.now()
    }
    : function() {
        return (new Date).getTime()
    }
    ;
    class _ {
        constructor(t, e) {
            this.id = _.animIdCounter++,
            this.frame = {
                time: 0,
                timeDiff: 0,
                lastTime: he(),
                frameRate: 0
            },
            this.func = t,
            this.setLayers(e)
        }
        setLayers(t) {
            let e = [];
            return t && (e = Array.isArray(t) ? t : [t]),
            this.layers = e,
            this
        }
        getLayers() {
            return this.layers
        }
        addLayer(e) {
            var i = this.layers
              , r = i.length;
            for (let t = 0; t < r; t++)
                if (i[t]._id === e._id)
                    return !1;
            return this.layers.push(e),
            !0
        }
        isRunning() {
            var e = _.animations
              , i = e.length;
            for (let t = 0; t < i; t++)
                if (e[t].id === this.id)
                    return !0;
            return !1
        }
        start() {
            return this.stop(),
            this.frame.timeDiff = 0,
            this.frame.lastTime = he(),
            _._addAnimation(this),
            this
        }
        stop() {
            return _._removeAnimation(this),
            this
        }
        _updateFrameObject(t) {
            this.frame.timeDiff = t - this.frame.lastTime,
            this.frame.lastTime = t,
            this.frame.time += this.frame.timeDiff,
            this.frame.frameRate = 1e3 / this.frame.timeDiff
        }
        static _addAnimation(t) {
            this.animations.push(t),
            this._handleAnimation()
        }
        static _removeAnimation(t) {
            var e = t.id
              , i = this.animations
              , r = i.length;
            for (let t = 0; t < r; t++)
                if (i[t].id === e) {
                    this.animations.splice(t, 1);
                    break
                }
        }
        static _runFrames() {
            let e = {}
              , i = this.animations;
            for (let t = 0; t < i.length; t++) {
                var r = i[t]
                  , a = r.layers
                  , n = r.func
                  , s = (r._updateFrameObject(he()),
                a.length);
                if (!n || !1 !== n.call(r, r.frame))
                    for (let t = 0; t < s; t++) {
                        var o = a[t];
                        void 0 !== o._id && (e[o._id] = o)
                    }
            }
            for (let t in e)
                e.hasOwnProperty(t) && e[t].batchDraw()
        }
        static _animationLoop() {
            var t = _;
            t.animations.length ? (t._runFrames(),
            N.requestAnimFrame(t._animationLoop)) : t.animRunning = !1
        }
        static _handleAnimation() {
            this.animRunning || (this.animRunning = !0,
            N.requestAnimFrame(this._animationLoop))
        }
    }
    _.animations = [],
    _.animIdCounter = 0,
    _.animRunning = !1;
    let le = {
        node: 1,
        duration: 1,
        easing: 1,
        onFinish: 1,
        yoyo: 1
    }
      , de = 0
      , ce = ["fill", "stroke", "shadowColor"];
    class ge {
        constructor(t, e, i, r, a, n, s) {
            this.prop = t,
            this.propFunc = e,
            this.begin = r,
            this._pos = r,
            this.duration = n,
            this._change = 0,
            this.prevPos = 0,
            this.yoyo = s,
            this._time = 0,
            this._position = 0,
            this._startTime = 0,
            this._finish = 0,
            this.func = i,
            this._change = a - this.begin,
            this.pause()
        }
        fire(t) {
            t = this[t];
            t && t()
        }
        setTime(t) {
            t > this.duration ? this.yoyo ? (this._time = this.duration,
            this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0,
            this.play()) : this.reset() : (this._time = t,
            this.update())
        }
        getTime() {
            return this._time
        }
        setPosition(t) {
            this.prevPos = this._pos,
            this.propFunc(t),
            this._pos = t
        }
        getPosition(t) {
            return void 0 === t && (t = this._time),
            this.func(t, this.begin, this._change, this.duration)
        }
        play() {
            this.state = 2,
            this._startTime = this.getTimer() - this._time,
            this.onEnterFrame(),
            this.fire("onPlay")
        }
        reverse() {
            this.state = 3,
            this._time = this.duration - this._time,
            this._startTime = this.getTimer() - this._time,
            this.onEnterFrame(),
            this.fire("onReverse")
        }
        seek(t) {
            this.pause(),
            this._time = t,
            this.update(),
            this.fire("onSeek")
        }
        reset() {
            this.pause(),
            this._time = 0,
            this.update(),
            this.fire("onReset")
        }
        finish() {
            this.pause(),
            this._time = this.duration,
            this.update(),
            this.fire("onFinish")
        }
        update() {
            this.setPosition(this.getPosition(this._time)),
            this.fire("onUpdate")
        }
        onEnterFrame() {
            var t = this.getTimer() - this._startTime;
            2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t)
        }
        pause() {
            this.state = 1,
            this.fire("onPause")
        }
        getTimer() {
            return (new Date).getTime()
        }
    }
    class v {
        constructor(t) {
            let e, i, r = this, a = t.node, n = a._id, s = t.easing || ue.Linear, o = !!t.yoyo;
            e = void 0 === t.duration ? .3 : 0 === t.duration ? .001 : t.duration,
            this.node = a,
            this._id = de++;
            var h = a.getLayer() || (a instanceof A.Stage ? a.getLayers() : null);
            for (i in h || N.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."),
            this.anim = new _(function() {
                r.tween.onEnterFrame()
            }
            ,h),
            this.tween = new ge(i,function(t) {
                r._tweenFunc(t)
            }
            ,s,0,1,1e3 * e,o),
            this._addListeners(),
            v.attrs[n] || (v.attrs[n] = {}),
            v.attrs[n][this._id] || (v.attrs[n][this._id] = {}),
            v.tweens[n] || (v.tweens[n] = {}),
            t)
                void 0 === le[i] && this._addAttr(i, t[i]);
            this.reset(),
            this.onFinish = t.onFinish,
            this.onReset = t.onReset,
            this.onUpdate = t.onUpdate
        }
        _addAttr(t, e) {
            let i, r, a, n, s, o, h, l, d = this.node, c = d._id;
            if ((a = v.tweens[c][t]) && delete v.attrs[c][a][t],
            i = d.getAttr(t),
            N._isArray(e))
                if (r = [],
                s = Math.max(e.length, i.length),
                "points" === t && e.length !== i.length && (e.length > i.length ? (h = i,
                i = N._prepareArrayForTween(i, e, d.closed())) : (o = e,
                e = N._prepareArrayForTween(e, i, d.closed()))),
                0 === t.indexOf("fill"))
                    for (n = 0; n < s; n++)
                        if (n % 2 == 0)
                            r.push(e[n] - i[n]);
                        else {
                            let t = N.colorToRGBA(i[n]);
                            l = N.colorToRGBA(e[n]),
                            i[n] = t,
                            r.push({
                                r: l.r - t.r,
                                g: l.g - t.g,
                                b: l.b - t.b,
                                a: l.a - t.a
                            })
                        }
                else
                    for (n = 0; n < s; n++)
                        r.push(e[n] - i[n]);
            else
                r = -1 !== ce.indexOf(t) ? (i = N.colorToRGBA(i),
                {
                    r: (l = N.colorToRGBA(e)).r - i.r,
                    g: l.g - i.g,
                    b: l.b - i.b,
                    a: l.a - i.a
                }) : e - i;
            v.attrs[c][this._id][t] = {
                start: i,
                diff: r,
                end: e,
                trueEnd: o,
                trueStart: h
            },
            v.tweens[c][t] = this._id
        }
        _tweenFunc(t) {
            let e, i, r, a, n, s, o, h, l = this.node, d = v.attrs[l._id][this._id];
            for (e in d) {
                if (r = (i = d[e]).start,
                a = i.diff,
                h = i.end,
                N._isArray(r))
                    if (n = [],
                    o = Math.max(r.length, h.length),
                    0 === e.indexOf("fill"))
                        for (s = 0; s < o; s++)
                            s % 2 == 0 ? n.push((r[s] || 0) + a[s] * t) : n.push("rgba(" + Math.round(r[s].r + a[s].r * t) + "," + Math.round(r[s].g + a[s].g * t) + "," + Math.round(r[s].b + a[s].b * t) + "," + (r[s].a + a[s].a * t) + ")");
                    else
                        for (s = 0; s < o; s++)
                            n.push((r[s] || 0) + a[s] * t);
                else
                    n = -1 !== ce.indexOf(e) ? "rgba(" + Math.round(r.r + a.r * t) + "," + Math.round(r.g + a.g * t) + "," + Math.round(r.b + a.b * t) + "," + (r.a + a.a * t) + ")" : r + a * t;
                l.setAttr(e, n)
            }
        }
        _addListeners() {
            this.tween.onPlay = () => {
                this.anim.start()
            }
            ,
            this.tween.onReverse = () => {
                this.anim.start()
            }
            ,
            this.tween.onPause = () => {
                this.anim.stop()
            }
            ,
            this.tween.onFinish = () => {
                var t = this.node
                  , e = v.attrs[t._id][this._id];
                e.points && e.points.trueEnd && t.setAttr("points", e.points.trueEnd),
                this.onFinish && this.onFinish.call(this)
            }
            ,
            this.tween.onReset = () => {
                var t = this.node
                  , e = v.attrs[t._id][this._id];
                e.points && e.points.trueStart && t.points(e.points.trueStart),
                this.onReset && this.onReset()
            }
            ,
            this.tween.onUpdate = () => {
                this.onUpdate && this.onUpdate.call(this)
            }
        }
        play() {
            return this.tween.play(),
            this
        }
        reverse() {
            return this.tween.reverse(),
            this
        }
        reset() {
            return this.tween.reset(),
            this
        }
        seek(t) {
            return this.tween.seek(1e3 * t),
            this
        }
        pause() {
            return this.tween.pause(),
            this
        }
        finish() {
            return this.tween.finish(),
            this
        }
        destroy() {
            let t, e = this.node._id, i = this._id, r = v.tweens[e];
            for (t in this.pause(),
            r)
                delete v.tweens[e][t];
            delete v.attrs[e][i]
        }
    }
    v.attrs = {},
    v.tweens = {},
    o.prototype.to = function(t) {
        let e = t.onFinish;
        t.node = this,
        t.onFinish = function() {
            this.destroy(),
            e && e()
        }
        ,
        new v(t).play()
    }
    ;
    let ue = {
        BackEaseIn(t, e, i, r) {
            return i * (t /= r) * t * (2.70158 * t - 1.70158) + e
        },
        BackEaseOut(t, e, i, r) {
            return i * ((t = t / r - 1) * t * (2.70158 * t + 1.70158) + 1) + e
        },
        BackEaseInOut(t, e, i, r) {
            let a = 1.70158;
            return (t /= r / 2) < 1 ? i / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + e : i / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + e
        },
        ElasticEaseIn(t, e, i, r, a, n) {
            let s = 0;
            return 0 === t ? e : 1 == (t /= r) ? e + i : (n = n || .3 * r,
            s = !a || a < Math.abs(i) ? (a = i,
            n / 4) : n / (2 * Math.PI) * Math.asin(i / a),
            -a * Math.pow(2, 10 * --t) * Math.sin((t * r - s) * (2 * Math.PI) / n) + e)
        },
        ElasticEaseOut(t, e, i, r, a, n) {
            let s = 0;
            return 0 === t ? e : 1 == (t /= r) ? e + i : (n = n || .3 * r,
            s = !a || a < Math.abs(i) ? (a = i,
            n / 4) : n / (2 * Math.PI) * Math.asin(i / a),
            a * Math.pow(2, -10 * t) * Math.sin((t * r - s) * (2 * Math.PI) / n) + i + e)
        },
        ElasticEaseInOut(t, e, i, r, a, n) {
            let s = 0;
            return 0 === t ? e : 2 == (t /= r / 2) ? e + i : (n = n || r * (.3 * 1.5),
            s = !a || a < Math.abs(i) ? (a = i,
            n / 4) : n / (2 * Math.PI) * Math.asin(i / a),
            t < 1 ? a * Math.pow(2, 10 * --t) * Math.sin((t * r - s) * (2 * Math.PI) / n) * -.5 + e : a * Math.pow(2, -10 * --t) * Math.sin((t * r - s) * (2 * Math.PI) / n) * .5 + i + e)
        },
        BounceEaseOut: (t, e, i, r) => (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e,
        BounceEaseIn: (t, e, i, r) => i - ue.BounceEaseOut(r - t, 0, i, r) + e,
        BounceEaseInOut: (t, e, i, r) => t < r / 2 ? .5 * ue.BounceEaseIn(2 * t, 0, i, r) + e : .5 * ue.BounceEaseOut(2 * t - r, 0, i, r) + .5 * i + e,
        EaseIn: (t, e, i, r) => i * (t /= r) * t + e,
        EaseOut: (t, e, i, r) => -i * (t /= r) * (t - 2) + e,
        EaseInOut: (t, e, i, r) => (t /= r / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e,
        StrongEaseIn: (t, e, i, r) => i * (t /= r) * t * t * t * t + e,
        StrongEaseOut: (t, e, i, r) => i * ((t = t / r - 1) * t * t * t * t + 1) + e,
        StrongEaseInOut: (t, e, i, r) => (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e,
        Linear: (t, e, i, r) => i * t / r + e
    }
      , fe = N._assign(A, {
        Util: N,
        Transform: d,
        Node: o,
        Container: s,
        Stage: Kt,
        stages: Vt,
        Layer: l,
        FastLayer: se,
        Group: oe,
        DD: c,
        Shape: h,
        shapes: re,
        Animation: _,
        Tween: v,
        Easings: ue,
        Context: Z,
        Canvas: it
    });
    class y extends h {
        _sceneFunc(t) {
            var e = A.getAngle(this.angle())
              , i = this.clockwise();
            t.beginPath(),
            t.arc(0, 0, this.outerRadius(), 0, e, i),
            t.arc(0, 0, this.innerRadius(), e, 0, !i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.outerRadius()
        }
        getHeight() {
            return 2 * this.outerRadius()
        }
        setWidth(t) {
            this.outerRadius(t / 2)
        }
        setHeight(t) {
            this.outerRadius(t / 2)
        }
        getSelfRect() {
            var t = this.innerRadius()
              , e = this.outerRadius()
              , i = this.clockwise()
              , r = A.getAngle(i ? 360 - this.angle() : this.angle())
              , a = Math.cos(Math.min(r, Math.PI))
              , n = Math.sin(Math.min(Math.max(Math.PI, r), 3 * Math.PI / 2))
              , r = Math.sin(Math.min(r, Math.PI / 2))
              , a = a * (0 < a ? t : e)
              , n = n * (0 < n ? t : e)
              , r = r * (0 < r ? e : t);
            return {
                x: a,
                y: i ? -1 * r : n,
                width: +e - a,
                height: r - n
            }
        }
    }
    function pe(t, e, i, r, a, n, s) {
        var o = Math.sqrt(Math.pow(i - t, 2) + Math.pow(r - e, 2))
          , h = Math.sqrt(Math.pow(a - i, 2) + Math.pow(n - r, 2))
          , l = s * o / (o + h)
          , s = s * h / (o + h);
        return [i - l * (a - t), r - l * (n - e), i + s * (a - t), r + s * (n - e)]
    }
    function me(i, r) {
        let t = i.length
          , a = [];
        for (let e = 2; e < t - 2; e += 2) {
            let t = pe(i[e - 2], i[e - 1], i[e], i[e + 1], i[e + 2], i[e + 3], r);
            isNaN(t[0]) || (a.push(t[0]),
            a.push(t[1]),
            a.push(i[e]),
            a.push(i[e + 1]),
            a.push(t[2]),
            a.push(t[3]))
        }
        return a
    }
    y.prototype._centroid = !0,
    y.prototype.className = "Arc",
    y.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    t(y),
    u.addGetterSetter(y, "innerRadius", 0, e()),
    u.addGetterSetter(y, "outerRadius", 0, e()),
    u.addGetterSetter(y, "angle", 0, e()),
    u.addGetterSetter(y, "clockwise", !1, r());
    class x extends h {
        constructor(t) {
            super(t),
            this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
                this._clearCache("tensionPoints")
            })
        }
        _sceneFunc(t) {
            let e, i, r, a = this.points(), n = a.length, s = this.tension(), o = this.closed(), h = this.bezier();
            if (n) {
                if (t.beginPath(),
                t.moveTo(a[0], a[1]),
                0 !== s && 4 < n) {
                    for (i = (e = this.getTensionPoints()).length,
                    r = o ? 0 : 4,
                    o || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); r < i - 2; )
                        t.bezierCurveTo(e[r++], e[r++], e[r++], e[r++], e[r++], e[r++]);
                    o || t.quadraticCurveTo(e[i - 2], e[i - 1], a[n - 2], a[n - 1])
                } else if (h)
                    for (r = 2; r < n; )
                        t.bezierCurveTo(a[r++], a[r++], a[r++], a[r++], a[r++], a[r++]);
                else
                    for (r = 2; r < n; r += 2)
                        t.lineTo(a[r], a[r + 1]);
                o ? (t.closePath(),
                t.fillStrokeShape(this)) : t.strokeShape(this)
            }
        }
        getTensionPoints() {
            return this._getCache("tensionPoints", this._getTensionPoints)
        }
        _getTensionPoints() {
            return this.closed() ? this._getTensionPointsClosed() : me(this.points(), this.tension())
        }
        _getTensionPointsClosed() {
            var t = this.points()
              , e = t.length
              , i = this.tension()
              , r = pe(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i)
              , a = pe(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i)
              , i = me(t, i);
            return [r[2], r[3]].concat(i).concat([a[0], a[1], t[e - 2], t[e - 1], a[2], a[3], r[0], r[1], t[0], t[1]])
        }
        getWidth() {
            return this.getSelfRect().width
        }
        getHeight() {
            return this.getSelfRect().height
        }
        getSelfRect() {
            var e = this.points();
            if (e.length < 4)
                return {
                    x: e[0] || 0,
                    y: e[1] || 0,
                    width: 0,
                    height: 0
                };
            let i, r, a = (e = 0 !== this.tension() ? [e[0], e[1], ...this._getTensionPoints(), e[e.length - 2], e[e.length - 1]] : this.points())[0], n = e[0], s = e[1], o = e[1];
            for (let t = 0; t < e.length / 2; t++)
                i = e[2 * t],
                r = e[2 * t + 1],
                a = Math.min(a, i),
                n = Math.max(n, i),
                s = Math.min(s, r),
                o = Math.max(o, r);
            return {
                x: a,
                y: s,
                width: n - a,
                height: o - s
            }
        }
    }
    x.prototype.className = "Line",
    x.prototype._attrsAffectingSize = ["points", "bezier", "tension"],
    t(x),
    u.addGetterSetter(x, "closed", !1),
    u.addGetterSetter(x, "bezier", !1),
    u.addGetterSetter(x, "tension", 0, e()),
    u.addGetterSetter(x, "points", [], ( () => {
        if (A.isUnminified)
            return function(t, e) {
                var i = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
                return i && t instanceof i || (N._isArray(t) ? t.forEach(function(t) {
                    N._isNumber(t) || N.warn('"' + e + '" attribute has non numeric element ' + t + ". Make sure that all elements are numbers.")
                }) : N.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.')),
                t
            }
    }
    )());
    let _e = [[], [], [-.5773502691896257, .5773502691896257], [0, -.7745966692414834, .7745966692414834], [-.33998104358485626, .33998104358485626, -.8611363115940526, .8611363115940526], [0, -.5384693101056831, .5384693101056831, -.906179845938664, .906179845938664], [.6612093864662645, -.6612093864662645, -.2386191860831969, .2386191860831969, -.932469514203152, .932469514203152], [0, .4058451513773972, -.4058451513773972, -.7415311855993945, .7415311855993945, -.9491079123427585, .9491079123427585], [-.1834346424956498, .1834346424956498, -.525532409916329, .525532409916329, -.7966664774136267, .7966664774136267, -.9602898564975363, .9602898564975363], [0, -.8360311073266358, .8360311073266358, -.9681602395076261, .9681602395076261, -.3242534234038089, .3242534234038089, -.6133714327005904, .6133714327005904], [-.14887433898163122, .14887433898163122, -.4333953941292472, .4333953941292472, -.6794095682990244, .6794095682990244, -.8650633666889845, .8650633666889845, -.9739065285171717, .9739065285171717], [0, -.26954315595234496, .26954315595234496, -.5190961292068118, .5190961292068118, -.7301520055740494, .7301520055740494, -.8870625997680953, .8870625997680953, -.978228658146057, .978228658146057], [-.1252334085114689, .1252334085114689, -.3678314989981802, .3678314989981802, -.5873179542866175, .5873179542866175, -.7699026741943047, .7699026741943047, -.9041172563704749, .9041172563704749, -.9815606342467192, .9815606342467192], [0, -.2304583159551348, .2304583159551348, -.44849275103644687, .44849275103644687, -.6423493394403402, .6423493394403402, -.8015780907333099, .8015780907333099, -.9175983992229779, .9175983992229779, -.9841830547185881, .9841830547185881], [-.10805494870734367, .10805494870734367, -.31911236892788974, .31911236892788974, -.5152486363581541, .5152486363581541, -.6872929048116855, .6872929048116855, -.827201315069765, .827201315069765, -.9284348836635735, .9284348836635735, -.9862838086968123, .9862838086968123], [0, -.20119409399743451, .20119409399743451, -.3941513470775634, .3941513470775634, -.5709721726085388, .5709721726085388, -.7244177313601701, .7244177313601701, -.8482065834104272, .8482065834104272, -.937273392400706, .937273392400706, -.9879925180204854, .9879925180204854], [-.09501250983763744, .09501250983763744, -.2816035507792589, .2816035507792589, -.45801677765722737, .45801677765722737, -.6178762444026438, .6178762444026438, -.755404408355003, .755404408355003, -.8656312023878318, .8656312023878318, -.9445750230732326, .9445750230732326, -.9894009349916499, .9894009349916499], [0, -.17848418149584785, .17848418149584785, -.3512317634538763, .3512317634538763, -.5126905370864769, .5126905370864769, -.6576711592166907, .6576711592166907, -.7815140038968014, .7815140038968014, -.8802391537269859, .8802391537269859, -.9506755217687678, .9506755217687678, -.9905754753144174, .9905754753144174], [-.0847750130417353, .0847750130417353, -.2518862256915055, .2518862256915055, -.41175116146284263, .41175116146284263, -.5597708310739475, .5597708310739475, -.6916870430603532, .6916870430603532, -.8037049589725231, .8037049589725231, -.8926024664975557, .8926024664975557, -.9558239495713977, .9558239495713977, -.9915651684209309, .9915651684209309], [0, -.16035864564022537, .16035864564022537, -.31656409996362983, .31656409996362983, -.46457074137596094, .46457074137596094, -.600545304661681, .600545304661681, -.7209661773352294, .7209661773352294, -.8227146565371428, .8227146565371428, -.9031559036148179, .9031559036148179, -.96020815213483, .96020815213483, -.9924068438435844, .9924068438435844], [-.07652652113349734, .07652652113349734, -.22778585114164507, .22778585114164507, -.37370608871541955, .37370608871541955, -.5108670019508271, .5108670019508271, -.636053680726515, .636053680726515, -.7463319064601508, .7463319064601508, -.8391169718222188, .8391169718222188, -.912234428251326, .912234428251326, -.9639719272779138, .9639719272779138, -.9931285991850949, .9931285991850949], [0, -.1455618541608951, .1455618541608951, -.2880213168024011, .2880213168024011, -.4243421202074388, .4243421202074388, -.5516188358872198, .5516188358872198, -.6671388041974123, .6671388041974123, -.7684399634756779, .7684399634756779, -.8533633645833173, .8533633645833173, -.9200993341504008, .9200993341504008, -.9672268385663063, .9672268385663063, -.9937521706203895, .9937521706203895], [-.06973927331972223, .06973927331972223, -.20786042668822127, .20786042668822127, -.34193582089208424, .34193582089208424, -.469355837986757, .469355837986757, -.5876404035069116, .5876404035069116, -.6944872631866827, .6944872631866827, -.7878168059792081, .7878168059792081, -.8658125777203002, .8658125777203002, -.926956772187174, .926956772187174, -.9700604978354287, .9700604978354287, -.9942945854823992, .9942945854823992], [0, -.1332568242984661, .1332568242984661, -.26413568097034495, .26413568097034495, -.3903010380302908, .3903010380302908, -.5095014778460075, .5095014778460075, -.6196098757636461, .6196098757636461, -.7186613631319502, .7186613631319502, -.8048884016188399, .8048884016188399, -.8767523582704416, .8767523582704416, -.9329710868260161, .9329710868260161, -.9725424712181152, .9725424712181152, -.9947693349975522, .9947693349975522], [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213]]
      , ve = [[], [], [1, 1], [.8888888888888888, .5555555555555556, .5555555555555556], [.6521451548625461, .6521451548625461, .34785484513745385, .34785484513745385], [.5688888888888889, .47862867049936647, .47862867049936647, .23692688505618908, .23692688505618908], [.3607615730481386, .3607615730481386, .46791393457269104, .46791393457269104, .17132449237917036, .17132449237917036], [.4179591836734694, .3818300505051189, .3818300505051189, .27970539148927664, .27970539148927664, .1294849661688697, .1294849661688697], [.362683783378362, .362683783378362, .31370664587788727, .31370664587788727, .22238103445337448, .22238103445337448, .10122853629037626, .10122853629037626], [.3302393550012598, .1806481606948574, .1806481606948574, .08127438836157441, .08127438836157441, .31234707704000286, .31234707704000286, .26061069640293544, .26061069640293544], [.29552422471475287, .29552422471475287, .26926671930999635, .26926671930999635, .21908636251598204, .21908636251598204, .1494513491505806, .1494513491505806, .06667134430868814, .06667134430868814], [.2729250867779006, .26280454451024665, .26280454451024665, .23319376459199048, .23319376459199048, .18629021092773426, .18629021092773426, .1255803694649046, .1255803694649046, .05566856711617366, .05566856711617366], [.24914704581340277, .24914704581340277, .2334925365383548, .2334925365383548, .20316742672306592, .20316742672306592, .16007832854334622, .16007832854334622, .10693932599531843, .10693932599531843, .04717533638651183, .04717533638651183], [.2325515532308739, .22628318026289723, .22628318026289723, .2078160475368885, .2078160475368885, .17814598076194574, .17814598076194574, .13887351021978725, .13887351021978725, .09212149983772845, .09212149983772845, .04048400476531588, .04048400476531588], [.2152638534631578, .2152638534631578, .2051984637212956, .2051984637212956, .18553839747793782, .18553839747793782, .15720316715819355, .15720316715819355, .12151857068790319, .12151857068790319, .08015808715976021, .08015808715976021, .03511946033175186, .03511946033175186], [.2025782419255613, .19843148532711158, .19843148532711158, .1861610000155622, .1861610000155622, .16626920581699392, .16626920581699392, .13957067792615432, .13957067792615432, .10715922046717194, .10715922046717194, .07036604748810812, .07036604748810812, .03075324199611727, .03075324199611727], [.1894506104550685, .1894506104550685, .18260341504492358, .18260341504492358, .16915651939500254, .16915651939500254, .14959598881657674, .14959598881657674, .12462897125553388, .12462897125553388, .09515851168249279, .09515851168249279, .062253523938647894, .062253523938647894, .027152459411754096, .027152459411754096], [.17944647035620653, .17656270536699264, .17656270536699264, .16800410215645004, .16800410215645004, .15404576107681028, .15404576107681028, .13513636846852548, .13513636846852548, .11188384719340397, .11188384719340397, .08503614831717918, .08503614831717918, .0554595293739872, .0554595293739872, .02414830286854793, .02414830286854793], [.1691423829631436, .1691423829631436, .16427648374583273, .16427648374583273, .15468467512626524, .15468467512626524, .14064291467065065, .14064291467065065, .12255520671147846, .12255520671147846, .10094204410628717, .10094204410628717, .07642573025488905, .07642573025488905, .0497145488949698, .0497145488949698, .02161601352648331, .02161601352648331], [.1610544498487837, .15896884339395434, .15896884339395434, .15276604206585967, .15276604206585967, .1426067021736066, .1426067021736066, .12875396253933621, .12875396253933621, .11156664554733399, .11156664554733399, .09149002162245, .09149002162245, .06904454273764123, .06904454273764123, .0448142267656996, .0448142267656996, .019461788229726478, .019461788229726478], [.15275338713072584, .15275338713072584, .14917298647260374, .14917298647260374, .14209610931838204, .14209610931838204, .13168863844917664, .13168863844917664, .11819453196151841, .11819453196151841, .10193011981724044, .10193011981724044, .08327674157670475, .08327674157670475, .06267204833410907, .06267204833410907, .04060142980038694, .04060142980038694, .017614007139152118, .017614007139152118], [.14608113364969041, .14452440398997005, .14452440398997005, .13988739479107315, .13988739479107315, .13226893863333747, .13226893863333747, .12183141605372853, .12183141605372853, .10879729916714838, .10879729916714838, .09344442345603386, .09344442345603386, .0761001136283793, .0761001136283793, .057134425426857205, .057134425426857205, .036953789770852494, .036953789770852494, .016017228257774335, .016017228257774335], [.13925187285563198, .13925187285563198, .13654149834601517, .13654149834601517, .13117350478706238, .13117350478706238, .12325237681051242, .12325237681051242, .11293229608053922, .11293229608053922, .10041414444288096, .10041414444288096, .08594160621706773, .08594160621706773, .06979646842452049, .06979646842452049, .052293335152683286, .052293335152683286, .03377490158481415, .03377490158481415, .0146279952982722, .0146279952982722], [.13365457218610619, .1324620394046966, .1324620394046966, .12890572218808216, .12890572218808216, .12304908430672953, .12304908430672953, .11499664022241136, .11499664022241136, .10489209146454141, .10489209146454141, .09291576606003515, .09291576606003515, .07928141177671895, .07928141177671895, .06423242140852585, .06423242140852585, .04803767173108467, .04803767173108467, .030988005856979445, .030988005856979445, .013411859487141771, .013411859487141771], [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872]]
      , ye = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]
      , xe = (e, i, t) => {
        let r, a;
        var n = t / 2;
        for (let t = r = 0; t < 20; t++)
            a = n * _e[20][t] + n,
            r += ve[20][t] * ( (t, e, i) => (t = Se(1, i, t),
            i = Se(1, i, e),
            e = t * t + i * i,
            Math.sqrt(e)))(e, i, a);
        return n * r
    }
      , be = (t, e, i) => {
        void 0 === i && (i = 1);
        var r = t[0] - 2 * t[1] + t[2]
          , a = e[0] - 2 * e[1] + e[2]
          , n = 2 * t[1] - 2 * t[0]
          , s = 2 * e[1] - 2 * e[0]
          , o = 4 * (r * r + a * a)
          , r = 4 * (r * n + a * s)
          , a = n * n + s * s;
        return 0 == o ? i * Math.sqrt(Math.pow(t[2] - t[0], 2) + Math.pow(e[2] - e[0], 2)) : (e = 0 < (s = i + (n = r / (2 * o))) * s + (t = a / o - n * n) ? Math.sqrt(s * s + t) : 0,
        i = 0 < n * n + t ? Math.sqrt(n * n + t) : 0,
        r = n + Math.sqrt(n * n + t) !== 0 ? t * Math.log(Math.abs((s + e) / (n + i))) : 0,
        Math.sqrt(o) / 2 * (s * e - n * i + r))
    }
    ;
    let Se = (t, e, i) => {
        var r = i.length - 1;
        let a, n;
        if (0 == r)
            return 0;
        if (0 === t) {
            for (let t = n = 0; t <= r; t++)
                n += ye[r][t] * Math.pow(1 - e, r - t) * Math.pow(e, t) * i[t];
            return n
        }
        a = new Array(r);
        for (let t = 0; t < r; t++)
            a[t] = r * (i[t + 1] - i[t]);
        return Se(t - 1, e, a)
    }
      , we = (i, r, a) => {
        let n = 1
          , s = i / r
          , o = (i - a(s)) / r
          , t = 0;
        for (; .001 < n; ) {
            var e = a(s + o)
              , e = Math.abs(i - e) / r;
            if (e < n)
                n = e,
                s += o;
            else {
                let t = a(s - o)
                  , e = Math.abs(i - t) / r;
                e < n ? (n = e,
                s -= o) : o /= 2
            }
            if (500 < ++t)
                break
        }
        return s
    }
    ;
    class b extends h {
        constructor(t) {
            super(t),
            this.dataArray = [],
            this.pathLength = 0,
            this._readDataAttribute(),
            this.on("dataChange.konva", function() {
                this._readDataAttribute()
            })
        }
        _readDataAttribute() {
            this.dataArray = b.parsePathData(this.data()),
            this.pathLength = b.getPathLength(this.dataArray)
        }
        _sceneFunc(e) {
            var i = this.dataArray;
            e.beginPath();
            let r = !1;
            for (let t = 0; t < i.length; t++) {
                var a = i[t].command
                  , n = i[t].points;
                switch (a) {
                case "L":
                    e.lineTo(n[0], n[1]);
                    break;
                case "M":
                    e.moveTo(n[0], n[1]);
                    break;
                case "C":
                    e.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
                    break;
                case "Q":
                    e.quadraticCurveTo(n[0], n[1], n[2], n[3]);
                    break;
                case "A":
                    var s = n[0]
                      , o = n[1]
                      , h = n[2]
                      , l = n[3]
                      , d = n[4]
                      , c = n[5]
                      , g = n[6]
                      , u = n[7]
                      , f = l < h ? h : l
                      , p = l < h ? 1 : h / l
                      , l = l < h ? l / h : 1;
                    e.translate(s, o),
                    e.rotate(g),
                    e.scale(p, l),
                    e.arc(0, 0, f, d, d + c, 1 - u),
                    e.scale(1 / p, 1 / l),
                    e.rotate(-g),
                    e.translate(-s, -o);
                    break;
                case "z":
                    r = !0,
                    e.closePath()
                }
            }
            r || this.hasFill() ? e.fillStrokeShape(this) : e.strokeShape(this)
        }
        getSelfRect() {
            let o = [];
            this.dataArray.forEach(function(i) {
                if ("A" === i.command) {
                    var r = i.points[4]
                      , t = i.points[5]
                      , a = i.points[4] + t;
                    let e = Math.PI / 180;
                    if (Math.abs(r - a) < e && (e = Math.abs(r - a)),
                    t < 0)
                        for (let t = r - e; t > a; t -= e) {
                            var n = b.getPointOnEllipticalArc(i.points[0], i.points[1], i.points[2], i.points[3], t, 0);
                            o.push(n.x, n.y)
                        }
                    else
                        for (let t = r + e; t < a; t += e) {
                            var s = b.getPointOnEllipticalArc(i.points[0], i.points[1], i.points[2], i.points[3], t, 0);
                            o.push(s.x, s.y)
                        }
                } else if ("C" === i.command)
                    for (let t = 0; t <= 1; t += .01) {
                        var e = b.getPointOnCubicBezier(t, i.start.x, i.start.y, i.points[0], i.points[1], i.points[2], i.points[3], i.points[4], i.points[5]);
                        o.push(e.x, e.y)
                    }
                else
                    o = o.concat(i.points)
            });
            let e, i, r = o[0], a = o[0], n = o[1], s = o[1];
            for (let t = 0; t < o.length / 2; t++)
                e = o[2 * t],
                i = o[2 * t + 1],
                isNaN(e) || (r = Math.min(r, e),
                a = Math.max(a, e)),
                isNaN(i) || (n = Math.min(n, i),
                s = Math.max(s, i));
            return {
                x: r,
                y: n,
                width: a - r,
                height: s - n
            }
        }
        getLength() {
            return this.pathLength
        }
        getPointAtLength(t) {
            return b.getPointAtLengthOfDataArray(t, this.dataArray)
        }
        static getLineLength(t, e, i, r) {
            return Math.sqrt((i - t) * (i - t) + (r - e) * (r - e))
        }
        static getPathLength(e) {
            let i = 0;
            for (let t = 0; t < e.length; ++t)
                i += e[t].pathLength;
            return i
        }
        static getPointAtLengthOfDataArray(t, r) {
            let a, n = 0, s = r.length;
            if (s) {
                for (; n < s && t > r[n].pathLength; )
                    t -= r[n].pathLength,
                    ++n;
                if (n === s)
                    return {
                        x: (a = r[n - 1].points.slice(-2))[0],
                        y: a[1]
                    };
                if (t < .01)
                    return {
                        x: (a = r[n].points.slice(0, 2))[0],
                        y: a[1]
                    };
                let e = r[n]
                  , i = e.points;
                switch (e.command) {
                case "L":
                    return b.getPointOnLine(t, e.start.x, e.start.y, i[0], i[1]);
                case "C":
                    return b.getPointOnCubicBezier(we(t, b.getPathLength(r), t => xe([e.start.x, i[0], i[2], i[4]], [e.start.y, i[1], i[3], i[5]], t)), e.start.x, e.start.y, i[0], i[1], i[2], i[3], i[4], i[5]);
                case "Q":
                    return b.getPointOnQuadraticBezier(we(t, b.getPathLength(r), t => be([e.start.x, i[0], i[2]], [e.start.y, i[1], i[3]], t)), e.start.x, e.start.y, i[0], i[1], i[2], i[3]);
                case "A":
                    var o = i[0]
                      , h = i[1]
                      , l = i[2]
                      , d = i[3]
                      , c = i[4]
                      , g = i[5]
                      , u = i[6];
                    return c += g * t / e.pathLength,
                    b.getPointOnEllipticalArc(o, h, l, d, c, u)
                }
            }
            return null
        }
        static getPointOnLine(t, e, i, r, a, n, s) {
            n = null != n ? n : e,
            s = null != s ? s : i;
            var o, h, l, d = this.getLineLength(e, i, r, a);
            return d < 1e-10 ? {
                x: e,
                y: i
            } : r === e ? {
                x: n,
                y: s + (i < a ? t : -t)
            } : (h = (o = (a - i) / (r - e)) * (l = Math.sqrt(t * t / (1 + o * o)) * (r < e ? -1 : 1)),
            Math.abs(s - i - o * (n - e)) < 1e-10 ? {
                x: n + l,
                y: s + h
            } : (s = this.getLineLength(n, s, h = e + (l = ((n - e) * (r - e) + (s - i) * (a - i)) / (d * d)) * (r - e), n = i + l * (a - i)),
            d = Math.sqrt(t * t - s * s),
            {
                x: h + (l = Math.sqrt(d * d / (1 + o * o)) * (r < e ? -1 : 1)),
                y: n + o * l
            }))
        }
        static getPointOnCubicBezier(t, e, i, r, a, n, s, o, h) {
            function l(t) {
                return t * t * t
            }
            function d(t) {
                return 3 * t * t * (1 - t)
            }
            function c(t) {
                return 3 * t * (1 - t) * (1 - t)
            }
            function g(t) {
                return (1 - t) * (1 - t) * (1 - t)
            }
            return {
                x: o * l(t) + n * d(t) + r * c(t) + e * g(t),
                y: h * l(t) + s * d(t) + a * c(t) + i * g(t)
            }
        }
        static getPointOnQuadraticBezier(t, e, i, r, a, n, s) {
            function o(t) {
                return t * t
            }
            function h(t) {
                return 2 * t * (1 - t)
            }
            function l(t) {
                return (1 - t) * (1 - t)
            }
            return {
                x: n * o(t) + r * h(t) + e * l(t),
                y: s * o(t) + a * h(t) + i * l(t)
            }
        }
        static getPointOnEllipticalArc(t, e, i, r, a, n) {
            var s = Math.cos(n)
              , n = Math.sin(n)
              , i = i * Math.cos(a)
              , r = r * Math.sin(a);
            return {
                x: t + (i * s - r * n),
                y: e + (i * n + r * s)
            }
        }
        static parsePathData(t) {
            if (!t)
                return [];
            let e = t
              , i = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
            e = e.replace(new RegExp(" ","g"), ",");
            for (var r = 0; r < i.length; r++)
                e = e.replace(new RegExp(i[r],"g"), "|" + i[r]);
            let s = e.split("|")
              , o = []
              , h = []
              , l = 0
              , d = 0;
            for (var c, g, u, f, p, m, _, v, y, x, b, S = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, r = 1; r < s.length; r++) {
                let t = s[r]
                  , a = t.charAt(0);
                for (t = t.slice(1),
                h.length = 0; c = S.exec(t); )
                    h.push(c[0]);
                let n = [];
                for (let e = 0, t = h.length; e < t; e++)
                    if ("00" === h[e])
                        n.push(0, 0);
                    else {
                        let t = parseFloat(h[e]);
                        isNaN(t) ? n.push(0) : n.push(t)
                    }
                for (; 0 < n.length && !isNaN(n[0]); ) {
                    let t = ""
                      , e = []
                      , i = l
                      , r = d;
                    switch (a) {
                    case "l":
                        l += n.shift(),
                        d += n.shift(),
                        t = "L",
                        e.push(l, d);
                        break;
                    case "L":
                        l = n.shift(),
                        d = n.shift(),
                        e.push(l, d);
                        break;
                    case "m":
                        var w = n.shift()
                          , C = n.shift();
                        if (l += w,
                        d += C,
                        t = "M",
                        2 < o.length && "z" === o[o.length - 1].command)
                            for (let t = o.length - 2; 0 <= t; t--)
                                if ("M" === o[t].command) {
                                    l = o[t].points[0] + w,
                                    d = o[t].points[1] + C;
                                    break
                                }
                        e.push(l, d),
                        a = "l";
                        break;
                    case "M":
                        l = n.shift(),
                        d = n.shift(),
                        t = "M",
                        e.push(l, d),
                        a = "L";
                        break;
                    case "h":
                        l += n.shift(),
                        t = "L",
                        e.push(l, d);
                        break;
                    case "H":
                        l = n.shift(),
                        t = "L",
                        e.push(l, d);
                        break;
                    case "v":
                        d += n.shift(),
                        t = "L",
                        e.push(l, d);
                        break;
                    case "V":
                        d = n.shift(),
                        t = "L",
                        e.push(l, d);
                        break;
                    case "C":
                        e.push(n.shift(), n.shift(), n.shift(), n.shift()),
                        l = n.shift(),
                        d = n.shift(),
                        e.push(l, d);
                        break;
                    case "c":
                        e.push(l + n.shift(), d + n.shift(), l + n.shift(), d + n.shift()),
                        l += n.shift(),
                        d += n.shift(),
                        t = "C",
                        e.push(l, d);
                        break;
                    case "S":
                        u = l,
                        f = d,
                        "C" === (g = o[o.length - 1]).command && (u = l + (l - g.points[2]),
                        f = d + (d - g.points[3])),
                        e.push(u, f, n.shift(), n.shift()),
                        l = n.shift(),
                        d = n.shift(),
                        t = "C",
                        e.push(l, d);
                        break;
                    case "s":
                        u = l,
                        f = d,
                        "C" === (g = o[o.length - 1]).command && (u = l + (l - g.points[2]),
                        f = d + (d - g.points[3])),
                        e.push(u, f, l + n.shift(), d + n.shift()),
                        l += n.shift(),
                        d += n.shift(),
                        t = "C",
                        e.push(l, d);
                        break;
                    case "Q":
                        e.push(n.shift(), n.shift()),
                        l = n.shift(),
                        d = n.shift(),
                        e.push(l, d);
                        break;
                    case "q":
                        e.push(l + n.shift(), d + n.shift()),
                        l += n.shift(),
                        d += n.shift(),
                        t = "Q",
                        e.push(l, d);
                        break;
                    case "T":
                        u = l,
                        f = d,
                        "Q" === (g = o[o.length - 1]).command && (u = l + (l - g.points[0]),
                        f = d + (d - g.points[1])),
                        l = n.shift(),
                        d = n.shift(),
                        t = "Q",
                        e.push(u, f, l, d);
                        break;
                    case "t":
                        u = l,
                        f = d,
                        "Q" === (g = o[o.length - 1]).command && (u = l + (l - g.points[0]),
                        f = d + (d - g.points[1])),
                        l += n.shift(),
                        d += n.shift(),
                        t = "Q",
                        e.push(u, f, l, d);
                        break;
                    case "A":
                        p = n.shift(),
                        m = n.shift(),
                        _ = n.shift(),
                        v = n.shift(),
                        y = n.shift(),
                        x = l,
                        b = d,
                        l = n.shift(),
                        d = n.shift(),
                        t = "A",
                        e = this.convertEndpointToCenterParameterization(x, b, l, d, v, y, p, m, _);
                        break;
                    case "a":
                        p = n.shift(),
                        m = n.shift(),
                        _ = n.shift(),
                        v = n.shift(),
                        y = n.shift(),
                        x = l,
                        b = d,
                        l += n.shift(),
                        d += n.shift(),
                        t = "A",
                        e = this.convertEndpointToCenterParameterization(x, b, l, d, v, y, p, m, _)
                    }
                    o.push({
                        command: t || a,
                        points: e,
                        start: {
                            x: i,
                            y: r
                        },
                        pathLength: this.calcLength(i, r, t || a, e)
                    })
                }
                "z" !== a && "Z" !== a || o.push({
                    command: "z",
                    points: [],
                    start: void 0,
                    pathLength: 0
                })
            }
            return o
        }
        static calcLength(t, e, i, r) {
            let a, n, s, o;
            var h = b;
            switch (i) {
            case "L":
                return h.getLineLength(t, e, r[0], r[1]);
            case "C":
                return xe([t, r[0], r[2], r[4]], [e, r[1], r[3], r[5]], 1);
            case "Q":
                return be([t, r[0], r[2]], [e, r[1], r[3]], 1);
            case "A":
                a = 0;
                var l = r[4]
                  , d = r[5]
                  , c = r[4] + d
                  , g = Math.PI / 180;
                if (Math.abs(l - c) < g && (g = Math.abs(l - c)),
                n = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], l, 0),
                d < 0)
                    for (o = l - g; o > c; o -= g)
                        s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], o, 0),
                        a += h.getLineLength(n.x, n.y, s.x, s.y),
                        n = s;
                else
                    for (o = l + g; o < c; o += g)
                        s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], o, 0),
                        a += h.getLineLength(n.x, n.y, s.x, s.y),
                        n = s;
                return s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], c, 0),
                a += h.getLineLength(n.x, n.y, s.x, s.y)
            }
            return 0
        }
        static convertEndpointToCenterParameterization(t, e, i, r, a, n, s, o, h) {
            var h = h * (Math.PI / 180)
              , l = Math.cos(h) * (t - i) / 2 + Math.sin(h) * (e - r) / 2
              , d = -1 * Math.sin(h) * (t - i) / 2 + Math.cos(h) * (e - r) / 2
              , c = l * l / (s * s) + d * d / (o * o);
            1 < c && (s *= Math.sqrt(c),
            o *= Math.sqrt(c));
            function g(t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (y(t) * y(e))
            }
            function u(t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(g(t, e))
            }
            let f = Math.sqrt((s * s * (o * o) - s * s * (d * d) - o * o * (l * l)) / (s * s * (d * d) + o * o * (l * l)))
              , p = (a === n && (f *= -1),
            (f = isNaN(f) ? 0 : f) * s * d / o)
              , m = f * -o * l / s
              , _ = (t + i) / 2 + Math.cos(h) * p - Math.sin(h) * m
              , v = (e + r) / 2 + Math.sin(h) * p + Math.cos(h) * m
              , y = function(t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            }
              , x = u([1, 0], [(l - p) / s, (d - m) / o])
              , b = [(l - p) / s, (d - m) / o]
              , S = [(-1 * l - p) / s, (-1 * d - m) / o]
              , w = u(b, S);
            return g(b, S) <= -1 && (w = Math.PI),
            1 <= g(b, S) && (w = 0),
            0 === n && 0 < w && (w -= 2 * Math.PI),
            1 === n && w < 0 && (w += 2 * Math.PI),
            [_, v, s, o, x, w, h, n]
        }
    }
    b.prototype.className = "Path",
    b.prototype._attrsAffectingSize = ["data"],
    t(b),
    u.addGetterSetter(b, "data");
    class S extends x {
        _sceneFunc(t) {
            super._sceneFunc(t);
            let e = 2 * Math.PI
              , r = this.points()
              , a = r
              , i = 0 !== this.tension() && 4 < r.length;
            i && (a = this.getTensionPoints());
            var n = this.pointerLength()
              , s = r.length;
            let o, h;
            if (i) {
                let t = [a[a.length - 4], a[a.length - 3], a[a.length - 2], a[a.length - 1], r[s - 2], r[s - 1]]
                  , e = b.calcLength(a[a.length - 4], a[a.length - 3], "C", t)
                  , i = b.getPointOnQuadraticBezier(Math.min(1, 1 - n / e), t[0], t[1], t[2], t[3], t[4], t[5]);
                o = r[s - 2] - i.x,
                h = r[s - 1] - i.y
            } else
                o = r[s - 2] - r[s - 4],
                h = r[s - 1] - r[s - 3];
            var l = (Math.atan2(h, o) + e) % e
              , d = this.pointerWidth();
            this.pointerAtEnding() && (t.save(),
            t.beginPath(),
            t.translate(r[s - 2], r[s - 1]),
            t.rotate(l),
            t.moveTo(0, 0),
            t.lineTo(-n, d / 2),
            t.lineTo(-n, -d / 2),
            t.closePath(),
            t.restore(),
            this.__fillStroke(t)),
            this.pointerAtBeginning() && (t.save(),
            t.beginPath(),
            t.translate(r[0], r[1]),
            h = i ? (o = (a[0] + a[2]) / 2 - r[0],
            (a[1] + a[3]) / 2 - r[1]) : (o = r[2] - r[0],
            r[3] - r[1]),
            t.rotate((Math.atan2(-h, -o) + e) % e),
            t.moveTo(0, 0),
            t.lineTo(-n, d / 2),
            t.lineTo(-n, -d / 2),
            t.closePath(),
            t.restore(),
            this.__fillStroke(t))
        }
        __fillStroke(t) {
            var e = this.dashEnabled();
            e && (this.attrs.dashEnabled = !1,
            t.setLineDash([])),
            t.fillStrokeShape(this),
            e && (this.attrs.dashEnabled = !0)
        }
        getSelfRect() {
            var t = super.getSelfRect()
              , e = this.pointerWidth() / 2;
            return {
                x: t.x - e,
                y: t.y - e,
                width: t.width + 2 * e,
                height: t.height + 2 * e
            }
        }
    }
    S.prototype.className = "Arrow",
    t(S),
    u.addGetterSetter(S, "pointerLength", 10, e()),
    u.addGetterSetter(S, "pointerWidth", 10, e()),
    u.addGetterSetter(S, "pointerAtBeginning", !1),
    u.addGetterSetter(S, "pointerAtEnding", !0);
    class Ce extends h {
        _sceneFunc(t) {
            t.beginPath(),
            t.arc(0, 0, this.attrs.radius || 0, 0, 2 * Math.PI, !1),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.radius()
        }
        getHeight() {
            return 2 * this.radius()
        }
        setWidth(t) {
            this.radius() !== t / 2 && this.radius(t / 2)
        }
        setHeight(t) {
            this.radius() !== t / 2 && this.radius(t / 2)
        }
    }
    Ce.prototype._centroid = !0,
    Ce.prototype.className = "Circle",
    Ce.prototype._attrsAffectingSize = ["radius"],
    t(Ce),
    u.addGetterSetter(Ce, "radius", 0, e());
    class w extends h {
        _sceneFunc(t) {
            var e = this.radiusX()
              , i = this.radiusY();
            t.beginPath(),
            t.save(),
            e !== i && t.scale(1, i / e),
            t.arc(0, 0, e, 0, 2 * Math.PI, !1),
            t.restore(),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.radiusX()
        }
        getHeight() {
            return 2 * this.radiusY()
        }
        setWidth(t) {
            this.radiusX(t / 2)
        }
        setHeight(t) {
            this.radiusY(t / 2)
        }
    }
    w.prototype.className = "Ellipse",
    w.prototype._centroid = !0,
    w.prototype._attrsAffectingSize = ["radiusX", "radiusY"],
    t(w),
    u.addComponentsGetterSetter(w, "radius", ["x", "y"]),
    u.addGetterSetter(w, "radiusX", 0, e()),
    u.addGetterSetter(w, "radiusY", 0, e());
    class C extends h {
        constructor(t) {
            super(t),
            this.on("imageChange.konva", () => {
                this._setImageLoad()
            }
            ),
            this._setImageLoad()
        }
        _setImageLoad() {
            var t = this.image();
            t && t.complete || t && 4 === t.readyState || t && t.addEventListener && t.addEventListener("load", () => {
                this._requestDraw()
            }
            )
        }
        _useBufferCanvas() {
            var t = !!this.cornerRadius()
              , e = this.hasShadow();
            return !(!t || !e) || super._useBufferCanvas(!0)
        }
        _sceneFunc(t) {
            let i = this.getWidth(), r = this.getHeight(), e = this.cornerRadius(), a = this.attrs.image, n;
            if (a) {
                let t = this.attrs.cropWidth
                  , e = this.attrs.cropHeight;
                n = t && e ? [a, this.cropX(), this.cropY(), t, e, 0, 0, i, r] : [a, 0, 0, i, r]
            }
            (this.hasFill() || this.hasStroke() || e) && (t.beginPath(),
            e ? N.drawRoundedRectPath(t, i, r, e) : t.rect(0, 0, i, r),
            t.closePath(),
            t.fillStrokeShape(this)),
            a && (e && t.clip(),
            t.drawImage.apply(t, n))
        }
        _hitFunc(t) {
            var e = this.width()
              , i = this.height()
              , r = this.cornerRadius();
            t.beginPath(),
            r ? N.drawRoundedRectPath(t, e, i, r) : t.rect(0, 0, e, i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            var t;
            return null != (t = this.attrs.width) ? t : null == (t = this.image()) ? void 0 : t.width
        }
        getHeight() {
            var t;
            return null != (t = this.attrs.height) ? t : null == (t = this.image()) ? void 0 : t.height
        }
        static fromURL(t, e, i=null) {
            let r = N.createImageElement();
            r.onload = function() {
                var t = new C({
                    image: r
                });
                e(t)
            }
            ,
            r.onerror = i,
            r.crossOrigin = "Anonymous",
            r.src = t
        }
    }
    C.prototype.className = "Image",
    t(C),
    u.addGetterSetter(C, "cornerRadius", 0, q(4)),
    u.addGetterSetter(C, "image"),
    u.addComponentsGetterSetter(C, "crop", ["x", "y", "width", "height"]),
    u.addGetterSetter(C, "cropX", 0, e()),
    u.addGetterSetter(C, "cropY", 0, e()),
    u.addGetterSetter(C, "cropWidth", 0, e()),
    u.addGetterSetter(C, "cropHeight", 0, e());
    let Pe = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width", "height", "pointerDirection", "pointerWidth", "pointerHeight"]
      , ke = "right"
      , Ae = "down"
      , Te = "left"
      , Me = Pe.length;
    class Ge extends oe {
        constructor(t) {
            super(t),
            this.on("add.konva", function(t) {
                this._addListeners(t.child),
                this._sync()
            })
        }
        getText() {
            return this.find("Text")[0]
        }
        getTag() {
            return this.find("Tag")[0]
        }
        _addListeners(t) {
            let e, i = this;
            function r() {
                i._sync()
            }
            for (e = 0; e < Me; e++)
                t.on(Pe[e] + "Change.konva", r)
        }
        getWidth() {
            return this.getText().width()
        }
        getHeight() {
            return this.getText().height()
        }
        _sync() {
            let t, e, i, r, a, n, s, o = this.getText(), h = this.getTag();
            if (o && h) {
                switch (t = o.width(),
                e = o.height(),
                i = h.pointerDirection(),
                r = h.pointerWidth(),
                s = h.pointerHeight(),
                a = 0,
                n = 0,
                i) {
                case "up":
                    a = t / 2,
                    n = -1 * s;
                    break;
                case ke:
                    a = t + r,
                    n = e / 2;
                    break;
                case Ae:
                    a = t / 2,
                    n = e + s;
                    break;
                case Te:
                    a = -1 * r,
                    n = e / 2
                }
                h.setAttrs({
                    x: -1 * a,
                    y: -1 * n,
                    width: t,
                    height: e
                }),
                o.setAttrs({
                    x: -1 * a,
                    y: -1 * n
                })
            }
        }
    }
    Ge.prototype.className = "Label",
    t(Ge);
    class P extends h {
        _sceneFunc(t) {
            var e = this.width()
              , i = this.height()
              , r = this.pointerDirection()
              , a = this.pointerWidth()
              , n = this.pointerHeight()
              , s = this.cornerRadius();
            let o = 0
              , h = 0
              , l = 0
              , d = 0;
            "number" == typeof s ? o = h = l = d = Math.min(s, e / 2, i / 2) : (o = Math.min(s[0] || 0, e / 2, i / 2),
            h = Math.min(s[1] || 0, e / 2, i / 2),
            d = Math.min(s[2] || 0, e / 2, i / 2),
            l = Math.min(s[3] || 0, e / 2, i / 2)),
            t.beginPath(),
            t.moveTo(o, 0),
            "up" === r && (t.lineTo((e - a) / 2, 0),
            t.lineTo(e / 2, -1 * n),
            t.lineTo((e + a) / 2, 0)),
            t.lineTo(e - h, 0),
            t.arc(e - h, h, h, 3 * Math.PI / 2, 0, !1),
            r === ke && (t.lineTo(e, (i - n) / 2),
            t.lineTo(e + a, i / 2),
            t.lineTo(e, (i + n) / 2)),
            t.lineTo(e, i - d),
            t.arc(e - d, i - d, d, 0, Math.PI / 2, !1),
            r === Ae && (t.lineTo((e + a) / 2, i),
            t.lineTo(e / 2, i + n),
            t.lineTo((e - a) / 2, i)),
            t.lineTo(l, i),
            t.arc(l, i - l, l, Math.PI / 2, Math.PI, !1),
            r === Te && (t.lineTo(0, (i + n) / 2),
            t.lineTo(-1 * a, i / 2),
            t.lineTo(0, (i - n) / 2)),
            t.lineTo(0, o),
            t.arc(o, o, o, Math.PI, 3 * Math.PI / 2, !1),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getSelfRect() {
            let t = 0
              , e = 0
              , i = this.pointerWidth()
              , r = this.pointerHeight()
              , a = this.pointerDirection()
              , n = this.width()
              , s = this.height();
            return "up" === a ? (e -= r,
            s += r) : a === Ae ? s += r : a === Te ? (t -= 1.5 * i,
            n += i) : a === ke && (n += 1.5 * i),
            {
                x: t,
                y: e,
                width: n,
                height: s
            }
        }
    }
    P.prototype.className = "Tag",
    t(P),
    u.addGetterSetter(P, "pointerDirection", "none"),
    u.addGetterSetter(P, "pointerWidth", 0, e()),
    u.addGetterSetter(P, "pointerHeight", 0, e()),
    u.addGetterSetter(P, "cornerRadius", 0, q(4));
    class Re extends h {
        _sceneFunc(t) {
            var e = this.cornerRadius()
              , i = this.width()
              , r = this.height();
            t.beginPath(),
            e ? N.drawRoundedRectPath(t, i, r, e) : t.rect(0, 0, i, r),
            t.closePath(),
            t.fillStrokeShape(this)
        }
    }
    Re.prototype.className = "Rect",
    t(Re),
    u.addGetterSetter(Re, "cornerRadius", 0, q(4));
    class k extends h {
        _sceneFunc(e) {
            var i = this._getPoints();
            e.beginPath(),
            e.moveTo(i[0].x, i[0].y);
            for (let t = 1; t < i.length; t++)
                e.lineTo(i[t].x, i[t].y);
            e.closePath(),
            e.fillStrokeShape(this)
        }
        _getPoints() {
            var e = this.attrs.sides
              , i = this.attrs.radius || 0
              , r = [];
            for (let t = 0; t < e; t++)
                r.push({
                    x: i * Math.sin(2 * t * Math.PI / e),
                    y: -1 * i * Math.cos(2 * t * Math.PI / e)
                });
            return r
        }
        getSelfRect() {
            var t = this._getPoints();
            let e = t[0].x
              , i = t[0].y
              , r = t[0].x
              , a = t[0].y;
            return t.forEach(t => {
                e = Math.min(e, t.x),
                i = Math.max(i, t.x),
                r = Math.min(r, t.y),
                a = Math.max(a, t.y)
            }
            ),
            {
                x: e,
                y: r,
                width: i - e,
                height: a - r
            }
        }
        getWidth() {
            return 2 * this.radius()
        }
        getHeight() {
            return 2 * this.radius()
        }
        setWidth(t) {
            this.radius(t / 2)
        }
        setHeight(t) {
            this.radius(t / 2)
        }
    }
    k.prototype.className = "RegularPolygon",
    k.prototype._centroid = !0,
    k.prototype._attrsAffectingSize = ["radius"],
    t(k),
    u.addGetterSetter(k, "radius", 0, e()),
    u.addGetterSetter(k, "sides", 0, e());
    let Ee = 2 * Math.PI;
    class T extends h {
        _sceneFunc(t) {
            t.beginPath(),
            t.arc(0, 0, this.innerRadius(), 0, Ee, !1),
            t.moveTo(this.outerRadius(), 0),
            t.arc(0, 0, this.outerRadius(), Ee, 0, !0),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.outerRadius()
        }
        getHeight() {
            return 2 * this.outerRadius()
        }
        setWidth(t) {
            this.outerRadius(t / 2)
        }
        setHeight(t) {
            this.outerRadius(t / 2)
        }
    }
    T.prototype.className = "Ring",
    T.prototype._centroid = !0,
    T.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    t(T),
    u.addGetterSetter(T, "innerRadius", 0, e()),
    u.addGetterSetter(T, "outerRadius", 0, e());
    class M extends h {
        constructor(t) {
            super(t),
            this._updated = !0,
            this.anim = new _( () => {
                var t = this._updated;
                return this._updated = !1,
                t
            }
            ),
            this.on("animationChange.konva", function() {
                this.frameIndex(0)
            }),
            this.on("frameIndexChange.konva", function() {
                this._updated = !0
            }),
            this.on("frameRateChange.konva", function() {
                this.anim.isRunning() && (clearInterval(this.interval),
                this._setInterval())
            })
        }
        _sceneFunc(i) {
            let r = this.animation()
              , a = this.frameIndex()
              , t = 4 * a
              , e = this.animations()[r]
              , n = this.frameOffsets()
              , s = e[t + 0]
              , o = e[t + 1]
              , h = e[t + 2]
              , l = e[t + 3]
              , d = this.image();
            if ((this.hasFill() || this.hasStroke()) && (i.beginPath(),
            i.rect(0, 0, h, l),
            i.closePath(),
            i.fillStrokeShape(this)),
            d)
                if (n) {
                    let t = n[r]
                      , e = 2 * a;
                    i.drawImage(d, s, o, h, l, t[0 + e], t[1 + e], h, l)
                } else
                    i.drawImage(d, s, o, h, l, 0, 0, h, l)
        }
        _hitFunc(i) {
            let r = this.animation()
              , a = this.frameIndex()
              , t = 4 * a
              , e = this.animations()[r]
              , n = this.frameOffsets()
              , s = e[t + 2]
              , o = e[t + 3];
            if (i.beginPath(),
            n) {
                let t = n[r]
                  , e = 2 * a;
                i.rect(t[0 + e], t[1 + e], s, o)
            } else
                i.rect(0, 0, s, o);
            i.closePath(),
            i.fillShape(this)
        }
        _useBufferCanvas() {
            return super._useBufferCanvas(!0)
        }
        _setInterval() {
            let t = this;
            this.interval = setInterval(function() {
                t._updateIndex()
            }, 1e3 / this.frameRate())
        }
        start() {
            var t;
            this.isRunning() || (t = this.getLayer(),
            this.anim.setLayers(t),
            this._setInterval(),
            this.anim.start())
        }
        stop() {
            this.anim.stop(),
            clearInterval(this.interval)
        }
        isRunning() {
            return this.anim.isRunning()
        }
        _updateIndex() {
            var t = this.frameIndex()
              , e = this.animation();
            t < this.animations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0)
        }
    }
    M.prototype.className = "Sprite",
    t(M),
    u.addGetterSetter(M, "animation"),
    u.addGetterSetter(M, "animations"),
    u.addGetterSetter(M, "frameOffsets"),
    u.addGetterSetter(M, "image"),
    u.addGetterSetter(M, "frameIndex", 0, e()),
    u.addGetterSetter(M, "frameRate", 17, e()),
    u.backCompat(M, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex"
    });
    class G extends h {
        _sceneFunc(e) {
            var i = this.innerRadius()
              , r = this.outerRadius()
              , a = this.numPoints();
            e.beginPath(),
            e.moveTo(0, 0 - r);
            for (let t = 1; t < 2 * a; t++) {
                var n = t % 2 == 0 ? r : i
                  , s = n * Math.sin(t * Math.PI / a)
                  , n = -1 * n * Math.cos(t * Math.PI / a);
                e.lineTo(s, n)
            }
            e.closePath(),
            e.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.outerRadius()
        }
        getHeight() {
            return 2 * this.outerRadius()
        }
        setWidth(t) {
            this.outerRadius(t / 2)
        }
        setHeight(t) {
            this.outerRadius(t / 2)
        }
    }
    function De(t) {
        return [...t].reduce( (t, e, i, r) => (/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?(?:\u200D\p{Emoji_Presentation})+/u.test(e) ? t.push(e) : /\p{Regional_Indicator}{2}/u.test(e + (r[i + 1] || "")) ? t.push(e + r[i + 1]) : 0 < i && /\p{Mn}|\p{Me}|\p{Mc}/u.test(e) ? t[t.length - 1] += e : t.push(e),
        t), [])
    }
    G.prototype.className = "Star",
    G.prototype._centroid = !0,
    G.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"],
    t(G),
    u.addGetterSetter(G, "numPoints", 5, e()),
    u.addGetterSetter(G, "innerRadius", 0, e()),
    u.addGetterSetter(G, "outerRadius", 0, e());
    let Le = "auto", Ie = "inherit", Oe = "justify", Fe = ["direction", "fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"], Be = Fe.length, Ne;
    function He() {
        return Ne || (Ne = N.createCanvasElement().getContext("2d"))
    }
    class R extends h {
        constructor(t) {
            super(((t = (t = t) || {}).fillLinearGradientColorStops || t.fillRadialGradientColorStops || t.fillPatternImage || (t.fill = t.fill || "black"),
            t)),
            this._partialTextX = 0;
            for (let t = this._partialTextY = 0; t < Be; t++)
                this.on(Fe[t] + "Change.konva", this._setTextData);
            this._setTextData()
        }
        _sceneFunc(m) {
            let _ = this.textArr
              , v = _.length;
            if (this.text()) {
                let t, r = this.padding(), a = this.fontSize(), e = this.lineHeight() * a, i = this.verticalAlign(), n = this.direction(), s = 0, o = this.align(), h = this.getWidth(), l = this.letterSpacing(), d = this.fill(), c = this.textDecoration(), g = -1 !== c.indexOf("underline"), u = -1 !== c.indexOf("line-through"), f = (n = n === Ie ? m.direction : n,
                e / 2), p = "middle";
                if (A._fixTextRendering) {
                    let t = this.measureSize("M");
                    p = "alphabetic",
                    f = (t.fontBoundingBoxAscent - t.fontBoundingBoxDescent) / 2 + e / 2
                }
                var y = 0;
                for ("rtl" === n && m.setAttr("direction", n),
                m.setAttr("font", this._getContextFont()),
                m.setAttr("textBaseline", p),
                m.setAttr("textAlign", "left"),
                "middle" === i ? s = (this.getHeight() - v * e - 2 * r) / 2 : "bottom" === i && (s = this.getHeight() - v * e - 2 * r),
                m.translate(r, s + r),
                t = 0; t < v; t++) {
                    var x, b, S, y = 0, w = _[t], C = w.text, P = w.width, k = w.lastInParagraph;
                    if (m.save(),
                    "right" === o ? y += h - P - 2 * r : "center" === o && (y += (h - P - 2 * r) / 2),
                    g) {
                        m.save(),
                        m.beginPath();
                        let t = y
                          , e = f + 0 + (A._fixTextRendering ? Math.round(a / 4) : Math.round(a / 2))
                          , i = (m.moveTo(t, e),
                        b = 0 == (x = C.split(" ").length - 1),
                        S = o !== Oe || k ? P : h - 2 * r,
                        m.lineTo(t + Math.round(S), e),
                        m.lineWidth = a / 15,
                        this._getLinearGradient());
                        m.strokeStyle = i || d,
                        m.stroke(),
                        m.restore()
                    }
                    if (u) {
                        m.save(),
                        m.beginPath();
                        let t = A._fixTextRendering ? -Math.round(a / 4) : 0
                          , e = (m.moveTo(y, f + 0 + t),
                        b = 0 == (x = C.split(" ").length - 1),
                        S = o === Oe && k && !b ? h - 2 * r : P,
                        m.lineTo(y + Math.round(S), f + 0 + t),
                        m.lineWidth = a / 15,
                        this._getLinearGradient());
                        m.strokeStyle = e || d,
                        m.stroke(),
                        m.restore()
                    }
                    if ("rtl" === n || 0 === l && o !== Oe)
                        0 !== l && m.setAttr("letterSpacing", l + "px"),
                        this._partialTextX = y,
                        this._partialTextY = f + 0,
                        this._partialText = C,
                        m.fillStrokeShape(this);
                    else {
                        x = C.split(" ").length - 1;
                        let i = De(C);
                        for (let e = 0; e < i.length; e++) {
                            let t = i[e];
                            " " !== t || k || o !== Oe || (y += (h - 2 * r - P) / x),
                            this._partialTextX = y,
                            this._partialTextY = f + 0,
                            this._partialText = t,
                            m.fillStrokeShape(this),
                            y += this.measureSize(t).width + l
                        }
                    }
                    m.restore(),
                    1 < v && (f += e)
                }
            }
        }
        _hitFunc(t) {
            var e = this.getWidth()
              , i = this.getHeight();
            t.beginPath(),
            t.rect(0, 0, e, i),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        setText(t) {
            t = N._isString(t) ? t : null == t ? "" : t + "";
            return this._setAttr("text", t),
            this
        }
        getWidth() {
            return this.attrs.width === Le || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.padding() : this.attrs.width
        }
        getHeight() {
            return this.attrs.height === Le || void 0 === this.attrs.height ? this.fontSize() * this.textArr.length * this.lineHeight() + 2 * this.padding() : this.attrs.height
        }
        getTextWidth() {
            return this.textWidth
        }
        getTextHeight() {
            return N.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),
            this.textHeight
        }
        measureSize(t) {
            var e, i = He(), r = this.fontSize(), i = (i.save(),
            i.font = this._getContextFont(),
            t = i.measureText(t),
            i.restore(),
            r / 100);
            return {
                actualBoundingBoxAscent: null != (e = t.actualBoundingBoxAscent) ? e : 71.58203125 * i,
                actualBoundingBoxDescent: null != (e = t.actualBoundingBoxDescent) ? e : 0,
                actualBoundingBoxLeft: null != (e = t.actualBoundingBoxLeft) ? e : -7.421875 * i,
                actualBoundingBoxRight: null != (e = t.actualBoundingBoxRight) ? e : 75.732421875 * i,
                alphabeticBaseline: null != (e = t.alphabeticBaseline) ? e : 0,
                emHeightAscent: null != (e = t.emHeightAscent) ? e : 100 * i,
                emHeightDescent: null != (e = t.emHeightDescent) ? e : -20 * i,
                fontBoundingBoxAscent: null != (e = t.fontBoundingBoxAscent) ? e : 91 * i,
                fontBoundingBoxDescent: null != (e = t.fontBoundingBoxDescent) ? e : 21 * i,
                hangingBaseline: null != (e = t.hangingBaseline) ? e : 72.80000305175781 * i,
                ideographicBaseline: null != (e = t.ideographicBaseline) ? e : -21 * i,
                width: t.width,
                height: r
            }
        }
        _getContextFont() {
            return this.fontStyle() + " " + this.fontVariant() + " " + this.fontSize() + "px " + this.fontFamily().split(",").map(t => {
                var e = 0 <= (t = t.trim()).indexOf(" ")
                  , i = 0 <= t.indexOf('"') || 0 <= t.indexOf("'");
                return t = e && !i ? `"${t}"` : t
            }
            ).join(", ")
        }
        _addTextLine(t) {
            this.align() === Oe && (t = t.trim());
            var e = this._getTextWidth(t);
            return this.textArr.push({
                text: t,
                width: e,
                lastInParagraph: !1
            })
        }
        _getTextWidth(t) {
            var e = this.letterSpacing()
              , i = t.length;
            return He().measureText(t).width + (i ? e * (i - 1) : 0)
        }
        _setTextData() {
            let r = this.text().split("\n")
              , t = +this.fontSize()
              , h = 0
              , l = this.lineHeight() * t
              , e = this.attrs.width
              , i = this.attrs.height
              , a = e !== Le && void 0 !== e
              , n = i !== Le && void 0 !== i
              , s = this.padding()
              , d = e - 2 * s
              , c = i - 2 * s
              , g = 0
              , o = this.wrap()
              , u = "char" !== o && "none" !== o
              , f = this.ellipsis();
            this.textArr = [],
            He().font = this._getContextFont();
            var p = f ? this._getTextWidth("…") : 0;
            for (let e = 0, i = r.length; e < i; ++e) {
                let o = r[e]
                  , t = this._getTextWidth(o);
                if (a && t > d)
                    for (; 0 < o.length; ) {
                        let r = 0
                          , a = o.length
                          , n = ""
                          , s = 0;
                        for (; r < a; ) {
                            let t = r + a >>> 1
                              , e = o.slice(0, 1 + t)
                              , i = this._getTextWidth(e) + p;
                            i <= d ? (r = 1 + t,
                            n = e,
                            s = i) : a = t
                        }
                        if (!n)
                            break;
                        if (u) {
                            let t, e = o[n.length];
                            0 < (t = (" " === e || "-" === e) && s <= d ? n.length : Math.max(n.lastIndexOf(" "), n.lastIndexOf("-")) + 1) && (r = t,
                            n = n.slice(0, r),
                            s = this._getTextWidth(n))
                        }
                        if (n = n.trimRight(),
                        this._addTextLine(n),
                        h = Math.max(h, s),
                        g += l,
                        this._shouldHandleEllipsis(g)) {
                            this._tryToAddEllipsisToLastLine();
                            break
                        }
                        if (0 < (o = (o = o.slice(r)).trimLeft()).length && (t = this._getTextWidth(o)) <= d) {
                            this._addTextLine(o),
                            g += l,
                            h = Math.max(h, t);
                            break
                        }
                    }
                else
                    this._addTextLine(o),
                    g += l,
                    h = Math.max(h, t),
                    this._shouldHandleEllipsis(g) && e < i - 1 && this._tryToAddEllipsisToLastLine();
                if (this.textArr[this.textArr.length - 1] && (this.textArr[this.textArr.length - 1].lastInParagraph = !0),
                n && g + l > c)
                    break
            }
            this.textHeight = t,
            this.textWidth = h
        }
        _shouldHandleEllipsis(t) {
            var e = +this.fontSize()
              , e = this.lineHeight() * e
              , i = this.attrs.height
              , r = i !== Le && void 0 !== i
              , i = i - 2 * this.padding();
            return !("none" !== this.wrap()) || r && i < t + e
        }
        _tryToAddEllipsisToLastLine() {
            var t = this.attrs.width
              , e = t !== Le && void 0 !== t
              , t = t - 2 * this.padding()
              , i = this.ellipsis()
              , r = this.textArr[this.textArr.length - 1];
            r && i && (!e || this._getTextWidth(r.text + "…") < t || (r.text = r.text.slice(0, r.text.length - 3)),
            this.textArr.splice(this.textArr.length - 1, 1),
            this._addTextLine(r.text + "…"))
        }
        getStrokeScaleEnabled() {
            return !0
        }
        _useBufferCanvas() {
            var t = -1 !== this.textDecoration().indexOf("underline") || -1 !== this.textDecoration().indexOf("line-through")
              , e = this.hasShadow();
            return !(!t || !e) || super._useBufferCanvas()
        }
    }
    R.prototype._fillFunc = function(t) {
        t.fillText(this._partialText, this._partialTextX, this._partialTextY)
    }
    ,
    R.prototype._strokeFunc = function(t) {
        t.setAttr("miterLimit", 2),
        t.strokeText(this._partialText, this._partialTextX, this._partialTextY)
    }
    ,
    R.prototype.className = "Text",
    R.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight", "letterSpacing"],
    t(R),
    u.overWriteSetter(R, "width", U()),
    u.overWriteSetter(R, "height", U()),
    u.addGetterSetter(R, "direction", Ie),
    u.addGetterSetter(R, "fontFamily", "Arial"),
    u.addGetterSetter(R, "fontSize", 12, e()),
    u.addGetterSetter(R, "fontStyle", "normal"),
    u.addGetterSetter(R, "fontVariant", "normal"),
    u.addGetterSetter(R, "padding", 0, e()),
    u.addGetterSetter(R, "align", "left"),
    u.addGetterSetter(R, "verticalAlign", "top"),
    u.addGetterSetter(R, "lineHeight", 1, e()),
    u.addGetterSetter(R, "wrap", "word"),
    u.addGetterSetter(R, "ellipsis", !1, r()),
    u.addGetterSetter(R, "letterSpacing", 0, e()),
    u.addGetterSetter(R, "text", "", i()),
    u.addGetterSetter(R, "textDecoration", "");
    function We(t) {
        t.fillText(this.partialText, 0, 0)
    }
    function ze(t) {
        t.strokeText(this.partialText, 0, 0)
    }
    class E extends h {
        constructor(t) {
            super(t),
            this.dummyCanvas = N.createCanvasElement(),
            this.dataArray = [],
            this._readDataAttribute(),
            this.on("dataChange.konva", function() {
                this._readDataAttribute(),
                this._setTextData()
            }),
            this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData),
            this._setTextData()
        }
        _getTextPathLength() {
            return b.getPathLength(this.dataArray)
        }
        _getPointAtLength(t) {
            return !this.attrs.data || t - 1 > this.pathLength ? null : b.getPointAtLengthOfDataArray(t, this.dataArray)
        }
        _readDataAttribute() {
            this.dataArray = b.parsePathData(this.attrs.data),
            this.pathLength = this._getTextPathLength()
        }
        _sceneFunc(e) {
            e.setAttr("font", this._getContextFont()),
            e.setAttr("textBaseline", this.textBaseline()),
            e.setAttr("textAlign", "left"),
            e.save();
            var i = this.textDecoration()
              , t = this.fill()
              , r = this.fontSize()
              , a = this.glyphInfo;
            "underline" === i && e.beginPath();
            for (let t = 0; t < a.length; t++) {
                e.save();
                var n = a[t].p0;
                e.translate(n.x, n.y),
                e.rotate(a[t].rotation),
                this.partialText = a[t].text,
                e.fillStrokeShape(this),
                "underline" === i && (0 === t && e.moveTo(0, r / 2 + 1),
                e.lineTo(r, r / 2 + 1)),
                e.restore()
            }
            "underline" === i && (e.strokeStyle = t,
            e.lineWidth = r / 20,
            e.stroke()),
            e.restore()
        }
        _hitFunc(e) {
            e.beginPath();
            var t, i = this.glyphInfo;
            1 <= i.length && (t = i[0].p0,
            e.moveTo(t.x, t.y));
            for (let t = 0; t < i.length; t++) {
                var r = i[t].p1;
                e.lineTo(r.x, r.y)
            }
            e.setAttr("lineWidth", this.fontSize()),
            e.setAttr("strokeStyle", this.colorKey),
            e.stroke()
        }
        getTextWidth() {
            return this.textWidth
        }
        getTextHeight() {
            return N.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."),
            this.textHeight
        }
        setText(t) {
            return R.prototype.setText.call(this, t)
        }
        _getContextFont() {
            return R.prototype._getContextFont.call(this)
        }
        _getTextSize(t) {
            var e = this.dummyCanvas.getContext("2d")
              , t = (e.save(),
            e.font = this._getContextFont(),
            e.measureText(t));
            return e.restore(),
            {
                width: t.width,
                height: parseInt("" + this.fontSize(), 10)
            }
        }
        _setTextData() {
            let {width: a, height: t} = this._getTextSize(this.attrs.text);
            if (this.textWidth = a,
            this.textHeight = t,
            this.glyphInfo = [],
            !this.attrs.data)
                return null;
            var n = this.letterSpacing()
              , s = this.align()
              , o = this.kerningFunc()
              , h = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * n, 0);
            let e = 0;
            "center" === s && (e = Math.max(0, this.pathLength / 2 - h / 2)),
            "right" === s && (e = Math.max(0, this.pathLength - h));
            var l = De(this.text());
            let d = e;
            for (let r = 0; r < l.length; r++) {
                let t = this._getPointAtLength(d);
                if (!t)
                    return;
                let e = this._getTextSize(l[r]).width + n;
                if (" " === l[r] && "justify" === s) {
                    let t = this.text().split(" ").length - 1;
                    e += (this.pathLength - h) / t
                }
                var c = this._getPointAtLength(d + e);
                if (!c)
                    return;
                var g = b.getLineLength(t.x, t.y, c.x, c.y);
                let i = 0;
                if (o)
                    try {
                        i = o(l[r - 1], l[r]) * this.fontSize()
                    } catch (a) {
                        i = 0
                    }
                t.x += i,
                c.x += i,
                this.textWidth += i;
                var g = b.getPointOnLine(i + g / 2, t.x, t.y, c.x, c.y)
                  , u = Math.atan2(c.y - t.y, c.x - t.x);
                this.glyphInfo.push({
                    transposeX: g.x,
                    transposeY: g.y,
                    text: l[r],
                    rotation: u,
                    p0: t,
                    p1: c
                }),
                d += e
            }
        }
        getSelfRect() {
            if (!this.glyphInfo.length)
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
            let e = [];
            this.glyphInfo.forEach(function(t) {
                e.push(t.p0.x),
                e.push(t.p0.y),
                e.push(t.p1.x),
                e.push(t.p1.y)
            });
            let i, r, a = e[0] || 0, n = e[0] || 0, s = e[1] || 0, o = e[1] || 0;
            for (let t = 0; t < e.length / 2; t++)
                i = e[2 * t],
                r = e[2 * t + 1],
                a = Math.min(a, i),
                n = Math.max(n, i),
                s = Math.min(s, r),
                o = Math.max(o, r);
            var t = this.fontSize();
            return {
                x: a - t / 2,
                y: s - t / 2,
                width: n - a + t,
                height: o - s + t
            }
        }
        destroy() {
            return N.releaseCanvas(this.dummyCanvas),
            super.destroy()
        }
    }
    E.prototype._fillFunc = We,
    E.prototype._strokeFunc = ze,
    E.prototype._fillFuncHit = We,
    E.prototype._strokeFuncHit = ze,
    E.prototype.className = "TextPath",
    E.prototype._attrsAffectingSize = ["text", "fontSize", "data"],
    t(E),
    u.addGetterSetter(E, "data"),
    u.addGetterSetter(E, "fontFamily", "Arial"),
    u.addGetterSetter(E, "fontSize", 12, e()),
    u.addGetterSetter(E, "fontStyle", "normal"),
    u.addGetterSetter(E, "align", "left"),
    u.addGetterSetter(E, "letterSpacing", 0, e()),
    u.addGetterSetter(E, "textBaseline", "middle"),
    u.addGetterSetter(E, "fontVariant", "normal"),
    u.addGetterSetter(E, "text", ""),
    u.addGetterSetter(E, "textDecoration", null),
    u.addGetterSetter(E, "kerningFunc", null);
    let Ye = "tr-konva"
      , Xe = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange", "anchorStyleFuncChange"].map(t => t + ("." + Ye)).join(" ")
      , je = "nodesRect"
      , qe = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"]
      , Ue = {
        "top-left": -45,
        "top-center": 0,
        "top-right": 45,
        "middle-right": -90,
        "middle-left": 90,
        "bottom-left": -135,
        "bottom-center": 180,
        "bottom-right": 135
    }
      , Ve = "ontouchstart"in A._global
      , Ke = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];
    function Qe(t, e, i) {
        var r = i.x + (t.x - i.x) * Math.cos(e) - (t.y - i.y) * Math.sin(e)
          , i = i.y + (t.x - i.x) * Math.sin(e) + (t.y - i.y) * Math.cos(e);
        return {
            ...t,
            rotation: t.rotation + e,
            x: r,
            y: i
        }
    }
    let Je = 0;
    class D extends oe {
        constructor(t) {
            super(t),
            this._movingAnchorName = null,
            this._transforming = !1,
            this._createElements(),
            this._handleMouseMove = this._handleMouseMove.bind(this),
            this._handleMouseUp = this._handleMouseUp.bind(this),
            this.update = this.update.bind(this),
            this.on(Xe, this.update),
            this.getNode() && this.update()
        }
        attachTo(t) {
            return this.setNode(t),
            this
        }
        setNode(t) {
            return N.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."),
            this.setNodes([t])
        }
        getNode() {
            return this._nodes && this._nodes[0]
        }
        _getEventNamespace() {
            return Ye + this._id
        }
        setNodes(t=[]) {
            this._nodes && this._nodes.length && this.detach();
            var e = t.filter(t => !t.isAncestorOf(this) || (N.error("Konva.Transformer cannot be an a child of the node you are trying to attach"),
            !1));
            return this._nodes = t = e,
            1 === t.length && this.useSingleNodeRotation() ? this.rotation(t[0].getAbsoluteRotation()) : this.rotation(0),
            this._nodes.forEach(t => {
                var e = () => {
                    1 === this.nodes().length && this.useSingleNodeRotation() && this.rotation(this.nodes()[0].getAbsoluteRotation()),
                    this._resetTransformCache(),
                    this._transforming || this.isDragging() || this.update()
                }
                  , i = t._attrsAffectingSize.map(t => t + "Change." + this._getEventNamespace()).join(" ");
                t.on(i, e),
                t.on(qe.map(t => t + ("." + this._getEventNamespace())).join(" "), e),
                t.on("absoluteTransformChange." + this._getEventNamespace(), e),
                this._proxyDrag(t)
            }
            ),
            this._resetTransformCache(),
            this.findOne(".top-left") && this.update(),
            this
        }
        _proxyDrag(n) {
            let e;
            n.on("dragstart." + this._getEventNamespace(), t => {
                e = n.getAbsolutePosition(),
                this.isDragging() || n === this.findOne(".back") || this.startDrag(t, !1)
            }
            ),
            n.on("dragmove." + this._getEventNamespace(), a => {
                if (e) {
                    let t = n.getAbsolutePosition()
                      , i = t.x - e.x
                      , r = t.y - e.y;
                    this.nodes().forEach(t => {
                        var e;
                        t === n || t.isDragging() || (e = t.getAbsolutePosition(),
                        t.setAbsolutePosition({
                            x: e.x + i,
                            y: e.y + r
                        }),
                        t.startDrag(a))
                    }
                    ),
                    e = null
                }
            }
            )
        }
        getNodes() {
            return this._nodes || []
        }
        getActiveAnchor() {
            return this._movingAnchorName
        }
        detach() {
            this._nodes && this._nodes.forEach(t => {
                t.off("." + this._getEventNamespace())
            }
            ),
            this._nodes = [],
            this._resetTransformCache()
        }
        _resetTransformCache() {
            this._clearCache(je),
            this._clearCache("transform"),
            this._clearSelfAndDescendantCache("absoluteTransform")
        }
        _getNodeRect() {
            return this._getCache(je, this.__getNodeRect)
        }
        __getNodeShape(t, e=this.rotation(), i) {
            var r = t.getClientRect({
                skipTransform: !0,
                skipShadow: !0,
                skipStroke: this.ignoreStroke()
            })
              , a = t.getAbsoluteScale(i)
              , i = t.getAbsolutePosition(i)
              , n = r.x * a.x - t.offsetX() * a.x
              , s = r.y * a.y - t.offsetY() * a.y
              , t = (A.getAngle(t.getAbsoluteRotation()) + 2 * Math.PI) % (2 * Math.PI);
            return Qe({
                x: i.x + n * Math.cos(t) + s * Math.sin(-t),
                y: i.y + s * Math.cos(t) + n * Math.sin(t),
                width: r.width * a.x,
                height: r.height * a.y,
                rotation: t
            }, -A.getAngle(e), {
                x: 0,
                y: 0
            })
        }
        __getNodeRect() {
            if (!this.getNode())
                return {
                    x: -1e8,
                    y: -1e8,
                    width: 0,
                    height: 0,
                    rotation: 0
                };
            let a = []
              , e = (this.nodes().map(t => {
                let e = t.getClientRect({
                    skipTransform: !0,
                    skipShadow: !0,
                    skipStroke: this.ignoreStroke()
                })
                  , i = [{
                    x: e.x,
                    y: e.y
                }, {
                    x: e.x + e.width,
                    y: e.y
                }, {
                    x: e.x + e.width,
                    y: e.y + e.height
                }, {
                    x: e.x,
                    y: e.y + e.height
                }]
                  , r = t.getAbsoluteTransform();
                i.forEach(function(t) {
                    t = r.point(t);
                    a.push(t)
                })
            }
            ),
            new d)
              , i = (e.rotate(-A.getAngle(this.rotation())),
            1 / 0)
              , r = 1 / 0
              , n = -1 / 0
              , s = -1 / 0;
            a.forEach(function(t) {
                t = e.point(t);
                void 0 === i && (i = n = t.x,
                r = s = t.y),
                i = Math.min(i, t.x),
                r = Math.min(r, t.y),
                n = Math.max(n, t.x),
                s = Math.max(s, t.y)
            }),
            e.invert();
            var t = e.point({
                x: i,
                y: r
            });
            return {
                x: t.x,
                y: t.y,
                width: n - i,
                height: s - r,
                rotation: A.getAngle(this.rotation())
            }
        }
        getX() {
            return this._getNodeRect().x
        }
        getY() {
            return this._getNodeRect().y
        }
        getWidth() {
            return this._getNodeRect().width
        }
        getHeight() {
            return this._getNodeRect().height
        }
        _createElements() {
            this._createBack(),
            Ke.forEach(t => {
                this._createAnchor(t)
            }
            ),
            this._createAnchor("rotater")
        }
        _createAnchor(r) {
            let a = new Re({
                stroke: "rgb(0, 161, 255)",
                fill: "white",
                strokeWidth: 1,
                name: r + " _anchor",
                dragDistance: 0,
                draggable: !0,
                hitStrokeWidth: Ve ? 10 : "auto"
            })
              , e = this;
            a.on("mousedown touchstart", function(t) {
                e._handleMouseDown(t)
            }),
            a.on("dragstart", t => {
                a.stopDrag(),
                t.cancelBubble = !0
            }
            ),
            a.on("dragend", t => {
                t.cancelBubble = !0
            }
            ),
            a.on("mouseenter", () => {
                let t = A.getAngle(this.rotation())
                  , i = this.rotateAnchorCursor()
                  , e = ( (t, e) => "rotater" === t ? i : (e += N.degToRad(Ue[t] || 0),
                t = (N.radToDeg(e) % 360 + 360) % 360,
                N._inRange(t, 337.5, 360) || N._inRange(t, 0, 22.5) ? "ns-resize" : N._inRange(t, 22.5, 67.5) ? "nesw-resize" : N._inRange(t, 67.5, 112.5) ? "ew-resize" : N._inRange(t, 112.5, 157.5) ? "nwse-resize" : N._inRange(t, 157.5, 202.5) ? "ns-resize" : N._inRange(t, 202.5, 247.5) ? "nesw-resize" : N._inRange(t, 247.5, 292.5) ? "ew-resize" : N._inRange(t, 292.5, 337.5) ? "nwse-resize" : (N.error("Transformer has unknown angle for cursor detection: " + t),
                "pointer")))(r, t);
                a.getStage().content && (a.getStage().content.style.cursor = e),
                this._cursorChange = !0
            }
            ),
            a.on("mouseout", () => {
                a.getStage().content && (a.getStage().content.style.cursor = ""),
                this._cursorChange = !1
            }
            ),
            this.add(a)
        }
        _createBack() {
            var t = new h({
                name: "back",
                width: 0,
                height: 0,
                draggable: !0,
                sceneFunc(t, e) {
                    var i = e.getParent()
                      , r = i.padding();
                    t.beginPath(),
                    t.rect(-r, -r, e.width() + 2 * r, e.height() + 2 * r),
                    t.moveTo(e.width() / 2, -r),
                    i.rotateEnabled() && i.rotateLineVisible() && t.lineTo(e.width() / 2, -i.rotateAnchorOffset() * N._sign(e.height()) - r),
                    t.fillStrokeShape(e)
                },
                hitFunc: (t, e) => {
                    var i;
                    this.shouldOverdrawWholeArea() && (i = this.padding(),
                    t.beginPath(),
                    t.rect(-i, -i, e.width() + 2 * i, e.height() + 2 * i),
                    t.fillStrokeShape(e))
                }
            });
            this.add(t),
            this._proxyDrag(t),
            t.on("dragstart", t => {
                t.cancelBubble = !0
            }
            ),
            t.on("dragmove", t => {
                t.cancelBubble = !0
            }
            ),
            t.on("dragend", t => {
                t.cancelBubble = !0
            }
            ),
            this.on("dragmove", t => {
                this.update()
            }
            )
        }
        _handleMouseDown(e) {
            var t, i, r;
            this._transforming || (this._movingAnchorName = e.target.name().split(" ")[0],
            r = (i = this._getNodeRect()).width,
            i = i.height,
            t = Math.sqrt(Math.pow(r, 2) + Math.pow(i, 2)),
            this.sin = Math.abs(i / t),
            this.cos = Math.abs(r / t),
            "undefined" != typeof window && (window.addEventListener("mousemove", this._handleMouseMove),
            window.addEventListener("touchmove", this._handleMouseMove),
            window.addEventListener("mouseup", this._handleMouseUp, !0),
            window.addEventListener("touchend", this._handleMouseUp, !0)),
            this._transforming = !0,
            i = e.target.getAbsolutePosition(),
            r = e.target.getStage().getPointerPosition(),
            this._anchorDragOffset = {
                x: r.x - i.x,
                y: r.y - i.y
            },
            Je++,
            this._fire("transformstart", {
                evt: e.evt,
                target: this.getNode()
            }),
            this._nodes.forEach(t => {
                t._fire("transformstart", {
                    evt: e.evt,
                    target: t
                })
            }
            ))
        }
        _handleMouseMove(s) {
            let o, h, t, l = this.findOne("." + this._movingAnchorName), e = l.getStage(), i = (e.setPointersPositions(s),
            e.getPointerPosition()), r = {
                x: i.x - this._anchorDragOffset.x,
                y: i.y - this._anchorDragOffset.y
            }, a = l.getAbsolutePosition(), n = (this.anchorDragBoundFunc() && (r = this.anchorDragBoundFunc()(a, r, s)),
            l.setAbsolutePosition(r),
            l.getAbsolutePosition());
            if (a.x !== n.x || a.y !== n.y)
                if ("rotater" === this._movingAnchorName) {
                    let t = this._getNodeRect()
                      , e = (o = l.x() - t.width / 2,
                    h = -l.y() + t.height / 2,
                    Math.atan2(-h, o) + Math.PI / 2)
                      , i = (t.height < 0 && (e -= Math.PI),
                    A.getAngle(this.rotation()) + e)
                      , r = A.getAngle(this.rotationSnapTolerance())
                      , a = ( (e, i, r) => {
                        let a = i;
                        for (let t = 0; t < e.length; t++) {
                            var n = A.getAngle(e[t])
                              , s = Math.abs(n - i) % (2 * Math.PI);
                            Math.min(s, 2 * Math.PI - s) < r && (a = n)
                        }
                        return a
                    }
                    )(this.rotationSnaps(), i, r)
                      , n = (c = t,
                    g = a - t.rotation,
                    u = {
                        x: (u = c).x + u.width / 2 * Math.cos(u.rotation) + u.height / 2 * Math.sin(-u.rotation),
                        y: u.y + u.height / 2 * Math.cos(u.rotation) + u.width / 2 * Math.sin(u.rotation)
                    },
                    Qe(c, g, u));
                    void this._fitNodesInto(n, s)
                } else {
                    var d, c = this.shiftBehavior(), g = "inverted" === c ? this.keepRatio() && !s.shiftKey : "none" === c ? this.keepRatio() : this.keepRatio() || s.shiftKey, u = this.centeredScaling() || s.altKey;
                    if ("top-left" === this._movingAnchorName ? g && (d = u ? {
                        x: this.width() / 2,
                        y: this.height() / 2
                    } : {
                        x: this.findOne(".bottom-right").x(),
                        y: this.findOne(".bottom-right").y()
                    },
                    t = Math.sqrt(Math.pow(d.x - l.x(), 2) + Math.pow(d.y - l.y(), 2)),
                    p = this.findOne(".top-left").x() > d.x ? -1 : 1,
                    m = this.findOne(".top-left").y() > d.y ? -1 : 1,
                    o = t * this.cos * p,
                    h = t * this.sin * m,
                    this.findOne(".top-left").x(d.x - o),
                    this.findOne(".top-left").y(d.y - h)) : "top-center" === this._movingAnchorName ? this.findOne(".top-left").y(l.y()) : "top-right" === this._movingAnchorName ? (g && (d = u ? {
                        x: this.width() / 2,
                        y: this.height() / 2
                    } : {
                        x: this.findOne(".bottom-left").x(),
                        y: this.findOne(".bottom-left").y()
                    },
                    t = Math.sqrt(Math.pow(l.x() - d.x, 2) + Math.pow(d.y - l.y(), 2)),
                    p = this.findOne(".top-right").x() < d.x ? -1 : 1,
                    m = this.findOne(".top-right").y() > d.y ? -1 : 1,
                    o = t * this.cos * p,
                    h = t * this.sin * m,
                    this.findOne(".top-right").x(d.x + o),
                    this.findOne(".top-right").y(d.y - h)),
                    f = l.position(),
                    this.findOne(".top-left").y(f.y),
                    this.findOne(".bottom-right").x(f.x)) : "middle-left" === this._movingAnchorName ? this.findOne(".top-left").x(l.x()) : "middle-right" === this._movingAnchorName ? this.findOne(".bottom-right").x(l.x()) : "bottom-left" === this._movingAnchorName ? (g && (d = u ? {
                        x: this.width() / 2,
                        y: this.height() / 2
                    } : {
                        x: this.findOne(".top-right").x(),
                        y: this.findOne(".top-right").y()
                    },
                    t = Math.sqrt(Math.pow(d.x - l.x(), 2) + Math.pow(l.y() - d.y, 2)),
                    p = d.x < l.x() ? -1 : 1,
                    m = l.y() < d.y ? -1 : 1,
                    o = t * this.cos * p,
                    h = t * this.sin * m,
                    l.x(d.x - o),
                    l.y(d.y + h)),
                    f = l.position(),
                    this.findOne(".top-left").x(f.x),
                    this.findOne(".bottom-right").y(f.y)) : "bottom-center" === this._movingAnchorName ? this.findOne(".bottom-right").y(l.y()) : "bottom-right" === this._movingAnchorName ? g && (d = u ? {
                        x: this.width() / 2,
                        y: this.height() / 2
                    } : {
                        x: this.findOne(".top-left").x(),
                        y: this.findOne(".top-left").y()
                    },
                    t = Math.sqrt(Math.pow(l.x() - d.x, 2) + Math.pow(l.y() - d.y, 2)),
                    p = this.findOne(".bottom-right").x() < d.x ? -1 : 1,
                    m = this.findOne(".bottom-right").y() < d.y ? -1 : 1,
                    o = t * this.cos * p,
                    h = t * this.sin * m,
                    this.findOne(".bottom-right").x(d.x + o),
                    this.findOne(".bottom-right").y(d.y + h)) : console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName)),
                    this.centeredScaling() || s.altKey) {
                        let t = this.findOne(".top-left")
                          , e = this.findOne(".bottom-right")
                          , i = t.x()
                          , r = t.y()
                          , a = this.getWidth() - e.x()
                          , n = this.getHeight() - e.y();
                        e.move({
                            x: -i,
                            y: -r
                        }),
                        t.move({
                            x: a,
                            y: n
                        })
                    }
                    var f = this.findOne(".top-left").getAbsolutePosition()
                      , p = (o = f.x,
                    h = f.y,
                    this.findOne(".bottom-right").x() - this.findOne(".top-left").x())
                      , m = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
                    this._fitNodesInto({
                        x: o,
                        y: h,
                        width: p,
                        height: m,
                        rotation: A.getAngle(this.rotation())
                    }, s)
                }
        }
        _handleMouseUp(t) {
            this._removeEvents(t)
        }
        getAbsoluteTransform() {
            return this.getTransform()
        }
        _removeEvents(e) {
            var t, i;
            this._transforming && (this._transforming = !1,
            "undefined" != typeof window && (window.removeEventListener("mousemove", this._handleMouseMove),
            window.removeEventListener("touchmove", this._handleMouseMove),
            window.removeEventListener("mouseup", this._handleMouseUp, !0),
            window.removeEventListener("touchend", this._handleMouseUp, !0)),
            i = this.getNode(),
            Je--,
            this._fire("transformend", {
                evt: e,
                target: i
            }),
            null != (t = this.getLayer()) && t.batchDraw(),
            i && this._nodes.forEach(t => {
                t._fire("transformend", {
                    evt: e,
                    target: t
                }),
                null != (t = t.getLayer()) && t.batchDraw()
            }
            ),
            this._movingAnchorName = null)
        }
        _fitNodesInto(e, i) {
            var r = this._getNodeRect();
            if (N._inRange(e.width, 2 * -this.padding() - 1, 1))
                this.update();
            else if (N._inRange(e.height, 2 * -this.padding() - 1, 1))
                this.update();
            else {
                var n = new d;
                if (n.rotate(A.getAngle(this.rotation())),
                this._movingAnchorName && e.width < 0 && 0 <= this._movingAnchorName.indexOf("left")) {
                    let t = n.point({
                        x: 2 * -this.padding(),
                        y: 0
                    });
                    e.x += t.x,
                    e.y += t.y,
                    e.width += 2 * this.padding(),
                    this._movingAnchorName = this._movingAnchorName.replace("left", "right"),
                    this._anchorDragOffset.x -= t.x,
                    this._anchorDragOffset.y -= t.y
                } else if (this._movingAnchorName && e.width < 0 && 0 <= this._movingAnchorName.indexOf("right")) {
                    let t = n.point({
                        x: 2 * this.padding(),
                        y: 0
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("right", "left"),
                    this._anchorDragOffset.x -= t.x,
                    this._anchorDragOffset.y -= t.y,
                    e.width += 2 * this.padding()
                }
                if (this._movingAnchorName && e.height < 0 && 0 <= this._movingAnchorName.indexOf("top")) {
                    let t = n.point({
                        x: 0,
                        y: 2 * -this.padding()
                    });
                    e.x += t.x,
                    e.y += t.y,
                    this._movingAnchorName = this._movingAnchorName.replace("top", "bottom"),
                    this._anchorDragOffset.x -= t.x,
                    this._anchorDragOffset.y -= t.y,
                    e.height += 2 * this.padding()
                } else if (this._movingAnchorName && e.height < 0 && 0 <= this._movingAnchorName.indexOf("bottom")) {
                    let t = n.point({
                        x: 0,
                        y: 2 * this.padding()
                    });
                    this._movingAnchorName = this._movingAnchorName.replace("bottom", "top"),
                    this._anchorDragOffset.x -= t.x,
                    this._anchorDragOffset.y -= t.y,
                    e.height += 2 * this.padding()
                }
                if (this.boundBoxFunc()) {
                    let t = this.boundBoxFunc()(r, e);
                    t ? e = t : N.warn("boundBoxFunc returned falsy. You should return new bound rect from it!")
                }
                var n = new d
                  , r = (n.translate(r.x, r.y),
                n.rotate(r.rotation),
                n.scale(r.width / 1e7, r.height / 1e7),
                new d)
                  , t = e.width / 1e7
                  , s = e.height / 1e7;
                !1 === this.flipEnabled() ? (r.translate(e.x, e.y),
                r.rotate(e.rotation),
                r.translate(e.width < 0 ? e.width : 0, e.height < 0 ? e.height : 0),
                r.scale(Math.abs(t), Math.abs(s))) : (r.translate(e.x, e.y),
                r.rotate(e.rotation),
                r.scale(t, s));
                let a = r.multiply(n.invert());
                this._nodes.forEach(t => {
                    var e = t.getParent().getAbsoluteTransform()
                      , i = t.getTransform().copy()
                      , r = (i.translate(t.offsetX(), t.offsetY()),
                    new d)
                      , e = (r.multiply(e.copy().invert()).multiply(a).multiply(e).multiply(i),
                    r.decompose());
                    t.setAttrs(e),
                    null != (i = t.getLayer()) && i.batchDraw()
                }
                ),
                this.rotation(N._getRotation(e.rotation)),
                this._nodes.forEach(t => {
                    this._fire("transform", {
                        evt: i,
                        target: t
                    }),
                    t._fire("transform", {
                        evt: i,
                        target: t
                    })
                }
                ),
                this._resetTransformCache(),
                this.update(),
                this.getLayer().batchDraw()
            }
        }
        forceUpdate() {
            this._resetTransformCache(),
            this.update()
        }
        _batchChangeChild(t, e) {
            this.findOne(t).setAttrs(e)
        }
        update() {
            var t = this._getNodeRect();
            this.rotation(N._getRotation(t.rotation));
            let e = t.width
              , i = t.height
              , r = this.enabledAnchors()
              , a = this.resizeEnabled()
              , n = this.padding()
              , s = this.anchorSize()
              , o = this.find("._anchor")
              , h = (o.forEach(t => {
                t.setAttrs({
                    width: s,
                    height: s,
                    offsetX: s / 2,
                    offsetY: s / 2,
                    stroke: this.anchorStroke(),
                    strokeWidth: this.anchorStrokeWidth(),
                    fill: this.anchorFill(),
                    cornerRadius: this.anchorCornerRadius()
                })
            }
            ),
            this._batchChangeChild(".top-left", {
                x: 0,
                y: 0,
                offsetX: s / 2 + n,
                offsetY: s / 2 + n,
                visible: a && 0 <= r.indexOf("top-left")
            }),
            this._batchChangeChild(".top-center", {
                x: e / 2,
                y: 0,
                offsetY: s / 2 + n,
                visible: a && 0 <= r.indexOf("top-center")
            }),
            this._batchChangeChild(".top-right", {
                x: e,
                y: 0,
                offsetX: s / 2 - n,
                offsetY: s / 2 + n,
                visible: a && 0 <= r.indexOf("top-right")
            }),
            this._batchChangeChild(".middle-left", {
                x: 0,
                y: i / 2,
                offsetX: s / 2 + n,
                visible: a && 0 <= r.indexOf("middle-left")
            }),
            this._batchChangeChild(".middle-right", {
                x: e,
                y: i / 2,
                offsetX: s / 2 - n,
                visible: a && 0 <= r.indexOf("middle-right")
            }),
            this._batchChangeChild(".bottom-left", {
                x: 0,
                y: i,
                offsetX: s / 2 + n,
                offsetY: s / 2 - n,
                visible: a && 0 <= r.indexOf("bottom-left")
            }),
            this._batchChangeChild(".bottom-center", {
                x: e / 2,
                y: i,
                offsetY: s / 2 - n,
                visible: a && 0 <= r.indexOf("bottom-center")
            }),
            this._batchChangeChild(".bottom-right", {
                x: e,
                y: i,
                offsetX: s / 2 - n,
                offsetY: s / 2 - n,
                visible: a && 0 <= r.indexOf("bottom-right")
            }),
            this._batchChangeChild(".rotater", {
                x: e / 2,
                y: -this.rotateAnchorOffset() * N._sign(i) - n,
                visible: this.rotateEnabled()
            }),
            this._batchChangeChild(".back", {
                width: e,
                height: i,
                visible: this.borderEnabled(),
                stroke: this.borderStroke(),
                strokeWidth: this.borderStrokeWidth(),
                dash: this.borderDash(),
                x: 0,
                y: 0
            }),
            this.anchorStyleFunc());
            h && o.forEach(t => {
                h(t)
            }
            ),
            null != (t = this.getLayer()) && t.batchDraw()
        }
        isTransforming() {
            return this._transforming
        }
        stopTransform() {
            var t;
            this._transforming && (this._removeEvents(),
            t = this.findOne("." + this._movingAnchorName)) && t.stopDrag()
        }
        destroy() {
            return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""),
            oe.prototype.destroy.call(this),
            this.detach(),
            this._removeEvents(),
            this
        }
        toObject() {
            return o.prototype.toObject.call(this)
        }
        clone(t) {
            return o.prototype.clone.call(this, t)
        }
        getClientRect() {
            return 0 < this.nodes().length ? super.getClientRect() : {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
    }
    D.isTransforming = () => 0 < Je,
    D.prototype.className = "Transformer",
    t(D),
    u.addGetterSetter(D, "enabledAnchors", Ke, function(t) {
        return t instanceof Array || N.warn("enabledAnchors value should be an array"),
        t instanceof Array && t.forEach(function(t) {
            -1 === Ke.indexOf(t) && N.warn("Unknown anchor name: " + t + ". Available names are: " + Ke.join(", "))
        }),
        t || []
    }),
    u.addGetterSetter(D, "flipEnabled", !0, r()),
    u.addGetterSetter(D, "resizeEnabled", !0),
    u.addGetterSetter(D, "anchorSize", 10, e()),
    u.addGetterSetter(D, "rotateEnabled", !0),
    u.addGetterSetter(D, "rotateLineVisible", !0),
    u.addGetterSetter(D, "rotationSnaps", []),
    u.addGetterSetter(D, "rotateAnchorOffset", 50, e()),
    u.addGetterSetter(D, "rotateAnchorCursor", "crosshair"),
    u.addGetterSetter(D, "rotationSnapTolerance", 5, e()),
    u.addGetterSetter(D, "borderEnabled", !0),
    u.addGetterSetter(D, "anchorStroke", "rgb(0, 161, 255)"),
    u.addGetterSetter(D, "anchorStrokeWidth", 1, e()),
    u.addGetterSetter(D, "anchorFill", "white"),
    u.addGetterSetter(D, "anchorCornerRadius", 0, e()),
    u.addGetterSetter(D, "borderStroke", "rgb(0, 161, 255)"),
    u.addGetterSetter(D, "borderStrokeWidth", 1, e()),
    u.addGetterSetter(D, "borderDash"),
    u.addGetterSetter(D, "keepRatio", !0),
    u.addGetterSetter(D, "shiftBehavior", "default"),
    u.addGetterSetter(D, "centeredScaling", !1),
    u.addGetterSetter(D, "ignoreStroke", !1),
    u.addGetterSetter(D, "padding", 0, e()),
    u.addGetterSetter(D, "node"),
    u.addGetterSetter(D, "nodes"),
    u.addGetterSetter(D, "boundBoxFunc"),
    u.addGetterSetter(D, "anchorDragBoundFunc"),
    u.addGetterSetter(D, "anchorStyleFunc"),
    u.addGetterSetter(D, "shouldOverdrawWholeArea", !1),
    u.addGetterSetter(D, "useSingleNodeRotation", !0),
    u.backCompat(D, {
        lineEnabled: "borderEnabled",
        rotateHandlerOffset: "rotateAnchorOffset",
        enabledHandlers: "enabledAnchors"
    });
    class L extends h {
        _sceneFunc(t) {
            t.beginPath(),
            t.arc(0, 0, this.radius(), 0, A.getAngle(this.angle()), this.clockwise()),
            t.lineTo(0, 0),
            t.closePath(),
            t.fillStrokeShape(this)
        }
        getWidth() {
            return 2 * this.radius()
        }
        getHeight() {
            return 2 * this.radius()
        }
        setWidth(t) {
            this.radius(t / 2)
        }
        setHeight(t) {
            this.radius(t / 2)
        }
    }
    function Ze() {
        this.r = 0,
        this.g = 0,
        this.b = 0,
        this.a = 0,
        this.next = null
    }
    L.prototype.className = "Wedge",
    L.prototype._centroid = !0,
    L.prototype._attrsAffectingSize = ["radius"],
    t(L),
    u.addGetterSetter(L, "radius", 0, e()),
    u.addGetterSetter(L, "angle", 0, e()),
    u.addGetterSetter(L, "clockwise", !1),
    u.backCompat(L, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle"
    });
    let $e = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]
      , ti = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    function ei(t, e, i, r, a) {
        i -= e,
        a -= r;
        return 0 == i ? r + a / 2 : 0 == a ? r : a * ((t - e) / i) + r
    }
    function ii(t, e, i) {
        i = 4 * (i * t.width + e),
        e = [];
        return e.push(t.data[i++], t.data[i++], t.data[i++], t.data[+i]),
        e
    }
    function ri(t, e) {
        return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
    }
    return u.addGetterSetter(o, "blurRadius", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "brightness", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "contrast", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "embossStrength", .5, e(), u.afterSetFilter),
    u.addGetterSetter(o, "embossWhiteLevel", .5, e(), u.afterSetFilter),
    u.addGetterSetter(o, "embossDirection", "top-left", null, u.afterSetFilter),
    u.addGetterSetter(o, "embossBlend", !1, null, u.afterSetFilter),
    u.addGetterSetter(o, "enhance", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "hue", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "saturation", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "luminance", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "hue", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "saturation", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "value", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "kaleidoscopePower", 2, e(), u.afterSetFilter),
    u.addGetterSetter(o, "kaleidoscopeAngle", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "threshold", 0, e(), u.afterSetFilter),
    u.addGetterSetter(o, "noise", .2, e(), u.afterSetFilter),
    u.addGetterSetter(o, "pixelSize", 8, e(), u.afterSetFilter),
    u.addGetterSetter(o, "levels", .5, e(), u.afterSetFilter),
    u.addGetterSetter(o, "red", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    u.addGetterSetter(o, "green", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    u.addGetterSetter(o, "blue", 0, j, u.afterSetFilter),
    u.addGetterSetter(o, "red", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    u.addGetterSetter(o, "green", 0, function(t) {
        return this._filterUpToDate = !1,
        255 < t ? 255 : t < 0 ? 0 : Math.round(t)
    }),
    u.addGetterSetter(o, "blue", 0, j, u.afterSetFilter),
    u.addGetterSetter(o, "alpha", 1, function(t) {
        return this._filterUpToDate = !1,
        1 < t ? 1 : t < 0 ? 0 : t
    }),
    u.addGetterSetter(o, "threshold", .5, e(), u.afterSetFilter),
    fe.Util._assign(fe, {
        Arc: y,
        Arrow: S,
        Circle: Ce,
        Ellipse: w,
        Image: C,
        Label: Ge,
        Tag: P,
        Line: x,
        Path: b,
        Rect: Re,
        RegularPolygon: k,
        Ring: T,
        Sprite: M,
        Star: G,
        Text: R,
        TextPath: E,
        Transformer: D,
        Wedge: L,
        Filters: {
            Blur: function(O) {
                var F = Math.round(this.blurRadius());
                if (0 < F) {
                    var B = F
                      , N = O.data
                      , H = O.width
                      , W = O.height;
                    let t, e, i, r, a, n, s, o, h, l, d, c, g, u, f, p, m, _, v, y, x, b, S, w, C = B + B + 1, P = H - 1, k = W - 1, A = B + 1, T = A * (A + 1) / 2, M = new Ze, G = null, R = M, E = null, D = null, L = $e[B], I = ti[B];
                    for (i = 1; i < C; i++)
                        R = R.next = new Ze,
                        i === A && (G = R);
                    for (R.next = M,
                    s = n = 0,
                    e = 0; e < W; e++) {
                        for (p = m = _ = v = o = h = l = d = 0,
                        c = A * (y = N[n]),
                        g = A * (x = N[n + 1]),
                        u = A * (b = N[n + 2]),
                        f = A * (S = N[n + 3]),
                        o += T * y,
                        h += T * x,
                        l += T * b,
                        d += T * S,
                        R = M,
                        i = 0; i < A; i++)
                            R.r = y,
                            R.g = x,
                            R.b = b,
                            R.a = S,
                            R = R.next;
                        for (i = 1; i < A; i++)
                            r = n + ((P < i ? P : i) << 2),
                            o += (R.r = y = N[r]) * (w = A - i),
                            h += (R.g = x = N[r + 1]) * w,
                            l += (R.b = b = N[r + 2]) * w,
                            d += (R.a = S = N[r + 3]) * w,
                            p += y,
                            m += x,
                            _ += b,
                            v += S,
                            R = R.next;
                        for (E = M,
                        D = G,
                        t = 0; t < H; t++)
                            N[n + 3] = S = d * L >> I,
                            0 !== S ? (S = 255 / S,
                            N[n] = (o * L >> I) * S,
                            N[n + 1] = (h * L >> I) * S,
                            N[n + 2] = (l * L >> I) * S) : N[n] = N[n + 1] = N[n + 2] = 0,
                            o -= c,
                            h -= g,
                            l -= u,
                            d -= f,
                            c -= E.r,
                            g -= E.g,
                            u -= E.b,
                            f -= E.a,
                            r = s + ((r = t + B + 1) < P ? r : P) << 2,
                            p += E.r = N[r],
                            m += E.g = N[r + 1],
                            _ += E.b = N[r + 2],
                            v += E.a = N[r + 3],
                            o += p,
                            h += m,
                            l += _,
                            d += v,
                            E = E.next,
                            c += y = D.r,
                            g += x = D.g,
                            u += b = D.b,
                            f += S = D.a,
                            p -= y,
                            m -= x,
                            _ -= b,
                            v -= S,
                            D = D.next,
                            n += 4;
                        s += H
                    }
                    for (t = 0; t < H; t++) {
                        for (m = _ = v = p = h = l = d = o = 0,
                        n = t << 2,
                        c = A * (y = N[n]),
                        g = A * (x = N[n + 1]),
                        u = A * (b = N[n + 2]),
                        f = A * (S = N[n + 3]),
                        o += T * y,
                        h += T * x,
                        l += T * b,
                        d += T * S,
                        R = M,
                        i = 0; i < A; i++)
                            R.r = y,
                            R.g = x,
                            R.b = b,
                            R.a = S,
                            R = R.next;
                        for (a = H,
                        i = 1; i <= B; i++)
                            n = a + t << 2,
                            o += (R.r = y = N[n]) * (w = A - i),
                            h += (R.g = x = N[n + 1]) * w,
                            l += (R.b = b = N[n + 2]) * w,
                            d += (R.a = S = N[n + 3]) * w,
                            p += y,
                            m += x,
                            _ += b,
                            v += S,
                            R = R.next,
                            i < k && (a += H);
                        for (n = t,
                        E = M,
                        D = G,
                        e = 0; e < W; e++)
                            N[(r = n << 2) + 3] = S = d * L >> I,
                            0 < S ? (S = 255 / S,
                            N[r] = (o * L >> I) * S,
                            N[r + 1] = (h * L >> I) * S,
                            N[r + 2] = (l * L >> I) * S) : N[r] = N[r + 1] = N[r + 2] = 0,
                            o -= c,
                            h -= g,
                            l -= u,
                            d -= f,
                            c -= E.r,
                            g -= E.g,
                            u -= E.b,
                            f -= E.a,
                            r = t + ((r = e + A) < k ? r : k) * H << 2,
                            o += p += E.r = N[r],
                            h += m += E.g = N[r + 1],
                            l += _ += E.b = N[r + 2],
                            d += v += E.a = N[r + 3],
                            E = E.next,
                            c += y = D.r,
                            g += x = D.g,
                            u += b = D.b,
                            f += S = D.a,
                            p -= y,
                            m -= x,
                            _ -= b,
                            v -= S,
                            D = D.next,
                            n += H
                    }
                }
            },
            Brighten: function(t) {
                let e, i = 255 * this.brightness(), r = t.data, a = r.length;
                for (e = 0; e < a; e += 4)
                    r[e] += i,
                    r[e + 1] += i,
                    r[e + 2] += i
            },
            Contrast: function(t) {
                var e = Math.pow((this.contrast() + 100) / 100, 2);
                let i, r = t.data, a = r.length, n = 150, s = 150, o = 150;
                for (i = 0; i < a; i += 4)
                    n = r[i],
                    s = r[i + 1],
                    o = r[i + 2],
                    n = (n = ((n = ((n /= 255) - .5) * e) + .5) * 255) < 0 ? 0 : 255 < n ? 255 : n,
                    s = (s = ((s = ((s /= 255) - .5) * e) + .5) * 255) < 0 ? 0 : 255 < s ? 255 : s,
                    o = (o = ((o = ((o /= 255) - .5) * e) + .5) * 255) < 0 ? 0 : 255 < o ? 255 : o,
                    r[i] = n,
                    r[i + 1] = s,
                    r[i + 2] = o
            },
            Emboss: function(t) {
                let d = 10 * this.embossStrength()
                  , c = 255 * this.embossWhiteLevel()
                  , e = this.embossDirection()
                  , g = this.embossBlend()
                  , i = 0
                  , u = 0
                  , f = t.data
                  , p = t.width
                  , r = t.height
                  , a = 4 * p
                  , n = r;
                switch (e) {
                case "top-left":
                    i = -1,
                    u = -1;
                    break;
                case "top":
                    i = -1,
                    u = 0;
                    break;
                case "top-right":
                    i = -1,
                    u = 1;
                    break;
                case "right":
                    i = 0,
                    u = 1;
                    break;
                case "bottom-right":
                    i = 1,
                    u = 1;
                    break;
                case "bottom":
                    i = 1,
                    u = 0;
                    break;
                case "bottom-left":
                    i = 1,
                    u = -1;
                    break;
                case "left":
                    i = 0,
                    u = -1;
                    break;
                default:
                    N.error("Unknown emboss direction: " + e)
                }
                do {
                    let o = (n - 1) * a
                      , t = i
                      , h = (n + t < 1 && (t = 0),
                    n + t > r && (t = 0),
                    (n - 1 + t) * p * 4)
                      , l = p;
                    do {
                        let r = o + 4 * (l - 1)
                          , t = u
                          , e = (l + t < 1 && (t = 0),
                        l + t > p && (t = 0),
                        h + 4 * (l - 1 + t))
                          , i = f[r] - f[e]
                          , a = f[1 + r] - f[1 + e]
                          , n = f[2 + r] - f[2 + e]
                          , s = i;
                        var m = 0 < s ? s : -s;
                        if ((0 < a ? a : -a) > m && (s = a),
                        m < (0 < n ? n : -n) && (s = n),
                        s *= d,
                        g) {
                            let t = f[r] + s
                              , e = f[1 + r] + s
                              , i = f[2 + r] + s;
                            f[r] = 255 < t ? 255 : t < 0 ? 0 : t,
                            f[1 + r] = 255 < e ? 255 : e < 0 ? 0 : e,
                            f[2 + r] = 255 < i ? 255 : i < 0 ? 0 : i
                        } else {
                            let t = c - s;
                            t < 0 ? t = 0 : 255 < t && (t = 255),
                            f[r] = f[1 + r] = f[2 + r] = t
                        }
                    } while (--l)
                } while (--n)
            },
            Enhance: function(l) {
                let d, c, g, u, f = l.data, p = f.length, m = f[0], _ = m, v = f[1], y = v, x = f[2], b = x;
                l = this.enhance();
                if (0 !== l) {
                    for (u = 0; u < p; u += 4)
                        (d = f[u + 0]) < m ? m = d : d > _ && (_ = d),
                        (c = f[u + 1]) < v ? v = c : c > y && (y = c),
                        (g = f[u + 2]) < x ? x = g : g > b && (b = g);
                    let t, e, i, r, a, n, s, o, h;
                    for (_ === m && (_ = 255,
                    m = 0),
                    y === v && (y = 255,
                    v = 0),
                    b === x && (b = 255,
                    x = 0),
                    h = 0 < l ? (e = _ + l * (255 - _),
                    i = m - l * +m,
                    a = y + l * (255 - y),
                    n = v - l * +v,
                    o = b + l * (255 - b),
                    x - l * +x) : (t = .5 * (_ + m),
                    e = _ + l * (_ - t),
                    i = m + l * (m - t),
                    r = .5 * (y + v),
                    a = y + l * (y - r),
                    n = v + l * (v - r),
                    s = .5 * (b + x),
                    o = b + l * (b - s),
                    x + l * (x - s)),
                    u = 0; u < p; u += 4)
                        f[u + 0] = ei(f[u + 0], m, _, i, e),
                        f[u + 1] = ei(f[u + 1], v, y, n, a),
                        f[u + 2] = ei(f[u + 2], x, b, h, o)
                }
            },
            Grayscale: function(t) {
                let e, i, r = t.data, a = r.length;
                for (e = 0; e < a; e += 4)
                    i = .34 * r[e] + .5 * r[e + 1] + .16 * r[e + 2],
                    r[e] = i,
                    r[e + 1] = i,
                    r[e + 2] = i
            },
            HSL: function(t) {
                let e, i = t.data, r = i.length, a = Math.pow(2, this.saturation()), n = Math.abs(this.hue() + 360) % 360, s = 127 * this.luminance();
                var o, h, l, d, t = +a * Math.cos(n * Math.PI / 180), c = +a * Math.sin(n * Math.PI / 180), g = .299 + .701 * t + .167 * c, u = .587 - .587 * t + .33 * c, f = .114 - .114 * t - .497 * c, p = .299 - .299 * t - .328 * c, m = .587 + .413 * t + .035 * c, _ = .114 - .114 * t + .293 * c, v = .299 - .3 * t + 1.25 * c, y = .587 - .586 * t - 1.05 * c, x = .114 + .886 * t - .2 * c;
                for (e = 0; e < r; e += 4)
                    o = i[e + 0],
                    h = i[e + 1],
                    l = i[e + 2],
                    d = i[e + 3],
                    i[e + 0] = g * o + u * h + f * l + s,
                    i[e + 1] = p * o + m * h + _ * l + s,
                    i[e + 2] = v * o + y * h + x * l + s,
                    i[e + 3] = d
            },
            HSV: function(t) {
                var e, i, r, a, n = t.data, s = n.length, t = Math.pow(2, this.value()), o = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = t * o * Math.cos(h * Math.PI / 180), o = t * o * Math.sin(h * Math.PI / 180), d = .299 * t + .701 * l + .167 * o, c = .587 * t - .587 * l + .33 * o, g = .114 * t - .114 * l - .497 * o, u = .299 * t - .299 * l - .328 * o, f = .587 * t + .413 * l + .035 * o, p = .114 * t - .114 * l + .293 * o, m = .299 * t - .3 * l + 1.25 * o, _ = .587 * t - .586 * l - 1.05 * o, v = .114 * t + .886 * l - .2 * o;
                for (let t = 0; t < s; t += 4)
                    e = n[t + 0],
                    i = n[t + 1],
                    r = n[t + 2],
                    a = n[t + 3],
                    n[t + 0] = d * e + c * i + g * r,
                    n[t + 1] = u * e + f * i + p * r,
                    n[t + 2] = m * e + _ * i + v * r,
                    n[t + 3] = a
            },
            Invert: function(t) {
                let e, i = t.data, r = i.length;
                for (e = 0; e < r; e += 4)
                    i[e] = 255 - i[e],
                    i[e + 1] = 255 - i[e + 1],
                    i[e + 2] = 255 - i[e + 2]
            },
            Kaleidoscope: function(_) {
                var o = _.width
                  , h = _.height;
                let n, s, l, d, c, g, u, f, p, m, v = Math.round(this.kaleidoscopePower());
                var y = Math.round(this.kaleidoscopeAngle())
                  , x = Math.floor(o * (y % 360) / 360);
                if (!(v < 1)) {
                    var y = N.createCanvasElement()
                      , b = (y.width = o,
                    y.height = h,
                    y.getContext("2d").getImageData(0, 0, o, h));
                    N.releaseCanvas(y);
                    {
                        y = {
                            polarCenterX: o / 2,
                            polarCenterY: h / 2
                        };
                        var S, w, C, P, k, A = _.data, T = b.data, M = _.width, G = _.height, R = y.polarCenterX || M / 2, E = y.polarCenterY || G / 2, D = Math.sqrt(R * R + E * E), L = M - R, y = G - E, y = Math.sqrt(L * L + y * y), D = D < y ? y : D;
                        let t, e, i, r, a = G, n = M, s = 360 / n * Math.PI / 180;
                        for (e = 0; e < n; e += 1)
                            for (i = Math.sin(e * s),
                            r = Math.cos(e * s),
                            t = 0; t < a; t += 1)
                                L = Math.floor(R + D * t / a * r),
                                w = A[0 + (S = 4 * (Math.floor(E + D * t / a * i) * M + L))],
                                C = A[1 + S],
                                P = A[2 + S],
                                k = A[3 + S],
                                T[0 + (S = 4 * (e + t * M))] = w,
                                T[1 + S] = C,
                                T[2 + S] = P,
                                T[3 + S] = k
                    }
                    let t = o / Math.pow(2, v);
                    for (; t <= 8; )
                        t *= 2,
                        --v;
                    let e = t = Math.ceil(t)
                      , i = 0
                      , r = e
                      , a = 1;
                    for (x + t > o && (i = e,
                    r = 0,
                    a = -1),
                    s = 0; s < h; s += 1)
                        for (n = i; n !== r; n += a)
                            l = Math.round(n + x) % o,
                            p = 4 * (o * s + l),
                            c = b.data[p + 0],
                            g = b.data[p + 1],
                            u = b.data[p + 2],
                            f = b.data[p + 3],
                            m = 4 * (o * s + n),
                            b.data[m + 0] = c,
                            b.data[m + 1] = g,
                            b.data[m + 2] = u,
                            b.data[m + 3] = f;
                    for (s = 0; s < h; s += 1)
                        for (e = Math.floor(t),
                        d = 0; d < v; d += 1) {
                            for (n = 0; n < e + 1; n += 1)
                                p = 4 * (o * s + n),
                                c = b.data[p + 0],
                                g = b.data[p + 1],
                                u = b.data[p + 2],
                                f = b.data[p + 3],
                                m = 4 * (o * s + 2 * e - n - 1),
                                b.data[m + 0] = c,
                                b.data[m + 1] = g,
                                b.data[m + 2] = u,
                                b.data[m + 3] = f;
                            e *= 2
                        }
                    {
                        y = {
                            polarRotation: 0
                        };
                        let t, e, i, r, a, n, s = b.data, o = _.data, h = b.width, l = b.height, d = y.polarCenterX || h / 2, c = y.polarCenterY || l / 2, g, u, f, p, m = Math.sqrt(d * d + c * c);
                        e = h - d,
                        i = l - c,
                        m = m < (n = Math.sqrt(e * e + i * i)) ? n : m;
                        var I, O, F = l, B = h;
                        for (e = 0; e < h; e += 1)
                            for (i = 0; i < l; i += 1)
                                r = e - d,
                                a = i - c,
                                I = Math.sqrt(r * r + a * a) * F / m,
                                O = (180 * Math.atan2(a, r) / Math.PI + 360) % 360,
                                O = Math.floor(O * B / 360),
                                g = s[0 + (t = 4 * (Math.floor(I) * h + O))],
                                u = s[1 + t],
                                f = s[2 + t],
                                p = s[3 + t],
                                t = 4 * (i * h + e),
                                o[0 + t] = g,
                                o[1 + t] = u,
                                o[2 + t] = f,
                                o[3 + t] = p
                    }
                }
            },
            Mask: function(t) {
                var e = ( (a, t) => {
                    let e = ii(a, 0, 0)
                      , n = ii(a, a.width - 1, 0)
                      , s = ii(a, 0, a.height - 1)
                      , o = ii(a, a.width - 1, a.height - 1)
                      , h = t || 10;
                    if (ri(e, n) < h && ri(n, o) < h && ri(o, s) < h && ri(s, e) < h) {
                        let i = (e => {
                            var i = [0, 0, 0];
                            for (let t = 0; t < e.length; t++)
                                i[0] += e[t][0],
                                i[1] += e[t][1],
                                i[2] += e[t][2];
                            return i[0] /= e.length,
                            i[1] /= e.length,
                            i[2] /= e.length,
                            i
                        }
                        )([n, e, o, s])
                          , r = [];
                        for (let e = 0; e < a.width * a.height; e++) {
                            let t = ri(i, [a.data[4 * e], a.data[4 * e + 1], a.data[4 * e + 2]]);
                            r[e] = t < h ? 0 : 255
                        }
                        return r
                    }
                }
                )(t, this.threshold());
                if (e) {
                    var e = ( (n, s, o) => {
                        var h = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]
                          , l = Math.round(Math.sqrt(h.length))
                          , d = Math.floor(l / 2)
                          , e = [];
                        for (let a = 0; a < o; a++)
                            for (let t = 0; t < s; t++) {
                                var i = a * s + t;
                                let r = 0;
                                for (let i = 0; i < l; i++)
                                    for (let e = 0; e < l; e++) {
                                        var c = a + i - d
                                          , g = t + e - d;
                                        if (0 <= c && c < o && 0 <= g && g < s) {
                                            let t = h[i * l + e];
                                            r += n[c * s + g] * t
                                        }
                                    }
                                e[i] = r
                            }
                        return e
                    }
                    )(e = ( (n, s, o) => {
                        var h = [1, 1, 1, 1, 1, 1, 1, 1, 1]
                          , l = Math.round(Math.sqrt(h.length))
                          , d = Math.floor(l / 2)
                          , e = [];
                        for (let a = 0; a < o; a++)
                            for (let t = 0; t < s; t++) {
                                var i = a * s + t;
                                let r = 0;
                                for (let i = 0; i < l; i++)
                                    for (let e = 0; e < l; e++) {
                                        var c = a + i - d
                                          , g = t + e - d;
                                        if (0 <= c && c < o && 0 <= g && g < s) {
                                            let t = h[i * l + e];
                                            r += n[c * s + g] * t
                                        }
                                    }
                                e[i] = 1020 <= r ? 255 : 0
                            }
                        return e
                    }
                    )(e = ( (n, s, o) => {
                        var h = [1, 1, 1, 1, 0, 1, 1, 1, 1]
                          , l = Math.round(Math.sqrt(h.length))
                          , d = Math.floor(l / 2)
                          , e = [];
                        for (let a = 0; a < o; a++)
                            for (let t = 0; t < s; t++) {
                                var i = a * s + t;
                                let r = 0;
                                for (let i = 0; i < l; i++)
                                    for (let e = 0; e < l; e++) {
                                        var c = a + i - d
                                          , g = t + e - d;
                                        if (0 <= c && c < o && 0 <= g && g < s) {
                                            let t = h[i * l + e];
                                            r += n[c * s + g] * t
                                        }
                                    }
                                e[i] = 2040 === r ? 255 : 0
                            }
                        return e
                    }
                    )(e, t.width, t.height), t.width, t.height), t.width, t.height)
                      , i = t
                      , r = e;
                    for (let t = 0; t < i.width * i.height; t++)
                        i.data[4 * t + 3] = r[t]
                }
                return t
            },
            Noise: function(t) {
                var e = 255 * this.noise()
                  , i = t.data
                  , r = i.length
                  , a = e / 2;
                for (let t = 0; t < r; t += 4)
                    i[t + 0] += a - 2 * a * Math.random(),
                    i[t + 1] += a - 2 * a * Math.random(),
                    i[t + 2] += a - 2 * a * Math.random()
            },
            Pixelate: function(t) {
                let e, i, r, a, n, s, o, h, l, d, c, g, u, f, p = Math.ceil(this.pixelSize()), m = t.width, _ = t.height, v = Math.ceil(m / p), y = Math.ceil(_ / p), x = t.data;
                if (p <= 0)
                    N.error("pixelSize value can not be <= 0");
                else
                    for (g = 0; g < v; g += 1)
                        for (u = 0; u < y; u += 1) {
                            for (a = 0,
                            n = 0,
                            s = 0,
                            o = 0,
                            l = (h = g * p) + p,
                            c = (d = u * p) + p,
                            f = 0,
                            e = h; e < l; e += 1)
                                if (!(e >= m))
                                    for (i = d; i < c; i += 1)
                                        i >= _ || (r = 4 * (m * i + e),
                                        a += x[r + 0],
                                        n += x[r + 1],
                                        s += x[r + 2],
                                        o += x[r + 3],
                                        f += 1);
                            for (a /= f,
                            n /= f,
                            s /= f,
                            o /= f,
                            e = h; e < l; e += 1)
                                if (!(e >= m))
                                    for (i = d; i < c; i += 1)
                                        i >= _ || (r = 4 * (m * i + e),
                                        x[r + 0] = a,
                                        x[r + 1] = n,
                                        x[r + 2] = s,
                                        x[r + 3] = o)
                        }
            },
            Posterize: function(t) {
                let e, i = Math.round(254 * this.levels()) + 1, r = t.data, a = r.length, n = 255 / i;
                for (e = 0; e < a; e += 1)
                    r[e] = Math.floor(r[e] / n) * n
            },
            RGB: function(t) {
                let e, i, r = t.data, a = r.length, n = this.red(), s = this.green(), o = this.blue();
                for (e = 0; e < a; e += 4)
                    i = (.34 * r[e] + .5 * r[e + 1] + .16 * r[e + 2]) / 255,
                    r[e] = i * n,
                    r[e + 1] = i * s,
                    r[e + 2] = i * o,
                    r[e + 3] = r[e + 3]
            },
            RGBA: function(t) {
                let i = t.data
                  , r = i.length
                  , a = this.red()
                  , n = this.green()
                  , s = this.blue()
                  , o = this.alpha();
                for (let e = 0; e < r; e += 4) {
                    let t = 1 - o;
                    i[e] = a * o + i[e] * t,
                    i[e + 1] = n * o + i[e + 1] * t,
                    i[e + 2] = s * o + i[e + 2] * t
                }
            },
            Sepia: function(t) {
                let e, i, r, a, n = t.data, s = n.length;
                for (e = 0; e < s; e += 4)
                    i = n[e + 0],
                    r = n[e + 1],
                    a = n[e + 2],
                    n[e + 0] = Math.min(255, .393 * i + .769 * r + .189 * a),
                    n[e + 1] = Math.min(255, .349 * i + .686 * r + .168 * a),
                    n[e + 2] = Math.min(255, .272 * i + .534 * r + .131 * a)
            },
            Solarize: function(t) {
                let s = t.data
                  , e = t.width
                  , i = 4 * e
                  , r = t.height;
                do {
                    let a = (r - 1) * i
                      , n = e;
                    do {
                        let t = a + 4 * (n - 1)
                          , e = s[t]
                          , i = s[1 + t]
                          , r = s[2 + t];
                        127 < e && (e = 255 - e),
                        127 < i && (i = 255 - i),
                        127 < r && (r = 255 - r),
                        s[t] = e,
                        s[1 + t] = i,
                        s[2 + t] = r
                    } while (--n)
                } while (--r)
            },
            Threshold: function(t) {
                var e = 255 * this.threshold()
                  , i = t.data
                  , r = i.length;
                for (let t = 0; t < r; t += 1)
                    i[t] = i[t] < e ? 0 : 255
            }
        }
    })
});
var SimpleBar = ( () => {
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || ({
            __proto__: []
        }instanceof Array ? function(e, t) {
            e.__proto__ = t
        }
        : function(e, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        ))(e, t)
    }
      , e = "object" == typeof global && global && global.Object === Object && global
      , t = "object" == typeof self && self && self.Object === Object && self
      , i = e || t || Function("return this")()
      , e = i.Symbol
      , o = (t = Object.prototype).hasOwnProperty
      , n = t.toString
      , a = e ? e.toStringTag : void 0
      , c = Object.prototype.toString
      , h = e ? e.toStringTag : void 0
      , s = /\s/
      , l = /^\s+/;
    function u(e) {
        return e && e.slice(0, (e => {
            for (var t = e.length; t-- && s.test(e.charAt(t)); )
                ;
            return t
        }
        )(e) + 1).replace(l, "")
    }
    function g(e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t)
    }
    var V = /^[-+]0x[0-9a-f]+$/i
      , H = /^0b[01]+$/i
      , j = /^0o[0-7]+$/i
      , B = parseInt;
    function x(e) {
        if ("number" == typeof e)
            return e;
        if ("symbol" == typeof (t = e) || null != t && "object" == typeof t && "[object Symbol]" == (e => {
            if (null == e)
                return void 0 === e ? "[object Undefined]" : "[object Null]";
            if (h && h in Object(e)) {
                var t = e
                  , i = o.call(t, a)
                  , s = t[a];
                try {
                    var l = !(t[a] = void 0)
                } catch (t) {}
                var r = n.call(t);
                return l && (i ? t[a] = s : delete t[a]),
                r
            }
            return c.call(e)
        }
        )(t))
            return NaN;
        if ("string" != typeof (e = g(e) ? g(t = "function" == typeof e.valueOf ? e.valueOf() : e) ? t + "" : t : e))
            return 0 === e ? e : +e;
        e = u(e);
        var t = H.test(e);
        return t || j.test(e) ? B(e.slice(2), t ? 2 : 8) : V.test(e) ? NaN : +e
    }
    var y = function() {
        return i.Date.now()
    }
      , _ = Math.max
      , q = Math.min;
    function d(s, i, e) {
        var l, r, o, n, a, c, h = 0, u = !1, d = !1, t = !0;
        if ("function" != typeof s)
            throw new TypeError("Expected a function");
        function p(e) {
            var t = l
              , i = r;
            return l = r = void 0,
            h = e,
            n = s.apply(i, t)
        }
        function f(e) {
            var t = e - c;
            return void 0 === c || i <= t || t < 0 || d && o <= e - h
        }
        function v() {
            var e, t = y();
            if (f(t))
                return m(t);
            a = setTimeout(v, (e = i - (t - c),
            d ? q(e, o - (t - h)) : e))
        }
        function m(e) {
            return a = void 0,
            t && l ? p(e) : (l = r = void 0,
            n)
        }
        function b() {
            var e = y()
              , t = f(e);
            if (l = arguments,
            r = this,
            c = e,
            t) {
                if (void 0 === a)
                    return h = e = c,
                    a = setTimeout(v, i),
                    u ? p(e) : n;
                if (d)
                    return clearTimeout(a),
                    a = setTimeout(v, i),
                    p(c)
            }
            return void 0 === a && (a = setTimeout(v, i)),
            n
        }
        return i = x(i) || 0,
        g(e) && (u = !!e.leading,
        o = (d = "maxWait"in e) ? _(x(e.maxWait) || 0, i) : o,
        t = "trailing"in e ? !!e.trailing : t),
        b.cancel = function() {
            void 0 !== a && clearTimeout(a),
            l = c = r = a = void (h = 0)
        }
        ,
        b.flush = function() {
            return void 0 === a ? n : m(y())
        }
        ,
        b
    }
    var p = function() {
        return (p = Object.assign || function(e) {
            for (var t, i = 1, s = arguments.length; i < s; i++)
                for (var l in t = arguments[i])
                    Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
            return e
        }
        ).apply(this, arguments)
    };
    function f(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window
    }
    function v(e) {
        return e && e.ownerDocument ? e.ownerDocument : document
    }
    function m(e) {
        return Array.prototype.reduce.call(e, function(e, t) {
            var i = t.name.match(/data-simplebar-(.+)/);
            if (i) {
                var s = i[1].replace(/\W+(.)/g, function(e, t) {
                    return t.toUpperCase()
                });
                switch (t.value) {
                case "true":
                    e[s] = !0;
                    break;
                case "false":
                    e[s] = !1;
                    break;
                case void 0:
                    e[s] = !0;
                    break;
                default:
                    e[s] = t.value
                }
            }
            return e
        }, {})
    }
    function b(e, t) {
        e && (e = e.classList).add.apply(e, t.split(" "))
    }
    function E(t, e) {
        t && e.split(" ").forEach(function(e) {
            t.classList.remove(e)
        })
    }
    function O(e) {
        return ".".concat(e.split(" ").join("."))
    }
    var w = !("undefined" == typeof window || !window.document || !window.document.createElement)
      , t = Object.freeze({
        __proto__: null,
        addClasses: b,
        canUseDOM: w,
        classNamesToQuery: O,
        getElementDocument: v,
        getElementWindow: f,
        getOptions: m,
        removeClasses: E
    })
      , S = null
      , A = null;
    function k() {
        if (null === S) {
            if ("undefined" == typeof document)
                return S = 0;
            var e = document.body
              , t = document.createElement("div")
              , i = (t.classList.add("simplebar-hide-scrollbar"),
            e.appendChild(t),
            t.getBoundingClientRect().right);
            e.removeChild(t),
            S = i
        }
        return S
    }
    w && window.addEventListener("resize", function() {
        A !== window.devicePixelRatio && (A = window.devicePixelRatio,
        S = null)
    });
    var W = f
      , M = v
      , e = m
      , N = b
      , L = E
      , z = O
      , C = (R.getRtlHelpers = function() {
        if (!R.rtlHelpers) {
            var e = document.createElement("div")
              , e = (e.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>',
            e.firstElementChild)
              , t = null == e ? void 0 : e.firstElementChild;
            if (!t)
                return null;
            document.body.appendChild(e),
            e.scrollLeft = 0;
            var i = R.getOffset(e)
              , s = R.getOffset(t)
              , t = (e.scrollLeft = -999,
            R.getOffset(t));
            document.body.removeChild(e),
            R.rtlHelpers = {
                isScrollOriginAtZero: i.left !== s.left,
                isScrollingToNegative: s.left !== t.left
            }
        }
        return R.rtlHelpers
    }
    ,
    R.prototype.getScrollbarWidth = function() {
        try {
            return this.contentWrapperEl && "none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display || "scrollbarWidth"in document.documentElement.style || "-ms-overflow-style"in document.documentElement.style ? 0 : k()
        } catch (e) {
            return k()
        }
    }
    ,
    R.getOffset = function(e) {
        var t = e.getBoundingClientRect()
          , i = M(e)
          , e = W(e);
        return {
            top: t.top + (e.pageYOffset || i.documentElement.scrollTop),
            left: t.left + (e.pageXOffset || i.documentElement.scrollLeft)
        }
    }
    ,
    R.prototype.init = function() {
        w && (this.initDOM(),
        this.rtlHelpers = R.getRtlHelpers(),
        this.scrollbarWidth = this.getScrollbarWidth(),
        this.recalculate(),
        this.initListeners())
    }
    ,
    R.prototype.initDOM = function() {
        var e;
        this.wrapperEl = this.el.querySelector(z(this.classNames.wrapper)),
        this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(z(this.classNames.contentWrapper)),
        this.contentEl = this.options.contentNode || this.el.querySelector(z(this.classNames.contentEl)),
        this.offsetEl = this.el.querySelector(z(this.classNames.offset)),
        this.maskEl = this.el.querySelector(z(this.classNames.mask)),
        this.placeholderEl = this.findChild(this.wrapperEl, z(this.classNames.placeholder)),
        this.heightAutoObserverWrapperEl = this.el.querySelector(z(this.classNames.heightAutoObserverWrapperEl)),
        this.heightAutoObserverEl = this.el.querySelector(z(this.classNames.heightAutoObserverEl)),
        this.axis.x.track.el = this.findChild(this.el, "".concat(z(this.classNames.track)).concat(z(this.classNames.horizontal))),
        this.axis.y.track.el = this.findChild(this.el, "".concat(z(this.classNames.track)).concat(z(this.classNames.vertical))),
        this.axis.x.scrollbar.el = (null == (e = this.axis.x.track.el) ? void 0 : e.querySelector(z(this.classNames.scrollbar))) || null,
        this.axis.y.scrollbar.el = (null == (e = this.axis.y.track.el) ? void 0 : e.querySelector(z(this.classNames.scrollbar))) || null,
        this.options.autoHide || (N(this.axis.x.scrollbar.el, this.classNames.visible),
        N(this.axis.y.scrollbar.el, this.classNames.visible))
    }
    ,
    R.prototype.initListeners = function() {
        var e, t, i = this, s = W(this.el);
        this.el.addEventListener("mouseenter", this.onMouseEnter),
        this.el.addEventListener("pointerdown", this.onPointerEvent, !0),
        this.el.addEventListener("mousemove", this.onMouseMove),
        this.el.addEventListener("mouseleave", this.onMouseLeave),
        null != (t = this.contentWrapperEl) && t.addEventListener("scroll", this.onScroll),
        s.addEventListener("resize", this.onWindowResize),
        this.contentEl && (window.ResizeObserver && (e = !1,
        t = s.ResizeObserver || ResizeObserver,
        this.resizeObserver = new t(function() {
            e && s.requestAnimationFrame(function() {
                i.recalculate()
            })
        }
        ),
        this.resizeObserver.observe(this.el),
        this.resizeObserver.observe(this.contentEl),
        s.requestAnimationFrame(function() {
            e = !0
        })),
        this.mutationObserver = new s.MutationObserver(function() {
            s.requestAnimationFrame(function() {
                i.recalculate()
            })
        }
        ),
        this.mutationObserver.observe(this.contentEl, {
            childList: !0,
            subtree: !0,
            characterData: !0
        }))
    }
    ,
    R.prototype.recalculate = function() {
        var e, t, i, s, l, r, o, n;
        this.heightAutoObserverEl && this.contentEl && this.contentWrapperEl && this.wrapperEl && this.placeholderEl && (n = W(this.el),
        this.elStyles = n.getComputedStyle(this.el),
        this.isRtl = "rtl" === this.elStyles.direction,
        n = this.contentEl.offsetWidth,
        r = this.heightAutoObserverEl.offsetHeight <= 1,
        o = this.heightAutoObserverEl.offsetWidth <= 1 || 0 < n,
        e = this.contentWrapperEl.offsetWidth,
        t = this.elStyles.overflowX,
        i = this.elStyles.overflowY,
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft),
        this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft),
        s = this.contentEl.scrollHeight,
        l = this.contentEl.scrollWidth,
        this.contentWrapperEl.style.height = r ? "auto" : "100%",
        this.placeholderEl.style.width = o ? "".concat(n || l, "px") : "auto",
        this.placeholderEl.style.height = "".concat(s, "px"),
        r = this.contentWrapperEl.offsetHeight,
        this.axis.x.isOverflowing = 0 !== n && n < l,
        this.axis.y.isOverflowing = r < s,
        this.axis.x.isOverflowing = "hidden" !== t && this.axis.x.isOverflowing,
        this.axis.y.isOverflowing = "hidden" !== i && this.axis.y.isOverflowing,
        this.axis.x.forceVisible = "x" === this.options.forceVisible || !0 === this.options.forceVisible,
        this.axis.y.forceVisible = "y" === this.options.forceVisible || !0 === this.options.forceVisible,
        this.hideNativeScrollbar(),
        o = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
        n = this.axis.y.isOverflowing ? this.scrollbarWidth : 0,
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && e - n < l,
        this.axis.y.isOverflowing = this.axis.y.isOverflowing && r - o < s,
        this.axis.x.scrollbar.size = this.getScrollbarSize("x"),
        this.axis.y.scrollbar.size = this.getScrollbarSize("y"),
        this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")),
        this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")),
        this.positionScrollbar("x"),
        this.positionScrollbar("y"),
        this.toggleTrackVisibility("x"),
        this.toggleTrackVisibility("y"))
    }
    ,
    R.prototype.getScrollbarSize = function(e) {
        var t, i;
        return this.axis[e = void 0 === e ? "y" : e].isOverflowing && this.contentEl ? (t = this.contentEl[this.axis[e].scrollSizeAttr],
        e = null != (i = null == (i = this.axis[e].track.el) ? void 0 : i[this.axis[e].offsetSizeAttr]) ? i : 0,
        i = Math.max(~~(e / t * e), this.options.scrollbarMinSize),
        this.options.scrollbarMaxSize ? Math.min(i, this.options.scrollbarMaxSize) : i) : 0
    }
    ,
    R.prototype.positionScrollbar = function(e) {
        var t, i, s, l, r, o = this.axis[e = void 0 === e ? "y" : e].scrollbar;
        this.axis[e].isOverflowing && this.contentWrapperEl && o.el && this.elStyles && (t = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
        i = (null == (i = this.axis[e].track.el) ? void 0 : i[this.axis[e].offsetSizeAttr]) || 0,
        s = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
        l = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
        l = "x" === e && this.isRtl && null != (r = R.getRtlHelpers()) && r.isScrollOriginAtZero ? -l : l,
        "x" === e && this.isRtl && (l = null != (r = R.getRtlHelpers()) && r.isScrollingToNegative ? l : -l),
        r = ~~((i - o.size) * (l / (t - s))),
        r = "x" === e && this.isRtl ? -r + (i - o.size) : r,
        o.el.style.transform = "x" === e ? "translate3d(".concat(r, "px, 0, 0)") : "translate3d(0, ".concat(r, "px, 0)"))
    }
    ,
    R.prototype.toggleTrackVisibility = function(e) {
        var t = this.axis[e = void 0 === e ? "y" : e].track.el
          , i = this.axis[e].scrollbar.el;
        t && i && this.contentWrapperEl && (this.axis[e].isOverflowing || this.axis[e].forceVisible ? (t.style.visibility = "visible",
        this.contentWrapperEl.style[this.axis[e].overflowAttr] = "scroll",
        this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(e))) : (t.style.visibility = "hidden",
        this.contentWrapperEl.style[this.axis[e].overflowAttr] = "hidden",
        this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(e))),
        this.axis[e].isOverflowing ? i.style.display = "block" : i.style.display = "none")
    }
    ,
    R.prototype.showScrollbar = function(e) {
        this.axis[e = void 0 === e ? "y" : e].isOverflowing && !this.axis[e].scrollbar.isVisible && (N(this.axis[e].scrollbar.el, this.classNames.visible),
        this.axis[e].scrollbar.isVisible = !0)
    }
    ,
    R.prototype.hideScrollbar = function(e) {
        void 0 === e && (e = "y"),
        this.isDragging || this.axis[e].isOverflowing && this.axis[e].scrollbar.isVisible && (L(this.axis[e].scrollbar.el, this.classNames.visible),
        this.axis[e].scrollbar.isVisible = !1)
    }
    ,
    R.prototype.hideNativeScrollbar = function() {
        this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px",
        this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px")
    }
    ,
    R.prototype.onMouseMoveForAxis = function(e) {
        var t = this.axis[e = void 0 === e ? "y" : e];
        t.track.el && t.scrollbar.el && (t.track.rect = t.track.el.getBoundingClientRect(),
        t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect(),
        this.isWithinBounds(t.track.rect) ? (this.showScrollbar(e),
        N(t.track.el, this.classNames.hover),
        (this.isWithinBounds(t.scrollbar.rect) ? N : L)(t.scrollbar.el, this.classNames.hover)) : (L(t.track.el, this.classNames.hover),
        this.options.autoHide && this.hideScrollbar(e)))
    }
    ,
    R.prototype.onMouseLeaveForAxis = function(e) {
        L(this.axis[e = void 0 === e ? "y" : e].track.el, this.classNames.hover),
        L(this.axis[e].scrollbar.el, this.classNames.hover),
        this.options.autoHide && this.hideScrollbar(e)
    }
    ,
    R.prototype.onDragStart = function(e, t) {
        void 0 === t && (t = "y"),
        this.isDragging = !0;
        var i = M(this.el)
          , s = W(this.el)
          , l = this.axis[t].scrollbar
          , e = "y" === t ? e.pageY : e.pageX;
        this.axis[t].dragOffset = e - ((null == (e = l.rect) ? void 0 : e[this.axis[t].offsetAttr]) || 0),
        this.draggedAxis = t,
        N(this.el, this.classNames.dragging),
        i.addEventListener("mousemove", this.drag, !0),
        i.addEventListener("mouseup", this.onEndDrag, !0),
        null === this.removePreventClickId ? (i.addEventListener("click", this.preventClick, !0),
        i.addEventListener("dblclick", this.preventClick, !0)) : (s.clearTimeout(this.removePreventClickId),
        this.removePreventClickId = null)
    }
    ,
    R.prototype.onTrackClick = function(e, t) {
        var i, s, l, r, o, n = this, a = (void 0 === t && (t = "y"),
        this.axis[t]);
        this.options.clickOnTrack && a.scrollbar.el && this.contentWrapperEl && (e.preventDefault(),
        i = W(this.el),
        this.axis[t].scrollbar.rect = a.scrollbar.el.getBoundingClientRect(),
        e = null != (a = null == (e = this.axis[t].scrollbar.rect) ? void 0 : e[this.axis[t].offsetAttr]) ? a : 0,
        a = parseInt(null != (a = null == (a = this.elStyles) ? void 0 : a[this.axis[t].sizeAttr]) ? a : "0px", 10),
        s = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
        l = ("y" === t ? this.mouseY - e : this.mouseX - e) < 0 ? -1 : 1,
        r = -1 === l ? s - a : s + a,
        (o = function() {
            n.contentWrapperEl && (-1 === l ? r < s && (s -= 40,
            n.contentWrapperEl[n.axis[t].scrollOffsetAttr] = s,
            i.requestAnimationFrame(o)) : s < r && (s += 40,
            n.contentWrapperEl[n.axis[t].scrollOffsetAttr] = s,
            i.requestAnimationFrame(o)))
        }
        )())
    }
    ,
    R.prototype.getContentElement = function() {
        return this.contentEl
    }
    ,
    R.prototype.getScrollElement = function() {
        return this.contentWrapperEl
    }
    ,
    R.prototype.removeListeners = function() {
        var e = W(this.el);
        this.el.removeEventListener("mouseenter", this.onMouseEnter),
        this.el.removeEventListener("pointerdown", this.onPointerEvent, !0),
        this.el.removeEventListener("mousemove", this.onMouseMove),
        this.el.removeEventListener("mouseleave", this.onMouseLeave),
        this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll),
        e.removeEventListener("resize", this.onWindowResize),
        this.mutationObserver && this.mutationObserver.disconnect(),
        this.resizeObserver && this.resizeObserver.disconnect(),
        this.onMouseMove.cancel(),
        this.onWindowResize.cancel(),
        this.onStopScrolling.cancel(),
        this.onMouseEntered.cancel()
    }
    ,
    R.prototype.unMount = function() {
        this.removeListeners()
    }
    ,
    R.prototype.isWithinBounds = function(e) {
        return this.mouseX >= e.left && this.mouseX <= e.left + e.width && this.mouseY >= e.top && this.mouseY <= e.top + e.height
    }
    ,
    R.prototype.findChild = function(e, t) {
        var i = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
        return Array.prototype.filter.call(e.children, function(e) {
            return i.call(e, t)
        })[0]
    }
    ,
    R.rtlHelpers = null,
    R.defaultOptions = {
        forceVisible: !1,
        clickOnTrack: !0,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: "scrollable content",
        tabIndex: 0,
        classNames: {
            contentEl: "simplebar-content",
            contentWrapper: "simplebar-content-wrapper",
            offset: "simplebar-offset",
            mask: "simplebar-mask",
            wrapper: "simplebar-wrapper",
            placeholder: "simplebar-placeholder",
            scrollbar: "simplebar-scrollbar",
            track: "simplebar-track",
            heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
            heightAutoObserverEl: "simplebar-height-auto-observer",
            visible: "simplebar-visible",
            horizontal: "simplebar-horizontal",
            vertical: "simplebar-vertical",
            hover: "simplebar-hover",
            dragging: "simplebar-dragging",
            scrolling: "simplebar-scrolling",
            scrollable: "simplebar-scrollable",
            mouseEntered: "simplebar-mouse-entered"
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: !0
    },
    R.getOptions = e,
    R.helpers = t,
    R)
      , T = (e = C.helpers).getOptions
      , D = e.addClasses
      , t = e.canUseDOM
      , e = (s => {
        function l() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            var i = s.apply(this, e) || this;
            return l.instances.set(e[0], i),
            i
        }
        var e = l
          , t = s;
        if ("function" != typeof t && null !== t)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function i() {
            this.constructor = e
        }
        return r(e, t),
        e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype,
        new i),
        l.initDOMLoadedElements = function() {
            document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements),
            window.removeEventListener("load", this.initDOMLoadedElements),
            Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), function(e) {
                "init" === e.getAttribute("data-simplebar") || l.instances.has(e) || new l(e,T(e.attributes))
            })
        }
        ,
        l.removeObserver = function() {
            var e;
            null != (e = l.globalObserver) && e.disconnect()
        }
        ,
        l.prototype.initDOM = function() {
            var e, t, i = this;
            if (!Array.prototype.filter.call(this.el.children, function(e) {
                return e.classList.contains(i.classNames.wrapper)
            }).length) {
                for (this.wrapperEl = document.createElement("div"),
                this.contentWrapperEl = document.createElement("div"),
                this.offsetEl = document.createElement("div"),
                this.maskEl = document.createElement("div"),
                this.contentEl = document.createElement("div"),
                this.placeholderEl = document.createElement("div"),
                this.heightAutoObserverWrapperEl = document.createElement("div"),
                this.heightAutoObserverEl = document.createElement("div"),
                D(this.wrapperEl, this.classNames.wrapper),
                D(this.contentWrapperEl, this.classNames.contentWrapper),
                D(this.offsetEl, this.classNames.offset),
                D(this.maskEl, this.classNames.mask),
                D(this.contentEl, this.classNames.contentEl),
                D(this.placeholderEl, this.classNames.placeholder),
                D(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl),
                D(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl); this.el.firstChild; )
                    this.contentEl.appendChild(this.el.firstChild);
                this.contentWrapperEl.appendChild(this.contentEl),
                this.offsetEl.appendChild(this.contentWrapperEl),
                this.maskEl.appendChild(this.offsetEl),
                this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl),
                this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
                this.wrapperEl.appendChild(this.maskEl),
                this.wrapperEl.appendChild(this.placeholderEl),
                this.el.appendChild(this.wrapperEl),
                null != (e = this.contentWrapperEl) && e.setAttribute("tabindex", this.options.tabIndex.toString()),
                null != (e = this.contentWrapperEl) && e.setAttribute("role", "region"),
                null != (e = this.contentWrapperEl) && e.setAttribute("aria-label", this.options.ariaLabel)
            }
            this.axis.x.track.el && this.axis.y.track.el || (e = document.createElement("div"),
            t = document.createElement("div"),
            D(e, this.classNames.track),
            D(t, this.classNames.scrollbar),
            e.appendChild(t),
            this.axis.x.track.el = e.cloneNode(!0),
            D(this.axis.x.track.el, this.classNames.horizontal),
            this.axis.y.track.el = e.cloneNode(!0),
            D(this.axis.y.track.el, this.classNames.vertical),
            this.el.appendChild(this.axis.x.track.el),
            this.el.appendChild(this.axis.y.track.el)),
            C.prototype.initDOM.call(this),
            this.el.setAttribute("data-simplebar", "init")
        }
        ,
        l.prototype.unMount = function() {
            C.prototype.unMount.call(this),
            l.instances.delete(this.el)
        }
        ,
        l.initHtmlApi = function() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this),
            "undefined" != typeof MutationObserver && (this.globalObserver = new MutationObserver(l.handleMutations),
            this.globalObserver.observe(document, {
                childList: !0,
                subtree: !0
            })),
            "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements),
            window.addEventListener("load", this.initDOMLoadedElements))
        }
        ,
        l.handleMutations = function(e) {
            e.forEach(function(e) {
                e.addedNodes.forEach(function(e) {
                    1 === e.nodeType && (e.hasAttribute("data-simplebar") ? !l.instances.has(e) && document.documentElement.contains(e) && new l(e,T(e.attributes)) : e.querySelectorAll("[data-simplebar]").forEach(function(e) {
                        "init" !== e.getAttribute("data-simplebar") && !l.instances.has(e) && document.documentElement.contains(e) && new l(e,T(e.attributes))
                    }))
                }),
                e.removedNodes.forEach(function(e) {
                    var t;
                    1 === e.nodeType && ("init" === e.getAttribute("data-simplebar") ? document.documentElement.contains(e) || null != (t = l.instances.get(e)) && t.unMount() : Array.prototype.forEach.call(e.querySelectorAll('[data-simplebar="init"]'), function(e) {
                        document.documentElement.contains(e) || null != (e = l.instances.get(e)) && e.unMount()
                    }))
                })
            })
        }
        ,
        l.instances = new WeakMap,
        l
    }
    )(C);
    function R(e, t) {
        void 0 === t && (t = {});
        var o = this;
        if (this.removePreventClickId = null,
        this.minScrollbarWidth = 20,
        this.stopScrollDelay = 175,
        this.isScrolling = !1,
        this.isMouseEntering = !1,
        this.isDragging = !1,
        this.scrollXTicking = !1,
        this.scrollYTicking = !1,
        this.wrapperEl = null,
        this.contentWrapperEl = null,
        this.contentEl = null,
        this.offsetEl = null,
        this.maskEl = null,
        this.placeholderEl = null,
        this.heightAutoObserverWrapperEl = null,
        this.heightAutoObserverEl = null,
        this.rtlHelpers = null,
        this.scrollbarWidth = 0,
        this.resizeObserver = null,
        this.mutationObserver = null,
        this.elStyles = null,
        this.isRtl = null,
        this.mouseX = 0,
        this.mouseY = 0,
        this.onMouseMove = function() {}
        ,
        this.onWindowResize = function() {}
        ,
        this.onStopScrolling = function() {}
        ,
        this.onMouseEntered = function() {}
        ,
        this.onScroll = function() {
            var e = W(o.el);
            o.scrollXTicking || (e.requestAnimationFrame(o.scrollX),
            o.scrollXTicking = !0),
            o.scrollYTicking || (e.requestAnimationFrame(o.scrollY),
            o.scrollYTicking = !0),
            o.isScrolling || (o.isScrolling = !0,
            N(o.el, o.classNames.scrolling)),
            o.showScrollbar("x"),
            o.showScrollbar("y"),
            o.onStopScrolling()
        }
        ,
        this.scrollX = function() {
            o.axis.x.isOverflowing && o.positionScrollbar("x"),
            o.scrollXTicking = !1
        }
        ,
        this.scrollY = function() {
            o.axis.y.isOverflowing && o.positionScrollbar("y"),
            o.scrollYTicking = !1
        }
        ,
        this._onStopScrolling = function() {
            L(o.el, o.classNames.scrolling),
            o.options.autoHide && (o.hideScrollbar("x"),
            o.hideScrollbar("y")),
            o.isScrolling = !1
        }
        ,
        this.onMouseEnter = function() {
            o.isMouseEntering || (N(o.el, o.classNames.mouseEntered),
            o.showScrollbar("x"),
            o.showScrollbar("y"),
            o.isMouseEntering = !0),
            o.onMouseEntered()
        }
        ,
        this._onMouseEntered = function() {
            L(o.el, o.classNames.mouseEntered),
            o.options.autoHide && (o.hideScrollbar("x"),
            o.hideScrollbar("y")),
            o.isMouseEntering = !1
        }
        ,
        this._onMouseMove = function(e) {
            o.mouseX = e.clientX,
            o.mouseY = e.clientY,
            (o.axis.x.isOverflowing || o.axis.x.forceVisible) && o.onMouseMoveForAxis("x"),
            (o.axis.y.isOverflowing || o.axis.y.forceVisible) && o.onMouseMoveForAxis("y")
        }
        ,
        this.onMouseLeave = function() {
            o.onMouseMove.cancel(),
            (o.axis.x.isOverflowing || o.axis.x.forceVisible) && o.onMouseLeaveForAxis("x"),
            (o.axis.y.isOverflowing || o.axis.y.forceVisible) && o.onMouseLeaveForAxis("y"),
            o.mouseX = -1,
            o.mouseY = -1
        }
        ,
        this._onWindowResize = function() {
            o.scrollbarWidth = o.getScrollbarWidth(),
            o.hideNativeScrollbar()
        }
        ,
        this.onPointerEvent = function(e) {
            var t, i;
            o.axis.x.track.el && o.axis.y.track.el && o.axis.x.scrollbar.el && o.axis.y.scrollbar.el && (o.axis.x.track.rect = o.axis.x.track.el.getBoundingClientRect(),
            o.axis.y.track.rect = o.axis.y.track.el.getBoundingClientRect(),
            (o.axis.x.isOverflowing || o.axis.x.forceVisible) && (t = o.isWithinBounds(o.axis.x.track.rect)),
            (o.axis.y.isOverflowing || o.axis.y.forceVisible) && (i = o.isWithinBounds(o.axis.y.track.rect)),
            t || i) && (e.stopPropagation(),
            "pointerdown" === e.type) && "touch" !== e.pointerType && (t && (o.axis.x.scrollbar.rect = o.axis.x.scrollbar.el.getBoundingClientRect(),
            o.isWithinBounds(o.axis.x.scrollbar.rect) ? o.onDragStart(e, "x") : o.onTrackClick(e, "x")),
            i) && (o.axis.y.scrollbar.rect = o.axis.y.scrollbar.el.getBoundingClientRect(),
            o.isWithinBounds(o.axis.y.scrollbar.rect) ? o.onDragStart(e, "y") : o.onTrackClick(e, "y"))
        }
        ,
        this.drag = function(e) {
            var t, i, s, l, r;
            o.draggedAxis && o.contentWrapperEl && (t = null != (t = null == (t = (r = o.axis[o.draggedAxis].track).rect) ? void 0 : t[o.axis[o.draggedAxis].sizeAttr]) ? t : 0,
            i = o.axis[o.draggedAxis].scrollbar,
            s = null != (s = null == (s = o.contentWrapperEl) ? void 0 : s[o.axis[o.draggedAxis].scrollSizeAttr]) ? s : 0,
            l = parseInt(null != (l = null == (l = o.elStyles) ? void 0 : l[o.axis[o.draggedAxis].sizeAttr]) ? l : "0px", 10),
            e.preventDefault(),
            e.stopPropagation(),
            e = ("y" === o.draggedAxis ? e.pageY : e.pageX) - (null != (e = null == (e = r.rect) ? void 0 : e[o.axis[o.draggedAxis].offsetAttr]) ? e : 0) - o.axis[o.draggedAxis].dragOffset,
            r = (e = "x" === o.draggedAxis && o.isRtl ? (null != (r = null == (r = r.rect) ? void 0 : r[o.axis[o.draggedAxis].sizeAttr]) ? r : 0) - i.size - e : e) / (t - i.size) * (s - l),
            "x" === o.draggedAxis && o.isRtl && (r = null != (e = R.getRtlHelpers()) && e.isScrollingToNegative ? -r : r),
            o.contentWrapperEl[o.axis[o.draggedAxis].scrollOffsetAttr] = r)
        }
        ,
        this.onEndDrag = function(e) {
            o.isDragging = !1;
            var t = M(o.el)
              , i = W(o.el);
            e.preventDefault(),
            e.stopPropagation(),
            L(o.el, o.classNames.dragging),
            o.onStopScrolling(),
            t.removeEventListener("mousemove", o.drag, !0),
            t.removeEventListener("mouseup", o.onEndDrag, !0),
            o.removePreventClickId = i.setTimeout(function() {
                t.removeEventListener("click", o.preventClick, !0),
                t.removeEventListener("dblclick", o.preventClick, !0),
                o.removePreventClickId = null
            })
        }
        ,
        this.preventClick = function(e) {
            e.preventDefault(),
            e.stopPropagation()
        }
        ,
        this.el = e,
        this.options = p(p({}, R.defaultOptions), t),
        this.classNames = p(p({}, R.defaultOptions.classNames), t.classNames),
        this.axis = {
            x: {
                scrollOffsetAttr: "scrollLeft",
                sizeAttr: "width",
                scrollSizeAttr: "scrollWidth",
                offsetSizeAttr: "offsetWidth",
                offsetAttr: "left",
                overflowAttr: "overflowX",
                dragOffset: 0,
                isOverflowing: !0,
                forceVisible: !1,
                track: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1
                },
                scrollbar: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1
                }
            },
            y: {
                scrollOffsetAttr: "scrollTop",
                sizeAttr: "height",
                scrollSizeAttr: "scrollHeight",
                offsetSizeAttr: "offsetHeight",
                offsetAttr: "top",
                overflowAttr: "overflowY",
                dragOffset: 0,
                isOverflowing: !0,
                forceVisible: !1,
                track: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1
                },
                scrollbar: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1
                }
            }
        },
        "object" != typeof this.el || !this.el.nodeName)
            throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
        this.onMouseMove = ( (e, t) => {
            var i = !0
              , s = !0;
            if ("function" != typeof e)
                throw new TypeError("Expected a function");
            return g(t) && (i = "leading"in t ? !!t.leading : i,
            s = "trailing"in t ? !!t.trailing : s),
            d(e, 64, {
                leading: i,
                maxWait: 64,
                trailing: s
            })
        }
        )(this._onMouseMove),
        this.onWindowResize = d(this._onWindowResize, 64, {
            leading: !0
        }),
        this.onStopScrolling = d(this._onStopScrolling, this.stopScrollDelay),
        this.onMouseEntered = d(this._onMouseEntered, this.stopScrollDelay),
        this.init()
    }
    return t && e.initHtmlApi(),
    e
}
)();

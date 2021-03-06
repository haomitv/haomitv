(function(e, t, n, r) {
    "use strict";
    var i = [],
        s = [],
        o = [],
        u = 0,
        a = t.location.hash,
        f = false,
        l,
        c = e(t).scrollTop(),
        h = false,
        p = {
            section: "section",
            sectionName: "section-name",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: true,
            axis: "y",
            target: "html,body",
            before: function() {},
            after: function() {}
        };
    e.scrollify = function(r) {
        function d(n) {
            if (s[n]) {
                p.before(n, o);
                if (p.sectionName) {
                    t.location.hash = s[n]
                }
                e(p.target).stop().animate({
                        scrollTop: i[n]
                    },
                    p.scrollSpeed, p.easing);
                e(p.target).promise().done(function() {
                    p.after(n, o)
                })
            }
        }
        var v = {
            handleMousedown: function() {
                h = false
            },
            handleMouseup: function() {
                h = true
            },
            handleScroll: function() {
                if (l) {
                    clearTimeout(l)
                }
                l = setTimeout(function() {
                        c = e(t).scrollTop();
                        if (h == false) {
                            return false
                        }
                        h = false;
                        var n = 1,
                            r = i.length,
                            s = 0,
                            o = Math.abs(i[0] - c),
                            a;
                        for (; n < r; n++) {
                            a = Math.abs(i[n] - c);
                            if (a < o) {
                                o = a;
                                s = n
                            }
                        }
                        u = s;
                        d(s)
                    },
                    200)
            },
            wheelHandler: function(e, t) {
                // e.preventDefault();
                t = t || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;
                if (l) {
                    clearTimeout(l)
                }
                l = setTimeout(function() {
                        if (t < 0) {
                            if (u < i.length - 1) {
                                u++
                            }
                        } else if (t > 0) {
                            if (u > 0) {
                                u--
                            }
                        }
                        if (u >= 0) {
                            d(u)
                        } else {
                            u = 0
                        }
                    },
                    25)
            },
            keyHandler: function(e) {
                // e.preventDefault();
                if (e.keyCode == 38) {
                    if (u > 0) {
                        u--
                    }
                    d(u)
                } else if (e.keyCode == 40) {
                    if (u < i.length - 1) {
                        u++
                    }
                    d(u)
                }
            },
            init: function() {
                if (p.scrollbars) {
                    e(t).bind("mousedown", v.handleMousedown);
                    e(t).bind("mouseup", v.handleMouseup);
                    e(t).bind("scroll", v.handleScroll)
                } else {
                    e("body").css({
                        overflow: "hidden"
                    })
                }
                e(n).bind("DOMMouseScroll mousewheel", v.wheelHandler);
                e(n).bind("keyup", v.keyHandler)
            }
        };
        var m = {
            touches: {
                touchstart: {
                    y: -1
                },
                touchmove: {
                    y: -1
                },
                touchend: false,
                direction: "undetermined"
            },
            options: {
                distance: 30,
                timeGap: 800,
                timeStamp: (new Date).getTime()
            },
            touchHandler: function(e) {
                var t;
                if (typeof e !== "undefined") {
                    // e.preventDefault();
                    if (typeof e.touches !== "undefined") {
                        t = e.touches[0];
                        switch (e.type) {
                            case "touchstart":
                                m.options.timeStamp = (new Date).getTime();
                                m.touches.touchend = false;
                            case "touchmove":
                                m.touches[e.type].y = t.pageY;
                                if (m.options.timeStamp + m.options.timeGap < (new Date).getTime() && m.touches.touchend == false) {
                                    m.touches.touchend = true;
                                    if (m.touches.touchstart.y > -1) {
                                        if (Math.abs(m.touches.touchmove.y - m.touches.touchstart.y) > m.options.distance) {
                                            if (m.touches.touchstart.y < m.touches.touchmove.y) {
                                                if (u > 0) {
                                                    u--
                                                }
                                                d(u)
                                            } else {
                                                if (u < i.length - 1) {
                                                    u++
                                                }
                                                d(u)
                                            }
                                        }
                                    }
                                }
                                break;
                            case "touchend":
                                if (m.touches[e.type] == false) {
                                    m.touches[e.type] = true;
                                    if (m.touches.touchstart.y > -1) {
                                        if (Math.abs(m.touches.touchmove.y - m.touches.touchstart.y) > m.options.distance) {
                                            if (m.touches.touchstart.y < m.touches.touchmove.y) {
                                                if (u > 0) {
                                                    u--
                                                }
                                                d(u)
                                            } else {
                                                if (u < i.length - 1) {
                                                    u++
                                                }
                                                d(u)
                                            }
                                        }
                                    }
                                };
                            default:
                                break
                        }
                    }
                }
            },
            init: function() {
                if (n.addEventListener) {
                    n.addEventListener("touchstart", m.touchHandler, false);
                    n.addEventListener("touchmove", m.touchHandler, false);
                    n.addEventListener("touchend", m.touchHandler, false)
                }
            }
        };
        if (typeof r === "string") {
            var g = s.length;
            for (; g >= 0; g--) {
                if (typeof arguments[1] === "string") {
                    if (s[g] == arguments[1]) {
                        u = g;
                        d(g)
                    }
                } else {
                    if (g == arguments[1]) {
                        u = g;
                        d(g)
                    }
                }
            }
        } else {
            p = e.extend(p, r);
            e(p.section).each(function(t) {
                if (t > 0) {
                    i[t] = e(this).offset().top + p.offset
                } else {
                    i[t] = e(this).offset().top
                }
                if (p.sectionName && e(this).data(p.sectionName)) {
                    // s[t] = "#" + e(this).data(p.sectionName).replace(/ /g, "-")
                    s[t] = ""
                } else {
                    // s[t] = "#" + (t + 1)
                    s[t] = ""
                }
                o[t] = e(this);
                if (a == s[t]) {
                    u = t;
                    f = true
                }
            });
            if (f == false && p.sectionName) {
                t.location.hash = s[0]
            } else {
                d(u)
            }
            v.init();
            m.init()
        }
    }
})(jQuery, this, document)
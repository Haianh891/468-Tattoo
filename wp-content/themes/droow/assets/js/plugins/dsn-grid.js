var $ = jQuery,
    wind = jQuery(window),
    body = jQuery("body"),
    dsnGrid = {
        backgroundPosition: function(e, t, n) {
            var o, i, r, a, s;
            return e instanceof jQuery == !1 && (e = jQuery(e)), n = this.getUndefinedVal(n, {}), o = this.getUndefinedVal(n.sizeX, "105%"), i = this.getUndefinedVal(n.sizeY, "105%"), a = this.getUndefinedVal(n.left, "-5%"), s = this.getUndefinedVal(n.top, "-5%"), r = this.getUndefinedVal(n.move, 100), e.css({
                width: o,
                height: i,
                left: a,
                top: s,
                backgroundPositionX: "calc(50% - " + -2 * r + "px)",
                backgroundPositionY: "calc(50% - " + -2 * r + "px)"
            }), t = this.getUndefinedVal(t, 1), e.parent().on("mousemove", function(o) {
                if (void 0 !== n.dataActive && jQuery(this).find(e).hasClass(n.dataActive)) return !1;
                var i = o.clientX / jQuery(this).width() - .5,
                    a = o.clientY / jQuery(this).height() - .5;
                TweenLite.to(jQuery(this).find(e), t, {
                    transformPerspective: 100,
                    x: r * i + r + " ",
                    y: r * a + r + ""
                }), void 0 !== n.onEnter && n.onEnter(jQuery(this), o)
            }).on("mouseleave", function(o) {
                TweenMax.to(jQuery(this).find(e), t, {
                    x: r,
                    y: r,
                    ease: Back.easeOut.config(4)
                }), void 0 !== n.onLeave && n.onLeave(jQuery(this), o)
            }), dsnGrid
        },
        parallaxIt: function(e, t, n, o) {
            if (!(t.length <= 0)) {
                var i = t[0].getBoundingClientRect(),
                    r = e.pageX - i.left,
                    a = e.pageY - i.top,
                    s = window.pageYOffset || document.documentElement.scrollTop;
                o = this.getUndefinedVal(o, .3), n = this.getUndefinedVal(n, -1), TweenMax.to(t, o, {
                    x: (r - i.width / 2) / i.width * n,
                    y: (a - i.height / 2 - s) / i.width * n,
                    ease: Power0.easeOut
                })
            }
        },
        scaleIt: function(e, t, n) {
            if (void 0 === t) return !1;
            var o = 0;
            o = body.hasClass("dsn-effect-scroll") ? e.scrollTop : e.scrollTop();
            var i, r, a;
            a = this.getUndefinedVal(n.plus, 0), i = this.getUndefinedVal(n.position, !1);
            var s = t.offset();
            r = void 0 === s || body.hasClass("dsn-effect-scroll") ? 0 : s.top, i && (r -= o);
            return o / (t.height() + r + a)
        },
        scrollerIt: function(e, t, n) {
            if (void 0 === t) return !1;
            var o, i, r, a = e.scrollTop();
            r = this.getUndefinedVal(n.duration, 0), i = this.getUndefinedVal(n.plus, 0);
            var s = t.offset();
            o = void 0 !== s ? s.top : 0, o += r;
            var d = t.height() + o + i;
            if (o <= a && void 0 !== n.action) {
                var l = o - a,
                    c = l / d,
                    f = a / (t.height() + o + i);
                n.action({
                    scroll: l,
                    position: c,
                    targetEnd: d,
                    ScrollTop: a,
                    num: f
                })
            }
            return f
        },
        setPositionMoveSection: function(e, t, n) {
            if (void 0 !== e) {
                var o = e.offset(),
                    i = void 0 === o ? 0 : o.top;
                t = dsnGrid.getUndefinedVal(t, 2), n = dsnGrid.getUndefinedVal(n, 0);
                var r = (e.innerHeight() + i + n) / 2;
                e.css({
                    marginBottom: r / t * -1
                })
            }
        },
        scrollTop: function(e, t, n, o) {
            t = dsnGrid.getUndefinedVal(t, 500), n = dsnGrid.getUndefinedVal(n, 0);
            var i = 0;
            "number" == typeof e ? i = e : (e instanceof jQuery == !1 && (e = jQuery(e)), void 0 !== (i = e.offset()) && (i = i.top)), jQuery("html, body").animate({
                scrollTop: i + n
            }, t, o)
        },
        getUndefinedVal: function(e, t) {
            return void 0 === e ? t : e
        },
        getData: function(e, t, n) {
            return (e = this.convertToJQuery(e)).length <= 0 ? n : this.getUndefinedVal(this.removeAttr(e, "data-dsn-" + t), n)
        },
        mouseMove: function(e, t, n) {
            jQuery(window);
            var o = jQuery("body");
            if (dsnGrid.getUndefinedVal(o.data("dsn-mousemove"), !1) && void 0 !== e && !(e.length <= 0) && null !== e) {
                o.addClass("dsn-mousemove"), e instanceof jQuery == !1 && (e = jQuery(e));
                var i = e,
                    r = !1;
                o.on("mousemove", function(e) {
                    TweenMax.to(i, .5, {
                        left: e.clientX,
                        top: e.clientY
                    }), void 0 !== t && void 0 !== t.onUpdate && t.onUpdate(e, e.pageX, e.pageY, i), void 0 !== t && void 0 !== t.onComplete && (r = !0, dsnGrid.endAnimate(i, function(e) {
                        r && t.onComplete(e, i), r = !1
                    }))
                })
            }
        },
        endAnimate: function(e, t) {
            void 0 !== t && null !== t && e.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(e) {
                t(e)
            })
        },
        mouseWheel: function(e, t, n) {
            e.bind("mousewheel DOMMouseScroll", function(e) {
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? void 0 !== n && n(e) : void 0 !== t && t(e)
            })
        },
        numberText: function(e) {
            return e < 10 && e > 0 ? "0" + e : e
        },
        convertTextLine: function(e, t) {
            var n = e.html().trim(),
                o = "";
            e.html("");
            for (var i = 0; i < n.length; i++) 0 === i && (o += '<div class="dsn-word-wrapper">'), " " !== n.charAt(i) ? o += '<span class="dsn-chars-wrapper">' + n.charAt(i) + "</span>" : o += "</div>" + n.charAt(i) + '<div class="dsn-word-wrapper">';
            o += "</div>", t.append(o)
        },
        randomObjectArray: function(e, t) {
            let n = this.getUndefinedVal(t, 100);
            return e.sort(function() {
                return Math.round(Math.random()) * n
            })
        },
        convertTextWord: function(e, t, n) {
            var o = e.html().trim().split(" "),
                i = "";
            e.html("");
            for (var r = 0; r < o.length; r++)
                if (o[r].length > 0) {
                    if (i += '<span class="dsn-wrapper">', n) {
                        i += '<span class="dsn-word-wrapper">';
                        for (var a = 0; a < o[r].length; a++) i += '<span class="dsn-chars-wrapper">' + o[r].charAt(a) + "</span>";
                        i += "</span>"
                    } else i += '<span class="dsn-word-wrapper">' + o[r] + "</span>";
                    i += "</span>"
                }
            t.append(i)
        },
        getRndInteger: function(e, t) {
            return Math.floor(Math.random() * (t - e)) + e
        },
        pageLoad: function(e, t, n, o) {
            var i = window.performance.timing,
                r = -1 * (i.loadEventEnd - i.navigationStart) / 1e3 % 50 * 10,
                a = e,
                s = t > e ? 1 : -1,
                d = Math.abs(Math.floor((r + n) / 100)),
                l = setInterval(function() {
                    o(a += s), a >= t && clearInterval(l)
                }, d);
            return l
        },
        embedVideo: function(e) {
            jQuery("[data-dsn-video]").each(function(e) {
                var t = jQuery(this),
                    n = dsnGrid.removeAttr(t, "data-dsn-video");
                t.on("click", function() {
                    t.addClass("dsn-video"), t.html('<div class="dsn-iframe-player">' + n + "</div>"), dsnGrid.scrollTop(t, 1600, -100)
                })
            })
        },
        removeAttr: function(e, t) {
            if (void 0 !== e && void 0 !== t) {
                var n = e.attr(t);
                return void 0 !== n && e.removeAttr(t), n
            }
        },
        moveIcon: function(e, t) {
            e.on("mousemove", function(n) {
                var o = "top .15s ease-out,left .15s ease-out";
                t.css({
                    "-webkit-transition": o,
                    "-moz-transition": o,
                    "-ms-transition": o,
                    "-o-transition": o,
                    transition: o,
                    "pointer-events": "none"
                });
                var i = n.pageX,
                    r = n.pageY - jQuery(this).offset().top;
                r > 0 && r < jQuery(this).height() && jQuery(this).offset().left < i && i < e.width() ? t.css({
                    left: i,
                    top: r
                }) : TweenMax.to(t, .5, {
                    left: "50%",
                    top: "50%"
                })
            }).on("mouseleave", function() {
                TweenMax.to(t, .5, {
                    left: "50%",
                    top: "50%"
                })
            })
        },
        parallaxMoveElemnt: function(e, t, n, o, i) {
            var r = e,
                a = e;
            if (void 0 !== e.target && (r = e.target, a = void 0 !== e.element ? e.element : e.target), !(a.length <= 0)) {
                n = void 0 === n ? .5 : parseFloat(n), t = void 0 === t ? 20 : parseFloat(t), i = void 0 !== i && i;
                var s = $('<div class="icon-circle"></div>');
                r.append(s), r.off("mouseleave"), r.off("mouseenter"), r.off("mousemove"), r.on("mouseleave", function(e) {
                    var t = {
                        x: 0,
                        y: 0,
                        ease: Back.easeOut.config(4)
                    };
                    i && (t.scale = 1);
                    var n = [a, s];
                    void 0 !== o && n.push(o), TweenMax.to(n, 1, t)
                }).on("mouseenter", function(e) {
                    var t = {
                        transformOrigin: "0 0"
                    };
                    i && (t.scale = "1.03"), TweenMax.to([a, s], .3, t)
                }).on("mousemove", function(e) {
                    dsnGrid.parallaxIt(e, a, t), dsnGrid.parallaxIt(e, s, 2 * t), void 0 !== o && dsnGrid.parallaxIt(e, o, -5, .5)
                })
            }
        },
        parallaxMoveElemntCir: function(e, t, n, o, i) {
            var r = e,
                a = this;
            n = void 0 === n ? .5 : parseFloat(n), t = void 0 === t ? 20 : parseFloat(t), i = void 0 !== i && i;
            var s = r.html(),
                d = $('<div class="icon-circle"></div>'),
                l = $('<div class="dsn-grid-parallax">' + s + "</div>");
            r.html(""), r.append(d), r.append(l), r.on("mouseleave", function(e) {
                TweenMax.to(r, n, {
                    scale: 1
                }), TweenMax.to(l, .3, {
                    scale: 1,
                    x: 0,
                    y: 0
                }), TweenMax.to(d, n, {
                    scale: 1,
                    x: 0,
                    y: 0
                })
            }).on("mouseenter", function(e) {
                TweenMax.to(r, n, {
                    transformOrigin: "0 0",
                    scale: 1
                }), TweenMax.to(d, n, {
                    scale: 1.2
                })
            }).on("mousemove", function(e) {
                a.parallaxIt(e, l, t), dsnGrid.parallaxIt(e, d, t)
            })
        },
        elementHover: function(e, t, n) {
            e instanceof jQuery == !1 && (e = jQuery(e)), t instanceof jQuery == !1 && (t = jQuery(t)), t.on("mouseenter", function() {
                e.addClass(n)
            }).on("mouseleave", function() {
                e.removeClass(n)
            })
        },
        changeSizeText: function(e, t) {
            e instanceof jQuery == !1 && (e = jQuery(e)), e.each(function() {
                var e = jQuery(this);
                for (var n in t) e.text().length >= parseInt(n) && (console.log(t[n]), e.css(t[n]))
            })
        },
        convertToJQuery: function(e) {
            return e instanceof jQuery == !1 ? jQuery(e) : e
        },
        animateText: function(e, t, n, o) {
            function i() {
                t.each(function() {
                    let e = $(this);
                    if (e.hasClass(r)) return;
                    let t = e.offset().top;
                    void 0 !== t && a > t - (wind.height() - 100) && (e.hasClass(r) || e.addClass(r))
                })
            }(t = this.convertToJQuery(t)).each(function() {
                let e = $(this);
                dsnGrid.convertTextWord(e, e), void 0 !== n && e.attr(n, "animate"), void 0 !== o && e.removeClass(o), e.addClass("dsn-has-animate-text")
            });
            const r = "dsn-animate";
            var a = 0,
                s = null;
            e.getListener(function(e) {
                a = void 0 === e.offset ? wind.scrollTop() : 0, s && clearTimeout(s), s = setTimeout(i, 10)
            })
        },
        imageLoad: function() {
            const e = $('[data-dsn-loader="div"]');
            e.each(function() {
                $(this).append('<div class="wait-loader"><div class="loader-inner"><div class="loader-circle"><div class="loader-layer"></div></div></div></div>')
            });
            e.imagesLoaded({
                background: ".dsn-img-org"
            }).progress(function(e, t) {
                let n = $(t.element).parents('[data-dsn-loader="div"]');
                n.length > 0 && (n.addClass("dsn-img-loader-done dsn-animate"), n.attr("data-dsn-loader", "divFinshed"))
            })
        },
        getBoundingClientRect: function(e) {
            const t = e.getBoundingClientRect();
            return {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.width,
                height: t.height,
                x: t.x,
                y: t.y
            }
        },
        tweenMaxParallax: function(e, t) {
            if (void 0 === e) return !1;
            t = t || new ScrollMagic.Controller;
            var n = [],
                o = this;
            return {
                clearControl: function() {
                    void 0 !== t && t.destroy(), t = new ScrollMagic.Controller
                },
                getControl: function() {
                    return t
                },
                addParrlax: function(i) {
                    if (void 0 === i.id) return !1;
                    i.reverse = o.getUndefinedVal(i.reverse, !0);
                    let r = o.convertToJQuery(i.id);
                    if (void 0 !== i.replace && r.data("dsn-grid", i.replace), !0 === i.remove && r.removeData("dsn-grid"), void 0 !== i.tween && i.tween._totalDuration <= 0) return !1;
                    var a = new ScrollMagic.Scene({
                        triggerElement: r.get(0),
                        triggerHook: o.getUndefinedVal(i.triggerHook, 0),
                        duration: o.getUndefinedVal(i.duration, "100%"),
                        offset: o.getUndefinedVal(i.offset, 0),
                        reverse: i.reverse
                    });
                    return void 0 !== i.tween && i.reverse && a.setTween(i.tween), void 0 !== i.toggle && a.setClassToggle(i.toggle.element, i.toggle.classes), a.addTo(t), !0 === i._fixed && (a.setPin(r.get(0)), e.getListener(function() {
                        var t = !1;
                        a.on("enter", function() {
                            t = !0
                        }), a.on("leave", function() {
                            t = !1, TweenMax.set(r.get(0), {
                                y: 0
                            })
                        }), e.getListener(function(n) {
                            t && TweenMax.set(r.get(0), {
                                y: e.getScrollbar().offset.y
                            })
                        })
                    }, !0)), !0 === i.refreshParallax && e.getListener(function() {
                        a.refresh()
                    }, !0), !1 === i.reverse && a.on("enter", function() {
                        void 0 !== i.tween && i.tween.play(), t.removeScene(a), setTimeout(function() {
                            a.destroy(!0), a = null, i.tween = null, void 0 !== i.toggle && o.convertToJQuery(i.toggle.element).addClass(i.toggle.classes)
                        }, 300)
                    }), n.push(a), a
                },
                refresh: function(e) {
                    void 0 !== e && e.getListener(function() {
                        for (let e of n) e.refresh()
                    }, !0)
                }
            }
        },
        progressCircle: function(e) {
            const t = $('[data-dsn-grid="progress-circle"]'),
                n = this.removeAttr(t, "data-dsn-grid-stroke");
            var o = void 0 === n ? "" : 'stroke="' + n + '"';
            t.css({
                position: "fixed",
                right: "-60px",
                bottom: "60px",
                width: "52px",
                height: "52px",
                "z-index": "99999999"
            }), t.append('<svg class="dsn-progress-circle-up" width="100%" height="100%" ' + o + ' viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" fill="none">\n        <path class="dsn-progress-path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition:  stroke-dashoffset 300ms linear 0s;stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 309;"></path>    </svg>');
            var i = wind;
            e.isScroller(!0) && (i = e.getScrollbar()), e.getListener(function(e) {
                let n = 0,
                    o = $(document).height() - wind.height();
                void 0 === e.offset ? n = wind.scrollTop() : (n = e.offset.y, o = $(document).height() - i.getSize().content.height + 100), n > 70 ? (TweenMax.to(t, 1, {
                    ease: Back.easeOut.config(4),
                    right: 60
                }), t.find(".dsn-progress-path").css("stroke-dashoffset", 300 - Math.round(300 * n / o) + "%")) : TweenMax.to(t, 1, {
                    ease: Back.easeIn.config(4),
                    right: -60
                })
            }), t.on("click", function() {
                e.isScroller(!0) ? i.scrollTo(0, 0, 600) : $("body,html").animate({
                    scrollTop: 0
                }, 300)
            })
        }
    };
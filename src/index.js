/**
 * Created by romanrajchert on 26.11.16.
 */



import $ from 'jquery';
//import TweenMax from 'gsap/src/uncompressed/TweenMax';
//import ScrollMagic from 'scrollmagic';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'bootstrap-loader';
import 'tether';
import 'particles.js';
import Vivus from 'vivus';
import inView from 'in-view';
import SVGInjector from 'svg-injector';
import './BetterOnScroll';
import Rellax from 'rellax';

var ProgressBar = require('progressbar.js');

require("imports-loader?this=>window!./typed.min.js");

window.onload = function () {
    $(".loader").removeClass("shown");
    $("body").addClass("loaded");
    $(".background-image").addClass("animated fadeInUp");
}


$(function(){
    /* Typed */
    $("header .heading").typed({
        strings: [ "<span class='name'>webdesigner</span>", "<span class='name'>Roman</span>"],
        typeSpeed: 65,
        // time before typing starts
        startDelay: 10,
        // backspacing speed
        backSpeed: 10,
        contentType: 'html',
        backDelay: 1500,
    });


    /!* Scroll spy *!/
    $('body').scrollspy({ target: '#navbar-complete' });


    /!* Particles Js*!/
    particlesJS.load('particles', 'assets/particles.json', function () {
    });
    $( window ).resize(function() {
        /!* ParticlesJS *!/
        particlesJS.load('particles', 'assets/particles.json', function () {
        });
    });

    document.onload = function () {
            $("body").addClass("loaded");
        }

    /* Smooth scroll */
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top,

                }, 1000, "swing");
                return false;
            }
        }
    });

    // menu open
    $(".navbar-toggler").on("click", function () {
        $(".navbar-toggleable-xs").toggleClass("is-opened");
    })


    //svg injection
    var mySVGsToInject = $('img.inject-svg');
    SVGInjector(mySVGsToInject,{
        each: function (svg) {
            $(svg).removeAttr("width");
            $(svg).removeAttr("height");
        }
    }, function () {
        inViewDesigns();
    });
/*

    $(window).scrolled(function() {
        var scrolled = $(".navbar").offset().top;
        console.log("scolled:",scrolled);
        if(scrolled > 50){
            $(".navbar").addClass("scrolled");
        }else{
            $(".navbar").removeClass("scrolled");
        }
    });

*/
    // menu scroll
    $(window).scroll(function () {
        menuScrolled();
    });
    menuScrolled();
    function menuScrolled() {
        var $navbar = $(".navbar");
        if ($navbar.offset().top > 50) {
            $navbar.addClass("scrolled");
        } else {
            $navbar.removeClass("scrolled");
        }
    }

    //
/*    new Vivus('webdesign-svg', {duration: 200,
        onReady: function (myVivus) {
            var textElement = document.getElementById("webdesign-svg");
            var texts = textElement.contentDocument.getElementsByTagName("tspan");

            for (var i = 0, len = texts.length; i < len; i++) {

                var element = texts[i];
                var text = element.innerHTML;
                element.innerHTML = "";

                $(element).typed({
                    strings: [text],
                    typeSpeed: 0,
                    // time before typing starts
                    startDelay: 10,
                    // backspacing speed
                    backSpeed: 10,
                    contentType: 'html',
                    backDelay: 1500,
                });
            }



        }}, function () {
        console.log("done");
    });*/


    /* Animate elements */
    inView(".animate")
        .on('enter', function (el) {
            var delay = $(el).data("animate-delay") || 0;
            //console.log(el,delay);

            setTimeout(function () {
                //$(el).addClass($(el).data("animate") + " animated");
                $(el).addClass("is-active");
            },delay);

        })
        .on('exit', el => {
            //el.style.opacity = 0.5;
        });


    var svgCount = 0;
        /* Animate svg */
        function inViewDesigns() {
            var vivus = null;
            inView(".webdesign")
                .on('enter', function (el) {
                    el = $(el).find(".animate-svg").get(0);

                    vivus = animateSvg(el);
                    //on vivus animation end


                })

                .on('exit', el => {
                    vivus.stop();
                });
        }

    function animateSvg(el) {

        console.log(el);
        var vivus = new Vivus(el, {duration: 200, start: "autostart"});
        var svgs = ["design","code","test"];

        vivus.play(1, function () {

            svgCount++;
            if (svgCount === 3) return 0;
                setTimeout(function () {
                var height = $("#about").outerHeight();
                console.log("height",height);
/*                $("#about").css("height",height);*/
                el.classList.add("is-hidden");
                $(".svg-headings " + "."+(svgCount) ).removeClass("active");
                $(".svg-headings " + "."+(svgCount+1) ).addClass("active");

                var svg = $(".webdesign").find("." + svgs[svgCount]).get(0);
                svg.classList.remove("is-hidden");
                 animateSvg(svg);
                 return vivus;
            },200 );

        })
        // animate texts
        var texts = el.getElementsByTagName("tspan");
        for (var i = 0, len = texts.length; i < len; i++) {
            var element = texts[i];
            var text = element.innerHTML;
            element.innerHTML = "";
            $(element).typed({
                strings: [text],
                typeSpeed: 1,
                // time before typing starts
                startDelay: 10,
                // backspacing speed
                backSpeed: 10,
                contentType: 'html',
                backDelay: 1500,
            });
        }
        return vivus;
    }



    //parallax
    





    /*


        var controller = new ScrollMagic.Controller();

        /!* Navbar *!/
        var tw1 = new TweenMax.to(".navbar", 1, { padding: ".5rem", force3D:true, backgroundColor: "#1c1e26"});
        var tw2 = new TweenMax.to(".nav-item a", 1, {padding: "0.4rem 0.6rem",force3D:true } );
        var timeline = new TimelineLite()
            .add([tw1,tw2], '+=0', 'start');

        var scene = new ScrollMagic.Scene({
            offset: 200, // start scene after scrolling for 100px
            duration: 50,
            //duration: 400 // pin the element for 400px of scrolling
        })  //.setClassToggle(".navbar", "scrolled")
            .setTween(timeline)

            .addIndicators({name: "navbar"})
            .addTo(controller);
    */

    /*var scene = new ScrollMagic.Scene({ duration: 200})
        .addTo(controller)
        .addIndicators() // add indicators (requires plugin)

        .on("update", function (e) {
           // $("#scrollDirection").text(e.target.controller().info("scrollDirection"));

            var scrollDirection = e.target.controller().info("scrollDirection");
            if(scrollDirection === "FORWARD" && $(window).scrollTop() > 200){
                $(".navbar").slideUp(1000);
            }else {
                $(".navbar").slideDown(1000);
            }
        })

        .on("progress", function (e) {

        });*/

        /* Nadpisy */
        /*
            $("h3.secondary").each(function (i) {
                var height= $(window).height();
                var newHeight = -(height/2);
                var tween = new TimelineMax ()
                    .add([
                        TweenMax.fromTo(this, 1, {scale: 1.3, autoAlpha: 0.1, top:100}, {top:-300,  autoAlpha: 0, ease: Linear.easeNone} ),
                        TweenMax.fromTo($(this).siblings(".line").get(0), 1, {scale: 1, autoAlpha: .8, left: 35,zIndex:10}, {left: 0, autoAlpha: .9, ease: Linear.easeNone}),
                    ]);
                var h2 = $(this).siblings("h2");
                var scene = new ScrollMagic.Scene({triggerElement:  $(this).siblings("h2").get(0),offset: -200, duration: height})
                    .setTween(tween )
                    .addIndicators({name: "h3.secondary"+i}) // add indicators (requires plugin)
                    .addTo(controller);
            });*/

/*
            $(".slideInUpC").each(function (i) {
                var height= $(window).height();
                var newHeight = -(height/2);
                new ScrollMagic.Scene({triggerElement: this, duration: 100 , offset: newHeight})
                //.setTween(TweenMax.fromTo(this, 0.5,{top: -5, autoAlpha:.8}, { top: 0, autoAlpha:1,force3D:true}) )
                    .addIndicators({name: "slideInUpC"+i}) // add indicators (requires plugin)
                    //.setClassToggle(this,"is-active")
                    .on('start',() => {;
                        $(this).addClass("is-active");
                    })
                    .on('end',() => {
                        //$(this).removeClass("slideInUp");
                        //$(this).removeClass("animated");

                    })
                    .addTo(controller);
            });



*/


/*
    /!* Header scale *!/
    var twe1 = new TweenMax.to("header .content-div", 1, { scale: 0.7, force3D:false,  top: -150 });
    var twe2 = new TweenMax.to("header .btn", 1, { scale: 0.7, force3D:false, });
    var twe3 = new TweenMax.to("header .background-image", 1, { scale: 0.5,top: -150, force3D:false,  } );
    var timeline = new TimelineLite()
        .add([twe1,twe2,twe3], '+=0', 'start');
    new ScrollMagic.Scene({ duration: $(window).height(), offset: 0})
        .setTween(timeline)
        .addIndicators({name: "header scale"}) // add indicators (requires plugin)
        .addTo(controller);




    $(".card").each(function (i) {
        var height= $(window).height();
        var newHeight = -(height/2);
        new ScrollMagic.Scene({triggerElement: this, duration: 100 , offset: newHeight})
            //.setTween(TweenMax.fromTo(this, 0.5,{top: -5, autoAlpha:.8}, { top: 0, autoAlpha:1,force3D:true}) )
            .addIndicators({name: "cards"+i}) // add indicators (requires plugin)
            .on('start',() => {;
                $(this).addClass("animated slideInUp");
            })
            .on('end',() => {
                //$(this).removeClass("slideInUp");
                //$(this).removeClass("animated");

            })
            .addTo(controller);
    })
*/


/*

    /* Přišpendlení headeru
    var controller2 = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });


        new ScrollMagic.Scene({
            triggerElement: "header ",
            duration: $("header").height()
        })
            .setPin("header",{ pushFollowers: false,})
            .on("end",function () {
                $("header").css("z-index",0);
    })
            .addIndicators({name: 200}) // add indicators (requires plugin)
            .addTo(controller2);


*/



/*
    var scene = new ScrollMagic.Scene({
        triggerElement: "#about",
        offset: 200
    })
        .on('start', function () {

            $("#progress").html(" ");
            var bar = new ProgressBar.Line("#progress", {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#E84545',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '100%'},
                text: {
                    style: {
                        // Text color.
                        // Default: same as stroke color (options.color)
                        color: '#999',
                        position: 'absolute',
                        right: '0',
                        top: '30px',
                        padding: 0,
                        margin: 0,
                        transform: null
                    },
                    autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'},
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });

            bar.animate(0.8);  // Number from 0.0 to 1.0



/*            var width = 1;
            var interval = setInterval(function () {
                if(width >= 100){
                    clearInterval(interval);
                }else {
                    width ++;
                    $(".progress.pro-1").attr("value",width);
                }
            },10)
        })
        .addTo(controller);*/







});
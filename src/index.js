/**
 * Created by romanrajchert on 26.11.16.
 */



import $ from 'jquery';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'bootstrap-loader';
import 'tether';
import 'particles.js';

var ProgressBar = require('progressbar.js')

import 'animate.css';

/* Typed JS */
require("imports-loader?this=>window!./typed.min.js");
$(function(){
    $("header .heading").typed({
        strings: ["<span class='name'>Roman</span>", "<span class='name'>webdesigner</span>","<span class='name last'>here to help</span>"],
        typeSpeed: 65,
        // time before typing starts
        startDelay: 10,
        // backspacing speed
        backSpeed: 10,
        contentType: 'html',
        backDelay: 1500,
    });


    /* Scroll spy */
    $('body').scrollspy({ target: '#navbar-complete' });



    particlesJS.load('particles', 'assets/particles.json', function () {
    });
    $( window ).resize(function() {
        /* ParticlesJS */
        particlesJS.load('particles', 'assets/particles.json', function () {
        });
    });

    /** Smooth scroll */
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


    var controller = new ScrollMagic.Controller();

    var tw1 = new TweenMax.to(".navbar", 0.5, { padding: ".5rem", force3D:true, backgroundColor: "#1c1e26"});
    var tw2 = new TweenMax.to(".nav-item a", 0.5, {padding: "0.4rem 0.6rem",force3D:true } );


    var timeline = new TimelineLite()
        .add([tw1,tw2], '+=0', 'start');

    var scene = new ScrollMagic.Scene({
        offset: 200, // start scene after scrolling for 100px
        //duration: 400 // pin the element for 400px of scrolling
    })  //.setClassToggle(".navbar", "scrolled")
        .setTween(timeline)

        .addIndicators()
        .addTo(controller);

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




/*    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("h3.secondary", 1, {scale: 1.5, autoAlpha: 0.42, left:200}, {left:0,scale:1, autoAlpha: 0}),
            TweenMax.fromTo(".line", 1, {scale: 1, autoAlpha: .8, top: 35}, {top: 0, autoAlpha: .9}),
        ]);

    var scene = new ScrollMagic.Scene({triggerElement: "#portfolio h2",offset:-400, duration: $(window).height()})
        .setTween(tween )
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);*/



     new ScrollMagic.Scene({triggerElement: ".card", duration: 1})
        .setTween(TweenMax.to(".navbar", 0.5, { padding: ".5rem", force3D:true, backgroundColor: "#000"}) )
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);



    $(".card").each(function () {
        var height= $(window).height();
        console.log(height,"offset")
        new ScrollMagic.Scene({triggerElement: this, duration: 100 , offset: -(height/2)})
            //.setTween(TweenMax.fromTo(this, 0.5,{top: -5, autoAlpha:.8}, { top: 0, autoAlpha:1,force3D:true}) )
            .addIndicators("cards") // add indicators (requires plugin)
            .on('start',() => {;
                $(this).addClass("animated slideInUp");
            })
            .on('end',() => {
                $(this).removeClass("slideInUp");
                $(this).removeClass("animated");

            })
            .addTo(controller);
    })




    var controller = new ScrollMagic.Controller({
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
            .addTo(controller);






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
            },10)*/
        })
        .addTo(controller);







});
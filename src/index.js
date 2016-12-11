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





/* Typed JS */
require("imports-loader?this=>window!./typed.min.js");
$(function(){
    $("header .heading").typed({
        strings: ["My name is <span class='name'>Roman.</span>", "I am <span class='name'>webdesigner.</span>","I am here to help <span class='name'>you.</span>"],
        typeSpeed: 60,
        // time before typing starts
        startDelay: 1,
        // backspacing speed
        backSpeed: 1,
        contentType: 'html',
        backDelay: 2000,
    });


    /* Scroll spy */
    $('body').scrollspy({ target: '#navbar-complete' });


    /* ParticlesJS */
    particlesJS.load('particles-js', 'assets/particles.json', function() {

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

    var tw1 = new TweenMax.to(".navbar", 0.5, { padding: ".5rem", force3D:true, backgroundColor: "#2D4059"});
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

    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo(".img-triangle2", 1, {scale: 3, autoAlpha: 0.05, top: 300}, {top: -350}),
        ]);

    var scene = new ScrollMagic.Scene({triggerElement: "#portfolio h1", duration: $(window).height()})
        .setTween(tween )
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

});
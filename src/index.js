/**
 * Created by romanrajchert on 26.11.16.
 */



import $ from 'jquery';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import ScrollMagic from 'scrollmagic';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'tether';
import 'particles.js';
import './style.scss';



/* Typed JS */
require("imports-loader?this=>window!./typed.min.js");
$(function(){
    $("header .heading").typed({
        strings: ["My name is^500 <span class='name'>Roman.</span>", "I am^500 <span class='name'>webdesigner.</span>","I am here to help^500 <span class='name'>you.</span>"],
        typeSpeed: 0,
        // time before typing starts
        startDelay: 1,
        // backspacing speed
        backSpeed: 1,
        contentType: 'html',
        backDelay: 2000,
    });
});

/* ParticlesJS */
particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

var controller = new ScrollMagic.Controller();




var tw1 = new TweenMax.to(".navbar", 0.5, {backgroundColor: "#2D4059", padding: ".5rem" });
var tw2 = new TweenMax.to(".nav-item a", 0.5, {padding: "0.4rem 0.6rem" } );


var timeline = new TimelineLite()
    .add([tw1,tw2], '+=0', 'start');


var scene = new ScrollMagic.Scene({
    offset: 200, // start scene after scrolling for 100px
    //duration: 400 // pin the element for 400px of scrolling
})  //.setClassToggle(".navbar", "scrolled")
    .setTween(timeline)

    .addIndicators()
    .addTo(controller);

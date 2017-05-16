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
import CountUp from 'countup.js';



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
        $(this).find(".menu-icon").toggleClass("is-opened");
    })


    // clicked mobile menu
    $(".nav .nav-link").on("click", function () {
        $(".navbar-toggleable-xs").removeClass("is-opened");
        $(".navbar").find(".menu-icon").removeClass("is-opened");
        var $navitem = $(this).closest(".nav-item");
        $navitem.addClass("clicked");
        setTimeout(function () {
            $navitem.removeClass("clicked");
        },1000)
    })



    //svg injection
    var mySVGsToInject = $('img.inject-me');
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


    inView("#counts")
            .on('enter', function(el){
                var options = {
                  useEasing : true, 
                  useGrouping : true, 
                  separator : ' ', 
                  decimal : '.', 
                };
                var seconds = 2;
                $.each($("#counts .number"),function(key, element){
                    var number = parseInt($(element).data("number"));
                    var count = new CountUp(element, 0, number, 0, seconds, options);
                    count.start();
                    seconds = seconds + 0.5;
                })

            });



    /* Animate SVG */    
    //list of svgs
    var svgs = ["design","code","test"];
    var stopAnimating = false;
    var svgCount = 0;
        /* Animate svg */
        function inViewDesigns() {
            var vivus = null;
            inView(".webdesign")
                .on('enter', function (el) {
                    el = $(el).find(".animate-svg").get(0);
                    

                    function animate(el) {
                        animateSvg(el).then(function(m){
                            svgCount++;
                            if (svgCount === 3) return false;
                            if (stopAnimating) return true;
                            
                                setTimeout(function () {
                                el.classList.add("is-hidden");
                                $(".svg-headings " + "."+(svgCount) ).removeClass("active");
                                $(".svg-headings " + "."+(svgCount+1) ).addClass("active");

                                var svg = $(".webdesign").find("." + svgs[svgCount]).get(0);
                                svg.classList.remove("is-hidden");
                                 animate(svg)
                            },200 );
                        });
                    }
                    animate(el);
                    //on vivus animation end


                })

                .on('exit', el => {
            
                });
        }


    var animateSvg = function(el) {

        return new Promise (
            function(resolve) {

                var vivus = new Vivus(el, {duration: 200, start: "autostart"});
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
                //return vivus;

                vivus.play(1, function () {
                    resolve("end animation");
                });
            }
        );

    }

    $(".svg-headings h3").on("click", function(){
        stopAnimating = true;
        var className = $(this).attr("class");
        $(".svg-headings h3.active").removeClass("active");
        $(this).addClass("active");
        var svg = $(".webdesign").find("." + svgs[className - 1]).get(0);
        $(".webdesign-svg:not(is-hidden)").addClass("is-hidden");
        svg.classList.remove("is-hidden");

        animateSvg(svg);
    })



    //parallax
    var rellax = new Rellax('.lvl-1', {
        speed: 4
    });
    var rellax = new Rellax('.lvl-2', {
        speed: 1
    });



    $("form.form input, form.form textarea").on("focus", function(){
      console.log($(this).val() );
      if($(this).val() === ""){
        $(this).siblings("label").addClass("focused");
      }
    });
    $("form.form input, form.form textarea").on("focusout", function(){
      if($(this).val() === ""){
        $(this).siblings("label").removeClass("focused");
      }
    });




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

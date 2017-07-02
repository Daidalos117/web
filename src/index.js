/**
 * Created by romanrajchert on 26.11.16.
 */



import $ from 'jquery';
//import TweenMax from 'gsap/src/uncompressed/TweenMax';
//import ScrollMagic from 'scrollmagic';
//import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
//import 'imports?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'bootstrap-loader';
import 'tether';
import 'particles.js';
import Vivus from 'vivus';
import inView from 'in-view';
import SVGInjector from 'svg-injector';
import './BetterOnScroll';
import Rellax from 'rellax';
import CountUp from 'countup.js';
import Expanding from 'expanding-textareas';



require("imports-loader?this=>window!./typed.min.js");
require("imports-loader?this=>window!../node_modules/jquery.ns-autogrow/dist/jquery.ns-autogrow.min.js");

window.onload = function () {
    
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
        $(".svg-headings .active").removeClass("active");
        $(this).addClass("active");
        $("p."+className).addClass("active");
        var svg = $(".webdesign").find("." + svgs[className - 1]).get(0);
        $(".webdesign-svg:not(is-hidden)").addClass("is-hidden");
        svg.classList.remove("is-hidden");

        animateSvg(svg);
    })



    //parallax
    var rellax = new Rellax('.lvl-1', {
        speed: 3
    });
    var rellax = new Rellax('.lvl-2', {
        speed: 2
    });
    var rellax = new Rellax('.lvl-3', {
        speed: 1
    });


    //contact form labels
    $("form.contactForm input, form.contactForm textarea").on("focus", function(){
      if($(this).val() === ""){
        $(this).siblings("label").addClass("focused");
      }
    });
    $("form.contactForm input, form.contactForm textarea").on("focusout", function(){
      if($(this).val() === ""){
        $(this).siblings("label").removeClass("focused");
      }
    });


   /**finn fidget */
   $("#about h2").on("click", function(){
       $(".finn-and-jake").addClass("is-shown");
       var audio = new Audio('finn.mp3');
       audio.play();
   })


   //expendable textarea
   new Expanding(document.querySelector('textarea'));

   $(".contactForm").on("submit", function(e){
       e.preventDefault();
       var form = $(this).serialize();
       $(this)[0].reset();
       var settings = {
           method: 'POST',
           headers: new Headers({
               'Content-Type' : 'application/x-www-form-urlencoded'
           }),
           body: form
           
       };
       var body = {};
       fetch("contact.php", settings).then(function(response) {
          
            return response.text();
       }).then(function(text){
           body = JSON.parse(text);
           console.log("thenBody",body,"thenText",text);
       }).catch(function(error){
           var lang = $(".actualLanguage").val();
           var cz = lang === "cz";
           body.class = "danger";
           body.message = "";
           body.message += cz ? 'Něco se pokazilo.' : 'Something went wrong';
           body.message += error;
                 
      }).then(function() {
          console.log("replybody", body,"class",body.class);
          var $alert = $("#alert");
          $alert.removeAttr("class");
          $alert.addClass("alert-" + body.class);
          $alert.find(".body").html(body.message);
          $alert.addClass("shown alert");
          setTimeout(function(){
              //$alert.removeClass("shown");
          },10000);
      })

      
   })

   //analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45752042-3', 'auto');
  ga('send', 'pageview');



});

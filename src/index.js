/**
 * Created by romanrajchert on 26.11.16.
 */

import $ from 'jquery';
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
import browserUpdate from 'browser-update';
require("imports-loader?this=>window!./typed.min.js");



window.onload = function () {
    $("body").addClass("loaded");
    $(".background-image").addClass("animated fadeInUp");
    setTimeout(function() {

        var $heading = $("header .heading");
        $heading.typed({
            strings: (function(){
                var elm = $heading.find(".name");
                var texts = [];
                $.each(elm,function(number, value) {            
                    texts.push($(value)[0].outerHTML.toString().replace("hidden",""));    
                })
                return texts;
            })(),
            typeSpeed: 100,
            // time before typing starts
            startDelay: 100,
            // backspacing speed
            backSpeed: 10,
            contentType: 'html',
            backDelay: 1500,
        });

    },1500);

}


$(function(){
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    var obcontent = $('#outdatedbrowsercontent').html();
    /* outdatedbrowser */
    var $buoop = {
        vs:{i:11,f:-4,o:-4,s:10,c:50},
        api:4,
        test: true,   
        text: obcontent,
        noclose: true,          
    }; 
    browserUpdate($buoop);
    
    
    /* Typed */

    /* Scroll spy */
    $('body').scrollspy({ target: '#navbar-complete' });


    /* Particles Js*/
    particlesJS.load('particles', 'assets/header.json', function () {});
    particlesJS.load('contact-bg', 'assets/contact.json', function () {});
    
    $( window ).resize(function() {
        /!* ParticlesJS *!/
        particlesJS.load('particles', 'assets/particles.json', function () {
        });
    });

    document.onload = function () {
            //$("body").addClass("loaded");
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
        var height = $(".navbar").outerHeight();
        $(".navbar-nav").css("height","calc(100% - "+ height +"px)");
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
    
    
    //delay visibe elements maybe
    var delay = 2000;
    $.each($(".delay-me-maybe"), function (pos, el) {
        if(inView.is(el)) {
            $(el).data("animate-delay", delay);
            delay += 200;
        }
    })


    var firstPosition = -1;
    // menu scroll
    $(window).scroll(function () {
        menuScrolled();
        languageScrolled();
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
    
    function languageScrolled() {
        var $language = $(".language-switch");
        if (firstPosition === -1) {
             firstPosition =   $language.offset().top; 
        }
        if (Math.abs($language.offset().top - firstPosition) > 600) {
            $language.addClass("hidden");
        } 
    }

    inView.offset(20);
    /* Animate elements */
    inView(".animate")
        .on('enter', function (el) {
            var delay = $(el).data("animate-delay") || 0;
            //console.log(el,delay);

            setTimeout(function () {
                //$(el).addClass($(el).data("animate") + " animated");
                $(el).addClass("is-active");
            },delay);

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
                        var seconds = 7;
                        animateSvg(el,seconds).then(function(m){
                        });
                        setTimeout(function () {
                            svgCount++;
                            if (svgCount === 3) return false;
                            if (stopAnimating) return true;
                            el.classList.add("is-hidden");
                            $(".svg-headings " + "."+(svgCount) ).removeClass("active");
                            $(".svg-headings " + "."+(svgCount+1) ).addClass("active");

                            var svg = $(".webdesign").find("." + svgs[svgCount]).get(0);
                            svg.classList.remove("is-hidden");    
                            animate(svg);
                        },seconds * 1000 );
                    }
                    animate(el);
                    //on vivus animation end
                })
        }


    var animateSvg = function(el, seconds) {
        return new Promise (
            function(resolve) {
                //turn on counter 
                var counter = seconds - 1;
                var $timer = $("#timer");
                var interFunc = function() {
                    $timer.html(counter);
                    if(counter === 0) clearInterval(inter);
                    counter--;
                }
                interFunc();
                var inter = setInterval(interFunc, 1000 );
                var vivus = new Vivus(el, {duration: 200, start: "autostart"});
                // animate texts
                var texts = el.getElementsByTagName("tspan");
                if(!isSafari) {
                    for (var i = 0, len = texts.length; i < len; i++) {
                        var element = texts[i];
                        typeThis(element);
                    }
                }
                
                //return vivus;

                vivus.play(1, function () {
                    resolve("end animation");
                });
            }
        );

    }

    function typeThis(element, delay, speed) {
        var delay = delay || 0;
        var speed = speed || 0;
        var text = element.innerHTML;
        element.innerHTML = "";
        $(element).typed({
            strings: [text],
            typeSpeed: speed,
            // time before typing starts
            startDelay: delay,
            // backspacing speed
            backSpeed: 10,
            contentType: 'html',
        });

    }

    //type me each
    $.each($(".js-type-me"), function() {
        typeThis();
    })
    

    inView(".header-section .primary")
        .on('enter', function (el) {
            var $el = $(el);
                
            if(!$el.data("animated") && !$el.hasClass("dontType")) {
                var width = $el.width();
                //$el.width(width);
                typeThis(el.querySelector("span"), 200, 200);
            }
            $el.data("animated",true);

        })
        .on('exit', el => {
            //el.style.opacity = 0.5;
        });
    
    //animated headings
    $(".svg-headings h3").on("click", function(){
        stopAnimating = true;
        var className = $(this).attr("class");
        if($(".svg-headings .active").hasClass(className)) return false;
        $("#timer").hide();
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

    var rellax = new Rellax('.lvl--1', {
        speed: -1
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
       var audio = new Audio('assets/finn.mp3');
       audio.play();
   })




   //message form
    $("#contactForm").eq(0).submit( function(e){
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
       }).catch(function(error){
           var lang = $(".actualLanguage").val();
           var cz = lang === "cz";
           body.class = "danger";
           body.message = "";
           body.message += cz ? 'Něco se pokazilo.' : 'Something went wrong';
           body.message += error;
                 
      }).then(function() {
          var $alert = $("#alert");
          $alert.removeAttr("class");
          $alert.addClass("alert-" + body.class);
          $alert.find(".body").html(body.message);
          $alert.addClass("shown alert");
          setTimeout(function(){
              $alert.removeClass("shown");
          },10000);
      })

      
  })
  
  //how old is project?
  $.each($(".js-year-diff"), function(index, value) {
      var value = $(value);
      var year = Number(value.data("year"));
      getYearDiff(year, value);
  })

   function getYearDiff(year, obj) {
       var date1 = new Date(year, 6, 17);
       var date2 = new Date();
       var diff = new Date(date2.getTime() - date1.getTime());
       // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)
       var yrs = diff.getUTCFullYear() - 1970;
       obj.html(yrs);
   }

   
   //expendable textarea
   new Expanding(document.querySelector('textarea'));
   //analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45752042-3', 'auto');
  ga('send', 'pageview');

  //Tooltip 
   var tooltip = $('[data-toggle="tooltip"]').tooltip();

   //collapse
   $('.collapse').collapse();
   $('.toggle-collapse').on("click", function(e){
       e.preventDefault();
       var toggle = $(this).data("toggle");
       $(toggle).slideToggle(500);
   })

});

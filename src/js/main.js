/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var JCD = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages


          // navigation
          var $body          = $('html, body');
          var $siteWrap      = $('.site-wrap');
          var $content       = $('.content');
          var $navToggle     = $('#nav-toggle');
          var $navLine       = $('.nav-line');
          var $navLine1      = $('#nav-line-1');
          var $navLine2      = $('#nav-line-2');
          var $navLine3      = $('#nav-line-3');
          var $nav           = $('#main-nav');
          var $navOverlay    = $('#nav-overlay');
          var $navGroup      = $('#nav-items');
          var $navContact    = $('#nav-contact');
          var $navItems      = $('.nav-item');
          var $navContactBtn = $('#contact-nav-link');
          var $connectedBtn  = $('#connected-btn');
          var $superLink     = $('.super-link');
          var navTl          = new TimelineMax();
          var navBtnTl       = new TimelineMax();


          function navOpen() {

            $body.addClass('scroll-locked');
            $nav.attr('aria-hidden', 'false').show();
            $navToggle.addClass('is-open')
                      .prop('disabled', true)
                      .attr('aria-expanded', 'true')
                      .attr('aria-label', 'close');

            navTl.to($navOverlay, 1, { autoAlpha: 1 })
                 .to($navOverlay, 1, { delay: 0.2, css: { top: '-4500px', right: '-4500px', height: '9000px', width: '9000px' },
                   onComplete: function() {
                     $navToggle.prop('disabled', false);
                     $content.hide();
                   }
                 }, '-=1.0')
                 .staggerFromTo($navItems, 0.75, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: Back.easeInOut }, 0.1, '-=0.75');

            navBtnTl.to($navLine1, 0.2, { top: '25px' })
                    .to($navLine3, 0.2, { bottom: '25px' }, '-=0.2')
                    .to($navToggle, 0.2, { rotation: 45 }, '+=0.2')
                    .to($navLine3, 0.2, { rotation: -90 }, '-=0.2')
                    .to($navLine, 0.2, { backgroundColor: '#f5f5f5' }, '-=0.2');

          }


          function navClose() {

            $content.show().css('opacity', '1');
            $body.removeClass('scroll-locked');
            $nav.attr('aria-hidden', 'true').hide();
            $navToggle.removeClass('is-open')
                      .removeClass('is-arrow')
                      .prop('disabled', true)
                      .attr('aria-expanded', 'false')
                      .attr('aria-label', 'navigation');

            navTl.to($navOverlay, 0.5, { autoAlpha: 0 })
                 .to($navOverlay, 0.3, { css: { top: '2.4rem', right: '2.4rem', height: '54px', width: '54px' },
                   onComplete: function() {
                     $navToggle.prop('disabled', false);
                   }
                 }, '-=0.5');

           navBtnTl.to($navToggle, 0.2, { rotation: 0 })
                   .to($navLine3, 0.2, { rotation: 0 }, '-=0.2')
                   .to($navLine1, 0.2, { top: '13px' }, '+=0.2')
                   .to($navLine3, 0.2, { bottom: '13px' }, '-=0.2')
                   .to($navLine, 0.2, { backgroundColor: '#3b3f44' }, '-=0.2');

          }


          function contactShow() {

            $navToggle.addClass('is-arrow').attr('aria-label', 'back');
            $navContactBtn.attr('aria-expanded', 'true');
            $navContact.attr('aria-hidden', 'false');
            $connectedBtn.attr('aria-expanded', 'true');
            $navGroup.fadeOut(400, function(){
              $navContact.fadeIn(400);
            });

            navBtnTl.set($navLine1, { top: 'auto', bottom: '18px', width: '24px', rotation: 45 })
                    .set($navLine2, { left: 'auto', right: '-12px', width: '36px' })
                    .set($navLine3, { top: '18px', bottom: 'auto', width: '24px', rotation: -45 })
                    .to($navToggle, 0.3, { rotation: 180, ease: Back.easeOut });

          }


          function contactHide() {

            $navToggle.removeClass('is-arrow').attr('aria-label', 'close');
            $navContactBtn.attr('aria-expanded', 'false');
            $navContact.attr('aria-hidden', 'true');
            $connectedBtn.attr('aria-expanded', 'false');
            $navContact.fadeOut(400, function(){
              $navGroup.fadeIn(400);
            });

            navBtnTl.set($navLine1, { top: '25px', bottom: 'auto', width: '40px', rotation: 0 })
                    .set($navLine2, { left: '50%', right: 'auto', width: '40px' })
                    .set($navLine3, { top: 'auto', bottom: '25px', width: '40px', rotation: -90 })
                    .to($navToggle, 0.3, { rotation: 45, ease: Back.easeOut });

          }


          TweenMax.to($navToggle, 1, { autoAlpha: 1 });


          $navToggle.click(function(){
            if ($(this).hasClass('is-arrow')) {
              contactHide();
            } else {
              if ($(this).hasClass('is-open')) {
                navClose();
              } else {
                navOpen();
              }
            }
          });


          $navContactBtn.click(function(e){
            e.preventDefault();
            contactShow();
          });


          $connectedBtn.click(function(e){
            e.preventDefault();
            $content.animate({opacity: 0}, 400, function(){
              navOpen();
              contactShow();
            });
          });


          $(document).keydown(function(e) {
            // ESCAPE key pressed
            if (e.keyCode == 27 && $navToggle.hasClass('is-open')) {
              if ($navToggle.hasClass('is-arrow')) {
                contactHide();
              } else {
                navClose();
              }
            }
          });


          $superLink.click(function(e){
            e.preventDefault();
            var link = $(this).attr('href');
            $siteWrap.fadeOut(400, function(){
              window.location.href = link;
            });
          });


      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page


        // Animation panel vars
        var $stage            = $('#home-stage');
        var $hero             = $('#home-hero');
        var $heroImg          = $hero.find('#home-hero-image');
        var $heroText         = $hero.find('#home-hero-text');
        var $innerStage       = $('#home-inner-stage');
        var $ui               = $('#home-scroll-ui');
        var $uiLine           = $ui.find('#home-scroll-ui-line');
        var $uiDot1           = $ui.find('#home-scroll-ui-dot-1');
        var $uiDot2           = $ui.find('#home-scroll-ui-dot-2');
        var $uiDot3           = $ui.find('#home-scroll-ui-dot-3');
        var $text             = $('#home-stage-text');
        var $designText       = $text.find('#design-text');
        var $developmentText  = $text.find('#development-text');
        var $communityText    = $text.find('#community-text');
        var $image            = $('#home-stage-image');
        var $grid             = $('#heart-grid');
        var $gridLines        = $('#grid');
        var $heart            = $('#heart-outline');
        var $heartFill        = $('#heart-fill');
        var $typedTxt         = $('#typed-text-wrap');
        var $cityElements     = $('.city-element');
        var $connectedHeading = $('#connected-heading');
        var $connectedBtn     = $('#connected-btn');
        var $socialItem       = $('.social-item');
        var dotOffset         = $stage.outerHeight();


        // Animation objects
        var controller   = new ScrollMagic.Controller();
        var mySplitText  = new SplitText("#typed-text", { type: "words,chars", charsClass: "char" });
        var heroFadeIn   = new TimelineMax();
        var gridMove     = new TimelineMax();
        var typedTxtMove = new TimelineMax();
        var tl           = new TimelineMax({paused: true});
        var textLeave    = new TimelineMax();
        var getConnected = new TimelineMax();
        var uiLineMove   = TweenMax.fromTo($uiLine, 3, { height: '0' }, { height: '100%', ease: Power0.easeNone });
        var uiDotMove1   = TweenMax.fromTo($uiDot1, 0.5, { scale: 0.5 }, { scale: 1, ease: Back.easeInOut });
        var uiDotMove2   = TweenMax.fromTo($uiDot2, 0.5, { scale: 0.5 }, { scale: 1, ease: Back.easeInOut });
        var uiDotMove3   = TweenMax.fromTo($uiDot3, 0.5, { scale: 0.5 }, { scale: 1, ease: Back.easeInOut });


        function startText() {
          $typedTxt.css('visibility', 'visible');
          var revealInterval = 0.03;
          var $chars = $('.char');
          $chars.each(function(index, element) {
            var $element = $(element);
            typedTxtMove.set($element, { autoAlpha: 1 }, (index + 1) * revealInterval).play();
          });
        }


        function stopText() {
          $typedTxt.css('visibility', 'hidden');
          typedTxtMove.pause(0);
        }


        function pauseTL(){
          tl.pause();
        }


        heroFadeIn.to($heroImg, 1, { autoAlpha: 1, delay: 0.5 })
                  .to($heroText, 1, { autoAlpha: 1 }, '-=0.5');


        gridMove.fromTo($designText, 1, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
                .fromTo($grid, 1, { y: 600 }, { y: 0 }, '-=1.0');


        tl.fromTo($heart, 2, { drawSVG: '0%' }, { drawSVG: '100%', onComplete: pauseTL })
          .add('development')
          .to($designText, 0.6, { y: 50, autoAlpha: 0, ease: Back.easeIn, onReverseComplete: pauseTL })
          .to($gridLines, 0.6, { autoAlpha: 0 }, '-=0.6')
          .fromTo($developmentText, 0.6, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, '+=0.2')
          .add(stopText)
          .add(startText)
          .to($heartFill, 1, { autoAlpha: 1, onComplete: pauseTL })
          .add('community')
          .to($developmentText, 0.6, { y: 50, autoAlpha: 0, ease: Back.easeIn, onReverseComplete: pauseTL })
          .add(startText)
          .add(stopText)
          .fromTo($communityText, 0.6, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, '+=0.2')
          .to($stage, 1, { backgroundColor: '#f5f5f5', color: '#3b3f44' })
          // .to($grid, 0.6, { y: -50, scale: 0.75 }, '-=1.0')
          .staggerFromTo($cityElements, 1, { y: 200, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeInOut.config(2) }, 0.1, '-=0.6');


       getConnected.staggerFromTo($socialItem, 1, { opacity: 0, y: 25 }, { opacity: 1, y: 0, ease: Back.easeInOut.config(3.5) }, 0.1)
                       .fromTo($connectedHeading, 0.6, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.3')
                       .fromTo($connectedBtn, 0.6, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8');


        var uiLineMoveScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', duration: '200%'})
          .setTween(uiLineMove)
          .addTo(controller);


        var uiDotMoveScroll1 = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave'})
          .setTween(uiDotMove1)
          .addTo(controller);


        var uiDotMoveScroll2 = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', offset: dotOffset})
          .setTween(uiDotMove2)
          .addTo(controller);


        var uiDotMoveScroll3 = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', offset: dotOffset * 2})
          .setTween(uiDotMove3)
          .addTo(controller);


        var stagePin = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', duration: '300%'})
          .setPin('#home-stage')
          .addTo(controller);


        var gridMoveScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', duration: '50%'})
            .setTween(gridMove)
            .addTo(controller);


        var designScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave'})
          .on('enter', function(){
            tl.play(0);
          })
          .on('leave', function(){
            tl.pause(0);
          })
          .addTo(controller);


        var developmentScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', offset: dotOffset})
          .on('enter', function(){
            tl.play('development');
          })
          .on('leave', function(){
            tl.reverse('community');
          })
          .addTo(controller);


        var communityScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', offset: dotOffset * 2})
          .on('enter', function(){
            tl.play('community');
          })
          .on('leave', function(){
            tl.reverse(0);
          })
          .addTo(controller);


        var textLeaveScroll = new ScrollMagic.Scene({triggerElement: '#home-stage', triggerHook: 'onLeave', duration: '50%', offset: dotOffset * 3})
          .setTween(textLeave)
          .addTo(controller);


        var getConnectedScroll = new ScrollMagic.Scene({triggerElement: '#footer-social-links', triggerHook: 'onEnter'})
          .setTween(getConnected)
          .addTo(controller);


        // Stage height
        function stageHeight() {
          var height = $innerStage.outerHeight();
          var stagePos = $stage.offset().top;
          var blogPos = $('.blog-archive').offset().top - height;
          var heroPos = $hero.offset().top + $hero.outerHeight() - 10;
          var top = $(window).scrollTop();
          dotOffset = $stage.outerHeight();
          uiDotMoveScroll2.offset(dotOffset);
          uiDotMoveScroll3.offset(dotOffset * 2);
          developmentScroll.offset(dotOffset);
          communityScroll.offset(dotOffset * 2);
          textLeaveScroll.offset(dotOffset * 3);
          var textHeight = $communityText.outerHeight();
          if ($(window).width() < 360) {
            textHeight -= 20;
          }
          $image.css('margin-top', textHeight);
          if (top >= stagePos && top < blogPos ) {
            window.scrollTo(0, heroPos);
          }
        }


        $(window).on('resize', stageHeight).resize();


        $uiDot1.click(function(e){
          e.preventDefault();
          controller.scrollTo(designScroll);
        });

        $uiDot2.click(function(e){
          e.preventDefault();
          controller.scrollTo(developmentScroll);
        });

        $uiDot3.click(function(e){
          e.preventDefault();
          controller.scrollTo(communityScroll);
        });


      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = JCD;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

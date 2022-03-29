/**
 * @file
 * Big Blue Door Theme JS functionality.
 */
(function ($) {
  'use strict';

  Drupal.behaviors.Bigbluedoor = {

    /**
     * Attach method for this behavior.
     *
     * @param context
     *   The context for which the behavior is being executed. This is either
     *   the full page or a piece of HTML that was just added through Ajax.
     * @param settings
     *   An array of settings (added through drupal_add_js()). Instead of
     *   accessing Drupal.settings directly you should use this because of
     *   potential modifications made by the Ajax callback that also produced
     *   'context'.
     */
    attach: function (context, settings) {
      var self = this;

      self.selectricBehavior(context);
      self.headerSearch(context);

      $('#main-menu-overlay', context).click(function (event) {
        self.closeMenu(context);
        event.preventDefault();
      });

      $('#nav-opener', context).click(function () {
        self.toggleMenu(context);
      }).keypress(function (event) {
        if (event.which == 13) {
          self.toggleMenu(context);
        }
      });

      $('.close-menu-btn', context).click(function () {
        self.toggleMenu(context);
        $('#nav-opener').toggleClass('is-active');
      })

      /**
       * Hide search field and search filters, while mouseup outside form
       */
      $(document).mouseup(function(e) {
        var containerHeader = $(".region-header .search-block-form", context);

        // if the target of the click isn't the container nor a descendant of the container
        if (!containerHeader.is(e.target) && containerHeader.has(e.target).length === 0) {
          containerHeader.removeClass('search-open');
        }
      });

    },

    headerSearch: function (context) {
      let $formWrap = $('.region-header #search-block-form', context),
        $searchBtn = $('.region-header .form-type-search label', context);

      $searchBtn.click(function (event) {
        event.preventDefault();

        $(this).parents('.search-block-form').toggleClass('search-open');
      })
    },

    /**
     * Adding functionality for custom select elements.
     */
    selectricBehavior: function (context) {
      $('select', context).selectric();
    },

    toggleMenu: function (context) {
      var self = this;

      if ($('body', context).hasClass('overlay-on')) {
        self.closeMenu(context);
      } else {
        $('body', context).addClass('overlay-on');
        $('#main-menu-sidebar > a', context).attr('tabindex', 0);
        $('#main-menu-sidebar', context).addClass('open');
        $('#nav-opener', context).focus();
      }
    },

    closeMenu: function (context) {
      $('body', context).removeClass('overlay-on');
      $('#nav-opener', context).focus();
      $('#main-menu-sidebar', context).removeClass('open');
      $('#main-menu-sidebar > a', context).attr('tabindex', -1);
    },
  }

  // To set Slick slider on Homepage Carousel.
  Drupal.behaviors.homepage_carousel = {
    attach: function (context, settings) {
      // To set position to the slider buttons (arrows) according to the Image height.
      function applyHeight(el) {
        let $currentSlide = el.find('.slick-current');
        let $currentArrows = $currentSlide.closest('.field--name-field-slide').find('.arrow-wrapper');
        let $imageHeight = $currentSlide.find('img').height() + 15;
        $currentArrows.css('top', $imageHeight + 'px');
      }

      // To set Slick.
      $('.paragraph--type--homepage-carousel', context).once('homepage-carousel-slick').each(function() {
        let $slick = $(this).find('.slider-images--wrapper');
        let $arrows = $(this).find('.arrow-wrapper');
        let $next = $arrows.children('.slick-next');
        let $prev = $arrows.children('.slick-prev');

        $slick.each(function() {
          let $currentSlider = $(this).closest('.field--name-field-slide');
          let $prev = $currentSlider.find('.slick-prev');
          let $next = $currentSlider.find('.slick-next');

          $(this).on('init', function(event, slick) {
            applyHeight($(this))
          });

          let $slider = $(this).slick({
            arrows: false,
            appendArrows: $arrows,
            adaptiveHeight: true,
            speed: 600,
            slidesToShow: 1,
            fade: true,
            cssEase: 'linear'
          });

          $(this).on('afterChange', function() {
            applyHeight($(this))
          });

          $(this).on('setPosition', function() {
            applyHeight($(this))
          });

          $next.on('click', function(e) {
            $slider.slick('slickNext');
          });

          $prev.on('click', function(e) {
            $slider.slick('slickPrev');
          });
        });
      });
    }
  }
})(jQuery);

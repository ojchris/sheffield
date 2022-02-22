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
})(jQuery);

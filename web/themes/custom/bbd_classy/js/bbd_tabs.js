(function ($, Drupal, drupalSettings) {
  'use strict';

  /**
   * Behavior for tabs paragraph.
   */

  Drupal.behaviors.Tabs = {
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
      const activeClass = 'is-active';

      $('.tab__button', context).click(function () {
        if ($(this).hasClass(activeClass)) return false;

        const wrap = $(this).closest('.paragraph-tab-inner');
        const index = $(this).attr('data-index');
        wrap.find(`.tab__button.${activeClass}`).removeClass(activeClass).attr('aria-selected', false);
        wrap.find(`.tab__content.${activeClass}`).removeClass(activeClass);
        $(this).addClass(activeClass);
        $(this).attr('aria-selected', true);
        wrap.find(`.tab__content[data-index="${index}"`).addClass(activeClass)
      })
    }
  };

})(jQuery, Drupal, drupalSettings);

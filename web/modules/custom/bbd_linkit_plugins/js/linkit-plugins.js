/**
 * @file
 * Adds JS functionality for Big Blue Door Linkit Plugins module.
 */
(function ($) {
  "use strict";

  Drupal.behaviors.bbdLinkitPlugins = {
    /**
     * Attach method for this behavior.
     *
     * @param context
     *   The context for which the behavior is being executed.
     * @param settings
     *   An array of settings.
     */
    attach: function (context, settings) {
      var self = this;

      self.removeNoreferrerRel(context, settings);
    },

    /**
     * Removes "noreferrer" rel attribute from a link.
     */
    removeNoreferrerRel: function (context, settings) {
      // Removes "noreferrer" if link has an attribute "data-noreferrer=no".
      $('a[data-noreferrer="no"]').once().each(function () {
        $(this).attr('rel', function (i, val) {
          // Check to see if rel contains noreferrer.
          if (val.indexOf('noreferrer') > -1) {
            val = val.replace('noreferrer', '').trim();

            return val;
          }
        });
      });
    }
  };

})(jQuery);

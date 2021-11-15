ABOUT CLASSY
-----------

Classy is a base theme that provides many classes in its markup. For cleaner
markup (fewer classes), the default Stable base theme can be used instead.

To use Classy as your base theme, set the 'base theme' in your theme's .info.yml
file to "classy":
  base theme: classy

See https://www.drupal.org/docs/8/theming-drupal-8/using-classy-as-a-base-theme
for more information on using the Classy theme.

ABOUT SCSS FOLDERS
--------------------
Variables include: breakpoints, colors, typography and fonts.

Abstractions: flex and site mixins. Use it across the site.

Base include common styles: general, header, footer, form, navigation, preloader and datepicker.
You could remove some if they are redundant in your Project.

ABOUT bbd_classy.libraries
--------------------
It include: js, css, google fonts and dependencies.

ABOUT config.rb
--------------------
You need to change "environment = :production", before the project goes LIVE.
Eventually css file has to be compressed for optimization purpose.

ABOUT DRUPAL THEMING
--------------------
See https://www.drupal.org/docs/8/theming for more information on Drupal
theming.

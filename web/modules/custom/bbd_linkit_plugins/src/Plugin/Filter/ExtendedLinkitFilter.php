<?php

/**
 * @file
 * Contains \Drupal\bbd_linkit_plugins\Plugin\Filter\ExtendedLinkitFilter.
 */

namespace Drupal\bbd_linkit_plugins\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\linkit\Plugin\Filter\LinkitFilter;

/**
 * Provides a Linkit filter.
 *
 * @Filter(
 *   id = "bbd_linkit_plugins_extended_linkit",
 *   title = @Translation("Linkit URL converter (extended)"),
 *   description = @Translation("Updates links inserted by Linkit to point to entity URL aliases."),
 *   settings = {
 *     "title" = TRUE,
 *   },
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_REVERSIBLE
 * )
 */
class ExtendedLinkitFilter extends LinkitFilter {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $result = parent::process($text, $langcode);

    $processed_text = $result->getProcessedText();
    if (strpos($processed_text, 'href="/media/') !== FALSE) {
      $dom = Html::load($processed_text);
      $xpath = new \DOMXPath($dom);

      foreach ($xpath->query('//a[contains(@href,"/media/")]') as $element) {

        try {
          $entity_type = $element->getAttribute('data-entity-type');
          $uuid = $element->getAttribute('data-entity-uuid');

          if (!$entity_type && !$uuid) {
            $href = $element->getAttribute('href');
            $href_array = explode('/', $href);

            if (isset($href_array[2]) && is_numeric($href_array[2])) {
              $media = \Drupal::entityTypeManager()->getStorage('media')->load($href_array[2]);
              if ($media) {
                $url = $this->substitutionManager
                  ->createInstance('media')
                  ->getUrl($media);

                $element->setAttribute('href', $url->getGeneratedUrl());
                $access = $media->access('view', NULL, TRUE);

                // Set the appropriate title attribute.
                if ($this->settings['title'] && !$access->isForbidden() && !$element->getAttribute('title')) {
                  $element->setAttribute('title', $media->label());
                }

                // The processed text now depends on:
                $result
                  // - the linked entity access for the current user.
                  ->addCacheableDependency($access)
                  // - the generated URL (which has undergone path & route
                  // processing)
                  ->addCacheableDependency($url)
                  // - the linked entity (whose URL and title may change)
                  ->addCacheableDependency($media);
              }
            }
          }
        }
        catch (\Exception $e) {
          watchdog_exception('linkit_filter', $e);
        }
      }

      $result->setProcessedText(Html::serialize($dom));
    }

    return $result;
  }
}

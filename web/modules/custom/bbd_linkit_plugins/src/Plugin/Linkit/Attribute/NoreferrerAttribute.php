<?php

/**
 * @file
 * Contains \Drupal\bbd_linkit_plugins\Plugin\Linkit\Attribute\NoreferrerAttribute.
 */

namespace Drupal\bbd_linkit_plugins\Plugin\Linkit\Attribute;

use Drupal\linkit\AttributeBase;

/**
 * Noreferrer relationship attribute.
 *
 * @Attribute(
 *   id = "noreferrer_attribute",
 *   label = @Translation("Noreferrer Attribute"),
 *   html_name = "data-noreferrer",
 *   description = @Translation("Noreferrer Attribute")
 * )
 */
class NoreferrerAttribute extends AttributeBase {

  /**
   * {@inheritdoc}
   */
  public function buildFormElement($default_value) {
    return [
      '#type' => 'checkbox',
      '#title' => $this->t('Do not add "noreferrer" attribute'),
      '#default_value' => $default_value,
      '#return_value' => 'no',
    ];
  }

}

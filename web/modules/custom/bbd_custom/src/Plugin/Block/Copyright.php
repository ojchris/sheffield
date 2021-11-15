<?php

namespace Drupal\bbd_custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'Copyright' Block.
 *
 * @Block(
 *   id = "copyright",
 *   admin_label = @Translation("Copyright"),
 * )
 */
class Copyright extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();

    $body_value = !empty($config['copyright_body']['value']) ? $config['copyright_body']['value'] : '';
    $body_format = !empty($config['copyright_body']['format']) ? $config['copyright_body']['format'] : 'full_html';
    $form['copyright_body'] = [
      '#type' => 'text_format',
      '#description' => $this->t('Use the "[current_year]" token for the current year.'),
      '#title' => $this->t('Body'),
      '#default_value' => $body_value,
      '#format' => $body_format,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    $this->setConfigurationValue('copyright_body', $values['copyright_body']);
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = $this->getConfiguration();
    $output = '';

    if (isset($config['copyright_body'])) {
      $timestamp = \Drupal::time()->getRequestTime();
      $year =  \Drupal::service('date.formatter')->format($timestamp, 'custom', 'Y');
      $value = $config['copyright_body']['value'];
      $value = str_replace('[current_year]', $year, $value);
      $format = $config['copyright_body']['format'];


      $output = check_markup($value, $format);
    }

    return [
      '#markup' => $output,
    ];
  }

}

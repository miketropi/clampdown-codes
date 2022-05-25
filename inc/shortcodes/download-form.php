<?php 
/**
 * Shortcode download form
 * 
 */

function clampdown_codes_download_form_func($atts = []) {
  $atts = shortcode_atts( array(
    'group' => '',
    'classes' => '',
  ), $atts);

  set_query_var('atts', $atts);

  ob_start();
  load_template(CGC_DIR . '/templates/download-form.php', false);
  return ob_get_clean();
}

add_shortcode('clampdown_codes_download_form', 'clampdown_codes_download_form_func');
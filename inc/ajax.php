<?php 
/**
 * Ajax
 */

function clampdown_codes_ajax_add_code() {
  extract($_POST);
  global $clampdownCodesQuery;
  $result = $clampdownCodesQuery->addCode($code, $group);

  if(is_numeric($result)) {
    wp_send_json([
      'successfull' => true,
      'message' => sprintf('%s %s (#%s)', $code, __('added successfully', 'cgc'), $result),
      'entry' => $clampdownCodesQuery->getCode($code),
    ]);
  } else {
    wp_send_json([
      'successfull' => false,
      'message' => isset($result['message']) ? $result['message'] : __('Insert code error.'),
    ]);
  }
}

add_action('wp_ajax_clampdown_codes_ajax_add_code', 'clampdown_codes_ajax_add_code');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_add_code', 'clampdown_codes_ajax_add_code');

function clampdown_codes_ajax_get_codes() {
  extract($_POST);
  global $clampdownCodesQuery;
  wp_send_json($clampdownCodesQuery->getCodes($paged, -1));
}

add_action('wp_ajax_clampdown_codes_ajax_get_codes', 'clampdown_codes_ajax_get_codes');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_get_codes', 'clampdown_codes_ajax_get_codes');

function clampdown_codes_ajax_delete_codes() {
  extract($_POST);
  global $clampdownCodesQuery;
  $clampdownCodesQuery->deleteCodes(explode(',', $codes));

  wp_send_json([
    'successfull' => true,
    'message' => sprintf('%s', __('Delete successfully.', 'cgc')),
  ]);
}

add_action('wp_ajax_clampdown_codes_ajax_delete_codes', 'clampdown_codes_ajax_delete_codes');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_delete_codes', 'clampdown_codes_ajax_delete_codes');

function clampdown_codes_ajax_auto_generate_codes() {
  extract($_POST);
  global $clampdownCodesQuery;
  $clampdownCodesQuery->autoGenerateCodes($number, $group);

  wp_send_json([
    'successfull' => true,
    'message' => sprintf('%s', __('Auto generate successfully.', 'cgc')),
  ]);
}

add_action('wp_ajax_clampdown_codes_ajax_auto_generate_codes', 'clampdown_codes_ajax_auto_generate_codes');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_auto_generate_codes', 'clampdown_codes_ajax_auto_generate_codes');

function clampdown_codes_ajax_get_download_config() {
  wp_send_json(clampdown_codes_get_download_config());
}

add_action('wp_ajax_clampdown_codes_ajax_get_download_config', 'clampdown_codes_ajax_get_download_config');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_get_download_config', 'clampdown_codes_ajax_get_download_config');

function clampdown_codes_ajax_update_download_config() {
  wp_send_json(clampdown_codes_update_download_config($_POST));
}

add_action('wp_ajax_clampdown_codes_ajax_update_download_config', 'clampdown_codes_ajax_update_download_config');
add_action('wp_ajax_nopriv_clampdown_codes_ajax_update_download_config', 'clampdown_codes_ajax_update_download_config');
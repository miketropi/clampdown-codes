<?php 

function clampdown_codes_generate_random_string($length = 6) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

function clampdown_codes_get_download_config() {
  return get_option('clampdown_codes_download_config', '');
}

function clampdown_codes_update_download_config($newConfig) {
  return update_option('clampdown_codes_download_config', $newConfig);
}
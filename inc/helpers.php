<?php 
use League\Csv\Reader;

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

function clampdown_codes_validate($code = '', $group = '') {
  global $clampdownCodesQuery;
  $result = $clampdownCodesQuery->validate($code, $group);
  return $result;
}

function clampdown_codes_get_file_download($group) {
  $config = clampdown_codes_get_download_config();
  $thumb_key = 'thumbnail_url_' . str_replace(' ', '_', $group);
  $download_file_key = 'download_file_' . str_replace(' ', '_', $group);
  
  if(isset($config[$thumb_key]) && isset($config[$thumb_key])) {
    return [$config[$thumb_key], $config[$thumb_key]];
  }

  return false;
}

function clampdown_codes_update_code_status_success($code) {

}

function clampdown_codes_validate_progress($code = '', $group = '') {
  $result = clampdown_codes_validate($code, $group);

  if(! $result) return [
    'successful' => false,
    'message' => __('Code invalid.', 'cgc')
  ];

  $downloadResult = clampdown_codes_get_file_download($result['group']);

  if($downloadResult == false) return [
    'successful' => false,
    'message' => __('Download file unavailable.', 'cgc')
  ];

  list($thumb, $download) = $downloadResult;

  return [
    'successful' => true,
    'message' => __('Click button to download, Thank you! 🖐️', 'cgc'),
    'entry' => $result,
    'download' => [
      'thumb' => $thumb,
      'download' => $download,
    ]
  ];
}

function clampdown_codes_read_csv_file_to_json($pathfile = '') {
  $csv = Reader::createFromPath($pathfile, 'r');
  $csv->setHeaderOffset(0);
  // $header = $csv->getHeader(); //returns the CSV header record
  $records = $csv->getRecords(); //returns all the CSV records as an Iterator object
  return json_encode($csv, JSON_PRETTY_PRINT);
}

add_action('init', function() {
  // $upload_dir = wp_upload_dir();
  // $entry = clampdown_codes_read_csv_file_to_json($upload_dir['basedir'] . '/2022/05/SameSideCodes.csv');
  // var_dump($entry);
});
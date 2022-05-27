<?php 
/**
 * Hooks 
 */

/**
 * Download action
 */

function clampdown_condes__df($urlFile){
  $file_name  =   basename($urlFile);
  //save the file by using base name
  $fn = file_put_contents($file_name, file_get_contents($urlFile));
  header("Expires: 0");
  header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header("Content-type: application/file");
  header('Content-length: '.filesize($file_name));
  header('Content-disposition: attachment; filename="'.basename($file_name).'"');
  readfile($file_name);
}

add_action('init', function() {
  if(!isset($_GET['clampdown_codes_download']) && !isset($_GET['__group'])) return;
  $code = $_GET['clampdown_codes_download'];
  $group = $_GET['__group'];

  global $clampdownCodesQuery;
  $result = clampdown_codes_validate_progress($code, $group);
  if($result['successful'] != true) return;

  $clampdownCodesQuery->updateAvailable($code, 0);
  clampdown_condes__df($result['download']['download']);
});
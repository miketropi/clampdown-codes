<?php 
/**
 * Admin 
 */

function clampdown_coeds_register_menu_page() {
  add_menu_page(
    __('Clampdown Codes', 'cgc'),
    __('Clampdown Codes', 'cgc'),
    'manage_options',
    'clampdown-codes',
    'clampdown_coeds_register_menu_page_callback',
    'dashicons-block-default',
    30
  );
}
add_action('admin_menu', 'clampdown_coeds_register_menu_page');

function clampdown_coeds_register_menu_page_callback() {
  ?>
  <div id="CLAMPDOWN_CODES_APP">
    <!-- React rendering -->
  </div> <!-- #CLAMPDOWN_CODES_APP -->
  <?php
}

add_action('admin_init', function() {
  if(isset($_GET['dev'])) {
    global $clampdownCodesQuery;
    // var_dump($clampdownCodesQuery->autoGenerateCodes(30, 'Sameside'));
  }
});
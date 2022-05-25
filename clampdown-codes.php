<?php 
/**
  * Plugin Name: Clampdown Generate Codes
  * Plugin URI: #
  * Description: Clampdown generate codes
  * Author: Be+
  * Author URI: #
  * License: GPLv2 or later
  * Text Domain: cgc
 */

{
  /**
   * Defined
   */
  define('CGC_VER', '1.0.0');
  define('CGC_FILE_URL', __FILE__);
  define('CGC_DIR', plugin_dir_path(__FILE__));
  define('CGC_URI', plugin_dir_url(__FILE__));
}

{
  /**
   * Inc
   */
  require(CGC_DIR . '/inc/query.php');
  require(CGC_DIR . '/inc/static.php');
  require(CGC_DIR . '/inc/helpers.php');
  require(CGC_DIR . '/inc/ajax.php');
  require(CGC_DIR . '/inc/hooks.php');
  require(CGC_DIR . '/inc/admin/admin.php');

  /**
   * Shortcodes
   */
  require(CGC_DIR . '/inc/shortcodes/download-form.php');

  require(CGC_DIR . '/active.php');
  require(CGC_DIR . '/uninstall.php');
}
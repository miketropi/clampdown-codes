<?php 
/**
  * Plugin Name: Clampdown Generate Codes
  * Plugin URI: https://akismet.com/
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
  define('CGC_DIR', plugin_dir_path(__FILE__));
  define('CGC_URI', plugin_dir_url(__FILE__));
}

{
  /**
   * Inc
   */
  require(CGC_DIR . '/inc/static.php');
  require(CGC_DIR . '/inc/helpers.php');
  require(CGC_DIR . '/inc/ajax.php');
  require(CGC_DIR . '/inc/hooks.php');
}
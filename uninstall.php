<?php 
/**
 * Uninstall func here!
 */

function clampdown_codes_remove_database() {
  global $wpdb;
  $table_name = $wpdb->prefix . 'clampdown_codes';
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);
}

register_uninstall_hook(__FILE__, 'clampdown_codes_remove_database');
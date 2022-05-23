<?php 
/**
 * Active hook 
 */

function clampdown_codes_active_hook() {
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

  global $wpdb;
	$charset_collate = $wpdb->get_charset_collate();
	$table_name = $wpdb->prefix . 'clampdown_codes';

	$sql = "CREATE TABLE $table_name (
		`id` int(9) NOT NULL AUTO_INCREMENT,
    `code` varchar(9) NOT NULL UNIQUE,
    `available` int(1) NOT NULL DEFAULT '1',
    `time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    `group` text NOT NULL,
    `metavalue` json NOT NULL,
    PRIMARY KEY (`id`)
	) $charset_collate;";

	maybe_create_table($table_name, $sql);
}

register_activation_hook(__FILE__, 'clampdown_codes_active_hook');
<?php 
/**
 * Static 
 */

function clampdown_codes_enqueue_scripts() {
  wp_enqueue_style('clampdown_codes_style', CGC_URI . '/dist/fe.clampdown-codes.bundle.css', false, CGC_VER);
  wp_enqueue_script('clampdown_codes_script', CGC_URI . '/dist/fe.clampdown-codes.bundle.js', ['jquery'], CGC_VER, true);

  wp_localize_script('clampdown_codes_script', 'CGC_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'lang' => [],
  ]);
}

add_action('wp_enqueue_scripts', 'clampdown_codes_enqueue_scripts', 30);

function clampdown_codes_admin_enqueue_scripts() {
  wp_enqueue_style('clampdown_codes_admin_style', CGC_URI . '/dist/be.clampdown-codes.bundle.css', false, CGC_VER);
  wp_enqueue_script('clampdown_codes_admin_script', CGC_URI . '/dist/be.clampdown-codes.bundle.js', ['jquery'], CGC_VER, true);

  wp_localize_script('clampdown_codes_admin_script', 'CGC_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'lang' => [],
  ]);
}

add_action('admin_enqueue_scripts', 'clampdown_codes_admin_enqueue_scripts', 30);
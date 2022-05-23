<?php 
/**
 * Query
 */

class ClampdownCodesQuery {

  private static $instances = null;
  public $_wpdb, $table_name;

  public function getInstance() {
    if(Self::$instances == null) {
      Self::$instances = new ClampdownCodesQuery();
    }

    return Self::$instances;
  }

  function __construct() {
    global $wpdb;
    $this->_wpdb = $wpdb;
    $this->table_name = $wpdb->prefix . 'clampdown_codes';
  }

  public function getCodes($numberPerPage = 20, $paged = 1, $where = [], $orderBy = 'time', $sort = 'DESC') {
    $q = 'SELECT * FROM '. $this->table_name;

    if($where['s']) {
      $q .= sprintf(" WHERE `code` LIKE '%%s%'", $where['s']);
    }

    if(! empty($orderBy)) {
      $q .= sprintf(" ORDER BY `%s` %s", $orderBy, $sort);
    }

    $q .= sprintf(" LIMIT %s, %s", ($numberPerPage * ($paged - 1)), $numberPerPage);

    $results = $this->_wpdb->get_results($this->_wpdb->prepare($q));
    return $results;
  }

  public function getCode($code = 'null') {
    $q = sprintf('SELECT * FROM `%s` WHERE `code`=\'%s\'', $this->table_name, $code);
    $result = $this->_wpdb->get_row($this->_wpdb->prepare($q));
    return $result;
  }
}

$GLOBALS['clampdownCodesQuery'] = new ClampdownCodesQuery();
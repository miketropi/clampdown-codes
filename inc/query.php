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

  public function getCodes($paged = 1, $numberPerPage = 20, $where = [], $orderBy = 'time', $sort = 'DESC') {
    $q = 'SELECT * FROM '. $this->table_name;

    if(isset($where['s']) && $where['s']) {
      $q .= sprintf(" WHERE `code` LIKE '%%s%'", $where['s']);
    }

    if(! empty($orderBy)) {
      $q .= sprintf(" ORDER BY `%s` %s", $orderBy, $sort);
    }

    if($numberPerPage != -1) {
      $q .= sprintf(" LIMIT %s, %s", ($numberPerPage * ($paged - 1)), $numberPerPage);
    }

    $results = @$this->_wpdb->get_results($this->_wpdb->prepare($q, []));
    return $results;
  }

  public function getCode($code = 'null') {
    $q = sprintf('SELECT * FROM `%s` WHERE `code`=\'%s\'', $this->table_name, $code);
    $result = @$this->_wpdb->get_row($this->_wpdb->prepare($q, []), 'ARRAY_A');
    return $result;
  }

  public function addCode($code = null, $group = null) {
    $this->_wpdb->hide_errors();
    $resule = $this->_wpdb->insert($this->table_name, [
      'code' => $code,
      'group' => $group,
      'metavalue' => '{}',
      'time' => date('Y-m-d H:i:s', current_time('timestamp', 1)),
    ], ['%s', '%s', '%s', '%s']);

    if($resule === false) {
      return [
        'error' => true,
        'message' => $this->_wpdb->last_error,
      ];
    }

    return $this->_wpdb->insert_id;
  }

  public function deleteCodes($codes = []) {
    $ids = implode(',', array_map('absint', $codes));
    $result = $this->_wpdb->query(sprintf("DELETE FROM `%s` WHERE id IN(%s)", $this->table_name, $ids));
    return $result;
  }

  public function autoGenerateCodes($num = 30, $group = null) {
    $fixedGroup = ['Sameside', 'Likepacific', 'Glennchatten', 'Brutalplanet', 'Wanderlust', 'Morons', 'Auroras', 'La Guns'];
    if(!in_array($group, $fixedGroup)) {
      return false;
    }

    $results = [];

    for($i = 1; $i <= $num; $i++) {
      $r = $this->addCode(clampdown_codes_generate_random_string(6), $group);
      array_push($results, $r);
    }

    return $results;
  }
}

$GLOBALS['clampdownCodesQuery'] = new ClampdownCodesQuery();
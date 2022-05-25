<?php 
/**
 * Download form shorcode template 
 */

?>
<div class="clampdown-codes-donwload-form <?php echo $atts['classes'] ?>">
  <form action="" method="POST" class="clampdown-code-download-form-control">
    <input type="text" name="code" required placeholder="Enter your code.">
    <input type="hidden" name="group" value="<?php echo $atts['group'] ?>">
    <button type="submit" name="download-form-submit" value="1"><?php _e('Validate', 'cgc') ?></button>
  </form>

  <div class="clampdown-codes-donwload-form__result">
    
  </div>
</div>
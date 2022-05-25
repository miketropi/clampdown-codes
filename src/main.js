/**
 * Clampdown Codes Script
 */
import reduce from 'lodash/reduce';
import './scss/main.scss';

;((w, $) => {
  'use strict';

  const AJAX_URL = CGC_PHP_DATA.ajax_url;

  const alertRender = (content, type = 'info') => {
    return `<div class="clampdown-codes-alert clampdown-codes-alert__${ type }">
      ${ content }
    </div>`
  }

  const updateResult = (result, $form) => {
    let $result = $form.parent().find('.clampdown-codes-donwload-form__result');
    let _html = alertRender(result.message, result.successful == true ? 'success' : 'error');
    $result.empty();

    if(result.successful != true) {
      $result.html(_html);
      return;
    }

    let template = `<div class="__thumb">
      <img src="${ result.download.thumb }" alt="#" />
    </div>
    <a href="${ result.download.download }" class="button">Download</a>`;

    _html += template;

    $result.html(_html);
  }

  const validateFormHandling = ($form) => {
    const $buttonSubmit = $form.find('button[type=submit]');

    $form.on('submit', async e => {
      e.preventDefault();

      $buttonSubmit.addClass('__ajax-handling');

      let data = reduce($form.serializeArray(), (_new, _val, _key) => {
        _new[`${ _val.name }`] = _val.value;
        return _new;
      }, {});

      // console.log(data);
      const result = await $.ajax({
        method: 'POST',
        url: AJAX_URL,
        data: {
          action: 'clampdown_codes_ajax_validate',
          data
        },
        error: e => {
          console.error(e);
        }
      })

      $buttonSubmit.removeClass('__ajax-handling');

      console.log(result);
      updateResult(result, $form);
    })
  }

  const Ready = () => {
    // validateFormHandling();
    
    $('form.clampdown-code-download-form-control').each( function() {
      new validateFormHandling($(this));
    })
  }

  $(Ready);
})(window, jQuery)
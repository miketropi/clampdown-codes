import map from 'lodash/map'

export const appRequest = async (action = '', data = {}, method = 'POST', headers = {}) => {
  const formData = new FormData();
  
  map(data, (val, key) => {
    formData.append(key, val);
  })

  const result = await fetch(`${ CGC_PHP_DATA.ajax_url }?action=${ action }`, {
    method,
    headers: { ...headers },
    body: formData,
  })
  return await result.json()
}

export const addCode = async (code, group) => {
  return await appRequest('clampdown_codes_ajax_add_code', { code, group });
}

export const getCodes = async ({ paged = 1, numberPerPage = 20 }) => {
  return await appRequest('clampdown_codes_ajax_get_codes', { paged, numberPerPage });
}

export const deleteCodes = async (codes = []) => {
  return await appRequest('clampdown_codes_ajax_delete_codes', { codes })
}

export const autoGenerateCodes = async (number, group) => {
  return await appRequest('clampdown_codes_ajax_auto_generate_codes', { number, group });
}

export const getDownloadConfig = async () => {
  return await appRequest('clampdown_codes_ajax_get_download_config', {});
}

export const updateDownloadConfig = async (config) => {
  return await appRequest('clampdown_codes_ajax_update_download_config', { ...config });
}

export const importData = async (data, group) => {
  return await jQuery.ajax({
    type: 'POST',
    url: CGC_PHP_DATA.ajax_url,
    data: {
      action: 'clampdown_codes_ajax_import_data',
      data,
      group
    },
  })
}
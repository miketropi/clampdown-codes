import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components';
import { Form, Modal, message, Upload, Alert, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

const { Dragger } = Upload;
const ImportModalContainer = styled.div``
const ResultUploadContainer = styled.div`
  margin-top: 1em;
`

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function(chunkSize) {
    var array = this;
    return [].concat.apply([],
      array.map(function(elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
});

export default ({ visible, onImport, onCancel }) => {
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });
  const [dataImport, setDataImport] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();

  const onChangeUploadFile = (info) => {
    if(!info.file.response) return;

    let { entry, successful, result, message } = info.file.response;
    setUploadSuccessful(successful);
    setAlert({
      type: successful ? 'success' : 'error',
      message,
      show: true
    });

    console.log('onChangeUploadFile', entry, successful, result, message);
  }

  const onUploadFileHandle = () => {
    const formData = new FormData();
    // console.log(fileList); return;
    formData.append('file', fileList[0]);

    setUploading(true);

    fetch(`${ CGC_PHP_DATA.ajax_url }?action=clampdown_codes_ajax_upload_file_import`, {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.successful != true) return;

      setFileList([]);
      message.success('upload successfully.');

      setDataImport(res.entry)
    })
    .catch(() => {
      message.error('upload failed.');
    })
    .finally(() => {
      setUploading(false);
    });
  }

  const propsImport = {
    accept: '.csv',
    multiple: false,
    onChange: (info) => {
      if(fileList.length > 0 && uploading == false) {
        onUploadFileHandle();
      } 
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList
  };

  return <ImportModalContainer>
    <Modal
      visible={visible}
      title={ __('Import Codes', 'cgc') }
      okText={ __('Import', 'cgc') }
      cancelText={ __('Cancel', 'cgc') }
      onCancel={ onCancel }
      onOK={ e => {

        onImport()
      } } >
      <Upload { ...propsImport }>
        <Button 
          icon={<UploadOutlined />}
          loading={ uploading }
          disabled={ uploading } >
          { uploading ? __( 'Uploading', 'cgc' ) : __('Select File', 'cgc') }
        </Button>
      </Upload>

      <ResultUploadContainer>
        {
          dataImport.length > 0 &&
          <Fragment>
            <Typography.Title level={ 5 }>You have { dataImport.length } entries, click [button Import] to start proccess.</Typography.Title>

            {
              console.log(dataImport.chunk_inefficient(100))
            }
          </Fragment>
        }
      </ResultUploadContainer>
    </Modal>
  </ImportModalContainer>
}
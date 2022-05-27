import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components';
import { Form, Modal, message, Upload, Alert, Button, Typography, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { importData } from '../lib/api';
import { useAdminApp } from '../context/AppAdminContext';

const { Dragger } = Upload;
const ImportModalContainer = styled.div``
const ResultUploadContainer = styled.div`
  margin: 1em 0;
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
  const { group } = useAdminApp();
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', show: false });
  const [dataImport, setDataImport] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [groupSelected, setGroupSelected] = useState(group[0]);
  const [done, setDone] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if(done == true) {
      setDataImport([]);
    }
  }, [done])

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

  const importHandle = async () => {
    let segmentData = [...dataImport].chunk_inefficient(100);
    let result = [];
    for(let i = 0; i <= segmentData.length - 1; i++) {
      let r = await importData(segmentData[i], groupSelected);
      result.push(r);
      console.log('__', i, r);
    }

    setDone(true);
    // console.log(result);
  }

  return <ImportModalContainer>
    <Modal
      visible={visible}
      title={ __('Import Codes', 'cgc') }
      okText={ (dataImport.length > 0 ? `Import ${ dataImport.length } codes to #${ groupSelected }` : 'Import') }
      cancelText={ __('Cancel', 'cgc') }
      onCancel={ onCancel }
      confirmLoading={ confirmLoading }
      okButtonProps={{ disabled: (dataImport.length > 0 ? false : true) }}
      onOk={ async (e) => {
        setConfirmLoading(true);
        await importHandle();
        setConfirmLoading(false);
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
            <Typography.Title level={ 5 }>You have { dataImport.length } entries, select group <Select defaultValue={ groupSelected } onChange={ value => setGroupSelected(value) }>
              {
                group.map( g => <Select.Option value={ g } key={ g } >{ g }</Select.Option> )
              }
            </Select> and click [button Import] to start proccess.</Typography.Title>
          </Fragment>
        }
      </ResultUploadContainer>

      {
        done == true &&
        <Alert message={ __('Import completed, please reload page to update list data.') } type="success" showIcon />
      }
      
    </Modal>
  </ImportModalContainer>
}
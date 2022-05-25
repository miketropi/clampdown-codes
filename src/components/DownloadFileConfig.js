import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Typography, List, Divider, Button, Modal, Form, Input, notification, Badge } from 'antd';
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import { useAdminApp } from '../context/AppAdminContext';
import { getDownloadConfig, updateDownloadConfig } from '../lib/api';
import { __ } from '@wordpress/i18n';

const DownloadFileConfigContainer = styled.div``
const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

export default () => {
  const { group } = useAdminApp();
  const [downloadConfig, setDownloadConfig] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupSelected, setGroupSelected] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    const _getDownloadConfig = async () => {
      const result = await getDownloadConfig();
      setDownloadConfig(result || {})
    }

    _getDownloadConfig();
  }, []);

  const onFinish = async (values) => {
    let newDownloadConfig = { ...downloadConfig, ...values };
    setDownloadConfig(newDownloadConfig);

    const result = await updateDownloadConfig(newDownloadConfig);
    if(result == true) {
      form.resetFields();
      setIsModalVisible(false);

      notification['success']({
        message: 'Message',
        description: `Update successfully.`,
      });
    } else {
      alert('Error: reload page & try again please!')
    }
  }

  const helpText = <Fragment>
    URL to an image you want to show in the email header. Upload images using the media uploader (Admin › <a target="_blank" href="/wp-admin/upload.php">Media</a>).
  </Fragment>

  return <DownloadFileConfigContainer>
    <Typography.Title level={ 5 } style={{ borderBottom: '1px solid #eee', padding: '.5em 0', marginBottom: '1em' }}>
      { __('Download Config', 'cgc') } 
      <SettingOutlined style={{ marginLeft: '.5em' }} />
    </Typography.Title>
    
    <List
      size="small"
      bordered
      dataSource={ group }
      renderItem={ g => <List.Item>
        <ListItemContainer>
          <Badge dot={ downloadConfig[`thumbnail_url_${ g.replaceAll(' ', '_') }`] ? false : true } >
            <div style={{ paddingRight: '5px' }}>{ g }</div>
          </Badge>
          <Button
            type="text"
            onClick={ e => {
              setIsModalVisible(true);
              setGroupSelected(g)
              form.setFieldsValue(downloadConfig)
            } }
            icon={
              <EditOutlined
                style={{
                  fontSize: 16,
                }}
              />
            }
          />
        </ListItemContainer>
      </List.Item>}
    />

    <Modal 
      title={ `Config File Download for #${ groupSelected }` } 
      visible={ isModalVisible } 
      onOk={ () => {
        form
          .validateFields()
          .then(async (values) => {
            await onFinish(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      } } 
      onCancel={ e => {
        setIsModalVisible(false);
        setGroupSelected('');
      } }>
      <Form
        name='download_config_item'
        layout='vertical'
        form={ form }
        initialValues={{
          modifier: 'public',
        }} >
        <Form.Item
          name={ `thumbnail_url_${ groupSelected.replaceAll(' ', '_') }` }
          label={ __('Thumbnail Url', 'cgc') }
          extra={ helpText } >
          <Input style={{ borderRadius: '1px' }} />
        </Form.Item>
        <Form.Item
          name={ `download_file_${ groupSelected.replaceAll(' ', '_') }` }
          label={ __('Download File', 'cgc') }
          extra={ helpText } >
          <Input style={{ borderRadius: '1px' }} />
        </Form.Item>
      </Form>
    </Modal>
  </DownloadFileConfigContainer>
}
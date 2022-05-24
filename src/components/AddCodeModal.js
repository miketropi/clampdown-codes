import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Modal, Select, Alert } from 'antd';
import { __ } from '@wordpress/i18n';
import { generateCode } from '../lib/lib';
import { useAdminApp } from '../context/AppAdminContext';

export default ({ visible, onCreate, onCancel }) => {
  const { message, setMessage } = useAdminApp();
  const [form] = Form.useForm();

  const autoGenerateCode = () => {
    console.log(generateCode(6))
    form.setFieldsValue({
      code: generateCode(6),
    })
  }

  return <Modal
    visible={visible}
    title={ __('Create a new Code', 'cgc') }
    okText={ __('Create', 'cgc') }
    cancelText={ __('Cancel', 'cgc') }
    onCancel={ onCancel }
    onOk={() => {
      form
        .validateFields()
        .then(async (values) => {
          const result = await onCreate(values);
          if(result.successfull == true) {
            form.resetFields();
          } else {

          }
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }} >

    {
      message.show == true &&
      <Alert message={ message.message } type={ message.type } style={{ marginBottom: '2em' }}></Alert>
    }

    <Form
      form={ form }
      layout="vertical"
      name="clampdown_create_codes"
      initialValues={{
        modifier: 'public',
      }} >
      <Form.Item
        label={ __('Enter Code', 'cgc') }
        >
        <Input.Group compact className="custom-field-group-inline">
          <Form.Item
            noStyle={ true }
            name={ __('code', 'cgc') }
            rules={[
              {
                required: true,
                message: __('Please input the code!', 'cgc'),
              },
            ]}
            style={{ width: '100%' }}
            >
            <Input
              style={{ borderRadius: '1px', paddingTop: '1px', paddingBottom: '1px' }}
              placeholder={ __('Enter your code', 'cgc') }
              />
          </Form.Item>
          <Button type="primary" onClick={ autoGenerateCode }>{ __('Generate Code', 'cgc') }</Button>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name={ __('group', 'cgc') }
        label={ __('Select Group', 'cgc') }
        rules={[
          {
            required: true,
            message: __('Please select a group!', 'cgc'),
          },
        ]} >
        <Select placeholder={ __('Select group', 'cgc') }>
          <Select.Option value="Sameside">{ __('Sameside', 'cgc') }</Select.Option>
          <Select.Option value="Likepacific">{ __('Likepacific', 'cgc') }</Select.Option>
          <Select.Option value="Glennchatten">{ __('Glennchatten', 'cgc') }</Select.Option>
          <Select.Option value="Brutalplanet">{ __('Brutalplanet', 'cgc') }</Select.Option>
          <Select.Option value="Wanderlust">{ __('Wanderlust', 'cgc') }</Select.Option>
          <Select.Option value="Morons">{ __('Morons', 'cgc') }</Select.Option>
          <Select.Option value="Auroras">{ __('Auroras', 'cgc') }</Select.Option>
          <Select.Option value="La Guns">{ __('La Guns', 'cgc') }</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>
}
import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Modal, Select } from 'antd';
import { __ } from '@wordpress/i18n';

export default ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return <Modal
    visible={visible}
    title={ __('Create a new Code', 'cgc') }
    okText={ __('Create', 'cgc') }
    cancelText={ __('Cancel', 'cgc') }
    onCancel={ onCancel }
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }} >
    <Form
      form={ form }
      layout="vertical"
      name="clampdown_create_codes"
      initialValues={{
        modifier: 'public',
      }} >
      <Form.Item
        name={ __('code', 'cgc') }
        label={ __('Enter Code', 'cgc') }
        rules={[
          {
            required: true,
            message: __('Please input the code!', 'cgc'),
          },
        ]} >
        <Input placeholder={ __('Enter your code', 'cgc') } />
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
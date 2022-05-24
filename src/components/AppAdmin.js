import React, { useState, useEffect } from 'react';
import { useAdminApp } from '../context/AppAdminContext';
import styled from 'styled-components';
import { PageHeader, Button, Table } from 'antd';
import AddCodeModalForm from './AddCodeModal';
import CodesTable from './CodesTable';
import DropdownMenu from './DropdownMenu';
import { __ } from '@wordpress/i18n';

const AppAdminContainer = styled.div`
  width: 860px;
  margin: 2em auto;

  .site-page-header {
    border: 1px solid rgb(235, 237, 240);
  }
`

export default () => {
  const [visible, setVisible] = useState(false);
  const { message, codes, addCodeHandle, selectedRowKeys, deleteCodesHandle } = useAdminApp();

  const onCreate = async (values) => {
    return await addCodeHandle(values);
  }

  return <AppAdminContainer>
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title={ __('Clampdown Codes', 'cgc') }
      subTitle={ __('List all', 'cgc') }
      extra={[
        <Button key="ADD_CODE" onClick={ e => { setVisible(true) } }>{ __('Add Code', 'cgc') }</Button>,
        <Button key="DELETE_CODES" onClick={ deleteCodesHandle } type="primary" danger disabled={ (selectedRowKeys.length == 0 ? true : false) }>{ __('Delete Code(s)', 'cgc') }</Button>,
        <DropdownMenu key="more" />,
      ]}
      style={{ marginBottom: '2em' }}
    />

    {
      codes.length > 0 &&
      <CodesTable codes={ codes } />
    }
    
    <AddCodeModalForm 
      visible={ visible }
      onCreate={ onCreate }
      onCancel={() => {
        setVisible(false);
      }} />
  </AppAdminContainer>
}
import React, { useState, useEffect } from 'react';
import { useAdminApp } from '../context/AppAdminContext';
import styled from 'styled-components';
import { PageHeader, Button } from 'antd';
import AddCodeModalForm from './AddCodeModal';
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
  const { message } = useAdminApp();

  const onCreate = (values) => {
    console.log(values);
  }

  return <AppAdminContainer>
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title={ __('Clampdown Codes', 'cgc') }
      subTitle={ __('List all', 'cgc') }
      extra={[
        <Button key="ADD_CODE" onClick={ e => { setVisible(true) } }>{ __('Add Code', 'cgc') }</Button>
      ]}
    />
    <AddCodeModalForm 
      visible={ visible }
      onCreate={ onCreate }
      onCancel={() => {
        setVisible(false);
      }} />
  </AppAdminContainer>
}
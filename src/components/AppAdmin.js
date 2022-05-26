import React, { useState, useEffect } from 'react';
import { useAdminApp } from '../context/AppAdminContext';
import styled from 'styled-components';
import { PageHeader, Button, Badge, Row, Col } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import AddCodeModalForm from './AddCodeModal';
import CodesTable from './CodesTable';
import DropdownMenu from './DropdownMenu';
import DownloadFileConfig from './DownloadFileConfig';
import ImportModal from './ImportModal';
import { __ } from '@wordpress/i18n';

const AppAdminContainer = styled.div`
  width: 1200px;
  max-width: 90%;
  margin: 2em auto;

  .site-page-header {
    border: 1px solid rgb(235, 237, 240);
  }
`

export default () => {
  const [visible, setVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const { codes, addCodeHandle, selectedRowKeys, deleteCodesHandle } = useAdminApp();

  const onCreate = async (values) => {
    return await addCodeHandle(values);
  }

  const onImport = async (values) => {

  }

  return <AppAdminContainer>
    <Row gutter={ 48 }>
      <Col span={ 18 }>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title={ __('Clampdown Codes', 'cgc') }
          subTitle={ __(`All codes (${ codes.length })`, 'cgc') }
          extra={[
            <Button key="ADD_CODE" onClick={ e => { setVisible(true) } }>{ __('Add Code', 'cgc') }</Button>,
            <Button key="IMPORT_CODE" onClick={ e => { setImportModalVisible(true) } } icon={ <FileDoneOutlined /> }>{ __('Import Code', 'cgc') }</Button>,
            <Button key="DELETE_CODES" onClick={ deleteCodesHandle } type="primary" danger disabled={ (selectedRowKeys.length == 0 ? true : false) }>{ __('Delete Code(s)', 'cgc') }</Button>,
            <DropdownMenu key="more" />,
          ]}
          style={{ marginBottom: '2em' }}
        />

        {
          codes.length > 0 &&
          <CodesTable codes={ codes } />
        }
      </Col>
      <Col span={ 6 }>
        <DownloadFileConfig />
      </Col>
    </Row>
    
    <AddCodeModalForm 
      visible={ visible }
      onCreate={ onCreate }
      onCancel={() => {
        setVisible(false);
      }} />

    <ImportModal 
      visible={ importModalVisible }
      onCreate={ onImport }
      onCancel={ () => {
        setImportModalVisible(false);
      } } />
  </AppAdminContainer>
}
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Table, Input, Tag, Typography, Button } from 'antd';
import { __ } from '@wordpress/i18n';
import { useAdminApp } from '../context/AppAdminContext';

const CodesTableContainer = styled.div`

`

export default ({ codes }) => {
  const { selectedRowKeys, setSelectedRowKeys } = useAdminApp();
  const [search, setSearch] = useState('');

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: code => {
        return <Typography.Paragraph copyable>{ code }</Typography.Paragraph>
      }
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
      render: (status) => {
        return status === '1' ? <Tag color="#87d068">{ __('Avaiable', 'cgc') }</Tag> : <Tag color="rgb(61 207 99)">{ __('Unavailable', 'cgc') }</Tag>;
      } 
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Created Date',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'MetaData',
      dataIndex: 'metavalue',
      key: 'metavalue',
    },
    // {
    //   title: 'Actions',
    //   dataIndex: 'actions',
    //   key: 'actions',
    //   render: () => {
    //     return <Fragment>
    //       <Button type="primary" danger>{ __('Delete', 'cgc') }</Button>
    //     </Fragment>
    //   }
    // },
  ];

  const onChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return <CodesTableContainer>
    <Input 
      type="search" 
      placeholder="Search code..."  
      value={ search } 
      onInput={ e => setSearch(e.target.value) }
      style={{ borderRadius: '1px', marginBottom: '2em', width: '200px' }} />
    <Table 
      rowSelection={ rowSelection } 
      columns={ columns } 
      dataSource={ codes.filter( item => (item.code.indexOf(search) > -1) ) } 
      bordered 
      pagination={{ defaultCurrent: 1, defaultPageSize: 10, total: codes.filter( item => (item.code.indexOf(search) > -1) ).length }} 
      onChange={ onChange } />
  </CodesTableContainer>
}
import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Input, Tag, Typography, Select } from 'antd';
import { __ } from '@wordpress/i18n';
import { useAdminApp } from '../context/AppAdminContext';

const CodesTableContainer = styled.div`

`

const FilterBarContainer = styled.div`
  > * {
    margin-right: 2em;
  }
`

export default ({ codes }) => {
  const { selectedRowKeys, setSelectedRowKeys, group } = useAdminApp();
  const [search, setSearch] = useState('');
  const [filterByGroup, setFilterByGroup] = useState('');

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
        return status === '1' ? <Tag color="rgb(61 207 99)">{ __('Avaiable', 'cgc') }</Tag> : <Tag color="rgb(249 50 78)">{ __('Unavailable', 'cgc') }</Tag>;
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
    // {
    //   title: 'MetaData',
    //   dataIndex: 'metavalue',
    //   key: 'metavalue',
    // }
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
    <FilterBarContainer>
      <Input 
        type="search" 
        placeholder="Search Code..."  
        value={ search } 
        onInput={ e => setSearch(e.target.value) }
        style={{ borderRadius: '1px', marginBottom: '2em', width: '200px' }} />
        
      <Select 
        placeholder={ __('Filter by Group', 'cgc') }
        onChange={ val => setFilterByGroup(val) }
        allowClear={ true }
        style={{ width: '200px' }}>
        {
          group.map( g => <Select.Option value={ g } key={ g }>{ g }</Select.Option> )
        }
      </Select>
    </FilterBarContainer>
    
    <Table 
      rowSelection={ rowSelection } 
      columns={ columns } 
      dataSource={ codes.filter( item => {
        return (filterByGroup ? item.group == filterByGroup : true);
      } ).filter( item => {
        return (item.code.indexOf(search) > -1)
      } ) } 
      bordered 
      pagination={{ 
        defaultCurrent: 1, 
        defaultPageSize: 10, 
        total: codes.filter( item => {
          return (filterByGroup ? item.group == filterByGroup : true);
        } ).filter( item => {
          return (item.code.indexOf(search) > -1)
        } ).length }} 
      onChange={ onChange } />
  </CodesTableContainer>
}
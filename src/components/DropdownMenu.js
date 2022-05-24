import React from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { useAdminApp } from '../context/AppAdminContext';

export const menu = () => {
  const group = ['Sameside', 'Likepacific', 'Glennchatten', 'Brutalplanet', 'Wanderlust', 'Morons', 'Auroras', 'La Guns'];
  // const { autoGenerateCodesHandle } = useAdminApp();

  return <Menu
  items={ group.map(g => {
    return {
      key: uuidv4(),
      label: (
        <Button type="link" style={{ color: 'black' }} onClick={ e => {
          autoGenerateCodesHandle(30, g);
        } }>{ __(`Auto generate 30 codes for #${ g }`, 'cgc') }</Button>
      )
    }
  }) }
/>
};

export default () => {
  const { autoGenerateCodesHandle } = useAdminApp(); 
  return <Dropdown key="more" overlay={ menu } placement="bottomRight">
    <Button
      type="text"
      icon={
        <MoreOutlined
          style={{
            fontSize: 20,
          }}
        />
      }
    />
  </Dropdown>
}
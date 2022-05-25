import React from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';
import { AdminAppContext } from '../context/AppAdminContext';

export const menu = () => {
  return <AdminAppContext.Consumer>
    {
      ({ autoGenerateCodesHandle, group }) => {
        const _group = [...group];
        return <Menu
          onClick={ ({ key }) => {
            autoGenerateCodesHandle(30, key);
          } }
          items={ _group.map(g => {
            return {
              key: g,
              label: (
                <Button type="link" style={{ color: 'black' }} >{ __(`Auto generate 30 codes for #${ g }`, 'cgc') }</Button>
              )
            }
          }) }
        />
      }
    }
  </AdminAppContext.Consumer>
};

export default () => {
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
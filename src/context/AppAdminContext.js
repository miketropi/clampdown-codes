import React, { createContext, useContext, useState, useEffect } from 'react'
import { addCode, getCodes, deleteCodes, autoGenerateCodes } from '../lib/api';
import { notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const AdminAppContext = createContext();

const AdminAppProvider = ({ children }) => {
  const [codes, setCodes] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [group, setGroup] = useState(['Sameside', 'Likepacific', 'Glennchatten', 'Brutalplanet', 'Wanderlust', 'Morons', 'Auroras', 'La Guns']);
  const [message, setMessage] = useState({
    type: 'warning',
    mesasge: '...',
    show: false,
  });

  useEffect(() => {
    const _getCodes = async () => {
      const result = await getCodes({ paged: 1 });
      setCodes(result.map(item => {
        item.key = item.id;
        return item;
      }))
    }

    _getCodes();
  }, [])

  const addCodeHandle = async ({code, group}) => {
    const result = await addCode(code, group);
    let newMessage = { ...message, ...{ message: result.message, show: true } };

    if(result.successfull == true) {
      result.entry.key = result.entry.id;
      let newCodes = [result.entry].concat([...codes]);
      setCodes(newCodes);
      newMessage.type = 'success';
    } else {
      newMessage.type = 'error';
    }

    setMessage(newMessage);
    return result;
  }

  const deleteCodesHandle = () => {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      async onOk() {
        const result = await deleteCodes(selectedRowKeys);
        if(result.successfull == true) {
          notification['success']({
            message: 'Message',
            description: result.message,
          });
        }

        setCodes([...codes].filter(item => !selectedRowKeys.includes(item.id)));
        setSelectedRowKeys([]);
      },
      onCancel() {

      },
    })
  }

  const autoGenerateCodesHandle = (num, group) => {
    Modal.confirm({
      title: `Do you Want auto generate ${ num } codes in #${ group }?`,
      icon: <ExclamationCircleOutlined />,
      content: '💻 Feature Developing...',
      async onOk() {
        // const result = await autoGenerateCodes(num, group)
        // if(result.successfull == true) {
        //   notification['success']({
        //     message: 'Message',
        //     description: result.message, 
        //   });
        // }
      },
      onCancel() {

      },
    })
  }

  const value = {
    message, setMessage,
    codes, setCodes,
    selectedRowKeys, setSelectedRowKeys,
    addCodeHandle,
    deleteCodesHandle,
    autoGenerateCodesHandle,
    group, setGroup,
  };

  return <AdminAppContext.Provider value={ value }>
    { children }
  </AdminAppContext.Provider>
}

const useAdminApp = () => {
  return useContext(AdminAppContext)
}

export { AdminAppContext, AdminAppProvider, useAdminApp };
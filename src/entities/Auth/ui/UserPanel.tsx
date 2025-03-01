import { Button, Space, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { useAuth } from '../lib/useAuth';

import { LoginFormModal } from './LoginFormModal';

export function UserPanel() {
  const { isAuth, logout, user } = useAuth();

  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);

  const handleLoginFormOpen = useCallback(() => {
    setLoginFormIsOpen(() => true);
  }, []);

  if (!isAuth) {
    return (
      <>
        <Button onClick={handleLoginFormOpen} type={'text'}>
          Войти
        </Button>
        <LoginFormModal
          isOpen={loginFormIsOpen}
          setIsOpen={setLoginFormIsOpen}
        />
      </>
    );
  }

  return (
    <Space align={'center'}>
      <UserOutlined />
      <Typography.Text type={'secondary'}>
        {user?.full_name}
      </Typography.Text>
      <Button
        shape={'circle'}
        type={'text'}
        onClick={logout}
        icon={<LogoutOutlined />}
      />
    </Space>
  );
}

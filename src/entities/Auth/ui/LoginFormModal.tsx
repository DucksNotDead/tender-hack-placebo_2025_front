import { Form, Input, Modal } from 'antd';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { IAuthCredits } from '../model/authTypes';
import { useAuth } from '../lib/useAuth';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function LoginFormModal({ isOpen, setIsOpen }: IProps) {
  const { login } = useAuth();
  const [form] = Form.useForm<IAuthCredits>();
  const fields = Form.useWatch([], form);
  const [isReady, setIsReady] = useState(false);

  const handleCancel = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  const handleOk = useCallback(() => {
    handleCancel();
    login(fields);
  }, [handleCancel, login, fields]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsReady(() => true))
      .catch(() => setIsReady(() => false));
  }, [fields, form]);

  return (
    <Modal
      title="Вход"
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Войти"
      cancelText="Отмена"
      okButtonProps={{ disabled: !isReady }}
      destroyOnClose
    >
      <Form
        form={form}
        name="login_form"
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя пользователя!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

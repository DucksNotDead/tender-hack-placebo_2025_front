import { Button, Form, Input, Modal, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { appMessages } from 'shared/appMessages';
import { dashboardsApi, TDashboardCreateRequest } from 'entities/Dashboard';
import { useInstance } from 'shared/useInstance';
import { useAuth } from 'entities/Auth';
import { propertiesApi } from 'entities/Property';

import Styles from './HomePageCreateDashboardForm.module.scss';

interface IProps {
  hidden: boolean;
}

export function HomePageCreateDashboardForm({ hidden }: IProps) {
  const [isCreationOpened, setIsCreationOpened] = useState(false);
  const [form] = Form.useForm<TDashboardCreateRequest>();
  const allFields = Form.useWatch([], form);
  const [isFormReady, setIsFormReady] = useState(false);
  const { message } = useInstance();
  const { user } = useAuth();

  const { data: properties, isLoading: propertiesPending } = useQuery({
    queryKey: ['getAllProperties'],
    queryFn: propertiesApi.get,
  });

  const { mutate: createDashboard } = useMutation({
    mutationKey: ['createDashboard'],
    mutationFn: dashboardsApi.createDashboard,
    onSuccess: ({ data }) => {
      void message.success(appMessages.createDashboardSuccess);
      handleClose();
    },
    onError: () => {
      void message.error(appMessages.createDashboardError);
    },
  });

  const handleOpenClick = useCallback(() => {
    setIsCreationOpened(() => true);
  }, []);

  const handleCreate = useCallback(() => {
    if (!allFields?.properties?.length) {
      allFields.properties =
        (properties?.map((prop) => prop.value) as any) ?? [];
    }

    if (user?.id) {
      createDashboard({ ...allFields, owner_id: user.id });
    }
  }, [user, allFields, form, properties]);

  const handleClose = useCallback(() => {
    setIsCreationOpened(() => false);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsFormReady(() => true))
      .catch(() => setIsFormReady(() => false));
  }, [form, allFields]);

  return (
    <>
      <motion.div
        initial={false}
        animate={hidden ? { bottom: -120 } : { bottom: 24 }}
        className={Styles.wrapper}
      >
        <Button
          size={'large'}
          type={'primary'}
          icon={<PlusCircleOutlined />}
          shape={'round'}
          onClick={handleOpenClick}
        >
          Добавить дашборд
        </Button>
      </motion.div>
      <Modal
        title={'Добавить дашборд'}
        open={isCreationOpened}
        onClose={handleClose}
        onCancel={handleClose}
        okButtonProps={{ disabled: !isFormReady }}
        destroyOnClose={true}
        onOk={handleCreate}
      >
        <Form form={form}>
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: appMessages.requiredField }]}
          >
            <Input placeholder={'Введите заголовок'} />
          </Form.Item>
          <Form.Item name={'properties'}>
            <Select
              mode="multiple"
              allowClear
              optionFilterProp="label"
              options={properties}
              loading={propertiesPending}
              placeholder={'Данные дашборда (оставить пустым для всех данных)'}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

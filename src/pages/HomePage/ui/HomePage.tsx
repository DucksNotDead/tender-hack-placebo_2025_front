import { Button, Form, Input, Modal, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  DashboardCard,
  TDashboardCard,
  TDashboardCreateRequest,
} from 'entities/Dashboard';
import { propertiesApi } from 'entities/Property';
import { appMessages } from 'shared/appMessages';
import { dashboardsApi } from 'entities/Dashboard/api/dashboardsApi';
import { useInstance } from 'shared/useInstance';
import { useAuth } from 'entities/Auth';

import Styles from './HomePage.module.scss';

const dashboards: TDashboardCard[] = [
  {
    id: '123',
    title: 'Дашборд',
    owner: {
      id: 1,
      full_name: 'Михайлов Даниил Александрович',
      email: 'mikhaylov_danilka03@mail.ru',
      supplier_id: 1,
    },
    mainChart: {
      type: 'bar',
      data: [{ name: 'Prop1', values: [1, 4, 2] }],
      categories: ['1', '2', '3'],
    },
    metrics: [
      {
        id: 1,
        value: 12,
        name: 'Перовое поле',
        unit: '%',
      },
      {
        id: 2,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 3,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 4,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
      {
        id: 5,
        value: 6723,
        name: 'Второе поле',
        unit: '',
      },
    ],
    properties: [],
    subscribers: [
      {
        full_name: 'Михайлов Даниил Александрович',
        email: 'mikhaylov_danilka03@mail.ru',
        id: 1,
        supplier_id: 1,
      },
      {
        full_name: 'Холуенко Александр Юрьевич',
        email: 'zerogormy@mail.ru',
        id: 2,
        supplier_id: 2,
      },
    ],
  },
];

export function HomePage() {
  const [isCreationOpened, setIsCreationOpened] = useState(false);
  const [form] = Form.useForm<TDashboardCreateRequest>();
  const allFields = Form.useWatch([], form);
  const [isFormReady, setIsFormReady] = useState(false);
  const { message } = useInstance();
  const { user } = useAuth();

  const propertiesIsReady = useMemo(() => {
    return allFields?.properties?.length > 0;
  }, [allFields?.properties]);

  const { data: properties, isLoading: propertiesPending } = useQuery({
    queryKey: ['getAllProperties'],
    queryFn: propertiesApi.get,
  });

  const { mutate: createDashboard } = useMutation({
    mutationKey: ['createDashboard'],
    mutationFn: dashboardsApi.createDashboard,
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: () => {
      void message.error(appMessages.createDashboardError);
    },
  });

  const handleOpenClick = useCallback(() => {
    setIsCreationOpened(() => true);
  }, []);

  const handleCreate = useCallback(() => {
    if (user?.id) {
      createDashboard({ ...allFields, owner_id: user.id });
    }
  }, [user, allFields]);

  const handleClose = useCallback(() => {
    setIsCreationOpened(() => false);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsFormReady(() => propertiesIsReady))
      .catch(() => setIsFormReady(() => false));
  }, [form, allFields]);

  return (
    <div className={Styles.main}>
      <div className={Styles.wrapper}>
        {dashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} {...dashboard} />
        ))}
      </div>
      <div className={Styles.addButtonWrapper}>
        <Button
          size={'large'}
          type={'primary'}
          icon={<PlusCircleOutlined />}
          shape={'round'}
          onClick={handleOpenClick}
        >
          Добавить дашборд
        </Button>
      </div>
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
          <Form.Item
            name={'properties'}
            rules={[{ required: true, message: appMessages.requiredField }]}
          >
            <Select
              mode="multiple"
              allowClear
              options={properties}
              loading={propertiesPending}
              placeholder={'Выберете значения для данных дашборда'}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

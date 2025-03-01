import { App, ConfigProvider } from 'antd';
import { ReactNode } from 'react';
import ru_RU from 'antd/locale/ru_RU';

import { antDesignConfig } from '../config/antDesignConfig';

interface IProps {
  children: ReactNode;
}

export function AppAntDesignProvider({ children }: IProps) {
  return (
    <ConfigProvider locale={ru_RU} theme={antDesignConfig}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

import { Space } from 'antd';

import { AppChart } from 'entities/Chart/ui/AppChart';

export function HomePage() {
  return (
    <Space>
      <AppChart
        title={'Qwerty'}
        type={'bar'}
        data={[
          { name: 'first', values: [2, 3, 2] },
          { name: 'before', values: [3, 4, 5] },
        ]}
        categories={['One', 'Two', 'Three']}
        dataSwitch
        max={100}
      />
    </Space>
  );
}

//kpgz.code_kpgz
//

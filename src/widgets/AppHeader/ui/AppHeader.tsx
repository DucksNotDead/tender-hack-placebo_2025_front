import { Row } from 'antd';

import { AppLogo } from 'features/AppLogo';
import { UserPanel } from 'entities/Auth';

export function AppHeader() {
  return (
    <Row
      justify={'space-between'}
      align={'middle'}
      style={{ padding: '12px 24px', backgroundColor: 'white' }}
    >
      <AppLogo />

      <UserPanel />
    </Row>
  );
}

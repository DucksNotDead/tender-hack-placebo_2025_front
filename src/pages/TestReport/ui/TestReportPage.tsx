import { AppChart } from 'entities/Chart/ui/AppChart';

export function TestReportPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppChart title={''} type={'bar'} data={[]} categories={[]} />
    </div>
  );
}

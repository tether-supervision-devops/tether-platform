import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supervisor Overview',
  description: 'Supervisor dashboard overview'
};

export default function SupervisorOverviewPage() {
  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Supervisor Dashboard</h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Active Sessions</h3>
          <p className='text-2xl font-bold'>12</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Upcoming Meetings</h3>
          <p className='text-2xl font-bold'>5</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Centers Monitored</h3>
          <p className='text-2xl font-bold'>8</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Total Hours</h3>
          <p className='text-2xl font-bold'>156</p>
        </div>
      </div>
    </div>
  );
}


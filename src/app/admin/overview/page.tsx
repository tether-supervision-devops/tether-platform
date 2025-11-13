import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tether Admin Overview',
  description: 'Tether Admin dashboard overview'
};

export default function AdminOverviewPage() {
  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Tether Admin Dashboard</h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Total Users</h3>
          <p className='text-2xl font-bold'>247</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Active Centers</h3>
          <p className='text-2xl font-bold'>18</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>Active Sessions</h3>
          <p className='text-2xl font-bold'>42</p>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='text-lg font-semibold'>System Health</h3>
          <p className='text-2xl font-bold text-green-600'>99.9%</p>
        </div>
      </div>
    </div>
  );
}


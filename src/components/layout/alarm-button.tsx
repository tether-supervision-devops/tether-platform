'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconAlertTriangle } from '@tabler/icons-react';
import { toast } from 'sonner';

type AlarmButtonProps = {
  onTrigger?: () => Promise<void> | void;
  label?: string;
};

export function AlarmButton({
  onTrigger,
  label = 'Trigger Alarm'
}: AlarmButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await onTrigger?.();

      // 🔥 Sonner notification
      toast.error('Alarm sent to supervising radiologist', {
        description: 'They have been notified immediately.',
        duration: 5000
      });
    } catch (err) {
      toast.error('Alarm failed', {
        description: 'Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant='destructive'
      size='lg'
      onClick={handleClick}
      disabled={loading}
      className="relative flex h-12 items-center gap-2 rounded-xl px-6 text-base font-semibold shadow-md transition-all before:absolute before:inset-0 before:-z-10 before:animate-pulse before:rounded-xl before:bg-red-500/40 before:content-[''] hover:shadow-lg"
    >
      <IconAlertTriangle className='h-5 w-5' />
      {loading ? 'Sending...' : label}
    </Button>
  );
}

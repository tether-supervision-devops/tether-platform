'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconHelp } from '@tabler/icons-react';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function RequestHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // TODO: send to Supabase / Slack / API endpoint
    console.log('Help request:', message);
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant='ghost'
        size='sm'
        className='hidden sm:flex'
        onClick={() => setIsOpen(true)}
      >
        <IconHelp className='h-4 w-4' />
        <span className='sr-only'>Request Help</span>
      </Button>

      {/* Modal */}
      <Modal
        title='Request Help'
        description='Request help from the team'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className='flex flex-col space-y-4 pt-2'>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='help-message'>Describe what you need</Label>
            <Textarea
              id='help-message'
              placeholder='What do you need help with?'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='min-h-[120px]'
            />
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!message.trim()}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

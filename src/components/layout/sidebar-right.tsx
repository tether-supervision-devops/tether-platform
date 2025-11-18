import * as React from 'react';
import {
  Bell,
  ClipboardList,
  BriefcaseMedical,
  MessageCircle,
  Send
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar';

// Supervisor display data (can be wired to real data later).
const supervisor = {
  name: 'Cory Wynn',
  phone: '(310) 736-5082',
  avatar:
    'https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=400' // TODO: update path to real asset
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='none'
      className='h-calc[svh-70px] sticky top-0 flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950'
      {...props}
    >
      <SidebarHeader className='flex items-center justify-center border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-black'>
        <span className='bg-white text-xs font-medium tracking-[0.18em] text-slate-500 uppercase dark:bg-black dark:text-slate-400'>
          Supervising Physician
        </span>
      </SidebarHeader>

      <SidebarContent className='flex flex-1 flex-col items-center overflow-y-auto bg-white px-4 py-3 dark:bg-black'>
        {/* Main supervisor card */}
        <div className='flex w-full max-w-sm flex-col items-center rounded-3xl border bg-white px-8 py-8 shadow-lg shadow-slate-300/60 dark:bg-slate-900 dark:shadow-black/40'>
          {/* Avatar */}
          <div className='mb-4 flex items-center justify-center'>
            <div className='relative h-24 w-24 overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100 dark:border-slate-300 dark:bg-slate-800'>
              <img
                src={supervisor.avatar}
                alt={supervisor.name}
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          </div>

          {/* Name / phone */}
          <div className='mb-4 text-center'>
            <div className='text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50'>
              {supervisor.name}
            </div>
            <div className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
              {supervisor.phone}
            </div>
          </div>

          {/* Emergency button */}
          <button
            type='button'
            className='mb-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-600 px-4 text-sm font-semibold tracking-[0.16em] text-white uppercase shadow-sm transition hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 focus-visible:outline-none dark:border-red-900 dark:bg-red-700 dark:text-slate-50 dark:hover:bg-red-600 dark:focus-visible:ring-offset-slate-900'
          >
            <Bell className='h-4 w-4' />
            <span>Emergency</span>
          </button>

          {/* Two action tiles */}
          <div className='mt-2 grid w-full grid-cols-2 gap-3'>
            <button
              type='button'
              className='flex h-20 flex-col items-center justify-center rounded-2xl bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-100'
            >
              <ClipboardList className='mb-2 h-6 w-6' />
              <span className='text-[10px] leading-snug font-medium'>
                Assessment Guide
              </span>
            </button>

            <button
              type='button'
              className='flex h-20 flex-col items-center justify-center rounded-2xl bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-100'
            >
              <BriefcaseMedical className='mb-2 h-6 w-6' />
              <span className='text-[10px] leading-snug font-medium'>
                Reaction
                <br />
                Smart Card
              </span>
            </button>
          </div>
        </div>

        {/* Chat section */}
        <div className='mt-3 flex w-full max-w-sm flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <MessageCircle className='h-4 w-4 text-slate-500 dark:text-slate-300' />
              <span className='text-xs font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400'>
                Chat
              </span>
            </div>
            <span className='text-[11px] text-slate-500 dark:text-slate-500'></span>
          </div>

          <div className='mb-2 flex-1 space-y-1 overflow-y-auto rounded-md bg-slate-100 p-2 text-xs text-slate-800 dark:bg-slate-950/60 dark:text-slate-200'>
            <div className='max-w-[80%] rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-800'>
              <span>Hi Dr. Wynn, patient is ready for contrast.</span>
            </div>
            <div className='ml-auto max-w-[80%] rounded-lg bg-sky-500 px-2 py-1 text-right text-white dark:bg-sky-600'>
              <span>Thanks, I’m ready when you are.</span>
            </div>
          </div>

          <div className='mt-2 flex items-center gap-2'>
            <input
              type='text'
              placeholder='Type a message…'
              className='h-8 flex-1 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100'
            />
            <button
              type='button'
              className='inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-sky-600 px-3 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500'
            >
              <Send className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

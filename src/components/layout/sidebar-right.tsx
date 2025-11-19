'use client';

import * as React from 'react';
import { toast } from 'sonner';
import {
  Bell,
  ClipboardList,
  BriefcaseMedical,
  MessageCircle,
  Send,
  X,
  Clipboard
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// Supervisor data
const supervisor = {
  name: 'Cory Wynn',
  phone: '(310) 736-5082',
  avatar:
    'https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=400'
};

// Layout detection: landscape (desktop/tablet landscape), tablet-portrait, phone
export function useLayoutMode() {
  const [mode, setMode] = React.useState<
    'landscape' | 'tablet-portrait' | 'phone'
  >('landscape');

  React.useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;

      if (width < 768) {
        setMode('phone');
      } else if (isPortrait && width < 1024) {
        setMode('tablet-portrait');
      } else {
        setMode('landscape');
      }
    };

    update();
    window.addEventListener('resize', update);
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      window
        .matchMedia('(orientation: portrait)')
        .removeEventListener('change', update);
    };
  }, []);

  return mode;
}

export function SidebarRight(props: React.ComponentProps<typeof Sidebar>) {
  const mode = useLayoutMode();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Landscape → original full vertical sidebar
  if (mode === 'landscape') {
    return <OriginalLandscapeSidebar {...props} />;
  }

  // Tablet Portrait → clean horizontal bottom bar
  if (mode === 'tablet-portrait') {
    return <TabletPortraitBottomBar onOpenChat={() => setSheetOpen(true)} />;
  }

  // Phone → floating button + full sheet
  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        className='fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-2xl transition-all hover:scale-105'
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <MessageCircle className='h-8 w-8 text-white' />
      </button>

      {sheetOpen && <FullSheet onClose={() => setSheetOpen(false)} />}
    </>
  );
}

/* Tablet Portrait: Horizontal Bottom Bar – matches landscape styling, sits underneath other overlays */
function TabletPortraitBottomBar({ onOpenChat }: { onOpenChat: () => void }) {
  const handleAlarm = useAlarmHandler();

  return (
    <div className='fixed inset-x-0 bottom-0 z-0 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950'>
      <div className='pb-safe'>
        <div className='mx-auto max-w-6xl px-3 py-3 md:px-3'>
          <div className='grid grid-cols-1 gap-4 pl-12 md:grid-cols-2 md:items-stretch'>
            {/* LEFT COLUMN: Supervisor + Actions */}
            <div className='flex flex-col gap-3'>
              {/* Supervisor + Emergency */}
              <div className='flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-md shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/50'>
                {/* Avatar + status */}
                <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700'>
                  <img
                    src={supervisor.avatar}
                    alt={supervisor.name}
                    className='h-full w-full object-cover'
                  />
                  <span className='absolute -bottom-1 left-1 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm'>
                    <span className='relative flex h-1.5 w-1.5'>
                      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-70' />
                      <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-100' />
                    </span>
                    On call
                  </span>
                </div>

                {/* Name + meta */}
                <div className='min-w-0 flex-1'>
                  <div className='text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400'>
                    Supervising Radiologist
                  </div>
                  <div className='truncate text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50'>
                    {supervisor.name}
                  </div>
                  <div className='mt-0.5 text-xs text-slate-600 dark:text-slate-300'>
                    {supervisor.phone}
                  </div>
                </div>

                {/* Emergency button */}
                <button
                  type='button'
                  onClick={handleAlarm}
                  className='ml-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-600 px-4 text-[11px] font-semibold tracking-[0.18em] text-white uppercase shadow-sm shadow-red-500/40 transition hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 focus-visible:outline-none dark:border-red-900 dark:bg-red-700 dark:hover:bg-red-600 dark:focus-visible:ring-offset-slate-950'
                >
                  <Bell className='h-4 w-4' />
                  <span>Alarm</span>
                </button>
              </div>

              {/* Action Tiles */}
              <div className='flex gap-3'>
                <button
                  type='button'
                  className='flex h-20 flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50'
                >
                  <div className='mb-1 flex h-9 w-9 items-center justify-center rounded-xl text-black'>
                    <ClipboardList className='h-4 w-4' />
                  </div>
                  <span className='text-[10px] leading-snug font-medium'>
                    Assessment Guide
                  </span>
                </button>

                <button
                  type='button'
                  className='flex h-20 flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50'
                >
                  <div className='mb-1 flex h-9 w-9 items-center justify-center rounded-xl text-black'>
                    <BriefcaseMedical className='h-4 w-4' />
                  </div>
                  <span className='text-[10px] leading-snug font-medium'>
                    Treatment Algorithms
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Chat */}
            <div className='flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 dark:border-slate-800 dark:bg-slate-950'>
              <div className='mb-2 ml-4 flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <div className='text-black900 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900'>
                    <MessageCircle className='h-3.5 w-3.5' />
                  </div>
                  <div>
                    <div className='text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400'>
                      Chat
                    </div>
                    <div className='flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400'>
                      <span className='inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500' />
                      <span>Live • Secure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message preview */}
              <div className='mb-2 flex-1 space-y-1.5 overflow-y-auto rounded-lg bg-slate-100 p-2 text-xs text-slate-800 dark:bg-black dark:text-slate-100'>
                <div className='max-w-[80%] rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-800'>
                  <span>Hi Dr. Wynn, patient is ready for contrast.</span>
                </div>
                <div className='mt-1 ml-auto max-w-[80%] rounded-lg bg-sky-500 px-2 py-1 text-right text-white dark:bg-sky-600'>
                  <span>Thanks, I’m ready when you are.</span>
                </div>
              </div>

              {/* Input */}
              <div className='mt-1 flex items-center gap-1.5 pl-2'>
                <input
                  type='text'
                  placeholder='Type a message…'
                  className='h-8 flex-1 rounded-lg border border-slate-300 bg-white px-2 text-xs text-slate-900 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100'
                />
                <button
                  type='button'
                  className='mr-2 inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-sky-600 px-2.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-sky-500 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 focus-visible:outline-none dark:bg-sky-600 dark:hover:bg-sky-500 dark:focus-visible:ring-offset-slate-950'
                >
                  <Send className='h-3.5 w-3.5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Full Sheet for Phone */
function FullSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 z-50 flex flex-col'>
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative mt-auto max-h-[92svh] rounded-t-3xl bg-white shadow-2xl dark:bg-black'>
        <div className='flex justify-center pt-3'>
          <div className='h-1 w-20 rounded-full bg-slate-300 dark:bg-slate-700' />
          <button onClick={onClose} className='absolute top-3 right-4 p-2'>
            <X className='h-5 w-5 text-slate-500' />
          </button>
        </div>
        <div className='overflow-y-auto pb-10'>
          <OriginalInnerContent />
        </div>
      </div>
    </div>
  );
}

/* Shared alarm handler – put it here so all layouts can use the exact same logic */
function useAlarmHandler() {
  return () => {
    const iframe = (window as any).__CURRENT_ZOOM_IFRAME__ as
      | HTMLIFrameElement
      | undefined;

    if (!iframe?.contentWindow) {
      toast.error('Zoom meeting not ready yet');
      return;
    }

    iframe.contentWindow.postMessage({ type: 'INVITE_HOST' }, '*');
    toast.success('Alarm sent to supervising physician.');
  };
}

/* Shared original inner content – used in landscape & sheet */
function OriginalInnerContent() {
  const handleAlarm = useAlarmHandler();

  return (
    <>
      <SidebarHeader className='flex items-center justify-center border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-black'>
        <span className='text-xs font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400'>
          Supervising Physician
        </span>
      </SidebarHeader>

      <SidebarContent className='flex flex-col items-center bg-white px-4 py-3 dark:bg-black'>
        {/* Supervisor Card */}
        <div className='flex w-full max-w-sm flex-col items-center rounded-3xl border bg-white px-6 py-4 shadow-lg shadow-slate-300/60 dark:bg-slate-900 dark:shadow-black/40'>
          <div className='mb-4'>
            <div className='relative h-20 w-20 overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100 dark:border-slate-300 dark:bg-slate-800'>
              <img
                src={supervisor.avatar}
                alt={supervisor.name}
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          </div>
          <div className='mb-4 text-center'>
            <div className='text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50'>
              {supervisor.name}
            </div>
            <div className='text-xs text-slate-600 dark:text-slate-300'>
              {supervisor.phone}
            </div>
          </div>
          <button
            className='mb-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-600 px-4 text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-sm transition hover:bg-red-500 dark:border-red-900 dark:bg-red-700 dark:hover:bg-red-600'
            onClick={handleAlarm}
          >
            <Bell className='h-4 w-4' />
            <span>Emergency</span>
          </button>
          <div className='grid w-full grid-cols-2 gap-3'>
            <button className='flex h-20 flex-col items-center justify-center rounded-2xl bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-100'>
              <ClipboardList className='mb-2 h-6 w-6' />
              <span className='text-[10px] leading-snug font-medium'>
                Assessment Guide
              </span>
            </button>
            <button className='flex h-20 flex-col items-center justify-center rounded-2xl bg-slate-100 px-3 text-center text-slate-900 shadow-sm transition hover:bg-slate-50 dark:bg-slate-200 dark:hover:bg-slate-100'>
              <BriefcaseMedical className='mb-2 h-6 w-6' />
              <span className='text-[10px] leading-snug font-medium'>
                Treatment Algorithms
              </span>
            </button>
          </div>
        </div>

        {/* Chat – your exact preferred version */}
        <div className='mt-3 flex w-full max-w-sm flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <MessageCircle className='h-4 w-4 text-slate-500 dark:text-slate-300' />
              <span className='text-xs font-medium tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400'>
                Chat
              </span>
            </div>
          </div>

          <div className='mb-2 flex-1 space-y-1 overflow-y-auto rounded-md bg-slate-100 p-2 text-xs text-slate-800 dark:bg-slate-950/60 dark:text-slate-200'>
            <div className='max-w-[80%] rounded-lg bg-slate-200 px-2 py-1 dark:bg-slate-800'>
              <span>Hi Dr. Wynn, patient is ready for contrast.</span>
            </div>
            <div className='ml-auto max-w-[80%] rounded-lg bg-sky-500 px-2 py-1 text-right text-white dark:bg-sky-600'>
              <span>Thanks, I’m ready when you are.</span>
            </div>
          </div>

          <div className='mt-1 flex items-center gap-1'>
            <input
              type='text'
              placeholder='Type a message…'
              className='h-8 flex-1 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100'
            />
            <button className='inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-sky-600 px-2 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500'>
              <Send className='h-3.5 w-3.5' />
            </button>
          </div>
        </div>
      </SidebarContent>
    </>
  );
}

/* Original Landscape Sidebar – 100% untouched */
function OriginalLandscapeSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='none'
      {...props}
      className={cn(
        'sticky top-0 flex h-[calc(100svh-80px)] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950',
        props.className
      )}
    >
      <OriginalInnerContent />
    </Sidebar>
  );
}

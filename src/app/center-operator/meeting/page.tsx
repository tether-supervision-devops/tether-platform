'use client';

import dynamic from 'next/dynamic';

// === Global Meeting Context & Container (persistent across routes) ===
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Zap, Book, Bell } from 'lucide-react';
import type { DraggableEvent, DraggableData } from 'react-draggable';

type MeetingMode = 'hidden' | 'float' | 'fullscreen' | 'docked';
type MeetingParams = {
  meetingNumber: string;
  passWord: string;
  userName: string;
  uuid: string;
  leaveUrl: string;
};

type MeetingState = {
  joining: boolean;
  mode: MeetingMode;
  params: MeetingParams | null;
};

const MeetingContext = createContext<{
  state: MeetingState;
  joinMeeting: (p: MeetingParams, opts?: { mode?: MeetingMode }) => void;
  leaveMeeting: () => void;
  setMode: (m: MeetingMode) => void;
} | null>(null);

function MeetingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<MeetingState>(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('tether_meeting_state');
      if (raw) {
        try {
          return JSON.parse(raw) as MeetingState;
        } catch {}
      }
    }
    return { joining: false, mode: 'hidden', params: null };
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tether_meeting_state', JSON.stringify(state));
    }
  }, [state]);

  const joinMeeting = (p: MeetingParams, opts?: { mode?: MeetingMode }) => {
    setState({ joining: true, mode: opts?.mode ?? 'fullscreen', params: p });
  };
  const leaveMeeting = () => {
    setState({ joining: false, mode: 'hidden', params: null });
  };
  const setMode = (m: MeetingMode) => setState((s) => ({ ...s, mode: m }));

  return (
    <MeetingContext.Provider
      value={{ state, joinMeeting, leaveMeeting, setMode }}
    >
      {children}
    </MeetingContext.Provider>
  );
}

function useMeeting() {
  const ctx = useContext(MeetingContext);
  if (!ctx) throw new Error('useMeeting must be used within MeetingProvider');
  return ctx;
}

// Persistent container that renders the meeting as fullscreen or floating window
function MeetingContainerInner({
  dockedMountEl
}: {
  dockedMountEl?: HTMLElement | null;
}) {
  const { state } = useMeeting();
  const [RndMod, setRndMod] = React.useState<any>(null);
  const [winPos, setWinPos] = React.useState({ x: 80, y: 80 });
  const [winSize, setWinSize] = React.useState({ width: 900, height: 560 });
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Single iframe persisted across modes
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  // Containers for each mode
  const fullscreenRef = React.useRef<HTMLDivElement | null>(null);
  const floatInnerRef = React.useRef<HTMLDivElement | null>(null);
  const dockedRef = React.useRef<HTMLDivElement | null>(null);
  // Hidden parking container to keep session alive when minimized
  const parkingRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // lazy-load Rnd only if needed
    if (state.joining && state.mode === 'float') {
      // import("react-rnd").then((m) => setRndMod(() => (m as any).Rnd ?? (m as any).default)).catch(() => { });
    }
  }, [state.joining, state.mode]);

  React.useEffect(() => {
    if (!parkingRef.current) {
      const park = document.createElement('div');
      park.style.display = 'none';
      document.body.appendChild(park);
      parkingRef.current = park;
    }
    return () => {
      if (parkingRef.current && parkingRef.current.parentNode) {
        parkingRef.current.parentNode.removeChild(parkingRef.current);
      }
      parkingRef.current = null;
      // No longer remove iframe here
    };
  }, []);

  // Remove or recreate iframe when joining state changes
  React.useEffect(() => {
    if (!state.joining) {
      if (iframeRef.current) {
        iframeRef.current.remove();
        iframeRef.current = null;
      }
      return;
    }
    // joining true
    if (state.params && !iframeRef.current) {
      let target: HTMLElement | null = null;
      if (state.mode === 'fullscreen') target = fullscreenRef.current;
      else if (state.mode === 'float') target = floatInnerRef.current;
      else if (state.mode === 'docked') target = dockedRef.current;
      else if (state.mode === 'hidden') target = parkingRef.current;
      if (target) {
        const iframe = document.createElement('iframe');
        iframe.title = 'Zoom Meeting';
        iframe.setAttribute('allow', 'camera; microphone; fullscreen');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.position = 'absolute';
        (iframe.style as any).inset = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.src = buildSrc() + '&_=' + Date.now();
        iframeRef.current = iframe;
        target.appendChild(iframe);
      }
    }
  }, [state.joining, state.params, state.mode]);

  const buildSrc = () => {
    if (!state.params) return '';
    const { meetingNumber, passWord, userName, uuid, leaveUrl } = state.params;
    return `https://meeting-frontend-chi.vercel.app/?meetingNumber=${meetingNumber}&passWord=${passWord}&userName=${encodeURIComponent(userName)}&uuid=${uuid}&leaveUrl=${encodeURIComponent(leaveUrl)}&disableZoomLogo=true`;
  };

  // Create and/or move the iframe once a real container is available
  React.useEffect(() => {
    if (!state.joining || !state.params) return;

    let target: HTMLElement | null = null;
    if (state.mode === 'fullscreen') {
      target = fullscreenRef.current;
    } else if (state.mode === 'float') {
      target = floatInnerRef.current;
    } else if (state.mode === 'docked') {
      target = dockedRef.current ?? null;
    } else if (state.mode === 'hidden') {
      target = parkingRef.current;
    }

    if (!target) return;

    if (!iframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.title = 'Zoom Meeting';
      iframe.setAttribute('allow', 'camera; microphone; fullscreen');
      iframe.style.position = 'absolute';
      (iframe.style as any).inset = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.src = buildSrc() + '&_=' + Date.now();
      iframeRef.current = iframe;
      target.appendChild(iframe);
      return;
    }

    // Reparent existing iframe if needed
    const iframe = iframeRef.current;
    if (iframe.parentElement !== target) {
      target.appendChild(iframe);
    }
  }, [state.joining, state.params, state.mode, RndMod, dockedMountEl, mounted]);

  if (!state.joining || !state.params) {
    return null;
  }

  return (
    <>
      {/* Fullscreen wrapper (always mounted) */}
      <div
        ref={fullscreenRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 20000,
          display: state.mode === 'fullscreen' ? 'block' : 'none'
        }}
      />

      {/* Floating wrapper (only when in float mode and Rnd ready) */}
      {state.mode === 'float' && RndMod
        ? (() => {
            const Rnd = RndMod;
            return (
              <Rnd
                size={{ width: winSize.width, height: winSize.height }}
                position={{ x: winPos.x, y: winPos.y }}
                bounds='window'
                minWidth={460}
                minHeight={300}
                onDragStop={(
                  _: import('react-draggable').DraggableEvent,
                  d: import('react-draggable').DraggableData
                ) => {
                  setWinPos({ x: d.x, y: d.y });
                }}
                onResizeStop={(
                  _: MouseEvent | TouchEvent,
                  // __: import("re-resizable").ResizeDirection,
                  ref: HTMLElement
                ) => {
                  setWinSize({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10)
                  });
                }}
                style={{
                  zIndex: 20000,
                  background: '#000',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  borderRadius: 8,
                  overflow: 'hidden'
                }}
              >
                <div
                  ref={floatInnerRef}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                  }}
                ></div>
              </Rnd>
            );
          })()
        : null}

      {/* Docked wrapper via portal */}
      {mounted && dockedMountEl
        ? createPortal(
            <div
              ref={dockedRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: '#000',
                borderRadius: 0,
                overflow: 'hidden',
                display: state.mode === 'docked' ? 'block' : 'none'
              }}
            />,
            dockedMountEl
          )
        : null}

      {/* Minimized reopen */}
      {state.mode === 'hidden' && (
        <button
          onClick={() => {
            /* no-op; controls removed */
          }}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 20000,
            padding: '10px 12px',
            borderRadius: 9999,
            background: '#0d6efd',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          Reopen Meeting
        </button>
      )}
    </>
  );
}

// Note: ZoomMtg and Rnd are loaded dynamically to avoid SSR issues

type SignatureResponse = {
  signature: string;
  zak?: string;
  exp?: number;
  zoomEmail?: string;
};

// Zoom Meeting SDK Page (Client-side only with lazy loading)
function MeetingsdkPage() {
  const SHOW_FLOATING_BUTTONS = false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  // Credentials loaded from URL or entered by user
  const [meetingNumber, setMeetingNumber] = useState<string>('84634097083');
  const [passWord, setPassWord] = useState<string>('');
  const [userName, setUserName] = useState<string>('CSW');
  const [leaveUrl, setLeaveUrl] = useState<string>(
    'https://app.tethersupervision.com'
  );
  const [uuid, setUuid] = useState<string>(
    '24a9c441-4930-3fc9-a66d-503632febb98'
  );

  // UI modals (lazily loaded)
  const [showHelp, setShowHelp] = useState(false);
  const [showReactionAlgorithms, setShowReactionAlgorithms] = useState(false);
  const [showAssessmentGuide, setShowAssessmentGuide] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  // Use global meeting context
  const { state, joinMeeting, setMode } = useMeeting();

  const dockedMountRef = useRef<HTMLDivElement | null>(null);
  // Add mounted flag to ensure MeetingContainer only renders client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Basic UI for entering credentials and triggering join
  return (
    <div style={{ padding: 0 }}>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          backgroundColor: '#f8f9fa',
          padding: '0px'
        }}
      >
        {!state.joining || state.mode === 'hidden' ? (
          <div
            style={{
              background: 'white',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: '800px',
              width: '100%'
            }}
          >
            <h1 style={{ marginBottom: 24 }}>Zoom Meeting SDK</h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16
              }}
            >
              <div>
                <label>Meeting Number</label>
                <input
                  value={meetingNumber}
                  onChange={(e) => setMeetingNumber(e.target.value)}
                  placeholder='Meeting Number'
                  style={{ width: '100%', padding: 8, marginTop: 6 }}
                />
              </div>
              <div>
                <label>Pass Word</label>
                <input
                  value={passWord}
                  onChange={(e) => setPassWord(e.target.value)}
                  placeholder='Pass Word'
                  style={{ width: '100%', padding: 8, marginTop: 6 }}
                />
              </div>
              <div>
                <label>User Name</label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder='Your display name'
                  style={{ width: '100%', padding: 8, marginTop: 6 }}
                />
              </div>
              <div>
                <label>UUID</label>
                <input
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  placeholder='Unique user id'
                  style={{ width: '100%', padding: 8, marginTop: 6 }}
                />
              </div>
              <div>
                <label>Leave URL</label>
                <input
                  value={leaveUrl}
                  onChange={(e) => setLeaveUrl(e.target.value)}
                  placeholder='Leave URL after meeting'
                  style={{ width: '100%', padding: 8, marginTop: 6 }}
                />
              </div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button
                disabled={state.joining}
                onClick={() =>
                  joinMeeting(
                    { meetingNumber, passWord, userName, uuid, leaveUrl },
                    { mode: 'docked' }
                  )
                }
                style={{
                  padding: '12px 20px',
                  borderRadius: 6,
                  border: 'none',
                  backgroundColor: '#007bff',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {'Join Meeting'}
              </button>
            </div>
          </div>
        ) : (
          // Join completed in 'docked' mode → inline placeholder for MeetingContainer portal
          <div
            ref={dockedMountRef}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: isMobile ? 'calc(100dvh - 52px)' : 'calc(100dvh - 64px)'
            }}
          />
        )}
      </main>

      {SHOW_FLOATING_BUTTONS && state.joining && (
        <div
          style={{
            position: 'fixed',
            top: 120,
            right: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 40000
          }}
        >
          <button
            onClick={() => setShowHelp(true)}
            aria-label='Help'
            title='Help'
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            <HelpCircle size={20} />
          </button>
          <button
            onClick={() => setShowReactionAlgorithms(true)}
            aria-label='Reaction Algorithms'
            title='Reaction Algorithms'
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            <Zap size={20} />
          </button>
          <button
            onClick={() => setShowAssessmentGuide(true)}
            aria-label='Assessment Guide'
            title='Assessment Guide'
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#17a2b8',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            <Book size={20} />
          </button>
          <button
            onClick={() => setShowAlarm(true)}
            aria-label='Trigger Alarm'
            title='Trigger Alarm'
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#dc3545',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            <Bell size={20} />
          </button>
        </div>
      )}

      {/* {ShowOrRenderRnd(showHelp, setShowHelp, "Help", "https://forms.gle/EpGxjs6e5186tp3W6")} */}
      {/* {ShowOrRenderRnd(showReactionAlgorithms, setShowReactionAlgorithms, "Reaction Algorithms", "https://drive.google.com/file/d/1kdFJfjreOv5z0N6yPJ6CAF1Tb4MUiLg_/preview")} */}
      {/* {ShowOrRenderRnd(showAssessmentGuide, setShowAssessmentGuide, "Assessment Guide", "https://drive.google.com/file/d/1OBBNvb3oMA1-wEk6-s6eZRpbgy7TVbdq/preview")} */}
      {showAlarm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(220,53,69,0.95)',
            zIndex: 20000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          <div>🚨 ALARM TRIGGERED 🚨</div>
          <button
            onClick={() => setShowAlarm(false)}
            style={{
              marginTop: '30px',
              padding: '12px 24px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: '#dc3545',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Dismiss
          </button>
        </div>
      )}
      {/* Persistently mount MeetingContainer; it will portal into the docked placeholder when needed */}
      {mounted && <MeetingContainer dockedMountEl={dockedMountRef.current} />}
    </div>
  );
}

// Helpers for injecting lazy-loaded modals when possible
function ShowOrRenderRnd(
  show: boolean,
  setter: (v: boolean) => void,
  title: string,
  src: string
) {
  const [position, setPosition] = React.useState({ x: 100, y: 100 });
  const [size, setSize] = React.useState({ width: 600, height: 400 });

  // Overlay ref and helpers for fullscreen pointer-capturing overlay during resize
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  // const cursorFor = (dir: ResizeDirection): string => {
  //     switch (dir) {
  //         case "top":
  //         case "bottom":
  //             return "ns-resize";
  //         case "left":
  //         case "right":
  //             return "ew-resize";
  //         case "topLeft":
  //         case "bottomRight":
  //             return "nwse-resize";
  //         case "topRight":
  //         case "bottomLeft":
  //             return "nesw-resize";
  //         default:
  //             return "default";
  //     }
  // };

  const addResizeOverlay = (cursor: string) => {
    if (overlayRef.current) return;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '30000';
    overlay.style.cursor = cursor;
    overlay.style.background = 'transparent';
    overlay.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
  };

  const removeResizeOverlay = () => {
    const overlay = overlayRef.current;
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    overlayRef.current = null;
  };

  // Overlay for drag (move) actions
  const addDragOverlay = () => {
    if (overlayRef.current) return;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '30000';
    overlay.style.cursor = 'move';
    overlay.style.background = 'transparent';
    overlay.style.pointerEvents = 'auto';
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
  };

  const removeDragOverlay = () => {
    if (overlayRef.current && overlayRef.current.parentNode) {
      overlayRef.current.parentNode.removeChild(overlayRef.current);
    }
    overlayRef.current = null;
  };
}

const MeetingContainer = dynamic(() => Promise.resolve(MeetingContainerInner), {
  ssr: false
});

// Default export for Next.js page
export default function MeetingPage() {
  return (
    <MeetingProvider>
      <MeetingsdkPage />
    </MeetingProvider>
  );
}

let zoomPromise: Promise<void> | null = null;

export function loadZoomSdk() {
  if (zoomPromise) return zoomPromise;
  zoomPromise = new Promise<void>((resolve, reject) => {
    if ((window as any).ZoomMtg) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://source.zoom.us/zoom-meeting-2.18.2.min.js';
    script.async = true;
    script.onload = () => {
      (window as any).__ZOOM_SDK_LOADED__ = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Zoom SDK'));
    document.body.appendChild(script);
  });
  return zoomPromise;
}

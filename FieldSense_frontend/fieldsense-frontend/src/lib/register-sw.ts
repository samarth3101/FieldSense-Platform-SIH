// Optional explicit service worker registration for additional runtime logs.
// next-pwa already injects a registration script when `register: true`.
// Import this file in `layout.tsx` or a client component if you want console logs.

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.ready.then((reg) => {
        console.log('[PWA] Service worker ready', reg.scope);
      });
    });
  }
}

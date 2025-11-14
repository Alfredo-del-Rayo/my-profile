import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (typeof globalThis.gtag !== 'function') {
      console.warn('Google Analytics not loaded yet.');
      return;
    }

    const path = location.pathname + location.search;
      globalThis?.gtag('event', 'page_view', {
      page_path: path,
      page_title: path,
    });
  }, [location]);
}
import { useEffect } from 'react';

export default function useSEO(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevMeta = document.querySelector('meta[name="description"]');
    const prevContent = prevMeta?.getAttribute('content');
    document.title = title ? `${title} | ZingBite` : 'ZingBite - Food Delivery';
    if (prevMeta && description) prevMeta.setAttribute('content', description);
    return () => {
      document.title = prevTitle;
      if (prevMeta && prevContent) prevMeta.setAttribute('content', prevContent);
    };
  }, [title, description]);
}

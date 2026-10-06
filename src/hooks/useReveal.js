import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -40px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

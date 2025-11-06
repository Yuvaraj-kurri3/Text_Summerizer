import { onCLS, onLCP, onINP } from 'web-vitals';

export function reportWebVitals(callback) {
  onCLS(callback);
  onLCP(callback);
  onINP(callback);
}

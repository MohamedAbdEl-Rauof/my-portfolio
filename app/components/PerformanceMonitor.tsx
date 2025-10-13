'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    const measurePerformance = () => {
      const metrics: Partial<PerformanceMetrics> = {};

      // Measure page load time
      if (performance.timing) {
        metrics.loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      }

      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) {
            metrics.firstContentfulPaint = fcp.startTime;
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            metrics.largestContentfulPaint = lastEntry.startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const inputEntry = entry as PerformanceEventTiming;
            if (inputEntry.processingStart && inputEntry.startTime) {
              metrics.firstInputDelay = inputEntry.processingStart - inputEntry.startTime;
            }
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const layoutEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutEntry.hadRecentInput && layoutEntry.value) {
              clsValue += layoutEntry.value;
            }
          });
          metrics.cumulativeLayoutShift = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Send metrics to analytics (you can replace this with your analytics service)
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
        
        // Example: Send to Google Analytics
        if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (command: string, eventName: string, parameters?: Record<string, unknown>) => void }).gtag) {
          (window as typeof window & { gtag: (command: string, eventName: string, parameters?: Record<string, unknown>) => void }).gtag('event', 'performance_metrics', {
            custom_map: {
              load_time: metrics.loadTime,
              fcp: metrics.firstContentfulPaint,
              lcp: metrics.largestContentfulPaint,
              fid: metrics.firstInputDelay,
              cls: metrics.cumulativeLayoutShift,
            }
          });
        }
      }, 2000);
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return null; 
};

export default PerformanceMonitor;

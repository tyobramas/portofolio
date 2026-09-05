import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number; // duration in ms
  startOnView?: boolean;
}

export function useCountUp(
  targetValue: string,
  options: UseCountUpOptions = {}
) {
  const { duration = 1600, startOnView = true } = options;
  const [displayValue, setDisplayValue] = useState('0');
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Parse prefix, numeric value, and suffix
    const match = targetValue.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      setDisplayValue(targetValue);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');

    const animate = () => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Ease-out cubic formula
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNum = easeOut * numericTarget;

        const formattedNum = isDecimal
          ? currentNum.toFixed(1)
          : Math.floor(currentNum).toString();

        setDisplayValue(`${prefix}${formattedNum}${suffix}`);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(targetValue);
        }
      };

      window.requestAnimationFrame(step);
    };

    if (!startOnView) {
      animate();
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, duration, startOnView]);

  return { displayValue, elementRef };
}

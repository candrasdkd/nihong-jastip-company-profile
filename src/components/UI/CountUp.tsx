"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <strong ref={ref} aria-label={`${value}${suffix}`}>
      {displayValue}
      {suffix}
    </strong>
  );
};

export default CountUp;

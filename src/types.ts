import { CSSProperties } from 'react';

export interface Event {
  id: number;
  start: string;
  duration: number;
}

export interface EventStyle {
  id: number;
  startTime: string;
  endTime: string;
  style: CSSProperties;
}

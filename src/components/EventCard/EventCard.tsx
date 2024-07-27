import React from 'react';
import s from './EventCard.module.css';

interface EventProps {
  id: number;
  startTime: string;
  endTime: string;
  style: React.CSSProperties;
}

const EventCard: React.FC<EventProps> = ({ id, startTime, endTime, style }) => (
  <div style={style} className={s.container}>
    <div className={s.eventId}>Event {id}</div>
    <div>
      {startTime} - {endTime}
    </div>
  </div>
);

export default EventCard;

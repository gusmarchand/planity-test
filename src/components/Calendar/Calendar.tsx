import React, { useEffect, useState } from 'react';

import EventCard from '../EventCard';

import { Event, EventStyle } from '../../types';
import { calculateEventStyles } from '../../lib/utils';

import s from './Calendar.module.css';

const Calendar: React.FC<{ events: Event[] }> = ({ events }) => {
  const [eventStyles, setEventStyles] = useState<EventStyle[]>([]);

  useEffect(() => {
    const containerHeight = window.innerHeight;
    const styles = calculateEventStyles(events, containerHeight);
    setEventStyles(styles);
  }, [events]);

  return (
    <div className={s.container}>
      {eventStyles.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          startTime={event.startTime}
          endTime={event.endTime}
          style={event.style}
        />
      ))}
    </div>
  );
};

export default Calendar;

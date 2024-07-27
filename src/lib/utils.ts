import { Event, EventStyle } from '../types';

const convertTimeToPixels = (
  time: string,
  startHour: number,
  endHour: number,
  containerHeight: number,
) => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutesFromStart = hours * 60 + minutes - startHour * 60;
  return (
    (totalMinutesFromStart / ((endHour - startHour) * 60)) * containerHeight
  );
};

const addMinutesToTime = (time: string, minutesToAdd: number) => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
};

const overlap = (event1: Event, event2: Event) => {
  const start1 = convertTimeToMinutes(event1.start);
  const end1 = start1 + event1.duration;
  const start2 = convertTimeToMinutes(event2.start);
  const end2 = start2 + event2.duration;
  return start1 < end2 && start2 < end1;
};

const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const calculateEventStyles = (
  events: Event[],
  containerHeight: number,
): EventStyle[] => {
  const eventPositions: EventStyle[] = [];

  events.sort(
    (a, b) => convertTimeToMinutes(a.start) - convertTimeToMinutes(b.start),
  );

  // create groups of events that overlap
  const groups: Event[][] = [];

  events.forEach((event) => {
    let added = false;
    for (const group of groups) {
      if (group.some((e) => overlap(e, event))) {
        group.push(event);
        added = true;
        break;
      }
    }
    if (!added) groups.push([event]);
  });

  // calculate position of each event

  groups.forEach((group) => {
    // calculate width of each event
    const width = 100 / group.length;

    group.forEach((event, index) => {
      const startPosition = convertTimeToPixels(
        event.start,
        9,
        21,
        containerHeight,
      );
      const endPosition = convertTimeToPixels(
        addMinutesToTime(event.start, event.duration),
        9,
        21,
        containerHeight,
      );
      const height = endPosition - startPosition;
      const left = index * width;

      eventPositions.push({
        id: event.id,
        startTime: event.start,
        endTime: addMinutesToTime(event.start, event.duration),
        style: {
          top: `${startPosition}px`,
          height: `${height}px`,
          width: `${width}%`,
          left: `${left}%`,
        },
      });
    });
  });

  return eventPositions;
};

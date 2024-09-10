// EventContext.tsx
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext(null);

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children, initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => setEvents([...events, newEvent]);
  const removeEvent = (eventId) =>
    setEvents(events.filter(event => event.id !== eventId));

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// EventContext.tsx
import { createContext, useContext, useState } from 'react';

const EventContext = createContext<any>(null);

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children, initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => setEvents((prevState) => [...prevState, newEvent]);
  const removeEvent = (eventId) =>
    setEvents(events.filter(event => event.id !== eventId));

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// src/pages/HomePage.tsx
import React from 'react';
import EventForm from '../components/EventForm';

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const handleAddEventClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (eventDetails) => {
    setEvents([...events, eventDetails]);
    setShowForm(false); // Close the form after submission
  };

  const events = [
    { id: 1, title: 'Birthday Party', date: '2024-09-15' },
    { id: 2, title: 'Wedding Ceremony', date: '2024-10-02' },
    { id: 3, title: 'PAX East', date: '2024-11-20' },
  ];

  return (
    <div className="bg-purpleScheme-light min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purpleScheme-dark">My Events</h1>
        <button onClick={handleAddEventClick} className="bg-purpleScheme hover:bg-purpleScheme-dark text-white font-bold py-2 px-4 rounded">
          + Add Event
        </button>
        {showForm && <EventForm onSubmit={handleFormSubmit} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-purpleScheme">{event.title}</h2>
            <p className="text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

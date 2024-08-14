import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventForm from './components/EventForm';

const App = ({ events }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddEventClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (eventDetails) => {
    setEvents([...events, eventDetails]);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col justify-between bg-purple-200 bg-opacity-25 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purpleScheme-dark">My Events</h1>
        <button onClick={handleAddEventClick} className="bg-green-200 hover:bg-purpleScheme-dark text-black font-bold py-2 px-4 rounded">
          + Add Event
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Profile
        </button>
        {showForm && <EventForm onSubmit={handleFormSubmit} onClose={handleCloseForm} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`}>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold text-purpleScheme">{event.title}</h2>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <h1 className="text-3xl">Party Gem Logo</h1>
        <div>Terms and conditions</div>
      </div>
    </div>
  );
};

export default App;

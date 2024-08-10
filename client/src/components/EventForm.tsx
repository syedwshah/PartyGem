import React, { useState } from 'react';

const EventForm = ({ onSubmit, onClose }) => {
  const [eventDetails, setEventDetails] = useState({
    attendees: '',
    dateTime: '',
    eventName: '',
    allergies: '',
    parking: false,
    attendance: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventDetails.attendees <= 0) {
      alert("Number of attendees must be greater than 0");
      return;
    }
    onSubmit(eventDetails);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-lg w-full p-6 bg-white shadow-md rounded-lg space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close form"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Create an Event</h2>

        {/* Form Fields */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Event Name:</label>
          <input
            type="text"
            name="eventname"
            value={eventDetails.eventName}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Max number of Attendees:</label>
          <input
            type="number"
            name="attendees"
            value={eventDetails.attendees}
            onChange={handleChange}
            required
            min="1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date & Time:</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={eventDetails.dateTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Any Allergies?:</label>
          <input
            type="text"
            name="allergies"
            value={eventDetails.allergies}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="parking"
            checked={eventDetails.parking}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="block text-sm font-medium text-gray-700">Need Parking?</label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Attendance:</label>
          <select
            name="attendance"
            value={eventDetails.attendance}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select an option</option>
            <option value="going">Going</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventForm;

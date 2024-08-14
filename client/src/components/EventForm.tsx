import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface EventFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      attendees: 0,
      dateTime: '',
      eventName: '',
      eventDescription: '',
      allergies: '',
      parking: false,
      attendance: '',
    }
  });

  const onSubmitForm = (data: any) => {
    if (data.attendees <= 0) {
      alert("Number of attendees must be greater than 0");
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit(onSubmitForm)} className="relative max-w-lg w-full p-6 bg-white shadow-md rounded-lg space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close form"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Create an Event</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Event Name:</label>
          <input
            type="text"
            {...register('eventName', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.eventName && <span className="text-red-500 text-sm">Event Name is required</span>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Event Description:</label>
          <textarea
            {...register('eventDescription', { required: true })}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          {errors.eventDescription && <span className="text-red-500 text-sm">Event Description is required</span>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Max number of Attendees:</label>
          <input
            type="number"
            {...register('attendees', { required: true, min: 1 })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.attendees && <span className="text-red-500 text-sm">Number of attendees must be greater than 0</span>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date & Time:</label>
          <input
            type="datetime-local"
            {...register('dateTime', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.dateTime && <span className="text-red-500 text-sm">Date and Time are required</span>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Any Allergies?:</label>
          <input
            type="text"
            {...register('allergies')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="parking"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                {...field}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            )}
          />
          <label className="block text-sm font-medium text-gray-700">Need Parking?</label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Attendance:</label>
          <select
            {...register('attendance', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select an option</option>
            <option value="going">Going</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
          {errors.attendance && <span className="text-red-500 text-sm">Attendance is required</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
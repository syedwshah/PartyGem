import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEvent } from '../contexts/EventContext';

const EventDetails = () => {
  //query backend for event details
  // const { id } = useParams();
  const { id } = useParams();
  const { events } = useEvent();
  const event = events.find(e => e.id === parseInt(id, 10));

  if (!event) {
    return <div>Event not found</div>;
  }

  const userIsOrganizer = true; // Replace with actual logic to determine if the user is the organizer

  return (
    <div className="flex flex-col justify-between bg-purple-200 bg-opacity-25 min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-purpleScheme-dark mb-4">{event.title}</h2>
        <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600 mb-4"><strong>Description:</strong> {event.description}</p>

        <div className="mt-4">
          {event.tags.map(tag => (
            <span key={tag} className="inline-block bg-purpleScheme-light text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>

        {userIsOrganizer && (
          <Link to={`/edit-event/${event.id}`}>
            <button className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Edit Event
            </button>
          </Link>
        )}

        <Link to="/home">
          <button className="mt-6 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Back to Events
          </button>
        </Link>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl">Party Gem Logo</h1>
        <div>Terms and conditions</div>
      </div>
    </div>
  );
};

export default EventDetails;

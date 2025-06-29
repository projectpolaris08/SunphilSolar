import React from "react";

interface DayEventsModalProps {
  events: any[];
  onClose: () => void;
}

const DayEventsModal: React.FC<DayEventsModalProps> = ({ events, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Events for this day</h3>
      <div className="space-y-3">
        {events.map((event, idx) => (
          <div key={idx} className="border rounded p-3 shadow">
            <div className="font-semibold">
              {event.clientName || event.title}
            </div>
            {event.projectType && (
              <div className="text-xs text-gray-500">{event.projectType}</div>
            )}
            {event.location && (
              <div className="text-sm text-gray-600">{event.location}</div>
            )}
            {event.systemCapacity && (
              <div className="text-xs text-gray-500">
                {event.systemCapacity}
              </div>
            )}
            {event.notes && (
              <div className="text-xs text-gray-400 mt-1">{event.notes}</div>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default DayEventsModal;

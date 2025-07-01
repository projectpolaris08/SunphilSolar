import React from "react";

interface DayEventsModalProps {
  events: any[];
  onClose: () => void;
}

const DayEventsModal: React.FC<DayEventsModalProps> = ({ events, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Events for this day
      </h3>
      <div className="space-y-3">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded p-3 shadow bg-white dark:bg-gray-800"
          >
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {event.clientName || event.title}
            </div>
            {event.projectType && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {event.projectType}
              </div>
            )}
            {event.location && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {event.location}
              </div>
            )}
            {event.systemCapacity && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {event.systemCapacity}
              </div>
            )}
            {event.notes && (
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {event.notes}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default DayEventsModal;

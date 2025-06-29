const InquiriesPage = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
    <div className="relative flex items-center justify-center min-h-[56px] mb-4">
      <h1 className="text-xl font-bold w-full text-center dark:text-gray-100">
        Customer Inquiries
      </h1>
    </div>
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              John Doe
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              john@example.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Interested in residential solar installation for 5kW system
            </p>
          </div>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            New
          </span>
        </div>
        <div className="mt-3 flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900 text-sm">
            Reply
          </button>
          <button className="text-green-600 hover:text-green-900 text-sm">
            Mark as Read
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default InquiriesPage;

const ModalDetailVaccine = ({ isOpen, onClose, data, type }) => {
    if (!isOpen || !data) return null;
  
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  
    const renderVaccineDetails = () => (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">{data.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Description</h3>
            <p className="text-gray-700">{data.description || "No description available"}</p>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Basic Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">ID:</span> {data.id}</p>
              <p><span className="font-medium">Price:</span> {data.price?.toLocaleString()} VND</p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    data.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.status}
                </span>
              </p>
              <p><span className="font-medium">Quantity:</span> {data.quantity}</p>
              <p><span className="font-medium">From Country:</span> {data.fromCountry}</p>
            </div>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Dosage Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Doses Required:</span> {data.doesTimes}</p>
              <p><span className="font-medium">Min. Interval:</span> {data.minimumIntervalDate} days</p>
              <p><span className="font-medium">Max. Interval:</span> {data.maximumIntervalDate} days</p>
            </div>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Age Recommendation</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Min Age:</span> {data.suggestAgeMin}{" "}
                {data.suggestAgeMin < 12 ? "months" : "months"}
              </p>
              <p>
                <span className="font-medium">Max Age:</span> {data.suggestAgeMax}{" "}
                {data.suggestAgeMax >= 12 ? "months" : "months"}
              </p>
            </div>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Date Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Entry Date:</span> {formatDate(data.entryDate)}</p>
              <p><span className="font-medium">Expiry Date:</span> {formatDate(data.timeExpired)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  
    const renderComboDetails = () => (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">{data.comboName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
  
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="col-span-2 bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-green-700">Combo Information</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">ID: {data.id}</p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      data.status === "AVAILABLE" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {data.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
  
          <div className="col-span-2 bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Pricing</h3>
            <div className="flex justify-between items-center">
              <div>
                <p><span className="font-medium">Original Price:</span> {data.totalPrice?.toLocaleString()} VND</p>
                <p><span className="font-medium">Discount:</span> {data.discount}%</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-700">
                  {data.finalPrice?.toLocaleString()} VND
                </p>
                <p className="text-sm text-gray-600">Final Price</p>
              </div>
            </div>
          </div>
  
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Included Vaccines</h3>
            <div className="space-y-4">
              {data.vaccines &&
                data.vaccines.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-700">{vaccine.name}</h4>
                        <p className="text-sm text-gray-600">{vaccine.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{vaccine.price?.toLocaleString()} VND</p>
                        <p className="text-sm text-gray-600">{vaccine.doesTimes} doses</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Age Range:</span>{" "}
                        {vaccine.suggestAgeMin}-{vaccine.suggestAgeMax} months
                      </p>
                      <p><span className="font-medium">From:</span> {vaccine.fromCountry}</p>
                      <p>
                        <span className="font-medium">Interval:</span>{" "}
                        {vaccine.minimumIntervalDate}-{vaccine.maximumIntervalDate} days
                      </p>
                      <p><span className="font-medium">Expires:</span> {formatDate(vaccine.timeExpired)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {type === "vaccine" ? renderVaccineDetails() : renderComboDetails()}
      </div>
    );
  };
  
  export default ModalDetailVaccine;
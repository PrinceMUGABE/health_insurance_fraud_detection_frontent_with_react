/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PredictInsurance = () => {
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    marital_status: "",
    insurance: "",
    address: "",
    picture: null,
  });

  const [capturedImage, setCapturedImage] = useState(null);
  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const [maritalStatusOptions] = useState([
    "Single",
    "Married",
    "Widowed",
    "Separated",
    "Divorced",
  ]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsuranceOptions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/insurance/insurances/"
        );
        if (response.status === 200 && response.data.insurances) {
          setInsuranceOptions(response.data.insurances);
        }
      } catch (error) {
        console.error("Error fetching insurance options:", error);
      }
    };

    fetchInsuranceOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base64Image = capturedImage ? capturedImage.split(",")[1] : null;
      const updatedInputData = { ...inputData, picture: base64Image };

      const requiredFields = [
        "first_name",
        "last_name",
        "phone",
        "gender",
        "marital_status",
        "insurance",
        "address",
        "picture",
      ];
      for (const field of requiredFields) {
        if (!updatedInputData[field]) {
          alert(`Please provide ${field.replace("_", " ")}.`);
          return;
        }
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/prediction/save_prediction/",
        updatedInputData
      );

      if (response.status === 201 || response.status === 200) {
        setComparisonResults(response.data);
        setErrorMessage(null); // Clear any previous error message
      } else {
        setErrorMessage("Failed to save client information.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error("Error saving client:", error);
        setErrorMessage("An error occurred while saving client information.");
      }
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retakeImage = () => {
    setCapturedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const hasMismatchedData = (results) => {
    return results && Object.keys(results.mismatched_data).length > 0;
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create New Member</h2>
        <p className="text-center text-gray-600 mb-8">Add New Insurance Member</p>
        
        <form className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={inputData.first_name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={inputData.last_name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={inputData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={inputData.gender}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select gender...</option>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select
                id="marital_status"
                name="marital_status"
                value={inputData.marital_status}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select marital status...</option>
                {maritalStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Insurance */}
            <div>
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
                Insurance
              </label>
              <select
                id="insurance"
                name="insurance"
                value={inputData.insurance}
                onChange={handleInputChange}
                required
                className="mt-1 block w-1/2 text-black pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select insurance...</option>
                {insuranceOptions.map((option) => (
                  <option key={option.id} value={option.insurance_code}>
                    {option.insurance_code} - {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={inputData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="mt-1 block w-1/2 text-black px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Webcam Capture Section */}
            {/* Picture Capture */}
            <div className="mb-4">
              <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                Picture
              </label>
              {!capturedImage ? (
                <div className="flex flex-col items-center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={captureImage}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Capture Picture
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={retakeImage}
                    className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Retake Picture
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button - Full Width */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="w-1/6 flex justify-center py-2 px-12 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Member
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-8 p-4 border border-red-500 rounded-md shadow-md bg-red-50 text-red-700">
            <p>{errorMessage}</p>
          </div>
        )}

        {comparisonResults && (
          <div className="mt-8 p-4 border rounded-md shadow-md">
          {hasMismatchedData(comparisonResults) ? (
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 h-60 w-60 text-3xl mr-2" />
              <ul className="list-disc list-inside mt-4">
                {Object.entries(comparisonResults.mismatched_data).map(([key, value]) => (
                  <li className="flex items-center text-black mb-2" key={key}>
                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />
                    {key.replace("_", " ")}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-16 w-16 text-3xl mr-2" />
              <span className="text-xl font-semibold text-green-600">All Data Matches</span>
            </div>
          )}
        </div>
        
        )}
      </div>
    </div>
  );
};

export default PredictInsurance;

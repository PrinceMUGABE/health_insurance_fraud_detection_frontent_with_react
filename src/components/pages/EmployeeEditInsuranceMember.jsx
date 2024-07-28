// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeEditInsuranceMember() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    marital_status: "",
    address: "",
    insurance_code: "",
  });

  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const [maritalStatusOptions] = useState([
    "Single",
    "Married",
    "Widowed",
    "Separated",
    "Divorced",
  ]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/client/get_client/${clientId}/`
        );
        setClientData(response.data);
        setInputData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          phone: response.data.phone,
          gender: response.data.gender,
          marital_status: response.data.marital_status,
          address: response.data.address,
          insurance_code: response.data.insurance?.insurance_code || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/client/update_client/${clientId}/`,
        inputData
      );
      if (response.status === 200) {
        alert("Client information updated successfully");
        navigate("/employee/insuranceMember");
      } else {
        alert("Failed to update client information");
      }
    } catch (err) {
      console.error("Error updating client", err);
      alert("An error occurred while updating the client information");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mt-3 text-black">
        Edit Client Details
      </h1>
      <div className="flex justify-center mt-8">
        <div>
          <form onSubmit={handleSave} className="max-w-lg mx-auto mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Client Code
                </label>
                <input
                  type="text"
                  name="client_code"
                  value={clientData.client_code}
                  className="w-full px-3 py-2 border rounded text-black"
                  readOnly // Client code should not be editable
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={inputData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={inputData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={inputData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={inputData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black rounded"
                >
                  <option value="">Select gender...</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Marital Status
                </label>
                <select
                  name="marital_status"
                  value={inputData.marital_status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black rounded"
                >
                  <option value="">Select marital status...</option>
                  {maritalStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={inputData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Insurance Code
                </label>
                <input
                  type="text"
                  name="insurance_code"
                  value={inputData.insurance_code}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-3 py-2 border text-black rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 ml-0 sm:ml-16">
          <div className="max-w-md">
            {clientData.picture && (
              <div className="mb-4">
                <strong className="block text-gray-700 text-sm font-bold mb-2">
                  Picture
                </strong>
                <img
                  src={`data:image/jpeg;base64,${clientData.picture}`}
                  alt="Client"
                  className="w-full rounded"
                />
              </div>
            )}
            <p className="text-gray-700 text-sm font-bold">
              Created Date:
              <span className="ml-2 text-black">
                {new Date(clientData.created_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeEditInsuranceMember;

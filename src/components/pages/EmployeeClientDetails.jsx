// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EmployeeClientDetails() {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/client/get_client/${clientId}/`
        );
        setClientData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mt-3 text-black">
        Insurance Member Details
      </h1>
      <div className="flex flex-col md:flex-row justify-center mt-12 gap-4">
        <div className="w-full md:w-1/2 px-9">
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <p>
              <strong className="text-gray-500">Client Code:</strong>{" "}
              <span className="text-blue-700 font-bold">
                {clientData.client_code}
              </span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <p>
              <strong className="text-gray-500">First Name:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.first_name}
              </span>
            </p>

            <p>
              <strong className="text-gray-500">Last Name:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.last_name}
              </span>
            </p>
 
            <p>
              <strong className="text-gray-500">Phone:</strong>{" "}
              <span className="font-bold text-slate-900">{clientData.phone}</span>
            </p>
       
            <p>
              <strong className="text-gray-500">Gender:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.gender}
              </span>
            </p>

            <p>
              <strong className="text-gray-500">Marital Status:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.marital_status}
              </span>
            </p>
 

            <p>
              <strong className="text-gray-500">Insurance Code:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.insurance?.insurance_code || "N/A"}
              </span>
            </p>

            <p>
              <strong className="text-gray-500">Insurance Name:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.insurance?.name || "N/A"}
              </span>
            </p>

            <p>
              <strong className="text-gray-500">Address:</strong>{" "}
              <span className="font-bold text-slate-900">
                {clientData.address}
              </span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-5">
          {clientData.picture && (
            <div className="bg-white shadow-md rounded p-4 mb-4">
              <strong className="text-gray-500">Picture:</strong>
              <img
                src={`data:image/jpeg;base64,${clientData.picture}`}
                alt="Client"
                className="w-full md:w-auto"
              />
            </div>
          )}
          <div className="bg-white shadow-md rounded p-3">
            <p>
              <strong className="text-gray-500">Created Date:</strong>{" "}
              <span className="font-bold text-slate-900">
                {new Date(clientData.created_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeClientDetails;

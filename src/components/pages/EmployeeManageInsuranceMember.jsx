/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeManageInsuranceMember() {
  const [clientsData, setClientsData] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleFetch = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/client/clients/');
      if (res.data && res.data.clients) {
        setClientsData(res.data.clients);
      } else {
        console.log("Error listing clients");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = clientsData.filter(client =>
    filter === 'all' || (client.insurance && client.insurance.insurance_code.toLowerCase() === filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    const conf = window.confirm("Do you want to delete this client?");
    if (conf) {
      try {
        const res = await axios.delete(`http://127.0.0.1:8000/client/delete/${id}`);
        if (res.status === 204) {
          alert("Member deleted successfully");
          setClientsData(prevClientsData => prevClientsData.filter(client => client.id !== id));
        } else {
          alert("Failed to delete member");
        }
      } catch (err) {
        console.error("Error deleting client", err);
        alert("An error occurred while deleting the member");
      }
    }
  };

  return (
    <>
      <h1 className='text-center text-black font-bold text-xl capitalize mb-4'>Insurance Member</h1>
      <div className="flex justify-between mb-4">
        <Link to="/employee/createInsuranceMember" className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Add new member</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">First Name</th>
              <th scope="col" className="px-6 py-3">Last Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Insurance</th>
              <th scope="col" className="px-6 py-3">Start Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((client, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-50 even:bg-gray-50 even:dark:bg-gray-50border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                    {client.first_name}
                  </td>
                  <td className="px-6 text-gray-900 py-4">{client.last_name}</td>
                  <td className="px-6 text-gray-900 py-4">{client.phone}</td>
                  <td className="px-6 text-gray-900 py-4">{client.insurance?.insurance_code}</td> {/* Display insurance_code */}
                  <td className="px-6 text-gray-900 py-4">{new Date(client.created_date).toLocaleDateString()}</td> {/* Format date */}
                  <td className="px-6 text-gray-900 py-4">
                    <Link
                      to={`/employee/viewClient/${client.id}`}
                      className="px-2 py-2 rounded-xl bg-blue-700 text-white mr-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/employee/editClient/${client.id}`}
                      className="px-2 py-2 rounded-xl bg-green-700 text-white mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="px-2 py-2 rounded-xl bg-red-700 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">No clients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeManageInsuranceMember;

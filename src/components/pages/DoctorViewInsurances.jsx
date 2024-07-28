/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorViewInsurance() {
  const [insurances, setInsurances] = useState([]);
  const [setError] = useState('');
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFetch = async (page = 1, query = '') => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/insurance/insurances/', {
        params: { page, q: query },
      });
      if (res.data) {
        setInsurances(res.data.insurances);
        setPage(res.data.page);
        setNumPages(res.data.num_pages);
      } else {
        setError('Error listing insurances');
      }
    } catch (err) {
      setError('An error occurred while fetching insurances');
      console.error('Error fetching insurances:', err);
    }
  };

  useEffect(() => {
    handleFetch(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <h1 className="text-center text-black text-xl capitalize mb-4">Insurances</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 text-gray-500 border rounded-md"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Code</th>
              <th scope="col" className="px-6 py-3">Owned By</th>
              {/* <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {insurances.length > 0 ? (
              insurances.map((insurance, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {insurance.name}
                  </th>
                  <td className="px-6 py-4">{insurance.insurance_code}</td>
                  <td className="px-6 py-4">{insurance.owner}</td>
                  {/* <td className="px-6 py-4">{new Date(insurance.created_date).toLocaleDateString()}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">No Insurances found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {Array.from({ length: numPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 ${page === index + 1 ? 'bg-purple-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorViewInsurance;

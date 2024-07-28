
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeViewInsurance() {
  const [institutionData, setInstitutionData] = useState([]);
  const [filter, setFilter] = useState('all'); // Added state for filter

  const handleFetch = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/institution/view_all_institutions/');
      if (res.data) {
        setInstitutionData(res.data); // Adjusted to match the example response structure
      } else {
        console.log("error listing institutions");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update filter state when filter changes
  };

  const filteredData = institutionData.filter(institution => 
    filter === 'all' || institution.type.toLowerCase() === filter.toLowerCase()
  ); // Filter data based on filter state


  return (
    <>
      <h1 className='text-center text-black text-xl capitalize mb-4'>Institutions</h1>
      <div className="flex justify-between mb-4">

        <Link to="/admin/addinsurance" className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Add Insurance</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Created Date</th>

            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((institution, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {institution.name}
                  </th>
                  {/* <td className="px-6 py-4">{institution.type}</td> */}
                  <td className="px-6 py-4">{institution.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">No Institutions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeViewInsurance;



/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function DoctorViewFrauds() {
  const [institutionData, setInstitutionData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedInstitution, setSelectedInstitution] = useState(null); // State for selected institution
  const [showDetails, setShowDetails] = useState(false); // State for showing details
  const rowsPerPage = 5;

  const handleFetch = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/prediction/predictions/');
      if (res.data) {
        setInstitutionData(res.data.predictions || []);
      } else {
        console.log("Error listing institutions");
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Firstname', 'Lastname', 'Telephone', 'Institution', 'Status', 'Created Date']],
      body: sortedData.map(institution => [
        institution.first_name,
        institution.last_name,
        institution.phone,
        institution.insurance ? institution.insurance.insurance_code : 'N/A',
        institution.available ? 'Available' : 'Frauded',
        formatDate(institution.created_date),
      ]),
    });
    doc.save('table_data.pdf');
  };

  const handleExcelDownload = () => {
    const formattedData = institutionData.map(item => ({
      ...item,
      created_date: formatDate(item.created_date),
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Default format is 'MM/DD/YYYY'
  };

  const filteredData = Array.isArray(institutionData)
    ? institutionData.filter(institution => 
        (filter === 'all' || institution.type?.toLowerCase() === filter.toLowerCase()) &&
        (institution.first_name.toLowerCase().includes(search.toLowerCase()) ||
         institution.last_name.toLowerCase().includes(search.toLowerCase()) ||
         institution.phone.includes(search) ||
         (institution.insurance && institution.insurance.insurance_code.toLowerCase().includes(search.toLowerCase())) ||
         institution.available.toString().toLowerCase().includes(search.toLowerCase()) ||
         formatDate(institution.created_date).toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  const sortedData = filteredData.sort((a, b) => {
    const statusA = a.available ? 'Available' : 'Frauded';
    const statusB = b.available ? 'Available' : 'Frauded';
    if (sortOrder === 'asc') {
      return statusA.localeCompare(statusB);
    } else {
      return statusB.localeCompare(statusA);
    }
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    const conf = window.confirm("Do you want to delete this institution?");
    if (conf) {
      try {
        const res = await axios.delete('http://127.0.0.1:8000/prediction/delete/' + id);
        if (res.status === 204) {
          alert("Institution deleted successfully");
          setInstitutionData(prevInstitutionData => prevInstitutionData.filter(institution => institution.id !== id));
        } else {
          alert("Failed to delete institution");
        }
      } catch (err) {
        console.error("Error deleting institution", err);
        alert("An error occurred while deleting the institution");
      }
    }
  };

  const handleViewDetails = (institution) => {
    setSelectedInstitution(institution);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedInstitution(null);
  };

  return (
    <>
      <h1 className='text-center font-bold text-black text-xl capitalize mb-4 mt-3 pb-4'>Insurance Prediction Results</h1>
      
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 text-gray-700 border rounded-md"
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="sortOrder" className="text-gray-700">Sort by Status:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md"
          >
            <option className='text-gray-600' value="asc">Available</option>
            <option className='text-gray-600' value="desc">Frauded</option>
          </select>
        </div>
        <Link to="/doctor/predictInsurance" className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Predict Insurance</Link>
        <button onClick={handlePDFDownload} className="px-4 py-2 bg-green-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Download PDF</button>
        <button onClick={handleExcelDownload} className="px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Download Excel</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3">Firstname</th> */}
              {/* <th scope="col" className="px-6 py-3">Lastname</th> */}
              <th scope="col" className="px-6 py-3">Telephone</th>
              <th scope="col" className="px-6 py-3">Institution</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((institution, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700">
                  {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {institution.first_name}
                  </th> */}
                  {/* <td className="px-6 py-4">{institution.last_name}</td> */}
                  <td className="px-6 py-4">{institution.phone}</td>
                  <td className="px-6 py-4">{institution.insurance ? institution.insurance.insurance_code : 'N/A'}</td>
                  <td className="px-6 py-4">{institution.available ? 'Available' : 'Frauded'}</td>
                  <td className="px-6 py-4">{formatDate(institution.created_date)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(institution)}
                      className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                    >
                      View
                    </button>
                    {/* <button
                      onClick={() => handleDelete(institution.id)}
                      className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 ml-2"
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">No Institutions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-purple-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Details Modal */}
      {showDetails && selectedInstitution && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl text-gray-600 font-bold mb-4">
              Prediction Details
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                <p className="text-gray-600 text-sm">
                  <strong>Firstname:</strong> {selectedInstitution.first_name}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Lastname:</strong> {selectedInstitution.last_name}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Telephone:</strong> {selectedInstitution.phone}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Institution:</strong>{" "}
                  {selectedInstitution.insurance
                    ? selectedInstitution.insurance.insurance_code
                    : "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Status:</strong>{" "}
                  {selectedInstitution.available ? "Available" : "Frauded"}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Address:</strong> {selectedInstitution.address}
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Created Date:</strong>{" "}
                  {formatDate(selectedInstitution.created_date)}
                </p>
              </div>
              <div className="flex-shrink-0">
                {selectedInstitution.picture && (
                  <img
                    src={`data:image/jpeg;base64,${selectedInstitution.picture}`}
                    alt="Profile"
                    className="w-32 h-32 object-cover"
                  />
                )}
              </div>
            </div>
            <button
              onClick={handleCloseDetails}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorViewFrauds;



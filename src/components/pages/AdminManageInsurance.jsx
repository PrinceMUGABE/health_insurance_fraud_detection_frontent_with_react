/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function AdminManageInsurances() {
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

  const handleDelete = async (id) => {
    const conf = window.confirm('Do you want to delete this insurance?');
    if (conf) {
      try {
        const res = await axios.delete(`http://127.0.0.1:8000/insurance/delete/${id}`);
        if (res.status === 204) {
          alert('Insurance deleted successfully');
          setInsurances(prevInsurances => prevInsurances.filter(insurance => insurance.id !== id));
        } else {
          alert('Failed to delete insurance');
        }
      } catch (err) {
        console.error('Error deleting insurance:', err);
        alert('An error occurred while deleting the insurance');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Code", "Owned By", "Created Date"];
    const tableRows = [];

    insurances.forEach(insurance => {
      const insuranceData = [
        insurance.name,
        insurance.insurance_code,
        insurance.owner,
        new Date(insurance.created_date).toLocaleDateString(),
      ];
      tableRows.push(insuranceData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Insurances List", 14, 15);
    doc.save("insurances_list.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(insurances.map(insurance => ({
      Name: insurance.name,
      Code: insurance.insurance_code,
      OwnedBy: insurance.owner,
      CreatedDate: new Date(insurance.created_date).toLocaleDateString(),
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Insurances");
    XLSX.writeFile(workbook, "insurances_list.xlsx");
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 ${number === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} rounded-full`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1 className="text-center text-black text-xl font-bold capitalize mb-4">Insurances</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 bg-white text-black border rounded-full"
        />
        <Link to="/admin/addinsurance" className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white">
          Add Insurance
        </Link>


        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Download Excel
        </button>

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Code</th>
              <th scope="col" className="px-6 py-3">Owned By</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
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
                  <td className="px-6 py-4">{new Date(insurance.created_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/editInsurance/${insurance.id}`}
                      className="px-2 py-2 text-blue-500"
                    >
                      Edit
                    </Link>
                    {' | '}
                    <span
                      onClick={() => handleDelete(insurance.id)}
                      className="px-2 py-2 text-red-500 cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">No Insurances found</td>
              </tr>
            )}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    </>
  );
}

export default AdminManageInsurances;

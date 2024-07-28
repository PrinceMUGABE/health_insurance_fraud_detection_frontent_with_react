/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx'; // Use named import for XLSX

function AdminViewMemberInsuranceMember() {
  const [institutionData, setInstitutionData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFetch = async (page = 1, query = '') => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/client/clients/', {
        params: { page, q: query },
      });
      if (res.data) {
        setInstitutionData(res.data.clients);
        setPage(res.data.page);
        setNumPages(res.data.num_pages);
      } else {
        console.log('Error listing institutions');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetch(page, searchQuery);
  }, [page, searchQuery]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredData = institutionData.filter((institution) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      (filter === 'all' || institution.type.toLowerCase() === filter.toLowerCase()) &&
      (institution.firstname.toLowerCase().includes(searchTerm) ||
        institution.lastname.toLowerCase().includes(searchTerm) ||
        institution.telephone.includes(searchTerm) ||
        institution.insurance.toLowerCase().includes(searchTerm))
    );
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Firstname', 'Lastname', 'Telephone', 'Insurance']],
      body: filteredData.map((institution) => [
        institution.firstname,
        institution.lastname,
        institution.telephone,
        institution.insurance,
      ]),
    });
    doc.save('InsuranceMembers.pdf');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((institution) => ({
        Firstname: institution.firstname,
        Lastname: institution.lastname,
        Telephone: institution.telephone,
        Insurance: institution.insurance,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Insurance Members');
    XLSX.writeFile(workbook, 'InsuranceMembers.xlsx');
  };

  return (
    <>
      <h1 className="text-center text-black text-xl capitalize mb-4">Insurance Member</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 bg-white text-black border rounded-full"
        />
        <div className="flex gap-2">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white"
          >
            Download PDF
          </button>
          <button
            onClick={downloadExcel}
            className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white"
          >
            Download Excel
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Firstname</th>
              <th scope="col" className="px-6 py-3">Lastname</th>
              <th scope="col" className="px-6 py-3">Telephone</th>
              <th scope="col" className="px-6 py-3">Insurance</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((institution, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {institution.firstname}
                  </th>
                  <td className="px-6 py-4">{institution.lastname}</td>
                  <td className="px-6 py-4">{institution.telephone}</td>
                  <td className="px-6 py-4">{institution.insurance}</td>
                  <td className="px-6 py-4">
                    <button className="px-2 py-2 rounded-xl bg-gray-700 text-white">
                      View details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No Insurance found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {numPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= numPages}
            className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminViewMemberInsuranceMember;

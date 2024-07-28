/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function InsuranceEmployees() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editEmployee, setEditEmployee] = useState(null);
  const [insurances, setInsurances] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    insurance: '',
  });
  const rowsPerPage = 5;

  useEffect(() => {
    handleFetch();
    fetchInsurances();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/employee/employees/');
      if (res.data && res.data.employees) {
        const employees = JSON.parse(res.data.employees);
        setEmployeeData(employees);
      } else {
        console.log("Empty response data");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const fetchInsurances = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/insurance/insurances/');
      setInsurances(res.data.insurances);
    } catch (err) {
      console.error("Error fetching insurances:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    const conf = window.confirm("Do you want to delete this employee?");
    if (conf) {
      try {
        const res = await axios.delete(`http://127.0.0.1:8000/employee/delete/${id}`);
        if (res.status === 204) {
          alert("Employee deleted successfully");
          setEmployeeData(prevEmployeeData => prevEmployeeData.filter(employee => employee.pk !== id));
        } else {
          alert("Failed to delete employee");
        }
      } catch (err) {
        console.error("Error deleting employee", err);
        alert("An error occurred while deleting the employee");
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/employee/edit/${id}/`);
      if (res.data) {
        setEditEmployee(res.data.employee);
        setInsurances(res.data.insurances);
      } else {
        console.log("Empty response data");
      }
    } catch (err) {
      console.error("Error fetching employee data:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://127.0.0.1:8000/employee/update/${editEmployee.id}/`, editEmployee);
      if (res.status === 200) {
        alert("Employee updated successfully");
        setEmployeeData(prevEmployeeData => prevEmployeeData.map(emp => emp.id === editEmployee.id ? editEmployee : emp));
        setEditEmployee(null);
      } else {
        alert("Failed to update employee");
      }
    } catch (err) {
      console.error("Error updating employee", err);
      alert("An error occurred while updating the employee");
    }
  };

  const handleCreateNewEmployee = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/employee/save_employee/', newEmployee);
      if (res.status === 201) {
        alert("Employee created successfully");
        setEmployeeData([...employeeData, res.data]);
        setShowCreateModal(false);
      } else {
        alert("Failed to create employee");
      }
      Navigate('/admin/employees'); // This should be <Navigate to='/admin/employees' /> or use history.push()
    } catch (err) {
      console.error("Error creating employee", err);
      alert("An error occurred while creating the employee");
    }
  };

  const filteredData = employeeData.filter(employee => {
    const queryMatch = employee.fields.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.fields.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.fields.phone.includes(searchQuery) ||
      (employee.fields.insurance && employee.fields.insurance.toLowerCase().includes(searchQuery.toLowerCase()));
    return queryMatch;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className='text-center text-black text-xl font-bold capitalize mb-4'>Employees</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 bg-white text-black border rounded-full"
        />
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create New Employee
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Firstname</th>
              <th scope="col" className="px-6 py-3">Lastname</th>
              <th scope="col" className="px-6 py-3">Telephone</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Insurance</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((employee, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {employee.fields.first_name}
                  </td>
                  <td className="px-6 py-4">{employee.fields.last_name}</td>
                  <td className="px-6 py-4">{employee.fields.phone}</td>
                  <td className="px-6 py-4">{employee.fields.email}</td>
                  <td className="px-6 py-4">{employee.fields.address}</td>
                  <td className="px-6 py-4">{employee.fields.insurance || '-'}</td>
                  <td className="px-6 py-4">{new Date(employee.fields.created_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      onClick={() => handleEdit(employee.pk)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      onClick={() => handleDelete(employee.pk)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <nav className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:text-gray-400'}`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.293 3.293a1 1 0 010 1.414L8.414 8H18a1 1 0 110 2H8.414l3.879 3.879a1 1 0 01-1.415 1.415l-5.586-5.586a1 1 0 010-1.415l5.586-5.586a1 1 0 011.415 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-600'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:text-gray-400'}`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 000 1.414L11.586 8H2a1 1 0 100 2h9.586l-3.879 3.879a1 1 0 101.415 1.415l5.586-5.586a1 1 0 000-1.415l-5.586-5.586a1 1 0 00-1.415 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setShowCreateModal(false)}></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex">
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">Create New Employee</h4>
                  <div className="mt-2">
                    <div className="space-y-4">
                      {['first_name', 'last_name', 'phone', 'email', 'address', 'insurance'].map((field) => (
                        <div key={field}>
                          <label className="block mb-1 text-sm text-gray-600">{field.replace('_', ' ').toUpperCase()}</label>
                          {field === 'insurance' ? (
                            <select
                              name={field}
                              value={newEmployee[field]}
                              onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
                              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                            >
                              <option value="">Select Insurance</option>
                              {insurances.map((insurance) => (
                                <option key={insurance.id} value={insurance.id}>{insurance.name}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={field}
                              value={newEmployee[field]}
                              onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
                              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleCreateNewEmployee}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editEmployee && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setEditEmployee(null)}></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex">
                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                  <h4 className="text-lg font-medium text-gray-800">Edit Employee</h4>
                  <div className="mt-2">
                    <div className="space-y-4">
                      {['first_name', 'last_name', 'phone', 'email', 'address', 'insurance'].map((field) => (
                        <div key={field}>
                          <label className="block mb-1 text-sm text-gray-600">{field.replace('_', ' ').toUpperCase()}</label>
                          {field === 'insurance' ? (
                            <select
                              name={field}
                              value={editEmployee[field]}
                              onChange={(e) => setEditEmployee({ ...editEmployee, [field]: e.target.value })}
                              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                            >
                              <option value="">Select Insurance</option>
                              {insurances.map((insurance) => (
                                <option key={insurance.id} value={insurance.id}>{insurance.name}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={field}
                              value={editEmployee[field]}
                              onChange={(e) => setEditEmployee({ ...editEmployee, [field]: e.target.value })}
                              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditEmployee(null)}
                      className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceEmployees;

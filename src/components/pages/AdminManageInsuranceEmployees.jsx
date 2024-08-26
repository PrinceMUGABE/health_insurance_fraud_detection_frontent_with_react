import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        setEmployeeData(employees.map(employee => ({
          ...employee,
          fields: {
            ...employee.fields,
            insurance: employee.fields.insurance || '' // Ensure insurance is always a string
          }
        })));
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
    setCurrentPage(1); // Reset to the first page on search
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
        setShowCreateModal(false); // Close modal after successful creation
        handleFetch(); // Refresh the employee list
      } else {
        alert("Failed to create employee");
      }
    } catch (err) {
      console.error("Error creating employee", err);
      alert("An error occurred while adding the employee");
      setShowCreateModal(false); // Close modal even if there's an error
      handleFetch(); // Refresh the employee list
    }
  };

  const filteredData = employeeData.filter(employee => {
    if (!employee || !employee.fields) return false;

    const firstName = employee.fields.first_name.toLowerCase();
    const lastName = employee.fields.last_name.toLowerCase();
    const phone = employee.fields.phone;
    const insurance = (typeof employee.fields.insurance === 'string' ? employee.fields.insurance.toLowerCase() : '');
    const query = searchQuery.toLowerCase();

    return firstName.includes(query) ||
      lastName.includes(query) ||
      phone.includes(searchQuery) ||
      insurance.includes(query);
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
        {/* <button
          onClick={() => {
            setShowCreateModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create New Employee
        </button> */}
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
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border-gray-300 hover:bg-gray-50`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Employee</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateNewEmployee();
            }}>
              <input
                type="text"
                placeholder="First Name"
                value={newEmployee.first_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newEmployee.last_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Address"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Insurance"
                value={newEmployee.insurance}
                onChange={(e) => setNewEmployee({ ...newEmployee, insurance: e.target.value })}
                className="block w-full mb-2 px-3 py-2 border rounded"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceEmployees;

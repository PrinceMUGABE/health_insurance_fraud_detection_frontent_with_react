// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddInstitutions = () => {
  const [inputData, setInputData] = useState({ name: "", code: "", owner: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    // const token = JSON.parse(sessionStorage.getItem('userData'))?.accessToken;

    // if (!token) {
    //   navigate('/admin/insurance');
    //   return;
    // }

    try {
      const res = await axios.post("http://127.0.0.1:8000/insurance/save/", inputData, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });

      if (res.data) {
        alert("Insurance added successfully");
        navigate("/admin/insurance");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Error: ' + err.response.data.error);
      } else if (err.response?.status === 401) {
        navigate('/admin/insurance');
      } else {
        setError('An error occurred while creating the insurance');
      }
      console.log("Error creating insurance", err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>
        <small className="mt-1.5 text-center">Add New Insurance</small>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handlerSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Code
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  autoComplete="code"
                  onChange={(e) => setInputData({ ...inputData, code: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="owner"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Owner
              </label>
              <div className="mt-2">
                <input
                  id="owner"
                  name="owner"
                  type="text"
                  autoComplete="owner"
                  onChange={(e) => setInputData({ ...inputData, owner: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-purple-400 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInstitutions;

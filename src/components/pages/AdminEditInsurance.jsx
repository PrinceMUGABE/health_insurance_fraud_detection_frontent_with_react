/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditInsurance = () => {
  const { id } = useParams();
  const [data, setData] = useState({ name: '', insurance_code: '', owner: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // const token = JSON.parse(sessionStorage.getItem("userData")).accessToken;
    axios
      .get(`http://127.0.0.1:8000/insurance/edit/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.insurance) {
          setData(res.data.insurance);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const token = JSON.parse(sessionStorage.getItem("userData")).accessToken;
    try {
      axios
        .put(`http://127.0.0.1:8000/insurance/update/${id}/`, data, {
          // headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data) {
            alert("Insurance updated successfully");
            navigate("/admin/insurance");
          }
        });
    } catch (err) {
      console.log("Error updating Insurance", err);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Insurance Info
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={data.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="insurance_code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Code
            </label>
            <div className="mt-2">
              <input
                id="insurance_code"
                name="insurance_code"
                type="text"
                value={data.insurance_code}
                onChange={handleChange}
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
              Owned By
            </label>
            <div className="mt-2">
              <input
                id="owner"
                name="owner"
                type="text"
                value={data.owner}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-purple-400 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditInsurance;

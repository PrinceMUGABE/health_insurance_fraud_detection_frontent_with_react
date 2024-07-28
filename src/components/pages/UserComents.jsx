import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserComments() {
  const [commentData, setcommentData] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/institution/view_all_comments/"
      );
      if (res.data) {
        setcommentData(res.data); // Adjusted to match the example response structure
      } else {
        console.log("error listing Comments");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <h1 className="text-center text-black text-xl capitalize mb-4">
        Comments
      </h1>{" "}
      <div className="flex justify-between mb-4">
        {/* <div>
          <Link className=" px-4 py-2 rounded-full bg-purple-500 text-black" to="/organizer/comment_reply">Add</Link>
        </div> */}
       
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Policy
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Institution
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Comment
              </th> */}
              <th scope="col" className="px-6 py-3">
                Created_date
              </th>
             
            </tr>
          </thead>
          <tbody>
            {commentData.length > 0 ? (
              commentData.map((comment, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
            
                  <td className="px-6 py-4">{comment.user.email}</td>
                  <td className="px-6 py-4">{comment.policy.name}</td>
                  <td className="px-6 py-4">{comment.policy.department.name}</td>
                  <td className="px-6 py-4">{comment.policy.department.institution.name}</td>
                  <td className="px-6 py-4">{comment.description}</td>
                  {/* <td className="px-6 py-4">{comment.comment_descrip}</td> */}
                  <td className="px-6 py-4">{comment.created_at}</td>
                  

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserComments;

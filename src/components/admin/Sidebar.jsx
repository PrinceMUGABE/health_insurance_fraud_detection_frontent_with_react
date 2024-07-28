// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { FaUsers, FaFileExcel } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { BiSolidInstitution } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/police_image/logo_lil.jpeg';
import Logo from '../../assets/police_image/nyirinkwayaLogo.jpeg';
import { FcDepartment } from "react-icons/fc";
// eslint-disable-next-line no-unused-vars
import { FaCommentDots } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";

function Sidebar() {
  const [activeLink, setActiveLink] = useState(null);
 

  const handleLinkClick = (index) => {
    setActiveLink(index);
    // if (index === 2) {
    //   setIsInstitutionOpen(!isInstitutionOpen);
    // } else {
    //   setIsInstitutionOpen(false);
    // }
  };

  const Sidebar_Links = [
    { id: 1, name: 'Dashboard', path: '/admin', icon: <MdDashboard /> },
    { id: 2, name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    
    {
      id: 4, 
      name: 'Insurances',
      path:"/admin/insurance", 
      icon: <BiSolidInstitution />,
    },
    { id: 3, name: 'Employee', path: '/admin/employees', icon: <GiPoliceOfficerHead /> },
    
    { id: 5, name: 'Insurance Members', path: '/admin/viewInsuranceMember', icon: <FcDepartment />
    
    },
    { id: 6, name: 'Doctors', path: '/admin/manageDoctors', icon: <FaUserNurse /> },
    { id: 7, name: 'Investigators', path: '/admin/manageInvestigators', icon: <FaUserTie /> },

  ];

  return (

    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 border-r h-screen pt-8 px-4 bg-white shadow-md'>
    <div className='mb-8 flex justify-center md:block'>
      <img src={Logo} alt='Logo' className='w-10 md:w-20' />
    </div>
    <ul className='mt-6 space-y-6'>
      {Sidebar_Links.map((link, index) => (
        <li key={index} className='relative'>
          <div
            className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? 'bg-indigo-100 text-indigo-500' : ''}`}
            onClick={() => handleLinkClick(index)}
          >
            <div className='flex items-center justify-between'>
              <Link to={link.path || '#'} className='flex items-center justify-center md:justify-start md:space-x-5'>
                <span className=' text-indigo-500'>{link.icon}</span>
                <span className='text-sm text-gray-500 md:flex hidden'>{link.name}</span>
              </Link>

            </div>
          </div>

        </li>
      ))}
    </ul>

  </div>
  );
}

export default Sidebar;
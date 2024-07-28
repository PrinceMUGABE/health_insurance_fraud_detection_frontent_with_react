/* eslint-disable no-unused-vars */
// src/App.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Layout from "./components/admin/Layout.jsx";
import Home from './components/pages/Home.jsx';
import Users from './components/pages/Users.jsx';
import Pdf from './components/pages/Pdf.jsx';
import Excell from './components/pages/Excell.jsx';
import User_Layout from './components/user/User_Layout.jsx';
import EditUsers from "./components/pages/EditUsers.jsx";
import AddInstitutions from "./components/pages/AddInsurance.jsx";
import UserPolicy from "./components/pages/UserPolicy.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import Insurancemember from "./components/pages/AdminViewInsuranceMembers.jsx";
import ManageDoctors from "./components/pages/adminViewDoctors.jsx";
import ManageInvestigators from "./components/pages/ManageInvestigators.jsx";
import DoctorViewInsurance from "./components/pages/DoctorViewInsurances.jsx";
import Doctor_Layout from "./components/doctor/Layout.jsx";
import DoctorInsuranceMember from "./components/pages/DoctorViewInsuranceMembers.jsx";
import DoctorViewInvestigator from "./components/pages/DoctorViewInvestigator.jsx";
import DoctorViewFrauds from "./components/pages/DoctorViewFrauds.jsx";
import InvestigatorLayout from "./components/Investigator/Investigator_Layout.jsx";
import InvestigatorFraudsView from "./components/pages/InvestigatorViewFrauds.jsx";
import PredictInsurance from "./components/pages/DoctorPredictInsurance.jsx";
import UserViewInsurance from "./components/pages/UserViewInsurance.jsx";
import AdminManageInsurances from "./components/pages/AdminManageInsurance.jsx";
import EmployeeLayout from "./components/employee/Employee_Layout.jsx";
import EmployeeManageInsuranceMember from "./components/pages/EmployeeManageInsuranceMember.jsx";
import EmployeeViewPredictions from "./components/pages/EmployeeViewPredictions.jsx";
import EmployeePredictInsurance from "./components/pages/EmployeePredictInsurance.jsx";
import AdminEditInsurance from "./components/pages/AdminEditInsurance.jsx";
import InsuranceEmployees from "./components/pages/AdminManageInsuranceEmployees.jsx";
import EditEmployee from "./components/pages/EditEmployee.jsx";
import AdminViewMember from "./components/pages/AdminViewInsuranceMember.jsx";
import EmployeeClientDetails from "./components/pages/EmployeeClientDetails.jsx";
import EmployeeAddNewInsuranceMember from "./components/pages/EmployeeAddNewInsuranceMember.jsx";
import EmployeeEditInsuranceMember from "./components/pages/EmployeeEditInsuranceMember.jsx";
import EmployeeViewInvestigators from "./components/pages/EmployeeViewInvestigators.jsx";
import DoctorViewMemberInsuranceMember from "./components/pages/DoctorViewInsuranceMembers.jsx";
import EmployeeDashboard from "./components/pages/EmployeeDashboard.jsx";
import InvestigatorDashboard from "./components/pages/InvestigatorDashboard.jsx";
import DoctorDashboard from "./components/pages/DoctorDashboard.jsx";
import PrivateRoute from "./components/ProtectRoutes.jsx"; // Import PrivateRoute

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });

    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          {/* Home view */}
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordreset" element={<ResetPassword />} />
          {/* End Home view */}

          {/* Admin */}
          <Route path="/admin" element={<PrivateRoute><Layout /></PrivateRoute>} >
            <Route index element={<Home />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/createUser" element={<Register />} />
            <Route path="/admin/pdf" element={<Pdf />} />
            <Route path="/admin/excel" element={<Excell />} />
            <Route path="/admin/insurance" element={<AdminManageInsurances />} />
            <Route path="/admin/addinsurance" element={<AddInstitutions />} />
            <Route path="/admin/edituser/:id" element={<EditUsers />} />
            <Route path="/admin/viewInsuranceMember" element={<Insurancemember />} />
            <Route path="/admin/manageDoctors" element={<ManageDoctors />} />
            <Route path="/admin/manageInvestigators" element={<ManageInvestigators />} />
            <Route path="/admin/editInsurance/:id" element={<AdminEditInsurance />} />
            <Route path="/admin/employees" element={<InsuranceEmployees />} />
            <Route path="/admin/edit_employee" element={<EditEmployee />} />
            <Route path="/admin/insuranceMember" element={<AdminViewMember />} />
            <Route path="/admin/viewClient/:clientId" element={<EmployeeClientDetails />} />
          </Route>
          {/* End of Admin route */}

          {/* User Route */}
          <Route path="/user" element={<PrivateRoute><User_Layout /></PrivateRoute>}>
            <Route index element={<Home />} />
            <Route path="/user/users" element={<Users />} />
            <Route path="/user/pdf" element={<Pdf />} />
            <Route path="/user/excel" element={<Excell />} />
            <Route path="/user/insurance" element={<UserViewInsurance />} />
            <Route path="/user/userpolicy" element={<UserPolicy />} />
          </Route>
          {/* End of User route */}

          {/* Doctor route */}
          <Route path="/doctor" element={<PrivateRoute><Doctor_Layout /></PrivateRoute>}>
            <Route index element={<DoctorDashboard />} />
            <Route path="/doctor/viewInsurance" element={<DoctorViewInsurance />} />
            <Route path="/doctor/insuranceMember" element={<DoctorViewMemberInsuranceMember />} />
            <Route path="/doctor/frauds" element={<DoctorViewFrauds />} />
            <Route path="/doctor/predictInsurance" element={<PredictInsurance />} />
            <Route path="/doctor/investigator" element={<DoctorViewInvestigator />} />
          </Route>
          {/* Doctor Routes ended */}

          {/* Investigator routes */}
          <Route path="/investigator" element={<PrivateRoute><InvestigatorLayout /></PrivateRoute>}>
            <Route index element={<InvestigatorDashboard />} />
            <Route path="/investigator/viewInsurance" element={<DoctorViewInsurance />} />
            <Route path="/investigator/insuranceMember" element={<DoctorInsuranceMember />} />
            <Route path="/investigator/investigator" element={<DoctorViewInvestigator />} />
            <Route path="/investigator/frauds" element={<InvestigatorFraudsView />} />
          </Route>

          {/* Employee routes */}
          <Route path="/employee" element={<PrivateRoute><EmployeeLayout /></PrivateRoute>}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="/employee/viewInsurance" element={<DoctorViewInsurance />} />
            <Route path="/employee/insuranceMember" element={<EmployeeManageInsuranceMember />} />
            <Route path="/employee/investigator" element={<EmployeeViewInvestigators />} />
            <Route path="/employee/frauds" element={<EmployeeViewPredictions />} />
            <Route path="/employee/predictInsurance" element={<EmployeePredictInsurance />} />
            <Route path="/employee/createInsuranceMember" element={<EmployeeAddNewInsuranceMember />} />
            <Route path="/employee/viewClient/:clientId" element={<EmployeeClientDetails />} />
            <Route path="/employee/editClient/:clientId" element={<EmployeeEditInsuranceMember />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

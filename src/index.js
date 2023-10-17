import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginView from "../src/routes/LoginView";
import ChooseUserNameView from "../src/routes/ChooseUserNameView ";
import Dashboard from "../src/routes/Dashboard ";
import DashboardProfile from "../src/routes/DashboardProfile";
import SignOutView from "../src/routes/SignOutView";
import PublicViewProfile from "../src/routes/PublicViewProfile";
import EditProfileView from './routes/EditProfileView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginView />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path="u/:username" element={<PublicViewProfile />} />
      <Route path="choose-username" element={<ChooseUserNameView />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

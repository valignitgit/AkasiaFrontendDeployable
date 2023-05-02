import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import RequireAuth from "./Routes/RequireAuth";
import BankListing from "./pages/Bank/BankListing/BankListing";
import BankDetails from "./pages/Bank/BankDetails/BankDetails";
import AddBank from "./pages/Bank/AddBank/AddBank";
import UpdateBank from "./pages/Bank/UpdateBank/UpdateBank";
import PortfolioListing from "./pages/Portfolio/PortfolioListing/PortfolioListing";
import PortfolioDetails from "./pages/Portfolio/PortfolioDetails/PortfolioDetails";
import AddPortfolio from "./pages/Portfolio/AddPortfolio/AddPortfolio";
import UpdatePortfolio from "./pages/Portfolio/UpdatePortfolio/UpdatePortfolio";
import SecurityListing from "./pages/Security/SecurityListing/SecurityListing";
import ViewSecurity from "./pages/Security/ViewSecurity/ViewSecurity";
import AddSecurity from "./pages/Security/AddSecurity/AddSecurity";
import UpdateSecurity from "./pages/Security/UpdateSecurity/UpdateSecurity";
import PublicRoute from "./Routes/PublicRoute";

import Login from "./pages/Login/Login";
const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="bank">
              <Route index element={<BankListing />} />
              <Route path=":id" element={<BankDetails />} />
              <Route path="add" element={<AddBank />} />
              <Route path="update/:id" element={<UpdateBank />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="portfolio">
                <Route index element={<PortfolioListing />} />
                <Route path=":id" element={<PortfolioDetails />} />
                <Route path="add" element={<AddPortfolio />} />
                <Route path="update/:id" element={<UpdatePortfolio />} />
              </Route>
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="security">
                <Route index element={<SecurityListing />} />
                <Route path=":id" element={<ViewSecurity />} />
                <Route path="add" element={<AddSecurity />} />
                <Route path="update/:id" element={<UpdateSecurity />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

// import React, { useState } from "react";

// import { Box } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";

// import Navbar from "../NavBar/Navbar";
// import Sidebar from "../Sidebar/Sidebar";
// import BankListing from "../../pages/Bank/BankListing/BankListing";
// import BankDetails from "../../pages/Bank/BankDetails/BankDetails";
// import AddBank from "../../pages/Bank/AddBank/AddBank";
// import UpdateBank from "../../pages/Bank/UpdateBank/UpdateBank";
// import PortfolioListing from "../../pages/Portfolio/PortfolioListing/PortfolioListing";
// import PortfolioDetails from "../../pages/Portfolio/PortfolioDetails/PortfolioDetails";
// import AddPortfolio from "../../pages/Portfolio/AddPortfolio/AddPortfolio";
// import UpdatePortfolio from "../../pages/Portfolio/UpdatePortfolio/UpdatePortfolio";
// import SecurityListing from "../../pages/Security/SecurityListing/SecurityListing";
// import ViewSecurity from "../../pages/Security/ViewSecurity/ViewSecurity";
// import AddSecurity from "../../pages/Security/AddSecurity/AddSecurity";
// import UpdateSecurity from "../../pages/Security/UpdateSecurity/UpdateSecurity";
import Login from "../../pages/Login/Login";

function Home() {
  // const [mobileOpen, setMobileOpen] = useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          padding: { xs: "15px", sm: "15px", md: "12px 16px 30px 260px" },
          marginTop: "60px",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/bank" />} />
          <Route path="/bank">
            <Route index element={<BankListing />} />
            <Route path=":id" element={<BankDetails />} />
            <Route path="add" element={<AddBank />} />
            <Route path="update/:id" element={<UpdateBank />} />
          </Route>
          <Route path="/portfolio">
            <Route index element={<PortfolioListing />} />
            <Route path=":id" element={<PortfolioDetails />} />
            <Route path="add" element={<AddPortfolio />} />
            <Route path="update/:id" element={<UpdatePortfolio />} />
          </Route>
          <Route path="/security">
            <Route index element={<SecurityListing />} />
            <Route path=":id" element={<ViewSecurity />} />
            <Route path="add" element={<AddSecurity />} />
            <Route path="update/:id" element={<UpdateSecurity />} />
          </Route>
        </Routes>
      </Box>{" "}
      */}
    </>
  );
}

export default Home;

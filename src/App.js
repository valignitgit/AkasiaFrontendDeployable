import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import RequireAuth from "./Routes/RequireAuth";
import PublicRoute from "./Routes/PublicRoute";
import Loader from "./components/Loader/Loader";

const Login = lazy(() => import("./pages/Login/Login"));
const BankListing = lazy(() => import("./pages/Bank/BankListing/BankListing"));
const BankDetails = lazy(() => import("./pages/Bank/BankDetails/BankDetails"));
const AddBank = lazy(() => import("./pages/Bank/AddBank/AddBank"));
const UpdateBank = lazy(() => import("./pages/Bank/UpdateBank/UpdateBank"));
const PortfolioListing = lazy(() =>
  import("./pages/Portfolio/PortfolioListing/PortfolioListing")
);
const PortfolioDetails = lazy(() =>
  import("./pages/Portfolio/PortfolioDetails/PortfolioDetails")
);
const AddPortfolio = lazy(() =>
  import("./pages/Portfolio/AddPortfolio/AddPortfolio")
);
const UpdatePortfolio = lazy(() =>
  import("./pages/Portfolio/UpdatePortfolio/UpdatePortfolio")
);
const SecurityListing = lazy(() =>
  import("./pages/Security/SecurityListing/SecurityListing")
);
const ViewSecurity = lazy(() =>
  import("./pages/Security/ViewSecurity/ViewSecurity")
);
const AddSecurity = lazy(() =>
  import("./pages/Security/AddSecurity/AddSecurity")
);
const UpdateSecurity = lazy(() =>
  import("./pages/Security/UpdateSecurity/UpdateSecurity")
);

const CurrencyListing = lazy(() =>
  import("./pages/Currency/CurrencyListing/CurrencyListing")
);
const AddCurrency = lazy(() =>
  import("./pages/Currency/AddCurrency/AddCurrency")
);
const CurrencyDetails = lazy(() =>
  import("./pages/Currency/CurrencyDetails/CurrencyDetails")
);
const UpdateCurrency = lazy(() =>
  import("./pages/Currency/UpdateCurrency/UpdateCurrency")
);
const ExchangeListing = lazy(() =>
  import("./pages/Exchange/ExchangeListing/ExchangeListing")
);
const AddExchange = lazy(() =>
  import("./pages/Exchange/AddExchange/AddExchange")
);
const ExchangeDetails = lazy(() =>
  import("./pages/Exchange/ExchangeDetails/ExchangeDetails")
);
const UpdateExchange = lazy(() =>
  import("./pages/Exchange/UpdateExchange/UpdateExchange")
);
const CountryListing = lazy(() =>
  import("./pages/Country/CountryListing/CountryListing")
);
const AddCountry = lazy(() => import("./pages/Country/AddCountry/AddCountry"));
const CountryDetails = lazy(() =>
  import("./pages/Country/CountryDetails/CountryDetails")
);
const UpdateCountry = lazy(() =>
  import("./pages/Country/UpdateCountry/UpdateCountry")
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* Public Routes */}
          <Route element={<RequireAuth />}>
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
                <Route element={<RequireAuth />}>
                  <Route path="currency">
                    <Route index element={<CurrencyListing />} />
                    <Route path=":id" element={<CurrencyDetails />} />
                    <Route path="add" element={<AddCurrency />} />
                    <Route path="update/:id" element={<UpdateCurrency />} />
                  </Route>
                </Route>
                <Route element={<RequireAuth />}>
                  <Route path="exchange">
                    <Route index element={<ExchangeListing />} />
                    <Route path=":id" element={<ExchangeDetails />} />
                    <Route path="add" element={<AddExchange />} />
                    <Route path="update/:id" element={<UpdateExchange />} />
                  </Route>
                </Route>
                <Route element={<RequireAuth />}>
                  <Route path="country">
                    <Route index element={<CountryListing />} />
                    <Route path=":id" element={<CountryDetails />} />
                    <Route path="add" element={<AddCountry />} />
                    <Route path="update/:id" element={<UpdateCountry />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

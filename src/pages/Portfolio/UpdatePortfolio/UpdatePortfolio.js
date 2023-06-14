import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PortfolioService from "services/PortfolioServices";

import Button from "components/Button/CustomButton";

import { updatePortfolio } from "redux/slices/portfolioSlice";
import { setData } from "redux/slices/securityTableSlice";

import { getEmptyErrorState } from "utils/AppUtil";
import ErrorMessageGenerator from "utils/ErrorMessageGenerator";
import {
  isEmptyString,
  isFloatNumber,
  isValidDecimalPointValue,
} from "utils/Validator";

import UpdateSecurityTable from "../UpdateSecurityTable/UpdateSecurityTable";

import styles from "../AddPortfolio/styles.module.scss";

const UpdatePortfolio = () => {
  const initialState = {
    portfolio_name: "",
    portfolio_name_ar: "",
    risk_level: "",
    avg_growth_pct: "",
  };
  const [currentPortfolio, setCurrentPortfolio] = useState(initialState);
  const [error, setErrors] = useState({
    portfolio_name: getEmptyErrorState(),
    portfolio_name_ar: getEmptyErrorState(),
    avg_growth_pct: getEmptyErrorState(),
    risk_level: getEmptyErrorState(),
    security: getEmptyErrorState(),
    weightage: getEmptyErrorState(),
  });
  const { portfolio_name, portfolio_name_ar, avg_growth_pct, risk_level } =
    currentPortfolio;

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const securityData = useSelector((state) => state.securityTableData.data);
  const portfolioSecurities = securityData?.map(
    ({ security_id, weightage_pct }) => ({
      security_id,
      weightage_pct: parseFloat(weightage_pct),
    })
  );
  const weightageSum = portfolioSecurities.reduce((sum, security) => {
    return sum + parseFloat(security.weightage_pct);
  }, 0);
  const portfolioSecuritiesLength = portfolioSecurities.length;
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      portfolio_name: getEmptyErrorState(),
      portfolio_name_ar: getEmptyErrorState(),
      avg_growth_pct: getEmptyErrorState(),
      risk_level: getEmptyErrorState(),
      security: getEmptyErrorState(),
      weightage: getEmptyErrorState(),
    };
    if (isEmptyString(portfolio_name)) {
      newErrors.portfolio_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Portfolio Name"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(portfolio_name_ar)) {
      newErrors.portfolio_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Portfolio Name Arabic"
        ),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(risk_level)) {
      newErrors.risk_level = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Risk Level"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(avg_growth_pct)) {
      newErrors.avg_growth_pct = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Avarage Growth Percentage"
        ),
        errorState: "error",
      };
      isValid = false;
    } else if (isFloatNumber(avg_growth_pct)) {
      newErrors.avg_growth_pct = {
        errorMessage: ErrorMessageGenerator.getValueInNumberMessage(
          "Avarage Growth Percentage"
        ),
        errorState: "error",
      };
      isValid = false;
    } else if (isValidDecimalPointValue(avg_growth_pct)) {
      newErrors.avg_growth_pct = {
        errorMessage: ErrorMessageGenerator.getDecimalPointValueMessage(
          "Avarage Growth Percentage"
        ),
        errorState: "error",
      };
      isValid = false;
    }
    if (portfolioSecuritiesLength <= 0) {
      newErrors.security = {
        errorMessage: "Add at least one security",
        errorState: "error",
      };
      isValid = false;
    }

    if (portfolioSecuritiesLength && weightageSum !== 100) {
      newErrors.weightage = {
        errorMessage: "The sum of weightage of all securities must be 100",
        errorState: "error",
      };
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onChange = (e) => {
    setCurrentPortfolio({
      ...currentPortfolio,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentPortfolio = async (id) => {
    try {
      const { data } = await PortfolioService.getPortfolioById(id);
      const { portfolioSecurities } = data.data;
      const newPortfolioSecurities = portfolioSecurities.map(
        ({ portfolio_security_id, ...rest }) => ({
          id: portfolio_security_id,
          ...rest,
        })
      );
      setCurrentPortfolio(data.data);
      dispatch(setData(newPortfolioSecurities));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentPortfolio(id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      portfolio_id: id,
      portfolio_name,
      portfolio_name_ar,
      risk_level,
      avg_growth_pct: parseFloat(avg_growth_pct),
      portfolioSecurities,
    };
    const isValid = validateForm();

    if (isValid) {
      await dispatch(updatePortfolio(data))
        .unwrap()
        .then((res) => {
          setCurrentPortfolio(res.data);
          dispatch(setData([]));
          navigate(`/portfolio/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const renderUpdatePortfolioDetailsForm = () => {
    return (
      <>
        <Grid container className={styles.addPortfolio__gridCenter}>
          <Grid item xs={12} sm={12} md={8} lg={5} xl={5}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              className={styles.addPortfolio__formContainer}
            >
              <Box className={styles.addPortfolio__formStyles}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={styles.addPortfolio__formHeading}
                >
                  Update Portfolio
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="portfolio_name"
                  value={portfolio_name}
                  label="Portfolio Name"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  className={styles.addPortfolio__textInput}
                />
                {error.portfolio_name.errorState && (
                  <span className="error">
                    {error.portfolio_name.errorMessage}
                  </span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="portfolio_name_ar"
                  value={portfolio_name_ar}
                  label="Portfolio Name Arabic"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  className={styles.addPortfolio__textInput}
                />
                {error.portfolio_name_ar.errorState && (
                  <span className="error">
                    {error.portfolio_name_ar.errorMessage}
                  </span>
                )}

                <FormControl
                  fullWidth
                  className={styles.addPortfolio__selectInput}
                >
                  <InputLabel>Risk Level</InputLabel>
                  <Select
                    value={risk_level}
                    label="Risk Level"
                    name="risk_level"
                    onChange={(e) => onChange(e)}
                    autoComplete="off"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="very-high">Very High</MenuItem>
                  </Select>
                </FormControl>
                {error.risk_level.errorState && (
                  <span className="error">{error.risk_level.errorMessage}</span>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Avarage Growth Percentage"
                  name="avg_growth_pct"
                  value={avg_growth_pct}
                  onChange={(e) => onChange(e)}
                  placeholder="Enter the value in decimal point like 15.5"
                  autoComplete="off"
                  className={styles.addPortfolio__textInput}
                />
                {error.avg_growth_pct.errorState && (
                  <span className="error">
                    {error.avg_growth_pct.errorMessage}
                  </span>
                )}
              </Box>
              <UpdateSecurityTable />
              <div className={styles.addPortfolio__errorContainer}>
                {error.security.errorState && (
                  <span className={`${styles.addPortfolio__tableErrors}`}>
                    {error.security.errorMessage}
                  </span>
                )}
                {error.weightage.errorState && (
                  <span className={`${styles.addPortfolio__tableErrors}`}>
                    {error.weightage.errorMessage}
                  </span>
                )}
              </div>
              <div className="buttons_container">
                <Button
                  type="submit"
                  variant="filled"
                  className={styles.addPortfolio__submitBtn}
                >
                  Update
                </Button>
                <Link to="/portfolio">
                  <Button>Cancel</Button>
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return <>{renderUpdatePortfolioDetailsForm()}</>;
};

export default UpdatePortfolio;

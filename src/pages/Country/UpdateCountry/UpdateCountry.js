import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCountry } from "../../../redux/slices/countrySlice";
import CountryService from "../../../services/CountryServices";
import { Grid, Typography, Box, TextField, Paper } from "@mui/material";
import { getEmptyErrorState } from "../../../utils/AppUtil";
// eslint-disable-next-line no-unused-vars
import { isEmptyString, isArabic } from "../../../utils/Validator";
import ErrorMessageGenerator from "../../../utils/ErrorMessageGenerator";
import styles from "../AddCountry/style.module.scss";
import Button from "../../../components/Button/CustomButton";

const UpdateCountry = () => {
  const initialState = {
    country_id: "",
    country_name: "",
    country_name_ar: "",
  };
  const [currentCountry, setcurrentCountry] = useState(initialState);
  const [error, setErrors] = useState({
    country_id: getEmptyErrorState(),
    country_name: getEmptyErrorState(),
    country_name_ar: getEmptyErrorState(),
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setcurrentCountry({ ...currentCountry, [e.target.name]: e.target.value });
  };
  const { country_id, country_name, country_name_ar } = currentCountry;
  console.log("currentCountry", currentCountry);

  const getCountry = (id) => {
    CountryService.getCountryById(id)
      .then((res) => {
        setcurrentCountry(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCountry(id);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      country_id: getEmptyErrorState(),
      country_name: getEmptyErrorState(),
      country_name_ar: getEmptyErrorState(),
    };
    if (isEmptyString(country_id)) {
      newErrors.country_id = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Country Id"),
        errorState: "error",
      };
      isValid = false;
    }
    if (isEmptyString(country_name)) {
      newErrors.country_name = {
        errorMessage:
          ErrorMessageGenerator.getMandatoryFieldMessage("Country Name"),
        errorState: "error",
      };
      isValid = false;
    }

    if (isEmptyString(country_name_ar)) {
      newErrors.country_name_ar = {
        errorMessage: ErrorMessageGenerator.getMandatoryFieldMessage(
          "Country Name Arabic"
        ),
        errorState: "error",
      };
      isValid = false;
    }
    // else if (isArabic(country_name_ar)) {
    //   newErrors.country_name_ar = {
    //     errorMessage:
    //       ErrorMessageGenerator.getStringInArabicMessage("Country Name"),
    //     errorState: "error",
    //   };
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await dispatch(
          updateCountry({ id: country_id, data: currentCountry })
        ).unwrap();
        if (response.status === 200 || response.status === 201) {
          navigate(`/country/${country_id}`);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const renderUpdateCountryDetailsForm = () => {
    return (
      <Grid container className={styles.addCountry__gridCenter}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
          <Paper className={`${styles.addCountry__formWidth} form_styles`}>
            <Box className={styles.addCountry__formIcon_wrapper}>
              <Typography component="h1" variant="h5">
                Update Country
              </Typography>
            </Box>
            <Box
              component="form"
              className={styles.addCountry__formContainer}
              onSubmit={handleSubmit}
              noValidate
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Country Id"
                name="country_id"
                value={country_id}
                autoComplete="email"
                autoFocus
                onChange={(e) => onChange(e)}
                disabled={true}
              />
              {error.country_id.errorState && (
                <span className="error">{error.country_id.errorMessage}</span>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="country_name"
                value={country_name}
                label="Country Name"
                onChange={(e) => onChange(e)}
              />
              {error.country_name.errorState && (
                <span className="error">{error.country_name.errorMessage}</span>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="country_name_ar"
                value={country_name_ar}
                label="Country Name Arabic"
                autoComplete="current-password"
                onChange={(e) => onChange(e)}
              />
              {error.country_name_ar.errorState && (
                <span className="error">
                  {error.country_name_ar.errorMessage}
                </span>
              )}
              <div className="buttons_container">
                <Button className="mt_10" variant="filled" type="submit">
                  Update
                </Button>
                <Link to="/country">
                  <Button
                    variant="filled"
                    type="submit"
                    className={styles.addBtn}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return <>{renderUpdateCountryDetailsForm()}</>;
};

export default UpdateCountry;

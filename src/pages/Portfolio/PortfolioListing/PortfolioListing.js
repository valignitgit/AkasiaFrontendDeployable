import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  getAllPortfolio,
  deletePortfolio,
} from "../../../redux/slices/portfolioSlice";
import { Link } from "react-router-dom";
import DialogBox from "../../../components/DialogBox/DialogBox";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import Loader from "../../../components/Loader/Loader";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import styles from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Button from "../../../components/Button/CustomButton";

const Portfolio = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.portfolio?.data);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState("");
  const [filter, setFilter] = useState("");
  const [portfolioList, setPortfolioList] = useState(data || []);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllPortfolio());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setPortfolioList(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setPortfolioList(data);
    }
  }, []);

  const handleDelete = (id) => {
    setOpen(true);
    setDeletedItem(id);
  };
  const onDelete = async (id) => {
    if (id)
      await dispatch(deletePortfolio(id))
        .unwrap()
        .then(() => {
          setOpen(false);
          dispatch(getAllPortfolio());
        });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "Portfolio Name") {
      getPortfolioByName();
    } else if (e.target.value === "Risk Level") {
      getPortfolioByRiskLevel();
    }
  };

  const getPortfolioByName = () => {
    const newPortfolio = [...data];
    newPortfolio.sort((a, b) => {
      if (a.portfolio_name < b.portfolio_name) {
        return -1;
      }
      if (a.portfolio_name > b.portfolio_name) {
        return 1;
      }
      return 0;
    });
    setPortfolioList(newPortfolio);
  };

  const getPortfolioByRiskLevel = () => {
    const riskLevelOrder = ["low", "medium", "high", "very-high"];
    const newPortfolio = [...data];

    newPortfolio.sort((a, b) => {
      const aIndex = riskLevelOrder.indexOf(a.risk_level.toLowerCase());
      const bIndex = riskLevelOrder.indexOf(b.risk_level.toLowerCase());
      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
    });
    setPortfolioList(newPortfolio);
  };

  const handleUnFilter = () => {
    setPortfolioList(data);
    setFilter("");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const lastDataIndex = page * perPage;
  const firstDataIndex = lastDataIndex - perPage;
  const currentPortfolio = portfolioList.slice(firstDataIndex, lastDataIndex);
  console.log("portfolioList", portfolioList);

  const renderAddPortfolioButton = () => (
    <Link to="/portfolio/add">
      <Button variant="filled">Add Portfolio</Button>
    </Link>
  );
  const renderFilterDropDown = () => {
    return (
      <>
        <Box>
          <Box className={styles.portfolioListing__filterContainer}>
            <Button
              variant="filled"
              icon={{
                position: "left",
                component: filter ? <FilterListOffIcon /> : <FilterListIcon />,
              }}
              onClick={handleUnFilter}
              shape="square"
            >
              {filter ? "Unfilter" : "Filter"}
            </Button>
            <FormControl className={styles.portfolioListing__filterSelectInput}>
              <Select
                value={filter}
                onChange={handleFilterChange}
                name="Filter"
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Portfolio Name">By Portfolio Name</MenuItem>
                <MenuItem value="Risk Level">By Risk Level</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </>
    );
  };

  const renderDialog = () => {
    const renderActionButtons = () => {
      return (
        <>
          <Button shape="square" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            shape="square"
            onClick={() => onDelete(deletedItem)}
          >
            Delete
          </Button>
        </>
      );
    };
    return (
      <>
        <DialogBox
          open={open}
          handleClose={handleClose}
          title="Delete"
          content="Are sure you want to delete?"
          actions={renderActionButtons()}
        />
      </>
    );
  };
  const renderPortfolioList = () => {
    if (Array.isArray(portfolioList)) {
      return (
        <>
          <Grid container spacing={2}>
            {currentPortfolio.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolio_id}
                {...portfolio}
                handleDelete={handleDelete}
              />
            ))}
          </Grid>
        </>
      );
    } else {
      return <Loader />;
    }
  };
  const renderPagination = () => {
    return (
      <div className={styles.portfolioCard__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(portfolioList.length / perPage)}
          page={page}
          onChange={handlePageChange}
        />
        <FormControl>
          <Select value={perPage} onChange={handlePerPageChange}>
            <MenuItem value={4}>4 per page</MenuItem>
            <MenuItem value={8}>8 per page</MenuItem>
            <MenuItem value={12}>12 per page</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div className={styles.portfolioContainer}>
      {renderAddPortfolioButton()}
      {portfolioList.length > 0 && renderFilterDropDown()}
      {renderPortfolioList()}
      {portfolioList.length > 0 && renderPagination()}
      {renderDialog()}
    </div>
  );
};

export default Portfolio;

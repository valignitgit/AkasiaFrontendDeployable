import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBanks,
  deleteBank,
  setCurrentData,
} from "../../../redux/slices/bankSlice";
import { Link, useLocation } from "react-router-dom";
import DialogBox from "../../../components/DialogBox/DialogBox";
import {
  Skeleton,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import BankCard from "../BankCard/BankCard";
import styles from "./styles.module.scss";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/CustomButton";
const BankListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const newData = location.state?.newData;
  const { data, loading } = useSelector((state) => state.bank);
  const [bankList, setBankList] = useState(data || []);
  const [open, setOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
    name: "",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBanks());
    dispatch(setCurrentData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setBankList(data);
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      setBankList(data);
    }
  }, [data]);

  useEffect(() => {
    if (newData) {
      setBankList((prevData) => [...prevData, newData]);
    }
  }, [newData]);

  const handleDelete = (id, name) => {
    setOpen(true);
    setDeletedItem({
      id,
      name,
    });
  };

  const onDelete = async (id) => {
    if (id)
      await dispatch(deleteBank(id))
        .unwrap()
        .then(() => {
          setOpen(false);
          dispatch(getAllBanks());
        });
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
  const currentBanks = Array.isArray(bankList)
    ? bankList.slice(firstDataIndex, lastDataIndex)
    : [];

  const renderAddBankButton = () => (
    <Link to="/bank/add">
      <Button variant="filled" className={styles.addBankButton}>
        Add Bank
      </Button>
    </Link>
  );

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
            onClick={() => onDelete(deletedItem.id)}
          >
            Delete
          </Button>
        </>
      );
    };
    const renderDeleteContent = () => {
      return <div>Are sure you want to delete {deletedItem.name}? </div>;
    };
    return (
      <>
        <DialogBox
          open={open}
          handleClose={handleClose}
          title="Delete"
          content={renderDeleteContent()}
          actions={renderActionButtons()}
        />
      </>
    );
  };
  const renderBankList = () => {
    if (data && data.length === 0) {
      return <Loader />;
    }
    if (!data || loading) {
      return (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Skeleton variant="rectangular" width={350} height={200} />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (Array.isArray(bankList)) {
      return (
        <div className={styles.bankListing__container}>
          <Grid container spacing={2}>
            {currentBanks?.map((bank) => (
              <BankCard
                key={bank.bank_id}
                {...bank}
                handleDelete={handleDelete}
              />
            ))}
          </Grid>
        </div>
      );
    }
  };
  const renderPagination = () => {
    return (
      <div className={styles.bankListing__paginationContainer}>
        <Pagination
          color="primary"
          count={Math.ceil(bankList.length / perPage)}
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
    <>
      {renderAddBankButton()}
      {renderBankList()}
      {bankList.length > 0 && renderPagination()}
      {renderDialog()}
    </>
  );
};

export default BankListing;

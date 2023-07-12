/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import Loader from "components/Loader/Loader";
import Table from "components/Table/Table";

import { getAllCustomers } from "redux/slices/customerSlice";

import "./style.scss";

const CustomerListing = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.customer);
  const [customerList, setCustomerList] = useState(data || []);
  const [rows, setRows] = useState([]);
  const [activeRow, setActiveRow] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setCustomerList(data);
    }
    const rows = customerList.map((customer) => ({
      customer_name: customer.customer_name,
      national_id: customer.national_id,
      phone_num: customer.phone_num,
      status: customer.status,
    }));
  }, [data]);

  useEffect(() => {
    const rowData = customerList.map((customer) => ({
      id: customer.customer_id,
      customer_name: customer.customer_name,
      national_id: customer.national_id,
      status: customer.status,
      phone_num: customer.phone_num,
    }));
    // const rowData = [
    //   {
    //     id: 1,
    //     customer_name: "Juli",
    //     national_id: "Albon",
    //     phone_num: "jalbon0@geocities.jp",
    //     status: "Female",
    //   },
    //   {
    //     id: 2,
    //     customer_name: "Janek",
    //     national_id: "McAnulty",
    //     phone_num: "jmcanulty1@networkadvertising.org",
    //     status: "Male",
    //   },
    //   {
    //     id: 3,
    //     customer_name: "Gill",
    //     national_id: "Leblanc",
    //     phone_num: "gleblanc2@blogs.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 4,
    //     customer_name: "Sargent",
    //     national_id: "Emmot",
    //     phone_num: "semmot3@blogs.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 5,
    //     customer_name: "Arne",
    //     national_id: "Pods",
    //     phone_num: "apods4@eventbrite.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 6,
    //     customer_name: "Felicle",
    //     national_id: "Gooble",
    //     phone_num: "fgooble5@nationalgeographic.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 7,
    //     customer_name: "Clemente",
    //     national_id: "Niblett",
    //     phone_num: "cniblett6@nbcnews.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 8,
    //     customer_name: "Chicky",
    //     national_id: "Parkman",
    //     phone_num: "cparkman7@cbsnews.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 9,
    //     customer_name: "Corny",
    //     national_id: "Eyers",
    //     phone_num: "ceyers8@list-manage.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 10,
    //     customer_name: "Eduardo",
    //     national_id: "Habbin",
    //     phone_num: "ehabbin9@ycombinator.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 11,
    //     customer_name: "Karola",
    //     national_id: "Matyja",
    //     phone_num: "kmatyjaa@topsy.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 12,
    //     customer_name: "Clare",
    //     national_id: "McGinny",
    //     phone_num: "cmcginnyb@ebay.co.uk",
    //     status: "Female",
    //   },
    //   {
    //     id: 13,
    //     customer_name: "Darb",
    //     national_id: "Shallcroff",
    //     phone_num: "dshallcroffc@webs.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 14,
    //     customer_name: "Martino",
    //     national_id: "Blaase",
    //     phone_num: "mblaased@businessinsider.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 15,
    //     customer_name: "Ximenes",
    //     national_id: "Jakes",
    //     phone_num: "xjakese@dailymail.co.uk",
    //     status: "Male",
    //   },
    //   {
    //     id: 16,
    //     customer_name: "Bryant",
    //     national_id: "Steptoe",
    //     phone_num: "bsteptoef@addthis.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 17,
    //     customer_name: "Judas",
    //     national_id: "Werrett",
    //     phone_num: "jwerrettg@github.io",
    //     status: "Male",
    //   },
    //   {
    //     id: 18,
    //     customer_name: "Tudor",
    //     national_id: "Alderwick",
    //     phone_num: "talderwickh@hugedomains.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 19,
    //     customer_name: "Annecorinne",
    //     national_id: "Jersch",
    //     phone_num: "ajerschi@discovery.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 20,
    //     customer_name: "Orville",
    //     national_id: "Tyreman",
    //     phone_num: "otyremanj@shareasale.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 21,
    //     customer_name: "Tabbitha",
    //     national_id: "Ivkovic",
    //     phone_num: "tivkovick@imdb.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 22,
    //     customer_name: "Wittie",
    //     national_id: "Pow",
    //     phone_num: "wpowl@studiopress.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 23,
    //     customer_name: "Jaye",
    //     national_id: "Casone",
    //     phone_num: "jcasonem@weather.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 24,
    //     customer_name: "Fanchette",
    //     national_id: "Gulliver",
    //     phone_num: "fgullivern@kickstarter.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 25,
    //     customer_name: "Holmes",
    //     national_id: "Dargue",
    //     phone_num: "hdargueo@pagesperso-orange.fr",
    //     status: "Male",
    //   },
    //   {
    //     id: 26,
    //     customer_name: "Annalise",
    //     national_id: "Bownas",
    //     phone_num: "abownasp@house.gov",
    //     status: "Female",
    //   },
    //   {
    //     id: 27,
    //     customer_name: "Lucilia",
    //     national_id: "Vischi",
    //     phone_num: "lvischiq@sina.com.cn",
    //     status: "Female",
    //   },
    //   {
    //     id: 28,
    //     customer_name: "Cliff",
    //     national_id: "Ratazzi",
    //     phone_num: "cratazzir@spotify.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 29,
    //     customer_name: "Bessie",
    //     national_id: "Tanman",
    //     phone_num: "btanmans@theglobeandmail.com",
    //     status: "Agender",
    //   },
    //   {
    //     id: 30,
    //     customer_name: "Marcellina",
    //     national_id: "Gutowski",
    //     phone_num: "mgutowskit@who.int",
    //     status: "Female",
    //   },
    //   {
    //     id: 31,
    //     customer_name: "Blakelee",
    //     national_id: "Harsum",
    //     phone_num: "bharsumu@webnode.com",
    //     status: "Genderqueer",
    //   },
    //   {
    //     id: 32,
    //     customer_name: "Ellis",
    //     national_id: "Paddison",
    //     phone_num: "epaddisonv@nytimes.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 33,
    //     customer_name: "Aloin",
    //     national_id: "Dumbar",
    //     phone_num: "adumbarw@1und1.de",
    //     status: "Male",
    //   },
    //   {
    //     id: 34,
    //     customer_name: "Nicolea",
    //     national_id: "Haime",
    //     phone_num: "nhaimex@house.gov",
    //     status: "Female",
    //   },
    //   {
    //     id: 35,
    //     customer_name: "Valentine",
    //     national_id: "Reuble",
    //     phone_num: "vreubley@toplist.cz",
    //     status: "Male",
    //   },
    //   {
    //     id: 36,
    //     customer_name: "Torrin",
    //     national_id: "Sabater",
    //     phone_num: "tsabaterz@oracle.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 37,
    //     customer_name: "Tiff",
    //     national_id: "Tottie",
    //     phone_num: "ttottie10@marketwatch.com",
    //     status: "Polygender",
    //   },
    //   {
    //     id: 38,
    //     customer_name: "Cassandre",
    //     national_id: "Radclyffe",
    //     phone_num: "cradclyffe11@netvibes.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 39,
    //     customer_name: "Tiffi",
    //     national_id: "Sandy",
    //     phone_num: "tsandy12@bing.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 40,
    //     customer_name: "Goober",
    //     national_id: "Pozzo",
    //     phone_num: "gpozzo13@ca.gov",
    //     status: "Male",
    //   },
    //   {
    //     id: 41,
    //     customer_name: "Brittney",
    //     national_id: "Ronchka",
    //     phone_num: "bronchka14@baidu.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 42,
    //     customer_name: "Paolina",
    //     national_id: "Leyband",
    //     phone_num: "pleyband15@nyu.edu",
    //     status: "Female",
    //   },
    //   {
    //     id: 43,
    //     customer_name: "Christopher",
    //     national_id: "Glasscoo",
    //     phone_num: "cglasscoo16@geocities.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 44,
    //     customer_name: "Randolf",
    //     national_id: "Frapwell",
    //     phone_num: "rfrapwell17@123-reg.co.uk",
    //     status: "Male",
    //   },
    //   {
    //     id: 45,
    //     customer_name: "Courtnay",
    //     national_id: "Cowthard",
    //     phone_num: "ccowthard18@baidu.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 46,
    //     customer_name: "Allie",
    //     national_id: "Bedenham",
    //     phone_num: "abedenham19@google.pl",
    //     status: "Female",
    //   },
    //   {
    //     id: 47,
    //     customer_name: "Walther",
    //     national_id: "Grisbrook",
    //     phone_num: "wgrisbrook1a@myspace.com",
    //     status: "Male",
    //   },
    //   {
    //     id: 48,
    //     customer_name: "Jenelle",
    //     national_id: "Feaveer",
    //     phone_num: "jfeaveer1b@usnews.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 49,
    //     customer_name: "Eddie",
    //     national_id: "Legat",
    //     phone_num: "elegat1c@mozilla.com",
    //     status: "Female",
    //   },
    //   {
    //     id: 50,
    //     customer_name: "Celestyna",
    //     national_id: "Febvre",
    //     phone_num: "cfebvre1d@freewebs.com",
    //     status: "Female",
    //   },
    // ];
    setRows(rowData);
  }, [customerList]);

  const columns = [
    { id: "customer_name", label: "Customer Name" },
    { id: "national_id", label: "National Id" },
    { id: "phone_num", label: "Phone Number" },
    { id: "status", label: "Status" },
    // Add more columns as needed
  ];

  const handleRowClick = (rowId) => {
    setActiveRow(rowId);
    setTimeout(() => {
      navigate(`/customer/${rowId}`);
    }, 100);
  };

  const renderCustomerTable = () => {
    return (
      <Table
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        activeRow={activeRow}
      />
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid container className="customerListing__container">
          <Grid item lg={12} className="customerListing__gridItem">
            {renderCustomerTable()}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomerListing;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://165.232.177.225:9091/v2/bank",
          {
            headers: {
              "Content-type": "application/json",
              Authorization:
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2JpbGVVc2VyQHZhbGlnbml0LmNvbSIsImlhdCI6MTY4NjA0MDIyNH0.yCl0D0q_qq6p5-V80eAJjSLhm41z_n6cDUWoBew-_cI",
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Bank ID</th>
            <th>Bank Name</th>
            <th>Bank Name (Arabic)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.bank_id}>
              <td>{item.bank_id}</td>
              <td>{item.bank_name}</td>
              <td>{item.bank_name_ar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

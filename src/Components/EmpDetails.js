import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetails = () => {
  const { empid } = useParams();

  const [empdata, empdataChanged] = useState({});
  useEffect(() => {
    fetch("http://localhost:8000/employees/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdataChanged(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="card" style={{ textAlign: "left" }}>
      <div className="card-title">
        <h2>Item Description</h2>
      </div>
      <div className="card-body">
        {empdata && (
          <div style={{ paddingTop: "0.4rem", paddingBottom: "0.4rem" }}>
            <h5>
              Item:<b>{empdata.description}</b>
            </h5>
            <h5>
              Manufacturer: <b>{empdata.manufacturer}</b>
            </h5>
            <h5>
              Buying Price: <b>{empdata.buy}</b>
            </h5>
            <h5>
              Selling Price: <b>{empdata.sell}</b>
            </h5>
            <Link to="/" className="btn btn-danger">
              Back to Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpDetails;

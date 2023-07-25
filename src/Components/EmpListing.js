import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmpListing = () => {
  const [empdata, empdataChanged] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/employees")
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
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div>
            <Link className="btn"></Link>
          </div>
          <table className="table table-bordered">
            <thead className="--bs-gray-800 text-white">
              <tr>
                <td>ID</td>
                <td>Description</td>
                <td>Manufacturer</td>
                <td>Buy</td>
                <td>Sell</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.buy}</td>
                    <td>{item.sell}</td>
                    <td>
                      <a className="btn btn-success">Edit</a>
                      <a className="btn btn-danger">Delete</a>
                      <a className="btn btn-success">Details</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;

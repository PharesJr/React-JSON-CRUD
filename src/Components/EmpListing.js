import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmpCreate from "./EmpCreate";

const EmpListing = () => {
  const [empdata, empdataChanged] = useState(null);
  const navigate = useNavigate();

  const loadDetails = (id) => {
    navigate("/employee/detail/" + id);
  };

  const loadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const removeItem = (id) => {
    if (window.confirm("Confirm Delete Action.")) {
      fetch("http://localhost:8000/employees/" + id, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          alert("Deleted Successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

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
          <h2>Cars Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
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
                      <a
                        onClick={() => {
                          loadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          removeItem(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                      <a
                        onClick={() => {
                          loadDetails(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Details
                      </a>
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

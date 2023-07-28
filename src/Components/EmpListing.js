import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmpCreate from "./EmpCreate";

const EmpListing = () => {
  //data State
  const [empdata, empdataChanged] = useState(null);
  // search state
  const [searchQuery, setSearchQuery] = useState("");
  // paging state
  const [currentPage, setCurrentPage] = useState(1);
  // navigation state
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

  // Filter data based on the search query
  useEffect(() => {
    if (empdata) {
      if (searchQuery === "") {
        // If searchQuery is empty, restore the original data
        fetch("http://localhost:8000/employees")
          .then((res) => res.json())
          .then((resp) => {
            empdataChanged(resp);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        // Filter the data based on the search query
        const filteredData = empdata.filter(
          (item) =>
            item.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        empdataChanged(filteredData);
      }
    }
  }, [searchQuery]);

  // Paginate the data based on the currentPage state
  const itemsPerPage = 20;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  // Check if empdata is null before accessing its properties
  const currentItems = empdata && empdata.slice(firstIndex, lastIndex);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>ITEMS Listing</h2>
        </div>
        {empdata !== null ? (
          <div className="card-body">
            <div className="divbtn">
              <Link to="employee/create" className="btn btn-success">
                Add New (+)
              </Link>
            </div>
            <div>
              <label className="se">Search:</label>
              <input
                className="searchform"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="search"
              />
            </div>

            {empdata.length > 0 ? (
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
                  {currentItems &&
                    currentItems.map((item) => (
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
            ) : (
              <p>No data available.</p>
            )}

            {/* Add pagination buttons */}
            <div className="pagination">
              <button
                className="btn btn-danger"
                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-success"
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                disabled={currentItems.length < itemsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EmpListing;

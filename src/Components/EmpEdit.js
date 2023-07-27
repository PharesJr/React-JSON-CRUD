import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();
  // const [empdata, empdataChanged] = useState({});

  const [id, idchanged] = useState("");
  const [description, descriptionchanged] = useState("");
  const [manufacturer, manufacturerchanged] = useState("");
  const [buy, buychanged] = useState("");
  const [sell, sellchanged] = useState("");
  const [active, activechanged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/employees/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchanged(resp.id);
        descriptionchanged(resp.description);
        manufacturerchanged(resp.manufacturer);
        buychanged(resp.buy);
        sellchanged(resp.sell);
        activechanged(resp.active);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = { description, manufacturer, buy, sell, active };

    fetch("http://localhost:8000/employees", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left", margin: "1rem" }}>
              <div className="card-title" style={{ paddingLeft: "1rem" }}>
                <h2>Edit item</h2>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          required
                          value={description}
                          onChange={(e) => descriptionchanged(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Manufacturer</label>
                        <input
                          required
                          value={manufacturer}
                          onChange={(e) => manufacturerchanged(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Buy</label>
                        <input
                          required
                          value={buy}
                          onChange={(e) => buychanged(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Sell</label>
                        <input
                          required
                          value={sell}
                          onChange={(e) => sellchanged(e.target.value)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={(e) => activechanged(e.target.checked)}
                          className="form-check-input"
                        ></input>
                        <label className="form-check-label">Is Active</label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
